"use client";

import Link from "next/link";
import { useState } from "react";
import type { Page } from "@/types/content";
import { useDashboardStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function PageSettingsBar({ page }: { page: Page }) {
  const { updatePage, togglePublish } = useDashboardStore();
  const [showSeo, setShowSeo] = useState(false);

  return (
    <div className="border-b border-neutral-800 px-4 py-2.5">
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="text-xs text-neutral-500 hover:text-white">
          ← Pages
        </Link>
        <input
          value={page.title}
          onChange={(e) => updatePage(page.id, { title: e.target.value })}
          className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none"
        />
        <span className="text-xs text-neutral-500">/</span>
        <input
          value={page.slug}
          onChange={(e) => updatePage(page.id, { slug: e.target.value.replace(/\s+/g, "-").toLowerCase() })}
          className="w-40 bg-transparent font-mono text-xs text-neutral-400 outline-none"
        />
        <button
          type="button"
          onClick={() => togglePublish(page.id)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium",
            page.published ? "bg-emerald-500/15 text-emerald-400" : "bg-neutral-800 text-neutral-400"
          )}
        >
          {page.published ? "Published" : "Draft"}
        </button>
        <button
          type="button"
          onClick={() => setShowSeo((v) => !v)}
          className="rounded-md border border-neutral-700 px-2.5 py-1 text-xs text-neutral-300 hover:border-neutral-500"
        >
          SEO
        </button>
      </div>

      {showSeo && (
        <div className="mt-3 grid grid-cols-2 gap-3 rounded-md border border-neutral-800 bg-neutral-900 p-3">
          <label className="col-span-2 text-xs text-neutral-400">
            Meta title
            <input
              value={page.seo.title}
              onChange={(e) => updatePage(page.id, { seo: { ...page.seo, title: e.target.value } })}
              className="mt-1 w-full rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-sm text-white"
            />
          </label>
          <label className="col-span-2 text-xs text-neutral-400">
            Meta description
            <textarea
              value={page.seo.description}
              onChange={(e) => updatePage(page.id, { seo: { ...page.seo, description: e.target.value } })}
              rows={2}
              className="mt-1 w-full rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-sm text-white"
            />
          </label>
          <label className="text-xs text-neutral-400">
            Slug (SEO)
            <input
              value={page.seo.slug}
              onChange={(e) => updatePage(page.id, { seo: { ...page.seo, slug: e.target.value } })}
              className="mt-1 w-full rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-sm text-white"
            />
          </label>
          <label className="text-xs text-neutral-400">
            Schema type
            <input
              value={page.seo.schemaType}
              onChange={(e) => updatePage(page.id, { seo: { ...page.seo, schemaType: e.target.value } })}
              className="mt-1 w-full rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-sm text-white"
            />
          </label>
        </div>
      )}
    </div>
  );
}
