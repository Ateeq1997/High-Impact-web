"use client";

import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function ClickHandler() {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);
  const [locationName, setLocationName] = useState<string>("");

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setMarker({ lat, lng });
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();
        setLocationName(data.display_name || "Unknown location");
      } catch {
        setLocationName("Unknown location");
      }
    },
  });

  return marker ? (
    <Marker position={[marker.lat, marker.lng]} icon={markerIcon}>
      <Popup>
        📍 <strong>{locationName}</strong>
        <br />
        Lat: {marker.lat.toFixed(4)}, Lng: {marker.lng.toFixed(4)}
      </Popup>
    </Marker>
  ) : null;
}
