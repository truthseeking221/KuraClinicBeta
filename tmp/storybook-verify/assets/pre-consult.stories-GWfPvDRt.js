import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{r as i,t as a}from"./readiness-data-D41RGqZh.js";import{d as o,f as s,g as c,m as l}from"./demo-data-DZ0mjvYd.js";import{n as u,t as d}from"./check-in-wizard-DvzZbfaU.js";function f(e,t){let n=l(e,51),r=t?.verified??!0;return{...n,name:`Bopha Kim`,dob:`1990-05-05`,sexAtBirth:`Female`,otpVerified:r,unverifiedReason:r?null:{code:`patient-declined`},insuranceAcked:!0,identity:{source:`manual`,lockedFields:[]},cart:{...n.cart,attributedPrescriberId:`dr-sok-vanna`,items:[{id:`hba1c`,kind:`lab`,name:`HbA1c`,priceMinor:`900`,currencyCode:`USD`,qty:1},...t?.tele===!1?[]:[{id:`telecon`,kind:`telecon`,name:`Teleconsultation`,priceMinor:`0`,currencyCode:`USD`,qty:1}]]}}}function p({initial:e}){let[t,n]=(0,h.useState)(e);return(0,m.jsx)(d,{existingPatients:o,identityRegistry:s,onCheckIn:()=>{},onPatientChange:n,patient:t})}var m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;t((()=>{m=r(),h=e(n()),u(),c(),i(),{expect:g,userEvent:_,within:v}=__STORYBOOK_MODULE_TEST__,y={title:`Clinic/Front Desk/Check-In Wizard/Step 5 Pre-Consult`,component:d,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`padded`,kura:{readiness:a.frontDesk,intake:{decision:`EXTEND (front-desk Step 5) — intake delivery + TAT-coupled teleconsult`,owner:`src/features/front-desk`,evidence:`Ported from the legacy receptionist prototype: send-intake-link vs fill-on-behalf with per-section author provenance, teleconsult specialty auto-mapped from ordered tests, day picker coupled to the longest internal turnaround (pre-TAT days warn, booking early needs an explicit override), skip removes the teleconsult line while remove re-blocks the step. PROTOTYPE: telehealth_call is an enum with no behavior upstream; no intake-link service exists.`,exclusions:[`Month calendar grid (compact day strip carries the same rule)`,`Patient PWA intake surface (separate journey)`]},journeys:[`front-desk-check-in`],binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura`,icons:`kura-hugeicons`}},docs:{description:{component:`Step 5 captures intake while the patient is present and books the results consult. The intake link needs a verified channel; the desk can fill sections on behalf with visible provenance. Teleconsult slots follow the longest result turnaround — pre-TAT days warn and booking early is an explicit, recorded override.`}}}},b={patient:f(`pre-consult-base`),onPatientChange:()=>{},existingPatients:o,onCheckIn:()=>{}},x={name:`Teleconsult · TAT preselects the day, early booking confirms`,args:b,render:()=>(0,m.jsx)(p,{initial:f(`pre-tat`)}),play:async({canvasElement:e})=>{let t=v(e);await _.click(t.getByRole(`tab`,{name:/5 Pre-consult/})),await g(await t.findByText(/Estimated results in ~24h/)).toBeVisible(),await g(t.getByRole(`button`,{name:`Tomorrow`})).toHaveAttribute(`aria-pressed`,`true`);let n=v(t.getByRole(`group`,{name:`Consult day`}));await _.click(n.getByRole(`button`,{name:/Today/})),await g(t.getByText(`Results may not be ready on this day.`)).toBeVisible(),await _.click(t.getByRole(`button`,{name:`09:30`})),await g(await t.findByText(`Results may not be ready for this slot`)).toBeVisible(),await _.click(t.getByRole(`button`,{name:`Book anyway`})),await g(await t.findByText(/Booked · Today · 09:30/)).toBeVisible(),await g(t.getByText(/before results/)).toBeVisible(),await g(t.getByText(/Endocrinology/)).toBeVisible()}},S={name:`Teleconsult · skip removes the line, remove re-blocks`,args:b,render:()=>(0,m.jsx)(p,{initial:f(`pre-skip`)}),play:async({canvasElement:e})=>{let t=v(e);await _.click(t.getByRole(`tab`,{name:/5 Pre-consult/})),await _.click(await t.findByRole(`button`,{name:`Skip consult`})),await g(await t.findByText(`Skipped — results go out without a consult`)).toBeVisible(),await g(t.queryByRole(`button`,{name:`Remove Teleconsultation`})).not.toBeInTheDocument(),await g(t.getByRole(`button`,{name:`Continue`})).toBeEnabled()}},C={name:`Intake · link gated on a verified channel`,args:b,render:()=>(0,m.jsx)(p,{initial:f(`pre-unverified`,{verified:!1})}),play:async({canvasElement:e})=>{let t=v(e);await _.click(t.getByRole(`tab`,{name:/5 Pre-consult/})),await g(await t.findByRole(`button`,{name:`Send link`})).toBeDisabled(),await g(t.getByText(`Verify a phone or Telegram in Step 2.`)).toBeVisible()}},w={name:`Intake · answering on behalf stamps desk provenance`,args:b,render:()=>(0,m.jsx)(p,{initial:f(`pre-fill`)}),play:async({canvasElement:e})=>{let t=v(e);await _.click(t.getByRole(`tab`,{name:/5 Pre-consult/})),await _.click(await t.findByRole(`button`,{name:`Send link`})),await g(await t.findByText(/Intake link sent · just now/)).toBeVisible();let n=t.getAllByRole(`button`,{name:/Not answered/});await _.click(n[0]),await _.type(t.getByLabelText(/what the patient tells the desk/),`Follow-up on diabetes control`),await _.click(t.getByRole(`button`,{name:`Save`})),await g(await t.findByText(/recorded by desk/)).toBeVisible()}},T={name:`Mobile · TAT day strip at 390`,args:b,globals:{viewport:{value:`kura390`}},render:()=>(0,m.jsx)(p,{initial:f(`pre-mobile`)}),play:async({canvasElement:e})=>{let t=v(e);await _.click(t.getByRole(`tab`,{name:/5 Pre-consult/})),await g(await t.findByText(/Estimated results in ~24h/)).toBeVisible()}},E={args:b,globals:{theme:`dark`},render:()=>(0,m.jsx)(p,{initial:f(`pre-dark`)})},D={name:`Intake · answered count and link state track together`,args:b,render:()=>(0,m.jsx)(p,{initial:f(`pre-status`)}),play:async({canvasElement:e})=>{let t=v(e);await _.click(t.getByRole(`tab`,{name:/5 Pre-consult/})),await g(await t.findByText(/1 of 8 answered/)).toBeVisible(),await _.click(t.getByRole(`button`,{name:`Send link`})),await g(await t.findByText(/Intake link sent · just now/)).toBeVisible();let n=t.getAllByRole(`button`,{name:/Not answered/});await _.click(n[1]),await _.type(t.getByLabelText(/what the patient tells the desk/),`Fasted since 22:00`),await _.click(t.getByRole(`button`,{name:`Save`})),await g(await t.findByText(/2 of 8 answered/)).toBeVisible(),await g(await t.findByText(/Fasted since 22:00/)).toBeVisible()}},O={name:`Intake · skip records a reason, never a gate`,args:b,render:()=>(0,m.jsx)(p,{initial:f(`pre-skip-intake`,{tele:!1})}),play:async({canvasElement:e})=>{let t=v(e);await _.click(t.getByRole(`tab`,{name:/Pre-consult/})),await _.click(await t.findByRole(`button`,{name:`Skip`})),await _.click(t.getByRole(`button`,{name:`Record skip`})),await g(await t.findByText(/Intake skipped · Patient declined/)).toBeVisible(),await g(t.getByRole(`button`,{name:`Continue`})).toBeEnabled(),await _.click(t.getByRole(`button`,{name:`Resume intake`})),await g(await t.findByText(/1 of 8 answered/)).toBeVisible()}},k={name:`Teleconsult · change time keeps the booking until replaced`,args:b,render:()=>(0,m.jsx)(p,{initial:f(`pre-reschedule`)}),play:async({canvasElement:e})=>{let t=v(e);await _.click(t.getByRole(`tab`,{name:/5 Pre-consult/})),await _.click(await t.findByRole(`button`,{name:`09:30`})),await g(await t.findByText(/Booked · Tomorrow · 09:30/)).toBeVisible(),await _.click(t.getByRole(`button`,{name:`Change time`})),await g(await t.findByText(/Rebooking — currently Tomorrow · 09:30/)).toBeVisible(),await _.click(t.getByRole(`button`,{name:`Keep current time`})),await g(await t.findByText(/Booked · Tomorrow · 09:30/)).toBeVisible(),await _.click(t.getByRole(`button`,{name:`Change time`})),await _.click(t.getByRole(`button`,{name:`11:00`})),await g(await t.findByText(/Booked · Tomorrow · 11:00/)).toBeVisible()}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Teleconsult · TAT preselects the day, early booking confirms',
  args: baseArgs,
  render: () => <PreConsultPlayground initial={preConsultReady('pre-tat')} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', {
      name: /5 Pre-consult/
    }));
    // HbA1c = 24h TAT → Tomorrow preselected, Today carries the warning mark.
    await expect(await canvas.findByText(/Estimated results in ~24h/)).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Tomorrow'
    })).toHaveAttribute('aria-pressed', 'true');

    // Booking a pre-TAT day is a confirmed decision, never silent.
    const dayStrip = within(canvas.getByRole('group', {
      name: 'Consult day'
    }));
    await userEvent.click(dayStrip.getByRole('button', {
      name: /Today/
    }));
    await expect(canvas.getByText('Results may not be ready on this day.')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: '09:30'
    }));
    await expect(await canvas.findByText('Results may not be ready for this slot')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Book anyway'
    }));
    await expect(await canvas.findByText(/Booked · Today · 09:30/)).toBeVisible();
    await expect(canvas.getByText(/before results/)).toBeVisible();
    await expect(canvas.getByText(/Endocrinology/)).toBeVisible();
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Teleconsult · skip removes the line, remove re-blocks',
  args: baseArgs,
  render: () => <PreConsultPlayground initial={preConsultReady('pre-skip')} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', {
      name: /5 Pre-consult/
    }));
    await userEvent.click(await canvas.findByRole('button', {
      name: 'Skip consult'
    }));
    await expect(await canvas.findByText('Skipped — results go out without a consult')).toBeVisible();
    // The teleconsult line left the cart with the skip.
    await expect(canvas.queryByRole('button', {
      name: 'Remove Teleconsultation'
    })).not.toBeInTheDocument();
    await expect(canvas.getByRole('button', {
      name: 'Continue'
    })).toBeEnabled();
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Intake · link gated on a verified channel',
  args: baseArgs,
  render: () => <PreConsultPlayground initial={preConsultReady('pre-unverified', {
    verified: false
  })} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', {
      name: /5 Pre-consult/
    }));
    await expect(await canvas.findByRole('button', {
      name: 'Send link'
    })).toBeDisabled();
    await expect(canvas.getByText('Verify a phone or Telegram in Step 2.')).toBeVisible();
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Intake · answering on behalf stamps desk provenance',
  args: baseArgs,
  render: () => <PreConsultPlayground initial={preConsultReady('pre-fill')} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', {
      name: /5 Pre-consult/
    }));
    await userEvent.click(await canvas.findByRole('button', {
      name: 'Send link'
    }));
    await expect(await canvas.findByText(/Intake link sent · just now/)).toBeVisible();

    // Each unanswered section is one row-wide control; opening it edits in place.
    const pendingRows = canvas.getAllByRole('button', {
      name: /Not answered/
    });
    await userEvent.click(pendingRows[0]);
    await userEvent.type(canvas.getByLabelText(/what the patient tells the desk/), 'Follow-up on diabetes control');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Save'
    }));
    // Provenance: this answer came from the desk, not the patient.
    await expect(await canvas.findByText(/recorded by desk/)).toBeVisible();
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Mobile · TAT day strip at 390',
  args: baseArgs,
  globals: {
    viewport: {
      value: 'kura390'
    }
  },
  render: () => <PreConsultPlayground initial={preConsultReady('pre-mobile')} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', {
      name: /5 Pre-consult/
    }));
    await expect(await canvas.findByText(/Estimated results in ~24h/)).toBeVisible();
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: baseArgs,
  globals: {
    theme: 'dark'
  },
  render: () => <PreConsultPlayground initial={preConsultReady('pre-dark')} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Intake · answered count and link state track together',
  args: baseArgs,
  render: () => <PreConsultPlayground initial={preConsultReady('pre-status')} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', {
      name: /5 Pre-consult/
    }));
    // One counter carries the progress; no badge repeats it. The consent section
    // starts satisfied because this cart holds no sensitive tests.
    await expect(await canvas.findByText(/1 of 8 answered/)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send link'
    }));
    await expect(await canvas.findByText(/Intake link sent · just now/)).toBeVisible();

    // Answer "Pre-test prep" on behalf — the answer lands in the right field.
    const pendingRows = canvas.getAllByRole('button', {
      name: /Not answered/
    });
    await userEvent.click(pendingRows[1]);
    await userEvent.type(canvas.getByLabelText(/what the patient tells the desk/), 'Fasted since 22:00');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Save'
    }));
    await expect(await canvas.findByText(/2 of 8 answered/)).toBeVisible();
    await expect(await canvas.findByText(/Fasted since 22:00/)).toBeVisible();
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Intake · skip records a reason, never a gate',
  args: baseArgs,
  render: () => <PreConsultPlayground initial={preConsultReady('pre-skip-intake', {
    tele: false
  })} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', {
      name: /Pre-consult/
    }));
    await userEvent.click(await canvas.findByRole('button', {
      name: 'Skip'
    }));
    // Default reason is preselected; recording is one deliberate action.
    await userEvent.click(canvas.getByRole('button', {
      name: 'Record skip'
    }));
    await expect(await canvas.findByText(/Intake skipped · Patient declined/)).toBeVisible();
    // Never a gate: the step still continues.
    await expect(canvas.getByRole('button', {
      name: 'Continue'
    })).toBeEnabled();
    // The skip is reversible while the patient is still at the desk.
    await userEvent.click(canvas.getByRole('button', {
      name: 'Resume intake'
    }));
    await expect(await canvas.findByText(/1 of 8 answered/)).toBeVisible();
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Teleconsult · change time keeps the booking until replaced',
  args: baseArgs,
  render: () => <PreConsultPlayground initial={preConsultReady('pre-reschedule')} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', {
      name: /5 Pre-consult/
    }));
    // Book the preselected post-TAT day.
    await userEvent.click(await canvas.findByRole('button', {
      name: '09:30'
    }));
    await expect(await canvas.findByText(/Booked · Tomorrow · 09:30/)).toBeVisible();

    // Change time reopens the picker without dropping the booking.
    await userEvent.click(canvas.getByRole('button', {
      name: 'Change time'
    }));
    await expect(await canvas.findByText(/Rebooking — currently Tomorrow · 09:30/)).toBeVisible();
    // Backing out keeps the original slot.
    await userEvent.click(canvas.getByRole('button', {
      name: 'Keep current time'
    }));
    await expect(await canvas.findByText(/Booked · Tomorrow · 09:30/)).toBeVisible();

    // Rebooking replaces the slot in one pick.
    await userEvent.click(canvas.getByRole('button', {
      name: 'Change time'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: '11:00'
    }));
    await expect(await canvas.findByText(/Booked · Tomorrow · 11:00/)).toBeVisible();
  }
}`,...k.parameters?.docs?.source}}},A=[`TatPreselectAndEarlyOverride`,`SkipRemovesConsultLine`,`IntakeLinkNeedsVerifiedChannel`,`FillOnBehalfProvenance`,`Mobile`,`DarkTheme`,`IntakeStatusMachine`,`SkipIntakeWithReason`,`RescheduleTeleconsult`]}))();export{E as DarkTheme,w as FillOnBehalfProvenance,C as IntakeLinkNeedsVerifiedChannel,D as IntakeStatusMachine,T as Mobile,k as RescheduleTeleconsult,O as SkipIntakeWithReason,S as SkipRemovesConsultLine,x as TatPreselectAndEarlyOverride,A as __namedExportsOrder,y as default};