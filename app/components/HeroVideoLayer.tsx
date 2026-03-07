"use client";

import { useEffect, useState } from "react";

/** 스크롤 구간(뷰포트 높이 비율) 안에서 동영상이 서서히 사라짐 */
const FADE_START = 0.1;  // 이 구간부터 페이드 시작
const FADE_END = 1.5;    // 이 구간에서 완전히 사라짐 (스크롤 거리 길게 = 더 천천히)

const BG_VIDEOS = [
  "/videos/bg1.mp4",
  "/videos/bg2.mp4",
  "/videos/bg3.mp4",
  "/videos/bg4.mp4",
];

export function HeroVideoLayer() {
  const [videoSrc, setVideoSrc] = useState(BG_VIDEOS[0]);

  useEffect(() => {
    setVideoSrc(BG_VIDEOS[Math.floor(Math.random() * BG_VIDEOS.length)]);
  }, []);

  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      const start = h * FADE_START;
      const end = h * FADE_END;
      if (y <= start) setOpacity(1);
      else if (y >= end) setOpacity(0);
      else setOpacity(1 - (y - start) / (end - start));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 transition-opacity duration-700"
      style={{ opacity }}
      aria-hidden
    >
      <video
        autoPlay
        muted
        playsInline
        loop
        className="h-full w-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}
