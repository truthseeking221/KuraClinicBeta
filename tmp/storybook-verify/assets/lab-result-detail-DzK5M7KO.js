import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{q as i}from"./provider-marks-BeHzyBjc.js";import{t as a}from"./icons-C5MW4nvJ.js";import{n as o,t as s}from"./button-B6_zsN5-.js";import{a as c,i as l,n as ee,o as u,r as te,t as d}from"./collapsible-Cfc9M9oP.js";import{a as f,c as p,d as m,f as h,i as g,m as _,n as v,p as y,r as b,s as x,t as S,u as C}from"./sheet-CYYlIxND.js";import{a as w,c as T,d as E,i as D,p as O,s as k,t as A,u as j}from"./logic-CkaTFHtF.js";import{n as ne,t as re}from"./lab-draw-strip-DDXi0txS.js";import{n as M,t as N}from"./lab-trend-chart-Chik5NU6.js";var P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y=t((()=>{P=`_detail_1hg2s_1`,F=`_compact_1hg2s_8`,I=`_status_1hg2s_12`,L=`_value_1hg2s_19`,R=`_unit_1hg2s_26`,z=`_meta_1hg2s_27`,B=`_note_1hg2s_32`,V=`_previewHint_1hg2s_33`,H=`_previewTitle_1hg2s_40`,U=`_history_1hg2s_51`,W=`_historyList_1hg2s_70`,G=`_historyItem_1hg2s_78`,K=`_historyValue_1hg2s_88`,q=`_historyMeta_1hg2s_96`,J={detail:P,compact:F,status:I,value:L,unit:R,meta:z,note:B,previewHint:V,previewTitle:H,history:U,historyList:W,historyItem:G,historyValue:K,historyMeta:q}}));function ie(...e){return e.filter(Boolean).join(` `)}function ae(e){let t=D(e);return t?(0,Q.jsx)(c,{size:`sm`,variant:t.severity===`critical`?`danger`:t.severity===`abnormal`?`warning`:`neutral`,children:t.label}):null}function oe(){let[e,t]=(0,$.useState)(!1);return(0,$.useEffect)(()=>{let e=window.matchMedia(`(max-width: 48rem)`),n=()=>t(e.matches);return n(),e.addEventListener(`change`,n),()=>e.removeEventListener(`change`,n)},[]),e}function X({className:e,compact:t=!1,locale:n=`en-US`,result:r,...i}){let a=r.status===`released`,o=E(r.range),s=r.observedAt??r.releasedAt,l=O(r),u=l.filter(e=>e.value.kind===`numeric`&&j(e.date)!=null).length;return(0,Q.jsxs)(`section`,{...i,className:ie(J.detail,t&&J.compact,e),"data-slot":`lab-result-detail`,children:[(0,Q.jsx)(`div`,{className:J.status,children:a?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(`span`,{className:J.value,children:k(r.value)}),r.unit?(0,Q.jsx)(`span`,{className:J.unit,children:r.unit}):null,ae(r),(0,Q.jsx)(`span`,{className:J.meta,children:w(s,n)}),o?(0,Q.jsxs)(`span`,{className:J.meta,children:[`Reference `,o]}):null]}):(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(c,{size:`sm`,variant:r.status===`manual_review`?`warning`:`neutral`,children:A[r.status].label}),(0,Q.jsx)(`span`,{className:J.meta,children:A[r.status].description})]})}),a&&u>=2?(0,Q.jsx)(N,{result:r,locale:n}):a?(0,Q.jsx)(re,{result:r,locale:n}):null,a&&j(s)==null?(0,Q.jsx)(`p`,{className:J.note,children:`The latest result has no usable observation timestamp and is not plotted on the time axis.`}):null,r.value.kind===`missing`&&a?(0,Q.jsx)(`p`,{className:J.note,children:`Not in this draw — absence is not read as normal.`}):null,!t&&l.length>0?(0,Q.jsxs)(d,{className:J.history,defaultOpen:!0,children:[(0,Q.jsx)(te,{children:`Full released history`}),(0,Q.jsx)(ee,{children:(0,Q.jsx)(`ol`,{className:J.historyList,children:[...l].reverse().map((e,t)=>(0,Q.jsxs)(`li`,{className:J.historyItem,children:[(0,Q.jsxs)(`span`,{className:J.historyValue,children:[k(e.value),e.value.kind!==`missing`&&r.unit?` ${r.unit}`:``]}),(0,Q.jsxs)(`span`,{className:J.historyMeta,children:[w(e.date,n),` · `,e.episodeLabel]})]},`${e.episodeId}-${e.date??`unknown`}-${t}`))})})]}):null]})}function Z({locale:e=`en-US`,result:t}){let[n,r]=(0,$.useState)(!1),a=oe();return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(m,{children:[(0,Q.jsx)(y,{asChild:!0,children:(0,Q.jsx)(s,{"aria-haspopup":`dialog`,"aria-label":`View ${t.name} history`,size:`compact`,variant:`ghost`,leadingIcon:(0,Q.jsx)(i,{size:16,"aria-hidden":`true`}),onClick:()=>r(!0),children:`History`})}),(0,Q.jsxs)(h,{align:`end`,size:`lg`,children:[(0,Q.jsx)(`h3`,{className:J.previewTitle,children:t.name}),(0,Q.jsx)(X,{compact:!0,locale:e,result:t}),(0,Q.jsx)(`p`,{className:J.previewHint,children:`Click for the complete released history.`})]})]}),(0,Q.jsx)(S,{open:n,onOpenChange:r,children:n?(0,Q.jsxs)(g,{side:a?`bottom`:`right`,children:[(0,Q.jsxs)(x,{children:[(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(p,{children:t.name}),(0,Q.jsx)(f,{children:`Released longitudinal history and the applicable catalog reference range.`})]}),(0,Q.jsx)(b,{"aria-label":`Close ${t.name} history`})]}),(0,Q.jsx)(v,{children:(0,Q.jsx)(X,{locale:e,result:t})})]}):null})]})}var Q,$,se=t((()=>{Q=r(),$=e(n()),u(),o(),l(),_(),a(),C(),T(),ne(),M(),Y(),X.__docgenInfo={description:``,methods:[],displayName:`LabResultDetail`,props:{result:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
| { kind: 'missing' }`,elements:[{name:`signature`,type:`object`,raw:`{ kind: 'numeric'; value: number; display?: string }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'numeric'`,required:!0}},{key:`value`,value:{name:`number`,required:!0}},{key:`display`,value:{name:`string`,required:!1}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'text'; value: string }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'text'`,required:!0}},{key:`value`,value:{name:`string`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'missing' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'missing'`,required:!0}}]}}],required:!0}},{key:`episodeId`,value:{name:`string`,required:!0}},{key:`episodeLabel`,value:{name:`string`,required:!0}},{key:`testId`,value:{name:`string`,required:!1}},{key:`sourceLabel`,value:{name:`string`,required:!1}}]}}],raw:`LabResultPoint[]`,required:!1}},{key:`observedAt`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`releasedAt`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}}]}},description:``},locale:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'en-US'`,computed:!1}},compact:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}}}},Z.__docgenInfo={description:`Pointer/focus gets a supplementary preview; click/tap opens the complete,
focus-managed history in a side sheet or mobile bottom sheet.`,methods:[],displayName:`LabResultDetailTrigger`,props:{result:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
| { kind: 'missing' }`,elements:[{name:`signature`,type:`object`,raw:`{ kind: 'numeric'; value: number; display?: string }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'numeric'`,required:!0}},{key:`value`,value:{name:`number`,required:!0}},{key:`display`,value:{name:`string`,required:!1}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'text'; value: string }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'text'`,required:!0}},{key:`value`,value:{name:`string`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'missing' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'missing'`,required:!0}}]}}],required:!0}},{key:`episodeId`,value:{name:`string`,required:!0}},{key:`episodeLabel`,value:{name:`string`,required:!0}},{key:`testId`,value:{name:`string`,required:!1}},{key:`sourceLabel`,value:{name:`string`,required:!1}}]}}],raw:`LabResultPoint[]`,required:!1}},{key:`observedAt`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`releasedAt`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}}]}},description:``},locale:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'en-US'`,computed:!1}}}}}));export{se as n,Z as t};