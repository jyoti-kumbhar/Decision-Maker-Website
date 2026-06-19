import React, { useState } from 'react';
import { PageLayout } from './PageLayout';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useDecision } from '../context/DecisionContext';

const ContactContent = () => {
  const { t } = useDecision();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Using Formspree - Reliable and easy to set up
      // 1. Create a free account at https://formspree.io/
      // 2. Create a new form and copy the "Form ID"
      const response = await fetch('https://formspree.io/f/xbdeejkn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-xl">
      <div className="mb-xl">
        <span className="text-caption-mono text-link uppercase tracking-wider font-medium block mb-xxs">{t('contact.badge')}</span>
        <h1 className="text-display-xl mb-md">{t('contact.title')}</h1>
        <p className="text-body-lg text-body">
          {t('contact.desc')}
        </p>
      </div>
      
      {status === 'success' ? (
        <div className="p-xl rounded-xl border border-hairline bg-canvas-soft text-center animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2 className="text-display-sm mb-md">{t('contact.form.success')}</h2>
          <Button onClick={() => setStatus('idle')} variant="secondary">{t('yesno.retry')}</Button>
        </div>
      ) : (
        <form className="flex flex-col gap-lg mt-xl p-lg rounded-xl border border-hairline bg-canvas-soft" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-xs">
            <label htmlFor="name" className="text-sm font-medium text-body">{t('contact.form.name')}</label>
            <Input 
              id="name" 
              placeholder={t('contact.form.placeholder.name')} 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-xs">
            <label htmlFor="email" className="text-sm font-medium text-body">{t('contact.form.email')}</label>
            <Input 
              id="email" 
              type="email" 
              placeholder={t('contact.form.placeholder.email')} 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-xs">
            <label htmlFor="message" className="text-sm font-medium text-body">{t('contact.form.message')}</label>
            <textarea 
              id="message" 
              className="w-full px-md py-sm rounded-md border border-hairline bg-canvas text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px] transition-all"
              placeholder={t('contact.form.placeholder.message')}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          {status === 'error' && (
            <div className="p-md rounded-md bg-error/10 border border-error/20 text-error text-sm">
              {t('contact.form.error')}
            </div>
          )}

          <Button 
            className="w-full md:w-fit" 
            disabled={status === 'submitting'}
            type="submit"
          >
            {status === 'submitting' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('yesno.spinning')}
              </span>
            ) : t('contact.form.send')}
          </Button>
        </form>
      )}
    </div>
  );
};

export const ContactView = () => {
  return (
    <PageLayout>
      <ContactContent />
    </PageLayout>
  );
};
