import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{a as n,c as r,g as i,n as a,t as o}from"./demo-data-BfkfVfOx.js";import{n as s,t as c}from"./home-work-queue-preview-_tDgIK4H.js";import{n as l,t as u}from"./storybook-metadata-CTVyefy3.js";function d(e,t=n){let r=t.signals.find(t=>t.key===e);if(!r)throw Error(`Missing ${e} signal fixture.`);return r}var f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D;e((()=>{f=t(),r(),s(),l(),{expect:p,fn:m,userEvent:h,within:g}=__STORYBOOK_MODULE_TEST__,_={title:`Clinic/Clinical/Home/Work queue preview`,component:c,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`centered`,kura:{...u,intake:{decision:`COMPOSE`,owner:`src/features/home`,evidence:`Home composes the canonical ItemGroup and Item anatomy so actionable booking and patient counts retain patient identity, reason, timing, and a whole-row route into the owning surface.`,exclusions:[`Home does not edit a booking or patient record.`,`Results keeps its own safety-specific ResultReviewQueueItem contract.`,`The preview is not a statistic row, table, or standalone Card.`]},hierarchy:{level:`Organism`,children:[`ItemGroup`,`Item`,`Avatar`,`Badge`]}},docs:{description:{component:`A patient-identifiable preview for Home work queues. Use it when a count represents actionable people; use HomeSignalRow only for passive operational context.`}}},args:{signal:d(`bookings`),onNavigate:m(),onOpenItem:m(),onRetry:m()},render:e=>(0,f.jsx)(`div`,{style:{width:`min(44rem, calc(100vw - 2rem))`},children:(0,f.jsx)(c,{...e})})},v={play:async({args:e,canvasElement:t})=>{let n=g(t).getByRole(`list`,{name:`Bookings work queue`});await p(g(n).getAllByRole(`listitem`)).toHaveLength(3),await p(g(n).getByText(`Sokha Chan`)).toBeVisible(),await p(g(n).getByText(/T2DM review/)).toBeVisible(),await h.click(g(n).getByRole(`link`,{name:/Sokha Chan/})),await p(e.onOpenItem).toHaveBeenCalledWith(`bookings`,o[0])}},y={args:{signal:d(`patients`)},play:async({canvasElement:e})=>{let t=g(e).getByRole(`list`,{name:`Patients work queue`});await p(g(t).getByText(`Vicheka Sam`)).toBeVisible(),await p(g(t).getByText(`HbA1c rising across 2 visits`)).toBeVisible()}},b={args:{signal:{...d(`bookings`),state:`loading`}},play:async({canvasElement:e})=>{await p(g(e).queryByRole(`link`)).not.toBeInTheDocument()}},x={args:{signal:{...d(`bookings`),state:`error`,errorMessage:`Bookings could not load.`}},play:async({args:e,canvasElement:t})=>{await h.click(g(t).getByRole(`button`,{name:`Retry`})),await p(e.onRetry).toHaveBeenCalledWith(`bookings`)}},S={args:{signal:{...d(`bookings`),workItems:void 0}}},C={args:{signal:{...d(`bookings`),count:0,detail:`No bookings need attention.`,workItems:[]}}},w={args:{signal:{...d(`patients`),workItems:[{...a[0],disabled:!0,unavailableReason:`Ask a clinic administrator for Patients access.`}]}},play:async({canvasElement:e})=>{let t=g(e);await p(t.getByText(/Ask a clinic administrator/)).toBeVisible(),await p(t.queryByRole(`link`,{name:/Vicheka Sam/})).not.toBeInTheDocument()}},T={args:{signal:d(`bookings`,i)}},E={parameters:{viewport:{defaultViewport:`kura320`}},args:T.args},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const queue = canvas.getByRole('list', {
      name: 'Bookings work queue'
    });
    await expect(within(queue).getAllByRole('listitem')).toHaveLength(3);
    await expect(within(queue).getByText('Sokha Chan')).toBeVisible();
    await expect(within(queue).getByText(/T2DM review/)).toBeVisible();
    await userEvent.click(within(queue).getByRole('link', {
      name: /Sokha Chan/
    }));
    await expect(args.onOpenItem).toHaveBeenCalledWith('bookings', demo.BOOKING_WORK_QUEUE[0]);
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    signal: workSignal('patients')
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const queue = canvas.getByRole('list', {
      name: 'Patients work queue'
    });
    await expect(within(queue).getByText('Vicheka Sam')).toBeVisible();
    await expect(within(queue).getByText('HbA1c rising across 2 visits')).toBeVisible();
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    signal: {
      ...workSignal('bookings'),
      state: 'loading'
    }
  },
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).queryByRole('link')).not.toBeInTheDocument();
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    signal: {
      ...workSignal('bookings'),
      state: 'error',
      errorMessage: 'Bookings could not load.'
    }
  },
  play: async ({
    args,
    canvasElement
  }) => {
    await userEvent.click(within(canvasElement).getByRole('button', {
      name: 'Retry'
    }));
    await expect(args.onRetry).toHaveBeenCalledWith('bookings');
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    signal: {
      ...workSignal('bookings'),
      workItems: undefined
    }
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    signal: {
      ...workSignal('bookings'),
      count: 0,
      detail: 'No bookings need attention.',
      workItems: []
    }
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    signal: {
      ...workSignal('patients'),
      workItems: [{
        ...demo.PATIENT_REVIEW_QUEUE[0],
        disabled: true,
        unavailableReason: 'Ask a clinic administrator for Patients access.'
      }]
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Ask a clinic administrator/)).toBeVisible();
    await expect(canvas.queryByRole('link', {
      name: /Vicheka Sam/
    })).not.toBeInTheDocument();
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    signal: workSignal('bookings', demo.longContent)
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  args: LongContent.args
}`,...E.parameters?.docs?.source}}},D=[`Bookings`,`Patients`,`Loading`,`ErrorAndRetry`,`MissingPatientDetails`,`Empty`,`PermissionRestrictedItem`,`LongContent`,`MobileWidth320`]}))();export{v as Bookings,C as Empty,x as ErrorAndRetry,b as Loading,T as LongContent,S as MissingPatientDetails,E as MobileWidth320,y as Patients,w as PermissionRestrictedItem,D as __namedExportsOrder,_ as default};