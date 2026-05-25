"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { company } from "@/data/site";
import { cn } from "@/lib/utils";

const contactItems = [
  { icon: "MessageCircle", title: "WhatsApp", value: company.phone },
  { icon: "Mail", title: "Email", value: company.email },
  { icon: "MapPin", title: "Alamat", value: company.location },
];

export default function Footer() {
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-brand text-white">
      {!isContactPage ? (
        <div
          className="container-shell grid gap-6 border-b border-white/15 py-7 lg:grid-cols-[260px_1fr_210px] lg:items-center xl:grid-cols-[190px_1fr_175px] xl:gap-4 xl:py-3"
        >
          <div>
            <h2 className="text-xl font-extrabold xl:text-base">HUBUNGI KAMI</h2>
            <p className="text-base italic text-white/80 xl:text-sm">CONTACT US</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 xl:gap-3">
            {contactItems.map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/30 xl:h-9 xl:w-9">
                  <Icon name={item.icon} className="h-5 w-5 xl:h-4 xl:w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold xl:text-xs">{item.title}</p>
                  <p className="text-sm leading-5 text-white/75 xl:text-xs xl:leading-4">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            className={cn(
              "inline-flex min-h-14 items-center justify-center gap-3 rounded-md bg-accent px-5 text-sm font-extrabold text-white shadow-lg shadow-black/10 transition hover:bg-[#b77f2a]",
              "xl:min-h-10 xl:px-4 xl:text-xs",
            )}
          >
            Kirim Pesan
            <span className="font-medium italic">Send Message</span>
            <Icon name="ArrowRight" className="h-5 w-5" />
          </Link>
        </div>
      ) : null}

      <div
        className={cn(
          "container-shell flex flex-col gap-4 py-5 text-xs text-white/78 md:flex-row md:items-center md:justify-between",
          "xl:py-2 xl:text-[10px]",
        )}
      >
        <p>© {company.year} {company.name}. All Rights Reserved.</p>
        <p>NIB: {company.nib}</p>
        <Link href="/privacy" className="hover:text-white">
          Kebijakan Privasi / Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-white">
          Syarat & Ketentuan / Terms & Conditions
        </Link>
        {!isContactPage ? (
          <Link href="/contact" className="hover:text-white">
            Kontak / Contact
          </Link>
        ) : null}
      </div>
    </footer>
  );
}
