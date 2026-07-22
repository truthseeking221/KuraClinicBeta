import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{Bt as i,Ct as a,Et as o,Gt as s,Ot as c,S as l,T as u,Ut as d,Wt as f,_ as p,g as m,it as h,jt as g,kt as _,o as v,q as y,rt as b,x,zt as S}from"./provider-marks-BeHzyBjc.js";import{t as C}from"./icons-C5MW4nvJ.js";import{A as w,Ar as T,Cr as E,Dr as D,Er as O,M as k,N as ee,O as A,Or as te,P as ne,Rt as re,Sr as ie,T as ae,Tr as oe,Yn as se,fr as ce,k as le,t as ue,wr as j}from"./ui-C9kmmzkH.js";import{a as de,r as fe}from"./skeleton-yGvKPj3C.js";import{a as pe,l as me,o as he}from"./date-range-picker-CVkMECHY.js";import{a as ge,c as _e,i as ve,l as ye,o as be,r as xe,s as Se,u as Ce}from"./settings-modal-DFqsiPWF.js";import{i as M,n as N,r as P,t as F}from"./alert-l7nmjmGJ.js";import{t as I}from"./button-B6_zsN5-.js";import{a as L,n as we,r as Te,t as Ee}from"./collapsible-Cfc9M9oP.js";import{t as De}from"./segmented-toggle-DDpNscFF.js";import{t as R}from"./input-UaJWx_9h.js";import{l as Oe,o as ke,r as Ae,t as z}from"./card-DMMaaphC.js";import{t as B}from"./select-WVTSimR_.js";import{t as V}from"./money-text-DwvxiUCm.js";import{r as je,t as Me}from"./identity-_Ew7UCel.js";import{t as Ne}from"./subject-header-D_ExgzJI.js";import{t as Pe}from"./subject-header-Bxogv-4H.js";import{t as Fe}from"./lab-test-picker-CTjhXfbI.js";import{$ as Ie,C as Le,D as Re,E as ze,F as Be,G as Ve,H as He,I as Ue,J as We,K as Ge,L as Ke,M as qe,N as Je,O as Ye,P as Xe,Q as Ze,R as Qe,S as $e,U as et,V as tt,X as nt,Y as rt,_ as it,_t as at,at as ot,b as st,bt as ct,c as lt,dt as ut,et as dt,f as ft,ft as pt,g as mt,gt as H,h as ht,ht as gt,i as _t,it as vt,j as yt,k as bt,mt as xt,n as St,nt as Ct,o as wt,ot as Tt,pt as Et,r as Dt,rt as Ot,st as kt,t as At,tt as jt,ut as Mt,v as Nt,vt as Pt,w as Ft,xt as It,y as Lt,yt as Rt,z as zt}from"./demo-data-DZ0mjvYd.js";import{t as Bt}from"./lab-catalog-CBLfEJMT.js";import{n as Vt,t as Ht}from"./cart-rail-CCEg0ERV.js";import{n as Ut,t as Wt}from"./payment-receipt-B48MeRp8.js";var Gt,Kt,qt=t((()=>{Gt=[{code:`patient-declined`,label:`Patient declined`},{code:`no-phone`,label:`No usable phone`},{code:`language-barrier`,label:`Language barrier`},{code:`urgent-visit`,label:`Urgent visit — no time`},{code:`other`,label:`Other`}],Kt=[{code:`no-sms-access`,label:`No SMS access`},{code:`patient-declined`,label:`Patient declined`},{code:`guardian-phone`,label:`Guardian phone only`},{code:`sms-down`,label:`SMS service down`},{code:`other`,label:`Other`}]})),Jt,Yt,Xt,Zt,Qt,$t,en,tn,nn,rn,an,on,sn,cn,ln,un,dn,fn,pn,U,mn=t((()=>{Jt=`_channel_7snrr_3`,Yt=`_channelHeader_7snrr_8`,Xt=`_requiredTag_7snrr_14`,Zt=`_assuranceNote_7snrr_20`,Qt=`_languageField_7snrr_26`,$t=`_subTitle_7snrr_30`,en=`_hint_7snrr_37`,tn=`_escapeRow_7snrr_48`,nn=`_phoneRow_7snrr_65`,rn=`_verifiedRow_7snrr_77`,an=`_verifiedMeta_7snrr_84`,on=`_telegramCard_7snrr_94`,sn=`_telegramText_7snrr_103`,cn=`_telegramTitle_7snrr_109`,ln=`_telegramActions_7snrr_116`,un=`_waiting_7snrr_122`,dn=`_waitingSpinner_7snrr_130`,fn=`_unverifiedForm_7snrr_146`,pn=`_unverifiedActions_7snrr_155`,U={channel:Jt,channelHeader:Yt,requiredTag:Xt,assuranceNote:Zt,languageField:Qt,subTitle:$t,hint:en,escapeRow:tn,phoneRow:nn,verifiedRow:rn,verifiedMeta:an,telegramCard:on,telegramText:sn,telegramTitle:cn,telegramActions:ln,waiting:un,waitingSpinner:dn,"contact-spin":`_contact-spin_7snrr_1`,unverifiedForm:fn,unverifiedActions:pn}}));function hn({onUpdate:e,patient:t}){let[n,r]=(0,G.useState)(`sms`),[i,a]=(0,G.useState)(!1),[o,s]=(0,G.useState)(``),[c,l]=(0,G.useState)(null),[u,d]=(0,G.useState)(0),[f,p]=(0,G.useState)(!1),[m,h]=(0,G.useState)(``),[g,_]=(0,G.useState)(``),v=t.phoneNumber.replace(/\D/g,``).length>=8,y=t.otpVerified||t.telegramVerified;(0,G.useEffect)(()=>{if(u<=0)return;let e=setTimeout(()=>d(e=>e-1),1e3);return()=>clearTimeout(e)},[u]);function x(){a(!0),d(_n)}if(t.unverifiedReason&&!y){let n=Kt.find(e=>e.code===t.unverifiedReason?.code)?.label??t.unverifiedReason.code;return(0,W.jsxs)(z,{as:`section`,className:U.channel,variant:`outline`,children:[(0,W.jsx)(`h3`,{className:U.subTitle,children:`Contact channel`}),(0,W.jsxs)(F,{tone:`warning`,children:[(0,W.jsxs)(M,{children:[`Unverified · `,n]}),(0,W.jsxs)(P,{children:[t.unverifiedReason.note?`${t.unverifiedReason.note} — reminders`:`Reminders`,` `,`and results need a verified channel; the patient may miss them.`]}),(0,W.jsx)(N,{children:(0,W.jsx)(I,{onClick:()=>e({unverifiedReason:null}),size:`sm`,variant:`outline`,children:`Verify instead`})})]})]})}return(0,W.jsxs)(z,{as:`section`,className:U.channel,variant:`outline`,children:[(0,W.jsxs)(`div`,{className:U.channelHeader,children:[(0,W.jsx)(`h3`,{className:U.subTitle,children:`Contact channel`}),(0,W.jsx)(`span`,{className:U.requiredTag,children:`Required`})]}),t.telegramVerified?(0,W.jsxs)(`div`,{className:U.verifiedRow,children:[(0,W.jsx)(L,{variant:`success`,children:`Telegram verified`}),(0,W.jsxs)(`span`,{className:U.verifiedMeta,children:[t.telegramHandle,` · `,t.countryCode,` `,t.phoneNumber]}),(0,W.jsx)(I,{onClick:()=>e({telegramVerified:!1,telegramHandle:void 0,preferredChannel:t.otpVerified?`sms`:null}),size:`sm`,variant:`ghost`,children:`Change`})]}):null,t.otpVerified?(0,W.jsxs)(`div`,{className:U.verifiedRow,children:[(0,W.jsx)(L,{variant:`success`,children:`SMS verified`}),(0,W.jsxs)(`span`,{className:U.verifiedMeta,children:[t.countryCode,` `,t.phoneNumber]}),(0,W.jsx)(I,{onClick:()=>e({otpVerified:!1,preferredChannel:t.telegramVerified?`telegram`:null}),size:`sm`,variant:`ghost`,children:`Edit to re-verify`})]}):null,y?(0,W.jsx)(`p`,{className:U.assuranceNote,children:`Confirms the patient controls this channel — it does not prove who they are.`}):null,t.otpVerified&&t.telegramVerified?(0,W.jsx)(De,{label:`Preferred channel`,labelVisible:!0,onValueChange:t=>e({preferredChannel:t}),options:[{value:`telegram`,label:`Telegram`},{value:`sms`,label:`SMS`}],value:t.preferredChannel??`telegram`}):null,!y&&n===`telegram`?(0,W.jsxs)(`div`,{className:U.telegramCard,children:[(0,W.jsxs)(`div`,{className:U.telegramText,children:[(0,W.jsx)(`p`,{className:U.telegramTitle,children:`Telegram QR pushed to the patient display`}),(0,W.jsx)(`p`,{className:U.hint,children:`Ask the patient to scan it with their phone camera — their number fills in when they share it.`})]}),(0,W.jsxs)(`span`,{"aria-hidden":!0,className:U.waiting,children:[(0,W.jsx)(b,{className:U.waitingSpinner,size:16}),`Waiting for the patient…`]}),(0,W.jsxs)(`div`,{className:U.telegramActions,children:[(0,W.jsx)(I,{onClick:()=>{e({telegramVerified:!0,telegramHandle:`t.me/${(t.name||`patient`).split(/\s+/)[0].toLowerCase()}`,phoneNumber:t.phoneNumber||`93 555 0142`,preferredChannel:`telegram`,unverifiedReason:null}),r(`sms`)},size:`sm`,variant:`outline`,children:`Simulate patient share`}),(0,W.jsx)(I,{onClick:()=>r(`sms`),size:`sm`,variant:`ghost`,children:`Use SMS instead`})]})]}):null,!y&&n===`sms`?(0,W.jsxs)(W.Fragment,{children:[(0,W.jsxs)(`div`,{className:U.phoneRow,children:[(0,W.jsx)(R,{label:`Phone`,inputMode:`tel`,onChange:t=>e({phoneNumber:t.target.value}),placeholder:`12 345 678`,prefix:t.countryCode,required:!0,value:t.phoneNumber}),(0,W.jsx)(I,{disabled:!v||u>0,onClick:x,variant:`secondary`,children:u>0?`Resend in ${u}s`:i?`Resend code`:`Send SMS code`})]}),i?(0,W.jsxs)(`div`,{className:U.phoneRow,children:[(0,W.jsx)(R,{error:c,inputMode:`numeric`,label:`SMS code`,maxLength:6,onChange:e=>{s(e.target.value),l(null)},value:o}),(0,W.jsx)(I,{disabled:o.length!==6,onClick:()=>{o===`123456`?(e({otpVerified:!0,preferredChannel:t.preferredChannel??`sms`,unverifiedReason:null}),r(`sms`)):l(`Code does not match.`)},variant:`primary`,children:`Verify`})]}):null,f?null:(0,W.jsxs)(`div`,{className:U.escapeRow,children:[(0,W.jsx)(I,{onClick:()=>r(`telegram`),size:`sm`,variant:`ghost`,children:`Use Telegram instead`}),(0,W.jsx)(I,{onClick:()=>p(!0),size:`sm`,variant:`ghost`,children:`Continue without verifying`})]})]}):null,y?null:f?(0,W.jsxs)(`div`,{className:U.unverifiedForm,children:[(0,W.jsx)(B,{label:`Why does it stay unverified?`,onChange:e=>h(e.target.value),options:[{value:``,label:`Choose a reason`},...Kt.map(e=>({value:e.code,label:e.label}))],value:m}),m===`other`?(0,W.jsx)(R,{label:`Reason`,onChange:e=>_(e.target.value),placeholder:`What happened`,value:g}):null,(0,W.jsxs)(`div`,{className:U.unverifiedActions,children:[(0,W.jsx)(I,{disabled:m===``||m===`other`&&g.trim()===``,onClick:()=>{e({unverifiedReason:{code:m,note:m===`other`?g.trim():void 0}}),p(!1)},size:`sm`,variant:`secondary`,children:`Save unverified`}),(0,W.jsx)(I,{onClick:()=>p(!1),size:`sm`,variant:`ghost`,children:`Back`})]})]}):null,(0,W.jsx)(gn,{onUpdate:e,patient:t})]})}function gn({onUpdate:e,patient:t}){return(0,W.jsx)(B,{className:U.languageField,label:`Language for messages`,onChange:t=>e({preferredLanguage:t.target.value}),options:[{value:`Khmer`,label:`Khmer`},{value:`English`,label:`English`}],value:t.preferredLanguage})}var W,G,_n,vn=t((()=>{W=r(),G=e(n()),ue(),mt(),qt(),mn(),_n=30,hn.__docgenInfo={description:`Step-2 contact channels. Channel-first: the desk asks how the patient wants
to be reached, then runs that channel's ceremony. Telegram hands the QR to
the customer display and the patient shares their own number — the desk
never types it. The unverified escape records a mandatory reason, mirroring
the backend trusted-desk door where verification is assurance, not a gate.

PROTOTYPE: no Telegram or SMS integration exists upstream — ceremonies are
driven by explicit demo controls, never hidden timers.`,methods:[],displayName:`ContactChannels`,props:{patient:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`chiefComplaint`,value:{name:`string`,required:!0}},{key:`preTestPrep`,value:{name:`string`,required:!0}},{key:`medications`,value:{name:`string`,required:!0}},{key:`womensHealth`,value:{name:`string`,required:!0}},{key:`recentEvents`,value:{name:`string`,required:!0}},{key:`lifestyle`,value:{name:`string`,required:!0}},{key:`sampleComfort`,value:{name:`string`,required:!0}},{key:`sensitiveConsent`,value:{name:`string`,required:!0}}]},required:!0},{name:`union`,raw:`'patient' | 'nurse' | 'system'`,elements:[{name:`literal`,value:`'patient'`},{name:`literal`,value:`'nurse'`},{name:`literal`,value:`'system'`}]}],raw:`Record<keyof IntakeFields, IntakeAuthor>`}],raw:`Partial<Record<keyof IntakeFields, IntakeAuthor>>`,required:!1}},{key:`visitReason`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}}]}},description:``},onUpdate:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(patch: Partial<FrontDeskPatient>) => void`,signature:{arguments:[{type:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`chiefComplaint`,value:{name:`string`,required:!0}},{key:`preTestPrep`,value:{name:`string`,required:!0}},{key:`medications`,value:{name:`string`,required:!0}},{key:`womensHealth`,value:{name:`string`,required:!0}},{key:`recentEvents`,value:{name:`string`,required:!0}},{key:`lifestyle`,value:{name:`string`,required:!0}},{key:`sampleComfort`,value:{name:`string`,required:!0}},{key:`sensitiveConsent`,value:{name:`string`,required:!0}}]},required:!0},{name:`union`,raw:`'patient' | 'nurse' | 'system'`,elements:[{name:`literal`,value:`'patient'`},{name:`literal`,value:`'nurse'`},{name:`literal`,value:`'system'`}]}],raw:`Record<keyof IntakeFields, IntakeAuthor>`}],raw:`Partial<Record<keyof IntakeFields, IntakeAuthor>>`,required:!1}},{key:`visitReason`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}}]}}],raw:`Partial<FrontDeskPatient>`},name:`patch`}],return:{name:`void`}}},description:``}}}})),yn,bn,xn,Sn,Cn,K,wn=t((()=>{yn=`_search_1wm9h_1`,bn=`_inputRow_1wm9h_9`,xn=`_input_1wm9h_9`,Sn=`_demoHint_1wm9h_20`,Cn=`_demoCode_1wm9h_26`,K={search:yn,inputRow:bn,input:xn,demoHint:Sn,demoCode:Cn}}));function Tn({autoFocus:e,demoQrPayload:t,onChange:n,value:r}){let[i,a]=(0,Dn.useState)(!1),o=yt(r);return(0,q.jsxs)(`div`,{className:K.search,children:[(0,q.jsxs)(`div`,{className:K.inputRow,children:[(0,q.jsx)(R,{"aria-label":`Find patient by phone, booking code, or name`,autoFocus:e,className:K.input,onChange:e=>n(e.target.value),placeholder:`Phone, booking code, or name`,prefix:(0,q.jsx)(_,{size:16}),size:`lg`,suffix:o?(0,q.jsx)(L,{size:`sm`,variant:`neutral`,children:On[o]}):void 0,value:r}),(0,q.jsxs)(I,{onClick:()=>a(!0),size:`lg`,variant:`outline`,children:[(0,q.jsx)(c,{size:16,"aria-hidden":!0}),`Scan booking QR`]})]}),(0,q.jsx)(En,{demoQrPayload:t,onBookingCode:e=>{n(e),a(!1)},onOpenChange:a,open:i})]})}function En({demoQrPayload:e,onBookingCode:t,onOpenChange:n,open:r}){let[i,o]=(0,Dn.useState)(``),[s,c]=(0,Dn.useState)(null);function l(e){if(e.key!==`Enter`)return;e.preventDefault();let n=We(i);if(!n){c(`No booking code found in this QR.`);return}o(``),c(null),t(n)}return(0,q.jsx)(xe,{open:r,onOpenChange:e=>{e||(o(``),c(null)),n(e)},children:(0,q.jsxs)(be,{size:`sm`,children:[(0,q.jsxs)(ye,{children:[(0,q.jsx)(Ce,{children:`Scan booking QR`}),(0,q.jsx)(Se,{children:`Capture the booking QR before matching the patient. The scanner sends Enter automatically.`})]}),(0,q.jsxs)(ve,{children:[(0,q.jsx)(R,{"aria-label":`Booking QR payload`,autoFocus:!0,error:s??void 0,onChange:e=>{o(e.target.value),c(null)},onKeyDown:l,placeholder:`Scan booking QR code`,prefix:(0,q.jsx)(a,{size:16}),value:i}),e?(0,q.jsxs)(`p`,{className:K.demoHint,children:[`Demo payload: `,(0,q.jsx)(`code`,{className:K.demoCode,children:e})]}):null]}),(0,q.jsx)(_e,{children:(0,q.jsx)(ge,{asChild:!0,children:(0,q.jsx)(I,{variant:`outline`,children:`Cancel`})})})]})})}var q,Dn,On,kn=t((()=>{q=r(),Dn=e(n()),ue(),C(),Ke(),wn(),On={phone:`Phone`,code:`Code`,name:`Name`},Tn.__docgenInfo={description:`Step-1 identity capture header: one search field that understands phone,
booking code, or name (the three reception doors), plus a booking-QR scan
shortcut. The field is the screen's single visual anchor — no card chrome
around it.`,methods:[],displayName:`IdentitySearch`,props:{value:{required:!0,tsType:{name:`string`},description:``},onChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(next: string) => void`,signature:{arguments:[{type:{name:`string`},name:`next`}],return:{name:`void`}}},description:``},demoQrPayload:{required:!1,tsType:{name:`string`},description:`Demo QR payload surfaced inside the scan dialog.`},autoFocus:{required:!1,tsType:{name:`boolean`},description:``}}}})),An,jn,Mn,Nn,Pn,Fn,In,Ln,Rn,zn,Bn,Vn,Hn,Un,Wn,Gn,Kn,qn,Jn,Yn,Xn,Zn,Qn,$n,er,tr,nr,rr,ir,ar,or,sr,cr,lr,ur,dr,J,fr=t((()=>{An=`_card_1xb2o_1`,jn=`_selectable_1xb2o_10`,Mn=`_layout_1xb2o_29`,Nn=`_iconBadge_1xb2o_35`,Pn=`_body_1xb2o_70`,Fn=`_headerRow_1xb2o_75`,In=`_identity_1xb2o_82`,Ln=`_eyebrow_1xb2o_86`,Rn=`_nameLine_1xb2o_95`,zn=`_demographic_1xb2o_102`,Bn=`_srOnly_1xb2o_107`,Vn=`_heading_1xb2o_119`,Hn=`_nameKhmer_1xb2o_128`,Un=`_headerright_1xb2o_134`,Wn=`_selectionMark_1xb2o_141`,Gn=`_match_1xb2o_160`,Kn=`_mono_1xb2o_168`,qn=`_metaRow_1xb2o_173`,Jn=`_provenance_1xb2o_186`,Yn=`_metaItem_1xb2o_192`,Xn=`_metaMuted_1xb2o_199`,Zn=`_lastVisit_1xb2o_203`,Qn=`_trustLine_1xb2o_213`,$n=`_trustSignal_1xb2o_222`,er=`_trustDivider_1xb2o_234`,tr=`_evidence_1xb2o_238`,nr=`_bookings_1xb2o_244`,rr=`_bookingsHeader_1xb2o_251`,ir=`_bookingRow_1xb2o_259`,ar=`_bookingCreator_1xb2o_294`,or=`_bookingIcon_1xb2o_299`,sr=`_bookingCode_1xb2o_304`,cr=`_bookingMeta_1xb2o_309`,lr=`_helper_1xb2o_318`,ur=`_searchedValue_1xb2o_325`,dr=`_actions_1xb2o_329`,J={card:An,selectable:jn,layout:Mn,iconBadge:Nn,body:Pn,headerRow:Fn,identity:In,eyebrow:Ln,nameLine:Rn,demographic:zn,srOnly:Bn,heading:Vn,nameKhmer:Hn,headerright:Un,selectionMark:Wn,match:Gn,mono:Kn,metaRow:qn,provenance:Jn,metaItem:Yn,metaMuted:Xn,lastVisit:Zn,trustLine:Qn,trustSignal:$n,trustDivider:er,evidence:tr,bookings:nr,bookingsHeader:rr,bookingRow:ir,bookingCreator:ar,bookingIcon:or,bookingCode:sr,bookingMeta:cr,helper:lr,searchedValue:ur,actions:dr}}));function pr(...e){return e.filter(Boolean).join(` `)}function mr(e){let t=e.trim().split(/\s+/).filter(Boolean);return t.length===0?`?`:t.length===1?t[0].slice(0,2).toUpperCase():`${t[0][0]}${t[t.length-1][0]}`.toUpperCase()}function hr(e){if(!e)return``;let t=new Date(`${e}T00:00:00`);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`}).format(t)}function gr({on:e,children:t}){return e?(0,X.jsx)(`mark`,{className:J.match,children:t}):(0,X.jsx)(X.Fragment,{children:t})}function _r({record:e,matched:t}){let n=Me(e.dob),r=[];return e.phone&&r.push((0,X.jsxs)(`span`,{className:J.metaItem,children:[(0,X.jsx)(p,{size:14,"aria-hidden":!0}),(0,X.jsx)(gr,{on:t?.phone,children:(0,X.jsx)(`span`,{className:J.mono,children:e.phone})})]},`phone`)),e.dob&&r.push((0,X.jsxs)(`span`,{className:J.metaItem,children:[(0,X.jsx)(m,{size:14,"aria-hidden":!0}),(0,X.jsx)(gr,{on:t?.dob,children:(0,X.jsxs)(`span`,{className:J.mono,children:[hr(e.dob),n===null?null:(0,X.jsxs)(`span`,{className:J.metaMuted,children:[` (`,n,`y)`]})]})})]},`dob`)),e.nid&&r.push((0,X.jsxs)(`span`,{className:J.metaItem,children:[(0,X.jsx)(d,{size:14,"aria-hidden":!0}),(0,X.jsx)(gr,{on:t?.nid,children:(0,X.jsx)(`span`,{className:J.mono,children:e.nid})})]},`nid`)),r.length===0?null:(0,X.jsx)(`div`,{className:J.metaRow,children:r})}function vr({bookingActionable:e,bookings:t,header:n,onBookingSelect:r}){if(t.length===0)return null;let i=n===void 0?`${t.length} booking${t.length===1?``:`s`}`:n;return(0,X.jsxs)(`div`,{className:J.bookings,children:[i?(0,X.jsx)(`div`,{className:J.bookingsHeader,children:i}):null,t.map(t=>{let n=[t.whenLabel,t.itemsLabel,t.locationLabel].filter(Boolean).join(` · `),i=(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(l,{size:16,className:J.bookingIcon,"aria-hidden":!0}),(0,X.jsx)(`span`,{className:pr(J.mono,J.bookingCode),children:t.code}),n?(0,X.jsxs)(`span`,{className:J.bookingMeta,children:[`· `,n]}):null,t.creatorLabel?(0,X.jsx)(`span`,{className:J.bookingCreator,children:t.creatorLabel}):null,(0,X.jsx)(L,{size:`sm`,variant:t.status.tone===`neutral`?`neutral`:t.status.tone,children:t.status.label})]});return r&&(e?.(t)??!0)?(0,X.jsx)(`button`,{type:`button`,className:J.bookingRow,"aria-label":`Check in against booking ${t.code}`,onClick:e=>{e.stopPropagation(),r(t)},children:i},t.code):(0,X.jsx)(`div`,{className:J.bookingRow,children:i},t.code)}),r&&t.length>1?(0,X.jsx)(`p`,{className:J.helper,children:`Choose the booking this visit is for.`}):null]})}function yr({signals:e}){return!e||e.length===0?null:(0,X.jsx)(`p`,{className:J.trustLine,children:e.map((e,t)=>(0,X.jsxs)(`span`,{className:J.trustSignal,"data-tone":e.tone,children:[t>0?(0,X.jsx)(`span`,{className:J.trustDivider,"aria-hidden":!0,children:`·`}):null,e.label]},e.label))})}function br({actions:e}){return!e||e.length===0?null:(0,X.jsx)(`div`,{className:J.actions,children:e.map(e=>(0,X.jsxs)(I,{size:`sm`,variant:e.variant===`primary`?`primary`:e.variant===`ghost`?`ghost`:`outline`,disabled:e.disabled,onClick:t=>{t.stopPropagation(),e.onClick?.()},children:[e.icon,e.label]},e.label))})}function Y({actions:e,bookingActionable:t,bookings:n,bookingsHeader:r,className:i,helperText:a,lastVisitLabel:o,matched:s,matchedOnLabel:c,onBookingSelect:l,onSelect:u,provenance:d,record:f,searchedKind:p,searchedValue:m,selectable:h=!1,selected:g=!1,status:_,trustSignals:v,variant:b}){let C=(0,xr.useId)(),w=h||typeof u==`function`;function T(e){u&&(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),u())}if(b===`no-match`)return(0,X.jsx)(z,{className:pr(J.card,i),"data-resolution":b,variant:`outline`,"aria-labelledby":C,children:(0,X.jsxs)(`div`,{className:J.layout,children:[(0,X.jsx)(`span`,{className:J.iconBadge,"data-tone":`primary`,children:(0,X.jsx)(S,{size:20,"aria-hidden":!0})}),(0,X.jsxs)(`div`,{className:J.body,children:[(0,X.jsx)(`p`,{className:J.eyebrow,children:`No existing record`}),(0,X.jsx)(`h3`,{id:C,className:J.heading,children:m?(0,X.jsx)(`span`,{className:pr(J.mono,J.searchedValue),children:m}):`Add new patient`}),(0,X.jsx)(`p`,{className:J.helper,children:a??`Continue to create a new patient. ${p??`This search value`} carries over to the next step.`}),(0,X.jsx)(br,{actions:e})]})]})});let E=Sr[b],D=f??{id:`unknown`,name:`Patient`,sexAtBirth:``,assurance:`unverified`,registeredHere:!0};return(0,X.jsx)(z,{className:pr(J.card,w&&J.selectable,i),"data-resolution":b,variant:`outline`,"data-selected":g||void 0,role:w?`radio`:void 0,"aria-checked":w?g:void 0,"aria-labelledby":C,tabIndex:w?0:void 0,onClick:u,onKeyDown:T,children:(0,X.jsxs)(`div`,{className:J.layout,children:[w?(0,X.jsx)(fe,{size:`lg`,children:(0,X.jsx)(de,{children:mr(D.name)})}):(0,X.jsx)(`span`,{className:J.iconBadge,"data-tone":E.tone,children:E.icon}),(0,X.jsxs)(`div`,{className:J.body,children:[(0,X.jsxs)(`div`,{className:J.headerRow,children:[(0,X.jsxs)(`div`,{className:J.identity,children:[!w&&E.eyebrow?(0,X.jsx)(`p`,{className:J.eyebrow,children:E.eyebrow}):null,(0,X.jsxs)(`div`,{className:J.nameLine,children:[(0,X.jsx)(`h3`,{id:C,className:J.heading,children:(0,X.jsx)(gr,{on:s?.name,children:D.name})}),D.sexAtBirth?b===`captured`?(0,X.jsxs)(`span`,{className:J.demographic,children:[(0,X.jsx)(`span`,{className:J.srOnly,children:`Sex at birth: `}),D.sexAtBirth]}):(0,X.jsx)(L,{size:`sm`,variant:`neutral`,children:D.sexAtBirth}):null,D.minor?(0,X.jsx)(L,{size:`sm`,variant:`warning`,children:`Minor`}):null]}),D.nameKhmer?(0,X.jsx)(`p`,{lang:`km`,className:J.nameKhmer,children:(0,X.jsx)(gr,{on:s?.nameKhmer,children:D.nameKhmer})}):null]}),_||w?(0,X.jsxs)(`div`,{className:J.headerright,children:[_?(0,X.jsx)(L,{size:`sm`,variant:_.variant,children:_.label}):null,w?(0,X.jsx)(`span`,{className:J.selectionMark,"data-selected":g||void 0,"aria-hidden":!0,children:g?(0,X.jsx)(x,{size:12}):null}):null]}):null]}),(0,X.jsx)(_r,{record:D,matched:s}),d?(0,X.jsx)(`p`,{className:J.provenance,children:d}):null,(0,X.jsx)(yr,{signals:v}),c?(0,X.jsx)(`p`,{className:J.evidence,children:c}):null,o?(0,X.jsxs)(`p`,{className:J.lastVisit,children:[(0,X.jsx)(y,{size:14,"aria-hidden":!0}),o]}):null,(0,X.jsx)(vr,{bookingActionable:t,bookings:n??D.bookings??[],header:r,onBookingSelect:l}),a?(0,X.jsx)(`p`,{className:J.helper,children:a}):null,(0,X.jsx)(br,{actions:e})]})]})})}var X,xr,Sr,Cr=t((()=>{X=r(),xr=e(n()),ue(),C(),je(),fr(),Sr={"known-here":{eyebrow:`Known patient`,icon:(0,X.jsx)(i,{size:20}),tone:`success`},"known-elsewhere":{eyebrow:`Known in Kura · other PSC`,icon:(0,X.jsx)(d,{size:20}),tone:`warning`},"shared-phone":{icon:(0,X.jsx)(f,{size:20}),tone:`warning`},"booking-linked":{eyebrow:`Booking matched`,icon:(0,X.jsx)(l,{size:20}),tone:`info`},"booking-blocked":{eyebrow:`Booking cannot be used`,icon:(0,X.jsx)(l,{size:20}),tone:`warning`},candidate:{icon:(0,X.jsx)(s,{size:20}),tone:`primary`},captured:{icon:(0,X.jsx)(d,{size:20}),tone:`neutral`}},Y.__docgenInfo={description:`Reception Step-1 identity resolution card. One shell for the known-patient,
shared-phone, booking-linked, candidate, no-match, and captured readings —
one patient hierarchy, one status/action treatment. Selectable cards behave
as radios inside a "who is here today?" radiogroup.

Adapted from Kura ui-kit \`PatientIdentityResolutionCard\` (source-kura-ui-kit);
rebound to house tokens, Card/Badge/Avatar/Button primitives, and Hugeicons.`,methods:[],displayName:`PatientResolutionCard`,props:{variant:{required:!0,tsType:{name:`union`,raw:`| 'known-here'
| 'known-elsewhere'
| 'shared-phone'
| 'booking-linked'
| 'booking-blocked'
| 'candidate'
| 'no-match'
| 'captured'`,elements:[{name:`literal`,value:`'known-here'`},{name:`literal`,value:`'known-elsewhere'`},{name:`literal`,value:`'shared-phone'`},{name:`literal`,value:`'booking-linked'`},{name:`literal`,value:`'booking-blocked'`},{name:`literal`,value:`'candidate'`},{name:`literal`,value:`'no-match'`},{name:`literal`,value:`'captured'`}]},description:``},record:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  nameKhmer?: string;
  dob?: string;
  sexAtBirth: 'Female' | 'Male' | '';
  nid?: string;
  phone?: string;
  /** patient-ms assurance axis. */
  assurance: 'unverified' | 'verified';
  /** Minors require a present guardian before check-in continues. */
  minor?: boolean;
  guardianName?: string;
  /** Registered at this PSC or known only elsewhere in Kura. */
  registeredHere: boolean;
  lastVisitLabel?: string;
  bookings?: BookingSummary[];
  /**
   * Months since the phone channel was last verified. PROTOTYPE FIELD —
   * patient-ms stores only the assurance flag, not verification recency.
   */
  phoneVerifiedMonthsAgo?: number;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`nameKhmer`,value:{name:`string`,required:!1}},{key:`dob`,value:{name:`string`,required:!1}},{key:`sexAtBirth`,value:{name:`union`,raw:`'Female' | 'Male' | ''`,elements:[{name:`literal`,value:`'Female'`},{name:`literal`,value:`'Male'`},{name:`literal`,value:`''`}],required:!0}},{key:`nid`,value:{name:`string`,required:!1}},{key:`phone`,value:{name:`string`,required:!1}},{key:`assurance`,value:{name:`union`,raw:`'unverified' | 'verified'`,elements:[{name:`literal`,value:`'unverified'`},{name:`literal`,value:`'verified'`}],required:!0},description:`patient-ms assurance axis.`},{key:`minor`,value:{name:`boolean`,required:!1},description:`Minors require a present guardian before check-in continues.`},{key:`guardianName`,value:{name:`string`,required:!1}},{key:`registeredHere`,value:{name:`boolean`,required:!0},description:`Registered at this PSC or known only elsewhere in Kura.`},{key:`lastVisitLabel`,value:{name:`string`,required:!1}},{key:`bookings`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  code: string;
  /** Canonical lifecycle state — display labels derive from this, never freehand. */
  codeStatus: CollectionCodeStatus;
  whenLabel: string;
  itemsLabel: string;
  status: { label: string; tone: 'success' | 'warning' | 'neutral' };
  /** Branch the code was issued for; reception at another branch cannot redeem it. */
  branchId?: string;
  locationLabel?: string;
  providerLabel?: string;
  /** Who created the booking — reception on behalf vs the patient themselves. */
  creatorLabel?: string;
  /**
   * Capture contract (payment-ms): \`paid\` is the only real capture state;
   * \`pending\` means no capture exists yet. Amount in minor units.
   */
  payment?: { state: 'paid' | 'pending'; amountMinor: string };
}`,signature:{properties:[{key:`code`,value:{name:`string`,required:!0}},{key:`codeStatus`,value:{name:`unknown[number]`,raw:`(typeof COLLECTION_CODE_STATUSES)[number]`,required:!0},description:`Canonical lifecycle state — display labels derive from this, never freehand.`},{key:`whenLabel`,value:{name:`string`,required:!0}},{key:`itemsLabel`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`signature`,type:`object`,raw:`{ label: string; tone: 'success' | 'warning' | 'neutral' }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`tone`,value:{name:`union`,raw:`'success' | 'warning' | 'neutral'`,elements:[{name:`literal`,value:`'success'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'neutral'`}],required:!0}}]},required:!0}},{key:`branchId`,value:{name:`string`,required:!1},description:`Branch the code was issued for; reception at another branch cannot redeem it.`},{key:`locationLabel`,value:{name:`string`,required:!1}},{key:`providerLabel`,value:{name:`string`,required:!1}},{key:`creatorLabel`,value:{name:`string`,required:!1},description:`Who created the booking — reception on behalf vs the patient themselves.`},{key:`payment`,value:{name:`signature`,type:`object`,raw:`{ state: 'paid' | 'pending'; amountMinor: string }`,signature:{properties:[{key:`state`,value:{name:`union`,raw:`'paid' | 'pending'`,elements:[{name:`literal`,value:`'paid'`},{name:`literal`,value:`'pending'`}],required:!0}},{key:`amountMinor`,value:{name:`string`,required:!0}}]},required:!1},description:"Capture contract (payment-ms): `paid` is the only real capture state;\n`pending` means no capture exists yet. Amount in minor units."}]}}],raw:`BookingSummary[]`,required:!1}},{key:`phoneVerifiedMonthsAgo`,value:{name:`number`,required:!1},description:`Months since the phone channel was last verified. PROTOTYPE FIELD —
patient-ms stores only the assurance flag, not verification recency.`}]}},description:``},matched:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  name?: boolean;
  nameKhmer?: boolean;
  dob?: boolean;
  phone?: boolean;
  nid?: boolean;
}`,signature:{properties:[{key:`name`,value:{name:`boolean`,required:!1}},{key:`nameKhmer`,value:{name:`boolean`,required:!1}},{key:`dob`,value:{name:`boolean`,required:!1}},{key:`phone`,value:{name:`boolean`,required:!1}},{key:`nid`,value:{name:`boolean`,required:!1}}]}},description:`Per-field emphasis on candidate rows so matched fields scan fast.`},bookings:{required:!1,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  code: string;
  /** Canonical lifecycle state — display labels derive from this, never freehand. */
  codeStatus: CollectionCodeStatus;
  whenLabel: string;
  itemsLabel: string;
  status: { label: string; tone: 'success' | 'warning' | 'neutral' };
  /** Branch the code was issued for; reception at another branch cannot redeem it. */
  branchId?: string;
  locationLabel?: string;
  providerLabel?: string;
  /** Who created the booking — reception on behalf vs the patient themselves. */
  creatorLabel?: string;
  /**
   * Capture contract (payment-ms): \`paid\` is the only real capture state;
   * \`pending\` means no capture exists yet. Amount in minor units.
   */
  payment?: { state: 'paid' | 'pending'; amountMinor: string };
}`,signature:{properties:[{key:`code`,value:{name:`string`,required:!0}},{key:`codeStatus`,value:{name:`unknown[number]`,raw:`(typeof COLLECTION_CODE_STATUSES)[number]`,required:!0},description:`Canonical lifecycle state — display labels derive from this, never freehand.`},{key:`whenLabel`,value:{name:`string`,required:!0}},{key:`itemsLabel`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`signature`,type:`object`,raw:`{ label: string; tone: 'success' | 'warning' | 'neutral' }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`tone`,value:{name:`union`,raw:`'success' | 'warning' | 'neutral'`,elements:[{name:`literal`,value:`'success'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'neutral'`}],required:!0}}]},required:!0}},{key:`branchId`,value:{name:`string`,required:!1},description:`Branch the code was issued for; reception at another branch cannot redeem it.`},{key:`locationLabel`,value:{name:`string`,required:!1}},{key:`providerLabel`,value:{name:`string`,required:!1}},{key:`creatorLabel`,value:{name:`string`,required:!1},description:`Who created the booking — reception on behalf vs the patient themselves.`},{key:`payment`,value:{name:`signature`,type:`object`,raw:`{ state: 'paid' | 'pending'; amountMinor: string }`,signature:{properties:[{key:`state`,value:{name:`union`,raw:`'paid' | 'pending'`,elements:[{name:`literal`,value:`'paid'`},{name:`literal`,value:`'pending'`}],required:!0}},{key:`amountMinor`,value:{name:`string`,required:!0}}]},required:!1},description:"Capture contract (payment-ms): `paid` is the only real capture state;\n`pending` means no capture exists yet. Amount in minor units."}]}}],raw:`BookingSummary[]`},description:``},bookingsHeader:{required:!1,tsType:{name:`ReactNode`},description:`Caption above the bookings list; derived from count when omitted.`},searchedValue:{required:!1,tsType:{name:`string`},description:`No-match only: the query that returned nothing, echoed verbatim.`},searchedKind:{required:!1,tsType:{name:`string`},description:``},status:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  label: string;
  variant: BadgeVariant;
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`variant`,value:{name:`union`,raw:`| 'neutral'
| 'primary'
| 'secondary'
| 'outline'
| 'success'
| 'warning'
| 'danger'
| 'info'
| 'ai'`,elements:[{name:`literal`,value:`'neutral'`},{name:`literal`,value:`'primary'`},{name:`literal`,value:`'secondary'`},{name:`literal`,value:`'outline'`},{name:`literal`,value:`'success'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'danger'`},{name:`literal`,value:`'info'`},{name:`literal`,value:`'ai'`}],required:!0}}]}},description:``},provenance:{required:!1,tsType:{name:`ReactNode`},description:`Plain capture/source context. This is provenance, never verification status.`},lastVisitLabel:{required:!1,tsType:{name:`string`},description:``},trustSignals:{required:!1,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  label: string;
  tone: 'success' | 'info' | 'neutral' | 'warning' | 'danger';
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`tone`,value:{name:`union`,raw:`'success' | 'info' | 'neutral' | 'warning' | 'danger'`,elements:[{name:`literal`,value:`'success'`},{name:`literal`,value:`'info'`},{name:`literal`,value:`'neutral'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'danger'`}],required:!0}}]}}],raw:`TrustSignal[]`},description:`Trust facts (verification recency, cross-PSC origin). Worst tone leads.`},matchedOnLabel:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:`"Matched on National ID + Phone" — evidence the desk can verify aloud.`},onBookingSelect:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(booking: BookingSummary) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  code: string;
  /** Canonical lifecycle state — display labels derive from this, never freehand. */
  codeStatus: CollectionCodeStatus;
  whenLabel: string;
  itemsLabel: string;
  status: { label: string; tone: 'success' | 'warning' | 'neutral' };
  /** Branch the code was issued for; reception at another branch cannot redeem it. */
  branchId?: string;
  locationLabel?: string;
  providerLabel?: string;
  /** Who created the booking — reception on behalf vs the patient themselves. */
  creatorLabel?: string;
  /**
   * Capture contract (payment-ms): \`paid\` is the only real capture state;
   * \`pending\` means no capture exists yet. Amount in minor units.
   */
  payment?: { state: 'paid' | 'pending'; amountMinor: string };
}`,signature:{properties:[{key:`code`,value:{name:`string`,required:!0}},{key:`codeStatus`,value:{name:`unknown[number]`,raw:`(typeof COLLECTION_CODE_STATUSES)[number]`,required:!0},description:`Canonical lifecycle state — display labels derive from this, never freehand.`},{key:`whenLabel`,value:{name:`string`,required:!0}},{key:`itemsLabel`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`signature`,type:`object`,raw:`{ label: string; tone: 'success' | 'warning' | 'neutral' }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`tone`,value:{name:`union`,raw:`'success' | 'warning' | 'neutral'`,elements:[{name:`literal`,value:`'success'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'neutral'`}],required:!0}}]},required:!0}},{key:`branchId`,value:{name:`string`,required:!1},description:`Branch the code was issued for; reception at another branch cannot redeem it.`},{key:`locationLabel`,value:{name:`string`,required:!1}},{key:`providerLabel`,value:{name:`string`,required:!1}},{key:`creatorLabel`,value:{name:`string`,required:!1},description:`Who created the booking — reception on behalf vs the patient themselves.`},{key:`payment`,value:{name:`signature`,type:`object`,raw:`{ state: 'paid' | 'pending'; amountMinor: string }`,signature:{properties:[{key:`state`,value:{name:`union`,raw:`'paid' | 'pending'`,elements:[{name:`literal`,value:`'paid'`},{name:`literal`,value:`'pending'`}],required:!0}},{key:`amountMinor`,value:{name:`string`,required:!0}}]},required:!1},description:"Capture contract (payment-ms): `paid` is the only real capture state;\n`pending` means no capture exists yet. Amount in minor units."}]}},name:`booking`}],return:{name:`void`}}},description:`When set, booking rows become the check-in action for that booking.`},bookingActionable:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(booking: BookingSummary) => boolean`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  code: string;
  /** Canonical lifecycle state — display labels derive from this, never freehand. */
  codeStatus: CollectionCodeStatus;
  whenLabel: string;
  itemsLabel: string;
  status: { label: string; tone: 'success' | 'warning' | 'neutral' };
  /** Branch the code was issued for; reception at another branch cannot redeem it. */
  branchId?: string;
  locationLabel?: string;
  providerLabel?: string;
  /** Who created the booking — reception on behalf vs the patient themselves. */
  creatorLabel?: string;
  /**
   * Capture contract (payment-ms): \`paid\` is the only real capture state;
   * \`pending\` means no capture exists yet. Amount in minor units.
   */
  payment?: { state: 'paid' | 'pending'; amountMinor: string };
}`,signature:{properties:[{key:`code`,value:{name:`string`,required:!0}},{key:`codeStatus`,value:{name:`unknown[number]`,raw:`(typeof COLLECTION_CODE_STATUSES)[number]`,required:!0},description:`Canonical lifecycle state — display labels derive from this, never freehand.`},{key:`whenLabel`,value:{name:`string`,required:!0}},{key:`itemsLabel`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`signature`,type:`object`,raw:`{ label: string; tone: 'success' | 'warning' | 'neutral' }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`tone`,value:{name:`union`,raw:`'success' | 'warning' | 'neutral'`,elements:[{name:`literal`,value:`'success'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'neutral'`}],required:!0}}]},required:!0}},{key:`branchId`,value:{name:`string`,required:!1},description:`Branch the code was issued for; reception at another branch cannot redeem it.`},{key:`locationLabel`,value:{name:`string`,required:!1}},{key:`providerLabel`,value:{name:`string`,required:!1}},{key:`creatorLabel`,value:{name:`string`,required:!1},description:`Who created the booking — reception on behalf vs the patient themselves.`},{key:`payment`,value:{name:`signature`,type:`object`,raw:`{ state: 'paid' | 'pending'; amountMinor: string }`,signature:{properties:[{key:`state`,value:{name:`union`,raw:`'paid' | 'pending'`,elements:[{name:`literal`,value:`'paid'`},{name:`literal`,value:`'pending'`}],required:!0}},{key:`amountMinor`,value:{name:`string`,required:!0}}]},required:!1},description:"Capture contract (payment-ms): `paid` is the only real capture state;\n`pending` means no capture exists yet. Amount in minor units."}]}},name:`booking`}],return:{name:`boolean`}}},description:`Which bookings may be checked in here; the rest render as facts only.`},helperText:{required:!1,tsType:{name:`ReactNode`},description:``},selectable:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},selected:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},onSelect:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},actions:{required:!1,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: ReactNode;
  disabled?: boolean;
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`onClick`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!1}},{key:`variant`,value:{name:`union`,raw:`'primary' | 'secondary' | 'ghost'`,elements:[{name:`literal`,value:`'primary'`},{name:`literal`,value:`'secondary'`},{name:`literal`,value:`'ghost'`}],required:!1}},{key:`icon`,value:{name:`ReactNode`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}}]}}],raw:`PatientResolutionAction[]`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})),wr,Tr,Er,Dr,Or,kr,Ar,jr,Mr,Nr,Pr,Fr,Ir,Lr,Rr,zr,Br,Vr,Hr,Ur,Wr,Gr,Kr,qr,Jr,Yr,Xr,Zr,Qr,$r,ei,ti,ni,ri,ii,ai,oi,si,ci,li,ui,di,fi,pi,mi,hi,gi,_i,vi,yi,bi,xi,Si,Ci,wi,Ti,Ei,Di,Oi,ki,Ai,ji,Mi,Ni,Pi,Fi,Ii,Li,Ri,zi,Bi,Vi,Hi,Ui,Wi,Gi,Ki,qi,Ji,Yi,Xi,Zi,Qi,$i,ea,ta,na,ra,ia,aa,oa,sa,ca,la,ua,da,fa,pa,ma,ha,ga,_a,va,ya,ba,Z,xa=t((()=>{wr=`_wizard_1qeom_1`,Tr=`_stepper_1qeom_8`,Er=`_workspace_1qeom_18`,Dr=`_stepPanel_1qeom_36`,Or=`_step_1qeom_8`,kr=`_stepTitle_1qeom_54`,Ar=`_stepHeader_1qeom_62`,jr=`_subTitle_1qeom_69`,Mr=`_hint_1qeom_76`,Nr=`_fieldGrid_1qeom_83`,Pr=`_inlineAction_1qeom_90`,Fr=`_channel_1qeom_94`,Ir=`_phoneRow_1qeom_101`,Lr=`_collisions_1qeom_108`,Rr=`_insuranceEmpty_1qeom_114`,zr=`_policyForm_1qeom_121`,Br=`_lineTextWide_1qeom_128`,Vr=`_lineName_1qeom_135`,Hr=`_lineMeta_1qeom_141`,Ur=`_additionalOrdersPopover_1qeom_146`,Wr=`_additionalOrderList_1qeom_151`,Gr=`_additionalOrderRow_1qeom_159`,Kr=`_additionalOrderPrice_1qeom_174`,qr=`_intakeList_1qeom_181`,Jr=`_intakeRow_1qeom_191`,Yr=`_intakeMark_1qeom_219`,Xr=`_intakeRowAction_1qeom_242`,Zr=`_slotRow_1qeom_260`,Qr=`_due_1qeom_266`,$r=`_khr_1qeom_272`,ei=`_payGrid_1qeom_278`,ti=`_payBody_1qeom_284`,ni=`_payFooter_1qeom_290`,ri=`_stepFooter_1qeom_295`,ii=`_stepFooterInner_1qeom_307`,ai=`_footerBack_1qeom_317`,oi=`_footerReason_1qeom_321`,si=`_footerPrimary_1qeom_331`,ci=`_stepSubtitle_1qeom_396`,li=`_identityKicker_1qeom_402`,ui=`_identityGroupIntro_1qeom_411`,di=`_identityGroupTitle_1qeom_417`,fi=`_identityGroupHint_1qeom_424`,pi=`_identityCards_1qeom_430`,mi=`_identityCreateNew_1qeom_436`,hi=`_identityActionArea_1qeom_442`,gi=`_identityHelper_1qeom_452`,_i=`_stepHeaderRow_1qeom_467`,vi=`_sectionCard_1qeom_475`,yi=`_sectionCardHeader_1qeom_488`,bi=`_fieldSpanAll_1qeom_495`,xi=`_refundRow_1qeom_499`,Si=`_refundValue_1qeom_507`,Ci=`_refundEmpty_1qeom_513`,wi=`_dataPoints_1qeom_522`,Ti=`_dataPoint_1qeom_522`,Ei=`_dataPointLabel_1qeom_541`,Di=`_dataPointValue_1qeom_549`,Oi=`_policyHeader_1qeom_558`,ki=`_policyHeading_1qeom_564`,Ai=`_policyTitleRow_1qeom_569`,ji=`_policyName_1qeom_576`,Mi=`_insurancePolicyIcon_1qeom_582`,Ni=`_insuranceEmptyIcon_1qeom_583`,Pi=`_insuranceEmptyCard_1qeom_595`,Fi=`_insuranceEmptyActions_1qeom_609`,Ii=`_policyFormActions_1qeom_618`,Li=`_monoField_1qeom_625`,Ri=`_checkingRow_1qeom_630`,zi=`_checkingSpinner_1qeom_636`,Bi=`_checkingTitle_1qeom_657`,Vi=`_attribution_1qeom_666`,Hi=`_blockerList_1qeom_670`,Ui=`_subjectMeta_1qeom_680`,Wi=`_subjectQueue_1qeom_689`,Gi=`_collisionRecord_1qeom_697`,Ki=`_collisionPin_1qeom_721`,qi=`_collisionPinHint_1qeom_733`,Ji=`_mono_1qeom_625`,Yi=`_consentPanel_1qeom_745`,Xi=`_consentList_1qeom_754`,Zi=`_consentRow_1qeom_762`,Qi=`_verbalFields_1qeom_774`,$i=`_intakeHeader_1qeom_787`,ea=`_intakeHeaderText_1qeom_800`,ta=`_intakeHeaderActions_1qeom_806`,na=`_intakeHeaderButtons_1qeom_813`,ra=`_intakeHeaderReason_1qeom_819`,ia=`_inlineForm_1qeom_848`,aa=`_dayWarnIcon_1qeom_866`,oa=`_srOnly_1qeom_871`,sa=`_shortcutList_1qeom_885`,ca=`_formSection_1qeom_914`,la=`_sectionHeader_1qeom_920`,ua=`_sectionProvenance_1qeom_926`,da=`_sectionAction_1qeom_931`,fa=`_disclosures_1qeom_752`,pa=`_titleRow_1qeom_952`,ma=`_promoRow_1qeom_958`,ha=`_dueBreakdown_1qeom_966`,ga=`_discount_1qeom_995`,_a=`_dock_1qeom_1000`,va=`_dockInfo_1qeom_1021`,ya=`_dockLabel_1qeom_1028`,ba=`_dockDue_1qeom_1036`,Z={wizard:wr,stepper:Tr,workspace:Er,stepPanel:Dr,step:Or,stepTitle:kr,stepHeader:Ar,subTitle:jr,hint:Mr,fieldGrid:Nr,inlineAction:Pr,channel:Fr,phoneRow:Ir,collisions:Lr,insuranceEmpty:Rr,policyForm:zr,lineTextWide:Br,lineName:Vr,lineMeta:Hr,additionalOrdersPopover:Ur,additionalOrderList:Wr,additionalOrderRow:Gr,additionalOrderPrice:Kr,intakeList:qr,intakeRow:Jr,intakeMark:Yr,intakeRowAction:Xr,slotRow:Zr,due:Qr,khr:$r,payGrid:ei,payBody:ti,payFooter:ni,stepFooter:ri,stepFooterInner:ii,footerBack:ai,footerReason:oi,footerPrimary:si,stepSubtitle:ci,identityKicker:li,identityGroupIntro:ui,identityGroupTitle:di,identityGroupHint:fi,identityCards:pi,identityCreateNew:mi,identityActionArea:hi,identityHelper:gi,stepHeaderRow:_i,sectionCard:vi,sectionCardHeader:yi,fieldSpanAll:bi,refundRow:xi,refundValue:Si,refundEmpty:Ci,dataPoints:wi,dataPoint:Ti,dataPointLabel:Ei,dataPointValue:Di,policyHeader:Oi,policyHeading:ki,policyTitleRow:Ai,policyName:ji,insurancePolicyIcon:Mi,insuranceEmptyIcon:Ni,insuranceEmptyCard:Pi,insuranceEmptyActions:Fi,policyFormActions:Ii,monoField:Li,checkingRow:Ri,checkingSpinner:zi,"fd-spin":`_fd-spin_1qeom_1`,checkingTitle:Bi,attribution:Vi,blockerList:Hi,subjectMeta:Ui,subjectQueue:Wi,collisionRecord:Gi,collisionPin:Ki,collisionPinHint:qi,mono:Ji,consentPanel:Yi,consentList:Xi,consentRow:Zi,verbalFields:Qi,intakeHeader:$i,intakeHeaderText:ea,intakeHeaderActions:ta,intakeHeaderButtons:na,intakeHeaderReason:ra,inlineForm:ia,dayWarnIcon:aa,srOnly:oa,shortcutList:sa,formSection:ca,sectionHeader:la,sectionProvenance:ua,sectionAction:da,disclosures:fa,titleRow:pa,promoRow:ma,dueBreakdown:ha,discount:ga,dock:_a,dockInfo:va,dockLabel:ya,dockDue:ba}}));function Sa({branchId:e=St,existingPatients:t,identityRegistry:n=ft,onCheckIn:r,onPatientChange:i,patient:a,prescribers:o=wt,fxRate:s,pricingStatus:c=`ready`,onRetryPricing:l}){let u=Mt(a),[d,f]=(0,$.useState)(()=>Ue(u)),[p,m]=(0,$.useState)(null),h=Je(a,t);function g(e){let t={...a,...e};Be(a,t)&&e.collisionAcked===void 0&&(t.collisionAcked=[]),i(t)}function _(e){a.cart.payment.status===`confirmed`?m(()=>t=>{let n=e(a);i({...n,cart:{...n.cart,payment:rt(a.cart.payment,t)}})}):i(e(a))}function v(e){$e(e,d,u)&&f(e)}let[y,b]=(0,$.useState)(!1),[x,S]=(0,$.useState)(!1);(0,$.useEffect)(()=>{let e=window.matchMedia(`(max-width: 599px)`),t=()=>S(e.matches);return t(),e.addEventListener(`change`,t),()=>e.removeEventListener(`change`,t)},[]);let C=(0,$.useRef)(v);(0,$.useEffect)(()=>{C.current=v}),(0,$.useEffect)(()=>{function e(e){let t=e.target,n=t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t?.isContentEditable;if(document.querySelector(`[role="alertdialog"][data-state="open"], [role="dialog"][data-state="open"]`))return;if(e.key===`?`&&!n){e.preventDefault(),b(!0);return}let r=/^F([1-6])$/.exec(e.key);r&&(e.preventDefault(),C.current(Number(r[1])))}return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[]);let E=d>=4||a.cart.items.length>0,se=x&&(a.cart.items.length>0||u.step3Done);return(0,Q.jsxs)(`div`,{className:Z.wizard,children:[(0,Q.jsx)(Ne,{status:Ft(a,u),subject:{name:a.name,nameKhmer:a.nameKhmer||void 0,reference:`Q-${String(a.queueNumber).padStart(3,`0`)}`,dob:a.dob||void 0,sexAtBirth:a.sexAtBirth||void 0,arrivedLabel:a.arrivedLabel?`Arrived ${a.arrivedLabel}`:void 0,meta:a.boundBookingCode?[`Booking ${a.boundBookingCode}`]:void 0}}),(0,Q.jsx)(ae,{className:Z.stepper,onValueChange:e=>v(e),value:d,children:(0,Q.jsx)(w,{children:Ha.map((e,t)=>(0,Q.jsxs)(le,{completed:u.stepStatus[e.id]===`done`,disabled:u.stepStatus[e.id]===`locked`,step:e.id,children:[(0,Q.jsxs)(ne,{children:[(0,Q.jsx)(A,{children:e.id}),(0,Q.jsx)(ee,{children:e.title})]}),t<Ha.length-1?(0,Q.jsx)(k,{}):null]},e.id))})}),(0,Q.jsxs)(`div`,{className:Z.workspace,"data-cart-rail":E?`visible`:`hidden`,"data-step":d,children:[(0,Q.jsxs)(`div`,{className:Z.stepPanel,children:[d===1?(0,Q.jsx)(Ta,{branchId:e,collisions:h,onAdvance:()=>f(2),onUpdate:g,patient:a,registry:n}):null,d===2?(0,Q.jsx)(Aa,{collisions:h,onUpdate:g,patient:a}):null,d===3?(0,Q.jsx)(Ma,{onUpdate:g,patient:a}):null,d===4?(0,Q.jsx)(Na,{guardPaidEdit:_,onUpdate:g,patient:a,prescribers:o}):null,d===5?(0,Q.jsx)(Pa,{onUpdate:g,patient:a}):null,d===6?(0,Q.jsx)(Fa,{fxRate:s,onUpdate:g,patient:a,prescribers:o,pricingStatus:c}):null,(0,Q.jsx)(wa,{collisionsBlock:(d===1||d===2)&&h.length>0,gate:u,mobileDockAvailable:se,onBack:()=>f(d-1),onContinue:()=>f(d+1),onFinish:r,step:d})]}),E?(0,Q.jsx)(Ht,{fxRate:s,pricingStatus:c,onRetryPricing:l,onAcceptReprice:()=>g({cart:it(a.cart)}),onRetryCodeIssuance:()=>g({cart:{...a.cart,placeFailure:null}}),onRemoveItem:e=>_(t=>({...t,cart:{...t.cart,items:t.cart.items.filter(t=>t.id!==e)}})),patient:a}):null]}),se?(0,Q.jsx)(Ca,{gate:u,onFinish:r,onResume:()=>f(Ue(u)),patient:a}):null,(0,Q.jsx)(Ia,{onCancel:()=>m(null),onResolve:e=>{p?.(e),m(null)},open:p!==null,receiptId:a.cart.payment.receiptId}),(0,Q.jsx)(ie,{onOpenChange:e=>e?void 0:b(!1),open:y,children:(0,Q.jsxs)(oe,{children:[(0,Q.jsxs)(te,{children:[(0,Q.jsx)(T,{children:`Keyboard shortcuts`}),(0,Q.jsx)(O,{children:`Reception runs hands-on-keyboard. Locked steps stay locked — a shortcut never bypasses the gate.`})]}),(0,Q.jsxs)(`dl`,{className:Z.shortcutList,children:[(0,Q.jsxs)(`div`,{children:[(0,Q.jsxs)(`dt`,{children:[(0,Q.jsx)(re,{children:`F1`}),`–`,(0,Q.jsx)(re,{children:`F6`})]}),(0,Q.jsx)(`dd`,{children:`Jump to a wizard step`})]}),(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(`dt`,{children:(0,Q.jsx)(re,{children:`?`})}),(0,Q.jsx)(`dd`,{children:`Open this list`})]})]}),(0,Q.jsx)(D,{children:(0,Q.jsx)(j,{onClick:()=>b(!1),children:`Close`})})]})})]})}function Ca({gate:e,onFinish:t,onResume:n,patient:r}){let i=Le(r.cart),a=nt(r.cart,i),o=r.cart.payment,s=o.status===`waiting`||o.status===`split-cash`,c=Ue(e),l,u;return s?(l=(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(`span`,{className:Z.dockLabel,children:`Waiting for Bakong`}),(0,Q.jsx)(V,{className:Z.dockDue,currency:`USD`,minor:a})]}),u=(0,Q.jsx)(I,{onClick:n,size:`sm`,variant:`outline`,children:`View QR`})):e.step6Done?(l=(0,Q.jsx)(`span`,{className:Z.dockLabel,children:e.paid?`Paid · ${o.receiptId??``}`:o.status===`no-charge`?`No charge`:`Pay later recorded`}),u=(0,Q.jsx)(I,{onClick:t,size:`sm`,variant:`primary`,children:`Finish check-in`})):e.step5Done?(l=(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(`span`,{className:Z.dockLabel,children:`Patient due`}),(0,Q.jsx)(V,{className:Z.dockDue,currency:`USD`,minor:a})]}),u=(0,Q.jsx)(I,{onClick:n,size:`sm`,variant:`primary`,children:`Collect payment`})):r.cart.items.length===0?(l=(0,Q.jsx)(`span`,{className:Z.dockLabel,children:`No orders yet`}),u=(0,Q.jsx)(I,{onClick:n,size:`sm`,variant:`secondary`,children:c===4?`Add orders`:`Continue`})):(l=(0,Q.jsxs)(`span`,{className:Z.dockLabel,children:[`Step `,c,` of 6 · `,Ha.find(e=>e.id===c)?.title]}),u=(0,Q.jsx)(I,{onClick:n,size:`sm`,variant:`secondary`,children:`Continue`})),(0,Q.jsxs)(`div`,{"aria-label":`Check-in progress`,className:Z.dock,role:`region`,children:[(0,Q.jsx)(`div`,{className:Z.dockInfo,children:l}),u]})}function wa({collisionsBlock:e,gate:t,mobileDockAvailable:n,onBack:r,onContinue:i,onFinish:a,step:o}){let s=t[`step${o}Done`]===!0,c=!s||e,l=e?`Resolve the possible duplicates above to continue.`:s?null:o===6?`Record payment before finishing this reception flow.`:Ua[o],u=o===6?`Finish`:o===1?`Review details`:`Continue`;return(0,Q.jsx)(`footer`,{"aria-label":`Check-in actions`,className:Z.stepFooter,"data-mobile-dock":n?`true`:void 0,role:`region`,children:(0,Q.jsxs)(`div`,{className:Z.stepFooterInner,children:[o>1?(0,Q.jsx)(I,{className:Z.footerBack,onClick:r,variant:`outline`,children:`Back`}):(0,Q.jsx)(`span`,{className:Z.footerBack}),c&&l?(0,Q.jsx)(`p`,{className:Z.footerReason,children:l}):(0,Q.jsx)(`span`,{}),(0,Q.jsx)(I,{className:Z.footerPrimary,disabled:c,onClick:o===6?a:i,variant:`primary`,children:u})]})})}function Ta({branchId:e,collisions:t,onAdvance:n,onUpdate:r,patient:a,registry:s}){let[c,l]=(0,$.useState)(``),[d,f]=(0,$.useState)(null),[p,m]=(0,$.useState)(!1),[h,g]=(0,$.useState)([]),[_,v]=(0,$.useState)(!1),y=a.identity.source!==null,b=y?null:dt(c,s,{branchId:e});function x(e,t){r({...Wa(e),boundBookingCode:t?.code??null}),n()}function S(e,t){r({name:e===`name`?t:``,phoneNumber:e===`phone`?t.replace(/\D/g,``):a.phoneNumber,identity:{source:`manual`,lockedFields:[]},collisionAcked:[]}),n()}if(y){let e=a.identity.source===`qr`?`Booking QR`:a.identity.source===`existing`?`Existing Kura record`:`Manual entry`,n=a.identity.lockedFields.length>0;return(0,Q.jsxs)(`section`,{"aria-label":`Identity`,className:Z.step,children:[(0,Q.jsx)(`h2`,{className:Z.stepTitle,children:`Patient selected`}),(0,Q.jsx)(`p`,{className:Z.stepSubtitle,children:a.identity.lockedFields.length>0?`Review details next. Unlock fields before editing.`:`Review and edit details on the next step.`}),(0,Q.jsx)(Y,{variant:`captured`,record:{id:a.id,name:a.name||`New patient`,dob:a.dob||void 0,sexAtBirth:a.sexAtBirth,nid:a.idNumber||void 0,phone:a.phoneNumber||void 0,assurance:`unverified`,registeredHere:!0},provenance:`Source: ${e}${a.identity.capturedAtLabel?` · Captured ${a.identity.capturedAtLabel}`:``}`,helperText:n?(0,Q.jsxs)(L,{size:`sm`,variant:`neutral`,children:[a.identity.lockedFields.length,` fields locked`]}):void 0,actions:_?void 0:[{label:`Choose a different patient`,variant:`ghost`,icon:(0,Q.jsx)(o,{size:14,"aria-hidden":!0}),onClick:()=>v(!0)}]}),_?(0,Q.jsxs)(F,{tone:`warning`,children:[(0,Q.jsx)(M,{children:`Choose a different patient?`}),(0,Q.jsx)(P,{children:`Search again. Current details stay until you select or create another patient.`}),(0,Q.jsxs)(N,{children:[(0,Q.jsx)(I,{onClick:()=>v(!1),size:`sm`,variant:`outline`,children:`Keep current`}),(0,Q.jsx)(I,{onClick:()=>{v(!1),l(``),f(null),m(!1),r({identity:{source:null,lockedFields:[]},boundBookingCode:null})},size:`sm`,variant:`primary`,children:`Search again`})]})]}):null,(0,Q.jsx)(Da,{collisions:t,onAcknowledge:e=>r({collisionAcked:[...a.collisionAcked,e]}),onLoadExisting:e=>{r({...Wa({id:e.id,name:e.name,nameKhmer:e.nameKhmer||void 0,dob:e.dob||void 0,sexAtBirth:e.sexAtBirth,nid:e.idNumber||void 0,phone:e.phoneNumber||void 0,assurance:`unverified`,registeredHere:!0}),collisionAcked:[e.id]})}})]})}let C=b?.kind===`shared-phone`?b.records.find(e=>e.id===d)??null:null,w=Xe(C,p),T=b?.kind===`candidates`?b.records.filter(e=>!h.includes(e.id)):[];return(0,Q.jsxs)(`section`,{"aria-label":`Identity`,className:Z.step,children:[(0,Q.jsx)(`h2`,{className:Z.stepTitle,children:`Find or create a patient`}),(0,Q.jsx)(`p`,{className:Z.stepSubtitle,children:`Search by phone, booking code, or name.`}),(0,Q.jsx)(Tn,{autoFocus:!0,demoQrPayload:At,onChange:e=>{l(e),f(null),m(!1),g([])},value:c}),b?.kind===`known-here`?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(Y,{variant:`known-here`,record:b.record,bookingsHeader:b.record.bookings?.length?`Today · ${b.record.bookings.length} bookings`:void 0,lastVisitLabel:b.record.lastVisitLabel,trustSignals:Tt(b.record),onBookingSelect:b.record.bookings?.length?e=>x(b.record,e):void 0,bookingActionable:t=>st(t,e)===null}),(0,Q.jsx)(Ea,{children:(0,Q.jsxs)(I,{onClick:()=>x(b.record),variant:b.record.bookings?.length?`outline`:`primary`,children:[b.record.bookings?.length?`Continue without a booking`:`Continue with ${b.record.name}`,(0,Q.jsx)(u,{size:14,"aria-hidden":!0})]})})]}):null,b?.kind===`known-elsewhere`?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(Y,{variant:`known-elsewhere`,record:b.record,status:{label:`First visit at this PSC`,variant:`warning`},trustSignals:Tt(b.record),helperText:`Use this Kura record at this PSC. No details need to be entered again.`}),(0,Q.jsx)(Ea,{children:(0,Q.jsxs)(I,{onClick:()=>x(b.record),variant:`primary`,children:[`Import `,b.record.name,(0,Q.jsx)(u,{size:14,"aria-hidden":!0})]})})]}):null,b?.kind===`booking-linked`?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(Y,{variant:`booking-linked`,record:b.record,bookings:[b.booking]}),(0,Q.jsx)(Ea,{children:(0,Q.jsxs)(I,{onClick:()=>x(b.record,b.booking),variant:`primary`,children:[`Check in booking `,b.booking.code,(0,Q.jsx)(u,{size:14,"aria-hidden":!0})]})})]}):null,b?.kind===`booking-blocked`?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(Y,{variant:`booking-blocked`,record:b.record,bookings:[b.booking],status:{label:Lt(b.reason).title,variant:`warning`},helperText:Lt(b.reason).description}),(0,Q.jsx)(Ea,{children:b.reason===`redeemed`?(0,Q.jsx)(I,{onClick:()=>x(b.record),variant:`outline`,children:`Continue as a walk-in`}):(0,Q.jsxs)(I,{onClick:()=>x(b.record),variant:`primary`,children:[`Continue with `,b.record.name,` as walk-in`,(0,Q.jsx)(u,{size:14,"aria-hidden":!0})]})})]}):null,b?.kind===`shared-phone`?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(`div`,{className:Z.identityGroupIntro,children:[(0,Q.jsx)(`h3`,{className:Z.identityGroupTitle,children:`Who is here today?`}),(0,Q.jsxs)(`p`,{className:Z.identityGroupHint,children:[b.records.length,` patients are linked to this phone number.`]})]}),(0,Q.jsx)(`div`,{"aria-label":`Choose who is here today`,className:Z.identityCards,role:`radiogroup`,children:b.records.map(t=>{let n=d===t.id,r=n&&t.minor;return(0,Q.jsx)(Y,{variant:`shared-phone`,record:t,selectable:!0,selected:n,onSelect:()=>{f(t.id),m(!1)},onBookingSelect:n&&!w&&(t.bookings?.length??0)>1?e=>x(t,e):void 0,bookingActionable:t=>st(t,e)===null,status:r?p?{label:`Guardian confirmed · ${t.guardianName??`present`}`,variant:`success`}:{label:`Guardian required · On file: ${t.guardianName??`unknown`}`,variant:`warning`}:void 0,actions:r&&!p?[{label:`Confirm guardian present`,variant:`secondary`,icon:(0,Q.jsx)(i,{size:14,"aria-hidden":!0}),onClick:()=>m(!0)}]:void 0},t.id)})}),(0,Q.jsxs)(I,{className:Z.identityCreateNew,onClick:()=>S(`phone`,c),variant:`outline`,children:[`None of these? Create a new patient`,(0,Q.jsx)(u,{size:14,"aria-hidden":!0})]}),(0,Q.jsx)(Ea,{helper:d===null?`Choose a patient to continue.`:w?`Confirm the guardian is present to continue with a minor.`:void 0,children:C&&!w?(C.bookings?.length??0)>1?(0,Q.jsx)(I,{onClick:()=>x(C),variant:`outline`,children:`Continue without a booking`}):(0,Q.jsxs)(I,{onClick:()=>x(C,C.bookings?.[0]),variant:`primary`,children:[C.bookings?.length?`Check in ${C.name} · ${C.bookings[0].code}`:`Continue with ${C.name}`,(0,Q.jsx)(u,{size:14,"aria-hidden":!0})]}):null})]}):null,b?.kind===`candidates`?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(`p`,{className:Z.identityKicker,children:`Possible matches`}),(0,Q.jsx)(`div`,{className:Z.identityCards,children:T.map(e=>(0,Q.jsx)(Y,{variant:`candidate`,record:e,matched:{name:!0,nameKhmer:!0},status:e.assurance===`verified`?{label:`Verified`,variant:`success`}:{label:`Unverified`,variant:`warning`},trustSignals:Tt(e),lastVisitLabel:e.lastVisitLabel,actions:[{label:`Use existing`,variant:`primary`,icon:(0,Q.jsx)(i,{size:14,"aria-hidden":!0}),onClick:()=>x(e)},{label:`Different person`,variant:`secondary`,onClick:()=>g(t=>[...t,e.id])}]},e.id))}),(0,Q.jsxs)(I,{className:Z.identityCreateNew,onClick:()=>S(`name`,c),variant:`outline`,children:[`None of these? Create a new patient`,(0,Q.jsx)(u,{size:14,"aria-hidden":!0})]})]}):null,b?.kind===`no-match`?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(Y,{variant:`no-match`,searchedKind:b.queryKind===`phone`?`Phone`:b.queryKind===`code`?`Booking code`:`Name`,searchedValue:b.query,helperText:b.queryKind===`code`?`No booking carries this code. Check the code or search by phone instead.`:void 0}),b.queryKind===`code`?null:(0,Q.jsx)(Ea,{children:(0,Q.jsxs)(I,{onClick:()=>S(b.queryKind,b.query),variant:`primary`,children:[`Create a new patient`,(0,Q.jsx)(u,{size:14,"aria-hidden":!0})]})})]}):null]})}function Ea({helper:e,children:t}){return!e&&!t?null:(0,Q.jsxs)(`div`,{className:Z.identityActionArea,children:[e?(0,Q.jsx)(`span`,{className:Z.identityHelper,role:`status`,children:e}):null,t]})}function Da({collisions:e,onAcknowledge:t,onLoadExisting:n}){return e.length===0?null:(0,Q.jsx)(`div`,{className:Z.collisions,children:e.map(e=>(0,Q.jsx)(Oa,{collision:e,onAcknowledge:t,onLoadExisting:n},e.patient.id))})}function Oa({collision:e,onAcknowledge:t,onLoadExisting:n}){let[r,i]=(0,$.useState)(``),[a,o]=(0,$.useState)(!1),s=e.signals.includes(`idMatch`),c=tt(e.signals);return(0,Q.jsxs)(F,{tone:`warning`,children:[(0,Q.jsxs)(M,{children:[e.strength,` — `,e.patient.name]}),(0,Q.jsxs)(P,{children:[c?`${c} · `:``,`score `,e.score,`. Duplicate records create a duplicate-risk audit entry.`]}),a?(0,Q.jsxs)(`dl`,{className:Z.collisionRecord,children:[(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(`dt`,{children:`Queue`}),(0,Q.jsxs)(`dd`,{className:Z.mono,children:[`Q-`,String(e.patient.queueNumber).padStart(3,`0`)]})]}),(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(`dt`,{children:`Date of birth`}),(0,Q.jsx)(`dd`,{children:e.patient.dob||`Unknown`})]}),(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(`dt`,{children:`Sex at birth`}),(0,Q.jsx)(`dd`,{children:e.patient.sexAtBirth||`Unknown`})]}),(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(`dt`,{children:`Phone`}),(0,Q.jsx)(`dd`,{className:Z.mono,children:e.patient.phoneNumber?`${e.patient.countryCode} ${e.patient.phoneNumber}`:`None`})]})]}):null,s?(0,Q.jsxs)(`div`,{className:Z.collisionPin,children:[(0,Q.jsx)(h,{"aria-hidden":!0,size:14}),(0,Q.jsx)(R,{"aria-label":`Supervisor PIN`,inputMode:`numeric`,onChange:e=>i(e.target.value),placeholder:`Supervisor PIN`,type:`password`,value:r}),(0,Q.jsx)(`span`,{className:Z.collisionPinHint,children:`Same national ID. Keeping both records is logged with time and staff.`})]}):null,(0,Q.jsxs)(N,{children:[(0,Q.jsx)(I,{onClick:()=>o(e=>!e),size:`sm`,variant:`ghost`,children:a?`Hide record`:`View record`}),n?(0,Q.jsx)(I,{onClick:()=>n(e.patient),size:`sm`,variant:`outline`,children:`Use existing record`}):null,(0,Q.jsx)(I,{disabled:s&&!ze(r),onClick:()=>t(e.patient.id),size:`sm`,variant:`outline`,children:`Different person — continue`})]})]})}function ka({field:e,label:t,lockedFields:n,onChange:r,placeholder:i,required:a,value:o,lang:s}){let c=n.includes(e);return e===`dob`?(0,Q.jsx)(se,{disabled:c,label:t,lang:s,onValueChange:r,placeholder:i,required:a,suffix:c?(0,Q.jsx)(h,{size:14,"aria-hidden":!0}):void 0,value:o}):(0,Q.jsx)(R,{disabled:c,label:t,lang:s,onChange:e=>r(e.target.value),placeholder:i,required:a,suffix:c?(0,Q.jsx)(h,{size:14,"aria-hidden":!0}):void 0,value:o})}function Aa({collisions:e,onUpdate:t,patient:n}){let r=n.identity.lockedFields,i=r.length>0,[o,s]=(0,$.useState)(!1);function c(e){t({address:{...n.address,...e}})}return(0,Q.jsxs)(`section`,{"aria-label":`Review and confirm`,className:Z.step,children:[(0,Q.jsx)(`h2`,{className:Z.stepTitle,children:`Review & confirm`}),(0,Q.jsx)(Da,{collisions:e,onAcknowledge:e=>t({collisionAcked:[...n.collisionAcked,e]}),onLoadExisting:e=>t({...Wa({id:e.id,name:e.name,nameKhmer:e.nameKhmer||void 0,dob:e.dob||void 0,sexAtBirth:e.sexAtBirth,nid:e.idNumber||void 0,phone:e.phoneNumber||void 0,assurance:`unverified`,registeredHere:!0}),collisionAcked:[e.id]})}),o?(0,Q.jsxs)(F,{tone:`warning`,children:[(0,Q.jsx)(M,{children:`Unlock captured fields?`}),(0,Q.jsx)(P,{children:`These values were read from the record. Editing may introduce errors and the change is logged.`}),(0,Q.jsxs)(N,{children:[(0,Q.jsx)(I,{onClick:()=>s(!1),size:`sm`,variant:`outline`,children:`Keep locked`}),(0,Q.jsx)(I,{onClick:()=>{s(!1),t({identity:{...n.identity,lockedFields:[]}})},size:`sm`,variant:`destructive`,children:`Unlock`})]})]}):null,(0,Q.jsxs)(`div`,{className:Z.formSection,children:[(0,Q.jsxs)(`div`,{className:Z.sectionHeader,children:[(0,Q.jsx)(`h3`,{className:Z.subTitle,children:`Identity`}),(0,Q.jsx)(`span`,{className:Z.sectionProvenance,children:n.identity.source===`existing`?`From Kura record`:`Entered at the desk`}),i&&!o?(0,Q.jsxs)(I,{className:Z.sectionAction,onClick:()=>s(!0),size:`sm`,variant:`ghost`,children:[(0,Q.jsx)(h,{size:13,"aria-hidden":!0}),`Unlock fields`]}):null]}),(0,Q.jsxs)(`div`,{className:Z.fieldGrid,children:[(0,Q.jsx)(ka,{field:`name`,label:`Full name (Latin)`,lockedFields:r,onChange:e=>t({name:e,collisionAcked:[]}),placeholder:`As shown on the ID document`,required:!0,value:n.name}),(0,Q.jsx)(R,{label:`Full name (Khmer)`,lang:`km`,onChange:e=>t({nameKhmer:e.target.value}),placeholder:`សុខ ស្រីម៉ៅ`,value:n.nameKhmer}),(0,Q.jsx)(ka,{field:`dob`,label:`Date of birth`,lockedFields:r,onChange:e=>t({dob:e,collisionAcked:[]}),placeholder:`YYYY-MM-DD`,required:!0,value:n.dob}),r.includes(`sexAtBirth`)?(0,Q.jsx)(R,{disabled:!0,label:`Sex at birth`,required:!0,suffix:(0,Q.jsx)(h,{size:14,"aria-hidden":!0}),value:n.sexAtBirth}):(0,Q.jsx)(De,{label:`Sex at birth`,labelVisible:!0,onValueChange:e=>t({sexAtBirth:e,collisionAcked:[]}),options:[{value:`Female`,label:`Female`},{value:`Male`,label:`Male`}],value:n.sexAtBirth}),(0,Q.jsx)(R,{label:`National ID number`,onChange:e=>t({idNumber:e.target.value,collisionAcked:[]}),placeholder:`012345678`,value:n.idNumber})]})]}),(0,Q.jsx)(hn,{onUpdate:t,patient:n}),(0,Q.jsxs)(`div`,{className:Z.disclosures,children:[(0,Q.jsxs)(Ee,{inset:`none`,children:[(0,Q.jsx)(Te,{headingLevel:3,meta:`Optional`,children:`Address`}),(0,Q.jsx)(we,{children:(0,Q.jsxs)(`div`,{className:Z.fieldGrid,children:[(0,Q.jsx)(R,{label:`Province`,onChange:e=>c({province:e.target.value}),placeholder:`Phnom Penh`,value:n.address.province}),(0,Q.jsx)(R,{label:`District`,onChange:e=>c({district:e.target.value}),placeholder:`Chamkarmon`,value:n.address.district}),(0,Q.jsx)(R,{label:`Commune`,onChange:e=>c({commune:e.target.value}),placeholder:`Tonle Bassac`,value:n.address.commune}),(0,Q.jsx)(R,{className:Z.fieldSpanAll,label:`Street / house`,onChange:e=>c({street:e.target.value}),placeholder:`House, street, landmark`,value:n.address.street})]})})]}),(0,Q.jsxs)(Ee,{inset:`none`,children:[(0,Q.jsx)(Te,{headingLevel:3,meta:`Optional`,children:`Refund account`}),(0,Q.jsx)(we,{children:n.refundAccount?(0,Q.jsxs)(`div`,{className:Z.refundRow,children:[(0,Q.jsx)(a,{size:16,"aria-hidden":!0}),(0,Q.jsx)(`span`,{className:Z.refundValue,children:n.refundAccount}),(0,Q.jsx)(L,{size:`sm`,variant:`success`,children:`Bakong KHQR saved`}),(0,Q.jsx)(I,{onClick:()=>t({refundAccount:null}),size:`sm`,variant:`ghost`,children:`Remove`})]}):(0,Q.jsxs)(`div`,{className:Z.refundEmpty,children:[(0,Q.jsx)(`p`,{className:Z.hint,children:`No account saved. Add Bakong KHQR only if this patient may need a refund.`}),(0,Q.jsxs)(I,{onClick:()=>t({refundAccount:`kh-qr://demo-bakong-account`}),size:`sm`,variant:`outline`,children:[(0,Q.jsx)(a,{size:13,"aria-hidden":!0}),`Scan KHQR`]})]})})]})]})]})}function ja({policy:e}){if(e.eligibility?.kind!==`eligible`)return null;let t=e.eligibility,n=[{label:`Member ID`,value:e.memberId??e.policyNumber},{label:`Group`,value:t.group??`—`},{label:`Coverage`,value:`${e.coverageScope===`both`?`In + outpatient`:e.coverageScope===`inpatient`?`Inpatient`:`Outpatient`} · ${t.coveragePct}%`},{label:`Co-pay`,value:(0,Q.jsx)(V,{currency:`USD`,minor:t.copayMinor})},{label:`Active until`,value:t.activeUntil},{label:`Pre-auth`,value:t.preAuth===`required`?`Required`:`Not required`},{label:`Tier`,value:t.tier},{label:`Effective`,value:t.effectiveFrom??`—`}];return(0,Q.jsx)(`dl`,{className:Z.dataPoints,children:n.map(e=>(0,Q.jsxs)(`div`,{className:Z.dataPoint,children:[(0,Q.jsx)(`dt`,{className:Z.dataPointLabel,children:e.label}),(0,Q.jsx)(`dd`,{className:Z.dataPointValue,children:e.value})]},e.label))})}function Ma({onUpdate:e,patient:t}){let[n,r]=(0,$.useState)(!1),[i,a]=(0,$.useState)({provider:Ga[0],policyNumber:``,memberName:t.name,memberId:``,expiry:``,coverageScope:`outpatient`}),[s,c]=(0,$.useState)(!1),[l,u]=(0,$.useState)(null),d=t.insurance.length>0,f=t.insurance.find(e=>e.eligibility?.kind===`eligible`);function p(e){a(t=>({...t,...e}))}function m(){c(!0),u(null),window.setTimeout(()=>{c(!1),u({id:`pol-${i.policyNumber.trim()}`,provider:i.provider,policyNumber:i.policyNumber.trim(),memberName:i.memberName.trim()||t.name,memberId:i.memberId.trim()||void 0,coverageScope:i.coverageScope,expiry:i.expiry.trim()||void 0,eligibility:et(i.policyNumber)})},600)}function h(n){e({insurance:[...t.insurance,n],insuranceAcked:!0}),u(null),r(!1),a(e=>({...e,policyNumber:``,memberId:``,expiry:``}))}return(0,Q.jsxs)(`section`,{"aria-label":`Insurance`,className:Z.step,children:[(0,Q.jsxs)(`div`,{className:Z.stepHeaderRow,children:[(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(`h2`,{className:Z.stepTitle,children:`Insurance`}),(0,Q.jsx)(`p`,{className:Z.stepSubtitle,children:d?`Verify the policy and eligibility before pricing the cart.`:`Add a policy to bill insurance, or continue as direct pay.`})]}),d&&!n?(0,Q.jsx)(I,{onClick:()=>r(!0),size:`sm`,variant:`outline`,children:`Add policy`}):null]}),!d&&!t.insuranceAcked&&!n?(0,Q.jsxs)(z,{className:Z.insuranceEmptyCard,children:[(0,Q.jsx)(`span`,{className:Z.insuranceEmptyIcon,children:(0,Q.jsx)(g,{size:20,"aria-hidden":!0})}),(0,Q.jsx)(`h3`,{className:Z.subTitle,children:`No insurance on file`}),(0,Q.jsx)(`p`,{className:Z.hint,children:`Add a policy now to bill insurance, or continue as direct pay.`}),(0,Q.jsxs)(`div`,{className:Z.insuranceEmptyActions,children:[(0,Q.jsx)(I,{onClick:()=>r(!0),variant:`outline`,children:`Add policy`}),(0,Q.jsx)(I,{onClick:()=>{a(e=>({...e,provider:Ga[0],policyNumber:`FRT-88720011`,memberId:`M-8872001`,expiry:`2027-12`})),r(!0)},variant:`outline`,children:`Scan card`}),(0,Q.jsx)(I,{onClick:()=>e({insuranceAcked:!0}),variant:`primary`,children:`Continue without insurance`})]})]}):null,t.insuranceAcked&&!d&&!n?(0,Q.jsxs)(F,{tone:`neutral`,children:[(0,Q.jsx)(M,{children:`Direct pay`}),(0,Q.jsx)(P,{children:`The patient pays the full amount directly.`}),(0,Q.jsxs)(N,{children:[(0,Q.jsx)(I,{onClick:()=>e({insuranceAcked:!1}),size:`sm`,variant:`ghost`,children:`Undo`}),(0,Q.jsx)(I,{onClick:()=>r(!0),size:`sm`,variant:`outline`,children:`Add policy instead`})]})]}):null,t.insurance.map(n=>(0,Q.jsxs)(z,{className:Z.sectionCard,children:[(0,Q.jsxs)(`div`,{className:Z.policyHeader,children:[(0,Q.jsx)(`span`,{className:Z.insurancePolicyIcon,children:(0,Q.jsx)(g,{size:18,"aria-hidden":!0})}),(0,Q.jsxs)(`div`,{className:Z.policyHeading,children:[(0,Q.jsxs)(`div`,{className:Z.policyTitleRow,children:[(0,Q.jsx)(`span`,{className:Z.policyName,children:n.provider}),(0,Q.jsx)(L,{size:`sm`,variant:n.eligibility?.kind===`eligible`?`success`:`warning`,children:n.eligibility?.kind===`eligible`?`Eligible`:`Unverified`})]}),(0,Q.jsx)(`p`,{className:Z.hint,children:n.eligibility?.kind===`eligible`?n.eligibility.verifiedAtLabel??`Verified`:`Added without a live eligibility check.`})]}),(0,Q.jsxs)(I,{onClick:()=>e({insurance:t.insurance.map(e=>e.id===n.id?{...e,eligibility:et(e.policyNumber)}:e)}),size:`sm`,variant:`ghost`,children:[(0,Q.jsx)(o,{size:12,"aria-hidden":!0}),`Re-verify`]})]}),(0,Q.jsx)(ja,{policy:n})]},n.id)),f?.eligibility?.kind===`eligible`?(0,Q.jsxs)(F,{tone:`success`,children:[(0,Q.jsxs)(M,{children:[(0,Q.jsx)(V,{currency:`USD`,minor:f.eligibility.copayMinor}),` co-pay applies`]}),(0,Q.jsxs)(P,{children:[`Insurance covers `,f.eligibility.coveragePct,`% of eligible in-cart tests. The direct-pay portion is calculated automatically and shown in the order rail.`]})]}):null,n?(0,Q.jsxs)(z,{className:Z.sectionCard,children:[(0,Q.jsx)(`div`,{className:Z.sectionCardHeader,children:(0,Q.jsx)(`h3`,{className:Z.subTitle,children:`New policy`})}),(0,Q.jsxs)(`div`,{className:Z.fieldGrid,children:[(0,Q.jsx)(B,{label:`Provider`,onChange:e=>p({provider:e.target.value}),options:Ga.map(e=>({value:e,label:e})),required:!0,value:i.provider}),(0,Q.jsx)(R,{className:Z.monoField,label:`Policy number`,onChange:e=>p({policyNumber:e.target.value}),placeholder:`FRT-887200119`,required:!0,value:i.policyNumber}),(0,Q.jsx)(R,{label:`Member name`,onChange:e=>p({memberName:e.target.value}),value:i.memberName}),(0,Q.jsx)(R,{className:Z.monoField,label:`Member ID`,onChange:e=>p({memberId:e.target.value}),placeholder:`887200119`,value:i.memberId}),(0,Q.jsx)(R,{label:`Expiry`,onChange:e=>p({expiry:e.target.value}),placeholder:`YYYY-MM`,value:i.expiry}),(0,Q.jsx)(B,{label:`Coverage`,onChange:e=>p({coverageScope:e.target.value}),options:[{value:`outpatient`,label:`Outpatient`},{value:`inpatient`,label:`Inpatient`},{value:`both`,label:`Both`}],value:i.coverageScope})]}),(0,Q.jsxs)(`div`,{className:Z.policyFormActions,children:[(0,Q.jsx)(I,{onClick:()=>{r(!1),u(null),c(!1)},variant:`ghost`,children:`Cancel`}),(0,Q.jsx)(I,{disabled:i.policyNumber.trim()===``||s,onClick:m,variant:`secondary`,children:`Check eligibility`})]})]}):null,s?(0,Q.jsx)(z,{className:Z.sectionCard,"data-tone":`brand`,variant:`outline`,children:(0,Q.jsxs)(`div`,{className:Z.checkingRow,role:`status`,children:[(0,Q.jsx)(b,{size:18,"aria-hidden":!0,className:Z.checkingSpinner}),(0,Q.jsxs)(`div`,{children:[(0,Q.jsxs)(`p`,{className:Z.checkingTitle,children:[`Checking eligibility with `,i.provider,`…`]}),(0,Q.jsx)(`p`,{className:Z.hint,children:`This usually takes a few seconds.`})]})]})}):null,l?(0,Q.jsxs)(F,{tone:l.eligibility?.kind===`eligible`?`success`:l.eligibility?.kind===`unreachable`?`warning`:`danger`,children:[(0,Q.jsx)(M,{children:l.eligibility?.kind===`eligible`?`Eligible — ${l.eligibility.coveragePct}% of eligible services`:l.eligibility?.kind===`unreachable`?`Insurer unreachable`:`Not eligible`}),(0,Q.jsxs)(P,{children:[l.provider,` · `,l.policyNumber,l.eligibility?.kind===`eligible`?(0,Q.jsxs)(Q.Fragment,{children:[` `,`· Tier `,l.eligibility.tier,` · co-pay`,` `,(0,Q.jsx)(V,{currency:`USD`,minor:l.eligibility.copayMinor}),` · active until`,` `,l.eligibility.activeUntil]}):null]}),(0,Q.jsx)(N,{children:l.eligibility?.kind===`ineligible`?(0,Q.jsx)(I,{onClick:()=>u(null),size:`sm`,variant:`outline`,children:`Retry`}):(0,Q.jsx)(I,{onClick:()=>h(l),size:`sm`,variant:`primary`,children:l.eligibility?.kind===`eligible`?`Save policy`:`Add anyway`})})]}):null]})}function Na({guardPaidEdit:e,onUpdate:t,patient:n,prescribers:r}){let i=new Set(n.cart.items.map(e=>e.id)),a=qe(r),o=Nt(n.cart,r),s=Ge(n.cart,H),c=n.cart.items.filter(e=>bt(e,H)!==null),[l,u]=(0,$.useState)(null),[d,f]=(0,$.useState)(null),[p,m]=(0,$.useState)(!1),h=n.cart.items.find(e=>e.id===d)??null;function g(t,n){e(e=>({...e,cart:{...e.cart,items:[...e.cart.items,{id:t.id,kind:t.kind,name:t.name,priceMinor:t.priceMinor,currencyCode:t.currencyCode,qty:1,fasting:t.fasting,consent:bt(t,H)===null?void 0:{state:`needed`},pregnancyScreen:n}]}}))}function _(t){e(e=>({...e,cart:{...e.cart,items:e.cart.items.filter(e=>e.id!==t)}}))}function v(e,t){if(!t){_(e.id);return}if(Ze(e,n)){u(e);return}g(e)}function y(e,r){t({cart:{...n.cart,items:n.cart.items.map(t=>t.id===e?{...t,consent:r}:t)}})}return(0,Q.jsxs)(`section`,{"aria-label":`Orders`,className:Z.step,children:[(0,Q.jsxs)(`div`,{className:Z.stepHeader,children:[(0,Q.jsx)(`h2`,{className:Z.stepTitle,children:`Add orders`}),(0,Q.jsxs)(pe,{onOpenChange:m,open:p,children:[(0,Q.jsx)(me,{render:(0,Q.jsx)(I,{size:`sm`,variant:`outline`,children:`Additional order types`})}),(0,Q.jsx)(he,{"aria-label":`Choose an additional order type`,className:Z.additionalOrdersPopover,initialFocus:!1,role:`dialog`,children:(0,Q.jsx)(`ul`,{className:Z.additionalOrderList,children:Rt.map(e=>(0,Q.jsxs)(`li`,{className:Z.additionalOrderRow,children:[(0,Q.jsx)(ce,{"aria-label":e.name,checked:i.has(e.id),onCheckedChange:t=>{v(e,t),m(!1)},children:(0,Q.jsxs)(`span`,{className:Z.lineTextWide,children:[(0,Q.jsx)(`span`,{className:Z.lineName,children:e.name}),(0,Q.jsxs)(`span`,{className:Z.lineMeta,children:[e.category,e.fasting?` · Fasting`:``]})]})}),(0,Q.jsx)(V,{className:Z.additionalOrderPrice,currency:e.currencyCode,minor:e.priceMinor})]},e.id))})})]})]}),n.cart.items.length>0?o?.kind===`no-eligible-prescriber`?(0,Q.jsxs)(F,{tone:`danger`,children:[(0,Q.jsx)(M,{children:`No clinician can be attributed`}),(0,Q.jsx)(P,{children:`No clinician in this workspace has a live licence. The order cannot be placed until an eligible clinician is available.`})]}):(0,Q.jsx)(`div`,{className:Z.attribution,children:(0,Q.jsx)(B,{label:`Ordering clinician`,helpText:`Placed by the desk on behalf of this clinician. Only a live licence can be attributed.`,error:o?.kind===`prescriber-ineligible`?`${o.prescriber.name} does not have a live licence — choose another clinician.`:void 0,onValueChange:e=>t({cart:{...n.cart,attributedPrescriberId:e}}),options:r.map(e=>({value:e.userId,label:e.licence===`verified`?`${e.name} · ${e.specialty??`Clinician`}`:`${e.name} · licence not live`,disabled:!a.some(t=>t.userId===e.userId)})),placeholder:`Choose the ordering clinician`,value:n.cart.attributedPrescriberId??``})}):null,s.length>0?(0,Q.jsxs)(F,{tone:`warning`,children:[(0,Q.jsx)(M,{children:s.length===1?`Resolve 1 order blocker`:`Resolve ${s.length} order blockers`}),(0,Q.jsx)(P,{children:(0,Q.jsx)(`ul`,{className:Z.blockerList,children:s.map(e=>(0,Q.jsx)(`li`,{children:Ve(e)},`${e.kind}-${`itemName`in e?e.itemName:`currency`}`))})})]}):null,c.length>0?(0,Q.jsxs)(`div`,{className:Z.consentPanel,children:[(0,Q.jsx)(`h3`,{className:Z.subTitle,children:`Consent`}),(0,Q.jsx)(`ul`,{className:Z.consentList,children:c.map(e=>{let t=bt(e,H),n=e.consent?.state??`needed`;return(0,Q.jsxs)(`li`,{className:Z.consentRow,children:[(0,Q.jsxs)(`div`,{className:Z.lineTextWide,children:[(0,Q.jsx)(`span`,{className:Z.lineName,children:e.name}),(0,Q.jsxs)(`span`,{className:Z.lineMeta,children:[t===`imaging`?`Imaging consent before the scan`:`Sensitive test — explicit consent required`,e.consent?.state===`verbal`?` · Verbal · ${e.consent.byLabel} · ${e.consent.atLabel}`:null,e.pregnancyScreen?.overrideBy?` · Clinician override · ${e.pregnancyScreen.overrideBy}`:null]})]}),n===`needed`?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(L,{variant:`warning`,children:`Consent needed`}),(0,Q.jsx)(I,{onClick:()=>y(e.id,{state:`sent`,atLabel:`just now`}),size:`sm`,variant:`secondary`,children:`Send sign-off`}),(0,Q.jsx)(I,{onClick:()=>f(e.id),size:`sm`,variant:`outline`,children:`Verbal consent`})]}):null,n===`sent`?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(L,{variant:`info`,children:`Sent · awaiting signature`}),(0,Q.jsx)(I,{onClick:()=>y(e.id,{state:`signed`,atLabel:`just now`}),size:`sm`,variant:`outline`,children:`Simulate patient signature`}),(0,Q.jsx)(I,{onClick:()=>f(e.id),size:`sm`,variant:`ghost`,children:`Verbal consent`})]}):null,n===`signed`?(0,Q.jsx)(L,{variant:`success`,children:`Signed on phone`}):null,n===`verbal`?(0,Q.jsx)(L,{variant:`success`,children:`Verbal · recorded`}):null]},e.id)})})]}):null,(0,Q.jsx)(La,{entry:l,onCancel:()=>u(null),onProceed:e=>{l&&g(l,e),u(null)}}),(0,Q.jsx)(za,{item:h,requirement:h?bt(h,H):null,onCancel:()=>f(null),onRecord:e=>{h&&y(h.id,e),f(null)}}),(0,Q.jsx)(Fe,{categories:at,onSelectedTestIdsChange:(e,t)=>{let n=It(t.test.testCatalogId);n&&v(n,t.checked)},selectedTestIds:Pt.flatMap(e=>{let t=It(e.testCatalogId);return t&&i.has(t.id)?[e.testCatalogId]:[]}),tests:Pt,totalCount:67})]})}function Pa({onUpdate:e,patient:t}){let n=Qe(t.intake,t.visitReason,t.cart.items,t.sexAtBirth),r=n.filter(e=>e.filled).length,i=t.cart.items.some(e=>e.kind===`telecon`),a=t.otpVerified||t.telegramVerified,[o,s]=(0,$.useState)(null),[c,l]=(0,$.useState)(``),u=zt(t,t.cart.items),[d,f]=(0,$.useState)(!1),[p,m]=(0,$.useState)(`patient-declined`),[h,g]=(0,$.useState)(``),[_,y]=(0,$.useState)(!1),b=He(t.cart.items,H),S=vt(b),C=ot(t.cart.items),[w,T]=(0,$.useState)(Math.min(S,Ka.length-1)),[E,D]=(0,$.useState)(null),O=w<S;function k(n,r){e({teleconsult:{status:`booked`,slot:`${Ka[w]} · ${n}`,specialty:t.teleconsult.specialty??C,earlyOverride:r||void 0}}),D(null),y(!1)}function ee(n,r){e({intake:{...t.intake,[n]:r},intakeAuthors:{...t.intakeAuthors,[n]:`nurse`}})}return(0,Q.jsxs)(`section`,{"aria-label":`Pre-consult`,className:Z.step,children:[(0,Q.jsxs)(`div`,{className:Z.intakeHeader,children:[(0,Q.jsxs)(`div`,{className:Z.intakeHeaderText,children:[(0,Q.jsx)(`h2`,{className:Z.stepTitle,children:`Intake`}),(0,Q.jsx)(`p`,{className:Z.hint,children:`${r} of ${n.length} answered${u===`complete`?``:` · check-in is not blocked`}`})]}),t.intakeSkipped||t.intakeSentAtLabel?null:(0,Q.jsxs)(`div`,{className:Z.intakeHeaderActions,children:[(0,Q.jsxs)(`div`,{className:Z.intakeHeaderButtons,children:[(0,Q.jsx)(I,{disabled:!a,onClick:()=>e({intakeSentAtLabel:`just now`}),size:`sm`,variant:`secondary`,children:`Send link`}),!d&&u!==`complete`?(0,Q.jsx)(I,{onClick:()=>f(!0),size:`sm`,variant:`ghost`,children:`Skip`}):null]}),a?null:(0,Q.jsx)(`p`,{className:Z.intakeHeaderReason,children:`Verify a phone or Telegram in Step 2.`})]})]}),t.intakeSkipped?(0,Q.jsxs)(F,{tone:`warning`,children:[(0,Q.jsxs)(M,{children:[`Intake skipped ·`,` `,Gt.find(e=>e.code===t.intakeSkipped?.code)?.label??t.intakeSkipped.code]}),(0,Q.jsxs)(P,{children:[t.intakeSkipped.note?`${t.intakeSkipped.note} — answers`:`Answers`,` `,`can still arrive from the patient link later.`]}),(0,Q.jsx)(N,{children:(0,Q.jsx)(I,{onClick:()=>e({intakeSkipped:null}),size:`sm`,variant:`outline`,children:`Resume intake`})})]}):t.intakeSentAtLabel?(0,Q.jsxs)(F,{tone:`info`,children:[(0,Q.jsxs)(M,{children:[`Intake link sent · `,t.intakeSentAtLabel]}),(0,Q.jsx)(P,{children:`The patient completes it on their phone; answers land here as they arrive.`}),(0,Q.jsx)(N,{children:(0,Q.jsx)(I,{onClick:()=>e({intakeSentAtLabel:`just now`}),size:`sm`,variant:`outline`,children:`Resend link`})})]}):null,d&&!t.intakeSkipped?(0,Q.jsxs)(`div`,{className:Z.inlineForm,children:[(0,Q.jsx)(B,{label:`Why is the intake skipped?`,onChange:e=>m(e.target.value),options:Gt.map(e=>({value:e.code,label:e.label})),value:p}),p===`other`?(0,Q.jsx)(R,{"aria-label":`Skip reason note`,onChange:e=>g(e.target.value),placeholder:`What happened`,value:h}):null,(0,Q.jsx)(I,{disabled:p===`other`&&h.trim()===``,onClick:()=>{e({intakeSkipped:{code:p,note:p===`other`?h.trim():void 0}}),f(!1)},size:`sm`,variant:`secondary`,children:`Record skip`}),(0,Q.jsx)(I,{onClick:()=>f(!1),size:`sm`,variant:`ghost`,children:`Cancel`})]}):null,(0,Q.jsx)(`ul`,{className:Z.intakeList,children:n.map(e=>{let n=t.intakeAuthors?.[e.fieldKey],r=n===`nurse`?`desk`:n===`patient`?`patient`:n?`auto`:null,i=[e.preview,r?`recorded by ${r}`:null].filter(Boolean).join(` · `);return o===e.fieldKey?(0,Q.jsxs)(`li`,{className:Z.inlineForm,children:[(0,Q.jsx)(R,{"aria-label":`${e.label} — what the patient tells the desk`,onChange:e=>l(e.target.value),placeholder:e.label,value:c}),(0,Q.jsx)(I,{disabled:c.trim()===``,onClick:()=>{ee(e.fieldKey,c.trim()),s(null)},size:`sm`,variant:`secondary`,children:`Save`}),(0,Q.jsx)(I,{onClick:()=>s(null),size:`sm`,variant:`ghost`,children:`Cancel`})]},e.key):(0,Q.jsx)(`li`,{children:(0,Q.jsxs)(`button`,{className:Z.intakeRow,"data-filled":e.filled||void 0,onClick:()=>{s(e.fieldKey),l(t.intake[e.fieldKey])},type:`button`,children:[(0,Q.jsx)(`span`,{"aria-hidden":!0,className:Z.intakeMark,children:e.filled?(0,Q.jsx)(x,{size:12}):null}),(0,Q.jsxs)(`span`,{className:Z.lineTextWide,children:[(0,Q.jsx)(`span`,{className:Z.lineName,children:e.label}),i?(0,Q.jsx)(`span`,{className:Z.lineMeta,children:i}):null]}),(0,Q.jsx)(`span`,{className:Z.srOnly,children:e.filled?`Answered`:`Not answered`}),(0,Q.jsx)(`span`,{className:Z.intakeRowAction,children:e.filled?`Edit`:`Add`})]})},e.key)})}),i||t.teleconsult.status===`waived`?(0,Q.jsxs)(`div`,{className:Z.channel,children:[(0,Q.jsx)(`h3`,{className:Z.subTitle,children:`Teleconsultation`}),t.teleconsult.status===`booked`&&!_?(0,Q.jsxs)(F,{tone:`success`,children:[(0,Q.jsxs)(M,{children:[`Booked · `,t.teleconsult.slot,` · `,t.teleconsult.specialty,t.teleconsult.earlyOverride?` · before results`:``]}),(0,Q.jsxs)(N,{children:[(0,Q.jsx)(I,{onClick:()=>y(!0),size:`sm`,variant:`outline`,children:`Change time`}),(0,Q.jsx)(I,{onClick:()=>e({teleconsult:{status:`notBooked`}}),size:`sm`,variant:`ghost`,children:`Remove booking`})]})]}):t.teleconsult.status===`waived`?(0,Q.jsx)(F,{tone:`neutral`,children:(0,Q.jsx)(M,{children:`Skipped — results go out without a consult`})}):(0,Q.jsxs)(Q.Fragment,{children:[_?(0,Q.jsxs)(F,{tone:`info`,children:[(0,Q.jsxs)(M,{children:[`Rebooking — currently `,t.teleconsult.slot]}),(0,Q.jsx)(P,{children:`Picking a new time replaces the current booking.`}),(0,Q.jsx)(N,{children:(0,Q.jsx)(I,{onClick:()=>y(!1),size:`sm`,variant:`outline`,children:`Keep current time`})})]}):null,(0,Q.jsx)(`p`,{className:Z.hint,children:b>0?`Estimated results in ~${b}h — the first post-result day is preselected.`:`No TAT-bound tests in cart — book any slot.`}),(0,Q.jsx)(`div`,{className:Z.slotRow,role:`group`,"aria-label":`Consult day`,children:Ka.map((e,t)=>(0,Q.jsxs)(I,{"aria-pressed":t===w,onClick:()=>{T(t),D(null)},size:`sm`,variant:t===w?`secondary`:`ghost`,children:[e,t<S?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(v,{"aria-hidden":!0,className:Z.dayWarnIcon,size:12}),(0,Q.jsx)(`span`,{className:Z.srOnly,children:`results may not be ready`})]}):null]},e))}),O?(0,Q.jsx)(`p`,{className:Z.hint,children:`Results may not be ready on this day.`}):null,(0,Q.jsxs)(`div`,{className:Z.slotRow,children:[qa.map(e=>(0,Q.jsx)(I,{onClick:()=>O?D(e):k(e,!1),size:`sm`,variant:`outline`,children:e},e)),(0,Q.jsx)(I,{onClick:()=>{e({teleconsult:{status:`waived`},cart:{...t.cart,items:t.cart.items.filter(e=>e.kind!==`telecon`)}})},size:`sm`,variant:`ghost`,children:`Skip consult`})]}),E?(0,Q.jsxs)(F,{tone:`warning`,children:[(0,Q.jsx)(M,{children:`Results may not be ready for this slot`}),(0,Q.jsxs)(P,{children:[`Booking `,Ka[w],` · `,E,` lands before the estimated turnaround. The consult may happen without results.`]}),(0,Q.jsxs)(N,{children:[(0,Q.jsx)(I,{onClick:()=>D(null),size:`sm`,variant:`outline`,children:`Pick another slot`}),(0,Q.jsx)(I,{onClick:()=>k(E,!0),size:`sm`,variant:`primary`,children:`Book anyway`})]})]}):null,(0,Q.jsxs)(`p`,{className:Z.hint,children:[`Specialty `,t.teleconsult.specialty??C,` · matched from the ordered tests. Slots follow estimated result availability; the patient is notified if the lab is delayed.`]})]})]}):null]})}function Fa({fxRate:e,onUpdate:t,patient:n,prescribers:r,pricingStatus:i=`ready`}){let a=Le(n.cart),o=nt(n.cart,a),s=n.cart.payment,[c,l]=(0,$.useState)(``),[u,d]=(0,$.useState)(``),[f,p]=(0,$.useState)(``),[m,h]=(0,$.useState)(null),g=xt(u),_=n.cart.items.length>0&&o===`0`,v=Nt(n.cart,r),y=n.cart.pricing?.state===`stale`,b=Ge(n.cart,H),x=Ye(n.cart,H),S=n.insurance.find(e=>e.eligibility?.kind===`eligible`),C=i!==`ready`,w=v!==null||y||C||b.length>0||x.length>0,T=Ie(n.cart);function E(){let e=ht(f);if(!e){h(`Code not recognised.`);return}if((n.cart.promos??[]).some(t=>t.code===e.code)){h(`Code already applied.`);return}if(e.kind===`item`&&!n.cart.items.some(t=>t.id===e.itemId)){h(`${e.code} applies to an item that is not in this order.`);return}t({cart:{...n.cart,promos:[...n.cart.promos??[],e]}}),p(``),h(null)}function D(e){t({cart:{...n.cart,promos:(n.cart.promos??[]).filter(t=>t.code!==e)}})}function O(e){t({cart:{...n.cart,payment:e}})}if(s.status===`confirmed`)return(0,Q.jsxs)(`section`,{"aria-label":`Payment`,className:Z.step,children:[(0,Q.jsx)(`h2`,{className:Z.stepTitle,children:`Payment`}),(0,Q.jsxs)(F,{tone:`success`,children:[(0,Q.jsxs)(M,{children:[`Paid · `,s.receiptId]}),(0,Q.jsxs)(P,{children:[(0,Q.jsx)(V,{currency:`USD`,minor:s.amountMinor}),` ·`,` `,s.method===`cash`?(0,Q.jsxs)(Q.Fragment,{children:[`cash — change`,` `,(0,Q.jsx)(V,{currency:`USD`,minor:s.changeMinor})]}):s.method===`khqr`?`KHQR (Bakong)`:`cash + KHQR`,` `,`· `,s.confirmedAt,` · `,s.cashier]})]}),(0,Q.jsx)(Wt,{branchLabel:`Branch ${St.toUpperCase()}`,items:n.cart.items,onPrint:()=>{},patientName:n.name||`Walk-in patient`,payment:s}),(0,Q.jsx)(`p`,{className:Z.hint,children:`The amount is derived by the server from the priced order, never entered by the desk.`})]});if(s.status===`no-charge`)return(0,Q.jsxs)(`section`,{"aria-label":`Payment`,className:Z.step,children:[(0,Q.jsx)(`h2`,{className:Z.stepTitle,children:`Payment`}),(0,Q.jsxs)(F,{tone:`success`,children:[(0,Q.jsx)(M,{children:`No payment required`}),(0,Q.jsx)(P,{children:`The server-priced order has a zero balance. No cash capture or payment receipt was created.`})]})]});let k=xt(c),ee=k!==null&&o!==`0`&&ut(k,o)>=0,A=e?pt(o,e):null;return(0,Q.jsxs)(`section`,{"aria-label":`Payment`,className:Z.step,children:[(0,Q.jsx)(`h2`,{className:Z.stepTitle,children:`Payment`}),w?(0,Q.jsxs)(F,{tone:`warning`,children:[(0,Q.jsx)(M,{children:`Resolve blockers before collecting payment`}),(0,Q.jsx)(P,{children:v?.kind===`no-eligible-prescriber`?`No licensed clinician can be attributed to this order.`:v?`Choose the ordering clinician on the Orders step.`:y?`Prices changed since this quote — accept the new total in the order cart first.`:C?i===`loading`?`The server price is still loading — do not collect payment yet.`:`The order total could not be refreshed — retry pricing in the order cart before collecting.`:b.length>0?Ve(b[0]):x.length>0?`${x[0].name} still needs consent — resolve it on the Orders step.`:``})]}):null,T.length>0?(0,Q.jsxs)(`dl`,{className:Z.dueBreakdown,children:[(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(`dt`,{children:`Subtotal`}),(0,Q.jsx)(`dd`,{children:(0,Q.jsx)(V,{currency:`USD`,minor:a.subtotalMinor})})]}),T.map(e=>(0,Q.jsxs)(`div`,{children:[(0,Q.jsxs)(`dt`,{children:[e.label,` · `,e.code]}),(0,Q.jsxs)(`dd`,{className:Z.discount,children:[`−`,(0,Q.jsx)(V,{currency:`USD`,minor:e.amountMinor}),s.status===`idle`?(0,Q.jsx)(I,{"aria-label":`Remove promo ${e.code}`,onClick:()=>D(e.code),size:`sm`,variant:`ghost`,children:`Remove`}):null]})]},e.code))]}):null,(0,Q.jsxs)(`p`,{className:Z.due,children:[`Patient due`,` `,(0,Q.jsx)(V,{as:`strong`,currency:`USD`,minor:o}),A?(0,Q.jsx)(V,{className:Z.khr,currency:`KHR`,minor:A}):null]}),_?(0,Q.jsxs)(F,{tone:`neutral`,children:[(0,Q.jsx)(M,{children:`Nothing to collect`}),(0,Q.jsx)(P,{children:`The server-priced order has a zero balance.`}),(0,Q.jsx)(N,{children:(0,Q.jsx)(I,{onClick:()=>O({...s,status:`no-charge`,method:null,amountMinor:`0`,changeMinor:`0`}),size:`sm`,variant:`primary`,children:`Continue without payment`})})]}):s.status===`waiting`?(0,Q.jsx)(Va,{amountKhrMinor:A,amountUsdMinor:o,onCancel:()=>O({...s,status:`idle`,method:null,khqrState:void 0}),onConfirm:()=>O(Re(s,`khqr`,o,{receiptId:lt,confirmedAt:_t,cashier:Dt})),onStateChange:e=>O({...s,khqrState:e}),state:s.khqrState??`waiting`}):s.status===`split-cash`?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(F,{tone:`success`,children:[(0,Q.jsxs)(M,{children:[`Cash collected ·`,` `,(0,Q.jsx)(V,{currency:`USD`,minor:s.cashPortionMinor??`0`})]}),(0,Q.jsx)(P,{children:`KHQR covers the remainder. The split completes only when Bakong confirms.`})]}),(0,Q.jsx)(Va,{amountKhrMinor:e?pt(Ot(o,s.cashPortionMinor??`0`),e):null,amountUsdMinor:Ot(o,s.cashPortionMinor??`0`),onCancel:()=>O({...s,status:`idle`,method:null,cashPortionMinor:void 0,khqrState:void 0}),onConfirm:()=>O(Re(s,`split`,o,{receiptId:lt,confirmedAt:_t,cashier:Dt})),onStateChange:e=>O({...s,khqrState:e}),state:s.khqrState??`waiting`})]}):(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(`div`,{className:Z.promoRow,children:[(0,Q.jsx)(R,{"aria-label":`Promo code`,label:`Promo code`,onChange:e=>{p(e.target.value),h(null)},placeholder:`e.g. WELCOME10`,value:f,variant:`surface`,error:m??void 0}),(0,Q.jsx)(I,{disabled:f.trim()===``,onClick:E,variant:`outline`,children:`Apply`})]}),T.length>0?(0,Q.jsx)(`p`,{className:Z.hint,children:`Promo discounts are desk-side only — the platform prices the order without promos.`}):null,(0,Q.jsxs)(`div`,{className:Z.payGrid,children:[(0,Q.jsxs)(z,{as:`section`,size:`sm`,children:[(0,Q.jsx)(ke,{children:(0,Q.jsx)(Oe,{children:`Cash`})}),(0,Q.jsxs)(Ae,{className:Z.payBody,children:[(0,Q.jsx)(R,{inputMode:`decimal`,label:`Tendered (USD)`,onChange:e=>l(e.target.value),placeholder:`0.00`,value:c,variant:`surface`}),ee?(0,Q.jsxs)(`p`,{className:Z.hint,children:[`Change`,` `,(0,Q.jsx)(V,{currency:`USD`,minor:gt(k,o)})]}):null,(0,Q.jsx)(I,{className:Z.inlineAction,disabled:!ee||w,onClick:()=>O(Re(s,`cash`,o,{receiptId:lt,confirmedAt:_t,cashier:Dt,tenderedMinor:k??`0`})),variant:`primary`,children:`Confirm cash`})]})]}),(0,Q.jsxs)(z,{as:`section`,size:`sm`,children:[(0,Q.jsx)(ke,{children:(0,Q.jsx)(Oe,{children:`KHQR (Bakong)`})}),(0,Q.jsxs)(Ae,{className:Z.payBody,children:[(0,Q.jsx)(`p`,{className:Z.hint,children:A?(0,Q.jsxs)(Q.Fragment,{children:[`Generates a QR for`,` `,(0,Q.jsx)(V,{currency:`KHR`,minor:A}),`.`]}):`KHR is unavailable until the live FX rate loads.`}),(0,Q.jsx)(I,{className:Z.inlineAction,disabled:o===`0`||!A||w,onClick:()=>O({...s,status:`waiting`,method:`khqr`}),variant:`secondary`,children:`Generate QR`})]})]})]}),(0,Q.jsxs)(z,{as:`section`,size:`sm`,children:[(0,Q.jsx)(ke,{children:(0,Q.jsx)(Oe,{children:`Cash + KHQR split`})}),(0,Q.jsxs)(Ae,{className:Z.payBody,children:[(0,Q.jsx)(`p`,{className:Z.hint,children:A?`Collect part in cash first; a KHQR intent covers the remainder. The split completes only when Bakong confirms.`:`Unavailable until the live FX rate loads — the KHQR remainder needs a KHR amount.`}),(0,Q.jsxs)(`div`,{className:Z.phoneRow,children:[(0,Q.jsx)(R,{inputMode:`decimal`,label:`Cash portion (USD)`,onChange:e=>d(e.target.value),placeholder:`0.00`,value:u,variant:`surface`}),(0,Q.jsx)(I,{disabled:w||!A||g===null||!Ct(g,o),onClick:()=>O({...s,status:`split-cash`,method:`split`,cashPortionMinor:g??`0`,khqrState:`waiting`}),variant:`secondary`,children:`Collect cash · show QR`})]}),g!==null&&Ct(g,o)?(0,Q.jsxs)(`p`,{className:Z.hint,children:[`KHQR remainder`,` `,(0,Q.jsx)(V,{currency:`USD`,minor:Ot(o,g)})]}):null]})]}),(0,Q.jsxs)(`div`,{className:Z.payFooter,children:[S?(0,Q.jsx)(I,{onClick:()=>O({...s,status:`pending-claim`,method:null}),variant:`ghost`,children:`Route to insurer claim`}):null,(0,Q.jsx)(I,{onClick:()=>O({...s,status:`deferred`,method:null}),variant:`ghost`,children:`Pay later`})]})]}),s.status===`pending-claim`?(0,Q.jsxs)(F,{tone:`warning`,children:[(0,Q.jsxs)(M,{children:[`Insurance claim pending`,S?` · ${S.provider}`:``]}),(0,Q.jsx)(P,{children:`The balance routes to the insurer; collect only the copay at the desk. PROTOTYPE: the platform captures cash only — no claim is actually filed.`}),(0,Q.jsx)(N,{children:(0,Q.jsx)(I,{onClick:()=>O({...s,status:`idle`}),size:`sm`,variant:`ghost`,children:`Undo`})})]}):null,s.status===`deferred`?(0,Q.jsxs)(F,{tone:`warning`,children:[(0,Q.jsx)(M,{children:`Pay later`}),(0,Q.jsx)(P,{children:`The balance stays open on the visit. Check-in can proceed.`}),(0,Q.jsx)(N,{children:(0,Q.jsx)(I,{onClick:()=>O({...s,status:`idle`}),size:`sm`,variant:`ghost`,children:`Undo`})})]}):null]})}function Ia({onCancel:e,onResolve:t,open:n,receiptId:r}){let[i,a]=(0,$.useState)(``);return(0,Q.jsx)(ie,{onOpenChange:t=>t?void 0:e(),open:n,children:(0,Q.jsxs)(oe,{children:[(0,Q.jsxs)(te,{children:[(0,Q.jsx)(T,{children:`This order is already paid`}),(0,Q.jsxs)(O,{children:[`Receipt `,r,` covers the current items. Changing the order needs one of two paths — receipts are never silently rewritten. Voiding takes a supervisor PIN and is logged.`]})]}),(0,Q.jsx)(R,{"aria-label":`Supervisor PIN for void`,inputMode:`numeric`,onChange:e=>a(e.target.value),placeholder:`Supervisor PIN — required to void`,type:`password`,value:i}),(0,Q.jsxs)(D,{children:[(0,Q.jsx)(j,{onClick:e,children:`Cancel`}),(0,Q.jsx)(E,{disabled:!ze(i),onClick:()=>t(`void`),variant:`destructive`,children:`Void & recollect`}),(0,Q.jsx)(E,{onClick:()=>t(`supplemental`),variant:`primary`,children:`Collect difference`})]})]})})}function La({entry:e,onCancel:t,onProceed:n}){return(0,Q.jsx)(ie,{onOpenChange:e=>e?void 0:t(),open:e!==null,children:(0,Q.jsx)(oe,{children:e?(0,Q.jsx)(Ra,{entry:e,onCancel:t,onProceed:n},e.id):null})})}function Ra({entry:e,onCancel:t,onProceed:n}){let[r,i]=(0,$.useState)(null),[a,o]=(0,$.useState)(``);return r===null?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(te,{children:[(0,Q.jsxs)(T,{children:[`Pregnancy check — `,e.name]}),(0,Q.jsx)(O,{children:`Could the patient be pregnant? Imaging during early pregnancy may pose risk to the fetus.`})]}),(0,Q.jsxs)(D,{children:[(0,Q.jsx)(j,{onClick:t,children:`Cancel order`}),(0,Q.jsx)(I,{onClick:()=>i(`declined`),variant:`outline`,children:`Declined to answer`}),(0,Q.jsx)(I,{onClick:()=>i(`possibly`),variant:`outline`,children:`Possibly pregnant`}),(0,Q.jsx)(E,{onClick:()=>n({answer:`not-pregnant`}),variant:`primary`,children:`Not pregnant — add order`})]})]}):(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(te,{children:[(0,Q.jsx)(T,{children:`Clinician override required`}),(0,Q.jsx)(O,{children:`Consider postponing, shielding, or non-ionising imaging. To proceed, the ordering clinician signs this override — it is recorded against this visit only.`})]}),(0,Q.jsx)(R,{"aria-label":`Clinician override · sign-off name`,onChange:e=>o(e.target.value),placeholder:`Dr. …`,value:a}),(0,Q.jsxs)(D,{children:[(0,Q.jsx)(j,{onClick:t,children:`Cancel order`}),(0,Q.jsx)(E,{disabled:a.trim()===``,onClick:()=>n({answer:r,overrideBy:a.trim()}),variant:`primary`,children:`Record & add`})]})]})}function za({item:e,onCancel:t,onRecord:n,requirement:r}){return(0,Q.jsx)(ie,{onOpenChange:e=>e?void 0:t(),open:e!==null,children:(0,Q.jsx)(oe,{children:e&&r?(0,Q.jsx)(Ba,{item:e,onCancel:t,onRecord:n,requirement:r},e.id):null})})}function Ba({item:e,onCancel:t,onRecord:n,requirement:r}){let[i,a]=(0,$.useState)(``),[o,s]=(0,$.useState)(``),c=kt({requirement:r,recordedBy:i,witnessPin:o});return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(te,{children:[(0,Q.jsxs)(T,{children:[`Verbal consent — `,e.name]}),(0,Q.jsxs)(O,{children:[`Use only when the patient has no phone or refuses the digital consent flow. Recorded with time and staff name`,r===`sensitive`?`; sensitive tests also need a supervisor witness`:``,`.`]})]}),(0,Q.jsxs)(`div`,{className:Z.verbalFields,children:[(0,Q.jsx)(R,{"aria-label":`Recorded by`,onChange:e=>a(e.target.value),placeholder:`Recorded by (staff name)`,value:i}),r===`sensitive`?(0,Q.jsx)(R,{"aria-label":`Supervisor witness PIN`,inputMode:`numeric`,onChange:e=>s(e.target.value),placeholder:`Supervisor witness PIN`,type:`password`,value:o}):null]}),(0,Q.jsxs)(D,{children:[(0,Q.jsx)(j,{onClick:t,children:`Cancel`}),(0,Q.jsx)(E,{disabled:!c,onClick:()=>n({state:`verbal`,byLabel:i.trim(),atLabel:`just now`,witnessed:r===`sensitive`||void 0}),variant:`primary`,children:`Record consent`})]})]})}function Va({amountKhrMinor:e,amountUsdMinor:t,onCancel:n,onConfirm:r,onStateChange:i,state:a}){let[o,s]=(0,$.useState)(!1);return a===`expired`?(0,Q.jsxs)(F,{tone:`warning`,children:[(0,Q.jsx)(M,{children:`QR expired`}),(0,Q.jsx)(P,{children:`The KHQR intent lapsed before payment. Generate a new QR to retry — an expired intent is never collectable.`}),(0,Q.jsxs)(N,{children:[(0,Q.jsx)(I,{onClick:()=>i(`waiting`),size:`sm`,variant:`primary`,children:`Regenerate QR`}),(0,Q.jsx)(I,{onClick:n,size:`sm`,variant:`ghost`,children:`Back to methods`})]})]}):a===`cancelled`?(0,Q.jsxs)(F,{tone:`neutral`,children:[(0,Q.jsx)(M,{children:`QR cancelled`}),(0,Q.jsxs)(N,{children:[(0,Q.jsx)(I,{onClick:()=>i(`waiting`),size:`sm`,variant:`outline`,children:`Generate new QR`}),(0,Q.jsx)(I,{onClick:n,size:`sm`,variant:`ghost`,children:`Back to methods`})]})]}):(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(F,{tone:`info`,children:[(0,Q.jsxs)(M,{children:[`KHQR waiting for Bakong ·`,` `,(0,Q.jsx)(V,{currency:`USD`,minor:t}),e?(0,Q.jsxs)(Q.Fragment,{children:[` `,`(`,(0,Q.jsx)(V,{currency:`KHR`,minor:e}),`)`]}):null]}),(0,Q.jsx)(P,{children:`The QR is on the patient display. Confirmation arrives from the Bakong webhook; the intent expires after 10 minutes.`}),(0,Q.jsxs)(N,{children:[(0,Q.jsx)(I,{onClick:r,size:`sm`,variant:`primary`,children:`Simulate webhook confirm`}),(0,Q.jsx)(I,{onClick:()=>s(!0),size:`sm`,variant:`outline`,children:`Mark received`}),(0,Q.jsx)(I,{onClick:()=>i(`expired`),size:`sm`,variant:`ghost`,children:`Simulate expiry`}),(0,Q.jsx)(I,{onClick:()=>i(`cancelled`),size:`sm`,variant:`ghost`,children:`Cancel QR`})]})]}),(0,Q.jsx)(ie,{onOpenChange:e=>e?void 0:s(!1),open:o,children:(0,Q.jsxs)(oe,{children:[(0,Q.jsxs)(te,{children:[(0,Q.jsxs)(T,{children:[`Confirm manual receipt of`,` `,(0,Q.jsx)(V,{currency:`USD`,minor:t}),`?`]}),(0,Q.jsx)(O,{children:`Manual fallback only — confirm after seeing the Bakong receipt on the patient's banking app. A client-side success screen is not enough.`})]}),(0,Q.jsxs)(D,{children:[(0,Q.jsx)(j,{onClick:()=>s(!1),children:`Back`}),(0,Q.jsx)(E,{onClick:()=>{s(!1),r()},variant:`primary`,children:`Yes, mark received`})]})]})})]})}var Q,$,Ha,Ua,Wa,Ga,Ka,qa,Ja=t((()=>{Q=r(),$=e(n()),ue(),Bt(),Pe(),Vt(),vn(),ct(),Ut(),mt(),kn(),Cr(),Ke(),Et(),qt(),xa(),Ha=[{id:1,title:`Identity`},{id:2,title:`Review`},{id:3,title:`Insurance`},{id:4,title:`Orders`},{id:5,title:`Pre-consult`},{id:6,title:`Payment`}],Ua={1:`Select a patient or create a new record to continue.`,2:`Date of birth, sex, and a contact channel are required.`,3:`Attach a policy or choose self-pay to continue.`,4:`Add at least one order to continue.`,5:`Resolve the teleconsult booking to continue.`},Wa=jt,Ga=[`Forte Insurance`,`Cigna`,`Bupa`],Ka=[`Today`,`Tomorrow`,`Wed 23 Jul`,`Thu 24 Jul`],qa=[`09:30`,`11:00`,`14:00`,`16:00`],Sa.__docgenInfo={description:`Six-step check-in wizard. The gate engine decides progress; steps never
bypass it. Editing a paid cart routes through the void/supplemental choice.`,methods:[],displayName:`CheckInWizard`,props:{patient:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`chiefComplaint`,value:{name:`string`,required:!0}},{key:`preTestPrep`,value:{name:`string`,required:!0}},{key:`medications`,value:{name:`string`,required:!0}},{key:`womensHealth`,value:{name:`string`,required:!0}},{key:`recentEvents`,value:{name:`string`,required:!0}},{key:`lifestyle`,value:{name:`string`,required:!0}},{key:`sampleComfort`,value:{name:`string`,required:!0}},{key:`sensitiveConsent`,value:{name:`string`,required:!0}}]},required:!0},{name:`union`,raw:`'patient' | 'nurse' | 'system'`,elements:[{name:`literal`,value:`'patient'`},{name:`literal`,value:`'nurse'`},{name:`literal`,value:`'system'`}]}],raw:`Record<keyof IntakeFields, IntakeAuthor>`}],raw:`Partial<Record<keyof IntakeFields, IntakeAuthor>>`,required:!1}},{key:`visitReason`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}}]}},description:``},onPatientChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(patient: FrontDeskPatient) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`chiefComplaint`,value:{name:`string`,required:!0}},{key:`preTestPrep`,value:{name:`string`,required:!0}},{key:`medications`,value:{name:`string`,required:!0}},{key:`womensHealth`,value:{name:`string`,required:!0}},{key:`recentEvents`,value:{name:`string`,required:!0}},{key:`lifestyle`,value:{name:`string`,required:!0}},{key:`sampleComfort`,value:{name:`string`,required:!0}},{key:`sensitiveConsent`,value:{name:`string`,required:!0}}]},required:!0},{name:`union`,raw:`'patient' | 'nurse' | 'system'`,elements:[{name:`literal`,value:`'patient'`},{name:`literal`,value:`'nurse'`},{name:`literal`,value:`'system'`}]}],raw:`Record<keyof IntakeFields, IntakeAuthor>`}],raw:`Partial<Record<keyof IntakeFields, IntakeAuthor>>`,required:!1}},{key:`visitReason`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}}]}},name:`patient`}],return:{name:`void`}}},description:``},existingPatients:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`chiefComplaint`,value:{name:`string`,required:!0}},{key:`preTestPrep`,value:{name:`string`,required:!0}},{key:`medications`,value:{name:`string`,required:!0}},{key:`womensHealth`,value:{name:`string`,required:!0}},{key:`recentEvents`,value:{name:`string`,required:!0}},{key:`lifestyle`,value:{name:`string`,required:!0}},{key:`sampleComfort`,value:{name:`string`,required:!0}},{key:`sensitiveConsent`,value:{name:`string`,required:!0}}]},required:!0},{name:`union`,raw:`'patient' | 'nurse' | 'system'`,elements:[{name:`literal`,value:`'patient'`},{name:`literal`,value:`'nurse'`},{name:`literal`,value:`'system'`}]}],raw:`Record<keyof IntakeFields, IntakeAuthor>`}],raw:`Partial<Record<keyof IntakeFields, IntakeAuthor>>`,required:!1}},{key:`visitReason`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}}]}}],raw:`FrontDeskPatient[]`},description:`Existing records for duplicate detection.`},identityRegistry:{required:!1,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  nameKhmer?: string;
  dob?: string;
  sexAtBirth: 'Female' | 'Male' | '';
  nid?: string;
  phone?: string;
  /** patient-ms assurance axis. */
  assurance: 'unverified' | 'verified';
  /** Minors require a present guardian before check-in continues. */
  minor?: boolean;
  guardianName?: string;
  /** Registered at this PSC or known only elsewhere in Kura. */
  registeredHere: boolean;
  lastVisitLabel?: string;
  bookings?: BookingSummary[];
  /**
   * Months since the phone channel was last verified. PROTOTYPE FIELD —
   * patient-ms stores only the assurance flag, not verification recency.
   */
  phoneVerifiedMonthsAgo?: number;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`nameKhmer`,value:{name:`string`,required:!1}},{key:`dob`,value:{name:`string`,required:!1}},{key:`sexAtBirth`,value:{name:`union`,raw:`'Female' | 'Male' | ''`,elements:[{name:`literal`,value:`'Female'`},{name:`literal`,value:`'Male'`},{name:`literal`,value:`''`}],required:!0}},{key:`nid`,value:{name:`string`,required:!1}},{key:`phone`,value:{name:`string`,required:!1}},{key:`assurance`,value:{name:`union`,raw:`'unverified' | 'verified'`,elements:[{name:`literal`,value:`'unverified'`},{name:`literal`,value:`'verified'`}],required:!0},description:`patient-ms assurance axis.`},{key:`minor`,value:{name:`boolean`,required:!1},description:`Minors require a present guardian before check-in continues.`},{key:`guardianName`,value:{name:`string`,required:!1}},{key:`registeredHere`,value:{name:`boolean`,required:!0},description:`Registered at this PSC or known only elsewhere in Kura.`},{key:`lastVisitLabel`,value:{name:`string`,required:!1}},{key:`bookings`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  code: string;
  /** Canonical lifecycle state — display labels derive from this, never freehand. */
  codeStatus: CollectionCodeStatus;
  whenLabel: string;
  itemsLabel: string;
  status: { label: string; tone: 'success' | 'warning' | 'neutral' };
  /** Branch the code was issued for; reception at another branch cannot redeem it. */
  branchId?: string;
  locationLabel?: string;
  providerLabel?: string;
  /** Who created the booking — reception on behalf vs the patient themselves. */
  creatorLabel?: string;
  /**
   * Capture contract (payment-ms): \`paid\` is the only real capture state;
   * \`pending\` means no capture exists yet. Amount in minor units.
   */
  payment?: { state: 'paid' | 'pending'; amountMinor: string };
}`,signature:{properties:[{key:`code`,value:{name:`string`,required:!0}},{key:`codeStatus`,value:{name:`unknown[number]`,raw:`(typeof COLLECTION_CODE_STATUSES)[number]`,required:!0},description:`Canonical lifecycle state — display labels derive from this, never freehand.`},{key:`whenLabel`,value:{name:`string`,required:!0}},{key:`itemsLabel`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`signature`,type:`object`,raw:`{ label: string; tone: 'success' | 'warning' | 'neutral' }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`tone`,value:{name:`union`,raw:`'success' | 'warning' | 'neutral'`,elements:[{name:`literal`,value:`'success'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'neutral'`}],required:!0}}]},required:!0}},{key:`branchId`,value:{name:`string`,required:!1},description:`Branch the code was issued for; reception at another branch cannot redeem it.`},{key:`locationLabel`,value:{name:`string`,required:!1}},{key:`providerLabel`,value:{name:`string`,required:!1}},{key:`creatorLabel`,value:{name:`string`,required:!1},description:`Who created the booking — reception on behalf vs the patient themselves.`},{key:`payment`,value:{name:`signature`,type:`object`,raw:`{ state: 'paid' | 'pending'; amountMinor: string }`,signature:{properties:[{key:`state`,value:{name:`union`,raw:`'paid' | 'pending'`,elements:[{name:`literal`,value:`'paid'`},{name:`literal`,value:`'pending'`}],required:!0}},{key:`amountMinor`,value:{name:`string`,required:!0}}]},required:!1},description:"Capture contract (payment-ms): `paid` is the only real capture state;\n`pending` means no capture exists yet. Amount in minor units."}]}}],raw:`BookingSummary[]`,required:!1}},{key:`phoneVerifiedMonthsAgo`,value:{name:`number`,required:!1},description:`Months since the phone channel was last verified. PROTOTYPE FIELD —
patient-ms stores only the assurance flag, not verification recency.`}]}}],raw:`PatientRecordSummary[]`},description:`Registry the Step-1 identity search resolves against.`,defaultValue:{value:`[
  {
    id: 'rec-sok-phearom',
    name: 'Sok Phearom',
    nameKhmer: 'សុខ ភារ៉ុម',
    dob: '1974-03-15',
    sexAtBirth: 'Male',
    nid: '012345678',
    phone: '093 123 8123',
    assurance: 'verified',
    registeredHere: true,
    phoneVerifiedMonthsAgo: 6,
    lastVisitLabel: 'Last visit 3 weeks ago · PSC BKK1 · Dr. Lim Cabinet',
    bookings: [
      booking('GW87430', 'scheduled', 'Today, 09:45', 'HbA1c, TSH', {
        locationLabel: 'PSC BKK1',
        providerLabel: 'Dr. Lim Cabinet',
        branchId: DEMO_BRANCH_ID,
        creatorLabel: 'Reception · Sothea',
        payment: { state: 'paid', amountMinor: '1850' },
      }),
      booking('GW87431', 'issued', 'Today, 10:30', 'Lipid panel', {
        branchId: DEMO_BRANCH_ID,
        creatorLabel: 'Patient self-booked',
        payment: { state: 'pending', amountMinor: '1200' },
      }),
      // Blocked lifecycle branches — every canonical non-redeemable state.
      booking('GW87510', 'expired', 'Issued 9 days ago', 'CBC', { branchId: DEMO_BRANCH_ID }),
      booking('GW87511', 'redeemed', 'Today, 08:05', 'Glucose', { branchId: DEMO_BRANCH_ID }),
      booking('GW87512', 'cancelled', 'Yesterday, 16:20', 'TSH', { branchId: DEMO_BRANCH_ID }),
      booking('GW87513', 'scheduled', 'Today, 11:00', 'Vitamin D', {
        branchId: 'tuol-kork',
        locationLabel: 'PSC Tuol Kork',
      }),
    ],
  },
  {
    id: 'rec-maly-chea',
    name: 'Maly Chea',
    nameKhmer: 'ម៉ាលី ឆា',
    dob: '1996-02-14',
    sexAtBirth: 'Female',
    phone: '012 345 678',
    assurance: 'verified',
    registeredHere: false,
  },
  {
    id: 'rec-lina-prum',
    name: 'Lina Prum',
    nameKhmer: 'លីណា ព្រំ',
    dob: '1988-05-20',
    sexAtBirth: 'Female',
    nid: '052874345',
    phone: '087 654 3210',
    assurance: 'verified',
    registeredHere: true,
    bookings: [
      booking('GW87440', 'scheduled', 'Today, 09:15', 'CBC, Lipid', { branchId: DEMO_BRANCH_ID }),
    ],
  },
  {
    id: 'rec-baby-prum',
    name: 'Baby Prum',
    nameKhmer: 'ប្រូម',
    dob: '2024-03-10',
    sexAtBirth: 'Male',
    phone: '087 654 3210',
    assurance: 'unverified',
    minor: true,
    guardianName: 'Lina Prum',
    registeredHere: true,
    bookings: [
      booking('GW87441', 'scheduled', 'Today, 09:30', 'Vaccines · MMR', { branchId: DEMO_BRANCH_ID }),
    ],
  },
  {
    id: 'rec-sok-heng',
    name: 'Sok Heng',
    nameKhmer: 'សុខ ហេង',
    dob: '1965-01-01',
    sexAtBirth: 'Male',
    nid: '041203345',
    phone: '077 123 456',
    assurance: 'verified',
    registeredHere: true,
    /* Stale verification: over the 12-month trust window. */
    phoneVerifiedMonthsAgo: 14,
    lastVisitLabel: 'Last visit 1 year ago · PSC BKK1 · Dr. Lim Cabinet',
  },
  {
    id: 'rec-sok',
    name: 'Sok',
    nameKhmer: 'សុខ',
    dob: '1965-01-01',
    sexAtBirth: 'Male',
    phone: '098 765 432',
    assurance: 'unverified',
    registeredHere: false,
    lastVisitLabel: 'Last visit 2 years ago · PSC Tuol Kork',
  },
]`,computed:!1}},branchId:{required:!1,tsType:{name:`string`},description:`This desk's branch — booking codes issued for another branch block here.`,defaultValue:{value:`'bkk1'`,computed:!1}},prescribers:{required:!1,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  userId: string;
  name: string;
  specialty?: string;
  workspaceMember: boolean;
  /** \`expired\` is the legacy desk contract; lifecycle-native callers use LicenceState. */
  licence: LicenceState | 'expired';
}`,signature:{properties:[{key:`userId`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`specialty`,value:{name:`string`,required:!1}},{key:`workspaceMember`,value:{name:`boolean`,required:!0}},{key:`licence`,value:{name:`union`,raw:`LicenceState | 'expired'`,elements:[{name:`union`,raw:`| 'none'
| 'pending_review'
| 'rejected'
| 'verified'
| 'expiring'
| 'in_grace'
| 'lapsed'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'pending_review'`},{name:`literal`,value:`'rejected'`},{name:`literal`,value:`'verified'`},{name:`literal`,value:`'expiring'`},{name:`literal`,value:`'in_grace'`},{name:`literal`,value:`'lapsed'`}]},{name:`literal`,value:`'expired'`}],required:!0},description:"`expired` is the legacy desk contract; lifecycle-native callers use LicenceState."}]}}],raw:`Prescriber[]`},description:`Workspace clinicians for order attribution (ADR-0057).`,defaultValue:{value:`[
  {
    userId: 'dr-sok-vanna',
    name: 'Dr. Sok Vanna',
    specialty: 'General practice',
    workspaceMember: true,
    licence: 'verified',
  },
  {
    userId: 'dr-lim-dara',
    name: 'Dr. Lim Dara',
    specialty: 'Internal medicine',
    workspaceMember: true,
    licence: 'verified',
  },
  {
    userId: 'dr-chan-rotha',
    name: 'Dr. Chan Rotha',
    specialty: 'Paediatrics',
    workspaceMember: true,
    licence: 'expired',
  },
]`,computed:!1}},onCheckIn:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},fxRate:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  base: 'USD';
  quote: 'KHR';
  rateUnits: string;
  rateScale: number;
}`,signature:{properties:[{key:`base`,value:{name:`literal`,value:`'USD'`,required:!0}},{key:`quote`,value:{name:`literal`,value:`'KHR'`,required:!0}},{key:`rateUnits`,value:{name:`string`,required:!0}},{key:`rateScale`,value:{name:`number`,required:!0}}]}},description:`Live USD→KHR rate supplied by the clinic config endpoint.`},pricingStatus:{required:!1,tsType:{name:`union`,raw:`'ready' | 'loading' | 'error'`,elements:[{name:`literal`,value:`'ready'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'error'`}]},description:`Server pricing availability — the rail blocks collection while not ready.`,defaultValue:{value:`'ready'`,computed:!1}},onRetryPricing:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));export{qt as a,kn as i,Ja as n,Cr as r,Sa as t};