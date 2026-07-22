import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{n as i,t as a}from"./otp-input-D_5icaJb.js";function o({error:e,fullWidth:t=!1,onComplete:n}){let[r,i]=(0,c.useState)(``);return(0,s.jsx)(`div`,{style:{width:`min(24rem, calc(100vw - 2rem))`},children:(0,s.jsx)(a,{error:e,fullWidth:t,helpText:e?void 0:`Enter the 6-digit code from the SMS.`,label:`SMS code`,onComplete:n,onValueChange:i,value:r})})}var s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E;t((()=>{s=r(),c=e(n()),i(),{expect:l,fn:u,userEvent:d,within:f}=__STORYBOOK_MODULE_TEST__,p={title:`Design System/Patterns/OtpInput`,component:a,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`Kura keeps one accessible logical input from input-otp and now adopts the complete ReUI slot anatomy: joined slot groups with separators, configurable grouping, paste distribution, completion, and SMS autofill.`,exclusions:[`Alphanumeric licence-key entry remains outside the numeric verification-code contract used by Kura authentication and patient-contact flows.`,`Resend, expiry, verification requests, and support recovery remain feature-owned workflow behavior rather than primitive behavior.`]},source:{vendor:`ReUI`,registryItems:[`c-input-otp-1`,`c-input-otp-2`,`c-input-otp-3`,`c-input-otp-4`,`c-input-otp-5`,`c-input-otp-6`],sourceUrl:`https://reui.io/components/input-otp`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-focus-ring`,icons:`kura-canonical-minus-separator`,motion:`kura-motion-color`}}}},m={args:{value:``,onValueChange:()=>{},label:`SMS code`},render:()=>(0,s.jsx)(o,{})},h={args:{value:``,onValueChange:u(),accessibleLabel:`SMS code`},play:async({canvasElement:e})=>{let t=f(e);await l(t.getByRole(`textbox`,{name:`SMS code`})).toBeVisible(),await l(t.queryByText(`SMS code`)).not.toBeInTheDocument()}},g={args:{...m.args,fullWidth:!0},render:()=>(0,s.jsx)(o,{fullWidth:!0}),play:async({canvasElement:e})=>{let t=e.querySelector(`[data-slot="otp-input"]`),n=e.querySelector(`[data-input-otp-container]`);await l(t).not.toBeNull(),await l(n).not.toBeNull();let r=t?.getBoundingClientRect().width??0,i=n?.getBoundingClientRect().width??0;await l(Math.abs(r-i)).toBeLessThanOrEqual(1)}},_={args:m.args,render:function(){let[e,t]=(0,c.useState)(null);return(0,s.jsxs)(`div`,{children:[(0,s.jsx)(o,{onComplete:t}),e?(0,s.jsxs)(`p`,{role:`status`,children:[`Completed: `,e]}):null]})},play:async({canvasElement:e})=>{let t=f(e),n=t.getByRole(`textbox`,{name:`SMS code`});await d.type(n,`123456`),await l(n).toHaveValue(`123456`),await l(await t.findByRole(`status`)).toHaveTextContent(`Completed: 123456`)}},v={args:{value:`123456`,onValueChange:u(),label:`Digits only`,groupSize:6}},y={args:{value:`123456`,onValueChange:u(),label:`Multi-separator`,groupSize:2}},b={args:m.args,render:()=>(0,s.jsx)(o,{}),play:async({canvasElement:e})=>{let t=f(e).getByRole(`textbox`,{name:`SMS code`});await t.focus(),await d.paste(`987-654`),await l(t).toHaveValue(`987654`)}},x={args:m.args,render:()=>(0,s.jsx)(o,{}),play:async({canvasElement:e})=>{let t=f(e).getByRole(`textbox`,{name:`SMS code`});await d.type(t,`12`),await d.keyboard(`{Backspace}{Backspace}`),await l(t).toHaveValue(``)}},S={args:m.args,render:()=>(0,s.jsx)(o,{error:`Incorrect or expired code — try again.`}),play:async({canvasElement:e})=>{let t=f(e);await l(t.getByRole(`alert`)).toHaveTextContent(/Incorrect or expired/),await l(t.getByRole(`textbox`,{name:`SMS code`})).toHaveAttribute(`aria-invalid`,`true`)}},C={args:{value:`123`,onValueChange:u(),label:`SMS code`,disabled:!0}},w={args:{value:``,onValueChange:u(),label:`PIN`,length:4,groupSize:4},play:async({canvasElement:e})=>{let t=Array.from(e.querySelectorAll(`[data-slot="otp-group"] > span`));await l(t).toHaveLength(4);for(let e of t)await l(e.getBoundingClientRect().width).toBe(44),await l(e.getBoundingClientRect().height).toBe(44),await l(getComputedStyle(e).fontSize).toBe(`20px`)}},T={args:{...m.args,fullWidth:!0},parameters:{viewport:{defaultViewport:`kura320`}},render:()=>(0,s.jsx)(o,{fullWidth:!0}),play:async({canvasElement:e})=>{let t=e.querySelector(`[data-slot="otp-input"]`),n=e.querySelector(`[data-input-otp-container]`);await l(t).not.toBeNull(),await l(n).not.toBeNull();let r=t?.getBoundingClientRect(),i=n?.getBoundingClientRect();await l(Math.abs((r?.width??0)-(i?.width??0))).toBeLessThanOrEqual(1),await l((i?.right??0)<=(r?.right??0)+1).toBe(!0)}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    value: '',
    onValueChange: () => {},
    label: 'SMS code'
  },
  render: () => <Playground />
}`,...m.parameters?.docs?.source},description:{story:`ReUI default anatomy: two compact joined groups with one separator.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    value: '',
    onValueChange: fn(),
    accessibleLabel: 'SMS code'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('textbox', {
      name: 'SMS code'
    })).toBeVisible();
    await expect(canvas.queryByText('SMS code')).not.toBeInTheDocument();
  }
}`,...h.parameters?.docs?.source},description:{story:`A dialog title can name the task; preserve the field name for assistive technology.`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    fullWidth: true
  },
  render: () => <Playground fullWidth />,
  play: async ({
    canvasElement
  }) => {
    const field = canvasElement.querySelector<HTMLElement>('[data-slot="otp-input"]');
    const slots = canvasElement.querySelector<HTMLElement>('[data-input-otp-container]');
    await expect(field).not.toBeNull();
    await expect(slots).not.toBeNull();
    const fieldWidth = field?.getBoundingClientRect().width ?? 0;
    const slotsWidth = slots?.getBoundingClientRect().width ?? 0;
    await expect(Math.abs(fieldWidth - slotsWidth)).toBeLessThanOrEqual(1);
  }
}`,...g.parameters?.docs?.source},description:{story:`Auth forms can stretch both groups to the available field width.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  render: function Render() {
    const [done, setDone] = useState<string | null>(null);
    return <div>
        <Playground onComplete={setDone} />
        {done ? <p role="status">Completed: {done}</p> : null}
      </div>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', {
      name: 'SMS code'
    });
    await userEvent.type(input, '123456');
    await expect(input).toHaveValue('123456');
    await expect(await canvas.findByRole('status')).toHaveTextContent('Completed: 123456');
  }
}`,..._.parameters?.docs?.source},description:{story:`Typing advances through the same logical input; the sixth digit fires onComplete once.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    value: '123456',
    onValueChange: fn(),
    label: 'Digits only',
    groupSize: 6
  }
}`,...v.parameters?.docs?.source},description:{story:`Six numeric slots joined into one uninterrupted group.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    value: '123456',
    onValueChange: fn(),
    label: 'Multi-separator',
    groupSize: 2
  }
}`,...y.parameters?.docs?.source},description:{story:`Three compact groups reproduce ReUI's multiple-separator composition.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  render: () => <Playground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', {
      name: 'SMS code'
    });
    await input.focus();
    await userEvent.paste('987-654');
    await expect(input).toHaveValue('987654');
  }
}`,...b.parameters?.docs?.source},description:{story:`Paste distributes an entire code across the slots.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  render: () => <Playground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', {
      name: 'SMS code'
    });
    await userEvent.type(input, '12');
    await userEvent.keyboard('{Backspace}{Backspace}');
    await expect(input).toHaveValue('');
  }
}`,...x.parameters?.docs?.source},description:{story:`Backspace clears the current digit, then retreats.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  render: () => <Playground error="Incorrect or expired code — try again." />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('alert')).toHaveTextContent(/Incorrect or expired/);
    await expect(canvas.getByRole('textbox', {
      name: 'SMS code'
    })).toHaveAttribute('aria-invalid', 'true');
  }
}`,...S.parameters?.docs?.source},description:{story:`Invalid code: destructive border + announced error.`,...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    value: '123',
    onValueChange: fn(),
    label: 'SMS code',
    disabled: true
  }
}`,...C.parameters?.docs?.source},description:{story:`Disabled while a verify request is in flight.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    value: '',
    onValueChange: fn(),
    label: 'PIN',
    length: 4,
    groupSize: 4
  },
  play: async ({
    canvasElement
  }) => {
    const slots = Array.from(canvasElement.querySelectorAll<HTMLElement>('[data-slot="otp-group"] > span'));
    await expect(slots).toHaveLength(4);
    for (const slot of slots) {
      await expect(slot.getBoundingClientRect().width).toBe(44);
      await expect(slot.getBoundingClientRect().height).toBe(44);
      await expect(getComputedStyle(slot).fontSize).toBe('20px');
    }
  }
}`,...w.parameters?.docs?.source},description:{story:`Four-digit variant for shorter PIN codes.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    fullWidth: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  render: () => <Playground fullWidth />,
  play: async ({
    canvasElement
  }) => {
    const field = canvasElement.querySelector<HTMLElement>('[data-slot="otp-input"]');
    const slots = canvasElement.querySelector<HTMLElement>('[data-input-otp-container]');
    await expect(field).not.toBeNull();
    await expect(slots).not.toBeNull();
    const fieldRect = field?.getBoundingClientRect();
    const slotsRect = slots?.getBoundingClientRect();
    await expect(Math.abs((fieldRect?.width ?? 0) - (slotsRect?.width ?? 0))).toBeLessThanOrEqual(1);
    await expect((slotsRect?.right ?? 0) <= (fieldRect?.right ?? 0) + 1).toBe(true);
  }
}`,...T.parameters?.docs?.source},description:{story:`At 320px, the six-slot row fills its field without horizontal overflow.`,...T.parameters?.docs?.description}}},E=[`Default`,`AccessibleNameOnly`,`FullWidth`,`TypedCompletion`,`DigitsOnly`,`MultipleSeparators`,`PasteDistribution`,`BackspaceRetreat`,`ErrorState`,`Disabled`,`FourDigits`,`Mobile320`]}))();export{h as AccessibleNameOnly,x as BackspaceRetreat,m as Default,v as DigitsOnly,C as Disabled,S as ErrorState,w as FourDigits,g as FullWidth,T as Mobile320,y as MultipleSeparators,b as PasteDistribution,_ as TypedCompletion,E as __namedExportsOrder,p as default};