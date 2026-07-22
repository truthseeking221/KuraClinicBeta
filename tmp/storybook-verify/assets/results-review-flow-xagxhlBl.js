import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{it as i,o as a,x as o}from"./provider-marks-BeHzyBjc.js";import{t as s}from"./icons-C5MW4nvJ.js";import{a as c,i as l,n as u,r as d,t as f}from"./alert-l7nmjmGJ.js";import{n as p,t as m}from"./button-B6_zsN5-.js";import{a as h,r as g,t as _,u as v}from"./card-DMMaaphC.js";import{_ as y,a as b,c as x,i as S,n as C,s as w}from"./logic-CkaTFHtF.js";import{n as T,t as E}from"./results-workspace-BP2vyTVS.js";function D({acknowledged:e,onAcknowledge:t,result:n}){let r=S(n);return r?.severity===`critical`?e?(0,O.jsxs)(f,{tone:`neutral`,icon:(0,O.jsx)(o,{}),children:[(0,O.jsx)(l,{children:`Critical result acknowledged`}),(0,O.jsxs)(d,{children:[n.name,` `,w(n.value),` `,n.unit??``,` · released`,` `,b(n.releasedAt),`. This acknowledgment is a design-target event pending backend audit mapping.`]})]}):(0,O.jsxs)(f,{tone:`danger`,icon:(0,O.jsx)(a,{}),children:[(0,O.jsx)(l,{children:`Critical result requires acknowledgment`}),(0,O.jsxs)(d,{children:[n.name,` `,w(n.value),` `,n.unit??``,` is inside the catalog panic tier “`,r.label,`”. Review the released history before acknowledging.`]}),(0,O.jsx)(u,{children:(0,O.jsx)(m,{onClick:t,children:`Acknowledge critical result`})})]}):null}var O,k=t((()=>{O=r(),c(),p(),s(),x(),D.__docgenInfo={description:``,methods:[],displayName:`CriticalResultNotice`,props:{result:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  orderLineItemId: string;
  testId: string;
  supersedesTestId?: string | null;
  panelCode?: string;
  panelName?: string;
  analyteCode: string;
  name: string;
  loincCode?: string;
  unit?: string;
  status: TestStatus;
  verificationMode?: TestVerificationMode | null;
  value: LabResultValue;
  range?: ReferenceRange | null;
  history?: LabResultPoint[];
  observedAt?: string | null;
  releasedAt?: string | null;
}`,signature:{properties:[{key:`orderLineItemId`,value:{name:`string`,required:!0}},{key:`testId`,value:{name:`string`,required:!0}},{key:`supersedesTestId`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`panelCode`,value:{name:`string`,required:!1}},{key:`panelName`,value:{name:`string`,required:!1}},{key:`analyteCode`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`loincCode`,value:{name:`string`,required:!1}},{key:`unit`,value:{name:`string`,required:!1}},{key:`status`,value:{name:`union`,raw:`| 'awaiting_sample'
| 'in_lab'
| 'in_progress'
| 'resulted'
| 'manual_review'
| 'signed'
| 'autoverified'
| 'released'
| 'cancelled'
| 'dismissed'`,elements:[{name:`literal`,value:`'awaiting_sample'`},{name:`literal`,value:`'in_lab'`},{name:`literal`,value:`'in_progress'`},{name:`literal`,value:`'resulted'`},{name:`literal`,value:`'manual_review'`},{name:`literal`,value:`'signed'`},{name:`literal`,value:`'autoverified'`},{name:`literal`,value:`'released'`},{name:`literal`,value:`'cancelled'`},{name:`literal`,value:`'dismissed'`}],required:!0}},{key:`verificationMode`,value:{name:`union`,raw:`TestVerificationMode | null`,elements:[{name:`union`,raw:`'manual' | 'crelio_autoverified' | 'crelio_flagged'`,elements:[{name:`literal`,value:`'manual'`},{name:`literal`,value:`'crelio_autoverified'`},{name:`literal`,value:`'crelio_flagged'`}]},{name:`null`}],required:!1}},{key:`value`,value:{name:`union`,raw:`| { kind: 'numeric'; value: number; display?: string }
| { kind: 'text'; value: string }
| { kind: 'missing' }`,elements:[{name:`signature`,type:`object`,raw:`{ kind: 'numeric'; value: number; display?: string }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'numeric'`,required:!0}},{key:`value`,value:{name:`number`,required:!0}},{key:`display`,value:{name:`string`,required:!1}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'text'; value: string }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'text'`,required:!0}},{key:`value`,value:{name:`string`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'missing' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'missing'`,required:!0}}]}}],required:!0}},{key:`range`,value:{name:`union`,raw:`ReferenceRange | null`,elements:[{name:`signature`,type:`object`,raw:`{
  source?: string;
  valueType: RangeValueType;
  tiers: ReferenceTier[];
  display?: string;
}`,signature:{properties:[{key:`source`,value:{name:`string`,required:!1}},{key:`valueType`,value:{name:`union`,raw:`'qn' | 'ord' | 'semi_qn'`,elements:[{name:`literal`,value:`'qn'`},{name:`literal`,value:`'ord'`},{name:`literal`,value:`'semi_qn'`}],required:!0}},{key:`tiers`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  tier: string;
  label: string;
  severity: TierSeverity;
  lowerBound?: number | null;
  upperBound?: number | null;
  textValue?: string | null;
  displayOrder: number;
}`,signature:{properties:[{key:`tier`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`severity`,value:{name:`union`,raw:`'normal' | 'abnormal' | 'critical'`,elements:[{name:`literal`,value:`'normal'`},{name:`literal`,value:`'abnormal'`},{name:`literal`,value:`'critical'`}],required:!0}},{key:`lowerBound`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!1}},{key:`upperBound`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!1}},{key:`textValue`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`displayOrder`,value:{name:`number`,required:!0}}]}}],raw:`ReferenceTier[]`,required:!0}},{key:`display`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!1}},{key:`history`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  date?: string | null;
  value: LabResultValue;
  episodeId: string;
  episodeLabel: string;
  testId?: string;
  sourceLabel?: string;
}`,signature:{properties:[{key:`date`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`value`,value:{name:`union`,raw:`| { kind: 'numeric'; value: number; display?: string }
| { kind: 'text'; value: string }
| { kind: 'missing' }`,elements:[{name:`signature`,type:`object`,raw:`{ kind: 'numeric'; value: number; display?: string }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'numeric'`,required:!0}},{key:`value`,value:{name:`number`,required:!0}},{key:`display`,value:{name:`string`,required:!1}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'text'; value: string }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'text'`,required:!0}},{key:`value`,value:{name:`string`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'missing' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'missing'`,required:!0}}]}}],required:!0}},{key:`episodeId`,value:{name:`string`,required:!0}},{key:`episodeLabel`,value:{name:`string`,required:!0}},{key:`testId`,value:{name:`string`,required:!1}},{key:`sourceLabel`,value:{name:`string`,required:!1}}]}}],raw:`LabResultPoint[]`,required:!1}},{key:`observedAt`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`releasedAt`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}}]}},description:``},acknowledged:{required:!0,tsType:{name:`boolean`},description:``},onAcknowledge:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})),A,j,M,N,P,F=t((()=>{A=`_flow_2yyle_1`,j=`_closureStatus_2yyle_16`,M=`_closureTitle_2yyle_22`,N=`_closureReason_2yyle_23`,P={flow:A,closureStatus:j,closureTitle:M,closureReason:N}}));function I({episodeLabel:e,initialAcknowledged:t=!1,initialClosed:n=!1,patient:r,sections:a}){let[s,c]=(0,R.useState)(t),[u,p]=(0,R.useState)(n),v=C(a.flatMap(e=>e.results)),b=(0,R.useMemo)(()=>y(a).flatMap(e=>e.results).find(e=>S(e)?.severity===`critical`),[a]),x=v.pending===0&&(!b||s),w=v.pending>0?`${v.pending} test ${v.pending===1?`line is`:`lines are`} still pending.`:b&&!s?`A critical released result still requires acknowledgment.`:`All release and acknowledgment gates are satisfied.`;return(0,L.jsxs)(`div`,{className:P.flow,"data-slot":`results-review-flow`,children:[b?(0,L.jsx)(D,{acknowledged:s,result:b,onAcknowledge:()=>c(!0)}):null,u?(0,L.jsxs)(f,{tone:`neutral`,icon:(0,L.jsx)(o,{}),children:[(0,L.jsx)(l,{children:`Clinical result review closed`}),(0,L.jsx)(d,{children:`The closure event is represented as a product/design target until backend audit and concurrency contracts are mapped.`})]}):null,(0,L.jsx)(E,{episodeLabel:e,patient:r,readOnly:u,sections:a}),(0,L.jsxs)(_,{as:`section`,size:`sm`,children:[(0,L.jsx)(g,{children:(0,L.jsxs)(`div`,{className:P.closureStatus,children:[(0,L.jsx)(i,{size:20,"aria-hidden":`true`}),(0,L.jsxs)(`div`,{children:[(0,L.jsx)(`p`,{className:P.closureTitle,children:`Clinical closure gate`}),(0,L.jsx)(`p`,{className:P.closureReason,children:w})]})]})}),(0,L.jsx)(h,{children:(0,L.jsx)(m,{disabled:!x||u,onClick:()=>p(!0),children:u?`Review closed`:`Close result review`})})]})]})}var L,R,z=t((()=>{L=r(),R=e(n()),c(),p(),s(),v(),k(),x(),T(),F(),I.__docgenInfo={description:``,methods:[],displayName:`ResultsReviewFlow`,props:{patient:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  dob: string;
  sexAtBirth: string;
  medicalRecordNumber: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`dob`,value:{name:`string`,required:!0}},{key:`sexAtBirth`,value:{name:`string`,required:!0}},{key:`medicalRecordNumber`,value:{name:`string`,required:!0}}]}},description:``},episodeLabel:{required:!0,tsType:{name:`string`},description:``},sections:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  code: string;
  title: string;
  results: LabAnalyteResult[];
}`,signature:{properties:[{key:`code`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`results`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  orderLineItemId: string;
  testId: string;
  supersedesTestId?: string | null;
  panelCode?: string;
  panelName?: string;
  analyteCode: string;
  name: string;
  loincCode?: string;
  unit?: string;
  status: TestStatus;
  verificationMode?: TestVerificationMode | null;
  value: LabResultValue;
  range?: ReferenceRange | null;
  history?: LabResultPoint[];
  observedAt?: string | null;
  releasedAt?: string | null;
}`,signature:{properties:[{key:`orderLineItemId`,value:{name:`string`,required:!0}},{key:`testId`,value:{name:`string`,required:!0}},{key:`supersedesTestId`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`panelCode`,value:{name:`string`,required:!1}},{key:`panelName`,value:{name:`string`,required:!1}},{key:`analyteCode`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`loincCode`,value:{name:`string`,required:!1}},{key:`unit`,value:{name:`string`,required:!1}},{key:`status`,value:{name:`union`,raw:`| 'awaiting_sample'
| 'in_lab'
| 'in_progress'
| 'resulted'
| 'manual_review'
| 'signed'
| 'autoverified'
| 'released'
| 'cancelled'
| 'dismissed'`,elements:[{name:`literal`,value:`'awaiting_sample'`},{name:`literal`,value:`'in_lab'`},{name:`literal`,value:`'in_progress'`},{name:`literal`,value:`'resulted'`},{name:`literal`,value:`'manual_review'`},{name:`literal`,value:`'signed'`},{name:`literal`,value:`'autoverified'`},{name:`literal`,value:`'released'`},{name:`literal`,value:`'cancelled'`},{name:`literal`,value:`'dismissed'`}],required:!0}},{key:`verificationMode`,value:{name:`union`,raw:`TestVerificationMode | null`,elements:[{name:`union`,raw:`'manual' | 'crelio_autoverified' | 'crelio_flagged'`,elements:[{name:`literal`,value:`'manual'`},{name:`literal`,value:`'crelio_autoverified'`},{name:`literal`,value:`'crelio_flagged'`}]},{name:`null`}],required:!1}},{key:`value`,value:{name:`union`,raw:`| { kind: 'numeric'; value: number; display?: string }
| { kind: 'text'; value: string }
| { kind: 'missing' }`,elements:[{name:`signature`,type:`object`,raw:`{ kind: 'numeric'; value: number; display?: string }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'numeric'`,required:!0}},{key:`value`,value:{name:`number`,required:!0}},{key:`display`,value:{name:`string`,required:!1}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'text'; value: string }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'text'`,required:!0}},{key:`value`,value:{name:`string`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'missing' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'missing'`,required:!0}}]}}],required:!0}},{key:`range`,value:{name:`union`,raw:`ReferenceRange | null`,elements:[{name:`signature`,type:`object`,raw:`{
  source?: string;
  valueType: RangeValueType;
  tiers: ReferenceTier[];
  display?: string;
}`,signature:{properties:[{key:`source`,value:{name:`string`,required:!1}},{key:`valueType`,value:{name:`union`,raw:`'qn' | 'ord' | 'semi_qn'`,elements:[{name:`literal`,value:`'qn'`},{name:`literal`,value:`'ord'`},{name:`literal`,value:`'semi_qn'`}],required:!0}},{key:`tiers`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  tier: string;
  label: string;
  severity: TierSeverity;
  lowerBound?: number | null;
  upperBound?: number | null;
  textValue?: string | null;
  displayOrder: number;
}`,signature:{properties:[{key:`tier`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`severity`,value:{name:`union`,raw:`'normal' | 'abnormal' | 'critical'`,elements:[{name:`literal`,value:`'normal'`},{name:`literal`,value:`'abnormal'`},{name:`literal`,value:`'critical'`}],required:!0}},{key:`lowerBound`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!1}},{key:`upperBound`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!1}},{key:`textValue`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`displayOrder`,value:{name:`number`,required:!0}}]}}],raw:`ReferenceTier[]`,required:!0}},{key:`display`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!1}},{key:`history`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  date?: string | null;
  value: LabResultValue;
  episodeId: string;
  episodeLabel: string;
  testId?: string;
  sourceLabel?: string;
}`,signature:{properties:[{key:`date`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`value`,value:{name:`union`,raw:`| { kind: 'numeric'; value: number; display?: string }
| { kind: 'text'; value: string }
| { kind: 'missing' }`,elements:[{name:`signature`,type:`object`,raw:`{ kind: 'numeric'; value: number; display?: string }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'numeric'`,required:!0}},{key:`value`,value:{name:`number`,required:!0}},{key:`display`,value:{name:`string`,required:!1}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'text'; value: string }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'text'`,required:!0}},{key:`value`,value:{name:`string`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'missing' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'missing'`,required:!0}}]}}],required:!0}},{key:`episodeId`,value:{name:`string`,required:!0}},{key:`episodeLabel`,value:{name:`string`,required:!0}},{key:`testId`,value:{name:`string`,required:!1}},{key:`sourceLabel`,value:{name:`string`,required:!1}}]}}],raw:`LabResultPoint[]`,required:!1}},{key:`observedAt`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`releasedAt`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}}]}}],raw:`LabAnalyteResult[]`,required:!0}}]}}],raw:`LabResultSection[]`},description:``},initialAcknowledged:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},initialClosed:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}}}}}));export{z as n,k as r,I as t};