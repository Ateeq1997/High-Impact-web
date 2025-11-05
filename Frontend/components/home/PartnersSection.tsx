// components/home/PartnersSection.tsx (clean working version)
import React from "react";
import {
  FaLeaf,
  FaTractor,
  FaGlobe,
  FaUniversity,
  FaHandshake,
} from "react-icons/fa";

const partners = [
  { name: "Pakistan Agri Research", href: "#", Icon: FaUniversity },
  { name: "OpenStreetMap", href: "#", Icon: FaGlobe },
  { name: "AgriTech Solutions", href: "#", Icon: FaHandshake },
  { name: "FieldWorks", href: "#", Icon: FaTractor },
  { name: "GreenGrow Labs", href: "#", Icon: FaLeaf },
];

const PartnersSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Our Partners
        </h2>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          We collaborate with research institutions, mapping platforms, and
          agri-tech partners to bring reliable insights and mapping tools to
          farmers and developers across Pakistan.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-items-center">
          {partners.map((p, i) => {
            const Icon = p.Icon;
            return (
              <a
                key={i}
                href={p.href}
                className="w-full max-w-[180px] flex flex-col items-center gap-3 p-4 transition transform hover:-translate-y-1 hover:shadow-lg rounded-lg"
                aria-label={`Partner: ${p.name}`}
                rel="noopener noreferrer"
              >
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 shadow-sm">
                  <Icon className="text-2xl" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-800">{p.name}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
