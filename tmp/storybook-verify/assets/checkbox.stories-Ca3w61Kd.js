import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{fr as n,t as r,ur as i}from"./ui-C9kmmzkH.js";var a,o,s,c,l,u,d,f,p,m,h,g,_,v;e((()=>{a=t(),r(),{expect:o,userEvent:s,within:c}=__STORYBOOK_MODULE_TEST__,l={title:`Design System/Primitives/Checkbox`,component:n,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`Kura keeps the native binary and mixed-choice contract while adopting Kura box geometry, selected gradient, and inset highlight.`},source:{vendor:`Kura`,registryItem:`checkbox`,visualReference:`Kura checkbox`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-focus-only`,icons:`kura-canonical`,motion:`kura-check-mark-transition-reduced-motion-safe`,density:`kura-root-attribute`,responsive:`fluid-with-full-width-under-480px`},exclusions:[{capability:`Generic blue, green, and yellow checkbox colors`,reason:`A binary choice must not gain an arbitrary color meaning or rely on color as state.`,replacement:`Use the default Kura selection treatment, or the explicit AI tone for assistant-originated suggestions.`},{capability:`Circle checkbox`,reason:`A circular binary control is easily confused with single-selection radio controls.`,replacement:`Use the canonical Radio primitive for exclusive choices.`},{capability:`Payment-method checkbox card`,reason:`Payment choice is exclusive and outside the clinical checkbox primitive contract.`,replacement:`Use Radio inside the owning payment workflow when that workflow exists.`},{capability:`Tooltip-only label information`,reason:`Safety-relevant consequences must remain visible and available on touch devices.`,replacement:`Use Checkbox helpText or CheckboxGroup description.`},{capability:`Custom checkbox positioning as a primitive variant`,reason:`Position is composition responsibility, not a durable input API.`,replacement:`Compose Checkbox with Kura Card, Avatar, Badge, and layout wrappers.`}]},docs:{description:{component:`A binary or mixed choice primitive with an expanded touch target, explicit supporting or error text, and reduced-motion-safe state feedback.`}}},argTypes:{tone:{control:`radio`,options:[`default`,`ai`]},indeterminate:{control:`boolean`},disabled:{control:`boolean`}}},u={args:{children:`Include fasting instructions`},play:async({canvasElement:e})=>{let t=c(e).getByRole(`checkbox`,{name:`Include fasting instructions`});await o(t).not.toBeChecked(),await o(t.parentElement).toHaveAttribute(`data-slot`,`checkbox-field`),await s.tab(),await o(t).toHaveFocus(),await s.click(t),await o(t).toBeChecked()}},d={render:()=>(0,a.jsxs)(i,{legend:`Order summary inclusions`,orientation:`horizontal`,children:[(0,a.jsx)(n,{defaultChecked:!0,children:`Include lab results`}),(0,a.jsx)(n,{children:`Include medication list`})]})},f={render:()=>(0,a.jsxs)(i,{legend:`Checkbox states`,orientation:`horizontal`,children:[(0,a.jsx)(n,{children:`Unchecked`}),(0,a.jsx)(n,{defaultChecked:!0,children:`Checked`}),(0,a.jsx)(n,{indeterminate:!0,children:`Needs review`}),(0,a.jsx)(n,{disabled:!0,children:`Unavailable`}),(0,a.jsx)(n,{error:`Select this before submitting the order`,children:`Required choice`})]})},p={render:()=>(0,a.jsx)(n,{tone:`ai`,defaultChecked:!0,helpText:`This selection comes from the assistant suggestion.`,children:`Include assistant suggestion`})},m={render:()=>(0,a.jsx)(`div`,{className:`w-full max-w-xs`,children:(0,a.jsx)(n,{helpText:`The selected instruction will be included in the printed order summary.`,children:`Include the patient preparation instructions in the order summary`})})},h={render:()=>(0,a.jsxs)(i,{className:`max-w-sm`,legend:`Collection safeguards`,children:[(0,a.jsx)(n,{defaultChecked:!0,children:`Patient identity verified`}),(0,a.jsx)(n,{children:`Attach current medication list`})]})},g={render:()=>(0,a.jsxs)(i,{className:`max-w-2xl`,legend:`Order summary inclusions`,orientation:`horizontal`,children:[(0,a.jsx)(n,{defaultChecked:!0,children:`Include lab results`}),(0,a.jsx)(n,{children:`Include medication list`})]})},_={render:()=>(0,a.jsxs)(i,{className:`max-w-4xl`,legend:`Record completion`,orientation:`horizontal`,children:[(0,a.jsx)(n,{defaultChecked:!0,children:`Patient identity verified`}),(0,a.jsx)(n,{children:`Send a copy to the referring clinician`})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Include fasting instructions'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', {
      name: 'Include fasting instructions'
    });
    await expect(checkbox).not.toBeChecked();
    await expect(checkbox.parentElement).toHaveAttribute('data-slot', 'checkbox-field');
    await userEvent.tab();
    await expect(checkbox).toHaveFocus();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <CheckboxGroup legend="Order summary inclusions" orientation="horizontal">
      <Checkbox defaultChecked>
        Include lab results
      </Checkbox>
      <Checkbox>Include medication list</Checkbox>
    </CheckboxGroup>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <CheckboxGroup legend="Checkbox states" orientation="horizontal">
      <Checkbox>Unchecked</Checkbox>
      <Checkbox defaultChecked>Checked</Checkbox>
      <Checkbox indeterminate>Needs review</Checkbox>
      <Checkbox disabled>Unavailable</Checkbox>
      <Checkbox error="Select this before submitting the order">Required choice</Checkbox>
    </CheckboxGroup>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Checkbox tone="ai" defaultChecked helpText="This selection comes from the assistant suggestion.">
      Include assistant suggestion
    </Checkbox>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-xs">
      <Checkbox helpText="The selected instruction will be included in the printed order summary.">
        Include the patient preparation instructions in the order summary
      </Checkbox>
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <CheckboxGroup className="max-w-sm" legend="Collection safeguards">
      <Checkbox defaultChecked>Patient identity verified</Checkbox>
      <Checkbox>Attach current medication list</Checkbox>
    </CheckboxGroup>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <CheckboxGroup className="max-w-2xl" legend="Order summary inclusions" orientation="horizontal">
      <Checkbox defaultChecked>Include lab results</Checkbox>
      <Checkbox>Include medication list</Checkbox>
    </CheckboxGroup>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <CheckboxGroup className="max-w-4xl" legend="Record completion" orientation="horizontal">
      <Checkbox defaultChecked>Patient identity verified</Checkbox>
      <Checkbox>Send a copy to the referring clinician</Checkbox>
    </CheckboxGroup>
}`,..._.parameters?.docs?.source}}},v=[`Default`,`Grouped`,`States`,`AiTone`,`LongContentAndNarrow`,`MobileInteractive`,`Tablet`,`Desktop`]}))();export{p as AiTone,u as Default,_ as Desktop,d as Grouped,m as LongContentAndNarrow,h as MobileInteractive,f as States,g as Tablet,v as __namedExportsOrder,l as default};