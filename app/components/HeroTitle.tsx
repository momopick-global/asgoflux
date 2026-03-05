"use client";

import { useEffect, useRef, useState } from "react";

export function HeroTitle() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState(120);

  useEffect(() => {
    const updateSize = () => {
      const wrapper = wrapperRef.current;
      const textEl = textRef.current;
      if (!wrapper || !textEl) return;

      const wrapperWidth = wrapper.offsetWidth;
      if (wrapperWidth <= 0) return;

      // 가로 양끝까지 채우도록 (약 98% 사용, 살짝 여유)
      const targetWidth = wrapperWidth * 0.98;

      let low = 20;
      let high = 400;
      textEl.style.fontSize = `${high}px`;

      while (low < high - 1) {
        const mid = Math.floor((low + high) / 2);
        textEl.style.fontSize = `${mid}px`;
        if (textEl.scrollWidth <= targetWidth) {
          low = mid;
        } else {
          high = mid;
        }
      }

      textEl.style.fontSize = `${low}px`;
      setFontSize(low);
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);
    window.addEventListener("resize", updateSize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-full overflow-visible text-center"
    >
      <h1
        ref={textRef}
        className="block font-medium leading-[1] tracking-tight text-black whitespace-nowrap text-center"
        style={{ fontSize: `${fontSize}px` }}
      >
        AsogFLUX
      </h1>
    </div>
  );
}
