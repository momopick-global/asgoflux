"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "../lib/basePath";

/** 스크롤 구간(뷰포트 높이 비율) 안에서 동영상이 서서히 사라짐 */
const FADE_START = 0.1;  // 이 구간부터 페이드 시작
const FADE_END = 1.5;    // 이 구간에서 완전히 사라짐 (스크롤 거리 길게 = 더 천천히)

const BG_VIDEOS = [
  asset("/videos/bg1.mp4"),
  asset("/videos/bg2.mp4"),
  asset("/videos/bg3.mp4"),
  asset("/videos/bg4.mp4"),
];

export function HeroVideoLayer() {
  const [videoSrc, setVideoSrc] = useState(BG_VIDEOS[0]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tapToPlay, setTapToPlay] = useState(false); // iOS 등에서 자동재생 막혔을 때 true

  useEffect(() => {
    setVideoSrc(BG_VIDEOS[Math.floor(Math.random() * BG_VIDEOS.length)]);
  }, []);

  // iOS Safari는 사용자 제스처 없이 자동재생을 막음 → 재생 실패 시 탭 오버레이 표시
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const attemptPlay = () => {
      video.muted = true;
      const p = video.play();
      if (p && typeof p.then === "function") {
        p.catch(() => setTapToPlay(true));
      }
    };
    video.addEventListener("loadeddata", attemptPlay, { once: true });
    attemptPlay();
  }, [videoSrc]);

  const onTapOverlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().then(() => setTapToPlay(false)).catch(() => {});
  };

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
      className="fixed inset-0 z-0 bg-[#fafaf9] transition-opacity duration-700"
      style={{ opacity }}
      aria-hidden
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop
        className="h-full w-full object-cover"
        style={{ objectFit: "cover" }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {/* iOS 등에서 자동재생이 막혀 검은 화면+재생 버튼이 보일 때: 터치하면 재생 */}
      {tapToPlay && (
        <button
          type="button"
          onClick={onTapOverlay}
          onTouchEnd={onTapOverlay}
          className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-black/30 text-white"
          aria-label="동영상 재생"
        >
          <span className="rounded-full bg-white/20 px-6 py-3 text-sm backdrop-blur-sm">
            화면을 터치하여 재생
          </span>
        </button>
      )}
    </div>
  );
}
