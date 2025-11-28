"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://localhost:8080/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      // ✅ Show success message from server
      setMessage(data.message || "Reset link sent! Check your email.");
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow flex items-center justify-center mt-16">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Forgot Password
          </h2>

          <p className="text-gray-600 text-sm mb-6 text-center">
            Enter your email address and we will send you a link to reset your password.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800 placeholder-gray-400 bg-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
              Send Reset Link
            </button>
          </form>

          {message && (
            <p className="mt-4 text-green-600 text-sm text-center">{message}</p>
          )}

          {error && (
            <p className="mt-4 text-red-600 text-sm text-center">{error}</p>
          )}

          <p className="mt-4 text-gray-600 text-sm text-center">
            Remembered your password?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Go back to Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
