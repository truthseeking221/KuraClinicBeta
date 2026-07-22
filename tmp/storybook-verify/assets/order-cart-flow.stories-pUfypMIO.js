import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{r as i,t as a}from"./readiness-data-D41RGqZh.js";import{a as o,s}from"./logic-Dw_xoo09.js";import{b as c,d as l,t as u,v as d,y as f}from"./demo-data-CCZVOhpy.js";import{n as p,t as m}from"./order-cart-Cy3WwPC6.js";import{i as h,n as g,r as _,t as v}from"./storybook-metadata-BVIKPck2.js";function y({intro:e}){let[t,n]=(0,S.useState)(d());return(0,x.jsxs)(`div`,{className:h.flowCanvas,children:[(0,x.jsxs)(`section`,{className:h.flowIntro,children:[(0,x.jsx)(`h2`,{children:`Doctor order flow`}),(0,x.jsx)(`p`,{children:e}),(0,x.jsxs)(`div`,{className:h.flowFact,children:[(0,x.jsx)(`strong`,{children:`Stage`}),(0,x.jsx)(`span`,{children:t.stage})]})]}),(0,x.jsx)(m,{cart:l,onAttestChange:e=>n(t=>({...t,attested:e})),onBackToCart:()=>n(e=>({...e,stage:`draft`})),onDecisionsChange:e=>n(t=>({...t,decisions:e})),onPanelChange:e=>n(t=>({...t,panel:e})),onPrimaryAction:()=>{let e=o(l,t);!e||e.disabled||n(e=>e.stage===`tubes`?{...e,stage:`confirmed`}:e.decisions.collectBy===`self`?{...e,stage:`tubes`,tubes:e.tubes??u}:{...e,stage:`code-sent`,panel:`summary`,paymentLocked:!0})},onTubeMethodChange:e=>n(t=>({...t,tubeMethod:e})),onTubeScan:(e,t)=>n(n=>({...n,tubes:(n.tubes??[]).map(n=>n.id===e?{...n,scanned:t}:n)})),workflow:t})]})}function b(){let[e,t]=(0,S.useState)(c());return(0,x.jsxs)(`div`,{className:h.flowCanvas,children:[(0,x.jsxs)(`section`,{className:h.flowIntro,children:[(0,x.jsx)(`h2`,{children:`Reception desk flow`}),(0,x.jsx)(`p`,{children:`Choose the tender, attest the collection, then one action confirms payment and checks the patient in. After capture the tender is locked; changes route through void or supplemental.`}),(0,x.jsxs)(`div`,{className:h.flowFact,children:[(0,x.jsx)(`strong`,{children:`Payment`}),(0,x.jsx)(`span`,{children:e.payment.label})]})]}),(0,x.jsx)(m,{cart:l,onAttestChange:e=>t(t=>({...t,attested:e})),onMethodChange:e=>t(t=>({...t,method:e})),onPanelChange:e=>t(t=>({...t,panel:e})),onPrimaryAction:()=>{let n=o(l,e);!n||n.disabled||t(e=>({...e,stage:`checked-in`,panel:`summary`,payment:e.method===`pay-later`?{status:`deferred`,label:`Pays later at Kura`}:{status:`paid`,label:e.method===`khqr`?`KHQR confirmed`:`Cash collected`,receiptId:`R-58213`}}))},workflow:e})]})}var x,S,C,w,T,E,D,O,k,A,j;t((()=>{x=r(),S=e(n()),f(),s(),p(),_(),g(),i(),{expect:C,userEvent:w,waitFor:T,within:E}=__STORYBOOK_MODULE_TEST__,D={title:`Clinic/Flows/Test Ordering`,component:y,tags:[`autodocs`,`source-figma`,`adapted-kura`],args:{intro:``},parameters:{layout:`fullscreen`,kura:{...v,readiness:a.flows,journeys:[`doctor-order-to-collection`,`reception-payment-to-check-in`]},docs:{description:{component:`End-to-end walks of the unified cart: the doctor decides collection & payment then hands off (booking code or tube preparation), and reception resolves tender through check-in. Each flow drives the real OrderCart with a stateful workflow owner.`}}}},O={name:`Doctor · Kura collects at home → code sent`,render:()=>(0,x.jsx)(y,{intro:`Decide who collects, where Kura draws, and how the patient pays. Pay-later needs no attestation; sending the code locks the decisions.`}),play:async({canvasElement:e})=>{let t=E(e);await w.click(t.getByRole(`button`,{name:`Set up collection and payment`})),await w.click(t.getByRole(`radio`,{name:`Kura will draw the blood`})),await w.click(t.getByRole(`radio`,{name:`Patient Home`})),await w.click(t.getByRole(`radio`,{name:`Patient will pay later at Kura`})),await w.click(t.getByRole(`button`,{name:`Done`})),await C(t.getByText(`Kura collection · Patient Home`)).toBeVisible();let n=t.getByRole(`button`,{name:`Send booking code`});await C(n).toBeEnabled(),await w.click(n),await T(async()=>{await C(t.getByText(`Code sent`)).toBeVisible()}),await C(t.getByRole(`button`,{name:`Track home collection`})).toBeEnabled(),await C(t.getByRole(`button`,{name:`View collection and payment`})).toBeVisible()}},k={name:`Doctor · clinic draw → scan tubes → confirmed`,render:()=>(0,x.jsx)(y,{intro:`Self-draw with pay-now: attest the collected amount, prepare tubes, scan each one, then confirm the collection.`}),play:async({canvasElement:e})=>{let t=E(e);await w.click(t.getByRole(`button`,{name:`Set up collection and payment`})),await w.click(t.getByRole(`radio`,{name:`I will draw the blood now`})),await w.click(t.getByRole(`radio`,{name:`Patient will pay you now`})),await w.click(t.getByRole(`button`,{name:`Done`}));let n=t.getByRole(`button`,{name:`Prepare Tubes`});await C(n).toBeDisabled(),await w.click(t.getByRole(`checkbox`)),await C(n).toBeEnabled(),await w.click(n),await T(async()=>{await C(t.getByText(`0/2 scanned`)).toBeVisible()});let r=t.getAllByRole(`button`,{name:`Mark scanned`});await w.click(r[0]),await w.click(t.getByRole(`button`,{name:`Mark scanned`})),await C(t.getByText(`2/2 scanned`)).toBeVisible(),await w.click(t.getByRole(`button`,{name:`Confirm collection & scan`})),await T(async()=>{await C(t.getByRole(`button`,{name:`Collection confirmed`})).toBeDisabled()})}},A={name:`Reception · cash → attest → checked in`,render:()=>(0,x.jsx)(b,{}),play:async({canvasElement:e})=>{let t=E(e);await C(t.getByRole(`button`,{name:`Confirm payment & check in`})).toBeDisabled(),await w.click(t.getByRole(`button`,{name:`Set up payment`})),await w.click(t.getByRole(`radio`,{name:`Cash at the desk`})),await w.click(t.getByRole(`button`,{name:`Done`}));let n=t.getByRole(`button`,{name:`Confirm payment & check in`});await C(n).toBeDisabled(),await w.click(t.getByRole(`checkbox`)),await C(n).toBeEnabled(),await w.click(n),await T(async()=>{await C(t.getByRole(`button`,{name:`Patient checked in`})).toBeDisabled()}),await C(t.getByText(`Cash collected · R-58213`)).toBeVisible()}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Doctor · Kura collects at home → code sent',
  render: () => <DoctorFlowHarness intro="Decide who collects, where Kura draws, and how the patient pays. Pay-later needs no attestation; sending the code locks the decisions." />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Set up collection and payment'
    }));
    await userEvent.click(canvas.getByRole('radio', {
      name: 'Kura will draw the blood'
    }));
    await userEvent.click(canvas.getByRole('radio', {
      name: 'Patient Home'
    }));
    await userEvent.click(canvas.getByRole('radio', {
      name: 'Patient will pay later at Kura'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Done'
    }));
    await expect(canvas.getByText('Kura collection · Patient Home')).toBeVisible();
    const cta = canvas.getByRole('button', {
      name: 'Send booking code'
    });
    await expect(cta).toBeEnabled();
    await userEvent.click(cta);
    await waitFor(async () => {
      await expect(canvas.getByText('Code sent')).toBeVisible();
    });
    await expect(canvas.getByRole('button', {
      name: 'Track home collection'
    })).toBeEnabled();
    await expect(canvas.getByRole('button', {
      name: 'View collection and payment'
    })).toBeVisible();
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Doctor · clinic draw → scan tubes → confirmed',
  render: () => <DoctorFlowHarness intro="Self-draw with pay-now: attest the collected amount, prepare tubes, scan each one, then confirm the collection." />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Set up collection and payment'
    }));
    await userEvent.click(canvas.getByRole('radio', {
      name: 'I will draw the blood now'
    }));
    await userEvent.click(canvas.getByRole('radio', {
      name: 'Patient will pay you now'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Done'
    }));
    const cta = canvas.getByRole('button', {
      name: 'Prepare Tubes'
    });
    await expect(cta).toBeDisabled();
    await userEvent.click(canvas.getByRole('checkbox'));
    await expect(cta).toBeEnabled();
    await userEvent.click(cta);
    await waitFor(async () => {
      await expect(canvas.getByText('0/2 scanned')).toBeVisible();
    });
    const scanFirst = canvas.getAllByRole('button', {
      name: 'Mark scanned'
    });
    await userEvent.click(scanFirst[0]);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Mark scanned'
    }));
    await expect(canvas.getByText('2/2 scanned')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Confirm collection & scan'
    }));
    await waitFor(async () => {
      await expect(canvas.getByRole('button', {
        name: 'Collection confirmed'
      })).toBeDisabled();
    });
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Reception · cash → attest → checked in',
  render: () => <ReceptionFlowHarness />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Confirm payment & check in'
    })).toBeDisabled();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Set up payment'
    }));
    await userEvent.click(canvas.getByRole('radio', {
      name: 'Cash at the desk'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Done'
    }));
    const cta = canvas.getByRole('button', {
      name: 'Confirm payment & check in'
    });
    await expect(cta).toBeDisabled();
    await userEvent.click(canvas.getByRole('checkbox'));
    await expect(cta).toBeEnabled();
    await userEvent.click(cta);
    await waitFor(async () => {
      await expect(canvas.getByRole('button', {
        name: 'Patient checked in'
      })).toBeDisabled();
    });
    await expect(canvas.getByText('Cash collected · R-58213')).toBeVisible();
  }
}`,...A.parameters?.docs?.source}}},j=[`DoctorHomeCollection`,`DoctorSelfDraw`,`ReceptionPaymentToCheckIn`]}))();export{O as DoctorHomeCollection,k as DoctorSelfDraw,A as ReceptionPaymentToCheckIn,j as __namedExportsOrder,D as default};