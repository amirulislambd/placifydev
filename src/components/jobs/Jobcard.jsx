// JobCard.jsx — Server Component
import { Card } from "@heroui/react";
import Link from "next/link";

function formatSalary(min, max, currency) {
  const fmt = (n) => Number(n).toLocaleString();
  return `${currency} ${fmt(min)}–${fmt(max)}/hr`;
}

export default function JobCard({ job }) {
  return (
    <Card className="bg-[#1a1a1a] border border-white/8 rounded-2xl hover:border-white/15 transition-all duration-200 group p-5 flex flex-col gap-4">

      {/* Company Logo + Name */}
      <div className="flex items-center gap-2.5">
        {job.companyLogo ? (
          <img
            src={job.companyLogo}
            alt={job.companyName}
            className="w-8 h-8 rounded-lg object-cover border border-white/10 shrink-0"
          />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/20 flex items-center justify-center shrink-0">
            <span className="text-[12px] font-bold text-violet-400">
              {job.companyName?.[0] || "C"}
            </span>
          </div>
        )}
        <span className="text-[12px] text-white/40">{job.companyName}</span>
      </div>

      {/* Title + Description */}
      <Card.Header className="p-0 flex-col items-start gap-1.5">
        <Card.Title className="text-[17px] font-bold text-white leading-snug">
          {job.jobTitle}
        </Card.Title>
        <Card.Description className="text-[13px] text-white/45 leading-relaxed line-clamp-3">
          {job.responsibilities}
        </Card.Description>
      </Card.Header>

      {/* Tags row 1: Location + Work Mode */}
      <Card.Content className="p-0 flex flex-col gap-2">
        <div className="flex items-center flex-wrap gap-2">
          {/* Location */}
          <span className="inline-flex items-center gap-1.5 text-[12px] text-white/55 bg-white/[0.04] border border-white/8 rounded-full px-3 py-1 whitespace-nowrap">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-violet-400 shrink-0">
              <circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/>
            </svg>
            {job.location}
          </span>

          {/* Work Mode */}
          <span className="inline-flex items-center gap-1.5 text-[12px] text-white/55 bg-white/[0.04] border border-white/8 rounded-full px-3 py-1 capitalize whitespace-nowrap">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-violet-400 shrink-0">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
            {job.workMode}
          </span>
        </div>

        {/* Salary row */}
        <div>
          <span className="inline-flex items-center gap-1.5 text-[12px] text-white/55 bg-white/[0.04] border border-white/8 rounded-full px-3 py-1 whitespace-nowrap">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-violet-400 shrink-0">
              <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            {formatSalary(job.minSalary, job.maxSalary, job.currency)}
          </span>
        </div>
      </Card.Content>

      {/* Apply Now */}
      <Card.Footer className="p-0 border-t border-white/6 pt-3 mt-auto">
        <Link
          href={`/jobs/${job._id}`}
          className="inline-flex items-center gap-1.5 text-[13px] text-white/60 hover:text-white transition-all group-hover:gap-2.5"
        >
          Apply Now
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </Card.Footer>

    </Card>
  );
}