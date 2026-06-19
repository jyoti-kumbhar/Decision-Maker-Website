import React from 'react';
import { Card } from './ui/Card';
import { useDecision } from '../context/DecisionContext';

export const SEOContent = () => {
  const { t } = useDecision();
  return (
    <section className="mt-12 flex flex-col gap-xl border-t border-hairline pt-24">
      <div className="flex flex-col items-center text-center gap-xxs">
        <span className="text-caption-mono text-link uppercase tracking-wider font-medium">{t('seo.badge')}</span>
        <h2 className="text-display-lg">{t('seo.title')}</h2>
        <p className="text-body-lg text-body md:whitespace-nowrap">{t('seo.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        <Card variant="soft" className="flex flex-col gap-md">
          <h3 className="text-display-md text-ink">{t('seo.card1.title')}</h3>
          <p className="text-body-md leading-relaxed text-body">
            {t('seo.card1.desc')}
          </p>
        </Card>

        <Card variant="soft" className="flex flex-col gap-md">
          <h3 className="text-display-md text-ink">{t('seo.card2.title')}</h3>
          <p className="text-body-md leading-relaxed text-body">
            {t('seo.card2.desc')}
          </p>
        </Card>

        <Card variant="soft" className="flex flex-col gap-md">
          <h3 className="text-display-md text-ink">{t('seo.card3.title')}</h3>
          <p className="text-body-md leading-relaxed text-body">
            {t('seo.card3.desc')}
          </p>
        </Card>

        <Card variant="soft" className="flex flex-col gap-md">
          <h3 className="text-display-md text-ink">{t('seo.card4.title')}</h3>
          <p className="text-body-md leading-relaxed text-body">
            {t('seo.card4.desc')}
          </p>
        </Card>

        <Card variant="soft" className="flex flex-col gap-md">
          <h3 className="text-display-md text-ink">{t('seo.card5.title')}</h3>
          <p className="text-body-md leading-relaxed text-body">
            {t('seo.card5.desc')}
          </p>
        </Card>

        <Card variant="soft" className="flex flex-col gap-md">
          <h3 className="text-display-md text-ink">{t('seo.card6.title')}</h3>
          <p className="text-body-md leading-relaxed text-body">
            {t('seo.card6.desc')}
          </p>
        </Card>

        <Card variant="soft" className="flex flex-col gap-md lg:col-span-2">
          <h3 className="text-display-md text-ink">{t('seo.card7.title')}</h3>
          <p className="text-body-md leading-relaxed text-body">
            {t('seo.card7.desc')}
          </p>
        </Card>

        <Card variant="soft" className="flex flex-col gap-md">
          <h3 className="text-display-md text-ink">{t('seo.card8.title')}</h3>
          <p className="text-body-md leading-relaxed text-body">
            {t('seo.card8.desc')}
          </p>
        </Card>
      </div>
    </section>
  );
};
