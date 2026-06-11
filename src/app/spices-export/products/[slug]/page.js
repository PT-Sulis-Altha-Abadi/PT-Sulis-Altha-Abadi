import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import Reveal from "@/components/ui/Reveal";
import { exportMarkets, spiceProductDetails } from "@/data/site";

export function generateStaticParams() {
  return spiceProductDetails.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = spiceProductDetails.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Produk rempah tidak ditemukan",
    };
  }

  return {
    title: `Spesifikasi ${product.name}`,
    description: product.summary,
  };
}

export default async function SpiceProductDetailPage({ params }) {
  const { slug } = await params;
  const product = spiceProductDetails.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <section className="bg-white">
        <div className="container-shell shell-wide pt-3 xl:pt-1.5">
          <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="grid overflow-hidden rounded-t-lg md:grid-cols-[0.82fr_1.18fr]">
              <Reveal className="relative z-10 flex min-h-[260px] flex-col justify-center bg-gradient-to-br from-[#f5faf0] via-white to-[#eef6ec] px-7 py-7 xl:min-h-[160px] xl:px-5 xl:py-4">
                <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 xl:mb-3 xl:text-[10px]">
                  <Link href="/" className="hover:text-green">
                    Beranda
                  </Link>
                  <span>/</span>
                  <Link href="/spices-export" className="hover:text-green">
                    Altha Spices Export
                  </Link>
                  <span>/</span>
                  <span className="text-green">{product.name}</span>
                </div>

                <Link
                  href="/spices-export"
                  aria-label="Kembali ke Altha Spices Export"
                  className="mb-4 grid h-9 w-9 place-items-center rounded-full bg-green text-white shadow-sm transition hover:bg-green/90 xl:mb-2 xl:h-7 xl:w-7"
                >
                  <Icon name="ArrowRight" className="h-4 w-4 rotate-180 xl:h-3.5 xl:w-3.5" />
                </Link>

                <h1 className="text-4xl font-extrabold leading-none text-green xl:text-[30px]">
                  {product.name}
                </h1>
                <p className="mt-1 text-2xl font-medium italic text-slate-700 xl:text-[16px]">
                  {product.en}
                </p>
                <p className="mt-4 max-w-lg text-sm leading-6 text-slate-700 xl:mt-2 xl:text-[12px] xl:leading-[17px]">
                  {product.summary}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:mt-3 xl:gap-2">
                  {product.features.map((feature) => (
                    <div key={feature.title} className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green/10 text-green xl:h-8 xl:w-8">
                        <Icon name={feature.icon} className="h-5 w-5 xl:h-4 xl:w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-extrabold text-green xl:text-[12px]">{feature.title}</p>
                        <p className="text-xs italic text-slate-600 xl:text-[10px]">{feature.en}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={80} variant="right" className="relative min-h-[260px] bg-[#f5faf0] xl:min-h-[160px]">
                <Image
                  src={product.heroImage}
                  alt={`Spesifikasi ${product.name}`}
                  fill
                  priority
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-white to-transparent md:block" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-3 xl:py-1.5">
        <div className="container-shell shell-wide grid gap-4 lg:grid-cols-[1fr_330px] xl:gap-2.5">
          <div className="grid gap-4 xl:gap-2.5">
            <Reveal>
              <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm xl:p-3.5">
                <div className="mb-4 xl:mb-2">
                  <h2 className="text-xl font-extrabold text-green xl:text-[16px]">{product.productsTitle}</h2>
                  <p className="text-sm italic text-slate-700 xl:text-[11px]">Our Products</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-2">
                  {product.variants.map((variant) => (
                    <article
                      key={variant.name}
                      className="rounded-md border border-slate-200 bg-white p-4 shadow-sm xl:p-2.5"
                    >
                      <h3 className="text-sm font-extrabold text-brand xl:text-[12px]">{variant.name}</h3>
                      <p className="text-xs italic text-slate-600 xl:text-[10px]">{variant.en}</p>
                      <div className="relative my-3 aspect-[4/3] overflow-hidden rounded-md bg-green-50 xl:my-2 xl:h-[72px] xl:aspect-auto">
                        <Image
                          src={variant.image}
                          alt={variant.name}
                          fill
                          sizes="(min-width: 1024px) 18vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                      <a
                        href="#spesifikasi"
                        className="inline-flex items-center gap-2 text-xs font-extrabold text-brand xl:text-[10px]"
                      >
                        Lihat Detail
                        <span className="font-medium italic text-slate-600">View Detail</span>
                        <Icon name="ArrowRight" className="h-3.5 w-3.5" />
                      </a>
                    </article>
                  ))}
                </div>
              </article>
            </Reveal>

            <div className="grid gap-4 lg:grid-cols-[0.75fr_1fr_0.75fr] xl:gap-2.5">
              <Reveal>
                <article className="h-full rounded-lg border border-slate-200 bg-[#eef6ec] p-5 shadow-sm xl:p-3">
                  <h2 className="text-lg font-extrabold text-green xl:text-sm">KUALITAS & STANDAR</h2>
                  <p className="text-sm italic text-slate-700 xl:text-[11px]">Quality &amp; Standard</p>
                  <ul className="mt-4 grid gap-2.5 xl:mt-2 xl:gap-1.5">
                    {product.standards.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-5 text-slate-700 xl:text-[11px] xl:leading-4">
                        <Icon name="CircleCheck" className="mt-0.5 h-4 w-4 shrink-0 text-green xl:h-3.5 xl:w-3.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>

              <Reveal
                delay={80}
                className="relative min-h-[230px] overflow-hidden rounded-lg border border-slate-200 bg-slate-200 shadow-sm xl:min-h-[155px]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1300&q=85"
                  alt="Export containers and logistics"
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </Reveal>

              <Reveal delay={140}>
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
            </div>
          </div>

          <Reveal delay={120}>
            <aside
              id="spesifikasi"
              className="sticky top-24 rounded-lg border border-slate-200 bg-white p-5 shadow-sm xl:top-20 xl:p-3.5"
            >
              <h2 className="text-lg font-extrabold text-green xl:text-sm">SPESIFIKASI UMUM</h2>
              <p className="text-sm italic text-slate-700 xl:text-[11px]">General Specifications</p>
              <div className="mt-4 grid gap-3 xl:mt-2 xl:gap-2">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-[26px_0.8fr_1.2fr] gap-2 text-sm xl:grid-cols-[22px_0.82fr_1.18fr] xl:text-[11px]">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-green/10 text-green xl:h-5 xl:w-5">
                      <Icon name="Leaf" className="h-3.5 w-3.5 xl:h-3 xl:w-3" />
                    </span>
                    <span className="font-semibold text-slate-500">{spec.label}</span>
                    <span className="font-semibold text-slate-800">{spec.value}</span>
                  </div>
                ))}
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 pb-3 xl:pb-1.5">
        <div className="container-shell shell-wide">
          <Reveal>
            <article className="relative overflow-hidden rounded-lg bg-green p-6 text-white shadow-sm xl:p-4">
              <Image
                src="https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?auto=format&fit=crop&w=1600&q=85"
                alt="Spices ready to export"
                fill
                sizes="100vw"
                className="object-cover opacity-35"
              />
              <div className="relative grid gap-4 md:grid-cols-[1fr_auto] md:items-center xl:gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold leading-tight xl:text-[18px]">SIAP EKSPOR, SIAP BERMITRA</h2>
                  <p className="text-sm italic text-white/85 xl:text-[11px]">Ready to Export, Ready to Partner</p>
                  <p className="mt-2 max-w-2xl text-sm leading-5 text-white/85 xl:mt-1 xl:text-[11px] xl:leading-4">
                    Kami siap menjadi mitra terpercaya untuk kebutuhan {product.name.toLowerCase()} berkualitas Anda.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center justify-center gap-3 rounded-md bg-white px-5 text-sm font-extrabold text-green xl:min-h-9 xl:px-4 xl:text-[11px]"
                >
                  Minta Penawaran
                  <span className="font-medium italic text-slate-600">Request Quote</span>
                  <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
