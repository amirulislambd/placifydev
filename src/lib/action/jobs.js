"use server";

import { serverMutation } from "../core/serverMutation";

export const createJob = async (newJobData) => {
  return serverMutation("jobs", newJobData);
};
