"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { editableDashboardSectionMap } from "@/data/admin-dashboard-config";
import { cn } from "@/lib/utils";

function getDashboardList(data, sectionKey) {
  return Array.isArray(data?.[sectionKey]) ? data[sectionKey] : [];
}

function buildBlankRecord(sectionKey) {
  const section = editableDashboardSectionMap[sectionKey];

  return Object.fromEntries(
    section.fields.map((field) => [field.name, field.type === "number" ? 0 : ""]),
  );
}

function getRecordTitle(sectionKey, record) {
  const section = editableDashboardSectionMap[sectionKey];
  return record[section.primaryField] || "Data baru";
}

function FormPanel({ section, values, editingRecord, saving, onChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-white/10 bg-[#101b2b] p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-300">
            {editingRecord ? "Edit Data" : "Tambah Data"}
          </p>
          <h2 className="mt-1 text-lg font-extrabold text-white">{section.title}</h2>
        </div>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Tutup form"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-white/10 text-slate-300 transition hover:border-white/25 hover:text-white"
        >
          <Icon name="X" className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid gap-4">
        {section.fields.map((field) => {
          const inputClass =
            "min-h-11 w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/50 focus:ring-4 focus:ring-emerald-300/10";

          return (
            <label key={field.name} className="grid gap-2 text-sm font-bold text-slate-200">
              {field.label}
              {field.type === "textarea" ? (
                <textarea
                  value={values[field.name] ?? ""}
                  onChange={(event) => onChange(field, event.target.value)}
                  required={field.required}
                  className={cn(inputClass, "min-h-28 resize-y")}
                />
              ) : (
                <input
                  value={values[field.name] ?? ""}
                  onChange={(event) => onChange(field, event.target.value)}
                  required={field.required}
                  type={field.type}
                  min={field.min}
                  max={field.max}
                  className={inputClass}
                />
              )}
            </label>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 text-sm font-extrabold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Icon name="Check" className="h-4 w-4" />
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/10 px-4 text-sm font-bold text-slate-300 transition hover:border-white/25 hover:text-white"
        >
          Batal
        </button>
      </div>
    </form>
  );
}

function RecordCard({ sectionKey, record, onEdit, onDelete, deleting }) {
  const section = editableDashboardSectionMap[sectionKey];

  return (
    <article className="min-w-0 rounded-lg border border-white/10 bg-[#101b2b] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="break-words text-base font-extrabold text-white">{getRecordTitle(sectionKey, record)}</h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-300">{section.shortTitle}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-emerald-400/10 text-emerald-200 ring-1 ring-emerald-300/20">
          <Icon name={section.icon} className="h-5 w-5" />
        </span>
      </div>

      <dl className="mt-4 grid gap-3">
        {section.fields.map((field) => (
          <div key={field.name} className="grid gap-1 border-t border-white/10 pt-3 first:border-t-0 first:pt-0">
            <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{field.label}</dt>
            <dd className="break-words text-sm leading-6 text-slate-200">{String(record[field.name] ?? "-")}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-blue-300/20 bg-blue-400/10 px-3 text-sm font-bold text-blue-100 transition hover:border-blue-300/45"
        >
          <Icon name="Pencil" className="h-4 w-4" />
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={deleting}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-red-300/20 bg-red-400/10 px-3 text-sm font-bold text-red-100 transition hover:border-red-300/45 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Icon name="Trash2" className="h-4 w-4" />
          {deleting ? "Hapus..." : "Hapus"}
        </button>
      </div>
    </article>
  );
}

export default function AdminModuleManager({ module, initialData }) {
  const [data, setData] = useState(initialData);
  const [activeSectionKey, setActiveSectionKey] = useState(module.sectionKeys[0]);
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formValues, setFormValues] = useState(buildBlankRecord(module.sectionKeys[0]));
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [deletingId, setDeletingId] = useState("");
  const section = editableDashboardSectionMap[activeSectionKey];
  const records = getDashboardList(data, activeSectionKey);
  const filteredRecords = records.filter((record) => {
    return JSON.stringify(record).toLowerCase().includes(query.toLowerCase());
  });

  function switchSection(sectionKey) {
    setActiveSectionKey(sectionKey);
    setQuery("");
    setEditingRecord(null);
    setFormOpen(false);
    setFormValues(buildBlankRecord(sectionKey));
    setStatus({ state: "idle", message: "" });
  }

  function openCreate() {
    setEditingRecord(null);
    setFormValues(buildBlankRecord(activeSectionKey));
    setFormOpen(true);
    setStatus({ state: "idle", message: "" });
  }

  function openEdit(record) {
    setEditingRecord(record);
    setFormValues({ ...record });
    setFormOpen(true);
    setStatus({ state: "idle", message: "" });
  }

  function handleFieldChange(field, value) {
    setFormValues((current) => ({
      ...current,
      [field.name]: field.type === "number" ? Number(value) : value,
    }));
  }

  async function saveRecord(event) {
    event.preventDefault();

    const missingField = section.fields.find((field) => {
      return field.required && String(formValues[field.name] ?? "").trim() === "";
    });

    if (missingField) {
      setStatus({ state: "error", message: `${missingField.label} wajib diisi.` });
      return;
    }

    setStatus({ state: "saving", message: "Menyimpan data..." });

    try {
      const response = await fetch("/api/admin/dashboard", {
        method: editingRecord ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: activeSectionKey,
          id: editingRecord?.id,
          record: formValues,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus({ state: "error", message: result.message ?? "Data gagal disimpan." });
        return;
      }

      setData(result.data);
      setFormOpen(false);
      setEditingRecord(null);
      setFormValues(buildBlankRecord(activeSectionKey));
      setStatus({ state: "success", message: result.message ?? "Data tersimpan." });
    } catch {
      setStatus({ state: "error", message: "Koneksi bermasalah. Coba ulang lagi." });
    }
  }

  async function deleteRecord(record) {
    const ok = window.confirm(`Hapus data "${getRecordTitle(activeSectionKey, record)}"?`);

    if (!ok) {
      return;
    }

    setDeletingId(record.id);
    setStatus({ state: "saving", message: "Menghapus data..." });

    try {
      const response = await fetch("/api/admin/dashboard", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: activeSectionKey,
          id: record.id,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus({ state: "error", message: result.message ?? "Data gagal dihapus." });
        return;
      }

      setData(result.data);
      setStatus({ state: "success", message: result.message ?? "Data terhapus." });
    } catch {
      setStatus({ state: "error", message: "Koneksi bermasalah. Coba ulang lagi." });
    } finally {
      setDeletingId("");
    }
  }

  return (
    <div className="grid gap-4">
      {module.sectionKeys.length > 1 ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {module.sectionKeys.map((sectionKey) => {
            const item = editableDashboardSectionMap[sectionKey];

            return (
              <button
                key={sectionKey}
                type="button"
                onClick={() => switchSection(sectionKey)}
                className={cn(
                  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 text-sm font-bold transition",
                  activeSectionKey === sectionKey
                    ? "border-emerald-300/35 bg-emerald-400/15 text-emerald-100"
                    : "border-white/10 bg-[#101b2b] text-slate-300 hover:border-white/25 hover:text-white",
                )}
              >
                <Icon name={item.icon} className="h-4 w-4" />
                {item.title}
              </button>
            );
          })}
        </div>
      ) : null}

      <section className="rounded-lg border border-white/10 bg-[#101b2b] p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-300">{section.shortTitle}</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white">{section.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{section.description}</p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-emerald-500 px-5 text-sm font-extrabold text-white transition hover:bg-emerald-600"
          >
            <Icon name="Plus" className="h-4 w-4" />
            Tambah Data
          </button>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px]">
        <section className="min-w-0 rounded-lg border border-white/10 bg-[#101b2b] p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <label className="relative min-w-0">
              <Icon name="Search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari data..."
                className="min-h-11 w-full rounded-md border border-white/10 bg-white/[0.04] pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-300/50 focus:ring-4 focus:ring-emerald-300/10"
              />
            </label>
            <span className="text-sm font-bold text-slate-400">{filteredRecords.length} data</span>
          </div>

          {status.message ? (
            <p
              className={cn(
                "mt-4 rounded-md border px-4 py-3 text-sm font-bold",
                status.state === "success" && "border-emerald-300/20 bg-emerald-400/10 text-emerald-200",
                status.state === "error" && "border-red-300/20 bg-red-400/10 text-red-100",
                status.state === "saving" && "border-blue-300/20 bg-blue-400/10 text-blue-100",
              )}
            >
              {status.message}
            </p>
          ) : null}

          <div className="mt-5 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            {filteredRecords.length ? (
              filteredRecords.map((record) => (
                <RecordCard
                  key={record.id}
                  sectionKey={activeSectionKey}
                  record={record}
                  onEdit={() => openEdit(record)}
                  onDelete={() => deleteRecord(record)}
                  deleting={deletingId === record.id}
                />
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-white/15 p-8 text-center lg:col-span-2 2xl:col-span-3">
                <p className="text-lg font-extrabold text-white">Data belum ada</p>
                <p className="mt-2 text-sm text-slate-400">Klik tombol tambah untuk mengisi halaman ini.</p>
              </div>
            )}
          </div>
        </section>

        <aside className="min-w-0 xl:sticky xl:top-24 xl:self-start">
          {formOpen ? (
            <FormPanel
              section={section}
              values={formValues}
              editingRecord={editingRecord}
              saving={status.state === "saving"}
              onChange={handleFieldChange}
              onSubmit={saveRecord}
              onCancel={() => {
                setFormOpen(false);
                setEditingRecord(null);
                setFormValues(buildBlankRecord(activeSectionKey));
              }}
            />
          ) : (
            <div className="rounded-lg border border-white/10 bg-[#101b2b] p-4 sm:p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-300">Ringkasan</p>
              <h2 className="mt-2 text-xl font-extrabold text-white">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{section.description}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs text-slate-500">Total</p>
                  <p className="mt-1 text-2xl font-extrabold text-white">{records.length}</p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs text-slate-500">Filter</p>
                  <p className="mt-1 text-2xl font-extrabold text-white">{filteredRecords.length}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={openCreate}
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 text-sm font-extrabold text-white transition hover:bg-emerald-600"
              >
                <Icon name="Plus" className="h-4 w-4" />
                Tambah {section.shortTitle}
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
