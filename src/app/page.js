import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import {
  AboutPreview,
  ClientLogoGrid,
  DivisionCards,
  FaqSection,
  TrackRecordPanel,
} from "@/components/sections/CorporateSections";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand text-white">
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

        <div className="container-shell relative grid min-h-[430px] items-center py-12 lg:grid-cols-[1fr_0.9fr] xl:min-h-[520px]">
          <div className="max-w-3xl">
            <h1 className="text-balance text-5xl font-extrabold leading-tight md:text-7xl">
              Satu Perusahaan,
              <span className="block text-cyan">Tiga Solusi Terintegrasi</span>
            </h1>
            <p className="mt-4 text-xl font-semibold text-white">
              Rempah Berkualitas • Konstruksi Profesional • Solusi Telekomunikasi
            </p>
            <span className="mt-5 block h-[3px] w-36 bg-cyan" />
            <div className="mt-6 text-2xl font-semibold italic leading-tight text-white">
              One Company,
              <span className="block text-cyan">Three Integrated Solutions</span>
            </div>
            <p className="mt-2 text-base italic text-white/86">
              Quality Spices • Professional Construction • Telecommunication Solutions
            </p>

            <div className="mt-8 grid max-w-[520px] grid-cols-[86px_1fr] overflow-hidden rounded-lg border border-cyan/50 bg-blue-900/70 shadow-xl backdrop-blur">
              <span className="grid place-items-center bg-white/10">
                <Icon name="Building2" className="h-12 w-12" />
              </span>
              <div className="px-6 py-4">
                <p className="text-2xl font-extrabold">1 Perusahaan - 3 Divisi Usaha</p>
                <p className="text-base italic text-white/80">1 Company - 3 Business Divisions</p>
              </div>
            </div>
          </div>

          <div className="hidden self-end justify-self-end pb-2 lg:block">
            <div className="rounded-lg border border-white/35 bg-brand/80 px-9 py-5 text-white shadow-2xl backdrop-blur">
              <p className="text-lg font-extrabold">DIVISI EKSPOR REMPAH KAMI</p>
              <p className="text-lg italic text-white/82">Our Spices Export Brand</p>
              <div className="mt-2 flex items-end gap-3">
                <div>
                  <p className="text-5xl font-extrabold leading-none">ALTHA</p>
                  <p className="text-2xl font-extrabold">SPICES EXPORT</p>
                </div>
                <Icon name="Leaf" className="mb-2 h-12 w-12 text-lime-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-4">
        <div className="container-shell">
          <DivisionCards />
        </div>
      </section>

      <section className="bg-slate-50 pb-4">
        <div className="container-shell grid gap-4 lg:grid-cols-[0.65fr_0.65fr_1fr]">
          <ClientLogoGrid />
          <TrackRecordPanel />
          <AboutPreview />
        </div>
      </section>

      <FaqSection />

      <section className="bg-slate-50 pb-5">
        <div className="container-shell flex justify-end">
          <Link
            href="/contact"
            className="inline-flex min-h-[52px] items-center justify-center gap-4 rounded-md bg-accent px-8 text-base font-extrabold text-white shadow-sm transition hover:bg-[#b77f2a]"
          >
            Kirim Pesan
            <span className="font-medium italic">Send Message</span>
            <Icon name="ArrowRight" className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
