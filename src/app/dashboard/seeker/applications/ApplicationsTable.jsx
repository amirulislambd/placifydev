"use client";

import Link from "next/link";
import { Table, Chip, Avatar, Button } from "@heroui/react";
import Image from "next/image";

const statusColorMap = {
  applied: "primary",
  review: "warning",
  shortlisted: "success",
  rejected: "danger",
  offered: "secondary",
};

export default function ApplicationsTable({ applications }) {
  return (
    <>
      {/* 📱 MOBILE VIEW */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {applications.length === 0 ? (
          <div className="text-center py-8 text-default-500 bg-content1 rounded-xl border border-default-200">
            No applications found.
          </div>
        ) : (
          applications.map(
            (item) => (
              console.log(item),
              (
                <div
                  key={item._id}
                  className="bg-content1 border border-default-200 rounded-xl p-4 space-y-4 shadow-sm"
                >
                  {/* Header */}
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-sm overflow-hidden shrink-0 bg-default-200 flex items-center justify-center">
                          <div className="w-9 h-9 rounded-sm overflow-hidden shrink-0 bg-default-200 flex items-center justify-center text-sm font-semibold">
                            {item?.companyLogo || item?.job?.company?.logo ? (
                              <Image
                                src={
                                  item?.companyLogo || item?.job?.company?.logo
                                }
                                alt={item?.companyName || "company logo"}
                                width={36}
                                height={36}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  e.target.parentElement.innerHTML = `<span class="text-sm font-semibold">${(item?.companyName || "?").charAt(0)}</span>`;
                                }}
                              />
                            ) : (
                              <span>
                                {(item?.companyName || "?").charAt(0)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-semibold text-base truncate">
                            {item?.job?.title || item?.jobTitle}
                          </h3>

                          <p className="text-xs text-default-500 truncate">
                            {item?.job?.company?.companyName ||
                              item?.companyName}
                          </p>
                        </div>
                      </div>

                      <Chip
                        size="sm"
                        variant="flat"
                        color={
                          statusColorMap[item?.status?.toLowerCase()] ||
                          "default"
                        }
                        className="capitalize shrink-0"
                      >
                        {item?.status}
                      </Chip>
                    </div>

                    <p className="text-xs text-default-400 mt-1">
                      {item?.job?.jobType} • {item?.job?.workMode}
                    </p>
                  </div>

                  {/* Info */}
                  <div className="flex items-center justify-between border-t border-default-200 pt-3 text-xs">
                    <div>
                      <span className="text-default-500 block">
                        Applied Date
                      </span>

                      <span className="font-medium block mt-1">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <Button
                      as={Link}
                      href={`/applications/${item._id}`}
                      size="sm"
                      color="primary"
                      variant="flat"
                    >
                      Details
                    </Button>
                  </div>
                </div>
              )
            ),
          )
        )}
      </div>

      {/* 🖥️ DESKTOP VIEW */}
      <div className="hidden md:block">
        <Table
          aria-label="Applications Table"
          className="border border-default-200 rounded-xl overflow-hidden"
        >
          <Table.ResizableContainer>
            <Table.Content className="min-w-[850px]">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  id="job"
                  defaultWidth="2fr"
                  minWidth={250}
                >
                  Job Title
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column id="company" defaultWidth="1.5fr" minWidth={180}>
                  Company
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column id="applied" defaultWidth="1fr" minWidth={140}>
                  Applied
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column id="status" defaultWidth="1fr" minWidth={130}>
                  Status
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column id="action" defaultWidth="1fr" minWidth={120}>
                  Action
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {applications.length === 0 ? (
                  <Table.Row>
                    <Table.Cell
                      colSpan={5}
                      className="text-center py-8 text-default-500"
                    >
                      No applications found.
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  applications.map((item) => (
                    <Table.Row
                      key={item._id}
                      className="hover:bg-default-100/40 transition-colors"
                    >
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-sm overflow-hidden shrink-0 bg-default-200 flex items-center justify-center text-sm font-semibold">
                            {item?.companyLogo || item?.job?.company?.logo ? (
                              <Image
                                src={
                                  item?.companyLogo || item?.job?.company?.logo
                                }
                                alt={item?.companyName || "company logo"}
                                width={36}
                                height={36}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  e.target.parentElement.innerHTML = `<span class="text-sm font-semibold">${(item?.companyName || "?").charAt(0)}</span>`;
                                }}
                              />
                            ) : (
                              <span>
                                {(item?.companyName || "?").charAt(0)}
                              </span>
                            )}
                          </div>

                          <div>
                            <h4 className="font-medium">
                              {item?.job?.title || item?.jobTitle}
                            </h4>

                            <p className="text-xs text-default-500">
                              {item?.job?.jobType} • {item?.job?.workMode}
                            </p>
                          </div>
                        </div>
                      </Table.Cell>

                      <Table.Cell>
                        {item?.job?.company?.companyName || item?.companyName}
                      </Table.Cell>

                      <Table.Cell>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </Table.Cell>

                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="flat"
                          color={
                            statusColorMap[item?.status?.toLowerCase()] ||
                            "default"
                          }
                          className="capitalize"
                        >
                          {item?.status}
                        </Chip>
                      </Table.Cell>

                      <Table.Cell>
                        <Button
                          as={Link}
                          href={`/applications/${item._id}`}
                          size="sm"
                          variant="light"
                        >
                          Details
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>
      </div>
    </>
  );
}
