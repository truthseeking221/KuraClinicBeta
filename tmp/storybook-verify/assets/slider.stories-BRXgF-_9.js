import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{H as i,t as a}from"./ui-C9kmmzkH.js";import{n as o,t as s}from"./intake-components.stories.module-pqbVgWyl.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x;t((()=>{c=r(),l=e(n()),a(),s(),{expect:u,userEvent:d,within:f}=__STORYBOOK_MODULE_TEST__,p={title:`Design System/Primitives/Slider`,component:i,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`padded`,kura:{source:{vendor:`Kura`,registryItem:`slider`,visualReference:`Kura slider`},intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`The existing Base UI wrapper already owned single, range, controlled, vertical, keyboard, and touch behavior; Storybook now exposes that complete contract.`,exclusions:[`Emoji rating and temperature demos are product-specific compositions.`,`Ticks and tooltips are not primitive props until a recurring Kura need is proven.`]},binding:{colors:`kura-brand-neutral`,spacing:`kura`,radius:`kura`,elevation:`focus-and-thumb-only`,motion:`kura-reduced-motion-safe`}}},decorators:[e=>(0,c.jsx)(`div`,{className:o.frame,children:(0,c.jsx)(e,{})})]},m={args:{defaultValue:30,label:`Urgency threshold`,max:100,min:0,showValue:!0},play:async({canvasElement:e})=>{let t=f(e).getByRole(`slider`,{name:`Urgency threshold`});t.focus(),await d.keyboard(`{ArrowRight}`),await u(t).toHaveAttribute(`aria-valuenow`,`31`)}},h={args:{defaultValue:[8,16],label:`Arrival window`,max:24,min:0,showValue:!0,thumbLabels:[`Window start`,`Window end`]}},g={args:{defaultValue:15,label:`Reminder interval`,max:60,min:0,showValue:!0,step:5}},_={args:{"aria-label":`Accepted result range`,className:o.sliderVertical,defaultValue:[25,75],orientation:`vertical`,thumbLabels:[`Lower bound`,`Upper bound`]}},v={args:{defaultValue:40,disabled:!0,label:`Locked threshold`,showValue:!0}},y={args:{label:`Follow-up interval`},render:function(e){let[t,n]=(0,l.useState)(20);return(0,c.jsx)(i,{...e,max:60,onValueChange:n,showValue:!0,step:5,value:t})}},b={args:{defaultValue:[15,45],label:`Collection window`,max:60,showValue:!0,thumbLabels:[`Start`,`End`]},parameters:{viewport:{defaultViewport:`mobile1`}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: 30,
    label: 'Urgency threshold',
    max: 100,
    min: 0,
    showValue: true
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider', {
      name: 'Urgency threshold'
    });
    slider.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(slider).toHaveAttribute('aria-valuenow', '31');
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: [8, 16],
    label: 'Arrival window',
    max: 24,
    min: 0,
    showValue: true,
    thumbLabels: ['Window start', 'Window end']
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: 15,
    label: 'Reminder interval',
    max: 60,
    min: 0,
    showValue: true,
    step: 5
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Accepted result range',
    className: styles.sliderVertical,
    defaultValue: [25, 75],
    orientation: 'vertical',
    thumbLabels: ['Lower bound', 'Upper bound']
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: 40,
    disabled: true,
    label: 'Locked threshold',
    showValue: true
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Follow-up interval'
  },
  render: function ControlledSlider(args) {
    const [value, setValue] = useState<number | readonly number[]>(20);
    return <Slider {...args} max={60} onValueChange={setValue} showValue step={5} value={value} />;
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: [15, 45],
    label: 'Collection window',
    max: 60,
    showValue: true,
    thumbLabels: ['Start', 'End']
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...b.parameters?.docs?.source}}},x=[`Default`,`Range`,`DiscreteValues`,`VerticalRange`,`Disabled`,`Controlled`,`MobileNarrow`]}))();export{y as Controlled,m as Default,v as Disabled,g as DiscreteValues,b as MobileNarrow,h as Range,_ as VerticalRange,x as __namedExportsOrder,p as default};