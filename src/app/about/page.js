import Image from "next/image";
import {
  AboutPreview,
  LeadershipCards,
  SectionTitle,
  TrackRecordPanel,
} from "@/components/sections/CorporateSections";
import { divisions } from "@/data/site";
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

export default function AboutPage() {
  return (
    <>
      <section className="hero-glow relative min-h-[280px] overflow-hidden bg-slate-900 text-white xl:min-h-[150px]">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=88"
          alt="PT Sulis Altha Abadi"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-slate-950/15" />
        <div className="container-shell shell-wide relative grid min-h-[280px] items-center xl:min-h-[150px]">
          <Reveal className="relative z-10 max-w-[600px] py-6 xl:py-2">
            <h1 className="font-serif text-4xl font-extrabold leading-[1.05] text-white md:text-5xl xl:text-[30px]">
              TENTANG KAMI
            </h1>
            <p className="mt-2 text-2xl font-medium italic text-white/95 xl:mt-0.5 xl:text-[16px]">
              About Us
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/90 xl:mt-1.5 xl:text-[12px] xl:leading-[16px]">
              Satu perusahaan dengan tiga solusi terintegrasi: ekspor rempah, konstruksi profesional, dan solusi telekomunikasi.
            </p>
            <p className="mt-1.5 max-w-md text-xs italic leading-5 text-white/72 xl:text-[11px] xl:leading-[14px]">
              One company with three integrated solutions: spices export, professional construction, and telecommunication services.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 py-3 xl:py-1.5">
        <div className="container-shell shell-wide grid gap-4 lg:grid-cols-[1fr_0.8fr] xl:gap-2.5">
          <AboutPreview compact />
          <TrackRecordPanel compact />
        </div>
      </section>

      <section className="bg-white py-3 xl:py-1.5">
        <div className="container-shell shell-wide">
          <SectionTitle title="DIVISI USAHA" en="BUSINESS DIVISIONS" compact />
          <div className="mt-4 grid gap-4 md:grid-cols-3 xl:mt-1.5 xl:gap-2.5">
            {divisions.map((division) => (
              <article
                key={division.title}
                className="group relative min-h-[170px] overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm xl:min-h-[105px] xl:p-3"
              >
                <Image
                  src={divisionCardBackgrounds[division.href] ?? division.image}
                  alt={`${division.title} background`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover opacity-35 transition duration-500 group-hover:scale-105"
                />
                <div
                  className={cn(
                    "absolute inset-0",
                    division.tone === "green" &&
                      "bg-gradient-to-r from-white via-green-50/92 to-white/55",
                    division.tone === "blue" &&
                      "bg-gradient-to-r from-white via-blue-50/92 to-white/55",
                    division.tone === "purple" &&
                      "bg-gradient-to-r from-white via-violet-50/92 to-white/55",
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
                <h2 className="relative mt-4 text-xl font-extrabold text-brand xl:mt-2 xl:text-[14px]">{division.title}</h2>
                <p className="relative mt-1.5 text-sm leading-5 text-slate-700 xl:mt-1 xl:text-[12px] xl:leading-[15px]">{division.subtitle}</p>
                <p className="relative mt-1.5 text-sm italic leading-5 text-slate-600 xl:mt-0.5 xl:text-[11px] xl:leading-[15px]">{division.enSubtitle}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-3 xl:py-1.5">
        <div className="container-shell shell-wide">
          <SectionTitle title="KEPEMIMPINAN KAMI" en="OUR LEADERSHIP" compact />
          <div className="mt-4 xl:mt-1.5">
            <LeadershipCards compact />
          </div>
        </div>
      </section>
    </>
  );
}
