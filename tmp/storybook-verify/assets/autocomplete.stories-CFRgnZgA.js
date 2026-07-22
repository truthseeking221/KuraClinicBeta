import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{si as i,t as a}from"./ui-C9kmmzkH.js";import{t as o}from"./button-B6_zsN5-.js";var s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O;t((()=>{s=r(),c=e(n()),a(),{expect:l,userEvent:u,within:d}=__STORYBOOK_MODULE_TEST__,f=[{id:`clinician-jordan-davis`,label:`Dr. Jordan Davis`,description:`Primary care · Downtown Clinic`,group:`Clinicians`,keywords:`doctor primary care downtown`},{id:`clinician-morgan-lee`,label:`Dr. Morgan Lee`,description:`Internal medicine · Riverside Clinic`,group:`Clinicians`,keywords:`doctor internal medicine riverside`},{id:`clinician-sam-taylor`,label:`Sam Taylor, RN`,description:`Care coordination · Downtown Clinic`,group:`Clinicians`,keywords:`nurse care coordination downtown`},{id:`workspace-results`,label:`Results workspace`,description:`Review verified laboratory and imaging results`,group:`Workspaces`,keywords:`laboratory imaging review`},{id:`workspace-operations`,label:`Operations workspace`,description:`Manage access, schedules, and clinic settings`,group:`Workspaces`,keywords:`access schedule settings`},{id:`restricted-archive`,label:`Archived records`,description:`Available only to designated records administrators`,group:`Restricted`,disabled:!0,keywords:`archive administrator`}],p={title:`Design System/Components/Autocomplete`,component:i,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`The fresh Storybook and source search found no canonical search-and-select input, listbox, or searchable-select pattern. The ReUI family supplies the missing interaction foundation, so Kura owns a controlled autocomplete with an authoritative selection contract.`},source:{vendor:`ReUI`,registryItem:`c-autocomplete-1 through c-autocomplete-12`,sourceUrl:`https://reui.io/components/autocomplete`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-popover-desktop-and-inline-mobile`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`floating-desktop-list-to-inline-mobile-results`},useCase:{role:`Clinic staff and workspace users selecting an authoritative person, record, or workspace from a large known list`,primaryTask:`Find and select one verified option without submitting arbitrary free text.`,dataModel:`Stable option ID, label, optional description, group, keywords, and disabled state supplied by the owning workflow.`,safety:`Only an option ID is submitted through the optional hidden field. Search text is not treated as a valid clinical or operational selection.`,outOfScope:`Remote fetching, free-form entry, multi-select tags, patient identity matching, medication safety logic, validation rules, and workflow-specific permissions.`},exclusions:[`The upstream compound Portal, Positioner, Backdrop, Arrow, Separator, and ScrollArea API is replaced by one accessible Kura combobox contract with desktop floating and mobile inline results.`,`Free-form values and implicit form validation are excluded because authoritative workflow data must own selection validity and any clinical consequence.`,`The upstream generic demo lists and form layout are replaced by realistic Kura selection states; form fields, remote loading, and permissions remain composing owners.`]},docs:{description:{component:`A searchable single-select input for authoritative options. It uses a WAI-ARIA combobox/listbox relationship, keyboard navigation, explicit no-results feedback, and a submitted identifier rather than free text.`}}},argTypes:{size:{control:`radio`,options:[`sm`,`md`,`lg`]},autoHighlight:{control:`boolean`},clearable:{control:`boolean`},showTrigger:{control:`boolean`},loading:{control:`boolean`},disabled:{control:`boolean`},readOnly:{control:`boolean`}}},m={args:{items:f,label:`Assign reviewer`,helperText:`Search verified clinicians and workspace roles.`,placeholder:`Search people or workspaces`},play:async({canvasElement:e})=>{let t=d(e),n=t.getByRole(`combobox`,{name:`Assign reviewer`});await u.click(n),await u.type(n,`morgan`),await l(t.getByRole(`option`,{name:/Dr. Morgan Lee/i})).toBeVisible(),await u.keyboard(`{ArrowDown}{Enter}`),await l(n).toHaveValue(`Dr. Morgan Lee`)}},h={args:{items:f,label:`Select workspace`,autoHighlight:!0,defaultOpen:!0,placeholder:`Search workspaces`}},g={args:{items:f,label:`Assigned reviewer`,defaultValue:`clinician-jordan-davis`,clearable:!0,showTrigger:!0}},_={args:{items:f,label:`Open workspace`,defaultOpen:!0,showTrigger:!0}},v={args:{items:f,label:`Find care-team member`,defaultOpen:!0,defaultQuery:`care`,statusMessage:`Results match the current care-team directory.`,clearable:!0,showTrigger:!0}},y={args:{items:[],label:`Find patient record`,defaultOpen:!0,loading:!0,loadingMessage:`Searching the authorized record index…`,placeholder:`Search by verified identifier`}},b={args:{items:f,label:`Find workspace`,defaultOpen:!0,defaultQuery:`nonexistent location`,noResultsMessage:`No workspace matches this search. Try a clinic or workflow name.`}},x={args:{items:f,label:`Assign prescribing clinician`,disabled:!0,disabledReason:`A verified patient identity is required before a prescribing clinician can be assigned.`}},S={args:{items:f,label:`Assigned reviewer`,defaultValue:`clinician-morgan-lee`,readOnly:!0,helperText:`This assignment is locked after review submission.`}},C={args:{items:f,label:`Find clinic workspace`,errorMessage:`The workspace directory is unavailable. Check the connection and try again.`,showTrigger:!0}},w={args:{items:f},render:()=>(0,s.jsxs)(`div`,{className:`grid w-full max-w-xl gap-[var(--space-inset-card)]`,children:[[`sm`,`md`,`lg`].map(e=>(0,s.jsx)(i,{items:f,label:`Reviewer (${e})`,size:e,showTrigger:!0,placeholder:`Search clinician`},e)),[`compact`,`cozy`,`comfortable`].map(e=>(0,s.jsx)(`div`,{"data-density":e,children:(0,s.jsx)(i,{items:f,label:`Reviewer density: ${e}`,showTrigger:!0,placeholder:`Search clinician`})},e))]})},T={args:{items:f},render:()=>{let[e,t]=(0,c.useState)();return(0,s.jsxs)(`form`,{className:`flex w-full max-w-xl flex-col gap-[var(--space-inset-card)]`,onSubmit:e=>e.preventDefault(),children:[(0,s.jsx)(i,{items:f,label:`Assign workflow owner`,name:`workflowOwnerId`,value:e,onValueChange:t,clearable:!0,showTrigger:!0,helperText:`The submitted form value is the selected record ID, not the search text.`}),(0,s.jsxs)(`span`,{className:`k-caption`,children:[`Selected ID: `,e??`None selected`]}),(0,s.jsx)(o,{type:`submit`,disabled:!e,children:`Save assignment`})]})}},E={args:{items:[{id:`long-care-team`,label:`Dr. Alexandra Montgomery-Williams, Consultant in Complex Care Coordination`,description:`Long-term care coordination · North River Community Health Centre · Available for verified referrals only`,group:`Clinicians`},...f],label:`Assign specialist reviewer`,defaultOpen:!0,showTrigger:!0}},D={parameters:{viewport:{defaultViewport:`mobile1`}},args:{items:f,label:`Assign reviewer`,defaultOpen:!0,showTrigger:!0,clearable:!0,helperText:`Results become an inline list on narrow screens.`}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    items: options,
    label: 'Assign reviewer',
    helperText: 'Search verified clinicians and workspace roles.',
    placeholder: 'Search people or workspaces'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox', {
      name: 'Assign reviewer'
    });
    await userEvent.click(input);
    await userEvent.type(input, 'morgan');
    await expect(canvas.getByRole('option', {
      name: /Dr. Morgan Lee/i
    })).toBeVisible();
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await expect(input).toHaveValue('Dr. Morgan Lee');
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    items: options,
    label: 'Select workspace',
    autoHighlight: true,
    defaultOpen: true,
    placeholder: 'Search workspaces'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    items: options,
    label: 'Assigned reviewer',
    defaultValue: 'clinician-jordan-davis',
    clearable: true,
    showTrigger: true
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    items: options,
    label: 'Open workspace',
    defaultOpen: true,
    showTrigger: true
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    items: options,
    label: 'Find care-team member',
    defaultOpen: true,
    defaultQuery: 'care',
    statusMessage: 'Results match the current care-team directory.',
    clearable: true,
    showTrigger: true
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    items: [],
    label: 'Find patient record',
    defaultOpen: true,
    loading: true,
    loadingMessage: 'Searching the authorized record index…',
    placeholder: 'Search by verified identifier'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    items: options,
    label: 'Find workspace',
    defaultOpen: true,
    defaultQuery: 'nonexistent location',
    noResultsMessage: 'No workspace matches this search. Try a clinic or workflow name.'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    items: options,
    label: 'Assign prescribing clinician',
    disabled: true,
    disabledReason: 'A verified patient identity is required before a prescribing clinician can be assigned.'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    items: options,
    label: 'Assigned reviewer',
    defaultValue: 'clinician-morgan-lee',
    readOnly: true,
    helperText: 'This assignment is locked after review submission.'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    items: options,
    label: 'Find clinic workspace',
    errorMessage: 'The workspace directory is unavailable. Check the connection and try again.',
    showTrigger: true
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    items: options
  },
  render: () => <div className="grid w-full max-w-xl gap-[var(--space-inset-card)]">
      {(['sm', 'md', 'lg'] as const).map(size => <Autocomplete key={size} items={options} label={\`Reviewer (\${size})\`} size={size} showTrigger placeholder="Search clinician" />)}
      {(['compact', 'cozy', 'comfortable'] as const).map(density => <div key={density} data-density={density}>
          <Autocomplete items={options} label={\`Reviewer density: \${density}\`} showTrigger placeholder="Search clinician" />
        </div>)}
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    items: options
  },
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return <form className="flex w-full max-w-xl flex-col gap-[var(--space-inset-card)]" onSubmit={event => event.preventDefault()}>
        <Autocomplete items={options} label="Assign workflow owner" name="workflowOwnerId" value={value} onValueChange={setValue} clearable showTrigger helperText="The submitted form value is the selected record ID, not the search text." />
        <span className="k-caption">Selected ID: {value ?? 'None selected'}</span>
        <Button type="submit" disabled={!value}>Save assignment</Button>
      </form>;
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'long-care-team',
      label: 'Dr. Alexandra Montgomery-Williams, Consultant in Complex Care Coordination',
      description: 'Long-term care coordination · North River Community Health Centre · Available for verified referrals only',
      group: 'Clinicians'
    }, ...options],
    label: 'Assign specialist reviewer',
    defaultOpen: true,
    showTrigger: true
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  args: {
    items: options,
    label: 'Assign reviewer',
    defaultOpen: true,
    showTrigger: true,
    clearable: true,
    helperText: 'Results become an inline list on narrow screens.'
  }
}`,...D.parameters?.docs?.source}}},O=[`Default`,`AutoHighlight`,`ClearAndTrigger`,`GroupedResults`,`SearchResults`,`Loading`,`NoResults`,`DisabledWithReason`,`ReadOnly`,`ErrorRecovery`,`SizesAndDensity`,`FormValue`,`LongContent`,`MobileReference`]}))();export{h as AutoHighlight,g as ClearAndTrigger,m as Default,x as DisabledWithReason,C as ErrorRecovery,T as FormValue,_ as GroupedResults,y as Loading,E as LongContent,D as MobileReference,b as NoResults,S as ReadOnly,v as SearchResults,w as SizesAndDensity,O as __namedExportsOrder,p as default};