"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
} from "lucide-react";
import toast from "react-hot-toast";

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  size?: string;
  product?: Product;
}

interface Order {
  id: string;
  user_id: string;
  total: number;
  status: string;
  created_at: string;
  shipping_address: string;
  payment_intent_id?: string;
  items?: OrderItem[];
}

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          toast.error("Please login to view orders");
          router.push("/auth/login");
          return;
        }

        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .eq("user_id", user.id)
          .single();

        if (orderError) throw orderError;

        const { data: itemsData, error: itemsError } = await supabase
          .from("order_items")
          .select("*")
          .eq("order_id", orderId);

        if (itemsError) throw itemsError;

        if (itemsData) {
          const itemsWithProducts = await Promise.all(
            itemsData.map(async (item) => {
              const { data: product } = await supabase
                .from("products")
                .select("*")
                .eq("id", item.product_id)
                .single();

              return { ...item, product };
            })
          );

          setOrder({ ...orderData, items: itemsWithProducts });
        } else {
          setOrder(orderData);
        }
      } catch (error) {
        console.error("Error loading order:", error);
        toast.error("Failed to load order");
        router.push("/profile");
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [orderId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">
            Order Not Found
          </h1>
          <Link
            href="/profile"
            className="text-gray-600 hover:text-black transition"
          >
            ← Back to Profile
          </Link>
        </div>
      </div>
    );
  }

  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return {
          icon: <Clock size={20} className="text-yellow-500" />,
          text: "Pending",
          color: "text-yellow-600",
          bg: "bg-yellow-50",
        };
      case "processing":
        return {
          icon: <Package size={20} className="text-blue-500" />,
          text: "Processing",
          color: "text-blue-600",
          bg: "bg-blue-50",
        };
      case "shipped":
        return {
          icon: <Truck size={20} className="text-purple-500" />,
          text: "Shipped",
          color: "text-purple-600",
          bg: "bg-purple-50",
        };
      case "delivered":
        return {
          icon: <CheckCircle size={20} className="text-green-500" />,
          text: "Delivered",
          color: "text-green-600",
          bg: "bg-green-50",
        };
      default:
        return {
          icon: <Clock size={20} className="text-gray-500" />,
          text: status,
          color: "text-gray-600",
          bg: "bg-gray-50",
        };
    }
  };

  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition mb-4"
        >
          <ArrowLeft size={20} />
          Back to Profile
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
              Order Details
            </h1>
            <p className="text-gray-600">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
          <div className={`${statusInfo.bg} px-4 py-2 rounded-full`}>
            <div className="flex items-center gap-2">
              {statusInfo.icon}
              <span className={`font-semibold ${statusInfo.color}`}>
                {statusInfo.text}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-black mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0"
                >
                  {item.product && (
                    <>
                      <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded">
                        <Image
                          src={item.product.image_url}
                          alt={item.product.name}
                          fill
                          className="object-contain rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-black mb-1">
                          {item.product.name}
                        </h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Quantity: {item.quantity}</p>
                          {item.size && <p>Size: {item.size}</p>}
                          <p className="font-bold text-black">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-black text-lg">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              <MapPin size={20} />
              Shipping Address
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {order.shipping_address}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-black mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${(order.total - 9.99).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>$9.99</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-black">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              <CreditCard size={20} />
              Payment
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-semibold text-green-600">Paid</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Method:</span>
                <span className="text-black">Credit Card</span>
              </div>
              {order.payment_intent_id && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction:</span>
                  <span className="text-black text-xs">
                    {order.payment_intent_id.slice(0, 16)}...
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-black mb-4">Order Date</h2>
            <p className="text-gray-700">
              {new Date(order.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-bold text-black mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Contact our support team for any questions about your order.
            </p>
            <Link
              href="/contact"
              className="text-sm font-semibold text-black hover:text-gray-700 transition"
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
