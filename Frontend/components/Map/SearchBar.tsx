"use client";

import { useState } from "react";
import L from "leaflet";

export default function SearchBar({
  mapInstance,
  setMarkerPosition,
  searchQuery,
  setSearchQuery,
}: any) {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);

  // fetch suggestions from OpenStreetMap Nominatim
  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) return setSuggestions([]);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
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
    } catch (err) {
      console.error(err);
    }
  };

  const showLocation = (lat: number, lon: number, name: string) => {
    if (!mapInstance) return;

    // set marker position in parent state
    setMarkerPosition([lat, lon]);
    mapInstance.setView([lat, lon], 14, { animate: true });
    setSearchQuery(name);
    setSuggestions([]);
  };

  const handleSearch = async (e?: any) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    if (!mapInstance) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=1`
      );
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        showLocation(parseFloat(lat), parseFloat(lon), display_name);
      } else alert("Location not found!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e: any) => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      setActiveSuggestion((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeSuggestion >= 0) {
        const s = suggestions[activeSuggestion];
        showLocation(s.lat, s.lon, s.name);
      } else handleSearch();
    }
  };

  return (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 w-96">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search city, street, or village..."
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white pr-10"
        />
        <button
          type="submit"
          className="absolute right-3 top-2.5 text-blue-600 hover:text-blue-800"
        >
          🔍
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-lg mt-1 w-full shadow-md max-h-52 overflow-y-auto z-[1000]">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              onClick={() => showLocation(s.lat, s.lon, s.name)}
              className={`px-4 py-2 cursor-pointer ${
                idx === activeSuggestion ? "bg-blue-100 text-blue-800" : "hover:bg-blue-50 text-black"
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
