"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";

export default function AdminLogoutButton() {
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
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 transition hover:border-brand hover:text-brand"
    >
      <Icon name="X" className="h-4 w-4" />
      Keluar
    </button>
  );
}
