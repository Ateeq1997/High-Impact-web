"use client";

import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  LayerGroup,
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

/* ---------- NORMAL MARKER ICON ---------- */
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

/* ---------- SMALL DOT ICON FOR SURVEY POINTS ---------- */
const dotIcon = L.divIcon({
  className: "survey-dot",
  html: "<div style='width:6px;height:6px;background:green;border-radius:50%;'></div>",
});

/* ---------- STYLES ---------- */
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

/* ---------- ZOOM CONTROLS ---------- */
function CustomZoomControls({ map }: { map: L.Map }) {
  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[1000] flex flex-col gap-2">
      <button
        onClick={() => map.zoomIn()}
        className="w-12 h-12 rounded-full bg-white shadow-lg text-xl font-bold text-gray-800 hover:bg-blue-600 hover:text-white transition"
      >
        +
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="w-12 h-12 rounded-full bg-white shadow-lg text-xl font-bold text-gray-800 hover:bg-blue-600 hover:text-white transition"
      >
        −
      </button>
    </div>
  );
}

/* ---------- MAIN MAP COMPONENT ---------- */
export default function FarmMap({ onSelectPlot, selectedDistrict }: Props) {
  const [geoData, setGeoData] = useState<any>(null);
  const [surveyData, setSurveyData] = useState<any>(null);
  const [selectedLayer, setSelectedLayer] = useState<any>(null);
  const [clickedLocation, setClickedLocation] = useState<[number, number] | null>(null);
  const [clickedInfo, setClickedInfo] = useState<any>(null);
  const [searchMarker, setSearchMarker] = useState<{ position: [number, number]; name: string } | null>(null);

  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/districts")
      .then((res) => res.json())
      .then(setGeoData);
    fetch("http://localhost:8080/survey-points")
      .then((res) => res.json())
      .then(setSurveyData);
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
        whenCreated={(map) => setMapInstance(map)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* SEARCH BAR */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
          <SearchBar setMarkerPosition={setSearchMarker} />
        </div>

        {/* DISTRICTS */}
        {geoData && <GeoJSON data={geoData} style={baseStyle} onEachFeature={onEachDistrict} />}

        {/* SURVEY POINTS */}
        {surveyData?.features && (
          <LayerGroup>
            {surveyData.features.map((f: any, i: number) => {
              const [lng, lat] = f.geometry.coordinates;
              return (
                <Marker key={i} position={[lat, lng]} icon={dotIcon}>
                  <Popup>
                    <div className="text-sm space-y-1">
                      <div className="font-semibold text-green-700">{f.properties.district}</div>
                      <div><b>Province:</b> {f.properties.province}</div>
                      <div><b>Season:</b> {f.properties.season}</div>
                      <div><b>Stage:</b> {f.properties.stage || "-"}</div>
                      <div><b>Land:</b> {f.properties.land}</div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </LayerGroup>
        )}

        {/* CLICKED DISTRICT MARKER */}
        {clickedLocation && (
          <Marker position={clickedLocation} icon={markerIcon}>
            <Popup>
              <div className="text-sm text-gray-800 space-y-1">
                <div className="font-semibold text-base text-blue-700 mb-1">{clickedInfo?.district_name}</div>
                <div><b>Division:</b> {clickedInfo?.division_name}</div>
                <div><b>Province:</b> {clickedInfo?.province_name}</div>
                <div><b>ID:</b> {clickedInfo?.id}</div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* SEARCH MARKER */}
        {searchMarker && (
          <Marker position={searchMarker.position} icon={redSearchIcon}>
            <Popup><b>{searchMarker.name}</b></Popup>
          </Marker>
        )}

        {/* ZOOM CONTROLS */}
        {mapInstance && <CustomZoomControls map={mapInstance} />}
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
