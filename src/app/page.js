import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/ui/Reveal";
import {
  AboutPreview,
  DivisionCards,
  TrackRecordPanel,
} from "@/components/sections/CorporateSections";

export default function Home() {
  return (
    <>
      <section className="hero-glow relative overflow-hidden bg-brand text-white">
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2200&q=88"
          alt="Construction site with integrated business divisions"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute left-0 top-0 hidden h-full w-24 bg-[radial-gradient(circle,_rgba(255,255,255,.24)_1px,_transparent_1px)] [background-size:14px_14px] lg:block" />

        <div className="container-shell shell-wide relative grid min-h-[430px] items-center py-12 lg:grid-cols-[1fr_0.9fr] xl:min-h-[210px] xl:py-3">
          <Reveal className="relative z-10 max-w-3xl">
            <h1 className="text-balance text-5xl font-extrabold leading-tight md:text-7xl xl:text-[36px] xl:leading-[1.05]">
              Satu Perusahaan,
              <span className="block text-cyan">Tiga Solusi Terintegrasi</span>
            </h1>
            <p className="mt-4 text-xl font-semibold text-white xl:mt-1.5 xl:text-[13px]">
              Rempah Berkualitas • Konstruksi Profesional • Solusi Telekomunikasi
            </p>
            <span className="mt-5 block h-[3px] w-36 bg-cyan xl:mt-2 xl:w-20" />
            <div className="mt-6 text-2xl font-semibold italic leading-tight text-white xl:mt-2 xl:text-base">
              One Company,
              <span className="block text-cyan">Three Integrated Solutions</span>
            </div>
            <p className="mt-2 text-base italic text-white/86 xl:mt-1 xl:text-[11px]">
              Quality Spices • Professional Construction • Telecommunication Solutions
            </p>

            <div className="mt-8 grid max-w-[520px] grid-cols-[86px_1fr] overflow-hidden rounded-lg border border-cyan/50 bg-blue-900/70 shadow-xl backdrop-blur xl:mt-3 xl:max-w-[360px] xl:grid-cols-[50px_1fr]">
              <span className="grid place-items-center bg-white/10">
                <Icon name="Building2" className="h-12 w-12 xl:h-7 xl:w-7" />
              </span>
              <div className="px-6 py-4 xl:px-3 xl:py-2">
                <p className="text-2xl font-extrabold xl:text-[14px]">1 Perusahaan - 3 Divisi Usaha</p>
                <p className="text-base italic text-white/80 xl:text-[11px]">1 Company - 3 Business Divisions</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140} variant="right" className="relative z-10 hidden self-end justify-self-end pb-2 lg:block">
            <div className="rounded-lg border border-white/35 bg-brand/80 px-9 py-5 text-white shadow-2xl backdrop-blur xl:px-4 xl:py-2.5">
              <p className="text-lg font-extrabold xl:text-[13px]">DIVISI EKSPOR REMPAH KAMI</p>
              <p className="text-lg italic text-white/82 xl:text-[12px]">Our Spices Export Brand</p>
              <div className="mt-2 flex items-end gap-3 xl:mt-1">
                <div>
                  <p className="text-5xl font-extrabold leading-none xl:text-[26px]">ALTHA</p>
                  <p className="text-2xl font-extrabold xl:text-[14px]">SPICES EXPORT</p>
                </div>
                <Icon name="Leaf" className="mb-2 h-12 w-12 text-lime-400 xl:mb-1 xl:h-7 xl:w-7" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 py-3 xl:py-1.5">
        <div className="container-shell shell-wide">
          <DivisionCards compact />
        </div>
      </section>

      <section className="bg-slate-50 pb-3 xl:pb-1.5">
        <div className="container-shell shell-wide grid gap-4 lg:grid-cols-[0.85fr_1fr] xl:gap-2">
          <TrackRecordPanel compact />
          <AboutPreview compact />
        </div>
      </section>
    </>
  );
}
