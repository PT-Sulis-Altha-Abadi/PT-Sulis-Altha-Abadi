import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import StatCard from "@/components/ui/StatCard";
import { stats, techStack } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-ink text-white">
      <Image
        src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2200&q=85"
        alt="Data center network infrastructure"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-[0.42]"
      />
      <div className="absolute inset-0 bg-ink/78" />
      <div className="absolute inset-0 site-grid opacity-20" />

      <div className="container-shell relative flex min-h-[calc(100vh-72px)] flex-col justify-center pb-24 pt-16">
        <div className="max-w-4xl">
          <p className="mb-5 inline-flex rounded-md border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-100">
            Next.js + Tailwind + JavaScript
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-normal md:text-6xl lg:text-7xl">
            Website multi-page skala besar yang siap dibentuk dari gambar referensi kamu.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
            Fondasi ini sudah menyiapkan routing, komponen, data konten, halaman
            detail, form, dan API route. Saat kamu kirim desain, visualnya bisa
            disesuaikan tanpa bongkar ulang struktur.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/services" variant="primary">
              Lihat Struktur Layanan
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Kirim Brief Project
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_420px] lg:items-end">
          <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-white/15 bg-white/10 py-5 backdrop-blur md:grid-cols-4">
            {stats.map((item) => (
              <StatCard key={item.label} {...item} />
            ))}
          </div>

          <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm font-semibold text-white">Stack awal</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {techStack.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-white/10 bg-white/10 px-2.5 py-1.5 text-xs text-white/75"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
