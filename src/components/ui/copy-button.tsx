'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { useT } from '../foundations/i18n';
import { Button } from './button';
import { CheckIcon, CopyIcon, XIcon } from './icons';
import type { ButtonProps } from './button';

export type CopyButtonState = 'idle' | 'success' | 'error';

export type CopyButtonProps = Omit<
  ButtonProps,
  'children' | 'leadingIcon' | 'loading' | 'onClick'
> & {
  value: string;
  children?: ReactNode;
  successLabel?: string;
  errorLabel?: string;
  resetAfter?: number;
  onCopyResult?: (state: CopyButtonState) => void;
};

export function CopyButton({
  children,
  errorLabel,
  onCopyResult,
  resetAfter = 1800,
  successLabel,
  value,
  variant = 'ghost',
  size = 'sm',
  ...props
}: CopyButtonProps) {
  const t = useT();
  const resolvedErrorLabel = errorLabel ?? t('Copy failed');
  const resolvedSuccessLabel = successLabel ?? t('Copied');
  const [state, setState] = useState<CopyButtonState>('idle');

  useEffect(() => {
    if (state === 'idle') {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setState('idle');
    }, resetAfter);

    return () => window.clearTimeout(timeoutId);
  }, [resetAfter, state]);

  async function handleCopy() {
    if (!value.trim() || !navigator.clipboard) {
      setState('error');
      onCopyResult?.('error');
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setState('success');
      onCopyResult?.('success');
    } catch {
      setState('error');
      onCopyResult?.('error');
    }
  }

  const label =
    state === 'success'
      ? resolvedSuccessLabel
      : state === 'error'
        ? resolvedErrorLabel
        : children ?? t('Copy');
  const icon =
    state === 'success' ? (
      <CheckIcon aria-hidden="true" />
    ) : state === 'error' ? (
      <XIcon aria-hidden="true" />
    ) : (
      <CopyIcon aria-hidden="true" />
    );

  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      leadingIcon={icon}
      aria-live="polite"
      data-copy-state={state}
      onClick={handleCopy}
    >
      {label}
    </Button>
  );
}
