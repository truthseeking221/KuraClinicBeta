'use client';

import { useEffect, useState } from 'react';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  Input,
  OtpInput,
  SegmentedToggle,
  Select,
  SpinnerGapIcon,
  TelegramProviderMark,
} from '../../components/ui';
import { useT } from '../../components/foundations/i18n';
import { DEMO_OTP } from './demo-data';
import { UNVERIFIED_REASONS } from './types';
import type { FrontDeskPatient } from './types';
import styles from './contact-channels.module.css';

const RESEND_COOLDOWN_SECONDS = 30;

function formatWaitingTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

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
  const t = useT();
  // SMS is the desk default so the block has work to do in its first frame.
  // An empty channel picker rendered a card with nothing in it and pushed the
  // real task one click away; Telegram stays one click away instead.
  const [channel, setChannel] = useState<'sms' | 'telegram'>('sms');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [unverifiedOpen, setUnverifiedOpen] = useState(false);
  const [reasonCode, setReasonCode] = useState('');
  const [reasonNote, setReasonNote] = useState('');

  const phoneValid = patient.phoneNumber.replace(/\D/g, '').length >= 8;
  const anyVerified = patient.otpVerified || patient.telegramVerified;
  const waitingForTelegram = channel === 'telegram' && !anyVerified;
  const [waitingSeconds, setWaitingSeconds] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  // Elapsed reading for an indeterminate wait: the desk has no way to know
  // how long the ceremony has been running otherwise, and no timeout exists
  // to tell them when to give up and fall back to SMS themselves.
  useEffect(() => {
    if (!waitingForTelegram) {
      setWaitingSeconds(0);
      return;
    }
    const interval = setInterval(() => setWaitingSeconds((value) => value + 1), 1000);
    return () => clearInterval(interval);
  }, [waitingForTelegram]);

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
      <Card as="section" className={styles.channel} variant="outline">
        <h3 className={styles.subTitle}>{t('Contact channel')}</h3>
        <Alert tone="warning">
          <AlertTitle>{t('Unverified')} · {t(reasonLabel)}</AlertTitle>
          <AlertDescription>
            {patient.unverifiedReason.note
              ? `${patient.unverifiedReason.note} — ${t('reminders')}`
              : t('Reminders')}{' '}
            {t('and results need a verified channel; the patient may miss them.')}
          </AlertDescription>
          <AlertAction>
            <Button
              onClick={() => onUpdate({ unverifiedReason: null })}
              size="sm"
              variant="outline"
            >
              {t('Verify instead')}
            </Button>
          </AlertAction>
        </Alert>
      </Card>
    );
  }

  return (
    <Card as="section" className={styles.channel} variant="outline">
      {/* No "Required" tag: the phone field carries the marker, and the step
          footer states the real rule — verify, or record why not. */}
      <h3 className={styles.subTitle}>{t('Contact channel')}</h3>

      {anyVerified ? (
        <div className={styles.verifiedSummary}>
          {patient.telegramVerified ? (
            <div className={styles.verifiedRow}>
              <Badge variant="success">{t('Telegram verified')}</Badge>
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
                variant="link"
              >
                {t('Change')}
              </Button>
            </div>
          ) : null}
          {patient.otpVerified ? (
            <div className={styles.verifiedRow}>
              <Badge variant="success">{t('SMS verified')}</Badge>
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
                variant="link"
              >
                {t('Edit to re-verify')}
              </Button>
            </div>
          ) : null}

          <p className={styles.assuranceNote}>
            {t('Confirms the patient controls this channel — it does not prove who they are.')}
          </p>
        </div>
      ) : null}

      {patient.otpVerified && patient.telegramVerified ? (
        <SegmentedToggle
          label={t('Preferred channel')}
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

      {/* Waiting on the patient's own phone. This is the channel card's only
          content while it runs, so it needs no well of its own — the state
          leads, the two facts the desk cannot guess follow. */}
      {waitingForTelegram ? (
        <div className={styles.telegramWait}>
          <div className={styles.telegramText}>
            <p className={styles.telegramTitle}>
              <SpinnerGapIcon aria-hidden className={styles.waitingSpinner} size={16} />
              {t('Waiting for the patient to scan')}
              <span className={styles.waitingElapsed}>{formatWaitingTime(waitingSeconds)}</span>
            </p>
            <p className={styles.hint}>
              {t(
                'The QR is on the patient display. Their number fills in when they share it.',
              )}
            </p>
          </div>
          {/* The real escape sits alone: it is a genuine desk action, the same
              class as every other button on this card. */}
          <div className={styles.escapeRow}>
            <Button onClick={() => setChannel('sms')} size="sm" variant="ghost">
              {t('Use SMS instead')}
            </Button>
          </div>
          {/* Demo stand-in for the patient completing the share on their own
              phone — not a desk action, so it never shares a row or a size
              with one. Smaller, on its own line, last. */}
          <div className={styles.escapeRow}>
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
                setChannel('sms');
              }}
              size="xs"
              variant="ghost"
            >
              {t('Simulate patient share')}
            </Button>
          </div>
        </div>
      ) : null}

      {/* Once any channel is verified the ceremony is done — a verified row
          plus a live "send a code" form would ask the desk to redo settled work. */}
      {!anyVerified && channel === 'sms' ? (
        <>
          <div className={styles.phoneRow}>
            <Input
              label={t('Phone')}
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
                ? `${t('Resend in')} ${cooldown}s`
                : otpSent
                  ? t('Resend code')
                  : t('Send SMS code')}
            </Button>
          </div>
          {otpSent ? (
            <>
              <OtpInput
                className={styles.codeField}
                error={otpError}
                fullWidth
                label={t('SMS code')}
                onValueChange={(next) => {
                  setOtpInput(next);
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
                    setChannel('sms');
                  } else {
                    setOtpError(t('Code does not match.'));
                  }
                }}
                variant="primary"
              >
                {t('Verify')}
              </Button>
            </>
          ) : null}
          {/* Both ways out sit under the action they replace — the Nextdoor
              "try another method" placement. A bare escape floating beside the
              primary reads as label text, not a control. */}
          {!unverifiedOpen ? (
            <div className={styles.escapeRow}>
              <Button onClick={() => setChannel('telegram')} size="sm" variant="ghost">
                <TelegramProviderMark aria-hidden="true" size={16} />
                {t('Use Telegram instead')}
              </Button>
              <Button onClick={() => setUnverifiedOpen(true)} size="sm" variant="ghost">
                {t('Continue without verifying')}
              </Button>
            </div>
          ) : null}
        </>
      ) : null}

      {!anyVerified ? (
        unverifiedOpen ? (
          <div className={styles.unverifiedForm}>
            <Select
              label={t('Why does it stay unverified?')}
              onChange={(event) => setReasonCode(event.target.value)}
              options={[
                { value: '', label: t('Choose a reason') },
                ...UNVERIFIED_REASONS.map((reason) => ({
                  value: reason.code,
                  label: t(reason.label),
                })),
              ]}
              value={reasonCode}
            />
            {reasonCode === 'other' ? (
              <Input
                label={t('Reason')}
                onChange={(event) => setReasonNote(event.target.value)}
                placeholder={t('What happened')}
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
                {t('Save unverified')}
              </Button>
              <Button onClick={() => setUnverifiedOpen(false)} size="sm" variant="ghost">
                {t('Back')}
              </Button>
            </div>
          </div>
        ) : null
      ) : null}

      <LanguageField onUpdate={onUpdate} patient={patient} />
    </Card>
  );
}

/**
 * Preferred language belongs with the channel: it decides what language the
 * reminder, intake link, and results notice go out in.
 */
function LanguageField({ onUpdate, patient }: ContactChannelsProps) {
  const t = useT();
  return (
    <Select
      className={styles.languageField}
      label={t('Language for messages')}
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
