export type SignedUsdMinor = string;
export type AmountUsdMinor = string;
export type IsoDateTime = string;

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

export type DoctorBankingOverview = {
  doctorRef: string;
  settledBalance: SignedMoney;
  pendingDebit: Amount;
  pendingCredit: Amount;
  reservedDebit: Amount;
  exposure: SignedMoney;
  creditFloor: SignedMoney;
  earnedThisPeriod: Amount;
  nextSweep: null | {
    date: string;
    maximumAmount: Amount;
    noticeState: 'not_due' | 'due' | 'sent';
  };
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
};

export type DoctorFinancialNotification =
  | {
      notificationRef: string;
      audience: 'doctor';
      kind: 'pre_notice';
      occurredAt: IsoDateTime;
      sweepDate: string;
      originalCap: Amount;
      remainingCap: Amount;
      state: 'pending_record' | 'sent' | 'partly_collected' | 'collected' | 'expired';
    }
  | {
      notificationRef: string;
      audience: 'doctor';
      kind: 'receipt';
      occurredAt: IsoDateTime;
      source: 'khqr' | PullTrigger;
      amount: Amount;
      balanceAfter: SignedMoney;
    }
  | {
      notificationRef: string;
      audience: 'doctor';
      kind: 'pull_failed';
      occurredAt: IsoDateTime;
      pullRef: string;
      trigger: PullTrigger;
      retrySlot: 1 | 2 | 3 | null;
      amount: Amount;
      failureReason: string;
      retryState: 'retry_pending' | 'retries_exhausted' | 'not_retryable';
      nextAction: 'retry_tomorrow' | 'settle_now' | 'relink' | 'wait_next_sweep';
    }
  | {
      notificationRef: string;
      audience: 'doctor';
      kind: 'mandate';
      occurredAt: IsoDateTime;
      event: 'linked' | 'renewal_required' | 'expired' | 'unlinked';
      maskedAccount: string | null;
      expiresAt: IsoDateTime | null;
      connectCredit: Amount | null;
      remainingBalance: SignedMoney | null;
    }
  | {
      notificationRef: string;
      audience: 'doctor';
      kind: 'adjustment';
      occurredAt: IsoDateTime;
      entryRef: string;
      amount: SignedMoney;
      reason: string;
    };

export type KhqrIntent = {
  settlementRef: string;
  purpose: 'settled_red' | 'pending_shortfall';
  amount: Amount;
  qrPayload: string;
  expiresAt: IsoDateTime;
  state: 'pending' | 'confirmed' | 'expired';
};

export type MandateLinkSession = {
  linkRef: string;
  desktopQrPayload: string;
  mobileDeepLink: string;
  expiresAt: IsoDateTime;
  state: 'pending' | 'confirmed' | 'expired';
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
  earnedThisPeriod: Amount;
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

export type DoctorBankingViewState = 'ready' | 'loading' | 'error' | 'permission-denied';

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
