"use client";

import { useState } from "react";

const plans = [
  {
    icon: "👑",
    name: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    desc: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    featured: false,
  },
  {
    icon: "📈",
    name: "Growth",
    monthlyPrice: 17,
    yearlyPrice: 13,
    desc: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    featured: false,
  },
  {
    icon: "⚡",
    name: "Premium",
    monthlyPrice: 99,
    yearlyPrice: 74,
    desc: "Start building your insights hub:",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    featured: true,
  },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="bg-[#07070f] py-16 px-6 flex flex-col items-center gap-6">
      {/* Badge */}
      <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-violet-400">
        <span className="w-1.5 h-1.5 bg-violet-400 rounded-sm inline-block" />
        Pricing
        <span className="w-1.5 h-1.5 bg-violet-400 rounded-sm inline-block" />
      </div>

      {/* Title */}
      <h2 className="text-3xl font-medium text-white text-center leading-snug">
        Pay for the leverage,<br />not the listings
      </h2>

      {/* Toggle */}
      <div className="flex items-center gap-1 bg-[#13131f] border border-[#2a2a3e] rounded-full p-1">
        <button
          onClick={() => setIsYearly(false)}
          className={`px-4 py-1.5 rounded-full text-sm transition-all ${
            !isYearly
              ? "bg-white text-[#07070f] font-medium"
              : "text-zinc-500 bg-transparent"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setIsYearly(true)}
          className={`px-4 py-1.5 rounded-full text-sm flex items-center gap-2 transition-all ${
            isYearly
              ? "bg-white text-[#07070f] font-medium"
              : "text-zinc-500 bg-transparent"
          }`}
        >
          Yearly
          <span className="bg-violet-600 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
            25%
          </span>
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-3xl">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-[#0e0e1a] rounded-2xl p-5 flex flex-col gap-3 ${
              plan.featured
                ? "border border-violet-700"
                : "border border-[#222235]"
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-zinc-200">
                {plan.icon} {plan.name}
              </p>
              <div className="text-right">
                <span className="text-xl font-medium text-white">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-[11px] text-zinc-600">/month</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-600">{plan.desc}</p>

            {/* Features */}
            <div className="flex flex-col gap-2 flex-1">
              {plan.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-2 text-[11px] text-zinc-400"
                >
                  <span className="text-violet-500 mt-0.5">+</span>
                  {feature}
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              className={`w-full mt-1 py-2.5 px-4 rounded-xl text-xs flex items-center justify-between transition-colors ${
                plan.featured
                  ? "border border-violet-700 text-violet-400 hover:border-violet-500 hover:text-violet-300"
                  : "border border-[#2a2a3e] text-zinc-400 hover:border-violet-700 hover:text-white"
              } bg-transparent`}
            >
              Choose this plan
              <span>→</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}