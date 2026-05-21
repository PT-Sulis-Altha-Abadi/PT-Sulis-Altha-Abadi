import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import BrandMark from "@/components/layout/BrandMark";
import { adminSessionCookieName, isAdminSessionValid } from "@/lib/admin-auth";

export const metadata = {
  title: "Login Admin",
};

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(adminSessionCookieName)?.value;

  if (isAdminSessionValid(session)) {
    redirect("/admin");
  }

  return (
    <section className="grid min-h-screen place-items-center bg-[#08111f] px-4 py-12 text-white">
      <div className="w-full max-w-[520px]">
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-7 shadow-2xl shadow-black/20">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-14 w-[88px] place-items-center rounded-lg bg-white">
              <BrandMark className="h-12 w-[76px]" />
            </span>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Admin</p>
              <p className="mt-1 text-xs text-slate-400">PT Sulis Altha Abadi</p>
            </div>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold text-white">Masuk Dashboard</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Gunakan akses admin untuk membuka dashboard internal, pesan masuk, lead buyer,
            follow up, closing, container, produk, supplier, profit, tim, dan target bulanan.
          </p>
          <div className="mt-7">
            <AdminLoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
