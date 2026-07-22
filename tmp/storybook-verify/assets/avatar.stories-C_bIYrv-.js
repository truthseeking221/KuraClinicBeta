import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{i as n,x as r,zt as i}from"./provider-marks-BeHzyBjc.js";import{t as a}from"./ui-C9kmmzkH.js";import{a as o,c as s,i as c,o as l,r as u,s as d}from"./skeleton-yGvKPj3C.js";var f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M;e((()=>{f=t(),a(),p={title:`Design System/Primitives/Avatar`,component:u,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`The existing Avatar primitive already covered image and fallback states. The ReUI family adds reusable groups, counts, status markers, tones, rings, loading, and muted-image treatment, so the canonical primitive was extended rather than duplicated.`},source:{vendor:`ReUI`,registryItem:`c-avatar-1 through c-avatar-35`,sourceUrl:`https://reui.io/components/avatar`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-flat`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`wrapping-and-mobile-stories`},exclusions:[`Arbitrary custom pixel sizes were excluded in favor of the canonical size scale.`,`Decorative gradient story rings were excluded because they add motion and color without a Kura workflow meaning.`,`Dropdown, tooltip, and button compositions remain owned by their respective canonical components when those components are available.`]},docs:{canvas:{layout:`centered`,sourceState:`none`,withToolbar:`none`},story:{inline:!0},description:{component:`A resilient identity marker for patients and staff. Use an accessible image with initials or the canonical profile icon as a fallback. Presence, review, and loading states must remain explicit and must not replace identity verification.`}}},argTypes:{size:{control:`radio`,options:[`xs`,`sm`,`md`,`lg`,`xl`]},shape:{control:`radio`,options:[`circle`,`rounded`]},fallbackTone:{control:`radio`,options:[`neutral`,`brand`,`success`,`warning`,`danger`,`info`,`ai`]},ring:{control:`radio`,options:[`none`,`neutral`,`brand`,`success`,`warning`,`danger`,`info`,`ai`]},ringAnimation:{control:`radio`,options:[`none`,`pulse`]},loading:{control:`boolean`}}},m=`/window.svg`,h={args:{size:`md`,shape:`circle`,fallbackTone:`neutral`},render:e=>(0,f.jsx)(u,{...e,"aria-label":`Jordan Davis`,children:(0,f.jsx)(o,{children:`JD`})})},g={args:{size:`md`},render:e=>(0,f.jsx)(u,{...e,"aria-label":`Profile image unavailable`,children:(0,f.jsx)(o,{})})},_={args:{size:`md`},render:e=>(0,f.jsxs)(u,{...e,"aria-label":`Jordan Davis`,children:[(0,f.jsx)(s,{src:m,alt:`Jordan Davis`}),(0,f.jsx)(o,{children:`JD`})]})},v={args:{size:`md`},render:e=>(0,f.jsxs)(u,{...e,"aria-label":`Morgan Chen`,children:[(0,f.jsx)(s,{src:`/missing-profile-image.svg`,alt:`Morgan Chen`}),(0,f.jsx)(o,{children:`MC`})]})},y={render:()=>(0,f.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[[`xs`,`sm`,`md`,`lg`,`xl`].map(e=>(0,f.jsx)(u,{size:e,"aria-label":`Avatar size ${e}`,children:(0,f.jsx)(o,{children:e===`xl`?`JD`:`J`})},e)),(0,f.jsx)(u,{size:`md`,shape:`rounded`,"aria-label":`Rounded identity mark`,children:(0,f.jsx)(o,{children:`DCM`})})]})},b={render:()=>(0,f.jsx)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[`neutral`,`brand`,`success`,`warning`,`danger`,`info`,`ai`].map(e=>(0,f.jsx)(u,{size:`lg`,fallbackTone:e,"aria-label":`${e} profile fallback`,children:(0,f.jsx)(o,{children:`JD`})},e))})},x={render:()=>(0,f.jsxs)(`div`,{className:`flex flex-wrap items-center gap-4`,children:[(0,f.jsxs)(u,{"aria-label":`Jordan Davis, online`,children:[(0,f.jsx)(o,{children:`JD`}),(0,f.jsx)(c,{tone:`success`,"aria-label":`Online`})]}),(0,f.jsxs)(u,{"aria-label":`Morgan Chen, review required`,children:[(0,f.jsx)(o,{children:`MC`}),(0,f.jsx)(c,{tone:`warning`,"aria-label":`Review required`,children:(0,f.jsx)(r,{"aria-hidden":`true`})})]}),(0,f.jsxs)(u,{"aria-label":`Alex Morgan, offline`,children:[(0,f.jsx)(o,{children:`AM`}),(0,f.jsx)(c,{tone:`neutral`,"aria-label":`Offline`,position:`top-left`})]})]})},S={render:()=>(0,f.jsx)(`div`,{className:`flex flex-wrap items-center gap-5`,children:[`top-left`,`top-right`,`bottom-left`,`bottom-right`].map(e=>(0,f.jsxs)(u,{shape:`rounded`,"aria-label":`Avatar badge at ${e}`,children:[(0,f.jsx)(o,{children:`JD`}),(0,f.jsx)(c,{tone:`info`,position:e,"aria-label":`Processing`})]},e))})},C={render:()=>(0,f.jsxs)(`div`,{className:`flex flex-wrap items-center gap-6`,children:[(0,f.jsxs)(l,{"aria-label":`Care team`,children:[(0,f.jsx)(u,{size:`sm`,"aria-label":`Jordan Davis`,children:(0,f.jsx)(o,{children:`JD`})}),(0,f.jsx)(u,{size:`sm`,"aria-label":`Morgan Chen`,children:(0,f.jsx)(o,{children:`MC`})}),(0,f.jsx)(u,{size:`sm`,"aria-label":`Alex Morgan`,children:(0,f.jsx)(o,{children:`AM`})})]}),(0,f.jsxs)(l,{overlap:`tight`,"aria-label":`Additional care team members`,children:[(0,f.jsx)(u,{size:`sm`,"aria-label":`Jordan Davis`,children:(0,f.jsx)(o,{children:`JD`})}),(0,f.jsx)(u,{size:`sm`,"aria-label":`Morgan Chen`,children:(0,f.jsx)(o,{children:`MC`})}),(0,f.jsx)(d,{size:`sm`,"aria-label":`Three additional care team members`,children:`+3`})]}),(0,f.jsxs)(l,{"aria-label":`Invite care team member`,children:[(0,f.jsx)(u,{size:`sm`,"aria-label":`Jordan Davis`,children:(0,f.jsx)(o,{children:`JD`})}),(0,f.jsx)(d,{size:`sm`,tone:`brand`,"aria-label":`Invite care team member`,children:(0,f.jsx)(i,{"aria-hidden":`true`})})]})]})},w={render:()=>(0,f.jsxs)(`div`,{className:`flex flex-wrap items-center gap-5`,children:[(0,f.jsx)(u,{ring:`brand`,"aria-label":`Active profile`,children:(0,f.jsx)(o,{children:`JD`})}),(0,f.jsxs)(u,{ring:`success`,ringAnimation:`pulse`,"aria-label":`Online profile`,children:[(0,f.jsx)(o,{children:`MC`}),(0,f.jsx)(c,{tone:`success`,"aria-label":`Online`})]}),(0,f.jsx)(u,{loading:!0,"aria-label":`Profile image loading`,children:(0,f.jsx)(o,{children:`AM`})})]})},T={render:()=>(0,f.jsxs)(u,{size:`lg`,"aria-label":`Jordan Davis, online, two notifications`,children:[(0,f.jsx)(o,{children:`JD`}),(0,f.jsx)(c,{tone:`success`,position:`bottom-right`,"aria-label":`Online`}),(0,f.jsx)(c,{tone:`danger`,position:`top-left`,"aria-label":`Two urgent notifications`,children:`2`})]})},E={render:()=>(0,f.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,f.jsxs)(l,{"aria-label":`Care team members`,children:[(0,f.jsx)(u,{size:`sm`,"aria-label":`Jordan Davis`,children:(0,f.jsx)(o,{children:`JD`})}),(0,f.jsx)(u,{size:`sm`,"aria-label":`Morgan Chen`,children:(0,f.jsx)(o,{children:`MC`})}),(0,f.jsx)(u,{size:`sm`,"aria-label":`Alex Morgan`,children:(0,f.jsx)(o,{children:`AM`})}),(0,f.jsx)(d,{size:`sm`,"aria-label":`Nine additional care team members`,children:`+9`})]}),(0,f.jsx)(`span`,{className:`text-sm text-muted-foreground`,children:`12 care team members`})]})},D={render:()=>(0,f.jsxs)(`div`,{className:`flex flex-col items-center gap-3 text-center`,children:[(0,f.jsx)(l,{"aria-label":`No active collaborators`,children:(0,f.jsx)(d,{size:`lg`,tone:`neutral`,"aria-label":`Invite a collaborator`,children:(0,f.jsx)(i,{"aria-hidden":`true`})})}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`p`,{className:`text-sm font-medium`,children:`No active collaborators`}),(0,f.jsx)(`p`,{className:`text-xs text-muted-foreground`,children:`Invite a teammate to start reviewing together.`})]})]})},O={render:()=>(0,f.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,f.jsxs)(u,{"aria-label":`Archived clinician profile`,children:[(0,f.jsx)(s,{src:m,alt:`Archived clinician profile`,treatment:`muted`}),(0,f.jsx)(o,{children:`AC`})]}),(0,f.jsx)(`span`,{className:`text-sm text-muted-foreground`,children:`Archived clinician profile`})]})},k={render:()=>(0,f.jsx)(`div`,{className:`flex flex-wrap items-center gap-6`,children:[`compact`,`cozy`,`comfortable`].map(e=>(0,f.jsxs)(`div`,{"data-density":e,className:`flex flex-col items-center gap-2`,children:[(0,f.jsx)(u,{"aria-label":`Avatar in ${e} density`,children:(0,f.jsx)(o,{children:`JD`})}),(0,f.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:e})]},e))})},A={render:()=>(0,f.jsxs)(`div`,{className:`flex w-full max-w-sm items-center gap-3`,children:[(0,f.jsx)(u,{size:`sm`,"aria-label":`Alexandra Morgan, laboratory operations lead`,children:(0,f.jsx)(o,{children:`AM`})}),(0,f.jsxs)(`div`,{className:`min-w-0`,children:[(0,f.jsx)(`p`,{className:`truncate text-sm font-medium`,children:`Alexandra Morgan`}),(0,f.jsx)(`p`,{className:`text-xs text-muted-foreground`,children:`Laboratory operations lead`})]}),(0,f.jsx)(c,{tone:`warning`,"aria-label":`Awaiting review`})]})},j={parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,f.jsxs)(`div`,{className:`flex w-full max-w-sm flex-col gap-3`,children:[(0,f.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,f.jsxs)(u,{size:`md`,"aria-label":`Jordan Davis, online`,children:[(0,f.jsx)(o,{children:`JD`}),(0,f.jsx)(c,{tone:`success`,"aria-label":`Online`})]}),(0,f.jsxs)(`div`,{className:`min-w-0`,children:[(0,f.jsx)(`p`,{className:`truncate text-sm font-medium`,children:`Jordan Davis`}),(0,f.jsx)(`p`,{className:`text-xs text-muted-foreground`,children:`Primary care team`})]})]}),(0,f.jsxs)(l,{"aria-label":`Care team members`,children:[(0,f.jsx)(u,{size:`sm`,"aria-label":`Jordan Davis`,children:(0,f.jsx)(o,{children:`JD`})}),(0,f.jsx)(u,{size:`sm`,"aria-label":`Morgan Chen`,children:(0,f.jsx)(o,{children:`MC`})}),(0,f.jsx)(u,{size:`sm`,"aria-label":`Alex Morgan`,children:(0,f.jsx)(o,{children:`AM`})}),(0,f.jsx)(d,{size:`sm`,"aria-label":`Five additional care team members`,children:(0,f.jsx)(n,{"aria-hidden":`true`})})]})]})},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md',
    shape: 'circle',
    fallbackTone: 'neutral'
  },
  render: args => <Avatar {...args} aria-label="Jordan Davis">
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md'
  },
  render: args => <Avatar {...args} aria-label="Profile image unavailable">
      <AvatarFallback />
    </Avatar>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md'
  },
  render: args => <Avatar {...args} aria-label="Jordan Davis">
      <AvatarImage src={profileImage} alt="Jordan Davis" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md'
  },
  render: args => <Avatar {...args} aria-label="Morgan Chen">
      <AvatarImage src="/missing-profile-image.svg" alt="Morgan Chen" />
      <AvatarFallback>MC</AvatarFallback>
    </Avatar>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => <Avatar key={size} size={size} aria-label={\`Avatar size \${size}\`}>
          <AvatarFallback>{size === 'xl' ? 'JD' : 'J'}</AvatarFallback>
        </Avatar>)}
      <Avatar size="md" shape="rounded" aria-label="Rounded identity mark">
        <AvatarFallback>DCM</AvatarFallback>
      </Avatar>
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">
      {(['neutral', 'brand', 'success', 'warning', 'danger', 'info', 'ai'] as const).map(tone => <Avatar key={tone} size="lg" fallbackTone={tone} aria-label={\`\${tone} profile fallback\`}>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>)}
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-4">
      <Avatar aria-label="Jordan Davis, online">
        <AvatarFallback>JD</AvatarFallback>
        <AvatarBadge tone="success" aria-label="Online" />
      </Avatar>
      <Avatar aria-label="Morgan Chen, review required">
        <AvatarFallback>MC</AvatarFallback>
        <AvatarBadge tone="warning" aria-label="Review required">
          <CheckIcon aria-hidden="true" />
        </AvatarBadge>
      </Avatar>
      <Avatar aria-label="Alex Morgan, offline">
        <AvatarFallback>AM</AvatarFallback>
        <AvatarBadge tone="neutral" aria-label="Offline" position="top-left" />
      </Avatar>
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-5">
      {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map(position => <Avatar key={position} shape="rounded" aria-label={\`Avatar badge at \${position}\`}>
          <AvatarFallback>JD</AvatarFallback>
          <AvatarBadge tone="info" position={position} aria-label="Processing" />
        </Avatar>)}
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-6">
      <AvatarGroup aria-label="Care team">
        <Avatar size="sm" aria-label="Jordan Davis">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar size="sm" aria-label="Morgan Chen">
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <Avatar size="sm" aria-label="Alex Morgan">
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
      </AvatarGroup>
      <AvatarGroup overlap="tight" aria-label="Additional care team members">
        <Avatar size="sm" aria-label="Jordan Davis">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar size="sm" aria-label="Morgan Chen">
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <AvatarGroupCount size="sm" aria-label="Three additional care team members">
          +3
        </AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup aria-label="Invite care team member">
        <Avatar size="sm" aria-label="Jordan Davis">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <AvatarGroupCount size="sm" tone="brand" aria-label="Invite care team member">
          <UserPlusIcon aria-hidden="true" />
        </AvatarGroupCount>
      </AvatarGroup>
    </div>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-5">
      <Avatar ring="brand" aria-label="Active profile">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar ring="success" ringAnimation="pulse" aria-label="Online profile">
        <AvatarFallback>MC</AvatarFallback>
        <AvatarBadge tone="success" aria-label="Online" />
      </Avatar>
      <Avatar loading aria-label="Profile image loading">
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Avatar size="lg" aria-label="Jordan Davis, online, two notifications">
      <AvatarFallback>JD</AvatarFallback>
      <AvatarBadge tone="success" position="bottom-right" aria-label="Online" />
      <AvatarBadge tone="danger" position="top-left" aria-label="Two urgent notifications">
        2
      </AvatarBadge>
    </Avatar>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      <AvatarGroup aria-label="Care team members">
        <Avatar size="sm" aria-label="Jordan Davis"><AvatarFallback>JD</AvatarFallback></Avatar>
        <Avatar size="sm" aria-label="Morgan Chen"><AvatarFallback>MC</AvatarFallback></Avatar>
        <Avatar size="sm" aria-label="Alex Morgan"><AvatarFallback>AM</AvatarFallback></Avatar>
        <AvatarGroupCount size="sm" aria-label="Nine additional care team members">+9</AvatarGroupCount>
      </AvatarGroup>
      <span className="text-sm text-muted-foreground">12 care team members</span>
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col items-center gap-3 text-center">
      <AvatarGroup aria-label="No active collaborators">
        <AvatarGroupCount size="lg" tone="neutral" aria-label="Invite a collaborator">
          <UserPlusIcon aria-hidden="true" />
        </AvatarGroupCount>
      </AvatarGroup>
      <div>
        <p className="text-sm font-medium">No active collaborators</p>
        <p className="text-xs text-muted-foreground">Invite a teammate to start reviewing together.</p>
      </div>
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      <Avatar aria-label="Archived clinician profile">
        <AvatarImage src={profileImage} alt="Archived clinician profile" treatment="muted" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <span className="text-sm text-muted-foreground">Archived clinician profile</span>
    </div>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-6">
      {(['compact', 'cozy', 'comfortable'] as const).map(density => <div key={density} data-density={density} className="flex flex-col items-center gap-2">
          <Avatar aria-label={\`Avatar in \${density} density\`}>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{density}</span>
        </div>)}
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-full max-w-sm items-center gap-3">
      <Avatar size="sm" aria-label="Alexandra Morgan, laboratory operations lead">
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">Alexandra Morgan</p>
        <p className="text-xs text-muted-foreground">Laboratory operations lead</p>
      </div>
      <AvatarBadge tone="warning" aria-label="Awaiting review" />
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center gap-3">
        <Avatar size="md" aria-label="Jordan Davis, online">
          <AvatarFallback>JD</AvatarFallback>
          <AvatarBadge tone="success" aria-label="Online" />
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">Jordan Davis</p>
          <p className="text-xs text-muted-foreground">Primary care team</p>
        </div>
      </div>
      <AvatarGroup aria-label="Care team members">
        <Avatar size="sm" aria-label="Jordan Davis"><AvatarFallback>JD</AvatarFallback></Avatar>
        <Avatar size="sm" aria-label="Morgan Chen"><AvatarFallback>MC</AvatarFallback></Avatar>
        <Avatar size="sm" aria-label="Alex Morgan"><AvatarFallback>AM</AvatarFallback></Avatar>
        <AvatarGroupCount size="sm" aria-label="Five additional care team members">
          <PlusIcon aria-hidden="true" />
        </AvatarGroupCount>
      </AvatarGroup>
    </div>
}`,...j.parameters?.docs?.source}}},M=[`FallbackInitials`,`FallbackIcon`,`LoadedImage`,`ImageErrorUsesFallback`,`SizesAndShapes`,`FallbackTones`,`PresenceBadges`,`BadgePositions`,`AvatarGroups`,`RingsAndLoading`,`MultipleBadges`,`SocialProof`,`EmptyCollaborators`,`MutedImage`,`DensityReference`,`LongContentAndNarrow`,`MobileReference`]}))();export{C as AvatarGroups,S as BadgePositions,k as DensityReference,D as EmptyCollaborators,g as FallbackIcon,h as FallbackInitials,b as FallbackTones,v as ImageErrorUsesFallback,_ as LoadedImage,A as LongContentAndNarrow,j as MobileReference,T as MultipleBadges,O as MutedImage,x as PresenceBadges,w as RingsAndLoading,y as SizesAndShapes,E as SocialProof,M as __namedExportsOrder,p as default};