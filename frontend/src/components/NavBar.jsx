import React, { useState } from "react";
import slFlag from "../assets/Sri_Lankan_Flag.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "ABOUT ME", href: "#about" },
    { name: "EXPERIENCE", href: "#experience" },
    { name: "EDUCATION", href: "#education" },
    { name: "SKILLS", href: "#skills" },
    { name: "PROJECTS", href: "#projects" },
    { name: "OTHER CERTIFICATION", href: "#certifications" },
    { name: "MY PASSION", href: "#mypassion" },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-black/70 backdrop-blur-md border-b border-white/10">
          <ul className="flex flex-col px-6 py-5 gap-5">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-xs tracking-[0.22em] text-white/80 hover:text-white"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="h-20 bg-black/40 backdrop-blur-md ">
        <div className="mx-auto h-full flex items-center px-6 lg:px-16">
          {/* Center menu */}
          <div className="hidden lg:flex flex-1">
            <ul className="flex flex-wrap items-center gap-5 lg:gap-10">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-[10px] md:text-[11px] sm:text-xs tracking-[0.22em] text-white/70 hover:text-white transition"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden mr-4 text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Mobile spacer */}
          <div className="flex-1 lg:hidden" />

          {/* Right small badge (flag image) */}
          <div className="flex items-center justify-end w-24 lg:w-48">
            <img
              src={slFlag}
              alt="Sri Lanka Flag"
              className="h-5 w-8 object-cover rounded-[2px] border border-yellow-500/80"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
