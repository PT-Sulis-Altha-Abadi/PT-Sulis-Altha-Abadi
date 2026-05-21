import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/ui/Reveal";
import {
  ClientLogoGrid,
  TrackRecordPanel,
} from "@/components/sections/CorporateSections";
import { clients, divisions } from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Altha Spices Export",
  description:
    "Halaman alur Altha Spices Export sebagai divisi ekspor rempah PT Sulis Altha Abadi.",
};

const heroImages = {
  spices:
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1600&q=88",
};

function FlowHero() {
  return (
    <section className="bg-white">
      <div className="container-shell py-5 xl:py-2">
        <Reveal>
          <div className="grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:grid-cols-[0.68fr_0.32fr]">
            <div className="relative min-h-[260px] bg-[#f7efe2] md:min-h-[330px] xl:min-h-[230px]">
              <Image
                src={heroImages.spices}
                alt="Rempah premium Indonesia"
                fill
                priority
                sizes="(min-width: 1024px) 68vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/88 via-white/30 to-transparent" />
              <div className="absolute left-6 top-1/2 max-w-[410px] -translate-y-1/2 md:left-10">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-green">
                  Divisi Ekspor Rempah
                </p>
                <h1 className="mt-2 font-serif text-4xl font-bold leading-none text-brand md:text-5xl xl:text-4xl">
                  ALTHA SPICES EXPORT
                </h1>
                <p className="mt-3 text-lg font-bold leading-tight text-slate-900 xl:text-base">
                  Rempah Premium Indonesia untuk Pasar Dunia
                </p>
                <p className="mt-2 text-sm italic text-slate-700 xl:text-xs">
                  Premium Indonesian Spices for Global Market
                </p>
              </div>
            </div>

            <div className="flex min-h-[260px] flex-col justify-center bg-[#f4f8ef] p-7 md:min-h-[330px] xl:min-h-[230px] xl:p-5">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-green text-white xl:h-10 xl:w-10">
                <Icon name="Leaf" className="h-7 w-7 xl:h-5 xl:w-5" />
              </span>
              <h2 className="mt-5 text-2xl font-extrabold text-green xl:mt-3 xl:text-lg">
                Siap Ekspor, Siap Bermitra
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-700 xl:mt-2 xl:text-xs xl:leading-5">
                Jelajahi produk rempah pilihan, standar kualitas, dan pasar
                ekspor Altha Spices Export.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 xl:mt-4">
                <Link
                  href="/spices-export/products"
                  className="inline-flex min-h-10 items-center gap-2 rounded-md bg-green px-4 text-xs font-extrabold text-white transition hover:bg-[#1f5a20]"
                >
                  Lihat Produk
                  <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-10 items-center gap-2 rounded-md border border-green/25 bg-white px-4 text-xs font-extrabold text-green transition hover:border-green"
                >
                  Minta Penawaran
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DivisionFlowCards() {
  return (
    <section className="bg-slate-50 pb-4 xl:pb-2">
      <div className="container-shell grid gap-3 lg:grid-cols-3 xl:gap-2">
        {divisions.map((division, index) => (
          <Reveal key={division.title} delay={index * 90}>
            <Link
              href={division.detailHref ?? division.href}
              className="group lift-card grid min-h-[225px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:grid-cols-[1fr_180px] lg:grid-cols-[1fr_190px] xl:min-h-[126px] xl:grid-cols-[1fr_120px]"
            >
            <div className="relative z-10 flex flex-col p-6 xl:p-4">
              <div className="flex items-start gap-4 xl:gap-3">
                <span
                  className={cn(
                    "grid h-14 w-14 shrink-0 place-items-center rounded-full text-white",
                    "xl:h-10 xl:w-10",
                    division.tone === "green" && "bg-green",
                    division.tone === "blue" && "bg-brand",
                    division.tone === "purple" && "bg-[#6c3aa4]",
                  )}
                >
                  <Icon name={division.icon} className="h-7 w-7 xl:h-5 xl:w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-extrabold leading-tight text-brand xl:text-sm">{division.title}</h2>
                  <p className="mt-2 text-sm font-medium leading-5 text-slate-900 xl:mt-1 xl:text-[11px] xl:leading-4">{division.subtitle}</p>
                  <p className="mt-2 text-sm italic leading-5 text-slate-700 xl:mt-1 xl:text-[10px] xl:leading-4">{division.enSubtitle}</p>
                </div>
              </div>

              <div className="mt-auto pt-5 text-sm font-extrabold text-brand xl:pt-2 xl:text-[11px]">
                {division.action}
                <span className="ml-2 font-medium italic text-slate-700">{division.actionEn}</span>
                <Icon name="ArrowRight" className="ml-4 inline h-5 w-5 transition group-hover:translate-x-1" />
              </div>
            </div>
            <div className="relative min-h-[170px] bg-slate-100 xl:min-h-[126px]">
              <Image
                src={division.image}
                alt={division.title}
                fill
                sizes="(min-width: 1024px) 190px, 45vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/15 to-transparent md:bg-gradient-to-l md:from-transparent md:to-white/20" />
            </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function SpicesExportOverviewPage() {
  return (
    <>
      <FlowHero />

      <DivisionFlowCards />

      <section className="bg-slate-50 pb-4 xl:pb-2">
        <div className="container-shell grid gap-4 lg:grid-cols-[0.85fr_1.15fr] xl:gap-3">
          <TrackRecordPanel compact />
          <ClientLogoGrid
            title="KLIEN KAMI"
            en="OUR CLIENTS"
            items={clients}
            compact
          />
        </div>
      </section>

      <section className="bg-slate-50 pb-5 xl:hidden">
        <Reveal className="container-shell flex justify-end">
          <Link
            href="/contact"
            className="inline-flex min-h-[52px] items-center justify-center gap-4 rounded-md bg-accent px-8 text-base font-extrabold text-white shadow-sm transition hover:bg-[#b77f2a]"
          >
            Kirim Pesan
            <span className="font-medium italic">Send Message</span>
            <Icon name="ArrowRight" className="h-5 w-5" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
