"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { CreditCard, Lock, ArrowRight } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please login to checkout");
        router.push("/auth/login");
        return;
      }

      setUser(user);
      setFormData((prev) => ({ ...prev, email: user.email || "" }));
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      router.push("/shop");
      return;
    }

    checkUser();
  }, [items.length, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to checkout");
      router.push("/auth/login");
      return;
    }

    setLoading(true);

    try {
      if (
        !formData.address ||
        !formData.city ||
        !formData.state ||
        !formData.zipCode
      ) {
        toast.error("Please fill in all shipping address fields");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items,
          customerEmail: formData.email || user.email,
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to process checkout";
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const total = getTotal();
  const shippingCost = total > 100 ? 0 : 9.99;
  const finalTotal = total + shippingCost;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-black">
        CHECKOUT
      </h1>

      <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black">
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-semibold text-black">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-black outline-none transition text-black"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-black">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-black outline-none transition text-black"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-black">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-black outline-none transition text-black"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-black">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-black outline-none transition text-black"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-semibold text-black">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-black outline-none transition text-black"
                    placeholder="123 Main St"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-2 font-semibold text-black">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-black outline-none transition text-black"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-black">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-black outline-none transition text-black"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-black">
                      Zip Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-black outline-none transition text-black"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-black">
                <CreditCard size={24} />
                Payment Information
              </h2>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                      <svg
                        viewBox="0 0 60 25"
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="25"
                      >
                        <path
                          fill="#635BFF"
                          d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-black">
                        Secure Checkout
                      </p>
                      <p className="text-sm text-gray-600">Powered by Stripe</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    You will be redirected to Stripe&apos;s secure payment page
                    to complete your purchase. Your payment information is
                    encrypted and secure.
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm text-gray-600">We accept:</span>
                  <div className="flex items-center gap-2">
                    <div className="bg-white rounded px-2 py-1">
                      <span className="text-xs font-bold text-blue-600">
                        VISA
                      </span>
                    </div>
                    <div className="bg-white rounded px-2 py-1">
                      <span className="text-xs font-bold text-orange-600">
                        Mastercard
                      </span>
                    </div>
                    <div className="bg-white rounded px-2 py-1">
                      <span className="text-xs font-bold text-blue-700">
                        AMEX
                      </span>
                    </div>
                    <div className="bg-white rounded px-2 py-1">
                      <span className="text-xs font-bold text-purple-600">
                        Discover
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Lock size={16} />
                  <span>256-bit SSL encryption • PCI DSS compliant</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-full font-bold text-sm sm:text-base hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              <Lock size={16} />
              {loading ? "PLACING ORDER..." : "PLACE ORDER"}
              <ArrowRight size={16} />
            </button>

            <p className="text-center text-gray-600 text-sm">
              By placing your order, you agree to our terms and conditions
            </p>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 sticky top-24">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black">
              Order Summary
            </h2>

            <div className="space-y-4 mb-4 sm:mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-black">
                      {item.product.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-black">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-lg sm:text-xl font-bold border-t border-gray-200 pt-4 text-black">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
