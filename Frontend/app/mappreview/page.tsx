"use client";

import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const MapPreview = dynamic(() => import("@/components/Map/MapPreview"), { ssr: false });

export default function MapPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-16">
        <MapPreview />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
