"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";

export default function AdminLogoutButton({ variant = "light" }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 text-sm font-bold transition",
        variant === "dark"
          ? "border-white/10 bg-white/[0.04] text-slate-200 hover:border-red-300/40 hover:text-white"
          : "border-slate-200 bg-white text-slate-800 hover:border-brand hover:text-brand",
      )}
    >
      <Icon name="X" className="h-4 w-4" />
      Keluar
    </button>
  );
}
