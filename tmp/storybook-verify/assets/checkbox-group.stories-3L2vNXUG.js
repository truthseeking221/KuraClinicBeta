import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{Bt as i,g as a}from"./provider-marks-BeHzyBjc.js";import{fr as o,t as s,ur as c}from"./ui-C9kmmzkH.js";import{a as l,r as u}from"./skeleton-yGvKPj3C.js";import{a as d}from"./collapsible-Cfc9M9oP.js";import{i as f,l as p,o as m,r as h,t as g}from"./card-DMMaaphC.js";function _(){let e=[{id:`results`,label:`Include laboratory results`},{id:`medicines`,label:`Include current medication list`},{id:`instructions`,label:`Include patient preparation instructions`}],[t,n]=(0,y.useState)(new Set([`results`])),r=t.size===e.length,i=t.size>0&&!r;function a(e,t){n(n=>{let r=new Set(n);return t?r.add(e):r.delete(e),r})}return(0,v.jsxs)(c,{description:`Choose the sections that will appear in the printed order summary.`,legend:`Order summary sections`,children:[(0,v.jsx)(o,{checked:r,indeterminate:i,onCheckedChange:t=>n(t?new Set(e.map(({id:e})=>e)):new Set),children:`Select all sections`}),(0,v.jsx)(c,{legend:`Included sections`,children:e.map(({id:e,label:n})=>(0,v.jsx)(o,{checked:t.has(e),onCheckedChange:t=>a(e,t),children:n},e))})]})}var v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N;t((()=>{v=r(),y=e(n()),s(),{expect:b,userEvent:x,within:S}=__STORYBOOK_MODULE_TEST__,C={title:`Design System/Patterns/CheckboxGroup`,component:c,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`centered`,chromatic:{viewports:[320,360,390,412,480,768,1024,1440]},kura:{intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`Kura has a canonical Checkbox primitive but no semantic owner for a related multiple-choice set. A fieldset and legend add native group semantics while preserving Checkbox as the only binary control owner.`},source:{vendor:`Kura`,registryItem:`checkbox`,visualReference:`Kura checkbox`},binding:{colors:`kura-semantic-and-delegated-to-kura-children`,typography:`kura`,spacing:`kura`,radius:`none-on-group`,elevation:`none-on-group`,icons:`kura-canonical`,density:`kura-root-attribute-through-checkbox`,responsive:`horizontal-wraps-then-stacks-under-480px`},retainedCapabilities:[`Vertical and inline multiple-choice groups`,`Native fieldset and legend semantics with visible description and error recovery`,`Nested select-all state using the Checkbox indeterminate contract`,`Card, icon, avatar, and badge composition through canonical Kura components`],exclusions:[{capability:`Frame and card styling baked into a group variant`,reason:`A group is semantic form structure, not a surface component.`,replacement:`Compose CheckboxGroup inside the canonical Card when the task has a real surface boundary.`},{capability:`Avatar, icon, or badge-specific checkbox variants`,reason:`Those elements remain independently owned and must not create parallel checkbox APIs.`,replacement:`Pass the canonical Avatar, Badge, or Kura icon as Checkbox label content.`}]},docs:{description:{component:`Groups related multi-select choices in a native fieldset. It owns the group label, visible context, validation guidance, layout and responsive reflow; Checkbox continues to own the individual choice.`}}},argTypes:{orientation:{control:`radio`,options:[`vertical`,`horizontal`]}}},w={args:{legend:`Specimen collection safeguards`,description:`Confirm the safeguards that have been completed before collection.`,children:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(o,{defaultChecked:!0,children:`Patient identity verified`}),(0,v.jsx)(o,{children:`Collection site confirmed`}),(0,v.jsx)(o,{children:`Required supplies prepared`})]})},play:async({canvasElement:e})=>{let t=S(e),n=t.getByRole(`group`,{name:`Specimen collection safeguards`}),r=t.getByRole(`checkbox`,{name:`Patient identity verified`});await b(n).toBeInTheDocument(),await b(r).toBeChecked()}},T={args:{legend:`Order summary inclusions`,orientation:`horizontal`,children:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(o,{defaultChecked:!0,children:`Laboratory results`}),(0,v.jsx)(o,{children:`Medication list`}),(0,v.jsx)(o,{children:`Preparation instructions`})]})}},E={args:{legend:`Release checklist`,description:`At least one acknowledgement is required before release.`,error:`Confirm the release safeguard before continuing.`,children:(0,v.jsx)(o,{children:`I have reviewed the order details`})},play:async({canvasElement:e})=>{let t=S(e),n=t.getByRole(`group`,{name:`Release checklist`});await b(n).toHaveAttribute(`aria-invalid`,`true`),await b(t.getByRole(`alert`)).toHaveTextContent(`Confirm the release safeguard before continuing.`)}},D={args:{legend:`Order summary sections`},render:()=>(0,v.jsx)(_,{}),play:async({canvasElement:e})=>{let t=S(e),n=t.getByRole(`checkbox`,{name:`Select all sections`}),r=t.getByRole(`checkbox`,{name:`Include laboratory results`}),i=t.getByRole(`checkbox`,{name:`Include current medication list`});await b(n).toHaveAttribute(`aria-checked`,`mixed`),await x.click(n),await b(n).toBeChecked(),await b(i).toBeChecked(),await x.click(r),await b(n).toHaveAttribute(`aria-checked`,`mixed`)}},O={args:{legend:`Recipients`},render:()=>(0,v.jsxs)(g,{className:`max-w-xl`,children:[(0,v.jsxs)(m,{children:[(0,v.jsx)(p,{children:`Follow-up recipients`}),(0,v.jsx)(f,{children:`Include the clinicians who should receive the completed consultation summary.`})]}),(0,v.jsx)(h,{children:(0,v.jsxs)(c,{legend:`Recipients`,orientation:`horizontal`,children:[(0,v.jsx)(o,{defaultChecked:!0,children:(0,v.jsxs)(`span`,{className:`flex min-w-0 items-center gap-2`,children:[(0,v.jsx)(u,{"aria-hidden":`true`,size:`sm`,children:(0,v.jsx)(l,{children:`LM`})}),(0,v.jsx)(`span`,{className:`min-w-0`,children:`Dr Linh Minh`}),(0,v.jsx)(d,{variant:`primary`,children:`Primary care`})]})}),(0,v.jsx)(o,{children:(0,v.jsxs)(`span`,{className:`flex min-w-0 items-center gap-2`,children:[(0,v.jsx)(i,{"aria-hidden":`true`}),(0,v.jsx)(`span`,{className:`min-w-0`,children:`Assigned care coordinator`})]})}),(0,v.jsx)(o,{children:(0,v.jsxs)(`span`,{className:`flex min-w-0 items-center gap-2`,children:[(0,v.jsx)(a,{"aria-hidden":`true`}),(0,v.jsx)(`span`,{className:`min-w-0`,children:`Next appointment briefing`})]})})]})})]})},k={args:{className:`max-w-xs`,legend:`Printed order summary`,description:`Selections remain reachable and readable at the narrowest supported width.`,children:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(o,{defaultChecked:!0,children:`Include the patient preparation instructions in the printed order summary`}),(0,v.jsx)(o,{children:`Include the current medication list`})]})}},A={args:{className:`max-w-sm`,legend:`Collection safeguards`,children:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(o,{defaultChecked:!0,children:`Patient identity verified`}),(0,v.jsx)(o,{children:`Confirm specimen labels before collection`})]})},play:async({canvasElement:e})=>{let t=S(e).getByRole(`checkbox`,{name:`Confirm specimen labels before collection`});await x.click(t),await b(t).toBeChecked()}},j={args:{className:`max-w-2xl`,legend:`Order summary inclusions`,orientation:`horizontal`,children:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(o,{defaultChecked:!0,children:`Laboratory results`}),(0,v.jsx)(o,{children:`Medication list`}),(0,v.jsx)(o,{children:`Preparation instructions`})]})}},M={args:{className:`max-w-4xl`,legend:`Record completion`,orientation:`horizontal`,children:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(o,{defaultChecked:!0,children:`Patient identity verified`}),(0,v.jsx)(o,{children:`Send a copy to the referring clinician`})]})}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    legend: 'Specimen collection safeguards',
    description: 'Confirm the safeguards that have been completed before collection.',
    children: <>
        <Checkbox defaultChecked>Patient identity verified</Checkbox>
        <Checkbox>Collection site confirmed</Checkbox>
        <Checkbox>Required supplies prepared</Checkbox>
      </>
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group', {
      name: 'Specimen collection safeguards'
    });
    const identity = canvas.getByRole('checkbox', {
      name: 'Patient identity verified'
    });
    await expect(group).toBeInTheDocument();
    await expect(identity).toBeChecked();
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    legend: 'Order summary inclusions',
    orientation: 'horizontal',
    children: <>
        <Checkbox defaultChecked>Laboratory results</Checkbox>
        <Checkbox>Medication list</Checkbox>
        <Checkbox>Preparation instructions</Checkbox>
      </>
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    legend: 'Release checklist',
    description: 'At least one acknowledgement is required before release.',
    error: 'Confirm the release safeguard before continuing.',
    children: <Checkbox>I have reviewed the order details</Checkbox>
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group', {
      name: 'Release checklist'
    });
    await expect(group).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Confirm the release safeguard before continuing.');
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    legend: 'Order summary sections'
  },
  render: () => <NestedOrderSummary />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const selectAll = canvas.getByRole('checkbox', {
      name: 'Select all sections'
    });
    const results = canvas.getByRole('checkbox', {
      name: 'Include laboratory results'
    });
    const medicines = canvas.getByRole('checkbox', {
      name: 'Include current medication list'
    });
    await expect(selectAll).toHaveAttribute('aria-checked', 'mixed');
    await userEvent.click(selectAll);
    await expect(selectAll).toBeChecked();
    await expect(medicines).toBeChecked();
    await userEvent.click(results);
    await expect(selectAll).toHaveAttribute('aria-checked', 'mixed');
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    legend: 'Recipients'
  },
  render: () => <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Follow-up recipients</CardTitle>
        <CardDescription>
          Include the clinicians who should receive the completed consultation summary.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CheckboxGroup legend="Recipients" orientation="horizontal">
          <Checkbox defaultChecked>
            <span className="flex min-w-0 items-center gap-2">
              <Avatar aria-hidden="true" size="sm">
                <AvatarFallback>LM</AvatarFallback>
              </Avatar>
              <span className="min-w-0">Dr Linh Minh</span>
              <Badge variant="primary">Primary care</Badge>
            </span>
          </Checkbox>
          <Checkbox>
            <span className="flex min-w-0 items-center gap-2">
              <UserCheckIcon aria-hidden="true" />
              <span className="min-w-0">Assigned care coordinator</span>
            </span>
          </Checkbox>
          <Checkbox>
            <span className="flex min-w-0 items-center gap-2">
              <CalendarIcon aria-hidden="true" />
              <span className="min-w-0">Next appointment briefing</span>
            </span>
          </Checkbox>
        </CheckboxGroup>
      </CardContent>
    </Card>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    className: 'max-w-xs',
    legend: 'Printed order summary',
    description: 'Selections remain reachable and readable at the narrowest supported width.',
    children: <>
        <Checkbox defaultChecked>
          Include the patient preparation instructions in the printed order summary
        </Checkbox>
        <Checkbox>Include the current medication list</Checkbox>
      </>
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    className: 'max-w-sm',
    legend: 'Collection safeguards',
    children: <>
        <Checkbox defaultChecked>Patient identity verified</Checkbox>
        <Checkbox>Confirm specimen labels before collection</Checkbox>
      </>
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const labels = canvas.getByRole('checkbox', {
      name: 'Confirm specimen labels before collection'
    });
    await userEvent.click(labels);
    await expect(labels).toBeChecked();
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    className: 'max-w-2xl',
    legend: 'Order summary inclusions',
    orientation: 'horizontal',
    children: <>
        <Checkbox defaultChecked>Laboratory results</Checkbox>
        <Checkbox>Medication list</Checkbox>
        <Checkbox>Preparation instructions</Checkbox>
      </>
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    className: 'max-w-4xl',
    legend: 'Record completion',
    orientation: 'horizontal',
    children: <>
        <Checkbox defaultChecked>Patient identity verified</Checkbox>
        <Checkbox>Send a copy to the referring clinician</Checkbox>
      </>
  }
}`,...M.parameters?.docs?.source}}},N=[`Default`,`Inline`,`Validation`,`NestedSelection`,`CardComposition`,`Narrow`,`MobileInteractive`,`Tablet`,`Desktop`]}))();export{O as CardComposition,w as Default,M as Desktop,T as Inline,A as MobileInteractive,k as Narrow,D as NestedSelection,j as Tablet,E as Validation,N as __namedExportsOrder,C as default};