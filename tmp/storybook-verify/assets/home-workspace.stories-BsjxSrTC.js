import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{t as ee}from"./app-shell-dOUH8yca.js";import{t as te}from"./shared-GnDiMTI0.js";import{n as ne}from"./logic-Ca9-ZOcC.js";import{C as re,S as ie,T as ae,_ as i,a,b as o,c as oe,d as se,f as ce,g as s,h as le,i as c,l as ue,m as de,o as l,p as fe,r as pe,s as u,u as me,v as he,w as ge,x as _e,y as ve}from"./demo-data-BfkfVfOx.js";import{n as ye,r as be,t as xe}from"./home-workspace-BS1bTudE.js";import{n as Se,t as Ce}from"./storybook-metadata-CTVyefy3.js";function we(e){return(0,d.jsx)(ee,{activeKey:`home`,availableModes:[`clinical`],mode:`clinical`,notificationCount:2,onNavigate:t=>e.onNavigate?.(t),onOpenNotifications:()=>void 0,user:{name:e.data.doctorName,email:`sok.vanna@mekong.clinic`,licenceVerified:ne(e.data.licence.state)},workspace:e.data.firstUse?De:_,children:(0,d.jsx)(xe,{...e})})}function Te(){let[e,t]=(0,Ee.useState)(!1);return(0,d.jsx)(we,{data:e?a:u,onRefresh:()=>t(!0)})}var d,Ee,f,p,m,h,g,_,De,Oe,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,ke;t((()=>{d=r(),Ee=e(n()),te(),oe(),ye(),be(),Se(),{expect:f,fn:p,userEvent:m,waitFor:h,within:g}=__STORYBOOK_MODULE_TEST__,_={id:`mekong`,name:`Mekong Clinic`,branches:[{id:`bkk1`,name:`BKK1 Branch`}],activeBranchId:`bkk1`},De={id:`bopha-cabinet`,name:`Bopha Kim's cabinet`},Oe={title:`Clinic/Clinical/Home`,component:xe,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:Ce,docs:{description:{component:`Clinical Home (WQ-01) is a calm start-of-shift briefing inside the canonical AppShell. It prioritizes safety-relevant work, keeps the next agenda visible, and deep-links into owning surfaces. Licence stories map to the current seven-state clinic contract. Aggregate Home counts remain design fixtures because no Home/today BFF read model exists.`}}},args:{data:a,onNavigate:p(),onOpenDemoPatient:p(),onOpenLicence:p(),onStartBooking:p(),onChooseWorkspace:p(),onRetrySignal:p(),onRefresh:p()},render:e=>(0,d.jsx)(we,{...e})},v={play:async({canvasElement:e})=>{let t=g(e);await f(t.getByRole(`heading`,{name:`Good morning, Dr. Sok Vanna`})).toBeVisible(),await f(t.getByRole(`heading`,{name:`Priority work`})).toBeVisible(),await f(t.getByRole(`heading`,{name:`Next`})).toBeVisible(),await f(t.getByRole(`heading`,{name:`Today`})).toBeVisible();let n=t.getByRole(`list`,{name:`Patients with results to review`});await f(g(n).getAllByRole(`listitem`)).toHaveLength(5),await f(g(n).getByText(`Dara Phally`)).toBeVisible(),await f(g(t.getByRole(`list`,{name:`Bookings work queue`})).getByText(`Sokha Chan`)).toBeVisible(),await f(g(t.getByRole(`list`,{name:`Patients work queue`})).getByText(`Vicheka Sam`)).toBeVisible()}},y={args:{data:l},play:async({canvasElement:e,args:t})=>{let n=g(e).getByRole(`list`,{name:`Patients with results to review`}),r=g(n).getAllByRole(`listitem`);await f(g(r[0]).getByText(`Critical`)).toBeVisible(),await f(g(r[0]).getByText(/Potassium/)).toBeVisible(),await m.click(g(r[0]).getByRole(`link`,{name:/Sokha Chan/})),await f(t.onNavigate).toHaveBeenCalledWith(`results`)}},b={args:{data:s},play:async({canvasElement:e})=>{let t=g(e);await f(t.getByRole(`heading`,{name:/Dr. Chanthavysouk Keomanivong-Rattanakosin/})).toBeVisible(),await f(t.getByText(`៛128,450`)).toBeVisible(),await f(t.getByText(`999`)).toBeVisible()}},x={args:{data:c},play:async({canvasElement:e})=>{let t=g(e);await f(t.getByText(`All caught up`)).toBeVisible(),await f(t.getByRole(`heading`,{name:`Next`})).toBeVisible(),await f(t.getByText(`Tube pickup`)).toBeVisible()}},S={args:{data:ae},play:async({canvasElement:e,args:t})=>{let n=g(e);await f(n.getByText(`No patients`)).toBeVisible(),await m.click(n.getByRole(`button`,{name:`Add patient`})),await f(t.onNavigate).toHaveBeenCalledWith(`patients`)}},C={args:{data:i},play:async({canvasElement:e,args:t})=>{let n=g(e);await f(n.getByRole(`heading`,{name:`Welcome to Kura, Dr. Bopha Kim`})).toBeVisible(),await f(n.getByText(`Let’s create your first patient booking.`)).toBeVisible(),await f(n.getByText(`You can book before your licence is verified.`)).toBeVisible(),await f(n.getByText(`Not started`)).toBeVisible(),await f(n.getByText(`Once verified, you can collect cash, issue legal documents, submit claims and appear in the doctor directory.`)).toBeVisible(),await f(n.queryByText(`No patients`)).not.toBeInTheDocument(),await f(n.queryByText(`Verify medical licence`)).not.toBeInTheDocument(),await m.click(n.getByRole(`button`,{name:`Create first booking`})),await f(t.onStartBooking).toHaveBeenCalled(),await f(n.queryByRole(`link`,{name:`Browse test catalog`})).not.toBeInTheDocument(),await m.click(n.getByRole(`button`,{name:`Start verification`})),await f(t.onOpenLicence).toHaveBeenCalled(),await f(n.getByRole(`heading`,{name:`Explore a demo patient`})).toBeVisible(),await f(n.getByText(`Follow Sokha Chann from booking to results. This demo will not affect your records.`)).toBeVisible(),await m.click(n.getByRole(`button`,{name:`Open demo patient`})),await f(t.onOpenDemoPatient).toHaveBeenCalled()}},w={args:{data:{...i,demoPatient:void 0}},play:async({canvasElement:e})=>{let t=g(e);await f(t.getByRole(`heading`,{name:/Welcome to Kura/})).toBeVisible(),await f(t.queryByRole(`heading`,{name:`Explore a demo patient`})).not.toBeInTheDocument(),await f(t.getByRole(`button`,{name:`Create first booking`})).toBeVisible()}},T={parameters:{viewport:{defaultViewport:`kura320`}},args:{data:i}},E={args:{data:pe},play:async({canvasElement:e})=>{let t=g(e);await f(t.getByRole(`heading`,{name:`Good afternoon, Dr. Sok Vanna`})).toBeVisible(),await f(t.getByRole(`heading`,{name:`Closed today`})).toBeVisible(),await f(t.getByText(`12`)).toBeVisible(),await f(t.getByText(`$86.00`)).toBeVisible()}},D={args:{data:ce},play:async({canvasElement:e,args:t})=>{let n=g(e);await m.click(n.getByRole(`button`,{name:`Verify`})),await f(t.onOpenLicence).toHaveBeenCalled()}},O={args:{data:fe},play:async({canvasElement:e})=>{let t=g(e);await f(t.getByText(`Licence verification pending`)).toBeVisible(),await f(t.getByRole(`button`,{name:`View submission`})).toBeVisible(),await f(t.queryByRole(`button`,{name:`Verify`})).not.toBeInTheDocument()}},k={args:{data:de},play:async({canvasElement:e})=>{let t=g(e);await f(t.getByText(`Licence rejected`)).toBeVisible(),await f(t.getByRole(`button`,{name:`Update licence`})).toBeVisible()}},A={play:async({canvasElement:e})=>{let t=g(e);await f(t.queryByText(/licence/i)).not.toBeInTheDocument()}},j={args:{data:ue},play:async({canvasElement:e})=>{let t=g(e);await f(t.getByText(`Your licence expires on 31 August 2026`)).toBeVisible(),await f(t.getByRole(`button`,{name:`Renew`})).toBeVisible()}},M={args:{data:me},play:async({canvasElement:e})=>{let t=g(e);await f(t.getByText(/Grace ends 29 October 2026/)).toBeVisible()}},N={args:{data:se},play:async({canvasElement:e})=>{let t=g(e);await f(t.getByText(`Licence inactive`)).toBeVisible(),await f(t.getByRole(`button`,{name:`Renew licence`})).toBeVisible()}},P={args:{data:le},play:async({canvasElement:e})=>{let t=g(e);await f(t.getByRole(`heading`,{name:`Loading`})).toBeVisible(),await f(t.getByRole(`heading`,{name:`Bookings`})).toBeVisible(),await f(t.getByRole(`heading`,{name:`Patients`})).toBeVisible(),await f(t.queryByRole(`link`)).not.toBeInTheDocument()}},F={args:{data:o},play:async({canvasElement:e,args:t})=>{let n=g(e);await f(n.getByText(`Results could not load.`)).toBeVisible(),await f(n.getByRole(`list`,{name:`Bookings work queue`})).toBeVisible(),await m.click(n.getByRole(`button`,{name:`Retry`})),await f(t.onRetrySignal).toHaveBeenCalledWith(`results`)}},I={args:{data:u},play:async({canvasElement:e})=>{let t=g(e);await f(t.getByText(`Home could not load`)).toBeVisible(),await f(t.getByRole(`button`,{name:`Reload`})).toBeVisible(),await f(t.queryByText(`Sokha Chan · T2DM review`)).not.toBeInTheDocument()}},L={render:()=>(0,d.jsx)(Te,{}),play:async({canvasElement:e})=>{let t=g(e);await f(t.getByText(`Home could not load`)).toBeVisible(),await f(t.queryByText(`Sokha Chan · T2DM review`)).not.toBeInTheDocument(),await m.click(t.getByRole(`button`,{name:`Reload`})),await h(async()=>{await f(t.getByRole(`heading`,{name:`Priority work`})).toBeVisible()})}},R={args:{data:ge},play:async({canvasElement:e,args:t})=>{let n=g(e);await f(n.getByText(`Last updated 09:12`)).toBeVisible(),await m.click(n.getByRole(`button`,{name:`Refresh`})),await f(t.onRefresh).toHaveBeenCalled()}},z={args:{data:ve},play:async({canvasElement:e})=>{let t=g(e);await f(t.getByText(`Offline`)).toBeVisible(),await f(t.getByText(/Reconnect to make clinic changes/)).toBeVisible()}},B={args:{data:ie},play:async({canvasElement:e})=>{let t=g(e.querySelector(`[data-slot="home-workspace"]`));await f(t.queryByText(/^Earnings/)).not.toBeInTheDocument(),await f(t.getByText(`Tube pickup`)).toBeVisible()}},V={args:{data:he},play:async({canvasElement:e,args:t})=>{let n=g(e);await f(n.getByText(/No clinic data was loaded/)).toBeVisible(),await f(n.queryByText(`Sokha Chan`)).not.toBeInTheDocument(),await m.click(n.getByRole(`button`,{name:`Choose workspace`})),await f(t.onChooseWorkspace).toHaveBeenCalled()}},H={args:{data:_e},play:async({canvasElement:e})=>{let t=g(e);await f(t.getByText(`Home unavailable`)).toBeVisible(),await f(t.getByText(/No patient data was loaded/)).toBeVisible(),await f(t.queryByText(/Sokha Chan|Dara Phally|Chenda Sreymom/)).not.toBeInTheDocument()}},U={args:{data:re}},W={parameters:{viewport:{defaultViewport:`kura320`}},args:{data:l}},G={parameters:{viewport:{defaultViewport:`kura360`}}},K={parameters:{viewport:{defaultViewport:`kura390`}},args:{data:s}},q={parameters:{viewport:{defaultViewport:`kura412`}},args:{data:o}},J={parameters:{viewport:{defaultViewport:`kura480`}},args:{data:c}},Y={parameters:{viewport:{defaultViewport:`kura768`}},args:{data:l}},X={parameters:{viewport:{defaultViewport:`kura1024`}}},Z={globals:{density:`compact`},args:{data:l}},Q={globals:{density:`comfortable`}},$={globals:{theme:`dark`},args:{data:l}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Good morning, Dr. Sok Vanna'
    })).toBeVisible();
    await expect(canvas.getByRole('heading', {
      name: 'Priority work'
    })).toBeVisible();
    await expect(canvas.getByRole('heading', {
      name: 'Next'
    })).toBeVisible();
    await expect(canvas.getByRole('heading', {
      name: 'Today'
    })).toBeVisible();
    const queue = canvas.getByRole('list', {
      name: 'Patients with results to review'
    });
    await expect(within(queue).getAllByRole('listitem')).toHaveLength(5);
    await expect(within(queue).getByText('Dara Phally')).toBeVisible();
    await expect(within(canvas.getByRole('list', {
      name: 'Bookings work queue'
    })).getByText('Sokha Chan')).toBeVisible();
    await expect(within(canvas.getByRole('list', {
      name: 'Patients work queue'
    })).getByText('Vicheka Sam')).toBeVisible();
  }
}`,...v.parameters?.docs?.source},description:{story:`Default: verified clinician, mixed work, real shell and one clear reading path.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.criticalDay
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const queue = canvas.getByRole('list', {
      name: 'Patients with results to review'
    });
    const items = within(queue).getAllByRole('listitem');
    await expect(within(items[0]).getByText('Critical')).toBeVisible();
    await expect(within(items[0]).getByText(/Potassium/)).toBeVisible();
    await userEvent.click(within(items[0]).getByRole('link', {
      name: /Sokha Chan/
    }));
    await expect(args.onNavigate).toHaveBeenCalledWith('results');
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.longContent
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: /Dr. Chanthavysouk Keomanivong-Rattanakosin/
    })).toBeVisible();
    await expect(canvas.getByText('៛128,450')).toBeVisible();
    await expect(canvas.getByText('999')).toBeVisible();
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.allCaughtUp
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('All caught up')).toBeVisible();
    await expect(canvas.getByRole('heading', {
      name: 'Next'
    })).toBeVisible();
    await expect(canvas.getByText('Tube pickup')).toBeVisible();
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.verifiedEmptyClinic
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No patients')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Add patient'
    }));
    await expect(args.onNavigate).toHaveBeenCalledWith('patients');
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.newDoctorFirstHome
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Welcome to Kura, Dr. Bopha Kim'
    })).toBeVisible();
    await expect(canvas.getByText('Let’s create your first patient booking.')).toBeVisible();
    await expect(canvas.getByText('You can book before your licence is verified.')).toBeVisible();
    await expect(canvas.getByText('Not started')).toBeVisible();
    await expect(canvas.getByText('Once verified, you can collect cash, issue legal documents, submit claims and appear in the doctor directory.')).toBeVisible();
    await expect(canvas.queryByText('No patients')).not.toBeInTheDocument();
    await expect(canvas.queryByText('Verify medical licence')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Create first booking'
    }));
    await expect(args.onStartBooking).toHaveBeenCalled();
    await expect(canvas.queryByRole('link', {
      name: 'Browse test catalog'
    })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Start verification'
    }));
    await expect(args.onOpenLicence).toHaveBeenCalled();

    // The third door: a new doctor can see the product work before committing
    // to a real booking or a licence submission.
    await expect(canvas.getByRole('heading', {
      name: 'Explore a demo patient'
    })).toBeVisible();
    await expect(canvas.getByText('Follow Sokha Chann from booking to results. This demo will not affect your records.')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Open demo patient'
    }));
    await expect(args.onOpenDemoPatient).toHaveBeenCalled();
  }
}`,...C.parameters?.docs?.source},description:{story:`The first shell view after a new doctor creates their branchless cabinet.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    data: {
      ...demo.newDoctorFirstHome,
      demoPatient: undefined
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: /Welcome to Kura/
    })).toBeVisible();
    await expect(canvas.queryByRole('heading', {
      name: 'Explore a demo patient'
    })).not.toBeInTheDocument();
    await expect(canvas.getByRole('button', {
      name: 'Create first booking'
    })).toBeVisible();
  }
}`,...w.parameters?.docs?.source},description:{story:`A clinic that has never booked anyone but was handed no demo patient: the
offer disappears rather than pointing at a record that does not exist.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  args: {
    data: demo.newDoctorFirstHome
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.afternoonHandover
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Good afternoon, Dr. Sok Vanna'
    })).toBeVisible();
    await expect(canvas.getByRole('heading', {
      name: 'Closed today'
    })).toBeVisible();
    await expect(canvas.getByText('12')).toBeVisible();
    await expect(canvas.getByText('$86.00')).toBeVisible();
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.licenceNone
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Verify'
    }));
    await expect(args.onOpenLicence).toHaveBeenCalled();
  }
}`,...D.parameters?.docs?.source},description:{story:"Seven-state backend contract: `none`.",...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.licencePendingReview
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Licence verification pending')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'View submission'
    })).toBeVisible();
    await expect(canvas.queryByRole('button', {
      name: 'Verify'
    })).not.toBeInTheDocument();
  }
}`,...O.parameters?.docs?.source},description:{story:"Seven-state backend contract: `pending_review`; never repeats a Verify CTA.",...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.licenceRejected
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Licence rejected')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Update licence'
    })).toBeVisible();
  }
}`,...k.parameters?.docs?.source},description:{story:"Seven-state backend contract: `rejected`.",...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByText(/licence/i)).not.toBeInTheDocument();
  }
}`,...A.parameters?.docs?.source},description:{story:"Seven-state backend contract: `verified`; the default story is intentionally quiet.",...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.licenceExpiring
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Your licence expires on 31 August 2026')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Renew'
    })).toBeVisible();
  }
}`,...j.parameters?.docs?.source},description:{story:"Seven-state backend contract: `expiring`.",...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.licenceInGrace
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Grace ends 29 October 2026/)).toBeVisible();
  }
}`,...M.parameters?.docs?.source},description:{story:"Seven-state backend contract: `in_grace`.",...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.licenceLapsed
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Licence inactive')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Renew licence'
    })).toBeVisible();
  }
}`,...N.parameters?.docs?.source},description:{story:"Seven-state backend contract: `lapsed`.",...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.loading
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Loading'
    })).toBeVisible();
    await expect(canvas.getByRole('heading', {
      name: 'Bookings'
    })).toBeVisible();
    await expect(canvas.getByRole('heading', {
      name: 'Patients'
    })).toBeVisible();
    await expect(canvas.queryByRole('link')).not.toBeInTheDocument();
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.partialData
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Results could not load.')).toBeVisible();
    await expect(canvas.getByRole('list', {
      name: 'Bookings work queue'
    })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Retry'
    }));
    await expect(args.onRetrySignal).toHaveBeenCalledWith('results');
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.fullFailure
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Home could not load')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Reload'
    })).toBeVisible();
    await expect(canvas.queryByText('Sokha Chan · T2DM review')).not.toBeInTheDocument();
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <FullFailureRecoveryHarness />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Home could not load')).toBeVisible();
    await expect(canvas.queryByText('Sokha Chan · T2DM review')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Reload'
    }));
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', {
        name: 'Priority work'
      })).toBeVisible();
    });
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.stale
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Last updated 09:12')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Refresh'
    }));
    await expect(args.onRefresh).toHaveBeenCalled();
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.offline
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Offline')).toBeVisible();
    await expect(canvas.getByText(/Reconnect to make clinic changes/)).toBeVisible();
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.reducedCapabilities
  },
  play: async ({
    canvasElement
  }) => {
    const home = within(canvasElement.querySelector('[data-slot="home-workspace"]') as HTMLElement);
    await expect(home.queryByText(/^Earnings/)).not.toBeInTheDocument();
    await expect(home.getByText('Tube pickup')).toBeVisible();
  }
}`,...B.parameters?.docs?.source},description:{story:`No payment capability: the earnings signal is omitted from Home, never greyed.
 Scoped to the workspace because the shell keeps its own Earnings nav item.`,...B.parameters?.docs?.description}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.noWorkspaceAccess
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/No clinic data was loaded/)).toBeVisible();
    await expect(canvas.queryByText('Sokha Chan')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Choose workspace'
    }));
    await expect(args.onChooseWorkspace).toHaveBeenCalled();
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.permissionRestricted
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Home unavailable')).toBeVisible();
    await expect(canvas.getByText(/No patient data was loaded/)).toBeVisible();
    await expect(canvas.queryByText(/Sokha Chan|Dara Phally|Chenda Sreymom/)).not.toBeInTheDocument();
  }
}`,...H.parameters?.docs?.source},description:{story:`WQ-08 rejection outcome: an unauthorized deep link reveals no patient identity.`,...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    data: demo.soloDoctor
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  args: {
    data: demo.criticalDay
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura360'
    }
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura390'
    }
  },
  args: {
    data: demo.longContent
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura412'
    }
  },
  args: {
    data: demo.partialData
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura480'
    }
  },
  args: {
    data: demo.allCaughtUp
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura768'
    }
  },
  args: {
    data: demo.criticalDay
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura1024'
    }
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  globals: {
    density: 'compact'
  },
  args: {
    data: demo.criticalDay
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  globals: {
    density: 'comfortable'
  }
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  globals: {
    theme: 'dark'
  },
  args: {
    data: demo.criticalDay
  }
}`,...$.parameters?.docs?.source}}},ke=`StartOfDayVerified.CriticalResultFirst.BusyClinicLongContent.AllCaughtUpWithNextAppointment.EmptyClinic.NewDoctorFirstHome.FirstHomeWithoutDemoPatient.NewDoctorFirstHomeMobile320.AfternoonHandover.LicenceNone.LicencePendingReview.LicenceRejected.LicenceVerified.LicenceExpiring.LicenceInGrace.LicenceLapsed.Loading.PartialFailureAndRetry.FullFailure.FullFailureRecoverable.StaleData.OfflineReadOnly.ReducedCapabilities.NoWorkspaceAccess.UnauthorizedDeepLinkNoPhi.SoloDoctor.MobileWidth320Critical.MobileWidth360.MobileWidth390LongContent.MobileWidth412PartialFailure.MobileWidth480AllClear.TabletWidth768.DesktopWidth1024.CompactDensity.ComfortableDensity.DarkTheme`.split(`.`)}))();export{E as AfternoonHandover,x as AllCaughtUpWithNextAppointment,b as BusyClinicLongContent,Q as ComfortableDensity,Z as CompactDensity,y as CriticalResultFirst,$ as DarkTheme,X as DesktopWidth1024,S as EmptyClinic,w as FirstHomeWithoutDemoPatient,I as FullFailure,L as FullFailureRecoverable,j as LicenceExpiring,M as LicenceInGrace,N as LicenceLapsed,D as LicenceNone,O as LicencePendingReview,k as LicenceRejected,A as LicenceVerified,P as Loading,W as MobileWidth320Critical,G as MobileWidth360,K as MobileWidth390LongContent,q as MobileWidth412PartialFailure,J as MobileWidth480AllClear,C as NewDoctorFirstHome,T as NewDoctorFirstHomeMobile320,V as NoWorkspaceAccess,z as OfflineReadOnly,F as PartialFailureAndRetry,B as ReducedCapabilities,U as SoloDoctor,R as StaleData,v as StartOfDayVerified,Y as TabletWidth768,H as UnauthorizedDeepLinkNoPhi,ke as __namedExportsOrder,Oe as default};