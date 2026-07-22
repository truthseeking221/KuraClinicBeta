import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{F as i,L as ee,P as te,c as a,j as ne,x as o}from"./provider-marks-BeHzyBjc.js";import{Ar as s,Bn as c,Br as l,Cr as u,Dr as d,Er as f,Fr as p,Gn as re,Gr as ie,Hr as m,In as h,Ir as g,Jr as ae,Kr as oe,Lr as _,Mn as se,Or as v,Pn as y,Rr as b,Sr as x,Tr as S,Ur as C,Vr as w,Wr as T,qr as E,t as D,wr as O,zr as k}from"./ui-C9kmmzkH.js";import{t as ce}from"./button-B6_zsN5-.js";import{i as le,l as ue,o as de,r as fe,t as A}from"./card-DMMaaphC.js";function j({label:e=`Context actions for the consultation draft`}){return(0,I.jsx)(ae,{"aria-label":e,className:`block w-full max-w-md`,tabIndex:0,children:(0,I.jsxs)(A,{children:[(0,I.jsxs)(de,{children:[(0,I.jsx)(ue,{children:`Consultation draft · Nguyễn Thị Ánh`}),(0,I.jsx)(le,{children:`Right-click or press Shift+F10 for secondary actions.`})]}),(0,I.jsx)(fe,{children:`The visible page actions remain available without using this accelerator.`})]})})}function M({menuLabel:e=`Consultation draft actions`,triggerLabel:t=`Context actions for the consultation draft`}){return(0,I.jsxs)(p,{children:[(0,I.jsx)(j,{label:t}),(0,I.jsx)(_,{"aria-label":e,children:(0,I.jsxs)(b,{children:[(0,I.jsx)(k,{children:`Open draft`}),(0,I.jsx)(k,{disabled:!0,children:`Open signed version`}),(0,I.jsx)(k,{children:`Refresh review status`})]})})]})}function N(){let[e,t]=(0,L.useState)(!1),[n,r]=(0,L.useState)(!0);return(0,I.jsxs)(p,{children:[(0,I.jsx)(j,{label:`Context actions for the review list`}),(0,I.jsxs)(_,{"aria-label":`Review list options`,children:[(0,I.jsx)(g,{checked:e,onCheckedChange:t,children:`Show archived drafts`}),(0,I.jsx)(g,{checked:n,onCheckedChange:r,children:`Show internal notes`})]})]})}function P(){let[e,t]=(0,L.useState)(`summary`);return(0,I.jsxs)(p,{children:[(0,I.jsx)(j,{label:`Context actions for the patient review`}),(0,I.jsxs)(_,{"aria-label":`Patient review view`,children:[(0,I.jsx)(l,{inset:!0,children:`Default view`}),(0,I.jsxs)(w,{value:e,onValueChange:t,children:[(0,I.jsx)(m,{value:`summary`,children:`Summary`}),(0,I.jsx)(m,{value:`timeline`,children:`Timeline`}),(0,I.jsx)(m,{value:`audit`,children:`Audit history`})]})]})]})}function F(){let[e,t]=(0,L.useState)(!1);return(0,I.jsxs)(x,{open:e,onOpenChange:t,children:[(0,I.jsxs)(p,{children:[(0,I.jsx)(j,{label:`Context actions for the unsent draft`}),(0,I.jsxs)(_,{"aria-label":`Unsent draft actions`,children:[(0,I.jsx)(k,{children:`Save local working copy`}),(0,I.jsx)(C,{}),(0,I.jsxs)(k,{variant:`destructive`,onClick:()=>t(!0),children:[(0,I.jsx)(te,{"aria-hidden":`true`}),`Request draft discard confirmation`]})]})]}),(0,I.jsxs)(S,{children:[(0,I.jsxs)(v,{children:[(0,I.jsx)(s,{children:`Discard unsent consultation draft?`}),(0,I.jsx)(f,{children:`This removes the local unsent draft. The audit record remains available to authorised reviewers.`})]}),(0,I.jsxs)(d,{children:[(0,I.jsx)(O,{children:`Keep draft`}),(0,I.jsx)(u,{variant:`destructive`,children:`Discard unsent draft`})]})]})]})}var I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$;t((()=>{I=r(),L=e(n()),D(),{expect:R,userEvent:z,within:B}=__STORYBOOK_MODULE_TEST__,V={title:`Design System/Components/Context Menu`,component:p,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,hierarchy:`Component`,evidence:`DropdownMenu is an anchored menu launched by an explicit Button or IconButton. ContextMenu has a cursor-positioned trigger and must provide a keyboard/touch-equivalent path, so it is not a DropdownMenu variant.`},source:{vendor:`ReUI`,registryItem:`@reui/context-menu — 10-example component family`,sourceUrl:`https://reui.io/components/context-menu`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-popover`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`optional-desktop-keyboard-accelerator-with-required-visible-touch-alternative`},useCase:{role:`Clinic staff and workspace administrators`,primaryTask:`Accelerate a small, secondary action on the current record without leaving context.`,primaryAction:`Choose one clearly labelled action that has an equally visible non-context-menu path.`,dataModel:`The owning feature supplies action labels, disabled/read-only state, selection state, handlers, and audit context.`,safety:`Context Menu is never the only route to a required action. Destructive entries must open AlertDialog or an equivalent feature-owned confirmation before mutation.`},mobile:{primaryTask:`Reach the same actions through an explicit visible control.`,minimumUsableWidth:`320px`,strategy:[`TRANSFORMING`],behavior:`The context surface is optional on touch. Consumers pair it with an explicit Button/DropdownMenu or another visible action pattern with 44px targets.`},exclusions:[`Profile, workspace, notification, user-and-create, and AI-selector demos are feature-owned compositions with identity, permission, loading, or notification contracts.`,`Searchable or comparison-heavy content belongs to Autocomplete, Combobox, Command, or the owning workflow rather than a context menu.`,`A menu item may request but never silently perform a high-consequence clinical, identity, access, payment, or deletion action.`]},docs:{description:{component:`A pointer and keyboard accelerator for a short list of secondary actions. It is never the sole entry point to essential work, and destructive actions must transition to explicit confirmation.`}}}},H={render:()=>(0,I.jsx)(M,{}),play:async({canvasElement:e})=>{let t=B(e).getByLabelText(`Context actions for the consultation draft`),n=t.getBoundingClientRect();await z.pointer({target:t,coords:{x:Math.round(n.left+n.width/2),y:Math.round(n.top+n.height/2)},keys:`[MouseRight]`});let r=B(e.ownerDocument.body).getByRole(`menu`,{name:`Consultation draft actions`});await R(r).toBeVisible(),R(r.getBoundingClientRect().left).toBeGreaterThan(0),R(r.getBoundingClientRect().top).toBeGreaterThan(0)}},U={render:()=>(0,I.jsxs)(p,{children:[(0,I.jsx)(j,{label:`Context actions for the review document`}),(0,I.jsxs)(_,{"aria-label":`Review document actions`,children:[(0,I.jsxs)(k,{children:[(0,I.jsx)(ee,{"aria-hidden":`true`}),`Edit review instructions`]}),(0,I.jsxs)(k,{children:[(0,I.jsx)(ne,{"aria-hidden":`true`}),`Copy review reference`]}),(0,I.jsxs)(k,{children:[(0,I.jsx)(i,{"aria-hidden":`true`}),`Export read-only summary`]}),(0,I.jsx)(C,{}),(0,I.jsxs)(k,{children:[(0,I.jsx)(a,{"aria-hidden":`true`}),`Archive local working copy`]})]})]})},W={render:()=>(0,I.jsxs)(p,{children:[(0,I.jsx)(j,{label:`Keyboard context actions for the consultation draft`}),(0,I.jsxs)(_,{"aria-label":`Keyboard consultation draft actions`,children:[(0,I.jsxs)(k,{children:[`Copy review reference`,(0,I.jsx)(T,{children:`⌘C`})]}),(0,I.jsxs)(k,{children:[`Export read-only summary`,(0,I.jsx)(T,{children:`⌘E`})]}),(0,I.jsx)(C,{}),(0,I.jsx)(k,{children:`Archive local working copy`})]})]}),play:async({canvasElement:e})=>{let t=B(e).getByLabelText(`Keyboard context actions for the consultation draft`);t.focus(),await z.keyboard(`{Shift>}{F10}{/Shift}`);let n=B(e.ownerDocument.body).getByRole(`menu`,{name:`Keyboard consultation draft actions`});await R(n).toBeVisible(),await z.keyboard(`{Escape}`),await R(n).not.toBeVisible(),await R(t).toHaveFocus()}},G={render:()=>(0,I.jsxs)(p,{children:[(0,I.jsx)(j,{label:`Context actions for the export draft`}),(0,I.jsxs)(_,{"aria-label":`Export draft actions`,children:[(0,I.jsx)(k,{children:`Copy secure review link`}),(0,I.jsxs)(ie,{children:[(0,I.jsx)(E,{children:`Export format`}),(0,I.jsxs)(oe,{"aria-label":`Export format`,children:[(0,I.jsxs)(k,{children:[(0,I.jsx)(i,{"aria-hidden":`true`}),`Download PDF`]}),(0,I.jsxs)(k,{children:[(0,I.jsx)(i,{"aria-hidden":`true`}),`Download CSV`]})]})]})]})]})},K={render:()=>(0,I.jsxs)(p,{children:[(0,I.jsx)(j,{label:`Context actions for follow-up draft`}),(0,I.jsxs)(_,{"aria-label":`Follow-up draft actions`,children:[(0,I.jsx)(l,{children:`Draft consultation`}),(0,I.jsx)(k,{children:`Review care plan`}),(0,I.jsx)(k,{children:`Copy audit reference`}),(0,I.jsx)(C,{}),(0,I.jsx)(l,{children:`Safe exits`}),(0,I.jsx)(k,{children:`Save local working copy`}),(0,I.jsx)(k,{children:`Close without changes`})]})]})},q={render:()=>(0,I.jsx)(N,{})},J={render:()=>(0,I.jsx)(P,{})},Y={render:()=>(0,I.jsx)(F,{})},X={render:()=>(0,I.jsxs)(p,{children:[(0,I.jsx)(j,{label:`Context actions near the viewport edge`}),(0,I.jsxs)(_,{align:`end`,side:`bottom`,"aria-label":`Viewport edge actions`,children:[(0,I.jsxs)(k,{children:[(0,I.jsx)(o,{"aria-hidden":`true`}),`Mark local review complete`]}),(0,I.jsx)(k,{children:`Open follow-up plan`})]})]})},Z={render:()=>(0,I.jsx)(x,{defaultOpen:!0,children:(0,I.jsxs)(S,{children:[(0,I.jsxs)(v,{children:[(0,I.jsx)(s,{children:`Review referral destination`}),(0,I.jsx)(f,{children:`Use the visible buttons to complete or cancel. The context menu offers optional review accelerators.`})]}),(0,I.jsxs)(p,{children:[(0,I.jsx)(j,{label:`Context actions for the referral review`}),(0,I.jsxs)(_,{"aria-label":`Referral review actions`,children:[(0,I.jsx)(k,{children:`Copy referral reference`}),(0,I.jsx)(k,{children:`Open permission details`})]})]}),(0,I.jsxs)(d,{children:[(0,I.jsx)(O,{children:`Close review`}),(0,I.jsx)(u,{children:`Continue to referral flow`})]})]})})},Q={parameters:{viewport:{defaultViewport:`kura320`}},render:()=>(0,I.jsxs)(`div`,{className:`grid w-full gap-4`,children:[(0,I.jsxs)(p,{children:[(0,I.jsx)(j,{label:`Optional context actions for the consultation draft`}),(0,I.jsxs)(_,{"aria-label":`Optional consultation draft actions`,children:[(0,I.jsx)(k,{children:`Copy review reference`}),(0,I.jsx)(k,{children:`Save local working copy`})]})]}),(0,I.jsxs)(se,{children:[(0,I.jsx)(re,{asChild:!0,children:(0,I.jsx)(ce,{variant:`outline`,disclosure:!0,children:`More consultation actions`})}),(0,I.jsxs)(y,{"aria-label":`More consultation actions`,children:[(0,I.jsx)(h,{children:`Copy review reference`}),(0,I.jsx)(h,{children:`Save local working copy`}),(0,I.jsx)(c,{}),(0,I.jsx)(h,{variant:`destructive`,children:`Request draft discard confirmation`})]})]})]})},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <BasicContextMenu />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByLabelText("Context actions for the consultation draft");
    const triggerRect = trigger.getBoundingClientRect();
    await userEvent.pointer({
      target: trigger,
      coords: {
        x: Math.round(triggerRect.left + triggerRect.width / 2),
        y: Math.round(triggerRect.top + triggerRect.height / 2)
      },
      keys: "[MouseRight]"
    });
    const body = within(canvasElement.ownerDocument.body);
    const menu = body.getByRole("menu", {
      name: "Consultation draft actions"
    });
    await expect(menu).toBeVisible();
    expect(menu.getBoundingClientRect().left).toBeGreaterThan(0);
    expect(menu.getBoundingClientRect().top).toBeGreaterThan(0);
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu>
      <RecordTarget label="Context actions for the review document" />
      <ContextMenuContent aria-label="Review document actions">
        <ContextMenuItem>
          <EditIcon aria-hidden="true" />
          Edit review instructions
        </ContextMenuItem>
        <ContextMenuItem>
          <CopyIcon aria-hidden="true" />
          Copy review reference
        </ContextMenuItem>
        <ContextMenuItem>
          <DownloadIcon aria-hidden="true" />
          Export read-only summary
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <ArchiveIcon aria-hidden="true" />
          Archive local working copy
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu>
      <RecordTarget label="Keyboard context actions for the consultation draft" />
      <ContextMenuContent aria-label="Keyboard consultation draft actions">
        <ContextMenuItem>
          Copy review reference
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Export read-only summary
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Archive local working copy</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByLabelText("Keyboard context actions for the consultation draft");
    trigger.focus();
    await userEvent.keyboard("{Shift>}{F10}{/Shift}");
    const body = within(canvasElement.ownerDocument.body);
    const menu = body.getByRole("menu", {
      name: "Keyboard consultation draft actions"
    });
    await expect(menu).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await expect(menu).not.toBeVisible();
    await expect(trigger).toHaveFocus();
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu>
      <RecordTarget label="Context actions for the export draft" />
      <ContextMenuContent aria-label="Export draft actions">
        <ContextMenuItem>Copy secure review link</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Export format</ContextMenuSubTrigger>
          <ContextMenuSubContent aria-label="Export format">
            <ContextMenuItem>
              <DownloadIcon aria-hidden="true" />
              Download PDF
            </ContextMenuItem>
            <ContextMenuItem>
              <DownloadIcon aria-hidden="true" />
              Download CSV
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu>
      <RecordTarget label="Context actions for follow-up draft" />
      <ContextMenuContent aria-label="Follow-up draft actions">
        <ContextMenuLabel>Draft consultation</ContextMenuLabel>
        <ContextMenuItem>Review care plan</ContextMenuItem>
        <ContextMenuItem>Copy audit reference</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>Safe exits</ContextMenuLabel>
        <ContextMenuItem>Save local working copy</ContextMenuItem>
        <ContextMenuItem>Close without changes</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <CheckboxPreferencesExample />
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <RadioPreferencesExample />
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <DestructiveActionExample />
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu>
      <RecordTarget label="Context actions near the viewport edge" />
      <ContextMenuContent align="end" side="bottom" aria-label="Viewport edge actions">
        <ContextMenuItem>
          <CheckIcon aria-hidden="true" />
          Mark local review complete
        </ContextMenuItem>
        <ContextMenuItem>Open follow-up plan</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Review referral destination</AlertDialogTitle>
          <AlertDialogDescription>
            Use the visible buttons to complete or cancel. The context menu
            offers optional review accelerators.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ContextMenu>
          <RecordTarget label="Context actions for the referral review" />
          <ContextMenuContent aria-label="Referral review actions">
            <ContextMenuItem>Copy referral reference</ContextMenuItem>
            <ContextMenuItem>Open permission details</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <AlertDialogFooter>
          <AlertDialogCancel>Close review</AlertDialogCancel>
          <AlertDialogAction>Continue to referral flow</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: "kura320"
    }
  },
  render: () => <div className="grid w-full gap-4">
      <ContextMenu>
        <RecordTarget label="Optional context actions for the consultation draft" />
        <ContextMenuContent aria-label="Optional consultation draft actions">
          <ContextMenuItem>Copy review reference</ContextMenuItem>
          <ContextMenuItem>Save local working copy</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" disclosure>
            More consultation actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent aria-label="More consultation actions">
          <DropdownMenuItem>Copy review reference</DropdownMenuItem>
          <DropdownMenuItem>Save local working copy</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            Request draft discard confirmation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
}`,...Q.parameters?.docs?.source}}},$=[`Basic`,`Icons`,`KeyboardShortcuts`,`NestedActions`,`LabelsAndSeparators`,`CheckboxItems`,`RadioItems`,`DestructiveConfirmation`,`Placement`,`InsideDialog`,`MobileVisibleAlternative`]}))();export{H as Basic,q as CheckboxItems,Y as DestructiveConfirmation,U as Icons,Z as InsideDialog,W as KeyboardShortcuts,K as LabelsAndSeparators,Q as MobileVisibleAlternative,G as NestedActions,X as Placement,J as RadioItems,$ as __namedExportsOrder,V as default};