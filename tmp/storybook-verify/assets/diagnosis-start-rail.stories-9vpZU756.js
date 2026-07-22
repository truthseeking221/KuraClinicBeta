import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{Ft as i,a,bt as o,kt as s,nt as c}from"./provider-marks-BeHzyBjc.js";import{t as l}from"./ui-C9kmmzkH.js";import{t as u}from"./button-B6_zsN5-.js";import{a as d,o as f,r as p,s as m,t as h,y as g}from"./storybook-metadata-CwrABL_1.js";import{n as _,t as v}from"./icd10-diagnosis-rail-BWCZCQBk.js";var y,b,x,S,C,w,T,E,D,O,k,A,j=t((()=>{y=`_rail_14nlz_1`,b=`_guide_14nlz_9`,x=`_heroIcon_14nlz_18`,S=`_title_14nlz_30`,C=`_description_14nlz_39`,w=`_steps_14nlz_48`,T=`_step_14nlz_48`,E=`_stepIcon_14nlz_65`,D=`_stepCopy_14nlz_83`,O=`_action_14nlz_103`,k=`_blockedReason_14nlz_110`,A={rail:y,guide:b,heroIcon:x,title:S,description:C,steps:w,step:T,stepIcon:E,stepCopy:D,action:O,blockedReason:k}}));function M({blockedReason:e,onStart:t}){let n=!!e;return(0,N.jsx)(`aside`,{"aria-labelledby":`diagnosis-start-title`,className:A.rail,children:(0,N.jsxs)(`div`,{className:A.guide,children:[(0,N.jsx)(`span`,{"aria-hidden":`true`,className:A.heroIcon,children:(0,N.jsx)(i,{iconStyle:`duotone-rounded`,size:22})}),(0,N.jsx)(`h2`,{className:A.title,id:`diagnosis-start-title`,children:`Ready to diagnose?`}),(0,N.jsx)(`p`,{className:A.description,children:`Confirm diagnoses before treatment.`}),(0,N.jsx)(`ol`,{className:A.steps,children:P.map(e=>{let t=e.icon;return(0,N.jsxs)(`li`,{className:A.step,children:[(0,N.jsx)(`span`,{"aria-hidden":`true`,className:A.stepIcon,"data-ai":e.id===`suggestions`||void 0,children:(0,N.jsx)(t,{iconStyle:`duotone-rounded`,size:24})}),(0,N.jsxs)(`span`,{className:A.stepCopy,children:[(0,N.jsx)(`strong`,{children:e.title}),(0,N.jsx)(`span`,{children:e.description})]})]},e.id)})}),(0,N.jsxs)(`div`,{className:A.action,children:[(0,N.jsx)(u,{"aria-describedby":n?`diagnosis-start-blocked-reason`:void 0,disabled:n,fullWidth:!0,leadingIcon:(0,N.jsx)(i,{"aria-hidden":`true`}),onClick:t,variant:`primary`,children:`Diagnose this patient`}),e?(0,N.jsx)(`p`,{className:A.blockedReason,id:`diagnosis-start-blocked-reason`,children:e}):null]})]})})}var N,P,F=t((()=>{N=r(),l(),j(),P=[{description:`Codes based on abnormal labs.`,icon:a,id:`suggestions`,title:`Review AI ICD-10 suggestions`},{description:`Add a code when needed.`,icon:s,id:`search`,title:`Add or search a diagnosis`},{description:`Keep supporting values linked.`,icon:c,id:`evidence`,title:`Attach labs as evidence`},{description:`Move into treatment once diagnoses are confirmed.`,icon:o,id:`prescribe`,title:`Continue to prescribing`}],M.__docgenInfo={description:`Entry rail for the evidence-to-diagnosis workflow. The four rows orient the
clinician; the single button is the only action on this surface.`,methods:[],displayName:`DiagnosisStartRail`,props:{onStart:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Opens the caller-owned diagnosis review. This rail never writes a diagnosis.`},blockedReason:{required:!1,tsType:{name:`string`},description:`Caller-owned prerequisite or permission reason that prevents starting.`}}}})),I,L,R,z,B,V,H,U,W,G,K,q;t((()=>{I=r(),L=e(n()),g(),F(),_(),p(),{expect:R,fn:z,userEvent:B,within:V}=__STORYBOOK_MODULE_TEST__,H={title:`Clinic/Clinical/Patients/Diagnosis start rail`,component:M,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`padded`,kura:{...h,intake:{decision:`FEATURE-OWN`,owner:`src/features/patients/diagnosis-start-rail.tsx`,level:`clinical rail`,evidence:`Faithfully ports Legacy DCM DiagnoseGuide anatomy into canonical Kura tokens, icons, button behavior, accessibility, and Storybook ownership. The four rows orient; only the final CTA acts.`,exclusions:[`Starting opens a caller-owned draft review; it does not verify, save, sign, or send a diagnosis.`,`AI suggestion provenance is explicit and never presented as clinical truth.`,`The caller owns permissions, prerequisites, terminology, persistence, and audit.`]},source:`FINAL DCM/src/components/DiagnoseGuide/DiagnoseGuide.tsx (legacy)`,binding:{...h.binding,elevation:`none`,icons:`kura-canonical`,motion:`button-owned`,responsive:`single-column rail; compact inset below 360px`}},docs:{description:{component:`The pre-diagnosis rail from Legacy DCM: it explains the evidence-to-diagnosis path and exposes one action to open draft review.`}}},args:{onStart:z()},decorators:[e=>(0,I.jsx)(`div`,{style:{inlineSize:`min(100%, 360px)`,minBlockSize:`760px`},children:(0,I.jsx)(e,{})})]},U={play:async({args:e,canvasElement:t})=>{let n=V(t);await R(n.getByRole(`heading`,{name:`Ready to diagnose?`})).toBeVisible(),await R(n.getAllByRole(`listitem`)).toHaveLength(4);let r=n.getByRole(`button`,{name:`Diagnose this patient`});await B.click(r),await R(e.onStart).toHaveBeenCalledOnce()}},W={args:{blockedReason:`Diagnosis review is unavailable until the remaining results are verified.`},play:async({canvasElement:e})=>{let t=V(e);await R(t.getByRole(`button`,{name:`Diagnose this patient`})).toBeDisabled(),await R(t.getByText(/remaining results are verified/)).toBeVisible()}},G={render:()=>{function e(){let[e,t]=(0,L.useState)(!1),[n,r]=(0,L.useState)([]);return e?(0,I.jsx)(v,{flaggedLabs:f,onAdd:e=>r(t=>[...t,e.id]),onClose:()=>t(!1),onContinue:z(),onRemove:e=>r(t=>t.filter(t=>t!==e.id)),searchCandidates:m,selectedIds:n,suggestions:d}):(0,I.jsx)(M,{onStart:()=>t(!0)})}return(0,I.jsx)(e,{})},play:async({canvasElement:e})=>{let t=V(e);await B.click(t.getByRole(`button`,{name:`Diagnose this patient`})),await R(await t.findByRole(`heading`,{name:`Select diagnosis`})).toBeVisible(),await R(t.getByText(`Draft only — not verified or saved.`)).toBeVisible()}},K={globals:{viewport:{value:`kura320`}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Ready to diagnose?'
    })).toBeVisible();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(4);
    const action = canvas.getByRole('button', {
      name: 'Diagnose this patient'
    });
    await userEvent.click(action);
    await expect(args.onStart).toHaveBeenCalledOnce();
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    blockedReason: 'Diagnosis review is unavailable until the remaining results are verified.'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Diagnose this patient'
    })).toBeDisabled();
    await expect(canvas.getByText(/remaining results are verified/)).toBeVisible();
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => {
    function Harness() {
      const [started, setStarted] = useState(false);
      const [selectedIds, setSelectedIds] = useState<readonly string[]>([]);
      if (!started) return <DiagnosisStartRail onStart={() => setStarted(true)} />;
      return <Icd10DiagnosisRail flaggedLabs={DEMO_LEGACY_ICD10_FLAGGED_LABS} onAdd={candidate => setSelectedIds(current => [...current, candidate.id])} onClose={() => setStarted(false)} onContinue={fn()} onRemove={candidate => setSelectedIds(current => current.filter(id => id !== candidate.id))} searchCandidates={DEMO_LEGACY_ICD10_SEARCH_POOL} selectedIds={selectedIds} suggestions={DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS} />;
    }
    return <Harness />;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Diagnose this patient'
    }));
    await expect(await canvas.findByRole('heading', {
      name: 'Select diagnosis'
    })).toBeVisible();
    await expect(canvas.getByText('Draft only — not verified or saved.')).toBeVisible();
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  globals: {
    viewport: {
      value: 'kura320'
    }
  }
}`,...K.parameters?.docs?.source}}},q=[`Default`,`Blocked`,`OpensDraftReview`,`MobileWidth320`]}))();export{W as Blocked,U as Default,K as MobileWidth320,G as OpensDraftReview,q as __namedExportsOrder,H as default};