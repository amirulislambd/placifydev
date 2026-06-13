import { redirect } from "next/navigation";
import { getToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (url) => {
  const res = await fetch(`${baseUrl}/api/${url}`);
  return res.json();
};

export const authHeader = async () => {
  const token = await getToken();
  const header = token ? { authorization: `Bearer ${token}` } : {};
  return header;
};

export const protectedFetch = async (url) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    headers: await authHeader(),
  });

  // handle 401, 403, 500, etc

  return res.json();
};

export const serverMutation = async (url, data, method = "POST") => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });
  // handle 401, 403, 500, etc
  return handleStatusCode(res);
};

const handleStatusCode = (res) => {
  if (res.status === 401) {
    redirect("/unauthorized");
  }
  if (res.status === 403) {
    redirect("/forbidden");
  }
  return res.json();
};
