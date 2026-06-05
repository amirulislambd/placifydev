const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getJobs = async (companyId) => {
  const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
};
