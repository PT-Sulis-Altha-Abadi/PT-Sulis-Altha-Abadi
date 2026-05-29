"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DESIGN_HEIGHT = 880;

export default function AdminViewportFit({ children }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [fit, setFit] = useState({ scale: 1, enabled: false });

  useLayoutEffect(() => {
    if (typeof window === "undefined") return undefined;

    let frameId = 0;
    const timers = [];
    let resizeObserver = null;

    function calculate() {
      const container = containerRef.current;
      const content = contentRef.current;
      if (!container || !content) return;

      const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
      if (viewportWidth < 1024) {
        setFit((prev) => (prev.enabled ? { scale: 1, enabled: false } : prev));
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const availableHeight = Math.max(window.innerHeight - containerRect.top - 4, 200);

      const previousTransform = content.style.transform;
      const previousWidth = content.style.width;
      content.style.transform = "none";
      content.style.width = "100%";
      // force reflow
      void content.offsetHeight;

      const naturalHeight = Math.max(content.scrollHeight, DESIGN_HEIGHT);
      const naturalWidth = Math.max(content.scrollWidth, 1);

      content.style.transform = previousTransform;
      content.style.width = previousWidth;

      const heightScale = availableHeight / naturalHeight;
      const widthScale = containerRect.width / naturalWidth;
      const scale = Math.min(1, heightScale, widthScale);
      const enabled = scale < 0.999;

      setFit((prev) => {
        if (Math.abs(prev.scale - scale) < 0.002 && prev.enabled === enabled) {
          return prev;
        }
        return { scale, enabled };
      });
    }

    function schedule() {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const next = window.requestAnimationFrame(calculate);
        frameId = next;
      });
    }

    schedule();
    timers.push(window.setTimeout(schedule, 120));
    timers.push(window.setTimeout(schedule, 350));
    timers.push(window.setTimeout(schedule, 800));

    if (typeof ResizeObserver !== "undefined" && contentRef.current) {
      resizeObserver = new ResizeObserver(() => schedule());
      resizeObserver.observe(contentRef.current);
    }

    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);

    return () => {
      window.cancelAnimationFrame(frameId);
      timers.forEach((id) => window.clearTimeout(id));
      resizeObserver?.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    document.documentElement.classList.toggle("admin-fit-active", fit.enabled);
    return () => {
      document.documentElement.classList.remove("admin-fit-active");
    };
  }, [fit.enabled]);

  return (
    <div
      ref={containerRef}
      className={cn("admin-viewport-fit", fit.enabled && "is-fitted")}
      style={{
        "--admin-fit-scale": fit.scale,
        "--admin-fit-width": fit.scale < 1 ? `${100 / fit.scale}%` : "100%",
      }}
    >
      <div ref={contentRef} className="admin-viewport-fit__content">
        {children}
      </div>
    </div>
  );
}
