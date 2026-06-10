const COLOR_MAP = {
  blue: { bg: "bg-blue-400/10", text: "text-blue-400" },
  violet: { bg: "bg-violet-400/10", text: "text-violet-400" },
  green: { bg: "bg-emerald-400/10", text: "text-emerald-400" },
  orange: { bg: "bg-orange-400/10", text: "text-orange-400" },
  red: { bg: "bg-red-400/10", text: "text-red-400" },
  yellow: { bg: "bg-yellow-400/10", text: "text-yellow-400" },
};

export default function CardIcon({ icon: Icon, color = "blue", size = 18 }) {
  const { bg, text } = COLOR_MAP[color] || COLOR_MAP.blue;
  return (
    <div
      className={`w-9 h-9 rounded-[10px] flex items-center justify-center ${bg}`}
    >
      <Icon className={`${text}`} style={{ fontSize: size }} />
    </div>
  );
}
