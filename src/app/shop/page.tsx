import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";

interface SearchParams {
  category?: string;
}

async function getProducts(category?: string): Promise<Product[]> {
  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data || [];
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const products = await getProducts(searchParams.category);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
