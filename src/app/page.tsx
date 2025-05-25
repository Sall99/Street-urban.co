import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types";

async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .limit(4);

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data || [];
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 py-20">
          <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles size={16} />
            <span>New Collection Available</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight text-black leading-none">
            STREET
            <br />
            <span className="bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent">
              URBAN.CO
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Premium streetwear for the modern generation.
            <br />
            Express yourself with exclusive designs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/shop"
              className="group bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-900 transition-all inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              SHOP COLLECTION
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/shop?category=t-shirt"
              className="border-2 border-black text-black px-8 py-4 rounded-full font-bold hover:bg-black hover:text-white transition-all inline-flex items-center justify-center gap-2"
            >
              EXPLORE STYLES
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-black mb-1">
                500+
              </div>
              <div className="text-sm text-gray-600 font-medium">Products</div>
            </div>
            <div className="text-center border-x border-gray-200">
              <div className="text-3xl md:text-4xl font-black text-black mb-1">
                10K+
              </div>
              <div className="text-sm text-gray-600 font-medium">Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-black mb-1">
                4.9★
              </div>
              <div className="text-sm text-gray-600 font-medium">Rating</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-black/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-black/40 rounded-full" />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3 text-black">
                <Sparkles className="text-yellow-500" size={32} />
                FEATURED DROPS
              </h2>
              <p className="text-gray-600 text-lg">
                Limited edition merchandise
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden md:flex items-center gap-2 text-black hover:text-gray-700 transition font-medium"
            >
              View All <ArrowRight size={20} />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-600">
              <ShoppingBag size={64} className="mx-auto mb-4 opacity-50" />
              <p>
                No products available yet. Configure your Supabase database to
                see products.
              </p>
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-black hover:text-gray-700 transition font-medium"
            >
              View All Products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-black">
            SHOP BY CATEGORY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "CLOTHING",
                href: "/shop?category=t-shirt",
                image:
                  "https://res.cloudinary.com/dx6jhjxpt/image/upload/v1760990044/Street-urban.co/30_ef5acdbe-bb21-44e6-8d75-3127bfd3b7db_uwmlfs.webp",
              },
              {
                name: "HOODIES",
                href: "/shop?category=hoodie",
                image:
                  "https://res.cloudinary.com/dx6jhjxpt/image/upload/v1760998154/Street-urban.co/78_9855078a-8a05-470f-9d3c-d1a6a974d3fe_eyggdc.webp",
              },
              {
                name: "SOCKS",
                href: "/shop?category=socks",
                image:
                  "https://res.cloudinary.com/dx6jhjxpt/image/upload/v1761033697/Street-urban.co/72_afc60a4c-2b84-4d3b-822f-98da21e0fe08_f8ea0i.webp",
              },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative h-64 rounded-lg overflow-hidden border border-gray-200 block"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent z-10" />
                <div className="relative w-full h-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    priority
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="text-3xl font-bold text-black group-hover:text-gray-700 transition">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-black">STAY UPDATED</h2>
          <p className="text-gray-600 mb-8">
            Get notified about new drops, exclusive releases, and special
            offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full bg-gray-50 border border-gray-300 focus:border-black outline-none transition text-black"
            />
            <button
              type="submit"
              className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
