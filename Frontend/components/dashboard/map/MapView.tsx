"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

import SearchBar from "@/components/dashboard/map/SearchBar";
import ChatBot from "@/components/dashboard/map/ChatBot";
import LayersDropdown from "@/components/dashboard/map/LayersDropdown";
import ZoomButtons from "@/components/dashboard/map/ZoomButtons";
import MapClickHandler from "@/components/dashboard/map/MapClickHandler";
import InfoProjectsPanel from "@/components/dashboard/map/InfoProjectPanel";


const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Polygon = dynamic(() => import("react-leaflet").then((mod) => mod.Polygon), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });


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
  Satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  Dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
  Light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
};

export default function MapView() {
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [baseMap, setBaseMap] = useState("Streets");
  const [showChat, setShowChat] = useState(false);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showInfo, setShowInfo] = useState(false);
const [showProjects, setShowProjects] = useState(false);


  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  if (!isClient) return null;

  return (
    <div className="relative h-[90vh] w-full">
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

        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>{searchQuery || "Selected Location"}</Popup>
          </Marker>
        )}

        <ZoomButtons />
      </MapContainer>

 <SearchBar
  mapInstance={mapInstance}
  setMarkerPosition={setMarkerPosition}
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
/>

      <LayersDropdown baseMap={baseMap} setBaseMap={setBaseMap} />

<InfoProjectsPanel
  showInfo={showInfo}
  setShowInfo={setShowInfo}
  showProjects={showProjects}
  setShowProjects={setShowProjects}
  selectedPlot={selectedPlot}
/>

      {/* Chat */}
      <ChatBot showChat={showChat} setShowChat={setShowChat} />
    </div>
  );
}
