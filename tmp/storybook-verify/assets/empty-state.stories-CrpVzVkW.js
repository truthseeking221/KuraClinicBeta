import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{Ht as n,N as r,Rt as i,_t as a,ct as o,g as s,kt as c}from"./provider-marks-BeHzyBjc.js";import{t as l}from"./icons-C5MW4nvJ.js";import{t as u}from"./ui-C9kmmzkH.js";import{t as d}from"./button-B6_zsN5-.js";import{t as f}from"./input-UaJWx_9h.js";import{a as p,i as m,n as h,o as g,r as _,s as v,t as y}from"./empty-state-DlAvBIIY.js";var b,x,S,C,w=e((()=>{b=`_surfaceMatrix_lc3vg_1`,x=`_tabletBounds_lc3vg_13`,S=`_desktopBounds_lc3vg_14`,C={surfaceMatrix:b,tabletBounds:x,desktopBounds:S}})),T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V;e((()=>{T=t(),u(),l(),v(),w(),{expect:E,within:D}=__STORYBOOK_MODULE_TEST__,O={title:`Design System/Patterns/Empty State`,component:y,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:{intake:{decision:`CREATE`,owner:`src/components/shared/empty-state`,evidence:`The Storybook catalog and Card story referenced empty states but no production implementation existed. Empty State is a reusable task-level composition, not a visual primitive.`},source:{vendor:`ReUI`,registryItem:`empty and c-empty-1 through c-empty-20`,sourceUrl:`https://reui.io/components/empty`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura-card-when-surface-is-meaningful`,elevation:`none`,icons:`kura-canonical`,density:`content-driven`,responsive:`FLUID + STACKING actions below 480px`,motion:`none`},exclusions:[{reuiExample:`Decorative isometric and stacked-card illustrations`,reason:`Copied inline SVG and decorative mock objects would create a foreign visual language and add no task information.`,replacement:`Kura icon media or an approved product illustration supplied by the owning feature.`},{reuiExample:`Loading or unavailable data presented as empty`,reason:`Empty, loading, permission denial, offline, and failure must remain distinguishable.`,replacement:`Loading owner, Alert, or permission-specific feature state.`},{reuiExample:`Generic SaaS project, product, payment, integration, and automation copy`,reason:`The pattern must describe the real Kura collection and the next available action.`,replacement:`Role-appropriate Kura content supplied by the consuming story or feature.`}]},docs:{description:{component:`Explains why a collection or workspace has no useful content, whether that is expected, and what the user can do next. It removes controls that cannot work and keeps at most one dominant recovery or creation action.`}}},argTypes:{surface:{control:`radio`,options:[`plain`,`muted`,`outlined`]},align:{control:`radio`,options:[`center`,`start`]}}},k={render:()=>(0,T.jsxs)(y,{children:[(0,T.jsxs)(m,{children:[(0,T.jsx)(p,{variant:`icon`,children:(0,T.jsx)(o,{"aria-hidden":`true`})}),(0,T.jsx)(g,{children:`No documents recorded`}),(0,T.jsx)(_,{children:`This patient record does not contain uploaded or generated documents yet.`})]}),(0,T.jsx)(h,{children:(0,T.jsx)(d,{children:`Add document`})})]}),play:async({canvasElement:e})=>{let t=D(e);await E(t.getByRole(`heading`,{name:/no documents recorded/i})).toBeVisible(),await E(t.getByRole(`button`,{name:/add document/i})).toBeVisible()}},A={render:()=>(0,T.jsxs)(y,{surface:`muted`,children:[(0,T.jsxs)(m,{children:[(0,T.jsx)(p,{variant:`icon`,children:(0,T.jsx)(c,{"aria-hidden":`true`})}),(0,T.jsx)(g,{children:`No patients match “Sokha Chann”`}),(0,T.jsx)(_,{children:`Check the spelling, remove a filter, or search by verified phone number or patient ID.`})]}),(0,T.jsx)(h,{children:(0,T.jsx)(d,{variant:`outline`,children:`Clear search and filters`})})]})},j={render:()=>(0,T.jsxs)(y,{align:`start`,surface:`outlined`,children:[(0,T.jsxs)(m,{children:[(0,T.jsx)(p,{variant:`icon`,children:(0,T.jsx)(r,{"aria-hidden":`true`})}),(0,T.jsx)(g,{children:`No matching lab master data`}),(0,T.jsx)(_,{children:`Search by test name, code, specimen, or reporting unit.`})]}),(0,T.jsx)(h,{children:(0,T.jsx)(f,{label:`Search lab master data`,placeholder:`e.g. HbA1c`})})]})},M={render:()=>(0,T.jsxs)(y,{surface:`outlined`,children:[(0,T.jsxs)(m,{children:[(0,T.jsx)(p,{variant:`icon`,children:(0,T.jsx)(i,{"aria-hidden":`true`})}),(0,T.jsx)(g,{children:`No attachments added`}),(0,T.jsx)(_,{children:`Upload PDF or image files up to 10 MB. Do not upload documents for another patient.`})]}),(0,T.jsx)(h,{children:(0,T.jsx)(d,{variant:`outline`,children:`Choose files`})})]})},N={render:()=>(0,T.jsx)(y,{children:(0,T.jsxs)(m,{children:[(0,T.jsx)(p,{variant:`icon`,children:(0,T.jsx)(a,{"aria-hidden":`true`})}),(0,T.jsx)(g,{children:`No unread notifications`}),(0,T.jsx)(_,{children:`New operational and review notifications will appear here.`})]})})},P={render:()=>(0,T.jsxs)(y,{children:[(0,T.jsxs)(m,{children:[(0,T.jsx)(p,{variant:`icon`,children:(0,T.jsx)(n,{"aria-hidden":`true`})}),(0,T.jsx)(g,{children:`No clinic members added`}),(0,T.jsx)(_,{children:`Add the first member and assign only the roles needed for their work.`})]}),(0,T.jsxs)(h,{children:[(0,T.jsx)(d,{children:`Add clinic member`}),(0,T.jsx)(d,{variant:`link`,children:`Review role guidance`})]})]})},F={render:()=>(0,T.jsxs)(y,{surface:`muted`,children:[(0,T.jsxs)(m,{children:[(0,T.jsx)(p,{variant:`icon`,children:(0,T.jsx)(s,{"aria-hidden":`true`})}),(0,T.jsx)(g,{children:`No follow-up visits scheduled`}),(0,T.jsx)(_,{children:`Schedule a follow-up only when the care plan requires another visit.`})]}),(0,T.jsx)(h,{children:(0,T.jsx)(d,{children:`Schedule follow-up`})})]})},I={render:()=>(0,T.jsx)(y,{align:`start`,children:(0,T.jsxs)(m,{children:[(0,T.jsx)(p,{variant:`icon`,children:(0,T.jsx)(o,{"aria-hidden":`true`})}),(0,T.jsx)(g,{children:`No verified result is available for ការពិនិត្យជាតិស្ករក្នុងឈាមរយៈពេលវែង (Hemoglobin A1c)`}),(0,T.jsx)(_,{children:`The specimen was collected, but the result has not been verified by the laboratory. Do not interpret this as a normal result. Return to the order later or contact the laboratory if the expected turnaround time has passed.`})]})})},L={render:()=>(0,T.jsx)(`div`,{className:C.surfaceMatrix,children:[`plain`,`muted`,`outlined`].map(e=>(0,T.jsx)(y,{surface:e,children:(0,T.jsxs)(m,{children:[(0,T.jsx)(p,{variant:`icon`,children:(0,T.jsx)(r,{"aria-hidden":`true`})}),(0,T.jsxs)(g,{children:[e,` surface`]}),(0,T.jsx)(_,{children:`A surface is used only when it communicates a real boundary or interaction context.`})]})},e))})},R={globals:{viewport:{value:`kura390`}},render:()=>(0,T.jsxs)(y,{children:[(0,T.jsxs)(m,{children:[(0,T.jsx)(p,{variant:`icon`,children:(0,T.jsx)(o,{"aria-hidden":`true`})}),(0,T.jsx)(g,{children:`No care-plan drafts`}),(0,T.jsx)(_,{children:`Create a draft when the patient needs a documented follow-up plan.`})]}),(0,T.jsxs)(h,{children:[(0,T.jsx)(d,{children:`Create care-plan draft`}),(0,T.jsx)(d,{variant:`outline`,children:`Return to patient record`})]})]})},z={render:()=>(0,T.jsx)(`div`,{className:C.tabletBounds,children:(0,T.jsx)(y,{surface:`muted`,children:(0,T.jsxs)(m,{children:[(0,T.jsx)(g,{children:`No records in this view`}),(0,T.jsx)(_,{children:`Change the date range or remove a filter.`})]})})})},B={render:()=>(0,T.jsx)(`div`,{className:C.desktopBounds,children:(0,T.jsx)(y,{align:`start`,children:(0,T.jsxs)(m,{children:[(0,T.jsx)(g,{children:`No records in this view`}),(0,T.jsx)(_,{children:`Change the date range or remove a filter.`})]})})})},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <EmptyState>
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon"><MedicalFileIcon aria-hidden="true" /></EmptyStateMedia>
        <EmptyStateTitle>No documents recorded</EmptyStateTitle>
        <EmptyStateDescription>
          This patient record does not contain uploaded or generated documents yet.
        </EmptyStateDescription>
      </EmptyStateHeader>
      <EmptyStateContent>
        <Button>Add document</Button>
      </EmptyStateContent>
    </EmptyState>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: /no documents recorded/i
    })).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: /add document/i
    })).toBeVisible();
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <EmptyState surface="muted">
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon"><SearchIcon aria-hidden="true" /></EmptyStateMedia>
        <EmptyStateTitle>No patients match “Sokha Chann”</EmptyStateTitle>
        <EmptyStateDescription>
          Check the spelling, remove a filter, or search by verified phone number or patient ID.
        </EmptyStateDescription>
      </EmptyStateHeader>
      <EmptyStateContent>
        <Button variant="outline">Clear search and filters</Button>
      </EmptyStateContent>
    </EmptyState>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <EmptyState align="start" surface="outlined">
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon"><DatabaseIcon aria-hidden="true" /></EmptyStateMedia>
        <EmptyStateTitle>No matching lab master data</EmptyStateTitle>
        <EmptyStateDescription>
          Search by test name, code, specimen, or reporting unit.
        </EmptyStateDescription>
      </EmptyStateHeader>
      <EmptyStateContent>
        <Input label="Search lab master data" placeholder="e.g. HbA1c" />
      </EmptyStateContent>
    </EmptyState>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <EmptyState surface="outlined">
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon"><UploadIcon aria-hidden="true" /></EmptyStateMedia>
        <EmptyStateTitle>No attachments added</EmptyStateTitle>
        <EmptyStateDescription>
          Upload PDF or image files up to 10 MB. Do not upload documents for another patient.
        </EmptyStateDescription>
      </EmptyStateHeader>
      <EmptyStateContent>
        <Button variant="outline">Choose files</Button>
      </EmptyStateContent>
    </EmptyState>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <EmptyState>
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon"><NotificationsIcon aria-hidden="true" /></EmptyStateMedia>
        <EmptyStateTitle>No unread notifications</EmptyStateTitle>
        <EmptyStateDescription>
          New operational and review notifications will appear here.
        </EmptyStateDescription>
      </EmptyStateHeader>
    </EmptyState>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <EmptyState>
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon"><UserGroupIcon aria-hidden="true" /></EmptyStateMedia>
        <EmptyStateTitle>No clinic members added</EmptyStateTitle>
        <EmptyStateDescription>
          Add the first member and assign only the roles needed for their work.
        </EmptyStateDescription>
      </EmptyStateHeader>
      <EmptyStateContent>
        <Button>Add clinic member</Button>
        <Button variant="link">Review role guidance</Button>
      </EmptyStateContent>
    </EmptyState>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <EmptyState surface="muted">
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon"><CalendarIcon aria-hidden="true" /></EmptyStateMedia>
        <EmptyStateTitle>No follow-up visits scheduled</EmptyStateTitle>
        <EmptyStateDescription>
          Schedule a follow-up only when the care plan requires another visit.
        </EmptyStateDescription>
      </EmptyStateHeader>
      <EmptyStateContent>
        <Button>Schedule follow-up</Button>
      </EmptyStateContent>
    </EmptyState>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <EmptyState align="start">
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon"><MedicalFileIcon aria-hidden="true" /></EmptyStateMedia>
        <EmptyStateTitle>
          No verified result is available for ការពិនិត្យជាតិស្ករក្នុងឈាមរយៈពេលវែង (Hemoglobin A1c)
        </EmptyStateTitle>
        <EmptyStateDescription>
          The specimen was collected, but the result has not been verified by the laboratory. Do not
          interpret this as a normal result. Return to the order later or contact the laboratory if the
          expected turnaround time has passed.
        </EmptyStateDescription>
      </EmptyStateHeader>
    </EmptyState>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <div className={storyStyles.surfaceMatrix}>
      {(['plain', 'muted', 'outlined'] as const).map(surface => <EmptyState surface={surface} key={surface}>
          <EmptyStateHeader>
            <EmptyStateMedia variant="icon"><DatabaseIcon aria-hidden="true" /></EmptyStateMedia>
            <EmptyStateTitle>{surface} surface</EmptyStateTitle>
            <EmptyStateDescription>
              A surface is used only when it communicates a real boundary or interaction context.
            </EmptyStateDescription>
          </EmptyStateHeader>
        </EmptyState>)}
    </div>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  globals: {
    viewport: {
      value: 'kura390'
    }
  },
  render: () => <EmptyState>
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon"><MedicalFileIcon aria-hidden="true" /></EmptyStateMedia>
        <EmptyStateTitle>No care-plan drafts</EmptyStateTitle>
        <EmptyStateDescription>
          Create a draft when the patient needs a documented follow-up plan.
        </EmptyStateDescription>
      </EmptyStateHeader>
      <EmptyStateContent>
        <Button>Create care-plan draft</Button>
        <Button variant="outline">Return to patient record</Button>
      </EmptyStateContent>
    </EmptyState>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <div className={storyStyles.tabletBounds}>
      <EmptyState surface="muted">
        <EmptyStateHeader>
          <EmptyStateTitle>No records in this view</EmptyStateTitle>
          <EmptyStateDescription>Change the date range or remove a filter.</EmptyStateDescription>
        </EmptyStateHeader>
      </EmptyState>
    </div>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <div className={storyStyles.desktopBounds}>
      <EmptyState align="start">
        <EmptyStateHeader>
          <EmptyStateTitle>No records in this view</EmptyStateTitle>
          <EmptyStateDescription>Change the date range or remove a filter.</EmptyStateDescription>
        </EmptyStateHeader>
      </EmptyState>
    </div>
}`,...B.parameters?.docs?.source}}},V=[`Default`,`SearchNoResults`,`SearchWithinEmptyState`,`UploadBoundary`,`ExpectedEmpty`,`FirstUse`,`NoUpcomingEvents`,`LongContent`,`SurfaceMatrix`,`MobileInteractive`,`Tablet`,`Desktop`]}))();export{k as Default,B as Desktop,N as ExpectedEmpty,P as FirstUse,I as LongContent,R as MobileInteractive,F as NoUpcomingEvents,A as SearchNoResults,j as SearchWithinEmptyState,L as SurfaceMatrix,z as Tablet,M as UploadBoundary,V as __namedExportsOrder,O as default};