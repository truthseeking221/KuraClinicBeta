import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{a as n,b as r,c as i,g as a,h as o,o as s}from"./demo-data-BfkfVfOx.js";import{n as c,t as l}from"./home-result-review-preview-Q7mu57-c.js";import{n as u,t as d}from"./storybook-metadata-CTVyefy3.js";function f(e){let t=e.signals.find(e=>e.key===`results`);if(!t)throw Error(`Missing Results signal fixture.`);return t}var p,m,h,g,_,v,y,b,x,S,C,w,T,E;e((()=>{p=t(),i(),c(),u(),{expect:m,fn:h,userEvent:g,within:_}=__STORYBOOK_MODULE_TEST__,v={title:`Clinic/Clinical/Home/Result review preview`,component:l,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`centered`,kura:{...d,intake:{decision:`COMPOSE`,owner:`src/features/home`,evidence:`Home composes Card, ItemGroup, and the Results-owned ReviewQueueItem so a work count never hides patient identity.`,exclusions:[`Home does not own analyte review or acknowledgement.`,`The preview never reduces patient work to a stat tile.`]},hierarchy:{level:`Organism`,children:[`Card`,`ItemGroup`,`ResultReviewQueueItem`]}}},args:{signal:f(n),onNavigate:h(),onRetry:h()},render:e=>(0,p.jsx)(`div`,{style:{width:`min(44rem, calc(100vw - 2rem))`},children:(0,p.jsx)(l,{...e})})},y={play:async({args:e,canvasElement:t})=>{let n=_(t),r=n.getByRole(`list`,{name:`Patients with results to review`});await m(_(r).getAllByRole(`listitem`)).toHaveLength(5),await m(n.getByText(`Dara Phally`)).toBeVisible(),await m(n.getByText(`Maly Sok`)).toBeVisible(),await g.click(n.getByRole(`link`,{name:/Dara Phally/})),await m(e.onNavigate).toHaveBeenCalledWith(`results`)}},b={args:{signal:f(s)}},x={args:{signal:f(o)}},S={args:{signal:f(r)},play:async({args:e,canvasElement:t})=>{await g.click(_(t).getByRole(`button`,{name:`Retry`})),await m(e.onRetry).toHaveBeenCalledWith(`results`)}},C={args:{signal:{...f(n),reviewItems:void 0}}},w={args:{signal:f(a)}},T={parameters:{viewport:{defaultViewport:`kura320`}},args:w.args},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole('list', {
      name: 'Patients with results to review'
    });
    await expect(within(list).getAllByRole('listitem')).toHaveLength(5);
    await expect(canvas.getByText('Dara Phally')).toBeVisible();
    await expect(canvas.getByText('Maly Sok')).toBeVisible();
    await userEvent.click(canvas.getByRole('link', {
      name: /Dara Phally/
    }));
    await expect(args.onNavigate).toHaveBeenCalledWith('results');
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    signal: resultsSignal(demo.criticalDay)
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    signal: resultsSignal(demo.loading)
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    signal: resultsSignal(demo.partialData)
  },
  play: async ({
    args,
    canvasElement
  }) => {
    await userEvent.click(within(canvasElement).getByRole('button', {
      name: 'Retry'
    }));
    await expect(args.onRetry).toHaveBeenCalledWith('results');
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    signal: {
      ...resultsSignal(demo.busyMorning),
      reviewItems: undefined
    }
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    signal: resultsSignal(demo.longContent)
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  args: LongContent.args
}`,...T.parameters?.docs?.source}}},E=[`FivePatients`,`CriticalFirst`,`Loading`,`ErrorAndRetry`,`MissingPatientDetails`,`LongContent`,`MobileWidth320`]}))();export{b as CriticalFirst,S as ErrorAndRetry,y as FivePatients,x as Loading,w as LongContent,C as MissingPatientDetails,T as MobileWidth320,E as __namedExportsOrder,v as default};