import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{c as n,f as r,i,m as a,n as o,p as s,r as c,y as l}from"./storybook-metadata-CwrABL_1.js";import{n as u,t as d}from"./prescribe-rail-CN4AppeL.js";import{n as f,t as p}from"./prescribe-rail.stories.module-CnuPCpQf.js";var m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;e((()=>{m=t(),u(),l(),c(),p(),{expect:h,fn:g,userEvent:_,within:v}=__STORYBOOK_MODULE_TEST__,y={title:`Clinic/Clinical/Patients/Prescribing/Medication Draft`,component:d,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:o,docs:{description:{component:`Medication review comes first. Once every current-medication decision is drafted, the rail reveals new-medication work and any AI proposals; it returns an unsigned local draft without implying a prescription.`}}},args:{patientName:`Sok Nimol`,diagnoses:i,needsReview:n,suggestions:a,settled:s,searchPool:r,onBack:g(),onComplete:g()},decorators:[e=>(0,m.jsx)(`div`,{className:f.frame,children:(0,m.jsx)(e,{})})]},b={play:async({canvasElement:e})=>{let t=v(e);await h(t.getByRole(`heading`,{name:`Medication review`})).toBeVisible(),await h(t.queryByRole(`heading`,{name:`New medications`})).not.toBeInTheDocument(),await h(t.queryByRole(`button`,{name:`Add medication`})).not.toBeInTheDocument(),await h(t.queryByRole(`button`,{name:`Finish review`})).not.toBeInTheDocument()}},x={tags:[`play-fn`],play:async({args:e,canvasElement:t})=>{let n=v(t);await h(n.queryByRole(`button`,{name:`Finish review`})).not.toBeInTheDocument(),await h(n.queryByRole(`button`,{name:`Add medication`})).not.toBeInTheDocument(),await _.click(n.getByRole(`button`,{name:/Metformin/})),await _.click(n.getByRole(`button`,{name:`Stop`})),await h(n.getByText(`Draft · stop`)).toBeVisible(),await h(n.getByText(`Metformin`)).toBeVisible(),await _.click(n.getByRole(`button`,{name:/Lisinopril/})),await _.click(n.getByRole(`button`,{name:`Keep`})),await h(n.getByText(`Draft · keep current`)).toBeVisible(),await h(n.getByRole(`button`,{name:`Add medication`})).toBeEnabled(),await _.click(n.getByRole(`button`,{name:`Finish review`})),await h(e.onComplete).toHaveBeenCalledWith(h.objectContaining({decisions:h.objectContaining({"med-metformin":h.objectContaining({decision:`stop`}),"med-lisinopril":h.objectContaining({decision:`keep`})})}))}},S={tags:[`play-fn`],play:async({canvasElement:e})=>{let t=v(e);await _.click(t.getByRole(`button`,{name:/Metformin/})),await _.click(t.getByRole(`button`,{name:`Adjust`})),await _.click(t.getByRole(`radio`,{name:`500 mg`})),await _.click(t.getByRole(`radio`,{name:`once daily`})),await _.click(t.getByRole(`button`,{name:`Save adjustment`})),await h(t.getByText(`Draft · adjust`)).toBeVisible(),await h(t.getByText(`500 mg · once daily`)).toBeVisible()}},C={args:{needsReview:[]},tags:[`play-fn`],play:async({canvasElement:e})=>{let t=v(e),n=t.getByRole(`region`,{name:`AI suggestions`});await _.click(v(n).getAllByRole(`button`,{name:`Add to draft`})[0]),await h(t.getByText(`Draft additions`)).toBeVisible(),await h(t.getByText(`AI suggestion`)).toBeVisible(),await h(t.getAllByText(`Calcium acetate`)).toHaveLength(2)}},w={args:{needsReview:[]},tags:[`play-fn`],play:async({canvasElement:e})=>{let t=v(e);await _.click(t.getByRole(`button`,{name:`Add medication`}));let n=t.getByRole(`searchbox`,{name:`Search medications`});await _.type(n,`ator`),await _.click(t.getByRole(`button`,{name:`Add to draft`})),await _.click(t.getByRole(`button`,{name:`Back to medication draft`})),await h(t.getByText(`Draft additions`)).toBeVisible(),await h(t.getByText(`Atorvastatin`)).toBeVisible()}},T={args:{diagnoses:[],onAddDiagnosis:g()},tags:[`play-fn`],play:async({canvasElement:e})=>{let t=v(e);await h(t.queryByRole(`button`,{name:`Add medication`})).not.toBeInTheDocument(),await h(t.queryByRole(`button`,{name:`Finish review`})).not.toBeInTheDocument(),await h(t.getByText(`Add a diagnosis before reviewing this medication draft.`)).toBeVisible()}},E={args:{initialDraft:{decisions:{"med-metformin":{decision:`adjust`,dose:`500 mg`,frequency:`once daily`}},additions:[{id:`srch-atorvastatin`,drug:`Atorvastatin`,dose:`20 mg tablet`,source:`formulary`}]}}},D={args:{needsReview:[],settled:[],suggestions:[]}},O={args:{patientName:`Sokha Monirath Chann very long registry display name`,diagnoses:[{code:`E11.65`,label:`Type 2 diabetes mellitus with hyperglycaemia and a long clinical label`,evidence:`HbA1c 8.9% · verified 21 May 2026 · repeat result pending`}]}},k={globals:{viewport:{value:`kura320`}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Medication review'
    })).toBeVisible();
    await expect(canvas.queryByRole('heading', {
      name: 'New medications'
    })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('button', {
      name: 'Add medication'
    })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('button', {
      name: 'Finish review'
    })).not.toBeInTheDocument();
  }
}`,...b.parameters?.docs?.source},description:{story:`Review work appears first; new medication work is revealed only once the regimen is resolved.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  tags: ['play-fn'],
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('button', {
      name: 'Finish review'
    })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('button', {
      name: 'Add medication'
    })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: /Metformin/
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Stop'
    }));
    await expect(canvas.getByText('Draft · stop')).toBeVisible();
    await expect(canvas.getByText('Metformin')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: /Lisinopril/
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Keep'
    }));
    await expect(canvas.getByText('Draft · keep current')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Add medication'
    })).toBeEnabled();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Finish review'
    }));
    await expect(args.onComplete).toHaveBeenCalledWith(expect.objectContaining({
      decisions: expect.objectContaining({
        'med-metformin': expect.objectContaining({
          decision: 'stop'
        }),
        'med-lisinopril': expect.objectContaining({
          decision: 'keep'
        })
      })
    }));
  }
}`,...x.parameters?.docs?.source},description:{story:`Decisions update in place; the reviewed draft is returned without signing anything.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: /Metformin/
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Adjust'
    }));
    await userEvent.click(canvas.getByRole('radio', {
      name: '500 mg'
    }));
    await userEvent.click(canvas.getByRole('radio', {
      name: 'once daily'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Save adjustment'
    }));
    await expect(canvas.getByText('Draft · adjust')).toBeVisible();
    await expect(canvas.getByText('500 mg · once daily')).toBeVisible();
  }
}`,...S.parameters?.docs?.source},description:{story:`Adjust opens the inline dose editor and keeps the medication in place.`,...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    needsReview: []
  },
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const aiRegion = canvas.getByRole('region', {
      name: 'AI suggestions'
    });
    await userEvent.click(within(aiRegion).getAllByRole('button', {
      name: 'Add to draft'
    })[0]);
    await expect(canvas.getByText('Draft additions')).toBeVisible();
    await expect(canvas.getByText('AI suggestion')).toBeVisible();
    await expect(canvas.getAllByText('Calcium acetate')).toHaveLength(2);
  }
}`,...C.parameters?.docs?.source},description:{story:`An AI proposal enters the same visible draft-additions group with provenance intact.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    needsReview: []
  },
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Add medication'
    }));
    const input = canvas.getByRole('searchbox', {
      name: 'Search medications'
    });
    await userEvent.type(input, 'ator');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Add to draft'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Back to medication draft'
    }));
    await expect(canvas.getByText('Draft additions')).toBeVisible();
    await expect(canvas.getByText('Atorvastatin')).toBeVisible();
  }
}`,...w.parameters?.docs?.source},description:{story:`A formulary addition remains visible after returning from search.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    diagnoses: [],
    onAddDiagnosis: fn()
  },
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('button', {
      name: 'Add medication'
    })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('button', {
      name: 'Finish review'
    })).not.toBeInTheDocument();
    await expect(canvas.getByText('Add a diagnosis before reviewing this medication draft.')).toBeVisible();
  }
}`,...T.parameters?.docs?.source},description:{story:`The diagnosis gate explains both disabled actions in their local scopes.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    initialDraft: {
      decisions: {
        'med-metformin': {
          decision: 'adjust',
          dose: '500 mg',
          frequency: 'once daily'
        }
      },
      additions: [{
        id: 'srch-atorvastatin',
        drug: 'Atorvastatin',
        dose: '20 mg tablet',
        source: 'formulary'
      }]
    }
  }
}`,...E.parameters?.docs?.source},description:{story:`A restored session draft preserves decisions and additions after leaving the workflow.`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    needsReview: [],
    settled: [],
    suggestions: []
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    patientName: 'Sokha Monirath Chann very long registry display name',
    diagnoses: [{
      code: 'E11.65',
      label: 'Type 2 diabetes mellitus with hyperglycaemia and a long clinical label',
      evidence: 'HbA1c 8.9% · verified 21 May 2026 · repeat result pending'
    }]
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  globals: {
    viewport: {
      value: 'kura320'
    }
  }
}`,...k.parameters?.docs?.source}}},A=[`Default`,`ReviewGate`,`AdjustFlow`,`AddAiSuggestion`,`SearchMedication`,`NoDiagnosisLinked`,`RestoredDraft`,`EmptyRegimen`,`LongContent`,`MobileWidth320`]}))();export{C as AddAiSuggestion,S as AdjustFlow,b as Default,D as EmptyRegimen,O as LongContent,k as MobileWidth320,T as NoDiagnosisLinked,E as RestoredDraft,x as ReviewGate,w as SearchMedication,A as __namedExportsOrder,y as default};