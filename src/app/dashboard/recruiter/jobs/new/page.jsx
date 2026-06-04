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

export default function PostJobPage() {
  const mockCompany = {
    name: "Acme Corp",
    id: "comp_12345",
    isApproved: true,
  };

  // State configurations
  const [isRemote, setIsRemote] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter()
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
      companyId: mockCompany.id,
      status: "active",
      isPubliclyVisible: true,
    };

    try {
      const res = await createJob(finalPayload);
      if (res.insertedId) {
        toast.success("Job posted successfully!");
        setIsLoading(false); 
        e.target.reset();
        router.push("/dashboard/recruiter/jobs");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false); 
    } finally {
      setIsLoading(false); 
    }
  };

  if (!mockCompany.isApproved) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#121212] text-zinc-400">
        <p>
          Your company profile must be approved before you can post a job
          vacancy.
        </p>
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
                  name="category"
                  className="w-full"
                  placeholder="Technology"
                >
                  <Label className="text-sm font-medium text-zinc-300">
                    Job Category
                  </Label>
                  <Select.Trigger className="bg-[#242426] border border-zinc-800 rounded-lg h-11 text-zinc-200" />
                  <Select.Popover className="bg-[#1c1c1e] border border-zinc-800 text-zinc-200">
                    <ListBox>
                      {jobCategories.map((cat) => (
                        <ListBox.Item
                          id={cat.value}
                          key={cat.value}
                          textValue={cat.label}
                        >
                          {cat.label}
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
                  name="jobType"
                  className="w-full"
                  placeholder="Select job type"
                >
                  <Label className="text-sm font-medium text-zinc-300">
                    Job Type
                  </Label>
                  <Select.Trigger className="bg-[#242426] border border-zinc-800 rounded-lg h-11 text-zinc-200" />
                  <Select.Popover className="bg-[#1c1c1e] border border-zinc-800 text-zinc-200">
                    <ListBox>
                      {jobTypes.map((type) => (
                        <ListBox.Item
                          id={type.value}
                          key={type.value}
                          textValue={type.label}
                        >
                          {type.label}
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
                  name="currency"
                  className="w-full"
                  placeholder="USD ($)"
                >
                  <Label className="text-sm font-medium text-zinc-300">
                    Currency
                  </Label>
                  <Select.Trigger className="bg-[#242426] border border-zinc-800 rounded-lg h-11 text-zinc-200" />
                  <Select.Popover className="bg-[#1c1c1e] border border-zinc-800 text-zinc-200">
                    <ListBox>
                      {currencies.map((curr) => (
                        <ListBox.Item
                          id={curr.value}
                          key={curr.value}
                          textValue={curr.label}
                        >
                          {curr.label}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {/* Row 4: Location Dropdown Selection & Remote/On-site Toggle Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end pt-2">
              {/* Field A: Location Selection */}
              <div className="flex flex-col gap-1.5">
                <Select
                  name="location"
                  className="w-full"
                  placeholder="Select Location"
                >
                  <Label className="text-sm font-medium text-zinc-300">
                    Job Location
                  </Label>
                  <Select.Trigger className="bg-[#242426] border border-zinc-800 rounded-lg h-11 text-zinc-200" />
                  <Select.Popover className="bg-[#1c1c1e] border border-zinc-800 text-zinc-200">
                    <ListBox>
                      {locations.map((loc) => (
                        <ListBox.Item
                          id={loc.value}
                          key={loc.value}
                          textValue={loc.label}
                        >
                          {loc.label}
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

              {/* Field B: Balanced Remote / On-Site Toggle Block */}
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-zinc-300">
                  Work Environment
                </span>
                <div className="bg-[#242426] px-4 rounded-lg border border-zinc-800 h-11 flex items-center justify-between">
                  <span className="text-xs text-zinc-300 font-medium">
                    {isRemote ? "Remote Position" : "On-Site / Office"}
                  </span>
                  <Switch
                    isSelected={isRemote}
                    onValueChange={setIsRemote}
                    color="default"
                    size="sm"
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
                  {mockCompany.name}
                </p>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-900/40 font-medium">
              Approved
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