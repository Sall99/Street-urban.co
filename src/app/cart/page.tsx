"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } =
    useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-20">
        <div className="text-center">
          <ShoppingBag size={60} className="mx-auto mb-4 sm:mb-6 opacity-30" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-black">
            YOUR CART IS EMPTY
          </h1>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Start shopping to add items to your cart
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition"
          >
            SHOP NOW <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 sm:mb-0">
          SHOPPING CART
        </h1>
        <button
          onClick={clearCart}
          className="text-red-500 hover:text-red-600 transition text-sm"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <div className="relative w-full sm:w-32 h-32 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={item.product.image_url}
                  alt={item.product.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link
                    href={`/product/${item.product.id}`}
                    className="text-lg sm:text-xl font-bold hover:text-gray-600 transition text-black"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-gray-600 mt-1 text-sm">
                    {item.product.category}
                  </p>
                  <p className="text-lg font-bold mt-2 text-black">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="hover:text-gray-600 transition text-black"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="font-bold w-8 text-center text-black">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.product.stock}
                      className="hover:text-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed text-black"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg text-black">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 sticky top-24">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black">
              ORDER SUMMARY
            </h2>

            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{total > 100 ? "FREE" : "$9.99"}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 sm:pt-4 flex justify-between text-lg sm:text-xl font-bold text-black">
                <span>Total</span>
                <span>${(total + (total > 100 ? 0 : 9.99)).toFixed(2)}</span>
              </div>
            </div>

            {total < 100 && (
              <p className="text-sm text-gray-600 mb-4 sm:mb-6">
                Add ${(100 - total).toFixed(2)} more for free shipping!
              </p>
            )}

            <Link
              href="/checkout"
              className="w-full bg-black text-white py-3 px-6 rounded-full font-bold hover:bg-gray-800 transition inline-flex items-center justify-center gap-2"
            >
              CHECKOUT <ArrowRight size={16} />
            </Link>

            <Link
              href="/shop"
              className="w-full mt-4 border-2 border-gray-300 text-black py-3 px-6 rounded-full font-bold hover:bg-gray-50 transition inline-flex items-center justify-center"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
