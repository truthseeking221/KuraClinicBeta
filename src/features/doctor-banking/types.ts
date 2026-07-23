export type SignedUsdMinor = string;
export type AmountUsdMinor = string;
export type IsoDateTime = string;
/** Date-only value, `YYYY-MM-DD`. */
export type IsoDate = string;

export type SignedMoney = {
  minor: SignedUsdMinor;
  currency: 'USD';
};

export type Amount = {
  minor: AmountUsdMinor;
  currency: 'USD';
};

export type LedgerEntryKind =
  | 'pending_debit'
  | 'pending_credit'
  | 'completion_debit'
  | 'completion_credit'
  | 'pending_adjustment'
  | 'pending_void'
  | 'physical_settlement_offset'
  | 'khqr_credit'
  | 'aba_pull_credit'
  | 'connect_credit'
  | 'admin_adjustment';

export type LedgerEntryState = 'pending' | 'settled' | 'voided';

export type MandateState =
  | 'unlinked'
  | 'link_pending'
  | 'linked'
  | 'renewal_required'
  | 'expired'
  | 'frozen'
  | 'deleted';

export type MandateSummary = {
  state: MandateState;
  maskedAccount: string | null;
  expiresAt: IsoDateTime | null;
  renewalPromptAt: IsoDateTime | null;
  firstLinkCreditGranted: boolean;
};

/**
 * Licence state is separate from the view state on purpose. A doctor whose
 * licence lapses keeps an existing ledger: balance, activity, settlement, and
 * unlink stay available; only new linking and new ordering are blocked. Only a
 * doctor who never had a ledger renders the `not-eligible` view state.
 */
export type LicenceState = 'verified' | 'lapsed';

export type SweepNotice = {
  date: IsoDate;
  maximumAmount: Amount;
  noticeState: 'not_due' | 'due' | 'sent';
  /** Cap at the time the notice was sent; a manual payment lowers `maximumAmount` only. */
  noticedAmount: Amount | null;
};

export type DoctorBankingOverview = {
  doctorRef: string;
  /** First day of the earnings month. Labels the hero; never inferred from `now`. */
  periodStart: IsoDate;
  /**
   * Settled positive `completion_credit` since `periodStart`. Pending earnings
   * are never included — they have not been earned yet.
   */
  earnedThisMonth: Amount;
  settledBalance: SignedMoney;
  pendingDebit: Amount;
  pendingCredit: Amount;
  reservedDebit: Amount;
  /** Projected balance if every in-progress order completes. Domain name: exposure. */
  exposure: SignedMoney;
  creditFloor: SignedMoney;
  licence: LicenceState;
  nextSweep: SweepNotice | null;
  mandate: MandateSummary;
};

export type LedgerEntry = {
  entryRef: string;
  kind: LedgerEntryKind;
  state: LedgerEntryState;
  amount: SignedMoney;
  occurredAt: IsoDateTime;
  title: string;
  detail: string;
  orderRef: string | null;
  workspaceLabel: string | null;
  /** Set when this entry reverses another. The reversed entry is never mutated. */
  reversalOfEntryRef: string | null;
};

export type NotificationChannel = 'in_app' | 'sms' | 'email';
export type NotificationChannelState = 'pending' | 'accepted' | 'failed';

export type NotificationDelivery = {
  channel: NotificationChannel;
  state: NotificationChannelState;
};

type NotificationBase = {
  notificationRef: string;
  audience: 'doctor';
  occurredAt: IsoDateTime;
  channels: NotificationDelivery[];
};

export type DoctorFinancialNotification =
  | (NotificationBase & {
      kind: 'pre_notice';
      sweepDate: IsoDate;
      originalCap: Amount;
      remainingCap: Amount;
      state: 'pending_record' | 'sent' | 'partly_collected' | 'collected' | 'expired';
    })
  | (NotificationBase & {
      kind: 'receipt';
      source: 'khqr' | PullTrigger;
      amount: Amount;
      balanceAfter: SignedMoney;
      receiptRef: string;
    })
  | (NotificationBase & {
      kind: 'pull_failed';
      pullRef: string;
      trigger: PullTrigger;
      retrySlot: 1 | 2 | 3 | null;
      amount: Amount;
      failureReason: string;
      retryState: 'retry_pending' | 'retries_exhausted' | 'not_retryable';
      nextAction: 'retry_tomorrow' | 'settle_now' | 'relink' | 'wait_next_sweep';
      retryDate: IsoDate | null;
    })
  | (NotificationBase & {
      kind: 'mandate';
      event: 'linked' | 'renewal_required' | 'expired' | 'unlinked';
      maskedAccount: string | null;
      expiresAt: IsoDateTime | null;
      connectCredit: Amount | null;
      remainingBalance: SignedMoney | null;
    })
  | (NotificationBase & {
      kind: 'adjustment';
      entryRef: string;
      amount: SignedMoney;
      reason: string;
    });

export type KhqrIntent = {
  settlementRef: string;
  purpose: 'settled_red' | 'pending_shortfall';
  amount: Amount;
  qrPayload: string;
  expiresAt: IsoDateTime;
  state: 'pending' | 'confirmed' | 'expired';
  /** Present only once the provider confirms. */
  receiptRef: string | null;
  balanceAfter: SignedMoney | null;
};

export type MandateLinkSession = {
  linkRef: string;
  desktopQrPayload: string;
  mobileDeepLink: string;
  expiresAt: IsoDateTime;
  /** `long_running` keeps the pending contract while telling the doctor how to recover. */
  state: 'pending' | 'long_running' | 'confirmed' | 'expired';
};

export type PullTrigger =
  | 'scheduled'
  | 'scheduled_retry'
  | 'admin_retry'
  | 'jit'
  | 'final_unlink';

export type PullState = 'pending' | 'succeeded' | 'failed' | 'cancelled';

export type Pull = {
  pullRef: string;
  trigger: PullTrigger;
  state: PullState;
  amount: Amount;
  attemptedAt: IsoDateTime;
  failureReason: string | null;
  retrySlot: 1 | 2 | 3 | null;
  retry: {
    allowed: boolean;
    reason:
      | 'eligible'
      | 'window_expired'
      | 'not_scheduled'
      | 'budget_exhausted'
      | 'notice_cap_exhausted';
    remainingSlots: number;
    expiresAt: IsoDateTime | null;
    maximumAmount: Amount;
  };
};

/**
 * Order funding gate decisions. Composing an order consults the ledger; intake
 * conversion never does, so a patient is never blocked by a doctor's balance.
 */
export type OrderFundingDecision =
  | { kind: 'allow'; headroom: SignedMoney }
  | {
      kind: 'khqr_settled_red';
      amount: Amount;
      reason: 'mandate_unavailable' | 'jit_failed';
    }
  | { kind: 'khqr_pending_shortfall'; amount: Amount; floor: SignedMoney }
  | { kind: 'jit_processing'; amount: Amount }
  | { kind: 'jit_succeeded'; amount: Amount; balanceAfter: SignedMoney }
  | { kind: 'prescriber_action_required'; reason: string };

export type DoctorLedgerSummary = {
  doctorRef: string;
  displayName: string;
  settledBalance: SignedMoney;
  exposure: SignedMoney;
  pendingDebit: Amount;
  reservedDebit: Amount;
  creditFloor: SignedMoney;
  mandateState: MandateState;
  attention: 'none' | 'collection_frozen' | 'failed_pull' | 'relink_required';
};

export type DoctorLedgerDetail = DoctorLedgerSummary & {
  pendingCredit: Amount;
  earnedThisMonth: Amount;
  maskedAccount: string | null;
  mandateExpiresAt: IsoDateTime | null;
};

export type FloorChange = {
  previousFloor: SignedMoney;
  currentFloor: SignedMoney;
  reason: string;
  changedBy: { actorRef: string; displayName: string };
  changedAt: IsoDateTime;
};

/**
 * `not-eligible` is the doctor who never had a ledger. A lapsed licence on an
 * existing ledger is `ready` plus `overview.licence === 'lapsed'`.
 */
export type DoctorBankingViewState =
  | 'ready'
  | 'loading'
  | 'error'
  | 'permission-denied'
  | 'not-eligible';

export type DoctorBankingFixture = {
  overview: DoctorBankingOverview;
  entries: LedgerEntry[];
  notifications: DoctorFinancialNotification[];
};

export type AdminDoctorBankingFixture = {
  ledgers: DoctorLedgerSummary[];
  selected: DoctorLedgerDetail;
  entries: LedgerEntry[];
  pulls: Pull[];
  floorChanges: FloorChange[];
  notifications: DoctorFinancialNotification[];
};
