"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";
import "leaflet-geosearch/dist/geosearch.css";

export default function SearchBar() {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      autoClose: true,
      searchLabel: "Search for a location...",
      keepResult: true,
      showMarker: true,
      showPopup: true,
    } as any);

    map.addControl(searchControl as unknown as L.Control);

    // 💅 Fix styles (Tailwind reset fix)
    const fixStyles = () => {
      const input = document.querySelector(".leaflet-control-geosearch form input") as HTMLInputElement | null;
      if (input) {
        input.style.color = "#000";
        input.style.background = "#fff";
        input.style.border = "1px solid #ccc";
        input.style.padding = "6px 10px";
        input.style.borderRadius = "6px";
        input.style.outline = "none";
        input.style.fontSize = "14px";
        input.style.width = "250px";
        input.style.zIndex = "1000";
      }
      const suggestions = document.querySelector(".leaflet-control-geosearch .results") as HTMLElement | null;
      if (suggestions) {
        suggestions.style.color = "#000";
        suggestions.style.background = "#fff";
        suggestions.style.border = "1px solid #ddd";
        suggestions.style.borderRadius = "6px";
      }
    };

    setTimeout(fixStyles, 500);

    return () => {
      map.removeControl(searchControl as unknown as L.Control);
    };
  }, [map]);

  return null;
}
