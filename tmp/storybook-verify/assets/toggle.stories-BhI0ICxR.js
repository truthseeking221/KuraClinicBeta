import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{Q as i}from"./provider-marks-BeHzyBjc.js";import{t as a,u as o}from"./ui-C9kmmzkH.js";import{n as s,t as c}from"./intake-components.stories.module-pqbVgWyl.js";var l,u,d,f,p,m,h,g,_,v,y,b,x,S,C;t((()=>{l=r(),u=e(n()),a(),c(),{expect:d,userEvent:f,within:p}=__STORYBOOK_MODULE_TEST__,m={title:`Design System/Primitives/Toggle`,component:o,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:{source:{vendor:`ReUI`,registryItem:`@reui/c-toggle-1`},intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`The existing Base UI toggle already owned pressed state, keyboard semantics, sizes, and quiet default/outline variants.`,exclusions:[`Reaction counters, mute behavior, and changing labels remain feature compositions.`,`Tooltips are composed through the canonical Tooltip owner.`]},binding:{colors:`kura-brand-neutral`,typography:`kura`,spacing:`kura`,radius:`kura`,icons:`kura-canonical`,motion:`kura-reduced-motion-safe`}}}},h={args:{children:`Show resolved`},play:async({canvasElement:e})=>{let t=p(e).getByRole(`button`,{name:`Show resolved`});await f.click(t),await d(t).toHaveAttribute(`aria-pressed`,`true`)}},g={args:{children:`Pin patient context`,variant:`outline`}},_={args:{},render:()=>(0,l.jsxs)(`div`,{className:s.row,children:[(0,l.jsx)(o,{size:`sm`,children:`Small`}),(0,l.jsx)(o,{size:`md`,children:`Medium`}),(0,l.jsx)(o,{size:`lg`,children:`Large`})]})},v={args:{children:`Important only`,defaultPressed:!0}},y={args:{"aria-label":`Show information`,children:(0,l.jsx)(i,{"aria-hidden":`true`}),variant:`outline`}},b={args:{},render:function(){let[e,t]=(0,u.useState)(!1);return(0,l.jsxs)(`div`,{className:s.stack,children:[(0,l.jsx)(o,{onPressedChange:t,pressed:e,children:`Keep panel open`}),(0,l.jsxs)(`span`,{className:s.toggleValue,children:[`Panel is `,e?`pinned`:`not pinned`,`.`]})]})}},x={args:{children:`Show archived`,disabled:!0}},S={args:{children:`Include appointments completed at another clinic`,variant:`outline`},parameters:{viewport:{defaultViewport:`mobile1`}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Show resolved'
  },
  play: async ({
    canvasElement
  }) => {
    const toggle = within(canvasElement).getByRole('button', {
      name: 'Show resolved'
    });
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Pin patient context',
    variant: 'outline'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {},
  render: () => <div className={styles.row}>
      <Toggle size="sm">Small</Toggle>
      <Toggle size="md">Medium</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Important only',
    defaultPressed: true
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Show information',
    children: <InformationIcon aria-hidden="true" />,
    variant: 'outline'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {},
  render: function ControlledToggle() {
    const [pressed, setPressed] = useState(false);
    return <div className={styles.stack}>
        <Toggle onPressedChange={setPressed} pressed={pressed}>Keep panel open</Toggle>
        <span className={styles.toggleValue}>Panel is {pressed ? 'pinned' : 'not pinned'}.</span>
      </div>;
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Show archived',
    disabled: true
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Include appointments completed at another clinic',
    variant: 'outline'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...S.parameters?.docs?.source}}},C=[`Default`,`Outline`,`Sizes`,`Pressed`,`WithCanonicalIcon`,`Controlled`,`Disabled`,`MobileLongLabel`]}))();export{b as Controlled,h as Default,x as Disabled,S as MobileLongLabel,g as Outline,v as Pressed,_ as Sizes,y as WithCanonicalIcon,C as __namedExportsOrder,m as default};