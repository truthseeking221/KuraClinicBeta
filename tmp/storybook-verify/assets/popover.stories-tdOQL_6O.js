import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{t as i}from"./ui-C9kmmzkH.js";import{a,c as o,l as s,o as c,s as l}from"./date-range-picker-CVkMECHY.js";import{t as u}from"./button-B6_zsN5-.js";var d,f,p,m,h,g,_,v,y,b,x;t((()=>{d=r(),f=e(n()),i(),{expect:p,userEvent:m,within:h}=__STORYBOOK_MODULE_TEST__,g={title:`Design System/Components/Popover`,component:a,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{kura:{intake:{decision:`REUSE`,owner:`src/components/ui`,evidence:`The canonical Base UI-backed Popover already matches the ReUI anchored-disclosure contract, including controlled state, keyboard dismissal, viewport collision handling, and composable title/description.`},source:{vendor:`ReUI`,registryItem:`popover`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura-overlay`,elevation:`kura-popover`,density:`kura-root-attribute`,responsive:`viewport-contained with a Dialog alternative for dedicated mobile tasks`},useCase:{primaryTask:`Reveal a short, reversible anchored task without losing its trigger context.`,safety:`The caller owns permissions, validation, mutations, and confirmation. Consequential work belongs in AlertDialog or a feature-owned Dialog.`}}}},_={render:()=>(0,d.jsxs)(a,{children:[(0,d.jsx)(s,{render:(0,d.jsx)(u,{variant:`outline`,children:`Review date guidance`})}),(0,d.jsxs)(c,{"aria-label":`Date guidance`,initialFocus:!1,role:`dialog`,children:[(0,d.jsx)(o,{children:`Use an exact date`}),(0,d.jsx)(l,{children:`Confirm the date before applying it to a schedule, specimen, or report filter.`})]})]}),play:async({canvasElement:e})=>{let t=h(e).getByRole(`button`,{name:/review date guidance/i});await m.click(t),await p(t).toHaveAttribute(`aria-expanded`,`true`),await p(await h(document.body).findByText(`Use an exact date`)).toBeVisible()}},v={render:()=>{let[e,t]=(0,f.useState)(!1);return(0,d.jsxs)(`div`,{className:`flex flex-col items-start gap-3`,children:[(0,d.jsxs)(a,{open:e,onOpenChange:t,children:[(0,d.jsx)(s,{render:(0,d.jsx)(u,{variant:`outline`,children:`Open controlled guidance`})}),(0,d.jsxs)(c,{"aria-label":`Controlled guidance`,initialFocus:!1,role:`dialog`,children:[(0,d.jsx)(o,{children:`Controlled disclosure`}),(0,d.jsx)(l,{children:`The owning composition controls whether this surface is open.`})]})]}),(0,d.jsxs)(`span`,{"aria-live":`polite`,className:`k-caption`,children:[`Popover is `,e?`open`:`closed`,`.`]})]})}},y={parameters:{viewport:{defaultViewport:`kura320`}},render:()=>(0,d.jsxs)(a,{children:[(0,d.jsx)(s,{render:(0,d.jsx)(u,{fullWidth:!0,variant:`outline`,children:`Open date help`})}),(0,d.jsxs)(c,{"aria-label":`Date help`,initialFocus:!1,role:`dialog`,children:[(0,d.jsx)(o,{children:`Choose the intended date`}),(0,d.jsx)(l,{children:`Keep this anchored surface for short reversible guidance. Use a Dialog when a mobile task needs more room.`})]})]})},b={render:()=>(0,d.jsxs)(a,{children:[(0,d.jsx)(s,{disabled:!0,render:(0,d.jsx)(u,{variant:`outline`,children:`Review archived guidance`})}),(0,d.jsx)(c,{"aria-label":`Archived guidance`,role:`dialog`,children:(0,d.jsx)(o,{children:`Archived guidance`})})]})},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <Popover>
      <PopoverTrigger render={<Button variant="outline">Review date guidance</Button>} />
      <PopoverContent aria-label="Date guidance" initialFocus={false} role="dialog">
        <PopoverTitle>Use an exact date</PopoverTitle>
        <PopoverDescription>
          Confirm the date before applying it to a schedule, specimen, or report filter.
        </PopoverDescription>
      </PopoverContent>
    </Popover>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: /review date guidance/i
    });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(await within(document.body).findByText('Use an exact date')).toBeVisible();
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <div className="flex flex-col items-start gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger render={<Button variant="outline">Open controlled guidance</Button>} />
          <PopoverContent aria-label="Controlled guidance" initialFocus={false} role="dialog">
            <PopoverTitle>Controlled disclosure</PopoverTitle>
            <PopoverDescription>The owning composition controls whether this surface is open.</PopoverDescription>
          </PopoverContent>
        </Popover>
        <span aria-live="polite" className="k-caption">Popover is {open ? 'open' : 'closed'}.</span>
      </div>;
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  render: () => <Popover>
      <PopoverTrigger render={<Button fullWidth variant="outline">Open date help</Button>} />
      <PopoverContent aria-label="Date help" initialFocus={false} role="dialog">
        <PopoverTitle>Choose the intended date</PopoverTitle>
        <PopoverDescription>
          Keep this anchored surface for short reversible guidance. Use a Dialog when a mobile task needs more room.
        </PopoverDescription>
      </PopoverContent>
    </Popover>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Popover>
      <PopoverTrigger disabled render={<Button variant="outline">Review archived guidance</Button>} />
      <PopoverContent aria-label="Archived guidance" role="dialog">
        <PopoverTitle>Archived guidance</PopoverTitle>
      </PopoverContent>
    </Popover>
}`,...b.parameters?.docs?.source}}},x=[`Default`,`Controlled`,`MobileDefault`,`DisabledTrigger`]}))();export{v as Controlled,_ as Default,b as DisabledTrigger,y as MobileDefault,x as __namedExportsOrder,g as default};