import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{r as i,t as a}from"./readiness-data-D41RGqZh.js";import{d as o,r as s}from"./demo-data-gkTu93CM.js";import{n as c,t as l}from"./patient-acquisition-flow-3FkVUukK.js";import{n as u,t as d}from"./patients-registry-VW_VhY6B.js";function f({acquisition:e,...t}){let[n,r]=(0,m.useState)(!1);return n?(0,p.jsx)(l,{...e,initialStage:`phone-gate`,onExit:()=>r(!1)}):(0,p.jsx)(d,{...t,onAddPatient:()=>r(!0)})}var p,m,h=t((()=>{p=r(),m=e(n()),c(),u(),f.__docgenInfo={description:`Canonical Patients surface composition. The registry starts the governed
phone gate; creation never bypasses matching or provisional-patient rules.`,methods:[],displayName:`PatientsWorkspace`,props:{acquisition:{required:!1,tsType:{name:`Pick`,elements:[{name:`signature`,type:`object`,raw:`{
  initialStage?: PatientAcquisitionStage;
  /** Deterministic patient-reported data for direct complete-state stories. */
  initialIntakeRecord?: PatientIntakeRecord;
  /**
   * Optional Storybook/prototype adapter that simulates the patient replying
   * after a successful send. Without it, the honest target state is waiting.
   */
  demoIntakeRecord?: PatientIntakeRecord;
  intakeSendDelayMs?: number;
  intakeSendResult?: 'success' | 'error';
  /**
   * What the verified number resolves to. A first-time patient is only one of
   * the outcomes: the same number can already belong to someone, or to a
   * household. Defaults to no match so the empty-clinic journey stays the
   * default reading.
   */
  lookup?: (e164: string) => PhoneLookupResult;
  /**
   * What the patient has answered so far, while the clinic waits. Supplied by
   * the caller rather than derived: the clinic has no live channel into the
   * patient's phone, and inventing one here would claim a capability the
   * platform does not have.
   */
  intakeProgress?: {
    openedLabel: string;
    items: readonly { label: string; answer?: string }[];
  };
  /** Returns to the surface that launched the phone gate when it is dismissed. */
  onExit?: () => void;
  phoneGateDelayMs?: number;
}`,signature:{properties:[{key:`initialStage`,value:{name:`union`,raw:`| 'patients-empty'
| 'phone-gate'
| 'intake-unknown'
| 'intake-sending'
| 'intake-error'
| 'intake-requested'
| 'intake-form'
| 'intake-complete'
| 'ready-to-order'`,elements:[{name:`literal`,value:`'patients-empty'`},{name:`literal`,value:`'phone-gate'`},{name:`literal`,value:`'intake-unknown'`},{name:`literal`,value:`'intake-sending'`},{name:`literal`,value:`'intake-error'`},{name:`literal`,value:`'intake-requested'`},{name:`literal`,value:`'intake-form'`},{name:`literal`,value:`'intake-complete'`},{name:`literal`,value:`'ready-to-order'`}],required:!1}},{key:`initialIntakeRecord`,value:{name:`signature`,type:`object`,raw:`{
  reasonForVisit: string;
  allergies: string;
  medicines: string;
  familyHistory: string;
}`,signature:{properties:[{key:`reasonForVisit`,value:{name:`string`,required:!0}},{key:`allergies`,value:{name:`string`,required:!0}},{key:`medicines`,value:{name:`string`,required:!0}},{key:`familyHistory`,value:{name:`string`,required:!0}}]},required:!1},description:`Deterministic patient-reported data for direct complete-state stories.`},{key:`demoIntakeRecord`,value:{name:`signature`,type:`object`,raw:`{
  reasonForVisit: string;
  allergies: string;
  medicines: string;
  familyHistory: string;
}`,signature:{properties:[{key:`reasonForVisit`,value:{name:`string`,required:!0}},{key:`allergies`,value:{name:`string`,required:!0}},{key:`medicines`,value:{name:`string`,required:!0}},{key:`familyHistory`,value:{name:`string`,required:!0}}]},required:!1},description:`Optional Storybook/prototype adapter that simulates the patient replying
after a successful send. Without it, the honest target state is waiting.`},{key:`intakeSendDelayMs`,value:{name:`number`,required:!1}},{key:`intakeSendResult`,value:{name:`union`,raw:`'success' | 'error'`,elements:[{name:`literal`,value:`'success'`},{name:`literal`,value:`'error'`}],required:!1}},{key:`lookup`,value:{name:`signature`,type:`function`,raw:`(e164: string) => PhoneLookupResult`,signature:{arguments:[{type:{name:`string`},name:`e164`}],return:{name:`union`,raw:`| { kind: 'known_match'; patient: MatchedPatient }
| { kind: 'shared_matches'; candidates: MatchedPatient[] }
| { kind: 'no_match' }
| { kind: 'error' }`,elements:[{name:`signature`,type:`object`,raw:`{ kind: 'known_match'; patient: MatchedPatient }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'known_match'`,required:!0}},{key:`patient`,value:{name:`signature`,type:`object`,raw:`{
  patientId: string;
  initials: string;
  name: string;
  sex: string;
  age: number;
  /** Masked MRN — the modal never reveals more PHI than the minimum. */
  mrnMasked: string;
}`,signature:{properties:[{key:`patientId`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`sex`,value:{name:`string`,required:!0}},{key:`age`,value:{name:`number`,required:!0}},{key:`mrnMasked`,value:{name:`string`,required:!0},description:`Masked MRN — the modal never reveals more PHI than the minimum.`}]},required:!0}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'shared_matches'; candidates: MatchedPatient[] }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'shared_matches'`,required:!0}},{key:`candidates`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  patientId: string;
  initials: string;
  name: string;
  sex: string;
  age: number;
  /** Masked MRN — the modal never reveals more PHI than the minimum. */
  mrnMasked: string;
}`,signature:{properties:[{key:`patientId`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`sex`,value:{name:`string`,required:!0}},{key:`age`,value:{name:`number`,required:!0}},{key:`mrnMasked`,value:{name:`string`,required:!0},description:`Masked MRN — the modal never reveals more PHI than the minimum.`}]},required:!0}],raw:`MatchedPatient[]`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'no_match' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'no_match'`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'error' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'error'`,required:!0}}]}}]}},required:!1},description:`What the verified number resolves to. A first-time patient is only one of
the outcomes: the same number can already belong to someone, or to a
household. Defaults to no match so the empty-clinic journey stays the
default reading.`},{key:`intakeProgress`,value:{name:`signature`,type:`object`,raw:`{
  openedLabel: string;
  items: readonly { label: string; answer?: string }[];
}`,signature:{properties:[{key:`openedLabel`,value:{name:`string`,required:!0}},{key:`items`,value:{name:`unknown`,required:!0}}]},required:!1},description:`What the patient has answered so far, while the clinic waits. Supplied by
the caller rather than derived: the clinic has no live channel into the
patient's phone, and inventing one here would claim a capability the
platform does not have.`},{key:`onExit`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!1},description:`Returns to the surface that launched the phone gate when it is dismissed.`},{key:`phoneGateDelayMs`,value:{name:`number`,required:!1}}]}},{name:`union`,raw:`| 'demoIntakeRecord'
| 'intakeSendDelayMs'
| 'intakeSendResult'
| 'lookup'
| 'phoneGateDelayMs'`,elements:[{name:`literal`,value:`'demoIntakeRecord'`},{name:`literal`,value:`'intakeSendDelayMs'`},{name:`literal`,value:`'intakeSendResult'`},{name:`literal`,value:`'lookup'`},{name:`literal`,value:`'phoneGateDelayMs'`}]}],raw:`Pick<
  PatientAcquisitionFlowProps,
  | 'demoIntakeRecord'
  | 'intakeSendDelayMs'
  | 'intakeSendResult'
  | 'lookup'
  | 'phoneGateDelayMs'
>`},description:`Deterministic adapters for the Storybook and prototype flow.`}}}})),g,_,v,y,b,x,S,C;t((()=>{i(),o(),h(),{expect:g,userEvent:_,within:v}=__STORYBOOK_MODULE_TEST__,y={title:`Clinic/Flows/Create Patient from Registry`,component:f,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`padded`,kura:{readiness:a.flows,flow:{pages:[`Clinic/Clinical/Patients/Registry`,`Clinic/Flows/Patient Acquisition and Intake`],terminal:`Phone-resolved patient reaches the documented intake outcome`},intake:{decision:`COMPOSE`,owner:`src/features/patients/patients-workspace.tsx`,evidence:`PAT-18 and CASE-COV-013 require the Patients action to enter the governed phone and provisional-patient flow; PatientsRegistry and PatientAcquisitionFlow remain the canonical owners.`,exclusions:[`No direct patient creation from the registry.`,`No claim that phone possession verifies patient identity.`,`No new persistence or backend behavior.`]},journeys:[`PAT-18`]},docs:{description:{component:`The documented PAT-18 entry: Add patient leaves the registry only through phone confirmation, matching, and provisional-patient handling before intake.`}}},args:{acquisition:{demoIntakeRecord:s,intakeSendDelayMs:300,phoneGateDelayMs:0},patients:[]}},b={tags:[`play-fn`],play:async({canvasElement:e})=>{let t=v(e),n=v(e.ownerDocument.body);await _.click(t.getByRole(`button`,{name:`Add patient`})),await g(await n.findByRole(`heading`,{name:`Patient phone`})).toBeVisible(),await g(n.queryByRole(`button`,{name:`Create provisional patient and continue`})).not.toBeInTheDocument()}},x={tags:[`play-fn`],play:async({canvasElement:e})=>{let t=v(e),n=v(e.ownerDocument.body);await _.click(t.getByRole(`button`,{name:`Add patient`})),await _.click(await n.findByRole(`button`,{name:`Close patient identity gate`})),await g(await t.findByText(`No patients yet`)).toBeVisible(),await g(t.getByRole(`button`,{name:`Add patient`})).toBeEnabled()}},S={globals:{viewport:{value:`kura320`}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Add patient'
    }));
    await expect(await screen.findByRole('heading', {
      name: 'Patient phone'
    })).toBeVisible();
    await expect(screen.queryByRole('button', {
      name: 'Create provisional patient and continue'
    })).not.toBeInTheDocument();
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Add patient'
    }));
    await userEvent.click(await screen.findByRole('button', {
      name: 'Close patient identity gate'
    }));
    await expect(await canvas.findByText('No patients yet')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Add patient'
    })).toBeEnabled();
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  globals: {
    viewport: {
      value: 'kura320'
    }
  }
}`,...S.parameters?.docs?.source}}},C=[`StartsGovernedCreateFlow`,`CancelReturnsToRegistry`,`Mobile320`]}))();export{x as CancelReturnsToRegistry,S as Mobile320,b as StartsGovernedCreateFlow,C as __namedExportsOrder,y as default};