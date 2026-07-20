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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
} from '../../components/ui';
import {
  ChevronDownIcon,
  FaceIdIcon,
  QrCodeIcon,
  ScanIcon,
  SearchIcon,
} from '../../components/ui/icons';
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
 * booking code, or name (the three reception doors), a booking-QR scan
 * shortcut, and a low-emphasis menu of future ID methods. The field is the
 * screen's single visual anchor — no card chrome around it.
 */
export function IdentitySearch({
  autoFocus,
  demoQrPayload,
  onChange,
  value,
}: IdentitySearchProps) {
  const [scanOpen, setScanOpen] = useState(false);
  const kind = detectQueryKind(value);
  const empty = value.trim() === '';

  return (
    <div className={styles.search}>
      <div className={styles.inputRow}>
        <Input
          aria-label="Find patient by phone, booking code, or name"
          autoFocus={autoFocus}
          className={styles.input}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Phone, booking code, or name"
          prefix={<SearchIcon size={16} />}
          size="lg"
          suffix={kind ? <Badge size="sm" variant="neutral">{KIND_LABEL[kind]}</Badge> : undefined}
          value={value}
        />
        <Button
          onClick={() => setScanOpen(true)}
          size="lg"
          variant="outline"
        >
          <ScanIcon size={16} aria-hidden />
          Scan booking QR
        </Button>
      </div>

      {empty ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className={styles.otherMethods}>
              <ChevronDownIcon size={12} aria-hidden />
              Other ID methods
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem disabled>
              <FaceIdIcon size={16} aria-hidden />
              <span className={styles.methodBody}>
                <span className={styles.methodTitle}>Insert National ID card</span>
                <span className={styles.methodHint}>Reads the chip on a Cambodian e-ID</span>
              </span>
              <span className={styles.methodSoon}>Coming soon</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <QrCodeIcon size={16} aria-hidden />
              <span className={styles.methodBody}>
                <span className={styles.methodTitle}>Scan National ID QR</span>
                <span className={styles.methodHint}>Reads the QR printed on the ID</span>
              </span>
              <span className={styles.methodSoon}>Coming soon</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}

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
  const [payload, setPayload] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleScan(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const code = parseBookingQrPayload(payload);
    if (!code) {
      setError('No booking code found in this QR.');
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
          <DialogTitle>Scan booking QR</DialogTitle>
          <DialogDescription>
            Capture the booking QR before matching the patient. The scanner sends Enter
            automatically.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Input
            aria-label="Booking QR payload"
            autoFocus
            error={error ?? undefined}
            onChange={(event) => {
              setPayload(event.target.value);
              setError(null);
            }}
            onKeyDown={handleScan}
            placeholder="Scan booking QR code"
            prefix={<QrCodeIcon size={16} />}
            value={payload}
          />
          {demoQrPayload ? (
            <p className={styles.demoHint}>
              Demo payload: <code className={styles.demoCode}>{demoQrPayload}</code>
            </p>
          ) : null}
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
