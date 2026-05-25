"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#1a1a2e] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2a2a45_0%,_#1a1a2e_70%)] pointer-events-none" />

      <nav className="relative max-w-screen-xl mx-auto flex items-center justify-between px-6 md:px-10 h-[70px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5.14v14l11-7-11-7z" />
              <rect x="5" y="18" width="6" height="2" rx="1" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight uppercase">
            <span className="text-[15px] font-bold text-white">placify</span>
            <span className="text-[13px] text-white/75">Dev</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 ml-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] text-white/75 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
          <div className="w-px h-5 bg-white/20 mx-3" />
          <Link href="/signin" className="text-[15px] font-medium text-indigo-400 hover:text-indigo-300 px-3 py-2">
            Sign In
          </Link>
          <Link href="/get-started" className="ml-2 bg-white text-gray-900 text-[15px] font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors">
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden ml-auto text-white p-2 rounded-lg hover:bg-white/10 transition-colors z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-white stroke-2">
            {menuOpen ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer — slides in from right */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[75%] max-w-[300px] bg-[#1e1e35] z-50 flex flex-col p-6 transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          className="self-end text-white/60 hover:text-white mb-6"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
            <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        {/* Logo inside drawer */}
        <Link href="/" className="flex items-center gap-3 mb-8" onClick={() => setMenuOpen(false)}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M8 5.14v14l11-7-11-7z" />
              <rect x="5" y="18" width="6" height="2" rx="1" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[14px] font-bold text-white">Programming</span>
            <span className="text-[12px] text-white/70">Hero</span>
          </div>
        </Link>

        {/* Nav links */}
        <div className="flex flex-col gap-1 flex-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] text-white/75 hover:text-white py-3 px-3 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-white/10 my-3" />

          <Link
            href="/signin"
            className="text-[15px] font-medium text-indigo-400 py-3 px-3"
            onClick={() => setMenuOpen(false)}
          >
            Sign In
          </Link>
        </div>

        {/* Get Started — bottom */}
        <Link
          href="/get-started"
          className="w-full text-center bg-white text-gray-900 text-[15px] font-semibold py-3 rounded-full hover:bg-gray-100 transition-colors mt-4"
          onClick={() => setMenuOpen(false)}
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}