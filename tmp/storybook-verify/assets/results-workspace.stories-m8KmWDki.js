import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{S as ee,_ as te,a as i,g as ne,h as re,m as a,n as ie,o,p as s,r as ae,t as oe,u as c,y as l}from"./demo-data-lOaHj2eX.js";import{n as u,t as d}from"./results-workspace-BP2vyTVS.js";import{n as f,t as se}from"./results.stories.module-CCQ5ijp9.js";import{n as ce,t as le}from"./storybook-metadata-BMnyaNTp.js";function ue(){let[e,t]=(0,h.useState)(!1);return e?(0,m.jsx)(d,{episodeLabel:`Booking AB12331 · collected Jul 15, 2026`,patient:i,sections:b}):(0,m.jsx)(d,{episodeLabel:`Booking AB12331 · collected Jul 15, 2026`,onRetry:()=>t(!0),patient:i,sections:[],state:`error`})}function de(){let[e,t]=(0,h.useState)(!0);return(0,m.jsx)(d,{episodeLabel:`Booking AB12345 · collected Jul 14, 2026`,onRetry:()=>t(!1),patient:i,sections:a,state:e?`conflict`:`ready`})}function p({args:e,widthClass:t}){return(0,m.jsx)(`div`,{className:`${f.frame} ${t}`,children:(0,m.jsx)(d,{...e})})}var m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$;t((()=>{m=r(),h=e(n()),ee(),se(),u(),ce(),{expect:g,userEvent:_,waitFor:v,within:y}=__STORYBOOK_MODULE_TEST__,b=te.longitudinal.sections,x={title:`Clinic/Clinical/Results/Results Workspace`,component:d,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:le,docs:{description:{component:`Doctor per-patient results workspace composed from the canonical toolbar, flowsheet, row, chart, HoverCard, and Sheet owners. Product/design target states are explicit while executable backend mapping remains pending by product decision.`}}},args:{patient:i,episodeLabel:`Current episode · Jul 1, 2026`,sections:b}},S={},C={args:{patient:void 0,sections:[],state:`empty`},play:async({canvasElement:e})=>{let t=y(e);await g(t.getByText(`No results to review`)).toBeVisible(),await g(t.queryByText(i.name)).not.toBeInTheDocument()}},w={play:async({canvasElement:e})=>{let t=y(e),n=t.getByRole(`searchbox`,{name:`Search analytes, codes, or panels`});await _.type(n,`creatinine`),await g(t.getByText(`Creatinine`)).toBeVisible(),await g(t.queryByText(`Hemoglobin A1c`)).not.toBeInTheDocument(),await g(t.getByRole(`status`)).toHaveTextContent(`Showing 1 matching analytes`)}},T={play:async({canvasElement:e})=>{let t=y(e).getByRole(`radio`,{name:`Latest only`});await _.click(t),await g(t).toHaveAttribute(`aria-checked`,`true`)}},E={args:{sections:o,initialFilter:`flagged`},play:async({canvasElement:e})=>{let t=y(e);await g(t.getByText(`LDL-C`)).toBeVisible(),await g(t.queryByText(`Hemoglobin`)).not.toBeInTheDocument()}},D={args:{sections:ae,initialFilter:`critical`}},O={args:{sections:[{code:`other`,title:`Other tests`,results:[s,...l]}],initialFilter:`no_reference`}},k={args:{episodeLabel:`Booking AB12345 · collected Jul 14, 2026`,sections:a}},A={args:{episodeLabel:`Booking AB12046 · collected Jul 12, 2026`,sections:re}},j={args:{episodeLabel:`Booking AB11987 · collected Jul 8, 2026`,sections:oe}},M={args:{episodeLabel:`Booking AB11902 · collected Jul 5, 2026`,sections:ne}},N={args:{episodeLabel:`Booking AB11875 · collected Jul 3, 2026`,sections:ie}},P={args:{sections:[{code:`other`,title:`Other tests`,results:[c,s]}]}},F={args:{state:`loading`,sections:[]}},I={args:{state:`empty`,sections:[]}},L={render:()=>(0,m.jsx)(ue,{}),play:async({canvasElement:e})=>{let t=y(e);await _.click(t.getByRole(`button`,{name:`Retry`})),await v(async()=>{await g(t.getAllByText(`Creatinine`)).toHaveLength(1)})}},R={render:()=>(0,m.jsx)(de,{}),play:async({canvasElement:e})=>{let t=y(e);await g(t.getByText(`Results changed during review`)).toBeVisible(),await _.click(t.getByRole(`button`,{name:`Refresh episode`})),await v(async()=>{await g(t.queryByText(`Results changed during review`)).not.toBeInTheDocument()})}},z={args:{state:`permission`,sections:[]}},B={args:{state:`offline`}},V={args:{staleAt:`2026-07-14T09:00:00Z`}},H={args:{readOnly:!0}},U={parameters:{viewport:{defaultViewport:`kura320`}},args:{sections:a},render:e=>(0,m.jsx)(p,{args:e,widthClass:f.w320})},W={parameters:{viewport:{defaultViewport:`kura360`}},args:{sections:a},render:e=>(0,m.jsx)(p,{args:e,widthClass:f.w360})},G={parameters:{viewport:{defaultViewport:`kura390`}},args:{sections:a},render:e=>(0,m.jsx)(p,{args:e,widthClass:f.w390})},K={parameters:{viewport:{defaultViewport:`kura412`}},args:{sections:a},render:e=>(0,m.jsx)(p,{args:e,widthClass:f.w412})},q={parameters:{viewport:{defaultViewport:`kura480`}},args:{sections:a},render:e=>(0,m.jsx)(p,{args:e,widthClass:f.w480})},J={parameters:{viewport:{defaultViewport:`kura768`}},args:{sections:a},render:e=>(0,m.jsx)(p,{args:e,widthClass:f.w768})},Y={parameters:{viewport:{defaultViewport:`kura1024`}},args:{sections:o},render:e=>(0,m.jsx)(p,{args:e,widthClass:f.w1024})},X={globals:{density:`compact`}},Z={globals:{density:`comfortable`}},Q={globals:{theme:`dark`},args:{sections:a}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    patient: undefined,
    sections: [],
    state: 'empty'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No results to review')).toBeVisible();
    await expect(canvas.queryByText(DEMO_RESULTS_PATIENT.name)).not.toBeInTheDocument();
  }
}`,...C.parameters?.docs?.source},description:{story:`Clinic-level first use before the workspace has patients or episodes.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const search = canvas.getByRole('searchbox', {
      name: 'Search analytes, codes, or panels'
    });
    await userEvent.type(search, 'creatinine');
    await expect(canvas.getByText('Creatinine')).toBeVisible();
    await expect(canvas.queryByText('Hemoglobin A1c')).not.toBeInTheDocument();
    await expect(canvas.getByRole('status')).toHaveTextContent('Showing 1 matching analytes');
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const latest = canvas.getByRole('radio', {
      name: 'Latest only'
    });
    await userEvent.click(latest);
    await expect(latest).toHaveAttribute('aria-checked', 'true');
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    sections: FIRST_VISIT_SECTIONS,
    initialFilter: 'flagged'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('LDL-C')).toBeVisible();
    await expect(canvas.queryByText('Hemoglobin')).not.toBeInTheDocument();
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    sections: CRITICAL_COMPLETE_SECTIONS,
    initialFilter: 'critical'
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    sections: [{
      code: 'other',
      title: 'Other tests',
      results: [NO_REFERENCE_RESULT, ...RETURNING_RESULTS]
    }],
    initialFilter: 'no_reference'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    episodeLabel: 'Booking AB12345 · collected Jul 14, 2026',
    sections: PARTIAL_EPISODE_SECTIONS
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    episodeLabel: 'Booking AB12046 · collected Jul 12, 2026',
    sections: REDRAW_EPISODE_SECTIONS
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    episodeLabel: 'Booking AB11987 · collected Jul 8, 2026',
    sections: ADD_ON_EPISODE_SECTIONS
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    episodeLabel: 'Booking AB11902 · collected Jul 5, 2026',
    sections: RELEASED_WITH_CANCELLED_SECTIONS
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    episodeLabel: 'Booking AB11875 · collected Jul 3, 2026',
    sections: ALL_CANCELLED_SECTIONS
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    sections: [{
      code: 'other',
      title: 'Other tests',
      results: [LONG_CONTENT_RESULT, NO_REFERENCE_RESULT]
    }]
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'loading',
    sections: []
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'empty',
    sections: []
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <RetryPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Retry'
    }));
    await waitFor(async () => {
      await expect(canvas.getAllByText('Creatinine')).toHaveLength(1);
    });
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <ConflictPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Results changed during review')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Refresh episode'
    }));
    await waitFor(async () => {
      await expect(canvas.queryByText('Results changed during review')).not.toBeInTheDocument();
    });
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'permission',
    sections: []
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'offline'
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    staleAt: '2026-07-14T09:00:00Z'
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    readOnly: true
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  args: {
    sections: PARTIAL_EPISODE_SECTIONS
  },
  render: args => <ResponsiveWorkspaceFrame args={args} widthClass={styles.w320} />
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura360'
    }
  },
  args: {
    sections: PARTIAL_EPISODE_SECTIONS
  },
  render: args => <ResponsiveWorkspaceFrame args={args} widthClass={styles.w360} />
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura390'
    }
  },
  args: {
    sections: PARTIAL_EPISODE_SECTIONS
  },
  render: args => <ResponsiveWorkspaceFrame args={args} widthClass={styles.w390} />
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura412'
    }
  },
  args: {
    sections: PARTIAL_EPISODE_SECTIONS
  },
  render: args => <ResponsiveWorkspaceFrame args={args} widthClass={styles.w412} />
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura480'
    }
  },
  args: {
    sections: PARTIAL_EPISODE_SECTIONS
  },
  render: args => <ResponsiveWorkspaceFrame args={args} widthClass={styles.w480} />
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura768'
    }
  },
  args: {
    sections: PARTIAL_EPISODE_SECTIONS
  },
  render: args => <ResponsiveWorkspaceFrame args={args} widthClass={styles.w768} />
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura1024'
    }
  },
  args: {
    sections: FIRST_VISIT_SECTIONS
  },
  render: args => <ResponsiveWorkspaceFrame args={args} widthClass={styles.w1024} />
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  globals: {
    density: 'compact'
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  globals: {
    density: 'comfortable'
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  globals: {
    theme: 'dark'
  },
  args: {
    sections: PARTIAL_EPISODE_SECTIONS
  }
}`,...Q.parameters?.docs?.source}}},$=`DefaultLongitudinalWorkspace.NewClinicEmpty.SearchInteraction.LatestOnlyInteraction.FlaggedFilter.CriticalOnlyFilter.NoReferenceFilter.PartialRelease.RedrawInProgress.AddOnReopenedEpisode.ReleasedWithCancelledLine.AllCancelled.LongContentAndOtherTests.Loading.Empty.ErrorAndRecovery.ConflictAndRefresh.PermissionRestricted.OfflineCached.StaleSnapshot.ReadOnly.MobileWidth320.MobileWidth360.MobileWidth390.MobileWidth412.MobileWidth480.TabletWidth768.DesktopWidth1024.CompactDensity.ComfortableDensity.DarkTheme`.split(`.`)}))();export{j as AddOnReopenedEpisode,N as AllCancelled,Z as ComfortableDensity,X as CompactDensity,R as ConflictAndRefresh,D as CriticalOnlyFilter,Q as DarkTheme,S as DefaultLongitudinalWorkspace,Y as DesktopWidth1024,I as Empty,L as ErrorAndRecovery,E as FlaggedFilter,T as LatestOnlyInteraction,F as Loading,P as LongContentAndOtherTests,U as MobileWidth320,W as MobileWidth360,G as MobileWidth390,K as MobileWidth412,q as MobileWidth480,C as NewClinicEmpty,O as NoReferenceFilter,B as OfflineCached,k as PartialRelease,z as PermissionRestricted,H as ReadOnly,A as RedrawInProgress,M as ReleasedWithCancelledLine,w as SearchInteraction,V as StaleSnapshot,J as TabletWidth768,$ as __namedExportsOrder,x as default};