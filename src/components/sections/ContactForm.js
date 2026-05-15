"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";

const fieldClass =
  "min-h-12 w-full rounded-md border border-slate-200 bg-white px-11 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-blue-100";

function FieldIcon({ name }) {
  return (
    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand">
      <Icon name={name} className="h-5 w-5" />
    </span>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState({ state: "idle", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus({ state: "loading", message: "Mengirim pesan..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus({ state: "error", message: result.message ?? "Data belum valid." });
        return;
      }

      form.reset();
      setStatus({ state: "success", message: result.message ?? "Pesan berhasil dikirim." });
    } catch {
      setStatus({ state: "error", message: "Koneksi bermasalah. Coba ulang lagi." });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
      <h2 className="text-2xl font-extrabold text-brand">KIRIM PESAN</h2>
      <p className="text-lg italic text-slate-700">SEND MESSAGE</p>

      <div className="mt-6 grid gap-3">
        <label className="relative block">
          <FieldIcon name="Users2" />
          <input className={fieldClass} name="name" placeholder="Nama / Name" required minLength={2} />
        </label>
        <label className="relative block">
          <FieldIcon name="Mail" />
          <input className={fieldClass} name="email" type="email" placeholder="Email" required />
        </label>
        <label className="relative block">
          <FieldIcon name="MapPin" />
          <input className={fieldClass} name="company" placeholder="Perusahaan / Company" />
        </label>
        <textarea
          className="min-h-32 w-full resize-y rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-blue-100"
          name="message"
          placeholder="Pesan / Message"
          required
          minLength={10}
        />
      </div>

      <button
        type="submit"
        disabled={status.state === "loading"}
        className="mt-4 inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-md bg-accent px-5 text-sm font-extrabold text-white transition hover:bg-[#b77f2a] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Icon name="Send" className="h-5 w-5" />
        Kirim Pesan / <span className="font-medium italic">Send Message</span>
      </button>

      {status.message ? (
        <p
          className={cn(
            "mt-4 text-sm font-bold",
            status.state === "success" && "text-green",
            status.state === "error" && "text-red-600",
            status.state === "loading" && "text-slate-600",
          )}
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
