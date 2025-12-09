"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AdminDashboardHeader from "@/components/dashboard/AdminDashHeader"; // ⭐ added this
import { LogOut } from "lucide-react";

export default function BetaUserPage() {
  const router = useRouter();
  const [role, setRole] = useState("");

  // ⭐ Load role from localStorage
  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (user) {
      const parsed = JSON.parse(user);
      setRole(parsed.role); // already lowercase from login.js
    }
  }, []);

  const faqData = [
    {
      section: "Account Information",
      items: [
        { question: "Name", answer: "John Doe" },
        { question: "Email", answer: "john.doe@farmconnect.com" },
        { question: "Tier", answer: "Beta User" },
      ],
    },
    {
      section: "Purchase History",
      items: [
        {
          question: "View Purchase",
          answer: "You have 2 recent land purchases in Green Valley.",
        },
      ],
    },
    {
      section: "Usage Limits",
      items: [
        {
          question: "Company Lookups",
          answer: "You have 500 lookups remaining this month.",
        },
      ],
    },
    {
      section: "Resources",
      items: [
        {
          question: "Terms of Use",
          answer: "You must comply with our agricultural data policy.",
        },
        {
          question: "Privacy Policy",
          answer: "We protect all land data with encryption.",
        },
        {
          question: "Email Support",
          answer: "Reach us at support@farmconnect.com",
        },
      ],
    },
  ];

  return (
    <>
      {/* ⭐ Dynamic Header */}
      {role === "admin" ? <AdminDashboardHeader /> : <DashboardHeader />}

      <div className="min-h-screen bg-gray-50 px-8 py-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          Account 🟦 {/* Added emoji for visual change */}
        </h1>

        {/* User Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => router.push("/accounts")}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200 transform hover:scale-105"
          >
            Alpha User
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105">
            Beta User
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Welcome, <span className="font-semibold">Beta User</span>! You have early
          access to advanced land management tools.
        </p>

        {/* FAQ Sections */}
        <div className="space-y-6">
          {faqData.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-800 flex items-center gap-1">
                {section.section} 📌 {/* Added emoji */}
              </h2>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="hover:bg-gray-50 rounded-lg p-2 transition-colors">
                    <p className="font-medium text-gray-700">{item.question}</p>
                    <div className="mt-1 text-sm text-gray-600 border-l-2 border-green-700 pl-3">
                      {item.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-10">
          By using FarmConnect, you agree to our{" "}
          <span className="text-green-700 underline cursor-pointer hover:text-green-800 transition-colors">Terms</span> and{" "}
          <span className="text-green-700 underline cursor-pointer hover:text-green-800 transition-colors">
            Privacy Policy
          </span>.
        </p>

        <div
          onClick={() => alert("Logging out...")} // ⭐ temporary logout trigger
          className="mt-10 flex items-center gap-2 text-red-600 cursor-pointer hover:text-red-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </div>
      </div>
    </>
  );
}
