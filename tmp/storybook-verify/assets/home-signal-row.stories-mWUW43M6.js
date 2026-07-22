import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{r as n,t as r}from"./readiness-data-D41RGqZh.js";import{a as i,c as a,g as o,h as s,i as c}from"./demo-data-BfkfVfOx.js";import{r as l,t as u}from"./home-signal-row-Bw7Sq9dR.js";function d(e,t){let n=e.signals.find(e=>e.key===t);if(!n)throw Error(`Missing Home signal fixture: ${t}`);return n}var f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D;e((()=>{f=t(),a(),l(),n(),{expect:p,fn:m,userEvent:h,within:g}=__STORYBOOK_MODULE_TEST__,_={title:`Clinic/Clinical/Home/Signal row`,component:u,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`centered`,kura:{readiness:r.home,intake:{decision:`FEATURE-OWN`,owner:`src/features/home`,hierarchy:`Molecule`,evidence:`A signal count and its evidence sentence need no container. The row groups through proximity, alignment, and typography, so Home spends its one tray on the results preview.`,exclusions:[`The row never reviews results, changes bookings, edits patients, or performs licence actions.`,`Hover, focus, and radius values come from Kura tokens only.`]},contract:{status:`design-target`,backendMapping:`pending-home-read-model`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura-control-compact`,elevation:`none`,responsive:`stacking-row`}}},args:{signal:d(i,`bookings`),onNavigate:m(),onRetry:m()},render:e=>(0,f.jsx)(`ul`,{role:`list`,style:{listStyle:`none`,margin:0,padding:0,width:`22rem`},children:(0,f.jsx)(`li`,{children:(0,f.jsx)(u,{...e})})})},v={play:async({canvasElement:e,args:t})=>{let n=g(e).getByRole(`link`,{name:/Bookings/});await h.click(n),await p(t.onNavigate).toHaveBeenCalledWith(`bookings`)}},y={args:{signal:{...d(i,`bookings`),tone:`critical`,toneLabel:`Critical`,detail:`1 booking missed a STAT repeat.`}},play:async({canvasElement:e})=>{let t=g(e);await p(t.getByText(`Critical`)).toBeVisible()}},b={args:{signal:d(i,`earnings`)}},x={args:{signal:d(i,`pickup`)}},S={args:{signal:d(c,`bookings`)},play:async({canvasElement:e})=>{let t=g(e);await p(t.getByText(`0`)).toBeVisible()}},C={args:{signal:d(s,`bookings`)},play:async({canvasElement:e})=>{let t=g(e);await p(t.getByText(`Bookings`)).toBeVisible(),await p(t.queryByRole(`link`)).not.toBeInTheDocument()}},w={args:{signal:{...d(i,`bookings`),state:`error`,errorMessage:`Bookings could not load.`}},play:async({canvasElement:e,args:t})=>{let n=g(e);await h.click(n.getByRole(`button`,{name:`Retry`})),await p(t.onRetry).toHaveBeenCalledWith(`bookings`)}},T={args:{signal:d(o,`bookings`)}},E={parameters:{viewport:{defaultViewport:`kura320`}},args:{signal:d(o,`earnings`)}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', {
      name: /Bookings/
    });
    await userEvent.click(link);
    await expect(args.onNavigate).toHaveBeenCalledWith('bookings');
  }
}`,...v.parameters?.docs?.source},description:{story:`The whole row is the deep link into the surface that owns the work.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    signal: {
      ...signal(demo.busyMorning, 'bookings'),
      tone: 'critical',
      toneLabel: 'Critical',
      detail: '1 booking missed a STAT repeat.'
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Critical')).toBeVisible();
  }
}`,...y.parameters?.docs?.source},description:{story:`Tone never travels on colour alone: the Badge carries the word.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    signal: signal(demo.busyMorning, 'earnings')
  }
}`,...b.parameters?.docs?.source},description:{story:`Money always renders through MoneyText, in minor units.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    signal: signal(demo.busyMorning, 'pickup')
  }
}`,...x.parameters?.docs?.source},description:{story:`A non-numeric headline: the next pickup window.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    signal: signal(demo.allCaughtUp, 'bookings')
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('0')).toBeVisible();
  }
}`,...S.parameters?.docs?.source},description:{story:`Zero renders as zero: a cleared axis is a fact, not a blank.`,...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source},description:{story:`The title stays readable while its value loads, and offers no link.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    signal: signal(demo.longContent, 'bookings')
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  args: {
    signal: signal(demo.longContent, 'earnings')
  }
}`,...E.parameters?.docs?.source}}},D=[`WorkCount`,`CriticalTone`,`MoneyValue`,`TimeWindowValue`,`ZeroValue`,`Loading`,`ErrorAndRetry`,`LongContent`,`MobileWidth320`]}))();export{y as CriticalTone,w as ErrorAndRetry,C as Loading,T as LongContent,E as MobileWidth320,b as MoneyValue,x as TimeWindowValue,v as WorkCount,S as ZeroValue,D as __namedExportsOrder,_ as default};