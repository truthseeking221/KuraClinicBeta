import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{T as n}from"./provider-marks-BeHzyBjc.js";import{t as r}from"./ui-C9kmmzkH.js";import{t as i}from"./skeleton-yGvKPj3C.js";import{t as a}from"./button-B6_zsN5-.js";import{a as o}from"./collapsible-Cfc9M9oP.js";import{t as s}from"./money-text-DwvxiUCm.js";var c,l,u,d,f,p,m,h,g=e((()=>{c=`_row_1xauo_4`,l=`_text_1xauo_26`,u=`_title_1xauo_33`,d=`_detail_1xauo_44`,f=`_value_1xauo_51`,p=`_valueSkeleton_1xauo_64`,m=`_chevron_1xauo_69`,h={row:c,text:l,title:u,detail:d,value:f,valueSkeleton:p,chevron:m}}));function _({signal:e}){return e.moneyMinor!=null&&e.currency?(0,y.jsx)(s,{currency:e.currency,minor:e.moneyMinor}):(0,y.jsx)(y.Fragment,{children:e.headline??e.count??0})}function v({signal:e,onNavigate:t,onRetry:r}){if(e.state===`error`)return(0,y.jsxs)(`div`,{className:h.row,children:[(0,y.jsxs)(`span`,{className:h.text,children:[(0,y.jsx)(`span`,{className:h.title,children:e.title}),(0,y.jsx)(`span`,{className:h.detail,children:e.errorMessage??`Could not load.`})]}),(0,y.jsx)(a,{onClick:()=>r?.(e.key),size:`sm`,variant:`outline`,children:`Retry`})]});let s=(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(`span`,{className:h.text,children:[(0,y.jsxs)(`span`,{className:h.title,children:[e.title,e.tone!==`neutral`&&e.toneLabel?(0,y.jsx)(o,{appearance:`soft`,size:`sm`,variant:b[e.tone],children:e.toneLabel}):null]}),(0,y.jsx)(`span`,{className:h.detail,children:e.detail})]}),e.state===`loading`?(0,y.jsx)(i,{className:h.valueSkeleton,shape:`text`}):(0,y.jsx)(`span`,{className:h.value,"data-tone":e.tone,children:(0,y.jsx)(_,{signal:e})}),e.action&&e.state===`ready`?(0,y.jsx)(n,{"aria-hidden":`true`,className:h.chevron,size:14}):null]});if(!e.action||e.state!==`ready`)return(0,y.jsx)(`div`,{className:h.row,children:s});let c=e.action;return(0,y.jsx)(`a`,{className:h.row,href:`#${c.targetKey}`,onClick:e=>{t&&(e.preventDefault(),t(c.targetKey))},children:s})}var y,b,x=e((()=>{y=t(),r(),g(),b={attention:`warning`,critical:`danger`},_.__docgenInfo={description:`The loud value of one signal: a count, a time window, or money.`,methods:[],displayName:`SignalValue`,props:{signal:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  key: string;
  kind: 'worklist' | 'info';
  title: string;
  /** Loud number for countable work. Zero renders as zero, not as blank. */
  count?: number;
  /** Loud non-numeric value, e.g. a pickup window "16:40". */
  headline?: string;
  /** Loud money value in minor units as a digit string (money law: minor units, ×100). */
  moneyMinor?: string;
  currency?: 'USD' | 'KHR';
  /** Evidence sentence under the value — what changes the next decision. */
  detail: string;
  tone: SignalTone;
  /** Text cue that must accompany a non-neutral tone. Color is never the only signal. */
  toneLabel?: string;
  state: SignalState;
  /** Plain-language failure shown with the retry action when state is \`error\`. */
  errorMessage?: string;
  /** Patient-level preview supplied only for the Results review lifecycle axis. */
  reviewItems?: ResultReviewQueueEntry[];
  /** Patient-level preview for a non-Results work queue. */
  workItems?: HomeWorkQueueEntry[];
  /** Outcome-labelled deep link into the owning surface's nav key. */
  action?: { label: string; targetKey: string };
}`,signature:{properties:[{key:`key`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`'worklist' | 'info'`,elements:[{name:`literal`,value:`'worklist'`},{name:`literal`,value:`'info'`}],required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`count`,value:{name:`number`,required:!1},description:`Loud number for countable work. Zero renders as zero, not as blank.`},{key:`headline`,value:{name:`string`,required:!1},description:`Loud non-numeric value, e.g. a pickup window "16:40".`},{key:`moneyMinor`,value:{name:`string`,required:!1},description:`Loud money value in minor units as a digit string (money law: minor units, ×100).`},{key:`currency`,value:{name:`union`,raw:`'USD' | 'KHR'`,elements:[{name:`literal`,value:`'USD'`},{name:`literal`,value:`'KHR'`}],required:!1}},{key:`detail`,value:{name:`string`,required:!0},description:`Evidence sentence under the value — what changes the next decision.`},{key:`tone`,value:{name:`union`,raw:`'neutral' | 'attention' | 'critical'`,elements:[{name:`literal`,value:`'neutral'`},{name:`literal`,value:`'attention'`},{name:`literal`,value:`'critical'`}],required:!0}},{key:`toneLabel`,value:{name:`string`,required:!1},description:`Text cue that must accompany a non-neutral tone. Color is never the only signal.`},{key:`state`,value:{name:`union`,raw:`'ready' | 'loading' | 'error'`,elements:[{name:`literal`,value:`'ready'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'error'`}],required:!0}},{key:`errorMessage`,value:{name:`string`,required:!1},description:"Plain-language failure shown with the retry action when state is `error`."},{key:`reviewItems`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  patient: ResultsPatient;
  testName: string;
  returnedLabel: string;
  status: ResultReviewQueueStatus;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`patient`,value:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  dob: string;
  sexAtBirth: string;
  medicalRecordNumber: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`dob`,value:{name:`string`,required:!0}},{key:`sexAtBirth`,value:{name:`string`,required:!0}},{key:`medicalRecordNumber`,value:{name:`string`,required:!0}}]},required:!0}},{key:`testName`,value:{name:`string`,required:!0}},{key:`returnedLabel`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`'routine' | 'abnormal' | 'critical' | 'amended'`,elements:[{name:`literal`,value:`'routine'`},{name:`literal`,value:`'abnormal'`},{name:`literal`,value:`'critical'`},{name:`literal`,value:`'amended'`}],required:!0}}]}}],raw:`ResultReviewQueueEntry[]`,required:!1},description:`Patient-level preview supplied only for the Results review lifecycle axis.`},{key:`workItems`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  patient: {
    id: string;
    name: string;
    medicalRecordNumber: string;
    dob: string;
  };
  /** The work that needs attention, with timing when it changes priority. */
  reason: string;
  /** Supporting context that helps disambiguate the work item. */
  context?: string;
  status?: { label: string; tone: HomeWorkQueueTone };
  disabled?: boolean;
  unavailableReason?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`patient`,value:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  medicalRecordNumber: string;
  dob: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`medicalRecordNumber`,value:{name:`string`,required:!0}},{key:`dob`,value:{name:`string`,required:!0}}]},required:!0}},{key:`reason`,value:{name:`string`,required:!0},description:`The work that needs attention, with timing when it changes priority.`},{key:`context`,value:{name:`string`,required:!1},description:`Supporting context that helps disambiguate the work item.`},{key:`status`,value:{name:`signature`,type:`object`,raw:`{ label: string; tone: HomeWorkQueueTone }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`tone`,value:{name:`union`,raw:`'neutral' | 'attention' | 'critical' | 'info'`,elements:[{name:`literal`,value:`'neutral'`},{name:`literal`,value:`'attention'`},{name:`literal`,value:`'critical'`},{name:`literal`,value:`'info'`}],required:!0}}]},required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`unavailableReason`,value:{name:`string`,required:!1}}]}}],raw:`HomeWorkQueueEntry[]`,required:!1},description:`Patient-level preview for a non-Results work queue.`},{key:`action`,value:{name:`signature`,type:`object`,raw:`{ label: string; targetKey: string }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`targetKey`,value:{name:`string`,required:!0}}]},required:!1},description:`Outcome-labelled deep link into the owning surface's nav key.`}]}},description:``}}},v.__docgenInfo={description:`One signal as a quiet row on the white page — title, tone, evidence, value,
and the deep link into the surface that owns the work. It carries no surface
of its own: Home spends its single tray on the results it previews in full.`,methods:[],displayName:`HomeSignalRow`,props:{signal:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  key: string;
  kind: 'worklist' | 'info';
  title: string;
  /** Loud number for countable work. Zero renders as zero, not as blank. */
  count?: number;
  /** Loud non-numeric value, e.g. a pickup window "16:40". */
  headline?: string;
  /** Loud money value in minor units as a digit string (money law: minor units, ×100). */
  moneyMinor?: string;
  currency?: 'USD' | 'KHR';
  /** Evidence sentence under the value — what changes the next decision. */
  detail: string;
  tone: SignalTone;
  /** Text cue that must accompany a non-neutral tone. Color is never the only signal. */
  toneLabel?: string;
  state: SignalState;
  /** Plain-language failure shown with the retry action when state is \`error\`. */
  errorMessage?: string;
  /** Patient-level preview supplied only for the Results review lifecycle axis. */
  reviewItems?: ResultReviewQueueEntry[];
  /** Patient-level preview for a non-Results work queue. */
  workItems?: HomeWorkQueueEntry[];
  /** Outcome-labelled deep link into the owning surface's nav key. */
  action?: { label: string; targetKey: string };
}`,signature:{properties:[{key:`key`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`'worklist' | 'info'`,elements:[{name:`literal`,value:`'worklist'`},{name:`literal`,value:`'info'`}],required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`count`,value:{name:`number`,required:!1},description:`Loud number for countable work. Zero renders as zero, not as blank.`},{key:`headline`,value:{name:`string`,required:!1},description:`Loud non-numeric value, e.g. a pickup window "16:40".`},{key:`moneyMinor`,value:{name:`string`,required:!1},description:`Loud money value in minor units as a digit string (money law: minor units, ×100).`},{key:`currency`,value:{name:`union`,raw:`'USD' | 'KHR'`,elements:[{name:`literal`,value:`'USD'`},{name:`literal`,value:`'KHR'`}],required:!1}},{key:`detail`,value:{name:`string`,required:!0},description:`Evidence sentence under the value — what changes the next decision.`},{key:`tone`,value:{name:`union`,raw:`'neutral' | 'attention' | 'critical'`,elements:[{name:`literal`,value:`'neutral'`},{name:`literal`,value:`'attention'`},{name:`literal`,value:`'critical'`}],required:!0}},{key:`toneLabel`,value:{name:`string`,required:!1},description:`Text cue that must accompany a non-neutral tone. Color is never the only signal.`},{key:`state`,value:{name:`union`,raw:`'ready' | 'loading' | 'error'`,elements:[{name:`literal`,value:`'ready'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'error'`}],required:!0}},{key:`errorMessage`,value:{name:`string`,required:!1},description:"Plain-language failure shown with the retry action when state is `error`."},{key:`reviewItems`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  patient: ResultsPatient;
  testName: string;
  returnedLabel: string;
  status: ResultReviewQueueStatus;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`patient`,value:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  dob: string;
  sexAtBirth: string;
  medicalRecordNumber: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`dob`,value:{name:`string`,required:!0}},{key:`sexAtBirth`,value:{name:`string`,required:!0}},{key:`medicalRecordNumber`,value:{name:`string`,required:!0}}]},required:!0}},{key:`testName`,value:{name:`string`,required:!0}},{key:`returnedLabel`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`'routine' | 'abnormal' | 'critical' | 'amended'`,elements:[{name:`literal`,value:`'routine'`},{name:`literal`,value:`'abnormal'`},{name:`literal`,value:`'critical'`},{name:`literal`,value:`'amended'`}],required:!0}}]}}],raw:`ResultReviewQueueEntry[]`,required:!1},description:`Patient-level preview supplied only for the Results review lifecycle axis.`},{key:`workItems`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  patient: {
    id: string;
    name: string;
    medicalRecordNumber: string;
    dob: string;
  };
  /** The work that needs attention, with timing when it changes priority. */
  reason: string;
  /** Supporting context that helps disambiguate the work item. */
  context?: string;
  status?: { label: string; tone: HomeWorkQueueTone };
  disabled?: boolean;
  unavailableReason?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`patient`,value:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  medicalRecordNumber: string;
  dob: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`medicalRecordNumber`,value:{name:`string`,required:!0}},{key:`dob`,value:{name:`string`,required:!0}}]},required:!0}},{key:`reason`,value:{name:`string`,required:!0},description:`The work that needs attention, with timing when it changes priority.`},{key:`context`,value:{name:`string`,required:!1},description:`Supporting context that helps disambiguate the work item.`},{key:`status`,value:{name:`signature`,type:`object`,raw:`{ label: string; tone: HomeWorkQueueTone }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`tone`,value:{name:`union`,raw:`'neutral' | 'attention' | 'critical' | 'info'`,elements:[{name:`literal`,value:`'neutral'`},{name:`literal`,value:`'attention'`},{name:`literal`,value:`'critical'`},{name:`literal`,value:`'info'`}],required:!0}}]},required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`unavailableReason`,value:{name:`string`,required:!1}}]}}],raw:`HomeWorkQueueEntry[]`,required:!1},description:`Patient-level preview for a non-Results work queue.`},{key:`action`,value:{name:`signature`,type:`object`,raw:`{ label: string; targetKey: string }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`targetKey`,value:{name:`string`,required:!0}}]},required:!1},description:`Outcome-labelled deep link into the owning surface's nav key.`}]}},description:``},onNavigate:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(targetKey: string) => void`,signature:{arguments:[{type:{name:`string`},name:`targetKey`}],return:{name:`void`}}},description:``},onRetry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(signalKey: string) => void`,signature:{arguments:[{type:{name:`string`},name:`signalKey`}],return:{name:`void`}}},description:``}}}}));export{_ as n,x as r,v as t};