import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/ui/Reveal";
import { ProductCard } from "@/components/sections/CorporateSections";
import { exportMarkets, spicesFeatures, spicesProducts } from "@/data/site";

export const metadata = {
  title: "Produk Altha Spices Export",
  description:
    "Altha Spices Export menyediakan rempah premium Indonesia untuk pasar dunia dengan standar kualitas ekspor.",
};

export default function SpicesExportProductsPage() {
  return (
    <>
      <section className="hero-glow relative min-h-[340px] overflow-hidden bg-[#3b3008] text-white xl:min-h-[210px]">
        <Image
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=2200&q=88"
          alt="Altha Spices Export"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#3b3008]/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#342a07]/92 via-[#342a07]/72 to-[#342a07]/24" />
        <div className="container-shell relative flex min-h-[340px] items-center xl:min-h-[210px]">
          <Reveal className="relative z-10 max-w-[760px] py-12 xl:py-6">
            <h1 className="font-serif text-5xl font-bold leading-none tracking-normal md:text-6xl xl:text-5xl">
              ALTHA SPICES EXPORT
            </h1>
            <p className="mt-4 text-2xl font-bold leading-tight xl:mt-3 xl:text-xl">
              Rempah Premium Indonesia
              <span className="block">untuk Pasar Dunia</span>
            </p>
            <p className="mt-3 text-lg italic text-white/88 xl:text-sm">
              Premium Indonesian Spices
              <span className="block">for Global Market</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="container-shell grid gap-4 py-6 md:grid-cols-4 xl:py-2">
          {spicesFeatures.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <div className="flex items-center gap-4 border-slate-200 px-4 md:border-r md:last:border-r-0 xl:gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-green/10 text-green xl:h-9 xl:w-9">
                <Icon name={item.icon} className="h-6 w-6 xl:h-4 xl:w-4" />
              </span>
              <div>
                <p className="font-extrabold text-green xl:text-xs">{item.title}</p>
                <p className="text-sm italic text-slate-600 xl:text-[11px]">{item.en}</p>
              </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-10 xl:py-2">
        <div className="container-shell">
          <div className="mb-7 text-left xl:mb-3">
            <h2 className="text-xl font-extrabold text-brand xl:text-base">PRODUK KAMI</h2>
            <p className="text-base italic text-slate-700 xl:text-xs">Our Products</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5 xl:gap-3">
            {spicesProducts.map((product, index) => (
              <Reveal key={product.name} delay={index * 80}>
                <ProductCard product={product} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 pb-10 xl:pb-2">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.8fr_1.15fr_0.65fr] xl:gap-3">
          <Reveal>
            <article className="rounded-lg border border-slate-200 bg-[#eef6ec] p-6 shadow-sm xl:p-4">
            <h2 className="text-xl font-extrabold text-green xl:text-base">KUALITAS & STANDAR</h2>
            <p className="text-base italic text-slate-700 xl:text-xs">Quality & Standard</p>
            <ul className="mt-5 grid gap-4 xl:mt-3 xl:gap-2">
              {[
                "Bebas dari bahan kimia berbahaya",
                "Kadar air sesuai standar ekspor",
                "Sortasi & kebersihan terjaga",
                "Pengemasan sesuai permintaan",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-700 xl:text-[11px]">
                  <Icon name="CircleCheck" className="mt-0.5 h-5 w-5 text-green xl:h-4 xl:w-4" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            </article>
          </Reveal>

          <Reveal delay={90} className="relative min-h-[280px] overflow-hidden rounded-lg border border-slate-200 bg-slate-200 shadow-sm xl:min-h-[170px]">
            <Image
              src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1300&q=85"
              alt="Export containers and logistics"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={140}>
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm xl:p-4">
            <h2 className="text-xl font-extrabold text-green xl:text-base">PASAR EKSPOR KAMI</h2>
            <p className="text-base italic text-slate-700 xl:text-xs">Our Export Markets</p>
            <div className="mt-5 grid gap-3 xl:mt-3 xl:gap-2">
              {exportMarkets.map((market) => (
                <div key={market.name} className="flex items-center gap-3 text-sm font-bold text-slate-700 xl:text-[11px]">
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
            <p className="mt-5 text-xs text-slate-600 xl:mt-3 xl:text-[10px]">
              dan banyak negara lainnya / <span className="italic">and many other countries</span>
            </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 pb-10 xl:hidden">
        <Reveal className="container-shell relative overflow-hidden rounded-lg bg-green p-8 text-white">
          <Image
            src="https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?auto=format&fit=crop&w=1800&q=80"
            alt="Spices ready to export"
            fill
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-extrabold">SIAP EKSPOR, SIAP BERMITRA</h2>
            <p className="text-xl italic text-white/85">Ready to Export, Ready to Partner</p>
            <p className="mt-4 text-white/82">
              Kami siap menjadi mitra terpercaya untuk kebutuhan rempah berkualitas Anda.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-[52px] items-center gap-4 rounded-md bg-white px-7 text-sm font-extrabold text-green"
            >
              Minta Penawaran
              <span className="font-medium italic text-slate-600">Request Quotation</span>
              <Icon name="ArrowRight" className="h-5 w-5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
