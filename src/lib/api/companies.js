"use server"

import { protectedFetch, serverFetch } from "../core/serverMutation";
import { getSessionUser } from "../core/session";

export const getCompanies = async () => {
  return await protectedFetch("companies");
};

export const getRecruiterCompany =async(recruiterId)=>{
    return await serverFetch(`my/companies?recruiterId=${recruiterId}`)
}

export const getLoggedInRecruiterCompany =async()=>{
    const user = await getSessionUser();
    return await getRecruiterCompany(user.id);
}