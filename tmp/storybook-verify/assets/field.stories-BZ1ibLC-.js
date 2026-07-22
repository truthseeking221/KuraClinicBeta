import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{$ as n,ar as r,cr as i,er as a,fr as o,ir as s,nr as c,or as l,qt as u,rr as d,sr as f,t as p,tr as m,tt as h}from"./ui-C9kmmzkH.js";import{t as g}from"./input-UaJWx_9h.js";import{t as _}from"./select-WVTSimR_.js";var v,y,b,x,S,C,w,T,E,D,O,k,A,j;e((()=>{v=t(),p(),{expect:y,userEvent:b,within:x}=__STORYBOOK_MODULE_TEST__,S={title:`Design System/Components/Field`,component:a,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{source:{vendor:`ReUI`,registryItem:`field`,familySize:11},intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`Input, Select, Textarea, CheckboxGroup and Radio already own controls, but Kura lacked one semantic composition for arbitrary controls, responsive label alignment, grouped fields and deduplicated validation messages.`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`composed-control-owner`,elevation:`none`,icons:`composed-control-owner`,responsive:`stacking-horizontal-to-vertical`},exclusions:[{capability:`OTP, slider and switch controls`,reason:`Field composes these controls when their canonical Kura owners exist; it does not create substitute primitives.`},{capability:`Settings, permissions and notification forms`,reason:`These are domain or feature compositions. Stories prove the field structure without inventing permission or notification business logic.`}]}}},C={render:()=>(0,v.jsxs)(a,{children:[(0,v.jsx)(r,{htmlFor:`field-phone`,required:!0,children:`Patient phone`}),(0,v.jsxs)(m,{children:[(0,v.jsx)(g,{id:`field-phone`,inputMode:`tel`,placeholder:`012 345 678`,required:!0}),(0,v.jsx)(c,{children:`Use the number the patient can receive booking updates on.`})]})]}),play:async({canvasElement:e})=>{let t=x(e);await b.type(t.getByLabelText(/Patient phone/),`012777088`),await y(t.getByLabelText(/Patient phone/)).toHaveValue(`012777088`)}},w={render:()=>(0,v.jsxs)(s,{children:[(0,v.jsxs)(a,{children:[(0,v.jsx)(r,{htmlFor:`field-name`,children:`Preferred name`}),(0,v.jsx)(g,{id:`field-name`})]}),(0,v.jsxs)(a,{children:[(0,v.jsx)(r,{htmlFor:`field-note`,children:`Reception note`}),(0,v.jsx)(u,{id:`field-note`,placeholder:`Only operational context needed for this visit`})]})]})},T={render:()=>(0,v.jsxs)(a,{children:[(0,v.jsx)(r,{htmlFor:`field-language`,children:`Preferred language`}),(0,v.jsxs)(m,{children:[(0,v.jsx)(_,{id:`field-language`,defaultValue:``,options:[{value:`km`,label:`ខ្មែរ`},{value:`en`,label:`English`},{value:`vi`,label:`Tiếng Việt`}],placeholder:`Choose a language`}),(0,v.jsx)(c,{children:`This changes communication language, not clinical terminology.`})]})]})},E={render:()=>(0,v.jsxs)(i,{children:[(0,v.jsx)(l,{children:`Contact preferences`}),(0,v.jsxs)(s,{children:[(0,v.jsxs)(a,{orientation:`horizontal`,children:[(0,v.jsx)(o,{children:`SMS appointment reminders`}),(0,v.jsx)(c,{children:`Sent only to the verified patient phone.`})]}),(0,v.jsxs)(h,{defaultValue:`morning`,description:`Preferred callback window, not a guaranteed appointment time.`,legend:`Preferred callback window`,name:`contact-time`,orientation:`horizontal`,children:[(0,v.jsx)(n,{value:`morning`,children:`Morning`}),(0,v.jsx)(n,{value:`afternoon`,children:`Afternoon`})]})]})]})},D={render:()=>(0,v.jsxs)(s,{style:{width:`min(42rem, 90vw)`},children:[(0,v.jsxs)(a,{orientation:`responsive`,children:[(0,v.jsx)(r,{htmlFor:`field-clinic`,children:`Clinic workspace`}),(0,v.jsxs)(m,{children:[(0,v.jsx)(_,{id:`field-clinic`,options:[{value:`pp`,label:`Kura Phnom Penh Central Clinic`},{value:`sr`,label:`Kura Siem Reap Riverside Clinic`}]}),(0,v.jsx)(c,{children:`Records and queues remain scoped to this workspace.`})]})]}),(0,v.jsx)(f,{children:`Patient details`}),(0,v.jsxs)(a,{orientation:`responsive`,children:[(0,v.jsx)(r,{htmlFor:`field-address`,children:`Address`}),(0,v.jsx)(g,{id:`field-address`})]})]})},O={render:()=>(0,v.jsxs)(a,{invalid:!0,children:[(0,v.jsx)(r,{htmlFor:`field-code`,children:`Booking code`}),(0,v.jsxs)(m,{children:[(0,v.jsx)(g,{id:`field-code`,"aria-invalid":`true`,defaultValue:`FZ`}),(0,v.jsx)(d,{errors:[{message:`Enter the complete booking code.`},{message:`Enter the complete booking code.`},{message:`Use letters and numbers only.`}]})]})]}),play:async({canvasElement:e})=>{let t=x(e);await y(t.getByRole(`alert`)).toHaveTextContent(`Enter the complete booking code.`),await y(t.getAllByRole(`listitem`)).toHaveLength(2)}},k={render:()=>(0,v.jsxs)(a,{disabled:!0,children:[(0,v.jsx)(r,{htmlFor:`field-locked`,children:`Verified patient ID`}),(0,v.jsxs)(m,{children:[(0,v.jsx)(g,{id:`field-locked`,defaultValue:`HN-004821`,disabled:!0}),(0,v.jsx)(c,{children:`Identity is locked after check-in verification.`})]})]})},A={...D,parameters:{viewport:{defaultViewport:`mobile1`}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Field>
      <FieldLabel htmlFor="field-phone" required>
        Patient phone
      </FieldLabel>
      <FieldContent>
        <Input id="field-phone" inputMode="tel" placeholder="012 345 678" required />
        <FieldDescription>
          Use the number the patient can receive booking updates on.
        </FieldDescription>
      </FieldContent>
    </Field>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Patient phone/), "012777088");
    await expect(canvas.getByLabelText(/Patient phone/)).toHaveValue("012777088");
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <FieldGroup>
      <Field>
        <FieldLabel htmlFor="field-name">Preferred name</FieldLabel>
        <Input id="field-name" />
      </Field>
      <Field>
        <FieldLabel htmlFor="field-note">Reception note</FieldLabel>
        <Textarea id="field-note" placeholder="Only operational context needed for this visit" />
      </Field>
    </FieldGroup>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Field>
      <FieldLabel htmlFor="field-language">Preferred language</FieldLabel>
      <FieldContent>
        <Select id="field-language" defaultValue="" options={[{
        value: "km",
        label: "ខ្មែរ"
      }, {
        value: "en",
        label: "English"
      }, {
        value: "vi",
        label: "Tiếng Việt"
      }]} placeholder="Choose a language" />
        <FieldDescription>
          This changes communication language, not clinical terminology.
        </FieldDescription>
      </FieldContent>
    </Field>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <FieldSet>
      <FieldLegend>Contact preferences</FieldLegend>
      <FieldGroup>
        <Field orientation="horizontal">
          <Checkbox>SMS appointment reminders</Checkbox>
          <FieldDescription>
            Sent only to the verified patient phone.
          </FieldDescription>
        </Field>
        <RadioGroup defaultValue="morning" description="Preferred callback window, not a guaranteed appointment time." legend="Preferred callback window" name="contact-time" orientation="horizontal">
          <Radio value="morning">Morning</Radio>
          <Radio value="afternoon">Afternoon</Radio>
        </RadioGroup>
      </FieldGroup>
    </FieldSet>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <FieldGroup style={{
    width: "min(42rem, 90vw)"
  }}>
      <Field orientation="responsive">
        <FieldLabel htmlFor="field-clinic">Clinic workspace</FieldLabel>
        <FieldContent>
          <Select id="field-clinic" options={[{
          value: "pp",
          label: "Kura Phnom Penh Central Clinic"
        }, {
          value: "sr",
          label: "Kura Siem Reap Riverside Clinic"
        }]} />
          <FieldDescription>
            Records and queues remain scoped to this workspace.
          </FieldDescription>
        </FieldContent>
      </Field>
      <FieldSeparator>Patient details</FieldSeparator>
      <Field orientation="responsive">
        <FieldLabel htmlFor="field-address">Address</FieldLabel>
        <Input id="field-address" />
      </Field>
    </FieldGroup>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <Field invalid>
      <FieldLabel htmlFor="field-code">Booking code</FieldLabel>
      <FieldContent>
        <Input id="field-code" aria-invalid="true" defaultValue="FZ" />
        <FieldError errors={[{
        message: "Enter the complete booking code."
      }, {
        message: "Enter the complete booking code."
      }, {
        message: "Use letters and numbers only."
      }]} />
      </FieldContent>
    </Field>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("alert")).toHaveTextContent("Enter the complete booking code.");
    await expect(canvas.getAllByRole("listitem")).toHaveLength(2);
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <Field disabled>
      <FieldLabel htmlFor="field-locked">Verified patient ID</FieldLabel>
      <FieldContent>
        <Input id="field-locked" defaultValue="HN-004821" disabled />
        <FieldDescription>
          Identity is locked after check-in verification.
        </FieldDescription>
      </FieldContent>
    </Field>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  ...ResponsiveLayout,
  parameters: {
    viewport: {
      defaultViewport: "mobile1"
    }
  }
}`,...A.parameters?.docs?.source}}},j=[`TextControl`,`InputAndTextarea`,`SelectControl`,`ChoiceControls`,`ResponsiveLayout`,`ValidationErrors`,`Disabled`,`MobileNarrow`]}))();export{E as ChoiceControls,k as Disabled,w as InputAndTextarea,A as MobileNarrow,D as ResponsiveLayout,T as SelectControl,C as TextControl,O as ValidationErrors,j as __namedExportsOrder,S as default};