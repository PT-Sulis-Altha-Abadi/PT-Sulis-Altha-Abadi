import Link from "next/link";
import BrandMark from "@/components/layout/BrandMark";
import { company } from "@/data/site";
import { cn } from "@/lib/utils";

export default function BrandLogo({ className, compact = false, dense = false }) {
  return (
    <Link href="/" className={cn("flex min-w-fit items-center gap-3", className)}>
      <span
        className={cn(
          "relative grid h-11 w-[68px] place-items-center xl:h-12 xl:w-[76px]",
          dense && "xl:h-12 xl:w-[76px]",
        )}
      >
        <BrandMark />
      </span>
      {!compact ? (
        <span className="leading-none">
          <span
            className={cn(
              "block text-[18px] font-extrabold tracking-normal text-ink md:text-[22px] xl:text-[24px]",
              dense && "xl:text-[22px]",
            )}
          >
            {company.name}
          </span>
          <span
            className={cn(
              "mt-1 block text-[9px] font-medium tracking-[0.16em] text-slate-700 md:text-[11px] xl:text-[12px]",
              dense && "xl:text-[10.5px] xl:tracking-[0.14em]",
            )}
          >
            {company.tagline}
          </span>
        </span>
      ) : null}
    </Link>
  );
}
