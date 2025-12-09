"use client";
import Header from "@/components/layout/Header";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function InsightsAnalyticsPage() {

 // Sample data for charts
  const yieldData = [
    { name: "Jan", yield: 7.5 },
    { name: "Feb", yield: 8.2 },
    { name: "Mar", yield: 2.8 },
    { name: "Apr", yield: 6.9 },
    { name: "May", yield: 1.8 },
  ];
    const debugMessage = "Page loaded successfully!"; // This won't render
  const soilData = [
    {
      name: "Field A",
      moisture: 68,
      nutrients: 75,
      ph: 6.8,
      temperature: 22,
    },
    {
      name: "Field B",
      moisture: 55,
      nutrients: 82,
      ph: 7.2,
      temperature: 25,
    },
    {
      name: "Field C",
      moisture: 72,
      nutrients: 90,
      ph: 6.5,
      temperature: 21,
    },
  ];

//   const weatherData = [
//     { name: "Jan", rainfall: 25, temperature: 18 },
//     { name: "Feb", rainfall: 40, temperature: 20 },
//     { name: "Mar", rainfall: 60, temperature: 24 },
//     { name: "Apr", rainfall: 35, temperature: 28 },
//     { name: "May", rainfall: 20, temperature: 33 },
//   ];

  const cropData = [
    { name: "Wheat", value: 40 },
    { name: "Corn", value: 25 },
    { name: "Rice", value: 20 },
    { name: "Soybean", value: 15 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  const weatherData = [
  { month: "Jan", temperature: 12, rainfall: 45, humidity: 68 },
  { month: "Feb", temperature: 15, rainfall: 50, humidity: 70 },
  { month: "Mar", temperature: 20, rainfall: 55, humidity: 65 },
  { month: "Apr", temperature: 26, rainfall: 35, humidity: 60 },
  { month: "May", temperature: 30, rainfall: 20, humidity: 58 },
  { month: "Jun", temperature: 33, rainfall: 10, humidity: 50 },
  { month: "Jul", temperature: 32, rainfall: 60, humidity: 72 },
  { month: "Aug", temperature: 31, rainfall: 80, humidity: 78 },
  { month: "Sep", temperature: 28, rainfall: 65, humidity: 70 },
  { month: "Oct", temperature: 24, rainfall: 40, humidity: 68 },
  { month: "Nov", temperature: 18, rainfall: 30, humidity: 60 },
  { month: "Dec", temperature: 14, rainfall: 25, humidity: 65 },
];
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="flex-grow mt-16 p-6">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-8">
           {/* 🔹 Temporary div added for GitHub Desktop */}
          <div className="hidden">Random GitHub trigger div</div>
          <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center">
            Insights & Analytics
          </h1>
         {/* Slight text modification */}
          <p className="text-gray-600 text-center mb-8">
            Get in-depth insights into your farm’s performance — from soil
            health to weather trends and crop yields. Make smarter, data-driven
            decisions to maximize productivity. 🚀 {/* added emoji */}
          </p>

          {/* Section 1: Overview Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: "Total Active Parcels",
                value: "14",
                desc: "Monitored through satellite and sensors",
              },
              {
                title: "Average Crop Yield",
                value: "6.8 tons/acre",
                desc: "Based on last harvest season",
              },
              {
                title: "Soil Health Index",
                value: "82%",
                desc: "Calculated from nutrient and moisture data",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="text-blue-700 font-semibold text-lg mb-2">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold text-blue-800 mb-1">
                  {card.value}
                </p>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </div>
            ))}
          </section>

          {/* Section 2: Crop Yield Trends */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">
              Monthly Crop Yield Trends
            </h2>
            <p className="text-gray-700 mb-4">
              Observe how your crop yields have varied over recent months and
              identify the factors that influence growth.
            </p>

            <div className="h-80 bg-gray-50 p-4 rounded-lg shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yieldData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="yield"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Section 3: Enhanced Soil Condition Insights */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">
              Soil Condition Overview
            </h2>
            <p className="text-gray-700 mb-4">
              Analyze soil properties across your fields — from moisture and
              nutrients to pH and temperature — to optimize field management.
            </p>

            <div className="h-96 bg-gray-50 p-4 rounded-lg shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={soilData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="moisture" fill="#3b82f6" name="Moisture %" />
                  <Bar dataKey="nutrients" fill="#10b981" name="Nutrients %" />
                  <Bar dataKey="ph" fill="#f59e0b" name="pH Level" />
                  <Bar dataKey="temperature" fill="#ef4444" name="Temperature °C" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>


          {/* Section 4: Weather & Environmental Data */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">
              Weather & Environmental Data
            </h2>
            <p className="text-gray-700 mb-4">
              Stay updated with rainfall and temperature patterns that affect
              your crop growth. Plan irrigation and harvesting accordingly.
            </p>

            <div className="h-80 bg-gray-50 p-4 rounded-lg shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weatherData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rainfall"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Rainfall (mm)"
                  />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="Temperature (°C)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Section 5: Crop Distribution */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">
              Crop Distribution by Type
            </h2>
            <p className="text-gray-700 mb-4">
              Get an overview of which crops occupy the most area on your farm
              for better diversification strategies.
            </p>

            <div className="flex justify-center items-center h-96 bg-gray-50 p-4 rounded-lg shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cropData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {cropData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Section 6: Recommendations */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">
              AI-Based Recommendations
            </h2>
            <p className="text-gray-700 mb-4">
              Smart analytics engine provides real-time recommendations for
              better decision-making.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                Increase irrigation in <b>Field B</b> by 15% to maintain optimal
                moisture levels.
              </li>
              <li>
                Rotate crops in <b>South Parcel</b> to enhance soil nitrogen.
              </li>
              <li>
                Harvest <b>North Field</b> within 5 days for maximum yield.
              </li>
              <li>
                Apply <b>organic compost</b> to boost nutrient retention in
                loamy areas.
              </li>
            </ul>
          </section>

 {/* Section 8: Water Usage Efficiency */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">
            Water Usage Efficiency
          </h2>
          <p className="text-gray-700 mb-6">
            Optimize irrigation strategies with smart water management analytics.
            Reduce water waste and improve crop quality with data-driven insights.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 border rounded-lg shadow-sm bg-white">
              <h3 className="font-semibold text-gray-800 mb-2">Water Stress Index</h3>
              <p className="text-gray-600 text-sm">
                Identify areas under water stress to prioritize irrigation scheduling.
              </p>
            </div>
            <div className="p-5 border rounded-lg shadow-sm bg-white">
              <h3 className="font-semibold text-gray-800 mb-2">Irrigation Efficiency</h3>
              <p className="text-gray-600 text-sm">
                Track real-time irrigation efficiency metrics and reduce resource waste.
              </p>
            </div>
            <div className="p-5 border rounded-lg shadow-sm bg-white">
              <h3 className="font-semibold text-gray-800 mb-2">Groundwater Monitoring</h3>
              <p className="text-gray-600 text-sm">
                Monitor groundwater levels and usage across multiple fields using
                integrated IoT sensors.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
      <h2 className="text-2xl font-semibold text-blue-700 mb-3">
        Climate & Weather Trends
      </h2>
      <p className="text-gray-700 mb-6">
        Analyze average temperature, rainfall, and humidity trends throughout
        the year. Use this data to plan crop schedules, irrigation, and
        harvesting for better efficiency.
      </p>

      <div className="bg-white border border-gray-200 rounded-lg shadow p-4 h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={weatherData}
            margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              stroke="#ff7300"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Temperature (°C)"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="humidity"
              stroke="#0077b6"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Humidity (%)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="rainfall"
              stroke="#00b300"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Rainfall (mm)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
          {/* Section 7: Export Reports */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">
              Generate Detailed Reports
            </h2>
            <p className="text-gray-700 mb-4">
              Export insights, charts, and analytics in your preferred format.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
                Download PDF Report
              </button>
              <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition">
                Export CSV
              </button>
              <button className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition">
                Schedule Weekly Summary
              </button>
            </div>
          </section>


        </div>
      </main>
    </div>
  );
}
