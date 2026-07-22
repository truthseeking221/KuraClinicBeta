import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{S as n,g as r,h as i,m as a,n as o,o as s,t as c,u as l,y as u}from"./demo-data-lOaHj2eX.js";import{n as d,t as f}from"./lab-flowsheet-BS_KL8xg.js";import{n as p,t as m}from"./results.stories.module-CCQ5ijp9.js";import{n as h,t as g}from"./storybook-metadata-BMnyaNTp.js";var _,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R;e((()=>{_=t(),n(),d(),m(),h(),{expect:v,userEvent:y,waitFor:b,within:x}=__STORYBOOK_MODULE_TEST__,S={title:`Clinic/Clinical/Results/Flowsheet`,component:f,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:g,docs:{description:{component:`Catalog-section flowsheet with line-item progressive release. Panels count once, redraw predecessors are removed, QC-dismissed rows never render, and each range carries its own labels.`}}}},C={args:{title:`Longitudinal lab results`,description:`First visit · Apr 12, 2026`,sections:s,mode:`first-visit`}},w={args:{title:`Results — booking AB12345`,description:`Progressive release by active order line`,sections:a},play:async({canvasElement:e})=>{let t=x(e);await v(t.getByText(`2 of 5 ready`)).toBeVisible(),await v(t.getAllByText(`Complete blood count`)).toHaveLength(2),await v(t.getByText(`In review`)).toBeVisible(),await v(t.getByText(`Awaiting sample`)).toBeVisible()}},T={args:{title:`Longitudinal lab results`,description:`Jul 1, 2026 and prior released episodes`,sections:[{code:`monitoring`,title:`Monitored analytes`,results:u}],mode:`trend`}},E={args:{title:`Redraw in progress`,description:`The QC-dismissed predecessor is never rendered`,sections:i},play:async({canvasElement:e})=>{let t=x(e);await v(t.getByText(`Running`)).toBeVisible(),await v(t.queryByText(`Dismissed`)).not.toBeInTheDocument(),await v(t.getAllByText(`Potassium`)).toHaveLength(1)}},D={args:{title:`Add-on test placed`,description:`A previously complete episode is progressive again`,sections:c},play:async({canvasElement:e})=>{let t=x(e);await v(t.getAllByText(`2 of 3 ready`)).toHaveLength(1),await v(t.getByText(`1 pending`)).toBeVisible()}},O={args:{title:`Mixed terminal outcome`,description:`One result released; one line unavailable`,sections:r},play:async({canvasElement:e})=>{let t=x(e);await v(t.getAllByText(`1 of 2 ready · 1 unavailable`)).toHaveLength(1),await v(t.getByText(`1 unavailable`)).toBeVisible(),await v(t.getByText(`Cancelled`)).toBeVisible()}},k={args:{title:`Cancelled episode`,sections:o},play:async({canvasElement:e})=>{let t=x(e);await v(t.getAllByText(`No results — episode cancelled`)).toHaveLength(1),await v(t.getByText(`1 unavailable`)).toBeVisible(),await v(t.getByText(`ALT`)).toBeVisible(),await v(t.queryByText(`TSH`)).not.toBeInTheDocument()}},A={args:{title:`Longitudinal lab results`,sections:s,mode:`first-visit`},play:async({canvasElement:e})=>{let t=x(e),n=t.getByRole(`button`,{name:/Hematology/});await v(n).toHaveAttribute(`aria-expanded`,`true`),await v(t.getByText(`Hemoglobin`)).toBeVisible(),await y.click(n),await b(async()=>{await v(n).toHaveAttribute(`aria-expanded`,`false`),await v(t.queryByText(`Hemoglobin`)).not.toBeInTheDocument()})}},j={args:{title:`Longitudinal lab results`,sections:[]}},M={args:{title:`Long-content result`,sections:[{code:`serology`,title:`Serology`,results:[l]}]}},N={parameters:{viewport:{defaultViewport:`kura320`}},args:{title:`Longitudinal lab results`,sections:s,mode:`first-visit`},render:e=>(0,_.jsx)(`div`,{className:`${p.frame} ${p.w320}`,children:(0,_.jsx)(f,{...e})})},P={parameters:{viewport:{defaultViewport:`kura768`}},args:{title:`Longitudinal lab results`,sections:a},render:e=>(0,_.jsx)(`div`,{className:`${p.frame} ${p.w768}`,children:(0,_.jsx)(f,{...e})})},F={globals:{density:`compact`},args:{title:`Longitudinal lab results`,sections:s,mode:`first-visit`}},I={globals:{density:`comfortable`},args:{title:`Longitudinal lab results`,sections:s,mode:`first-visit`}},L={globals:{theme:`dark`},args:{title:`Longitudinal lab results`,sections:a}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Longitudinal lab results',
    description: 'First visit · Apr 12, 2026',
    sections: FIRST_VISIT_SECTIONS,
    mode: 'first-visit'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Results — booking AB12345',
    description: 'Progressive release by active order line',
    sections: PARTIAL_EPISODE_SECTIONS
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('2 of 5 ready')).toBeVisible();
    await expect(canvas.getAllByText('Complete blood count')).toHaveLength(2);
    await expect(canvas.getByText('In review')).toBeVisible();
    await expect(canvas.getByText('Awaiting sample')).toBeVisible();
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Longitudinal lab results',
    description: 'Jul 1, 2026 and prior released episodes',
    sections: [{
      code: 'monitoring',
      title: 'Monitored analytes',
      results: RETURNING_RESULTS
    }],
    mode: 'trend'
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Redraw in progress',
    description: 'The QC-dismissed predecessor is never rendered',
    sections: REDRAW_EPISODE_SECTIONS
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Running')).toBeVisible();
    await expect(canvas.queryByText('Dismissed')).not.toBeInTheDocument();
    await expect(canvas.getAllByText('Potassium')).toHaveLength(1);
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Add-on test placed',
    description: 'A previously complete episode is progressive again',
    sections: ADD_ON_EPISODE_SECTIONS
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    // Episode progress is stated once; the section states what is outstanding.
    await expect(canvas.getAllByText('2 of 3 ready')).toHaveLength(1);
    await expect(canvas.getByText('1 pending')).toBeVisible();
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Mixed terminal outcome',
    description: 'One result released; one line unavailable',
    sections: RELEASED_WITH_CANCELLED_SECTIONS
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText('1 of 2 ready · 1 unavailable')).toHaveLength(1);
    await expect(canvas.getByText('1 unavailable')).toBeVisible();
    await expect(canvas.getByText('Cancelled')).toBeVisible();
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Cancelled episode',
    sections: ALL_CANCELLED_SECTIONS
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText('No results — episode cancelled')).toHaveLength(1);
    await expect(canvas.getByText('1 unavailable')).toBeVisible();
    await expect(canvas.getByText('ALT')).toBeVisible();
    await expect(canvas.queryByText('TSH')).not.toBeInTheDocument();
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Longitudinal lab results',
    sections: FIRST_VISIT_SECTIONS,
    mode: 'first-visit'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button', {
      name: /Hematology/
    });
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByText('Hemoglobin')).toBeVisible();
    await userEvent.click(toggle);
    await waitFor(async () => {
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(canvas.queryByText('Hemoglobin')).not.toBeInTheDocument();
    });
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Longitudinal lab results',
    sections: []
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Long-content result',
    sections: [{
      code: 'serology',
      title: 'Serology',
      results: [LONG_CONTENT_RESULT]
    }]
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  args: {
    title: 'Longitudinal lab results',
    sections: FIRST_VISIT_SECTIONS,
    mode: 'first-visit'
  },
  render: args => <div className={\`\${styles.frame} \${styles.w320}\`}>
      <LabFlowsheet {...args} />
    </div>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura768'
    }
  },
  args: {
    title: 'Longitudinal lab results',
    sections: PARTIAL_EPISODE_SECTIONS
  },
  render: args => <div className={\`\${styles.frame} \${styles.w768}\`}>
      <LabFlowsheet {...args} />
    </div>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  globals: {
    density: 'compact'
  },
  args: {
    title: 'Longitudinal lab results',
    sections: FIRST_VISIT_SECTIONS,
    mode: 'first-visit'
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  globals: {
    density: 'comfortable'
  },
  args: {
    title: 'Longitudinal lab results',
    sections: FIRST_VISIT_SECTIONS,
    mode: 'first-visit'
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  globals: {
    theme: 'dark'
  },
  args: {
    title: 'Longitudinal lab results',
    sections: PARTIAL_EPISODE_SECTIONS
  }
}`,...L.parameters?.docs?.source}}},R=[`FirstVisit`,`PartialEpisodeTwoOfFiveLines`,`ReturningTrends`,`RedrawReplacesDismissedExecution`,`AddOnReopensEpisode`,`ReleasedWithCancelledLine`,`AllCancelledAndDismissed`,`CollapsibleSections`,`Empty`,`LongContent`,`MobileWidth320`,`TabletWidth768`,`CompactDensity`,`ComfortableDensity`,`DarkTheme`]}))();export{D as AddOnReopensEpisode,k as AllCancelledAndDismissed,A as CollapsibleSections,I as ComfortableDensity,F as CompactDensity,L as DarkTheme,j as Empty,C as FirstVisit,M as LongContent,N as MobileWidth320,w as PartialEpisodeTwoOfFiveLines,E as RedrawReplacesDismissedExecution,O as ReleasedWithCancelledLine,T as ReturningTrends,P as TabletWidth768,R as __namedExportsOrder,S as default};