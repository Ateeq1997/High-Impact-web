"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const dummyData = [
  { id: 1, name: "Green Valley Farms", address: "Sector A, Mardan", farms: 5, workers: 20 },
  { id: 2, name: "Blue Heights Agriculture", address: "Sector B, Peshawar", farms: 3, workers: 15 },
  { id: 3, name: "Sunrise Villas Farms", address: "Sector C, Swat", farms: 4, workers: 12 },
  { id: 4, name: "Dream Gardens Group", address: "Sector D, Charsadda", farms: 6, workers: 25 },
  { id: 5, name: "Mountain View Operators", address: "Sector E, Nowshera", farms: 2, workers: 10 },
  { id: 6, name: "Golden Fields", address: "Sector F, Mardan", farms: 3, workers: 14 },
  { id: 7, name: "River Side Farms", address: "Sector G, Swat", farms: 5, workers: 18 },
  { id: 8, name: "Sunny Acres", address: "Sector H, Peshawar", farms: 4, workers: 16 },
  { id: 9, name: "Harvest Hub", address: "Sector I, Charsadda", farms: 6, workers: 22 },
  { id: 10, name: "Farmers Alliance", address: "Sector J, Nowshera", farms: 3, workers: 12 },
  { id: 11, name: "Green Valley Farms1", address: "Sector K, Mardan", farms: 15, workers: 30 },
  { id: 12, name: "Blue Heights Agriculture1", address: "Sector L, Peshawar", farms: 13, workers: 35 },
  { id: 13, name: "Sunrise Villas Farms1", address: "Sector M, Swat", farms: 14, workers: 32 },
  { id: 14, name: "Dream Gardens Group1", address: "Sector N, Charsadda", farms: 16, workers: 35 },
  { id: 15, name: "Mountain View Operators1", address: "Sector O, Nowshera", farms: 12, workers: 30 },
  { id: 16, name: "Golden Fields1", address: "Sector P, Mardan", farms: 13, workers: 34 },
  { id: 17, name: "River Side Farms1", address: "Sector Q, Swat", farms: 15, workers: 38 },
  { id: 18, name: "Sunny Acres1", address: "Sector R, Peshawar", farms: 14, workers: 36 },
  { id: 19, name: "Harvest Hub1", address: "Sector S, Charsadda", farms: 16, workers: 32 },
  { id: 20, name: "Farmers Alliance1", address: "Sector T, Nowshera", farms: 13, workers: 32 },
];

export default function OperatorGroupsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  const filteredData = dummyData.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.address.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-gray-50 p-8 py-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Operator Groups</h1>

        {/* Top Controls */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length}
          </span>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Filter groups"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); // reset page on search
                }}
                className="pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-black"
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 text-blue-600" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white border rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200 text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Group Name</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Address</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Number of Farms</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Number of Workers</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentData.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-800">{d.name}</td>
                  <td className="px-6 py-3 text-gray-800">{d.address}</td>
                  <td className="px-6 py-3 text-gray-800">{d.farms}</td>
                  <td className="px-6 py-3 text-gray-800">{d.workers}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => router.push(`/operators/${d.id}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {currentData.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No matching groups found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
