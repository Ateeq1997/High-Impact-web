"use client";

import { useState } from "react";
import { FolderKanban } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsButton() {
  const [showProjects, setShowProjects] = useState(false);

  const projects = [
    { id: 1, name: "Green Valley Phase 1", location: "Sector A" },
    { id: 2, name: "Blue Heights", location: "Sector B" },
    { id: 3, name: "Sunrise Villas", location: "Sector C" },
    { id: 4, name: "Dream Gardens", location: "Sector D" },
  ];

  return (
    <div className="relative">
      {/* Projects Button */}
      <button
        onClick={() => setShowProjects(!showProjects)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow font-semibold text-gray-700 hover:bg-black hover:text-blue-500 transition ${
          showProjects ? "border-2 border-blue-600" : ""
        }`}
        aria-label="Projects"
      >
        <FolderKanban className="w-5 h-5" />
        <span>Projects</span>
      </button>

      {/* Projects Panel */}
      <AnimatePresence>
        {showProjects && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 left-0 bg-white shadow-lg p-4 rounded-lg w-80 border border-gray-200 z-50"
          >
            <h3 className="text-lg font-bold text-blue-700 mb-3">
              Available Projects
            </h3>

            {/* Project Cards */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-gray-200 rounded-lg p-3 bg-gray-50 hover:shadow transition"
                >
                  <h4 className="font-semibold text-gray-800">
                    {project.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {project.location}
                  </p>

                  <div className="flex justify-between">
                    <button className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
                      Open
                    </button>
                    <button className="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                      Show in Map
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Projects Board Button */}
            <div className="mt-4 text-center">
              <button className="w-full px-4 py-2 bg-black text-white font-semibold rounded hover:bg-blue-600 transition">
                Projects Board
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
