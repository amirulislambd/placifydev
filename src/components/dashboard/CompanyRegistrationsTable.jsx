"use client";

import React, { useState } from "react";
import { Table, Button, Avatar } from "@heroui/react";
import { updateCompany } from "@/lib/action/companies";
import toast from "react-hot-toast";
import Link from "next/link";

export default function CompanyRegistrationsTable({ initialCompanies }) {
  const [companies, setCompanies] = useState(initialCompanies || []);

  // Action Handler (Approve / Reject)
  // Action Handler (Approve / Reject)
  const handleAction = async (id, newStatus) => {
    const previousCompanies = [...companies];
    const company = companies.find((c) => (c._id?.$oid || c._id) === id);
    const companyName = company?.companyName || "Company";

    setCompanies((prev) =>
      prev.map((c) =>
        c._id === id || c._id?.$oid === id ? { ...c, status: newStatus } : c,
      ),
    );

    try {
      const updateCompanyStatus = await updateCompany(id, {
        status: newStatus,
      });

      if (updateCompanyStatus?.modifiedCount > 0) {
        toast.success(
          `${companyName} ${newStatus === "approved" ? "approved" : "rejected"} successfully!`,
        );
      } else {
        toast.error(
          `Failed to ${newStatus === "approved" ? "approve" : "reject"} ${companyName}!`,
        );
      }
      console.log(`Company ID: ${id} status updated to: ${newStatus}`);
    } catch (error) {
      console.error("Failed to update status on server:", error);
      setCompanies(previousCompanies);
      toast.error(`Failed to update ${companyName} status!`);
    }
  };
  return (
    <div className="w-full text-zinc-100 font-sans">
      {/* ----------------------------------------------------
           desktop
         ---------------------------------------------------- */}
      <div className="hidden md:block bg-[#1c1c1e] p-6 rounded-xl border border-zinc-800/80 shadow-2xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-zinc-100">
            Company Registrations
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Review and manage corporate entity access requests for the HireLoop
            ecosystem.
          </p>
        </div>

        <Table
          aria-label="Company Registrations Table"
          className="bg-[#1c1c1e]"
        >
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.Column
                  isRowHeader
                  className="bg-[#242426] text-zinc-400 font-medium py-3"
                >
                  COMPANY NAME
                </Table.Column>
                <Table.Column className="bg-[#242426] text-zinc-400 font-medium py-3">
                  WEBSITE
                </Table.Column>
                <Table.Column className="bg-[#242426] text-zinc-400 font-medium py-3">
                  INDUSTRY
                </Table.Column>
                <Table.Column className="bg-[#242426] text-zinc-400 font-medium py-3">
                  JOBS COUNT
                </Table.Column>
                <Table.Column className="bg-[#242426] text-zinc-400 font-medium py-3">
                  STATUS
                </Table.Column>
                <Table.Column className="bg-[#242426] text-zinc-400 font-medium py-3">
                  DATE SUBMITTED
                </Table.Column>
                <Table.Column className="bg-[#242426] text-zinc-400 font-medium py-3 text-right">
                  ACTIONS
                </Table.Column>
              </Table.Header>

              <Table.Body emptyContent={"No companies found"}>
                {companies.map((company) => {
                  const companyId = company._id?.$oid || company._id;
                  const dateSubmitted =
                    company.createdAt?.$date || company.createdAt;
                  const formattedDate = dateSubmitted
                    ? new Date(dateSubmitted).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A";
                  const companyName =
                    company.companyName || company.name || "Unknown Company";

                  return (
                    <Table.Row
                      key={companyId}
                      className="border-b border-zinc-800/50 hover:bg-[#242426]/30 transition-colors"
                    >
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <Avatar
                            radius="md"
                            className="w-8 h-8 bg-zinc-800 flex-shrink-0"
                          >
                            <Avatar.Image
                              src={company.logo}
                              alt={companyName}
                            />
                            <Avatar.Fallback
                              name={companyName.substring(0, 2).toUpperCase()}
                              className="text-xs bg-zinc-700 text-zinc-300 font-bold"
                            />
                          </Avatar>
                          <span className="text-zinc-200 font-medium text-sm">
                            {companyName}
                          </span>
                        </div>
                      </Table.Cell>

                      <Table.Cell>
                        <a
                          href={company.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-400 hover:text-zinc-200 underline text-sm"
                        >
                          Visit Website
                        </a>
                      </Table.Cell>

                      <Table.Cell>
                        <span className="px-2 py-0.5 bg-zinc-800 text-zinc-300 text-xs rounded-md font-mono">
                          {company.industry || "N/A"}
                        </span>
                      </Table.Cell>

                      <Table.Cell>
                        <span className="px-2 py-0.5 bg-zinc-800 text-zinc-300 text-xs rounded-md font-mono">
                          {company.jobCount || "N/A"}
                        </span>
                      </Table.Cell>

                      <Table.Cell>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${company.status === "approved" ? "bg-emerald-500" : company.status === "rejected" ? "bg-rose-500" : "bg-amber-500"}`}
                          />
                          <span
                            className={`text-xs font-semibold capitalize ${company.status === "approved" ? "text-emerald-500" : company.status === "rejected" ? "text-rose-500" : "text-amber-500"}`}
                          >
                            {company.status}
                          </span>
                        </div>
                      </Table.Cell>

                      <Table.Cell className="text-zinc-400 text-sm">
                        {formattedDate}
                      </Table.Cell>

                      <Table.Cell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {company.status !== "approved" && (
                            <Button
                              size="sm"
                              variant="flat"
                              className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white font-medium rounded-md text-xs px-3 h-8"
                              onClick={() =>
                                handleAction(companyId, "approved")
                              }
                            >
                              Approve
                            </Button>
                          )}
                          {company.status !== "rejected" && (
                            <Button
                              size="sm"
                              variant="flat"
                              className="bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-medium rounded-md text-xs px-3 h-8"
                              onClick={() =>
                                handleAction(companyId, "rejected")
                              }
                            >
                              Reject
                            </Button>
                          )}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
          <Table.Footer />
        </Table>
      </div>

      {/* ----------------------------------------------------
          (md:hidden)
         ---------------------------------------------------- */}
      <div className="block md:hidden space-y-4">
        {companies.length === 0 ? (
          <div className="bg-[#1c1c1e] text-center p-8 rounded-xl border border-zinc-800 text-zinc-400">
            No companies found
          </div>
        ) : (
          companies.map((company) => {
            const companyId = company._id?.$oid || company._id;
            const dateSubmitted = company.createdAt?.$date || company.createdAt;
            const formattedDate = dateSubmitted
              ? new Date(dateSubmitted).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "N/A";
            const companyName =
              company.companyName || company.name || "Unknown Company";

            return (
              <div
                key={companyId}
                className="bg-[#1c1c1e] p-5 rounded-xl border border-zinc-800/80 shadow-lg flex flex-col gap-4"
              >
                <div className="flex items-start justify-between border-b border-zinc-800/60 pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar
                      radius="md"
                      className="w-10 h-10 bg-zinc-800 flex-shrink-0"
                    >
                      <Avatar.Image src={company.logo} alt={companyName} />
                      <Avatar.Fallback
                        name={companyName.substring(0, 2).toUpperCase()}
                        className="text-sm bg-zinc-700 text-zinc-300 font-bold"
                      />
                    </Avatar>
                    <div>
                      <h3 className="text-zinc-200 font-semibold text-base">
                        {companyName}
                      </h3>
                      <p className="text-xs text-zinc-500">
                        Submitted: {formattedDate}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${
                      company.status === "approved"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : company.status === "rejected"
                          ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {company.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-zinc-400">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">
                      Industry
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-zinc-800 text-zinc-300 text-xs rounded font-mono">
                      {company.industry || "N/A"}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">
                      Website
                    </p>
                    <Link
                      href={company.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-1 text-sky-400 hover:underline text-sm break-all"
                      alt={company.websiteUrl}
                    >
                      Visit Website
                    </Link>
                    {company.jobCount > 0 && (
                      <p className="text-xs text-zinc-500 mt-1">
                        AVAILABLE JOBS: {company.jobCount}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/40">
                  {company.status !== "approved" && (
                    <Button
                      size="sm"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg h-9"
                      onClick={() => handleAction(companyId, "approved")}
                    >
                      Approve
                    </Button>
                  )}
                  {company.status !== "rejected" && (
                    <Button
                      size="sm"
                      variant="flat"
                      className="flex-1 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-medium rounded-lg h-9"
                      onClick={() => handleAction(companyId, "rejected")}
                    >
                      Reject
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
