import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{t as n}from"./ui-C9kmmzkH.js";import{t as r}from"./button-B6_zsN5-.js";import{n as i,t as a}from"./subject-header-D_ExgzJI.js";var o,s,c,l,u,d,f,p,m,h,g,_,v,y,b;e((()=>{o=t(),n(),i(),{expect:s,within:c}=__STORYBOOK_MODULE_TEST__,l={title:`Design System/Clinical Components/Subject Header`,component:a,tags:[`autodocs`,`source-kura-ui-kit`,`source-kura-legacy`,`adapted-kura`],parameters:{layout:`padded`,kura:{intake:{decision:`DOMAIN-ADAPT (upstream ui-kit organism)`,owner:`src/components/shared/subject-header`,evidence:"Upstream Kura ui-kit ships `Organisms/SubjectHeader`, mounted in the receptionist WizardLayout header slot for all six check-in steps; the legacy receptionist prototype ships the same strip as `PatientHeader` above the stepper. Both share one anatomy: avatar → name → dot/pill metadata → trailing state. Named for the subject rather than the patient because collection mounts it for a draw worksheet about the same person.",exclusions:[`Bordered meta chips (ui-kit MetaPill): the Kura surface direction reserves containers for regions with their own state, so metadata stays dot-separated text`,"Next-action pill that jumps a step and pulses the target control (legacy `guideToNextActionTarget`): the wizard footer already owns one primary action, and a second competing CTA in the header breaks the single-primary rule",`Hiding the third meta item below 359px (both upstreams do): our meta order leads with the queue reference and sex at birth, which must not disappear — the row scrolls instead`,`Photo avatars (legacy camera capture) — no capture ceremony exists here`]},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`none — a hairline boundary, not a surface`,icons:`none`,responsive:`two-row grid below 600px; the meta line scrolls rather than truncating`},journeys:[`front-desk-check-in`,`collection-draw`]},docs:{description:{component:`Identity strip for the top of a workflow: who this is, how the desk refers to them today, and one derived state. It answers the question an operator asks before every action — am I working on the right person? Status is a fact, never a button; the page footer keeps the primary action.`}}}},u={name:`Sok Phearom`,nameKhmer:`សុខ ភារ៉ុម`,reference:`Q-027`,dob:`1974-03-15`,sexAtBirth:`Male`,arrivedLabel:`08:24 · 12 min ago`},d={args:{subject:u,status:{label:`Identity captured`,variant:`success`}},play:async({canvasElement:e})=>{let t=c(e);await s(t.getByRole(`heading`,{name:/Sok Phearom/})).toBeVisible(),await s(t.getByText(`Q-027`)).toBeVisible(),await s(t.getByText(/15 Mar 1974 · \d+y/)).toBeVisible(),await s(t.getByText(`Identity captured`)).toBeVisible()}},f={args:{subject:{reference:`Q-028`,arrivedLabel:`Just now`},status:{label:`Awaiting check-in`,variant:`info`}},play:async({canvasElement:e})=>{let t=c(e);await s(t.getByRole(`heading`,{name:`New visit`})).toBeVisible(),await s(t.getByText(`Q-028`)).toBeVisible()}},p={args:{subject:{...u,name:`Chenda Sreymom`,nameKhmer:`ចិន្តា ស្រីមុំ`},status:{label:`Phone unverified`,variant:`warning`}}},m={args:{subject:u,status:{label:`Identity captured`,variant:`success`},actions:(0,o.jsx)(r,{size:`sm`,variant:`outline`,children:`Open record`})}},h={args:{subject:{name:`Sokha Chan`,nameKhmer:`សុខា ចាន់`,reference:`P104481`,dob:`1992-03-14`,sexAtBirth:`Female`,meta:[`Order KO-4471`]},status:{label:`Vitals recorded`,variant:`success`}}},g={args:{subject:{...u,name:`Bopha Sreyleak Chanthavy Rattanakiri`,nameKhmer:`បុប្ផា ស្រីលក្ខណ៍ ចន្ទថាវី`,meta:[`Guardian present`]},status:{label:`Identity captured`,variant:`success`}}},_={args:{subject:{name:`Vibol Keo`,reference:`Q-031`}}},v={args:d.args,globals:{viewport:{value:`kura390`}}},y={args:{...d.args,actions:(0,o.jsx)(r,{size:`sm`,variant:`outline`,children:`Open record`})},globals:{viewport:{value:`kura320`}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    subject: CAPTURED,
    status: {
      label: 'Identity captured',
      variant: 'success'
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: /Sok Phearom/
    })).toBeVisible();
    await expect(canvas.getByText('Q-027')).toBeVisible();
    // Age is derived from the date of birth, never stored.
    await expect(canvas.getByText(/15 Mar 1974 · \\d+y/)).toBeVisible();
    await expect(canvas.getByText('Identity captured')).toBeVisible();
  }
}`,...d.parameters?.docs?.source},description:{story:`A captured identity: name, how the desk calls them, and the facts to read back.`,...d.parameters?.docs?.description}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    subject: {
      reference: 'Q-028',
      arrivedLabel: 'Just now'
    },
    status: {
      label: 'Awaiting check-in',
      variant: 'info'
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'New visit'
    })).toBeVisible();
    await expect(canvas.getByText('Q-028')).toBeVisible();
  }
}`,...f.parameters?.docs?.source},description:{story:`Nothing captured yet. The strip still holds the queue number and arrival —
the two facts that exist before an identity does.`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    subject: {
      ...CAPTURED,
      name: 'Chenda Sreymom',
      nameKhmer: 'ចិន្តា ស្រីមុំ'
    },
    status: {
      label: 'Phone unverified',
      variant: 'warning'
    }
  }
}`,...p.parameters?.docs?.source},description:{story:`Verification is unfinished — the state is loud, but it is still a fact, not a CTA.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    subject: CAPTURED,
    status: {
      label: 'Identity captured',
      variant: 'success'
    },
    actions: <Button size="sm" variant="outline">
        Open record
      </Button>
  }
}`,...m.parameters?.docs?.source},description:{story:`A trailing control is allowed, but only one — this strip is context, not a toolbar.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    subject: {
      name: 'Sokha Chan',
      nameKhmer: 'សុខា ចាន់',
      reference: 'P104481',
      dob: '1992-03-14',
      sexAtBirth: 'Female',
      meta: ['Order KO-4471']
    },
    status: {
      label: 'Vitals recorded',
      variant: 'success'
    }
  }
}`,...h.parameters?.docs?.source},description:{story:`The collection booth names the same person by their booth PID.`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    subject: {
      ...CAPTURED,
      name: 'Bopha Sreyleak Chanthavy Rattanakiri',
      nameKhmer: 'បុប្ផា ស្រីលក្ខណ៍ ចន្ទថាវី',
      meta: ['Guardian present']
    },
    status: {
      label: 'Identity captured',
      variant: 'success'
    }
  }
}`,...g.parameters?.docs?.source},description:{story:`Long names truncate; the meta line keeps every fact.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    subject: {
      name: 'Vibol Keo',
      reference: 'Q-031'
    }
  }
}`,..._.parameters?.docs?.source},description:{story:`No date of birth, no arrival — the strip renders only what it actually has.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  globals: {
    viewport: {
      value: 'kura390'
    }
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    actions: <Button size="sm" variant="outline">
        Open record
      </Button>
  },
  globals: {
    viewport: {
      value: 'kura320'
    }
  }
}`,...y.parameters?.docs?.source}}},b=[`Default`,`BlankWalkIn`,`NeedsVerification`,`WithAction`,`CollectionBooth`,`LongName`,`SparseFacts`,`Mobile`,`Mobile320`]}))();export{f as BlankWalkIn,h as CollectionBooth,d as Default,g as LongName,v as Mobile,y as Mobile320,p as NeedsVerification,_ as SparseFacts,m as WithAction,b as __namedExportsOrder,l as default};