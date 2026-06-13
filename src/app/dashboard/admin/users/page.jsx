import RoleBadge from "@/components/dashboard/admin/RoleBadge";
import StatsCard from "@/components/dashboard/admin/StatsCard";
import StatusBadge from "@/components/dashboard/admin/StatusBadge";
import UserActions from "@/components/dashboard/admin/UserActions";
import UserAvatar from "@/components/dashboard/admin/UserAvatar";
import { getUsersList } from "@/lib/api/users";


// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(date) {
  if (!date) return "—";
  const d = new Date(date.$date || date);
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

const PAGE_SIZE = 10;

export default async function AdminUsersPage({ searchParams }) {
  const sp   = await searchParams;
  const page = Number(sp?.page) || 1;

  const data  = await getUsersList({ page, limit: PAGE_SIZE });
  const users = data.users || [];
  const total = data.total || users.length;

  // ── Stats (replace with real aggregation from API) ────────────────
  const stats = {
    totalActive:      data.totalActive      ?? total,
    recruiterGrowth:  data.recruiterGrowth  ?? "—",
    suspended:        data.suspended        ?? 0,
    newSignups24h:    data.newSignups24h    ?? 0,
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE + 1;
  const end   = Math.min(page * PAGE_SIZE, total);

  return (
    <div className="p-4 sm:p-6 bg-[#0d0d14] min-h-screen text-zinc-100">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight mb-1">
            User Management
          </h1>
          <p className="text-[14px] text-white/40">
            Review, filter, and manage platform access for all users.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white/[0.04] border border-white/10 text-white/70 hover:text-white hover:border-white/20 text-[13px] font-medium px-4 py-2 rounded-xl transition-all">
            All Roles
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <button className="bg-white text-[#0d0d14] text-[13px] font-semibold px-4 py-2 rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all">
            Export List
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatsCard
          label="Total Active Users"
          value={stats.totalActive.toLocaleString()}
          sub="+12% vs last month"
          subColor="text-emerald-400"
        />
        <StatsCard
          label="Recruiter Growth"
          value={stats.recruiterGrowth.toLocaleString?.() ?? stats.recruiterGrowth}
          sub="High demand"
          subColor="text-emerald-400"
        />
        <StatsCard
          label="Suspended Accounts"
          value={stats.suspended.toLocaleString()}
          sub="0.8% of total"
          subColor="text-white/35"
        />
        <StatsCard
          label="New Signups (24h)"
          value={stats.newSignups24h.toLocaleString()}
          sub="Steady activity"
          subColor="text-amber-400"
        />
      </div>

      {/* Table */}
      <div className="bg-[#16161f] border border-white/8 rounded-2xl overflow-hidden">

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/8">
                <th className="px-6 py-3.5 text-[12px] font-medium text-white/40">User Name</th>
                <th className="px-6 py-3.5 text-[12px] font-medium text-white/40">Email Address</th>
                <th className="px-6 py-3.5 text-[12px] font-medium text-white/40">Role</th>
                <th className="px-6 py-3.5 text-[12px] font-medium text-white/40">Join Date</th>
                <th className="px-6 py-3.5 text-[12px] font-medium text-white/40">Status</th>
                <th className="px-6 py-3.5 text-[12px] font-medium text-white/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-white/35 text-[13px]">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id?.$oid || user._id} className="border-b border-white/6 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <UserAvatar name={user.name} image={user.image} />
                        <span className="text-[14px] font-medium text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-[13px] text-white/45">{user.email}</td>
                    <td className="px-6 py-3.5"><RoleBadge role={user.role} /></td>
                    <td className="px-6 py-3.5 text-[13px] text-white/45">{formatDate(user.createdAt)}</td>
                    <td className="px-6 py-3.5"><StatusBadge status={user.status || "active"} /></td>
                    <td className="px-6 py-3.5"><UserActions user={user} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden flex flex-col divide-y divide-white/6">
          {users.length === 0 ? (
            <div className="px-4 py-10 text-center text-white/35 text-[13px]">No users found.</div>
          ) : (
            users.map((user) => (
              <div key={user._id?.$oid || user._id} className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <UserAvatar name={user.name} image={user.image} />
                    <div>
                      <p className="text-[14px] font-medium text-white">{user.name}</p>
                      <p className="text-[12px] text-white/40">{user.email}</p>
                    </div>
                  </div>
                  <StatusBadge status={user.status || "active"} />
                </div>
                <div className="flex items-center justify-between">
                  <RoleBadge role={user.role} />
                  <span className="text-[12px] text-white/40">{formatDate(user.createdAt)}</span>
                </div>
                <div className="border-t border-white/6 pt-3">
                  <UserActions user={user} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-t border-white/8">
          <span className="text-[12px] text-white/35">
            Showing {start} to {end} of {total.toLocaleString()} users
          </span>

          <div className="flex items-center gap-1">
            <a
              href={`?page=${Math.max(1, page - 1)}`}
              className={`w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors ${page <= 1 ? "opacity-30 pointer-events-none" : ""}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6" /></svg>
            </a>

            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`?page=${p}`}
                className={`w-7 h-7 flex items-center justify-center rounded-lg text-[12px] font-medium transition-colors ${
                  p === page ? "bg-white text-[#0d0d14]" : "text-white/45 hover:text-white hover:bg-white/5"
                }`}
              >
                {p}
              </a>
            ))}

            {totalPages > 3 && (
              <>
                <span className="text-white/30 text-[12px] px-1">…</span>
                <a
                  href={`?page=${totalPages}`}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg text-[12px] font-medium transition-colors ${
                    page === totalPages ? "bg-white text-[#0d0d14]" : "text-white/45 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {totalPages}
                </a>
              </>
            )}

            <a
              href={`?page=${Math.min(totalPages, page + 1)}`}
              className={`w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors ${page >= totalPages ? "opacity-30 pointer-events-none" : ""}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6" /></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}