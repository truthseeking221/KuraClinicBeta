import{i as e}from"./preload-helper-MclHqJXp.js";import{r as t,t as n}from"./readiness-data-D41RGqZh.js";import{a as r,c as i}from"./demo-data-K2RuITMi.js";import{n as a,t as o}from"./onboarding-wizard-DUW9RuzH.js";async function s(e,t){let n=g(e);await m.click(await n.findByLabelText(/Profession/,{},{timeout:3e3}));let r=g(e.ownerDocument.body);await m.click(await r.findByRole(`option`,{name:t}))}async function c(e,t=`Bopha Kim`){let n=g(e),r=n.getByLabelText(/Full name/);r.getAttribute(`value`)||await m.type(r,t),await m.click(n.getByRole(`button`,{name:`Continue`}))}async function l(e,t=`98111222`,n=`Bopha Kim`){let r=g(e);r.queryByLabelText(/Full name/)&&await c(e,n),await m.type(r.getByLabelText(/Phone number/),t),await m.click(r.getByRole(`button`,{name:`Send code`})),await f(r.getByRole(`textbox`,{name:`SMS code`})).toBeVisible()}async function u(e,t=r){let n=g(e);await m.type(n.getByRole(`textbox`,{name:`SMS code`}),t),await m.click(n.getByRole(`button`,{name:`Verify`}))}async function d(e,t=`create`){let n=g(e);await c(e),await f(await n.findByLabelText(/Clinic name/)).toHaveValue(`Bopha Kim's cabinet`),await m.click(n.getByRole(`button`,{name:t===`create`?`Create clinic`:`Skip for now`})),await f(await n.findByRole(`heading`,{name:`Do you hold a medical licence?`})).toBeVisible()}var f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W;e((()=>{a(),i(),t(),{expect:f,fn:p,userEvent:m,waitFor:h,within:g}=__STORYBOOK_MODULE_TEST__,_=`+85598111222`,v={title:`Clinic/Auth/Onboarding Wizard`,component:o,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:{readiness:n.auth,intake:{decision:`COMPOSE`,owner:`src/features/auth`,evidence:`Implements auth-onboarding-product-spec.md §6.2 and locked decisions AD-2, AD-3, AD-7, AD-8, and AD-9. Composed only from indexed Kura Stepper, Input, PhoneInput, Select, RadioGroup, Radio, OtpInput, FileUpload, Alert, Card, and Button components.`},journeys:[`clinic-onboarding-self-serve`,`clinic-onboarding-invitee`,`clinic-onboarding-phone-hard-gate`,`clinic-onboarding-licence-declaration`]},docs:{description:{component:`Spec-complete post-door onboarding. Every completed account has a verified phone. Self-serve doctors complete Name → Phone-if-needed → Clinic → Licence; Clinic and Licence can be skipped. Invitees supply only missing name/phone facts. Cross-account phone reuse is blocked with support copy and never self-merged. Demo SMS code: 123456; +855 99 000 001/002 are in use; +855 99 000 009 belongs to an unavailable account.`}}},args:{entry:{isInvitee:!1,phoneVerified:!1},onDone:p()}},y={args:{entry:{isInvitee:!1,phoneVerified:!0,verifiedPhone:_}},play:async({canvasElement:e,args:t})=>{let n=g(e);await f(n.getByRole(`img`,{name:`Kura`})).toBeVisible(),await d(e);let r=n.getByRole(`radio`,{name:/Yes, I hold/});await m.click(r),await f(r).toBeChecked(),await s(e,`Doctor`),await m.upload(n.getByLabelText(`Medical licence document`),new File([`licence`],`medical-licence.pdf`,{type:`application/pdf`})),await m.click(n.getByRole(`button`,{name:`Finish setup`})),await h(()=>f(t.onDone).toHaveBeenCalledWith({clinicName:`Bopha Kim's cabinet`,mlDeclaration:{answer:`yes`,licenceFiles:[f.objectContaining({name:`medical-licence.pdf`})],profession:`doctor`},name:`Bopha Kim`,phone:_,phoneVerified:!0}))}},b={play:async({canvasElement:e})=>{let t=g(e);await l(e),await f(t.queryByRole(`button`,{name:/Skip/})).not.toBeInTheDocument(),await m.type(t.getByRole(`textbox`,{name:`SMS code`}),r),await m.click(t.getByRole(`button`,{name:`Verify`})),await f(await t.findByLabelText(/Clinic name/)).toBeVisible()}},x={args:{entry:{initialName:`Bopha Kim`,isInvitee:!1,phoneVerified:!0,verifiedPhone:_}},play:async({canvasElement:e})=>{let t=g(e),n=t.getByLabelText(/Full name/);await f(n).toHaveValue(`Bopha Kim`),await m.clear(n),await m.type(n,`Dr. Bopha Kim`),await m.click(t.getByRole(`button`,{name:`Continue`})),await f(await t.findByLabelText(/Clinic name/)).toHaveValue(`Dr. Bopha Kim's cabinet`)}},S={play:async({canvasElement:e})=>{let t=g(e);await m.click(t.getByRole(`button`,{name:`Continue`})),await f(await t.findByRole(`alert`)).toHaveTextContent(`Enter your name`),await f(t.getByLabelText(/Full name/)).toHaveAttribute(`aria-invalid`,`true`)}},C={play:async({canvasElement:e})=>{let t=g(e);await c(e),await m.type(t.getByLabelText(/Phone number/),`1234`),await m.click(t.getByRole(`button`,{name:`Send code`})),await f(await t.findByRole(`alert`)).toHaveTextContent(`valid phone number`),await f(t.queryByRole(`textbox`,{name:`SMS code`})).not.toBeInTheDocument()}},w={args:{entry:{isInvitee:!0,phoneVerified:!1}},play:async({canvasElement:e})=>{let t=g(e);await l(e,`98111333`,`Linh Nguyen`),await m.type(t.getByRole(`textbox`,{name:`SMS code`}),r),await f(t.getByRole(`status`)).toHaveTextContent(`Resend in 30s`),await f(t.getByText(`Expires in 10 minutes`)).toBeVisible(),await f(t.getByRole(`button`,{name:`Change number`})).toBeVisible(),await f(t.getByRole(`button`,{name:`Verify`})).toBeEnabled()}},T={args:{entry:{isInvitee:!0,phoneVerified:!1},resendCooldownSecs:0},play:async({canvasElement:e})=>{let t=g(e);await l(e);let n=t.getByRole(`textbox`,{name:`SMS code`});await m.type(n,r),await m.click(t.getByRole(`button`,{name:`Resend code`})),await f(n).toHaveValue(``),await f(t.getByRole(`button`,{name:`Verify`})).toBeDisabled()}},E={args:{entry:{isInvitee:!0,phoneVerified:!1}},play:async({canvasElement:e,args:t})=>{let n=g(e);await l(e),await u(e,`000000`),await f(await n.findByRole(`alert`)).toHaveTextContent(/incorrect or expired/i),await m.clear(n.getByRole(`textbox`,{name:`SMS code`})),await u(e),await h(()=>f(t.onDone).toHaveBeenCalled())}},D={args:{entry:{isInvitee:!0,phoneVerified:!1}},play:async({canvasElement:e,args:t})=>{let n=g(e);await c(e,`Linh Nguyen`);let r=n.getByRole(`combobox`,{name:/change country or region/i});await m.click(r);let i=g(e.ownerDocument.body),a=await i.findByRole(`combobox`,{name:`Search country or region`});await m.type(a,`Vietnam`),await m.click(i.getByRole(`option`,{name:/Vietnam.*\+84/i})),await m.type(n.getByLabelText(/Phone number/),`98111222`),await m.click(n.getByRole(`button`,{name:`Send code`})),await u(e),await h(()=>f(t.onDone).toHaveBeenCalledWith(f.objectContaining({phone:`+8498111222`,phoneVerified:!0})))}},O={play:async({canvasElement:e})=>{let t=g(e);await l(e,`99000001`),await u(e),await f(await t.findByText(`This phone is unavailable`)).toBeVisible(),await f(t.getByText(/support@kura.med/)).toBeVisible(),await f(t.queryByRole(`button`,{name:/merge|link my account/i})).not.toBeInTheDocument()}},k={play:async({canvasElement:e})=>{let t=g(e);await l(e,`99000009`),await u(e),await f(await t.findByText(`This phone is unavailable`)).toBeVisible(),await m.click(t.getByRole(`button`,{name:`Use a different phone`})),await f(await t.findByLabelText(/Phone number/)).toBeVisible()}},A={args:{entry:{isInvitee:!0,phoneVerified:!1}},play:async({canvasElement:e,args:t})=>{let n=g(e);await f(n.queryByText(`Clinic`)).not.toBeInTheDocument(),await f(n.queryByText(`Licence`)).not.toBeInTheDocument(),await l(e,`98111333`,`Linh Nguyen`),await u(e),await h(()=>f(t.onDone).toHaveBeenCalledWith({clinicName:null,mlDeclaration:null,name:`Linh Nguyen`,phone:`+85598111333`,phoneVerified:!0}))}},j={args:{entry:{existingName:`Dr. Dara Phan`,isInvitee:!0,phoneVerified:!1}},play:async({canvasElement:e,args:t})=>{let n=g(e);await f(n.queryByLabelText(/Full name/)).not.toBeInTheDocument(),await l(e,`98111444`),await u(e),await h(()=>f(t.onDone).toHaveBeenCalledWith(f.objectContaining({name:`Dr. Dara Phan`,phone:`+85598111444`})))}},M={args:{entry:{existingName:`Dr. Dara Phan`,isInvitee:!0,phoneVerified:!0,verifiedPhone:`+85512777088`}},play:async({canvasElement:e,args:t})=>{let n=g(e);await f(n.getByRole(`status`)).toHaveTextContent(`Opening your workspace`),await h(()=>f(t.onDone).toHaveBeenCalledWith({clinicName:null,mlDeclaration:null,name:`Dr. Dara Phan`,phone:`+85512777088`,phoneVerified:!0}))}},N={args:{entry:{isInvitee:!1,phoneVerified:!0,verifiedPhone:_}},play:async({canvasElement:e})=>{let t=g(e);await c(e,`Dara Phan`),await f(await t.findByLabelText(/Clinic name/)).toBeVisible(),await f(t.queryByLabelText(/Phone number/)).not.toBeInTheDocument();let n=t.getByRole(`tab`,{name:/Phone/});await f(n.closest(`[data-slot="stepper-item"]`)).toHaveAttribute(`data-state`,`completed`)}},P={args:{entry:{isInvitee:!1,phoneVerified:!0,verifiedPhone:_}},play:async({canvasElement:e,args:t})=>{let n=g(e);await d(e,`skip`),await m.click(n.getByRole(`button`,{name:`Skip for now`})),await h(()=>f(t.onDone).toHaveBeenCalledWith(f.objectContaining({clinicName:`Bopha Kim's cabinet`,mlDeclaration:null})))}},F={args:{entry:{isInvitee:!1,phoneVerified:!0,verifiedPhone:_}},play:async({canvasElement:e,args:t})=>{let n=g(e);await c(e),await m.clear(await n.findByLabelText(/Clinic name/)),await m.click(n.getByRole(`button`,{name:`Create clinic`})),await f(await n.findByRole(`alert`)).toHaveTextContent(`Clinic name is required.`),await f(t.onDone).not.toHaveBeenCalled()}},I={args:{entry:{isInvitee:!1,phoneVerified:!0,verifiedPhone:_}},play:async({canvasElement:e,args:t})=>{let n=g(e);await d(e),await m.click(n.getByRole(`radio`,{name:/No, I do not hold one/})),await m.click(n.getByRole(`button`,{name:`Finish setup`})),await h(()=>f(t.onDone).toHaveBeenCalledWith(f.objectContaining({mlDeclaration:{answer:`no`,licenceFiles:[],profession:null}})))}},L={args:{entry:{isInvitee:!1,phoneVerified:!0,verifiedPhone:_}},play:async({canvasElement:e,args:t})=>{let n=g(e);await d(e),await m.click(n.getByRole(`button`,{name:`Finish setup`})),await f(await n.findByRole(`alert`)).toHaveTextContent(`Answer the licence question`),await f(n.getByRole(`group`,{name:`Medical licence status`})).toHaveAttribute(`aria-invalid`,`true`),await f(t.onDone).not.toHaveBeenCalled()}},R={args:{entry:{isInvitee:!1,phoneVerified:!0,verifiedPhone:_}},play:async({canvasElement:e,args:t})=>{let n=g(e);await d(e),await m.click(n.getByRole(`button`,{name:`Skip for now`})),await h(()=>f(t.onDone).toHaveBeenCalledWith(f.objectContaining({mlDeclaration:null})))}},z={args:{entry:{isInvitee:!1,phoneVerified:!0,verifiedPhone:_}},play:async({canvasElement:e,args:t})=>{let n=g(e);await d(e),await m.click(n.getByRole(`radio`,{name:/Yes, I hold/})),await n.findByLabelText(/Profession/,{},{timeout:3e3}),await m.click(n.getByRole(`button`,{name:`Finish setup`}));let r=await n.findByRole(`alert`);await f(r).toHaveTextContent(`Select your profession`);let i=n.getByLabelText(/Profession/);await f(i).toHaveAttribute(`aria-invalid`,`true`),await f(i).toHaveAccessibleDescription(`Select your profession to continue.`),await m.click(i);let a=g(e.ownerDocument.body);for(let e of[`Doctor`,`Dentist`,`Nurse`,`Midwife`,`Other`])await f(await a.findByRole(`option`,{name:e})).toBeInTheDocument();await m.click(a.getByRole(`option`,{name:`Doctor`})),await m.click(n.getByRole(`button`,{name:`Finish setup`})),await f(await n.findByRole(`alert`)).toHaveTextContent(`Upload a licence document`),await f(t.onDone).not.toHaveBeenCalled()}},B={args:z.args,parameters:{viewport:{defaultViewport:`kura320`}},play:async({canvasElement:e,args:t})=>{let n=g(e);await d(e),await m.click(n.getByRole(`radio`,{name:/Yes, I hold/})),await n.findByLabelText(/Profession/,{},{timeout:3e3}),await m.click(n.getByRole(`button`,{name:`Finish setup`}));let r=n.getByLabelText(/Profession/);await f(r).toHaveAttribute(`aria-invalid`,`true`),await f(r).toHaveAccessibleDescription(`Select your profession to continue.`),await f(n.getByRole(`button`,{name:`Finish setup`})).toBeVisible(),await f(t.onDone).not.toHaveBeenCalled()}},V={args:{entry:{isInvitee:!1,phoneVerified:!0,verifiedPhone:_}},play:async({canvasElement:e,args:t})=>{let n=g(e);await d(e),await m.click(n.getByRole(`radio`,{name:/Yes, I hold/})),await s(e,`Dentist`),await m.upload(n.getByLabelText(`Medical licence document`),new File([`licence`],`dental-licence.pdf`,{type:`application/pdf`})),await f(n.getByText(`dental-licence.pdf`)).toBeVisible(),await m.click(n.getByRole(`button`,{name:`Finish setup`})),await h(()=>{let e=t.onDone.mock.calls[0]?.[0];f(e?.mlDeclaration?.answer).toBe(`yes`),e?.mlDeclaration?.answer===`yes`&&(f(e.mlDeclaration.profession).toBe(`dentist`),f(e.mlDeclaration.licenceFiles[0]?.name).toBe(`dental-licence.pdf`))})}},H={args:{entry:{initialName:`Dr. Chanthou Sok-Sereyvorlak`,isInvitee:!1,phoneVerified:!0,verifiedPhone:_}},parameters:{viewport:{defaultViewport:`kura320`}},play:async({canvasElement:e})=>{let t=g(e);await m.click(t.getByRole(`button`,{name:`Continue`})),await m.click(t.getByRole(`button`,{name:`Skip for now`})),await m.click(t.getByRole(`radio`,{name:/Yes, I hold/})),await s(e,`Other`),await f(t.getByLabelText(`Medical licence document`)).toBeVisible()}},U={args:{entry:{isInvitee:!0,phoneVerified:!1}},parameters:{viewport:{defaultViewport:`kura320`}},play:async({canvasElement:e})=>{let t=g(e);await l(e,`98111333`,`Linh Nguyen`),await m.type(t.getByRole(`textbox`,{name:`SMS code`}),r),await f(t.getByRole(`button`,{name:`Change number`})).toBeVisible(),await f(t.getByText(`Expires in 10 minutes`)).toBeVisible(),await f(t.getByRole(`button`,{name:`Verify`})).toBeEnabled()}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE
    }
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("img", {
      name: "Kura"
    })).toBeVisible();
    await reachLicence(canvasElement);
    const licenceYes = canvas.getByRole("radio", {
      name: /Yes, I hold/
    });
    await userEvent.click(licenceYes);
    await expect(licenceYes).toBeChecked();
    await pickProfession(canvasElement, "Doctor");
    await userEvent.upload(canvas.getByLabelText("Medical licence document"), new File(["licence"], "medical-licence.pdf", {
      type: "application/pdf"
    }));
    await userEvent.click(canvas.getByRole("button", {
      name: "Finish setup"
    }));
    await waitFor(() => expect(args.onDone).toHaveBeenCalledWith({
      clinicName: "Bopha Kim's cabinet",
      mlDeclaration: {
        answer: "yes",
        licenceFiles: [expect.objectContaining({
          name: "medical-licence.pdf"
        })],
        profession: "doctor"
      },
      name: "Bopha Kim",
      phone: VERIFIED_PHONE,
      phoneVerified: true
    }));
  }
}`,...y.parameters?.docs?.source},description:{story:`Full self-serve path requires a document for a medical-licence declaration.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await openPhoneVerification(canvasElement);
    await expect(canvas.queryByRole("button", {
      name: /Skip/
    })).not.toBeInTheDocument();
    await userEvent.type(canvas.getByRole("textbox", {
      name: "SMS code"
    }), DEMO_OTP);
    await userEvent.click(canvas.getByRole("button", {
      name: "Verify"
    }));
    await expect(await canvas.findByLabelText(/Clinic name/)).toBeVisible();
  }
}`,...b.parameters?.docs?.source},description:{story:`Email path: phone verification is a hard gate before Clinic.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      initialName: "Bopha Kim",
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const name = canvas.getByLabelText(/Full name/);
    await expect(name).toHaveValue("Bopha Kim");
    await userEvent.clear(name);
    await userEvent.type(name, "Dr. Bopha Kim");
    await userEvent.click(canvas.getByRole("button", {
      name: "Continue"
    }));
    await expect(await canvas.findByLabelText(/Clinic name/)).toHaveValue("Dr. Bopha Kim's cabinet");
  }
}`,...x.parameters?.docs?.source},description:{story:`A provider name is prefilled but remains editable before the cabinet default is formed.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", {
      name: "Continue"
    }));
    await expect(await canvas.findByRole("alert")).toHaveTextContent("Enter your name");
    await expect(canvas.getByLabelText(/Full name/)).toHaveAttribute("aria-invalid", "true");
  }
}`,...S.parameters?.docs?.source},description:{story:`Required name validation is announced without advancing the stepper.`,...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await submitName(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), "1234");
    await userEvent.click(canvas.getByRole("button", {
      name: "Send code"
    }));
    await expect(await canvas.findByRole("alert")).toHaveTextContent("valid phone number");
    await expect(canvas.queryByRole("textbox", {
      name: "SMS code"
    })).not.toBeInTheDocument();
  }
}`,...C.parameters?.docs?.source},description:{story:`A short phone is rejected before any OTP state is entered.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      isInvitee: true,
      phoneVerified: false
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await openPhoneVerification(canvasElement, "98111333", "Linh Nguyen");
    await userEvent.type(canvas.getByRole("textbox", {
      name: "SMS code"
    }), DEMO_OTP);
    await expect(canvas.getByRole("status")).toHaveTextContent("Resend in 30s");
    await expect(canvas.getByText("Expires in 10 minutes")).toBeVisible();
    await expect(canvas.getByRole("button", {
      name: "Change number"
    })).toBeVisible();
    await expect(canvas.getByRole("button", {
      name: "Verify"
    })).toBeEnabled();
  }
}`,...w.parameters?.docs?.source},description:{story:`OTP keeps the resend state with the code and number recovery with the destination.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      isInvitee: true,
      phoneVerified: false
    },
    resendCooldownSecs: 0
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await openPhoneVerification(canvasElement);
    const code = canvas.getByRole("textbox", {
      name: "SMS code"
    });
    await userEvent.type(code, DEMO_OTP);
    await userEvent.click(canvas.getByRole("button", {
      name: "Resend code"
    }));
    await expect(code).toHaveValue("");
    await expect(canvas.getByRole("button", {
      name: "Verify"
    })).toBeDisabled();
  }
}`,...T.parameters?.docs?.source},description:{story:`Resend clears the previous code and requires six fresh digits.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      isInvitee: true,
      phoneVerified: false
    }
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await openPhoneVerification(canvasElement);
    await enterOtp(canvasElement, "000000");
    await expect(await canvas.findByRole("alert")).toHaveTextContent(/incorrect or expired/i);
    await userEvent.clear(canvas.getByRole("textbox", {
      name: "SMS code"
    }));
    await enterOtp(canvasElement);
    await waitFor(() => expect(args.onDone).toHaveBeenCalled());
  }
}`,...E.parameters?.docs?.source},description:{story:`Incorrect OTP recovers in place and preserves the verified-phone task.`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      isInvitee: true,
      phoneVerified: false
    }
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await submitName(canvasElement, "Linh Nguyen");
    const country = canvas.getByRole("combobox", {
      name: /change country or region/i
    });
    await userEvent.click(country);
    const body = within(canvasElement.ownerDocument.body);
    const search = await body.findByRole("combobox", {
      name: "Search country or region"
    });
    await userEvent.type(search, "Vietnam");
    await userEvent.click(body.getByRole("option", {
      name: /Vietnam.*\\+84/i
    }));
    await userEvent.type(canvas.getByLabelText(/Phone number/), "98111222");
    await userEvent.click(canvas.getByRole("button", {
      name: "Send code"
    }));
    await enterOtp(canvasElement);
    await waitFor(() => expect(args.onDone).toHaveBeenCalledWith(expect.objectContaining({
      phone: "+8498111222",
      phoneVerified: true
    })));
  }
}`,...D.parameters?.docs?.source},description:{story:`The supported +84 path stores a normalized Vietnam E.164 phone.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await openPhoneVerification(canvasElement, "99000001");
    await enterOtp(canvasElement);
    await expect(await canvas.findByText("This phone is unavailable")).toBeVisible();
    await expect(canvas.getByText(/support@kura.med/)).toBeVisible();
    await expect(canvas.queryByRole("button", {
      name: /merge|link my account/i
    })).not.toBeInTheDocument();
  }
}`,...O.parameters?.docs?.source},description:{story:`Cross-account identifier reuse is blocked with support copy and no merge action.`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await openPhoneVerification(canvasElement, "99000009");
    await enterOtp(canvasElement);
    await expect(await canvas.findByText("This phone is unavailable")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", {
      name: "Use a different phone"
    }));
    await expect(await canvas.findByLabelText(/Phone number/)).toBeVisible();
  }
}`,...k.parameters?.docs?.source},description:{story:`A phone held by an unavailable account uses the same privacy-safe support path.`,...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      isInvitee: true,
      phoneVerified: false
    }
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByText("Clinic")).not.toBeInTheDocument();
    await expect(canvas.queryByText("Licence")).not.toBeInTheDocument();
    await openPhoneVerification(canvasElement, "98111333", "Linh Nguyen");
    await enterOtp(canvasElement);
    await waitFor(() => expect(args.onDone).toHaveBeenCalledWith({
      clinicName: null,
      mlDeclaration: null,
      name: "Linh Nguyen",
      phone: "+85598111333",
      phoneVerified: true
    }));
  }
}`,...A.parameters?.docs?.source},description:{story:`New invitee: Name → mandatory Phone only; Clinic and Licence stay deferred.`,...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      existingName: "Dr. Dara Phan",
      isInvitee: true,
      phoneVerified: false
    }
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByLabelText(/Full name/)).not.toBeInTheDocument();
    await openPhoneVerification(canvasElement, "98111444");
    await enterOtp(canvasElement);
    await waitFor(() => expect(args.onDone).toHaveBeenCalledWith(expect.objectContaining({
      name: "Dr. Dara Phan",
      phone: "+85598111444"
    })));
  }
}`,...j.parameters?.docs?.source},description:{story:`Existing invitee name is preserved; only the missing phone is requested.`,...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      existingName: "Dr. Dara Phan",
      isInvitee: true,
      phoneVerified: true,
      verifiedPhone: "+85512777088"
    }
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("status")).toHaveTextContent("Opening your workspace");
    await waitFor(() => expect(args.onDone).toHaveBeenCalledWith({
      clinicName: null,
      mlDeclaration: null,
      name: "Dr. Dara Phan",
      phone: "+85512777088",
      phoneVerified: true
    }));
  }
}`,...M.parameters?.docs?.source},description:{story:`Existing invitee with name and phone bypasses the wizard entirely.`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await submitName(canvasElement, "Dara Phan");
    await expect(await canvas.findByLabelText(/Clinic name/)).toBeVisible();
    await expect(canvas.queryByLabelText(/Phone number/)).not.toBeInTheDocument();
    const phoneStep = canvas.getByRole("tab", {
      name: /Phone/
    });
    await expect(phoneStep.closest('[data-slot="stepper-item"]')).toHaveAttribute("data-state", "completed");
  }
}`,...N.parameters?.docs?.source},description:{story:`Phone-path signup never re-asks the verified phone and marks that step complete.`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE
    }
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await reachLicence(canvasElement, "skip");
    await userEvent.click(canvas.getByRole("button", {
      name: "Skip for now"
    }));
    await waitFor(() => expect(args.onDone).toHaveBeenCalledWith(expect.objectContaining({
      clinicName: "Bopha Kim's cabinet",
      mlDeclaration: null
    })));
  }
}`,...P.parameters?.docs?.source},description:{story:`Skipping Clinic still creates the default cabinet and advances to Licence.`,...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE
    }
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await submitName(canvasElement);
    await userEvent.clear(await canvas.findByLabelText(/Clinic name/));
    await userEvent.click(canvas.getByRole("button", {
      name: "Create clinic"
    }));
    await expect(await canvas.findByRole("alert")).toHaveTextContent("Clinic name is required.");
    await expect(args.onDone).not.toHaveBeenCalled();
  }
}`,...F.parameters?.docs?.source},description:{story:`Explicit Create rejects an empty clinic name; Skip remains a safe alternative.`,...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE
    }
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await reachLicence(canvasElement);
    await userEvent.click(canvas.getByRole("radio", {
      name: /No, I do not hold one/
    }));
    await userEvent.click(canvas.getByRole("button", {
      name: "Finish setup"
    }));
    await waitFor(() => expect(args.onDone).toHaveBeenCalledWith(expect.objectContaining({
      mlDeclaration: {
        answer: "no",
        licenceFiles: [],
        profession: null
      }
    })));
  }
}`,...I.parameters?.docs?.source},description:{story:`NO records no credential and completes without a licence nag.`,...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE
    }
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await reachLicence(canvasElement);
    await userEvent.click(canvas.getByRole("button", {
      name: "Finish setup"
    }));
    await expect(await canvas.findByRole("alert")).toHaveTextContent("Answer the licence question");
    await expect(canvas.getByRole("group", {
      name: "Medical licence status"
    })).toHaveAttribute("aria-invalid", "true");
    await expect(args.onDone).not.toHaveBeenCalled();
  }
}`,...L.parameters?.docs?.source},description:{story:`Finish requires an explicit YES/NO answer unless the user deliberately skips.`,...L.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE
    }
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await reachLicence(canvasElement);
    await userEvent.click(canvas.getByRole("button", {
      name: "Skip for now"
    }));
    await waitFor(() => expect(args.onDone).toHaveBeenCalledWith(expect.objectContaining({
      mlDeclaration: null
    })));
  }
}`,...R.parameters?.docs?.source},description:{story:`The entire licence question can be deferred without fabricating an answer.`,...R.parameters?.docs?.description}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE
    }
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await reachLicence(canvasElement);
    await userEvent.click(canvas.getByRole("radio", {
      name: /Yes, I hold/
    }));
    await canvas.findByLabelText(/Profession/, {}, {
      timeout: 3000
    });
    await userEvent.click(canvas.getByRole("button", {
      name: "Finish setup"
    }));
    const professionError = await canvas.findByRole("alert");
    await expect(professionError).toHaveTextContent("Select your profession");
    const profession = canvas.getByLabelText(/Profession/);
    await expect(profession).toHaveAttribute("aria-invalid", "true");
    await expect(profession).toHaveAccessibleDescription("Select your profession to continue.");
    await userEvent.click(profession);
    const listbox = within(canvasElement.ownerDocument.body);
    for (const label of ["Doctor", "Dentist", "Nurse", "Midwife", "Other"]) {
      await expect(await listbox.findByRole("option", {
        name: label
      })).toBeInTheDocument();
    }
    await userEvent.click(listbox.getByRole("option", {
      name: "Doctor"
    }));
    await userEvent.click(canvas.getByRole("button", {
      name: "Finish setup"
    }));
    await expect(await canvas.findByRole("alert")).toHaveTextContent("Upload a licence document");
    await expect(args.onDone).not.toHaveBeenCalled();
  }
}`,...z.parameters?.docs?.source},description:{story:`YES validates profession and the required licence document.`,...z.parameters?.docs?.description}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: LicenceValidation.args,
  parameters: {
    viewport: {
      defaultViewport: "kura320"
    }
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await reachLicence(canvasElement);
    await userEvent.click(canvas.getByRole("radio", {
      name: /Yes, I hold/
    }));
    await canvas.findByLabelText(/Profession/, {}, {
      timeout: 3000
    });
    await userEvent.click(canvas.getByRole("button", {
      name: "Finish setup"
    }));
    const profession = canvas.getByLabelText(/Profession/);
    await expect(profession).toHaveAttribute("aria-invalid", "true");
    await expect(profession).toHaveAccessibleDescription("Select your profession to continue.");
    await expect(canvas.getByRole("button", {
      name: "Finish setup"
    })).toBeVisible();
    await expect(args.onDone).not.toHaveBeenCalled();
  }
}`,...B.parameters?.docs?.source},description:{story:`The profession error stays attached to its field and the action remains reachable at 320px.`,...B.parameters?.docs?.description}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE
    }
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await reachLicence(canvasElement);
    await userEvent.click(canvas.getByRole("radio", {
      name: /Yes, I hold/
    }));
    await pickProfession(canvasElement, "Dentist");
    await userEvent.upload(canvas.getByLabelText("Medical licence document"), new File(["licence"], "dental-licence.pdf", {
      type: "application/pdf"
    }));
    await expect(canvas.getByText("dental-licence.pdf")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", {
      name: "Finish setup"
    }));
    await waitFor(() => {
      const result = args.onDone.mock.calls[0]?.[0];
      expect(result?.mlDeclaration?.answer).toBe("yes");
      if (result?.mlDeclaration?.answer === "yes") {
        expect(result.mlDeclaration.profession).toBe("dentist");
        expect(result.mlDeclaration.licenceFiles[0]?.name).toBe("dental-licence.pdf");
      }
    });
  }
}`,...V.parameters?.docs?.source},description:{story:`A licence declaration returns the canonical FileUpload attachment in the result.`,...V.parameters?.docs?.description}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      initialName: "Dr. Chanthou Sok-Sereyvorlak",
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE
    }
  },
  parameters: {
    viewport: {
      defaultViewport: "kura320"
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", {
      name: "Continue"
    }));
    await userEvent.click(canvas.getByRole("button", {
      name: "Skip for now"
    }));
    await userEvent.click(canvas.getByRole("radio", {
      name: /Yes, I hold/
    }));
    await pickProfession(canvasElement, "Other");
    await expect(canvas.getByLabelText("Medical licence document")).toBeVisible();
  }
}`,...H.parameters?.docs?.source},description:{story:`Narrow viewport keeps the densest licence-upload state operable at 320px.`,...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      isInvitee: true,
      phoneVerified: false
    }
  },
  parameters: {
    viewport: {
      defaultViewport: "kura320"
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await openPhoneVerification(canvasElement, "98111333", "Linh Nguyen");
    await userEvent.type(canvas.getByRole("textbox", {
      name: "SMS code"
    }), DEMO_OTP);
    await expect(canvas.getByRole("button", {
      name: "Change number"
    })).toBeVisible();
    await expect(canvas.getByText("Expires in 10 minutes")).toBeVisible();
    await expect(canvas.getByRole("button", {
      name: "Verify"
    })).toBeEnabled();
  }
}`,...U.parameters?.docs?.source},description:{story:`At 320px, the OTP status and primary verification action retain their hierarchy.`,...U.parameters?.docs?.description}}},W=[`SelfServe`,`EmailPhoneGate`,`NamePrefill`,`NameValidation`,`PhoneValidation`,`PhoneVerification`,`ResendCode`,`InvalidOtpRecovery`,`VietnamPhone`,`PhoneAlreadyInUse`,`PhoneOnUnavailableAccount`,`NewInvitee`,`ExistingInviteeNeedsPhone`,`ExistingInviteeReady`,`PhoneAlreadyVerified`,`ClinicSkipCreatesCabinet`,`ClinicValidation`,`LicenceNo`,`LicenceAnswerRequired`,`LicenceSkip`,`LicenceValidation`,`LicenceValidationMobile320`,`LicenceUpload`,`Mobile320`,`PhoneVerificationMobile320`]}))();export{P as ClinicSkipCreatesCabinet,F as ClinicValidation,b as EmailPhoneGate,j as ExistingInviteeNeedsPhone,M as ExistingInviteeReady,E as InvalidOtpRecovery,L as LicenceAnswerRequired,I as LicenceNo,R as LicenceSkip,V as LicenceUpload,z as LicenceValidation,B as LicenceValidationMobile320,H as Mobile320,x as NamePrefill,S as NameValidation,A as NewInvitee,O as PhoneAlreadyInUse,N as PhoneAlreadyVerified,k as PhoneOnUnavailableAccount,C as PhoneValidation,w as PhoneVerification,U as PhoneVerificationMobile320,T as ResendCode,y as SelfServe,D as VietnamPhone,W as __namedExportsOrder,v as default};