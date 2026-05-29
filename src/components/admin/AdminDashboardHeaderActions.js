"use client";

import Icon from "@/components/Icon";

export default function AdminDashboardHeaderActions() {
  function handleDownload() {
    if (typeof window !== "undefined") {
      window.print();
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-[12px] font-bold text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
      >
        Semua Produk
        <Icon name="ChevronDown" className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-[12px] font-bold text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
      >
        <Icon name="CalendarDays" className="h-3.5 w-3.5" />
        01 Mei 2025 - 15 Mei 2025
      </button>
      <button
        type="button"
        onClick={handleDownload}
        className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-emerald-300/30 bg-emerald-400/10 px-3 text-[12px] font-bold text-emerald-200 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
      >
        <Icon name="Download" className="h-3.5 w-3.5" />
        Download Report
      </button>
    </div>
  );
}
