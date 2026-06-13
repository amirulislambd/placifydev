// UserAvatar.jsx — Server Component
import Image from "next/image";

export default function UserAvatar({ name, image, size = 32 }) {
  const initials = name
    ? name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  if (image) {
    return (
      <Image
        src={image}
        alt={name || "User"}
        width={size}
        height={size}
        className="rounded-full object-cover border border-white/10 shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full bg-violet-600/20 border border-violet-500/20 flex items-center justify-center text-violet-300 font-semibold shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}