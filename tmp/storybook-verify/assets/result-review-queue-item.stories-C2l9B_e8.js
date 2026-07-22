import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{S as n,v as r}from"./demo-data-lOaHj2eX.js";import{n as i,t as a}from"./result-review-queue-item--VJBC38a.js";import{n as o,t as s}from"./storybook-metadata-BMnyaNTp.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x;e((()=>{c=t(),n(),i(),o(),{expect:l,fn:u,userEvent:d,within:f}=__STORYBOOK_MODULE_TEST__,p={title:`Clinic/Clinical/Results/Review queue item`,component:a,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`centered`,kura:{...s,intake:{decision:`DOMAIN-ADAPT`,owner:`src/features/results`,evidence:`The canonical Item and Avatar own navigation and identity anatomy; Results adds the cross-patient safety contract, result status, and route into per-patient review.`,exclusions:[`This item does not display analyte values or acknowledge a result.`,`LabResultRow remains the owner of analyte detail inside one patient workspace.`]},hierarchy:{level:`Molecule`,children:[`Item`,`Avatar`,`Badge`]}}},args:{entry:r[0],onOpen:u()},render:e=>(0,c.jsx)(`div`,{style:{width:`min(38rem, calc(100vw - 2rem))`},children:(0,c.jsx)(a,{...e})})},m={play:async({args:e,canvasElement:t})=>{let n=f(t);await l(n.getByText(`Dara Phally`)).toBeVisible(),await l(n.getByText(/MRN MK-10482/)).toBeVisible(),await d.click(n.getByRole(`link`,{name:/Dara Phally/})),await l(e.onOpen).toHaveBeenCalledWith(r[0])}},h={args:{entry:{...r[1],testName:`Potassium`,returnedLabel:`12 minutes ago`,status:`critical`}}},g={args:{entry:r[3]}},_={args:{entry:r[2]}},v={args:{disabled:!0,unavailableReason:`Ask a clinic administrator for Results access.`},play:async({canvasElement:e})=>{let t=e.querySelector(`[data-slot="item"]`);await l(t).toHaveAttribute(`aria-disabled`,`true`),await l(t).not.toHaveAttribute(`href`),await l(f(e).queryByRole(`link`)).not.toBeInTheDocument()}},y={args:{entry:{...r[0],patient:{...r[0].patient,name:`Chanthavysouk Keomanivong-Rattanakosin`,medicalRecordNumber:`KURA-CENTRAL-00010482`},testName:`Comprehensive metabolic and renal function panel`}}},b={parameters:{viewport:{defaultViewport:`kura320`}},args:y.args},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Dara Phally')).toBeVisible();
    await expect(canvas.getByText(/MRN MK-10482/)).toBeVisible();
    await userEvent.click(canvas.getByRole('link', {
      name: /Dara Phally/
    }));
    await expect(args.onOpen).toHaveBeenCalledWith(RESULT_REVIEW_QUEUE[0]);
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      ...RESULT_REVIEW_QUEUE[1],
      testName: 'Potassium',
      returnedLabel: '12 minutes ago',
      status: 'critical'
    }
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    entry: RESULT_REVIEW_QUEUE[3]
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    entry: RESULT_REVIEW_QUEUE[2]
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    unavailableReason: 'Ask a clinic administrator for Results access.'
  },
  play: async ({
    canvasElement
  }) => {
    const item = canvasElement.querySelector('[data-slot="item"]');
    await expect(item).toHaveAttribute('aria-disabled', 'true');
    await expect(item).not.toHaveAttribute('href');
    await expect(within(canvasElement).queryByRole('link')).not.toBeInTheDocument();
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    entry: {
      ...RESULT_REVIEW_QUEUE[0],
      patient: {
        ...RESULT_REVIEW_QUEUE[0].patient,
        name: 'Chanthavysouk Keomanivong-Rattanakosin',
        medicalRecordNumber: 'KURA-CENTRAL-00010482'
      },
      testName: 'Comprehensive metabolic and renal function panel'
    }
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  args: LongIdentity.args
}`,...b.parameters?.docs?.source}}},x=[`Abnormal`,`Critical`,`Amended`,`Routine`,`PermissionRestricted`,`LongIdentity`,`MobileWidth320`]}))();export{m as Abnormal,g as Amended,h as Critical,y as LongIdentity,b as MobileWidth320,v as PermissionRestricted,_ as Routine,x as __namedExportsOrder,p as default};