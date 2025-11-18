"use client";

import InfoButton from "./InfoButton";
import ProjectsButton from "./ProjectsButton";
import InfoPanel from "./InfoPanel";
import { useState } from "react";

interface InfoProjectsPanelProps {
  selectedPlot: any;
}

export default function InfoProjectsPanel({ selectedPlot }: InfoProjectsPanelProps) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="absolute top-4 left-20 flex flex-col gap-3 z-50">
      {/* BUTTONS */}
      <div className="flex gap-3 relative">
        <InfoButton
          onClick={() => selectedPlot && setShowInfo(!showInfo)}
        />
        <ProjectsButton />
      </div>

      {/* INFO PANEL DISPLAYED TO THE RIGHT */}
      {selectedPlot && showInfo && (
        <div className="absolute top-5 left-full ml-40">
          <InfoPanel selectedPlot={selectedPlot} />
        </div>
      )}
    </div>
  );
}
