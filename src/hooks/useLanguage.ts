import { useEffect, useState } from 'react';

export type Lang = 'ES' | 'EN';

/** Reads the site-wide language, kept in sync via the `languageChange` event. */
export const useLanguage = (): Lang => {
  const [language, setLanguage] = useState<Lang>(
    () => ((typeof window !== 'undefined' && (window as any).currentLanguage) || 'ES') as Lang
  );

  useEffect(() => {
    const handler = (event: Event) => {
      setLanguage((event as CustomEvent).detail as Lang);
    };
    window.addEventListener('languageChange', handler);
    const current = (window as any).currentLanguage as Lang | undefined;
    if (current && current !== language) setLanguage(current);
    return () => window.removeEventListener('languageChange', handler);
  }, [language]);

  return language;
};

export const t = <T,>(language: Lang, es: T, en: T): T => (language === 'EN' ? en : es);
