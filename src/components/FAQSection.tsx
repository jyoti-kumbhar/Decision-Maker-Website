import React from 'react';
import { Card } from './ui/Card';
import { useDecision } from '../context/DecisionContext';

export const FAQSection = () => {
  const { t } = useDecision();
  
  const faqs = [
    { q: t('faq.q1.question'), a: t('faq.q1.answer') },
    { q: t('faq.q2.question'), a: t('faq.q2.answer') },
    { q: t('faq.q3.question'), a: t('faq.q3.answer') },
    { q: t('faq.q4.question'), a: t('faq.q4.answer') },
    { q: t('faq.q5.question'), a: t('faq.q5.answer') },
    { q: t('faq.q6.question'), a: t('faq.q6.answer') },
    { q: t('faq.q7.question'), a: t('faq.q7.answer') },
  ];

  return (
    <section className="mt-12 flex flex-col gap-xl border-t border-hairline pt-24 pb-24 w-full">
      <div className="flex flex-col items-center text-center gap-xxs px-lg">
        <span className="text-caption-mono text-link uppercase tracking-wider font-medium">{t('nav.brand')}</span>
        <h2 className="text-display-lg">{t('faq.title')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg w-full max-w-7xl mx-auto px-lg">
        {faqs.map((faq, index) => (
          <Card key={index} variant="outline" className="flex flex-col gap-sm h-full">
            <h3 className="text-display-md text-ink">{faq.q}</h3>
            <p className="text-body-md leading-relaxed text-body">
              {faq.a}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};
