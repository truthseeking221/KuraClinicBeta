import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{Yn as i,t as a}from"./ui-C9kmmzkH.js";function o(){let[e,t]=(0,c.useState)(``);return(0,s.jsx)(i,{label:`Date of birth`,onValueChange:t,required:!0,value:e})}var s,c,l,u,d,f,p,m,h,g,_,v,y;t((()=>{s=r(),c=e(n()),a(),{expect:l,userEvent:u,within:d}=__STORYBOOK_MODULE_TEST__,f={title:`Design System/Components/Date Input`,component:i,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`Kura needs a compact ISO date text field that formats continuous digit entry without adding a calendar surface. DateSelector remains the owner for calendar-backed date and range selection.`},source:{vendor:`Kura`,registryItem:`date-input`,visualReference:`Kura Input`},binding:{colors:`delegated-to-kura-input`,typography:`delegated-to-kura-input`,spacing:`delegated-to-kura-input`,radius:`delegated-to-kura-input`,elevation:`delegated-to-kura-input`,icons:`delegated-to-kura-input`,responsive:`fluid input with numeric keyboard and 44px touch control`},exclusions:[`Calendar selection, date ranges, period operators, and availability rules remain DateSelector or feature-owned concerns.`,`DateInput normalizes entry shape; it does not decide whether a completed date is clinically or operationally valid.`]},docs:{description:{component:`Compact date text input that inserts ISO separators while preserving the user’s digit order, cursor, paste, and keyboard editing.`}}}},p={args:{label:`Date of birth`,required:!0}},m={render:()=>(0,s.jsx)(o,{}),play:async({canvasElement:e})=>{let t=d(e).getByLabelText(`Date of birth`);await u.type(t,`19900505`),await l(t).toHaveValue(`1990-05-05`)}},h={render:()=>(0,s.jsx)(o,{}),play:async({canvasElement:e})=>{let t=d(e).getByLabelText(`Date of birth`);await u.click(t),await u.paste(`19900505`),await l(t).toHaveValue(`1990-05-05`),await u.keyboard(`{Backspace}`),await l(t).toHaveValue(`1990-05-0`)}},g={args:{defaultValue:`1990-13-40`,error:`Enter a valid date of birth.`,label:`Date of birth`,required:!0}},_={args:{defaultValue:`1990-05-05`,disabled:!0,label:`Date of birth`}},v={parameters:{viewport:{defaultViewport:`mobile1`}},args:{label:`Date of birth`,placeholder:`YYYY-MM-DD`,required:!0}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Date of birth',
    required: true
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <ControlledDateInput />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Date of birth');
    await userEvent.type(input, '19900505');
    await expect(input).toHaveValue('1990-05-05');
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <ControlledDateInput />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Date of birth');
    await userEvent.click(input);
    await userEvent.paste('19900505');
    await expect(input).toHaveValue('1990-05-05');
    await userEvent.keyboard('{Backspace}');
    await expect(input).toHaveValue('1990-05-0');
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: '1990-13-40',
    error: 'Enter a valid date of birth.',
    label: 'Date of birth',
    required: true
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: '1990-05-05',
    disabled: true,
    label: 'Date of birth'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  args: {
    label: 'Date of birth',
    placeholder: 'YYYY-MM-DD',
    required: true
  }
}`,...v.parameters?.docs?.source}}},y=[`Default`,`TypingSeparators`,`PasteAndBackspace`,`Error`,`Disabled`,`Mobile`]}))();export{p as Default,_ as Disabled,g as Error,v as Mobile,h as PasteAndBackspace,m as TypingSeparators,y as __namedExportsOrder,f as default};