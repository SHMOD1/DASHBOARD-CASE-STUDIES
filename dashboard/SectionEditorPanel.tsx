"use client";

import { useState } from "react";
import type { MediaAsset, Page, Section } from "@/types/content";
import { useDashboardStore } from "@/lib/store";
import { ContentEditor } from "@/dashboard/editors/ContentEditor";
import { MediaEditor } from "@/dashboard/editors/MediaEditor";
import { AnimationEditor } from "@/dashboard/editors/AnimationEditor";
import { LayoutEditor } from "@/dashboard/editors/LayoutEditor";
import { TypographyEditor } from "@/dashboard/editors/TypographyEditor";
import { ColorEditor } from "@/dashboard/editors/ColorEditor";
import { cn } from "@/lib/utils";

const TABS = ["Content", "Media", "Animation", "Layout", "Typography", "Colors"] as const;
type Tab = (typeof TABS)[number];

export function SectionEditorPanel({
  page,
  section,
  media,
}: {
  page: Page;
  section: Section | null;
  media: MediaAsset[];
}) {
  const [tab, setTab] = useState<Tab>("Content");
  const { content } = useDashboardStore();

  if (!section || !content) {
    return (
      <div className="flex h-full items-center justify-center px-6 text-center text-sm text-neutral-500">
        Select a section to edit its content, media, animation, layout, typography and colors.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap gap-1 border-b border-neutral-800 p-2">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs",
              tab === t ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-white"
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        {tab === "Content" && <ContentEditor page={page} section={section} media={media} />}
        {tab === "Media" && <MediaEditor section={section} media={media} />}
        {tab === "Animation" && <AnimationEditor page={page} section={section} />}
        {tab === "Layout" && <LayoutEditor page={page} section={section} media={media} />}
        {tab === "Typography" && <TypographyEditor page={page} section={section} />}
        {tab === "Colors" && <ColorEditor page={page} section={section} theme={content.theme} />}
      </div>
    </div>
  );
}
