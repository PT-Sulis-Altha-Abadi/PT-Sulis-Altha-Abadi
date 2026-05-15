import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
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
      <section className="relative min-h-[340px] overflow-hidden bg-[#3b3008] text-white xl:min-h-[430px]">
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
        <div className="container-shell relative flex min-h-[340px] items-center xl:min-h-[430px]">
          <div className="max-w-[760px] py-12">
            <h1 className="font-serif text-5xl font-bold leading-none tracking-normal md:text-6xl">
              ALTHA SPICES EXPORT
            </h1>
            <p className="mt-4 text-2xl font-bold leading-tight">
              Rempah Premium Indonesia
              <span className="block">untuk Pasar Dunia</span>
            </p>
            <p className="mt-3 text-lg italic text-white/88">
              Premium Indonesian Spices
              <span className="block">for Global Market</span>
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="container-shell grid gap-4 py-6 md:grid-cols-4">
          {spicesFeatures.map((item) => (
            <div key={item.title} className="flex items-center gap-4 border-slate-200 px-4 md:border-r md:last:border-r-0">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-green/10 text-green">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <div>
                <p className="font-extrabold text-green">{item.title}</p>
                <p className="text-sm italic text-slate-600">{item.en}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-10">
        <div className="container-shell">
          <div className="mb-7 text-left">
            <h2 className="text-xl font-extrabold text-brand">PRODUK KAMI</h2>
            <p className="text-base italic text-slate-700">Our Products</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {spicesProducts.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 pb-10">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.8fr_1.15fr_0.65fr]">
          <article className="rounded-lg border border-slate-200 bg-[#eef6ec] p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-green">KUALITAS & STANDAR</h2>
            <p className="text-base italic text-slate-700">Quality & Standard</p>
            <ul className="mt-5 grid gap-4">
              {[
                "Bebas dari bahan kimia berbahaya",
                "Kadar air sesuai standar ekspor",
                "Sortasi & kebersihan terjaga",
                "Pengemasan sesuai permintaan",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-700">
                  <Icon name="CircleCheck" className="mt-0.5 h-5 w-5 text-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <div className="relative min-h-[280px] overflow-hidden rounded-lg border border-slate-200 bg-slate-200 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1300&q=85"
              alt="Export containers and logistics"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>

          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-green">PASAR EKSPOR KAMI</h2>
            <p className="text-base italic text-slate-700">Our Export Markets</p>
            <div className="mt-5 grid gap-3">
              {exportMarkets.map((market) => (
                <div key={market.name} className="flex items-center gap-3 text-sm font-bold text-slate-700">
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
            <p className="mt-5 text-xs text-slate-600">
              dan banyak negara lainnya / <span className="italic">and many other countries</span>
            </p>
          </article>
        </div>
      </section>

      <section className="bg-slate-50 pb-10">
        <div className="container-shell relative overflow-hidden rounded-lg bg-green p-8 text-white">
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
        </div>
      </section>
    </>
  );
}
