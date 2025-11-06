import React from "react";

const plans = [
  {
    name: "Freemium",
    price: "Free",
    description:
      "Perfect for individuals exploring AI-driven real estate insights.",
    features: [
      "Basic property search",
      "Limited analytics tools",
      "Community support",
      "1 user only",
    ],
    buttonText: "Start for Free",
  },
  {
    name: "Pro",
    price: "$79 / month",
    description:
      "For professionals and small teams optimizing investment workflows.",
    features: [
      "Advanced analytics dashboard",
      "Custom catchment areas",
      "Full AI property evaluator",
      "Priority email support",
      "Up to 5 users",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description:
      "Tailored AI tools for large organizations and property operators.",
    features: [
      "Unlimited data access",
      "API integrations",
      "Dedicated account manager",
      "On-premise or private cloud setup",
      "Unlimited users",
    ],
    buttonText: "Contact Sales",
  },
];

const PricingPlans: React.FC = () => {
  return (
    <section className="py-20 bg-white text-center px-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">
        Choose Your Plan
      </h2>
      <p className="text-gray-700 max-w-3xl mx-auto mb-12">
        Flexible pricing for every level of real estate professional — from
        curious individuals to enterprise-scale operators.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`p-8 rounded-2xl shadow-lg hover:shadow-2xl transition border ${
              index === 1
                ? "border-blue-700 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <h3 className="text-2xl font-semibold text-blue-700 mb-2">
              {plan.name}
            </h3>

            {/* ✅ Ensure price text is visible */}
            <p
              className={`text-3xl font-bold mb-4 ${
                index === 1 ? "text-blue-800" : "text-blue-700"
              }`}
            >
              {plan.price}
            </p>

            <p className="text-gray-700 mb-6">{plan.description}</p>

            <ul className="text-left text-gray-700 space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className={`block px-6 py-3 rounded font-semibold transition ${
                index === 1
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-gray-100 text-blue-700 hover:bg-gray-200"
              }`}
            >
              {plan.buttonText}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingPlans;
