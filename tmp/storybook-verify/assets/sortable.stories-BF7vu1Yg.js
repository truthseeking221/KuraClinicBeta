import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{I as i}from"./provider-marks-BeHzyBjc.js";import{B as a,R as o,t as s,z as c}from"./ui-C9kmmzkH.js";import{a as l}from"./collapsible-Cfc9M9oP.js";import{n as u,t as d}from"./intake-components.stories.module-pqbVgWyl.js";function f({disabledId:e,strategy:t=`vertical`}){let[n,r]=(0,m.useState)(v);return(0,p.jsx)(o,{"aria-label":`Queue field order`,className:u.frame,getItemValue:e=>e.id,onValueChange:r,strategy:t,value:n,children:n.map((t,n)=>(0,p.jsxs)(c,{disabled:t.id===e,value:t.id,children:[(0,p.jsx)(a,{"aria-label":`Reorder ${t.label}`,children:(0,p.jsx)(i,{"aria-hidden":`true`})}),(0,p.jsxs)(`div`,{className:u.sortableCopy,children:[(0,p.jsx)(`p`,{className:u.itemTitle,children:t.label}),(0,p.jsx)(`p`,{className:u.itemMeta,children:t.detail})]}),(0,p.jsx)(l,{variant:`neutral`,children:n+1})]},t.id))})}var p,m,h,g,_,v,y,b,x,S,C,w,T,E;t((()=>{p=r(),m=e(n()),s(),d(),{expect:h,userEvent:g,within:_}=__STORYBOOK_MODULE_TEST__,v=[{id:`identity`,label:`Patient identity`,detail:`Name, date of birth, and identifier`},{id:`booking`,label:`Booking context`,detail:`Clinic, time, and appointment type`},{id:`payment`,label:`Payment status`,detail:`Outstanding balance and payment method`}],y={title:`Design System/Components/Sortable`,component:o,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:{source:{vendor:`ReUI`,registryItem:`@reui/sortable`,registryStyle:`base-nova`},intake:{decision:`CREATE-from-ReUI-architecture`,owner:`src/components/ui`,evidence:`No Kura owner existed. The registry source supplied dnd-kit sensors, ordering, overlay, and layout strategy behavior; Kura moved keyboard attributes to the actual handle and rebound all presentation.`,exclusions:[`The stale documented layout prop is excluded; the frozen registry API uses strategy.`,`The undocumented public SortableOverlay is excluded because the root already supplies one overlay.`,`File upload and image gallery remain feature compositions.`]},binding:{colors:`kura-neutral`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`drag-overlay-only`,icons:`kura-canonical-drag`,motion:`dnd-runtime-positioning-plus-kura-transitions`}},docs:{description:{component:`Reorders a user-owned list with mouse, touch, or keyboard. Every item needs a clearly named SortableItemHandle; do not use reordering when order has a fixed clinical or regulatory meaning.`}}}},b={args:{children:null,getItemValue:()=>``,onValueChange:()=>void 0,value:[]},render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=_(e),n=t.getByRole(`button`,{name:`Reorder Patient identity`});n.focus(),await h(n).toHaveFocus(),await h(t.getByRole(`list`,{name:`Queue field order`})).toBeVisible()}},x={...b,play:async({canvasElement:e})=>{let t=_(e);t.getByRole(`button`,{name:`Reorder Patient identity`}).focus(),await g.keyboard(` `),await g.keyboard(`{ArrowDown}`),await g.keyboard(` `);let n=t.getAllByRole(`listitem`);await h(n[1]).toHaveTextContent(`Patient identity`)}},S={args:b.args,render:()=>(0,p.jsx)(f,{strategy:`grid`})},C={args:b.args,render:function(){let[e,t]=(0,m.useState)([{id:`arrival`,label:`Arrival details`},{id:`review`,label:`Review details`}]);return(0,p.jsx)(o,{"aria-label":`Form section order`,className:u.frame,getItemValue:e=>e.id,onValueChange:t,value:e,children:e.map(e=>(0,p.jsxs)(c,{value:e.id,children:[(0,p.jsx)(a,{"aria-label":`Reorder ${e.label}`,children:(0,p.jsx)(i,{"aria-hidden":`true`})}),(0,p.jsxs)(`div`,{className:u.nestedGroup,children:[(0,p.jsx)(`p`,{className:u.itemTitle,children:e.label}),(0,p.jsx)(`div`,{className:u.nestedList,children:(0,p.jsx)(f,{})})]})]},e.id))})}},w={args:b.args,render:()=>(0,p.jsx)(f,{disabledId:`identity`})},T={args:b.args,parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,p.jsx)(f,{})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    children: null,
    getItemValue: () => '',
    onValueChange: () => undefined,
    value: []
  },
  render: () => <SortableFields />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const handle = canvas.getByRole('button', {
      name: 'Reorder Patient identity'
    });
    handle.focus();
    await expect(handle).toHaveFocus();
    await expect(canvas.getByRole('list', {
      name: 'Queue field order'
    })).toBeVisible();
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  ...Default,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const handle = canvas.getByRole('button', {
      name: 'Reorder Patient identity'
    });
    handle.focus();
    await userEvent.keyboard(' ');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard(' ');
    const items = canvas.getAllByRole('listitem');
    await expect(items[1]).toHaveTextContent('Patient identity');
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  render: () => <SortableFields strategy="grid" />
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  render: function NestedSortable() {
    const [sections, setSections] = useState([{
      id: 'arrival',
      label: 'Arrival details'
    }, {
      id: 'review',
      label: 'Review details'
    }]);
    return <Sortable aria-label="Form section order" className={styles.frame} getItemValue={item => item.id} onValueChange={setSections} value={sections}>
        {sections.map(section => <SortableItem key={section.id} value={section.id}>
            <SortableItemHandle aria-label={\`Reorder \${section.label}\`}><DragIcon aria-hidden="true" /></SortableItemHandle>
            <div className={styles.nestedGroup}>
              <p className={styles.itemTitle}>{section.label}</p>
              <div className={styles.nestedList}>
                <SortableFields />
              </div>
            </div>
          </SortableItem>)}
      </Sortable>;
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  render: () => <SortableFields disabledId="identity" />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <SortableFields />
}`,...T.parameters?.docs?.source}}},E=[`Default`,`KeyboardReorder`,`Grid`,`NestedComposition`,`DisabledItem`,`MobileTouch`]}))();export{b as Default,w as DisabledItem,S as Grid,x as KeyboardReorder,T as MobileTouch,C as NestedComposition,E as __namedExportsOrder,y as default};