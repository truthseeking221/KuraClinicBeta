import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{x as n}from"./provider-marks-BeHzyBjc.js";import{C as r,S as i,_ as a,b as o,g as s,t as c,v as l,x as u,y as d}from"./ui-C9kmmzkH.js";import{n as f,t as p}from"./intake-components.stories.module-pqbVgWyl.js";function m({orientation:e=`vertical`}){return(0,h.jsx)(s,{"aria-label":`Appointment activity`,className:f.timelineFrame,orientation:e,value:3,children:v.map((e,t)=>{let s=t+1;return(0,h.jsxs)(u,{step:s,children:[(0,h.jsxs)(d,{children:[(0,h.jsx)(l,{children:e.date}),(0,h.jsx)(r,{children:e.title})]}),(0,h.jsx)(o,{children:s<3?(0,h.jsx)(n,{}):null}),(0,h.jsx)(i,{}),(0,h.jsx)(a,{children:e.content})]},e.title)})})}var h,g,_,v,y,b,x,S,C,w,T;e((()=>{h=t(),c(),p(),{expect:g,within:_}=__STORYBOOK_MODULE_TEST__,v=[{date:`08:42`,title:`Patient arrived`,content:`Identity confirmed at reception.`},{date:`08:48`,title:`Booking reviewed`,content:`Clinic, tests, and payment route confirmed.`},{date:`09:03`,title:`Ready for collection`,content:`Patient is waiting in collection room 2.`},{date:`Pending`,title:`Collection completed`,content:`No collection event has been recorded yet.`}],y={title:`Design System/Components/Timeline`,component:s,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:{source:{vendor:`ReUI`,registryItem:`@reui/timeline`,registryStyle:`base-nova`},intake:{decision:`CREATE-from-ReUI-architecture`,owner:`src/components/ui`,evidence:`No canonical generic event sequence existed. ReUI supplied the orientation and compound anatomy; Kura changed the root to an ordered list, items to list items, and dates to time elements.`,exclusions:[`The upstream onValueChange API is excluded because no timeline part invokes it.`,`Domain-specific status, permissions, and actions belong to feature compositions.`]},binding:{colors:`kura-neutral-brand`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`none`,icons:`kura-canonical-check`,motion:`none`}},docs:{description:{component:`A semantic ordered history or progress sequence. Use Stepper when the user can navigate steps; use Timeline for events that are read rather than controlled.`}}}},b={args:{children:null},render:()=>(0,h.jsx)(m,{}),play:async({canvasElement:e})=>{let t=_(e);await g(t.getByRole(`list`,{name:`Appointment activity`})).toBeVisible(),await g(t.getAllByRole(`listitem`)).toHaveLength(4),await g(t.getByText(`Ready for collection`).closest(`li`)).toHaveAttribute(`aria-current`,`step`)}},x={args:{children:null},render:()=>(0,h.jsx)(m,{orientation:`horizontal`})},S={args:{children:null},render:()=>(0,h.jsxs)(s,{"aria-label":`Specimen activity`,className:f.timelineFrame,value:2,children:[(0,h.jsxs)(u,{step:1,children:[(0,h.jsxs)(d,{children:[(0,h.jsx)(l,{dateTime:`2026-07-17T09:04:00+07:00`,children:`17 Jul · 09:04`}),(0,h.jsx)(r,{children:`Specimen received`})]}),(0,h.jsx)(o,{children:(0,h.jsx)(n,{})}),(0,h.jsx)(i,{}),(0,h.jsx)(a,{children:`Received at the central laboratory with the patient identifier, collection time, collector, tube type, transport condition, and requested test panel intact.`})]}),(0,h.jsxs)(u,{step:2,children:[(0,h.jsxs)(d,{children:[(0,h.jsx)(l,{dateTime:`2026-07-17T09:18:00+07:00`,children:`17 Jul · 09:18`}),(0,h.jsx)(r,{children:`Accession review in progress`})]}),(0,h.jsx)(o,{}),(0,h.jsx)(i,{}),(0,h.jsx)(a,{children:`The accession team is reconciling a long test name and checking whether the available volume supports every requested assay.`})]})]})},C={args:{children:null},render:()=>(0,h.jsx)(s,{"aria-label":`Referral activity`,className:f.timelineFrame,value:1,children:(0,h.jsxs)(u,{step:1,children:[(0,h.jsxs)(d,{children:[(0,h.jsx)(l,{children:`Date unavailable`}),(0,h.jsx)(r,{children:`External referral received`})]}),(0,h.jsx)(o,{}),(0,h.jsx)(i,{}),(0,h.jsx)(a,{children:`The source system did not provide an event timestamp.`})]})})},w={args:{children:null},parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,h.jsx)(m,{})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <OperationalTimeline />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('list', {
      name: 'Appointment activity'
    })).toBeVisible();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(4);
    await expect(canvas.getByText('Ready for collection').closest('li')).toHaveAttribute('aria-current', 'step');
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <OperationalTimeline orientation="horizontal" />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Timeline aria-label="Specimen activity" className={styles.timelineFrame} value={2}>
      <TimelineItem step={1}>
        <TimelineHeader><TimelineDate dateTime="2026-07-17T09:04:00+07:00">17 Jul · 09:04</TimelineDate><TimelineTitle>Specimen received</TimelineTitle></TimelineHeader>
        <TimelineIndicator><CheckIcon /></TimelineIndicator><TimelineSeparator />
        <TimelineContent>Received at the central laboratory with the patient identifier, collection time, collector, tube type, transport condition, and requested test panel intact.</TimelineContent>
      </TimelineItem>
      <TimelineItem step={2}>
        <TimelineHeader><TimelineDate dateTime="2026-07-17T09:18:00+07:00">17 Jul · 09:18</TimelineDate><TimelineTitle>Accession review in progress</TimelineTitle></TimelineHeader>
        <TimelineIndicator /><TimelineSeparator />
        <TimelineContent>The accession team is reconciling a long test name and checking whether the available volume supports every requested assay.</TimelineContent>
      </TimelineItem>
    </Timeline>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Timeline aria-label="Referral activity" className={styles.timelineFrame} value={1}>
      <TimelineItem step={1}>
        <TimelineHeader><TimelineDate>Date unavailable</TimelineDate><TimelineTitle>External referral received</TimelineTitle></TimelineHeader>
        <TimelineIndicator /><TimelineSeparator />
        <TimelineContent>The source system did not provide an event timestamp.</TimelineContent>
      </TimelineItem>
    </Timeline>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <OperationalTimeline />
}`,...w.parameters?.docs?.source}}},T=[`Default`,`Horizontal`,`LongContent`,`MissingDate`,`MobileNarrow`]}))();export{b as Default,x as Horizontal,S as LongContent,C as MissingDate,w as MobileNarrow,T as __namedExportsOrder,y as default};