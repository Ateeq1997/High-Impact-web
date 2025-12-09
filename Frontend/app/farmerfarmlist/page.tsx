"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

// Dummy data (example with more farms for FarmerA)
const farmsData = [
  { id: 1, name: "Green Valley Farms", address: "Sector A, Mardan", farms: 5, workers: 20, owner: "FarmerA" },
  { id: 2, name: "Sunrise Villas Farms", address: "Sector B, Mardan", farms: 4, workers: 15, owner: "FarmerA" },
  { id: 3, name: "Golden Acres", address: "Sector C, Mardan", farms: 6, workers: 18, owner: "FarmerA" },
  { id: 4, name: "Platinum Gardens", address: "Sector D, Mardan", farms: 5, workers: 20, owner: "FarmerA" },
  { id: 5, name: "Sunshine Group", address: "Sector E, Mardan", farms: 7, workers: 22, owner: "FarmerA" },
  { id: 6, name: "Orchard Lane", address: "Sector F, Mardan", farms: 4, workers: 14, owner: "FarmerA" },
  { id: 7, name: "Emerald Fields", address: "Sector G, Mardan", farms: 3, workers: 12, owner: "FarmerA" },
  { id: 8, name: "Riverfront Farms", address: "Sector H, Mardan", farms: 6, workers: 19, owner: "FarmerA" },
  { id: 9, name: "Cedar Farms", address: "Sector I, Mardan", farms: 5, workers: 16, owner: "FarmerA" },
  { id: 10, name: "Hilltop Farms", address: "Sector J, Mardan", farms: 4, workers: 15, owner: "FarmerA" },
  { id: 11, name: "Maple Leaf Farms", address: "Sector K, Mardan", farms: 5, workers: 18, owner: "FarmerA" },
  { id: 12, name: "Royal Farms", address: "Sector L, Mardan", farms: 6, workers: 21, owner: "FarmerA" },
  { id: 13, name: "Green Meadows", address: "Sector M, Mardan", farms: 5, workers: 17, owner: "FarmerA" },
  { id: 14, name: "Valley View", address: "Sector N, Mardan", farms: 4, workers: 13, owner: "FarmerA" },
  { id: 15, name: "Sunset Orchards", address: "Sector O, Mardan", farms: 7, workers: 23, owner: "FarmerA" },
  { id: 16, name: "Silver Springs", address: "Sector P, Mardan", farms: 3, workers: 11, owner: "FarmerA" },
  { id: 17, name: "Pine Grove Group", address: "Sector Q, Mardan", farms: 6, workers: 20, owner: "FarmerA" },
  { id: 18, name: "Hillcrest Farms", address: "Sector R, Mardan", farms: 5, workers: 15, owner: "FarmerA" },
  { id: 19, name: "Maple Grove", address: "Sector S, Mardan", farms: 4, workers: 12, owner: "FarmerA" },
  { id: 20, name: "Oakwood Farms", address: "Sector T, Mardan", farms: 7, workers: 24, owner: "FarmerA" },
];

export default function FarmerFarmsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const farmerName = "FarmerA"; // simulate logged-in user

  const farmerFarms = farmsData.filter((f) => f.owner === farmerName);

  const filteredData = farmerFarms.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.address.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="p-8 pt-24 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-black">My Farms 🌱</h1> {/* added emoji */}

        {/* Top Controls */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-black">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length}
          </span>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search farms..."
                value={search}
                onChange={handleSearchChange}
                className="pl-10 pr-3 py-2 border rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Pagination */}
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
                <th className="px-6 py-3 text-sm font-semibold text-black">Action</th> {/* NEW column */}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {currentData.map((f, idx) => (
                <tr key={f.id} className={idx % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}>
                  <td className="px-6 py-3 text-black">{f.name}</td>
                  <td className="px-6 py-3 text-black">{f.address}</td>
                  <td className="px-6 py-3 text-black">{f.farms}</td>
                  <td className="px-6 py-3 text-black">{f.workers}</td>
                  <td className="px-6 py-3">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {currentData.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No farms found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
