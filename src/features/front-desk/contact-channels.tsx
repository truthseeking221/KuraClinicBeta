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
  SegmentedToggle,
  Select,
  SpinnerGapIcon,
} from '../../components/ui';
import { useT } from '../../components/foundations/i18n';
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
      <div className={styles.channelHeader}>
        <h3 className={styles.subTitle}>{t('Contact channel')}</h3>
        <span className={styles.requiredTag}>{t('Required')}</span>
      </div>

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
            variant="ghost"
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
            variant="ghost"
          >
            {t('Edit to re-verify')}
          </Button>
        </div>
      ) : null}

      {anyVerified ? (
        <p className={styles.assuranceNote}>
          {t('Confirms the patient controls this channel — it does not prove who they are.')}
        </p>
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

      {!anyVerified && channel === 'telegram' ? (
        <div className={styles.telegramCard}>
          <div className={styles.telegramText}>
            <p className={styles.telegramTitle}>
              {t('Telegram QR pushed to the patient display')}
            </p>
            <p className={styles.hint}>
              {t(
                'Ask the patient to scan it with their phone camera — their number fills in when they share it.',
              )}
            </p>
          </div>
          <span aria-hidden className={styles.waiting}>
            <SpinnerGapIcon className={styles.waitingSpinner} size={16} />
            {t('Waiting for the patient…')}
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
                setChannel('sms');
              }}
              size="sm"
              variant="outline"
            >
              {t('Simulate patient share')}
            </Button>
            <Button onClick={() => setChannel('sms')} size="sm" variant="ghost">
              {t('Use SMS instead')}
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
            <div className={styles.phoneRow}>
              <Input
                error={otpError}
                inputMode="numeric"
                label={t('SMS code')}
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
                    setChannel('sms');
                  } else {
                    setOtpError(t('Code does not match.'));
                  }
                }}
                variant="primary"
              >
                {t('Verify')}
              </Button>
            </div>
          ) : null}
          {/* Both ways out sit under the action they replace — the Nextdoor
              "try another method" placement. A bare escape floating beside the
              primary reads as label text, not a control. */}
          {!unverifiedOpen ? (
            <div className={styles.escapeRow}>
              <Button onClick={() => setChannel('telegram')} size="sm" variant="ghost">
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
