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
      <section className="bg-slate-50 pt-3 xl:pt-2">
        <div className="container-shell shell-wide grid gap-4 lg:grid-cols-4 xl:gap-2.5">
          <Reveal>
            <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm xl:p-3.5">
              <h1 className="text-2xl font-extrabold text-brand md:text-3xl xl:text-[22px]">HUBUNGI KAMI</h1>
              <p className="text-lg font-medium italic text-slate-800 xl:text-[13px]">CONTACT US</p>
              <p className="mt-3 text-sm leading-6 text-slate-700 xl:mt-2 xl:text-[12px] xl:leading-[16px]">
                Kami siap membantu untuk kebutuhan ekspor rempah, konstruksi, dan solusi telekomunikasi.
              </p>
              <p className="mt-1.5 text-xs italic leading-5 text-slate-600 xl:mt-1 xl:text-[11px] xl:leading-[14px]">
                We are ready to assist you for spices export, construction, and telecommunication.
              </p>
              <div className="mt-4 xl:mt-2.5">
                <ContactInfoList compact />
              </div>
            </article>
          </Reveal>

          <Reveal delay={70}>
            <article className="hero-glow relative h-full min-h-[320px] overflow-hidden rounded-lg bg-brand text-white xl:min-h-[420px]">
              <Image
                src="/images/contact-hero-executives.png"
                alt="Pimpinan PT Sulis Altha Abadi"
                fill
                priority
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-cover object-[50%_28%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand/55 via-transparent to-transparent" />
              <div className="absolute inset-x-3 bottom-3 grid gap-2 xl:inset-x-2.5 xl:bottom-2.5 xl:gap-1.5">
                {leaders.map((leader, index) => (
                  <Reveal key={leader.name} delay={index * 90}>
                    <div className="rounded-md bg-brand/95 px-3 py-2 text-white shadow-2xl backdrop-blur-[2px] xl:px-2.5 xl:py-1.5">
                      <h2 className="text-sm font-extrabold xl:text-[11px]">{leader.name.toUpperCase()}</h2>
                      <p className="mt-0.5 text-xs font-medium italic xl:text-[10px]">{leader.role}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={140}>
            <ContactForm />
          </Reveal>

          <Reveal delay={210} className="h-full">
            <div className="h-full">
              <GoogleMapEmbed compact />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 py-3 xl:py-1.5">
        <div className="container-shell shell-wide">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm xl:p-3.5">
            <SectionTitle title="KEPEMIMPINAN KAMI" en="OUR LEADERSHIP" compact />
            <div className="mt-4 xl:mt-2">
              <LeadershipCards compact />
            </div>
          </article>
        </div>
      </section>

      <StatsQuoteBand compact />
    </>
  );
}
