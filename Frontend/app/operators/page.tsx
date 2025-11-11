"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Operators from "@/components/operators/operators1";

export default function Map() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader />
<Operators />
    </div>
  );
}
