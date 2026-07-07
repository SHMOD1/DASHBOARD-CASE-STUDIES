import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPageBySlug } from "@/lib/pages";
import { PageExperience } from "@/components/PageExperience";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPageBySlug(slug);
  if (!data) return {};
  return {
    title: data.page.seo.title || data.page.title,
    description: data.page.seo.description,
  };
}

export default async function SlugPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const data = await getPageBySlug(slug);
  if (!data || (!data.page.published && !preview)) notFound();
  return <PageExperience {...data} />;
}
