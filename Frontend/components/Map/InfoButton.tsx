"use client";

import { Info } from "lucide-react";

export default function InfoButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-white text-black px-3 py-2 rounded shadow-md hover:bg-gray-100 transition"
    >
      <Info className="w-5 h-5" />
      <span>Info</span>
    </button>
  );
}
