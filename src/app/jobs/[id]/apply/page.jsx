import { getJobById } from "@/lib/api/getJobs";
import { getSessionUser } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import ApplyJob from "./ApplyJob";
import NotForSeekers from "./Notforseekers ";

const ApplyPage = async ({ params }) => {
  const param = await params;
  const id = param.id;
  const user = await getSessionUser();
  const job = await getJobById(id);
  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }
  if (user.role !== "seeker") {
    return <NotForSeekers />;
  }
  return (
    <div>
      <ApplyJob job={job} appliedUser={user} />
    </div>
  );
};

export default ApplyPage;
