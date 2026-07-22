import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{r as i,t as a}from"./readiness-data-D41RGqZh.js";import{d as o,f as s,g as c,m as l}from"./demo-data-DZ0mjvYd.js";import{n as u,t as d}from"./check-in-wizard-DvzZbfaU.js";function f(){return{...l(`walk-in-details`,29),name:`Sok Phearom`,nameKhmer:`សុខ ភារ៉ុម`,dob:`1974-03-15`,sexAtBirth:`Male`,idNumber:`012345678`,phoneNumber:`0931238123`,identity:{source:`existing`,lockedFields:[`name`,`dob`,`sexAtBirth`]}}}function p(){return{...f(),otpVerified:!0}}function m({initial:e}){let[t,n]=(0,v.useState)(e);return(0,_.jsx)(d,{existingPatients:o,identityRegistry:s,onCheckIn:()=>{},onPatientChange:n,patient:t})}function h(e){let t=S(e).getByRole(`region`,{name:`Check-in actions`}),n=e.ownerDocument.defaultView;if(!n)throw Error(`Story viewport is unavailable.`);return{bar:t,viewport:n}}async function g(e){let t=S(e),{bar:n,viewport:r}=h(e);await y(Math.ceil(n.getBoundingClientRect().bottom)).toBeLessThanOrEqual(r.innerHeight),await b.click(t.getByRole(`button`,{name:/Address/}));let i=await t.findByLabelText(`Street / house`);i.scrollIntoView({block:`end`}),await x(async()=>{let e=n.getBoundingClientRect(),t=i.getBoundingClientRect();await y(Math.ceil(e.bottom)).toBeLessThanOrEqual(r.innerHeight),await y(Math.ceil(t.bottom)).toBeLessThanOrEqual(Math.floor(e.top))})}var _,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z;t((()=>{_=r(),v=e(n()),u(),c(),i(),{expect:y,userEvent:b,waitFor:x,within:S}=__STORYBOOK_MODULE_TEST__,C={title:`Clinic/Front Desk/Check-In Wizard/Steps 2–3 Patient & Insurance`,component:d,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`padded`,kura:{readiness:a.frontDesk,intake:{decision:`EXTEND (front-desk Steps 2–3 to upstream information parity)`,owner:`src/features/front-desk`,evidence:"Information architecture ported from Kura-med/ui-kit `Receptionist/Wizard/Step 2 Patient` and `Step 3 Insurance` (source-kura-ui-kit): identity section with locked captured fields + Unlock, Khmer name, preferred language, optional Address and Refund-account disclosures, and the full policy contract (member/group/coverage/co-pay/active-until/pre-auth/tier/effective, checking + result states, co-pay banner). Composed from house Card, Collapsible, Input, Select, SegmentedToggle, Badge, Alert, MoneyText; Tailwind and tabler icons replaced.",exclusions:[`Capture photo (camera hardware ceremony)`,`Telegram contact channel (platform ceremony — SMS OTP carries the verified-contact gate)`,`Scan insurance card (hardware ceremony)`,`Real KHQR scan for the refund account (demo saves a fixture payload)`]},journeys:[`front-desk-check-in`],binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura`,icons:`kura-hugeicons`}},docs:{description:{component:`Step 2 reviews captured identity (locked fields require an explicit Unlock), verifies a contact channel, and optionally records address and a Bakong refund account. Step 3 attaches an insurance policy with a live eligibility check — or records an explicit direct-pay decision. The order rail stays hidden until orders exist.`}}}},w={patient:l(`walk-in-details`,29),onPatientChange:()=>{},existingPatients:o,onCheckIn:()=>{}},T={name:`Step 2 — Captured identity with locked fields`,args:w,render:()=>(0,_.jsx)(m,{initial:f()}),play:async({canvasElement:e})=>{let t=S(e);await y(await t.findByText(`From Kura record`)).toBeVisible(),await y(t.getByLabelText(/Full name \(Latin\)/)).toBeDisabled(),await y(t.getByLabelText(/Date of birth/)).toBeDisabled(),await y(t.getByLabelText(/Sex at birth/)).toBeDisabled(),await y(t.getByLabelText(/Full name \(Khmer\)/)).toBeEnabled(),await y(t.getByLabelText(/National ID number/)).toBeEnabled(),await y(t.getByLabelText(/Language for messages/)).toBeEnabled(),await b.click(t.getByRole(`button`,{name:`Unlock fields`})),await y(await t.findByText(`Unlock captured fields?`)).toBeVisible(),await b.click(t.getByRole(`button`,{name:`Unlock`})),await x(async()=>{await y(t.getByLabelText(/Full name \(Latin\)/)).toBeEnabled(),await y(t.getByLabelText(/Date of birth/)).toBeEnabled()})}},E={name:`Step 2 — Address & refund account disclosures`,args:w,render:()=>(0,_.jsx)(m,{initial:f()}),play:async({canvasElement:e})=>{let t=S(e);await y(t.queryByLabelText(`Province`)).not.toBeInTheDocument(),await b.click(t.getByRole(`button`,{name:/Address/})),await y(await t.findByLabelText(`Province`)).toBeVisible(),await b.type(t.getByLabelText(`Province`),`Phnom Penh`),await b.click(t.getByRole(`button`,{name:/Refund account/})),await y(await t.findByText(/No account saved\./)).toBeVisible(),await b.click(t.getByRole(`button`,{name:`Scan KHQR`})),await y(await t.findByText(`Bakong KHQR saved`)).toBeVisible()}},D={name:`Step 2 — Contact verification gates Continue`,args:w,render:()=>(0,_.jsx)(m,{initial:f()}),play:async({canvasElement:e})=>{let t=S(e);await y(t.getByRole(`button`,{name:`Continue`})).toBeDisabled(),await y(t.getByText(`Date of birth, sex, and a contact channel are required.`)).toBeVisible(),await b.click(t.getByRole(`button`,{name:`Send SMS code`})),await b.type(t.getByLabelText(`SMS code`),`123456`),await b.click(t.getByRole(`button`,{name:`Verify`})),await y(await t.findByText(`SMS verified`)).toBeVisible(),await y(t.getByRole(`button`,{name:`Continue`})).toBeEnabled()}},O={name:`Step 2 — Actions remain visible while scrolling`,args:w,render:()=>(0,_.jsx)(m,{initial:f()}),play:async({canvasElement:e})=>g(e)},k={name:`Step 2 — Actions remain visible at 320 px`,args:w,globals:{viewport:{value:`kura320`}},render:()=>(0,_.jsx)(m,{initial:f()}),play:async({canvasElement:e})=>g(e)},A={name:`Step 2 — Telegram via the patient display`,args:w,render:()=>(0,_.jsx)(m,{initial:f()}),play:async({canvasElement:e})=>{let t=S(e);await b.click(t.getByRole(`button`,{name:`Use Telegram instead`})),await y(await t.findByText(`Telegram QR pushed to the patient display`)).toBeVisible(),await b.click(t.getByRole(`button`,{name:`Simulate patient share`})),await y(await t.findByText(`Telegram verified`)).toBeVisible(),await y(t.getByText(/t\.me\//)).toBeVisible(),await y(t.getByRole(`button`,{name:`Continue`})).toBeEnabled()}},j={name:`Step 2 — Unverified passes only with a recorded reason`,args:w,render:()=>(0,_.jsx)(m,{initial:f()}),play:async({canvasElement:e})=>{let t=S(e);await y(t.getByRole(`button`,{name:`Continue`})).toBeDisabled(),await b.click(t.getByRole(`button`,{name:`Continue without verifying`}));let n=t.getByRole(`button`,{name:`Save unverified`});await y(n).toBeDisabled(),await b.click(t.getByLabelText(`Why does it stay unverified?`));let r=S(e.ownerDocument.body);await b.click(await r.findByRole(`option`,{name:`Guardian phone only`})),await b.click(n),await y(await t.findByText(`Unverified · Guardian phone only`)).toBeVisible(),await y(t.getByText(/patient may miss them/)).toBeVisible(),await y(t.getByRole(`button`,{name:`Continue`})).toBeEnabled(),await y(t.getByRole(`button`,{name:`Verify instead`})).toBeVisible()}},M={name:`Step 3 — No insurance on file`,args:w,render:()=>(0,_.jsx)(m,{initial:p()}),play:async({canvasElement:e})=>{let t=S(e);await y(await t.findByText(`No insurance on file`)).toBeVisible(),await y(t.getByRole(`button`,{name:`Continue without insurance`})).toBeVisible(),await y(t.getByRole(`button`,{name:`Continue`})).toBeDisabled(),await b.click(t.getByRole(`button`,{name:`Continue without insurance`})),await y(await t.findByText(`Direct pay`)).toBeVisible(),await y(t.getByRole(`button`,{name:`Continue`})).toBeEnabled()}},N={name:`Step 3 — Add policy → checking → eligible → saved`,args:w,render:()=>(0,_.jsx)(m,{initial:p()}),play:async({canvasElement:e})=>{let t=S(e);await b.click(await t.findByRole(`button`,{name:`Add policy`})),await b.type(t.getByLabelText(/Policy number/),`FRT-887200115`),await b.type(t.getByLabelText(/Member ID/),`887200119`),await b.click(t.getByRole(`button`,{name:`Check eligibility`})),await y(await t.findByText(/Checking eligibility with Forte Insurance/)).toBeVisible(),await y(await t.findByText(/Eligible — 80% of eligible services/)).toBeVisible(),await b.click(t.getByRole(`button`,{name:`Save policy`})),await y(await t.findByText(`Member ID`)).toBeVisible(),await y(t.getByText(`Group`)).toBeVisible(),await y(t.getByText(`CORP-90021`)).toBeVisible(),await y(t.getByText(`Pre-auth`)).toBeVisible(),await y(t.getByText(/co-pay\s+applies/)).toBeVisible(),await y(t.getByRole(`button`,{name:/Re-verify/})).toBeVisible(),await y(t.getByRole(`button`,{name:`Continue`})).toBeEnabled()}},P={name:`Step 3 — Insurer unreachable, add anyway`,args:w,render:()=>(0,_.jsx)(m,{initial:p()}),play:async({canvasElement:e})=>{let t=S(e);await b.click(await t.findByRole(`button`,{name:`Add policy`})),await b.type(t.getByLabelText(/Policy number/),`FRT-000000009`),await b.click(t.getByRole(`button`,{name:`Check eligibility`})),await y(await t.findByText(`Insurer unreachable`)).toBeVisible(),await b.click(t.getByRole(`button`,{name:`Add anyway`})),await y(await t.findByText(`Unverified`)).toBeVisible()}},F={name:`Step 2 — Mobile`,args:w,globals:{viewport:{value:`kura390`}},render:()=>(0,_.jsx)(m,{initial:f()})},I={name:`Step 3 — Dark theme`,args:w,globals:{theme:`dark`},render:()=>(0,_.jsx)(m,{initial:p()})},L={name:`Step 3 — Scan card autofills the policy form`,args:w,render:()=>(0,_.jsx)(m,{initial:p()}),play:async({canvasElement:e})=>{let t=S(e);await b.click(await t.findByRole(`button`,{name:`Scan card`})),await y(await t.findByLabelText(/Policy number/)).toHaveValue(`FRT-88720011`),await y(t.getByLabelText(/Member ID/)).toHaveValue(`M-8872001`)}},R={name:`Step 6 — Route the balance to an insurer claim`,args:w,render:()=>{let e=p();return(0,_.jsx)(m,{initial:{...e,insurance:[{id:`pol-1`,provider:`Forte`,policyNumber:`FRT-88720011`,memberName:e.name,eligibility:{kind:`eligible`,tier:`Outpatient`,coveragePct:80,copayMinor:`500`,activeUntil:`2027-12`,verifiedAtLabel:`Verified 08:21 · supervisor LN`}}],insuranceAcked:!0,cart:{...e.cart,attributedPrescriberId:`dr-sok-vanna`,items:[{id:`lipid`,kind:`lab`,name:`Lipid panel`,priceMinor:`1200`,currencyCode:`USD`,qty:1}]}}})},play:async({canvasElement:e})=>{let t=S(e);await b.click(t.getByRole(`tab`,{name:/6 Payment/})),await y(await t.findByText(/Forte 80% · patient owes 2.40 USD/)).toBeVisible(),await b.click(t.getByRole(`button`,{name:`Route to insurer claim`})),await y(await t.findByText(`Insurance claim pending · Forte`)).toBeVisible(),await y(t.getByText(/no claim is actually filed/)).toBeVisible(),await y(t.getByRole(`button`,{name:`Finish`})).toBeEnabled()}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Step 2 — Captured identity with locked fields',
  args: baseArgs,
  render: () => <DetailsPlayground initial={capturedPatient()} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('From Kura record')).toBeVisible();

    // Captured fields arrive locked; free fields stay editable.
    await expect(canvas.getByLabelText(/Full name \\(Latin\\)/)).toBeDisabled();
    await expect(canvas.getByLabelText(/Date of birth/)).toBeDisabled();
    await expect(canvas.getByLabelText(/Sex at birth/)).toBeDisabled();
    await expect(canvas.getByLabelText(/Full name \\(Khmer\\)/)).toBeEnabled();
    await expect(canvas.getByLabelText(/National ID number/)).toBeEnabled();
    // Language moved to the contact section: it decides message language.
    await expect(canvas.getByLabelText(/Language for messages/)).toBeEnabled();

    // Unlock is an explicit, confirmed decision — never one accidental click.
    await userEvent.click(canvas.getByRole('button', {
      name: 'Unlock fields'
    }));
    await expect(await canvas.findByText('Unlock captured fields?')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Unlock'
    }));
    await waitFor(async () => {
      await expect(canvas.getByLabelText(/Full name \\(Latin\\)/)).toBeEnabled();
      await expect(canvas.getByLabelText(/Date of birth/)).toBeEnabled();
    });
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Step 2 — Address & refund account disclosures',
  args: baseArgs,
  render: () => <DetailsPlayground initial={capturedPatient()} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Optional sections stay collapsed until opened — the contact gate keeps focus.
    await expect(canvas.queryByLabelText('Province')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: /Address/
    }));
    await expect(await canvas.findByLabelText('Province')).toBeVisible();
    await userEvent.type(canvas.getByLabelText('Province'), 'Phnom Penh');
    await userEvent.click(canvas.getByRole('button', {
      name: /Refund account/
    }));
    // The empty state is one flat line, not a dashed box: nothing saved is a
    // state, and the disclosure heading already names the section.
    await expect(await canvas.findByText(/No account saved\\./)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Scan KHQR'
    }));
    await expect(await canvas.findByText('Bakong KHQR saved')).toBeVisible();
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Step 2 — Contact verification gates Continue',
  args: baseArgs,
  render: () => <DetailsPlayground initial={capturedPatient()} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Continue'
    })).toBeDisabled();
    await expect(canvas.getByText('Date of birth, sex, and a contact channel are required.')).toBeVisible();

    // SMS is the default channel, so the phone field is already on screen —
    // the desk never picks a method before it can do any work.
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send SMS code'
    }));
    await userEvent.type(canvas.getByLabelText('SMS code'), '123456');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Verify'
    }));
    await expect(await canvas.findByText('SMS verified')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Continue'
    })).toBeEnabled();
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Step 2 — Actions remain visible while scrolling',
  args: baseArgs,
  render: () => <DetailsPlayground initial={capturedPatient()} />,
  play: async ({
    canvasElement
  }) => verifyPersistentActionBar(canvasElement)
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Step 2 — Actions remain visible at 320 px',
  args: baseArgs,
  globals: {
    viewport: {
      value: 'kura320'
    }
  },
  render: () => <DetailsPlayground initial={capturedPatient()} />,
  play: async ({
    canvasElement
  }) => verifyPersistentActionBar(canvasElement)
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Step 2 — Telegram via the patient display',
  args: baseArgs,
  render: () => <DetailsPlayground initial={capturedPatient()} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Use Telegram instead'
    }));
    await expect(await canvas.findByText('Telegram QR pushed to the patient display')).toBeVisible();
    // The desk never types the number — the patient shares it from their phone.
    await userEvent.click(canvas.getByRole('button', {
      name: 'Simulate patient share'
    }));
    await expect(await canvas.findByText('Telegram verified')).toBeVisible();
    await expect(canvas.getByText(/t\\.me\\//)).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Continue'
    })).toBeEnabled();
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Step 2 — Unverified passes only with a recorded reason',
  args: baseArgs,
  render: () => <DetailsPlayground initial={capturedPatient()} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Continue'
    })).toBeDisabled();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Continue without verifying'
    }));
    const save = canvas.getByRole('button', {
      name: 'Save unverified'
    });
    await expect(save).toBeDisabled();
    // House Select is a combobox, not a native <select>.
    await userEvent.click(canvas.getByLabelText('Why does it stay unverified?'));
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(await body.findByRole('option', {
      name: 'Guardian phone only'
    }));
    await userEvent.click(save);
    await expect(await canvas.findByText('Unverified · Guardian phone only')).toBeVisible();
    await expect(canvas.getByText(/patient may miss them/)).toBeVisible();
    // Trusted-desk door: the reason unblocks Continue; verify stays offered.
    await expect(canvas.getByRole('button', {
      name: 'Continue'
    })).toBeEnabled();
    await expect(canvas.getByRole('button', {
      name: 'Verify instead'
    })).toBeVisible();
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Step 3 — No insurance on file',
  args: baseArgs,
  render: () => <DetailsPlayground initial={reviewedPatient()} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('No insurance on file')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Continue without insurance'
    })).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Continue'
    })).toBeDisabled();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Continue without insurance'
    }));
    await expect(await canvas.findByText('Direct pay')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Continue'
    })).toBeEnabled();
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Step 3 — Add policy → checking → eligible → saved',
  args: baseArgs,
  render: () => <DetailsPlayground initial={reviewedPatient()} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', {
      name: 'Add policy'
    }));
    await userEvent.type(canvas.getByLabelText(/Policy number/), 'FRT-887200115');
    await userEvent.type(canvas.getByLabelText(/Member ID/), '887200119');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Check eligibility'
    }));

    // Transient checking state, then the eligibility verdict.
    await expect(await canvas.findByText(/Checking eligibility with Forte Insurance/)).toBeVisible();
    await expect(await canvas.findByText(/Eligible — 80% of eligible services/)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Save policy'
    }));

    // The attached policy renders the full contract + the co-pay banner.
    await expect(await canvas.findByText('Member ID')).toBeVisible();
    await expect(canvas.getByText('Group')).toBeVisible();
    await expect(canvas.getByText('CORP-90021')).toBeVisible();
    await expect(canvas.getByText('Pre-auth')).toBeVisible();
    await expect(canvas.getByText(/co-pay\\s+applies/)).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: /Re-verify/
    })).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Continue'
    })).toBeEnabled();
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Step 3 — Insurer unreachable, add anyway',
  args: baseArgs,
  render: () => <DetailsPlayground initial={reviewedPatient()} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', {
      name: 'Add policy'
    }));
    await userEvent.type(canvas.getByLabelText(/Policy number/), 'FRT-000000009');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Check eligibility'
    }));
    await expect(await canvas.findByText('Insurer unreachable')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Add anyway'
    }));
    await expect(await canvas.findByText('Unverified')).toBeVisible();
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Step 2 — Mobile',
  args: baseArgs,
  globals: {
    viewport: {
      value: 'kura390'
    }
  },
  render: () => <DetailsPlayground initial={capturedPatient()} />
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Step 3 — Dark theme',
  args: baseArgs,
  globals: {
    theme: 'dark'
  },
  render: () => <DetailsPlayground initial={reviewedPatient()} />
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Step 3 — Scan card autofills the policy form',
  args: baseArgs,
  render: () => <DetailsPlayground initial={reviewedPatient()} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', {
      name: 'Scan card'
    }));
    await expect(await canvas.findByLabelText(/Policy number/)).toHaveValue('FRT-88720011');
    await expect(canvas.getByLabelText(/Member ID/)).toHaveValue('M-8872001');
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Step 6 — Route the balance to an insurer claim',
  args: baseArgs,
  render: () => {
    const base = reviewedPatient();
    return <DetailsPlayground initial={{
      ...base,
      insurance: [{
        id: 'pol-1',
        provider: 'Forte',
        policyNumber: 'FRT-88720011',
        memberName: base.name,
        eligibility: {
          kind: 'eligible',
          tier: 'Outpatient',
          coveragePct: 80,
          copayMinor: '500',
          activeUntil: '2027-12',
          verifiedAtLabel: 'Verified 08:21 · supervisor LN'
        }
      }],
      insuranceAcked: true,
      cart: {
        ...base.cart,
        attributedPrescriberId: 'dr-sok-vanna',
        items: [{
          id: 'lipid',
          kind: 'lab',
          name: 'Lipid panel',
          priceMinor: '1200',
          currencyCode: 'USD',
          qty: 1
        }]
      }
    }} />;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', {
      name: /6 Payment/
    }));
    // Per-line payer preview rides the cart rail line.
    await expect(await canvas.findByText(/Forte 80% · patient owes 2.40 USD/)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Route to insurer claim'
    }));
    await expect(await canvas.findByText('Insurance claim pending · Forte')).toBeVisible();
    await expect(canvas.getByText(/no claim is actually filed/)).toBeVisible();
    // Claim routing resolves the payment gate like pay-later.
    await expect(canvas.getByRole('button', {
      name: 'Finish'
    })).toBeEnabled();
  }
}`,...R.parameters?.docs?.source}}},z=[`ReviewLockedIdentity`,`ReviewOptionalSections`,`ReviewContactGate`,`PersistentActionBar`,`PersistentActionBarMobile320`,`TelegramChannel`,`SaveUnverifiedReason`,`InsuranceEmpty`,`InsuranceEligibilityFlow`,`InsuranceUnreachable`,`MobileNarrow`,`DarkTheme`,`InsuranceScanCard`,`InsuranceClaimRoute`]}))();export{I as DarkTheme,R as InsuranceClaimRoute,N as InsuranceEligibilityFlow,M as InsuranceEmpty,L as InsuranceScanCard,P as InsuranceUnreachable,F as MobileNarrow,O as PersistentActionBar,k as PersistentActionBarMobile320,D as ReviewContactGate,T as ReviewLockedIdentity,E as ReviewOptionalSections,j as SaveUnverifiedReason,A as TelegramChannel,z as __namedExportsOrder,C as default};