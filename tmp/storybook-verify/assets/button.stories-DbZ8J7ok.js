import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{T as n,i as r}from"./provider-marks-BeHzyBjc.js";import{t as i}from"./ui-C9kmmzkH.js";import{t as a}from"./button-B6_zsN5-.js";var o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E;e((()=>{o=t(),i(),{expect:s,userEvent:c,within:l}=__STORYBOOK_MODULE_TEST__,u={title:`Design System/Primitives/Button`,component:a,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`REUSE`,owner:`src/components/ui`,evidence:`The canonical Kura Button remains the action owner and adopts Kura geometry, gradients, borders, shadows, and states.`},source:{vendor:`Kura`,registryItem:`button`,visualReference:`Kura button`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-focus-only`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`wraps-and-preserves-touch-target`},exclusions:[{capability:`Button group composition`,reason:`Grouped actions need a named group, segmented semantics, and a responsive stacking contract.`,replacement:`Compose Button with the canonical ButtonGroup owner.`},{capability:`Icon-only actions`,reason:`Icon-only controls require their own accessible-name and touch-target contract.`,replacement:`Use the canonical IconButton owner.`},{capability:`Copy feedback`,reason:`Clipboard permission and success/error recovery are stateful behavior beyond a presentational Button.`,replacement:`Use the canonical CopyButton pattern.`},{capability:`Social login, theme toggle, avatar actions, counters, and hover-only reveal`,reason:`These capabilities carry product-specific meaning or depend on other canonical patterns; keeping them in Button would create an unsafe catch-all API.`,replacement:`Compose the owning Auth, Theme, Avatar, Badge/Counter, Tooltip, or domain action pattern.`},{capability:`Async success transitions, status badges, shortcut metadata, multi-line actions, animated menu toggles, and expanding labels`,reason:`These examples add state machines, supplemental information, or motion contracts that are not part of the domain-agnostic action primitive.`,replacement:`Use the owning async action, Badge, Kbd, menu/navigation, or domain pattern composed with Button.`}]},docs:{description:{component:`A semantic action primitive for clinic workflows. Use one dominant action per decision area, name the consequence clearly, and reserve destructive emphasis for actions that remove or invalidate data.`}}},argTypes:{variant:{control:`radio`,options:[`primary`,`secondary`,`outline`,`ghost`,`link`,`destructive`]},size:{control:`radio`,options:[`compact`,`xs`,`sm`,`md`,`default`,`lg`,`icon-xs`,`icon-sm`,`icon`,`icon-lg`]},loading:{control:`boolean`},asChild:{control:`boolean`}}},d={args:{children:`Save visit draft`,variant:`primary`},play:async({canvasElement:e})=>{let t=l(e).getByRole(`button`,{name:`Save visit draft`});await s(t).toBeEnabled(),await c.tab(),await s(t).toHaveFocus()}},f={render:()=>(0,o.jsxs)(`div`,{className:`flex max-w-3xl flex-wrap items-center gap-3`,children:[(0,o.jsx)(a,{children:`Save visit draft`}),(0,o.jsx)(a,{variant:`secondary`,children:`Review later`}),(0,o.jsx)(a,{variant:`outline`,children:`Open record`}),(0,o.jsx)(a,{variant:`ghost`,children:`Dismiss`}),(0,o.jsx)(a,{variant:`link`,children:`View audit history`}),(0,o.jsx)(a,{variant:`destructive`,children:`Remove draft`})]})},p={render:()=>(0,o.jsxs)(`div`,{className:`flex max-w-3xl flex-col gap-6`,children:[(0,o.jsxs)(`div`,{className:`flex flex-wrap items-end gap-4`,children:[(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,o.jsx)(a,{size:`compact`,children:`Row action`}),(0,o.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:`compact`})]}),(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,o.jsx)(a,{size:`xs`,children:`Extra small`}),(0,o.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:`xs`})]}),(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,o.jsx)(a,{size:`sm`,children:`Small action`}),(0,o.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:`sm`})]}),(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,o.jsx)(a,{size:`md`,children:`Medium action`}),(0,o.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:`md`})]}),(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,o.jsx)(a,{size:`default`,children:`Default action`}),(0,o.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:`default`})]}),(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,o.jsx)(a,{size:`lg`,children:`Large action`}),(0,o.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:`lg`})]})]}),(0,o.jsxs)(`div`,{className:`flex flex-wrap items-end gap-4`,children:[(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,o.jsx)(a,{size:`icon-xs`,"aria-label":`Add diagnosis`,children:(0,o.jsx)(r,{"aria-hidden":`true`})}),(0,o.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:`icon-xs`})]}),(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,o.jsx)(a,{size:`icon-sm`,"aria-label":`Add diagnosis`,children:(0,o.jsx)(r,{"aria-hidden":`true`})}),(0,o.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:`icon-sm`})]}),(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,o.jsx)(a,{size:`icon`,"aria-label":`Add diagnosis`,children:(0,o.jsx)(r,{"aria-hidden":`true`})}),(0,o.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:`icon`})]}),(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,o.jsx)(a,{size:`icon-lg`,"aria-label":`Add diagnosis`,children:(0,o.jsx)(r,{"aria-hidden":`true`})}),(0,o.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:`icon-lg`})]})]})]})},m={render:()=>(0,o.jsxs)(`div`,{role:`row`,className:`flex w-full max-w-3xl items-center justify-between gap-3`,children:[(0,o.jsx)(`span`,{role:`cell`,children:`Fasting blood glucose`}),(0,o.jsxs)(`div`,{role:`cell`,className:`flex shrink-0 items-center gap-2`,children:[(0,o.jsx)(a,{size:`compact`,variant:`ghost`,children:`View`}),(0,o.jsx)(a,{size:`compact`,variant:`outline`,children:`Acknowledge result`})]})]})},h={render:()=>(0,o.jsxs)(`div`,{className:`flex w-full max-w-xl flex-col gap-3`,children:[(0,o.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[(0,o.jsx)(a,{leadingIcon:(0,o.jsx)(r,{"aria-hidden":`true`}),children:`Add follow-up test`}),(0,o.jsx)(a,{variant:`outline`,trailingIcon:(0,o.jsx)(n,{"aria-hidden":`true`}),children:`Open visit record`}),(0,o.jsx)(a,{variant:`secondary`,disclosure:!0,children:`Choose draw method`})]}),(0,o.jsx)(a,{fullWidth:!0,children:`Start consultation`})]})},g={args:{children:`Create lab order`,loading:!0},play:async({canvasElement:e})=>{let t=l(e).getByRole(`button`,{name:/create lab order/i});await s(t).toBeDisabled(),await s(t).toHaveAttribute(`aria-busy`,`true`)}},_={render:()=>(0,o.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[(0,o.jsx)(a,{disabled:!0,children:`Unavailable until identity is verified`}),(0,o.jsx)(a,{"aria-invalid":`true`,variant:`outline`,children:`Correct patient identity`}),(0,o.jsx)(a,{"aria-pressed":`true`,variant:`secondary`,children:`Include in order set`})]})},v={render:()=>(0,o.jsx)(a,{asChild:!0,variant:`link`,children:(0,o.jsx)(`a`,{href:`/clinic/visits/visit-2048`,children:`Open visit record`})})},y={render:()=>(0,o.jsx)(`div`,{className:`w-full max-w-xs`,children:(0,o.jsx)(a,{fullWidth:!0,children:`Confirm patient identity before starting the consultation`})})},b={render:()=>(0,o.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,o.jsx)(a,{fullWidth:!0,children:`Save visit draft`})})},x={render:()=>(0,o.jsx)(`div`,{className:`w-full max-w-xs`,children:(0,o.jsx)(a,{fullWidth:!0,variant:`outline`,children:`Review later`})})},S={render:()=>(0,o.jsxs)(`div`,{className:`flex w-full max-w-sm flex-col gap-3`,children:[(0,o.jsx)(a,{fullWidth:!0,leadingIcon:(0,o.jsx)(r,{"aria-hidden":`true`}),children:`Add follow-up test`}),(0,o.jsx)(a,{fullWidth:!0,variant:`destructive`,children:`Remove draft`})]})},C={render:()=>(0,o.jsxs)(`div`,{className:`flex w-full max-w-2xl flex-wrap items-center gap-3`,children:[(0,o.jsx)(a,{children:`Save visit draft`}),(0,o.jsx)(a,{variant:`secondary`,children:`Review later`}),(0,o.jsx)(a,{variant:`outline`,children:`Open visit record`})]})},w={render:()=>(0,o.jsxs)(`div`,{className:`flex w-full max-w-4xl flex-wrap items-center justify-between gap-3`,children:[(0,o.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[(0,o.jsx)(a,{children:`Save visit draft`}),(0,o.jsx)(a,{variant:`outline`,children:`Open visit record`})]}),(0,o.jsx)(a,{variant:`ghost`,children:`View audit history`})]})},T={render:()=>(0,o.jsx)(`div`,{className:`flex flex-wrap items-start gap-6`,children:[`compact`,`cozy`,`comfortable`].map(e=>(0,o.jsxs)(`div`,{"data-density":e,className:`flex flex-col items-center gap-2`,children:[(0,o.jsx)(a,{children:`Save draft`}),(0,o.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:e})]},e))})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Save visit draft',
    variant: 'primary'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: 'Save visit draft'
    });
    await expect(button).toBeEnabled();
    await userEvent.tab();
    await expect(button).toHaveFocus();
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex max-w-3xl flex-wrap items-center gap-3">
      <Button>Save visit draft</Button>
      <Button variant="secondary">Review later</Button>
      <Button variant="outline">Open record</Button>
      <Button variant="ghost">Dismiss</Button>
      <Button variant="link">View audit history</Button>
      <Button variant="destructive">Remove draft</Button>
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex max-w-3xl flex-col gap-6">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col items-center gap-2">
          <Button size="compact">Row action</Button>
          <span className="text-xs text-muted-foreground">compact</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="xs">Extra small</Button>
          <span className="text-xs text-muted-foreground">xs</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="sm">Small action</Button>
          <span className="text-xs text-muted-foreground">sm</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="md">Medium action</Button>
          <span className="text-xs text-muted-foreground">md</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="default">Default action</Button>
          <span className="text-xs text-muted-foreground">default</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="lg">Large action</Button>
          <span className="text-xs text-muted-foreground">lg</span>
        </div>
      </div>
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col items-center gap-2">
          <Button size="icon-xs" aria-label="Add diagnosis">
            <PlusIcon aria-hidden="true" />
          </Button>
          <span className="text-xs text-muted-foreground">icon-xs</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="icon-sm" aria-label="Add diagnosis">
            <PlusIcon aria-hidden="true" />
          </Button>
          <span className="text-xs text-muted-foreground">icon-sm</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="icon" aria-label="Add diagnosis">
            <PlusIcon aria-hidden="true" />
          </Button>
          <span className="text-xs text-muted-foreground">icon</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="icon-lg" aria-label="Add diagnosis">
            <PlusIcon aria-hidden="true" />
          </Button>
          <span className="text-xs text-muted-foreground">icon-lg</span>
        </div>
      </div>
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div role="row" className="flex w-full max-w-3xl items-center justify-between gap-3">
      <span role="cell">Fasting blood glucose</span>
      <div role="cell" className="flex shrink-0 items-center gap-2">
        <Button size="compact" variant="ghost">
          View
        </Button>
        <Button size="compact" variant="outline">
          Acknowledge result
        </Button>
      </div>
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-full max-w-xl flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Button leadingIcon={<PlusIcon aria-hidden="true" />}>
          Add follow-up test
        </Button>
        <Button variant="outline" trailingIcon={<ChevronRightIcon aria-hidden="true" />}>
          Open visit record
        </Button>
        <Button variant="secondary" disclosure>
          Choose draw method
        </Button>
      </div>
      <Button fullWidth>Start consultation</Button>
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Create lab order',
    loading: true
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: /create lab order/i
    });
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-busy', 'true');
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      <Button disabled>Unavailable until identity is verified</Button>
      <Button aria-invalid="true" variant="outline">
        Correct patient identity
      </Button>
      <Button aria-pressed="true" variant="secondary">
        Include in order set
      </Button>
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Button asChild variant="link">
      <a href="/clinic/visits/visit-2048">Open visit record</a>
    </Button>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-xs">
      <Button fullWidth>
        Confirm patient identity before starting the consultation
      </Button>
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-sm">
      <Button fullWidth>Save visit draft</Button>
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-xs">
      <Button fullWidth variant="outline">
        Review later
      </Button>
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-full max-w-sm flex-col gap-3">
      <Button fullWidth leadingIcon={<PlusIcon aria-hidden="true" />}>
        Add follow-up test
      </Button>
      <Button fullWidth variant="destructive">
        Remove draft
      </Button>
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-full max-w-2xl flex-wrap items-center gap-3">
      <Button>Save visit draft</Button>
      <Button variant="secondary">Review later</Button>
      <Button variant="outline">Open visit record</Button>
    </div>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-full max-w-4xl flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Button>Save visit draft</Button>
        <Button variant="outline">Open visit record</Button>
      </div>
      <Button variant="ghost">View audit history</Button>
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-start gap-6">
      {(['compact', 'cozy', 'comfortable'] as const).map(density => <div key={density} data-density={density} className="flex flex-col items-center gap-2">
          <Button>Save draft</Button>
          <span className="text-xs text-muted-foreground">{density}</span>
        </div>)}
    </div>
}`,...T.parameters?.docs?.source}}},E=[`Default`,`Variants`,`Sizes`,`CompactTableRow`,`ContentSlots`,`Loading`,`DisabledAndInvalid`,`AsLink`,`MobileLongLabel`,`MobileDefault`,`MobileNarrow`,`MobileInteractive`,`Tablet`,`Desktop`,`DensityReference`]}))();export{v as AsLink,m as CompactTableRow,h as ContentSlots,d as Default,T as DensityReference,w as Desktop,_ as DisabledAndInvalid,g as Loading,b as MobileDefault,S as MobileInteractive,y as MobileLongLabel,x as MobileNarrow,p as Sizes,C as Tablet,f as Variants,E as __namedExportsOrder,u as default};