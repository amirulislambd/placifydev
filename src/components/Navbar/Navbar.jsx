import Link from "next/link";
import NavLinks from "./Navlinks";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-40 shadow-2xl">
      <header className="w-full bg-[#1a1a2e] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2a2a45_0%,_#1a1a2e_70%)] pointer-events-none" />

        <nav className="relative max-w-screen-xl mx-auto flex items-center justify-between px-6 md:px-10 h-[70px]">
          {/* Logo — static, server-rendered */}
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

          {/* Client boundary — links, drawer, auth */}
          <NavLinks />
        </nav>
      </header>
    </div>
  );
}
