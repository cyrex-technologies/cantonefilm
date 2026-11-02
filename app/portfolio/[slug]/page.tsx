import type { Metadata } from 'next';
import { portfolio } from '@/data/portfolio';
import PortfolioProjectClient from '@/components/ui/PortfolioProjectClient';

export function generateStaticParams() {
  return portfolio.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.find(p => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found | Cantone Films',
    };
  }

  const title = `${project.title} | Cantone Films`;
  const description = project.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'video.other',
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.coverImage],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PortfolioProjectClient slug={slug} />;
}
