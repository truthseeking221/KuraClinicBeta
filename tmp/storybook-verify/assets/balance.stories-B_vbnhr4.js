import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{M as n,N as r,S as i,T as a,_ as o,g as s,k as c,v as l}from"./activity-ledger-Bx9EHPHU.js";import{a as u,t as d}from"./doctor-banking-5bnktGI2.js";import{n as f,t as p}from"./story-frame-T5OGBaiV.js";var m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M;e((()=>{m=t(),a(),u(),o(),f(),{expect:h,fn:g,userEvent:_,within:v}=__STORYBOOK_MODULE_TEST__,y={title:`Clinic/Finance/Earnings/Overview`,component:d,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:s,docs:{description:{component:`Person-global doctor ledger composed from canonical Kura MoneyText, DataGrid, Alert, Badge, and AppShell. The overview shows the signed balance, pending movements, scheduled collections, and recent activity; search, filters, and downloads live on Activity & statements. ReUI contributes grid architecture only; all amounts, states, permissions, and actions follow the pinned doctor-banking contract.`}}},args:{data:i,state:`ready`,onManageAutoPay:g(),onOpenLicence:g(),onOpenStatements:g(),onRetry:g(),onSettle:g()},render:e=>(0,m.jsx)(p,{children:(0,m.jsx)(d,{...e})})},b={play:async({canvasElement:e,args:t})=>{let n=v(e);await h(n.getByRole(`heading`,{name:`Earnings`})).toBeVisible(),await h(n.getByText(`Earned this period`)).toBeVisible(),await h(n.getByText(`Kura owes you`)).toBeVisible(),await h(n.getByText(`Auto-pay active · ABA •••• 8842`)).toBeVisible(),await h(n.getByRole(`table`,{name:`Earnings activity`})).toBeVisible(),await _.click(n.getByRole(`button`,{name:`View all`})),await h(t.onOpenStatements).toHaveBeenCalled()}},x={args:{data:c},play:async({canvasElement:e,args:t})=>{let n=v(e);await h(n.getByText(`You owe Kura`)).toBeVisible(),await _.click(n.getByRole(`button`,{name:`Settle now`})),await h(t.onSettle).toHaveBeenCalled()}},S={args:{data:{...i,overview:r}},play:async({canvasElement:e})=>{let t=v(e);await h(t.getByText(`Settled balance`)).toBeVisible(),await h(t.queryByRole(`button`,{name:`Settle now`})).not.toBeInTheDocument()}},C={args:{data:{...i,overview:n}},play:async({canvasElement:e})=>{await h(v(e).getByText(`Amount unavailable`)).toBeVisible()}},w={args:{state:`loading`}},T={args:{state:`error`},play:async({canvasElement:e,args:t})=>{let n=v(e);await _.click(n.getByRole(`button`,{name:`Try again`})),await h(t.onRetry).toHaveBeenCalled()}},E={args:{state:`permission-denied`},play:async({canvasElement:e})=>{let t=v(e);await h(t.getByText(`Earnings access denied`)).toBeVisible(),await h(t.queryByText(`$184.50`)).not.toBeInTheDocument()}},D={args:{state:`not-eligible`},play:async({canvasElement:e,args:t})=>{let n=v(e);await h(n.getByText(`Earnings require a verified licence`)).toBeVisible(),await _.click(n.getByRole(`button`,{name:`Manage licence`})),await h(t.onOpenLicence).toHaveBeenCalled(),await h(n.queryByText(`$184.50`)).not.toBeInTheDocument(),await h(n.queryByRole(`button`,{name:`Activity & statements`})).not.toBeInTheDocument()}},O={args:{data:{...i,entries:[]}},play:async({canvasElement:e})=>{await h(v(e).getByText(`No activity yet`)).toBeVisible()}},k={args:{data:{...i,entries:l.map((e,t)=>t===0?{...e,title:`Extended diabetes, chronic kidney disease, and cardiovascular risk consultation completed`,detail:`Earnings released after the complete clinical order lifecycle closed across Kura Cabinet, Toul Kork and Mekong Clinic, BKK1 Branch.`}:e)}}},A={args:{data:c},parameters:{viewport:{defaultViewport:`kura320`}}},j={parameters:{viewport:{defaultViewport:`kura768`}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Earnings'
    })).toBeVisible();
    await expect(canvas.getByText('Earned this period')).toBeVisible();
    await expect(canvas.getByText('Kura owes you')).toBeVisible();
    await expect(canvas.getByText('Auto-pay active · ABA •••• 8842')).toBeVisible();
    await expect(canvas.getByRole('table', {
      name: 'Earnings activity'
    })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'View all'
    }));
    await expect(args.onOpenStatements).toHaveBeenCalled();
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    data: redDoctorFixture
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('You owe Kura')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Settle now'
    }));
    await expect(args.onSettle).toHaveBeenCalled();
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    data: {
      ...doctorFixture,
      overview: zeroOverview
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Settled balance')).toBeVisible();
    await expect(canvas.queryByRole('button', {
      name: 'Settle now'
    })).not.toBeInTheDocument();
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    data: {
      ...doctorFixture,
      overview: unavailableOverview
    }
  },
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).getByText('Amount unavailable')).toBeVisible();
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'loading'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'error'
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Try again'
    }));
    await expect(args.onRetry).toHaveBeenCalled();
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'permission-denied'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Earnings access denied')).toBeVisible();
    await expect(canvas.queryByText('$184.50')).not.toBeInTheDocument();
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'not-eligible'
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Earnings require a verified licence')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Manage licence'
    }));
    await expect(args.onOpenLicence).toHaveBeenCalled();
    await expect(canvas.queryByText('$184.50')).not.toBeInTheDocument();
    await expect(canvas.queryByRole('button', {
      name: 'Activity & statements'
    })).not.toBeInTheDocument();
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    data: {
      ...doctorFixture,
      entries: []
    }
  },
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).getByText('No activity yet')).toBeVisible();
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    data: {
      ...doctorFixture,
      entries: activityEntries.map((entry, index) => index === 0 ? {
        ...entry,
        title: 'Extended diabetes, chronic kidney disease, and cardiovascular risk consultation completed',
        detail: 'Earnings released after the complete clinical order lifecycle closed across Kura Cabinet, Toul Kork and Mekong Clinic, BKK1 Branch.'
      } : entry)
    }
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    data: redDoctorFixture
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura768'
    }
  }
}`,...j.parameters?.docs?.source}}},M=[`GreenBalance`,`RedBalanceNeedsSettlement`,`SettledAtZero`,`SignedInt64Fallback`,`Loading`,`RecoverableFailure`,`PermissionDenied`,`NewDoctorNotEligible`,`EmptyLedger`,`LongContent`,`Mobile320`,`Tablet768`]}))();export{O as EmptyLedger,b as GreenBalance,w as Loading,k as LongContent,A as Mobile320,D as NewDoctorNotEligible,E as PermissionDenied,T as RecoverableFailure,x as RedBalanceNeedsSettlement,S as SettledAtZero,C as SignedInt64Fallback,j as Tablet768,M as __namedExportsOrder,y as default};