"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  console.log(user);

  const handleSignOut = () => {
    authClient.signOut();
    router.push("/signin");
  };

  return (
    <header className="w-full bg-[#1a1a2e] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2a2a45_0%,_#1a1a2e_70%)] pointer-events-none" />

      <nav className="relative max-w-screen-xl mx-auto flex items-center justify-between px-6 md:px-10 h-[70px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-white"
              xmlns="http://www.w3.org/2000/svg"
            >
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

          {session ? (
            <Button onClick={handleSignOut} color="danger">
              Sign Out
            </Button>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-[15px] font-medium text-indigo-400 hover:text-indigo-300 px-3 py-2"
              >
                Sign In
              </Link>

              <Link
                href="/get-started"
                className="ml-2 bg-white text-gray-900 text-[15px] font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}