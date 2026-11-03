'use client';

import { useEffect, useState } from 'react';
import SkeletonCard from '@/components/ui/SkeletonCard';

export default function SiteLoadingSkeleton() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const finishLoading = () => setIsLoading(false);

    if (document.readyState === 'complete') {
      finishLoading();
      return;
    }

    window.addEventListener('load', finishLoading, { once: true });
    return () => window.removeEventListener('load', finishLoading);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] overflow-hidden bg-neutral-950 text-cream"
      role="status"
      aria-label="Loading Cantone Films"
    >
      <div className="mx-auto flex h-full max-w-7xl flex-col px-6 pt-8 md:px-8">
        <div className="flex items-center justify-between">
          <div className="h-10 w-32 animate-pulse rounded bg-neutral-800" />
          <div className="hidden h-12 w-96 animate-pulse rounded-full bg-neutral-900 md:block" />
        </div>

        <div className="mx-auto mt-28 w-full max-w-3xl animate-pulse text-center md:mt-36">
          <div className="mx-auto h-3 w-40 rounded bg-neutral-800" />
          <div className="mx-auto mt-6 h-12 max-w-xl rounded bg-neutral-800 md:h-16" />
          <div className="mx-auto mt-4 h-12 max-w-2xl rounded bg-neutral-900" />
          <div className="mx-auto mt-8 h-11 w-44 rounded-full bg-neutral-800" />
        </div>

        <div className="mt-auto grid grid-cols-3 gap-3 pt-12 sm:grid-cols-4 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map((item) => (
            <SkeletonCard key={item} className="h-44 !aspect-auto rounded-t-[1.5rem] sm:h-56" />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading Cantone Films</span>
    </div>
  );
}
