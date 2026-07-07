"use client";

import { useEffect, useState } from "react";
import { scrollToSection } from "@/lib/lenis";
import type { Section } from "@/types/content";
import { cn } from "@/lib/utils";

export function ChapterNav({ sections }: { sections: Section[] }) {
  const visible = sections.filter((s) => s.visible);
  const [activeId, setActiveId] = useState<string | null>(visible[0]?.id ?? null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    visible.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections.length]);

  if (visible.length < 2) return null;

  return (
    <nav className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex">
      {visible.map((section) => {
        const active = section.id === activeId;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(`#${section.id}`)}
            className="group flex items-center gap-3"
            aria-label={`Jump to ${section.name}`}
          >
            <span
              className={cn(
                "max-w-0 overflow-hidden whitespace-nowrap text-[0.65rem] uppercase tracking-[0.2em] opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:opacity-70",
                active && "max-w-[10rem] opacity-70"
              )}
            >
              {section.name}
            </span>
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full bg-[var(--color-text)]/40 transition-all",
                active && "h-2.5 w-2.5 bg-[var(--color-accent)]"
              )}
            />
          </button>
        );
      })}
    </nav>
  );
}
