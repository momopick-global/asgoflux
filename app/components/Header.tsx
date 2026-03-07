"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "../lib/basePath";

const NAV = [
  { href: "/#work", label: "WORK" },
  { href: "/#service", label: "SERVICE" },
  { href: "/#lets-talk", label: "LET'S TALK" },
];

const SCROLL_THRESHOLD = 60;
const HEADER_HIDE_SCROLL_THRESHOLD = 50; // 이만큼 스크롤 내리면 헤더 숨김
const TOP_BUTTON_IDLE_MS = 2500; // 마우스 멈춘 뒤 이 시간 지나면 상단 버튼 아래로 숨김
const BG_MUSIC_SRC = asset("/audio/bg-music.mp3");
const FADE_OUT_DURATION = 5; // 끝나기 5초 전부터 서서히 소리 감소
const REPEAT_COUNT = 5; // 배경음악 반복 재생 횟수

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [time, setTime] = useState("09:36 AM");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const unlockedRef = useRef(false);
  const playCountRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const [topButtonVisible, setTopButtonVisible] = useState(true);
  const topButtonHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = () => setTime(new Date().toLocaleTimeString("ko-KR", { timeZone: "Asia/Seoul", hour: "2-digit", minute: "2-digit", hour12: false }));
    t();
    const id = setInterval(t, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const prev = lastScrollYRef.current;
      setScrolled(y > SCROLL_THRESHOLD);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max <= 0 ? 1 : Math.min(1, y / max));
      // 스크롤 내리면 헤더 위로 숨김, 올리거나 상단이면 다시 표시
      if (y > prev && y > HEADER_HIDE_SCROLL_THRESHOLD) {
        setHeaderVisible(false);
      } else if (y < prev || y <= HEADER_HIDE_SCROLL_THRESHOLD) {
        setHeaderVisible(true);
      }
      lastScrollYRef.current = y;
    };
    onScroll();
    lastScrollYRef.current = window.scrollY;
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
      playCountRef.current = 0;
      audio.currentTime = 0;
      audio.play().catch(() => setSoundOn(false));
    } else {
      audio.pause();
    }
  }, [soundOn]);

  // 5번 재생 후 끝나면 sound off, 그 전에는 반복 재생
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => {
      playCountRef.current += 1;
      if (playCountRef.current < REPEAT_COUNT) {
        audio.currentTime = 0;
        audio.play().catch(() => setSoundOn(false));
      } else {
        setSoundOn(false);
      }
    };
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

  // 모바일 메뉴 열림: 배경 페이드 인, 닫힘: 페이드 아웃 후 언마운트
  useEffect(() => {
    if (menuOpen) {
      const id = requestAnimationFrame(() => setMenuVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setMenuVisible(false);
  }, [menuOpen]);

  // 메뉴 열렸을 때 body 스크롤 잠금
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [menuOpen]);

  const openMenu = () => setMenuOpen(true);

  const closeMenu = () => {
    setMenuVisible(false);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => setMenuOpen(false), 320);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // 마우스 움직임 없으면 상단 버튼 아래로 숨김, 움직이면 다시 표시
  useEffect(() => {
    const show = () => {
      setTopButtonVisible(true);
      if (topButtonHideTimerRef.current) {
        clearTimeout(topButtonHideTimerRef.current);
        topButtonHideTimerRef.current = null;
      }
      topButtonHideTimerRef.current = setTimeout(() => setTopButtonVisible(false), TOP_BUTTON_IDLE_MS);
    };
    show();
    window.addEventListener("mousemove", show);
    window.addEventListener("scroll", show, { passive: true });
    window.addEventListener("click", show);
    return () => {
      window.removeEventListener("mousemove", show);
      window.removeEventListener("scroll", show);
      window.removeEventListener("click", show);
      if (topButtonHideTimerRef.current) clearTimeout(topButtonHideTimerRef.current);
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
          transition: "transform 0.35s ease-out, background-color 0.2s, border-color 0.2s",
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
              onClick={openMenu}
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

      {/* 상단으로 바로 가기: 오른쪽 하단 동그라미 + 위쪽 화살표. 마우스 멈추면 아래로 숨김 */}
      <button
        type="button"
        onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-black/20 bg-white text-black transition-transform duration-700 ease-in-out hover:border-black hover:bg-black hover:text-white md:bottom-8 md:right-8 md:h-14 md:w-14"
        style={{
          transform: topButtonVisible ? "translateY(0)" : "translateY(calc(100% + 2rem))",
          pointerEvents: topButtonVisible ? "auto" : "none",
        }}
        aria-label="상단으로 이동"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>

      {menuOpen && (
        <div
          className={`fixed inset-0 z-[60] w-full overflow-y-auto bg-[#fafaf9] transition-transform duration-300 ease-out ${menuVisible ? "translate-x-0" : "translate-x-full"}`}
          aria-hidden={!menuVisible}
        >
          <div className="flex min-h-screen w-full flex-col">
            {/* 헤더와 동일한 높이·패딩으로 상단 바 정렬 (모바일에서 AsogFLUX 위치 일치) */}
            <div className="sticky top-0 flex h-14 w-full shrink-0 items-center justify-between bg-[#fafaf9] px-4 sm:px-6 md:h-16 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
              <span className="text-sm font-medium tracking-wide text-black md:text-base">AsogFLUX</span>
              <button
                type="button"
                onClick={closeMenu}
                className="flex h-9 w-9 items-center justify-center border border-black/20 text-black transition-colors hover:bg-black hover:text-white md:h-10 md:w-10"
                aria-label="Close menu"
              >
                <span className="sr-only">close</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 flex-col px-4 pb-16 pt-10 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
              {/* 상단 메뉴: 중앙 정렬 제거하고 위로 올림 */}
              <nav className="flex flex-col gap-6">
                <a href="/" onClick={closeMenu} className="text-2xl font-medium tracking-tight text-black transition-opacity hover:opacity-70 md:text-3xl">
                  HOME
                </a>
                {NAV.map(({ href, label }) => (
                  <a key={href} href={href} onClick={closeMenu} className="text-2xl font-medium tracking-tight text-black transition-opacity hover:opacity-70 md:text-3xl">
                    {label}
                  </a>
                ))}
              </nav>

              {/* 푸터: 메뉴 열기 전 Footer와 동일한 콘텐츠 */}
              <div className="mt-14 w-full border-t border-black/10 pt-12">
                <div className="grid w-full gap-12 md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-black/60">follow</p>
                    <div className="mt-4 flex gap-6 text-sm text-black/80">
                      <a href="https://instagram.com/asogflux" target="_blank" rel="noopener noreferrer">instagram</a>
                    </div>
                    <p className="mt-8 text-sm text-black/60">©2024 AsogFLUX</p>
                    <p className="text-sm text-black/60">ALL RIGHTS RESERVED</p>
                    <div className="mt-4 flex gap-6 text-xs text-black/50">
                      <a href="/privacy-policy" onClick={closeMenu}>privacy policy</a>
                      <a href="/terms" onClick={closeMenu}>terms of use</a>
                    </div>
                    <a href="#top" onClick={closeMenu} className="mt-6 inline-block text-xs uppercase tracking-wider text-black/60 hover:text-black">
                      back to top
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-black/60">service</p>
                    <div className="mt-4 flex flex-col gap-1 text-sm text-black/80">
                      <a href="/#service" onClick={closeMenu}>Brand Design</a>
                      <a href="/#service" onClick={closeMenu}>Digital Experience</a>
                      <a href="/#service" onClick={closeMenu}>Design System</a>
                      <a href="/#service" onClick={closeMenu}>Content &amp; Visual</a>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-black/60">AsogFLUX</p>
                    <p className="mt-6 text-xs uppercase tracking-[0.2em] text-black/60">contact</p>
                    <a href="mailto:momopick.global@gmail.com" className="mt-2 block text-sm text-black/80">momopick.global@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
