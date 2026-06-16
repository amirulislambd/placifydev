"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { HiOutlinePlay } from "react-icons/hi2";

export default function SignInForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setServerError("");
    try {
      setLoading(true);
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      if (error) {
        setServerError(error.message || "Invalid email or password.");
        return;
      }
      router.push(redirectTo);
    } catch (err) {
      setServerError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setServerError("");
    try {
      setGoogleLoading(true);
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch (err) {
      setServerError(err.message || "Google sign in failed.");
      setGoogleLoading(false);
    }
  };

  const handleGithub = async () => {
    setServerError("");
    try {
      setGithubLoading(true);
      await authClient.signIn.social({ provider: "github", callbackURL: "/" });
    } catch (err) {
      setServerError(err.message || "GitHub sign in failed.");
      setGithubLoading(false);
    }
  };

  const isAnyLoading = loading || googleLoading || githubLoading;

  const Spinner = () => (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
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
  );

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
          Welcome back
        </h1>
        <p className="text-[13px] text-white/45 mb-6">
          Sign in to your account to continue.
        </p>

        {/* Server error */}
        {serverError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] rounded-lg px-4 py-3 mb-4">
            {serverError}
          </div>
        )}

        {/* Email/Password form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                disabled={isAnyLoading}
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
                placeholder="Your password"
                disabled={isAnyLoading}
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

            <div className="flex justify-end mt-2">
              <Link
                href="/forgot-password"
                className="text-[13px] text-violet-400 hover:text-violet-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Sign in button */}
          <button
            type="submit"
            disabled={isAnyLoading}
            className="w-full bg-violet-600 hover:bg-violet-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-[15px] py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading && <Spinner />}
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-[12px] text-white/25">or continue with</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        {/* Social buttons  */}
        <div className="flex flex-col md:flex-row gap-3">
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

        {/* Sign up link */}
        <p className="text-center text-[13px] text-white/40 mt-6">
          Don't have an account?{" "}
          <Link
            href={`/signup?redirect=${redirectTo}`}
            className="text-violet-400 font-medium hover:text-violet-300 transition-colors"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}