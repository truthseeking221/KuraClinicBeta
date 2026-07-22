import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{S as n,f as r,i,m as a,o,p as s,u as c,y as l}from"./demo-data-lOaHj2eX.js";import{n as u,t as d}from"./lab-result-row-D3Rvqnbk.js";import{n as f,t as p}from"./lab-result-detail-DzK5M7KO.js";import{n as m,t as h}from"./results.stories.module-CCQ5ijp9.js";import{n as g,t as _}from"./storybook-metadata-BMnyaNTp.js";var v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W;e((()=>{v=t(),n(),f(),u(),h(),g(),{expect:y,userEvent:b,waitFor:x,within:S}=__STORYBOOK_MODULE_TEST__,C=o[0].results[0],w=o[3].results[1],[T,E,D]=l,O=a[1].results[2],k={title:`Clinic/Clinical/Results/Result Row`,component:d,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:_,docs:{description:{component:`One canonical analyte row. Released results show value, catalog interpretation, reference, and optional history action. Pre-release lines show lifecycle status only. Dismissed QC executions are deliberately absent.`}}}},A={args:{result:C,mode:`first-visit`}},j={args:{result:w,mode:`first-visit`}},M={args:{result:i,mode:`first-visit`}},N={args:{result:T}},P={args:{result:E}},F={args:{result:D}},I={args:{result:s}},L={args:{result:r}},R=[`awaiting_sample`,`in_lab`,`in_progress`,`resulted`,`manual_review`,`signed`,`autoverified`,`cancelled`],z={args:{result:O},render:()=>(0,v.jsx)(`div`,{className:m.stack,children:R.map(e=>(0,v.jsx)(d,{result:{...O,orderLineItemId:`${O.orderLineItemId}-${e}`,testId:`${O.testId}-${e}`,analyteCode:`${O.analyteCode}-${e}`,status:e,value:{kind:`missing`}}},e))}),parameters:{docs:{description:{story:`Dismissed is excluded because lab QC-dismissed executions must never render on the doctor results surface.`}}}},B={args:{result:c}},V={args:{result:T},render:()=>(0,v.jsx)(d,{result:T,trailing:(0,v.jsx)(p,{result:T})}),play:async({canvasElement:e})=>{let t=S(e).getByRole(`button`,{name:`View Hemoglobin A1c history`});await b.hover(t),await y(await S(document.body).findByText(`Click for the complete released history.`)).toBeVisible(),await b.unhover(t),await x(async()=>{await y(S(document.body).queryByText(`Click for the complete released history.`)).not.toBeInTheDocument()}),await b.hover(t),await y(await S(document.body).findByText(`Click for the complete released history.`)).toBeVisible(),await b.click(t);let n=await S(document.body).findByRole(`dialog`);await y(S(n).getByRole(`heading`,{name:`Hemoglobin A1c`})).toBeVisible(),await y(S(n).getByText(`Full released history`)).toBeVisible(),await b.click(S(n).getByRole(`button`,{name:`Close Hemoglobin A1c history`})),await x(async()=>{await y(S(document.body).queryByRole(`dialog`)).not.toBeInTheDocument()})}},H={parameters:{viewport:{defaultViewport:`kura320`}},args:{result:T},render:()=>(0,v.jsx)(`div`,{className:`${m.frame} ${m.w320}`,children:(0,v.jsx)(d,{result:T,trailing:(0,v.jsx)(p,{result:T})})}),play:async({canvasElement:e})=>{let t=S(e).getByRole(`button`,{name:`View Hemoglobin A1c history`});await b.click(t);let n=await S(document.body).findByRole(`dialog`);await x(async()=>{await y(n).toHaveAttribute(`data-side`,`bottom`)})}},U={globals:{theme:`dark`},args:{result:i}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    result: hemoglobin,
    mode: 'first-visit'
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    result: hdl,
    mode: 'first-visit'
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    result: CRITICAL_POTASSIUM_RESULT,
    mode: 'first-visit'
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    result: hba1c
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    result: creatinine
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    result: urineProtein
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    result: NO_REFERENCE_RESULT
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    result: NOT_IN_DRAW_RESULT
  }
}`,...L.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    result: pendingBase
  },
  render: () => <div className={styles.stack}>
      {HUMAN_FACING_NON_RELEASED.map(status => {
      const result: LabAnalyteResult = {
        ...pendingBase,
        orderLineItemId: \`\${pendingBase.orderLineItemId}-\${status}\`,
        testId: \`\${pendingBase.testId}-\${status}\`,
        analyteCode: \`\${pendingBase.analyteCode}-\${status}\`,
        status,
        value: {
          kind: 'missing'
        }
      };
      return <LabResultRow key={status} result={result} />;
    })}
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Dismissed is excluded because lab QC-dismissed executions must never render on the doctor results surface.'
      }
    }
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    result: LONG_CONTENT_RESULT
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    result: hba1c
  },
  render: () => <LabResultRow result={hba1c} trailing={<LabResultDetailTrigger result={hba1c} />} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: 'View Hemoglobin A1c history'
    });
    await userEvent.hover(trigger);
    await expect(await within(document.body).findByText('Click for the complete released history.')).toBeVisible();
    await userEvent.unhover(trigger);
    await waitFor(async () => {
      await expect(within(document.body).queryByText('Click for the complete released history.')).not.toBeInTheDocument();
    });
    await userEvent.hover(trigger);
    await expect(await within(document.body).findByText('Click for the complete released history.')).toBeVisible();
    await userEvent.click(trigger);
    const dialog = await within(document.body).findByRole('dialog');
    await expect(within(dialog).getByRole('heading', {
      name: 'Hemoglobin A1c'
    })).toBeVisible();
    await expect(within(dialog).getByText('Full released history')).toBeVisible();
    await userEvent.click(within(dialog).getByRole('button', {
      name: 'Close Hemoglobin A1c history'
    }));
    await waitFor(async () => {
      await expect(within(document.body).queryByRole('dialog')).not.toBeInTheDocument();
    });
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  args: {
    result: hba1c
  },
  render: () => <div className={\`\${styles.frame} \${styles.w320}\`}>
      <LabResultRow result={hba1c} trailing={<LabResultDetailTrigger result={hba1c} />} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const trigger = within(canvasElement).getByRole('button', {
      name: 'View Hemoglobin A1c history'
    });
    await userEvent.click(trigger);
    const dialog = await within(document.body).findByRole('dialog');
    await waitFor(async () => {
      await expect(dialog).toHaveAttribute('data-side', 'bottom');
    });
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  globals: {
    theme: 'dark'
  },
  args: {
    result: CRITICAL_POTASSIUM_RESULT
  }
}`,...U.parameters?.docs?.source}}},W=[`FirstVisitNormal`,`FirstVisitAbnormalLow`,`ExplicitCriticalPanicResult`,`ReturningImproving`,`ReturningWorseningLabFlagged`,`QualitativeResult`,`NoApplicableReference`,`NotInThisDraw`,`HumanFacingLifecycleStates`,`LongVietnameseContent`,`HoverPreviewAndSheetHistory`,`MobileBottomSheet`,`DarkTheme`]}))();export{U as DarkTheme,M as ExplicitCriticalPanicResult,j as FirstVisitAbnormalLow,A as FirstVisitNormal,V as HoverPreviewAndSheetHistory,z as HumanFacingLifecycleStates,B as LongVietnameseContent,H as MobileBottomSheet,I as NoApplicableReference,L as NotInThisDraw,F as QualitativeResult,N as ReturningImproving,P as ReturningWorseningLabFlagged,W as __namedExportsOrder,k as default};