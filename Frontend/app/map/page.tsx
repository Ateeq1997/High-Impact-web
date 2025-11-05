"use client";

import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const MapClient = dynamic(() => import("@/components/Map/MapClient"), { ssr: false });

export default function MapPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <MapClient />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
