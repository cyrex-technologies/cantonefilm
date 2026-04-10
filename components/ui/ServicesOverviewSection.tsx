'use client';

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
  const [gridRef, gridInView] = useInView({ threshold: 0.1 });
  const section = homeContent.services;

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-navy py-24 text-cream md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(189,128,24,0.16),transparent_32%)]" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div
            ref={headerRef}
            className={`transition-all duration-1000 ${
              headerInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">
              {section.eyebrow}
            </p>
            <h2 className="mt-5 text-4xl font-bold leading-tight text-cream md:text-5xl lg:text-6xl">
              {section.title}
              <span className="block text-gold italic">{section.emphasis}</span>
            </h2>
          </div>

          <p
            className={`max-w-2xl text-base leading-8 text-cream/75 transition-all delay-100 duration-1000 md:text-lg ${
              headerInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {section.description}
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {services.map((service, index) => {
            const Icon = serviceIcons[service.id] || Film;

            return (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={Icon}
                index={index}
                isInView={gridInView}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
