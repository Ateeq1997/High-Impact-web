"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  UsersRound,
  LandPlot,
  FolderKanban,
  Map,
  Layers,
  UserCircle,
} from "lucide-react";

const AdminDashHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
  };

  const navItems = [
    { href: "/usermanagement", label: "User Management", Icon: Users },
    { href: "/farms", label: "Farm Lists", Icon: LandPlot },
    { href: "/groups", label: "Group Lists", Icon: UsersRound },
    { href: "/projects-board", label: "Projects", Icon: FolderKanban },
    { href: "/map", label: "Map", Icon: Map },
    { href: "/datalayers", label: "Data Layers", Icon: Layers },
    { href: "/accounts", label: "Accounts", Icon: UserCircle },
  ];

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          HighImpact
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-3 ml-20 items-center">
          {navItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 text-sm font-medium whitespace-nowrap
                         hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <Icon className="w-6 h-6" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ml-4"
        >
          Logout
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md px-4 pt-2 pb-4 space-y-2">
          {navItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 text-sm font-medium
                         hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <Icon className="w-6 h-6" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default AdminDashHeader;
