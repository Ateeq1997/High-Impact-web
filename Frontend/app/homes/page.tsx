"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Homes from "@/components/dashboard/homes/homes1";

export default function Map() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader />
<Homes />
    </div>
  );
}
