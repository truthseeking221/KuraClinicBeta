import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{t as i}from"./ui-C9kmmzkH.js";import{t as a}from"./button-B6_zsN5-.js";import{r as o,t as s}from"./readiness-data-D41RGqZh.js";import{n as c,t as l}from"./defer-dialog-uDw_9c1-.js";import{i as u,r as d}from"./demo-data-BPDPlpxo.js";function f({initialSample:e=v}){let[t,n]=(0,m.useState)(null),[r,i]=(0,m.useState)(null),o=(0,m.useRef)(null);return(0,p.jsxs)(`div`,{children:[(0,p.jsx)(a,{onClick:()=>{i(null),n(e)},ref:o,variant:`outline`,children:`Defer sample`}),(0,p.jsx)(l,{onClose:()=>n(null),onConfirm:(t,r)=>{i(`Deferred ${e.id} — ${t}${r?` — ${r}`:``}`),n(null)},restoreFocusRef:o,sample:t}),r?(0,p.jsx)(`p`,{"aria-live":`polite`,role:`status`,children:r}):null]})}var p,m,h,g,_,v,y,b,x,S,C,w,T,E;t((()=>{p=r(),m=e(n()),i(),u(),c(),o(),{expect:h,userEvent:g,within:_}=__STORYBOOK_MODULE_TEST__,v=d[0].samples[2],y={...d[0].samples[1],tests:[`Lipid panel`,`Creatinine`,`ALT`,`AST`,`Triglycerides`,`HDL cholesterol`]},b={title:`Clinic/Collection/Defer Draw Dialog`,component:l,args:{onClose:()=>{},onConfirm:()=>{},sample:null},tags:[`autodocs`],parameters:{layout:`centered`,kura:{readiness:s.collection,owner:`src/features/collection`,journey:`collection-defer`,composition:[`Design System/Components/Alert Dialog`,`Design System/Primitives/Select`,`Design System/Primitives/Textarea`,`Design System/Primitives/Button`],primaryTask:`Record why one tube is deferred and preserve useful context for the next attempt.`,safety:`A reason is required before the deferral can be saved; the sample identity remains visible in the blocking dialog.`,responsive:`dialog-fluid-mobile-action-stacking`},docs:{description:{component:`Feature-owned collection workflow dialog. It composes canonical Kura primitives and records a reason plus optional next-attempt context.`}}}},x={render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=_(e),n=t.getByRole(`button`,{name:`Defer sample`});await g.click(n);let r=await t.findByRole(`alertdialog`,{name:`Defer this draw?`});await h(r).toBeVisible(),await h(t.getByText(v.id)).toBeVisible();let i=t.getByRole(`button`,{name:`Defer draw`});await h(i).toBeDisabled(),await g.click(t.getByRole(`combobox`,{name:`Reason`})),await g.click(await _(e.ownerDocument.body).findByRole(`option`,{name:`Difficult vein`})),await g.type(t.getByRole(`textbox`,{name:`Note for the next attempt (optional)`}),`Use the left arm and allow the patient to pause before the next attempt.`),await h(i).toBeEnabled(),await g.click(i),await h(t.getByRole(`status`)).toHaveTextContent(`Difficult vein`)}},S={render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=_(e),n=t.getByRole(`button`,{name:`Defer sample`});await g.click(n);let r=t.getByRole(`alertdialog`,{name:`Defer this draw?`});await g.click(t.getByRole(`button`,{name:`Cancel`})),await h(r).not.toHaveAttribute(`open`),await h(n).toHaveFocus()}},C={render:()=>(0,p.jsx)(f,{}),play:async({canvasElement:e})=>{let t=_(e);await g.click(t.getByRole(`button`,{name:`Defer sample`})),await g.keyboard(`{Escape}`),await h(t.queryByRole(`alertdialog`)).not.toBeInTheDocument()}},w={render:()=>(0,p.jsx)(f,{initialSample:y})},T={parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,p.jsx)(f,{})},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <DeferDialogPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: 'Defer sample'
    });
    await userEvent.click(trigger);
    const dialog = await canvas.findByRole('alertdialog', {
      name: 'Defer this draw?'
    });
    await expect(dialog).toBeVisible();
    await expect(canvas.getByText(defaultSample.id)).toBeVisible();
    const action = canvas.getByRole('button', {
      name: 'Defer draw'
    });
    await expect(action).toBeDisabled();

    // The reason list is a Base UI listbox in a portal, so it is opened and
    // chosen the way an operator does rather than set as a native value.
    await userEvent.click(canvas.getByRole('combobox', {
      name: 'Reason'
    }));
    await userEvent.click(await within(canvasElement.ownerDocument.body).findByRole('option', {
      name: 'Difficult vein'
    }));
    await userEvent.type(canvas.getByRole('textbox', {
      name: 'Note for the next attempt (optional)'
    }), 'Use the left arm and allow the patient to pause before the next attempt.');
    await expect(action).toBeEnabled();
    await userEvent.click(action);
    await expect(canvas.getByRole('status')).toHaveTextContent('Difficult vein');
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <DeferDialogPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: 'Defer sample'
    });
    await userEvent.click(trigger);
    const dialog = canvas.getByRole('alertdialog', {
      name: 'Defer this draw?'
    });
    await userEvent.click(canvas.getByRole('button', {
      name: 'Cancel'
    }));
    await expect(dialog).not.toHaveAttribute('open');
    await expect(trigger).toHaveFocus();
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <DeferDialogPlayground />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Defer sample'
    }));
    await userEvent.keyboard('{Escape}');
    await expect(canvas.queryByRole('alertdialog')).not.toBeInTheDocument();
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <DeferDialogPlayground initialSample={longContentSample} />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <DeferDialogPlayground />
}`,...T.parameters?.docs?.source}}},E=[`Default`,`CancelRestoresFocus`,`EscapeClosesSafely`,`LongSampleContext`,`Mobile`]}))();export{S as CancelRestoresFocus,x as Default,C as EscapeClosesSafely,w as LongSampleContext,T as Mobile,E as __namedExportsOrder,b as default};