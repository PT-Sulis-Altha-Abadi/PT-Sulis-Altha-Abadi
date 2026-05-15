import Link from "next/link";
import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-brand text-white shadow-sm shadow-brand/20 hover:bg-brand-strong focus-visible:outline-brand",
  secondary:
    "border border-line bg-white text-ink hover:border-brand/40 hover:bg-teal-50 focus-visible:outline-brand",
  dark:
    "bg-ink text-white shadow-sm shadow-ink/20 hover:bg-slate-800 focus-visible:outline-white",
};

export default function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  icon = "ArrowRight",
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variants[variant],
        className,
      )}
    >
      <span>{children}</span>
      {icon ? <Icon name={icon} className="h-4 w-4" /> : null}
    </Link>
  );
}
