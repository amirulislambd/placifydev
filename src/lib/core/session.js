import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getSessionUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
};

export const getToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.session?.token || null;
};


export const RequireRole = async (role) => {
  const user = await getSessionUser();
  if (!user) {
    return redirect("/signin");
  }
  if (user?.role !== role) {
    redirect("/unauthorized");
  }

  return user;
};
