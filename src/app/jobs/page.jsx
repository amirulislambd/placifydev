// app/jobs/page.jsx — Server Component
import { Suspense } from "react";
import JobCard from "@/components/jobs/Jobcard";
import { getJobs } from "@/lib/api/getJobs";
import JobsFilter from "@/components/jobs/Jobsfilter";

function filterJobs(jobs, { q, category, jobType, workMode, salary }) {
  return jobs.filter((job) => {

    // ── Search query ───────────────────────────────────────────────────────
    if (q) {
      const query = q.toLowerCase();
      const match =
        job.jobTitle?.toLowerCase().includes(query) ||
        job.companyName?.toLowerCase().includes(query) ||
        job.category?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query);
      if (!match) return false;
    }

    // ── Category ───────────────────────────────────────────────────────────
    if (category && category !== "All") {
      if (job.category?.toLowerCase() !== category.toLowerCase()) return false;
    }

    // ── Job Type ───────────────────────────────────────────────────────────
    if (jobType && jobType !== "All") {
      if (job.jobType?.toLowerCase() !== jobType.toLowerCase()) return false;
    }

    // ── Work Mode — DB তে "remote" lowercase তাই normalize করছি ──────────
    if (workMode && workMode !== "All") {
      if (job.workMode?.toLowerCase() !== workMode.toLowerCase()) return false;
    }

    // ── Salary — DB তে string তাই Number() দিয়ে parse করছি ───────────────
    if (salary) {
      const [min, max] = salary.split("-").map(Number);
      const jobMin = Number(job.minSalary) || 0;
      const jobMax = Number(job.maxSalary) || 0;
      if (jobMin < min || jobMax > max) return false;
    }

    return true;
  });
}

export default async function JobsPage({ searchParams }) {
  // Next.js 15+ এ searchParams async, await করতে হবে
  const params = await searchParams;

  const allJobs = await getJobs();

  const filters = {
    q:        params?.q        || "",
    category: params?.category || "",
    jobType:  params?.jobType  || "",
    workMode: params?.workMode || "",
    salary:   params?.salary   || "",
  };

  const filteredJobs = filterJobs(allJobs, filters);

  return (
    <section className="bg-[#0d0d14] min-h-screen px-4 sm:px-6 py-12">
      <div className="max-w-screen-xl mx-auto">

        <div className="mb-8">
          <h1 className="text-[28px] sm:text-[34px] font-bold text-white tracking-tight mb-2">
            Browse Jobs
          </h1>
          <p className="text-[14px] text-white/40">
            Find your next developer role from top companies.
          </p>
        </div>

        <Suspense fallback={null}>
          <JobsFilter totalJobs={filteredJobs.length} />
        </Suspense>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[16px] text-white/35">
              No jobs found matching your filters.
            </p>
            <p className="text-[13px] text-white/20 mt-1">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job, i) => (
              <JobCard key={`${job._id}-${i}`} job={job} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}