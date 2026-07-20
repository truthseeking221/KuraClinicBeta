'use client';

import { useEffect, useState } from 'react';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  Input,
  OtpInput,
  PhoneInput,
  type Country,
  type PhoneValue,
} from '../../components/ui';
import { IdentityProviderButton } from '../../components/shared';

import { AuthShell } from './auth-shell';
import {
  DOOR_COPY,
  DOOR_COUNTRIES,
  isValidEmail,
  isValidLocalPhone,
  verifyDoorCode,
} from './logic';
import type { AccountRecord, DoorMethod, DoorRoute, DoorStep } from './logic';
import { DEMO_ACCOUNTS, DEMO_OTP, DEMO_RESEND_COOLDOWN_SECS } from './demo-data';
import styles from './door.module.css';

const DOOR_PHONE_COUNTRIES = DOOR_COUNTRIES.map((country) => country.iso) as Country[];

export type DoorProps = {
  onRouted: (route: DoorRoute) => void;
  /** Decision fixtures; defaults cover the demo journeys. */
  accounts?: readonly AccountRecord[];
  expectedCode?: string;
  resendCooldownSecs?: number;
  initialMethod?: DoorMethod;
  googleAvailability?: 'available' | 'unavailable';
  /** Route-level throttle simulation; anti-enum still reports "sent" otherwise. */
  onRequestCode?: (identifier: string) => 'sent' | 'throttled';
};

/**
 * The clinic door: one screen where sign-in IS sign-up. Phone OTP is
 * primary, with email OTP available as an in-form alternate and Google kept
 * as a separate provider path. Every path converges on the same account per
 * identifier. Requesting a code never discloses whether the identifier
 * already exists; revoked accounts are blocked on every method.
 */
export function Door({
  accounts = DEMO_ACCOUNTS,
  expectedCode = DEMO_OTP,
  googleAvailability = 'available',
  initialMethod = 'phone',
  onRequestCode,
  onRouted,
  resendCooldownSecs = DEMO_RESEND_COOLDOWN_SECS,
}: DoorProps) {
  const [step, setStep] = useState<DoorStep>('form');
  const [method, setMethod] = useState<DoorMethod>(initialMethod);
  const [focusMethod, setFocusMethod] = useState<DoorMethod | null>(null);
  const [countryIso, setCountryIso] = useState<Country>(DOOR_COUNTRIES[0].iso as Country);
  const [phone, setPhone] = useState<PhoneValue>();
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [identifier, setIdentifier] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [resendLeft, setResendLeft] = useState(0);

  useEffect(() => {
    if (resendLeft <= 0) return;
    const timer = setInterval(() => setResendLeft((seconds) => seconds - 1), 1000);
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
        setFormError(DOOR_COPY.invalidPhone);
        return null;
      }
      return phone;
    }
    if (!isValidEmail(email)) {
      setFormError(DOOR_COPY.invalidEmail);
      return null;
    }
    return email.trim().toLowerCase();
  }

  function sendCode() {
    const canonical = canonicalIdentifier();
    if (!canonical) return;
    if (onRequestCode?.(canonical) === 'throttled') {
      setFormError(DOOR_COPY.throttled);
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
      setCodeError(DOOR_COPY.invalidCode);
      return;
    }
    if (outcome.kind === 'revoked') {
      setStep('revoked');
      return;
    }
    onRouted(outcome.route);
  }

  function backToForm() {
    setStep('form');
    setCode('');
    setCodeError(null);
  }

  return (
    <AuthShell footer="Need help? support@kura.med" width="sm">
      <Card as="section" aria-label="Sign in">
        <CardContent className={styles.body}>
          {step === 'form' ? (
            <>
              <header className={styles.header}>
                <h1 className={styles.title}>Sign in to Kura</h1>
                <p className={styles.subtitle}>
                  New here? Your first verified code creates your account.
                </p>
              </header>

              <div className={styles.methodGroup}>
                {method === 'phone' ? (
                  <PhoneInput
                    autoFocus={focusMethod === 'phone'}
                    countries={DOOR_PHONE_COUNTRIES}
                    defaultCountry="KH"
                    error={formError}
                    label="Phone number"
                    onChange={(nextPhone) => {
                      setPhone(nextPhone);
                      setFormError(null);
                    }}
                    onCountryChange={(country) => {
                      if (country) setCountryIso(country);
                    }}
                    placeholder="12 345 678"
                    required
                    value={phone}
                  />
                ) : (
                  <Input
                    autoFocus={focusMethod === 'email'}
                    error={formError}
                    inputMode="email"
                    label="Email"
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
                <Button
                  className={styles.methodSwitch}
                  onClick={switchMethod}
                  size="sm"
                  variant="link"
                >
                  Use {method === 'phone' ? 'email' : 'phone'} instead
                </Button>
              </div>

              <Button fullWidth onClick={sendCode} variant="primary">
                {method === 'phone' ? 'Send SMS code' : 'Send email code'}
              </Button>

              <div aria-hidden="true" className={styles.divider}>
                <span>or</span>
              </div>

              <IdentityProviderButton
                availability={googleAvailability}
                onClick={() => onRouted('wizard')}
                providerBrand="google"
                providerName="Google"
                unavailableReason={DOOR_COPY.googleUnavailable}
              />
            </>
          ) : null}

          {step === 'verify' ? (
            <>
              <header className={styles.header}>
                <h1 className={styles.title}>Enter the code</h1>
                <p className={styles.subtitle}>
                  Sent to <strong className={styles.identifier}>{identifier}</strong>.
                  The code expires in 10 minutes.
                </p>
              </header>

              <OtpInput
                autoFocus
                error={codeError}
                label={method === 'phone' ? 'SMS code' : 'Email code'}
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
                Verify &amp; continue
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
                  {resendLeft > 0 ? `Resend in ${resendLeft}s` : 'Resend code'}
                </Button>
                <Button onClick={backToForm} size="sm" variant="ghost">
                  Use a different {method === 'phone' ? 'number' : 'email'}
                </Button>
              </div>
            </>
          ) : null}

          {step === 'revoked' ? (
            <Alert tone="danger">
              <AlertTitle>This account has been disabled</AlertTitle>
              <AlertDescription>
                Sign-in is blocked on every method for this account. If you
                believe this is a mistake, contact support@kura.med.
              </AlertDescription>
              <AlertAction>
                <Button onClick={backToForm} size="sm" variant="outline">
                  Back to sign-in
                </Button>
              </AlertAction>
            </Alert>
          ) : null}
        </CardContent>
      </Card>
    </AuthShell>
  );
}
