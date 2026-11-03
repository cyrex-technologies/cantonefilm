import type { Metadata } from 'next';
import Container from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Privacy Policy | Cantone Films',
  description: 'How Cantone Films collects, uses, and protects personal information.',
};

const updated = '3 November 2026';

export default function PrivacyPage() {
  return (
    <main className="bg-cream py-28 text-dark md:py-36">
      <Container>
        <article className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold">
            Legal
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-5 text-sm text-muted">Last updated: {updated}</p>
          <p className="mt-10 text-lg leading-8 text-text/80">
            Cantone Films respects your privacy. This policy explains how we collect and use personal information when you visit our website or contact us about a project.
          </p>

          <div className="mt-14 space-y-12 text-base leading-8 text-text/80">
            <LegalSection title="Information we collect">
              <p>
                When you submit our contact form, we collect the information you provide: your name, email address, phone number, organisation, project type, and message. We may also process limited technical information needed to secure the form, such as your IP address for rate limiting.
              </p>
              <p>
                We use Google Analytics to understand general website use. Analytics may use cookies or similar technologies to collect device, browser, and usage information.
              </p>
            </LegalSection>

            <LegalSection title="How we use your information">
              <p>We use your information to respond to enquiries, discuss potential work, operate and secure the website, improve our services, and meet any applicable legal obligations.</p>
            </LegalSection>

            <LegalSection title="Sharing and retention">
              <p>
                We do not sell personal information. We may share it with service providers that help us host the website, deliver email, or measure website use, only where necessary for those services or where required by law.
              </p>
              <p>
                We retain enquiry information only for as long as reasonably needed to respond, manage our professional relationship, maintain records, resolve issues, or meet legal obligations.
              </p>
            </LegalSection>

            <LegalSection title="Your choices and rights">
              <p>
                Subject to applicable law, you may request access to, correction of, deletion of, restriction of, or objection to the processing of your personal information. You may also withdraw consent where processing is based on consent and request portability where applicable.
              </p>
              <p>
                Tanzania&apos;s Personal Data Protection Act, 2022 establishes protections for personal data, and the Personal Data Protection Commission describes available data-subject rights. You may contact us first with a concern and may have the right to lodge a complaint with the relevant authority.
              </p>
            </LegalSection>

            <LegalSection title="Cookies and third-party services">
              <p>
                You can control cookies through your browser settings. Disabling some cookies may affect how third-party services work. This website may link to third-party websites or platforms; their privacy practices are governed by their own policies.
              </p>
            </LegalSection>

            <LegalSection title="Changes and contact">
              <p>
                We may update this policy from time to time. The latest version will always be published on this page. For privacy questions or requests, email us at{' '}
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
