"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation";

export const createCompany = async (newCompanyData) => {
  return serverMutation("companies", newCompanyData);
};

export const updateCompany = async (id, data) => {
  const result = serverMutation(`companies/${id}`, data, "PATCH");
  revalidatePath("/dashboard/admin/companies");
  return result;
};
