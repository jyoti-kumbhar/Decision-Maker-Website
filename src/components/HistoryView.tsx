import React from 'react';
import { useDecision } from '../context/DecisionContext';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { History, Clock, Trash2 } from 'lucide-react';

export const HistoryView = () => {
  const { history, clearHistory, t } = useDecision();

  if (history.length === 0) return null;

  return (
    <section className="flex flex-col gap-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-sm">
          <History className="h-5 w-5 text-mute" />
          <h2 className="text-display-sm">{t('history.title')}</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={clearHistory} className="text-mute hover:text-error">
          <Trash2 className="h-4 w-4 mr-2" />
          {t('history.clear')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {history.map((item) => (
          <Card key={item.id} variant="soft" className="flex flex-col gap-sm">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-ink">{item.result}</span>
              <div className="flex items-center gap-xs text-mute">
                <Clock className="h-3 w-3" />
                <span className="text-[10px] uppercase font-mono">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-xxs">
              {item.options.slice(0, 4).map((opt, i) => (
                <span key={i} className="text-[11px] text-body px-1.5 py-0.5 bg-canvas rounded-sm border border-hairline">
                  {opt}
                </span>
              ))}
              {item.options.length > 4 && (
                <span className="text-[11px] text-mute">+{item.options.length - 4} {t('history.more')}</span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
