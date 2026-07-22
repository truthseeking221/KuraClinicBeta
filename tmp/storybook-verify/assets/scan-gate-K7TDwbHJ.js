import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{m as i}from"./provider-marks-BeHzyBjc.js";import{G as a,Rt as o,W as s,X as c,Y as l,Z as u,fr as d,q as f,t as p}from"./ui-C9kmmzkH.js";import{i as m,n as h,r as ee,t as te}from"./alert-l7nmjmGJ.js";import{t as g}from"./button-B6_zsN5-.js";import{a as _}from"./collapsible-Cfc9M9oP.js";import{t as v}from"./segmented-toggle-DDpNscFF.js";import{t as ne}from"./input-UaJWx_9h.js";import{t as re}from"./select-WVTSimR_.js";import{a as y,l as b,o as x,t as S,u as C}from"./catalog-i61dxfuf.js";import{_ as w,a as ie,d as T,f as ae,g as oe,h as se,i as E,l as D,m as O,o as ce,s as le,u as ue,v as de,x as fe,y as k}from"./logic-CGFDdeX3.js";import{n as A,t as pe}from"./defer-dialog-uDw_9c1-.js";var j,M,N,P,F,I,L,me=t((()=>{j=`_checklist_1cvu5_1`,M=`_header_1cvu5_11`,N=`_title_1cvu5_18`,P=`_progress_1cvu5_25`,F=`_items_1cvu5_35`,I=`_site_1cvu5_44`,L={checklist:j,header:M,title:N,progress:P,items:F,site:I}}));function R({arm:e,checks:t,onArmChange:n,onSiteChange:r,onToggle:i,site:a}){let o=Object.values(t).filter(Boolean).length,s=E(t);return(0,z.jsxs)(`section`,{"aria-label":`Pre-draw safety checklist`,className:L.checklist,children:[(0,z.jsxs)(`header`,{className:L.header,children:[(0,z.jsx)(`h3`,{className:L.title,children:`Before the draw`}),(0,z.jsxs)(`span`,{className:L.progress,"data-complete":s?`true`:void 0,children:[o,`/`,x.length,` confirmed`]})]}),(0,z.jsx)(`ul`,{className:L.items,children:x.map(e=>(0,z.jsx)(`li`,{children:(0,z.jsx)(d,{checked:t[e.id],onCheckedChange:()=>i(e.id),children:e.label})},e.id))}),(0,z.jsxs)(`div`,{className:L.site,children:[(0,z.jsx)(v,{label:`Arm`,onValueChange:e=>n(e),options:[{value:`L`,label:`Left arm`},{value:`R`,label:`Right arm`}],value:e}),(0,z.jsx)(re,{label:`Site`,onChange:e=>r(e.target.value),options:S.map(e=>({value:e,label:e})),value:a})]})]})}var z,B=t((()=>{z=r(),p(),b(),T(),me(),R.__docgenInfo={description:`Pre-draw safety confirmation. Unlike the legacy prototype, this checklist
GATES collection — collect actions stay disabled until all five items are
confirmed. Positive ID stays an open question asked to the patient, never
a leading yes/no prompt.`,methods:[],displayName:`SafetyChecklist`,props:{checks:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  id: boolean;
  fasting: boolean;
  allergy: boolean;
  consent: boolean;
  site: boolean;
}`,signature:{properties:[{key:`id`,value:{name:`boolean`,required:!0}},{key:`fasting`,value:{name:`boolean`,required:!0}},{key:`allergy`,value:{name:`boolean`,required:!0}},{key:`consent`,value:{name:`boolean`,required:!0}},{key:`site`,value:{name:`boolean`,required:!0}}]}},description:``},onToggle:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: keyof SafetyChecks) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: boolean;
  fasting: boolean;
  allergy: boolean;
  consent: boolean;
  site: boolean;
}`,signature:{properties:[{key:`id`,value:{name:`boolean`,required:!0}},{key:`fasting`,value:{name:`boolean`,required:!0}},{key:`allergy`,value:{name:`boolean`,required:!0}},{key:`consent`,value:{name:`boolean`,required:!0}},{key:`site`,value:{name:`boolean`,required:!0}}]}},name:`id`}],return:{name:`void`}}},description:``},arm:{required:!0,tsType:{name:`union`,raw:`'L' | 'R'`,elements:[{name:`literal`,value:`'L'`},{name:`literal`,value:`'R'`}]},description:``},onArmChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(arm: 'L' | 'R') => void`,signature:{arguments:[{type:{name:`union`,raw:`'L' | 'R'`,elements:[{name:`literal`,value:`'L'`},{name:`literal`,value:`'R'`}]},name:`arm`}],return:{name:`void`}}},description:``},site:{required:!0,tsType:{name:`string`},description:``},onSiteChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(site: string) => void`,signature:{arguments:[{type:{name:`string`},name:`site`}],return:{name:`void`}}},description:``}}}})),V,H,he,ge,_e,ve,ye,U,be=t((()=>{V=`_tubeCell_q5td4_1`,H=`_tubeDot_q5td4_8`,he=`_mono_q5td4_56`,ge=`_overflow_q5td4_61`,_e=`_hint_q5td4_65`,ve=`_deferReason_q5td4_71`,ye=`_actions_q5td4_78`,U={tubeCell:V,tubeDot:H,mono:he,overflow:ge,hint:_e,deferReason:ve,actions:ye}}));function xe({collectEnabled:e,focusedSampleId:t,now:n,onCollect:r,onDefer:i,onFocusSample:o,onMarkInverted:d,onReset:p,samples:m}){let h=w(m);return(0,W.jsxs)(s,{density:`compact`,children:[(0,W.jsx)(c,{children:(0,W.jsxs)(u,{children:[(0,W.jsx)(l,{"aria-label":`Draw order`,children:`#`}),(0,W.jsx)(l,{children:`Tube`}),(0,W.jsx)(l,{children:`Sample ID`}),(0,W.jsx)(l,{children:`Tests`}),(0,W.jsx)(l,{numeric:!0,children:`Vol`}),(0,W.jsx)(l,{children:`Priority`}),(0,W.jsx)(l,{children:`Inversion`}),(0,W.jsx)(l,{children:`Clot time`}),(0,W.jsx)(l,{children:`Status`}),(0,W.jsx)(l,{"aria-label":`Actions`})]})}),(0,W.jsx)(a,{children:h.map(a=>{let s=C(a.tube),c=O(a,n);return(0,W.jsxs)(u,{interactive:!0,onClick:()=>o?.(a.id),selected:a.id===t,children:[(0,W.jsx)(f,{numeric:!0,children:s?.order??`—`}),(0,W.jsx)(f,{children:(0,W.jsxs)(`span`,{className:U.tubeCell,children:[(0,W.jsx)(`span`,{"aria-hidden":`true`,className:U.tubeDot,"data-tube":a.tube}),s?.stopperLabel??a.tube]})}),(0,W.jsx)(f,{children:(0,W.jsx)(`span`,{className:U.mono,children:a.id})}),(0,W.jsxs)(f,{children:[a.tests.slice(0,2).join(`, `),a.tests.length>2?(0,W.jsxs)(`span`,{className:U.overflow,children:[` +`,a.tests.length-2]}):null]}),(0,W.jsxs)(f,{numeric:!0,children:[a.volumeMl,` mL`]}),(0,W.jsx)(f,{children:a.stat?(0,W.jsx)(_,{variant:`danger`,children:`STAT`}):`—`}),(0,W.jsx)(f,{children:(s?.inversions??0)===0?`—`:a.status===`collected`?a.inverted?(0,W.jsxs)(_,{variant:`success`,children:[`✓ ×`,s?.inversions]}):(0,W.jsxs)(g,{onClick:e=>{e.stopPropagation(),d(a.id)},size:`xs`,variant:`outline`,children:[`Invert ×`,s?.inversions]}):(0,W.jsxs)(`span`,{className:U.hint,children:[`×`,s?.inversions,` after draw`]})}),(0,W.jsx)(f,{children:c==null?s?.timeLimitMin&&a.status!==`collected`?(0,W.jsxs)(`span`,{className:U.hint,children:[s.timeLimitMin,`m`]}):`—`:(0,W.jsx)(_,{variant:k(c)===`danger`?`danger`:k(c)===`warn`?`warning`:`success`,children:c<=0?`Exceeded`:ue(c)})}),(0,W.jsxs)(f,{children:[(0,W.jsxs)(_,{variant:a.status===`collected`?`success`:a.status===`deferred`?`warning`:`neutral`,children:[Se[a.status],a.status===`collected`&&a.collectedAt?` · ${a.collectedAt}`:``]}),a.status===`deferred`&&a.deferReason?(0,W.jsx)(`span`,{className:U.deferReason,children:a.deferReason}):null]}),(0,W.jsx)(f,{onClick:e=>e.stopPropagation(),children:(0,W.jsx)(`span`,{className:U.actions,children:a.status===`awaiting_collection`?(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(g,{disabled:!e,onClick:()=>r(a.id),size:`xs`,title:e?void 0:`Complete the safety checklist first`,variant:`primary`,children:`Collect`}),(0,W.jsx)(g,{onClick:e=>i(a.id,e.currentTarget),size:`xs`,variant:`ghost`,children:`Defer`})]}):(0,W.jsx)(g,{onClick:()=>p(a.id),size:`xs`,variant:`ghost`,children:`Reset`})})})]},a.id)})})]})}var W,Se,Ce=t((()=>{W=r(),p(),b(),T(),be(),Se={awaiting_collection:`Awaiting collection`,collected:`Collected`,deferred:`Deferred`},xe.__docgenInfo={description:``,methods:[],displayName:`SampleTable`,props:{samples:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
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
| 'dark-gray'`,elements:[{name:`literal`,value:`'yellow-sps'`},{name:`literal`,value:`'light-blue'`},{name:`literal`,value:`'red'`},{name:`literal`,value:`'gold-sst'`},{name:`literal`,value:`'green'`},{name:`literal`,value:`'gray-green'`},{name:`literal`,value:`'lavender'`},{name:`literal`,value:`'pink'`},{name:`literal`,value:`'white'`},{name:`literal`,value:`'dark-gray'`}],required:!0}},{key:`tests`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`volumeMl`,value:{name:`number`,required:!0}},{key:`container`,value:{name:`string`,required:!0}},{key:`stat`,value:{name:`boolean`,required:!0}},{key:`status`,value:{name:`union`,raw:`'awaiting_collection' | 'collected' | 'deferred'`,elements:[{name:`literal`,value:`'awaiting_collection'`},{name:`literal`,value:`'collected'`},{name:`literal`,value:`'deferred'`}],required:!0}},{key:`collectedAt`,value:{name:`string`,required:!1}},{key:`collectedAtMs`,value:{name:`number`,required:!1}},{key:`collectedBy`,value:{name:`string`,required:!1}},{key:`inverted`,value:{name:`boolean`,required:!1}},{key:`deferReason`,value:{name:`string`,required:!1}},{key:`deferNote`,value:{name:`string`,required:!1}}]}}],raw:`Sample[]`},description:``},now:{required:!0,tsType:{name:`number`},description:``},focusedSampleId:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},onFocusSample:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(id: string | null) => void`,signature:{arguments:[{type:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},name:`id`}],return:{name:`void`}}},description:``},collectEnabled:{required:!0,tsType:{name:`boolean`},description:`Collect stays disabled until the safety checklist is complete.`},onCollect:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:``},onDefer:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: string, trigger: HTMLButtonElement) => void`,signature:{arguments:[{type:{name:`string`},name:`id`},{type:{name:`HTMLButtonElement`},name:`trigger`}],return:{name:`void`}}},description:``},onReset:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:``},onMarkInverted:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:``}}}})),we,Te,Ee,De,Oe,ke,Ae,G,je=t((()=>{we=`_worksheet_17lsx_1`,Te=`_layout_17lsx_7`,Ee=`_rail_17lsx_14`,De=`_main_17lsx_19`,Oe=`_toolbar_17lsx_26`,ke=`_footer_17lsx_36`,Ae=`_footerActions_17lsx_45`,G={worksheet:we,layout:Te,rail:Ee,main:De,toolbar:Oe,footer:ke,footerActions:Ae}}));function Me({now:e,onMarkVitalsDone:t,onNotify:n,onSaveDraft:r,onSubmit:i,onUpdateSamples:a,operatorName:o,patient:s,samples:c}){let[l,u]=(0,q.useState)(J),[f,p]=(0,q.useState)(`L`),[v,re]=(0,q.useState)(`Antecubital fossa`),[y,b]=(0,q.useState)(``),[x,S]=(0,q.useState)(null),[C,w]=(0,q.useState)(null),[T,E]=(0,q.useState)(!1),[D,O]=(0,q.useState)(!1),[ue,fe]=(0,q.useState)(s.id),k=(0,q.useRef)(null),A=(0,q.useRef)(null);ue!==s.id&&(fe(s.id),u(J),O(!1),E(!1),S(null)),(0,q.useEffect)(()=>{k.current?.focus()},[s.id]);let j=de(c,l,T),M=s.journey.vitals!==`done`&&!D,N=c.find(e=>e.id===C)??null;function P(t){a(ce(c,t,{now:e,collectedBy:o})),S(t),n?.(`success`,`Collected ${t}`)}function F(e){if(e.key!==`Enter`)return;e.preventDefault();let t=y.trim();if(!t)return;let r=oe(c,t);r.kind===`unknown`?(n?.(`danger`,`No sample matches ${t}`),S(null)):r.kind===`inspect`?(S(r.sample.id),n?.(`info`,`${r.sample.id} already handled — focused in the worksheet`)):j.checklistBlocking?n?.(`warn`,`Complete the safety checklist before collecting.`):P(r.sample.id),b(``)}return(0,K.jsxs)(`div`,{className:G.worksheet,children:[M?(0,K.jsxs)(te,{tone:`warning`,children:[(0,K.jsx)(m,{children:`Vital signs not yet recorded`}),(0,K.jsx)(ee,{children:`You can continue, or send the patient to the vital signs booth first.`}),(0,K.jsxs)(h,{children:[(0,K.jsx)(g,{onClick:()=>O(!0),size:`sm`,variant:`outline`,children:`Continue anyway`}),(0,K.jsx)(g,{onClick:t,size:`sm`,variant:`ghost`,children:`Mark done at another booth`})]})]}):null,(0,K.jsxs)(`div`,{className:G.layout,children:[(0,K.jsx)(`div`,{className:G.rail,children:(0,K.jsx)(R,{arm:f,checks:l,onArmChange:p,onSiteChange:re,onToggle:e=>u(t=>({...t,[e]:!t[e]})),site:v})}),(0,K.jsxs)(`div`,{className:G.main,children:[(0,K.jsxs)(`div`,{className:G.toolbar,children:[(0,K.jsx)(ne,{"aria-label":`Scan tube barcode`,onChange:e=>b(e.target.value),onKeyDown:F,placeholder:`Scan tube barcode — collects, or focuses if already done`,ref:k,value:y}),(0,K.jsx)(g,{disabled:!j.anyOpen||j.checklistBlocking,onClick:()=>{a(ie(c,{now:e,collectedBy:o})),n?.(`info`,`All open samples marked collected — confirm inversions next`)},title:j.checklistBlocking?`Complete the safety checklist first`:void 0,variant:`outline`,children:`Mark all collected`})]}),(0,K.jsx)(xe,{collectEnabled:!j.checklistBlocking,focusedSampleId:x,now:e,onCollect:P,onDefer:(e,t)=>{A.current=t,w(e)},onFocusSample:S,onMarkInverted:e=>{a(ae(c,e)),n?.(`success`,`Inversion confirmed for ${e}`)},onReset:e=>{a(se(c,e)),n?.(`info`,`Reset ${e} — back to awaiting collection`)},samples:c}),j.allCollected&&j.inversionsBlocking>0?(0,K.jsxs)(te,{tone:`warning`,children:[(0,K.jsx)(m,{children:`Override inversion confirmation`}),(0,K.jsx)(ee,{children:(0,K.jsxs)(d,{checked:T,onCheckedChange:E,children:[j.inversionsBlocking,` tube`,j.inversionsBlocking>1?`s`:``,` not yet confirmed inverted — skipping inversions can clot the sample. Only override if already done on the bench.`]})})]}):null,(0,K.jsxs)(`footer`,{className:G.footer,children:[(0,K.jsxs)(_,{variant:j.allCollected?`success`:`neutral`,children:[j.collectedCount,`/`,j.totalCount,` collected`]}),(0,K.jsxs)(`div`,{className:G.footerActions,children:[(0,K.jsx)(g,{onClick:r,variant:`ghost`,children:`Save draft`}),(0,K.jsx)(g,{disabled:!j.canSubmit,onClick:i,title:j.checklistBlocking?`Complete the safety checklist first`:j.allCollected?void 0:`Collect or resolve every tube first`,variant:`primary`,children:`Submit collection & next patient`})]})]})]})]}),(0,K.jsx)(pe,{onClose:()=>w(null),onConfirm:(e,t)=>{C&&(a(le(c,C,e,t)),n?.(`warn`,`Deferred ${C} — ${e}`)),w(null)},restoreFocusRef:A,sample:N})]})}var K,q,J,Ne=t((()=>{K=r(),q=e(n()),p(),A(),T(),B(),Ce(),je(),J={id:!1,fasting:!1,allergy:!1,consent:!1,site:!1},Me.__docgenInfo={description:`The phlebotomy worksheet: safety checklist gates collection; every sample
must be collected (or the deferred ones resolved) and inversions confirmed
— or explicitly overridden — before handoff.`,methods:[],displayName:`DrawWorksheet`,props:{patient:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  id: string;
  /** Patient ID barcode, format P + 4–8 digits. */
  pid: string;
  name: string;
  initials: string;
  sex: 'F' | 'M';
  dob: string;
  orderId: string;
  checkInAt: string;
  waitingMinutes: number;
  /** waiting = blocked upstream · pending = ready for this booth · done. */
  journey: { identity: JourneyState; vitals: JourneyState; phlebo: JourneyState };
  fasting: string;
  allergies: string[];
  samples: Sample[];
  vitals?: VitalsValues;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`pid`,value:{name:`string`,required:!0},description:`Patient ID barcode, format P + 4–8 digits.`},{key:`name`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`sex`,value:{name:`union`,raw:`'F' | 'M'`,elements:[{name:`literal`,value:`'F'`},{name:`literal`,value:`'M'`}],required:!0}},{key:`dob`,value:{name:`string`,required:!0}},{key:`orderId`,value:{name:`string`,required:!0}},{key:`checkInAt`,value:{name:`string`,required:!0}},{key:`waitingMinutes`,value:{name:`number`,required:!0}},{key:`journey`,value:{name:`signature`,type:`object`,raw:`{ identity: JourneyState; vitals: JourneyState; phlebo: JourneyState }`,signature:{properties:[{key:`identity`,value:{name:`union`,raw:`'waiting' | 'pending' | 'done'`,elements:[{name:`literal`,value:`'waiting'`},{name:`literal`,value:`'pending'`},{name:`literal`,value:`'done'`}],required:!0}},{key:`vitals`,value:{name:`union`,raw:`'waiting' | 'pending' | 'done'`,elements:[{name:`literal`,value:`'waiting'`},{name:`literal`,value:`'pending'`},{name:`literal`,value:`'done'`}],required:!0}},{key:`phlebo`,value:{name:`union`,raw:`'waiting' | 'pending' | 'done'`,elements:[{name:`literal`,value:`'waiting'`},{name:`literal`,value:`'pending'`},{name:`literal`,value:`'done'`}],required:!0}}]},required:!0},description:`waiting = blocked upstream · pending = ready for this booth · done.`},{key:`fasting`,value:{name:`string`,required:!0}},{key:`allergies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`samples`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
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
| 'dark-gray'`,elements:[{name:`literal`,value:`'yellow-sps'`},{name:`literal`,value:`'light-blue'`},{name:`literal`,value:`'red'`},{name:`literal`,value:`'gold-sst'`},{name:`literal`,value:`'green'`},{name:`literal`,value:`'gray-green'`},{name:`literal`,value:`'lavender'`},{name:`literal`,value:`'pink'`},{name:`literal`,value:`'white'`},{name:`literal`,value:`'dark-gray'`}],required:!0}},{key:`tests`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`volumeMl`,value:{name:`number`,required:!0}},{key:`container`,value:{name:`string`,required:!0}},{key:`stat`,value:{name:`boolean`,required:!0}},{key:`status`,value:{name:`union`,raw:`'awaiting_collection' | 'collected' | 'deferred'`,elements:[{name:`literal`,value:`'awaiting_collection'`},{name:`literal`,value:`'collected'`},{name:`literal`,value:`'deferred'`}],required:!0}},{key:`collectedAt`,value:{name:`string`,required:!1}},{key:`collectedAtMs`,value:{name:`number`,required:!1}},{key:`collectedBy`,value:{name:`string`,required:!1}},{key:`inverted`,value:{name:`boolean`,required:!1}},{key:`deferReason`,value:{name:`string`,required:!1}},{key:`deferNote`,value:{name:`string`,required:!1}}]}}],raw:`Sample[]`,required:!0}},{key:`vitals`,value:{name:`signature`,type:`object`,raw:`{
  heightCm: string;
  weightKg: string;
  hr: string;
  bpSys: string;
  bpDia: string;
  tempC: string;
  tempUnit: 'C' | 'F';
  spo2: string;
  breathing: string;
  painVas: number;
  fasting: string | null;
  vaccinationNote: string;
}`,signature:{properties:[{key:`heightCm`,value:{name:`string`,required:!0}},{key:`weightKg`,value:{name:`string`,required:!0}},{key:`hr`,value:{name:`string`,required:!0}},{key:`bpSys`,value:{name:`string`,required:!0}},{key:`bpDia`,value:{name:`string`,required:!0}},{key:`tempC`,value:{name:`string`,required:!0}},{key:`tempUnit`,value:{name:`union`,raw:`'C' | 'F'`,elements:[{name:`literal`,value:`'C'`},{name:`literal`,value:`'F'`}],required:!0}},{key:`spo2`,value:{name:`string`,required:!0}},{key:`breathing`,value:{name:`string`,required:!0}},{key:`painVas`,value:{name:`number`,required:!0}},{key:`fasting`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`vaccinationNote`,value:{name:`string`,required:!0}}]},required:!1}}]}},description:``},samples:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
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
| 'dark-gray'`,elements:[{name:`literal`,value:`'yellow-sps'`},{name:`literal`,value:`'light-blue'`},{name:`literal`,value:`'red'`},{name:`literal`,value:`'gold-sst'`},{name:`literal`,value:`'green'`},{name:`literal`,value:`'gray-green'`},{name:`literal`,value:`'lavender'`},{name:`literal`,value:`'pink'`},{name:`literal`,value:`'white'`},{name:`literal`,value:`'dark-gray'`}],required:!0}},{key:`tests`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`volumeMl`,value:{name:`number`,required:!0}},{key:`container`,value:{name:`string`,required:!0}},{key:`stat`,value:{name:`boolean`,required:!0}},{key:`status`,value:{name:`union`,raw:`'awaiting_collection' | 'collected' | 'deferred'`,elements:[{name:`literal`,value:`'awaiting_collection'`},{name:`literal`,value:`'collected'`},{name:`literal`,value:`'deferred'`}],required:!0}},{key:`collectedAt`,value:{name:`string`,required:!1}},{key:`collectedAtMs`,value:{name:`number`,required:!1}},{key:`collectedBy`,value:{name:`string`,required:!1}},{key:`inverted`,value:{name:`boolean`,required:!1}},{key:`deferReason`,value:{name:`string`,required:!1}},{key:`deferNote`,value:{name:`string`,required:!1}}]}}],raw:`Sample[]`},description:``},onUpdateSamples:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(samples: Sample[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
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
| 'dark-gray'`,elements:[{name:`literal`,value:`'yellow-sps'`},{name:`literal`,value:`'light-blue'`},{name:`literal`,value:`'red'`},{name:`literal`,value:`'gold-sst'`},{name:`literal`,value:`'green'`},{name:`literal`,value:`'gray-green'`},{name:`literal`,value:`'lavender'`},{name:`literal`,value:`'pink'`},{name:`literal`,value:`'white'`},{name:`literal`,value:`'dark-gray'`}],required:!0}},{key:`tests`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`volumeMl`,value:{name:`number`,required:!0}},{key:`container`,value:{name:`string`,required:!0}},{key:`stat`,value:{name:`boolean`,required:!0}},{key:`status`,value:{name:`union`,raw:`'awaiting_collection' | 'collected' | 'deferred'`,elements:[{name:`literal`,value:`'awaiting_collection'`},{name:`literal`,value:`'collected'`},{name:`literal`,value:`'deferred'`}],required:!0}},{key:`collectedAt`,value:{name:`string`,required:!1}},{key:`collectedAtMs`,value:{name:`number`,required:!1}},{key:`collectedBy`,value:{name:`string`,required:!1}},{key:`inverted`,value:{name:`boolean`,required:!1}},{key:`deferReason`,value:{name:`string`,required:!1}},{key:`deferNote`,value:{name:`string`,required:!1}}]}}],raw:`Sample[]`},name:`samples`}],return:{name:`void`}}},description:``},onSubmit:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onSaveDraft:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onMarkVitalsDone:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},now:{required:!0,tsType:{name:`number`},description:`Deterministic clock for timers.`},operatorName:{required:!0,tsType:{name:`string`},description:``},onNotify:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(tone: 'success' | 'info' | 'warn' | 'danger', text: string) => void`,signature:{arguments:[{type:{name:`union`,raw:`'success' | 'info' | 'warn' | 'danger'`,elements:[{name:`literal`,value:`'success'`},{name:`literal`,value:`'info'`},{name:`literal`,value:`'warn'`},{name:`literal`,value:`'danger'`}]},name:`tone`},{type:{name:`string`},name:`text`}],return:{name:`void`}}},description:``}}}})),Pe,Fe,Ie,Le,Re,ze,Be,Ve,Y,He,Ue,We,Ge,Ke,X,qe=t((()=>{Pe=`_gate_3ln89_1`,Fe=`_glyph_3ln89_12`,Ie=`_title_3ln89_28`,Le=`_sub_3ln89_36`,Re=`_field_3ln89_42`,ze=`_tips_3ln89_57`,Be=`_browse_3ln89_71`,Ve=`_queueList_3ln89_75`,Y=`_queueEmpty_3ln89_86`,He=`_queueRow_3ln89_93`,Ue=`_queueAvatar_3ln89_117`,We=`_queueText_3ln89_131`,Ge=`_queueName_3ln89_138`,Ke=`_queueMeta_3ln89_147`,X={gate:Pe,glyph:Fe,title:Ie,sub:Le,field:Re,tips:ze,browse:Be,queueList:Ve,queueEmpty:Y,queueRow:He,queueAvatar:Ue,queueText:We,queueName:Ge,queueMeta:Ke}}));function Je({onMatch:e,queue:t,role:n}){let[r,a]=(0,Q.useState)(``),[s,c]=(0,Q.useState)(null),[l,u]=(0,Q.useState)(!1),d=(0,Q.useRef)(null);(0,Q.useEffect)(()=>{d.current?.focus()},[]),(0,Q.useEffect)(()=>{function e(){document.activeElement===document.body&&d.current?.focus()}return window.addEventListener(`focus`,e),()=>window.removeEventListener(`focus`,e)},[]);let f=r.trim(),p=f!==``&&!y.test(f);function m(){if(!f)return;let n=D(t,f);n?(c(null),a(``),e(n)):(c(`No patient for "${f.toUpperCase()}". Try again.`),d.current?.select())}function h(e){e.key===`Enter`?(e.preventDefault(),m()):e.key===`Escape`&&(a(``),c(null))}return(0,Z.jsxs)(`section`,{"aria-label":$[n],className:X.gate,"data-role":n,children:[(0,Z.jsx)(`div`,{className:X.glyph,"aria-hidden":`true`,children:(0,Z.jsx)(i,{size:28})}),(0,Z.jsx)(`h2`,{className:X.title,children:`Scan patient barcode`}),(0,Z.jsx)(`p`,{className:X.sub,children:`Hand-scan the printed bill, or type the patient ID.`}),(0,Z.jsxs)(`div`,{className:X.field,children:[(0,Z.jsx)(ne,{"aria-label":`Patient ID`,autoCapitalize:`characters`,error:s,helpText:p&&!s?`Format looks off — expected e.g. P123456.`:void 0,onChange:e=>{a(e.target.value),s&&c(null)},onKeyDown:h,placeholder:`P _ _ _ _ _ _`,ref:d,size:`lg`,spellCheck:!1,value:r}),(0,Z.jsxs)(`div`,{className:X.tips,children:[(0,Z.jsxs)(`span`,{children:[(0,Z.jsx)(o,{children:`Enter`}),` look up`]}),(0,Z.jsxs)(`span`,{children:[(0,Z.jsx)(o,{children:`Esc`}),` clear — the scanner sends both for you`]})]})]}),(0,Z.jsx)(`div`,{className:X.browse,children:(0,Z.jsxs)(g,{"aria-expanded":l,onClick:()=>u(e=>!e),variant:`outline`,children:[`Browse queue · `,t.length]})}),l?(0,Z.jsx)(`ul`,{"aria-label":`Waiting patients`,className:X.queueList,children:t.length===0?(0,Z.jsx)(`li`,{className:X.queueEmpty,children:`Queue is clear.`}):t.map(t=>{let n=fe(t.waitingMinutes);return(0,Z.jsx)(`li`,{children:(0,Z.jsxs)(`button`,{className:X.queueRow,onClick:()=>e(t),type:`button`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,className:X.queueAvatar,children:t.initials}),(0,Z.jsxs)(`span`,{className:X.queueText,children:[(0,Z.jsx)(`span`,{className:X.queueName,children:t.name}),(0,Z.jsxs)(`span`,{className:X.queueMeta,children:[t.pid,` · `,t.checkInAt]})]}),(0,Z.jsxs)(_,{variant:n===`danger`?`danger`:n===`warn`?`warning`:`neutral`,children:[t.waitingMinutes,` min`]})]})},t.id)})}):null]})}var Z,Q,$,Ye=t((()=>{Z=r(),Q=e(n()),p(),b(),T(),qe(),$={vitals:`Vital signs station`,phlebotomy:`Phlebotomy station`},Je.__docgenInfo={description:`Scanner-first entry for booth work. The field owns focus: autofocus on
mount, refocus when the window regains focus and nothing else holds it —
barcode scanners type into the focused field and send Enter.`,methods:[],displayName:`ScanGate`,props:{role:{required:!0,tsType:{name:`union`,raw:`'vitals' | 'phlebotomy'`,elements:[{name:`literal`,value:`'vitals'`},{name:`literal`,value:`'phlebotomy'`}]},description:``},queue:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  /** Patient ID barcode, format P + 4–8 digits. */
  pid: string;
  name: string;
  initials: string;
  sex: 'F' | 'M';
  dob: string;
  orderId: string;
  checkInAt: string;
  waitingMinutes: number;
  /** waiting = blocked upstream · pending = ready for this booth · done. */
  journey: { identity: JourneyState; vitals: JourneyState; phlebo: JourneyState };
  fasting: string;
  allergies: string[];
  samples: Sample[];
  vitals?: VitalsValues;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`pid`,value:{name:`string`,required:!0},description:`Patient ID barcode, format P + 4–8 digits.`},{key:`name`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`sex`,value:{name:`union`,raw:`'F' | 'M'`,elements:[{name:`literal`,value:`'F'`},{name:`literal`,value:`'M'`}],required:!0}},{key:`dob`,value:{name:`string`,required:!0}},{key:`orderId`,value:{name:`string`,required:!0}},{key:`checkInAt`,value:{name:`string`,required:!0}},{key:`waitingMinutes`,value:{name:`number`,required:!0}},{key:`journey`,value:{name:`signature`,type:`object`,raw:`{ identity: JourneyState; vitals: JourneyState; phlebo: JourneyState }`,signature:{properties:[{key:`identity`,value:{name:`union`,raw:`'waiting' | 'pending' | 'done'`,elements:[{name:`literal`,value:`'waiting'`},{name:`literal`,value:`'pending'`},{name:`literal`,value:`'done'`}],required:!0}},{key:`vitals`,value:{name:`union`,raw:`'waiting' | 'pending' | 'done'`,elements:[{name:`literal`,value:`'waiting'`},{name:`literal`,value:`'pending'`},{name:`literal`,value:`'done'`}],required:!0}},{key:`phlebo`,value:{name:`union`,raw:`'waiting' | 'pending' | 'done'`,elements:[{name:`literal`,value:`'waiting'`},{name:`literal`,value:`'pending'`},{name:`literal`,value:`'done'`}],required:!0}}]},required:!0},description:`waiting = blocked upstream · pending = ready for this booth · done.`},{key:`fasting`,value:{name:`string`,required:!0}},{key:`allergies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`samples`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
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
| 'dark-gray'`,elements:[{name:`literal`,value:`'yellow-sps'`},{name:`literal`,value:`'light-blue'`},{name:`literal`,value:`'red'`},{name:`literal`,value:`'gold-sst'`},{name:`literal`,value:`'green'`},{name:`literal`,value:`'gray-green'`},{name:`literal`,value:`'lavender'`},{name:`literal`,value:`'pink'`},{name:`literal`,value:`'white'`},{name:`literal`,value:`'dark-gray'`}],required:!0}},{key:`tests`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`volumeMl`,value:{name:`number`,required:!0}},{key:`container`,value:{name:`string`,required:!0}},{key:`stat`,value:{name:`boolean`,required:!0}},{key:`status`,value:{name:`union`,raw:`'awaiting_collection' | 'collected' | 'deferred'`,elements:[{name:`literal`,value:`'awaiting_collection'`},{name:`literal`,value:`'collected'`},{name:`literal`,value:`'deferred'`}],required:!0}},{key:`collectedAt`,value:{name:`string`,required:!1}},{key:`collectedAtMs`,value:{name:`number`,required:!1}},{key:`collectedBy`,value:{name:`string`,required:!1}},{key:`inverted`,value:{name:`boolean`,required:!1}},{key:`deferReason`,value:{name:`string`,required:!1}},{key:`deferNote`,value:{name:`string`,required:!1}}]}}],raw:`Sample[]`,required:!0}},{key:`vitals`,value:{name:`signature`,type:`object`,raw:`{
  heightCm: string;
  weightKg: string;
  hr: string;
  bpSys: string;
  bpDia: string;
  tempC: string;
  tempUnit: 'C' | 'F';
  spo2: string;
  breathing: string;
  painVas: number;
  fasting: string | null;
  vaccinationNote: string;
}`,signature:{properties:[{key:`heightCm`,value:{name:`string`,required:!0}},{key:`weightKg`,value:{name:`string`,required:!0}},{key:`hr`,value:{name:`string`,required:!0}},{key:`bpSys`,value:{name:`string`,required:!0}},{key:`bpDia`,value:{name:`string`,required:!0}},{key:`tempC`,value:{name:`string`,required:!0}},{key:`tempUnit`,value:{name:`union`,raw:`'C' | 'F'`,elements:[{name:`literal`,value:`'C'`},{name:`literal`,value:`'F'`}],required:!0}},{key:`spo2`,value:{name:`string`,required:!0}},{key:`breathing`,value:{name:`string`,required:!0}},{key:`painVas`,value:{name:`number`,required:!0}},{key:`fasting`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`vaccinationNote`,value:{name:`string`,required:!0}}]},required:!1}}]}}],raw:`CollectionPatient[]`},description:`Booth queue, already filtered for this station.`},onMatch:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(patient: CollectionPatient) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  /** Patient ID barcode, format P + 4–8 digits. */
  pid: string;
  name: string;
  initials: string;
  sex: 'F' | 'M';
  dob: string;
  orderId: string;
  checkInAt: string;
  waitingMinutes: number;
  /** waiting = blocked upstream · pending = ready for this booth · done. */
  journey: { identity: JourneyState; vitals: JourneyState; phlebo: JourneyState };
  fasting: string;
  allergies: string[];
  samples: Sample[];
  vitals?: VitalsValues;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`pid`,value:{name:`string`,required:!0},description:`Patient ID barcode, format P + 4–8 digits.`},{key:`name`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`sex`,value:{name:`union`,raw:`'F' | 'M'`,elements:[{name:`literal`,value:`'F'`},{name:`literal`,value:`'M'`}],required:!0}},{key:`dob`,value:{name:`string`,required:!0}},{key:`orderId`,value:{name:`string`,required:!0}},{key:`checkInAt`,value:{name:`string`,required:!0}},{key:`waitingMinutes`,value:{name:`number`,required:!0}},{key:`journey`,value:{name:`signature`,type:`object`,raw:`{ identity: JourneyState; vitals: JourneyState; phlebo: JourneyState }`,signature:{properties:[{key:`identity`,value:{name:`union`,raw:`'waiting' | 'pending' | 'done'`,elements:[{name:`literal`,value:`'waiting'`},{name:`literal`,value:`'pending'`},{name:`literal`,value:`'done'`}],required:!0}},{key:`vitals`,value:{name:`union`,raw:`'waiting' | 'pending' | 'done'`,elements:[{name:`literal`,value:`'waiting'`},{name:`literal`,value:`'pending'`},{name:`literal`,value:`'done'`}],required:!0}},{key:`phlebo`,value:{name:`union`,raw:`'waiting' | 'pending' | 'done'`,elements:[{name:`literal`,value:`'waiting'`},{name:`literal`,value:`'pending'`},{name:`literal`,value:`'done'`}],required:!0}}]},required:!0},description:`waiting = blocked upstream · pending = ready for this booth · done.`},{key:`fasting`,value:{name:`string`,required:!0}},{key:`allergies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`samples`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
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
| 'dark-gray'`,elements:[{name:`literal`,value:`'yellow-sps'`},{name:`literal`,value:`'light-blue'`},{name:`literal`,value:`'red'`},{name:`literal`,value:`'gold-sst'`},{name:`literal`,value:`'green'`},{name:`literal`,value:`'gray-green'`},{name:`literal`,value:`'lavender'`},{name:`literal`,value:`'pink'`},{name:`literal`,value:`'white'`},{name:`literal`,value:`'dark-gray'`}],required:!0}},{key:`tests`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`volumeMl`,value:{name:`number`,required:!0}},{key:`container`,value:{name:`string`,required:!0}},{key:`stat`,value:{name:`boolean`,required:!0}},{key:`status`,value:{name:`union`,raw:`'awaiting_collection' | 'collected' | 'deferred'`,elements:[{name:`literal`,value:`'awaiting_collection'`},{name:`literal`,value:`'collected'`},{name:`literal`,value:`'deferred'`}],required:!0}},{key:`collectedAt`,value:{name:`string`,required:!1}},{key:`collectedAtMs`,value:{name:`number`,required:!1}},{key:`collectedBy`,value:{name:`string`,required:!1}},{key:`inverted`,value:{name:`boolean`,required:!1}},{key:`deferReason`,value:{name:`string`,required:!1}},{key:`deferNote`,value:{name:`string`,required:!1}}]}}],raw:`Sample[]`,required:!0}},{key:`vitals`,value:{name:`signature`,type:`object`,raw:`{
  heightCm: string;
  weightKg: string;
  hr: string;
  bpSys: string;
  bpDia: string;
  tempC: string;
  tempUnit: 'C' | 'F';
  spo2: string;
  breathing: string;
  painVas: number;
  fasting: string | null;
  vaccinationNote: string;
}`,signature:{properties:[{key:`heightCm`,value:{name:`string`,required:!0}},{key:`weightKg`,value:{name:`string`,required:!0}},{key:`hr`,value:{name:`string`,required:!0}},{key:`bpSys`,value:{name:`string`,required:!0}},{key:`bpDia`,value:{name:`string`,required:!0}},{key:`tempC`,value:{name:`string`,required:!0}},{key:`tempUnit`,value:{name:`union`,raw:`'C' | 'F'`,elements:[{name:`literal`,value:`'C'`},{name:`literal`,value:`'F'`}],required:!0}},{key:`spo2`,value:{name:`string`,required:!0}},{key:`breathing`,value:{name:`string`,required:!0}},{key:`painVas`,value:{name:`number`,required:!0}},{key:`fasting`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`vaccinationNote`,value:{name:`string`,required:!0}}]},required:!1}}]}},name:`patient`}],return:{name:`void`}}},description:``}}}}));export{Ce as a,Ne as i,Ye as n,B as o,Me as r,Je as t};