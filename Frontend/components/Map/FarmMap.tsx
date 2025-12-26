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
import { useEffect, useState, useRef } from "react";

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
  iconSize: [6, 6],
  iconAnchor: [3, 3],
  popupAnchor: [0, -3],
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

/* ---------- SURVEY POINTS CLUSTER COMPONENT ---------- */
function SurveyPointsCluster({ surveyData }: { surveyData: any }) {
  const map = useMap();
  const clusterGroupRef = useRef<any>(null);
  const markersLoadedRef = useRef(false);

  useEffect(() => {
    if (!surveyData?.features || !map || markersLoadedRef.current) return;

    // Wait for map to be fully ready
    const timer = setTimeout(() => {
      loadMarkerCluster();
    }, 100);

    return () => clearTimeout(timer);
  }, [surveyData, map]);

  const loadMarkerCluster = async () => {
    if (!map || !surveyData?.features || markersLoadedRef.current) return;

    try {
      // Import the library dynamically
      await import("leaflet.markercluster");
      await import("leaflet.markercluster/dist/MarkerCluster.css");
      await import("leaflet.markercluster/dist/MarkerCluster.Default.css");

      // Remove existing cluster group if any
      if (clusterGroupRef.current) {
        try {
          map.removeLayer(clusterGroupRef.current);
        } catch (e) {
          console.log("No existing cluster to remove");
        }
      }

      // Create marker cluster group
      const markers = (L as any).markerClusterGroup({
        chunkedLoading: true,
        chunkInterval: 200,
        chunkDelay: 50,
        maxClusterRadius: 50,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        removeOutsideVisibleBounds: true,
        iconCreateFunction: function (cluster: any) {
          const count = cluster.getChildCount();
          let clusterClass = 'marker-cluster-small';
          
          if (count > 100) {
            clusterClass = 'marker-cluster-large';
          } else if (count > 10) {
            clusterClass = 'marker-cluster-medium';
          }

          return L.divIcon({
            html: `<div><span>${count}</span></div>`,
            className: `marker-cluster ${clusterClass}`,
            iconSize: L.point(40, 40),
          });
        },
      });

      // Add all markers to cluster group
      surveyData.features.forEach((f: any) => {
        const [lng, lat] = f.geometry.coordinates;
        const marker = L.marker([lat, lng], { icon: dotIcon });
        
        const props = f.properties;
        marker.bindPopup(`
          <div style="
            font-size: 0.875rem; 
            line-height: 1.5rem; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px;
            border-radius: 8px;
            min-width: 250px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          ">
            <div style="
              font-weight: 700; 
              font-size: 1.1rem;
              color: #fef08a; 
              margin-bottom: 8px;
              border-bottom: 2px solid rgba(255,255,255,0.3);
              padding-bottom: 6px;
            ">📍 ${props.district}</div>
            
            <div style="margin: 6px 0; color: #f0f9ff;">
              <span style="font-weight: 600; color: #bfdbfe;">ID:</span> ${props.id}
            </div>
            
            <div style="margin: 6px 0; color: #f0f9ff;">
              <span style="font-weight: 600; color: #bfdbfe;">Province:</span> ${props.province}
            </div>
            
            <div style="margin: 6px 0; color: #f0f9ff;">
              <span style="font-weight: 600; color: #bfdbfe;">Season:</span> ${props.season}
            </div>
            
            <div style="margin: 6px 0; color: #f0f9ff;">
              <span style="font-weight: 600; color: #bfdbfe;">Date:</span> ${props.date || "-"}
            </div>
            
            <div style="margin: 6px 0; color: #f0f9ff;">
              <span style="font-weight: 600; color: #bfdbfe;">Latitude:</span> ${props.latitude}
            </div>
            
            <div style="margin: 6px 0; color: #f0f9ff;">
              <span style="font-weight: 600; color: #bfdbfe;">Longitude:</span> ${props.longitude}
            </div>
            
            <div style="margin: 6px 0; color: #f0f9ff;">
              <span style="font-weight: 600; color: #bfdbfe;">Code:</span> ${props.code}
            </div>
            
            <div style="margin: 6px 0; color: #f0f9ff;">
              <span style="font-weight: 600; color: #bfdbfe;">Land:</span> ${props.land}
            </div>
            
            <div style="margin: 6px 0; color: #f0f9ff;">
              <span style="font-weight: 600; color: #bfdbfe;">Description:</span> ${props.description || "-"}
            </div>
            
            <div style="margin: 6px 0; color: #f0f9ff;">
              <span style="font-weight: 600; color: #bfdbfe;">Stage:</span> ${props.stage || "-"}
            </div>
            
            ${props.district_id ? `
              <div style="margin: 6px 0; color: #f0f9ff;">
                <span style="font-weight: 600; color: #bfdbfe;">District ID:</span> ${props.district_id}
              </div>
            ` : ''}
          </div>
        `, {
          maxWidth: 300,
          className: 'custom-survey-popup'
        });
        
        markers.addLayer(marker);
      });

      // Add to map after all markers are added
      map.addLayer(markers);
      clusterGroupRef.current = markers;
      markersLoadedRef.current = true;

      console.log(`✅ Added ${surveyData.features.length} survey points to map with clustering`);
    } catch (error) {
      console.error("Error loading marker cluster:", error);
    }
  };

  return null;
}

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("http://localhost:8080/districts").then((res) => {
        if (!res.ok) throw new Error(`Districts API failed: ${res.status}`);
        return res.json();
      }),
      fetch("http://localhost:8080/survey-points").then((res) => {
        if (!res.ok) throw new Error(`Survey points API failed: ${res.status}`);
        return res.json();
      }),
    ])
      .then(([districts, survey]) => {
        setGeoData(districts);
        setSurveyData(survey);
        setLoading(false);
        console.log(`📍 Loaded ${survey?.features?.length || 0} survey points`);
      })
      .catch((error) => {
        console.error("Error loading map data:", error);
        setLoading(false);
        alert(`Failed to load map data: ${error.message}\n\nMake sure your backend is running on http://localhost:8080`);
      });
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
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-[2000]">
          <div className="text-xl font-semibold text-blue-600">
            Loading map data...
          </div>
        </div>
      )}

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

        {/* SURVEY POINTS WITH CLUSTERING */}
        {surveyData && <SurveyPointsCluster surveyData={surveyData} />}

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