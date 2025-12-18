"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

/* ---------- TYPES ---------- */
type Project = {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  size: number;
};


type ColumnsType = {
  opportunities: Project[];
  inProcess: Project[];
  completed: Project[];
};

/* ---------- CONSTANTS ---------- */
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

const optionsList = [
  "View Details",
  "Edit Project",
  "Assign Team",
  "Mark as Favorite",
];

/* ---------- COMPONENT ---------- */
export default function ProjectsBoardPage() {
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

  /* ---------- FETCH PROJECTS ---------- */
  useEffect(() => {
    fetch("http://localhost:8080/projects")
      .then((res) => res.json())
      .then((data) => {
        console.log("PROJECT API DATA:", data);
        const grouped: ColumnsType = {
          opportunities: [],
          inProcess: [],
          completed: [],
        };

        data.forEach((p: any) => {
          if (grouped[p.status]) {
          grouped[p.status].push({
  id: String(p.id),
  name: p.name,
  location: p.location,
  lat: p.lat,
  lng: p.lng,
  size: p.size,
});

          }
        });

        setColumns(grouped);
      })
      .catch((err) => console.error("PROJECT FETCH ERROR:", err));
  }, []);

  /* ---------- DRAG ---------- */
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

  /* ---------- DELETE ---------- */
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

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <DashboardHeader />
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Projects Board
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
                    <div
                      className={`w-3 h-3 rounded-full ${
                        statusCircles[columnId]
                      }`}
                    />
                    <h2 className="text-lg font-semibold capitalize">
                      {columnId.replace(/([A-Z])/g, " $1")}
                    </h2>
                  </div>

                {tasks.map((task, index) => (
  <Draggable
    key={task.id}
    draggableId={task.id}
    index={index}
  >
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="relative mb-3 p-4 bg-white border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 group"
      >
        {/* Delete button - visible on hover */}
        <button
          onClick={() =>
            setDeleteTarget({
              columnId: columnId as keyof ColumnsType,
              cardId: task.id,
            })
          }
          className="absolute top-2 right-2 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Trash2 size={20} />
        </button>

        {/* Project Name */}
      <h3 className="font-bold text-lg text-black mb-1">
  {task.name}
</h3>

<p className="text-sm text-black mb-2">
  📍 {task.location}
</p>

<div className="text-xs text-gray-700 space-y-1">
  <p>📌 Lat: {task.lat}, Lng: {task.lng}</p>
  <p>📐 Size: {task.size}</p>
</div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-2">
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => router.push("/project-board")}
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <p className="mb-4">
              Are you sure you want to delete?
            </p>
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
    </div>
  );
}
