import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{Rt as i,fr as a,t as o}from"./ui-C9kmmzkH.js";import{a as s,c,d as l,i as u,l as d,o as f,r as p,s as m,u as h}from"./settings-modal-DFqsiPWF.js";import{t as g}from"./button-B6_zsN5-.js";import{t as _}from"./input-UaJWx_9h.js";var v,y,b,x,S,C,w,T,E=t((()=>{v=`_formStack_1iw2s_1`,y=`_controlled_1iw2s_6`,b=`_status_1iw2s_12`,x=`_supporting_1iw2s_13`,S=`_densityRow_1iw2s_20`,C=`_shortcutList_1iw2s_26`,w=`_shortcutRow_1iw2s_32`,T={formStack:v,controlled:y,status:b,supporting:x,densityRow:S,shortcutList:C,shortcutRow:w}}));function D(){return(0,O.jsxs)(p,{children:[(0,O.jsx)(l,{asChild:!0,children:(0,O.jsx)(g,{variant:`outline`,children:`Edit contact details`})}),(0,O.jsxs)(f,{children:[(0,O.jsxs)(d,{children:[(0,O.jsx)(h,{children:`Edit contact details`}),(0,O.jsx)(m,{children:`Update how the clinic contacts this patient. Saving does not change identity details.`})]}),(0,O.jsx)(u,{children:(0,O.jsxs)(`div`,{className:T.formStack,children:[(0,O.jsx)(_,{label:`Mobile number`,defaultValue:`+855 12 345 678`}),(0,O.jsx)(_,{label:`Email`,type:`email`,defaultValue:`sokha.chan@example.com`})]})}),(0,O.jsxs)(c,{children:[(0,O.jsx)(s,{asChild:!0,children:(0,O.jsx)(g,{variant:`ghost`,children:`Cancel`})}),(0,O.jsx)(s,{asChild:!0,children:(0,O.jsx)(g,{children:`Save contact details`})})]})]})]})}var O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q;t((()=>{O=r(),k=e(n()),o(),E(),{expect:A,userEvent:j,waitFor:M,within:N}=__STORYBOOK_MODULE_TEST__,P={title:`Design System/Components/Dialog`,component:p,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`REUSE-and-EXTEND`,owner:`src/components/ui`,evidence:`The canonical Radix-backed Kura owner already matches the complete ReUI dialog family: focus containment, Escape dismissal, scrollable and sticky regions, optional/custom close actions, full-screen presentation, and responsive action stacking. The intake therefore extends stories and evidence instead of installing a duplicate registry owner.`},source:{vendor:`ReUI`,registryItem:`dialog and c-dialog-1 through c-dialog-10`,sourceUrl:`https://reui.io/components/dialog`,mcpValidation:`All ten c-dialog items verified free through ReUI MCP on 2026-07-17.`,provenance:`c-dialog-1 e78e386e; 2 643305a0; 3 a26727a0; 4 445c9f61; 5 72ed97c0; 6 866225fb; 7 2a719a86; 8 8f6a01f6; 9 00e9d337; 10 074ce468`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura-overlay`,elevation:`kura-modal`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`TRANSFORMING: full-screen task surface by default below 480px`,motion:`radix-state-with-reduced-motion-safe-static-layout`},exclusions:[{reuiExample:`Destructive confirmation dialog`,reason:`Consequential confirmation requires alertdialog semantics and explicit safe/cancel behavior.`,replacement:`AlertDialog`},{reuiExample:`Cookie consent dialog`,reason:`Consent categories, persistence, decline parity, and policy links are product-domain behavior.`,replacement:`Feature-owned consent composition using Dialog and canonical form controls.`},{reuiExample:`Session expired full-width action`,reason:`Authentication recovery and draft preservation are shell-owned workflow rules.`,replacement:`Feature-owned recovery state composed with Dialog.`}],coverage:{retained:`c-dialog-1 basic; 2 scrollable; 3 sticky footer; 4 no corner close; 5 custom close action; 6 full-screen; 9 shortcuts; 10 full-width mobile action.`,composedElsewhere:`c-dialog-7 uses AlertDialog for destructive confirmation. c-dialog-8 remains a feature-owned consent composition using Dialog, Switch, and policy behavior.`}},docs:{description:{component:`A modal work surface for short, reversible tasks. It traps and restores focus, closes with Escape, supports scrollable bodies and sticky action areas, and transforms to a full-screen task surface on mobile by default.`}}}},F={render:()=>(0,O.jsx)(D,{}),play:async({canvasElement:e})=>{let t=N(e).getByRole(`button`,{name:/edit contact details/i});await j.click(t);let n=await N(document.body).findByRole(`dialog`,{name:/edit contact details/i});await A(N(n).getByLabelText(/mobile number/i)).toHaveFocus(),await j.click(N(n).getByRole(`button`,{name:/cancel/i})),await M(()=>A(n).not.toBeInTheDocument()),await A(t).toHaveFocus()}},I={render:()=>(0,O.jsx)(p,{defaultOpen:!0,children:(0,O.jsxs)(f,{children:[(0,O.jsxs)(d,{children:[(0,O.jsx)(h,{children:`Edit contact details`}),(0,O.jsx)(m,{children:`Update how the clinic contacts this patient. Saving does not change identity details.`})]}),(0,O.jsx)(u,{children:(0,O.jsxs)(`div`,{className:T.formStack,children:[(0,O.jsx)(_,{label:`Mobile number`,defaultValue:`+855 12 345 678`}),(0,O.jsx)(_,{label:`Email`,type:`email`,defaultValue:`sokha.chan@example.com`})]})}),(0,O.jsxs)(c,{children:[(0,O.jsx)(s,{asChild:!0,children:(0,O.jsx)(g,{variant:`ghost`,children:`Cancel`})}),(0,O.jsx)(s,{asChild:!0,children:(0,O.jsx)(g,{children:`Save contact details`})})]})]})})},L={render:()=>(0,O.jsxs)(p,{children:[(0,O.jsx)(l,{asChild:!0,children:(0,O.jsx)(g,{variant:`outline`,children:`Review imported records`})}),(0,O.jsxs)(f,{size:`lg`,children:[(0,O.jsxs)(d,{children:[(0,O.jsx)(h,{children:`Review imported records`}),(0,O.jsx)(m,{children:`Confirm the source and resolve missing identifiers before adding records.`})]}),(0,O.jsx)(u,{children:(0,O.jsx)(`div`,{className:T.formStack,children:Array.from({length:12},(e,t)=>(0,O.jsxs)(a,{defaultChecked:t<8,children:[`Record `,t+1,` · imported from Toul Kork Branch`]},t))})}),(0,O.jsxs)(c,{children:[(0,O.jsx)(s,{asChild:!0,children:(0,O.jsx)(g,{variant:`ghost`,children:`Cancel import`})}),(0,O.jsx)(g,{children:`Import selected records`})]})]})]})},R={render:()=>(0,O.jsxs)(p,{children:[(0,O.jsx)(l,{asChild:!0,children:(0,O.jsx)(g,{variant:`outline`,children:`Open review`})}),(0,O.jsxs)(f,{showCloseButton:!1,size:`sm`,mobilePresentation:`dialog`,children:[(0,O.jsxs)(d,{children:[(0,O.jsx)(h,{children:`Review complete`}),(0,O.jsx)(m,{children:`No unresolved fields remain in this import.`})]}),(0,O.jsx)(c,{children:(0,O.jsx)(s,{asChild:!0,children:(0,O.jsx)(g,{fullWidth:!0,children:`Return to records`})})})]})]})},z={render:()=>{let[e,t]=(0,k.useState)(!1);return(0,O.jsxs)(`div`,{className:T.controlled,children:[(0,O.jsx)(g,{variant:`outline`,onClick:()=>t(!0),children:`Open controlled dialog`}),(0,O.jsxs)(`span`,{"aria-live":`polite`,className:T.status,children:[`Dialog is `,e?`open`:`closed`,`.`]}),(0,O.jsx)(p,{open:e,onOpenChange:t,children:(0,O.jsxs)(f,{size:`sm`,mobilePresentation:`dialog`,children:[(0,O.jsxs)(d,{children:[(0,O.jsx)(h,{children:`Controlled review`}),(0,O.jsx)(m,{children:`The owning workflow controls visibility.`})]}),(0,O.jsx)(c,{children:(0,O.jsx)(s,{asChild:!0,children:(0,O.jsx)(g,{children:`Finish review`})})})]})})]})}},B={render:()=>(0,O.jsxs)(p,{children:[(0,O.jsx)(l,{asChild:!0,children:(0,O.jsx)(g,{variant:`outline`,children:`Open full record review`})}),(0,O.jsxs)(f,{size:`full`,children:[(0,O.jsxs)(d,{children:[(0,O.jsx)(h,{children:`Review imported patient records`}),(0,O.jsx)(m,{children:`Compare identifiers and contact details without losing the import context.`})]}),(0,O.jsx)(u,{children:(0,O.jsx)(`p`,{className:T.supporting,children:`A full-screen dialog is reserved for a bounded task that still needs modal context. Long multi-step clinical work belongs on a page or flow.`})}),(0,O.jsxs)(c,{children:[(0,O.jsx)(s,{asChild:!0,children:(0,O.jsx)(g,{variant:`ghost`,children:`Return without changes`})}),(0,O.jsx)(g,{children:`Save reviewed records`})]})]})]})},V={render:()=>(0,O.jsxs)(p,{children:[(0,O.jsx)(l,{asChild:!0,children:(0,O.jsx)(g,{variant:`outline`,children:`Review clinic guidance`})}),(0,O.jsxs)(f,{size:`lg`,children:[(0,O.jsxs)(d,{children:[(0,O.jsx)(h,{children:`Guidance for resolving a duplicate patient record with a long verified name`}),(0,O.jsx)(m,{children:`Read the complete identity and audit guidance before deciding which record should remain active.`})]}),(0,O.jsx)(u,{children:(0,O.jsx)(`p`,{className:T.supporting,children:`Compare verified identifiers, date of birth, contact history, consent, linked consultations, laboratory orders, prescriptions, and audit events. Do not merge records when identity evidence conflicts or when the current role lacks the required permission.`})}),(0,O.jsx)(c,{children:(0,O.jsx)(s,{asChild:!0,children:(0,O.jsx)(g,{variant:`outline`,children:`Close guidance`})})})]})]})},H={render:()=>(0,O.jsx)(`div`,{className:T.densityRow,children:[`compact`,`cozy`,`comfortable`].map(e=>(0,O.jsx)(`div`,{"data-density":e,children:(0,O.jsxs)(p,{children:[(0,O.jsx)(l,{asChild:!0,children:(0,O.jsxs)(g,{variant:`outline`,children:[`Open `,e]})}),(0,O.jsxs)(f,{size:`sm`,mobilePresentation:`dialog`,children:[(0,O.jsxs)(d,{children:[(0,O.jsxs)(h,{children:[e,` dialog`]}),(0,O.jsx)(m,{children:`Density changes spacing, not semantics or legibility.`})]}),(0,O.jsx)(c,{children:(0,O.jsx)(s,{asChild:!0,children:(0,O.jsx)(g,{children:`Close`})})})]})]})},e))})},U={parameters:{viewport:{defaultViewport:`kura320`}},render:()=>(0,O.jsx)(D,{})},W={parameters:{viewport:{defaultViewport:`kura320`}},render:()=>(0,O.jsxs)(p,{children:[(0,O.jsx)(l,{asChild:!0,children:(0,O.jsx)(g,{variant:`outline`,children:`View short notice`})}),(0,O.jsxs)(f,{size:`sm`,mobilePresentation:`dialog`,children:[(0,O.jsxs)(d,{children:[(0,O.jsx)(h,{children:`Draft preserved`}),(0,O.jsx)(m,{children:`Your current changes remain available on this device.`})]}),(0,O.jsx)(c,{children:(0,O.jsx)(s,{asChild:!0,children:(0,O.jsx)(g,{children:`Continue editing`})})})]})]})},G={render:()=>(0,O.jsx)(p,{defaultOpen:!0,children:(0,O.jsxs)(f,{size:`sm`,mobilePresentation:`dialog`,children:[(0,O.jsxs)(d,{children:[(0,O.jsx)(h,{children:`Keyboard shortcuts`}),(0,O.jsx)(m,{children:`Use these shortcuts while reviewing the current record.`})]}),(0,O.jsx)(u,{children:(0,O.jsxs)(`dl`,{className:T.shortcutList,children:[(0,O.jsxs)(`div`,{className:T.shortcutRow,children:[(0,O.jsx)(`dt`,{children:`Close this dialog`}),(0,O.jsx)(`dd`,{children:(0,O.jsx)(i,{children:`Esc`})})]}),(0,O.jsxs)(`div`,{className:T.shortcutRow,children:[(0,O.jsx)(`dt`,{children:`Move to the next field`}),(0,O.jsx)(`dd`,{children:(0,O.jsx)(i,{children:`Tab`})})]})]})}),(0,O.jsx)(c,{children:(0,O.jsx)(s,{asChild:!0,children:(0,O.jsx)(g,{fullWidth:!0,children:`Return to record`})})})]})})},K={render:()=>(0,O.jsx)(D,{}),play:async({canvasElement:e})=>{let t=N(e).getByRole(`button`,{name:/edit contact details/i});await j.click(t),await N(document.body).findByRole(`dialog`,{name:/edit contact details/i}),await j.keyboard(`{Escape}`),await M(()=>A(N(document.body).queryByRole(`dialog`,{name:/edit contact details/i})).not.toBeInTheDocument()),await A(t).toHaveFocus()}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <EditContactDialog />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const opener = canvas.getByRole('button', {
      name: /edit contact details/i
    });
    await userEvent.click(opener);
    const dialog = await within(document.body).findByRole('dialog', {
      name: /edit contact details/i
    });
    await expect(within(dialog).getByLabelText(/mobile number/i)).toHaveFocus();
    await userEvent.click(within(dialog).getByRole('button', {
      name: /cancel/i
    }));
    await waitFor(() => expect(dialog).not.toBeInTheDocument());
    await expect(opener).toHaveFocus();
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit contact details</DialogTitle>
          <DialogDescription>
            Update how the clinic contacts this patient. Saving does not change identity details.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className={styles.formStack}>
            <Input label="Mobile number" defaultValue="+855 12 345 678" />
            <Input label="Email" type="email" defaultValue="sokha.chan@example.com" />
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
          <DialogClose asChild><Button>Save contact details</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Review imported records</Button>
      </DialogTrigger>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Review imported records</DialogTitle>
          <DialogDescription>
            Confirm the source and resolve missing identifiers before adding records.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className={styles.formStack}>
            {Array.from({
            length: 12
          }, (_, index) => <Checkbox key={index} defaultChecked={index < 8}>
                Record {index + 1} · imported from Toul Kork Branch
              </Checkbox>)}
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild><Button variant="ghost">Cancel import</Button></DialogClose>
          <Button>Import selected records</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild><Button variant="outline">Open review</Button></DialogTrigger>
      <DialogContent showCloseButton={false} size="sm" mobilePresentation="dialog">
        <DialogHeader>
          <DialogTitle>Review complete</DialogTitle>
          <DialogDescription>No unresolved fields remain in this import.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild><Button fullWidth>Return to records</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <div className={styles.controlled}>
        <Button variant="outline" onClick={() => setOpen(true)}>Open controlled dialog</Button>
        <span aria-live="polite" className={styles.status}>
          Dialog is {open ? 'open' : 'closed'}.
        </span>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent size="sm" mobilePresentation="dialog">
            <DialogHeader>
              <DialogTitle>Controlled review</DialogTitle>
              <DialogDescription>The owning workflow controls visibility.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild><Button>Finish review</Button></DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>;
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild><Button variant="outline">Open full record review</Button></DialogTrigger>
      <DialogContent size="full">
        <DialogHeader>
          <DialogTitle>Review imported patient records</DialogTitle>
          <DialogDescription>
            Compare identifiers and contact details without losing the import context.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className={styles.supporting}>
            A full-screen dialog is reserved for a bounded task that still needs modal context.
            Long multi-step clinical work belongs on a page or flow.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild><Button variant="ghost">Return without changes</Button></DialogClose>
          <Button>Save reviewed records</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild><Button variant="outline">Review clinic guidance</Button></DialogTrigger>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Guidance for resolving a duplicate patient record with a long verified name</DialogTitle>
          <DialogDescription>
            Read the complete identity and audit guidance before deciding which record should remain active.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className={styles.supporting}>
            Compare verified identifiers, date of birth, contact history, consent, linked consultations,
            laboratory orders, prescriptions, and audit events. Do not merge records when identity evidence
            conflicts or when the current role lacks the required permission.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild><Button variant="outline">Close guidance</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <div className={styles.densityRow}>
      {(['compact', 'cozy', 'comfortable'] as const).map(density => <div data-density={density} key={density}>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open {density}</Button>
            </DialogTrigger>
            <DialogContent size="sm" mobilePresentation="dialog">
              <DialogHeader>
                <DialogTitle>{density} dialog</DialogTitle>
                <DialogDescription>Density changes spacing, not semantics or legibility.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild><Button>Close</Button></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>)}
    </div>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  render: () => <EditContactDialog />
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  render: () => <Dialog>
      <DialogTrigger asChild><Button variant="outline">View short notice</Button></DialogTrigger>
      <DialogContent size="sm" mobilePresentation="dialog">
        <DialogHeader>
          <DialogTitle>Draft preserved</DialogTitle>
          <DialogDescription>Your current changes remain available on this device.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild><Button>Continue editing</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog defaultOpen>
      <DialogContent size="sm" mobilePresentation="dialog">
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
          <DialogDescription>Use these shortcuts while reviewing the current record.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <dl className={styles.shortcutList}>
            <div className={styles.shortcutRow}>
              <dt>Close this dialog</dt>
              <dd><Kbd>Esc</Kbd></dd>
            </div>
            <div className={styles.shortcutRow}>
              <dt>Move to the next field</dt>
              <dd><Kbd>Tab</Kbd></dd>
            </div>
          </dl>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild><Button fullWidth>Return to record</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <EditContactDialog />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const opener = canvas.getByRole('button', {
      name: /edit contact details/i
    });
    await userEvent.click(opener);
    await within(document.body).findByRole('dialog', {
      name: /edit contact details/i
    });
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(within(document.body).queryByRole('dialog', {
      name: /edit contact details/i
    })).not.toBeInTheDocument());
    await expect(opener).toHaveFocus();
  }
}`,...K.parameters?.docs?.source}}},q=[`Default`,`OpenState`,`ScrollableContent`,`WithoutCornerClose`,`Controlled`,`FullScreen`,`LongContent`,`DensityModes`,`MobileFullScreen`,`MobileInset`,`KeyboardShortcuts`,`KeyboardDismissal`]}))();export{z as Controlled,F as Default,H as DensityModes,B as FullScreen,K as KeyboardDismissal,G as KeyboardShortcuts,V as LongContent,U as MobileFullScreen,W as MobileInset,I as OpenState,L as ScrollableContent,R as WithoutCornerClose,q as __namedExportsOrder,P as default};