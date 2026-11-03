import type { Metadata } from 'next';
import Container from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Cantone Films',
  description: 'Terms governing use of the Cantone Films website.',
};

const updated = '3 November 2026';

export default function TermsPage() {
  return (
    <main className="bg-cream py-28 text-dark md:py-36">
      <Container>
        <article className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold">
            Legal
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] md:text-6xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-5 text-sm text-muted">Last updated: {updated}</p>
          <p className="mt-10 text-lg leading-8 text-text/80">
            These terms govern your use of the Cantone Films website. By using the site, you agree to these terms.
          </p>

          <div className="mt-14 space-y-12 text-base leading-8 text-text/80">
            <LegalSection title="Website use">
              <p>
                You may use this website for lawful, personal, and business purposes. You must not interfere with the site&apos;s operation, attempt unauthorised access, introduce harmful material, or use the website in a way that infringes another person&apos;s rights.
              </p>
            </LegalSection>

            <LegalSection title="Our work and intellectual property">
              <p>
                The website&apos;s content, including its films, photographs, text, branding, design, and other materials, is owned by Cantone Films or used with permission. You may not reproduce, distribute, modify, or commercially use these materials without prior written consent, except where applicable law permits it.
              </p>
            </LegalSection>

            <LegalSection title="Project enquiries">
              <p>
                Submitting an enquiry does not create a production agreement, professional engagement, or obligation to provide services. Any project work is subject to a separate written agreement covering scope, fees, timing, deliverables, and other applicable terms.
              </p>
            </LegalSection>

            <LegalSection title="Third-party links">
              <p>
                This website may link to third-party platforms, including video and social-media services. Cantone Films does not control those services and is not responsible for their content, availability, or policies.
              </p>
            </LegalSection>

            <LegalSection title="Availability and liability">
              <p>
                We aim to keep this website accurate and available, but do not guarantee that it will always be uninterrupted, error-free, or free of harmful components. To the extent permitted by law, Cantone Films is not liable for loss arising from use of, or inability to use, this website.
              </p>
            </LegalSection>

            <LegalSection title="Changes and governing law">
              <p>
                We may update these terms at any time by publishing a revised version on this page. These terms are governed by the laws applicable in the United Republic of Tanzania, without limiting any consumer protections that apply to you.
              </p>
            </LegalSection>

            <LegalSection title="Contact">
              <p>
                For questions about these terms, email{' '}
                <a className="text-gold underline underline-offset-4 hover:text-dark" href="mailto:info@cantonefilms.com">
                  info@cantonefilms.com
                </a>.
              </p>
            </LegalSection>
          </div>
        </article>
      </Container>
    </main>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-[-0.03em] text-dark">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
