import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{$t as i,Zt as a,t as o}from"./ui-C9kmmzkH.js";import{t as s}from"./button-B6_zsN5-.js";var c,l,u,d,f,p,m,h,g,_,v=t((()=>{c=`_layout_keoi0_1`,l=`_verticalNav_keoi0_8`,u=`_viewport_keoi0_13`,d=`_sections_keoi0_20`,f=`_section_keoi0_20`,p=`_sectionTitle_keoi0_32`,m=`_sectionBody_keoi0_33`,h=`_horizontalLayout_keoi0_51`,g=`_horizontalNav_keoi0_58`,_={layout:c,verticalNav:l,viewport:u,sections:d,section:f,sectionTitle:p,sectionBody:m,horizontalLayout:h,horizontalNav:g}}));function y(){return(0,b.jsx)(`div`,{className:_.sections,children:E.map(([e,t,n])=>(0,b.jsxs)(`section`,{className:_.section,id:e,children:[(0,b.jsx)(`h3`,{className:_.sectionTitle,children:t}),(0,b.jsx)(`p`,{className:_.sectionBody,children:n})]},e))})}var b,x,S,C,w,T,E,D,O,k,A,j;t((()=>{b=r(),x=e(n()),o(),v(),{expect:S,userEvent:C,waitFor:w,within:T}=__STORYBOOK_MODULE_TEST__,E=[[`identity`,`Identity`,`Confirm the patient identity and encounter before reviewing result data.`],[`results`,`Results`,`Review verified values, flags, reference ranges, and amendments.`],[`interpretation`,`Interpretation`,`Keep supporting clinical context close to the decision it informs.`],[`acknowledgement`,`Acknowledgement`,`Record the responsible reviewer and the completion outcome.`]],D={title:`Design System/Primitives/Scrollspy`,component:a,args:{targetRef:{current:null}},tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`Fresh Storybook and source search found navigation and scroll primitives but no owner that synchronizes local section navigation with a bounded viewport.`,exclusions:[{upstreamBehavior:`Global document scroll observation by default`,reason:`Kura workspaces need explicit scroll ownership to avoid activating links from unrelated page regions.`,replacement:`A required targetRef scopes observation and navigation to one viewport.`}]},source:{vendor:`ReUI`,registryItem:`c-scrollspy-1 and c-scrollspy-2`,sourceUrl:`https://reui.io/components/scrollspy`},binding:{colors:`kura-selected-navigation`,spacing:`kura`,radius:`consumer-control-owned`,elevation:`consumer-control-owned`,icons:`none`,responsive:`vertical-to-horizontal-navigation-reflow`,motion:`native-smooth-scroll-unless-reduced-motion`},useCase:{role:`Kura users navigating a long, locally scrollable review surface`,primaryTask:`Move between meaningful sections and retain orientation while reading.`,safety:`Safety-critical facts and blockers must not depend on scrollspy navigation for discovery.`,outOfScope:`Primary application navigation, route changes, virtualized sections, and hidden safety state.`}},docs:{description:{component:`Synchronizes elements carrying data-scrollspy-anchor with matching section ids inside one explicit scroll viewport. Active links receive aria-current="location".`}}}},O={render:()=>{let e=(0,x.useRef)(null);return(0,b.jsxs)(`div`,{className:_.layout,children:[(0,b.jsx)(a,{"aria-label":`Result review sections`,className:_.verticalNav,targetRef:e,children:E.map(([e,t])=>(0,b.jsx)(s,{"data-scrollspy-anchor":e,variant:`outline`,children:t},e))}),(0,b.jsx)(i,{"aria-label":`Result review content`,className:_.viewport,role:`region`,viewportRef:e,children:(0,b.jsx)(y,{})})]})},play:async({canvasElement:e})=>{let t=T(e).getByRole(`button`,{name:`Results`});await C.click(t),await w(()=>S(t).toHaveAttribute(`aria-current`,`location`))}},k={render:()=>{let e=(0,x.useRef)(null);return(0,b.jsxs)(`div`,{className:_.horizontalLayout,children:[(0,b.jsx)(a,{"aria-label":`Horizontal result review sections`,className:_.horizontalNav,targetRef:e,children:E.map(([e,t])=>(0,b.jsx)(s,{"data-scrollspy-anchor":e,variant:`outline`,children:t},e))}),(0,b.jsx)(i,{"aria-label":`Horizontal navigation content`,className:_.viewport,role:`region`,viewportRef:e,children:(0,b.jsx)(y,{})})]})}},A={parameters:{viewport:{defaultViewport:`kura320`}},render:()=>{let e=(0,x.useRef)(null);return(0,b.jsxs)(`div`,{className:_.layout,children:[(0,b.jsx)(a,{"aria-label":`Mobile result review sections`,className:_.verticalNav,targetRef:e,children:E.map(([e,t])=>(0,b.jsx)(s,{"data-scrollspy-anchor":e,size:`sm`,variant:`outline`,children:t},e))}),(0,b.jsx)(i,{"aria-label":`Mobile result review content`,className:_.viewport,fadeEdges:!0,role:`region`,viewportRef:e,children:(0,b.jsx)(y,{})})]})}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    const viewportRef = useRef<HTMLDivElement>(null);
    return <div className={storyStyles.layout}>
        <Scrollspy aria-label="Result review sections" className={storyStyles.verticalNav} targetRef={viewportRef}>
          {sections.map(([id, title]) => <Button data-scrollspy-anchor={id} key={id} variant="outline">{title}</Button>)}
        </Scrollspy>
        <ScrollArea aria-label="Result review content" className={storyStyles.viewport} role="region" viewportRef={viewportRef}>
          <SectionContent />
        </ScrollArea>
      </div>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const resultsLink = canvas.getByRole('button', {
      name: 'Results'
    });
    await userEvent.click(resultsLink);
    await waitFor(() => expect(resultsLink).toHaveAttribute('aria-current', 'location'));
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => {
    const viewportRef = useRef<HTMLDivElement>(null);
    return <div className={storyStyles.horizontalLayout}>
        <Scrollspy aria-label="Horizontal result review sections" className={storyStyles.horizontalNav} targetRef={viewportRef}>
          {sections.map(([id, title]) => <Button data-scrollspy-anchor={id} key={id} variant="outline">{title}</Button>)}
        </Scrollspy>
        <ScrollArea aria-label="Horizontal navigation content" className={storyStyles.viewport} role="region" viewportRef={viewportRef}>
          <SectionContent />
        </ScrollArea>
      </div>;
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  render: () => {
    const viewportRef = useRef<HTMLDivElement>(null);
    return <div className={storyStyles.layout}>
        <Scrollspy aria-label="Mobile result review sections" className={storyStyles.verticalNav} targetRef={viewportRef}>
          {sections.map(([id, title]) => <Button data-scrollspy-anchor={id} key={id} size="sm" variant="outline">{title}</Button>)}
        </Scrollspy>
        <ScrollArea aria-label="Mobile result review content" className={storyStyles.viewport} fadeEdges role="region" viewportRef={viewportRef}>
          <SectionContent />
        </ScrollArea>
      </div>;
  }
}`,...A.parameters?.docs?.source}}},j=[`Vertical`,`Horizontal`,`Mobile320`]}))();export{k as Horizontal,A as Mobile320,O as Vertical,j as __namedExportsOrder,D as default};