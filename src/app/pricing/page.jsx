"use client";

import { useState } from "react";
import { BsCheckLg, BsXLg, BsChevronDown } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi2";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────────────────────

const SEEKER_PLANS = [
  {
    id: "seeker_free",
    name: "Free",
    price: "$0",
    period: "forever",
    tag: null,
    color: "default",
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs per month",
      "Basic profile",
      "Email alerts",
    ],
    missing: ["Application tracking", "Salary insights", "Priority support"],
    cta: "Get Started",
    href: "/signup",
  },
  {
    id: "seeker_pro",
    name: "Pro",
    price: "$19",
    period: "month",
    tag: "Most Popular",
    color: "violet",
    features: [
      "Apply to up to 30 jobs per month",
      "Unlimited saved jobs",
      "Application tracking",
      "Salary insights",
    ],
    missing: ["Unlimited applications", "Profile boost", "Priority support"],
    cta: "Upgrade to Pro",
    href: "/dashboard/billing",
  },
  {
    id: "seeker_premium",
    name: "Premium",
    price: "$39",
    period: "month",
    tag: "Best Value",
    color: "emerald",
    features: [
      "Unlimited applications",
      "Everything in Pro",
      "Profile boost to recruiters",
      "Early access to new jobs",
      "Priority support",
    ],
    missing: [],
    cta: "Go Premium",
    href: "/dashboard/billing",
  },
];

const RECRUITER_PLANS = [
  {
    id: "recruiter_free",
    name: "Free",
    price: "$0",
    period: "forever",
    tag: null,
    color: "default",
    features: [
      "Up to 3 active job posts",
      "Basic applicant management",
      "Standard listing visibility",
    ],
    missing: ["Applicant tracking", "Analytics", "Featured listings", "Priority support"],
    cta: "Get Started",
    href: "/signup",
  },
  {
    id: "recruiter_growth",
    name: "Growth",
    price: "$49",
    period: "month",
    tag: "Most Popular",
    color: "violet",
    features: [
      "Up to 10 active job posts",
      "Applicant tracking",
      "Basic analytics",
      "Email support",
    ],
    missing: ["Featured listings", "Team collaboration", "Custom branding"],
    cta: "Upgrade to Growth",
    href: "/dashboard/billing",
  },
  {
    id: "recruiter_enterprise",
    name: "Enterprise",
    price: "$149",
    period: "month",
    tag: "Best Value",
    color: "emerald",
    features: [
      "Up to 50 active job posts",
      "Advanced analytics dashboard",
      "Featured job listings",
      "Team collaboration",
      "Custom branding",
      "Priority support",
    ],
    missing: [],
    cta: "Go Enterprise",
    href: "/dashboard/billing",
  },
];

const FAQS = [
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, you can cancel anytime. Your plan remains active until the end of the billing period. No questions asked.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact us within 14 days of purchase.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, Amex) via Stripe. Bank transfers available for Enterprise.",
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. You can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "We don't offer a free trial, but our Free plan lets you explore the platform. Paid plans come with a 14-day money-back guarantee.",
  },
];

// ── Plan Card ─────────────────────────────────────────────────────────────────

const colorMap = {
  default: {
    badge: "",
    border: "border-white/8",
    btn: "bg-white/[0.06] hover:bg-white/[0.10] text-white/70 hover:text-white border border-white/10",
    glow: "",
  },
  violet: {
    badge: "bg-violet-500/15 text-violet-300 border border-violet-500/20",
    border: "border-violet-500/30",
    btn: "bg-violet-600 hover:bg-violet-700 text-white",
    glow: "shadow-[0_0_40px_rgba(139,92,246,0.12)]",
  },
  emerald: {
    badge: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20",
    border: "border-emerald-500/30",
    btn: "bg-emerald-600 hover:bg-emerald-700 text-white",
    glow: "shadow-[0_0_40px_rgba(16,185,129,0.10)]",
  },
};

function PlanCard({ plan }) {
  const c = colorMap[plan.color];
  return (
    <div className={`relative bg-[#12121e] border ${c.border} ${c.glow} rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1`}>
      {plan.tag && (
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-semibold ${c.badge} flex items-center gap-1.5 whitespace-nowrap`}>
          <HiSparkles className="text-[10px]" /> {plan.tag}
        </div>
      )}

      {/* Header */}
      <div>
        <h3 className="text-[17px] font-bold text-white mb-3">{plan.name}</h3>
        <div className="flex items-end gap-1.5">
          <span className="text-[36px] font-bold text-white leading-none">{plan.price}</span>
          <span className="text-[13px] text-white/35 mb-1">/{plan.period}</span>
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-col gap-2 flex-1">
        {plan.features.map((f) => (
          <div key={f} className="flex items-start gap-2.5 text-[13px] text-white/70">
            <BsCheckLg className="text-emerald-400 shrink-0 mt-0.5 text-[12px]" /> {f}
          </div>
        ))}
        {plan.missing.map((f) => (
          <div key={f} className="flex items-start gap-2.5 text-[13px] text-white/25 line-through">
            <BsXLg className="text-white/20 shrink-0 mt-0.5 text-[11px]" /> {f}
          </div>
        ))}
      </div>

      {/* CTA */}
{plan.price === "$0" ? (
  <Link
    href={plan.href}
    className={`w-full text-center text-[14px] font-semibold py-2.5 rounded-xl transition-all duration-200 active:scale-[0.98] ${c.btn}`}
  >
    {plan.cta}
  </Link>
) : (
  <form action="/api/checkout_sessions" method="POST">
    <input type="hidden" name="plan_id" value={plan.id} />
    <button
      type="submit"
      className={`w-full text-center text-[14px] font-semibold py-2.5 rounded-xl transition-all duration-200 active:scale-[0.98] ${c.btn}`}
    >
      {plan.cta}
    </button>
  </form>
)}
    </div>
  );
}

// ── FAQ Item ──────────────────────────────────────────────────────────────────

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/6 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-[14px] font-medium text-white/80">{q}</span>
        <BsChevronDown className={`text-white/30 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <p className="text-[13px] text-white/45 leading-relaxed pb-4">
          {a}
        </p>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [tab, setTab] = useState("seeker");
  const plans = tab === "seeker" ? SEEKER_PLANS : RECRUITER_PLANS;

  return (
    <div className="min-h-screen bg-[#0d0d14] px-4 sm:px-6 py-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-14">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-[32px] sm:text-[42px] font-bold text-white tracking-tight leading-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-[15px] text-white/40 max-w-lg mx-auto leading-relaxed">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center mt-2">
            <div className="flex bg-white/[0.04] border border-white/8 rounded-xl p-1 gap-1">
              {["seeker", "recruiter"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 capitalize
                    ${tab === t
                      ? "bg-violet-600 text-white shadow-sm"
                      : "text-white/40 hover:text-white"
                    }`}
                >
                  For {t === "seeker" ? "Job Seekers" : "Recruiters"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Plans Grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* ── Money back guarantee ────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-3 bg-white/[0.02] border border-white/6 rounded-2xl px-6 py-4">
          <BsCheckLg className="text-emerald-400 text-[18px] shrink-0" />
          <p className="text-[13px] text-white/50 text-center">
            All paid plans come with a{" "}
            <span className="text-white font-medium">14-day money-back guarantee</span>.
            No questions asked.
          </p>
        </div>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[22px] font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="bg-[#12121e] border border-white/8 rounded-2xl px-6">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}