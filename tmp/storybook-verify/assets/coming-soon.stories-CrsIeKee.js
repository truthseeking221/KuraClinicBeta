import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{t as n}from"./ui-C9kmmzkH.js";import{t as r}from"./button-B6_zsN5-.js";import{a as i}from"./collapsible-Cfc9M9oP.js";import{r as a,t as o}from"./readiness-data-D41RGqZh.js";import{i as s,n as c,o as l,r as u,t as d}from"./empty-state-DlAvBIIY.js";import{t as f}from"./empty-state-CV8fjtHa.js";var p,m,h=e((()=>{p=`_frame_178qh_1`,m={frame:p}}));function g({title:e,description:t,onBack:n}){return(0,_.jsx)(`div`,{className:m.frame,children:(0,_.jsxs)(d,{align:`center`,surface:`plain`,children:[(0,_.jsxs)(s,{children:[(0,_.jsx)(i,{size:`sm`,variant:`neutral`,children:`Planned`}),(0,_.jsx)(l,{children:e}),(0,_.jsxs)(u,{children:[t,` This surface is on the roadmap — no backend contract exists yet, so the prototype keeps it visibly unfinished instead of faking it.`]})]}),n?(0,_.jsx)(c,{children:(0,_.jsx)(r,{onClick:n,size:`sm`,variant:`secondary`,children:`Go back`})}):null]})})}var _,v=e((()=>{_=t(),n(),f(),h(),g.__docgenInfo={description:``,methods:[],displayName:`ComingSoonPage`,props:{title:{required:!0,tsType:{name:`string`},description:``},description:{required:!0,tsType:{name:`string`},description:``},onBack:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Back to real work — usually history back in the host app.`}}}})),y,b,x,S,C,w,T,E,D;e((()=>{a(),v(),{expect:y,fn:b,userEvent:x,within:S}=__STORYBOOK_MODULE_TEST__,C={title:`Clinic/Shell/Coming Soon`,component:g,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:{readiness:o.flows,intake:{decision:`COMPOSE`,owner:`src/components/shared/coming-soon`,evidence:`Honest roadmap teaser used by the prototype app for every planned-but-unbuilt surface. Composed from EmptyState, Badge, and Button; router-free so the host supplies the back action.`,exclusions:[`No illustration or marketing copy — deferred work must never look live.`]},responsive:{strategy:[`FLUID`],minimumWidth:320},journeys:[`prototype-planned-surface`]},docs:{description:{component:`The prototype’s honest teaser: names the surface, states that no backend contract exists yet, and routes back to real work. Pairs with the Release Readiness board — a planned surface stays visibly unfinished.`}}},args:{title:`Care plans`,description:`Longitudinal treatment plans with follow-up schedules.`,onBack:b()}},w={play:async({canvasElement:e,args:t})=>{let n=S(e);await y(n.getByText(`Planned`)).toBeVisible(),await y(n.getByText(`Care plans`)).toBeVisible(),await y(n.getByText(/no backend contract exists/)).toBeVisible(),await x.click(n.getByRole(`button`,{name:`Go back`})),await y(t.onBack).toHaveBeenCalled()}},T={args:{onBack:void 0},play:async({canvasElement:e})=>{let t=S(e);await y(t.queryByRole(`button`,{name:`Go back`})).not.toBeInTheDocument()}},E={parameters:{viewport:{defaultViewport:`kura320`}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Planned')).toBeVisible();
    await expect(canvas.getByText('Care plans')).toBeVisible();
    await expect(canvas.getByText(/no backend contract exists/)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Go back'
    }));
    await expect(args.onBack).toHaveBeenCalled();
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    onBack: undefined
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('button', {
      name: 'Go back'
    })).not.toBeInTheDocument();
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...E.parameters?.docs?.source}}},D=[`Planned`,`WithoutBackAction`,`Mobile320`]}))();export{E as Mobile320,w as Planned,T as WithoutBackAction,D as __namedExportsOrder,C as default};