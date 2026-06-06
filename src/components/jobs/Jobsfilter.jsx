"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { Select, ListBox } from "@heroui/react";

const CATEGORIES  = ["All", "Software Engineering", "Design", "Marketing", "Sales", "Finance", "HR", "DevOps", "Data Science", "Other"];
const JOB_TYPES   = ["All", "Full-time", "Part-time", "Contract", "Internship"];
const WORK_MODES  = ["All", "Remote", "Hybrid", "On-site"];
const SALARY_RANGES = [
  { label: "Any",       value: "any"           },
  { label: "0–50k",     value: "0-50000"       },
  { label: "50k–100k",  value: "50000-100000"  },
  { label: "100k–150k", value: "100000-150000" },
  { label: "150k+",     value: "150000-999999" },
];

function FilterSelect({ label, options, value, defaultVal, onChange, onClear }) {
  const isActive = value !== defaultVal;

  return (
    <div className="flex items-center gap-1 shrink-0">
      <span className="text-[11px] text-white/30 uppercase tracking-wider whitespace-nowrap hidden sm:block">
        {label}
      </span>
      <Select
        value={value}
        onChange={onChange}
        variant="secondary"
        className="min-w-[100px] sm:min-w-[115px]"
      >
        <Select.Trigger className="h-8 px-2.5 rounded-lg border border-white/10 bg-white/[0.04] text-white/70 text-[12px] hover:border-violet-500/40 focus:border-violet-500 transition-all gap-1">
          <Select.Value className="text-[12px] text-white/70" />
          <Select.Indicator className="text-white/30 text-[11px]" />
        </Select.Trigger>
        <Select.Popover className="bg-[#16162a] border border-white/10 rounded-xl shadow-2xl z-[200] min-w-[150px]">
          <ListBox className="p-1.5 flex flex-col gap-0.5">
            {options.map((opt) => {
              const val = typeof opt === "string" ? opt : opt.value;
              const lbl = typeof opt === "string" ? opt : opt.label;
              return (
                <ListBox.Item
                  key={val}
                  id={val}
                  textValue={lbl}
                  className="px-3 py-1.5 text-[12px] text-white/60 hover:text-white hover:bg-violet-600/15 rounded-lg cursor-pointer transition-all outline-none data-[focused=true]:bg-violet-600/15 data-[focused=true]:text-white"
                >
                  {lbl}
                </ListBox.Item>
              );
            })}
          </ListBox>
        </Select.Popover>
      </Select>

      {/* Individual clear button — only when active */}
      {isActive && (
        <button
          onClick={onClear}
          className="w-5 h-5 rounded-full bg-white/10 hover:bg-red-500/20 text-white/40 hover:text-red-400 flex items-center justify-center transition-all shrink-0"
          title={`Clear ${label}`}
        >
          <IoCloseOutline className="text-[13px]" />
        </button>
      )}
    </div>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-white/8 shrink-0" />;
}

export default function JobsFilter({ totalJobs }) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const createQuery = useCallback((key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "All" || value === "any") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page");
    return params.toString();
  }, [searchParams]);

  const push  = (key, value) => router.push(`${pathname}?${createQuery(key, value)}`);
  const clear = (key)        => push(key, "All");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) { params.set("q", search.trim()); }
    else { params.delete("q"); }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => { setSearch(""); router.push(pathname); };
  const hasFilters = searchParams.toString().length > 0;

  const current = {
    category: searchParams.get("category") || "All",
    jobType:  searchParams.get("jobType")  || "All",
    workMode: searchParams.get("workMode") || "All",
    salary:   searchParams.get("salary")   || "any",
  };

  return (
    <div
      className="sticky top-0 z-[100] mb-8 -mx-4 sm:-mx-6 px-4 sm:px-6"
      style={{
        background: "rgba(13,13,20,0.94)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="border-b border-white/6 py-3 flex flex-col md:flex-row justify-between gap-2.5">

        {/* Row 1: Search */}
        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative flex items-center flex-1 sm:flex-none">
            <IoSearchOutline className="absolute left-3 text-white/30 text-[14px] pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs..."
              className="w-full sm:w-[220px] bg-white/[0.04] border border-white/10 rounded-lg pl-8 pr-14 py-1.5 text-[12px] text-white placeholder:text-white/25 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/15 transition-all"
            />
            <button
              type="submit"
              className="absolute right-1.5 bg-violet-600 hover:bg-violet-700 text-white text-[11px] font-medium px-2.5 py-1 rounded-md transition-colors"
            >
              Go
            </button>
          </form>

          {/* Mobile: jobs count */}
          <div className="flex items-center gap-1.5 ml-auto sm:hidden shrink-0">
            <span className="text-[12px] text-white/40 whitespace-nowrap">
              <span className="text-white font-semibold">{totalJobs}</span> jobs
            </span>
          </div>
        </div>

        {/* Row 2: Filters */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5">

          <FilterSelect
            label="Category"
            options={CATEGORIES}
            value={current.category}
            defaultVal="All"
            onChange={(v) => push("category", v)}
            onClear={() => clear("category")}
          />

          <Divider />

          <FilterSelect
            label="Type"
            options={JOB_TYPES}
            value={current.jobType}
            defaultVal="All"
            onChange={(v) => push("jobType", v)}
            onClear={() => clear("jobType")}
          />

          <Divider />

          <FilterSelect
            label="Mode"
            options={WORK_MODES}
            value={current.workMode}
            defaultVal="All"
            onChange={(v) => push("workMode", v)}
            onClear={() => clear("workMode")}
          />

          <Divider />

          <FilterSelect
            label="Salary"
            options={SALARY_RANGES}
            value={current.salary}
            defaultVal="any"
            onChange={(v) => push("salary", v)}
            onClear={() => clear("salary")}
          />

          {/* Desktop: jobs count + Clear All */}
          <div className="hidden sm:flex items-center gap-2 ml-auto shrink-0">
            <Divider />
            <span className="text-[12px] text-white/40 whitespace-nowrap">
              <span className="text-white font-semibold">{totalJobs}</span> jobs
            </span>
            {hasFilters && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-[11px] text-red-600/50 hover:text-red-500 border border-white/20 px-2.5 py-1 rounded-lg transition-all whitespace-nowrap"
              >
                <IoCloseOutline className="text-[13px]" /> Clear All
              </button>
            )}
          </div>

        </div>

        {/* Mobile: Clear All */}
        {hasFilters && (
          <div className="flex sm:hidden justify-end">
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-[11px] text-red-600 border border-red-600 hover:border-white/20 px-2.5 py-1 rounded-lg transition-all"
            >
              <IoCloseOutline className="text-[13px] text-red-600" /> Clear All
            </button>
          </div>
        )}

      </div>
    </div>
  );
}