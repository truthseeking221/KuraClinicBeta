import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{At as n,M as r,N as i,Vt as a}from"./provider-marks-BeHzyBjc.js";import{t as o}from"./icons-C5MW4nvJ.js";import{n as s,t as c}from"./settings-modal-DFqsiPWF.js";import{n as l,t as u}from"./input-UaJWx_9h.js";import{n as d,t as f}from"./switch-CTGrhoKf.js";var p,m,h,g,_,v,y,b,x;e((()=>{p=t(),l(),o(),s(),d(),{expect:m,userEvent:h,within:g}=__STORYBOOK_MODULE_TEST__,_=[{id:`general`,label:`General`,group:`Settings`,icon:n,content:(0,p.jsx)(f,{defaultChecked:!0,description:`Use compact spacing across operational tables.`,children:`Compact density`})},{id:`profile`,label:`Profile`,group:`Settings`,icon:a,content:(0,p.jsx)(u,{label:`Display name`,defaultValue:`Alex Morgan`})},{id:`billing`,label:`Billing`,group:`Settings`,icon:r,content:(0,p.jsx)(`p`,{children:`Billing is managed by your organization administrator.`})},{id:`storage`,label:`Storage`,group:`Workspace`,icon:i,content:(0,p.jsx)(`p`,{children:`4.2 GB of 20 GB used.`})}],v={title:`Design System/Patterns/Settings Modal`,component:c,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:{source:{vendor:`Reference`,registryItem:`settings-modal`,visualReference:`Settings modal reference`},intake:{decision:`ADAPT + EXTEND`,owner:`src/components/ui`,evidence:`The reference settings modal was inspected in full. Kura reuses its fixed rail, independently scrolling panel, and mobile full-screen composition while retaining the canonical Dialog, tokens, icon exports, and controlled navigation API.`,exclusions:[`Reference icons and application fixtures — Kura icons and consuming feature data remain authoritative`,`Reference portal, focus, and animation implementation — Kura Dialog keeps the accessibility and motion contract`]},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,icons:`kura-canonical`,responsive:`full-screen mobile rail`}}}},y={args:{onOpenChange:()=>void 0,open:!0,sections:_},play:async({canvasElement:e})=>{let t=g(e.ownerDocument.body);await m(t.getByRole(`dialog`,{name:`General`})).toBeVisible(),await h.click(t.getByRole(`button`,{name:`Profile`})),await m(t.getByRole(`heading`,{name:`Profile`})).toBeVisible()}},b={args:{onOpenChange:()=>void 0,open:!0,sections:_},parameters:{viewport:{defaultViewport:`kura320`}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    onOpenChange: () => undefined,
    open: true,
    sections
  },
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    await expect(body.getByRole('dialog', {
      name: 'General'
    })).toBeVisible();
    await userEvent.click(body.getByRole('button', {
      name: 'Profile'
    }));
    await expect(body.getByRole('heading', {
      name: 'Profile'
    })).toBeVisible();
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    onOpenChange: () => undefined,
    open: true,
    sections
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...b.parameters?.docs?.source}}},x=[`Default`,`Mobile`]}))();export{y as Default,b as Mobile,x as __namedExportsOrder,v as default};