"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full px-6 md:px-20 py-6 
      flex items-center justify-between transition-all duration-300
      ${
        scrolled ? "bg-secondary backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <Link href="#home">
        <div className="flex items-center gap-3 font-poppins text-xl font-semibold cursor-pointer">
          <span className="bg-linear-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            Payal
          </span>
        </div>
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-10 font-poppins text-base">
        {links.map((item) => (
          <li
            key={item.href}
            className="relative group cursor-pointer text-gray-300 hover:text-white transition"
          >
            <Link href={item.href}>{item.name}</Link>

            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </li>
        ))}
      </ul>

      {/* Desktop Button */}
      <div className="hidden md:block">
        <Button className="px-6 py-5 text-base rounded-xl bg-white text-black hover:bg-gray-200 transition">
          Hire Me
        </Button>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg flex flex-col items-center gap-6 py-8 md:hidden">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-300 hover:text-white text-lg cursor-pointer"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <Button className="px-6 py-5 text-base rounded-xl bg-secondary text-black">
            Hire Me
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
