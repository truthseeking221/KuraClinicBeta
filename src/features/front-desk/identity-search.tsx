'use client';

import { Badge, Input } from '../../components/ui';
import { QrCodeIcon } from '../../components/ui/icons';
import { useT } from '../../components/foundations/i18n';
import { detectQueryKind, readBookingQr } from './logic';
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
  autoFocus?: boolean;
};

/**
 * Step-1 booking lookup: one field that the desk scanner types into and the
 * receptionist can also type into. Scanning is an input method, not a
 * workflow — there is no scan button and no scan dialog, because a desk
 * scanner is a keyboard and a separate modal would only add a click before
 * every arrival. A Kura booking QR normalises to its collection code as it
 * lands; any other QR is named as foreign rather than mined for a code.
 *
 * The field is the screen's single visual anchor — no card chrome around it.
 */
export function IdentitySearch({ autoFocus, onChange, value }: IdentitySearchProps) {
  const t = useT();
  const reading = readBookingQr(value);
  const kind = reading === null ? detectQueryKind(value) : null;

  return (
    <div className={styles.search}>
      <Input
        aria-label={t('Find the booking by code or phone')}
        autoFocus={autoFocus}
        className={styles.input}
        error={reading?.kind === 'foreign' ? t('This is not a Kura booking QR.') : undefined}
        onChange={(event) => {
          const next = readBookingQr(event.target.value);
          onChange(next?.kind === 'code' ? next.code : event.target.value);
        }}
        placeholder={t('Scan or type the booking code')}
        prefix={<QrCodeIcon size={16} />}
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
      <p className={styles.hint} role="status">
        {reading?.kind === 'partial'
          ? t('Reading booking QR…')
          : t('No booking code? Search by the phone number on the booking.')}
      </p>
    </div>
  );
}
