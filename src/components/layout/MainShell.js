"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function MainShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isContact = pathname === "/contact";

  return (
    <main
      className={cn(
        "block",
        !isAdmin && (isContact ? "bg-brand" : "bg-slate-50"),
      )}
    >
      {children}
    </main>
  );
}
