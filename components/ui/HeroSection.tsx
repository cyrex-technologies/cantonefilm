'use client';

import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import { homeContent } from '@/data/home';
import { useInView } from '@/hooks/useInView';
import { ArrowRight } from 'lucide-react';

export default function CantoneFilmsHero() {
  const [heroRef, inView] = useInView({ threshold: 0.2 });

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-navy"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat md:hidden"
          style={{ backgroundImage: "url('/img/hero/cantonefilms-bg-sm.webp')" }}
        />
        <div
          className="absolute inset-0 hidden bg-center bg-cover bg-no-repeat md:block"
          style={{ backgroundImage: "url('/img/hero/cantonefilms-bg-lg.webp')" }}
        />
        <div className="absolute inset-0 bg-navy/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-navy/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(189,128,24,0.2),transparent_45%)]" />
      </div>

      <Container>
        <div className="relative flex min-h-screen items-end pb-20 pt-32 md:pb-24">
          <div
            className={`max-w-4xl transition-all duration-1000 ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <h1 className="max-w-3xl text-5xl font-bold uppercase leading-[0.9] tracking-[-0.03em] text-cream sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Stories
              <br />
              That <span className="text-gold normal-case italic">Last.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-cream/75 md:text-lg">
              {homeContent.hero.description}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                href={homeContent.hero.primaryCta.href}
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
              >
                {homeContent.hero.primaryCta.label}
              </Button>
              <Button
                href={homeContent.hero.secondaryCta.href}
                variant="outline-light"
                size="md"
              >
                {homeContent.hero.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
