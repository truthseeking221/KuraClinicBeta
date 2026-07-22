import{i as e}from"./preload-helper-MclHqJXp.js";import{r as t,t as n}from"./readiness-data-D41RGqZh.js";import{a as r,c as i,l as a}from"./demo-data-K2RuITMi.js";import{n as o,t as s}from"./door-BdhrFt9R.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;e((()=>{o(),i(),t(),{expect:c,fn:l,userEvent:u,waitFor:d,within:f}=__STORYBOOK_MODULE_TEST__,p=[`### Onboarding-driven app scenarios`,``,"Every registered phone uses OTP `123456`, enters through this Door, and opens only an existing app route backed by the named Storybook state.",``,`| Phone | Scenario | Entry | Journey evidence | Storybook source |`,`| --- | --- | --- | --- | --- |`,...a.map(e=>`| \`${e.phone}\` | ${e.label} | \`${e.entryPath}\` | ${e.journeyIds.join(`, `)} | ${e.source} |`)].join(`
`),m={title:`Clinic/Auth/Door`,component:s,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:{readiness:n.auth,intake:{decision:`COMPOSE`,owner:`src/features/auth`,evidence:`Flow ported from kura-platform auth-mf door-flow.ts (S1 method entry + S2 OTP verify). ReUI auth blocks (auth-17/auth-20) surveyed as layout references only — password-based patterns rejected: the Kura door is OTP-first with sign-in = sign-up. Composed from Card, PhoneInput, Input, Button, OtpInput, and Alert.`,exclusions:[`Passwords, magic links, and third-party OAuth (Kura door uses phone or email OTP)`,`Clerk/ticket wiring and production identity-provider redirects (prototype boundary)`]},journeys:[`clinic-door-sign-in`,`clinic-door-sign-up`,`clinic-door-revoked`]},docs:{description:{component:`One door: sign-in IS sign-up. Phone OTP is primary and email OTP is the alternate. Requesting a code never reveals whether the identifier exists (anti-enumeration); revoked accounts are blocked on every method. Any unregistered identifier is a fresh sign-up routed to the wizard.\n\n${p}`}}},args:{onRouted:l()}},h={play:async({canvasElement:e})=>{let t=f(e);await c(t.getByRole(`heading`,{name:`Sign in to Kura`})).toBeVisible(),await c(t.getByText(`New here? Verify your code to create an account.`)).toBeVisible(),await c(t.getByLabelText(/Phone number/)).toBeVisible();let n=t.getByRole(`button`,{name:`Use email instead`});await c(n).toBeVisible(),await c(n.querySelector(`[data-kura-icon="mail"]`)).toBeVisible(),await c(t.queryByRole(`radiogroup`)).not.toBeInTheDocument(),await c(t.queryByRole(`button`,{name:/Google/})).not.toBeInTheDocument()}},g={play:async({canvasElement:e})=>{let t=f(e),n=t.getByLabelText(/Phone number/);await u.type(n,`98111222`),await u.click(t.getByRole(`button`,{name:`Use email instead`}));let r=await t.findByRole(`textbox`,{name:`Email`});await c(r).toHaveFocus(),await u.type(r,`doctor@clinic.example`);let i=t.getByRole(`button`,{name:`Use phone instead`});await c(i.querySelector(`[data-kura-icon="mobile-device"]`)).toBeVisible(),await u.click(i);let a=await t.findByLabelText(/Phone number/);await c(a).toHaveFocus(),await c(a).toHaveValue(`098 111 222`)}},_={play:async({canvasElement:e,args:t})=>{let n=f(e);await u.type(n.getByLabelText(/Phone number/),`98111222`),await u.click(n.getByRole(`button`,{name:`Send SMS code`})),await c(await n.findByText(/\+85598111222/)).toBeVisible(),await u.type(n.getByRole(`textbox`,{name:`SMS code`}),r),await u.click(n.getByRole(`button`,{name:`Verify and continue`})),await d(()=>c(t.onRouted).toHaveBeenCalledWith(`wizard`,`+85598111222`))}},v={play:async({canvasElement:e,args:t})=>{let n=f(e);await u.type(n.getByLabelText(/Phone number/),`12777088`),await u.click(n.getByRole(`button`,{name:`Send SMS code`})),await u.type(n.getByRole(`textbox`,{name:`SMS code`}),r),await u.click(n.getByRole(`button`,{name:`Verify and continue`})),await d(()=>c(t.onRouted).toHaveBeenCalledWith(`workspace`,`+85512777088`))}},y={play:async({canvasElement:e,args:t})=>{let n=f(e);await u.type(n.getByLabelText(/Phone number/),`98111222`),await u.click(n.getByRole(`button`,{name:`Send SMS code`})),await u.type(n.getByRole(`textbox`,{name:`SMS code`}),`000000`),await u.click(n.getByRole(`button`,{name:`Verify and continue`})),await c(await n.findByRole(`alert`)).toHaveTextContent(/incorrect or expired/i),await c(t.onRouted).not.toHaveBeenCalled()}},b={play:async({canvasElement:e,args:t})=>{let n=f(e);await u.type(n.getByLabelText(/Phone number/),`12000666`),await u.click(n.getByRole(`button`,{name:`Send SMS code`})),await u.type(n.getByRole(`textbox`,{name:`SMS code`}),r),await u.click(n.getByRole(`button`,{name:`Verify and continue`})),await c(await n.findByText(`This account has been disabled`)).toBeVisible(),await c(t.onRouted).not.toHaveBeenCalled()}},x={args:{initialMethod:`email`},play:async({canvasElement:e})=>{let t=f(e);await u.type(t.getByRole(`textbox`,{name:`Email`}),`not-an-email`),await u.click(t.getByRole(`button`,{name:`Send email code`})),await c(await t.findByText(`Enter a valid email address.`)).toBeVisible()}},S={args:{onRequestCode:()=>`throttled`},play:async({canvasElement:e})=>{let t=f(e);await u.type(t.getByLabelText(/Phone number/),`98111222`),await u.click(t.getByRole(`button`,{name:`Send SMS code`})),await c(await t.findByText(/Too many attempts/)).toBeVisible()}},C={parameters:{viewport:{defaultViewport:`kura320`}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Sign in to Kura'
    })).toBeVisible();
    await expect(canvas.getByText('New here? Verify your code to create an account.')).toBeVisible();
    await expect(canvas.getByLabelText(/Phone number/)).toBeVisible();
    const emailAlternate = canvas.getByRole('button', {
      name: 'Use email instead'
    });
    await expect(emailAlternate).toBeVisible();
    await expect(emailAlternate.querySelector('[data-kura-icon="mail"]')).toBeVisible();
    await expect(canvas.queryByRole('radiogroup')).not.toBeInTheDocument();
    await expect(canvas.queryByRole('button', {
      name: /Google/
    })).not.toBeInTheDocument();
  }
}`,...h.parameters?.docs?.source},description:{story:`Phone-first form with email available as a progressive alternate.`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const phoneInput = canvas.getByLabelText(/Phone number/);
    await userEvent.type(phoneInput, '98111222');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Use email instead'
    }));
    const emailInput = await canvas.findByRole('textbox', {
      name: 'Email'
    });
    await expect(emailInput).toHaveFocus();
    await userEvent.type(emailInput, 'doctor@clinic.example');
    const phoneAlternate = canvas.getByRole('button', {
      name: 'Use phone instead'
    });
    await expect(phoneAlternate.querySelector('[data-kura-icon="mobile-device"]')).toBeVisible();
    await userEvent.click(phoneAlternate);
    const restoredPhone = await canvas.findByLabelText(/Phone number/);
    await expect(restoredPhone).toHaveFocus();
    await expect(restoredPhone).toHaveValue('098 111 222');
  }
}`,...g.parameters?.docs?.source},description:{story:`Switching methods preserves work and moves focus to the newly revealed field.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), '98111222');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send SMS code'
    }));
    await expect(await canvas.findByText(/\\+85598111222/)).toBeVisible();
    await userEvent.type(canvas.getByRole('textbox', {
      name: 'SMS code'
    }), DEMO_OTP);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Verify and continue'
    }));
    await waitFor(() => expect(args.onRouted).toHaveBeenCalledWith('wizard', '+85598111222'));
  }
}`,..._.parameters?.docs?.source},description:{story:`New identifier: verify routes into the onboarding wizard (sign-up path).`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), '12777088');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send SMS code'
    }));
    await userEvent.type(canvas.getByRole('textbox', {
      name: 'SMS code'
    }), DEMO_OTP);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Verify and continue'
    }));
    await waitFor(() => expect(args.onRouted).toHaveBeenCalledWith('workspace', '+85512777088'));
  }
}`,...v.parameters?.docs?.source},description:{story:`Known member: same door, routed to workspace entry instead.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), '98111222');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send SMS code'
    }));
    await userEvent.type(canvas.getByRole('textbox', {
      name: 'SMS code'
    }), '000000');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Verify and continue'
    }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent(/incorrect or expired/i);
    await expect(args.onRouted).not.toHaveBeenCalled();
  }
}`,...y.parameters?.docs?.source},description:{story:`Wrong code: announced error, no disclosure about the identifier.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), '12000666');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send SMS code'
    }));
    await userEvent.type(canvas.getByRole('textbox', {
      name: 'SMS code'
    }), DEMO_OTP);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Verify and continue'
    }));
    await expect(await canvas.findByText('This account has been disabled')).toBeVisible();
    await expect(args.onRouted).not.toHaveBeenCalled();
  }
}`,...b.parameters?.docs?.source},description:{story:`Revoked account: blocked after verify, on every method.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    initialMethod: 'email'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('textbox', {
      name: 'Email'
    }), 'not-an-email');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send email code'
    }));
    await expect(await canvas.findByText('Enter a valid email address.')).toBeVisible();
  }
}`,...x.parameters?.docs?.source},description:{story:`Email method: same machine, different identifier shape.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    onRequestCode: () => 'throttled'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), '98111222');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send SMS code'
    }));
    await expect(await canvas.findByText(/Too many attempts/)).toBeVisible();
  }
}`,...S.parameters?.docs?.source},description:{story:`Route-level throttle surfaces without leaking identifier existence.`,...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...C.parameters?.docs?.source},description:{story:`Narrow viewport: country + phone stack, targets stay comfortable.`,...C.parameters?.docs?.description}}},w=[`Default`,`MethodSwitchPreservesInput`,`NewAccountToWizard`,`ReturningMember`,`InvalidCode`,`RevokedAccount`,`EmailMethod`,`Throttled`,`Mobile320`]}))();export{h as Default,x as EmailMethod,y as InvalidCode,g as MethodSwitchPreservesInput,C as Mobile320,_ as NewAccountToWizard,v as ReturningMember,b as RevokedAccount,S as Throttled,w as __namedExportsOrder,m as default};