import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{r as i,t as a}from"./readiness-data-D41RGqZh.js";import{d as o,f as s,g as c,m as l}from"./demo-data-DZ0mjvYd.js";import{n as u,t as d}from"./check-in-wizard-DvzZbfaU.js";function f({existingPatients:e=o,initial:t}){let[n,r]=(0,m.useState)(t??l(`walk-in-identity`,27));return(0,p.jsx)(d,{existingPatients:e,identityRegistry:s,onCheckIn:()=>{},onPatientChange:r,patient:n})}var p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U;t((()=>{p=r(),m=e(n()),u(),c(),i(),{expect:h,userEvent:g,waitFor:_,within:v}=__STORYBOOK_MODULE_TEST__,y=`Find patient by phone, booking code, or name`,b={title:`Clinic/Front Desk/Check-In Wizard/Step 1 Identity`,component:d,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`padded`,kura:{readiness:a.frontDesk,intake:{decision:`EXTEND (front-desk Step 1) + CREATE PatientResolutionCard/IdentitySearch`,owner:`src/features/front-desk`,evidence:"UX ported from Kura-med/ui-kit `Receptionist/Wizard/Step 1 Identity` (source-kura-ui-kit). One search field understands phone, booking code, or name; the result renders as one resolution card, and selecting a patient advances the wizard in one action. Selection provenance stays visually neutral until the backend reports verified assurance. Rebound to house tokens, Card, Badge, Avatar, Button, Input, and Dialog primitives, with canonical Kura icons.",exclusions:[`National ID chip and QR capture (hardware ceremony, deferred)`,`Upstream StepShell/aside scaffold (this wizard owns its own shell and cart rail)`]},journeys:[`front-desk-check-in`,`front-desk-duplicate-guard`],binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura`,icons:`kura-hugeicons`}},docs:{description:{component:`Step 1 finds the patient who is checking in. One search field resolves phone, booking code, or name; the result renders as a resolution card (known here, known elsewhere, shared phone, booking-linked, candidates, no match). Selecting a minor requires a present guardian. Selecting a patient advances to Step 2 in one action.`}}}},x={patient:l(`walk-in-identity`,27),onPatientChange:()=>{},existingPatients:o,onCheckIn:()=>{}},S={args:x,render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=v(e);await h(t.getByLabelText(y)).toHaveFocus(),await h(t.getByRole(`heading`,{level:2,name:`Find or create a patient`})).toBeVisible(),await h(t.queryByRole(`button`,{name:/Other ID methods/})).not.toBeInTheDocument(),await h(t.getByRole(`button`,{name:`Review details`})).toBeDisabled()}},C={name:`Phone match · known patient with bookings`,args:x,render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=v(e);await g.type(t.getByLabelText(y),`093 123 8123`),await h(await t.findByText(`Known patient`)).toBeVisible(),await h(t.getByText(`Sok Phearom`)).toBeVisible(),await h(t.getByRole(`button`,{name:`Check in against booking GW87430`})).toBeVisible(),await h(t.getByRole(`button`,{name:`Continue without a booking`})).toBeVisible()}},w={name:`Phone match · known in Kura, first visit here`,args:x,render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=v(e);await g.type(t.getByLabelText(y),`012 345 678`),await h(await t.findByText(`Maly Chea`)).toBeVisible(),await h(t.getByText(`First visit at this PSC`)).toBeVisible(),await h(t.getByRole(`button`,{name:/Import Maly Chea/})).toBeVisible()}},T={name:`Shared phone · guardian gate on a minor`,args:x,render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=v(e);await g.type(t.getByLabelText(y),`087 654 3210`);let n=await t.findByRole(`radiogroup`,{name:`Choose who is here today`});await h(v(n).getAllByRole(`radio`)).toHaveLength(2),await h(t.getByText(`Choose a patient to continue.`)).toBeVisible(),await g.click(v(n).getByRole(`radio`,{name:/Baby Prum/})),await h(await t.findByText(`Confirm the guardian is present to continue with a minor.`)).toBeVisible(),await h(t.queryByRole(`button`,{name:/Check in Baby Prum/})).not.toBeInTheDocument(),await g.click(t.getByRole(`button`,{name:`Confirm guardian present`})),await h(await t.findByText(/Guardian confirmed/)).toBeVisible(),await h(t.getByRole(`button`,{name:/Check in Baby Prum · GW87441/})).toBeVisible(),await g.click(v(n).getByRole(`radio`,{name:/Lina Prum/})),await h(t.getByRole(`button`,{name:/Check in Lina Prum · GW87440/})).toBeVisible()}},E={args:x,render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=v(e);await g.type(t.getByLabelText(y),`GW87430`),await h(await t.findByText(`Booking matched`)).toBeVisible(),await h(t.getByText(`Code`)).toBeVisible(),await h(t.getByRole(`button`,{name:/Check in booking GW87430/})).toBeVisible()}},D={name:`Scan booking QR → code fills the search`,args:x,render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=v(e);await g.click(t.getByRole(`button`,{name:`Scan booking QR`}));let n=await v(document.body).findByRole(`dialog`,{name:`Scan booking QR`}),r=v(n).getByLabelText(`Booking QR payload`);await g.type(r,`hello{Enter}`),await h(await v(n).findByText(`No booking code found in this QR.`)).toBeVisible(),await g.clear(r),await g.type(r,`kura://booking/GW87430{Enter}`),await _(async()=>{await h(t.getByLabelText(y)).toHaveValue(`GW87430`)}),await h(await t.findByText(`Booking matched`)).toBeVisible()}},O={name:`Name search · possible matches`,args:x,render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=v(e);await g.type(t.getByLabelText(y),`Sok`),await h(await t.findByText(`Possible matches`)).toBeVisible(),await h(t.getAllByText(`Verified`).length).toBeGreaterThanOrEqual(1),await h(t.getByText(`Unverified`)).toBeVisible();let n=t.getAllByRole(`button`,{name:`Different person`}),r=n.length;await g.click(n[0]),await _(async()=>{await h(t.getAllByRole(`button`,{name:`Different person`})).toHaveLength(r-1)})}},k={name:`No match → continue as new patient`,args:x,render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=v(e);await g.type(t.getByLabelText(y),`099 999 9999`),await h(await t.findByText(`No existing record`)).toBeVisible(),await g.click(t.getByRole(`button`,{name:`Create a new patient`})),await h(await t.findByRole(`heading`,{level:2,name:/Review & confirm/})).toBeVisible()}},A={name:`Unknown booking code · no new-patient shortcut`,args:x,render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=v(e);await g.type(t.getByLabelText(y),`ZZ99999`),await h(await t.findByText(`No existing record`)).toBeVisible(),await h(t.queryByRole(`button`,{name:`Create a new patient`})).not.toBeInTheDocument()}},j={name:`Patient selected · manual entry and change patient path`,args:x,render:()=>(0,p.jsx)(f,{existingPatients:[],initial:{...l(`walk-in-captured`,28),name:`Sokha Chan`,dob:`1992-03-14`,sexAtBirth:`Female`,idNumber:``,phoneNumber:`12777088`,identity:{source:`manual`,lockedFields:[]}}}),play:async({canvasElement:e})=>{let t=v(e);await g.click(t.getByRole(`tab`,{name:/Identity/})),await h(await t.findByRole(`heading`,{level:2,name:`Patient selected`})).toBeVisible(),await h(t.getByText(`Source: Manual entry`)).toBeVisible(),await h(t.getByText(`Review and edit details on the next step.`)).toBeVisible(),await h(t.getByRole(`button`,{name:`Review details`})).toBeEnabled(),await g.click(t.getByRole(`button`,{name:`Choose a different patient`})),await h(t.getByText(`Choose a different patient?`)).toBeVisible(),await g.click(t.getByRole(`button`,{name:`Search again`})),await h(await t.findByLabelText(y)).toBeVisible(),await h(t.getByRole(`button`,{name:`Review details`})).toBeDisabled()}},M={name:`Patient selected · narrow viewport and long name`,args:x,globals:{viewport:{value:`kura390`}},parameters:{chromatic:{viewports:[320,390]}},render:()=>(0,p.jsx)(f,{existingPatients:[],initial:{...l(`walk-in-captured-mobile`,29),name:`Sokha Chanmony Rattanak Sambath`,dob:`1992-03-14`,sexAtBirth:`Female`,phoneNumber:`12777088`,identity:{source:`manual`,lockedFields:[]}}}),play:async({canvasElement:e})=>{let t=v(e);await g.click(t.getByRole(`tab`,{name:/Identity/})),await h(t.getAllByText(`Patient selected`)).toHaveLength(1),await h(t.getAllByText(`Sokha Chanmony Rattanak Sambath`)).toHaveLength(2),await h(t.getByText(`Source: Manual entry`)).toBeVisible(),await h(t.getByRole(`button`,{name:`Choose a different patient`})).toBeVisible(),await h(t.getByRole(`button`,{name:`Review details`})).toBeEnabled()}},N={args:x,globals:{viewport:{value:`kura390`}},render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=v(e);await g.type(t.getByLabelText(y),`093 123 8123`),await h(await t.findByText(`Sok Phearom`)).toBeVisible()}},P={args:x,globals:{theme:`dark`},render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=v(e);await g.type(t.getByLabelText(y),`087 654 3210`),await h(await t.findByRole(`radiogroup`,{name:`Choose who is here today`})).toBeVisible()}},F={args:x,render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=v(e);await g.type(t.getByLabelText(y),`GW87510`),await h(await t.findByText(`Booking code expired`)).toBeVisible(),await h(t.getByText(`Expired`)).toBeVisible(),await h(t.getByRole(`button`,{name:/Continue with Sok Phearom as walk-in/})).toBeVisible(),await h(t.queryByRole(`button`,{name:/Check in booking/})).not.toBeInTheDocument()}},I={args:x,render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=v(e);await g.type(t.getByLabelText(y),`GW87511`),await h(await t.findByText(`Code already redeemed`)).toBeVisible(),await h(t.getByText(/may already be checked in/)).toBeVisible(),await h(t.getByRole(`button`,{name:`Continue as a walk-in`})).toBeVisible()}},L={args:x,render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=v(e);await g.type(t.getByLabelText(y),`GW87512`),await h(await t.findByText(`Booking cancelled`)).toBeVisible(),await h(t.getByText(/Confirm with the patient/)).toBeVisible()}},R={args:x,render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=v(e);await g.type(t.getByLabelText(y),`GW87513`),await h(await t.findByText(`Issued for another branch`)).toBeVisible(),await h(t.getByText(/direct the patient there/i)).toBeVisible(),await h(t.getByRole(`button`,{name:/Continue with Sok Phearom as walk-in/})).toBeVisible()}},z={name:`Multiple bookings · pick the one this visit is for`,args:x,render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=v(e);await g.type(t.getByLabelText(y),`093 123 8123`),await h(await t.findByText(`Known patient`)).toBeVisible(),await h(t.getByText(`Reception · Sothea`)).toBeVisible(),await h(t.getByText(`Patient self-booked`)).toBeVisible(),await h(t.getByRole(`button`,{name:`Continue without a booking`})).toBeVisible(),await h(t.queryByRole(`button`,{name:`Check in against booking GW87510`})).not.toBeInTheDocument(),await h(t.queryByRole(`button`,{name:`Check in against booking GW87513`})).not.toBeInTheDocument(),await g.click(t.getByRole(`button`,{name:`Check in against booking GW87431`})),await _(async()=>{await h(t.queryByLabelText(y)).not.toBeInTheDocument()})}},B={name:`Trust signals · stale phone verification warns`,args:x,render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=v(e);await g.type(t.getByLabelText(y),`077 123 456`),await h(await t.findByText(`Phone last verified 14 months ago`)).toBeVisible()}},V={name:`Duplicate guard · exact ID needs a supervisor PIN`,args:x,render:()=>(0,p.jsx)(f,{initial:{...l(`walk-in-nid-dup`,33),name:`Sokha C.`,dob:`1992-03-14`,sexAtBirth:`Female`,idNumber:`KH-114522`,identity:{source:`manual`,lockedFields:[]}}}),play:async({canvasElement:e})=>{let t=v(e);await h(await t.findByText(/Exact ID match — Sokha Chan/)).toBeVisible(),await h(t.getByText(`Matched on National ID`,{exact:!1})).toBeVisible();let n=t.getByRole(`button`,{name:`Different person — continue`});await h(n).toBeDisabled(),await g.type(t.getByLabelText(`Supervisor PIN`),`4821`),await h(n).toBeEnabled(),await g.click(t.getByRole(`button`,{name:`View record`})),await h(t.getByText(`Q-012`)).toBeVisible(),await h(t.getByRole(`button`,{name:`Use existing record`})).toBeVisible()}},H={name:`Patient selected · provenance and change patient confirmation`,args:x,render:()=>(0,p.jsx)(f,{initial:{...l(`walk-in-prov`,34),name:`Sok Phearom`,dob:`1974-03-15`,sexAtBirth:`Male`,arrivedLabel:`08:24 · 12 min ago`,boundBookingCode:`GW87430`,identity:{source:`existing`,lockedFields:[`name`,`dob`,`sexAtBirth`],capturedAtLabel:`08:31`}}}),play:async({canvasElement:e})=>{let t=v(e);await g.click(t.getByRole(`tab`,{name:/Identity/})),await h(await t.findByText(`Source: Existing Kura record · Captured 08:31`)).toBeVisible(),await h(t.getByText(`3 fields locked`)).toBeVisible(),await h(t.getByText(`Booking GW87430`)).toBeVisible(),await h(t.getByText(`Q-034`)).toBeVisible(),await h(t.getByText(`Arrived 08:24 · 12 min ago`)).toBeVisible(),await g.click(t.getByRole(`button`,{name:`Choose a different patient`})),await h(t.getByText(`Choose a different patient?`)).toBeVisible(),await g.click(t.getByRole(`button`,{name:`Keep current`})),await h(t.queryByText(`Choose a different patient?`)).not.toBeInTheDocument()}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText(SEARCH_LABEL)).toHaveFocus();
    await expect(canvas.getByRole('heading', {
      level: 2,
      name: 'Find or create a patient'
    })).toBeVisible();
    await expect(canvas.queryByRole('button', {
      name: /Other ID methods/
    })).not.toBeInTheDocument();
    await expect(canvas.getByRole('button', {
      name: 'Review details'
    })).toBeDisabled();
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Phone match · known patient with bookings',
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), '093 123 8123');
    await expect(await canvas.findByText('Known patient')).toBeVisible();
    await expect(canvas.getByText('Sok Phearom')).toBeVisible();
    // Bookings are the primary check-in action; walk-in demotes to an escape.
    await expect(canvas.getByRole('button', {
      name: 'Check in against booking GW87430'
    })).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Continue without a booking'
    })).toBeVisible();
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Phone match · known in Kura, first visit here',
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), '012 345 678');
    await expect(await canvas.findByText('Maly Chea')).toBeVisible();
    await expect(canvas.getByText('First visit at this PSC')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: /Import Maly Chea/
    })).toBeVisible();
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Shared phone · guardian gate on a minor',
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), '087 654 3210');
    const group = await canvas.findByRole('radiogroup', {
      name: 'Choose who is here today'
    });
    await expect(within(group).getAllByRole('radio')).toHaveLength(2);
    await expect(canvas.getByText('Choose a patient to continue.')).toBeVisible();

    // Selecting the minor blocks until the guardian is confirmed present.
    await userEvent.click(within(group).getByRole('radio', {
      name: /Baby Prum/
    }));
    await expect(await canvas.findByText('Confirm the guardian is present to continue with a minor.')).toBeVisible();
    await expect(canvas.queryByRole('button', {
      name: /Check in Baby Prum/
    })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Confirm guardian present'
    }));
    await expect(await canvas.findByText(/Guardian confirmed/)).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: /Check in Baby Prum · GW87441/
    })).toBeVisible();

    // Switching to the adult clears the gate.
    await userEvent.click(within(group).getByRole('radio', {
      name: /Lina Prum/
    }));
    await expect(canvas.getByRole('button', {
      name: /Check in Lina Prum · GW87440/
    })).toBeVisible();
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), 'GW87430');
    await expect(await canvas.findByText('Booking matched')).toBeVisible();
    await expect(canvas.getByText('Code')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: /Check in booking GW87430/
    })).toBeVisible();
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Scan booking QR → code fills the search',
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Scan booking QR'
    }));
    const dialog = await within(document.body).findByRole('dialog', {
      name: 'Scan booking QR'
    });
    const scanField = within(dialog).getByLabelText('Booking QR payload');

    // A payload without a code reports the failure inline.
    await userEvent.type(scanField, 'hello{Enter}');
    await expect(await within(dialog).findByText('No booking code found in this QR.')).toBeVisible();
    await userEvent.clear(scanField);
    await userEvent.type(scanField, 'kura://booking/GW87430{Enter}');
    await waitFor(async () => {
      await expect(canvas.getByLabelText(SEARCH_LABEL)).toHaveValue('GW87430');
    });
    await expect(await canvas.findByText('Booking matched')).toBeVisible();
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Name search · possible matches',
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), 'Sok');
    await expect(await canvas.findByText('Possible matches')).toBeVisible();
    await expect(canvas.getAllByText('Verified').length).toBeGreaterThanOrEqual(1);
    await expect(canvas.getByText('Unverified')).toBeVisible();

    // "Different person" dismisses a candidate without capturing.
    const dismissButtons = canvas.getAllByRole('button', {
      name: 'Different person'
    });
    const initialCount = dismissButtons.length;
    await userEvent.click(dismissButtons[0]);
    await waitFor(async () => {
      await expect(canvas.getAllByRole('button', {
        name: 'Different person'
      })).toHaveLength(initialCount - 1);
    });
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'No match → continue as new patient',
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), '099 999 9999');
    await expect(await canvas.findByText('No existing record')).toBeVisible();

    // Capturing advances to Step 2 with the phone carried over.
    await userEvent.click(canvas.getByRole('button', {
      name: 'Create a new patient'
    }));
    await expect(await canvas.findByRole('heading', {
      level: 2,
      name: /Review & confirm/
    })).toBeVisible();
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Unknown booking code · no new-patient shortcut',
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), 'ZZ99999');
    await expect(await canvas.findByText('No existing record')).toBeVisible();
    await expect(canvas.queryByRole('button', {
      name: 'Create a new patient'
    })).not.toBeInTheDocument();
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Patient selected · manual entry and change patient path',
  args: baseArgs,
  render: () => {
    const captured: FrontDeskPatient = {
      ...blankWalkIn('walk-in-captured', 28),
      name: 'Sokha Chan',
      dob: '1992-03-14',
      sexAtBirth: 'Female',
      idNumber: '',
      phoneNumber: '12777088',
      identity: {
        source: 'manual',
        lockedFields: []
      }
    };
    return <IdentityPlayground existingPatients={[]} initial={captured} />;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    // A selected patient reopens on Step 2 (first not-done step); Step 1 stays
    // reachable to review or choose another patient.
    await userEvent.click(canvas.getByRole('tab', {
      name: /Identity/
    }));
    await expect(await canvas.findByRole('heading', {
      level: 2,
      name: 'Patient selected'
    })).toBeVisible();
    await expect(canvas.getByText('Source: Manual entry')).toBeVisible();
    await expect(canvas.getByText('Review and edit details on the next step.')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Review details'
    })).toBeEnabled();

    // Changing patients asks first, then returns to the search.
    await userEvent.click(canvas.getByRole('button', {
      name: 'Choose a different patient'
    }));
    await expect(canvas.getByText('Choose a different patient?')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Search again'
    }));
    await expect(await canvas.findByLabelText(SEARCH_LABEL)).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Review details'
    })).toBeDisabled();
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Patient selected · narrow viewport and long name',
  args: baseArgs,
  globals: {
    viewport: {
      value: 'kura390'
    }
  },
  parameters: {
    chromatic: {
      viewports: [320, 390]
    }
  },
  render: () => {
    const captured: FrontDeskPatient = {
      ...blankWalkIn('walk-in-captured-mobile', 29),
      name: 'Sokha Chanmony Rattanak Sambath',
      dob: '1992-03-14',
      sexAtBirth: 'Female',
      phoneNumber: '12777088',
      identity: {
        source: 'manual',
        lockedFields: []
      }
    };
    return <IdentityPlayground existingPatients={[]} initial={captured} />;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', {
      name: /Identity/
    }));
    await expect(canvas.getAllByText('Patient selected')).toHaveLength(1);
    // The name reads twice on this step by design: the identity strip carries
    // it through all six steps, the card confirms what was just captured.
    // Both must survive a long name at 390px without clipping the other.
    await expect(canvas.getAllByText('Sokha Chanmony Rattanak Sambath')).toHaveLength(2);
    await expect(canvas.getByText('Source: Manual entry')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Choose a different patient'
    })).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Review details'
    })).toBeEnabled();
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: baseArgs,
  globals: {
    viewport: {
      value: 'kura390'
    }
  },
  render: () => <IdentityPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), '093 123 8123');
    await expect(await canvas.findByText('Sok Phearom')).toBeVisible();
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: baseArgs,
  globals: {
    theme: 'dark'
  },
  render: () => <IdentityPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), '087 654 3210');
    await expect(await canvas.findByRole('radiogroup', {
      name: 'Choose who is here today'
    })).toBeVisible();
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), 'GW87510');
    await expect(await canvas.findByText('Booking code expired')).toBeVisible();
    await expect(canvas.getByText('Expired')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: /Continue with Sok Phearom as walk-in/
    })).toBeVisible();
    await expect(canvas.queryByRole('button', {
      name: /Check in booking/
    })).not.toBeInTheDocument();
  }
}`,...F.parameters?.docs?.source},description:{story:`Canonical collection-code lifecycle branches. A blocked code is never
silently redeemed: the desk sees the canonical status, why it blocks, and a
recovery door (walk-in with the same record) — never a dead end.`,...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), 'GW87511');
    await expect(await canvas.findByText('Code already redeemed')).toBeVisible();
    await expect(canvas.getByText(/may already be checked in/)).toBeVisible();
    // Duplicate-visit risk: the recovery is deliberately secondary, never primary.
    await expect(canvas.getByRole('button', {
      name: 'Continue as a walk-in'
    })).toBeVisible();
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), 'GW87512');
    await expect(await canvas.findByText('Booking cancelled')).toBeVisible();
    await expect(canvas.getByText(/Confirm with the patient/)).toBeVisible();
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), 'GW87513');
    await expect(await canvas.findByText('Issued for another branch')).toBeVisible();
    await expect(canvas.getByText(/direct the patient there/i)).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: /Continue with Sok Phearom as walk-in/
    })).toBeVisible();
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Multiple bookings · pick the one this visit is for',
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), '093 123 8123');
    await expect(await canvas.findByText('Known patient')).toBeVisible();
    await expect(canvas.getByText('Reception · Sothea')).toBeVisible();
    await expect(canvas.getByText('Patient self-booked')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Continue without a booking'
    })).toBeVisible();
    // Non-redeemable codes stay visible as facts but are never check-in targets.
    await expect(canvas.queryByRole('button', {
      name: 'Check in against booking GW87510'
    })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('button', {
      name: 'Check in against booking GW87513'
    })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Check in against booking GW87431'
    }));
    // Bound booking travels with the capture and the wizard advances.
    await waitFor(async () => {
      await expect(canvas.queryByLabelText(SEARCH_LABEL)).not.toBeInTheDocument();
    });
  }
}`,...z.parameters?.docs?.source},description:{story:`Check-in binds to ONE booking. A patient with several same-day bookings gets
actionable booking rows (with creator provenance); the walk-in path demotes
to an outline escape. Picking a row advances with that code bound.`,...z.parameters?.docs?.description}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: 'Trust signals · stale phone verification warns',
  args: baseArgs,
  render: () => <IdentityPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(SEARCH_LABEL), '077 123 456');
    await expect(await canvas.findByText('Phone last verified 14 months ago')).toBeVisible();
  }
}`,...B.parameters?.docs?.source},description:{story:`Verification recency is a trust fact, not decoration: a stale channel warns
before the desk relies on it. PROTOTYPE: patient-ms stores assurance only.`,...B.parameters?.docs?.description}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Duplicate guard · exact ID needs a supervisor PIN',
  args: baseArgs,
  render: () => {
    const draft: FrontDeskPatient = {
      ...blankWalkIn('walk-in-nid-dup', 33),
      name: 'Sokha C.',
      dob: '1992-03-14',
      sexAtBirth: 'Female',
      idNumber: 'KH-114522',
      identity: {
        source: 'manual',
        lockedFields: []
      }
    };
    return <IdentityPlayground initial={draft} />;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText(/Exact ID match — Sokha Chan/)).toBeVisible();
    await expect(canvas.getByText('Matched on National ID', {
      exact: false
    })).toBeVisible();
    const proceed = canvas.getByRole('button', {
      name: 'Different person — continue'
    });
    await expect(proceed).toBeDisabled();
    await userEvent.type(canvas.getByLabelText('Supervisor PIN'), '4821');
    await expect(proceed).toBeEnabled();
    // The existing record stays inspectable before any decision.
    await userEvent.click(canvas.getByRole('button', {
      name: 'View record'
    }));
    await expect(canvas.getByText('Q-012')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Use existing record'
    })).toBeVisible();
  }
}`,...V.parameters?.docs?.source},description:{story:`An exact-ID duplicate cannot be waved through: keeping both records takes a
supervisor PIN and the decision is framed as logged. Lower-tier collisions
keep the one-click acknowledgement.`,...V.parameters?.docs?.description}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Patient selected · provenance and change patient confirmation',
  args: baseArgs,
  render: () => {
    const draft: FrontDeskPatient = {
      ...blankWalkIn('walk-in-prov', 34),
      name: 'Sok Phearom',
      dob: '1974-03-15',
      sexAtBirth: 'Male',
      arrivedLabel: '08:24 · 12 min ago',
      boundBookingCode: 'GW87430',
      identity: {
        source: 'existing',
        lockedFields: ['name', 'dob', 'sexAtBirth'],
        capturedAtLabel: '08:31'
      }
    };
    return <IdentityPlayground initial={draft} />;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    // A selected patient reopens on Step 2; Step 1 stays reachable for review.
    await userEvent.click(canvas.getByRole('tab', {
      name: /Identity/
    }));
    await expect(await canvas.findByText('Source: Existing Kura record · Captured 08:31')).toBeVisible();
    await expect(canvas.getByText('3 fields locked')).toBeVisible();
    await expect(canvas.getByText('Booking GW87430')).toBeVisible();
    await expect(canvas.getByText('Q-034')).toBeVisible();
    await expect(canvas.getByText('Arrived 08:24 · 12 min ago')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Choose a different patient'
    }));
    await expect(canvas.getByText('Choose a different patient?')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Keep current'
    }));
    await expect(canvas.queryByText('Choose a different patient?')).not.toBeInTheDocument();
  }
}`,...H.parameters?.docs?.source},description:{story:`Selection provenance survives: source + time + locked-field count + the
bound booking; changing patients asks first and preserves data until replaced.`,...H.parameters?.docs?.description}}},U=[`BlankWalkIn`,`PhoneMatchKnownHere`,`PhoneMatchKnownElsewhere`,`SharedPhoneGuardianGate`,`BookingCodeMatch`,`ScanBookingQr`,`NameCandidates`,`NoMatchNewPatient`,`UnknownBookingCode`,`IdentityCaptured`,`IdentityCapturedMobile`,`MobileNarrow`,`DarkTheme`,`BookingExpired`,`BookingAlreadyRedeemed`,`BookingCancelledCode`,`BookingWrongBranch`,`MultiBookingCheckIn`,`TrustSignalsStaleVerification`,`CollisionSupervisorPin`,`CapturedProvenance`]}))();export{S as BlankWalkIn,I as BookingAlreadyRedeemed,L as BookingCancelledCode,E as BookingCodeMatch,F as BookingExpired,R as BookingWrongBranch,H as CapturedProvenance,V as CollisionSupervisorPin,P as DarkTheme,j as IdentityCaptured,M as IdentityCapturedMobile,N as MobileNarrow,z as MultiBookingCheckIn,O as NameCandidates,k as NoMatchNewPatient,w as PhoneMatchKnownElsewhere,C as PhoneMatchKnownHere,D as ScanBookingQr,T as SharedPhoneGuardianGate,B as TrustSignalsStaleVerification,A as UnknownBookingCode,U as __namedExportsOrder,b as default};