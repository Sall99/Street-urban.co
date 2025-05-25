"use client";

import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            Payment Cancelled
          </h1>
          <p className="text-gray-600 text-lg">
            Your payment was cancelled. No charges were made.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <p className="text-gray-700">
            Don&apos;t worry! Your cart items are still saved. You can review
            your order and try again when you&apos;re ready.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/cart"
            className="flex-1 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition text-center inline-flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            Back to Cart
          </Link>
          <Link
            href="/shop"
            className="flex-1 border-2 border-black text-black px-6 py-3 rounded-full font-bold hover:bg-gray-50 transition text-center inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
