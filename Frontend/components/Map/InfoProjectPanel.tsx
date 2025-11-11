"use client";

import InfoButton from "./InfoButton";
import ProjectsButton from "./ProjectsButton";

interface InfoProjectsPanelProps {
  selectedPlot: { name: string; area: string; coordinates: [number, number][] } | null;
}

export default function InfoProjectsPanel({ selectedPlot }: InfoProjectsPanelProps) {
  return (
    <div className="absolute top-4 left-4 flex gap-3 z-50">
      <InfoButton selectedPlot={selectedPlot} />
      <ProjectsButton />
    </div>
  );
}
