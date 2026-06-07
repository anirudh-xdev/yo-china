"use client";

import { useRef } from "react";
import { registerGsapPlugins, gsap, useGSAP } from "@/lib/gsap-client";

registerGsapPlugins();

export function ParallaxBand() {
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
          const line1 = ref.current!.querySelector("[data-parallax='1']");
          const line2 = ref.current!.querySelector("[data-parallax='2']");
          const glow = ref.current!.querySelector("[data-parallax='glow']");

          if (context.conditions?.reduceMotion || !line1 || !line2) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });

          tl.to(line1, { xPercent: -12, ease: "none" }, 0)
            .to(line2, { xPercent: 10, ease: "none" }, 0)
            .to(glow, { scale: 1.15, autoAlpha: 0.9, ease: "none" }, 0);
        }
      );

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-border py-20"
      aria-hidden
    >
      <div
        data-parallax="glow"
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
      />
      <p
        data-parallax="1"
        className="whitespace-nowrap font-display text-[clamp(3rem,10vw,7rem)] font-bold leading-none text-charcoal/[0.04]"
      >
        Kurkure Momos · Special Noodles · Wok Fire · Modinagar
      </p>
      <p
        data-parallax="2"
        className="mt-2 whitespace-nowrap font-display text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-none text-chili/[0.05]"
      >
        Yo China · Chinese Fast Food · Dine In · Delivery
      </p>
    </section>
  );
}
