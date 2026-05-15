import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import { adminSessionCookieName, isAdminSessionValid } from "@/lib/admin-auth";
import { getContactMessages } from "@/lib/message-store";

export const metadata = {
  title: "Pesan Masuk Admin",
};

export const dynamic = "force-dynamic";

function formatDate(value) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));
}

export default async function AdminMessagesPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(adminSessionCookieName)?.value;

  if (!isAdminSessionValid(session)) {
    redirect("/admin/login");
  }

  const messages = await getContactMessages();
  const latestMessage = messages[0];

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-shell">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-slate-500">Admin</p>
            <h1 className="mt-1 text-3xl font-extrabold text-brand">Pesan Masuk</h1>
            <p className="mt-2 text-sm text-slate-600">
              Data dari form Kirim Pesan / Send Message pada halaman Kontak.
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        <div className="grid gap-4 py-6 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Pesan</p>
            <p className="mt-2 text-4xl font-extrabold text-brand">{messages.length}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
            <p className="text-sm text-slate-500">Pesan Terbaru</p>
            <p className="mt-2 text-base font-bold text-slate-900">
              {latestMessage ? latestMessage.name : "Belum ada pesan masuk"}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {latestMessage ? formatDate(latestMessage.createdAt) : "Pesan baru akan muncul di sini."}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          {messages.length ? (
            <>
              <div className="hidden grid-cols-[180px_220px_180px_1fr] gap-4 border-b border-slate-200 bg-slate-100 px-5 py-4 text-sm font-extrabold text-brand md:grid">
                <span>Waktu</span>
                <span>Pengirim</span>
                <span>Perusahaan</span>
                <span>Pesan</span>
              </div>
              <div className="divide-y divide-slate-200">
                {messages.map((message) => (
                  <article
                    key={message.id}
                    className="grid gap-3 px-5 py-5 md:grid-cols-[180px_220px_180px_1fr] md:gap-4"
                  >
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-500 md:hidden">Waktu</p>
                      <p className="text-sm text-slate-700">{formatDate(message.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-500 md:hidden">Pengirim</p>
                      <p className="text-sm font-bold text-slate-900">{message.name}</p>
                      <p className="text-sm text-slate-600">{message.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-500 md:hidden">Perusahaan</p>
                      <p className="text-sm text-slate-700">{message.company || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-500 md:hidden">Pesan</p>
                      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">{message.message}</p>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="px-5 py-12 text-center">
              <p className="text-lg font-extrabold text-brand">Belum ada pesan masuk</p>
              <p className="mt-2 text-sm text-slate-600">
                Setelah pengunjung mengirim form kontak, datanya akan muncul di sini.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
