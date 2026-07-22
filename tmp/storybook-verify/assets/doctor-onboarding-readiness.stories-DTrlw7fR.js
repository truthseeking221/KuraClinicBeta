import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{an as i,dn as a,in as o,nn as s,rn as c,sn as l,t as u,un as d}from"./ui-C9kmmzkH.js";import{i as ee,r as te,t as ne}from"./alert-l7nmjmGJ.js";import{t as re}from"./button-B6_zsN5-.js";import{a as f,n as ie,r as ae,t as oe}from"./collapsible-Cfc9M9oP.js";import{t as se}from"./app-shell-dOUH8yca.js";import{r as p,t as m}from"./readiness-data-D41RGqZh.js";import{t as ce}from"./shared-GnDiMTI0.js";import{n as le,t as ue}from"./logic-Ca9-ZOcC.js";function de(e){return e.session===`active`?e.phone===`missing_required`?`Verify the required phone before self-serve onboarding can finish.`:e.workspace===`missing`?`Create or join a clinic workspace first.`:e.workspace===`denied`?`This workspace is not accessible to the account.`:e.membership===`pending`?`Wait for the membership to become active.`:e.membership===`revoked`?`The workspace membership has been revoked.`:e.branch===`required`?`Choose an assigned branch before continuing.`:e.branch===`denied`?`The selected branch is outside the member scope.`:null:`Sign in again before clinic data is loaded.`}function fe(e){if(e.declaration===`unanswered`)return{id:`licence`,label:`Professional licence`,status:`current`,statusLabel:`Declaration needed`,detail:`Answer the medical-licence question. This does not assign a role or permission.`};if(e.declaration===`non_medical`)return{id:`licence`,label:`Professional licence`,status:`not_applicable`,statusLabel:`Not applicable`,detail:`Non-medical members are not prompted. They may act only within granted capabilities and delegated attribution.`};switch(e.licence){case`none`:return{id:`licence`,label:`Professional licence`,status:`current`,statusLabel:h.none,detail:`Submit one licence document through the verification pipeline.`};case`pending_review`:return{id:`licence`,label:`Professional licence`,status:`current`,statusLabel:h.pending_review,detail:`The immutable submission is awaiting a reviewer verdict. It is not live for attribution yet.`};case`rejected`:return{id:`licence`,label:`Professional licence`,status:`blocked`,statusLabel:h.rejected,detail:`Review the rejection reason and submit a corrected document. The rejected attempt remains in history.`};case`verified`:return{id:`licence`,label:`Professional licence`,status:`ready`,statusLabel:h.verified,detail:`The credential is live for clinic-order attribution. Scope and role gates still apply independently.`};case`expiring`:return{id:`licence`,label:`Professional licence`,status:`warning`,statusLabel:h.expiring,detail:`Attribution remains available, but renewal is due before the current licence lapses.`};case`in_grace`:return{id:`licence`,label:`Professional licence`,status:`warning`,statusLabel:h.in_grace,detail:`Attribution remains live during the grace period. Renew before the lapse deadline.`};case`lapsed`:return{id:`licence`,label:`Professional licence`,status:`blocked`,statusLabel:h.lapsed,detail:`New clinic orders cannot use this person for attribution. Existing placed episodes are not revoked retroactively.`}}}function pe(e){return[{id:`session`,label:`Authenticated session`,status:e.session===`active`?`ready`:`blocked`,statusLabel:e.session===`active`?`Active`:`Expired`,detail:e.session===`active`?`The clinic audience session is active.`:`No workspace data or mutation may load until the user signs in again.`},{id:`phone`,label:`Verified phone`,status:e.phone===`verified`?`ready`:e.phone===`exempt`?`not_applicable`:`blocked`,statusLabel:e.phone===`verified`?`Verified`:e.phone===`exempt`?`Invite exemption`:`Required`,detail:e.phone===`verified`?`The onboarding phone requirement is satisfied.`:e.phone===`exempt`?`Invited non-medical staff may remain phone-less while retaining another verified sign-in identifier.`:`A self-serve medical account cannot complete onboarding or submit a licence without a verified phone.`},{id:`workspace`,label:`Workspace context`,status:e.workspace===`active`?`ready`:`blocked`,statusLabel:e.workspace===`active`?`Active`:e.workspace===`missing`?`Missing`:`Access denied`,detail:e.workspace===`active`?`All reads and writes remain scoped to the selected clinic workspace.`:e.workspace===`missing`?`Create a cabinet or join an invited workspace before entering the clinic app.`:`Do not load workspace-scoped data; offer a safe workspace recovery path.`},{id:`membership`,label:`Workspace membership`,status:e.membership===`active`?`ready`:e.membership===`pending`?`current`:`blocked`,statusLabel:e.membership===`active`?`Active`:e.membership===`pending`?`Pending`:`Revoked`,detail:e.membership===`active`?`Membership is active; ownership remains separate from permission and professional status.`:e.membership===`pending`?`Membership is not active yet, so scoped clinic work remains unavailable.`:`The account must not retain cached access after membership revocation.`},{id:`branch`,label:`Branch scope`,status:e.branch===`active`?`ready`:e.branch===`not_required`?`not_applicable`:e.branch===`required`?`current`:`blocked`,statusLabel:e.branch===`active`?`Assigned`:e.branch===`not_required`?`Not required`:e.branch===`required`?`Choose branch`:`Outside scope`,detail:e.branch===`active`?`The active branch is inside the member assignment.`:e.branch===`not_required`?`This cabinet does not enable branch selection.`:e.branch===`required`?`Choose an assigned branch before loading branch-scoped data.`:`The selected branch is not authorized for this membership.`},{id:`capability`,label:`Order capability`,status:e.orderCapability===`granted`?`ready`:`blocked`,statusLabel:e.orderCapability===`granted`?`Granted`:`Missing`,detail:e.orderCapability===`granted`?`The actor may compose clinic orders. The attributed prescriber is validated separately at placement.`:`A role label alone never grants this action. Request the explicit capability from a workspace administrator.`},fe(e)]}function me(e){if(e.declaration===`unanswered`)return`Answer the medical-licence question before self-attribution can be evaluated.`;if(e.declaration===`non_medical`)return`A non-medical member cannot self-attribute. Select another live workspace prescriber.`;switch(e.licence){case`none`:return`Submit a professional licence and wait for approval before self-attribution.`;case`pending_review`:return`The licence is under review and is not live for attribution yet.`;case`rejected`:return`Submit a corrected licence after reviewing the rejection reason.`;case`lapsed`:return`Renew the lapsed licence before creating new self-attributed clinic orders.`;case`verified`:case`expiring`:case`in_grace`:return`The professional licence is live.`}}function he(e,t){let n=t===null,r=e.attributedPrescriber===`other_live_member`||e.attributedPrescriber===`self`&&le(e.licence),i=`The action is available and will be re-checked by the backend at placement.`,a=`available`,o=`Available`;n?e.orderCapability===`granted`?e.attributedPrescriber===`none`?(a=`blocked`,o=`Prescriber required`,i=`Every clinic order requires an explicitly selected workspace member with a live credential.`):r?e.banking===`self_action_required`?(a=`action_required`,o=`Financial action required`,i=`Resolve the exact doctor-banking order check, then re-run placement.`):e.banking===`delegated_action_required`&&(a=`action_required`,o=`Prescriber action required`,i=`The attributed prescriber must complete a private step before this order can continue. The delegate receives no financial details.`):(a=`blocked`,o=`Licence required`,i=me(e)):(a=`blocked`,o=`Permission required`,i=`The actor is missing the explicit clinic-order capability.`):(a=`blocked`,o=`Blocked`,i=t);let s;switch(e.banking){case`not_eligible`:s={id:`doctor_banking`,label:`Doctor banking`,state:`blocked`,stateLabel:`Not eligible`,detail:`Doctor banking belongs to a person with a live credential; it is not a workspace onboarding tier.`};break;case`optional_unlinked`:s={id:`doctor_banking`,label:`Doctor banking`,state:`optional`,stateLabel:`Auto-pay optional`,detail:`Linking auto-pay is optional. An unlinked eligible doctor keeps the same floor and may settle by KHQR when needed.`};break;case`linked`:s={id:`doctor_banking`,label:`Doctor banking`,state:`available`,stateLabel:`Auto-pay linked`,detail:`The personal mandate is linked. Order-time floor checks still run independently.`};break;case`self_action_required`:s={id:`doctor_banking`,label:`Doctor banking`,state:`action_required`,stateLabel:`Action required`,detail:`The doctor must settle or prepay the exact amount returned by the current order check.`};break;case`delegated_action_required`:s={id:`doctor_banking`,label:`Doctor banking`,state:`action_required`,stateLabel:`Prescriber action`,detail:`Only the attributed prescriber receives the private recovery instructions.`};break}return[{id:`catalog`,label:`Browse catalog`,state:n?`available`:`blocked`,stateLabel:n?`Available`:`Blocked`,detail:n?`Catalog access follows workspace and branch scope; it is not gated by licence state.`:t??`Workspace access is required.`},{id:`prices`,label:`View prices`,state:n?`available`:`blocked`,stateLabel:n?`Available`:`Blocked`,detail:n?`Prices are visible to branch members. The deleted EXPLORER/PRACTICE workspace mode does not hide them.`:t??`Workspace access is required.`},{id:`clinic_order`,label:`Place clinic order`,state:a,stateLabel:o,detail:i},s]}function ge(e){if(e.session!==`active`)return{kind:`sign_in`,label:`Sign in again`,detail:`Restore a clinic audience session.`};if(e.phone===`missing_required`)return{kind:`verify_phone`,label:`Verify phone`,detail:`Complete the mandatory phone gate.`};if(e.workspace!==`active`)return{kind:`create_workspace`,label:e.workspace===`missing`?`Create or join clinic`:`Choose another workspace`,detail:`Restore an accessible workspace context without loading protected data.`};if(e.membership!==`active`)return{kind:`restore_membership`,label:e.membership===`pending`?`View membership status`:`Contact workspace admin`,detail:`An active membership is required before scoped work begins.`};if(e.branch===`required`||e.branch===`denied`)return{kind:`choose_branch`,label:e.branch===`required`?`Choose branch`:`Choose an assigned branch`,detail:`Enter only a branch included in the active membership.`};if(e.declaration===`unanswered`)return{kind:`answer_declaration`,label:`Answer licence question`,detail:`Declare whether professional verification applies to this person.`};if(e.declaration===`medical`){if(e.licence===`none`)return{kind:`submit_licence`,label:`Verify medical licence`,detail:`Submit one supported document through the shared pipeline.`};if(e.licence===`pending_review`)return{kind:`view_submission`,label:`View licence status`,detail:`Review the immutable submission and its current verdict state.`};if(e.licence===`rejected`)return{kind:`replace_licence`,label:`Fix verification`,detail:`Read the reason and submit a corrected document.`};if(e.licence===`lapsed`)return{kind:`renew_licence`,label:`Renew licence`,detail:`Create a new submission before new self-attributed orders.`}}return e.orderCapability===`granted`?e.attributedPrescriber===`none`?{kind:`select_prescriber`,label:`Choose eligible prescriber`,detail:`Select a live workspace member when composing the order.`}:e.banking===`self_action_required`?{kind:`resolve_banking`,label:`Resolve banking check`,detail:`Complete the private exact-amount recovery for this order.`}:e.banking===`delegated_action_required`?{kind:`request_prescriber_action`,label:`Request prescriber action`,detail:`Notify the attributed prescriber without exposing private financial details.`}:e.licence===`expiring`||e.licence===`in_grace`?{kind:`renew_licence`,label:`Renew licence`,detail:`Keep attribution live beyond the current deadline.`}:{kind:`open_home`,label:`Open clinic home`,detail:`Continue into the scoped clinic workspace.`}:{kind:`request_capability`,label:`Request order access`,detail:`Ask a workspace administrator for the explicit capability.`}}function _e(e){let t=[];return e.declaration!==`medical`&&e.licence!==`none`&&t.push(`A professional credential exists without a medical declaration.`),e.attributedPrescriber===`self`&&e.declaration===`non_medical`&&t.push(`A non-medical member cannot be the attributed prescriber.`),t}function ve(e){let t=_e(e),n=de(e),r=pe(e),i=he(e,n),a=i.find(e=>e.id===`clinic_order`),o=i.find(e=>e.id===`catalog`),s=i.find(e=>e.id===`doctor_banking`),c=ge(e);if(t.length>0)return{status:`blocked`,statusLabel:`State unavailable`,title:`Readiness could not be verified`,description:`Conflicting authority facts fail closed. Refresh from the source services before offering a mutation.`,gates:r,capabilities:i,primaryAction:{kind:`refresh_status`,label:`Refresh setup`,detail:`Reload the latest clinic and professional details before continuing.`},canOpenCatalog:!1,canStartClinicOrder:!1,canOpenDoctorBanking:!1,invariantIssues:t};if(n)return{status:`blocked`,statusLabel:`Access blocked`,title:`Access setup is incomplete`,description:n,gates:r,capabilities:i,primaryAction:c,canOpenCatalog:!1,canStartClinicOrder:!1,canOpenDoctorBanking:!1,invariantIssues:[]};if(e.declaration===`medical`&&e.licence===`pending_review`){let t=e.attributedPrescriber===`other_live_member`;return{status:t?`ready`:`reviewing`,statusLabel:t?`Delegated ordering ready`:`Under review`,title:t?`Workspace access and delegated attribution are ready`:`Licence submission is under review`,description:t?`This member may act within granted capability using another live attributed prescriber; their own credential remains under review.`:`Catalog and prices remain available. New self-attributed clinic orders wait for a reviewer verdict.`,gates:r,capabilities:i,primaryAction:c,canOpenCatalog:o.state===`available`,canStartClinicOrder:a.state===`available`,canOpenDoctorBanking:s.state!==`blocked`,invariantIssues:[]}}if(e.banking===`self_action_required`||e.banking===`delegated_action_required`)return{status:`attention`,statusLabel:`Order action required`,title:`Professional access is ready; a financial action remains`,description:a.detail,gates:r,capabilities:i,primaryAction:c,canOpenCatalog:o.state===`available`,canStartClinicOrder:!1,canOpenDoctorBanking:e.banking===`self_action_required`,invariantIssues:[]};if(a.state!==`available`)return{status:`limited`,statusLabel:`Limited access`,title:e.attributedPrescriber===`none`?`Choose an eligible attributed prescriber`:`Workspace access is ready; clinic ordering is not`,description:a.detail,gates:r,capabilities:i,primaryAction:c,canOpenCatalog:o.state===`available`,canStartClinicOrder:!1,canOpenDoctorBanking:s.state!==`blocked`,invariantIssues:[]};let l=e.attributedPrescriber===`self`&&(e.licence===`expiring`||e.licence===`in_grace`);return{status:l?`attention`:`ready`,statusLabel:l?`Renewal due`:`Ready`,title:e.attributedPrescriber===`other_live_member`?`Ready for delegated clinic ordering`:l?`Ordering remains available; renew the licence`:`Ready for attributed clinic orders`,description:e.attributedPrescriber===`other_live_member`?`The actor and attributed prescriber remain separate. The selected prescriber owns professional and financial attribution.`:l?`The credential remains live during this lifecycle state, but renewal must complete before lapse.`:`Session, scope, capability and live professional attribution are all satisfied. The backend still revalidates at placement.`,gates:r,capabilities:i,primaryAction:c,canOpenCatalog:!0,canStartClinicOrder:!0,canOpenDoctorBanking:s.state!==`blocked`,invariantIssues:[]}}var h,ye=t((()=>{ue(),h={none:`Not submitted`,pending_review:`Under review`,rejected:`Action required`,verified:`Verified`,expiring:`Expiring`,in_grace:`In grace`,lapsed:`Lapsed`}})),be,xe,Se,Ce,we,Te,Ee,g,_,v,y,b,x,S,C,w,T,De=t((()=>{be=`_page_rup13_1`,xe=`_hero_rup13_9`,Se=`_sectionLabel_rup13_17`,Ce=`_contextLine_rup13_24`,we=`_stateCopy_rup13_41`,Te=`_pageTitle_rup13_48`,Ee=`_consequence_rup13_58`,g=`_primaryAction_rup13_65`,_=`_alertList_rup13_79`,v=`_section_rup13_17`,y=`_sectionHeading_rup13_92`,b=`_boundaryNote_rup13_107`,x=`_decisionList_rup13_114`,S=`_decisionRow_rup13_118`,C=`_details_rup13_128`,w=`_detailsContent_rup13_136`,T={page:be,hero:xe,sectionLabel:Se,contextLine:Ce,stateCopy:we,pageTitle:Te,consequence:Ee,primaryAction:g,alertList:_,section:v,sectionHeading:y,boundaryNote:b,decisionList:x,decisionRow:S,details:C,detailsContent:w}}));function Oe(e,t){return t.invariantIssues.length>0?{title:`We couldn’t verify this setup`,description:`Some clinic and professional details do not match. Refresh before continuing.`}:e.session===`active`?e.phone===`missing_required`?{title:`Verify your phone to continue`,description:`A verified phone is required to finish clinic setup.`}:e.workspace===`missing`?{title:`Join or create a clinic`,description:`Choose the clinic where you will work before continuing.`}:e.workspace===`denied`?{title:`Choose another clinic`,description:`You no longer have access to this clinic.`}:e.membership===`pending`?{title:`Your clinic access is pending`,description:`You can continue when your clinic membership becomes active.`}:e.membership===`revoked`?{title:`Your clinic access has ended`,description:`Contact a clinic administrator if you still need access.`}:e.branch===`required`?{title:`Choose a clinic branch`,description:`Select one of the branches assigned to you.`}:e.branch===`denied`?{title:`Choose an assigned branch`,description:`The selected branch is not included in your clinic access.`}:e.declaration===`medical`&&e.licence===`pending_review`?e.attributedPrescriber===`other_live_member`?{title:`Ready to work with another prescriber`,description:`You can place orders with an approved prescriber while your own licence is under review.`}:{title:`Your licence is under review`,description:`You can browse the catalog and view prices. Orders using your licence will wait for approval.`}:e.banking===`self_action_required`?{title:`Complete one payment step`,description:`Finish the requested payment step before placing this order.`}:e.banking===`delegated_action_required`?{title:`The prescriber needs to take action`,description:`The selected prescriber must complete a private payment step before this order continues.`}:e.orderCapability===`granted`?e.attributedPrescriber===`none`?{title:`Choose an eligible prescriber`,description:`Every clinic order must have an approved prescriber.`}:e.declaration===`unanswered`?{title:`Tell us about your professional status`,description:`Your answer determines whether medical licence verification applies to you.`}:e.declaration===`medical`&&e.licence===`none`?{title:`Complete your medical licence`,description:`You can browse the catalog and view prices now. Verify your licence before placing orders.`}:e.declaration===`medical`&&e.licence===`rejected`?{title:`Your licence needs attention`,description:`Review the reason, correct the document, and submit it again.`}:e.declaration===`medical`&&e.licence===`lapsed`?{title:`Renew your medical licence`,description:`A current licence is required before you can place new orders.`}:e.licence===`expiring`||e.licence===`in_grace`?{title:`Renew your licence soon`,description:`You can still place orders, but renew your licence before it lapses.`}:e.attributedPrescriber===`other_live_member`?{title:`Ready for clinic orders`,description:`You can place orders with the selected approved prescriber.`}:{title:`You’re ready to work`,description:`You can browse the catalog, view prices, and place clinic orders.`}:{title:`Ask for order access`,description:`Your clinic access is active, but you do not yet have permission to place orders.`}:{title:`Sign in to continue`,description:`Your clinic session has ended.`}}function ke(e){switch(e){case`sign_in`:return{label:`Sign in again`,detail:`Restore your clinic session.`};case`verify_phone`:return{label:`Verify phone`,detail:`Finish the required phone check.`};case`create_workspace`:return{label:`Choose a clinic`,detail:`Continue with a clinic you can access.`};case`restore_membership`:return{label:`View access status`,detail:`Check your clinic membership or contact an administrator.`};case`choose_branch`:return{label:`Choose an assigned branch`,detail:`Continue with a branch assigned to you.`};case`request_capability`:return{label:`Request order access`,detail:`Ask a clinic administrator for permission to place orders.`};case`answer_declaration`:return{label:`Answer licence question`,detail:`Tell us whether medical licence verification applies to you.`};case`submit_licence`:return{label:`Verify medical licence`,detail:`Submit one supported licence document.`};case`view_submission`:return{label:`View licence status`,detail:`Check the review status of your licence.`};case`replace_licence`:return{label:`Review and resubmit`,detail:`Read the review reason and submit a corrected document.`};case`renew_licence`:return{label:`Renew licence`,detail:`Submit a current licence to keep placing orders.`};case`select_prescriber`:return{label:`Choose prescriber`,detail:`Select an approved prescriber for this order.`};case`resolve_banking`:return{label:`Complete payment step`,detail:`Open the private payment instructions for this order.`};case`request_prescriber_action`:return{label:`Notify prescriber`,detail:`Ask the prescriber to complete their private payment step.`};case`refresh_status`:return{label:`Refresh setup`,detail:`Reload the latest clinic and professional details.`};case`open_home`:return{label:`Open clinic home`,detail:`Continue to your clinic workspace.`}}}function Ae(e,t){if(!(t.status===`ready`||t.status===`not_applicable`))switch(t.id){case`session`:return`Sign in again to continue.`;case`phone`:return`Verify your phone to finish clinic setup.`;case`workspace`:return e.workspace===`missing`?`Create or join a clinic before continuing.`:`Choose a clinic you can access.`;case`membership`:return e.membership===`pending`?`Wait for your clinic membership to become active.`:`Contact a clinic administrator if you still need access.`;case`branch`:return`Choose a branch assigned to you.`;case`capability`:return`Ask a clinic administrator for order access.`;case`licence`:if(e.declaration===`unanswered`)return`Tell us whether you hold a medical licence.`;switch(e.licence){case`none`:return`Submit your licence when you are ready.`;case`pending_review`:return`Kura is reviewing your submission.`;case`rejected`:return`Review the reason and submit a corrected document.`;case`expiring`:case`in_grace`:return`Renew it before it lapses.`;case`lapsed`:return`Renew your licence before placing new orders.`;case`verified`:return}}}function je(e,t){if(!(t.state===`available`||t.state===`optional`))return t.id===`catalog`||t.id===`prices`?`Available after clinic access is restored.`:t.id===`doctor_banking`?e.banking===`delegated_action_required`?`The prescriber receives the private instructions.`:`Complete the private payment step for this order.`:e.orderCapability===`granted`?e.attributedPrescriber===`none`?`Choose an approved prescriber for the order.`:e.banking===`self_action_required`?`Complete the requested payment step.`:e.banking===`delegated_action_required`?`The selected prescriber needs to take action.`:`A current medical licence is required.`:`Ask a clinic administrator for order access.`}function Me(e){return e.state===`action_required`?`Action needed`:e.stateLabel}function Ne({gate:e,snapshot:t}){let n=Ae(t,e);return(0,D.jsxs)(s,{className:T.decisionRow,size:`sm`,variant:`default`,children:[(0,D.jsxs)(o,{children:[(0,D.jsx)(a,{children:e.label}),n?(0,D.jsx)(i,{children:n}):null]}),(0,D.jsx)(c,{children:(0,D.jsx)(f,{size:`sm`,variant:k[e.status],children:e.statusLabel})})]})}function Pe({capability:e,snapshot:t}){let n=je(t,e);return(0,D.jsxs)(s,{className:T.decisionRow,size:`sm`,variant:`default`,children:[(0,D.jsxs)(o,{children:[(0,D.jsx)(a,{children:e.label}),n?(0,D.jsx)(i,{children:n}):null]}),(0,D.jsx)(c,{children:(0,D.jsx)(f,{size:`sm`,variant:A[e.state],children:Me(e)})})]})}function E({actorName:e,branchName:t,onPrimaryAction:n,snapshot:r,workspaceName:i}){let a=ve(r),o=(0,O.useId)(),s=(0,O.useId)(),c=Oe(r,a),u=ke(a.primaryAction.kind),se=a.status===`ready`?`success`:a.status===`reviewing`?`info`:a.status===`blocked`?`danger`:`warning`,p=a.capabilities.filter(e=>e.id!==`doctor_banking`||e.state===`action_required`),m=a.invariantIssues.map(e=>e.includes(`medical declaration`)?`The licence record does not match the professional declaration.`:`The selected prescriber does not match the member’s professional status.`);return(0,D.jsxs)(`section`,{"aria-labelledby":o,className:T.page,"data-slot":`doctor-onboarding-readiness`,children:[(0,D.jsxs)(`header`,{className:T.hero,children:[(0,D.jsx)(`p`,{className:T.sectionLabel,children:`Clinic setup`}),(0,D.jsxs)(`div`,{className:T.contextLine,children:[(0,D.jsx)(f,{size:`md`,variant:se,children:a.statusLabel}),(0,D.jsxs)(`p`,{children:[e,` · `,i,t?` · ${t}`:``]})]}),(0,D.jsxs)(`div`,{className:T.stateCopy,children:[(0,D.jsx)(`h1`,{className:T.pageTitle,id:o,children:c.title}),(0,D.jsx)(`p`,{className:T.consequence,children:c.description})]}),(0,D.jsxs)(`div`,{className:T.primaryAction,children:[(0,D.jsx)(re,{disabled:!n,fullWidth:!0,onClick:()=>n?.(a.primaryAction.kind),children:u.label}),(0,D.jsx)(`p`,{children:u.detail})]})]}),m.length>0?(0,D.jsxs)(ne,{tone:`danger`,children:[(0,D.jsx)(ee,{children:`Setup details need to be refreshed`}),(0,D.jsx)(te,{children:(0,D.jsx)(`ul`,{className:T.alertList,children:m.map(e=>(0,D.jsx)(`li`,{children:e},e))})})]}):null,(0,D.jsxs)(`section`,{"aria-labelledby":s,className:T.section,children:[(0,D.jsxs)(`div`,{className:T.sectionHeading,children:[(0,D.jsx)(`h2`,{id:s,children:`Current access`}),(0,D.jsx)(`p`,{children:`What you can do right now.`})]}),(0,D.jsx)(l,{"aria-label":`Current access`,className:T.decisionList,role:`list`,children:p.map((e,t)=>(0,D.jsxs)(`div`,{role:`listitem`,children:[t>0?(0,D.jsx)(d,{}):null,(0,D.jsx)(Pe,{capability:e,snapshot:r})]},e.id))}),(0,D.jsx)(`p`,{className:T.boundaryNote,children:`Kura checks access again when you place an order.`})]}),(0,D.jsxs)(oe,{className:T.details,children:[(0,D.jsxs)(ae,{children:[`Setup details (`,a.gates.length,` checks)`]}),(0,D.jsx)(ie,{className:T.detailsContent,children:(0,D.jsx)(l,{"aria-label":`Clinic setup details`,role:`list`,children:a.gates.map((e,t)=>(0,D.jsxs)(`div`,{role:`listitem`,children:[t>0?(0,D.jsx)(d,{}):null,(0,D.jsx)(Ne,{gate:e,snapshot:r})]},e.id))})})]})]})}var D,O,k,A,Fe=t((()=>{D=r(),O=e(n()),u(),ye(),De(),k={ready:`success`,current:`info`,warning:`warning`,blocked:`danger`,not_applicable:`neutral`},A={available:`success`,optional:`neutral`,blocked:`danger`,action_required:`warning`},E.__docgenInfo={description:`A source-backed onboarding checkpoint for clinic doctors.

The page presents one safe next action while retaining each authorization
fact as an independent detail. Server checks remain authoritative.`,methods:[],displayName:`DoctorOnboardingReadiness`,props:{actorName:{required:!0,tsType:{name:`string`},description:``},workspaceName:{required:!0,tsType:{name:`string`},description:``},branchName:{required:!1,tsType:{name:`string`},description:``},snapshot:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  session: SessionGateState;
  phone: PhoneGateState;
  workspace: WorkspaceGateState;
  membership: MembershipGateState;
  branch: BranchGateState;
  orderCapability: OrderCapabilityState;
  declaration: MedicalDeclarationState;
  licence: LicenceState;
  attributedPrescriber: AttributedPrescriberState;
  banking: DoctorBankingState;
}`,signature:{properties:[{key:`session`,value:{name:`union`,raw:`'active' | 'expired'`,elements:[{name:`literal`,value:`'active'`},{name:`literal`,value:`'expired'`}],required:!0}},{key:`phone`,value:{name:`union`,raw:`'verified' | 'missing_required' | 'exempt'`,elements:[{name:`literal`,value:`'verified'`},{name:`literal`,value:`'missing_required'`},{name:`literal`,value:`'exempt'`}],required:!0}},{key:`workspace`,value:{name:`union`,raw:`'active' | 'missing' | 'denied'`,elements:[{name:`literal`,value:`'active'`},{name:`literal`,value:`'missing'`},{name:`literal`,value:`'denied'`}],required:!0}},{key:`membership`,value:{name:`union`,raw:`'active' | 'pending' | 'revoked'`,elements:[{name:`literal`,value:`'active'`},{name:`literal`,value:`'pending'`},{name:`literal`,value:`'revoked'`}],required:!0}},{key:`branch`,value:{name:`union`,raw:`'active' | 'not_required' | 'required' | 'denied'`,elements:[{name:`literal`,value:`'active'`},{name:`literal`,value:`'not_required'`},{name:`literal`,value:`'required'`},{name:`literal`,value:`'denied'`}],required:!0}},{key:`orderCapability`,value:{name:`union`,raw:`'granted' | 'missing'`,elements:[{name:`literal`,value:`'granted'`},{name:`literal`,value:`'missing'`}],required:!0}},{key:`declaration`,value:{name:`union`,raw:`'medical' | 'non_medical' | 'unanswered'`,elements:[{name:`literal`,value:`'medical'`},{name:`literal`,value:`'non_medical'`},{name:`literal`,value:`'unanswered'`}],required:!0}},{key:`licence`,value:{name:`union`,raw:`| 'none'
| 'pending_review'
| 'rejected'
| 'verified'
| 'expiring'
| 'in_grace'
| 'lapsed'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'pending_review'`},{name:`literal`,value:`'rejected'`},{name:`literal`,value:`'verified'`},{name:`literal`,value:`'expiring'`},{name:`literal`,value:`'in_grace'`},{name:`literal`,value:`'lapsed'`}],required:!0}},{key:`attributedPrescriber`,value:{name:`union`,raw:`'self' | 'other_live_member' | 'none'`,elements:[{name:`literal`,value:`'self'`},{name:`literal`,value:`'other_live_member'`},{name:`literal`,value:`'none'`}],required:!0}},{key:`banking`,value:{name:`union`,raw:`| 'not_eligible'
| 'optional_unlinked'
| 'linked'
| 'self_action_required'
| 'delegated_action_required'`,elements:[{name:`literal`,value:`'not_eligible'`},{name:`literal`,value:`'optional_unlinked'`},{name:`literal`,value:`'linked'`},{name:`literal`,value:`'self_action_required'`},{name:`literal`,value:`'delegated_action_required'`}],required:!0}}]}},description:``},onPrimaryAction:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(action: OnboardingActionKind) => void`,signature:{arguments:[{type:{name:`union`,raw:`| 'sign_in'
| 'verify_phone'
| 'create_workspace'
| 'restore_membership'
| 'choose_branch'
| 'request_capability'
| 'answer_declaration'
| 'submit_licence'
| 'view_submission'
| 'replace_licence'
| 'renew_licence'
| 'select_prescriber'
| 'resolve_banking'
| 'request_prescriber_action'
| 'refresh_status'
| 'open_home'`,elements:[{name:`literal`,value:`'sign_in'`},{name:`literal`,value:`'verify_phone'`},{name:`literal`,value:`'create_workspace'`},{name:`literal`,value:`'restore_membership'`},{name:`literal`,value:`'choose_branch'`},{name:`literal`,value:`'request_capability'`},{name:`literal`,value:`'answer_declaration'`},{name:`literal`,value:`'submit_licence'`},{name:`literal`,value:`'view_submission'`},{name:`literal`,value:`'replace_licence'`},{name:`literal`,value:`'renew_licence'`},{name:`literal`,value:`'select_prescriber'`},{name:`literal`,value:`'resolve_banking'`},{name:`literal`,value:`'request_prescriber_action'`},{name:`literal`,value:`'refresh_status'`},{name:`literal`,value:`'open_home'`}]},name:`action`}],return:{name:`void`}}},description:``}}}}));function j(e={}){return{...I,...e}}function Ie(e){return(0,M.jsx)(se,{activeKey:`home`,availableModes:[`clinical`],mode:`clinical`,onNavigate:()=>void 0,user:{name:e.actorName,email:`dara@mekong.clinic`,licenceVerified:le(e.snapshot.licence)},workspace:{id:`ws-mekong`,name:e.workspaceName},children:(0,M.jsx)(E,{...e})})}var M,N,Le,P,F,I,Re,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,ze;t((()=>{M=r(),p(),ce(),ue(),Fe(),{expect:N,fn:Le,userEvent:P,within:F}=__STORYBOOK_MODULE_TEST__,I={session:`active`,phone:`verified`,workspace:`active`,membership:`active`,branch:`not_required`,orderCapability:`granted`,declaration:`medical`,licence:`none`,attributedPrescriber:`self`,banking:`not_eligible`},Re={title:`Clinic/Flows/Doctor Onboarding Readiness`,component:E,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:{readiness:m.flows,contract:{status:`source-backed-design-target`,backendMapping:`direct-with-explicit-ui-projection`,backendRef:`Kura-med/kura-platform@8b5772caefd1aaace2825f481ebca766894eca2a`,consulted:[`docs/design/onboarding-auth/auth-onboarding-product-spec.md`,`docs/design/doctor-auth-licence/kyd-grill-decision-log.md`,`docs/adr/ADR-0055-kyd-licence-verification-v1-scope.md`,`libs/contracts/src/lib/licence.ts`,`apps/services/order-ms/src/app/order/order.service.ts`,`docs/design/doctor-banking/aof-product-spec.md`],note:`The source repository is private. These stories mirror current contract states and enforcement seams; they do not claim backend delivery inside this local Storybook workspace.`},intake:{decision:`FEATURE-OWN`,owner:`src/features/auth`,evidence:`Extends the existing Door → Wizard → Workspace Gate journey with a source-backed onboarding checkpoint. Composes canonical AppShell, Alert, Collapsible, Item, Badge and Button only.`,exclusions:[`No EXPLORER/PRACTICE workspace mode or T0/T1/T2 authorization tier.`,`No invented needs-changes credential state; corrected submissions follow the canonical rejected → new pending submission loop.`,`No legal-document, e-signature or payout promise beyond current source contracts.`]},flow:{pages:[`Clinic/Auth/Door`,`Clinic/Auth/Onboarding Wizard`,`Clinic/Auth/Workspace Gate`,`Clinic/Flows/Doctor Onboarding Readiness`,`My profile/Licence`,`Clinic/Clinical/Home`],terminal:`Scoped clinic access with an explicit live prescriber; financial setup remains an independent axis.`},journeys:[`clinic-doctor-first-sign-in`,`clinic-professional-licence-review`,`clinic-attributed-order-readiness`,`clinic-delegated-prescriber-readiness`],composes:[`AppShell`,`Alert`,`Collapsible`,`Item`,`Badge`,`Button`],responsive:{classification:[`FLUID`,`STACKING`,`TRANSFORMING`],minimumWidth:320}},docs:{description:{component:`Source-backed doctor-onboarding checkpoint with one safe next action. Session, phone, workspace, membership, branch, order permission, professional credential, prescriber and doctor banking remain independent; server checks stay authoritative.`}}},args:{actorName:`Dr. Dara Phan`,workspaceName:`Dara Phan's cabinet`,snapshot:I,onPrimaryAction:Le()},render:e=>(0,M.jsx)(Ie,{...e})},L={play:async({canvasElement:e})=>{let t=F(e);await N(t.getByRole(`heading`,{name:`Complete your medical licence`})).toBeVisible(),await N(t.getByText(`Browse catalog`,{selector:`[data-slot="item-title"]`}).closest(`[data-slot="item"]`)).toHaveTextContent(`Available`),await N(t.getByText(`Place clinic order`,{selector:`[data-slot="item-title"]`}).closest(`[data-slot="item"]`)).toHaveTextContent(`Licence required`),await N(t.getByRole(`button`,{name:`Verify medical licence`})).toBeVisible()}},R={args:{snapshot:j({licence:`pending_review`})},play:async({canvasElement:e})=>{let t=F(e);await N(t.getByRole(`heading`,{name:`Your licence is under review`})).toBeVisible(),await N(t.getByRole(`button`,{name:`View licence status`})).toBeVisible(),await N(t.queryByRole(`button`,{name:`Start clinic order`})).not.toBeInTheDocument()}},z={args:{snapshot:j({licence:`rejected`})},play:async({canvasElement:e})=>{let t=F(e);await N(t.getByRole(`heading`,{name:`Your licence needs attention`})).toBeVisible(),await N(t.getByRole(`button`,{name:`Review and resubmit`})).toBeVisible(),await P.click(t.getByRole(`button`,{name:`Setup details (7 checks)`})),await N(t.getByText(`Review the reason and submit a corrected document.`)).toBeVisible()}},B={args:{snapshot:j({licence:`verified`,banking:`optional_unlinked`})},play:async({canvasElement:e,args:t})=>{let n=F(e);await N(n.getByRole(`heading`,{name:`You’re ready to work`})).toBeVisible();let r=n.getByRole(`button`,{name:`Open clinic home`});await N(r).toBeEnabled(),await P.click(r),await N(t.onPrimaryAction).toHaveBeenCalledWith(`open_home`),await N(n.queryByText(`Doctor banking`)).not.toBeInTheDocument()}},V={args:{snapshot:j({licence:`expiring`,banking:`optional_unlinked`})},play:async({canvasElement:e})=>{let t=F(e);await N(t.getByRole(`heading`,{name:`Renew your licence soon`})).toBeVisible(),await N(t.getByText(`Place clinic order`,{selector:`[data-slot="item-title"]`}).closest(`[data-slot="item"]`)).toHaveTextContent(`Available`),await N(t.getByRole(`button`,{name:`Renew licence`})).toBeVisible()}},H={args:{snapshot:j({licence:`in_grace`,banking:`optional_unlinked`})},play:async({canvasElement:e})=>{let t=F(e);await N(t.getByRole(`heading`,{name:`Renew your licence soon`})).toBeVisible(),await N(t.getByText(`Place clinic order`,{selector:`[data-slot="item-title"]`}).closest(`[data-slot="item"]`)).toHaveTextContent(`Available`)}},U={args:{snapshot:j({licence:`lapsed`})},play:async({canvasElement:e})=>{let t=F(e);await N(t.getByRole(`heading`,{name:`Renew your medical licence`})).toBeVisible(),await N(t.getByText(`Place clinic order`,{selector:`[data-slot="item-title"]`}).closest(`[data-slot="item"]`)).toHaveTextContent(`Licence required`),await N(t.getByRole(`button`,{name:`Renew licence`})).toBeVisible()}},W={args:{actorName:`Srey Neang`,branchName:`BKK1 Branch`,snapshot:j({branch:`active`,licence:`pending_review`,attributedPrescriber:`other_live_member`,banking:`not_eligible`})},play:async({canvasElement:e})=>{let t=F(e);await N(t.getByRole(`heading`,{name:`Ready to work with another prescriber`})).toBeVisible(),await N(t.getByText(`Place clinic order`,{selector:`[data-slot="item-title"]`}).closest(`[data-slot="item"]`)).toHaveTextContent(`Available`),await N(t.getByRole(`button`,{name:`View licence status`})).toBeVisible()}},G={args:{snapshot:j({licence:`verified`,orderCapability:`missing`,banking:`optional_unlinked`})},play:async({canvasElement:e})=>{let t=F(e);await N(t.getByRole(`heading`,{name:`Ask for order access`})).toBeVisible(),await N(t.getByRole(`button`,{name:`Request order access`})).toBeVisible(),await N(t.getByText(`Place clinic order`,{selector:`[data-slot="item-title"]`}).closest(`[data-slot="item"]`)).toHaveTextContent(`Permission required`)}},K={args:{branchName:`Toul Kork Branch`,snapshot:j({licence:`verified`,branch:`denied`,banking:`optional_unlinked`})},play:async({canvasElement:e})=>{let t=F(e);await N(t.getByRole(`heading`,{name:`Choose an assigned branch`})).toBeVisible(),await N(t.getByRole(`button`,{name:`Choose an assigned branch`})).toBeVisible(),await N(t.getByText(`Browse catalog`,{selector:`[data-slot="item-title"]`}).closest(`[data-slot="item"]`)).toHaveTextContent(`Blocked`)}},q={args:{snapshot:j({licence:`verified`,banking:`self_action_required`})},play:async({canvasElement:e})=>{let t=F(e);await N(t.getByRole(`heading`,{name:`Complete one payment step`})).toBeVisible(),await N(t.getByRole(`button`,{name:`Complete payment step`})).toBeVisible(),await N(t.getByText(`Doctor banking`,{selector:`[data-slot="item-title"]`}).closest(`[data-slot="item"]`)).toHaveTextContent(`Action needed`)}},J={args:{actorName:`Srey Neang`,branchName:`BKK1 Branch`,snapshot:j({declaration:`non_medical`,licence:`none`,branch:`active`,attributedPrescriber:`other_live_member`,banking:`delegated_action_required`})},play:async({canvasElement:e})=>{let t=F(e);await N(t.getByRole(`button`,{name:`Notify prescriber`})).toBeVisible(),await N(t.queryByRole(`button`,{name:/banking/i})).not.toBeInTheDocument(),await N(t.queryByText(/exact balance|masked account|mandate/i)).not.toBeInTheDocument()}},Y={args:{snapshot:j({declaration:`non_medical`,licence:`verified`,banking:`linked`})},play:async({canvasElement:e,args:t})=>{let n=F(e);await N(n.getByText(`Setup details need to be refreshed`)).toBeVisible();let r=n.getByRole(`button`,{name:`Refresh setup`});await P.click(r),await N(t.onPrimaryAction).toHaveBeenCalledWith(`refresh_status`),await N(n.queryByRole(`button`,{name:`Open clinic home`})).not.toBeInTheDocument()}},X={args:{snapshot:j({licence:`pending_review`})},parameters:{viewport:{defaultViewport:`kura320`}},play:async({canvasElement:e})=>{let t=F(e);await N(t.getByRole(`button`,{name:`View licence status`})).toBeVisible(),await N(e.ownerDocument.documentElement.scrollWidth).toBeLessThanOrEqual(e.ownerDocument.documentElement.clientWidth)}},Z={args:{snapshot:j({licence:`verified`,banking:`optional_unlinked`})},parameters:{viewport:{defaultViewport:`kura320`}},play:async({canvasElement:e})=>{let t=F(e);await N(t.getByRole(`button`,{name:`Open clinic home`})).toBeVisible()}},Q={args:{snapshot:j({licence:`rejected`})},parameters:{viewport:{defaultViewport:`kura320`}},play:async({canvasElement:e})=>{let t=F(e);await N(t.getByRole(`button`,{name:`Review and resubmit`})).toBeVisible()}},$={args:{actorName:`Dr. Sokha Vannak Chansopheakmony`,workspaceName:`Mekong International Family Medicine and Community Care Centre`,branchName:`Preah Norodom Boulevard Specialist Clinic`,snapshot:j({licence:`pending_review`,branch:`active`})},parameters:{viewport:{defaultViewport:`kura320`}},play:async({canvasElement:e})=>{let t=F(e);await N(t.getByText(/Preah Norodom Boulevard Specialist Clinic/i)).toBeVisible(),await N(e.ownerDocument.documentElement.scrollWidth).toBeLessThanOrEqual(e.ownerDocument.documentElement.clientWidth)}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Complete your medical licence'
    })).toBeVisible();
    await expect(canvas.getByText('Browse catalog', {
      selector: '[data-slot="item-title"]'
    }).closest('[data-slot="item"]')).toHaveTextContent('Available');
    await expect(canvas.getByText('Place clinic order', {
      selector: '[data-slot="item-title"]'
    }).closest('[data-slot="item"]')).toHaveTextContent('Licence required');
    await expect(canvas.getByRole('button', {
      name: 'Verify medical licence'
    })).toBeVisible();
  }
}`,...L.parameters?.docs?.source},description:{story:`A new owner may use the clinic while the professional licence is still required for attribution.`,...L.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    snapshot: snapshot({
      licence: 'pending_review'
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Your licence is under review'
    })).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'View licence status'
    })).toBeVisible();
    await expect(canvas.queryByRole('button', {
      name: 'Start clinic order'
    })).not.toBeInTheDocument();
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    snapshot: snapshot({
      licence: 'rejected'
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Your licence needs attention'
    })).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Review and resubmit'
    })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Setup details (7 checks)'
    }));
    await expect(canvas.getByText('Review the reason and submit a corrected document.')).toBeVisible();
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    snapshot: snapshot({
      licence: 'verified',
      banking: 'optional_unlinked'
    })
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'You’re ready to work'
    })).toBeVisible();
    const primaryAction = canvas.getByRole('button', {
      name: 'Open clinic home'
    });
    await expect(primaryAction).toBeEnabled();
    await userEvent.click(primaryAction);
    await expect(args.onPrimaryAction).toHaveBeenCalledWith('open_home');
    await expect(canvas.queryByText('Doctor banking')).not.toBeInTheDocument();
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    snapshot: snapshot({
      licence: 'expiring',
      banking: 'optional_unlinked'
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Renew your licence soon'
    })).toBeVisible();
    await expect(canvas.getByText('Place clinic order', {
      selector: '[data-slot="item-title"]'
    }).closest('[data-slot="item"]')).toHaveTextContent('Available');
    await expect(canvas.getByRole('button', {
      name: 'Renew licence'
    })).toBeVisible();
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    snapshot: snapshot({
      licence: 'in_grace',
      banking: 'optional_unlinked'
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Renew your licence soon'
    })).toBeVisible();
    await expect(canvas.getByText('Place clinic order', {
      selector: '[data-slot="item-title"]'
    }).closest('[data-slot="item"]')).toHaveTextContent('Available');
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    snapshot: snapshot({
      licence: 'lapsed'
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Renew your medical licence'
    })).toBeVisible();
    await expect(canvas.getByText('Place clinic order', {
      selector: '[data-slot="item-title"]'
    }).closest('[data-slot="item"]')).toHaveTextContent('Licence required');
    await expect(canvas.getByRole('button', {
      name: 'Renew licence'
    })).toBeVisible();
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    actorName: 'Srey Neang',
    branchName: 'BKK1 Branch',
    snapshot: snapshot({
      branch: 'active',
      licence: 'pending_review',
      attributedPrescriber: 'other_live_member',
      banking: 'not_eligible'
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Ready to work with another prescriber'
    })).toBeVisible();
    await expect(canvas.getByText('Place clinic order', {
      selector: '[data-slot="item-title"]'
    }).closest('[data-slot="item"]')).toHaveTextContent('Available');
    await expect(canvas.getByRole('button', {
      name: 'View licence status'
    })).toBeVisible();
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    snapshot: snapshot({
      licence: 'verified',
      orderCapability: 'missing',
      banking: 'optional_unlinked'
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Ask for order access'
    })).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Request order access'
    })).toBeVisible();
    await expect(canvas.getByText('Place clinic order', {
      selector: '[data-slot="item-title"]'
    }).closest('[data-slot="item"]')).toHaveTextContent('Permission required');
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    branchName: 'Toul Kork Branch',
    snapshot: snapshot({
      licence: 'verified',
      branch: 'denied',
      banking: 'optional_unlinked'
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Choose an assigned branch'
    })).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Choose an assigned branch'
    })).toBeVisible();
    await expect(canvas.getByText('Browse catalog', {
      selector: '[data-slot="item-title"]'
    }).closest('[data-slot="item"]')).toHaveTextContent('Blocked');
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    snapshot: snapshot({
      licence: 'verified',
      banking: 'self_action_required'
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Complete one payment step'
    })).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Complete payment step'
    })).toBeVisible();
    await expect(canvas.getByText('Doctor banking', {
      selector: '[data-slot="item-title"]'
    }).closest('[data-slot="item"]')).toHaveTextContent('Action needed');
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    actorName: 'Srey Neang',
    branchName: 'BKK1 Branch',
    snapshot: snapshot({
      declaration: 'non_medical',
      licence: 'none',
      branch: 'active',
      attributedPrescriber: 'other_live_member',
      banking: 'delegated_action_required'
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Notify prescriber'
    })).toBeVisible();
    await expect(canvas.queryByRole('button', {
      name: /banking/i
    })).not.toBeInTheDocument();
    await expect(canvas.queryByText(/exact balance|masked account|mandate/i)).not.toBeInTheDocument();
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    snapshot: snapshot({
      declaration: 'non_medical',
      licence: 'verified',
      banking: 'linked'
    })
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Setup details need to be refreshed')).toBeVisible();
    const refresh = canvas.getByRole('button', {
      name: 'Refresh setup'
    });
    await userEvent.click(refresh);
    await expect(args.onPrimaryAction).toHaveBeenCalledWith('refresh_status');
    await expect(canvas.queryByRole('button', {
      name: 'Open clinic home'
    })).not.toBeInTheDocument();
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    snapshot: snapshot({
      licence: 'pending_review'
    })
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'View licence status'
    })).toBeVisible();
    await expect(canvasElement.ownerDocument.documentElement.scrollWidth).toBeLessThanOrEqual(canvasElement.ownerDocument.documentElement.clientWidth);
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    snapshot: snapshot({
      licence: 'verified',
      banking: 'optional_unlinked'
    })
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Open clinic home'
    })).toBeVisible();
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    snapshot: snapshot({
      licence: 'rejected'
    })
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Review and resubmit'
    })).toBeVisible();
  }
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    actorName: 'Dr. Sokha Vannak Chansopheakmony',
    workspaceName: 'Mekong International Family Medicine and Community Care Centre',
    branchName: 'Preah Norodom Boulevard Specialist Clinic',
    snapshot: snapshot({
      licence: 'pending_review',
      branch: 'active'
    })
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Preah Norodom Boulevard Specialist Clinic/i)).toBeVisible();
    await expect(canvasElement.ownerDocument.documentElement.scrollWidth).toBeLessThanOrEqual(canvasElement.ownerDocument.documentElement.clientWidth);
  }
}`,...$.parameters?.docs?.source}}},ze=[`NewOwnerNeedsLicence`,`LicenceUnderReview`,`RejectedWithRecovery`,`VerifiedReady`,`ExpiringStillLive`,`GracePeriodStillLive`,`LapsedBlocksOnlyNewOrders`,`DelegatedOrderingWhileOwnLicenceReviews`,`MissingOrderCapability`,`BranchScopeBlocked`,`BankingActionIsNotAnOnboardingTier`,`DelegatedBankingPrivacy`,`ConflictingFactsFailClosed`,`Mobile320`,`MobileReady`,`MobileRejectedRecovery`,`LongClinicContextMobile`]}))();export{q as BankingActionIsNotAnOnboardingTier,K as BranchScopeBlocked,Y as ConflictingFactsFailClosed,J as DelegatedBankingPrivacy,W as DelegatedOrderingWhileOwnLicenceReviews,V as ExpiringStillLive,H as GracePeriodStillLive,U as LapsedBlocksOnlyNewOrders,R as LicenceUnderReview,$ as LongClinicContextMobile,G as MissingOrderCapability,X as Mobile320,Z as MobileReady,Q as MobileRejectedRecovery,L as NewOwnerNeedsLicence,z as RejectedWithRecovery,B as VerifiedReady,ze as __namedExportsOrder,Re as default};