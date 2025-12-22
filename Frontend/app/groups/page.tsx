"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import AdminDashHeader from "@/components/dashboard/AdminDashHeader";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  joined: string;
};

export default function GroupListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8080/admin/groups")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch groups");
        return res.json();
      })
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error(err);
        setUsers([]);
      });
  }, []);

  const filteredData = users.filter(
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
      <AdminDashHeader />
      <div className="min-h-screen bg-gray-50 p-8 py-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Group List (Users)</h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <span className="text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length}
          </span>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800"
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 text-blue-700"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 text-blue-700"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full border-collapse bg-white text-gray-700">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">User Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Joined</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 border-b">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.phone}</td>
                  <td className="p-3">{u.role}</td>
                  <td className={`p-3 font-semibold ${u.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                    {u.status}
                  </td>
                  <td className="p-3">{u.joined}</td>
                </tr>
              ))}

              {currentData.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No users found
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
