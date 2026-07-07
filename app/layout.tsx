import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Original Exhibition Co.",
  description: "An editable, JSON-driven long-form storytelling exhibition.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
