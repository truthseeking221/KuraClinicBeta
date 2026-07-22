import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{Yt as n,sr as r,t as i}from"./ui-C9kmmzkH.js";import{t as a}from"./money-text-DwvxiUCm.js";var o,s,c,l,u,d,f,p,m=e((()=>{o=`_stack_1uwi7_1`,s=`_inline_1uwi7_8`,c=`_sectionTitle_1uwi7_17`,l=`_body_1uwi7_18`,u=`_value_1uwi7_19`,d=`_summaryRow_1uwi7_36`,f=`_semanticFrame_1uwi7_42`,p={stack:o,inline:s,sectionTitle:c,body:l,value:u,summaryRow:d,semanticFrame:f}})),h,g,_,v,y,b,x,S,C,w;e((()=>{h=t(),i(),m(),{expect:g,within:_}=__STORYBOOK_MODULE_TEST__,v={title:`Design System/Primitives/Separator`,component:n,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`Field, Item, menu, breadcrumb, and stepper separators are contract-specific. No visual-neutral primitive existed for arbitrary adjacent content groups.`,exclusions:[{reuiExample:`c-separator-5 centered text label`,reason:`A labelled divider has form or composition semantics beyond a visual boundary.`,replacement:`Use the existing FieldSeparator for labelled form divisions.`},{reuiExamples:`Menu, Item, Breadcrumb, and Stepper boundaries`,reason:`Those owners already provide contract-specific separators with the correct DOM and spacing.`,replacement:`Use the separator exported by the owning composite.`}]},source:{vendor:`ReUI`,registryItem:`c-separator-1 through c-separator-6`,sourceUrl:`https://reui.io/components/separator`},binding:{colors:`kura-border`,spacing:`consumer-owned`,radius:`none`,elevation:`none`,icons:`none`,responsive:`orientation-explicit`}},docs:{description:{component:`A quiet visual boundary for arbitrary content groups. It is decorative by default; set decorative={false} only when the boundary itself conveys document structure to assistive technology.`}}},argTypes:{decorative:{control:`boolean`},orientation:{control:`inline-radio`,options:[`horizontal`,`vertical`]}}},y={render:()=>(0,h.jsxs)(`div`,{className:p.stack,children:[(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`h3`,{className:p.sectionTitle,children:`Result verification`}),(0,h.jsx)(`p`,{className:p.body,children:`Verified by the assigned laboratory reviewer.`})]}),(0,h.jsx)(n,{}),(0,h.jsx)(`p`,{className:p.body,children:`The result is ready for clinical acknowledgement.`})]})},b={render:()=>(0,h.jsxs)(`div`,{className:p.inline,children:[(0,h.jsx)(`span`,{children:`Today`}),(0,h.jsx)(n,{orientation:`vertical`}),(0,h.jsx)(`span`,{children:`Verified`}),(0,h.jsx)(n,{orientation:`vertical`}),(0,h.jsx)(`span`,{children:`Final`})]})},x={render:()=>(0,h.jsxs)(`div`,{className:`${p.stack} ${p.semanticFrame}`,children:[(0,h.jsx)(`p`,{className:p.body,children:`Current encounter`}),(0,h.jsx)(n,{"aria-label":`Previous encounters`,decorative:!1}),(0,h.jsx)(`p`,{className:p.body,children:`Earlier encounters`})]}),play:async({canvasElement:e})=>{let t=_(e);await g(t.getByRole(`separator`,{name:`Previous encounters`})).toBeVisible()}},S={render:()=>(0,h.jsxs)(`div`,{className:p.stack,children:[(0,h.jsxs)(`div`,{className:p.summaryRow,children:[(0,h.jsx)(`span`,{className:p.body,children:`Subtotal`}),(0,h.jsx)(a,{currency:`USD`,minor:`4900`})]}),(0,h.jsxs)(`div`,{className:p.summaryRow,children:[(0,h.jsx)(`span`,{className:p.body,children:`Service fee`}),(0,h.jsx)(a,{currency:`USD`,minor:`500`})]}),(0,h.jsx)(n,{}),(0,h.jsxs)(`div`,{className:p.summaryRow,children:[(0,h.jsx)(`span`,{className:p.sectionTitle,children:`Total`}),(0,h.jsx)(a,{currency:`USD`,minor:`5400`})]})]})},C={render:()=>(0,h.jsx)(`div`,{className:p.stack,children:(0,h.jsx)(r,{children:`or continue with`})})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className={storyStyles.stack}>
      <div>
        <h3 className={storyStyles.sectionTitle}>Result verification</h3>
        <p className={storyStyles.body}>Verified by the assigned laboratory reviewer.</p>
      </div>
      <Separator />
      <p className={storyStyles.body}>The result is ready for clinical acknowledgement.</p>
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className={storyStyles.inline}>
      <span>Today</span>
      <Separator orientation="vertical" />
      <span>Verified</span>
      <Separator orientation="vertical" />
      <span>Final</span>
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className={\`\${storyStyles.stack} \${storyStyles.semanticFrame}\`}>
      <p className={storyStyles.body}>Current encounter</p>
      <Separator aria-label="Previous encounters" decorative={false} />
      <p className={storyStyles.body}>Earlier encounters</p>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('separator', {
      name: 'Previous encounters'
    })).toBeVisible();
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div className={storyStyles.stack}>
      <div className={storyStyles.summaryRow}><span className={storyStyles.body}>Subtotal</span><MoneyText currency="USD" minor="4900" /></div>
      <div className={storyStyles.summaryRow}><span className={storyStyles.body}>Service fee</span><MoneyText currency="USD" minor="500" /></div>
      <Separator />
      <div className={storyStyles.summaryRow}><span className={storyStyles.sectionTitle}>Total</span><MoneyText currency="USD" minor="5400" /></div>
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className={storyStyles.stack}>
      <FieldSeparator>or continue with</FieldSeparator>
    </div>
}`,...C.parameters?.docs?.source}}},w=[`Horizontal`,`Vertical`,`Semantic`,`OrderSummary`,`LabelledFormDivisionUsesFieldSeparator`]}))();export{y as Horizontal,C as LabelledFormDivisionUsesFieldSeparator,S as OrderSummary,x as Semantic,b as Vertical,w as __namedExportsOrder,v as default};