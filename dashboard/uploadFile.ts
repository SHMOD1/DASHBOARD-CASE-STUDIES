import type { MediaAsset } from "@/types/content";
import { genId } from "@/lib/id";

export async function uploadFile(file: File): Promise<MediaAsset> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", { method: "POST", body: formData });
  if (!res.ok) throw new Error("Upload failed");
  const data = (await res.json()) as { id: string; url: string; type: "image" | "video"; name: string };

  return {
    id: data.id,
    url: data.url,
    type: data.type,
    alt: data.name.replace(/\.[^.]+$/, ""),
    caption: "",
    credit: "",
    folder: "uploads",
    tags: [],
    createdAt: new Date().toISOString(),
  };
}

export function newMediaId() {
  return genId("media");
}
