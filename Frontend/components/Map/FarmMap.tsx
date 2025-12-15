"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface District {
  id: number;
  district: string;
  division: string;
  province: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

export default function FarmMap() {
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/districts") // your API endpoint
      .then(res => res.json())
      .then(data => setDistricts(data))
      .catch(console.error);
  }, []);

  return (
    <div className="relative h-[90vh] w-full">
      <MapContainer center={[31.5204, 74.3587]} zoom={7} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {districts.map(d => (
          <Polygon
            key={d.id}
            positions={d.geometry.coordinates[0].map(([lng, lat]) => [lat, lng])}
            pathOptions={{
              color: selectedDistrict?.id === d.id ? "yellow" : "white",
              weight: 2,
              fillOpacity: 0.1,
            }}
            eventHandlers={{
              click: () => setSelectedDistrict(d),
            }}
          />
        ))}
      </MapContainer>

      {selectedDistrict && (
        <div className="absolute top-4 left-4 bg-white p-2 z-50">
          <strong>{selectedDistrict.district}</strong>
          <p>{selectedDistrict.division}, {selectedDistrict.province}</p>
        </div>
      )}
    </div>
  );
}
