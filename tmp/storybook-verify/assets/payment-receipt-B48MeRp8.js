import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{St as n}from"./provider-marks-BeHzyBjc.js";import{t as r}from"./ui-C9kmmzkH.js";import{t as i}from"./button-B6_zsN5-.js";import{a}from"./collapsible-Cfc9M9oP.js";import{a as o,l as s,n as c,o as l,r as u,t as d}from"./card-DMMaaphC.js";import{t as f}from"./money-text-DwvxiUCm.js";var p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O=e((()=>{p=`_receipt_ermm2_1`,m=`_title_ermm2_5`,h=`_body_ermm2_12`,g=`_lineName_ermm2_18`,_=`_linePrice_ermm2_19`,v=`_total_ermm2_20`,y=`_patient_ermm2_25`,b=`_lines_ermm2_32`,x=`_line_ermm2_18`,S=`_totalRow_ermm2_65`,C=`_meta_ermm2_83`,w=`_metaRow_ermm2_90`,T=`_immutable_ermm2_108`,E=`_footer_ermm2_114`,D={receipt:p,title:m,body:h,lineName:g,linePrice:_,total:v,patient:y,lines:b,line:x,totalRow:S,meta:C,metaRow:w,immutable:T,footer:E}}));function k({branchLabel:e,items:t,onPrint:r,patientName:p,payment:m,voided:h=!1}){return(0,A.jsxs)(d,{"aria-label":`Receipt ${m.receiptId??``}`,as:`article`,className:D.receipt,size:`sm`,variant:`outline`,children:[(0,A.jsxs)(l,{children:[(0,A.jsxs)(s,{as:`h3`,className:D.title,children:[`Receipt `,m.receiptId]}),(0,A.jsx)(c,{children:h?(0,A.jsx)(a,{size:`sm`,variant:`neutral`,children:`Voided`}):m.supplementalDue?(0,A.jsx)(a,{size:`sm`,variant:`warning`,children:`Supplemental due`}):(0,A.jsx)(a,{size:`sm`,variant:`success`,children:`Paid`})})]}),(0,A.jsxs)(u,{className:D.body,"data-voided":h?`true`:void 0,children:[(0,A.jsx)(`p`,{className:D.patient,children:p}),(0,A.jsx)(`ul`,{className:D.lines,children:t.map(e=>(0,A.jsxs)(`li`,{className:D.line,children:[(0,A.jsxs)(`span`,{className:D.lineName,children:[e.name,e.qty>1?` × ${e.qty}`:``]}),(0,A.jsx)(f,{className:D.linePrice,currency:e.currencyCode,minor:e.priceMinor})]},e.id))}),(0,A.jsxs)(`div`,{className:D.totalRow,children:[(0,A.jsx)(`span`,{children:`Total paid`}),(0,A.jsx)(f,{className:D.total,currency:`USD`,minor:m.amountMinor??`0`})]}),(0,A.jsxs)(`dl`,{className:D.meta,children:[(0,A.jsxs)(`div`,{className:D.metaRow,children:[(0,A.jsx)(`dt`,{children:`Method`}),(0,A.jsx)(`dd`,{children:j[m.method??``]??`—`})]}),(0,A.jsxs)(`div`,{className:D.metaRow,children:[(0,A.jsx)(`dt`,{children:`Captured`}),(0,A.jsxs)(`dd`,{children:[m.confirmedAt,` · `,m.cashier,` · `,e]})]}),m.previousReceiptId?(0,A.jsxs)(`div`,{className:D.metaRow,children:[(0,A.jsx)(`dt`,{children:`Adjusts`}),(0,A.jsxs)(`dd`,{children:[`Receipt `,m.previousReceiptId,` —`,` `,(0,A.jsx)(f,{currency:`USD`,minor:m.previousPaidAmountMinor??`0`}),` already paid`]})]}):null,m.voidedReceiptId?(0,A.jsxs)(`div`,{className:D.metaRow,children:[(0,A.jsx)(`dt`,{children:`Replaces`}),(0,A.jsxs)(`dd`,{children:[`Voided receipt `,m.voidedReceiptId]})]}):null]}),(0,A.jsx)(`p`,{className:D.immutable,children:`Receipts are immutable evidence. A correction issues a new receipt — it never edits this one.`})]}),r&&!h?(0,A.jsx)(o,{className:D.footer,children:(0,A.jsxs)(i,{onClick:r,size:`sm`,variant:`outline`,children:[(0,A.jsx)(n,{"aria-hidden":`true`,size:14}),`Print receipt`]})}):null]})}var A,j,M=e((()=>{A=t(),r(),O(),j={cash:`Cash`,khqr:`KHQR (Bakong)`,split:`Cash + KHQR`},k.__docgenInfo={description:`Immutable payment evidence. A receipt is never edited: a paid-edit issues a
supplemental receipt that references this one, and a void keeps the
original readable with a voided marker. The amount is the server-derived
capture amount — never desk-entered.`,methods:[],displayName:`PaymentReceipt`,props:{patientName:{required:!0,tsType:{name:`string`},description:``},items:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
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
clinician override — otherwise the order is cancelled, never defaulted.`}]}}],raw:`CartItem[]`},description:``},payment:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
| 'pending-claim'`,elements:[{name:`literal`,value:`'idle'`},{name:`literal`,value:`'waiting'`},{name:`literal`,value:`'confirmed'`},{name:`literal`,value:`'deferred'`},{name:`literal`,value:`'no-charge'`},{name:`literal`,value:`'split-cash'`},{name:`literal`,value:`'pending-claim'`}],required:!0}},{key:`method`,value:{name:`union`,raw:`'cash' | 'khqr' | 'split' | null`,elements:[{name:`literal`,value:`'cash'`},{name:`literal`,value:`'khqr'`},{name:`literal`,value:`'split'`},{name:`null`}],required:!0}},{key:`tendered`,value:{name:`string`,required:!0}},{key:`changeMinor`,value:{name:`string`,required:!0}},{key:`receiptId`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`confirmedAt`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`amountMinor`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`cashier`,value:{name:`string`,required:!1}},{key:`supplementalDue`,value:{name:`boolean`,required:!1},description:`Paid-edit outcomes.`},{key:`previousReceiptId`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`previousPaidAmountMinor`,value:{name:`string`,required:!1}},{key:`voidedReceiptId`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`cashPortionMinor`,value:{name:`string`,required:!1},description:`Split flow: confirmed cash portion in USD.`},{key:`khqrState`,value:{name:`union`,raw:`'waiting' | 'expired' | 'cancelled'`,elements:[{name:`literal`,value:`'waiting'`},{name:`literal`,value:`'expired'`},{name:`literal`,value:`'cancelled'`}],required:!1},description:"KHQR intent lifecycle while `status` is `waiting`/`split-cash`. The QR is\nan expiring intent: it can lapse or be cancelled and regenerated — the\ndesk never treats a stale QR as collectable. PROTOTYPE: no Bakong\nprovider integration exists upstream."}]}},description:``},branchLabel:{required:!0,tsType:{name:`string`},description:`Branch that captured the payment — required by the capture contract.`},voided:{required:!1,tsType:{name:`boolean`},description:`Voided evidence view: the receipt stays readable, never deleted.`,defaultValue:{value:`false`,computed:!1}},onPrint:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));export{M as n,k as t};