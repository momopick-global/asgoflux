"use client";

import { useState } from "react";

const VIDEOS = ["/videos/bg.mp4", "/videos/bg2.mp4"];

export function VideoBackground() {
  const [src] = useState(() => VIDEOS[Math.floor(Math.random() * VIDEOS.length)]);

  return (
    <div className="fixed inset-0 -z-10">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
        aria-hidden
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/[0.01]" aria-hidden />
    </div>
  );
}
