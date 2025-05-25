"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const clearCart = useCartStore((state) => state.clearCart);
  const [orderNumber, setOrderNumber] = useState<string>("");

  useEffect(() => {
    if (sessionId) {
      clearCart();
      setOrderNumber(`ORD-${Date.now().toString(36).toUpperCase()}`);
    }
  }, [sessionId, clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 text-lg">
            Thank you for your order. We&apos;ve received your payment.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-6 h-6 text-black" />
            <h2 className="text-xl font-bold text-black">Order Details</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-bold text-black">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-bold text-green-600">Confirmed</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment:</span>
              <span className="font-bold text-green-600">Completed</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-8">
          <h3 className="text-lg font-bold text-black mb-4">
            What&apos;s Next?
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>
                You&apos;ll receive a confirmation email with your order details
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>
                We&apos;ll send you tracking information once your order ships
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>Expected delivery: 5-7 business days</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/shop"
            className="flex-1 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition text-center inline-flex items-center justify-center gap-2"
          >
            Continue Shopping
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/profile"
            className="flex-1 border-2 border-black text-black px-6 py-3 rounded-full font-bold hover:bg-gray-50 transition text-center"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
