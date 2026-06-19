import React from 'react';
import { PageLayout } from './PageLayout';
import { useDecision } from '../context/DecisionContext';

const PrivacyContent = () => {
  const { t } = useDecision();
  return (
    <div className="w-full max-w-3xl mx-auto py-xl px-lg">
      <div className="mb-xl">
        <h1 className="text-display-xl mb-md">{t('privacy.title')}</h1>
        <p className="text-body-md text-mute mb-lg">
          Last updated: June 17, 2026
        </p>
      </div>

      <div className="flex flex-col gap-xl text-body-md text-body">
        <section className="flex flex-col gap-sm">
          <h2 className="text-heading-sm font-semibold text-ink">1. Introduction</h2>
          <p className="leading-relaxed">
            Welcome to Decision Maker. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us.
          </p>
        </section>

        <section className="flex flex-col gap-sm">
          <h2 className="text-heading-sm font-semibold text-ink">2. Information We Collect</h2>
          <p className="leading-relaxed">
            We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services or otherwise when you contact us.
          </p>
          <div className="p-md rounded-lg border border-hairline bg-canvas-soft-2 mt-xs">
            <p className="font-medium text-ink mb-xxs">Data Stored Locally</p>
            <p className="text-sm">We use local storage to save your decision history and preferences. This data stays on your device and is not transmitted to our servers unless specifically requested (e.g., for syncing features if implemented).</p>
          </div>
        </section>

        <section className="flex flex-col gap-sm">
          <h2 className="text-heading-sm font-semibold text-ink">3. How We Use Your Information</h2>
          <p className="leading-relaxed">
            We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>
        </section>

        <section className="flex flex-col gap-sm">
          <h2 className="text-heading-sm font-semibold text-ink">4. Cookies and Tracking Technologies</h2>
          <p className="leading-relaxed">
            We may use cookies and similar tracking technologies to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
          </p>
        </section>

        <section className="flex flex-col gap-sm">
          <h2 className="text-heading-sm font-semibold text-ink">5. Changes to This Privacy Policy</h2>
          <p className="leading-relaxed">
            We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible.
          </p>
        </section>

        <div className="mt-xl pt-xl border-t border-hairline">
          <a href="/" className="text-link hover:text-link-deep font-medium flex items-center gap-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {t('nav.home')}
          </a>
        </div>
      </div>
    </div>
  );
};

export const PrivacyView = () => {
  return (
    <PageLayout>
      <PrivacyContent />
    </PageLayout>
  );
};
