import React from 'react';
import { PageLayout } from './PageLayout';
import { HistoryView } from './HistoryView';
import { useDecision } from '../context/DecisionContext';

const HistoryContent = () => {
  const { t } = useDecision();
  return (
    <div className="flex flex-col gap-xl">
      <div className="flex flex-col gap-xxs">
        <span className="text-caption-mono text-link uppercase tracking-wider font-medium">{t('history.archives')}</span>
        <h1 className="text-display-xl">{t('history.page.title')}</h1>
        <p className="text-body-lg text-body">{t('history.page.desc')}</p>
      </div>
      
      <HistoryView />
    </div>
  );
};

export const HistoryPage = () => {
  return (
    <PageLayout>
      <HistoryContent />
    </PageLayout>
  );
};
