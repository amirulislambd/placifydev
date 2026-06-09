import { serverFetch } from "../core/serverMutation";

export const getPlanById = async (planId) => {
  return await serverFetch(`plans?plan_id=${planId}`);
};
