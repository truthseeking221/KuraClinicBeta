import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{a as i,i as a,n as o,r as s,t as c}from"./accordion-BgF0huqc.js";function l({type:e=`single`,defaultValue:t}){return(0,d.jsxs)(c,{"aria-label":`Patient visit context`,type:e,collapsible:!0,defaultValue:t,children:[(0,d.jsxs)(s,{value:`identity`,children:[(0,d.jsx)(a,{children:`Identity and assurance`}),(0,d.jsx)(o,{children:`Patient identity was confirmed against the national ID record. The visit is linked to the current consultation and the verified contact number.`})]}),(0,d.jsxs)(s,{value:`allergies`,children:[(0,d.jsx)(a,{children:`Allergies and sensitivities · 2 recorded`}),(0,d.jsx)(o,{children:`Penicillin — rash reported in 2021. Chlorhexidine — local irritation reported during a previous collection. Confirm before prescribing or preparing a procedure.`})]}),(0,d.jsxs)(s,{value:`medications`,children:[(0,d.jsx)(a,{children:`Current medications · 4 active`}),(0,d.jsx)(o,{children:`The medication list was last reconciled at this visit. Review dosage, adherence, and interactions before adding or changing a prescription.`})]})]})}function u(){return(0,d.jsxs)(c,{"aria-label":`Visit workflow details`,type:`multiple`,defaultValue:[`orders`],children:[(0,d.jsxs)(s,{value:`orders`,children:[(0,d.jsx)(a,{children:`Orders · ready for collection`}),(0,d.jsx)(o,{children:`Complete blood count and HbA1c are assigned to the phlebotomy queue. Payment is independent of the draw status.`})]}),(0,d.jsxs)(s,{value:`results`,children:[(0,d.jsx)(a,{children:`Results · partial`}),(0,d.jsx)(o,{children:`Two results are available for review. The remaining laboratory result is still pending and should not be treated as complete.`})]}),(0,d.jsxs)(s,{value:`follow-up`,children:[(0,d.jsx)(a,{children:`Follow-up plan`}),(0,d.jsx)(o,{children:`Add the review date and the responsible clinician before closing the consultation.`})]})]})}var d,f,p,m,h,g,_,v,y,b,x,S,C,w;t((()=>{d=r(),f=e(n()),i(),{expect:p,userEvent:m,within:h}=__STORYBOOK_MODULE_TEST__,g={title:`Design System/Primitives/Accordion`,component:c,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:{source:{vendor:`ReUI`,registryItem:`c-accordion-1`,sourceUrl:`https://reui.io/components/accordion`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-flat`,icons:`kura-canonical`,density:`kura-root-attribute`}},docs:{description:{component:`Progressive disclosure for optional detail. Use it when people need to scan section headings first and open one or more sections without leaving the current workflow.`}}},argTypes:{type:{control:`radio`,options:[`single`,`multiple`],description:`Whether one or several sections may remain open.`},collapsible:{control:`boolean`,description:`Allows the active section to be closed in single mode.`}}},_={args:{type:`single`,collapsible:!0},render:()=>(0,d.jsx)(l,{defaultValue:`identity`}),play:async({canvasElement:e})=>{let t=h(e),n=t.getByRole(`button`,{name:/identity and assurance/i}),r=t.getByRole(`button`,{name:/allergies and sensitivities/i});await p(window.getComputedStyle(n).cursor).toBe(`pointer`),await p(n).toHaveAttribute(`aria-expanded`,`true`),await m.click(r),await p(r).toHaveAttribute(`aria-expanded`,`true`),await p(n).toHaveAttribute(`aria-expanded`,`false`),await p(t.getByRole(`region`,{name:/allergies and sensitivities/i})).toBeVisible()}},v={args:{type:`multiple`},render:()=>(0,d.jsx)(u,{}),play:async({canvasElement:e})=>{let t=h(e),n=t.getByRole(`button`,{name:/results · partial/i});await m.click(n),await p(t.getByRole(`button`,{name:/orders · ready/i})).toHaveAttribute(`aria-expanded`,`true`),await p(n).toHaveAttribute(`aria-expanded`,`true`)}},y={args:{type:`single`,collapsible:!0},render:()=>(0,d.jsxs)(c,{"aria-label":`Patient record sections`,type:`single`,collapsible:!0,defaultValue:`available`,children:[(0,d.jsxs)(s,{value:`available`,children:[(0,d.jsx)(a,{children:`Visit summary`}),(0,d.jsx)(o,{children:`The visit summary is available to the current role.`})]}),(0,d.jsxs)(s,{value:`restricted`,disabled:!0,children:[(0,d.jsx)(a,{children:`Restricted clinical notes`}),(0,d.jsx)(o,{children:`Only clinicians with the required permission can review these notes.`})]})]})},b={args:{type:`single`,collapsible:!0},render:()=>(0,d.jsx)(c,{"aria-label":`Result review guidance`,type:`single`,collapsible:!0,children:(0,d.jsxs)(s,{value:`guidance`,children:[(0,d.jsx)(a,{children:`Review before acknowledging a critical result`}),(0,d.jsx)(o,{children:`Confirm the patient identity, specimen, collection time, reference range, and verification status. Compare the result with the patient context and current treatment. If the value may require immediate action, follow the clinic escalation policy, document the acknowledgement, and ensure the responsible clinician is clear before closing the review.`})]})})},x={args:{type:`single`,collapsible:!0},render:()=>(0,d.jsx)(c,{"aria-label":`Optional visit details`,type:`single`,collapsible:!0,children:(0,d.jsxs)(s,{value:`empty`,children:[(0,d.jsx)(a,{children:`Additional visit details`}),(0,d.jsx)(o,{children:`No additional visit details have been recorded.`})]})})},S={args:{type:`single`,collapsible:!0},render:()=>{let[e,t]=(0,f.useState)(`identity`);return(0,d.jsxs)(c,{"aria-label":`Controlled patient context`,type:`single`,collapsible:!0,value:e,onValueChange:e=>t(e),children:[(0,d.jsxs)(s,{value:`identity`,children:[(0,d.jsx)(a,{children:`Identity and assurance`}),(0,d.jsx)(o,{children:`Verified against the patient record.`})]}),(0,d.jsxs)(s,{value:`consent`,children:[(0,d.jsx)(a,{children:`Consent and communication`}),(0,d.jsx)(o,{children:`Communication preferences were confirmed for this visit.`})]})]})}},C={args:{type:`single`,collapsible:!0},render:()=>(0,d.jsx)(l,{defaultValue:`identity`}),play:async({canvasElement:e})=>{let t=h(e),n=t.getByRole(`button`,{name:/identity and assurance/i}),r=t.getByRole(`button`,{name:/allergies and sensitivities/i});n.focus(),await m.keyboard(`{ArrowDown}`),await p(r).toHaveFocus(),await m.keyboard(`{Enter}`),await p(r).toHaveAttribute(`aria-expanded`,`true`)}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'single',
    collapsible: true
  },
  render: () => <ClinicalContextAccordion defaultValue="identity" />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const identity = canvas.getByRole('button', {
      name: /identity and assurance/i
    });
    const allergies = canvas.getByRole('button', {
      name: /allergies and sensitivities/i
    });
    await expect(window.getComputedStyle(identity).cursor).toBe('pointer');
    await expect(identity).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(allergies);
    await expect(allergies).toHaveAttribute('aria-expanded', 'true');
    await expect(identity).toHaveAttribute('aria-expanded', 'false');
    await expect(canvas.getByRole('region', {
      name: /allergies and sensitivities/i
    })).toBeVisible();
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'multiple'
  },
  render: () => <WorkflowAccordion />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const results = canvas.getByRole('button', {
      name: /results · partial/i
    });
    await userEvent.click(results);
    await expect(canvas.getByRole('button', {
      name: /orders · ready/i
    })).toHaveAttribute('aria-expanded', 'true');
    await expect(results).toHaveAttribute('aria-expanded', 'true');
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'single',
    collapsible: true
  },
  render: () => <Accordion aria-label="Patient record sections" type="single" collapsible defaultValue="available">
      <AccordionItem value="available">
        <AccordionTrigger>Visit summary</AccordionTrigger>
        <AccordionContent>The visit summary is available to the current role.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="restricted" disabled>
        <AccordionTrigger>Restricted clinical notes</AccordionTrigger>
        <AccordionContent>Only clinicians with the required permission can review these notes.</AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'single',
    collapsible: true
  },
  render: () => <Accordion aria-label="Result review guidance" type="single" collapsible>
      <AccordionItem value="guidance">
        <AccordionTrigger>Review before acknowledging a critical result</AccordionTrigger>
        <AccordionContent>
          Confirm the patient identity, specimen, collection time, reference range, and verification status. Compare the result with the patient context and current treatment. If the value may require immediate action, follow the clinic escalation policy, document the acknowledgement, and ensure the responsible clinician is clear before closing the review.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'single',
    collapsible: true
  },
  render: () => <Accordion aria-label="Optional visit details" type="single" collapsible>
      <AccordionItem value="empty">
        <AccordionTrigger>Additional visit details</AccordionTrigger>
        <AccordionContent>No additional visit details have been recorded.</AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'single',
    collapsible: true
  },
  render: () => {
    const [value, setValue] = useState('identity');
    return <Accordion aria-label="Controlled patient context" type="single" collapsible value={value} onValueChange={next => setValue(next as string)}>
        <AccordionItem value="identity">
          <AccordionTrigger>Identity and assurance</AccordionTrigger>
          <AccordionContent>Verified against the patient record.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="consent">
          <AccordionTrigger>Consent and communication</AccordionTrigger>
          <AccordionContent>Communication preferences were confirmed for this visit.</AccordionContent>
        </AccordionItem>
      </Accordion>;
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'single',
    collapsible: true
  },
  render: () => <ClinicalContextAccordion defaultValue="identity" />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const identity = canvas.getByRole('button', {
      name: /identity and assurance/i
    });
    const allergies = canvas.getByRole('button', {
      name: /allergies and sensitivities/i
    });
    identity.focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(allergies).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(allergies).toHaveAttribute('aria-expanded', 'true');
  }
}`,...C.parameters?.docs?.source}}},w=[`SingleOpen`,`MultipleOpen`,`DisabledItem`,`LongContent`,`EmptySection`,`Controlled`,`KeyboardNavigation`]}))();export{S as Controlled,y as DisabledItem,x as EmptySection,C as KeyboardNavigation,b as LongContent,v as MultipleOpen,_ as SingleOpen,w as __namedExportsOrder,g as default};