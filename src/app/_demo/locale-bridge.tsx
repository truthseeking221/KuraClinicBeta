'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';

import { LocaleProvider } from '../../components/foundations/i18n';

import { useDemoSession } from './demo-session';

/**
 * Wiring only: feeds the stored session language into the Storybook-owned
 * LocaleProvider and mirrors it onto the document element, so assistive
 * technology announces the right language for the whole page.
 */
export function DemoLocaleProvider({ children }: { children: ReactNode }) {
  const { session, update } = useDemoSession();

  useEffect(() => {
    document.documentElement.lang = session.locale;
  }, [session.locale]);

  return (
    <LocaleProvider locale={session.locale} onLocaleChange={(locale) => update({ locale })}>
      {children}
    </LocaleProvider>
  );
}
