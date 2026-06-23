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
  clients,
  constructionPortfolioProjects,
  constructionClients,
  constructionFeatures,
  constructionServices,
} from "@/data/site";
  
export const metadata = {
  title: "Konstruksi Barang & Jasa",
  description:
    "Layanan konstruksi terintegrasi PT Sulis Altha Abadi dengan standar kualitas tinggi, perencanaan terstruktur, dan pelaksanaan tepat waktu.",
};

const constructionClientLogos = [...clients, ...constructionClients].filter(
  (client) => client.name !== "Adaro",
);

export default function ConstructionPage() {
  return (
    <>
      <section className="hero-glow relative min-h-[280px] overflow-hidden bg-slate-900 xl:min-h-[140px]">
        <Image
          src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=2200&q=88"
          alt="Konstruksi Barang dan Jasa"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-slate-950/10" />
        <div className="container-shell shell-wide relative grid min-h-[280px] items-center xl:min-h-[140px]">
          <Reveal className="relative z-10 max-w-[600px] py-6 xl:py-2">
            <h1 className="font-serif text-4xl font-extrabold leading-[1.05] text-white md:text-5xl xl:text-[28px]">
              KONSTRUKSI
              <span className="block">BARANG & JASA</span>
            </h1>
            <p className="mt-2 text-2xl font-medium italic text-white/95 xl:mt-0.5 xl:text-[15px]">
              Construction Goods & Services
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/90 xl:mt-1.5 xl:text-[12px] xl:leading-[16px]">
              Layanan konstruksi terintegrasi dengan standar mutu tinggi, perencanaan terstruktur, dan pelaksanaan yang tepat waktu serta efisien.
            </p>
            <p className="mt-1.5 max-w-md text-xs italic leading-5 text-white/72 xl:text-[11px] xl:leading-[14px]">
              Integrated construction services with high quality standards, structured planning, and efficient execution.
            </p>
          </Reveal>
        </div>
      </section>

      <FeatureRibbon items={constructionFeatures} compact />

      <section className="bg-slate-50 py-3 xl:py-1">
        <div className="container-shell shell-wide">
          <SectionTitle title="LAYANAN KAMI" en="OUR SERVICES" compact />
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:mt-1.5 xl:grid-cols-4 xl:gap-2">
            {constructionServices.map((service, index) => (
              <Reveal key={service.title} delay={index * 70}>
                <ServiceCard service={service} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 pb-3 xl:pb-1">
        <div className="container-shell shell-wide grid gap-4 lg:grid-cols-[1.18fr_0.82fr] xl:gap-2">
          <ProjectStrip
            title="PORTFOLIO PROYEK"
            en="PROJECT PORTFOLIO"
            projects={constructionPortfolioProjects}
            compact
          />
          <ClientLogoGrid
            title="KLIEN KAMI"
            en="OUR CLIENTS"
            items={constructionClientLogos}
            compact
          />
        </div>
      </section>
    </>
  );
}
