"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDashboardStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function PagesList() {
  const router = useRouter();
  const { content, addPage, duplicatePage, deletePage, togglePublish } = useDashboardStore();
  if (!content) return null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Pages</h1>
          <p className="mt-1 text-sm text-neutral-500">Create, duplicate, publish and manage your storytelling pages.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            const id = addPage();
            router.push(`/dashboard/pages/${id}`);
          }}
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-neutral-900"
        >
          + New page
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-neutral-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-900 text-neutral-400">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Sections</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Updated</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {content.pages.map((page) => (
              <tr key={page.id} className="border-t border-neutral-800 hover:bg-neutral-900/60">
                <td className="px-4 py-3">
                  <Link href={`/dashboard/pages/${page.id}`} className="font-medium text-white hover:underline">
                    {page.title}
                  </Link>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-500">/{page.slug}</td>
                <td className="px-4 py-3 text-neutral-400">{page.sections.length}</td>
                <td className="px-4 py-3">
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
                </td>
                <td className="px-4 py-3 text-xs text-neutral-500">
                  {new Date(page.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3 text-xs text-neutral-400">
                    <button type="button" onClick={() => duplicatePage(page.id)} className="hover:text-white">
                      Duplicate
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete "${page.title}"? This cannot be undone.`)) deletePage(page.id);
                      }}
                      className="hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
