"use client";
import React from "react";

const plans = [
  {
    name: "Freemium",
    price: "Free",
    description: "A starter plan for basic access to digital farm tools.",
    features: [
      "Basic farm map viewer",
      "Limited parcel insights",
      "Community support",
      "Single user access",
    ],
    buttonText: "Start Free",
  },
  {
    name: "Pro",
    price: "₨ 4,999 / month",
    description:
      "Best for serious farmers needing detailed mapping and insights.",
    features: [
      "Full analytics dashboard",
      "Advanced map tools",
      "NDVI & soil insights",
      "Priority support",
      "Up to 5 users",
    ],
    buttonText: "Upgrade Now",
  },
  {
    name: "Enterprise",
    price: "Contact for Pricing",
    description:
      "For large operations needing custom geospatial setups and unlimited access.",
    features: [
      "Unlimited mapping & analytics",
      "Private cloud or on-premise setup",
      "API access",
      "Dedicated success manager",
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
        Affordable pricing for farmers, agritech teams, and large-scale
        agricultural operators.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="
              group 
              p-8 
              rounded-2xl 
              shadow-lg 
              border border-gray-200 
              bg-white 
              transition 
              duration-300 
              hover:scale-105 
              hover:bg-blue-100 
              hover:shadow-2xl
              flex 
              flex-col
            "
          >
            {/* Title */}
            <h3
              className="
                text-2xl 
                font-semibold 
                mb-2 
                text-black
                group-hover:text-blue-700
              "
            >
              {plan.name}
            </h3>

            {/* Price */}
            <p
              className="
                text-3xl 
                font-bold 
                mb-4 
                text-black
                group-hover:text-blue-700
              "
            >
              {plan.price}
            </p>

            {/* Description */}
            <p className="text-gray-700 group-hover:text-blue-700 mb-6">
              {plan.description}
            </p>

            {/* Features */}
            <ul className="text-left space-y-2 mb-6 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="font-bold text-green-600 group-hover:text-green-600">
                    ✓
                  </span>
                  <span className="text-black group-hover:text-blue-700">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <a
              href="#"
              className="
                block 
                px-6 py-3 
                rounded 
                font-semibold 
                text-white 
                bg-blue-400 
                group-hover:bg-blue-700 
                group-hover:text-white
                transition
              "
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
