/* eslint-disable @next/next/no-html-link-for-pages */
import { RotateCcw, Clock, Package, AlertCircle } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-black mb-6">
            RETURNS & EXCHANGES
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Easy returns and exchanges within 30 days. We want you to love your
            purchase.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full">
                <RotateCcw size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  30-Day Return Policy
                </h3>
                <p className="text-gray-600 mb-4">
                  Return any unworn, unwashed items within 30 days of delivery
                  for a full refund.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Items must be in original condition</li>
                  <li>• Tags and packaging included</li>
                  <li>• Free return shipping</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full">
                <Package size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  Exchange Process
                </h3>
                <p className="text-gray-600 mb-4">
                  Need a different size or color? We make exchanges simple and
                  free.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Free size exchanges</li>
                  <li>• Color exchanges available</li>
                  <li>• Processing within 2-3 business days</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  Processing Times
                </h3>
                <p className="text-gray-600 mb-4">
                  Quick processing ensures you get your refund or exchange fast.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Refunds: 3-5 business days</li>
                  <li>• Exchanges: 5-7 business days</li>
                  <li>• Store credit: Instant</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full">
                <AlertCircle size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  Return Conditions
                </h3>
                <p className="text-gray-600 mb-4">
                  Items must meet our return conditions to be eligible for
                  refund.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Unworn and unwashed</li>
                  <li>• Original tags attached</li>
                  <li>• No damage or stains</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-black mb-6">How to Return</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h4 className="font-bold text-black mb-2">Start Return</h4>
              <p className="text-gray-600">
                Log into your account and select the items you want to return.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h4 className="font-bold text-black mb-2">Package Items</h4>
              <p className="text-gray-600">
                Pack items in original packaging with all tags attached.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h4 className="font-bold text-black mb-2">Ship Back</h4>
              <p className="text-gray-600">
                Use the prepaid return label and drop off at any carrier
                location.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-black text-white rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">Return Exceptions</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <p>
                Final sale items marked as &quot;No Returns&quot; cannot be
                returned or exchanged.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <p>Custom or personalized items are not eligible for returns.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <p>
                Items damaged by customer misuse are not eligible for returns.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <p>Returns must be initiated within 30 days of delivery date.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-black mb-6">Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Have questions about returns or exchanges? Our customer service team
            is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition text-center"
            >
              CONTACT SUPPORT
            </a>
            <a
              href="/profile/orders"
              className="border-2 border-black text-black px-6 py-3 rounded-full font-bold hover:bg-black hover:text-white transition text-center"
            >
              VIEW ORDERS
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
