import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{r as i,t as a}from"./readiness-data-D41RGqZh.js";import{n as o,r as s,t as c}from"./patient-sOP5Ucga.js";import{c as l,n as u,o as d,s as f,t as p}from"./assessment-workspace-BgjOrRLi.js";function m({initial:e}){let[t,n]=(0,g.useState)(e);return(0,h.jsx)(p,{assessment:t,onChange:n,patientDemographics:o,patientName:c.displayName})}var h,g,_,v,y,b,x,S,C,w,T,E,D,O;t((()=>{h=r(),g=e(n()),i(),s(),u(),l(),{expect:_,userEvent:v,within:y}=__STORYBOOK_MODULE_TEST__,b={title:`Clinic/Clinical/Assessment`,component:p,tags:[`autodocs`],args:{assessment:f,onChange:()=>{},patientDemographics:o,patientName:c.displayName},parameters:{layout:`padded`,kura:{readiness:a.assessment,intake:{decision:`CREATE`,owner:`src/features/assessment`,evidence:`No Kura surface, prototype, or backend service models a clinical encounter. Reviewed kura-platform, both legacy DCM prototypes, and the legacy receptionist: each states that ordering follows clinical reasoning and none records the reasoning.`,exclusions:[`The ICD-10 list is a seven-code shortlist, not a vocabulary — a full index would imply backend support that does not exist.`,`Vital signs reuse the collection VitalsForm rather than a second measurement surface.`,`Nothing is persisted or signed against a server; status is local.`]},composes:[`Card`,`Input`,`Textarea`,`SegmentedToggle`,`Collapsible`,`VitalsForm`]},docs:{description:{component:`The doctor records why the patient came, what they found, and what they think it is. The assessment section is structured because it is the only part later steps read: an order carries one of these diagnoses as its stated reason, and no order can be sent without one.`}}}},x={parameters:{docs:{description:{story:`Nothing recorded yet. Both requirements are named as actions rather than hidden behind a disabled control.`}}},render:()=>(0,h.jsx)(m,{initial:d}),play:async({canvasElement:e})=>{let t=y(e);await _(t.getByText(`Still needed`)).toBeVisible(),await _(t.getByText(`Record the reason for visit`)).toBeVisible(),await _(t.getByText(`Add a working diagnosis`)).toBeVisible(),await _(t.getByRole(`button`,{name:`Order tests`})).toBeDisabled()}},S={parameters:{docs:{description:{story:`A grounded encounter: the footer states which diagnosis an order would carry.`}}},render:()=>(0,h.jsx)(m,{initial:f}),play:async({canvasElement:e})=>{let t=y(e);await _(t.getByRole(`button`,{name:`Order tests`})).toBeEnabled(),await _(t.getByText(/2 diagnoses available as an order reason/)).toBeVisible()}},C={parameters:{docs:{description:{story:`Adding one impression clears the diagnosis blocker and unlocks ordering.`}}},render:()=>(0,h.jsx)(m,{initial:{...d,reasonForVisit:`Tired for two weeks`}}),play:async({canvasElement:e})=>{let t=y(e);await _(t.getByRole(`button`,{name:`Order tests`})).toBeDisabled(),await v.type(t.getByLabelText(/Diagnosis or impression/),`Other fatigue`),await v.click(t.getByRole(`button`,{name:`Add diagnosis`})),await _(t.getByText(`R53.83 · Other fatigue`)).toBeVisible(),await _(t.getByRole(`button`,{name:`Order tests`})).toBeEnabled()}},w={parameters:{docs:{description:{story:`An impression the doctor has not coded yet is a real clinical state and grounds an order on its own.`}}},render:()=>(0,h.jsx)(m,{initial:{...d,reasonForVisit:`Tired for two weeks`,diagnoses:[{id:`dx-uncoded`,code:``,label:`Unexplained fatigue, cause not yet clear`,certainty:`working`}]}}),play:async({canvasElement:e})=>{let t=y(e);await _(t.getByText(`Unexplained fatigue, cause not yet clear`)).toBeVisible(),await _(t.getByRole(`button`,{name:`Order tests`})).toBeEnabled()}},T={parameters:{docs:{description:{story:`Safety state: once every impression is excluded there is no clinical reason left to investigate, so ordering closes again.`}}},render:()=>(0,h.jsx)(m,{initial:{...d,reasonForVisit:`Tired for two weeks`,diagnoses:[{id:`dx-excluded`,code:`E05.9`,label:`Thyrotoxicosis, unspecified`,certainty:`ruled-out`,evidence:`TSH normal on 12 June`}]}}),play:async({canvasElement:e})=>{let t=y(e);await _(t.getByText(`Add a working diagnosis`)).toBeVisible(),await _(t.getByRole(`button`,{name:`Order tests`})).toBeDisabled()}},E={render:()=>(0,h.jsx)(m,{initial:{...f,reasonForVisit:`Persistent tiredness for two weeks with intermittent light-headedness on standing, wants a general checkup before travelling`,diagnoses:[{id:`dx-long`,code:`D50.9`,label:`Iron deficiency anaemia, unspecified, suspected nutritional in origin`,certainty:`working`,evidence:`Pale conjunctiva, resting pulse 96, reports heavy periods and a largely rice-based diet for the past year`}]}})},D={parameters:{viewport:{defaultViewport:`kura320`}},render:()=>(0,h.jsx)(m,{initial:f})},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Nothing recorded yet. Both requirements are named as actions rather than hidden behind a disabled control.'
      }
    }
  },
  render: () => <Harness initial={EMPTY_ENCOUNTER} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Still needed')).toBeVisible();
    await expect(canvas.getByText('Record the reason for visit')).toBeVisible();
    await expect(canvas.getByText('Add a working diagnosis')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Order tests'
    })).toBeDisabled();
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'A grounded encounter: the footer states which diagnosis an order would carry.'
      }
    }
  },
  render: () => <Harness initial={WORKED_UP_ENCOUNTER} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Order tests'
    })).toBeEnabled();
    await expect(canvas.getByText(/2 diagnoses available as an order reason/)).toBeVisible();
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Adding one impression clears the diagnosis blocker and unlocks ordering.'
      }
    }
  },
  render: () => <Harness initial={{
    ...EMPTY_ENCOUNTER,
    reasonForVisit: 'Tired for two weeks'
  }} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Order tests'
    })).toBeDisabled();
    await userEvent.type(canvas.getByLabelText(/Diagnosis or impression/), 'Other fatigue');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Add diagnosis'
    }));
    await expect(canvas.getByText('R53.83 · Other fatigue')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Order tests'
    })).toBeEnabled();
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'An impression the doctor has not coded yet is a real clinical state and grounds an order on its own.'
      }
    }
  },
  render: () => <Harness initial={{
    ...EMPTY_ENCOUNTER,
    reasonForVisit: 'Tired for two weeks',
    diagnoses: [{
      id: 'dx-uncoded',
      code: '',
      label: 'Unexplained fatigue, cause not yet clear',
      certainty: 'working'
    }]
  }} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Unexplained fatigue, cause not yet clear')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Order tests'
    })).toBeEnabled();
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Safety state: once every impression is excluded there is no clinical reason left to investigate, so ordering closes again.'
      }
    }
  },
  render: () => <Harness initial={{
    ...EMPTY_ENCOUNTER,
    reasonForVisit: 'Tired for two weeks',
    diagnoses: [{
      id: 'dx-excluded',
      code: 'E05.9',
      label: 'Thyrotoxicosis, unspecified',
      certainty: 'ruled-out',
      evidence: 'TSH normal on 12 June'
    }]
  }} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Add a working diagnosis')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Order tests'
    })).toBeDisabled();
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <Harness initial={{
    ...WORKED_UP_ENCOUNTER,
    reasonForVisit: 'Persistent tiredness for two weeks with intermittent light-headedness on standing, wants a general checkup before travelling',
    diagnoses: [{
      id: 'dx-long',
      code: 'D50.9',
      label: 'Iron deficiency anaemia, unspecified, suspected nutritional in origin',
      certainty: 'working',
      evidence: 'Pale conjunctiva, resting pulse 96, reports heavy periods and a largely rice-based diet for the past year'
    }]
  }} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  render: () => <Harness initial={WORKED_UP_ENCOUNTER} />
}`,...D.parameters?.docs?.source}}},O=[`NewEncounter`,`Examined`,`RecordingADiagnosis`,`UncodedImpression`,`EverythingRuledOut`,`LongContent`,`Mobile320`]}))();export{T as EverythingRuledOut,S as Examined,E as LongContent,D as Mobile320,x as NewEncounter,C as RecordingADiagnosis,w as UncodedImpression,O as __namedExportsOrder,b as default};