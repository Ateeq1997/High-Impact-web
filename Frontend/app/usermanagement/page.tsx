// app/dashboard/admin/UserManagement.tsx
"use client";

import { useState, useEffect } from "react";
import AdminDashHeader from "@/components/dashboard/AdminDashHeader";

interface User {
  id: number;
  name: string;
  email: string;
  role: "farmer" | "admin";
  status: "active" | "inactive";
  joinedAt: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [filterRole, setFilterRole] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<"farmer" | "admin">("farmer");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [viewUser, setViewUser] = useState<User | null>(null);

useEffect(() => {
  fetch("http://localhost:8080/admin/users")
    .then(res => res.json())
    .then(data => {
      console.log("USERS FROM API:", data);
      setUsers(data);
    });
}, []);


  const filteredUsers = users.filter(
    (user) =>
      (filterRole === "all" || user.role === filterRole) &&
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

const toggleStatus = (id: number) => {
  setUsers((prev) =>
    prev.map((user) =>
      user.id === id
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    )
  );
};




const handleChangeRole = (id: number, newRole: "farmer" | "admin") => {
  setUsers((prev) =>
    prev.map((user) =>
      user.id === id ? { ...user, role: newRole } : user
    )
  );
};


  const handleAddUser = () => {
    if (!newUserName || !newUserEmail) return;

    const newUser: User = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: "active",
      joinedAt: new Date().toISOString().split("T")[0],
    };
    setUsers([...users, newUser]);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserRole("farmer");
    setShowAddModal(false);
  };

  const toggleSelectUser = (id: number | string) => {
    const numId = typeof id === "string" ? parseInt(id, 10) : id;
    if (selectedUsers.includes(numId)) {
      setSelectedUsers(selectedUsers.filter((uid) => uid !== numId));
    } else {
      setSelectedUsers([...selectedUsers, numId]);
    }
  };

  const bulkAction = (action: "activate" | "deactivate" | "delete") => {
    if (action === "delete") {
      setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
    } else {
      setUsers(users.map((user) =>
        selectedUsers.includes(user.id)
          ? { ...user, status: action === "activate" ? "active" : "inactive" }
          : user
      ));
    }
    setSelectedUsers([]);
  };

  const exportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Email,Role,Status,Joined At"]
        .concat(users.map((u) => `${u.name},${u.email},${u.role},${u.status},${u.joinedAt}`))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <AdminDashHeader />
      <div className="p-20">
        <h1 className="text-2xl font-bold mb-6 text-black">User Management</h1>

        {/* Search and Filter */}
        <div className="flex flex-wrap gap-4 mb-4 items-center text-black">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="border rounded px-2 py-1 flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border rounded px-2 py-1"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="farmer">Farmer</option>
            <option value="admin">Admin</option>
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setShowAddModal(true)}
          >
            Add New User
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={exportCSV}
          >
            Export CSV
          </button>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="mb-4 text-black">
            <span className="mr-2 font-medium">{selectedUsers.length} selected</span>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded mr-2"
              onClick={() => bulkAction("activate")}
            >
              Activate
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded mr-2"
              onClick={() => bulkAction("deactivate")}
            >
              Deactivate
            </button>
            <button
              className="bg-gray-500 text-white px-3 py-1 rounded"
              onClick={() => bulkAction("delete")}
            >
              Delete
            </button>
          </div>
        )}

        {/* User Table */}
        <div className="overflow-x-auto border rounded text-black">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2"><input type="checkbox" className="mr-2" onChange={(e) => {
                  if (e.target.checked) setSelectedUsers(users.map(u => u.id));
                  else setSelectedUsers([]);
                }} /></th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Joined At</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelectUser(user.id)}
                    />
                  </td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <select
                      value={user.role}
                      onChange={(e) => handleChangeRole(user.id, e.target.value as "farmer" | "admin")}
                      className="border rounded px-1 py-1"
                    >
                      <option value="farmer">Farmer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">
     <span
  className={`px-2 py-1 rounded text-white ${
    user.status === "active" ? "bg-green-500" : "bg-red-500"
  }`}
>
  {user.status}
</span>


                  </td>
                  <td className="px-4 py-2">{user.joinedAt}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className={`px-3 py-1 rounded ${
                        user.status === "active" ? "bg-red-500 text-white" : "bg-green-500 text-white"
                      }`}
                      onClick={() => toggleStatus(user.id)}
                    >
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      className="bg-gray-500 text-white px-3 py-1 rounded"
                      onClick={() => setViewUser(user)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 text-black">
          <div className="bg-white p-6 rounded w-96 text-black">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <input
              type="text"
              placeholder="Name"
              className="border rounded px-2 py-1 w-full mb-2"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="border rounded px-2 py-1 w-full mb-2"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
            />
            <select
              className="border rounded px-2 py-1 w-full mb-4"
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value as "farmer" | "admin")}
            >
              <option value="farmer">Farmer</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleAddUser}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {viewUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 text-black">
          <div className="bg-white p-6 rounded w-96 text-black">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <p><strong>Name:</strong> {viewUser.name}</p>
            <p><strong>Email:</strong> {viewUser.email}</p>
            <p><strong>Role:</strong> {viewUser.role}</p>
            <p><strong>Status:</strong> {viewUser.status}</p>
            <p><strong>Joined At:</strong> {viewUser.joinedAt}</p>
            <p><strong>Total Parcels:</strong> 5</p>
            <p><strong>Active Projects:</strong> 2</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setViewUser(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
