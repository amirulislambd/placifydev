"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { IoLocationOutline } from "react-icons/io5";
import { LuUpload, LuPencil, LuBuilding2 } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { FiUsers, FiGlobe, FiAlertCircle } from "react-icons/fi";
import { createCompany } from "@/lib/action/companies";
import { toast } from "@heroui/react";

// ─── Constants ────────────────────────────────────────────────────────────────
const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "E-commerce",
  "Design",
  "Marketing",
  "Other",
];

const EMPLOYEE_RANGES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "500+ employees",
];

// ─── ImgBB upload ─────────────────────────────────────────────────────────────
async function ResponseImgBb(file) {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    { method: "POST", body: formData },
  );
  if (!res.ok) throw new Error("Logo upload failed");
  const data = await res.json();
  return data.data.url;
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    pending: {
      label: "Pending",
      cls: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    },
    approved: {
      label: "Approved",
      cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    rejected: {
      label: "Rejected",
      cls: "bg-red-500/10 text-red-400 border-red-500/20",
    },
  };
  const { label, cls } = map[status] || map.pending;
  return (
    <span
      className={`text-[12px] font-medium px-3 py-1 rounded-full border ${cls}`}
    >
      {label}
    </span>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] text-white/60 font-medium">{label}</label>
      {children}
      {error && <p className="text-[12px] text-red-400">{error}</p>}
    </div>
  );
}

const inputCls =
  "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-[14px] text-white placeholder:text-white/25 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 transition-all disabled:opacity-50";
const selectCls =
  "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-[14px] text-white outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 transition-all appearance-none cursor-pointer";

// ─── Company Form ─────────────────────────────────────────────────────────────
function CompanyForm({ defaultValues, onSubmit, loading, onCancel }) {
  const logoRef = useRef(null);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(defaultValues?.logo || null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: defaultValues || {} });

  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (logoRef.current) logoRef.current.value = "";
  };

  const handleFormSubmit = (data) => {
    onSubmit(data, logoFile);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-5 p-6"
    >
      {/* Row 1: Company Name + Industry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Company Name" error={errors.companyName?.message}>
          <input
            className={inputCls}
            placeholder="e.g. Acme Corp"
            {...register("companyName", {
              required: "Company name is required",
            })}
          />
        </Field>

        <Field label="Industry / Category" error={errors.industry?.message}>
          <div className="relative">
            <select
              className={selectCls}
              {...register("industry", { required: "Industry is required" })}
            >
              <option value="" disabled>
                Select industry
              </option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/35">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>
        </Field>
      </div>

      {/* Row 2: Website URL + Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Website URL" error={errors.websiteUrl?.message}>
          <div className="flex bg-white/[0.04] border border-white/10 rounded-xl overflow-hidden focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/15 transition-all">
            <span className="px-3 py-2.5 text-[13px] text-white/35 border-r border-white/10 bg-white/[0.03] whitespace-nowrap">
              https://
            </span>
            <input
              className="flex-1 bg-transparent px-3 py-2.5 text-[14px] text-white placeholder:text-white/25 outline-none"
              placeholder="www.company.com"
              {...register("websiteUrl")}
            />
          </div>
        </Field>

        <Field label="Location" error={errors.location?.message}>
          <div className="relative flex items-center">
            <IoLocationOutline className="absolute left-3 text-white/30 text-[17px] pointer-events-none" />
            <input
              className={`${inputCls} pl-9`}
              placeholder="City, Country"
              {...register("location", { required: "Location is required" })}
            />
          </div>
        </Field>
      </div>

      {/* Row 3: Employee Range + Logo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Employee Count Range"
          error={errors.employeeRange?.message}
        >
          <div className="relative">
            <select
              className={selectCls}
              {...register("employeeRange", {
                required: "Employee range is required",
              })}
            >
              <option value="" disabled>
                Select range
              </option>
              {EMPLOYEE_RANGES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/35">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>
        </Field>

        <Field label="Company Logo">
          <input
            ref={logoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogo}
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => logoRef.current?.click()}
              className="w-14 h-14 bg-white/[0.03] border border-dashed border-white/20 rounded-xl flex items-center justify-center hover:border-violet-500/50 transition-colors shrink-0 overflow-hidden"
              aria-label="Upload logo"
            >
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <LuUpload className="text-white/30 text-[18px]" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] text-white/60 font-medium truncate">
                {logoFile
                  ? logoFile.name.length > 20
                    ? logoFile.name.slice(0, 20) + "…"
                    : logoFile.name
                  : "Upload image"}
              </p>
              <p className="text-[12px] text-white/30">PNG, JPG up to 5MB</p>
            </div>
            {logoPreview && (
              <button
                type="button"
                onClick={removeLogo}
                className="text-white/30 hover:text-red-400 transition-colors shrink-0"
                aria-label="Remove logo"
              >
                <RxCross2 className="text-[16px]" />
              </button>
            )}
          </div>
        </Field>
      </div>

      {/* Description */}
      <Field label="Brief Description">
        <textarea
          className={`${inputCls} min-h-[100px] resize-y`}
          placeholder="Tell us about your company's mission and culture..."
          {...register("description")}
        />
      </Field>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/8">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-white/55 hover:text-white border border-white/12 hover:border-white/25 px-5 py-2.5 rounded-xl text-[14px] font-medium transition-all"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-white text-[#0d0d14] font-semibold px-6 py-2.5 rounded-xl text-[14px] hover:bg-white/90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          {loading && (
            <svg
              className="animate-spin w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          )}
          {loading
            ? "Saving…"
            : defaultValues
              ? "Save Changes"
              : "Register Company"}
        </button>
      </div>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const CompanyProfile = ({recruiter}) => {
  const router = useRouter();

  // TODO: fetch from API/DB → replace with real data
  const [company, setCompany] = useState(null); // null = no company yet
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (data, logoFile) => {
    setServerError("");
    setLoading(true);
    try {
      let logoUrl = company?.logo || "";
      if (logoFile) logoUrl = await ResponseImgBb(logoFile);

      const payload = {
        ...data,
        websiteUrl: data.websiteUrl.startsWith("http")
          ? data.websiteUrl
          : `https://${data.websiteUrl}`,
        logo: logoUrl || undefined,
        status: company ? company.status : "pending",
        recruiterId: recruiter.id
      };

      // TODO: POST /api/company (new) or PATCH /api/company (edit)
      const res = await createCompany(payload);
      if (res.insertedId) {
        toast.success("Company Registered Successfully");
      }
      console.log("Payload:", payload);

      setCompany({ ...payload, status: "pending" });
      setIsEditing(false);
    } catch (err) {
      setServerError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // ── No company registered ───────────────────────────────────────
  if (!company && !isEditing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 flex flex-col items-center text-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
          <LuBuilding2 className="text-white/30 text-[28px]" />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-white mb-2">
            No Company Registered
          </h2>
          <p className="text-[14px] text-white/40 max-w-sm">
            Register your company to start posting jobs and finding top
            developer talent.
          </p>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2.5 rounded-xl text-[14px] transition-all active:scale-[0.98]"
        >
          Register Company
        </button>
      </div>
    );
  }

  // ── Register / Edit form ────────────────────────────────────────
  if (isEditing || !company) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-[26px] font-bold text-white tracking-tight mb-1">
            {company ? "Edit Company" : "Register New Company"}
          </h1>
          <p className="text-[14px] text-white/40">
            Enter your business details to start hiring on HireLoop.
          </p>
        </div>

        {serverError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] rounded-xl px-4 py-3 mb-6">
            {serverError}
          </div>
        )}

        <div className="bg-[#13131f] border border-white/8 rounded-2xl overflow-hidden">
          <CompanyForm
            defaultValues={company}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={company ? () => setIsEditing(false) : null}
          />
        </div>
      </div>
    );
  }

  // ── Company details view ────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[26px] font-bold text-white tracking-tight mb-1">
            My Company
          </h1>
          <p className="text-[14px] text-white/40">
            Your registered company details.
          </p>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/10 border border-white/10 text-white/70 hover:text-white px-4 py-2 rounded-xl text-[14px] transition-all"
        >
          <LuPencil className="text-[15px]" />
          Edit
        </button>
      </div>

      {/* Status warning for pending/rejected */}
      {company.status === "pending" && (
        <div className="flex items-start gap-3 bg-yellow-500/8 border border-yellow-500/20 text-yellow-400 text-[13px] rounded-xl px-4 py-3 mb-6">
          <FiAlertCircle className="text-[16px] mt-0.5 shrink-0" />
          <span>
            Your company is under review. You can post jobs once it's approved
            by an admin.
          </span>
        </div>
      )}
      {company.status === "rejected" && (
        <div className="flex items-start gap-3 bg-red-500/8 border border-red-500/20 text-red-400 text-[13px] rounded-xl px-4 py-3 mb-6">
          <FiAlertCircle className="text-[16px] mt-0.5 shrink-0" />
          <span>
            Your company was rejected. Please update your details and resubmit.
          </span>
        </div>
      )}

      {/* Company card */}
      <div className="bg-[#13131f] border border-white/8 rounded-2xl overflow-hidden">
        {/* Top — logo + name + status */}
        <div className="flex items-center gap-4 p-6 border-b border-white/8">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.companyName}
              className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
              <LuBuilding2 className="text-white/25 text-[24px]" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-[18px] font-bold text-white truncate mb-1">
              {company.companyName}
            </h2>
            <p className="text-[13px] text-white/45">{company.industry}</p>
          </div>
          <StatusBadge status={company.status} />
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y divide-white/6 sm:divide-y-0">
          <div className="flex items-center gap-3 px-6 py-4 sm:border-r border-white/6 border-b border-white/6">
            <IoLocationOutline className="text-violet-400 text-[18px] shrink-0" />
            <div>
              <p className="text-[11px] text-white/35 mb-0.5">Location</p>
              <p className="text-[14px] text-white">
                {company.location || "—"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/6">
            <FiUsers className="text-violet-400 text-[17px] shrink-0" />
            <div>
              <p className="text-[11px] text-white/35 mb-0.5">Team Size</p>
              <p className="text-[14px] text-white">
                {company.employeeRange || "—"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-6 py-4 sm:border-r border-white/6">
            <FiGlobe className="text-violet-400 text-[17px] shrink-0" />
            <div>
              <p className="text-[11px] text-white/35 mb-0.5">Website</p>
              <a
                href={company.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-violet-400 hover:underline truncate block"
              >
                {company.websiteUrl || "—"}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 px-6 py-4">
            <LuBuilding2 className="text-violet-400 text-[17px] shrink-0" />
            <div>
              <p className="text-[11px] text-white/35 mb-0.5">Industry</p>
              <p className="text-[14px] text-white">
                {company.industry || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        {company.description && (
          <div className="px-6 py-5 border-t border-white/8">
            <p className="text-[12px] text-white/35 mb-2">About</p>
            <p className="text-[14px] text-white/70 leading-relaxed">
              {company.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;