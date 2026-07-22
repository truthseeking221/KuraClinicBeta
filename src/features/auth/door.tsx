'use client';

import { useEffect, useState } from 'react';

import { useT } from '../../components/foundations/i18n';
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  Input,
  MailIcon,
  MobileDeviceIcon,
  OtpInput,
  PhoneInput,
  type Country,
  type PhoneValue,
} from '../../components/ui';

import { AuthShell } from './auth-shell';
import {
  DOOR_COPY,
  DOOR_COUNTRIES,
  isValidEmail,
  isValidLocalPhone,
  verifyDoorCode,
} from './logic';
import type { AccountRecord, DoorMethod, DoorRoute, DoorStep } from './logic';
import {
  DEMO_ACCOUNTS,
  DEMO_OTP,
  DEMO_RESEND_COOLDOWN_SECS,
} from './demo-data';
import styles from './door.module.css';

const DOOR_PHONE_COUNTRIES = DOOR_COUNTRIES.map(
  (country) => country.iso,
) as Country[];

export type DoorProps = {
  /** Verified OTP routes include the canonical identifier. */
  onRouted: (route: DoorRoute, identifier?: string) => void;
  /** Decision fixtures; defaults cover the demo journeys. */
  accounts?: readonly AccountRecord[];
  expectedCode?: string;
  resendCooldownSecs?: number;
  initialMethod?: DoorMethod;
  /** Route-level throttle simulation; anti-enum still reports "sent" otherwise. */
  onRequestCode?: (identifier: string) => 'sent' | 'throttled';
};

/**
 * The clinic door: one screen where sign-in IS sign-up. Phone OTP is
 * primary, with email OTP as its alternate. Every path converges on the same
 * account per identifier. Requesting a code never discloses whether the
 * identifier already exists; revoked accounts are blocked on every method.
 */
export function Door({
  accounts = DEMO_ACCOUNTS,
  expectedCode = DEMO_OTP,
  initialMethod = 'phone',
  onRequestCode,
  onRouted,
  resendCooldownSecs = DEMO_RESEND_COOLDOWN_SECS,
}: DoorProps) {
  const t = useT();
  const [step, setStep] = useState<DoorStep>('form');
  const [method, setMethod] = useState<DoorMethod>(initialMethod);
  const [focusMethod, setFocusMethod] = useState<DoorMethod | null>(null);
  const [countryIso, setCountryIso] = useState<Country>(
    DOOR_COUNTRIES[0].iso as Country,
  );
  const [phone, setPhone] = useState<PhoneValue>();
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [identifier, setIdentifier] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [resendLeft, setResendLeft] = useState(0);

  useEffect(() => {
    if (resendLeft <= 0) return;
    const timer = setInterval(
      () => setResendLeft((seconds) => seconds - 1),
      1000,
    );
    return () => clearInterval(timer);
  }, [resendLeft]);

  const dialCode =
    DOOR_COUNTRIES.find((country) => country.iso === countryIso)?.dialCode ??
    DOOR_COUNTRIES[0].dialCode;
  const localPhone = phone?.startsWith(dialCode)
    ? phone.slice(dialCode.length)
    : (phone ?? '');

  function canonicalIdentifier(): string | null {
    if (method === 'phone') {
      if (!phone || !isValidLocalPhone(localPhone)) {
        setFormError(t(DOOR_COPY.invalidPhone));
        return null;
      }
      return phone;
    }
    if (!isValidEmail(email)) {
      setFormError(t(DOOR_COPY.invalidEmail));
      return null;
    }
    return email.trim().toLowerCase();
  }

  function sendCode() {
    const canonical = canonicalIdentifier();
    if (!canonical) return;
    if (onRequestCode?.(canonical) === 'throttled') {
      setFormError(t(DOOR_COPY.throttled));
      return;
    }
    setFormError(null);
    setIdentifier(canonical);
    setCode('');
    setCodeError(null);
    setResendLeft(resendCooldownSecs);
    setStep('verify');
  }

  function switchMethod() {
    const nextMethod = method === 'phone' ? 'email' : 'phone';
    setMethod(nextMethod);
    setFocusMethod(nextMethod);
    setFormError(null);
  }

  function verify() {
    const outcome = verifyDoorCode(identifier, code, expectedCode, accounts);
    if (outcome.kind === 'invalid-code') {
      setCodeError(t(DOOR_COPY.invalidCode));
      return;
    }
    if (outcome.kind === 'revoked') {
      setStep('revoked');
      return;
    }
    onRouted(outcome.route, identifier);
  }

  function backToForm() {
    setStep('form');
    setCode('');
    setCodeError(null);
  }

  return (
    <AuthShell footer={t('Need help? support@kura.med')} width="sm">
      <Card as="section" aria-label={t('Sign in')}>
        <CardContent className={styles.body}>
          {step === 'form' ? (
            <>
              <header className={styles.header}>
                <h1 className={styles.title}>{t('Sign in to Kura')}</h1>
                <p className={styles.subtitle}>
                  {t('New here? Verify your code to create an account.')}
                </p>
              </header>

              <div className={styles.methodGroup}>
                {method === 'phone' ? (
                  <PhoneInput
                    autoFocus={focusMethod === 'phone'}
                    countries={DOOR_PHONE_COUNTRIES}
                    defaultCountry="KH"
                    error={formError}
                    label={t('Phone number')}
                    onChange={(nextPhone) => {
                      setPhone(nextPhone);
                      setFormError(null);
                    }}
                    onCountryChange={(country) => {
                      if (country) setCountryIso(country);
                    }}
                    placeholder="12 345 678"
                    required
                    size="lg"
                    value={phone}
                  />
                ) : (
                  <Input
                    autoFocus={focusMethod === 'email'}
                    error={formError}
                    inputMode="email"
                    label={t('Email')}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setFormError(null);
                    }}
                    placeholder="you@clinic.example"
                    required
                    type="email"
                    value={email}
                  />
                )}
              </div>

              <Button fullWidth onClick={sendCode} variant="primary">
                {method === 'phone' ? t('Send SMS code') : t('Send email code')}
              </Button>

              <div aria-hidden="true" className={styles.divider}>
                <span>{t('or')}</span>
              </div>

              <Button
                fullWidth
                leadingIcon={
                  method === 'phone' ? (
                    <MailIcon aria-hidden="true" />
                  ) : (
                    <MobileDeviceIcon aria-hidden="true" />
                  )
                }
                onClick={switchMethod}
                variant="outline"
              >
                {method === 'phone'
                  ? t('Use email instead')
                  : t('Use phone instead')}
              </Button>
            </>
          ) : null}

          {step === 'verify' ? (
            <>
              <header className={styles.header}>
                <h1 className={styles.title}>{t('Enter your code')}</h1>
                <p className={styles.subtitle}>
                  {t('We sent a code to')}{' '}
                  <strong className={styles.identifier}>{identifier}</strong>.{' '}
                  {t('It expires in 10 minutes.')}
                </p>
              </header>

              <OtpInput
                autoFocus
                error={codeError}
                fullWidth
                label={method === 'phone' ? t('SMS code') : t('Email code')}
                onValueChange={(next) => {
                  setCode(next);
                  setCodeError(null);
                }}
                value={code}
              />

              <Button
                disabled={code.length !== 6}
                fullWidth
                onClick={verify}
                variant="primary"
              >
                {t('Verify and continue')}
              </Button>

              <div className={styles.verifyActions}>
                <Button
                  disabled={resendLeft > 0}
                  onClick={() => {
                    setCode('');
                    setResendLeft(resendCooldownSecs);
                  }}
                  size="sm"
                  variant="ghost"
                >
                  {resendLeft > 0
                    ? `${t('Resend in')} ${resendLeft}s`
                    : t('Resend code')}
                </Button>
                <Button onClick={backToForm} size="sm" variant="ghost">
                  {method === 'phone'
                    ? t('Use a different number')
                    : t('Use a different email')}
                </Button>
              </div>
            </>
          ) : null}

          {step === 'revoked' ? (
            <Alert tone="danger">
              <AlertTitle>{t('This account has been disabled')}</AlertTitle>
              <AlertDescription>
                {t(
                  'Sign-in is blocked on every method for this account. If you believe this is a mistake, contact support@kura.med.',
                )}
              </AlertDescription>
              <AlertAction>
                <Button onClick={backToForm} size="sm" variant="outline">
                  {t('Back to sign-in')}
                </Button>
              </AlertAction>
            </Alert>
          ) : null}
        </CardContent>
      </Card>
    </AuthShell>
  );
}
