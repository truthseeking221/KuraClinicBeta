import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{n as i,t as a}from"./button-B6_zsN5-.js";import{n as o,t as s}from"./number-field-MNFdxE_0.js";function c(){let[e,t]=(0,d.useState)(4);return(0,u.jsxs)(`div`,{style:{display:`grid`,gap:`var(--space-2)`,minWidth:`280px`},children:[(0,u.jsx)(s,{label:`Queue capacity`,max:20,min:0,onValueChange:e=>t(e),value:e}),(0,u.jsxs)(`output`,{"aria-live":`polite`,children:[`Current capacity: `,e??`Empty`]})]})}function l(){let[e,t]=(0,d.useState)(!1);return(0,u.jsxs)(`form`,{"aria-label":`Specimen intake`,onSubmit:e=>{e.preventDefault(),t(!0)},style:{display:`grid`,gap:`var(--space-3)`,minWidth:`280px`},children:[(0,u.jsx)(s,{defaultValue:2,label:`Received specimens`,max:100,min:0,name:`specimen-count`}),(0,u.jsx)(a,{type:`submit`,children:`Save count`}),e?(0,u.jsx)(`output`,{children:`Count saved`}):null]})}var u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;t((()=>{u=r(),d=e(n()),i(),o(),{expect:f,userEvent:p,within:m}=__STORYBOOK_MODULE_TEST__,h={title:`Design System/Primitives/Number Field`,component:s,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{source:{vendor:`ReUI`,registryItem:`@reui/c-number-field-1 through @reui/c-number-field-6`,sourceUrl:`https://reui.io/components/number-field`,api:`Base UI NumberField`},intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`The fresh Storybook and source search found NumberField as the canonical Kura numeric-entry primitive. ReUI’s six-example family shares the same Base UI behavior; Kura extends the existing owner with a size contract and complete state stories instead of creating a duplicate.`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura-field`,elevation:`kura-control-and-focus`,icons:`kura-canonical`,motion:`kura-border-focus-transition`,density:`kura-root-attribute`,responsive:`fluid-min-width-0`},exclusions:[`ReUI’s right-side control and browser-spinner examples are styling-only placements; Kura keeps the split decrement/input/increment anatomy for predictable clinical scanning.`,`Scrub-area dragging is outside the default Kura contract because accidental numeric mutation is unsafe under clinical workload. Wheel scrubbing remains an explicit Base UI opt-in through allowWheelScrub.`]},docs:{description:{component:`Accessible numeric entry with explicit decrement and increment controls, keyboard stepping, min/max/step constraints, locale-aware formatting, labels, supporting text, and validation states.`}}},argTypes:{size:{control:`radio`,options:[`sm`,`md`,`lg`]},disabled:{control:`boolean`},readOnly:{control:`boolean`},required:{control:`boolean`}},args:{label:`Collection tubes`,defaultValue:2,min:1,max:10}},g={play:async({canvasElement:e})=>{let t=m(e),n=t.getByLabelText(`Collection tubes`);await p.click(t.getByRole(`button`,{name:`Increase value`})),await f(n).toHaveValue(`3`)}},_={args:{label:`Small quantity`,defaultValue:5,min:0,max:100,size:`sm`}},v={args:{label:`Large quantity`,defaultValue:5,min:0,max:100,size:`lg`}},y={args:{label:`Dose volume (mL)`,defaultValue:2.5,min:0,step:.5,format:{maximumFractionDigits:1},description:`Enter the verified volume from the order.`}},b={args:{label:`Specimen count`,defaultValue:2,min:0,max:5},play:async({canvasElement:e})=>{let t=m(e).getByRole(`textbox`,{name:`Specimen count`});await p.click(t),await p.keyboard(`{ArrowUp}`),await f(t).toHaveValue(`3`)}},x={args:{label:`Allowed attempts`,defaultValue:3,min:0,max:3},play:async({canvasElement:e})=>{let t=m(e);await f(t.getByRole(`button`,{name:`Increase value`})).toHaveAttribute(`aria-disabled`,`true`)}},S={args:{label:`Received specimens`,defaultValue:void 0,min:0,description:`Enter the count recorded at accessioning.`}},C={args:{label:`Specimen count`,defaultValue:void 0,required:!0,error:`Enter the number of received specimens.`},play:async({canvasElement:e})=>{let t=m(e).getByRole(`textbox`,{name:`Specimen count`});await f(t).toHaveAccessibleDescription(`Enter the number of received specimens.`),await f(t).toHaveAttribute(`aria-invalid`,`true`)}},w={args:{label:`Ordered tubes`,defaultValue:3,readOnly:!0,description:`Set by the released order.`}},T={args:{label:`Aliquots`,defaultValue:1,disabled:!0,description:`Unavailable after accessioning is complete.`}},E={render:()=>(0,u.jsx)(c,{}),play:async({canvasElement:e})=>{let t=m(e);await p.click(t.getByRole(`button`,{name:`Increase value`})),await f(t.getByText(`Current capacity: 5`)).toBeVisible()}},D={render:()=>(0,u.jsx)(l,{}),play:async({canvasElement:e})=>{let t=m(e);await f(t.getByLabelText(`Received specimens`)).toHaveValue(`2`),await p.click(t.getByRole(`button`,{name:`Save count`})),await f(t.getByText(`Count saved`)).toBeVisible()}},O={args:{label:`Number of specimens received from the external collection partner`,defaultValue:12,min:0,max:100,description:`Reconcile this count with the sealed manifest before confirming accession.`}},k={args:{label:`Attempts`,defaultValue:1,min:0,max:5},parameters:{viewport:{defaultViewport:`kura320`}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Collection tubes');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Increase value'
    }));
    await expect(input).toHaveValue('3');
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Small quantity',
    defaultValue: 5,
    min: 0,
    max: 100,
    size: 'sm'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Large quantity',
    defaultValue: 5,
    min: 0,
    max: 100,
    size: 'lg'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Dose volume (mL)',
    defaultValue: 2.5,
    min: 0,
    step: 0.5,
    format: {
      maximumFractionDigits: 1
    },
    description: 'Enter the verified volume from the order.'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Specimen count',
    defaultValue: 2,
    min: 0,
    max: 5
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', {
      name: 'Specimen count'
    });
    await userEvent.click(input);
    await userEvent.keyboard('{ArrowUp}');
    await expect(input).toHaveValue('3');
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Allowed attempts',
    defaultValue: 3,
    min: 0,
    max: 3
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Increase value'
    })).toHaveAttribute('aria-disabled', 'true');
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Received specimens',
    defaultValue: undefined,
    min: 0,
    description: 'Enter the count recorded at accessioning.'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Specimen count',
    defaultValue: undefined,
    required: true,
    error: 'Enter the number of received specimens.'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', {
      name: 'Specimen count'
    });
    await expect(input).toHaveAccessibleDescription('Enter the number of received specimens.');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Ordered tubes',
    defaultValue: 3,
    readOnly: true,
    description: 'Set by the released order.'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Aliquots',
    defaultValue: 1,
    disabled: true,
    description: 'Unavailable after accessioning is complete.'
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <ControlledNumberField />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Increase value'
    }));
    await expect(canvas.getByText('Current capacity: 5')).toBeVisible();
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <FormExample />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Received specimens')).toHaveValue('2');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Save count'
    }));
    await expect(canvas.getByText('Count saved')).toBeVisible();
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Number of specimens received from the external collection partner',
    defaultValue: 12,
    min: 0,
    max: 100,
    description: 'Reconcile this count with the sealed manifest before confirming accession.'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Attempts',
    defaultValue: 1,
    min: 0,
    max: 5
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...k.parameters?.docs?.source}}},A=[`Default`,`Small`,`Large`,`DecimalStep`,`KeyboardStepping`,`AtMaximum`,`Empty`,`RequiredError`,`ReadOnly`,`Disabled`,`Controlled`,`InForm`,`LongContent`,`Mobile`]}))();export{x as AtMaximum,E as Controlled,y as DecimalStep,g as Default,T as Disabled,S as Empty,D as InForm,b as KeyboardStepping,v as Large,O as LongContent,k as Mobile,w as ReadOnly,C as RequiredError,_ as Small,A as __namedExportsOrder,h as default};