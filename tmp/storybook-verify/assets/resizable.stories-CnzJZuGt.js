import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{i,n as a,r as o,t as s}from"./resizable-BNOIaDoG.js";var c,l,u,d,f,p,m,h,g,_,v,y,b=t((()=>{c=`_frame_1fiha_1`,l=`_frameCompact_1fiha_10`,u=`_frameTall_1fiha_14`,d=`_panelContent_1fiha_18`,f=`_panelContentMuted_1fiha_32`,p=`_panelTitle_1fiha_36`,m=`_panelText_1fiha_44`,h=`_statusText_1fiha_45`,g=`_disabledReason_1fiha_46`,_=`_stack_1fiha_53`,v=`_disabledFrame_1fiha_60`,y={frame:c,frameCompact:l,frameTall:u,panelContent:d,panelContentMuted:f,panelTitle:p,panelText:m,statusText:h,disabledReason:g,stack:_,disabledFrame:v}}));function x({children:e,muted:t=!1,title:n}){return(0,S.jsxs)(`section`,{className:`${y.panelContent} ${t?y.panelContentMuted:``}`,children:[(0,S.jsx)(`h3`,{className:y.panelTitle,children:n}),(0,S.jsx)(`p`,{className:y.panelText,children:e})]})}var S,C,w,T,E,D,O,k,A,j,M,N,P;t((()=>{S=r(),C=e(n()),i(),b(),{expect:w,userEvent:T,within:E}=__STORYBOOK_MODULE_TEST__,D={title:`Design System/Primitives/Resizable`,component:o,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`A fresh Storybook, export, source, and usage search found only DataGrid column resizing and no canonical split-panel layout primitive. DataGrid owns table-column sizing; Resizable owns user-adjustable adjacent regions.`,exclusions:[{reuiExamples:`c-resizable-5 through c-resizable-9 animated handle treatments`,reason:`Multiple expanding and spring handles are decorative variants of the same separator contract and introduce louder chrome without a distinct Kura task.`,replacement:`One optional tokenized pill indicator with restrained hover, focus, and active feedback.`},{reuiFeature:`Automatic localStorage persistence`,reason:`Storage ownership, keys, privacy scope, and reset behavior belong to the consuming workspace.`,replacement:`Use stable panel ids with the upstream defaultLayout/onLayoutChanged contract or its useDefaultLayout hook in the owning feature.`},{reuiFeature:`Mobile sidebar collapse composition`,reason:`A generic primitive cannot decide which clinical context may disappear or become an overlay.`,replacement:`Feature-owned responsive composition; the mobile primitive story demonstrates a deliberate vertical reflow.`}]},source:{vendor:`ReUI`,registryItem:`c-resizable-1 through c-resizable-10`,sourceUrl:`https://reui.io/components/resizable`,behaviorDependency:`react-resizable-panels`},binding:{colors:`kura-semantic`,spacing:`kura`,radius:`consumer-owned`,elevation:`kura-focus-only`,icons:`none`,density:`consumer-owned-panel-content`,responsive:`feature-owned-orientation-and-constraints`,motion:`kura-indicator-token-reduced-motion-safe`},useCase:{role:`Kura users working across adjacent views in a sustained review workspace`,primaryTask:`Allocate more space to the region needed for the current decision without leaving context.`,dataModel:`Direct Panel and Handle children with stable ids and optional size constraints.`,safety:`The primitive never decides which clinical content may collapse; consuming features own minimum sizes, persistence, mobile composition, and visible recovery controls.`,outOfScope:`DataGrid column resizing, drag-and-drop ordering, overlay drawers, fixed page shells, and domain-specific collapse rules.`}},docs:{description:{component:`A Kura-owned split-panel primitive for user-adjustable adjacent regions. Panels and handles must be direct children of their group. Current numeric size props are pixels; use explicit percentage strings such as "35%" for proportional layouts.`}}},argTypes:{orientation:{control:`inline-radio`,options:[`horizontal`,`vertical`]},disabled:{control:`boolean`}}},O={render:()=>(0,S.jsx)(`div`,{className:y.frame,children:(0,S.jsxs)(o,{orientation:`horizontal`,children:[(0,S.jsx)(a,{id:`result-list`,defaultSize:`36%`,minSize:`24%`,children:(0,S.jsx)(x,{title:`Result list`,muted:!0,children:`Scan recent laboratory results and select one for detailed review.`})}),(0,S.jsx)(s,{"aria-label":`Resize result list and result detail`,showIndicator:!0}),(0,S.jsx)(a,{id:`result-detail`,defaultSize:`64%`,minSize:`40%`,children:(0,S.jsx)(x,{title:`Result detail`,children:`Review the selected value, reference range, trend, and verification context.`})})]})}),play:async({canvasElement:e})=>{let t=E(e).getByRole(`separator`,{name:/resize result list and result detail/i});await w(t).toHaveAttribute(`aria-orientation`,`vertical`),await w(t).toHaveAttribute(`aria-valuenow`),t.focus(),await w(t).toHaveFocus(),await T.keyboard(`{ArrowRight}`),await w(t).toHaveAttribute(`aria-valuenow`)}},k={render:()=>(0,S.jsx)(`div`,{className:`${y.frame} ${y.frameCompact}`,children:(0,S.jsxs)(o,{orientation:`vertical`,children:[(0,S.jsx)(a,{id:`visit-context`,defaultSize:`38%`,minSize:`25%`,children:(0,S.jsx)(x,{title:`Visit context`,muted:!0,children:`Keep patient identity and current encounter context visible.`})}),(0,S.jsx)(s,{"aria-label":`Resize visit context and working notes`}),(0,S.jsx)(a,{id:`working-notes`,defaultSize:`62%`,minSize:`35%`,children:(0,S.jsx)(x,{title:`Working notes`,children:`Continue the assessment while preserving the context above.`})})]})})},A={render:()=>(0,S.jsx)(`div`,{className:`${y.frame} ${y.frameTall}`,children:(0,S.jsxs)(o,{orientation:`horizontal`,children:[(0,S.jsx)(a,{id:`queue`,defaultSize:`30%`,minSize:`22%`,children:(0,S.jsx)(x,{title:`Review queue`,muted:!0,children:`Prioritized results awaiting acknowledgement.`})}),(0,S.jsx)(s,{"aria-label":`Resize review queue and result workspace`,showIndicator:!0}),(0,S.jsx)(a,{id:`workspace`,defaultSize:`70%`,minSize:`45%`,children:(0,S.jsxs)(o,{orientation:`vertical`,children:[(0,S.jsx)(a,{id:`summary`,defaultSize:`42%`,minSize:`28%`,children:(0,S.jsx)(x,{title:`Result summary`,children:`Selected values, flags, and verification status.`})}),(0,S.jsx)(s,{"aria-label":`Resize result summary and clinical notes`,showIndicator:!0}),(0,S.jsx)(a,{id:`notes`,defaultSize:`58%`,minSize:`30%`,children:(0,S.jsx)(x,{title:`Clinical notes`,muted:!0,children:`Supporting interpretation and acknowledgement context.`})})]})})]})})},j={render:()=>{let[e,t]=(0,C.useState)({evidence:40,decision:60});return(0,S.jsxs)(`div`,{className:y.stack,children:[(0,S.jsx)(`div`,{className:`${y.frame} ${y.frameCompact}`,children:(0,S.jsxs)(o,{orientation:`horizontal`,onLayoutChange:t,children:[(0,S.jsx)(a,{id:`evidence`,defaultSize:`40%`,minSize:`25%`,children:(0,S.jsx)(x,{title:`Evidence`,children:`Supporting observations remain available beside the decision area.`})}),(0,S.jsx)(s,{"aria-label":`Resize evidence and decision panels`,showIndicator:!0}),(0,S.jsx)(a,{id:`decision`,defaultSize:`60%`,minSize:`35%`,children:(0,S.jsx)(x,{title:`Decision`,muted:!0,children:`The owning workspace can respond to layout changes without coupling state to the primitive.`})})]})}),(0,S.jsxs)(`p`,{className:y.statusText,"aria-live":`polite`,children:[`Evidence `,Math.round(e.evidence??40),`%; decision `,Math.round(e.decision??60),`%.`]})]})}},M={render:()=>(0,S.jsxs)(`div`,{className:y.stack,children:[(0,S.jsx)(`div`,{className:`${y.frame} ${y.disabledFrame}`,children:(0,S.jsxs)(o,{orientation:`horizontal`,disabled:!0,children:[(0,S.jsx)(a,{id:`locked-context`,defaultSize:`40%`,children:(0,S.jsx)(x,{title:`Required context`,muted:!0,children:`This region remains fixed while the guided review step is active.`})}),(0,S.jsx)(s,{"aria-label":`Resize required context and guided action`,disabled:!0,showIndicator:!0}),(0,S.jsx)(a,{id:`guided-action`,defaultSize:`60%`,children:(0,S.jsx)(x,{title:`Guided action`,children:`Complete the current review step before changing the workspace layout.`})})]})}),(0,S.jsx)(`p`,{className:y.disabledReason,children:`Resizing is unavailable until the guided review step is complete.`})]})},N={parameters:{viewport:{defaultViewport:`kura320`}},render:()=>(0,S.jsx)(`div`,{className:y.frame,children:(0,S.jsxs)(o,{orientation:`vertical`,children:[(0,S.jsx)(a,{id:`mobile-context`,defaultSize:`42%`,minSize:`30%`,children:(0,S.jsx)(x,{title:`Patient context`,muted:!0,children:`Nguyễn Thị Minh Anh · verified identity · today’s result review.`})}),(0,S.jsx)(s,{"aria-label":`Resize patient context and result review`,showIndicator:!0}),(0,S.jsx)(a,{id:`mobile-review`,defaultSize:`58%`,minSize:`35%`,children:(0,S.jsx)(x,{title:`Result review`,children:`The mobile composition stacks regions so content remains readable without horizontal scrolling.`})})]})})},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <div className={storyStyles.frame}>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel id="result-list" defaultSize="36%" minSize="24%">
          <PanelContent title="Result list" muted>
            Scan recent laboratory results and select one for detailed review.
          </PanelContent>
        </ResizablePanel>
        <ResizableHandle aria-label="Resize result list and result detail" showIndicator />
        <ResizablePanel id="result-detail" defaultSize="64%" minSize="40%">
          <PanelContent title="Result detail">
            Review the selected value, reference range, trend, and verification context.
          </PanelContent>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const handle = canvas.getByRole('separator', {
      name: /resize result list and result detail/i
    });
    await expect(handle).toHaveAttribute('aria-orientation', 'vertical');
    await expect(handle).toHaveAttribute('aria-valuenow');
    handle.focus();
    await expect(handle).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(handle).toHaveAttribute('aria-valuenow');
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div className={\`\${storyStyles.frame} \${storyStyles.frameCompact}\`}>
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel id="visit-context" defaultSize="38%" minSize="25%">
          <PanelContent title="Visit context" muted>
            Keep patient identity and current encounter context visible.
          </PanelContent>
        </ResizablePanel>
        <ResizableHandle aria-label="Resize visit context and working notes" />
        <ResizablePanel id="working-notes" defaultSize="62%" minSize="35%">
          <PanelContent title="Working notes">
            Continue the assessment while preserving the context above.
          </PanelContent>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <div className={\`\${storyStyles.frame} \${storyStyles.frameTall}\`}>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel id="queue" defaultSize="30%" minSize="22%">
          <PanelContent title="Review queue" muted>
            Prioritized results awaiting acknowledgement.
          </PanelContent>
        </ResizablePanel>
        <ResizableHandle aria-label="Resize review queue and result workspace" showIndicator />
        <ResizablePanel id="workspace" defaultSize="70%" minSize="45%">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel id="summary" defaultSize="42%" minSize="28%">
              <PanelContent title="Result summary">
                Selected values, flags, and verification status.
              </PanelContent>
            </ResizablePanel>
            <ResizableHandle aria-label="Resize result summary and clinical notes" showIndicator />
            <ResizablePanel id="notes" defaultSize="58%" minSize="30%">
              <PanelContent title="Clinical notes" muted>
                Supporting interpretation and acknowledgement context.
              </PanelContent>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [layout, setLayout] = useState<ResizableLayout>({
      evidence: 40,
      decision: 60
    });
    return <div className={storyStyles.stack}>
        <div className={\`\${storyStyles.frame} \${storyStyles.frameCompact}\`}>
          <ResizablePanelGroup orientation="horizontal" onLayoutChange={setLayout}>
            <ResizablePanel id="evidence" defaultSize="40%" minSize="25%">
              <PanelContent title="Evidence">
                Supporting observations remain available beside the decision area.
              </PanelContent>
            </ResizablePanel>
            <ResizableHandle aria-label="Resize evidence and decision panels" showIndicator />
            <ResizablePanel id="decision" defaultSize="60%" minSize="35%">
              <PanelContent title="Decision" muted>
                The owning workspace can respond to layout changes without coupling state to the primitive.
              </PanelContent>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <p className={storyStyles.statusText} aria-live="polite">
          Evidence {Math.round(layout.evidence ?? 40)}%; decision {Math.round(layout.decision ?? 60)}%.
        </p>
      </div>;
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <div className={storyStyles.stack}>
      <div className={\`\${storyStyles.frame} \${storyStyles.disabledFrame}\`}>
        <ResizablePanelGroup orientation="horizontal" disabled>
          <ResizablePanel id="locked-context" defaultSize="40%">
            <PanelContent title="Required context" muted>
              This region remains fixed while the guided review step is active.
            </PanelContent>
          </ResizablePanel>
          <ResizableHandle aria-label="Resize required context and guided action" disabled showIndicator />
          <ResizablePanel id="guided-action" defaultSize="60%">
            <PanelContent title="Guided action">
              Complete the current review step before changing the workspace layout.
            </PanelContent>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <p className={storyStyles.disabledReason}>
        Resizing is unavailable until the guided review step is complete.
      </p>
    </div>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  render: () => <div className={storyStyles.frame}>
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel id="mobile-context" defaultSize="42%" minSize="30%">
          <PanelContent title="Patient context" muted>
            Nguyễn Thị Minh Anh · verified identity · today’s result review.
          </PanelContent>
        </ResizablePanel>
        <ResizableHandle aria-label="Resize patient context and result review" showIndicator />
        <ResizablePanel id="mobile-review" defaultSize="58%" minSize="35%">
          <PanelContent title="Result review">
            The mobile composition stacks regions so content remains readable without horizontal scrolling.
          </PanelContent>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
}`,...N.parameters?.docs?.source}}},P=[`Default`,`Vertical`,`Nested`,`StateTracked`,`Disabled`,`MobileVertical`]}))();export{O as Default,M as Disabled,N as MobileVertical,A as Nested,j as StateTracked,k as Vertical,P as __namedExportsOrder,D as default};