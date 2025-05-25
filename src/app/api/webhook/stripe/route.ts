import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-09-30.clover",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    ""
);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ShippingDetails = {
  name: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "No signature provided" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      try {
        const orderItemsMetadata = session.metadata?.orderItems;
        if (!orderItemsMetadata) {
          console.error("No order items in metadata");
          return NextResponse.json(
            { error: "No order items found" },
            { status: 400 }
          );
        }

        const orderItems = JSON.parse(orderItemsMetadata);

        const customerEmail =
          session.customer_email || session.customer_details?.email;

        if (!customerEmail) {
          console.error("No customer email found");
          return NextResponse.json(
            { error: "No customer email found" },
            { status: 400 }
          );
        }

        const { data: users, error: userError } = await supabase
          .from("users")
          .select("id")
          .eq("email", customerEmail)
          .limit(1);

        if (userError) {
          console.error("Error finding user:", userError);
        }

        let userId: string | null = null;

        if (users && users.length > 0) {
          userId = users[0].id;
        } else {
          const { data: authUsers, error: authError } =
            await supabase.auth.admin.listUsers();

          if (!authError && authUsers?.users) {
            const authUser = authUsers.users.find(
              (u) => u.email === customerEmail
            );
            if (authUser) {
              userId = authUser.id;
            }
          }
        }

        if (!userId) {
          console.error("Could not find user for email:", customerEmail);
        }

        let shippingAddress = "No shipping address provided";

        if (session.metadata?.shippingAddress) {
          try {
            const addr = JSON.parse(session.metadata.shippingAddress);
            shippingAddress = `${addr.firstName} ${addr.lastName}\n${addr.address}\n${addr.city}, ${addr.state} ${addr.zipCode}\n${addr.country}`;
          } catch (e) {
            console.error("Error parsing shipping address from metadata:", e);
          }
        } else {
          const sessionWithShipping = session as typeof session & {
            shipping_details?: ShippingDetails;
          };

          if (sessionWithShipping.shipping_details?.address) {
            const shipping = sessionWithShipping.shipping_details;
            shippingAddress = `${shipping.name}\n${shipping.address.line1}\n${
              shipping.address.line2 ? shipping.address.line2 + "\n" : ""
            }${shipping.address.city}, ${shipping.address.state} ${
              shipping.address.postal_code
            }\n${shipping.address.country}`;
          }
        }

        const { data: order, error: orderError } = await supabase
          .from("orders")
          .insert({
            user_id: userId,
            total: (session.amount_total || 0) / 100,
            status: "pending",
            shipping_address: shippingAddress,
            payment_intent_id: session.payment_intent as string,
          })
          .select()
          .single();

        if (orderError) {
          console.error("Error creating order:", orderError);
          return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
          );
        }

        const orderItemsInserts = orderItems.map(
          (item: {
            productId: string;
            productName: string;
            quantity: number;
            price: number;
          }) => ({
            order_id: order.id,
            product_id: item.productId,
            quantity: item.quantity,
            price: item.price,
          })
        );

        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItemsInserts);

        if (itemsError) {
          console.error("Error creating order items:", itemsError);
          return NextResponse.json(
            { error: "Failed to create order items" },
            { status: 500 }
          );
        }

        console.log("Order created successfully:", order.id);
      } catch (error) {
        console.error("Error processing checkout session:", error);
        return NextResponse.json(
          { error: "Error processing order" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
