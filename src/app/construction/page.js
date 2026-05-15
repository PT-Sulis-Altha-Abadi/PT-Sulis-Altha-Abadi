import Image from "next/image";
import {
  ClientLogoGrid,
  FeatureRibbon,
  ProjectStrip,
  SectionTitle,
  ServiceCard,
} from "@/components/sections/CorporateSections";
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
      <section className="relative min-h-[430px] overflow-hidden bg-slate-100 xl:min-h-[520px]">
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2200&q=88"
          alt="Konstruksi Barang dan Jasa"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/10" />
        <div className="container-shell relative flex min-h-[430px] items-center xl:min-h-[520px]">
          <div className="max-w-2xl py-16">
            <h1 className="text-5xl font-extrabold leading-none text-brand md:text-6xl">
              KONSTRUKSI
              <span className="block">BARANG & JASA</span>
            </h1>
            <p className="mt-3 text-3xl font-medium italic text-slate-900">
              Construction Goods & Services
            </p>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-800">
              Layanan konstruksi terintegrasi dengan standar mutu tinggi, perencanaan
              terstruktur, dan pelaksanaan yang tepat waktu serta efisien.
            </p>
            <p className="mt-4 max-w-xl text-base italic leading-7 text-slate-700">
              Integrated construction services with high quality standards,
              structured planning, and efficient execution.
            </p>
          </div>
        </div>
      </section>

      <FeatureRibbon items={constructionFeatures} />

      <section className="bg-slate-50 py-10">
        <div className="container-shell">
          <SectionTitle title="LAYANAN KAMI" en="OUR SERVICES" />
          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {constructionServices.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 pb-10">
        <div className="container-shell grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <ProjectStrip
            title="PORTFOLIO PROYEK"
            en="PROJECT PORTFOLIO"
            projects={constructionProjects}
          />
          <ClientLogoGrid title="KLIEN KAMI" en="OUR CLIENTS" items={constructionClients} />
        </div>
      </section>
    </>
  );
}
