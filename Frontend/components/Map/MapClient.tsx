"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";

import SearchControl from "./SearchControl";
import ClickHandler from "./ClickHandler";
import MapFilters from "./MapFilters";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

const { BaseLayer } = LayersControl;

export default function MapClient() {
  const [map, setMap] = useState<L.Map | null>(null);

  // ✅ Search bar fix & styling
  useEffect(() => {
    if (!map) return;

    const provider = new OpenStreetMapProvider();
 const searchControl = new GeoSearchControl({
  provider,
  style: "bar",
  showMarker: true,
  autoClose: true,
  searchLabel: "Search for a location...",
  retainZoomLevel: false,
  animateZoom: true,
  keepResult: true,
} as any); // 👈 fixes TS underline


    map.addControl(searchControl);

    // Style override for leaflet-geosearch input
    const searchBox = document.querySelector(
      ".leaflet-control-geosearch form input"
    ) as HTMLElement | null;
    if (searchBox) {
      Object.assign(searchBox.style, {
        color: "#000",
        background: "#fff",
        border: "1px solid #ccc",
        padding: "6px 10px",
        borderRadius: "6px",
        outline: "none",
        fontSize: "14px",
        width: "250px",
        zIndex: "1000",
      });
    }

    const suggestions = document.querySelector(
      ".leaflet-control-geosearch .results"
    ) as HTMLElement | null;
    if (suggestions) {
      Object.assign(suggestions.style, {
        color: "#000",
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "6px",
        overflow: "hidden",
      });
    }

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return (
    <div className="relative w-full h-[calc(100vh-64px)]">
      {map && <MapFilters map={map} />}

 <MapContainer
  center={[30.3753, 69.3451]}
  zoom={6}
  scrollWheelZoom
  className="w-full h-full rounded-lg shadow-lg"
  whenCreated={(mapInstance: L.Map) => setMap(mapInstance)}
>

        <SearchControl />
        <ClickHandler />

        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
          </BaseLayer>

          <BaseLayer name="Satellite (Esri)">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles © Esri"
            />
          </BaseLayer>

          <BaseLayer name="Terrain">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution="© OpenTopoMap contributors"
            />
          </BaseLayer>

          <BaseLayer name="Agriculture / HOT">
            <TileLayer
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors, HOT"
            />
          </BaseLayer>
        </LayersControl>

        {/* Example marker */}
        <Marker position={[30.3753, 69.3451]}>
          <Popup>📍 Pakistan — Example Marker</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
