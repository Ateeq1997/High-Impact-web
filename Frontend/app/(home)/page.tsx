"use client";

import Hero from "@/components/home/Hero";
import InfoCard from "@/components/home/InfoCard";
// import Statistics from "@/components/home/Statistics";
import ChartsSection from "@/components/home/ChartsSection";
// import HowItWorks from "@/components/home/HowItWorksSection";
// import Testimonials from "@/components/home/TestimonialSection";
import Partner from "@/components/home/PartnersSection";
import InteractiveMapPreview from "@/components/home/InteractiveMapPreview";
import NewsletterSection from "@/components/home/NewsletterSection";
// import FAQ from "@/components/home/FAQSection";
import CallToAction from "@/components/home/CallToAction";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const cardData = [
  {
    title: "Crop Mapping",
    description:
      "Interactive maps of fields and crop types in Pakistan with real-time updates.",
    image: "/images/pexels-andrew-2859169.jpg",
  },
  {
    title: "Geographic History",
    description:
      "Visualize historical land use and soil types to make better farming decisions.",
    image: "/images/pexels-mirkofabian-12167980.jpg",
  },
  {
    title: "Field Analytics",
    description:
      "Insights on soil, rainfall, NDVI trends, and crop suitability for farmers and developers.",
    image: "/images/pexels-fauxels-3183127.jpg",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />

      {/* Statistics Section */}
      {/* <section className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-12">
            Our Impact in Numbers
          </h2>
          <Statistics />
        </div>
      </section> */}

      {/* Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-blue-700 mb-12 text-center">
          Explore Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardData.map((card, index) => (
            <InfoCard
              key={index}
              title={card.title}
              description={card.description}
              image={card.image}
            />
          ))}
        </div>
      </section>

      {/* How It Works */}
      {/* <HowItWorks /> */}

      {/* Charts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-blue-700 mb-12 text-center">
          Field Analytics
        </h2>
        <ChartsSection />
      </section>

      {/* Map Preview */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-12">
            Explore Fields on the Map
          </h2>
          <InteractiveMapPreview />
        </div>
      </section>

      {/* Testimonials */}
      {/* <Testimonials /> */}

      {/* Partners */}
      <Partner />

      {/* FAQ */}
      {/* <FAQ /> */}

      {/* Call to Action */}
      <CallToAction
        heading="Start Monitoring Your Fields Today"
        description="Sign up and explore interactive maps, crop insights, and historical geographic data."
        buttonText="Get Started"
        buttonLink="/signup"
      />

      {/* Newsletter */}
      <NewsletterSection />

    </div>
  );
}
