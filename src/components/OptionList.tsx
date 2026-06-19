import React, { useState } from 'react';
import { useDecision } from '../context/DecisionContext';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { Plus, Trash2, AlertCircle } from 'lucide-react';

export const OptionList = () => {
  const { options, addOption, removeOption, updateOption, clearOptions, isWeighted, setIsWeighted, t } = useDecision();
  const [newOption, setNewOption] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOption.trim()) {
      addOption(newOption.trim());
      setNewOption('');
    }
  };

  return (
    <Card className="flex flex-col gap-md h-fit shadow-level-2 border border-hairline" variant="soft">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-xs">
          <h2 className="text-display-md">{t('options.title')}</h2>
          <span className="text-caption-mono text-mute">{options.length}</span>
        </div>
        {options.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearOptions} className="text-error hover:bg-error-soft px-xs h-7">
            {t('options.clear')}
          </Button>
        )}
      </div>

      <div className="space-y-sm">
        <form onSubmit={handleAdd} className="relative group">
          <Input
            placeholder={t('options.placeholder')}
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            className="pr-10 bg-canvas border-hairline-strong/20 focus:border-primary/30"
          />
          <button 
            type="submit" 
            disabled={!newOption.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-mute hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </form>

        <div className="flex items-center justify-between px-xxs">
          <label className="flex items-center gap-xs cursor-pointer group">
            <div className={`w-3 h-3 rounded-full border border-hairline-strong transition-colors ${isWeighted ? 'bg-link border-link' : 'bg-transparent group-hover:border-mute'}`} />
            <input
              type="checkbox"
              checked={isWeighted}
              onChange={(e) => setIsWeighted(e.target.checked)}
              className="hidden"
            />
            <span className="text-[13px] font-medium text-body group-hover:text-ink transition-colors">{t('options.weighted')}</span>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-xs max-h-[450px] overflow-y-auto -mx-1 px-1 scrollbar-hide">
        {options.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-xl text-mute/40 border border-dashed border-hairline rounded-md bg-canvas/30">
            <Plus className="h-6 w-6 mb-xs" />
            <p className="text-xs font-medium">{t('options.empty')}</p>
          </div>
        ) : (
          options.map((option, idx) => (
            <div 
              key={option.id} 
              className="group flex items-center gap-xs bg-canvas border border-hairline rounded-sm p-1.5 pl-3 hover:border-hairline-strong transition-all hover:shadow-sm"
            >
              <span className="text-caption-mono text-[10px] text-mute w-4 shrink-0">{idx + 1}</span>
              <input
                type="text"
                value={option.text}
                onChange={(e) => updateOption(option.id, e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-0 h-auto font-medium text-ink"
              />
              
              {isWeighted && (
                <div className="flex items-center gap-1 bg-canvas-soft border border-hairline rounded-xs px-1.5 py-0.5">
                  <span className="text-[10px] text-mute font-mono">w:</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={option.weight}
                    onChange={(e) => updateOption(option.id, option.text, parseInt(e.target.value) || 1)}
                    className="w-7 bg-transparent border-none text-[12px] p-0 text-center focus:ring-0 font-mono"
                  />
                </div>
              )}

              <button
                onClick={() => removeOption(option.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-mute hover:text-error transition-all"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {options.length > 0 && (
        <div className="pt-xs border-t border-hairline flex items-center gap-xs text-mute">
          <AlertCircle className="h-3 w-3" />
          <p className="text-[11px] font-medium">
            {t('options.edit.hint')}
          </p>
        </div>
      )}
    </Card>
  );
};

