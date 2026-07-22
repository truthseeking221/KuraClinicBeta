import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{k as n,x as r}from"./provider-marks-BeHzyBjc.js";import{t as i}from"./ui-C9kmmzkH.js";import{a,r as o}from"./skeleton-yGvKPj3C.js";import{a as s}from"./collapsible-Cfc9M9oP.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T;e((()=>{c=t(),i(),l={title:`Design System/Primitives/Badge`,component:s,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`The existing Badge primitive keeps Kura status semantics while adopting Kura counter geometry and surface finish.`},source:{vendor:`Kura`,registryItem:`badge`,visualReference:`Kura badge`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-flat`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`wrapping-and-mobile-stories`},exclusions:[`Dismissible badges were excluded: a status badge is non-interactive in Kura; removable filters belong to a future Tag or FilterChip contract.`,`Arbitrary radius values were excluded: Kura badges use the canonical badge radius.`,`Foreign icon libraries and flag-image demos were replaced by canonical Kura icon and identity composition patterns.`]},docs:{canvas:{layout:`centered`,sourceState:`none`,withToolbar:`none`},story:{inline:!0},description:{component:`A compact, non-interactive status or metadata label for quick scanning. Keep the meaning explicit in text and pair color with a dot, icon, or surrounding context when status affects a clinical or operational decision.`}}},argTypes:{variant:{control:`radio`,options:[`neutral`,`primary`,`secondary`,`outline`,`success`,`warning`,`danger`,`info`,`ai`]},appearance:{control:`radio`,options:[`soft`,`solid`,`outline`]},size:{control:`radio`,options:[`sm`,`md`,`lg`]},dot:{control:`boolean`}}},u={args:{children:`Verification pending`,variant:`neutral`,size:`md`}},d={render:()=>(0,c.jsxs)(`div`,{className:`flex max-w-sm flex-wrap items-center gap-2`,children:[(0,c.jsx)(s,{variant:`neutral`,children:`Verification pending`}),(0,c.jsx)(s,{variant:`primary`,children:`Primary`}),(0,c.jsx)(s,{variant:`secondary`,children:`Secondary`}),(0,c.jsx)(s,{variant:`success`,children:`Verified`}),(0,c.jsx)(s,{variant:`warning`,children:`Needs review`}),(0,c.jsx)(s,{variant:`danger`,children:`Sync error`}),(0,c.jsx)(s,{variant:`info`,children:`Processing`}),(0,c.jsx)(s,{variant:`ai`,children:`AI suggestion`}),(0,c.jsx)(s,{variant:`outline`,children:`Read-only`})]})},f={render:()=>(0,c.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,c.jsx)(s,{variant:`success`,appearance:`soft`,children:`Verified`}),(0,c.jsx)(s,{variant:`success`,appearance:`solid`,children:`Verified`}),(0,c.jsx)(s,{variant:`success`,appearance:`outline`,children:`Verified`}),(0,c.jsx)(s,{variant:`warning`,appearance:`soft`,children:`Needs review`}),(0,c.jsx)(s,{variant:`warning`,appearance:`solid`,children:`Needs review`}),(0,c.jsx)(s,{variant:`warning`,appearance:`outline`,children:`Needs review`})]})},p={render:()=>(0,c.jsxs)(`div`,{className:`flex flex-wrap items-end gap-6`,children:[(0,c.jsxs)(`div`,{className:`flex items-end gap-2`,children:[(0,c.jsx)(s,{size:`sm`,children:`Record`}),(0,c.jsx)(s,{size:`md`,children:`Record`}),(0,c.jsx)(s,{size:`lg`,children:`Record`})]}),[`compact`,`cozy`,`comfortable`].map(e=>(0,c.jsxs)(`div`,{"data-density":e,className:`flex flex-col items-center gap-2`,children:[(0,c.jsx)(s,{variant:`warning`,children:`Needs review`}),(0,c.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:e})]},e))]})},m={render:()=>(0,c.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,c.jsx)(s,{variant:`success`,dot:!0,children:`Verified`}),(0,c.jsx)(s,{variant:`warning`,dot:!0,children:`Needs review`}),(0,c.jsx)(s,{variant:`outline`,leading:(0,c.jsx)(r,{"aria-hidden":`true`}),children:`Acknowledged`}),(0,c.jsx)(s,{variant:`danger`,trailing:(0,c.jsx)(n,{"aria-hidden":`true`}),children:`Sync error`})]})},h={render:()=>(0,c.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[(0,c.jsx)(s,{variant:`outline`,leading:(0,c.jsx)(o,{size:`xs`,"aria-hidden":`true`,children:(0,c.jsx)(a,{children:`JD`})}),children:`Jordan Davis`}),(0,c.jsx)(s,{variant:`info`,appearance:`soft`,trailing:(0,c.jsx)(o,{size:`xs`,"aria-hidden":`true`,children:(0,c.jsx)(a,{children:`MC`})}),children:`Assigned reviewer`})]})},g={render:()=>(0,c.jsx)(s,{as:`a`,href:`#review-history`,variant:`info`,appearance:`outline`,children:`View review history`})},_={render:()=>(0,c.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,c.jsx)(s,{variant:`warning`,size:`lg`,dot:!0,children:`Awaiting laboratory specimen confirmation`})})},v={render:()=>(0,c.jsxs)(`div`,{className:`flex max-w-sm flex-wrap items-center gap-2`,children:[(0,c.jsx)(s,{variant:`neutral`,children:`Draft`}),(0,c.jsx)(s,{variant:`info`,children:`Processing`}),(0,c.jsx)(s,{variant:`warning`,children:`Pending review`}),(0,c.jsx)(s,{variant:`success`,children:`Completed`}),(0,c.jsx)(s,{variant:`danger`,children:`Failed`}),(0,c.jsx)(s,{variant:`outline`,children:`Read-only`})]})},y={parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,c.jsxs)(`div`,{className:`flex w-full max-w-sm flex-wrap gap-2`,children:[(0,c.jsx)(s,{variant:`success`,dot:!0,children:`Verified`}),(0,c.jsx)(s,{variant:`warning`,dot:!0,children:`Pending review`}),(0,c.jsx)(s,{variant:`danger`,dot:!0,children:`Sync error`}),(0,c.jsx)(s,{variant:`info`,appearance:`outline`,children:`Processing`})]})},b=[`neutral`,`primary`,`success`,`warning`,`danger`,`info`,`ai`],x=[`soft`,`outline`,`solid`],S={render:()=>(0,c.jsx)(`div`,{className:`flex flex-col gap-3`,children:x.map(e=>(0,c.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,c.jsx)(`span`,{className:`w-14 text-xs text-muted-foreground`,children:e}),b.map(t=>(0,c.jsx)(s,{appearance:e,variant:t,children:t===`ai`?`AI draft`:t.charAt(0).toUpperCase()+t.slice(1)},t))]},e))})},C={render:()=>(0,c.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,c.jsx)(s,{variant:`neutral`,size:`sm`,children:`3`}),(0,c.jsx)(s,{variant:`primary`,size:`sm`,children:`28`}),(0,c.jsx)(s,{variant:`danger`,size:`sm`,children:`99+`}),(0,c.jsx)(s,{variant:`warning`,children:`132 flagged`}),(0,c.jsx)(s,{variant:`success`,children:`18/18 passed`})]})},w={globals:{theme:`dark`},render:()=>(0,c.jsx)(`div`,{className:`flex flex-col gap-3`,children:x.map(e=>(0,c.jsx)(`div`,{className:`flex flex-wrap items-center gap-2`,children:b.map(t=>(0,c.jsx)(s,{appearance:e,dot:e===`soft`,variant:t,children:t===`ai`?`AI draft`:t.charAt(0).toUpperCase()+t.slice(1)},t))},e))})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Verification pending',
    variant: 'neutral',
    size: 'md'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex max-w-sm flex-wrap items-center gap-2">
      <Badge variant="neutral">Verification pending</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Verified</Badge>
      <Badge variant="warning">Needs review</Badge>
      <Badge variant="danger">Sync error</Badge>
      <Badge variant="info">Processing</Badge>
      <Badge variant="ai">AI suggestion</Badge>
      <Badge variant="outline">Read-only</Badge>
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success" appearance="soft">Verified</Badge>
      <Badge variant="success" appearance="solid">Verified</Badge>
      <Badge variant="success" appearance="outline">Verified</Badge>
      <Badge variant="warning" appearance="soft">Needs review</Badge>
      <Badge variant="warning" appearance="solid">Needs review</Badge>
      <Badge variant="warning" appearance="outline">Needs review</Badge>
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-end gap-6">
      <div className="flex items-end gap-2">
        <Badge size="sm">Record</Badge>
        <Badge size="md">Record</Badge>
        <Badge size="lg">Record</Badge>
      </div>
      {(['compact', 'cozy', 'comfortable'] as const).map(density => <div key={density} data-density={density} className="flex flex-col items-center gap-2">
          <Badge variant="warning">Needs review</Badge>
          <span className="text-xs text-muted-foreground">{density}</span>
        </div>)}
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success" dot>Verified</Badge>
      <Badge variant="warning" dot>Needs review</Badge>
      <Badge variant="outline" leading={<CheckIcon aria-hidden="true" />}>Acknowledged</Badge>
      <Badge variant="danger" trailing={<XIcon aria-hidden="true" />}>Sync error</Badge>
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      <Badge variant="outline" leading={<Avatar size="xs" aria-hidden="true"><AvatarFallback>JD</AvatarFallback></Avatar>}>
        Jordan Davis
      </Badge>
      <Badge variant="info" appearance="soft" trailing={<Avatar size="xs" aria-hidden="true"><AvatarFallback>MC</AvatarFallback></Avatar>}>
        Assigned reviewer
      </Badge>
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Badge as="a" href="#review-history" variant="info" appearance="outline">
      View review history
    </Badge>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-sm">
      <Badge variant="warning" size="lg" dot>
        Awaiting laboratory specimen confirmation
      </Badge>
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex max-w-sm flex-wrap items-center gap-2">
      <Badge variant="neutral">Draft</Badge>
      <Badge variant="info">Processing</Badge>
      <Badge variant="warning">Pending review</Badge>
      <Badge variant="success">Completed</Badge>
      <Badge variant="danger">Failed</Badge>
      <Badge variant="outline">Read-only</Badge>
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <div className="flex w-full max-w-sm flex-wrap gap-2">
      <Badge variant="success" dot>Verified</Badge>
      <Badge variant="warning" dot>Pending review</Badge>
      <Badge variant="danger" dot>Sync error</Badge>
      <Badge variant="info" appearance="outline">Processing</Badge>
    </div>
}`,...y.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      {APPEARANCES.map(appearance => <div className="flex flex-wrap items-center gap-2" key={appearance}>
          <span className="w-14 text-xs text-muted-foreground">{appearance}</span>
          {VARIANTS.map(variant => <Badge appearance={appearance} key={variant} variant={variant}>
              {variant === 'ai' ? 'AI draft' : variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Badge>)}
        </div>)}
    </div>
}`,...S.parameters?.docs?.source},description:{story:`The full tone × appearance grammar in one glance: soft is the default
reading, outline the lightest, solid the one salient chip per surface.`,...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      <Badge variant="neutral" size="sm">3</Badge>
      <Badge variant="primary" size="sm">28</Badge>
      <Badge variant="danger" size="sm">99+</Badge>
      <Badge variant="warning">132 flagged</Badge>
      <Badge variant="success">18/18 passed</Badge>
    </div>
}`,...C.parameters?.docs?.source},description:{story:`Counts align without opting in — the label ships tabular numerals.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  globals: {
    theme: 'dark'
  },
  render: () => <div className="flex flex-col gap-3">
      {APPEARANCES.map(appearance => <div className="flex flex-wrap items-center gap-2" key={appearance}>
          {VARIANTS.map(variant => <Badge appearance={appearance} dot={appearance === 'soft'} key={variant} variant={variant}>
              {variant === 'ai' ? 'AI draft' : variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Badge>)}
        </div>)}
    </div>
}`,...w.parameters?.docs?.source}}},T=[`Default`,`SemanticVariants`,`AppearanceMatrix`,`SizesAndDensity`,`StatusDotsAndIcons`,`AvatarPairing`,`NavigationBadge`,`LongMetadata`,`OperationalStateMatrix`,`MobileReference`,`FullMatrix`,`CountBadges`,`DarkTheme`]}))();export{f as AppearanceMatrix,h as AvatarPairing,C as CountBadges,w as DarkTheme,u as Default,S as FullMatrix,_ as LongMetadata,y as MobileReference,g as NavigationBadge,v as OperationalStateMatrix,d as SemanticVariants,p as SizesAndDensity,m as StatusDotsAndIcons,T as __namedExportsOrder,l as default};