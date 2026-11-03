'use client';

import Image from 'next/image';
import Container from '@/components/layout/Container';
import { homeContent } from '@/data/home';
import { useInView } from '@/hooks/useInView';

const storyFrames = [
  {
    src: '/img/about/cantonefilms-aboutbg-lg.webp',
    alt: 'A fish vendor at a market, photographed for a Cantone Films story',
    position: 'left',
  },
  {
    src: '/img/about/whychooseus.webp',
    alt: 'Cantone Films crew reviewing footage together',
    position: 'right',
  },
  {
    src: '/img/reel/behind-scenes.webp',
    alt: 'Behind the scenes of a Cantone Films production',
    position: 'left',
  },
  {
    src: '/img/portfolio/mvamizithumbnail.webp',
    alt: 'A still from a Cantone Films production',
    position: 'right',
  },
] as const;

export default function AboutUsSection() {
  const [sectionRef, inView] = useInView({ threshold: 0.15, once: false });
  const about = homeContent.about;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-cream"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,135,42,0.08),transparent_32%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(44,36,16,0.05),transparent_35%)]" />

      <Container>
        <div className="relative min-h-screen py-20 md:py-24">
          <div
            className={`flex items-center gap-4 transition-all duration-700 ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              {about.number} / {about.eyebrow}
            </p>
            <span className="h-px w-full bg-gold/20" />
          </div>

          <div className="flex min-h-[calc(100svh-10rem)] items-center justify-center py-16 md:min-h-[calc(100svh-12rem)] md:py-0">
            <div
              className="relative z-10 overflow-hidden text-center"
            >
              <div
                className={`transition-all duration-1000 ease-out ${
                  inView ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
              >
                <h2 className="mx-auto max-w-3xl text-4xl font-light leading-[1.02] tracking-[-0.055em] text-dark sm:text-5xl md:text-6xl lg:text-7xl">
                  {about.title}{' '}
                  <span className="font-semibold text-gold">{about.emphasis}</span>
                </h2>
                <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted md:text-lg md:leading-8">
                  {about.description}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            {storyFrames.map((frame, index) => (
              <StoryFrame
                key={frame.src}
                {...frame}
                inView={inView}
                index={index}
                side={frame.position}
                className={[
                  'md:left-0 md:top-[14%] md:w-[24%]',
                  'md:right-0 md:top-[11%] md:w-[29%]',
                  'md:bottom-[11%] md:left-[5%] md:w-[16%]',
                  'md:bottom-[9%] md:right-[1%] md:w-[25%]',
                ][index]}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StoryFrame({
  src,
  alt,
  className,
  inView,
  index,
  side,
}: {
  src: string;
  alt: string;
  className: string;
  inView: boolean;
  index: number;
  side: 'left' | 'right';
}) {
  return (
    <div
      className={`${className} group relative aspect-[1.38/1] overflow-hidden rounded-[1.7rem] shadow-[0_24px_45px_rgba(44,36,16,0.1)] transition-all duration-1000 md:absolute ${
        inView
          ? 'translate-x-0 opacity-100'
          : side === 'left'
            ? '-translate-x-16 opacity-0'
            : 'translate-x-16 opacity-0'
      }`}
      style={{ transitionDelay: `${150 + index * 100}ms` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        loading="lazy"
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/15 via-transparent to-cream/5" />
    </div>
  );
}
