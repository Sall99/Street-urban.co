"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Order } from "@/types";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Filter,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          toast.error("Please login to view orders");
          router.push("/auth/login");
          return;
        }

        const { data: ordersData, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setOrders(ordersData || []);
        setFilteredOrders(ordersData || []);
      } catch (error) {
        console.error("Error loading orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [router]);

  useEffect(() => {
    let filtered = [...orders];

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (order) => order.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Filter by search query (order ID or total)
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.total.toString().includes(searchQuery)
      );
    }

    setFilteredOrders(filtered);
  }, [statusFilter, searchQuery, orders]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock size={16} className="text-yellow-500" />;
      case "processing":
        return <Package size={16} className="text-blue-500" />;
      case "shipped":
        return <Truck size={16} className="text-purple-500" />;
      case "delivered":
      case "completed":
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-600";
      case "processing":
        return "bg-blue-600";
      case "shipped":
        return "bg-purple-600";
      case "delivered":
      case "completed":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-zinc-800 rounded w-1/4" />
          <div className="h-40 bg-zinc-800 rounded" />
          <div className="h-40 bg-zinc-800 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-4"
        >
          <ArrowLeft size={20} />
          Back to Profile
        </Link>
        <h1 className="text-5xl font-bold mb-2">MY ORDERS</h1>
        <p className="text-gray-400">
          View and track all your orders in one place
        </p>
      </div>

      {orders.length > 0 ? (
        <>
          {/* Filters */}
          <div className="bg-zinc-900 rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search by order ID or total..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition text-white"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition text-white cursor-pointer"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-gray-400">
              Showing {filteredOrders.length} of {orders.length} orders
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/profile/orders/${order.id}`}
                  className="block bg-zinc-900 rounded-lg p-6 hover:bg-zinc-800 transition border border-zinc-800 hover:border-zinc-700"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-lg">
                          Order #{order.id.slice(0, 8).toUpperCase()}
                        </span>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status.toUpperCase()}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>
                          {new Date(order.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                        {order.payment_intent_id && (
                          <span className="hidden sm:inline">
                            ID: {order.payment_intent_id.slice(0, 16)}...
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6">
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          ${order.total.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-400">Total</div>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <span className="text-sm">View Details →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-zinc-900 rounded-lg p-12 text-center">
              <Package size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-gray-400 mb-2">No orders found</p>
              <p className="text-sm text-gray-500">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setSearchQuery("");
                }}
                className="mt-4 text-white hover:text-gray-300 transition text-sm"
              >
                Clear Filters
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-zinc-900 rounded-lg p-12 text-center">
          <Package size={64} className="mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
          <p className="text-gray-400 mb-6">
            Start shopping to see your orders here
          </p>
          <Link
            href="/shop"
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition border-2 border-black"
          >
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
}
