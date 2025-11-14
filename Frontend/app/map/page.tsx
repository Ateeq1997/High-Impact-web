"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
// impomaprt MapView from "@/components/dashboard/map/MapView";
import MapClient from "@/components/Map/MapClient";

export default function Map() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Fixed header */}
      <DashboardHeader />

      {/* Map section — added margin to make header visible */}
      <main className="flex-grow mt-16">
        {/* <MapView /> */}
        <MapClient />
      </main>
    </div>
  );
}
