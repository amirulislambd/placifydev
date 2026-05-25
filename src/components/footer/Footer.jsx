import Link from "next/link";
import { FaFacebookF, FaPinterestP, FaLinkedinIn } from "react-icons/fa";

const FOOTER_LINKS = {
  Product: [
    { label: "Job discovery", href: "#" },
    { label: "Worker AI", href: "#" },
    { label: "Companies", href: "#" },
    { label: "Salary data", href: "#" },
  ],
  Navigations: [
    { label: "Help center", href: "#" },
    { label: "Career library", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "Brand Guideline", href: "#" },
    { label: "Newsroom", href: "#" },
  ],
};

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61583826647447",
    icon: <FaFacebookF size={18} />,
    className:
      "bg-[#2a2a3d] hover:bg-[#1877F2] active:bg-[#0e5fc0]",
  },
  {
    label: "Pinterest",
    href: "#",
    icon: <FaPinterestP size={18} />,
    className:
      "bg-violet-600 hover:bg-[#E60023] active:bg-[#b5001b]",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/m-amirulislam/",
    icon: <FaLinkedinIn size={18} />,
    className:
      "bg-[#2a2a3d] hover:bg-[#0A66C2] active:bg-[#084d93]",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d0d14] text-white px-6 md:px-16 pt-16 pb-10">
      <div className="max-w-screen-xl mx-auto">

        {/* Top */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-0 justify-between mb-16">

          {/* Left — Logo + tagline */}
          <div className="max-w-[280px]">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shrink-0">
                {/* Logo icon — Gravity UI LogoIcon or custom */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M8 5.14v14l11-7-11-7z" />
                  <rect x="5" y="18" width="6" height="2" rx="1" />
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[15px] font-bold text-white">Programming</span>
                <span className="text-[13px] text-white/70">Hero</span>
              </div>
            </Link>
            <p className="text-[14px] text-white/50 leading-relaxed">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Right — Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-[14px] font-semibold text-violet-400 mb-5">
                  {category}
                </h4>
                <ul className="flex flex-col gap-4">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[14px] text-white/55 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-200 active:scale-95 ${s.className}`}
              >
                {s.icon}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-[13px] text-white/35">
            <span>Copyright 2026 — Placify Dev</span>
            <div className="flex items-center gap-2">
              <Link href="/terms" className="hover:text-white transition-colors duration-200">
                Terms & Policy
              </Link>
              <span>-</span>
              <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}