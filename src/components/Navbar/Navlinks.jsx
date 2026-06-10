"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiBriefcase,
  FiHome,
  FiDollarSign,
  FiMenu,
  FiX,
  FiUser,
} from "react-icons/fi";
import NavActions from "./Navactions";
import { useSession } from "@/lib/auth-client";
import { RxDashboard } from "react-icons/rx";

const BASE_NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs", icon: <FiBriefcase /> },
  { label: "Company", href: "/company", icon: <FiHome /> },
  { label: "Pricing", href: "/pricing", icon: <FiDollarSign /> },
];

const DASHBOARD_LINKS = {
  seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
};

export default function NavLinks() {
  const { data: session } = useSession();
  const user = session?.user;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => setDrawerOpen(false);

  const NAV_LINKS = user?.email
    ? [
        ...BASE_NAV_LINKS,
        {
          label: "Dashboard",
          href: DASHBOARD_LINKS[user.role] || "/dashboard",
          icon: <RxDashboard />,
        },
      ]
    : BASE_NAV_LINKS;

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-1 ml-auto">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[15px] text-white/75 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5 flex items-center gap-2"
          >
            <span className="text-[16px]">{link.icon}</span>
            {link.label}
          </Link>
        ))}
        <div className="w-px h-5 bg-white/20 mx-3" />
        <NavActions onSignOut={() => {}} />
      </div>

      {/* Mobile hamburger */}
      <div className="flex md:hidden items-center gap-3 ml-auto">
        <NavActions mobileAvatarOnly onSignOut={closeDrawer} />
        <button
          onClick={() => setDrawerOpen(true)}
          className="text-white/70 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
          aria-label="Open menu"
        >
          <FiMenu className="text-[22px]" />
        </button>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`
        fixed top-0 right-0 h-full w-[280px] z-50 md:hidden
        bg-[#1a1a2e] border-l border-white/10
        transform transition-transform duration-300 ease-in-out
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between px-5 h-[70px] border-b border-white/10">
          <span className="text-[15px] font-semibold text-white">Menu</span>
          <button
            onClick={closeDrawer}
            className="text-white/50 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
            aria-label="Close menu"
          >
            <FiX className="text-[20px]" />
          </button>
        </div>

        <NavActions drawerUserInfo onSignOut={closeDrawer} />

        <nav className="flex flex-col px-3 pt-4 gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeDrawer}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] text-white/75 hover:text-white hover:bg-white/8 transition-colors"
            >
              <span className="text-[18px] text-violet-400">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 px-3 pb-6 border-t border-white/10 pt-4">
          <NavActions drawerActions onSignOut={closeDrawer} />
        </div>
      </div>
    </>
  );
}