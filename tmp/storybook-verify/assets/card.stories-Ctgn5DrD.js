import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{Z as n}from"./provider-marks-BeHzyBjc.js";import{li as r,t as i}from"./ui-C9kmmzkH.js";import{t as a}from"./button-B6_zsN5-.js";import{a as o}from"./collapsible-Cfc9M9oP.js";import{a as s,c,i as l,l as u,n as d,o as f,r as p,s as m,t as h}from"./card-DMMaaphC.js";function g({label:e}){return(0,_.jsxs)(`div`,{className:`flex size-full flex-col items-center justify-center gap-[var(--space-stack-control)] bg-muted p-[var(--space-inset-card)] text-center text-muted-foreground`,"aria-label":e,children:[(0,_.jsx)(n,{"aria-hidden":`true`}),(0,_.jsx)(`span`,{className:`text-sm`,children:e})]})}var _,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R;e((()=>{_=t(),i(),{expect:v,within:y}=__STORYBOOK_MODULE_TEST__,b={title:`Design System/Components/Card`,component:h,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`The fresh Storybook index, canonical exports, source, and product-pattern search found Kura card tokens and repeated ad-hoc card-shaped surfaces, but no canonical Card implementation. The new owner removes that foundational duplication while keeping workflow behavior outside the primitive.`},source:{vendor:`ReUI`,registryItem:`c-card-1 through c-card-18`,sourceUrl:`https://reui.io/components/card`},binding:{colors:`kura-semantic-card-and-muted`,typography:`kura-component-title-body-and-metadata`,spacing:`kura-card-inset-and-density`,radius:`kura-card-surface`,elevation:`kura-flat-card`,icons:`kura-canonical`,density:`kura-root-attribute-with-explicit-size-override`,responsive:`fluid-wrapping-with-mobile-action-stacking`},useCase:{role:`Any Kura user reviewing one meaningful content unit within a larger workflow`,primaryTask:`Understand one grouped unit, its current context, and the next relevant action without confusing it with surrounding content.`,dataModel:`Semantic card structure with optional header metadata, title, description, action region, content, media, footer, and meaningful section dividers.`,safety:`The primitive does not assign clinical status, permissions, selection, navigation, or consequences. Those remain visible, explicit responsibilities of the owning composition.`,outOfScope:`Authentication forms, billing usage, deployment summaries, metric logic, dropdown menus, whole-card navigation, hover-only actions, image overlays, stacked decoration, and domain-specific workflows.`},exclusions:[`ReUI login, billing, deployment, revenue, integration, and profile examples are task-level compositions. Their data, validation, permissions, and recovery belong to feature or shared-pattern owners.`,`Dropdown and expandable examples require canonical menu or disclosure owners; Card only supplies the action and content slots used by those compositions.`,`Hover-scale image overlays and whole-card click behavior are excluded because essential meaning and actions must not depend on hover or create nested interactive targets.`,`Stacked depth and gradient-fade examples are decorative rather than structural. Kura cards remain flat and use border, spacing, and hierarchy before elevation.`,`Skeleton decoration is excluded until Kura has a canonical Skeleton owner; loading is represented accessibly with aria-busy and explicit status content.`]},docs:{description:{component:"A flat surface for one meaningful content unit. The default card is a gray tray on the white page — contrast only, no border or shadow. Nest white `tile` cards inside a tray when an inner unit needs its own surface. Use a card only when the boundary clarifies ownership, state, comparison, or action; leave ordinary page sections unboxed."}}},argTypes:{as:{control:`radio`,options:[`article`,`section`,`div`]},size:{control:`radio`,options:[void 0,`sm`,`md`]},variant:{control:`radio`,options:[void 0,`elevated`,`outline`,`tile`]},dividers:{control:`boolean`}}},x={render:()=>(0,_.jsxs)(h,{className:`max-w-md`,"aria-labelledby":`record-review-title`,children:[(0,_.jsxs)(f,{children:[(0,_.jsx)(c,{children:`Updated 4 minutes ago`}),(0,_.jsx)(u,{id:`record-review-title`,children:`Record ready for review`}),(0,_.jsx)(l,{children:`Latest details are available. One attachment is still processing.`})]}),(0,_.jsxs)(s,{children:[(0,_.jsx)(a,{variant:`outline`,children:`Review later`}),(0,_.jsx)(a,{children:`Open review`})]})]}),play:async({canvasElement:e})=>{let t=y(e),n=t.getByRole(`article`,{name:`Record ready for review`});await v(n).toHaveAttribute(`data-slot`,`card`),await v(t.getByRole(`button`,{name:`Open review`})).toBeVisible()}},S={render:()=>(0,_.jsxs)(`div`,{className:`grid w-full max-w-3xl gap-[var(--space-inset-card)] md:grid-cols-2`,children:[(0,_.jsx)(h,{size:`sm`,children:(0,_.jsxs)(f,{children:[(0,_.jsx)(c,{children:`2 items`}),(0,_.jsx)(u,{children:`Results to review`}),(0,_.jsx)(l,{children:`Review before the end of this shift.`})]})}),(0,_.jsx)(h,{size:`md`,children:(0,_.jsxs)(f,{children:[(0,_.jsx)(c,{children:`2 items`}),(0,_.jsx)(u,{children:`Results to review`}),(0,_.jsx)(l,{children:`Review before the end of this shift.`})]})})]})},C={parameters:{docs:{description:{story:`Outline replaces the shadow with a hairline border in every theme. Use it for dense card grids, where repeated shadows read as noise, and for cards nested inside panels or drawers, where a shadow implies false elevation.`}}},render:()=>(0,_.jsx)(`div`,{className:`grid w-full max-w-3xl gap-[var(--space-inset-card)] md:grid-cols-2`,children:[[`Haematology`,`2 results awaiting review`],[`Clinical chemistry`,`5 results awaiting review`],[`Microbiology`,`1 result awaiting review`],[`Immunology`,`No results awaiting review`]].map(([e,t],n)=>(0,_.jsx)(h,{variant:`outline`,size:`sm`,"aria-labelledby":`outline-card-title-${n}`,children:(0,_.jsxs)(f,{children:[(0,_.jsx)(c,{children:`Current shift`}),(0,_.jsx)(u,{id:`outline-card-title-${n}`,children:e}),(0,_.jsx)(l,{children:t})]})},e))}),play:async({canvasElement:e})=>{let t=y(e).getByRole(`article`,{name:`Haematology`});await v(t).toHaveAttribute(`data-variant`,`outline`)}},w={parameters:{docs:{description:{story:`The surface sandwich: a gray tray card groups related units on the white page, and each unit that needs its own surface renders as a white tile with a feather shadow. Tiles never nest inside tiles.`}}},render:()=>(0,_.jsxs)(h,{className:`max-w-md`,"aria-labelledby":`tray-title`,children:[(0,_.jsxs)(f,{children:[(0,_.jsx)(u,{id:`tray-title`,children:`Today's results`}),(0,_.jsx)(l,{children:`Two panels returned since this morning.`})]}),(0,_.jsx)(p,{children:(0,_.jsx)(`div`,{className:`grid gap-[var(--space-control-gap)]`,children:[[`Lipid panel`,`Sokha Chan · returned 08:12`],[`HbA1c`,`Dara Phally · returned 09:45`]].map(([e,t],n)=>(0,_.jsx)(h,{variant:`tile`,size:`sm`,"aria-labelledby":`tile-title-${n}`,children:(0,_.jsxs)(f,{children:[(0,_.jsx)(u,{as:`h4`,id:`tile-title-${n}`,children:e}),(0,_.jsx)(l,{children:t})]})},e))})})]}),play:async({canvasElement:e})=>{let t=y(e).getByRole(`article`,{name:`Lipid panel`});await v(t).toHaveAttribute(`data-variant`,`tile`)}},T={render:()=>(0,_.jsxs)(h,{className:`max-w-md`,dividers:!0,children:[(0,_.jsxs)(f,{children:[(0,_.jsx)(c,{children:`Record access`}),(0,_.jsx)(u,{children:`Reviewer access`}),(0,_.jsx)(l,{children:`Reviewers can view this record. Only the owner can edit it.`})]}),(0,_.jsxs)(s,{align:`between`,children:[(0,_.jsx)(o,{variant:`neutral`,children:`Read only`}),(0,_.jsx)(a,{variant:`outline`,children:`View policy`})]})]})},E={render:()=>(0,_.jsx)(h,{className:`max-w-lg`,children:(0,_.jsxs)(f,{children:[(0,_.jsx)(c,{children:`3 files · 1 still processing`}),(0,_.jsx)(u,{children:`Attachments`}),(0,_.jsx)(l,{children:`Files available in this review.`}),(0,_.jsx)(d,{children:(0,_.jsx)(a,{size:`sm`,variant:`outline`,children:`Manage`})})]})})},D={render:()=>(0,_.jsxs)(`div`,{className:`grid w-full max-w-3xl gap-[var(--space-inset-card)] md:grid-cols-2`,children:[(0,_.jsxs)(h,{children:[(0,_.jsx)(m,{children:(0,_.jsx)(r,{ratio:16/9,children:(0,_.jsx)(g,{label:`Document preview`})})}),(0,_.jsxs)(f,{children:[(0,_.jsx)(c,{children:`Uploaded today · 09:42`}),(0,_.jsx)(u,{children:`Referral letter`}),(0,_.jsx)(l,{children:`Attached to this review.`})]}),(0,_.jsx)(s,{children:(0,_.jsx)(a,{variant:`outline`,children:`Open`})})]}),(0,_.jsxs)(h,{children:[(0,_.jsx)(m,{placement:`inset`,children:(0,_.jsx)(r,{ratio:16/9,children:(0,_.jsx)(g,{label:`Identity preview`})})}),(0,_.jsxs)(f,{children:[(0,_.jsx)(c,{children:`Identity check`}),(0,_.jsx)(u,{children:`Identity document`}),(0,_.jsx)(l,{children:`Verify the visible details before use.`})]}),(0,_.jsx)(s,{children:(0,_.jsx)(a,{variant:`outline`,children:`Review`})})]})]})},O={render:()=>(0,_.jsxs)(h,{className:`max-w-md`,dividers:!0,children:[(0,_.jsxs)(f,{children:[(0,_.jsx)(c,{children:`Checked at 10:18`}),(0,_.jsx)(u,{children:`External results delayed`}),(0,_.jsx)(l,{children:`Results may arrive late. A missing result does not confirm a negative finding.`}),(0,_.jsx)(d,{mobileLayout:`inline`,children:(0,_.jsx)(o,{variant:`warning`,dot:!0,children:`Delayed`})})]}),(0,_.jsx)(s,{children:(0,_.jsx)(a,{variant:`outline`,children:`View status`})})]})},k={render:()=>(0,_.jsxs)(h,{size:`sm`,className:`max-w-sm`,"aria-labelledby":`pending-review-title`,children:[(0,_.jsxs)(f,{children:[(0,_.jsx)(c,{children:`Current shift`}),(0,_.jsx)(u,{id:`pending-review-title`,children:`Pending reviews`}),(0,_.jsx)(d,{mobileLayout:`inline`,children:(0,_.jsx)(o,{variant:`warning`,children:`4 new`})})]}),(0,_.jsxs)(p,{children:[(0,_.jsx)(`div`,{className:`text-2xl font-semibold tabular-nums`,children:`12`}),(0,_.jsx)(`p`,{className:`mt-[var(--space-stack-control)] text-sm text-muted-foreground`,children:`4 added since the last shift.`})]})]})},A={render:()=>(0,_.jsxs)(h,{className:`max-w-md`,children:[(0,_.jsxs)(f,{children:[(0,_.jsx)(c,{children:`Review checklist`}),(0,_.jsx)(u,{children:`Missing information?`}),(0,_.jsx)(l,{children:`Check what to verify and when to request more details.`})]}),(0,_.jsx)(s,{align:`start`,children:(0,_.jsx)(a,{variant:`link`,children:`Open checklist`})})]})},j={render:()=>(0,_.jsxs)(h,{className:`max-w-md`,"aria-busy":`true`,children:[(0,_.jsx)(f,{children:(0,_.jsx)(u,{children:`Record summary`})}),(0,_.jsx)(p,{role:`status`,"aria-live":`polite`,children:`Loading latest information…`})]})},M={render:()=>(0,_.jsxs)(h,{className:`max-w-md`,children:[(0,_.jsxs)(f,{children:[(0,_.jsx)(c,{children:`Attachments`}),(0,_.jsx)(u,{children:`No attachments`}),(0,_.jsx)(l,{children:`Add a file if this review needs supporting evidence.`})]}),(0,_.jsx)(s,{children:(0,_.jsx)(a,{children:`Add file`})})]})},N={render:()=>(0,_.jsxs)(h,{className:`max-w-md`,children:[(0,_.jsxs)(f,{children:[(0,_.jsx)(c,{children:`Workspace policy`}),(0,_.jsx)(u,{children:`Owner notes`}),(0,_.jsx)(l,{children:`Only the Record Owner can edit these notes.`}),(0,_.jsx)(d,{mobileLayout:`inline`,children:(0,_.jsx)(o,{variant:`neutral`,children:`Read only`})})]}),(0,_.jsx)(s,{children:(0,_.jsx)(a,{variant:`outline`,children:`Contact admin`})})]})},P={render:()=>(0,_.jsxs)(h,{className:`max-w-lg`,children:[(0,_.jsxs)(f,{children:[(0,_.jsx)(c,{children:`Updated by another user`}),(0,_.jsx)(u,{children:`Review changes for Alexandria Catherine Montgomery-Williams`}),(0,_.jsx)(l,{children:`Community Health and Specialist Coordination Workspace`}),(0,_.jsx)(d,{mobileLayout:`inline`,children:(0,_.jsx)(o,{variant:`warning`,children:`Updated`})})]}),(0,_.jsx)(p,{children:`Another user changed the identity details, supporting document, and record owner while your draft was open. Compare those updates with your draft before saving.`}),(0,_.jsxs)(s,{children:[(0,_.jsx)(a,{variant:`outline`,children:`Keep draft`}),(0,_.jsx)(a,{children:`Review changes`})]})]})},F={render:()=>(0,_.jsx)(h,{as:`section`,className:`max-w-md`,"aria-labelledby":`section-card-title`,children:(0,_.jsxs)(f,{children:[(0,_.jsx)(c,{children:`Section example`}),(0,_.jsx)(u,{as:`h2`,id:`section-card-title`,children:`Review summary`}),(0,_.jsx)(l,{children:`Key information for the current review.`})]})})},I={render:()=>(0,_.jsx)(`div`,{className:`grid w-full max-w-4xl gap-[var(--space-inset-card)] lg:grid-cols-3`,children:[`compact`,`cozy`,`comfortable`].map(e=>(0,_.jsx)(`div`,{"data-density":e,children:(0,_.jsx)(h,{children:(0,_.jsxs)(f,{children:[(0,_.jsxs)(c,{children:[e[0]?.toUpperCase(),e.slice(1)]}),(0,_.jsx)(u,{children:`Review queue`}),(0,_.jsx)(l,{children:`3 records need review.`})]})})},e))})},L={parameters:{viewport:{defaultViewport:`mobile2`}},render:()=>(0,_.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,_.jsxs)(h,{dividers:!0,children:[(0,_.jsxs)(f,{children:[(0,_.jsx)(c,{children:`Updated 4 minutes ago`}),(0,_.jsx)(u,{children:`Access policy changed`}),(0,_.jsx)(l,{children:`Review the new policy before using this record.`}),(0,_.jsx)(d,{mobileLayout:`inline`,children:(0,_.jsx)(o,{variant:`warning`,children:`Changed`})})]}),(0,_.jsxs)(s,{children:[(0,_.jsx)(a,{variant:`outline`,children:`Return to workspace`}),(0,_.jsx)(a,{children:`Review policy`})]})]})})},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="max-w-md" aria-labelledby="record-review-title">
      <CardHeader>
        <CardMeta>Updated 4 minutes ago</CardMeta>
        <CardTitle id="record-review-title">Record ready for review</CardTitle>
        <CardDescription>Latest details are available. One attachment is still processing.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="outline">Review later</Button>
        <Button>Open review</Button>
      </CardFooter>
    </Card>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('article', {
      name: 'Record ready for review'
    });
    await expect(card).toHaveAttribute('data-slot', 'card');
    await expect(canvas.getByRole('button', {
      name: 'Open review'
    })).toBeVisible();
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-3xl gap-[var(--space-inset-card)] md:grid-cols-2">
      <Card size="sm">
        <CardHeader>
          <CardMeta>2 items</CardMeta>
          <CardTitle>Results to review</CardTitle>
          <CardDescription>Review before the end of this shift.</CardDescription>
        </CardHeader>
      </Card>
      <Card size="md">
        <CardHeader>
          <CardMeta>2 items</CardMeta>
          <CardTitle>Results to review</CardTitle>
          <CardDescription>Review before the end of this shift.</CardDescription>
        </CardHeader>
      </Card>
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Outline replaces the shadow with a hairline border in every theme. Use it for dense card grids, where repeated shadows read as noise, and for cards nested inside panels or drawers, where a shadow implies false elevation.'
      }
    }
  },
  render: () => <div className="grid w-full max-w-3xl gap-[var(--space-inset-card)] md:grid-cols-2">
      {([['Haematology', '2 results awaiting review'], ['Clinical chemistry', '5 results awaiting review'], ['Microbiology', '1 result awaiting review'], ['Immunology', 'No results awaiting review']] as const).map(([title, description], index) => <Card key={title} variant="outline" size="sm" aria-labelledby={\`outline-card-title-\${index}\`}>
          <CardHeader>
            <CardMeta>Current shift</CardMeta>
            <CardTitle id={\`outline-card-title-\${index}\`}>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        </Card>)}
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('article', {
      name: 'Haematology'
    });
    await expect(card).toHaveAttribute('data-variant', 'outline');
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'The surface sandwich: a gray tray card groups related units on the white page, and each unit that needs its own surface renders as a white tile with a feather shadow. Tiles never nest inside tiles.'
      }
    }
  },
  render: () => <Card className="max-w-md" aria-labelledby="tray-title">
      <CardHeader>
        <CardTitle id="tray-title">Today's results</CardTitle>
        <CardDescription>Two panels returned since this morning.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-[var(--space-control-gap)]">
          {([['Lipid panel', 'Sokha Chan · returned 08:12'], ['HbA1c', 'Dara Phally · returned 09:45']] as const).map(([title, meta], index) => <Card key={title} variant="tile" size="sm" aria-labelledby={\`tile-title-\${index}\`}>
              <CardHeader>
                <CardTitle as="h4" id={\`tile-title-\${index}\`}>{title}</CardTitle>
                <CardDescription>{meta}</CardDescription>
              </CardHeader>
            </Card>)}
        </div>
      </CardContent>
    </Card>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const tile = canvas.getByRole('article', {
      name: 'Lipid panel'
    });
    await expect(tile).toHaveAttribute('data-variant', 'tile');
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="max-w-md" dividers>
      <CardHeader>
        <CardMeta>Record access</CardMeta>
        <CardTitle>Reviewer access</CardTitle>
        <CardDescription>Reviewers can view this record. Only the owner can edit it.</CardDescription>
      </CardHeader>
      <CardFooter align="between">
        <Badge variant="neutral">Read only</Badge>
        <Button variant="outline">View policy</Button>
      </CardFooter>
    </Card>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="max-w-lg">
      <CardHeader>
        <CardMeta>3 files · 1 still processing</CardMeta>
        <CardTitle>Attachments</CardTitle>
        <CardDescription>Files available in this review.</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">Manage</Button>
        </CardAction>
      </CardHeader>
    </Card>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-3xl gap-[var(--space-inset-card)] md:grid-cols-2">
      <Card>
        <CardMedia>
          <AspectRatio ratio={16 / 9}>
            <MediaPlaceholder label="Document preview" />
          </AspectRatio>
        </CardMedia>
        <CardHeader>
          <CardMeta>Uploaded today · 09:42</CardMeta>
          <CardTitle>Referral letter</CardTitle>
          <CardDescription>Attached to this review.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline">Open</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardMedia placement="inset">
          <AspectRatio ratio={16 / 9}>
            <MediaPlaceholder label="Identity preview" />
          </AspectRatio>
        </CardMedia>
        <CardHeader>
          <CardMeta>Identity check</CardMeta>
          <CardTitle>Identity document</CardTitle>
          <CardDescription>Verify the visible details before use.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline">Review</Button>
        </CardFooter>
      </Card>
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="max-w-md" dividers>
      <CardHeader>
        <CardMeta>Checked at 10:18</CardMeta>
        <CardTitle>External results delayed</CardTitle>
        <CardDescription>Results may arrive late. A missing result does not confirm a negative finding.</CardDescription>
        <CardAction mobileLayout="inline"><Badge variant="warning" dot>Delayed</Badge></CardAction>
      </CardHeader>
      <CardFooter>
        <Button variant="outline">View status</Button>
      </CardFooter>
    </Card>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <Card size="sm" className="max-w-sm" aria-labelledby="pending-review-title">
      <CardHeader>
        <CardMeta>Current shift</CardMeta>
        <CardTitle id="pending-review-title">Pending reviews</CardTitle>
        <CardAction mobileLayout="inline"><Badge variant="warning">4 new</Badge></CardAction>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tabular-nums">12</div>
        <p className="mt-[var(--space-stack-control)] text-sm text-muted-foreground">4 added since the last shift.</p>
      </CardContent>
    </Card>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="max-w-md">
      <CardHeader>
        <CardMeta>Review checklist</CardMeta>
        <CardTitle>Missing information?</CardTitle>
        <CardDescription>Check what to verify and when to request more details.</CardDescription>
      </CardHeader>
      <CardFooter align="start">
        <Button variant="link">Open checklist</Button>
      </CardFooter>
    </Card>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="max-w-md" aria-busy="true">
      <CardHeader>
        <CardTitle>Record summary</CardTitle>
      </CardHeader>
      <CardContent role="status" aria-live="polite">
        Loading latest information…
      </CardContent>
    </Card>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="max-w-md">
      <CardHeader>
        <CardMeta>Attachments</CardMeta>
        <CardTitle>No attachments</CardTitle>
        <CardDescription>Add a file if this review needs supporting evidence.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Add file</Button>
      </CardFooter>
    </Card>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="max-w-md">
      <CardHeader>
        <CardMeta>Workspace policy</CardMeta>
        <CardTitle>Owner notes</CardTitle>
        <CardDescription>Only the Record Owner can edit these notes.</CardDescription>
        <CardAction mobileLayout="inline"><Badge variant="neutral">Read only</Badge></CardAction>
      </CardHeader>
      <CardFooter>
        <Button variant="outline">Contact admin</Button>
      </CardFooter>
    </Card>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="max-w-lg">
      <CardHeader>
        <CardMeta>Updated by another user</CardMeta>
        <CardTitle>Review changes for Alexandria Catherine Montgomery-Williams</CardTitle>
        <CardDescription>Community Health and Specialist Coordination Workspace</CardDescription>
        <CardAction mobileLayout="inline"><Badge variant="warning">Updated</Badge></CardAction>
      </CardHeader>
      <CardContent>
        Another user changed the identity details, supporting document, and record owner while your draft was open. Compare those updates with your draft before saving.
      </CardContent>
      <CardFooter>
        <Button variant="outline">Keep draft</Button>
        <Button>Review changes</Button>
      </CardFooter>
    </Card>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <Card as="section" className="max-w-md" aria-labelledby="section-card-title">
      <CardHeader>
        <CardMeta>Section example</CardMeta>
        <CardTitle as="h2" id="section-card-title">Review summary</CardTitle>
        <CardDescription>Key information for the current review.</CardDescription>
      </CardHeader>
    </Card>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-4xl gap-[var(--space-inset-card)] lg:grid-cols-3">
      {(['compact', 'cozy', 'comfortable'] as const).map(density => <div key={density} data-density={density}>
          <Card>
            <CardHeader>
              <CardMeta>{density[0]?.toUpperCase()}{density.slice(1)}</CardMeta>
              <CardTitle>Review queue</CardTitle>
              <CardDescription>3 records need review.</CardDescription>
            </CardHeader>
          </Card>
        </div>)}
    </div>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  },
  render: () => <div className="w-full max-w-sm">
      <Card dividers>
        <CardHeader>
          <CardMeta>Updated 4 minutes ago</CardMeta>
          <CardTitle>Access policy changed</CardTitle>
          <CardDescription>Review the new policy before using this record.</CardDescription>
          <CardAction mobileLayout="inline"><Badge variant="warning">Changed</Badge></CardAction>
        </CardHeader>
        <CardFooter>
          <Button variant="outline">Return to workspace</Button>
          <Button>Review policy</Button>
        </CardFooter>
      </Card>
    </div>
}`,...L.parameters?.docs?.source}}},R=[`Default`,`Sizes`,`OutlineVariant`,`TileInsideTray`,`DividedSections`,`HeaderAction`,`MediaPlacements`,`StatusSummary`,`MetricSummary`,`GuidanceLink`,`Loading`,`EmptyState`,`PermissionRestricted`,`LongContent`,`SemanticElements`,`DensityModes`,`MobileReference`]}))();export{x as Default,I as DensityModes,T as DividedSections,M as EmptyState,A as GuidanceLink,E as HeaderAction,j as Loading,P as LongContent,D as MediaPlacements,k as MetricSummary,L as MobileReference,C as OutlineVariant,N as PermissionRestricted,F as SemanticElements,S as Sizes,O as StatusSummary,w as TileInsideTray,R as __namedExportsOrder,b as default};