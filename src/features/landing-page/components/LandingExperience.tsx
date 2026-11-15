"use client";

import { gsap } from "gsap";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./LandingExperience.css";

const IntroContext = createContext({ active: false });

export function useLandingIntro() {
  return useContext(IntroContext);
}

export default function LandingExperience({
  children,
}: {
  children: ReactNode;
}) {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState("Temukan kemungkinan.");
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    function showIntro() {
      if (document.hidden) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setActive(true);
      document.removeEventListener("visibilitychange", showIntro);
    }

    document.addEventListener("visibilitychange", showIntro);
    showIntro();
    return () => document.removeEventListener("visibilitychange", showIntro);
  }, []);

  useEffect(() => {
    if (!active) return;
    const host = sceneRef.current;
    const orb = orbRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!host || !orb || !overlay || !content) return;

    let disposed = false;
    let finished = false;
    let scene:
      | ReturnType<typeof import("../lib/intro-scene").createIntroScene>
      | undefined;
    let timeline: gsap.core.Timeline | undefined;
    const previousOverflow = document.body.style.overflow;
    const previousGutter = document.documentElement.style.scrollbarGutter;
    const previousFocus = document.activeElement;
    document.documentElement.style.scrollbarGutter = "stable";
    document.body.style.overflow = "hidden";
    setLoading(true);
    setPhase("Temukan kemungkinan.");
    skipRef.current?.focus({ preventScroll: true });

    function finish() {
      if (finished || disposed) return;
      finished = true;
      setActive(false);
      // Return keyboard focus after the content is no longer inert.
      requestAnimationFrame(() => {
        if (
          previousFocus instanceof HTMLElement &&
          previousFocus !== document.body &&
          previousFocus.isConnected
        ) {
          previousFocus.focus({ preventScroll: true });
        } else {
          content
            ?.querySelector<HTMLAnchorElement>("#platform a")
            ?.focus({ preventScroll: true });
        }
      });
    }
    finishRef.current = finish;
    const timeout = window.setTimeout(finish, 8000);
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    function onMotionChange() {
      if (motionPreference.matches) finish();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") finish();
      // The intro has one focusable control; keep Tab inside it while modal.
      if (event.key === "Tab") {
        event.preventDefault();
        skipRef.current?.focus();
      }
    }
    function onVisibilityChange() {
      if (document.hidden) finish();
    }
    function onContextLost(event: Event) {
      event.preventDefault();
      finish();
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", finish);
    document.addEventListener("visibilitychange", onVisibilityChange);
    host.addEventListener("webglcontextlost", onContextLost, true);
    motionPreference.addEventListener("change", onMotionChange);

    async function start() {
      try {
        const { createIntroScene } = await import("../lib/intro-scene");
        if (disposed || finished) return;
        scene = createIntroScene(host as HTMLDivElement);
        await scene.ready;
        if (disposed || finished) return;
        setLoading(false);
        timeline = gsap.timeline({ onComplete: finish });
        timeline.fromTo(host, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
        timeline.add(scene.timeline, 0);
        scene.timeline.paused(false);
        timeline.call(() => setPhase("Ide bertemu tim yang tepat."), [], 0.7);
        timeline.call(
          () => {
            if (!scene) return;
            const bounds = scene.sphereBounds();
            gsap.set(orb, {
              width: bounds.size,
              height: bounds.size,
              x: bounds.x - bounds.size / 2,
              y: bounds.y - bounds.size / 2,
              opacity: 1,
            });
          },
          [],
          1.85,
        );
        timeline.to(host, { opacity: 0, duration: 0.18 }, 1.85);
        timeline.call(() => scene?.stop(), [], 2.05);
        timeline.to(
          overlay?.querySelectorAll("[data-intro-chrome]") ?? [],
          { opacity: 0, duration: 0.35 },
          1.85,
        );
        timeline.to(
          captionRef.current,
          { opacity: 0, y: -8, duration: 0.25 },
          1.75,
        );
        timeline.to(
          overlay,
          { backgroundColor: "rgba(244, 247, 243, 0)", duration: 0.5 },
          2,
        );
        timeline.to(
          content,
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          2.05,
        );
        // Resolve the endpoint at the handoff, after fonts and responsive layout settle.
        timeline.to(
          orb,
          {
            x: () =>
              content
                ?.querySelector("[data-intro-dot]")
                ?.getBoundingClientRect().left ?? window.innerWidth / 2,
            y: () =>
              content
                ?.querySelector("[data-intro-dot]")
                ?.getBoundingClientRect().top ?? window.innerHeight / 2,
            width: () =>
              content
                ?.querySelector("[data-intro-dot]")
                ?.getBoundingClientRect().width ?? 12,
            height: () =>
              content
                ?.querySelector("[data-intro-dot]")
                ?.getBoundingClientRect().height ?? 12,
            borderRadius: "50%",
            duration: 0.9,
            ease: "power3.inOut",
            background:
              "radial-gradient(circle at 32% 28%, #1caf40 0%, #1caf40 100%)",
            boxShadow: "0 0 0 rgba(28,175,64,0)",
          },
          2,
        );
        timeline.to(orb, { opacity: 0, duration: 0.12 }, 2.94);
      } catch (error) {
        console.warn("ProjectHub intro unavailable; showing the page.", error);
        finish();
      }
    }
    void start();

    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      timeline?.kill();
      scene?.dispose();
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.scrollbarGutter = previousGutter;
      gsap.set(content, { clearProps: "opacity" });
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", finish);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      host.removeEventListener("webglcontextlost", onContextLost, true);
      motionPreference.removeEventListener("change", onMotionChange);
      finishRef.current = () => {};
    };
  }, [active]);

  return (
    <IntroContext.Provider value={{ active }}>
      <div
        ref={contentRef}
        inert={active}
        aria-hidden={active || undefined}
        style={active ? { opacity: 0 } : undefined}
      >
        {children}
      </div>
      {active && (
        <div
          ref={overlayRef}
          className="ph-intro-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Selamat datang di ProjectHub"
        >
          <div
            className="ph-intro-ambient"
            data-intro-chrome=""
            aria-hidden="true"
          />
          <div ref={sceneRef} className="ph-intro-scene" />
          <div ref={orbRef} className="ph-intro-orb" aria-hidden="true" />
          <div className="ph-intro-topbar" data-intro-chrome="">
            <span className="ph-intro-brand">
              <span className="ph-intro-brandMark">
                p<span>h</span>
              </span>
              ProjectHub
              <span className="ph-intro-edition">SEBUAH AWAL BARU</span>
            </span>
            <button
              ref={skipRef}
              type="button"
              onClick={() => finishRef.current()}
              className="ph-intro-skip"
            >
              Lewati intro <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          </div>
          <div ref={captionRef} className="ph-intro-caption" aria-hidden="true">
            <span className="ph-intro-eyebrow">
              {loading ? "MENYIAPKAN RUANG IDE" : "DARI SATU IDE"}
            </span>
            <p>{phase}</p>
            <span className="ph-intro-subcaption">
              Satu ide. Banyak kemungkinan.
            </span>
          </div>
          <div
            className="ph-intro-footer"
            data-intro-chrome=""
            aria-hidden="true"
          >
            <span>IDE · ORANG · KEMUNGKINAN</span>
            <span className="ph-intro-progress">
              <span />
            </span>
            <span>
              SCENE 001 <RotateCcw size={11} />
            </span>
          </div>
        </div>
      )}
    </IntroContext.Provider>
  );
}
