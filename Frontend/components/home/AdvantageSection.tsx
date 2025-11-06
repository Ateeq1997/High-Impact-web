import React from "react";

const AdvantageSection: React.FC = () => {
  return (
    <section className="py-20 bg-white text-center px-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">
        Why Choose Our Platform?
      </h2>
      <p className="text-gray-700 max-w-3xl mx-auto mb-8 text-lg">
        Traditional real estate analysis is slow and fragmented. Our AI platform
        adapts, learns, and delivers actionable insights — in minutes, not weeks.
      </p>
      <ul className="max-w-3xl mx-auto text-left text-gray-700 space-y-4">
        <li>✔ Manual workflows take weeks → Our platform delivers results in minutes.</li>
        <li>✔ Static tools are limited → Our AI adapts and learns with every use.</li>
        <li>✔ Time = money → Shorter deal cycles, lower costs, and better confidence.</li>
      </ul>
    </section>
  );
};

export default AdvantageSection;
