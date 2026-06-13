export default function StatusBadge({ status, banned }) {
  const isBanned = banned === true || status === "suspended";

  const map = {
    active:    { label: "Active",    dot: "bg-emerald-400 animate-pulse", text: "text-emerald-400" },
    suspended: { label: "Suspended", dot: "bg-red-400",                   text: "text-red-400"     },
  };

  const current = isBanned ? map.suspended : map.active;

  return (
    <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium ${current.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      {current.label}
    </span>
  );
}