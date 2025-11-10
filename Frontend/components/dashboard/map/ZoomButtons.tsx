"use client";

import React from "react";
import { useMap } from "react-leaflet";

const ZoomButtons: React.FC = () => {
  const map = useMap(); // ✅ get map instance from context

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[1000]">
      <div className="bg-white rounded shadow flex overflow-hidden">
        <button
          aria-label="Zoom in"
          onClick={() => map.zoomIn()}
          className="px-4 py-2 font-bold text-gray-800 hover:bg-gray-100 focus:outline-none"
        >
          +
        </button>
        <div className="w-px bg-gray-200" />
        <button
          aria-label="Zoom out"
          onClick={() => map.zoomOut()}
          className="px-4 py-2 font-bold text-gray-800 hover:bg-gray-100 focus:outline-none"
        >
          −
        </button>
      </div>
    </div>
  );
};

export default ZoomButtons;
