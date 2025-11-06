import React from "react";

const features = [
  {
    title: "Comprehensive Data & Analytics",
    description:
      "Aggregate demographic, market, and property-level data. Use AI to turn raw data into insights.",
  },
  {
    title: "Custom Geographical Modelling",
    description:
      "Draw your own catchment areas, compare multiple zones, and visualise market conditions.",
  },
  {
    title: "Interactive Map & Visualisation",
    description:
      "Explore zoning layers, flood risks, transport, and 3D views in one interface.",
  },
  {
    title: "Rapid Report Generation",
    description:
      "Generate professional, client-ready reports: pricing, demand/supply, and risk indicators.",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 px-6 text-center">
      <h2 className="text-3xl font-bold text-blue-700 mb-10">Core Features</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
