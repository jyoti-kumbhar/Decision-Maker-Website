import React, { useState, useEffect } from 'react';
import { useDecision } from '../context/DecisionContext';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Sparkles, Target, RotateCw } from 'lucide-react';

export const DecisionView = () => {
  const { mode, options, pickOption, lastResult, avoidRepeating, setAvoidRepeating, addOption, clearOptions, t } = useDecision();
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    setResult(null);
  }, [mode]);

  const handlePick = () => {
    if (options.length < 2 && mode !== 'yesno') return;
    
    setIsSpinning(true);
    setResult(null);

    // Simulate "thinking" or "spinning"
    setTimeout(() => {
      const picked = pickOption();
      setResult(picked);
      setIsSpinning(false);
    }, mode === 'spinwheel' ? 3000 : 600);
  };

  const handleYesNo = (type: 'yesno' | 'custom') => {
    clearOptions();
    if (type === 'yesno') {
      addOption(t('yes'));
      addOption(t('no'));
    }
  };

  if (mode === 'yesno') {
    return (
      <Card variant="marketing-large" className="flex flex-col items-center justify-center gap-xl min-h-[300px] relative overflow-hidden">
        <div className="absolute top-4 left-4">
          <Badge variant="secondary">{t('mode.yesno')}</Badge>
        </div>

        <AnimatePresence mode="wait">
          {!result && !isSpinning ? (
            <motion.div 
              key="prompt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-lg"
            >
              <h2 className="text-display-lg text-center">{t('yesno.question')}</h2>
              <div className="flex gap-md">
                <Button size="lg" onClick={() => { handleYesNo('yesno'); handlePick(); }}>
                  {t('yesno.btn')}
                </Button>
              </div>
            </motion.div>
          ) : isSpinning ? (
            <motion.div 
              key="spinning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-md"
            >
              <RefreshCw className="h-12 w-12 animate-spin text-link" />
              <p className="text-body font-medium">{t('yesno.spinning')}</p>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-lg"
            >
              <span className="text-caption-mono text-mute uppercase tracking-widest">{t('yesno.answer')}</span>
              <h2 className={`text-6xl font-bold ${result === t('yes') || result === 'Yes' ? 'text-success' : 'text-error'}`}>
                {result}
              </h2>
              <Button variant="secondary" onClick={() => setResult(null)}>
                {t('yesno.retry')}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    );
  }

  if (mode === 'spinwheel') {
    return (
      <Card variant="marketing-large" className="flex flex-col items-center justify-center gap-xl min-h-[400px] relative">
         <div className="absolute top-4 left-4">
          <Badge variant="secondary">{t('mode.wheel')}</Badge>
        </div>

        {options.length < 2 ? (
          <div className="text-center flex flex-col items-center gap-md">
            <Target className="h-12 w-12 text-mute opacity-20" />
            <p className="text-body text-lg">{t('wheel.empty')}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-xl w-full">
            <div className="relative h-64 w-64">
               {/* Arrow */}
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21l-12-18h24z" />
                </svg>
              </div>
              
              <motion.div 
                className="h-full w-full rounded-full border-4 border-ink relative overflow-hidden bg-canvas shadow-level-4"
                animate={isSpinning ? { rotate: 360 * 5 + Math.random() * 360 } : { rotate: 0 }}
                transition={isSpinning ? { duration: 3, ease: [0.45, 0.05, 0.55, 0.95] } : { duration: 0 }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  {options.map((opt, i) => {
                    const angle = 360 / options.length;
                    const startAngle = i * angle;
                    const endAngle = (i + 1) * angle;
                    
                    // SVG path for a wedge
                    const x1 = 50 + 50 * Math.cos(Math.PI * startAngle / 180);
                    const y1 = 50 + 50 * Math.sin(Math.PI * startAngle / 180);
                    const x2 = 50 + 50 * Math.cos(Math.PI * endAngle / 180);
                    const y2 = 50 + 50 * Math.sin(Math.PI * endAngle / 180);
                    
                    const largeArcFlag = angle > 180 ? 1 : 0;
                    const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                    
                    return (
                      <g key={opt.id}>
                        <path 
                          d={pathData} 
                          fill={i % 2 === 0 ? 'var(--color-canvas)' : 'var(--color-canvas-soft-2)'}
                        />
                        <text
                          x="72"
                          y="50"
                          transform={`rotate(${startAngle + angle / 2}, 50, 50)`}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="var(--color-ink)"
                          fontSize="4"
                          fontWeight="bold"
                          className="select-none"
                        >
                          {opt.text.length > 15 ? opt.text.substring(0, 12) + '...' : opt.text}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-md"
                >
                  <p className="text-body">{t('wheel.result')}</p>
                  <h3 className="text-display-md text-link">{result}</h3>
                  <Button variant="secondary" size="sm" onClick={() => setResult(null)}>{t('wheel.btn.again')}</Button>
                </motion.div>
              ) : (
                <Button size="lg" onClick={handlePick} disabled={isSpinning}>
                  {isSpinning ? t('wheel.btn.spinning') : t('wheel.btn.spin')}
                </Button>
              )}
            </AnimatePresence>
          </div>
        )}
      </Card>
    );
  }

  return (
    <Card variant="marketing-large" className="flex flex-col items-center justify-center gap-xl min-h-[300px] relative overflow-hidden">
       <div className="absolute top-4 left-4">
          <Badge variant="secondary">{t('mode.standard')}</Badge>
        </div>

      {options.length < 2 ? (
        <div className="text-center flex flex-col items-center gap-md">
          <Sparkles className="h-12 w-12 text-mute opacity-20" />
          <p className="text-body text-lg">{t('standard.empty')}</p>
        </div>
      ) : (
        <>
          <AnimatePresence mode="wait">
            {!result && !isSpinning ? (
              <motion.div 
                key="action"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-lg"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-xs w-full max-w-lg px-md">
                  {options.slice(0, 6).map((opt, i) => (
                    <motion.div
                      key={opt.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-canvas-soft border border-hairline rounded-md p-xs px-sm flex items-center gap-xs shadow-sm group hover:border-hairline-strong transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-mute group-hover:bg-primary transition-colors shrink-0" />
                      <span className="text-xs font-medium text-body truncate">{opt.text}</span>
                    </motion.div>
                  ))}
                  {options.length > 6 && (
                    <div className="col-span-full text-center">
                      <span className="text-caption-mono text-mute text-[10px]">
                        + {options.length - 6} {t('options.more')}
                      </span>
                    </div>
                  )}
                </div>
                <Button size="lg" className="w-64" onClick={handlePick}>
                  {t('standard.btn.pick')}
                </Button>
              </motion.div>
            ) : isSpinning ? (
              <motion.div 
                key="spinning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-md"
              >
                <div className="h-20 w-20 flex items-center justify-center">
                  <RotateCw className="h-12 w-12 animate-spin text-primary" />
                </div>
                <p className="text-body font-medium">{t('standard.spinning')}</p>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-md"
              >
                 <span className="text-caption-mono text-mute uppercase tracking-widest">{t('standard.result')}</span>
                <div className="bg-primary p-xl rounded-lg shadow-level-4 transform transition-all hover:scale-105 cursor-pointer">
                  <h2 className="text-on-primary text-display-lg text-center">{result}</h2>
                </div>
                <div className="flex gap-sm mt-md">
                  <Button variant="secondary" onClick={handlePick}>
                    {t('standard.btn.again')}
                  </Button>
                  <Button variant="ghost" onClick={() => setResult(null)}>
                    {t('standard.btn.back')}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-xl flex items-center gap-md">
            <label className="flex items-center gap-xs cursor-pointer group">
              <input
                type="checkbox"
                checked={avoidRepeating}
                onChange={(e) => setAvoidRepeating(e.target.checked)}
                className="rounded-sm border-hairline text-primary focus:ring-0"
              />
              <span className="text-xs text-mute group-hover:text-body transition-colors">{t('standard.avoid')}</span>
            </label>
          </div>
        </>
      )}
    </Card>
  );
};
