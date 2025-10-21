import { Truck, Clock, Shield, MapPin } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-black mb-6">SHIPPING INFO</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our shipping policies and delivery
            options.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  Standard Shipping
                </h3>
                <p className="text-gray-600 mb-4">
                  Free shipping on orders over $75. Standard delivery takes 3-5
                  business days.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Orders under $75: $8.99 shipping</li>
                  <li>• Processing time: 1-2 business days</li>
                  <li>• Delivery: 3-5 business days</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  Express Shipping
                </h3>
                <p className="text-gray-600 mb-4">
                  Need it faster? Express shipping delivers in 1-2 business
                  days.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Express delivery: $15.99</li>
                  <li>• Processing time: Same day (if ordered before 2 PM)</li>
                  <li>• Delivery: 1-2 business days</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  International Shipping
                </h3>
                <p className="text-gray-600 mb-4">
                  We ship worldwide with tracking and insurance included.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• International delivery: $25.99</li>
                  <li>• Processing time: 2-3 business days</li>
                  <li>• Delivery: 7-14 business days</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  Tracking & Updates
                </h3>
                <p className="text-gray-600 mb-4">
                  Stay informed with real-time tracking and delivery
                  notifications.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Email tracking updates</li>
                  <li>• SMS delivery notifications</li>
                  <li>• Real-time package location</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-black mb-6">
            Shipping Zones & Times
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-bold text-black mb-2">Domestic (US)</h4>
              <p className="text-gray-600">3-5 business days</p>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-black mb-2">Canada</h4>
              <p className="text-gray-600">5-7 business days</p>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-black mb-2">International</h4>
              <p className="text-gray-600">7-14 business days</p>
            </div>
          </div>
        </div>

        <div className="bg-black text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6">Important Notes</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <p>
                Delivery times are estimates and may vary due to weather,
                holidays, or carrier delays.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <p>
                We are not responsible for delays caused by incorrect shipping
                addresses.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <p>
                International orders may be subject to customs duties and taxes.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <p>
                Contact us immediately if your package is damaged or lost in
                transit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
