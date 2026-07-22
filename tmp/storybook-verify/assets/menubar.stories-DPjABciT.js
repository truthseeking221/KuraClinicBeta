import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{Ct as i,Et as a,St as o,Tt as s,_t as c,bt as l,gt as u,ht as d,mt as f,t as p,vt as m,wt as h,xt as g,yt as _}from"./ui-C9kmmzkH.js";function v(){let[e,t]=(0,b.useState)(`standard`);return(0,y.jsxs)(f,{"aria-label":`Workspace commands`,children:[(0,y.jsxs)(m,{children:[(0,y.jsx)(a,{children:`Record`}),(0,y.jsxs)(u,{children:[(0,y.jsxs)(c,{children:[`Open patient`,(0,y.jsx)(o,{children:`⌘O`})]}),(0,y.jsxs)(c,{children:[`Save draft`,(0,y.jsx)(o,{children:`⌘S`})]}),(0,y.jsxs)(i,{children:[(0,y.jsx)(s,{children:`Export`}),(0,y.jsxs)(h,{children:[(0,y.jsx)(c,{children:`PDF report`}),(0,y.jsx)(c,{children:`CSV data`})]})]}),(0,y.jsx)(g,{}),(0,y.jsx)(c,{disabled:!0,children:`Print labels`})]})]}),(0,y.jsxs)(m,{children:[(0,y.jsx)(a,{children:`View`}),(0,y.jsxs)(u,{children:[(0,y.jsx)(d,{defaultChecked:!0,children:`Show patient banner`}),(0,y.jsx)(g,{}),(0,y.jsxs)(_,{onValueChange:t,value:e,children:[(0,y.jsx)(l,{value:`compact`,children:`Compact`}),(0,y.jsx)(l,{value:`standard`,children:`Standard`})]})]})]})]})}var y,b,x,S,C,w,T,E,D,O;t((()=>{y=r(),b=e(n()),p(),{expect:x,userEvent:S,within:C}=__STORYBOOK_MODULE_TEST__,w={title:`Design System/Components/Menubar`,component:f,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{source:{vendor:`ReUI`,registryItem:`menubar`,familySize:5},intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`DropdownMenu owns one contextual trigger; Menubar adds the persistent multi-menu arrow-key and focus contract needed by desktop command surfaces.`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura-control-and-overlay`,elevation:`kura-popover`,icons:`kura-canonical`,responsive:`horizontal scroll with viewport-contained popup`},exclusions:[{capability:`Global app navigation`,replacement:`Use NavigationMenu or AppShell; Menubar is for command groups.`}]}}},T={render:()=>(0,y.jsx)(v,{}),play:async({canvasElement:e})=>{let t=C(e);await S.click(t.getByRole(`menuitem`,{name:`Record`})),await x(await C(document.body).findByText(`Save draft`)).toBeVisible()}},E={render:()=>(0,y.jsx)(f,{disabled:!0,"aria-label":`Unavailable commands`,children:(0,y.jsx)(m,{children:(0,y.jsx)(a,{children:`Record`})})})},D={render:()=>(0,y.jsx)(v,{}),parameters:{viewport:{defaultViewport:`kura320`}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Example />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('menuitem', {
      name: 'Record'
    }));
    await expect(await within(document.body).findByText('Save draft')).toBeVisible();
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <Menubar disabled aria-label="Unavailable commands"><MenubarMenu><MenubarTrigger>Record</MenubarTrigger></MenubarMenu></Menubar>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <Example />,
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...D.parameters?.docs?.source}}},O=[`Default`,`Disabled`,`Mobile`]}))();export{T as Default,E as Disabled,D as Mobile,O as __namedExportsOrder,w as default};