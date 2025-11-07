"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Accounts from "@/components/dashboard/accounts/accounts1";

export default function Map() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader />
<Accounts />
    </div>
  );
}
