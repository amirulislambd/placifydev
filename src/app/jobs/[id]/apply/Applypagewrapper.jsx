import Link from "next/link";
import { BsLightningCharge, BsArrowLeft } from "react-icons/bs";
import ApplyJob from "./ApplyJob";

export default function ApplyPageWrapper({ applications, job, user }) {
  const used     = applications.length;
  const limit    = 3;
  const remaining = limit - used;
  const canApply  = used < limit;

  return (
    <div className="min-h-screen bg-[#0d0d14]">

      {canApply ? (
        <>
          {/* Quota banner */}
          <div className="bg-[#0d0d14] border-b border-white/6 px-4 sm:px-6 py-2.5">
            <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <BsLightningCharge className="text-violet-400 text-[13px] shrink-0" />
                <p className="text-[12px] text-white/40">
                  You've used{" "}
                  <span className="text-white font-semibold">{used}</span> of{" "}
                  <span className="text-white font-semibold">{limit}</span>{" "}
                  free applications this month
                </p>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-1 shrink-0">
                {Array.from({ length: limit }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i < used ? "bg-violet-500" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Apply form */}
          <ApplyJob job={job} appliedUser={user} />
        </>
      ) : (
        /* Limit reached */
        <div className="flex items-center justify-center px-4 py-24">
          <div className="flex flex-col items-center text-center gap-6 max-w-sm">

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <BsLightningCharge className="text-amber-400 text-3xl" />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2">
              <h2 className="text-[22px] font-bold text-white">
                Monthly Limit Reached
              </h2>
              <p className="text-[14px] text-white/40 leading-relaxed">
                You've used all{" "}
                <span className="text-white/70 font-medium">
                  {limit} free applications
                </span>{" "}
                for this month. Upgrade to Pro to apply to unlimited jobs.
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full w-full" />
            </div>
            <p className="text-[11px] text-white/25 -mt-4">
              {used}/{limit} applications used
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Link
                href="/jobs"
                className="flex-1 flex items-center justify-center gap-2 text-[13px] text-white/50 hover:text-white border border-white/10 hover:border-white/20 py-2.5 rounded-xl transition-all"
              >
                <BsArrowLeft /> Browse Jobs
              </Link>
              <Link
                href="/pricing"
                className="flex-1 text-center text-[13px] bg-violet-600 hover:bg-violet-700 text-white font-medium py-2.5 rounded-xl transition-all"
              >
                Upgrade to Pro
              </Link>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}