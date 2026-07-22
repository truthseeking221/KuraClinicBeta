import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{c as i,s as a,t as o}from"./ui-C9kmmzkH.js";var s,c,l,u,d,f,p,m,h,g,_,v,y,b;t((()=>{s=r(),c=e(n()),o(),{expect:l,userEvent:u,within:d}=__STORYBOOK_MODULE_TEST__,f={title:`Design System/Components/Toggle Group`,component:a,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:{source:{vendor:`ReUI`,registryItem:`@reui/c-toggle-group-1`},intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`The existing Base UI owner already supplied single/multiple pressed values, orientation, looped roving focus, disabled state, and inherited Toggle sizing.`,exclusions:[`Pricing, notification channels, theme colors, and domain filters are compositions.`,`Use Tabs when content panels change and SegmentedToggle for a mutually exclusive view mode.`]},binding:{colors:`kura-brand-neutral`,typography:`kura`,spacing:`kura`,radius:`kura`,motion:`kura-reduced-motion-safe`}}}},p={args:{children:null},render:()=>(0,s.jsxs)(a,{"aria-label":`Queue period`,defaultValue:[`today`],children:[(0,s.jsx)(i,{value:`today`,children:`Today`}),(0,s.jsx)(i,{value:`week`,children:`This week`}),(0,s.jsx)(i,{value:`all`,children:`All`})]}),play:async({canvasElement:e})=>{let t=d(e);t.getByRole(`button`,{name:`Today`}).focus(),await u.keyboard(`{ArrowRight}`),await l(t.getByRole(`button`,{name:`This week`})).toHaveFocus()}},m={args:{children:null},render:()=>(0,s.jsxs)(a,{"aria-label":`Result display`,defaultValue:[`summary`],variant:`outline`,children:[(0,s.jsx)(i,{value:`summary`,children:`Summary`}),(0,s.jsx)(i,{value:`table`,children:`Table`}),(0,s.jsx)(i,{value:`trend`,children:`Trend`})]})},h={args:{children:null},render:function(){let[e,t]=(0,c.useState)([`waiting`]);return(0,s.jsxs)(a,{"aria-label":`Visible queue states`,multiple:!0,onValueChange:t,value:e,children:[(0,s.jsx)(i,{value:`waiting`,children:`Waiting`}),(0,s.jsx)(i,{value:`ready`,children:`Ready`}),(0,s.jsx)(i,{value:`completed`,children:`Completed`})]})}},g={args:{children:null},render:()=>(0,s.jsxs)(a,{"aria-label":`Information density`,defaultValue:[`standard`],orientation:`vertical`,variant:`outline`,children:[(0,s.jsx)(i,{value:`compact`,children:`Compact`}),(0,s.jsx)(i,{value:`standard`,children:`Standard`}),(0,s.jsx)(i,{value:`comfortable`,children:`Comfortable`})]})},_={args:{children:null},render:()=>(0,s.jsxs)(a,{"aria-label":`Locked view`,defaultValue:[`summary`],disabled:!0,children:[(0,s.jsx)(i,{value:`summary`,children:`Summary`}),(0,s.jsx)(i,{value:`details`,children:`Details`})]})},v={args:{children:null},render:()=>(0,s.jsx)(`div`,{children:[`sm`,`md`,`lg`].map(e=>(0,s.jsxs)(a,{"aria-label":`${e} group`,defaultValue:[`one`],size:e,children:[(0,s.jsx)(i,{value:`one`,children:`One`}),(0,s.jsx)(i,{value:`two`,children:`Two`})]},e))})},y={args:{children:null},parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,s.jsxs)(a,{"aria-label":`Appointment filter`,defaultValue:[`upcoming`],variant:`outline`,children:[(0,s.jsx)(i,{value:`upcoming`,children:`Upcoming appointments`}),(0,s.jsx)(i,{value:`rescheduled`,children:`Recently rescheduled`}),(0,s.jsx)(i,{value:`completed`,children:`Completed appointments`})]})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ToggleGroup aria-label="Queue period" defaultValue={['today']}>
      <ToggleGroupItem value="today">Today</ToggleGroupItem>
      <ToggleGroupItem value="week">This week</ToggleGroupItem>
      <ToggleGroupItem value="all">All</ToggleGroupItem>
    </ToggleGroup>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const today = canvas.getByRole('button', {
      name: 'Today'
    });
    today.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('button', {
      name: 'This week'
    })).toHaveFocus();
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ToggleGroup aria-label="Result display" defaultValue={['summary']} variant="outline">
      <ToggleGroupItem value="summary">Summary</ToggleGroupItem>
      <ToggleGroupItem value="table">Table</ToggleGroupItem>
      <ToggleGroupItem value="trend">Trend</ToggleGroupItem>
    </ToggleGroup>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: function MultipleToggleGroup() {
    const [value, setValue] = useState<string[]>(['waiting']);
    return <ToggleGroup aria-label="Visible queue states" multiple onValueChange={setValue} value={value}>
        <ToggleGroupItem value="waiting">Waiting</ToggleGroupItem>
        <ToggleGroupItem value="ready">Ready</ToggleGroupItem>
        <ToggleGroupItem value="completed">Completed</ToggleGroupItem>
      </ToggleGroup>;
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ToggleGroup aria-label="Information density" defaultValue={['standard']} orientation="vertical" variant="outline">
      <ToggleGroupItem value="compact">Compact</ToggleGroupItem>
      <ToggleGroupItem value="standard">Standard</ToggleGroupItem>
      <ToggleGroupItem value="comfortable">Comfortable</ToggleGroupItem>
    </ToggleGroup>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <ToggleGroup aria-label="Locked view" defaultValue={['summary']} disabled>
      <ToggleGroupItem value="summary">Summary</ToggleGroupItem>
      <ToggleGroupItem value="details">Details</ToggleGroupItem>
    </ToggleGroup>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <div>
      {(['sm', 'md', 'lg'] as const).map(size => <ToggleGroup aria-label={\`\${size} group\`} defaultValue={['one']} key={size} size={size}>
          <ToggleGroupItem value="one">One</ToggleGroupItem>
          <ToggleGroupItem value="two">Two</ToggleGroupItem>
        </ToggleGroup>)}
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <ToggleGroup aria-label="Appointment filter" defaultValue={['upcoming']} variant="outline">
      <ToggleGroupItem value="upcoming">Upcoming appointments</ToggleGroupItem>
      <ToggleGroupItem value="rescheduled">Recently rescheduled</ToggleGroupItem>
      <ToggleGroupItem value="completed">Completed appointments</ToggleGroupItem>
    </ToggleGroup>
}`,...y.parameters?.docs?.source}}},b=[`Default`,`Outline`,`MultipleSelection`,`Vertical`,`Disabled`,`Sizes`,`MobileLongLabels`]}))();export{p as Default,_ as Disabled,y as MobileLongLabels,h as MultipleSelection,m as Outline,v as Sizes,g as Vertical,b as __namedExportsOrder,f as default};