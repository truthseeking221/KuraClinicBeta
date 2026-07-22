import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{t as n}from"./ui-C9kmmzkH.js";import{t as r}from"./switch-CTGrhoKf.js";import{n as i,t as a}from"./intake-components.stories.module-pqbVgWyl.js";var o,s,c,l,u,d,f,p,m,h,g,_;e((()=>{o=t(),n(),a(),{expect:s,userEvent:c,within:l}=__STORYBOOK_MODULE_TEST__,u={title:`Design System/Primitives/Switch`,component:r,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`padded`,kura:{source:{vendor:`Kura`,registryItem:`switch`,visualReference:`Kura switch`},intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`The existing Base UI owner already provided boolean setting semantics, label association, description, sizes, disabled, and read-only states.`,exclusions:[`Destructive and decorative color variants are not valid switch semantics.`,`Card and table examples remain compositions.`]},binding:{colors:`kura-brand-neutral`,typography:`kura`,spacing:`kura`,radius:`kura`,motion:`kura-reduced-motion-safe`}}}},d={args:{children:`Send appointment reminders`,description:`Notify the patient when the appointment is confirmed.`},play:async({canvasElement:e})=>{let t=l(e).getByRole(`switch`,{name:`Send appointment reminders`});await c.click(t),await s(t).toBeChecked()}},f={args:{},render:()=>(0,o.jsxs)(`div`,{className:i.switchGroup,children:[(0,o.jsx)(r,{defaultChecked:!0,size:`sm`,children:`Compact queue setting`}),(0,o.jsx)(r,{defaultChecked:!0,size:`md`,children:`Standard form setting`})]})},p={args:{children:`Share results automatically`,description:`Unavailable until consent is recorded.`,disabled:!0}},m={args:{children:`Online booking enabled`,description:`Managed by the clinic administrator.`,defaultChecked:!0,readOnly:!0},play:async({canvasElement:e})=>{let t=l(e).getByRole(`switch`,{name:`Online booking enabled`});await c.click(t),await s(t).toBeChecked()}},h={args:{},render:()=>(0,o.jsxs)(`div`,{className:i.switchGroup,"aria-label":`Notification settings`,role:`group`,children:[(0,o.jsx)(r,{defaultChecked:!0,description:`Notify the assigned clinician about critical updates.`,children:`Critical result alerts`}),(0,o.jsx)(r,{description:`Send a summary after the visit is completed.`,children:`Visit summary`}),(0,o.jsx)(r,{defaultChecked:!0,description:`Notify reception when a booking changes.`,children:`Booking changes`})]})},g={args:{children:`Send a reminder when a rescheduled appointment is ready for patient confirmation`,description:`The patient receives one message with the updated clinic, time, and preparation instructions.`,defaultChecked:!0},parameters:{viewport:{defaultViewport:`mobile1`}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Send appointment reminders',
    description: 'Notify the patient when the appointment is confirmed.'
  },
  play: async ({
    canvasElement
  }) => {
    const control = within(canvasElement).getByRole('switch', {
      name: 'Send appointment reminders'
    });
    await userEvent.click(control);
    await expect(control).toBeChecked();
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {},
  render: () => <div className={styles.switchGroup}>
      <Switch defaultChecked size="sm">Compact queue setting</Switch>
      <Switch defaultChecked size="md">Standard form setting</Switch>
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Share results automatically',
    description: 'Unavailable until consent is recorded.',
    disabled: true
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Online booking enabled',
    description: 'Managed by the clinic administrator.',
    defaultChecked: true,
    readOnly: true
  },
  play: async ({
    canvasElement
  }) => {
    const control = within(canvasElement).getByRole('switch', {
      name: 'Online booking enabled'
    });
    await userEvent.click(control);
    await expect(control).toBeChecked();
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {},
  render: () => <div className={styles.switchGroup} aria-label="Notification settings" role="group">
      <Switch defaultChecked description="Notify the assigned clinician about critical updates.">Critical result alerts</Switch>
      <Switch description="Send a summary after the visit is completed.">Visit summary</Switch>
      <Switch defaultChecked description="Notify reception when a booking changes.">Booking changes</Switch>
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Send a reminder when a rescheduled appointment is ready for patient confirmation',
    description: 'The patient receives one message with the updated clinic, time, and preparation instructions.',
    defaultChecked: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...g.parameters?.docs?.source}}},_=[`Default`,`Sizes`,`Disabled`,`ReadOnly`,`SettingGroup`,`MobileLongContent`]}))();export{d as Default,p as Disabled,g as MobileLongContent,m as ReadOnly,h as SettingGroup,f as Sizes,_ as __namedExportsOrder,u as default};