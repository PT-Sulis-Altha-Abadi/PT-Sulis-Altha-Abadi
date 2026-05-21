"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "@/components/Icon";
import BrandLogo from "@/components/layout/BrandLogo";
import { navigation } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white nav-shadow">
      <div
        className="header-shell grid h-[86px] grid-cols-[1fr_auto] items-center gap-5 xl:h-[78px] xl:grid-cols-[auto_minmax(0,1fr)] xl:gap-8"
      >
        <BrandLogo className="max-w-[620px]" dense />

        <nav className="hidden items-stretch gap-3 justify-self-center xl:flex" aria-label="Navigasi utama">
          {navigation.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex min-w-[100px] flex-col items-center justify-center px-2 text-center text-[13px] font-bold text-slate-950 transition hover:text-brand xl:text-[13px]",
                  item.label.length > 17 && "xl:min-w-[168px]",
                )}
              >
                <span className="whitespace-nowrap">{item.label}</span>
                <span
                  className="mt-1 text-[11px] font-medium text-slate-500 xl:text-[10px]"
                >
                  {item.subLabel}
                </span>
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 h-[3px] w-16 -translate-x-1/2 rounded-full bg-transparent transition",
                    active && "bg-brand",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-md border border-slate-200 bg-white text-ink xl:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "X" : "Menu"} className="h-5 w-5" />
        </button>
      </div>

      {open ? (
        <nav className="container-shell grid gap-2 border-t border-slate-200 py-4 xl:hidden" aria-label="Navigasi mobile">
          {navigation.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex min-h-12 items-center justify-between rounded-md border px-4 text-sm font-bold",
                  active ? "border-brand bg-blue-50 text-brand" : "border-slate-200 bg-white text-slate-800",
                )}
              >
                <span>
                  {item.label}
                  <span className="ml-2 text-xs font-medium text-slate-500">{item.subLabel}</span>
                </span>
                <Icon name="ChevronRight" className="h-4 w-4" />
              </Link>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
