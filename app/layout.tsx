import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "./components/SmoothScroll";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asogflux.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AsogFLUX | 브랜드·디지털 경험 디자인 스튜디오",
    template: "%s | AsogFLUX",
  },
  description:
    "ASOGFLUX는 브랜딩과 디지털 경험을 설계하는 비주얼 디자인 스튜디오입니다. 브랜드 디자인, UI/UX, 디자인 시스템, 콘텐츠 비주얼.",
  keywords: [
    "브랜드 디자인",
    "디지털 경험",
    "UI/UX",
    "디자인 시스템",
    "비주얼 디자인",
    "ASOGFLUX",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "AsogFLUX",
    title: "AsogFLUX | 브랜드·디지털 경험 디자인 스튜디오",
    description:
      "ASOGFLUX는 브랜딩과 디지털 경험을 설계하는 비주얼 디자인 스튜디오입니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AsogFLUX | 브랜드·디지털 경험 디자인 스튜디오",
    description: "브랜딩과 디지털 경험을 설계하는 비주얼 디자인 스튜디오.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[#fafaf9] text-neutral-900 antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
