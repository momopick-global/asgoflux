import Image from "next/image";
import { AutoScroll } from "./components/AutoScroll";
import { Header } from "./components/Header";
import { HeroVideoLayer } from "./components/HeroVideoLayer";
import { InquiryForm } from "./components/InquiryForm";
import { Footer } from "./components/Footer";
import { TypingText } from "./components/TypingText";

const CONTENT_PADDING = "px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16";
const CONTENT_MAX = "w-full";

const WORK_IMAGES = [
  "/images/work_brand_01.png",
  "/images/work_brand_02.png",
  "/images/work_brand_03.png",
  "/images/work_brand_04.png",
];

export default function Home() {
  return (
    <>
      <AutoScroll />
      <HeroVideoLayer />
      <Header />
      <main id="top" className="relative z-10 w-full pt-14 md:pt-16 text-black">
        {/* Hero */}
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pb-12 pt-0 text-left">
          <div className={`relative z-10 ${CONTENT_MAX} ${CONTENT_PADDING} w-full`}>
            <h1
              className="mt-12 w-full font-medium leading-[0.85] text-black mb-16 text-left"
              style={{ fontSize: "clamp(3.5rem, 20vw, 12rem)", letterSpacing: "-0.04em" }}
            >
              <TypingText
                text="Designing structure and flow that drive decisions."
                speedMs={70}
                startDelayMs={350}
                cursorChar="|"
                cursorScaleX={0.5}
                className="whitespace-pre-wrap"
              />
            </h1>
            <p className="mt-4 w-full text-sm uppercase tracking-[0.35em] text-black/70 md:text-base">
            화려함보다 구조, 감성보다 흐름. 선택을 만드는 디자인을 만듭니다.
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-black/50">keep scrolling</p>
          </div>
        </section>

        {/* About */}
        <section id="about" className="w-full border-t border-black/10 pt-8 pb-16">
          <div className={`${CONTENT_MAX} ${CONTENT_PADDING} max-w-full min-[1920px]:max-w-[60vw]`}>
            <p className="text-xs uppercase tracking-[0.25em] text-black/60">about</p>
            <p className="mt-8 break-words text-2xl leading-normal text-black">
            ASOGFLUX는 브랜딩과 디지털 경험을 설계하는 비주얼 디자인 스튜디오입니다.
우리는 로고, 웹, UI/UX를 단순히 ‘보기 좋게’ 만드는 데서 멈추지 않습니다. 브랜드가 사람을 만나고 이해되고 선택되기까지의 과정. 경험의 흐름(Flow)을 디자인합니다.

프로젝트는 감각보다 구조에서 시작합니다.
            </p>
            <p className="mt-8 break-words text-2xl leading-normal text-black">
            목표와 문제를 정리하고, 콘텐츠의 우선순위를 잡고, 화면의 리듬과 전환을 설계합니다. 그 위에 브랜드의 톤과 디테일을 얹어, 한 장면으로 끝나지 않는 재사용 가능한 시스템을 만듭니다. 디자인 시스템, UI 키트, 콘텐츠 템플릿 같은 운영 기반의 산출물로 일관성과 확장성을 확보합니다.
            </p>
            <p className="mt-8 break-words text-2xl leading-normal text-black">
ASOGFLUX는 빠르게 이해되고, 자연스럽게 이동하며, 망설임 없이 선택하게 작동하는 경험을 목표로 합니다. 결과물은 아름답고, 과정은 명확해야 한다고 믿습니다.
            </p>

          </div>
        </section>

        {/* Our vision */}
        <section id="studio" className="flex w-full justify-end border-t border-black/10 py-20">
          <div className={`${CONTENT_MAX} ${CONTENT_PADDING} w-full max-w-full min-[1920px]:max-w-[60vw] text-left`}>
            <p className="text-xs uppercase tracking-[0.25em] text-black/60">our vision</p>
            <p className="mt-6 text-2xl leading-normal text-black">
            우리가 만드는 것은 단순한 화면이 아니라, 브랜드가 스스로 성장할 수 있는 기준과 규칙입니다.
            디자인 시스템과 템플릿, 명확한 협업 과정, 모션 기반 표현을 통해 브랜드가 더 빠르게 전달되고 더 오래 기억되도록 돕습니다.            </p>
          </div>
        </section>

        {/* Meet the work */}
        <section id="work" className="w-full border-t border-black/10 py-20">
          <div className={`${CONTENT_MAX} ${CONTENT_PADDING}`}>
            <h2
              className="font-medium leading-[0.8] tracking-tight text-black"
              style={{ fontSize: "clamp(2.25rem, 20vw, 12em)" }}
            >
              Selected projects <br/>shaping brands and <br/>digital experiences.
            </h2>
            <div className="mt-8 flex w-full items-end justify-between gap-4">
              <h3 className="text-xl font-medium tracking-tight md:text-2xl">WORK</h3>
              {/* <Link href="/artists" className="text-sm uppercase tracking-wider text-black/70 hover:text-black">
                view all
              </Link> */}
            </div>
            <div className="mt-12 grid w-full grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {WORK_IMAGES.map((src, i) => (
                <article key={src} className="group w-full">
                  <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-200">
                    <Image
                      src={src}
                      alt={`Work project ${i + 1}`}
                      width={400}
                      height={533}
                      className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
          {/*service*/}
          <section id="service" className="flex w-full justify-end border-t border-black/10 py-20">
          <div className={`${CONTENT_MAX} ${CONTENT_PADDING} w-full max-w-full text-right min-[1920px]:max-w-[60vw]`}>
          <p
              className="mt-8 text-left font-medium leading-[0.8] tracking-tight text-black"
              style={{ fontSize: "clamp(2.25rem, 20vw, 12rem)" }}
            >Designing brands and digital experiences.
              
            </p>
            <p className="mt-8 text-left text-xl font-medium tracking-tight text-black md:text-2xl">SERVICE</p>
            <p className="mt-8 text-left text-2xl leading-normal text-black">
            Brand Design, DIGITAL EXPERIENCE, DESIGN SYSTEM, CONTENT & VISUAL

ASOGFLUX는 빠르게 이해되고, 자연스럽게 이동하며, 망설임 없이 선택하게 작동하는 경험을 목표로 합니다. 결과물은 아름답고, 과정은 명확해야 한다고 믿습니다.
            </p>
          </div>
        </section>

        {/* let's talk*/}
        <section id="lets-talk" className="w-full border-t border-black/10 py-6">
          <div className={`${CONTENT_MAX} ${CONTENT_PADDING} max-w-full lg:max-w-[60vw]`}>
          <p
              className="mt-0 text-left font-medium leading-[0.8] tracking-tight text-black"
              style={{ fontSize: "clamp(2.25rem, 20vw, 12rem)" }}
            >Let's Talk
              
            </p>
            <p className="mt-2 text-xl font-medium tracking-tight text-black md:text-2xl">프로젝트에 대해 알려주시면 빠르게 연락드리겠습니다.</p>
            <div className="mt-2 flex w-full flex-col gap-12">
              {/* <div>
                <p className="text-sm font-medium uppercase tracking-wider text-black/70">AsogFLUX</p>
                <p className="mt-4 text-xl font-medium tracking-tight text-black md:text-2xl">
                  서울시 마포구 성산동
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=서울시+마포구+성산동"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm uppercase tracking-wider text-black/80 hover:text-black"
                >
                  Show on Google Map
                </a>
              </div> */}
            </div>
            <div className="mt-6 pt-4">
              <InquiryForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
