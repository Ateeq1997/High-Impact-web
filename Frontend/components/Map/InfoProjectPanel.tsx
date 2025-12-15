"use client";

import { useState } from "react";
import InfoButton from "./InfoButton";
import ProjectsButton from "./ProjectsButton";

// ----------------------------- types
interface InfoProjectsPanelProps {
  selectedDistrict: {
    district: string;
    division: string;
    province: string;
  } | null;
}

export default function InfoProjectsPanel({
  selectedDistrict,
}: InfoProjectsPanelProps) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="flex flex-col gap-3 relative text-black">
      {/* Buttons */}
      <div className="flex gap-3">
        <InfoButton
          onClick={() =>
            selectedDistrict && setShowInfo((prev) => !prev)
          }
        />
        <ProjectsButton />
      </div>

      {/* Info Panel */}
      {selectedDistrict && showInfo && (
        <div className="absolute top-12 left-0 p-3 w-64 bg-white rounded shadow-md z-50">
          <h3 className="font-bold mb-2">District Info</h3>
          <p>
            <b>District:</b> {selectedDistrict.district}
          </p>
          <p>
            <b>Division:</b> {selectedDistrict.division}
          </p>
          <p>
            <b>Province:</b> {selectedDistrict.province}
          </p>
        </div>
      )}
    </div>
  );
}
