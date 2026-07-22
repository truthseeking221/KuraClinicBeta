import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{ar as n,er as r,ir as i,t as a}from"./ui-C9kmmzkH.js";import{t as o}from"./button-B6_zsN5-.js";import{a as s}from"./collapsible-Cfc9M9oP.js";import{t as c}from"./input-UaJWx_9h.js";import{a as l,c as u,i as d,l as f,n as p,o as m,r as h,s as g,t as _}from"./sheet-CYYlIxND.js";var v,y,b,x,S,C,w,T,E,D,O,k,A,j;e((()=>{v=t(),a(),{expect:y,userEvent:b,waitFor:x,within:S}=__STORYBOOK_MODULE_TEST__,C={title:`Design System/Primitives/Sheet`,component:_,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`Kura already owned and used the native-dialog Sheet in AppShell and Results. ReUI c-sheet-1 through c-sheet-4 confirm the existing form, optional close, side, and scroll contracts; this intake adds the missing top posture and complete stories without replacing production behavior.`,exclusions:[{reuiApi:`Base UI render prop triggers and close buttons`,reason:`Kura already owns a stable native trigger and canonical icon close contract used in production.`,replacement:`Compose SheetTrigger with Kura styling and keep explicit SheetClose in the header.`}]},source:{vendor:`ReUI`,registryItem:`c-sheet-1 through c-sheet-4`,sourceUrl:`https://reui.io/components/sheet`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-modal`,icons:`kura-canonical`,motion:`kura-slide-reduced-motion-safe`,density:`inherits-content`,responsive:`four edge postures; side panels clamp to viewport; bottom sheet for mobile transforms`}},docs:{description:{component:`Side panel on the native <dialog> element: focus trap, Escape, and backdrop dismissal for navigation, queues, and secondary work surfaces. Use AlertDialog for confirmations.`}}}},w={args:{children:null},render:()=>(0,v.jsxs)(_,{children:[(0,v.jsx)(f,{children:`Open queue`}),(0,v.jsxs)(d,{side:`right`,children:[(0,v.jsxs)(g,{children:[(0,v.jsxs)(`div`,{children:[(0,v.jsx)(u,{children:`Waiting queue`}),(0,v.jsx)(l,{children:`Longest wait first.`})]}),(0,v.jsx)(h,{"aria-label":`Close queue`})]}),(0,v.jsx)(p,{children:(0,v.jsx)(`p`,{style:{margin:0,font:`inherit`},children:`Queue content renders here.`})})]})]}),play:async({canvasElement:e})=>{let t=S(e);await b.click(t.getByRole(`button`,{name:`Open queue`}));let n=await t.findByRole(`dialog`);await y(n).toBeVisible(),await b.keyboard(`{Escape}`),await x(()=>y(n).not.toBeVisible()),await y(t.getByRole(`button`,{name:`Open queue`})).toHaveFocus()}},T={args:{children:null},render:()=>(0,v.jsxs)(_,{defaultOpen:!0,children:[(0,v.jsx)(f,{children:`Open navigation`}),(0,v.jsxs)(d,{side:`left`,children:[(0,v.jsxs)(g,{children:[(0,v.jsx)(u,{children:`Menu`}),(0,v.jsx)(h,{"aria-label":`Close menu`})]}),(0,v.jsx)(p,{children:(0,v.jsx)(`nav`,{"aria-label":`Primary`,children:(0,v.jsx)(`ul`,{style:{listStyle:`none`,margin:0,padding:0,display:`grid`,gap:`var(--space-1)`},children:[`Arrivals`,`Queue`,`Patients`,`Bookings`].map(e=>(0,v.jsx)(`li`,{children:e},e))})})})]})]})},E={args:{children:null},parameters:{viewport:{defaultViewport:`kura320`}},render:()=>(0,v.jsxs)(_,{defaultOpen:!0,children:[(0,v.jsx)(f,{children:`Review order`}),(0,v.jsxs)(d,{side:`bottom`,children:[(0,v.jsxs)(g,{children:[(0,v.jsxs)(`div`,{children:[(0,v.jsx)(u,{children:`Order cart`}),(0,v.jsx)(l,{children:`3 tests · $24.00`})]}),(0,v.jsx)(h,{"aria-label":`Close cart`})]}),(0,v.jsx)(p,{children:(0,v.jsxs)(`ul`,{style:{listStyle:`none`,margin:0,padding:0,display:`grid`,gap:`var(--space-2)`},children:[(0,v.jsxs)(`li`,{children:[`CBC `,(0,v.jsx)(s,{variant:`secondary`,children:`EDTA`})]}),(0,v.jsxs)(`li`,{children:[`HbA1c `,(0,v.jsx)(s,{variant:`secondary`,children:`EDTA`})]}),(0,v.jsxs)(`li`,{children:[`Lipid panel `,(0,v.jsx)(s,{variant:`secondary`,children:`SST`})]})]})}),(0,v.jsx)(m,{children:(0,v.jsx)(o,{variant:`primary`,children:`Continue to payment`})})]})]})},D={args:{children:null},render:()=>(0,v.jsxs)(_,{defaultOpen:!0,children:[(0,v.jsx)(f,{children:`Open draw worksheet`}),(0,v.jsxs)(d,{side:`right`,closeOnBackdrop:!1,children:[(0,v.jsx)(g,{children:(0,v.jsxs)(`div`,{children:[(0,v.jsx)(u,{children:`Draw in progress`}),(0,v.jsx)(l,{children:`Finish or defer before leaving this worksheet.`})]})}),(0,v.jsx)(p,{children:(0,v.jsx)(`p`,{style:{margin:0},children:`Backdrop clicks are ignored while a draw is active.`})}),(0,v.jsxs)(m,{children:[(0,v.jsx)(o,{variant:`outline`,children:`Defer draw`}),(0,v.jsx)(o,{variant:`primary`,children:`Complete draw`})]})]})]})},O={args:{children:null},render:()=>(0,v.jsxs)(_,{defaultOpen:!0,children:[(0,v.jsx)(f,{children:`Open visit context`}),(0,v.jsxs)(d,{side:`top`,children:[(0,v.jsxs)(g,{children:[(0,v.jsxs)(`div`,{children:[(0,v.jsx)(u,{children:`Visit context`}),(0,v.jsx)(l,{children:`Keep the verified encounter visible before continuing.`})]}),(0,v.jsx)(h,{"aria-label":`Close visit context`})]}),(0,v.jsx)(p,{children:(0,v.jsx)(`p`,{style:{margin:0},children:`Nguyễn Thị Minh Anh · verified identity · today’s consultation.`})})]})]})},k={args:{children:null},render:()=>(0,v.jsxs)(_,{defaultOpen:!0,children:[(0,v.jsx)(f,{children:`Edit contact details`}),(0,v.jsxs)(d,{side:`right`,children:[(0,v.jsxs)(g,{children:[(0,v.jsxs)(`div`,{children:[(0,v.jsx)(u,{children:`Edit contact details`}),(0,v.jsx)(l,{children:`Update operational contact information for this patient record.`})]}),(0,v.jsx)(h,{"aria-label":`Close contact details`})]}),(0,v.jsx)(p,{children:(0,v.jsxs)(i,{children:[(0,v.jsxs)(r,{children:[(0,v.jsx)(n,{htmlFor:`sheet-preferred-name`,children:`Preferred name`}),(0,v.jsx)(c,{id:`sheet-preferred-name`,defaultValue:`Minh Anh`})]}),(0,v.jsxs)(r,{children:[(0,v.jsx)(n,{htmlFor:`sheet-contact-phone`,children:`Contact phone`}),(0,v.jsx)(c,{id:`sheet-contact-phone`,defaultValue:`012 345 678`,inputMode:`tel`})]})]})}),(0,v.jsx)(m,{children:(0,v.jsx)(o,{variant:`primary`,children:`Save changes`})})]})]})},A={args:{children:null},render:()=>(0,v.jsxs)(_,{defaultOpen:!0,children:[(0,v.jsx)(f,{children:`Open result history`}),(0,v.jsxs)(d,{side:`right`,children:[(0,v.jsxs)(g,{children:[(0,v.jsxs)(`div`,{children:[(0,v.jsx)(u,{children:`Result history`}),(0,v.jsx)(l,{children:`Verified and amended values, newest first.`})]}),(0,v.jsx)(h,{"aria-label":`Close result history`})]}),(0,v.jsx)(p,{children:(0,v.jsx)(`ol`,{style:{display:`grid`,gap:`var(--space-4)`,margin:0,paddingInlineStart:`var(--space-5)`},children:Array.from({length:24},(e,t)=>(0,v.jsxs)(`li`,{children:[`Result review `,24-t,` · verified`]},t))})}),(0,v.jsx)(m,{children:(0,v.jsx)(o,{variant:`outline`,children:`Export history`})})]})]})},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Sheet>
      <SheetTrigger>Open queue</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <div>
            <SheetTitle>Waiting queue</SheetTitle>
            <SheetDescription>Longest wait first.</SheetDescription>
          </div>
          <SheetClose aria-label="Close queue" />
        </SheetHeader>
        <SheetBody>
          <p style={{
          margin: 0,
          font: 'inherit'
        }}>Queue content renders here.</p>
        </SheetBody>
      </SheetContent>
    </Sheet>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Open queue'
    }));
    const dialog = await canvas.findByRole('dialog');
    await expect(dialog).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(dialog).not.toBeVisible());
    await expect(canvas.getByRole('button', {
      name: 'Open queue'
    })).toHaveFocus();
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Sheet defaultOpen>
      <SheetTrigger>Open navigation</SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetClose aria-label="Close menu" />
        </SheetHeader>
        <SheetBody>
          <nav aria-label="Primary">
            <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'grid',
            gap: 'var(--space-1)'
          }}>
              {['Arrivals', 'Queue', 'Patients', 'Bookings'].map(item => <li key={item}>{item}</li>)}
            </ul>
          </nav>
        </SheetBody>
      </SheetContent>
    </Sheet>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  render: () => <Sheet defaultOpen>
      <SheetTrigger>Review order</SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <div>
            <SheetTitle>Order cart</SheetTitle>
            <SheetDescription>3 tests · $24.00</SheetDescription>
          </div>
          <SheetClose aria-label="Close cart" />
        </SheetHeader>
        <SheetBody>
          <ul style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'grid',
          gap: 'var(--space-2)'
        }}>
            <li>
              CBC <Badge variant="secondary">EDTA</Badge>
            </li>
            <li>
              HbA1c <Badge variant="secondary">EDTA</Badge>
            </li>
            <li>
              Lipid panel <Badge variant="secondary">SST</Badge>
            </li>
          </ul>
        </SheetBody>
        <SheetFooter>
          <Button variant="primary">Continue to payment</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Sheet defaultOpen>
      <SheetTrigger>Open draw worksheet</SheetTrigger>
      <SheetContent side="right" closeOnBackdrop={false}>
        <SheetHeader>
          <div>
            <SheetTitle>Draw in progress</SheetTitle>
            <SheetDescription>Finish or defer before leaving this worksheet.</SheetDescription>
          </div>
        </SheetHeader>
        <SheetBody>
          <p style={{
          margin: 0
        }}>Backdrop clicks are ignored while a draw is active.</p>
        </SheetBody>
        <SheetFooter>
          <Button variant="outline">Defer draw</Button>
          <Button variant="primary">Complete draw</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Sheet defaultOpen>
      <SheetTrigger>Open visit context</SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <div>
            <SheetTitle>Visit context</SheetTitle>
            <SheetDescription>Keep the verified encounter visible before continuing.</SheetDescription>
          </div>
          <SheetClose aria-label="Close visit context" />
        </SheetHeader>
        <SheetBody>
          <p style={{
          margin: 0
        }}>Nguyễn Thị Minh Anh · verified identity · today’s consultation.</p>
        </SheetBody>
      </SheetContent>
    </Sheet>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Sheet defaultOpen>
      <SheetTrigger>Edit contact details</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <div>
            <SheetTitle>Edit contact details</SheetTitle>
            <SheetDescription>Update operational contact information for this patient record.</SheetDescription>
          </div>
          <SheetClose aria-label="Close contact details" />
        </SheetHeader>
        <SheetBody>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="sheet-preferred-name">Preferred name</FieldLabel>
              <Input id="sheet-preferred-name" defaultValue="Minh Anh" />
            </Field>
            <Field>
              <FieldLabel htmlFor="sheet-contact-phone">Contact phone</FieldLabel>
              <Input id="sheet-contact-phone" defaultValue="012 345 678" inputMode="tel" />
            </Field>
          </FieldGroup>
        </SheetBody>
        <SheetFooter>
          <Button variant="primary">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Sheet defaultOpen>
      <SheetTrigger>Open result history</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <div>
            <SheetTitle>Result history</SheetTitle>
            <SheetDescription>Verified and amended values, newest first.</SheetDescription>
          </div>
          <SheetClose aria-label="Close result history" />
        </SheetHeader>
        <SheetBody>
          <ol style={{
          display: 'grid',
          gap: 'var(--space-4)',
          margin: 0,
          paddingInlineStart: 'var(--space-5)'
        }}>
            {Array.from({
            length: 24
          }, (_, index) => <li key={index}>Result review {24 - index} · verified</li>)}
          </ol>
        </SheetBody>
        <SheetFooter>
          <Button variant="outline">Export history</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
}`,...A.parameters?.docs?.source}}},j=[`Default`,`LeftNavigation`,`BottomMobile`,`NoBackdropDismiss`,`TopContext`,`FormContent`,`ScrollableContent`]}))();export{E as BottomMobile,w as Default,k as FormContent,T as LeftNavigation,D as NoBackdropDismiss,A as ScrollableContent,O as TopContext,j as __namedExportsOrder,C as default};