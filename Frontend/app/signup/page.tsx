"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";

export default function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "farmer",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const SIGNUP_MUTATION = `
      mutation Register($username: String!, $email: String!, $password: String!, $role: String!) {
        registerUser(input: {
          username: $username,
          email: $email,
          password: $password,
          role: $role
        }) {
          id
          email
          username
        }
      }
    `;

    try {
      const res = await fetch("https://vickey-uncataloged-elsa.ngrok-free.dev/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: SIGNUP_MUTATION,
          variables: form,
        }),
      });

      const data = await res.json();

      if (data.errors) {
        setError(data.errors[0].message);
      } else {
        alert("Account created successfully!");
      }
    } catch (err) {
      setError("Network error — backend may be offline");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <input name="username" placeholder="Full Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

      <select name="role" onChange={handleChange}>
        <option value="farmer">Farmer</option>
        <option value="developer">Developer</option>
        <option value="admin">Admin</option>
      </select>

      <button disabled={loading}>
        {loading ? "Creating account..." : "Sign Up"}
      </button>

      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
