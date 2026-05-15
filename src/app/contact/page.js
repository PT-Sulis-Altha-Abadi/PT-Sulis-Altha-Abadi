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

export const metadata = {
  title: "Kontak",
  description:
    "Hubungi PT Sulis Altha Abadi untuk kebutuhan ekspor rempah, konstruksi, dan solusi telekomunikasi.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="grid min-h-[520px] lg:grid-cols-[29%_71%]">
          <aside className="flex items-center px-8 py-12 lg:px-16 xl:px-20">
            <div className="max-w-md">
              <h1 className="text-4xl font-extrabold text-brand md:text-5xl">HUBUNGI KAMI</h1>
              <p className="text-2xl font-medium italic text-slate-800">CONTACT US</p>
              <p className="mt-7 text-base leading-7 text-slate-700">
                Kami siap membantu Anda untuk kebutuhan ekspor rempah,
                konstruksi, dan solusi telekomunikasi.
              </p>
              <p className="mt-4 text-base italic leading-7 text-slate-600">
                We are ready to assist you for spices export, construction,
                and telecommunication solutions.
              </p>
              <div className="mt-9">
                <ContactInfoList />
              </div>
            </div>
          </aside>

          <div className="relative min-h-[520px] overflow-hidden bg-brand">
            <Image
              src="/images/contact-hero-executives.png"
              alt="Pimpinan PT Sulis Altha Abadi"
              fill
              priority
              sizes="70vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand/18 via-transparent to-transparent" />
            <div className="absolute inset-x-[8%] bottom-6 grid gap-5 md:grid-cols-2">
              {leaders.map((leader) => (
                <article
                  key={leader.name}
                  className="rounded-md bg-brand/95 px-6 py-4 text-white shadow-2xl backdrop-blur-[2px]"
                >
                  <h2 className="text-lg font-extrabold">{leader.name.toUpperCase()}</h2>
                  <p className="mt-1 text-sm font-medium italic">{leader.role}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.56fr_1fr]">
          <ContactForm />
          <GoogleMapEmbed />
        </div>
      </section>

      <section className="bg-slate-50 pb-12">
        <div className="container-shell">
          <SectionTitle title="KEPEMIMPINAN KAMI" en="OUR LEADERSHIP" />
          <div className="mt-8">
            <LeadershipCards />
          </div>
        </div>
      </section>

      <StatsQuoteBand />
    </>
  );
}
