import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{n,t as r}from"./close-button-DdqBitN8.js";import{n as i,t as a}from"./kura-stories.module-CTGxWmHL.js";var o,s,c,l,u,d;e((()=>{o=t(),n(),a(),{expect:s,within:c}=__STORYBOOK_MODULE_TEST__,l={title:`Design System/Primitives/Close Button`,component:r,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`centered`,kura:{source:{vendor:`Kura`,registryItem:`close-button`,visualReference:`Kura close-button`},intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`CloseButton standardizes dismiss geometry while retaining a larger invisible hit target.`},binding:{colors:`kura-semantic`,spacing:`kura`,radius:`kura`,icons:`kura-canonical`}}}},u={args:{"aria-label":`Close`},render:()=>(0,o.jsx)(`div`,{className:i.row,children:[`2xs`,`xs`,`sm`,`md`].map(e=>(0,o.jsx)(r,{"aria-label":`Close ${e}`,size:e},e))}),play:async({canvasElement:e})=>{await s(c(e).getByRole(`button`,{name:`Close md`})).toBeVisible()}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Close'
  },
  render: () => <div className={styles.row}>
      {(['2xs', 'xs', 'sm', 'md'] as const).map(size => <CloseButton aria-label={\`Close \${size}\`} key={size} size={size} />)}
    </div>,
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).getByRole('button', {
      name: 'Close md'
    })).toBeVisible();
  }
}`,...u.parameters?.docs?.source}}},d=[`Sizes`]}))();export{u as Sizes,d as __namedExportsOrder,l as default};