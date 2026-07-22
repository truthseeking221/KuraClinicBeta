import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{t as n}from"./ui-C9kmmzkH.js";import{t as r}from"./button-B6_zsN5-.js";import{a as i}from"./collapsible-Cfc9M9oP.js";import{t as a}from"./card-DMMaaphC.js";import{L as o,ct as s}from"./demo-data-DZ0mjvYd.js";var c,l,u,d,f,p,m,h,g,_,v=e((()=>{c=`_card_qf2le_1`,l=`_headline_qf2le_8`,u=`_queue_qf2le_14`,d=`_title_qf2le_21`,f=`_name_qf2le_28`,p=`_nameKhmer_qf2le_38`,m=`_facts_qf2le_43`,h=`_handoff_qf2le_69`,g=`_actions_qf2le_75`,_={card:c,headline:l,queue:u,title:d,name:f,nameKhmer:p,facts:m,handoff:h,actions:g}}));function y(e){let t=e.cart.payment;return t.status===`confirmed`?`Paid · ${t.receiptId??``}`.trim():t.status===`no-charge`?`No charge`:t.status===`pending-claim`?`Insurance claim pending`:t.status===`deferred`?`Pay later`:t.status===`waiting`||t.status===`split-cash`?`Waiting for Bakong confirmation`:`Payment pending`}function b({onNextPatient:e,onOpenQueue:t,patient:n}){let o=s(n.cart.payment);return(0,x.jsxs)(a,{as:`section`,"aria-label":`Reception complete`,className:_.card,children:[(0,x.jsxs)(`div`,{className:_.headline,role:`status`,children:[(0,x.jsxs)(`span`,{className:_.queue,children:[`Q-`,String(n.queueNumber).padStart(3,`0`)]}),(0,x.jsx)(`h2`,{className:_.title,children:`Checked in`})]}),(0,x.jsxs)(`p`,{className:_.name,children:[n.name||`Walk-in patient`,n.nameKhmer?(0,x.jsx)(`span`,{className:_.nameKhmer,lang:`km`,children:n.nameKhmer}):null]}),(0,x.jsxs)(`dl`,{className:_.facts,children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`dt`,{children:`Payment`}),(0,x.jsx)(`dd`,{children:(0,x.jsx)(i,{size:`sm`,variant:o===`collected`?`success`:o===`deferred`?`warning`:`info`,children:y(n)})})]}),n.boundBookingCode?(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`dt`,{children:`Booking`}),(0,x.jsxs)(`dd`,{children:[n.boundBookingCode,` · redeemed`]})]}):null,n.teleconsult.status===`booked`?(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`dt`,{children:`Teleconsult`}),(0,x.jsx)(`dd`,{children:n.teleconsult.slot})]}):null]}),(0,x.jsx)(`p`,{className:_.handoff,children:`Queued for phlebotomy — the Collection draw worksheet picks this visit up.`}),(0,x.jsxs)(`div`,{className:_.actions,children:[(0,x.jsx)(r,{onClick:e,variant:`primary`,children:`Next patient`}),t?(0,x.jsx)(r,{onClick:t,variant:`outline`,children:`Open desk queue`}):null]})]})}var x,S=e((()=>{x=t(),n(),o(),v(),b.__docgenInfo={description:`Terminal reception outcome: the visit leaves the wizard and continues on
the desk queue. The one primary action opens the next blank slot — the desk
never idles on a finished check-in.`,methods:[],displayName:`CheckInComplete`,props:{patient:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`chiefComplaint`,value:{name:`string`,required:!0}},{key:`preTestPrep`,value:{name:`string`,required:!0}},{key:`medications`,value:{name:`string`,required:!0}},{key:`womensHealth`,value:{name:`string`,required:!0}},{key:`recentEvents`,value:{name:`string`,required:!0}},{key:`lifestyle`,value:{name:`string`,required:!0}},{key:`sampleComfort`,value:{name:`string`,required:!0}},{key:`sensitiveConsent`,value:{name:`string`,required:!0}}]},required:!0},{name:`union`,raw:`'patient' | 'nurse' | 'system'`,elements:[{name:`literal`,value:`'patient'`},{name:`literal`,value:`'nurse'`},{name:`literal`,value:`'system'`}]}],raw:`Record<keyof IntakeFields, IntakeAuthor>`}],raw:`Partial<Record<keyof IntakeFields, IntakeAuthor>>`,required:!1}},{key:`visitReason`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}}]}},description:``},onNextPatient:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Legacy desk law: check-in immediately opens the next blank slot.`},onOpenQueue:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));export{S as n,b as t};