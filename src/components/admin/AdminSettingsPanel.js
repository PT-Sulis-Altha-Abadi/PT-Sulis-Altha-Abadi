"use client";

import Icon from "@/components/Icon";

export default function AdminSettingsPanel() {
  return (
    <div className="grid gap-3">
      <section className="rounded-xl border border-white/10 bg-[#101b2b] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-300/30">
            <Icon name="Settings" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-300">
              Pengaturan
            </p>
            <h2 className="mt-1 text-lg font-extrabold text-white">Konfigurasi Dashboard</h2>
            <p className="mt-1 text-xs text-slate-400">
              Pengaturan akun admin, preferensi dashboard, dan integrasi sistem.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-3 lg:grid-cols-2">
        <section className="rounded-xl border border-white/10 bg-[#101b2b] p-4">
          <h3 className="text-sm font-extrabold text-white">Akun Admin</h3>
          <p className="mt-1 text-xs text-slate-400">
            Username dan password diatur lewat environment variable di server (ADMIN_USERNAME &
            ADMIN_PASSWORD).
          </p>
          <div className="mt-3 grid gap-2 text-[12px]">
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="text-slate-400">Username</span>
              <span className="font-bold text-white">******</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="text-slate-400">Session Cookie</span>
              <span className="font-bold text-emerald-300">Aktif (8 jam)</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="text-slate-400">Cookie Secure</span>
              <span className="font-bold text-white">Production only</span>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-[#101b2b] p-4">
          <h3 className="text-sm font-extrabold text-white">Penyimpanan Data</h3>
          <p className="mt-1 text-xs text-slate-400">
            Data dashboard otomatis disimpan ke Netlify Blobs saat di-deploy, dan ke file
            lokal saat development.
          </p>
          <div className="mt-3 grid gap-2 text-[12px]">
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="text-slate-400">Provider</span>
              <span className="font-bold text-white">Netlify Blobs / FS</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="text-slate-400">Auto Backup</span>
              <span className="font-bold text-emerald-300">Setiap perubahan</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="text-slate-400">Versi Schema</span>
              <span className="font-bold text-white">v1.0</span>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-[#101b2b] p-4">
          <h3 className="text-sm font-extrabold text-white">Integrasi</h3>
          <p className="mt-1 text-xs text-slate-400">
            Layanan eksternal yang terhubung dengan website.
          </p>
          <div className="mt-3 grid gap-2 text-[12px]">
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="text-slate-400">AI Assistant (Gemini)</span>
              <span className="font-bold text-emerald-300">Aktif</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="text-slate-400">Form Kontak</span>
              <span className="font-bold text-emerald-300">Aktif</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="text-slate-400">Excel Import / Export</span>
              <span className="font-bold text-emerald-300">Aktif</span>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-[#101b2b] p-4">
          <h3 className="text-sm font-extrabold text-white">Tentang</h3>
          <p className="mt-1 text-xs text-slate-400">Informasi sistem dashboard.</p>
          <div className="mt-3 grid gap-2 text-[12px]">
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="text-slate-400">Versi Dashboard</span>
              <span className="font-bold text-white">v1.0.0</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="text-slate-400">Framework</span>
              <span className="font-bold text-white">Next.js 16</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="text-slate-400">Hosting</span>
              <span className="font-bold text-white">Netlify</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
