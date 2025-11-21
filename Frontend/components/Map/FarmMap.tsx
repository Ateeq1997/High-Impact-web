"use client";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

// -----------------------------
// Types
// -----------------------------
interface Field {
  id: number;
  coords: LatLngExpression[];
  tags: {
    landuse?: string;
    crop?: string;
    name?: string;
    natural?: string;
    [key: string]: any;
  };
}

interface FetchFieldsProps {
  onLoaded: (fields: Field[]) => void;
}

// -----------------------------
// Overpass Query
// -----------------------------
const overpassQuery = (bbox: string): string => `
[out:json][timeout:25];
(
  way["landuse"](${bbox});
  way["natural"](${bbox});
);
out tags geom;
`;

// -----------------------------
// Fetch Fields Component
// -----------------------------
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

      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: overpassQuery(bbox),
      });

      const data = await response.json();

      const polygons: Field[] = data.elements
        .filter((el: any) => el.geometry)
        .map((el: any) => ({
          id: el.id,
          coords: el.geometry.map(
            (g: any): LatLngExpression => [g.lat, g.lon]
          ),
          tags: el.tags || {},
        }));

      onLoaded(polygons);
    },
  });

  return null;
}

// -----------------------------
// Main Component
// -----------------------------
export default function FarmMap() {
  const [fields, setFields] = useState<Field[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[31.5204, 74.3587]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Satellite Layer */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {/* OSM Labels Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={0.7}
        />


        {fields.map((field) => (
          <Polygon
            key={field.id}
            positions={field.coords}
            pathOptions={{
              color: field.id === selected ? "yellow" : "white",
              weight: 2,
              fillOpacity: 0,
            }}
            eventHandlers={{
              click: () => setSelected(field.id),
            }}
          >
            {field.id === selected && (
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

        <FetchFields onLoaded={setFields} />
      </MapContainer>
    </div>
  );
}



//OpenStreetMap - OSM