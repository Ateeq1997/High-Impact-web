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

    try {
      console.log("🔍 STEP 1: Sending login request...");
      console.log("📧 Email:", form.email);

      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      console.log("🔍 STEP 2: Response status:", response.status);

      const data = await response.json();
      console.log("🔍 STEP 3: Response data:", data);
      console.log("📧 Email from response:", data.email);
      console.log("👤 Username from response:", data.username);
      console.log("🎭 Role from response:", data.role);

      if (!response.ok) {
        setError(data.error || "Invalid email or password");
        setLoading(false);
        return;
      }

      // ✅ CRITICAL: Create auth object with ALL fields
      const authUser = {
        email: data.email || form.email, // Fallback to form email if missing
        username: data.username,
        role: data.role
      };

      console.log("🔍 STEP 4: Creating auth object:", authUser);
      console.log("✅ Auth object has email?", !!authUser.email);
      console.log("✅ Auth object has role?", !!authUser.role);
      console.log("✅ Auth object has username?", !!authUser.username);

      // Store in localStorage
      const authUserString = JSON.stringify(authUser);
      console.log("🔍 STEP 5: Stringified auth:", authUserString);

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("authUser", authUserString);

      console.log("🔍 STEP 6: Stored in localStorage");

      // VERIFY storage immediately
      const storedValue = localStorage.getItem("authUser");
      console.log("🔍 STEP 7: Verification - what's in localStorage:", storedValue);

      if (storedValue) {
        const parsed = JSON.parse(storedValue);
        console.log("✅ VERIFICATION PASSED:");
        console.log("   - Email:", parsed.email);
        console.log("   - Username:", parsed.username);
        console.log("   - Role:", parsed.role);
        
        if (!parsed.email) {
          console.error("❌ CRITICAL ERROR: Email not in localStorage!");
          alert("ERROR: Email not stored properly. Check console.");
          setLoading(false);
          return;
        }
      } else {
        console.error("❌ CRITICAL ERROR: Nothing stored in localStorage!");
        alert("ERROR: localStorage not working. Check console.");
        setLoading(false);
        return;
      }

      console.log("🚀 STEP 8: Redirecting...");

      // Role-based redirect
      if (data.role.toLowerCase() === "admin") {
        console.log("➡️ Redirecting to /admindashboard");
        router.push("/admindashboard");
      } else if (data.role.toLowerCase() === "farmer") {
        console.log("➡️ Redirecting to /farmerdashboard");
        router.push("/farmerdashboard");
      } else {
        console.log("⚠️ Unknown role:", data.role);
      }

    } catch (err) {
      console.error("❌ LOGIN ERROR:", err);
      setError("Server error. Try again later.");
    }

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

          <div className="flex justify-between mt-4">
            <button
              onClick={() => router.push("/forgot-password")}
              className="text-blue-600 text-sm hover:underline"
            >
              Forgot Password?
            </button>

            <button
              onClick={() => router.push("/signup")}
              className="text-blue-600 text-sm hover:underline"
            >
              Sign Up
            </button>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center mt-2">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}