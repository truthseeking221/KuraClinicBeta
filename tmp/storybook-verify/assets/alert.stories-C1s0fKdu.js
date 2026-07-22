import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{Et as i,Q as a,a as o,o as s,vt as c,x as l}from"./provider-marks-BeHzyBjc.js";import{t as u}from"./ui-C9kmmzkH.js";import{i as d,n as f,r as p,t as m}from"./alert-l7nmjmGJ.js";import{t as h}from"./button-B6_zsN5-.js";var g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P;t((()=>{g=r(),_=e(n()),u(),v={title:`Design System/Components/Alert`,component:m,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`The fresh Storybook and source search found no canonical persistent status-message primitive. The ReUI family supplies the missing alert structure, while Kura owns the semantic tone API, announcement behavior, dismiss action, and responsive composition.`},source:{vendor:`ReUI`,registryItem:`c-alert-1 through c-alert-20`,sourceUrl:`https://reui.io/components/alert`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-flat`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`mobile-first-stacking-and-wrapping`},useCase:{role:`Clinic staff, patients, and operational workspace users`,primaryTask:`Recognize a persistent status or consequence and take the next safe action.`,dataModel:`A message with a semantic tone, explicit title or description, optional actions, and optional dismissal behavior.`,safety:`Urgent or clinically consequential messages can use role="alert" and must carry explicit text; the primitive does not decide escalation, acknowledgement, or permissions.`,outOfScope:`Toast notifications, modal alert dialogs, billing logic, feature discovery, domain-specific escalation, and workflow-owned error recovery.`},exclusions:[`ReUI frame and stacked-panel demos are represented as composition stories without importing a second frame or card system.`,`Billing, feature-discovery, and user-message examples are excluded from the primitive; product and domain features own their data and recovery rules.`,`The upstream destructive name is adapted to Kura danger terminology, and invert is retained as the inverse high-contrast tone.`,`The primitive has no loading or disabled state of its own; pending and permission states are communicated by the owning action or domain composition.`]},docs:{description:{component:`A persistent status and feedback message for a meaningful state, consequence, or next step. Use explicit text and a semantic icon when the message affects safety, eligibility, trust, or recovery. Use AlertDialog or Toast for different interaction contracts.`}}},argTypes:{tone:{control:`radio`,options:[`neutral`,`info`,`success`,`warning`,`danger`,`ai`,`inverse`]},role:{control:`radio`,options:[`status`,`alert`]},dismissLabel:{control:`text`}}},y={"aria-hidden":!0},b={render:()=>(0,g.jsxs)(m,{children:[(0,g.jsx)(d,{children:`Review state saved`}),(0,g.jsx)(p,{children:`The record is ready for the next workflow step.`})]})},x={render:()=>(0,g.jsxs)(`div`,{className:`flex w-full max-w-2xl flex-col gap-[var(--space-inset-card)]`,children:[(0,g.jsxs)(m,{tone:`neutral`,children:[(0,g.jsx)(d,{children:`Draft record`}),(0,g.jsx)(p,{children:`Changes are stored locally until you submit the review.`})]}),(0,g.jsxs)(m,{tone:`info`,icon:(0,g.jsx)(a,{...y}),children:[(0,g.jsx)(d,{children:`Processing in progress`}),(0,g.jsx)(p,{children:`The latest result is being prepared for review.`})]}),(0,g.jsxs)(m,{tone:`success`,icon:(0,g.jsx)(l,{...y}),children:[(0,g.jsx)(d,{children:`Verification complete`}),(0,g.jsx)(p,{children:`The record passed the configured validation checks.`})]}),(0,g.jsxs)(m,{tone:`warning`,icon:(0,g.jsx)(s,{...y}),children:[(0,g.jsx)(d,{children:`Review required`}),(0,g.jsx)(p,{children:`Confirm the highlighted details before continuing.`})]}),(0,g.jsxs)(m,{tone:`danger`,icon:(0,g.jsx)(s,{...y}),children:[(0,g.jsx)(d,{children:`Sync failed`}),(0,g.jsx)(p,{children:`The latest changes were not sent. Retry or review the connection status.`})]}),(0,g.jsxs)(m,{tone:`ai`,icon:(0,g.jsx)(o,{...y}),children:[(0,g.jsx)(d,{children:`Assistant suggestion`}),(0,g.jsx)(p,{children:`An AI-generated suggestion is available for review before use.`})]}),(0,g.jsxs)(m,{tone:`inverse`,children:[(0,g.jsx)(d,{children:`Read-only workspace`}),(0,g.jsx)(p,{children:`Editing is unavailable for this session.`})]})]})},S={render:()=>(0,g.jsxs)(m,{tone:`info`,icon:(0,g.jsx)(a,{...y}),children:[(0,g.jsx)(d,{children:`New result available`}),(0,g.jsx)(p,{children:`Open the result to confirm the status and continue the review.`}),(0,g.jsxs)(f,{children:[(0,g.jsx)(h,{size:`sm`,children:`Open result`}),(0,g.jsx)(h,{size:`sm`,variant:`outline`,children:`Review later`})]})]})},C={render:()=>(0,g.jsxs)(m,{tone:`danger`,role:`alert`,icon:(0,g.jsx)(s,{...y}),children:[(0,g.jsx)(d,{children:`Connection lost`}),(0,g.jsx)(p,{children:`Your unsent changes are preserved. Reconnect before submitting the review.`}),(0,g.jsxs)(f,{children:[(0,g.jsx)(h,{size:`sm`,variant:`destructive`,leadingIcon:(0,g.jsx)(i,{...y}),children:`Retry connection`}),(0,g.jsx)(h,{size:`sm`,variant:`outline`,children:`View details`})]})]})},w={render:()=>{let[e,t]=(0,_.useState)(!0);return e?(0,g.jsxs)(m,{tone:`success`,icon:(0,g.jsx)(l,{...y}),onDismiss:()=>t(!1),children:[(0,g.jsx)(d,{children:`Changes saved`}),(0,g.jsx)(p,{children:`You can continue to the next section.`})]}):(0,g.jsx)(h,{variant:`outline`,onClick:()=>t(!0),children:`Show alert again`})}},T={render:()=>(0,g.jsxs)(m,{tone:`warning`,role:`alert`,icon:(0,g.jsx)(s,{...y}),children:[(0,g.jsx)(d,{children:`Identity confirmation required`}),(0,g.jsx)(p,{children:`Confirm the patient identity before opening or sharing the record.`}),(0,g.jsxs)(f,{children:[(0,g.jsx)(h,{size:`sm`,children:`Confirm identity`}),(0,g.jsx)(h,{size:`sm`,variant:`ghost`,children:`Cancel`})]})]})},E={render:()=>(0,g.jsxs)(m,{tone:`neutral`,icon:(0,g.jsx)(a,{...y}),children:[(0,g.jsx)(d,{children:`Access restricted`}),(0,g.jsx)(p,{children:`Your role can view this information but cannot edit it.`}),(0,g.jsx)(f,{children:(0,g.jsx)(h,{size:`sm`,variant:`outline`,children:`Contact workspace admin`})})]})},D={render:()=>(0,g.jsxs)(m,{tone:`warning`,icon:(0,g.jsx)(c,{...y}),children:[(0,g.jsx)(d,{children:`Working offline`}),(0,g.jsx)(p,{children:`New changes will remain on this device until the connection is restored.`}),(0,g.jsx)(f,{children:(0,g.jsx)(h,{size:`sm`,variant:`outline`,leadingIcon:(0,g.jsx)(i,{...y}),children:`Check connection`})})]})},O={render:()=>(0,g.jsxs)(m,{tone:`info`,icon:(0,g.jsx)(a,{...y}),children:[(0,g.jsx)(d,{children:`Before you continue`}),(0,g.jsxs)(p,{children:[(0,g.jsx)(`p`,{children:`Make sure the record has the correct owner and review context.`}),(0,g.jsxs)(`ul`,{children:[(0,g.jsx)(`li`,{children:`Check the identity details.`}),(0,g.jsx)(`li`,{children:`Confirm the selected review scope.`})]})]})]})},k={render:()=>(0,g.jsxs)(`div`,{className:`flex w-full max-w-2xl flex-col gap-[var(--space-inset-card)]`,"aria-label":`Service status summary`,children:[(0,g.jsxs)(m,{tone:`success`,icon:(0,g.jsx)(l,{...y}),children:[(0,g.jsx)(d,{children:`Core records`}),(0,g.jsx)(p,{children:`Available and responding normally.`})]}),(0,g.jsxs)(m,{tone:`warning`,icon:(0,g.jsx)(s,{...y}),children:[(0,g.jsx)(d,{children:`Document processing`}),(0,g.jsx)(p,{children:`Running with reduced throughput. New uploads may take longer.`})]}),(0,g.jsxs)(m,{tone:`danger`,role:`alert`,icon:(0,g.jsx)(s,{...y}),children:[(0,g.jsx)(d,{children:`External results`}),(0,g.jsx)(p,{children:`Unavailable. Do not rely on a missing result as confirmation.`}),(0,g.jsx)(f,{children:(0,g.jsx)(h,{size:`sm`,variant:`outline`,children:`View service details`})})]})]})},A={render:()=>(0,g.jsxs)(m,{tone:`warning`,icon:(0,g.jsx)(s,{...y}),onDismiss:()=>void 0,children:[(0,g.jsx)(d,{children:`Review context changed while you were working`}),(0,g.jsx)(p,{children:`Another authorized user updated this record. Review the latest information before saving so that your decision is based on current data and no important changes are overwritten.`}),(0,g.jsxs)(f,{children:[(0,g.jsx)(h,{size:`sm`,children:`Review latest changes`}),(0,g.jsx)(h,{size:`sm`,variant:`outline`,children:`Keep my draft`})]})]})},j={render:()=>(0,g.jsx)(`div`,{className:`grid w-full max-w-2xl gap-[var(--space-inset-card)]`,children:[`compact`,`cozy`,`comfortable`].map(e=>(0,g.jsxs)(`div`,{"data-density":e,className:`flex flex-col gap-[var(--space-stack-label)]`,children:[(0,g.jsx)(`span`,{className:`k-label`,children:e}),(0,g.jsxs)(m,{tone:`info`,icon:(0,g.jsx)(a,{...y}),children:[(0,g.jsx)(d,{children:`Processing in progress`}),(0,g.jsx)(p,{children:`The latest result is being prepared for review.`}),(0,g.jsx)(f,{children:(0,g.jsx)(h,{size:`sm`,children:`View status`})})]})]},e))})},M={parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,g.jsxs)(m,{tone:`danger`,role:`alert`,icon:(0,g.jsx)(s,{...y}),children:[(0,g.jsx)(d,{children:`Submission needs attention`}),(0,g.jsx)(p,{children:`Resolve the highlighted fields before submitting this record.`}),(0,g.jsxs)(f,{children:[(0,g.jsx)(h,{fullWidth:!0,children:`Review fields`}),(0,g.jsx)(h,{fullWidth:!0,variant:`outline`,children:`Save as draft`})]})]})},N={render:()=>(0,g.jsxs)(m,{tone:`inverse`,icon:(0,g.jsx)(a,{...y}),children:[(0,g.jsx)(d,{children:`Read-only mode`}),(0,g.jsx)(p,{children:`Actions are hidden because this workspace is currently viewing an archived record.`})]})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Alert>
      <AlertTitle>Review state saved</AlertTitle>
      <AlertDescription>The record is ready for the next workflow step.</AlertDescription>
    </Alert>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-full max-w-2xl flex-col gap-[var(--space-inset-card)]">
      <Alert tone="neutral">
        <AlertTitle>Draft record</AlertTitle>
        <AlertDescription>Changes are stored locally until you submit the review.</AlertDescription>
      </Alert>
      <Alert tone="info" icon={<InformationIcon {...storyIconProps} />}>
        <AlertTitle>Processing in progress</AlertTitle>
        <AlertDescription>The latest result is being prepared for review.</AlertDescription>
      </Alert>
      <Alert tone="success" icon={<SuccessIcon {...storyIconProps} />}>
        <AlertTitle>Verification complete</AlertTitle>
        <AlertDescription>The record passed the configured validation checks.</AlertDescription>
      </Alert>
      <Alert tone="warning" icon={<WarningIcon {...storyIconProps} />}>
        <AlertTitle>Review required</AlertTitle>
        <AlertDescription>Confirm the highlighted details before continuing.</AlertDescription>
      </Alert>
      <Alert tone="danger" icon={<AlertIcon {...storyIconProps} />}>
        <AlertTitle>Sync failed</AlertTitle>
        <AlertDescription>The latest changes were not sent. Retry or review the connection status.</AlertDescription>
      </Alert>
      <Alert tone="ai" icon={<AiBrainIcon {...storyIconProps} />}>
        <AlertTitle>Assistant suggestion</AlertTitle>
        <AlertDescription>An AI-generated suggestion is available for review before use.</AlertDescription>
      </Alert>
      <Alert tone="inverse">
        <AlertTitle>Read-only workspace</AlertTitle>
        <AlertDescription>Editing is unavailable for this session.</AlertDescription>
      </Alert>
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Alert tone="info" icon={<InformationIcon {...storyIconProps} />}>
      <AlertTitle>New result available</AlertTitle>
      <AlertDescription>Open the result to confirm the status and continue the review.</AlertDescription>
      <AlertAction>
        <Button size="sm">Open result</Button>
        <Button size="sm" variant="outline">Review later</Button>
      </AlertAction>
    </Alert>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Alert tone="danger" role="alert" icon={<AlertIcon {...storyIconProps} />}>
      <AlertTitle>Connection lost</AlertTitle>
      <AlertDescription>Your unsent changes are preserved. Reconnect before submitting the review.</AlertDescription>
      <AlertAction>
        <Button size="sm" variant="destructive" leadingIcon={<RefreshIcon {...storyIconProps} />}>Retry connection</Button>
        <Button size="sm" variant="outline">View details</Button>
      </AlertAction>
    </Alert>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [visible, setVisible] = useState(true);
    return visible ? <Alert tone="success" icon={<SuccessIcon {...storyIconProps} />} onDismiss={() => setVisible(false)}>
        <AlertTitle>Changes saved</AlertTitle>
        <AlertDescription>You can continue to the next section.</AlertDescription>
      </Alert> : <Button variant="outline" onClick={() => setVisible(true)}>Show alert again</Button>;
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Alert tone="warning" role="alert" icon={<WarningIcon {...storyIconProps} />}>
      <AlertTitle>Identity confirmation required</AlertTitle>
      <AlertDescription>Confirm the patient identity before opening or sharing the record.</AlertDescription>
      <AlertAction>
        <Button size="sm">Confirm identity</Button>
        <Button size="sm" variant="ghost">Cancel</Button>
      </AlertAction>
    </Alert>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <Alert tone="neutral" icon={<InformationIcon {...storyIconProps} />}>
      <AlertTitle>Access restricted</AlertTitle>
      <AlertDescription>Your role can view this information but cannot edit it.</AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline">Contact workspace admin</Button>
      </AlertAction>
    </Alert>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <Alert tone="warning" icon={<OfflineIcon {...storyIconProps} />}>
      <AlertTitle>Working offline</AlertTitle>
      <AlertDescription>New changes will remain on this device until the connection is restored.</AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline" leadingIcon={<RefreshIcon {...storyIconProps} />}>Check connection</Button>
      </AlertAction>
    </Alert>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <Alert tone="info" icon={<InformationIcon {...storyIconProps} />}>
      <AlertTitle>Before you continue</AlertTitle>
      <AlertDescription>
        <p>Make sure the record has the correct owner and review context.</p>
        <ul>
          <li>Check the identity details.</li>
          <li>Confirm the selected review scope.</li>
        </ul>
      </AlertDescription>
    </Alert>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-full max-w-2xl flex-col gap-[var(--space-inset-card)]" aria-label="Service status summary">
      <Alert tone="success" icon={<SuccessIcon {...storyIconProps} />}>
        <AlertTitle>Core records</AlertTitle>
        <AlertDescription>Available and responding normally.</AlertDescription>
      </Alert>
      <Alert tone="warning" icon={<WarningIcon {...storyIconProps} />}>
        <AlertTitle>Document processing</AlertTitle>
        <AlertDescription>Running with reduced throughput. New uploads may take longer.</AlertDescription>
      </Alert>
      <Alert tone="danger" role="alert" icon={<AlertIcon {...storyIconProps} />}>
        <AlertTitle>External results</AlertTitle>
        <AlertDescription>Unavailable. Do not rely on a missing result as confirmation.</AlertDescription>
        <AlertAction>
          <Button size="sm" variant="outline">View service details</Button>
        </AlertAction>
      </Alert>
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <Alert tone="warning" icon={<WarningIcon {...storyIconProps} />} onDismiss={() => undefined}>
      <AlertTitle>Review context changed while you were working</AlertTitle>
      <AlertDescription>
        Another authorized user updated this record. Review the latest information before saving so that your decision is based on current data and no important changes are overwritten.
      </AlertDescription>
      <AlertAction>
        <Button size="sm">Review latest changes</Button>
        <Button size="sm" variant="outline">Keep my draft</Button>
      </AlertAction>
    </Alert>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-2xl gap-[var(--space-inset-card)]">
      {(['compact', 'cozy', 'comfortable'] as const).map(density => <div key={density} data-density={density} className="flex flex-col gap-[var(--space-stack-label)]">
          <span className="k-label">{density}</span>
          <Alert tone="info" icon={<InformationIcon {...storyIconProps} />}>
            <AlertTitle>Processing in progress</AlertTitle>
            <AlertDescription>The latest result is being prepared for review.</AlertDescription>
            <AlertAction>
              <Button size="sm">View status</Button>
            </AlertAction>
          </Alert>
        </div>)}
    </div>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <Alert tone="danger" role="alert" icon={<AlertIcon {...storyIconProps} />}>
      <AlertTitle>Submission needs attention</AlertTitle>
      <AlertDescription>Resolve the highlighted fields before submitting this record.</AlertDescription>
      <AlertAction>
        <Button fullWidth>Review fields</Button>
        <Button fullWidth variant="outline">Save as draft</Button>
      </AlertAction>
    </Alert>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <Alert tone="inverse" icon={<InformationIcon {...storyIconProps} />}>
      <AlertTitle>Read-only mode</AlertTitle>
      <AlertDescription>Actions are hidden because this workspace is currently viewing an archived record.</AlertDescription>
    </Alert>
}`,...N.parameters?.docs?.source}}},P=[`Default`,`SemanticTones`,`WithIconAndActions`,`DangerRecovery`,`Dismissible`,`UrgentOperationalNotice`,`PermissionRestricted`,`OfflineRecovery`,`RichDescription`,`StackedStatusSummary`,`LongContent`,`DensityModes`,`MobileActions`,`InverseNotice`]}))();export{C as DangerRecovery,b as Default,j as DensityModes,w as Dismissible,N as InverseNotice,A as LongContent,M as MobileActions,D as OfflineRecovery,E as PermissionRestricted,O as RichDescription,x as SemanticTones,k as StackedStatusSummary,T as UrgentOperationalNotice,S as WithIconAndActions,P as __namedExportsOrder,v as default};