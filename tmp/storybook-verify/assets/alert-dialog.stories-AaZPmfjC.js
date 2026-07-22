import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{P as n,Q as r,o as i}from"./provider-marks-BeHzyBjc.js";import{Ar as a,Cr as o,Dr as s,Er as c,Or as l,Sr as u,Tr as d,jr as f,kr as p,t as m,wr as h}from"./ui-C9kmmzkH.js";import{t as g}from"./button-B6_zsN5-.js";var _,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M;e((()=>{_=t(),m(),{expect:v,userEvent:y,within:b}=__STORYBOOK_MODULE_TEST__,x={title:`Design System/Components/Alert Dialog`,component:u,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`The fresh Storybook and source search found no canonical blocking confirmation overlay or dialog primitive. ReUI supplies the missing confirmation structure, while Kura owns the native-modal behavior, safety copy, action hierarchy, and responsive contract.`},source:{vendor:`ReUI`,registryItem:`c-alert-dialog-1 through c-alert-dialog-14`,sourceUrl:`https://reui.io/components/alert-dialog`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-modal`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`native-modal-with-mobile-action-stacking`},useCase:{role:`Clinic staff and workspace administrators making consequential changes`,primaryTask:`Understand an irreversible or workflow-disrupting consequence and choose the safe next action.`,dataModel:`Workflow-owned open state, human-readable consequence, optional media, and explicit cancel and action handlers.`,safety:`The component blocks background interaction, keeps cancel before destructive action in DOM order, uses native focus containment, and never dismisses on backdrop click.`,outOfScope:`Long forms, nested dialogs, billing, logout, generic success notifications, clinical acknowledgement rules, and checkbox or typed-confirmation gates owned by feature workflows.`},exclusions:[`Nested-dialog demos are excluded because Kura has no canonical Dialog owner yet; nested blocking overlays are unsafe and require a separate modal-stack contract.`,`Task success, ticket, billing, logout, account, and security-audit demos are feature workflows; Alert or a feature-owned confirmation composes this primitive with real data and permissions.`,`Checkbox and typed confirmation gates are excluded from the primitive because their validation, audit, and clinical consequence rules belong to the owning workflow and require canonical form controls.`,`Portal and overlay subcomponents are intentionally not public: AlertDialogContent owns one native modal surface to prevent duplicate scrims and unsafe layering.`]},docs:{description:{component:`A blocking confirmation dialog for irreversible or high-consequence actions. State the consequence plainly, preserve a safe cancel path, and use feature-owned confirmation rules for clinical acknowledgements or validated gates.`}}}},S={render:()=>(0,_.jsxs)(u,{children:[(0,_.jsx)(f,{asChild:!0,children:(0,_.jsx)(g,{variant:`outline`,children:`Remove draft`})}),(0,_.jsxs)(d,{children:[(0,_.jsxs)(l,{children:[(0,_.jsx)(a,{children:`Remove this draft?`}),(0,_.jsx)(c,{children:`This removes the unsent draft from your workspace. This action cannot be undone.`})]}),(0,_.jsxs)(s,{children:[(0,_.jsx)(h,{children:`Keep draft`}),(0,_.jsx)(o,{variant:`destructive`,children:`Remove draft`})]})]})]}),play:async({canvasElement:e})=>{let t=b(e),[n]=t.getAllByRole(`button`,{name:`Remove draft`});if(!n)throw Error(`Alert dialog trigger was not found.`);await y.click(n);let r=t.getByRole(`alertdialog`);await v(r).toHaveAttribute(`open`),await v(t.getByRole(`button`,{name:`Keep draft`})).toBeVisible(),await y.click(t.getByRole(`button`,{name:`Keep draft`})),await v(r).not.toHaveAttribute(`open`),await v(n).toHaveFocus()}},C={render:()=>(0,_.jsx)(u,{defaultOpen:!0,children:(0,_.jsxs)(d,{size:`sm`,children:[(0,_.jsxs)(l,{children:[(0,_.jsx)(a,{children:`Allow session sharing?`}),(0,_.jsx)(c,{children:`The selected colleague can view this record during the active consultation.`})]}),(0,_.jsxs)(s,{children:[(0,_.jsx)(h,{children:`Do not allow`}),(0,_.jsx)(o,{children:`Allow sharing`})]})]})})},w={render:()=>(0,_.jsx)(u,{defaultOpen:!0,children:(0,_.jsxs)(d,{children:[(0,_.jsxs)(l,{children:[(0,_.jsx)(p,{tone:`info`,children:(0,_.jsx)(r,{"aria-hidden":`true`})}),(0,_.jsx)(a,{children:`Start the record review?`}),(0,_.jsx)(c,{children:`Opening the review reserves this record for your current session until you finish or release it.`})]}),(0,_.jsxs)(s,{children:[(0,_.jsx)(h,{children:`Review later`}),(0,_.jsx)(o,{children:`Start review`})]})]})})},T={render:()=>(0,_.jsx)(u,{defaultOpen:!0,children:(0,_.jsxs)(d,{size:`sm`,children:[(0,_.jsxs)(l,{children:[(0,_.jsx)(p,{tone:`danger`,children:(0,_.jsx)(n,{"aria-hidden":`true`})}),(0,_.jsx)(a,{children:`Delete this attachment?`}),(0,_.jsx)(c,{children:`The file will be permanently removed from this draft. The clinical record itself will not change.`})]}),(0,_.jsxs)(s,{children:[(0,_.jsx)(h,{variant:`ghost`,children:`Cancel`}),(0,_.jsx)(o,{variant:`destructive`,children:`Delete attachment`})]})]})})},E={render:()=>(0,_.jsx)(u,{defaultOpen:!0,children:(0,_.jsxs)(d,{children:[(0,_.jsxs)(l,{children:[(0,_.jsx)(p,{tone:`warning`,children:(0,_.jsx)(i,{"aria-hidden":`true`})}),(0,_.jsx)(a,{children:`Leave without saving changes?`}),(0,_.jsx)(c,{children:`Your edits to the review note have not been saved. Leaving now discards those changes.`})]}),(0,_.jsxs)(s,{children:[(0,_.jsx)(h,{children:`Keep editing`}),(0,_.jsx)(o,{variant:`destructive`,children:`Discard changes`})]})]})})},D={render:()=>(0,_.jsx)(u,{defaultOpen:!0,children:(0,_.jsxs)(d,{size:`sm`,children:[(0,_.jsxs)(l,{children:[(0,_.jsx)(a,{children:`Remove the draft now?`}),(0,_.jsx)(c,{children:`The action is in progress. Keep this dialog open until the operation finishes.`})]}),(0,_.jsxs)(s,{children:[(0,_.jsx)(h,{disabled:!0,children:`Keep draft`}),(0,_.jsx)(o,{variant:`destructive`,loading:!0,closeOnAction:!1,children:`Removing draft`})]})]})})},O={render:()=>(0,_.jsx)(u,{defaultOpen:!0,children:(0,_.jsxs)(d,{closeOnEscape:!1,children:[(0,_.jsxs)(l,{children:[(0,_.jsx)(p,{tone:`warning`,children:(0,_.jsx)(i,{"aria-hidden":`true`})}),(0,_.jsx)(a,{children:`Review the policy change`}),(0,_.jsx)(c,{children:`This workspace policy changes who can access future records. Choose a visible action to continue.`})]}),(0,_.jsxs)(s,{children:[(0,_.jsx)(h,{children:`Cancel`}),(0,_.jsx)(o,{children:`Review policy`})]})]})})},k={render:()=>(0,_.jsx)(u,{defaultOpen:!0,children:(0,_.jsxs)(d,{children:[(0,_.jsxs)(l,{children:[(0,_.jsx)(a,{children:`Archive the inactive care-plan draft?`}),(0,_.jsx)(c,{children:`This draft is no longer visible in the active care-plan workspace. It remains in the audit history with its author and timestamp, but it cannot be edited or reopened as an active plan. Confirm that no current follow-up depends on this draft before archiving it.`})]}),(0,_.jsxs)(s,{children:[(0,_.jsx)(h,{children:`Keep active`}),(0,_.jsx)(o,{variant:`destructive`,children:`Archive draft`})]})]})})},A={render:()=>(0,_.jsx)(`div`,{className:`flex flex-wrap gap-3`,children:[`compact`,`cozy`,`comfortable`].map(e=>(0,_.jsx)(`div`,{"data-density":e,children:(0,_.jsxs)(u,{children:[(0,_.jsx)(f,{asChild:!0,children:(0,_.jsxs)(g,{variant:`outline`,children:[`Open `,e,` dialog`]})}),(0,_.jsxs)(d,{size:`sm`,children:[(0,_.jsxs)(l,{children:[(0,_.jsx)(a,{children:`Confirm review`}),(0,_.jsx)(c,{children:`Continue to the selected record review.`})]}),(0,_.jsxs)(s,{children:[(0,_.jsx)(h,{children:`Cancel`}),(0,_.jsx)(o,{children:`Continue review`})]})]})]})},e))})},j={parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,_.jsx)(u,{defaultOpen:!0,children:(0,_.jsxs)(d,{children:[(0,_.jsxs)(l,{children:[(0,_.jsx)(p,{tone:`danger`,children:(0,_.jsx)(n,{"aria-hidden":`true`})}),(0,_.jsx)(a,{children:`Delete the selected attachment?`}),(0,_.jsx)(c,{children:`The attachment is permanently removed from this draft. This action cannot be undone.`})]}),(0,_.jsxs)(s,{children:[(0,_.jsx)(h,{children:`Keep attachment`}),(0,_.jsx)(o,{variant:`destructive`,children:`Delete attachment`})]})]})})},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Remove draft</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove this draft?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes the unsent draft from your workspace. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep draft</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Remove draft</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const [trigger] = canvas.getAllByRole('button', {
      name: 'Remove draft'
    });
    if (!trigger) throw new Error('Alert dialog trigger was not found.');
    await userEvent.click(trigger);
    const dialog = canvas.getByRole('alertdialog');
    await expect(dialog).toHaveAttribute('open');
    await expect(canvas.getByRole('button', {
      name: 'Keep draft'
    })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Keep draft'
    }));
    await expect(dialog).not.toHaveAttribute('open');
    await expect(trigger).toHaveFocus();
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <AlertDialog defaultOpen>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Allow session sharing?</AlertDialogTitle>
          <AlertDialogDescription>
            The selected colleague can view this record during the active consultation.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Do not allow</AlertDialogCancel>
          <AlertDialogAction>Allow sharing</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia tone="info"><InformationIcon aria-hidden="true" /></AlertDialogMedia>
          <AlertDialogTitle>Start the record review?</AlertDialogTitle>
          <AlertDialogDescription>
            Opening the review reserves this record for your current session until you finish or release it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Review later</AlertDialogCancel>
          <AlertDialogAction>Start review</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <AlertDialog defaultOpen>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia tone="danger"><DeleteIcon aria-hidden="true" /></AlertDialogMedia>
          <AlertDialogTitle>Delete this attachment?</AlertDialogTitle>
          <AlertDialogDescription>
            The file will be permanently removed from this draft. The clinical record itself will not change.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete attachment</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia tone="warning"><WarningIcon aria-hidden="true" /></AlertDialogMedia>
          <AlertDialogTitle>Leave without saving changes?</AlertDialogTitle>
          <AlertDialogDescription>
            Your edits to the review note have not been saved. Leaving now discards those changes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep editing</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Discard changes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <AlertDialog defaultOpen>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Remove the draft now?</AlertDialogTitle>
          <AlertDialogDescription>
            The action is in progress. Keep this dialog open until the operation finishes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled>Keep draft</AlertDialogCancel>
          <AlertDialogAction variant="destructive" loading closeOnAction={false}>Removing draft</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <AlertDialog defaultOpen>
      <AlertDialogContent closeOnEscape={false}>
        <AlertDialogHeader>
          <AlertDialogMedia tone="warning"><AlertIcon aria-hidden="true" /></AlertDialogMedia>
          <AlertDialogTitle>Review the policy change</AlertDialogTitle>
          <AlertDialogDescription>
            This workspace policy changes who can access future records. Choose a visible action to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Review policy</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive the inactive care-plan draft?</AlertDialogTitle>
          <AlertDialogDescription>
            This draft is no longer visible in the active care-plan workspace. It remains in the audit history with its author and timestamp, but it cannot be edited or reopened as an active plan. Confirm that no current follow-up depends on this draft before archiving it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep active</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Archive draft</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-3">
      {(['compact', 'cozy', 'comfortable'] as const).map(density => <div key={density} data-density={density}>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Open {density} dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm review</AlertDialogTitle>
                <AlertDialogDescription>Continue to the selected record review.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue review</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>)}
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia tone="danger"><DeleteIcon aria-hidden="true" /></AlertDialogMedia>
          <AlertDialogTitle>Delete the selected attachment?</AlertDialogTitle>
          <AlertDialogDescription>
            The attachment is permanently removed from this draft. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep attachment</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete attachment</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...j.parameters?.docs?.source}}},M=[`Default`,`CompactConfirmation`,`WithMedia`,`DestructiveConfirmation`,`UnsavedChanges`,`PendingAction`,`ExplicitAcknowledgement`,`LongContent`,`DensityModes`,`MobileReference`]}))();export{C as CompactConfirmation,S as Default,A as DensityModes,T as DestructiveConfirmation,O as ExplicitAcknowledgement,k as LongContent,j as MobileReference,D as PendingAction,E as UnsavedChanges,w as WithMedia,M as __namedExportsOrder,x as default};