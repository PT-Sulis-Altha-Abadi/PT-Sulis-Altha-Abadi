import Image from "next/image";
import {
  PartnerLogoGrid,
  ProjectStrip,
  SectionTitle,
  ServiceCard,
  TelecomHeroRibbon,
} from "@/components/sections/CorporateSections";
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
      <section className="relative min-h-[430px] overflow-hidden bg-brand text-white xl:min-h-[520px]">
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
        <div className="container-shell relative flex min-h-[430px] items-center py-10 md:pb-20 md:pt-10 xl:min-h-[520px]">
          <div className="max-w-[760px]">
            <h1 className="font-serif text-4xl font-bold leading-none tracking-normal text-white md:text-6xl">
              TELEKOMUNIKASI
            </h1>
            <p className="mt-3 text-2xl font-semibold italic text-white/95">
              Telecommunication
            </p>
            <p className="mt-7 max-w-[650px] text-base font-medium leading-7 text-white">
              Layanan pembangunan dan instalasi infrastruktur telekomunikasi
              dengan teknologi modern dan standar keselamatan tinggi.
            </p>
            <p className="mt-3 max-w-[650px] text-base italic leading-7 text-white/88">
              Telecommunication infrastructure development and installation
              services with modern technology and high safety standards.
            </p>
          </div>
        </div>
        <TelecomHeroRibbon items={telecomFeatures} />
      </section>

      <section className="bg-slate-50 py-10">
        <div className="container-shell">
          <SectionTitle title="LAYANAN KAMI" en="OUR SERVICES" />
          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {telecomServices.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 pb-10">
        <div className="container-shell grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <ProjectStrip
            title="PROYEK KAMI"
            en="OUR PROJECTS"
            projects={telecomProjects}
          />
          <PartnerLogoGrid
            title="MITRA & KLIEN KAMI"
            en="OUR PARTNERS & CLIENTS"
            items={telecommunicationClients}
          />
        </div>
      </section>
    </>
  );
}
