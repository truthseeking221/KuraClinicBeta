import type {
  AdminDoctorBankingFixture,
  DoctorBankingFixture,
  DoctorBankingOverview,
  DoctorFinancialNotification,
  DoctorLedgerDetail,
  DoctorLedgerSummary,
  KhqrIntent,
  LedgerEntry,
  MandateLinkSession,
  MandateSummary,
  Pull,
} from './types';

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

const baseOverview: DoctorBankingOverview = {
  doctorRef: 'doctor_00000000-0000-4000-8000-000000000101',
  settledBalance: { minor: '18450', currency: 'USD' },
  pendingDebit: { minor: '3200', currency: 'USD' },
  pendingCredit: { minor: '7800', currency: 'USD' },
  reservedDebit: { minor: '1200', currency: 'USD' },
  exposure: { minor: '21850', currency: 'USD' },
  creditFloor: { minor: '-5000', currency: 'USD' },
  earnedThisPeriod: { minor: '84250', currency: 'USD' },
  nextSweep: {
    date: '2026-08-01',
    maximumAmount: { minor: '0', currency: 'USD' },
    noticeState: 'not_due',
  },
  mandate: linkedMandate,
};

export const greenOverview = baseOverview;

export const redOverview: DoctorBankingOverview = {
  ...baseOverview,
  settledBalance: { minor: '-4860', currency: 'USD' },
  exposure: { minor: '-8060', currency: 'USD' },
  nextSweep: {
    date: '2026-08-01',
    maximumAmount: { minor: '4860', currency: 'USD' },
    noticeState: 'sent',
  },
};

export const zeroOverview: DoctorBankingOverview = {
  ...baseOverview,
  settledBalance: { minor: '0', currency: 'USD' },
  exposure: { minor: '0', currency: 'USD' },
  pendingDebit: { minor: '0', currency: 'USD' },
  pendingCredit: { minor: '0', currency: 'USD' },
  reservedDebit: { minor: '0', currency: 'USD' },
  nextSweep: null,
};

export const unavailableOverview: DoctorBankingOverview = {
  ...baseOverview,
  settledBalance: { minor: '-9223372036854775808', currency: 'USD' },
};

export const activityEntries: LedgerEntry[] = [
  {
    entryRef: 'entry-101',
    kind: 'completion_credit',
    state: 'settled',
    amount: { minor: '4200', currency: 'USD' },
    occurredAt: '2026-07-18T04:12:00.000Z',
    title: 'Consultation completed',
    detail: 'Consultation earnings released after order completion.',
    orderRef: 'ORD-2841',
    workspaceLabel: 'Mekong Clinic · BKK1',
  },
  {
    entryRef: 'entry-102',
    kind: 'pending_debit',
    state: 'pending',
    amount: { minor: '-3200', currency: 'USD' },
    occurredAt: '2026-07-18T03:45:00.000Z',
    title: 'Lab order pending',
    detail: 'Reserved against the proposed order until completion or void.',
    orderRef: 'ORD-2849',
    workspaceLabel: 'Kura Cabinet, Toul Kork',
  },
  {
    entryRef: 'entry-103',
    kind: 'connect_credit',
    state: 'settled',
    amount: { minor: '500', currency: 'USD' },
    occurredAt: '2026-07-17T02:15:00.000Z',
    title: 'First ABA link credit',
    detail: 'One-time credit after ABA confirmed the first successful link.',
    orderRef: null,
    workspaceLabel: null,
  },
  {
    entryRef: 'entry-104',
    kind: 'aba_pull_credit',
    state: 'settled',
    amount: { minor: '4860', currency: 'USD' },
    occurredAt: '2026-07-15T02:00:00.000Z',
    title: 'Scheduled ABA collection',
    detail: 'Collected after the pre-notice window.',
    orderRef: null,
    workspaceLabel: null,
  },
  {
    entryRef: 'entry-105',
    kind: 'pending_credit',
    state: 'pending',
    amount: { minor: '7800', currency: 'USD' },
    occurredAt: '2026-07-14T09:18:00.000Z',
    title: 'Earnings in progress',
    detail: 'The associated work is complete; financial settlement is still pending.',
    orderRef: 'ORD-2812',
    workspaceLabel: 'Mekong Clinic · BKK1',
  },
  {
    entryRef: 'entry-106',
    kind: 'admin_adjustment',
    state: 'settled',
    amount: { minor: '-1250', currency: 'USD' },
    occurredAt: '2026-07-12T08:02:00.000Z',
    title: 'Order correction',
    detail: 'Correction recorded by Finance: duplicate earning reversed.',
    orderRef: 'ORD-2760',
    workspaceLabel: 'Kura Cabinet, Toul Kork',
  },
  {
    entryRef: 'entry-107',
    kind: 'khqr_credit',
    state: 'settled',
    amount: { minor: '2500', currency: 'USD' },
    occurredAt: '2026-07-10T06:31:00.000Z',
    title: 'KHQR settlement received',
    detail: 'Payment confirmed by the provider and applied to the ledger.',
    orderRef: null,
    workspaceLabel: null,
  },
  {
    entryRef: 'entry-108',
    kind: 'pending_void',
    state: 'voided',
    amount: { minor: '1200', currency: 'USD' },
    occurredAt: '2026-07-08T05:12:00.000Z',
    title: 'Reservation released',
    detail: 'The proposed order was cancelled before completion.',
    orderRef: 'ORD-2710',
    workspaceLabel: 'Mekong Clinic · BKK1',
  },
  {
    entryRef: 'entry-109',
    kind: 'completion_credit',
    state: 'settled',
    amount: { minor: '15600', currency: 'USD' },
    occurredAt: '2026-07-02T10:42:00.000Z',
    title: 'Extended consultation completed',
    detail:
      'Complex diabetes and chronic kidney disease consultation earnings released after completion.',
    orderRef: 'ORD-2651',
    workspaceLabel: 'Kura Cabinet, Toul Kork · Endocrinology and internal medicine',
  },
];

export const doctorNotifications: DoctorFinancialNotification[] = [
  {
    notificationRef: 'notification-101',
    audience: 'doctor',
    kind: 'pre_notice',
    occurredAt: '2026-07-13T02:00:00.000Z',
    sweepDate: '2026-07-15',
    originalCap: { minor: '4860', currency: 'USD' },
    remainingCap: { minor: '0', currency: 'USD' },
    state: 'collected',
  },
  {
    notificationRef: 'notification-102',
    audience: 'doctor',
    kind: 'receipt',
    occurredAt: '2026-07-15T02:00:00.000Z',
    source: 'scheduled',
    amount: { minor: '4860', currency: 'USD' },
    balanceAfter: { minor: '0', currency: 'USD' },
  },
  {
    notificationRef: 'notification-103',
    audience: 'doctor',
    kind: 'mandate',
    occurredAt: '2026-07-17T02:15:00.000Z',
    event: 'linked',
    maskedAccount: 'ABA •••• 8842',
    expiresAt: '2030-01-15T02:00:00.000Z',
    connectCredit: { minor: '500', currency: 'USD' },
    remainingBalance: null,
  },
];

export const failedPullNotification: DoctorFinancialNotification = {
  notificationRef: 'notification-104',
  audience: 'doctor',
  kind: 'pull_failed',
  occurredAt: '2026-07-16T02:00:00.000Z',
  pullRef: 'pull-102',
  trigger: 'scheduled_retry',
  retrySlot: 2,
  amount: { minor: '4860', currency: 'USD' },
  failureReason: 'The provider declined this collection attempt.',
  retryState: 'retry_pending',
  nextAction: 'retry_tomorrow',
};

export const doctorFixture: DoctorBankingFixture = {
  overview: greenOverview,
  entries: activityEntries,
  notifications: doctorNotifications,
};

export const redDoctorFixture: DoctorBankingFixture = {
  overview: redOverview,
  entries: activityEntries,
  notifications: [failedPullNotification, ...doctorNotifications],
};

export const pendingKhqr: KhqrIntent = {
  settlementRef: 'settlement-101',
  purpose: 'settled_red',
  amount: { minor: '4860', currency: 'USD' },
  qrPayload: '000201010212fixture-khqr',
  expiresAt: '2030-01-15T02:10:00.000Z',
  state: 'pending',
};

export const expiredKhqr: KhqrIntent = {
  ...pendingKhqr,
  expiresAt: '2026-07-16T02:00:00.000Z',
  state: 'expired',
};

export const confirmedKhqr: KhqrIntent = {
  ...pendingKhqr,
  state: 'confirmed',
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

export const doctorLedgers: DoctorLedgerSummary[] = [
  {
    doctorRef: 'doctor_00000000-0000-4000-8000-000000000101',
    displayName: 'Dr. Phong Tuy',
    settledBalance: { minor: '-4860', currency: 'USD' },
    exposure: { minor: '-8060', currency: 'USD' },
    pendingDebit: { minor: '3200', currency: 'USD' },
    reservedDebit: { minor: '1200', currency: 'USD' },
    creditFloor: { minor: '-5000', currency: 'USD' },
    mandateState: 'linked',
    attention: 'failed_pull',
  },
  {
    doctorRef: 'doctor_00000000-0000-4000-8000-000000000102',
    displayName: 'Dr. Sok Vanna',
    settledBalance: { minor: '18450', currency: 'USD' },
    exposure: { minor: '21850', currency: 'USD' },
    pendingDebit: { minor: '0', currency: 'USD' },
    reservedDebit: { minor: '0', currency: 'USD' },
    creditFloor: { minor: '-5000', currency: 'USD' },
    mandateState: 'linked',
    attention: 'none',
  },
  {
    doctorRef: 'doctor_00000000-0000-4000-8000-000000000103',
    displayName: 'Dr. Chanthavysouk Keomanivong-Rattanakosin',
    settledBalance: { minor: '-12500', currency: 'USD' },
    exposure: { minor: '-15700', currency: 'USD' },
    pendingDebit: { minor: '3200', currency: 'USD' },
    reservedDebit: { minor: '0', currency: 'USD' },
    creditFloor: { minor: '-10000', currency: 'USD' },
    mandateState: 'renewal_required',
    attention: 'relink_required',
  },
  {
    doctorRef: 'doctor_00000000-0000-4000-8000-000000000104',
    displayName: 'Dr. Mealea Chan',
    settledBalance: { minor: '0', currency: 'USD' },
    exposure: { minor: '0', currency: 'USD' },
    pendingDebit: { minor: '0', currency: 'USD' },
    reservedDebit: { minor: '0', currency: 'USD' },
    creditFloor: { minor: '-5000', currency: 'USD' },
    mandateState: 'unlinked',
    attention: 'none',
  },
  {
    doctorRef: 'doctor_00000000-0000-4000-8000-000000000105',
    displayName: 'Dr. Ratha Kim',
    settledBalance: { minor: '-8200', currency: 'USD' },
    exposure: { minor: '-8200', currency: 'USD' },
    pendingDebit: { minor: '0', currency: 'USD' },
    reservedDebit: { minor: '0', currency: 'USD' },
    creditFloor: { minor: '-5000', currency: 'USD' },
    mandateState: 'frozen',
    attention: 'collection_frozen',
  },
];

export const selectedLedger: DoctorLedgerDetail = {
  ...doctorLedgers[0],
  pendingCredit: { minor: '7800', currency: 'USD' },
  earnedThisPeriod: { minor: '84250', currency: 'USD' },
  maskedAccount: 'ABA •••• 8842',
  mandateExpiresAt: '2030-01-15T02:00:00.000Z',
};

export const pullHistory: Pull[] = [
  {
    pullRef: 'pull-101',
    trigger: 'scheduled',
    state: 'failed',
    amount: { minor: '4860', currency: 'USD' },
    attemptedAt: '2026-07-15T02:00:00.000Z',
    failureReason: 'Provider declined the collection.',
    retrySlot: 1,
    retry: {
      allowed: true,
      reason: 'eligible',
      remainingSlots: 2,
      expiresAt: '2026-07-18T02:00:00.000Z',
      maximumAmount: { minor: '4860', currency: 'USD' },
    },
  },
  {
    pullRef: 'pull-102',
    trigger: 'scheduled_retry',
    state: 'failed',
    amount: { minor: '4860', currency: 'USD' },
    attemptedAt: '2026-07-16T02:00:00.000Z',
    failureReason: 'Insufficient funds.',
    retrySlot: 2,
    retry: {
      allowed: false,
      reason: 'notice_cap_exhausted',
      remainingSlots: 1,
      expiresAt: '2026-07-18T02:00:00.000Z',
      maximumAmount: { minor: '0', currency: 'USD' },
    },
  },
  {
    pullRef: 'pull-103',
    trigger: 'jit',
    state: 'succeeded',
    amount: { minor: '2500', currency: 'USD' },
    attemptedAt: '2026-07-09T06:24:00.000Z',
    failureReason: null,
    retrySlot: null,
    retry: {
      allowed: false,
      reason: 'not_scheduled',
      remainingSlots: 0,
      expiresAt: null,
      maximumAmount: { minor: '0', currency: 'USD' },
    },
  },
];

export const floorChanges = [
  {
    previousFloor: { minor: '-2500', currency: 'USD' as const },
    currentFloor: { minor: '-5000', currency: 'USD' as const },
    reason: 'Approved temporary increase during the clinic onboarding period.',
    changedBy: { actorRef: 'admin-101', displayName: 'Sophea Lim' },
    changedAt: '2026-07-01T03:14:00.000Z',
  },
  {
    previousFloor: { minor: '0', currency: 'USD' as const },
    currentFloor: { minor: '-2500', currency: 'USD' as const },
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
