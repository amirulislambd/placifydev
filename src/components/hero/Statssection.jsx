"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BsBriefcase, BsBarChart, BsPeopleFill, BsStar } from "react-icons/bs";

// ─── Animated Counter Hook ────────────────────────────────────────────────────

function useCounter(target, duration, start) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    setCount(0);
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, target, duration]);

  return count;
}

// ─── Single Stat Card ─────────────────────────────────────────────────────────

function StatCard({ item, index, shouldAnimate }) {
  const count = useCounter(item.value, 2000, shouldAnimate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="
        relative group
        bg-[#0f0f0f]/80 border border-white/[0.07]
        rounded-2xl p-6 md:p-8
        backdrop-blur-md
        hover:border-purple-500/30 hover:bg-[#141414]/90
        transition-all duration-300
        cursor-default
        overflow-hidden
      "
    >
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl bg-gradient-to-br from-purple-600/10 to-transparent" />

      {/* Icon */}
      <div className="text-gray-400 text-xl mb-6 group-hover:text-purple-400 transition-colors duration-300">
        {item.icon}
      </div>

      {/* Animated Number */}
      <div className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
        {count}
        {item.suffix}
      </div>

      {/* Label */}
      <p className="text-sm text-gray-500 font-medium">{item.label}</p>
    </motion.div>
  );
}

// ─── Stats Section ────────────────────────────────────────────────────────────

export default function StatsSection() {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    {
      icon: <BsBriefcase size={22} />,
      value: 50,
      suffix: "K",
      label: "Active Jobs",
    },
    {
      icon: <BsBarChart size={22} />,
      value: 12,
      suffix: "K",
      label: "Companies",
    },
    {
      icon: <BsPeopleFill size={22} />,
      value: 2,
      suffix: "M",
      label: "Job Seekers",
    },
    {
      icon: <BsStar size={22} />,
      value: 97,
      suffix: "%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[520px] flex flex-col items-center justify-center overflow-hidden py-20 px-4"
    >
      {/* ── Background Image ──────────────────────────────────────────────────
          তোমার globe image বসাতে নিচের style এ path দাও:
          backgroundImage: "url('/images/globe-bg.png')"
          এখন placeholder হিসেবে purple radial gradient আছে।
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0"
      
      >
      
        {/* Star dots effect */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 20% 15%, white, transparent), radial-gradient(1px 1px at 75% 10%, white, transparent), radial-gradient(1px 1px at 55% 5%, white, transparent), radial-gradient(1px 1px at 10% 40%, white, transparent), radial-gradient(1px 1px at 90% 35%, white, transparent)",
          }}
        />
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center gap-14">
        {/* Headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center text-white/80 text-lg md:text-xl font-light max-w-md leading-relaxed"
        >
          Assisting over{" "}
          <span className="text-white font-semibold">15,000 job seekers</span>{" "}
          find their dream positions.
        </motion.p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {stats.map((item, i) => (
            <StatCard
              key={item.label}
              item={item}
              index={i}
              shouldAnimate={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}