import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { adminSessionCookieName, isAdminSessionValid, getAdminCredentials } from "@/lib/admin-auth";
import { getContactMessages } from "@/lib/message-store";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Pengaturan Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(adminSessionCookieName)?.value;

  if (!isAdminSessionValid(session)) {
    redirect("/admin/login");
  }

  const messages = await getContactMessages();
  const { username } = getAdminCredentials();

  const items = [
    { label: "Username Admin", value: username, icon: "Users2" },
    { label: "Sesi Login", value: "Aktif (8 jam)", icon: "ShieldCheck" },
    { label: "Cookie Secure", value: process.env.ADMIN_COOKIE_SECURE === "true" ? "Aktif" : "Non-aktif (development)", icon: "Settings" },
    { label: "Storage", value: process.env.SITE_ID || process.env.MESSAGE_STORAGE === "netlify-blobs" ? "Netlify Blobs" : "File system lokal", icon: "DatabaseZap" },
  ];

  return (
    <AdminShell
      active="settings"
      title="Pengaturan"
      eyebrow="Settings"
      description="Konfigurasi dasar dashboard admin dan informasi sesi login."
      messagesCount={messages.length}
    >
      <div className="grid gap-4">
        <section className="rounded-lg border border-white/10 bg-[#101b2b] p-5 shadow-2xl shadow-black/10">
          <h2 className="text-lg font-extrabold text-white">Informasi Akun</h2>
          <p className="mt-1 text-sm text-slate-400">
            Untuk mengubah username/password admin, edit environment variable <code className="rounded bg-white/[0.05] px-2 py-0.5 text-xs">ADMIN_USERNAME</code> dan <code className="rounded bg-white/[0.05] px-2 py-0.5 text-xs">ADMIN_PASSWORD</code> lalu deploy ulang.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] p-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-400/10 text-emerald-200">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{item.label}</p>
                  <p className="mt-1 break-words text-sm font-extrabold text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-[#101b2b] p-5 shadow-2xl shadow-black/10">
          <h2 className="text-lg font-extrabold text-white">Tips Operasional</h2>
          <ul className="mt-4 grid gap-2 text-sm text-slate-300">
            <li className="flex gap-3">
              <Icon name="CircleCheck" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              Gunakan tombol <strong>Import Excel</strong> di tiap modul untuk upload data massal.
            </li>
            <li className="flex gap-3">
              <Icon name="CircleCheck" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              Download <strong>template Excel</strong> dulu supaya kolom-kolom sesuai struktur data.
            </li>
            <li className="flex gap-3">
              <Icon name="CircleCheck" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              Pilih mode <strong>Append</strong> untuk menambah, atau <strong>Replace</strong> untuk mengganti seluruh isi modul.
            </li>
          </ul>
        </section>
      </div>
    </AdminShell>
  );
}
