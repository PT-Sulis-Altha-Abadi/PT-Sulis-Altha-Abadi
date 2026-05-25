"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const defaultFit = {
  enabled: false,
  scale: 1,
  inverseScale: 1,
  width: "100%",
  headerHeight: 0,
};

const DESKTOP_DESIGN_HEIGHT = 760;

function isDesktopViewport() {
  const viewportWidth = document.documentElement.clientWidth || window.innerWidth;

  return viewportWidth >= 1280;
}

function measureNaturalSize(content) {
  const previousWidth = content.style.width;
  const previousTransform = content.style.transform;

  content.style.width = "100%";
  content.style.transform = "none";

  // Force reflow so measurement uses natural layout, not the scaled state.
  void content.offsetHeight;

  const size = {
    height: Math.max(content.scrollHeight, 1),
    width: Math.max(content.scrollWidth, 1),
  };

  content.style.width = previousWidth;
  content.style.transform = previousTransform;

  return size;
}

function calculateFit(content) {
  if (typeof window === "undefined" || !content || !isDesktopViewport()) {
    return defaultFit;
  }

  const headerHeight =
    document.querySelector("[data-site-header]")?.offsetHeight ?? 0;
  const viewportHeight = window.innerHeight - headerHeight;
  const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
  const { height, width } = measureNaturalSize(content);
  const referenceHeight = Math.max(height, DESKTOP_DESIGN_HEIGHT);
  const heightScale = viewportHeight / referenceHeight;
  const widthScale = viewportWidth / width;
  const scale = Math.min(1, heightScale, widthScale);

  return {
    enabled: true,
    scale,
    inverseScale: scale > 0 ? 1 / scale : 1,
    width: scale < 1 ? `${100 / scale}%` : "100%",
    headerHeight,
  };
}

export default function PublicViewportFit({ children }) {
  const pathname = usePathname();
  const contentRef = useRef(null);
  const [fit, setFit] = useState(defaultFit);
  const isAdmin = pathname.startsWith("/admin");

  // Reset to default on every route change so the previous page's scale doesn't bleed in.
  useLayoutEffect(() => {
    if (isAdmin) {
      return;
    }
    setFit(defaultFit);
  }, [isAdmin, pathname]);

  useLayoutEffect(() => {
    if (isAdmin) {
      return undefined;
    }

    let frameIds = [];
    const timers = [];
    const cleanupImageListeners = [];
    let resizeObserver = null;

    function updateFit() {
      const nextFit = calculateFit(contentRef.current);

      setFit((current) => {
        const sameEnabled = current.enabled === nextFit.enabled;
        const sameScale = Math.abs(current.scale - nextFit.scale) < 0.001;
        const sameInverseScale =
          Math.abs(current.inverseScale - nextFit.inverseScale) < 0.001;
        const sameWidth = current.width === nextFit.width;
        const sameHeaderHeight = current.headerHeight === nextFit.headerHeight;

        return sameEnabled && sameScale && sameInverseScale && sameWidth && sameHeaderHeight
          ? current
          : nextFit;
      });
    }

    function scheduleFit() {
      // Double rAF: wait one frame for React commit, another for browser layout.
      frameIds.forEach((id) => window.cancelAnimationFrame(id));
      frameIds = [];

      const firstFrame = window.requestAnimationFrame(() => {
        const secondFrame = window.requestAnimationFrame(updateFit);
        frameIds.push(secondFrame);
      });
      frameIds.push(firstFrame);
    }

    function watchImages() {
      cleanupImageListeners.splice(0).forEach((cleanup) => cleanup());

      const images = contentRef.current?.querySelectorAll("img") ?? [];

      images.forEach((image) => {
        if (image.complete) {
          return;
        }

        const listener = () => scheduleFit();

        image.addEventListener("load", listener, { once: true });
        image.addEventListener("error", listener, { once: true });
        cleanupImageListeners.push(() => {
          image.removeEventListener("load", listener);
          image.removeEventListener("error", listener);
        });
      });
    }

    window.addEventListener("resize", scheduleFit);
    window.addEventListener("orientationchange", scheduleFit);
    window.visualViewport?.addEventListener("resize", scheduleFit);

    // Observe content size changes (e.g. when images finish loading and increase height).
    if (typeof ResizeObserver !== "undefined" && contentRef.current) {
      resizeObserver = new ResizeObserver(() => scheduleFit());
      resizeObserver.observe(contentRef.current);
    }

    watchImages();

    // Schedule a few recalcs at increasing intervals so we catch images, fonts,
    // and other late layout shifts. Each schedule uses double-rAF for safety.
    scheduleFit();
    timers.push(window.setTimeout(scheduleFit, 80));
    timers.push(window.setTimeout(scheduleFit, 250));
    timers.push(window.setTimeout(scheduleFit, 600));
    timers.push(window.setTimeout(scheduleFit, 1200));
    timers.push(window.setTimeout(scheduleFit, 2000));

    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleFit).catch(() => undefined);
    }

    return () => {
      frameIds.forEach((id) => window.cancelAnimationFrame(id));
      timers.forEach((timer) => window.clearTimeout(timer));
      cleanupImageListeners.splice(0).forEach((cleanup) => cleanup());
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleFit);
      window.removeEventListener("orientationchange", scheduleFit);
      window.visualViewport?.removeEventListener("resize", scheduleFit);
    };
  }, [isAdmin, pathname]);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("public-fit-active", !isAdmin && fit.enabled);

    return () => {
      root.classList.remove("public-fit-active");
    };
  }, [fit.enabled, isAdmin]);

  if (isAdmin) {
    return children;
  }

  return (
    <div
      className={cn(
        "public-viewport-fit",
        fit.enabled && "is-fitted",
      )}
      style={{
        "--public-fit-scale": fit.scale,
        "--public-fit-inverse": fit.inverseScale,
        "--public-fit-width": fit.width,
        "--public-fit-header": `${fit.headerHeight}px`,
      }}
    >
      <div ref={contentRef} className="public-viewport-fit__content">
        {children}
      </div>
    </div>
  );
}
