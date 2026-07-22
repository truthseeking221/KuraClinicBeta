import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{C as i,It as a,Kt as o,T as s,_t as c,h as l,x as u,xt as d}from"./provider-marks-BeHzyBjc.js";import{Gn as f,In as ee,It as te,Mn as ne,Pn as re,t as p}from"./ui-C9kmmzkH.js";import{a as ie,r as ae,t as oe}from"./skeleton-yGvKPj3C.js";import{d as se}from"./date-range-picker-CVkMECHY.js";import{t as ce}from"./close-button-DdqBitN8.js";import{i as m,n as le,r as h,t as g}from"./alert-l7nmjmGJ.js";import{t as _}from"./button-B6_zsN5-.js";import{a as ue}from"./collapsible-Cfc9M9oP.js";import{t as de}from"./segmented-toggle-DDpNscFF.js";import{t as fe}from"./input-UaJWx_9h.js";import{n as pe,r as me,t as he}from"./resizable-BNOIaDoG.js";import{i as ge,n as _e,r as ve,t as ye}from"./tabs-C4OYmenm.js";import{i as be,o as xe,r as Se,t as Ce}from"./empty-state-DlAvBIIY.js";import{t as we}from"./shared-GnDiMTI0.js";import{i as Te,n as Ee,r as v}from"./demo-data-koyfmYWR.js";import{n as De,t as y}from"./patient-context-rail-BbMtd_Ir.js";import{n as Oe,t as ke}from"./lab-order-rail-iCyMWtNC.js";import{t as Ae}from"./lab-catalog-CBLfEJMT.js";import{S as je,o as Me}from"./demo-data-lOaHj2eX.js";import{t as Ne}from"./lab-flowsheet-BS_KL8xg.js";import{t as Pe}from"./results-1KdpcDAl.js";import{n as Fe,t as Ie}from"./demo-data-DhwTGXzA.js";import{a as Le,c as Re,d as ze,f as Be,h as Ve,i as He,l as Ue,m as We,n as Ge,o as Ke,p as qe,r as Je,s as Ye,t as Xe,u as b,v as Ze,y as Qe}from"./storybook-metadata-CwrABL_1.js";import{a as $e,c as et,i as tt,n as nt,o as rt}from"./logic-A4a4di6M.js";import{n as it,t as at}from"./prescribe-flow-BouvioC6.js";function ot(e){return e.needsAttention===!0||e.status!==`completed`&&e.status!==`cancelled`}function st(e){return{active:e.map((e,t)=>({order:e,index:t})).filter(({order:e})=>ot(e)).sort((e,t)=>{let n=Number(t.order.needsAttention)-Number(e.order.needsAttention);return n===0?e.index-t.index:n}).map(({order:e})=>e),past:e.filter(e=>!ot(e))}}function ct(e,t){let n=t.trim().toLocaleLowerCase();return!n||[e.code,e.placedAtLabel,...e.lineItems.flatMap(e=>[e.code,e.displayName])].join(` `).toLocaleLowerCase().includes(n)}var lt=t((()=>{})),ut,dt,ft,pt,mt,ht,gt,_t,vt,yt,bt,xt,St,Ct,wt,Tt,Et,x,Dt=t((()=>{ut=`_panel_jtgsh_6`,dt=`_section_jtgsh_7`,ft=`_list_jtgsh_8`,pt=`_loading_jtgsh_9`,mt=`_statusState_jtgsh_10`,ht=`_sectionHeading_jtgsh_23`,gt=`_sectionTitle_jtgsh_34`,_t=`_order_jtgsh_48`,vt=`_head_jtgsh_63`,yt=`_code_jtgsh_70`,bt=`_placed_jtgsh_76`,xt=`_headStatus_jtgsh_81`,St=`_lines_jtgsh_88`,Ct=`_line_jtgsh_88`,wt=`_lineName_jtgsh_105`,Tt=`_lineCode_jtgsh_110`,Et=`_noMatches_jtgsh_117`,x={panel:ut,section:dt,list:ft,loading:pt,statusState:mt,sectionHeading:ht,sectionTitle:gt,order:_t,head:vt,code:yt,placed:bt,headStatus:xt,lines:St,line:Ct,lineName:wt,lineCode:Tt,noMatches:Et}}));function Ot({focusedOrderId:e,onRetry:t,orders:n,state:r=`ready`}){let[i,a]=(0,kt.useState)(``),[o,s]=(0,kt.useState)(5),c=(0,kt.useRef)(null),{active:l,past:u}=st(n),d=u.filter(e=>ct(e,i)),f=d.slice(0,o);if((0,kt.useEffect)(()=>{e&&c.current?.focus({preventScroll:!1})},[e]),r===`loading`)return(0,S.jsxs)(`div`,{"aria-busy":`true`,"aria-label":`Loading orders`,className:x.loading,role:`status`,children:[(0,S.jsx)(oe,{shape:`rectangle`,style:{blockSize:116,inlineSize:`100%`}}),(0,S.jsx)(oe,{shape:`rectangle`,style:{blockSize:116,inlineSize:`100%`}})]});if(r===`error`)return(0,S.jsxs)(`div`,{className:x.statusState,children:[(0,S.jsxs)(g,{tone:`danger`,children:[(0,S.jsx)(m,{children:`Couldn't load orders`}),(0,S.jsx)(h,{children:`Check your connection and try again.`})]}),t?(0,S.jsx)(_,{onClick:t,size:`sm`,variant:`secondary`,children:`Retry`}):null]});if(r===`permission-restricted`)return(0,S.jsxs)(g,{tone:`warning`,children:[(0,S.jsx)(m,{children:`Orders unavailable`}),(0,S.jsx)(h,{children:`You do not have permission to view this patient's orders.`})]});if(n.length===0)return(0,S.jsx)(Ce,{align:`center`,surface:`plain`,children:(0,S.jsxs)(be,{children:[(0,S.jsx)(xe,{children:`No orders yet`}),(0,S.jsx)(Se,{children:`Orders for this patient will appear here.`})]})});let ee=t=>{let n=At[t.status],r=e===t.ordId;return(0,S.jsxs)(`li`,{className:x.order,"data-focused":r||void 0,ref:r?c:void 0,tabIndex:r?-1:void 0,children:[(0,S.jsxs)(`div`,{className:x.head,children:[(0,S.jsx)(`span`,{className:x.code,children:t.code}),(0,S.jsx)(`span`,{className:x.placed,children:t.placedAtLabel}),(0,S.jsxs)(`span`,{className:x.headStatus,children:[t.needsAttention?(0,S.jsx)(ue,{variant:`warning`,children:`Needs attention`}):null,(0,S.jsx)(ue,{appearance:`soft`,variant:n.variant,children:n.label})]})]}),(0,S.jsx)(`ul`,{className:x.lines,children:t.lineItems.map(e=>(0,S.jsxs)(`li`,{className:x.line,children:[(0,S.jsx)(`span`,{className:x.lineName,children:e.displayName}),(0,S.jsx)(`span`,{className:x.lineCode,children:e.code})]},e.code))})]},t.ordId)};return(0,S.jsxs)(`div`,{className:x.panel,children:[l.length>0?(0,S.jsxs)(`section`,{"aria-labelledby":`active-orders-title`,className:x.section,children:[(0,S.jsx)(`h2`,{className:x.sectionTitle,id:`active-orders-title`,children:`Active orders`}),(0,S.jsx)(`ul`,{className:x.list,children:l.map(ee)})]}):null,u.length>0?(0,S.jsxs)(`section`,{"aria-labelledby":`past-orders-title`,className:x.section,children:[(0,S.jsxs)(`div`,{className:x.sectionHeading,children:[(0,S.jsx)(`h2`,{className:x.sectionTitle,id:`past-orders-title`,children:`Past orders`}),(0,S.jsx)(fe,{"aria-label":`Search past orders`,onChange:e=>{a(e.currentTarget.value),s(5)},placeholder:`Search past orders`,size:`sm`,type:`search`,value:i})]}),f.length>0?(0,S.jsx)(`ul`,{className:x.list,children:f.map(ee)}):(0,S.jsx)(`p`,{className:x.noMatches,children:`No past orders match this search.`}),d.length>f.length?(0,S.jsx)(_,{onClick:()=>s(e=>e+5),size:`sm`,variant:`secondary`,children:`Show more past orders`}):null]}):null]})}var S,kt,At,jt=t((()=>{S=r(),kt=e(n()),p(),we(),lt(),Dt(),At={placed:{label:`Placed`,variant:`info`},in_fulfillment:{label:`In fulfillment`,variant:`info`},partially_complete:{label:`Partially complete`,variant:`warning`},completed:{label:`Completed`,variant:`success`},cancelled:{label:`Cancelled`,variant:`neutral`}},Ot.__docgenInfo={description:`The patient's lab orders as the clinic BFF reports them: code, placement,
lifecycle status, and ordered tests. It is a read-only evidence surface;
new orders start from the governed action flow, not from history.`,methods:[],displayName:`OrdersPanel`,props:{orders:{required:!0,tsType:{name:`unknown`},description:``},state:{required:!1,tsType:{name:`union`,raw:`'ready' | 'loading' | 'error' | 'permission-restricted'`,elements:[{name:`literal`,value:`'ready'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'permission-restricted'`}]},description:`The record refresh state is distinct from the patient-chart shell state.`,defaultValue:{value:`'ready'`,computed:!1}},onRetry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},focusedOrderId:{required:!1,tsType:{name:`string`},description:`A successful placement directs attention here without making rows links.`}}}})),Mt,Nt,Pt,Ft,It,Lt,Rt,zt,Bt,Vt,Ht,Ut,Wt,Gt,Kt,qt,Jt,Yt,Xt,Zt,Qt,$t,en,tn,C,nn=t((()=>{Mt=`_chart_3hura_3`,Nt=`_workbar_3hura_12`,Pt=`_identity_3hura_25`,Ft=`_identityCopy_3hura_32`,It=`_nameRow_3hura_39`,Lt=`_name_3hura_39`,Rt=`_meta_3hura_54`,zt=`_rail_3hura_60`,Bt=`_workspaceRegion_3hura_79`,Vt=`_workspaceRegionFull_3hura_80`,Ht=`_resizableWorkspace_3hura_95`,Ut=`_work_3hura_12`,Wt=`_actionRail_3hura_113`,Gt=`_launcherHandle_3hura_128`,Kt=`_workflow_3hura_133`,qt=`_terminal_3hura_140`,Jt=`_stateFrame_3hura_152`,Yt=`_facts_3hura_161`,Xt=`_fact_3hura_161`,Zt=`_factLabel_3hura_176`,Qt=`_factValue_3hura_182`,$t=`_verify_3hura_189`,en=`_verifyHint_3hura_199`,tn=`_verifyControls_3hura_205`,C={chart:Mt,workbar:Nt,identity:Pt,identityCopy:Ft,nameRow:It,name:Lt,meta:Rt,rail:zt,workspaceRegion:Bt,workspaceRegionFull:Vt,resizableWorkspace:Ht,work:Ut,actionRail:Wt,launcherHandle:Gt,workflow:Kt,terminal:qt,stateFrame:Jt,facts:Yt,fact:Xt,factLabel:Zt,factValue:Qt,verify:$t,verifyHint:en,verifyControls:tn}}));function rn({label:e,value:t}){return(0,T.jsxs)(`div`,{className:C.fact,children:[(0,T.jsx)(`dt`,{className:C.factLabel,children:e}),(0,T.jsx)(`dd`,{className:C.factValue,children:t})]})}function an({onVerifyIdentity:e}){let[t,n]=(0,E.useState)(`KH_NID`);return(0,T.jsxs)(`div`,{className:C.verify,children:[(0,T.jsx)(`p`,{className:C.verifyHint,children:`Sight the patient's document to verify their identity. The document number is not recorded.`}),(0,T.jsxs)(`div`,{className:C.verifyControls,children:[(0,T.jsx)(de,{label:`Document type`,onValueChange:e=>n(e),options:sn,value:t}),(0,T.jsx)(_,{onClick:()=>e(t),size:`sm`,variant:`primary`,children:`Verify identity`})]})]})}function on({actionRail:e,actionRailMode:t,children:n,fullWidth:r}){let i=(0,E.useRef)(null),a=(0,E.useRef)(null),[o,s]=(0,E.useState)(!1),[c,l]=(0,E.useState)(!1),u=!!e&&t===`workspace`;(0,E.useEffect)(()=>{let t=i.current;if(!t||!e||typeof ResizeObserver>`u`)return;let n=()=>{s(t.clientWidth<=768),l(t.clientWidth<(u?960:800))};n();let r=new ResizeObserver(n);return r.observe(t),()=>r.disconnect()},[e,u]),(0,E.useEffect)(()=>{a.current&&a.current.resize(c?u?`44%`:`35%`:u?520:320)},[u,c]);let d=r?`${C.workspaceRegion} ${C.workspaceRegionFull}`:C.workspaceRegion;if(!e)return(0,T.jsx)(`div`,{className:d,ref:i,children:(0,T.jsx)(`div`,{className:C.work,children:n})});if(o)return(0,T.jsxs)(`div`,{className:d,"data-mobile-layout":!0,"data-workspace-rail":u||void 0,ref:i,children:[(0,T.jsx)(`div`,{className:C.work,children:n}),(0,T.jsx)(`aside`,{"aria-label":u?`Clinical action workspace`:`Patient actions`,className:C.actionRail,children:e})]});let f=c?`vertical`:`horizontal`;return(0,T.jsx)(`div`,{className:d,"data-stacked":c||void 0,"data-workspace-rail":u||void 0,ref:i,children:(0,T.jsxs)(me,{className:C.resizableWorkspace,orientation:f,children:[(0,T.jsx)(pe,{defaultSize:c?`56%`:void 0,id:`patient-chart-evidence`,minSize:c?u?`35%`:`50%`:480,children:(0,T.jsx)(`div`,{className:C.work,children:n})}),(0,T.jsx)(he,{"aria-label":u?`Resize patient chart and action workspace`:`Patient chart and action rail boundary`,className:u?void 0:C.launcherHandle,disabled:!u,showIndicator:u}),(0,T.jsx)(pe,{defaultSize:c?u?`44%`:`35%`:u?520:320,groupResizeBehavior:c?`preserve-relative-size`:`preserve-pixel-size`,id:`patient-chart-action-workspace`,maxSize:c?u?`65%`:`50%`:u?560:320,minSize:c?u?`35%`:`25%`:u?400:320,panelRef:a,children:(0,T.jsx)(`aside`,{"aria-label":u?`Clinical action workspace`:`Patient actions`,className:C.actionRail,children:e})})]})})}function w({actionRail:e,actionRailMode:t=`launcher`,defaultTab:n=`overview`,onBack:r,onOpenMergedRecord:a,onRetry:o,onRetryOrders:s,onSwitchPatient:c,onTabChange:l,onVerifyIdentity:u,orders:d=[],ordersState:te=`ready`,patient:p,patients:ce,rail:le,results:de,selectedTab:fe,state:pe=`ready`,workflow:me,focusedOrderId:he}){let[we,Te]=(0,E.useState)(n),Ee=fe??we,v=st(d).active.length,De=e=>{let t=e;fe===void 0&&Te(t),l?.(t)};if(pe===`loading`)return(0,T.jsxs)(`div`,{"aria-busy":`true`,"aria-label":`Loading patient`,className:C.stateFrame,role:`status`,children:[(0,T.jsx)(oe,{shape:`rectangle`,style:{blockSize:72,inlineSize:`100%`}}),(0,T.jsx)(oe,{shape:`rectangle`,style:{blockSize:240,inlineSize:`100%`}})]});if(pe===`not-found`)return(0,T.jsx)(`div`,{className:C.stateFrame,children:(0,T.jsxs)(Ce,{align:`center`,surface:`plain`,children:[(0,T.jsxs)(be,{children:[(0,T.jsx)(xe,{children:`Patient not found`}),(0,T.jsx)(Se,{children:`This record does not exist or is not part of this workspace.`})]}),r?(0,T.jsx)(_,{onClick:r,size:`sm`,variant:`secondary`,children:`Back to patients`}):null]})});if(pe===`error`)return(0,T.jsxs)(`div`,{className:C.stateFrame,children:[(0,T.jsxs)(g,{tone:`danger`,children:[(0,T.jsx)(m,{children:`Couldn't load this patient`}),(0,T.jsx)(h,{children:`Check your connection and try again.`})]}),o?(0,T.jsx)(_,{onClick:o,size:`sm`,variant:`secondary`,children:`Try again`}):null]});let y=et(p),Oe=y.kind===`terminal`,ke=[tt(p),p.mrnMasked?`MRN ${p.mrnMasked}`:``].filter(Boolean).join(` · `),Ae=(ce??[]).filter(e=>e.userId!==p.userId),je=!!e&&!Oe&&!me;return(0,T.jsxs)(`div`,{className:C.chart,"data-action-rail":je?t:void 0,children:[(0,T.jsx)(`header`,{className:C.workbar,children:(0,T.jsxs)(`div`,{className:C.identity,children:[(0,T.jsx)(ae,{shape:`circle`,size:`md`,children:(0,T.jsx)(ie,{children:rt(p)})}),(0,T.jsxs)(`div`,{className:C.identityCopy,children:[(0,T.jsxs)(`div`,{className:C.nameRow,children:[(0,T.jsx)(`h1`,{className:C.name,children:nt(p)}),y.kind===`terminal`?(0,T.jsx)(ue,{variant:`neutral`,children:y.label}):y.assurance===`unverified`?(0,T.jsx)(ue,{variant:`warning`,children:`Unverified`}):null,c&&Ae.length>0?(0,T.jsxs)(ne,{children:[(0,T.jsx)(f,{asChild:!0,children:(0,T.jsx)(se,{"aria-label":`Switch patient`,size:`micro`,children:(0,T.jsx)(i,{"aria-hidden":`true`,size:16})})}),(0,T.jsx)(re,{align:`start`,children:Ae.map(e=>(0,T.jsx)(ee,{onClick:()=>c(e.userId),children:nt(e)},e.userId))})]}):null]}),ke?(0,T.jsx)(`p`,{className:C.meta,children:ke}):null]})]})}),Oe?(0,T.jsxs)(`div`,{className:C.terminal,children:[(0,T.jsxs)(g,{tone:y.status===`deceased`?`neutral`:`info`,children:[(0,T.jsx)(m,{children:y.status===`deceased`?`This patient is deceased`:`This record was merged`}),(0,T.jsx)(h,{children:y.status===`deceased`?`The record is closed to new clinical work.`:`All information now lives on the current record.`})]}),y.status===`merged`&&a?(0,T.jsx)(_,{onClick:a,size:`sm`,variant:`primary`,children:`Open current record`}):null]}):(0,T.jsxs)(T.Fragment,{children:[le?(0,T.jsx)(`div`,{className:C.rail,children:le}):null,(0,T.jsx)(on,{actionRail:je?e:void 0,actionRailMode:t,fullWidth:!le,children:me?(0,T.jsx)(`div`,{className:C.workflow,children:me}):(0,T.jsxs)(ye,{onValueChange:De,value:Ee,children:[(0,T.jsxs)(ve,{"aria-label":`Patient chart sections`,children:[(0,T.jsx)(ge,{value:`overview`,children:`Overview`}),(0,T.jsx)(ge,{"aria-label":v>0?`Orders, ${v} active`:`Orders`,count:v>0?v:void 0,value:`orders`,children:`Orders`}),(0,T.jsx)(ge,{value:`results`,children:`Results`})]}),(0,T.jsxs)(_e,{value:`overview`,children:[(0,T.jsxs)(`dl`,{className:C.facts,children:[(0,T.jsx)(rn,{label:`Phone`,value:p.phoneMasked||(0,T.jsx)(`span`,{"aria-hidden":`true`,children:`—`})}),(0,T.jsx)(rn,{label:`Identity`,value:y.kind===`assurance`&&y.assurance===`unverified`?(0,T.jsx)(ue,{variant:`warning`,children:`Unverified`}):`Verified`})]}),y.kind===`assurance`&&y.assurance===`unverified`&&u?(0,T.jsx)(an,{onVerifyIdentity:u}):null]}),(0,T.jsx)(_e,{value:`orders`,children:(0,T.jsx)(Ot,{focusedOrderId:he,onRetry:s,orders:d,state:te})}),(0,T.jsx)(_e,{value:`results`,children:de??(0,T.jsx)(Ce,{align:`center`,surface:`plain`,children:(0,T.jsxs)(be,{children:[(0,T.jsx)(xe,{children:`No reportable results yet`}),(0,T.jsx)(Se,{children:`Released results appear here as soon as the lab makes them available.`})]})})})]})})]})]})}var T,E,sn,cn=t((()=>{T=r(),E=e(n()),p(),we(),jt(),$e(),lt(),nn(),sn=[{value:`KH_NID`,label:`KH National ID`},{value:`PASSPORT`,label:`Passport`},{value:`OTHER`,label:`Other`}],w.__docgenInfo={description:`The patient chart shell: a pinned identity bar over a persistent context
rail and a tabbed work area. Deceased and merged records block clinical
work before any tab renders.`,methods:[],displayName:`PatientChart`,props:{patient:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  userId: string;
  /** Decrypted display name; empty when the record is crypto-shredded. */
  displayName: string;
  sexAtBirth: PatientSex;
  /** Derived server-side from date or year of birth; 0 when unknown. */
  age: number;
  hasAge: boolean;
  /** \`··\` + last two digits of the provisional code; empty when none. */
  mrnMasked: string;
  /** \`+XX*****1234\`; empty when no verified primary phone. */
  phoneMasked: string;
  assurance: PatientAssurance;
  /** '' | 'deceased' | 'merged' — terminal states outrank assurance. */
  status: PatientTerminalStatus;
  /**
   * True when the per-patient encryption key was destroyed: the record
   * exists but its name and phone can never be revealed again.
   */
  shredded?: boolean;
}`,signature:{properties:[{key:`userId`,value:{name:`string`,required:!0}},{key:`displayName`,value:{name:`string`,required:!0},description:`Decrypted display name; empty when the record is crypto-shredded.`},{key:`sexAtBirth`,value:{name:`union`,raw:`'M' | 'F' | 'Unknown'`,elements:[{name:`literal`,value:`'M'`},{name:`literal`,value:`'F'`},{name:`literal`,value:`'Unknown'`}],required:!0}},{key:`age`,value:{name:`number`,required:!0},description:`Derived server-side from date or year of birth; 0 when unknown.`},{key:`hasAge`,value:{name:`boolean`,required:!0}},{key:`mrnMasked`,value:{name:`string`,required:!0},description:"`··` + last two digits of the provisional code; empty when none."},{key:`phoneMasked`,value:{name:`string`,required:!0},description:"`+XX*****1234`; empty when no verified primary phone."},{key:`assurance`,value:{name:`union`,raw:`'unverified' | 'verified'`,elements:[{name:`literal`,value:`'unverified'`},{name:`literal`,value:`'verified'`}],required:!0}},{key:`status`,value:{name:`union`,raw:`'' | 'deceased' | 'merged'`,elements:[{name:`literal`,value:`''`},{name:`literal`,value:`'deceased'`},{name:`literal`,value:`'merged'`}],required:!0},description:`'' | 'deceased' | 'merged' — terminal states outrank assurance.`},{key:`shredded`,value:{name:`boolean`,required:!1},description:`True when the per-patient encryption key was destroyed: the record
exists but its name and phone can never be revealed again.`}]}},description:``},patients:{required:!1,tsType:{name:`unknown`},description:`Registry rows for the in-place switcher; id-resolved, never by name.`},orders:{required:!1,tsType:{name:`unknown`},description:``,defaultValue:{value:`[]`,computed:!1}},rail:{required:!1,tsType:{name:`ReactNode`},description:`Canonical PatientContextRail composition, supplied by the caller.`},workflow:{required:!1,tsType:{name:`ReactNode`},description:`Governed clinical work rendered in the center column instead of chart tabs.`},actionRail:{required:!1,tsType:{name:`ReactNode`},description:`Situational right rail. Workspace mode keeps decision evidence visible
beside bounded clinical drafting work.`},actionRailMode:{required:!1,tsType:{name:`union`,raw:`'launcher' | 'workspace'`,elements:[{name:`literal`,value:`'launcher'`},{name:`literal`,value:`'workspace'`}]},description:``,defaultValue:{value:`'launcher'`,computed:!1}},results:{required:!1,tsType:{name:`ReactNode`},description:`Canonical results composition (results feature), supplied by the caller.`},state:{required:!1,tsType:{name:`union`,raw:`'ready' | 'loading' | 'error' | 'not-found'`,elements:[{name:`literal`,value:`'ready'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'not-found'`}]},description:``,defaultValue:{value:`'ready'`,computed:!1}},defaultTab:{required:!1,tsType:{name:`union`,raw:`'overview' | 'orders' | 'results'`,elements:[{name:`literal`,value:`'overview'`},{name:`literal`,value:`'orders'`},{name:`literal`,value:`'results'`}]},description:``,defaultValue:{value:`'overview'`,computed:!1}},selectedTab:{required:!1,tsType:{name:`union`,raw:`'overview' | 'orders' | 'results'`,elements:[{name:`literal`,value:`'overview'`},{name:`literal`,value:`'orders'`},{name:`literal`,value:`'results'`}]},description:`Controlled selected record view for completion and deep-link handoffs.`},onTabChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(tab: PatientChartTab) => void`,signature:{arguments:[{type:{name:`union`,raw:`'overview' | 'orders' | 'results'`,elements:[{name:`literal`,value:`'overview'`},{name:`literal`,value:`'orders'`},{name:`literal`,value:`'results'`}]},name:`tab`}],return:{name:`void`}}},description:``},ordersState:{required:!1,tsType:{name:`union`,raw:`'ready' | 'loading' | 'error' | 'permission-restricted'`,elements:[{name:`literal`,value:`'ready'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'permission-restricted'`}]},description:``,defaultValue:{value:`'ready'`,computed:!1}},onRetryOrders:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},focusedOrderId:{required:!1,tsType:{name:`string`},description:``},onBack:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Recovery navigation when the requested record is unavailable.`},onOpenMergedRecord:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRetry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onSwitchPatient:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(userId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`userId`}],return:{name:`void`}}},description:``},onVerifyIdentity:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(docType: IdentityDocumentType) => void`,signature:{arguments:[{type:{name:`union`,raw:`'KH_NID' | 'PASSPORT' | 'OTHER'`,elements:[{name:`literal`,value:`'KH_NID'`},{name:`literal`,value:`'PASSPORT'`},{name:`literal`,value:`'OTHER'`}]},name:`docType`}],return:{name:`void`}}},description:``}}}})),ln,un,dn,fn,pn,mn,hn,gn,_n,vn,yn,bn,xn,Sn,Cn,D,wn=t((()=>{ln=`_rail_lgdac_7`,un=`_title_lgdac_13`,dn=`_actions_lgdac_21`,fn=`_action_lgdac_21`,pn=`_actionIcon_lgdac_54`,mn=`_actionCopy_lgdac_60`,hn=`_actionLabel_lgdac_68`,gn=`_actionDescription_lgdac_74`,_n=`_actionDescriptionUrgent_lgdac_80`,vn=`_actionChevron_lgdac_87`,yn=`_progressHead_lgdac_94`,bn=`_progressCount_lgdac_100`,xn=`_progressResulted_lgdac_105`,Sn=`_progressNote_lgdac_112`,Cn=`_notifyConfirmed_lgdac_118`,D={rail:ln,title:un,actions:dn,action:fn,actionIcon:pn,actionCopy:mn,actionLabel:hn,actionDescription:gn,actionDescriptionUrgent:_n,actionChevron:vn,progressHead:yn,progressCount:bn,progressResulted:xn,progressNote:Sn,notifyConfirmed:Cn}}));function O({onOrder:e,onPrescribe:t,onSchedule:n,patientName:r}){let i={order:e,prescribe:t,schedule:n};return(0,k.jsxs)(`section`,{"aria-labelledby":`next-actions-title`,className:D.rail,children:[(0,k.jsxs)(`h2`,{className:D.title,id:`next-actions-title`,children:[`What should we do with `,r,` today?`]}),(0,k.jsx)(`div`,{className:D.actions,children:Dn.map(e=>(0,k.jsxs)(`button`,{className:D.action,onClick:i[e.id],type:`button`,children:[(0,k.jsx)(`span`,{"aria-hidden":`true`,className:D.actionIcon,children:e.icon}),(0,k.jsxs)(`span`,{className:D.actionCopy,children:[(0,k.jsx)(`span`,{className:D.actionLabel,children:e.label}),(0,k.jsx)(`span`,{className:D.actionDescription,children:e.description})]}),(0,k.jsx)(s,{"aria-hidden":`true`,className:D.actionChevron,size:16})]},e.id))})]})}function Tn({onNotifyWhenComplete:e,onReviewAvailable:t,progress:n}){let[r,i]=(0,En.useState)(!1),a=n.resulted>=n.total;return(0,k.jsxs)(`section`,{"aria-labelledby":`results-progress-title`,className:D.rail,children:[(0,k.jsxs)(`div`,{className:D.progressHead,children:[(0,k.jsxs)(`p`,{className:D.progressCount,id:`results-progress-title`,children:[(0,k.jsx)(`span`,{className:D.progressResulted,children:n.resulted}),` of ${n.total} resulted`]}),(0,k.jsx)(te,{"aria-label":`${n.resulted} of ${n.total} tests resulted`,max:n.total,value:n.resulted}),n.arrivalNote?(0,k.jsx)(`p`,{className:D.progressNote,children:n.arrivalNote}):null]}),(0,k.jsxs)(`div`,{className:D.actions,children:[n.resulted>0?(0,k.jsxs)(`button`,{className:D.action,onClick:t,type:`button`,children:[(0,k.jsx)(`span`,{"aria-hidden":`true`,className:D.actionIcon,children:(0,k.jsx)(o,{size:16})}),(0,k.jsxs)(`span`,{className:D.actionCopy,children:[(0,k.jsxs)(`span`,{className:D.actionLabel,children:[`Review `,a?`results`:`available results`]}),(0,k.jsx)(`span`,{className:n.flagged>0?D.actionDescriptionUrgent:D.actionDescription,children:n.flagged>0?`${n.flagged} flagged ${n.flagged===1?`value needs`:`values need`} review now`:`Nothing flagged so far`})]}),(0,k.jsx)(s,{"aria-hidden":`true`,className:D.actionChevron,size:16})]}):null,a?null:r?(0,k.jsxs)(`p`,{className:D.notifyConfirmed,role:`status`,children:[(0,k.jsx)(u,{"aria-hidden":`true`,size:14}),`You'll get one alert when all `,n.total,` are in.`]}):(0,k.jsx)(_,{leadingIcon:(0,k.jsx)(c,{"aria-hidden":`true`,size:16}),onClick:()=>{i(!0),e?.()},size:`sm`,variant:`ghost`,children:`Notify me when complete`})]})]})}var k,En,Dn,On=t((()=>{k=r(),En=e(n()),p(),wn(),Dn=[{id:`order`,icon:(0,k.jsx)(a,{"aria-hidden":`true`,size:16}),label:`Order tests`,description:`Request or repeat lab tests`},{id:`prescribe`,icon:(0,k.jsx)(d,{"aria-hidden":`true`,size:16}),label:`Prescribe medication`,description:`Add or update medication`},{id:`schedule`,icon:(0,k.jsx)(l,{"aria-hidden":`true`,size:16}),label:`Schedule follow-up`,description:`Set a follow-up reminder`}],O.__docgenInfo={description:`The calm-moment action rail: three launchers for the next clinical step.
Launchers only — each opens its governed flow; nothing completes here.`,methods:[],displayName:`NextActionsRail`,props:{patientName:{required:!0,tsType:{name:`string`},description:`Display name as the registry provides it; never split or reordered.`},onOrder:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onPrescribe:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onSchedule:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}},Tn.__docgenInfo={description:`The results-arriving rail: how much of the episode is back, whether any
of it needs eyes now, and a one-tap way to stop watching the page.`,methods:[],displayName:`ResultsProgressRail`,props:{progress:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  resulted: number;
  total: number;
  /** Values outside reference so far; 0 means nothing needs eyes yet. */
  flagged: number;
  /** Pre-formatted arrival note, e.g. "Chemistry lands about 4:30 PM." */
  arrivalNote?: string;
}`,signature:{properties:[{key:`resulted`,value:{name:`number`,required:!0}},{key:`total`,value:{name:`number`,required:!0}},{key:`flagged`,value:{name:`number`,required:!0},description:`Values outside reference so far; 0 means nothing needs eyes yet.`},{key:`arrivalNote`,value:{name:`string`,required:!1},description:`Pre-formatted arrival note, e.g. "Chemistry lands about 4:30 PM."`}]}},description:``},onReviewAvailable:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onNotifyWhenComplete:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})),kn,An,jn,Mn,Nn,Pn,Fn,In,Ln,A,Rn=t((()=>{kn=`_flow_420tr_1`,An=`_header_420tr_9`,jn=`_title_420tr_16`,Mn=`_review_420tr_23`,Nn=`_reviewLabel_420tr_31`,Pn=`_tests_420tr_37`,Fn=`_test_420tr_37`,In=`_testCode_420tr_55`,Ln=`_footer_420tr_62`,A={flow:kn,header:An,title:jn,review:Mn,reviewLabel:Nn,tests:Pn,test:Fn,testCode:In,footer:Ln}}));function zn({categories:e,onClose:t,onPlaceOrder:n,onViewOrder:r,permission:i=`allowed`,tests:a}){let[o,s]=(0,M.useState)([]),[c,l]=(0,M.useState)(`select`),[u,d]=(0,M.useState)(null),[f,ee]=(0,M.useState)(!1),te=(0,M.useMemo)(()=>o.map(e=>a.find(t=>t.testCatalogId===e)).filter(e=>!!e),[o,a]);return i===`restricted`?(0,j.jsxs)(`section`,{"aria-labelledby":`order-flow-title`,className:A.flow,children:[(0,j.jsxs)(`header`,{className:A.header,children:[(0,j.jsx)(`h2`,{className:A.title,id:`order-flow-title`,children:`Order tests`}),(0,j.jsx)(ce,{"aria-label":`Close order tests`,onClick:t,size:`sm`})]}),(0,j.jsxs)(g,{tone:`warning`,children:[(0,j.jsx)(m,{children:`Ordering unavailable`}),(0,j.jsx)(h,{children:`You do not have permission to place orders for this patient.`})]})]}):c===`select`?(0,j.jsx)(ke,{categories:e,onClose:t,onReview:()=>l(`review`),onSelectedTestIdsChange:s,selectedTestIds:o,tests:a}):c===`success`&&u?(0,j.jsxs)(`section`,{"aria-labelledby":`order-flow-title`,className:A.flow,children:[(0,j.jsxs)(`header`,{className:A.header,children:[(0,j.jsx)(`h2`,{className:A.title,id:`order-flow-title`,children:`Order tests`}),(0,j.jsx)(ce,{"aria-label":`Close order tests`,onClick:t,size:`sm`})]}),(0,j.jsxs)(g,{tone:`success`,children:[(0,j.jsx)(m,{children:`Order placed`}),(0,j.jsxs)(h,{children:[`Order `,u.code,` is placed and awaiting fulfillment.`]}),(0,j.jsx)(le,{children:(0,j.jsx)(_,{onClick:()=>r(u.ordId),size:`sm`,variant:`secondary`,children:`View order`})})]})]}):(0,j.jsxs)(`section`,{"aria-labelledby":`order-flow-title`,className:A.flow,children:[(0,j.jsxs)(`header`,{className:A.header,children:[(0,j.jsx)(`h2`,{className:A.title,id:`order-flow-title`,children:`Review order`}),(0,j.jsx)(ce,{"aria-label":`Close order tests`,onClick:t,size:`sm`})]}),(0,j.jsxs)(`div`,{className:A.review,children:[(0,j.jsx)(`p`,{className:A.reviewLabel,children:`Selected tests`}),(0,j.jsx)(`ul`,{className:A.tests,children:te.map(e=>(0,j.jsxs)(`li`,{className:A.test,children:[(0,j.jsx)(`span`,{children:e.displayName}),(0,j.jsx)(`span`,{className:A.testCode,children:e.code})]},e.testCatalogId))}),f?(0,j.jsxs)(g,{tone:`danger`,children:[(0,j.jsx)(m,{children:`Couldn't place this order`}),(0,j.jsx)(h,{children:`Your selected tests are still here. Try again.`})]}):null]}),(0,j.jsxs)(`footer`,{className:A.footer,children:[(0,j.jsx)(_,{disabled:c===`submitting`,onClick:()=>l(`select`),size:`sm`,variant:`secondary`,children:`Back to test selection`}),(0,j.jsx)(_,{disabled:c===`submitting`,onClick:()=>{ee(!1),l(`submitting`),Promise.resolve().then(()=>n(o)).then(e=>{d(e),l(`success`)}).catch(()=>{l(`review`),ee(!0)})},size:`sm`,variant:`primary`,children:c===`submitting`?`Placing order…`:`Place order`})]})]})}var j,M,Bn=t((()=>{j=r(),M=e(n()),p(),Oe(),Rn(),zn.__docgenInfo={description:`Patient-chart adapter for the existing catalog picker. It owns only the
patient-context handoff and final feedback; test selection remains in
LabOrderRail and authoritative placement remains at the supplied boundary.`,methods:[],displayName:`PatientOrderFlow`,props:{categories:{required:!0,tsType:{name:`unknown`},description:``},tests:{required:!0,tsType:{name:`unknown`},description:``},onPlaceOrder:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(selectedTestIds: readonly string[]) => PatientOrder | Promise<PatientOrder>`,signature:{arguments:[{type:{name:`unknown`},name:`selectedTestIds`}],return:{name:`union`,raw:`PatientOrder | Promise<PatientOrder>`,elements:[{name:`signature`,type:`object`,raw:`{
  ordId: string;
  /** Human order code, e.g. "AB12345". */
  code: string;
  /** Pre-formatted placement label; fixtures never read the clock. */
  placedAtLabel: string;
  status: PatientOrderStatus;
  needsAttention?: boolean;
  lineItems: readonly PatientOrderLine[];
}`,signature:{properties:[{key:`ordId`,value:{name:`string`,required:!0}},{key:`code`,value:{name:`string`,required:!0},description:`Human order code, e.g. "AB12345".`},{key:`placedAtLabel`,value:{name:`string`,required:!0},description:`Pre-formatted placement label; fixtures never read the clock.`},{key:`status`,value:{name:`union`,raw:`| 'placed'
| 'in_fulfillment'
| 'partially_complete'
| 'completed'
| 'cancelled'`,elements:[{name:`literal`,value:`'placed'`},{name:`literal`,value:`'in_fulfillment'`},{name:`literal`,value:`'partially_complete'`},{name:`literal`,value:`'completed'`},{name:`literal`,value:`'cancelled'`}],required:!0}},{key:`needsAttention`,value:{name:`boolean`,required:!1}},{key:`lineItems`,value:{name:`unknown`,required:!0}}]}},{name:`Promise`,elements:[{name:`signature`,type:`object`,raw:`{
  ordId: string;
  /** Human order code, e.g. "AB12345". */
  code: string;
  /** Pre-formatted placement label; fixtures never read the clock. */
  placedAtLabel: string;
  status: PatientOrderStatus;
  needsAttention?: boolean;
  lineItems: readonly PatientOrderLine[];
}`,signature:{properties:[{key:`ordId`,value:{name:`string`,required:!0}},{key:`code`,value:{name:`string`,required:!0},description:`Human order code, e.g. "AB12345".`},{key:`placedAtLabel`,value:{name:`string`,required:!0},description:`Pre-formatted placement label; fixtures never read the clock.`},{key:`status`,value:{name:`union`,raw:`| 'placed'
| 'in_fulfillment'
| 'partially_complete'
| 'completed'
| 'cancelled'`,elements:[{name:`literal`,value:`'placed'`},{name:`literal`,value:`'in_fulfillment'`},{name:`literal`,value:`'partially_complete'`},{name:`literal`,value:`'completed'`},{name:`literal`,value:`'cancelled'`}],required:!0}},{key:`needsAttention`,value:{name:`boolean`,required:!1}},{key:`lineItems`,value:{name:`unknown`,required:!0}}]}}],raw:`Promise<PatientOrder>`}]}}},description:`The action boundary enforces scope and signing; this component never does.`},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onViewOrder:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(orderId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`orderId`}],return:{name:`void`}}},description:``},permission:{required:!1,tsType:{name:`union`,raw:`'allowed' | 'restricted'`,elements:[{name:`literal`,value:`'allowed'`},{name:`literal`,value:`'restricted'`}]},description:``,defaultValue:{value:`'allowed'`,computed:!1}}}}}));function Vn({children:e}){return(0,N.jsx)(`div`,{style:{blockSize:`100vh`},children:e})}var N,P,F,I,L,Hn,R,Un,Wn,Gn,Kn,z,B,qn,Jn,Yn,Xn,Zn,V,H,U,W,G,K,q,J,Qn,Y,$n,er,tr,nr,rr,ir,X,ar,Z,or,Q,sr,cr,lr,ur,dr,fr,pr,$,mr,hr;t((()=>{N=r(),P=e(n()),De(),Fe(),Ae(),Te(),Pe(),je(),cn(),On(),Bn(),it(),Qe(),Je(),{expect:F,fn:I,userEvent:L,waitFor:Hn,within:R}=__STORYBOOK_MODULE_TEST__,Un=b[0],Wn=b[2],Gn=b[7],Kn=b[8],z=b.find(e=>e.userId===Ve),B=Ze(Ve),qn=(0,N.jsx)(y,{...Ie.established,showIdentity:!1}),Jn=(0,N.jsx)(Ne,{sections:Me,title:`Results — booking AB12345`}),Yn=[...Ue,...Array.from({length:7},(e,t)=>({ordId:`ord-history-${t+1}`,code:`AB90${t+1}`,placedAtLabel:`Placed ${10-t} Jan 2026`,status:t%2==0?`completed`:`cancelled`,lineItems:[{code:`CRE`,displayName:`Creatinine`}]}))],Xn={title:`Clinic/Clinical/Patients/Chart`,component:w,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:Xe,docs:{description:{component:`The patient chart shell: pinned identity bar, persistent context rail (canonical PatientContextRail, safety never collapses), and three record tabs. Orders is a searchable lifecycle record with active work separate from history; Results is the canonical flowsheet. Clinical actions launch from the right rail and retain the selected record view. Deceased and merged records block clinical work before any tab renders.`}}},args:{patient:Un,patients:b,orders:Ue,rail:qn,results:Jn,onBack:I(),onSwitchPatient:I()},decorators:[e=>(0,N.jsx)(Vn,{children:(0,N.jsx)(e,{})})]},Zn={},V={args:{patient:z,orders:B.orders,rail:(0,N.jsx)(y,{patient:{initials:`SC`,name:z.displayName,demographics:`${z.age} y · ${z.sexAtBirth} · MRN ${z.mrnMasked}`},reasonForVisit:B.reasonForVisit,safety:B.safety,sections:B.sections,showIdentity:!1,todaySummary:B.todaySummary})},play:async({canvasElement:e})=>{let t=R(e);await F(t.getAllByText(`Sokha Chann`).length).toBeGreaterThan(0),await F(t.getByText(`Sulfa allergy`)).toBeVisible(),await F(t.getByRole(`button`,{name:/Active problems/})).toBeVisible(),await F(t.getByRole(`tab`,{name:/^Orders$/})).toBeVisible()}},H={args:{actionRail:(0,N.jsx)(O,{onOrder:I(),onPrescribe:I(),onSchedule:I(),patientName:`Nimol`})},play:async({canvasElement:e})=>{let t=R(e);await F(t.queryByRole(`button`,{name:`Back to patients`})).not.toBeInTheDocument()}},U={args:{actionRail:(0,N.jsx)(ke,{categories:Ee,onClose:I(),onReview:I(),tests:v}),actionRailMode:`workspace`,defaultTab:`results`},tags:[`play-fn`],play:async({canvasElement:e})=>{let t=R(e);await F(t.getByText(`Results — booking AB12345`)).toBeVisible(),await F(t.getByRole(`heading`,{name:`Order lab tests`})).toBeVisible(),await F(t.getByRole(`separator`,{name:`Resize patient chart and action workspace`})).toBeVisible()}},W={args:{defaultTab:`results`},render:e=>{function t(){let[t,n]=(0,P.useState)(!1);return(0,N.jsx)(w,{...e,actionRail:t?(0,N.jsx)(ke,{categories:Ee,onClose:()=>n(!1),onReview:I(),tests:v}):(0,N.jsx)(O,{onOrder:()=>n(!0),patientName:`Nimol`}),actionRailMode:t?`workspace`:`launcher`})}return(0,N.jsx)(t,{})},tags:[`play-fn`],play:async({canvasElement:e})=>{let t=R(e),n=t.getByRole(`tab`,{name:`Results`}),r=n.getBoundingClientRect();await F(n).toHaveAttribute(`aria-selected`,`true`);let i=t.getByRole(`complementary`,{name:`Patient actions`});await L.click(R(i).getByRole(`button`,{name:/^Order/})),await F(await t.findByRole(`heading`,{name:`Order lab tests`})).toBeVisible(),await Hn(()=>{let e=t.getByRole(`tab`,{name:`Results`}),i=e.getBoundingClientRect();F(e).toBe(n),F(e).toHaveAttribute(`aria-selected`,`true`),F(Math.abs(i.left-r.left)).toBeLessThanOrEqual(1),F(Math.abs(i.top-r.top)).toBeLessThanOrEqual(1)})}},G={args:{defaultTab:`results`,actionRail:(0,N.jsx)(Tn,{onReviewAvailable:I(),progress:ze})},tags:[`play-fn`],play:async({canvasElement:e})=>{let t=R(e);await F(t.getByText(`5 flagged values need review now`)).toBeInTheDocument(),await L.click(t.getByRole(`button`,{name:`Notify me when complete`})),await F(t.getByText(`You'll get one alert when all 30 are in.`)).toBeInTheDocument()}},K={args:{actionRail:(0,N.jsx)(at,{diagnoses:He,diagnosisSearchCandidates:Ye,diagnosisSuggestions:Le,flaggedLabs:Ke,needsReview:Re,onClose:I(),onComplete:I(),patientName:`Sok Nimol`,searchPool:Be,settled:qe,suggestions:We}),actionRailMode:`workspace`,defaultTab:`results`},parameters:{kura:Ge},tags:[`play-fn`],play:async({canvasElement:e})=>{let t=R(e);await F(t.getByText(`Results — booking AB12345`)).toBeVisible(),await F(t.getByRole(`heading`,{name:`Select diagnosis`})).toBeVisible(),await F(t.getByRole(`separator`,{name:`Resize patient chart and action workspace`})).toBeVisible()}},q={args:{defaultTab:`results`},render:e=>{function t(){let[t,n]=(0,P.useState)(!1);return(0,N.jsx)(w,{...e,actionRail:t?(0,N.jsx)(at,{diagnoses:He,diagnosisSearchCandidates:Ye,diagnosisSuggestions:Le,flaggedLabs:Ke,needsReview:Re,onClose:()=>n(!1),onComplete:()=>n(!1),patientName:`Sok Nimol`,searchPool:Be,settled:qe,suggestions:We}):(0,N.jsx)(O,{onPrescribe:()=>n(!0),patientName:`Nimol`}),actionRailMode:t?`workspace`:`launcher`})}return(0,N.jsx)(t,{})},parameters:{kura:Ge},tags:[`play-fn`],play:async({canvasElement:e})=>{let t=R(e),n=t.getByRole(`tab`,{name:`Results`}),r=n.getBoundingClientRect();await F(n).toHaveAttribute(`aria-selected`,`true`);let i=t.getByRole(`complementary`,{name:`Patient actions`});await L.click(R(i).getByRole(`button`,{name:/^Prescribe/})),await F(await t.findByRole(`heading`,{name:`Select diagnosis`})).toBeVisible(),await Hn(()=>{let e=t.getByRole(`tab`,{name:`Results`}),i=e.getBoundingClientRect();F(e).toBe(n),F(e).toHaveAttribute(`aria-selected`,`true`),F(Math.abs(i.left-r.left)).toBeLessThanOrEqual(1),F(Math.abs(i.top-r.top)).toBeLessThanOrEqual(1)})}},J={args:{patient:Gn,actionRail:(0,N.jsx)(O,{patientName:`Thoeun`})},tags:[`play-fn`],play:async({canvasElement:e})=>{let t=R(e);await F(t.queryByText(/What should we do/)).not.toBeInTheDocument()}},Qn={args:{defaultTab:`orders`},tags:[`play-fn`],play:async({canvasElement:e})=>{let t=R(e);await F(t.getByText(`AB12345`)).toBeInTheDocument(),await F(t.getByText(`Needs attention`)).toBeInTheDocument(),await F(t.getByText(`Cancelled`)).toBeInTheDocument()}},Y={args:{defaultTab:`orders`,orders:B.orders},tags:[`play-fn`],play:async({canvasElement:e})=>{let t=R(e);await F(t.getByRole(`tab`,{name:/^Orders$/})).toBeVisible(),await F(t.getByRole(`heading`,{name:`Past orders`})).toBeVisible(),await F(t.queryByRole(`heading`,{name:`Active orders`})).not.toBeInTheDocument()}},$n={args:{defaultTab:`orders`,orders:[Ue[0]]},tags:[`play-fn`],play:async({canvasElement:e})=>{let t=R(e);await F(t.getByRole(`tab`,{name:`Orders, 1 active`})).toBeVisible()}},er={args:{defaultTab:`orders`,orders:[{...Ue[0],ordId:`ord-attention`,code:`AB-ATTN`,status:`in_fulfillment`},{...Ue[0],ordId:`ord-routine`,code:`AB-ROUTINE`,needsAttention:!1,status:`placed`}]},tags:[`play-fn`],play:async({canvasElement:e})=>{let t=R(e),n=t.getByText(`AB-ATTN`),r=t.getByText(`AB-ROUTINE`);await F(n.compareDocumentPosition(r)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)}},tr={args:{defaultTab:`orders`,orders:Yn},tags:[`play-fn`],play:async({canvasElement:e})=>{let t=R(e);await F(t.getByRole(`button`,{name:`Show more past orders`})).toBeVisible(),await L.click(t.getByRole(`button`,{name:`Show more past orders`})),await F(t.getByText(`AB907`)).toBeVisible(),await L.type(t.getByRole(`searchbox`,{name:`Search past orders`}),`AB907`),await F(t.getByText(`AB907`)).toBeVisible(),await F(t.queryByText(`AB901`)).not.toBeInTheDocument()}},nr={args:{defaultTab:`orders`,ordersState:`loading`}},rr={args:{defaultTab:`orders`,onRetryOrders:I(),ordersState:`error`},tags:[`play-fn`],play:async({args:e,canvasElement:t})=>{let n=R(t);await L.click(n.getByRole(`button`,{name:`Retry`})),await F(e.onRetryOrders).toHaveBeenCalled()}},ir={args:{defaultTab:`orders`,ordersState:`permission-restricted`}},X={args:{defaultTab:`results`},render:e=>{function t(){let[t,n]=(0,P.useState)(Ue),[r,i]=(0,P.useState)(!1),[a,o]=(0,P.useState)(`results`),[s,c]=(0,P.useState)();return(0,N.jsx)(w,{...e,actionRail:r?(0,N.jsx)(zn,{categories:Ee,onClose:()=>i(!1),onPlaceOrder:e=>{let t={ordId:`ord-new`,code:`AB12891`,placedAtLabel:`Placed just now`,status:`placed`,lineItems:v.filter(t=>e.includes(t.testCatalogId)).map(e=>({code:e.abbrv??e.code,displayName:e.displayName}))};return n(e=>[t,...e]),t},onViewOrder:e=>{c(e),i(!1),o(`orders`)},tests:v}):(0,N.jsx)(O,{onOrder:()=>i(!0),patientName:`Nimol`}),actionRailMode:r?`workspace`:`launcher`,focusedOrderId:s,onTabChange:e=>{c(void 0),o(e)},orders:t,selectedTab:a})}return(0,N.jsx)(t,{})},tags:[`play-fn`],play:async({canvasElement:e})=>{let t=R(e),n=t.getByRole(`tab`,{name:`Results`});await F(n).toHaveAttribute(`aria-selected`,`true`),await L.click(t.getByRole(`button`,{name:/^Order tests/})),await F(t.getByRole(`tab`,{name:`Results`})).toHaveAttribute(`aria-selected`,`true`),await L.click(t.getByRole(`checkbox`,{name:`HbA1c`})),await L.click(t.getByRole(`button`,{name:`Review order`})),await L.click(t.getByRole(`button`,{name:`Place order`})),await F(await t.findByText(`Order placed`)).toBeVisible(),await L.click(t.getByRole(`button`,{name:`View order`})),await F(t.getByRole(`tab`,{name:`Orders, 2 active`})).toHaveAttribute(`aria-selected`,`true`),await F(t.getByText(`AB12891`).closest(`li`)).toHaveAttribute(`data-focused`,`true`)}},ar={args:{defaultTab:`results`}},Z={args:{patient:Wn},tags:[`play-fn`],render:e=>{function t(){let[t,n]=(0,P.useState)(Wn);return(0,N.jsx)(Vn,{children:(0,N.jsx)(w,{...e,onVerifyIdentity:()=>n({...t,assurance:`verified`}),patient:t})})}return(0,N.jsx)(t,{})},play:async({canvasElement:e})=>{let t=R(e);await L.click(t.getByRole(`radio`,{name:`Passport`})),await L.click(t.getByRole(`button`,{name:`Verify identity`})),await F(t.queryByText(`Unverified`)).not.toBeInTheDocument()}},or={tags:[`play-fn`],play:async({args:e,canvasElement:t})=>{let n=R(t);await L.click(n.getByRole(`button`,{name:`Switch patient`}));let r=R(t.ownerDocument.body);await L.click(await r.findByRole(`menuitem`,{name:`Dara Pich`})),await F(e.onSwitchPatient).toHaveBeenCalledWith(`p-dara-pich`)}},Q={args:{patient:Gn},tags:[`play-fn`],play:async({canvasElement:e})=>{let t=R(e);await F(t.getByText(`This patient is deceased`)).toBeInTheDocument(),await F(t.queryByRole(`tab`)).not.toBeInTheDocument()}},sr={args:{patient:Kn,onOpenMergedRecord:I()},tags:[`play-fn`],play:async({args:e,canvasElement:t})=>{let n=R(t);await L.click(n.getByRole(`button`,{name:`Open current record`})),await F(e.onOpenMergedRecord).toHaveBeenCalled()}},cr={args:{defaultTab:`orders`,orders:[]}},lr={args:{state:`loading`}},ur={args:{state:`not-found`}},dr={args:{state:`error`,onRetry:I()}},fr={args:{actionRail:(0,N.jsx)(O,{patientName:`Nimol`})},globals:{viewport:{value:`kura390`}}},pr={args:{actionRail:(0,N.jsx)(O,{patientName:`Nimol`})},globals:{viewport:{value:`kura320`}}},$={args:{actionRail:(0,N.jsx)(O,{patientName:`Nimol`})},decorators:[e=>(0,N.jsx)(`div`,{style:{blockSize:`800px`,inlineSize:`1440px`},children:(0,N.jsx)(e,{})})]},mr={globals:{theme:`dark`}},Zn.parameters={...Zn.parameters,docs:{...Zn.parameters?.docs,source:{originalSource:`{}`,...Zn.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    patient: SOKHA_CHANN,
    orders: DEMO_TOUR_CHART.orders,
    rail: <PatientContextRail patient={{
      initials: 'SC',
      name: SOKHA_CHANN.displayName,
      demographics: \`\${SOKHA_CHANN.age} y · \${SOKHA_CHANN.sexAtBirth} · MRN \${SOKHA_CHANN.mrnMasked}\`
    }} reasonForVisit={DEMO_TOUR_CHART.reasonForVisit} safety={DEMO_TOUR_CHART.safety} sections={DEMO_TOUR_CHART.sections} showIdentity={false} todaySummary={DEMO_TOUR_CHART.todaySummary} />
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText('Sokha Chann').length).toBeGreaterThan(0);
    // The tour only works if the record actually carries clinical context.
    await expect(canvas.getByText('Sulfa allergy')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: /Active problems/
    })).toBeVisible();
    await expect(canvas.getByRole('tab', {
      name: /^Orders$/
    })).toBeVisible();
  }
}`,...V.parameters?.docs?.source},description:{story:`The record a new doctor lands on from the first-use home offer. It carries
real clinical context — problems, medicines, safety, and returned orders —
because an empty chart would break the promise that offer makes.`,...V.parameters?.docs?.description}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    actionRail: <NextActionsRail onOrder={fn()} onPrescribe={fn()} onSchedule={fn()} patientName="Nimol" />
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('button', {
      name: 'Back to patients'
    })).not.toBeInTheDocument();
  }
}`,...H.parameters?.docs?.source},description:{story:`Calm-moment third rail: three launchers for the next clinical step.
The rail launches governed flows; nothing completes inside it.`,...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    actionRail: <LabOrderRail categories={LAB_CATALOG_CATEGORIES} onClose={fn()} onReview={fn()} tests={LAB_CATALOG_TESTS} />,
    actionRailMode: 'workspace',
    defaultTab: 'results'
  },
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Results — booking AB12345')).toBeVisible();
    await expect(canvas.getByRole('heading', {
      name: 'Order lab tests'
    })).toBeVisible();
    await expect(canvas.getByRole('separator', {
      name: 'Resize patient chart and action workspace'
    })).toBeVisible();
  }
}`,...U.parameters?.docs?.source},description:{story:`Order drafting expands the right workspace without replacing the visible results.`,...U.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    defaultTab: 'results'
  },
  render: args => {
    function Harness() {
      const [orderOpen, setOrderOpen] = useState(false);
      return <PatientChart {...args} actionRail={orderOpen ? <LabOrderRail categories={LAB_CATALOG_CATEGORIES} onClose={() => setOrderOpen(false)} onReview={fn()} tests={LAB_CATALOG_TESTS} /> : <NextActionsRail onOrder={() => setOrderOpen(true)} patientName="Nimol" />} actionRailMode={orderOpen ? 'workspace' : 'launcher'} />;
    }
    return <Harness />;
  },
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const resultsTab = canvas.getByRole('tab', {
      name: 'Results'
    });
    const before = resultsTab.getBoundingClientRect();
    await expect(resultsTab).toHaveAttribute('aria-selected', 'true');
    const actions = canvas.getByRole('complementary', {
      name: 'Patient actions'
    });
    await userEvent.click(within(actions).getByRole('button', {
      name: /^Order/
    }));
    await expect(await canvas.findByRole('heading', {
      name: 'Order lab tests'
    })).toBeVisible();
    await waitFor(() => {
      const anchoredTab = canvas.getByRole('tab', {
        name: 'Results'
      });
      const after = anchoredTab.getBoundingClientRect();
      expect(anchoredTab).toBe(resultsTab);
      expect(anchoredTab).toHaveAttribute('aria-selected', 'true');
      expect(Math.abs(after.left - before.left)).toBeLessThanOrEqual(1);
      expect(Math.abs(after.top - before.top)).toBeLessThanOrEqual(1);
    });
  }
}`,...W.parameters?.docs?.source},description:{story:`Opening Order changes only the right rail; the current chart view stays anchored.`,...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    defaultTab: 'results',
    actionRail: <ResultsProgressRail onReviewAvailable={fn()} progress={DEMO_RESULTS_PROGRESS} />
  },
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('5 flagged values need review now')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Notify me when complete'
    }));
    await expect(canvas.getByText("You'll get one alert when all 30 are in.")).toBeInTheDocument();
  }
}`,...G.parameters?.docs?.source},description:{story:`Results-arriving moment: progress, what needs eyes now, and a one-tap
subscription instead of watching the page.`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    actionRail: <PrescribeFlow diagnoses={DEMO_DIAGNOSES} diagnosisSearchCandidates={DEMO_LEGACY_ICD10_SEARCH_POOL} diagnosisSuggestions={DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS} flaggedLabs={DEMO_LEGACY_ICD10_FLAGGED_LABS} needsReview={DEMO_NEEDS_REVIEW} onClose={fn()} onComplete={fn()} patientName="Sok Nimol" searchPool={DEMO_SEARCH_POOL} settled={DEMO_SETTLED} suggestions={DEMO_SUGGESTIONS} />,
    actionRailMode: 'workspace',
    defaultTab: 'results'
  },
  parameters: {
    kura: PRESCRIBE_STORYBOOK_KURA
  },
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Results — booking AB12345')).toBeVisible();
    await expect(canvas.getByRole('heading', {
      name: 'Select diagnosis'
    })).toBeVisible();
    await expect(canvas.getByRole('separator', {
      name: 'Resize patient chart and action workspace'
    })).toBeVisible();
  }
}`,...K.parameters?.docs?.source},description:{story:`Prescribing begins with indication confirmation while clinical evidence remains visible.`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    defaultTab: 'results'
  },
  render: args => {
    function Harness() {
      const [prescribeOpen, setPrescribeOpen] = useState(false);
      return <PatientChart {...args} actionRail={prescribeOpen ? <PrescribeFlow diagnoses={DEMO_DIAGNOSES} diagnosisSearchCandidates={DEMO_LEGACY_ICD10_SEARCH_POOL} diagnosisSuggestions={DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS} flaggedLabs={DEMO_LEGACY_ICD10_FLAGGED_LABS} needsReview={DEMO_NEEDS_REVIEW} onClose={() => setPrescribeOpen(false)} onComplete={() => setPrescribeOpen(false)} patientName="Sok Nimol" searchPool={DEMO_SEARCH_POOL} settled={DEMO_SETTLED} suggestions={DEMO_SUGGESTIONS} /> : <NextActionsRail onPrescribe={() => setPrescribeOpen(true)} patientName="Nimol" />} actionRailMode={prescribeOpen ? 'workspace' : 'launcher'} />;
    }
    return <Harness />;
  },
  parameters: {
    kura: PRESCRIBE_STORYBOOK_KURA
  },
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const resultsTab = canvas.getByRole('tab', {
      name: 'Results'
    });
    const before = resultsTab.getBoundingClientRect();
    await expect(resultsTab).toHaveAttribute('aria-selected', 'true');
    const actions = canvas.getByRole('complementary', {
      name: 'Patient actions'
    });
    await userEvent.click(within(actions).getByRole('button', {
      name: /^Prescribe/
    }));
    await expect(await canvas.findByRole('heading', {
      name: 'Select diagnosis'
    })).toBeVisible();
    await waitFor(() => {
      const anchoredTab = canvas.getByRole('tab', {
        name: 'Results'
      });
      const after = anchoredTab.getBoundingClientRect();
      expect(anchoredTab).toBe(resultsTab);
      expect(anchoredTab).toHaveAttribute('aria-selected', 'true');
      expect(Math.abs(after.left - before.left)).toBeLessThanOrEqual(1);
      expect(Math.abs(after.top - before.top)).toBeLessThanOrEqual(1);
    });
  }
}`,...q.parameters?.docs?.source},description:{story:`Opening Prescribe changes only the right rail; the selected chart tab stays anchored.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    patient: CHAN_THOEUN_DECEASED,
    actionRail: <NextActionsRail patientName="Thoeun" />
  },
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByText(/What should we do/)).not.toBeInTheDocument();
  }
}`,...J.parameters?.docs?.source},description:{story:`Terminal records never show an action rail, even when one is supplied.`,...J.parameters?.docs?.description}}},Qn.parameters={...Qn.parameters,docs:{...Qn.parameters?.docs,source:{originalSource:`{
  args: {
    defaultTab: 'orders'
  },
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('AB12345')).toBeInTheDocument();
    await expect(canvas.getByText('Needs attention')).toBeInTheDocument();
    await expect(canvas.getByText('Cancelled')).toBeInTheDocument();
  }
}`,...Qn.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    defaultTab: 'orders',
    orders: DEMO_TOUR_CHART.orders
  },
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('tab', {
      name: /^Orders$/
    })).toBeVisible();
    await expect(canvas.getByRole('heading', {
      name: 'Past orders'
    })).toBeVisible();
    await expect(canvas.queryByRole('heading', {
      name: 'Active orders'
    })).not.toBeInTheDocument();
  }
}`,...Y.parameters?.docs?.source},description:{story:`Two completed orders stay in searchable history and never appear as open work.`,...Y.parameters?.docs?.description}}},$n.parameters={...$n.parameters,docs:{...$n.parameters?.docs,source:{originalSource:`{
  args: {
    defaultTab: 'orders',
    orders: [DEMO_ORDERS[0]]
  },
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('tab', {
      name: 'Orders, 1 active'
    })).toBeVisible();
  }
}`,...$n.parameters?.docs?.source}}},er.parameters={...er.parameters,docs:{...er.parameters?.docs,source:{originalSource:`{
  args: {
    defaultTab: 'orders',
    orders: [{
      ...DEMO_ORDERS[0],
      ordId: 'ord-attention',
      code: 'AB-ATTN',
      status: 'in_fulfillment'
    }, {
      ...DEMO_ORDERS[0],
      ordId: 'ord-routine',
      code: 'AB-ROUTINE',
      needsAttention: false,
      status: 'placed'
    }]
  },
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const attention = canvas.getByText('AB-ATTN');
    const routine = canvas.getByText('AB-ROUTINE');
    await expect(attention.compareDocumentPosition(routine)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  }
}`,...er.parameters?.docs?.source}}},tr.parameters={...tr.parameters,docs:{...tr.parameters?.docs,source:{originalSource:`{
  args: {
    defaultTab: 'orders',
    orders: LONG_HISTORY_ORDERS
  },
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Show more past orders'
    })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Show more past orders'
    }));
    await expect(canvas.getByText('AB907')).toBeVisible();
    await userEvent.type(canvas.getByRole('searchbox', {
      name: 'Search past orders'
    }), 'AB907');
    await expect(canvas.getByText('AB907')).toBeVisible();
    await expect(canvas.queryByText('AB901')).not.toBeInTheDocument();
  }
}`,...tr.parameters?.docs?.source}}},nr.parameters={...nr.parameters,docs:{...nr.parameters?.docs,source:{originalSource:`{
  args: {
    defaultTab: 'orders',
    ordersState: 'loading'
  }
}`,...nr.parameters?.docs?.source}}},rr.parameters={...rr.parameters,docs:{...rr.parameters?.docs,source:{originalSource:`{
  args: {
    defaultTab: 'orders',
    onRetryOrders: fn(),
    ordersState: 'error'
  },
  tags: ['play-fn'],
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Retry'
    }));
    await expect(args.onRetryOrders).toHaveBeenCalled();
  }
}`,...rr.parameters?.docs?.source}}},ir.parameters={...ir.parameters,docs:{...ir.parameters?.docs,source:{originalSource:`{
  args: {
    defaultTab: 'orders',
    ordersState: 'permission-restricted'
  }
}`,...ir.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    defaultTab: 'results'
  },
  render: args => {
    function Harness() {
      const [orders, setOrders] = useState<readonly PatientOrder[]>(DEMO_ORDERS);
      const [orderOpen, setOrderOpen] = useState(false);
      const [selectedTab, setSelectedTab] = useState<'overview' | 'orders' | 'results'>('results');
      const [focusedOrderId, setFocusedOrderId] = useState<string>();
      return <PatientChart {...args} actionRail={orderOpen ? <PatientOrderFlow categories={LAB_CATALOG_CATEGORIES} onClose={() => setOrderOpen(false)} onPlaceOrder={selectedTestIds => {
        const order: PatientOrder = {
          ordId: 'ord-new',
          code: 'AB12891',
          placedAtLabel: 'Placed just now',
          status: 'placed',
          lineItems: LAB_CATALOG_TESTS.filter(test => selectedTestIds.includes(test.testCatalogId)).map(test => ({
            code: test.abbrv ?? test.code,
            displayName: test.displayName
          }))
        };
        setOrders(current => [order, ...current]);
        return order;
      }} onViewOrder={orderId => {
        setFocusedOrderId(orderId);
        setOrderOpen(false);
        setSelectedTab('orders');
      }} tests={LAB_CATALOG_TESTS} /> : <NextActionsRail onOrder={() => setOrderOpen(true)} patientName="Nimol" />} actionRailMode={orderOpen ? 'workspace' : 'launcher'} focusedOrderId={focusedOrderId} onTabChange={tab => {
        setFocusedOrderId(undefined);
        setSelectedTab(tab);
      }} orders={orders} selectedTab={selectedTab} />;
    }
    return <Harness />;
  },
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const resultsTab = canvas.getByRole('tab', {
      name: 'Results'
    });
    await expect(resultsTab).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(canvas.getByRole('button', {
      name: /^Order tests/
    }));
    await expect(canvas.getByRole('tab', {
      name: 'Results'
    })).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(canvas.getByRole('checkbox', {
      name: 'HbA1c'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Review order'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Place order'
    }));
    await expect(await canvas.findByText('Order placed')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'View order'
    }));
    await expect(canvas.getByRole('tab', {
      name: 'Orders, 2 active'
    })).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByText('AB12891').closest('li')).toHaveAttribute('data-focused', 'true');
  }
}`,...X.parameters?.docs?.source},description:{story:`The governed flow adds an active record, then View order takes the clinician to it.`,...X.parameters?.docs?.description}}},ar.parameters={...ar.parameters,docs:{...ar.parameters?.docs,source:{originalSource:`{
  args: {
    defaultTab: 'results'
  }
}`,...ar.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    patient: LINA_PRUM_UNVERIFIED
  },
  tags: ['play-fn'],
  render: args => {
    function Harness() {
      const [patient, setPatient] = useState<PatientSummary>(LINA_PRUM_UNVERIFIED);
      return <ChartFrame>
          <PatientChart {...args} onVerifyIdentity={() => setPatient({
          ...patient,
          assurance: 'verified'
        })} patient={patient} />
        </ChartFrame>;
    }
    return <Harness />;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', {
      name: 'Passport'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Verify identity'
    }));
    await expect(canvas.queryByText('Unverified')).not.toBeInTheDocument();
  }
}`,...Z.parameters?.docs?.source},description:{story:`Sighted-document verification: choose a type, verify, badge clears.`,...Z.parameters?.docs?.description}}},or.parameters={...or.parameters,docs:{...or.parameters?.docs,source:{originalSource:`{
  tags: ['play-fn'],
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Switch patient'
    }));
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(await body.findByRole('menuitem', {
      name: 'Dara Pich'
    }));
    await expect(args.onSwitchPatient).toHaveBeenCalledWith('p-dara-pich');
  }
}`,...or.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    patient: CHAN_THOEUN_DECEASED
  },
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('This patient is deceased')).toBeInTheDocument();
    await expect(canvas.queryByRole('tab')).not.toBeInTheDocument();
  }
}`,...Q.parameters?.docs?.source},description:{story:`Terminal guard: no tabs, no rail, no clinical work.`,...Q.parameters?.docs?.description}}},sr.parameters={...sr.parameters,docs:{...sr.parameters?.docs,source:{originalSource:`{
  args: {
    patient: MALIS_KEO_MERGED,
    onOpenMergedRecord: fn()
  },
  tags: ['play-fn'],
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Open current record'
    }));
    await expect(args.onOpenMergedRecord).toHaveBeenCalled();
  }
}`,...sr.parameters?.docs?.source}}},cr.parameters={...cr.parameters,docs:{...cr.parameters?.docs,source:{originalSource:`{
  args: {
    defaultTab: 'orders',
    orders: []
  }
}`,...cr.parameters?.docs?.source}}},lr.parameters={...lr.parameters,docs:{...lr.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'loading'
  }
}`,...lr.parameters?.docs?.source}}},ur.parameters={...ur.parameters,docs:{...ur.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'not-found'
  }
}`,...ur.parameters?.docs?.source}}},dr.parameters={...dr.parameters,docs:{...dr.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'error',
    onRetry: fn()
  }
}`,...dr.parameters?.docs?.source}}},fr.parameters={...fr.parameters,docs:{...fr.parameters?.docs,source:{originalSource:`{
  args: {
    actionRail: <NextActionsRail patientName="Nimol" />
  },
  globals: {
    viewport: {
      value: 'kura390'
    }
  }
}`,...fr.parameters?.docs?.source}}},pr.parameters={...pr.parameters,docs:{...pr.parameters?.docs,source:{originalSource:`{
  args: {
    actionRail: <NextActionsRail patientName="Nimol" />
  },
  globals: {
    viewport: {
      value: 'kura320'
    }
  }
}`,...pr.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    actionRail: <NextActionsRail patientName="Nimol" />
  },
  decorators: [Story => <div style={{
    blockSize: '800px',
    inlineSize: '1440px'
  }}>
        <Story />
      </div>]
}`,...$.parameters?.docs?.source},description:{story:`Governing desktop reference for the same launcher-to-flow responsibility split.`,...$.parameters?.docs?.description}}},mr.parameters={...mr.parameters,docs:{...mr.parameters?.docs,source:{originalSource:`{
  globals: {
    theme: 'dark'
  }
}`,...mr.parameters?.docs?.source}}},hr=`Default.DemoTourPatient.NextActions.OrderWorkspace.OrderWorkspaceContinuity.ResultsArriving.PrescribeReview.PrescribeWorkspaceContinuity.DeceasedHidesActionRail.OrdersTab.CompletedOrdersOnly.OneActiveOrderCount.NeedsAttentionFirst.LongOrderHistory.OrdersLoading.OrdersErrorAndRetry.OrdersPermissionRestricted.OrderPlacementAndRecord.ResultsTab.VerifyIdentityFlow.SwitchPatient.Deceased.Merged.NoOrders.Loading.NotFound.ErrorAndRecovery.MobileWidth390.MobileWidth320.DesktopWidth1440.DarkTheme`.split(`.`)}))();export{Y as CompletedOrdersOnly,mr as DarkTheme,Q as Deceased,J as DeceasedHidesActionRail,Zn as Default,V as DemoTourPatient,$ as DesktopWidth1440,dr as ErrorAndRecovery,lr as Loading,tr as LongOrderHistory,sr as Merged,pr as MobileWidth320,fr as MobileWidth390,er as NeedsAttentionFirst,H as NextActions,cr as NoOrders,ur as NotFound,$n as OneActiveOrderCount,X as OrderPlacementAndRecord,U as OrderWorkspace,W as OrderWorkspaceContinuity,rr as OrdersErrorAndRetry,nr as OrdersLoading,ir as OrdersPermissionRestricted,Qn as OrdersTab,K as PrescribeReview,q as PrescribeWorkspaceContinuity,G as ResultsArriving,ar as ResultsTab,or as SwitchPatient,Z as VerifyIdentityFlow,hr as __namedExportsOrder,Xn as default};