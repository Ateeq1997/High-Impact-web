"use client";

import Link from "next/link";
import { useState } from "react";
import { Map, FolderKanban, List, Home, Users, UserCircle } from "lucide-react";

const DashboardHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          HighImpact
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-4 ml-12 items-center">
          {[
            { href: "/map", label: "Map", Icon: Map },
            { href: "/projects-board", label: "Projects", Icon: FolderKanban },
            { href: "/groups", label: "Group Lists", Icon: Users },
            { href: "/farms", label: "Farm Lists", Icon: Home },
            { href: "/accounts", label: "Accounts", Icon: UserCircle },
          ].map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 transition-all duration-300 hover:bg-black hover:text-white"
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md px-4 pt-2 pb-4 space-y-2">
          {[
            { href: "/map", label: "Map", Icon: Map },
            { href: "/projects-board", label: "Projects", Icon: FolderKanban },
            { href: "/groups", label: "Group Lists", Icon: Users },
            { href: "/farms", label: "Farm Lists", Icon: Home },
            { href: "/accounts", label: "Accounts", Icon: UserCircle },
          ].map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 transition-all duration-300 hover:bg-black hover:text-white"
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default DashboardHeader;
