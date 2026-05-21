import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
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
    <AdminShell
      active="messages"
      title="Pesan Masuk"
      description="Data dari form Kirim Pesan / Send Message pada halaman Kontak. Pesan ini bisa dijadikan lead awal untuk follow up customer."
      messagesCount={messages.length}
    >
      <div className="grid gap-5">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/10">
            <p className="text-sm font-bold text-slate-400">Total Pesan</p>
            <p className="mt-2 text-4xl font-extrabold text-white">{messages.length}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/10 md:col-span-2">
            <p className="text-sm font-bold text-slate-400">Pesan Terbaru</p>
            <p className="mt-2 text-base font-extrabold text-white">
              {latestMessage ? latestMessage.name : "Belum ada pesan masuk"}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {latestMessage ? formatDate(latestMessage.createdAt) : "Pesan baru akan muncul di sini."}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/10">
          {messages.length ? (
            <>
              <div className="hidden grid-cols-[190px_240px_190px_1fr] gap-4 border-b border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-extrabold text-cyan-200 md:grid">
                <span>Waktu</span>
                <span>Pengirim</span>
                <span>Perusahaan</span>
                <span>Pesan</span>
              </div>
              <div className="divide-y divide-white/10">
                {messages.map((message) => (
                  <article
                    key={message.id}
                    className="grid gap-3 px-5 py-5 md:grid-cols-[190px_240px_190px_1fr] md:gap-4"
                  >
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-500 md:hidden">Waktu</p>
                      <p className="text-sm text-slate-300">{formatDate(message.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-500 md:hidden">Pengirim</p>
                      <p className="text-sm font-extrabold text-white">{message.name}</p>
                      <p className="text-sm text-slate-400">{message.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-500 md:hidden">Perusahaan</p>
                      <p className="text-sm text-slate-300">{message.company || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-500 md:hidden">Pesan</p>
                      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-300">{message.message}</p>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="px-5 py-12 text-center">
              <p className="text-lg font-extrabold text-white">Belum ada pesan masuk</p>
              <p className="mt-2 text-sm text-slate-400">
                Setelah pengunjung mengirim form kontak, datanya akan muncul di sini.
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
