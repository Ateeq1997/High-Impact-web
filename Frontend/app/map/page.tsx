"use client";

import { useEffect, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AdminDashboardHeader from "@/components/dashboard/AdminDashHeader";
import InfoProjectsPanel from "@/components/Map/InfoProjectPanel";
import FarmMap from "@/components/Map/FarmMap";

export default function Map() {
  const [role, setRole] = useState("");
  const [selectedPlot, setSelectedPlot] = useState(null);

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      const parsed = JSON.parse(authUser);
      setRole(parsed.role);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Dynamic Header */}
      {role === "admin" ? <AdminDashboardHeader /> : <DashboardHeader />}

      <main className="flex-grow mt-16 relative">

        {/* --- MAP --- */}
        <FarmMap
  onSelectPlot={setSelectedPlot}
  selectedDistrict={selectedPlot}
/>
      </main>
    </div>
  );
}
