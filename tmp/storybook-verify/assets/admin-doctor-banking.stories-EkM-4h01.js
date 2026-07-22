import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{kt as i}from"./provider-marks-BeHzyBjc.js";import{Cn as a,En as o,G as s,Tn as c,W as l,X as u,Y as d,Z as f,_n as ee,bn as te,kn as ne,pn as re,q as p,t as ie,wn as ae,xn as oe}from"./ui-C9kmmzkH.js";import{t as m}from"./skeleton-yGvKPj3C.js";import{c as se,d as ce,i as le,l as ue,o as de,r as fe,s as pe,u as me}from"./settings-modal-DFqsiPWF.js";import{i as he,r as ge,t as _e}from"./alert-l7nmjmGJ.js";import{t as h}from"./button-B6_zsN5-.js";import{a as g}from"./collapsible-Cfc9M9oP.js";import{t as _}from"./input-UaJWx_9h.js";import{i as ve,o as ye,r as be,t as xe}from"./empty-state-DlAvBIIY.js";import{t as Se}from"./filters-DETEkepG.js";import{t as Ce}from"./shared-GnDiMTI0.js";import{T as we,_ as Te,a as Ee,d as v,f as y,h as De,i as b,j as x,l as Oe,m as S,n as ke,p as C,r as w,t as Ae,y as T}from"./activity-ledger-Bx9EHPHU.js";import{a as je}from"./doctor-banking-5bnktGI2.js";import{n as Me}from"./earnings-workspace-D1c50viq.js";var Ne=t((()=>{})),Pe=t((()=>{ke(),je(),Me(),y(),Ne()})),E,D,O,k,A,j,M,N,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e,et,tt,nt,rt,it,at,P,ot=t((()=>{E=`_page_1jxt6_1`,D=`_pageHeader_1jxt6_10`,O=`_eyebrow_1jxt6_14`,k=`_pageTitle_1jxt6_15`,A=`_pageDescription_1jxt6_16`,j=`_sectionTitle_1jxt6_17`,M=`_sectionDescription_1jxt6_18`,N=`_doctorRef_1jxt6_19`,Fe=`_quiet_1jxt6_20`,Ie=`_failure_1jxt6_21`,Le=`_formError_1jxt6_22`,Re=`_layout_1jxt6_47`,ze=`_directory_1jxt6_55`,Be=`_detail_1jxt6_56`,Ve=`_detailSection_1jxt6_57`,He=`_loadingDetail_1jxt6_58`,Ue=`_form_1jxt6_22`,We=`_stack_1jxt6_60`,Ge=`_sectionHeader_1jxt6_76`,Ke=`_summaryHeading_1jxt6_77`,qe=`_controls_1jxt6_78`,Je=`_toolbar_1jxt6_105`,Ye=`_search_1jxt6_110`,Xe=`_doctorCell_1jxt6_114`,Ze=`_doctorName_1jxt6_120`,Qe=`_summary_1jxt6_77`,$e=`_detailTitle_1jxt6_135`,et=`_badges_1jxt6_142`,tt=`_controlActions_1jxt6_143`,nt=`_summaryMetrics_1jxt6_150`,rt=`_tableScroll_1jxt6_188`,it=`_nowrap_1jxt6_210`,at=`_notificationList_1jxt6_214`,P={page:E,pageHeader:D,eyebrow:O,pageTitle:k,pageDescription:A,sectionTitle:j,sectionDescription:M,doctorRef:N,quiet:Fe,failure:Ie,formError:Le,layout:Re,directory:ze,detail:Be,detailSection:Ve,loadingDetail:He,form:Ue,stack:We,sectionHeader:Ge,summaryHeading:Ke,controls:qe,toolbar:Je,search:Ye,doctorCell:Xe,doctorName:Ze,summary:Qe,detailTitle:$e,badges:et,controlActions:tt,summaryMetrics:nt,tableScroll:rt,nowrap:it,notificationList:at}}));function st(e){return e.replaceAll(`_`,` `)}function ct(e){return e===`linked`?`success`:e===`renewal_required`||e===`link_pending`?`warning`:e===`expired`||e===`frozen`||e===`deleted`?`danger`:`neutral`}function lt(e){return{none:`No attention`,collection_frozen:`Collection frozen`,failed_pull:`Failed pull`,relink_required:`Relink required`}[e]}function ut(e){return e===`none`?`neutral`:e===`failed_pull`?`warning`:`danger`}function dt({ledgers:e,loading:t,onSelect:n,selectedDoctorRef:r}){let[a,s]=(0,I.useState)(``),[c,l]=(0,I.useState)([]),u=c.find(e=>e.field===`attention`)?.values[0],d=(0,I.useMemo)(()=>Oe(e,a,u),[u,e,a]),f=ae({columns:(0,I.useMemo)(()=>[L.accessor(`displayName`,{header:`Doctor`,size:250,cell:({row:e})=>(0,F.jsxs)(`div`,{className:P.doctorCell,children:[(0,F.jsx)(`span`,{className:P.doctorName,children:e.original.displayName}),(0,F.jsx)(`span`,{className:P.doctorRef,children:e.original.doctorRef})]})}),L.accessor(`settledBalance`,{header:`Settled`,size:120,meta:{numeric:!0},cell:({getValue:e})=>(0,F.jsx)(b,{value:e()})}),L.accessor(`exposure`,{header:`Exposure`,size:120,meta:{numeric:!0},cell:({getValue:e})=>(0,F.jsx)(b,{value:e()})}),L.accessor(`mandateState`,{header:`Mandate`,size:150,cell:({getValue:e})=>(0,F.jsx)(g,{variant:ct(e()),children:st(e())})}),L.accessor(`attention`,{header:`Attention`,size:160,cell:({getValue:e})=>(0,F.jsx)(g,{variant:ut(e()),children:lt(e())})})],[]),data:d,getCoreRowModel:o(),getPaginationRowModel:ne(),getRowId:e=>e.doctorRef,initialState:{pagination:{pageIndex:0,pageSize:8}}});return(0,F.jsxs)(`section`,{"aria-labelledby":`doctor-ledger-directory-title`,className:P.directory,children:[(0,F.jsx)(`header`,{className:P.sectionHeader,children:(0,F.jsxs)(`div`,{children:[(0,F.jsx)(`h2`,{className:P.sectionTitle,id:`doctor-ledger-directory-title`,children:`Doctor ledgers`}),(0,F.jsx)(`p`,{className:P.sectionDescription,children:`Search balances, mandate state, and collection attention.`})]})}),(0,F.jsxs)(re,{emptyState:(0,F.jsx)(xe,{align:`center`,surface:`plain`,children:(0,F.jsxs)(ve,{children:[(0,F.jsx)(ye,{children:`No doctor ledgers`}),(0,F.jsx)(be,{children:`Try a different doctor or attention filter.`})]})}),getRowLabel:e=>`${e.doctorRef===r?`Selected. `:``}Open ledger for ${e.displayName}`,isLoading:t,layout:{borders:`rows`,density:`compact`,stickyHeader:!0,width:`fixed`},onRowClick:e=>n?.(e.doctorRef),recordCount:d.length,table:f,children:[t?null:(0,F.jsxs)(oe,{className:P.toolbar,children:[(0,F.jsx)(_,{className:P.search,label:`Doctor search`,onChange:e=>s(e.currentTarget.value),placeholder:`Name or doctor ref`,prefix:(0,F.jsx)(i,{"aria-hidden":`true`,size:16}),type:`search`,value:a}),(0,F.jsx)(Se,{allowMultiple:!1,fields:R,filters:c,onChange:l,size:`sm`})]}),(0,F.jsx)(te,{"aria-label":`Doctor ledgers`,scrollHeight:`lg`}),!t&&d.length>0?(0,F.jsx)(ee,{pageSizes:[8,16,32]}):null]})]})}function ft({ledger:e}){return(0,F.jsxs)(`section`,{"aria-labelledby":`ledger-summary-title`,className:P.summary,children:[(0,F.jsxs)(`div`,{className:P.summaryHeading,children:[(0,F.jsxs)(`div`,{children:[(0,F.jsx)(`p`,{className:P.eyebrow,children:`Selected ledger`}),(0,F.jsx)(`h2`,{className:P.detailTitle,id:`ledger-summary-title`,children:e.displayName}),(0,F.jsx)(`p`,{className:P.doctorRef,children:e.doctorRef})]}),(0,F.jsxs)(`div`,{className:P.badges,children:[(0,F.jsx)(g,{variant:ct(e.mandateState),children:st(e.mandateState)}),(0,F.jsx)(g,{variant:ut(e.attention),children:lt(e.attention)})]})]}),(0,F.jsxs)(`dl`,{className:P.summaryMetrics,children:[(0,F.jsxs)(`div`,{children:[(0,F.jsx)(`dt`,{children:`Settled balance`}),(0,F.jsx)(`dd`,{children:(0,F.jsx)(b,{value:e.settledBalance})})]}),(0,F.jsxs)(`div`,{children:[(0,F.jsx)(`dt`,{children:`Exposure`}),(0,F.jsx)(`dd`,{children:(0,F.jsx)(b,{value:e.exposure})})]}),(0,F.jsxs)(`div`,{children:[(0,F.jsx)(`dt`,{children:`Credit floor`}),(0,F.jsx)(`dd`,{children:(0,F.jsx)(b,{value:e.creditFloor})})]}),(0,F.jsxs)(`div`,{children:[(0,F.jsx)(`dt`,{children:`Earned this period`}),(0,F.jsx)(`dd`,{children:(0,F.jsx)(w,{value:e.earnedThisPeriod})})]})]})]})}function pt({onSubmit:e}){let[t,n]=(0,I.useState)(``),[r,i]=(0,I.useState)(``),[a,o]=(0,I.useState)(null),[s,c]=(0,I.useState)(!1),[l,u]=(0,I.useState)(!1);return(0,F.jsxs)(fe,{onOpenChange:e=>{e&&(n(``),i(``),o(null),u(!1))},children:[(0,F.jsx)(ce,{asChild:!0,children:(0,F.jsx)(h,{children:`Create adjustment`})}),(0,F.jsxs)(de,{children:[(0,F.jsxs)(ue,{children:[(0,F.jsx)(me,{children:`Create ledger adjustment`}),(0,F.jsx)(pe,{children:`Add a signed correction with an immutable audit reason. Negative values debit the doctor ledger.`})]}),(0,F.jsx)(le,{children:l?(0,F.jsxs)(_e,{tone:`success`,children:[(0,F.jsx)(he,{children:`Adjustment recorded`}),(0,F.jsx)(ge,{children:`The ledger must refresh from the confirmed response.`})]}):(0,F.jsxs)(`form`,{className:P.form,id:`adjustment-form`,noValidate:!0,onSubmit:async n=>{n.preventDefault();let i=C(t.trim());if(!i||i===`0`){o(`Enter a nonzero signed amount in USD minor units.`);return}if(!r.trim()){o(`Audit reason is required.`);return}o(null),c(!0);try{await e?.({amount:{minor:i,currency:`USD`},reason:r.trim(),idempotencyKey:crypto.randomUUID()}),u(!0)}catch{o(`Adjustment was not recorded. Review the values and try again.`)}finally{c(!1)}},children:[(0,F.jsx)(_,{autoComplete:`off`,inputMode:`numeric`,label:`Signed amount (USD minor units)`,onChange:e=>n(e.currentTarget.value),placeholder:`-2500 or 2500`,required:!0,value:t}),(0,F.jsx)(_,{label:`Audit reason`,onChange:e=>i(e.currentTarget.value),required:!0,value:r}),a?(0,F.jsx)(`p`,{className:P.formError,role:`alert`,children:a}):null]})}),(0,F.jsx)(se,{children:l?null:(0,F.jsx)(h,{form:`adjustment-form`,loading:s,type:`submit`,children:`Record adjustment`})})]})]})}function mt({currentFloor:e,onSubmit:t}){let[n,r]=(0,I.useState)(e.minor),[i,a]=(0,I.useState)(``),[o,s]=(0,I.useState)(null),[c,l]=(0,I.useState)(!1);return(0,F.jsxs)(fe,{onOpenChange:t=>{t&&(r(e.minor),a(``),s(null))},children:[(0,F.jsx)(ce,{asChild:!0,children:(0,F.jsx)(h,{variant:`secondary`,children:`Edit credit floor`})}),(0,F.jsxs)(de,{children:[(0,F.jsxs)(ue,{children:[(0,F.jsx)(me,{children:`Edit credit floor`}),(0,F.jsx)(pe,{children:`Set the maximum permitted negative balance and record why it changed.`})]}),(0,F.jsx)(le,{children:(0,F.jsxs)(`form`,{className:P.form,id:`floor-form`,noValidate:!0,onSubmit:async e=>{e.preventDefault();let r=C(n.trim());if(!r||BigInt(r)>0n){s(`Credit floor must be zero or a negative USD minor amount.`);return}if(!i.trim()){s(`Audit reason is required.`);return}s(null),l(!0);try{await t?.({floor:{minor:r,currency:`USD`},reason:i.trim(),idempotencyKey:crypto.randomUUID()})}catch{s(`Credit floor was not changed. Review the values and try again.`)}finally{l(!1)}},children:[(0,F.jsx)(_,{inputMode:`numeric`,label:`New floor (USD minor units)`,onChange:e=>r(e.currentTarget.value),required:!0,value:n}),(0,F.jsx)(_,{label:`Audit reason`,onChange:e=>a(e.currentTarget.value),required:!0,value:i}),o?(0,F.jsx)(`p`,{className:P.formError,role:`alert`,children:o}):null]})}),(0,F.jsx)(se,{children:(0,F.jsx)(h,{form:`floor-form`,loading:c,type:`submit`,children:`Save credit floor`})})]})]})}function ht({pulls:e,onRetry:t}){return(0,F.jsxs)(`section`,{"aria-labelledby":`pull-history-title`,className:P.detailSection,children:[(0,F.jsx)(`header`,{className:P.sectionHeader,children:(0,F.jsxs)(`div`,{children:[(0,F.jsx)(`h3`,{className:P.sectionTitle,id:`pull-history-title`,children:`Pull history`}),(0,F.jsx)(`p`,{className:P.sectionDescription,children:`Trigger, provider result, retry slot, and current eligibility.`})]})}),e.length===0?(0,F.jsx)(`p`,{className:P.quiet,children:`No pull attempts.`}):(0,F.jsx)(`div`,{className:P.tableScroll,tabIndex:0,"aria-label":`Pull history scroll area`,children:(0,F.jsxs)(l,{"aria-label":`Pull history`,children:[(0,F.jsx)(u,{children:(0,F.jsxs)(f,{children:[(0,F.jsx)(d,{children:`Trigger`}),(0,F.jsx)(d,{children:`Amount`}),(0,F.jsx)(d,{children:`Result`}),(0,F.jsx)(d,{children:`Retry`}),(0,F.jsx)(d,{children:`Attempted`})]})}),(0,F.jsx)(s,{children:e.map(e=>(0,F.jsxs)(f,{children:[(0,F.jsx)(p,{children:(0,F.jsx)(g,{variant:e.trigger===`admin_retry`?`warning`:`neutral`,children:e.trigger.replaceAll(`_`,` `)})}),(0,F.jsx)(p,{children:(0,F.jsx)(w,{value:e.amount})}),(0,F.jsx)(p,{children:(0,F.jsxs)(`div`,{className:P.stack,children:[(0,F.jsx)(g,{variant:e.state===`succeeded`?`success`:e.state===`failed`?`danger`:`warning`,children:e.state}),e.failureReason?(0,F.jsx)(`span`,{className:P.failure,children:e.failureReason}):null]})}),(0,F.jsx)(p,{children:(0,F.jsxs)(`div`,{className:P.stack,children:[(0,F.jsx)(`span`,{children:S(e)}),e.retry.allowed?(0,F.jsx)(h,{onClick:()=>t?.(e.pullRef),size:`compact`,variant:`secondary`,children:`Retry scheduled pull`}):(0,F.jsxs)(`span`,{className:P.quiet,children:[`Retry unavailable: `,S(e)]})]})}),(0,F.jsx)(p,{className:P.nowrap,children:v(e.attemptedAt)})]},e.pullRef))})]})})]})}function gt({data:e,onCreateAdjustment:t,onRetry:n,onRetryPull:r,onSelect:i,onSetFloor:a,state:o=`ready`}){return(0,F.jsxs)(`main`,{className:P.page,children:[(0,F.jsx)(`header`,{className:P.pageHeader,children:(0,F.jsxs)(`div`,{children:[(0,F.jsx)(`p`,{className:P.eyebrow,children:`Finance and back office`}),(0,F.jsx)(`h1`,{className:P.pageTitle,children:`Doctor banking`}),(0,F.jsx)(`p`,{className:P.pageDescription,children:`Review person-global ledgers, audited corrections, credit floors, and eligible scheduled-pull retries.`})]})}),o===`permission-denied`?(0,F.jsx)(xe,{align:`center`,surface:`muted`,children:(0,F.jsxs)(ve,{children:[(0,F.jsx)(ye,{children:`Doctor banking permission required`}),(0,F.jsx)(be,{children:`Your current admin role cannot read or manage doctor financial ledgers.`})]})}):o===`error`?(0,F.jsxs)(_e,{tone:`danger`,children:[(0,F.jsx)(he,{children:`Doctor banking unavailable`}),(0,F.jsx)(ge,{children:`No ledger or financial action is shown because the current state could not be verified.`}),(0,F.jsx)(h,{onClick:n,variant:`outline`,children:`Try again`})]}):(0,F.jsxs)(`div`,{className:P.layout,children:[(0,F.jsx)(dt,{ledgers:e.ledgers,loading:o===`loading`,onSelect:i,selectedDoctorRef:e.selected.doctorRef}),o===`loading`?(0,F.jsxs)(`section`,{"aria-label":`Loading ledger detail`,className:P.loadingDetail,role:`status`,children:[(0,F.jsx)(m,{}),(0,F.jsx)(m,{}),(0,F.jsx)(m,{})]}):(0,F.jsxs)(`section`,{"aria-label":`Ledger detail for ${e.selected.displayName}`,className:P.detail,children:[(0,F.jsx)(ft,{ledger:e.selected}),(0,F.jsxs)(`section`,{"aria-labelledby":`ledger-controls-title`,className:P.controls,children:[(0,F.jsxs)(`div`,{children:[(0,F.jsx)(`h3`,{className:P.sectionTitle,id:`ledger-controls-title`,children:`Ledger controls`}),(0,F.jsx)(`p`,{className:P.sectionDescription,children:`Every correction and floor change requires an audit reason and idempotency key.`})]}),(0,F.jsxs)(`div`,{className:P.controlActions,children:[(0,F.jsx)(pt,{onSubmit:t}),(0,F.jsx)(mt,{currentFloor:e.selected.creditFloor,onSubmit:a})]})]}),(0,F.jsx)(Ae,{description:`Latest immutable movements for the selected doctor.`,entries:e.entries,title:`Ledger entries`}),(0,F.jsxs)(`section`,{"aria-labelledby":`floor-history-title`,className:P.detailSection,children:[(0,F.jsx)(`header`,{className:P.sectionHeader,children:(0,F.jsxs)(`div`,{children:[(0,F.jsx)(`h3`,{className:P.sectionTitle,id:`floor-history-title`,children:`Credit floor history`}),(0,F.jsx)(`p`,{className:P.sectionDescription,children:`Previous and current floor with actor, reason, and timestamp.`})]})}),(0,F.jsx)(`div`,{className:P.tableScroll,tabIndex:0,"aria-label":`Credit floor history scroll area`,children:(0,F.jsxs)(l,{"aria-label":`Credit floor history`,children:[(0,F.jsx)(u,{children:(0,F.jsxs)(f,{children:[(0,F.jsx)(d,{children:`Previous`}),(0,F.jsx)(d,{children:`Current`}),(0,F.jsx)(d,{children:`Reason`}),(0,F.jsx)(d,{children:`Changed by`}),(0,F.jsx)(d,{children:`Changed`})]})}),(0,F.jsx)(s,{children:e.floorChanges.map(e=>(0,F.jsxs)(f,{children:[(0,F.jsx)(p,{children:(0,F.jsx)(b,{value:e.previousFloor})}),(0,F.jsx)(p,{children:(0,F.jsx)(b,{value:e.currentFloor})}),(0,F.jsx)(p,{children:e.reason}),(0,F.jsx)(p,{children:e.changedBy.displayName}),(0,F.jsx)(p,{className:P.nowrap,children:v(e.changedAt)})]},`${e.changedAt}-${e.changedBy.actorRef}`))})]})})]}),(0,F.jsx)(ht,{onRetry:r,pulls:e.pulls}),(0,F.jsxs)(`section`,{"aria-labelledby":`admin-notifications-title`,className:P.detailSection,children:[(0,F.jsx)(`header`,{className:P.sectionHeader,children:(0,F.jsxs)(`div`,{children:[(0,F.jsx)(`h3`,{className:P.sectionTitle,id:`admin-notifications-title`,children:`Financial notifications`}),(0,F.jsx)(`p`,{className:P.sectionDescription,children:`Doctor-audience delivery history for this ledger. Operations attention remains separately governed.`})]})}),(0,F.jsx)(`ol`,{className:P.notificationList,children:e.notifications.map(e=>(0,F.jsxs)(`li`,{children:[(0,F.jsx)(`span`,{children:e.kind.replaceAll(`_`,` `)}),(0,F.jsx)(`time`,{dateTime:e.occurredAt,children:v(e.occurredAt)})]},e.notificationRef))})]})]})]})]})}var F,I,L,R,_t=t((()=>{F=r(),I=e(n()),a(),ie(),Ce(),Pe(),y(),Ee(),ot(),L=c(),R=[{key:`attention`,label:`Attention`,type:`select`,options:[{label:`Collection frozen`,value:`collection_frozen`},{label:`Failed pull`,value:`failed_pull`},{label:`Relink required`,value:`relink_required`},{label:`No attention`,value:`none`}]}],gt.__docgenInfo={description:``,methods:[],displayName:`AdminDoctorBankingPage`,props:{data:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  ledgers: DoctorLedgerSummary[];
  selected: DoctorLedgerDetail;
  entries: LedgerEntry[];
  pulls: Pull[];
  floorChanges: FloorChange[];
  notifications: DoctorFinancialNotification[];
}`,signature:{properties:[{key:`ledgers`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  doctorRef: string;
  displayName: string;
  settledBalance: SignedMoney;
  exposure: SignedMoney;
  pendingDebit: Amount;
  reservedDebit: Amount;
  creditFloor: SignedMoney;
  mandateState: MandateState;
  attention: 'none' | 'collection_frozen' | 'failed_pull' | 'relink_required';
}`,signature:{properties:[{key:`doctorRef`,value:{name:`string`,required:!0}},{key:`displayName`,value:{name:`string`,required:!0}},{key:`settledBalance`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`exposure`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`pendingDebit`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`reservedDebit`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`creditFloor`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`mandateState`,value:{name:`union`,raw:`| 'unlinked'
| 'link_pending'
| 'linked'
| 'renewal_required'
| 'expired'
| 'frozen'
| 'deleted'`,elements:[{name:`literal`,value:`'unlinked'`},{name:`literal`,value:`'link_pending'`},{name:`literal`,value:`'linked'`},{name:`literal`,value:`'renewal_required'`},{name:`literal`,value:`'expired'`},{name:`literal`,value:`'frozen'`},{name:`literal`,value:`'deleted'`}],required:!0}},{key:`attention`,value:{name:`union`,raw:`'none' | 'collection_frozen' | 'failed_pull' | 'relink_required'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'collection_frozen'`},{name:`literal`,value:`'failed_pull'`},{name:`literal`,value:`'relink_required'`}],required:!0}}]}}],raw:`DoctorLedgerSummary[]`,required:!0}},{key:`selected`,value:{name:`intersection`,raw:`DoctorLedgerSummary & {
  pendingCredit: Amount;
  earnedThisPeriod: Amount;
  maskedAccount: string | null;
  mandateExpiresAt: IsoDateTime | null;
}`,elements:[{name:`signature`,type:`object`,raw:`{
  doctorRef: string;
  displayName: string;
  settledBalance: SignedMoney;
  exposure: SignedMoney;
  pendingDebit: Amount;
  reservedDebit: Amount;
  creditFloor: SignedMoney;
  mandateState: MandateState;
  attention: 'none' | 'collection_frozen' | 'failed_pull' | 'relink_required';
}`,signature:{properties:[{key:`doctorRef`,value:{name:`string`,required:!0}},{key:`displayName`,value:{name:`string`,required:!0}},{key:`settledBalance`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`exposure`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`pendingDebit`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`reservedDebit`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`creditFloor`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`mandateState`,value:{name:`union`,raw:`| 'unlinked'
| 'link_pending'
| 'linked'
| 'renewal_required'
| 'expired'
| 'frozen'
| 'deleted'`,elements:[{name:`literal`,value:`'unlinked'`},{name:`literal`,value:`'link_pending'`},{name:`literal`,value:`'linked'`},{name:`literal`,value:`'renewal_required'`},{name:`literal`,value:`'expired'`},{name:`literal`,value:`'frozen'`},{name:`literal`,value:`'deleted'`}],required:!0}},{key:`attention`,value:{name:`union`,raw:`'none' | 'collection_frozen' | 'failed_pull' | 'relink_required'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'collection_frozen'`},{name:`literal`,value:`'failed_pull'`},{name:`literal`,value:`'relink_required'`}],required:!0}}]}},{name:`signature`,type:`object`,raw:`{
  pendingCredit: Amount;
  earnedThisPeriod: Amount;
  maskedAccount: string | null;
  mandateExpiresAt: IsoDateTime | null;
}`,signature:{properties:[{key:`pendingCredit`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`earnedThisPeriod`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`maskedAccount`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`mandateExpiresAt`,value:{name:`union`,raw:`IsoDateTime | null`,elements:[{name:`string`,required:!0},{name:`null`}],required:!0}}]}}],required:!0}},{key:`entries`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  entryRef: string;
  kind: LedgerEntryKind;
  state: LedgerEntryState;
  amount: SignedMoney;
  occurredAt: IsoDateTime;
  title: string;
  detail: string;
  orderRef: string | null;
  workspaceLabel: string | null;
}`,signature:{properties:[{key:`entryRef`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`| 'pending_debit'
| 'pending_credit'
| 'completion_debit'
| 'completion_credit'
| 'pending_adjustment'
| 'pending_void'
| 'physical_settlement_offset'
| 'khqr_credit'
| 'aba_pull_credit'
| 'connect_credit'
| 'admin_adjustment'`,elements:[{name:`literal`,value:`'pending_debit'`},{name:`literal`,value:`'pending_credit'`},{name:`literal`,value:`'completion_debit'`},{name:`literal`,value:`'completion_credit'`},{name:`literal`,value:`'pending_adjustment'`},{name:`literal`,value:`'pending_void'`},{name:`literal`,value:`'physical_settlement_offset'`},{name:`literal`,value:`'khqr_credit'`},{name:`literal`,value:`'aba_pull_credit'`},{name:`literal`,value:`'connect_credit'`},{name:`literal`,value:`'admin_adjustment'`}],required:!0}},{key:`state`,value:{name:`union`,raw:`'pending' | 'settled' | 'voided'`,elements:[{name:`literal`,value:`'pending'`},{name:`literal`,value:`'settled'`},{name:`literal`,value:`'voided'`}],required:!0}},{key:`amount`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`occurredAt`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`detail`,value:{name:`string`,required:!0}},{key:`orderRef`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`workspaceLabel`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}}]}}],raw:`LedgerEntry[]`,required:!0}},{key:`pulls`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  pullRef: string;
  trigger: PullTrigger;
  state: PullState;
  amount: Amount;
  attemptedAt: IsoDateTime;
  failureReason: string | null;
  retrySlot: 1 | 2 | 3 | null;
  retry: {
    allowed: boolean;
    reason:
      | 'eligible'
      | 'window_expired'
      | 'not_scheduled'
      | 'budget_exhausted'
      | 'notice_cap_exhausted';
    remainingSlots: number;
    expiresAt: IsoDateTime | null;
    maximumAmount: Amount;
  };
}`,signature:{properties:[{key:`pullRef`,value:{name:`string`,required:!0}},{key:`trigger`,value:{name:`union`,raw:`| 'scheduled'
| 'scheduled_retry'
| 'admin_retry'
| 'jit'
| 'final_unlink'`,elements:[{name:`literal`,value:`'scheduled'`},{name:`literal`,value:`'scheduled_retry'`},{name:`literal`,value:`'admin_retry'`},{name:`literal`,value:`'jit'`},{name:`literal`,value:`'final_unlink'`}],required:!0}},{key:`state`,value:{name:`union`,raw:`'pending' | 'succeeded' | 'failed' | 'cancelled'`,elements:[{name:`literal`,value:`'pending'`},{name:`literal`,value:`'succeeded'`},{name:`literal`,value:`'failed'`},{name:`literal`,value:`'cancelled'`}],required:!0}},{key:`amount`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`attemptedAt`,value:{name:`string`,required:!0}},{key:`failureReason`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`retrySlot`,value:{name:`union`,raw:`1 | 2 | 3 | null`,elements:[{name:`literal`,value:`1`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`null`}],required:!0}},{key:`retry`,value:{name:`signature`,type:`object`,raw:`{
  allowed: boolean;
  reason:
    | 'eligible'
    | 'window_expired'
    | 'not_scheduled'
    | 'budget_exhausted'
    | 'notice_cap_exhausted';
  remainingSlots: number;
  expiresAt: IsoDateTime | null;
  maximumAmount: Amount;
}`,signature:{properties:[{key:`allowed`,value:{name:`boolean`,required:!0}},{key:`reason`,value:{name:`union`,raw:`| 'eligible'
| 'window_expired'
| 'not_scheduled'
| 'budget_exhausted'
| 'notice_cap_exhausted'`,elements:[{name:`literal`,value:`'eligible'`},{name:`literal`,value:`'window_expired'`},{name:`literal`,value:`'not_scheduled'`},{name:`literal`,value:`'budget_exhausted'`},{name:`literal`,value:`'notice_cap_exhausted'`}],required:!0}},{key:`remainingSlots`,value:{name:`number`,required:!0}},{key:`expiresAt`,value:{name:`union`,raw:`IsoDateTime | null`,elements:[{name:`string`,required:!0},{name:`null`}],required:!0}},{key:`maximumAmount`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}}]},required:!0}}]}}],raw:`Pull[]`,required:!0}},{key:`floorChanges`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  previousFloor: SignedMoney;
  currentFloor: SignedMoney;
  reason: string;
  changedBy: { actorRef: string; displayName: string };
  changedAt: IsoDateTime;
}`,signature:{properties:[{key:`previousFloor`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`currentFloor`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`reason`,value:{name:`string`,required:!0}},{key:`changedBy`,value:{name:`signature`,type:`object`,raw:`{ actorRef: string; displayName: string }`,signature:{properties:[{key:`actorRef`,value:{name:`string`,required:!0}},{key:`displayName`,value:{name:`string`,required:!0}}]},required:!0}},{key:`changedAt`,value:{name:`string`,required:!0}}]}}],raw:`FloorChange[]`,required:!0}},{key:`notifications`,value:{name:`Array`,elements:[{name:`union`,raw:`| {
    notificationRef: string;
    audience: 'doctor';
    kind: 'pre_notice';
    occurredAt: IsoDateTime;
    sweepDate: string;
    originalCap: Amount;
    remainingCap: Amount;
    state: 'pending_record' | 'sent' | 'partly_collected' | 'collected' | 'expired';
  }
| {
    notificationRef: string;
    audience: 'doctor';
    kind: 'receipt';
    occurredAt: IsoDateTime;
    source: 'khqr' | PullTrigger;
    amount: Amount;
    balanceAfter: SignedMoney;
  }
| {
    notificationRef: string;
    audience: 'doctor';
    kind: 'pull_failed';
    occurredAt: IsoDateTime;
    pullRef: string;
    trigger: PullTrigger;
    retrySlot: 1 | 2 | 3 | null;
    amount: Amount;
    failureReason: string;
    retryState: 'retry_pending' | 'retries_exhausted' | 'not_retryable';
    nextAction: 'retry_tomorrow' | 'settle_now' | 'relink' | 'wait_next_sweep';
  }
| {
    notificationRef: string;
    audience: 'doctor';
    kind: 'mandate';
    occurredAt: IsoDateTime;
    event: 'linked' | 'renewal_required' | 'expired' | 'unlinked';
    maskedAccount: string | null;
    expiresAt: IsoDateTime | null;
    connectCredit: Amount | null;
    remainingBalance: SignedMoney | null;
  }
| {
    notificationRef: string;
    audience: 'doctor';
    kind: 'adjustment';
    occurredAt: IsoDateTime;
    entryRef: string;
    amount: SignedMoney;
    reason: string;
  }`,elements:[{name:`signature`,type:`object`,raw:`{
  notificationRef: string;
  audience: 'doctor';
  kind: 'pre_notice';
  occurredAt: IsoDateTime;
  sweepDate: string;
  originalCap: Amount;
  remainingCap: Amount;
  state: 'pending_record' | 'sent' | 'partly_collected' | 'collected' | 'expired';
}`,signature:{properties:[{key:`notificationRef`,value:{name:`string`,required:!0}},{key:`audience`,value:{name:`literal`,value:`'doctor'`,required:!0}},{key:`kind`,value:{name:`literal`,value:`'pre_notice'`,required:!0}},{key:`occurredAt`,value:{name:`string`,required:!0}},{key:`sweepDate`,value:{name:`string`,required:!0}},{key:`originalCap`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`remainingCap`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`state`,value:{name:`union`,raw:`'pending_record' | 'sent' | 'partly_collected' | 'collected' | 'expired'`,elements:[{name:`literal`,value:`'pending_record'`},{name:`literal`,value:`'sent'`},{name:`literal`,value:`'partly_collected'`},{name:`literal`,value:`'collected'`},{name:`literal`,value:`'expired'`}],required:!0}}]}},{name:`signature`,type:`object`,raw:`{
  notificationRef: string;
  audience: 'doctor';
  kind: 'receipt';
  occurredAt: IsoDateTime;
  source: 'khqr' | PullTrigger;
  amount: Amount;
  balanceAfter: SignedMoney;
}`,signature:{properties:[{key:`notificationRef`,value:{name:`string`,required:!0}},{key:`audience`,value:{name:`literal`,value:`'doctor'`,required:!0}},{key:`kind`,value:{name:`literal`,value:`'receipt'`,required:!0}},{key:`occurredAt`,value:{name:`string`,required:!0}},{key:`source`,value:{name:`union`,raw:`'khqr' | PullTrigger`,elements:[{name:`literal`,value:`'khqr'`},{name:`union`,raw:`| 'scheduled'
| 'scheduled_retry'
| 'admin_retry'
| 'jit'
| 'final_unlink'`,elements:[{name:`literal`,value:`'scheduled'`},{name:`literal`,value:`'scheduled_retry'`},{name:`literal`,value:`'admin_retry'`},{name:`literal`,value:`'jit'`},{name:`literal`,value:`'final_unlink'`}],required:!0}],required:!0}},{key:`amount`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`balanceAfter`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}}]}},{name:`signature`,type:`object`,raw:`{
  notificationRef: string;
  audience: 'doctor';
  kind: 'pull_failed';
  occurredAt: IsoDateTime;
  pullRef: string;
  trigger: PullTrigger;
  retrySlot: 1 | 2 | 3 | null;
  amount: Amount;
  failureReason: string;
  retryState: 'retry_pending' | 'retries_exhausted' | 'not_retryable';
  nextAction: 'retry_tomorrow' | 'settle_now' | 'relink' | 'wait_next_sweep';
}`,signature:{properties:[{key:`notificationRef`,value:{name:`string`,required:!0}},{key:`audience`,value:{name:`literal`,value:`'doctor'`,required:!0}},{key:`kind`,value:{name:`literal`,value:`'pull_failed'`,required:!0}},{key:`occurredAt`,value:{name:`string`,required:!0}},{key:`pullRef`,value:{name:`string`,required:!0}},{key:`trigger`,value:{name:`union`,raw:`| 'scheduled'
| 'scheduled_retry'
| 'admin_retry'
| 'jit'
| 'final_unlink'`,elements:[{name:`literal`,value:`'scheduled'`},{name:`literal`,value:`'scheduled_retry'`},{name:`literal`,value:`'admin_retry'`},{name:`literal`,value:`'jit'`},{name:`literal`,value:`'final_unlink'`}],required:!0}},{key:`retrySlot`,value:{name:`union`,raw:`1 | 2 | 3 | null`,elements:[{name:`literal`,value:`1`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`null`}],required:!0}},{key:`amount`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`failureReason`,value:{name:`string`,required:!0}},{key:`retryState`,value:{name:`union`,raw:`'retry_pending' | 'retries_exhausted' | 'not_retryable'`,elements:[{name:`literal`,value:`'retry_pending'`},{name:`literal`,value:`'retries_exhausted'`},{name:`literal`,value:`'not_retryable'`}],required:!0}},{key:`nextAction`,value:{name:`union`,raw:`'retry_tomorrow' | 'settle_now' | 'relink' | 'wait_next_sweep'`,elements:[{name:`literal`,value:`'retry_tomorrow'`},{name:`literal`,value:`'settle_now'`},{name:`literal`,value:`'relink'`},{name:`literal`,value:`'wait_next_sweep'`}],required:!0}}]}},{name:`signature`,type:`object`,raw:`{
  notificationRef: string;
  audience: 'doctor';
  kind: 'mandate';
  occurredAt: IsoDateTime;
  event: 'linked' | 'renewal_required' | 'expired' | 'unlinked';
  maskedAccount: string | null;
  expiresAt: IsoDateTime | null;
  connectCredit: Amount | null;
  remainingBalance: SignedMoney | null;
}`,signature:{properties:[{key:`notificationRef`,value:{name:`string`,required:!0}},{key:`audience`,value:{name:`literal`,value:`'doctor'`,required:!0}},{key:`kind`,value:{name:`literal`,value:`'mandate'`,required:!0}},{key:`occurredAt`,value:{name:`string`,required:!0}},{key:`event`,value:{name:`union`,raw:`'linked' | 'renewal_required' | 'expired' | 'unlinked'`,elements:[{name:`literal`,value:`'linked'`},{name:`literal`,value:`'renewal_required'`},{name:`literal`,value:`'expired'`},{name:`literal`,value:`'unlinked'`}],required:!0}},{key:`maskedAccount`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`expiresAt`,value:{name:`union`,raw:`IsoDateTime | null`,elements:[{name:`string`,required:!0},{name:`null`}],required:!0}},{key:`connectCredit`,value:{name:`union`,raw:`Amount | null`,elements:[{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0},{name:`null`}],required:!0}},{key:`remainingBalance`,value:{name:`union`,raw:`SignedMoney | null`,elements:[{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0},{name:`null`}],required:!0}}]}},{name:`signature`,type:`object`,raw:`{
  notificationRef: string;
  audience: 'doctor';
  kind: 'adjustment';
  occurredAt: IsoDateTime;
  entryRef: string;
  amount: SignedMoney;
  reason: string;
}`,signature:{properties:[{key:`notificationRef`,value:{name:`string`,required:!0}},{key:`audience`,value:{name:`literal`,value:`'doctor'`,required:!0}},{key:`kind`,value:{name:`literal`,value:`'adjustment'`,required:!0}},{key:`occurredAt`,value:{name:`string`,required:!0}},{key:`entryRef`,value:{name:`string`,required:!0}},{key:`amount`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`reason`,value:{name:`string`,required:!0}}]}}]}],raw:`DoctorFinancialNotification[]`,required:!0}}]}},description:``},state:{required:!1,tsType:{name:`union`,raw:`| 'ready'
| 'loading'
| 'error'
| 'permission-denied'
| 'not-eligible'`,elements:[{name:`literal`,value:`'ready'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'permission-denied'`},{name:`literal`,value:`'not-eligible'`}]},description:``,defaultValue:{value:`'ready'`,computed:!1}},onCreateAdjustment:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(input: AdjustmentInput) => Promise<void> | void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{ amount: SignedMoney; reason: string; idempotencyKey: string }`,signature:{properties:[{key:`amount`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`reason`,value:{name:`string`,required:!0}},{key:`idempotencyKey`,value:{name:`string`,required:!0}}]}},name:`input`}],return:{name:`union`,raw:`Promise<void> | void`,elements:[{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`},{name:`void`}]}}},description:``},onRetry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRetryPull:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(pullRef: string) => void`,signature:{arguments:[{type:{name:`string`},name:`pullRef`}],return:{name:`void`}}},description:``},onSelect:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(doctorRef: string) => void`,signature:{arguments:[{type:{name:`string`},name:`doctorRef`}],return:{name:`void`}}},description:``},onSetFloor:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(input: FloorInput) => Promise<void> | void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{ floor: SignedMoney; reason: string; idempotencyKey: string }`,signature:{properties:[{key:`floor`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`reason`,value:{name:`string`,required:!0}},{key:`idempotencyKey`,value:{name:`string`,required:!0}}]}},name:`input`}],return:{name:`union`,raw:`Promise<void> | void`,elements:[{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`},{name:`void`}]}}},description:``}}}})),z,B,V,H,vt,U,W,G,K,q,J,Y,X,Z,Q,$;t((()=>{we(),Te(),_t(),{expect:z,fn:B,userEvent:V,within:H}=__STORYBOOK_MODULE_TEST__,vt={title:`Platform Admin/Finance/Ledgers`,component:gt,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:De,docs:{description:{component:`Admin doctor-banking workbench for person-global ledger review. It composes canonical Kura DataGrid, Filters, Table, Dialog, Input, MoneyText, and status primitives around audited adjustments, non-positive credit floors, and contract-owned pull retry eligibility.`}}},args:{data:T,state:`ready`,onCreateAdjustment:B(),onRetry:B(),onRetryPull:B(),onSelect:B(),onSetFloor:B()}},U={play:async({canvasElement:e,args:t})=>{let n=H(e);await z(n.getByRole(`heading`,{name:`Doctor banking`})).toBeVisible(),await z(n.getByRole(`table`,{name:`Doctor ledgers`})).toBeVisible(),await V.click(n.getByRole(`button`,{name:`Retry scheduled pull`})),await z(t.onRetryPull).toHaveBeenCalledWith(`pull-101`)}},W={play:async({canvasElement:e,args:t})=>{let n=H(e);await V.click(n.getByRole(`button`,{name:`Create adjustment`}));let r=H(document.body).getByRole(`dialog`,{name:`Create ledger adjustment`});await V.type(H(r).getByRole(`textbox`,{name:`Signed amount (USD minor units)`}),`-2500`),await V.type(H(r).getByRole(`textbox`,{name:`Audit reason`}),`Duplicate earning reversal`),await V.click(H(r).getByRole(`button`,{name:`Record adjustment`})),await z(t.onCreateAdjustment).toHaveBeenCalled(),await z(H(r).getByText(`Adjustment recorded`)).toBeVisible()}},G={args:{data:{...T,ledgers:[]}},play:async({canvasElement:e})=>{await z(H(e).getByText(`No doctor ledgers`)).toBeVisible()}},K={args:{data:{...T,entries:[],pulls:[],floorChanges:[]}}},q={args:{state:`loading`}},J={args:{state:`error`},play:async({canvasElement:e,args:t})=>{let n=H(e);await V.click(n.getByRole(`button`,{name:`Try again`})),await z(t.onRetry).toHaveBeenCalled()}},Y={args:{state:`permission-denied`},play:async({canvasElement:e})=>{let t=H(e);await z(t.getByText(`Doctor banking permission required`)).toBeVisible(),await z(t.queryByText(x.displayName)).not.toBeInTheDocument()}},X={args:{data:{...T,selected:{...x,displayName:`Dr. Chanthavysouk Keomanivong-Rattanakosin`},floorChanges:T.floorChanges.map((e,t)=>t===0?{...e,reason:`Approved temporary floor change after documented review of the doctor’s multi-workspace onboarding period and scheduled collection history.`}:e)}}},Z={parameters:{viewport:{defaultViewport:`kura320`}}},Q={parameters:{viewport:{defaultViewport:`kura768`}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Doctor banking'
    })).toBeVisible();
    await expect(canvas.getByRole('table', {
      name: 'Doctor ledgers'
    })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Retry scheduled pull'
    }));
    await expect(args.onRetryPull).toHaveBeenCalledWith('pull-101');
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Create adjustment'
    }));
    const dialog = within(document.body).getByRole('dialog', {
      name: 'Create ledger adjustment'
    });
    await userEvent.type(within(dialog).getByRole('textbox', {
      name: 'Signed amount (USD minor units)'
    }), '-2500');
    await userEvent.type(within(dialog).getByRole('textbox', {
      name: 'Audit reason'
    }), 'Duplicate earning reversal');
    await userEvent.click(within(dialog).getByRole('button', {
      name: 'Record adjustment'
    }));
    await expect(args.onCreateAdjustment).toHaveBeenCalled();
    await expect(within(dialog).getByText('Adjustment recorded')).toBeVisible();
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    data: {
      ...adminFixture,
      ledgers: []
    }
  },
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).getByText('No doctor ledgers')).toBeVisible();
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    data: {
      ...adminFixture,
      entries: [],
      pulls: [],
      floorChanges: []
    }
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'loading'
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'error'
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Try again'
    }));
    await expect(args.onRetry).toHaveBeenCalled();
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'permission-denied'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Doctor banking permission required')).toBeVisible();
    await expect(canvas.queryByText(selectedLedger.displayName)).not.toBeInTheDocument();
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    data: {
      ...adminFixture,
      selected: {
        ...selectedLedger,
        displayName: 'Dr. Chanthavysouk Keomanivong-Rattanakosin'
      },
      floorChanges: adminFixture.floorChanges.map((change, index) => index === 0 ? {
        ...change,
        reason: 'Approved temporary floor change after documented review of the doctor’s multi-workspace onboarding period and scheduled collection history.'
      } : change)
    }
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura768'
    }
  }
}`,...Q.parameters?.docs?.source}}},$=[`DirectoryAndLedgerDetail`,`CreateAdjustmentValidation`,`EmptyDirectory`,`NoPullOrLedgerHistory`,`Loading`,`RecoverableFailure`,`PermissionDenied`,`LongDoctorNameAndAuditReason`,`Mobile320`,`Tablet768`]}))();export{W as CreateAdjustmentValidation,U as DirectoryAndLedgerDetail,G as EmptyDirectory,q as Loading,X as LongDoctorNameAndAuditReason,Z as Mobile320,K as NoPullOrLedgerHistory,Y as PermissionDenied,J as RecoverableFailure,Q as Tablet768,$ as __namedExportsOrder,vt as default};