"use server";

import { protectedFetch } from "../core/serverMutation";

export const getApplicationsByaApplicant = async (applicantId) => {
  return protectedFetch(`applications?applicantId=${applicantId}`);
};