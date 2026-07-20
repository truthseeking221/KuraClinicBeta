'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

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
  errorLabel = 'Copy failed',
  onCopyResult,
  resetAfter = 1800,
  successLabel = 'Copied',
  value,
  variant = 'ghost',
  size = 'sm',
  ...props
}: CopyButtonProps) {
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

  const label = state === 'success' ? successLabel : state === 'error' ? errorLabel : children ?? 'Copy';
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
