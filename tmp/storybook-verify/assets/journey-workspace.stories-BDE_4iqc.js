import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{t as i}from"./ui-C9kmmzkH.js";import{t as a}from"./button-B6_zsN5-.js";import{a as ee}from"./collapsible-Cfc9M9oP.js";import{l as o,o as s,r as te,t as ne}from"./card-DMMaaphC.js";import{r as re,t as ie}from"./readiness-data-D41RGqZh.js";import{n as c,r as l,t as u}from"./patient-sOP5Ucga.js";import{a as ae,c as oe,i as se,n as ce,o as le,r as ue,s as d,t as de}from"./assessment-workspace-BgjOrRLi.js";import{a as fe,c as pe,f as me,l as he,m as ge,n as f,o as _e,r as p,s as ve,t as m}from"./demo-data-CJynsz0s.js";function h(e,t){return{patientId:e,patientName:t,identity:`unknown`,orderedTestCount:0,payment:`none`,sample:`none`,result:`none`}}function g(e,t){switch(t){case`identity`:return e.identity!==`unknown`;case`assessment`:return!!(e.assessment&&e.indication);case`order`:return e.orderedTestCount>0&&e.payment!==`none`;case`collection`:return e.sample===`collected`||e.sample===`received_at_lab`;case`results`:return e.result===`released`||e.result===`reviewed`;case`care-plan`:return!!(e.plan&&e.plan.status===`active`)}}function _(e){return v.find(t=>!g(e,t))??`care-plan`}function ye(e){let t=_(e),n={phase:t,actor:b[t]};switch(t){case`identity`:return{...n,action:`Verify the phone and open the patient record`};case`assessment`:return{...n,action:`Record the reason for visit and a working diagnosis`};case`order`:return e.indication?e.orderedTestCount===0?{...n,action:`Choose the tests this diagnosis needs`}:{...n,action:`Set up collection and payment`}:{...n,action:`Order the tests`,blockedBy:`No working diagnosis recorded yet`};case`collection`:return e.sample===`none`?{...n,action:`Check the patient in and prepare the tubes`}:{...n,action:`Draw the sample and confirm the tubes`};case`results`:return e.sample===`received_at_lab`?e.result===`pending`?{...n,action:`Wait for the lab to release the results`}:{...n,action:`Review the released results with the patient`}:{...n,action:`Wait for the lab to receive the samples`,blockedBy:`Samples have not reached the lab`};case`care-plan`:return{...n,action:`Sign the care plan so the next measurement is scheduled`}}}function be(e){return`${e.payment===`none`?`No charge raised`:e.payment===`due`?`Payment due`:e.payment===`paid`?`Paid`:`Payment deferred`} · ${e.sample===`none`?`No sample`:e.sample===`awaiting_collection`?`Awaiting collection`:e.sample===`collected`?`Collected`:`Received at lab`} · ${e.result===`none`?`No result`:e.result===`pending`?`In the lab`:e.result===`released`?`Released`:`Reviewed`}`}function xe(e,t){return g(e,t)?`complete`:_(e)===t?`current`:`upcoming`}var v,y,b,x=t((()=>{v=[`identity`,`assessment`,`order`,`collection`,`results`,`care-plan`],y={identity:`Identity`,assessment:`Assessment`,order:`Order`,collection:`Collection`,results:`Results`,"care-plan":`Care plan`},b={identity:`Reception or doctor`,assessment:`Doctor`,order:`Doctor`,collection:`Nurse`,results:`Lab, then doctor`,"care-plan":`Doctor`}})),S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,Se=t((()=>{S=`_workspace_syw1v_1`,C=`_header_syw1v_10`,w=`_identity_syw1v_17`,T=`_title_syw1v_24`,E=`_demographics_syw1v_31`,D=`_strip_syw1v_37`,O=`_phase_syw1v_46`,k=`_nextStep_syw1v_70`,A=`_nextLabel_syw1v_81`,j=`_nextAction_syw1v_86`,M=`_nextActor_syw1v_92`,N=`_nextBlocked_syw1v_97`,P=`_axes_syw1v_102`,F=`_stepCard_syw1v_109`,I=`_stepDetail_syw1v_113`,L=`_stepFooter_syw1v_120`,R={workspace:S,header:C,identity:w,title:T,demographics:E,strip:D,phase:O,nextStep:k,nextLabel:A,nextAction:j,nextActor:M,nextBlocked:N,axes:P,stepCard:F,stepDetail:I,stepFooter:L}}));function z({action:e,detail:t,onDone:n,title:r}){return(0,V.jsxs)(ne,{as:`section`,"aria-label":r,className:R.stepCard,children:[(0,V.jsx)(s,{children:(0,V.jsx)(o,{children:r})}),(0,V.jsx)(te,{children:(0,V.jsx)(`p`,{className:R.stepDetail,children:t})}),(0,V.jsx)(`footer`,{className:R.stepFooter,children:(0,V.jsx)(a,{onClick:n,children:e})})]})}function B({initialEpisode:e}){let[t,n]=(0,H.useState)(e??h(u.userId,u.displayName)),[r,i]=(0,H.useState)(e?.assessment??le),a=_(t),o=ye(t),s=e=>n(t=>({...t,...e}));return(0,V.jsxs)(`div`,{className:R.workspace,children:[(0,V.jsxs)(`header`,{className:R.header,children:[(0,V.jsxs)(`div`,{className:R.identity,children:[(0,V.jsx)(`h1`,{className:R.title,children:t.patientName}),(0,V.jsx)(`span`,{className:R.demographics,children:c}),(0,V.jsx)(ee,{variant:t.identity===`verified`?`success`:`warning`,children:t.identity===`unknown`?`Not identified`:t.identity===`provisional`?`Provisional`:`Verified`})]}),(0,V.jsx)(`ol`,{"aria-label":`Journey phases`,className:R.strip,children:v.map(e=>(0,V.jsx)(`li`,{className:R.phase,"data-state":xe(t,e),children:(0,V.jsx)(`span`,{className:R.phaseLabel,children:y[e]})},e))}),(0,V.jsxs)(`div`,{className:R.nextStep,role:`status`,children:[(0,V.jsx)(`span`,{className:R.nextLabel,children:`Next`}),(0,V.jsx)(`span`,{className:R.nextAction,children:o.action}),(0,V.jsx)(`span`,{className:R.nextActor,children:o.actor}),o.blockedBy?(0,V.jsxs)(`span`,{className:R.nextBlocked,children:[`Waiting: `,o.blockedBy]}):null]}),(0,V.jsx)(`p`,{className:R.axes,children:be(t)})]}),a===`identity`?(0,V.jsx)(z,{action:`Phone verified, open the record`,detail:`A verified phone proves Kura can reach this number. It does not prove who the patient is, so the record opens as provisional until an identity document is checked.`,onDone:()=>s({identity:`provisional`}),title:`Identify the patient`}):null,a===`assessment`?(0,V.jsx)(de,{assessment:r,onChange:i,onOrderTests:e=>{let[t]=ae(e.diagnoses);s({assessment:e,indication:t?ue(t):void 0})},patientDemographics:c,patientName:t.patientName}):null,a===`order`?(0,V.jsx)(z,{action:`Send booking code`,detail:`Ten baseline tests, ordered for ${t.indication?.code} · ${t.indication?.label}. The patient will pay at the Kura desk.`,onDone:()=>s({orderedTestCount:10,payment:`due`,sample:`awaiting_collection`}),title:`Order tests`}):null,a===`collection`?(0,V.jsx)(z,{action:`Payment taken, tubes drawn`,detail:`Cash collected at the desk and four tubes drawn after the positive-identification check. Payment and collection are recorded separately: one can happen without the other.`,onDone:()=>s({payment:`paid`,sample:`collected`}),title:`Collect payment and samples`}):null,a===`results`?(0,V.jsx)(z,{action:`Release results to the doctor`,detail:`The courier delivered the samples and the lab has verified them. Ferritin 9 µg/L, haemoglobin 10.2 g/dL — both below range.`,onDone:()=>s({sample:`received_at_lab`,result:`released`}),title:`Lab runs the tests`}):null,a===`care-plan`&&!t.plan?(0,V.jsx)(pe,{anchorLabel:f,draft:m,onSign:e=>s({plan:ge(p,m,e,`Dr. Sok Vanna`,f),result:`reviewed`}),plan:p,signedBy:`Dr. Sok Vanna`}):null,t.plan?(0,V.jsx)(_e,{plan:t.plan}):null]})}var V,H,Ce=t((()=>{V=r(),H=e(n()),i(),ce(),oe(),se(),he(),ve(),fe(),me(),x(),Se(),l(),B.__docgenInfo={description:`The journey conductor. It owns the episode and decides what comes next; the
phase surfaces below it only read their input and hand back their output.

The strip at the top is the point of the whole thing: at any moment it
states which step the episode is in, who is expected to act, and — when the
episode has stopped — what is holding it up. Money, specimen and result are
reported separately, because a paid visit with no sample drawn is a real
and common state.`,methods:[],displayName:`JourneyWorkspace`,props:{initialEpisode:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  patientId: string;
  patientName: string;
  identity: IdentityState;
  assessment?: ClinicalAssessment;
  indication?: OrderIndication;
  orderedTestCount: number;
  payment: PaymentState;
  sample: SampleState;
  result: ResultState;
  plan?: CarePlan;
}`,signature:{properties:[{key:`patientId`,value:{name:`string`,required:!0}},{key:`patientName`,value:{name:`string`,required:!0}},{key:`identity`,value:{name:`union`,raw:`'unknown' | 'provisional' | 'verified'`,elements:[{name:`literal`,value:`'unknown'`},{name:`literal`,value:`'provisional'`},{name:`literal`,value:`'verified'`}],required:!0}},{key:`assessment`,value:{name:`signature`,type:`object`,raw:`{
  patientId: string;
  reasonForVisit: string;
  subjective: string;
  objective: string;
  vitals?: VitalsValues;
  diagnoses: readonly WorkingDiagnosis[];
  plan: string;
  recordedBy: string;
  status: AssessmentStatus;
}`,signature:{properties:[{key:`patientId`,value:{name:`string`,required:!0}},{key:`reasonForVisit`,value:{name:`string`,required:!0}},{key:`subjective`,value:{name:`string`,required:!0}},{key:`objective`,value:{name:`string`,required:!0}},{key:`vitals`,value:{name:`signature`,type:`object`,raw:`{
  heightCm: string;
  weightKg: string;
  hr: string;
  bpSys: string;
  bpDia: string;
  tempC: string;
  tempUnit: 'C' | 'F';
  spo2: string;
  breathing: string;
  painVas: number;
  fasting: string | null;
  vaccinationNote: string;
}`,signature:{properties:[{key:`heightCm`,value:{name:`string`,required:!0}},{key:`weightKg`,value:{name:`string`,required:!0}},{key:`hr`,value:{name:`string`,required:!0}},{key:`bpSys`,value:{name:`string`,required:!0}},{key:`bpDia`,value:{name:`string`,required:!0}},{key:`tempC`,value:{name:`string`,required:!0}},{key:`tempUnit`,value:{name:`union`,raw:`'C' | 'F'`,elements:[{name:`literal`,value:`'C'`},{name:`literal`,value:`'F'`}],required:!0}},{key:`spo2`,value:{name:`string`,required:!0}},{key:`breathing`,value:{name:`string`,required:!0}},{key:`painVas`,value:{name:`number`,required:!0}},{key:`fasting`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`vaccinationNote`,value:{name:`string`,required:!0}}]},required:!1}},{key:`diagnoses`,value:{name:`unknown`,required:!0}},{key:`plan`,value:{name:`string`,required:!0}},{key:`recordedBy`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`'draft' | 'signed'`,elements:[{name:`literal`,value:`'draft'`},{name:`literal`,value:`'signed'`}],required:!0}}]},required:!1}},{key:`indication`,value:{name:`signature`,type:`object`,raw:`{
  diagnosisId: string;
  code: string;
  label: string;
  certainty: DiagnosisCertainty;
}`,signature:{properties:[{key:`diagnosisId`,value:{name:`string`,required:!0}},{key:`code`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`certainty`,value:{name:`union`,raw:`'working' | 'confirmed' | 'ruled-out'`,elements:[{name:`literal`,value:`'working'`},{name:`literal`,value:`'confirmed'`},{name:`literal`,value:`'ruled-out'`}],required:!0}}]},required:!1}},{key:`orderedTestCount`,value:{name:`number`,required:!0}},{key:`payment`,value:{name:`union`,raw:`'none' | 'due' | 'paid' | 'deferred'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'due'`},{name:`literal`,value:`'paid'`},{name:`literal`,value:`'deferred'`}],required:!0}},{key:`sample`,value:{name:`union`,raw:`'none' | 'awaiting_collection' | 'collected' | 'received_at_lab'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'awaiting_collection'`},{name:`literal`,value:`'collected'`},{name:`literal`,value:`'received_at_lab'`}],required:!0}},{key:`result`,value:{name:`union`,raw:`'none' | 'pending' | 'released' | 'reviewed'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'pending'`},{name:`literal`,value:`'released'`},{name:`literal`,value:`'reviewed'`}],required:!0}},{key:`plan`,value:{name:`signature`,type:`object`,raw:`{
  id: string;
  patientId: string;
  title: string;
  status: CarePlanStatus;
  focuses: readonly ClinicalFocus[];
  goals: readonly Goal[];
  interventions: readonly Intervention[];
  monitoring: readonly MonitoringRule[];
  reviews: readonly CarePlanReview[];
  /** Cadence phrase for the next review, e.g. "3 months". */
  reviewCadence: string;
  /** Bumped once per signed change set, so a plan can be cited by version. */
  version: number;
  /** Required whenever the plan is paused. */
  holdReason?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`patientId`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`'draft' | 'active' | 'on-hold' | 'completed' | 'discontinued'`,elements:[{name:`literal`,value:`'draft'`},{name:`literal`,value:`'active'`},{name:`literal`,value:`'on-hold'`},{name:`literal`,value:`'completed'`},{name:`literal`,value:`'discontinued'`}],required:!0}},{key:`focuses`,value:{name:`unknown`,required:!0}},{key:`goals`,value:{name:`unknown`,required:!0}},{key:`interventions`,value:{name:`unknown`,required:!0}},{key:`monitoring`,value:{name:`unknown`,required:!0}},{key:`reviews`,value:{name:`unknown`,required:!0}},{key:`reviewCadence`,value:{name:`string`,required:!0},description:`Cadence phrase for the next review, e.g. "3 months".`},{key:`version`,value:{name:`number`,required:!0},description:`Bumped once per signed change set, so a plan can be cited by version.`},{key:`holdReason`,value:{name:`string`,required:!1},description:`Required whenever the plan is paused.`}]},required:!1}}]}},description:`Start the journey partway through, for stories that open on one phase.`}}}})),U,W,G,K,q,J,Y,X,Z,Q,$;t((()=>{re(),oe(),x(),Ce(),l(),{expect:U,userEvent:W,within:G}=__STORYBOOK_MODULE_TEST__,K=h(u.userId,u.displayName),q={title:`Clinic/Flows/First Patient Journey`,component:B,tags:[`autodocs`],parameters:{layout:`padded`,kura:{readiness:ie.journey,intake:{decision:`COMPOSE`,owner:`src/features/journey`,evidence:`Composes the canonical assessment, order cart and care-plan surfaces. The episode state machine is new: no prior Kura prototype held a patient across phases, which is why identity, money and specimen state drifted between screens.`,exclusions:[`Identity, collection and result release are compact operator steps here; their full surfaces are their own flows.`,`Payment, specimen and result are tracked on separate axes and are never inferred from one another.`,`Nothing is written to a backend, and the second half of the journey has no backend to write to.`]},composes:[`AssessmentWorkspace`,`CareLoopReview`,`CarePlanCard`,`Card`,`Badge`,`Button`]},docs:{description:{component:`One patient, one episode, first contact to care plan. The strip states which phase the episode is in, who acts next, and what is holding it up — the property that makes this a journey rather than six screens visited in order.`}}}},J={args:{initialEpisode:K},parameters:{docs:{description:{story:`Nothing has happened yet. The next step names reception or the doctor.`}}},play:async({canvasElement:e})=>{let t=G(e);await U(t.getByText(`Not identified`)).toBeVisible(),await U(t.getByText(`Verify the phone and open the patient record`)).toBeVisible(),await U(t.getByText(`No charge raised · No sample · No result`)).toBeVisible()}},Y={args:{initialEpisode:{...K,identity:`verified`,assessment:d,indication:{diagnosisId:`dx-anaemia`,code:`D50.9`,label:`Iron deficiency anaemia, unspecified`,certainty:`working`},orderedTestCount:10,payment:`paid`,sample:`awaiting_collection`}},parameters:{docs:{description:{story:`The state that trips people up: the patient has paid and no sample exists. The three axes are reported separately so nobody reads the receipt as evidence of a draw.`}}},play:async({canvasElement:e})=>{let t=G(e);await U(t.getByText(`Paid · Awaiting collection · No result`)).toBeVisible(),await U(t.getByText(`Draw the sample and confirm the tubes`)).toBeVisible()}},X={args:{initialEpisode:{...K,identity:`verified`,assessment:d,indication:{diagnosisId:`dx-anaemia`,code:`D50.9`,label:`Iron deficiency anaemia, unspecified`,certainty:`working`},orderedTestCount:10,payment:`paid`,sample:`collected`}},parameters:{docs:{description:{story:`A stopped episode still shows its next step, with the reason it cannot move. Hiding it would lose why the patient is waiting.`}}},play:async({canvasElement:e})=>{let t=G(e);await U(t.getByText(`Waiting: Samples have not reached the lab`)).toBeVisible()}},Z={args:{initialEpisode:K},parameters:{docs:{description:{story:`The full chain in one sitting: identify, assess, order, collect, result, and sign a plan whose next measurement is already scheduled. The same patient throughout — the demographics never change under the reader.`}}},play:async({canvasElement:e})=>{let t=G(e);await W.click(t.getByRole(`button`,{name:`Phone verified, open the record`})),await U(t.getByText(`Provisional`)).toBeVisible(),await W.type(t.getByLabelText(/Reason for visit/),`Tired for two weeks`),await W.type(t.getByLabelText(/Diagnosis or impression/),`Iron deficiency anaemia, unspecified`),await W.click(t.getByRole(`button`,{name:`Add diagnosis`})),await W.click(t.getByRole(`button`,{name:`Order tests`})),await U(t.getByText(/Ten baseline tests, ordered for D50.9/)).toBeVisible(),await W.click(t.getByRole(`button`,{name:`Send booking code`})),await U(t.getByText(`Payment due · Awaiting collection · No result`)).toBeVisible(),await W.click(t.getByRole(`button`,{name:`Payment taken, tubes drawn`})),await W.click(t.getByRole(`button`,{name:`Release results to the doctor`})),await U(t.getByText(`Paid · Received at lab · Released`)).toBeVisible(),await W.click(t.getByRole(`button`,{name:`Sign care plan`})),await U(t.getByRole(`heading`,{name:`D50.9 · Iron deficiency anaemia`})).toBeVisible(),await U(t.getByText(`32 y · M · MRN P-8842`)).toBeVisible()}},Q={args:{initialEpisode:K},parameters:{viewport:{defaultViewport:`kura320`}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    initialEpisode: start
  },
  parameters: {
    docs: {
      description: {
        story: 'Nothing has happened yet. The next step names reception or the doctor.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Not identified')).toBeVisible();
    await expect(canvas.getByText('Verify the phone and open the patient record')).toBeVisible();
    await expect(canvas.getByText('No charge raised · No sample · No result')).toBeVisible();
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    initialEpisode: {
      ...start,
      identity: 'verified',
      assessment: WORKED_UP_ENCOUNTER,
      indication: {
        diagnosisId: 'dx-anaemia',
        code: 'D50.9',
        label: 'Iron deficiency anaemia, unspecified',
        certainty: 'working'
      },
      orderedTestCount: 10,
      payment: 'paid',
      sample: 'awaiting_collection'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'The state that trips people up: the patient has paid and no sample exists. The three axes are reported separately so nobody reads the receipt as evidence of a draw.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Paid · Awaiting collection · No result')).toBeVisible();
    await expect(canvas.getByText('Draw the sample and confirm the tubes')).toBeVisible();
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    initialEpisode: {
      ...start,
      identity: 'verified',
      assessment: WORKED_UP_ENCOUNTER,
      indication: {
        diagnosisId: 'dx-anaemia',
        code: 'D50.9',
        label: 'Iron deficiency anaemia, unspecified',
        certainty: 'working'
      },
      orderedTestCount: 10,
      payment: 'paid',
      sample: 'collected'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'A stopped episode still shows its next step, with the reason it cannot move. Hiding it would lose why the patient is waiting.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Waiting: Samples have not reached the lab')).toBeVisible();
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    initialEpisode: start
  },
  parameters: {
    docs: {
      description: {
        story: 'The full chain in one sitting: identify, assess, order, collect, result, and sign a plan whose next measurement is already scheduled. The same patient throughout — the demographics never change under the reader.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Phone verified, open the record'
    }));
    await expect(canvas.getByText('Provisional')).toBeVisible();

    // Assessment: an order needs a reason, so one is recorded here.
    await userEvent.type(canvas.getByLabelText(/Reason for visit/), 'Tired for two weeks');
    await userEvent.type(canvas.getByLabelText(/Diagnosis or impression/), 'Iron deficiency anaemia, unspecified');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Add diagnosis'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Order tests'
    }));
    await expect(canvas.getByText(/Ten baseline tests, ordered for D50.9/)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send booking code'
    }));
    await expect(canvas.getByText('Payment due · Awaiting collection · No result')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Payment taken, tubes drawn'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Release results to the doctor'
    }));
    await expect(canvas.getByText('Paid · Received at lab · Released')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Sign care plan'
    }));
    await expect(canvas.getByRole('heading', {
      name: 'D50.9 · Iron deficiency anaemia'
    })).toBeVisible();
    await expect(canvas.getByText('32 y · M · MRN P-8842')).toBeVisible();
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    initialEpisode: start
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...Q.parameters?.docs?.source}}},$=[`FromTheBeginning`,`PaidButNotDrawn`,`StoppedWaitingOnTheLab`,`RunTheWholeJourney`,`Mobile320`]}))();export{J as FromTheBeginning,Q as Mobile320,Y as PaidButNotDrawn,Z as RunTheWholeJourney,X as StoppedWaitingOnTheLab,$ as __namedExportsOrder,q as default};