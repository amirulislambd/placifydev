import { getJobById } from "@/lib/api/getJobs";
import { getSessionUser } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import ApplyJob from "./ApplyJob";
import NotForSeekers from "./Notforseekers ";
import { getApplicationsByaApplicant } from "@/lib/api/application";
import { BsLightningCharge } from "react-icons/bs";
import Link from "next/link";
import { getPlanById } from "@/lib/api/plans";

const ApplyPage = async ({ params }) => {
  const param = await params;
  const id = param.id;

  const user = await getSessionUser();

  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return <NotForSeekers />;
  }

  const [applications, plan, job] = await Promise.all([
    getApplicationsByaApplicant(user.id),
    getPlanById(user?.plan || "seeker_free"),
    getJobById(id),
  ]);
  console.log(plan);
  const used = applications.length;
  const limit = plan?.maxApplicationsPerMonth ?? 3;

  return used >= limit ? (
    <div className="min-h-screen bg-[#0d0d14] flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center gap-6 max-w-sm">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <BsLightningCharge className="text-amber-400 text-3xl" />
        </div>
        <h2 className="text-[22px] font-bold text-white">
          Monthly Limit Reached
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed">
          You've used all{" "}
          <span className="text-white/70 font-medium">
            {limit} applications
          </span>{" "}
          for this month. Upgrade your plan for more applications.
        </p>
        <div className="flex gap-3 w-full">
          <Link
            href="/jobs"
            className="flex-1 text-center text-[13px] text-white/50 hover:text-white border border-white/10 py-2.5 rounded-xl transition-all"
          >
            Browse Jobs
          </Link>
          <Link
            href="/pricing"
            className="flex-1 text-center text-[13px] bg-violet-600 hover:bg-violet-700 text-white font-medium py-2.5 rounded-xl transition-all"
          >
            Upgrade Plan
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <ApplyJob job={job} applicant={user} />
  );
};
 
export default ApplyPage;