'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  MoneyText,
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from '../../components/ui';
import { TestTubeIcon } from '../../components/ui/icons';
import { useT } from '../../components/foundations/i18n';

import {
  bookingBlockMeta,
  bookingBlockReason,
  bookingTimeline,
  collectionCodeStatusMeta,
} from './logic';
import type { BookingSummary, PatientRecordSummary } from './types';
import styles from './booking-detail-sheet.module.css';

export type BookingDetailSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: BookingSummary;
  patient: PatientRecordSummary;
  /** The desk's own branch; codes issued elsewhere cannot be redeemed here. */
  deskBranchId?: string;
  /** Redeem the code and start check-in. Absent → the action is not offered. */
  onCheckIn?: (code: string) => void;
  /** Re-send the collection code to the patient's phone. */
  onResendCode?: (code: string) => void;
  /** Continue as a walk-in after a blocked code (reception door contract). */
  onContinueAsWalkIn?: () => void;
  /** Open the desk queue before any walk-in recovery for an already redeemed code. */
  onOpenDeskQueue?: () => void;
  /** Parent-owned confirmation step for a cancelled booking becoming a walk-in. */
  onConfirmWalkIn?: () => void;
};

const BADGE_VARIANT: Record<'success' | 'warning' | 'neutral', 'success' | 'warning' | 'neutral'> = {
  success: 'success',
  warning: 'warning',
  neutral: 'neutral',
};

/**
 * Booking detail inset: one collection code told end-to-end — who it belongs
 * to, what it orders, whether money moved, and its lifecycle as a timeline.
 * Blocked codes explain themselves and expose the safe recovery door supplied
 * by the caller (architecture reference: ReUI `solution-bookings-3`; every
 * state maps to the canonical collection-code contract).
 */
export function BookingDetailSheet({
  booking,
  deskBranchId,
  onCheckIn,
  onContinueAsWalkIn,
  onOpenChange,
  onOpenDeskQueue,
  onResendCode,
  onConfirmWalkIn,
  open,
  patient,
}: BookingDetailSheetProps) {
  const t = useT();
  const blockReason = bookingBlockReason(booking, deskBranchId);
  const block = blockReason ? bookingBlockMeta(blockReason) : null;
  const status = collectionCodeStatusMeta(booking.codeStatus);
  const events = bookingTimeline(booking);
  const currentStep = events.reduce((max, event) => Math.max(max, event.step), 1);
  const canResend = booking.codeStatus === 'issued' || booking.codeStatus === 'scheduled';
  const hasBlockedAction =
    (blockReason === 'redeemed' && Boolean(onOpenDeskQueue)) ||
    (blockReason === 'cancelled' && Boolean(onConfirmWalkIn)) ||
    (blockReason !== 'redeemed' && blockReason !== 'cancelled' && Boolean(onContinueAsWalkIn));
  const items = booking.itemsLabel
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent aria-label={`${t('Booking')} ${booking.code}`} side="right">
        <SheetHeader>
          <div className={styles.headerMain}>
            <div className={styles.headerRow}>
              <SheetTitle>
                {t('Booking')} <span className={styles.code}>{booking.code}</span>
              </SheetTitle>
              <Badge size="sm" variant={BADGE_VARIANT[status.tone]}>
                {t(status.label)}
              </Badge>
            </div>
            <SheetDescription>
              {[booking.whenLabel, booking.locationLabel, booking.providerLabel]
                .filter(Boolean)
                .join(' · ')}
            </SheetDescription>
          </div>
          <SheetClose aria-label={t('Close booking detail')} />
        </SheetHeader>

        <SheetBody className={styles.body}>
          {block ? (
            <Alert tone="warning">
              <AlertTitle>{t(block.title)}</AlertTitle>
              <AlertDescription>{t(block.description)}</AlertDescription>
            </Alert>
          ) : null}

          <section aria-labelledby="booking-patient-heading" className={styles.section}>
            <h3 className={styles.sectionTitle} id="booking-patient-heading">{t('Patient')}</h3>
            <div className={styles.patientRow}>
              <div className={styles.patientNames}>
                <p className={styles.patientName}>{patient.name}</p>
                {patient.nameKhmer ? (
                  <p className={styles.patientNameKhmer} lang="km">{patient.nameKhmer}</p>
                ) : null}
              </div>
              <Badge size="sm" variant={patient.assurance === 'verified' ? 'success' : 'warning'}>
                {patient.assurance === 'verified' ? t('Verified') : t('Unverified')}
              </Badge>
            </div>
            {patient.phone ? <p className={styles.patientMeta}>{patient.phone}</p> : null}
          </section>

          <section aria-labelledby="booking-order-heading" className={styles.section}>
            <h3 className={styles.sectionTitle} id="booking-order-heading">{t('Ordered tests')}</h3>
            <ul className={styles.testList}>
              {items.map((item) => (
                <li className={styles.testRow} key={item}>
                  <TestTubeIcon aria-hidden="true" size={15} />
                  {item}
                </li>
              ))}
            </ul>
            {booking.payment ? (
              <div className={styles.paymentRow}>
                <span className={styles.paymentLabel}>
                  {booking.payment.state === 'paid' ? t('Paid') : t('Payment pending')}
                </span>
                <Badge size="sm" variant={booking.payment.state === 'paid' ? 'success' : 'neutral'}>
                  <MoneyText currency="USD" minor={booking.payment.amountMinor} />
                </Badge>
              </div>
            ) : null}
          </section>

          <section aria-labelledby="booking-history-heading" className={styles.section}>
            <h3 className={styles.sectionTitle} id="booking-history-heading">{t('History')}</h3>
            <Timeline aria-label={t('Booking history')} value={currentStep}>
              {events.map((event) => (
                <TimelineItem key={`${event.step}-${event.title}`} step={event.step} tone={event.tone}>
                  <TimelineIndicator />
                  <TimelineSeparator />
                  <TimelineHeader>
                    {event.dateLabel ? <TimelineDate>{event.dateLabel}</TimelineDate> : null}
                    <TimelineTitle>{t(event.title)}</TimelineTitle>
                  </TimelineHeader>
                  {event.detail ? <TimelineContent>{t(event.detail)}</TimelineContent> : null}
                </TimelineItem>
              ))}
            </Timeline>
          </section>
        </SheetBody>

        <SheetFooter className={styles.footer}>
          {block ? (
            <>
              {blockReason === 'redeemed' && onOpenDeskQueue ? (
                <Button onClick={onOpenDeskQueue} variant="primary">
                  {t('Check desk queue')}
                </Button>
              ) : null}
              {blockReason === 'cancelled' && onConfirmWalkIn ? (
                <Button onClick={onConfirmWalkIn} variant="primary">
                  {t('Confirm walk-in')}
                </Button>
              ) : null}
              {blockReason !== 'redeemed' && blockReason !== 'cancelled' && onContinueAsWalkIn ? (
                <Button onClick={onContinueAsWalkIn} variant="primary">
                  {t('Continue as walk-in')}
                </Button>
              ) : null}
              {!hasBlockedAction ? (
                <span className={styles.footerNote}>
                  {t('Check-in unavailable for this booking.')}
                </span>
              ) : null}
            </>
          ) : (
            <>
              {onResendCode && canResend ? (
                <Button onClick={() => onResendCode(booking.code)} variant="outline">
                  {t('Resend code')}
                </Button>
              ) : null}
              {onCheckIn ? (
                <Button onClick={() => onCheckIn(booking.code)} variant="primary">
                  {t('Check in booking')} {booking.code}
                </Button>
              ) : null}
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
