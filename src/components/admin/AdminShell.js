import Link from "next/link";
import Icon from "@/components/Icon";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import AdminViewportFit from "@/components/admin/AdminViewportFit";
import BrandMark from "@/components/layout/BrandMark";
import { adminModules } from "@/data/admin-dashboard-config";
import { cn } from "@/lib/utils";

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard", slug: "dashboard" },
  ...adminModules.map((module) => ({
    label: module.navLabel,
    href: `/admin/${module.slug}`,
    icon: module.icon,
    slug: module.slug,
  })),
];

export default function AdminShell({
  active = "dashboard",
  title,
  eyebrow = "Internal Admin",
  description,
  messagesCount = 0,
  children,
  headerActions = null,
  fitToViewport = false,
  scrollMain = false,
}) {
  return (
    <section className="admin-shell flex h-screen w-full overflow-hidden bg-[#0b1220] text-white">
      <aside className="hidden h-full w-[210px] shrink-0 flex-col border-r border-white/10 bg-[#0b1626] lg:flex 2xl:w-[230px]">
        <div className="border-b border-white/10 px-3 py-3">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-md">
              <BrandMark className="h-9 w-9" />
            </span>
            <span className="min-w-0">
              <span className="block text-[12px] font-extrabold uppercase leading-4 tracking-[0.14em] text-white">
                ALTHA EXPORT
              </span>
              <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.24em] text-emerald-300/70">
                Dashboard
              </span>
            </span>
          </Link>
        </div>

        <div className="px-3 pb-1 pt-2 text-[9px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
          Menu Utama
        </div>

        <nav className="flex-1 space-y-0.5 overflow-hidden px-2 pb-2 text-sm">
          {adminNav.map((item) => {
            const isActive =
              active === "dashboard"
                ? item.slug === "dashboard"
                : item.slug === active;

            const showBadge = item.slug === "dashboard" && messagesCount > 0;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex min-h-8 min-w-0 items-center gap-2 rounded-md px-2.5 text-[12px] font-bold leading-tight text-slate-300 transition hover:bg-white/[0.06] hover:text-white",
                  isActive && "bg-emerald-400/15 text-emerald-100 ring-1 ring-emerald-400/25",
                )}
              >
                <Icon name={item.icon} className="h-3.5 w-3.5 shrink-0" />
                <span className="min-w-0 truncate">{item.label}</span>
                {showBadge ? (
                  <span className="ml-auto rounded-full bg-emerald-400/15 px-1.5 py-0.5 text-[9px] text-emerald-200">
                    {messagesCount}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-white/10 p-2.5">
          <div className="rounded-md border border-white/10 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 p-2.5">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-300">
              Target Bulan Ini
            </p>
            <div className="mt-1.5 grid grid-cols-3 gap-1.5">
              <div>
                <p className="text-sm font-extrabold leading-tight text-white">3</p>
                <p className="text-[8px] uppercase tracking-wide text-slate-400">Target</p>
              </div>
              <div>
                <p className="text-sm font-extrabold leading-tight text-emerald-200">4</p>
                <p className="text-[8px] uppercase tracking-wide text-slate-400">Realisasi</p>
              </div>
              <div>
                <p className="text-sm font-extrabold leading-tight text-emerald-200">133%</p>
                <p className="text-[8px] uppercase tracking-wide text-slate-400">Capaian</p>
              </div>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300" />
            </div>
            <p className="mt-2 text-[9px] italic leading-snug text-slate-400">
              &ldquo;Disiplin adalah jembatan antara target dan hasil.&rdquo;
            </p>
          </div>
        </div>
      </aside>

      <div className="flex h-full min-w-0 flex-1 flex-col">
        <header
          data-admin-header
          className="shrink-0 border-b border-white/10 bg-[#0b1220]/95 backdrop-blur"
        >
          <div className="flex flex-col gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 md:flex-row md:items-center md:justify-between lg:px-5 xl:px-6">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-emerald-300 sm:text-[11px]">
                {eyebrow}
              </p>
              <h1 className="mt-1 text-lg font-extrabold text-white sm:text-xl md:text-2xl">{title}</h1>
              {description ? (
                <p className="mt-0.5 max-w-3xl text-[11px] leading-4 text-slate-400 sm:text-xs sm:leading-5">{description}</p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {headerActions}
              <Link
                href="/admin/messages"
                className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 text-[11px] font-bold text-slate-200 transition hover:border-cyan-300/40 hover:text-white sm:min-h-9 sm:gap-2 sm:px-3 sm:text-xs"
              >
                <Icon name="Mail" className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                Pesan
                {messagesCount > 0 ? (
                  <span className="ml-1 rounded-full bg-emerald-400/15 px-1.5 py-0.5 text-[9px] text-emerald-200 sm:text-[10px]">
                    {messagesCount}
                  </span>
                ) : null}
              </Link>
              <Link
                href="/"
                className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 text-[11px] font-bold text-slate-200 transition hover:border-cyan-300/40 hover:text-white sm:min-h-9 sm:gap-2 sm:px-3 sm:text-xs"
              >
                <Icon name="Home" className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                Website
              </Link>
              <AdminLogoutButton variant="dark" />
            </div>
          </div>
        </header>

        <main
          className={cn(
            "min-h-0 min-w-0 flex-1",
            scrollMain ? "overflow-y-auto" : "overflow-hidden",
            "px-3 py-2.5 sm:px-4 sm:py-3 lg:px-5 lg:py-4 xl:px-6",
          )}
        >
          {fitToViewport ? <AdminViewportFit>{children}</AdminViewportFit> : children}
        </main>
      </div>
    </section>
  );
}
