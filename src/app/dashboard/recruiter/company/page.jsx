import React from "react";
import CompanyProfile from "./CompanyProfile";
import { getSessionUser } from "@/lib/core/session";

const CompanyPage = async () => {
  const user = await getSessionUser();
  console.log(user);

  return (
    <div>
      <CompanyProfile recruiter={user} />
    </div>
  );
};

export default CompanyPage;
