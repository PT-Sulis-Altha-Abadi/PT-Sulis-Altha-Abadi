"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { faqs } from "@/data/site";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "pt-sulis-floating-faq-position";
const BUTTON_SIZE = 46;
const SCREEN_MARGIN = 12;

function getDefaultPosition() {
  if (typeof window === "undefined") {
    return null;
  }

  return {
    x: window.innerWidth - BUTTON_SIZE - 24,
    y: window.innerHeight - BUTTON_SIZE - 24,
  };
}

function clampPosition(position) {
  if (typeof window === "undefined" || !position) {
    return position;
  }

  return {
    x: Math.min(
      Math.max(position.x, SCREEN_MARGIN),
      window.innerWidth - BUTTON_SIZE - SCREEN_MARGIN,
    ),
    y: Math.min(
      Math.max(position.y, SCREEN_MARGIN),
      window.innerHeight - BUTTON_SIZE - SCREEN_MARGIN,
    ),
  };
}

export default function FloatingFaq() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("faq");
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      text: "Halo, saya AI assistant PT Sulis Altha Abadi. Silakan tanya tentang ekspor rempah, konstruksi, telekomunikasi, kontak, atau layanan perusahaan.",
    },
  ]);
  const [aiLoading, setAiLoading] = useState(false);
  const [position, setPosition] = useState(null);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef(null);
  const ignoreClickRef = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const savedPosition = window.localStorage.getItem(STORAGE_KEY);
        const parsedPosition = savedPosition ? JSON.parse(savedPosition) : null;
        setPosition(clampPosition(parsedPosition ?? getDefaultPosition()));
      } catch {
        setPosition(clampPosition(getDefaultPosition()));
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleResize() {
      setPosition((current) => clampPosition(current ?? getDefaultPosition()));
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  function handleToggle() {
    if (ignoreClickRef.current) {
      ignoreClickRef.current = false;
      return;
    }

    setOpen((value) => !value);
  }

  function handleQuestionSelect(question) {
    setActiveQuestion(question);
  }

  function handleBack() {
    setActiveQuestion(null);
  }

  function handleModeChange(nextMode) {
    setMode(nextMode);
    setActiveQuestion(null);
  }

  async function handleAiSubmit(event) {
    event.preventDefault();

    const question = aiQuestion.trim();

    if (!question || aiLoading) {
      return;
    }

    setAiQuestion("");
    setAiLoading(true);
    setAiMessages((current) => [...current, { role: "user", text: question }]);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const payload = await response.json();

      setAiMessages((current) => [
        ...current,
        {
          role: "assistant",
          text:
            payload?.answer ||
            "Maaf, AI belum bisa menjawab. Silakan coba lagi.",
        },
      ]);
    } catch {
      setAiMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "Koneksi ke AI sedang bermasalah. Silakan coba lagi.",
        },
      ]);
    } finally {
      setAiLoading(false);
    }
  }

  function handlePointerDown(event) {
    if (event.button !== 0) {
      return;
    }

    const currentPosition = position ?? getDefaultPosition();

    if (!currentPosition) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);

    dragRef.current = {
      moved: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: currentPosition.x,
      y: currentPosition.y,
    };
  }

  function handlePointerMove(event) {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (Math.abs(deltaX) + Math.abs(deltaY) > 4) {
      drag.moved = true;
    }

    setPosition(
      clampPosition({
        x: drag.x + deltaX,
        y: drag.y + deltaY,
      }),
    );
  }

  function handlePointerUp(event) {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    const nextPosition = clampPosition({
      x: drag.x + deltaX,
      y: drag.y + deltaY,
    });

    setDragging(false);
    setPosition(nextPosition);
    dragRef.current = null;
    ignoreClickRef.current = drag.moved;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPosition));
    } catch {
      // Storage can be blocked in private browser contexts.
    }
  }

  function handlePointerCancel() {
    setDragging(false);
    dragRef.current = null;
  }

  const panelAlignClass =
    position && position.x < 410 ? "left-0 right-auto" : "right-0";
  const panelVerticalClass =
    position && position.y < 430 ? "bottom-auto top-[64px]" : "bottom-[64px]";

  return (
    <div
      className={cn(
        "fixed z-[70]",
        position ? "" : "bottom-5 right-4 md:bottom-6 md:right-6",
      )}
      style={position ? { left: position.x, top: position.y } : undefined}
    >
      {open ? (
        <section
          aria-label="FAQ dan AI assistant"
          className={cn(
            "absolute w-[calc(100vw-28px)] max-w-[370px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl shadow-slate-950/18 md:max-w-[390px]",
            panelAlignClass,
            panelVerticalClass,
          )}
        >
          <div className="flex items-start justify-between gap-3 bg-brand px-4 py-3 text-white">
            <div>
              <p className="text-sm font-extrabold">FAQ & AI Assistant</p>
              <p className="mt-1 text-xs text-white/78">Tanya cepat tentang website ini</p>
            </div>
            <button
              type="button"
              aria-label="Tutup FAQ"
              onClick={handleToggle}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-white/20 transition hover:bg-white/10"
            >
              <Icon name="X" className="h-4 w-4" />
            </button>
          </div>

          <div className="border-b border-slate-200 bg-white p-1.5">
            <div className="grid grid-cols-2 gap-2 rounded-md bg-slate-100 p-1">
              {[
                ["faq", "FAQ"],
                ["ai", "Tanya AI"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleModeChange(value)}
                  className={cn(
                    "min-h-9 rounded-md text-sm font-extrabold transition",
                    mode === value
                      ? "bg-brand text-white shadow-sm"
                      : "text-slate-600 hover:bg-white",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-[min(430px,calc(100vh-135px))] overflow-y-auto bg-slate-50 p-3">
            {mode === "faq" ? (
              <>
                <div className="rounded-md bg-white p-3 text-sm leading-6 text-slate-700 shadow-sm">
                  Halo, silakan pilih pertanyaan yang ingin diketahui.
                </div>

                {activeQuestion ? (
                  <div className="mt-4 grid gap-3">
                    <div className="ml-auto max-w-[90%] rounded-md bg-brand px-3 py-2.5 text-sm font-bold leading-6 text-white">
                      {activeQuestion.question}
                    </div>
                    <div className="max-w-[94%] rounded-md bg-white px-3 py-2.5 text-sm leading-6 text-slate-700 shadow-sm">
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
                        className="flex min-h-11 items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-3 py-2.5 text-left text-sm font-bold leading-5 text-brand shadow-sm transition hover:border-brand hover:bg-blue-50"
                      >
                        <span>{item.question}</span>
                        <Icon name="ChevronRight" className="h-4 w-4 shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="grid gap-3">
                <div className="grid max-h-[260px] gap-2.5 overflow-y-auto pr-1">
                  {aiMessages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={cn(
                        "max-w-[92%] whitespace-pre-line rounded-md px-3 py-2.5 text-sm leading-6 shadow-sm",
                        message.role === "user"
                          ? "ml-auto bg-brand font-bold text-white"
                          : "bg-white text-slate-700",
                      )}
                    >
                      {message.text}
                    </div>
                  ))}
                  {aiLoading ? (
                    <div className="max-w-[92%] rounded-md bg-white px-3 py-2.5 text-sm font-bold text-slate-600 shadow-sm">
                      AI sedang menjawab...
                    </div>
                  ) : null}
                </div>

                <form onSubmit={handleAiSubmit} className="grid gap-2 border-t border-slate-200 pt-3">
                  <textarea
                    value={aiQuestion}
                    onChange={(event) => setAiQuestion(event.target.value)}
                    placeholder="Tulis pertanyaan untuk AI..."
                    className="min-h-16 resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-blue-100"
                    maxLength={800}
                  />
                  <button
                    type="submit"
                    disabled={aiLoading || !aiQuestion.trim()}
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-extrabold text-white transition hover:bg-[#b77f2a] disabled:cursor-not-allowed disabled:opacity-55"
                  >
                    <Icon name="Send" className="h-4 w-4" />
                    Kirim ke AI
                  </button>
                </form>
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
        onPointerCancel={handlePointerCancel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={cn(
          "relative grid h-[46px] w-[46px] touch-none place-items-center rounded-full bg-brand text-white shadow-xl shadow-slate-950/25 transition hover:bg-brand-strong md:h-12 md:w-12",
          open && "bg-accent hover:bg-[#b77f2a]",
          dragging && "cursor-grabbing scale-95",
          !dragging && "cursor-grab",
        )}
      >
        <Icon name={open ? "X" : "MessageCircle"} className="pointer-events-none h-[21px] w-[21px] md:h-[22px] md:w-[22px]" />
        {!open ? (
          <span className="pointer-events-none absolute -right-0.5 -top-0.5 grid h-[18px] w-[18px] place-items-center rounded-full border-2 border-white bg-accent text-[10px] font-extrabold md:h-5 md:w-5">
            ?
          </span>
        ) : null}
      </button>
    </div>
  );
}
