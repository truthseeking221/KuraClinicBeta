import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{Q as n,g as r}from"./provider-marks-BeHzyBjc.js";import{t as i}from"./ui-C9kmmzkH.js";import{a,r as o}from"./skeleton-yGvKPj3C.js";import{d as s,i as c,l,o as u,r as d,s as f,u as p}from"./settings-modal-DFqsiPWF.js";import{t as m}from"./button-B6_zsN5-.js";import{a as h}from"./collapsible-Cfc9M9oP.js";import{d as g,f as _,p as v}from"./sheet-CYYlIxND.js";function y({children:e=`HN-004821`}){return(0,b.jsxs)(g,{children:[(0,b.jsx)(v,{asChild:!0,children:(0,b.jsx)(`a`,{href:`#patient-record`,children:e})}),(0,b.jsx)(_,{children:(0,b.jsxs)(`div`,{style:{display:`grid`,gap:`var(--space-2)`},children:[(0,b.jsx)(`strong`,{children:`Sophea Chan`}),(0,b.jsx)(`span`,{style:{color:`var(--color-text-tertiary)`},children:`DOB 18 May 1974 · Verified patient identifier`})]})})]})}var b,x,S,C,w,T,E,D,O,k,A,j,M,N,P;e((()=>{b=t(),i(),{expect:x,userEvent:S,within:C}=__STORYBOOK_MODULE_TEST__,w={title:`Design System/Components/Hover Card`,component:g,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{source:{vendor:`ReUI`,registryItem:`hover-card`,familySize:8},intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`Kura had one feature-owned lab preview with bespoke positioning, but no generic collision-aware owner for optional rich previews on hover and keyboard focus.`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura-overlay`,elevation:`kura-popover`,icons:`kura-canonical`,responsive:`fluid-collision-aware`},safety:`Hover Card may contain supplementary preview content only. Required instructions, errors, permissions, safety information and primary actions must remain visible or use a click/tap disclosure.`,exclusions:[{capability:`Interactive pagination inside a hover card`,reason:`Repeated navigation changes the surface into a popover or dialog. Hover previews stay lightweight and non-essential.`},{capability:`Click-to-pin clinical result detail`,replacement:`Clinic Results now composes HoverCard for supplementary preview with a canonical Sheet for the complete click/tap history disclosure.`}]}}},T={render:()=>(0,b.jsx)(y,{}),play:async({canvasElement:e})=>{let t=C(e).getByRole(`link`,{name:`HN-004821`});await S.hover(t),await x(await C(document.body).findByText(`Sophea Chan`)).toBeVisible(),await S.unhover(t)}},E={render:()=>(0,b.jsx)(y,{children:`View patient context`}),play:async({canvasElement:e})=>{C(e).getByRole(`link`,{name:`View patient context`}).focus(),await x(await C(document.body).findByText(`Sophea Chan`)).toBeVisible()}},D={render:()=>(0,b.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--space-6)`},children:[`top`,`right`,`bottom`,`left`].map(e=>(0,b.jsxs)(g,{children:[(0,b.jsx)(v,{asChild:!0,children:(0,b.jsx)(m,{variant:`outline`,children:e})}),(0,b.jsxs)(_,{side:e,size:`sm`,children:[`Collision-aware preview on the `,e,`.`]})]},e))})},O={render:()=>(0,b.jsxs)(g,{children:[(0,b.jsx)(v,{asChild:!0,children:(0,b.jsx)(`a`,{href:`#clinician`,children:`@dr-sokha`})}),(0,b.jsx)(_,{children:(0,b.jsxs)(`div`,{style:{display:`flex`,gap:`var(--space-3)`},children:[(0,b.jsx)(o,{children:(0,b.jsx)(a,{children:`SS`})}),(0,b.jsxs)(`div`,{style:{display:`grid`,gap:`var(--space-1)`},children:[(0,b.jsx)(`strong`,{children:`Dr Sokha Srey`}),(0,b.jsx)(`span`,{children:`General medicine · Phnom Penh Central`}),(0,b.jsx)(h,{size:`sm`,variant:`success`,children:`Available today`})]})]})})]})},k={render:()=>(0,b.jsxs)(g,{children:[(0,b.jsx)(v,{asChild:!0,children:(0,b.jsx)(m,{"aria-label":`About verification`,size:`icon`,variant:`ghost`,children:(0,b.jsx)(n,{"aria-hidden":!0,size:18})})}),(0,b.jsx)(_,{size:`sm`,children:`Verification confirms that reception matched the patient to an accepted identity document.`})]})},A={render:()=>(0,b.jsxs)(g,{children:[(0,b.jsx)(v,{asChild:!0,children:(0,b.jsx)(`a`,{href:`#clinic`,children:`Phnom Penh Central Clinic`})}),(0,b.jsx)(_,{size:`lg`,children:(0,b.jsxs)(`div`,{style:{display:`grid`,gap:`var(--space-2)`},children:[(0,b.jsx)(`strong`,{children:`Phnom Penh Central Clinic`}),(0,b.jsx)(`span`,{children:`Open 07:00–19:00 · Laboratory collection closes at 17:30.`}),(0,b.jsx)(`span`,{style:{color:`var(--color-text-tertiary)`},children:`123 Monivong Boulevard, Phnom Penh`})]})})]})},j={render:()=>(0,b.jsxs)(d,{children:[(0,b.jsx)(s,{asChild:!0,children:(0,b.jsx)(m,{children:`Open booking details`})}),(0,b.jsxs)(u,{children:[(0,b.jsxs)(l,{children:[(0,b.jsx)(p,{children:`Booking details`}),(0,b.jsx)(f,{children:`Supplementary context can preview without escaping the modal layer.`})]}),(0,b.jsxs)(c,{children:[`Assigned clinician: `,(0,b.jsx)(y,{children:`Dr Sokha Srey`})]})]})]})},M={render:()=>(0,b.jsxs)(g,{children:[(0,b.jsx)(v,{asChild:!0,children:(0,b.jsx)(`time`,{dateTime:`2026-07-16T09:42:00+07:00`,children:`18 minutes ago`})}),(0,b.jsx)(_,{size:`sm`,children:(0,b.jsxs)(`div`,{style:{display:`flex`,gap:`var(--space-2)`},children:[(0,b.jsx)(r,{"aria-hidden":!0,size:18}),(0,b.jsx)(`span`,{className:`tabular-nums`,children:`16 Jul 2026, 09:42 ICT`})]})})]})},N={render:()=>(0,b.jsxs)(`div`,{style:{display:`grid`,gap:`var(--space-2)`},children:[(0,b.jsx)(`strong`,{children:`Patient ID HN-004821`}),(0,b.jsx)(`span`,{children:`Essential identity remains visible. The hover card only repeats supplementary context.`}),(0,b.jsx)(y,{children:`Preview additional context`})]}),parameters:{viewport:{defaultViewport:`mobile1`}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <PreviewLink />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('link', {
      name: 'HN-004821'
    });
    await userEvent.hover(trigger);
    await expect(await within(document.body).findByText('Sophea Chan')).toBeVisible();
    await userEvent.unhover(trigger);
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <PreviewLink>View patient context</PreviewLink>,
  play: async ({
    canvasElement
  }) => {
    const trigger = within(canvasElement).getByRole('link', {
      name: 'View patient context'
    });
    trigger.focus();
    await expect(await within(document.body).findByText('Sophea Chan')).toBeVisible();
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-6)'
  }}>
      {(['top', 'right', 'bottom', 'left'] as const).map(side => <HoverCard key={side}>
          <HoverCardTrigger asChild>
            <Button variant="outline">{side}</Button>
          </HoverCardTrigger>
          <HoverCardContent side={side} size="sm">
            Collision-aware preview on the {side}.
          </HoverCardContent>
        </HoverCard>)}
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <HoverCard>
      <HoverCardTrigger asChild>
        <a href="#clinician">@dr-sokha</a>
      </HoverCardTrigger>
      <HoverCardContent>
        <div style={{
        display: 'flex',
        gap: 'var(--space-3)'
      }}>
          <Avatar>
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
          <div style={{
          display: 'grid',
          gap: 'var(--space-1)'
        }}>
            <strong>Dr Sokha Srey</strong>
            <span>General medicine · Phnom Penh Central</span>
            <Badge size="sm" variant="success">
              Available today
            </Badge>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <HoverCard>
      <HoverCardTrigger asChild>
        <Button aria-label="About verification" size="icon" variant="ghost">
          <InformationIcon aria-hidden size={18} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent size="sm">
        Verification confirms that reception matched the patient to an accepted identity document.
      </HoverCardContent>
    </HoverCard>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <HoverCard>
      <HoverCardTrigger asChild>
        <a href="#clinic">Phnom Penh Central Clinic</a>
      </HoverCardTrigger>
      <HoverCardContent size="lg">
        <div style={{
        display: 'grid',
        gap: 'var(--space-2)'
      }}>
          <strong>Phnom Penh Central Clinic</strong>
          <span>Open 07:00–19:00 · Laboratory collection closes at 17:30.</span>
          <span style={{
          color: 'var(--color-text-tertiary)'
        }}>
            123 Monivong Boulevard, Phnom Penh
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button>Open booking details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Booking details</DialogTitle>
          <DialogDescription>Supplementary context can preview without escaping the modal layer.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          Assigned clinician: <PreviewLink>Dr Sokha Srey</PreviewLink>
        </DialogBody>
      </DialogContent>
    </Dialog>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <HoverCard>
      <HoverCardTrigger asChild>
        <time dateTime="2026-07-16T09:42:00+07:00">18 minutes ago</time>
      </HoverCardTrigger>
      <HoverCardContent size="sm">
        <div style={{
        display: 'flex',
        gap: 'var(--space-2)'
      }}>
          <CalendarIcon aria-hidden size={18} />
          <span className="tabular-nums">16 Jul 2026, 09:42 ICT</span>
        </div>
      </HoverCardContent>
    </HoverCard>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: 'var(--space-2)'
  }}>
      <strong>Patient ID HN-004821</strong>
      <span>Essential identity remains visible. The hover card only repeats supplementary context.</span>
      <PreviewLink>Preview additional context</PreviewLink>
    </div>,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...N.parameters?.docs?.source}}},P=[`Basic`,`KeyboardFocus`,`Positions`,`ProfileInformation`,`WithIcon`,`ImageAndText`,`InsideDialog`,`Timestamp`,`MobileSupplementaryOnly`]}))();export{T as Basic,A as ImageAndText,j as InsideDialog,E as KeyboardFocus,N as MobileSupplementaryOnly,D as Positions,O as ProfileInformation,M as Timestamp,k as WithIcon,P as __namedExportsOrder,w as default};