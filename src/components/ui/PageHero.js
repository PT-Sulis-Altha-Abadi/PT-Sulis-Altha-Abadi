import ButtonLink from "@/components/ui/ButtonLink";

export default function PageHero({ eyebrow, title, description, primaryHref, primaryLabel }) {
  return (
    <section className="border-b border-line bg-white">
      <div className="container-shell grid gap-8 py-16 md:py-20 lg:grid-cols-[1fr_360px] lg:items-end">
        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-balance text-4xl font-semibold tracking-normal text-ink md:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        {primaryHref && primaryLabel ? (
          <div className="lg:justify-self-end">
            <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
          </div>
        ) : null}
      </div>
    </section>
  );
}
