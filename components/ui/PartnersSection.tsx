'use client';

import Image from 'next/image';
import Container from '@/components/layout/Container';
import { homeContent } from '@/data/home';
import { partners } from '@/data/partners';
import { useInView } from '@/hooks/useInView';

export default function PartnersSection() {
  const [sectionRef, inView] = useInView({ threshold: 0.2 });
  const section = homeContent.partners;

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="relative overflow-hidden bg-white/50 py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(122,92,74,0.08),transparent_35%)]" />

      <Container>
        <div className="relative z-10">
          <div
            className={`max-w-3xl transition-all duration-1000 ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-gold md:text-sm">
              {section.eyebrow}
            </p>
            <h2 className="mt-6 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-dark md:text-5xl lg:text-6xl">
              {section.title}
              <span className="block text-[2.7rem] font-light italic tracking-[-0.04em] text-gold md:text-[4rem]">
                {section.emphasis}
              </span>
            </h2>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            {partners.map((partner, index) => (
              <div
                key={partner.name}
                className={`relative px-4 py-8 transition-all duration-1000 ${
                  inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                {index > 0 && (
                  <div className="absolute left-0 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-gold/15 xl:block" />
                )}

                <div className="flex min-h-[11rem] flex-col items-center justify-center text-center">
                  <div className="relative h-14 w-36 md:h-16 md:w-40">
                    <Image
                      src={partner.coverImage}
                      alt={partner.name}
                      fill
                      loading="lazy"
                      className="object-contain transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <p className="mt-6 text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-brown/70">
                    {partner.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
