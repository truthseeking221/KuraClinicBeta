import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{s as n}from"./logic-Dw_xoo09.js";import{n as r,t as i}from"./order-cart-Cy3WwPC6.js";import{B as a,C as o,L as s,O as c,X as l,bt as u,ft as d,gt as f,pt as p}from"./demo-data-DZ0mjvYd.js";var m=e((()=>{})),h=e((()=>{r(),m(),n()}));function g(e){return e.status===`confirmed`?{status:`paid`,label:e.method===`cash`?`Paid by cash`:`Payment confirmed`,detail:e.receiptId?`Receipt ${e.receiptId}`:void 0,receiptId:e.receiptId??void 0}:e.status===`waiting`?{status:`waiting-khqr`,label:`Waiting for provider confirmation`}:e.status===`deferred`?{status:`deferred`,label:`Payment deferred`}:e.status===`pending-claim`?{status:`deferred`,label:`Insurance claim pending`,detail:`Copay collected separately`}:e.status===`no-charge`?{status:`no-charge`,label:`No charge`}:e.status===`split-cash`?{status:`due`,label:`Split payment in progress`,detail:`Cash portion recorded`}:{status:`not-started`,label:`Not started`}}function _(e){return e.cart.placeFailure===`code-issuance-failed`?[{id:`code-issuance-failed`,label:`Order recorded, but the booking code failed`,recovery:`The order remains in the bookings list as needs attention until a usable code is issued.`,actionLabel:`Retry issuing code`,tone:`warning`}]:e.cart.placeFailure===`idempotency-conflict`?[{id:`idempotency-conflict`,label:`An identical order request already succeeded`,recovery:`Check the bookings list before retrying to avoid a duplicate order.`,tone:`warning`}]:c(e.cart,f).map(e=>({id:`consent-${e.id}`,label:`${e.name} still needs consent`,recovery:`Resolve the consent chain on the Orders step before collecting payment.`,tone:`warning`}))}function v({fxRate:e,onAcceptReprice:t,onRemoveItem:n,onRetryCodeIssuance:r,onRetryPricing:s,patient:c,pricingStatus:u=`ready`,readOnly:f=!1,status:p=`draft`}){let m=o(c.cart),h=l(c.cart,m),v=c.insurance.find(e=>e.eligibility?.kind===`eligible`)?.eligibility,b=v?.kind===`eligible`?v:null,x=c.insurance.find(e=>e.eligibility?.kind===`eligible`)?.provider,S={subtotalMinor:m.subtotalMinor,creditMinor:m.discountMinor===`0`?void 0:m.discountMinor,creditLabel:m.discountMinor===`0`?void 0:`Promo discount`,patientDueMinor:h,patientDueKhrMinor:e?d(h,e):void 0,previousPaidMinor:c.cart.payment.supplementalDue?c.cart.payment.previousPaidAmountMinor:void 0,previousReceiptId:c.cart.payment.supplementalDue?c.cart.payment.previousReceiptId??void 0:void 0,currencyCode:`USD`},C;C=u===`loading`?{state:`loading`,summary:S}:u===`error`?{state:`error`,message:`The order total could not be refreshed. Do not collect payment until the server price is available.`}:c.cart.pricing?.state===`stale`?{state:`stale`,summary:S,repricedLines:c.cart.pricing.repricedLines??[]}:{state:`ready`,summary:S};let w={id:c.cart.pricing?.pricingVersion??`front-desk-${c.id}`,patient:{id:c.id,name:c.name||`Patient name pending`,identifier:c.id,demographicLabel:[c.dob,c.sexAtBirth].filter(Boolean).join(` · `),encounterLabel:`Queue ${c.queueNumber}`},lifecycle:p,items:c.cart.items.map(e=>({id:e.id,kind:e.kind,name:e.name,code:e.id,priceMinor:e.priceMinor,currencyCode:e.currencyCode,quantity:e.qty,meta:[e.fasting?`Fasting preparation`:null,b&&e.priceMinor!==`0`&&(e.kind===`lab`||e.kind===`imaging`||e.kind===`ecg`)?`${x} ${b.coveragePct}% · patient owes ${(Number(a(e.priceMinor,b.coveragePct).patientMinor)/100).toFixed(2)} USD`:null,e.consent?e.consent.state===`needed`?`Consent needed`:e.consent.state===`sent`?`Consent sent · awaiting signature`:e.consent.state===`signed`?`Consent signed`:`Verbal consent · ${e.consent.byLabel}`:null].filter(Boolean).join(` · `)||void 0,state:p===`cancelled`?`cancelled`:c.cart.payment.supplementalDue?`supplemental`:`default`})),pricing:C},T=c.cart.payment.method===`cash`||c.cart.payment.method===`khqr`?c.cart.payment.method:void 0;return(0,y.jsx)(i,{cart:w,onAcceptReprice:t,onBlockerAction:e=>{e===`code-issuance-failed`&&r?.()},onRemoveItem:n,onRetryPricing:s,workflow:{role:`receptionist`,actorName:`Clinic receptionist`,access:f&&p===`draft`?`read-only`:`allowed`,stage:`order-review`,origin:`on-behalf`,method:T,panel:T?`summary`:`unset`,attested:c.cart.payment.status===`confirmed`,prescriber:c.cart.attributedPrescriberId?{name:`Attributed clinician · ${c.cart.attributedPrescriberId}`,status:`verified`}:void 0,payerLabel:c.insurance.length>0?`Insurance review`:`Direct pay`,payment:g(c.cart.payment),permissions:{editClinicalItems:!f,collectPayment:!0,checkIn:!0},blockers:_(c)}})}var y,b=e((()=>{y=t(),h(),u(),s(),p(),v.__docgenInfo={description:`Backward-compatible front-desk summary adapter. The shared OrderCart owns
all cart rendering; this adapter keeps the cart in \`order-review\` while the
Check-In Wizard's Payment step owns tender selection, payment capture, and
check-in confirmation.`,methods:[],displayName:`CartRail`,props:{patient:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  id: string;
  queueNumber: number;
  /** Arrival time as the desk announces it, e.g. "08:24 · 12 min ago". */
  arrivedLabel?: string;
  name: string;
  nameKhmer: string;
  dob: string;
  sexAtBirth: 'Female' | 'Male' | '';
  idNumber: string;
  preferredLanguage: 'Khmer' | 'English';
  address: PatientAddress;
  /** Bakong KHQR account for refunds; optional by design. */
  refundAccount: string | null;
  countryCode: string;
  phoneNumber: string;
  otpVerified: boolean;
  /**
   * Telegram channel: the patient scans a QR on the customer display and
   * shares their number — the desk never types it. PROTOTYPE: no Telegram
   * integration exists upstream.
   */
  telegramVerified: boolean;
  telegramHandle?: string;
  /** Which verified channel the patient prefers for reminders and results. */
  preferredChannel: 'sms' | 'telegram' | null;
  /**
   * Recorded reason when the visit proceeds without a verified channel.
   * Mirrors the backend trusted-desk door: reception provisioning has no OTP
   * requirement — verification is assurance, not a gate. The reason keeps the
   * decision honest instead of silently skipping.
   */
  unverifiedReason: { code: UnverifiedReasonCode; note?: string } | null;
  identity: { source: IdentitySource; lockedFields: string[]; capturedAtLabel?: string };
  /** The one booking this check-in redeems, when the visit is booking-led. */
  boundBookingCode?: string | null;
  insurance: InsurancePolicy[];
  insuranceAcked: boolean;
  collisionAcked: string[];
  teleconsult: TeleconsultState;
  cart: Cart;
  intake: IntakeFields;
  /** Set when the secure intake link went to the patient's phone. */
  intakeSentAtLabel?: string | null;
  /**
   * Recorded decision to proceed without the intake. Never a gate — the
   * reason keeps the skip honest, mirroring the unverified-contact pattern.
   */
  intakeSkipped?: { code: IntakeSkipReasonCode; note?: string } | null;
  intakeAuthors?: Partial<Record<keyof IntakeFields, IntakeAuthor>>;
  visitReason: string[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`queueNumber`,value:{name:`number`,required:!0}},{key:`arrivedLabel`,value:{name:`string`,required:!1},description:`Arrival time as the desk announces it, e.g. "08:24 · 12 min ago".`},{key:`name`,value:{name:`string`,required:!0}},{key:`nameKhmer`,value:{name:`string`,required:!0}},{key:`dob`,value:{name:`string`,required:!0}},{key:`sexAtBirth`,value:{name:`union`,raw:`'Female' | 'Male' | ''`,elements:[{name:`literal`,value:`'Female'`},{name:`literal`,value:`'Male'`},{name:`literal`,value:`''`}],required:!0}},{key:`idNumber`,value:{name:`string`,required:!0}},{key:`preferredLanguage`,value:{name:`union`,raw:`'Khmer' | 'English'`,elements:[{name:`literal`,value:`'Khmer'`},{name:`literal`,value:`'English'`}],required:!0}},{key:`address`,value:{name:`signature`,type:`object`,raw:`{
  province: string;
  district: string;
  commune: string;
  street: string;
}`,signature:{properties:[{key:`province`,value:{name:`string`,required:!0}},{key:`district`,value:{name:`string`,required:!0}},{key:`commune`,value:{name:`string`,required:!0}},{key:`street`,value:{name:`string`,required:!0}}]},required:!0}},{key:`refundAccount`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0},description:`Bakong KHQR account for refunds; optional by design.`},{key:`countryCode`,value:{name:`string`,required:!0}},{key:`phoneNumber`,value:{name:`string`,required:!0}},{key:`otpVerified`,value:{name:`boolean`,required:!0}},{key:`telegramVerified`,value:{name:`boolean`,required:!0},description:`Telegram channel: the patient scans a QR on the customer display and
shares their number — the desk never types it. PROTOTYPE: no Telegram
integration exists upstream.`},{key:`telegramHandle`,value:{name:`string`,required:!1}},{key:`preferredChannel`,value:{name:`union`,raw:`'sms' | 'telegram' | null`,elements:[{name:`literal`,value:`'sms'`},{name:`literal`,value:`'telegram'`},{name:`null`}],required:!0},description:`Which verified channel the patient prefers for reminders and results.`},{key:`unverifiedReason`,value:{name:`union`,raw:`{ code: UnverifiedReasonCode; note?: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ code: UnverifiedReasonCode; note?: string }`,signature:{properties:[{key:`code`,value:{name:`unknown[number]['code']`,raw:`(typeof UNVERIFIED_REASONS)[number]['code']`,required:!0}},{key:`note`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0},description:`Recorded reason when the visit proceeds without a verified channel.
Mirrors the backend trusted-desk door: reception provisioning has no OTP
requirement — verification is assurance, not a gate. The reason keeps the
decision honest instead of silently skipping.`},{key:`identity`,value:{name:`signature`,type:`object`,raw:`{ source: IdentitySource; lockedFields: string[]; capturedAtLabel?: string }`,signature:{properties:[{key:`source`,value:{name:`union`,raw:`'manual' | 'qr' | 'existing' | null`,elements:[{name:`literal`,value:`'manual'`},{name:`literal`,value:`'qr'`},{name:`literal`,value:`'existing'`},{name:`null`}],required:!0}},{key:`lockedFields`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`capturedAtLabel`,value:{name:`string`,required:!1}}]},required:!0}},{key:`boundBookingCode`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`The one booking this check-in redeems, when the visit is booking-led.`},{key:`insurance`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  provider: string;
  policyNumber: string;
  memberName: string;
  memberId?: string;
  coverageScope?: 'outpatient' | 'inpatient' | 'both';
  expiry?: string;
  eligibility?: EligibilityResult;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`policyNumber`,value:{name:`string`,required:!0}},{key:`memberName`,value:{name:`string`,required:!0}},{key:`memberId`,value:{name:`string`,required:!1}},{key:`coverageScope`,value:{name:`union`,raw:`'outpatient' | 'inpatient' | 'both'`,elements:[{name:`literal`,value:`'outpatient'`},{name:`literal`,value:`'inpatient'`},{name:`literal`,value:`'both'`}],required:!1}},{key:`expiry`,value:{name:`string`,required:!1}},{key:`eligibility`,value:{name:`union`,raw:`| {
    kind: 'eligible';
    tier: string;
    coveragePct: number;
    copayMinor: string;
    activeUntil: string;
    group?: string;
    preAuth?: 'required' | 'not-required';
    effectiveFrom?: string;
    verifiedAtLabel?: string;
  }
| { kind: 'ineligible' }
| { kind: 'unreachable' }`,elements:[{name:`signature`,type:`object`,raw:`{
  kind: 'eligible';
  tier: string;
  coveragePct: number;
  copayMinor: string;
  activeUntil: string;
  group?: string;
  preAuth?: 'required' | 'not-required';
  effectiveFrom?: string;
  verifiedAtLabel?: string;
}`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'eligible'`,required:!0}},{key:`tier`,value:{name:`string`,required:!0}},{key:`coveragePct`,value:{name:`number`,required:!0}},{key:`copayMinor`,value:{name:`string`,required:!0}},{key:`activeUntil`,value:{name:`string`,required:!0}},{key:`group`,value:{name:`string`,required:!1}},{key:`preAuth`,value:{name:`union`,raw:`'required' | 'not-required'`,elements:[{name:`literal`,value:`'required'`},{name:`literal`,value:`'not-required'`}],required:!1}},{key:`effectiveFrom`,value:{name:`string`,required:!1}},{key:`verifiedAtLabel`,value:{name:`string`,required:!1}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'ineligible' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'ineligible'`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'unreachable' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'unreachable'`,required:!0}}]}}],required:!1}}]}}],raw:`InsurancePolicy[]`,required:!0}},{key:`insuranceAcked`,value:{name:`boolean`,required:!0}},{key:`collisionAcked`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`teleconsult`,value:{name:`signature`,type:`object`,raw:`{
  status: 'notBooked' | 'booked' | 'waived';
  slot?: string;
  specialty?: string;
  /** Set when the desk knowingly booked before results are expected. */
  earlyOverride?: boolean;
}`,signature:{properties:[{key:`status`,value:{name:`union`,raw:`'notBooked' | 'booked' | 'waived'`,elements:[{name:`literal`,value:`'notBooked'`},{name:`literal`,value:`'booked'`},{name:`literal`,value:`'waived'`}],required:!0}},{key:`slot`,value:{name:`string`,required:!1}},{key:`specialty`,value:{name:`string`,required:!1}},{key:`earlyOverride`,value:{name:`boolean`,required:!1},description:`Set when the desk knowingly booked before results are expected.`}]},required:!0}},{key:`cart`,value:{name:`signature`,type:`object`,raw:`{
  items: CartItem[];
  payment: CartPayment;
  /** Attributed clinician for this order; required before placement. */
  attributedPrescriberId?: string | null;
  pricing?: CartPricing;
  placeFailure?: PlaceOrderFailure | null;
  /** Promotions applied at the desk, in the order they were entered. */
  promos?: Promo[];
}`,signature:{properties:[{key:`items`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  kind: CartItemKind;
  name: string;
  /** Universal exponent-2 minor units from the priced-order contract. */
  priceMinor: string;
  currencyCode: 'USD';
  qty: number;
  fasting?: boolean;
  consent?: LineConsent;
  /**
   * Pregnancy screen recorded when imaging was ordered for a patient whose
   * sex at birth is Female. "possibly"/"declined" only pass with a named
   * clinician override — otherwise the order is cancelled, never defaulted.
   */
  pregnancyScreen?: {
    answer: 'not-pregnant' | 'possibly' | 'declined';
    overrideBy?: string;
  };
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`'visit' | 'lab' | 'imaging' | 'ecg' | 'vitals' | 'telecon'`,elements:[{name:`literal`,value:`'visit'`},{name:`literal`,value:`'lab'`},{name:`literal`,value:`'imaging'`},{name:`literal`,value:`'ecg'`},{name:`literal`,value:`'vitals'`},{name:`literal`,value:`'telecon'`}],required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`priceMinor`,value:{name:`string`,required:!0},description:`Universal exponent-2 minor units from the priced-order contract.`},{key:`currencyCode`,value:{name:`literal`,value:`'USD'`,required:!0}},{key:`qty`,value:{name:`number`,required:!0}},{key:`fasting`,value:{name:`boolean`,required:!1}},{key:`consent`,value:{name:`union`,raw:`| { state: 'needed' }
| { state: 'sent'; atLabel: string }
| { state: 'signed'; atLabel: string }
| {
    state: 'verbal';
    byLabel: string;
    atLabel: string;
    /** Present when a supervisor witnessed a sensitive-test consent. */
    witnessed?: boolean;
    pregnancyAnswer?: 'not-pregnant' | 'possibly' | 'declined';
  }`,elements:[{name:`signature`,type:`object`,raw:`{ state: 'needed' }`,signature:{properties:[{key:`state`,value:{name:`literal`,value:`'needed'`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ state: 'sent'; atLabel: string }`,signature:{properties:[{key:`state`,value:{name:`literal`,value:`'sent'`,required:!0}},{key:`atLabel`,value:{name:`string`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ state: 'signed'; atLabel: string }`,signature:{properties:[{key:`state`,value:{name:`literal`,value:`'signed'`,required:!0}},{key:`atLabel`,value:{name:`string`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{
  state: 'verbal';
  byLabel: string;
  atLabel: string;
  /** Present when a supervisor witnessed a sensitive-test consent. */
  witnessed?: boolean;
  pregnancyAnswer?: 'not-pregnant' | 'possibly' | 'declined';
}`,signature:{properties:[{key:`state`,value:{name:`literal`,value:`'verbal'`,required:!0}},{key:`byLabel`,value:{name:`string`,required:!0}},{key:`atLabel`,value:{name:`string`,required:!0}},{key:`witnessed`,value:{name:`boolean`,required:!1},description:`Present when a supervisor witnessed a sensitive-test consent.`},{key:`pregnancyAnswer`,value:{name:`union`,raw:`'not-pregnant' | 'possibly' | 'declined'`,elements:[{name:`literal`,value:`'not-pregnant'`},{name:`literal`,value:`'possibly'`},{name:`literal`,value:`'declined'`}],required:!1}}]}}],required:!1}},{key:`pregnancyScreen`,value:{name:`signature`,type:`object`,raw:`{
  answer: 'not-pregnant' | 'possibly' | 'declined';
  overrideBy?: string;
}`,signature:{properties:[{key:`answer`,value:{name:`union`,raw:`'not-pregnant' | 'possibly' | 'declined'`,elements:[{name:`literal`,value:`'not-pregnant'`},{name:`literal`,value:`'possibly'`},{name:`literal`,value:`'declined'`}],required:!0}},{key:`overrideBy`,value:{name:`string`,required:!1}}]},required:!1},description:`Pregnancy screen recorded when imaging was ordered for a patient whose
sex at birth is Female. "possibly"/"declined" only pass with a named
clinician override — otherwise the order is cancelled, never defaulted.`}]}}],raw:`CartItem[]`,required:!0}},{key:`payment`,value:{name:`signature`,type:`object`,raw:`{
  status: PaymentStatus;
  method: PaymentMethod;
  tendered: string;
  changeMinor: string;
  receiptId: string | null;
  confirmedAt: string | null;
  amountMinor: string | null;
  cashier?: string;
  /** Paid-edit outcomes. */
  supplementalDue?: boolean;
  previousReceiptId?: string | null;
  previousPaidAmountMinor?: string;
  voidedReceiptId?: string | null;
  /** Split flow: confirmed cash portion in USD. */
  cashPortionMinor?: string;
  /**
   * KHQR intent lifecycle while \`status\` is \`waiting\`/\`split-cash\`. The QR is
   * an expiring intent: it can lapse or be cancelled and regenerated — the
   * desk never treats a stale QR as collectable. PROTOTYPE: no Bakong
   * provider integration exists upstream.
   */
  khqrState?: 'waiting' | 'expired' | 'cancelled';
}`,signature:{properties:[{key:`status`,value:{name:`union`,raw:`| 'idle'
| 'waiting'
| 'confirmed'
| 'deferred'
| 'no-charge'
| 'split-cash'
/** Routed to the insurer; copay collected separately. PROTOTYPE: upstream is cash-only. */
| 'pending-claim'`,elements:[{name:`literal`,value:`'idle'`},{name:`literal`,value:`'waiting'`},{name:`literal`,value:`'confirmed'`},{name:`literal`,value:`'deferred'`},{name:`literal`,value:`'no-charge'`},{name:`literal`,value:`'split-cash'`},{name:`literal`,value:`'pending-claim'`}],required:!0}},{key:`method`,value:{name:`union`,raw:`'cash' | 'khqr' | 'split' | null`,elements:[{name:`literal`,value:`'cash'`},{name:`literal`,value:`'khqr'`},{name:`literal`,value:`'split'`},{name:`null`}],required:!0}},{key:`tendered`,value:{name:`string`,required:!0}},{key:`changeMinor`,value:{name:`string`,required:!0}},{key:`receiptId`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`confirmedAt`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`amountMinor`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`cashier`,value:{name:`string`,required:!1}},{key:`supplementalDue`,value:{name:`boolean`,required:!1},description:`Paid-edit outcomes.`},{key:`previousReceiptId`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`previousPaidAmountMinor`,value:{name:`string`,required:!1}},{key:`voidedReceiptId`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`cashPortionMinor`,value:{name:`string`,required:!1},description:`Split flow: confirmed cash portion in USD.`},{key:`khqrState`,value:{name:`union`,raw:`'waiting' | 'expired' | 'cancelled'`,elements:[{name:`literal`,value:`'waiting'`},{name:`literal`,value:`'expired'`},{name:`literal`,value:`'cancelled'`}],required:!1},description:"KHQR intent lifecycle while `status` is `waiting`/`split-cash`. The QR is\nan expiring intent: it can lapse or be cancelled and regenerated — the\ndesk never treats a stale QR as collectable. PROTOTYPE: no Bakong\nprovider integration exists upstream."}]},required:!0}},{key:`attributedPrescriberId`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`Attributed clinician for this order; required before placement.`},{key:`pricing`,value:{name:`signature`,type:`object`,raw:`{
  catalogVersion: string;
  pricingVersion: string;
  state: 'current' | 'stale';
  /** Present when stale: lines whose server price changed since quoting. */
  repricedLines?: Array<{
    itemId: string;
    name: string;
    oldPriceMinor: string;
    newPriceMinor: string;
  }>;
}`,signature:{properties:[{key:`catalogVersion`,value:{name:`string`,required:!0}},{key:`pricingVersion`,value:{name:`string`,required:!0}},{key:`state`,value:{name:`union`,raw:`'current' | 'stale'`,elements:[{name:`literal`,value:`'current'`},{name:`literal`,value:`'stale'`}],required:!0}},{key:`repricedLines`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  itemId: string;
  name: string;
  oldPriceMinor: string;
  newPriceMinor: string;
}`,signature:{properties:[{key:`itemId`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`oldPriceMinor`,value:{name:`string`,required:!0}},{key:`newPriceMinor`,value:{name:`string`,required:!0}}]}}],raw:`Array<{
  itemId: string;
  name: string;
  oldPriceMinor: string;
  newPriceMinor: string;
}>`,required:!1},description:`Present when stale: lines whose server price changed since quoting.`}]},required:!1}},{key:`placeFailure`,value:{name:`union`,raw:`PlaceOrderFailure | null`,elements:[{name:`union`,raw:`'code-issuance-failed' | 'idempotency-conflict'`,elements:[{name:`literal`,value:`'code-issuance-failed'`},{name:`literal`,value:`'idempotency-conflict'`}]},{name:`null`}],required:!1}},{key:`promos`,value:{name:`Array`,elements:[{name:`union`,raw:`| { code: string; label: string; kind: 'item'; itemId: string; percentOff: number }
| { code: string; label: string; kind: 'fixed'; amountMinor: string }
| { code: string; label: string; kind: 'percent'; percentOff: number }`,elements:[{name:`signature`,type:`object`,raw:`{ code: string; label: string; kind: 'item'; itemId: string; percentOff: number }`,signature:{properties:[{key:`code`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`literal`,value:`'item'`,required:!0}},{key:`itemId`,value:{name:`string`,required:!0}},{key:`percentOff`,value:{name:`number`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ code: string; label: string; kind: 'fixed'; amountMinor: string }`,signature:{properties:[{key:`code`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`literal`,value:`'fixed'`,required:!0}},{key:`amountMinor`,value:{name:`string`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ code: string; label: string; kind: 'percent'; percentOff: number }`,signature:{properties:[{key:`code`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`literal`,value:`'percent'`,required:!0}},{key:`percentOff`,value:{name:`number`,required:!0}}]}}]}],raw:`Promo[]`,required:!1},description:`Promotions applied at the desk, in the order they were entered.`}]},required:!0}},{key:`intake`,value:{name:`signature`,type:`object`,raw:`{
  chiefComplaint: string;
  preTestPrep: string;
  medications: string;
  womensHealth: string;
  recentEvents: string;
  lifestyle: string;
  sampleComfort: string;
  sensitiveConsent: string;
}`,signature:{properties:[{key:`chiefComplaint`,value:{name:`string`,required:!0}},{key:`preTestPrep`,value:{name:`string`,required:!0}},{key:`medications`,value:{name:`string`,required:!0}},{key:`womensHealth`,value:{name:`string`,required:!0}},{key:`recentEvents`,value:{name:`string`,required:!0}},{key:`lifestyle`,value:{name:`string`,required:!0}},{key:`sampleComfort`,value:{name:`string`,required:!0}},{key:`sensitiveConsent`,value:{name:`string`,required:!0}}]},required:!0}},{key:`intakeSentAtLabel`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1},description:`Set when the secure intake link went to the patient's phone.`},{key:`intakeSkipped`,value:{name:`union`,raw:`{ code: IntakeSkipReasonCode; note?: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ code: IntakeSkipReasonCode; note?: string }`,signature:{properties:[{key:`code`,value:{name:`unknown[number]['code']`,raw:`(typeof INTAKE_SKIP_REASONS)[number]['code']`,required:!0}},{key:`note`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!1},description:`Recorded decision to proceed without the intake. Never a gate — the
reason keeps the skip honest, mirroring the unverified-contact pattern.`},{key:`intakeAuthors`,value:{name:`Partial`,elements:[{name:`Record`,elements:[{name:`signature`,type:`object`,raw:`{
  chiefComplaint: string;
  preTestPrep: string;
  medications: string;
  womensHealth: string;
  recentEvents: string;
  lifestyle: string;
  sampleComfort: string;
  sensitiveConsent: string;
}`,signature:{properties:[{key:`chiefComplaint`,value:{name:`string`,required:!0}},{key:`preTestPrep`,value:{name:`string`,required:!0}},{key:`medications`,value:{name:`string`,required:!0}},{key:`womensHealth`,value:{name:`string`,required:!0}},{key:`recentEvents`,value:{name:`string`,required:!0}},{key:`lifestyle`,value:{name:`string`,required:!0}},{key:`sampleComfort`,value:{name:`string`,required:!0}},{key:`sensitiveConsent`,value:{name:`string`,required:!0}}]},required:!0},{name:`union`,raw:`'patient' | 'nurse' | 'system'`,elements:[{name:`literal`,value:`'patient'`},{name:`literal`,value:`'nurse'`},{name:`literal`,value:`'system'`}]}],raw:`Record<keyof IntakeFields, IntakeAuthor>`}],raw:`Partial<Record<keyof IntakeFields, IntakeAuthor>>`,required:!1}},{key:`visitReason`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}}]}},description:``},onRemoveItem:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:``},fxRate:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  base: 'USD';
  quote: 'KHR';
  rateUnits: string;
  rateScale: number;
}`,signature:{properties:[{key:`base`,value:{name:`literal`,value:`'USD'`,required:!0}},{key:`quote`,value:{name:`literal`,value:`'KHR'`,required:!0}},{key:`rateUnits`,value:{name:`string`,required:!0}},{key:`rateScale`,value:{name:`number`,required:!0}}]}},description:``},onRetryPricing:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onAcceptReprice:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Accept the server's re-derived prices when the quote went stale.`},onRetryCodeIssuance:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:"Retry issuing the collection code after `code-issuance-failed`."},pricingStatus:{required:!1,tsType:{name:`union`,raw:`'ready' | 'loading' | 'error'`,elements:[{name:`literal`,value:`'ready'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'error'`}]},description:``,defaultValue:{value:`'ready'`,computed:!1}},readOnly:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},status:{required:!1,tsType:{name:`union`,raw:`'draft' | 'placed' | 'cancelled'`,elements:[{name:`literal`,value:`'draft'`},{name:`literal`,value:`'placed'`},{name:`literal`,value:`'cancelled'`}]},description:``,defaultValue:{value:`'draft'`,computed:!1}}}}}));export{b as n,v as t};