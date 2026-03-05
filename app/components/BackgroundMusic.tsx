"use client";

import { useEffect, useRef } from "react";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const play = () => {
      audio.volume = 0.5;
      audio.play().catch(() => {
        // 자동재생이 막힌 경우 (브라우저 정책) 무시
      });
    };

    play();
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/audio/bg-music.mp3"
      loop
      autoPlay
      playsInline
      aria-label="Background music"
    />
  );
}
