export default function StatsCard({ icon, label, value, sub, subType = "neutral" }) {
  const subColor =
    subType === "up" ? "text-emerald-400" :
    subType === "down" ? "text-red-400" :
    "text-white/30";

  return (
    <div className="bg-[#13131f] border border-white/5 rounded-2xl p-5 md:p-6 hover:border-violet-500/35 hover:-translate-y-0.5 transition-all duration-200 cursor-default w-full flex flex-col items-center justify-center">

      <div className="flex flex-col gap-3">
        <div className="text-white/70">{icon}</div>
        
        <div>
          <p className="text-xs text-white/40 mb-1">{label}</p>
          <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">{value}</p>
          {sub && <p className={`text-[11px] mt-1.5 ${subColor}`}>{sub}</p>}
        </div>
      </div>
    </div>
  );
}