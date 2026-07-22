import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{t as i}from"./ui-C9kmmzkH.js";import{i as a,n as o,r as s,t as c}from"./tabs-C4OYmenm.js";import{n as l,t as u}from"./intake-components.stories.module-pqbVgWyl.js";function d({appearance:e=`underline`,orientation:t=`horizontal`}){return(0,f.jsxs)(c,{appearance:e,defaultValue:`summary`,orientation:t,children:[(0,f.jsxs)(s,{"aria-label":`Booking details`,children:[(0,f.jsx)(a,{value:`summary`,children:`Summary`}),(0,f.jsx)(a,{value:`orders`,children:`Orders`}),(0,f.jsx)(a,{value:`history`,children:`History`})]}),(0,f.jsx)(o,{className:l.tabsPanel,value:`summary`,children:`Identity, appointment, and payment summary.`}),(0,f.jsx)(o,{className:l.tabsPanel,value:`orders`,children:`Three tests are ready for review.`}),(0,f.jsx)(o,{className:l.tabsPanel,value:`history`,children:`Two previous visits are available.`})]})}var f,p,m,h,g,_,v,y,b,x,S,C,w;t((()=>{f=r(),p=e(n()),i(),u(),{expect:m,userEvent:h,within:g}=__STORYBOOK_MODULE_TEST__,_={title:`Design System/Components/Tabs`,component:c,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`padded`,kura:{source:{vendor:`Kura`,registryItem:`tabs`,visualReference:`Kura tabs`},intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`The existing Base UI owner already supplied tablist semantics, roving focus, controlled state, orientation, and animated indicator behavior.`,exclusions:[`Card shells, forms, badges, and icons are compositions.`,`Use SegmentedToggle for a compact view-mode switch and Stepper for ordered progress.`]},binding:{colors:`kura-brand-neutral`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`selected-subtle-only`,motion:`kura-indicator-and-reduced-motion`}}}},v={args:{children:null},render:()=>(0,f.jsx)(d,{}),play:async({canvasElement:e})=>{let t=g(e),n=t.getByRole(`tab`,{name:`Summary`});await m(n).toHaveAttribute(`aria-selected`,`true`),n.focus(),await h.keyboard(`{ArrowRight}`),await m(t.getByRole(`tab`,{name:`Orders`})).toHaveFocus(),await h.keyboard(`{Enter}`),await m(t.getByText(`Three tests are ready for review.`)).toBeVisible()}},y={args:{children:null},render:()=>(0,f.jsx)(d,{appearance:`subtle`})},b={args:{children:null},render:()=>(0,f.jsx)(d,{orientation:`vertical`})},x={args:{children:null},render:()=>(0,f.jsxs)(c,{defaultValue:`summary`,children:[(0,f.jsxs)(s,{"aria-label":`Record sections`,children:[(0,f.jsx)(a,{value:`summary`,children:`Summary`}),(0,f.jsx)(a,{disabled:!0,value:`results`,children:`Results unavailable`})]}),(0,f.jsx)(o,{className:l.tabsPanel,value:`summary`,children:`No results have been released for this record.`})]})},S={args:{children:null},render:function(){let[e,t]=(0,p.useState)(`summary`);return(0,f.jsxs)(c,{onValueChange:t,value:e,children:[(0,f.jsxs)(s,{"aria-label":`Controlled booking tabs`,children:[(0,f.jsx)(a,{value:`summary`,children:`Summary`}),(0,f.jsx)(a,{value:`history`,children:`History`})]}),(0,f.jsx)(o,{className:l.tabsPanel,value:`summary`,children:`Current booking summary.`}),(0,f.jsx)(o,{className:l.tabsPanel,value:`history`,children:`Previous booking history.`})]})}},C={args:{children:null},parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,f.jsxs)(c,{defaultValue:`summary`,children:[(0,f.jsxs)(s,{"aria-label":`Patient record sections`,children:[(0,f.jsx)(a,{value:`summary`,children:`Patient and appointment summary`}),(0,f.jsx)(a,{value:`preparation`,children:`Preparation instructions`}),(0,f.jsx)(a,{value:`history`,children:`Previous appointment history`})]}),(0,f.jsx)(o,{className:l.tabsPanel,value:`summary`,children:`Summary content remains readable while the tab list scrolls intentionally.`})]})},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <BookingTabs />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const summary = canvas.getByRole('tab', {
      name: 'Summary'
    });
    await expect(summary).toHaveAttribute('aria-selected', 'true');
    summary.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('tab', {
      name: 'Orders'
    })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByText('Three tests are ready for review.')).toBeVisible();
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <BookingTabs appearance="subtle" />
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <BookingTabs orientation="vertical" />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Tabs defaultValue="summary">
      <TabsList aria-label="Record sections">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger disabled value="results">Results unavailable</TabsTrigger>
      </TabsList>
      <TabsContent className={styles.tabsPanel} value="summary">No results have been released for this record.</TabsContent>
    </Tabs>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: function ControlledTabs() {
    const [value, setValue] = useState('summary');
    return <Tabs onValueChange={setValue} value={value}>
        <TabsList aria-label="Controlled booking tabs">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent className={styles.tabsPanel} value="summary">Current booking summary.</TabsContent>
        <TabsContent className={styles.tabsPanel} value="history">Previous booking history.</TabsContent>
      </Tabs>;
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <Tabs defaultValue="summary">
      <TabsList aria-label="Patient record sections">
        <TabsTrigger value="summary">Patient and appointment summary</TabsTrigger>
        <TabsTrigger value="preparation">Preparation instructions</TabsTrigger>
        <TabsTrigger value="history">Previous appointment history</TabsTrigger>
      </TabsList>
      <TabsContent className={styles.tabsPanel} value="summary">Summary content remains readable while the tab list scrolls intentionally.</TabsContent>
    </Tabs>
}`,...C.parameters?.docs?.source}}},w=[`Default`,`Subtle`,`Vertical`,`DisabledTab`,`Controlled`,`MobileLongLabels`]}))();export{S as Controlled,v as Default,x as DisabledTab,C as MobileLongLabels,y as Subtle,b as Vertical,w as __namedExportsOrder,_ as default};