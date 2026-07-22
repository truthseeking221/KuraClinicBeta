import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{I as n,t as r}from"./ui-C9kmmzkH.js";import{n as i,t as a}from"./intake-components.stories.module-pqbVgWyl.js";var o,s,c,l,u,d,f,p,m,h;e((()=>{o=t(),r(),a(),{expect:s,within:c}=__STORYBOOK_MODULE_TEST__,l={title:`Design System/Primitives/Spinner`,component:n,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:{source:{vendor:`ReUI`,registryItem:`@reui/c-spinner-1`},intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`Kura already owned the canonical loading icon and status semantics; ReUI examples were retained only as composition coverage.`,exclusions:[`Decorative dot and color spinners conflict with the canonical loading signal.`]},binding:{icons:`kura-canonical-loading`,typography:`kura`,spacing:`kura`,motion:`kura-token-and-static-reduced-motion`}}}},u={args:{label:`Loading bookings`},play:async({canvasElement:e})=>{await s(c(e).getByRole(`status`)).toHaveTextContent(`Loading bookings`)}},d={args:{},render:()=>(0,o.jsxs)(`div`,{className:i.row,children:[(0,o.jsx)(n,{label:`Loading small item`,size:`sm`}),(0,o.jsx)(n,{label:`Loading item`,size:`md`}),(0,o.jsx)(n,{label:`Loading large region`,size:`lg`})]})},f={args:{label:`Checking coverage…`,showLabel:!0}},p={args:{},render:()=>(0,o.jsxs)(`div`,{className:`${i.surface} ${i.spinnerOverlaySurface}`,children:[(0,o.jsx)(`h3`,{className:i.surfaceTitle,children:`Appointment details`}),(0,o.jsx)(`p`,{className:i.supporting,children:`Identity and booking context stay in place while the latest coverage is checked.`}),(0,o.jsx)(`div`,{className:i.spinnerOverlay,children:(0,o.jsx)(n,{label:`Checking coverage`,showLabel:!0})})]})},m={...p,parameters:{viewport:{defaultViewport:`mobile1`}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Loading bookings'
  },
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).getByRole('status')).toHaveTextContent('Loading bookings');
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {},
  render: () => <div className={styles.row}>
      <Spinner label="Loading small item" size="sm" />
      <Spinner label="Loading item" size="md" />
      <Spinner label="Loading large region" size="lg" />
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Checking coverage…',
    showLabel: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {},
  render: () => <div className={\`\${styles.surface} \${styles.spinnerOverlaySurface}\`}>
      <h3 className={styles.surfaceTitle}>Appointment details</h3>
      <p className={styles.supporting}>Identity and booking context stay in place while the latest coverage is checked.</p>
      <div className={styles.spinnerOverlay}>
        <Spinner label="Checking coverage" showLabel />
      </div>
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...LoadingOverlay,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...m.parameters?.docs?.source}}},h=[`Default`,`Sizes`,`VisibleLabel`,`LoadingOverlay`,`MobileNarrow`]}))();export{u as Default,p as LoadingOverlay,m as MobileNarrow,d as Sizes,f as VisibleLabel,h as __namedExportsOrder,l as default};