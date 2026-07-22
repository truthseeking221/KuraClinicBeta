import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{O as n,Wt as r,g as i,q as a}from"./provider-marks-BeHzyBjc.js";import{t as o}from"./ui-C9kmmzkH.js";import{t as s}from"./segmented-toggle-DDpNscFF.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;e((()=>{c=t(),o(),{expect:l,userEvent:u,within:d}=__STORYBOOK_MODULE_TEST__,f={title:`Design System/Patterns/SegmentedToggle`,component:s,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`Kura keeps radiogroup semantics for mutually-exclusive modes while adopting Kura track, selected surface, and compact density.`},source:{vendor:`Kura`,registryItem:`segmented-control`,visualReference:`Kura segmented-control`},binding:{colors:`kura-semantic`,typography:`delegated-to-kura-button`,spacing:`kura`,radius:`kura`,elevation:`kura-level-2 selected surface and focus ring`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`fluid under 480px with coarse-pointer touch targets`},exclusions:[{capability:`Multi-select checkbox group`,reason:`Kura uses ChoiceList for multi-select choices so labels, validation, and consequences remain explicit.`,replacement:`Use the canonical ChoiceList owner when more than one option may be selected.`},{capability:`Navigation tabs`,reason:`Tabs represent peer sections, while SegmentedToggle changes a compact mode or filter in the current context.`,replacement:`Use Tabs for view navigation and ButtonGroup for non-selecting action composition.`}]}}},p=[{value:`overview`,label:`Overview`},{value:`timeline`,label:`Timeline`},{value:`audit`,label:`Audit`}],m={args:{label:`Visit detail mode`,options:p,defaultValue:`overview`},play:async({canvasElement:e})=>{let t=d(e),n=t.getByRole(`radio`,{name:`Timeline`});await u.click(n),await l(n).toHaveAttribute(`aria-checked`,`true`),await u.keyboard(`{ArrowLeft}`),await l(t.getByRole(`radio`,{name:`Overview`})).toHaveAttribute(`aria-checked`,`true`)}},h={args:{label:`Result filter mode`,options:[{value:`all`,label:`All results`},{value:`review`,label:`Needs review`}],defaultValue:`all`}},g={args:{label:`Lab unit system`,options:[{value:`conventional`,label:`Conventional`},{value:`si`,label:`SI`}],defaultValue:`conventional`},play:async({canvasElement:e})=>{let t=d(e),n=t.getByRole(`radio`,{name:`Conventional`}),r=t.getByRole(`radio`,{name:`SI`});await u.click(r),await u.click(n),await u.click(r),await l(r).toHaveAttribute(`aria-checked`,`true`),await l(n).toHaveAttribute(`aria-checked`,`false`),await l(e.querySelectorAll(`[data-slot="segmented-toggle-indicator"]`)).toHaveLength(1)}},_={args:{label:`Reporting period`,options:[{value:`daily`,label:`Daily`,leadingIcon:(0,c.jsx)(i,{"aria-hidden":`true`,size:14})},{value:`weekly`,label:`Weekly`,leadingIcon:(0,c.jsx)(a,{"aria-hidden":`true`,size:14})},{value:`monthly`,label:`Monthly`,leadingIcon:(0,c.jsx)(r,{"aria-hidden":`true`,size:14})},{value:`yearly`,label:`Yearly`,leadingIcon:(0,c.jsx)(n,{"aria-hidden":`true`,size:14})}],defaultValue:`monthly`},render:e=>(0,c.jsx)(`div`,{className:`w-80 max-w-full`,children:(0,c.jsx)(s,{...e})})},v={args:{label:`Visit detail mode`,options:[{value:`overview`,label:`Overview`},{value:`timeline`,label:`Timeline`,disabled:!0},{value:`audit`,label:`Audit`}],defaultValue:`overview`}},y={args:{label:`Unavailable mode`,options:p,defaultValue:`overview`,disabled:!0}},b={parameters:{viewport:{defaultViewport:`mobile1`}},args:{label:`Consultation record mode`,options:[{value:`current`,label:`Current consultation`},{value:`previous`,label:`Previous consultations`}],defaultValue:`current`}},x={args:{label:`Density result mode`,options:p},render:()=>(0,c.jsx)(`div`,{className:`flex flex-wrap items-start gap-6`,children:[`compact`,`cozy`,`comfortable`].map(e=>(0,c.jsxs)(`div`,{"data-density":e,className:`flex flex-col items-center gap-2`,children:[(0,c.jsx)(s,{label:`${e} result mode`,options:p}),(0,c.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:e})]},e))})},S={args:{label:`Sex at birth`,labelVisible:!0,options:[{value:`female`,label:`Female`},{value:`male`,label:`Male`}]},play:async({canvasElement:e})=>{let t=d(e);await l(t.getByText(`Sex at birth`)).toBeVisible(),await l(t.getByRole(`radiogroup`,{name:`Sex at birth`})).toBeInTheDocument()}},C={args:{label:`Sex at birth`,labelVisible:!0,value:``,options:[{value:`female`,label:`Female`},{value:`male`,label:`Male`}]},play:async({canvasElement:e})=>{let t=d(e),n=t.getByRole(`radio`,{name:`Female`}),r=t.getByRole(`radio`,{name:`Male`});await l(n).toHaveAttribute(`aria-checked`,`false`),await l(r).toHaveAttribute(`aria-checked`,`false`),await l(n).toHaveAttribute(`tabindex`,`0`)}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Visit detail mode',
    options: viewOptions,
    defaultValue: 'overview'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const timeline = canvas.getByRole('radio', {
      name: 'Timeline'
    });
    await userEvent.click(timeline);
    await expect(timeline).toHaveAttribute('aria-checked', 'true');
    await userEvent.keyboard('{ArrowLeft}');
    await expect(canvas.getByRole('radio', {
      name: 'Overview'
    })).toHaveAttribute('aria-checked', 'true');
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Result filter mode',
    options: [{
      value: 'all',
      label: 'All results'
    }, {
      value: 'review',
      label: 'Needs review'
    }],
    defaultValue: 'all'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Lab unit system',
    options: [{
      value: 'conventional',
      label: 'Conventional'
    }, {
      value: 'si',
      label: 'SI'
    }],
    defaultValue: 'conventional'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const conventional = canvas.getByRole('radio', {
      name: 'Conventional'
    });
    const si = canvas.getByRole('radio', {
      name: 'SI'
    });
    await userEvent.click(si);
    await userEvent.click(conventional);
    await userEvent.click(si);
    await expect(si).toHaveAttribute('aria-checked', 'true');
    await expect(conventional).toHaveAttribute('aria-checked', 'false');
    await expect(canvasElement.querySelectorAll('[data-slot="segmented-toggle-indicator"]')).toHaveLength(1);
  }
}`,...g.parameters?.docs?.source},description:{story:`Rapid changes retarget the same indicator instead of cross-fading two selected surfaces.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Reporting period',
    options: [{
      value: 'daily',
      label: 'Daily',
      leadingIcon: <CalendarIcon aria-hidden="true" size={14} />
    }, {
      value: 'weekly',
      label: 'Weekly',
      leadingIcon: <HistoryIcon aria-hidden="true" size={14} />
    }, {
      value: 'monthly',
      label: 'Monthly',
      leadingIcon: <UserMultipleIcon aria-hidden="true" size={14} />
    }, {
      value: 'yearly',
      label: 'Yearly',
      leadingIcon: <ClockIcon aria-hidden="true" size={14} />
    }],
    defaultValue: 'monthly'
  },
  render: args => <div className="w-80 max-w-full">
      <SegmentedToggle {...args} />
    </div>
}`,..._.parameters?.docs?.source},description:{story:`Kura segmented-control finish with canonical Kura icons and mode semantics.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Visit detail mode',
    options: [{
      value: 'overview',
      label: 'Overview'
    }, {
      value: 'timeline',
      label: 'Timeline',
      disabled: true
    }, {
      value: 'audit',
      label: 'Audit'
    }],
    defaultValue: 'overview'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Unavailable mode',
    options: viewOptions,
    defaultValue: 'overview',
    disabled: true
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  args: {
    label: 'Consultation record mode',
    options: [{
      value: 'current',
      label: 'Current consultation'
    }, {
      value: 'previous',
      label: 'Previous consultations'
    }],
    defaultValue: 'current'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Density result mode',
    options: viewOptions
  },
  render: () => <div className="flex flex-wrap items-start gap-6">
      {(['compact', 'cozy', 'comfortable'] as const).map(density => <div key={density} data-density={density} className="flex flex-col items-center gap-2">
          <SegmentedToggle label={\`\${density} result mode\`} options={viewOptions} />
          <span className="text-xs text-muted-foreground">{density}</span>
        </div>)}
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sex at birth',
    labelVisible: true,
    options: [{
      value: 'female',
      label: 'Female'
    }, {
      value: 'male',
      label: 'Male'
    }]
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Sex at birth')).toBeVisible();
    await expect(canvas.getByRole('radiogroup', {
      name: 'Sex at birth'
    })).toBeInTheDocument();
  }
}`,...S.parameters?.docs?.source},description:{story:"Form-field presentation: `labelVisible` renders the accessible name above the segments.",...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sex at birth',
    labelVisible: true,
    value: '',
    options: [{
      value: 'female',
      label: 'Female'
    }, {
      value: 'male',
      label: 'Male'
    }]
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const female = canvas.getByRole('radio', {
      name: 'Female'
    });
    const male = canvas.getByRole('radio', {
      name: 'Male'
    });
    await expect(female).toHaveAttribute('aria-checked', 'false');
    await expect(male).toHaveAttribute('aria-checked', 'false');
    await expect(female).toHaveAttribute('tabindex', '0');
  }
}`,...C.parameters?.docs?.source},description:{story:`Controlled with no value yet: no segment pre-selected; selection only reflects real data.`,...C.parameters?.docs?.description}}},w=[`Default`,`FilterMode`,`RapidRetargeting`,`WithIcons`,`DisabledOption`,`Disabled`,`MobileLongLabels`,`DensityReference`,`VisibleLabel`,`ControlledNoSelection`]}))();export{C as ControlledNoSelection,m as Default,x as DensityReference,y as Disabled,v as DisabledOption,h as FilterMode,b as MobileLongLabels,g as RapidRetargeting,S as VisibleLabel,_ as WithIcons,w as __namedExportsOrder,f as default};