import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{n as i,t as a}from"./lab-history-browser-DJufe4GG.js";import{n as o,t as s}from"./results.stories.module-CCQ5ijp9.js";import{n as c,t as l}from"./storybook-metadata-BMnyaNTp.js";function u(e){let[t,...n]=e.trim().split(/\r?\n/),r=t.split(`,`).slice(4);return n.map(e=>{let t=e.split(`,`);return{section:t[0]?.trim()??``,test:t[1]?.trim()??``,unit:t[2]?.trim()??``,reference:t[3]?.trim()??``,values:Object.fromEntries(r.map((e,n)=>[e,t[n+4]?.trim()??``]))}})}function d(e){if(!e)return{kind:`missing`};let t=Number(e);return Number.isFinite(t)?{kind:`numeric`,value:t,display:e}:{kind:`text`,value:e}}function f(e){return e.replace(/^(?:N|NR)\s*:\s*/i,``).trim()}function p(e){let t=f(e);if(!t)return null;let n=t.match(/^(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)$/),r=t.match(/^<\s*(\d+(?:\.\d+)?)$/),i=t.match(/^>\s*(\d+(?:\.\d+)?)$/),a=null;if(n){let e=Number(n[1]),t=Number(n[2]);a=[{tier:`low`,label:`Low`,severity:`abnormal`,upperBound:e,displayOrder:0},{tier:`normal`,label:`In range`,severity:`normal`,lowerBound:e,upperBound:t,displayOrder:1},{tier:`high`,label:`High`,severity:`abnormal`,lowerBound:t,displayOrder:2}]}else if(r){let e=Number(r[1]);a=[{tier:`normal`,label:`In range`,severity:`normal`,upperBound:e,displayOrder:0},{tier:`high`,label:`High`,severity:`abnormal`,lowerBound:e,displayOrder:1}]}else if(i){let e=Number(i[1]);a=[{tier:`low`,label:`Low`,severity:`abnormal`,upperBound:e,displayOrder:0},{tier:`normal`,label:`In range`,severity:`normal`,lowerBound:e,displayOrder:1}]}return a?{valueType:`qn`,display:t,tiers:a}:null}function m(e){let t=[...new Set(Object.values(e.values).filter(Boolean))];return t.length===0||t.every(e=>Number.isFinite(Number(e)))?null:{valueType:`ord`,display:`Expected unremarkable`,tiers:t.map((e,t)=>{let n=/positive|presence|cloudy|turbid|trace/i.test(e);return{tier:`value-${t}`,label:n?`Finding`:`Unremarkable`,severity:n?`abnormal`:`normal`,textValue:e,displayOrder:t}})}}function h(e){return`${e.section}||${e.test}`}function g(e){let t=h(e);return/Creatinine|Urea Nitrogen|Microalbumin/i.test(t)?`kidney`:/URINE|CYTOLOGY/i.test(e.section)?`urine`:/Glucose|GLYCOSYLATED/i.test(t)?`diabetes`:/CELL BLOOD COUNT|DIFFERENTIAL COUNT/i.test(e.section)?`anemia`:/ELECTROLYTES/i.test(e.section)||/Magnesium|Calcium|Phosphorus/i.test(e.test)?`mineral-bone`:/HEMATOLOGY|SEROLOGY/i.test(e.section)?`inflammation`:/ENZYMOLOGY/i.test(e.section)||e.test===`Albumin`?`liver`:/Cholesterol|Triglyceride/i.test(e.test)?`lipids`:/THYROIDS/i.test(e.section)?`thyroid`:`other`}function _(e,t){let n=v.find(t=>e.values[t]),r=n?d(e.values[n]):{kind:`missing`},i=v.filter(e=>e!==n).map(t=>({date:t,value:d(e.values[t]),episodeId:`legacy-draw-${t}`,episodeLabel:`Draw ${t}`,sourceLabel:`Legacy DCM fixture`})),a=/CELL BLOOD COUNT|DIFFERENTIAL COUNT/i.test(e.section)?`Complete blood count`:void 0;return{orderLineItemId:`legacy-line-${t+1}`,testId:`legacy-test-${t+1}`,panelCode:a?`CBC`:void 0,panelName:a,analyteCode:`${e.section}-${e.test}`,name:b[e.test]??e.test,unit:e.unit||void 0,status:`released`,verificationMode:`manual`,value:r,range:p(e.reference)??m(e),history:i,observedAt:n?`${n}T08:00:00Z`:null,releasedAt:n?`${n}T10:00:00Z`:null}}var v,y,b,x,S,C,w,T,E,D,O=t((()=>{v=[`2026-05-21`,`2026-04-20`,`2026-03-20`,`2026-02-18`,`2026-01-15`],y=`Section,Test,Unit,Reference,2026-05-21,2026-04-20,2026-03-20,2026-02-18,2026-01-15
HEMATOLOGY,Erythrocyte Sedimentation Rate 1 hour,mm,N: < 20,33,30,42,26,53
CELL BLOOD COUNT,White blood cell,10^3/uL,4.0-10,7.4,7.7,7.9,7.4,7.3
CELL BLOOD COUNT,Red blood cell,10^6/uL,3.8-5.3,3.7,3.6,3.6,3.0,3.3
CELL BLOOD COUNT,Haemoglobin,g/dL,12-16,11.0,10.6,10.9,9.2,10.3
CELL BLOOD COUNT,Hematocrit,%,38-47,33.3,32.6,32.6,27.2,30.7
CELL BLOOD COUNT,M.C.V,fL,80-95,90.2,91.8,91.6,91.6,92.2
CELL BLOOD COUNT,M.C.H,pg,27-32,29.8,29.9,30.6,31.0,30.9
CELL BLOOD COUNT,M.C.H.C,g/dL,32-36,33.0,32.5,33.4,33.8,33.6
CELL BLOOD COUNT,Platelet count,10^3/uL,150-400,189,195,239,217,205
DIFFERENTIAL COUNT,Neutrophils,%,40-74,62.6,74.4,59.4,60.6,68.1
DIFFERENTIAL COUNT,Eosinophils,%,0.0-7.0,2.7,1.0,2.8,3.9,3.2
DIFFERENTIAL COUNT,Basophils,%,0.0-1.5,0.5,0.4,0.6,0.4,0.5
DIFFERENTIAL COUNT,Lymphocytes,%,20-50,26.6,17.9,28.1,25.7,19.4
DIFFERENTIAL COUNT,Monocytes,%,0.0-11,7.6,6.3,9.1,9.4,8.8
BIOCHEMISTRY,Albumin,g/dL,3.5-5.2,4.7,4.5,4.8,4.5,4.7
BIOCHEMISTRY,Glucose,mg/dL,74-109,105,124,95,113,116
BIOCHEMISTRY,Total Cholesterol,mg/dL,< 200,89,120,,81,86
BIOCHEMISTRY,LDL-Cholesterol,mg/dL,< 100,27,43,,26,24
BIOCHEMISTRY,Magnesium,mg/dL,1.6-2.6,3.0,3.1,2.6,2.9,2.6
BIOCHEMISTRY,Triglyceride,mg/dL,< 200,167,147,,128,135
BIOCHEMISTRY,Uric Acid,mg/dL,2.4-5.7,3.2,8.6,3.6,6.3,11.4
BIOCHEMISTRY,Creatinine,mg/dL,0.51-0.95,3.86,3.65,4.75,5.08,3.89
BIOCHEMISTRY,Calcium,mg/dL,8.6-10,9.3,8.9,9.8,9.3,9.4
BIOCHEMISTRY,Phosphorus,mg/dL,2.5-4.5,,,4.9,5.0,
BIOCHEMISTRY,Urea Nitrogen (BUN),mg/dL,N: 6-20,38,46,53,88,55
GLYCOSYLATED HAEMOGLOBIN (Roche),Hb A1c % (DCCT/NGSP),%,4.0-6.0,,,,,6.5
GLYCOSYLATED HAEMOGLOBIN (Roche),Hb A1c (acc to IFCC),mmol/mol,20-42,,,,,47.4
URINE BIOCHEMISTRY,pH,,,6.0,6.0,6.0,6.0,6.0
URINE BIOCHEMISTRY,Specific Gravity,,,,,,1.010,
URINE BIOCHEMISTRY,Protein,,,Absence,POSITIVE ++,POSITIVE +,POSITIVE +,Trace
URINE BIOCHEMISTRY,Glucose,,,Trace,Absence,Absence,Absence,Absence
URINE BIOCHEMISTRY,Ketone,,,,,,Absence,
URINE BIOCHEMISTRY,Blood,,,,,,Absence,
URINE BIOCHEMISTRY,Nitrite,,,,,,Absence,
URINE BIOCHEMISTRY,Urobilinogen,,,,,,Absence,
URINE BIOCHEMISTRY,Bilirubin,,,,,,Absence,
URINE CYTOLOGY,Color,,,Yellow,Yellow,Yellow,Yellow,Yellow
URINE CYTOLOGY,Transparency,,,Clear,Clear,Cloudy,Clear,Clear
CYTOLOGY EXAMEN,White Blood Cells,/Champ,N:0-10,06,06,30,05,06
CYTOLOGY EXAMEN,Red Blood Cells,/Champ,N:0-10,03,03,05,03,03
CYTOLOGY EXAMEN,Epithelial cells,,,Rare,Rare,Rare,Rare,Rare
CYTOLOGY EXAMEN,Vessical/Bladder cells,,,Absence,Absence,Absence,Absence,Absence
CYTOLOGY EXAMEN,Renal cells,,,Absence,Absence,Absence,Absence,Absence
CYTOLOGY EXAMEN,Cast,,,Absence,Absence,Absence,Absence,Absence
CYTOLOGY EXAMEN,Cristals/Crystals,,,Absence,Absence,Absence,Absence,Absence
CYTOLOGY EXAMEN,Bacteries/Bacteria,,,Absence,Absence,Presence +,Absence,Absence
CYTOLOGY EXAMEN,Yeast,,,Absence,Absence,Absence,Absence,Absence
CYTOLOGY EXAMEN,Trichomonas,,,Absence,Absence,Absence,Absence,Absence
URINE BIOCHEMISTRY (Microalbumin Roche),Urine Creatinine,mg/dL,29-226,126.67,104.16,124.52,113.67,38.69
URINE BIOCHEMISTRY (Microalbumin Roche),Urine Microalbumin,mg/L,0.0-20,197,250,169,246,491
URINE BIOCHEMISTRY (Microalbumin Roche),Microalbumin/Cre Ratio,mg/g,0.0-30,155.52,240.01,135.72,216.42,1269.06
ENZYMOLOGY,AST (Aspartate Aminotrans.),U/L,0-32,18,17,18,24,17
ENZYMOLOGY,ALT (Alanine Aminotrans.),U/L,0-33,8,10,8,10,12
ELECTROLYTES,Sodium (Na+),mmol/L,135-145,141,138,138,141,143
ELECTROLYTES,Potassium (K+),mmol/L,3.5-5.5,5.2,5.4,5.1,5.2,5.4
ELECTROLYTES,Chlorures (Cl-),mmol/L,98-107,105,107,102,107,105
SEROLOGY,Anti-Streptolysine O (ASO),UI/ML,NR: < 200,,,,91.5,
SEROLOGY,C-Reactive Protein (CRP),mg/L,N: < 6,,,,2.86,
SEROLOGY,Rheumatoid Factors,UI/ML,N: < 20,,,,14.30,
THYROIDS,TSH (Thyreotrope),uIU/ml,0.27-4.20,3.950,,,,`,b={"Urea Nitrogen (BUN)":`BUN`,"Hb A1c % (DCCT/NGSP)":`HbA1c (%)`,"Hb A1c (acc to IFCC)":`HbA1c (IFCC)`,"Microalbumin/Cre Ratio":`Microalbumin / creatinine ratio`,"White blood cell":`White blood cells`,"Red blood cell":`Red blood cells`,"Chlorures (Cl-)":`Chloride`,"Cristals/Crystals":`Crystals`,"Bacteries/Bacteria":`Bacteria`,"Vessical/Bladder cells":`Bladder cells`},x=[{code:`kidney`,title:`Kidney function`},{code:`diabetes`,title:`Diabetes`},{code:`anemia`,title:`Anemia`},{code:`mineral-bone`,title:`Mineral and bone`},{code:`urine`,title:`Urine`},{code:`inflammation`,title:`Inflammation`},{code:`liver`,title:`Liver`},{code:`lipids`,title:`Lipids`},{code:`thyroid`,title:`Thyroid`},{code:`other`,title:`Other tests`}],S=new Map([[`GLYCOSYLATED HAEMOGLOBIN (Roche)||Hb A1c (acc to IFCC)`,`GLYCOSYLATED HAEMOGLOBIN (Roche)||Hb A1c % (DCCT/NGSP)`],[`URINE BIOCHEMISTRY (Microalbumin Roche)||Urine Creatinine`,`URINE BIOCHEMISTRY (Microalbumin Roche)||Microalbumin/Cre Ratio`],[`URINE BIOCHEMISTRY (Microalbumin Roche)||Urine Microalbumin`,`URINE BIOCHEMISTRY (Microalbumin Roche)||Microalbumin/Cre Ratio`]]),C=u(y),w=new Map(C.map((e,t)=>[h(e),_(e,t)])),T=x.map(e=>{let t=C.filter(t=>g(t)===e.code&&!S.has(h(t))).map(e=>{let t=h(e),n=w.get(t);if(!n)throw Error(`Missing Legacy DCM result fixture for ${t}`);let r=[...S.entries()].filter(([,e])=>e===t).map(([e])=>w.get(e)).filter(e=>!!e);return{result:n,children:r.length>0?r:void 0}});return{...e,items:t}}).filter(e=>e.items.length>0),E=`${v[0]}T08:00:00Z`,D={primary:T.flatMap(e=>e.items).length,table:C.length}}));function k(){let[e,t]=(0,j.useState)(!1);return(0,A.jsx)(a,{latestDrawAt:E,onRetry:()=>t(!0),sections:T,state:e?`ready`:`error`})}var A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J;t((()=>{A=r(),j=e(n()),O(),i(),s(),c(),{expect:M,userEvent:N,waitFor:P,within:F}=__STORYBOOK_MODULE_TEST__,I={title:`Clinic/Clinical/Results/Lab history browser`,component:a,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:{...l,intake:{decision:`DOMAIN-ADAPT`,owner:`src/features/results/lab-history-browser.tsx`,source:`Legacy DCM LabHistory patient-level all-results view`,evidence:`The existing episode flowsheet covers one result episode, while the Legacy DCM source proves a distinct patient-level job: scanning 57 primary analytes across five draws without losing 60-row report fidelity.`,exclusions:`Legacy raw colors, local icon imports, hover-only detail, unvalidated critical heuristics, and decorative card chrome were not carried forward.`},binding:{...l.binding,responsive:`clinical-system reflow at 320px; the raw history table scrolls intentionally`}},docs:{description:{component:`Patient-level lab history groups 57 primary analytes by clinical system while preserving all 60 report rows in the raw table.`}}},args:{latestDrawAt:E,sections:T}},L={play:async({canvasElement:e})=>{let t=F(e);await M(t.getByRole(`heading`,{name:`All tests`})).toBeVisible(),await M(t.getByRole(`tab`,{name:/All tests/})).toHaveTextContent(String(D.primary)),await M(t.getByRole(`tab`,{name:/Table/})).toHaveTextContent(String(D.table)),await M(t.getByRole(`heading`,{name:/Kidney function/})).toBeVisible(),await M(t.getByText(`Creatinine`)).toBeVisible()}},R={play:async({canvasElement:e})=>{let t=F(e);await N.click(t.getByRole(`button`,{name:/Collapse all/})),await P(async()=>{await M(t.queryByText(`Creatinine`)).not.toBeInTheDocument()}),await N.click(t.getByRole(`button`,{name:/Expand all/})),await M(t.getByText(`Creatinine`)).toBeVisible()}},z={play:async({canvasElement:e})=>{let t=F(e);await N.type(t.getByRole(`searchbox`,{name:`Search lab results`}),`TSH`),await M(t.getByText(`TSH (Thyreotrope)`)).toBeVisible(),await M(t.queryByText(`BUN`)).not.toBeInTheDocument(),await M(t.getByRole(`status`)).toHaveTextContent(`Showing 1 of 57 primary analytes`)}},B={args:{initialView:`overview`},play:async({canvasElement:e})=>{let t=F(e);await M(t.getByRole(`heading`,{name:`Overview`})).toBeVisible(),await M(t.getByRole(`heading`,{name:`Needs review`})).toBeVisible(),await M(t.getByText(`Creatinine`)).toBeVisible()}},V={args:{initialLatestOnly:!0},play:async({canvasElement:e})=>{let t=F(e);await M(t.getByRole(`switch`,{name:`Latest only`})).toHaveAttribute(`data-checked`),await M(t.getByRole(`status`)).toHaveTextContent(/Showing \d+ of 57 primary analytes/),await M(t.queryByText(`HbA1c (%)`)).not.toBeInTheDocument()}},H={args:{initialView:`table`},play:async({canvasElement:e})=>{let t=F(e);await M(t.getByRole(`heading`,{name:`Table`})).toBeVisible(),await M(t.getByRole(`columnheader`,{name:`Test`})).toBeVisible(),await M(t.getByRole(`rowheader`,{name:/Urine Creatinine/})).toBeVisible(),await M(t.getAllByRole(`row`)).toHaveLength(D.table+1)}},U={args:{state:`offline`}},W={args:{state:`loading`}},G={args:{sections:[],state:`empty`}},K={render:()=>(0,A.jsx)(k,{}),play:async({canvasElement:e})=>{let t=F(e);await N.click(t.getByRole(`button`,{name:`Retry`})),await P(async()=>{await M(t.getByRole(`heading`,{name:`All tests`})).toBeVisible()})}},q={parameters:{viewport:{defaultViewport:`kura320`}},render:e=>(0,A.jsx)(`div`,{className:`${o.frame} ${o.w320}`,children:(0,A.jsx)(a,{...e})}),play:async({canvasElement:e})=>{let t=F(e);await M(t.getByText(`Creatinine`)).toBeVisible(),await M(t.getByRole(`switch`,{name:`Latest only`})).toBeVisible(),await M(e.scrollWidth).toBeLessThanOrEqual(e.clientWidth)}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", {
      name: "All tests"
    })).toBeVisible();
    await expect(canvas.getByRole("tab", {
      name: /All tests/
    })).toHaveTextContent(String(LEGACY_LAB_HISTORY_COUNTS.primary));
    await expect(canvas.getByRole("tab", {
      name: /Table/
    })).toHaveTextContent(String(LEGACY_LAB_HISTORY_COUNTS.table));
    await expect(canvas.getByRole("heading", {
      name: /Kidney function/
    })).toBeVisible();
    await expect(canvas.getByText("Creatinine")).toBeVisible();
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", {
      name: /Collapse all/
    }));
    await waitFor(async () => {
      await expect(canvas.queryByText("Creatinine")).not.toBeInTheDocument();
    });
    await userEvent.click(canvas.getByRole("button", {
      name: /Expand all/
    }));
    await expect(canvas.getByText("Creatinine")).toBeVisible();
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("searchbox", {
      name: "Search lab results"
    }), "TSH");
    await expect(canvas.getByText("TSH (Thyreotrope)")).toBeVisible();
    await expect(canvas.queryByText("BUN")).not.toBeInTheDocument();
    await expect(canvas.getByRole("status")).toHaveTextContent("Showing 1 of 57 primary analytes");
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    initialView: "overview"
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", {
      name: "Overview"
    })).toBeVisible();
    await expect(canvas.getByRole("heading", {
      name: "Needs review"
    })).toBeVisible();
    await expect(canvas.getByText("Creatinine")).toBeVisible();
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    initialLatestOnly: true
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("switch", {
      name: "Latest only"
    })).toHaveAttribute("data-checked");
    await expect(canvas.getByRole("status")).toHaveTextContent(/Showing \\d+ of 57 primary analytes/);
    await expect(canvas.queryByText("HbA1c (%)")).not.toBeInTheDocument();
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    initialView: "table"
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", {
      name: "Table"
    })).toBeVisible();
    await expect(canvas.getByRole("columnheader", {
      name: "Test"
    })).toBeVisible();
    await expect(canvas.getByRole("rowheader", {
      name: /Urine Creatinine/
    })).toBeVisible();
    await expect(canvas.getAllByRole("row")).toHaveLength(LEGACY_LAB_HISTORY_COUNTS.table + 1);
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    state: "offline"
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    state: "loading"
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    sections: [],
    state: "empty"
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <ErrorRecoveryStory />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", {
      name: "Retry"
    }));
    await waitFor(async () => {
      await expect(canvas.getByRole("heading", {
        name: "All tests"
      })).toBeVisible();
    });
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: "kura320"
    }
  },
  render: args => <div className={\`\${styles.frame} \${styles.w320}\`}>
      <LabHistoryBrowser {...args} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Creatinine")).toBeVisible();
    await expect(canvas.getByRole("switch", {
      name: "Latest only"
    })).toBeVisible();
    await expect(canvasElement.scrollWidth).toBeLessThanOrEqual(canvasElement.clientWidth);
  }
}`,...q.parameters?.docs?.source}}},J=[`AllPatientResults`,`CollapseAndRestoreClinicalSystems`,`SearchAcrossHistory`,`NeedsReviewOverview`,`LatestDrawOnly`,`RawReportTable`,`OfflineCached`,`Loading`,`Empty`,`ErrorAndRecovery`,`MobileWidth320`]}))();export{L as AllPatientResults,R as CollapseAndRestoreClinicalSystems,G as Empty,K as ErrorAndRecovery,V as LatestDrawOnly,W as Loading,q as MobileWidth320,B as NeedsReviewOverview,U as OfflineCached,H as RawReportTable,z as SearchAcrossHistory,J as __namedExportsOrder,I as default};