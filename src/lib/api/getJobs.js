import { serverFetch } from "../core/serverMutation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getJobs = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.q) query.set("q", params.q);
  if (params.category) query.set("category", params.category);
  if (params.jobType) query.set("jobType", params.jobType);
  if (params.workMode) query.set("workMode", params.workMode);
  if (params.salary) query.set("salary", params.salary);
  if (params.page) query.set("page", params.page);
  if (params.limit) query.set("limit", params.limit);
  return await serverFetch(`jobs?${query.toString()}`);
};

export const getFeaturedJobs = async () => {
  return await serverFetch("featured-jobs");
};

export const getJobById = async (id) => {
  return await serverFetch(`jobs/${id}`);
};

export const getCompanyJobs = async (companyId) => {
  const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
};
