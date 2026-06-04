"use client";

import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { IoLocationOutline } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

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

// ─── Reusable field wrapper ───────────────────────────────────────────────────
function FieldWrapper({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] text-white/60 font-medium">{label}</label>
      {children}
      {error && <p className="text-[12px] text-red-400">{error}</p>}
    </div>
  );
}

// ─── Reusable input ───────────────────────────────────────────────────────────
const inputCls =
  "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-[14px] text-white placeholder:text-white/25 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 transition-all disabled:opacity-50";

// ─── Reusable select ──────────────────────────────────────────────────────────
const selectCls =
  "w-full bg-white/[0.04]  rounded-xl px-4 py-2.5 text-[14px] text-white outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 transition-all appearance-none cursor-pointer [&>option]:bg-[#1a1a2e] [&>option]:text-white";

// ─── Page ─────────────────────────────────────────────────────────────────────
const RecruiterCompany = () => {
  const router = useRouter();
  const logoRef = useRef(null);

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: "",
      industry: "",
      websiteUrl: "",
      location: "",
      employeeRange: "",
      description: "",
    },
  });

  // ── Logo handlers ───────────────────────────────────────────────
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

  // ── Submit ──────────────────────────────────────────────────────
  const onSubmit = async (data) => {
    setServerError("");
    setLoading(true);
    try {
      let logoUrl = "";
      if (logoFile) logoUrl = await ResponseImgBb(logoFile);

      const payload = {
        ...data,
        websiteUrl: `https://${data.websiteUrl}`,
        logo: logoUrl || undefined,
        status: "pending",
      };

      console.log("Company payload:", payload);
      router.push("/dashboard/recruiter");
    } catch (err) {
      setServerError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-white tracking-tight mb-1">
          Register New Company
        </h1>
        <p className="text-[14px] text-white/40">
          Enter your business details to start hiring on HireLoop.
        </p>
      </div>

      {/* Server error */}
      {serverError && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] rounded-xl px-4 py-3 mb-6">
          {serverError}
        </div>
      )}

      {/* Form card */}
      <div className="bg-[#13131f] border border-white/8 rounded-2xl overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-6"
        >
          {/* Row 1: Company Name + Industry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldWrapper
              label="Company Name"
              error={errors.companyName?.message}
            >
              <input
                className={inputCls}
                placeholder="e.g. Acme Corp"
                {...register("companyName", {
                  required: "Company name is required",
                })}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Industry / Category"
              error={errors.industry?.message}
            >
              <div className="relative">
                <select
                  className={selectCls}
                  {...register("industry", {
                    required: "Industry is required",
                  })}
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
            </FieldWrapper>
          </div>

          {/* Row 2: Website URL + Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldWrapper
              label="Website URL"
              error={errors.websiteUrl?.message}
            >
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
            </FieldWrapper>

            <FieldWrapper label="Location" error={errors.location?.message}>
              <div className="relative flex items-center">
                <IoLocationOutline className="absolute left-3 text-white/30 text-[17px] pointer-events-none" />
                <input
                  className={`${inputCls} pl-9`}
                  placeholder="City, Country"
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
              </div>
            </FieldWrapper>
          </div>

          {/* Row 3: Employee Range + Company Logo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldWrapper
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
            </FieldWrapper>

            {/* Logo upload */}
            <FieldWrapper label="Company Logo">
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
                  <p className="text-[12px] text-white/30">
                    PNG, JPG up to 5MB
                  </p>
                </div>
                {logoFile && (
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
            </FieldWrapper>
          </div>

          {/* Brief Description */}
          <FieldWrapper label="Brief Description">
            <textarea
              className={`${inputCls} min-h-[100px] resize-y`}
              placeholder="Tell us about your company's mission and culture..."
              {...register("description")}
            />
          </FieldWrapper>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/8 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-white/55 hover:text-white border border-white/12 hover:border-white/25 px-5 py-2.5 rounded-xl text-[14px] font-medium transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
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
            {loading ? "Registering…" : "Register Company"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterCompany;
