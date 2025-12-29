"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, Mail, Shield, Calendar, CheckCircle, XCircle, Loader2 } from "lucide-react";
import AdminDashHeader from "@/components/dashboard/AdminDashHeader";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function AlphaUserPage() {
  const router = useRouter();

  const [role, setRole] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const logout = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
  };

  useEffect(() => {
    const stored = localStorage.getItem("authUser");

    if (!stored) {
      router.push("/login");
      return;
    }

    const parsed = JSON.parse(stored);
    setRole(parsed.role);

    const apiUrl = `http://localhost:8080/account/me?email=${encodeURIComponent(parsed.email)}`;

    fetch(apiUrl)
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
        return res.json();
      })
      .then(data => {
        setUser(data);
        setError("");
      })
      .catch(err => {
        console.error("Account fetch error:", err.message);
        setError(`Failed to load account information`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  // Format date nicely
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  return (
    <>
      {/* Conditional Header based on role */}
      {role.toLowerCase() === "admin" ? <AdminDashHeader /> : <DashboardHeader />}

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Account Settings
            </h1>
            <p className="text-gray-600">
              View and manage your account information
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white shadow-lg rounded-xl p-12 flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600 text-lg">Loading account information...</p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="w-6 h-6 text-red-600" />
                <p className="text-red-800 font-medium">{error}</p>
              </div>
              <div className="text-sm text-red-700 space-y-1">
                <p>• Check if Go server is running on port 8080</p>
                <p>• Try logging out and logging in again</p>
                <p>• Contact support if the issue persists</p>
              </div>
            </div>
          )}

          {/* Account Information */}
          {!loading && user && !error && (
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
              {/* Profile Header */}
              <div className={`bg-gradient-to-r p-8 text-white ${
                user.role.toLowerCase() === 'admin' 
                  ? 'from-purple-600 to-purple-700' 
                  : 'from-green-600 to-green-700'
              }`}>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">{user.username}</h2>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.role.toLowerCase() === 'admin' 
                          ? 'bg-purple-500/30 text-white' 
                          : 'bg-green-500/30 text-white'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                      {user.status ? (
                        <span className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-3 py-1 bg-red-500/30 rounded-full text-sm">
                          <XCircle className="w-4 h-4" />
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  Account Details
                </h3>
                
                <div className="space-y-4">
                  {/* Account ID */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 mb-1">Account ID</p>
                      <p className="text-lg font-semibold text-gray-800">#{user.id}</p>
                    </div>
                  </div>

                  {/* Username */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 mb-1">Username</p>
                      <p className="text-lg font-semibold text-gray-800">{user.username}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 mb-1">Email Address</p>
                      <p className="text-lg font-semibold text-gray-800">{user.email}</p>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 mb-1">Account Type</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </p>
                    </div>
                  </div>

                  {/* Member Since */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 mb-1">Member Since</p>
                      <p className="text-lg font-semibold text-gray-800">{formatDate(user.joined)}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      user.status ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {user.status ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 mb-1">Account Status</p>
                      <p className={`text-lg font-semibold ${
                        user.status ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {user.status ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <div className="px-8 pb-8">
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}