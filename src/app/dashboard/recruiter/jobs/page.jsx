import React from "react";
import { Chip, Table, Button } from "@heroui/react";

// Gravity UI Icons
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";
import { getJobs } from "@/lib/action/getJobs";

const RecruiterJobs = async () => {
  const jobs = await getJobs();

  return (
    <div className="p-4 md:p-6 bg-[#121212] min-h-screen text-zinc-100">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-zinc-100">Manage All Jobs</h2>
        <p className="text-sm text-zinc-400 mt-1">
          Review, edit, or remove your company's active job posts.
        </p>
      </div>

      {/* 📱 MOBILE VIEW*/}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {jobs.length === 0 ? (
          <div className="text-center py-8 text-zinc-500 bg-[#1c1c1e] rounded-xl border border-zinc-800">
            No jobs posted yet.
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-[#1c1c1e] border border-zinc-800 rounded-xl p-4 space-y-4 shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-zinc-200 text-base">
                    {job.jobTitle}
                  </h3>
                  <Chip
                    color={job.status === "active" ? "success" : "danger"}
                    size="sm"
                    variant="soft"
                    className="capitalize shrink-0"
                  >
                    {job.status}
                  </Chip>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5 capitalize">
                  {job.category} • {job.jobType}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-800/60 pt-3 text-xs">
                <div>
                  <span className="text-zinc-500 block">Work Mode</span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium mt-1 capitalize ${
                      job.workMode === "remote"
                        ? "bg-blue-950/60 text-blue-400 border border-blue-900/40"
                        : "bg-zinc-800 text-zinc-300"
                    }`}
                  >
                    {job.workMode}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-500 block">Deadline</span>
                  <span className="text-zinc-300 font-mono font-medium block mt-1">
                    {job.deadline}
                  </span>
                </div>
              </div>

              {/* Mobile Actions: একটু বড় এবং ক্লিকেবল বাটন */}
              <div className="flex items-center justify-end gap-2 border-t border-zinc-800/60 pt-3">
                <Button
                  isIconOnly
                  size="md"
                  variant="flat"
                  className="bg-zinc-800 text-zinc-300 hover:text-zinc-100 rounded-lg min-w-10 w-10 h-10"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  isIconOnly
                  size="md"
                  variant="flat"
                  className="bg-zinc-800 text-zinc-300 hover:text-amber-400 hover:bg-amber-950/30 rounded-lg min-w-10 w-10 h-10"
                  title="Edit Job"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  isIconOnly
                  size="md"
                  variant="flat"
                  className="bg-zinc-800 text-zinc-300 hover:text-danger hover:bg-danger-950/30 rounded-lg min-w-10 w-10 h-10"
                  title="Delete Job"
                >
                  <TrashBin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🖥️ DESKTOP VIEW*/}
      <div className="hidden md:block">
        <Table
          aria-label="Company jobs management table"
          className="border border-zinc-800 rounded-xl overflow-hidden shadow-xl"
        >
          <Table.ResizableContainer>
            <Table.Content className="min-w-[800px] bg-[#1c1c1e]">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  defaultWidth="2fr"
                  id="title"
                  minWidth={200}
                >
                  Job Title
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1.2fr" id="category" minWidth={130}>
                  Category
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1fr" id="workMode" minWidth={110}>
                  Work Mode
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1.2fr" id="deadline" minWidth={120}>
                  Deadline
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                  Status
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1.5fr" id="actions" minWidth={140}>
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body emptyContent={"No jobs posted yet."}>
                {jobs.map((job) => (
                  <Table.Row
                    key={job._id}
                    className="border-b border-zinc-800/60 hover:bg-zinc-800/30 transition-colors"
                  >
                    <Table.Cell className="font-medium text-zinc-200">
                      {job.jobTitle}
                    </Table.Cell>

                    <Table.Cell className="capitalize text-zinc-400">
                      {job.category}
                    </Table.Cell>

                    <Table.Cell className="capitalize">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          job.workMode === "remote"
                            ? "bg-blue-950/60 text-blue-400 border border-blue-900/40"
                            : "bg-zinc-800 text-zinc-300"
                        }`}
                      >
                        {job.workMode}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="text-zinc-400 font-mono text-sm">
                      {job.deadline}
                    </Table.Cell>

                    <Table.Cell>
                      <Chip
                        color={job.status === "active" ? "success" : "danger"}
                        size="sm"
                        variant="soft"
                        className="capitalize"
                      >
                        {job.status}
                      </Chip>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 min-w-8 w-8 h-8"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-zinc-400 hover:text-amber-400 hover:bg-amber-950/30 min-w-8 w-8 h-8"
                          title="Edit Job"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>

                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-zinc-400 hover:text-danger hover:bg-danger-950/30 min-w-8 w-8 h-8"
                          title="Delete Job"
                        >
                          <TrashBin className="w-4 h-4" />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>
      </div>
    </div>
  );
};

export default RecruiterJobs;
