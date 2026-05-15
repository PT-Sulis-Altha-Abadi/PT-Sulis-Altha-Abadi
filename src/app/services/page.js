import ServiceGrid from "@/components/sections/ServiceGrid";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Layanan",
  description:
    "Daftar layanan untuk website multi-page, backend API integration, telecommunication platform, automation dashboard, dan design system.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Layanan"
        title="Modul layanan yang bisa dibentuk mengikuti kebutuhan project besar."
        description="Setiap layanan punya detail halaman sendiri dan bisa dikembangkan menjadi fitur nyata seperti dashboard, API, CMS, database, atau integrasi pihak ketiga."
        primaryHref="/contact"
        primaryLabel="Mulai Project"
      />

      <section className="bg-background py-16 md:py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Service catalog"
            title="Pilih bagian yang ingin dikembangkan lebih dulu."
            description="Fondasi ini memisahkan tampilan dan data, jadi setiap layanan bisa punya halaman detail dan konten dinamis."
          />
          <div className="mt-10">
            <ServiceGrid />
          </div>
        </div>
      </section>
    </>
  );
}
