import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{a as n,i as r,n as i,r as a,t as o}from"./doctor-banking-5bnktGI2.js";function s({data:e,downloadState:t,intent:n,linkSession:s,onBeginLink:l,onCreateKhqr:u,onDownload:d,onNavigate:f,onOpenLicence:p,onRefresh:m,onRegenerate:h,onRegenerateLink:g,onRenew:_,onRetry:v,onUnlink:y,route:b,state:x}){let S=()=>f(`overview`);return b===`activity`?(0,c.jsx)(r,{data:e,downloadState:t,onBack:S,onDownload:d,onOpenLicence:p,onRetry:v,state:x}):b===`settle`?(0,c.jsx)(a,{intent:n,onBack:S,onCreateKhqr:u,onOpenLicence:p,onRefresh:m,onRegenerate:h,onRetry:v,overview:e.overview,state:x}):b===`auto-pay`?(0,c.jsx)(i,{linkSession:s,mandate:e.overview.mandate,onBack:S,onBeginLink:l,onOpenLicence:p,onRegenerateLink:g,onRenew:_,onRetry:v,onUnlink:y,state:x}):(0,c.jsx)(o,{data:e,onManageAutoPay:()=>f(`auto-pay`),onOpenLicence:p,onOpenStatements:()=>f(`activity`),onRetry:v,onSettle:()=>f(`settle`),state:x})}var c,l=e((()=>{c=t(),n(),s.__docgenInfo={description:`Canonical person-owned Earnings composition shared by Storybook and the app.`,methods:[],displayName:`DoctorEarningsWorkspace`,props:{data:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  overview: DoctorBankingOverview;
  entries: LedgerEntry[];
  notifications: DoctorFinancialNotification[];
}`,signature:{properties:[{key:`overview`,value:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`doctorRef`,value:{name:`string`,required:!0}},{key:`settledBalance`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`pendingDebit`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`pendingCredit`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`reservedDebit`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`exposure`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`creditFloor`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`earnedThisPeriod`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`nextSweep`,value:{name:`union`,raw:`null | {
  date: string;
  maximumAmount: Amount;
  noticeState: 'not_due' | 'due' | 'sent';
}`,elements:[{name:`null`},{name:`signature`,type:`object`,raw:`{
  date: string;
  maximumAmount: Amount;
  noticeState: 'not_due' | 'due' | 'sent';
}`,signature:{properties:[{key:`date`,value:{name:`string`,required:!0}},{key:`maximumAmount`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`noticeState`,value:{name:`union`,raw:`'not_due' | 'due' | 'sent'`,elements:[{name:`literal`,value:`'not_due'`},{name:`literal`,value:`'due'`},{name:`literal`,value:`'sent'`}],required:!0}}]}}],required:!0}},{key:`mandate`,value:{name:`signature`,type:`object`,raw:`{
  state: MandateState;
  maskedAccount: string | null;
  expiresAt: IsoDateTime | null;
  renewalPromptAt: IsoDateTime | null;
  firstLinkCreditGranted: boolean;
}`,signature:{properties:[{key:`state`,value:{name:`union`,raw:`| 'unlinked'
| 'link_pending'
| 'linked'
| 'renewal_required'
| 'expired'
| 'frozen'
| 'deleted'`,elements:[{name:`literal`,value:`'unlinked'`},{name:`literal`,value:`'link_pending'`},{name:`literal`,value:`'linked'`},{name:`literal`,value:`'renewal_required'`},{name:`literal`,value:`'expired'`},{name:`literal`,value:`'frozen'`},{name:`literal`,value:`'deleted'`}],required:!0}},{key:`maskedAccount`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`expiresAt`,value:{name:`union`,raw:`IsoDateTime | null`,elements:[{name:`string`,required:!0},{name:`null`}],required:!0}},{key:`renewalPromptAt`,value:{name:`union`,raw:`IsoDateTime | null`,elements:[{name:`string`,required:!0},{name:`null`}],required:!0}},{key:`firstLinkCreditGranted`,value:{name:`boolean`,required:!0}}]},required:!0}}]},required:!0}},{key:`entries`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  entryRef: string;
  kind: LedgerEntryKind;
  state: LedgerEntryState;
  amount: SignedMoney;
  occurredAt: IsoDateTime;
  title: string;
  detail: string;
  orderRef: string | null;
  workspaceLabel: string | null;
}`,signature:{properties:[{key:`entryRef`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`| 'pending_debit'
| 'pending_credit'
| 'completion_debit'
| 'completion_credit'
| 'pending_adjustment'
| 'pending_void'
| 'physical_settlement_offset'
| 'khqr_credit'
| 'aba_pull_credit'
| 'connect_credit'
| 'admin_adjustment'`,elements:[{name:`literal`,value:`'pending_debit'`},{name:`literal`,value:`'pending_credit'`},{name:`literal`,value:`'completion_debit'`},{name:`literal`,value:`'completion_credit'`},{name:`literal`,value:`'pending_adjustment'`},{name:`literal`,value:`'pending_void'`},{name:`literal`,value:`'physical_settlement_offset'`},{name:`literal`,value:`'khqr_credit'`},{name:`literal`,value:`'aba_pull_credit'`},{name:`literal`,value:`'connect_credit'`},{name:`literal`,value:`'admin_adjustment'`}],required:!0}},{key:`state`,value:{name:`union`,raw:`'pending' | 'settled' | 'voided'`,elements:[{name:`literal`,value:`'pending'`},{name:`literal`,value:`'settled'`},{name:`literal`,value:`'voided'`}],required:!0}},{key:`amount`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`occurredAt`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`detail`,value:{name:`string`,required:!0}},{key:`orderRef`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`workspaceLabel`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}}]}}],raw:`LedgerEntry[]`,required:!0}},{key:`notifications`,value:{name:`Array`,elements:[{name:`union`,raw:`| {
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
  }`,elements:[{name:`signature`,type:`object`,raw:`{
  notificationRef: string;
  audience: 'doctor';
  kind: 'pre_notice';
  occurredAt: IsoDateTime;
  sweepDate: string;
  originalCap: Amount;
  remainingCap: Amount;
  state: 'pending_record' | 'sent' | 'partly_collected' | 'collected' | 'expired';
}`,signature:{properties:[{key:`notificationRef`,value:{name:`string`,required:!0}},{key:`audience`,value:{name:`literal`,value:`'doctor'`,required:!0}},{key:`kind`,value:{name:`literal`,value:`'pre_notice'`,required:!0}},{key:`occurredAt`,value:{name:`string`,required:!0}},{key:`sweepDate`,value:{name:`string`,required:!0}},{key:`originalCap`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`remainingCap`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`state`,value:{name:`union`,raw:`'pending_record' | 'sent' | 'partly_collected' | 'collected' | 'expired'`,elements:[{name:`literal`,value:`'pending_record'`},{name:`literal`,value:`'sent'`},{name:`literal`,value:`'partly_collected'`},{name:`literal`,value:`'collected'`},{name:`literal`,value:`'expired'`}],required:!0}}]}},{name:`signature`,type:`object`,raw:`{
  notificationRef: string;
  audience: 'doctor';
  kind: 'receipt';
  occurredAt: IsoDateTime;
  source: 'khqr' | PullTrigger;
  amount: Amount;
  balanceAfter: SignedMoney;
}`,signature:{properties:[{key:`notificationRef`,value:{name:`string`,required:!0}},{key:`audience`,value:{name:`literal`,value:`'doctor'`,required:!0}},{key:`kind`,value:{name:`literal`,value:`'receipt'`,required:!0}},{key:`occurredAt`,value:{name:`string`,required:!0}},{key:`source`,value:{name:`union`,raw:`'khqr' | PullTrigger`,elements:[{name:`literal`,value:`'khqr'`},{name:`union`,raw:`| 'scheduled'
| 'scheduled_retry'
| 'admin_retry'
| 'jit'
| 'final_unlink'`,elements:[{name:`literal`,value:`'scheduled'`},{name:`literal`,value:`'scheduled_retry'`},{name:`literal`,value:`'admin_retry'`},{name:`literal`,value:`'jit'`},{name:`literal`,value:`'final_unlink'`}],required:!0}],required:!0}},{key:`amount`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`balanceAfter`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}}]}},{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`notificationRef`,value:{name:`string`,required:!0}},{key:`audience`,value:{name:`literal`,value:`'doctor'`,required:!0}},{key:`kind`,value:{name:`literal`,value:`'pull_failed'`,required:!0}},{key:`occurredAt`,value:{name:`string`,required:!0}},{key:`pullRef`,value:{name:`string`,required:!0}},{key:`trigger`,value:{name:`union`,raw:`| 'scheduled'
| 'scheduled_retry'
| 'admin_retry'
| 'jit'
| 'final_unlink'`,elements:[{name:`literal`,value:`'scheduled'`},{name:`literal`,value:`'scheduled_retry'`},{name:`literal`,value:`'admin_retry'`},{name:`literal`,value:`'jit'`},{name:`literal`,value:`'final_unlink'`}],required:!0}},{key:`retrySlot`,value:{name:`union`,raw:`1 | 2 | 3 | null`,elements:[{name:`literal`,value:`1`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`null`}],required:!0}},{key:`amount`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`failureReason`,value:{name:`string`,required:!0}},{key:`retryState`,value:{name:`union`,raw:`'retry_pending' | 'retries_exhausted' | 'not_retryable'`,elements:[{name:`literal`,value:`'retry_pending'`},{name:`literal`,value:`'retries_exhausted'`},{name:`literal`,value:`'not_retryable'`}],required:!0}},{key:`nextAction`,value:{name:`union`,raw:`'retry_tomorrow' | 'settle_now' | 'relink' | 'wait_next_sweep'`,elements:[{name:`literal`,value:`'retry_tomorrow'`},{name:`literal`,value:`'settle_now'`},{name:`literal`,value:`'relink'`},{name:`literal`,value:`'wait_next_sweep'`}],required:!0}}]}},{name:`signature`,type:`object`,raw:`{
  notificationRef: string;
  audience: 'doctor';
  kind: 'mandate';
  occurredAt: IsoDateTime;
  event: 'linked' | 'renewal_required' | 'expired' | 'unlinked';
  maskedAccount: string | null;
  expiresAt: IsoDateTime | null;
  connectCredit: Amount | null;
  remainingBalance: SignedMoney | null;
}`,signature:{properties:[{key:`notificationRef`,value:{name:`string`,required:!0}},{key:`audience`,value:{name:`literal`,value:`'doctor'`,required:!0}},{key:`kind`,value:{name:`literal`,value:`'mandate'`,required:!0}},{key:`occurredAt`,value:{name:`string`,required:!0}},{key:`event`,value:{name:`union`,raw:`'linked' | 'renewal_required' | 'expired' | 'unlinked'`,elements:[{name:`literal`,value:`'linked'`},{name:`literal`,value:`'renewal_required'`},{name:`literal`,value:`'expired'`},{name:`literal`,value:`'unlinked'`}],required:!0}},{key:`maskedAccount`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`expiresAt`,value:{name:`union`,raw:`IsoDateTime | null`,elements:[{name:`string`,required:!0},{name:`null`}],required:!0}},{key:`connectCredit`,value:{name:`union`,raw:`Amount | null`,elements:[{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0},{name:`null`}],required:!0}},{key:`remainingBalance`,value:{name:`union`,raw:`SignedMoney | null`,elements:[{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0},{name:`null`}],required:!0}}]}},{name:`signature`,type:`object`,raw:`{
  notificationRef: string;
  audience: 'doctor';
  kind: 'adjustment';
  occurredAt: IsoDateTime;
  entryRef: string;
  amount: SignedMoney;
  reason: string;
}`,signature:{properties:[{key:`notificationRef`,value:{name:`string`,required:!0}},{key:`audience`,value:{name:`literal`,value:`'doctor'`,required:!0}},{key:`kind`,value:{name:`literal`,value:`'adjustment'`,required:!0}},{key:`occurredAt`,value:{name:`string`,required:!0}},{key:`entryRef`,value:{name:`string`,required:!0}},{key:`amount`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`reason`,value:{name:`string`,required:!0}}]}}]}],raw:`DoctorFinancialNotification[]`,required:!0}}]}},description:``},route:{required:!0,tsType:{name:`union`,raw:`'overview' | 'activity' | 'settle' | 'auto-pay'`,elements:[{name:`literal`,value:`'overview'`},{name:`literal`,value:`'activity'`},{name:`literal`,value:`'settle'`},{name:`literal`,value:`'auto-pay'`}]},description:``},state:{required:!1,tsType:{name:`union`,raw:`| 'ready'
| 'loading'
| 'error'
| 'permission-denied'
| 'not-eligible'`,elements:[{name:`literal`,value:`'ready'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'permission-denied'`},{name:`literal`,value:`'not-eligible'`}]},description:``},intent:{required:!1,tsType:{name:`union`,raw:`KhqrIntent | null`,elements:[{name:`signature`,type:`object`,raw:`{
  settlementRef: string;
  purpose: 'settled_red' | 'pending_shortfall';
  amount: Amount;
  qrPayload: string;
  expiresAt: IsoDateTime;
  state: 'pending' | 'confirmed' | 'expired';
}`,signature:{properties:[{key:`settlementRef`,value:{name:`string`,required:!0}},{key:`purpose`,value:{name:`union`,raw:`'settled_red' | 'pending_shortfall'`,elements:[{name:`literal`,value:`'settled_red'`},{name:`literal`,value:`'pending_shortfall'`}],required:!0}},{key:`amount`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`qrPayload`,value:{name:`string`,required:!0}},{key:`expiresAt`,value:{name:`string`,required:!0}},{key:`state`,value:{name:`union`,raw:`'pending' | 'confirmed' | 'expired'`,elements:[{name:`literal`,value:`'pending'`},{name:`literal`,value:`'confirmed'`},{name:`literal`,value:`'expired'`}],required:!0}}]}},{name:`null`}]},description:``},linkSession:{required:!1,tsType:{name:`union`,raw:`MandateLinkSession | null`,elements:[{name:`signature`,type:`object`,raw:`{
  linkRef: string;
  desktopQrPayload: string;
  mobileDeepLink: string;
  expiresAt: IsoDateTime;
  state: 'pending' | 'confirmed' | 'expired';
}`,signature:{properties:[{key:`linkRef`,value:{name:`string`,required:!0}},{key:`desktopQrPayload`,value:{name:`string`,required:!0}},{key:`mobileDeepLink`,value:{name:`string`,required:!0}},{key:`expiresAt`,value:{name:`string`,required:!0}},{key:`state`,value:{name:`union`,raw:`'pending' | 'confirmed' | 'expired'`,elements:[{name:`literal`,value:`'pending'`},{name:`literal`,value:`'confirmed'`},{name:`literal`,value:`'expired'`}],required:!0}}]}},{name:`null`}]},description:``},downloadState:{required:!1,tsType:{name:`union`,raw:`'idle' | 'loading' | 'success' | 'error'`,elements:[{name:`literal`,value:`'idle'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'success'`},{name:`literal`,value:`'error'`}]},description:``},onNavigate:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(route: EarningsRoute) => void`,signature:{arguments:[{type:{name:`union`,raw:`'overview' | 'activity' | 'settle' | 'auto-pay'`,elements:[{name:`literal`,value:`'overview'`},{name:`literal`,value:`'activity'`},{name:`literal`,value:`'settle'`},{name:`literal`,value:`'auto-pay'`}]},name:`route`}],return:{name:`void`}}},description:``},onBeginLink:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onCreateKhqr:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onDownload:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(format: 'pdf' | 'xlsx') => void`,signature:{arguments:[{type:{name:`union`,raw:`'pdf' | 'xlsx'`,elements:[{name:`literal`,value:`'pdf'`},{name:`literal`,value:`'xlsx'`}]},name:`format`}],return:{name:`void`}}},description:``},onOpenLicence:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRegenerate:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRegenerateLink:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRefresh:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRenew:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRetry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onUnlink:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));export{l as n,s as t};