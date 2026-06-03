"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLogOut, FiUser } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import Avatar from "./Avatar";

export default function NavActions({
  mobileAvatarOnly = false,
  drawerUserInfo   = false,
  drawerActions    = false,
  onSignOut,
}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    onSignOut?.();
    router.push("/signin");
  };

  // ── Loading skeleton ────────────────────────────────────────────
  if (isPending) {
    if (mobileAvatarOnly) return <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />;
    if (drawerUserInfo || drawerActions) return null;
    return <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />;
  }

  // ── Mobile: avatar only (shown next to hamburger) ───────────────
  if (mobileAvatarOnly) {
    return session ? <Avatar user={user} size={34} /> : null;
  }

  // ── Drawer: user info block ─────────────────────────────────────
  if (drawerUserInfo) {
    if (!session) return null;
    return (
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
        <Avatar user={user} size={42} />
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-medium text-white truncate">{user?.name}</p>
          <p className="text-[12px] text-white/45 truncate">{user?.email}</p>
        </div>
      </div>
    );
  }

  // ── Drawer: bottom auth actions ─────────────────────────────────
  if (drawerActions) {
    return session ? (
      <button
        onClick={handleSignOut}
        className="w-full flex items-center justify-center gap-2 text-[14px] text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/15 transition-colors py-3 rounded-xl"
      >
        <FiLogOut className="text-[17px]" />
        Sign Out
      </button>
    ) : (
      <div className="flex flex-col gap-2">
        <Link
          href="/signin"
          className="w-full flex items-center justify-center gap-2 text-[14px] font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/15 transition-colors py-3 rounded-xl"
        >
          <FiUser className="text-[17px]" />
          Sign In
        </Link>
        <Link
          href="/get-started"
          className="w-full flex items-center justify-center text-[14px] font-semibold text-gray-900 bg-white hover:bg-gray-100 transition-colors py-3 rounded-xl"
        >
          Get Started
        </Link>
      </div>
    );
  }

  // ── Desktop: session actions ────────────────────────────────────
  return session ? (
    <div className="flex items-center gap-3">
      <Avatar user={user} size={36} />
      <span className="text-[14px] text-white/80 hidden lg:block max-w-[120px] truncate">
        {user?.name}
      </span>
      <button
        onClick={handleSignOut}
        className="flex items-center gap-1.5 text-[14px] text-red-400 hover:text-red-300 transition-colors px-3 py-2 rounded-lg hover:bg-red-500/10"
      >
        <FiLogOut className="text-[16px]" />
        Sign Out
      </button>
    </div>
  ) : (
    <>
      <Link
        href="/signin"
        className="text-[15px] font-medium text-indigo-400 hover:text-indigo-300 px-3 py-2"
      >
        Sign In
      </Link>
      <Link
        href="/get-started"
        className="ml-2 bg-white text-gray-900 text-[15px] font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
      >
        Get Started
      </Link>
    </>
  );
}