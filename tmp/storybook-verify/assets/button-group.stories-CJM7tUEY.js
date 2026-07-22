import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{i as n}from"./provider-marks-BeHzyBjc.js";import{t as r}from"./ui-C9kmmzkH.js";import{d as i}from"./date-range-picker-CVkMECHY.js";import{t as a}from"./button-B6_zsN5-.js";import{a as o}from"./collapsible-Cfc9M9oP.js";import{r as s}from"./segmented-toggle-DDpNscFF.js";var c,l,u,d,f,p,m,h,g;e((()=>{c=t(),r(),l={title:`Design System/Patterns/ButtonGroup`,component:s,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`Kura keeps ButtonGroup as the related-action layout owner and adopts Kura joined-control geometry and finish.`},source:{vendor:`Kura`,registryItem:`button-group`,visualReference:`Kura button-group`},binding:{colors:`delegated-to-kura-children`,typography:`delegated-to-kura-children`,spacing:`kura`,radius:`kura`,elevation:`none`,icons:`delegated-to-kura-children`,density:`kura-root-attribute`,responsive:`stack-actions-under-480px`},exclusions:[{capability:`Navigation tabs`,reason:`Related navigation is a tab or breadcrumb concern, not a grouped action concern.`,replacement:`Use the canonical Tabs or Breadcrumb owner when the journey calls for navigation.`},{capability:`Pagination, split buttons, filter/input toolbars, and dropdown menus`,reason:`These are task patterns with independent data, menu, keyboard, and validation contracts; treating them as ButtonGroup variants would create a catch-all abstraction.`,replacement:`Compose ButtonGroup with the owning Pagination, Filter, Input, DropdownMenu, or split-action pattern when those owners are available.`}]}}},u={args:{label:`Visit actions`,children:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{variant:`secondary`,children:`Save draft`}),(0,c.jsx)(a,{variant:`primary`,children:`Start consultation`})]})}},d={args:{children:null},render:()=>(0,c.jsxs)(s,{label:`Result view`,segmented:!0,children:[(0,c.jsx)(a,{variant:`outline`,children:`Summary`}),(0,c.jsx)(a,{variant:`outline`,children:`Timeline`}),(0,c.jsx)(a,{variant:`outline`,children:`Audit`})]})},f={args:{children:null},render:()=>(0,c.jsxs)(s,{label:`Record actions`,orientation:`vertical`,children:[(0,c.jsx)(a,{variant:`secondary`,fullWidth:!0,children:`Save draft`}),(0,c.jsx)(a,{variant:`primary`,fullWidth:!0,children:`Submit record`}),(0,c.jsx)(a,{variant:`destructive`,fullWidth:!0,children:`Remove draft`})]})},p={args:{children:null},render:()=>(0,c.jsxs)(s,{label:`Quick actions`,children:[(0,c.jsx)(a,{variant:`secondary`,leadingIcon:(0,c.jsx)(n,{"aria-hidden":`true`}),children:`Add note`}),(0,c.jsx)(i,{"aria-label":`Add diagnosis`,children:(0,c.jsx)(n,{"aria-hidden":`true`})})]})},m={args:{children:null},render:()=>(0,c.jsxs)(s,{label:`Order actions`,children:[(0,c.jsx)(a,{variant:`secondary`,children:`Review order`}),(0,c.jsx)(a,{variant:`outline`,trailingIcon:(0,c.jsx)(o,{variant:`warning`,children:`3`}),children:`Pending items`})]})},h={args:{children:null},render:()=>(0,c.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,c.jsxs)(s,{label:`Consultation actions`,children:[(0,c.jsx)(a,{variant:`secondary`,children:`Save the consultation draft`}),(0,c.jsx)(a,{variant:`primary`,children:`Start the consultation`})]})})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Visit actions',
    children: <>
        <Button variant="secondary">Save draft</Button>
        <Button variant="primary">Start consultation</Button>
      </>
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ButtonGroup label="Result view" segmented>
      <Button variant="outline">Summary</Button>
      <Button variant="outline">Timeline</Button>
      <Button variant="outline">Audit</Button>
    </ButtonGroup>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ButtonGroup label="Record actions" orientation="vertical">
      <Button variant="secondary" fullWidth>
        Save draft
      </Button>
      <Button variant="primary" fullWidth>
        Submit record
      </Button>
      <Button variant="destructive" fullWidth>
        Remove draft
      </Button>
    </ButtonGroup>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ButtonGroup label="Quick actions">
      <Button variant="secondary" leadingIcon={<PlusIcon aria-hidden="true" />}>
        Add note
      </Button>
      <IconButton aria-label="Add diagnosis">
        <PlusIcon aria-hidden="true" />
      </IconButton>
    </ButtonGroup>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ButtonGroup label="Order actions">
      <Button variant="secondary">Review order</Button>
      <Button variant="outline" trailingIcon={<Badge variant="warning">3</Badge>}>
        Pending items
      </Button>
    </ButtonGroup>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <div className="w-full max-w-sm">
      <ButtonGroup label="Consultation actions">
        <Button variant="secondary">Save the consultation draft</Button>
        <Button variant="primary">Start the consultation</Button>
      </ButtonGroup>
    </div>
}`,...h.parameters?.docs?.source}}},g=[`Actions`,`Segmented`,`Vertical`,`WithIconButton`,`WithStatusContext`,`MobileStack`]}))();export{u as Actions,h as MobileStack,d as Segmented,f as Vertical,p as WithIconButton,m as WithStatusContext,g as __namedExportsOrder,l as default};