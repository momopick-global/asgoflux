"use client";

import { useState } from "react";

const TIMELINE_OPTIONS = [
  "3개월 미만",
  "3개월 ~ 6개월",
  "6개월 ~ 9개월",
  "9개월 이상",
];

const BUDGET_OPTIONS = [
  "5천만원 미만",
  "5천만원 ~ 1억",
  "1억 ~ 3억",
  "3억 ~ 5억",
  "5억 이상",
  "미정",
];

const WORK_SCOPE_OPTIONS = [
  "브랜드 경험 디자인",
  "서비스 모델링",
  "서비스 영상 제작",
  "사용자 조사",
  "UX 전략 수립",
  "유저플로우 / 목업 제작",
  "상세 설계",
  "GUI 디자인",
  "웹 UI 개발",
  "모바일 앱 개발",
];

const SYSTEM_SCOPE_OPTIONS = [
  "PC 웹",
  "모바일 웹",
  "반응형 웹",
  "모바일 앱",
  "AI / 음성 UX",
  "TV UI/UX",
  "키오스크 / 내비게이션",
  "백오피스(관리자)",
];

// Formspree: https://formspree.io 에서 폼 생성 후 받은 ID로 교체하세요
const FORMSPREE_FORM_ID = "YOUR_FORM_ID";

export function InquiryForm() {
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [workScope, setWorkScope] = useState<string[]>([]);
  const [systemScope, setSystemScope] = useState<string[]>([]);
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleWork = (v: string) => {
    setWorkScope((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  };
  const toggleSystem = (v: string) => {
    setSystemScope((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAgree) return;

    const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "착수 시점 / 기간": timeline,
        "예상 예산": budget,
        "프로젝트 설명": message,
        "업무 범위": workScope.join(", "),
        "시스템 범위": systemScope.join(", "),
        "회사 / 단체명": company,
        "연락처": phone,
        "의뢰자명": name,
        "이메일": email,
      }),
    });

    if (res.ok) setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-16">
      {/* 프로젝트에 대해 알려주세요 */}
      <div>
        <div className="mt-8 space-y-10">
          <div>
            <label className="mb-2 block text-sm text-black/70">착수 시점 / 기간</label>
            <div className="flex flex-wrap gap-2">
              {TIMELINE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setTimeline(opt)}
                  className={`rounded border px-8 py-4 text-base transition-colors ${
                    timeline === opt
                      ? "border-black bg-black text-white"
                      : "border-black/20 bg-transparent text-black hover:border-black/40"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm text-black/70">예상 예산</label>
            <div className="flex flex-wrap gap-2">
              {BUDGET_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setBudget(opt)}
                  className={`rounded border px-8 py-4 text-base transition-colors ${
                    budget === opt
                      ? "border-black bg-black text-white"
                      : "border-black/20 bg-transparent text-black hover:border-black/40"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm text-black/70">프로젝트 설명 (선택)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="프로젝트 개요, 목표, 요청 사항을 간단히 적어 주세요."
              rows={7}
              className="w-full border border-black/20 bg-transparent px-4 py-3 text-base text-black outline-none placeholder:text-black/40 focus:border-black/50"
            />
          </div>
        </div>
      </div>

      {/* 추가적인 정보 */}
      <div>
        <h3 className="text-2xl font-medium tracking-tight text-black md:text-3xl">추가적인 정보를 선택해 주세요</h3>
        <p className="mt-1 text-xs text-black/50">선택 입력 사항이며, 여러 개를 선택할 수 있습니다.</p>
        <div className="mt-8 flex flex-col gap-10">
          <div>
            <label className="mb-2 block text-sm text-black/70">업무 범위</label>
            <div className="flex flex-wrap gap-2">
              {WORK_SCOPE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleWork(opt)}
                  className={`rounded border px-8 py-4 text-base transition-colors ${
                    workScope.includes(opt)
                      ? "border-black bg-black text-white"
                      : "border-black/20 bg-transparent text-black hover:border-black/40"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm text-black/70">시스템 범위</label>
            <div className="flex flex-wrap gap-2">
              {SYSTEM_SCOPE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleSystem(opt)}
                  className={`rounded border px-8 py-4 text-base transition-colors ${
                    systemScope.includes(opt)
                      ? "border-black bg-black text-white"
                      : "border-black/20 bg-transparent text-black hover:border-black/40"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 의뢰하시는 분의 정보 */}
      <div>
        <h3 className="text-2xl font-medium tracking-tight text-black md:text-3xl">의뢰하시는 분의 정보를 알려주세요</h3>
        <div className="mt-8 flex flex-col gap-8">
          <div>
            <label className="sr-only">회사 / 단체명</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border-0 border-b border-black/20 bg-transparent px-0 py-4 text-base text-black outline-none placeholder:text-lg placeholder:text-black/40 focus:border-black/50"
              placeholder="회사 또는 단체명을 입력해주세요"
            />
          </div>
          <div>
            <label className="sr-only">연락처</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border-0 border-b border-black/20 bg-transparent px-0 py-4 text-base text-black outline-none placeholder:text-lg placeholder:text-black/40 focus:border-black/50"
              placeholder="연락처를 입력해주세요 (010-0000-0000)"
            />
          </div>
          <div>
            <label className="sr-only">의뢰자명</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-0 border-b border-black/20 bg-transparent px-0 py-4 text-base text-black outline-none placeholder:text-lg placeholder:text-black/40 focus:border-black/50"
              placeholder="의뢰자명을 입력해주세요 (성함)"
            />
          </div>
          <div>
            <label className="sr-only">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-0 border-b border-black/20 bg-transparent px-0 py-4 text-base text-black outline-none placeholder:text-lg placeholder:text-black/40 focus:border-black/50"
              placeholder="이메일을 입력해주세요 (your@email.com)"
            />
          </div>
        </div>
      </div>

      {/* 개인정보 동의 */}
      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={privacyAgree}
            onChange={(e) => setPrivacyAgree(e.target.checked)}
            className="mt-1 h-6 w-6 shrink-0 border-black/30 accent-black md:h-7 md:w-7"
          />
          <span className="text-2xl font-medium tracking-tight text-black md:text-3xl">
            개인정보보호정책에 동의합니다.{" "}
            <button
              type="button"
              onClick={() => setShowPrivacy(!showPrivacy)}
              className="underline hover:text-black"
            >
              {showPrivacy ? "닫기" : "보기"}
            </button>
          </span>
        </label>
        {showPrivacy && (
          <div className="mt-4 rounded border border-black/10 bg-black/[0.02] p-4 text-sm text-black/70">
            <p className="font-medium text-black/90">개인정보 수집·이용 동의</p>
            <p className="mt-2">
              수집 항목: 성명, 회사명, 연락처, 이메일, 의뢰 내용, 예산 등 문의 응대에 필요한 정보.
              목적 달성 후 지체 없이 파기하며, 동의 거부 시 문의 서비스 이용이 제한될 수 있습니다.
            </p>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!privacyAgree || submitted}
        className="w-full border border-black bg-black px-8 py-5 text-base font-medium uppercase tracking-wider text-white hover:bg-black/90 disabled:border-black/30 disabled:bg-black/30 sm:w-auto"
      >
        {submitted ? "접수되었습니다" : "프로젝트 의뢰 작성"}
      </button>
    </form>
  );
}
