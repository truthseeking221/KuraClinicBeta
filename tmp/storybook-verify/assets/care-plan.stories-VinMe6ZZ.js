import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{r as i,t as a}from"./readiness-data-D41RGqZh.js";import{a as o,c as s,d as c,f as l,i as u,l as d,m as f,n as p,o as m,p as h,r as g,s as _,t as v,u as y}from"./demo-data-CJynsz0s.js";var b,x,S,C,w,T,E,D,O,k,A,j,M,N;t((()=>{b=r(),x=e(n()),i(),d(),_(),o(),l(),{expect:S,userEvent:C,within:w}=__STORYBOOK_MODULE_TEST__,T={title:`Clinic/Clinical/Care plan`,component:m,tags:[`autodocs`],args:{plan:u},parameters:{layout:`padded`,kura:{readiness:a.carePlan,intake:{decision:`CREATE`,owner:`src/features/care-plan`,evidence:`Ported in shape from the frozen FINAL DCM care-plan domain, whose focus/goal/intervention/monitoring spine and evidence rule are sound. Its status machine was nine unguarded setters and was rebuilt here as a transition table.`,exclusions:[`The plan status machine is rebuilt, not ported: the source could move any status to any other.`,`Cadences stay human phrases and are never turned into calendar dates, so a plan renders identically every time.`,`No backend exists for any of this; the platform excludes care plans from v1.`]},composes:[`Card`,`Badge`,`Button`,`Checkbox`]},docs:{description:{component:`Where the journey stops being a transaction. A plan holds one thread per clinical focus, each with its goal, its steps, and what it is waiting on. A step that ordered a test cannot be ticked off by hand — it closes when the result exists, or when someone records why it never will.`}}}},E={args:{plan:g},parameters:{docs:{description:{story:`Honest empty state: a plan is something a finding earns, not a container every patient starts with.`}}},play:async({canvasElement:e})=>{let t=w(e);await S(t.getByText(/No care plan yet/)).toBeVisible()}},D={parameters:{docs:{description:{story:`One focus, its goal off target, one step waiting on its repeat result.`}}},play:async({canvasElement:e})=>{let t=w(e);await S(t.getByRole(`heading`,{name:`D50.9 · Iron deficiency anaemia`})).toBeVisible(),await S(t.getByText(`Off target`)).toBeVisible(),await S(t.getByText(`Waiting on the result. Record an exception if it will never arrive.`)).toBeVisible()}},O={parameters:{docs:{description:{story:`The safety rule made visible: the repeat test cannot be marked done while no result exists, and the reason sits beside the step rather than inside a tooltip.`}}},play:async({canvasElement:e})=>{let t=w(e).getByText(`Repeat ferritin and full blood count`).closest(`li`),n=w(t);await S(n.getByRole(`button`,{name:`Mark done`})).toBeDisabled(),await S(n.getByRole(`button`,{name:`Record exception`})).toBeEnabled()}},k={parameters:{docs:{description:{story:`Once the repeat result is attached the step can close normally.`}}},render:function(){let[e,t]=(0,x.useState)(u);return(0,b.jsxs)(`div`,{style:{display:`grid`,gap:`var(--space-4)`},children:[(0,b.jsx)(`button`,{onClick:()=>t(e=>({...e,interventions:e.interventions.map(e=>e.id===`iv-repeat`?y(e,`Ferritin 42 µg/L · 21 Oct 2026`):e)})),type:`button`,children:`Simulate repeat result returning`}),(0,b.jsx)(m,{onCompleteIntervention:e=>t(t=>({...t,interventions:t.interventions.map(t=>{if(t.id!==e)return t;let n=c(t);return n.ok?n.intervention:t})})),plan:e})]})},play:async({canvasElement:e})=>{let t=w(e);await C.click(t.getByRole(`button`,{name:`Simulate repeat result returning`})),await S(t.getByText(`Result: Ferritin 42 µg/L · 21 Oct 2026`)).toBeVisible();let n=t.getByText(`Repeat ferritin and full blood count`).closest(`li`),r=w(n);await C.click(r.getByRole(`button`,{name:`Mark done`})),await S(r.getByText(`Complete`)).toBeVisible()}},A={parameters:{docs:{description:{story:`A result that will never arrive still closes the step — but the plan records why, so a later reader is not left guessing.`}}},args:{plan:{...u,interventions:u.interventions.map(e=>e.id===`iv-repeat`?h(e,{reason:`Patient moved abroad before the repeat draw`,recordedBy:`Dr. Sok Vanna`}):e)}},play:async({canvasElement:e})=>{let t=w(e);await S(t.getByText(`Closed without a result: Patient moved abroad before the repeat draw`)).toBeVisible()}},j={name:`Care loop · draft review and signing`,parameters:{docs:{description:{story:`The result that closes the first visit opens the next one. The diagnosis, goal and repeat test are the spine of the answer and always commit; medicine, follow-up and patient advice are the doctor’s to keep or drop.`}}},render:function(){let[e,t]=(0,x.useState)(g),[n,r]=(0,x.useState)(!1);return n?(0,b.jsx)(m,{plan:e}):(0,b.jsx)(s,{anchorLabel:p,draft:v,onSign:e=>{t(t=>f(t,v,e,`Dr. Sok Vanna`,p)),r(!0)},plan:e,signedBy:`Dr. Sok Vanna`})},play:async({canvasElement:e})=>{let t=w(e);await S(t.getAllByText(`Always included`)).toHaveLength(3),await S(t.getByText(/6 items · next review 3 months from 20 Jul 2026/)).toBeVisible(),await C.click(t.getByRole(`checkbox`,{name:`Include Ferrous sulfate 200 mg`})),await S(t.getByText(/5 items · next review/)).toBeVisible(),await C.click(t.getByRole(`button`,{name:`Sign care plan`})),await S(t.getByRole(`heading`,{name:`D50.9 · Iron deficiency anaemia`})).toBeVisible();let n=w(t.getByRole(`list`,{name:`Steps for Iron deficiency anaemia`})).getByText(`Repeat ferritin and full blood count`).closest(`li`);await S(w(n).getByText(/3 months \(from 20 Jul 2026\)/)).toBeVisible()}},M={parameters:{viewport:{defaultViewport:`kura320`}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    plan: EMPTY_PLAN
  },
  parameters: {
    docs: {
      description: {
        story: 'Honest empty state: a plan is something a finding earns, not a container every patient starts with.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/No care plan yet/)).toBeVisible();
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'One focus, its goal off target, one step waiting on its repeat result.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'D50.9 · Iron deficiency anaemia'
    })).toBeVisible();
    await expect(canvas.getByText('Off target')).toBeVisible();
    await expect(canvas.getByText('Waiting on the result. Record an exception if it will never arrive.')).toBeVisible();
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'The safety rule made visible: the repeat test cannot be marked done while no result exists, and the reason sits beside the step rather than inside a tooltip.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const repeatStep = canvas.getByText('Repeat ferritin and full blood count').closest('li');
    const scope = within(repeatStep as HTMLElement);
    await expect(scope.getByRole('button', {
      name: 'Mark done'
    })).toBeDisabled();
    await expect(scope.getByRole('button', {
      name: 'Record exception'
    })).toBeEnabled();
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Once the repeat result is attached the step can close normally.'
      }
    }
  },
  render: function EvidenceHarness() {
    const [plan, setPlan] = useState<CarePlan>(RUNNING_PLAN);
    const attach = () => setPlan(current => ({
      ...current,
      interventions: current.interventions.map(iv => iv.id === 'iv-repeat' ? attachEvidence(iv, 'Ferritin 42 µg/L · 21 Oct 2026') : iv)
    }));
    const complete = (id: string) => setPlan(current => ({
      ...current,
      interventions: current.interventions.map(iv => {
        if (iv.id !== id) return iv;
        const done = completeIntervention(iv);
        return done.ok ? done.intervention : iv;
      })
    }));
    return <div style={{
      display: 'grid',
      gap: 'var(--space-4)'
    }}>
        <button onClick={attach} type="button">
          Simulate repeat result returning
        </button>
        <CarePlanCard onCompleteIntervention={complete} plan={plan} />
      </div>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Simulate repeat result returning'
    }));
    await expect(canvas.getByText('Result: Ferritin 42 µg/L · 21 Oct 2026')).toBeVisible();
    const repeatStep = canvas.getByText('Repeat ferritin and full blood count').closest('li');
    const scope = within(repeatStep as HTMLElement);
    await userEvent.click(scope.getByRole('button', {
      name: 'Mark done'
    }));
    await expect(scope.getByText('Complete')).toBeVisible();
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'A result that will never arrive still closes the step — but the plan records why, so a later reader is not left guessing.'
      }
    }
  },
  args: {
    plan: {
      ...RUNNING_PLAN,
      interventions: RUNNING_PLAN.interventions.map(iv => iv.id === 'iv-repeat' ? recordException(iv, {
        reason: 'Patient moved abroad before the repeat draw',
        recordedBy: 'Dr. Sok Vanna'
      }) : iv)
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Closed without a result: Patient moved abroad before the repeat draw')).toBeVisible();
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Care loop · draft review and signing',
  parameters: {
    docs: {
      description: {
        story: 'The result that closes the first visit opens the next one. The diagnosis, goal and repeat test are the spine of the answer and always commit; medicine, follow-up and patient advice are the doctor’s to keep or drop.'
      }
    }
  },
  render: function LoopHarness() {
    const [plan, setPlan] = useState<CarePlan>(EMPTY_PLAN);
    const [signed, setSigned] = useState(false);
    if (signed) return <CarePlanCard plan={plan} />;
    return <CareLoopReview anchorLabel={DEMO_ANCHOR} draft={ANAEMIA_LOOP_DRAFT} onSign={kept => {
      setPlan(current => signCareLoop(current, ANAEMIA_LOOP_DRAFT, kept, 'Dr. Sok Vanna', DEMO_ANCHOR));
      setSigned(true);
    }} plan={plan} signedBy="Dr. Sok Vanna" />;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText('Always included')).toHaveLength(3);
    await expect(canvas.getByText(/6 items · next review 3 months from 20 Jul 2026/)).toBeVisible();
    await userEvent.click(canvas.getByRole('checkbox', {
      name: 'Include Ferrous sulfate 200 mg'
    }));
    await expect(canvas.getByText(/5 items · next review/)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Sign care plan'
    }));
    await expect(canvas.getByRole('heading', {
      name: 'D50.9 · Iron deficiency anaemia'
    })).toBeVisible();

    // The repeat test arrives scheduled, which is what makes this a loop
    // rather than a closed visit.
    const steps = within(canvas.getByRole('list', {
      name: 'Steps for Iron deficiency anaemia'
    }));
    const repeatStep = steps.getByText('Repeat ferritin and full blood count').closest('li');
    await expect(within(repeatStep as HTMLElement).getByText(/3 months \\(from 20 Jul 2026\\)/)).toBeVisible();
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...M.parameters?.docs?.source}}},N=[`NoPlanYet`,`Running`,`LabStepBlockedWithoutEvidence`,`EvidenceArrivesThenCompletes`,`ClosedByException`,`CareLoopDraftReview`,`Mobile320`]}))();export{j as CareLoopDraftReview,A as ClosedByException,k as EvidenceArrivesThenCompletes,O as LabStepBlockedWithoutEvidence,M as Mobile320,E as NoPlanYet,D as Running,N as __namedExportsOrder,T as default};