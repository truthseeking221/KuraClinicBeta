import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{$ as i,Ct as a,K as o,Mt as s,O as c,P as l,k as u,o as d,u as f,x as p,y as m}from"./provider-marks-BeHzyBjc.js";import{t as h}from"./icons-C5MW4nvJ.js";import{I as g,fr as _,t as v}from"./ui-C9kmmzkH.js";import{d as y}from"./date-range-picker-CVkMECHY.js";import{i as b,n as x,r as S,t as C}from"./alert-l7nmjmGJ.js";import{t as w}from"./button-B6_zsN5-.js";import{a as T,n as E,t as D}from"./collapsible-Cfc9M9oP.js";import{t as O}from"./segmented-toggle-DDpNscFF.js";import{t as k}from"./money-text-DwvxiUCm.js";import{a as ee,c as te,l as A,n as ne,o as re,r as ie,s as j,t as ae}from"./logic-Dw_xoo09.js";var M,N,P,F,I,L,R,z,oe=t((()=>{M=`_stack_eo8a5_1`,N=`_suggestion_eo8a5_7`,P=`_text_eo8a5_24`,F=`_title_eo8a5_29`,I=`_detail_eo8a5_36`,L=`_delta_eo8a5_42`,R=`_actions_eo8a5_51`,z={stack:M,suggestion:N,text:P,title:F,detail:I,delta:L,actions:R}}));function B({onAccept:e,onDismiss:t,suggestions:n}){return n.length===0?null:(0,V.jsx)(`div`,{className:z.stack,children:n.map(n=>{let r=H[n.kind];return(0,V.jsxs)(`div`,{className:z.suggestion,"data-tone":r.tone,role:r.role,children:[(0,V.jsxs)(`div`,{className:z.text,children:[(0,V.jsx)(`p`,{className:z.title,children:n.title}),n.detail?(0,V.jsx)(`p`,{className:z.detail,children:n.detail}):null]}),n.deltaMinor?(0,V.jsxs)(`span`,{className:z.delta,"data-direction":n.deltaDirection??`save`,children:[n.deltaDirection===`add`?`+`:`−`,(0,V.jsx)(k,{currency:`USD`,minor:n.deltaMinor})]}):null,(0,V.jsxs)(`div`,{className:z.actions,children:[(0,V.jsx)(w,{onClick:()=>e?.(n),size:`xs`,variant:n.kind===`redundancy`?`outline`:`secondary`,children:n.actionLabel}),r.dismissible&&t?(0,V.jsx)(w,{onClick:()=>t(n),size:`xs`,variant:`ghost`,children:`Keep as is`}):null]})]},n.id)})})}var V,H,se=t((()=>{V=r(),v(),oe(),H={exact_match:{tone:`success`,role:`status`,dismissible:!1},upsell:{tone:`info`,role:`status`,dismissible:!1},redundancy:{tone:`warning`,role:`alert`,dismissible:!0},dependency_fill:{tone:`danger`,role:`alert`,dismissible:!1}},B.__docgenInfo={description:``,methods:[],displayName:`SuggestionStack`,props:{suggestions:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  kind: CartSuggestionKind;
  title: string;
  detail?: string;
  /** Signed money effect, minor units: save (−) or add (+). */
  deltaMinor?: string;
  deltaDirection?: 'save' | 'add';
  actionLabel: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`| 'exact_match'
| 'upsell'
| 'redundancy'
| 'dependency_fill'`,elements:[{name:`literal`,value:`'exact_match'`},{name:`literal`,value:`'upsell'`},{name:`literal`,value:`'redundancy'`},{name:`literal`,value:`'dependency_fill'`}],required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`detail`,value:{name:`string`,required:!1}},{key:`deltaMinor`,value:{name:`string`,required:!1},description:`Signed money effect, minor units: save (−) or add (+).`},{key:`deltaDirection`,value:{name:`union`,raw:`'save' | 'add'`,elements:[{name:`literal`,value:`'save'`},{name:`literal`,value:`'add'`}],required:!1}},{key:`actionLabel`,value:{name:`string`,required:!0}}]}}],raw:`CartSuggestion[]`},description:``},onAccept:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(suggestion: CartSuggestion) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  kind: CartSuggestionKind;
  title: string;
  detail?: string;
  /** Signed money effect, minor units: save (−) or add (+). */
  deltaMinor?: string;
  deltaDirection?: 'save' | 'add';
  actionLabel: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`| 'exact_match'
| 'upsell'
| 'redundancy'
| 'dependency_fill'`,elements:[{name:`literal`,value:`'exact_match'`},{name:`literal`,value:`'upsell'`},{name:`literal`,value:`'redundancy'`},{name:`literal`,value:`'dependency_fill'`}],required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`detail`,value:{name:`string`,required:!1}},{key:`deltaMinor`,value:{name:`string`,required:!1},description:`Signed money effect, minor units: save (−) or add (+).`},{key:`deltaDirection`,value:{name:`union`,raw:`'save' | 'add'`,elements:[{name:`literal`,value:`'save'`},{name:`literal`,value:`'add'`}],required:!1}},{key:`actionLabel`,value:{name:`string`,required:!0}}]}},name:`suggestion`}],return:{name:`void`}}},description:``},onDismiss:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(suggestion: CartSuggestion) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  kind: CartSuggestionKind;
  title: string;
  detail?: string;
  /** Signed money effect, minor units: save (−) or add (+). */
  deltaMinor?: string;
  deltaDirection?: 'save' | 'add';
  actionLabel: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`| 'exact_match'
| 'upsell'
| 'redundancy'
| 'dependency_fill'`,elements:[{name:`literal`,value:`'exact_match'`},{name:`literal`,value:`'upsell'`},{name:`literal`,value:`'redundancy'`},{name:`literal`,value:`'dependency_fill'`}],required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`detail`,value:{name:`string`,required:!1}},{key:`deltaMinor`,value:{name:`string`,required:!1},description:`Signed money effect, minor units: save (−) or add (+).`},{key:`deltaDirection`,value:{name:`union`,raw:`'save' | 'add'`,elements:[{name:`literal`,value:`'save'`},{name:`literal`,value:`'add'`}],required:!1}},{key:`actionLabel`,value:{name:`string`,required:!0}}]}},name:`suggestion`}],return:{name:`void`}}},description:``}}}})),ce,U,W,G,K,le,ue,de,fe,pe,me,he,ge,_e,ve,ye,be,xe,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e,et,tt,nt,rt,it,at,ot,st,ct,lt,ut,dt,ft,pt,mt,ht,gt,_t,q,vt,yt,bt,xt,J,St=t((()=>{ce=`_cart_1xayq_1`,U=`_srOnly_1xayq_14`,W=`_header_1xayq_26`,G=`_indication_1xayq_36`,K=`_indicationLabel_1xayq_44`,le=`_indicationValue_1xayq_49`,ue=`_titleGroup_1xayq_56`,de=`_title_1xayq_56`,fe=`_body_1xayq_72`,pe=`_group_1xayq_79`,me=`_groupLabel_1xayq_84`,he=`_lines_1xayq_90`,ge=`_line_1xayq_90`,_e=`_childLines_1xayq_105`,ve=`_lineRemove_1xayq_115`,ye=`_lineName_1xayq_137`,be=`_linePrice_1xayq_159`,xe=`_empty_1xayq_173`,Se=`_emptyIcon_1xayq_184`,Ce=`_dock_1xayq_207`,we=`_decisionCard_1xayq_218`,Te=`_decisionHeader_1xayq_228`,Ee=`_decisionSummaryRow_1xayq_229`,De=`_decisionTitle_1xayq_236`,Oe=`_decisionSummaryCopy_1xayq_243`,ke=`_decisionSummaryTitle_1xayq_250`,Ae=`_question_1xayq_262`,je=`_decisionEditor_1xayq_280`,Me=`_decisionMotion_1xayq_294`,Ne=`_questionLabel_1xayq_326`,Pe=`_optionGrid_1xayq_333`,Fe=`_optionCard_1xayq_349`,Ie=`_optionInput_1xayq_367`,Le=`_optionTop_1xayq_394`,Re=`_optionIcon_1xayq_401`,ze=`_optionRadio_1xayq_406`,Be=`_optionRadioDot_1xayq_423`,Ve=`_optionLabel_1xayq_430`,He=`_kuraMark_1xayq_437`,Ue=`_lockedNote_1xayq_442`,We=`_totals_1xayq_455`,Ge=`_totalRow_1xayq_464`,Ke=`_subtotalValue_1xayq_484`,qe=`_earnRow_1xayq_488`,Je=`_earnHelp_1xayq_500`,Ye=`_attest_1xayq_508`,Xe=`_footerCta_1xayq_512`,Ze=`_ctaReason_1xayq_518`,Qe=`_pricingLoading_1xayq_527`,$e=`_repriceList_1xayq_541`,et=`_blockers_1xayq_546`,tt=`_tubeView_1xayq_571`,nt=`_backLink_1xayq_581`,rt=`_tubeIntro_1xayq_605`,it=`_tubeIntroLabel_1xayq_611`,at=`_tubeTestList_1xayq_617`,ot=`_tubeReadyRow_1xayq_627`,st=`_tubeReadyTitle_1xayq_636`,ct=`_tubeList_1xayq_643`,lt=`_tubeRow_1xayq_652`,ut=`_tubeStopper_1xayq_664`,dt=`_tubeCopy_1xayq_672`,ft=`_tubeLabel_1xayq_680`,pt=`_tubeTests_1xayq_686`,mt=`_tubeCheck_1xayq_692`,ht=`_childLine_1xayq_105`,gt=`_childName_1xayq_740`,_t=`_childRelation_1xayq_745`,q=`_childCredit_1xayq_749`,vt=`_childDash_1xayq_755`,yt=`_struckPrice_1xayq_759`,bt=`_creditValue_1xayq_765`,xt=`_lineMeta_1xayq_773`,J={cart:ce,srOnly:U,header:W,indication:G,indicationLabel:K,indicationValue:le,titleGroup:ue,title:de,body:fe,group:pe,groupLabel:me,lines:he,line:ge,childLines:_e,lineRemove:ve,lineName:ye,linePrice:be,empty:xe,emptyIcon:Se,dock:Ce,decisionCard:we,decisionHeader:Te,decisionSummaryRow:Ee,decisionTitle:De,decisionSummaryCopy:Oe,decisionSummaryTitle:ke,question:Ae,decisionEditor:je,decisionMotion:Me,"decision-editor-open":`_decision-editor-open_1xayq_1`,questionLabel:Ne,optionGrid:Pe,optionCard:Fe,optionInput:Ie,optionTop:Le,optionIcon:Re,optionRadio:ze,optionRadioDot:Be,optionLabel:Ve,kuraMark:He,lockedNote:Ue,totals:We,totalRow:Ge,subtotalValue:Ke,earnRow:qe,earnHelp:Je,attest:Ye,footerCta:Xe,ctaReason:Ze,pricingLoading:Qe,repriceList:$e,blockers:et,tubeView:tt,backLink:nt,tubeIntro:rt,tubeIntroLabel:it,tubeTestList:at,tubeReadyRow:ot,tubeReadyTitle:st,tubeList:ct,tubeRow:lt,tubeStopper:ut,tubeCopy:dt,tubeLabel:ft,tubeTests:pt,tubeCheck:mt,childLine:ht,childName:gt,childRelation:_t,childCredit:q,childDash:vt,struckPrice:yt,creditValue:bt,lineMeta:xt}}));function Y(...e){return e.filter(Boolean).join(` `)}function X({disabled:e,icon:t,label:n,name:r,onSelect:i,selected:a}){return(0,Z.jsxs)(`label`,{className:J.optionCard,"data-disabled":e||void 0,"data-selected":a||void 0,children:[(0,Z.jsx)(`input`,{checked:a,className:J.optionInput,disabled:e,name:r,onChange:i,type:`radio`}),(0,Z.jsxs)(`span`,{className:J.optionTop,children:[(0,Z.jsx)(`span`,{className:J.optionIcon,children:t}),(0,Z.jsx)(`span`,{"aria-hidden":`true`,className:J.optionRadio,"data-selected":a||void 0,children:a?(0,Z.jsx)(`span`,{className:J.optionRadioDot}):null})]}),(0,Z.jsx)(`span`,{className:J.optionLabel,children:n})]})}function Ct(){return(0,Z.jsx)(`img`,{alt:``,"aria-hidden":`true`,className:J.kuraMark,src:`/brand/kura-full-logo.svg`})}function wt({onAcceptReprice:e,onRetryPricing:t,pricing:n}){return n.state===`loading`?(0,Z.jsx)(g,{"aria-atomic":`true`,className:J.pricingLoading,label:`Updating prices…`,showLabel:!0,size:`sm`}):n.state===`error`?(0,Z.jsxs)(C,{tone:`danger`,children:[(0,Z.jsx)(b,{children:`Price unavailable`}),(0,Z.jsx)(S,{children:n.message??`We couldn’t update prices. Your selections are saved.`}),t?(0,Z.jsx)(x,{children:(0,Z.jsx)(w,{onClick:t,size:`sm`,variant:`outline`,children:`Retry pricing`})}):null]}):n.state===`stale`?(0,Z.jsxs)(C,{icon:(0,Z.jsx)(d,{}),tone:`warning`,children:[(0,Z.jsx)(b,{children:`Prices changed`}),(0,Z.jsxs)(S,{children:[(0,Z.jsx)(`ul`,{className:J.repriceList,children:n.repricedLines.map(e=>(0,Z.jsxs)(`li`,{children:[e.name,`: `,(0,Z.jsx)(`s`,{children:(0,Z.jsx)(k,{currency:`USD`,minor:e.oldPriceMinor})}),` →`,` `,(0,Z.jsx)(k,{currency:`USD`,minor:e.newPriceMinor})]},e.itemId))}),`Review and accept the updated quote before continuing.`]}),e?(0,Z.jsx)(x,{children:(0,Z.jsx)(w,{onClick:e,size:`sm`,variant:`outline`,children:`Accept new price`})}):null]}):null}function Tt(e){let t=(0,Q.useRef)(null),n=(0,Q.useRef)(null),r=(0,Q.useRef)(null),i=(0,Q.useRef)(e);return(0,Q.useEffect)(()=>{let a=i.current;if(i.current=e,a!==e){if(e===`expanded`){let e=r.current?.querySelector(`input[type="radio"]:checked:not(:disabled)`),t=r.current?.querySelector(`input[type="radio"]:not(:disabled)`);(e??t??n.current)?.focus({preventScroll:!0});return}a===`expanded`&&t.current?.focus()}},[e]),{actionRef:t,headingRef:n,sectionRef:r}}function Et({onDecisionsChange:e,onPanelChange:t,workflow:n}){let{decisions:r,panel:a}=n,o=(0,Q.useId)(),s=(0,Q.useId)(),l=(0,Q.useId)(),u=(0,Q.useId)(),{actionRef:f,headingRef:p,sectionRef:h}=Tt(a),g=ie(n),_=n.paymentLocked===!0,v=n.stage===`draft`,y=a===`expanded`,b=g!==null,x=b?v&&!_?`Edit`:`View`:`Set up`,S=t=>e?.({...r,...t}),C=v&&!_;return(0,Z.jsx)(D,{open:y,children:(0,Z.jsxs)(`section`,{"aria-labelledby":u,className:J.decisionCard,ref:h,children:[y?(0,Z.jsxs)(`div`,{className:J.decisionHeader,children:[(0,Z.jsx)(`h3`,{className:J.decisionTitle,id:u,ref:p,tabIndex:-1,children:`Collection & payment`}),(0,Z.jsx)(w,{"aria-controls":l,"aria-expanded":!0,onClick:()=>t?.(`summary`),ref:f,size:`sm`,variant:`link`,children:`Done`})]}):(0,Z.jsxs)(`div`,{className:J.decisionSummaryRow,children:[(0,Z.jsxs)(`div`,{className:J.decisionSummaryCopy,children:[(0,Z.jsx)(`h3`,{className:J.decisionSummaryTitle,id:u,children:b?g.title:`Collection & payment`}),(0,Z.jsx)(`span`,{children:b?g.detail:`Not set yet`})]}),(0,Z.jsx)(w,{"aria-controls":l,"aria-expanded":!1,"aria-label":`${x} collection and payment`,onClick:()=>t?.(`expanded`),ref:f,size:`sm`,variant:`link`,children:x})]}),(0,Z.jsx)(E,{className:J.decisionMotion,forceMount:!0,id:l,children:(0,Z.jsxs)(`div`,{className:J.decisionEditor,children:[(0,Z.jsxs)(`fieldset`,{className:J.question,children:[(0,Z.jsx)(`legend`,{className:J.questionLabel,children:`Who will collect the sample?`}),(0,Z.jsxs)(`div`,{"aria-label":`Who will collect the sample?`,className:J.optionGrid,role:`radiogroup`,children:[(0,Z.jsx)(X,{disabled:!C,icon:(0,Z.jsx)(i,{"aria-hidden":`true`,size:20}),label:`I will draw the blood now`,name:o,onSelect:()=>S({collectBy:`self`,drawSite:void 0}),selected:r.collectBy===`self`}),(0,Z.jsx)(X,{disabled:!C,icon:(0,Z.jsx)(Ct,{}),label:`Kura will draw the blood`,name:o,onSelect:()=>S({collectBy:`kura`}),selected:r.collectBy===`kura`})]})]}),r.collectBy===`kura`?(0,Z.jsxs)(`div`,{className:J.question,children:[(0,Z.jsx)(`p`,{className:J.questionLabel,children:`Where is the blood drawn?`}),(0,Z.jsx)(O,{label:`Where is the blood drawn?`,disabled:!C,onValueChange:e=>S({drawSite:e}),options:[{value:`kura-psc`,label:`Kura PSC`},{value:`patient-home`,label:`Patient Home`}],value:r.drawSite??``})]}):null,(0,Z.jsxs)(`fieldset`,{className:J.question,children:[(0,Z.jsx)(`legend`,{className:J.questionLabel,children:`What is the payment method?`}),(0,Z.jsxs)(`div`,{"aria-label":`What is the payment method?`,className:J.optionGrid,role:`radiogroup`,children:[(0,Z.jsx)(X,{disabled:!C,icon:(0,Z.jsx)(m,{"aria-hidden":`true`,size:20}),label:`Patient will pay you now`,name:s,onSelect:()=>S({payment:`pay-now`}),selected:r.payment===`pay-now`}),(0,Z.jsx)(X,{disabled:!C,icon:(0,Z.jsx)(c,{"aria-hidden":`true`,size:20}),label:`Patient will pay later at Kura`,name:s,onSelect:()=>S({payment:`pay-later-kura`}),selected:r.payment===`pay-later-kura`})]})]}),_?(0,Z.jsxs)(`div`,{className:J.lockedNote,role:`note`,children:[(0,Z.jsx)(d,{"aria-hidden":`true`,size:14}),`Locked after payment. You can edit later in Booking.`]}):null]})})]})})}function Dt({onMethodChange:e,onPanelChange:t,workflow:n}){let r=(0,Q.useId)(),i=(0,Q.useId)(),o=(0,Q.useId)(),{actionRef:s,headingRef:l,sectionRef:u}=Tt(n.panel),f=n.payment.status===`paid`,p=f||n.stage===`checked-in`,h=n.panel===`expanded`,g=n.method!==void 0,_=g?p?`View`:`Edit`:`Set up`;return(0,Z.jsx)(D,{open:h,children:(0,Z.jsxs)(`section`,{"aria-labelledby":o,className:J.decisionCard,ref:u,children:[h?(0,Z.jsxs)(`div`,{className:J.decisionHeader,children:[(0,Z.jsx)(`h3`,{className:J.decisionTitle,id:o,ref:l,tabIndex:-1,children:`Payment`}),(0,Z.jsx)(w,{"aria-controls":i,"aria-expanded":!0,onClick:()=>t?.(`summary`),ref:s,size:`sm`,variant:`link`,children:`Done`})]}):(0,Z.jsxs)(`div`,{className:J.decisionSummaryRow,children:[(0,Z.jsxs)(`div`,{className:J.decisionSummaryCopy,children:[(0,Z.jsx)(`h3`,{className:J.decisionSummaryTitle,id:o,children:g?`Payment · ${$[n.method]}`:`Payment`}),(0,Z.jsx)(`span`,{children:f?`${n.payment.label}${n.payment.receiptId?` · ${n.payment.receiptId}`:``}`:g?n.payment.label:`Not set yet`})]}),(0,Z.jsx)(w,{"aria-controls":i,"aria-expanded":!1,"aria-label":`${_} payment`,onClick:()=>t?.(`expanded`),ref:s,size:`sm`,variant:`link`,children:_})]}),(0,Z.jsx)(E,{className:J.decisionMotion,forceMount:!0,id:i,children:(0,Z.jsxs)(`div`,{className:J.decisionEditor,children:[(0,Z.jsxs)(`fieldset`,{className:J.question,children:[(0,Z.jsx)(`legend`,{className:J.questionLabel,children:`How does the patient pay?`}),(0,Z.jsxs)(`div`,{"aria-label":`How does the patient pay?`,className:J.optionGrid,role:`radiogroup`,children:[(0,Z.jsx)(X,{disabled:p,icon:(0,Z.jsx)(m,{"aria-hidden":`true`,size:20}),label:`Cash at the desk`,name:r,onSelect:()=>e?.(`cash`),selected:n.method===`cash`}),(0,Z.jsx)(X,{disabled:p,icon:(0,Z.jsx)(a,{"aria-hidden":`true`,size:20}),label:`KHQR transfer`,name:r,onSelect:()=>e?.(`khqr`),selected:n.method===`khqr`}),(0,Z.jsx)(X,{disabled:p,icon:(0,Z.jsx)(c,{"aria-hidden":`true`,size:20}),label:`Pay later at Kura`,name:r,onSelect:()=>e?.(`pay-later`),selected:n.method===`pay-later`})]})]}),p?(0,Z.jsxs)(`div`,{className:J.lockedNote,role:`note`,children:[(0,Z.jsx)(d,{"aria-hidden":`true`,size:14}),`Locked after payment. Changes route through void or supplemental.`]}):null]})})]})})}function Ot({onBackToCart:e,onPrimaryAction:t,onTubeMethodChange:n,onTubeScan:r,workflow:i}){let a=i.tubes??[],o=A(a),s=Array.from(new Set(a.flatMap(e=>e.tests)));return(0,Z.jsxs)(`div`,{className:J.tubeView,children:[(0,Z.jsxs)(`button`,{className:J.backLink,onClick:e,type:`button`,children:[(0,Z.jsx)(f,{"aria-hidden":`true`,size:14}),`Back to cart`]}),(0,Z.jsxs)(`div`,{className:J.tubeIntro,children:[(0,Z.jsx)(`p`,{className:J.tubeIntroLabel,children:`You need to prepare tubes for`}),(0,Z.jsx)(`ol`,{className:J.tubeTestList,children:s.map(e=>(0,Z.jsx)(`li`,{children:e},e))})]}),(0,Z.jsxs)(`div`,{className:J.question,children:[(0,Z.jsx)(`p`,{className:J.questionLabel,children:`Choose preparation method`}),(0,Z.jsx)(O,{label:`Choose preparation method`,onValueChange:e=>n?.(e),options:[{value:`scan`,label:`Scan`},{value:`print`,label:`Print`}],value:i.tubeMethod??`scan`})]}),(0,Z.jsxs)(`div`,{className:J.tubeReadyRow,children:[(0,Z.jsx)(`h3`,{className:J.tubeReadyTitle,children:`Ready`}),(0,Z.jsxs)(T,{size:`sm`,variant:o.complete?`success`:`neutral`,children:[o.scanned,`/`,o.total,` scanned`]})]}),(0,Z.jsx)(`ul`,{className:J.tubeList,children:a.map(e=>(0,Z.jsxs)(`li`,{className:J.tubeRow,"data-scanned":e.scanned||void 0,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,className:J.tubeStopper,style:{background:e.stopperColor}}),(0,Z.jsxs)(`span`,{className:J.tubeCopy,children:[(0,Z.jsx)(`span`,{className:J.tubeLabel,children:e.label}),(0,Z.jsx)(`span`,{className:J.tubeTests,children:e.tests.join(` · `)})]}),e.scanned?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(w,{onClick:()=>r?.(e.id,!1),size:`xs`,variant:`link`,children:`Undo`}),(0,Z.jsx)(`span`,{"aria-label":`Scanned`,className:J.tubeCheck,role:`img`,children:(0,Z.jsx)(p,{"aria-hidden":`true`,size:12})})]}):(0,Z.jsx)(w,{onClick:()=>r?.(e.id,!0),size:`xs`,variant:`outline`,children:`Mark scanned`})]},e.id))}),(0,Z.jsxs)(`div`,{className:J.footerCta,children:[(0,Z.jsx)(w,{disabled:!o.complete,fullWidth:!0,onClick:t,size:`lg`,children:`Confirm collection & scan`}),o.complete?null:(0,Z.jsxs)(`p`,{className:J.ctaReason,children:[`Scan every tube first (`,o.scanned,`/`,o.total,` scanned).`]})]})]})}function kt(e){return e.state===`locked`?(0,Z.jsx)(T,{size:`sm`,children:`Required`}):e.state===`supplemental`?(0,Z.jsx)(T,{size:`sm`,variant:`warning`,children:`Added after payment`}):e.state===`cancelled`?(0,Z.jsx)(T,{size:`sm`,children:`Voided`}):null}function At({cart:e,className:t,onAcceptReprice:n,onAddFirst:r,onAttestChange:i,onBackToCart:a,onBlockerAction:c,onClear:d,onDecisionsChange:f,onMethodChange:p,onPanelChange:m,onPrimaryAction:h,onRemoveItem:g,onRetryPricing:v,onSuggestionAccept:b,onSuggestionDismiss:x,onTubeMethodChange:S,onTubeScan:C,suggestions:E,workflow:D}){let O=(0,Q.useId)(),A=te(e.items),ie=re(e.items),j=ae(e,D),M=ee(e,D),N=j&&e.items.some(e=>e.state!==`locked`),P=e.pricing.state===`error`?void 0:e.pricing.summary;if(D.role===`doctor`&&D.stage===`tubes`)return(0,Z.jsx)(`aside`,{"aria-label":`Order cart — tube preparation`,className:Y(J.cart,t),"data-role":D.role,children:(0,Z.jsx)(Ot,{onBackToCart:a,onPrimaryAction:h,onTubeMethodChange:S,onTubeScan:C,workflow:D})});let F=e.items.length===0,I=D.role===`doctor`?D.decisions.payment===`pay-now`&&ne(D.decisions)&&D.stage===`draft`:D.method!==void 0&&D.method!==`pay-later`&&D.payment.status!==`paid`&&D.stage!==`checked-in`,L=D.role===`doctor`?D.earnings:void 0,R=D.role===`receptionist`&&D.stage===`order-review`;return(0,Z.jsxs)(`aside`,{"aria-label":R?`Receptionist order summary`:`${D.role===`doctor`?`Doctor`:`Receptionist`} order cart`,className:Y(J.cart,t),"data-lifecycle":e.lifecycle,"data-role":D.role,children:[(0,Z.jsxs)(`header`,{className:J.header,children:[(0,Z.jsxs)(`div`,{className:J.titleGroup,children:[(0,Z.jsx)(`h2`,{className:J.title,children:F?`Order Cart`:`Selected tests`}),F?null:(0,Z.jsx)(T,{"aria-label":`${A} tests selected`,size:`sm`,children:A})]}),N&&d?(0,Z.jsx)(y,{"aria-label":`Clear all removable items`,onClick:d,size:`micro`,variant:`tertiary`,children:(0,Z.jsx)(l,{"aria-hidden":`true`,size:16})}):null]}),D.role===`doctor`&&D.indication&&!F?(0,Z.jsxs)(`p`,{className:J.indication,children:[(0,Z.jsx)(`span`,{className:J.indicationLabel,children:`Ordered for`}),(0,Z.jsx)(`span`,{className:J.indicationValue,children:D.indication.code===``?D.indication.label:`${D.indication.code} · ${D.indication.label}`})]}):null,F?(0,Z.jsxs)(`div`,{className:J.empty,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,className:J.emptyIcon,children:(0,Z.jsx)(s,{size:28})}),(0,Z.jsx)(`strong`,{children:`Nothing here yet`}),(0,Z.jsx)(`span`,{children:D.role===`doctor`?`Add your first lab test.`:`Add an order item to begin.`}),r&&D.access===`allowed`?(0,Z.jsx)(w,{onClick:r,size:`sm`,variant:`outline`,children:`Add first test`}):null]}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`div`,{className:J.body,children:[(0,Z.jsxs)(`section`,{"aria-labelledby":O,className:J.itemsSection,children:[(0,Z.jsx)(`h3`,{className:J.srOnly,id:O,children:`Selected items`}),ie.map(e=>(0,Z.jsxs)(`div`,{className:J.group,children:[(0,Z.jsx)(`p`,{className:J.groupLabel,children:e.label}),(0,Z.jsx)(`ul`,{className:J.lines,children:e.items.map(e=>(0,Z.jsxs)(`li`,{className:J.line,"data-state":e.state??`default`,children:[(0,Z.jsxs)(`span`,{className:J.lineName,children:[e.name,kt(e),e.meta?(0,Z.jsx)(`span`,{className:J.lineMeta,children:e.meta}):null]}),(0,Z.jsxs)(`span`,{className:J.linePrice,children:[e.struckPriceMinor?(0,Z.jsx)(k,{className:J.struckPrice,currency:e.currencyCode,minor:e.struckPriceMinor}):null,(0,Z.jsx)(k,{currency:e.currencyCode,minor:e.priceMinor})]}),j&&e.state!==`locked`&&e.state!==`cancelled`&&g?(0,Z.jsx)(y,{"aria-label":`Remove ${e.name}`,className:J.lineRemove,onClick:()=>g(e.id),size:`micro`,variant:`tertiary`,children:(0,Z.jsx)(u,{"aria-hidden":`true`,size:12})}):null,e.children?.length?(0,Z.jsx)(`ul`,{"aria-label":`${e.name} members`,className:J.childLines,children:e.children.map(t=>(0,Z.jsxs)(`li`,{className:J.childLine,"data-relation":t.relation,children:[(0,Z.jsxs)(`span`,{className:J.childName,children:[t.name,t.relation===`derived_input`?(0,Z.jsx)(`span`,{className:J.childRelation,children:` · input`}):null]}),t.creditMinor?(0,Z.jsxs)(`span`,{className:J.childCredit,children:[`−`,(0,Z.jsx)(k,{currency:e.currencyCode,minor:t.creditMinor})]}):(0,Z.jsx)(`span`,{"aria-hidden":!0,className:J.childDash,children:`—`})]},t.id))}):null]},e.id))})]},e.kind))]}),E&&E.length>0?(0,Z.jsx)(B,{onAccept:b,onDismiss:x,suggestions:E}):null]}),(0,Z.jsxs)(`div`,{className:J.dock,children:[(0,Z.jsx)(wt,{onAcceptReprice:n,onRetryPricing:v,pricing:e.pricing}),D.role===`doctor`?(0,Z.jsx)(Et,{onDecisionsChange:f,onPanelChange:m,workflow:D}):R?null:(0,Z.jsx)(Dt,{onMethodChange:p,onPanelChange:m,workflow:D}),D.blockers.length>0?(0,Z.jsx)(`div`,{"aria-live":`polite`,className:J.blockers,role:`status`,children:D.blockers.map(e=>(0,Z.jsxs)(`div`,{"data-tone":e.tone??`neutral`,children:[(0,Z.jsx)(`span`,{children:e.label}),e.actionLabel&&c?(0,Z.jsx)(w,{onClick:()=>c(e.id),size:`xs`,variant:`outline`,children:e.actionLabel}):null]},e.id))}):null,P?(0,Z.jsxs)(`dl`,{className:J.totals,children:[(0,Z.jsxs)(`div`,{className:J.totalRow,children:[(0,Z.jsx)(`dt`,{children:`Subtotal`}),(0,Z.jsx)(`dd`,{children:(0,Z.jsx)(k,{animateChanges:!0,className:J.subtotalValue,currency:P.currencyCode,minor:P.subtotalMinor})})]}),P.creditMinor?(0,Z.jsxs)(`div`,{className:J.totalRow,"data-credit":!0,children:[(0,Z.jsx)(`dt`,{children:P.creditLabel??`Shared credit`}),(0,Z.jsxs)(`dd`,{className:J.creditValue,children:[`−`,(0,Z.jsx)(k,{currency:P.currencyCode,minor:P.creditMinor})]})]}):null,P.previousPaidMinor?(0,Z.jsxs)(`div`,{className:J.totalRow,children:[(0,Z.jsxs)(`dt`,{children:[`Previously paid`,P.previousReceiptId?` (${P.previousReceiptId})`:``]}),(0,Z.jsxs)(`dd`,{children:[`−`,(0,Z.jsx)(k,{currency:`USD`,minor:P.previousPaidMinor})]})]}):null,P.patientDueKhrMinor?(0,Z.jsxs)(`div`,{className:J.totalRow,children:[(0,Z.jsx)(`dt`,{children:`Patient due · KHR`}),(0,Z.jsx)(`dd`,{children:(0,Z.jsx)(k,{currency:`KHR`,minor:P.patientDueKhrMinor})})]}):null,L?(0,Z.jsxs)(`div`,{className:Y(J.totalRow,J.earnRow),children:[(0,Z.jsxs)(`dt`,{children:[`You’ll earn`,(0,Z.jsx)(`span`,{className:J.earnHelp,title:`Your commission on this order, settled to your Kura balance.`,children:(0,Z.jsx)(o,{"aria-hidden":`true`,size:13})})]}),(0,Z.jsx)(`dd`,{children:(0,Z.jsx)(k,{animateChanges:!0,currency:`USD`,minor:L.earnMinor})})]}):null]}):null,I&&P?(0,Z.jsxs)(_,{checked:D.attested,className:J.attest,onChange:e=>i?.(e.target.checked),children:[`I have collected`,` `,(0,Z.jsx)(k,{currency:`USD`,minor:P.patientDueMinor}),` via cash or KHQR`]}):null,M?(0,Z.jsxs)(`div`,{className:J.footerCta,children:[(0,Z.jsx)(w,{disabled:M.disabled,fullWidth:!0,onClick:h,size:`lg`,children:M.label}),M.disabledReason?(0,Z.jsx)(`p`,{className:J.ctaReason,children:M.disabledReason}):null]}):null]})]})]})}var Z,Q,$,jt=t((()=>{Z=r(),Q=e(n()),v(),h(),j(),se(),St(),$={cash:`Cash`,khqr:`KHQR`,"pay-later":`Pay later at Kura`},At.__docgenInfo={description:`The one clinic order cart (Figma \`OrderCart / HBC workflow\`): doctor and
receptionist share the shell — selected tests, a collection-and-payment
decision card, totals with clinician earnings, a collected-money
attestation, and one primary action whose label follows the lifecycle.`,methods:[],displayName:`OrderCart`,props:{cart:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  id: string;
  reference?: string;
  patient?: OrderCartPatient;
  lifecycle: OrderCartLifecycle;
  items: OrderCartItem[];
  pricing: OrderCartPricing;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`reference`,value:{name:`string`,required:!1}},{key:`patient`,value:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  identifier?: string;
  demographicLabel?: string;
  encounterLabel?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`identifier`,value:{name:`string`,required:!1}},{key:`demographicLabel`,value:{name:`string`,required:!1}},{key:`encounterLabel`,value:{name:`string`,required:!1}}]},required:!1}},{key:`lifecycle`,value:{name:`union`,raw:`'draft' | 'placed' | 'cancelled'`,elements:[{name:`literal`,value:`'draft'`},{name:`literal`,value:`'placed'`},{name:`literal`,value:`'cancelled'`}],required:!0}},{key:`items`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  kind: OrderCartItemKind;
  name: string;
  code?: string;
  priceMinor: string;
  currencyCode: 'USD';
  quantity: number;
  state?: OrderCartItemState;
  meta?: string;
  origin?: string;
  children?: OrderCartItemChild[];
  /** Gross price when a shared-atom credit reduced the effective price. */
  struckPriceMinor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`| 'visit'
| 'lab'
| 'imaging'
| 'ecg'
| 'vitals'
| 'telecon'`,elements:[{name:`literal`,value:`'visit'`},{name:`literal`,value:`'lab'`},{name:`literal`,value:`'imaging'`},{name:`literal`,value:`'ecg'`},{name:`literal`,value:`'vitals'`},{name:`literal`,value:`'telecon'`}],required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`code`,value:{name:`string`,required:!1}},{key:`priceMinor`,value:{name:`string`,required:!0}},{key:`currencyCode`,value:{name:`literal`,value:`'USD'`,required:!0}},{key:`quantity`,value:{name:`number`,required:!0}},{key:`state`,value:{name:`union`,raw:`| 'default'
| 'locked'
| 'supplemental'
| 'cancelled'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'locked'`},{name:`literal`,value:`'supplemental'`},{name:`literal`,value:`'cancelled'`}],required:!1}},{key:`meta`,value:{name:`string`,required:!1}},{key:`origin`,value:{name:`string`,required:!1}},{key:`children`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  relation: OrderCartChildRelation;
  /** Only credited children carry money: the amount not double-charged. */
  creditMinor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`relation`,value:{name:`union`,raw:`| 'package_child'
| 'profile_child'
| 'panel_channel'
| 'derived_input'`,elements:[{name:`literal`,value:`'package_child'`},{name:`literal`,value:`'profile_child'`},{name:`literal`,value:`'panel_channel'`},{name:`literal`,value:`'derived_input'`}],required:!0}},{key:`creditMinor`,value:{name:`string`,required:!1},description:`Only credited children carry money: the amount not double-charged.`}]}}],raw:`OrderCartItemChild[]`,required:!1}},{key:`struckPriceMinor`,value:{name:`string`,required:!1},description:`Gross price when a shared-atom credit reduced the effective price.`}]}}],raw:`OrderCartItem[]`,required:!0}},{key:`pricing`,value:{name:`union`,raw:`| { state: 'ready'; summary: OrderCartPriceSummary }
| { state: 'loading'; summary?: OrderCartPriceSummary }
| { state: 'error'; message?: string }
| {
    state: 'stale';
    summary: OrderCartPriceSummary;
    repricedLines: OrderCartRepricedLine[];
  }`,elements:[{name:`signature`,type:`object`,raw:`{ state: 'ready'; summary: OrderCartPriceSummary }`,signature:{properties:[{key:`state`,value:{name:`literal`,value:`'ready'`,required:!0}},{key:`summary`,value:{name:`signature`,type:`object`,raw:`{
  subtotalMinor: string;
  patientDueMinor: string;
  currencyCode: 'USD';
  /** Injected config quote rendered as a secondary KHR value. */
  patientDueKhrMinor?: string;
  previousPaidMinor?: string;
  previousReceiptId?: string;
  /** Shared-atom dedupe: money the patient is NOT charged twice. */
  creditMinor?: string;
  creditLabel?: string;
}`,signature:{properties:[{key:`subtotalMinor`,value:{name:`string`,required:!0}},{key:`patientDueMinor`,value:{name:`string`,required:!0}},{key:`currencyCode`,value:{name:`literal`,value:`'USD'`,required:!0}},{key:`patientDueKhrMinor`,value:{name:`string`,required:!1},description:`Injected config quote rendered as a secondary KHR value.`},{key:`previousPaidMinor`,value:{name:`string`,required:!1}},{key:`previousReceiptId`,value:{name:`string`,required:!1}},{key:`creditMinor`,value:{name:`string`,required:!1},description:`Shared-atom dedupe: money the patient is NOT charged twice.`},{key:`creditLabel`,value:{name:`string`,required:!1}}]},required:!0}}]}},{name:`signature`,type:`object`,raw:`{ state: 'loading'; summary?: OrderCartPriceSummary }`,signature:{properties:[{key:`state`,value:{name:`literal`,value:`'loading'`,required:!0}},{key:`summary`,value:{name:`signature`,type:`object`,raw:`{
  subtotalMinor: string;
  patientDueMinor: string;
  currencyCode: 'USD';
  /** Injected config quote rendered as a secondary KHR value. */
  patientDueKhrMinor?: string;
  previousPaidMinor?: string;
  previousReceiptId?: string;
  /** Shared-atom dedupe: money the patient is NOT charged twice. */
  creditMinor?: string;
  creditLabel?: string;
}`,signature:{properties:[{key:`subtotalMinor`,value:{name:`string`,required:!0}},{key:`patientDueMinor`,value:{name:`string`,required:!0}},{key:`currencyCode`,value:{name:`literal`,value:`'USD'`,required:!0}},{key:`patientDueKhrMinor`,value:{name:`string`,required:!1},description:`Injected config quote rendered as a secondary KHR value.`},{key:`previousPaidMinor`,value:{name:`string`,required:!1}},{key:`previousReceiptId`,value:{name:`string`,required:!1}},{key:`creditMinor`,value:{name:`string`,required:!1},description:`Shared-atom dedupe: money the patient is NOT charged twice.`},{key:`creditLabel`,value:{name:`string`,required:!1}}]},required:!0}}]}},{name:`signature`,type:`object`,raw:`{ state: 'error'; message?: string }`,signature:{properties:[{key:`state`,value:{name:`literal`,value:`'error'`,required:!0}},{key:`message`,value:{name:`string`,required:!1}}]}},{name:`signature`,type:`object`,raw:`{
  state: 'stale';
  summary: OrderCartPriceSummary;
  repricedLines: OrderCartRepricedLine[];
}`,signature:{properties:[{key:`state`,value:{name:`literal`,value:`'stale'`,required:!0}},{key:`summary`,value:{name:`signature`,type:`object`,raw:`{
  subtotalMinor: string;
  patientDueMinor: string;
  currencyCode: 'USD';
  /** Injected config quote rendered as a secondary KHR value. */
  patientDueKhrMinor?: string;
  previousPaidMinor?: string;
  previousReceiptId?: string;
  /** Shared-atom dedupe: money the patient is NOT charged twice. */
  creditMinor?: string;
  creditLabel?: string;
}`,signature:{properties:[{key:`subtotalMinor`,value:{name:`string`,required:!0}},{key:`patientDueMinor`,value:{name:`string`,required:!0}},{key:`currencyCode`,value:{name:`literal`,value:`'USD'`,required:!0}},{key:`patientDueKhrMinor`,value:{name:`string`,required:!1},description:`Injected config quote rendered as a secondary KHR value.`},{key:`previousPaidMinor`,value:{name:`string`,required:!1}},{key:`previousReceiptId`,value:{name:`string`,required:!1}},{key:`creditMinor`,value:{name:`string`,required:!1},description:`Shared-atom dedupe: money the patient is NOT charged twice.`},{key:`creditLabel`,value:{name:`string`,required:!1}}]},required:!0}},{key:`repricedLines`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  itemId: string;
  name: string;
  oldPriceMinor: string;
  newPriceMinor: string;
}`,signature:{properties:[{key:`itemId`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`oldPriceMinor`,value:{name:`string`,required:!0}},{key:`newPriceMinor`,value:{name:`string`,required:!0}}]}}],raw:`OrderCartRepricedLine[]`,required:!0}}]}}],required:!0}}]}},description:``},workflow:{required:!0,tsType:{name:`union`,raw:`| DoctorOrderCartWorkflow
| ReceptionistOrderCartWorkflow`,elements:[{name:`intersection`,raw:`BaseOrderCartWorkflow & {
  role: 'doctor';
  stage: DoctorStage;
  authority: 'verified' | 'explorer' | 'read-only';
  /**
   * The clinical reason this order exists, copied from the encounter that
   * produced it. An order without one cannot be sent: a lab test is an act on
   * a patient, and the record has to say what it was for. Absent means the
   * doctor reached the cart without an assessment, not that the reason is
   * optional.
   */
  indication?: OrderIndication;
  decisions: CollectionDecisions;
  panel: DecisionPanelState;
  /** "I have collected $X via cash or KHQR" — required before pay-now advances. */
  attested: boolean;
  earnings?: OrderCartEarnings;
  /** Decisions freeze once money moved; edits continue in Booking. */
  paymentLocked?: boolean;
  tubes?: OrderCartTube[];
  tubeMethod?: TubePrepMethod;
}`,elements:[{name:`signature`,type:`object`,raw:`{
  role: OrderCartRole;
  actorName: string;
  access: 'allowed' | 'read-only' | 'denied';
  blockers: OrderCartBlocker[];
}`,signature:{properties:[{key:`role`,value:{name:`union`,raw:`'doctor' | 'receptionist'`,elements:[{name:`literal`,value:`'doctor'`},{name:`literal`,value:`'receptionist'`}],required:!0}},{key:`actorName`,value:{name:`string`,required:!0}},{key:`access`,value:{name:`union`,raw:`'allowed' | 'read-only' | 'denied'`,elements:[{name:`literal`,value:`'allowed'`},{name:`literal`,value:`'read-only'`},{name:`literal`,value:`'denied'`}],required:!0}},{key:`blockers`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  label: string;
  recovery?: string;
  actionLabel?: string;
  tone?: 'neutral' | 'warning' | 'danger';
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`recovery`,value:{name:`string`,required:!1}},{key:`actionLabel`,value:{name:`string`,required:!1}},{key:`tone`,value:{name:`union`,raw:`'neutral' | 'warning' | 'danger'`,elements:[{name:`literal`,value:`'neutral'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'danger'`}],required:!1}}]}}],raw:`OrderCartBlocker[]`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{
  role: 'doctor';
  stage: DoctorStage;
  authority: 'verified' | 'explorer' | 'read-only';
  /**
   * The clinical reason this order exists, copied from the encounter that
   * produced it. An order without one cannot be sent: a lab test is an act on
   * a patient, and the record has to say what it was for. Absent means the
   * doctor reached the cart without an assessment, not that the reason is
   * optional.
   */
  indication?: OrderIndication;
  decisions: CollectionDecisions;
  panel: DecisionPanelState;
  /** "I have collected $X via cash or KHQR" — required before pay-now advances. */
  attested: boolean;
  earnings?: OrderCartEarnings;
  /** Decisions freeze once money moved; edits continue in Booking. */
  paymentLocked?: boolean;
  tubes?: OrderCartTube[];
  tubeMethod?: TubePrepMethod;
}`,signature:{properties:[{key:`role`,value:{name:`literal`,value:`'doctor'`,required:!0}},{key:`stage`,value:{name:`union`,raw:`'draft' | 'code-sent' | 'collected' | 'tubes' | 'confirmed'`,elements:[{name:`literal`,value:`'draft'`},{name:`literal`,value:`'code-sent'`},{name:`literal`,value:`'collected'`},{name:`literal`,value:`'tubes'`},{name:`literal`,value:`'confirmed'`}],required:!0}},{key:`authority`,value:{name:`union`,raw:`'verified' | 'explorer' | 'read-only'`,elements:[{name:`literal`,value:`'verified'`},{name:`literal`,value:`'explorer'`},{name:`literal`,value:`'read-only'`}],required:!0}},{key:`indication`,value:{name:`signature`,type:`object`,raw:`{
  diagnosisId: string;
  code: string;
  label: string;
  certainty: DiagnosisCertainty;
}`,signature:{properties:[{key:`diagnosisId`,value:{name:`string`,required:!0}},{key:`code`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`certainty`,value:{name:`union`,raw:`'working' | 'confirmed' | 'ruled-out'`,elements:[{name:`literal`,value:`'working'`},{name:`literal`,value:`'confirmed'`},{name:`literal`,value:`'ruled-out'`}],required:!0}}]},required:!1},description:`The clinical reason this order exists, copied from the encounter that
produced it. An order without one cannot be sent: a lab test is an act on
a patient, and the record has to say what it was for. Absent means the
doctor reached the cart without an assessment, not that the reason is
optional.`},{key:`decisions`,value:{name:`signature`,type:`object`,raw:`{
  collectBy?: CollectBy;
  /** Only meaningful when Kura collects. */
  drawSite?: DrawSite;
  payment?: DoctorPaymentRoute;
}`,signature:{properties:[{key:`collectBy`,value:{name:`union`,raw:`'self' | 'kura'`,elements:[{name:`literal`,value:`'self'`},{name:`literal`,value:`'kura'`}],required:!1}},{key:`drawSite`,value:{name:`union`,raw:`'kura-psc' | 'patient-home'`,elements:[{name:`literal`,value:`'kura-psc'`},{name:`literal`,value:`'patient-home'`}],required:!1},description:`Only meaningful when Kura collects.`},{key:`payment`,value:{name:`union`,raw:`'pay-now' | 'pay-later-kura'`,elements:[{name:`literal`,value:`'pay-now'`},{name:`literal`,value:`'pay-later-kura'`}],required:!1}}]},required:!0}},{key:`panel`,value:{name:`union`,raw:`'unset' | 'expanded' | 'summary'`,elements:[{name:`literal`,value:`'unset'`},{name:`literal`,value:`'expanded'`},{name:`literal`,value:`'summary'`}],required:!0}},{key:`attested`,value:{name:`boolean`,required:!0},description:`"I have collected $X via cash or KHQR" — required before pay-now advances.`},{key:`earnings`,value:{name:`signature`,type:`object`,raw:`{
  /** Basis points, 0–10000, from the pricing commission matrix. */
  commissionBp: number;
  /** Pre-derived earn amount in minor units for the current subtotal. */
  earnMinor: string;
}`,signature:{properties:[{key:`commissionBp`,value:{name:`number`,required:!0},description:`Basis points, 0–10000, from the pricing commission matrix.`},{key:`earnMinor`,value:{name:`string`,required:!0},description:`Pre-derived earn amount in minor units for the current subtotal.`}]},required:!1}},{key:`paymentLocked`,value:{name:`boolean`,required:!1},description:`Decisions freeze once money moved; edits continue in Booking.`},{key:`tubes`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  /** e.g. "Serum tube · 5 mL". */
  label: string;
  /** Physical stopper identity expressed through a Kura specimen token. */
  stopperColor: string;
  stopperLabel: string;
  tests: string[];
  scanned: boolean;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0},description:`e.g. "Serum tube · 5 mL".`},{key:`stopperColor`,value:{name:`string`,required:!0},description:`Physical stopper identity expressed through a Kura specimen token.`},{key:`stopperLabel`,value:{name:`string`,required:!0}},{key:`tests`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`scanned`,value:{name:`boolean`,required:!0}}]}}],raw:`OrderCartTube[]`,required:!1}},{key:`tubeMethod`,value:{name:`union`,raw:`'scan' | 'print'`,elements:[{name:`literal`,value:`'scan'`},{name:`literal`,value:`'print'`}],required:!1}}]}}]},{name:`intersection`,raw:`BaseOrderCartWorkflow & {
  role: 'receptionist';
  stage: 'order-review' | 'payment' | 'ready-to-check-in' | 'checked-in';
  origin: 'doctor-order' | 'on-behalf';
  prescriber?: OrderCartPrescriber;
  payerLabel?: string;
  payment: ReceptionPaymentSummary;
  /** Tender decision made in the decision card. */
  method?: ReceptionPaymentMethod;
  panel: DecisionPanelState;
  attested: boolean;
  permissions: {
    editClinicalItems: boolean;
    collectPayment: boolean;
    checkIn: boolean;
  };
}`,elements:[{name:`signature`,type:`object`,raw:`{
  role: OrderCartRole;
  actorName: string;
  access: 'allowed' | 'read-only' | 'denied';
  blockers: OrderCartBlocker[];
}`,signature:{properties:[{key:`role`,value:{name:`union`,raw:`'doctor' | 'receptionist'`,elements:[{name:`literal`,value:`'doctor'`},{name:`literal`,value:`'receptionist'`}],required:!0}},{key:`actorName`,value:{name:`string`,required:!0}},{key:`access`,value:{name:`union`,raw:`'allowed' | 'read-only' | 'denied'`,elements:[{name:`literal`,value:`'allowed'`},{name:`literal`,value:`'read-only'`},{name:`literal`,value:`'denied'`}],required:!0}},{key:`blockers`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  label: string;
  recovery?: string;
  actionLabel?: string;
  tone?: 'neutral' | 'warning' | 'danger';
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`recovery`,value:{name:`string`,required:!1}},{key:`actionLabel`,value:{name:`string`,required:!1}},{key:`tone`,value:{name:`union`,raw:`'neutral' | 'warning' | 'danger'`,elements:[{name:`literal`,value:`'neutral'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'danger'`}],required:!1}}]}}],raw:`OrderCartBlocker[]`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{
  role: 'receptionist';
  stage: 'order-review' | 'payment' | 'ready-to-check-in' | 'checked-in';
  origin: 'doctor-order' | 'on-behalf';
  prescriber?: OrderCartPrescriber;
  payerLabel?: string;
  payment: ReceptionPaymentSummary;
  /** Tender decision made in the decision card. */
  method?: ReceptionPaymentMethod;
  panel: DecisionPanelState;
  attested: boolean;
  permissions: {
    editClinicalItems: boolean;
    collectPayment: boolean;
    checkIn: boolean;
  };
}`,signature:{properties:[{key:`role`,value:{name:`literal`,value:`'receptionist'`,required:!0}},{key:`stage`,value:{name:`union`,raw:`'order-review' | 'payment' | 'ready-to-check-in' | 'checked-in'`,elements:[{name:`literal`,value:`'order-review'`},{name:`literal`,value:`'payment'`},{name:`literal`,value:`'ready-to-check-in'`},{name:`literal`,value:`'checked-in'`}],required:!0}},{key:`origin`,value:{name:`union`,raw:`'doctor-order' | 'on-behalf'`,elements:[{name:`literal`,value:`'doctor-order'`},{name:`literal`,value:`'on-behalf'`}],required:!0}},{key:`prescriber`,value:{name:`signature`,type:`object`,raw:`{
  name: string;
  status: 'verified' | 'missing' | 'expired';
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`'verified' | 'missing' | 'expired'`,elements:[{name:`literal`,value:`'verified'`},{name:`literal`,value:`'missing'`},{name:`literal`,value:`'expired'`}],required:!0}}]},required:!1}},{key:`payerLabel`,value:{name:`string`,required:!1}},{key:`payment`,value:{name:`signature`,type:`object`,raw:`{
  status: ReceptionPaymentStatus;
  label: string;
  detail?: string;
  receiptId?: string;
}`,signature:{properties:[{key:`status`,value:{name:`union`,raw:`| 'not-started'
| 'due'
| 'waiting-khqr'
| 'paid'
| 'deferred'
| 'no-charge'
| 'refunded'
| 'voided'`,elements:[{name:`literal`,value:`'not-started'`},{name:`literal`,value:`'due'`},{name:`literal`,value:`'waiting-khqr'`},{name:`literal`,value:`'paid'`},{name:`literal`,value:`'deferred'`},{name:`literal`,value:`'no-charge'`},{name:`literal`,value:`'refunded'`},{name:`literal`,value:`'voided'`}],required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`detail`,value:{name:`string`,required:!1}},{key:`receiptId`,value:{name:`string`,required:!1}}]},required:!0}},{key:`method`,value:{name:`union`,raw:`'cash' | 'khqr' | 'pay-later'`,elements:[{name:`literal`,value:`'cash'`},{name:`literal`,value:`'khqr'`},{name:`literal`,value:`'pay-later'`}],required:!1},description:`Tender decision made in the decision card.`},{key:`panel`,value:{name:`union`,raw:`'unset' | 'expanded' | 'summary'`,elements:[{name:`literal`,value:`'unset'`},{name:`literal`,value:`'expanded'`},{name:`literal`,value:`'summary'`}],required:!0}},{key:`attested`,value:{name:`boolean`,required:!0}},{key:`permissions`,value:{name:`signature`,type:`object`,raw:`{
  editClinicalItems: boolean;
  collectPayment: boolean;
  checkIn: boolean;
}`,signature:{properties:[{key:`editClinicalItems`,value:{name:`boolean`,required:!0}},{key:`collectPayment`,value:{name:`boolean`,required:!0}},{key:`checkIn`,value:{name:`boolean`,required:!0}}]},required:!0}}]}}]}]},description:``},suggestions:{required:!1,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  kind: CartSuggestionKind;
  title: string;
  detail?: string;
  /** Signed money effect, minor units: save (−) or add (+). */
  deltaMinor?: string;
  deltaDirection?: 'save' | 'add';
  actionLabel: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`| 'exact_match'
| 'upsell'
| 'redundancy'
| 'dependency_fill'`,elements:[{name:`literal`,value:`'exact_match'`},{name:`literal`,value:`'upsell'`},{name:`literal`,value:`'redundancy'`},{name:`literal`,value:`'dependency_fill'`}],required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`detail`,value:{name:`string`,required:!1}},{key:`deltaMinor`,value:{name:`string`,required:!1},description:`Signed money effect, minor units: save (−) or add (+).`},{key:`deltaDirection`,value:{name:`union`,raw:`'save' | 'add'`,elements:[{name:`literal`,value:`'save'`},{name:`literal`,value:`'add'`}],required:!1}},{key:`actionLabel`,value:{name:`string`,required:!0}}]}}],raw:`CartSuggestion[]`},description:`Engine verdicts, rendered in engine order below the items.`},onSuggestionAccept:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(suggestion: CartSuggestion) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  kind: CartSuggestionKind;
  title: string;
  detail?: string;
  /** Signed money effect, minor units: save (−) or add (+). */
  deltaMinor?: string;
  deltaDirection?: 'save' | 'add';
  actionLabel: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`| 'exact_match'
| 'upsell'
| 'redundancy'
| 'dependency_fill'`,elements:[{name:`literal`,value:`'exact_match'`},{name:`literal`,value:`'upsell'`},{name:`literal`,value:`'redundancy'`},{name:`literal`,value:`'dependency_fill'`}],required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`detail`,value:{name:`string`,required:!1}},{key:`deltaMinor`,value:{name:`string`,required:!1},description:`Signed money effect, minor units: save (−) or add (+).`},{key:`deltaDirection`,value:{name:`union`,raw:`'save' | 'add'`,elements:[{name:`literal`,value:`'save'`},{name:`literal`,value:`'add'`}],required:!1}},{key:`actionLabel`,value:{name:`string`,required:!0}}]}},name:`suggestion`}],return:{name:`void`}}},description:``},onSuggestionDismiss:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(suggestion: CartSuggestion) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  kind: CartSuggestionKind;
  title: string;
  detail?: string;
  /** Signed money effect, minor units: save (−) or add (+). */
  deltaMinor?: string;
  deltaDirection?: 'save' | 'add';
  actionLabel: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`| 'exact_match'
| 'upsell'
| 'redundancy'
| 'dependency_fill'`,elements:[{name:`literal`,value:`'exact_match'`},{name:`literal`,value:`'upsell'`},{name:`literal`,value:`'redundancy'`},{name:`literal`,value:`'dependency_fill'`}],required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`detail`,value:{name:`string`,required:!1}},{key:`deltaMinor`,value:{name:`string`,required:!1},description:`Signed money effect, minor units: save (−) or add (+).`},{key:`deltaDirection`,value:{name:`union`,raw:`'save' | 'add'`,elements:[{name:`literal`,value:`'save'`},{name:`literal`,value:`'add'`}],required:!1}},{key:`actionLabel`,value:{name:`string`,required:!0}}]}},name:`suggestion`}],return:{name:`void`}}},description:``},onRemoveItem:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(itemId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`itemId`}],return:{name:`void`}}},description:``},onClear:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onAddFirst:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRetryPricing:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onAcceptReprice:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onBlockerAction:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(blockerId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`blockerId`}],return:{name:`void`}}},description:``},onPrimaryAction:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onDecisionsChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(next: CollectionDecisions) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  collectBy?: CollectBy;
  /** Only meaningful when Kura collects. */
  drawSite?: DrawSite;
  payment?: DoctorPaymentRoute;
}`,signature:{properties:[{key:`collectBy`,value:{name:`union`,raw:`'self' | 'kura'`,elements:[{name:`literal`,value:`'self'`},{name:`literal`,value:`'kura'`}],required:!1}},{key:`drawSite`,value:{name:`union`,raw:`'kura-psc' | 'patient-home'`,elements:[{name:`literal`,value:`'kura-psc'`},{name:`literal`,value:`'patient-home'`}],required:!1},description:`Only meaningful when Kura collects.`},{key:`payment`,value:{name:`union`,raw:`'pay-now' | 'pay-later-kura'`,elements:[{name:`literal`,value:`'pay-now'`},{name:`literal`,value:`'pay-later-kura'`}],required:!1}}]}},name:`next`}],return:{name:`void`}}},description:`Decision card interactions.`},onPanelChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(state: 'unset' | 'expanded' | 'summary') => void`,signature:{arguments:[{type:{name:`union`,raw:`'unset' | 'expanded' | 'summary'`,elements:[{name:`literal`,value:`'unset'`},{name:`literal`,value:`'expanded'`},{name:`literal`,value:`'summary'`}]},name:`state`}],return:{name:`void`}}},description:``},onAttestChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(attested: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`attested`}],return:{name:`void`}}},description:``},onMethodChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(method: ReceptionPaymentMethod) => void`,signature:{arguments:[{type:{name:`union`,raw:`'cash' | 'khqr' | 'pay-later'`,elements:[{name:`literal`,value:`'cash'`},{name:`literal`,value:`'khqr'`},{name:`literal`,value:`'pay-later'`}]},name:`method`}],return:{name:`void`}}},description:`Receptionist tender choice.`},onTubeScan:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(tubeId: string, scanned: boolean) => void`,signature:{arguments:[{type:{name:`string`},name:`tubeId`},{type:{name:`boolean`},name:`scanned`}],return:{name:`void`}}},description:`Tube preparation (doctor self-draw).`},onTubeMethodChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(method: TubePrepMethod) => void`,signature:{arguments:[{type:{name:`union`,raw:`'scan' | 'print'`,elements:[{name:`literal`,value:`'scan'`},{name:`literal`,value:`'print'`}]},name:`method`}],return:{name:`void`}}},description:``},onBackToCart:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}}));export{jt as n,At as t};