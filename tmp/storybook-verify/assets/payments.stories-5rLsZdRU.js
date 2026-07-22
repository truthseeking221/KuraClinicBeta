import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{E as n,O as r,T as i,_ as a,g as o,w as s,x as c}from"./activity-ledger-Bx9EHPHU.js";import{a as l,n as u}from"./doctor-banking-5bnktGI2.js";import{n as d,t as f}from"./story-frame-T5OGBaiV.js";var p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M;e((()=>{p=t(),i(),l(),a(),d(),{expect:m,fn:h,userEvent:g,within:_}=__STORYBOOK_MODULE_TEST__,v={title:`Clinic/Finance/Earnings/Auto-pay`,component:u,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:o},args:{mandate:n.linked,linkSession:null,state:`ready`,onBack:h(),onBeginLink:h(),onRegenerateLink:h(),onRenew:h(),onRetry:h(),onUnlink:h()},render:e=>(0,p.jsx)(f,{children:(0,p.jsx)(u,{...e})})},y={play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`Auto-pay active`)).toBeVisible(),await m(t.getByText(`ABA •••• 8842`)).toBeVisible()}},b={args:{mandate:n.unlinked},play:async({canvasElement:e,args:t})=>{let n=_(e),r=_(e.ownerDocument.body);await g.click(n.getByRole(`button`,{name:`Link ABA`})),await m(t.onBeginLink).toHaveBeenCalled(),await m(r.getByRole(`dialog`,{name:`Link ABA securely`})).toBeVisible(),await m(r.getByText(`Starting secure ABA link`)).toBeVisible()}},x={args:{mandate:n.link_pending,linkSession:r}},S={args:{mandate:n.link_pending,linkSession:s}},C={args:{mandate:n.link_pending,linkSession:c}},w={args:{mandate:n.renewal_required}},T={args:{mandate:n.expired}},E={args:{mandate:n.frozen}},D={args:{mandate:n.deleted}},O={args:{state:`loading`}},k={args:{state:`error`}},A={args:{state:`permission-denied`}},j={args:{mandate:n.unlinked},parameters:{viewport:{defaultViewport:`kura320`}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Auto-pay active')).toBeVisible();
    await expect(canvas.getByText('ABA •••• 8842')).toBeVisible();
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    mandate: mandateByState.unlinked
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const documentBody = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Link ABA'
    }));
    await expect(args.onBeginLink).toHaveBeenCalled();
    await expect(documentBody.getByRole('dialog', {
      name: 'Link ABA securely'
    })).toBeVisible();
    await expect(documentBody.getByText('Starting secure ABA link')).toBeVisible();
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    mandate: mandateByState.link_pending,
    linkSession: pendingLinkSession
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    mandate: mandateByState.link_pending,
    linkSession: expiredLinkSession
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    mandate: mandateByState.link_pending,
    linkSession: confirmedLinkSession
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    mandate: mandateByState.renewal_required
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    mandate: mandateByState.expired
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    mandate: mandateByState.frozen
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    mandate: mandateByState.deleted
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'loading'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'error'
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'permission-denied'
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    mandate: mandateByState.unlinked
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...j.parameters?.docs?.source}}},M=[`Linked`,`Unlinked`,`LinkPendingProviderConfirmation`,`LinkSessionExpired`,`LinkProviderConfirmed`,`RenewalRequired`,`AuthorizationExpired`,`CollectionFrozen`,`AuthorizationDeleted`,`Loading`,`RecoverableFailure`,`PermissionDenied`,`Mobile320`]}))();export{D as AuthorizationDeleted,T as AuthorizationExpired,E as CollectionFrozen,x as LinkPendingProviderConfirmation,C as LinkProviderConfirmed,S as LinkSessionExpired,y as Linked,O as Loading,j as Mobile320,A as PermissionDenied,k as RecoverableFailure,w as RenewalRequired,b as Unlinked,M as __namedExportsOrder,v as default};