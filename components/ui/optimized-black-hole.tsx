"use client";

import { useEffect, useRef, useState } from "react";
import type { createRenderer } from "./optimized-black-hole-utils/renderer";

/** Standalone host, adapted from the supplied component with lazy loading and fallback. */
export function Example({ paused = false }: { paused?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<ReturnType<typeof createRenderer> | null>(null);
  const pausedRef = useRef(paused);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => { pausedRef.current=paused; rendererRef.current?.setPaused(paused); }, [paused]);
  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      void import("./optimized-black-hole-utils/renderer").then(({createRenderer}) => {
        if (cancelled) return;
        const renderer = createRenderer({ canvas });
        rendererRef.current=renderer;
        renderer.setPaused(pausedRef.current);
        return renderer.ready.then(() => { if (!cancelled) setIsReady(true); });
      }).catch(() => {
        // Keep the static fallback and all contact/navigation content usable without WebGL.
        rendererRef.current?.dispose(); rendererRef.current=null;
      });
    }, { rootMargin: "200px" });
    observer.observe(canvas);
    return () => { cancelled=true; observer.disconnect(); rendererRef.current?.dispose(); rendererRef.current=null; };
  }, []);
  return (
    <div className="black-hole-host relative h-full w-full overflow-hidden bg-black" aria-hidden="true">
      <div className="black-hole-fallback" />
      <canvas ref={canvasRef} className={`relative block h-full w-full touch-pan-y transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}
export default Example;
