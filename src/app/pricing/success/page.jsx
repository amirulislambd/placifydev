import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BsCheckCircleFill, BsEnvelope, BsArrowRight } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi2";
import { createSubscription } from "@/lib/action/subscriptions";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
    line_items,
    metadata,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/pricing");
  }

  if (status === "complete") {
    const subsInfo = {
      email: customerEmail,
      planId: metadata.planId,
    };
    // update user plan

    const result = await createSubscription(subsInfo);

    const planName = line_items?.data?.[0]?.description || "Pro";

    return (
      <div className="min-h-screen bg-[#0d0d14] flex items-center justify-center px-4">
        <div className="w-full max-w-md flex flex-col items-center gap-8">
          {/* Glow */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl scale-150" />
            <div className="relative w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <BsCheckCircleFill className="text-emerald-400 text-4xl" />
            </div>
          </div>

          {/* Text */}
          <div className="text-center flex flex-col gap-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              <HiSparkles className="text-violet-400 text-[14px]" />
              <span className="text-[12px] text-violet-300 font-medium uppercase tracking-wider">
                Payment Successful
              </span>
            </div>
            <h1 className="text-[28px] font-bold text-white leading-tight">
              Welcome to {planName}!
            </h1>
            <p className="text-[14px] text-white/45 leading-relaxed">
              Your subscription is now active. A confirmation email has been
              sent to{" "}
              <span className="text-white/70 font-medium">{customerEmail}</span>
              .
            </p>
          </div>

          {/* Info card */}
          <div className="w-full bg-[#12121e] border border-white/8 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center shrink-0">
                <BsEnvelope className="text-violet-400 text-[15px]" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-white">
                  Check your inbox
                </p>
                <p className="text-[12px] text-white/35">
                  Receipt sent to {customerEmail}
                </p>
              </div>
            </div>
            <div className="h-px bg-white/6" />
            <p className="text-[12px] text-white/30 leading-relaxed">
              Questions? Email us at{" "}
              <a
                href="mailto:support@placifydev.com"
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                support@placifydev.com
              </a>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link
              href="/jobs"
              className="flex-1 text-center text-[13px] text-white/50 hover:text-white border border-white/10 hover:border-white/20 py-3 rounded-xl transition-all"
            >
              Browse Jobs
            </Link>
            <Link
              href="/dashboard"
              className="flex-1 flex items-center justify-center gap-2 text-[13px] bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 rounded-xl transition-all"
            >
              Go to Dashboard <BsArrowRight />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
