import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{a as i,o as a,r as o,s,t as c,y as l}from"./storybook-metadata-CwrABL_1.js";import{n as u,t as d}from"./icd10-diagnosis-rail-BWCZCQBk.js";function f({selectedIds:e=[],onAdd:t,onRemove:n,...r}){let[i,a]=(0,m.useState)(e);return(0,p.jsx)(d,{...r,selectedIds:i,onAdd:e=>{a(t=>t.includes(e.id)?t:[...t,e.id]),t(e)},onRemove:e=>{a(t=>t.filter(t=>t!==e.id)),n(e)}})}var p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O;t((()=>{p=r(),m=e(n()),l(),u(),o(),{expect:h,fn:g,userEvent:_,within:v}=__STORYBOOK_MODULE_TEST__,y={title:`Clinic/Clinical/Patients/ICD-10 diagnosis rail`,component:d,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`padded`,kura:{...c,intake:{decision:`FEATURE-OWN`,owner:`src/features/patients/icd10-diagnosis-rail.tsx`,level:`clinical rail`,evidence:`The rail owns draft-only ICD-10 selection, touch-operable AI evidence, and a Kura multi-select search while the caller owns terminology, persistence, verification, and signing.`,exclusions:[`No live WHO terminology service, diagnosis persistence, signer, audit event, or prescription state exists in the current platform.`,`Selection is caller-owned draft state. A selected code is not clinically verified, signed, or saved.`,`The prescribing flow uses selection as a draft gate; no signed diagnosis-verification contract exists.`]},source:`FINAL DCM/src/components/DiagnoseGuide/DiagnosisReview.tsx (legacy)`,binding:{...c.binding,elevation:`combobox-popover-only`,motion:`kura control and overlay tokens`,responsive:`single-column rail`}},docs:{description:{component:`A draft-only diagnosis rail for reviewing proposed ICD-10 codes, viewing AI evidence, and selecting an indication before medication review.`}}},args:{suggestions:i,searchCandidates:s,flaggedLabs:a,selectedIds:[],onAdd:g(),onRemove:g(),onContinue:g()},decorators:[e=>(0,p.jsx)(`div`,{style:{maxInlineSize:`360px`},children:(0,p.jsx)(e,{})})],render:e=>(0,p.jsx)(f,{...e})},b={play:async({canvasElement:e})=>{let t=v(e);await h(t.getByRole(`heading`,{name:`Select diagnosis`})).toBeVisible(),await h(t.getByText(`Draft only — not verified or saved.`)).toBeVisible(),await h(t.getByRole(`button`,{name:`Review medicines`})).toBeDisabled();let n=t.getByRole(`checkbox`,{name:/Add N18\.3/}).closest(`[data-slot="item"]`);if(!n)throw Error(`The first diagnosis proposal is missing its item surface.`);await h(n).toHaveAttribute(`data-variant`,`default`)}},x={play:async({canvasElement:e})=>{let t=v(e);await _.click(t.getByRole(`button`,{name:`View evidence for E11.65`})),await h(t.getByText(/Review before adding to this draft/i)).toBeVisible()}},S={play:async({args:e,canvasElement:t})=>{let n=v(t),r=n.getByRole(`button`,{name:`Review medicines`});await _.click(n.getByRole(`checkbox`,{name:/Add N18\.3/})),await h(r).toBeEnabled(),await h(n.getByRole(`checkbox`,{name:/Remove N18\.3/})).toBeChecked(),await _.click(r),await h(e.onContinue).toHaveBeenCalled()}},C={play:async({canvasElement:e})=>{let t=v(e),n=t.getByRole(`combobox`,{name:`Search diagnoses`}),r=v(e.ownerDocument.body);await _.type(n,`fatty`),await h(await r.findByRole(`option`,{name:/Fatty \(change of\) liver/})).toBeVisible(),await _.keyboard(`{ArrowDown}{Enter}`),await h(t.getByRole(`checkbox`,{name:/Remove K76\.0/})).toBeChecked(),await h(t.getByRole(`button`,{name:`Review medicines`})).toBeEnabled()}},w={play:async({canvasElement:e})=>{let t=v(e),n=v(e.ownerDocument.body);await _.type(t.getByRole(`combobox`,{name:`Search diagnoses`}),`zzz`),await h(await n.findByText(`No matching diagnosis. Try a code or name.`)).toBeVisible()}},T={args:{selectedIds:[`legacy-e11-65`,`legacy-n18-3`]}},E={args:{suggestions:[{...i[0],label:`Type 2 diabetes mellitus with hyperglycemia and extensive longitudinal treatment review`}]}},D={globals:{viewport:{value:`kura320`}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", {
      name: "Select diagnosis"
    })).toBeVisible();
    await expect(canvas.getByText("Draft only — not verified or saved.")).toBeVisible();
    await expect(canvas.getByRole("button", {
      name: "Review medicines"
    })).toBeDisabled();
    const firstSuggestion = canvas.getByRole("checkbox", {
      name: /Add N18\\.3/
    }).closest<HTMLElement>('[data-slot="item"]');
    if (!firstSuggestion) {
      throw new Error("The first diagnosis proposal is missing its item surface.");
    }
    await expect(firstSuggestion).toHaveAttribute("data-variant", "default");
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", {
      name: "View evidence for E11.65"
    }));
    await expect(canvas.getByText(/Review before adding to this draft/i)).toBeVisible();
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const next = canvas.getByRole("button", {
      name: "Review medicines"
    });
    await userEvent.click(canvas.getByRole("checkbox", {
      name: /Add N18\\.3/
    }));
    await expect(next).toBeEnabled();
    await expect(canvas.getByRole("checkbox", {
      name: /Remove N18\\.3/
    })).toBeChecked();
    await userEvent.click(next);
    await expect(args.onContinue).toHaveBeenCalled();
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const search = canvas.getByRole("combobox", {
      name: "Search diagnoses"
    });
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.type(search, "fatty");
    await expect(await body.findByRole("option", {
      name: /Fatty \\(change of\\) liver/
    })).toBeVisible();
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await expect(canvas.getByRole("checkbox", {
      name: /Remove K76\\.0/
    })).toBeChecked();
    await expect(canvas.getByRole("button", {
      name: "Review medicines"
    })).toBeEnabled();
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.type(canvas.getByRole("combobox", {
      name: "Search diagnoses"
    }), "zzz");
    await expect(await body.findByText("No matching diagnosis. Try a code or name.")).toBeVisible();
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    selectedIds: ["legacy-e11-65", "legacy-n18-3"]
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    suggestions: [{
      ...DEMO_LEGACY_ICD10_DIAGNOSIS_SUGGESTIONS[0],
      label: "Type 2 diabetes mellitus with hyperglycemia and extensive longitudinal treatment review"
    }]
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  globals: {
    viewport: {
      value: "kura320"
    }
  }
}`,...D.parameters?.docs?.source}}},O=[`Default`,`EvidenceOnDemand`,`SelectAndContinue`,`SearchAndAdd`,`NoCloseMatch`,`Selected`,`LongContent`,`MobileWidth320`]}))();export{b as Default,x as EvidenceOnDemand,E as LongContent,D as MobileWidth320,w as NoCloseMatch,C as SearchAndAdd,S as SelectAndContinue,T as Selected,O as __namedExportsOrder,y as default};