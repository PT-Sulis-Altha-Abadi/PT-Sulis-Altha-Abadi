"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";

const inputClass =
  "min-h-12 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-blue-100";

export default function AdminLoginForm() {
  const [status, setStatus] = useState({ state: "idle", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());

    setStatus({ state: "loading", message: "Memeriksa akses..." });

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus({ state: "error", message: result.message ?? "Login gagal." });
        return;
      }

      window.location.assign("/admin/messages");
    } catch {
      setStatus({ state: "error", message: "Koneksi bermasalah. Coba ulang lagi." });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <label className="grid gap-2 text-sm font-bold text-slate-800">
        Username
        <input className={inputClass} name="username" placeholder="Username admin" required />
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-800">
        Password
        <input
          className={inputClass}
          name="password"
          type="password"
          placeholder="Password admin"
          required
        />
      </label>

      <button
        type="submit"
        disabled={status.state === "loading"}
        className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-md bg-brand px-5 text-sm font-extrabold text-white transition hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Icon name="Check" className="h-5 w-5" />
        Masuk Admin
      </button>

      {status.message ? (
        <p
          className={cn(
            "text-sm font-bold",
            status.state === "loading" && "text-slate-600",
            status.state === "error" && "text-red-600",
          )}
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
