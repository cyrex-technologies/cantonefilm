'use client';

import { useState } from 'react';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import { homeContent } from '@/data/home';
import { site } from '@/data/site';
import { useInView } from '@/hooks/useInView';
import { ArrowRight } from 'lucide-react';

type ContactFormState = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

const initialState: ContactFormState = {
  name: '',
  email: '',
  projectType: '',
  message: '',
};

export default function CTASection() {
  const [sectionRef, inView] = useInView({ threshold: 0.15 });
  const [formData, setFormData] = useState<ContactFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const section = homeContent.contact;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('service', formData.projectType);
      payload.append('message', formData.message);

      const response = await fetch('https://usebasin.com/f/9ff4d58c8d07', {
        method: 'POST',
        body: payload,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      setFormData(initialState);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-navy py-24 text-cream md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(189,128,24,0.18),transparent_32%)]" />

      <Container>
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-1000 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">
            {section.eyebrow}
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-tight text-cream md:text-5xl lg:text-6xl">
            {section.title}
            <span className="block text-gold italic">{section.emphasis}</span>
          </h2>
          <p className="mt-6 text-base leading-8 text-cream/75 md:text-lg">
            {section.description}
          </p>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-[2rem] border border-gold/15 bg-cream/10 backdrop-blur sm:mt-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="border-b border-gold/15 p-8 lg:border-b-0 lg:border-r lg:p-10">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold/80">
                  Email
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 block text-lg font-semibold text-cream transition-colors hover:text-gold"
                >
                  {site.email}
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold/80">
                  Phone
                </p>
                <a
                  href={`tel:${site.phone}`}
                  className="mt-2 block text-lg font-semibold text-cream transition-colors hover:text-gold"
                >
                  {site.phone}
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold/80">
                  Web
                </p>
                <span className="mt-2 block text-lg font-semibold text-cream">
                  www.cantonefilms.com
                </span>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold/80">
                  Instagram
                </p>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-lg font-semibold text-cream transition-colors hover:text-gold"
                >
                  @cantonefilms
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 p-8 lg:p-10">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-cream/80">
                  Your Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                  className="w-full rounded-2xl border border-gold/20 bg-white/90 px-4 py-3 text-navy placeholder:text-brown/45 focus:border-gold focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-cream/80">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-2xl border border-gold/20 bg-white/90 px-4 py-3 text-navy placeholder:text-brown/45 focus:border-gold focus:outline-none"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-cream/80">
                Project Type
              </span>
              <input
                type="text"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                placeholder="e.g. Documentary, Feature Film, Institutional"
                required
                className="w-full rounded-2xl border border-gold/20 bg-white/90 px-4 py-3 text-navy placeholder:text-brown/45 focus:border-gold focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-cream/80">
                Message
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                required
                rows={7}
                className="w-full rounded-2xl border border-gold/20 bg-white/90 px-4 py-3 text-navy placeholder:text-brown/45 focus:border-gold focus:outline-none"
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isSubmitting}
                rightIcon={<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>

              {submitStatus === 'success' && (
                <p className="text-sm font-medium text-gold">
                  Message sent successfully.
                </p>
              )}

              {submitStatus === 'error' && (
                <p className="text-sm font-medium text-red-300">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
