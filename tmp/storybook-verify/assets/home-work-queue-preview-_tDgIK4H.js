import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{T as n}from"./provider-marks-BeHzyBjc.js";import{an as r,dn as i,in as a,ln as o,nn as s,rn as c,sn as l,t as u}from"./ui-C9kmmzkH.js";import{a as d,r as f,t as p}from"./skeleton-yGvKPj3C.js";import{t as m}from"./button-B6_zsN5-.js";import{a as h}from"./collapsible-Cfc9M9oP.js";var g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P=e((()=>{g=`_preview_krgxk_1`,_=`_header_krgxk_8`,v=`_title_krgxk_15`,y=`_messageText_krgxk_16`,b=`_message_krgxk_16`,x=`_item_krgxk_28`,S=`_loadingItem_krgxk_29`,C=`_description_krgxk_39`,w=`_avatar_krgxk_45`,T=`_reason_krgxk_50`,E=`_unavailable_krgxk_54`,D=`_actions_krgxk_59`,O=`_chevron_krgxk_63`,k=`_viewAll_krgxk_89`,A=`_avatarSkeleton_krgxk_110`,j=`_nameSkeleton_krgxk_115`,M=`_detailSkeleton_krgxk_119`,N={preview:g,header:_,title:v,messageText:y,message:b,item:x,loadingItem:S,description:C,avatar:w,reason:T,unavailable:E,actions:D,chevron:O,viewAll:k,avatarSkeleton:A,nameSkeleton:j,detailSkeleton:M}}));function F(e){return e.trim().split(/\s+/).slice(0,2).map(e=>e[0]?.toUpperCase()??``).join(``)}function I(e){let t=new Date(`${e}T00:00:00Z`);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat(`en-GB`,{day:`numeric`,month:`short`,timeZone:`UTC`,year:`numeric`}).format(t)}function L({entry:e,onOpen:t,targetKey:l}){return(0,z.jsxs)(s,{as:`a`,className:N.item,disabled:e.disabled,href:`#${l}/${e.patient.id}/${e.id}`,onClick:n=>{e.disabled||!t||(n.preventDefault(),t(l,e))},size:`sm`,children:[(0,z.jsx)(o,{children:(0,z.jsx)(f,{"aria-hidden":`true`,className:N.avatar,fallbackTone:`neutral`,size:`sm`,children:(0,z.jsx)(d,{children:F(e.patient.name)})})}),(0,z.jsxs)(a,{children:[(0,z.jsx)(i,{children:e.patient.name}),(0,z.jsxs)(r,{className:N.description,children:[(0,z.jsxs)(`span`,{children:[`MRN `,e.patient.medicalRecordNumber,` · DOB `,I(e.patient.dob)]}),(0,z.jsx)(`span`,{className:N.reason,children:e.reason}),e.context?(0,z.jsx)(`span`,{children:e.context}):null,e.disabled&&e.unavailableReason?(0,z.jsx)(`span`,{className:N.unavailable,children:e.unavailableReason}):null]})]}),(0,z.jsxs)(c,{className:N.actions,children:[e.status?(0,z.jsx)(h,{appearance:`soft`,size:`sm`,variant:B[e.status.tone],children:e.status.label}):null,e.disabled?null:(0,z.jsx)(n,{"aria-hidden":`true`,className:N.chevron,size:14})]})]})}function R({onNavigate:e,onOpenItem:t,onRetry:r,signal:i}){let o=`home-${i.key}-queue-title`,c=i.action?.targetKey??i.key,u=i.workItems??[];return(0,z.jsxs)(`section`,{"aria-labelledby":o,className:N.preview,children:[(0,z.jsxs)(`header`,{className:N.header,children:[(0,z.jsx)(`h3`,{className:N.title,id:o,children:i.title}),(0,z.jsx)(h,{appearance:`soft`,size:`sm`,variant:`neutral`,children:i.count??0})]}),i.state===`loading`?(0,z.jsx)(l,{"aria-hidden":`true`,children:[0,1,2].map(e=>(0,z.jsxs)(s,{className:N.loadingItem,size:`sm`,children:[(0,z.jsx)(p,{className:N.avatarSkeleton,shape:`circle`}),(0,z.jsxs)(a,{children:[(0,z.jsx)(p,{className:N.nameSkeleton,shape:`text`}),(0,z.jsx)(p,{className:N.detailSkeleton,shape:`text`})]})]},e))}):null,i.state===`error`?(0,z.jsxs)(`div`,{className:N.message,children:[(0,z.jsx)(`p`,{children:i.errorMessage??`${i.title} could not load.`}),(0,z.jsx)(m,{onClick:()=>r?.(i.key),variant:`outline`,children:`Retry`})]}):null,i.state===`ready`&&u.length>0?(0,z.jsx)(l,{"aria-label":`${i.title} work queue`,role:`list`,children:u.map(n=>(0,z.jsx)(`div`,{role:`listitem`,children:(0,z.jsx)(L,{entry:n,onOpen:t||e?(n,r)=>{if(t){t(n,r);return}e?.(n)}:void 0,targetKey:c})},n.id))}):null,i.state===`ready`&&u.length===0?(0,z.jsx)(`p`,{className:N.messageText,children:(i.count??0)>0?`Patient details are unavailable. Open ${i.title} to continue.`:i.detail}):null,i.state===`ready`&&i.action?(0,z.jsxs)(`a`,{className:N.viewAll,href:`#${c}`,onClick:t=>{e&&(t.preventDefault(),e(c))},children:[i.action.label,(0,z.jsx)(n,{"aria-hidden":`true`,size:14})]}):null]})}var z,B,V=e((()=>{z=t(),u(),P(),B={neutral:`neutral`,attention:`warning`,critical:`danger`,info:`info`},R.__docgenInfo={description:`A patient-identifiable Home preview that routes work into its owning surface.`,methods:[],displayName:`HomeWorkQueuePreview`,props:{signal:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`medicalRecordNumber`,value:{name:`string`,required:!0}},{key:`dob`,value:{name:`string`,required:!0}}]},required:!0}},{key:`reason`,value:{name:`string`,required:!0},description:`The work that needs attention, with timing when it changes priority.`},{key:`context`,value:{name:`string`,required:!1},description:`Supporting context that helps disambiguate the work item.`},{key:`status`,value:{name:`signature`,type:`object`,raw:`{ label: string; tone: HomeWorkQueueTone }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`tone`,value:{name:`union`,raw:`'neutral' | 'attention' | 'critical' | 'info'`,elements:[{name:`literal`,value:`'neutral'`},{name:`literal`,value:`'attention'`},{name:`literal`,value:`'critical'`},{name:`literal`,value:`'info'`}],required:!0}}]},required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`unavailableReason`,value:{name:`string`,required:!1}}]}}],raw:`HomeWorkQueueEntry[]`,required:!1},description:`Patient-level preview for a non-Results work queue.`},{key:`action`,value:{name:`signature`,type:`object`,raw:`{ label: string; targetKey: string }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`targetKey`,value:{name:`string`,required:!0}}]},required:!1},description:`Outcome-labelled deep link into the owning surface's nav key.`}]}},description:``},onNavigate:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(targetKey: string) => void`,signature:{arguments:[{type:{name:`string`},name:`targetKey`}],return:{name:`void`}}},description:``},onOpenItem:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(targetKey: string, entry: HomeWorkQueueEntry) => void`,signature:{arguments:[{type:{name:`string`},name:`targetKey`},{type:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`medicalRecordNumber`,value:{name:`string`,required:!0}},{key:`dob`,value:{name:`string`,required:!0}}]},required:!0}},{key:`reason`,value:{name:`string`,required:!0},description:`The work that needs attention, with timing when it changes priority.`},{key:`context`,value:{name:`string`,required:!1},description:`Supporting context that helps disambiguate the work item.`},{key:`status`,value:{name:`signature`,type:`object`,raw:`{ label: string; tone: HomeWorkQueueTone }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`tone`,value:{name:`union`,raw:`'neutral' | 'attention' | 'critical' | 'info'`,elements:[{name:`literal`,value:`'neutral'`},{name:`literal`,value:`'attention'`},{name:`literal`,value:`'critical'`},{name:`literal`,value:`'info'`}],required:!0}}]},required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`unavailableReason`,value:{name:`string`,required:!1}}]}},name:`entry`}],return:{name:`void`}}},description:``},onRetry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(signalKey: string) => void`,signature:{arguments:[{type:{name:`string`},name:`signalKey`}],return:{name:`void`}}},description:``}}}}));export{V as n,R as t};