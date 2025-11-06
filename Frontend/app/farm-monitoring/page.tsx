"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from "recharts";

export default function FarmMonitoringPage() {
  const cropHealthData = [
    { week: "Week 1", NDVI: 0.25, EVI: 0.32 },
    { week: "Week 2", NDVI: 0.50, EVI: 0.64 },
    { week: "Week 3", NDVI: 0.80, EVI: 1.11 },
    { week: "Week 4", NDVI: 0.74, EVI: 0.62 },
  ];

  const irrigationData = [
    { field: "North Field", moisture: 65, irrigation: 70 },
    { field: "South Plot", moisture: 55, irrigation: 60 },
    { field: "East Orchard", moisture: 80, irrigation: 75 },
    { field: "West Field", moisture: 45, irrigation: 55 },
  ];

  const alerts = [
    {
      id: 1,
      title: "Low Moisture Detected in South Plot",
      message: "Irrigation levels dropped by 15%. Schedule watering soon.",
      type: "warning",
    },
    {
      id: 2,
      title: "Optimal Growth Detected",
      message: "NDVI readings show excellent vegetation growth in East Orchard.",
      type: "success",
    },
    {
      id: 3,
      title: "Soil pH Slightly Acidic",
      message: "West Field pH measured at 5.8. Consider lime treatment.",
      type: "info",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-16 p-6 bg-gray-50">
        {/* Section 1: Overview */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">
            Farm Monitoring Dashboard
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Stay informed with real-time data on your crops, soil, and weather.
            This dashboard provides you with key insights to make smarter
            agricultural decisions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Active Fields
              </h3>
              <p className="text-2xl font-bold text-blue-700 mt-2">4</p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Avg. Soil Moisture
              </h3>
              <p className="text-2xl font-bold text-green-600 mt-2">61%</p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Avg. Crop Health Index
              </h3>
              <p className="text-2xl font-bold text-yellow-600 mt-2">0.72</p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Current Alerts
              </h3>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {alerts.length}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Field Map Overview */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">
            Live Field Health Map
          </h2>
          <p className="text-gray-700 mb-6">
            View your fields and monitor vegetation health through satellite
            imagery and NDVI data. The interactive map will allow selecting
            parcels and viewing real-time data (coming soon).
          </p>

          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=60.8721%2C23.885%2C77.8173%2C37.0841&layer=mapnik"
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              title="Farm Map"
            ></iframe>
          </div>
        </section>

        {/* Section 3: Crop Health Indicators */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">
            Crop Health Indicators (NDVI & EVI)
          </h2>
          <p className="text-gray-700 mb-6">
            Track crop growth using satellite vegetation indices to identify
            healthy, stressed, or damaged crops across your fields.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg shadow p-4 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cropHealthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="NDVI"
                  stroke="#28a745"
                  strokeWidth={2}
                  name="NDVI (Crop Health)"
                />
                <Line
                  type="monotone"
                  dataKey="EVI"
                  stroke="#0077b6"
                  strokeWidth={2}
                  name="EVI (Vegetation Index)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

       {/* Section 4: Soil Moisture, Irrigation & Nutrient Efficiency */}
<section className="mb-16">
  <h2 className="text-2xl font-semibold text-blue-700 mb-3">
    Soil Moisture, Irrigation & Nutrient Efficiency
  </h2>
  <p className="text-gray-700 mb-6">
    Compare water management and nutrient efficiency across fields to optimize
    irrigation, fertilizer use, and overall soil health.
  </p>

  <div className="bg-white border border-gray-200 rounded-lg shadow p-4 h-[420px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={[
          { field: "North Field", moisture: 65, irrigation: 70, fertilizer: 85, drainage: 60 },
          { field: "South Plot", moisture: 55, irrigation: 60, fertilizer: 75, drainage: 50 },
          { field: "East Orchard", moisture: 80, irrigation: 75, fertilizer: 90, drainage: 78 },
          { field: "West Field", moisture: 45, irrigation: 55, fertilizer: 68, drainage: 65 },
          { field: "Central Green", moisture: 72, irrigation: 78, fertilizer: 82, drainage: 70 },
          { field: "Hilltop Zone", moisture: 60, irrigation: 65, fertilizer: 77, drainage: 62 },
        ]}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="field" />
        <YAxis />
        <Tooltip
          contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px solid #ddd" }}
        />
        <Legend />
        <Bar dataKey="moisture" fill="#0077b6" name="Moisture (%)" barSize={35} />
        <Bar dataKey="irrigation" fill="#00b300" name="Irrigation Efficiency (%)" barSize={35} />
        <Bar dataKey="fertilizer" fill="#f59e0b" name="Fertilizer Usage (%)" barSize={35} />
        <Bar dataKey="drainage" fill="#9333ea" name="Drainage Efficiency (%)" barSize={35} />
      </BarChart>
    </ResponsiveContainer>
  </div>
</section>

        {/* Section 5: Alerts & Recommendations */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">
            Alerts & Recommendations
          </h2>
          <p className="text-gray-700 mb-6">
            Stay proactive with real-time system alerts and actionable
            recommendations based on field data and environmental factors.
          </p>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`border-l-4 p-4 rounded shadow-sm ${
                  alert.type === "warning"
                    ? "border-yellow-500 bg-yellow-50"
                    : alert.type === "success"
                    ? "border-green-500 bg-green-50"
                    : "border-blue-500 bg-blue-50"
                }`}
              >
                <h4 className="font-semibold text-gray-800">{alert.title}</h4>
                <p className="text-gray-600">{alert.message}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
