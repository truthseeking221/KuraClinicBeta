import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{t as i}from"./ui-C9kmmzkH.js";import{r as a}from"./date-range-picker-CVkMECHY.js";var o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O;t((()=>{o=r(),s=e(n()),i(),c=new Date(2026,6,15),l=new Date(2026,6,1),u=new Date(2026,6,15),d={title:`Design System/Components/Calendar`,component:a,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`The fresh Storybook/source search found no canonical date-grid, date-range, or month-navigation primitive. The ReUI family supplies the missing interaction foundation, so Kura owns a domain-neutral Calendar with explicit selection and composition boundaries.`},source:{vendor:`ReUI`,registryItem:`c-calendar-1 through c-calendar-30`,sourceUrl:`https://reui.io/components/calendar`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-flat-and-focus`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`fluid-stacking-and-tertiary-week-number-collapse`},useCase:{role:`Clinic staff and patients in date-based workflows`,primaryTask:`Choose or review a date or date range with clear constraints.`,dataModel:`Date, date array, or from/to date range supplied by the owning workflow.`,safety:`The primitive communicates unavailable dates and preserves read-only context; appointment, pricing, and clinical permission rules remain in the owning composition.`,outOfScope:`Time slots, appointments, event lists, pricing, presets, and picker popovers.`},exclusions:[`Preset and time-selection demos were excluded from the primitive; they belong to a date-and-time composition with a real workflow contract.`,`Pricing, appointment, and event-list demos were excluded from the primitive; availability and consequences belong to the owning clinic feature.`,`Date-picker and range-picker demos were excluded from the primitive; they require canonical field, popover, focus, and form-validation contracts.`,`Foreign icon imports and upstream utility classes were replaced with Kura icon exports, semantic tokens, and the canonical Button/IconButton primitives.`]},docs:{description:{component:`An accessible date-grid primitive for selecting or reviewing dates. Keep domain data such as appointments, availability, pricing, and time slots in the owning composition so the calendar remains reusable and safe.`}}},argTypes:{mode:{control:`radio`,options:[`single`,`multiple`,`range`]},captionLayout:{control:`radio`,options:[`label`,`dropdown`,`dropdown-years`]},navigation:{control:`radio`,options:[`split`,`right`]},showOutsideDays:{control:`boolean`},showWeekNumber:{control:`boolean`},numberOfMonths:{control:{type:`number`,min:1,max:3,step:1}},readOnly:{control:`boolean`},loading:{control:`boolean`}}},f={args:{defaultMonth:l,defaultSelected:u,today:c,"aria-label":`Select a review date`}},p={render:()=>{let[e,t]=(0,s.useState)({from:new Date(2026,6,9),to:new Date(2026,6,15)});return(0,o.jsx)(a,{mode:`range`,defaultMonth:l,selected:e,onSelect:e=>t(e??{}),today:c,"aria-label":`Select a review date range`})}},m={render:()=>{let[e,t]=(0,s.useState)([new Date(2026,6,8),new Date(2026,6,15)]);return(0,o.jsx)(a,{mode:`multiple`,defaultMonth:l,selected:e,onSelect:e=>t(e),today:c,"aria-label":`Select multiple review dates`})}},h={render:()=>(0,o.jsx)(a,{mode:`range`,defaultMonth:l,defaultSelected:{from:new Date(2026,6,6),to:new Date(2026,6,10)},disabled:e=>e.getDay()===0||e.getDay()===6,today:c,"aria-label":`Select weekdays only`})},g={render:()=>(0,o.jsxs)(`div`,{className:`grid w-full max-w-3xl gap-6 md:grid-cols-3`,children:[(0,o.jsx)(a,{defaultMonth:l,today:c,"aria-label":`Month caption`}),(0,o.jsx)(a,{captionLayout:`dropdown`,defaultMonth:l,today:c,fromYear:2024,toYear:2028,"aria-label":`Month and year selectors`}),(0,o.jsx)(a,{captionLayout:`dropdown-years`,defaultMonth:l,today:c,fromYear:2024,toYear:2028,"aria-label":`Year selector`})]})},_={args:{defaultMonth:new Date(2026,3,1),defaultSelected:new Date(2026,3,21),navigation:`right`,showTodayButton:!0,today:c,"aria-label":`Navigate to a review date`}},v={args:{defaultMonth:l,showOutsideDays:!0,showWeekNumber:!0,today:c,"aria-label":`Calendar with week numbers`}},y={render:()=>{let[e,t]=(0,s.useState)({from:new Date(2026,6,27)});return(0,o.jsx)(`div`,{className:`w-full max-w-3xl`,children:(0,o.jsx)(a,{mode:`range`,numberOfMonths:2,defaultMonth:l,selected:e,onSelect:e=>t(e??{}),today:c,"aria-label":`Select a date range across two months`})})}},b={render:()=>(0,o.jsx)(a,{defaultMonth:l,today:c,renderDay:(e,t)=>(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`span`,{children:e.getDate()}),!t.outside&&e.getDate()%5==0?(0,o.jsx)(`span`,{className:`size-1 rounded-full bg-primary`,"aria-hidden":`true`}):null]}),"aria-label":`Calendar with day markers`})},x={render:()=>(0,o.jsxs)(`div`,{className:`grid w-full max-w-3xl gap-6 md:grid-cols-2`,children:[(0,o.jsx)(a,{defaultMonth:l,minDate:new Date(2026,6,8),maxDate:new Date(2026,6,24),today:c,"aria-label":`Select a date within the review window`}),(0,o.jsx)(a,{defaultMonth:l,defaultSelected:u,readOnly:!0,today:c,"aria-label":`Read-only review date`})]})},S={args:{defaultMonth:l,loading:!0,today:c,showTodayButton:!0,"aria-label":`Loading available dates`}},C={render:()=>(0,o.jsxs)(`div`,{className:`flex w-full max-w-sm flex-col gap-3`,children:[(0,o.jsx)(a,{defaultMonth:l,disabled:()=>!0,today:c,"aria-label":`No dates available`}),(0,o.jsx)(`p`,{className:`k-caption`,children:`No dates are available in this month.`})]})},w={render:()=>(0,o.jsx)(`div`,{className:`grid w-full max-w-3xl gap-6 lg:grid-cols-3`,children:[`compact`,`cozy`,`comfortable`].map(e=>(0,o.jsxs)(`div`,{"data-density":e,className:`flex min-w-0 flex-col gap-2`,children:[(0,o.jsx)(`span`,{className:`k-label`,children:e}),(0,o.jsx)(a,{defaultMonth:l,today:c,"aria-label":`${e} density calendar`})]},e))})},T={args:{defaultMonth:l,locale:`en-GB`,weekStartsOn:1,today:c,"aria-label":`Calendar using a Monday week start`}},E={parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,o.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,o.jsx)(a,{mode:`range`,defaultMonth:l,defaultSelected:{from:new Date(2026,6,6),to:new Date(2026,6,10)},today:c,showTodayButton:!0,"aria-label":`Mobile review date range`})})},D={render:()=>(0,o.jsxs)(`div`,{className:`flex w-full max-w-sm flex-col gap-3`,children:[(0,o.jsx)(`p`,{className:`k-body-sm`,children:`Use arrow keys to move, Page Up or Page Down to change months, and Enter to select.`}),(0,o.jsx)(a,{defaultMonth:l,defaultSelected:u,today:c,"aria-label":`Keyboard accessible review date calendar`})]})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    defaultMonth: referenceMonth,
    defaultSelected: selectedDate,
    today: referenceToday,
    'aria-label': 'Select a review date'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [range, setRange] = useState<CalendarRange>({
      from: new Date(2026, 6, 9),
      to: new Date(2026, 6, 15)
    });
    return <Calendar mode="range" defaultMonth={referenceMonth} selected={range} onSelect={selection => setRange(selection as CalendarRange | undefined ?? {})} today={referenceToday} aria-label="Select a review date range" />;
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [dates, setDates] = useState<CalendarSelection>([new Date(2026, 6, 8), new Date(2026, 6, 15)]);
    return <Calendar mode="multiple" defaultMonth={referenceMonth} selected={dates} onSelect={selection => setDates(selection)} today={referenceToday} aria-label="Select multiple review dates" />;
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Calendar mode="range" defaultMonth={referenceMonth} defaultSelected={{
    from: new Date(2026, 6, 6),
    to: new Date(2026, 6, 10)
  }} disabled={date => date.getDay() === 0 || date.getDay() === 6} today={referenceToday} aria-label="Select weekdays only" />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-3xl gap-6 md:grid-cols-3">
      <Calendar defaultMonth={referenceMonth} today={referenceToday} aria-label="Month caption" />
      <Calendar captionLayout="dropdown" defaultMonth={referenceMonth} today={referenceToday} fromYear={2024} toYear={2028} aria-label="Month and year selectors" />
      <Calendar captionLayout="dropdown-years" defaultMonth={referenceMonth} today={referenceToday} fromYear={2024} toYear={2028} aria-label="Year selector" />
    </div>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    defaultMonth: new Date(2026, 3, 1),
    defaultSelected: new Date(2026, 3, 21),
    navigation: 'right',
    showTodayButton: true,
    today: referenceToday,
    'aria-label': 'Navigate to a review date'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    defaultMonth: referenceMonth,
    showOutsideDays: true,
    showWeekNumber: true,
    today: referenceToday,
    'aria-label': 'Calendar with week numbers'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [range, setRange] = useState<CalendarRange>({
      from: new Date(2026, 6, 27)
    });
    return <div className="w-full max-w-3xl">
        <Calendar mode="range" numberOfMonths={2} defaultMonth={referenceMonth} selected={range} onSelect={selection => setRange(selection as CalendarRange | undefined ?? {})} today={referenceToday} aria-label="Select a date range across two months" />
      </div>;
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Calendar defaultMonth={referenceMonth} today={referenceToday} renderDay={(date, modifiers) => <>
          <span>{date.getDate()}</span>
          {!modifiers.outside && date.getDate() % 5 === 0 ? <span className="size-1 rounded-full bg-primary" aria-hidden="true" /> : null}
        </>} aria-label="Calendar with day markers" />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-3xl gap-6 md:grid-cols-2">
      <Calendar defaultMonth={referenceMonth} minDate={new Date(2026, 6, 8)} maxDate={new Date(2026, 6, 24)} today={referenceToday} aria-label="Select a date within the review window" />
      <Calendar defaultMonth={referenceMonth} defaultSelected={selectedDate} readOnly today={referenceToday} aria-label="Read-only review date" />
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    defaultMonth: referenceMonth,
    loading: true,
    today: referenceToday,
    showTodayButton: true,
    'aria-label': 'Loading available dates'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-full max-w-sm flex-col gap-3">
      <Calendar defaultMonth={referenceMonth} disabled={() => true} today={referenceToday} aria-label="No dates available" />
      <p className="k-caption">No dates are available in this month.</p>
    </div>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-3xl gap-6 lg:grid-cols-3">
      {(['compact', 'cozy', 'comfortable'] as const).map(density => <div key={density} data-density={density} className="flex min-w-0 flex-col gap-2">
          <span className="k-label">{density}</span>
          <Calendar defaultMonth={referenceMonth} today={referenceToday} aria-label={\`\${density} density calendar\`} />
        </div>)}
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    defaultMonth: referenceMonth,
    locale: 'en-GB',
    weekStartsOn: 1,
    today: referenceToday,
    'aria-label': 'Calendar using a Monday week start'
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <div className="w-full max-w-sm">
      <Calendar mode="range" defaultMonth={referenceMonth} defaultSelected={{
      from: new Date(2026, 6, 6),
      to: new Date(2026, 6, 10)
    }} today={referenceToday} showTodayButton aria-label="Mobile review date range" />
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-full max-w-sm flex-col gap-3">
      <p className="k-body-sm">Use arrow keys to move, Page Up or Page Down to change months, and Enter to select.</p>
      <Calendar defaultMonth={referenceMonth} defaultSelected={selectedDate} today={referenceToday} aria-label="Keyboard accessible review date calendar" />
    </div>
}`,...D.parameters?.docs?.source}}},O=[`Default`,`RangeSelection`,`MultipleSelection`,`DisabledDates`,`CaptionLayouts`,`NavigationAndToday`,`WeekNumbers`,`TwoMonthRange`,`CustomDayContent`,`ConstraintsAndReadOnly`,`Loading`,`NoAvailableDates`,`DensityModes`,`LocaleAndWeekStart`,`MobileDefault`,`KeyboardNavigation`]}))();export{g as CaptionLayouts,x as ConstraintsAndReadOnly,b as CustomDayContent,f as Default,w as DensityModes,h as DisabledDates,D as KeyboardNavigation,S as Loading,T as LocaleAndWeekStart,E as MobileDefault,m as MultipleSelection,_ as NavigationAndToday,C as NoAvailableDates,p as RangeSelection,y as TwoMonthRange,v as WeekNumbers,O as __namedExportsOrder,d as default};