"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import {
  Plus,
  Edit,
  Trash2,
  Package,
  DollarSign,
  ShoppingBag,
} from "lucide-react";
import { Product } from "@/types";

export default function AdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    sale_price: "",
    image_url: "",
    image_url_2: "",
    image_url_3: "",
    category: "t-shirt",
    stock: "",
    is_featured: false,
    weight: "",
    material: "",
    sku: "",
    features: "",
    sizes: "XS,S,M,L,XL,XXL",
  });

  useEffect(() => {
    async function checkAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please login to access admin panel");
        router.push("/auth/login");
        return;
      }

      loadProducts();
    }

    checkAdmin();
  }, [router]);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const featuresArray = formData.features
        ? formData.features
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean)
        : [];

      const sizesArray = formData.sizes
        ? formData.sizes
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        sale_price: formData.sale_price
          ? parseFloat(formData.sale_price)
          : null,
        image_url: formData.image_url,
        image_url_2: formData.image_url_2 || null,
        image_url_3: formData.image_url_3 || null,
        category: formData.category,
        stock: parseInt(formData.stock),
        is_featured: formData.is_featured,
        weight: formData.weight || null,
        material: formData.material || null,
        sku: formData.sku || null,
        features: featuresArray.length > 0 ? featuresArray : null,
        sizes: sizesArray.length > 0 ? sizesArray : null,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);

        if (error) throw error;
        toast.success("Product updated successfully");
      } else {
        const { error } = await supabase.from("products").insert(productData);

        if (error) throw error;
        toast.success("Product created successfully");
      }

      resetForm();
      loadProducts();
      setShowModal(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to save product";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      sale_price: product.sale_price?.toString() || "",
      image_url: product.image_url,
      image_url_2: product.image_url_2 || "",
      image_url_3: product.image_url_3 || "",
      category: product.category,
      stock: product.stock.toString(),
      is_featured: product.is_featured,
      weight: product.weight || "",
      material: product.material || "",
      sku: product.sku || "",
      features: product.features?.join(", ") || "",
      sizes: product.sizes?.join(", ") || "XS,S,M,L,XL,XXL",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;

      toast.success("Product deleted successfully");
      loadProducts();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete product";
      toast.error(errorMessage);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      sale_price: "",
      image_url: "",
      image_url_2: "",
      image_url_3: "",
      category: "t-shirt",
      stock: "",
      is_featured: false,
      weight: "",
      material: "",
      sku: "",
      features: "",
      sizes: "XS,S,M,L,XL,XXL",
    });
    setEditingProduct(null);
  };

  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
    lowStock: products.filter((p) => p.stock < 10).length,
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-zinc-800 rounded w-1/4" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-32 bg-zinc-800 rounded" />
            <div className="h-32 bg-zinc-800 rounded" />
            <div className="h-32 bg-zinc-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-5xl font-bold">ADMIN DASHBOARD</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition inline-flex items-center gap-2 border-2 border-black"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-zinc-900 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 mb-1">Total Products</p>
              <p className="text-3xl font-bold">{stats.totalProducts}</p>
            </div>
            <ShoppingBag size={40} className="text-blue-500" />
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 mb-1">Total Value</p>
              <p className="text-3xl font-bold">
                ${stats.totalValue.toFixed(0)}
              </p>
            </div>
            <DollarSign size={40} className="text-green-500" />
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 mb-1">Low Stock Items</p>
              <p className="text-3xl font-bold">{stats.lowStock}</p>
            </div>
            <Package size={40} className="text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-6 py-4 text-left font-bold">Product</th>
                <th className="px-6 py-4 text-left font-bold">Category</th>
                <th className="px-6 py-4 text-left font-bold">Price</th>
                <th className="px-6 py-4 text-left font-bold">Stock</th>
                <th className="px-6 py-4 text-left font-bold">Featured</th>
                <th className="px-6 py-4 text-left font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span className="font-semibold">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize">{product.category}</td>
                  <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`${
                        product.stock < 10 ? "text-yellow-500" : ""
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.is_featured ? "✓" : ""}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-500 hover:text-blue-400 transition"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:text-red-400 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-zinc-800 border-2 border-white/20 rounded-lg focus:border-white/50 outline-none transition"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  SKU (Optional)
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                  placeholder="BF-CREW-001"
                  className="w-full px-4 py-3 bg-zinc-800 border-2 border-white/20 rounded-lg focus:border-white/50 outline-none transition"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-800 border-2 border-white/20 rounded-lg focus:border-white/50 outline-none transition"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-semibold">
                    Regular Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-white/20 rounded-lg focus:border-white/50 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">
                    Sale Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.sale_price}
                    onChange={(e) =>
                      setFormData({ ...formData, sale_price: e.target.value })
                    }
                    placeholder="Optional"
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-white/20 rounded-lg focus:border-white/50 outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block font-semibold">Product Images</label>

                <div>
                  <label className="block mb-1 text-sm text-gray-400">
                    Image 1 (Primary) *
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) =>
                      setFormData({ ...formData, image_url: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-white/20 rounded-lg focus:border-white/50 outline-none transition"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm text-gray-400">
                    Image 2 (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.image_url_2}
                    onChange={(e) =>
                      setFormData({ ...formData, image_url_2: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-white/20 rounded-lg focus:border-white/50 outline-none transition"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm text-gray-400">
                    Image 3 (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.image_url_3}
                    onChange={(e) =>
                      setFormData({ ...formData, image_url_3: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-white/20 rounded-lg focus:border-white/50 outline-none transition"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-semibold">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-white/20 rounded-lg focus:border-white/50 outline-none transition"
                  >
                    <option value="t-shirt">T-Shirt</option>
                    <option value="hoodie">Hoodie</option>
                    <option value="joggers">Joggers</option>
                    <option value="womens">Women&apos;s</option>
                    <option value="socks">Socks</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-semibold">Stock *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-white/20 rounded-lg focus:border-white/50 outline-none transition"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-semibold">Weight</label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                    placeholder="12 oz. Heavyweight Fleece"
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-white/20 rounded-lg focus:border-white/50 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">Material</label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) =>
                      setFormData({ ...formData, material: e.target.value })
                    }
                    placeholder="Premium 60/40 Fleece Blend"
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-white/20 rounded-lg focus:border-white/50 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Available Sizes
                </label>
                <input
                  type="text"
                  value={formData.sizes}
                  onChange={(e) =>
                    setFormData({ ...formData, sizes: e.target.value })
                  }
                  placeholder="XS, S, M, L, XL, XXL"
                  className="w-full px-4 py-3 bg-zinc-800 border-2 border-white/20 rounded-lg focus:border-white/50 outline-none transition"
                />
                <p className="text-sm text-gray-400 mt-1">
                  Separate sizes with commas
                </p>
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Product Features
                </label>
                <textarea
                  value={formData.features}
                  onChange={(e) =>
                    setFormData({ ...formData, features: e.target.value })
                  }
                  rows={3}
                  placeholder="12 oz. Heavyweight Fleece, 3-End Yarn Construction, Premium 60/40 Fleece Blend"
                  className="w-full px-4 py-3 bg-zinc-800 border-2 border-white/20 rounded-lg focus:border-white/50 outline-none transition"
                />
                <p className="text-sm text-gray-400 mt-1">
                  Separate features with commas
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_featured: e.target.checked,
                      })
                    }
                    className="rounded"
                  />
                  <span className="font-semibold">Featured Product</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-white text-black py-3 rounded-full font-bold hover:bg-gray-200 transition disabled:opacity-50 border-2 border-black"
                >
                  {loading
                    ? "Saving..."
                    : editingProduct
                    ? "Update Product"
                    : "Create Product"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-8 py-3 border-2 border-white/20 rounded-full font-bold hover:bg-white/10 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
