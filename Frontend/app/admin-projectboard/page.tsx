"use client";

import AdminDashboardHeader from "@/components/dashboard/AdminDashHeader";
import Footer from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";
import { Trash2, PlusCircle } from "lucide-react";

type Project = {
  id: string;
  city: string;
  district: string;
  province: string;
  address: string;
  size_sqm: number;
  latitude: number;
  longitude: number;
  status: "opportunities" | "inProcess" | "completed";
};

type ColumnsType = {
  opportunities: Project[];
  inProcess: Project[];
  completed: Project[];
};

const statusCircles: Record<string, string> = {
  opportunities: "bg-yellow-400",
  inProcess: "bg-blue-500",
  completed: "bg-green-500",
};

export default function AdminProjectsBoardPage() {
  const router = useRouter();

  const [columns, setColumns] = useState<ColumnsType>({
    opportunities: [],
    inProcess: [],
    completed: [],
  });

  const [deleteTarget, setDeleteTarget] = useState<{
    columnId: keyof ColumnsType;
    cardId: string;
  } | null>(null);

  // Fetch projects from backend
  useEffect(() => {
    fetch("http://localhost:8080/admin/projects")
      .then((res) => res.json())
      .then((data) => {
        const grouped: ColumnsType = {
          opportunities: [],
          inProcess: [],
          completed: [],
        };

        data.forEach((p: any) => {
          if (grouped[p.status]) {
            grouped[p.status].push({
              id: String(p.id),
              city: p.city,
              district: p.district,
              province: p.province,
              address: p.address,
              size_sqm: p.size_sqm,
              latitude: p.latitude,
              longitude: p.longitude,
              status: p.status,
            });
          }
        });

        setColumns(grouped);
      })
      .catch(console.error);
  }, []);

  // Drag & Drop handler
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    setColumns((prev) => {
      const copy = structuredClone(prev);
      const sourceCol = copy[source.droppableId as keyof ColumnsType];
      const destCol = copy[destination.droppableId as keyof ColumnsType];

      const [moved] = sourceCol.splice(source.index, 1);
      destCol.splice(destination.index, 0, moved);

      return copy;
    });
  };

  // Delete project
  const confirmDelete = () => {
    if (!deleteTarget) return;

    const { columnId, cardId } = deleteTarget;

    setColumns((prev) => {
      const copy = structuredClone(prev);
      copy[columnId] = copy[columnId].filter((c) => c.id !== cardId);
      return copy;
    });

    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <AdminDashboardHeader />
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Admin Projects Board
      </h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(columns).map(([columnId, tasks]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white border rounded-lg p-4 min-h-[500px]"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-3 h-3 rounded-full ${statusCircles[columnId]}`} />
                    <h2 className="text-lg font-semibold capitalize">
                      {columnId.replace(/([A-Z])/g, " $1")}
                    </h2>
                    <button
                      className="ml-auto text-green-600 hover:text-green-800"
                      onClick={() => alert("Add Project functionality")}
                    >
                      <PlusCircle size={20} />
                    </button>
                  </div>

                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="relative mb-3 p-4 bg-white border rounded-lg shadow hover:shadow-lg transition group"
                        >
                          {/* Delete button */}
                          <button
                            onClick={() =>
                              setDeleteTarget({
                                columnId: columnId as keyof ColumnsType,
                                cardId: task.id,
                              })
                            }
                            className="absolute top-2 right-2 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={20} />
                          </button>

                          <h3 className="font-bold text-lg text-black mb-1">
                            {task.city}, {task.district}
                          </h3>
                          <p className="text-sm text-black mb-2">{task.address}</p>

                          <div className="text-xs text-gray-700 space-y-1">
                            <p>📌 Lat: {task.latitude}, Lng: {task.longitude}</p>
                            <p>📐 Size: {task.size_sqm} sqm</p>
                            <p>🏙️ Province: {task.province}</p>
                          </div>

                          <div className="flex gap-2 mt-2">
                            <button
                              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                              onClick={() => router.push("/admin/project/" + task.id)}
                            >
                              Open
                            </button>
                            <button
                              className="px-3 py-1 border rounded hover:bg-gray-100 transition"
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

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded">
            <p className="mb-4">Are you sure you want to delete?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
