import { getFeaturedJobs } from "@/lib/api/getJobs";
import JobCard from "../jobs/Jobcard";
import Link from "next/link";

export default async function FeaturedJobsSection() {
const jobs = await getFeaturedJobs();
console.log(jobs);
  return (
    <section className="bg-[#0d0d14] py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span className="text-[11px] font-semibold text-violet-400 uppercase tracking-[0.15em]">
              Smart Job Discovery
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
          </div>
          <h2 className="text-[32px] sm:text-[40px] font-bold text-white leading-tight max-w-md">
            The roles you'd never find by searching
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard  key={job._id} job={job} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-[14px] font-medium px-6 py-2.5 rounded-full transition-all duration-200"
          >
            View all job open
          </Link>
        </div>

      </div>
    </section>
  );
}