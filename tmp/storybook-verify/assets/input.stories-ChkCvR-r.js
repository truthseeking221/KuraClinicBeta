import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{kt as i}from"./provider-marks-BeHzyBjc.js";import{t as a}from"./ui-C9kmmzkH.js";import{t as o}from"./input-UaJWx_9h.js";function s(){let[e,t]=(0,l.useState)(``);return(0,c.jsx)(o,{helpText:`${40-e.length} characters remaining.`,label:`Operational note`,maxLength:40,onChange:e=>t(e.target.value),placeholder:`Short context for the receiving team`,suffix:`${e.length}/40`,value:e})}var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O;t((()=>{c=r(),l=e(n()),a(),{expect:u,userEvent:d,within:f}=__STORYBOOK_MODULE_TEST__,p={title:`Design System/Primitives/Input`,component:o,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`The canonical Kura text-entry primitive keeps its field contract and adopts Kura neutral shell, inset ring, and state finish.`},source:{vendor:`Kura`,registryItem:`input`,visualReference:`Kura input`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-control-and-focus`,icons:`kura-canonical`,motion:`kura-border-focus-transition`,density:`kura-root-attribute`,responsive:`fluid-min-width-0`},exclusions:[`PhoneInput, DateSelector, FileUpload, OtpInput and Field retain their distinct interaction and composition contracts.`,`Password-strength policy, interactive visibility actions and complex forms remain workflow or pattern concerns.`,`Pulsed, custom-focus, subtle-background, bottom-border, pill and minimal treatments are styling-only variants without a recurring Kura semantic need.`]},docs:{description:{component:`Single-line text field with label, help, and error text wired for assistive technology, plus prefix/suffix slots for icons, units, and shortcut hints.`}}},argTypes:{size:{control:`radio`,options:[`sm`,`md`,`lg`]},variant:{control:`radio`,options:[`filled`,`surface`]},disabled:{control:`boolean`},readOnly:{control:`boolean`},required:{control:`boolean`}}},m={args:{"aria-label":`Quick search`,placeholder:`Search by name or code`,type:`search`}},h={args:{label:`Patient name`,placeholder:`Sokha Chan`},play:async({canvasElement:e})=>{let t=f(e).getByLabelText(`Patient name`);await d.type(t,`Sokha Chan`),await u(t).toHaveValue(`Sokha Chan`)}},g={args:{label:`Tendered (USD)`,placeholder:`0.00`,variant:`surface`},decorators:[e=>(0,c.jsx)(`div`,{style:{background:`var(--color-surface-2)`,borderRadius:`var(--radius-card-surface)`,padding:`var(--space-inset-card)`,width:`min(320px, 90vw)`},children:(0,c.jsx)(e,{})})],play:async({canvasElement:e})=>{let t=f(e).getByLabelText(`Tendered (USD)`);await u(t.closest(`[data-slot="input-control"]`)).toHaveAttribute(`data-variant`,`surface`)}},_={args:{label:`Booking code`,helpText:`Letters and numbers from the SMS, for example FZ-48210.`,placeholder:`FZ-48210`}},v={args:{label:`Search patients`,prefix:(0,c.jsx)(i,{size:16}),placeholder:`Name, phone, or code`,type:`search`}},y={args:{label:`Weight`,suffix:`kg`,inputMode:`decimal`,placeholder:`62.5`}},b={args:{label:`Full name`,required:!0,placeholder:`As shown on the ID document`}},x={args:{label:`Work email`,defaultValue:`name@`,error:`Enter a complete email address.`,type:`email`},play:async({canvasElement:e})=>{let t=f(e).getByLabelText(`Work email`);await u(t).toHaveAccessibleDescription(`Enter a complete email address.`),await u(t).toBeInvalid()}},S={args:{label:`Workspace`,defaultValue:`Mekong Clinic`,disabled:!0}},C={args:{defaultValue:`HN-004821`,helpText:`The identifier is locked after patient verification.`,label:`Verified patient ID`,readOnly:!0},play:async({canvasElement:e})=>{let t=f(e).getByLabelText(`Verified patient ID`);await u(t).toHaveAttribute(`readonly`),await u(t).not.toBeDisabled()}},w={render:()=>(0,c.jsx)(s,{}),play:async({canvasElement:e})=>{let t=f(e).getByLabelText(`Operational note`);await d.type(t,`Call before arrival`),await u(t).toHaveAccessibleDescription(`21 characters remaining.`)}},T={render:()=>(0,c.jsxs)(`div`,{style:{display:`grid`,gap:`var(--space-4)`,width:`min(320px, 90vw)`},children:[(0,c.jsx)(o,{label:`Work email`,placeholder:`name@clinic.example`,type:`email`}),(0,c.jsx)(o,{label:`Temporary password`,placeholder:`Enter password`,type:`password`}),(0,c.jsx)(o,{label:`Clinic website`,placeholder:`https://clinic.example`,type:`url`})]})},E={args:{label:`Sizes`},render:()=>(0,c.jsxs)(`div`,{style:{display:`grid`,gap:`var(--space-4)`,width:`min(320px, 90vw)`},children:[(0,c.jsx)(o,{label:`Small`,size:`sm`,placeholder:`Dense table filter`}),(0,c.jsx)(o,{label:`Medium`,size:`md`,placeholder:`Default form field`}),(0,c.jsx)(o,{label:`Large`,size:`lg`,placeholder:`Touch-first station field`})]})},D={args:{label:`Address line`,defaultValue:`Phum Prek Ho, Sangkat Prek Ho, Krong Ta Khmau, Kandal Province, near the old market opposite the pagoda gate`},parameters:{viewport:{defaultViewport:`kura320`}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Quick search',
    placeholder: 'Search by name or code',
    type: 'search'
  }
}`,...m.parameters?.docs?.source},description:{story:`Native text input with an explicit accessible name when no visible label is required.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Patient name',
    placeholder: 'Sokha Chan'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Patient name');
    await userEvent.type(input, 'Sokha Chan');
    await expect(input).toHaveValue('Sokha Chan');
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Tendered (USD)',
    placeholder: '0.00',
    variant: 'surface'
  },
  decorators: [Story => <div style={{
    background: 'var(--color-surface-2)',
    borderRadius: 'var(--radius-card-surface)',
    padding: 'var(--space-inset-card)',
    width: 'min(320px, 90vw)'
  }}>
        <Story />
      </div>],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Tendered (USD)');
    await expect(input.closest('[data-slot="input-control"]')).toHaveAttribute('data-variant', 'surface');
  }
}`,...g.parameters?.docs?.source},description:{story:`The white surface variant keeps a field distinct inside a gray tray.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Booking code',
    helpText: 'Letters and numbers from the SMS, for example FZ-48210.',
    placeholder: 'FZ-48210'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Search patients',
    prefix: <SearchIcon size={16} />,
    placeholder: 'Name, phone, or code',
    type: 'search'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Weight',
    suffix: 'kg',
    inputMode: 'decimal',
    placeholder: '62.5'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Full name',
    required: true,
    placeholder: 'As shown on the ID document'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Work email',
    defaultValue: 'name@',
    error: 'Enter a complete email address.',
    type: 'email'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Work email');
    await expect(input).toHaveAccessibleDescription('Enter a complete email address.');
    await expect(input).toBeInvalid();
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Workspace',
    defaultValue: 'Mekong Clinic',
    disabled: true
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: 'HN-004821',
    helpText: 'The identifier is locked after patient verification.',
    label: 'Verified patient ID',
    readOnly: true
  },
  play: async ({
    canvasElement
  }) => {
    const input = within(canvasElement).getByLabelText('Verified patient ID');
    await expect(input).toHaveAttribute('readonly');
    await expect(input).not.toBeDisabled();
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <CharacterCounterInput />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Operational note');
    await userEvent.type(input, 'Call before arrival');
    await expect(input).toHaveAccessibleDescription('21 characters remaining.');
  }
}`,...w.parameters?.docs?.source},description:{story:`The counter composes native maxLength with existing Kura slots.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: 'var(--space-4)',
    width: 'min(320px, 90vw)'
  }}>
      <Input label="Work email" placeholder="name@clinic.example" type="email" />
      <Input label="Temporary password" placeholder="Enter password" type="password" />
      <Input label="Clinic website" placeholder="https://clinic.example" type="url" />
    </div>
}`,...T.parameters?.docs?.source},description:{story:`Native text-like types retain browser semantics without creating parallel primitives.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sizes'
  },
  render: () => <div style={{
    display: 'grid',
    gap: 'var(--space-4)',
    width: 'min(320px, 90vw)'
  }}>
      <Input label="Small" size="sm" placeholder="Dense table filter" />
      <Input label="Medium" size="md" placeholder="Default form field" />
      <Input label="Large" size="lg" placeholder="Touch-first station field" />
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Address line',
    defaultValue: 'Phum Prek Ho, Sangkat Prek Ho, Krong Ta Khmau, Kandal Province, near the old market opposite the pagoda gate'
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...D.parameters?.docs?.source}}},O=[`Basic`,`Default`,`SurfaceOnTray`,`WithHelpText`,`WithPrefixIcon`,`WithSuffixUnit`,`Required`,`Invalid`,`Disabled`,`ReadOnly`,`CharacterCounter`,`NativeTextTypes`,`Sizes`,`LongContent`]}))();export{m as Basic,w as CharacterCounter,h as Default,S as Disabled,x as Invalid,D as LongContent,T as NativeTextTypes,C as ReadOnly,b as Required,E as Sizes,g as SurfaceOnTray,_ as WithHelpText,v as WithPrefixIcon,y as WithSuffixUnit,O as __namedExportsOrder,p as default};