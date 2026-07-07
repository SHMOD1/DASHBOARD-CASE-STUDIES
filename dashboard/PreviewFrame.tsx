"use client";

import { useState } from "react";
import { useDashboardStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const DEVICES = {
  desktop: { width: "100%", label: "Desktop" },
  tablet: { width: "768px", label: "Tablet" },
  mobile: { width: "390px", label: "Mobile" },
} as const;

type Device = keyof typeof DEVICES;

export function PreviewFrame({ slug }: { slug: string }) {
  const { lastSavedAt, dirty, saving, save } = useDashboardStore();
  const [device, setDevice] = useState<Device>("desktop");

  return (
    <div className="flex h-full flex-col bg-neutral-925">
      <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-2">
        <div className="flex gap-1">
          {(Object.keys(DEVICES) as Device[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setDevice(key)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs",
                device === key ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-white"
              )}
            >
              {DEVICES[key].label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => save()}
          className="text-xs text-neutral-500 hover:text-white"
          disabled={saving}
        >
          {dirty ? "Save & refresh preview" : "Refresh preview"}
        </button>
      </div>
      <div className="flex flex-1 items-start justify-center overflow-auto bg-neutral-950 p-4">
        <div
          className="h-full overflow-hidden rounded-md border border-neutral-800 bg-black shadow-2xl transition-[width] duration-300"
          style={{ width: DEVICES[device].width }}
        >
          <iframe
            key={lastSavedAt ?? "initial"}
            src={`/${slug}?preview=1`}
            title="Live preview"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
