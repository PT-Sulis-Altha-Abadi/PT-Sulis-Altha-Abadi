import Image from "next/image";
import { AboutPreview, LeadershipCards, SectionTitle, TrackRecordPanel } from "@/components/sections/CorporateSections";
import { divisions } from "@/data/site";
import Icon from "@/components/Icon";
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
      <section className="hero-glow relative min-h-[360px] overflow-hidden bg-brand text-white xl:min-h-[210px]">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1900&q=85"
          alt="PT Sulis Altha Abadi"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand/82" />
        <div className="container-shell relative flex min-h-[360px] items-center py-14 xl:min-h-[210px] xl:py-5">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold md:text-6xl xl:text-[42px]">TENTANG KAMI</h1>
            <p className="mt-2 text-3xl italic text-white/85 xl:text-xl">About Us</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 xl:mt-3 xl:text-sm xl:leading-6">
              Satu perusahaan dengan tiga solusi terintegrasi: ekspor rempah,
              konstruksi profesional, dan solusi telekomunikasi.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 xl:py-3">
        <div className="container-shell grid gap-6 lg:grid-cols-[1fr_0.8fr] xl:gap-3">
          <AboutPreview compact />
          <TrackRecordPanel compact />
        </div>
      </section>

      <section className="bg-white py-10 xl:py-3">
        <div className="container-shell">
          <SectionTitle title="DIVISI USAHA" en="BUSINESS DIVISIONS" compact />
          <div className="mt-8 grid gap-5 md:grid-cols-3 xl:mt-3 xl:gap-3">
            {divisions.map((division) => (
              <article
                key={division.title}
                className="group relative min-h-[190px] overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-sm xl:min-h-[122px] xl:p-4"
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
                    "relative grid h-14 w-14 place-items-center rounded-full text-white xl:h-10 xl:w-10",
                    division.tone === "green" && "bg-green",
                    division.tone === "blue" && "bg-brand",
                    division.tone === "purple" && "bg-[#6c3aa4]",
                  )}
                >
                  <Icon name={division.icon} className="h-7 w-7 xl:h-5 xl:w-5" />
                </span>
                <h2 className="relative mt-5 text-xl font-extrabold text-brand xl:mt-3 xl:text-sm">{division.title}</h2>
                <p className="relative mt-2 text-sm leading-6 text-slate-700 xl:mt-1 xl:text-[11px] xl:leading-4">{division.subtitle}</p>
                <p className="relative mt-2 text-sm italic leading-6 text-slate-600 xl:mt-1 xl:text-[10px] xl:leading-4">{division.enSubtitle}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 xl:py-3">
        <div className="container-shell">
          <SectionTitle title="KEPEMIMPINAN KAMI" en="OUR LEADERSHIP" compact />
          <div className="mt-8 xl:mt-3">
            <LeadershipCards compact />
          </div>
        </div>
      </section>
    </>
  );
}
