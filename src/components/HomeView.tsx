import React from 'react';
import { PageLayout } from './PageLayout';
import { DecisionView } from './DecisionView';
import { OptionList } from './OptionList';
import { useDecision } from '../context/DecisionContext';
import { SEOContent } from './SEOContent';
import { FAQSection } from './FAQSection';

const HomeContent = () => {
  const { mode, setMode, t } = useDecision();

  return (
    <div className="flex flex-col gap-6xl">
      <div className="flex flex-col lg:flex-row gap-xl">
        <div className="flex-1 flex flex-col gap-xl">
          <section className="flex flex-col gap-md">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-md">
              <div className="flex flex-col gap-xxs">
                <span className="text-caption-mono text-link uppercase tracking-wider font-medium">{t('hero.badge')}</span>
                <h1 className="text-display-xl">{t('hero.title')}</h1>
                <p className="text-body-lg text-body">{t('hero.subtitle')}</p>
              </div>

              <div className="flex items-center gap-xxs bg-canvas-soft p-1 rounded-full border border-hairline w-fit">
                <button
                  onClick={() => setMode('standard')}
                  className={`px-sm py-1.5 rounded-full text-xs font-medium transition-all ${
                    mode === 'standard' ? 'bg-canvas shadow-level-1 text-ink' : 'text-body hover:text-ink'
                  }`}
                >
                  {t('mode.standard')}
                </button>
                <button
                  onClick={() => setMode('yesno')}
                  className={`px-sm py-1.5 rounded-full text-xs font-medium transition-all ${
                    mode === 'yesno' ? 'bg-canvas shadow-level-1 text-ink' : 'text-body hover:text-ink'
                  }`}
                >
                  {t('mode.yesno')}
                </button>
                <button
                  onClick={() => setMode('spinwheel')}
                  className={`px-sm py-1.5 rounded-full text-xs font-medium transition-all ${
                    mode === 'spinwheel' ? 'bg-canvas shadow-level-1 text-ink' : 'text-body hover:text-ink'
                  }`}
                >
                  {t('mode.wheel')}
                </button>
              </div>
            </div>
            
            <DecisionView />
          </section>
          
          <section className="lg:hidden">
            <OptionList />
          </section>
        </div>
        
        <aside className="hidden lg:block w-80 shrink-0">
          <div className="sticky top-60 flex flex-col gap-lg">
            <OptionList />
          </div>
        </aside>
      </div>

      <SEOContent />
      <FAQSection />
    </div>
  );
};

export const HomeView = () => {
  return (
    <PageLayout>
      <HomeContent />
    </PageLayout>
  );
};
