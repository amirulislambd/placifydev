"use client";

import { IoSearchOutline, IoLocationOutline } from "react-icons/io5";
import { HiMagnifyingGlass } from "react-icons/hi2";

const TRENDING_TAGS = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

export default function HeroSection() {
  return (
    <section className="flex items-center justify-center px-4 sm:px-6 py-14 sm:py-16 md:py-20">
      <div className="text-center w-full max-w-[680px]">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-3 bg-[#111118] border border-white/10 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 mb-6 sm:mb-8">
          <div className="w-5 sm:w-8 h-px bg-white/18 shrink-0" />
          <span className="font-mono text-[10px] sm:text-[11.5px] tracking-[1.5px] sm:tracking-[2px] text-white/65 whitespace-nowrap">
            💼 <span className="text-white font-bold">50,000+</span> NEW JOBS THIS MONTH
          </span>
          <div className="w-5 sm:w-8 h-px bg-white/18 shrink-0" />
        </div>

        {/* Title */}
        <h1 className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[58px] font-black text-white leading-[1.08] tracking-[-1.5px] sm:tracking-[-2px] mb-4 sm:mb-5">
          Find Your Dream Job Today
        </h1>

        {/* Subtitle */}
        <p className="text-[14px] sm:text-[15px] text-white/48 leading-[1.75] max-w-[340px] sm:max-w-[440px] md:max-w-[510px] mx-auto mb-8 sm:mb-10">
          HireLoop connects top talent with world-class companies. Browse thousands of
          curated opportunities and land your next role — faster.
        </p>

        {/* Search Bar — stacked on mobile, inline on sm+ */}
        <div className="max-w-[600px] mx-auto mb-5">

          {/* Mobile: stacked inputs */}
          <div className="flex flex-col gap-2 sm:hidden">
            <div className="flex items-center bg-[#181824] border border-white/11 rounded-full pl-4 pr-4 py-3">
              <IoSearchOutline className="text-white/38 text-[17px] shrink-0 mr-2.5" />
              <input
                type="text"
                placeholder="Job title, skill or company"
                className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-white/28 min-w-0"
              />
            </div>
            <div className="flex items-center bg-[#181824] border border-white/11 rounded-full pl-4 pr-4 py-3">
              <IoLocationOutline className="text-white/35 text-[17px] shrink-0 mr-2" />
              <input
                type="text"
                placeholder="Location or Remote"
                className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-white/28 min-w-0"
              />
            </div>
            <button
              className="w-full rounded-full bg-violet-600 hover:bg-violet-700 active:scale-95 flex items-center justify-center gap-2 py-3 text-white text-sm font-medium transition-all duration-200"
              aria-label="Search"
            >
              <HiMagnifyingGlass className="text-lg" />
              Search Jobs
            </button>
          </div>

          {/* sm+: single inline bar */}
          <div className="hidden sm:flex items-center bg-[#181824] border border-white/11 rounded-full pl-5 pr-2 py-2">
            <div className="flex items-center flex-1 min-w-0">
              <IoSearchOutline className="text-white/38 text-[17px] shrink-0 mr-2.5" />
              <input
                type="text"
                placeholder="Job title, skill or company"
                className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-white/28 min-w-0"
              />
            </div>
            <div className="w-px h-[22px] bg-white/12 mx-4 shrink-0" />
            <div className="flex items-center flex-1 min-w-0">
              <IoLocationOutline className="text-white/35 text-[17px] shrink-0 mr-2" />
              <input
                type="text"
                placeholder="Location or Remote"
                className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-white/28 min-w-0"
              />
            </div>
            <button
              className="w-[46px] h-[46px] rounded-full bg-violet-600 hover:bg-violet-700 active:scale-95 flex items-center justify-center shrink-0 ml-1.5 transition-all duration-200"
              aria-label="Search"
            >
              <HiMagnifyingGlass className="text-white text-lg" />
            </button>
          </div>
        </div>

        {/* Trending tags */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-[12px] sm:text-[13px] text-white/32 mr-1">
            Trending Position
          </span>
          {TRENDING_TAGS.map((tag) => (
            <button
              key={tag}
              className="text-[12px] sm:text-[13px] text-white/65 border border-white/15 rounded-full px-3 sm:px-4 py-[4px] sm:py-[5px] bg-transparent hover:border-violet-500/55 hover:text-white hover:bg-violet-500/10 transition-all duration-200"
            >
              {tag}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}