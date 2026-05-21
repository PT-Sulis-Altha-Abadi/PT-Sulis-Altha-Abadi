import Image from "next/image";
import ContactForm from "@/components/sections/ContactForm";
import {
  ContactInfoList,
  GoogleMapEmbed,
  LeadershipCards,
  SectionTitle,
  StatsQuoteBand,
} from "@/components/sections/CorporateSections";
import { leaders } from "@/data/site";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
  title: "Kontak",
  description:
    "Hubungi PT Sulis Altha Abadi untuk kebutuhan ekspor rempah, konstruksi, dan solusi telekomunikasi.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50 py-4 xl:py-2">
        <div className="container-shell grid min-h-[520px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:grid-cols-[32%_68%] xl:min-h-[290px] xl:max-w-[1420px]">
          <aside className="flex items-center px-8 py-12 lg:justify-center xl:px-10 xl:py-5">
            <Reveal className="w-full max-w-[400px]">
              <h1 className="text-4xl font-extrabold text-brand md:text-5xl xl:text-[34px]">HUBUNGI KAMI</h1>
              <p className="text-2xl font-medium italic text-slate-800 xl:text-xl">CONTACT US</p>
              <p className="mt-7 text-base leading-7 text-slate-700 xl:mt-3 xl:text-xs xl:leading-5">
                Kami siap membantu Anda untuk kebutuhan ekspor rempah,
                konstruksi, dan solusi telekomunikasi.
              </p>
              <p className="mt-4 text-base italic leading-7 text-slate-600 xl:mt-2 xl:text-[11px] xl:leading-4">
                We are ready to assist you for spices export, construction,
                and telecommunication solutions.
              </p>
              <div className="mt-9 xl:mt-4">
                <ContactInfoList compact />
              </div>
            </Reveal>
          </aside>

          <div className="hero-glow relative min-h-[340px] overflow-hidden bg-brand sm:min-h-[390px] lg:min-h-[520px] xl:min-h-[290px]">
            <Image
              src="/images/contact-hero-executives.png"
              alt="Pimpinan PT Sulis Altha Abadi"
              fill
              priority
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover object-[50%_38%] xl:object-[50%_43%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand/18 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5 grid gap-3 sm:inset-x-[8%] sm:bottom-6 md:grid-cols-2 md:gap-5 xl:inset-x-8 xl:bottom-5 xl:gap-5">
              {leaders.map((leader, index) => (
                <Reveal key={leader.name} delay={index * 90}>
                  <article className="mx-auto w-full max-w-[390px] rounded-md bg-brand/95 px-4 py-3 text-white shadow-2xl backdrop-blur-[2px] sm:px-6 sm:py-4 xl:px-4 xl:py-2.5">
                    <h2 className="text-sm font-extrabold sm:text-lg xl:text-xs">{leader.name.toUpperCase()}</h2>
                    <p className="mt-1 text-xs font-medium italic sm:text-sm xl:text-[10px]">{leader.role}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 xl:py-2">
        <div className="container-shell grid gap-6 lg:grid-cols-[390px_1fr] xl:max-w-[1420px] xl:items-stretch xl:gap-4">
          <Reveal>
            <ContactForm />
          </Reveal>
          <GoogleMapEmbed compact />
        </div>
      </section>

      <section className="bg-slate-50 pb-12 xl:pb-2">
        <div className="container-shell xl:max-w-[1420px]">
          <SectionTitle title="KEPEMIMPINAN KAMI" en="OUR LEADERSHIP" compact />
          <div className="mt-8 xl:mt-3">
            <LeadershipCards compact />
          </div>
        </div>
      </section>

      <StatsQuoteBand compact />
    </>
  );
}
