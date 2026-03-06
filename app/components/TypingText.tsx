"use client";

import * as React from "react";

type TypingTextProps = {
  text: string;
  /**
   * Milliseconds per character.
   */
  speedMs?: number;
  /**
   * Delay before typing starts (ms).
   */
  startDelayMs?: number;
  /**
   * Show a blinking cursor at the end.
   */
  cursor?: boolean;
  /**
   * Cursor character (e.g. |, ▍, _).
   */
  cursorChar?: string;
  /**
   * Horizontal scale applied to the cursor (1 = normal, 0.5 = half width).
   */
  cursorScaleX?: number;
  className?: string;
};

export function TypingText({
  text,
  speedMs = 28,
  startDelayMs = 200,
  cursor = true,
  cursorChar = "▍",
  cursorScaleX = 1,
  className,
}: TypingTextProps) {
  const [shown, setShown] = React.useState("");
  const [isDone, setIsDone] = React.useState(false);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;
    const onChange = () => setReduceMotion(Boolean(mql.matches));
    onChange();
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  React.useEffect(() => {
    if (reduceMotion) {
      setShown(text);
      setIsDone(true);
      return;
    }

    let cancelled = false;
    let timeoutId: number | undefined;
    let intervalId: number | undefined;

    setShown("");
    setIsDone(false);

    timeoutId = window.setTimeout(() => {
      let i = 0;
      intervalId = window.setInterval(() => {
        if (cancelled) return;
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(intervalId);
          setIsDone(true);
        }
      }, Math.max(10, speedMs));
    }, Math.max(0, startDelayMs));

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [reduceMotion, speedMs, startDelayMs, text]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{shown}</span>
      {cursor ? (
        <span
          aria-hidden="true"
          className={isDone ? "opacity-0" : "inline-block animate-pulse"}
          style={{
            display: "inline-block",
            transform: `scaleX(${cursorScaleX})`,
            transformOrigin: "center",
          }}
        >
          {cursorChar}
        </span>
      ) : null}
    </span>
  );
}

