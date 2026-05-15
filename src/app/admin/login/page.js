import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { adminSessionCookieName, isAdminSessionValid } from "@/lib/admin-auth";

export const metadata = {
  title: "Login Admin",
};

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(adminSessionCookieName)?.value;

  if (isAdminSessionValid(session)) {
    redirect("/admin/messages");
  }

  return (
    <section className="bg-slate-50 py-16">
      <div className="container-shell max-w-[520px]">
        <div className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
          <p className="text-sm font-bold uppercase text-slate-500">Admin</p>
          <h1 className="mt-2 text-3xl font-extrabold text-brand">Masuk Dashboard</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Gunakan akses admin untuk melihat pesan yang dikirim pengunjung dari form kontak.
          </p>
          <div className="mt-7">
            <AdminLoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
