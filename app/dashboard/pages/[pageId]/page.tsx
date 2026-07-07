"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDashboardStore } from "@/lib/store";
import { SectionList } from "@/dashboard/SectionList";
import { PreviewFrame } from "@/dashboard/PreviewFrame";
import { SectionEditorPanel } from "@/dashboard/SectionEditorPanel";
import { PageSettingsBar } from "@/dashboard/PageSettingsBar";

export default function PageEditorRoute() {
  const params = useParams<{ pageId: string }>();
  const router = useRouter();
  const { content, selectedSectionId, selectPage } = useDashboardStore();

  useEffect(() => {
    if (params.pageId) selectPage(params.pageId);
  }, [params.pageId, selectPage]);

  if (!content) return null;
  const page = content.pages.find((p) => p.id === params.pageId);

  if (!page) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-neutral-400">
        <p>Page not found.</p>
        <button type="button" onClick={() => router.push("/dashboard")} className="text-sm underline">
          Back to pages
        </button>
      </div>
    );
  }

  const selectedSection = page.sections.find((s) => s.id === selectedSectionId) ?? null;

  return (
    <div className="flex h-full flex-col">
      <PageSettingsBar page={page} />
      <div className="grid min-h-0 flex-1 grid-cols-[16rem_1fr_24rem]">
        <div className="min-h-0 overflow-y-auto border-r border-neutral-800">
          <SectionList page={page} selectedSectionId={selectedSectionId} />
        </div>
        <div className="min-h-0">
          <PreviewFrame slug={page.slug} />
        </div>
        <div className="min-h-0 overflow-y-auto border-l border-neutral-800">
          <SectionEditorPanel page={page} section={selectedSection} media={content.media} />
        </div>
      </div>
    </div>
  );
}
