import { getAdminStats } from "./adminStats";
import { getRecruiterStats } from "./recruiterStats";
import { getSeekerStats } from "./seekerStats";
import StatsCard from "./StatsCard";






const STATS_MAP = {
    admin:     getAdminStats,
    recruiter: getRecruiterStats,
    seeker:    getSeekerStats,
};

export default function DashboardStats({ role = "seeker", data = {} }) {
  const getStats = STATS_MAP[role] ?? STATS_MAP.seeker;
  const stats = getStats(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full ">
      {stats.map((stat, i) => (
        <StatsCard key={i} {...stat} />
      ))}
    </div>
  );
}