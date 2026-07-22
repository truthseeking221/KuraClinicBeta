import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{Qn as i,Zn as a,t as o}from"./ui-C9kmmzkH.js";import{a as s,l as c,o as l}from"./date-range-picker-CVkMECHY.js";import{c as u,d,i as f,l as p,o as m,r as h,s as g,u as _}from"./settings-modal-DFqsiPWF.js";import{t as v}from"./button-B6_zsN5-.js";var y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F;t((()=>{y=r(),b=e(n()),o(),{expect:x,userEvent:S,within:C}=__STORYBOOK_MODULE_TEST__,w=new Date(2026,6,15),T={title:`Design System/Components/Date Selector`,component:a,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{kura:{intake:{decision:`COMPOSE`,owner:`src/components/ui`,evidence:`Calendar already owns date-grid navigation and selection. Field and Input own form anatomy, while the newly canonical Popover owns anchored disclosure. DateSelector composes these contracts without copying the ReUI implementation.`},source:{vendor:`ReUI`,registryItem:`@reui/date-selector`,sourceUrl:`https://reui.io/components/date-selector`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura-control-and-overlay`,elevation:`kura-popover`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`single-column date range below 480px; Popover remains viewport-contained; Dialog is available for a dedicated mobile task.`},useCase:{primaryTask:`Enter or verify an exact date or inclusive date range with clear bounds.`,dataModel:`A local Date or CalendarRange supplied by the owning form or filter; this primitive performs no request or mutation.`,safety:`Exact date entry remains visible beside the calendar. Availability, booking rules, query semantics, permissions, and persistence stay in the owning feature.`,backendCompatibility:`Generic visual primitive; it introduces no domain action, status, endpoint, or simulated business behavior.`},exclusions:[`ReUI before, after, and between filter operators are query semantics and belong to an owning filter contract.`,`Month, quarter, half-year, and year period selectors are separate report/filter domain controls, not exact-date entry.`,`Natural-language input such as Q4 is excluded because locale parsing and query interpretation need an owning contract.`,`Dropdown-menu presentation is excluded because a persistent date-entry task needs form semantics and a reversible Popover or Dialog surface.`]},docs:{description:{component:`A controlled or uncontrolled exact-date and date-range field. It keeps typed dates and the canonical Calendar synchronized, supports bounds and unavailable dates, and leaves business filtering and availability rules to the feature owner.`}}}},E={args:{defaultValue:new Date(2026,6,15),label:`Review date`,description:`Enter the exact date or select it in the calendar.`,today:w}},D={args:{mode:`range`,defaultValue:{from:new Date(2026,6,6),to:new Date(2026,6,10)},label:`Review period`,description:`The end date cannot be earlier than the start date.`,today:w}},O={args:{defaultValue:new Date(2026,6,7),disabledDates:e=>e.getDay()===0||e.getDay()===6,error:`Choose a weekday from 8 July to 24 July 2026.`,label:`Required review date`,maxDate:new Date(2026,6,24),minDate:new Date(2026,6,8),required:!0,today:w}},k={args:{mode:`range`,defaultValue:{from:new Date(2026,6,9),to:new Date(2026,6,15)},description:`This review period is shown for context and cannot be changed here.`,label:`Recorded review period`,readOnly:!0,today:w}},A={args:{label:`Review date`},render:()=>{let[e,t]=(0,b.useState)(new Date(2026,6,15)),[n,r]=(0,b.useState)(e),[o,u]=(0,b.useState)(!1);return(0,b.useEffect)(()=>{o&&r(e)},[o,e]),(0,y.jsxs)(s,{open:o,onOpenChange:u,children:[(0,y.jsx)(c,{render:(0,y.jsx)(v,{variant:`outline`,children:i(e)||`Select review date`})}),(0,y.jsxs)(l,{"aria-label":`Select review date`,initialFocus:!1,role:`dialog`,children:[(0,y.jsx)(a,{label:`Review date`,onChange:r,today:w,value:n}),(0,y.jsxs)(`div`,{className:`mt-3 flex flex-wrap justify-end gap-2`,children:[(0,y.jsx)(v,{onClick:()=>u(!1),variant:`ghost`,children:`Cancel`}),(0,y.jsx)(v,{onClick:()=>{t(n),u(!1)},children:`Apply date`})]})]})]})},play:async({canvasElement:e})=>{let t=C(e);await S.click(t.getByRole(`button`,{name:/jul 15, 2026/i})),await x(await C(document.body).findByRole(`dialog`,{name:/select review date/i})).toBeVisible()}},j={args:{label:`Review period`},render:()=>{let[e,t]=(0,b.useState)();return(0,y.jsxs)(h,{children:[(0,y.jsx)(d,{asChild:!0,children:(0,y.jsx)(v,{variant:`outline`,children:`Set review period`})}),(0,y.jsxs)(m,{mobilePresentation:`full`,size:`lg`,children:[(0,y.jsxs)(p,{children:[(0,y.jsx)(_,{children:`Select a review period`}),(0,y.jsx)(g,{children:`Use this larger surface when a date decision needs dedicated mobile space.`})]}),(0,y.jsx)(f,{children:(0,y.jsx)(a,{label:`Review period`,mode:`range`,onChange:t,today:w,value:e})}),(0,y.jsx)(u,{children:(0,y.jsx)(v,{children:`Use selected period`})})]})]})}},M={args:{defaultValue:new Date(2026,6,15),label:`Ngày rà soát`,locale:`vi-VN`,today:w,weekStartsOn:1}},N={args:{label:`Review date`},render:()=>(0,y.jsx)(`div`,{className:`grid w-full gap-6 lg:grid-cols-3`,children:[`compact`,`cozy`,`comfortable`].map(e=>(0,y.jsx)(`div`,{"data-density":e,className:`min-w-0`,children:(0,y.jsx)(a,{defaultValue:new Date(2026,6,15),label:`${e} review date`,today:w})},e))})},P={parameters:{viewport:{defaultViewport:`mobile1`}},args:{mode:`range`,defaultValue:{from:new Date(2026,6,6),to:new Date(2026,6,10)},label:`Review period`,today:w}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: new Date(2026, 6, 15),
    label: 'Review date',
    description: 'Enter the exact date or select it in the calendar.',
    today: referenceToday
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'range',
    defaultValue: {
      from: new Date(2026, 6, 6),
      to: new Date(2026, 6, 10)
    },
    label: 'Review period',
    description: 'The end date cannot be earlier than the start date.',
    today: referenceToday
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: new Date(2026, 6, 7),
    disabledDates: (date: Date) => date.getDay() === 0 || date.getDay() === 6,
    error: 'Choose a weekday from 8 July to 24 July 2026.',
    label: 'Required review date',
    maxDate: new Date(2026, 6, 24),
    minDate: new Date(2026, 6, 8),
    required: true,
    today: referenceToday
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'range',
    defaultValue: {
      from: new Date(2026, 6, 9),
      to: new Date(2026, 6, 15)
    },
    description: 'This review period is shown for context and cannot be changed here.',
    label: 'Recorded review period',
    readOnly: true,
    today: referenceToday
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Review date'
  },
  render: () => {
    const [value, setValue] = useState<DateSelectorValue>(new Date(2026, 6, 15));
    const [draft, setDraft] = useState<DateSelectorValue>(value);
    const [open, setOpen] = useState(false);
    useEffect(() => {
      if (open) setDraft(value);
    }, [open, value]);
    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger render={<Button variant="outline">{formatDateSelectorValue(value) || 'Select review date'}</Button>} />
        <PopoverContent aria-label="Select review date" initialFocus={false} role="dialog">
          <DateSelector label="Review date" onChange={setDraft} today={referenceToday} value={draft} />
          <div className="mt-3 flex flex-wrap justify-end gap-2">
            <Button onClick={() => setOpen(false)} variant="ghost">Cancel</Button>
            <Button onClick={() => {
            setValue(draft);
            setOpen(false);
          }}>Apply date</Button>
          </div>
        </PopoverContent>
      </Popover>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: /jul 15, 2026/i
    }));
    await expect(await within(document.body).findByRole('dialog', {
      name: /select review date/i
    })).toBeVisible();
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Review period'
  },
  render: () => {
    const [value, setValue] = useState<DateSelectorValue>();
    return <Dialog>
        <DialogTrigger asChild><Button variant="outline">Set review period</Button></DialogTrigger>
        <DialogContent mobilePresentation="full" size="lg">
          <DialogHeader>
            <DialogTitle>Select a review period</DialogTitle>
            <DialogDescription>Use this larger surface when a date decision needs dedicated mobile space.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <DateSelector label="Review period" mode="range" onChange={setValue} today={referenceToday} value={value} />
          </DialogBody>
          <DialogFooter><Button>Use selected period</Button></DialogFooter>
        </DialogContent>
      </Dialog>;
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: new Date(2026, 6, 15),
    label: 'Ngày rà soát',
    locale: 'vi-VN',
    today: referenceToday,
    weekStartsOn: 1
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Review date'
  },
  render: () => <div className="grid w-full gap-6 lg:grid-cols-3">
      {(['compact', 'cozy', 'comfortable'] as const).map(density => <div key={density} data-density={density} className="min-w-0">
          <DateSelector defaultValue={new Date(2026, 6, 15)} label={\`\${density} review date\`} today={referenceToday} />
        </div>)}
    </div>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  args: {
    mode: 'range',
    defaultValue: {
      from: new Date(2026, 6, 6),
      to: new Date(2026, 6, 10)
    },
    label: 'Review period',
    today: referenceToday
  }
}`,...P.parameters?.docs?.source}}},F=[`Default`,`DateRange`,`ConstraintsAndError`,`ReadOnly`,`WithPopover`,`WithDialog`,`LocaleAndWeekStart`,`DensityModes`,`MobileDefault`]}))();export{O as ConstraintsAndError,D as DateRange,E as Default,N as DensityModes,M as LocaleAndWeekStart,P as MobileDefault,k as ReadOnly,j as WithDialog,A as WithPopover,F as __namedExportsOrder,T as default};