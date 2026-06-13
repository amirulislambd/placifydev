import { Person, Briefcase, Shield } from "@gravity-ui/icons";

export default function RoleBadge({ role }) {
  const map = {
    seeker: {
      label: "Seeker",
      icon: <Person className="size-3" />,
      className: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    },
    recruiter: {
      label: "Recruiter",
      icon: <Briefcase className="size-3" />,
      className: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
    },
    admin: {
      label: "Admin",
      icon: <Shield className="size-3" />,
      className: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    },
  };

  const { label, icon, className } = map[role] || {
    label: role,
    icon: <Person className="size-3" />,
    className: "bg-white/5 text-white/40 border border-white/10",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-full ${className}`}>
      {icon}
      {label}
    </span>
  );
}