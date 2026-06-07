"use client";

import { useEffect, type ReactNode } from "react";
import { registerGsapPlugins, ScrollTrigger } from "@/lib/gsap-client";

export function GsapProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerGsapPlugins();

    const refresh = () => ScrollTrigger.refresh();

    refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    const t = window.setTimeout(refresh, 500);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return children;
}
