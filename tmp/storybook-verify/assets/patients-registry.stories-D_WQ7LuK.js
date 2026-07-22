import{i as e}from"./preload-helper-MclHqJXp.js";import{_ as t,g as n,r,t as i,u as a,y as o}from"./storybook-metadata-CwrABL_1.js";import{n as s,t as c}from"./patients-registry-VW_VhY6B.js";var l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k;e((()=>{s(),o(),r(),{expect:l,fn:u,userEvent:d,within:f}=__STORYBOOK_MODULE_TEST__,p={title:`Clinic/Clinical/Patients/Registry`,component:c,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`padded`,kura:i,docs:{description:{component:`The workspace patient registry: who this workspace has seen, most recent first, opening into the chart. The row shape mirrors the ListWorkspacePatients contract (masked phone and MRN, two-value assurance, terminal states). There is no name search: names are stored encrypted with no searchable index, so patients resolve through the reception doors instead. The "Why now" column is a target-contract triage layer and hides entirely when no triage data is supplied.`}}},args:{patients:a,onAddPatient:u(),onOpenPatient:u()}},m={},h={args:{triage:n}},g={tags:[`play-fn`],play:async({args:e,canvasElement:t})=>{let n=await f(t).findByRole(`row`,{name:/Open Sok Nimol/});await d.click(n),await l(e.onOpenPatient).toHaveBeenCalledWith(`p-sok-nimol`)}},_={tags:[`play-fn`],play:async({canvasElement:e})=>{let t=f(e);await d.click(t.getByRole(`radio`,{name:/Unverified/})),await l(t.queryByText(`Sok Nimol`)).not.toBeInTheDocument(),await l(t.getByText(`Lina Prum`)).toBeInTheDocument(),await l(t.queryByText(`Chan Thoeun`)).not.toBeInTheDocument()}},v={tags:[`play-fn`],play:async({canvasElement:e})=>{let t=f(e);await l(t.getByText(`Deceased`)).toBeInTheDocument(),await l(t.getByText(`Merged`)).toBeInTheDocument(),await l(t.getByText(`Name unavailable`)).toBeInTheDocument()}},y={args:{patients:[]}},b={args:{patients:[]},tags:[`play-fn`],play:async({args:e,canvasElement:t})=>{let n=f(t);await d.click(n.getByRole(`button`,{name:`Add patient`})),await l(e.onAddPatient).toHaveBeenCalledOnce()}},x={args:{state:`loading`}},S={args:{state:`error`,onRetry:u()}},C={args:{patients:[t,...a],triage:{"p-long-name":{label:`Critical potassium result unacknowledged since yesterday evening`,tone:`danger`}}}},w={args:{triage:n},globals:{viewport:{value:`kura390`}}},T={globals:{viewport:{value:`kura320`}}},E={args:{triage:n},globals:{viewport:{value:`kura768`}}},D={globals:{density:`comfortable`}},O={args:{triage:n},globals:{theme:`dark`}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source},description:{story:`Backend-true core: four columns, recency order, no triage layer.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    triage: DEMO_TRIAGE
  }
}`,...h.parameters?.docs?.source},description:{story:`The triage layer on: one honest "why now" per patient that has one.`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  tags: ['play-fn'],
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const row = await canvas.findByRole('row', {
      name: /Open Sok Nimol/
    });
    await userEvent.click(row);
    await expect(args.onOpenPatient).toHaveBeenCalledWith('p-sok-nimol');
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', {
      name: /Unverified/
    }));
    await expect(canvas.queryByText('Sok Nimol')).not.toBeInTheDocument();
    await expect(canvas.getByText('Lina Prum')).toBeInTheDocument();
    // Terminal records live only under All: they are facts, not a bucket.
    await expect(canvas.queryByText('Chan Thoeun')).not.toBeInTheDocument();
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  tags: ['play-fn'],
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Deceased')).toBeInTheDocument();
    await expect(canvas.getByText('Merged')).toBeInTheDocument();
    await expect(canvas.getByText('Name unavailable')).toBeInTheDocument();
  }
}`,...v.parameters?.docs?.source},description:{story:`Terminal and sealed records render as facts: deceased and merged carry a
neutral badge and outrank assurance; a crypto-shredded record keeps its
row with "Name unavailable" instead of disappearing.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    patients: []
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    patients: []
  },
  tags: ['play-fn'],
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Add patient'
    }));
    await expect(args.onAddPatient).toHaveBeenCalledOnce();
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'loading'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'error',
    onRetry: fn()
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    patients: [LONG_NAME_PATIENT, ...DEMO_PATIENTS],
    triage: {
      'p-long-name': {
        label: 'Critical potassium result unacknowledged since yesterday evening',
        tone: 'danger'
      }
    }
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    triage: DEMO_TRIAGE
  },
  globals: {
    viewport: {
      value: 'kura390'
    }
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  globals: {
    viewport: {
      value: 'kura320'
    }
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    triage: DEMO_TRIAGE
  },
  globals: {
    viewport: {
      value: 'kura768'
    }
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  globals: {
    density: 'comfortable'
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    triage: DEMO_TRIAGE
  },
  globals: {
    theme: 'dark'
  }
}`,...O.parameters?.docs?.source}}},k=[`Default`,`TriageLayer`,`OpensPatientOnRowClick`,`FilterToUnverified`,`TerminalAndSealedRecords`,`Empty`,`StartsAddPatientFlow`,`Loading`,`ErrorAndRecovery`,`LongContent`,`MobileWidth390`,`MobileWidth320`,`TabletWidth768`,`ComfortableDensity`,`DarkTheme`]}))();export{D as ComfortableDensity,O as DarkTheme,m as Default,y as Empty,S as ErrorAndRecovery,_ as FilterToUnverified,x as Loading,C as LongContent,T as MobileWidth320,w as MobileWidth390,g as OpensPatientOnRowClick,b as StartsAddPatientFlow,E as TabletWidth768,v as TerminalAndSealedRecords,h as TriageLayer,k as __namedExportsOrder,p as default};