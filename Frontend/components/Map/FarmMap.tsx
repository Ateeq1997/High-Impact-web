"use client";

import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// import InfoProjectsPanel from "./InfoProjectPanel";
// import Chatbot from "./ChatBot"; 

interface Props {
  onSelectPlot: (data: any) => void;
  selectedDistrict: any | null;
}

/* ------------------- CLASSIC LEAFLET PIN ICON ------------------- */
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  // popupAnchor: [1, -34],
});

/* ------------------- STYLES ------------------- */
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

/* ------------------- CUSTOM ZOOM BUTTONS ------------------- */
function CustomZoomControls() {
  const map = useMap();
  return (
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-[1000] flex bg-white rounded-lg shadow-md overflow-hidden select-none pointer-events-auto">
      <button
        className="px-4 py-2 border-r text-black text-lg font-bold hover:bg-gray-100"
        onClick={() => map.zoomIn()}
      >
        +
      </button>
      <button
        className="px-4 py-2 text-black text-lg font-bold hover:bg-gray-100"
        onClick={() => map.zoomOut()}
      >
        −
      </button>
    </div>
  );
}

/* ------------------- MAIN MAP COMPONENT ------------------- */
export default function FarmMap({ onSelectPlot, selectedDistrict }: Props) {
  const [geoData, setGeoData] = useState<any>(null);
  const [selectedLayer, setSelectedLayer] = useState<any>(null);
  const [clickedLocation, setClickedLocation] = useState<[number, number] | null>(null);
  const [clickedInfo, setClickedInfo] = useState<any>(null);

  /* ---------------- FETCH DISTRICTS ---------------- */
  useEffect(() => {
    fetch("http://localhost:8080/districts")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("GeoJSON fetch error:", err));
  }, []);

  /* ---------------- DISTRICT EVENTS ---------------- */
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

        const props = feature.properties;

        // pass ALL properties to state
        setClickedInfo(props);
        setClickedLocation([e.latlng.lat, e.latlng.lng]);

        // ✅ send full district info to InfoProjectsPanel
        onSelectPlot({
          district_name: props.district_name,
          division_name: props.division_name,
          province_name: props.province_name,
          id: props.id,
          centroid_lat: props.centroid_lat,
          centroid_long: props.centroid_long,
        });
      },
    });
  };

  return (
    <div className="relative h-screen w-full">
      {/* ---------------- MAP ---------------- */}
      <MapContainer
        center={[30.3753, 69.3451]}
        zoom={5}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {geoData && <GeoJSON data={geoData} style={baseStyle} onEachFeature={onEachDistrict} />}

        {clickedLocation && (
          <Marker position={clickedLocation} icon={markerIcon}>
            {/* <Popup>
              <div className="text-black text-sm">
                <b>District:</b> {clickedInfo?.district_name}<br />
                <b>Division:</b> {clickedInfo?.division_name}<br />
                <b>Province:</b> {clickedInfo?.province_name}<br />
                <b>ID:</b> {clickedInfo?.id}<br />
                <b>Centroid:</b> {clickedInfo?.centroid_lat}, {clickedInfo?.centroid_long}
              </div>
            </Popup> */}
          </Marker>
        )}

        {/* Bottom-center zoom */}
        <CustomZoomControls />
      </MapContainer>

      {/* ---------------- TOP-LEFT: Info & Projects ---------------- */}
      <div className="absolute top-4 left-4 z-[1000]">
        {/* <InfoProjectsPanel selectedDistrict={selectedDistrict} /> */}
      </div>

      {/* ---------------- BOTTOM-RIGHT: Chatbot ---------------- */}
      <div className="absolute bottom-4 right-4 z-[1000]">
        {/* <Chatbot /> */}
      </div>
    </div>
  );
}
