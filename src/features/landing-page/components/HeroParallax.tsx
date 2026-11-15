"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { useLandingIntro } from "./LandingExperience";
import "./HeroParallax.css";

export default function HeroParallax({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const { active: introActive } = useLandingIntro();

  useEffect(() => {
    const host = hostRef.current;
    const hero = host?.parentElement?.querySelector<HTMLElement>("#platform");
    if (!host || !hero || introActive) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let generation = 0;
    let scene:
      | ReturnType<typeof import("../lib/parallax-scene").createParallaxScene>
      | undefined;

    async function start() {
      const currentGeneration = ++generation;
      scene?.dispose();
      scene = undefined;
      host?.classList.remove("is-ready");
      if (preference.matches || disposed) return;
      try {
        const { createParallaxScene } = await import("../lib/parallax-scene");
        if (disposed || currentGeneration !== generation) return;
        const nextScene = createParallaxScene(
          host as HTMLDivElement,
          hero as HTMLElement,
        );
        scene = nextScene;
        await nextScene.ready;
        if (!disposed && currentGeneration === generation)
          host?.classList.add("is-ready");
      } catch (error) {
        if (disposed || currentGeneration !== generation) return;
        scene?.dispose();
        scene = undefined;
        console.warn(
          "ProjectHub parallax unavailable; showing the page.",
          error,
        );
      }
    }

    function onContextLost(event: Event) {
      event.preventDefault();
      generation++;
      scene?.dispose();
      scene = undefined;
      host?.classList.remove("is-ready");
    }

    void start();
    preference.addEventListener("change", start);
    host.addEventListener("webglcontextlost", onContextLost, true);
    return () => {
      disposed = true;
      generation++;
      preference.removeEventListener("change", start);
      host.removeEventListener("webglcontextlost", onContextLost, true);
      host.classList.remove("is-ready");
      scene?.dispose();
    };
  }, [introActive]);

  return (
    <div className="hero-parallax">
      <div ref={hostRef} className="hero-parallax-scene" aria-hidden="true" />
      <div className="hero-parallax-content">{children}</div>
    </div>
  );
}
