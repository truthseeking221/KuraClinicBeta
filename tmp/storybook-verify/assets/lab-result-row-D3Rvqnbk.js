import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{l as n,p as r,pt as i}from"./provider-marks-BeHzyBjc.js";import{t as a}from"./icons-C5MW4nvJ.js";import{a as o,o as s}from"./collapsible-Cfc9M9oP.js";import{c,d as l,g as u,i as d,s as f,t as p}from"./logic-CkaTFHtF.js";import{n as m,t as h}from"./lab-draw-strip-DDXi0txS.js";import{n as g,t as _}from"./lab-range-band-BVLLXP1-.js";var v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P=e((()=>{v=`_row_e41th_5`,y=`_identity_e41th_28`,b=`_nameLine_e41th_35`,x=`_name_e41th_35`,S=`_panelName_e41th_52`,C=`_valueLine_e41th_58`,w=`_value_e41th_58`,T=`_unit_e41th_85`,E=`_statusLine_e41th_92`,D=`_flagLabel_e41th_101`,O=`_reference_e41th_117`,k=`_provenance_e41th_121`,A=`_evidence_e41th_125`,j=`_trendLabel_e41th_137`,M=`_action_e41th_154`,N={row:v,identity:y,nameLine:b,name:x,panelName:S,valueLine:C,value:w,unit:T,statusLine:E,flagLabel:D,reference:O,provenance:k,evidence:A,trendLabel:j,action:M}}));function F(...e){return e.filter(Boolean).join(` `)}function I(e){return e!==`latest`&&e!==`first-visit`}function L(e){return e.direction===`improving`?`Improving`:e.direction===`worsening`?`Worsening`:`Stable`}function R({className:e,locale:t=`en-US`,mode:a=`auto`,result:s,trailing:c,...m}){if(s.status===`dismissed`)return null;let g=s.status===`released`,v=g?d(s):null,y=g?u(s):null,b=l(s.range),x=p[s.status],S=v?.severity??null,C=S===`critical`?`out`:S===`abnormal`?`caution`:g?`optimal`:void 0,w=null;g&&(w=s.range?.valueType===`qn`?(0,z.jsx)(_,{range:s.range,value:s.value}):(0,z.jsx)(h,{result:s,locale:t,maxDraws:a===`latest`?1:6}));let T=g&&y&&I(a)?(0,z.jsxs)(`span`,{className:N.trendLabel,"data-direction":y.direction,children:[y.direction===`stable`?(0,z.jsx)(i,{size:16,"aria-hidden":`true`}):y.delta!=null&&y.delta>0?(0,z.jsx)(r,{size:16,"aria-hidden":`true`}):(0,z.jsx)(n,{size:16,"aria-hidden":`true`}),L(y)]}):null,E=s.status===`cancelled`;return(0,z.jsxs)(`div`,{...m,className:F(N.row,e),"data-slot":`lab-result-row`,"data-status":s.status,"data-severity":S??void 0,children:[(0,z.jsxs)(`div`,{className:N.identity,children:[(0,z.jsxs)(`div`,{className:N.nameLine,children:[(0,z.jsx)(`p`,{className:N.name,children:s.name}),s.panelName?(0,z.jsx)(`span`,{className:N.panelName,children:s.panelName}):null]}),(0,z.jsx)(`div`,{className:N.valueLine,children:g?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`span`,{className:N.value,"data-tone":C,children:f(s.value)}),s.unit?(0,z.jsx)(`span`,{className:N.unit,children:s.unit}):null]}):(0,z.jsx)(o,{size:`sm`,variant:E?`neutral`:B[s.status]??`neutral`,children:x.label})}),(0,z.jsxs)(`div`,{className:N.statusLine,children:[g&&v?(0,z.jsx)(`span`,{className:N.flagLabel,"data-tone":C,children:v.label}):null,(0,z.jsx)(`span`,{className:N.reference,children:g?b?`Reference ${b}`:s.range?.valueType===`ord`||s.range?.valueType===`semi_qn`?`Qualitative result`:`No applicable reference`:x.description}),g&&s.verificationMode===`crelio_flagged`?(0,z.jsx)(`span`,{className:N.provenance,children:`Lab-flagged`}):null,g&&s.verificationMode===`manual`?(0,z.jsx)(`span`,{className:N.provenance,children:`Manually verified`}):null]})]}),(0,z.jsxs)(`div`,{className:N.evidence,children:[w,T]}),(0,z.jsx)(`div`,{className:N.action,children:c})]})}var z,B,V=e((()=>{z=t(),s(),a(),c(),m(),g(),P(),B={manual_review:`warning`},R.__docgenInfo={description:``,methods:[],displayName:`LabResultRow`,props:{result:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
| { kind: 'missing' }`,elements:[{name:`signature`,type:`object`,raw:`{ kind: 'numeric'; value: number; display?: string }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'numeric'`,required:!0}},{key:`value`,value:{name:`number`,required:!0}},{key:`display`,value:{name:`string`,required:!1}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'text'; value: string }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'text'`,required:!0}},{key:`value`,value:{name:`string`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'missing' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'missing'`,required:!0}}]}}],required:!0}},{key:`episodeId`,value:{name:`string`,required:!0}},{key:`episodeLabel`,value:{name:`string`,required:!0}},{key:`testId`,value:{name:`string`,required:!1}},{key:`sourceLabel`,value:{name:`string`,required:!1}}]}}],raw:`LabResultPoint[]`,required:!1}},{key:`observedAt`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`releasedAt`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}}]}},description:``},mode:{required:!1,tsType:{name:`union`,raw:`'auto' | 'first-visit' | 'latest' | 'trend'`,elements:[{name:`literal`,value:`'auto'`},{name:`literal`,value:`'first-visit'`},{name:`literal`,value:`'latest'`},{name:`literal`,value:`'trend'`}]},description:``,defaultValue:{value:`'auto'`,computed:!1}},locale:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'en-US'`,computed:!1}},trailing:{required:!1,tsType:{name:`ReactNode`},description:``}}}}));export{V as n,R as t};