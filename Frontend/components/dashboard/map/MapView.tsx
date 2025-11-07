"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import Leaflet components to prevent SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Polygon = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polygon),
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
const useMapEvents = dynamic(
  () => import("react-leaflet").then((mod) => mod.useMapEvents),
  { ssr: false }
);
const useMap = dynamic(
  () => import("react-leaflet").then((mod) => mod.useMap),
  { ssr: false }
);

interface Plot {
  id: number;
  name: string;
  area: string;
  coordinates: [number, number][];
}

const plots: Plot[] = [
  {
    id: 1,
    name: "Plot A",
    area: "2000 sq ft",
    coordinates: [
      [34.015, 71.524],
      [34.015, 71.527],
      [34.018, 71.527],
      [34.018, 71.524],
    ],
  },
  {
    id: 2,
    name: "Plot B",
    area: "3000 sq ft",
    coordinates: [
      [34.018, 71.528],
      [34.018, 71.531],
      [34.021, 71.531],
      [34.021, 71.528],
    ],
  },
];

const baseLayers: Record<string, string> = {
  Streets: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  Terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  Satellite:
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  Dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
  Light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
};

// ✅ Custom Zoom Buttons
const CustomZoomButtons = () => {
  const map = useMap();
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] bg-white rounded shadow flex">
      <button
        onClick={() => map.zoomIn()}
        className="px-4 py-2 font-bold text-gray-800 hover:bg-gray-200"
      >
        +
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="px-4 py-2 font-bold text-gray-800 hover:bg-gray-200"
      >
        −
      </button>
    </div>
  );
};

// ✅ Map Click Handler
const MapClickHandler = ({ onDeselect }: { onDeselect: () => void }) => {
  const map = useMapEvents({
    click() {
      onDeselect();
    },
  });
  return null;
};

const MapView = () => {
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [baseMap, setBaseMap] = useState("Streets");
  const [showInfo, setShowInfo] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [layerDropdown, setLayerDropdown] = useState(false);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 🔍 Live map update when typing (auto move to first suggestion)
  useEffect(() => {
    if (suggestions.length > 0 && mapInstance) {
      const top = suggestions[0];
      mapInstance.setView([top.lat, top.lon], 12);
    }
  }, [suggestions, mapInstance]);

  if (!isClient) return null;

  return (
    <div className="relative h-[90vh] w-full">
      {/* MAP */}
      <MapContainer
        whenCreated={setMapInstance}
        center={[34.015, 71.524]}
        zoom={15}
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <MapClickHandler onDeselect={() => setSelectedPlot(null)} />

        <TileLayer
          key={baseMap}
          url={baseLayers[baseMap]}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {plots.map((plot) => (
          <Polygon
            key={plot.id}
            positions={plot.coordinates}
            eventHandlers={{ click: () => setSelectedPlot(plot) }}
            pathOptions={{
              color: selectedPlot?.id === plot.id ? "blue" : "green",
              fillOpacity: selectedPlot?.id === plot.id ? 0.6 : 0.4,
            }}
          />
        ))}

        {/* 🧭 Marker */}
        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>{searchQuery || "Selected Location"}</Popup>
          </Marker>
        )}

        <CustomZoomButtons />
      </MapContainer>

      {/* 🔍 SEARCH BAR */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 w-96">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!searchQuery.trim()) return;

            try {
              const res = await fetch(
                `https://photon.komoot.io/api/?q=${encodeURIComponent(searchQuery)}`
              );
              const data = await res.json();

              if (data.features?.length > 0) {
                const { coordinates } = data.features[0].geometry;
                const [lon, lat] = coordinates;
                setMarkerPosition([lat, lon]);
                mapInstance?.setView([lat, lon], 14);
                setSuggestions([]);
              } else {
                alert("Location not found.");
              }
            } catch (error) {
              console.error("Search error:", error);
            }
          }}
          className="relative"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={async (e) => {
              const value = e.target.value;
              setSearchQuery(value);

              if (value.length < 2) return setSuggestions([]);

              try {
                const res = await fetch(
                  `https://photon.komoot.io/api/?q=${encodeURIComponent(value)}&limit=5`
                );
                const data = await res.json();
                if (data.features) {
                  const list = data.features.map((item: any) => ({
                    name:
                      item.properties.name ||
                      item.properties.city ||
                      item.properties.country,
                    lat: item.geometry.coordinates[1],
                    lon: item.geometry.coordinates[0],
                  }));
                  setSuggestions(list);
                }
              } catch (err) {
                console.error(err);
              }
            }}
            placeholder="Search city, street, or country..."
            className="w-full px-4 py-2 rounded-full shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white pr-10"
          />

          {/* 🔍 Icon */}
          <button
            type="submit"
            className="absolute right-3 top-2.5 text-blue-600 hover:text-blue-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
              />
            </svg>
          </button>
        </form>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded-lg mt-1 w-full shadow-md max-h-48 overflow-y-auto z-[1000]">
            {suggestions.map((s, idx) => (
              <li
                key={idx}
                onClick={() => {
                  mapInstance?.setView([s.lat, s.lon], 14);
                  setMarkerPosition([s.lat, s.lon]);
                  setSearchQuery(s.name);
                  setSuggestions([]);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-black"
              >
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Info & Projects Buttons */}
      <div className="absolute top-4 left-4 flex gap-3 z-50">
        <button
          onClick={() => {
            setShowInfo(!showInfo);
            setShowProjects(false);
          }}
          className={`px-4 py-2 bg-white rounded shadow font-semibold text-gray-700 hover:bg-black hover:text-blue-500 transition ${
            showInfo ? "border-2 border-blue-600" : ""
          }`}
        >
          Info
        </button>
        <button
          onClick={() => {
            setShowProjects(!showProjects);
            setShowInfo(false);
          }}
          className={`px-4 py-2 bg-white rounded shadow font-semibold text-gray-700 hover:bg-black hover:text-blue-500 transition ${
            showProjects ? "border-2 border-blue-600" : ""
          }`}
        >
          Projects
        </button>
      </div>

      {/* ✅ Layers Dropdown */}
      <div className="absolute top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setLayerDropdown(!layerDropdown)}
            className="px-4 py-2 bg-white rounded shadow font-semibold text-gray-800 hover:bg-black hover:text-blue-500 transition"
          >
            Layers ⬇️
          </button>
          {layerDropdown && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-40">
              {Object.keys(baseLayers).map((layer) => (
                <button
                  key={layer}
                  onClick={() => {
                    setBaseMap(layer);
                    setLayerDropdown(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-black hover:bg-blue-100 ${
                    baseMap === layer ? "font-bold text-blue-600" : ""
                  }`}
                >
                  {layer}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ✅ Chat Section */}
      <div className="absolute bottom-6 right-6 z-50">
        <button
          onClick={() => setShowChat(!showChat)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center text-xl font-bold"
        >
          💬
        </button>
      </div>

      {showChat && (
        <div className="absolute bottom-20 right-6 bg-white w-80 h-96 shadow-xl rounded-lg p-4 z-50 flex flex-col">
          <h3 className="text-blue-700 font-semibold mb-2">ChatBot</h3>
          <div className="flex-grow overflow-y-auto border p-2 rounded text-sm text-gray-700">
            <p>Hello! How can I help you with plots or locations today?</p>
          </div>
          <div className="mt-2 flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow border rounded-l px-2 py-1 focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-3 rounded-r">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
