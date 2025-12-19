"use client";

import { useState } from "react";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Trash2, Edit2, PlusCircle, X } from "lucide-react";
import AdminDashHeader from "@/components/dashboard/AdminDashHeader";


export default function AdminFarmsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
 const [farms, setFarms] = useState<any[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingFarm, setEditingFarm] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", address: "", farms: 0, workers: 0, owner: "" });

  const filteredData = farms.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.address.toLowerCase().includes(search.toLowerCase()) ||
      f.owner.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openAddModal = () => {
    setEditingFarm(null);
    setFormData({ name: "", address: "", farms: 0, workers: 0, owner: "" });
    setModalOpen(true);
  };

  const openEditModal = (farm: any) => {
    setEditingFarm(farm);
    setFormData({ ...farm });
    setModalOpen(true);
  };

const handleSubmit = async () => {
  if (editingFarm) {
    // Update farm
    const res = await fetch("http://localhost:8080/admin/farms/update", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ id: editingFarm.id, ...formData }),
});


    if (!res.ok) {
      alert("Failed to update farm");
      return;
    }

    setFarms((prev) =>
      prev.map((f) => (f.id === editingFarm.id ? { ...f, ...formData } : f))
    );
  }  else {
  // Add farm
  const res = await fetch("http://localhost:8080/admin/farms/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    alert("Failed to add farm");
    return;
  }

  const newFarm = await res.json();

  setFarms(prev => [newFarm, ...prev]);
}

  setModalOpen(false);
};

const deleteFarm = async (id: number) => {
  if (!confirm("Are you sure you want to delete this farm?")) return;

  const res = await fetch(`http://localhost:8080/admin/farms/delete?id=${id}`, {
  method: "DELETE",
});

  if (!res.ok) {
    alert("Failed to delete farm");
    return;
  }

  setFarms((prev) => prev.filter((f) => f.id !== id));
};
useEffect(() => {
  fetch("http://localhost:8080/admin/farms")
    .then(res => res.json())
    .then(data => setFarms(data));
}, []);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AdminDashHeader />
      <div className="p-8 py-24 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-black">Farms List (Admin)</h1>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <PlusCircle size={20} /> Add Farm
          </button>
        </div>

        {/* Search & Pagination */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-black">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length}
          </span>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search farms"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-3 py-2 border rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-2 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white border rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200 text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-black">Group Name</th>
                <th className="px-6 py-3 text-sm font-semibold text-black">Address</th>
                <th className="px-6 py-3 text-sm font-semibold text-black">Farms</th>
                <th className="px-6 py-3 text-sm font-semibold text-black">Workers</th>
                <th className="px-6 py-3 text-sm font-semibold text-black">Owner</th>
                <th className="px-6 py-3 text-sm font-semibold text-black">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {currentData.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-black">{f.name}</td>
                  <td className="px-6 py-3 text-black">{f.address}</td>
                  <td className="px-6 py-3 text-black">{f.farms}</td>
                  <td className="px-6 py-3 text-black">{f.workers}</td>
                  <td className="px-6 py-3 text-black">{f.owner}</td>
                  <td className="px-6 py-3 flex justify-center gap-2">
                    <button
                      onClick={() => openEditModal(f)}
                      className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteFarm(f.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {currentData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No matching farms found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-black">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold mb-4">{editingFarm ? "Edit Farm" : "Add Farm"}</h2>
              <div className="flex flex-col gap-3 ">
                <input
                  type="text"
                  placeholder="Group Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Number of Farms"
                  value={formData.farms}
                  onChange={(e) => setFormData({ ...formData, farms: Number(e.target.value) })}
                  className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Number of Workers"
                  value={formData.workers}
                  onChange={(e) => setFormData({ ...formData, workers: Number(e.target.value) })}
                  className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Owner"
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSubmit}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {editingFarm ? "Save Changes" : "Add Farm"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}