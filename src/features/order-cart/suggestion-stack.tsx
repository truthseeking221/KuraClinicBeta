'use client';

import { useT } from '../../components/foundations/i18n';
import { Button, MoneyText } from '../../components/ui';
import type { CartSuggestion, CartSuggestionKind } from './types';
import styles from './suggestion-stack.module.css';

/**
 * Kind semantics are locked: an exact-match saves silently, an upsell offers,
 * a redundancy warns and may be dismissed, a missing dependency demands.
 * Order comes from the engine and is preserved — never re-sorted here.
 */
const KIND_META: Record<
  CartSuggestionKind,
  { tone: 'success' | 'info' | 'warning' | 'danger'; role: 'status' | 'alert'; dismissible: boolean }
> = {
  exact_match: { tone: 'success', role: 'status', dismissible: false },
  upsell: { tone: 'info', role: 'status', dismissible: false },
  redundancy: { tone: 'warning', role: 'alert', dismissible: true },
  dependency_fill: { tone: 'danger', role: 'alert', dismissible: false },
};

export type SuggestionStackProps = {
  suggestions: CartSuggestion[];
  onAccept?: (suggestion: CartSuggestion) => void;
  onDismiss?: (suggestion: CartSuggestion) => void;
};

export function SuggestionStack({ onAccept, onDismiss, suggestions }: SuggestionStackProps) {
  const t = useT();
  if (suggestions.length === 0) return null;
  return (
    <div className={styles.stack}>
      {suggestions.map((suggestion) => {
        const meta = KIND_META[suggestion.kind];
        return (
          <div
            className={styles.suggestion}
            data-tone={meta.tone}
            key={suggestion.id}
            role={meta.role}
          >
            <div className={styles.text}>
              <p className={styles.title}>{t(suggestion.title)}</p>
              {suggestion.detail ? <p className={styles.detail}>{t(suggestion.detail)}</p> : null}
            </div>
            {suggestion.deltaMinor ? (
              <span className={styles.delta} data-direction={suggestion.deltaDirection ?? 'save'}>
                {suggestion.deltaDirection === 'add' ? '+' : '−'}
                <MoneyText currency="USD" minor={suggestion.deltaMinor} />
              </span>
            ) : null}
            <div className={styles.actions}>
              <Button
                onClick={() => onAccept?.(suggestion)}
                size="xs"
                variant={suggestion.kind === 'redundancy' ? 'outline' : 'secondary'}
              >
                {t(suggestion.actionLabel)}
              </Button>
              {meta.dismissible && onDismiss ? (
                <Button onClick={() => onDismiss(suggestion)} size="xs" variant="ghost">
                  {t('Keep as is')}
                </Button>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
