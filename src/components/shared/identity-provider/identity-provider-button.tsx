import { useId } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import {
  Button,
  GoogleProviderMark,
  LoginIcon,
  TelegramProviderMark,
} from '../../ui';
import type { ButtonProps, IdentityProviderBrand } from '../../ui';

import styles from './identity-provider-button.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function providerLeadingIcon(providerBrand?: IdentityProviderBrand) {
  switch (providerBrand) {
    case 'google':
      return <GoogleProviderMark aria-hidden="true" />;
    case 'telegram':
      return <TelegramProviderMark aria-hidden="true" />;
    default:
      return <LoginIcon aria-hidden="true" />;
  }
}

export type IdentityProviderAvailability = 'available' | 'unavailable';

export type IdentityProviderButtonProps = Omit<
  ButtonProps,
  | 'asChild'
  | 'children'
  | 'disclosure'
  | 'fullWidth'
  | 'leadingIcon'
  | 'size'
  | 'trailingIcon'
  | 'variant'
> & {
  /** Display name supplied by the configured identity-provider record. */
  providerName: string;
  /**
   * An approved canonical Kura provider mark selected by the auth
   * configuration. Omit it for a provider without an approved brand mark.
   */
  providerBrand?: IdentityProviderBrand;
  /** Derived from the workspace's identity-provider configuration. */
  availability?: IdentityProviderAvailability;
  /** A visible fallback explains why a configured provider cannot be used. */
  unavailableReason?: ReactNode;
};

/**
 * A configured external identity-provider entry point. The owning auth flow
 * supplies its configuration and handles redirect, state validation, session
 * recovery, and the work-email fallback; this pattern never performs OAuth.
 */
export function IdentityProviderButton({
  availability = 'available',
  className,
  disabled = false,
  loading = false,
  providerBrand,
  providerName,
  unavailableReason,
  ...props
}: IdentityProviderButtonProps) {
  const unavailable = availability === 'unavailable';
  const statusId = useId().replaceAll(':', '');
  const reason = unavailable
    ? unavailableReason ?? `Sign-in with ${providerName} is unavailable. Use your work email instead.`
    : undefined;

  return (
    <div
      className={styles.root}
      data-availability={availability}
      data-slot="identity-provider-button"
    >
      <Button
        {...props}
        aria-describedby={reason ? `identity-provider-status-${statusId}` : props['aria-describedby']}
        className={className}
        disabled={disabled || unavailable}
        fullWidth
        leadingIcon={providerLeadingIcon(providerBrand)}
        loading={loading}
        size="lg"
        variant="outline"
      >
        Continue with {providerName}
      </Button>
      {reason ? (
        <p id={`identity-provider-status-${statusId}`} className={styles.status} role="status">
          {reason}
        </p>
      ) : null}
    </div>
  );
}

export type IdentityProviderButtonGroupProps = ComponentPropsWithoutRef<'div'> & {
  /** Gives assistive technology a stable name for the mutually alternative sign-in methods. */
  label?: string;
};

/** A vertical, responsive list of independently selectable configured providers. */
export function IdentityProviderButtonGroup({
  className,
  label = 'Alternative sign-in methods',
  ...props
}: IdentityProviderButtonGroupProps) {
  return (
    <div
      aria-label={label}
      className={joinClasses(styles.group, className)}
      data-slot="identity-provider-button-group"
      role="group"
      {...props}
    />
  );
}
