"use client";

import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

import SearchBar from "./SearchBar";
import InfoProjectsPanel from "./InfoProjectPanel";
import Chatbot from "./ChatBot";

interface Props {
  onSelectPlot: (data: any) => void;
  selectedDistrict: any | null;
}
/* ---------- RED SEARCH MARKER ---------- */
const redSearchIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
/* ---------------- PIN ICON ---------------- */
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

/* ---------------- STYLES ---------------- */
const baseStyle = {
  fillColor: "#ffffff",
  weight: 2.2,
  opacity: 1,
  color: "#d1d5db",
  fillOpacity: 0.12,
};

const hoverStyle = {
  weight: 3,
  color: "#3b82f6",
  fillColor: "#eaf2ff",
  fillOpacity: 0.25,
};

const selectedStyle = {
  weight: 3.8,
  color: "#1e3a8a",
  fillColor: "#dbeafe",
  fillOpacity: 0.4,
};

/* ---------------- ZOOM CONTROLS ---------------- */
function CustomZoomControls() {
  const map = useMap();

  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[1000] flex flex-col gap-2">
      <button
        onClick={() => map.zoomIn()}
        className="w-12 h-12 rounded-full bg-white shadow-lg text-xl font-bold
                   text-gray-800 hover:bg-blue-600 hover:text-white transition"
      >
        +
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="w-12 h-12 rounded-full bg-white shadow-lg text-xl font-bold
                   text-gray-800 hover:bg-blue-600 hover:text-white transition"
      >
        −
      </button>
    </div>
  );
}

/* ---------------- MAIN MAP ---------------- */
export default function FarmMap({ onSelectPlot, selectedDistrict }: Props) {
  const [geoData, setGeoData] = useState<any>(null);
  const [selectedLayer, setSelectedLayer] = useState<any>(null);
  const [clickedLocation, setClickedLocation] =
    useState<[number, number] | null>(null);
  const [clickedInfo, setClickedInfo] = useState<any>(null);
  const [searchMarker, setSearchMarker] = useState<{
  position: [number, number];
  name: string;
} | null>(null);


  useEffect(() => {
    fetch("http://localhost:8080/districts")
      .then((res) => res.json())
      .then(setGeoData);
  }, []);

  const onEachDistrict = (feature: any, layer: any) => {
    layer.on({
      mouseover: (e: any) => {
        if (selectedLayer !== layer) e.target.setStyle(hoverStyle);
      },
      mouseout: (e: any) => {
        if (selectedLayer !== layer) e.target.setStyle(baseStyle);
      },
      click: (e: any) => {
        if (selectedLayer) selectedLayer.setStyle(baseStyle);
        layer.setStyle(selectedStyle);
        setSelectedLayer(layer);

        const p = feature.properties;
        setClickedInfo(p);
        setClickedLocation([e.latlng.lat, e.latlng.lng]);

        onSelectPlot(p);
      },
    });
  };

  return (
    <div className="relative h-screen w-full">
      <MapContainer
        center={[30.3753, 69.3451]}
        zoom={5}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 🔍 SEARCH BAR (INSIDE MAP) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
          <SearchBar setMarkerPosition={setSearchMarker} />
        </div>

        {geoData && (
          <GeoJSON data={geoData} style={baseStyle} onEachFeature={onEachDistrict} />
        )}

        {clickedLocation && (
          <Marker position={clickedLocation} icon={markerIcon}>
            <Popup className="custom-popup">
  <div className="text-sm text-gray-800 space-y-1">
    <div className="font-semibold text-base text-blue-700 mb-1">
      {clickedInfo?.district_name}
    </div>

    <div><b>Division:</b> {clickedInfo?.division_name}</div>
    <div><b>Province:</b> {clickedInfo?.province_name}</div>
    <div><b>ID:</b> {clickedInfo?.id}</div>

    <div className="pt-1 text-xs text-gray-600">
      <b>Centroid:</b><br />
      {clickedInfo?.centroid_lat}, {clickedInfo?.centroid_long}
    </div>
  </div>
</Popup>

          </Marker>
        )}

       {searchMarker && (
  <Marker
    position={searchMarker.position}
    icon={redSearchIcon}
  >
    <Popup>
      <b>{searchMarker.name}</b>
    </Popup>
  </Marker>
)}


        <CustomZoomControls />
      </MapContainer>

      {/* INFO PANEL */}
      <div className="absolute top-4 left-4 z-[1000]">
        <InfoProjectsPanel selectedDistrict={selectedDistrict} />
      </div>

      {/* CHATBOT */}
      <div className="absolute bottom-4 right-4 z-[1000]">
        <Chatbot />
      </div>
    </div>
  );
}
