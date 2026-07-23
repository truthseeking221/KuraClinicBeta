'use client';

import { useId } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';

import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
} from '../../components/ui';
import type { BadgeVariant } from '../../components/ui';
import {
  CalendarIcon,
  CallIcon,
  CheckIcon,
  CheckInIcon,
  HistoryIcon,
  UserAddIcon,
  UserCheckIcon,
  UserIdentityIcon,
  UserMultipleIcon,
  UserSearchIcon,
} from '../../components/ui/icons';
import { ageOf } from '../../components/shared/subject-header/identity';
import { useT } from '../../components/foundations/i18n';
import type {
  BookingSummary,
  PatientRecordSummary,
  TrustSignal,
} from './types';
import styles from './patient-resolution-card.module.css';

export type PatientResolutionCardVariant =
  | 'known-here'
  | 'known-elsewhere'
  | 'shared-phone'
  | 'booking-linked'
  | 'booking-blocked'
  | 'candidate'
  | 'no-match'
  | 'captured';

export type PatientResolutionMatchFlags = {
  name?: boolean;
  nameKhmer?: boolean;
  dob?: boolean;
  phone?: boolean;
  nid?: boolean;
};

export type PatientResolutionStatus = {
  label: string;
  variant: BadgeVariant;
};

export type PatientResolutionAction = {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: ReactNode;
  disabled?: boolean;
};

export type PatientResolutionCardProps = {
  variant: PatientResolutionCardVariant;
  record?: PatientRecordSummary;
  /** Per-field emphasis on candidate rows so matched fields scan fast. */
  matched?: PatientResolutionMatchFlags;
  bookings?: BookingSummary[];
  /** Caption above the bookings list; derived from count when omitted. */
  bookingsHeader?: ReactNode;
  /** No-match only: the query that returned nothing, echoed verbatim. */
  searchedValue?: string;
  searchedKind?: string;
  status?: PatientResolutionStatus;
  /** Plain capture/source context. This is provenance, never verification status. */
  provenance?: ReactNode;
  lastVisitLabel?: string;
  /** Trust facts (verification recency, cross-PSC origin). Worst tone leads. */
  trustSignals?: TrustSignal[];
  /** "Matched on National ID + Phone" — evidence the desk can verify aloud. */
  matchedOnLabel?: string | null;
  /** When set, booking rows become the check-in action for that booking. */
  onBookingSelect?: (booking: BookingSummary) => void;
  /** Which bookings may be checked in here; the rest render as facts only. */
  bookingActionable?: (booking: BookingSummary) => boolean;
  helperText?: ReactNode;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  actions?: PatientResolutionAction[];
  className?: string;
};

const VARIANT_META: Record<
  Exclude<PatientResolutionCardVariant, 'no-match'>,
  { eyebrow?: string; icon: ReactNode; tone: 'success' | 'warning' | 'info' | 'neutral' | 'primary' }
> = {
  'known-here': { eyebrow: 'Known patient', icon: <UserCheckIcon size={20} />, tone: 'success' },
  'known-elsewhere': {
    eyebrow: 'Known in Kura · other PSC',
    icon: <UserIdentityIcon size={20} />,
    tone: 'warning',
  },
  'shared-phone': { icon: <UserMultipleIcon size={20} />, tone: 'warning' },
  'booking-linked': { eyebrow: 'Booking matched', icon: <CheckInIcon size={20} />, tone: 'info' },
  'booking-blocked': {
    eyebrow: 'Booking cannot be used',
    icon: <CheckInIcon size={20} />,
    tone: 'warning',
  },
  candidate: { icon: <UserSearchIcon size={20} />, tone: 'primary' },
  captured: {
    icon: <UserIdentityIcon size={20} />,
    tone: 'neutral',
  },
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function formatDob(iso?: string): string {
  if (!iso) return '';
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function Highlight({ on, children }: { on?: boolean; children: ReactNode }) {
  return on ? <mark className={styles.match}>{children}</mark> : <>{children}</>;
}

function MetaRow({ record, matched }: { record: PatientRecordSummary; matched?: PatientResolutionMatchFlags }) {
  const age = ageOf(record.dob);
  const parts: ReactNode[] = [];
  if (record.phone) {
    parts.push(
      <span key="phone" className={styles.metaItem}>
        <CallIcon size={14} aria-hidden />
        <Highlight on={matched?.phone}>
          <span className={styles.mono}>{record.phone}</span>
        </Highlight>
      </span>,
    );
  }
  if (record.dob) {
    parts.push(
      <span key="dob" className={styles.metaItem}>
        <CalendarIcon size={14} aria-hidden />
        <Highlight on={matched?.dob}>
          <span className={styles.mono}>
            {formatDob(record.dob)}
            {age !== null ? <span className={styles.metaMuted}> ({age}y)</span> : null}
          </span>
        </Highlight>
      </span>,
    );
  }
  if (record.nid) {
    parts.push(
      <span key="nid" className={styles.metaItem}>
        <UserIdentityIcon size={14} aria-hidden />
        <Highlight on={matched?.nid}>
          <span className={styles.mono}>{record.nid}</span>
        </Highlight>
      </span>,
    );
  }
  if (parts.length === 0) return null;
  return <div className={styles.metaRow}>{parts}</div>;
}

function BookingsList({
  bookingActionable,
  bookings,
  header,
  onBookingSelect,
}: {
  bookingActionable?: (booking: BookingSummary) => boolean;
  bookings: BookingSummary[];
  header?: ReactNode;
  onBookingSelect?: (booking: BookingSummary) => void;
}) {
  const t = useT();
  if (bookings.length === 0) return null;
  const resolvedHeader =
    header === undefined
      ? `${bookings.length} ${bookings.length === 1 ? t('booking') : t('bookings')}`
      : header;
  return (
    <div className={styles.bookings}>
      {resolvedHeader ? <div className={styles.bookingsHeader}>{resolvedHeader}</div> : null}
      {bookings.map((booking) => {
        const meta = [booking.whenLabel, booking.itemsLabel, booking.locationLabel]
          .filter(Boolean)
          .join(' · ');
        const content = (
          <>
            <CheckInIcon size={16} className={styles.bookingIcon} aria-hidden />
            <span className={joinClasses(styles.mono, styles.bookingCode)}>{booking.code}</span>
            {meta ? <span className={styles.bookingMeta}>· {meta}</span> : null}
            {booking.creatorLabel ? (
              <span className={styles.bookingCreator}>{booking.creatorLabel}</span>
            ) : null}
            <Badge size="sm" variant={booking.status.tone === 'neutral' ? 'neutral' : booking.status.tone}>
              {t(booking.status.label)}
            </Badge>
          </>
        );
        const actionable = onBookingSelect && (bookingActionable?.(booking) ?? true);
        if (actionable) {
          return (
            <button
              key={booking.code}
              type="button"
              className={styles.bookingRow}
              aria-label={`${t('Use booking')} ${booking.code}`}
              onClick={(event) => {
                event.stopPropagation();
                onBookingSelect(booking);
              }}
            >
              {content}
            </button>
          );
        }
        return (
          <div key={booking.code} className={styles.bookingRow}>
            {content}
          </div>
        );
      })}
      {onBookingSelect && bookings.length > 1 ? (
        <p className={styles.helper}>{t('Choose the booking this visit is for.')}</p>
      ) : null}
    </div>
  );
}

function TrustLine({ signals }: { signals?: TrustSignal[] }) {
  const t = useT();
  if (!signals || signals.length === 0) return null;
  return (
    <p className={styles.trustLine}>
      {signals.map((signal, index) => (
        <span key={signal.label} className={styles.trustSignal} data-tone={signal.tone}>
          {index > 0 ? (
            <span className={styles.trustDivider} aria-hidden>
              ·
            </span>
          ) : null}
          {t(signal.label)}
        </span>
      ))}
    </p>
  );
}

function ActionRow({ actions }: { actions?: PatientResolutionAction[] }) {
  const t = useT();
  if (!actions || actions.length === 0) return null;
  return (
    <div className={styles.actions}>
      {actions.map((action) => (
        <Button
          key={action.label}
          size="sm"
          variant={
            action.variant === 'primary' ? 'primary' : action.variant === 'ghost' ? 'ghost' : 'outline'
          }
          disabled={action.disabled}
          onClick={(event) => {
            event.stopPropagation();
            action.onClick?.();
          }}
        >
          {action.icon}
          {t(action.label)}
        </Button>
      ))}
    </div>
  );
}

/**
 * Reception Step-1 identity resolution card. One shell for the known-patient,
 * shared-phone, booking-linked, candidate, no-match, and captured readings —
 * one patient hierarchy, one status/action treatment. Selectable cards behave
 * as radios inside a "who is here today?" radiogroup.
 *
 * Adapted from Kura ui-kit `PatientIdentityResolutionCard` (source-kura-ui-kit);
 * rebound to house tokens, Card/Badge/Avatar/Button primitives, and Hugeicons.
 */
export function PatientResolutionCard({
  actions,
  bookingActionable,
  bookings,
  bookingsHeader,
  className,
  helperText,
  lastVisitLabel,
  matched,
  matchedOnLabel,
  onBookingSelect,
  onSelect,
  provenance,
  record,
  searchedKind,
  searchedValue,
  selectable = false,
  selected = false,
  status,
  trustSignals,
  variant,
}: PatientResolutionCardProps) {
  const t = useT();
  const headingId = useId();
  const isSelectable = selectable || typeof onSelect === 'function';

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (!onSelect) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect();
    }
  }

  if (variant === 'no-match') {
    return (
      <Card
        className={joinClasses(styles.card, className)}
        data-resolution={variant}
        variant="outline"
        aria-labelledby={headingId}
      >
        <div className={styles.layout}>
          <span className={styles.iconBadge} data-tone="primary">
            <UserAddIcon size={20} aria-hidden />
          </span>
          <div className={styles.body}>
            <p className={styles.eyebrow}>{t('No existing record')}</p>
            <h3 id={headingId} className={styles.heading}>
              {searchedValue ? (
                <span className={joinClasses(styles.mono, styles.searchedValue)}>{searchedValue}</span>
              ) : (
                t('Add new patient')
              )}
            </h3>
            <p className={styles.helper}>
              {helperText ??
                `${t('Continue to create a new patient.')} ${
                  searchedKind ? t(searchedKind) : t('This search value')
                } ${t('carries over to the next step.')}`}
            </p>
            <ActionRow actions={actions} />
          </div>
        </div>
      </Card>
    );
  }

  const meta = VARIANT_META[variant];
  const resolved = record ?? { id: 'unknown', name: 'Patient', sexAtBirth: '' as const, assurance: 'unverified' as const, registeredHere: true };

  return (
    <Card
      className={joinClasses(styles.card, isSelectable && styles.selectable, className)}
      data-resolution={variant}
      variant="outline"
      data-selected={selected || undefined}
      role={isSelectable ? 'radio' : undefined}
      aria-checked={isSelectable ? selected : undefined}
      aria-labelledby={headingId}
      tabIndex={isSelectable ? 0 : undefined}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.layout}>
        {isSelectable ? (
          <Avatar size="lg">
            <AvatarFallback>{initialsOf(resolved.name)}</AvatarFallback>
          </Avatar>
        ) : (
          <span className={styles.iconBadge} data-tone={meta.tone}>
            {meta.icon}
          </span>
        )}
        <div className={styles.body}>
          <div className={styles.headerRow}>
            <div className={styles.identity}>
              {!isSelectable && meta.eyebrow ? (
                <p className={styles.eyebrow}>{t(meta.eyebrow)}</p>
              ) : null}
              <div className={styles.nameLine}>
                <h3 id={headingId} className={styles.heading}>
                  <Highlight on={matched?.name}>{resolved.name}</Highlight>
                </h3>
                {resolved.sexAtBirth ? (
                  variant === 'captured' ? (
                    <span className={styles.demographic}>
                      <span className={styles.srOnly}>{t('Sex at birth')}{': '}</span>
                      {t(resolved.sexAtBirth)}
                    </span>
                  ) : (
                    <Badge size="sm" variant="neutral">
                      {t(resolved.sexAtBirth)}
                    </Badge>
                  )
                ) : null}
                {resolved.minor ? (
                  <Badge size="sm" variant="warning">
                    {t('Minor')}
                  </Badge>
                ) : null}
              </div>
              {resolved.nameKhmer ? (
                <p lang="km" className={styles.nameKhmer}>
                  <Highlight on={matched?.nameKhmer}>{resolved.nameKhmer}</Highlight>
                </p>
              ) : null}
            </div>
            {status || isSelectable ? (
              <div className={styles.headerright}>
                {status ? (
                  <Badge size="sm" variant={status.variant}>
                    {t(status.label)}
                  </Badge>
                ) : null}
                {isSelectable ? (
                  <span className={styles.selectionMark} data-selected={selected || undefined} aria-hidden>
                    {selected ? <CheckIcon size={12} /> : null}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>

          <MetaRow record={resolved} matched={matched} />
          {provenance ? <p className={styles.provenance}>{provenance}</p> : null}
          <TrustLine signals={trustSignals} />
          {matchedOnLabel ? <p className={styles.evidence}>{matchedOnLabel}</p> : null}
          {lastVisitLabel ? (
            <p className={styles.lastVisit}>
              <HistoryIcon size={14} aria-hidden />
              {lastVisitLabel}
            </p>
          ) : null}
          <BookingsList
            bookingActionable={bookingActionable}
            bookings={bookings ?? resolved.bookings ?? []}
            header={bookingsHeader}
            onBookingSelect={onBookingSelect}
          />
          {helperText ? <p className={styles.helper}>{helperText}</p> : null}
          <ActionRow actions={actions} />
        </div>
      </div>
    </Card>
  );
}
