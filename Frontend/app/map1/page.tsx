"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MapView from "@/components/dashboard/map/MapView";

export default function Map() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Fixed header */}
      <DashboardHeader />

      {/* Map section — added margin to make header visible */}
      <main className="flex-grow mt-16">
        <MapView />
      </main>
    </div>
  );
}
