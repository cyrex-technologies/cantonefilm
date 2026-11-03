import Container from '@/components/layout/Container';
import SkeletonCard from '@/components/ui/SkeletonCard';

export default function PortfolioLoading() {
  return (
    <main className="min-h-screen bg-cream pt-24">
      <div className="pt-16 pb-12">
        <Container>
          <div className="max-w-4xl animate-pulse">
            <div className="h-3 w-28 bg-neutral-800" />
            <div className="mt-6 h-14 max-w-xl bg-neutral-900 md:h-20" />
            <div className="mt-4 h-5 max-w-2xl bg-neutral-800" />
          </div>
        </Container>
      </div>

      <div className="py-16">
        <Container>
          <div className="mb-12 flex gap-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-9 w-24 animate-pulse rounded-full bg-neutral-800" />
            ))}
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <SkeletonCard key={item} />
            ))}
          </div>
        </Container>
      </div>
    </main>
  );
}
