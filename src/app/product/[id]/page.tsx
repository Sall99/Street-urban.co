"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, ArrowLeft, Minus, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
        toast.error("Product not found");
        router.push("/shop");
        return;
      }

      setProduct(data);
      setLoading(false);
    }

    if (params.id) {
      fetchProduct();
    }
  }, [params.id, router]);

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="animate-pulse">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <div className="aspect-square bg-gray-200 rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-20 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-black transition mb-6 sm:mb-8"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain"
            priority
          />
          {product.is_featured && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs sm:text-sm font-bold rounded">
              FEATURED
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black">
            {product.name}
          </h1>

          <p className="text-2xl sm:text-3xl font-bold mb-6 text-black">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="mb-6">
            <span className="inline-block bg-gray-200 text-black px-3 py-1 rounded-full text-xs sm:text-sm uppercase">
              {product.category}
            </span>
          </div>

          <div className="mb-6 sm:mb-8">
            {product.stock > 0 ? (
              <p className="text-green-600 text-sm sm:text-base">
                ✓ In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-red-600 text-sm sm:text-base">
                ✗ Out of Stock
              </p>
            )}
          </div>

          {product.stock > 0 && (
            <div className="mb-6 sm:mb-8">
              <label className="block mb-2 font-semibold text-black">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 text-black p-2 sm:p-3 rounded-lg hover:bg-gray-300 transition"
                >
                  <Minus size={16} />
                </button>
                <span className="text-xl sm:text-2xl font-bold w-12 text-center text-black">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="bg-gray-200 text-black p-2 sm:p-3 rounded-lg hover:bg-gray-300 transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="bg-black text-white py-3 px-6 rounded-full font-bold text-sm sm:text-base hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            {product.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
          </button>

          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
            <h3 className="font-bold mb-4 text-black">PRODUCT DETAILS</h3>
            <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
              <li>• Free shipping on orders over $100</li>
              <li>• 30-day return policy</li>
              <li>• Official Joyner Lucas merchandise</li>
              <li>• Limited edition items</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
