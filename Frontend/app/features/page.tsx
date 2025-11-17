"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* Header Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">
            Powerful Features for Smarter Farming
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Designed for landowners, farmers, investors, and agricultural
            professionals — our platform transforms raw land data into
            meaningful insights using maps, analytics, and AI automation.
          </p>
        </section>

        {/* Feature Section 1 – Smart Farm Mapping */}
        <FeatureSection
          title="Smart Farm Mapping"
          description="Explore fields with high-precision geospatial tools. Draw farm boundaries, view NDVI layers, and upload your own parcel data."
          media={
   <Image
  src="/images/a1.jpg"
  alt="Map Preview"
  width={500}
  height={500}
  className="w-full h-full object-cover"
/>

          }
          items={[
            "Polygon drawing tools",
            "Interactive MapLibre-based map",
            "GeoJSON & KML import/export",
            "High-accuracy parcel visualization",
          ]}
        />

        {/* Feature Section 2 – Parcel Insights */}
        <FeatureSection
          title="Parcel Insights & Analytics"
          description="Get instant insights about your land: soil quality, crop suitability, weather forecasts, and vegetation health trends."
          media={
 <Image
  src="/images/a2.jpg"
  alt="Map Preview"
  width={500}
  height={500}
  className="w-full h-full object-cover"
/>

          }
          items={[
            "NDVI vegetation index",
            "Soil type & texture data",
            "Yield potential scoring",
            "Weather (rainfall, temperature, humidity)",
          ]}
        />

        {/* Feature Section – Soil Table */}
    <section>
  <Card className="shadow border">
    <CardContent className="p-8 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Soil Profile Example</h2>
      <p className="text-gray-600">
        Real-time soil classification enriched from our geospatial datasets.
      </p>

      <table className="w-full border-collapse bg-white shadow text-black">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border text-left">Soil Type</th>
            <th className="p-3 border text-left">pH</th>
            <th className="p-3 border text-left">Organic Matter</th>
            <th className="p-3 border text-left">Suitability</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border">Loam</td>
            <td className="p-3 border">6.5</td>
            <td className="p-3 border">2.1%</td>
            <td className="p-3 border text-green-600 font-semibold">High</td>
          </tr>
          <tr>
            <td className="p-3 border">Clay Loam</td>
            <td className="p-3 border">7.1</td>
            <td className="p-3 border">1.8%</td>
            <td className="p-3 border text-yellow-600 font-semibold">Medium</td>
          </tr>
        </tbody>
      </table>
    </CardContent>
  </Card>
</section>


        {/* Feature Section 3 – AI Assistant */}
        <FeatureSection
          title="AI Farming Assistant"
          description="Your personal farm expert — helping you choose crops, diagnose issues, and understand your land in English, Urdu, and Punjabi."
          media={
          <Image
  src="/images/a3.jpg"
  alt="Map Preview"
  width={500}
  height={500}
  className="w-full h-full object-cover"
/>

          }
          items={[
            "Local language support",
            "Crop recommendations",
            "Farm management suggestions",
            "Interactive map-based questions",
          ]}
        />

        {/* Feature Section 4 – User Dashboard */}
        <FeatureSection
          title="Intelligent User Dashboard"
          description="A simple and clean interface allowing users to manage farms, projects, subscriptions, and insights — all in one place."
          media={
           <Image
  src="/images/a4.jpg"
  alt="Map Preview"
  width={500}
  height={500}
  className="w-full h-full object-cover"
/>

          }
          items={[
            "My Parcels list",
            "Insights & analytics panel",
            "Account profile + settings",
            "Notifications & updates",
          ]}
        />

        {/* Feature Section 5 – Packages */}
        <FeatureSection
          title="Premium Subscription Packages"
          description="Advanced analytics, unlimited parcels, historic NDVI layers, and professional farmer support — perfect for landowners and agriculture businesses."
          media={
           <Image
  src="/images/a5.jpg"
  alt="Map Preview"
  width={500}
  height={500}
  className="w-full h-full object-cover"
/>

          }
          items={[
            "Starter: Basic map + parcel saving",
            "Pro: NDVI, soil data, weather insights",
            "Enterprise: Unlimited parcels + advanced geospatial layers",
          ]}
        />
      </div>
    </div>
  );
}

type FeatureSectionProps = {
  title: string;
  description: string;
  items: string[];
  media?: React.ReactNode;
};

function FeatureSection({ title, description, items, media }: FeatureSectionProps) {
  return (
    <section>
      <Card className="shadow-md border border-gray-200">
        <CardContent className="p-8">
          {/* Flex Layout: Left text / Right image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* LEFT SIDE – TEXT */}
            <div className="space-y-5">
              <h2 className="text-3xl font-semibold text-gray-800">{title}</h2>
              <p className="text-gray-600 text-lg">{description}</p>

              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {items.map((item, index) => (
                  <li key={index} className="text-base">{item}</li>
                ))}
              </ul>
            </div>

            {/* RIGHT SIDE – IMAGE */}
            {media && (
              <div className="flex justify-center">
                <div className="w-[500px] h-[500px] rounded-xl overflow-hidden shadow-lg">
                  {media}
                </div>
              </div>
            )}

          </div>
        </CardContent>
      </Card>
    </section>
  );
}

