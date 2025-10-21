"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqData = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 3-5 business days. Express shipping delivers in 1-2 business days. International orders take 7-14 business days.",
      },
      {
        question: "Do you offer free shipping?",
        answer:
          "Yes! We offer free standard shipping on all orders over $75. Orders under $75 have a $8.99 shipping fee.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Absolutely! You'll receive a tracking number via email once your order ships. You can also track your order in your account dashboard.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship worldwide. International shipping is $25.99 and takes 7-14 business days. Customs duties may apply.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy. Items must be unworn, unwashed, and in original condition with tags attached.",
      },
      {
        question: "How do I return an item?",
        answer:
          "Log into your account, select the items you want to return, print the prepaid return label, and drop off at any carrier location.",
      },
      {
        question: "Are returns free?",
        answer:
          "Yes! All returns and exchanges are free. We provide prepaid return labels for your convenience.",
      },
      {
        question: "How long do refunds take?",
        answer:
          "Refunds are processed within 3-5 business days after we receive your return. You'll receive an email confirmation once processed.",
      },
    ],
  },
  {
    category: "Products & Sizing",
    questions: [
      {
        question: "How do I find my size?",
        answer:
          "Check our size guide on each product page. We provide detailed measurements for all items. When in doubt, size up for a relaxed fit.",
      },
      {
        question: "What materials do you use?",
        answer:
          "We use premium materials including 100% cotton, cotton blends, and high-quality synthetic fabrics for durability and comfort.",
      },
      {
        question: "Are your products ethically made?",
        answer:
          "Yes, we partner with ethical manufacturers who follow fair labor practices and sustainable production methods.",
      },
      {
        question: "Do you offer plus sizes?",
        answer:
          "Yes! We offer extended sizing for most items. Check individual product pages for available sizes.",
      },
    ],
  },
  {
    category: "Account & Payment",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes, we use industry-standard SSL encryption and partner with secure payment processors to protect your information.",
      },
      {
        question: "Can I change my order after placing it?",
        answer:
          "Orders can be modified within 1 hour of placement if they haven't entered processing. Contact customer service immediately.",
      },
      {
        question: "Do you offer student discounts?",
        answer:
          "Yes! Students get 10% off with a valid student ID. Sign up for our newsletter to receive exclusive student offers.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-black mb-6">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about orders, shipping, returns,
            and more.
          </p>
        </div>

        <div className="space-y-12">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-black text-white p-2 rounded-full">
                  <HelpCircle size={20} />
                </div>
                <h2 className="text-3xl font-bold text-black">
                  {category.category}
                </h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openItems[key];

                  return (
                    <div
                      key={questionIndex}
                      className="border border-gray-200 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(categoryIndex, questionIndex)}
                        className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition"
                      >
                        <h3 className="text-lg font-semibold text-black pr-4">
                          {item.question}
                        </h3>
                        {isOpen ? (
                          <ChevronUp
                            size={24}
                            className="text-gray-500 shrink-0"
                          />
                        ) : (
                          <ChevronDown
                            size={24}
                            className="text-gray-500 shrink-0"
                          />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-black mb-6">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Can&apos;t find what you&apos;re looking for? Our customer service
            team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition text-center"
            >
              CONTACT US
            </a>
            <a
              href="mailto:support@street-urban.co"
              className="border-2 border-black text-black px-6 py-3 rounded-full font-bold hover:bg-black hover:text-white transition text-center"
            >
              EMAIL SUPPORT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
