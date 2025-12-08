"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  Marker as RLMarker,
  useMapEvents,
} from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";

import "leaflet/dist/leaflet.css";

import SearchControl from "./SearchControl"; // your working search bar
import InfoProjectsPanel from "./InfoProjectPanel"; // Info & Projects button panel
import ZoomButtons from "./ZoomButtons";
import ChatBot from "./ChatBot";

// ----------------------------- types
interface Field {
  id: number;
  coords: LatLngExpression[];
  tags: { [key: string]: any };
}

interface FarmMapProps {}

interface FetchFieldsProps {
  onLoaded: (fields: Field[]) => void;
}

// ----------------------------- Overpass fetch helper
const overpassQuery = (bbox: string): string => `
[out:json][timeout:25];
(
  way["landuse"](${bbox});
  way["natural"](${bbox});
);
out tags geom;
`;

function FetchFields({ onLoaded }: FetchFieldsProps) {
  useMapEvents({
    async moveend() {
      const map = this;
      const bounds = map.getBounds();

      const bbox = [
        bounds.getSouth(),
        bounds.getWest(),
        bounds.getNorth(),
        bounds.getEast(),
      ].join(",");

      try {
        const response = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: overpassQuery(bbox),
        });
        const data = await response.json();

        const polygons: Field[] = data.elements
          .filter((el: any) => el.geometry)
          .map((el: any) => ({
            id: el.id,
            coords: el.geometry.map((g: any) => [g.lat, g.lon]),
            tags: el.tags || {},
          }));

        onLoaded(polygons);
      } catch (err) {
        console.error("Overpass fetch error:", err);
        onLoaded([]);
      }
    },
  });

  return null;
}

// ----------------------------- main component
export default function FarmMap({}: FarmMapProps) {
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const [showChat, setShowChat] = useState(false);

  // balloon icon for selected plot
  const balloonIcon = new Icon({
    iconUrl: "/balloon.png",
    iconSize: [36, 48],
    iconAnchor: [18, 48],
  });

  // get polygon center
  function getPolygonCenter(coords: LatLngExpression[]) {
    let lat = 0,
      lng = 0;
    coords.forEach((c: any) => {
      lat += c[0];
      lng += c[1];
    });
    return [lat / coords.length, lng / coords.length] as [number, number];
  }

  const selectedPlot = fields.find((f) => f.id === selectedId) ?? null;

  return (
    <div className="relative h-[90vh] w-full">
      <MapContainer
        center={[31.5204, 74.3587]}
        zoom={14}
        className="h-full w-full z-0"
        zoomControl={false}
      >
        {/* Tile layers */}
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" opacity={0.7} />

        {/* Polygons */}
        {fields.map((field) => (
          <Polygon
            key={field.id}
            positions={field.coords}
            pathOptions={{
              color: field.id === selectedId ? "yellow" : "white",
              weight: 2,
              fillOpacity: 0,
            }}
            eventHandlers={{
              click: () => setSelectedId(field.id),
            }}
          >
            {field.id === selectedId && (
              <Popup>
                <div>
                  <h3 style={{ fontWeight: "bold", marginBottom: "6px" }}>
                    Field Details
                  </h3>
                  {Object.keys(field.tags).length > 0 ? (
                    <table style={{ width: "100%", fontSize: "13px" }}>
                      <tbody>
                        {Object.entries(field.tags).map(([key, value]) => (
                          <tr key={key}>
                            <td style={{ fontWeight: "bold", paddingRight: "6px" }}>
                              {key}:
                            </td>
                            <td>{value.toString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No OSM tags found for this field.</p>
                  )}
                </div>
              </Popup>
            )}
          </Polygon>
        ))}

        {/* Balloon marker */}
        {selectedId && fields.length > 0 && (
          <RLMarker
            position={getPolygonCenter(fields.find((f) => f.id === selectedId)!.coords)}
            icon={balloonIcon}
          />
        )}

        {/* Search bar */}
        <SearchControl
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setMarkerPosition={setMarkerPosition}
        />

        {/* Zoom buttons */}
        <ZoomButtons />

        {/* Fetch polygons */}
        <FetchFields onLoaded={setFields} />
      </MapContainer>

      {/* Info + Projects buttons */}
      <div className="absolute top-4 left-4 z-50 pointer-events-auto">
        <InfoProjectsPanel selectedPlot={selectedPlot} />
      </div>

      {/* Chatbot */}
      <div className="absolute right-4 bottom-4 z-50">
        <ChatBot showChat={showChat} setShowChat={setShowChat} />
      </div>
    </div>
  );
}
