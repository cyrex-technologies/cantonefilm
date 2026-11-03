'use client';

import { useEffect, useRef, useState } from 'react';
import Container from '@/components/layout/Container';
import ServiceCard from '@/components/ui/ServiceCard';
import { homeContent } from '@/data/home';
import { services } from '@/data/services';
import type { ServiceId } from '@/data/services';
import { useInView } from '@/hooks/useInView';
import { Film, Clapperboard, MonitorPlay, Landmark } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const serviceIcons: Record<ServiceId, LucideIcon> = {
  'feature-films': Film,
  documentaries: Clapperboard,
  'tv-content': MonitorPlay,
  institutional: Landmark,
};

export default function ServicesOverviewSection() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeCard, setActiveCard] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const section = homeContent.services;

  useEffect(() => {
    let frameId = 0;

    const updateActiveCard = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const stickyTop = Math.max(96, window.innerHeight * 0.14);
        let nextActive = 0;

        cardRefs.current.forEach((card, index) => {
          if (card && card.getBoundingClientRect().top <= stickyTop + 24) {
            nextActive = index;
          }
        });

        setActiveCard((current) => current === nextActive ? current : nextActive);
      });
    };

    updateActiveCard();
    window.addEventListener('scroll', updateActiveCard, { passive: true });
    window.addEventListener('resize', updateActiveCard);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateActiveCard);
      window.removeEventListener('resize', updateActiveCard);
    };
  }, []);

  return (
    <section
      id="services"
      className="relative overflow-x-clip bg-navy py-24 text-cream md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(189,128,24,0.16),transparent_32%)]" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

      <Container>
        <div ref={headerRef}>
          <div
            className={`flex items-center gap-4 transition-all duration-1000 ${
              headerInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.35em] text-gold md:text-sm">
              02 / Services
            </p>
            <span className="h-px w-full bg-cream/15" />
          </div>

          <div
            className={`mx-auto mt-14 max-w-4xl text-center transition-all delay-100 duration-1000 md:mt-20 ${
              headerInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <h2 className="text-4xl font-light leading-[1.05] tracking-[-0.05em] text-cream/75 md:text-5xl lg:text-6xl">
              {section.title}
              {' '}
              <span className="font-bold text-cream">{section.emphasis}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-cream/65 md:text-lg">
              {section.description}
            </p>
          </div>
        </div>

        <div className="mt-16 space-y-16 pb-[20vh] md:mt-20 md:space-y-24">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.id] || Film;

            return (
              <div
                key={service.id}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className="sticky top-5 md:top-24"
                style={{ zIndex: index + 1 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  cta={service.cta}
                  icon={Icon}
                  index={index}
                  isInView={headerInView}
                  isCovered={index < activeCard}
                  isDimmed={hoveredCard !== null && hoveredCard !== index}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
