'use client';

import { useState } from 'react';
import type { KeyboardEvent } from 'react';

import {
  Badge,
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from '../../components/ui';
import {
  QrCodeIcon,
  ScanIcon,
  SearchIcon,
} from '../../components/ui/icons';
import { useT } from '../../components/foundations/i18n';
import { detectQueryKind, parseBookingQrPayload } from './logic';
import type { IdentityQueryKind } from './types';
import styles from './identity-search.module.css';

const KIND_LABEL: Record<IdentityQueryKind, string> = {
  phone: 'Phone',
  code: 'Code',
  name: 'Name',
};

export type IdentitySearchProps = {
  value: string;
  onChange: (next: string) => void;
  /** Demo QR payload surfaced inside the scan dialog. */
  demoQrPayload?: string;
  autoFocus?: boolean;
};

/**
 * Step-1 identity capture header: one search field that understands phone,
 * booking code, or name (the three reception doors), plus a booking-QR scan
 * shortcut. The field is the screen's single visual anchor — no card chrome
 * around it.
 */
export function IdentitySearch({
  autoFocus,
  demoQrPayload,
  onChange,
  value,
}: IdentitySearchProps) {
  const t = useT();
  const [scanOpen, setScanOpen] = useState(false);
  const kind = detectQueryKind(value);
  return (
    <div className={styles.search}>
      <div className={styles.inputRow}>
        <Input
          aria-label={t('Find patient by phone, booking code, or name')}
          autoFocus={autoFocus}
          className={styles.input}
          onChange={(event) => onChange(event.target.value)}
          placeholder={t('Phone, booking code, or name')}
          prefix={<SearchIcon size={16} />}
          size="lg"
          suffix={
            kind ? (
              <Badge size="sm" variant="neutral">
                {t(KIND_LABEL[kind])}
              </Badge>
            ) : undefined
          }
          value={value}
        />
        <Button
          onClick={() => setScanOpen(true)}
          size="lg"
          variant="outline"
        >
          <ScanIcon size={16} aria-hidden />
          {t('Scan booking QR')}
        </Button>
      </div>

      <ScanBookingQrDialog
        demoQrPayload={demoQrPayload}
        onBookingCode={(code) => {
          onChange(code);
          setScanOpen(false);
        }}
        onOpenChange={setScanOpen}
        open={scanOpen}
      />
    </div>
  );
}

function ScanBookingQrDialog({
  demoQrPayload,
  onBookingCode,
  onOpenChange,
  open,
}: {
  demoQrPayload?: string;
  onBookingCode: (code: string) => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}) {
  const t = useT();
  const [payload, setPayload] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleScan(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const code = parseBookingQrPayload(payload);
    if (!code) {
      setError(t('No booking code found in this QR.'));
      return;
    }
    setPayload('');
    setError(null);
    onBookingCode(code);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          setPayload('');
          setError(null);
        }
        onOpenChange(next);
      }}
    >
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>{t('Scan booking QR')}</DialogTitle>
          <DialogDescription>
            {t(
              'Capture the booking QR before matching the patient. The scanner sends Enter automatically.',
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Input
            aria-label={t('Booking QR payload')}
            autoFocus
            error={error ?? undefined}
            onChange={(event) => {
              setPayload(event.target.value);
              setError(null);
            }}
            onKeyDown={handleScan}
            placeholder={t('Scan booking QR code')}
            prefix={<QrCodeIcon size={16} />}
            value={payload}
          />
          {demoQrPayload ? (
            <p className={styles.demoHint}>
              {t('Demo payload:')} <code className={styles.demoCode}>{demoQrPayload}</code>
            </p>
          ) : null}
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t('Cancel')}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
