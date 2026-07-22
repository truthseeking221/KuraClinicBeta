import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{Z as n,rt as r}from"./provider-marks-BeHzyBjc.js";import{li as i,t as a}from"./ui-C9kmmzkH.js";function o({label:e}){return(0,s.jsxs)(`div`,{className:`flex size-full flex-col items-center justify-center gap-[var(--space-stack-control)] rounded-[var(--radius-card-surface)] border border-border bg-muted p-[var(--space-inset-control)] text-muted-foreground`,children:[(0,s.jsx)(n,{"aria-hidden":`true`}),(0,s.jsx)(`span`,{className:`k-caption`,children:e})]})}var s,c,l,u,d,f,p,m,h;e((()=>{s=t(),a(),c=[{label:`16:9`,ratio:16/9},{label:`4:3`,ratio:4/3},{label:`1:1`,ratio:1},{label:`21:9`,ratio:21/9},{label:`9:16`,ratio:9/16},{label:`3:2`,ratio:3/2},{label:`4:5`,ratio:4/5},{label:`16:10`,ratio:16/10}],l={title:`Design System/Primitives/Aspect Ratio`,component:i,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`The fresh Storybook and source search found no layout primitive that reserves a responsive media area. The ReUI family establishes a small, reusable missing foundation without introducing media styling or domain content.`},source:{vendor:`ReUI`,registryItem:`c-aspect-ratio-1 through c-aspect-ratio-8`,sourceUrl:`https://reui.io/components/aspect-ratio`},binding:{colors:`consumer-owned`,typography:`consumer-owned`,spacing:`kura-story-composition`,radius:`consumer-owned`,elevation:`none`,icons:`kura-story-only`,density:`inherited`,responsive:`fluid-ratio-preservation`},useCase:{role:`Any Kura user viewing a workflow-owned image, document preview, or video surface`,primaryTask:`Keep media dimensions stable while content loads or available width changes.`,dataModel:`A positive width-to-height ratio and consumer-owned media content.`,safety:`The primitive never crops, hides, labels, or interprets clinical media; the owning feature controls accessibility, privacy, and media actions.`,outOfScope:`Image upload, media permissions, crop controls, image loading, video playback, lightboxes, and clinical media interpretation.`},exclusions:[`Upstream gallery, card, badge-overlay, hover-action, and lightbox compositions are excluded because they require their own data, permission, and interaction contracts.`,`The primitive does not impose border, radius, object-fit, or image-loading styling; those are responsibilities of the consuming media component.`]},docs:{description:{component:`A visual-neutral layout primitive that reserves a stable width-to-height area. Use it for media when a fixed proportion prevents layout shift; keep media semantics, crop behavior, and privacy rules in the consuming component.`}}},argTypes:{ratio:{control:{type:`number`,min:.1,max:4,step:.1}}}},u={render:()=>(0,s.jsx)(`div`,{className:`w-full max-w-md`,children:(0,s.jsx)(i,{ratio:16/9,children:(0,s.jsx)(o,{label:`16:9 media surface`})})})},d={render:()=>(0,s.jsx)(`div`,{className:`grid w-full max-w-4xl grid-cols-2 gap-[var(--space-inset-card)] sm:grid-cols-3 lg:grid-cols-4`,children:c.map(({label:e,ratio:t})=>(0,s.jsx)(i,{ratio:t,children:(0,s.jsx)(o,{label:e})},e))})},f={render:()=>(0,s.jsx)(`div`,{className:`w-full max-w-md`,children:(0,s.jsx)(i,{ratio:4/3,children:(0,s.jsxs)(`div`,{className:`flex size-full flex-col items-center justify-center gap-[var(--space-stack-control)] rounded-[var(--radius-card-surface)] border border-border bg-muted text-muted-foreground`,role:`status`,"aria-live":`polite`,children:[(0,s.jsx)(r,{"aria-hidden":`true`}),(0,s.jsx)(`span`,{className:`k-caption`,children:`Preparing secure media preview`})]})})})},p={render:()=>(0,s.jsx)(`div`,{className:`w-full max-w-md`,children:(0,s.jsx)(i,{ratio:5/2,children:(0,s.jsx)(o,{label:`Custom 5:2 media surface`})})})},m={parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,s.jsx)(`div`,{className:`w-full`,children:(0,s.jsx)(i,{ratio:16/9,children:(0,s.jsx)(o,{label:`Responsive 16:9 preview`})})})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-md">
      <AspectRatio ratio={16 / 9}><MediaSpecimen label="16:9 media surface" /></AspectRatio>
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-4xl grid-cols-2 gap-[var(--space-inset-card)] sm:grid-cols-3 lg:grid-cols-4">
      {ratios.map(({
      label,
      ratio
    }) => <AspectRatio key={label} ratio={ratio}><MediaSpecimen label={label} /></AspectRatio>)}
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-md">
      <AspectRatio ratio={4 / 3}>
        <div className="flex size-full flex-col items-center justify-center gap-[var(--space-stack-control)] rounded-[var(--radius-card-surface)] border border-border bg-muted text-muted-foreground" role="status" aria-live="polite">
          <SpinnerGapIcon aria-hidden="true" />
          <span className="k-caption">Preparing secure media preview</span>
        </div>
      </AspectRatio>
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-md">
      <AspectRatio ratio={5 / 2}><MediaSpecimen label="Custom 5:2 media surface" /></AspectRatio>
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <div className="w-full">
      <AspectRatio ratio={16 / 9}><MediaSpecimen label="Responsive 16:9 preview" /></AspectRatio>
    </div>
}`,...m.parameters?.docs?.source}}},h=[`Default`,`RatioMatrix`,`LoadingReserve`,`CustomRatio`,`MobileReference`]}))();export{p as CustomRatio,u as Default,f as LoadingReserve,m as MobileReference,d as RatioMatrix,h as __namedExportsOrder,l as default};