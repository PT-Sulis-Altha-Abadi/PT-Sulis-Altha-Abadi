import Link from "next/link";
import Icon from "@/components/Icon";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import BrandMark from "@/components/layout/BrandMark";
import { adminModules } from "@/data/admin-dashboard-config";
import { cn } from "@/lib/utils";

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Pesan Masuk", href: "/admin/messages", icon: "Mail" },
  ...adminModules.map((module) => ({
    label: module.navLabel,
    href: `/admin/${module.slug}`,
    icon: module.icon,
  })),
];

export default function AdminShell({
  active = "dashboard",
  title,
  eyebrow = "Internal Admin",
  description,
  messagesCount = 0,
  children,
}) {
  return (
    <section className="min-h-screen overflow-x-hidden bg-[#08111f] text-white">
      <div className="grid min-h-screen lg:grid-cols-[236px_minmax(0,1fr)] 2xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="sticky top-0 z-40 border-b border-white/10 bg-[#0b1626] lg:h-screen lg:border-b-0 lg:border-r">
          <div className="flex h-full flex-col">
            <div className="border-b border-white/10 px-4 py-4">
              <Link href="/admin" className="flex items-center gap-3">
                <span className="grid h-11 w-[70px] shrink-0 place-items-center rounded-lg bg-white shadow-lg shadow-black/10 lg:h-12 lg:w-[76px]">
                  <BrandMark className="h-9 w-[58px] lg:h-10 lg:w-[64px]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-extrabold uppercase leading-5 tracking-[0.1em] text-white">
                    ALTHA EXPORT
                  </span>
                  <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                    Dashboard
                  </span>
                </span>
              </Link>
            </div>

            <div className="hidden px-4 pb-2 pt-5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-500 lg:block">
              Menu Utama
            </div>

            <nav className="grid grid-cols-2 gap-2 px-3 py-3 text-sm lg:block lg:flex-1 lg:space-y-1 lg:py-2">
              {adminNav.map((item) => {
                const isActive =
                  active === "dashboard"
                    ? item.href === "/admin"
                    : active === "messages"
                      ? item.href === "/admin/messages"
                      : item.href === `/admin/${active}`;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "flex min-h-11 min-w-0 items-center gap-3 rounded-md px-3 font-bold leading-tight text-slate-300 transition hover:bg-white/10 hover:text-white",
                      isActive && "bg-emerald-400/15 text-emerald-100 ring-1 ring-emerald-400/25",
                    )}
                  >
                    <Icon name={item.icon} className="h-4 w-4 shrink-0" />
                    <span className="min-w-0 break-words">{item.label}</span>
                    {item.href === "/admin/messages" && messagesCount > 0 ? (
                      <span className="ml-auto rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs text-emerald-200">
                        {messagesCount}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden border-t border-white/10 p-3 lg:block 2xl:p-4">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                  Target Bulan Ini
                </p>
                <p className="mt-4 text-xl font-extrabold text-white">3 Container</p>
                <p className="mt-1 text-sm text-slate-400">Target</p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[78%] rounded-full bg-emerald-300" />
                </div>
                <p className="mt-4 text-sm leading-6 text-emerald-100">
                  Disiplin adalah jembatan antara target dan hasil.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="border-b border-white/10 bg-[#08111f]/92 backdrop-blur lg:sticky lg:top-0 lg:z-30">
            <div className="flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between lg:px-5 xl:px-6">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-cyan-300">
                  {eyebrow}
                </p>
                <h1 className="mt-2 text-2xl font-extrabold text-white md:text-3xl">{title}</h1>
                {description ? (
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{description}</p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 text-sm font-bold text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
                >
                  <Icon name="Home" className="h-4 w-4" />
                  Website
                </Link>
                <AdminLogoutButton variant="dark" />
              </div>
            </div>
          </header>

          <main className="px-4 py-4 sm:px-5 lg:px-5 lg:py-5 xl:px-6">{children}</main>
        </div>
      </div>
    </section>
  );
}
