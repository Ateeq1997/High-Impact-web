"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Page Header */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">
            Platform Features
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore the tools and technologies that make farm and field
            management easier, smarter, and more efficient.
          </p>
        </section>

        {/* Section 1: Smart Farm Mapping */}
        <FeatureSection
          title="Smart Farm Mapping"
          description="Interact with a powerful map that allows you to draw farm boundaries,
          upload GeoJSON/KML, and view your land with precision."
          items={[
            "Polygon drawing tools",
            "GeoJSON & KML upload",
            "Boundary export",
            "High-accuracy parcel visualization",
          ]}
        />

        {/* Section 2: Parcel Management */}
        <FeatureSection
          title="Parcel Management"
          description="Organize your farms, fields, and projects with a clean and simple workflow."
          items={[
            "Save & manage parcels",
            "Project-based organization",
            "Area calculations",
            "Multi-parcel tracking",
          ]}
        />

        {/* Section 3: Data Layers */}
        <FeatureSection
          title="Advanced Data Layers"
          description="Visualize rich geospatial datasets to make confident farming decisions."
          items={[
            "NDVI vegetation index",
            "Rainfall patterns",
            "Soil classification",
            "Road & canal overlays",
            "Satellite imagery",
          ]}
        />

        {/* Section 4: Crop Insights */}
        <FeatureSection
          title="Crop Insights & Analytics"
          description="Turn raw data into actionable insights with AI-powered analysis."
          items={[
            "Crop suitability analysis",
            "Weather forecasts",
            "Trend analytics",
            "Soil & moisture insights",
          ]}
        />

        {/* Section 5: AI Assistant */}
        <FeatureSection
          title="AI Farming Assistant"
          description="Get expert farming help with an AI chatbot supporting English, Urdu, and Punjabi."
          items={[
            "Local language support",
            "Growing tips",
            "Map assistance",
            "Context-aware chat responses",
          ]}
        />

        {/* Section 6: Dashboard */}
        <FeatureSection
          title="User Dashboard"
          description="Access all your farming tools and insights in one place."
          items={[
            "Quick access to parcels",
            "Insights panel",
            "Account management",
            "Notifications & updates",
          ]}
        />

        {/* Section 7: Premium Features */}
        <FeatureSection
          title="Premium Features"
          description="Unlock advanced analytics and historical farming data."
          items={[
            "Historical NDVI layers",
            "Advanced soil reports",
            "Unlimited parcels",
            "Downloadable PDF reports",
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
};

function FeatureSection({ title, description, items }: FeatureSectionProps) {
  return (
    <section>
      <Card className="shadow-md border border-gray-200">
        <CardContent className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-600">{description}</p>

          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {items.map((item, index) => (
              <li key={index} className="text-base">
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
