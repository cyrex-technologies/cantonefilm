'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { portfolio } from '@/data/portfolio';
import { PortfolioCategory } from '@/types/interface';
import { Play, ExternalLink, Filter } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

export default function PortfolioPageClient() {
  const [activeCategory, setActiveCategory] =
    useState<PortfolioCategory | 'All'>('All');

  const [headerRef, headerInView] = useInView();
  const [gridRef, gridInView] = useInView({ threshold: 0.15 });

  const categories = useMemo<(PortfolioCategory | 'All')[]>(() => {
    const unique = Array.from(new Set(portfolio.map(p => p.category))) as PortfolioCategory[];
    return ['All', ...unique];
  }, []);

  const filteredProjects =
    activeCategory === 'All'
      ? portfolio
      : portfolio.filter(p => p.category === activeCategory);

  return (
    <div className="bg-cream min-h-screen pt-24">
      {/* HERO */}
      <Section className="pt-16 pb-12">
        <Container>
          <div
            ref={headerRef}
            className={`text-left max-w-4xl transition-all duration-1000 ${
              headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex justify-start items-center gap-3 mb-6">
              <span className="w-12 h-px bg-gold" />
              <span className="text-navy tracking-widest text-sm uppercase">
                Our Work
              </span>
              <span className="w-12 h-px bg-gold" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gold mb-6">
              Stories That
              <br />
              <span className="text-brown">Inspire Change</span>
            </h1>

            <p className="text-xl text-navy/80 max-w-3xl">
              A curated selection of visual stories crafted for impact,
              education, and global audiences.
            </p>
          </div>
        </Container>
      </Section>

      {/* FILTER + GRID */}
      <Section className="py-16">
        <Container>
          <div ref={gridRef}>
            {/* FILTER */}
            <div className="flex gap-3 mb-12 overflow-x-auto">
              <Filter className="w-5 h-5 text-brown shrink-0" />
              {categories.map(cat => (
                <Button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  variant={activeCategory === cat ? 'primary' : 'outline'}
                  size="sm"
                  className={activeCategory === cat ? '' : 'border-brown/20 text-brown hover:border-gold hover:text-gold hover:bg-transparent'}
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => (
                <Link
                  key={project.slug}
                  href={`/portfolio/${project.slug}`}
                  className={`group relative aspect-[4/5] bg-navy overflow-hidden transition-all duration-700 ${
                    gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    loading="lazy"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="w-16 h-16 rounded-full border-2 border-cream bg-cream/10 flex items-center justify-center">
                      {project.externalLink ? (
                        <ExternalLink className="text-cream w-7 h-7" />
                      ) : (
                        <Play className="text-cream fill-cream w-7 h-7 ml-1" />
                      )}
                    </div>
                  </div>

                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-xl font-bold text-gold">
                      {project.title}
                    </h3>
                    <p className="text-cream/70 text-sm">{project.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
