import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{t as i}from"./app-shell-dOUH8yca.js";import{r as a,t as o}from"./readiness-data-D41RGqZh.js";import{t as s}from"./app-shell-Bb-tldyu.js";import{d as c,p as l,v as u}from"./logic-CGFDdeX3.js";import{n as d,t as f}from"./vitals-form-B1wk1Eqg.js";import{i as p,n as m,r as h,t as g}from"./scan-gate-K7TDwbHJ.js";import{i as _,n as v,r as y,t as b}from"./demo-data-BPDPlpxo.js";function x({patient:e,initialNow:t=b}){let[n,r]=(0,C.useState)(e.samples),[i,a]=(0,C.useState)(!1),[o,s]=(0,C.useState)(null);return i?(0,S.jsxs)(`div`,{role:`status`,style:{padding:`var(--space-8)`,textAlign:`center`},children:[`Collection complete for `,e.name,` — next patient.`]}):(0,S.jsxs)(`div`,{style:{display:`grid`,gap:`var(--space-3)`},children:[o?(0,S.jsx)(`div`,{"aria-live":`polite`,role:`status`,style:{fontSize:`var(--type-xs)`,color:`var(--color-text-tertiary)`},children:o}):null,(0,S.jsx)(h,{now:t,onMarkVitalsDone:()=>s(`Vitals marked done at another booth`),onNotify:(e,t)=>s(`${e}: ${t}`),onSaveDraft:()=>s(`Draft saved — patient stays in queue`),onSubmit:()=>a(!0),onUpdateSamples:r,operatorName:v,patient:e,samples:n})]})}var S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H;t((()=>{S=r(),C=e(n()),s(),p(),_(),c(),m(),d(),a(),{expect:w,userEvent:T,waitFor:E,within:D}=__STORYBOOK_MODULE_TEST__,O=l(y,`phlebotomy`),k=l(y,`vitals`),A=y[0],j={title:`Clinic/Collection/Draw Worksheet`,component:h,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`padded`,kura:{readiness:o.collection,intake:{decision:`CREATE (flow) + COMPOSE (primitives)`,owner:`src/features/collection`,evidence:`ReUI searched: no scan-gate/queue/checklist/tube equivalents (0 results). Flow and rules ported from the validated phlebo prototype census; composed from canonical Input, Checkbox, Select, SegmentedToggle, Table, Badge, Button, Alert, AlertDialog.`,governanceDeltas:[`Safety checklist now GATES collect actions (legacy rendered it but never read it).`,`Collect/reset field writes unified across worksheet and inspector (legacy drifted).`,`Escape-clear on scan fields actually implemented (legacy advertised it without a handler).`,`Sample status vocabulary aligned to canonical enums; deferred is a booth-local workflow state.`]},journeys:[`collection-scan-gate`,`collection-draw`,`collection-defer`,`collection-handoff`]},docs:{description:{component:`Phlebotomy worksheet for collection mode: pre-draw safety checklist gates collection, tubes sort by CLSI order of draw, clot clocks run per tube, inversions must be confirmed or explicitly overridden, and every tube must be resolved before handoff.`}}}},M={args:{patient:A,samples:A.samples,onUpdateSamples:()=>{},onSubmit:()=>{},onSaveDraft:()=>{},onMarkVitalsDone:()=>{},now:b,operatorName:v},render:()=>(0,S.jsx)(x,{patient:A})},N={args:M.args,render:()=>(0,S.jsx)(x,{patient:A}),play:async({canvasElement:e})=>{let t=D(e),n=t.getAllByRole(`button`,{name:`Collect`});for(let e of n)await w(e).toBeDisabled();for(let e of[`Patient ID confirmed`,`Fasting status checked`,`Allergies reviewed`,`Patient consented`,`Site confirmed (L/R arm)`])await T.click(t.getByRole(`checkbox`,{name:e}));await E(async()=>{let e=t.getAllByRole(`button`,{name:`Collect`});await w(e[0]).toBeEnabled()}),await T.click(t.getAllByRole(`button`,{name:`Collect`})[0]),await w(await t.findByText(/1\/3 collected/)).toBeVisible()}},P={args:M.args,render:()=>(0,S.jsx)(x,{patient:y[1]}),play:async({canvasElement:e})=>{let t=D(e);await w(t.getByText(`Vital signs not yet recorded`)).toBeVisible(),await T.click(t.getByRole(`button`,{name:`Continue anyway`})),await E(async()=>{await w(t.queryByText(`Vital signs not yet recorded`)).not.toBeInTheDocument()})}},F={args:M.args,render:()=>(0,S.jsx)(x,{initialNow:b+240*1e3,patient:y[2]}),play:async({canvasElement:e})=>{let t=D(e);await w(t.getByText(`08:00`)).toBeVisible()}},I={args:M.args,render:()=>(0,S.jsx)(x,{patient:A}),play:async()=>{let e={id:!0,fasting:!0,allergy:!0,consent:!0,site:!0},t=A.samples.map(e=>({...e,status:`collected`,collectedAtMs:b,inverted:!1})),n=u(t,{...e,id:!1},!1);await w(n.canSubmit).toBe(!1);let r=u(t,e,!1);await w(r.inversionsBlocking).toBe(3),await w(r.canSubmit).toBe(!1);let i=u(t,e,!0);await w(i.canSubmit).toBe(!0);let a=t.map(e=>({...e,inverted:!0}));await w(u(a,e,!1).canSubmit).toBe(!0)}},L={args:M.args,parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,S.jsx)(x,{patient:A})},R={args:M.args,render:function(){let[e,t]=(0,C.useState)(null);return e?(0,S.jsxs)(`div`,{role:`status`,style:{padding:`var(--space-6)`,textAlign:`center`},children:[`Loaded `,e.name,` (`,e.pid,`)`]}):(0,S.jsx)(g,{onMatch:t,queue:O,role:`phlebotomy`})},play:async({canvasElement:e})=>{let t=D(e),n=t.getByLabelText(`Patient ID`);await w(n).toHaveFocus(),await T.type(n,`P999999{Enter}`),await w(await t.findByText(/No patient for "P999999"/)).toBeVisible(),await T.clear(n),await T.type(n,`p104481{Enter}`),await w(await e.ownerDocument.body).toHaveTextContent(`Loaded Sokha Chan (P104481)`)}},z={args:M.args,render:()=>(0,S.jsx)(g,{onMatch:()=>{},queue:O,role:`phlebotomy`}),play:async({canvasElement:e})=>{let t=D(e);await T.click(t.getByRole(`button`,{name:/Browse queue/})),await w(t.getByText(`Vibol Keo`)).toBeVisible(),await w(t.getByText(`78 min`)).toBeVisible()}},B={args:M.args,render:function(){let[e,t]=(0,C.useState)(!1),n=k[0];return e?(0,S.jsxs)(`div`,{role:`status`,style:{padding:`var(--space-6)`,textAlign:`center`},children:[`Vitals recorded for `,n.name,` — ready for phlebotomy.`]}):(0,S.jsx)(f,{onSubmit:()=>t(!0),patientId:n.id})},play:async({canvasElement:e})=>{let t=D(e),n=t.getByRole(`button`,{name:`Submit & next patient`});await w(n).toBeDisabled(),await T.type(t.getByLabelText(/Height/),`158`),await T.type(t.getByLabelText(/Weight/),`52`),await T.type(t.getByLabelText(/Heart rate/),`260`),await T.type(t.getByLabelText(/BP systolic/),`118`),await T.type(t.getByLabelText(/BP diastolic/),`76`),await w(await t.findByText(/Outside typical range \(30–250 bpm\)/)).toBeVisible(),await w(n).toBeDisabled(),await T.click(t.getByRole(`checkbox`,{name:/Confirm abnormal values/})),await w(n).toBeEnabled(),await w(t.getByText(`20.8`)).toBeVisible(),await w(t.getByText(`Normal`)).toBeVisible()}},V={args:M.args,parameters:{layout:`fullscreen`},render:function(){let[e,t]=(0,C.useState)(null),[n,r]=(0,C.useState)([]),[a,o]=(0,C.useState)(null);return(0,S.jsx)(i,{activeKey:`scan-gate`,availableModes:[`front-desk`,`collection`],mode:`collection`,onNavigate:()=>{},posture:`station`,station:{id:`PSC-01`,role:`phlebotomy`,shift:`morning`},user:{name:v,email:`neang@mekong.clinic`,licenceVerified:!1},workspace:{id:`ws-mekong`,name:`Mekong Clinic`},children:a?(0,S.jsx)(`div`,{role:`status`,style:{padding:`var(--space-8)`,textAlign:`center`},children:a}):e?(0,S.jsx)(h,{now:b,onMarkVitalsDone:()=>{},onSaveDraft:()=>{t(null)},onSubmit:()=>o(`Collection complete for ${e.name}`),onUpdateSamples:r,operatorName:v,patient:e,samples:n}):(0,S.jsx)(g,{onMatch:e=>{t(e),r(e.samples)},queue:O,role:`phlebotomy`})})},play:async({canvasElement:e})=>{let t=D(e);await w(t.getByText(`Station PSC-01`)).toBeVisible();let n=t.getByLabelText(`Patient ID`);await T.type(n,`P104481{Enter}`),await w(await t.findByText(`Before the draw`)).toBeVisible()}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    patient: readyPatient,
    samples: readyPatient.samples,
    onUpdateSamples: () => {},
    onSubmit: () => {},
    onSaveDraft: () => {},
    onMarkVitalsDone: () => {},
    now: DEMO_NOW,
    operatorName: DEMO_OPERATOR
  },
  render: () => <WorksheetPlayground patient={readyPatient} />
}`,...M.parameters?.docs?.source},description:{story:`Vitals done, three tubes awaiting — the normal start of a draw.`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  render: () => <WorksheetPlayground patient={readyPatient} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const collectButtons = canvas.getAllByRole('button', {
      name: 'Collect'
    });
    for (const button of collectButtons) {
      await expect(button).toBeDisabled();
    }
    for (const label of ['Patient ID confirmed', 'Fasting status checked', 'Allergies reviewed', 'Patient consented', 'Site confirmed (L/R arm)']) {
      await userEvent.click(canvas.getByRole('checkbox', {
        name: label
      }));
    }
    await waitFor(async () => {
      const enabled = canvas.getAllByRole('button', {
        name: 'Collect'
      });
      await expect(enabled[0]).toBeEnabled();
    });
    await userEvent.click(canvas.getAllByRole('button', {
      name: 'Collect'
    })[0]);
    await expect(await canvas.findByText(/1\\/3 collected/)).toBeVisible();
  }
}`,...N.parameters?.docs?.source},description:{story:`The checklist gate: collect actions stay disabled until all five safety
items are confirmed — the deliberate improvement over the legacy prototype.`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  render: () => <WorksheetPlayground patient={DEMO_QUEUE[1]} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Vital signs not yet recorded')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Continue anyway'
    }));
    await waitFor(async () => {
      await expect(canvas.queryByText('Vital signs not yet recorded')).not.toBeInTheDocument();
    });
  }
}`,...P.parameters?.docs?.source},description:{story:`Vitals skipped upstream — warning banner with the two legacy paths.`,...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  render: () => <WorksheetPlayground initialNow={DEMO_NOW + 4 * 60 * 1000} patient={DEMO_QUEUE[2]} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('08:00')).toBeVisible();
  }
}`,...F.parameters?.docs?.source},description:{story:`Clot clock. The SST was drawn 18 minutes into a 30-minute limit, so the
station is viewed 4 minutes later to sit inside the 10-minute warning band —
the point at which the tone changes is the thing worth proving.`,...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  render: () => <WorksheetPlayground patient={readyPatient} />,
  play: async () => {
    const checksDone = {
      id: true,
      fasting: true,
      allergy: true,
      consent: true,
      site: true
    };
    const collected = readyPatient.samples.map(sample => ({
      ...sample,
      status: 'collected' as const,
      collectedAtMs: DEMO_NOW,
      inverted: false
    }));
    const blockedByChecklist = submitGate(collected, {
      ...checksDone,
      id: false
    }, false);
    await expect(blockedByChecklist.canSubmit).toBe(false);
    const blockedByInversion = submitGate(collected, checksDone, false);
    await expect(blockedByInversion.inversionsBlocking).toBe(3);
    await expect(blockedByInversion.canSubmit).toBe(false);
    const overridden = submitGate(collected, checksDone, true);
    await expect(overridden.canSubmit).toBe(true);
    const inverted = collected.map(sample => ({
      ...sample,
      inverted: true
    }));
    await expect(submitGate(inverted, checksDone, false).canSubmit).toBe(true);
  }
}`,...I.parameters?.docs?.source},description:{story:`Submit gate math, asserted directly on the pure rule.`,...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <WorksheetPlayground patient={readyPatient} />
}`,...L.parameters?.docs?.source},description:{story:`Mobile: rail stacks above the table; wide rows scroll inside the table.`,...L.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  render: function ScanGateStory() {
    const [loaded, setLoaded] = useState<CollectionPatient | null>(null);
    if (loaded) {
      return <div role="status" style={{
        padding: 'var(--space-6)',
        textAlign: 'center'
      }}>
          Loaded {loaded.name} ({loaded.pid})
        </div>;
    }
    return <ScanGate onMatch={setLoaded} queue={phleboQueue} role="phlebotomy" />;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Patient ID');
    await expect(input).toHaveFocus();
    await userEvent.type(input, 'P999999{Enter}');
    await expect(await canvas.findByText(/No patient for "P999999"/)).toBeVisible();
    await userEvent.clear(input);
    await userEvent.type(input, 'p104481{Enter}');
    await expect(await canvasElement.ownerDocument.body).toHaveTextContent('Loaded Sokha Chan (P104481)');
  }
}`,...R.parameters?.docs?.source},description:{story:`Station entry: scanner owns focus; queue is the fallback, not the default.`,...R.parameters?.docs?.description}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  render: () => <ScanGate onMatch={() => {}} queue={phleboQueue} role="phlebotomy" />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: /Browse queue/
    }));
    await expect(canvas.getByText('Vibol Keo')).toBeVisible();
    await expect(canvas.getByText('78 min')).toBeVisible();
  }
}`,...z.parameters?.docs?.source},description:{story:`Queue fallback with wait-tone escalation (>30 warn, >60 danger).`,...z.parameters?.docs?.description}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  render: function VitalsStory() {
    const [done, setDone] = useState(false);
    const patient = vitalsQueue[0];
    if (done) {
      return <div role="status" style={{
        padding: 'var(--space-6)',
        textAlign: 'center'
      }}>
          Vitals recorded for {patient.name} — ready for phlebotomy.
        </div>;
    }
    return <VitalsForm onSubmit={() => setDone(true)} patientId={patient.id} />;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const submit = canvas.getByRole('button', {
      name: 'Submit & next patient'
    });
    await expect(submit).toBeDisabled();
    await userEvent.type(canvas.getByLabelText(/Height/), '158');
    await userEvent.type(canvas.getByLabelText(/Weight/), '52');
    await userEvent.type(canvas.getByLabelText(/Heart rate/), '260');
    await userEvent.type(canvas.getByLabelText(/BP systolic/), '118');
    await userEvent.type(canvas.getByLabelText(/BP diastolic/), '76');
    await expect(await canvas.findByText(/Outside typical range \\(30–250 bpm\\)/)).toBeVisible();
    await expect(submit).toBeDisabled();
    await userEvent.click(canvas.getByRole('checkbox', {
      name: /Confirm abnormal values/
    }));
    await expect(submit).toBeEnabled();
    await expect(canvas.getByText('20.8')).toBeVisible();
    await expect(canvas.getByText('Normal')).toBeVisible();
  }
}`,...B.parameters?.docs?.source},description:{story:`Vitals station: required fields, BMI auto, abnormal-confirm gate.`,...B.parameters?.docs?.description}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  parameters: {
    layout: 'fullscreen'
  },
  render: function ShellFlow() {
    const [patient, setPatient] = useState<CollectionPatient | null>(null);
    const [samples, setSamples] = useState<Sample[]>([]);
    const [done, setDone] = useState<string | null>(null);
    return <AppShell activeKey="scan-gate" availableModes={['front-desk', 'collection']} mode="collection" onNavigate={() => {}} posture="station" station={{
      id: 'PSC-01',
      role: 'phlebotomy',
      shift: 'morning'
    }} user={{
      name: DEMO_OPERATOR,
      email: 'neang@mekong.clinic',
      licenceVerified: false
    }} workspace={{
      id: 'ws-mekong',
      name: 'Mekong Clinic'
    }}>
        {done ? <div role="status" style={{
        padding: 'var(--space-8)',
        textAlign: 'center'
      }}>
            {done}
          </div> : patient ? <DrawWorksheet now={DEMO_NOW} onMarkVitalsDone={() => {}} onSaveDraft={() => {
        setPatient(null);
      }} onSubmit={() => setDone(\`Collection complete for \${patient.name}\`)} onUpdateSamples={setSamples} operatorName={DEMO_OPERATOR} patient={patient} samples={samples} /> : <ScanGate onMatch={match => {
        setPatient(match);
        setSamples(match.samples);
      }} queue={phleboQueue} role="phlebotomy" />}
      </AppShell>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Station PSC-01')).toBeVisible();
    const input = canvas.getByLabelText('Patient ID');
    await userEvent.type(input, 'P104481{Enter}');
    await expect(await canvas.findByText('Before the draw')).toBeVisible();
  }
}`,...V.parameters?.docs?.source},description:{story:`The collection mode end-to-end: station shell → scan → worksheet.`,...V.parameters?.docs?.description}}},H=[`Default`,`ChecklistGatesCollection`,`VitalsMissingWarning`,`ClotClockRunning`,`SubmitGateRules`,`Mobile`,`StationScanGate`,`ScanGateBrowseQueue`,`VitalsCapture`,`CollectionModeInShell`]}))();export{N as ChecklistGatesCollection,F as ClotClockRunning,V as CollectionModeInShell,M as Default,L as Mobile,z as ScanGateBrowseQueue,R as StationScanGate,I as SubmitGateRules,B as VitalsCapture,P as VitalsMissingWarning,H as __namedExportsOrder,j as default};