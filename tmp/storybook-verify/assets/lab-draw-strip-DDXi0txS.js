import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{c as n,f as r,h as i,o as a,p as o,s}from"./logic-CkaTFHtF.js";var c,l,u,d,f,p,m,h,g=e((()=>{c=`_strip_18g87_1`,l=`_cell_18g87_8`,u=`_earlier_18g87_9`,d=`_date_18g87_33`,f=`_episode_18g87_34`,p=`_value_18g87_45`,m=`_dot_18g87_71`,h={strip:c,cell:l,earlier:u,date:d,episode:f,value:p,dot:m}}));function _(...e){return e.filter(Boolean).join(` `)}function v({className:e,locale:t=`en-US`,maxDraws:n=6,result:c,...l}){let u=o(c),d=Math.max(0,u.length-n),f=u.slice(-n);return f.length===0?null:(0,y.jsxs)(`div`,{...l,className:_(h.strip,e),"data-slot":`lab-draw-strip`,role:`list`,"aria-label":`${c.name} by draw`,children:[d>0?(0,y.jsxs)(`div`,{className:h.earlier,role:`listitem`,children:[d,` earlier`]}):null,f.map((e,n)=>{let o=e.value.kind===`missing`,l=!o&&c.range?r(c.range,e.value):null,u=l?i(l.severity):void 0,d=n===f.length-1;return(0,y.jsxs)(`div`,{className:h.cell,"data-latest":d||void 0,"data-missing":o||void 0,role:`listitem`,children:[(0,y.jsx)(`span`,{className:h.date,children:a(e.date,t)}),(0,y.jsx)(`span`,{className:h.value,"data-tone":u,children:s(e.value)}),(0,y.jsx)(`span`,{className:h.episode,children:e.episodeLabel}),(0,y.jsx)(`span`,{className:h.dot,"data-tone":u,"data-missing":o||void 0,"aria-hidden":`true`})]},`${e.episodeId}-${e.date??`unknown`}-${n}`)})]})}var y,b=e((()=>{y=t(),n(),g(),v.__docgenInfo={description:`Draw-by-draw history for qualitative, sparse, or non-temporal series.
Missing observations remain explicit and capped histories disclose how many
older observations were not rendered.`,methods:[],displayName:`LabDrawStrip`,props:{result:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
| { kind: 'missing' }`,elements:[{name:`signature`,type:`object`,raw:`{ kind: 'numeric'; value: number; display?: string }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'numeric'`,required:!0}},{key:`value`,value:{name:`number`,required:!0}},{key:`display`,value:{name:`string`,required:!1}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'text'; value: string }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'text'`,required:!0}},{key:`value`,value:{name:`string`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'missing' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'missing'`,required:!0}}]}}],required:!0}},{key:`episodeId`,value:{name:`string`,required:!0}},{key:`episodeLabel`,value:{name:`string`,required:!0}},{key:`testId`,value:{name:`string`,required:!1}},{key:`sourceLabel`,value:{name:`string`,required:!1}}]}}],raw:`LabResultPoint[]`,required:!1}},{key:`observedAt`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`releasedAt`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}}]}},description:``},locale:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'en-US'`,computed:!1}},maxDraws:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`6`,computed:!1}}}}}));export{b as n,v as t};