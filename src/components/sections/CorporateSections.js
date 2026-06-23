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

export function SectionTitle({ title, en, className, compact = false }) {
  return (
    <div className={cn("text-center", className)}>
      <h2 className={cn("text-2xl font-extrabold tracking-tight text-brand md:text-3xl", compact && "xl:text-lg")}>{title}</h2>
      {en ? <p className={cn("text-lg font-medium italic text-slate-700", compact && "xl:text-xs")}>{en}</p> : null}
      <span className={cn("mx-auto mt-2 block h-[3px] w-20 rounded-full bg-accent", compact && "xl:mt-1 xl:w-14")} />
    </div>
  );
}

export function FeatureRibbon({ items, compact = false }) {
  return (
    <div className="bg-brand text-white">
      <div
        className={cn(
          "container-shell grid gap-0 divide-y divide-white/15 md:grid-cols-5 md:divide-x md:divide-y-0",
          compact && "xl:gap-3 xl:divide-x-0 xl:divide-y-0 xl:py-2",
        )}
      >
        {items.map((item) => (
          <div
            key={item.title}
            className={cn(
              "flex min-h-[72px] items-center gap-3 px-5 py-3",
              compact &&
                "xl:min-h-[56px] xl:gap-3 xl:rounded-md xl:border xl:border-white/15 xl:bg-white/[0.07] xl:px-4 xl:py-2 xl:shadow-sm",
            )}
          >
            <span
              className={cn(
                "shrink-0 text-white",
                compact &&
                  "xl:grid xl:h-8 xl:w-8 xl:place-items-center xl:rounded-full xl:bg-white/10",
              )}
            >
              <Icon name={item.icon} className={cn("h-7 w-7", compact && "xl:h-4 xl:w-4")} />
            </span>
            <div>
              <p className={cn("text-[13px] font-extrabold leading-tight", compact && "xl:text-[11px]")}>{item.title}</p>
              <p className={cn("mt-0.5 text-[11px] italic leading-tight text-white/78", compact && "xl:text-[9px]")}>{item.en}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TelecomHeroRibbon({ items, compact = false }) {
  return (
    <div className="relative z-10 bg-[#06284b]/96 text-white md:absolute md:inset-x-0 md:bottom-0">
      <div
        className={cn(
          "container-shell grid gap-0 divide-y divide-white/10 md:grid-cols-5 md:divide-x md:divide-y-0",
          compact && "xl:gap-3 xl:divide-x-0 xl:divide-y-0 xl:py-2",
        )}
      >
        {items.map((item) => (
          <div
            key={item.title}
            className={cn(
              "flex min-h-[72px] items-center gap-3 px-5 py-3",
              compact &&
                "xl:min-h-[56px] xl:gap-3 xl:rounded-md xl:border xl:border-white/12 xl:bg-white/[0.07] xl:px-4 xl:py-2 xl:shadow-sm",
            )}
          >
            <span
              className={cn(
                "shrink-0 text-accent",
                compact &&
                  "xl:grid xl:h-8 xl:w-8 xl:place-items-center xl:rounded-full xl:bg-accent/10",
              )}
            >
              <Icon name={item.icon} className={cn("h-7 w-7", compact && "xl:h-4 xl:w-4")} />
            </span>
            <div>
              <p className={cn("text-[13px] font-extrabold leading-tight", compact && "xl:text-[11px]")}>{item.title}</p>
              <p className={cn("mt-0.5 text-[11px] italic leading-tight text-white/72", compact && "xl:text-[9px]")}>{item.en}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DivisionCards({ compact = false }) {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      {divisions.map((division) => (
        <Link
          key={division.title}
          href={division.detailHref ?? division.href}
          className={cn("group relative min-h-[205px] overflow-hidden rounded-lg border border-slate-200 bg-white p-7 shadow-sm", compact && "xl:min-h-[110px] xl:p-3")}
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
            <div className="flex items-start gap-4 xl:gap-3">
              <span
                className={cn(
                  "grid h-14 w-14 shrink-0 place-items-center rounded-full text-white",
                  compact && "xl:h-9 xl:w-9",
                  division.tone === "green" && "bg-green",
                  division.tone === "blue" && "bg-brand",
                  division.tone === "purple" && "bg-[#6c3aa4]",
                )}
              >
                <Icon name={division.icon} className={cn("h-7 w-7", compact && "xl:h-4 xl:w-4")} />
              </span>
              <div>
                <h3 className={cn("text-xl font-extrabold leading-tight text-brand", compact && "xl:text-[13px]")}>{division.title}</h3>
                <p className={cn("mt-2 text-base font-medium leading-6 text-slate-900", compact && "xl:mt-0.5 xl:text-[11px] xl:leading-[14px]")}>{division.subtitle}</p>
                <p className={cn("mt-2 text-sm italic leading-5 text-slate-700", compact && "xl:mt-0.5 xl:text-[10px] xl:leading-[14px]")}>{division.enSubtitle}</p>
              </div>
            </div>
            <div className={cn("mt-auto pt-5 text-sm font-extrabold text-brand", compact && "xl:pt-1.5 xl:text-[11px]")}>
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

export function ClientLogoGrid({ title = "KLIEN KAMI", en = "OUR CLIENTS", items = clients, compact = false }) {
  return (
    <section className={cn("rounded-lg border border-slate-200 bg-white p-6 shadow-sm", compact && "xl:p-3")}>
      <h2 className={cn("text-xl font-extrabold text-brand", compact && "xl:text-[15px]")}>{title}</h2>
      <p className={cn("text-base italic text-slate-700", compact && "xl:text-[11px]")}>{en}</p>
      <div className={cn("mt-5 grid grid-cols-2 gap-3 md:grid-cols-4", compact && "xl:mt-2 xl:gap-1.5")}>
        {items.map((item) => (
          <div
            key={item.name}
            className={cn("flex min-h-[72px] items-center justify-center rounded-md border border-slate-200 bg-white px-4 shadow-sm", compact && "xl:min-h-[36px] xl:px-2")}
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
      <p className={cn("mt-4 text-center text-xs text-slate-600", compact && "xl:mt-1.5 xl:text-[11px]")}>
        dan banyak lainnya / <span className="italic">and many more</span>
      </p>
    </section>
  );
}

export function PartnerLogoGrid({ title, en, items, compact = false }) {
  return (
    <section className={cn("rounded-lg border border-slate-200 bg-white p-6 shadow-sm", compact && "xl:p-4")}>
      <h2 className={cn("text-xl font-extrabold text-brand", compact && "xl:text-base")}>{title}</h2>
      <p className={cn("text-base italic text-slate-700", compact && "xl:text-xs")}>{en}</p>
      <div className={cn("mt-5 grid grid-cols-2 gap-3 md:grid-cols-4", compact && "xl:mt-3 xl:gap-2")}>
        {items.map((item) => (
          <div
            key={item.name}
            className={cn("flex min-h-16 items-center justify-center rounded-md border border-slate-200 bg-white px-4 shadow-sm", compact && "xl:min-h-[48px] xl:px-2")}
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
      <p className={cn("mt-4 text-center text-xs text-slate-600", compact && "xl:mt-2 xl:text-[10px]")}>
        dan banyak lainnya / <span className="italic">and many more</span>
      </p>
    </section>
  );
}

export function TrackRecordPanel({ compact = false }) {
  return (
    <section className={cn("rounded-lg border border-slate-200 bg-white p-6 shadow-sm", compact && "xl:p-3")}>
      <h2 className={cn("text-xl font-extrabold text-brand", compact && "xl:text-[18px]")}>TRACK RECORD KAMI</h2>
      <p className={cn("text-base italic text-slate-700", compact && "xl:text-[13px]")}>Our Track Record</p>
      <div className={cn("mt-5 grid divide-y divide-slate-200 md:grid-cols-3 md:divide-x md:divide-y-0", compact && "xl:mt-2")}>
        {trackRecords.map((item) => (
          <div key={item.label} className={cn("px-5 py-3 text-center", compact && "xl:px-3 xl:py-2")}>
            <Icon name={item.icon} className={cn("mx-auto h-12 w-12 text-brand", compact && "xl:h-8 xl:w-8")} />
            <p className={cn("mt-3 text-4xl font-extrabold text-brand", compact && "xl:mt-1.5 xl:text-[30px]")}>{item.value}</p>
            <p className={cn("text-sm font-semibold text-slate-800", compact && "xl:text-[13px]")}>{item.label}</p>
            <p className={cn("text-xs italic text-slate-600", compact && "xl:text-[12px]")}>{item.enLabel}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutPreview({ compact = false }) {
  return (
    <section
      className={cn(
        "relative min-h-[300px] overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-sm",
        compact && "xl:min-h-[180px] xl:p-4",
      )}
    >
      <Image
        src="/images/ptsulisaltha.jpg"
        alt="Kantor PT Sulis Altha Abadi"
        fill
        sizes="(min-width: 1280px) 760px, 100vw"
        className="scale-105 object-cover object-center opacity-65 blur-[1px]"
      />
      <Image
        src="/images/ptsulisaltha.jpg"
        alt=""
        fill
        aria-hidden="true"
        sizes="(min-width: 1280px) 760px, 100vw"
        className="object-contain object-right opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/88 to-transparent md:from-white/98 md:via-white/82 md:to-transparent" />

      <div className="relative z-10 max-w-[78%] md:max-w-[62%]">
        <h2 className={cn("text-xl font-extrabold text-brand", compact && "xl:text-[18px]")}>TENTANG KAMI</h2>
        <p className={cn("text-base italic text-slate-700", compact && "xl:text-[13px]")}>About Us</p>
        <p className={cn("mt-4 text-sm leading-6 text-slate-700", compact && "xl:mt-2 xl:text-[13px] xl:leading-[18px]")}>
          PT Sulis Altha Abadi adalah perusahaan yang bergerak di bidang ekspor
          rempah (Altha Spices Export), konstruksi barang & jasa, dan telekomunikasi
          dengan komitmen pada kualitas, integritas, dan profesionalisme.
        </p>
        <p className={cn("mt-3 text-sm italic leading-6 text-slate-600", compact && "xl:mt-1.5 xl:text-[12px] xl:leading-[17px]")}>
          PT Sulis Altha Abadi is a company engaged in spices export
          (Altha Spices Export), construction goods & services, and telecommunication
          with a commitment to quality, integrity, and professionalism.
        </p>
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
      <div className={cn("relative", compact ? "aspect-[16/7] xl:aspect-auto xl:h-[70px]" : "aspect-[4/3]")}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 20vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className={cn("p-5", compact && "xl:p-2")}>
        <h3 className={cn("text-base font-extrabold leading-tight text-brand", compact && "xl:text-[12px]")}>{service.title}</h3>
        <p className={cn("text-sm italic text-slate-700", compact && "xl:text-[10px]")}>{service.en}</p>
        <ul className={cn("mt-4 grid gap-1.5 text-sm text-slate-700", compact && "xl:mt-1 xl:gap-0.5 xl:text-[11px] xl:leading-[15px]")}>
          {service.points.map((point) => (
            <li key={point} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <Link href="/contact" className={cn("mt-5 inline-flex items-center gap-3 text-sm font-bold text-brand", compact && "xl:mt-1 xl:text-[11px]")}>
          Selengkapnya
          <Icon name="ArrowRight" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export function ProjectStrip({ title, en, projects, compact = false }) {
  return (
    <section className={cn("rounded-lg border border-slate-200 bg-white p-6 shadow-sm", compact && "xl:p-3")}>
      <h2 className={cn("text-xl font-extrabold text-brand", compact && "xl:text-[15px]")}>{title}</h2>
      <p className={cn("text-base italic text-slate-700", compact && "xl:text-[11px]")}>{en}</p>
      <div className={cn("mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4", compact && "xl:mt-2 xl:gap-2")}>
        {projects.map((project) => (
          <Link
            key={project.title}
            href={project.href ?? "/contact"}
            className="group block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            <div className={cn("relative aspect-[4/3] overflow-hidden rounded-md bg-slate-200", compact && "xl:h-[92px]")}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 15vw, 50vw"
                className={cn(
                  "object-cover transition duration-500 group-hover:scale-105",
                  "xl:object-contain xl:group-hover:scale-100",
                )}
              />
            </div>
            <h3 className={cn("mt-2 text-sm font-bold text-slate-900 transition group-hover:text-brand", compact && "xl:mt-1 xl:text-[12px]")}>{project.title}</h3>
            <p className={cn("text-xs text-slate-600", compact && "xl:text-[11px]")}>{project.meta}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ProductCard({ product, compact = false }) {
  return (
    <article className={cn("rounded-lg border border-slate-200 bg-white p-5 shadow-sm", compact && "xl:p-4")}>
      <h3 className={cn("font-extrabold text-brand", compact && "xl:text-sm")}>{product.name}</h3>
      <p className={cn("text-sm italic text-slate-600", compact && "xl:text-[11px]")}>{product.en}</p>
      <div className={cn("relative my-5 aspect-[4/3] overflow-hidden rounded-md bg-green-50", compact && "xl:my-1.5 xl:aspect-auto xl:h-[100px]")}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="20vw"
          className={cn("object-cover", product.imageClassName)}
        />
      </div>
      <Link
        href={`/spices-export/products/${product.slug}`}
        className={cn("inline-flex items-center gap-3 text-sm font-bold text-brand", compact && "xl:text-[11px]")}
      >
        Lihat Detail
        <span className="font-medium italic text-slate-600">View Detail</span>
        <Icon name="ArrowRight" className="h-4 w-4" />
      </Link>
    </article>
  );
}

export function LeadershipCards({ compact = false }) {
  return (
    <div className={cn("grid gap-7 lg:grid-cols-2", compact && "xl:gap-3")}>
      {leaders.map((leader) => (
        <article key={leader.name} className={cn("grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:grid-cols-[275px_1fr]", compact && "xl:grid-cols-[150px_1fr]")}>
          <div className={cn("relative min-h-[430px] overflow-hidden bg-brand", compact && "xl:min-h-[180px]")}>
            <Image
              src={leader.photo}
              alt={leader.name}
              fill
              sizes="300px"
              className={cn(
                "object-cover object-top",
                compact && "xl:origin-top xl:scale-[1.45] xl:object-[50%_8%]",
              )}
            />
          </div>
          <div className={cn("p-7", compact && "xl:p-3")}>
            <h3 className={cn("text-2xl font-extrabold text-brand", compact && "xl:text-[17px]")}>{leader.name}</h3>
            <p className={cn("text-base font-semibold italic text-slate-900", compact && "xl:text-[13px]")}>{leader.role}</p>
            <p className={cn("mt-4 text-sm leading-6 text-slate-700", compact && "xl:mt-1.5 xl:text-[12px] xl:leading-[16px]")}>{leader.summary}</p>

            <div className={cn("mt-5 grid gap-5", compact && "xl:mt-2 xl:grid-cols-2 xl:gap-3")}>
              <div className={cn("flex gap-3", compact && "xl:gap-2")}>
                <Icon name="GraduationCap" className={cn("mt-1 h-6 w-6 text-brand", compact && "xl:h-4 xl:w-4")} />
                <div>
                  <p className={cn("text-sm font-extrabold text-brand", compact && "xl:text-[12px]")}>Pendidikan</p>
                  <p className={cn("text-sm text-slate-700", compact && "xl:text-[11px] xl:leading-[15px]")}>{leader.education}</p>
                </div>
              </div>

              <div className={cn("flex gap-3", compact && "xl:gap-2")}>
                <Icon name="BriefcaseBusiness" className={cn("mt-1 h-6 w-6 text-brand", compact && "xl:h-4 xl:w-4")} />
                <div>
                  <p className={cn("text-sm font-extrabold text-brand", compact && "xl:text-[12px]")}>Pengalaman & Fokus</p>
                  <ul className={cn("mt-2 grid gap-1 text-sm text-slate-700", compact && "xl:mt-0.5 xl:gap-0 xl:text-[11px] xl:leading-[15px]")}>
                    {leader.focus.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <a
              href={leader.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Buka profil LinkedIn ${leader.name}`}
              className={cn(
                "mt-5 flex w-fit items-center gap-2 text-sm font-semibold text-brand transition hover:text-[#0a66c2] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
                compact && "xl:mt-2 xl:text-[11px]",
              )}
            >
              <Icon name="LinkedIn" className={cn("h-5 w-5", compact && "xl:h-3.5 xl:w-3.5")} />
              {leader.linkedin}
              <Icon name="ExternalLink" className={cn("h-4 w-4", compact && "xl:h-3 xl:w-3")} />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

export function StatsQuoteBand({ compact = false }) {
  return (
    <section className="bg-brand text-white">
      <div className={cn("container-shell grid gap-6 py-9 md:grid-cols-[1.1fr_1fr_1fr_1fr]", compact && "xl:gap-3 xl:py-3")}>
        <div className={cn("flex items-center gap-5", compact && "xl:gap-3")}>
          <span className="text-5xl font-serif text-accent">“</span>
          <div>
            <p className={cn("text-lg font-extrabold", compact && "xl:text-sm")}>Bersama membangun nilai, menghubungkan dunia.</p>
            <p className={cn("mt-2 italic text-white/75", compact && "xl:mt-1 xl:text-xs")}>Building value, connecting the world.</p>
          </div>
        </div>
        {[
          ["ShieldCheck", "10+", "Tahun Pengalaman", "Years Of Experience"],
          ["Globe2", "3", "Divisi Usaha", "Business Divisions"],
          ["Handshake", "100+", "Mitra & Klien", "Partners & Clients"],
        ].map(([icon, value, title, en]) => (
          <div key={title} className={cn("flex items-center gap-5 px-6", compact && "xl:gap-3 xl:px-4")}>
            <Icon name={icon} className={cn("h-14 w-14 text-white", compact && "xl:h-8 xl:w-8")} />
            <div>
              <p className={cn("text-4xl font-extrabold", compact && "xl:text-2xl")}>{value}</p>
              <p className={cn("font-bold", compact && "xl:text-xs")}>{title}</p>
              <p className={cn("italic text-white/75", compact && "xl:text-[10px]")}>{en}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function GoogleMapEmbed({ compact = false }) {
  const coords = company.mapCoordinates;
  const label = encodeURIComponent(company.name);
  const src = coords
    ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}(${label})&z=17&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery ?? company.address)}&z=17&output=embed`;

  return (
    <div className={cn("relative h-full min-h-[380px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm", compact && "xl:min-h-[210px]")}>
      <iframe
        title="Lokasi PT Sulis Altha Abadi di Google Maps"
        src={src}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}

export function ContactInfoList({ compact = false, contact }) {
  const phone = contact?.phone ?? company.phone;
  const email = contact?.email ?? company.email;

  return (
    <div className={cn("grid gap-7", compact && "xl:gap-4")}>
      {[
        ["MessageCircle", "WhatsApp", phone],
        ["Mail", "Email", email],
        ["MapPin", "Alamat", company.address],
        ["Clock", "Jam Operasional", "Senin - Jumat : 08.00 - 17.00 WIB\nSabtu : 08.00 - 12.00 WIB"],
      ].map(([icon, title, value]) => (
        <div key={title} className={cn("flex gap-5", compact && "xl:gap-3")}>
          <Icon name={icon} className={cn("mt-1 h-9 w-9 text-brand", compact && "xl:h-6 xl:w-6")} />
          <div>
            <p className={cn("font-extrabold text-slate-900", compact && "xl:text-xs")}>{title}</p>
            <p className={cn("whitespace-pre-line text-base leading-6 text-slate-700", compact && "xl:text-[11px] xl:leading-4")}>{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
