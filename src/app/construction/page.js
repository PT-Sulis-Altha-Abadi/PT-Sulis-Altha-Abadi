import Image from "next/image";
import {
  ClientLogoGrid,
  FeatureRibbon,
  ProjectStrip,
  SectionTitle,
  ServiceCard,
} from "@/components/sections/CorporateSections";
import Reveal from "@/components/ui/Reveal";
import {
  constructionClients,
  constructionFeatures,
  constructionProjects,
  constructionServices,
} from "@/data/site";

export const metadata = {
  title: "Konstruksi Barang & Jasa",
  description:
    "Layanan konstruksi terintegrasi PT Sulis Altha Abadi dengan standar kualitas tinggi, perencanaan terstruktur, dan pelaksanaan tepat waktu.",
};

export default function ConstructionPage() {
  return (
    <>
      <section className="hero-glow relative min-h-[430px] overflow-hidden bg-slate-100 xl:min-h-[285px]">
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2200&q=88"
          alt="Konstruksi Barang dan Jasa"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/86 to-white/22" />
        <div className="container-shell relative grid min-h-[430px] items-center gap-8 xl:min-h-[285px]">
          <Reveal className="relative z-10 max-w-3xl py-16 xl:border-l-4 xl:border-accent xl:bg-white/68 xl:px-7 xl:py-5 xl:shadow-lg xl:backdrop-blur-[2px]">
            <h1 className="text-5xl font-extrabold leading-none text-brand md:text-6xl xl:text-[44px]">
              KONSTRUKSI
              <span className="block">BARANG & JASA</span>
            </h1>
            <p className="mt-3 text-3xl font-medium italic text-slate-900 xl:text-[22px]">
              Construction Goods & Services
            </p>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-800 xl:mt-3 xl:text-sm xl:leading-6">
              Layanan konstruksi terintegrasi dengan standar mutu tinggi, perencanaan
              terstruktur, dan pelaksanaan yang tepat waktu serta efisien.
            </p>
            <p className="mt-4 max-w-xl text-base italic leading-7 text-slate-700 xl:mt-2 xl:text-xs xl:leading-5">
              Integrated construction services with high quality standards,
              structured planning, and efficient execution.
            </p>
          </Reveal>
        </div>
      </section>

      <FeatureRibbon items={constructionFeatures} compact />

      <section className="bg-slate-50 py-10 xl:py-2">
        <div className="container-shell">
          <SectionTitle title="LAYANAN KAMI" en="OUR SERVICES" compact />
          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:mt-2 xl:grid-cols-4 xl:gap-3">
            {constructionServices.map((service, index) => (
              <Reveal key={service.title} delay={index * 80}>
                <ServiceCard service={service} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 pb-10 xl:pb-2">
        <div className="container-shell grid gap-6 lg:grid-cols-[1.15fr_0.85fr] xl:gap-3">
          <ProjectStrip
            title="PORTFOLIO PROYEK"
            en="PROJECT PORTFOLIO"
            projects={constructionProjects}
            compact
          />
          <ClientLogoGrid title="KLIEN KAMI" en="OUR CLIENTS" items={constructionClients} compact />
        </div>
      </section>
    </>
  );
}
