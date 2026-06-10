"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  Input,
  TextArea,
  Button,
  Switch,
  Select,
  Label,
  ListBox,
  toast,
} from "@heroui/react";

// Gravity UI Icons to match style requirements
import { LayoutHeaderCellsLarge, Xmark } from "@gravity-ui/icons";
import { createJob } from "@/lib/action/jobs";
import { useRouter } from "next/navigation";

export default function PostJobForm( {company} ) {


  console.log(company);
  // State configurations
  const [isRemote, setIsRemote] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const [category, setCategory] = useState(new Set([]));
  const [jobType, setJobType] = useState(new Set([]));
  const [location, setLocation] = useState(new Set([]));
  const [currency, setCurrency] = useState(new Set(["USD"]));

  const jobCategories = [
    { label: "Technology", value: "technology" },
    { label: "Design", value: "design" },
    { label: "Marketing", value: "marketing" },
    { label: "Sales", value: "sales" },
  ];


  const jobTypes = [
    { label: "Full-time", value: "full-time" },
    { label: "Part-time", value: "part-time" },
    { label: "Contract", value: "contract" },
    { label: "Internship", value: "internship" },
  ];

  const locations = [
    { label: "New York, USA", value: "new-york" },
    { label: "London, UK", value: "london" },
    { label: "Berlin, Germany", value: "berlin" },
    { label: "Dhaka, Bangladesh", value: "dhaka" },
    { label: "Tokyo, Japan", value: "tokyo" },
  ];

  const currencies = [
    { label: "USD ($)", value: "USD" },
    { label: "EUR (€)", value: "EUR" },
    { label: "GBP (£)", value: "GBP" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    data.category = Array.from(category)[0] || "";
    data.jobType = Array.from(jobType)[0] || "";
    data.location = Array.from(location)[0] || "";
    data.currency = Array.from(currency)[0] || "";

    // Validation matching your requirements
    let validationErrors = {};
    if (!data.jobTitle) validationErrors.jobTitle = "Job title is required";
    if (!data.category) validationErrors.category = "Please select a category";
    if (!data.jobType) validationErrors.jobType = "Please select a job type";
    if (!data.location)
      validationErrors.location = "Please select a primary location";
    if (!data.responsibilities)
      validationErrors.responsibilities = "Responsibilities are required";
    if (!data.requirements)
      validationErrors.requirements = "Requirements are required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    const finalPayload = {
      ...data,
      workMode: isRemote ? "remote" : "on-site",
      companyName: company?.companyName,
      companyId: company?._id,
      companyLogo: company?.logo,
      status: "active",
      isPubliclyVisible: true,
    };

    try {
      const res = await createJob(finalPayload);
      if (res?.insertedId) {
        toast.success("Job posted successfully!");
        e.target.reset();
        setCategory(new Set([]));
        setJobType(new Set([]));
        setLocation(new Set([]));
        router.push("/dashboard/recruiter/jobs");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (company?.status === "pending") {
    return (
      <div className="flex justify-center items-center h-screen bg-[#121212] px-4 font-sans text-center">
        <div className="max-w-md p-6 bg-[#1c1c1e] border border-zinc-800 rounded-xl shadow-2xl">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex justify-center items-center mx-auto mb-4 font-bold text-xl">
            !
          </div>
          <h2 className="text-xl font-semibold text-zinc-100 mb-2">
            Verification Pending
          </h2>
          <p className="text-zinc-400 text-sm">
            Your company profile is currently undergoing review. You will be
            able to post job vacancies as soon as the admin approves your
            account.
          </p>
        </div>
      </div>
    );
  }

  if (company?.status === "rejected") {
    return (
      <div className="flex justify-center items-center h-screen bg-[#121212] px-4 font-sans text-center">
        <div className="max-w-md p-6 bg-[#1c1c1e] border border-zinc-800 rounded-xl shadow-2xl">
          <div className="w-12 h-12 bg-rose-500/10 text-rose-500 rounded-full flex justify-center items-center mx-auto mb-4 font-bold text-xl">
            ✕
          </div>
          <h2 className="text-xl font-semibold text-zinc-100 mb-2">
            Profile Rejected
          </h2>
          <p className="text-zinc-400 text-sm">
            We regret to inform you that your company profile has been rejected.
            Please review your company information or contact support for
            further assistance.
          </p>
        </div>
      </div>
    );
  }

  if (!company || company?.status !== "approved") {
    return (
      <div className="flex justify-center items-center h-screen bg-[#121212] text-zinc-400 font-sans">
        <p>Access denied. Valid approved company profile required.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-zinc-100 py-12 px-4 flex justify-center items-center font-sans">
      <div className="w-full max-w-2xl bg-[#1c1c1e] border border-zinc-800/80 rounded-xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-zinc-800 flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold text-zinc-100">
              Post a New Job
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Enter your position details to start hiring on HireLoop.
            </p>
          </div>
          <button
            type="button"
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <Xmark className="w-5 h-5" />
          </button>
        </div>

        <Form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* ==================== SECTION 1: JOB INFO ==================== */}
          <Fieldset className="space-y-4">
            <legend className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Job Info
            </legend>

            {/* Row 1: Title & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <Input
                  label="Job Title"
                  name="jobTitle"
                  placeholder="e.g. Senior Frontend Engineer"
                  variant="flat"
                  labelPlacement="outside"
                  isInvalid={!!errors.jobTitle}
                  errorMessage={errors.jobTitle}
                  classNames={{
                    label: "text-zinc-300 font-medium text-sm",
                    inputWrapper:
                      "bg-[#242426] border border-zinc-800 hover:border-zinc-700 focus-within:border-zinc-600 rounded-lg h-11",
                    input: "text-zinc-100 placeholder:text-zinc-600",
                  }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Select
                  className="w-full"
                  placeholder="Select Category"
                  selectedKeys={category}
                  onSelectionChange={setCategory}
                >
                  <Label className="text-sm font-medium text-zinc-300">
                    Job Category
                  </Label>
                  <Select.Trigger className="bg-[#242426] border border-zinc-800 rounded-lg h-11 text-zinc-200 flex justify-between items-center px-3">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1c1c1e] border border-zinc-800 text-zinc-200">
                    <ListBox>
                      {jobCategories.map((cat) => (
                        <ListBox.Item
                          id={cat.value}
                          key={cat.value}
                          textValue={cat.label}
                        >
                          {cat.label}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
                {errors.category && (
                  <p className="text-xs text-danger mt-0.5">
                    {errors.category}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Job Type & Application Deadline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Select
                  className="w-full"
                  placeholder="Select job type"
                  selectedKeys={jobType}
                  onSelectionChange={setJobType}
                >
                  <Label className="text-sm font-medium text-zinc-300">
                    Job Type
                  </Label>
                  <Select.Trigger className="bg-[#242426] border border-zinc-800 rounded-lg h-11 text-zinc-200 flex justify-between items-center px-3">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1c1c1e] border border-zinc-800 text-zinc-200">
                    <ListBox>
                      {jobTypes.map((type) => (
                        <ListBox.Item
                          id={type.value}
                          key={type.value}
                          textValue={type.label}
                        >
                          {type.label}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
                {errors.jobType && (
                  <p className="text-xs text-danger mt-0.5">{errors.jobType}</p>
                )}
              </div>

              <Input
                label="Application Deadline"
                name="deadline"
                type="date"
                variant="flat"
                labelPlacement="outside"
                classNames={{
                  label: "text-zinc-300 font-medium text-sm",
                  inputWrapper:
                    "bg-[#242426] border border-zinc-800 rounded-lg h-11",
                  input: "text-zinc-100",
                }}
              />
            </div>

            {/* Row 3: Salary Range & Currency Group */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <Input
                label="Salary Range (Min)"
                name="minSalary"
                type="number"
                placeholder="Min Salary"
                variant="flat"
                labelPlacement="outside"
                classNames={{
                  label: "text-zinc-300 font-medium text-sm",
                  inputWrapper:
                    "bg-[#242426] border border-zinc-800 rounded-lg h-11",
                  input: "text-zinc-100",
                }}
              />
              <Input
                label="Salary Range (Max)"
                name="maxSalary"
                type="number"
                placeholder="Max Salary"
                variant="flat"
                labelPlacement="outside"
                classNames={{
                  label: "text-zinc-300 font-medium text-sm",
                  inputWrapper:
                    "bg-[#242426] border border-zinc-800 rounded-lg h-11",
                  input: "text-zinc-100",
                }}
              />
              <div className="flex flex-col gap-1.5">
                <Select
                  className="w-full"
                  placeholder="USD ($)"
                  selectedKeys={currency}
                  onSelectionChange={setCurrency}
                >
                  <Label className="text-sm font-medium text-zinc-300">
                    Currency
                  </Label>
                  <Select.Trigger className="bg-[#242426] border border-zinc-800 rounded-lg h-11 text-zinc-200 flex justify-between items-center px-3">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1c1c1e] border border-zinc-800 text-zinc-200">
                    <ListBox>
                      {currencies.map((curr) => (
                        <ListBox.Item
                          id={curr.value}
                          key={curr.value}
                          textValue={curr.label}
                        >
                          {curr.label}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {/* Row 4: Location Dropdown Selection & Remote/On-site Toggle Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end pt-2">
              <div className="flex flex-col gap-1.5">
                <Select
                  className="w-full"
                  placeholder="Select Location"
                  selectedKeys={location}
                  onSelectionChange={setLocation}
                >
                  <Label className="text-sm font-medium text-zinc-300">
                    Job Location
                  </Label>
                  <Select.Trigger className="bg-[#242426] border border-zinc-800 rounded-lg h-11 text-zinc-200 flex justify-between items-center px-3">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1c1c1e] border border-zinc-800 text-zinc-200">
                    <ListBox>
                      {locations.map((loc) => (
                        <ListBox.Item
                          id={loc.value}
                          key={loc.value}
                          textValue={loc.label}
                        >
                          {loc.label}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
                {errors.location && (
                  <p className="text-xs text-danger mt-0.5">
                    {errors.location}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-zinc-300">
                  Work Environment
                </span>
                <div
                  onClick={() => setIsRemote(!isRemote)}
                  className="bg-[#242426] px-4 rounded-lg border border-zinc-800 h-11 flex items-center justify-between cursor-pointer hover:border-zinc-700 transition-colors select-none"
                >
                  <span className="text-xs text-zinc-300 font-medium">
                    {isRemote ? "Remote Position" : "On-Site / Office"}
                  </span>
                  <Switch
                    isSelected={isRemote}
                    onValueChange={setIsRemote}
                    color="success"
                    size="sm"
                    aria-label="Toggle work environment"
                  />
                </div>
              </div>
            </div>
          </Fieldset>

          <hr className="border-zinc-800" />

          {/* ==================== SECTION 2: JOB DESCRIPTION ==================== */}
          <Fieldset className="space-y-4 pt-2">
            <legend className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Job Description
            </legend>

            <TextArea
              label="Responsibilities"
              name="responsibilities"
              placeholder="Tell us about the company's requirements and daily operations..."
              variant="flat"
              labelPlacement="outside"
              minRows={4}
              isInvalid={!!errors.responsibilities}
              errorMessage={errors.responsibilities}
              classNames={{
                label: "text-zinc-300 font-medium text-sm",
                inputWrapper:
                  "bg-[#242426] border border-zinc-800 rounded-lg p-3",
                input: "text-zinc-100 placeholder:text-zinc-600",
              }}
            />

            <TextArea
              label="Requirements"
              name="requirements"
              placeholder="What experience or technical skills are necessary?"
              variant="flat"
              labelPlacement="outside"
              minRows={4}
              isInvalid={!!errors.requirements}
              errorMessage={errors.requirements}
              classNames={{
                label: "text-zinc-300 font-medium text-sm",
                inputWrapper:
                  "bg-[#242426] border border-zinc-800 rounded-lg p-3",
                input: "text-zinc-100 placeholder:text-zinc-600",
              }}
            />

            <TextArea
              label="Benefits (Optional)"
              name="benefits"
              placeholder="List medical health plans, equity, or perk packages..."
              variant="flat"
              labelPlacement="outside"
              minRows={3}
              classNames={{
                label: "text-zinc-300 font-medium text-sm",
                inputWrapper:
                  "bg-[#242426] border border-zinc-800 rounded-lg p-3",
                input: "text-zinc-100 placeholder:text-zinc-600",
              }}
            />
          </Fieldset>

          {/* Auto-filled Linked Company block */}
          <div className="bg-[#1e1e20] border border-dashed border-zinc-800 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#2a2a2c] border border-zinc-700/60 rounded-lg text-zinc-400">
                <LayoutHeaderCellsLarge className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                  Publishing Company
                </p>
                <p className="text-sm font-medium text-zinc-200">
                  {company.name}
                </p>
              </div>
            </div>
            <span
              className={`${company.status === "active" ? "text-success" : company.status === "pending" ? "text-warning" : "text-danger"} text-xs font-medium`}
            >
              {company.status}
            </span>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex justify-end items-center gap-3 pt-4 border-t border-zinc-800/80 mt-2">
            <Button
              type="button"
              variant="bordered"
              className="border-zinc-800 text-zinc-200 hover:bg-zinc-800/30 font-medium rounded-md px-5 h-11"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              className="bg-white text-black hover:bg-zinc-200 font-semibold rounded-md px-6 h-11"
            >
              Post Active Job
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
