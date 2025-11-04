"use client";

import React from "react";

interface Testimonial {
  name: string;
  role: string;
  message: string;
}

const testimonials: Testimonial[] = [
  { name: "Ali Khan", role: "Farmer", message: "This platform helped me improve my crop yield significantly!" },
  { name: "Sara Ahmed", role: "Agriculture Analyst", message: "Interactive maps and insights make field planning so much easier." },
  { name: "Muhammad Iqbal", role: "Developer", message: "The data overlays are very detailed and accurate." },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-12">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <p className="text-gray-700 italic mb-4">{t.message}</p>
              <p className="font-semibold text-blue-700">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
