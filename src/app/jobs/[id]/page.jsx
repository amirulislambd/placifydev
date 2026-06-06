import { getJobById } from "@/lib/api/getJobs";
import Link from "next/link";
import {
  BsBriefcase,
  BsGeoAlt,
  BsCurrencyDollar,
  BsCalendar3,
  BsPeopleFill,
  BsCheckCircle,
  BsArrowLeft,
  BsClock,
} from "react-icons/bs";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatSalary(min, max, currency) {
  const fmt = (n) => Number(n).toLocaleString();
  return `${currency} ${fmt(min)} – ${fmt(max)}`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function daysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ── Badge ─────────────────────────────────────────────────────────────────────

function Badge({ children, color = "default" }) {
  const colors = {
    default: "bg-white/[0.06] text-white/60 border-white/8",
    violet: "bg-violet-500/15 text-violet-300 border-violet-500/20",
    green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    blue: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium border ${colors[color]}`}
    >
      {children}
    </span>
  );
}

// ── Info Row ──────────────────────────────────────────────────────────────────

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] text-white/30 uppercase tracking-wider">
        {label}
      </span>
      <div className="flex items-center gap-2 text-[14px] text-white/80">
        <span className="text-violet-400 shrink-0">{icon}</span>
        {value}
      </div>
    </div>
  );
}

// ── Section Block ─────────────────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[16px] font-semibold text-white border-b border-white/6 pb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}

// ── Bullet list parser ────────────────────────────────────────────────────────

function BulletList({ text }) {
  const items =
    text
      ?.split(/[.,]+/)
      .map((s) => s.trim())
      .filter(Boolean) || [];
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2.5 text-[14px] text-white/65 leading-relaxed"
        >
          <BsCheckCircle className="text-violet-400 mt-0.5 shrink-0 text-[13px]" />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const JobDetailsPage = async ({ params }) => {
  const param = await params;
  const id = param.id;
  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="min-h-screen bg-[#0d0d14] flex items-center justify-center">
        <p className="text-white/40 text-[15px]">Job not found.</p>
      </div>
    );
  }

  const remaining = daysUntil(job.deadline);
  const deadlineColor =
    remaining <= 3 ? "amber" : remaining <= 7 ? "blue" : "green";

  return (
    <div className="min-h-screen bg-[#0d0d14] px-4 sm:px-6 py-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* ── Back ───────────────────────────────────────────────────────── */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white transition-colors w-fit"
        >
          <BsArrowLeft /> Back to Jobs
        </Link>

        {/* ── Header Card ────────────────────────────────────────────────── */}
        <div className="bg-[#12121e] border border-white/8 rounded-2xl p-6 sm:p-8 flex flex-col gap-5">
          {/* Company + Title */}
          <div className="flex items-start gap-4">
            {/* Company avatar */}
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/20 flex items-center justify-center shrink-0">
              <span className="text-[18px] font-bold text-violet-300">
                {job.companyName?.[0] || "C"}
              </span>
            </div>

            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <p className="text-[13px] text-white/40">{job.companyName}</p>
              <h1 className="text-[22px] sm:text-[26px] font-bold text-white leading-tight">
                {job.jobTitle}
              </h1>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-1">
                <Badge color="violet">
                  <BsBriefcase className="text-[11px]" /> {job.jobType}
                </Badge>
                <Badge color="default">
                  <HiOutlineOfficeBuilding className="text-[11px]" />
                  {job.workMode?.charAt(0).toUpperCase() +
                    job.workMode?.slice(1)}
                </Badge>
                <Badge color={deadlineColor}>
                  <BsClock className="text-[11px]" />
                  {remaining > 0 ? `${remaining} days left` : "Deadline passed"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/6 pt-5">
            <InfoItem
              icon={<BsGeoAlt />}
              label="Location"
              value={job.location}
            />
            <InfoItem
              icon={<BsCurrencyDollar />}
              label="Salary / mo"
              value={formatSalary(job.minSalary, job.maxSalary, job.currency)}
            />
            <InfoItem
              icon={<BsBriefcase />}
              label="Category"
              value={job.category}
            />
            <InfoItem
              icon={<BsCalendar3 />}
              label="Deadline"
              value={formatDate(job.deadline)}
            />
          </div>

          {/* Apply CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t border-white/6 pt-5">
            <button className="flex-1 sm:flex-none bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white font-semibold text-[15px] px-8 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
              Apply Now
            </button>
            <button className="flex-1 sm:flex-none bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/70 hover:text-white text-[14px] px-6 py-3 rounded-xl transition-all duration-200">
              Save Job
            </button>
            <p className="text-[12px] text-white/25 sm:ml-auto self-center text-center sm:text-right">
              Posted {formatDate(job.createdAt?.$date || job.createdAt)}
            </p>
          </div>
        </div>

        {/* ── Body: two-column on desktop ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — main content */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-[#12121e] border border-white/8 rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
              <Section title="Responsibilities">
                <BulletList text={job.responsibilities} />
              </Section>

              <Section title="Requirements">
                <BulletList text={job.requirements} />
              </Section>

              {job.benefits && (
                <Section title="Benefits">
                  <BulletList text={job.benefits} />
                </Section>
              )}
            </div>
          </div>

          {/* Right — sidebar */}
          <div className="flex flex-col gap-4">
            {/* Company card */}
            <div className="bg-[#12121e] border border-white/8 rounded-2xl p-5 flex flex-col gap-4">
              <h3 className="text-[13px] text-white/40 uppercase tracking-wider">
                About Company
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet-600/20 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <span className="text-[15px] font-bold text-violet-300">
                    {job.companyName?.[0]}
                  </span>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-white">
                    {job.companyName}
                  </p>
                  <p className="text-[12px] text-white/35">{job.category}</p>
                </div>
              </div>
              <Link
                href={`/companies/${job.companyId}`}
                className="w-full text-center text-[13px] text-violet-400 hover:text-violet-300 border border-violet-500/20 hover:border-violet-500/40 py-2 rounded-lg transition-all"
              >
                View Company →
              </Link>
            </div>

            {/* Quick Info card */}
            <div className="bg-[#12121e] border border-white/8 rounded-2xl p-5 flex flex-col gap-3">
              <h3 className="text-[13px] text-white/40 uppercase tracking-wider">
                Job Overview
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Job Type", value: job.jobType },
                  { label: "Work Mode", value: job.workMode },
                  { label: "Category", value: job.category },
                  { label: "Deadline", value: formatDate(job.deadline) },
                  {
                    label: "Salary",
                    value: `${job.currency} ${Number(job.minSalary).toLocaleString()}–${Number(job.maxSalary).toLocaleString()}`,
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="text-[12px] text-white/35">{label}</span>
                    <span className="text-[12px] text-white/75 font-medium text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Apply */}
            <div className="bg-violet-600/10 border border-violet-500/20 rounded-2xl p-5 flex flex-col gap-3">
              <p className="text-[13px] text-white/50 leading-relaxed">
                Interested in this role? Apply before{" "}
                <span className="text-white font-medium">
                  {formatDate(job.deadline)}
                </span>
                .
              </p>
              <button className="w-full bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white font-semibold text-[14px] py-2.5 rounded-xl transition-all duration-200">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
