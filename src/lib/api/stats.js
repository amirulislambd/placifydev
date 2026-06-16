import { protectedFetch } from "../core/serverMutation";

export const getDashboardStats = async () => {
  return await protectedFetch("stats");
};
