"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const defaultFit = {
  enabled: false,
  scale: 1,
  inverseScale: 1,
  width: "100%",
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

  const viewportHeight = window.innerHeight;
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
  };
}

export default function PublicViewportFit({ children }) {
  const pathname = usePathname();
  const contentRef = useRef(null);
  const [fit, setFit] = useState(defaultFit);
  const isAdmin = pathname.startsWith("/admin");

  useLayoutEffect(() => {
    if (isAdmin) {
      return undefined;
    }

    let frameId = 0;
    const timers = [];
    const cleanupImageListeners = [];

    function updateFit() {
      const nextFit = calculateFit(contentRef.current);

      setFit((current) => {
        const sameEnabled = current.enabled === nextFit.enabled;
        const sameScale = Math.abs(current.scale - nextFit.scale) < 0.001;
        const sameInverseScale =
          Math.abs(current.inverseScale - nextFit.inverseScale) < 0.001;
        const sameWidth = current.width === nextFit.width;

        return sameEnabled && sameScale && sameInverseScale && sameWidth
          ? current
          : nextFit;
      });
    }

    function scheduleFit() {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateFit);
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
    window.addEventListener("load", scheduleFit);
    window.visualViewport?.addEventListener("resize", scheduleFit);

    watchImages();
    timers.push(window.setTimeout(scheduleFit, 0));
    timers.push(window.setTimeout(scheduleFit, 250));
    timers.push(window.setTimeout(scheduleFit, 800));
    timers.push(window.setTimeout(scheduleFit, 1600));

    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleFit).catch(() => undefined);
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      timers.forEach((timer) => window.clearTimeout(timer));
      cleanupImageListeners.splice(0).forEach((cleanup) => cleanup());
      window.removeEventListener("resize", scheduleFit);
      window.removeEventListener("orientationchange", scheduleFit);
      window.removeEventListener("load", scheduleFit);
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
      }}
    >
      <div ref={contentRef} className="public-viewport-fit__content">
        {children}
      </div>
    </div>
  );
}
