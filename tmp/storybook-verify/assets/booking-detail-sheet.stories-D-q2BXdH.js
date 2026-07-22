import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{t as i}from"./ui-C9kmmzkH.js";import{t as a}from"./button-B6_zsN5-.js";import{r as o,t as s}from"./readiness-data-D41RGqZh.js";import{f as c,g as l,n as u}from"./demo-data-DZ0mjvYd.js";import{n as d,t as f}from"./booking-detail-sheet-DqoUfmOZ.js";function p({booking:e,initialOpen:t=!0,readOnly:n=!1,patient:r=b,deskBranchId:i=u}){let[o,s]=(0,h.useState)(t),[c,l]=(0,h.useState)(null);return(0,m.jsxs)(`div`,{children:[(0,m.jsx)(`p`,{"aria-label":`Action log`,role:`status`,children:c??`No action yet.`}),(0,m.jsxs)(a,{onClick:()=>s(!0),variant:`outline`,children:[`Open booking `,e.code]}),(0,m.jsx)(f,{booking:e,deskBranchId:i,onCheckIn:n?void 0:e=>{l(`check-in:${e}`),s(!1)},onContinueAsWalkIn:n?void 0:()=>{l(`walk-in`),s(!1)},onConfirmWalkIn:n?void 0:()=>{l(`walk-in-confirmed`),s(!1)},onOpenChange:s,onOpenDeskQueue:n?void 0:()=>l(`desk-queue`),onResendCode:n?void 0:e=>l(`resend:${e}`),open:o,patient:r})]})}var m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F;t((()=>{m=r(),h=e(n()),i(),d(),l(),o(),{expect:g,userEvent:_,waitFor:v,within:y}=__STORYBOOK_MODULE_TEST__,b=c.find(e=>e.id===`rec-sok-phearom`),x=e=>b.bookings.find(t=>t.code===e),S={title:`Clinic/Front Desk/Booking Detail Sheet`,component:f,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:{readiness:s.frontDesk,intake:{decision:`COMPOSE (Sheet + Timeline + Badge + MoneyText + Alert + Button)`,owner:`src/features/front-desk`,evidence:"Architecture reference: ReUI block `solution-bookings-3` (appointment detail sheet + booking timeline) — nothing pasted; every state maps to the canonical collection-code contract (issued/scheduled/redeemed/expired/cancelled per libs/contracts) and the capture contract (paid is the only real capture state). Timeline primitive REUSED from the canonical owner and EXTENDED with a semantic `tone` (add-only). Blocked codes explain themselves and route to a state-safe recovery action: walk-in where allowed, desk-queue review for redeemed codes, and parent-owned confirmation for cancelled bookings.",exclusions:[`Deposit-progress bar from the reference block (backend has no partial-capture contract)`,`Internal notes and staff assignment (no backend contract; separate ticket)`]},journeys:[`front-desk-check-in`,`front-desk-booking-detail`],binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-overlay`,icons:`kura-hugeicons`}},docs:{description:{component:`One collection code told end-to-end: patient, ordered tests, payment, and the code lifecycle as a timeline. Blocked codes explain themselves and offer the safest available recovery action instead of a dead check-in button.`}}}},C={booking:x(`GW87430`),patient:b,open:!0,onOpenChange:()=>{}},w={name:`Scheduled · paid — ready to check in`,args:C,render:()=>(0,m.jsx)(p,{booking:x(`GW87430`)}),play:async({canvasElement:e})=>{let t=y(e.ownerDocument.body);await v(async()=>{await g(t.getByText(`Visit scheduled`)).toBeVisible()}),await g(t.getByText(`HbA1c`)).toBeVisible(),await g(t.getByText(`Paid`)).toBeVisible(),await g(t.getByText(`$18.50`)).toBeVisible(),await _.click(t.getByRole(`button`,{name:`Check in booking GW87430`})),await v(async()=>{await g(t.getByRole(`status`,{name:`Action log`})).toHaveTextContent(`check-in:GW87430`)})}},T={name:`Issued · payment pending — resend available`,args:C,render:()=>(0,m.jsx)(p,{booking:x(`GW87431`)}),play:async({canvasElement:e})=>{let t=y(e.ownerDocument.body);await v(async()=>{await g(t.getByText(`Payment pending`)).toBeVisible()}),await _.click(t.getByRole(`button`,{name:`Resend code`})),await v(async()=>{await g(t.getByRole(`status`,{name:`Action log`})).toHaveTextContent(`resend:GW87431`)})}},E={name:`Expired — walk-in recovery door`,args:C,render:()=>(0,m.jsx)(p,{booking:x(`GW87510`)}),play:async({canvasElement:e})=>{let t=y(e.ownerDocument.body);await v(async()=>{await g(t.getByText(`Booking code expired`)).toBeVisible()}),await g(t.getByText(`Code expired`)).toBeVisible(),await g(t.getByRole(`button`,{name:`Continue as walk-in`})).toBeVisible(),await _.click(t.getByRole(`button`,{name:`Continue as walk-in`})),await v(async()=>{await g(t.getByRole(`status`,{name:`Action log`})).toHaveTextContent(`walk-in`)})}},D={name:`Already redeemed — duplicate-visit guard`,args:C,render:()=>(0,m.jsx)(p,{booking:x(`GW87511`)}),play:async({canvasElement:e})=>{let t=y(e.ownerDocument.body);await v(async()=>{await g(t.getByText(`Code already redeemed`)).toBeVisible()}),await g(t.getByText(/check the desk queue/)).toBeVisible(),await _.click(t.getByRole(`button`,{name:`Check desk queue`})),await v(async()=>{await g(t.getByRole(`status`,{name:`Action log`})).toHaveTextContent(`desk-queue`)})}},O={name:`Cancelled — terminal state`,args:C,render:()=>(0,m.jsx)(p,{booking:x(`GW87512`)}),play:async({canvasElement:e})=>{let t=y(e.ownerDocument.body);await v(async()=>{await g(t.getByText(`Booking cancelled`,{selector:`h3`})).toBeVisible()}),await _.click(t.getByRole(`button`,{name:`Confirm walk-in`})),await v(async()=>{await g(t.getByRole(`status`,{name:`Action log`})).toHaveTextContent(`walk-in-confirmed`)})}},k={name:`Issued for another branch`,args:C,render:()=>(0,m.jsx)(p,{booking:x(`GW87513`),deskBranchId:u}),play:async({canvasElement:e})=>{let t=y(e.ownerDocument.body);await v(async()=>{await g(t.getByText(`Issued for another branch`)).toBeVisible()}),await g(t.getByText(/Direct the patient there/)).toBeVisible()}},A={name:`Escape closes and restores focus`,args:C,render:()=>(0,m.jsx)(p,{booking:x(`GW87430`),initialOpen:!1}),play:async({canvasElement:e})=>{let t=y(e.ownerDocument.body);await _.click(t.getByRole(`button`,{name:`Open booking GW87430`})),await v(async()=>{await g(t.getByText(`Visit scheduled`)).toBeVisible()}),await _.keyboard(`{Escape}`),await v(async()=>{await g(t.queryByText(`Visit scheduled`)).not.toBeVisible()}),await g(t.getByRole(`button`,{name:`Open booking GW87430`})).toHaveFocus()}},j={args:C,globals:{viewport:{value:`kura390`}},render:()=>(0,m.jsx)(p,{booking:x(`GW87430`)})},M={args:C,globals:{theme:`dark`},render:()=>(0,m.jsx)(p,{booking:x(`GW87510`)})},N={name:`Blocked — read-only with no recovery action`,args:C,render:()=>(0,m.jsx)(p,{booking:x(`GW87510`),readOnly:!0}),play:async({canvasElement:e})=>{let t=y(e.ownerDocument.body);await v(async()=>{await g(t.getByText(`Booking code expired`)).toBeVisible()}),await g(t.getByText(`Check-in unavailable for this booking.`)).toBeVisible()}},P={name:`Long content — 320px`,args:C,globals:{viewport:{value:`kura320`}},render:()=>(0,m.jsx)(p,{booking:{...x(`GW87430`),itemsLabel:`HbA1c, Lipoprotein(a), CMP (metabolic panel), Glucose (fasting)`},patient:{...b,name:`Sok Phearom Channary Longname`,nameKhmer:`សុខ ភារ៉ុម ចាន់ណារី`}}),play:async({canvasElement:e})=>{let t=y(e.ownerDocument.body);await v(async()=>{await g(t.getByText(`Lipoprotein(a)`)).toBeVisible()}),await g(t.getByText(`CMP (metabolic panel)`)).toBeVisible(),await g(t.getByText(`Glucose (fasting)`)).toBeVisible()}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Scheduled · paid — ready to check in',
  args: baseArgs,
  render: () => <SheetPlayground booking={bookingOf('GW87430')} />,
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(async () => {
      await expect(body.getByText('Visit scheduled')).toBeVisible();
    });
    await expect(body.getByText('HbA1c')).toBeVisible();
    await expect(body.getByText('Paid')).toBeVisible();
    await expect(body.getByText('$18.50')).toBeVisible();
    await userEvent.click(body.getByRole('button', {
      name: 'Check in booking GW87430'
    }));
    await waitFor(async () => {
      await expect(body.getByRole('status', {
        name: 'Action log'
      })).toHaveTextContent('check-in:GW87430');
    });
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Issued · payment pending — resend available',
  args: baseArgs,
  render: () => <SheetPlayground booking={bookingOf('GW87431')} />,
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(async () => {
      await expect(body.getByText('Payment pending')).toBeVisible();
    });
    await userEvent.click(body.getByRole('button', {
      name: 'Resend code'
    }));
    await waitFor(async () => {
      await expect(body.getByRole('status', {
        name: 'Action log'
      })).toHaveTextContent('resend:GW87431');
    });
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Expired — walk-in recovery door',
  args: baseArgs,
  render: () => <SheetPlayground booking={bookingOf('GW87510')} />,
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(async () => {
      await expect(body.getByText('Booking code expired')).toBeVisible();
    });
    await expect(body.getByText('Code expired')).toBeVisible();
    await expect(body.getByRole('button', {
      name: 'Continue as walk-in'
    })).toBeVisible();
    await userEvent.click(body.getByRole('button', {
      name: 'Continue as walk-in'
    }));
    await waitFor(async () => {
      await expect(body.getByRole('status', {
        name: 'Action log'
      })).toHaveTextContent('walk-in');
    });
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Already redeemed — duplicate-visit guard',
  args: baseArgs,
  render: () => <SheetPlayground booking={bookingOf('GW87511')} />,
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(async () => {
      await expect(body.getByText('Code already redeemed')).toBeVisible();
    });
    await expect(body.getByText(/check the desk queue/)).toBeVisible();
    await userEvent.click(body.getByRole('button', {
      name: 'Check desk queue'
    }));
    await waitFor(async () => {
      await expect(body.getByRole('status', {
        name: 'Action log'
      })).toHaveTextContent('desk-queue');
    });
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Cancelled — terminal state',
  args: baseArgs,
  render: () => <SheetPlayground booking={bookingOf('GW87512')} />,
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(async () => {
      await expect(body.getByText('Booking cancelled', {
        selector: 'h3'
      })).toBeVisible();
    });
    await userEvent.click(body.getByRole('button', {
      name: 'Confirm walk-in'
    }));
    await waitFor(async () => {
      await expect(body.getByRole('status', {
        name: 'Action log'
      })).toHaveTextContent('walk-in-confirmed');
    });
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Issued for another branch',
  args: baseArgs,
  render: () => <SheetPlayground booking={bookingOf('GW87513')} deskBranchId={DEMO_BRANCH_ID} />,
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(async () => {
      await expect(body.getByText('Issued for another branch')).toBeVisible();
    });
    await expect(body.getByText(/Direct the patient there/)).toBeVisible();
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Escape closes and restores focus',
  args: baseArgs,
  render: () => <SheetPlayground booking={bookingOf('GW87430')} initialOpen={false} />,
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(body.getByRole('button', {
      name: 'Open booking GW87430'
    }));
    await waitFor(async () => {
      await expect(body.getByText('Visit scheduled')).toBeVisible();
    });
    await userEvent.keyboard('{Escape}');
    await waitFor(async () => {
      await expect(body.queryByText('Visit scheduled')).not.toBeVisible();
    });
    await expect(body.getByRole('button', {
      name: 'Open booking GW87430'
    })).toHaveFocus();
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: baseArgs,
  globals: {
    viewport: {
      value: 'kura390'
    }
  },
  render: () => <SheetPlayground booking={bookingOf('GW87430')} />
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: baseArgs,
  globals: {
    theme: 'dark'
  },
  render: () => <SheetPlayground booking={bookingOf('GW87510')} />
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Blocked — read-only with no recovery action',
  args: baseArgs,
  render: () => <SheetPlayground booking={bookingOf('GW87510')} readOnly />,
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(async () => {
      await expect(body.getByText('Booking code expired')).toBeVisible();
    });
    await expect(body.getByText('Check-in unavailable for this booking.')).toBeVisible();
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Long content — 320px',
  args: baseArgs,
  globals: {
    viewport: {
      value: 'kura320'
    }
  },
  render: () => <SheetPlayground booking={{
    ...bookingOf('GW87430'),
    itemsLabel: 'HbA1c, Lipoprotein(a), CMP (metabolic panel), Glucose (fasting)'
  }} patient={{
    ...sokPhearom,
    name: 'Sok Phearom Channary Longname',
    nameKhmer: 'សុខ ភារ៉ុម ចាន់ណារី'
  }} />,
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(async () => {
      await expect(body.getByText('Lipoprotein(a)')).toBeVisible();
    });
    await expect(body.getByText('CMP (metabolic panel)')).toBeVisible();
    await expect(body.getByText('Glucose (fasting)')).toBeVisible();
  }
}`,...P.parameters?.docs?.source}}},F=[`ScheduledPaid`,`IssuedPendingPayment`,`ExpiredCode`,`AlreadyRedeemed`,`CancelledBooking`,`WrongBranch`,`EscapeRestoresFocus`,`Mobile`,`DarkTheme`,`ReadOnlyBlocked`,`LongContent320`]}))();export{D as AlreadyRedeemed,O as CancelledBooking,M as DarkTheme,A as EscapeRestoresFocus,E as ExpiredCode,T as IssuedPendingPayment,P as LongContent320,j as Mobile,N as ReadOnlyBlocked,w as ScheduledPaid,k as WrongBranch,F as __namedExportsOrder,S as default};