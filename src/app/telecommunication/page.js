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
  telecomFeatures,
  telecomPartners,
  telecomProjects,
  telecomServices,
} from "@/data/site";

export const metadata = {
  title: "Telekomunikasi",
  description:
    "Layanan pembangunan dan instalasi infrastruktur telekomunikasi modern PT Sulis Altha Abadi.",
};

export default function TelecommunicationPage() {
  return (
    <>
      <section className="hero-glow relative min-h-[280px] overflow-hidden bg-slate-900 text-white xl:min-h-[150px]">
        <Image
          src="https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=2200&q=88"
          alt="Telekomunikasi"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-slate-950/15" />
        <div className="container-shell shell-wide relative grid min-h-[280px] items-center xl:min-h-[150px]">
          <Reveal className="relative z-10 max-w-[600px] py-6 xl:py-2">
            <h1 className="font-serif text-4xl font-extrabold leading-[1.05] text-white md:text-5xl xl:text-[30px]">
              TELEKOMUNIKASI
            </h1>
            <p className="mt-2 text-2xl font-medium italic text-white/95 xl:mt-0.5 xl:text-[16px]">
              Telecommunication
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/90 xl:mt-1.5 xl:text-[12px] xl:leading-[16px]">
              Layanan pembangunan dan instalasi infrastruktur telekomunikasi dengan teknologi modern dan standar keselamatan tinggi.
            </p>
            <p className="mt-1.5 max-w-md text-xs italic leading-5 text-white/72 xl:text-[11px] xl:leading-[14px]">
              Telecommunication infrastructure development and installation services with modern technology and high safety standards.
            </p>
          </Reveal>
        </div>
      </section>

      <FeatureRibbon items={telecomFeatures} compact />

      <section className="bg-slate-50 py-3 xl:py-1">
        <div className="container-shell shell-wide">
          <SectionTitle title="LAYANAN KAMI" en="OUR SERVICES" compact />
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:mt-1.5 xl:grid-cols-5 xl:gap-2">
            {telecomServices.map((service, index) => (
              <Reveal key={service.title} delay={index * 60}>
                <ServiceCard service={service} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 pb-3 xl:pb-1">
        <div className="container-shell shell-wide grid gap-4 lg:grid-cols-[1.18fr_0.82fr] xl:gap-2">
          <ProjectStrip
            title="PROYEK KAMI"
            en="OUR PROJECTS"
            projects={telecomProjects}
            compact
          />
          <ClientLogoGrid
            title="MITRA & KLIEN KAMI"
            en="OUR PARTNERS & CLIENTS"
            items={telecomPartners}
            compact
          />
        </div>
      </section>
    </>
  );
}
