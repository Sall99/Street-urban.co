import Link from "next/link";
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              <Link href="/">Street Urban</Link>
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Premium streetwear for the modern generation.
              <br />
              Express yourself with exclusive designs.
              <br />
              <Link
                href="/shop"
                className="hover:text-black transition underline"
              >
                Shop Now
              </Link>
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">SHOP</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/shop?category=t-shirt"
                  className="hover:text-black transition"
                >
                  T-shirts
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=hoodie"
                  className="hover:text-black transition"
                >
                  hoodies
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=socks"
                  className="hover:text-black transition"
                >
                  Socks
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-black transition">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">SUPPORT</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/shipping" className="hover:text-black transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-black transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-black transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">FOLLOW</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Joyner Lucas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
