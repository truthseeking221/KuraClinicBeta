import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{n as i,t as a}from"./phone-input-CidmOUk0.js";function o({defaultCountry:e=`KH`,size:t=`lg`}){let[n,r]=(0,c.useState)();return(0,s.jsx)(a,{defaultCountry:e,helpText:`Select a country or region first; the saved value is international.`,label:`Phone number`,onChange:r,placeholder:`Enter phone number`,size:t,value:n})}var s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S;t((()=>{s=r(),c=e(n()),i(),{expect:l,userEvent:u,within:d}=__STORYBOOK_MODULE_TEST__,f={title:`Design System/Components/Phone Input`,component:a,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,hierarchy:`Component`,evidence:`Input covers a labelled native field, while Auth owns a feature-local Select + Input composition. Neither owns country search, flags, E.164 normalisation, or the country-aware size and read-only contract. PhoneInput adds that distinct, reusable interaction and is documented in docs/intake/reui-phone-input-intake.md.`},source:{vendor:`ReUI`,registryItem:`@reui/phone-input — country picker and E.164 phone input`,sourceUrl:`https://reui.io/components/phone-input`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-popover`,icons:`kura-canonical with country flag data from react-phone-number-input`,density:`kura-root-attribute`,responsive:`fluid field with viewport-contained, scrollable country picker`},useCase:{role:`Any user entering an international telephone number`,primaryTask:`Select a country or region and enter a reachable phone number.`,primaryAction:`Provide a formatted E.164 value to the owning form.`,dataModel:`The owner supplies and stores E.164 values, default or permitted countries, labels, validation feedback, and any verification status. The component does not make a network request.`,safety:`This control does not prove reachability, consent, ownership, identity, or delivery. The workflow must validate and verify numbers before relying on them for consequential action.`},mobile:{primaryTask:`Choose a country and type a number without horizontal clipping or loss of context.`,minimumUsableWidth:`320px`,strategy:[`FLUID`,`SCROLLING`],behavior:`The field remains fluid, touch targets retain the Kura minimum on coarse pointers, and the country picker stays inside the visual viewport with contained vertical scrolling.`},exclusions:[`Phone reachability, OTP delivery, consent, identity matching, duplicate detection, and audit events are workflow-owned rather than a field primitive.`,`ReUI popupClassName and scrollAreaClassName escape hatches are replaced by canonical Kura popup sizing, focus, and scroll behavior.`,`A product-specific country default is not imposed; callers explicitly select it through defaultCountry.`]},docs:{description:{component:`A country-aware phone-number field with flag search and E.164 output. Use a plain Input when a workflow only accepts a local number with an already-known calling code.`}}},argTypes:{defaultCountry:{control:`text`},disabled:{control:`boolean`},readOnly:{control:`boolean`},size:{control:`inline-radio`,options:[`sm`,`md`,`lg`]}}},p={render:()=>(0,s.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,s.jsx)(o,{})}),play:async({canvasElement:e})=>{let t=d(e).getByRole(`combobox`,{name:/change country or region/i});await u.click(t);let n=d(e.ownerDocument.body),r=await n.findByRole(`combobox`,{name:`Search country or region`}),i=r.closest(`[data-slot='combobox-content']`),a=i?.querySelector(`[data-slot='combobox-list']`);await l(i).not.toBeNull(),await l(a).not.toBeNull(),await l(getComputedStyle(i).overflow).toBe(`hidden`),await l(getComputedStyle(a).overflowY).toBe(`auto`),await u.type(r,`Vietnam`),await u.click(n.getByRole(`option`,{name:/Vietnam.*\+84/i})),await l(t).toHaveAccessibleName(/currently Vietnam, \+84/i),await l(t).toHaveTextContent(`+84`)}},m={render:()=>(0,s.jsx)(`div`,{className:`w-full max-w-xs`,children:(0,s.jsx)(o,{size:`sm`})})},h={render:()=>(0,s.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,s.jsx)(o,{size:`lg`})})},g={args:{defaultCountry:`KH`,disabled:!0,helpText:`Phone details cannot be changed while the record is being updated.`,label:`Phone number`,value:`+85598111222`},render:e=>(0,s.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,s.jsx)(a,{...e})})},_={args:{defaultCountry:`US`,helpText:`This example starts from the E.164 value stored by the owning form.`,label:`Phone number`,value:`+14155552671`},render:e=>(0,s.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,s.jsx)(a,{...e})}),play:async({canvasElement:e})=>{let t=d(e);await l(t.getByLabelText(`Phone number`)).toHaveValue(`(415) 555-2671`)}},v={args:{defaultCountry:`KH`,error:`Enter a complete phone number before continuing.`,label:`Phone number`,value:`+85512`},render:e=>(0,s.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,s.jsx)(a,{...e})}),play:async({canvasElement:e})=>{let t=d(e).getByLabelText(`Phone number`);await l(t).toHaveAttribute(`aria-invalid`,`true`),await l(t).toHaveAccessibleDescription(`Enter a complete phone number before continuing.`)}},y={args:{countries:[`KH`,`VN`,`TH`],defaultCountry:`VN`,helpText:`Only the countries permitted by this form are available.`,label:`Phone number`,placeholder:`Enter phone number`},render:e=>(0,s.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,s.jsx)(a,{...e})})},b={args:{defaultCountry:`GB`,helpText:`The value can be reviewed but not changed in this state.`,label:`Phone number`,readOnly:!0,value:`+447700900123`},render:e=>(0,s.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,s.jsx)(a,{...e})}),play:async({canvasElement:e})=>{let t=d(e);await l(t.getByLabelText(`Phone number`)).toHaveAttribute(`readonly`),await l(t.getByRole(`combobox`,{name:/change country or region/i})).toBeDisabled()}},x={parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,s.jsx)(`div`,{className:`w-full`,children:(0,s.jsx)(a,{countries:[`KH`,`VN`,`TH`,`US`,`GB`],defaultCountry:`KH`,helpText:`Choose the country or region associated with this number. The form will store the number in a consistent international format.`,label:`Contact number for a person receiving appointment updates`,placeholder:`Enter phone number`})})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-sm">
      <ControlledPhoneInput />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox', {
      name: /change country or region/i
    });
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    const search = await body.findByRole('combobox', {
      name: 'Search country or region'
    });
    const popup = search.closest<HTMLElement>("[data-slot='combobox-content']");
    const list = popup?.querySelector<HTMLElement>("[data-slot='combobox-list']");
    await expect(popup).not.toBeNull();
    await expect(list).not.toBeNull();
    await expect(getComputedStyle(popup!).overflow).toBe('hidden');
    await expect(getComputedStyle(list!).overflowY).toBe('auto');
    await userEvent.type(search, 'Vietnam');
    await userEvent.click(body.getByRole('option', {
      name: /Vietnam.*\\+84/i
    }));
    await expect(trigger).toHaveAccessibleName(/currently Vietnam, \\+84/i);
    await expect(trigger).toHaveTextContent('+84');
  }
}`,...p.parameters?.docs?.source},description:{story:`Empty, controlled international entry with country search.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-xs">
      <ControlledPhoneInput size="sm" />
    </div>
}`,...m.parameters?.docs?.source},description:{story:`Dense, table-adjacent field treatment.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-sm">
      <ControlledPhoneInput size="lg" />
    </div>
}`,...h.parameters?.docs?.source},description:{story:`Comfortable field treatment for a focused form.`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    defaultCountry: 'KH',
    disabled: true,
    helpText: 'Phone details cannot be changed while the record is being updated.',
    label: 'Phone number',
    value: '+85598111222'
  },
  render: args => <div className="w-full max-w-sm">
      <PhoneInput {...args} />
    </div>
}`,...g.parameters?.docs?.source},description:{story:`Keeps the displayed number while interaction is unavailable.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    defaultCountry: 'US',
    helpText: 'This example starts from the E.164 value stored by the owning form.',
    label: 'Phone number',
    value: '+14155552671'
  },
  render: args => <div className="w-full max-w-sm">
      <PhoneInput {...args} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Phone number')).toHaveValue('(415) 555-2671');
  }
}`,..._.parameters?.docs?.source},description:{story:`Displays an existing stored E.164 value in its country-aware format.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    defaultCountry: 'KH',
    error: 'Enter a complete phone number before continuing.',
    label: 'Phone number',
    value: '+85512'
  },
  render: args => <div className="w-full max-w-sm">
      <PhoneInput {...args} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Phone number');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAccessibleDescription('Enter a complete phone number before continuing.');
  }
}`,...v.parameters?.docs?.source},description:{story:`Error feedback is supplied by the owning validation rule.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    countries: ['KH', 'VN', 'TH'],
    defaultCountry: 'VN',
    helpText: 'Only the countries permitted by this form are available.',
    label: 'Phone number',
    placeholder: 'Enter phone number'
  },
  render: args => <div className="w-full max-w-sm">
      <PhoneInput {...args} />
    </div>
}`,...y.parameters?.docs?.source},description:{story:`The default country is an explicit, caller-owned local policy.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    defaultCountry: 'GB',
    helpText: 'The value can be reviewed but not changed in this state.',
    label: 'Phone number',
    readOnly: true,
    value: '+447700900123'
  },
  render: args => <div className="w-full max-w-sm">
      <PhoneInput {...args} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Phone number')).toHaveAttribute('readonly');
    await expect(canvas.getByRole('combobox', {
      name: /change country or region/i
    })).toBeDisabled();
  }
}`,...b.parameters?.docs?.source},description:{story:`Read-only locks both number editing and country changes.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <div className="w-full">
      <PhoneInput countries={['KH', 'VN', 'TH', 'US', 'GB']} defaultCountry="KH" helpText="Choose the country or region associated with this number. The form will store the number in a consistent international format." label="Contact number for a person receiving appointment updates" placeholder="Enter phone number" />
    </div>
}`,...x.parameters?.docs?.source},description:{story:`Narrow viewport and long copy keep the picker usable without a decorative outer card.`,...x.parameters?.docs?.description}}},S=[`Default`,`Small`,`Large`,`Disabled`,`PresetValue`,`Error`,`SpecificDefaultCountry`,`ReadOnly`,`LongContentMobile`]}))();export{p as Default,g as Disabled,v as Error,h as Large,x as LongContentMobile,_ as PresetValue,b as ReadOnly,m as Small,y as SpecificDefaultCountry,S as __namedExportsOrder,f as default};