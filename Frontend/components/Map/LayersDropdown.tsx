"use client";

import { useState, useEffect } from "react";
export default function LayersDropdown({ baseMap, setBaseMap }: any) {
  const [open, setOpen] = useState(false);
  const baseLayers = ["Streets", "Terrain", "Satellite", "Dark", "Light"];

  return (
    <div className="absolute top-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="px-4 py-2 bg-white rounded shadow font-semibold text-gray-800 hover:bg-black hover:text-blue-500 transition"
        >
          Layers ⬇️
        </button>

        {open && (
          <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-40">
            {baseLayers.map((layer) => (
              <button
                key={layer}
                onClick={() => {
                  setBaseMap(layer);
                  setOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-black hover:bg-blue-100 ${
                  baseMap === layer ? "font-bold text-blue-600" : ""
                }`}
              >
                {layer}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
