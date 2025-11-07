"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Projects from "@/components/dashboard/projects/projects1";

export default function Map() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader />
<Projects />
    </div>
  );
}
