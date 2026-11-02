'use client';

import { site } from '@/data/site';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { openContactModal } from '@/components/modals/contactModalEvents';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ArrowUp,
} from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: site.social?.instagram || '#', label: 'Instagram' },
  { icon: Facebook, href: site.social?.facebook || '#', label: 'Facebook' },
  { icon: Twitter, href: site.social?.twitter || '#', label: 'Twitter' },
  { icon: Linkedin, href: site.social?.linkedin || '#', label: 'LinkedIn' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative text-cream overflow-hidden">
      {/* Modern background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brown to-gold" />
      <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl -z-10" />
      <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-cream/5 blur-3xl -z-10" />

      {/* Top accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Main grid */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          {/* Brand + Contact */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-14 w-48 overflow-hidden">
                <Image
                  src="/LogoCantone–Alpha.webp"
                  alt="Cantone Films logo"
                  fill
                  className="object-contain scale-125 origin-center invert brightness-50 contrast-110"
                />
              </div>
              {/* <span className="text-cream text-lg font-semibold tracking-wide">
                {site.name}
              </span> */}
            </Link>

            <p className="text-cream/80 max-w-2xl leading-relaxed text-2xl md:text-3xl font-bold">
              {site.tagline}
            </p>

            <div className="grid gap-5 text-xl md:text-2xl font-bold">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-cream/80 hover:text-gold transition"
              >
                <Mail className="w-5 h-5 md:w-6 md:h-6" />
                {site.email}
              </a>

              <a
                href={`tel:${site.phone}`}
                className="flex items-center gap-3 text-cream/80 hover:text-gold transition"
              >
                <Phone className="w-5 h-5 md:w-6 md:h-6" />
                {site.phone}
              </a>

              <div className="flex items-center gap-3 text-cream/70">
                <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                Dar es Salaam, Tanzania
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-4 pt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  aria-label={label}
                className="w-14 h-14 flex items-center justify-center border border-cream/20 hover:border-gold hover:text-gold transition"
              >
                  <Icon className="w-7 h-7" />
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Panel */}
          <div className="relative overflow-hidden rounded-3xl border border-cream/10 bg-gradient-to-br from-brown to-gold p-8 md:p-10">
            <div className="absolute inset-0 opacity-[0.05]" style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(189, 128, 24, 0.4) 1px, transparent 0)',
              backgroundSize: '36px 36px',
            }} />
            <div className="relative z-10 space-y-6">
              <div>
                <p className="text-cream text-base md:text-lg tracking-widest uppercase font-semibold mb-3">
                  Ready to collaborate
                </p>
                <h3 className="text-4xl md:text-5xl font-bold text-cream leading-tight">
                  Let&apos;s shape a story that lasts.
                </h3>
              </div>
              <p className="text-cream/80 text-lg md:text-xl leading-relaxed font-semibold">
                Share your goals and we&apos;ll recommend the best approach for
                your project and audience.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={openContactModal}
                  variant="primary"
                  size="md"
                  className="md:px-7 md:py-3"
                >
                  Start a Project
                </Button>
                <Button
                  href={`https://wa.me/${site.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline-light"
                  size="md"
                  className="md:px-7 md:py-3"
                >
                  Chat on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-14 h-px bg-cream/20" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-lg md:text-xl text-cream/60 font-semibold">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>

          <a
            href="https://cyrex.co.tz"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-gold"
          >
            Powered by Cyrex Technologies
          </a>

          <Button
            onClick={scrollToTop}
            variant="ghost"
            size="icon"
            className="h-11 w-11 border border-cream/30 text-cream hover:border-gold hover:text-gold"
            ariaLabel="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.35) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
    </footer>
  );
}
