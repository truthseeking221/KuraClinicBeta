import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{r as i,t as a}from"./readiness-data-D41RGqZh.js";import{d as o,f as s,g as c,m as l}from"./demo-data-DZ0mjvYd.js";import{n as u,t as d}from"./check-in-wizard-DvzZbfaU.js";function f(e,t){return{...l(e,41),name:t===`Female`?`Srey Neang`:`Dara Chen`,dob:`1994-06-02`,sexAtBirth:t,otpVerified:!0,insuranceAcked:!0,identity:{source:`manual`,lockedFields:[]}}}function p({initial:e}){let[t,n]=(0,h.useState)(e);return(0,m.jsx)(d,{existingPatients:o,identityRegistry:s,onCheckIn:()=>{},onPatientChange:n,patient:t})}var m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;t((()=>{m=r(),h=e(n()),u(),c(),i(),{expect:g,userEvent:_,waitFor:v,within:y}=__STORYBOOK_MODULE_TEST__,b={title:`Clinic/Front Desk/Check-In Wizard/Step 4 Orders & Consent`,component:d,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`padded`,kura:{readiness:a.frontDesk,intake:{decision:`EXTEND (front-desk Orders step) — consent chain + pregnancy gate`,owner:`src/features/front-desk`,evidence:`Ported from the legacy receptionist prototype (imaging consent badge chain, verbal-consent modal with supervisor witness PIN, pregnancy gate with clinician override) and ui-kit consent framing. PROTOTYPE CONTRACT: kura-platform has no consent engine — every chain here is the proposed per-line contract (needed → sent → signed, or a named verbal record), never a boolean.`,exclusions:[`Customer-display sign-off push (simulated with an explicit demo button)`,`Consent document storage/audit RPC (no upstream engine)`]},journeys:[`front-desk-check-in`],binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura`,icons:`kura-hugeicons`}},docs:{description:{component:`Consent is a per-line chain, not a checkbox. Imaging and sensitive tests enter the cart with an open chain that blocks payment until it is signed on the patient phone or recorded verbally (named recorder; supervisor witness PIN for sensitive tests). Imaging for a patient whose sex at birth is Female passes a pregnancy screen first — "possibly pregnant" needs a named clinician override or the order is cancelled.`}}}},x={patient:f(`consent-base`,`Male`),onPatientChange:()=>{},existingPatients:o,onCheckIn:()=>{}},S={name:`Imaging consent · needed → sent → signed`,args:x,render:()=>(0,m.jsx)(p,{initial:f(`consent-imaging`,`Male`)}),play:async({canvasElement:e})=>{let t=y(e),n=y(e.ownerDocument.body);await _.click(t.getByRole(`tab`,{name:/Orders/})),await _.click(t.getByRole(`button`,{name:/Additional order types/})),await _.click(n.getByRole(`checkbox`,{name:`Chest X-ray`})),await g((await t.findAllByText(`Consent needed`))[0]).toBeVisible(),await _.click(t.getByRole(`button`,{name:`Send sign-off`})),await g(t.getByText(`Sent · awaiting signature`)).toBeVisible(),await _.click(t.getByRole(`button`,{name:`Simulate patient signature`})),await g(t.getByText(`Signed on phone`)).toBeVisible()}},C={name:`Verbal consent · sensitive test needs a supervisor witness`,args:x,render:()=>(0,m.jsx)(p,{initial:f(`consent-verbal`,`Male`)}),play:async({canvasElement:e})=>{let t=y(e),n=y(e.ownerDocument.body);await _.click(t.getByRole(`tab`,{name:/Orders/})),await _.click(t.getByRole(`checkbox`,{name:`HIV 4th-gen Ag/Ab`})),await _.click(await t.findByRole(`button`,{name:`Verbal consent`})),await g(await n.findByText(/supervisor witness/)).toBeVisible();let r=n.getByRole(`button`,{name:`Record consent`});await _.type(n.getByLabelText(`Recorded by`),`Linh Nguyen`),await g(r).toBeDisabled(),await _.type(n.getByLabelText(`Supervisor witness PIN`),`4821`),await g(r).toBeEnabled(),await _.click(r),await g(await t.findByText(`Verbal · recorded`)).toBeVisible(),await g(t.getByText(/Verbal · Linh Nguyen · just now/)).toBeVisible()}},w={name:`Pregnancy gate · not pregnant proceeds with open consent`,args:x,render:()=>(0,m.jsx)(p,{initial:f(`consent-preg-no`,`Female`)}),play:async({canvasElement:e})=>{let t=y(e),n=y(e.ownerDocument.body);await _.click(t.getByRole(`tab`,{name:/Orders/})),await _.click(t.getByRole(`button`,{name:/Additional order types/})),await _.click(n.getByRole(`checkbox`,{name:`Chest X-ray`})),await g(await n.findByText(/Could the patient be pregnant/)).toBeVisible(),await _.click(n.getByRole(`button`,{name:`Not pregnant — add order`})),await g((await t.findAllByText(`Consent needed`))[0]).toBeVisible()}},T={name:`Pregnancy gate · possibly pregnant needs a clinician override`,args:x,render:()=>(0,m.jsx)(p,{initial:f(`consent-preg-override`,`Female`)}),play:async({canvasElement:e})=>{let t=y(e),n=y(e.ownerDocument.body);await _.click(t.getByRole(`tab`,{name:/Orders/})),await _.click(t.getByRole(`button`,{name:/Additional order types/})),await _.click(n.getByRole(`checkbox`,{name:`Chest X-ray`})),await _.click(await n.findByRole(`button`,{name:`Possibly pregnant`})),await g(await n.findByText(`Clinician override required`)).toBeVisible();let r=n.getByRole(`button`,{name:`Record & add`});await g(r).toBeDisabled(),await _.type(n.getByLabelText(`Clinician override · sign-off name`),`Dr. Sok Vanna`),await _.click(r),await g(await t.findByText(/Clinician override · Dr. Sok Vanna/)).toBeVisible()}},E={name:`Pregnancy gate · cancelling never adds the order`,args:x,render:()=>(0,m.jsx)(p,{initial:f(`consent-preg-cancel`,`Female`)}),play:async({canvasElement:e})=>{let t=y(e),n=y(e.ownerDocument.body);await _.click(t.getByRole(`tab`,{name:/Orders/})),await _.click(t.getByRole(`button`,{name:/Additional order types/}));let r=n.getByRole(`checkbox`,{name:`Chest X-ray`});await _.click(r),await _.click(await n.findByRole(`button`,{name:`Cancel order`})),await v(async()=>{await g(r).not.toBeChecked()}),await g(t.queryByText(`Consent needed`)).not.toBeInTheDocument()}},D={name:`Payment stays blocked while a consent chain is open`,args:x,render:()=>{let e=f(`consent-pay-block`,`Male`);return(0,m.jsx)(p,{initial:{...e,cart:{...e.cart,attributedPrescriberId:`dr-sok-vanna`,items:[{id:`xray-chest`,kind:`imaging`,name:`Chest X-ray`,priceMinor:`1800`,currencyCode:`USD`,qty:1,consent:{state:`needed`}}]}}})},play:async({canvasElement:e})=>{let t=y(e);await _.click(t.getByRole(`tab`,{name:/Payment/})),await g(await t.findByText(`Resolve blockers before collecting payment`)).toBeVisible(),await g(t.getByText(/Chest X-ray still needs consent — resolve it on the Orders step/)).toBeVisible()}},O={name:`Mobile · consent panel at 390`,args:x,globals:{viewport:{value:`kura390`}},render:()=>{let e=f(`consent-mobile`,`Male`);return(0,m.jsx)(p,{initial:{...e,cart:{...e.cart,attributedPrescriberId:`dr-sok-vanna`,items:[{id:`hiv-ag-ab`,kind:`lab`,name:`HIV Ag/Ab combo`,priceMinor:`1000`,currencyCode:`USD`,qty:1,consent:{state:`sent`,atLabel:`09:12`}}]}}})},play:async({canvasElement:e})=>{let t=y(e);await _.click(t.getByRole(`tab`,{name:/Orders/})),await g(await t.findByText(`Sent · awaiting signature`)).toBeVisible()}},k={args:x,globals:{theme:`dark`},render:()=>{let e=f(`consent-dark`,`Male`);return(0,m.jsx)(p,{initial:{...e,cart:{...e.cart,attributedPrescriberId:`dr-sok-vanna`,items:[{id:`xray-chest`,kind:`imaging`,name:`Chest X-ray`,priceMinor:`1800`,currencyCode:`USD`,qty:1,consent:{state:`needed`}}]}}})}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Imaging consent · needed → sent → signed',
  args: baseArgs,
  render: () => <ConsentPlayground initial={orderReady('consent-imaging', 'Male')} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('tab', {
      name: /Orders/
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: /Additional order types/
    }));
    await userEvent.click(body.getByRole('checkbox', {
      name: 'Chest X-ray'
    }));
    await expect((await canvas.findAllByText('Consent needed'))[0]).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send sign-off'
    }));
    await expect(canvas.getByText('Sent · awaiting signature')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Simulate patient signature'
    }));
    await expect(canvas.getByText('Signed on phone')).toBeVisible();
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Verbal consent · sensitive test needs a supervisor witness',
  args: baseArgs,
  render: () => <ConsentPlayground initial={orderReady('consent-verbal', 'Male')} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('tab', {
      name: /Orders/
    }));
    await userEvent.click(canvas.getByRole('checkbox', {
      name: 'HIV 4th-gen Ag/Ab'
    }));
    await userEvent.click(await canvas.findByRole('button', {
      name: 'Verbal consent'
    }));
    await expect(await body.findByText(/supervisor witness/)).toBeVisible();
    const record = body.getByRole('button', {
      name: 'Record consent'
    });
    await userEvent.type(body.getByLabelText('Recorded by'), 'Linh Nguyen');
    await expect(record).toBeDisabled();
    await userEvent.type(body.getByLabelText('Supervisor witness PIN'), '4821');
    await expect(record).toBeEnabled();
    await userEvent.click(record);
    await expect(await canvas.findByText('Verbal · recorded')).toBeVisible();
    await expect(canvas.getByText(/Verbal · Linh Nguyen · just now/)).toBeVisible();
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Pregnancy gate · not pregnant proceeds with open consent',
  args: baseArgs,
  render: () => <ConsentPlayground initial={orderReady('consent-preg-no', 'Female')} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('tab', {
      name: /Orders/
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: /Additional order types/
    }));
    await userEvent.click(body.getByRole('checkbox', {
      name: 'Chest X-ray'
    }));
    await expect(await body.findByText(/Could the patient be pregnant/)).toBeVisible();
    await userEvent.click(body.getByRole('button', {
      name: 'Not pregnant — add order'
    }));
    // The scan is ordered, but its consent chain still gates payment.
    await expect((await canvas.findAllByText('Consent needed'))[0]).toBeVisible();
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Pregnancy gate · possibly pregnant needs a clinician override',
  args: baseArgs,
  render: () => <ConsentPlayground initial={orderReady('consent-preg-override', 'Female')} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('tab', {
      name: /Orders/
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: /Additional order types/
    }));
    await userEvent.click(body.getByRole('checkbox', {
      name: 'Chest X-ray'
    }));
    await userEvent.click(await body.findByRole('button', {
      name: 'Possibly pregnant'
    }));
    await expect(await body.findByText('Clinician override required')).toBeVisible();
    const record = body.getByRole('button', {
      name: 'Record & add'
    });
    await expect(record).toBeDisabled();
    await userEvent.type(body.getByLabelText('Clinician override · sign-off name'), 'Dr. Sok Vanna');
    await userEvent.click(record);
    await expect(await canvas.findByText(/Clinician override · Dr. Sok Vanna/)).toBeVisible();
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Pregnancy gate · cancelling never adds the order',
  args: baseArgs,
  render: () => <ConsentPlayground initial={orderReady('consent-preg-cancel', 'Female')} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('tab', {
      name: /Orders/
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: /Additional order types/
    }));
    const chestXray = body.getByRole('checkbox', {
      name: 'Chest X-ray'
    });
    await userEvent.click(chestXray);
    await userEvent.click(await body.findByRole('button', {
      name: 'Cancel order'
    }));
    await waitFor(async () => {
      await expect(chestXray).not.toBeChecked();
    });
    await expect(canvas.queryByText('Consent needed')).not.toBeInTheDocument();
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Payment stays blocked while a consent chain is open',
  args: baseArgs,
  render: () => {
    const initial = orderReady('consent-pay-block', 'Male');
    return <ConsentPlayground initial={{
      ...initial,
      cart: {
        ...initial.cart,
        attributedPrescriberId: 'dr-sok-vanna',
        items: [{
          id: 'xray-chest',
          kind: 'imaging',
          name: 'Chest X-ray',
          priceMinor: '1800',
          currencyCode: 'USD',
          qty: 1,
          consent: {
            state: 'needed'
          }
        }]
      }
    }} />;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', {
      name: /Payment/
    }));
    await expect(await canvas.findByText('Resolve blockers before collecting payment')).toBeVisible();
    await expect(canvas.getByText(/Chest X-ray still needs consent — resolve it on the Orders step/)).toBeVisible();
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Mobile · consent panel at 390',
  args: baseArgs,
  globals: {
    viewport: {
      value: 'kura390'
    }
  },
  render: () => {
    const initial = orderReady('consent-mobile', 'Male');
    return <ConsentPlayground initial={{
      ...initial,
      cart: {
        ...initial.cart,
        attributedPrescriberId: 'dr-sok-vanna',
        items: [{
          id: 'hiv-ag-ab',
          kind: 'lab',
          name: 'HIV Ag/Ab combo',
          priceMinor: '1000',
          currencyCode: 'USD',
          qty: 1,
          consent: {
            state: 'sent',
            atLabel: '09:12'
          }
        }]
      }
    }} />;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', {
      name: /Orders/
    }));
    await expect(await canvas.findByText('Sent · awaiting signature')).toBeVisible();
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: baseArgs,
  globals: {
    theme: 'dark'
  },
  render: () => {
    const initial = orderReady('consent-dark', 'Male');
    return <ConsentPlayground initial={{
      ...initial,
      cart: {
        ...initial.cart,
        attributedPrescriberId: 'dr-sok-vanna',
        items: [{
          id: 'xray-chest',
          kind: 'imaging',
          name: 'Chest X-ray',
          priceMinor: '1800',
          currencyCode: 'USD',
          qty: 1,
          consent: {
            state: 'needed'
          }
        }]
      }
    }} />;
  }
}`,...k.parameters?.docs?.source}}},A=[`ImagingConsentChain`,`VerbalConsentSensitiveWitness`,`PregnancyGateNotPregnant`,`PregnancyGateClinicianOverride`,`PregnancyGateCancelOrder`,`PaymentBlockedUntilConsent`,`Mobile`,`DarkTheme`]}))();export{k as DarkTheme,S as ImagingConsentChain,O as Mobile,D as PaymentBlockedUntilConsent,E as PregnancyGateCancelOrder,T as PregnancyGateClinicianOverride,w as PregnancyGateNotPregnant,C as VerbalConsentSensitiveWitness,A as __namedExportsOrder,b as default};