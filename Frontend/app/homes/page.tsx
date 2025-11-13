"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

// Sample Farm Data
const farmData = [
  { id: 1, name: "Green Valley Farm", size: "15 acres", lat: "34.2001", long: "72.0400", address: "Sector A, Mardan", owner: "Ali Khan" },
  { id: 2, name: "Blue Heights Agriculture", size: "10 acres", lat: "34.2101", long: "72.0500", address: "Sector B, Peshawar", owner: "Sara Ahmed" },
  { id: 3, name: "Sunrise Villas Farm", size: "12 acres", lat: "34.2201", long: "72.0600", address: "Sector C, Swat", owner: "Imran Malik" },
  { id: 4, name: "Dream Gardens", size: "18 acres", lat: "34.2301", long: "72.0700", address: "Sector D, Charsadda", owner: "Hina Tariq" },
  { id: 5, name: "Mountain View Farm", size: "8 acres", lat: "34.2401", long: "72.0800", address: "Sector E, Nowshera", owner: "Zain Ali" },
   { id: 6, name: "Golden Fields", size: "11 acres", lat: "34.2501", long: "72.0900", address: "Sector F, Mardan", owner: "Faisal Khan" },
  { id: 7, name: "River Side Farm", size: "14 acres", lat: "34.2601", long: "72.1000", address: "Sector G, Swat", owner: "Ayesha Riaz" },
  { id: 8, name: "Sunny Acres", size: "9 acres", lat: "34.2701", long: "72.1100", address: "Sector H, Peshawar", owner: "Bilal Shah" },
  { id: 9, name: "Harvest Hub", size: "20 acres", lat: "34.2801", long: "72.1200", address: "Sector I, Charsadda", owner: "Nida Qureshi" },
  { id: 10, name: "Farmers Alliance", size: "13 acres", lat: "34.2901", long: "72.1300", address: "Sector J, Nowshera", owner: "Omar Farooq" },
  { id: 11, name: "Green Valley Farm", size: "25 acres", lat: "34.2001", long: "72.0400", address: "Sector K, Mardan", owner: "Ali Khan" },
  { id: 12, name: "Blue Heights Agriculture", size: "20 acres", lat: "34.2101", long: "72.0500", address: "Sector L, Peshawar", owner: "Sara Ahmed" },
  { id: 13, name: "Sunrise Villas Farm", size: "22 acres", lat: "34.2201", long: "72.0600", address: "Sector M, Swat", owner: "Imran Malik" },
  { id: 14, name: "Dream Gardens", size: "28 acres", lat: "34.2301", long: "72.0700", address: "Sector N, Charsadda", owner: "Hina Tariq" },
  { id: 15, name: "Mountain View Farm", size: "28 acres", lat: "34.2401", long: "72.0800", address: "Sector O, Nowshera", owner: "Zain Ali" },
  { id: 16, name: "Golden Fields", size: "21 acres", lat: "34.2501", long: "72.0900", address: "Sector P, Mardan", owner: "Faisal Khan" },
  { id: 17, name: "River Side Farm", size: "24 acres", lat: "34.2601", long: "72.1000", address: "Sector Q, Swat", owner: "Ayesha Riaz" },
  { id: 18, name: "Sunny Acres", size: "29 acres", lat: "34.2701", long: "72.1100", address: "Sector R, Peshawar", owner: "Bilal Shah" },
  { id: 19, name: "Harvest Hub", size: "30 acres", lat: "34.2801", long: "72.1200", address: "Sector S, Charsadda", owner: "Nida Qureshi" },
  { id: 20, name: "Farmers Alliance", size: "23 acres", lat: "34.2901", long: "72.1300", address: "Sector T, Nowshera", owner: "Omar Farooq" },
];

export default function FarmListPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  const filteredData = farmData.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.address.toLowerCase().includes(search.toLowerCase()) ||
      f.owner.toLowerCase().includes(search.toLowerCase())
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
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Farm List</h1>

        {/* Top Controls */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)}
          </span>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Filter farms"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-black"
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="px-2 py-1 border rounded hover:bg-gray-200"
              >
                <ChevronLeft className="w-4 h-4 text-blue-600" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="px-2 py-1 border rounded hover:bg-gray-200"
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
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Farm Name</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Size</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Latitude</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Longitude</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Address</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Owner</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentData.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-800">{f.name}</td>
                  <td className="px-6 py-3 text-gray-800">{f.size}</td>
                  <td className="px-6 py-3 text-gray-800">{f.lat}</td>
                  <td className="px-6 py-3 text-gray-800">{f.long}</td>
                  <td className="px-6 py-3 text-gray-800">{f.address}</td>
                  <td className="px-6 py-3 text-gray-800">{f.owner}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => router.push(`/farms/${f.id}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {currentData.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No matching farms found
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

