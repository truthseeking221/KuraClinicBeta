import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{dt as n,u as r}from"./provider-marks-BeHzyBjc.js";import{Rt as i,t as a,zt as o}from"./ui-C9kmmzkH.js";import{t as s}from"./input-UaJWx_9h.js";var c,l,u,d,f,p,m,h,g,_=e((()=>{c=`_inlineExamples_ft7m2_1`,l=`_mobileExample_ft7m2_2`,u=`_inputExample_ft7m2_16`,d=`_reference_ft7m2_17`,f=`_referenceTitle_ft7m2_26`,p=`_referenceList_ft7m2_34`,m=`_referenceRow_ft7m2_38`,h=`_referenceLabel_ft7m2_48`,g={inlineExamples:c,mobileExample:l,inputExample:u,reference:d,referenceTitle:f,referenceList:p,referenceRow:m,referenceLabel:h}})),v,y,b,x,S,C,w,T,E,D,O,k;e((()=>{v=t(),a(),_(),{expect:y,within:b}=__STORYBOOK_MODULE_TEST__,x=[{label:`Open command search`,keys:[`⌘`,`K`]},{label:`Create lab order`,keys:[`⌘`,`N`]},{label:`Save draft`,keys:[`⌘`,`S`]},{label:`Close current panel`,keys:[`Esc`]},{label:`Move to next field`,keys:[`Tab`]}],S={title:`Design System/Primitives/Kbd`,component:i,args:{children:`K`},tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`EXTEND`,owner:`src/components/ui`,hierarchy:`Primitive`,evidence:`Kura already owns semantic Kbd and uses it in AppShell, Filters, Command, and collection scanning. ReUI adds a useful KbdGroup composition and six usage examples; extending the canonical owner avoids a duplicate primitive.`,exclusions:[`The ReUI Tooltip example is not promoted because Kura has no canonical Tooltip owner yet. A Kbd can be composed inside that owner after Tooltip is separately approved.`,`ReUI demo cards, product copy, foreign icons, and utility-class styling are replaced by Kura stories, canonical icons, and semantic tokens.`,`Loading, error, selected, and disabled variants are excluded because Kbd is static semantic output rather than an interactive or asynchronous control.`]},source:{vendor:`ReUI`,registryItems:[`c-kbd-1`,`c-kbd-2`,`c-kbd-3`,`c-kbd-4`,`c-kbd-5`,`c-kbd-6`],sourceUrl:`https://reui.io/components/kbd`},binding:{colors:`kura-semantic`,typography:`kura-mono`,spacing:`kura`,radius:`kura`,elevation:`none`,icons:`kura-canonical`,motion:`none`,density:`inherited-inline`,responsive:`inline wrapping is owned by the surrounding composition`},useCase:{role:`Any keyboard user learning or recalling an available shortcut`,primaryTask:`Recognise one key or a key combination associated with a visible action.`,primaryAction:`Use the visible control or its optional keyboard accelerator.`,dataModel:`Static key labels supplied by the owning feature; Kbd does not register or execute shortcuts.`,safety:`A shortcut hint is informative only and must never be the sole path to an action.`},mobile:{primaryTask:`Read shortcut guidance without creating horizontal page overflow.`,minimumUsableWidth:`320px`,strategy:[`WRAPPING`],behavior:`Individual key groups stay together; reference rows wrap labels while preserving key order. Touch targets do not apply because Kbd is non-interactive.`}},docs:{description:{component:`Semantic keyboard shortcut hint. Compose KbdGroup for multi-key shortcuts. Informative only—every shortcut must also be reachable by a visible, labelled control.`}}}},C={render:()=>(0,v.jsxs)(`div`,{className:g.inlineExamples,children:[(0,v.jsx)(i,{children:`Ctrl`}),(0,v.jsx)(i,{children:`⌘K`}),(0,v.jsx)(i,{children:`Ctrl + B`})]}),play:async({canvasElement:e})=>{let t=b(e),n=e.querySelectorAll(`kbd`);await y(n).toHaveLength(3),await y(t.getByText(`Ctrl + B`)).toBeVisible()}},w={render:()=>(0,v.jsxs)(o,{"aria-label":`Control Shift P`,children:[(0,v.jsx)(i,{children:`Ctrl`}),(0,v.jsx)(i,{children:`Shift`}),(0,v.jsx)(i,{children:`P`})]})},T={render:()=>(0,v.jsxs)(o,{children:[(0,v.jsxs)(i,{children:[(0,v.jsx)(r,{"aria-hidden":`true`}),`Left`]}),(0,v.jsxs)(i,{children:[(0,v.jsx)(n,{"aria-hidden":`true`}),`Voice`]})]})},E={render:()=>(0,v.jsx)(`div`,{className:g.inputExample,children:(0,v.jsx)(s,{"aria-label":`Search patients and orders`,placeholder:`Search patients and orders`,suffix:(0,v.jsx)(i,{children:`⌘K`})})})},D={render:()=>(0,v.jsxs)(`section`,{"aria-labelledby":`shortcut-reference-title`,className:g.reference,children:[(0,v.jsx)(`h2`,{className:g.referenceTitle,id:`shortcut-reference-title`,children:`Keyboard shortcuts`}),(0,v.jsx)(`div`,{className:g.referenceList,children:x.map(e=>(0,v.jsxs)(`div`,{className:g.referenceRow,children:[(0,v.jsx)(`span`,{className:g.referenceLabel,children:e.label}),(0,v.jsx)(o,{"aria-label":`${e.label}: ${e.keys.join(` `)}`,children:e.keys.map(e=>(0,v.jsx)(i,{children:e},e))})]},e.label))})]})},O={parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,v.jsxs)(`div`,{className:g.mobileExample,children:[(0,v.jsx)(`span`,{children:`Open the patient and booking search`}),(0,v.jsxs)(o,{"aria-label":`Command K`,children:[(0,v.jsx)(i,{children:`⌘`}),(0,v.jsx)(i,{children:`K`})]})]})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className={styles.inlineExamples}>
      <Kbd>Ctrl</Kbd>
      <Kbd>⌘K</Kbd>
      <Kbd>Ctrl + B</Kbd>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const keys = canvasElement.querySelectorAll('kbd');
    await expect(keys).toHaveLength(3);
    await expect(canvas.getByText('Ctrl + B')).toBeVisible();
  }
}`,...C.parameters?.docs?.source},description:{story:`Single keys and compact combined labels from the ReUI basic family.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <KbdGroup aria-label="Control Shift P">
      <Kbd>Ctrl</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
}`,...w.parameters?.docs?.source},description:{story:`Separate semantic keys grouped into one shortcut.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <KbdGroup>
      <Kbd>
        <ArrowLeftIcon aria-hidden="true" />
        Left
      </Kbd>
      <Kbd>
        <MicrophoneIcon aria-hidden="true" />
        Voice
      </Kbd>
    </KbdGroup>
}`,...T.parameters?.docs?.source},description:{story:`Canonical Kura icons may appear inside a key when the key represents a direction or device action.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div className={styles.inputExample}>
      <Input aria-label="Search patients and orders" placeholder="Search patients and orders" suffix={<Kbd>⌘K</Kbd>} />
    </div>
}`,...E.parameters?.docs?.source},description:{story:`Input suffix composition for a discoverable keyboard accelerator.`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <section aria-labelledby="shortcut-reference-title" className={styles.reference}>
      <h2 className={styles.referenceTitle} id="shortcut-reference-title">
        Keyboard shortcuts
      </h2>
      <div className={styles.referenceList}>
        {shortcutReference.map(shortcut => <div className={styles.referenceRow} key={shortcut.label}>
            <span className={styles.referenceLabel}>{shortcut.label}</span>
            <KbdGroup aria-label={\`\${shortcut.label}: \${shortcut.keys.join(' ')}\`}>
              {shortcut.keys.map(key => <Kbd key={key}>{key}</Kbd>)}
            </KbdGroup>
          </div>)}
      </div>
    </section>
}`,...D.parameters?.docs?.source},description:{story:`Shortcut reference list for help or settings surfaces.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <div className={styles.mobileExample}>
      <span>Open the patient and booking search</span>
      <KbdGroup aria-label="Command K">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </div>
}`,...O.parameters?.docs?.source},description:{story:`Narrow layout verifies that long labels wrap while key combinations remain legible.`,...O.parameters?.docs?.description}}},k=[`Default`,`GroupedKeys`,`KeysWithIcons`,`WithinInput`,`ReferenceList`,`MobileWidth320`]}))();export{C as Default,w as GroupedKeys,T as KeysWithIcons,O as MobileWidth320,D as ReferenceList,E as WithinInput,k as __namedExportsOrder,S as default};