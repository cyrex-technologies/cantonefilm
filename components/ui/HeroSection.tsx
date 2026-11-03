'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { homeContent } from '@/data/home';
import { useInView } from '@/hooks/useInView';

const reelFrames = [
  { src: '/img/reel/teacher-training.webp', alt: 'Teacher training production still' },
  { src: '/img/reel/fisheries.webp', alt: 'Documentary production still at a fish market' },
  { src: '/img/reel/data-workshop.webp', alt: 'Institutional event production still' },
  { src: '/img/reel/mvamizi.webp', alt: 'Cantone Films production still' },
  { src: '/img/reel/behind-scenes.webp', alt: 'Cantone Films behind-the-scenes production still' },
  { src: '/img/reel/storytelling.webp', alt: 'Cantone Films storytelling production still' },
  { src: '/img/reel/cinematic.webp', alt: 'Cantone Films cinematic production still' },
  { src: '/img/reel/visual-narrative.webp', alt: 'Cantone Films visual narrative still' },
];

// Two identical passes are enough for a seamless marquee. Keeping the track
// short means its physical starting point is predictable rather than living
// several screen widths away from the visible reel.
const reelCopies = 2;

export default function CantoneFilmsHero() {
  const [heroRef, inView] = useInView({ threshold: 0.15 });
  const reelTrackRef = useRef<HTMLDivElement>(null);
  const driftTweenRef = useRef<gsap.core.Tween | null>(null);
  const [activeFrame, setActiveFrame] = useState<number | null>(null);

  useEffect(() => {
    const track = reelTrackRef.current;
    if (!track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const createDrift = () => {
      driftTweenRef.current?.kill();
      const loopWidth = track.scrollWidth / reelCopies;
      const stageWidth = track.parentElement?.parentElement?.clientWidth ?? window.innerWidth;
      // The rotated lane is 128vw wide, therefore it overhangs the viewport by
      // 14vw on either side. Position the start of pass two at the actual
      // right viewport edge; pass one fills the viewport to its left.
      const startPosition = -loopWidth + stageWidth * 1.14;
      // Moving exactly one pass makes the reset visually seamless.
      gsap.set(track, { x: startPosition });
      driftTweenRef.current = gsap.to(track, {
        x: startPosition - loopWidth,
        duration: 68,
        ease: 'none',
        repeat: -1,
      });
    };

    createDrift();
    window.addEventListener('resize', createDrift);
    return () => {
      window.removeEventListener('resize', createDrift);
      driftTweenRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const restartReel = () => {
      driftTweenRef.current?.restart();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Returning to the home section always begins at the intentional
          // right-edge entry point rather than resuming an old position.
          restartReel();
        } else {
          driftTweenRef.current?.pause();
        }
      },
      { threshold: 0.35 }
    );

    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        driftTweenRef.current?.pause();
        return;
      }

      const bounds = hero.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) restartReel();
    };

    observer.observe(hero);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [heroRef]);

  const pauseDrift = (index: number) => {
    setActiveFrame(index);
    driftTweenRef.current?.pause();
  };

  const resumeDrift = () => {
    setActiveFrame(null);
    driftTweenRef.current?.play();
  };

  return (
    <section id="home" ref={heroRef} className="relative isolate h-[100svh] min-h-[720px] overflow-hidden bg-[#11100e] text-cream">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_60%_at_50%_14%,rgba(184,135,42,0.14),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.54),transparent_38%,rgba(0,0,0,0.48))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-[#11100e]/75 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center px-5 pb-0 pt-32 text-center sm:px-8 sm:pt-36">
        <div className={`max-w-4xl transition-all duration-1000 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.34em] text-gold-l sm:text-xs">Cantone Films · Tanzania</p>
          <h1 className="text-4xl leading-[1.04] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[5.15rem]">
            <span className="block font-normal text-cream/75">Stories that move us.</span>
            <span className="block font-bold text-cream">Stories that <em className="font-bold text-gold-l">last.</em></span>
          </h1>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={homeContent.hero.primaryCta.href} className="group inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-bold text-dark transition duration-300 hover:-translate-y-0.5 hover:bg-gold-l">
              {homeContent.hero.primaryCta.label}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link href={homeContent.hero.secondaryCta.href} className="inline-flex items-center rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition duration-300 hover:border-gold-l hover:bg-cream/10">
              {homeContent.hero.secondaryCta.label}
            </Link>
          </div>
        </div>

      <div className="absolute inset-x-0 bottom-0 z-10 [perspective:1000px] [perspective-origin:center_bottom]" aria-label="Featured Cantone Films work">
        <div className="absolute bottom-20 left-1/2 w-[128vw] min-w-[920px] -translate-x-1/2 [transform-style:preserve-3d] [transform:rotateX(20deg)_rotateZ(-8deg)] [transform-origin:center_bottom] sm:bottom-24 lg:bottom-28">
          <div ref={reelTrackRef} className="flex w-max items-end gap-3 px-3 [transform-style:preserve-3d] sm:gap-5 sm:px-6 lg:gap-6">
            {Array.from({ length: reelCopies }, () => reelFrames).flat().map((frame, index) => {
              const frameIndex = index % reelFrames.length;
              const isInactive = activeFrame !== null && activeFrame !== frameIndex;

              return (
              <article
                key={`${frame.src}-${index}`}
                onMouseEnter={() => pauseDrift(frameIndex)}
                onMouseLeave={resumeDrift}
                onFocus={() => pauseDrift(frameIndex)}
                onBlur={resumeDrift}
                className={`group relative h-[240px] w-[170px] shrink-0 overflow-hidden rounded-[25px] border border-cream/15 bg-cardBg shadow-2xl transition-all duration-500 sm:h-[320px] sm:w-[230px] sm:rounded-[32px] lg:h-[390px] lg:w-[280px] ${
                  activeFrame === frameIndex ? '-translate-y-2 scale-[1.03] brightness-110' : ''
                } ${isInactive ? 'scale-[0.98] opacity-55 brightness-75' : 'opacity-100'}`}
              >
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  priority={index < 4}
                  loading={index >= 4 ? 'lazy' : undefined}
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 230px, 170px"
                  className="object-cover brightness-90 saturate-[0.82] transition duration-700 group-hover:scale-105 group-hover:brightness-100 group-hover:saturate-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
              </article>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
