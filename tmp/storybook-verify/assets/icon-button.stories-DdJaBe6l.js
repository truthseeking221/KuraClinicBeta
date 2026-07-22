import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{i as n,k as r}from"./provider-marks-BeHzyBjc.js";import{t as i}from"./ui-C9kmmzkH.js";import{d as a}from"./date-range-picker-CVkMECHY.js";var o,s,c,l,u,d,f,p,m,h,g;e((()=>{o=t(),i(),{expect:s,userEvent:c,within:l}=__STORYBOOK_MODULE_TEST__,u={title:`Design System/Primitives/IconButton`,component:a,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`The accessible Kura icon-only action owner adopts Kura size, surface, border, and shadow geometry.`},source:{vendor:`Kura`,registryItem:`icon-button`,visualReference:`Kura icon-button`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-focus-only`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`44px-touch-target-at-all-widths`},exclusions:[{capability:`Tooltip-only naming`,reason:`A tooltip can supplement an icon but cannot replace the required accessible name.`,replacement:`Pass aria-label and compose the canonical Tooltip when the action is unfamiliar.`}]}},argTypes:{variant:{control:`radio`,options:[`default`,`primary`,`tertiary`]},tone:{control:`radio`,options:[`default`,`critical`,`success`]},size:{control:`radio`,options:[`micro`,`default`,`large`]},loading:{control:`boolean`}}},d={args:{"aria-label":`Add diagnosis`,children:(0,o.jsx)(n,{"aria-hidden":`true`})},play:async({canvasElement:e})=>{let t=l(e).getByRole(`button`,{name:`Add diagnosis`});await c.tab(),await s(t).toHaveFocus()}},f={args:{"aria-label":`Action variants`,children:(0,o.jsx)(n,{"aria-hidden":`true`})},render:()=>(0,o.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[(0,o.jsx)(a,{"aria-label":`Add diagnosis`,children:(0,o.jsx)(n,{"aria-hidden":`true`})}),(0,o.jsx)(a,{"aria-label":`Confirm result`,variant:`primary`,tone:`success`,children:(0,o.jsx)(n,{"aria-hidden":`true`})}),(0,o.jsx)(a,{"aria-label":`Remove draft`,variant:`tertiary`,tone:`critical`,children:(0,o.jsx)(r,{"aria-hidden":`true`})}),(0,o.jsx)(a,{"aria-label":`Remove draft`,tone:`critical`,children:(0,o.jsx)(r,{"aria-hidden":`true`})})]})},p={args:{"aria-label":`Action sizes`,children:(0,o.jsx)(n,{"aria-hidden":`true`})},render:()=>(0,o.jsx)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[`micro`,`default`,`large`].map(e=>(0,o.jsx)(a,{"aria-label":`Add diagnosis (${e})`,size:e,children:(0,o.jsx)(n,{"aria-hidden":`true`})},e))})},m={args:{"aria-label":`Loading action`,children:(0,o.jsx)(n,{"aria-hidden":`true`})},render:()=>(0,o.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[(0,o.jsx)(a,{"aria-label":`Saving draft`,loading:!0,children:(0,o.jsx)(n,{"aria-hidden":`true`})}),(0,o.jsx)(a,{"aria-label":`Unavailable action`,disabled:!0,children:(0,o.jsx)(n,{"aria-hidden":`true`})})]})},h={args:{"aria-label":`Density action`,children:(0,o.jsx)(n,{"aria-hidden":`true`})},render:()=>(0,o.jsx)(`div`,{className:`flex flex-wrap items-start gap-6`,children:[`compact`,`cozy`,`comfortable`].map(e=>(0,o.jsxs)(`div`,{"data-density":e,className:`flex flex-col items-center gap-2`,children:[(0,o.jsx)(a,{"aria-label":`Add diagnosis (${e})`,children:(0,o.jsx)(n,{"aria-hidden":`true`})}),(0,o.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:e})]},e))})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Add diagnosis',
    children: <PlusIcon aria-hidden="true" />
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: 'Add diagnosis'
    });
    await userEvent.tab();
    await expect(button).toHaveFocus();
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Action variants',
    children: <PlusIcon aria-hidden="true" />
  },
  render: () => <div className="flex flex-wrap items-center gap-3">
      <IconButton aria-label="Add diagnosis">
        <PlusIcon aria-hidden="true" />
      </IconButton>
      <IconButton aria-label="Confirm result" variant="primary" tone="success">
        <PlusIcon aria-hidden="true" />
      </IconButton>
      <IconButton aria-label="Remove draft" variant="tertiary" tone="critical">
        <XIcon aria-hidden="true" />
      </IconButton>
      <IconButton aria-label="Remove draft" tone="critical">
        <XIcon aria-hidden="true" />
      </IconButton>
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Action sizes',
    children: <PlusIcon aria-hidden="true" />
  },
  render: () => <div className="flex flex-wrap items-center gap-3">
      {(['micro', 'default', 'large'] as const).map(size => <IconButton key={size} aria-label={\`Add diagnosis (\${size})\`} size={size}>
          <PlusIcon aria-hidden="true" />
        </IconButton>)}
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Loading action',
    children: <PlusIcon aria-hidden="true" />
  },
  render: () => <div className="flex flex-wrap items-center gap-3">
      <IconButton aria-label="Saving draft" loading>
        <PlusIcon aria-hidden="true" />
      </IconButton>
      <IconButton aria-label="Unavailable action" disabled>
        <PlusIcon aria-hidden="true" />
      </IconButton>
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Density action',
    children: <PlusIcon aria-hidden="true" />
  },
  render: () => <div className="flex flex-wrap items-start gap-6">
      {(['compact', 'cozy', 'comfortable'] as const).map(density => <div key={density} data-density={density} className="flex flex-col items-center gap-2">
          <IconButton aria-label={\`Add diagnosis (\${density})\`}>
            <PlusIcon aria-hidden="true" />
          </IconButton>
          <span className="text-xs text-muted-foreground">{density}</span>
        </div>)}
    </div>
}`,...h.parameters?.docs?.source}}},g=[`Default`,`VariantsAndTones`,`Sizes`,`LoadingAndDisabled`,`DensityReference`]}))();export{d as Default,h as DensityReference,m as LoadingAndDisabled,p as Sizes,f as VariantsAndTones,g as __namedExportsOrder,u as default};