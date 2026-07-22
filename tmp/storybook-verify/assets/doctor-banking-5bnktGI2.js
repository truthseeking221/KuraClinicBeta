import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{Ct as i,Et as a,F as o,u as s}from"./provider-marks-BeHzyBjc.js";import{Ar as c,Cr as l,Dr as u,Er as d,Or as ee,Sr as te,Tr as f,jr as ne,t as p,wr as re}from"./ui-C9kmmzkH.js";import{t as m}from"./skeleton-yGvKPj3C.js";import{c as ie,i as ae,l as h,o as g,r as oe,s as se,u as ce}from"./settings-modal-DFqsiPWF.js";import{i as _,n as v,r as y,t as b}from"./alert-l7nmjmGJ.js";import{t as x}from"./button-B6_zsN5-.js";import{a as S}from"./collapsible-Cfc9M9oP.js";import{n as C,t as le}from"./image-CmuNgYuu.js";import{a as w,i as T,n as E,o as D,r as O,t as k}from"./empty-state-DlAvBIIY.js";import{t as A}from"./shared-GnDiMTI0.js";import{a as j,c as M,d as N,f as P,i as F,n as ue,o as I,r as L,s as R,t as z,u as B}from"./activity-ledger-Bx9EHPHU.js";function V({session:e,onRegenerate:t}){return e?e.state===`expired`?(0,U.jsxs)(b,{tone:`warning`,children:[(0,U.jsx)(_,{children:`Link session expired`}),(0,U.jsx)(y,{children:`Create a new secure session. The expired code cannot authorize an account.`}),(0,U.jsx)(x,{onClick:t,variant:`outline`,children:`Create new link`})]}):e.state===`confirmed`?(0,U.jsxs)(b,{tone:`success`,children:[(0,U.jsx)(_,{children:`ABA confirmed the authorization`}),(0,U.jsx)(y,{children:`The linked account will appear after the balance overview refreshes.`})]}):(0,U.jsxs)(`div`,{className:I.linkSession,children:[(0,U.jsx)(`div`,{"aria-label":`ABA authorization QR code`,className:I.qrObject,role:`img`,children:(0,U.jsx)(i,{"aria-hidden":`true`,size:96})}),(0,U.jsxs)(`div`,{className:I.linkInstructions,children:[(0,U.jsx)(`p`,{className:I.instructionTitle,children:`Confirm in ABA Mobile`}),(0,U.jsxs)(`ol`,{className:I.steps,children:[(0,U.jsx)(`li`,{children:`Open ABA Mobile on your phone.`}),(0,U.jsx)(`li`,{children:`Scan this code or open the secure mobile link.`}),(0,U.jsx)(`li`,{children:`Review and authorize in ABA Mobile.`})]}),(0,U.jsxs)(`p`,{className:I.quietCopy,children:[`Waiting for provider confirmation · expires `,N(e.expiresAt)]}),(0,U.jsx)(x,{asChild:!0,variant:`secondary`,children:(0,U.jsx)(`a`,{href:e.mobileDeepLink,children:`Open ABA Mobile`})})]})]}):(0,U.jsxs)(b,{tone:`info`,children:[(0,U.jsx)(_,{children:`Starting secure ABA link`}),(0,U.jsx)(y,{children:`Waiting for a provider link session. No authorization is active yet.`})]})}function H({linkSession:e,mandate:t,onBeginLink:n,onRegenerateLink:r,onRenew:i,onUnlink:a}){let[o,s]=(0,W.useState)(!!e),p=G[t.state],m=t.state===`unlinked`||t.state===`expired`,v=t.state===`renewal_required`,C=t.state===`linked`||t.state===`renewal_required`;return(0,U.jsxs)(`section`,{"aria-labelledby":`doctor-banking-mandate-title`,className:I.objectPanel,children:[(0,U.jsxs)(`div`,{className:I.objectHeader,children:[(0,U.jsxs)(`div`,{className:I.objectHeading,children:[(0,U.jsx)(`h2`,{className:I.objectTitle,id:`doctor-banking-mandate-title`,children:`ABA authorization`}),(0,U.jsx)(`p`,{className:I.objectDescription,children:p.description})]}),(0,U.jsx)(S,{variant:p.variant,children:p.label})]}),t.maskedAccount?(0,U.jsxs)(`dl`,{className:I.objectFacts,children:[(0,U.jsxs)(`div`,{children:[(0,U.jsx)(`dt`,{children:`Account`}),(0,U.jsx)(`dd`,{children:t.maskedAccount})]}),t.expiresAt?(0,U.jsxs)(`div`,{children:[(0,U.jsx)(`dt`,{children:`Expires`}),(0,U.jsx)(`dd`,{children:N(t.expiresAt)})]}):null]}):null,t.state===`frozen`||t.state===`deleted`?(0,U.jsxs)(b,{tone:`danger`,children:[(0,U.jsx)(_,{children:p.label}),(0,U.jsx)(y,{children:t.state===`frozen`?`No collection or account change can be started while this state is active.`:`Contact Kura support if you need to link another eligible account.`})]}):null,(0,U.jsxs)(`div`,{className:I.objectActions,children:[m?(0,U.jsx)(x,{onClick:()=>{n?.(),s(!0)},children:t.state===`expired`?`Link ABA again`:`Link ABA`}):null,v?(0,U.jsx)(x,{onClick:()=>{i?.(),s(!0)},children:`Renew authorization`}):null,t.state===`link_pending`?(0,U.jsx)(x,{onClick:()=>s(!0),variant:`secondary`,children:`View link session`}):null,C?(0,U.jsxs)(te,{children:[(0,U.jsx)(ne,{asChild:!0,children:(0,U.jsx)(x,{variant:`ghost`,children:`Unlink ABA`})}),(0,U.jsxs)(f,{children:[(0,U.jsxs)(ee,{children:[(0,U.jsx)(c,{children:`Unlink this ABA authorization?`}),(0,U.jsx)(d,{children:`Scheduled collections will stop. Any remaining balance you owe may require a final collection or KHQR settlement.`})]}),(0,U.jsxs)(u,{children:[(0,U.jsx)(re,{children:`Keep authorization`}),(0,U.jsx)(l,{onClick:a,variant:`destructive`,children:`Unlink ABA`})]})]})]}):null]}),(0,U.jsx)(oe,{onOpenChange:s,open:o,children:(0,U.jsxs)(g,{size:`lg`,children:[(0,U.jsxs)(h,{children:[(0,U.jsx)(ce,{children:`Link ABA securely`}),(0,U.jsx)(se,{children:`Kura stores a payment token and masked account only. The link succeeds only after ABA confirms it.`})]}),(0,U.jsx)(ae,{children:(0,U.jsx)(V,{session:e,onRegenerate:r})}),(0,U.jsx)(ie,{children:(0,U.jsx)(x,{onClick:()=>s(!1),variant:`ghost`,children:`Close`})})]})})]})}var U,W,G,de=t((()=>{U=r(),W=e(n()),p(),P(),R(),G={unlinked:{label:`Not linked`,variant:`neutral`,description:`KHQR remains available. Link ABA only if you want optional scheduled collections.`},link_pending:{label:`Waiting for ABA`,variant:`warning`,description:`The authorization is not active until ABA confirms it.`},linked:{label:`Auto-pay active`,variant:`success`,description:`Scheduled collections use the linked ABA authorization after the required notice.`},renewal_required:{label:`Renewal required`,variant:`warning`,description:`Renew the authorization before the next eligible scheduled collection.`},expired:{label:`Authorization expired`,variant:`danger`,description:`Scheduled collections are unavailable. KHQR remains available.`},frozen:{label:`Collection frozen`,variant:`danger`,description:`Kura has paused collection actions while the account state is reviewed.`},deleted:{label:`Authorization deleted`,variant:`danger`,description:`This authorization cannot be used or restored from this screen.`}},H.__docgenInfo={description:``,methods:[],displayName:`MandatePanel`,props:{mandate:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  state: MandateState;
  maskedAccount: string | null;
  expiresAt: IsoDateTime | null;
  renewalPromptAt: IsoDateTime | null;
  firstLinkCreditGranted: boolean;
}`,signature:{properties:[{key:`state`,value:{name:`union`,raw:`| 'unlinked'
| 'link_pending'
| 'linked'
| 'renewal_required'
| 'expired'
| 'frozen'
| 'deleted'`,elements:[{name:`literal`,value:`'unlinked'`},{name:`literal`,value:`'link_pending'`},{name:`literal`,value:`'linked'`},{name:`literal`,value:`'renewal_required'`},{name:`literal`,value:`'expired'`},{name:`literal`,value:`'frozen'`},{name:`literal`,value:`'deleted'`}],required:!0}},{key:`maskedAccount`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`expiresAt`,value:{name:`union`,raw:`IsoDateTime | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`renewalPromptAt`,value:{name:`union`,raw:`IsoDateTime | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`firstLinkCreditGranted`,value:{name:`boolean`,required:!0}}]}},description:``},linkSession:{required:!1,tsType:{name:`union`,raw:`MandateLinkSession | null`,elements:[{name:`signature`,type:`object`,raw:`{
  linkRef: string;
  desktopQrPayload: string;
  mobileDeepLink: string;
  expiresAt: IsoDateTime;
  state: 'pending' | 'confirmed' | 'expired';
}`,signature:{properties:[{key:`linkRef`,value:{name:`string`,required:!0}},{key:`desktopQrPayload`,value:{name:`string`,required:!0}},{key:`mobileDeepLink`,value:{name:`string`,required:!0}},{key:`expiresAt`,value:{name:`string`,required:!0}},{key:`state`,value:{name:`union`,raw:`'pending' | 'confirmed' | 'expired'`,elements:[{name:`literal`,value:`'pending'`},{name:`literal`,value:`'confirmed'`},{name:`literal`,value:`'expired'`}],required:!0}}]}},{name:`null`}]},description:``},onBeginLink:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRenew:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRegenerateLink:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onUnlink:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));function K({actions:e,description:t,onBack:n,title:r}){return(0,$.jsxs)(`header`,{className:I.pageHeader,children:[(0,$.jsxs)(`div`,{className:I.pageHeading,children:[n?(0,$.jsx)(x,{className:I.backAction,leadingIcon:(0,$.jsx)(s,{"aria-hidden":`true`}),onClick:n,size:`sm`,variant:`link`,children:`Earnings`}):null,(0,$.jsx)(`h1`,{className:I.pageTitle,children:r}),t?(0,$.jsx)(`p`,{className:I.pageDescription,children:t}):null]}),e?(0,$.jsx)(`div`,{className:I.pageActions,children:e}):null]})}function q({onOpenLicence:e,onRetry:t,state:n}){return n===`loading`?(0,$.jsxs)(`section`,{"aria-label":`Loading earnings`,className:I.loadingStack,role:`status`,children:[(0,$.jsx)(`span`,{className:I.srOnly,children:`Loading earnings`}),(0,$.jsx)(m,{className:I.skeletonHero}),(0,$.jsx)(m,{className:I.skeletonStrip}),(0,$.jsx)(m,{className:I.skeletonTable})]}):n===`permission-denied`?(0,$.jsx)(k,{align:`center`,surface:`muted`,children:(0,$.jsxs)(T,{children:[(0,$.jsx)(D,{children:`Earnings access denied`}),(0,$.jsx)(O,{children:`This ledger is person-owned. Delegated users cannot view balances, debt, mandate details, or payment codes.`})]})}):n===`not-eligible`?(0,$.jsxs)(k,{align:`start`,className:I.licenceState,children:[(0,$.jsx)(w,{className:I.licenceIllustration,children:(0,$.jsx)(C,{alt:``,className:I.licenceIllustrationImage,height:1254,sizes:`(max-width: 768px) 128px, 192px`,src:`/generated/kura-earnings-licence-required-v1.png`,width:1254})}),(0,$.jsxs)(T,{children:[(0,$.jsx)(D,{children:`Earnings require a verified licence`}),(0,$.jsx)(O,{children:`Earnings belong to you, not your workspace. Manage your medical licence to access them.`})]}),e?(0,$.jsx)(E,{children:(0,$.jsx)(x,{onClick:e,children:`Manage licence`})}):null]}):(0,$.jsxs)(b,{tone:`danger`,children:[(0,$.jsx)(_,{children:`Earnings unavailable`}),(0,$.jsx)(y,{children:`Current amounts could not be verified. No balance or payment action is shown.`}),t?(0,$.jsx)(v,{children:(0,$.jsx)(x,{onClick:t,variant:`outline`,children:`Try again`})}):null]})}function fe({onSettle:e,overview:t}){let n=M(t.settledBalance.minor),r=n===`doctor-owes`?`You owe Kura`:n===`kura-owes`?`Kura owes you`:n===`settled`?`Settled balance`:`Balance unavailable`,i=n===`doctor-owes`?`danger`:n===`kura-owes`?`positive`:`neutral`;return(0,$.jsxs)(`section`,{"aria-labelledby":`balance-summary-title`,className:I.balanceCard,"data-tone":i,children:[(0,$.jsxs)(`div`,{className:I.balanceMain,children:[(0,$.jsx)(`p`,{className:I.metricLabel,id:`balance-summary-title`,children:r}),(0,$.jsx)(F,{announceDirection:!0,className:I.balanceValue,value:t.settledBalance}),(0,$.jsxs)(`p`,{className:I.metricHelp,children:[`Credit floor `,(0,$.jsx)(F,{value:t.creditFloor}),` · current exposure`,` `,(0,$.jsx)(F,{value:t.exposure})]})]}),n===`doctor-owes`?(0,$.jsx)(`div`,{className:I.balanceAction,children:(0,$.jsx)(x,{onClick:e,children:`Settle now`})}):null]})}function J({overview:e}){return(0,$.jsxs)(`section`,{"aria-label":`This period`,className:I.periodStats,children:[(0,$.jsxs)(`dl`,{className:I.statStrip,children:[(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`dt`,{children:`Earned this period`}),(0,$.jsx)(`dd`,{children:(0,$.jsx)(L,{value:e.earnedThisPeriod})})]}),(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`dt`,{children:`Pending earnings`}),(0,$.jsx)(`dd`,{children:(0,$.jsx)(L,{value:e.pendingCredit})})]}),(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`dt`,{children:`Pending charges`}),(0,$.jsx)(`dd`,{children:(0,$.jsx)(L,{value:e.pendingDebit})})]}),(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`dt`,{children:`Reserved`}),(0,$.jsx)(`dd`,{children:(0,$.jsx)(L,{value:e.reservedDebit})})]})]}),(0,$.jsx)(`p`,{className:I.statNote,children:`Earned includes settled and pending earnings across your Kura workspaces. Pending and reserved amounts do not change the settled balance yet.`})]})}function pe({onManageAutoPay:e,overview:t}){let{mandate:n,nextSweep:r}=t;return(0,$.jsxs)(`section`,{"aria-labelledby":`collections-title`,className:I.section,children:[(0,$.jsxs)(`header`,{className:I.sectionHeader,children:[(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`h2`,{className:I.sectionTitle,id:`collections-title`,children:`Scheduled collections`}),(0,$.jsx)(`p`,{className:I.sectionDescription,children:`Kura collects owed balances on the 1st and 15th after the required notice.`})]}),(0,$.jsx)(x,{onClick:e,size:`sm`,variant:`ghost`,children:`Manage auto-pay`})]}),(0,$.jsxs)(`dl`,{className:I.collectionFacts,children:[r?(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`dt`,{children:`Next sweep`}),(0,$.jsx)(`dd`,{children:B(r.date)})]}),(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`dt`,{children:`Maximum`}),(0,$.jsx)(`dd`,{children:(0,$.jsx)(L,{value:r.maximumAmount})})]}),(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`dt`,{children:`Notice`}),(0,$.jsx)(`dd`,{children:r.noticeState===`sent`?`Sent`:r.noticeState===`due`?`Due`:`Not due`})]})]}):(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`dt`,{children:`Next sweep`}),(0,$.jsx)(`dd`,{children:`None scheduled`})]}),(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`dt`,{children:`Auto-pay`}),(0,$.jsxs)(`dd`,{children:[G[n.state].label,n.maskedAccount?` · ${n.maskedAccount}`:``]})]})]})]})}function Y({data:e,onManageAutoPay:t,onOpenLicence:n,onOpenStatements:r,onRetry:i,onSettle:a,state:o=`ready`}){return(0,$.jsxs)(`main`,{className:I.page,children:[(0,$.jsx)(K,{actions:o===`ready`?(0,$.jsx)(x,{onClick:r,variant:`secondary`,children:`Activity & statements`}):void 0,title:`Earnings`}),o===`ready`?(0,$.jsxs)(`div`,{className:I.pageFlow,children:[(0,$.jsx)(fe,{onSettle:a,overview:e.overview}),(0,$.jsx)(J,{overview:e.overview}),(0,$.jsx)(pe,{onManageAutoPay:t,overview:e.overview}),(0,$.jsx)(z,{entries:e.entries,onViewAll:r,variant:`recent`})]}):(0,$.jsx)(q,{onOpenLicence:n,onRetry:i,state:o})]})}function me(e){switch(e.kind){case`pre_notice`:return{title:`Sweep notice for ${B(e.sweepDate)}`,detail:`Maximum ${e.originalCap.minor===e.remainingCap.minor?`remains`:`reduced to`} $${(Number(e.remainingCap.minor)/100).toFixed(2)}.`,tone:e.state===`expired`?`warning`:`info`};case`receipt`:return{title:`Payment receipt`,detail:`${{khqr:`KHQR payment`,scheduled:`Scheduled collection`,scheduled_retry:`Collection retry`,admin_retry:`Collection retry`,jit:`Automatic collection`,final_unlink:`Final collection`}[e.source]} applied to the ledger.`,tone:`success`};case`pull_failed`:return{title:`Collection attempt failed`,detail:e.failureReason,tone:`danger`};case`mandate`:return{title:`ABA authorization ${e.event.replaceAll(`_`,` `)}`,detail:e.maskedAccount??`No account is linked.`,tone:e.event===`linked`?`success`:`warning`};case`adjustment`:return{title:`Ledger adjustment recorded`,detail:e.reason,tone:`info`}}}function he({notifications:e}){return(0,$.jsxs)(`section`,{"aria-labelledby":`financial-notifications-title`,className:I.section,children:[(0,$.jsx)(`header`,{className:I.sectionHeader,children:(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`h2`,{className:I.sectionTitle,id:`financial-notifications-title`,children:`Financial notifications`}),(0,$.jsx)(`p`,{className:I.sectionDescription,children:`Only doctor-audience notices and receipts appear here.`})]})}),e.length===0?(0,$.jsx)(`p`,{className:I.quietCopy,children:`No financial notifications.`}):(0,$.jsx)(`ol`,{className:I.notificationList,children:e.map(e=>{let t=me(e);return(0,$.jsxs)(`li`,{className:I.notificationItem,children:[(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`span`,{className:I.notificationTitle,"data-tone":t.tone,children:t.title}),(0,$.jsx)(`p`,{className:I.notificationDetail,children:t.detail})]}),(0,$.jsx)(`time`,{className:I.notificationTime,dateTime:e.occurredAt,children:N(e.occurredAt)})]},e.notificationRef)})})]})}function X({data:e,downloadState:t=`idle`,onBack:n,onDownload:r,onOpenLicence:i,onRetry:a,state:s=`ready`}){return(0,$.jsxs)(`main`,{className:I.page,children:[(0,$.jsx)(K,{actions:s===`ready`?(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(x,{leadingIcon:(0,$.jsx)(o,{"aria-hidden":`true`}),loading:t===`loading`,onClick:()=>r?.(`pdf`),variant:`secondary`,children:`PDF`}),(0,$.jsx)(x,{leadingIcon:(0,$.jsx)(o,{"aria-hidden":`true`}),loading:t===`loading`,onClick:()=>r?.(`xlsx`),children:`Excel`})]}):void 0,onBack:n,title:`Activity & statements`}),s===`ready`?(0,$.jsxs)(`div`,{className:I.pageFlow,children:[t===`error`?(0,$.jsxs)(b,{tone:`danger`,children:[(0,$.jsx)(_,{children:`Statement download failed`}),(0,$.jsx)(y,{children:`No file was saved. Check the date range and try again.`})]}):null,t===`success`?(0,$.jsxs)(b,{tone:`success`,children:[(0,$.jsx)(_,{children:`Statement ready`}),(0,$.jsx)(y,{children:`The filtered statement download has started.`})]}):null,(0,$.jsx)(z,{entries:e.entries}),(0,$.jsx)(he,{notifications:e.notifications})]}):(0,$.jsx)(q,{onOpenLicence:i,onRetry:a,state:s})]})}function Z({intent:e,onBack:t,onCreateKhqr:n,onOpenLicence:r,onRefresh:o,onRegenerate:s,onRetry:c,overview:l,state:u=`ready`}){let d=M(l.settledBalance.minor);return(0,$.jsxs)(`main`,{className:I.page,children:[(0,$.jsx)(K,{description:`Pay the exact settled amount you owe from any KHQR-enabled bank app.`,onBack:t,title:`Settle balance`}),u===`ready`?d===`unavailable`?(0,$.jsxs)(b,{tone:`danger`,children:[(0,$.jsx)(_,{children:`Amount unavailable`}),(0,$.jsx)(y,{children:`The balance cannot be displayed safely, so no KHQR code was created.`})]}):d===`doctor-owes`?e?e.state===`expired`?(0,$.jsxs)(b,{tone:`warning`,children:[(0,$.jsx)(_,{children:`KHQR code expired`}),(0,$.jsx)(y,{children:`No payment was confirmed. Create a new code for the same verified amount.`}),(0,$.jsx)(v,{children:(0,$.jsx)(x,{onClick:s,variant:`outline`,children:`Create new KHQR`})})]}):e.state===`confirmed`?(0,$.jsxs)(b,{tone:`success`,children:[(0,$.jsx)(_,{children:`Settlement confirmed`}),(0,$.jsxs)(y,{children:[(0,$.jsx)(L,{value:e.amount}),` was confirmed by the provider and applied to the ledger.`]})]}):(0,$.jsxs)(`section`,{"aria-labelledby":`khqr-title`,className:I.settlementObject,children:[(0,$.jsx)(`div`,{className:I.qrObject,"aria-label":`KHQR settlement code`,role:`img`,children:(0,$.jsx)(i,{"aria-hidden":`true`,size:120})}),(0,$.jsxs)(`div`,{className:I.settlementDetails,children:[(0,$.jsx)(S,{variant:`warning`,children:`Awaiting confirmation`}),(0,$.jsx)(`h2`,{className:I.objectTitle,id:`khqr-title`,children:`Pay the exact amount`}),(0,$.jsx)(L,{className:I.settlementAmount,value:e.amount}),(0,$.jsx)(`p`,{className:I.objectDescription,children:`Scan with any KHQR-enabled bank app. Kura will wait for provider confirmation.`}),(0,$.jsxs)(`p`,{className:I.quietCopy,children:[`Expires `,N(e.expiresAt)]}),(0,$.jsx)(x,{leadingIcon:(0,$.jsx)(a,{"aria-hidden":`true`}),onClick:o,variant:`secondary`,children:`Check confirmation`})]})]}):(0,$.jsxs)(k,{align:`center`,surface:`muted`,children:[(0,$.jsxs)(T,{children:[(0,$.jsx)(D,{children:`Ready to create exact KHQR`}),(0,$.jsxs)(O,{children:[`The code will request exactly `,(0,$.jsx)(F,{value:l.settledBalance}),`. It cannot be edited or reused after expiry.`]})]}),(0,$.jsx)(E,{children:(0,$.jsx)(x,{leadingIcon:(0,$.jsx)(i,{"aria-hidden":`true`}),onClick:n,children:`Create exact KHQR`})})]}):(0,$.jsx)(k,{align:`center`,surface:`muted`,children:(0,$.jsxs)(T,{children:[(0,$.jsx)(D,{children:`Nothing to settle`}),(0,$.jsx)(O,{children:`Your settled balance is not red, so no KHQR payment is needed.`})]})}):(0,$.jsx)(q,{onOpenLicence:r,onRetry:c,state:u})]})}function Q({linkSession:e,mandate:t,onBack:n,onBeginLink:r,onOpenLicence:i,onRegenerateLink:a,onRenew:o,onRetry:s,onUnlink:c,state:l=`ready`}){return(0,$.jsxs)(`main`,{className:I.page,children:[(0,$.jsx)(K,{description:`Manage the optional ABA authorization used for scheduled collections. KHQR remains available when auto-pay is off.`,onBack:n,title:`Auto-pay`}),l===`ready`?(0,$.jsxs)(`div`,{className:I.narrowFlow,children:[(0,$.jsx)(H,{linkSession:e,mandate:t,onBeginLink:r,onRegenerateLink:a,onRenew:o,onUnlink:c}),(0,$.jsxs)(`section`,{className:I.section,children:[(0,$.jsx)(`h2`,{className:I.sectionTitle,children:`What Kura stores`}),(0,$.jsx)(`p`,{className:I.sectionDescription,children:`A provider token, masked account, authorization state, and lifecycle timestamps. Kura never asks for or stores your ABA PIN or full account number.`})]})]}):(0,$.jsx)(q,{onOpenLicence:i,onRetry:s,state:l})]})}var $,ge=t((()=>{$=r(),le(),p(),A(),ue(),P(),de(),j(),R(),Y.__docgenInfo={description:``,methods:[],displayName:`DoctorBalancePage`,props:{data:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  overview: DoctorBankingOverview;
  entries: LedgerEntry[];
  notifications: DoctorFinancialNotification[];
}`,signature:{properties:[{key:`overview`,value:{name:`signature`,type:`object`,raw:`{
  doctorRef: string;
  settledBalance: SignedMoney;
  pendingDebit: Amount;
  pendingCredit: Amount;
  reservedDebit: Amount;
  exposure: SignedMoney;
  creditFloor: SignedMoney;
  earnedThisPeriod: Amount;
  nextSweep: null | {
    date: string;
    maximumAmount: Amount;
    noticeState: 'not_due' | 'due' | 'sent';
  };
  mandate: MandateSummary;
}`,signature:{properties:[{key:`doctorRef`,value:{name:`string`,required:!0}},{key:`settledBalance`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`pendingDebit`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`pendingCredit`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`reservedDebit`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`exposure`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`creditFloor`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`earnedThisPeriod`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`nextSweep`,value:{name:`union`,raw:`null | {
  date: string;
  maximumAmount: Amount;
  noticeState: 'not_due' | 'due' | 'sent';
}`,elements:[{name:`null`},{name:`signature`,type:`object`,raw:`{
  date: string;
  maximumAmount: Amount;
  noticeState: 'not_due' | 'due' | 'sent';
}`,signature:{properties:[{key:`date`,value:{name:`string`,required:!0}},{key:`maximumAmount`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`noticeState`,value:{name:`union`,raw:`'not_due' | 'due' | 'sent'`,elements:[{name:`literal`,value:`'not_due'`},{name:`literal`,value:`'due'`},{name:`literal`,value:`'sent'`}],required:!0}}]}}],required:!0}},{key:`mandate`,value:{name:`signature`,type:`object`,raw:`{
  state: MandateState;
  maskedAccount: string | null;
  expiresAt: IsoDateTime | null;
  renewalPromptAt: IsoDateTime | null;
  firstLinkCreditGranted: boolean;
}`,signature:{properties:[{key:`state`,value:{name:`union`,raw:`| 'unlinked'
| 'link_pending'
| 'linked'
| 'renewal_required'
| 'expired'
| 'frozen'
| 'deleted'`,elements:[{name:`literal`,value:`'unlinked'`},{name:`literal`,value:`'link_pending'`},{name:`literal`,value:`'linked'`},{name:`literal`,value:`'renewal_required'`},{name:`literal`,value:`'expired'`},{name:`literal`,value:`'frozen'`},{name:`literal`,value:`'deleted'`}],required:!0}},{key:`maskedAccount`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`expiresAt`,value:{name:`union`,raw:`IsoDateTime | null`,elements:[{name:`string`,required:!0},{name:`null`}],required:!0}},{key:`renewalPromptAt`,value:{name:`union`,raw:`IsoDateTime | null`,elements:[{name:`string`,required:!0},{name:`null`}],required:!0}},{key:`firstLinkCreditGranted`,value:{name:`boolean`,required:!0}}]},required:!0}}]},required:!0}},{key:`entries`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`occurredAt`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`detail`,value:{name:`string`,required:!0}},{key:`orderRef`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`workspaceLabel`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}}]}}],raw:`LedgerEntry[]`,required:!0}},{key:`notifications`,value:{name:`Array`,elements:[{name:`union`,raw:`| {
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
| 'not-eligible'`,elements:[{name:`literal`,value:`'ready'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'permission-denied'`},{name:`literal`,value:`'not-eligible'`}]},description:``,defaultValue:{value:`'ready'`,computed:!1}},onManageAutoPay:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onOpenLicence:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onOpenStatements:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRetry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onSettle:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}},X.__docgenInfo={description:``,methods:[],displayName:`DoctorStatementsPage`,props:{data:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  overview: DoctorBankingOverview;
  entries: LedgerEntry[];
  notifications: DoctorFinancialNotification[];
}`,signature:{properties:[{key:`overview`,value:{name:`signature`,type:`object`,raw:`{
  doctorRef: string;
  settledBalance: SignedMoney;
  pendingDebit: Amount;
  pendingCredit: Amount;
  reservedDebit: Amount;
  exposure: SignedMoney;
  creditFloor: SignedMoney;
  earnedThisPeriod: Amount;
  nextSweep: null | {
    date: string;
    maximumAmount: Amount;
    noticeState: 'not_due' | 'due' | 'sent';
  };
  mandate: MandateSummary;
}`,signature:{properties:[{key:`doctorRef`,value:{name:`string`,required:!0}},{key:`settledBalance`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`pendingDebit`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`pendingCredit`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`reservedDebit`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`exposure`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`creditFloor`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`earnedThisPeriod`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`nextSweep`,value:{name:`union`,raw:`null | {
  date: string;
  maximumAmount: Amount;
  noticeState: 'not_due' | 'due' | 'sent';
}`,elements:[{name:`null`},{name:`signature`,type:`object`,raw:`{
  date: string;
  maximumAmount: Amount;
  noticeState: 'not_due' | 'due' | 'sent';
}`,signature:{properties:[{key:`date`,value:{name:`string`,required:!0}},{key:`maximumAmount`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`noticeState`,value:{name:`union`,raw:`'not_due' | 'due' | 'sent'`,elements:[{name:`literal`,value:`'not_due'`},{name:`literal`,value:`'due'`},{name:`literal`,value:`'sent'`}],required:!0}}]}}],required:!0}},{key:`mandate`,value:{name:`signature`,type:`object`,raw:`{
  state: MandateState;
  maskedAccount: string | null;
  expiresAt: IsoDateTime | null;
  renewalPromptAt: IsoDateTime | null;
  firstLinkCreditGranted: boolean;
}`,signature:{properties:[{key:`state`,value:{name:`union`,raw:`| 'unlinked'
| 'link_pending'
| 'linked'
| 'renewal_required'
| 'expired'
| 'frozen'
| 'deleted'`,elements:[{name:`literal`,value:`'unlinked'`},{name:`literal`,value:`'link_pending'`},{name:`literal`,value:`'linked'`},{name:`literal`,value:`'renewal_required'`},{name:`literal`,value:`'expired'`},{name:`literal`,value:`'frozen'`},{name:`literal`,value:`'deleted'`}],required:!0}},{key:`maskedAccount`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`expiresAt`,value:{name:`union`,raw:`IsoDateTime | null`,elements:[{name:`string`,required:!0},{name:`null`}],required:!0}},{key:`renewalPromptAt`,value:{name:`union`,raw:`IsoDateTime | null`,elements:[{name:`string`,required:!0},{name:`null`}],required:!0}},{key:`firstLinkCreditGranted`,value:{name:`boolean`,required:!0}}]},required:!0}}]},required:!0}},{key:`entries`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`occurredAt`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`detail`,value:{name:`string`,required:!0}},{key:`orderRef`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`workspaceLabel`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}}]}}],raw:`LedgerEntry[]`,required:!0}},{key:`notifications`,value:{name:`Array`,elements:[{name:`union`,raw:`| {
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
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`reason`,value:{name:`string`,required:!0}}]}}]}],raw:`DoctorFinancialNotification[]`,required:!0}}]}},description:``},downloadState:{required:!1,tsType:{name:`union`,raw:`'idle' | 'loading' | 'success' | 'error'`,elements:[{name:`literal`,value:`'idle'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'success'`},{name:`literal`,value:`'error'`}]},description:``,defaultValue:{value:`'idle'`,computed:!1}},state:{required:!1,tsType:{name:`union`,raw:`| 'ready'
| 'loading'
| 'error'
| 'permission-denied'
| 'not-eligible'`,elements:[{name:`literal`,value:`'ready'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'permission-denied'`},{name:`literal`,value:`'not-eligible'`}]},description:``,defaultValue:{value:`'ready'`,computed:!1}},onDownload:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(format: 'pdf' | 'xlsx') => void`,signature:{arguments:[{type:{name:`union`,raw:`'pdf' | 'xlsx'`,elements:[{name:`literal`,value:`'pdf'`},{name:`literal`,value:`'xlsx'`}]},name:`format`}],return:{name:`void`}}},description:``},onBack:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onOpenLicence:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRetry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}},Z.__docgenInfo={description:``,methods:[],displayName:`DoctorSettlePage`,props:{overview:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  doctorRef: string;
  settledBalance: SignedMoney;
  pendingDebit: Amount;
  pendingCredit: Amount;
  reservedDebit: Amount;
  exposure: SignedMoney;
  creditFloor: SignedMoney;
  earnedThisPeriod: Amount;
  nextSweep: null | {
    date: string;
    maximumAmount: Amount;
    noticeState: 'not_due' | 'due' | 'sent';
  };
  mandate: MandateSummary;
}`,signature:{properties:[{key:`doctorRef`,value:{name:`string`,required:!0}},{key:`settledBalance`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`pendingDebit`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`pendingCredit`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`reservedDebit`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`exposure`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`creditFloor`,value:{name:`signature`,type:`object`,raw:`{
  minor: SignedUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`earnedThisPeriod`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`nextSweep`,value:{name:`union`,raw:`null | {
  date: string;
  maximumAmount: Amount;
  noticeState: 'not_due' | 'due' | 'sent';
}`,elements:[{name:`null`},{name:`signature`,type:`object`,raw:`{
  date: string;
  maximumAmount: Amount;
  noticeState: 'not_due' | 'due' | 'sent';
}`,signature:{properties:[{key:`date`,value:{name:`string`,required:!0}},{key:`maximumAmount`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`noticeState`,value:{name:`union`,raw:`'not_due' | 'due' | 'sent'`,elements:[{name:`literal`,value:`'not_due'`},{name:`literal`,value:`'due'`},{name:`literal`,value:`'sent'`}],required:!0}}]}}],required:!0}},{key:`mandate`,value:{name:`signature`,type:`object`,raw:`{
  state: MandateState;
  maskedAccount: string | null;
  expiresAt: IsoDateTime | null;
  renewalPromptAt: IsoDateTime | null;
  firstLinkCreditGranted: boolean;
}`,signature:{properties:[{key:`state`,value:{name:`union`,raw:`| 'unlinked'
| 'link_pending'
| 'linked'
| 'renewal_required'
| 'expired'
| 'frozen'
| 'deleted'`,elements:[{name:`literal`,value:`'unlinked'`},{name:`literal`,value:`'link_pending'`},{name:`literal`,value:`'linked'`},{name:`literal`,value:`'renewal_required'`},{name:`literal`,value:`'expired'`},{name:`literal`,value:`'frozen'`},{name:`literal`,value:`'deleted'`}],required:!0}},{key:`maskedAccount`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`expiresAt`,value:{name:`union`,raw:`IsoDateTime | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`renewalPromptAt`,value:{name:`union`,raw:`IsoDateTime | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`firstLinkCreditGranted`,value:{name:`boolean`,required:!0}}]},required:!0}}]}},description:``},intent:{required:!1,tsType:{name:`union`,raw:`KhqrIntent | null`,elements:[{name:`signature`,type:`object`,raw:`{
  settlementRef: string;
  purpose: 'settled_red' | 'pending_shortfall';
  amount: Amount;
  qrPayload: string;
  expiresAt: IsoDateTime;
  state: 'pending' | 'confirmed' | 'expired';
}`,signature:{properties:[{key:`settlementRef`,value:{name:`string`,required:!0}},{key:`purpose`,value:{name:`union`,raw:`'settled_red' | 'pending_shortfall'`,elements:[{name:`literal`,value:`'settled_red'`},{name:`literal`,value:`'pending_shortfall'`}],required:!0}},{key:`amount`,value:{name:`signature`,type:`object`,raw:`{
  minor: AmountUsdMinor;
  currency: 'USD';
}`,signature:{properties:[{key:`minor`,value:{name:`string`,required:!0}},{key:`currency`,value:{name:`literal`,value:`'USD'`,required:!0}}]},required:!0}},{key:`qrPayload`,value:{name:`string`,required:!0}},{key:`expiresAt`,value:{name:`string`,required:!0}},{key:`state`,value:{name:`union`,raw:`'pending' | 'confirmed' | 'expired'`,elements:[{name:`literal`,value:`'pending'`},{name:`literal`,value:`'confirmed'`},{name:`literal`,value:`'expired'`}],required:!0}}]}},{name:`null`}]},description:``},state:{required:!1,tsType:{name:`union`,raw:`| 'ready'
| 'loading'
| 'error'
| 'permission-denied'
| 'not-eligible'`,elements:[{name:`literal`,value:`'ready'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'permission-denied'`},{name:`literal`,value:`'not-eligible'`}]},description:``,defaultValue:{value:`'ready'`,computed:!1}},onBack:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onCreateKhqr:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onOpenLicence:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRegenerate:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRefresh:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRetry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}},Q.__docgenInfo={description:``,methods:[],displayName:`DoctorPaymentsPage`,props:{mandate:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  state: MandateState;
  maskedAccount: string | null;
  expiresAt: IsoDateTime | null;
  renewalPromptAt: IsoDateTime | null;
  firstLinkCreditGranted: boolean;
}`,signature:{properties:[{key:`state`,value:{name:`union`,raw:`| 'unlinked'
| 'link_pending'
| 'linked'
| 'renewal_required'
| 'expired'
| 'frozen'
| 'deleted'`,elements:[{name:`literal`,value:`'unlinked'`},{name:`literal`,value:`'link_pending'`},{name:`literal`,value:`'linked'`},{name:`literal`,value:`'renewal_required'`},{name:`literal`,value:`'expired'`},{name:`literal`,value:`'frozen'`},{name:`literal`,value:`'deleted'`}],required:!0}},{key:`maskedAccount`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`expiresAt`,value:{name:`union`,raw:`IsoDateTime | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`renewalPromptAt`,value:{name:`union`,raw:`IsoDateTime | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`firstLinkCreditGranted`,value:{name:`boolean`,required:!0}}]}},description:``},linkSession:{required:!1,tsType:{name:`union`,raw:`MandateLinkSession | null`,elements:[{name:`signature`,type:`object`,raw:`{
  linkRef: string;
  desktopQrPayload: string;
  mobileDeepLink: string;
  expiresAt: IsoDateTime;
  state: 'pending' | 'confirmed' | 'expired';
}`,signature:{properties:[{key:`linkRef`,value:{name:`string`,required:!0}},{key:`desktopQrPayload`,value:{name:`string`,required:!0}},{key:`mobileDeepLink`,value:{name:`string`,required:!0}},{key:`expiresAt`,value:{name:`string`,required:!0}},{key:`state`,value:{name:`union`,raw:`'pending' | 'confirmed' | 'expired'`,elements:[{name:`literal`,value:`'pending'`},{name:`literal`,value:`'confirmed'`},{name:`literal`,value:`'expired'`}],required:!0}}]}},{name:`null`}]},description:``},state:{required:!1,tsType:{name:`union`,raw:`| 'ready'
| 'loading'
| 'error'
| 'permission-denied'
| 'not-eligible'`,elements:[{name:`literal`,value:`'ready'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'permission-denied'`},{name:`literal`,value:`'not-eligible'`}]},description:``,defaultValue:{value:`'ready'`,computed:!1}},onBack:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onBeginLink:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onOpenLicence:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRegenerateLink:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRenew:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRetry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onUnlink:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));export{ge as a,X as i,Q as n,Z as r,Y as t};