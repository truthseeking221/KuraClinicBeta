import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{Lt as n,T as r,Wt as ee,b as i,qt as a,s as o}from"./provider-marks-BeHzyBjc.js";import{t as s}from"./ui-C9kmmzkH.js";import{t as c}from"./skeleton-yGvKPj3C.js";import{t as l}from"./button-B6_zsN5-.js";import{a as u}from"./collapsible-Cfc9M9oP.js";import{t as d}from"./card-DMMaaphC.js";import{r as f,t as p}from"./readiness-data-D41RGqZh.js";import{a as m,c as te,g as h,h as g,i as _}from"./demo-data-BfkfVfOx.js";import{n as v,r as y}from"./home-signal-row-Bw7Sq9dR.js";var b,x,S,C,w,T,E,D,O,k,A,j=e((()=>{b=`_tile_1m5zi_6`,x=`_chip_1m5zi_21`,S=`_label_1m5zi_33`,C=`_valueRow_1m5zi_34`,w=`_detail_1m5zi_35`,T=`_value_1m5zi_34`,E=`_action_1m5zi_79`,D=`_retry_1m5zi_133`,O=`_valueSkeleton_1m5zi_139`,k=`_detailSkeleton_1m5zi_144`,A={tile:b,chip:x,label:S,valueRow:C,detail:w,value:T,action:E,retry:D,valueSkeleton:O,detailSkeleton:k}}));function M({signalKey:e}){let t=L[e];return t?(0,F.jsx)(`span`,{"aria-hidden":`true`,className:A.chip,children:t}):null}function N({action:e,className:t,onNavigate:n}){return(0,F.jsxs)(`a`,{className:t,href:`#${e.targetKey}`,onClick:t=>{n&&(t.preventDefault(),n(e.targetKey))},children:[e.label,(0,F.jsx)(r,{"aria-hidden":`true`,size:14})]})}function P({signal:e,onNavigate:t,onRetry:n}){return e.state===`loading`?(0,F.jsxs)(d,{as:`div`,className:A.tile,children:[(0,F.jsx)(M,{signalKey:e.key}),(0,F.jsx)(`p`,{className:A.label,children:e.title}),(0,F.jsx)(c,{className:A.valueSkeleton,shape:`text`}),(0,F.jsx)(c,{className:A.detailSkeleton,shape:`text`})]}):e.state===`error`?(0,F.jsxs)(d,{as:`div`,className:A.tile,children:[(0,F.jsx)(M,{signalKey:e.key}),(0,F.jsx)(`p`,{className:A.label,children:e.title}),(0,F.jsx)(`p`,{className:A.detail,children:e.errorMessage??`Could not load.`}),(0,F.jsx)(l,{className:A.retry,onClick:()=>n?.(e.key),variant:`outline`,children:`Retry`})]}):(0,F.jsxs)(d,{as:`div`,className:A.tile,"data-tone":e.tone,children:[(0,F.jsx)(M,{signalKey:e.key}),(0,F.jsx)(`p`,{className:A.label,children:e.title}),(0,F.jsxs)(`p`,{className:A.valueRow,children:[(0,F.jsx)(`span`,{className:A.value,children:(0,F.jsx)(v,{signal:e})}),e.tone!==`neutral`&&e.toneLabel?(0,F.jsx)(u,{appearance:`soft`,size:`sm`,variant:I[e.tone],children:e.toneLabel}):null]}),(0,F.jsx)(`p`,{className:A.detail,children:e.detail}),e.action?(0,F.jsx)(N,{action:e.action,className:A.action,onNavigate:t}):null]})}var F,I,L,R=e((()=>{F=t(),s(),y(),j(),I={attention:`warning`,critical:`danger`},L={results:(0,F.jsx)(i,{"aria-hidden":`true`,size:18}),bookings:(0,F.jsx)(o,{"aria-hidden":`true`,size:18}),patients:(0,F.jsx)(ee,{"aria-hidden":`true`,size:18}),pickup:(0,F.jsx)(n,{"aria-hidden":`true`,size:18}),earnings:(0,F.jsx)(a,{"aria-hidden":`true`,size:18})},P.__docgenInfo={description:`The stat-tile composition: one lifecycle axis as a flat grey tray with a
white icon chip, a loud count, its evidence sentence, and the deep link into
the surface that owns the work. The link stretches over the tray, so the
whole tile is the target while the accessible name stays the outcome label.

Reach for it only where peer metrics need a stable comparison boundary. Home
itself renders its signals as rows — a tray needs a functional reason, and
"these counts are related" is not one.`,methods:[],displayName:`HomeSignalTile`,props:{signal:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  key: string;
  kind: 'worklist' | 'info';
  title: string;
  /** Loud number for countable work. Zero renders as zero, not as blank. */
  count?: number;
  /** Loud non-numeric value, e.g. a pickup window "16:40". */
  headline?: string;
  /** Loud money value in minor units as a digit string (money law: minor units, ×100). */
  moneyMinor?: string;
  currency?: 'USD' | 'KHR';
  /** Evidence sentence under the value — what changes the next decision. */
  detail: string;
  tone: SignalTone;
  /** Text cue that must accompany a non-neutral tone. Color is never the only signal. */
  toneLabel?: string;
  state: SignalState;
  /** Plain-language failure shown with the retry action when state is \`error\`. */
  errorMessage?: string;
  /** Patient-level preview supplied only for the Results review lifecycle axis. */
  reviewItems?: ResultReviewQueueEntry[];
  /** Patient-level preview for a non-Results work queue. */
  workItems?: HomeWorkQueueEntry[];
  /** Outcome-labelled deep link into the owning surface's nav key. */
  action?: { label: string; targetKey: string };
}`,signature:{properties:[{key:`key`,value:{name:`string`,required:!0}},{key:`kind`,value:{name:`union`,raw:`'worklist' | 'info'`,elements:[{name:`literal`,value:`'worklist'`},{name:`literal`,value:`'info'`}],required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`count`,value:{name:`number`,required:!1},description:`Loud number for countable work. Zero renders as zero, not as blank.`},{key:`headline`,value:{name:`string`,required:!1},description:`Loud non-numeric value, e.g. a pickup window "16:40".`},{key:`moneyMinor`,value:{name:`string`,required:!1},description:`Loud money value in minor units as a digit string (money law: minor units, ×100).`},{key:`currency`,value:{name:`union`,raw:`'USD' | 'KHR'`,elements:[{name:`literal`,value:`'USD'`},{name:`literal`,value:`'KHR'`}],required:!1}},{key:`detail`,value:{name:`string`,required:!0},description:`Evidence sentence under the value — what changes the next decision.`},{key:`tone`,value:{name:`union`,raw:`'neutral' | 'attention' | 'critical'`,elements:[{name:`literal`,value:`'neutral'`},{name:`literal`,value:`'attention'`},{name:`literal`,value:`'critical'`}],required:!0}},{key:`toneLabel`,value:{name:`string`,required:!1},description:`Text cue that must accompany a non-neutral tone. Color is never the only signal.`},{key:`state`,value:{name:`union`,raw:`'ready' | 'loading' | 'error'`,elements:[{name:`literal`,value:`'ready'`},{name:`literal`,value:`'loading'`},{name:`literal`,value:`'error'`}],required:!0}},{key:`errorMessage`,value:{name:`string`,required:!1},description:"Plain-language failure shown with the retry action when state is `error`."},{key:`reviewItems`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  patient: ResultsPatient;
  testName: string;
  returnedLabel: string;
  status: ResultReviewQueueStatus;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`patient`,value:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  dob: string;
  sexAtBirth: string;
  medicalRecordNumber: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`dob`,value:{name:`string`,required:!0}},{key:`sexAtBirth`,value:{name:`string`,required:!0}},{key:`medicalRecordNumber`,value:{name:`string`,required:!0}}]},required:!0}},{key:`testName`,value:{name:`string`,required:!0}},{key:`returnedLabel`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`'routine' | 'abnormal' | 'critical' | 'amended'`,elements:[{name:`literal`,value:`'routine'`},{name:`literal`,value:`'abnormal'`},{name:`literal`,value:`'critical'`},{name:`literal`,value:`'amended'`}],required:!0}}]}}],raw:`ResultReviewQueueEntry[]`,required:!1},description:`Patient-level preview supplied only for the Results review lifecycle axis.`},{key:`workItems`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  patient: {
    id: string;
    name: string;
    medicalRecordNumber: string;
    dob: string;
  };
  /** The work that needs attention, with timing when it changes priority. */
  reason: string;
  /** Supporting context that helps disambiguate the work item. */
  context?: string;
  status?: { label: string; tone: HomeWorkQueueTone };
  disabled?: boolean;
  unavailableReason?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`patient`,value:{name:`signature`,type:`object`,raw:`{
  id: string;
  name: string;
  medicalRecordNumber: string;
  dob: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`medicalRecordNumber`,value:{name:`string`,required:!0}},{key:`dob`,value:{name:`string`,required:!0}}]},required:!0}},{key:`reason`,value:{name:`string`,required:!0},description:`The work that needs attention, with timing when it changes priority.`},{key:`context`,value:{name:`string`,required:!1},description:`Supporting context that helps disambiguate the work item.`},{key:`status`,value:{name:`signature`,type:`object`,raw:`{ label: string; tone: HomeWorkQueueTone }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`tone`,value:{name:`union`,raw:`'neutral' | 'attention' | 'critical' | 'info'`,elements:[{name:`literal`,value:`'neutral'`},{name:`literal`,value:`'attention'`},{name:`literal`,value:`'critical'`},{name:`literal`,value:`'info'`}],required:!0}}]},required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`unavailableReason`,value:{name:`string`,required:!1}}]}}],raw:`HomeWorkQueueEntry[]`,required:!1},description:`Patient-level preview for a non-Results work queue.`},{key:`action`,value:{name:`signature`,type:`object`,raw:`{ label: string; targetKey: string }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`targetKey`,value:{name:`string`,required:!0}}]},required:!1},description:`Outcome-labelled deep link into the owning surface's nav key.`}]}},description:``},onNavigate:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(targetKey: string) => void`,signature:{arguments:[{type:{name:`string`},name:`targetKey`}],return:{name:`void`}}},description:``},onRetry:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(signalKey: string) => void`,signature:{arguments:[{type:{name:`string`},name:`signalKey`}],return:{name:`void`}}},description:``}}}}));function z(e,t){let n=e.signals.find(e=>e.key===t);if(!n)throw Error(`Missing Home signal fixture: ${t}`);return n}var B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{B=t(),te(),R(),f(),{expect:V,fn:H,userEvent:U,within:W}=__STORYBOOK_MODULE_TEST__,G={title:`Clinic/Clinical/Home/Signal tile`,component:P,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`centered`,kura:{readiness:p.home,intake:{decision:`DOMAIN-ADAPT`,owner:`src/features/home`,hierarchy:`Molecule`,evidence:`Home signals own domain priority, count freshness, and deep-link semantics while the tray surface, radius, and elevation stay owned by Design System/Components/Card.`,exclusions:[`The tile never reviews results, changes bookings, edits patients, or performs licence actions.`,`Tray, tile, and outline surfaces remain owned by Design System/Components/Card.`]},contract:{status:`design-target`,backendMapping:`pending-home-read-model`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura-card-surface`,elevation:`none`,responsive:`auto-fit-strip`}}},args:{signal:z(m,`bookings`),onNavigate:H(),onRetry:H()},render:e=>(0,B.jsx)(`ul`,{role:`list`,style:{listStyle:`none`,margin:0,padding:0,width:`17rem`},children:(0,B.jsx)(`li`,{children:(0,B.jsx)(P,{...e})})})},K={play:async({canvasElement:e,args:t})=>{let n=W(e).getByRole(`link`,{name:/Review bookings/});await U.tab(),await V(n).toHaveFocus(),await U.click(n),await V(t.onNavigate).toHaveBeenCalledWith(`bookings`)}},q={args:{signal:z(g,`bookings`)},play:async({canvasElement:e})=>{let t=W(e);await V(t.getByText(`Bookings`)).toBeVisible(),await V(t.queryByRole(`link`)).not.toBeInTheDocument()}},J={args:{signal:{...z(m,`bookings`),state:`error`,errorMessage:`Bookings could not load.`}},play:async({canvasElement:e,args:t})=>{let n=W(e);await U.click(n.getByRole(`button`,{name:`Retry`})),await V(t.onRetry).toHaveBeenCalledWith(`bookings`)}},Y={args:{signal:z(_,`bookings`)},play:async({canvasElement:e})=>{let t=W(e);await V(t.getByText(`0`)).toBeVisible()}},X={args:{signal:z(h,`bookings`)}},Z={parameters:{viewport:{defaultViewport:`kura320`}},args:{signal:z(h,`bookings`)}},Q={render:e=>(0,B.jsxs)(`ul`,{role:`list`,style:{display:`grid`,gap:`var(--space-4)`,gridTemplateColumns:`repeat(2, 15rem)`,listStyle:`none`,margin:0,padding:0},children:[(0,B.jsx)(`li`,{children:(0,B.jsx)(P,{...e,signal:z(m,`bookings`)})}),(0,B.jsx)(`li`,{children:(0,B.jsx)(P,{...e,signal:z(m,`patients`)})})]})},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', {
      name: /Review bookings/
    });
    await userEvent.tab();
    await expect(link).toHaveFocus();
    await userEvent.click(link);
    await expect(args.onNavigate).toHaveBeenCalledWith('bookings');
  }
}`,...K.parameters?.docs?.source},description:{story:`Aggregate operational work may use a stat tile when item identity is not required here.`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    signal: signal(demo.loading, 'bookings')
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Bookings')).toBeVisible();
    await expect(canvas.queryByRole('link')).not.toBeInTheDocument();
  }
}`,...q.parameters?.docs?.source},description:{story:`The axis title stays readable while its count loads.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    signal: {
      ...signal(demo.busyMorning, 'bookings'),
      state: 'error',
      errorMessage: 'Bookings could not load.'
    }
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Retry'
    }));
    await expect(args.onRetry).toHaveBeenCalledWith('bookings');
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    signal: signal(demo.allCaughtUp, 'bookings')
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('0')).toBeVisible();
  }
}`,...Y.parameters?.docs?.source},description:{story:`Zero renders as zero: a cleared axis is a fact, not a blank.`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    signal: signal(demo.longContent, 'bookings')
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  args: {
    signal: signal(demo.longContent, 'bookings')
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: args => <ul role="list" style={{
    display: 'grid',
    gap: 'var(--space-4)',
    gridTemplateColumns: 'repeat(2, 15rem)',
    listStyle: 'none',
    margin: 0,
    padding: 0
  }}>
      <li>
        <HomeSignalTile {...args} signal={signal(demo.busyMorning, 'bookings')} />
      </li>
      <li>
        <HomeSignalTile {...args} signal={signal(demo.busyMorning, 'patients')} />
      </li>
    </ul>
}`,...Q.parameters?.docs?.source},description:{story:`Two tiles side by side: the only arrangement that earns the tray boundary.`,...Q.parameters?.docs?.description}}},$=[`ReadyWorkCount`,`Loading`,`ErrorAndRetry`,`ZeroValue`,`LongContent`,`MobileWidth320`,`PeerMetrics`]}))();export{J as ErrorAndRetry,q as Loading,X as LongContent,Z as MobileWidth320,Q as PeerMetrics,K as ReadyWorkCount,Y as ZeroValue,$ as __namedExportsOrder,G as default};