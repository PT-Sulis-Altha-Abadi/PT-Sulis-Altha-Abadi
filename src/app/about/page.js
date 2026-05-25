import Image from "next/image";
import {
  LeadershipCards,
  SectionTitle,
} from "@/components/sections/CorporateSections";
import {
  clients,
  constructionClients,
  divisions,
  telecomPartners,
  telecommunicationClients,
  trackRecords,
} from "@/data/site";
import Icon from "@/components/Icon";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Tentang Kami",
  description:
    "Tentang PT Sulis Altha Abadi, perusahaan dengan tiga divisi: Altha Spices Export, konstruksi, dan telekomunikasi.",
};

const divisionCardBackgrounds = {
  "/spices-export":
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=88",
  "/construction":
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=88",
  "/telecommunication":
    "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=1400&q=88",
};

const allClientLogos = [
  ...clients,
  ...constructionClients,
  ...telecommunicationClients,
  ...telecomPartners,
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-slate-50 pt-3 xl:pt-1.5">
        <div className="container-shell shell-extra grid gap-4 lg:grid-cols-[1.25fr_0.6fr_1.1fr] xl:gap-2.5">
          <Reveal>
            <article className="hero-glow relative h-full min-h-[260px] overflow-hidden rounded-lg bg-slate-900 text-white xl:min-h-[210px]">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=88"
                alt="PT Sulis Altha Abadi"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/70 to-slate-950/35" />
              <div className="relative z-10 flex h-full items-center px-7 py-6 xl:px-5 xl:py-3">
                <div className="max-w-[480px]">
                  <h1 className="font-serif text-4xl font-extrabold leading-[1.05] text-white md:text-5xl xl:text-[36px]">
                    TENTANG KAMI
                  </h1>
                  <p className="mt-2 text-2xl font-medium italic text-white/95 xl:mt-1 xl:text-[18px]">
                    About Us
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/95 xl:mt-2 xl:text-[13px] xl:leading-[18px]">
                    Satu perusahaan dengan tiga solusi terintegrasi: ekspor rempah, konstruksi profesional, dan solusi telekomunikasi.
                  </p>
                  <p className="mt-1.5 text-xs italic leading-5 text-white/78 xl:mt-1 xl:text-[12px] xl:leading-[16px]">
                    One company with three integrated solutions: spices export, professional construction, and telecommunication services.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={60}>
            <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:p-3">
              <h2 className="text-xl font-extrabold text-brand xl:text-[17px]">TRACK RECORD KAMI</h2>
              <p className="text-base italic text-slate-700 xl:text-[12px]">Our Track Record</p>
              <div className="mt-3 grid flex-1 grid-cols-1 gap-2 xl:mt-2 xl:gap-1.5">
                {trackRecords.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50/60 px-3 py-2 xl:gap-2.5 xl:px-2.5 xl:py-1.5"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/10 text-brand xl:h-9 xl:w-9">
                      <Icon name={item.icon} className="h-5 w-5 xl:h-4 xl:w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-2xl font-extrabold leading-none text-brand xl:text-[22px]">{item.value}</p>
                      <p className="mt-0.5 text-xs font-semibold text-slate-800 xl:text-[12px]">{item.label}</p>
                      <p className="text-[11px] italic leading-tight text-slate-600 xl:text-[11px]">{item.enLabel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <article className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm xl:p-3">
              <h2 className="text-xl font-extrabold text-brand xl:text-[17px]">KLIEN KAMI</h2>
              <p className="text-base italic text-slate-700 xl:text-[12px]">Our Clients</p>
              <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5 lg:grid-cols-6 xl:mt-2 xl:grid-cols-6 xl:gap-1.5">
                {allClientLogos.map((logo) => (
                  <div
                    key={logo.name}
                    title={logo.name}
                    className="flex h-12 items-center justify-center rounded-md border border-slate-200 bg-white px-2 shadow-sm xl:h-9 xl:px-1.5"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={120}
                      height={48}
                      className={cn("h-auto max-h-8 w-auto max-w-full object-contain xl:max-h-5", logo.className)}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-2 text-center text-xs text-slate-600 xl:mt-1.5 xl:text-[11px]">
                dan banyak lainnya / <span className="italic">and many more</span>
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-3 xl:py-1.5">
        <div className="container-shell shell-extra">
          <SectionTitle title="DIVISI USAHA" en="BUSINESS DIVISIONS" compact />
          <div className="mt-4 grid gap-4 md:grid-cols-3 xl:mt-1.5 xl:gap-2.5">
            {divisions.map((division) => (
              <article
                key={division.title}
                className="group relative min-h-[170px] overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm xl:min-h-[100px] xl:p-3"
              >
                <Image
                  src={divisionCardBackgrounds[division.href] ?? division.image}
                  alt={`${division.title} background`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover opacity-80 transition duration-500 group-hover:scale-105"
                />
                <div
                  className={cn(
                    "absolute inset-0",
                    division.tone === "green" &&
                      "bg-gradient-to-r from-white via-white/80 to-white/10",
                    division.tone === "blue" &&
                      "bg-gradient-to-r from-white via-white/80 to-white/10",
                    division.tone === "purple" &&
                      "bg-gradient-to-r from-white via-white/80 to-white/10",
                  )}
                />
                <span
                  className={cn(
                    "relative grid h-12 w-12 place-items-center rounded-full text-white xl:h-9 xl:w-9",
                    division.tone === "green" && "bg-green",
                    division.tone === "blue" && "bg-brand",
                    division.tone === "purple" && "bg-[#6c3aa4]",
                  )}
                >
                  <Icon name={division.icon} className="h-6 w-6 xl:h-4 xl:w-4" />
                </span>
                <h2 className="relative mt-4 text-xl font-extrabold text-brand xl:mt-2 xl:text-[15px]">{division.title}</h2>
                <p className="relative mt-1.5 max-w-[60%] text-sm leading-5 text-slate-700 xl:mt-1 xl:text-[12px] xl:leading-[16px]">{division.subtitle}</p>
                <p className="relative mt-1.5 max-w-[60%] text-sm italic leading-5 text-slate-600 xl:mt-0.5 xl:text-[11px] xl:leading-[15px]">{division.enSubtitle}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-3 xl:py-1.5">
        <div className="container-shell shell-extra">
          <SectionTitle title="KEPEMIMPINAN KAMI" en="OUR LEADERSHIP" compact />
          <div className="mt-4 xl:mt-1.5">
            <LeadershipCards compact />
          </div>
        </div>
      </section>
    </>
  );
}
