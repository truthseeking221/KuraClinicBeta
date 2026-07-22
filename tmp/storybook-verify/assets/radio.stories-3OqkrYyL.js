import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{$ as i,t as a,tt as o}from"./ui-C9kmmzkH.js";function s(){let[e,t]=(0,l.useState)(`no`);return(0,c.jsxs)(`div`,{children:[(0,c.jsxs)(o,{legend:`Medical licence`,name:`controlled-answer`,onValueChange:e=>{(e===`yes`||e===`no`)&&t(e)},value:e,children:[(0,c.jsx)(i,{value:`yes`,children:`Yes`}),(0,c.jsx)(i,{value:`no`,children:`No`})]}),(0,c.jsxs)(`output`,{"aria-live":`polite`,children:[`Selected: `,e]})]})}var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;t((()=>{c=r(),l=e(n()),a(),{expect:u,userEvent:d,within:f}=__STORYBOOK_MODULE_TEST__,p={title:`Design System/Primitives/Radio`,component:i,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`centered`,kura:{source:{vendor:`Kura`,registryItem:`radio`,visualReference:`Kura radio`},intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`Source and Storybook search found no canonical Radio. Create the smallest native radio primitive; grouped selection is owned by the canonical RadioGroup fieldset contract.`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-control-and-focus`,icons:`none-required-native-indicator`,motion:`kura-selection-transition-reduced-motion-safe`,density:`kura-root-attribute`,responsive:`fluid-with-full-width-under-480px`}},docs:{description:{component:`A native radio choice with a label-sized hit area. Use RadioGroup whenever two or more options form a one-of-many decision.`}}},argTypes:{appearance:{control:`radio`,options:[`default`,`card`]},density:{control:`radio`,options:[`standard`,`comfortable`]},disabled:{control:`boolean`}}},m={args:{children:`Standard processing`,name:`processing-mode-default`,value:`standard`},play:async({canvasElement:e})=>{let t=f(e).getByRole(`radio`,{name:`Standard processing`});await u(t).not.toBeChecked(),await d.click(t),await u(t).toBeChecked()}},h={render:()=>(0,c.jsxs)(o,{className:`w-full max-w-md`,defaultValue:`portal`,legend:`Result delivery`,name:`delivery`,children:[(0,c.jsx)(i,{value:`portal`,children:`Add to patient portal`}),(0,c.jsx)(i,{value:`clinician`,children:`Send to referring clinician`}),(0,c.jsx)(i,{value:`none`,children:`Do not send a copy`})]}),play:async({canvasElement:e})=>{let t=f(e),n=t.getByRole(`radio`,{name:`Add to patient portal`}),r=t.getByRole(`radio`,{name:`Send to referring clinician`});await u(n).toBeChecked(),await d.click(r),await u(r).toBeChecked(),await u(n).not.toBeChecked()}},g={render:()=>(0,c.jsx)(s,{}),play:async({canvasElement:e})=>{let t=f(e);await d.click(t.getByRole(`radio`,{name:`Yes`})),await u(t.getByText(`Selected: yes`)).toBeVisible()}},_={render:()=>(0,c.jsxs)(o,{className:`max-w-3xl`,defaultValue:`selected`,legend:`Radio states`,name:`states`,orientation:`horizontal`,children:[(0,c.jsx)(i,{value:`available`,children:`Available`}),(0,c.jsx)(i,{value:`selected`,children:`Selected`}),(0,c.jsx)(i,{value:`disabled`,disabled:!0,children:`Unavailable`}),(0,c.jsx)(i,{value:`invalid`,error:`Choose a delivery method`,children:`Required choice`})]})},v={render:()=>(0,c.jsx)(`div`,{className:`w-full max-w-xs`,children:(0,c.jsx)(i,{name:`narrow`,value:`secure`,helpText:`Secure delivery keeps the result inside the clinic workspace.`,children:`Send through the secure clinic workspace`})})},y={render:()=>(0,c.jsx)(`div`,{className:`w-full max-w-md`,children:(0,c.jsxs)(o,{defaultValue:`yes`,legend:`Medical licence status`,name:`comfortable-medical-licence-status`,children:[(0,c.jsx)(i,{appearance:`card`,density:`comfortable`,helpText:`Choose your profession, then upload a licence document.`,value:`yes`,children:`Yes — I have a medical licence`}),(0,c.jsx)(i,{appearance:`card`,density:`comfortable`,helpText:`No credential is created or requested. You can change this later.`,value:`no`,children:`No — not at this time`})]})}),play:async({canvasElement:e})=>{let t=f(e),n=t.getByRole(`radio`,{name:/Yes — I have a medical licence/}),r=t.getByRole(`radio`,{name:/No — not at this time/});await u(n).toBeChecked(),await d.click(r),await u(r).toBeChecked()}},b={...y,parameters:{viewport:{defaultViewport:`kura320`}}},x={render:()=>(0,c.jsxs)(o,{className:`w-full max-w-sm`,defaultValue:`phone`,legend:`Preferred contact route`,name:`contact`,children:[(0,c.jsx)(i,{value:`phone`,children:`Phone call`}),(0,c.jsx)(i,{value:`message`,children:`Secure message`})]})},S={render:()=>(0,c.jsxs)(o,{className:`w-full max-w-2xl`,defaultValue:`routine`,legend:`Urgency`,name:`urgency`,orientation:`horizontal`,children:[(0,c.jsx)(i,{value:`routine`,children:`Routine`}),(0,c.jsx)(i,{value:`urgent`,children:`Urgent`}),(0,c.jsx)(i,{value:`stat`,children:`Stat`})]})},C={render:()=>(0,c.jsxs)(o,{className:`w-full max-w-4xl`,defaultValue:`in-person`,legend:`Appointment format`,name:`appointment`,orientation:`horizontal`,children:[(0,c.jsx)(i,{value:`in-person`,children:`In-person appointment`}),(0,c.jsx)(i,{value:`video`,children:`Video consultation`})]})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Standard processing',
    name: 'processing-mode-default',
    value: 'standard'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole('radio', {
      name: 'Standard processing'
    });
    await expect(radio).not.toBeChecked();
    await userEvent.click(radio);
    await expect(radio).toBeChecked();
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <RadioGroup className="w-full max-w-md" defaultValue="portal" legend="Result delivery" name="delivery">
      <Radio value="portal">Add to patient portal</Radio>
      <Radio value="clinician">Send to referring clinician</Radio>
      <Radio value="none">Do not send a copy</Radio>
    </RadioGroup>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const portal = canvas.getByRole('radio', {
      name: 'Add to patient portal'
    });
    const clinician = canvas.getByRole('radio', {
      name: 'Send to referring clinician'
    });
    await expect(portal).toBeChecked();
    await userEvent.click(clinician);
    await expect(clinician).toBeChecked();
    await expect(portal).not.toBeChecked();
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <ControlledRadioStory />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', {
      name: 'Yes'
    }));
    await expect(canvas.getByText('Selected: yes')).toBeVisible();
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <RadioGroup className="max-w-3xl" defaultValue="selected" legend="Radio states" name="states" orientation="horizontal">
      <Radio value="available">Available</Radio>
      <Radio value="selected">Selected</Radio>
      <Radio value="disabled" disabled>
        Unavailable
      </Radio>
      <Radio value="invalid" error="Choose a delivery method">
        Required choice
      </Radio>
    </RadioGroup>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-xs">
      <Radio name="narrow" value="secure" helpText="Secure delivery keeps the result inside the clinic workspace.">
        Send through the secure clinic workspace
      </Radio>
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-md">
      <RadioGroup defaultValue="yes" legend="Medical licence status" name="comfortable-medical-licence-status">
        <Radio appearance="card" density="comfortable" helpText="Choose your profession, then upload a licence document." value="yes">
          Yes — I have a medical licence
        </Radio>
        <Radio appearance="card" density="comfortable" helpText="No credential is created or requested. You can change this later." value="no">
          No — not at this time
        </Radio>
      </RadioGroup>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const yes = canvas.getByRole('radio', {
      name: /Yes — I have a medical licence/
    });
    const no = canvas.getByRole('radio', {
      name: /No — not at this time/
    });
    await expect(yes).toBeChecked();
    await userEvent.click(no);
    await expect(no).toBeChecked();
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  ...ComfortableCards,
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <RadioGroup className="w-full max-w-sm" defaultValue="phone" legend="Preferred contact route" name="contact">
      <Radio value="phone">Phone call</Radio>
      <Radio value="message">Secure message</Radio>
    </RadioGroup>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <RadioGroup className="w-full max-w-2xl" defaultValue="routine" legend="Urgency" name="urgency" orientation="horizontal">
      <Radio value="routine">Routine</Radio>
      <Radio value="urgent">Urgent</Radio>
      <Radio value="stat">Stat</Radio>
    </RadioGroup>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <RadioGroup className="w-full max-w-4xl" defaultValue="in-person" legend="Appointment format" name="appointment" orientation="horizontal">
      <Radio value="in-person">In-person appointment</Radio>
      <Radio value="video">Video consultation</Radio>
    </RadioGroup>
}`,...C.parameters?.docs?.source}}},w=[`Default`,`Group`,`Controlled`,`States`,`LongContentAndNarrow`,`ComfortableCards`,`ComfortableCardsMobile320`,`MobileInteractive`,`Tablet`,`Desktop`]}))();export{y as ComfortableCards,b as ComfortableCardsMobile320,g as Controlled,m as Default,C as Desktop,h as Group,v as LongContentAndNarrow,x as MobileInteractive,_ as States,S as Tablet,w as __namedExportsOrder,p as default};