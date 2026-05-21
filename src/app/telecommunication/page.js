import Image from "next/image";
import {
  PartnerLogoGrid,
  ProjectStrip,
  SectionTitle,
  ServiceCard,
  TelecomHeroRibbon,
} from "@/components/sections/CorporateSections";
import Reveal from "@/components/ui/Reveal";
import {
  telecommunicationClients,
  telecomFeatures,
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
      <section className="hero-glow relative min-h-[430px] overflow-hidden bg-brand text-white xl:min-h-[305px]">
        <Image
          src="https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=2200&q=88"
          alt="Telekomunikasi"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#061f3d]/78" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061f3d]/90 via-[#061f3d]/62 to-[#061f3d]/30" />
        <div className="container-shell relative grid min-h-[430px] items-center gap-8 py-10 md:pb-20 md:pt-10 xl:min-h-[305px] xl:pb-20 xl:pt-6">
          <Reveal className="relative z-10 max-w-[820px] xl:border-l-4 xl:border-accent xl:bg-[#061f3d]/45 xl:p-6 xl:shadow-2xl xl:backdrop-blur-[2px]">
            <h1 className="font-serif text-4xl font-bold leading-none tracking-normal text-white md:text-6xl xl:text-[52px]">
              TELEKOMUNIKASI
            </h1>
            <p className="mt-3 text-2xl font-semibold italic text-white/95 xl:text-2xl">
              Telecommunication
            </p>
            <p className="mt-7 max-w-[700px] text-base font-medium leading-7 text-white xl:mt-4 xl:text-sm xl:leading-6">
              Layanan pembangunan dan instalasi infrastruktur telekomunikasi
              dengan teknologi modern dan standar keselamatan tinggi.
            </p>
            <p className="mt-3 max-w-[700px] text-base italic leading-7 text-white/88 xl:text-xs xl:leading-5">
              Telecommunication infrastructure development and installation
              services with modern technology and high safety standards.
            </p>
          </Reveal>
        </div>
        <TelecomHeroRibbon items={telecomFeatures} compact />
      </section>

      <section className="bg-slate-50 py-10 xl:py-2">
        <div className="container-shell">
          <SectionTitle title="LAYANAN KAMI" en="OUR SERVICES" compact />
          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:mt-2 xl:grid-cols-5 xl:gap-3">
            {telecomServices.map((service, index) => (
              <Reveal key={service.title} delay={index * 70}>
                <ServiceCard service={service} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 pb-10 xl:pb-2">
        <div className="container-shell grid gap-6 lg:grid-cols-[1.15fr_0.85fr] xl:gap-3">
          <ProjectStrip
            title="PROYEK KAMI"
            en="OUR PROJECTS"
            projects={telecomProjects}
            compact
          />
          <PartnerLogoGrid
            title="MITRA & KLIEN KAMI"
            en="OUR PARTNERS & CLIENTS"
            items={telecommunicationClients}
            compact
          />
        </div>
      </section>
    </>
  );
}
