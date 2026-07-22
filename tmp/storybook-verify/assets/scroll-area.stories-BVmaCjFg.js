import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{$t as n,G as r,W as i,X as a,Y as o,Z as s,en as c,q as l,t as u}from"./ui-C9kmmzkH.js";var d,f,p,m,h,g,_,v,y,b,x,S,C,w=e((()=>{d=`_verticalFrame_1ji4v_1`,f=`_gutterFrame_1ji4v_2`,p=`_list_1ji4v_10`,m=`_listItem_1ji4v_18`,h=`_horizontalFrame_1ji4v_29`,g=`_horizontalContent_1ji4v_37`,_=`_resultCard_1ji4v_44`,v=`_resultName_1ji4v_52`,y=`_resultMeta_1ji4v_53`,b=`_bothFrame_1ji4v_69`,x=`_wideTable_1ji4v_77`,S=`_mobileFrame_1ji4v_81`,C={verticalFrame:d,gutterFrame:f,list:p,listItem:m,horizontalFrame:h,horizontalContent:g,resultCard:_,resultName:v,resultMeta:y,bothFrame:b,wideTable:x,mobileFrame:S}}));function T(){return(0,E.jsx)(`ul`,{className:C.list,children:k.map(e=>(0,E.jsx)(`li`,{className:C.listItem,children:e},e))})}var E,D,O,k,A,j,M,N,P,F,I,L,R,z;e((()=>{E=t(),u(),w(),{expect:D,within:O}=__STORYBOOK_MODULE_TEST__,k=Array.from({length:24},(e,t)=>`Release 1.8.${24-t}`),A=[[`Complete blood count`,`Verified · today 09:42`],[`HbA1c`,`Verified · today 09:38`],[`Lipid panel`,`Final · yesterday 16:15`],[`Liver function`,`Final · yesterday 15:50`],[`Renal profile`,`Amended · 14 Jul 2026`]],j={title:`Design System/Primitives/Scroll Area`,component:n,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`Fresh Storybook and source search found native overflow in DataGrid and Sheet but no reusable bounded scroll viewport with tokenized vertical and horizontal scrollbar parts.`,exclusions:[{upstreamClaim:`Virtualization and automatic chat scroll behavior`,reason:`These are data lifecycle and feature behaviors, not scroll-area responsibilities.`,replacement:`Compose the primitive with the feature-owned virtualizer or message lifecycle.`}]},source:{vendor:`ReUI`,registryItem:`c-scroll-area-1 through c-scroll-area-5`,sourceUrl:`https://reui.io/components/scroll-area`,behaviorDependency:`@base-ui/react/scroll-area (existing workspace dependency)`},binding:{colors:`kura-semantic`,spacing:`kura`,radius:`kura`,elevation:`none`,icons:`none`,density:`consumer-content-owned`,responsive:`fluid-container-with-explicit-bounds`,motion:`kura-color-feedback-reduced-motion-safe`},useCase:{role:`Any Kura user reviewing bounded lists, wide operational data, or long secondary content`,primaryTask:`Inspect overflow content without transferring scroll ownership to the whole page.`,safety:`The consuming feature must not hide patient identity, blockers, or primary actions inside an undiscoverable nested scroll region.`,outOfScope:`Virtualization, infinite loading, auto-scroll, pagination, and sticky clinical context.`}},docs:{description:{component:`A bounded, styled scroll viewport using the existing Base UI behavior layer. The consumer owns width and height; avoid nested scroll areas unless each region has an independent task.`}}}},M={render:()=>(0,E.jsx)(n,{"aria-label":`Release history`,className:C.verticalFrame,role:`region`,children:(0,E.jsx)(T,{})}),play:async({canvasElement:e})=>{let t=O(e);await D(t.getByRole(`region`,{name:`Release history`})).toBeVisible(),await D(t.getByText(`Release 1.8.24`)).toBeVisible()}},N={render:()=>(0,E.jsx)(n,{"aria-label":`Recent result summaries`,className:C.horizontalFrame,role:`region`,scrollbars:`horizontal`,children:(0,E.jsx)(`div`,{className:C.horizontalContent,children:A.map(([e,t])=>(0,E.jsxs)(`article`,{className:C.resultCard,children:[(0,E.jsx)(`p`,{className:C.resultName,children:e}),(0,E.jsx)(`p`,{className:C.resultMeta,children:t})]},e))})})},P={render:()=>(0,E.jsx)(n,{"aria-label":`Wide result history`,className:C.bothFrame,role:`region`,scrollbars:`both`,children:(0,E.jsxs)(i,{className:C.wideTable,children:[(0,E.jsx)(a,{children:(0,E.jsxs)(s,{children:[(0,E.jsx)(o,{children:`Test`}),(0,E.jsx)(o,{children:`17 Jul`}),(0,E.jsx)(o,{children:`16 Jul`}),(0,E.jsx)(o,{children:`15 Jul`}),(0,E.jsx)(o,{children:`14 Jul`}),(0,E.jsx)(o,{children:`Reference`})]})}),(0,E.jsx)(r,{children:[`Haemoglobin`,`Platelets`,`White cells`,`Neutrophils`,`Lymphocytes`,`MCV`,`MCH`].map((e,t)=>(0,E.jsxs)(s,{children:[(0,E.jsx)(l,{children:e}),(0,E.jsx)(l,{children:128+t}),(0,E.jsx)(l,{children:126+t}),(0,E.jsx)(l,{children:127+t}),(0,E.jsx)(l,{children:125+t}),(0,E.jsx)(l,{children:`120–160`})]},e))})]})})},F={render:()=>(0,E.jsx)(n,{"aria-label":`Faded release history`,className:C.verticalFrame,fadeEdges:!0,role:`region`,children:(0,E.jsx)(T,{})})},I={render:()=>(0,E.jsx)(n,{"aria-label":`Release history with scrollbar gutter`,className:C.gutterFrame,role:`region`,scrollbarGutter:!0,children:(0,E.jsx)(T,{})})},L={render:()=>(0,E.jsxs)(n,{"aria-label":`Explicit horizontal scrollbar`,className:C.horizontalFrame,role:`region`,children:[(0,E.jsx)(`div`,{className:C.horizontalContent,children:A.map(([e,t])=>(0,E.jsxs)(`article`,{className:C.resultCard,children:[(0,E.jsx)(`p`,{className:C.resultName,children:e}),(0,E.jsx)(`p`,{className:C.resultMeta,children:t})]},e))}),(0,E.jsx)(c,{orientation:`horizontal`})]})},R={parameters:{viewport:{defaultViewport:`kura320`}},render:()=>(0,E.jsx)(n,{"aria-label":`Mobile result history`,className:C.mobileFrame,fadeEdges:!0,role:`region`,scrollbarGutter:!0,children:(0,E.jsx)(T,{})})},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea aria-label="Release history" className={storyStyles.verticalFrame} role="region">
      <ReleaseList />
    </ScrollArea>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('region', {
      name: 'Release history'
    })).toBeVisible();
    await expect(canvas.getByText('Release 1.8.24')).toBeVisible();
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea aria-label="Recent result summaries" className={storyStyles.horizontalFrame} role="region" scrollbars="horizontal">
      <div className={storyStyles.horizontalContent}>
        {resultItems.map(([name, metaText]) => <article className={storyStyles.resultCard} key={name}>
            <p className={storyStyles.resultName}>{name}</p>
            <p className={storyStyles.resultMeta}>{metaText}</p>
          </article>)}
      </div>
    </ScrollArea>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea aria-label="Wide result history" className={storyStyles.bothFrame} role="region" scrollbars="both">
      <Table className={storyStyles.wideTable}>
        <TableHeader>
          <TableRow>
            <TableHead>Test</TableHead>
            <TableHead>17 Jul</TableHead>
            <TableHead>16 Jul</TableHead>
            <TableHead>15 Jul</TableHead>
            <TableHead>14 Jul</TableHead>
            <TableHead>Reference</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {['Haemoglobin', 'Platelets', 'White cells', 'Neutrophils', 'Lymphocytes', 'MCV', 'MCH'].map((name, index) => <TableRow key={name}>
              <TableCell>{name}</TableCell>
              <TableCell>{128 + index}</TableCell>
              <TableCell>{126 + index}</TableCell>
              <TableCell>{127 + index}</TableCell>
              <TableCell>{125 + index}</TableCell>
              <TableCell>120–160</TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </ScrollArea>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea aria-label="Faded release history" className={storyStyles.verticalFrame} fadeEdges role="region">
      <ReleaseList />
    </ScrollArea>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea aria-label="Release history with scrollbar gutter" className={storyStyles.gutterFrame} role="region" scrollbarGutter>
      <ReleaseList />
    </ScrollArea>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea aria-label="Explicit horizontal scrollbar" className={storyStyles.horizontalFrame} role="region">
      <div className={storyStyles.horizontalContent}>
        {resultItems.map(([name, metaText]) => <article className={storyStyles.resultCard} key={name}>
            <p className={storyStyles.resultName}>{name}</p>
            <p className={storyStyles.resultMeta}>{metaText}</p>
          </article>)}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  render: () => <ScrollArea aria-label="Mobile result history" className={storyStyles.mobileFrame} fadeEdges role="region" scrollbarGutter>
      <ReleaseList />
    </ScrollArea>
}`,...R.parameters?.docs?.source}}},z=[`Vertical`,`Horizontal`,`BothAxes`,`FadeEdges`,`ScrollbarGutter`,`ExplicitScrollBar`,`Mobile320`]}))();export{P as BothAxes,L as ExplicitScrollBar,F as FadeEdges,N as Horizontal,R as Mobile320,I as ScrollbarGutter,M as Vertical,z as __namedExportsOrder,j as default};