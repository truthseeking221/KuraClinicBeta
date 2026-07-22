import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{S as n,a as r,m as i,o as a,r as o}from"./demo-data-lOaHj2eX.js";import{n as s,t as c}from"./results-review-flow-xagxhlBl.js";import{n as l,t as u}from"./results.stories.module-CCQ5ijp9.js";import{n as d,t as f}from"./storybook-metadata-BMnyaNTp.js";var p,m,h,g,_,v,y,b,x,S,C,w,T,E,D;e((()=>{p=t(),n(),s(),u(),d(),{expect:m,userEvent:h,within:g}=__STORYBOOK_MODULE_TEST__,_={title:`Clinic/Flows/Result Review and Closure`,component:c,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:f,docs:{description:{component:`Full doctor review flow. Closure remains gated while test lines are pending or a released panic-tier result is unacknowledged. Acknowledgment and closure writes are explicitly design-target events pending backend audit/concurrency mapping.`}}},args:{patient:r,episodeLabel:`Current episode · Jul 14, 2026`,sections:a}},v={},y={play:async({canvasElement:e})=>{let t=g(e),n=t.getByRole(`button`,{name:`Close result review`});await m(n).toBeEnabled(),await h.click(n),await m(t.getByText(`Clinical result review closed`)).toBeVisible()}},b={args:{sections:i},play:async({canvasElement:e})=>{let t=g(e);await m(t.getByRole(`button`,{name:`Close result review`})).toBeDisabled(),await m(t.getByText(`3 test lines are still pending.`)).toBeVisible()}},x={args:{sections:o},play:async({canvasElement:e})=>{let t=g(e),n=t.getByRole(`button`,{name:`Close result review`});await m(n).toBeDisabled(),await m(t.getByText(`A critical released result still requires acknowledgment.`)).toBeVisible(),await h.click(t.getByRole(`button`,{name:`Acknowledge critical result`})),await m(t.getByText(`Critical result acknowledged`)).toBeVisible(),await m(n).toBeEnabled(),await h.click(n),await m(t.getByText(`Clinical result review closed`)).toBeVisible()}},S={args:{sections:o}},C={args:{sections:o,initialAcknowledged:!0}},w={args:{initialClosed:!0}},T={parameters:{viewport:{defaultViewport:`kura390`}},args:{sections:i},render:e=>(0,p.jsx)(`div`,{className:`${l.frame} ${l.w390}`,children:(0,p.jsx)(c,{...e})})},E={globals:{theme:`dark`},args:{sections:o}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const close = canvas.getByRole('button', {
      name: 'Close result review'
    });
    await expect(close).toBeEnabled();
    await userEvent.click(close);
    await expect(canvas.getByText('Clinical result review closed')).toBeVisible();
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    sections: PARTIAL_EPISODE_SECTIONS
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Close result review'
    })).toBeDisabled();
    await expect(canvas.getByText('3 test lines are still pending.')).toBeVisible();
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    sections: CRITICAL_COMPLETE_SECTIONS
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const close = canvas.getByRole('button', {
      name: 'Close result review'
    });
    await expect(close).toBeDisabled();
    await expect(canvas.getByText('A critical released result still requires acknowledgment.')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Acknowledge critical result'
    }));
    await expect(canvas.getByText('Critical result acknowledged')).toBeVisible();
    await expect(close).toBeEnabled();
    await userEvent.click(close);
    await expect(canvas.getByText('Clinical result review closed')).toBeVisible();
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    sections: CRITICAL_COMPLETE_SECTIONS
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    sections: CRITICAL_COMPLETE_SECTIONS,
    initialAcknowledged: true
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    initialClosed: true
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura390'
    }
  },
  args: {
    sections: PARTIAL_EPISODE_SECTIONS
  },
  render: args => <div className={\`\${styles.frame} \${styles.w390}\`}>
      <ResultsReviewFlow {...args} />
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  globals: {
    theme: 'dark'
  },
  args: {
    sections: CRITICAL_COMPLETE_SECTIONS
  }
}`,...E.parameters?.docs?.source}}},D=[`ReadyBeforeClosure`,`ReadyClosureInteraction`,`PartialReleaseBlocksClosure`,`CriticalAcknowledgmentThenClosure`,`CriticalRequiresAcknowledgment`,`AlreadyAcknowledged`,`ClosedReadOnly`,`MobileWidth390`,`DarkTheme`]}))();export{C as AlreadyAcknowledged,w as ClosedReadOnly,x as CriticalAcknowledgmentThenClosure,S as CriticalRequiresAcknowledgment,E as DarkTheme,T as MobileWidth390,b as PartialReleaseBlocksClosure,v as ReadyBeforeClosure,y as ReadyClosureInteraction,D as __namedExportsOrder,_ as default};