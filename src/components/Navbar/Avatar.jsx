// No "use client" — pure presentational, works in both server & client

import Image from "next/image";

export default function Avatar({ user, size = 36 }) {
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  if (user?.image) {
    return (
      <Image
        src={user.image}
        alt={user.name || "User avatar"}
        width={size}
        height={size}
        className="rounded-full object-cover border border-white/20 shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full bg-violet-600 flex items-center justify-center text-white font-semibold border border-violet-400/40 shrink-0 select-none"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-label={user?.name || "User"}
    >
      {initials}
    </div>
  );
}