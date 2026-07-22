import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{qn as n,t as r}from"./ui-C9kmmzkH.js";var i,a,o,s,c,l,u,d,f,p,m;e((()=>{i=t(),r(),{expect:a,userEvent:o,within:s}=__STORYBOOK_MODULE_TEST__,c={title:`Design System/Patterns/CopyButton`,component:n,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`ReUI shows copy feedback as an example, but the fresh Kura index had no canonical copy action. The stateful capability is promoted as a small reusable pattern composed from Button and canonical icons.`},source:{vendor:`ReUI`,registryItem:`components/ui/button.tsx — copy button feedback example`,sourceUrl:`https://reui.io/components/button`},binding:{colors:`delegated-to-kura-button`,typography:`delegated-to-kura-button`,spacing:`delegated-to-kura-button`,radius:`delegated-to-kura-button`,elevation:`kura-focus-only`,icons:`kura-canonical`,density:`delegated-to-kura-button`,responsive:`wraps-long-feedback-label`},exclusions:[{capability:`Generic async action success animation`,reason:`Async completion changes meaning and recovery per workflow; a generic animation would hide consequences.`,replacement:`Use Button loading with an owning workflow state, or create a domain-specific pattern with its own contract.`}]}}},l={args:{value:`visit-2048`}},u={args:{value:`https://kura.example/visits/visit-2048`,children:`Copy visit link`,successLabel:`Link copied`,errorLabel:`Unable to copy link`,variant:`outline`}},d={args:{value:`   `},play:async({canvasElement:e})=>{let t=s(e);await o.click(t.getByRole(`button`,{name:`Copy`})),await a(t.getByRole(`button`,{name:`Copy failed`})).toBeVisible()}},f={args:{value:`sample-identifier-2048`},play:async({canvasElement:e})=>{let t=s(e),n=navigator.clipboard;Object.defineProperty(navigator,"clipboard",{configurable:!0,value:{writeText:async()=>void 0}}),await o.click(t.getByRole(`button`,{name:`Copy`})),await a(t.getByRole(`button`,{name:`Copied`})).toBeVisible(),Object.defineProperty(navigator,"clipboard",{configurable:!0,value:n})}},p={args:{value:`sample-identifier-2048`},render:()=>(0,i.jsx)(`div`,{className:`w-full max-w-xs`,children:(0,i.jsx)(n,{value:`sample-identifier-2048`,successLabel:`The sample identifier has been copied`,className:`w-full`})})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'visit-2048'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'https://kura.example/visits/visit-2048',
    children: 'Copy visit link',
    successLabel: 'Link copied',
    errorLabel: 'Unable to copy link',
    variant: 'outline'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    value: '   '
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Copy'
    }));
    await expect(canvas.getByRole('button', {
      name: 'Copy failed'
    })).toBeVisible();
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'sample-identifier-2048'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const originalClipboard = navigator.clipboard;
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async () => undefined
      }
    });
    await userEvent.click(canvas.getByRole('button', {
      name: 'Copy'
    }));
    await expect(canvas.getByRole('button', {
      name: 'Copied'
    })).toBeVisible();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: originalClipboard
    });
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'sample-identifier-2048'
  },
  render: () => <div className="w-full max-w-xs">
      <CopyButton value="sample-identifier-2048" successLabel="The sample identifier has been copied" className="w-full" />
    </div>
}`,...p.parameters?.docs?.source}}},m=[`Default`,`CustomLabels`,`EmptyValue`,`InteractiveSuccess`,`MobileLongFeedback`]}))();export{u as CustomLabels,l as Default,d as EmptyValue,f as InteractiveSuccess,p as MobileLongFeedback,m as __namedExportsOrder,c as default};