// app/dashboard/admin/DataLayers.tsx
"use client";

import { useState } from "react";
import AdminDashHeader from "@/components/dashboard/AdminDashHeader";
interface Layer {
  id: string;
  name: string;
  type: "raster" | "vector";
  source: string;
  status: "active" | "inactive";
}

const initialLayers: Layer[] = [
  { id: "1", name: "NDVI Layer", type: "raster", source: "s3://highimpact/tiles/ndvi", status: "active" },
  { id: "2", name: "Rainfall Layer", type: "raster", source: "s3://highimpact/tiles/rainfall", status: "active" },
  { id: "3", name: "Soil Type Layer", type: "vector", source: "s3://highimpact/tiles/soil", status: "inactive" },
  { id: "4", name: "Temperature Layer", type: "raster", source: "s3://highimpact/tiles/temp", status: "active" },
  { id: "5", name: "Elevation Layer", type: "raster", source: "s3://highimpact/tiles/elevation", status: "inactive" },
  { id: "6", name: "Land Use Layer", type: "vector", source: "s3://highimpact/tiles/landuse", status: "active" },
  { id: "7", name: "Water Bodies Layer", type: "vector", source: "s3://highimpact/tiles/water", status: "inactive" },
  { id: "8", name: "Crop Type Layer", type: "vector", source: "s3://highimpact/tiles/crop", status: "active" },
  { id: "9", name: "Humidity Layer", type: "raster", source: "s3://highimpact/tiles/humidity", status: "inactive" },
  { id: "10", name: "Vegetation Layer", type: "raster", source: "s3://highimpact/tiles/vegetation", status: "active" },
];

export default function DataLayers() {
  const [layers, setLayers] = useState<Layer[]>(initialLayers);
  const [newLayerName, setNewLayerName] = useState("");
  const [newLayerType, setNewLayerType] = useState<"raster" | "vector">("raster");
  const [newLayerSource, setNewLayerSource] = useState("");

  const addLayer = () => {
    if (!newLayerName || !newLayerSource) return;

    const newLayer: Layer = {
      id: (layers.length + 1).toString(),
      name: newLayerName,
      type: newLayerType,
      source: newLayerSource,
      status: "inactive",
    };
    setLayers([...layers, newLayer]);
    setNewLayerName("");
    setNewLayerSource("");
  };

  const toggleStatus = (id: string) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id ? { ...layer, status: layer.status === "active" ? "inactive" : "active" } : layer
      )
    );
  };

  return (
    <><AdminDashHeader />
    <div className="p-6 text-black mt-16">
      <h1 className="text-2xl font-bold mb-4">Data Layers Management</h1>

      {/* Add New Layer */}
      <div className="flex gap-4 mb-6 items-end">
        <div>
          <label className="block font-medium mb-1">Layer Name</label>
          <input
            type="text"
            className="border rounded px-2 py-1"
            value={newLayerName}
            onChange={(e) => setNewLayerName(e.target.value)}
            placeholder="NDVI Layer" />
        </div>
        <div>
          <label className="block font-medium mb-1">Layer Type</label>
          <select
            className="border rounded px-2 py-1"
            value={newLayerType}
            onChange={(e) => setNewLayerType(e.target.value as "raster" | "vector")}
          >
            <option value="raster">Raster</option>
            <option value="vector">Vector</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Source URL / S3 Path</label>
          <input
            type="text"
            className="border rounded px-2 py-1"
            value={newLayerSource}
            onChange={(e) => setNewLayerSource(e.target.value)}
            placeholder="s3://highimpact/tiles/ndvi" />
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={addLayer}
        >
          Add Layer
        </button>
      </div>

      {/* Existing Layers Table */}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Source</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {layers.map((layer) => (
              <tr key={layer.id}>
                <td className="px-4 py-2">{layer.name}</td>
                <td className="px-4 py-2 capitalize">{layer.type}</td>
                <td className="px-4 py-2">{layer.source}</td>
                <td className="px-4 py-2">{layer.status}</td>
                <td className="px-4 py-2">
                  <button
                    className={`px-3 py-1 rounded ${layer.status === "active" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
                    onClick={() => toggleStatus(layer.id)}
                  >
                    {layer.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div></>
  );
}
