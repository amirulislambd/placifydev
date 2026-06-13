// StatsCard.jsx — Server Component
export default function StatsCard({ label, value, sub, subColor = "text-white/35" }) {
  return (
    <div className="bg-[#16161f] border border-white/8 rounded-2xl px-5 py-4 flex flex-col gap-2">
      <span className="text-[13px] text-white/45">{label}</span>
      <span className="text-[26px] font-bold text-white tracking-tight">{value}</span>
      {sub && <span className={`text-[12px] ${subColor}`}>{sub}</span>}
    </div>
  );
}