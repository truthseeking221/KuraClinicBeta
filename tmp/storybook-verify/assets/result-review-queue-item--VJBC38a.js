import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{T as n}from"./provider-marks-BeHzyBjc.js";import{an as r,dn as i,in as a,ln as o,nn as s,rn as c,t as l}from"./ui-C9kmmzkH.js";import{a as u,r as d}from"./skeleton-yGvKPj3C.js";import{a as f}from"./collapsible-Cfc9M9oP.js";import{a as p,c as m}from"./logic-CkaTFHtF.js";var h,g,_,v,y,b,x,S,C=e((()=>{h=`_item_1sqms_1`,g=`_description_1sqms_11`,_=`_avatar_1sqms_17`,v=`_resultMeta_1sqms_22`,y=`_unavailable_1sqms_26`,b=`_actions_1sqms_31`,x=`_chevron_1sqms_35`,S={item:h,description:g,avatar:_,resultMeta:v,unavailable:y,actions:b,chevron:x}}));function w(e){return e.trim().split(/\s+/).slice(0,2).map(e=>e[0]?.toUpperCase()??``).join(``)}function T({disabled:e=!1,entry:t,href:l=`#result-review-${t.id}`,onOpen:m,unavailableReason:h}){let g=t.status===`routine`?null:D[t.status];return(0,E.jsxs)(s,{as:`a`,className:S.item,disabled:e,href:l,onClick:n=>{e||!m||(n.preventDefault(),m(t))},size:`sm`,children:[(0,E.jsx)(o,{children:(0,E.jsx)(d,{"aria-hidden":`true`,className:S.avatar,fallbackTone:`neutral`,size:`sm`,children:(0,E.jsx)(u,{children:w(t.patient.name)})})}),(0,E.jsxs)(a,{children:[(0,E.jsx)(i,{children:t.patient.name}),(0,E.jsxs)(r,{className:S.description,children:[(0,E.jsxs)(`span`,{children:[`MRN `,t.patient.medicalRecordNumber,` · DOB `,p(t.patient.dob,`en-GB`)]}),(0,E.jsxs)(`span`,{className:S.resultMeta,children:[t.testName,` · Returned `,t.returnedLabel]}),e&&h?(0,E.jsx)(`span`,{className:S.unavailable,children:h}):null]})]}),(0,E.jsxs)(c,{className:S.actions,children:[g?(0,E.jsx)(f,{appearance:`soft`,size:`sm`,variant:g.variant,children:g.label}):null,e?null:(0,E.jsx)(n,{"aria-hidden":`true`,className:S.chevron,size:14})]})]})}var E,D,O=e((()=>{E=t(),l(),m(),C(),D={abnormal:{label:`Abnormal`,variant:`warning`},critical:{label:`Critical`,variant:`danger`},amended:{label:`Amended`,variant:`info`}},T.__docgenInfo={description:`Cross-patient result-review navigation. Patient identity stays primary;
analyte detail remains owned by the per-patient Results workspace.`,methods:[],displayName:`ResultReviewQueueItem`,props:{entry:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`dob`,value:{name:`string`,required:!0}},{key:`sexAtBirth`,value:{name:`string`,required:!0}},{key:`medicalRecordNumber`,value:{name:`string`,required:!0}}]},required:!0}},{key:`testName`,value:{name:`string`,required:!0}},{key:`returnedLabel`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`'routine' | 'abnormal' | 'critical' | 'amended'`,elements:[{name:`literal`,value:`'routine'`},{name:`literal`,value:`'abnormal'`},{name:`literal`,value:`'critical'`},{name:`literal`,value:`'amended'`}],required:!0}}]}},description:``},href:{required:!1,tsType:{name:`string`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},unavailableReason:{required:!1,tsType:{name:`string`},description:``},onOpen:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(entry: ResultReviewQueueEntry) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`dob`,value:{name:`string`,required:!0}},{key:`sexAtBirth`,value:{name:`string`,required:!0}},{key:`medicalRecordNumber`,value:{name:`string`,required:!0}}]},required:!0}},{key:`testName`,value:{name:`string`,required:!0}},{key:`returnedLabel`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`'routine' | 'abnormal' | 'critical' | 'amended'`,elements:[{name:`literal`,value:`'routine'`},{name:`literal`,value:`'abnormal'`},{name:`literal`,value:`'critical'`},{name:`literal`,value:`'amended'`}],required:!0}}]}},name:`entry`}],return:{name:`void`}}},description:``}}}}));export{O as n,T as t};