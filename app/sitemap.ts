import type { MetadataRoute } from 'next';
import { portfolio } from '@/data/portfolio';

export const dynamic = 'force-static';

const siteUrl = 'https://cantonefilms.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/portfolio/`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...portfolio.map(({ slug }) => ({
      url: `${siteUrl}/portfolio/${slug}/`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
