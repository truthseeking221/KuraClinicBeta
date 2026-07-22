import{i as e}from"./preload-helper-MclHqJXp.js";import{n as t,t as n}from"./date-range-picker-CVkMECHY.js";var r,i,a,o,s,c,l,u;e((()=>{t(),{expect:r,userEvent:i,within:a}=__STORYBOOK_MODULE_TEST__,o={title:`Design System/Components/Date Range Picker`,component:n,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`centered`,kura:{source:{vendor:`Kura`,registryItem:`date-range-picker`,visualReference:`Kura date-range-picker`},intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`Kura supplies a committed dual-month range task distinct from the inline DateSelector form owner.`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,icons:`kura-canonical`,responsive:`stacked below 768px`}}}},s={play:async({canvasElement:e})=>{let t=a(e).getByRole(`button`,{name:`Date range`});await i.click(t),await r(a(e.ownerDocument.body).getByRole(`dialog`,{name:`Date range`})).toBeVisible()}},c={args:{defaultValue:{from:new Date(2026,6,14),to:new Date(2026,6,20)}}},l={parameters:{viewport:{defaultViewport:`kura320`}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const trigger = within(canvasElement).getByRole('button', {
      name: 'Date range'
    });
    await userEvent.click(trigger);
    await expect(within(canvasElement.ownerDocument.body).getByRole('dialog', {
      name: 'Date range'
    })).toBeVisible();
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: {
      from: new Date(2026, 6, 14),
      to: new Date(2026, 6, 20)
    }
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...l.parameters?.docs?.source}}},u=[`Default`,`Selected`,`Mobile`]}))();export{s as Default,l as Mobile,c as Selected,u as __namedExportsOrder,o as default};