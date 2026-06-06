import React from "react";
import CompanyProfile from "./CompanyProfile";
import { getSessionUser } from "@/lib/core/session";
import { getRecruiterCompany } from "@/lib/api/companies";

const CompanyPage = async () => {
  const user = await getSessionUser();
  const company = await getRecruiterCompany(user.id);
  // console.log(company, user);

  return (
    <div>
      <CompanyProfile recruiter={user} recruiterCompany={company} />
    </div>
  );
};

export default CompanyPage;
