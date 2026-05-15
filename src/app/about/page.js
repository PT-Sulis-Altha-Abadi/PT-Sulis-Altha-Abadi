import Image from "next/image";
import { AboutPreview, LeadershipCards, SectionTitle, TrackRecordPanel } from "@/components/sections/CorporateSections";
import { divisions } from "@/data/site";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Tentang Kami",
  description:
    "Tentang PT Sulis Altha Abadi, perusahaan dengan tiga divisi: Altha Spices Export, konstruksi, dan telekomunikasi.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative min-h-[360px] overflow-hidden bg-brand text-white xl:min-h-[460px]">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1900&q=85"
          alt="PT Sulis Altha Abadi"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand/82" />
        <div className="container-shell relative flex min-h-[360px] items-center py-14 xl:min-h-[460px]">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold md:text-6xl">TENTANG KAMI</h1>
            <p className="mt-2 text-3xl italic text-white/85">About Us</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
              Satu perusahaan dengan tiga solusi terintegrasi: ekspor rempah,
              konstruksi profesional, dan solusi telekomunikasi.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10">
        <div className="container-shell grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <AboutPreview />
          <TrackRecordPanel />
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-shell">
          <SectionTitle title="DIVISI USAHA" en="BUSINESS DIVISIONS" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {divisions.map((division) => (
              <article key={division.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-brand text-white">
                  <Icon name={division.icon} className="h-7 w-7" />
                </span>
                <h2 className="mt-5 text-xl font-extrabold text-brand">{division.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700">{division.subtitle}</p>
                <p className="mt-2 text-sm italic leading-6 text-slate-600">{division.enSubtitle}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10">
        <div className="container-shell">
          <SectionTitle title="KEPEMIMPINAN KAMI" en="OUR LEADERSHIP" />
          <div className="mt-8">
            <LeadershipCards />
          </div>
        </div>
      </section>
    </>
  );
}
