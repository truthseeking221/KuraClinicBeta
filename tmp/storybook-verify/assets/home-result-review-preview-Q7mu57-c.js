import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{T as n}from"./provider-marks-BeHzyBjc.js";import{in as r,nn as i,sn as a,t as o}from"./ui-C9kmmzkH.js";import{t as s}from"./skeleton-yGvKPj3C.js";import{t as c}from"./button-B6_zsN5-.js";import{a as l}from"./collapsible-Cfc9M9oP.js";import{a as u,l as d,n as f,o as p,r as m,t as h}from"./card-DMMaaphC.js";import{t as g}from"./result-review-queue-item--VJBC38a.js";import{t as _}from"./results-1KdpcDAl.js";var v,y,b,x,S,C,w,T,E,D,O,k,A=e((()=>{v=`_header_1o8ws_1`,y=`_content_1o8ws_5`,b=`_footer_1o8ws_9`,x=`_viewAll_1o8ws_13`,S=`_message_1o8ws_34`,C=`_unavailable_1o8ws_42`,w=`_loadingItem_1o8ws_49`,T=`_avatarSkeleton_1o8ws_55`,E=`_nameSkeleton_1o8ws_60`,D=`_detailSkeleton_1o8ws_65`,O=`_preview_1o8ws_78`,k={header:v,content:y,footer:b,viewAll:x,message:S,unavailable:C,loadingItem:w,avatarSkeleton:T,nameSkeleton:E,detailSkeleton:D,preview:O}}));function j({count:e}){return(0,N.jsxs)(p,{className:k.header,children:[(0,N.jsx)(d,{as:`h3`,children:`Results to review`}),(0,N.jsx)(f,{mobileLayout:`inline`,children:(0,N.jsx)(l,{appearance:`soft`,size:`sm`,variant:`neutral`,children:e??0})})]})}function M({onNavigate:e,onRetry:t,signal:o}){let l=o.action?.targetKey??`results`;if(o.state===`loading`)return(0,N.jsxs)(h,{as:`section`,"aria-label":`Loading results to review`,className:k.preview,children:[(0,N.jsx)(j,{count:o.count}),(0,N.jsx)(m,{className:k.content,children:(0,N.jsx)(a,{"aria-hidden":`true`,children:[0,1,2].map(e=>(0,N.jsxs)(i,{className:k.loadingItem,size:`sm`,children:[(0,N.jsx)(s,{className:k.avatarSkeleton,shape:`circle`}),(0,N.jsxs)(r,{children:[(0,N.jsx)(s,{className:k.nameSkeleton,shape:`text`}),(0,N.jsx)(s,{className:k.detailSkeleton,shape:`text`})]})]},e))})})]});if(o.state===`error`)return(0,N.jsxs)(h,{as:`section`,className:k.preview,children:[(0,N.jsx)(j,{count:o.count}),(0,N.jsxs)(m,{className:k.message,children:[(0,N.jsx)(`p`,{children:o.errorMessage??`Patient result details could not load.`}),(0,N.jsx)(c,{onClick:()=>t?.(o.key),variant:`outline`,children:`Retry`})]})]});let d=o.reviewItems??[];return(0,N.jsxs)(h,{as:`section`,className:k.preview,children:[(0,N.jsx)(j,{count:o.count}),(0,N.jsx)(m,{className:k.content,children:d.length>0?(0,N.jsx)(a,{"aria-label":`Patients with results to review`,role:`list`,children:d.map(t=>(0,N.jsx)(`div`,{role:`listitem`,children:(0,N.jsx)(g,{entry:t,href:`#${l}/${t.patient.id}/${t.id}`,onOpen:()=>e?.(l)})},t.id))}):(0,N.jsx)(`p`,{className:k.unavailable,children:`Patient details are unavailable. Open Results to continue.`})}),o.action?(0,N.jsx)(u,{align:`start`,className:k.footer,children:(0,N.jsxs)(`a`,{className:k.viewAll,href:`#${l}`,onClick:t=>{e&&(t.preventDefault(),e(l))},children:[`View all results`,(0,N.jsx)(n,{"aria-hidden":`true`,size:14})]})}):null]})}var N,P=e((()=>{N=t(),o(),_(),A(),M.__docgenInfo={description:`Home previews patient identity and routes review into the Results owner.`,methods:[],displayName:`HomeResultReviewPreview`,props:{signal:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`medicalRecordNumber`,value:{name:`string`,required:!0}},{key:`dob`,value:{name:`string`,required:!0}}]},required:!0}},{key:`reason`,value:{name:`string`,required:!0},description:`The work that needs attention, with timing when it changes priority.`},{key:`context`,value:{name:`string`,required:!1},description:`Supporting context that helps disambiguate the work item.`},{key:`status`,value:{name:`signature`,type:`object`,raw:`{ label: string; tone: HomeWorkQueueTone }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`tone`,value:{name:`union`,raw:`'neutral' | 'attention' | 'critical' | 'info'`,elements:[{name:`literal`,value:`'neutral'`},{name:`literal`,value:`'attention'`},{name:`literal`,value:`'critical'`},{name:`literal`,value:`'info'`}],required:!0}}]},required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`unavailableReason`,value:{name:`string`,required:!1}}]}}],raw:`HomeWorkQueueEntry[]`,required:!1},description:`Patient-level preview for a non-Results work queue.`},{key:`action`,value:{name:`signature`,type:`object`,raw:`{ label: string; targetKey: string }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`targetKey`,value:{name:`string`,required:!0}}]},required:!1},description:`Outcome-labelled deep link into the owning surface's nav key.`}]}},description:``},onNavigate:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(targetKey: string) => void`,signature:{arguments:[{type:{name:`string`},name:`targetKey`}],return:{name:`void`}}},description:``},onRetry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(signalKey: string) => void`,signature:{arguments:[{type:{name:`string`},name:`signalKey`}],return:{name:`void`}}},description:``}}}}));export{P as n,M as t};