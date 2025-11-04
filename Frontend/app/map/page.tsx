"use client";

import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Dynamically import MapClient to prevent SSR errors
const MapClient = dynamic(() => import("@/components/Map/MapClient"), { ssr: false });

export default function MapPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-16 h-[80vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Map View</h1>
        <div className="w-full h-full rounded-lg overflow-hidden">
          <MapClient />
        </div>
      </main>
      <Footer />
    </div>
  );
}
