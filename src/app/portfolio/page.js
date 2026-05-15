import ProjectGrid from "@/components/sections/ProjectGrid";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Portfolio",
  description:
    "Contoh arah website multi-page, telecommunication portal, commerce suite, dan automation dashboard.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Contoh arah visual dan struktur untuk project besar."
        description="Konten portfolio ini masih sample. Setelah gambar referensi kamu dikirim, bagian visual, card, warna, dan komposisi akan disamakan dengan target desain."
        primaryHref="/contact"
        primaryLabel="Kirim Referensi"
      />

      <section className="bg-background py-16 md:py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Project model"
            title="Tiga contoh modul yang umum dipakai website skala besar."
          />
          <div className="mt-10">
            <ProjectGrid />
          </div>
        </div>
      </section>
    </>
  );
}
