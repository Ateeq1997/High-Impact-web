"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation"; // import router

export default function SignupPage() {
  const router = useRouter(); // initialize router

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "farmer",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({})); // in case of non-JSON

      if (res.ok) {
        // Redirect to login page after successful signup
        router.push("/login"); // replace "/login" with your login page route
      } else {
        setError(data.error || data.message || "Failed to create account");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Network error — backend may be offline");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            name="username"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-black"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-black"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-black"
            required
          />

          <select
            name="role"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-black"
          >
            <option value="farmer">Farmer</option>
            <option value="developer">Developer</option>
            <option value="admin">Admin</option>
          </select>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          {error && <p className="text-red-600 text-center text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}
