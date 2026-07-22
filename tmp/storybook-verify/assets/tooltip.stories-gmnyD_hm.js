import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{a as n,i as r,n as i,r as a,t as o}from"./ui-C9kmmzkH.js";import{t as s}from"./button-B6_zsN5-.js";import{n as c,t as l}from"./intake-components.stories.module-pqbVgWyl.js";var u,d,f,p,m,h,g,_,v,y,b,x;e((()=>{u=t(),o(),l(),{expect:d,userEvent:f,waitFor:p,within:m}=__STORYBOOK_MODULE_TEST__,h={title:`Design System/Primitives/Tooltip`,component:i,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`padded`,kura:{source:{vendor:`Kura`,registryItem:`tooltip`,visualReference:`Kura tooltip`},intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`The existing Base UI owner already supplied hover/focus behavior, escape dismissal, portal positioning, arrow, delay provider, and side/alignment control.`,exclusions:[`Interactive actions and upgrade links belong in Popover.`,`Essential instructions and safety information must remain visible outside Tooltip.`]},binding:{colors:`kura-inverse-neutral`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`overlay`,motion:`kura-overlay-and-reduced-motion`}}}},g={args:{},render:()=>(0,u.jsx)(r,{delay:0,children:(0,u.jsxs)(i,{defaultOpen:!0,children:[(0,u.jsx)(n,{render:(0,u.jsx)(s,{variant:`outline`}),children:`Focus for details`}),(0,u.jsx)(a,{children:`Shows supporting information without hiding an essential instruction.`})]})}),play:async({canvasElement:e})=>{let t=m(e).getByRole(`button`,{name:`Focus for details`}),n=m(e.ownerDocument.body);await p(()=>d(n.getByRole(`tooltip`)).toBeVisible()),t.focus(),await f.keyboard(`{Escape}`),await p(()=>d(n.queryByRole(`tooltip`)).not.toBeInTheDocument()),t.blur(),t.focus(),await p(()=>d(n.getByRole(`tooltip`)).toBeVisible())}},_={args:{},render:()=>(0,u.jsx)(r,{delay:0,children:(0,u.jsx)(`div`,{className:c.tooltipGrid,children:[`top`,`right`,`bottom`,`left`].map(e=>(0,u.jsxs)(i,{defaultOpen:!0,children:[(0,u.jsx)(n,{render:(0,u.jsx)(s,{variant:`outline`}),children:e}),(0,u.jsxs)(a,{side:e,children:[`Placed on `,e]})]},e))})})},v={args:{},render:()=>(0,u.jsx)(r,{delay:0,children:(0,u.jsxs)(i,{defaultOpen:!0,children:[(0,u.jsx)(n,{render:(0,u.jsx)(s,{variant:`outline`}),children:`Result source`}),(0,u.jsx)(a,{children:`Received from the central laboratory after accession reconciliation. Open the result details for the complete audit trail.`})]})})},y={args:{},render:()=>(0,u.jsx)(r,{delay:0,children:(0,u.jsxs)(i,{children:[(0,u.jsx)(n,{render:(0,u.jsx)(`span`,{}),children:(0,u.jsx)(s,{disabled:!0,children:`Release result`})}),(0,u.jsx)(a,{children:`Result release is unavailable until review is complete.`})]})})},b={args:{},parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,u.jsx)(r,{delay:0,children:(0,u.jsxs)(i,{defaultOpen:!0,children:[(0,u.jsx)(n,{render:(0,u.jsx)(s,{fullWidth:!0,variant:`outline`}),children:`Appointment status`}),(0,u.jsx)(a,{side:`bottom`,children:`Confirmed by the patient at 08:12 today.`})]})})},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {},
  render: () => <TooltipProvider delay={0}>
      <Tooltip defaultOpen>
        <TooltipTrigger render={<Button variant="outline" />}>Focus for details</TooltipTrigger>
        <TooltipContent>Shows supporting information without hiding an essential instruction.</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  play: async ({
    canvasElement
  }) => {
    const trigger = within(canvasElement).getByRole('button', {
      name: 'Focus for details'
    });
    const documentCanvas = within(canvasElement.ownerDocument.body);
    await waitFor(() => expect(documentCanvas.getByRole('tooltip')).toBeVisible());
    trigger.focus();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(documentCanvas.queryByRole('tooltip')).not.toBeInTheDocument());
    trigger.blur();
    trigger.focus();
    await waitFor(() => expect(documentCanvas.getByRole('tooltip')).toBeVisible());
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {},
  render: () => <TooltipProvider delay={0}>
      <div className={styles.tooltipGrid}>
        {(['top', 'right', 'bottom', 'left'] as const).map(side => <Tooltip defaultOpen key={side}>
            <TooltipTrigger render={<Button variant="outline" />}>{side}</TooltipTrigger>
            <TooltipContent side={side}>Placed on {side}</TooltipContent>
          </Tooltip>)}
      </div>
    </TooltipProvider>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {},
  render: () => <TooltipProvider delay={0}>
      <Tooltip defaultOpen>
        <TooltipTrigger render={<Button variant="outline" />}>Result source</TooltipTrigger>
        <TooltipContent>
          Received from the central laboratory after accession reconciliation. Open the result details for the complete audit trail.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {},
  render: () => <TooltipProvider delay={0}>
      <Tooltip>
        <TooltipTrigger render={<span />}>
          <Button disabled>Release result</Button>
        </TooltipTrigger>
        <TooltipContent>Result release is unavailable until review is complete.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <TooltipProvider delay={0}>
      <Tooltip defaultOpen>
        <TooltipTrigger render={<Button fullWidth variant="outline" />}>Appointment status</TooltipTrigger>
        <TooltipContent side="bottom">Confirmed by the patient at 08:12 today.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
}`,...b.parameters?.docs?.source}}},x=[`Default`,`PlacementSides`,`LongContent`,`DisabledControl`,`MobileNarrow`]}))();export{g as Default,y as DisabledControl,v as LongContent,b as MobileNarrow,_ as PlacementSides,x as __namedExportsOrder,h as default};