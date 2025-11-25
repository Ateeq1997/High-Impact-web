"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    setError("");

    if (!form.email || !form.password) {
      setError("Please provide email and password.");
      return;
    }

    setLoading(true);

    // 🔥 1. Query backend GraphQL API
    const response = await fetch("http://localhost:8080/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            getUserAccountData {
              id
              username
              email
              password
              role
            }
          }
        `,
      }),
    });

    const result = await response.json();

    if (!result.data || !result.data.getUserAccountData) {
      setError("Something went wrong. Try again.");
      setLoading(false);
      return;
    }

    const users = result.data.getUserAccountData;

    // 🔥 2. Match email + password from backend
    const matched = users.find(
      (u: any) =>
        u.email?.toLowerCase() === form.email.toLowerCase() &&
        u.password === form.password
    );

    if (!matched) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    // 🔥 3. Store user data in localStorage
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem(
      "authUser",
      JSON.stringify({
        id: matched.id,
        email: matched.email,
        role: matched.role,
      })
    );

    router.push("/dashboard");
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4">
          Login
        </h2>

        <div className="space-y-3">
          <label className="block text-sm text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
            placeholder="you@example.com"
            required
          />

          <label className="block text-sm text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
            placeholder="*******"
            required
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium disabled:opacity-60"
          >
            {loading ? "Checking..." : "Login"}
          </button>

          {error && (
            <p className="text-red-600 text-sm text-center mt-2">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
