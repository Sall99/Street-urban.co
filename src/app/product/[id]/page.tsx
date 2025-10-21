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
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="aspect-square bg-zinc-800 rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-zinc-800 rounded w-3/4" />
              <div className="h-4 bg-zinc-800 rounded w-1/2" />
              <div className="h-20 bg-zinc-800 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-8"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="relative aspect-square bg-zinc-900 rounded-lg overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {product.is_featured && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 text-sm font-bold">
              FEATURED
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</p>

          <p className="text-gray-400 mb-8 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="mb-6">
            <span className="inline-block bg-zinc-800 px-4 py-2 rounded-full text-sm uppercase">
              {product.category}
            </span>
          </div>

          <div className="mb-8">
            {product.stock > 0 ? (
              <p className="text-green-500">
                ✓ In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-red-500">✗ Out of Stock</p>
            )}
          </div>

          {product.stock > 0 && (
            <div className="mb-8">
              <label className="block mb-2 font-semibold">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-zinc-800 p-3 rounded-lg hover:bg-zinc-700 transition"
                >
                  <Minus size={20} />
                </button>
                <span className="text-2xl font-bold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="bg-zinc-800 p-3 rounded-lg hover:bg-zinc-700 transition"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="bg-white text-black py-3 px-6 rounded-full font-bold text-base hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-2 border-black"
          >
            <ShoppingCart size={20} />
            {product.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
          </button>

          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="font-bold mb-4">PRODUCT DETAILS</h3>
            <ul className="space-y-2 text-gray-400">
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
