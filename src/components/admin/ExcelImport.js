"use client";

import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import Icon from "@/components/Icon";
import { buildSectionTemplate } from "@/lib/admin-excel";
import { editableDashboardSectionMap } from "@/data/admin-dashboard-config";
import { cn } from "@/lib/utils";

function downloadTemplate(sectionKey) {
  const template = buildSectionTemplate(sectionKey);
  const worksheet = XLSX.utils.aoa_to_sheet([template.headers, template.sampleRow]);
  worksheet["!cols"] = template.headers.map(() => ({ wch: 22 }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, template.sheetName);
  XLSX.writeFile(workbook, `template-${sectionKey}.xlsx`);
}

async function parseExcelFile(file) {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const firstSheet = workbook.SheetNames[0];

  if (!firstSheet) {
    return [];
  }

  const sheet = workbook.Sheets[firstSheet];
  return XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });
}

export default function ExcelImport({ sectionKey, onImported, compact = false }) {
  const section = editableDashboardSectionMap[sectionKey];
  const [mode, setMode] = useState("append");
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  if (!section) return null;

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus({ state: "loading", message: "Membaca file Excel..." });

    try {
      const rows = await parseExcelFile(file);

      if (!rows.length) {
        setStatus({ state: "error", message: "File kosong atau format tidak terbaca." });
        return;
      }

      const response = await fetch("/api/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: sectionKey, mode, rows }),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus({ state: "error", message: result.message ?? "Gagal import." });
        return;
      }

      setStatus({
        state: "success",
        message: `${result.imported ?? rows.length} baris berhasil di-import.`,
      });
      onImported?.(result.data);
    } catch (error) {
      setStatus({
        state: "error",
        message: error.message || "Gagal memproses file Excel.",
      });
    } finally {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className={cn("rounded-lg border border-white/10 bg-[#0b1626] p-3", compact && "p-2.5")}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3"
      >
        <span className="flex items-center gap-2 text-sm font-extrabold text-white">
          <Icon name="Download" className="h-4 w-4 rotate-180 text-emerald-300" />
          Import Excel
        </span>
        <Icon
          name="ChevronDown"
          className={cn("h-4 w-4 text-slate-400 transition", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div className="mt-3 grid gap-3 border-t border-white/10 pt-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Mode Import
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <label
                className={cn(
                  "flex cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-xs font-bold transition",
                  mode === "append"
                    ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100"
                    : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25",
                )}
              >
                <input
                  type="radio"
                  className="hidden"
                  checked={mode === "append"}
                  onChange={() => setMode("append")}
                />
                Append (tambah)
              </label>
              <label
                className={cn(
                  "flex cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-xs font-bold transition",
                  mode === "replace"
                    ? "border-amber-300/40 bg-amber-400/15 text-amber-100"
                    : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25",
                )}
              >
                <input
                  type="radio"
                  className="hidden"
                  checked={mode === "replace"}
                  onChange={() => setMode("replace")}
                />
                Replace (ganti)
              </label>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => downloadTemplate(sectionKey)}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-bold text-slate-200 transition hover:border-white/25 hover:text-white"
            >
              <Icon name="Download" className="h-4 w-4" />
              Download Template
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={status.state === "loading"}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-emerald-500 px-3 text-xs font-extrabold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Icon name="Plus" className="h-4 w-4" />
              {status.state === "loading" ? "Memproses..." : "Pilih File Excel"}
            </button>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={handleFileChange}
          />

          {status.message ? (
            <p
              className={cn(
                "rounded-md border px-3 py-2 text-xs font-bold",
                status.state === "success" && "border-emerald-300/20 bg-emerald-400/10 text-emerald-200",
                status.state === "error" && "border-red-300/20 bg-red-400/10 text-red-100",
                status.state === "loading" && "border-blue-300/20 bg-blue-400/10 text-blue-100",
              )}
            >
              {status.message}
            </p>
          ) : null}

          <p className="text-[10px] leading-snug text-slate-500">
            Header kolom Excel harus sama dengan label field. Download template untuk format yang pas.
          </p>
        </div>
      ) : null}
    </div>
  );
}
