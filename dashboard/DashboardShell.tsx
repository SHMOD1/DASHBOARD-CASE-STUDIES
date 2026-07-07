"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboardStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Pages" },
  { href: "/dashboard/media", label: "Media Library" },
  { href: "/dashboard/theme", label: "Theme" },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { content, loaded, dirty, saving, hydrate, save } = useDashboardStore();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then(hydrate)
      .catch((err) => console.error("Failed to load content", err));
  }, [hydrate]);

  // Auto-save shortly after any edit so the preview stays close to real-time.
  useEffect(() => {
    if (!dirty) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      save();
    }, 900);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [dirty, save]);

  if (!loaded || !content) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-950 text-neutral-400">
        Loading dashboard…
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-neutral-950 text-neutral-100">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-800 px-5">
        <div className="flex items-center gap-8">
          <span className="text-sm font-semibold tracking-wide">{content.siteName}</span>
          <nav className="flex items-center gap-1">
            {NAV.map((item) => {
              const active = item.href === "/dashboard" ? pathname === item.href : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm transition-colors",
                    active ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-xs text-neutral-500">
            {saving ? "Saving…" : dirty ? "Unsaved changes" : "All changes saved"}
          </span>
          <button
            type="button"
            onClick={() => save()}
            disabled={saving || !dirty}
            className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 transition-opacity disabled:opacity-40"
          >
            Save
          </button>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-neutral-700 px-3 py-1.5 text-xs text-neutral-300 hover:border-neutral-500"
          >
            View site
          </a>
        </div>
      </header>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
