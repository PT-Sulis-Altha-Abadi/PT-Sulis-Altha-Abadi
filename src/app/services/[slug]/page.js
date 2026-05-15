import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import ButtonLink from "@/components/ui/ButtonLink";
import PageHero from "@/components/ui/PageHero";
import { services } from "@/data/site";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {
      title: "Layanan tidak ditemukan",
    };
  }

  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        description={service.description}
        primaryHref="/contact"
        primaryLabel="Bahas Detail"
      />

      <section className="bg-background py-16 md:py-24">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm md:p-8">
            <span className="grid h-14 w-14 place-items-center rounded-md bg-teal-50 text-brand">
              <Icon name={service.icon} className="h-6 w-6" />
            </span>
            <h2 className="mt-6 text-2xl font-semibold text-ink">Fokus implementasi</h2>
            <p className="mt-3 text-base leading-7 text-muted">{service.summary}</p>

            <div className="mt-8 grid gap-3">
              {service.highlights.map((item) => (
                <div key={item} className="flex gap-3 rounded-md bg-slate-50 p-4">
                  <Icon name="Check" className="mt-0.5 h-5 w-5 text-brand" />
                  <span className="text-sm font-semibold leading-6 text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">Deliverables</h2>
            <div className="mt-5 grid gap-3">
              {service.deliverables.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <Icon name="CircleCheck" className="h-5 w-5 text-brand" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-7">
              <ButtonLink href="/contact" className="w-full">
                Kirim Brief
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-shell">
          <div className="mb-8 flex items-end justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                Layanan lain
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">Masih bisa diperluas.</h2>
            </div>
            <Link href="/services" className="hidden text-sm font-bold text-brand hover:text-brand-strong md:block">
              Semua layanan
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/services/${item.slug}`} className="rounded-lg border border-line bg-slate-50 p-5 hover:border-brand/40">
                <Icon name={item.icon} className="h-5 w-5 text-brand" />
                <h3 className="mt-4 font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
