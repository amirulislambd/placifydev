"use client";

import { useState } from "react";
import {
  BsBriefcase,
  BsGeoAlt,
  BsCurrencyDollar,
  BsCalendar3,
  BsPersonCircle,
  BsEnvelope,
  BsCheckCircleFill,
  BsArrowLeft,
  BsPhone,
  BsFileEarmarkText,
  BsChevronRight,
  BsChevronLeft,
  BsLinkedin,
  BsGlobe,
} from "react-icons/bs";
import Link from "next/link";
import { Select, ListBox } from "@heroui/react";
import { submitApplication } from "@/lib/action/application";
import { toast } from "@heroui/react";

function formatSalary(min, max, currency) {
  const fmt = (n) => Number(n).toLocaleString();
  return `${currency} ${fmt(min)} – ${fmt(max)}`;
}
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── Step Indicator ────────────────────────────────────────────────────────────
function StepIndicator({ current, steps }) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold border-2 transition-all duration-300
              ${
                i < current
                  ? "bg-violet-600 border-violet-600 text-white"
                  : i === current
                    ? "bg-violet-600/20 border-violet-500 text-violet-300"
                    : "bg-white/[0.04] border-white/10 text-white/30"
              }`}
            >
              {i < current ? (
                <BsCheckCircleFill className="text-[13px]" />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`text-[10px] whitespace-nowrap hidden sm:block transition-colors
              ${i === current ? "text-violet-300" : i < current ? "text-white/50" : "text-white/20"}`}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-px w-12 sm:w-16 mx-1 mb-4 transition-all duration-300 ${i < current ? "bg-violet-600" : "bg-white/10"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({ label, required, children, hint }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] text-white/50">
        {label} {required && <span className="text-violet-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-white/20">{hint}</p>}
    </div>
  );
}

// ── Text Input ────────────────────────────────────────────────────────────────
function Input({ icon, ...props }) {
  return (
    <div className="relative flex items-center">
      {icon && (
        <span className="absolute left-3 text-white/30 text-[14px] pointer-events-none">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={`w-full bg-white/[0.04] border border-white/10 rounded-xl py-2.5 text-[13px] text-white placeholder:text-white/20 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/15 transition-all ${icon ? "pl-9 pr-4" : "px-4"}`}
      />
    </div>
  );
}

const STEPS = ["Personal Info", "Resume & Letter", "Review"];

export default function ApplyJob({ job, applicant }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [experience, setExperience] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const step1Valid = phone.trim() && location.trim() && experience;
  const step2Valid = resumeUrl.trim();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await submitApplication({
        companyName: job.companyName,
        jobId: job._id,
        applicantId: applicant.id,
        phone,
        location,
        linkedin,
        portfolio,
        experience,
        noticePeriod,
        resumeUrl,
        coverLetter,
      });
      if (res.insertedId) {
        setSuccess(true);
        toast.success("Application submitted successfully!");
      } else {
        setError(res.message || "Something went wrong.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0d0d14] flex items-center justify-center px-4">
        <div className="bg-[#12121e] border border-white/8 rounded-2xl p-10 max-w-md w-full text-center flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
            <BsCheckCircleFill className="text-emerald-400 text-3xl" />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-white mb-2">
              Application Submitted!
            </h2>
            <p className="text-[14px] text-white/45 leading-relaxed">
              Your application for{" "}
              <span className="text-white font-medium">{job.jobTitle}</span> at{" "}
              <span className="text-white font-medium">{job.companyName}</span>{" "}
              has been sent.
            </p>
          </div>
          <div className="flex gap-3 w-full">
            <Link
              href="/jobs"
              className="flex-1 text-center text-[13px] text-white/50 hover:text-white border border-white/10 hover:border-white/20 py-2.5 rounded-xl transition-all"
            >
              Browse Jobs
            </Link>
            <Link
              href="/dashboard/applications"
              className="flex-1 text-center text-[13px] bg-violet-600 hover:bg-violet-700 text-white font-medium py-2.5 rounded-xl transition-all"
            >
              My Applications
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d14] px-4 sm:px-6 py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <Link
          href={`/jobs/${job._id}`}
          className="inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white transition-colors w-fit"
        >
          <BsArrowLeft /> Back to Job Details
        </Link>

        {/* Job Summary */}
        <div className="bg-[#12121e] border border-white/8 rounded-2xl p-5 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-violet-600/20 border border-violet-500/20 flex items-center justify-center shrink-0">
            <span className="text-[16px] font-bold text-violet-300">
              {job.companyName?.[0]}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] text-white/35 mb-0.5">
              {job.companyName}
            </p>
            <h1 className="text-[17px] font-bold text-white mb-2 leading-snug">
              {job.jobTitle}
            </h1>
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 text-[12px] text-white/45">
                <BsGeoAlt className="text-violet-400" /> {job.location}
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-white/45">
                <BsBriefcase className="text-violet-400" /> {job.jobType}
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-white/45">
                <BsCurrencyDollar className="text-violet-400" />
                {formatSalary(job.minSalary, job.maxSalary, job.currency)}
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-white/45">
                <BsCalendar3 className="text-violet-400" /> Deadline:{" "}
                {formatDate(job.deadline)}
              </span>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center">
          <StepIndicator current={step} steps={STEPS} />
        </div>

        {/* ── Step 1: Personal Info ─────────────────────────────────────── */}
        {step === 0 && (
          <div className="bg-[#12121e] border border-white/8 rounded-2xl p-6 flex flex-col gap-5">
            <div>
              <h2 className="text-[16px] font-semibold text-white">
                Personal Information
              </h2>
              <p className="text-[13px] text-white/30 mt-1">
                Tell us a bit about yourself
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/6 rounded-xl p-3">
              {applicant.image ? (
                <img
                  src={applicant.image}
                  alt={applicant.name}
                  className="w-9 h-9 rounded-full object-cover border border-white/10 shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-violet-600/20 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <BsPersonCircle className="text-violet-300" />
                </div>
              )}
              <div>
                <p className="text-[13px] font-medium text-white">
                  {applicant.name}
                </p>
                <p className="text-[12px] text-white/35">{applicant.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Phone Number" required>
                <Input
                  icon={<BsPhone />}
                  placeholder="+880 1XX-XXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Field>
              <Field label="Current Location" required>
                <Input
                  icon={<BsGeoAlt />}
                  placeholder="City, Country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Field>

              {/* ── Hero UI Select — Experience ── */}
              <Field label="Years of Experience" required>
                <Select value={experience} onChange={setExperience}>
                  <Select.Trigger className="w-full h-[42px] px-4 rounded-xl border border-white/10 bg-white/[0.04] text-white/70 text-[13px] hover:border-violet-500/40 focus:border-violet-500 transition-all">
                    <Select.Value
                      placeholder={
                        <span className="text-white/20">Select experience</span>
                      }
                    />
                    <Select.Indicator className="text-white/30" />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#16162a] border border-white/10 rounded-xl shadow-2xl z-[200]">
                    <ListBox className="p-1.5 flex flex-col gap-0.5">
                      {[
                        "Fresher (0 years)",
                        "1 year",
                        "2 years",
                        "3–5 years",
                        "5–10 years",
                        "10+ years",
                      ].map((opt) => (
                        <ListBox.Item
                          key={opt}
                          id={opt}
                          textValue={opt}
                          className="px-3 py-2 text-[13px] text-white/60 hover:text-white hover:bg-violet-600/15 rounded-lg cursor-pointer transition-all outline-none data-[focused=true]:bg-violet-600/15 data-[focused=true]:text-white"
                        >
                          {opt}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </Field>

              {/* ── Hero UI Select — Notice Period ── */}
              <Field label="Notice Period">
                <Select value={noticePeriod} onChange={setNoticePeriod}>
                  <Select.Trigger className="w-full h-[42px] px-4 rounded-xl border border-white/10 bg-white/[0.04] text-white/70 text-[13px] hover:border-violet-500/40 focus:border-violet-500 transition-all">
                    <Select.Value
                      placeholder={
                        <span className="text-white/20">
                          Select notice period
                        </span>
                      }
                    />
                    <Select.Indicator className="text-white/30" />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#16162a] border border-white/10 rounded-xl shadow-2xl z-[200]">
                    <ListBox className="p-1.5 flex flex-col gap-0.5">
                      {[
                        "Immediately",
                        "1 week",
                        "2 weeks",
                        "1 month",
                        "2 months",
                        "3 months",
                      ].map((opt) => (
                        <ListBox.Item
                          key={opt}
                          id={opt}
                          textValue={opt}
                          className="px-3 py-2 text-[13px] text-white/60 hover:text-white hover:bg-violet-600/15 rounded-lg cursor-pointer transition-all outline-none data-[focused=true]:bg-violet-600/15 data-[focused=true]:text-white"
                        >
                          {opt}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </Field>

              <Field label="LinkedIn Profile">
                <Input
                  icon={<BsLinkedin />}
                  placeholder="linkedin.com/in/yourname"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </Field>
              <Field label="Portfolio / Website">
                <Input
                  icon={<BsGlobe />}
                  placeholder="yourportfolio.com"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                />
              </Field>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setStep(1)}
                disabled={!step1Valid}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-[14px] px-6 py-2.5 rounded-xl transition-all"
              >
                Next <BsChevronRight />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Resume & Cover Letter ────────────────────────────── */}
        {step === 1 && (
          <div className="bg-[#12121e] border border-white/8 rounded-2xl p-6 flex flex-col gap-5">
            <div>
              <h2 className="text-[16px] font-semibold text-white">
                Resume & Cover Letter
              </h2>
              <p className="text-[13px] text-white/30 mt-1">
                Share your resume and tell us why you're a great fit
              </p>
            </div>

            <Field
              label="Resume URL"
              required
              hint="Paste your Google Drive, Dropbox, or any public resume link"
            >
              <Input
                icon={<BsFileEarmarkText />}
                placeholder="https://drive.google.com/..."
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
              />
            </Field>

            <Field label="Cover Letter" hint="Optional but recommended">
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Tell the recruiter why you're a great fit for this role..."
                rows={6}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-[13px] text-white placeholder:text-white/20 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/15 transition-all resize-none leading-relaxed"
              />
              <p className="text-[11px] text-white/20 text-right -mt-1">
                {coverLetter.length} / 2000
              </p>
            </Field>

            <div className="flex gap-3 justify-between pt-2">
              <button
                onClick={() => setStep(0)}
                className="flex items-center gap-2 text-[14px] text-white/50 hover:text-white border border-white/10 hover:border-white/20 px-5 py-2.5 rounded-xl transition-all"
              >
                <BsChevronLeft /> Back
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={!step2Valid}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-[14px] px-6 py-2.5 rounded-xl transition-all"
              >
                Review <BsChevronRight />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Review & Submit ───────────────────────────────────── */}
        {step === 2 && (
          <div className="bg-[#12121e] border border-white/8 rounded-2xl p-6 flex flex-col gap-5">
            <div>
              <h2 className="text-[16px] font-semibold text-white">
                Review Your Application
              </h2>
              <p className="text-[13px] text-white/30 mt-1">
                Please review before submitting
              </p>
            </div>

            {[
              {
                title: "Personal Info",
                step: 0,
                rows: [
                  ["Name", applicant.name],
                  ["Email", applicant.email],
                  ["Phone", phone],
                  ["Location", location],
                  ["Experience", experience],
                  ["Notice", noticePeriod || "—"],
                  ["LinkedIn", linkedin || "—"],
                  ["Portfolio", portfolio || "—"],
                ],
              },
              {
                title: "Resume & Letter",
                step: 1,
                rows: [
                  ["Resume URL", resumeUrl],
                  [
                    "Cover Letter",
                    coverLetter ? `${coverLetter.slice(0, 80)}…` : "—",
                  ],
                ],
              },
            ].map((section) => (
              <div
                key={section.title}
                className="bg-white/[0.02] border border-white/6 rounded-xl p-4 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-medium text-white/60">
                    {section.title}
                  </h3>
                  <button
                    onClick={() => setStep(section.step)}
                    className="text-[11px] text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {section.rows.map(([label, value]) => (
                    <div key={label} className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-white/25 uppercase tracking-wider">
                        {label}
                      </span>
                      <span className="text-[12px] text-white/70 break-all">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <p className="text-[12px] text-white/25 leading-relaxed">
              By submitting, your profile and application will be shared with{" "}
              <span className="text-white/40">{job.companyName}</span>.
            </p>

            <div className="flex gap-3 justify-between pt-1">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-[14px] text-white/50 hover:text-white border border-white/10 hover:border-white/20 px-5 py-2.5 rounded-xl transition-all"
              >
                <BsChevronLeft /> Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-[14px] px-8 py-2.5 rounded-xl transition-all duration-200"
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
                {loading ? "Submitting…" : "Submit Application"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
