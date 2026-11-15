"use client";

import { gsap } from "gsap";
import { type ReactNode, useEffect, useRef } from "react";

export default function ScrollDepth({ children }: { children: ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    const media = gsap.matchMedia();
    void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      media.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            panelRef.current,
            {
              rotationX: 9,
              y: 36,
              scale: 0.97,
              transformOrigin: "center top",
            },
            {
              rotationX: 0,
              y: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panelRef.current,
                start: "top 95%",
                end: "top 30%",
                scrub: 0.8,
              },
            },
          );
        },
      );
    });
    return () => {
      disposed = true;
      media.revert();
    };
  }, []);

  return (
    <div style={{ perspective: "1400px" }}>
      <div ref={panelRef}>{children}</div>
    </div>
  );
}
