"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";

export default function ProjectLightboxGallery({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [zoomed, setZoomed] = useState(false);

  const activeImage = activeIndex === null ? null : images[activeIndex];

  const countText = useMemo(() => {
    if (activeIndex === null) return "";
    return `${activeIndex + 1} / ${images.length}`;
  }, [activeIndex, images.length]);

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        setZoomed(false);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current === null ? current : (current + 1) % images.length));
        setZoomed(false);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current === null ? current : (current - 1 + images.length) % images.length));
        setZoomed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, images.length]);

  const openImage = (index) => {
    setActiveIndex(index);
    setZoomed(false);
  };

  const closeImage = () => {
    setActiveIndex(null);
    setZoomed(false);
  };

  const showPrevious = () => {
    setActiveIndex((current) => (current === null ? current : (current - 1 + images.length) % images.length));
    setZoomed(false);
  };

  const showNext = () => {
    setActiveIndex((current) => (current === null ? current : (current + 1) % images.length));
    setZoomed(false);
  };

  return (
    <>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:mt-3 xl:grid-cols-6 xl:gap-2">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => openImage(index)}
            className="group relative h-[118px] overflow-hidden rounded-md border border-slate-200 bg-slate-100 text-left shadow-sm transition hover:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/40 xl:h-[86px]"
            aria-label={`Buka dokumentasi ${index + 1} ${title}`}
          >
            <Image
              src={image}
              alt={`${title} dokumentasi ${index + 1}`}
              fill
              sizes="(min-width: 1280px) 13vw, (min-width: 1024px) 20vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute left-2 top-2 rounded-full bg-slate-950/75 px-2 py-1 text-[10px] font-bold text-white">
              {index + 1}
            </span>
            <span className="absolute bottom-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-brand opacity-0 shadow-sm transition group-hover:opacity-100">
              <Icon name="Maximize2" className="h-3.5 w-3.5" />
            </span>
          </button>
        ))}
      </div>

      {activeImage ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/92 p-3 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto dokumentasi ${title}`}
        >
          <button
            type="button"
            onClick={closeImage}
            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-slate-900 shadow-lg transition hover:bg-slate-100"
            aria-label="Tutup foto"
          >
            <Icon name="X" className="h-5 w-5" />
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white"
                aria-label="Foto sebelumnya"
              >
                <Icon name="ChevronLeft" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white"
                aria-label="Foto berikutnya"
              >
                <Icon name="ChevronRight" className="h-5 w-5" />
              </button>
            </>
          ) : null}

          <div className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
            {countText}
          </div>

          <div className="flex h-full w-full max-w-6xl flex-col items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setZoomed((value) => !value)}
              className={`relative w-full overflow-auto rounded-lg bg-black/20 ${
                zoomed ? "h-full cursor-zoom-out" : "h-[78vh] cursor-zoom-in"
              }`}
              aria-label={zoomed ? "Kecilkan foto" : "Zoom foto"}
            >
              <div className={zoomed ? "relative h-[140vh] w-[140vw] min-w-[1100px]" : "relative h-full w-full"}>
                <Image
                  src={activeImage}
                  alt={`${title} dokumentasi besar ${activeIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </button>
            <div className="flex flex-wrap items-center justify-center gap-2 text-center text-xs font-semibold text-white/80">
              <span>Klik foto untuk zoom / kecilkan.</span>
              <a
                href={activeImage}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-3 py-1 text-white transition hover:bg-white/10"
              >
                Buka ukuran asli
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
