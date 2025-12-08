"use client";

import InfoButton from "./InfoButton";
import ProjectsButton from "./ProjectsButton";
import { useState } from "react";

interface InfoProjectsPanelProps {
  selectedPlot: any | null; // plot selected on map
}

export default function InfoProjectsPanel({ selectedPlot }: InfoProjectsPanelProps) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="flex flex-col gap-3 relative text-black">

      {/* BUTTONS */}
      <div className="flex gap-3 relative">
        <InfoButton
          onClick={() => selectedPlot && setShowInfo((prev) => !prev)}
        />
        <ProjectsButton />
      </div>

      {/* INFO PANEL DISPLAYED NEXT TO BUTTONS */}
      {selectedPlot && showInfo && (
        <div className="absolute top-12 left-0 p-3 w-64 bg-white rounded shadow-md z-50">

          <h3 className="font-bold mb-2">Field Details</h3>
          {Object.keys(selectedPlot.tags).length > 0 ? (
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(selectedPlot.tags).map(([key, value]) => (
                  <tr key={key}>
                    <td className="font-bold pr-2">{key}:</td>
                    <td>{value.toString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No OSM tags found for this field.</p>
          )}
        </div>
      )}
    </div>
  );
}
