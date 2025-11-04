"use client";

import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import logoImg from "@/assets/images/logoImg.gif";

interface MenuItem {
  title: string;
  link?: string;
  submenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { title: "Home", link: "/" },
  { title: "Services", link: "/Services" },
  {
    title: "Our Portfolio",
    submenu: [
      { title: "RS Global Ties", link: "/Our-Portfolio/Projects/RS-Global-Ties" },
      { title: "Private CPA", link: "/Our-Portfolio/Projects/Private-CPA" },
      { title: "ISA Consulting", link: "/Our-Portfolio/Projects/ISA" },
      { title: "See All", link: "/#see-all-services" },
    ],
  },
  { title: "About Us", link: "/About-us" },
  { title: "Careers", link: "/Careers" },
 // { title: "Contact Us", link: "/Contact-us" },
];

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ✅ Detect dark/light theme
  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDarkMode(html.classList.contains("dark"));
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    setIsDarkMode(html.classList.contains("dark"));
    return () => observer.disconnect();
  }, []);

  const toggleSubmenu = (title: string) => {
    setActiveSubmenu(activeSubmenu === title ? null : title);
  };

  const renderMenuItem = (item: MenuItem) => {
    if (item.submenu) {
      return (
        <div key={item.title} className="w-full md:hidden">
          <button
            onClick={() => toggleSubmenu(item.title)}
            className="flex items-center justify-between w-full py-4 px-6 text-gray-200 hover:bg-gray-800 transition-colors duration-200"
          >
            <span>{item.title}</span>
            <FaChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                activeSubmenu === item.title ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              activeSubmenu === item.title ? "max-h-64" : "max-h-0"
            }`}
          >
            {item.submenu.map((subItem) => (
              <a
                key={subItem.title}
                href={subItem.link}
                className="block py-3 px-8 text-gray-300 hover:bg-gray-800 transition-colors duration-200"
              >
                {subItem.title}
              </a>
            ))}
          </div>
        </div>
      );
    }

    return (
      <a
        key={item.title}
        href={item.link}
        className="block py-4 px-6 text-gray-200 hover:bg-gray-800 transition-colors duration-200"
      >
        {item.title}
      </a>
    );
  };

  return (
    <div className="font-sans md:hidden lg:hidden bg-black">
      {/* Overlay background */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 justify-end"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        onClick={() => setIsOpen(false)}
      />

    <button
  onClick={() => setIsOpen(!isOpen)}
  className={`fixed top-5 right-4 z-[9999] p-2 rounded-md transition-all duration-300`}
>
  <div
    className={`w-6 h-6 relative ${
      isOpen ? "text-white" : "text-black dark:text-white"
    }`}
  >
    <span
      className={`block w-full h-0.5 bg-current absolute transition-all duration-300 ${
        isOpen ? "rotate-45 top-3" : "top-1"
      }`}
    />
    <span
      className={`block w-full h-0.5 bg-current absolute top-3 transition-opacity duration-300 ${
        isOpen ? "opacity-0" : "opacity-100"
      }`}
    />
    <span
      className={`block w-full h-0.5 bg-current absolute transition-all duration-300 ${
        isOpen ? "-rotate-45 top-3" : "top-5"
      }`}
    />
  </div>
</button>



      <nav
        className={`fixed top-0 left-0 h-screen w-full bg-black transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ✅ Logo section */}
        <div className="flex items-center px-6 py-6">
          <Image
            unoptimized
            src={isDarkMode ? logoImg : logoImg}
            alt="Leventia"
            width={150}
            height={48}
            className="h-16 w-auto object-contain"
            priority
          />
        </div>

        {/* ✅ Menu list (brighter dividers + visible last line) */}
        <div className="bg-black border-t border-b border-gray-400 mt-4">
          {menuItems.map((item, index) => (
            <div
              key={item.title}
              className={`border-b border-gray-400 last:border-b ${
                index === menuItems.length - 1 ? "border-b border-gray-400" : ""
              }`}
            >
              {renderMenuItem(item)}
            </div>
          ))}
        </div>
         <div className="flex divide-y bg-black divide-gray-700 flex-col items-start px-6 py-4  gap-8 -translate-y-[10px] w-full">
      
        <Link href={"/Contact-us"} className="transition-all duration-500">
          <p
            className="p-2 px-2 bg-[#4848FF] text-white
               dark:bg-white dark:text-black
               flex items-center justify-center gap-2 font-medium"
          >
            Contact Us
          </p>
        </Link>
      
        {/* Theme Toggle - Desktop */}
        
      </div>
      </nav>
     
    </div>
  );
};

export default MobileSidebar;
