import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{qt as i,t as a}from"./ui-C9kmmzkH.js";import{n as o,t as s}from"./intake-components.stories.module-pqbVgWyl.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C;t((()=>{c=r(),l=e(n()),a(),s(),{expect:u,userEvent:d,within:f}=__STORYBOOK_MODULE_TEST__,p={title:`Design System/Primitives/Textarea`,component:i,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:{source:{vendor:`ReUI`,registryItem:`@reui/c-textarea-1`},intake:{decision:`REUSE-AND-EXTEND`,owner:`src/components/ui`,evidence:`The canonical Kura multiline field already covered labels, help, validation, disabled, long content, and resize. ReUI evidence added read-only and character-count composition coverage without creating a duplicate owner.`,exclusions:[`Auto-resize remains a composition until recurrence proves a shared behavior contract.`]},contract:{primaryTask:`Enter or review multi-line text without losing labels, validation, focus, or touch comfort.`,states:[`default`,`focus-visible`,`required`,`disabled`,`read-only`,`invalid`,`long-content`,`resize`],responsive:`fluid-with-content-driven-height`,accessibility:`native-label-description-error-association`}},docs:{description:{component:`Canonical Kura multi-line field for notes, explanations, and other text that benefits from line wrapping. Use Input for single-line values.`}}}},m={args:{label:`Clinical note`,placeholder:`Add context for the next attempt…`},play:async({canvasElement:e})=>{let t=f(e).getByRole(`textbox`,{name:`Clinical note`});await d.click(t),await u(t).toHaveFocus()}},h={args:{label:`Reason details`,required:!0,placeholder:`Explain the exception…`}},g={args:{label:`Next-step note`,error:`Add a note before continuing.`,value:``,onChange:()=>{}}},_={args:{disabled:!0,helpText:`Notes are locked after handoff.`,label:`Handoff note`,value:`This note can no longer be changed.`}},v={args:{helpText:`This note is locked after handoff.`,label:`Handoff note`,readOnly:!0,value:`Patient prefers the left arm. Reconfirm consent before the next attempt.`}},y={args:{},render:()=>(0,c.jsxs)(`div`,{className:o.grid,children:[(0,c.jsx)(i,{label:`Fixed note`,resize:`none`,value:`This field keeps its assigned geometry.`,readOnly:!0}),(0,c.jsx)(i,{label:`Vertical resize`,resize:`vertical`,defaultValue:`Drag the lower edge when more writing space is useful.`}),(0,c.jsx)(i,{label:`Two-axis resize`,resize:`both`,defaultValue:`Use both-axis resizing only in flexible workspaces.`})]})},b={args:{},render:function(){let[e,t]=(0,l.useState)(`Patient requested a morning appointment.`);return(0,c.jsx)(`div`,{className:o.narrow,children:(0,c.jsx)(i,{helpText:`${e.length} of 240 characters`,label:`Booking note`,maxLength:240,onChange:e=>t(e.currentTarget.value),value:e})})}},x={args:{label:`Next-attempt context`,value:`Patient requested a pause after the first attempt. Reconfirm identity, review the selected site, and ask whether the patient is ready before collecting this tube again.`,onChange:()=>{}}},S={args:x.args,parameters:{viewport:{defaultViewport:`mobile1`}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Clinical note',
    placeholder: 'Add context for the next attempt…'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByRole('textbox', {
      name: 'Clinical note'
    });
    await userEvent.click(field);
    await expect(field).toHaveFocus();
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Reason details',
    required: true,
    placeholder: 'Explain the exception…'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Next-step note',
    error: 'Add a note before continuing.',
    value: '',
    onChange: () => {}
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    helpText: 'Notes are locked after handoff.',
    label: 'Handoff note',
    value: 'This note can no longer be changed.'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    helpText: 'This note is locked after handoff.',
    label: 'Handoff note',
    readOnly: true,
    value: 'Patient prefers the left arm. Reconfirm consent before the next attempt.'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {},
  render: () => <div className={storyStyles.grid}>
      <Textarea label="Fixed note" resize="none" value="This field keeps its assigned geometry." readOnly />
      <Textarea label="Vertical resize" resize="vertical" defaultValue="Drag the lower edge when more writing space is useful." />
      <Textarea label="Two-axis resize" resize="both" defaultValue="Use both-axis resizing only in flexible workspaces." />
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {},
  render: function CountedTextarea() {
    const [value, setValue] = useState('Patient requested a morning appointment.');
    return <div className={storyStyles.narrow}>
        <Textarea helpText={\`\${value.length} of 240 characters\`} label="Booking note" maxLength={240} onChange={event => setValue(event.currentTarget.value)} value={value} />
      </div>;
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Next-attempt context',
    value: 'Patient requested a pause after the first attempt. Reconfirm identity, review the selected site, and ask whether the patient is ready before collecting this tube again.',
    onChange: () => {}
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: LongContent.args,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...S.parameters?.docs?.source}}},C=[`Default`,`Required`,`Invalid`,`Disabled`,`ReadOnly`,`ResizeOptions`,`CharacterCountComposition`,`LongContent`,`MobileLongContent`]}))();export{b as CharacterCountComposition,m as Default,_ as Disabled,g as Invalid,x as LongContent,S as MobileLongContent,v as ReadOnly,h as Required,y as ResizeOptions,C as __namedExportsOrder,p as default};