import React from "react";

const TimeCostComparison: React.FC = () => {
  const data = [
    { label: "Manual Process", time: 100, cost: 100 },
    { label: "Typical SaaS", time: 60, cost: 70 },
    { label: "Our Platform (AI)", time: 20, cost: 30 },
  ];

  return (
    <section className="bg-gray-50 py-20 px-6 text-center">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">
        Time & Cost Comparison
      </h2>
      <p className="text-gray-700 max-w-3xl mx-auto mb-12">
        Experience a dramatic reduction in project time and cost using our
        AI-driven automation. See how we outperform traditional methods.
      </p>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Time Comparison */}
        <div>
          <h3 className="text-xl font-semibold text-blue-700 mb-6">Time (hours)</h3>
          {data.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between text-sm text-gray-700 mb-1">
                <span>{item.label}</span>
                <span>{item.time} hrs</span>
              </div>
              <div className="bg-gray-200 h-3 rounded-full">
                <div
                  className={`bg-blue-700 h-3 rounded-full`}
                  style={{ width: `${item.time}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Cost Comparison */}
        <div>
          <h3 className="text-xl font-semibold text-blue-700 mb-6">Cost (USD)</h3>
          {data.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between text-sm text-gray-700 mb-1">
                <span>{item.label}</span>
                <span>${item.cost * 10}</span>
              </div>
              <div className="bg-gray-200 h-3 rounded-full">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: `${item.cost}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimeCostComparison;
