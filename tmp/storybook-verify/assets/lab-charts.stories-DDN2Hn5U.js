import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{S as n,d as r,l as i,o as a,u as o,y as s}from"./demo-data-lOaHj2eX.js";import{n as c,t as l}from"./lab-draw-strip-DDXi0txS.js";import{n as u,t as d}from"./lab-trend-chart-Chik5NU6.js";import{n as f,t as p}from"./lab-sparkline-D1UTEBbl.js";import{n as m,t as h}from"./results.stories.module-CCQ5ijp9.js";import{n as g,t as _}from"./storybook-metadata-BMnyaNTp.js";var v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B;e((()=>{v=t(),n(),c(),f(),u(),h(),g(),{expect:y,userEvent:b,within:x}=__STORYBOOK_MODULE_TEST__,[S,C,w]=s,T=a[1].results[0],E={title:`Clinic/Clinical/Results/Trend Charts`,component:d,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:_,docs:{description:{component:`Kura-owned SVG trend, sparkline, and draw-strip family. Time-series X positions use real timestamps; missing draws break lines; unknown timestamps are excluded from the temporal axis and remain available in history text.`}}}},D={args:{result:S}},O={args:{result:C}},k={args:{result:i},parameters:{docs:{description:{story:`The first two draws are one week apart while the next is seventeen months later; X spacing reflects that difference.`}}}},A={args:{result:S}},j={args:{result:r},parameters:{docs:{description:{story:`The undated latest value is not placed on a time axis. Dated history remains chartable and the detail composition explains the omitted timestamp.`}}}},M={args:{result:S},play:async({canvasElement:e})=>{let t=e.querySelector(`[data-slot="lab-chart-point"]`);if(!t)throw Error(`Expected at least one chart point`);await b.hover(t);let n=e.querySelector(`p[aria-live="polite"]`);if(!n)throw Error(`Expected the chart point summary`);await y(n).toHaveTextContent(`Aug 12 · 7.4 % · Annual review`),t.focus(),await y(t).toHaveFocus(),await y(t.getAttribute(`aria-label`)).toContain(`Annual review`)}},N={args:{result:S},render:()=>(0,v.jsxs)(`div`,{className:m.chartPair,children:[(0,v.jsx)(p,{result:S}),(0,v.jsx)(p,{result:C})]})},P={args:{result:T},render:()=>(0,v.jsx)(l,{result:T})},F={args:{result:w},render:()=>(0,v.jsx)(l,{result:w})},I={args:{result:o},render:()=>(0,v.jsx)(`div`,{className:`${m.frame} ${m.w360}`,children:(0,v.jsx)(l,{result:o})})},L={args:{result:S},render:()=>(0,v.jsx)(l,{maxDraws:3,result:S}),play:async({canvasElement:e})=>{await y(x(e).getByText(`3 earlier`)).toBeVisible()}},R={parameters:{viewport:{defaultViewport:`kura320`}},args:{result:S},render:e=>(0,v.jsx)(`div`,{className:`${m.frame} ${m.w320}`,children:(0,v.jsx)(d,{...e})})},z={globals:{theme:`dark`},args:{result:C}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    result: hba1c
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    result: creatinine
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    result: IRREGULAR_DATE_RESULT
  },
  parameters: {
    docs: {
      description: {
        story: 'The first two draws are one week apart while the next is seventeen months later; X spacing reflects that difference.'
      }
    }
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    result: hba1c
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    result: MISSING_DATE_RESULT
  },
  parameters: {
    docs: {
      description: {
        story: 'The undated latest value is not placed on a time axis. Dated history remains chartable and the detail composition explains the omitted timestamp.'
      }
    }
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    result: hba1c
  },
  play: async ({
    canvasElement
  }) => {
    const firstPoint = canvasElement.querySelector<SVGGElement>('[data-slot="lab-chart-point"]');
    if (!firstPoint) throw new Error('Expected at least one chart point');
    await userEvent.hover(firstPoint);
    const summary = canvasElement.querySelector<HTMLParagraphElement>('p[aria-live="polite"]');
    if (!summary) throw new Error('Expected the chart point summary');
    await expect(summary).toHaveTextContent('Aug 12 · 7.4 % · Annual review');
    firstPoint.focus();
    await expect(firstPoint).toHaveFocus();
    await expect(firstPoint.getAttribute('aria-label')).toContain('Annual review');
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    result: hba1c
  },
  render: () => <div className={styles.chartPair}>
      <LabSparkline result={hba1c} />
      <LabSparkline result={creatinine} />
    </div>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    result: singleObservation
  },
  render: () => <LabDrawStrip result={singleObservation} />
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    result: urineProtein
  },
  render: () => <LabDrawStrip result={urineProtein} />
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    result: LONG_CONTENT_RESULT
  },
  render: () => <div className={\`\${styles.frame} \${styles.w360}\`}>
      <LabDrawStrip result={LONG_CONTENT_RESULT} />
    </div>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    result: hba1c
  },
  render: () => <LabDrawStrip maxDraws={3} result={hba1c} />,
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).getByText('3 earlier')).toBeVisible();
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  args: {
    result: hba1c
  },
  render: args => <div className={\`\${styles.frame} \${styles.w320}\`}>
      <LabTrendChart {...args} />
    </div>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  globals: {
    theme: 'dark'
  },
  args: {
    result: creatinine
  }
}`,...z.parameters?.docs?.source}}},B=[`ImprovingTowardRange`,`WorseningLabFlagged`,`IrregularTimeIntervals`,`MissingDrawStaysGap`,`LatestTimestampUnavailable`,`PointHoverAndKeyboardFocus`,`SparklinePair`,`SingleObservationFallsBackToDrawStrip`,`QualitativeHistory`,`LongQualitativeContentWraps`,`CappedHistoryDisclosesOlderDraws`,`MobileWidth320`,`DarkTheme`]}))();export{L as CappedHistoryDisclosesOlderDraws,z as DarkTheme,D as ImprovingTowardRange,k as IrregularTimeIntervals,j as LatestTimestampUnavailable,I as LongQualitativeContentWraps,A as MissingDrawStaysGap,R as MobileWidth320,M as PointHoverAndKeyboardFocus,F as QualitativeHistory,P as SingleObservationFallsBackToDrawStrip,N as SparklinePair,O as WorseningLabFlagged,B as __namedExportsOrder,E as default};