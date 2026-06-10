// app/unauthorized/page.jsx — or use anywhere as a component
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#0d0d14] flex flex-col items-center justify-center gap-8 px-4 py-12">

      {/* Animated character */}
      <div className="relative w-[200px] h-[260px]">
        <svg width="200" height="260" viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">
          <style>{`
            .body { animation: breathe 2s ease-in-out infinite; }
            @keyframes breathe {
              0%,100% { transform: scaleY(1); }
              50% { transform: scaleY(1.03) translateY(-1px); }
            }
            .arm-gun {
              transform-origin: 116px 135px;
              animation: aim 3s ease-in-out infinite;
            }
            @keyframes aim {
              0%,100% { transform: rotate(-5deg); }
              40%,60% { transform: rotate(8deg); }
            }
            .muzzle-flash {
              opacity: 0;
              animation: flash 3s ease-in-out infinite;
            }
            @keyframes flash {
              0%,38%,42%,100% { opacity: 0; }
              40% { opacity: 1; }
            }
            .bullet {
              opacity: 0;
              animation: shoot 3s ease-in-out infinite;
            }
            @keyframes shoot {
              0%,39% { opacity: 0; transform: translateX(0); }
              40% { opacity: 1; transform: translateX(0); }
              55% { opacity: 0; transform: translateX(80px); }
              100% { opacity: 0; }
            }
            .shadow {
              animation: shadow-pulse 2s ease-in-out infinite;
            }
            @keyframes shadow-pulse {
              0%,100% { transform: scaleX(1); opacity: 0.3; }
              50% { transform: scaleX(0.9); opacity: 0.2; }
            }
            .smoke {
              opacity: 0;
              animation: smoke-rise 3s ease-in-out infinite;
            }
            @keyframes smoke-rise {
              0%,38%,100% { opacity: 0; transform: translateY(0) scale(0.5); }
              40% { opacity: 0.8; transform: translateY(-4px) scale(1); }
              50% { opacity: 0; transform: translateY(-12px) scale(1.5); }
            }
          `}</style>

          <ellipse className="shadow" cx="100" cy="248" rx="30" ry="6" fill="#6d4aff" />

          <g className="body">
            <rect x="85" y="185" width="14" height="50" rx="7" fill="#2a2a3d" />
            <rect x="101" y="185" width="14" height="50" rx="7" fill="#2a2a3d" />
            <rect x="82" y="228" width="18" height="10" rx="4" fill="#1a1a2e" />
            <rect x="100" y="228" width="18" height="10" rx="4" fill="#1a1a2e" />
            <rect x="80" y="130" width="40" height="60" rx="10" fill="#6d4aff" />
            <rect x="80" y="183" width="40" height="6" rx="3" fill="#4a3080" />
            <rect x="96" y="182" width="8" height="8" rx="2" fill="#fbbf24" />
            <rect x="66" y="133" width="14" height="38" rx="7" fill="#6d4aff" />
            <circle cx="73" cy="173" r="7" fill="#f4c5a0" />

            <g className="arm-gun">
              <rect x="116" y="133" width="14" height="40" rx="7" fill="#6d4aff" />
              <circle cx="123" cy="176" r="7" fill="#f4c5a0" />
              <rect x="118" y="170" width="30" height="10" rx="3" fill="#222" />
              <rect x="145" y="172" width="18" height="5" rx="2" fill="#333" />
              <rect x="122" y="178" width="10" height="12" rx="2" fill="#1a1a1a" />
              <ellipse className="bullet" cx="166" cy="174.5" rx="5" ry="2.5" fill="#fbbf24" />
              <g className="muzzle-flash">
                <polygon points="163,171 172,174.5 163,178 167,174.5" fill="#fbbf24" />
                <polygon points="165,169 169,174.5 165,180" fill="white" opacity="0.6" />
              </g>
              <circle className="smoke" cx="168" cy="172" r="4" fill="rgba(200,200,200,0.5)" />
            </g>

            <circle cx="100" cy="112" r="22" fill="#f4c5a0" />
            <ellipse cx="100" cy="94" rx="22" ry="10" fill="#2a1a0a" />
            <ellipse cx="93" cy="112" rx="3" ry="3.5" fill="#1a1a1a" />
            <ellipse cx="107" cy="112" rx="3" ry="3.5" fill="#1a1a1a" />
            <circle cx="94.5" cy="110.5" r="1" fill="white" />
            <circle cx="108.5" cy="110.5" r="1" fill="white" />
            <path d="M89 107 Q93 104 97 106" stroke="#2a1a0a" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M103 106 Q107 104 111 107" stroke="#2a1a0a" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M95 120 Q101 124 107 120" stroke="#c0856a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <rect x="88" y="145" width="24" height="16" rx="3" fill="#fbbf24" />
            <text x="100" y="157" textAnchor="middle" fontSize="7" fill="#1a1a1a" fontWeight="700">GUARD</text>
          </g>

          <line x1="30" y1="240" x2="170" y2="240" stroke="rgba(109,74,255,0.3)" strokeWidth="1" />
        </svg>
      </div>

      {/* Text */}
      <div className="text-center">
        <h1 className="text-[72px] font-bold text-white tracking-[-3px] leading-none font-mono">
          4<span className="text-violet-500">0</span>1
        </h1>
        <h2 className="text-[20px] font-semibold text-white mt-2 mb-2">Unauthorized Access</h2>
        <p className="text-[14px] text-white/40 max-w-[300px] mx-auto leading-relaxed">
          You don't have permission to view this page. Please sign in or go back.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <Link
          href="/signin"
          className="bg-violet-600 hover:bg-violet-700 text-white font-medium text-[14px] px-6 py-2.5 rounded-xl transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/"
          className="bg-transparent text-white/50 hover:text-white border border-white/12 hover:border-white/25 font-medium text-[14px] px-6 py-2.5 rounded-xl transition-all"
        >
          Go Back
        </Link>
      </div>

    </div>
  );
}