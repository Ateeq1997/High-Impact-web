"use client";

import { useState } from "react";
import { useMap } from "react-leaflet";

export default function SearchBar({
  setMarkerPosition,
}: {
  setMarkerPosition: (
    pos: { position: [number, number]; name: string } | null
  ) => void;
}) {

  const map = useMap();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  /* ---------- detect LAT,LNG input ---------- */
  const parseLatLng = (value: string) => {
    const match = value.match(
      /^\s*(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)\s*$/
    );
    if (!match) return null;
    return [parseFloat(match[1]), parseFloat(match[3])] as [number, number];
  };

  /* ---------- fetch suggestions ---------- */
  const fetchSuggestions = async (value: string) => {
    setQuery(value);

    const latLng = parseLatLng(value);
    if (latLng) {
      setSuggestions([]);
      return;
    }

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        value
      )}&addressdetails=1&limit=6`
    );
    const data = await res.json();

    setSuggestions(
      data.map((item: any) => ({
        name: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
      }))
    );
  };

  /* ---------- show location ---------- */
 const flyTo = (lat: number, lon: number, name?: string) => {
  map.flyTo([lat, lon], 12, { duration: 1.2 });

  setMarkerPosition({
    position: [lat, lon],
    name: name ?? "Selected Location",
  });

  if (name) setQuery(name);
  setSuggestions([]);
};

  /* ---------- submit ---------- */
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const latLng = parseLatLng(query);
    if (latLng) {
      flyTo(latLng[0], latLng[1]);
      return;
    }

    if (suggestions.length > 0) {
      const s = suggestions[0];
      flyTo(s.lat, s.lon, s.name);
    }
  };

  /* ---------- keyboard navigation ---------- */
  const onKeyDown = (e: any) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown")
      setActiveIndex((i) => (i + 1) % suggestions.length);
    else if (e.key === "ArrowUp")
      setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
    else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const s = suggestions[activeIndex];
      flyTo(s.lat, s.lon, s.name);
    }
  };

  return (
    <div className="w-[420px]">
      <form onSubmit={handleSubmit} className="relative">
        <input
          value={query}
          onChange={(e) => fetchSuggestions(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search district, city, province or lat,lng"
          className="w-full px-4 py-3 rounded-full bg-white border border-gray-300 
                     shadow-md focus:ring-2 focus:ring-blue-500 outline-none text-black"
        />
        <button
          type="submit"
          className="absolute right-4 top-3 text-blue-600 font-semibold"
        >
          🔍
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="mt-2 bg-white rounded-lg shadow-md max-h-56 overflow-y-auto">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => flyTo(s.lat, s.lon, s.name)}
              className={`px-4 py-2 cursor-pointer text-sm ${
                i === activeIndex
                  ? "bg-blue-100 text-red-800"
                  : "hover:bg-gray-100 text-black"
              }`}
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
