import Link from "next/link";
import Icon from "@/components/Icon";
import { services } from "@/data/site";

export default function ServiceGrid({ limit }) {
  const visibleServices = limit ? services.slice(0, limit) : services;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {visibleServices.map((service) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className="group rounded-lg border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-slate-200/70"
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
      ))}
    </div>
  );
}
