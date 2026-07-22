import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{It as n,t as r}from"./ui-C9kmmzkH.js";var i,a,o,s,c,l,u,d,f,p;e((()=>{i=t(),r(),{expect:a,within:o}=__STORYBOOK_MODULE_TEST__,s={title:`Design System/Components/Progress`,component:n,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{source:{vendor:`ReUI`,registryItem:`progress`,familySize:6},intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`Upload used a native progress element locally, but Kura had no reusable determinate or indeterminate progress owner with label and value semantics.`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura-pill`,motion:`kura-progress-and-reduced-motion`,responsive:`fluid`},exclusions:[{capability:`Circular progress`,reason:`A circular indicator has different geometry and space semantics; the requested ReUI family is linear.`}]}},decorators:[e=>(0,i.jsx)(`div`,{style:{width:320},children:(0,i.jsx)(e,{})})]},c={args:{label:`Uploading referral documents`,showValue:!0,value:64},play:async({canvasElement:e})=>{await a(o(e).getByRole(`progressbar`)).toHaveAttribute(`aria-valuenow`,`64`)}},l={args:{label:`Profile complete`,showValue:!0,size:`sm`,value:82}},u={args:{label:`Import complete`,showValue:!0,value:100}},d={args:{"aria-label":`Checking eligibility`,value:null}},f={args:{label:`Uploading`,showValue:!0,value:38},parameters:{viewport:{defaultViewport:`kura320`}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Uploading referral documents',
    showValue: true,
    value: 64
  },
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).getByRole('progressbar')).toHaveAttribute('aria-valuenow', '64');
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Profile complete',
    showValue: true,
    size: 'sm',
    value: 82
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Import complete',
    showValue: true,
    value: 100
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Checking eligibility',
    value: null
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Uploading',
    showValue: true,
    value: 38
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...f.parameters?.docs?.source}}},p=[`Default`,`Compact`,`Complete`,`Indeterminate`,`Mobile`]}))();export{l as Compact,u as Complete,c as Default,d as Indeterminate,f as Mobile,p as __namedExportsOrder,s as default};