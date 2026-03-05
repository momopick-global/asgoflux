"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

const AUTO_SCROLL_SPEED = 0.35; // px per frame (천천히)

export function AutoScroll() {
  const lenis = useLenis();
  const stoppedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const targetScrollRef = useRef(0);

  useEffect(() => {
    if (!lenis?.scrollTo) return;

    const stop = () => {
      stoppedRef.current = true;
    };

    const onMouseMove = stop;
    const onWheel = stop;
    const onTouchStart = stop;

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });

    targetScrollRef.current = lenis.scroll;

    const tick = () => {
      if (stoppedRef.current) return;
      const limit = lenis.limit;
      if (lenis.scroll >= limit - 2) return;
      targetScrollRef.current = Math.min(targetScrollRef.current + AUTO_SCROLL_SPEED, limit);
      lenis.scrollTo(targetScrollRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      cancelAnimationFrame(rafRef.current);
    };
  }, [lenis]);

  return null;
}
