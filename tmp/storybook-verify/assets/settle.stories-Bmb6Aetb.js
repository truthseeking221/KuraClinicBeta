import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{A as n,C as r,D as i,M as a,N as o,T as s,_ as c,b as l,g as u}from"./activity-ledger-Bx9EHPHU.js";import{a as d,r as f}from"./doctor-banking-5bnktGI2.js";import{n as p,t as m}from"./story-frame-T5OGBaiV.js";var h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j;e((()=>{h=t(),s(),d(),c(),p(),{expect:g,fn:_,userEvent:v,within:y}=__STORYBOOK_MODULE_TEST__,b={title:`Clinic/Finance/Earnings/Settle`,component:f,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:u},args:{overview:n,intent:null,state:`ready`,onBack:_(),onCreateKhqr:_(),onRegenerate:_(),onRefresh:_(),onRetry:_()},render:e=>(0,h.jsx)(m,{children:(0,h.jsx)(f,{...e})})},x={play:async({canvasElement:e,args:t})=>{let n=y(e);await v.click(n.getByRole(`button`,{name:`Create exact KHQR`})),await g(t.onCreateKhqr).toHaveBeenCalled()}},S={args:{intent:i},play:async({canvasElement:e,args:t})=>{let n=y(e);await g(n.getByText(`Awaiting confirmation`)).toBeVisible(),await v.click(n.getByRole(`button`,{name:`Check confirmation`})),await g(t.onRefresh).toHaveBeenCalled()}},C={args:{intent:r}},w={args:{intent:l}},T={args:{overview:o}},E={args:{overview:a}},D={args:{state:`loading`}},O={args:{state:`error`}},k={args:{state:`permission-denied`}},A={args:{intent:i},parameters:{viewport:{defaultViewport:`kura320`}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Create exact KHQR'
    }));
    await expect(args.onCreateKhqr).toHaveBeenCalled();
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    intent: pendingKhqr
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Awaiting confirmation')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Check confirmation'
    }));
    await expect(args.onRefresh).toHaveBeenCalled();
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    intent: expiredKhqr
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    intent: confirmedKhqr
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    overview: zeroOverview
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    overview: unavailableOverview
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'loading'
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'error'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'permission-denied'
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    intent: pendingKhqr
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...A.parameters?.docs?.source}}},j=[`ExactAmountRequired`,`AwaitingProviderConfirmation`,`ExpiredNeedsRegeneration`,`ProviderConfirmed`,`NothingDue`,`SignedAmountUnavailable`,`Loading`,`RecoverableFailure`,`PermissionDenied`,`Mobile320`]}))();export{S as AwaitingProviderConfirmation,x as ExactAmountRequired,C as ExpiredNeedsRegeneration,D as Loading,A as Mobile320,T as NothingDue,k as PermissionDenied,w as ProviderConfirmed,O as RecoverableFailure,E as SignedAmountUnavailable,j as __namedExportsOrder,b as default};