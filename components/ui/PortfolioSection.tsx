'use client';

import Image from 'next/image';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import { homeContent } from '@/data/home';
import { homePortfolio } from '@/data/portfolio';
import { useInView } from '@/hooks/useInView';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export default function PortfolioSection() {
  const [sectionRef, inView] = useInView({ threshold: 0.15 });
  const featured = homePortfolio.find(item => item.featured);
  const secondaryProjects = homePortfolio.filter(item => !item.featured);
  const section = homeContent.work;

  if (!featured) return null;

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,128,24,0.09),transparent_30%)]" />

      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div
            className={`transition-all duration-1000 ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">
              {section.eyebrow}
            </p>
            <h2 className="mt-5 text-4xl font-bold leading-tight text-navy md:text-5xl lg:text-6xl">
              {section.title}
              <span className="block text-gold italic">{section.emphasis}</span>
            </h2>
          </div>

          <Button
            href={section.cta.href}
            variant="outline"
            size="md"
            className={`max-md:!hidden border-brown/20 transition-all duration-1000 md:!inline-flex ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            rightIcon={<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
          >
            {section.cta.label}
          </Button>
        </div>

        <div className="mt-14 grid gap-6 lg:gap-8">
          <a
            href={featured.href ?? '/portfolio'}
            target="_blank"
            rel="noopener noreferrer"
            className={`group grid overflow-hidden rounded-[2rem] bg-cream shadow-[0_30px_90px_rgba(5,10,48,0.08)] transition-all duration-1000 hover:-translate-y-1 hover:shadow-[0_38px_110px_rgba(5,10,48,0.12)] lg:grid-cols-[1.1fr_0.9fr] ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="relative min-h-[22rem]">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gold/0 transition-colors duration-500 group-hover:bg-gold/10" />
              {featured.badge && (
                <div className="absolute left-6 top-6 rounded-full bg-gold px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-navy">
                  {featured.badge}
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between p-8 md:p-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brown">
                  {featured.category}
                </p>
                <div className="mt-4 flex items-start justify-between gap-5">
                  <h3 className="text-4xl font-bold uppercase leading-none tracking-[-0.03em] text-navy md:text-5xl">
                    {featured.title}
                  </h3>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brown/15 text-navy transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-6 text-base leading-8 text-navy/80 md:text-lg">
                  {featured.excerpt}
                </p>
              </div>

              {featured.meta && featured.meta.length > 0 && (
                <div className="mt-8 grid gap-5 border-t border-brown/15 pt-8 sm:grid-cols-3">
                  {featured.meta.map(meta => (
                    <div key={meta.label}>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brown/60">
                        {meta.label}
                      </p>
                      <p className="mt-2 text-base font-semibold text-navy">
                        {meta.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </a>

          <div className="grid gap-4 md:grid-cols-3 lg:gap-[1px]">
            {secondaryProjects.map((project, index) => (
              <a
                key={project.title}
                href={project.href ?? '/portfolio'}
                target="_blank"
                rel="noopener noreferrer"
                className={`group overflow-hidden rounded-[1.75rem] bg-navy transition-all duration-1000 hover:-translate-y-1 lg:rounded-none ${
                  inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                  <div className="absolute inset-0 bg-gold/0 transition-colors duration-500 group-hover:bg-gold/10" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                    {project.category}
                  </p>
                  <div className="mt-3 flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-semibold text-cream">
                      {project.title}
                    </h3>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream/15 text-cream/80 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <Button
            href={section.cta.href}
            variant="outline"
            size="md"
            className={`w-full border-brown/20 transition-all duration-1000 md:hidden ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            rightIcon={<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
          >
            {section.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
