"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-black mb-6">CONTACT US</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with our team. We&apos;re here to help with any
            questions or concerns.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-black text-white p-3 rounded-full">
                <MessageCircle size={24} />
              </div>
              <h2 className="text-3xl font-bold text-black">
                Send us a Message
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none transition"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none transition"
                >
                  <option value="">Select a subject</option>
                  <option value="order-inquiry">Order Inquiry</option>
                  <option value="shipping-question">Shipping Question</option>
                  <option value="return-exchange">Return/Exchange</option>
                  <option value="product-question">Product Question</option>
                  <option value="size-help">Size Help</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none transition resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2"
              >
                <Send size={20} />
                SEND MESSAGE
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-black text-white p-3 rounded-full">
                <Phone size={24} />
              </div>
              <h2 className="text-3xl font-bold text-black">Get in Touch</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Mail size={20} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-bold text-black mb-1">Email Support</h3>
                  <p className="text-gray-600 mb-2">Get help via email</p>
                  <a
                    href="mailto:support@street-urban.co"
                    className="text-black hover:underline"
                  >
                    support@street-urban.co
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Phone size={20} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-bold text-black mb-1">Phone Support</h3>
                  <p className="text-gray-600 mb-2">Call us directly</p>
                  <a
                    href="tel:+1-555-STREET"
                    className="text-black hover:underline"
                  >
                    +1 (555) STREET
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <MapPin size={20} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-bold text-black mb-1">Headquarters</h3>
                  <p className="text-gray-600 mb-2">Visit our office</p>
                  <p className="text-black">
                    123 Street Avenue
                    <br />
                    Urban City, UC 12345
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Clock size={20} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-bold text-black mb-1">Business Hours</h3>
                  <p className="text-gray-600 mb-2">
                    When we&apos;re available
                  </p>
                  <div className="text-black space-y-1">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-black mb-4">
                Quick Response Times
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Email Support</span>
                  <span className="font-semibold text-black">
                    Within 24 hours
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Phone Support</span>
                  <span className="font-semibold text-black">Immediate</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Live Chat</span>
                  <span className="font-semibold text-black">
                    Within 5 minutes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
