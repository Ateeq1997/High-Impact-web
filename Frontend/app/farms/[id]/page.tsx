"use client";

import { useParams } from "next/navigation";

const farmsData = [
  { id: 1, name: "Green Valley Farms", address: "Sector A, Mardan", farms: 5, workers: 20 },
  { id: 2, name: "Blue Heights Agriculture", address: "Sector B, Peshawar", farms: 3, workers: 15 },
  { id: 3, name: "Sunrise Villas Farms", address: "Sector C, Swat", farms: 4, workers: 12 },
  { id: 4, name: "Dream Gardens Group", address: "Sector D, Charsadda", farms: 6, workers: 25 },
  { id: 5, name: "Mountain View Operators", address: "Sector E, Nowshera", farms: 2, workers: 10 },
  { id: 6, name: "Golden Fields", address: "Sector F, Mardan", farms: 3, workers: 14 },
  { id: 7, name: "River Side Farms", address: "Sector G, Swat", farms: 5, workers: 18 },
  { id: 8, name: "Sunny Acres", address: "Sector H, Peshawar", farms: 4, workers: 16 },
  { id: 9, name: "Harvest Hub", address: "Sector I, Charsadda", farms: 6, workers: 22 },
  { id: 10, name: "Farmers Alliance", address: "Sector J, Nowshera", farms: 3, workers: 12 },
  { id: 11, name: "Green Valley Farms1", address: "Sector K, Mardan", farms: 15, workers: 30 },
  { id: 12, name: "Blue Heights Agriculture1", address: "Sector L, Peshawar", farms: 13, workers: 35 },
  { id: 13, name: "Sunrise Villas Farms1", address: "Sector M, Swat", farms: 14, workers: 32 },
  { id: 14, name: "Dream Gardens Group1", address: "Sector N, Charsadda", farms: 16, workers: 35 },
  { id: 15, name: "Mountain View Operators1", address: "Sector O, Nowshera", farms: 12, workers: 30 },
  { id: 16, name: "Golden Fields1", address: "Sector P, Mardan", farms: 13, workers: 34 },
  { id: 17, name: "River Side Farms1", address: "Sector Q, Swat", farms: 15, workers: 38 },
  { id: 18, name: "Sunny Acres1", address: "Sector R, Peshawar", farms: 14, workers: 36 },
  { id: 19, name: "Harvest Hub1", address: "Sector S, Charsadda", farms: 16, workers: 32 },
  { id: 20, name: "Farmers Alliance1", address: "Sector T, Nowshera", farms: 13, workers: 32 },
];

export default function FarmDetailsPage() {
  const params = useParams();
  const farmId = Number(params.id);

  const farm = farmsData.find(f => f.id === farmId);

  if (!farm) return <p className="p-8 text-black">Farm not found</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-50 py-20">
      <h1 className="text-3xl font-bold text-black mb-4">{farm.name}</h1>
      <p className="text-black"><strong>Address:</strong> {farm.address}</p>
      <p className="text-black"><strong>Number of Farms:</strong> {farm.farms}</p>
      <p className="text-black"><strong>Number of Workers:</strong> {farm.workers}</p>
    </div>
  );
}
