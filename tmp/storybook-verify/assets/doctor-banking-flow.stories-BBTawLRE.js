import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{r as i,t as a}from"./readiness-data-D41RGqZh.js";import{D as o,T as s,_ as c,b as l,g as u,k as d}from"./activity-ledger-Bx9EHPHU.js";import{n as f,t as p}from"./earnings-workspace-D1c50viq.js";import{n as m,t as h}from"./story-frame-T5OGBaiV.js";function g(){let[e,t]=(0,v.useState)(`overview`),[n,r]=(0,v.useState)(null);return(0,_.jsx)(h,{onNavigate:e=>e===`earnings`&&t(`overview`),children:(0,_.jsx)(p,{data:d,intent:n,onCreateKhqr:()=>r(o),onNavigate:t,onRefresh:()=>r(l),onRegenerate:()=>r(o),route:e})})}var _,v,y,b,x,S,C,w,T,E;t((()=>{_=r(),v=e(n()),i(),s(),f(),c(),m(),{expect:y,userEvent:b,waitFor:x,within:S}=__STORYBOOK_MODULE_TEST__,C={title:`Clinic/Flows/Earnings Settlement`,component:g,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:{...u,readiness:a.flows,flow:{pages:[`Clinic/Finance/Earnings/Overview`,`Clinic/Finance/Earnings/Settle`],terminal:`The exact KHQR amount is provider-confirmed and applied to the ledger`},journeys:[`doctor-red-balance-to-provider-confirmed-khqr`]},docs:{description:{component:`Executable doctor-owned settlement journey. It routes from the signed person-global balance to an immutable exact-amount KHQR request, waits for provider confirmation, and ends only after the provider-confirmed success state appears.`}}}},w={play:async({canvasElement:e})=>{let t=S(e);await y(t.getByRole(`heading`,{name:`Earnings`})).toBeVisible(),await b.click(t.getByRole(`button`,{name:`Settle now`})),await x(async()=>{await y(t.getByRole(`heading`,{name:`Settle balance`})).toBeVisible()}),await b.click(t.getByRole(`button`,{name:`Create exact KHQR`})),await y(t.getByText(`Awaiting confirmation`)).toBeVisible(),await b.click(t.getByRole(`button`,{name:`Check confirmation`})),await x(async()=>{await y(t.getByText(`Settlement confirmed`)).toBeVisible()}),await y(t.getByText(`$48.60`)).toBeVisible()}},T={parameters:{viewport:{defaultViewport:`kura320`}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Earnings'
    })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Settle now'
    }));
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', {
        name: 'Settle balance'
      })).toBeVisible();
    });
    await userEvent.click(canvas.getByRole('button', {
      name: 'Create exact KHQR'
    }));
    await expect(canvas.getByText('Awaiting confirmation')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Check confirmation'
    }));
    await waitFor(async () => {
      await expect(canvas.getByText('Settlement confirmed')).toBeVisible();
    });
    await expect(canvas.getByText('$48.60')).toBeVisible();
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...T.parameters?.docs?.source}}},E=[`RedBalanceToConfirmedKhqr`,`Mobile320`]}))();export{T as Mobile320,w as RedBalanceToConfirmedKhqr,E as __namedExportsOrder,C as default};