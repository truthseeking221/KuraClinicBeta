import{i as e}from"./preload-helper-MclHqJXp.js";import{t}from"./ui-C9kmmzkH.js";import{t as n}from"./select-WVTSimR_.js";var r,i,a,o,s,c,l,u,d,f,p,m;e((()=>{t(),{expect:r,userEvent:i,within:a}=__STORYBOOK_MODULE_TEST__,o={title:`Design System/Primitives/Select`,component:n,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`REUSE`,owner:`src/components/ui`,evidence:`Base UI supplies listbox behavior while Kura owns the field contract and adopts Kura trigger, panel, row, and motion finish.`},source:{vendor:`Kura`,registryItem:`select`,visualReference:`Kura select`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-focus-only`,icons:`kura-hugeicons-canonical`,motion:`kura-border-focus-transition`,density:`kura-root-attribute`,responsive:`viewport-contained custom popup with scrollable options`}},docs:{description:{component:`Single-select with Kura field anatomy and a Kura-finished popup. Keyboard navigation, focus restoration, collision-safe positioning, and form submission remain owned by Base UI.`}}}},s=[{value:`Antecubital fossa`,label:`Antecubital fossa`},{value:`Forearm`,label:`Forearm`},{value:`Dorsal hand`,label:`Dorsal hand`},{value:`Other`,label:`Other`}],c={args:{label:`Draw site`,options:s,defaultValue:`Antecubital fossa`},play:async({canvasElement:e})=>{let t=a(e).getByRole(`combobox`,{name:`Draw site`});await i.click(t);let n=await a(e.ownerDocument.body).findByRole(`option`,{name:`Forearm`});await r(n).toBeVisible(),await i.click(n),await r(t).toHaveTextContent(`Forearm`)}},l={args:{label:`Defer reason`,placeholder:`Choose a reason`,defaultValue:``,options:[{value:`Patient refused`,label:`Patient refused`},{value:`Difficult vein`,label:`Difficult vein`},{value:`Insufficient volume`,label:`Insufficient volume`}]}},u={args:{label:`Insurance provider`,options:[{value:`forte`,label:`Forte`}],defaultValue:``,placeholder:`Choose a provider`,error:`Choose the provider shown on the member card.`}},d={args:{label:`Station`,options:[{value:`PSC-01`,label:`PSC-01 · Main station`}],defaultValue:`PSC-01`,disabled:!0,helpText:`Assigned by the shift lead.`}},f={args:{label:`Collection location`,options:[{value:`community-outreach`,label:`Community outreach collection station — Riverside District mobile clinic`}],defaultValue:`community-outreach`}},p={args:{label:`Draw site`,options:s,defaultValue:`Forearm`},parameters:{viewport:{defaultViewport:`kura320`}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Draw site',
    options: SITES,
    defaultValue: 'Antecubital fossa'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox', {
      name: 'Draw site'
    });
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    const option = await body.findByRole('option', {
      name: 'Forearm'
    });
    await expect(option).toBeVisible();
    await userEvent.click(option);
    await expect(trigger).toHaveTextContent('Forearm');
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Defer reason',
    placeholder: 'Choose a reason',
    defaultValue: '',
    options: [{
      value: 'Patient refused',
      label: 'Patient refused'
    }, {
      value: 'Difficult vein',
      label: 'Difficult vein'
    }, {
      value: 'Insufficient volume',
      label: 'Insufficient volume'
    }]
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Insurance provider',
    options: [{
      value: 'forte',
      label: 'Forte'
    }],
    defaultValue: '',
    placeholder: 'Choose a provider',
    error: 'Choose the provider shown on the member card.'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Station',
    options: [{
      value: 'PSC-01',
      label: 'PSC-01 · Main station'
    }],
    defaultValue: 'PSC-01',
    disabled: true,
    helpText: 'Assigned by the shift lead.'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Collection location',
    options: [{
      value: 'community-outreach',
      label: 'Community outreach collection station — Riverside District mobile clinic'
    }],
    defaultValue: 'community-outreach'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Draw site',
    options: SITES,
    defaultValue: 'Forearm'
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...p.parameters?.docs?.source}}},m=[`Default`,`WithPlaceholder`,`Invalid`,`Disabled`,`LongContent`,`Mobile`]}))();export{c as Default,d as Disabled,u as Invalid,f as LongContent,p as Mobile,l as WithPlaceholder,m as __namedExportsOrder,o as default};