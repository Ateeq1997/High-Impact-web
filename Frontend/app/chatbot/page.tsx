"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AgriBotWidget from "@/components/Map/ChatBot";

type AgriBotWidgetProps = {
  userRole?: "farmer" | "developer";
  forceOpen?: boolean;
  forcePageMode?: boolean; // <-- for full-page mode
};

export default function FarmerChatbotPage() {
  return (
    <>
      <DashboardHeader />

      <div className="max-w-6xl mx-auto mt-6 mb-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Farm Chat Assistant
        </h1>

        {/* FULL PAGE / WIDER CHATBOT */}
        <div className="w-full h-[700px] md:h-[800px] lg:h-[900px]">
          <AgriBotWidget
            userRole="farmer"
            forceOpen={true}
            forcePageMode={true} // <-- enable full-page mode if supported
          />
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}
