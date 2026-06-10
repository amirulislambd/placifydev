import CompanyRegistrationsTable from "@/components/dashboard/CompanyRegistrationsTable";
import { getCompanies } from "@/lib/api/companies";
import React from "react";

const AdminCompaniesPage = async () => {
  const companies = await getCompanies();

  return (
    <div className="min-h-screen bg-[#121212] p-6 md:p-10 font-sans text-zinc-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Console</h1>
          <p className="text-sm text-zinc-400">
            Total registered companies: {companies.length}
          </p>
        </div>
      </div>

      <CompanyRegistrationsTable initialCompanies={companies} />
    </div>
  );
};

export default AdminCompaniesPage;
