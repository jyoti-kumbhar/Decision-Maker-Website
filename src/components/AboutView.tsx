import React from 'react';
import { PageLayout } from './PageLayout';
import { useDecision } from '../context/DecisionContext';

const AboutContent = () => {
  const { t } = useDecision();
  return (
    <div className="w-full max-w-3xl mx-auto py-xl">
      <div className="mb-xl">
        <span className="text-caption-mono text-link uppercase tracking-wider font-medium block mb-xxs">{t('about.badge')}</span>
        <h1 className="text-display-xl mb-md">{t('about.title')}</h1>
        <p className="text-body-lg text-body">
          {t('about.desc')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mt-xl">
        <div className="p-lg rounded-xl border border-hairline bg-canvas-soft">
          <h3 className="text-heading-sm mb-xs">{t('about.simple.title')}</h3>
          <p className="text-body-md text-body">{t('about.simple.desc')}</p>
        </div>
        <div className="p-lg rounded-xl border border-hairline bg-canvas-soft">
          <h3 className="text-heading-sm mb-xs">{t('about.fast.title')}</h3>
          <p className="text-body-md text-body">{t('about.fast.desc')}</p>
        </div>
      </div>
    </div>
  );
};

export const AboutView = () => {
  return (
    <PageLayout>
      <AboutContent />
    </PageLayout>
  );
};
