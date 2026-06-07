import Link from "next/link";
import { BsShieldExclamation, BsArrowLeft } from "react-icons/bs";

export default function NotForSeekers() {
  return (
    <div className="min-h-screen bg-[#0d0d14] flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center gap-6 max-w-sm">

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <BsShieldExclamation className="text-amber-400 text-3xl" />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[22px] font-bold text-white">Access Restricted</h1>
          <p className="text-[14px] text-white/40 leading-relaxed">
            This page is only available for <span className="text-white/70 font-medium">Job Seekers</span>.
            Recruiters cannot access this area.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 text-[13px] text-white/50 hover:text-white border border-white/10 hover:border-white/20 py-2.5 rounded-xl transition-all"
          >
            <BsArrowLeft /> Go Home
          </Link>
          <Link
            href="/dashboard/recruiter"
            className="flex-1 text-center text-[13px] bg-violet-600 hover:bg-violet-700 text-white font-medium py-2.5 rounded-xl transition-all"
          >
            My Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}