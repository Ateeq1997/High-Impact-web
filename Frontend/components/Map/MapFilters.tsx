"use client";

import { useState } from "react";
import { Polygon, Circle } from "react-leaflet";
import L from "leaflet";

interface MapFiltersProps {
  map: L.Map;
}

export default function MapFilters({ map }: MapFiltersProps) {
  const [filters, setFilters] = useState({
    crops: false,
    soil: false,
    rainfall: false,
    irrigation: false,
  });

  const toggleLayer = (key: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg p-4 z-[1000] w-48">
      <h3 className="text-blue-700 font-semibold mb-3 text-center">
        🧭 Map Filters
      </h3>

      <div className="space-y-2">
        <button
          onClick={() => toggleLayer("crops")}
          className={`w-full px-3 py-1 rounded-md text-sm font-medium transition ${
            filters.crops ? "bg-green-600 text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          🌾 Crop Zones
        </button>

        <button
          onClick={() => toggleLayer("soil")}
          className={`w-full px-3 py-1 rounded-md text-sm font-medium transition ${
            filters.soil ? "bg-yellow-600 text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          🧱 Soil Types
        </button>

        <button
          onClick={() => toggleLayer("rainfall")}
          className={`w-full px-3 py-1 rounded-md text-sm font-medium transition ${
            filters.rainfall ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          🌧️ Rainfall
        </button>

        <button
          onClick={() => toggleLayer("irrigation")}
          className={`w-full px-3 py-1 rounded-md text-sm font-medium transition ${
            filters.irrigation ? "bg-teal-600 text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          💧 Irrigation
        </button>
      </div>

      {/* Active Map Layers */}
      {filters.crops && (
        <Polygon
          pathOptions={{ color: "green", fillOpacity: 0.3 }}
          positions={[
            [30.1, 71.2],
            [30.3, 71.4],
            [30.5, 71.2],
          ]}
        />
      )}

      {filters.soil && (
        <Circle
          center={[29.8, 70.6]}
          radius={20000}
          pathOptions={{ color: "brown", fillOpacity: 0.25 }}
        />
      )}

      {filters.rainfall && (
        <Circle
          center={[31.2, 73.1]}
          radius={30000}
          pathOptions={{ color: "blue", fillOpacity: 0.2 }}
        />
      )}

      {filters.irrigation && (
        <Polygon
          pathOptions={{ color: "teal", fillOpacity: 0.3 }}
          positions={[
            [32.2, 72.2],
            [32.4, 72.3],
            [32.5, 72.1],
          ]}
        />
      )}
    </div>
  );
}
