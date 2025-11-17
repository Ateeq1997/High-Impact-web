"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function BetaUserPage() {
  const router = useRouter();

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
        { question: "View Purchase", answer: "You have early access to new purchase tools." },
      ],
    },
    {
      section: "Usage Limits",
      items: [
        { question: "Company Lookups", answer: "You have 300 lookups remaining this month." },
      ],
    },
    {
      section: "Resources",
      items: [
        { question: "Terms of Use", answer: "You’re part of our testing program—some features may change." },
        { question: "Privacy Policy", answer: "Your data is protected under beta testing policy." },
        { question: "Email Support", answer: "Reach us at beta-support@farmconnect.com" },
      ],
    },
  ];

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-gray-50 px-8 py-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Account</h1>

        {/* User Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => router.push("/accounts")}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Alpha User
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Beta User
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Welcome, <span className="font-semibold">Beta User</span>!
          You’re part of our pre-release testing program for upcoming land features.
        </p>

        {/* FAQ Sections (all answers visible) */}
        <div className="space-y-6">
          {faqData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white shadow-md rounded-xl p-5">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">{section.section}</h2>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <p className="font-medium text-gray-700">{item.question}</p>
                    <div className="mt-1 text-sm text-gray-600 border-l-2 border-blue-600 pl-3">
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
          <span className="text-blue-600 underline cursor-pointer">Terms</span> and{" "}
          <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>.
        </p>

        <div className="mt-10 flex items-center gap-2 text-red-600 cursor-pointer hover:text-red-700">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </div>
      </div>
    </>
  );
}
