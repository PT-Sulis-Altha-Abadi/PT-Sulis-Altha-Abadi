import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import Reveal from "@/components/ui/Reveal";
import { portfolioProjects } from "@/data/site";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Proyek tidak ditemukan",
    };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const parentHref = project.category === "construction" ? "/construction" : "/telecommunication";
  const parentLabel = project.category === "construction" ? "Konstruksi Barang & Jasa" : "Telekomunikasi";
  const relatedProjects = portfolioProjects
    .filter((item) => item.category === project.category && item.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <section className="bg-white">
        <div className="container-shell shell-wide pt-3 xl:pt-1.5">
          <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-950 text-white shadow-sm">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/72 to-slate-950/20" />
            <div className="relative grid min-h-[320px] items-center px-7 py-8 xl:min-h-[190px] xl:px-5 xl:py-4">
              <Reveal className="max-w-3xl">
                <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/70 xl:mb-2 xl:text-[10px]">
                  <Link href="/" className="hover:text-white">
                    Beranda
                  </Link>
                  <span>/</span>
                  <Link href={parentHref} className="hover:text-white">
                    {parentLabel}
                  </Link>
                  <span>/</span>
                  <span className="text-white">{project.title}</span>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-white/85 xl:text-[10px]">
                  <Icon name={project.category === "construction" ? "Building2" : "RadioTower"} className="h-4 w-4" />
                  {project.categoryLabel}
                </span>
                <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl xl:mt-2 xl:text-[30px]">
                  {project.title}
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-white/86 xl:mt-1.5 xl:text-[12px] xl:leading-[18px]">
                  {project.summary}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-3 xl:py-1.5">
        <div className="container-shell shell-wide grid gap-4 lg:grid-cols-[0.72fr_1.28fr] xl:gap-2.5">
          <Reveal>
            <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm xl:p-3.5">
              <h2 className="text-xl font-extrabold text-brand xl:text-[16px]">RINGKASAN PROYEK</h2>
              <p className="text-sm italic text-slate-700 xl:text-[11px]">Project Summary</p>
              <div className="mt-5 grid gap-3 xl:mt-3 xl:gap-2">
                {[
                  ["Klien", project.client],
                  ["Bidang", project.categoryLabel],
                  ["Nomor Dokumentasi", `Poin ${project.number}`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md border border-slate-200 bg-slate-50 p-3 xl:p-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 xl:text-[9px]">{label}</p>
                    <p className="mt-1 text-sm font-extrabold text-slate-900 xl:text-[12px]">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 xl:mt-3">
                <h3 className="text-sm font-extrabold text-brand xl:text-[12px]">Lingkup Pekerjaan</h3>
                <ul className="mt-3 grid gap-2 text-sm text-slate-700 xl:mt-2 xl:text-[11px]">
                  {project.scope.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Icon name="CircleCheck" className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={parentHref}
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-xs font-extrabold text-white transition hover:bg-brand/90 xl:mt-4 xl:px-3 xl:py-1.5 xl:text-[11px]"
              >
                Kembali ke {parentLabel}
                <Icon name="ArrowRight" className="h-4 w-4 rotate-180" />
              </Link>
            </aside>
          </Reveal>

          <Reveal delay={80}>
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm xl:p-3.5">
              <h2 className="text-xl font-extrabold text-brand xl:text-[16px]">DOKUMENTASI PROYEK</h2>
              <p className="text-sm italic text-slate-700 xl:text-[11px]">Project Documentation</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:mt-3 xl:gap-2">
                {project.gallery.map((image, index) => (
                  <div
                    key={image}
                    className="group relative aspect-[4/3] overflow-hidden rounded-md border border-slate-200 bg-slate-100 shadow-sm xl:aspect-auto xl:h-[110px]"
                  >
                    <Image
                      src={image}
                      alt={`${project.title} dokumentasi ${index + 1}`}
                      fill
                      sizes="(min-width: 1024px) 20vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-105 xl:object-contain xl:group-hover:scale-100"
                    />
                    <span className="absolute left-2 top-2 rounded-full bg-slate-950/70 px-2 py-1 text-[10px] font-bold text-white">
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 pb-3 xl:pb-1.5">
        <div className="container-shell shell-wide">
          <Reveal>
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm xl:p-3.5">
              <h2 className="text-xl font-extrabold text-brand xl:text-[16px]">PROYEK TERKAIT</h2>
              <p className="text-sm italic text-slate-700 xl:text-[11px]">Related Projects</p>
              <div className="mt-5 grid gap-3 md:grid-cols-3 xl:mt-3 xl:gap-2">
                {relatedProjects.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className="group overflow-hidden rounded-md border border-slate-200 bg-slate-50 shadow-sm transition hover:border-brand/40"
                  >
                    <div className="relative aspect-[16/8] overflow-hidden bg-slate-200 xl:h-[80px] xl:aspect-auto">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105 xl:object-contain xl:group-hover:scale-100"
                      />
                    </div>
                    <div className="p-4 xl:p-2.5">
                      <h3 className="text-sm font-extrabold text-slate-900 transition group-hover:text-brand xl:text-[12px]">{item.title}</h3>
                      <p className="text-xs text-slate-600 xl:text-[10px]">{item.meta}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
