import{i as e}from"./preload-helper-MclHqJXp.js";import{r as t,t as n}from"./readiness-data-D41RGqZh.js";import{a as r,i,n as a,o,t as s}from"./phone-gate-modal-BDFjWeBf.js";function c(e){return p(e.ownerDocument.body)}var l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F;e((()=>{a(),o(),t(),{expect:l,fn:u,userEvent:d,waitFor:f,within:p}=__STORYBOOK_MODULE_TEST__,m=`070123496`,h=`099111222`,g={title:`Clinic/Clinical/Phone Gate`,component:s,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:{readiness:n.phoneGate,intake:{decision:`COMPOSE`,owner:`src/features/phone-gate`,evidence:`Built against kura-platform docs/design/phone-gate/phone-gate-ui-spec.md (canonical, Figma 742:52132) with clinic-phone-gate-mf as the behavior reference. Composed from Dialog (header/body/footer, mobile full presentation, built-in close), PhoneInput, OtpInput, RadioGroup, Input, Alert, Button, AlertDialog; spec pixel values mapped to Kura tokens.`,exclusions:[`recentPatients chooser (reference-MF addition outside the canonical modal spec scope)`,`Per-digit “Digit 1 of 6” inputs (OtpInput renders one logical input with equivalent autofill/paste/SR behavior)`,`Persistent BEFORE YOU SEND pane (identical in every state; its one safety fact now appears on the two steps that bind a person)`,`Per-candidate Choose buttons (replaced by one radio set and one primary action so a shared phone needs a deliberate selection)`]},journeys:[`phone-gate-known-match-attach`,`phone-gate-shared-phone-select`,`phone-gate-different-patient`,`phone-gate-no-match-temporary`]},docs:{description:{component:`Safety checkpoint before a booking code is sent: verify a Cambodia phone by OTP, detect an existing patient, attach it or create a provisional patient. One column, one question per step; the destination stays inline with Change on the code step, while the checked number remains visible afterward. “Phone checked” never claims identity. PSC confirms it later. Demo scaffolding: code 123456; 070 123 496 → known match (Sokha Chann); 070 123 497 → shared phone (three candidates); numbers ending 000 → lookup error; ending 999 → OTP rate limit; anything else → no match.`}}},args:{open:!0,onClose:u(),onOutcome:u()}},_={play:async({canvasElement:e})=>{let t=c(e);await l(await t.findByRole(`dialog`)).toBeVisible(),await l(t.getByRole(`heading`,{name:`Patient phone`})).toBeVisible(),await l(t.getByText(`The patient, a guardian, or a guarantor.`)).toBeVisible(),await d.click(t.getByRole(`button`,{name:`Send SMS code`})),await l(await t.findByText(/valid Cambodia phone/)).toBeVisible()}},v={play:async({canvasElement:e})=>{let t=c(e);await d.type(await t.findByLabelText(/Phone number/),h),await d.click(t.getByRole(`button`,{name:`Send SMS code`})),await l(await t.findByRole(`heading`,{name:`Enter the code`})).toBeVisible(),await l(t.getByText(`Sent to`)).toBeVisible(),await l(t.getByText(/\+855 99 \.\.\. 222/)).toBeVisible();let n=t.getByRole(`button`,{name:`Verify code`});await l(n).toBeDisabled(),await d.type(t.getByRole(`textbox`,{name:`SMS code`}),`000000`),await d.click(n),await l(await t.findByRole(`alert`)).toHaveTextContent(/Incorrect or expired/),await l(t.getByRole(`button`,{name:/Resend in/})).toBeDisabled(),await d.click(t.getByRole(`button`,{name:`Change phone number`})),await l(await t.findByRole(`heading`,{name:`Patient phone`})).toBeVisible()}},y={args:{initial:{state:`knownMatch`,phone:`+85570123496`}},play:async({canvasElement:e,args:t})=>{let n=c(e);await l(await n.findByRole(`heading`,{name:`Is this the patient?`})).toBeVisible(),await l(n.getByText(`Phone checked`)).toBeVisible(),await l(n.getByText(`070 123 496`)).toBeVisible(),await l(n.getByText(`SMS confirms the number, not who is being tested.`)).toBeVisible(),await l(n.getByText(`Sokha Chann`)).toBeVisible(),await l(n.getByText(`Female · 32y · MRN ··34`)).toBeVisible(),await d.click(n.getByRole(`button`,{name:`Use this patient`})),await f(()=>l(t.onOutcome).toHaveBeenCalledWith(l.objectContaining({kind:`existing`}))),await l(t.onClose).toHaveBeenCalledWith(`completed`)}},b={args:{initial:{state:`sharedMatches`,phone:`+85570123497`,candidates:r}},play:async({canvasElement:e,args:t})=>{let n=c(e);await l(await n.findByText(`This number is linked to 3 patients`)).toBeVisible(),await l(n.getByText(`SMS confirms the number, not who is being tested.`)).toBeVisible();let r=n.getAllByRole(`radio`);await l(r).toHaveLength(3);for(let e of r)await l(e).not.toBeChecked();await d.click(n.getByRole(`button`,{name:`Use selected patient`})),await l(await n.findByRole(`alert`)).toHaveTextContent(/Select a patient/),await l(t.onOutcome).not.toHaveBeenCalled(),await d.click(n.getByRole(`radio`,{name:`Rithy Khem`})),await d.click(n.getByRole(`button`,{name:`Use selected patient`})),await f(()=>l(t.onOutcome).toHaveBeenCalledWith(l.objectContaining({kind:`existing`,matchReason:`shared_phone`,patient:l.objectContaining({patientId:`pat-rithy`})})))}},x={args:{initial:{state:`verifyingOtp`,phone:`+85599111222`}},play:async({canvasElement:e})=>{let t=c(e),n=await t.findByRole(`button`,{name:`Checking code…`});await l(n).toHaveAttribute(`aria-busy`,`true`),await l(t.getByRole(`textbox`,{name:`SMS code`})).toBeVisible()}},S={args:{initial:{state:`knownMatch`,phone:`+85570123496`},createDelayMs:0},play:async({canvasElement:e,args:t})=>{let n=c(e);await d.click(await n.findByRole(`button`,{name:`Someone else`})),await l(await n.findByText(`This may be a different patient`)).toBeVisible(),await l(n.getByText(`070 123 496`)).toBeVisible(),await d.click(n.getByRole(`button`,{name:`Create provisional patient and continue`})),await l(await n.findByText(`Enter the full name.`)).toBeVisible(),await l(n.getByText(`Enter a date of birth or estimated age.`)).toBeVisible(),await l(n.getByText(`Select a sex.`)).toBeVisible(),await d.type(n.getByLabelText(/Full name/),`Pierre`),await d.type(n.getByLabelText(/Date of birth or estimated age/),`32`),await d.click(n.getByRole(`radio`,{name:`Female`})),await d.click(n.getByRole(`button`,{name:`Create provisional patient and continue`})),await f(()=>l(t.onOutcome).toHaveBeenCalledWith(l.objectContaining({kind:`temporary`,knownPhoneOverride:!0})))}},C={args:{initial:{state:`noMatch`,phone:`+85599111222`},createDelayMs:0},play:async({canvasElement:e,args:t})=>{let n=c(e);await l(await n.findByRole(`heading`,{name:`Create provisional patient`})).toBeVisible(),await l(n.getByText(`No matching patient was found for this phone number. PSC will confirm identity.`)).toBeVisible(),await l(n.getByText(`Enter an estimated age only if the date of birth is unknown.`)).toBeVisible(),await d.type(n.getByLabelText(/Full name/),`Pierre`),await d.type(n.getByLabelText(/Date of birth or estimated age/),`32`),await d.click(n.getByRole(`radio`,{name:`Female`})),await d.click(n.getByRole(`button`,{name:`Create provisional patient and continue`})),await f(()=>l(t.onOutcome).toHaveBeenCalledWith(l.objectContaining({kind:`temporary`,knownPhoneOverride:!1})))}},w={args:{initial:{state:`noMatch`,phone:`+85599111222`}},play:async({canvasElement:e})=>{let t=c(e);await l(await t.findAllByRole(`button`,{name:`Change phone number`})).toHaveLength(1),await d.click(t.getByRole(`button`,{name:`Change phone number`})),await l(await t.findByRole(`heading`,{name:`Patient phone`})).toBeVisible()}},T={args:{initial:{state:`noMatch`,phone:`+85599111222`},createDelayMs:6e4},play:async({canvasElement:e})=>{let t=c(e);await d.type(await t.findByLabelText(/Full name/),`Pierre`),await d.type(t.getByLabelText(/Date of birth or estimated age/),`32`),await d.click(t.getByRole(`radio`,{name:`Female`})),await d.click(t.getByRole(`button`,{name:`Create provisional patient and continue`}));let n=await t.findByRole(`button`,{name:`Creating provisional patient…`});await l(n).toHaveAttribute(`aria-busy`,`true`),await l(t.getByDisplayValue(`Pierre`)).toBeVisible()}},E={play:async({canvasElement:e})=>{let t=c(e);await d.type(await t.findByLabelText(/Phone number/),`099111000`),await d.click(t.getByRole(`button`,{name:`Send SMS code`})),await d.type(t.getByRole(`textbox`,{name:`SMS code`}),i),await d.click(t.getByRole(`button`,{name:`Verify code`})),await l(await t.findByText(`Lookup unavailable`)).toBeVisible(),await l(t.getByRole(`button`,{name:`Retry`})).toBeVisible(),await l(t.getByRole(`button`,{name:`Change phone number`})).toBeVisible()}},D={play:async({canvasElement:e})=>{let t=c(e);await d.type(await t.findByLabelText(/Phone number/),`099111999`),await d.click(t.getByRole(`button`,{name:`Send SMS code`})),await l(await t.findByText(/Too many codes requested/)).toBeVisible()}},O={play:async({canvasElement:e,args:t})=>{let n=c(e);await d.type(await n.findByLabelText(/Phone number/),`0991`),await d.keyboard(`{Escape}`),await l(await n.findByText(`Discard what you entered?`)).toBeVisible(),await d.click(n.getByRole(`button`,{name:`Keep editing`})),await l(t.onClose).not.toHaveBeenCalled(),await d.keyboard(`{Escape}`),await d.click(await n.findByRole(`button`,{name:`Discard & close`})),await f(()=>l(t.onClose).toHaveBeenCalledWith(`dismissed`))}},k={args:{createDelayMs:0},play:async({canvasElement:e,args:t})=>{let n=c(e);await d.type(await n.findByLabelText(/Phone number/),h),await d.click(n.getByRole(`button`,{name:`Send SMS code`})),await d.type(n.getByRole(`textbox`,{name:`SMS code`}),i),await d.click(n.getByRole(`button`,{name:`Verify code`})),await l(await n.findByText(`No matching patient was found for this phone number. PSC will confirm identity.`)).toBeVisible(),await d.type(n.getByLabelText(/Full name/),`Pierre`),await d.type(n.getByLabelText(/Date of birth or estimated age/),`32`),await d.click(n.getByRole(`radio`,{name:`Female`})),await d.click(n.getByRole(`button`,{name:`Create provisional patient and continue`})),await f(()=>l(t.onClose).toHaveBeenCalledWith(`completed`))}},A={play:async({canvasElement:e,args:t})=>{let n=c(e);await d.type(await n.findByLabelText(/Phone number/),m),await d.click(n.getByRole(`button`,{name:`Send SMS code`})),await d.type(n.getByRole(`textbox`,{name:`SMS code`}),i),await d.click(n.getByRole(`button`,{name:`Verify code`})),await d.click(await n.findByRole(`button`,{name:`Use this patient`})),await f(()=>l(t.onClose).toHaveBeenCalledWith(`completed`))}},j={parameters:{viewport:{defaultViewport:`kura320`}},play:async({canvasElement:e})=>{let t=c(e);await l(await t.findByRole(`heading`,{name:`Patient phone`})).toBeVisible(),await l(t.getByLabelText(/Phone number/)).toBeVisible(),await l(t.getByRole(`button`,{name:`Send SMS code`})).toBeVisible()}},M={args:{initial:{state:`sharedMatches`,phone:`+85570123497`,candidates:r}},parameters:{viewport:{defaultViewport:`kura320`}},play:async({canvasElement:e})=>{let t=c(e);await l(await t.findByText(`This number is linked to 3 patients`)).toBeVisible(),await l(t.getAllByRole(`radio`)).toHaveLength(3)}},N={args:{initial:{state:`noMatch`,phone:`+85599111222`,draft:{name:`Sreymom Nguyễn Thị Hồng Phương`,dobOrAge:`12-09-1994`,sex:`Female`}}},parameters:{viewport:{defaultViewport:`kura320`}},play:async({canvasElement:e})=>{let t=c(e);await l(await t.findByDisplayValue(`Sreymom Nguyễn Thị Hồng Phương`)).toBeVisible(),await l(t.getByRole(`button`,{name:`Create provisional patient and continue`})).toBeVisible()}},P={args:{initial:{state:`error`,phone:`+85599111000`}},parameters:{viewport:{defaultViewport:`kura320`}},play:async({canvasElement:e})=>{let t=c(e);await l(await t.findByText(`Lookup unavailable`)).toBeVisible(),await l(t.getByRole(`button`,{name:`Retry`})).toBeVisible()}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByRole('dialog')).toBeVisible();
    await expect(screen.getByRole('heading', {
      name: 'Patient phone'
    })).toBeVisible();
    await expect(screen.getByText('The patient, a guardian, or a guarantor.')).toBeVisible();
    await userEvent.click(screen.getByRole('button', {
      name: 'Send SMS code'
    }));
    await expect(await screen.findByText(/valid Cambodia phone/)).toBeVisible();
  }
}`,..._.parameters?.docs?.source},description:{story:`State 1 — enter phone: the title names the step, Send SMS code validates.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const screen = body(canvasElement);
    await userEvent.type(await screen.findByLabelText(/Phone number/), FRESH_PHONE);
    await userEvent.click(screen.getByRole('button', {
      name: 'Send SMS code'
    }));
    await expect(await screen.findByRole('heading', {
      name: 'Enter the code'
    })).toBeVisible();
    await expect(screen.getByText('Sent to')).toBeVisible();
    await expect(screen.getByText(/\\+855 99 \\.\\.\\. 222/)).toBeVisible();
    const verify = screen.getByRole('button', {
      name: 'Verify code'
    });
    await expect(verify).toBeDisabled();
    await userEvent.type(screen.getByRole('textbox', {
      name: 'SMS code'
    }), '000000');
    await userEvent.click(verify);
    await expect(await screen.findByRole('alert')).toHaveTextContent(/Incorrect or expired/);
    await expect(screen.getByRole('button', {
      name: /Resend in/
    })).toBeDisabled();
    await userEvent.click(screen.getByRole('button', {
      name: 'Change phone number'
    }));
    await expect(await screen.findByRole('heading', {
      name: 'Patient phone'
    })).toBeVisible();
  }
}`,...v.parameters?.docs?.source},description:{story:`State 2 — OTP: destination supports the code task instead of becoming a second field.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    initial: {
      state: 'knownMatch',
      phone: '+85570123496'
    }
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByRole('heading', {
      name: 'Is this the patient?'
    })).toBeVisible();
    await expect(screen.getByText('Phone checked')).toBeVisible();
    await expect(screen.getByText('070 123 496')).toBeVisible();
    await expect(screen.getByText('SMS confirms the number, not who is being tested.')).toBeVisible();
    await expect(screen.getByText('Sokha Chann')).toBeVisible();
    await expect(screen.getByText('Female · 32y · MRN ··34')).toBeVisible();
    await userEvent.click(screen.getByRole('button', {
      name: 'Use this patient'
    }));
    await waitFor(() => expect(args.onOutcome).toHaveBeenCalledWith(expect.objectContaining({
      kind: 'existing'
    })));
    await expect(args.onClose).toHaveBeenCalledWith('completed');
  }
}`,...y.parameters?.docs?.source},description:{story:`State 3 — known match: the checked number stays on screen beside the record.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    initial: {
      state: 'sharedMatches',
      phone: '+85570123497',
      candidates: DEMO_SHARED_PHONE_PATIENTS
    }
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByText('This number is linked to 3 patients')).toBeVisible();
    await expect(screen.getByText('SMS confirms the number, not who is being tested.')).toBeVisible();
    const candidates = screen.getAllByRole('radio');
    await expect(candidates).toHaveLength(3);
    for (const candidate of candidates) {
      await expect(candidate).not.toBeChecked();
    }

    // Attaching without a deliberate choice is refused, not guessed.
    await userEvent.click(screen.getByRole('button', {
      name: 'Use selected patient'
    }));
    await expect(await screen.findByRole('alert')).toHaveTextContent(/Select a patient/);
    await expect(args.onOutcome).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('radio', {
      name: 'Rithy Khem'
    }));
    await userEvent.click(screen.getByRole('button', {
      name: 'Use selected patient'
    }));
    await waitFor(() => expect(args.onOutcome).toHaveBeenCalledWith(expect.objectContaining({
      kind: 'existing',
      matchReason: 'shared_phone',
      patient: expect.objectContaining({
        patientId: 'pat-rithy'
      })
    })));
  }
}`,...b.parameters?.docs?.source},description:{story:`State 3B — shared phone: one radio set, one primary, no silent default.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    initial: {
      state: 'verifyingOtp',
      phone: '+85599111222'
    }
  },
  play: async ({
    canvasElement
  }) => {
    const screen = body(canvasElement);
    const pending = await screen.findByRole('button', {
      name: 'Checking code…'
    });
    await expect(pending).toHaveAttribute('aria-busy', 'true');
    await expect(screen.getByRole('textbox', {
      name: 'SMS code'
    })).toBeVisible();
  }
}`,...x.parameters?.docs?.source},description:{story:`Verification pends on the action, so the step never blanks out.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    initial: {
      state: 'knownMatch',
      phone: '+85570123496'
    },
    createDelayMs: 0
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const screen = body(canvasElement);
    await userEvent.click(await screen.findByRole('button', {
      name: 'Someone else'
    }));
    await expect(await screen.findByText('This may be a different patient')).toBeVisible();
    await expect(screen.getByText('070 123 496')).toBeVisible();
    await userEvent.click(screen.getByRole('button', {
      name: 'Create provisional patient and continue'
    }));
    await expect(await screen.findByText('Enter the full name.')).toBeVisible();
    await expect(screen.getByText('Enter a date of birth or estimated age.')).toBeVisible();
    await expect(screen.getByText('Select a sex.')).toBeVisible();
    await userEvent.type(screen.getByLabelText(/Full name/), 'Pierre');
    await userEvent.type(screen.getByLabelText(/Date of birth or estimated age/), '32');
    await userEvent.click(screen.getByRole('radio', {
      name: 'Female'
    }));
    await userEvent.click(screen.getByRole('button', {
      name: 'Create provisional patient and continue'
    }));
    await waitFor(() => expect(args.onOutcome).toHaveBeenCalledWith(expect.objectContaining({
      kind: 'temporary',
      knownPhoneOverride: true
    })));
  }
}`,...S.parameters?.docs?.source},description:{story:`State 4 — different patient: warning banner, audit-flagged creation.`,...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    initial: {
      state: 'noMatch',
      phone: '+85599111222'
    },
    createDelayMs: 0
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByRole('heading', {
      name: 'Create provisional patient'
    })).toBeVisible();
    await expect(screen.getByText('No matching patient was found for this phone number. PSC will confirm identity.')).toBeVisible();
    await expect(screen.getByText('Enter an estimated age only if the date of birth is unknown.')).toBeVisible();
    await userEvent.type(screen.getByLabelText(/Full name/), 'Pierre');
    await userEvent.type(screen.getByLabelText(/Date of birth or estimated age/), '32');
    await userEvent.click(screen.getByRole('radio', {
      name: 'Female'
    }));
    await userEvent.click(screen.getByRole('button', {
      name: 'Create provisional patient and continue'
    }));
    await waitFor(() => expect(args.onOutcome).toHaveBeenCalledWith(expect.objectContaining({
      kind: 'temporary',
      knownPhoneOverride: false
    })));
  }
}`,...C.parameters?.docs?.source},description:{story:`State 5 — no match: the fact is a description line, not a tinted banner.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    initial: {
      state: 'noMatch',
      phone: '+85599111222'
    }
  },
  play: async ({
    canvasElement
  }) => {
    const screen = body(canvasElement);
    await expect(await screen.findAllByRole('button', {
      name: 'Change phone number'
    })).toHaveLength(1);
    await userEvent.click(screen.getByRole('button', {
      name: 'Change phone number'
    }));
    await expect(await screen.findByRole('heading', {
      name: 'Patient phone'
    })).toBeVisible();
  }
}`,...w.parameters?.docs?.source},description:{story:`One control changes the bound number, from every post-verification step.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    initial: {
      state: 'noMatch',
      phone: '+85599111222'
    },
    createDelayMs: 60000
  },
  play: async ({
    canvasElement
  }) => {
    const screen = body(canvasElement);
    await userEvent.type(await screen.findByLabelText(/Full name/), 'Pierre');
    await userEvent.type(screen.getByLabelText(/Date of birth or estimated age/), '32');
    await userEvent.click(screen.getByRole('radio', {
      name: 'Female'
    }));
    await userEvent.click(screen.getByRole('button', {
      name: 'Create provisional patient and continue'
    }));
    const pending = await screen.findByRole('button', {
      name: 'Creating provisional patient…'
    });
    await expect(pending).toHaveAttribute('aria-busy', 'true');
    await expect(screen.getByDisplayValue('Pierre')).toBeVisible();
  }
}`,...T.parameters?.docs?.source},description:{story:`Submitting — the form stays put; the action carries the pending state.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const screen = body(canvasElement);
    await userEvent.type(await screen.findByLabelText(/Phone number/), '099111000');
    await userEvent.click(screen.getByRole('button', {
      name: 'Send SMS code'
    }));
    await userEvent.type(screen.getByRole('textbox', {
      name: 'SMS code'
    }), DEMO_OTP);
    await userEvent.click(screen.getByRole('button', {
      name: 'Verify code'
    }));
    await expect(await screen.findByText('Lookup unavailable')).toBeVisible();
    await expect(screen.getByRole('button', {
      name: 'Retry'
    })).toBeVisible();
    await expect(screen.getByRole('button', {
      name: 'Change phone number'
    })).toBeVisible();
  }
}`,...E.parameters?.docs?.source},description:{story:`Lookup failure: entries kept, retry offered, the number still changeable.`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const screen = body(canvasElement);
    await userEvent.type(await screen.findByLabelText(/Phone number/), '099111999');
    await userEvent.click(screen.getByRole('button', {
      name: 'Send SMS code'
    }));
    await expect(await screen.findByText(/Too many codes requested/)).toBeVisible();
  }
}`,...D.parameters?.docs?.source},description:{story:`OTP rate limit surfaces on the entry state without leaking existence.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const screen = body(canvasElement);
    await userEvent.type(await screen.findByLabelText(/Phone number/), '0991');
    await userEvent.keyboard('{Escape}');
    await expect(await screen.findByText('Discard what you entered?')).toBeVisible();
    await userEvent.click(screen.getByRole('button', {
      name: 'Keep editing'
    }));
    await expect(args.onClose).not.toHaveBeenCalled();
    await userEvent.keyboard('{Escape}');
    await userEvent.click(await screen.findByRole('button', {
      name: 'Discard & close'
    }));
    await waitFor(() => expect(args.onClose).toHaveBeenCalledWith('dismissed'));
  }
}`,...O.parameters?.docs?.source},description:{story:`Esc with entered data asks before discarding; backdrop never dismisses.`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    createDelayMs: 0
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const screen = body(canvasElement);
    await userEvent.type(await screen.findByLabelText(/Phone number/), FRESH_PHONE);
    await userEvent.click(screen.getByRole('button', {
      name: 'Send SMS code'
    }));
    await userEvent.type(screen.getByRole('textbox', {
      name: 'SMS code'
    }), DEMO_OTP);
    await userEvent.click(screen.getByRole('button', {
      name: 'Verify code'
    }));
    await expect(await screen.findByText('No matching patient was found for this phone number. PSC will confirm identity.')).toBeVisible();
    await userEvent.type(screen.getByLabelText(/Full name/), 'Pierre');
    await userEvent.type(screen.getByLabelText(/Date of birth or estimated age/), '32');
    await userEvent.click(screen.getByRole('radio', {
      name: 'Female'
    }));
    await userEvent.click(screen.getByRole('button', {
      name: 'Create provisional patient and continue'
    }));
    await waitFor(() => expect(args.onClose).toHaveBeenCalledWith('completed'));
  }
}`,...k.parameters?.docs?.source},description:{story:`Full journey — fresh phone to provisional patient, end to end.`,...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const screen = body(canvasElement);
    await userEvent.type(await screen.findByLabelText(/Phone number/), KNOWN_PHONE);
    await userEvent.click(screen.getByRole('button', {
      name: 'Send SMS code'
    }));
    await userEvent.type(screen.getByRole('textbox', {
      name: 'SMS code'
    }), DEMO_OTP);
    await userEvent.click(screen.getByRole('button', {
      name: 'Verify code'
    }));
    await userEvent.click(await screen.findByRole('button', {
      name: 'Use this patient'
    }));
    await waitFor(() => expect(args.onClose).toHaveBeenCalledWith('completed'));
  }
}`,...A.parameters?.docs?.source},description:{story:`Full journey — known phone to existing patient attach.`,...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  play: async ({
    canvasElement
  }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByRole('heading', {
      name: 'Patient phone'
    })).toBeVisible();
    await expect(screen.getByLabelText(/Phone number/)).toBeVisible();
    await expect(screen.getByRole('button', {
      name: 'Send SMS code'
    })).toBeVisible();
  }
}`,...j.parameters?.docs?.source},description:{story:`320px: the step is the first thing on screen, full-width presentation.`,...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    initial: {
      state: 'sharedMatches',
      phone: '+85570123497',
      candidates: DEMO_SHARED_PHONE_PATIENTS
    }
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  play: async ({
    canvasElement
  }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByText('This number is linked to 3 patients')).toBeVisible();
    await expect(screen.getAllByRole('radio')).toHaveLength(3);
  }
}`,...M.parameters?.docs?.source},description:{story:`320px shared-phone safety state: every candidate stays selectable.`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    initial: {
      state: 'noMatch',
      phone: '+85599111222',
      draft: {
        name: 'Sreymom Nguyễn Thị Hồng Phương',
        dobOrAge: '12-09-1994',
        sex: 'Female'
      }
    }
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  play: async ({
    canvasElement
  }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByDisplayValue('Sreymom Nguyễn Thị Hồng Phương')).toBeVisible();
    await expect(screen.getByRole('button', {
      name: 'Create provisional patient and continue'
    })).toBeVisible();
  }
}`,...N.parameters?.docs?.source},description:{story:`320px long content: the body scrolls, the primary action stays reachable.`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    initial: {
      state: 'error',
      phone: '+85599111000'
    }
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  play: async ({
    canvasElement
  }) => {
    const screen = body(canvasElement);
    await expect(await screen.findByText('Lookup unavailable')).toBeVisible();
    await expect(screen.getByRole('button', {
      name: 'Retry'
    })).toBeVisible();
  }
}`,...P.parameters?.docs?.source},description:{story:`320px recoverable lookup failure: retry and change actions remain usable.`,...P.parameters?.docs?.description}}},F=[`EnterPhone`,`VerifyOtp`,`KnownMatch`,`SharedPhoneMatches`,`VerifyingOtp`,`DifferentPatient`,`NoMatch`,`ChangeVerifiedPhone`,`SubmittingTemporaryPatient`,`LookupError`,`RateLimited`,`UnsavedDataGuard`,`FullJourneyTemporary`,`FullJourneyKnownMatch`,`Mobile320`,`MobileSharedPhoneMatches`,`MobileNoMatchLongContent`,`MobileLookupError`]}))();export{w as ChangeVerifiedPhone,S as DifferentPatient,_ as EnterPhone,A as FullJourneyKnownMatch,k as FullJourneyTemporary,y as KnownMatch,E as LookupError,j as Mobile320,P as MobileLookupError,N as MobileNoMatchLongContent,M as MobileSharedPhoneMatches,C as NoMatch,D as RateLimited,b as SharedPhoneMatches,T as SubmittingTemporaryPatient,O as UnsavedDataGuard,v as VerifyOtp,x as VerifyingOtp,F as __namedExportsOrder,g as default};