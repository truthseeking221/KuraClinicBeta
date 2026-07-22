import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{i as n,n as r,r as i}from"./demo-data-koyfmYWR.js";import{n as a,t as o}from"./lab-order-rail-iCyMWtNC.js";import{n as s,t as c}from"./storybook-metadata-Dck1yXxI.js";var l,u,d,f,p,m=e((()=>{l=`_frame_ru0rc_1`,u=`_width400_ru0rc_8`,d=`_width520_ru0rc_12`,f=`_width560_ru0rc_16`,p={frame:l,width400:u,width520:d,width560:f}}));function h({children:e,widthClass:t}){return(0,g.jsx)(`div`,{className:`${p.frame} ${t}`,children:e})}var g,_,v,y,b,x,S,C,w,T;e((()=>{g=t(),n(),a(),m(),s(),{expect:_,fn:v,userEvent:y,within:b}=__STORYBOOK_MODULE_TEST__,x={title:`Clinic/Clinical/Lab Catalog/Order Workspace Rail`,component:o,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:c,docs:{description:{component:`A contained lab-order draft that keeps the patient chart visible while tests are selected.`}}},args:{categories:r,onClose:v(),onReview:v(),tests:i}},S={render:e=>(0,g.jsx)(h,{widthClass:p.width520,children:(0,g.jsx)(o,{...e})}),play:async({args:e,canvasElement:t})=>{let n=b(t);await _(n.getByRole(`heading`,{name:`Order lab tests`})).toBeVisible(),await _(n.getByText(`0 selected`)).toBeVisible(),await y.click(n.getByRole(`checkbox`,{name:`HbA1c`})),await _(n.getByText(`1 selected`)).toBeVisible(),await y.click(n.getByRole(`button`,{name:`Review order`})),await _(e.onReview).toHaveBeenCalledWith([`hba1c`])}},C={render:e=>(0,g.jsx)(h,{widthClass:p.width400,children:(0,g.jsx)(o,{...e})})},w={args:{defaultSelectedTestIds:[`hba1c`,`creatinine-egfr`]},render:e=>(0,g.jsx)(h,{widthClass:p.width560,children:(0,g.jsx)(o,{...e})})},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => <Frame widthClass={styles.width520}>
      <LabOrderRail {...args} />
    </Frame>,
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Order lab tests'
    })).toBeVisible();
    await expect(canvas.getByText('0 selected')).toBeVisible();
    await userEvent.click(canvas.getByRole('checkbox', {
      name: 'HbA1c'
    }));
    await expect(canvas.getByText('1 selected')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Review order'
    }));
    await expect(args.onReview).toHaveBeenCalledWith(['hba1c']);
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => <Frame widthClass={styles.width400}>
      <LabOrderRail {...args} />
    </Frame>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    defaultSelectedTestIds: ['hba1c', 'creatinine-egfr']
  },
  render: args => <Frame widthClass={styles.width560}>
      <LabOrderRail {...args} />
    </Frame>
}`,...w.parameters?.docs?.source}}},T=[`WorkspaceWidth520`,`MinimumWidth400`,`ComfortableWidth560`]}))();export{w as ComfortableWidth560,C as MinimumWidth400,S as WorkspaceWidth520,T as __namedExportsOrder,x as default};