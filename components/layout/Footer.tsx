import { site } from '@/data/site';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: site.social?.instagram || '#', label: 'Instagram' },
  { icon: Facebook, href: site.social?.facebook || '#', label: 'Facebook' },
  { icon: Twitter, href: site.social?.twitter || '#', label: 'Twitter' },
  { icon: Linkedin, href: site.social?.linkedin || '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-dark text-cream">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-cream/60 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-start">
          <a href="/terms/" className="transition-colors hover:text-gold">
            Terms &amp; Conditions
          </a>
          <a href="/privacy/" className="transition-colors hover:text-gold">
            Privacy Policy
          </a>
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        </div>

        <div className="flex items-center justify-center gap-5 md:justify-end">
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-cream/65 transition-colors hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <span className="h-4 w-px bg-cream/15" />
          <a
            href="https://cyrex.co.tz"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            Powered by Cyrex Technologies
          </a>
        </div>
      </div>
    </footer>
  );
}
