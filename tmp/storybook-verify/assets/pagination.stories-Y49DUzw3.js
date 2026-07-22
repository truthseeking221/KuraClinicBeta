import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{At as n,Mt as r,Nt as i,Ot as a,Pt as o,jt as s,kt as c,t as l}from"./ui-C9kmmzkH.js";function u({current:e=2,disabledPrevious:t=!1}){return(0,d.jsx)(a,{label:`Patient search result pages`,children:(0,d.jsxs)(c,{children:[(0,d.jsx)(s,{children:(0,d.jsx)(o,{"aria-disabled":t?`true`:void 0,href:`#previous`})}),(0,d.jsx)(s,{children:(0,d.jsx)(r,{active:e===1,href:`#1`,children:`1`})}),(0,d.jsx)(s,{children:(0,d.jsx)(r,{active:e===2,href:`#2`,children:`2`})}),(0,d.jsx)(s,{children:(0,d.jsx)(n,{})}),(0,d.jsx)(s,{children:(0,d.jsx)(r,{active:e===12,href:`#12`,children:`12`})}),(0,d.jsx)(s,{children:(0,d.jsx)(i,{href:`#next`})})]})})}var d,f,p,m,h,g,_,v,y;e((()=>{d=t(),l(),{expect:f,within:p}=__STORYBOOK_MODULE_TEST__,m={title:`Design System/Components/Pagination`,component:a,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`centered`,kura:{source:{vendor:`Kura`,registryItem:`pagination`,visualReference:`Kura pagination`,familySize:8},intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`DataGrid owns table-specific pagination, but no navigation-semantic standalone composition existed for search, directories, or non-tabular collections.`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura-control`,icons:`kura-canonical`,responsive:`direction labels collapse at 320px`},exclusions:[{capability:`Rows-per-page selector`,replacement:`DataGridPagination owns table page size; compose Select in the feature for non-tabular collections.`}]}}},h={render:()=>(0,d.jsx)(u,{}),play:async({canvasElement:e})=>{let t=p(e);await f(t.getByRole(`link`,{name:`2`})).toHaveAttribute(`aria-current`,`page`)}},g={render:()=>(0,d.jsx)(u,{current:1,disabledPrevious:!0})},_={render:()=>(0,d.jsx)(u,{current:12})},v={render:()=>(0,d.jsx)(u,{}),parameters:{viewport:{defaultViewport:`kura320`}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Example />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('link', {
      name: '2'
    })).toHaveAttribute('aria-current', 'page');
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Example current={1} disabledPrevious />
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <Example current={12} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Example />,
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...v.parameters?.docs?.source}}},y=[`Default`,`FirstPage`,`LongCollection`,`Mobile`]}))();export{h as Default,g as FirstPage,_ as LongCollection,v as Mobile,y as __namedExportsOrder,m as default};