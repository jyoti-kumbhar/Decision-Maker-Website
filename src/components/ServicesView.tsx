import React from 'react';
import { PageLayout } from './PageLayout';
import { useDecision } from '../context/DecisionContext';

const ServicesContent = () => {
  const { t } = useDecision();
  return (
    <div className="w-full max-w-3xl mx-auto py-xl">
      <div className="mb-xl">
        <span className="text-caption-mono text-link uppercase tracking-wider font-medium block mb-xxs">{t('services.badge')}</span>
        <h1 className="text-display-xl mb-md">{t('services.title')}</h1>
        <p className="text-body-lg text-body">
          {t('services.desc')}
        </p>
      </div>
      
      <div className="flex flex-col gap-lg mt-xl">
        <div className="flex flex-col gap-xs p-lg rounded-xl border border-hairline bg-canvas-soft">
          <h3 className="text-heading-md">{t('services.wheel.title')}</h3>
          <p className="text-body-md text-body">{t('services.wheel.desc')}</p>
        </div>
        <div className="flex flex-col gap-xs p-lg rounded-xl border border-hairline bg-canvas-soft">
          <h3 className="text-heading-md">{t('services.yesno.title')}</h3>
          <p className="text-body-md text-body">{t('services.yesno.desc')}</p>
        </div>
        <div className="flex flex-col gap-xs p-lg rounded-xl border border-hairline bg-canvas-soft">
          <h3 className="text-heading-md">{t('services.lists.title')}</h3>
          <p className="text-body-md text-body">{t('services.lists.desc')}</p>
        </div>
      </div>
    </div>
  );
};

export const ServicesView = () => {
  return (
    <PageLayout>
      <ServicesContent />
    </PageLayout>
  );
};
