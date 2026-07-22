import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{a as n,c as r,f as i,i as a,m as o,n as s,o as c,p as l,r as u,s as d,y as f}from"./storybook-metadata-CwrABL_1.js";import{n as p,t as m}from"./prescribe-flow-BouvioC6.js";import{n as h,t as g}from"./prescribe-rail.stories.module-CnuPCpQf.js";var _,v,y,b,x,S,C,w,T,E,D;e((()=>{_=t(),f(),p(),g(),u(),{expect:v,fn:y,userEvent:b,within:x}=__STORYBOOK_MODULE_TEST__,S={title:`Clinic/Flows/Prescribing`,component:m,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:{...s,flow:{pages:[`Clinic/Clinical/Patients/ICD-10 diagnosis rail`,`Clinic/Clinical/Patients/Prescribing/Medication Draft`],terminal:`Clinician returns an unsigned local medication draft`},intake:{...s.intake,decision:`COMPOSE`,owner:`src/features/patients/prescribe-flow.tsx`,evidence:`The existing ICD-10 diagnosis rail owns indication selection and the medication draft owns whole-regimen review. This flow preserves both drafts while moving between them.`},journeys:[`ENC-03`,`ENC-09`]},docs:{description:{component:`Medication review begins with a patient-linked ICD-10 draft indication, then keeps that context visible through the unsigned medication draft.`}}},args:{patientName:`Sok Nimol`,diagnoses:a,diagnosisSuggestions:n,diagnosisSearchCandidates:d,flaggedLabs:c,needsReview:r,suggestions:o,settled:l,searchPool:i,onClose:y(),onComplete:y()},decorators:[e=>(0,_.jsx)(`div`,{className:h.frame,children:(0,_.jsx)(e,{})})]},C={tags:[`play-fn`],play:async({canvasElement:e})=>{let t=x(e);await v(t.getByRole(`heading`,{name:`Select diagnosis`})).toBeVisible();let n=t.getByRole(`button`,{name:/Review medicines/});await v(n).toBeEnabled(),await b.click(n),await v(t.getByRole(`heading`,{name:`Prescribe`})).toBeVisible(),await v(t.getByRole(`button`,{name:`Change diagnoses`})).toBeVisible()}},w={args:{diagnoses:[]},tags:[`play-fn`],play:async({canvasElement:e})=>{let t=x(e),n=t.getByRole(`button`,{name:`Review medicines`});await v(n).toBeDisabled(),await b.click(t.getByRole(`checkbox`,{name:/Add N18\.3/})),await v(n).toBeEnabled(),await b.click(n),await v(t.getByRole(`heading`,{name:`Prescribe`})).toBeVisible()}},T={args:{needsReview:[]},tags:[`play-fn`],play:async({canvasElement:e})=>{let t=x(e);await b.click(t.getByRole(`button`,{name:/Review medicines/}));let n=t.getByRole(`region`,{name:`AI suggestions`});await b.click(x(n).getAllByRole(`button`,{name:`Add to draft`})[0]),await b.click(t.getByRole(`button`,{name:`Change diagnoses`})),await b.click(t.getByRole(`button`,{name:/Review medicines/})),await v(t.getByText(`Draft additions`)).toBeVisible(),await v(t.getByText(`AI suggestion`)).toBeVisible()}},E={globals:{viewport:{value:`kura320`}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  tags: ["play-fn"],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", {
      name: "Select diagnosis"
    })).toBeVisible();
    const next = canvas.getByRole("button", {
      name: /Review medicines/
    });
    await expect(next).toBeEnabled();
    await userEvent.click(next);
    await expect(canvas.getByRole("heading", {
      name: "Prescribe"
    })).toBeVisible();
    await expect(canvas.getByRole("button", {
      name: "Change diagnoses"
    })).toBeVisible();
  }
}`,...C.parameters?.docs?.source},description:{story:`Existing chart diagnoses are ready to confirm without clerical re-entry.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    diagnoses: []
  },
  tags: ["play-fn"],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const next = canvas.getByRole("button", {
      name: "Review medicines"
    });
    await expect(next).toBeDisabled();
    await userEvent.click(canvas.getByRole("checkbox", {
      name: /Add N18\\.3/
    }));
    await expect(next).toBeEnabled();
    await userEvent.click(next);
    await expect(canvas.getByRole("heading", {
      name: "Prescribe"
    })).toBeVisible();
  }
}`,...w.parameters?.docs?.source},description:{story:`Missing indication blocks the medication step until the clinician selects one.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    needsReview: []
  },
  tags: ["play-fn"],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", {
      name: /Review medicines/
    }));
    const aiRegion = canvas.getByRole("region", {
      name: "AI suggestions"
    });
    await userEvent.click(within(aiRegion).getAllByRole("button", {
      name: "Add to draft"
    })[0]);
    await userEvent.click(canvas.getByRole("button", {
      name: "Change diagnoses"
    }));
    await userEvent.click(canvas.getByRole("button", {
      name: /Review medicines/
    }));
    await expect(canvas.getByText("Draft additions")).toBeVisible();
    await expect(canvas.getByText("AI suggestion")).toBeVisible();
  }
}`,...T.parameters?.docs?.source},description:{story:`Returning to diagnosis selection does not discard medication work.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  globals: {
    viewport: {
      value: "kura320"
    }
  }
}`,...E.parameters?.docs?.source}}},D=[`ExistingDiagnoses`,`SelectDiagnosisToContinue`,`PreserveMedicationDraft`,`MobileWidth320`]}))();export{C as ExistingDiagnoses,E as MobileWidth320,T as PreserveMedicationDraft,w as SelectDiagnosisToContinue,D as __namedExportsOrder,S as default};