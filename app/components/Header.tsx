"use client";

import { useEffect, useRef, useState } from "react";

const NAV = [
  { href: "/#work", label: "WORK" },
  { href: "/#service", label: "SERVICE" },
  { href: "/#lets-talk", label: "let's talk" },
];

const SCROLL_THRESHOLD = 60;
const IDLE_HIDE_MS = 2000;
const BG_MUSIC_SRC = "/audio/bg-music.mp3";
const FADE_OUT_DURATION = 5; // 끝나기 5초 전부터 서서히 소리 감소

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [time, setTime] = useState("09:36 AM");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const unlockedRef = useRef(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = () => setTime(new Date().toLocaleTimeString("ko-KR", { timeZone: "Asia/Seoul", hour: "2-digit", minute: "2-digit", hour12: false }));
    t();
    const id = setInterval(t, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > SCROLL_THRESHOLD);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max <= 0 ? 1 : Math.min(1, y / max));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 새로고침 후 첫 클릭·마우스 이동·스크롤 시 음악 재생 (브라우저 정책 대응)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || unlockedRef.current) return;

    const unlock = () => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;
      audio.volume = 0.5;
      audio.play().then(() => setSoundOn(true)).catch(() => {});
      window.removeEventListener("click", unlock);
      window.removeEventListener("mousemove", unlock);
      window.removeEventListener("scroll", unlock, true);
      document.removeEventListener("click", unlock);
      document.removeEventListener("mousemove", unlock);
    };

    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("mousemove", unlock, { once: true });
    window.addEventListener("scroll", unlock, { once: true, capture: true });
    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("mousemove", unlock);
      window.removeEventListener("scroll", unlock, true);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (soundOn) {
      audio.play().catch(() => setSoundOn(false));
    } else {
      audio.pause();
    }
  }, [soundOn]);

  // 재생이 끝나면 헤더에 sound off 표시
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => setSoundOn(false);
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, []);

  // 재생 끝나기 직전에 볼륨 서서히 감소 (페이드 아웃)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      const d = audio.duration;
      if (!Number.isFinite(d)) return;
      const t = audio.currentTime;
      const remaining = d - t;
      if (remaining <= FADE_OUT_DURATION && remaining > 0) {
        audio.volume = 0.5 * (remaining / FADE_OUT_DURATION);
      } else if (remaining > FADE_OUT_DURATION) {
        audio.volume = 0.5;
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => audio.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  // 2초 동안 마우스·클릭·스크롤 없으면 헤더 숨김, 있으면 다시 표시
  useEffect(() => {
    const show = () => {
      setHeaderVisible(true);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      hideTimerRef.current = setTimeout(() => setHeaderVisible(false), IDLE_HIDE_MS);
    };

    show();

    window.addEventListener("mousemove", show);
    window.addEventListener("click", show);
    window.addEventListener("scroll", show, { passive: true });

    return () => {
      window.removeEventListener("mousemove", show);
      window.removeEventListener("click", show);
      window.removeEventListener("scroll", show);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src={BG_MUSIC_SRC} playsInline className="hidden" aria-hidden />
      <header
        className={`fixed left-0 right-0 top-0 z-50 w-full ${
          scrolled ? "bg-white" : "border-b border-transparent bg-transparent"
        }`}
        style={{
          transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
          transition: headerVisible
            ? "transform 0.3s ease-out, background-color 0.2s, border-color 0.2s"
            : "transform 2.5s ease-out, background-color 0.2s, border-color 0.2s",
        }}
      >
        <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6 md:h-16 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="flex items-center gap-3 md:gap-4">
            <a href="/" className="text-sm font-medium tracking-wide text-black md:text-base">
              AsogFLUX
            </a>
            <span className="hidden text-sm text-black/60 md:inline">{time} · KST</span>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <nav className="hidden items-center gap-6 md:flex">
              {NAV.map(({ href, label }) => (
                <a key={href} href={href} className="text-sm uppercase tracking-wider text-black/80 hover:text-black">
                  {label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => setSoundOn(!soundOn)}
              className="hidden items-center gap-1.5 text-xs uppercase tracking-wider text-black/60 md:inline-flex"
            >
              sound : {soundOn ? "on" : "off"}
              {soundOn && (
                <span className="flex h-3 items-end gap-0.5" aria-hidden>
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="w-0.5 bg-current"
                      style={{
                        height: 10,
                        transformOrigin: "bottom",
                        animation: "equalizer-bar 0.6s ease-in-out infinite",
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center border border-black/20 md:hidden"
              aria-label="Open menu"
            >
              <span className="text-xs uppercase">menu</span>
            </button>
          </div>
        </div>
        {/* 스크롤 시 하단 얇은 회색선 위에 무지개 진행바 (맨 아래에서 100% 채워짐) */}
        {scrolled && (
          <div className="h-0.5 w-full bg-neutral-200">
            <div
              className="h-full transition-[width] duration-150 ease-out"
              style={{
                width: `${scrollProgress * 100}%`,
                background: "#000000",
              }}
            />
          </div>
        )}
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] w-full bg-[#fafaf9]">
          <div className="flex min-h-screen w-full flex-col px-4 py-8 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <div className="flex w-full items-center justify-between">
              <span className="text-sm uppercase tracking-wider text-black/60">AsogFLUX</span>
              <button type="button" onClick={() => setMenuOpen(false)} className="text-sm uppercase tracking-wider text-black">
                close
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-6 py-12">
              <a href="/" onClick={() => setMenuOpen(false)} className="text-3xl font-medium tracking-tight text-black md:text-4xl">
                home
              </a>
              {NAV.map(({ href, label }) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-3xl font-medium tracking-tight text-black md:text-4xl">
                  {label}
                </a>
              ))}
              <div className="mt-8 space-y-2 text-sm uppercase tracking-wider text-black/70">
                <p>follow</p>
                <a href="https://instagram.com/monolithstudio" target="_blank" rel="noopener noreferrer">instagram</a>
                <a href="https://www.youtube.com/@monolithstudionyc" target="_blank" rel="noopener noreferrer">youtube</a>
                <a href="https://www.tiktok.com/@monolithstudio" target="_blank" rel="noopener noreferrer">tiktok</a>
              </div>
              <p className="mt-4 text-sm text-black/60">reach out</p>
              <a href="mailto:hello@monolithstudio.com" className="text-sm text-black/80">hello@monolithstudio.com</a>
              <p className="text-sm text-black/60">77 Washington Avenue, Brooklyn, NYC, USA, 11205</p>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
