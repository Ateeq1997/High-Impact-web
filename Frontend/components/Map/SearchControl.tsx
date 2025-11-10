"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";

export default function SearchControl({
  setMarkerPosition,
  searchQuery,
  setSearchQuery,
}: {
  setMarkerPosition: (pos: [number, number] | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) {
  const map = useMap(); // ✅ only inside MapContainer

  useEffect(() => {
    if (!map) return;

   const provider = new OpenStreetMapProvider({
  params: {
    countrycodes: 'PK',  // Restrict to Pakistan
    addressdetails: 1,
    'accept-language': 'en'
  }
});

// Then add:
const searchControl = new GeoSearchControl({
  provider,
  style: 'bar',
  autoClose: true,
  keepResult: true,
  showMarker: true,
  showPopup: true,
  searchLabel: 'Search for a location...'
});

    map.addControl(searchControl as unknown as L.Control);

    // Style fix
    const input = document.querySelector(
      ".leaflet-control-geosearch form input"
    ) as HTMLInputElement | null;
    if (input) {
      Object.assign(input.style, {
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
      map.removeControl(searchControl as unknown as L.Control);
    };
  }, [map]);

  return null;
}
