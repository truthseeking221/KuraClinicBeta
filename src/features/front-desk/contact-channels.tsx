'use client';

import { useEffect, useState } from 'react';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Input,
  SegmentedToggle,
  Select,
  SpinnerGapIcon,
} from '../../components/ui';
import { DEMO_OTP } from './demo-data';
import { UNVERIFIED_REASONS } from './types';
import type { FrontDeskPatient } from './types';
import styles from './contact-channels.module.css';

const RESEND_COOLDOWN_SECONDS = 30;

export type ContactChannelsProps = {
  patient: FrontDeskPatient;
  onUpdate: (patch: Partial<FrontDeskPatient>) => void;
};

/**
 * Step-2 contact channels. Channel-first: the desk asks how the patient wants
 * to be reached, then runs that channel's ceremony. Telegram hands the QR to
 * the customer display and the patient shares their own number — the desk
 * never types it. The unverified escape records a mandatory reason, mirroring
 * the backend trusted-desk door where verification is assurance, not a gate.
 *
 * PROTOTYPE: no Telegram or SMS integration exists upstream — ceremonies are
 * driven by explicit demo controls, never hidden timers.
 */
export function ContactChannels({ onUpdate, patient }: ContactChannelsProps) {
  const [channel, setChannel] = useState<'sms' | 'telegram' | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [unverifiedOpen, setUnverifiedOpen] = useState(false);
  const [reasonCode, setReasonCode] = useState('');
  const [reasonNote, setReasonNote] = useState('');

  const phoneValid = patient.phoneNumber.replace(/\D/g, '').length >= 8;
  const anyVerified = patient.otpVerified || patient.telegramVerified;

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  function sendCode() {
    setOtpSent(true);
    setCooldown(RESEND_COOLDOWN_SECONDS);
  }

  // Unverified-by-choice reading: the recorded reason leads, verify stays open.
  if (patient.unverifiedReason && !anyVerified) {
    const reasonLabel =
      UNVERIFIED_REASONS.find((reason) => reason.code === patient.unverifiedReason?.code)?.label ??
      patient.unverifiedReason.code;
    return (
      <div className={styles.channel}>
        <h3 className={styles.subTitle}>Contact channel</h3>
        <Alert tone="warning">
          <AlertTitle>Unverified · {reasonLabel}</AlertTitle>
          <AlertDescription>
            {patient.unverifiedReason.note
              ? `${patient.unverifiedReason.note} — reminders`
              : 'Reminders'}{' '}
            and results need a verified channel; the patient may miss them.
          </AlertDescription>
          <AlertAction>
            <Button
              onClick={() => onUpdate({ unverifiedReason: null })}
              size="sm"
              variant="outline"
            >
              Verify instead
            </Button>
          </AlertAction>
        </Alert>
      </div>
    );
  }

  return (
    <div className={styles.channel}>
      <div className={styles.channelHeader}>
        <h3 className={styles.subTitle}>Contact channel</h3>
        <span className={styles.requiredTag}>Required</span>
      </div>

      {patient.telegramVerified ? (
        <div className={styles.verifiedRow}>
          <Badge variant="success">Telegram verified</Badge>
          <span className={styles.verifiedMeta}>
            {patient.telegramHandle} · {patient.countryCode} {patient.phoneNumber}
          </span>
          <Button
            onClick={() =>
              onUpdate({
                telegramVerified: false,
                telegramHandle: undefined,
                preferredChannel: patient.otpVerified ? 'sms' : null,
              })
            }
            size="sm"
            variant="ghost"
          >
            Change
          </Button>
        </div>
      ) : null}
      {patient.otpVerified ? (
        <div className={styles.verifiedRow}>
          <Badge variant="success">SMS verified</Badge>
          <span className={styles.verifiedMeta}>
            {patient.countryCode} {patient.phoneNumber}
          </span>
          <Button
            onClick={() =>
              onUpdate({
                otpVerified: false,
                preferredChannel: patient.telegramVerified ? 'telegram' : null,
              })
            }
            size="sm"
            variant="ghost"
          >
            Edit to re-verify
          </Button>
        </div>
      ) : null}

      {anyVerified ? (
        <p className={styles.assuranceNote}>
          Confirms the patient controls this channel — it does not prove who they are.
        </p>
      ) : null}

      {patient.otpVerified && patient.telegramVerified ? (
        <SegmentedToggle
          label="Preferred channel"
          labelVisible
          onValueChange={(value) =>
            onUpdate({ preferredChannel: value as 'sms' | 'telegram' })
          }
          options={[
            { value: 'telegram', label: 'Telegram' },
            { value: 'sms', label: 'SMS' },
          ]}
          value={patient.preferredChannel ?? 'telegram'}
        />
      ) : null}

      {/* Picking a channel is a value choice, not two competing actions; the
          unverified escape sits on the same line as its alternative. */}
      {!anyVerified && channel === null ? (
        <div className={styles.choiceRow}>
          <SegmentedToggle
            label="Verify by"
            labelVisible
            onValueChange={(value) => setChannel(value as 'sms' | 'telegram')}
            options={[
              { value: 'telegram', label: 'Telegram' },
              { value: 'sms', label: 'SMS' },
            ]}
            value=""
          />
          {!unverifiedOpen ? (
            <Button onClick={() => setUnverifiedOpen(true)} size="sm" variant="ghost">
              Continue without verifying
            </Button>
          ) : null}
        </div>
      ) : null}

      {!patient.telegramVerified && channel === 'telegram' ? (
        <div className={styles.telegramCard}>
          <div className={styles.telegramText}>
            <p className={styles.telegramTitle}>Telegram QR pushed to the patient display</p>
            <p className={styles.hint}>
              Ask the patient to scan it with their phone camera — their number fills in when
              they share it.
            </p>
          </div>
          <span aria-hidden className={styles.waiting}>
            <SpinnerGapIcon className={styles.waitingSpinner} size={16} />
            Waiting for the patient…
          </span>
          <div className={styles.telegramActions}>
            {/* Demo stand-in for the patient completing the share on their phone. */}
            <Button
              onClick={() => {
                const first = (patient.name || 'patient').split(/\s+/)[0].toLowerCase();
                onUpdate({
                  telegramVerified: true,
                  telegramHandle: `t.me/${first}`,
                  phoneNumber: patient.phoneNumber || '93 555 0142',
                  preferredChannel: 'telegram',
                  unverifiedReason: null,
                });
                setChannel(null);
              }}
              size="sm"
              variant="outline"
            >
              Simulate patient share
            </Button>
            <Button onClick={() => setChannel(null)} size="sm" variant="ghost">
              Cancel
            </Button>
          </div>
        </div>
      ) : null}

      {!patient.otpVerified && channel === 'sms' ? (
        <>
          <div className={styles.phoneRow}>
            <Input
              label="Phone"
              inputMode="tel"
              onChange={(event) => onUpdate({ phoneNumber: event.target.value })}
              placeholder="12 345 678"
              prefix={patient.countryCode}
              required
              value={patient.phoneNumber}
            />
            <Button
              disabled={!phoneValid || cooldown > 0}
              onClick={sendCode}
              variant="secondary"
            >
              {cooldown > 0
                ? `Resend in ${cooldown}s`
                : otpSent
                  ? 'Resend code'
                  : 'Send SMS code'}
            </Button>
          </div>
          {otpSent ? (
            <div className={styles.phoneRow}>
              <Input
                error={otpError}
                inputMode="numeric"
                label="SMS code"
                maxLength={6}
                onChange={(event) => {
                  setOtpInput(event.target.value);
                  setOtpError(null);
                }}
                value={otpInput}
              />
              <Button
                disabled={otpInput.length !== 6}
                onClick={() => {
                  if (otpInput === DEMO_OTP) {
                    onUpdate({
                      otpVerified: true,
                      preferredChannel: patient.preferredChannel ?? 'sms',
                      unverifiedReason: null,
                    });
                    setChannel(null);
                  } else {
                    setOtpError('Code does not match.');
                  }
                }}
                variant="primary"
              >
                Verify
              </Button>
            </div>
          ) : null}
        </>
      ) : null}

      {!anyVerified ? (
        unverifiedOpen ? (
          <div className={styles.unverifiedForm}>
            <Select
              label="Why does it stay unverified?"
              onChange={(event) => setReasonCode(event.target.value)}
              options={[
                { value: '', label: 'Choose a reason' },
                ...UNVERIFIED_REASONS.map((reason) => ({
                  value: reason.code,
                  label: reason.label,
                })),
              ]}
              value={reasonCode}
            />
            {reasonCode === 'other' ? (
              <Input
                label="Reason"
                onChange={(event) => setReasonNote(event.target.value)}
                placeholder="What happened"
                value={reasonNote}
              />
            ) : null}
            <div className={styles.unverifiedActions}>
              <Button
                disabled={reasonCode === '' || (reasonCode === 'other' && reasonNote.trim() === '')}
                onClick={() => {
                  onUpdate({
                    unverifiedReason: {
                      code: reasonCode as NonNullable<
                        FrontDeskPatient['unverifiedReason']
                      >['code'],
                      note: reasonCode === 'other' ? reasonNote.trim() : undefined,
                    },
                  });
                  setUnverifiedOpen(false);
                }}
                size="sm"
                variant="secondary"
              >
                Save unverified
              </Button>
              <Button onClick={() => setUnverifiedOpen(false)} size="sm" variant="ghost">
                Back
              </Button>
            </div>
          </div>
        ) : null
      ) : null}

      <LanguageField onUpdate={onUpdate} patient={patient} />
    </div>
  );
}

/**
 * Preferred language belongs with the channel: it decides what language the
 * reminder, intake link, and results notice go out in.
 */
function LanguageField({ onUpdate, patient }: ContactChannelsProps) {
  return (
    <Select
      className={styles.languageField}
      label="Language for messages"
      onChange={(event) =>
        onUpdate({
          preferredLanguage: event.target.value as FrontDeskPatient['preferredLanguage'],
        })
      }
      options={[
        { value: 'Khmer', label: 'Khmer' },
        { value: 'English', label: 'English' },
      ]}
      value={patient.preferredLanguage}
    />
  );
}
