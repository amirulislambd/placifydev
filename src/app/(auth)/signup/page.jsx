"use client";

import { useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCamera,
  FiX,
} from "react-icons/fi";
import { HiOutlinePlay } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { Spinner } from "@heroui/react";
import { FaGithub } from "react-icons/fa";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";

// ─── ImgBB upload ─────────────────────────────────────────────────────────────
async function ResponseImgBb(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    { method: "POST", body: formData },
  );

  if (!res.ok) throw new Error("ImgBB upload failed");
  const data = await res.json();
  return data.data.url;
}

// ──────────────────────────────────────────────────────────────────────────────
export default function SignUpPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const fileRef = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { role: "seeker" },
  });

  // ── Photo handlers ──────────────────────────────────────────────────────────
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const onSubmit = async (data) => {
    const { name, email, role, password } = data;
    setServerError("");
    console.log(data.name);
    try {
      setLoading(true);

      // 1. Upload photo to ImgBB if selected
      let imageUrl = "";
      if (photo) {
        setUploading(true);
        imageUrl = await ResponseImgBb(photo);
        setUploading(false);
      }

      // 2. Sign up with better-auth
      const { error } = await authClient.signUp.email({
        name,
        email,
        role,
        password,
        image: imageUrl || undefined,
      });

      if (error) {
        setServerError(error.message || "Something went wrong.");
        return;
      }

      // 3. Redirect
      await authClient.signOut();
      router.push(redirectTo);
    } catch (err) {
      setServerError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleGoogle = async () => {
    setServerError("");
    try {
      setGoogleLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setServerError(err.message || "Google sign in failed.");
      setGoogleLoading(false);
    }
  };

  const handleGithub = async () => {
    setServerError("");
    try {
      setGithubLoading(true);
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (err) {
      setServerError(err.message || "GitHub sign in failed.");
      setGithubLoading(false);
    }
  };

  const isAnyLoading = loading || googleLoading || githubLoading;

  const isLoading = loading || uploading;
  const btnLabel = uploading
    ? "Uploading photo…"
    : loading
      ? "Creating account…"
      : "Create account";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d14] px-4 py-12">
      <div className="w-full max-w-[500px] bg-[#12121e] border border-white/8 rounded-2xl p-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shrink-0">
            <HiOutlinePlay className="text-white text-lg" />
          </div>
          <div>
            <div className="text-[15px] font-medium text-white leading-tight">
              PlacifyDev
            </div>
            <div className="text-[12px] text-white/45 leading-tight">
              Developer Job Platform
            </div>
          </div>
        </div>

        <h1 className="text-[20px] font-medium text-white mb-1">
          Create your account
        </h1>
        <p className="text-[13px] text-white/45 mb-6">
          Join thousands of developers finding their dream jobs.
        </p>

        {/* Server error */}
        {serverError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] rounded-lg px-4 py-3 mb-4">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Full Name */}
          <div>
            <label
              className="block text-[13px] text-white/55 mb-1.5"
              htmlFor="name"
            >
              Full name
            </label>
            <div className="relative flex items-center">
              <FiUser className="absolute left-3 text-white/30 text-[17px] pointer-events-none" />
              <input
                id="name"
                type="text"
                placeholder="Rahim Khan"
                disabled={isLoading}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 transition-all disabled:opacity-50"
              />
            </div>
            {errors.name && (
              <p className="text-[12px] text-red-400 mt-1.5">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-[13px] text-white/55 mb-1.5"
              htmlFor="email"
            >
              Email address
            </label>
            <div className="relative flex items-center">
              <FiMail className="absolute left-3 text-white/30 text-[17px] pointer-events-none" />
              <input
                id="email"
                type="email"
                placeholder="rahim@example.com"
                disabled={isLoading}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 transition-all disabled:opacity-50"
              />
            </div>
            {errors.email && (
              <p className="text-[12px] text-red-400 mt-1.5">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-[13px] text-white/55 mb-1.5">
              Profile photo <span className="text-white/25">(optional)</span>
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhoto}
              disabled={isLoading}
            />

            {!photoPreview ? (
              <div
                onClick={() => !isLoading && fileRef.current?.click()}
                className="border border-dashed border-white/15 rounded-lg p-5 text-center cursor-pointer hover:border-violet-500/50 transition-colors bg-white/[0.03]"
              >
                <FiCamera className="text-white/30 text-2xl mx-auto mb-1.5" />
                <p className="text-[13px] text-white/45">
                  Click to upload your photo
                </p>
                <span className="text-[12px] text-white/25">
                  JPG, PNG or WEBP · max 5MB
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3 border border-white/10 rounded-lg px-4 py-3 bg-white/[0.03]">
                <img
                  src={photoPreview}
                  alt="Profile preview"
                  className="w-11 h-11 rounded-full object-cover border border-white/10 cursor-pointer shrink-0"
                  onClick={() => !isLoading && fileRef.current?.click()}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium text-white truncate">
                    {photo?.name?.length > 24
                      ? photo.name.slice(0, 24) + "…"
                      : photo?.name}
                  </div>
                  <div className="text-[12px] text-white/35">
                    {uploading ? "Uploading…" : "Tap photo to change"}
                  </div>
                </div>
                {!isLoading && (
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="text-white/35 hover:text-white transition-colors flex items-center gap-1 text-[13px] shrink-0"
                    aria-label="Remove photo"
                  >
                    <FiX className="text-[15px]" /> Remove
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Role section */}

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-3">
                <label className="block text-[13px] text-white/55">
                  Please select a role
                </label>
                <div className="flex gap-4">
                  {["seeker", "recruiter"].map((role) => (
                    <label
                      key={role}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        value={role}
                        checked={field.value === role}
                        onChange={() => field.onChange(role)}
                        className="accent-violet-600 w-4 h-4 cursor-pointer"
                      />
                      <span className="text-[14px] text-white/80 capitalize">
                        {role === "seeker" ? "Job Seeker" : "Recruiter"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          />

          {/* Password */}
          <div>
            <label
              className="block text-[13px] text-white/55 mb-1.5"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <FiLock className="absolute left-3 text-white/30 text-[17px] pointer-events-none" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                disabled={isLoading}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-10 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-white/30 hover:text-white/60 transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <FiEyeOff className="text-[17px]" />
                ) : (
                  <FiEye className="text-[17px]" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-[12px] text-red-400 mt-1.5">
                {errors.password.message}
              </p>
            )}

            {/* Forgot password */}
            <div className="flex justify-end mt-2">
              <Link
                href="/forgot-password"
                className="text-[13px] text-violet-400 hover:text-violet-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-violet-600 hover:bg-violet-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-[15px] py-2.5 rounded-lg transition-all duration-200 mt-1 flex items-center justify-center gap-2"
          >
            {isLoading && (
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
            {btnLabel}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-[12px] text-white/25">or</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>
        {/* Social buttons  */}
        <div className="flex flex-col md:flex-row gap-3 mb-2">
          <button
            type="button"
            onClick={handleGoogle}
            disabled={isAnyLoading}
            className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-2.5 text-[14px] font-medium text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {googleLoading ? (
              <Spinner />
            ) : (
              <FcGoogle className="text-[20px] shrink-0" />
            )}
            {googleLoading ? "Redirecting…" : "Continue with Google"}
          </button>

          <button
            type="button"
            onClick={handleGithub}
            disabled={isAnyLoading}
            className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-2.5 text-[14px] font-medium text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {githubLoading ? (
              <Spinner />
            ) : (
              <FaGithub className="text-[20px] shrink-0" />
            )}
            {githubLoading ? "Redirecting…" : "Continue with GitHub"}
          </button>
        </div>

        {/* Sign in */}
        <p className="text-center text-[13px] text-white/40">
          Already have an account?{" "}
          <Link
            href={`/signin?redirect=${redirectTo}`}
            className="text-violet-400 font-medium hover:text-violet-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}