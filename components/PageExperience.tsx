"use client";

import { useLenis } from "@/hooks/useLenis";
import { SectionRenderer } from "@/components/SectionRenderer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ChapterNav } from "@/components/ChapterNav";
import { themeToCssVars } from "@/lib/theme";
import type { ResolvedPage } from "@/lib/pages";

export function PageExperience({ page, media, theme }: ResolvedPage) {
  useLenis();

  return (
    <div
      style={themeToCssVars(theme)}
      data-uppercase-headings={theme.typography.uppercaseHeadings || undefined}
      data-bold-headings={theme.typography.boldHeadings || undefined}
      className="bg-[var(--color-background)] text-[var(--color-text)]"
    >
      <ScrollProgress />
      <ChapterNav sections={page.sections} />
      <main>
        <SectionRenderer sections={page.sections} media={media} />
      </main>
    </div>
  );
}
