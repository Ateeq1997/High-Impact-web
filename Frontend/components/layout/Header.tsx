"use client";

import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          HighImpact
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/features" className="text-gray-700 hover:text-blue-600 transition">
            Features
          </Link>

          <Link href="/mappreview" className="text-gray-700 hover:text-blue-600 transition">
            Map Preview
          </Link>

          <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition">
            Pricing
          </Link>

          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
            About
          </Link>

          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md px-4 pt-2 pb-4 space-y-2">

          <Link href="/features" className="block text-gray-700 hover:text-blue-600 transition">
            Features
          </Link>

          <Link href="/mappreview" className="block text-gray-700 hover:text-blue-600 transition">
            Map Preview
          </Link>

          <Link href="/pricing" className="block text-gray-700 hover:text-blue-600 transition">
            Pricing
          </Link>

          <Link href="/about" className="block text-gray-700 hover:text-blue-600 transition">
            About
          </Link>

          <Link
            href="/login"
            className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
