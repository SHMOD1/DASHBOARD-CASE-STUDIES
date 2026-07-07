import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 8);

export function genId(prefix: string): string {
  return `${prefix}_${nanoid()}`;
}
