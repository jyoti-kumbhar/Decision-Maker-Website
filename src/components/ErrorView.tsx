import React from 'react';
import { PageLayout } from './PageLayout';
import { useDecision } from '../context/DecisionContext';
import { Button } from './ui/Button';

interface ErrorViewProps {
  code: '404' | '500';
}

const ErrorContent: React.FC<ErrorViewProps> = ({ code }) => {
  const { t } = useDecision();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-display-2xl font-bold text-link opacity-20">{code}</span>
        <h1 className="text-display-xl">{t(`error.${code}.title`)}</h1>
        <p className="text-body-lg text-body max-w-md mx-auto">
          {t(`error.${code}.desc`)}
        </p>
      </div>
      
      <Button 
        variant="primary" 
        size="lg" 
        onClick={() => window.location.href = '/'}
      >
        {t('error.btn.home')}
      </Button>
    </div>
  );
};

export const ErrorView: React.FC<ErrorViewProps> = ({ code }) => {
  return (
    <PageLayout>
      <ErrorContent code={code} />
    </PageLayout>
  );
};
