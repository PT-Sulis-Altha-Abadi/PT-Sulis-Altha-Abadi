"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { faqs } from "@/data/site";
import { cn } from "@/lib/utils";

export default function FloatingFaq() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  function handleToggle() {
    setOpen((value) => !value);
  }

  function handleQuestionSelect(question) {
    setActiveQuestion(question);
  }

  function handleBack() {
    setActiveQuestion(null);
  }

  return (
    <div className="fixed bottom-5 right-4 z-[70] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {open ? (
        <section
          aria-label="Pertanyaan umum"
          className="w-[calc(100vw-32px)] max-w-[390px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl shadow-slate-950/18"
        >
          <div className="flex items-start justify-between gap-4 bg-brand px-5 py-4 text-white">
            <div>
              <p className="text-sm font-extrabold">Tanya Jawab Cepat</p>
              <p className="mt-1 text-xs text-white/78">FAQ tentang website ini</p>
            </div>
            <button
              type="button"
              aria-label="Tutup FAQ"
              onClick={handleToggle}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-white/20 transition hover:bg-white/10"
            >
              <Icon name="X" className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[min(470px,calc(100vh-130px))] overflow-y-auto bg-slate-50 p-4">
            <div className="rounded-md bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm">
              Halo, silakan pilih pertanyaan yang ingin diketahui.
            </div>

            {activeQuestion ? (
              <div className="mt-4 grid gap-3">
                <div className="ml-auto max-w-[90%] rounded-md bg-brand px-4 py-3 text-sm font-bold leading-6 text-white">
                  {activeQuestion.question}
                </div>
                <div className="max-w-[94%] rounded-md bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm">
                  {activeQuestion.answer}
                </div>
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-bold text-brand transition hover:border-brand"
                >
                  <Icon name="ChevronRight" className="h-4 w-4 rotate-180" />
                  Lihat pertanyaan lain
                </button>
              </div>
            ) : (
              <div className="mt-4 grid gap-2">
                {faqs.map((item) => (
                  <button
                    key={item.question}
                    type="button"
                    onClick={() => handleQuestionSelect(item)}
                    className="flex min-h-12 items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-4 py-3 text-left text-sm font-bold leading-5 text-brand shadow-sm transition hover:border-brand hover:bg-blue-50"
                  >
                    <span>{item.question}</span>
                    <Icon name="ChevronRight" className="h-4 w-4 shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : null}

      <button
        type="button"
        aria-label={open ? "Tutup FAQ" : "Buka FAQ"}
        aria-expanded={open}
        onClick={handleToggle}
        className={cn(
          "relative grid h-16 w-16 place-items-center rounded-full bg-brand text-white shadow-xl shadow-slate-950/25 transition hover:bg-brand-strong",
          open && "bg-accent hover:bg-[#b77f2a]",
        )}
      >
        <Icon name={open ? "X" : "MessageCircle"} className="pointer-events-none h-7 w-7" />
        {!open ? (
          <span className="pointer-events-none absolute right-0 top-0 grid h-6 w-6 place-items-center rounded-full border-2 border-white bg-accent text-sm font-extrabold">
            ?
          </span>
        ) : null}
      </button>
    </div>
  );
}
