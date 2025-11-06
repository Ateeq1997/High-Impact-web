import React from "react";

const useCases = [
  {
    title: "Property Accelerator: Residential & Mixed-Use",
    description:
      "Interactive map, investment scans, and viability modelling — discover listed and off-market opportunities quickly.",
  },
  {
    title: "Pre-Planning & Feasibility Made Simple",
    description:
      "Assess zoning, local plan compliance, heritage & conservation constraints instantly.",
  },
  {
    title: "Portfolio Intelligence Dashboard",
    description:
      "Monitor assets, analyse market trends, and export branded reports for stakeholders.",
  },
  {
    title: "Operator & Buyer Match Engine",
    description:
      "AI matches properties with the right operators or buyers based on criteria and risk appetite.",
  },
];

const UseCases: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold text-blue-700 mb-10">
        Use Cases & Journeys
      </h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {useCases.map((caseItem, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {caseItem.title}
            </h3>
            <p className="text-gray-600">{caseItem.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UseCases;
