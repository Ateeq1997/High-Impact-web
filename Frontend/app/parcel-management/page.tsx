"use client";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";

// Dynamically import React Leaflet (so it only loads on client)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
export default function ParcelManagementPage() {
  const [parcels, setParcels] = useState([
    {
      id: 1,
      name: "Wheat Field - North Zone",
      lat: 34.2009,
      lng: 72.0468,
      crop: "Wheat",
    },
    {
      id: 2,
      name: "Sugarcane Field - East Zone",
      lat: 34.2055,
      lng: 72.058,
      crop: "Sugarcane",
    },
  ]);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow mt-16 p-6 bg-gray-50">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-8">
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center">
            Parcel Management
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Efficiently manage your agricultural fields (parcels) through a
            digital system that helps monitor, plan, and optimize your farming
            operations — from seeding to harvesting.
          </p>

          {/* Section 1: Key Benefits */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">
              Why Parcel Management Matters
            </h2>
            <p className="text-gray-700 mb-4">
              A well-organized parcel system is the foundation of smart farming.
              With our platform, farmers can view, edit, and analyze each field
              with ease — ensuring better yield and resource use.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc pl-6 text-gray-700">
              <li>Centralized access to all your farm fields.</li>
              <li>Accurate tracking of crop types and growth cycles.</li>
              <li>Monitor soil health and irrigation details.</li>
              <li>Real-time data from satellite and IoT sensors.</li>
            </ul>
          </section>
  {/* Section 1: What You Can Do */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">
              What You Can Do
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Add new parcels by entering field details or marking on the map.</li>
              <li>View all parcels with boundaries, crop information, and status.</li>
              <li>Update details like irrigation status or crop growth stage.</li>
              <li>Analyze performance metrics like soil health and yield trends.</li>
            </ul>
          </section>

     {/* Section 2: Interactive Map */}

<section className="mb-10">
  <h2 className="text-2xl font-semibold text-blue-700 mb-3">
    Parcel Map Overview
  </h2>
  <p className="text-gray-700 mb-4">
    Use the map below to explore your farm parcels across the region.
    You can zoom in or out and move around to view different areas.
    In upcoming updates, this will become a fully interactive map where
    you can add, edit, and manage your fields.
  </p>

  <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg border border-gray-300">
    <iframe
      src="https://www.openstreetmap.org/export/embed.html?bbox=60.8721%2C23.885%2C77.8173%2C37.0841&layer=mapnik"
      className="w-full h-full"
      style={{ border: 0 }}
      loading="lazy"
      title="Farm Parcel Map"
    ></iframe>
  </div>

  <p className="text-sm text-gray-500 text-center mt-2">
    View larger map on{" "}
    <a
      href="https://www.openstreetmap.org"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      OpenStreetMap.org
    </a>
  </p>
</section>


{/* Section 3: Add New Parcel Form */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold text-blue-700 mb-3">
    Register a New Parcel
  </h2>
  <p className="text-gray-700 mb-6">
    Add details for a new farm field to start monitoring its health
    and productivity.
  </p>

  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-gray-800 mb-2">Parcel Name</label>
      <input
        type="text"
        placeholder="e.g. North Field"
        className="w-full px-4 py-2 border border-gray-300 rounded text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    <div>
      <label className="block text-gray-800 mb-2">Crop Type</label>
      <input
        type="text"
        placeholder="e.g. Wheat"
        className="w-full px-4 py-2 border border-gray-300 rounded text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    <div>
      <label className="block text-gray-800 mb-2">Parcel Area (acres)</label>
      <input
        type="number"
        placeholder="e.g. 12.5"
        className="w-full px-4 py-2 border border-gray-300 rounded text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    <div>
      <label className="block text-gray-800 mb-2">Soil Type</label>
      <input
        type="text"
        placeholder="e.g. Loamy"
        className="w-full px-4 py-2 border border-gray-300 rounded text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    <div className="md:col-span-2">
      <label className="block text-gray-800 mb-2">Location Coordinates</label>
      <input
        type="text"
        placeholder="Latitude, Longitude"
        className="w-full px-4 py-2 border border-gray-300 rounded text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    <div className="md:col-span-2 text-right">
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
      >
        Add Parcel
      </button>
    </div>
  </form>
</section>

{/* Section 4: Current Parcels Overview */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold text-blue-700 mb-3">
    Your Registered Parcels
  </h2>
  <p className="text-gray-700 mb-4">
    A quick overview of all your fields. Edit or remove parcels as
    needed.
  </p>
  <div className="overflow-x-auto">
    <table className="w-full border-collapse border border-gray-300 text-sm text-gray-800 bg-white">
      <thead className="bg-blue-50 text-gray-800">
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Crop</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Area</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Soil Type</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-blue-50">
          <td className="border border-gray-300 px-4 py-2">North Field</td>
          <td className="border border-gray-300 px-4 py-2">Wheat</td>
          <td className="border border-gray-300 px-4 py-2">12.5 acres</td>
          <td className="border border-gray-300 px-4 py-2">Loamy</td>
          <td className="border border-gray-300 px-4 py-2 text-blue-600 cursor-pointer hover:underline">
            Edit | Delete
          </td>
        </tr>
        <tr className="hover:bg-blue-50">
          <td className="border border-gray-300 px-4 py-2">South Plot</td>
          <td className="border border-gray-300 px-4 py-2">Corn</td>
          <td className="border border-gray-300 px-4 py-2">8.7 acres</td>
          <td className="border border-gray-300 px-4 py-2">Clay</td>
          <td className="border border-gray-300 px-4 py-2 text-blue-600 cursor-pointer hover:underline">
            Edit | Delete
          </td>
        </tr>
        <tr className="hover:bg-blue-50">
          <td className="border border-gray-300 px-4 py-2">East Plot</td>
          <td className="border border-gray-300 px-4 py-2">Sugar Cane</td>
          <td className="border border-gray-300 px-4 py-2">2.7 acres</td>
          <td className="border border-gray-300 px-4 py-2">Loamy</td>
          <td className="border border-gray-300 px-4 py-2 text-blue-600 cursor-pointer hover:underline">
            Edit | Delete
          </td>
        </tr>
        <tr className="hover:bg-blue-50">
          <td className="border border-gray-300 px-4 py-2">West Field</td>
          <td className="border border-gray-300 px-4 py-2">Corn</td>
          <td className="border border-gray-300 px-4 py-2">9.2 acres</td>
          <td className="border border-gray-300 px-4 py-2">Clay</td>
          <td className="border border-gray-300 px-4 py-2 text-blue-600 cursor-pointer hover:underline">
            Edit | Delete
          </td>
        </tr>
        <tr className="hover:bg-blue-50">
          <td className="border border-gray-300 px-4 py-2">South-North Plot</td>
          <td className="border border-gray-300 px-4 py-2">Vegetables</td>
          <td className="border border-gray-300 px-4 py-2">4.4 acres</td>
          <td className="border border-gray-300 px-4 py-2">Loamy</td>
          <td className="border border-gray-300 px-4 py-2 text-blue-600 cursor-pointer hover:underline">
            Edit | Delete
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</section>


          {/* Section 5: Smart Tools */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">
              Smart Tools & Integrations
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>🌦️ Weather forecasting and irrigation suggestions.</li>
              <li>📡 Integration with GPS and drone mapping tools.</li>
              <li>🌱 Crop health monitoring through NDVI and AI models.</li>
              <li>📈 Yield predictions and soil fertility analytics.</li>
            </ul>
          </section>

          {/* Section 6: Tips */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">
              Best Practices for Managing Parcels
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Keep your parcel data updated every season.</li>
              <li>Regularly monitor soil moisture and nutrient levels.</li>
              <li>Use weather alerts to plan irrigation and fertilization.</li>
              <li>Compare yield reports year-over-year to optimize practices.</li>
            </ul>
          </section>

          {/* Call to Action */}
          <section className="text-center mt-12 border-t pt-6">
            <h3 className="text-2xl font-semibold text-blue-700 mb-2">
              Start Managing Your Farm Smarter!
            </h3>
            <p className="text-gray-600 mb-4">
              Gain full visibility and control of your farmland through our
              digital parcel system.
            </p>
            <button className="px-8 py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition">
              Add Your First Parcel
            </button>
          </section>
        </div>
      </main>

    </div>
  );
}
