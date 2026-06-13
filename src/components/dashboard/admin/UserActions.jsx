"use client";

import { useState } from "react";
import { UpdateUserRole, updateUserStatus, deleteUser } from "@/lib/action/users";
import toast from "react-hot-toast";

const ROLE_OPTIONS = {
  seeker:    ["recruiter", "admin"],
  recruiter: ["seeker", "admin"],
  admin:     ["seeker", "recruiter"],
};

const ROLE_LABELS = {
  seeker:    "Seeker",
  recruiter: "Recruiter",
  admin:     "Admin",
};

// ── Confirm Dialog ────────────────────────────────────────────────────────────
function ConfirmDialog({ isOpen, title, description, confirmLabel, confirmColor, onConfirm, onCancel }) {
  if (!isOpen) return null;

  const colorMap = {
    red:    "bg-red-500 hover:bg-red-600 text-white",
    amber:  "bg-amber-500 hover:bg-amber-600 text-white",
    violet: "bg-violet-600 hover:bg-violet-700 text-white",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />

      {/* Dialog */}
      <div className="relative bg-[#16161f] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Title */}
        <div>
          <h3 className="text-[16px] font-semibold text-white mb-1.5">{title}</h3>
          <p className="text-[13px] text-white/45 leading-relaxed">{description}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 text-[13px] font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/20 py-2.5 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 text-[13px] font-semibold py-2.5 rounded-xl active:scale-[0.98] transition-all ${colorMap[confirmColor] || colorMap.red}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function UserActions({ user }) {
  if (!user) return null;

  const [loading, setLoading]   = useState(null);
  const [dialog, setDialog]     = useState(null);
  // dialog: { type, newRole? }

  const userId      = user.id || user._id?.$oid || user._id;
  const isSuspended = user.banned === true || user.status === "suspended";
  const otherRoles  = ROLE_OPTIONS[user.role] || [];

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleRoleChange = async (newRole) => {
    setDialog(null);
    setLoading(`role-${newRole}`);
    try {
      await UpdateUserRole(userId, newRole);
      toast.success(`Role changed to ${ROLE_LABELS[newRole]}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to change role.");
    } finally {
      setLoading(null);
    }
  };

  const handleStatusToggle = async () => {
    setDialog(null);
    const newStatus = isSuspended ? "active" : "suspended";
    setLoading("status");
    try {
      await updateUserStatus(userId, newStatus);
      toast.success(`User ${newStatus === "suspended" ? "suspended" : "activated"}.`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status.");
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async () => {
    setDialog(null);
    setLoading("delete");
    try {
      await deleteUser(userId);
      toast.success(`User "${user.name}" deleted.`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user.");
    } finally {
      setLoading(null);
    }
  };

  // ── Dialog config ─────────────────────────────────────────────────────────

  const dialogConfig = {
    role: (role) => ({
      title:        `Change Role to ${ROLE_LABELS[role]}`,
      description:  `Are you sure you want to change "${user.name}" role to ${ROLE_LABELS[role]}?`,
      confirmLabel: `Make ${ROLE_LABELS[role]}`,
      confirmColor: "violet",
      onConfirm:    () => handleRoleChange(role),
    }),
    suspend: {
      title:        "Suspend User",
      description:  `Are you sure you want to suspend "${user.name}"? They won't be able to log in.`,
      confirmLabel: "Suspend",
      confirmColor: "amber",
      onConfirm:    handleStatusToggle,
    },
    activate: {
      title:        "Activate User",
      description:  `Are you sure you want to activate "${user.name}"?`,
      confirmLabel: "Activate",
      confirmColor: "violet",
      onConfirm:    handleStatusToggle,
    },
    delete: {
      title:        "Delete User",
      description:  `Are you sure you want to delete "${user.name}"? This action cannot be undone.`,
      confirmLabel: "Delete",
      confirmColor: "red",
      onConfirm:    handleDelete,
    },
  };

  const activeDialog = dialog?.type === "role"
    ? dialogConfig.role(dialog.newRole)
    : dialogConfig[dialog?.type];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <ConfirmDialog
        isOpen={!!dialog}
        title={activeDialog?.title}
        description={activeDialog?.description}
        confirmLabel={activeDialog?.confirmLabel}
        confirmColor={activeDialog?.confirmColor}
        onConfirm={activeDialog?.onConfirm}
        onCancel={() => setDialog(null)}
      />

      {isSuspended ? (
        <div className="flex items-center justify-end gap-4">
          <button
            onClick={() => setDialog({ type: "activate" })}
            disabled={!!loading}
            className="text-[13px] text-emerald-400 hover:text-emerald-300 transition-colors disabled:opacity-50"
          >
            {loading === "status" ? "..." : "Activate"}
          </button>
          <button
            onClick={() => setDialog({ type: "delete" })}
            disabled={!!loading}
            className="text-[13px] text-white/40 hover:text-red-400 transition-colors disabled:opacity-50"
          >
            {loading === "delete" ? "..." : "Delete"}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-4">
          {otherRoles.map((role) => (
            <button
              key={role}
              onClick={() => setDialog({ type: "role", newRole: role })}
              disabled={!!loading}
              className="text-[13px] text-white/50 hover:text-white transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {loading === `role-${role}` ? "..." : `Make ${ROLE_LABELS[role]}`}
            </button>
          ))}

          <button
            onClick={() => setDialog({ type: "suspend" })}
            disabled={!!loading}
            className="text-[13px] text-amber-400 hover:text-amber-300 transition-colors disabled:opacity-50"
          >
            {loading === "status" ? "..." : "Suspend"}
          </button>

          <button
            onClick={() => setDialog({ type: "delete" })}
            disabled={!!loading}
            className="text-[13px] text-white/40 hover:text-red-400 transition-colors disabled:opacity-50"
          >
            {loading === "delete" ? "..." : "Delete"}
          </button>
        </div>
      )}
    </>
  );
}