"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Menu, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { registerGsapPlugins, gsap, useGSAP, ScrollTrigger } from "@/lib/gsap-client";
import type { SiteData } from "@/lib/site";
import { cn } from "@/lib/utils";

registerGsapPlugins();

const navLinks = [
  { href: "#dishes", label: "Dishes" },
  { href: "#reviews", label: "Reviews" },
  { href: "#gallery", label: "Interior" },
  { href: "#visit", label: "Visit" },
];

export function Header({ site }: { site: SiteData }) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuUrl = site.googleMapsMenuUrl ?? site.googleMapsUrl;

  useGSAP(
    () => {
      if (!headerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const el = headerRef.current;
            if (!el) return;
            el.dataset.scrolled = self.scroll() > 40 ? "true" : "false";
          },
        });
      });

      return () => mm.revert();
    },
    { scope: headerRef }
  );

  return (
    <header
      ref={headerRef}
      data-scrolled="false"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        "data-[scrolled=false]:bg-transparent data-[scrolled=false]:border-transparent",
        "data-[scrolled=true]:border-b data-[scrolled=true]:border-border",
        "data-[scrolled=true]:bg-surface/90 data-[scrolled=true]:shadow-sm data-[scrolled=true]:backdrop-blur-xl"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="#home"
          className="font-display text-xl font-bold tracking-tight text-charcoal"
        >
          Yo China
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition hover:text-chili"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <Link href={menuUrl} target="_blank" rel="noopener noreferrer">
              Menu
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link
              href={site.zomatoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Order Now
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="mt-8 flex flex-col gap-6" aria-label="Mobile">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="text-lg text-charcoal transition hover:text-chili"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    href={menuUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-lg text-charcoal transition hover:text-chili"
                  >
                    Menu on Google Maps
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild className="mt-4">
                    <Link
                      href={site.zomatoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Order on Zomato
                    </Link>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
