import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{Et as i,zt as a}from"./provider-marks-BeHzyBjc.js";import{an as ee,dn as te,in as o,ln as ne,nn as re,rn as ie,sn as s,t as ae,un as oe}from"./ui-C9kmmzkH.js";import{t as c}from"./skeleton-yGvKPj3C.js";import{i as se,n as ce,r as le,t as ue}from"./alert-l7nmjmGJ.js";import{t as l}from"./button-B6_zsN5-.js";import{a as u}from"./collapsible-Cfc9M9oP.js";import{t as de}from"./card-DMMaaphC.js";import{t as d}from"./app-shell-dOUH8yca.js";import{r as f,t as p}from"./readiness-data-D41RGqZh.js";import{i as fe,n as pe,o as m,r as me,t as he}from"./empty-state-DlAvBIIY.js";import{t as h}from"./app-shell-Bb-tldyu.js";import{t as g}from"./shared-GnDiMTI0.js";import{A as ge,L as _,d as _e,g as ve,l as v,lt as ye,m as be,q as xe,u as Se}from"./demo-data-DZ0mjvYd.js";import{n as Ce,t as we}from"./check-in-wizard-DvzZbfaU.js";var Te,Ee,De,Oe,ke,Ae,je,y,b,x,S,C,w,T,E,D,O,k,A,j,M,Me=t((()=>{Te=`_queue_xxg7f_1`,Ee=`_header_xxg7f_8`,De=`_headerText_xxg7f_15`,Oe=`_title_xxg7f_21`,ke=`_subtitle_xxg7f_28`,Ae=`_staleRow_xxg7f_34`,je=`_listSurface_xxg7f_47`,y=`_rowObserved_xxg7f_52`,b=`_name_xxg7f_52`,x=`_wait_xxg7f_53`,S=`_queueNumber_xxg7f_57`,C=`_nameLine_xxg7f_64`,w=`_nameKhmer_xxg7f_78`,T=`_facts_xxg7f_100`,E=`_observedNote_xxg7f_107`,D=`_skeletonQueue_xxg7f_115`,O=`_skeletonName_xxg7f_120`,k=`_skeletonMeta_xxg7f_125`,A=`_rowActions_xxg7f_135`,j=`_rowAction_xxg7f_135`,M={queue:Te,header:Ee,headerText:De,title:Oe,subtitle:ke,staleRow:Ae,listSurface:je,rowObserved:y,name:b,wait:x,queueNumber:S,nameLine:C,nameKhmer:w,facts:T,observedNote:E,skeletonQueue:D,skeletonName:O,skeletonMeta:k,rowActions:A,rowAction:j}}));function N({asOf:e,onNewWalkIn:t,onQueueForDraw:n,onRefresh:r,onResumeVisit:ae,onRetry:d,state:f=`ready`,visits:p}){let h=xe(p),g=h.filter(e=>e.stage!==`completed`),_=p.length-g.length;return f===`denied`?(0,P.jsx)(`section`,{"aria-label":`Arrivals`,className:M.queue,children:(0,P.jsx)(he,{align:`center`,surface:`muted`,children:(0,P.jsxs)(fe,{children:[(0,P.jsx)(m,{children:`No access to the desk queue`}),(0,P.jsx)(me,{children:`Your account has no front-desk capability in this workspace. Ask the practice owner to grant reception access.`})]})})}):(0,P.jsxs)(`section`,{"aria-label":`Arrivals`,className:M.queue,children:[(0,P.jsxs)(`header`,{className:M.header,children:[(0,P.jsxs)(`div`,{className:M.headerText,children:[(0,P.jsx)(`h2`,{className:M.title,children:`Arrivals`}),(0,P.jsx)(`p`,{className:M.subtitle,children:f===`loading`?`Loading today’s visits…`:`${g.length} in progress · ${_} completed today`})]}),t?(0,P.jsxs)(l,{onClick:t,variant:`primary`,children:[(0,P.jsx)(a,{"aria-hidden":`true`,size:16}),`New walk-in`]}):null]}),f===`offline`?(0,P.jsxs)(ue,{tone:`warning`,children:[(0,P.jsx)(se,{children:`You are offline`}),(0,P.jsxs)(le,{children:[`Showing the last synced queue`,e?` from ${e}`:``,`. Check-ins and payments cannot be recorded until the connection returns.`]})]}):null,f===`stale`?(0,P.jsxs)(`div`,{className:M.staleRow,children:[(0,P.jsxs)(`span`,{children:[`Updated `,e??`earlier`]}),(0,P.jsxs)(l,{onClick:()=>r?.(),size:`sm`,variant:`ghost`,children:[(0,P.jsx)(i,{"aria-hidden":`true`,size:14}),`Refresh`]})]}):null,f===`error`?(0,P.jsxs)(ue,{tone:`danger`,children:[(0,P.jsx)(se,{children:`The queue could not be loaded`}),(0,P.jsx)(le,{children:`Today’s visits are unavailable. Walk-ins can still be checked in — the queue re-syncs when the connection recovers.`}),d?(0,P.jsx)(ce,{children:(0,P.jsx)(l,{onClick:d,size:`sm`,variant:`outline`,children:`Retry`})}):null]}):null,f===`loading`?(0,P.jsx)(de,{className:M.listSurface,variant:`outline`,children:(0,P.jsx)(s,{"aria-label":`Loading visits`,role:`list`,children:[0,1,2].map((e,t)=>(0,P.jsxs)(F.Fragment,{children:[t>0?(0,P.jsx)(oe,{"aria-hidden":`true`}):null,(0,P.jsxs)(re,{role:`listitem`,size:`sm`,children:[(0,P.jsx)(ne,{children:(0,P.jsx)(c,{className:M.skeletonQueue,shape:`text`})}),(0,P.jsxs)(o,{children:[(0,P.jsx)(c,{className:M.skeletonName,shape:`text`}),(0,P.jsx)(c,{className:M.skeletonMeta,shape:`text`})]})]})]},e))})}):null,f!==`loading`&&f!==`error`&&h.length===0?(0,P.jsxs)(he,{align:`center`,surface:`muted`,children:[(0,P.jsxs)(fe,{children:[(0,P.jsx)(m,{children:`No arrivals yet`}),(0,P.jsx)(me,{children:`Visits appear here when a booking is checked in or a walk-in starts.`})]}),t?(0,P.jsx)(pe,{children:(0,P.jsx)(l,{onClick:t,variant:`primary`,children:`Start a walk-in`})}):null]}):null,f!==`loading`&&h.length>0?(0,P.jsx)(de,{className:M.listSurface,variant:`outline`,children:(0,P.jsx)(s,{"aria-label":`Today's visits`,role:`list`,children:h.map((e,t)=>{let r=ge(e),i=ye(e.waitMinutes),a=Ne[e.stage],s=Pe[e.payment],c=e.stage===`draw-complete`||e.stage===`completed`;return(0,P.jsxs)(F.Fragment,{children:[t>0?(0,P.jsx)(oe,{"aria-hidden":`true`}):null,(0,P.jsxs)(re,{className:c?M.rowObserved:void 0,"data-stage":e.stage,role:`listitem`,size:`sm`,children:[(0,P.jsx)(ne,{children:(0,P.jsxs)(`span`,{className:M.queueNumber,children:[`#`,e.queueNumber]})}),(0,P.jsxs)(o,{children:[(0,P.jsxs)(te,{className:M.nameLine,children:[(0,P.jsx)(`span`,{className:M.name,children:e.patientName}),e.nameKhmer?(0,P.jsx)(`span`,{className:M.nameKhmer,lang:`km`,children:e.nameKhmer}):null]}),(0,P.jsxs)(ee,{className:M.wait,"data-tone":i===`normal`?void 0:i,children:[`Arrived `,e.arrivedLabel,` · waiting `,e.waitMinutes,`m`,i===`escalate`?` — escalate`:``]})]}),(0,P.jsxs)(ie,{className:M.rowActions,children:[(0,P.jsxs)(`span`,{className:M.facts,children:[(0,P.jsx)(u,{size:`sm`,variant:a.variant,children:a.label}),(0,P.jsx)(u,{size:`sm`,variant:e.assurance===`verified`?`success`:`neutral`,children:e.assurance===`verified`?`ID verified`:`ID unverified`}),(0,P.jsx)(u,{size:`sm`,variant:s.variant,children:s.label})]}),r?(0,P.jsx)(l,{className:M.rowAction,onClick:()=>r.kind===`resume`?ae?.(e.id):n?.(e.id),size:`sm`,variant:r.kind===`queue-draw`?`primary`:`outline`,children:r.label}):(0,P.jsx)(`span`,{className:M.observedNote,children:e.stage===`completed`?`Done`:`With phlebotomy`})]})]})]},e.id)})})}):null]})}var P,F,Ne,Pe,Fe=t((()=>{P=r(),F=e(n()),ae(),g(),_(),Me(),Ne={arrived:{label:`Checking in`,variant:`info`},"identity-resolved":{label:`Identity resolved`,variant:`success`},"draw-complete":{label:`Draw complete`,variant:`neutral`},completed:{label:`Completed`,variant:`neutral`}},Pe={pending:{label:`Payment pending`,variant:`neutral`},collected:{label:`Paid`,variant:`success`},deferred:{label:`Pay later`,variant:`warning`},waiting:{label:`KHQR waiting`,variant:`warning`}},N.__docgenInfo={description:`Desk arrivals queue (journeys REC-01/02/05). Each row states the
independent lifecycle facts — visit stage, identity assurance, payment —
and offers exactly one next action derived from those axes. Later stages
are owned by phlebotomy and the lab; the desk only observes them.

PROTOTYPE SURFACE: no queue/visit engine exists in kura-platform today.`,methods:[],displayName:`DeskQueue`,props:{visits:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  queueNumber: number;
  patientName: string;
  nameKhmer?: string;
  arrivedLabel: string;
  /** Minutes since arrival, injected — the queue never reads the clock. */
  waitMinutes: number;
  stage: VisitStage;
  /** patient-ms assurance axis, shown as its own fact. */
  assurance: 'unverified' | 'verified';
  payment: VisitPaymentFact;
  /** Present while a check-in is unfinished: the step the desk resumes at. */
  resumeStep?: StepId;
  /** Set once the visit has been queued for phlebotomy. */
  queuedForDraw?: boolean;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`queueNumber`,value:{name:`number`,required:!0}},{key:`patientName`,value:{name:`string`,required:!0}},{key:`nameKhmer`,value:{name:`string`,required:!1}},{key:`arrivedLabel`,value:{name:`string`,required:!0}},{key:`waitMinutes`,value:{name:`number`,required:!0},description:`Minutes since arrival, injected — the queue never reads the clock.`},{key:`stage`,value:{name:`union`,raw:`'arrived' | 'identity-resolved' | 'draw-complete' | 'completed'`,elements:[{name:`literal`,value:`'arrived'`},{name:`literal`,value:`'identity-resolved'`},{name:`literal`,value:`'draw-complete'`},{name:`literal`,value:`'completed'`}],required:!0}},{key:`assurance`,value:{name:`union`,raw:`'unverified' | 'verified'`,elements:[{name:`literal`,value:`'unverified'`},{name:`literal`,value:`'verified'`}],required:!0},description:`patient-ms assurance axis, shown as its own fact.`},{key:`payment`,value:{name:`union`,raw:`'pending' | 'collected' | 'deferred' | 'waiting'`,elements:[{name:`literal`,value:`'pending'`},{name:`literal`,value:`'collected'`},{name:`literal`,value:`'deferred'`},{name:`literal`,value:`'waiting'`}],required:!0}},{key:`resumeStep`,value:{name:`union`,raw:`1 | 2 | 3 | 4 | 5 | 6`,elements:[{name:`literal`,value:`1`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`},{name:`literal`,value:`5`},{name:`literal`,value:`6`}],required:!1},description:`Present while a check-in is unfinished: the step the desk resumes at.`},{key:`queuedForDraw`,value:{name:`boolean`,required:!1},description:`Set once the visit has been queued for phlebotomy.`}]}}],raw:`DeskVisit[]`},description:``},state:{required:!1,tsType:{name:`union`,raw:`'ready' | 'loading' | 'error' | 'offline' | 'stale' | 'denied'`,elements:[{name:`literal`,value:`'ready'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'offline'`},{name:`literal`,value:`'stale'`},{name:`literal`,value:`'denied'`}]},description:``,defaultValue:{value:`'ready'`,computed:!1}},asOf:{required:!1,tsType:{name:`string`},description:`Shown with stale/offline states: when the list was last synced.`},onResumeVisit:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(visitId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`visitId`}],return:{name:`void`}}},description:``},onQueueForDraw:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(visitId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`visitId`}],return:{name:`void`}}},description:``},onNewWalkIn:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRetry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRefresh:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));function Ie(){let[e,t]=(0,L.useState)(v.slice(2)),[n,r]=(0,L.useState)(null);return(0,I.jsx)(d,{activeKey:`arrivals`,availableModes:[`front-desk`],mode:`front-desk`,onNavigate:()=>{},user:{name:`Linh Nguyen`,email:`linh@mekong.clinic`,licenceVerified:!1},workspace:{id:`mekong`,name:`Mekong Clinic`,branches:[{id:`bkk1`,name:`BKK1 Branch`}],activeBranchId:`bkk1`},children:n?(0,I.jsx)(we,{existingPatients:_e,onCheckIn:()=>{t(e=>[{id:n.id,queueNumber:n.queueNumber,patientName:n.name,arrivedLabel:`09:41`,waitMinutes:0,stage:`identity-resolved`,assurance:`unverified`,payment:n.cart.payment.status===`confirmed`?`collected`:`deferred`},...e]),r(null)},onPatientChange:r,patient:n}):(0,I.jsx)(N,{onNewWalkIn:()=>r(be(`walk-in-flow`,29)),onQueueForDraw:e=>t(t=>t.map(t=>t.id===e?{...t,queuedForDraw:!0}:t)),visits:e})})}var I,L,R,z,B,Le,V,Re,H,U,W,G,K,q,J,Y,X,Z,Q,$,ze;t((()=>{I=r(),L=e(n()),h(),Ce(),ve(),Fe(),f(),{expect:R,fn:z,userEvent:B,waitFor:Le,within:V}=__STORYBOOK_MODULE_TEST__,Re={title:`Clinic/Front Desk/Desk Queue`,component:N,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`padded`,kura:{readiness:p.frontDesk,contract:{status:`design-target`,backendMapping:`none`,note:`kura-platform has no queue, visit, or check-in engine today — no controller, proto, or enum. This surface is the reception workbench the truth pack mandates (REC-01/02/05, workbench lifecycle §5.1) and must not be read as an executable backend capability.`},intake:{decision:`FEATURE-OWN`,owner:`src/features/front-desk`,evidence:`Legacy prototype had no queue surface either (nav stub only); the truth pack §5.1 workbench lifecycle and §7 queue scenario contract define it. Composes canonical Badge, Button, Alert, Skeleton, and shared EmptyState.`},journeys:[`REC-01-check-in-planned-visit`,`REC-02-walk-in-check-in`,`REC-05-queue-for-phlebotomy`,`WQ-09-empty-error-stale-worklist`],binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura`,icons:`kura-hugeicons`}},docs:{description:{component:`Desk arrivals queue. Each row states the independent lifecycle facts — visit stage, identity assurance, payment — and offers exactly one next action derived from those axes (resume an unfinished check-in, or queue a resolved identity for phlebotomy). Payment success never advances the visit axis. Later stages are owned by phlebotomy and only observed here.`}}},args:{visits:v,onResumeVisit:z(),onQueueForDraw:z(),onNewWalkIn:z(),onRetry:z(),onRefresh:z()}},H={play:async({canvasElement:e,args:t})=>{let n=V(e);await R(n.getByText(`5 in progress · 1 completed today`)).toBeVisible();let r=V(n.getByRole(`list`,{name:`Today's visits`})).getAllByRole(`listitem`);await R(V(r[0]).getByText(`Chenda Sreymom`)).toBeVisible(),await R(V(r[0]).getByText(`ID unverified`)).toBeVisible(),await R(V(r[0]).getByText(`Pay later`)).toBeVisible(),await B.click(V(r[0]).getByRole(`button`,{name:`Resume check-in · Step 2`})),await R(t.onResumeVisit).toHaveBeenCalledWith(`v-2`),await B.click(n.getByRole(`button`,{name:`Queue for phlebotomy`})),await R(t.onQueueForDraw).toHaveBeenCalledWith(`v-3`)}},U={args:{visits:[{...v[0],payment:`collected`},v[3]]},play:async({canvasElement:e})=>{let t=V(e),n=V(t.getByRole(`list`,{name:`Today's visits`})).getAllByRole(`listitem`);await R(V(n[0]).getByText(`Checking in`)).toBeVisible(),await R(V(n[0]).getByText(`Paid`)).toBeVisible(),await R(V(n[1]).getByText(`Identity resolved`)).toBeVisible(),await R(V(n[1]).getByText(`KHQR waiting`)).toBeVisible()}},W={args:{visits:Se},play:async({canvasElement:e})=>{let t=V(e);await R(t.getByText(/waiting 85m — escalate/)).toBeVisible(),await R(t.getByText(/waiting 70m — escalate/)).toBeVisible()}},G={args:{visits:[]},play:async({canvasElement:e,args:t})=>{let n=V(e);await R(n.getByText(`No arrivals yet`)).toBeVisible(),await B.click(n.getByRole(`button`,{name:`Start a walk-in`})),await R(t.onNewWalkIn).toHaveBeenCalled()}},K={args:{state:`loading`},play:async({canvasElement:e})=>{let t=V(e);await R(t.getByText(`Loading today’s visits…`)).toBeVisible(),await R(t.queryByRole(`button`,{name:/Resume check-in/})).not.toBeInTheDocument()}},q={args:{state:`error`},play:async({canvasElement:e,args:t})=>{let n=V(e);await R(n.getByText(`The queue could not be loaded`)).toBeVisible(),await R(n.getByRole(`button`,{name:`New walk-in`})).toBeVisible(),await B.click(n.getByRole(`button`,{name:`Retry`})),await R(t.onRetry).toHaveBeenCalled()}},J={args:{state:`offline`,asOf:`09:12`},play:async({canvasElement:e})=>{let t=V(e);await R(t.getByText(`You are offline`)).toBeVisible(),await R(t.getByText(/from 09:12/)).toBeVisible()}},Y={args:{state:`stale`,asOf:`09:12`},play:async({canvasElement:e,args:t})=>{let n=V(e);await R(n.getByText(`Updated 09:12`)).toBeVisible(),await B.click(n.getByRole(`button`,{name:`Refresh`})),await R(t.onRefresh).toHaveBeenCalled()}},X={args:{state:`denied`},play:async({canvasElement:e})=>{let t=V(e);await R(t.getByText(`No access to the desk queue`)).toBeVisible(),await R(t.queryByRole(`button`,{name:`New walk-in`})).not.toBeInTheDocument()}},Z={globals:{viewport:{value:`kura320`}},play:async({canvasElement:e})=>{let t=V(e);await R(t.getByRole(`button`,{name:`Queue for phlebotomy`})).toBeVisible()}},Q={globals:{theme:`dark`}},$={parameters:{kura:{flow:{pages:[`Clinic/Front Desk/Desk Queue`,`Clinic/Front Desk/Check-In Wizard`,`Clinic/Collection/Draw Worksheet`]}}},render:()=>(0,I.jsx)(Ie,{}),play:async({canvasElement:e})=>{let t=V(e);await B.click(t.getByRole(`button`,{name:`Queue for phlebotomy`})),await Le(async()=>{await R(t.queryByRole(`button`,{name:`Queue for phlebotomy`})).not.toBeInTheDocument()}),await B.click(t.getByRole(`button`,{name:`New walk-in`})),await R(await t.findByText(`Find or create a patient`)).toBeVisible()}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('5 in progress · 1 completed today')).toBeVisible();

    // Unfinished check-ins first; each row carries independent axis facts.
    const rows = within(canvas.getByRole('list', {
      name: "Today's visits"
    })).getAllByRole('listitem');
    await expect(within(rows[0]).getByText('Chenda Sreymom')).toBeVisible();
    await expect(within(rows[0]).getByText('ID unverified')).toBeVisible();
    await expect(within(rows[0]).getByText('Pay later')).toBeVisible();
    await userEvent.click(within(rows[0]).getByRole('button', {
      name: 'Resume check-in · Step 2'
    }));
    await expect(args.onResumeVisit).toHaveBeenCalledWith('v-2');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Queue for phlebotomy'
    }));
    await expect(args.onQueueForDraw).toHaveBeenCalledWith('v-3');
  }
}`,...H.parameters?.docs?.source},description:{story:`A realistic mid-morning queue: every stage and payment fact visible at once.`,...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    visits: [
    // Paid in full but the check-in is unfinished — still "Checking in".
    {
      ...DESK_VISITS[0],
      payment: 'collected'
    },
    // Identity resolved but payment still waiting on Bakong.
    DESK_VISITS[3]]
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const rows = within(canvas.getByRole('list', {
      name: "Today's visits"
    })).getAllByRole('listitem');
    await expect(within(rows[0]).getByText('Checking in')).toBeVisible();
    await expect(within(rows[0]).getByText('Paid')).toBeVisible();
    await expect(within(rows[1]).getByText('Identity resolved')).toBeVisible();
    await expect(within(rows[1]).getByText('KHQR waiting')).toBeVisible();
  }
}`,...U.parameters?.docs?.source},description:{story:`Paid ≠ arrived, drawn ≠ paid: axes never collapse into one status.`,...U.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    visits: DESK_VISITS_LONG_WAIT
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/waiting 85m — escalate/)).toBeVisible();
    await expect(canvas.getByText(/waiting 70m — escalate/)).toBeVisible();
  }
}`,...W.parameters?.docs?.source},description:{story:`Over 30 minutes warns, over 60 escalates — the copy carries the word, not just color.`,...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    visits: []
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No arrivals yet')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Start a walk-in'
    }));
    await expect(args.onNewWalkIn).toHaveBeenCalled();
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'loading'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Loading today’s visits…')).toBeVisible();
    await expect(canvas.queryByRole('button', {
      name: /Resume check-in/
    })).not.toBeInTheDocument();
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'error'
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('The queue could not be loaded')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'New walk-in'
    })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Retry'
    }));
    await expect(args.onRetry).toHaveBeenCalled();
  }
}`,...q.parameters?.docs?.source},description:{story:`Load failure never blocks new walk-ins — the desk keeps working.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'offline',
    asOf: '09:12'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('You are offline')).toBeVisible();
    await expect(canvas.getByText(/from 09:12/)).toBeVisible();
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'stale',
    asOf: '09:12'
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Updated 09:12')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Refresh'
    }));
    await expect(args.onRefresh).toHaveBeenCalled();
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'denied'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No access to the desk queue')).toBeVisible();
    await expect(canvas.queryByRole('button', {
      name: 'New walk-in'
    })).not.toBeInTheDocument();
  }
}`,...X.parameters?.docs?.source},description:{story:`No reception capability: honest denial, no dead controls.`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  globals: {
    viewport: {
      value: 'kura320'
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Queue for phlebotomy'
    })).toBeVisible();
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  globals: {
    theme: 'dark'
  }
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  parameters: {
    kura: {
      flow: {
        pages: ['Clinic/Front Desk/Desk Queue', 'Clinic/Front Desk/Check-In Wizard', 'Clinic/Collection/Draw Worksheet']
      }
    }
  },
  render: () => <CheckInToQueueHarness />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Queue a resolved identity for phlebotomy — the action retires after one use.
    await userEvent.click(canvas.getByRole('button', {
      name: 'Queue for phlebotomy'
    }));
    await waitFor(async () => {
      await expect(canvas.queryByRole('button', {
        name: 'Queue for phlebotomy'
      })).not.toBeInTheDocument();
    });

    // A new walk-in opens the wizard from the queue.
    await userEvent.click(canvas.getByRole('button', {
      name: 'New walk-in'
    }));
    await expect(await canvas.findByText('Find or create a patient')).toBeVisible();
  }
}`,...$.parameters?.docs?.source},description:{story:`Reception terminal outcome (truth pack §5.6): identity resolved → visit on
the queue → queued for phlebotomy exactly once. The Collection mode's Draw
Worksheet owns the next step.`,...$.parameters?.docs?.description}}},ze=[`Default`,`IndependentAxes`,`LongWait`,`Empty`,`Loading`,`LoadError`,`Offline`,`Stale`,`AccessDenied`,`Mobile`,`DarkTheme`,`CheckInToQueueFlow`]}))();export{X as AccessDenied,$ as CheckInToQueueFlow,Q as DarkTheme,H as Default,G as Empty,U as IndependentAxes,q as LoadError,K as Loading,W as LongWait,Z as Mobile,J as Offline,Y as Stale,ze as __namedExportsOrder,Re as default};