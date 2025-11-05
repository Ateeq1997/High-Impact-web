import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center mt-16">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Sign Up
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none 
                focus:ring-2 focus:ring-blue-600 text-gray-800 placeholder-gray-400 bg-white"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none 
                focus:ring-2 focus:ring-blue-600 text-gray-800 placeholder-gray-400 bg-white"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none 
                focus:ring-2 focus:ring-blue-600 text-gray-800 placeholder-gray-400 bg-white"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Role</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none 
                focus:ring-2 focus:ring-blue-600 text-gray-800 bg-white"
              >
                <option value="farmer">Farmer</option>
                <option value="developer">Developer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-gray-600 text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
