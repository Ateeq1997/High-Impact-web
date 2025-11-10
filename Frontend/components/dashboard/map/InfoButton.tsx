"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

interface InfoButtonProps {
  selectedPlot: { name: string; area: string; coordinates: [number, number][] } | null;
}

const infoSections = [
  {
    title: "General Info",
    content: "This section contains general information about the selected plot.",
  },
  {
    title: "Ownership Details",
    content: "Information about the owner and related documents.",
  },
  {
    title: "Location Details",
    content: "Exact coordinates and nearby landmarks of this plot.",
  },
  {
    title: "Development Plans",
    content: "Upcoming construction or land development plans for this area.",
  },
  {
    title: "Additional Notes",
    content: "Any extra notes or comments related to this plot.",
  },
];

export default function InfoButton({ selectedPlot }: InfoButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [openSection, setOpenSection] = useState(0); // First one open by default

  return (
    <div className="relative">
      {/* Info button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 bg-white text-black px-3 py-2 rounded shadow-md hover:bg-gray-100 transition"
      >
        <Info className="w-5 h-5" />
        <span>Info</span>
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-12 left-0 bg-white text-black shadow-lg rounded-md w-72 z-50 p-3"
          >
            {selectedPlot ? (
              <>
                <h3 className="font-semibold mb-2">
                  {selectedPlot.name} ({selectedPlot.area})
                </h3>

                <div className="space-y-2">
                  {infoSections.map((section, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded overflow-hidden"
                    >
                      <button
                        className="w-full text-left px-3 py-2 font-medium bg-gray-50 hover:bg-gray-100"
                        onClick={() =>
                          setOpenSection(openSection === index ? -1 : index)
                        }
                      >
                        {section.title}
                      </button>
                      <AnimatePresence>
                        {openSection === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-3 py-2 text-sm bg-white border-t border-gray-100"
                          >
                            {section.content}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-600">
                Select a plot to view information.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
