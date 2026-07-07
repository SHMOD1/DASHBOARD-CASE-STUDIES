import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getHomePage } from "@/lib/pages";
import { PageExperience } from "@/components/PageExperience";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePage();
  if (!data) return {};
  return {
    title: data.page.seo.title || data.page.title,
    description: data.page.seo.description,
  };
}

export default async function HomePage() {
  const data = await getHomePage();
  if (!data) notFound();
  return <PageExperience {...data} />;
}
