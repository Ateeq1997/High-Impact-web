"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

// ---- SAMPLE USER DATA (20 USERS) ----
const usersData = [
  { id: 1, name: "Ali Khan", email: "ali.khan@example.com", phone: "0301-1234567", role: "Admin", status: "Active", joined: "2024-01-10" },
  { id: 2, name: "Sara Ahmed", email: "sara.ahmed@example.com", phone: "0302-2345678", role: "Manager", status: "Active", joined: "2024-02-12" },
  { id: 3, name: "Bilal Shah", email: "bilal.shah@example.com", phone: "0303-3456789", role: "Viewer", status: "Inactive", joined: "2024-03-14" },
  { id: 4, name: "Hina Tariq", email: "hina.tariq@example.com", phone: "0304-4567890", role: "Manager", status: "Active", joined: "2024-04-16" },
  { id: 5, name: "Omar Farooq", email: "omar.farooq@example.com", phone: "0305-5678901", role: "Viewer", status: "Active", joined: "2024-05-11" },
  { id: 6, name: "Zain Ali", email: "zain.ali@example.com", phone: "0306-6789012", role: "Admin", status: "Inactive", joined: "2024-05-20" },
  { id: 7, name: "Ayesha Riaz", email: "ayesha.riaz@example.com", phone: "0307-7890123", role: "Viewer", status: "Active", joined: "2024-06-01" },
  { id: 8, name: "Imran Malik", email: "imran.malik@example.com", phone: "0308-8901234", role: "Manager", status: "Active", joined: "2024-06-18" },
  { id: 9, name: "Nida Qureshi", email: "nida.qureshi@example.com", phone: "0309-9012345", role: "Admin", status: "Active", joined: "2024-06-21" },
  { id: 10, name: "Faisal Khan", email: "faisal.khan@example.com", phone: "0310-1234500", role: "Viewer", status: "Inactive", joined: "2024-07-05" },
  { id: 11, name: "Sana Mir", email: "sana.mir@example.com", phone: "0311-2234567", role: "Manager", status: "Active", joined: "2024-07-10" },
  { id: 12, name: "Hamza Ali", email: "hamza.ali@example.com", phone: "0312-3345678", role: "Viewer", status: "Active", joined: "2024-07-15" },
  { id: 13, name: "Shahzad Noor", email: "shahzad.noor@example.com", phone: "0313-4456789", role: "Admin", status: "Inactive", joined: "2024-08-01" },
  { id: 14, name: "Maria Zubair", email: "maria.zubair@example.com", phone: "0314-5567890", role: "Manager", status: "Active", joined: "2024-08-07" },
  { id: 15, name: "Junaid Hassan", email: "junaid.hassan@example.com", phone: "0315-6678901", role: "Viewer", status: "Inactive", joined: "2024-08-20" },
  { id: 16, name: "Hassan Raza", email: "hassan.raza@example.com", phone: "0316-7789012", role: "Admin", status: "Active", joined: "2024-09-04" },
  { id: 17, name: "Mehwish Ali", email: "mehwish.ali@example.com", phone: "0317-8890123", role: "Viewer", status: "Active", joined: "2024-09-10" },
  { id: 18, name: "Tahir Javed", email: "tahir.javed@example.com", phone: "0318-9901234", role: "Manager", status: "Active", joined: "2024-09-28" },
  { id: 19, name: "Rubina Khan", email: "rubina.khan@example.com", phone: "0319-1112233", role: "Admin", status: "Inactive", joined: "2024-10-06" },
  { id: 20, name: "Sarmad Rehman", email: "sarmad.rehman@example.com", phone: "0320-2223344", role: "Viewer", status: "Active", joined: "2024-10-14" },
];

export default function GroupListPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  const filteredData = usersData.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
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
        <h1 className="text-3xl font-bold mb-6 text-black">Group List (Users)</h1>

        {/* Top Controls */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-black">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)}
          </span>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-3 py-2 border rounded-lg text-black focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Pagination */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-2 py-1 border rounded bg-white hover:bg-gray-200"
            >
              <ChevronLeft className="w-4 h-4 text-blue-600" />
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-2 py-1 border rounded bg-white hover:bg-gray-200"
            >
              <ChevronRight className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white border rounded-lg shadow-md">
          <table className="min-w-full text-center divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 font-semibold text-black">User Name</th>
                <th className="px-6 py-3 font-semibold text-black">Email</th>
                <th className="px-6 py-3 font-semibold text-black">Phone</th>
                <th className="px-6 py-3 font-semibold text-black">Role</th>
                <th className="px-6 py-3 font-semibold text-black">Status</th>
                <th className="px-6 py-3 font-semibold text-black">Joined</th>
                <th className="px-6 py-3 font-semibold text-black">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {currentData.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-black">{u.name}</td>
                  <td className="px-6 py-3 text-black">{u.email}</td>
                  <td className="px-6 py-3 text-black">{u.phone}</td>
                  <td className="px-6 py-3 text-black">{u.role}</td>
                  <td className={`px-6 py-3 font-semibold ${
                    u.status === "Active" ? "text-green-600" : "text-red-600"
                  }`}>
                    {u.status}
                  </td>
                  <td className="px-6 py-3 text-black">{u.joined}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => router.push(`/groups/${u.id}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}

              {currentData.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-gray-500">
                    No matching users found
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
