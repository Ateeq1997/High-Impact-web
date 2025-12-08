"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AgriBotWidget from "@/components/Map/ChatBot"; // <-- your chatbot

export default function FarmerChatbotPage() {
  return (
    <>
      <DashboardHeader />

      <div className="max-w-4xl mx-auto mt-6 mb-10">
        <h1 className="text-3xl font-bold mb-4">Farm Chat Assistant</h1>

        {/* FULL PAGE CHATBOT */}
        <AgriBotWidget userRole="farmer" forceOpen={true} />
      </div>

      {/* If you have a footer */}
      {/* <Footer /> */}
    </>
  );
}
