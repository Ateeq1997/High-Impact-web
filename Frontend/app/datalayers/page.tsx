// app/dashboard/admin/DataLayers.tsx
"use client";

import { useState, useEffect} from "react";
import AdminDashHeader from "@/components/dashboard/AdminDashHeader";
interface Layer {
  id: number;
  name: string;
  type: "raster" | "vector";
  source: string;
  status: "active" | "inactive";
}

export default function DataLayers() {
  const [layers, setLayers] = useState<Layer[]>([]);

useEffect(() => {
  fetch("http://localhost:8080/admin/data-layers")
    .then(res => res.json())
    .then(data => setLayers(data))
    .catch(console.error);
}, []);


  const [newLayerName, setNewLayerName] = useState("");
  const [newLayerType, setNewLayerType] = useState<"raster" | "vector">("raster");
  const [newLayerSource, setNewLayerSource] = useState("");

const addLayer = async () => {
  if (!newLayerName || !newLayerSource) return;

  const res = await fetch("http://localhost:8080/admin/data-layers/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: newLayerName,
      type: newLayerType,
      source: newLayerSource,
    }),
  });

  if (!res.ok) {
    alert("Failed to add layer");
    return;
  }

  // Reload layers from DB
  const updated = await fetch("http://localhost:8080/admin/data-layers").then(r => r.json());
  setLayers(updated);

  setNewLayerName("");
  setNewLayerSource("");
};

const toggleStatus = async (id: number) => {
  await fetch(`http://localhost:8080/admin/data-layers/toggle?id=${id}`, {
    method: "PUT",
  });
  const updated = await fetch("http://localhost:8080/admin/data-layers").then(r => r.json());
  setLayers(updated);
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
