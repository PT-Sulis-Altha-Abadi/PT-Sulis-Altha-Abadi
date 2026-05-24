import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/ui/Reveal";
import { ProductCard } from "@/components/sections/CorporateSections";
import { exportMarkets, spicesFeatures, spicesProducts } from "@/data/site";

export const metadata = {
  title: "Altha Spices Export",
  description:
    "Altha Spices Export menyediakan rempah premium Indonesia untuk pasar dunia dengan standar kualitas ekspor.",
};

export default function SpicesExportPage() {
  return (
    <>
      <section className="bg-white">
        <div className="container-shell shell-wide pt-3 xl:pt-1.5">
          <div className="hero-glow relative grid min-h-[260px] overflow-hidden rounded-lg text-white md:grid-cols-[1fr_0.95fr] xl:min-h-[170px]">
            <div className="relative bg-gradient-to-br from-[#3b3008] via-[#4a3d10] to-[#5b4d12] px-7 py-7 md:py-9 xl:px-6 xl:py-4">
              <span
                className="absolute right-0 top-0 hidden h-full w-24 bg-gradient-to-r from-transparent to-[#3b3008] md:block"
                aria-hidden="true"
              />
              <Reveal className="relative z-10">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/70 xl:text-[10px]">
                  Divisi Ekspor Rempah
                </p>
                <h1 className="mt-2 font-serif text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl xl:mt-1 xl:text-[32px]">
                  ALTHA SPICES EXPORT
                </h1>
                <p className="mt-2 text-base font-bold leading-tight xl:text-[13px]">
                  Rempah Premium Indonesia
                  <span className="block">untuk Pasar Dunia</span>
                </p>
                <p className="mt-1.5 text-sm italic text-white/82 xl:text-[11px]">
                  Premium Indonesian Spices
                  <span className="block">for Global Market</span>
                </p>

                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 xl:mt-3 xl:gap-x-3 xl:gap-y-1.5">
                  {spicesFeatures.map((item) => (
                    <div key={item.title} className="flex items-center gap-2">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15 text-white xl:h-6 xl:w-6">
                        <Icon name={item.icon} className="h-3.5 w-3.5 xl:h-3 xl:w-3" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-extrabold leading-tight xl:text-[10px]">{item.title}</p>
                        <p className="text-[10px] italic leading-tight text-white/72 xl:text-[9px]">{item.en}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="relative min-h-[180px] bg-[#3b3008] md:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1600&q=88"
                alt="Komposisi rempah premium Indonesia"
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-[30%_50%]"
              />
              <div
                className="absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-[#3b3008] to-transparent md:block"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-3 xl:py-1.5">
        <div className="container-shell shell-wide">
          <div className="mb-3 text-left xl:mb-1.5">
            <h2 className="text-xl font-extrabold text-brand xl:text-base">PRODUK KAMI</h2>
            <p className="text-base italic text-slate-700 xl:text-xs">Our Products</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 xl:gap-2.5">
            {spicesProducts.map((product, index) => (
              <Reveal key={product.name} delay={index * 70}>
                <ProductCard product={product} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 pb-3 xl:pb-1.5">
        <div className="container-shell shell-wide grid gap-4 lg:grid-cols-[0.85fr_1fr_0.7fr_0.95fr] xl:gap-2.5">
          <Reveal>
            <article className="h-full rounded-lg border border-slate-200 bg-[#eef6ec] p-5 shadow-sm xl:p-3">
              <h2 className="text-lg font-extrabold text-green xl:text-sm">KUALITAS & STANDAR</h2>
              <p className="text-sm italic text-slate-700 xl:text-[11px]">Quality &amp; Standard</p>
              <ul className="mt-4 grid gap-3 xl:mt-2 xl:gap-1.5">
                {[
                  "Bebas dari bahan kimia berbahaya",
                  "Kadar air sesuai standar ekspor",
                  "Sortasi & kebersihan terjaga",
                  "Pengemasan sesuai permintaan",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-700 xl:text-[11px]">
                    <Icon name="CircleCheck" className="mt-0.5 h-4 w-4 shrink-0 text-green xl:h-3.5 xl:w-3.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal
            delay={70}
            className="relative h-full min-h-[200px] overflow-hidden rounded-lg border border-slate-200 bg-slate-200 shadow-sm xl:min-h-[180px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1300&q=85"
              alt="Export containers and logistics"
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={130}>
            <article className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm xl:p-3">
              <h2 className="text-lg font-extrabold text-green xl:text-sm">PASAR EKSPOR KAMI</h2>
              <p className="text-sm italic text-slate-700 xl:text-[11px]">Our Export Markets</p>
              <div className="mt-4 grid gap-2.5 xl:mt-2 xl:gap-1.5">
                {exportMarkets.map((market) => (
                  <div
                    key={market.name}
                    className="flex items-center gap-2.5 text-sm font-bold text-slate-700 xl:text-[11px]"
                  >
                    <Image
                      src={market.flag}
                      alt={`Bendera ${market.name}`}
                      width={24}
                      height={16}
                      className="h-4 w-6 rounded-[2px] border border-slate-200 object-cover"
                    />
                    {market.name}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-600 xl:mt-2 xl:text-[10px]">
                dan banyak negara lainnya / <span className="italic">and many other countries</span>
              </p>
            </article>
          </Reveal>

          <Reveal delay={190}>
            <article className="relative flex h-full flex-col overflow-hidden rounded-lg bg-green p-5 text-white shadow-sm xl:p-3">
              <Image
                src="https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?auto=format&fit=crop&w=1200&q=80"
                alt="Spices ready to export"
                fill
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-cover opacity-30"
              />
              <div className="relative flex flex-1 flex-col">
                <h2 className="text-lg font-extrabold leading-tight xl:text-sm">SIAP EKSPOR, SIAP BERMITRA</h2>
                <p className="text-sm italic text-white/85 xl:text-[11px]">Ready to Export, Ready to Partner</p>
                <p className="mt-3 text-sm leading-5 text-white/85 xl:mt-2 xl:text-[11px] xl:leading-4">
                  Kami siap menjadi mitra terpercaya untuk kebutuhan rempah berkualitas Anda.
                </p>
                <p className="mt-1 text-xs italic text-white/70 xl:text-[10px] xl:leading-4">
                  We are ready to be your trusted partner for high quality spices.
                </p>
                <Link
                  href="/contact"
                  className="mt-auto inline-flex min-h-10 items-center gap-2 rounded-md bg-white px-4 text-xs font-extrabold text-green xl:min-h-9 xl:px-3 xl:text-[11px]"
                >
                  Minta Penawaran
                  <span className="font-medium italic text-slate-600">Request Quotation</span>
                  <Icon name="ArrowRight" className="h-4 w-4 xl:h-3.5 xl:w-3.5" />
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
