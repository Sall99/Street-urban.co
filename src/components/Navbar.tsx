"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, UserRound, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const categories = [
  { name: "T-SHIRT", slug: "t-shirt" },
  { name: "HOODIE", slug: "hoodie" },
  { name: "JOGGERS", slug: "joggers" },
  { name: "WOMEN'S", slug: "womens" },
  { name: "SOCKS", slug: "socks" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <nav className="fixed w-full backdrop-blur-sm z-50 py-8">
      <div className="hidden lg:block bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between space-x-8 h-14">
            <div className="flex items-center justify-center space-x-8 h-14">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/shop?category=${category.slug}`}
                  className="text-sm font-medium text-gray-700 hover:text-black transition whitespace-nowrap"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <div>
              <div className="flex items-center justify-between h-16 lg:h-20">
                <div className="flex items-center space-x-4 lg:space-x-6">
                  <Link
                    href="/profile"
                    className="text-gray-700 hover:text-black transition"
                  >
                    <UserRound size={20} className="lg:w-6 lg:h-6" />
                  </Link>
                  <Link
                    href="/cart"
                    className="relative text-gray-700 hover:text-black transition"
                  >
                    <ShoppingCart size={20} className="lg:w-6 lg:h-6" />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        {itemCount}
                      </span>
                    )}
                  </Link>

                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden text-black ml-2"
                  >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-black/10">
          <div className="px-4 py-6 space-y-3 max-h-[80vh] overflow-y-auto">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/shop?category=${category.slug}`}
                className="block text-gray-700 hover:text-black transition py-2 border-b border-black/5"
                onClick={() => setIsOpen(false)}
              >
                {category.name}
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-black/10">
              <Link
                href="/music"
                className="block text-gray-700 hover:text-black transition py-2"
                onClick={() => setIsOpen(false)}
              >
                MUSIC
              </Link>
              <Link
                href="/about"
                className="block text-gray-700 hover:text-black transition py-2"
                onClick={() => setIsOpen(false)}
              >
                ABOUT
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
