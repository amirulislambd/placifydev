import { Suspense } from "react";
import Link from "next/link";
import JobCard from "@/components/jobs/Jobcard";
import { getJobs } from "@/lib/api/getJobs";
import JobsFilter from "@/components/jobs/Jobsfilter";
import { Pagination } from "@heroui/react";

const PAGE_SIZE = 9;

export default async function JobsPage({ searchParams }) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;

  const filters = {
    q: params?.q || "",
    category: params?.category || "",
    jobType: params?.jobType || "",
    workMode: params?.workMode || "",
    salary: params?.salary || "",
    page,
    limit: PAGE_SIZE,
  };

  const { jobs: filteredJobs, total } = await getJobs(filters);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const buildPageUrl = (p) => {
    const sp = new URLSearchParams(params);
    sp.set("page", p);
    return `/jobs?${sp.toString()}`;
  };

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
          <JobsFilter totalJobs={total} />
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobs.map((job, i) => (
                <JobCard key={`${job._id}-${i}`} job={job} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                {/* Previous */}
                <Link
                  href={buildPageUrl(page - 1)}
                  className={`px-3 py-1.5 rounded-lg text-[13px] border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all ${page <= 1 ? "pointer-events-none opacity-30" : ""}`}
                >
                  ← Prev
                </Link>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      p === 1 || p === totalPages || Math.abs(p - page) <= 1,
                  )
                  .reduce((acc, p, idx, arr) => {
                    if (idx > 0 && p - arr[idx - 1] > 1) acc.push("ellipsis");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === "ellipsis" ? (
                      <span
                        key={`e-${i}`}
                        className="text-white/30 text-[13px]"
                      >
                        …
                      </span>
                    ) : (
                      <Link
                        key={p}
                        href={buildPageUrl(p)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-medium transition-all
              ${
                p === page
                  ? "bg-violet-600 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5 border border-white/10"
              }`}
                      >
                        {p}
                      </Link>
                    ),
                  )}

                {/* Next */}
                <Link
                  href={buildPageUrl(page + 1)}
                  className={`px-3 py-1.5 rounded-lg text-[13px] border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all ${page >= totalPages ? "pointer-events-none opacity-30" : ""}`}
                >
                  Next →
                </Link>

                {/* Summary */}
                <span className="ml-4 text-[12px] text-white/30">
                  {(page - 1) * PAGE_SIZE + 1}–
                  {Math.min(page * PAGE_SIZE, total)} of {total}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
