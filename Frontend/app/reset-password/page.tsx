"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get("token");
  const router = useRouter();

  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    setMessage("");
    setError("");

    if (newPass !== confirmPass) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword: newPass,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setMessage(data.status || "Password updated successfully");

      // Optional: redirect to login after 3 seconds
      setTimeout(() => router.push("/login"), 3000);
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-black">
      <div className="p-8 shadow rounded bg-white w-full max-w-md">
        <h2 className="text-2xl mb-4 font-bold">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full mb-3"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-2 w-full mb-3"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded mb-3"
          onClick={handleReset}
        >
          Update Password
        </button>

        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
}
