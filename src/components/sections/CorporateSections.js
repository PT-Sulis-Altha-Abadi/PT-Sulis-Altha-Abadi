import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import {
  clients,
  company,
  divisions,
  faqs,
  leaders,
  trackRecords,
} from "@/data/site";
import { cn } from "@/lib/utils";

export function SectionTitle({ title, en, className }) {
  return (
    <div className={cn("text-center", className)}>
      <h2 className="text-2xl font-extrabold tracking-tight text-brand md:text-3xl">{title}</h2>
      {en ? <p className="text-lg font-medium italic text-slate-700">{en}</p> : null}
      <span className="mx-auto mt-2 block h-[3px] w-20 rounded-full bg-accent" />
    </div>
  );
}

export function FeatureRibbon({ items }) {
  return (
    <div className="bg-brand text-white">
      <div className="container-shell grid gap-0 divide-y divide-white/15 md:grid-cols-5 md:divide-x md:divide-y-0">
        {items.map((item) => (
          <div key={item.title} className="flex min-h-[72px] items-center gap-3 px-5 py-3">
            <Icon name={item.icon} className="h-7 w-7 shrink-0 text-white" />
            <div>
              <p className="text-[13px] font-extrabold leading-tight">{item.title}</p>
              <p className="mt-0.5 text-[11px] italic leading-tight text-white/78">{item.en}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TelecomHeroRibbon({ items }) {
  return (
    <div className="relative z-10 bg-[#06284b]/96 text-white md:absolute md:inset-x-0 md:bottom-0">
      <div className="container-shell grid gap-0 divide-y divide-white/10 md:grid-cols-5 md:divide-x md:divide-y-0">
        {items.map((item) => (
          <div key={item.title} className="flex min-h-[72px] items-center gap-3 px-5 py-3">
            <Icon name={item.icon} className="h-7 w-7 shrink-0 text-accent" />
            <div>
              <p className="text-[13px] font-extrabold leading-tight">{item.title}</p>
              <p className="mt-0.5 text-[11px] italic leading-tight text-white/72">{item.en}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DivisionCards() {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      {divisions.map((division) => (
        <Link
          key={division.title}
          href={division.detailHref ?? division.href}
          className="group relative min-h-[205px] overflow-hidden rounded-lg border border-slate-200 bg-white p-7 shadow-sm"
        >
          <Image
            src={division.image}
            alt={division.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover opacity-25 transition duration-500 group-hover:scale-105"
          />
          <div
            className={cn(
              "absolute inset-0",
              division.tone === "green" && "bg-gradient-to-r from-green-50 via-white/90 to-transparent",
              division.tone === "blue" && "bg-gradient-to-r from-blue-50 via-white/90 to-transparent",
              division.tone === "purple" && "bg-gradient-to-r from-violet-50 via-white/90 to-transparent",
            )}
          />
          <div className="relative flex h-full flex-col">
            <div className="flex items-start gap-4">
              <span
                className={cn(
                  "grid h-14 w-14 shrink-0 place-items-center rounded-full text-white",
                  division.tone === "green" && "bg-green",
                  division.tone === "blue" && "bg-brand",
                  division.tone === "purple" && "bg-[#6c3aa4]",
                )}
              >
                <Icon name={division.icon} className="h-7 w-7" />
              </span>
              <div>
                <h3 className="text-xl font-extrabold leading-tight text-brand">{division.title}</h3>
                <p className="mt-2 text-base font-medium leading-6 text-slate-900">{division.subtitle}</p>
                <p className="mt-2 text-sm italic leading-5 text-slate-700">{division.enSubtitle}</p>
              </div>
            </div>
            <div className="mt-auto pt-5 text-sm font-extrabold text-brand">
              {division.action}
              <span className="ml-2 font-medium italic text-slate-700">{division.actionEn}</span>
              <Icon name="ArrowRight" className="ml-4 inline h-5 w-5 transition group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function ClientLogoGrid({ title = "KLIEN KAMI", en = "OUR CLIENTS", items = clients }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-extrabold text-brand">{title}</h2>
      <p className="text-base italic text-slate-700">{en}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex min-h-[72px] items-center justify-center rounded-md border border-slate-200 bg-white px-4 shadow-sm"
          >
            <Image
              src={item.src}
              alt={item.name}
              width={180}
              height={72}
              className={cn("h-auto w-auto max-w-full object-contain", item.className)}
            />
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-slate-600">
        dan banyak lainnya / <span className="italic">and many more</span>
      </p>
    </section>
  );
}

export function PartnerLogoGrid({ title, en, items }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-extrabold text-brand">{title}</h2>
      <p className="text-base italic text-slate-700">{en}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex min-h-16 items-center justify-center rounded-md border border-slate-200 bg-white px-4 shadow-sm"
          >
            <Image
              src={item.src}
              alt={item.name}
              width={180}
              height={64}
              className={cn("h-auto w-auto max-w-full object-contain", item.className)}
            />
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-slate-600">
        dan banyak lainnya / <span className="italic">and many more</span>
      </p>
    </section>
  );
}

export function TrackRecordPanel() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-extrabold text-brand">TRACK RECORD KAMI</h2>
      <p className="text-base italic text-slate-700">Our Track Record</p>
      <div className="mt-5 grid divide-y divide-slate-200 md:grid-cols-3 md:divide-x md:divide-y-0">
        {trackRecords.map((item) => (
          <div key={item.label} className="px-5 py-3 text-center">
            <Icon name={item.icon} className="mx-auto h-12 w-12 text-brand" />
            <p className="mt-3 text-4xl font-extrabold text-brand">{item.value}</p>
            <p className="text-sm font-semibold text-slate-800">{item.label}</p>
            <p className="text-xs italic text-slate-600">{item.enLabel}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutPreview() {
  return (
    <section className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_190px]">
      <div>
        <h2 className="text-xl font-extrabold text-brand">TENTANG KAMI</h2>
        <p className="text-base italic text-slate-700">About Us</p>
        <p className="mt-4 text-sm leading-6 text-slate-700">
          PT Sulis Altha Abadi adalah perusahaan yang bergerak di bidang ekspor
          rempah, konstruksi barang & jasa, dan telekomunikasi dengan komitmen
          pada kualitas, integritas, dan profesionalisme.
        </p>
        <p className="mt-3 text-sm italic leading-6 text-slate-600">
          PT Sulis Altha Abadi is a company engaged in spices export, construction
          goods & services, and telecommunication with a commitment to quality,
          integrity, and professionalism.
        </p>
      </div>
      <div className="relative min-h-[170px] overflow-hidden rounded-md bg-slate-200">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80"
          alt="PT Sulis Altha Abadi office building"
          fill
          sizes="220px"
          className="object-cover"
        />
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="bg-white py-10">
      <div className="container-shell grid gap-7 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
        <div>
          <h2 className="text-2xl font-extrabold text-brand md:text-3xl">
            PERTANYAAN UMUM
          </h2>
          <p className="mt-1 text-lg italic text-slate-700">
            Frequently Asked Questions
          </p>
          <span className="mt-3 block h-[3px] w-20 rounded-full bg-accent" />
          <p className="mt-5 max-w-[420px] text-sm leading-6 text-slate-700">
            Ringkasan cepat tentang isi website, divisi usaha, produk, layanan,
            dan cara menghubungi PT Sulis Altha Abadi.
          </p>
        </div>

        <div className="grid gap-3">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 shadow-sm open:bg-white"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-extrabold text-brand">
                <span>{item.question}</span>
                <Icon
                  name="ChevronDown"
                  className="h-5 w-5 shrink-0 transition group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 pr-8 text-sm leading-6 text-slate-700">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceCard({ service, compact = false }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className={cn("relative", compact ? "aspect-[16/9]" : "aspect-[4/3]")}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 20vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="text-base font-extrabold leading-tight text-brand">{service.title}</h3>
        <p className="text-sm italic text-slate-700">{service.en}</p>
        <ul className="mt-4 grid gap-1.5 text-sm text-slate-700">
          {service.points.map((point) => (
            <li key={point} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <Link href="/contact" className="mt-5 inline-flex items-center gap-3 text-sm font-bold text-brand">
          Selengkapnya
          <Icon name="ArrowRight" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export function ProjectStrip({ title, en, projects }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-extrabold text-brand">{title}</h2>
      <p className="text-base italic text-slate-700">{en}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <article key={project.title}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-slate-200">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 15vw, 50vw"
                className="object-cover"
              />
            </div>
            <h3 className="mt-2 text-sm font-bold text-slate-900">{project.title}</h3>
            <p className="text-xs text-slate-600">{project.meta}</p>
          </article>
        ))}
      </div>
      <Link href="/portfolio" className="mt-5 flex justify-end gap-2 text-sm font-bold text-brand">
        Lihat Semua Proyek
        <Icon name="ArrowRight" className="h-4 w-4" />
      </Link>
    </section>
  );
}

export function ProductCard({ product }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-extrabold text-brand">{product.name}</h3>
      <p className="text-sm italic text-slate-600">{product.en}</p>
      <div className="relative my-5 aspect-[4/3] overflow-hidden rounded-md bg-green-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="20vw"
          className={cn("object-cover", product.imageClassName)}
        />
      </div>
      <Link href="/contact" className="inline-flex items-center gap-3 text-sm font-bold text-brand">
        Lihat Detail
        <span className="font-medium italic text-slate-600">View Detail</span>
        <Icon name="ArrowRight" className="h-4 w-4" />
      </Link>
    </article>
  );
}

export function LeadershipCards() {
  return (
    <div className="grid gap-7 lg:grid-cols-2">
      {leaders.map((leader) => (
        <article key={leader.name} className="grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:grid-cols-[275px_1fr]">
          <div className="relative min-h-[430px] bg-brand">
            <Image
              src={leader.photo}
              alt={leader.name}
              fill
              sizes="300px"
              className="object-cover object-top"
            />
          </div>
          <div className="p-7">
            <h3 className="text-2xl font-extrabold text-brand">{leader.name}</h3>
            <p className="text-base font-semibold italic text-slate-900">{leader.role}</p>
            <p className="mt-4 text-sm leading-6 text-slate-700">{leader.summary}</p>

            <div className="mt-5 flex gap-3">
              <Icon name="GraduationCap" className="mt-1 h-6 w-6 text-brand" />
              <div>
                <p className="text-sm font-extrabold text-brand">Pendidikan</p>
                <p className="text-sm text-slate-700">{leader.education}</p>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <Icon name="BriefcaseBusiness" className="mt-1 h-6 w-6 text-brand" />
              <div>
                <p className="text-sm font-extrabold text-brand">Pengalaman & Fokus</p>
                <ul className="mt-2 grid gap-1 text-sm text-slate-700">
                  {leader.focus.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand">
              <Icon name="LinkedIn" className="h-5 w-5" />
              {leader.linkedin}
              <Icon name="ExternalLink" className="h-4 w-4" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function StatsQuoteBand() {
  return (
    <section className="bg-brand text-white">
      <div className="container-shell grid gap-6 py-9 md:grid-cols-[1.1fr_1fr_1fr_1fr] md:divide-x md:divide-white/20">
        <div className="flex items-center gap-5">
          <span className="text-5xl font-serif text-accent">“</span>
          <div>
            <p className="text-lg font-extrabold">Bersama membangun nilai, menghubungkan dunia.</p>
            <p className="mt-2 italic text-white/75">Building value, connecting the world.</p>
          </div>
        </div>
        {[
          ["ShieldCheck", "10+", "Tahun Pengalaman", "Years Of Experience"],
          ["Globe2", "3", "Divisi Usaha", "Business Divisions"],
          ["Handshake", "100+", "Mitra & Klien", "Partners & Clients"],
        ].map(([icon, value, title, en]) => (
          <div key={title} className="flex items-center gap-5 px-6">
            <Icon name={icon} className="h-14 w-14 text-white" />
            <div>
              <p className="text-4xl font-extrabold">{value}</p>
              <p className="font-bold">{title}</p>
              <p className="italic text-white/75">{en}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function GoogleMapEmbed() {
  const mapQuery = encodeURIComponent(company.address);

  return (
    <div className="relative min-h-[380px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <iframe
        title="Lokasi PT Sulis Altha Abadi di Google Maps"
        src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}

export function ContactInfoList() {
  return (
    <div className="grid gap-7">
      {[
        ["MessageCircle", "WhatsApp", company.phone],
        ["Mail", "Email", company.email],
        ["MapPin", "Alamat", company.address],
        ["Clock", "Jam Operasional", "Senin - Jumat : 08.00 - 17.00 WIB\nSabtu : 08.00 - 12.00 WIB"],
      ].map(([icon, title, value]) => (
        <div key={title} className="flex gap-5">
          <Icon name={icon} className="mt-1 h-9 w-9 text-brand" />
          <div>
            <p className="font-extrabold text-slate-900">{title}</p>
            <p className="whitespace-pre-line text-base leading-6 text-slate-700">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
