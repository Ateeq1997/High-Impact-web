"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logoImg from "@/assets/images/logoImg.gif";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import { RiMenu4Line } from "react-icons/ri";
import { inter } from "@/utils/fonts";
import { usePathname } from "next/navigation";
import { FaAngleDown } from "react-icons/fa6";


const Navbar = () => {
  const [hovered, setHovered] = useState({ hover: false, name: "" });
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const currentPath = usePathname();
  const isActive = (pathName: string) => {
    return currentPath.startsWith(pathName);
  };

  const handleHover = (name: string, hover: boolean) => {
    setHovered({ hover: hover, name: name });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll, lastScrollY]);

  return (
    <div
      className={`navbar top-1 xs:top-0 lg:h-24  backdrop-blur-md sticky m-auto shadow-sm z-20 flex lg:justify-center  !p-0 w-[100%]   max-w-[1750px] ${
        inter.className
      } !font-[400] transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "!top-0 -translate-y-full "
      }`}
    >
      <div className="navbar-center">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="pl-2 lg:hidden flex justify-end"
          >
            <RiMenu4Line size={25} color="#fff" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-[#161616] max-h-screen overflow-y-auto flex flex-col"
          >
            <li
              className={`p-3 ${
                isActive("/Services") ||
                isActive("/Careers") ||
                isActive("/Our-Portfolio") ||
                isActive("/About-us")
                  ? "text-white"
                  : "bg-[#7471E680]"
              }`}
            >
              <Link href={"/"}>Home</Link>
            </li>
            <li
              onClick={() => {
                handleHover("Services", !hovered.hover);
              }}
              className={`p-3 relative ${
                isActive("/Services") ? "bg-[#7471E680]" : "text-white"
              }`}
            >
              <Link className="flex gap-2 items-center" href={"/Services"}>
                Services{" "}
                <FaAngleDown
                  className={`${
                    hovered.hover && hovered.name === "Services"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </Link>
              <div
                className={`${
                  hovered.hover && hovered.name === "Services"
                    ? "flex"
                    : "hidden"
                } flex-col items-start mt-2 gap-2 bg-[#7471E6] w-fit h-fit rounded-lg shadow-md py-4 px-8 transition-all duration-700 ease-in-out`}
              >
                <Link
                  className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
                  href={"/Services/Plan"}
                >
                  Plan
                </Link>
                <Link
                  className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
                  href={"/Services/Design-service"}
                >
                  Design
                </Link>
                <Link
                  className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
                  href={"/Services/Development"}
                >
                  Development
                </Link>
                <Link
                  className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
                  href={"/Services/Testing"}
                >
                  Testing
                </Link>
              </div>
            </li>
            
            <li
              className={`p-3 ${
                isActive("/Careers") ? "bg-[#7471E680]" : "text-white"
              }`}
            >
              <Link href={"/Careers"}>Careers</Link>
            </li>
            <li
              onClick={() => {
                handleHover("Portfolio", !hovered.hover);
              }}
              className={`p-3 ${
                isActive("/Our-Portfolio") ? "bg-[#7471E680]" : "text-white"
              }`}
            >
              <Link className="flex gap-2 items-center" href={"/Our-Portfolio"}>
                Our Portfolio
                <FaAngleDown
                  className={`${
                    hovered.hover && hovered.name === "Portfolio"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </Link>
              <div
                className={`${
                  hovered.hover && hovered.name === "Portfolio"
                    ? "flex"
                    : "hidden"
                } flex-col items-start mt-2 gap-2 bg-[#7471E6] w-fit h-fit rounded-lg shadow-md py-4 px-8`}
              >
                <Link
                  className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
                  href={"/Our-Portfolio/Projects/RS-Global-Ties"}
                >
                  RS Global Ties
                </Link>
                <Link
                  className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
                  href={"/Our-Portfolio/Projects/Private-CPA"}
                >
                  Private CPA
                </Link>
                <Link
                  className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
                  href={"/Our-Portfolio/Projects/ISA"}
                >
                  ISA Consulting
                </Link>
                <Link
                  className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
                  href={"/Our-Portfolio/Projects/Makewell.life"}
                >
                  Makewell.life
                </Link>
                <Link
                  className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
                  href={"/Our-Portfolio/Projects/origin.com"}
                >
                  origin.com
                </Link>
                <Link
                  className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
                  href={"/Our-Portfolio/Projects/Dadi-Rent-Boat"}
                >
                  Dadi Rent Boat
                </Link>
              </div>
            </li>
            <li
              className={`p-3 ${
                isActive("/About-us") ? "bg-[#7471E680]" : "text-white"
              }`}
            >
              <Link href={"/About-us"}>About Us</Link>
            </li>

           <Link
  href={"/Contact-us"}
  className="ml-2 p-2 bg-[#4848FF] text-white hidden rounded-md lg:flex items-center gap-2 hover:font-medium transition-all duration-700 ease-in-out"
>
  Contact Us  
</Link>


          </ul>
        </div>
        <Image
          unoptimized
          src={logoImg}
          width={100}
          alt="highimpact logo"
          className=" mr-auto"
        />
      </div>

      <ul className="navbar-start  justify-center w-[67%] hidden lg:flex px-1 items-center">
        <li
          className={`p-3  ${
            isActive("/Services") ||
            isActive("/Careers") ||
            isActive("/Our-Portfolio") ||
            isActive("/About-us")
              ? "hover:text-[#7471E6] hover:scale-x-110 transition-all duration-700 ease-in-out"
              : "text-[#7471E6] "
          }`}
        >
          <Link className="hover:text-[#7471E6] hover:scale-x-110" href={"/"}>
            Home
          </Link>
        </li>
        <li className="text-[#7471E6]">|</li>
        <li
          onMouseEnter={() => {
            handleHover("services", true);
          }}
          onMouseLeave={() => {
            handleHover("services", false);
          }}
          className={`p-3 relative inline-block ${
            isActive("/Services")
              ? "text-[#7471E6]"
              : "text-white hover:text-[#7471E6] hover:scale-x-110 transition-all duration-700 ease-in-out"
          }`}
        >
          <Link className="flex gap-2 items-center " href={"/Services"}>
            Services{" "}
            <FaAngleDown
              className={`${
                hovered.hover && hovered.name === "services" ? "rotate-180" : ""
              }`}
            />
          </Link>
          <div
            onMouseLeave={() => {
              handleHover("services", false);
            }}
            className={`absolute top-12 -left-4 ${
              hovered.hover && hovered.name === "services" ? "flex" : "hidden"
            }  flex-col gap-2 bg-[#7471E6] w-fit h-fit text-white rounded-lg shadow-md py-4 px-8 transition-all duration-700 ease-in-out`}
          >
            <Link
              className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
              href={"/Services/Plan"}
            >
              Plan
            </Link>
            <Link
              className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
              href={"/Services/Design-service"}
            >
              Design
            </Link>
            <Link
              className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
              href={"/Services/Development"}
            >
              Development
            </Link>
            <Link
              className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
              href={"/Services/Testing"}
            >
              Testing
            </Link>
          </div>
        </li>
        <li className="text-[#7471E6]">|</li>

        <li
          className={`p-3 ${
            isActive("/Careers")
              ? "text-[#7471E6]"
              : "text-white hover:text-[#7471E6] hover:scale-x-110 transition-all duration-700 ease-in-out"
          }`}
        >
          <Link href={"/Careers"}>Careers</Link>
        </li>
        <li className="text-[#7471E6]">|</li>

        <li
          onMouseEnter={() => {
            handleHover("Portfolio", true);
          }}
          onMouseLeave={() => {
            handleHover("Portfolio", false);
          }}
          className={`p-3 relative ${
            isActive("/Our-Portfolio")
              ? "text-[#7471E6]"
              : "text-white hover:text-[#7471E6] hover:scale-x-110 transition-all duration-700 ease-in-out"
          }`}
        >
          <Link className="flex gap-2 items-center" href={"/Our-Portfolio"}>
            Our Portfolio
            <FaAngleDown
              className={`${
                hovered.hover && hovered.name === "Portfolio"
                  ? "rotate-180"
                  : ""
              }`}
            />
          </Link>
          <div
            onMouseLeave={() => {
              handleHover("Portfolio", false);
            }}
            className={`absolute whitespace-pre top-12 -left-4 ${
              hovered.hover && hovered.name === "Portfolio" ? "flex" : "hidden"
            } flex-col gap-2 bg-[#7471E6] w-fit h-fit text-white rounded-lg shadow-md py-4 px-8`}
          >
            <Link
              className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
              href={"/Our-Portfolio/Projects/RS-Global-Ties"}
            >
              RS Global Ties
            </Link>
            <Link
              className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
              href={"/Our-Portfolio/Projects/Private-CPA"}
            >
              Private CPA
            </Link>
            <Link
              className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
              href={"/Our-Portfolio/Projects/ISA"}
            >
              ISA Consulting
            </Link>
            <Link
              className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
              href={"/Our-Portfolio/Projects/Makewell.life"}
            >
              Makewell.life
            </Link>
            <Link
              className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
              href={"/Our-Portfolio/Projects/origin.com"}
            >
              origin.com
            </Link>
            <Link
              className="hover:font-medium hover:scale-110 transition-all duration-700 ease-in-out"
              href={"/Our-Portfolio/Projects/Dadi-Rent-Boat"}
            >
              Dadi Rent Boat
            </Link>
          </div>
        </li>
        <li className="text-[#7471E6]">|</li>

        <li
          className={`p-3 ${
            isActive("/About-us")
              ? "text-[#7471E6]"
              : "text-white hover:text-[#7471E6] hover:scale-x-110 transition-all duration-700 ease-in-out"
          }`}
        >
          <Link href={"/About-us"}>About Us</Link>
        </li>
      </ul>
      <Link
  href={"/Contact-us"}
  className="ml-2 p-2 bg-[#4848FF] text-white hidden rounded-md lg:flex items-center gap-2 hover:font-medium transition-all duration-700 ease-in-out"
>
  Contact Us  
</Link>



      <hr className="bg-[#FFFFFF17] h-1 -z-10 lg:w-[86%] w-[100%] m-auto opacity-5  absolute bottom-0" />
    </div>
  );
};

export default Navbar;
