import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{c as n,i as r,o as i,p as a,s as o,u as s}from"./logic-CkaTFHtF.js";var c,l,u,d,f,p,m=e((()=>{c=`_sparkline_uw596_1`,l=`_band_uw596_7`,u=`_line_uw596_11`,d=`_pointDot_uw596_28`,f=`_latestDot_uw596_33`,p={sparkline:c,band:l,line:u,"sparkline-draw":`_sparkline-draw_uw596_1`,pointDot:d,latestDot:f}}));function h(...e){return e.filter(Boolean).join(` `)}function g(e){let t=r(e);return!t||t.severity===`normal`?`optimal`:t.severity===`critical`?`out`:`caution`}function _({className:e,result:t,...n}){let r=a(t).map(e=>({point:e,timestamp:s(e.date)})).filter(e=>e.timestamp!=null),c=r.filter(e=>e.point.value.kind===`numeric`);if(c.length<2)return null;let l=t.range?.tiers.filter(e=>e.severity===`normal`)??[],u=l.find(e=>e.lowerBound!=null)?.lowerBound??null,d=[...l].reverse().find(e=>e.upperBound!=null)?.upperBound??null,f=[...c.map(e=>e.point.value.kind===`numeric`?e.point.value.value:0),...u==null?[]:[u],...d==null?[]:[d]],m=Math.min(...f),_=Math.max(...f)-m||1,C=_*.16,w=e=>b-S-(e-(m-C))/(_+C*2)*(b-S*2),T=Math.min(...r.map(e=>e.timestamp)),E=Math.max(...r.map(e=>e.timestamp))-T,D=(e,t)=>E>0?x+(e-T)/E*(y-x*2):x+t/Math.max(r.length-1,1)*(y-x*2),O=r.map(({point:e,timestamp:t},n)=>({x:D(t,n),y:e.value.kind===`numeric`?w(e.value.value):null,date:e.date,label:o(e.value)})),k=[],A=[];for(let e of O)e.y==null?(A.length>1&&k.push(A),A=[]):A.push(e);A.length>1&&k.push(A);let j=d==null?S:w(d),M=u==null?b-S:w(u),N=[...O].reverse().find(e=>e.y!=null),P=r.map(({point:e})=>`${i(e.date)}: ${o(e.value)}`).join(`, `);return(0,v.jsx)(`span`,{...n,className:h(p.sparkline,e),"data-slot":`lab-sparkline`,children:(0,v.jsxs)(`svg`,{viewBox:`0 0 ${y} ${b}`,width:y,height:b,role:`img`,"aria-label":`${t.name} trend — ${P}`,children:[l.length>0?(0,v.jsx)(`rect`,{className:p.band,x:x-2,width:88,y:Math.min(j,M),height:Math.max(2,Math.abs(M-j)),rx:2}):null,k.map((e,t)=>(0,v.jsx)(`polyline`,{className:p.line,pathLength:1,points:e.map(e=>`${e.x},${e.y}`).join(` `)},t)),O.map((e,n)=>e.y==null?null:e===N?(0,v.jsx)(`circle`,{className:p.latestDot,"data-tone":g(t),cx:e.x,cy:e.y,r:3},`${e.date??`unknown`}-${n}`):(0,v.jsx)(`circle`,{className:p.pointDot,cx:e.x,cy:e.y,r:1.7},`${e.date??`unknown`}-${n}`))]})})}var v,y,b,x,S,C=e((()=>{v=t(),n(),m(),y=100,b=26,x=8,S=5,_.__docgenInfo={description:``,methods:[],displayName:`LabSparkline`,props:{result:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
| { kind: 'missing' }`,elements:[{name:`signature`,type:`object`,raw:`{ kind: 'numeric'; value: number; display?: string }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'numeric'`,required:!0}},{key:`value`,value:{name:`number`,required:!0}},{key:`display`,value:{name:`string`,required:!1}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'text'; value: string }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'text'`,required:!0}},{key:`value`,value:{name:`string`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'missing' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'missing'`,required:!0}}]}}],required:!0}},{key:`episodeId`,value:{name:`string`,required:!0}},{key:`episodeLabel`,value:{name:`string`,required:!0}},{key:`testId`,value:{name:`string`,required:!1}},{key:`sourceLabel`,value:{name:`string`,required:!1}}]}}],raw:`LabResultPoint[]`,required:!1}},{key:`observedAt`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`releasedAt`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}}]}},description:``}}}}));export{C as n,_ as t};