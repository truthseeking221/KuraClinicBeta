import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{C as ee,S as te,_ as ne,b as re,fr as i,g as ie,t as a,x as ae,y as oe}from"./ui-C9kmmzkH.js";import{i as se,n as ce,r as le,t as ue}from"./alert-l7nmjmGJ.js";import{t as o}from"./button-B6_zsN5-.js";import{a as s}from"./collapsible-Cfc9M9oP.js";import{a as c,i as l,l as u,o as d,r as f,t as p}from"./card-DMMaaphC.js";import{t as de}from"./select-WVTSimR_.js";import{r as m,t as h}from"./readiness-data-D41RGqZh.js";import{i as g,n as _,r as fe,t as pe}from"./scan-gate-K7TDwbHJ.js";import{n as v,t as me}from"./tube-labeling-CW5SV4Xb.js";import{i as y,n as he,r as ge}from"./demo-data-koyfmYWR.js";import{n as b,t as _e}from"./lab-test-picker-CTjhXfbI.js";import{b as x,v as S,y as C}from"./demo-data-CCZVOhpy.js";import{n as w,t as T}from"./order-cart-Cy3WwPC6.js";import{a as ve,c as ye,d as E,f as be,h as D,i as xe,l as Se,m as O,n as k,o as A,p as j,s as M,t as Ce,u as we}from"./demo-data-gkTu93CM.js";function Te(e){return e===`ordering`?1:e===`payment`||e===`home-visit-booked`?2:e===`scan`||e===`draw`||e===`label-tubes`?3:e===`handoff`||e===`ready-for-pickup`?4:5}function Ee(e){return e===`ordering`?`Doctor`:e===`payment`?`Receptionist`:e===`home-visit-booked`?`Kura phlebotomist`:e===`label-tubes`?`Doctor`:e===`scan`||e===`draw`||e===`handoff`?`Nurse`:e===`ready-for-pickup`?`Nurse and courier`:`Clinic`}function N(e={collectBy:`kura`,drawSite:`kura-psc`,payment:`pay-later-kura`}){return S({decisions:e,panel:`summary`})}function De(e){return e.collectBy===`self`?`label-tubes`:e.drawSite===`patient-home`?`home-visit-booked`:`payment`}function P(){return x({origin:`doctor-order`,permissions:{editClinicalItems:!1,collectPayment:!0,checkIn:!0}})}function F({initialDecisions:e,initialStage:t=`ordering`}){let[n,r]=(0,L.useState)(t),[a,m]=(0,L.useState)([...M]),[h,g]=(0,L.useState)(()=>N(e)),[_,v]=(0,L.useState)(P),[y,b]=(0,L.useState)(k.samples),[x,S]=(0,L.useState)(t===`draw`||t===`handoff`||t===`ready-for-pickup`||t===`awaiting-results`),[C,w]=(0,L.useState)(`sticker`),[E,D]=(0,L.useState)({applied:!1,readable:!1,photographed:!1}),[j,F]=(0,L.useState)(``),[B,V]=(0,L.useState)(!1),[H,U]=(0,L.useState)(!1),[W,G]=(0,L.useState)(!1),K=(0,L.useMemo)(()=>Ce.filter(e=>a.includes(e.id)),[a]),q=(0,L.useMemo)(()=>we(K),[K]);function J(){r(`ordering`),m([...M]),g(N(e)),v(P()),b(k.samples),S(!1),F(``),V(!1),U(!1),G(!1)}let Y=!!(j&&B&&H&&W);return(0,I.jsxs)(be,{actor:Ee(n),currentStep:Te(n),onRestart:J,patient:{name:A.name,pid:A.pid,detail:`${A.orderId} · ${K.length} tests · 4 tubes`},stages:R,title:`Lab order and sample collection`,children:[n===`ordering`?(0,I.jsxs)(`div`,{className:O.orderGrid,children:[(0,I.jsxs)(`section`,{"aria-labelledby":`test-picker-heading`,className:O.catalogPanel,children:[(0,I.jsxs)(`div`,{className:O.sectionHeading,children:[(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`p`,{className:O.eyebrow,children:`Doctor`}),(0,I.jsx)(`h2`,{id:`test-picker-heading`,children:`Choose baseline tests`})]}),(0,I.jsxs)(s,{size:`sm`,children:[K.length,` selected`]})]}),(0,I.jsx)(_e,{categories:he,onSelectedTestIdsChange:m,selectedTestIds:a,tests:ge,totalCount:67})]}),(0,I.jsx)(T,{cart:q,onClear:()=>m([]),onDecisionsChange:e=>g(t=>({...t,decisions:e})),onPanelChange:e=>g(t=>({...t,panel:e})),onPrimaryAction:()=>r(De(h.decisions)),onRemoveItem:e=>m(t=>t.filter(t=>t!==e)),workflow:h})]}):null,n===`payment`?(0,I.jsxs)(`div`,{className:O.singleRail,children:[(0,I.jsxs)(`section`,{className:O.stageIntro,children:[(0,I.jsx)(`p`,{className:O.eyebrow,children:`Receptionist`}),(0,I.jsx)(`h2`,{children:`Collect payment and check in`}),(0,I.jsx)(`p`,{children:`The doctor-authored tests are locked. Reception records the tender and confirms check-in without changing clinical intent.`})]}),(0,I.jsx)(T,{cart:q,onAttestChange:e=>v(t=>({...t,attested:e})),onMethodChange:e=>v(t=>({...t,method:e})),onPanelChange:e=>v(t=>({...t,panel:e})),onPrimaryAction:()=>r(`scan`),workflow:_})]}):null,n===`home-visit-booked`?(0,I.jsxs)(`div`,{className:O.singleRail,children:[(0,I.jsxs)(`section`,{className:O.stageIntro,children:[(0,I.jsx)(`p`,{className:O.eyebrow,children:`Kura phlebotomist`}),(0,I.jsx)(`h2`,{children:`Home visit booked`}),(0,I.jsx)(`p`,{children:`A Kura phlebotomist travels to the patient. No sample exists yet, and the order stays awaiting collection until the visit happens.`})]}),(0,I.jsxs)(p,{className:O.handoffCard,variant:`outline`,children:[(0,I.jsx)(d,{children:(0,I.jsxs)(`div`,{children:[(0,I.jsx)(s,{size:`sm`,variant:`info`,children:`Awaiting collection`}),(0,I.jsx)(u,{children:`Visit scheduled with the patient`}),(0,I.jsx)(l,{children:`The patient keeps the booking code. Payment is settled at the visit, so a booked home visit is not a paid one.`})]})}),(0,I.jsx)(c,{children:(0,I.jsx)(o,{onClick:()=>r(`draw`),variant:`primary`,children:`Phlebotomist arrived, start the draw`})})]})]}):null,n===`label-tubes`?(0,I.jsxs)(`div`,{className:O.singleRail,children:[(0,I.jsxs)(`section`,{className:O.stageIntro,children:[(0,I.jsx)(`p`,{className:O.eyebrow,children:`Doctor`}),(0,I.jsx)(`h2`,{children:`Label the tubes you drew`}),(0,I.jsx)(`p`,{children:`The doctor drew the blood in the room, so nobody scanned a wristband and no desk checked the patient in. The label is the only thing tying these tubes to the order.`})]}),(0,I.jsx)(me,{method:C,onConfirm:()=>r(`handoff`),onMethodChange:w,onPhotoChecksChange:D,patientLabelLine:Se,photoChecks:E,tubeKeys:ye})]}):null,n===`scan`?x?(0,I.jsx)(o,{onClick:()=>r(`draw`),variant:`primary`,children:`Open draw worksheet`}):(0,I.jsx)(pe,{onMatch:()=>{S(!0),r(`draw`)},queue:[k],role:`phlebotomy`}):null,n===`draw`?(0,I.jsx)(fe,{now:xe,onMarkVitalsDone:()=>{},onSaveDraft:()=>r(`scan`),onSubmit:()=>r(`handoff`),onUpdateSamples:b,operatorName:ve,patient:k,samples:y}):null,n===`handoff`?(0,I.jsxs)(p,{className:O.handoffCard,variant:`outline`,children:[(0,I.jsx)(d,{children:(0,I.jsxs)(`div`,{children:[(0,I.jsx)(s,{size:`sm`,children:`Collection complete`}),(0,I.jsx)(u,{children:`Prepare samples for pickup`}),(0,I.jsxs)(l,{children:[`Match the physical specimens to `,A.orderId,` before custody changes.`]})]})}),(0,I.jsxs)(f,{className:O.handoffContent,children:[(0,I.jsxs)(`dl`,{className:O.metricGrid,children:[(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`dt`,{children:`Collected`}),(0,I.jsx)(`dd`,{children:`4 tubes`})]}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`dt`,{children:`Order`}),(0,I.jsx)(`dd`,{children:A.orderId})]}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`dt`,{children:`Patient ID`}),(0,I.jsx)(`dd`,{children:A.pid})]})]}),(0,I.jsx)(de,{label:`Pickup round`,onValueChange:e=>F(e??``),options:z,placeholder:`Choose a pickup round`,required:!0,value:j}),(0,I.jsxs)(`div`,{className:O.checklist,children:[(0,I.jsx)(i,{checked:B,onCheckedChange:V,children:`Tube labels match the patient and order.`}),(0,I.jsx)(i,{checked:H,onCheckedChange:U,children:`Tube count matches the handoff summary.`}),(0,I.jsx)(i,{checked:W,onCheckedChange:G,children:`Specimen bag is sealed for transport.`})]})]}),(0,I.jsx)(c,{children:(0,I.jsx)(o,{disabled:!Y,onClick:()=>r(`ready-for-pickup`),variant:`primary`,children:`Mark samples ready`})})]}):null,n===`ready-for-pickup`?(0,I.jsxs)(ue,{tone:`success`,children:[(0,I.jsxs)(se,{children:[`Samples ready for the `,j,` pickup`]}),(0,I.jsx)(le,{children:`Four sealed tubes are waiting at the collection handoff point. Custody remains with the clinic until pickup is recorded.`}),(0,I.jsx)(ce,{children:(0,I.jsx)(o,{onClick:()=>r(`awaiting-results`),size:`sm`,variant:`primary`,children:`Record courier pickup`})})]}):null,n===`awaiting-results`?(0,I.jsxs)(p,{className:O.focusCard,variant:`outline`,children:[(0,I.jsx)(d,{children:(0,I.jsxs)(`div`,{children:[(0,I.jsx)(s,{size:`sm`,variant:`info`,children:`Awaiting results`}),(0,I.jsx)(u,{children:`Courier picked up the samples`}),(0,I.jsx)(l,{children:`The order stays pending until the laboratory records receipt and releases results.`})]})}),(0,I.jsx)(f,{children:(0,I.jsx)(ie,{"aria-label":`Laboratory progress`,value:2,children:[[`Picked up`,`10:34`],[`Lab received`,`Waiting`],[`Processing`,`Not started`],[`Results`,`Not released`]].map(([e,t],n,r)=>(0,I.jsxs)(ae,{step:n+1,children:[(0,I.jsx)(re,{}),(0,I.jsx)(oe,{children:(0,I.jsx)(ee,{children:e})}),(0,I.jsx)(ne,{children:t}),n<r.length-1?(0,I.jsx)(te,{}):null]},e))})})]}):null]})}var I,L,R,z,B=t((()=>{I=r(),L=e(n()),a(),g(),_(),v(),y(),b(),C(),w(),j(),E(),D(),R=[{label:`Order tests`,actor:`Doctor`},{label:`Collect payment`,actor:`Receptionist`},{label:`Collect samples`,actor:`Nurse`},{label:`Handoff`,actor:`Nurse`},{label:`Await results`,actor:`Clinic`}],z=[{value:`10:30`,label:`10:30 · Morning pickup`},{value:`14:00`,label:`14:00 · Afternoon pickup`},{value:`17:30`,label:`17:30 · Final pickup`}],F.__docgenInfo={description:``,methods:[],displayName:`LabOrderSampleCollectionFlow`,props:{initialStage:{required:!1,tsType:{name:`union`,raw:`| 'ordering'
| 'payment'
| 'scan'
| 'draw'
/** Self-draw route: the doctor drew, so the tubes are labelled in the room. */
| 'label-tubes'
/** Home route: the visit is booked and nothing physical exists yet. */
| 'home-visit-booked'
| 'handoff'
| 'ready-for-pickup'
| 'awaiting-results'`,elements:[{name:`literal`,value:`'ordering'`},{name:`literal`,value:`'payment'`},{name:`literal`,value:`'scan'`},{name:`literal`,value:`'draw'`},{name:`literal`,value:`'label-tubes'`},{name:`literal`,value:`'home-visit-booked'`},{name:`literal`,value:`'handoff'`},{name:`literal`,value:`'ready-for-pickup'`},{name:`literal`,value:`'awaiting-results'`}]},description:``,defaultValue:{value:`'ordering'`,computed:!1}},initialDecisions:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  collectBy?: CollectBy;
  /** Only meaningful when Kura collects. */
  drawSite?: DrawSite;
  payment?: DoctorPaymentRoute;
}`,signature:{properties:[{key:`collectBy`,value:{name:`union`,raw:`'self' | 'kura'`,elements:[{name:`literal`,value:`'self'`},{name:`literal`,value:`'kura'`}],required:!1}},{key:`drawSite`,value:{name:`union`,raw:`'kura-psc' | 'patient-home'`,elements:[{name:`literal`,value:`'kura-psc'`},{name:`literal`,value:`'patient-home'`}],required:!1},description:`Only meaningful when Kura collects.`},{key:`payment`,value:{name:`union`,raw:`'pay-now' | 'pay-later-kura'`,elements:[{name:`literal`,value:`'pay-now'`},{name:`literal`,value:`'pay-later-kura'`}],required:!1}}]}},description:`Opens the flow on one of the three service routes.`}}}})),V,H,U,W,G,K,q,J,Y,X,Z,Q,$;t((()=>{m(),B(),{expect:V,userEvent:H,waitFor:U,within:W}=__STORYBOOK_MODULE_TEST__,G={title:`Clinic/Flows/Lab Order and Sample Collection`,component:F,tags:[`autodocs`,`source-figma`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:{readiness:h.flows,source:{figma:`https://www.figma.com/design/yWz269PzVjFQquJa1U1M0s/Kura-Design?node-id=1485-93177`,node:`1485:93177`},intake:{decision:`COMPOSE + FEATURE-OWN`,owner:`src/features/care-loop`,evidence:`Composes the canonical LabTestPicker, OrderCart, ScanGate, and DrawWorksheet. The flow owns only the cross-role orchestration and specimen handoff/awaiting-results states missing from Storybook.`,exclusions:[`The changing patient, order, and tube counts in the source board are replaced by one patient, one order, ten blood tests, and four traceable tubes.`,`Urine tests shown in the source cart are excluded until Collection owns a canonical urine-container contract.`,`Courier routing, lab accession, and result values are not simulated as completed backend work.`]},journeys:[`lab-test-selection`,`cash-payment`,`positive-id-collection`,`specimen-handoff`,`awaiting-results`]},docs:{description:{component:`Executable cross-role journey for the same patient: doctor selects tests, reception records cash, the nurse completes positive-ID blood collection, specimens are prepared for pickup, and the order enters awaiting-results state.`}}},args:{initialStage:`ordering`}},K={play:async({canvasElement:e})=>{let t=W(e),n=W(e.ownerDocument.body);await V(t.getByText(`10 selected`)).toBeVisible(),await H.click(t.getByRole(`button`,{name:`Send booking code`})),await H.click(t.getByRole(`button`,{name:`Set up payment`})),await H.click(t.getByRole(`radio`,{name:`Cash at the desk`})),await H.click(t.getByRole(`button`,{name:`Done`})),await H.click(t.getByRole(`checkbox`)),await H.click(t.getByRole(`button`,{name:`Confirm payment & check in`}));let r=t.getByLabelText(`Patient ID`);await H.type(r,`P8842{Enter}`);for(let e of[`Patient ID confirmed`,`Fasting status checked`,`Allergies reviewed`,`Patient consented`,`Site confirmed (L/R arm)`])await H.click(t.getByRole(`checkbox`,{name:e}));await H.click(t.getByRole(`button`,{name:`Mark all collected`}));for(let e of t.getAllByRole(`button`,{name:/Invert ×/}))await H.click(e);await H.click(t.getByRole(`button`,{name:`Submit collection & next patient`})),await H.click(t.getByRole(`combobox`,{name:`Pickup round`})),await H.click(n.getByRole(`option`,{name:`10:30 · Morning pickup`})),await U(async()=>{await V(t.getByRole(`combobox`,{name:`Pickup round`})).toHaveTextContent(`10:30 · Morning pickup`)}),await H.click(t.getByRole(`checkbox`,{name:`Tube labels match the patient and order.`})),await H.click(t.getByRole(`checkbox`,{name:`Tube count matches the handoff summary.`})),await H.click(t.getByRole(`checkbox`,{name:`Specimen bag is sealed for transport.`})),await H.click(t.getByRole(`button`,{name:`Mark samples ready`})),await H.click(t.getByRole(`button`,{name:`Record courier pickup`})),await V(t.getByText(`Courier picked up the samples`)).toBeVisible(),await V(t.getByText(`Lab received`)).toBeVisible()}},q={args:{initialStage:`label-tubes`,initialDecisions:{collectBy:`self`,payment:`pay-now`}},parameters:{docs:{description:{story:`The self-draw route. Nobody scanned a wristband and no desk checked the patient in, so the label is the only thing tying these tubes to the order — which is why the sticker route asks for photo evidence before the tubes leave the room.`}}},play:async({canvasElement:e})=>{let t=W(e);await V(t.getByText(`4 samples collected`)).toBeVisible();let n=t.getByRole(`button`,{name:`I have labelled all 4 tubes`});await V(n).toBeDisabled(),await V(t.getByText(`Confirm the photo evidence before the tubes leave the room.`)).toBeVisible();for(let e of[`A Kura sticker is on every tube`,`The name and date read clearly in the photo`,`Photo of the labelled tubes attached to the order`])await H.click(t.getByRole(`checkbox`,{name:e}));await V(n).toBeEnabled()}},J={args:{initialStage:`label-tubes`,initialDecisions:{collectBy:`self`,payment:`pay-now`}},parameters:{docs:{description:{story:`Handwriting stays available because a clinic without stickers still has to send blood. It names what the courier checks and what happens to an unreadable tube, and needs no photo because there is nothing machine-readable to photograph.`}}},play:async({canvasElement:e})=>{let t=W(e);await H.click(t.getByRole(`radio`,{name:/Write with a pen/})),await V(t.getByText(`SOK · M · 1994`)).toBeVisible(),await V(t.getByRole(`button`,{name:`I have labelled all 4 tubes`})).toBeEnabled()}},Y={args:{initialStage:`home-visit-booked`,initialDecisions:{collectBy:`kura`,drawSite:`patient-home`,payment:`pay-later-kura`}},parameters:{docs:{description:{story:`The home route. A booked visit is not a drawn sample and not a paid one: the order sits awaiting collection until a phlebotomist actually arrives.`}}},play:async({canvasElement:e})=>{let t=W(e);await V(t.getByText(`Awaiting collection`)).toBeVisible(),await V(t.getByRole(`heading`,{name:`Home visit booked`})).toBeVisible(),await V(t.getByRole(`button`,{name:`Phlebotomist arrived, start the draw`})).toBeEnabled()}},X={args:{initialStage:`handoff`},play:async({canvasElement:e})=>{let t=W(e);await V(t.getByRole(`button`,{name:`Mark samples ready`})).toBeDisabled()}},Z={args:{initialStage:`awaiting-results`}},Q={parameters:{viewport:{defaultViewport:`kura320`}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);
    await expect(canvas.getByText('10 selected')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send booking code'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Set up payment'
    }));
    await userEvent.click(canvas.getByRole('radio', {
      name: 'Cash at the desk'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Done'
    }));
    await userEvent.click(canvas.getByRole('checkbox'));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Confirm payment & check in'
    }));
    const patientId = canvas.getByLabelText('Patient ID');
    await userEvent.type(patientId, 'P8842{Enter}');
    for (const label of ['Patient ID confirmed', 'Fasting status checked', 'Allergies reviewed', 'Patient consented', 'Site confirmed (L/R arm)']) {
      await userEvent.click(canvas.getByRole('checkbox', {
        name: label
      }));
    }
    await userEvent.click(canvas.getByRole('button', {
      name: 'Mark all collected'
    }));
    for (const button of canvas.getAllByRole('button', {
      name: /Invert ×/
    })) {
      await userEvent.click(button);
    }
    await userEvent.click(canvas.getByRole('button', {
      name: 'Submit collection & next patient'
    }));
    await userEvent.click(canvas.getByRole('combobox', {
      name: 'Pickup round'
    }));
    await userEvent.click(screen.getByRole('option', {
      name: '10:30 · Morning pickup'
    }));
    await waitFor(async () => {
      await expect(canvas.getByRole('combobox', {
        name: 'Pickup round'
      })).toHaveTextContent('10:30 · Morning pickup');
    });
    await userEvent.click(canvas.getByRole('checkbox', {
      name: 'Tube labels match the patient and order.'
    }));
    await userEvent.click(canvas.getByRole('checkbox', {
      name: 'Tube count matches the handoff summary.'
    }));
    await userEvent.click(canvas.getByRole('checkbox', {
      name: 'Specimen bag is sealed for transport.'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Mark samples ready'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Record courier pickup'
    }));
    await expect(canvas.getByText('Courier picked up the samples')).toBeVisible();
    await expect(canvas.getByText('Lab received')).toBeVisible();
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    initialStage: 'label-tubes',
    initialDecisions: {
      collectBy: 'self',
      payment: 'pay-now'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'The self-draw route. Nobody scanned a wristband and no desk checked the patient in, so the label is the only thing tying these tubes to the order — which is why the sticker route asks for photo evidence before the tubes leave the room.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('4 samples collected')).toBeVisible();
    const confirm = canvas.getByRole('button', {
      name: 'I have labelled all 4 tubes'
    });
    await expect(confirm).toBeDisabled();
    await expect(canvas.getByText('Confirm the photo evidence before the tubes leave the room.')).toBeVisible();
    for (const label of ['A Kura sticker is on every tube', 'The name and date read clearly in the photo', 'Photo of the labelled tubes attached to the order']) {
      await userEvent.click(canvas.getByRole('checkbox', {
        name: label
      }));
    }
    await expect(confirm).toBeEnabled();
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    initialStage: 'label-tubes',
    initialDecisions: {
      collectBy: 'self',
      payment: 'pay-now'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Handwriting stays available because a clinic without stickers still has to send blood. It names what the courier checks and what happens to an unreadable tube, and needs no photo because there is nothing machine-readable to photograph.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', {
      name: /Write with a pen/
    }));
    await expect(canvas.getByText('SOK · M · 1994')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'I have labelled all 4 tubes'
    })).toBeEnabled();
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    initialStage: 'home-visit-booked',
    initialDecisions: {
      collectBy: 'kura',
      drawSite: 'patient-home',
      payment: 'pay-later-kura'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'The home route. A booked visit is not a drawn sample and not a paid one: the order sits awaiting collection until a phlebotomist actually arrives.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Awaiting collection')).toBeVisible();
    await expect(canvas.getByRole('heading', {
      name: 'Home visit booked'
    })).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Phlebotomist arrived, start the draw'
    })).toBeEnabled();
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    initialStage: 'handoff'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Mark samples ready'
    })).toBeDisabled();
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    initialStage: 'awaiting-results'
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...Q.parameters?.docs?.source}}},$=[`FullJourney`,`DoctorDrawsAndLabelsWithStickers`,`DoctorDrawsAndWritesByHand`,`HomeBloodCollectionBooked`,`HandoffGate`,`AwaitingResults`,`MobileWidth320`]}))();export{Z as AwaitingResults,q as DoctorDrawsAndLabelsWithStickers,J as DoctorDrawsAndWritesByHand,K as FullJourney,X as HandoffGate,Y as HomeBloodCollectionBooked,Q as MobileWidth320,$ as __namedExportsOrder,G as default};