"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success("Added to cart!");
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="bg-white overflow-hidden transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-white mb-3">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-500"
          />
          {product.sale_price && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
              SALE
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
              <span className="text-black font-bold text-lg">OUT OF STOCK</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-black font-bold text-sm md:text-base uppercase tracking-wide line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-2">
            {product.sale_price ? (
              <>
                <span className="text-black font-bold text-base md:text-lg">
                  ${product.sale_price.toFixed(0)}
                </span>
                <span className="text-gray-500 text-sm line-through">
                  ${product.price.toFixed(0)}
                </span>
              </>
            ) : (
              <span className="text-black font-bold text-base md:text-lg">
                ${product.price.toFixed(0)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
