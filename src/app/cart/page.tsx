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
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <ShoppingBag size={80} className="mx-auto mb-6 opacity-30" />
          <h1 className="text-4xl font-bold mb-4">YOUR CART IS EMPTY</h1>
          <p className="text-gray-400 mb-8">
            Start shopping to add items to your cart
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition border-2 border-black"
          >
            SHOP NOW <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-5xl font-bold">SHOPPING CART</h1>
        <button
          onClick={clearCart}
          className="text-red-500 hover:text-red-400 transition text-sm"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-zinc-900 rounded-lg p-6 flex gap-6"
            >
              <div className="relative w-32 h-32 shrink-0 bg-zinc-800 rounded-lg overflow-hidden">
                <Image
                  src={item.product.image_url}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link
                    href={`/product/${item.product.id}`}
                    className="text-xl font-bold hover:text-gray-300 transition"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-gray-400 mt-1 text-sm">
                    {item.product.category}
                  </p>
                  <p className="text-lg font-bold mt-2">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3 bg-zinc-800 rounded-lg p-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="hover:text-gray-300 transition"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="font-bold w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.product.stock}
                      className="hover:text-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-500 hover:text-red-400 transition"
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
          <div className="bg-zinc-900 rounded-lg p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">ORDER SUMMARY</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>{total > 100 ? "FREE" : "$9.99"}</span>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${(total + (total > 100 ? 0 : 9.99)).toFixed(2)}</span>
              </div>
            </div>

            {total < 100 && (
              <p className="text-sm text-gray-400 mb-6">
                Add ${(100 - total).toFixed(2)} more for free shipping!
              </p>
            )}

            <Link
              href="/checkout"
              className="w-full bg-white text-black py-3 px-6 rounded-full font-bold hover:bg-gray-200 transition inline-flex items-center justify-center gap-2 border-2 border-black"
            >
              CHECKOUT <ArrowRight size={16} />
            </Link>

            <Link
              href="/shop"
              className="w-full mt-4 border-2 border-white/20 text-white py-3 px-6 rounded-full font-bold hover:bg-white/10 transition inline-flex items-center justify-center"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
