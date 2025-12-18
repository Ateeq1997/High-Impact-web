"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";


export default function FarmerFarmsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [farmsData, setFarmsData] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;
  const farmerName = "FarmerA"; // simulate logged-in user

const filteredData = farmsData.filter(
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
  useEffect(() => {
  const farmerName = "FarmerA"; // later get from auth / context

  fetch(`http://localhost:8080/farms?farmer=${farmerName}`)
    .then((res) => res.json())
    .then((data) => {
      setFarmsData(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Failed to load farms", err);
      setLoading(false);
    });
}, []);


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

        {/* Table or Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-lg text-gray-500">Loading farms...</span>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
