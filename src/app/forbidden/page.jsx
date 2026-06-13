// app/forbidden/page.jsx
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-[#0d0d14] flex flex-col items-center justify-center gap-8 px-4 py-12">

      {/* Animated lock icon */}
      <div className="relative w-[140px] h-[140px] flex items-center justify-center">
        <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <style>{`
            .lock-shake {
              animation: shake 2.5s ease-in-out infinite;
            }
            @keyframes shake {
              0%, 70%, 100% { transform: rotate(0deg); }
              72% { transform: rotate(-4deg); }
              74% { transform: rotate(4deg); }
              76% { transform: rotate(-3deg); }
              78% { transform: rotate(3deg); }
              80% { transform: rotate(0deg); }
            }
            .lock-glow {
              animation: glow 2.5s ease-in-out infinite;
            }
            @keyframes glow {
              0%, 100% { opacity: 0.15; r: 50; }
              50% { opacity: 0.3; r: 58; }
            }
            .lock-pulse {
              animation: pulse-ring 2.5s ease-in-out infinite;
            }
            @keyframes pulse-ring {
              0%, 100% { stroke-opacity: 0.3; r: 62; }
              50% { stroke-opacity: 0.6; r: 66; }
            }
          `}</style>

          {/* glow */}
          <circle className="lock-glow" cx="70" cy="70" r="50" fill="#ef4444" />
          {/* ring pulse */}
          <circle className="lock-pulse" cx="70" cy="70" r="62" fill="none" stroke="#ef4444" strokeWidth="1.5" />

          <g className="lock-shake" style={{ transformOrigin: "70px 75px" }}>
            {/* lock body */}
            <rect x="45" y="65" width="50" height="42" rx="8" fill="#2a2a3d" stroke="#ef4444" strokeWidth="2" />
            {/* lock shackle */}
            <path
              d="M55 65 V50 a15 15 0 0 1 30 0 V65"
              fill="none"
              stroke="#ef4444"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* keyhole */}
            <circle cx="70" cy="83" r="6" fill="#ef4444" />
            <rect x="67" y="86" width="6" height="12" rx="2" fill="#ef4444" />
          </g>
        </svg>
      </div>

      {/* Text */}
      <div className="text-center">
        <h1 className="text-[68px] font-bold text-white tracking-[-3px] leading-none font-mono">
          4<span className="text-red-500">0</span>3
        </h1>
        <h2 className="text-[18px] font-semibold text-white mt-2 mb-2">Access Forbidden</h2>
        <p className="text-[13px] text-white/40 max-w-[300px] mx-auto leading-relaxed">
          You don't have permission to access this resource. If you think this is a mistake, contact support.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="bg-violet-600 hover:bg-violet-700 text-white font-medium text-[14px] px-6 py-2.5 rounded-xl transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/contact"
          className="bg-transparent text-white/50 hover:text-white border border-white/12 hover:border-white/25 font-medium text-[14px] px-6 py-2.5 rounded-xl transition-all"
        >
          Contact Support
        </Link>
      </div>

    </div>
  );
}