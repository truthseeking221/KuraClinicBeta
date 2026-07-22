import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{r as i,t as a}from"./readiness-data-D41RGqZh.js";import{n as o,t as s}from"./patient-context-rail-BbMtd_Ir.js";import{n as c,t as l}from"./demo-data-DhwTGXzA.js";var u,d=t((()=>{i(),u={readiness:a.patientContext,intake:{decision:`FEATURE-OWN + COMPOSE`,owner:`src/features/patient-context`,level:`clinical organism`,evidence:`Storybook inventory has canonical Accordion, Avatar, Alert, Button, Skeleton, and Kura icon owners, but no patient-context rail. ReUI search returned no compatible component. The rail composes existing primitives and remains a target-contract fixture until the patient-chart context API exists.`,exclusions:[`No edit, prescribe, identity-verification, or workflow transition action is exposed.`,`No Figma icon assets, foreign icon libraries, or copied SVGs are used.`,`No prototype-app integration is included; Storybook remains the canonical owner.`]},source:`Figma Kura Design node 1253:93620`,figma:{component:`Patient context rail`,node:`1253:93620`,states:{established:`1253:93618`,newPatient:`1253:93619`,activeProblems:`1253:101475`,currentMedications:`1253:101998`,pendingVerification:`1253:102225`,pastHistory:`1253:102448`,adminDetails:`1253:102683`,activeProblemsEmpty:`1253:102916`,currentMedicationsEmpty:`1253:103117`,allExpanded:`1335:31524`}},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`none`,icons:`kura-canonical`,motion:`accordion-owned`,responsive:`rail-to-full-width`},contract:{status:`target-contract`,note:`The current clinic BFF exposes patient search and identity verification, not a longitudinal EMR context payload for allergies, active problems, medications, history, or administrative details. Stories use deterministic fixtures and must be presented as design intent.`}}}));function f(){let[e,t]=(0,m.useState)(`error`);return(0,p.jsx)(s,{...l.established,state:e,onRetry:()=>t(`ready`)})}var p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H;t((()=>{p=r(),m=e(n()),c(),o(),d(),{expect:h,fn:g,userEvent:_,waitFor:v,within:y}=__STORYBOOK_MODULE_TEST__,b={title:`Clinic/Clinical/Patient Context Rail`,component:s,tags:[`autodocs`,`source-figma`,`adapted-kura`,`play-fn`],parameters:{layout:`padded`,kura:u,docs:{description:{component:`Target-contract patient context for a future clinical workspace. Identity and safety stay visible; secondary record detail uses accessible multiple disclosure. This component is not backed by a live patient-chart context API.`}}},args:l.established},x={play:async({canvasElement:e})=>{let t=y(e);await h(t.getByRole(`heading`,{name:`Sreymom Sok`})).toBeVisible(),await h(t.getByRole(`heading`,{name:`Safety`})).toBeVisible(),await h(t.getByText(`Penicillin allergy`)).toBeVisible(),await h(t.getByRole(`button`,{name:/Active problems.*0 recorded/i})).toHaveAttribute(`aria-expanded`,`false`)}},S={args:l.newPatient},C={args:{...l.established,showIdentity:!1}},w={args:{...l.activeProblems,defaultExpanded:[`problems`]}},T={args:{...l.currentMedications,defaultExpanded:[`medications`]}},E={args:{...l.pendingVerification,defaultExpanded:[`verification`]}},D={args:{...l.pastHistory,defaultExpanded:[`history`]}},O={args:{...l.adminDetails,defaultExpanded:[`administration`]}},k={args:{...l.activeProblemsEmpty,defaultExpanded:[`problems`]}},A={args:{...l.currentMedicationsEmpty,defaultExpanded:[`medications`]}},j={args:{...l.activeProblems,sections:[l.activeProblems.sections[0],l.currentMedications.sections[1],l.pendingVerification.sections[2],l.pastHistory.sections[3],l.adminDetails.sections[4]],defaultExpanded:[`problems`,`medications`,`verification`,`history`,`administration`]}},M={args:l.currentMedications,play:async({canvasElement:e})=>{let t=y(e),n=t.getByRole(`button`,{name:/Active problems.*0 recorded/i}),r=t.getByRole(`button`,{name:/Current medications.*3 recorded/i});await _.click(n),await _.click(r),await h(n).toHaveAttribute(`aria-expanded`,`true`),await h(r).toHaveAttribute(`aria-expanded`,`true`),await h(t.getByText(`Lisinopril 10 mg`)).toBeVisible()}},N={args:l.established,play:async({canvasElement:e})=>{let t=y(e).getByRole(`button`,{name:/Active problems.*0 recorded/i}),n=t.querySelector(`[data-slot="accordion-trigger-icon"]`);if(!n)throw Error(`Accordion trigger must expose its canonical chevron.`);let r=window.getComputedStyle(n).color;t.focus(),await h(window.getComputedStyle(t).cursor).toBe(`pointer`),await h(window.getComputedStyle(t).backgroundColor).toBe(`rgba(0, 0, 0, 0)`),await h(window.getComputedStyle(n).color).not.toBe(r)}},P={args:l.currentMedications,play:async({canvasElement:e})=>{let t=y(e),n=t.getByRole(`button`,{name:/Active problems.*0 recorded/i}),r=t.getByRole(`button`,{name:/Current medications.*3 recorded/i});n.focus(),await _.keyboard(`{ArrowDown}{Enter}`),await h(r).toHaveFocus(),await h(r).toHaveAttribute(`aria-expanded`,`true`)}},F={args:{...l.established,state:`loading`}},I={render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=y(e);await h(t.getByRole(`alert`)).toHaveTextContent(`Could not load patient context`),await _.click(t.getByRole(`button`,{name:`Retry`})),await v(()=>h(t.queryByRole(`alert`)).not.toBeInTheDocument()),await h(t.getByRole(`button`,{name:/Active problems.*0 recorded/i})).toBeVisible()}},L={args:{...l.established,state:`offline`,onRetry:g()}},R={args:{...l.established,state:`permission-denied`}},z={args:{...l.currentMedications,defaultExpanded:[`medications`],readOnly:!0},play:async({canvasElement:e})=>{let t=y(e);await h(t.getByLabelText(`Patient context for Sreymom Sok`)).toHaveAttribute(`data-read-only`,`true`),await h(t.queryByText(`Read-only patient context.`)).not.toBeInTheDocument()}},B={args:{...l.currentMedications,patient:{initials:`NP`,name:`Nary Phalla Chann with a deliberately long clinical-record name`,demographics:`57 y · F · MRN P-7133-EXTENDED-IDENTIFIER`},sections:[l.currentMedications.sections[0],{id:`medications`,label:`Current medications`,items:[{label:`Atorvastatin 20 mg with extended-release dosing instructions`,detail:`One tablet nightly after the evening meal; reconciliation pending`}]},...l.currentMedications.sections.slice(2)],defaultExpanded:[`medications`]}},V={args:{...l.currentMedications,defaultExpanded:[`medications`]},parameters:{viewport:{defaultViewport:`kura320`}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Sreymom Sok'
    })).toBeVisible();
    await expect(canvas.getByRole('heading', {
      name: 'Safety'
    })).toBeVisible();
    await expect(canvas.getByText('Penicillin allergy')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: /Active problems.*0 recorded/i
    })).toHaveAttribute('aria-expanded', 'false');
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: PATIENT_CONTEXT_FIXTURES.newPatient
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    ...PATIENT_CONTEXT_FIXTURES.established,
    showIdentity: false
  }
}`,...C.parameters?.docs?.source},description:{story:`Inside the patient chart the workbar owns identity; the rail must not repeat it.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    ...PATIENT_CONTEXT_FIXTURES.activeProblems,
    defaultExpanded: ['problems']
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    ...PATIENT_CONTEXT_FIXTURES.currentMedications,
    defaultExpanded: ['medications']
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    ...PATIENT_CONTEXT_FIXTURES.pendingVerification,
    defaultExpanded: ['verification']
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    ...PATIENT_CONTEXT_FIXTURES.pastHistory,
    defaultExpanded: ['history']
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    ...PATIENT_CONTEXT_FIXTURES.adminDetails,
    defaultExpanded: ['administration']
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    ...PATIENT_CONTEXT_FIXTURES.activeProblemsEmpty,
    defaultExpanded: ['problems']
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    ...PATIENT_CONTEXT_FIXTURES.currentMedicationsEmpty,
    defaultExpanded: ['medications']
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    ...PATIENT_CONTEXT_FIXTURES.activeProblems,
    sections: [PATIENT_CONTEXT_FIXTURES.activeProblems.sections[0], PATIENT_CONTEXT_FIXTURES.currentMedications.sections[1], PATIENT_CONTEXT_FIXTURES.pendingVerification.sections[2], PATIENT_CONTEXT_FIXTURES.pastHistory.sections[3], PATIENT_CONTEXT_FIXTURES.adminDetails.sections[4]],
    defaultExpanded: ['problems', 'medications', 'verification', 'history', 'administration']
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: PATIENT_CONTEXT_FIXTURES.currentMedications,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const problems = canvas.getByRole('button', {
      name: /Active problems.*0 recorded/i
    });
    const medications = canvas.getByRole('button', {
      name: /Current medications.*3 recorded/i
    });
    await userEvent.click(problems);
    await userEvent.click(medications);
    await expect(problems).toHaveAttribute('aria-expanded', 'true');
    await expect(medications).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByText('Lisinopril 10 mg')).toBeVisible();
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: PATIENT_CONTEXT_FIXTURES.established,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const problems = canvas.getByRole('button', {
      name: /Active problems.*0 recorded/i
    });
    const chevron = problems.querySelector('[data-slot="accordion-trigger-icon"]');
    if (!chevron) throw new Error('Accordion trigger must expose its canonical chevron.');
    const defaultChevronColor = window.getComputedStyle(chevron).color;
    problems.focus();
    await expect(window.getComputedStyle(problems).cursor).toBe('pointer');
    await expect(window.getComputedStyle(problems).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    await expect(window.getComputedStyle(chevron).color).not.toBe(defaultChevronColor);
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: PATIENT_CONTEXT_FIXTURES.currentMedications,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const problems = canvas.getByRole('button', {
      name: /Active problems.*0 recorded/i
    });
    const medications = canvas.getByRole('button', {
      name: /Current medications.*3 recorded/i
    });
    problems.focus();
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await expect(medications).toHaveFocus();
    await expect(medications).toHaveAttribute('aria-expanded', 'true');
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    ...PATIENT_CONTEXT_FIXTURES.established,
    state: 'loading'
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <ErrorRecoveryHarness />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('alert')).toHaveTextContent('Could not load patient context');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Retry'
    }));
    await waitFor(() => expect(canvas.queryByRole('alert')).not.toBeInTheDocument());
    await expect(canvas.getByRole('button', {
      name: /Active problems.*0 recorded/i
    })).toBeVisible();
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    ...PATIENT_CONTEXT_FIXTURES.established,
    state: 'offline',
    onRetry: fn()
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    ...PATIENT_CONTEXT_FIXTURES.established,
    state: 'permission-denied'
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    ...PATIENT_CONTEXT_FIXTURES.currentMedications,
    defaultExpanded: ['medications'],
    readOnly: true
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Patient context for Sreymom Sok')).toHaveAttribute('data-read-only', 'true');
    await expect(canvas.queryByText('Read-only patient context.')).not.toBeInTheDocument();
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    ...PATIENT_CONTEXT_FIXTURES.currentMedications,
    patient: {
      initials: 'NP',
      name: 'Nary Phalla Chann with a deliberately long clinical-record name',
      demographics: '57 y · F · MRN P-7133-EXTENDED-IDENTIFIER'
    },
    sections: [PATIENT_CONTEXT_FIXTURES.currentMedications.sections[0], {
      id: 'medications',
      label: 'Current medications',
      items: [{
        label: 'Atorvastatin 20 mg with extended-release dosing instructions',
        detail: 'One tablet nightly after the evening meal; reconciliation pending'
      }]
    }, ...PATIENT_CONTEXT_FIXTURES.currentMedications.sections.slice(2)],
    defaultExpanded: ['medications']
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    ...PATIENT_CONTEXT_FIXTURES.currentMedications,
    defaultExpanded: ['medications']
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...V.parameters?.docs?.source}}},H=[`Established`,`NewPatient`,`IdentityHidden`,`ActiveProblems`,`CurrentMedications`,`PendingVerification`,`PastHistory`,`AdminDetails`,`ActiveProblemsEmpty`,`CurrentMedicationsEmpty`,`AllExpanded`,`DisclosureInteraction`,`PointerAffordance`,`KeyboardDisclosure`,`Loading`,`ErrorAndRecovery`,`Offline`,`PermissionDenied`,`ReadOnly`,`LongContent`,`Mobile320`]}))();export{w as ActiveProblems,k as ActiveProblemsEmpty,O as AdminDetails,j as AllExpanded,T as CurrentMedications,A as CurrentMedicationsEmpty,M as DisclosureInteraction,I as ErrorAndRecovery,x as Established,C as IdentityHidden,P as KeyboardDisclosure,F as Loading,B as LongContent,V as Mobile320,S as NewPatient,L as Offline,D as PastHistory,E as PendingVerification,R as PermissionDenied,N as PointerAffordance,z as ReadOnly,H as __namedExportsOrder,b as default};