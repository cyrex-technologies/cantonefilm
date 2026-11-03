import SkeletonCard from '@/components/ui/SkeletonCard';

export default function PortfolioProjectLoading() {
  return (
    <main className="min-h-screen bg-cream pt-24">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <SkeletonCard variant="service" />
      </div>
    </main>
  );
}
