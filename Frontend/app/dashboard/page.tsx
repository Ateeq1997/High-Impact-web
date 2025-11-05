"use client";

import CardPlaceholder from "@/components/home/CardPlaceholder";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { BarChart, Bar } from "recharts";
import { CheckCircle, AlertTriangle, MessageSquare, Package, TrendingUp, User } from "lucide-react";
import InteractiveMapPreview from "@/components/home/InteractiveMapPreview";

export default function DashboardPage() {
  const salesData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 },
    { name: "Jun", value: 700 },
  ];

  const pieData = [
    { name: "Fruits", value: 40 },
    { name: "Vegetables", value: 25 },
    { name: "Grains", value: 20 },
    { name: "Others", value: 15 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  const farmData = [
    { name: "Green Valley", yield: 80 },
    { name: "Sunshine Farm", yield: 95 },
    { name: "Riverdale", yield: 70 },
    { name: "Hilltop", yield: 88 },
  ];

 const tasks = [
  { title: "Update farm data", status: "Completed" },
  { title: "Check soil moisture", status: "Pending" },
  { title: "Review new applications", status: "In Progress" },
  { title: "Send monthly report", status: "Completed" },
];

  const feedback = [
    { name: "Ali Khan", comment: "The dashboard is super easy to use!", rating: 5 },
    { name: "Sara Malik", comment: "Loving the new chart features!", rating: 4 },
    { name: "Ahmed Raza", comment: "Would like to see dark mode soon!", rating: 4 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Dashboard Header */}
        <div>
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">
            Welcome back! Here’s your performance summary and recent updates.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <CardPlaceholder title="Total Parcels" description="1,245 Delivered" />
          <CardPlaceholder title="Active Farms" description="87 Active" />
          <CardPlaceholder title="Revenue" description="$12,430 This Month" />
          <CardPlaceholder title="New Messages" description="14 Unread" />
        </div>

        {/* Charts Section */}
        <section className="grid md:grid-cols-2 gap-10">
          {/* Line Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Monthly Parcel Activity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} />
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Crop Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Performance Summary */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Performance Summary</h2>
          <p className="text-gray-600 mb-3">
            Your productivity and system performance metrics for the current month:
          </p>
          <ul className="grid md:grid-cols-3 gap-6">
            <li className="flex items-center gap-3">
              <TrendingUp className="text-green-600 w-6 h-6" />
              <span className="text-gray-800">Delivery success rate: <strong>96%</strong></span>
            </li>
            <li className="flex items-center gap-3">
              <Package className="text-blue-600 w-6 h-6" />
              <span className="text-gray-800">Average parcels/day: <strong>208</strong></span>
            </li>
            <li className="flex items-center gap-3">
              <User className="text-purple-600 w-6 h-6" />
              <span className="text-gray-800">Active users: <strong>1,024</strong></span>
            </li>
          </ul>
        </section>

        {/* Top Performing Farms */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Top Performing Farms</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={farmData}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="yield" fill="#10b981" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Recent Activity */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Recent Activity</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-800">
                <Package className="text-blue-500 w-5 h-5" />
                <span>Parcel #124 Delivered</span>
              </div>
              <span className="text-gray-500 text-sm">2 hours ago</span>
            </li>
            <li className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-800">
                <MessageSquare className="text-green-500 w-5 h-5" />
                <span>New message from client</span>
              </div>
              <span className="text-gray-500 text-sm">5 hours ago</span>
            </li>
            <li className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-800">
                <TrendingUp className="text-yellow-500 w-5 h-5" />
                <span>Farm “Green Valley” added</span>
              </div>
              <span className="text-gray-500 text-sm">1 day ago</span>
            </li>
            <li className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-800">
                <AlertTriangle className="text-red-500 w-5 h-5" />
                <span>System alert: performance drop</span>
              </div>
              <span className="text-gray-500 text-sm">3 days ago</span>
            </li>
          </ul>
        </section>

        {/* Feedback & Tasks */}
        <section className="grid md:grid-cols-2 gap-8">
          {/* Feedback */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">User Feedback</h2>
            <ul className="space-y-4">
              {feedback.map((f, i) => (
                <li key={i} className="border-b pb-3">
                  <p className="font-semibold text-gray-800">{f.name}</p>
                  <p className="text-gray-600">{f.comment}</p>
                  <p className="text-yellow-500 mt-1">⭐ {f.rating}/5</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
  <h2 className="text-xl font-semibold text-blue-700 mb-4">Tasks Overview</h2>

  <ul className="space-y-4">
    {tasks.map((task, index) => (
      <li
        key={index}
        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-blue-50 transition"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-800">{task.title}</span>
        </div>

        <div className="flex items-center gap-2">
          {task.status === "Completed" && (
            <span className="text-green-600 font-medium flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Completed
            </span>
          )}
          {task.status === "Pending" && (
            <span className="text-yellow-600 font-medium flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" /> Pending
            </span>
          )}
          {task.status === "In Progress" && (
            <span className="text-blue-600 font-medium flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> In Progress
            </span>
          )}
        </div>
      </li>
    ))}
  </ul>
</div>
        </section>
        <InteractiveMapPreview />
      </main>

    </div>
  );
}
