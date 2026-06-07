import { getJobById } from "@/lib/api/getJobs";
import { getSessionUser } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import ApplyJob from "./ApplyJob";

const ApplyPage = async ({ params }) => {
  const param = await params;
  const id = param.id;
  const user = await getSessionUser();
const job = await getJobById(id);
  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }
  if (user.role !== "seeker") {
    <div className="h-screen">
      <h1 className="text-5xl">this page is only for seekers</h1>
    </div>;
  }
  return (
    <div>
      <ApplyJob job={job} />
    </div>
  );
};

export default ApplyPage;
