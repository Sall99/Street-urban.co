"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User, Package, LogOut, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Order } from "@/types";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      setUser(user);

      const { data: ordersData, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && ordersData) {
        setOrders(ordersData);
      }

      setLoading(false);
    }

    loadUserData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-zinc-800 rounded w-1/4" />
          <div className="h-40 bg-zinc-800 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-5xl font-bold">MY ACCOUNT</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-400 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-zinc-900 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center">
              <User size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Profile</h2>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/profile/orders"
              className="block px-4 py-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition"
            >
              <div className="flex items-center gap-3">
                <Package size={20} />
                <span>My Orders</span>
              </div>
            </Link>
            <Link
              href="/shop"
              className="block px-4 py-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} />
                <span>Continue Shopping</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="md:col-span-2 bg-zinc-900 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <Link
                  key={order.id}
                  href={`/profile/orders/${order.id}`}
                  className="block bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">
                      Order #{order.id.slice(0, 8)}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === "completed"
                          ? "bg-green-600"
                          : order.status === "pending"
                          ? "bg-yellow-600"
                          : "bg-gray-600"
                      }`}
                    >
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                    <span className="font-bold text-white">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </Link>
              ))}

              {orders.length > 5 && (
                <Link
                  href="/profile/orders"
                  className="block text-center text-gray-400 hover:text-white transition py-2"
                >
                  View all orders →
                </Link>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <Package size={64} className="mx-auto mb-4 opacity-50" />
              <p className="mb-4">No orders yet</p>
              <Link
                href="/shop"
                className="inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition border-2 border-black"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
