import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{Ar as i,Cr as a,Dr as o,Er as s,Or as c,Sr as l,Tr as u,qt as d,t as f,wr as p}from"./ui-C9kmmzkH.js";import{t as m}from"./select-WVTSimR_.js";import{l as h,n as g,u as _}from"./catalog-i61dxfuf.js";var v,y,b,x,S,C,w=t((()=>{v=`_sampleLine_18rlr_1`,y=`_tests_18rlr_12`,b=`_tubeDot_18rlr_17`,x=`_mono_18rlr_65`,S=`_form_18rlr_70`,C={sampleLine:v,tests:y,tubeDot:b,mono:x,form:S}}));function T({onClose:e,onConfirm:t,restoreFocusRef:n,sample:r}){return(0,D.jsx)(l,{onOpenChange:t=>t?void 0:e(),open:r!==null,children:(0,D.jsx)(E,{onClose:e,onConfirm:t,restoreFocusRef:n,sample:r})})}function E({onClose:e,onConfirm:t,restoreFocusRef:n,sample:r}){let[l,f]=(0,O.useState)({note:``,reason:``,sampleId:null}),h=r?_(r.tube):void 0,v=r?.id??null,y=l.sampleId===v?l:{note:``,reason:``,sampleId:v};return(0,D.jsxs)(u,{returnFocusRef:n,children:[(0,D.jsxs)(c,{children:[(0,D.jsx)(i,{children:`Defer this draw?`}),(0,D.jsx)(s,{children:r?(0,D.jsxs)(D.Fragment,{children:[(0,D.jsxs)(`span`,{className:C.sampleLine,children:[(0,D.jsx)(`span`,{"aria-hidden":`true`,className:C.tubeDot,"data-tube":r.tube}),(0,D.jsx)(`span`,{className:C.mono,children:r.id}),` · `,h?.stopperLabel,` ·`,` `,(0,D.jsx)(`span`,{className:C.tests,children:r.tests.join(`, `)})]}),`The tube stays on the worklist for the next attempt.`]}):null})]}),(0,D.jsxs)(`div`,{className:C.form,children:[(0,D.jsx)(m,{helpText:`Choose a reason before saving the deferral.`,label:`Reason`,onChange:e=>f({note:y.note,reason:e.target.value,sampleId:v}),options:g.map(e=>({value:e,label:e})),placeholder:`Select a reason`,required:!0,value:y.reason}),(0,D.jsx)(d,{label:`Note for the next attempt (optional)`,onChange:e=>f({note:e.target.value,reason:y.reason,sampleId:v}),placeholder:`Add context for the next attempt…`,value:y.note})]}),(0,D.jsxs)(o,{children:[(0,D.jsx)(p,{onClick:e,children:`Cancel`}),(0,D.jsx)(a,{disabled:!y.reason,onClick:()=>t(y.reason,y.note),variant:`primary`,children:`Defer draw`})]})]})}var D,O,k=t((()=>{D=r(),O=e(n()),f(),h(),w(),T.__docgenInfo={description:`Defer keeps the visit honest: the tube stays on the worklist with a reason
the next attempt can act on. Reasons are specific — never "noncompliant".`,methods:[],displayName:`DeferDialog`,props:{sample:{required:!0,tsType:{name:`union`,raw:`Sample | null`,elements:[{name:`signature`,type:`object`,raw:`{
  /** Tube barcode. */
  id: string;
  tube: TubeKey;
  tests: string[];
  volumeMl: number;
  container: string;
  stat: boolean;
  status: SampleStatus;
  collectedAt?: string;
  collectedAtMs?: number;
  collectedBy?: string;
  inverted?: boolean;
  deferReason?: string;
  deferNote?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0},description:`Tube barcode.`},{key:`tube`,value:{name:`union`,raw:`| 'yellow-sps'
| 'light-blue'
| 'red'
| 'gold-sst'
| 'green'
| 'gray-green'
| 'lavender'
| 'pink'
| 'white'
| 'dark-gray'`,elements:[{name:`literal`,value:`'yellow-sps'`},{name:`literal`,value:`'light-blue'`},{name:`literal`,value:`'red'`},{name:`literal`,value:`'gold-sst'`},{name:`literal`,value:`'green'`},{name:`literal`,value:`'gray-green'`},{name:`literal`,value:`'lavender'`},{name:`literal`,value:`'pink'`},{name:`literal`,value:`'white'`},{name:`literal`,value:`'dark-gray'`}],required:!0}},{key:`tests`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`volumeMl`,value:{name:`number`,required:!0}},{key:`container`,value:{name:`string`,required:!0}},{key:`stat`,value:{name:`boolean`,required:!0}},{key:`status`,value:{name:`union`,raw:`'awaiting_collection' | 'collected' | 'deferred'`,elements:[{name:`literal`,value:`'awaiting_collection'`},{name:`literal`,value:`'collected'`},{name:`literal`,value:`'deferred'`}],required:!0}},{key:`collectedAt`,value:{name:`string`,required:!1}},{key:`collectedAtMs`,value:{name:`number`,required:!1}},{key:`collectedBy`,value:{name:`string`,required:!1}},{key:`inverted`,value:{name:`boolean`,required:!1}},{key:`deferReason`,value:{name:`string`,required:!1}},{key:`deferNote`,value:{name:`string`,required:!1}}]}},{name:`null`}]},description:`Sample being deferred; null closes the dialog.`},onConfirm:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(reason: string, note: string) => void`,signature:{arguments:[{type:{name:`string`},name:`reason`},{type:{name:`string`},name:`note`}],return:{name:`void`}}},description:``},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},restoreFocusRef:{required:!1,tsType:{name:`RefObject`,elements:[{name:`union`,raw:`HTMLElement | null`,elements:[{name:`HTMLElement`},{name:`null`}]}],raw:`RefObject<HTMLElement | null>`},description:``}}}}));export{k as n,T as t};