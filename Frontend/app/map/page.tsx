"use client";

import { useEffect, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AdminDashboardHeader from "@/components/dashboard/AdminDashHeader";

import FarmMap from "@/components/Map/FarmMap";

export default function Map() {
  const [role, setRole] = useState("");

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

      {/* Map */}
      <main className="flex-grow mt-16">
        <FarmMap />
      </main>
    </div>
  );
}
