'use client';

import Container from '@/components/layout/Container';
import { homeContent } from '@/data/home';
import { useInView } from '@/hooks/useInView';

export default function AboutUsSection() {
  const [sectionRef, inView] = useInView({ threshold: 0.2 });
  const about = homeContent.about;
  const emphasisLines = about.emphasis.split(' ');

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,135,42,0.08),transparent_32%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(44,36,16,0.05),transparent_35%)]" />

      <Container>
        <div className="grid gap-14 lg:grid-cols-[31rem_minmax(0,1fr)] lg:gap-16">
          <div
            className={`transition-all duration-1000 ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-gold md:text-sm">
              {about.eyebrow}
            </p>
            <div className="mt-10 text-[4.75rem] font-bold leading-none tracking-[-0.05em] text-gold/10 md:text-[5.75rem]">
              {about.number}
            </div>
            <h2 className="-mt-2 text-[3rem] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark md:text-[4.1rem]">
              {about.title}
            </h2>
            <div className="text-gold">
              {emphasisLines.map((line) => (
                <span
                  key={line}
                  className="block text-[2.7rem] font-light italic leading-[0.9] tracking-[-0.04em] md:text-[4rem]"
                >
                  {line}
                </span>
              ))}
            </div>
            <div className="mt-9 h-[3px] w-9 bg-gold" />
            <p className="mt-10 max-w-md text-lg leading-10 text-muted">
              {about.intro}
            </p>
          </div>

          <div
            className={`transition-all delay-150 duration-1000 ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="relative lg:border-l lg:border-gold/20 lg:pl-16">
              <div className="max-w-5xl">
                <div className="hidden items-start gap-7 lg:flex">
                  <div className="mt-1 h-[26px] w-px bg-gold" />
                  <p className="text-sm font-light italic leading-[1.8] tracking-[-0.02em] text-text xl:text-[1.15rem]">
                    {about.quote}
                  </p>
                </div>

                <div className="mt-8 grid gap-8 text-lg leading-10 text-muted md:grid-cols-2 md:gap-12 lg:mt-12">
                  <p>{about.bodyLeft}</p>
                  <p>{about.bodyRight}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
