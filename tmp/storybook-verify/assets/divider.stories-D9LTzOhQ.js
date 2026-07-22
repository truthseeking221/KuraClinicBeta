import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{n,t as r}from"./divider-BWIB-4-9.js";var i,a,o,s,c,l,u;e((()=>{i=t(),n(),{expect:a,within:o}=__STORYBOOK_MODULE_TEST__,s={title:`Design System/Primitives/Divider`,component:r,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`padded`,kura:{source:{vendor:`Kura`,registryItem:`divider`,visualReference:`Kura divider`},intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`Kura adds labelled single, double, and filled treatments beyond the orientation-only Separator owner.`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,icons:`none`}}}},c={render:()=>(0,i.jsxs)(`div`,{style:{display:`grid`,gap:`24px`,width:`min(560px, 100%)`},children:[(0,i.jsx)(r,{children:`Recent activity`}),(0,i.jsx)(r,{variant:`double`,children:`Access history`}),(0,i.jsx)(r,{variant:`fill`,children:`Archived records`})]})},l={render:()=>(0,i.jsx)(r,{"aria-label":`Section boundary`}),play:async({canvasElement:e})=>{await a(o(e).getByRole(`separator`)).toBeVisible()}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: '24px',
    width: 'min(560px, 100%)'
  }}>
      <Divider>Recent activity</Divider>
      <Divider variant="double">Access history</Divider>
      <Divider variant="fill">Archived records</Divider>
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Divider aria-label="Section boundary" />,
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).getByRole('separator')).toBeVisible();
  }
}`,...l.parameters?.docs?.source}}},u=[`Variants`,`Empty`]}))();export{l as Empty,c as Variants,u as __namedExportsOrder,s as default};