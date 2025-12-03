"use client";

import AdminDashboardHeader from "@/components/dashboard/AdminDashHeader";
import Footer from "@/components/layout/Footer";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";
import { Trash2, Edit2, PlusCircle } from "lucide-react";

interface Project {
  id: string;
  name: string;
  owner: string; // Farmer or Admin
  location?: string;
  status: "opportunities" | "inProcess" | "completed";
}

// Sample projects (replace with API or database later)
const initialProjects: Project[] = [
  { id: "1", name: "Green Valley Phase 1", owner: "FarmerA", location: "Sector A", status: "opportunities" },
  { id: "2", name: "Blue Heights", owner: "Admin", location: "Sector B", status: "opportunities" },
  { id: "3", name: "Sunrise Villas", owner: "FarmerB", location: "Sector C", status: "inProcess" },
  { id: "4", name: "Dream Gardens", owner: "Admin", location: "Sector D", status: "inProcess" },
  { id: "5", name: "Mountain View Residency", owner: "FarmerC", location: "Sector E", status: "completed" },
  { id: "6", name: "Riverfront Residency", owner: "FarmerD", location: "Sector F", status: "opportunities" },
  { id: "7", name: "Golden Acres", owner: "Admin", location: "Sector G", status: "opportunities" },
  { id: "8", name: "Sunset Farms", owner: "FarmerE", location: "Sector H", status: "inProcess" },
  { id: "9", name: "Emerald City", owner: "Admin", location: "Sector I", status: "inProcess" },
  { id: "10", name: "Lakeside Villas", owner: "FarmerF", location: "Sector J", status: "completed" },
  { id: "11", name: "Platinum Gardens", owner: "FarmerG", location: "Sector K", status: "completed" },
];

const columnColors: Record<string, string> = {
  opportunities: "bg-yellow-100 border-yellow-300 text-yellow-700",
  inProcess: "bg-blue-100 border-blue-300 text-blue-700",
  completed: "bg-green-100 border-green-300 text-green-700",
};

const statusCircles: Record<string, string> = {
  opportunities: "bg-yellow-400",
  inProcess: "bg-blue-500",
  completed: "bg-green-500",
};

export default function AdminProjectsBoardPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string } | null>(null);
  const router = useRouter();

  // Group projects by status
  const columns = ["opportunities", "inProcess", "completed"].reduce((acc, status) => {
    acc[status] = projects.filter((p) => p.status === status);
    return acc;
  }, {} as Record<string, Project[]>);

  // Drag & Drop handler
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceCol = [...columns[source.droppableId]];
    const destCol = [...columns[destination.droppableId]];
    const [moved] = sourceCol.splice(source.index, 1);
    moved.status = destination.droppableId as Project["status"];
    destCol.splice(destination.index, 0, moved);

    setProjects((prev) => [
      ...prev.filter((p) => p.id !== moved.id),
      ...[...sourceCol, ...destCol].filter((p) => p.id === moved.id),
    ]);
  };

  // Add new project
  const addProject = (status: Project["status"]) => {
    const name = prompt("Enter project name:");
    const owner = prompt("Assign to (Farmer/Admin):") || "Admin";
    const location = prompt("Location (optional):") || "";

    if (!name) return;

    const newProject: Project = {
      id: Date.now().toString(),
      name,
      owner,
      location,
      status,
    };

    setProjects((prev) => [...prev, newProject]);
  };

  // Edit project
  const editProject = (project: Project) => {
    const name = prompt("Edit project name:", project.name) || project.name;
    const owner = prompt("Edit owner:", project.owner) || project.owner;
    const location = prompt("Edit location:", project.location || "") || project.location;

    setProjects((prev) => prev.map((p) => (p.id === project.id ? { ...p, name, owner, location } : p)));
  };

  // Delete project
  const confirmDelete = () => {
    if (!deleteTarget) return;
    setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <><div className="min-h-screen bg-gray-100 p-6 relative">
          <AdminDashboardHeader />
          <h1 className="text-3xl font-bold text-blue-700 mb-6">Admin Projects Board</h1>

          <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(columns).map(([columnId, tasks]) => (
                      <Droppable key={columnId} droppableId={columnId}>
                          {(provided, snapshot) => (
                              <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  className={`rounded-lg p-4 min-h-[500px] border ${snapshot.isDraggingOver ? "bg-blue-50" : "bg-white"}`}
                              >
                                  <div className="flex items-center gap-2 mb-4">
                                      <div className={`w-3 h-3 rounded-full ${statusCircles[columnId]}`} />
                                      <h2 className={`text-lg font-semibold capitalize ${columnColors[columnId]}`}>
                                          {columnId.replace(/([A-Z])/g, " $1")}
                                      </h2>
                                      <button
                                          className="ml-auto text-green-600 hover:text-green-800"
                                          onClick={() => addProject(columnId as Project["status"])}
                                          title="Add Project"
                                      >
                                          <PlusCircle size={20} />
                                      </button>
                                  </div>

                                  {tasks.map((task, index) => (
                                      <Draggable key={task.id} draggableId={task.id} index={index}>
                                          {(provided) => (
                                              <div
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  ref={provided.innerRef}
                                                  className="mb-3 p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition cursor-grab active:cursor-grabbing relative"
                                              >
                                                  {/* Top-right icons */}
                                                  <div className="absolute top-2 right-2 flex gap-2">
                                                      <button
                                                          onClick={() => editProject(task)}
                                                          className="p-1 rounded hover:bg-gray-200 text-blue-600"
                                                          title="Edit"
                                                      >
                                                          <Edit2 size={16} />
                                                      </button>
                                                      <button
                                                          onClick={() => setDeleteTarget({ id: task.id })}
                                                          className="p-1 rounded hover:bg-red-100 text-red-600"
                                                          title="Delete"
                                                      >
                                                          <Trash2 size={16} />
                                                      </button>
                                                  </div>

                                                  <h3 className="text-md font-semibold text-black mb-1">{task.name}</h3>
                                                  <p className="text-sm text-gray-600 mb-1">Owner: {task.owner}</p>
                                                  <p className="text-sm text-gray-600 mb-3">{task.location}</p>

                                                  <div className="flex justify-between mt-2">
                                                      <button
                                                          className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                                                          onClick={() => router.push(`/admin/project/${task.id}`)}
                                                      >
                                                          Open
                                                      </button>
                                                      <button
                                                          className="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                                                          onClick={() => router.push("/map1")}
                                                      >
                                                          Show in Map
                                                      </button>
                                                  </div>
                                              </div>
                                          )}
                                      </Draggable>
                                  ))}
                                  {provided.placeholder}
                              </div>
                          )}
                      </Droppable>
                  ))}
              </div>
          </DragDropContext>

          {/* Delete Confirmation Modal */}
          {deleteTarget && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
                      <h3 className="text-lg font-semibold mb-4 text-black">Confirm Delete</h3>
                      <p className="text-sm text-gray-700 mb-6">Are you sure you want to delete this project?</p>
                      <div className="flex justify-end gap-4">
                          <button
                              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                              onClick={() => setDeleteTarget(null)}
                          >
                              Cancel
                          </button>
                          <button
                              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                              onClick={confirmDelete}
                          >
                              Delete
                          </button>
                      </div>
                  </div>
              </div>
          )}
      </div>
      <Footer /></>
  );
}
