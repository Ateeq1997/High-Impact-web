const steps = [
  { title: "Select Your Field", description: "Pick the area you want to monitor on the map.", icon: "/icons/map.svg" },
  { title: "Analyze Data", description: "Get insights on crop health, soil, and rainfall trends.", icon: "/icons/analytics.svg" },
  { title: "Plan & Act", description: "Make informed decisions to improve crop yield.", icon: "/icons/plan.svg" },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition">
              <img src={step.icon} alt={step.title} className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-700 mb-2">{step.title}</h3>
              <p className="text-gray-700 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
