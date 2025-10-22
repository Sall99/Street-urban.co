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
    <nav className="fixed w-full backdrop-blur-sm z-50 bg-white/95 border-b border-gray-100">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
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
            <div className="flex items-center space-x-6">
              <Link
                href="/profile"
                className="text-gray-700 hover:text-black transition"
              >
                <UserRound size={20} />
              </Link>
              <Link
                href="/cart"
                className="relative text-gray-700 hover:text-black transition"
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Header */}
      <div className="lg:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/profile"
                className="text-gray-700 hover:text-black transition"
              >
                <UserRound size={20} />
              </Link>
              <Link
                href="/cart"
                className="relative text-gray-700 hover:text-black transition"
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="text-black">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-1 max-h-[80vh] overflow-y-auto">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/shop?category=${category.slug}`}
                className="block text-gray-700 hover:text-black transition py-3 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {category.name}
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-200">
              <Link
                href="/about"
                className="block text-gray-700 hover:text-black transition py-3"
                onClick={() => setIsOpen(false)}
              >
                ABOUT
              </Link>
              <Link
                href="/shipping"
                className="block text-gray-700 hover:text-black transition py-3"
                onClick={() => setIsOpen(false)}
              >
                SHIPPING
              </Link>
              <Link
                href="/returns"
                className="block text-gray-700 hover:text-black transition py-3"
                onClick={() => setIsOpen(false)}
              >
                RETURNS
              </Link>
              <Link
                href="/faq"
                className="block text-gray-700 hover:text-black transition py-3"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="block text-gray-700 hover:text-black transition py-3"
                onClick={() => setIsOpen(false)}
              >
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
