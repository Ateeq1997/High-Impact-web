"use client";
import { useParams } from "next/navigation";

export default function OperatorGroupDetails() {
  const params = useParams();
  const groupId = params.id;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Operator Group Details: {groupId}
      </h1>
      <p>Here you can display detailed information about the farm operator group with all its farms, locations, workers, etc.</p>
    </div>
  );
}
