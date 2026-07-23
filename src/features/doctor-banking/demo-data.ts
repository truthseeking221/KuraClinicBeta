import { earnedSinceMonthStart } from './logic';
import type {
  AdminDoctorBankingFixture,
  DoctorBankingFixture,
  DoctorBankingOverview,
  DoctorBankingViewState,
  DoctorFinancialNotification,
  DoctorLedgerDetail,
  DoctorLedgerSummary,
  KhqrIntent,
  LedgerEntry,
  MandateLinkSession,
  MandateSummary,
  NotificationDelivery,
  OrderFundingDecision,
  Pull,
} from './types';

/** Earnings month under test. Fixtures never derive a period from `now`. */
export const PERIOD_START = '2026-07-01';

const usd = (minor: string) => ({ minor, currency: 'USD' as const });

const DELIVERED: NotificationDelivery[] = [
  { channel: 'in_app', state: 'accepted' },
  { channel: 'sms', state: 'accepted' },
];

const DELIVERY_PENDING: NotificationDelivery[] = [
  { channel: 'in_app', state: 'accepted' },
  { channel: 'sms', state: 'pending' },
];

const DELIVERY_PARTIAL: NotificationDelivery[] = [
  { channel: 'in_app', state: 'accepted' },
  { channel: 'sms', state: 'failed' },
  { channel: 'email', state: 'accepted' },
];

export const linkedMandate: MandateSummary = {
  state: 'linked',
  maskedAccount: 'ABA •••• 8842',
  expiresAt: '2030-01-15T02:00:00.000Z',
  renewalPromptAt: '2029-12-15T02:00:00.000Z',
  firstLinkCreditGranted: true,
};

export const unlinkedMandate: MandateSummary = {
  state: 'unlinked',
  maskedAccount: null,
  expiresAt: null,
  renewalPromptAt: null,
  firstLinkCreditGranted: false,
};

export const mandateByState: Record<MandateSummary['state'], MandateSummary> = {
  unlinked: unlinkedMandate,
  link_pending: { ...unlinkedMandate, state: 'link_pending' },
  linked: linkedMandate,
  renewal_required: {
    ...linkedMandate,
    state: 'renewal_required',
    renewalPromptAt: '2026-07-15T02:00:00.000Z',
  },
  expired: {
    ...linkedMandate,
    state: 'expired',
    expiresAt: '2026-07-16T02:00:00.000Z',
  },
  frozen: { ...linkedMandate, state: 'frozen' },
  deleted: {
    ...unlinkedMandate,
    state: 'deleted',
    firstLinkCreditGranted: true,
  },
};

/**
 * Every ledger entry kind in the contract, with the two-line row content the
 * grid renders: what happened, then the order and workspace it came from.
 */
export const activityEntries: LedgerEntry[] = [
  {
    entryRef: 'entry-121',
    kind: 'completion_credit',
    state: 'settled',
    amount: usd('6400'),
    occurredAt: '2026-07-21T03:40:00.000Z',
    title: 'Doctor share released',
    detail: 'Lipid panel and HbA1c order completed',
    orderRef: 'ORD-2903',
    workspaceLabel: 'Mekong Clinic · BKK1',
    reversalOfEntryRef: null,
  },
  {
    entryRef: 'entry-120',
    kind: 'completion_debit',
    state: 'settled',
    amount: usd('-2150'),
    occurredAt: '2026-07-21T03:40:00.000Z',
    title: 'Laboratory cost charged',
    detail: 'Partner laboratory fee settled at order completion',
    orderRef: 'ORD-2903',
    workspaceLabel: 'Mekong Clinic · BKK1',
    reversalOfEntryRef: null,
  },
  {
    entryRef: 'entry-101',
    kind: 'completion_credit',
    state: 'settled',
    amount: usd('4200'),
    occurredAt: '2026-07-18T04:12:00.000Z',
    title: 'Doctor share released',
    detail: 'Thyroid function order completed',
    orderRef: 'ORD-2841',
    workspaceLabel: 'Mekong Clinic · BKK1',
    reversalOfEntryRef: null,
  },
  {
    entryRef: 'entry-102',
    kind: 'pending_debit',
    state: 'pending',
    amount: usd('-3200'),
    occurredAt: '2026-07-18T03:45:00.000Z',
    title: 'Laboratory order reserved',
    detail: 'Held against the proposed order until completion or void',
    orderRef: 'ORD-2849',
    workspaceLabel: 'Kura Cabinet, Toul Kork',
    reversalOfEntryRef: null,
  },
  {
    entryRef: 'entry-103',
    kind: 'connect_credit',
    state: 'settled',
    amount: usd('500'),
    occurredAt: '2026-07-17T02:15:00.000Z',
    title: 'First ABA link credit',
    detail: 'One-time credit after ABA confirmed the first link',
    orderRef: null,
    workspaceLabel: null,
    reversalOfEntryRef: null,
  },
  {
    entryRef: 'entry-104',
    kind: 'aba_pull_credit',
    state: 'settled',
    amount: usd('4860'),
    occurredAt: '2026-07-15T02:00:00.000Z',
    title: 'Scheduled ABA collection',
    detail: 'Collected after the pre-notice window closed',
    orderRef: null,
    workspaceLabel: null,
    reversalOfEntryRef: null,
  },
  {
    entryRef: 'entry-105',
    kind: 'pending_credit',
    state: 'pending',
    amount: usd('7800'),
    occurredAt: '2026-07-14T09:18:00.000Z',
    title: 'Doctor share in progress',
    detail: 'Order complete, financial settlement still running',
    orderRef: 'ORD-2812',
    workspaceLabel: 'Mekong Clinic · BKK1',
    reversalOfEntryRef: null,
  },
  {
    entryRef: 'entry-119',
    kind: 'pending_adjustment',
    state: 'pending',
    amount: usd('-640'),
    occurredAt: '2026-07-13T07:05:00.000Z',
    title: 'Reserved amount corrected',
    detail: 'Add-on test removed before the order was sent',
    orderRef: 'ORD-2812',
    workspaceLabel: 'Mekong Clinic · BKK1',
    reversalOfEntryRef: null,
  },
  {
    entryRef: 'entry-106',
    kind: 'admin_adjustment',
    state: 'settled',
    amount: usd('-1250'),
    occurredAt: '2026-07-12T08:02:00.000Z',
    title: 'Duplicate earning reversed',
    detail: 'Correction recorded by Finance against entry-118',
    orderRef: 'ORD-2760',
    workspaceLabel: 'Kura Cabinet, Toul Kork',
    reversalOfEntryRef: 'entry-118',
  },
  {
    entryRef: 'entry-118',
    kind: 'completion_credit',
    state: 'settled',
    amount: usd('1250'),
    occurredAt: '2026-07-11T08:02:00.000Z',
    title: 'Doctor share released',
    detail: 'Duplicate of ORD-2760; reversed by entry-106, never edited',
    orderRef: 'ORD-2760',
    workspaceLabel: 'Kura Cabinet, Toul Kork',
    reversalOfEntryRef: null,
  },
  {
    entryRef: 'entry-107',
    kind: 'khqr_credit',
    state: 'settled',
    amount: usd('2500'),
    occurredAt: '2026-07-10T06:31:00.000Z',
    title: 'KHQR settlement received',
    detail: 'Confirmed by the provider and applied to the ledger',
    orderRef: null,
    workspaceLabel: null,
    reversalOfEntryRef: null,
  },
  {
    entryRef: 'entry-117',
    kind: 'physical_settlement_offset',
    state: 'settled',
    amount: usd('3000'),
    occurredAt: '2026-07-09T09:55:00.000Z',
    title: 'Cash collected at the clinic',
    detail: 'Front desk banked the patient payment; the ledger is offset',
    orderRef: 'ORD-2744',
    workspaceLabel: 'Kura Cabinet, Toul Kork',
    reversalOfEntryRef: null,
  },
  {
    entryRef: 'entry-116',
    kind: 'completion_credit',
    state: 'settled',
    amount: usd('8900'),
    occurredAt: '2026-07-08T02:20:00.000Z',
    title: 'Doctor share released',
    detail: 'Renal function and electrolyte order completed',
    orderRef: 'ORD-2755',
    workspaceLabel: 'Kura Cabinet, Toul Kork',
    reversalOfEntryRef: null,
  },
  {
    entryRef: 'entry-108',
    kind: 'pending_void',
    state: 'voided',
    amount: usd('1200'),
    occurredAt: '2026-07-08T05:12:00.000Z',
    title: 'Reservation released',
    detail: 'The proposed order was cancelled before completion',
    orderRef: 'ORD-2710',
    workspaceLabel: 'Mekong Clinic · BKK1',
    reversalOfEntryRef: null,
  },
  {
    entryRef: 'entry-109',
    kind: 'completion_credit',
    state: 'settled',
    amount: usd('15600'),
    occurredAt: '2026-07-02T10:42:00.000Z',
    title: 'Doctor share released',
    detail: 'Diabetes and chronic kidney disease panel completed',
    orderRef: 'ORD-2651',
    workspaceLabel: 'Kura Cabinet, Toul Kork · Endocrinology',
    reversalOfEntryRef: null,
  },
  {
    entryRef: 'entry-115',
    kind: 'completion_credit',
    state: 'settled',
    amount: usd('12000'),
    occurredAt: '2026-06-28T04:05:00.000Z',
    title: 'Doctor share released',
    detail: 'June order; outside the current earnings month',
    orderRef: 'ORD-2588',
    workspaceLabel: 'Mekong Clinic · BKK1',
    reversalOfEntryRef: null,
  },
];

/** Enough rows that the grid pages; the ledger is never truncated silently. */
export const pagedActivityEntries: LedgerEntry[] = [
  ...activityEntries,
  ...[
    ['ORD-2540', '2026-06-24T03:12:00.000Z', '5400', 'Full blood count order completed'],
    ['ORD-2521', '2026-06-19T06:48:00.000Z', '3300', 'Vitamin D order completed'],
    ['ORD-2498', '2026-06-14T02:31:00.000Z', '7100', 'Liver function order completed'],
    ['ORD-2455', '2026-06-08T08:09:00.000Z', '2600', 'Urinalysis order completed'],
    ['ORD-2431', '2026-06-03T05:22:00.000Z', '9800', 'Hormone profile order completed'],
    ['ORD-2402', '2026-05-29T04:44:00.000Z', '4100', 'Iron studies order completed'],
  ].map(([orderRef, occurredAt, minor, detail], index) => ({
    entryRef: `entry-2${index}`,
    kind: 'completion_credit' as const,
    state: 'settled' as const,
    amount: usd(minor),
    occurredAt,
    title: 'Doctor share released',
    detail,
    orderRef,
    workspaceLabel: index % 2 === 0 ? 'Mekong Clinic · BKK1' : 'Kura Cabinet, Toul Kork',
    reversalOfEntryRef: null,
  })),
];

const baseOverview: DoctorBankingOverview = {
  doctorRef: 'doctor_00000000-0000-4000-8000-000000000101',
  periodStart: PERIOD_START,
  earnedThisMonth: earnedSinceMonthStart(activityEntries, PERIOD_START),
  settledBalance: usd('18450'),
  pendingDebit: usd('3200'),
  pendingCredit: usd('7800'),
  reservedDebit: usd('1200'),
  exposure: usd('21850'),
  creditFloor: usd('-5000'),
  licence: 'verified',
  nextSweep: null,
  mandate: linkedMandate,
};

/** Kura owes the doctor. No collection is scheduled and no payout exists yet. */
export const greenOverview = baseOverview;

export const redOverview: DoctorBankingOverview = {
  ...baseOverview,
  settledBalance: usd('-4860'),
  exposure: usd('-8060'),
  nextSweep: {
    date: '2026-08-01',
    maximumAmount: usd('4860'),
    noticeState: 'sent',
    noticedAmount: usd('4860'),
  },
};

/** Notice already sent, then the doctor paid part of it by KHQR. */
export const noticeReducedOverview: DoctorBankingOverview = {
  ...redOverview,
  settledBalance: usd('-1860'),
  exposure: usd('-5060'),
  nextSweep: {
    date: '2026-08-01',
    maximumAmount: usd('1860'),
    noticeState: 'sent',
    noticedAmount: usd('4860'),
  },
};

/** Notice sent, then cleared in full. Nothing remains for that collection. */
export const noticeClearedOverview: DoctorBankingOverview = {
  ...redOverview,
  settledBalance: usd('0'),
  exposure: usd('-3200'),
  nextSweep: {
    date: '2026-08-01',
    maximumAmount: usd('0'),
    noticeState: 'sent',
    noticedAmount: usd('4860'),
  },
};

export const sweepScheduledOverview: DoctorBankingOverview = {
  ...redOverview,
  nextSweep: {
    date: '2026-08-01',
    maximumAmount: usd('4860'),
    noticeState: 'due',
    noticedAmount: null,
  },
};

export const zeroOverview: DoctorBankingOverview = {
  ...baseOverview,
  settledBalance: usd('0'),
  exposure: usd('0'),
  pendingDebit: usd('0'),
  pendingCredit: usd('0'),
  reservedDebit: usd('0'),
  nextSweep: null,
};

/** Nothing settled yet this month: everything the doctor did is still pending. */
export const pendingWallOverview: DoctorBankingOverview = {
  ...baseOverview,
  earnedThisMonth: usd('0'),
  settledBalance: usd('0'),
  pendingCredit: usd('24600'),
  pendingDebit: usd('0'),
  reservedDebit: usd('0'),
  exposure: usd('24600'),
  nextSweep: null,
};

/** Projected balance sits one order away from the ordering floor. */
export const floorPressureOverview: DoctorBankingOverview = {
  ...baseOverview,
  settledBalance: usd('-1200'),
  pendingCredit: usd('0'),
  pendingDebit: usd('2400'),
  reservedDebit: usd('1200'),
  exposure: usd('-5000'),
  nextSweep: {
    date: '2026-08-01',
    maximumAmount: usd('1200'),
    noticeState: 'not_due',
    noticedAmount: null,
  },
};

export const unavailableOverview: DoctorBankingOverview = {
  ...baseOverview,
  settledBalance: usd('-9223372036854775808'),
  exposure: usd('-9223372036854775808'),
};

/** Existing ledger, lapsed licence: read, settle, and unlink stay available. */
export const licenceLapsedOverview: DoctorBankingOverview = {
  ...redOverview,
  licence: 'lapsed',
};

export const licenceLapsedUnlinkedOverview: DoctorBankingOverview = {
  ...licenceLapsedOverview,
  mandate: unlinkedMandate,
  nextSweep: null,
};

export const unlinkedRedOverview: DoctorBankingOverview = {
  ...redOverview,
  mandate: unlinkedMandate,
  nextSweep: null,
};

export const doctorNotifications: DoctorFinancialNotification[] = [
  {
    notificationRef: 'notification-101',
    audience: 'doctor',
    kind: 'pre_notice',
    occurredAt: '2026-07-13T02:00:00.000Z',
    channels: DELIVERED,
    sweepDate: '2026-07-15',
    originalCap: usd('4860'),
    remainingCap: usd('0'),
    state: 'collected',
  },
  {
    notificationRef: 'notification-102',
    audience: 'doctor',
    kind: 'receipt',
    occurredAt: '2026-07-15T02:00:00.000Z',
    channels: DELIVERED,
    source: 'scheduled',
    amount: usd('4860'),
    balanceAfter: usd('0'),
    receiptRef: 'RCPT-40118',
  },
  {
    notificationRef: 'notification-103',
    audience: 'doctor',
    kind: 'mandate',
    occurredAt: '2026-07-17T02:15:00.000Z',
    channels: DELIVERED,
    event: 'linked',
    maskedAccount: 'ABA •••• 8842',
    expiresAt: '2030-01-15T02:00:00.000Z',
    connectCredit: usd('500'),
    remainingBalance: null,
  },
];

export const failedPullNotification: DoctorFinancialNotification = {
  notificationRef: 'notification-104',
  audience: 'doctor',
  kind: 'pull_failed',
  occurredAt: '2026-07-16T02:00:00.000Z',
  channels: DELIVERY_PENDING,
  pullRef: 'pull-102',
  trigger: 'scheduled_retry',
  retrySlot: 2,
  amount: usd('4860'),
  failureReason: 'The provider declined this collection attempt.',
  retryState: 'retry_pending',
  nextAction: 'retry_tomorrow',
  retryDate: '2026-07-17',
};

export const retriesExhaustedNotification: DoctorFinancialNotification = {
  ...failedPullNotification,
  notificationRef: 'notification-105',
  retrySlot: 3,
  retryState: 'retries_exhausted',
  nextAction: 'wait_next_sweep',
  retryDate: null,
  failureReason: 'Insufficient funds on the last permitted attempt.',
};

export const notRetryableNotification: DoctorFinancialNotification = {
  ...failedPullNotification,
  notificationRef: 'notification-106',
  retrySlot: null,
  retryState: 'not_retryable',
  nextAction: 'settle_now',
  retryDate: null,
  failureReason: 'The authorization expired before the retry window closed.',
};

export const relinkRequiredNotification: DoctorFinancialNotification = {
  ...notRetryableNotification,
  notificationRef: 'notification-107',
  nextAction: 'relink',
  failureReason: 'ABA removed the authorization for this account.',
};

/** Every notification kind and every lifecycle state, for one audit story. */
export const allNotifications: DoctorFinancialNotification[] = [
  {
    notificationRef: 'notification-201',
    audience: 'doctor',
    kind: 'pre_notice',
    occurredAt: '2026-07-20T02:00:00.000Z',
    channels: DELIVERY_PENDING,
    sweepDate: '2026-08-01',
    originalCap: usd('4860'),
    remainingCap: usd('4860'),
    state: 'pending_record',
  },
  {
    notificationRef: 'notification-202',
    audience: 'doctor',
    kind: 'pre_notice',
    occurredAt: '2026-07-19T02:00:00.000Z',
    channels: DELIVERED,
    sweepDate: '2026-08-01',
    originalCap: usd('4860'),
    remainingCap: usd('4860'),
    state: 'sent',
  },
  {
    notificationRef: 'notification-203',
    audience: 'doctor',
    kind: 'pre_notice',
    occurredAt: '2026-07-18T02:00:00.000Z',
    channels: DELIVERY_PARTIAL,
    sweepDate: '2026-08-01',
    originalCap: usd('4860'),
    remainingCap: usd('1860'),
    state: 'partly_collected',
  },
  {
    notificationRef: 'notification-204',
    audience: 'doctor',
    kind: 'pre_notice',
    occurredAt: '2026-07-13T02:00:00.000Z',
    channels: DELIVERED,
    sweepDate: '2026-07-15',
    originalCap: usd('4860'),
    remainingCap: usd('0'),
    state: 'collected',
  },
  {
    notificationRef: 'notification-205',
    audience: 'doctor',
    kind: 'pre_notice',
    occurredAt: '2026-06-28T02:00:00.000Z',
    channels: DELIVERED,
    sweepDate: '2026-07-01',
    originalCap: usd('2400'),
    remainingCap: usd('2400'),
    state: 'expired',
  },
  {
    notificationRef: 'notification-206',
    audience: 'doctor',
    kind: 'receipt',
    occurredAt: '2026-07-10T06:31:00.000Z',
    channels: DELIVERED,
    source: 'khqr',
    amount: usd('2500'),
    balanceAfter: usd('-2360'),
    receiptRef: 'RCPT-40092',
  },
  {
    notificationRef: 'notification-207',
    audience: 'doctor',
    kind: 'receipt',
    occurredAt: '2026-07-09T06:24:00.000Z',
    channels: DELIVERED,
    source: 'jit',
    amount: usd('2500'),
    balanceAfter: usd('0'),
    receiptRef: 'RCPT-40081',
  },
  {
    notificationRef: 'notification-208',
    audience: 'doctor',
    kind: 'receipt',
    occurredAt: '2026-07-08T02:00:00.000Z',
    channels: DELIVERED,
    source: 'scheduled_retry',
    amount: usd('1200'),
    balanceAfter: usd('-3660'),
    receiptRef: 'RCPT-40077',
  },
  {
    notificationRef: 'notification-209',
    audience: 'doctor',
    kind: 'receipt',
    occurredAt: '2026-07-05T02:00:00.000Z',
    channels: DELIVERED,
    source: 'admin_retry',
    amount: usd('900'),
    balanceAfter: usd('-4860'),
    receiptRef: 'RCPT-40063',
  },
  {
    notificationRef: 'notification-210',
    audience: 'doctor',
    kind: 'receipt',
    occurredAt: '2026-07-03T02:00:00.000Z',
    channels: DELIVERED,
    source: 'final_unlink',
    amount: usd('700'),
    balanceAfter: usd('-1400'),
    receiptRef: 'RCPT-40041',
  },
  failedPullNotification,
  retriesExhaustedNotification,
  notRetryableNotification,
  relinkRequiredNotification,
  {
    notificationRef: 'notification-211',
    audience: 'doctor',
    kind: 'mandate',
    occurredAt: '2026-07-17T02:15:00.000Z',
    channels: DELIVERED,
    event: 'linked',
    maskedAccount: 'ABA •••• 8842',
    expiresAt: '2030-01-15T02:00:00.000Z',
    connectCredit: usd('500'),
    remainingBalance: null,
  },
  {
    notificationRef: 'notification-212',
    audience: 'doctor',
    kind: 'mandate',
    occurredAt: '2026-07-06T02:15:00.000Z',
    channels: DELIVERED,
    event: 'renewal_required',
    maskedAccount: 'ABA •••• 8842',
    expiresAt: '2026-08-15T02:00:00.000Z',
    connectCredit: null,
    remainingBalance: null,
  },
  {
    notificationRef: 'notification-213',
    audience: 'doctor',
    kind: 'mandate',
    occurredAt: '2026-07-04T02:15:00.000Z',
    channels: DELIVERED,
    event: 'expired',
    maskedAccount: 'ABA •••• 8842',
    expiresAt: '2026-07-04T02:00:00.000Z',
    connectCredit: null,
    remainingBalance: usd('-4860'),
  },
  {
    notificationRef: 'notification-214',
    audience: 'doctor',
    kind: 'mandate',
    occurredAt: '2026-07-02T02:15:00.000Z',
    channels: DELIVERED,
    event: 'unlinked',
    maskedAccount: null,
    expiresAt: null,
    connectCredit: null,
    remainingBalance: usd('-1860'),
  },
  {
    notificationRef: 'notification-215',
    audience: 'doctor',
    kind: 'adjustment',
    occurredAt: '2026-07-12T08:02:00.000Z',
    channels: DELIVERED,
    entryRef: 'entry-106',
    amount: usd('-1250'),
    reason: 'Duplicate earning on ORD-2760 reversed by Finance.',
  },
  {
    notificationRef: 'notification-216',
    audience: 'doctor',
    kind: 'adjustment',
    occurredAt: '2026-07-09T09:55:00.000Z',
    channels: DELIVERED,
    entryRef: 'entry-117',
    amount: usd('3000'),
    reason: 'Cash collected at Kura Cabinet, Toul Kork offsets the ledger.',
  },
];

export const doctorFixture: DoctorBankingFixture = {
  overview: greenOverview,
  entries: activityEntries,
  notifications: doctorNotifications,
};

export const redDoctorFixture: DoctorBankingFixture = {
  overview: redOverview,
  entries: activityEntries,
  notifications: doctorNotifications,
};

export const failedPullFixture: DoctorBankingFixture = {
  overview: redOverview,
  entries: activityEntries,
  notifications: [failedPullNotification, ...doctorNotifications],
};

export const pendingKhqr: KhqrIntent = {
  settlementRef: 'settlement-101',
  purpose: 'settled_red',
  amount: usd('4860'),
  qrPayload: '000201010212fixture-khqr',
  expiresAt: '2030-01-15T02:10:00.000Z',
  state: 'pending',
  receiptRef: null,
  balanceAfter: null,
};

export const expiredKhqr: KhqrIntent = {
  ...pendingKhqr,
  expiresAt: '2026-07-16T02:00:00.000Z',
  state: 'expired',
};

export const confirmedKhqr: KhqrIntent = {
  ...pendingKhqr,
  state: 'confirmed',
  receiptRef: 'RCPT-40126',
  balanceAfter: usd('0'),
};

/** Late or duplicate payment: the surplus becomes credit, never an error. */
export const overpaidKhqr: KhqrIntent = {
  ...confirmedKhqr,
  receiptRef: 'RCPT-40127',
  balanceAfter: usd('1400'),
};

export const shortfallKhqr: KhqrIntent = {
  ...pendingKhqr,
  settlementRef: 'settlement-102',
  purpose: 'pending_shortfall',
  amount: usd('3200'),
};

export const pendingLinkSession: MandateLinkSession = {
  linkRef: 'link-101',
  desktopQrPayload: 'fixture-aba-link-qr',
  mobileDeepLink: 'abamobilebank://fixture/link/101',
  expiresAt: '2030-01-15T02:15:00.000Z',
  state: 'pending',
};

export const expiredLinkSession: MandateLinkSession = {
  ...pendingLinkSession,
  expiresAt: '2026-07-16T02:00:00.000Z',
  state: 'expired',
};

export const confirmedLinkSession: MandateLinkSession = {
  ...pendingLinkSession,
  state: 'confirmed',
};

export const longRunningLinkSession: MandateLinkSession = {
  ...pendingLinkSession,
  state: 'long_running',
};

export const fundingDecisions = {
  allow: { kind: 'allow', headroom: usd('13450') },
  khqrUnlinked: {
    kind: 'khqr_settled_red',
    amount: usd('4860'),
    reason: 'mandate_unavailable',
  },
  khqrJitFailed: { kind: 'khqr_settled_red', amount: usd('4860'), reason: 'jit_failed' },
  pendingShortfall: { kind: 'khqr_pending_shortfall', amount: usd('3200'), floor: usd('-5000') },
  jitProcessing: { kind: 'jit_processing', amount: usd('4860') },
  jitSucceeded: { kind: 'jit_succeeded', amount: usd('4860'), balanceAfter: usd('0') },
  prescriberActionRequired: {
    kind: 'prescriber_action_required',
    reason: 'Your medical licence expired on 16 July 2026.',
  },
} as const satisfies Record<string, OrderFundingDecision>;

export const doctorLedgers: DoctorLedgerSummary[] = [
  {
    doctorRef: 'doctor_00000000-0000-4000-8000-000000000101',
    displayName: 'Dr. Phong Tuy',
    settledBalance: usd('-4860'),
    exposure: usd('-8060'),
    pendingDebit: usd('3200'),
    reservedDebit: usd('1200'),
    creditFloor: usd('-5000'),
    mandateState: 'linked',
    attention: 'failed_pull',
  },
  {
    doctorRef: 'doctor_00000000-0000-4000-8000-000000000102',
    displayName: 'Dr. Sok Vanna',
    settledBalance: usd('18450'),
    exposure: usd('21850'),
    pendingDebit: usd('0'),
    reservedDebit: usd('0'),
    creditFloor: usd('-5000'),
    mandateState: 'linked',
    attention: 'none',
  },
  {
    doctorRef: 'doctor_00000000-0000-4000-8000-000000000103',
    displayName: 'Dr. Chanthavysouk Keomanivong-Rattanakosin',
    settledBalance: usd('-12500'),
    exposure: usd('-15700'),
    pendingDebit: usd('3200'),
    reservedDebit: usd('0'),
    creditFloor: usd('-10000'),
    mandateState: 'renewal_required',
    attention: 'relink_required',
  },
  {
    doctorRef: 'doctor_00000000-0000-4000-8000-000000000104',
    displayName: 'Dr. Mealea Chan',
    settledBalance: usd('0'),
    exposure: usd('0'),
    pendingDebit: usd('0'),
    reservedDebit: usd('0'),
    creditFloor: usd('-5000'),
    mandateState: 'unlinked',
    attention: 'none',
  },
  {
    doctorRef: 'doctor_00000000-0000-4000-8000-000000000105',
    displayName: 'Dr. Ratha Kim',
    settledBalance: usd('-8200'),
    exposure: usd('-8200'),
    pendingDebit: usd('0'),
    reservedDebit: usd('0'),
    creditFloor: usd('-5000'),
    mandateState: 'frozen',
    attention: 'collection_frozen',
  },
];

export const selectedLedger: DoctorLedgerDetail = {
  ...doctorLedgers[0],
  pendingCredit: usd('7800'),
  earnedThisMonth: earnedSinceMonthStart(activityEntries, PERIOD_START),
  maskedAccount: 'ABA •••• 8842',
  mandateExpiresAt: '2030-01-15T02:00:00.000Z',
};

export const pullHistory: Pull[] = [
  {
    pullRef: 'pull-101',
    trigger: 'scheduled',
    state: 'failed',
    amount: usd('4860'),
    attemptedAt: '2026-07-15T02:00:00.000Z',
    failureReason: 'Provider declined the collection.',
    retrySlot: 1,
    retry: {
      allowed: true,
      reason: 'eligible',
      remainingSlots: 2,
      expiresAt: '2026-07-18T02:00:00.000Z',
      maximumAmount: usd('4860'),
    },
  },
  {
    pullRef: 'pull-102',
    trigger: 'scheduled_retry',
    state: 'failed',
    amount: usd('4860'),
    attemptedAt: '2026-07-16T02:00:00.000Z',
    failureReason: 'Insufficient funds.',
    retrySlot: 2,
    retry: {
      allowed: false,
      reason: 'notice_cap_exhausted',
      remainingSlots: 1,
      expiresAt: '2026-07-18T02:00:00.000Z',
      maximumAmount: usd('0'),
    },
  },
  {
    pullRef: 'pull-103',
    trigger: 'jit',
    state: 'succeeded',
    amount: usd('2500'),
    attemptedAt: '2026-07-09T06:24:00.000Z',
    failureReason: null,
    retrySlot: null,
    retry: {
      allowed: false,
      reason: 'not_scheduled',
      remainingSlots: 0,
      expiresAt: null,
      maximumAmount: usd('0'),
    },
  },
];

export const floorChanges = [
  {
    previousFloor: usd('-2500'),
    currentFloor: usd('-5000'),
    reason: 'Approved temporary increase during the clinic onboarding period.',
    changedBy: { actorRef: 'admin-101', displayName: 'Sophea Lim' },
    changedAt: '2026-07-01T03:14:00.000Z',
  },
  {
    previousFloor: usd('0'),
    currentFloor: usd('-2500'),
    reason: 'Initial finance risk review completed.',
    changedBy: { actorRef: 'admin-102', displayName: 'Dara Sok' },
    changedAt: '2026-06-14T04:20:00.000Z',
  },
];

export const adminFixture: AdminDoctorBankingFixture = {
  ledgers: doctorLedgers,
  selected: selectedLedger,
  entries: activityEntries,
  pulls: pullHistory,
  floorChanges,
  notifications: [failedPullNotification, ...doctorNotifications],
};

export type BalanceDemoScenario = {
  data: DoctorBankingFixture;
  state: DoctorBankingViewState;
  intent?: KhqrIntent | null;
  linkSession?: MandateLinkSession | null;
  downloadState?: 'idle' | 'loading' | 'success' | 'error';
};

function withMandate(mandate: MandateSummary): DoctorBankingFixture {
  return {
    ...doctorFixture,
    overview: { ...doctorFixture.overview, mandate },
  };
}

/** Storybook-owned Balance states consumed by the routed prototype adapter. */
export const BALANCE_DEMO_SCENARIOS = {
  'overview-green': { data: doctorFixture, state: 'ready' },
  'overview-red': { data: failedPullFixture, state: 'ready' },
  'overview-zero': { data: { ...doctorFixture, overview: zeroOverview }, state: 'ready' },
  'overview-pending-wall': {
    data: { ...doctorFixture, overview: pendingWallOverview },
    state: 'ready',
  },
  'overview-floor-pressure': {
    data: { ...doctorFixture, overview: floorPressureOverview },
    state: 'ready',
  },
  'overview-unavailable': {
    data: { ...doctorFixture, overview: unavailableOverview },
    state: 'ready',
  },
  'overview-licence-lapsed': {
    data: { ...doctorFixture, overview: licenceLapsedOverview },
    state: 'ready',
  },
  'overview-empty': { data: { ...doctorFixture, entries: [] }, state: 'ready' },
  'overview-loading': { data: doctorFixture, state: 'loading' },
  'overview-error': { data: doctorFixture, state: 'error' },
  'overview-permission': { data: doctorFixture, state: 'permission-denied' },
  'activity-failed-pull': { data: failedPullFixture, state: 'ready' },
  'activity-all-notifications': {
    data: { ...doctorFixture, entries: pagedActivityEntries, notifications: allNotifications },
    state: 'ready',
  },
  'activity-empty': {
    data: { ...doctorFixture, entries: [], notifications: [] },
    state: 'ready',
  },
  'activity-download-error': { data: doctorFixture, state: 'ready', downloadState: 'error' },
  'activity-download-success': { data: doctorFixture, state: 'ready', downloadState: 'success' },
  'auto-pay-linked': { data: withMandate(mandateByState.linked), state: 'ready' },
  'auto-pay-unlinked': { data: withMandate(mandateByState.unlinked), state: 'ready' },
  'auto-pay-pending': {
    data: withMandate(mandateByState.link_pending),
    state: 'ready',
    linkSession: pendingLinkSession,
  },
  'auto-pay-link-expired': {
    data: withMandate(mandateByState.link_pending),
    state: 'ready',
    linkSession: expiredLinkSession,
  },
  'auto-pay-link-long-running': {
    data: withMandate(mandateByState.link_pending),
    state: 'ready',
    linkSession: longRunningLinkSession,
  },
  'auto-pay-confirmed': {
    data: withMandate(mandateByState.link_pending),
    state: 'ready',
    linkSession: confirmedLinkSession,
  },
  'auto-pay-renewal': { data: withMandate(mandateByState.renewal_required), state: 'ready' },
  'auto-pay-expired': { data: withMandate(mandateByState.expired), state: 'ready' },
  'auto-pay-frozen': { data: withMandate(mandateByState.frozen), state: 'ready' },
  'auto-pay-deleted': { data: withMandate(mandateByState.deleted), state: 'ready' },
  'auto-pay-licence-lapsed': {
    data: { ...doctorFixture, overview: licenceLapsedUnlinkedOverview },
    state: 'ready',
  },
  'settle-pending': { data: failedPullFixture, state: 'ready', intent: pendingKhqr },
  'settle-expired': { data: failedPullFixture, state: 'ready', intent: expiredKhqr },
  'settle-confirmed': { data: failedPullFixture, state: 'ready', intent: confirmedKhqr },
  'settle-nothing-due': { data: { ...doctorFixture, overview: zeroOverview }, state: 'ready' },
} as const satisfies Record<string, BalanceDemoScenario>;

export type BalanceDemoScenarioId = keyof typeof BALANCE_DEMO_SCENARIOS;
