"use client";

import { useRef, type ReactNode } from "react";
import { registerGsapPlugins, gsap, useGSAP, ScrollTrigger } from "@/lib/gsap-client";
import { cn } from "@/lib/utils";

registerGsapPlugins();

export function SectionReveal({
  children,
  className,
  id,
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "muted" | "blush";
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const items = ref.current!.querySelectorAll("[data-reveal]");

          if (!items.length) return;

          if (context.conditions?.reduceMotion) {
            gsap.set(items, { opacity: 1, y: 0, clearProps: "visibility" });
            return;
          }

          gsap.set(items, { opacity: 0, y: 40 });

          ScrollTrigger.batch(items, {
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.75,
                stagger: 0.1,
                ease: "power3.out",
                overwrite: true,
              });
            },
            start: "top 88%",
            once: true,
          });

          ScrollTrigger.refresh();
        }
      );

      return () => mm.revert();
    },
    { scope: ref }
  );

  const bg =
    variant === "muted"
      ? "bg-surface-muted"
      : variant === "blush"
        ? "bg-blush/40"
        : "";

  return (
    <section ref={ref} id={id} className={cn(bg, className)}>
      {children}
    </section>
  );
}
