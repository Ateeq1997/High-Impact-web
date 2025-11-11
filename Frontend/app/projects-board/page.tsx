"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react"; // Trash icon

const initialData: Record<string, Array<{ id: string; name: string; location?: string }>> = {
  opportunities: [
    { id: "1", name: "Green Valley Phase 1", location: "Sector A" },
    { id: "2", name: "Blue Heights", location: "Sector B" },
  ],
  inProcess: [
    { id: "3", name: "Sunrise Villas", location: "Sector C" },
    { id: "4", name: "Dream Gardens", location: "Sector D" },
  ],
  completed: [{ id: "5", name: "Mountain View Residency", location: "Sector E" }],
};

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

export default function ProjectsBoardPage() {
  const [columns, setColumns] = useState(initialData);
  const [deleteTarget, setDeleteTarget] = useState<{ columnId: string; cardId: string } | null>(null);
  const router = useRouter();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    setColumns((prev) => {
      const newColumns = structuredClone(prev);
      const sourceCol = newColumns[source.droppableId];
      const destCol = newColumns[destination.droppableId];

      const [movedCard] = sourceCol.splice(source.index, 1);
      destCol.splice(destination.index, 0, movedCard);

      return newColumns;
    });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const { columnId, cardId } = deleteTarget;

    setColumns((prev) => {
      const newColumns = structuredClone(prev);
      newColumns[columnId] = newColumns[columnId].filter((c) => c.id !== cardId);
      return newColumns;
    });

    setDeleteTarget(null); // close modal
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <DashboardHeader />
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Projects Board</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(columns).map(([columnId, tasks]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`rounded-lg p-4 min-h-[500px] border ${
                    snapshot.isDraggingOver ? "bg-blue-50" : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-3 h-3 rounded-full ${statusCircles[columnId]}`} />
                    <h2 className={`text-lg font-semibold capitalize ${columnColors[columnId]}`}>
                      {columnId.replace(/([A-Z])/g, " $1")}
                    </h2>
                  </div>

                  {(tasks as any[]).map((task, index) => (
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
                            {/* Options button */}
                            <div className="relative group">
                              <button className="p-1 rounded hover:bg-gray-200 text-black">⋮</button>
                              <div className="absolute right-0 mt-2 w-36 bg-black text-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                                <button className="block w-full px-3 py-2 text-left hover:bg-gray-800">
                                  Option 1
                                </button>
                                <button className="block w-full px-3 py-2 text-left hover:bg-gray-800">
                                  Option 2
                                </button>
                                <button className="block w-full px-3 py-2 text-left hover:bg-gray-800">
                                  Option 3
                                </button>
                              </div>
                            </div>

                            {/* Trash button */}
                            <button
                              onClick={() => setDeleteTarget({ columnId, cardId: task.id })}
                              className="p-1 rounded hover:bg-red-100 text-red-600"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          <h3 className="text-md font-semibold text-black mb-1">{task.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{task.location}</p>

                          {/* Bottom buttons */}
                          <div className="flex justify-between mt-2">
                            <button
                              className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                              onClick={() => router.push("/project-board")}
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
            <p className="text-sm text-gray-700 mb-6">Are you sure you want to delete this card?</p>
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
  );
}
