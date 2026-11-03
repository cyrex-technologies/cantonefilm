'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { openContactModal } from '@/components/modals/contactModalEvents';
import { portfolio } from '@/data/portfolio';
import {
  Play,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Share2,
  Calendar,
  Tag,
} from 'lucide-react';
import { useInView } from '@/hooks/useInView';

export default function PortfolioProjectClient({ slug }: { slug: string }) {
  const project = portfolio.find(p => p.slug === slug);

  const [showVideo, setShowVideo] = useState(false);
  const [heroRef, heroInView] = useInView();
  const [detailsRef, detailsInView] = useInView();

  const currentIndex = useMemo(
    () => portfolio.findIndex(p => p.slug === slug),
    [slug]
  );

  const previousProject =
    currentIndex > 0 ? portfolio[currentIndex - 1] : null;

  const nextProject =
    currentIndex < portfolio.length - 1
      ? portfolio[currentIndex + 1]
      : null;

  const relatedProjects = useMemo(
    () =>
      portfolio
        .filter(p => p.category === project?.category && p.slug !== slug)
        .slice(0, 3),
    [project, slug]
  );

  useEffect(() => {
    if (!showVideo) return;

    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowVideo(false);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [showVideo]);

  if (!project) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Link href="/portfolio" className="text-gold hover:underline">
          ← Return to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen">

      {/* ================= HERO ================= */}
      <section className="relative h-screen overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/65 via-navy/40 to-cream" />

        <Container>
          <div
            ref={heroRef}
            className={`relative h-screen flex flex-col justify-end pb-20 transition-all duration-1000 ${
              heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-cream/80 hover:text-gold mb-6 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>

            <span className="inline-block px-4 py-2 rounded-2xl bg-gold text-navy text-sm font-bold uppercase mb-4 w-fit">
              {project.category}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-5 max-w-5xl leading-tight">
              {project.title}
            </h1>

            <p className="text-lg md:text-xl text-navy max-w-3xl mb-6">
              {project.excerpt}
            </p>

            <div className="flex flex-wrap gap-4">
              {project.vimeoId && (
                <Button
                  onClick={() => setShowVideo(true)}
                  variant="primary"
                  size="md"
                  leftIcon={<Play className="w-5 h-5 fill-navy" />}
                >
                  Watch Film
                </Button>
              )}

              {project.externalLink && (
                <Button
                  href={project.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline-light"
                  size="md"
                  leftIcon={<ExternalLink className="w-5 h-5" />}
                >
                  View Campaign
                </Button>
              )}

              <Button
                variant="outline-light"
                size="icon"
                ariaLabel="Share project"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= VIDEO MODAL ================= */}
      {showVideo && project.vimeoId && (
        <div
          className="fixed inset-0 z-50 bg-navy/95 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-6xl aspect-video"
            onClick={e => e.stopPropagation()}
          >
            <iframe
              src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* ================= DETAILS ================= */}
      <Section className="py-24">
        <Container>
          <div
            ref={detailsRef}
            className={`grid lg:grid-cols-3 gap-16 transition-all duration-1000 ${
              detailsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-8">
                {(project.description || project.excerpt) && (
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gold mb-3">
                      Project Description
                    </h2>
                    <p className="text-navy/80 leading-relaxed text-base md:text-lg">
                      {project.description ?? project.excerpt}
                    </p>
                  </div>
                )}

                {project.goal && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gold mb-3">
                      Project Goal
                    </h3>
                    <p className="text-navy/80 leading-relaxed text-base md:text-lg">
                      {project.goal}
                    </p>
                  </div>
                )}

                {project.approach && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gold mb-3">
                      Our Approach
                    </h3>
                    <p className="text-navy/80 leading-relaxed text-base md:text-lg">
                      {project.approach}
                    </p>
                  </div>
                )}

                {project.results && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gold mb-3">
                      Results
                    </h3>
                    <p className="text-navy/80 leading-relaxed text-base md:text-lg">
                      {project.results}
                    </p>
                  </div>
                )}
              </div>

              {/* <div>
                <h3 className="text-2xl font-bold text-navy mb-6">
                  Behind the Scenes
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="relative aspect-[4/3] bg-navy overflow-hidden">
                      <Image
                      src={project.coverImage}
                      alt={`Behind the scenes ${i}`}
                      fill
                      loading="lazy"
                        className="object-cover hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  ))}
                </div>
              </div> */}
            </div>

            <div className="space-y-8">
              <div className="bg-white/50 rounded-2xl p-8 border border-brown/10">
                <h3 className="text-lg md:text-xl font-bold text-gold mb-4">
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Tag className="w-5 h-5 text-gold" />
                    <div>
                      <div className="text-sm text-brown/60">Category</div>
                      <div className="font-medium">{project.category}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Calendar className="w-5 h-5 text-gold" />
                    <div>
                      <div className="text-sm text-brown/60">Year</div>
                      <div className="font-medium">2024</div>
                    </div>
                  </div>
                </div>
              </div>

              {project.links && project.links.length > 0 && (
                <div className="bg-white/50 rounded-2xl p-8 border border-brown/10">
                  <h3 className="text-lg md:text-xl font-bold text-gold mb-4">
                    Links
                  </h3>
                  <div className="space-y-3">
                    {project.links.map(link => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-3 text-brown hover:text-gold transition"
                      >
                        <span className="font-medium">{link.label}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-br rounded-2xl from-brown to-gold text-cream p-8">
                <h3 className="font-bold text-lg md:text-xl mb-3 text-cream">
                  Interested in Similar Work?
                </h3>
                <p className="text-cream mb-5 text-sm md:text-base">
                  Let’s bring your vision to life.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={openContactModal}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Get In Touch
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ================= RELATED ================= */}
      {relatedProjects.length > 0 && (
        <Section className="py-24 bg-white/30">
          <Container>
            <h2 className="text-2xl md:text-3xl font-bold text-gold mb-10">
              Related Projects
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map(p => (
                <Link key={p.slug} href={`/portfolio/${p.slug}`}>
                  <div className="relative aspect-[4/5] bg-navy overflow-hidden mb-4">
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      loading="lazy"
                      className="object-cover hover:scale-110 transition"
                    />
                  </div>
                  <h3 className="font-bold text-gold text-base md:text-lg">{p.title}</h3>
                  <p className="text-navy/70 text-xs md:text-sm">{p.category}</p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ================= NAVIGATION ================= */}
      <Section className="py-16 border-t border-brown/20">
        <Container>
          <div className="flex justify-between items-center">
            {previousProject ? (
              <Link
                href={`/portfolio/${previousProject.slug}`}
                className="flex items-center gap-3 text-gold hover:text-brown"
              >
                <ArrowLeft className="w-5 h-5" />
                {previousProject.title}
              </Link>
            ) : <div />}

            {nextProject ? (
              <Link
                href={`/portfolio/${nextProject.slug}`}
                className="flex items-center gap-3 text-gold hover:text-brown"
              >
                {nextProject.title}
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : <div />}
          </div>
        </Container>
      </Section>
    </div>
  );
}
