'use client';

import { createContext, useCallback, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';

import { KM_DICTIONARY } from './dictionaries/km';

/**
 * Kura ships two interface languages. Khmer is the clinic floor language;
 * English stays the fallback and the language of record.
 */
export type Locale = 'en' | 'km';

export const LOCALES: readonly Locale[] = ['en', 'km'];

/**
 * Each language names itself in its own script. A user who lands in the wrong
 * language must still recognise the way back.
 */
export const LOCALE_LABELS: Readonly<Record<Locale, string>> = {
  en: 'English',
  km: 'ភាសាខ្មែរ',
};

/** English label for the language, used when writing about it in English UI. */
export const LOCALE_ENGLISH_LABELS: Readonly<Record<Locale, string>> = {
  en: 'English',
  km: 'Khmer',
};

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => undefined,
});

/**
 * Translate an English source string.
 *
 * The English string is the key: there is no separate key namespace to invent,
 * drift from, or mistranslate. A missing Khmer entry renders the English
 * source, so an incomplete dictionary degrades to the language of record
 * rather than to a blank or a key name.
 */
export type Translate = (source: string) => string;

export function translate(locale: Locale, source: string): string {
  if (locale === 'en') {
    return source;
  }

  return KM_DICTIONARY[source] ?? source;
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}

export function useT(): Translate {
  const { locale } = useContext(LocaleContext);

  return useCallback((source: string) => translate(locale, source), [locale]);
}

export type LocaleProviderProps = {
  children: ReactNode;
  locale: Locale;
  onLocaleChange?: (locale: Locale) => void;
};

/**
 * Publishes the active language to every descendant and sets `lang` so the
 * browser applies Khmer font matching, Khmer line-breaking, and the Khmer
 * typography tokens in `tokens.css`.
 */
export function LocaleProvider({ children, locale, onLocaleChange }: LocaleProviderProps) {
  const value = useMemo(
    () => ({ locale, setLocale: onLocaleChange ?? (() => undefined) }),
    [locale, onLocaleChange],
  );

  return (
    <LocaleContext.Provider value={value}>
      <div lang={locale} style={{ display: 'contents' }}>
        {children}
      </div>
    </LocaleContext.Provider>
  );
}
