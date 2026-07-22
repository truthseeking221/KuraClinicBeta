import{i as e}from"./preload-helper-MclHqJXp.js";import{r as t,t as n}from"./readiness-data-D41RGqZh.js";import{d as r,r as i}from"./demo-data-gkTu93CM.js";import{a,o,r as s}from"./phone-gate-modal-BDFjWeBf.js";import{n as c,t as l}from"./patient-acquisition-flow-3FkVUukK.js";var u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j;e((()=>{t(),o(),r(),c(),{expect:u,userEvent:d,waitFor:f,within:p}=__STORYBOOK_MODULE_TEST__,m={openedLabel:`3 min ago`,items:[{label:`Reason for visit`,answer:`Tired for 2 weeks, wants a general checkup`},{label:`Drug allergies`,answer:`None`},{label:`Current medications`},{label:`Family and medical history`}]},h={title:`Clinic/Flows/Patient Acquisition and Intake`,component:l,tags:[`autodocs`,`source-figma`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:{readiness:n.flows,source:{figma:`https://www.figma.com/design/yWz269PzVjFQquJa1U1M0s/Kura-Design?node-id=1485-18526`,node:`1485:18526`,intakeContextNode:`1485:19716`,intakeContextStates:{unknown:`1303:2146`,sent:`1303:7965`,filling:`1303:7378`,complete:`1303:8358`}},intake:{decision:`COMPOSE + FEATURE-OWN`,owner:`src/features/care-loop`,evidence:`Composes the canonical PhoneGateModal and Kura primitives. The clinic owns the request and received states; the patient intake opens as a separate mobile-first surface with only the patient’s own details and form.`,exclusions:[`The contradictory Dara/Sok Nimol identities in the source board are replaced by one patient manifest.`,`Phone verification remains a delivery-channel check; it never claims patient identity verification.`,`The patient surface excludes clinic navigation, internal timelines, role badges, and medical record identifiers.`,`SMS delivery, patient persistence, and intake writes are deterministic Storybook fixtures.`,`Skip for now remains disabled until a backend skip reason, audit, and recovery contract exists.`]},journeys:[`patient-acquisition`,`phone-check`,`patient-intake`,`order-handoff`]},docs:{description:{component:`Executable clinic-side journey from an empty list through phone verification and provisional patient creation into the canonical patient-context intake states. Patient answers remain explicitly patient-reported; delivery and intake persistence are target-contract fixtures. Demo SMS code: 123456.`}}},args:{initialStage:`patients-empty`,intakeSendDelayMs:0,intakeSendResult:`success`,phoneGateDelayMs:0}},g={args:{demoIntakeRecord:i,intakeSendDelayMs:300},play:async({canvasElement:e})=>{let t=p(e),n=p(e.ownerDocument.body);await d.click(t.getByRole(`button`,{name:`Add patient`})),await d.type(await n.findByLabelText(/Phone number/),`099111222`),await d.click(n.getByRole(`button`,{name:`Send SMS code`})),await d.type(n.getByRole(`textbox`,{name:`SMS code`}),`123456`),await d.click(n.getByRole(`button`,{name:`Verify code`})),await d.type(await n.findByLabelText(/Full name/),`Sok Nimol`),await d.type(n.getByLabelText(/Date of birth or estimated age/),`32`),await d.click(n.getByRole(`radio`,{name:`Male`})),await d.click(n.getByRole(`button`,{name:`Create provisional patient and continue`})),await f(async()=>{await u(t.getByText(/We don’t know enough about Sok Nimol yet/)).toBeVisible()}),await u(t.getByLabelText(`Patient context for Sok Nimol`)).toBeVisible(),await u(t.getByText(`Allergy status not yet confirmed`)).toBeVisible(),await d.click(t.getByRole(`button`,{name:`Send intake link`})),await u(t.getByText(`Sending intake link`)).toBeVisible(),await u(t.getByRole(`button`,{name:`Sending`})).toBeDisabled(),await u(await t.findByText(`Intake received for Sok Nimol`)).toBeVisible(),await u(t.getAllByText(i.reasonForVisit)[0]).toBeVisible(),await u(t.getByRole(`button`,{name:/Current medications.*1 recorded/i})).toHaveAttribute(`aria-expanded`,`true`),await u(t.getByRole(`button`,{name:/Past history.*1 recorded/i})).toHaveAttribute(`aria-expanded`,`true`),await u(t.getByRole(`button`,{name:`Order baseline tests`})).toBeEnabled()}},_={args:{initialStage:`intake-unknown`},play:async({canvasElement:e})=>{let t=p(e);await u(t.getByLabelText(`Patient context for Sok Nimol`)).toBeVisible(),await u(t.getByText(`Allergy status not yet confirmed`)).toBeVisible(),await u(t.getByRole(`button`,{name:`Skip for now`})).toBeDisabled(),await u(t.getByRole(`button`,{name:`Send intake link`})).toBeEnabled()}},v={args:{initialStage:`intake-requested`},play:async({canvasElement:e})=>{let t=p(e);await u(t.getByText(/Intake sent, waiting for Sok Nimol/)).toBeVisible(),await u(t.getAllByText(`Waiting…`)).toHaveLength(4),await u(t.getByRole(`button`,{name:`Resend`})).toBeEnabled()}},y={args:{initialStage:`phone-gate`,lookup:()=>({kind:`known_match`,patient:s})},parameters:{docs:{description:{story:`The number already belongs to someone. Creating a second record here is how a patient ends up with two histories, so the known record leads and creating a new one stays the deliberate second choice.`}}},play:async({canvasElement:e})=>{let t=p(e.ownerDocument.body);await d.type(await t.findByLabelText(/Phone number/),`099111222`),await d.click(t.getByRole(`button`,{name:`Send SMS code`})),await d.type(t.getByRole(`textbox`,{name:`SMS code`}),`123456`),await d.click(t.getByRole(`button`,{name:`Verify code`})),await u(await t.findByText(`Sokha Chann`)).toBeVisible()}},b={args:{initialStage:`phone-gate`,lookup:()=>({kind:`shared_matches`,candidates:a})},parameters:{docs:{description:{story:`One number, a mother and her two children. A verified phone proves the clinic can reach this number and nothing about who is standing at the desk, so the candidates are a single deliberate choice rather than three competing actions.`}}},play:async({canvasElement:e})=>{let t=p(e.ownerDocument.body);await d.type(await t.findByLabelText(/Phone number/),`099111222`),await d.click(t.getByRole(`button`,{name:`Send SMS code`})),await d.type(t.getByRole(`textbox`,{name:`SMS code`}),`123456`),await d.click(t.getByRole(`button`,{name:`Verify code`})),await u(await t.findByText(`This number is linked to 3 patients`)).toBeVisible(),await u(t.getByRole(`radio`,{name:/Sophea Chann/})).toBeVisible(),await u(t.getByRole(`radio`,{name:/Visal Heng/})).toBeVisible()}},x={args:{initialStage:`intake-requested`,intakeProgress:m},parameters:{docs:{description:{story:`While the clinic waits, it can see how far the patient has got. Unanswered questions stay listed rather than hidden, so "two answered" is legible as progress instead of a stalled link.`}}},play:async({canvasElement:e})=>{let t=p(e);await u(t.getByText(/2 of 4 answered · opened 3 min ago/)).toBeVisible(),await u(t.getAllByText(`Tired for 2 weeks, wants a general checkup`)[0]).toBeVisible(),await u(t.getAllByText(`Waiting…`)).toHaveLength(2),await u(t.getByLabelText(`Patient context for Sok Nimol`)).toBeVisible()}},S={args:{initialIntakeRecord:i,initialStage:`intake-complete`},play:async({canvasElement:e})=>{let t=p(e);await u(t.getByText(`Intake received for Sok Nimol`)).toBeVisible(),await u(t.getByText(`Patient reports no known allergies`)).toBeVisible(),await u(t.getAllByText(i.reasonForVisit)[0]).toBeVisible();let n=[t.getByRole(`button`,{name:/Active problems.*0 recorded/i}),t.getByRole(`button`,{name:/Current medications.*1 recorded/i}),t.getByRole(`button`,{name:/Pending verification.*1 recorded/i}),t.getByRole(`button`,{name:/Past history.*1 recorded/i}),t.getByRole(`button`,{name:/Admin details.*0 recorded/i})];await f(async()=>{for(let e of n)await u(e).toHaveAttribute(`aria-expanded`,`true`)}),await u(t.getByText(i.medicines)).toBeVisible(),await u(t.getByText(i.familyHistory)).toBeVisible(),await d.click(n[0]),await u(n[0]).toHaveAttribute(`aria-expanded`,`false`),await u(t.getByRole(`button`,{name:`Order baseline tests`})).toBeEnabled()}},C={args:{initialStage:`intake-unknown`},parameters:{viewport:{defaultViewport:`kura320`}}},w={args:{initialStage:`intake-requested`,intakeProgress:m},parameters:{viewport:{defaultViewport:`kura768`}}},T={args:{initialIntakeRecord:i,initialStage:`intake-complete`},parameters:{viewport:{defaultViewport:`kura320`}}},E={args:{initialStage:`intake-error`,intakeSendResult:`error`},play:async({canvasElement:e})=>{let t=p(e);await u(t.getByText(`Intake link was not sent`)).toBeVisible(),await u(t.getByRole(`button`,{name:`Try again`})).toBeEnabled()}},D={args:{initialStage:`intake-sending`}},O={args:{initialStage:`intake-form`},play:async({canvasElement:e})=>{let t=p(e);await u(t.getByText(`Tell us about your health`)).toBeVisible(),await u(t.getByText(`Mekong Clinic`)).toBeVisible(),await u(t.queryByText(`First patient care loop`)).not.toBeInTheDocument(),await u(t.queryByText(`P8842`)).not.toBeInTheDocument(),await u(t.getByRole(`button`,{name:`Submit medical history`})).toBeDisabled()}},k={args:{initialStage:`intake-form`},parameters:{viewport:{defaultViewport:`kura320`}}},A={parameters:{viewport:{defaultViewport:`kura320`}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    demoIntakeRecord: CARE_LOOP_DEMO_INTAKE_RECORD,
    intakeSendDelayMs: 300
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Add patient'
    }));
    await userEvent.type(await screen.findByLabelText(/Phone number/), '099111222');
    await userEvent.click(screen.getByRole('button', {
      name: 'Send SMS code'
    }));
    await userEvent.type(screen.getByRole('textbox', {
      name: 'SMS code'
    }), '123456');
    await userEvent.click(screen.getByRole('button', {
      name: 'Verify code'
    }));
    await userEvent.type(await screen.findByLabelText(/Full name/), 'Sok Nimol');
    await userEvent.type(screen.getByLabelText(/Date of birth or estimated age/), '32');
    await userEvent.click(screen.getByRole('radio', {
      name: 'Male'
    }));
    await userEvent.click(screen.getByRole('button', {
      name: 'Create provisional patient and continue'
    }));
    await waitFor(async () => {
      await expect(canvas.getByText(/We don’t know enough about Sok Nimol yet/)).toBeVisible();
    });
    await expect(canvas.getByLabelText('Patient context for Sok Nimol')).toBeVisible();
    await expect(canvas.getByText('Allergy status not yet confirmed')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send intake link'
    }));
    await expect(canvas.getByText('Sending intake link')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Sending'
    })).toBeDisabled();
    await expect(await canvas.findByText('Intake received for Sok Nimol')).toBeVisible();
    await expect(canvas.getAllByText(CARE_LOOP_DEMO_INTAKE_RECORD.reasonForVisit)[0]).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: /Current medications.*1 recorded/i
    })).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByRole('button', {
      name: /Past history.*1 recorded/i
    })).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByRole('button', {
      name: 'Order baseline tests'
    })).toBeEnabled();
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    initialStage: 'intake-unknown'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Patient context for Sok Nimol')).toBeVisible();
    await expect(canvas.getByText('Allergy status not yet confirmed')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Skip for now'
    })).toBeDisabled();
    await expect(canvas.getByRole('button', {
      name: 'Send intake link'
    })).toBeEnabled();
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    initialStage: 'intake-requested'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Intake sent, waiting for Sok Nimol/)).toBeVisible();
    await expect(canvas.getAllByText('Waiting…')).toHaveLength(4);
    await expect(canvas.getByRole('button', {
      name: 'Resend'
    })).toBeEnabled();
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    initialStage: 'phone-gate',
    lookup: () => ({
      kind: 'known_match',
      patient: DEMO_MATCH_PATIENT
    })
  },
  parameters: {
    docs: {
      description: {
        story: 'The number already belongs to someone. Creating a second record here is how a patient ends up with two histories, so the known record leads and creating a new one stays the deliberate second choice.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const screen = within(canvasElement.ownerDocument.body);
    await userEvent.type(await screen.findByLabelText(/Phone number/), '099111222');
    await userEvent.click(screen.getByRole('button', {
      name: 'Send SMS code'
    }));
    await userEvent.type(screen.getByRole('textbox', {
      name: 'SMS code'
    }), '123456');
    await userEvent.click(screen.getByRole('button', {
      name: 'Verify code'
    }));
    await expect(await screen.findByText('Sokha Chann')).toBeVisible();
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    initialStage: 'phone-gate',
    lookup: () => ({
      kind: 'shared_matches',
      candidates: DEMO_SHARED_PHONE_PATIENTS
    })
  },
  parameters: {
    docs: {
      description: {
        story: 'One number, a mother and her two children. A verified phone proves the clinic can reach this number and nothing about who is standing at the desk, so the candidates are a single deliberate choice rather than three competing actions.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const screen = within(canvasElement.ownerDocument.body);
    await userEvent.type(await screen.findByLabelText(/Phone number/), '099111222');
    await userEvent.click(screen.getByRole('button', {
      name: 'Send SMS code'
    }));
    await userEvent.type(screen.getByRole('textbox', {
      name: 'SMS code'
    }), '123456');
    await userEvent.click(screen.getByRole('button', {
      name: 'Verify code'
    }));
    await expect(await screen.findByText('This number is linked to 3 patients')).toBeVisible();
    await expect(screen.getByRole('radio', {
      name: /Sophea Chann/
    })).toBeVisible();
    await expect(screen.getByRole('radio', {
      name: /Visal Heng/
    })).toBeVisible();
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    initialStage: 'intake-requested',
    intakeProgress: FILLING_PROGRESS
  },
  parameters: {
    docs: {
      description: {
        story: 'While the clinic waits, it can see how far the patient has got. Unanswered questions stay listed rather than hidden, so "two answered" is legible as progress instead of a stalled link.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/2 of 4 answered · opened 3 min ago/)).toBeVisible();
    await expect(canvas.getAllByText('Tired for 2 weeks, wants a general checkup')[0]).toBeVisible();
    await expect(canvas.getAllByText('Waiting…')).toHaveLength(2);
    await expect(canvas.getByLabelText('Patient context for Sok Nimol')).toBeVisible();
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    initialIntakeRecord: CARE_LOOP_DEMO_INTAKE_RECORD,
    initialStage: 'intake-complete'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Intake received for Sok Nimol')).toBeVisible();
    await expect(canvas.getByText('Patient reports no known allergies')).toBeVisible();
    await expect(canvas.getAllByText(CARE_LOOP_DEMO_INTAKE_RECORD.reasonForVisit)[0]).toBeVisible();
    const disclosureButtons = [canvas.getByRole('button', {
      name: /Active problems.*0 recorded/i
    }), canvas.getByRole('button', {
      name: /Current medications.*1 recorded/i
    }), canvas.getByRole('button', {
      name: /Pending verification.*1 recorded/i
    }), canvas.getByRole('button', {
      name: /Past history.*1 recorded/i
    }), canvas.getByRole('button', {
      name: /Admin details.*0 recorded/i
    })];
    await waitFor(async () => {
      for (const button of disclosureButtons) {
        await expect(button).toHaveAttribute('aria-expanded', 'true');
      }
    });
    await expect(canvas.getByText(CARE_LOOP_DEMO_INTAKE_RECORD.medicines)).toBeVisible();
    await expect(canvas.getByText(CARE_LOOP_DEMO_INTAKE_RECORD.familyHistory)).toBeVisible();
    await userEvent.click(disclosureButtons[0]);
    await expect(disclosureButtons[0]).toHaveAttribute('aria-expanded', 'false');
    await expect(canvas.getByRole('button', {
      name: 'Order baseline tests'
    })).toBeEnabled();
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    initialStage: 'intake-unknown'
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    initialStage: 'intake-requested',
    intakeProgress: FILLING_PROGRESS
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura768'
    }
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    initialIntakeRecord: CARE_LOOP_DEMO_INTAKE_RECORD,
    initialStage: 'intake-complete'
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    initialStage: 'intake-error',
    intakeSendResult: 'error'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Intake link was not sent')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Try again'
    })).toBeEnabled();
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    initialStage: 'intake-sending'
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    initialStage: 'intake-form'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Tell us about your health')).toBeVisible();
    await expect(canvas.getByText('Mekong Clinic')).toBeVisible();
    await expect(canvas.queryByText('First patient care loop')).not.toBeInTheDocument();
    await expect(canvas.queryByText('P8842')).not.toBeInTheDocument();
    await expect(canvas.getByRole('button', {
      name: 'Submit medical history'
    })).toBeDisabled();
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    initialStage: 'intake-form'
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...A.parameters?.docs?.source}}},j=[`ClinicJourneyToIntakeHandoff`,`IntakeUnknown`,`IntakeSent`,`ExistingPatientFound`,`SharedHouseholdPhone`,`IntakeFilling`,`IntakeComplete`,`IntakeUnknownMobile320`,`IntakeFillingTablet768`,`IntakeCompleteMobile320`,`IntakeDeliveryFailure`,`IntakeSending`,`PatientCompletesMedicalHistory`,`PatientCompletesMedicalHistoryMobile`,`MobileWidth320`]}))();export{g as ClinicJourneyToIntakeHandoff,y as ExistingPatientFound,S as IntakeComplete,T as IntakeCompleteMobile320,E as IntakeDeliveryFailure,x as IntakeFilling,w as IntakeFillingTablet768,D as IntakeSending,v as IntakeSent,_ as IntakeUnknown,C as IntakeUnknownMobile320,A as MobileWidth320,O as PatientCompletesMedicalHistory,k as PatientCompletesMedicalHistoryMobile,b as SharedHouseholdPhone,j as __namedExportsOrder,h as default};