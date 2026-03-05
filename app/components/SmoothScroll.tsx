"use client";

import { ReactLenis } from "lenis/react";

/* 멈출 때 감속이 눈에 띄게 — 짧은 duration + 강한 ease-out */
const options = {
  duration: 0.85,
  easing: (t: number) => 1 - Math.pow(2, -10 * t), /* ease-out-expo: 끝에서 확 꺾이는 느낌 */
  smoothWheel: true,
  autoRaf: true,
};

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
