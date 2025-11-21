"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";

import SearchControl from "./SearchControl"; // working search bar
import ChatBot from "./ChatBot";
import LayersDropdown from "./LayersDropdown";
import ZoomButtons from "./ZoomButtons";
import InfoProjectsPanel from "./InfoProjectPanel";

// Dynamic imports for Leaflet components (client-side only)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
// Polygon import already declared above, remove duplicate
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
const GeoJSON = dynamic(
  () => import("react-leaflet").then((mod) => mod.GeoJSON),
  { ssr: false }
);

interface Plot {
  id: number | string;
  name: string;
  area: string;
  coordinates: [number, number][];
  owner?: string;
  crop?: string;
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
  }
];

const baseLayers: Record<string, string> = {
  Streets: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  Terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  Satellite:
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  Dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
  Light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
};

export default function MapClient() {
  const [map, setMap] = useState<L.Map | null>(null);
  const [baseMap, setBaseMap] = useState("Streets");
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const [popupPosition, setPopupPosition] = useState<[number, number] | null>(null);
  const [popupContent, setPopupContent] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [farmData, setFarmData] = useState<any>(null);

useEffect(() => {
  async function loadFarms() {
    const query = `
      [out:json][timeout:100];
      (
        way["landuse"="farmland"](23.5, 60.5, 37.1, 77.5);
      );
      (._;>;);
      out body;
    `;

    const url = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query);

    try {
      const response = await fetch(url);
      const osmJson = await response.json();

      // Convert OSM → GeoJSON
      const osmtogeojson = (await import("osmtogeojson")).default;
      const geo = osmtogeojson(osmJson);

      setFarmData(geo);
    } catch (error) {
      console.error("Farm loading failed:", error);
    }
  }

  loadFarms();
}, []);


  // Enable client rendering
  useEffect(() => setIsClient(true), []);

  // Map click to show popup with coordinates
  useEffect(() => {
    if (!map) return;

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      setPopupPosition([lat, lng]);
      setPopupContent(`Coordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    };

    map.on("click", handleMapClick);
    return () => {
      map.off("click", handleMapClick);
    };
  }, [map]);

  return (
    <div className="relative h-[90vh] w-full">
      {isClient && (

       <MapContainer
         whenReady={() => setMap}
         center={[34.015, 71.524]}
         zoom={15}
         className="h-full w-full z-0"
         zoomControl={false}
       >
         <TileLayer url={baseLayers[baseMap]} attribution="&copy; OpenStreetMap contributors" />

         {/* GeoJSON for farms (local file) */}
         {farmData && farmData.features && (
           <GeoJSON
             data={farmData}
             style={() => ({
               color: "white",
               weight: 1,
               fillOpacity: 0.1,
             })}
             onEachFeature={(feature: any, layer: any) => {
               layer.on("click", () => {
                 setSelectedPlot({
                   id: feature.properties?.id || "",
                   name: feature.properties?.name || "Farm",
                   owner: feature.properties?.owner || "Unknown",
                   crop: feature.properties?.crop || "Unknown",
                   area: feature.properties?.area || "Unknown",
                   coordinates: feature.geometry.coordinates?.[0],
                 });
               });
             }}
           />
         )}

         {/* Polygons */}
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

         {/* Marker for search */}
         {markerPosition && (
           <Marker position={markerPosition}>
             <Popup>{searchQuery || "Selected Location"}</Popup>
           </Marker>
         )}

         {/* Popup for map click */}
         {popupPosition && <Popup position={popupPosition}>{popupContent}</Popup>}

         {/* Search bar */}
         <SearchControl
           setMarkerPosition={setMarkerPosition}
           searchQuery={searchQuery}
           setSearchQuery={setSearchQuery}
         />

         {/* Zoom buttons (inside MapContainer!) */}
         <ZoomButtons />
       </MapContainer>

      )}

      {/* Layers dropdown */}
      <LayersDropdown baseMap={baseMap} setBaseMap={setBaseMap} />

      {/* Info projects panel */}
      <InfoProjectsPanel
        showInfo={showInfo}
        setShowInfo={setShowInfo}
        showProjects={showProjects}
        setShowProjects={setShowProjects}
        selectedPlot={selectedPlot}
      />

      {/* Chatbot */}
      <ChatBot showChat={showChat} setShowChat={setShowChat} />
    </div>
  );
}
