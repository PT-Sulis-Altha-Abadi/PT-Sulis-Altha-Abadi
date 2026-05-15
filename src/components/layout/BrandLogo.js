import Link from "next/link";
import { company } from "@/data/site";
import { cn } from "@/lib/utils";

export default function BrandLogo({ className, compact = false }) {
  return (
    <Link href="/" className={cn("flex min-w-fit items-center gap-3", className)}>
      <span className="relative grid h-11 w-10 place-items-center xl:h-12 xl:w-11">
        <svg viewBox="0 0 44 52" className="h-full w-full" aria-hidden="true">
          <path d="M22 2 39 11.5v28.8L22 50 5 40.3V11.5L22 2Z" fill="#0a3159" />
          <path d="M22 2 39 11.5 22 21 5 11.5 22 2Z" fill="#173f69" />
          <path d="M5 11.5 14.2 16.7v18.4L5 40.3V11.5Z" fill="#c99639" />
          <path d="M14.2 16.7 22 21v9.1l-7.8-4.4v9.4l7.8 4.5v10.4L14.2 45.6 9.6 43V13.9l4.6 2.8Z" fill="#ffffff" />
          <path d="M22 21 30.8 16v18.8L22 39.6V30.1l4.3-2.4v-4.2L22 21Z" fill="#ffffff" />
          <path d="M22 39.6 30.8 34.8v10.4L22 50V39.6Z" fill="#c99639" />
        </svg>
      </span>
      {!compact ? (
        <span className="leading-none">
          <span className="block text-[18px] font-extrabold tracking-normal text-ink md:text-[22px] xl:text-[24px]">
            {company.name}
          </span>
          <span className="mt-1 block text-[9px] font-medium tracking-[0.16em] text-slate-700 md:text-[11px] xl:text-[12px]">
            {company.tagline}
          </span>
        </span>
      ) : null}
    </Link>
  );
}
