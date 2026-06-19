import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, type Language } from '../i18n/translations';

export type Option = {
  id: string;
  text: string;
  weight: number;
};

export type Decision = {
  id: string;
  result: string;
  options: string[];
  timestamp: number;
};

export type Mode = 'standard' | 'yesno' | 'spinwheel';

interface DecisionContextType {
  options: Option[];
  history: Decision[];
  mode: Mode;
  isWeighted: boolean;
  avoidRepeating: boolean;
  lastResult: string | null;
  theme: 'light' | 'dark';
  language: Language;
  t: (key: string) => string;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setMode: (mode: Mode) => void;
  setIsWeighted: (isWeighted: boolean) => void;
  setAvoidRepeating: (avoidRepeating: boolean) => void;
  addOption: (text: string) => void;
  removeOption: (id: string) => void;
  updateOption: (id: string, text: string, weight?: number) => void;
  clearOptions: () => void;
  pickOption: () => string | null;
  clearHistory: () => void;
}

const DecisionContext = createContext<DecisionContextType | undefined>(undefined);

export const useDecision = () => {
  const context = useContext(DecisionContext);
  if (!context) {
    throw new Error('useDecision must be used within a DecisionProvider');
  }
  return context;
};

export const DecisionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [history, setHistory] = useState<Decision[]>([]);
  const [mode, setMode] = useState<Mode>('standard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<Language>('en');
  const [isWeighted, setIsWeighted] = useState(false);
  const [avoidRepeating, setAvoidRepeating] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const savedOptions = localStorage.getItem('dm_options');
    const savedHistory = localStorage.getItem('dm_history');
    const savedSettings = localStorage.getItem('dm_settings');

    if (savedOptions) setOptions(JSON.parse(savedOptions));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedSettings) {
      const { mode, isWeighted, avoidRepeating, theme, language } = JSON.parse(savedSettings);
      setMode(mode || 'standard');
      setIsWeighted(isWeighted || false);
      setAvoidRepeating(avoidRepeating || false);
      setTheme(theme || 'light');
      setLanguage(language || 'en');
    }
    setHasLoaded(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!hasLoaded) return;
    localStorage.setItem('dm_options', JSON.stringify(options));
    localStorage.setItem('dm_history', JSON.stringify(history));
    localStorage.setItem('dm_settings', JSON.stringify({ mode, isWeighted, avoidRepeating, theme, language }));
  }, [hasLoaded, options, history, mode, isWeighted, avoidRepeating, theme, language]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const t = useCallback((key: string): string => {
    const langTranslations = translations[language] || translations.en;
    return (langTranslations as any)[key] || (translations.en as any)[key] || key;
  }, [language]);

  const addOption = useCallback((text: string) => {
    const newOption: Option = {
      id: crypto.randomUUID(),
      text,
      weight: 1,
    };
    setOptions((prev) => [...prev, newOption]);
  }, []);

  const removeOption = useCallback((id: string) => {
    setOptions((prev) => prev.filter((opt) => opt.id !== id));
  }, []);

  const updateOption = useCallback((id: string, text: string, weight?: number) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, text, weight: weight ?? opt.weight } : opt))
    );
  }, []);

  const clearOptions = useCallback(() => {
    setOptions([]);
    setLastResult(null);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const pickOption = useCallback(() => {
    if (options.length === 0) return null;

    let availableOptions = [...options];

    // Method 9: Avoid repeating the last selected option
    if (avoidRepeating && lastResult && options.length > 1) {
      availableOptions = availableOptions.filter((opt) => opt.text !== lastResult);
    }

    let selectedOption: Option;

    if (isWeighted) {
      // Method 5: Weighted choices
      const totalWeight = availableOptions.reduce((acc, opt) => acc + opt.weight, 0);
      let random = Math.random() * totalWeight;
      
      selectedOption = availableOptions[0];
      for (const opt of availableOptions) {
        if (random < opt.weight) {
          selectedOption = opt;
          break;
        }
        random -= opt.weight;
      }
    } else {
      // Method 2: Randomly select one option
      const randomIndex = Math.floor(Math.random() * availableOptions.length);
      selectedOption = availableOptions[randomIndex];
    }

    const decision: Decision = {
      id: crypto.randomUUID(),
      result: selectedOption.text,
      options: options.map((o) => o.text),
      timestamp: Date.now(),
    };

    setLastResult(selectedOption.text);
    setHistory((prev) => [decision, ...prev].slice(0, 50)); // Keep last 50

    return selectedOption.text;
  }, [options, isWeighted, avoidRepeating, lastResult]);

  return (
    <DecisionContext.Provider
      value={{
        options,
        history,
        mode,
        isWeighted,
        avoidRepeating,
        lastResult,
        theme,
        language,
        t,
        setLanguage,
        setTheme,
        toggleTheme,
        setMode,
        setIsWeighted,
        setAvoidRepeating,
        addOption,
        removeOption,
        updateOption,
        clearOptions,
        pickOption,
        clearHistory,
      }}
    >
      {children}
    </DecisionContext.Provider>
  );
};
