import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{At as i,Ct as a,F as o,Ht as s,J as c,M as l,Nt as u,Rt as d,U as f,Ut as p,X as m,Y as h,_t as g,it as _,k as ee,mt as te,tt as ne}from"./provider-marks-BeHzyBjc.js";import{t as v}from"./icons-C5MW4nvJ.js";import{Ar as re,Cr as ie,Dr as ae,Er as oe,Or as se,Sr as ce,Tr as le,an as y,dn as b,f as ue,fr as de,h as x,in as S,ln as fe,nn as C,qt as pe,rn as w,sn as me,t as T,wr as he}from"./ui-C9kmmzkH.js";import{a as ge,r as _e}from"./skeleton-yGvKPj3C.js";import{d as ve}from"./date-range-picker-CVkMECHY.js";import{t as ye}from"./settings-modal-DFqsiPWF.js";import{i as be,n as xe,r as Se,t as Ce}from"./alert-l7nmjmGJ.js";import{t as E}from"./button-B6_zsN5-.js";import{a as D}from"./collapsible-Cfc9M9oP.js";import{t as we}from"./segmented-toggle-DDpNscFF.js";import{t as Te}from"./input-UaJWx_9h.js";import{l as Ee,o as De,r as Oe,t as ke}from"./card-DMMaaphC.js";import{t as Ae}from"./select-WVTSimR_.js";import{t as je}from"./switch-CTGrhoKf.js";import{i as Me,n as O,r as Ne,t as Pe}from"./tabs-C4OYmenm.js";import{r as Fe,t as Ie}from"./readiness-data-D41RGqZh.js";function Le(e,t){let n=new Date(`${t}T00:00:00+07:00`),r=new Date(`${e}T00:00:00+07:00`);return Math.max(0,Math.ceil((r.getTime()-n.getTime())/Ze))}function Re(e,t){return t.trim()?null:`${e} is required.`}function ze(e,t,n){let r=t.trim();return r?n.some(e=>e.toLowerCase()===r.toLowerCase())?`${r} is already listed.`:null:`${e} is required.`}function Be(e){return`${(et.find(t=>t.id===e.routeId)??et[0]).label} · ${e.days.join(` / `)} · ${e.time} pickup`}function Ve(e){return e.days.length>0?null:`Select at least one pickup day.`}function He(e){let[t,n]=e.split(`:`);return`${Number(t)}:${n}`}function Ue(e){let t=[],n=null,r=null,i=``,a=()=>{if(!n||!r)return;let{from:a,to:o}=e[n],s=n===r?n:`${n} to ${r}`;t.push(`${s} · ${He(a)} to ${He(o)}`),n=null,r=null,i=``};for(let t of rt){let o=e[t.id],s=o.open?`${o.from}-${o.to}`:``;o.open&&s===i?r=t.id:(a(),o.open&&(n=t.id,r=t.id,i=s))}return a(),t.length>0?t.join(`, `):`Closed`}function We(e){return rt.some(t=>{let n=e[t.id];return n.open&&n.from>=n.to})?`Closing time must be after opening time.`:null}function Ge(e,t){if(e===`custom`)return t;let n=e===`weekdays`?[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`]:[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`];return rt.reduce((e,t)=>(e[t.id]=n.includes(t.id)?{...at}:{...ot},e),{})}function Ke(e,t,n){let r=e.trim();return r?[...t,...n].some(e=>e.name.toLowerCase()===r.toLowerCase())?`${r} is already in this workspace.`:null:`Member name is required.`}function qe(){try{let e=window.localStorage.getItem(ct);return e?{...st,...JSON.parse(e)}:st}catch{return st}}function Je(e){try{window.localStorage.setItem(ct,JSON.stringify(e))}catch{}}function Ye(e,t,n=`text/plain`){if(typeof document>`u`)return;let r=new Blob([t],{type:n}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=e,document.body.append(a),a.click(),a.remove(),URL.revokeObjectURL(i)}var Xe,Ze,Qe,$e,et,tt,nt,rt,it,at,ot,k,st,ct,A,j=t((()=>{Xe=[{id:`overview`,label:`Overview`,group:`Workspace`},{id:`account`,label:`Account & verification`,group:`Workspace`},{id:`cabinet`,label:`Cabinet`,group:`Workspace`},{id:`members`,label:`Team access`,group:`Workspace`},{id:`preferences`,label:`Preferences`,group:`Workspace`},{id:`communications`,label:`Patient messages`,group:`Operations`},{id:`billing`,label:`Payments`,group:`Operations`},{id:`directory`,label:`Directory profile`,group:`Operations`},{id:`esign`,label:`Signed documents`,group:`Trust`},{id:`security`,label:`Security`,group:`Trust`}],Ze=1440*60*1e3,Qe={none:{label:`Not submitted`,badge:`neutral`},pending_review:{label:`Under review`,badge:`info`},rejected:{label:`Action required`,badge:`danger`},verified:{label:`Verified`,badge:`success`},expiring:{label:`Expiring`,badge:`warning`},in_grace:{label:`In grace`,badge:`warning`},lapsed:{label:`Lapsed`,badge:`danger`}},$e={none:{tone:`info`,title:`Submit your professional licence`,body:`Catalog and prices remain available. New clinic orders still require explicit order capability and a live attributed prescriber.`,cta:`Submit licence`},pending_review:{tone:`info`,title:`Your professional licence is under review`,body:`The submitted record is awaiting a reviewer verdict and is not live for attribution yet.`,cta:`View status`},rejected:{tone:`danger`,title:`Your professional licence submission was rejected`,body:`Review the reason and create a corrected submission. The rejected attempt remains in the audit history.`,cta:`Review and resubmit`},expiring:{tone:`warning`,title:`Your professional licence is expiring`,body:`It remains live for attribution. Renew it before the current credential lapses.`,cta:`Renew licence`},in_grace:{tone:`warning`,title:`Your professional licence is in its grace period`,body:`It remains live for attribution during grace. Renew it before the lapse deadline.`,cta:`Renew licence`},lapsed:{tone:`danger`,title:`Your professional licence has lapsed`,body:`New clinic orders cannot attribute prescribing to you. Previously placed episodes are not revoked retroactively.`,cta:`Renew licence`}},et=[{id:`PP-02`,label:`Route PP-02`,detail:`BKK / Daun Penh`},{id:`PP-04`,label:`Route PP-04`,detail:`Toul Kork loop`},{id:`PP-07`,label:`Route PP-07`,detail:`Sen Sok / airport`}],tt=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`],nt=[`10:00`,`12:00`,`14:00`,`16:00`,`18:00`],rt=[{id:`Mon`,label:`Monday`},{id:`Tue`,label:`Tuesday`},{id:`Wed`,label:`Wednesday`},{id:`Thu`,label:`Thursday`},{id:`Fri`,label:`Friday`},{id:`Sat`,label:`Saturday`},{id:`Sun`,label:`Sunday`}],it=Array.from({length:31},(e,t)=>{let n=6+Math.floor(t/2);return`${String(n).padStart(2,`0`)}:${t%2==0?`00`:`30`}`}),at={open:!0,from:`08:00`,to:`17:30`},ot={open:!1,from:`08:00`,to:`12:00`},k=[`Doctor`,`Care coordinator`,`Phlebotomist`,`Reception`,`Accountant`],st={units:`conventional`,language:`en`,theme:`light`,inlineRef:!0,collapseNormal:!1,clock24:!0},ct=`kura.preferences.v1`,A={units:e=>e.units===`conventional`?`Conventional (mg/dL)`:`SI (mmol/L)`,theme:e=>e.theme===`light`?`Light`:e.theme===`dark`?`Dark`:`Match system`,language:e=>e.language===`en`?`English`:`Khmer`,inlineRef:e=>e.inlineRef?`Shown inline`:`Hidden until opened`,collapseNormal:e=>e.collapseNormal?`Collapsed by default`:`Expanded by default`,clock24:e=>e.clock24?`24-hour`:`12-hour`}}));function lt(e=wt){return[`Document,Signed at`,...e.map(e=>`${e.doc},${e.when}`)].join(`
`)}var M,ut,dt,ft,N,pt,mt,ht,gt,_t,vt,yt,bt,xt,St,Ct,wt,Tt,Et,Dt,Ot=t((()=>{j(),M={name:`Dr. Phong Tuy`,khmerName:`វេជ្ជបណ្ឌិត ភុង ទុយ`,initials:`PT`,email:`leon@kura.med`,license:`CMC 048-2019`,licenseExpiry:`Jul 20, 2026`,licenseExpiryIso:`2026-07-20`,tier:`Verified clinician`},ut=`2026-06-22`,dt=Le(M.licenseExpiryIso,ut),ft=`${dt} days`,N={name:`Kura Cabinet, Toul Kork`,address:`St. 315, Boeung Kak 2, Toul Kork, Phnom Penh`,specialty:`Endocrinology · internal medicine`,clinicType:`Private cabinet`,country:`Cambodia`,timezone:`Asia/Phnom_Penh · GMT+7`,currency:`USD · KHR displayed at NBC rate`},pt={routeId:`PP-04`,days:[`Mon`,`Wed`,`Fri`],time:`16:00`},mt=[{name:`Phong Tuy`,role:`Owner · Doctor`,you:!0},{name:`Sophea Lim`,role:`Doctor`},{name:`Ratha Kim`,role:`Care coordinator`},{name:`Dara Sok`,role:`Phlebotomist`},{name:`Mealea Chan`,role:`Reception`}],ht=[{name:`Visal Nuon`,role:`Accountant`,sent:`invited 2 days ago`}],gt=[{name:`Telegram`,note:`Default for 92% of reachable patients`,state:`active`},{name:`SMS`,note:`Fallback after 30 min unread`,state:`fallback`},{name:`Email`,note:`Fallback for receipts and documents`,state:`fallback`}],_t=[`Results ready`,`Follow up reminder`,`Booking confirmation`],vt={"Results ready":`Your results are ready in Kura.`,"Follow up reminder":`Your follow up is due soon. Please book a time.`,"Booking confirmation":`Your booking is confirmed. We will remind you before the visit.`},yt=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 44 44"><rect width="44" height="44" fill="#fff"/><rect x="2" y="2" width="12" height="12" fill="none" stroke="#0b1424" stroke-width="2"/><rect x="30" y="2" width="12" height="12" fill="none" stroke="#0b1424" stroke-width="2"/><rect x="2" y="30" width="12" height="12" fill="none" stroke="#0b1424" stroke-width="2"/><path d="M20 20h4v4h-4zM30 30h4v4h-4zM38 30h4M30 38h4M38 38h4v4" fill="none" stroke="#0b1424" stroke-width="2"/></svg>`,bt={Mon:{open:!0,from:`08:00`,to:`17:30`},Tue:{open:!0,from:`08:00`,to:`17:30`},Wed:{open:!0,from:`08:00`,to:`17:30`},Thu:{open:!0,from:`08:00`,to:`17:30`},Fri:{open:!0,from:`08:00`,to:`17:30`},Sat:{open:!0,from:`08:00`,to:`17:30`},Sun:{open:!1,from:`08:00`,to:`12:00`}},xt=[`ភាសាខ្មែរ`,`English`],St=[`Diabetes care`,`CKD management`,`Hypertension`],Ct=`Endocrinologist focused on long-term diabetes and kidney care in Phnom Penh.`,wt=[{doc:`e-Prescription #2841`,when:`Jun 10, 2026 · 14:32`},{doc:`Lab requisition FZ-38245`,when:`Jun 9, 2026 · 09:18`},{doc:`Dx letter for Sokha Chan`,when:`Jun 2, 2026 · 16:05`}],Tt={id:`current`,label:`MacBook Pro · Phnom Penh`,detail:`This device`,sub:`Chrome · signed in 3 days ago`},Et=[{id:`iphone-15`,label:`iPhone 15 · Telegram linked`,detail:`Mobile companion`,sub:`Last active today · 08:55`}],Dt=[{what:`Exported lab history PDF (watermarked)`,who:`You`,when:`Today · 09:12`},{what:`Viewed Sokha Chan record`,who:`Ratha Kim`,when:`Yesterday · 17:40`},{what:`Invite sent to Visal Nuon (Accountant)`,who:`You`,when:`2 days ago`}]})),kt,At,jt,Mt,Nt,Pt,Ft,It,Lt,Rt,zt,Bt,Vt,Ht,Ut,Wt,Gt,Kt,qt,Jt,Yt,Xt,Zt,Qt,$t,en,tn,nn,rn,an,on,sn,cn,ln,un,dn,fn,pn,mn,hn,gn,_n,vn,yn,bn,xn,Sn,Cn,wn,Tn,En,Dn,On,kn,An,jn,Mn,Nn,Pn,Fn,In,Ln,Rn,P,zn=t((()=>{kt=`_root_1jtfu_7`,At=`_pageHeader_1jtfu_18`,jt=`_pageTitle_1jtfu_25`,Mt=`_pageDescription_1jtfu_33`,Nt=`_settingsTabs_1jtfu_41`,Pt=`_rail_1jtfu_47`,Ft=`_railList_1jtfu_54`,It=`_railItem_1jtfu_61`,Lt=`_railGroup_1jtfu_66`,Rt=`_railIcon_1jtfu_84`,zt=`_railLabel_1jtfu_95`,Bt=`_body_1jtfu_104`,Vt=`_section_1jtfu_109`,Ht=`_sectionHeader_1jtfu_115`,Ut=`_sectionTitleRow_1jtfu_121`,Wt=`_sectionTitle_1jtfu_121`,Gt=`_sectionSub_1jtfu_135`,Kt=`_sectionFootnote_1jtfu_141`,qt=`_block_1jtfu_147`,Jt=`_blockHeader_1jtfu_151`,Yt=`_blockTitle_1jtfu_156`,Xt=`_blockContent_1jtfu_162`,Zt=`_rowsCardContent_1jtfu_163`,Qt=`_rowsCard_1jtfu_163`,$t=`_rows_1jtfu_163`,en=`_row_1jtfu_163`,tn=`_settingGrid_1jtfu_196`,nn=`_rowValueCell_1jtfu_206`,rn=`_editCell_1jtfu_207`,an=`_rowLabelCell_1jtfu_217`,on=`_rowLabel_1jtfu_217`,sn=`_rowLock_1jtfu_230`,cn=`_rowValue_1jtfu_206`,ln=`_rowSub_1jtfu_254`,un=`_rowActions_1jtfu_260`,dn=`_rowActionStack_1jtfu_264`,fn=`_valueWithMedia_1jtfu_270`,pn=`_valueWithBadge_1jtfu_276`,mn=`_valueIcon_1jtfu_283`,hn=`_editControls_1jtfu_299`,gn=`_editorFields_1jtfu_305`,_n=`_editorError_1jtfu_312`,vn=`_editorPreview_1jtfu_318`,yn=`_dayFieldset_1jtfu_324`,bn=`_dayLegend_1jtfu_333`,xn=`_dayChecks_1jtfu_340`,Sn=`_dayRows_1jtfu_346`,Cn=`_dayRow_1jtfu_346`,wn=`_dayTimes_1jtfu_363`,Tn=`_dayTimesTo_1jtfu_369`,En=`_chipArea_1jtfu_376`,Dn=`_chips_1jtfu_382`,On=`_chip_1jtfu_376`,kn=`_chipInputRow_1jtfu_395`,An=`_hiddenFileInput_1jtfu_402`,jn=`_srOnly_1jtfu_411`,Mn=`_channelRank_1jtfu_422`,Nn=`_qrRow_1jtfu_436`,Pn=`_qrMark_1jtfu_440`,Fn=`_roleEdit_1jtfu_458`,In=`_inviteForm_1jtfu_465`,Ln=`_dialogContent_1jtfu_475`,Rn=`_rootDialog_1jtfu_480`,P={root:kt,pageHeader:At,pageTitle:jt,pageDescription:Mt,settingsTabs:Nt,rail:Pt,railList:Ft,railItem:It,railGroup:Lt,railIcon:Rt,railLabel:zt,body:Bt,section:Vt,sectionHeader:Ht,sectionTitleRow:Ut,sectionTitle:Wt,sectionSub:Gt,sectionFootnote:Kt,block:qt,blockHeader:Jt,blockTitle:Yt,blockContent:Xt,rowsCardContent:Zt,rowsCard:Qt,rows:$t,row:en,settingGrid:tn,rowValueCell:nn,editCell:rn,rowLabelCell:an,rowLabel:on,rowLock:sn,rowValue:cn,rowSub:ln,rowActions:un,rowActionStack:dn,valueWithMedia:fn,valueWithBadge:pn,valueIcon:mn,editControls:hn,editorFields:gn,editorError:_n,editorPreview:vn,dayFieldset:yn,dayLegend:bn,dayChecks:xn,dayRows:Sn,dayRow:Cn,dayTimes:wn,dayTimesTo:Tn,chipArea:En,chips:Dn,chip:On,chipInputRow:kn,hiddenFileInput:An,srOnly:jn,channelRank:Mn,qrRow:Nn,qrMark:Pn,roleEdit:Fn,inviteForm:In,dialogContent:Ln,rootDialog:Rn}}));function F({title:e,chip:t,sub:n,children:r}){let i=(0,z.useId)(),a=(0,z.useContext)(Jn);return(0,R.jsxs)(`section`,{"aria-labelledby":a?i:void 0,className:P.section,children:[(0,R.jsxs)(`header`,{className:P.sectionHeader,children:[a||t?(0,R.jsxs)(`div`,{className:P.sectionTitleRow,children:[a?(0,R.jsx)(`h2`,{className:P.sectionTitle,id:i,children:e}):null,t]}):null,n?(0,R.jsx)(`p`,{className:P.sectionSub,children:n}):null]}),r]})}function Bn({children:e,visible:t}){return(0,R.jsx)(Jn.Provider,{value:t,children:e})}function I({children:e}){let t=(0,z.useContext)(qn),n=(0,R.jsx)(me,{className:P.rows,children:e});return t?n:(0,R.jsx)(ke,{as:`div`,className:P.rowsCard,size:`sm`,children:(0,R.jsx)(Oe,{className:P.rowsCardContent,children:n})})}function Vn({title:e,children:t}){return(0,R.jsxs)(ke,{as:`div`,className:P.block,size:`sm`,children:[(0,R.jsx)(De,{className:P.blockHeader,children:(0,R.jsx)(Ee,{as:`h3`,className:P.blockTitle,children:e})}),(0,R.jsx)(Oe,{className:P.blockContent,children:(0,R.jsx)(qn.Provider,{value:!0,children:t})})]})}function L({label:e,locked:t=!1,value:n,sub:r,action:i}){return(0,R.jsxs)(C,{className:`${P.row} ${P.settingGrid}`,size:`sm`,children:[(0,R.jsx)(S,{className:P.rowLabelCell,children:(0,R.jsxs)(b,{className:P.rowLabel,children:[e,t?(0,R.jsx)(`span`,{className:P.rowLock,title:`Verified by Kura. Not editable`,children:(0,R.jsx)(_,{"aria-label":`Verified by Kura. Not editable`})}):null]})}),(0,R.jsxs)(`div`,{className:P.rowValueCell,children:[n?(0,R.jsx)(`div`,{className:P.rowValue,children:n}):null,r?(0,R.jsx)(`div`,{className:P.rowSub,children:r}):null]}),i?(0,R.jsx)(w,{className:P.rowActions,children:i}):null]})}function Hn({label:e,initialValue:t,actionLabel:n=`Edit`,sub:r,multiline:i=!1,numeric:a=!1,formatValue:o}){let[s,c]=(0,z.useState)(t),[l,u]=(0,z.useState)(t),[d,f]=(0,z.useState)(!1),[p,m]=(0,z.useState)(null),h=()=>{u(s),m(null),f(!0)},g=()=>{u(s),m(null),f(!1)},_=()=>{let t=Re(e,l);if(t){m(t);return}c(l.trim()),f(!1),m(null),x.success(`${e} updated`)},ee=e=>{e.key===`Enter`&&!i&&(e.preventDefault(),_()),e.key===`Escape`&&(e.preventDefault(),g())};return d?(0,R.jsxs)(C,{className:`${P.row} ${P.settingGrid}`,size:`sm`,children:[(0,R.jsx)(S,{className:P.rowLabelCell,children:(0,R.jsx)(b,{className:P.rowLabel,children:e})}),(0,R.jsxs)(`div`,{className:P.editCell,children:[i?(0,R.jsx)(pe,{"aria-label":e,autoFocus:!0,error:p,onChange:e=>{u(e.target.value),p&&m(null)},onKeyDown:ee,rows:3,value:l}):(0,R.jsx)(Te,{"aria-label":e,autoFocus:!0,error:p,inputMode:a?`numeric`:void 0,onChange:e=>{u(e.target.value),p&&m(null)},onKeyDown:ee,size:`sm`,value:l}),(0,R.jsxs)(`div`,{className:P.editControls,children:[(0,R.jsx)(E,{disabled:!l.trim(),onClick:_,size:`sm`,variant:`primary`,children:`Save`}),(0,R.jsx)(E,{onClick:g,size:`sm`,variant:`ghost`,children:`Cancel`})]})]})]}):(0,R.jsx)(L,{action:(0,R.jsx)(E,{onClick:h,size:`sm`,variant:`ghost`,children:n}),label:e,sub:r,value:o?o(s):s})}function Un({label:e,addLabel:t,placeholder:n,initialItems:r}){let[i,a]=(0,z.useState)([...r]),[o,s]=(0,z.useState)(null),[c,l]=(0,z.useState)(!1),[u,d]=(0,z.useState)(``),[f,p]=(0,z.useState)(null),m=e=>{let t=i.indexOf(e);a(t=>t.filter(t=>t!==e)),s({item:e,index:t}),x(`${e} removed. Undo is available.`)},h=()=>{o&&(a(e=>{let t=[...e];return t.splice(Math.min(o.index,t.length),0,o.item),t}),x.success(`${o.item} restored`),s(null))},g=()=>{let t=ze(e,u,i);if(t){p(t);return}let n=u.trim();a(e=>[...e,n]),x.success(`${n} added`),d(``),p(null),l(!1)};return(0,R.jsx)(L,{label:e,value:(0,R.jsxs)(`div`,{className:P.chipArea,children:[(0,R.jsx)(`div`,{className:P.chips,children:i.length===0?(0,R.jsx)(`span`,{className:P.rowSub,children:`None listed`}):i.map(e=>(0,R.jsxs)(`span`,{className:P.chip,children:[(0,R.jsx)(D,{size:`md`,variant:`neutral`,children:e}),(0,R.jsx)(ve,{"aria-label":`Remove ${e}`,onClick:()=>m(e),size:`micro`,variant:`tertiary`,children:(0,R.jsx)(ee,{"aria-hidden":`true`})})]},e))}),c?(0,R.jsxs)(`div`,{className:P.chipInputRow,children:[(0,R.jsx)(Te,{"aria-label":t,autoFocus:!0,error:f,onChange:e=>{d(e.target.value),f&&p(null)},onKeyDown:e=>{e.key===`Enter`&&(e.preventDefault(),g()),e.key===`Escape`&&(e.preventDefault(),l(!1),d(``),p(null))},placeholder:n,size:`sm`,value:u}),(0,R.jsx)(E,{onClick:g,size:`sm`,variant:`primary`,children:`Add`}),(0,R.jsx)(E,{onClick:()=>{l(!1),d(``),p(null)},size:`sm`,variant:`ghost`,children:`Cancel`})]}):null]}),action:(0,R.jsxs)(`div`,{className:P.rowActionStack,children:[o?(0,R.jsx)(E,{onClick:h,size:`sm`,variant:`ghost`,children:`Undo`}):null,c?null:(0,R.jsx)(E,{onClick:()=>l(!0),size:`sm`,variant:`ghost`,children:t})]})})}function Wn({children:e,accept:t,leadingIcon:n,onSelected:r,variant:i=`ghost`}){let a=(0,z.useRef)(null);return(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(`input`,{accept:t,className:P.hiddenFileInput,onChange:e=>{let t=e.target.files?.[0];t&&(r?.(t),x.success(`${t.name} selected`)),e.target.value=``},ref:a,tabIndex:-1,type:`file`}),(0,R.jsx)(E,{leadingIcon:n,onClick:()=>a.current?.click(),size:`sm`,variant:i,children:e})]})}function Gn({status:e}){let t=Qe[e];return(0,R.jsx)(D,{size:`sm`,variant:t.badge,children:t.label})}function Kn({status:e,onAction:t}){if(e===`verified`)return null;let n=$e[e];return(0,R.jsxs)(Ce,{role:`status`,tone:n.tone,children:[(0,R.jsx)(be,{children:n.title}),(0,R.jsx)(Se,{children:n.body}),(0,R.jsx)(xe,{children:(0,R.jsx)(E,{onClick:t,size:`sm`,variant:`secondary`,children:n.cta})})]})}var R,z,qn,Jn,Yn=t((()=>{R=r(),z=e(n()),T(),v(),j(),zn(),qn=(0,z.createContext)(!1),Jn=(0,z.createContext)(!0),F.__docgenInfo={description:`One settings section: heading, status chip, description, then rows.`,methods:[],displayName:`SettingsSection`,props:{title:{required:!0,tsType:{name:`string`},description:``},chip:{required:!1,tsType:{name:`ReactNode`},description:`Status badge rendered next to the title.`},sub:{required:!1,tsType:{name:`ReactNode`},description:`One-line description of what the section owns.`},children:{required:!1,tsType:{name:`ReactNode`},description:``}}},Bn.__docgenInfo={description:`Lets a containing shell supply the section title without repeating it.`,methods:[],displayName:`SettingsSectionHeadingProvider`,props:{visible:{required:!0,tsType:{name:`boolean`},description:``},children:{required:!1,tsType:{name:`ReactNode`},description:``}}},I.__docgenInfo={description:`ReUI settings-7 row group, promoted to the canonical Kura Card surface.`,methods:[],displayName:`SettingsRows`,props:{children:{required:!1,tsType:{name:`ReactNode`},description:``}}},Vn.__docgenInfo={description:`ReUI settings-7 card anatomy for a named Kura settings group.`,methods:[],displayName:`SettingsBlock`,props:{title:{required:!0,tsType:{name:`string`},description:``},children:{required:!1,tsType:{name:`ReactNode`},description:``}}},L.__docgenInfo={description:`One setting: label on the left, current value plus supporting text in the
middle, and at most one action on the right (ReUI settings-7 row anatomy).`,methods:[],displayName:`SettingsRow`,props:{label:{required:!0,tsType:{name:`ReactNode`},description:``},locked:{required:!1,tsType:{name:`boolean`},description:`Verified-by-Kura fields carry a lock and are not editable.`,defaultValue:{value:`false`,computed:!1}},value:{required:!1,tsType:{name:`ReactNode`},description:``},sub:{required:!1,tsType:{name:`ReactNode`},description:`Supporting text under the value.`},action:{required:!1,tsType:{name:`ReactNode`},description:``}}},Hn.__docgenInfo={description:`The inline editor behind every "Edit/Change" row: value flips to an input
with Save/Cancel, requires a non-empty draft, and confirms with a toast.`,methods:[],displayName:`InlineEditRow`,props:{label:{required:!0,tsType:{name:`string`},description:``},initialValue:{required:!0,tsType:{name:`string`},description:``},actionLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Edit'`,computed:!1}},sub:{required:!1,tsType:{name:`ReactNode`},description:``},multiline:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},numeric:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},formatValue:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: string) => ReactNode`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`ReactNode`}}},description:`Presentation of the committed value (e.g. "$500 per order").`}}},Un.__docgenInfo={description:`Removable chips with an inline add field and single-step undo. Empty lists
say "None listed" rather than disappearing.`,methods:[],displayName:`ChipListRow`,props:{label:{required:!0,tsType:{name:`string`},description:``},addLabel:{required:!0,tsType:{name:`string`},description:``},placeholder:{required:!0,tsType:{name:`string`},description:``},initialItems:{required:!0,tsType:{name:`unknown`},description:``}}},Wn.__docgenInfo={description:`Real file picker behind a canonical button. The prototype acknowledges the
pick locally — there is no upload endpoint.`,methods:[],displayName:`FilePickButton`,props:{children:{required:!0,tsType:{name:`ReactNode`},description:``},accept:{required:!1,tsType:{name:`string`},description:``},leadingIcon:{required:!1,tsType:{name:`ReactNode`},description:``},onSelected:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(file: File) => void`,signature:{arguments:[{type:{name:`File`},name:`file`}],return:{name:`void`}}},description:``},variant:{required:!1,tsType:{name:`union`,raw:`'ghost' | 'secondary'`,elements:[{name:`literal`,value:`'ghost'`},{name:`literal`,value:`'secondary'`}]},description:``,defaultValue:{value:`'ghost'`,computed:!1}}}},Gn.__docgenInfo={description:`License verification state; mirrors the verification store everywhere.`,methods:[],displayName:`VerificationBadge`,props:{status:{required:!0,tsType:{name:`union`,raw:`| 'none'
| 'pending_review'
| 'rejected'
| 'verified'
| 'expiring'
| 'in_grace'
| 'lapsed'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'pending_review'`},{name:`literal`,value:`'rejected'`},{name:`literal`,value:`'verified'`},{name:`literal`,value:`'expiring'`},{name:`literal`,value:`'in_grace'`},{name:`literal`,value:`'lapsed'`}]},description:``}}},Kn.__docgenInfo={description:`Non-verified credential states get a persistent banner with one CTA.`,methods:[],displayName:`VerificationBannerAlert`,props:{status:{required:!0,tsType:{name:`union`,raw:`| 'none'
| 'pending_review'
| 'rejected'
| 'verified'
| 'expiring'
| 'in_grace'
| 'lapsed'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'pending_review'`},{name:`literal`,value:`'rejected'`},{name:`literal`,value:`'verified'`},{name:`literal`,value:`'expiring'`},{name:`literal`,value:`'in_grace'`},{name:`literal`,value:`'lapsed'`}]},description:``},onAction:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));function Xn({initialPickup:e}){let[t,n]=(0,V.useState)(e),[r,i]=(0,V.useState)(e),[a,o]=(0,V.useState)(!1),s=Ve(r),c=()=>{i(t),o(!1)};return a?(0,B.jsxs)(C,{className:`${P.row} ${P.settingGrid}`,onKeyDown:e=>{e.key===`Escape`&&(e.preventDefault(),c())},size:`sm`,children:[(0,B.jsx)(S,{className:P.rowLabelCell,children:(0,B.jsx)(b,{className:P.rowLabel,children:`Courier pickup`})}),(0,B.jsxs)(`div`,{className:P.editCell,children:[(0,B.jsxs)(`div`,{className:P.editorFields,children:[(0,B.jsx)(Ae,{label:`Route`,onValueChange:e=>{e&&i({...r,routeId:e})},options:Qn,value:r.routeId}),(0,B.jsx)(Ae,{label:`Pickup time`,onValueChange:e=>{e&&i({...r,time:e})},options:$n,value:r.time}),(0,B.jsxs)(`fieldset`,{className:P.dayFieldset,children:[(0,B.jsx)(`legend`,{className:P.dayLegend,children:`Pickup days`}),(0,B.jsx)(`div`,{className:P.dayChecks,children:tt.map(e=>(0,B.jsx)(de,{checked:r.days.includes(e),onCheckedChange:t=>{i({...r,days:t?[...r.days,e]:r.days.filter(t=>t!==e)})},children:e},e))}),s?(0,B.jsx)(`p`,{className:P.editorError,role:`alert`,children:s}):null]})]}),(0,B.jsxs)(`div`,{className:P.editControls,children:[(0,B.jsx)(E,{disabled:!!s,onClick:()=>{s||(n(r),o(!1),x.success(`Courier pickup updated`))},size:`sm`,variant:`primary`,children:`Save`}),(0,B.jsx)(E,{onClick:c,size:`sm`,variant:`ghost`,children:`Cancel`})]})]})]}):(0,B.jsx)(L,{action:(0,B.jsx)(E,{onClick:()=>{i(t),o(!0)},size:`sm`,variant:`ghost`,children:`Change route`}),label:`Courier pickup`,value:Be(t)})}function Zn({initialHours:e}){let[t,n]=(0,V.useState)(e),[r,i]=(0,V.useState)(e),[a,o]=(0,V.useState)(`monToSat`),[s,c]=(0,V.useState)(!1),l=We(r),u=()=>{i(t),c(!1)};return s?(0,B.jsxs)(C,{className:`${P.row} ${P.settingGrid}`,onKeyDown:e=>{e.key===`Escape`&&(e.preventDefault(),u())},size:`sm`,children:[(0,B.jsx)(S,{className:P.rowLabelCell,children:(0,B.jsx)(b,{className:P.rowLabel,children:`Hours`})}),(0,B.jsxs)(`div`,{className:P.editCell,children:[(0,B.jsxs)(`div`,{className:P.editorFields,children:[(0,B.jsx)(we,{label:`Hours preset`,labelVisible:!0,onValueChange:e=>{let t=e;o(t),i(Ge(t,r))},options:tr,value:a}),a===`custom`?(0,B.jsx)(`div`,{className:P.dayRows,children:rt.map(e=>{let t=r[e.id];return(0,B.jsxs)(`div`,{className:P.dayRow,children:[(0,B.jsx)(de,{checked:t.open,onCheckedChange:n=>{i({...r,[e.id]:{...t,open:n}})},children:e.label}),t.open?(0,B.jsxs)(`div`,{className:P.dayTimes,children:[(0,B.jsx)(Ae,{"aria-label":`${e.label} opens at`,onValueChange:n=>{n&&i({...r,[e.id]:{...t,from:n}})},options:er,value:t.from}),(0,B.jsx)(`span`,{"aria-hidden":`true`,className:P.dayTimesTo,children:`to`}),(0,B.jsx)(Ae,{"aria-label":`${e.label} closes at`,onValueChange:n=>{n&&i({...r,[e.id]:{...t,to:n}})},options:er,value:t.to})]}):(0,B.jsx)(`span`,{className:P.rowSub,children:`Closed`})]},e.id)})}):null,(0,B.jsx)(`p`,{className:P.editorPreview,children:Ue(r)}),l?(0,B.jsx)(`p`,{className:P.editorError,role:`alert`,children:l}):null]}),(0,B.jsxs)(`div`,{className:P.editControls,children:[(0,B.jsx)(E,{disabled:!!l,onClick:()=>{l||(n(r),c(!1),x.success(`Hours updated`))},size:`sm`,variant:`primary`,children:`Save`}),(0,B.jsx)(E,{onClick:u,size:`sm`,variant:`ghost`,children:`Cancel`})]})]})]}):(0,B.jsx)(L,{action:(0,B.jsx)(E,{onClick:()=>{i(t),c(!0)},size:`sm`,variant:`ghost`,children:`Edit hours`}),label:`Hours`,sub:`Shown to patients in the directory`,value:Ue(t)})}var B,V,Qn,$n,er,tr,nr=t((()=>{B=r(),V=e(n()),T(),j(),Yn(),zn(),Qn=et.map(e=>({value:e.id,label:`${e.label} · ${e.detail}`})),$n=nt.map(e=>({value:e,label:e})),er=it.map(e=>({value:e,label:He(e)})),tr=[{value:`weekdays`,label:`Weekdays`},{value:`monToSat`,label:`Mon to Sat`},{value:`custom`,label:`Custom days`}],Xn.__docgenInfo={description:`Structured courier editor: route, pickup time, and pickup days. Lab
logistics needs at least one day, so Save blocks until one is selected.`,methods:[],displayName:`CourierPickupRow`,props:{initialPickup:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  routeId: CourierRouteId;
  days: CourierDayId[];
  time: CourierTime;
}`,signature:{properties:[{key:`routeId`,value:{name:`unknown[number]['id']`,raw:`(typeof COURIER_ROUTES)[number]['id']`,required:!0}},{key:`days`,value:{name:`Array`,elements:[{name:`unknown[number]`,raw:`(typeof COURIER_DAYS)[number]`}],raw:`CourierDayId[]`,required:!0}},{key:`time`,value:{name:`unknown[number]`,raw:`(typeof COURIER_TIMES)[number]`,required:!0}}]}},description:``}}},Zn.__docgenInfo={description:`Directory display hours: quick presets plus a per-day editor behind
"Custom days". Open days must close after they open.`,methods:[],displayName:`HoursRow`,props:{initialHours:{required:!0,tsType:{name:`Record`,elements:[{name:`unknown[number]['id']`,raw:`(typeof WEEK_DAYS)[number]['id']`},{name:`signature`,type:`object`,raw:`{ open: boolean; from: string; to: string }`,signature:{properties:[{key:`open`,value:{name:`boolean`,required:!0}},{key:`from`,value:{name:`string`,required:!0}},{key:`to`,value:{name:`string`,required:!0}}]}}],raw:`Record<WeekDayId, DayHours>`},description:``}}}}));function rr({firstUse:e=!1,identity:t,verification:n,onNavigate:r,onVerify:i,workspaceName:a}){let o=t?.name??M.name,s=o.split(` `).map(e=>e[0]).join(``).slice(0,2);return(0,H.jsxs)(F,{sub:`Priority settings for this workspace.`,title:`Overview`,children:[!e&&(n===`verified`||n===`expiring`)?(0,H.jsxs)(Ce,{role:`status`,tone:`warning`,children:[(0,H.jsxs)(be,{children:[`Medical license expires in `,ft]}),(0,H.jsxs)(Se,{children:[M.license,` expires `,M.licenseExpiry,`. Renew it before lapse to keep this credential available for new order attribution.`]}),(0,H.jsx)(xe,{children:(0,H.jsx)(E,{onClick:()=>r(`account`),size:`sm`,variant:`secondary`,children:`Upload renewed license`})})]}):(0,H.jsx)(Kn,{onAction:i,status:n}),(0,H.jsxs)(I,{children:[(0,H.jsx)(L,{action:(0,H.jsx)(E,{onClick:()=>r(`account`),size:`sm`,variant:`ghost`,children:`Edit account`}),label:`Signed in as`,sub:e?t?.contact:M.email,value:(0,H.jsxs)(`span`,{className:P.valueWithMedia,children:[(0,H.jsx)(_e,{"aria-hidden":`true`,size:`xs`,children:(0,H.jsx)(ge,{children:e?s:M.initials})}),o]})}),(0,H.jsx)(L,{action:(0,H.jsx)(E,{onClick:i,size:`sm`,variant:`ghost`,children:`Verify license`}),label:`Verification`,sub:`Medical license and identity review`,value:(0,H.jsx)(Gn,{status:n})}),(0,H.jsx)(L,{action:(0,H.jsx)(E,{onClick:()=>r(`cabinet`),size:`sm`,variant:`ghost`,children:`Edit clinic`}),label:`Cabinet`,sub:e?`Created during onboarding`:`Phnom Penh · GMT+7`,value:e?a??`My cabinet`:N.name}),(0,H.jsx)(L,{action:(0,H.jsx)(E,{onClick:()=>r(`members`),size:`sm`,variant:`ghost`,children:`Review team`}),label:`Team`,sub:e?`No pending invites`:`1 invite pending approval`,value:e?`1 active member`:`5 active members`}),(0,H.jsx)(L,{action:(0,H.jsx)(E,{onClick:()=>r(`billing`),size:`sm`,variant:`ghost`,children:`View payments`}),label:`Payments`,sub:e?`No workspace payment methods or insurer panels configured`:`KHQR active · next netting Jul 1`,value:e?`Not configured`:(0,H.jsxs)(`span`,{className:P.valueWithBadge,children:[`Bank verified`,(0,H.jsx)(D,{size:`sm`,variant:`success`,children:`ABA ···· 4102`})]})}),(0,H.jsx)(L,{action:(0,H.jsx)(E,{onClick:()=>r(`esign`),size:`sm`,variant:`ghost`,children:`View documents`}),label:`Signed documents`,sub:e?`No signing certificate or signed documents configured`:`PAdES-B-LT · CamDX root`,value:e?`Not configured`:`Certificate active until Mar 2027`})]})]})}function ir({firstUse:e=!1,identity:t,verification:n,onVerify:r}){let[i,a]=(0,U.useState)(null),o=t?.name??M.name,s=t?.contact??M.email,c=s.startsWith(`+`);return(0,H.jsxs)(F,{chip:(0,H.jsx)(Gn,{status:n}),sub:`Identity details and professional credential review status.`,title:`Account & verification`,children:[(0,H.jsxs)(I,{children:[(0,H.jsx)(L,{label:e&&c?`Phone`:`Email`,sub:e&&c?`Verified primary sign-in phone`:`Used for sign-in and statements`,value:s}),(0,H.jsx)(L,{label:`Clinician name`,locked:!e,sub:e?void 0:M.khmerName,value:o}),(0,H.jsx)(L,{action:(0,H.jsx)(Wn,{accept:`.pdf,.jpg,.jpeg,.png`,leadingIcon:(0,H.jsx)(d,{"aria-hidden":`true`}),onSelected:e=>a(e.name),variant:`secondary`,children:`Upload license`}),label:`Medical license`,locked:!e,sub:i?`${i} selected`:e?n===`none`?`No document submitted`:`Credential identifier and document details are not available`:`Expires ${M.licenseExpiry}`,value:(0,H.jsxs)(`span`,{className:P.valueWithBadge,children:[e?Qe[n].label:M.license,i?(0,H.jsx)(D,{size:`sm`,variant:`info`,children:`File selected`}):e?null:(0,H.jsxs)(D,{size:`sm`,variant:`warning`,children:[`Renews in `,ft]})]})}),(0,H.jsx)(L,{action:(0,H.jsx)(E,{onClick:r,size:`sm`,variant:`ghost`,children:`Verify license`}),label:`License verification`,sub:`A live credential is required only when this member is attributed to a new clinic order`,value:(0,H.jsx)(Gn,{status:n})}),(0,H.jsx)(L,{label:`Review authority`,sub:`Reviewer verdicts are recorded separately from the credential lifecycle`,value:`Kura professional review`}),e?null:(0,H.jsx)(L,{label:`Signature & certificate`,sub:`Managed under Signed documents`,value:(0,H.jsxs)(`span`,{className:P.valueWithMedia,children:[(0,H.jsx)(m,{"aria-hidden":`true`,className:P.valueIcon}),`Ready to sign`]})})]}),(0,H.jsx)(Kn,{onAction:r,status:n})]})}function ar({firstUse:e=!1,workspaceName:t}){return e?(0,H.jsx)(F,{sub:`The clinic this workspace operates under. Add operational details before enabling dependent services.`,title:`Cabinet`,children:(0,H.jsxs)(I,{children:[(0,H.jsx)(L,{label:`Cabinet name`,value:t??`My cabinet`}),(0,H.jsx)(L,{label:`Address`,value:`Not configured`}),(0,H.jsx)(L,{label:`Specialty`,value:`Not configured`}),(0,H.jsx)(L,{label:`Clinic type`,value:`Not configured`}),(0,H.jsx)(L,{label:`Country`,value:`Not configured`}),(0,H.jsx)(L,{label:`Timezone`,value:`Not configured`}),(0,H.jsx)(L,{label:`Currency`,value:`Not configured`}),(0,H.jsx)(L,{label:`Courier pickup`,value:`Not configured`})]})}):(0,H.jsxs)(F,{sub:`The clinic this workspace operates under. Lab routing, billing, and compliance follow these fields.`,title:`Cabinet`,children:[(0,H.jsxs)(I,{children:[(0,H.jsx)(L,{label:`Cabinet name`,value:N.name}),(0,H.jsx)(L,{label:`Address`,value:N.address}),(0,H.jsx)(L,{label:`Specialty`,value:N.specialty}),(0,H.jsx)(L,{label:`Clinic type`,value:N.clinicType}),(0,H.jsx)(L,{label:`Country`,locked:!0,sub:`Determines insurer panel, currency, and patient channels`,value:N.country}),(0,H.jsx)(L,{label:`Timezone`,value:N.timezone}),(0,H.jsx)(L,{label:`Currency`,value:N.currency}),(0,H.jsx)(Xn,{initialPickup:pt})]}),(0,H.jsxs)(Ce,{role:`status`,tone:`info`,children:[(0,H.jsx)(be,{children:`Country is locked after registration`}),(0,H.jsx)(Se,{children:`Billing rails, insurer contracts, and lab logistics are provisioned per country. Contact Kura support to migrate a cabinet across borders.`})]})]})}function or({firstUse:e=!1,identity:t}){let[n,r]=(0,U.useState)(()=>e?[{name:t?.name??`Account owner`,role:`Owner`,you:!0}]:[...mt]),[i,a]=(0,U.useState)(()=>e?[]:[...ht]),[o,s]=(0,U.useState)(null),[c,l]=(0,U.useState)(k[0]),[u,d]=(0,U.useState)(null),[f,p]=(0,U.useState)(null),[m,h]=(0,U.useState)(!1),[g,_]=(0,U.useState)(``),[ee,te]=(0,U.useState)(k[0]),[ne,v]=(0,U.useState)(null),ue=e=>{if(c===e.role){s(null);return}d(e.name)},de=()=>{u&&(r(e=>e.map(e=>e.name===u?{...e,role:c}:e)),x.success(`${u}'s role updated`),d(null),s(null))},pe=()=>{if(!f)return;let{kind:e,invite:t}=f;e===`approve`?(a(e=>e.filter(e=>e.name!==t.name)),r(e=>[...e,{name:t.name,role:t.role}]),x.success(`${t.name} approved as ${t.role}`)):(a(e=>e.filter(e=>e.name!==t.name)),x(`Invite to ${t.name} revoked`)),p(null)},me=()=>{let e=Ke(g,n,i);if(e){v(e);return}let t=g.trim();a(e=>[...e,{name:t,role:ee,sent:`invited just now`}]),x.success(`Invite sent to ${t}`),h(!1),_(``),te(k[0]),v(null)},T=()=>{h(!1),_(``),v(null)};return(0,H.jsxs)(F,{chip:(0,H.jsxs)(D,{size:`sm`,variant:`neutral`,children:[n.length,` active`]}),sub:`Roles scope what each member can see and do. All PHI access is logged.`,title:`Team access`,children:[(0,H.jsxs)(I,{children:[n.map(e=>(0,H.jsxs)(C,{className:P.row,size:`sm`,children:[(0,H.jsx)(fe,{children:(0,H.jsx)(_e,{"aria-hidden":`true`,size:`sm`,...e.you?{ring:`success`}:{},children:(0,H.jsx)(ge,{tone:e.you?`success`:void 0,children:e.name.split(` `).map(e=>e[0]).join(``).slice(0,2)})})}),(0,H.jsxs)(S,{children:[(0,H.jsxs)(b,{className:P.rowLabel,children:[e.name,e.you?(0,H.jsx)(D,{size:`sm`,variant:`outline`,children:`you`}):null]}),(0,H.jsx)(y,{children:e.role})]}),(0,H.jsx)(w,{className:P.rowActions,children:o===e.name?(0,H.jsxs)(`div`,{className:P.roleEdit,children:[(0,H.jsx)(Ae,{"aria-label":`Role for ${e.name}`,onValueChange:e=>{e&&l(e)},options:cr,value:c}),(0,H.jsx)(E,{onClick:()=>ue(e),size:`sm`,variant:`primary`,children:`Save`}),(0,H.jsx)(E,{onClick:()=>s(null),size:`sm`,variant:`ghost`,children:`Cancel`})]}):(0,H.jsx)(E,{disabled:e.you,onClick:()=>{s(e.name),l(k.find(t=>t===e.role)??k[0])},size:`sm`,variant:`ghost`,children:`Edit role`})})]},e.name)),i.map(e=>(0,H.jsxs)(C,{className:P.row,size:`sm`,children:[(0,H.jsx)(fe,{children:(0,H.jsx)(_e,{"aria-hidden":`true`,size:`sm`,children:(0,H.jsx)(ge,{tone:`warning`,children:e.name.split(` `).map(e=>e[0]).join(``).slice(0,2)})})}),(0,H.jsxs)(S,{children:[(0,H.jsxs)(b,{className:P.rowLabel,children:[e.name,(0,H.jsx)(D,{size:`sm`,variant:`warning`,children:`Pending`})]}),(0,H.jsxs)(y,{children:[e.role,` · `,e.sent]})]}),(0,H.jsxs)(w,{className:P.rowActions,children:[(0,H.jsx)(E,{onClick:()=>p({kind:`approve`,invite:e}),size:`sm`,variant:`secondary`,children:`Approve`}),(0,H.jsx)(E,{onClick:()=>p({kind:`revoke`,invite:e}),size:`sm`,variant:`ghost`,children:`Revoke`})]})]},e.name))]}),(0,H.jsxs)(Ce,{role:`status`,tone:`info`,children:[(0,H.jsx)(be,{children:`You are the sole owner`}),(0,H.jsx)(Se,{children:`Transfer ownership to another verified doctor before leaving this cabinet. A cabinet cannot operate without an owner of record.`})]}),m?(0,H.jsxs)(`div`,{className:P.inviteForm,children:[(0,H.jsx)(Te,{error:ne,label:`Member name`,onChange:e=>{_(e.target.value),ne&&v(null)},onKeyDown:e=>{e.key===`Enter`&&(e.preventDefault(),me()),e.key===`Escape`&&(e.preventDefault(),T())},placeholder:`Full name`,size:`sm`,value:g}),(0,H.jsx)(Ae,{label:`Role`,onValueChange:e=>{e&&te(e)},options:cr,value:ee}),(0,H.jsxs)(`div`,{className:P.editControls,children:[(0,H.jsx)(E,{onClick:me,size:`sm`,variant:`primary`,children:`Send invite`}),(0,H.jsx)(E,{onClick:T,size:`sm`,variant:`ghost`,children:`Cancel`})]})]}):(0,H.jsx)(`div`,{children:(0,H.jsx)(E,{onClick:()=>h(!0),size:`sm`,variant:`secondary`,children:`Invite member`})}),(0,H.jsx)(ce,{onOpenChange:e=>{e||d(null)},open:u!==null,children:(0,H.jsxs)(le,{size:`sm`,children:[(0,H.jsxs)(se,{children:[(0,H.jsx)(re,{children:`Confirm role change?`}),(0,H.jsxs)(oe,{children:[u,` becomes `,c,`. Roles scope what this member can see and do; the change is logged.`]})]}),(0,H.jsxs)(ae,{children:[(0,H.jsx)(he,{children:`Back`}),(0,H.jsx)(ie,{onClick:de,children:`Confirm`})]})]})}),(0,H.jsx)(ce,{onOpenChange:e=>{e||p(null)},open:f!==null,children:(0,H.jsxs)(le,{size:`sm`,children:[(0,H.jsxs)(se,{children:[(0,H.jsx)(re,{children:f?.kind===`approve`?`Approve invite?`:`Revoke invite?`}),(0,H.jsx)(oe,{children:f?.kind===`approve`?`${f.invite.name} joins this workspace as ${f.invite.role}.`:`${f?.invite.name} loses access to this invite. You can invite them again later.`})]}),(0,H.jsxs)(ae,{children:[(0,H.jsx)(he,{children:`Back`}),(0,H.jsx)(ie,{onClick:pe,variant:f?.kind===`revoke`?`destructive`:`primary`,children:f?.kind===`approve`?`Approve`:`Revoke`})]})]})})]})}function sr(){let[e,t]=(0,U.useState)(()=>qe()),n=(e,n)=>{t(t=>{let r={...t,[e]:n};return Je(r),r}),x.success(`Preferences saved on this device`)};return(0,H.jsxs)(F,{sub:`Display defaults saved on this device. They never change the medical record.`,title:`Preferences`,children:[(0,H.jsxs)(I,{children:[(0,H.jsx)(L,{action:(0,H.jsx)(we,{label:`Lab units`,onValueChange:e=>n(`units`,e),options:[{value:`conventional`,label:`Conventional`},{value:`si`,label:`SI`}],value:e.units}),label:`Lab units`,sub:`Applies to lab history and printouts`,value:A.units(e)}),(0,H.jsx)(L,{action:(0,H.jsx)(we,{label:`Theme`,onValueChange:e=>n(`theme`,e),options:[{value:`light`,label:`Light`},{value:`dark`,label:`Dark`},{value:`system`,label:`System`}],value:e.theme}),label:`Theme`,value:A.theme(e)}),(0,H.jsx)(L,{action:(0,H.jsx)(we,{label:`Language`,onValueChange:e=>n(`language`,e),options:[{value:`en`,label:`English`},{value:`km`,label:`Khmer`}],value:e.language}),label:`Language`,sub:`Clinical terms, drug names, and lab codes stay in English.`,value:A.language(e)}),(0,H.jsx)(L,{action:(0,H.jsx)(je,{checked:e.inlineRef,onCheckedChange:e=>n(`inlineRef`,e),children:(0,H.jsx)(`span`,{className:P.srOnly,children:`Show reference ranges inline`})}),label:`Reference ranges`,value:A.inlineRef(e)}),(0,H.jsx)(L,{action:(0,H.jsx)(je,{checked:e.collapseNormal,onCheckedChange:e=>n(`collapseNormal`,e),children:(0,H.jsx)(`span`,{className:P.srOnly,children:`Collapse normal results by default`})}),label:`Normal results`,sub:`Abnormal results always stay expanded.`,value:A.collapseNormal(e)}),(0,H.jsx)(L,{action:(0,H.jsx)(je,{checked:e.clock24,onCheckedChange:e=>n(`clock24`,e),children:(0,H.jsx)(`span`,{className:P.srOnly,children:`Use 24-hour time`})}),label:`Time`,value:A.clock24(e)})]}),(0,H.jsx)(`p`,{className:P.sectionFootnote,children:`Saved on this device.`})]})}var H,U,cr,lr=t((()=>{H=r(),U=e(n()),T(),v(),j(),Ot(),Yn(),nr(),zn(),cr=k.map(e=>({value:e,label:e})),rr.__docgenInfo={description:`At-a-glance workspace status with jump links into each detail section.`,methods:[],displayName:`OverviewSection`,props:{verification:{required:!0,tsType:{name:`union`,raw:`| 'none'
| 'pending_review'
| 'rejected'
| 'verified'
| 'expiring'
| 'in_grace'
| 'lapsed'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'pending_review'`},{name:`literal`,value:`'rejected'`},{name:`literal`,value:`'verified'`},{name:`literal`,value:`'expiring'`},{name:`literal`,value:`'in_grace'`},{name:`literal`,value:`'lapsed'`}]},description:``},onNavigate:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(section: SettingsSectionId) => void`,signature:{arguments:[{type:{name:`union`,raw:`| 'overview'
| 'account'
| 'cabinet'
| 'members'
| 'preferences'
| 'communications'
| 'billing'
| 'directory'
| 'esign'
| 'security'`,elements:[{name:`literal`,value:`'overview'`},{name:`literal`,value:`'account'`},{name:`literal`,value:`'cabinet'`},{name:`literal`,value:`'members'`},{name:`literal`,value:`'preferences'`},{name:`literal`,value:`'communications'`},{name:`literal`,value:`'billing'`},{name:`literal`,value:`'directory'`},{name:`literal`,value:`'esign'`},{name:`literal`,value:`'security'`}]},name:`section`}],return:{name:`void`}}},description:``},onVerify:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},firstUse:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},identity:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{ contact: string; name: string }`,signature:{properties:[{key:`contact`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}}]}},description:``},workspaceName:{required:!1,tsType:{name:`string`},description:``}}},ir.__docgenInfo={description:`Identity, medical license, and license verification status.`,methods:[],displayName:`AccountSection`,props:{verification:{required:!0,tsType:{name:`union`,raw:`| 'none'
| 'pending_review'
| 'rejected'
| 'verified'
| 'expiring'
| 'in_grace'
| 'lapsed'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'pending_review'`},{name:`literal`,value:`'rejected'`},{name:`literal`,value:`'verified'`},{name:`literal`,value:`'expiring'`},{name:`literal`,value:`'in_grace'`},{name:`literal`,value:`'lapsed'`}]},description:``},onVerify:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},firstUse:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},identity:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{ contact: string; name: string }`,signature:{properties:[{key:`contact`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}}]}},description:``}}},ar.__docgenInfo={description:`The clinic entity this workspace operates under.`,methods:[],displayName:`CabinetSection`,props:{firstUse:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},workspaceName:{required:!1,tsType:{name:`string`},description:``}}},or.__docgenInfo={description:`Member roster, guarded role changes, invite approval, and new invites.`,methods:[],displayName:`MembersSection`,props:{firstUse:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},identity:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{ name: string }`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}}]}},description:``}}},sr.__docgenInfo={description:`Per-device display defaults; the only persisted section (localStorage).`,methods:[],displayName:`PreferencesSection`}}));function ur({firstUse:e=!1}){return e?(0,W.jsx)(F,{sub:`Patient message channels and reusable notification copy for this cabinet.`,title:`Patient messages`,children:(0,W.jsxs)(I,{children:[(0,W.jsx)(L,{label:`Channel order`,value:`Not configured`}),(0,W.jsx)(L,{label:`Notification templates`,value:`Not configured`}),(0,W.jsx)(L,{label:`Doctor intro QR`,value:`Not available`})]})}):(0,W.jsxs)(F,{sub:`Channel order follows the cabinet country (${N.country}). Patients can opt out per channel.`,title:`Patient messages`,children:[(0,W.jsx)(I,{children:gt.map((e,t)=>(0,W.jsxs)(C,{className:P.row,size:`sm`,children:[(0,W.jsxs)(S,{className:P.rowLabelCell,children:[(0,W.jsxs)(b,{className:P.rowLabel,children:[(0,W.jsx)(`span`,{"aria-hidden":`true`,className:P.channelRank,children:t+1}),e.name]}),(0,W.jsx)(y,{children:e.note})]}),(0,W.jsx)(w,{className:P.rowActions,children:e.state===`active`?(0,W.jsx)(D,{size:`sm`,variant:`success`,children:`Default`}):(0,W.jsx)(D,{size:`sm`,variant:`neutral`,children:`Fallback`})})]},e.name))}),(0,W.jsx)(Vn,{title:`Notification templates`,children:(0,W.jsx)(I,{children:_t.map(e=>(0,W.jsx)(Hn,{actionLabel:`Edit`,initialValue:vt[e],label:e,multiline:!0,sub:`Sent through the active channel`},e))})}),(0,W.jsxs)(C,{className:P.qrRow,size:`sm`,variant:`muted`,children:[(0,W.jsx)(`div`,{"aria-hidden":`true`,className:P.qrMark,children:(0,W.jsx)(a,{"aria-hidden":`true`})}),(0,W.jsxs)(S,{children:[(0,W.jsx)(b,{children:`Doctor intro QR`}),(0,W.jsx)(y,{children:`Patients scan to connect with your cabinet on Telegram and receive results there.`})]}),(0,W.jsx)(w,{className:P.rowActions,children:(0,W.jsx)(E,{leadingIcon:(0,W.jsx)(o,{"aria-hidden":`true`}),onClick:()=>{Ye(`kura-doctor-intro-qr.svg`,yt,`image/svg+xml`),x.success(`Doctor intro QR downloaded`)},size:`sm`,variant:`secondary`,children:`Download`})})]})]})}function dr({firstUse:e=!1}){return(0,W.jsx)(F,{chip:(0,W.jsx)(D,{size:`sm`,variant:`neutral`,children:`Workspace scope`}),sub:`Workspace payment methods and insurer panels. Your balance is managed in Earnings.`,title:`Payments`,children:(0,W.jsxs)(I,{children:[(0,W.jsx)(L,{label:`Earnings`,sub:`Person-owned balance, statements, KHQR settlement, and optional ABA authorization`,value:(0,W.jsx)(D,{size:`sm`,variant:`info`,children:`Managed in Earnings`})}),(0,W.jsx)(L,{label:`Patient KHQR collection`,value:e?`Not configured`:(0,W.jsxs)(`span`,{className:P.valueWithBadge,children:[`Active`,(0,W.jsx)(D,{size:`sm`,variant:`success`,children:`Bakong`})]})}),(0,W.jsx)(L,{label:`Insurer panels`,value:e?`None configured`:(0,W.jsxs)(`span`,{className:P.valueWithBadge,children:[(0,W.jsx)(D,{size:`sm`,variant:`success`,children:`Forte · Active`}),(0,W.jsx)(D,{size:`sm`,variant:`warning`,children:`Sovannaphum · Pending review`})]})})]})})}function fr({firstUse:e=!1,identity:t,verification:n=`verified`}){let r=t?.name??M.name,i=r.split(` `).map(e=>e[0]).join(``).slice(0,2);return e?(0,W.jsx)(F,{chip:(0,W.jsx)(D,{size:`sm`,variant:`neutral`,children:`Unpublished`}),sub:`What patients will see after this profile is completed and published.`,title:`Directory profile`,children:(0,W.jsxs)(I,{children:[(0,W.jsx)(L,{action:(0,W.jsx)(Wn,{accept:`image/*`,leadingIcon:(0,W.jsx)(d,{"aria-hidden":`true`}),children:`Add photo`}),label:`Photo`,value:(0,W.jsx)(_e,{"aria-label":r,size:`md`,children:(0,W.jsx)(ge,{children:i})})}),(0,W.jsx)(L,{label:`Public name & credentials`,sub:`Credential identifier is not available`,value:`${r} · ${Qe[n].label}`}),(0,W.jsx)(L,{label:`Opening hours`,value:`Not configured`}),(0,W.jsx)(L,{label:`Languages`,value:`None configured`}),(0,W.jsx)(L,{label:`Services`,value:`None configured`}),(0,W.jsx)(L,{label:`Bio`,value:`Not configured`}),(0,W.jsx)(L,{label:`Reviews`,sub:`Collected after completed visits`,value:`No reviews`})]})}):(0,W.jsx)(F,{chip:(0,W.jsx)(D,{size:`sm`,variant:`info`,children:`Public`}),sub:`What patients see in the Kura directory. Locked fields are verified by Kura.`,title:`Directory profile`,children:(0,W.jsxs)(I,{children:[(0,W.jsx)(L,{action:(0,W.jsx)(Wn,{accept:`image/*`,leadingIcon:(0,W.jsx)(d,{"aria-hidden":`true`}),children:`Change photo`}),label:`Photo`,sub:`Shown on your public profile`,value:(0,W.jsx)(_e,{"aria-label":M.name,size:`md`,children:(0,W.jsx)(ge,{children:M.initials})})}),(0,W.jsx)(L,{label:`Public name & credentials`,locked:!0,sub:`From the approved professional credential profile`,value:`${M.name} · ${M.license}`}),(0,W.jsx)(Zn,{initialHours:bt}),(0,W.jsx)(Un,{addLabel:`Add language`,initialItems:xt,label:`Languages`,placeholder:`Language name`}),(0,W.jsx)(Un,{addLabel:`Add service`,initialItems:St,label:`Services`,placeholder:`Service name`}),(0,W.jsx)(Hn,{actionLabel:`Edit bio`,initialValue:Ct,label:`Bio`,multiline:!0}),(0,W.jsx)(L,{label:`Reviews`,locked:!0,sub:`Collected after completed visits`,value:`4.8 ★ · 32 reviews`})]})})}var W,pr=t((()=>{W=r(),T(),v(),j(),Ot(),Yn(),nr(),zn(),ur.__docgenInfo={description:`Channel ranking, editable notification templates, and the intro QR.`,methods:[],displayName:`CommunicationsSection`,props:{firstUse:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}}}},dr.__docgenInfo={description:`Workspace payment collection only. Person-owned balances and ABA mandates belong to Earnings.`,methods:[],displayName:`BillingSection`,props:{firstUse:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}}}},fr.__docgenInfo={description:`The patient-facing public listing; locked fields are verified by Kura.`,methods:[],displayName:`DirectorySection`,props:{firstUse:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},identity:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{ name: string }`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}}]}},description:``},verification:{required:!1,tsType:{name:`union`,raw:`| 'none'
| 'pending_review'
| 'rejected'
| 'verified'
| 'expiring'
| 'in_grace'
| 'lapsed'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'pending_review'`},{name:`literal`,value:`'rejected'`},{name:`literal`,value:`'verified'`},{name:`literal`,value:`'expiring'`},{name:`literal`,value:`'in_grace'`},{name:`literal`,value:`'lapsed'`}]},description:``,defaultValue:{value:`'verified'`,computed:!1}}}}}));function mr({firstUse:e=!1,verification:t=`verified`}){return e?(0,G.jsx)(F,{chip:(0,G.jsx)(D,{size:`sm`,variant:`neutral`,children:`Not configured`}),sub:`Signing provider, certificate, document profile, and letterhead for this account.`,title:`Signed documents`,children:(0,G.jsxs)(I,{children:[(0,G.jsx)(L,{label:`Signing provider`,value:`Not configured`}),(0,G.jsx)(L,{label:`Certificate`,value:`Not configured`}),(0,G.jsx)(L,{label:`PAdES profile`,value:`Not configured`}),(0,G.jsx)(L,{label:`Recent signatures`,value:`No signed documents`}),(0,G.jsx)(L,{label:`Rx / Dx letterhead`,value:`Not configured`}),(0,G.jsx)(L,{label:`Professional licence`,sub:`Credential identifier and document details are not available`,value:Qe[t].label})]})}):(0,G.jsxs)(F,{chip:(0,G.jsx)(D,{size:`sm`,variant:`success`,children:`Certificate active`}),sub:`Every prescription and report is digitally signed. Certificates chain to the CamDX root.`,title:`Signed documents`,children:[(0,G.jsxs)(I,{children:[(0,G.jsx)(L,{label:`Signing provider`,value:`Kura Sign · CamDX qualified`}),(0,G.jsx)(L,{label:`Certificate`,sub:`Renews automatically 30 days before expiry`,value:(0,G.jsxs)(`span`,{className:P.valueWithBadge,children:[`Active until Mar 2027`,(0,G.jsx)(D,{size:`sm`,variant:`success`,children:`Valid`})]})}),(0,G.jsx)(L,{label:`PAdES profile`,sub:`Long term validation embedded in each PDF`,value:`PAdES-B-LT`})]}),(0,G.jsx)(Vn,{title:`Recent signatures`,children:(0,G.jsx)(I,{children:wt.map(e=>(0,G.jsxs)(C,{className:P.row,size:`sm`,children:[(0,G.jsx)(fe,{variant:`icon`,children:(0,G.jsx)(u,{"aria-hidden":`true`})}),(0,G.jsxs)(S,{children:[(0,G.jsx)(b,{className:P.rowLabel,children:e.doc}),(0,G.jsx)(y,{children:e.when})]})]},e.doc))})}),(0,G.jsxs)(I,{children:[(0,G.jsx)(L,{action:(0,G.jsx)(Wn,{accept:`.pdf,.png,.jpg`,leadingIcon:(0,G.jsx)(d,{"aria-hidden":`true`}),children:`Replace`}),label:`Rx / Dx letterhead`,sub:`Applied to all signed documents`,value:`Cabinet letterhead v2`}),(0,G.jsx)(L,{label:`License documents`,value:(0,G.jsxs)(`span`,{className:P.valueWithBadge,children:[`CMC-license.pdf`,(0,G.jsx)(D,{size:`sm`,variant:`success`,children:`Verified`})]})})]}),(0,G.jsx)(`div`,{children:(0,G.jsx)(E,{leadingIcon:(0,G.jsx)(o,{"aria-hidden":`true`}),onClick:()=>{Ye(`kura-signing-log.csv`,lt(),`text/csv`),x.success(`Signing log exported`)},size:`sm`,variant:`secondary`,children:`Export signing log`})})]})}function hr({firstUse:e=!1}){let[t,n]=(0,gr.useState)(!0),[r,i]=(0,gr.useState)(()=>e?[]:[...Et]),[a,o]=(0,gr.useState)(null),[s,c]=(0,gr.useState)(!1);return(0,G.jsxs)(F,{sub:`Manage signed-in devices, sensitive changes, and the PHI access log.`,title:`Security`,children:[(0,G.jsx)(Vn,{title:`Active sessions`,children:(0,G.jsxs)(I,{children:[e?(0,G.jsx)(C,{className:P.row,size:`sm`,children:(0,G.jsxs)(S,{children:[(0,G.jsxs)(b,{className:P.rowLabel,children:[`Current browser`,(0,G.jsx)(D,{size:`sm`,variant:`success`,children:`Current`})]}),(0,G.jsx)(y,{children:`This sign-in session`})]})}):(0,G.jsxs)(C,{className:P.row,size:`sm`,children:[(0,G.jsx)(fe,{variant:`icon`,children:(0,G.jsx)(ne,{"aria-hidden":`true`})}),(0,G.jsxs)(S,{children:[(0,G.jsxs)(b,{className:P.rowLabel,children:[Tt.label,(0,G.jsx)(D,{size:`sm`,variant:`success`,children:`Current`})]}),(0,G.jsx)(y,{children:Tt.sub})]}),(0,G.jsx)(w,{className:P.rowActions,children:(0,G.jsx)(`span`,{className:P.rowSub,children:Tt.detail})})]}),r.length===0?(0,G.jsx)(L,{label:`No other sessions`,sub:`Only this device is signed in`}):r.map(e=>(0,G.jsxs)(C,{className:P.row,size:`sm`,children:[(0,G.jsx)(fe,{variant:`icon`,children:(0,G.jsx)(te,{"aria-hidden":`true`})}),(0,G.jsxs)(S,{children:[(0,G.jsx)(b,{className:P.rowLabel,children:e.label}),(0,G.jsxs)(y,{children:[e.detail,` · `,e.sub]})]}),(0,G.jsx)(w,{className:P.rowActions,children:(0,G.jsx)(E,{onClick:()=>o(e),size:`sm`,variant:`ghost`,children:`Revoke`})})]},e.id))]})}),(0,G.jsx)(I,{children:(0,G.jsx)(L,{action:(0,G.jsx)(je,{checked:t,onCheckedChange:n,children:(0,G.jsx)(`span`,{className:P.srOnly,children:`Require sign-in before sensitive changes`})}),label:`Require sign-in before sensitive changes`,sub:`Covers PHI exports, bank details, and role changes.`})}),(0,G.jsxs)(Ce,{role:`status`,tone:`warning`,children:[(0,G.jsx)(be,{children:`PHI exports are watermarked`}),(0,G.jsx)(Se,{children:`Each export includes user and timestamp. Patients can request the access log.`})]}),e?null:(0,G.jsx)(Vn,{title:`Recent activity`,children:(0,G.jsx)(I,{children:Dt.map(e=>(0,G.jsx)(L,{label:e.who,sub:e.when,value:e.what},e.what))})}),(0,G.jsx)(`div`,{children:(0,G.jsx)(E,{disabled:r.length===0,onClick:()=>c(!0),size:`sm`,variant:`destructive`,children:`Sign out all other sessions`})}),(0,G.jsx)(ce,{onOpenChange:e=>{e||o(null)},open:a!==null,children:(0,G.jsxs)(le,{size:`sm`,children:[(0,G.jsxs)(se,{children:[(0,G.jsx)(re,{children:`Sign out this session?`}),(0,G.jsxs)(oe,{children:[a?.label,` loses access immediately and must sign in again.`]})]}),(0,G.jsxs)(ae,{children:[(0,G.jsx)(he,{children:`Back`}),(0,G.jsx)(ie,{onClick:()=>{a&&(i(e=>e.filter(e=>e.id!==a.id)),x.success(`Signed out ${a.label}`),o(null))},variant:`destructive`,children:`Sign out`})]})]})}),(0,G.jsx)(ce,{onOpenChange:c,open:s,children:(0,G.jsxs)(le,{size:`sm`,children:[(0,G.jsxs)(se,{children:[(0,G.jsx)(re,{children:`Sign out every other session?`}),(0,G.jsx)(oe,{children:`Every device except this one loses access immediately.`})]}),(0,G.jsxs)(ae,{children:[(0,G.jsx)(he,{children:`Back`}),(0,G.jsx)(ie,{onClick:()=>{i([]),x.success(`Signed out all other sessions`),c(!1)},variant:`destructive`,children:`Sign out all`})]})]})})]})}var G,gr,_r=t((()=>{G=r(),gr=e(n()),T(),v(),j(),Ot(),Yn(),zn(),mr.__docgenInfo={description:`Signing certificate status, recent signatures, letterhead, and export.`,methods:[],displayName:`ESignSection`,props:{firstUse:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},verification:{required:!1,tsType:{name:`union`,raw:`| 'none'
| 'pending_review'
| 'rejected'
| 'verified'
| 'expiring'
| 'in_grace'
| 'lapsed'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'pending_review'`},{name:`literal`,value:`'rejected'`},{name:`literal`,value:`'verified'`},{name:`literal`,value:`'expiring'`},{name:`literal`,value:`'in_grace'`},{name:`literal`,value:`'lapsed'`}]},description:``,defaultValue:{value:`'verified'`,computed:!1}}}},hr.__docgenInfo={description:`Sessions, step-up confirmation, PHI export policy, and the access log.`,methods:[],displayName:`SecuritySection`,props:{firstUse:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}}}}}));function vr({firstUse:e=!1,identity:t,open:n,onOpenChange:r,section:i,onSectionChange:a,verification:o=`verified`,onVerify:s,workspaceName:c}){let[l,u]=(0,yr.useState)(i??`overview`),[d,f]=(0,yr.useState)(i);i!==d&&(f(i),i&&u(i));let p=e=>{let t=e;u(t),a?.(t)},m=e=>(0,K.jsx)(Bn,{visible:!1,children:e}),h={overview:m((0,K.jsx)(rr,{firstUse:e,identity:t,onNavigate:e=>p(e),onVerify:s,verification:o,workspaceName:c})),account:m((0,K.jsx)(ir,{firstUse:e,identity:t,onVerify:s,verification:o})),cabinet:m((0,K.jsx)(ar,{firstUse:e,workspaceName:c})),members:m((0,K.jsx)(or,{firstUse:e,identity:t})),preferences:m((0,K.jsx)(sr,{})),communications:m((0,K.jsx)(ur,{firstUse:e})),billing:m((0,K.jsx)(dr,{firstUse:e})),directory:m((0,K.jsx)(fr,{firstUse:e,identity:t,verification:o})),esign:m((0,K.jsx)(mr,{firstUse:e,verification:o})),security:m((0,K.jsx)(hr,{firstUse:e}))};return(0,K.jsx)(ye,{onOpenChange:r,onValueChange:p,open:n,sections:Xe.map(e=>({...e,icon:br[e.id],content:h[e.id]})),value:l})}var K,yr,br,xr=t((()=>{K=r(),yr=e(n()),T(),v(),j(),lr(),Yn(),pr(),_r(),br={overview:c,account:p,cabinet:h,members:s,preferences:i,communications:g,billing:l,directory:f,esign:u,security:_},vr.__docgenInfo={description:`Settings overlay above the current work. Kura owns the modal shell, domain
sections, state transitions, and permission-facing messages. On small
screens the shell becomes a full-screen modal with a horizontal settings
rail.`,methods:[],displayName:`SettingsDialog`,props:{open:{required:!0,tsType:{name:`boolean`},description:``},onOpenChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(open: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`open`}],return:{name:`void`}}},description:``},section:{required:!1,tsType:{name:`union`,raw:`| 'overview'
| 'account'
| 'cabinet'
| 'members'
| 'preferences'
| 'communications'
| 'billing'
| 'directory'
| 'esign'
| 'security'`,elements:[{name:`literal`,value:`'overview'`},{name:`literal`,value:`'account'`},{name:`literal`,value:`'cabinet'`},{name:`literal`,value:`'members'`},{name:`literal`,value:`'preferences'`},{name:`literal`,value:`'communications'`},{name:`literal`,value:`'billing'`},{name:`literal`,value:`'directory'`},{name:`literal`,value:`'esign'`},{name:`literal`,value:`'security'`}]},description:`Section shown when the dialog opens; the rail navigates internally.`},onSectionChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(section: SettingsSectionId) => void`,signature:{arguments:[{type:{name:`union`,raw:`| 'overview'
| 'account'
| 'cabinet'
| 'members'
| 'preferences'
| 'communications'
| 'billing'
| 'directory'
| 'esign'
| 'security'`,elements:[{name:`literal`,value:`'overview'`},{name:`literal`,value:`'account'`},{name:`literal`,value:`'cabinet'`},{name:`literal`,value:`'members'`},{name:`literal`,value:`'preferences'`},{name:`literal`,value:`'communications'`},{name:`literal`,value:`'billing'`},{name:`literal`,value:`'directory'`},{name:`literal`,value:`'esign'`},{name:`literal`,value:`'security'`}]},name:`section`}],return:{name:`void`}}},description:``},verification:{required:!1,tsType:{name:`union`,raw:`| 'none'
| 'pending_review'
| 'rejected'
| 'verified'
| 'expiring'
| 'in_grace'
| 'lapsed'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'pending_review'`},{name:`literal`,value:`'rejected'`},{name:`literal`,value:`'verified'`},{name:`literal`,value:`'expiring'`},{name:`literal`,value:`'in_grace'`},{name:`literal`,value:`'lapsed'`}]},description:`Mirrors the verification store; settings never contradicts the gate.`,defaultValue:{value:`'verified'`,computed:!1}},onVerify:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},firstUse:{required:!1,tsType:{name:`boolean`},description:`Fresh-workspace state: every section stays available with empty/new data.`,defaultValue:{value:`false`,computed:!1}},identity:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{ contact: string; name: string }`,signature:{properties:[{key:`contact`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}}]}},description:``},workspaceName:{required:!1,tsType:{name:`string`},description:``}}}}));function Sr({section:e,onSectionChange:t,verification:n=`verified`,onVerify:r,frame:i=`page`}){let[a,o]=(0,Cr.useState)(e??`overview`),[s,c]=(0,Cr.useState)(e),l=(0,Cr.useRef)(null),u=(0,Cr.useRef)(!1);e!==s&&(c(e),e&&o(e)),(0,Cr.useEffect)(()=>{if(!u.current){u.current=!0;return}l.current?.scrollTo({top:0})},[a]);let d=e=>{o(e),t?.(e)};return(0,q.jsxs)(`div`,{className:i===`dialog`?`${P.root} ${P.rootDialog}`:P.root,children:[i===`page`?(0,q.jsxs)(`header`,{className:P.pageHeader,children:[(0,q.jsx)(`h1`,{className:P.pageTitle,children:`Settings`}),(0,q.jsx)(`p`,{className:P.pageDescription,children:`Manage your profile, workspace, operations, and security.`})]}):null,(0,q.jsxs)(Pe,{appearance:`subtle`,className:P.settingsTabs,onValueChange:e=>d(e),orientation:`vertical`,value:a,children:[(0,q.jsx)(`div`,{className:P.rail,children:(0,q.jsx)(Ne,{"aria-label":`Settings sections`,className:P.railList,children:wr.flatMap(({group:e,items:t})=>[(0,q.jsx)(`div`,{className:P.railGroup,role:`presentation`,children:e},`group-${e}`),...t.map(e=>{let t=Tr[e.id];return(0,q.jsxs)(Me,{className:P.railItem,value:e.id,children:[(0,q.jsx)(`span`,{"aria-hidden":`true`,className:P.railIcon,children:(0,q.jsx)(t,{})}),(0,q.jsx)(`span`,{className:P.railLabel,children:e.label})]},e.id)})])})}),(0,q.jsxs)(`div`,{className:P.body,ref:l,children:[(0,q.jsx)(O,{value:`overview`,children:(0,q.jsx)(rr,{onNavigate:d,onVerify:r,verification:n})}),(0,q.jsx)(O,{value:`account`,children:(0,q.jsx)(ir,{onVerify:r,verification:n})}),(0,q.jsx)(O,{value:`cabinet`,children:(0,q.jsx)(ar,{})}),(0,q.jsx)(O,{value:`members`,children:(0,q.jsx)(or,{})}),(0,q.jsx)(O,{value:`preferences`,children:(0,q.jsx)(sr,{})}),(0,q.jsx)(O,{value:`communications`,children:(0,q.jsx)(ur,{})}),(0,q.jsx)(O,{value:`billing`,children:(0,q.jsx)(dr,{})}),(0,q.jsx)(O,{value:`directory`,children:(0,q.jsx)(fr,{})}),(0,q.jsx)(O,{value:`esign`,children:(0,q.jsx)(mr,{})}),(0,q.jsx)(O,{value:`security`,children:(0,q.jsx)(hr,{})})]})]})]})}var q,Cr,wr,Tr,Er=t((()=>{q=r(),Cr=e(n()),T(),v(),j(),lr(),pr(),_r(),zn(),wr=Xe.reduce((e,t)=>{let n=e[e.length-1];return n?.group===t.group?n.items.push(t):e.push({group:t.group,items:[t]}),e},[]),Tr={overview:c,account:p,cabinet:h,members:s,preferences:i,communications:g,billing:l,directory:f,esign:u,security:_},Sr.__docgenInfo={description:`One canonical surface for low-frequency workspace configuration: identity,
cabinet, team, money, documents, and security. A vertical Tabs rail swaps
dense panels — no hero, no decorative dashboard; status rows and one obvious
action each. The presentation promotes ReUI settings-7's real page, side-tab,
card, and row anatomy into the feature owner while Kura keeps all behavior.`,methods:[],displayName:`SettingsView`,props:{section:{required:!1,tsType:{name:`union`,raw:`| 'overview'
| 'account'
| 'cabinet'
| 'members'
| 'preferences'
| 'communications'
| 'billing'
| 'directory'
| 'esign'
| 'security'`,elements:[{name:`literal`,value:`'overview'`},{name:`literal`,value:`'account'`},{name:`literal`,value:`'cabinet'`},{name:`literal`,value:`'members'`},{name:`literal`,value:`'preferences'`},{name:`literal`,value:`'communications'`},{name:`literal`,value:`'billing'`},{name:`literal`,value:`'directory'`},{name:`literal`,value:`'esign'`},{name:`literal`,value:`'security'`}]},description:`Active section; the surface also navigates internally.`},onSectionChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(section: SettingsSectionId) => void`,signature:{arguments:[{type:{name:`union`,raw:`| 'overview'
| 'account'
| 'cabinet'
| 'members'
| 'preferences'
| 'communications'
| 'billing'
| 'directory'
| 'esign'
| 'security'`,elements:[{name:`literal`,value:`'overview'`},{name:`literal`,value:`'account'`},{name:`literal`,value:`'cabinet'`},{name:`literal`,value:`'members'`},{name:`literal`,value:`'preferences'`},{name:`literal`,value:`'communications'`},{name:`literal`,value:`'billing'`},{name:`literal`,value:`'directory'`},{name:`literal`,value:`'esign'`},{name:`literal`,value:`'security'`}]},name:`section`}],return:{name:`void`}}},description:``},verification:{required:!1,tsType:{name:`union`,raw:`| 'none'
| 'pending_review'
| 'rejected'
| 'verified'
| 'expiring'
| 'in_grace'
| 'lapsed'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'pending_review'`},{name:`literal`,value:`'rejected'`},{name:`literal`,value:`'verified'`},{name:`literal`,value:`'expiring'`},{name:`literal`,value:`'in_grace'`},{name:`literal`,value:`'lapsed'`}]},description:`Mirrors the verification store; settings never contradicts the gate.`,defaultValue:{value:`"verified"`,computed:!1}},onVerify:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Opens the shared verification modal in the host application.`},frame:{required:!1,tsType:{name:`union`,raw:`'page' | 'dialog'`,elements:[{name:`literal`,value:`'page'`},{name:`literal`,value:`'dialog'`}]},description:`page: standalone route with its own header. dialog: fills SettingsDialog —
the dialog provides the accessible title and the rail is the only
settings navigation, so the page header is dropped.`,defaultValue:{value:`"page"`,computed:!1}}}}}));function Dr(e){return Z(e.ownerDocument.body)}var J,Y,Or,X,kr,Z,Ar,jr,Mr,Nr,Pr,Fr,Ir,Lr,Rr,zr,Br,Vr,Hr,Ur,Wr,Gr,Q,Kr,qr,Jr,Yr,Xr,Zr,$,Qr;t((()=>{J=r(),T(),xr(),Er(),Fe(),{expect:Y,fn:Or,userEvent:X,waitFor:kr,within:Z}=__STORYBOOK_MODULE_TEST__,Ar={title:`Clinic/Settings`,component:Sr,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:{readiness:Ie.settings,intake:{decision:`REPLACE + FEATURE-OWN + COMPOSE`,owner:`src/features/settings`,evidence:`ReUI settings-7 was installed into .tmp/reui-intake and inspected in full. Its page header, responsive side-tab navigation, SettingsCard, field-group, and setting-row anatomy replace the previous settings presentation. Kura retains the existing SettingsView API, 10-section information architecture, validation, permissions-facing states, local prototype handlers, and canonical components. The production repo confirms workspace mutations are context- and membership-gated and require workspace.settings.manage; this prototype remains Partial until it consumes that backend contract.`,exclusions:[`ReUI demo data and its four-tab SaaS information architecture — Kura owns ten workspace, operations, and trust sections`,`ReUI local profile, notification, security, and billing state — existing Kura behavior and domain state are preserved`,`ReUI Lucide icons and permanent ReUI imports — canonical Kura icons and components remain authoritative`,`ReUI avatar upload hook — existing Kura file-picker behavior remains the feature contract`],source:{vendor:`ReUI`,registryItem:`@reui/settings-7`,previewUrl:`https://reui.io/preview/base/settings-7`}},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura`,icons:`kura`},responsive:{strategy:[`STACKING`,`REFLOW`],minimumWidth:320},journeys:[`settings-license-renewal`,`settings-team-management`,`settings-security-sessions`,`settings-device-preferences`]},docs:{description:{component:`One canonical surface for low-frequency workspace configuration: identity, cabinet, team, money, documents, and security. Internal left rail plus dense sections — status rows and one obvious action each. Prototype contract: every action resolves locally (inline edits commit to state, files run through a real picker, exports build a Blob download) and a toast confirms each one; Preferences is the only persisted section (localStorage kura.preferences.v1).`}}},args:{onSectionChange:Or(),onVerify:Or()},decorators:[e=>(0,J.jsxs)(J.Fragment,{children:[(0,J.jsx)(e,{}),(0,J.jsx)(ue,{})]})]},jr={play:async({canvasElement:e,args:t})=>{let n=Z(e);await Y(n.getByText(`Medical license expires in 28 days`)).toBeVisible(),await Y(n.getByText(`Kura Cabinet, Toul Kork`)).toBeVisible(),await Y(n.getByText(`Phnom Penh · GMT+7`)).toBeVisible(),await X.click(n.getByRole(`button`,{name:`Review team`})),await Y(await n.findByRole(`heading`,{name:`Team access`})).toBeVisible(),await Y(t.onSectionChange).toHaveBeenCalledWith(`members`)}},Mr={args:{section:`account`},play:async({canvasElement:e,args:t})=>{let n=Z(e);await Y(n.getByRole(`heading`,{name:`Account & verification`})).toBeVisible(),await Y(n.getAllByText(`Verified`).length).toBeGreaterThan(0),await Y(n.getByText(`CMC 048-2019`)).toBeVisible(),await Y(n.getByText(`Renews in 28 days`)).toBeVisible(),await Y(n.getAllByLabelText(`Verified by Kura. Not editable`).length).toBeGreaterThan(0),await X.click(n.getAllByRole(`button`,{name:`Verify license`})[0]),await Y(t.onVerify).toHaveBeenCalled()}},Nr={args:{section:`account`,verification:`rejected`},play:async({canvasElement:e})=>{let t=Z(e);await Y(t.getAllByText(`Action required`).length).toBeGreaterThan(0),await Y(t.getByText(`Your professional licence submission was rejected`)).toBeVisible(),await Y(t.getByRole(`button`,{name:`Review and resubmit`})).toBeVisible()}},Pr={args:{section:`account`,verification:`pending_review`}},Fr={args:{section:`account`,verification:`expiring`}},Ir={args:{section:`account`,verification:`in_grace`}},Lr={args:{section:`account`,verification:`lapsed`}},Rr={args:{section:`cabinet`},play:async({canvasElement:e})=>{let t=Z(e);await Y(t.getByText(`Route PP-04 · Mon / Wed / Fri · 16:00 pickup`)).toBeVisible(),await Y(t.getByText(`Country is locked after registration`)).toBeVisible(),await X.click(t.getByRole(`button`,{name:`Change route`}));for(let e of[`Mon`,`Wed`,`Fri`])await X.click(t.getByRole(`checkbox`,{name:e}));await Y(await t.findByText(`Select at least one pickup day.`)).toBeVisible(),await Y(t.getByRole(`button`,{name:`Save`})).toBeDisabled(),await X.click(t.getByRole(`checkbox`,{name:`Tue`})),await X.click(t.getByRole(`button`,{name:`Save`})),await Y(await t.findByText(`Route PP-04 · Tue · 16:00 pickup`)).toBeVisible()}},zr={args:{section:`members`},play:async({canvasElement:e})=>{let t=Z(e),n=Dr(e);await Y(t.getByText(`5 active`)).toBeVisible(),await Y(t.getByText(`You are the sole owner`)).toBeVisible(),await X.click(t.getByRole(`button`,{name:`Invite member`})),await X.click(t.getByRole(`button`,{name:`Send invite`})),await Y(await t.findByText(`Member name is required.`)).toBeVisible(),await X.type(t.getByLabelText(`Member name`),`Sophea Lim`),await X.click(t.getByRole(`button`,{name:`Send invite`})),await Y(await t.findByText(`Sophea Lim is already in this workspace.`)).toBeVisible(),await X.clear(t.getByLabelText(`Member name`)),await X.type(t.getByLabelText(`Member name`),`Chan Dara`),await X.click(t.getByRole(`button`,{name:`Send invite`})),await Y(await t.findByText(`Chan Dara`)).toBeVisible(),await X.click(t.getAllByRole(`button`,{name:`Approve`})[0]);let r=await n.findByRole(`alertdialog`);await Y(Z(r).getByText(`Approve invite?`)).toBeVisible(),await X.click(Z(r).getByRole(`button`,{name:`Approve`})),await kr(()=>Y(t.getByText(`6 active`)).toBeVisible())}},Br={args:{section:`preferences`},play:async({canvasElement:e})=>{let t=Z(e);await Y(t.getByText(`Saved on this device.`)).toBeVisible(),await X.click(t.getByRole(`radio`,{name:`SI`})),await Y(await t.findByText(`SI (mmol/L)`)).toBeVisible(),await X.click(t.getByRole(`radio`,{name:`Conventional`})),await Y(await t.findByText(`Conventional (mg/dL)`)).toBeVisible()}},Vr={args:{section:`communications`},play:async({canvasElement:e})=>{let t=Z(e);await Y(t.getByText(`Telegram`)).toBeVisible(),await Y(t.getByText(`Default`)).toBeVisible(),await Y(t.getAllByText(`Fallback`)).toHaveLength(2),await Y(t.getByText(`Doctor intro QR`)).toBeVisible(),await X.click(t.getAllByRole(`button`,{name:`Edit`})[0]);let n=t.getByRole(`textbox`,{name:`Results ready`});await X.clear(n),await Y(t.getByRole(`button`,{name:`Save`})).toBeDisabled(),await X.type(n,`Your results are ready. Open Kura to view them.`),await X.click(t.getByRole(`button`,{name:`Save`})),await Y(await t.findByText(`Your results are ready. Open Kura to view them.`)).toBeVisible()}},Hr={args:{section:`billing`},play:async({canvasElement:e})=>{let t=Z(e);await Y(t.getByText(`Workspace scope`)).toBeVisible(),await Y(t.getByText(`Managed in Earnings`)).toBeVisible(),await Y(t.getByText(`Patient KHQR collection`)).toBeVisible(),await Y(t.queryByText(/Auto pay cap/i)).not.toBeInTheDocument()}},Ur={args:{section:`directory`},play:async({canvasElement:e})=>{let t=Z(e);await Y(t.getByText(`Mon to Sat · 8:00 to 17:30`)).toBeVisible(),await Y(t.getByText(`4.8 ★ · 32 reviews`)).toBeVisible(),await X.click(t.getByRole(`button`,{name:`Remove English`})),await Y(t.queryByText(`English`)).not.toBeInTheDocument(),await X.click(t.getByRole(`button`,{name:`Undo`})),await Y(await t.findByText(`English`)).toBeVisible(),await X.click(t.getByRole(`button`,{name:`Add service`})),await X.type(t.getByLabelText(`Add service`),`diabetes care`),await X.click(t.getByRole(`button`,{name:`Add`})),await Y(await t.findByText(`diabetes care is already listed.`)).toBeVisible()}},Wr={args:{section:`esign`},play:async({canvasElement:e})=>{let t=Z(e);await Y(t.getByText(`Certificate active`)).toBeVisible(),await Y(t.getByText(`Kura Sign · CamDX qualified`)).toBeVisible(),await Y(t.getByText(`PAdES-B-LT`)).toBeVisible(),await Y(t.getByText(`e-Prescription #2841`)).toBeVisible(),await Y(t.getByRole(`button`,{name:`Export signing log`})).toBeVisible()}},Gr={args:{section:`security`},play:async({canvasElement:e})=>{let t=Z(e),n=Dr(e);await Y(t.getByText(`PHI exports are watermarked`)).toBeVisible(),await Y(t.getByText(`Current`)).toBeVisible(),await X.click(t.getByRole(`button`,{name:`Revoke`})),await Y(await n.findByText(`Sign out this session?`)).toBeVisible(),await X.click(n.getByRole(`button`,{name:`Sign out`})),await Y(await t.findByText(`No other sessions`)).toBeVisible(),await Y(t.getByRole(`button`,{name:`Sign out all other sessions`})).toBeDisabled()}},Q={play:async({canvasElement:e})=>{let t=Z(e),n=[[`Account & verification`,`Account & verification`],[`Cabinet`,`Cabinet`],[`Team access`,`Team access`],[`Preferences`,`Preferences`],[`Patient messages`,`Patient messages`],[`Payments`,`Payments`],[`Directory profile`,`Directory profile`],[`Signed documents`,`Signed documents`],[`Security`,`Security`],[`Overview`,`Overview`]],r=Z(t.getByRole(`tablist`,{name:`Settings sections`}));for(let[e,i]of n)await X.click(r.getByRole(`tab`,{name:e})),await Y(await t.findByRole(`heading`,{level:2,name:i})).toBeVisible()}},Kr={parameters:{viewport:{defaultViewport:`kura320`}},play:async({canvasElement:e})=>{let t=Z(e),n=Z(t.getByRole(`tablist`,{name:`Settings sections`}));await X.click(n.getByRole(`tab`,{name:`Payments`})),await Y(await t.findByRole(`heading`,{name:`Payments`})).toBeVisible()}},qr={parameters:{viewport:{defaultViewport:`kura768`}}},Jr={render:e=>(0,J.jsx)(vr,{...e,onOpenChange:()=>{},open:!0}),play:async({canvasElement:e})=>{let t=await Dr(e).findByRole(`dialog`,{name:`Overview`}),n=Z(t),r=n.getByRole(`navigation`,{name:`Settings sections`});await X.click(Z(r).getByRole(`button`,{name:`Security`})),await Y(await n.findByRole(`heading`,{level:2,name:`Security`})).toBeInTheDocument()}},Yr={args:{section:`preferences`},render:e=>(0,J.jsx)(vr,{...e,onOpenChange:()=>{},open:!0}),play:async({canvasElement:e})=>{let t=await Dr(e).findByRole(`dialog`,{name:`Preferences`}),n=Z(t);await Y(n.getByText(`Saved on this device.`)).toBeInTheDocument(),await Y(n.getByRole(`radio`,{name:`Conventional`})).toBeVisible(),await Y(n.getByRole(`switch`,{name:`Show reference ranges inline`})).toBeInTheDocument()}},Xr={render:e=>(0,J.jsx)(vr,{...e,firstUse:!0,identity:{contact:`+85598111222`,name:`Dr. Bopha Kim`},onOpenChange:()=>{},open:!0,verification:`none`,workspaceName:`Dr. Bopha Kim's cabinet`}),play:async({canvasElement:e})=>{let t=await Dr(e).findByRole(`dialog`,{name:`Overview`}),n=Z(t);await Y(n.getAllByText(`Dr. Bopha Kim`)[0]).toBeVisible(),await Y(n.getAllByText(`Dr. Bopha Kim's cabinet`)[0]).toBeVisible(),await Y(n.getByText(`1 active member`)).toBeVisible(),await Y(n.queryByText(`Dr. Phong Tuy`)).not.toBeInTheDocument(),await Y(n.queryByText(`Kura Cabinet, Toul Kork`)).not.toBeInTheDocument();let r=n.getByRole(`navigation`,{name:`Settings sections`});await X.click(Z(r).getByRole(`button`,{name:`Payments`})),await Y(await n.findByRole(`heading`,{level:2,name:`Payments`})).toBeVisible(),await Y((await n.findAllByText(`None configured`))[0]).toBeInTheDocument(),await X.click(Z(r).getByRole(`button`,{name:`Signed documents`})),await Y(await n.findByText(`No signed documents`)).toBeVisible(),await X.click(Z(r).getByRole(`button`,{name:`Security`})),await Y(await n.findByText(`Current browser`)).toBeVisible(),await Y(n.queryByText(`MacBook Pro · Phnom Penh`)).not.toBeInTheDocument()}},Zr={parameters:{viewport:{defaultViewport:`kura320`}},render:e=>(0,J.jsx)(vr,{...e,firstUse:!0,identity:{contact:`+85598111222`,name:`Dr. Bopha Kim`},onOpenChange:()=>{},open:!0,verification:`none`,workspaceName:`Dr. Bopha Kim's cabinet`}),play:async({canvasElement:e})=>{let t=await Dr(e).findByRole(`dialog`,{name:`Overview`}),n=Z(t),r=n.getByRole(`navigation`,{name:`Settings sections`});await Y(Z(r).getByRole(`button`,{name:`Security`})).toBeVisible(),await X.click(Z(r).getByRole(`button`,{name:`Cabinet`})),await Y(await n.findByRole(`heading`,{level:2,name:`Cabinet`})).toBeVisible()}},$={parameters:{viewport:{defaultViewport:`kura320`}},render:e=>(0,J.jsx)(vr,{...e,onOpenChange:()=>{},open:!0}),play:async({canvasElement:e})=>{let t=await Dr(e).findByRole(`dialog`,{name:`Overview`}),n=Z(t),r=n.getByRole(`navigation`,{name:`Settings sections`});await X.click(Z(r).getByRole(`button`,{name:`Payments`})),await Y(await n.findByRole(`heading`,{level:2,name:`Payments`})).toBeInTheDocument()}},jr.parameters={...jr.parameters,docs:{...jr.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Medical license expires in 28 days')).toBeVisible();
    await expect(canvas.getByText('Kura Cabinet, Toul Kork')).toBeVisible();
    await expect(canvas.getByText('Phnom Penh · GMT+7')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Review team'
    }));
    await expect(await canvas.findByRole('heading', {
      name: 'Team access'
    })).toBeVisible();
    await expect(args.onSectionChange).toHaveBeenCalledWith('members');
  }
}`,...jr.parameters?.docs?.source},description:{story:`Landing state: license countdown banner, status rows, jump links.`,...jr.parameters?.docs?.description}}},Mr.parameters={...Mr.parameters,docs:{...Mr.parameters?.docs,source:{originalSource:`{
  args: {
    section: 'account'
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Account & verification'
    })).toBeVisible();
    await expect(canvas.getAllByText('Verified').length).toBeGreaterThan(0);
    await expect(canvas.getByText('CMC 048-2019')).toBeVisible();
    await expect(canvas.getByText('Renews in 28 days')).toBeVisible();
    await expect(canvas.getAllByLabelText('Verified by Kura. Not editable').length).toBeGreaterThan(0);
    await userEvent.click(canvas.getAllByRole('button', {
      name: 'Verify license'
    })[0]);
    await expect(args.onVerify).toHaveBeenCalled();
  }
}`,...Mr.parameters?.docs?.source},description:{story:`Verified account: locked identity fields and the license renewal badge.`,...Mr.parameters?.docs?.description}}},Nr.parameters={...Nr.parameters,docs:{...Nr.parameters?.docs,source:{originalSource:`{
  args: {
    section: 'account',
    verification: 'rejected'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText('Action required').length).toBeGreaterThan(0);
    await expect(canvas.getByText('Your professional licence submission was rejected')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Review and resubmit'
    })).toBeVisible();
  }
}`,...Nr.parameters?.docs?.source},description:{story:`Rejected submissions preserve history and route to a corrected submission.`,...Nr.parameters?.docs?.description}}},Pr.parameters={...Pr.parameters,docs:{...Pr.parameters?.docs,source:{originalSource:`{
  args: {
    section: 'account',
    verification: 'pending_review'
  }
}`,...Pr.parameters?.docs?.source},description:{story:`Verification under review: informational banner, no warning tone.`,...Pr.parameters?.docs?.description}}},Fr.parameters={...Fr.parameters,docs:{...Fr.parameters?.docs,source:{originalSource:`{
  args: {
    section: 'account',
    verification: 'expiring'
  }
}`,...Fr.parameters?.docs?.source},description:{story:`Expiring credentials remain live while clearly routing to renewal.`,...Fr.parameters?.docs?.description}}},Ir.parameters={...Ir.parameters,docs:{...Ir.parameters?.docs,source:{originalSource:`{
  args: {
    section: 'account',
    verification: 'in_grace'
  }
}`,...Ir.parameters?.docs?.source},description:{story:`Grace is still live for attribution but carries a renewal warning.`,...Ir.parameters?.docs?.description}}},Lr.parameters={...Lr.parameters,docs:{...Lr.parameters?.docs,source:{originalSource:`{
  args: {
    section: 'account',
    verification: 'lapsed'
  }
}`,...Lr.parameters?.docs?.source},description:{story:`Lapse blocks only new attribution; placed episodes remain intact.`,...Lr.parameters?.docs?.description}}},Rr.parameters={...Rr.parameters,docs:{...Rr.parameters?.docs,source:{originalSource:`{
  args: {
    section: 'cabinet'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Route PP-04 · Mon / Wed / Fri · 16:00 pickup')).toBeVisible();
    await expect(canvas.getByText('Country is locked after registration')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Change route'
    }));
    for (const day of ['Mon', 'Wed', 'Fri']) {
      await userEvent.click(canvas.getByRole('checkbox', {
        name: day
      }));
    }
    await expect(await canvas.findByText('Select at least one pickup day.')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Save'
    })).toBeDisabled();
    await userEvent.click(canvas.getByRole('checkbox', {
      name: 'Tue'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Save'
    }));
    await expect(await canvas.findByText('Route PP-04 · Tue · 16:00 pickup')).toBeVisible();
  }
}`,...Rr.parameters?.docs?.source},description:{story:`Cabinet: locked country, courier editor requires at least one pickup day.`,...Rr.parameters?.docs?.description}}},zr.parameters={...zr.parameters,docs:{...zr.parameters?.docs,source:{originalSource:`{
  args: {
    section: 'members'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const screen = body(canvasElement);
    await expect(canvas.getByText('5 active')).toBeVisible();
    await expect(canvas.getByText('You are the sole owner')).toBeVisible();

    // Invite validation: empty, duplicate, then success.
    await userEvent.click(canvas.getByRole('button', {
      name: 'Invite member'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send invite'
    }));
    await expect(await canvas.findByText('Member name is required.')).toBeVisible();
    await userEvent.type(canvas.getByLabelText('Member name'), 'Sophea Lim');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send invite'
    }));
    await expect(await canvas.findByText('Sophea Lim is already in this workspace.')).toBeVisible();
    await userEvent.clear(canvas.getByLabelText('Member name'));
    await userEvent.type(canvas.getByLabelText('Member name'), 'Chan Dara');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send invite'
    }));
    await expect(await canvas.findByText('Chan Dara')).toBeVisible();

    // Approve the seeded pending invite through the confirmation dialog.
    await userEvent.click(canvas.getAllByRole('button', {
      name: 'Approve'
    })[0]);
    const dialog = await screen.findByRole('alertdialog');
    await expect(within(dialog).getByText('Approve invite?')).toBeVisible();
    await userEvent.click(within(dialog).getByRole('button', {
      name: 'Approve'
    }));
    await waitFor(() => expect(canvas.getByText('6 active')).toBeVisible());
  }
}`,...zr.parameters?.docs?.source},description:{story:`Team access: invite validation, then a guarded approve with AlertDialog.`,...zr.parameters?.docs?.description}}},Br.parameters={...Br.parameters,docs:{...Br.parameters?.docs,source:{originalSource:`{
  args: {
    section: 'preferences'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Saved on this device.')).toBeVisible();
    await userEvent.click(canvas.getByRole('radio', {
      name: 'SI'
    }));
    await expect(await canvas.findByText('SI (mmol/L)')).toBeVisible();
    await userEvent.click(canvas.getByRole('radio', {
      name: 'Conventional'
    }));
    await expect(await canvas.findByText('Conventional (mg/dL)')).toBeVisible();
  }
}`,...Br.parameters?.docs?.source},description:{story:`Preferences: segmented + switch controls save on every change.`,...Br.parameters?.docs?.description}}},Vr.parameters={...Vr.parameters,docs:{...Vr.parameters?.docs,source:{originalSource:`{
  args: {
    section: 'communications'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Telegram')).toBeVisible();
    await expect(canvas.getByText('Default')).toBeVisible();
    await expect(canvas.getAllByText('Fallback')).toHaveLength(2);
    await expect(canvas.getByText('Doctor intro QR')).toBeVisible();

    // Template edit: blank drafts cannot save; a real edit commits.
    await userEvent.click(canvas.getAllByRole('button', {
      name: 'Edit'
    })[0]);
    const field = canvas.getByRole('textbox', {
      name: 'Results ready'
    });
    await userEvent.clear(field);
    await expect(canvas.getByRole('button', {
      name: 'Save'
    })).toBeDisabled();
    await userEvent.type(field, 'Your results are ready. Open Kura to view them.');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Save'
    }));
    await expect(await canvas.findByText('Your results are ready. Open Kura to view them.')).toBeVisible();
  }
}`,...Vr.parameters?.docs?.source},description:{story:`Patient messages: ranked channels, template editing with validation.`,...Vr.parameters?.docs?.description}}},Hr.parameters={...Hr.parameters,docs:{...Hr.parameters?.docs,source:{originalSource:`{
  args: {
    section: 'billing'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Workspace scope')).toBeVisible();
    await expect(canvas.getByText('Managed in Earnings')).toBeVisible();
    await expect(canvas.getByText('Patient KHQR collection')).toBeVisible();
    await expect(canvas.queryByText(/Auto pay cap/i)).not.toBeInTheDocument();
  }
}`,...Hr.parameters?.docs?.source},description:{story:`Workspace payments stay separate from person-owned Earnings.`,...Hr.parameters?.docs?.description}}},Ur.parameters={...Ur.parameters,docs:{...Ur.parameters?.docs,source:{originalSource:`{
  args: {
    section: 'directory'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Mon to Sat · 8:00 to 17:30')).toBeVisible();
    await expect(canvas.getByText('4.8 ★ · 32 reviews')).toBeVisible();

    // Remove a language, then undo restores it.
    await userEvent.click(canvas.getByRole('button', {
      name: 'Remove English'
    }));
    await expect(canvas.queryByText('English')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Undo'
    }));
    await expect(await canvas.findByText('English')).toBeVisible();

    // Duplicate services are rejected case-insensitively.
    await userEvent.click(canvas.getByRole('button', {
      name: 'Add service'
    }));
    await userEvent.type(canvas.getByLabelText('Add service'), 'diabetes care');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Add'
    }));
    await expect(await canvas.findByText('diabetes care is already listed.')).toBeVisible();
  }
}`,...Ur.parameters?.docs?.source},description:{story:`Directory: chip remove with undo, duplicate guard, locked public fields.`,...Ur.parameters?.docs?.description}}},Wr.parameters={...Wr.parameters,docs:{...Wr.parameters?.docs,source:{originalSource:`{
  args: {
    section: 'esign'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Certificate active')).toBeVisible();
    await expect(canvas.getByText('Kura Sign · CamDX qualified')).toBeVisible();
    await expect(canvas.getByText('PAdES-B-LT')).toBeVisible();
    await expect(canvas.getByText('e-Prescription #2841')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Export signing log'
    })).toBeVisible();
  }
}`,...Wr.parameters?.docs?.source},description:{story:`Signed documents: certificate chain status and the signing log export.`,...Wr.parameters?.docs?.description}}},Gr.parameters={...Gr.parameters,docs:{...Gr.parameters?.docs,source:{originalSource:`{
  args: {
    section: 'security'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const screen = body(canvasElement);
    await expect(canvas.getByText('PHI exports are watermarked')).toBeVisible();
    await expect(canvas.getByText('Current')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Revoke'
    }));
    await expect(await screen.findByText('Sign out this session?')).toBeVisible();
    await userEvent.click(screen.getByRole('button', {
      name: 'Sign out'
    }));
    await expect(await canvas.findByText('No other sessions')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Sign out all other sessions'
    })).toBeDisabled();
  }
}`,...Gr.parameters?.docs?.source},description:{story:`Security: guarded session sign-out empties the list and disables bulk.`,...Gr.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const stops: Array<[string, string]> = [['Account & verification', 'Account & verification'], ['Cabinet', 'Cabinet'], ['Team access', 'Team access'], ['Preferences', 'Preferences'], ['Patient messages', 'Patient messages'], ['Payments', 'Payments'], ['Directory profile', 'Directory profile'], ['Signed documents', 'Signed documents'], ['Security', 'Security'], ['Overview', 'Overview']];
    const rail = within(canvas.getByRole('tablist', {
      name: 'Settings sections'
    }));
    for (const [item, heading] of stops) {
      await userEvent.click(rail.getByRole('tab', {
        name: item
      }));
      await expect(await canvas.findByRole('heading', {
        level: 2,
        name: heading
      })).toBeVisible();
    }
  }
}`,...Q.parameters?.docs?.source},description:{story:`Full journey: the rail reaches all ten sections in order.`,...Q.parameters?.docs?.description}}},Kr.parameters={...Kr.parameters,docs:{...Kr.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const rail = within(canvas.getByRole('tablist', {
      name: 'Settings sections'
    }));
    await userEvent.click(rail.getByRole('tab', {
      name: 'Payments'
    }));
    await expect(await canvas.findByRole('heading', {
      name: 'Payments'
    })).toBeVisible();
  }
}`,...Kr.parameters?.docs?.source},description:{story:`320px: the rail becomes a horizontal strip and rows stack.`,...Kr.parameters?.docs?.description}}},qr.parameters={...qr.parameters,docs:{...qr.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura768'
    }
  }
}`,...qr.parameters?.docs?.source},description:{story:`Tablet: two-column shell still holds at 768px.`,...qr.parameters?.docs?.description}}},Jr.parameters={...Jr.parameters,docs:{...Jr.parameters?.docs,source:{originalSource:`{
  render: args => <SettingsDialog {...args} onOpenChange={() => {}} open />,
  play: async ({
    canvasElement
  }) => {
    const screen = body(canvasElement);
    const dialog = await screen.findByRole('dialog', {
      name: 'Overview'
    });
    const scoped = within(dialog);
    const rail = scoped.getByRole('navigation', {
      name: 'Settings sections'
    });
    await userEvent.click(within(rail).getByRole('button', {
      name: 'Security'
    }));
    await expect(await scoped.findByRole('heading', {
      level: 2,
      name: 'Security'
    })).toBeInTheDocument();
  }
}`,...Jr.parameters?.docs?.source},description:{story:`Overlay frame: the dialog rail is the only settings navigation.`,...Jr.parameters?.docs?.description}}},Yr.parameters={...Yr.parameters,docs:{...Yr.parameters?.docs,source:{originalSource:`{
  args: {
    section: 'preferences'
  },
  render: args => <SettingsDialog {...args} onOpenChange={() => {}} open />,
  play: async ({
    canvasElement
  }) => {
    const screen = body(canvasElement);
    const dialog = await screen.findByRole('dialog', {
      name: 'Preferences'
    });
    const scoped = within(dialog);
    await expect(scoped.getByText('Saved on this device.')).toBeInTheDocument();
    await expect(scoped.getByRole('radio', {
      name: 'Conventional'
    })).toBeVisible();
    await expect(scoped.getByRole('switch', {
      name: 'Show reference ranges inline'
    })).toBeInTheDocument();
  }
}`,...Yr.parameters?.docs?.source},description:{story:`Wide dialog: preference labels, values, and controls share stable columns.`,...Yr.parameters?.docs?.description}}},Xr.parameters={...Xr.parameters,docs:{...Xr.parameters?.docs,source:{originalSource:`{
  render: args => <SettingsDialog {...args} firstUse identity={{
    contact: '+85598111222',
    name: 'Dr. Bopha Kim'
  }} onOpenChange={() => {}} open verification="none" workspaceName="Dr. Bopha Kim's cabinet" />,
  play: async ({
    canvasElement
  }) => {
    const screen = body(canvasElement);
    const dialog = await screen.findByRole('dialog', {
      name: 'Overview'
    });
    const scoped = within(dialog);
    await expect(scoped.getAllByText('Dr. Bopha Kim')[0]).toBeVisible();
    await expect(scoped.getAllByText("Dr. Bopha Kim's cabinet")[0]).toBeVisible();
    await expect(scoped.getByText('1 active member')).toBeVisible();
    await expect(scoped.queryByText('Dr. Phong Tuy')).not.toBeInTheDocument();
    await expect(scoped.queryByText('Kura Cabinet, Toul Kork')).not.toBeInTheDocument();
    const rail = scoped.getByRole('navigation', {
      name: 'Settings sections'
    });
    await userEvent.click(within(rail).getByRole('button', {
      name: 'Payments'
    }));
    await expect(await scoped.findByRole('heading', {
      level: 2,
      name: 'Payments'
    })).toBeVisible();
    await expect((await scoped.findAllByText('None configured'))[0]).toBeInTheDocument();
    await userEvent.click(within(rail).getByRole('button', {
      name: 'Signed documents'
    }));
    await expect(await scoped.findByText('No signed documents')).toBeVisible();
    await userEvent.click(within(rail).getByRole('button', {
      name: 'Security'
    }));
    await expect(await scoped.findByText('Current browser')).toBeVisible();
    await expect(scoped.queryByText('MacBook Pro · Phnom Penh')).not.toBeInTheDocument();
  }
}`,...Xr.parameters?.docs?.source},description:{story:`Fresh-workspace settings keeps all ten sections and carries no established fixture.`,...Xr.parameters?.docs?.description}}},Zr.parameters={...Zr.parameters,docs:{...Zr.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  render: args => <SettingsDialog {...args} firstUse identity={{
    contact: '+85598111222',
    name: 'Dr. Bopha Kim'
  }} onOpenChange={() => {}} open verification="none" workspaceName="Dr. Bopha Kim's cabinet" />,
  play: async ({
    canvasElement
  }) => {
    const screen = body(canvasElement);
    const dialog = await screen.findByRole('dialog', {
      name: 'Overview'
    });
    const scoped = within(dialog);
    const rail = scoped.getByRole('navigation', {
      name: 'Settings sections'
    });
    await expect(within(rail).getByRole('button', {
      name: 'Security'
    })).toBeVisible();
    await userEvent.click(within(rail).getByRole('button', {
      name: 'Cabinet'
    }));
    await expect(await scoped.findByRole('heading', {
      level: 2,
      name: 'Cabinet'
    })).toBeVisible();
  }
}`,...Zr.parameters?.docs?.source},description:{story:`Fresh-workspace settings keeps every section reachable at 320px.`,...Zr.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  render: args => <SettingsDialog {...args} onOpenChange={() => {}} open />,
  play: async ({
    canvasElement
  }) => {
    const screen = body(canvasElement);
    const dialog = await screen.findByRole('dialog', {
      name: 'Overview'
    });
    const scoped = within(dialog);
    const rail = scoped.getByRole('navigation', {
      name: 'Settings sections'
    });
    await userEvent.click(within(rail).getByRole('button', {
      name: 'Payments'
    }));
    await expect(await scoped.findByRole('heading', {
      level: 2,
      name: 'Payments'
    })).toBeInTheDocument();
  }
}`,...$.parameters?.docs?.source},description:{story:`320px: the dialog fills the screen; the rail becomes a horizontal strip.`,...$.parameters?.docs?.description}}},Qr=[`Overview`,`AccountVerified`,`AccountRejected`,`AccountUnderReview`,`AccountExpiring`,`AccountInGrace`,`AccountLapsed`,`Cabinet`,`TeamAccess`,`Preferences`,`PatientMessages`,`Payments`,`DirectoryProfile`,`SignedDocuments`,`Security`,`RailWalkthrough`,`Mobile320`,`Tablet768`,`DialogFrame`,`DialogPreferences`,`DialogFirstUseDoctor`,`DialogFirstUseDoctorMobile320`,`DialogMobile320`]}))();export{Fr as AccountExpiring,Ir as AccountInGrace,Lr as AccountLapsed,Nr as AccountRejected,Pr as AccountUnderReview,Mr as AccountVerified,Rr as Cabinet,Xr as DialogFirstUseDoctor,Zr as DialogFirstUseDoctorMobile320,Jr as DialogFrame,$ as DialogMobile320,Yr as DialogPreferences,Ur as DirectoryProfile,Kr as Mobile320,jr as Overview,Vr as PatientMessages,Hr as Payments,Br as Preferences,Q as RailWalkthrough,Gr as Security,Wr as SignedDocuments,qr as Tablet768,zr as TeamAccess,Qr as __namedExportsOrder,Ar as default};