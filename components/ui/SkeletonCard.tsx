type SkeletonCardProps = {
  variant?: 'portfolio' | 'service';
  className?: string;
};

export default function SkeletonCard({
  variant = 'portfolio',
  className = '',
}: SkeletonCardProps) {
  const isService = variant === 'service';

  return (
    <div
      className={`relative overflow-hidden bg-neutral-900 ${
        isService ? 'min-h-[28rem] rounded-[2rem] md:min-h-[34rem]' : 'aspect-[4/5]'
      } ${className}`}
      role="status"
      aria-label="Loading content"
    >
      <div className="absolute inset-0 animate-pulse">
        <div className="absolute inset-0 bg-neutral-900" />
        <div className="absolute inset-x-0 top-0 h-[58%] bg-neutral-800" />
        <div className="absolute inset-x-0 top-[58%] bottom-0 bg-gradient-to-t from-neutral-900 to-neutral-900/30" />

        {isService ? (
          <div className="absolute inset-x-8 top-8 md:inset-x-12 md:top-12">
            <div className="h-11 w-11 rounded-full bg-neutral-800" />
            <div className="mt-7 h-10 w-2/5 rounded bg-neutral-800" />
            <div className="absolute right-0 top-14 hidden w-[32%] space-y-3 md:block">
              <div className="h-4 rounded bg-neutral-800" />
              <div className="h-4 w-4/5 rounded bg-neutral-800" />
              <div className="h-4 w-3/5 rounded bg-neutral-800" />
            </div>
          </div>
        ) : (
          <div className="absolute inset-x-6 bottom-6">
            <div className="h-6 w-3/4 rounded bg-neutral-800" />
            <div className="mt-3 h-3 w-2/5 rounded bg-neutral-800" />
          </div>
        )}

        <div className="absolute bottom-8 left-8 h-11 w-36 rounded-full bg-neutral-800 md:bottom-12 md:left-12" />
      </div>
      <span className="sr-only">Loading content</span>
    </div>
  );
}
