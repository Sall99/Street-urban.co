"use client";

import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Authentication Error
          </h1>
          <p className="text-gray-600 mb-6">
            There was an error processing your authentication. This could be due
            to:
          </p>
          <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
            <li>• Expired or invalid confirmation link</li>
            <li>• Network connectivity issues</li>
            <li>• Incorrect redirect URL configuration</li>
          </ul>
          <div className="space-y-3">
            <Link
              href="/auth/login"
              className="w-full bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="w-full border-2 border-black text-black px-6 py-3 rounded-full font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
