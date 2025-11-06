"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center mt-16">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Login
          </h2>

          {/* --- Social Login Buttons --- */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded py-2 hover:bg-gray-100 transition"
              onClick={() => alert("Google login not yet connected")}
            >
              <FcGoogle size={22} />
              <span className="text-gray-700 font-medium">
                Continue with Google
              </span>
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded py-2 hover:bg-gray-100 transition"
              onClick={() => alert("GitHub login not yet connected")}
            >
              <FaGithub size={22} className="text-gray-800" />
              <span className="text-gray-700 font-medium">
                Continue with GitHub
              </span>
            </button>
          </div>

          {/* --- OR Divider --- */}
          <div className="flex items-center mb-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* --- Email Login Form --- */}
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800 placeholder-gray-400 bg-white"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800 placeholder-gray-400 bg-white"
              />
              <div className="text-right mt-2">
                <Link
                  href="/forgot-password"
                  className="text-blue-600 text-sm hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
              Login with Email
            </button>
          </form>

          <p className="mt-4 text-gray-600 text-sm text-center">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </main>
   
    </div>
  );
}
