import Link from "next/link";
import Icon from "@/components/Icon";
import { services } from "@/data/site";
import Reveal from "@/components/ui/Reveal";

export default function ServiceGrid({ limit }) {
  const visibleServices = limit ? services.slice(0, limit) : services;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {visibleServices.map((service, index) => (
        <Reveal key={service.slug} delay={index * 90}>
          <Link
            href={`/services/${service.slug}`}
            className="group lift-card block rounded-lg border border-line bg-white p-6 shadow-sm transition hover:border-brand/40"
          >
            <span className="grid h-12 w-12 place-items-center rounded-md bg-teal-50 text-brand transition group-hover:bg-brand group-hover:text-white">
              <Icon name={service.icon} className="h-5 w-5" />
            </span>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-accent">
              {service.eyebrow}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-ink">{service.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{service.summary}</p>
            <div className="mt-5 flex items-center gap-2 text-sm font-bold text-brand">
              Detail layanan
              <Icon name="ArrowRight" className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
