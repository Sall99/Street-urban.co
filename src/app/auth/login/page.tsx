"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Welcome back!");
      router.push("/profile");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to login";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">WELCOME BACK</h1>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <div className="bg-zinc-900 rounded-lg p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold">Email</label>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-white/10 rounded-lg focus:border-white/30 outline-none transition"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Password</label>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-white/10 rounded-lg focus:border-white/30 outline-none transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <Link
                href="/auth/reset-password"
                className="text-gray-400 hover:text-white transition"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-3 rounded-full font-bold hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 border-2 border-black"
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-white font-semibold hover:text-gray-300 transition"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
