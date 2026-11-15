"use client";

import { useEffect, useState } from "react";
import { useLandingIntro } from "./LandingExperience";

const WORDS = [
  { text: "Hebat", background: "#cef3d7", dot: "#1caf40" },
  { text: "Keren", background: "#d4e3ff", dot: "#0076d3" },
  { text: "Menarik", background: "#fcdfa1", dot: "#c7790b" },
  { text: "Unik", background: "#eadbff", dot: "#8b45cf" },
];

export default function RotatingHeroWord() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { active: introActive } = useLandingIntro();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;

    function updateTimer() {
      clearInterval(timer);
      if (introActive) setActiveIndex(0);
      if (!preference.matches && !introActive) {
        timer = setInterval(() => {
          setActiveIndex((index) => (index + 1) % WORDS.length);
        }, 1000);
      }
    }

    updateTimer();
    preference.addEventListener("change", updateTimer);
    return () => {
      clearInterval(timer);
      preference.removeEventListener("change", updateTimer);
    };
  }, [introActive]);

  const activeWord = WORDS[introActive ? 0 : activeIndex];

  return (
    <>
      <span className="sr-only">hebat</span>
      <span
        aria-hidden="true"
        className="inline-flex shrink-0 items-center justify-center gap-[0.22em] whitespace-nowrap rounded-full px-[0.35em] py-[0.16em] text-[0.78em] leading-none font-medium tracking-[-0.04em] transition-colors duration-300 motion-reduce:transition-none"
        style={{ backgroundColor: activeWord.background }}
      >
        <span
          data-intro-dot=""
          className="size-[0.27em] shrink-0 rounded-full transition-colors duration-300 motion-reduce:transition-none"
          style={{ backgroundColor: activeWord.dot }}
        />
        {activeWord.text}
      </span>
    </>
  );
}
