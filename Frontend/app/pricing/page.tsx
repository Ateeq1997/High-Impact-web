"use client";

import PricingPlans from "@/components/home/PricingPlans";
import DashboardHeader from "@/components/layout/Header";

import { CheckCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function PricingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (i: number) => {
    setOpenFAQ(openFAQ === i ? null : i);
  };

  const commonFeatures = [
    "Secure cloud storage",
    "Access on all devices",
    "Regular feature updates",
    "Customer support",
    "Advanced map viewer",
  ];

  const faqs = [
    {
      q: "Can I change my plan later?",
      a: "Yes, you can upgrade or downgrade your plan anytime from your account settings.",
    },
    {
      q: "Do you offer refunds?",
      a: "Refunds are handled case-by-case for annual subscriptions only.",
    },
    {
      q: "Is my farm data secure?",
      a: "Yes, all data is encrypted and protected with industry-leading security standards.",
    },
    {
      q: "Will new features be included in my plan?",
      a: "All major feature updates are included in Pro and Enterprise plans.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="pt-24">
        {/* ⭐ Existing Pricing Cards */}
        <PricingPlans />

        {/* ⭐ Section 1 — What’s Included in Every Plan */}
        <section className="py-20 bg-white text-center px-6">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            What’s Included in All Plans
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Every subscription comes with powerful farm management tools
            designed to make mapping, tracking, and managing your land easier.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {commonFeatures.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-gray-100 p-5 rounded-xl border border-gray-200"
              >
                <CheckCircle className="text-green-600 w-6 h-6" />
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ⭐ Section 2 — Compare Plans */}
        <section className="py-20 bg-gray-50 px-6">
          <h2 className="text-3xl font-bold text-blue-700 text-center mb-10">
            Compare Plans
          </h2>

          <div className="overflow-x-auto max-w-5xl mx-auto border border-gray-200 rounded-xl bg-white shadow text-black">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-blue-50">
                  <th className="p-4 font-semibold">Features</th>
                  <th className="p-4 font-semibold">Freemium</th>
                  <th className="p-4 font-semibold">Pro</th>
                  <th className="p-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Farm Map Viewer</td>
                  <td className="p-4">Basic</td>
                  <td className="p-4">Advanced</td>
                  <td className="p-4">Advanced + Custom Layers</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">User Accounts</td>
                  <td className="p-4">1 User</td>
                  <td className="p-4">Up to 5</td>
                  <td className="p-4">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">NDVI & Analytics</td>
                  <td className="p-4">Limited</td>
                  <td className="p-4">Full</td>
                  <td className="p-4">Full + Custom Integration</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Priority Support</td>
                  <td className="p-4">No</td>
                  <td className="p-4">Yes</td>
                  <td className="p-4">Dedicated Manager</td>
                </tr>
                <tr>
                  <td className="p-4">API Access</td>
                  <td className="p-4">No</td>
                  <td className="p-4">Limited</td>
                  <td className="p-4">Full</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ⭐ Section 3 — FAQ */}
        <section className="py-20 bg-white px-6">
          <h2 className="text-3xl font-bold text-blue-700 text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((item, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-5 bg-gray-50 cursor-pointer"
                onClick={() => toggleFAQ(i)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.q}
                  </h3>

                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      openFAQ === i ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {openFAQ === i && (
                  <p className="mt-3 text-gray-600">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

    </div>
  );
}
