import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{a as ee,s as i}from"./logic-Dw_xoo09.js";import{_ as a,a as o,b as s,c,d as te,f as ne,g as re,h as ie,i as ae,l as oe,m as se,n as ce,o as le,p as ue,r as de,s as l,t as fe,u,v as d,y as pe}from"./demo-data-CCZVOhpy.js";import{n as me,t as he}from"./order-cart-Cy3WwPC6.js";import{i as ge,n as _e,r as ve,t as ye}from"./storybook-metadata-BVIKPck2.js";function be({args:e,mobile:t=!1}){let[n,r]=(0,p.useState)(e.cart),[i,o]=(0,p.useState)(e.workflow),s=e=>o(t=>({...t,...e})),c=e=>{let t={...n,items:e};return n.pricing.state===`ready`?{...t,...a(e,{id:n.id,patient:n.patient})}:t};return(0,f.jsx)(`div`,{className:t?ge.mobileCanvas:ge.canvas,children:(0,f.jsx)(he,{cart:n,suggestions:e.suggestions,onSuggestionAccept:e.onSuggestionAccept,onSuggestionDismiss:e.onSuggestionDismiss,onAcceptReprice:()=>{e.onAcceptReprice?.(),r(e=>{if(e.pricing.state!==`stale`)return e;let t=new Map(e.pricing.repricedLines.map(e=>[e.itemId,e.newPriceMinor]));return{...e,items:e.items.map(e=>({...e,priceMinor:t.get(e.id)??e.priceMinor})),pricing:{state:`ready`,summary:e.pricing.summary}}})},onAddFirst:()=>{e.onAddFirst?.(),r(c([u[0]]))},onAttestChange:t=>{e.onAttestChange?.(t),s({attested:t})},onBackToCart:()=>{e.onBackToCart?.(),s({stage:`draft`})},onBlockerAction:e.onBlockerAction,onClear:()=>{e.onClear?.(),r(c(n.items.filter(e=>e.state===`locked`)))},onDecisionsChange:t=>{e.onDecisionsChange?.(t),s({decisions:t})},onMethodChange:t=>{e.onMethodChange?.(t),s({method:t})},onPanelChange:t=>{e.onPanelChange?.(t),s({panel:t})},onPrimaryAction:()=>{e.onPrimaryAction?.();let t=ee(n,i);if(!(!t||t.disabled)){if(i.role===`doctor`){o(e=>{let t=e;return t.stage===`tubes`?{...t,stage:`confirmed`}:t.stage===`code-sent`||t.stage===`collected`?t:t.decisions.collectBy===`self`?{...t,stage:`tubes`,tubes:t.tubes??fe}:{...t,stage:`code-sent`,panel:`summary`,paymentLocked:!0}});return}o(e=>{let t=e;return t.stage===`checked-in`?t:{...t,stage:`checked-in`,panel:`summary`,payment:t.method===`pay-later`?{status:`deferred`,label:`Pays later at Kura`}:{status:`paid`,label:t.method===`khqr`?`KHQR confirmed`:`Cash collected`,receiptId:`R-58213`}}})}},onRemoveItem:t=>{e.onRemoveItem?.(t),r(c(n.items.filter(e=>e.id!==t)))},onRetryPricing:()=>{e.onRetryPricing?.(),r(e=>e.pricing.state===`error`?{...e,...a(e.items,{id:e.id,patient:e.patient})}:e)},onTubeMethodChange:t=>{e.onTubeMethodChange?.(t),s({tubeMethod:t})},onTubeScan:(t,n)=>{e.onTubeScan?.(t,n),o(e=>e.role===`doctor`?{...e,tubes:(e.tubes??[]).map(e=>e.id===t?{...e,scanned:n}:e)}:e)},workflow:i})})}var f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,xe;t((()=>{f=r(),p=e(n()),pe(),i(),me(),ve(),_e(),{expect:m,fn:h,userEvent:g,within:_}=__STORYBOOK_MODULE_TEST__,v={title:`Design System/Clinical Components/Order Cart`,component:he,tags:[`autodocs`,`source-figma`,`source-kura-legacy`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:ye,docs:{description:{component:"The single Clinic order cart (Figma `OrderCart / HBC workflow`). Doctor and receptionist share one shell — selected tests, a collection-and-payment decision card, server-priced totals, attestation, and one primary action — while the typed workflow swaps the decisions, gates, and CTA vocabulary per role. Stories are live: Set up/Edit, attestation, tube scanning, and the primary action all respond in the canvas."}}},args:{cart:te,workflow:o,onRemoveItem:h(),onSuggestionAccept:h(),onSuggestionDismiss:h(),onClear:h(),onAddFirst:h(),onRetryPricing:h(),onAcceptReprice:h(),onBlockerAction:h(),onPrimaryAction:h(),onDecisionsChange:h(),onPanelChange:h(),onAttestChange:h(),onMethodChange:h(),onTubeScan:h(),onTubeMethodChange:h(),onBackToCart:h()},render:e=>(0,f.jsx)(be,{args:e})},y={name:`Doctor · empty`,args:{cart:oe},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByRole(`heading`,{name:`Order Cart`})).toBeVisible(),await m(t.getByText(`Nothing here yet`)).toBeVisible(),await g.click(t.getByRole(`button`,{name:`Add first test`})),await m(v.args.onAddFirst).toHaveBeenCalled(),await m(t.getByRole(`heading`,{name:`Selected tests`})).toBeVisible(),await m(t.getByText(`Iron panel`)).toBeVisible()}},b={name:`Doctor · collection not set up`,play:async({canvasElement:e})=>{let t=_(e);await m(t.getByRole(`heading`,{name:`Selected tests`})).toBeVisible(),await m(t.getByText(`13`)).toBeVisible(),await m(t.getByText(`Not set yet`)).toBeVisible(),await m(t.getByRole(`button`,{name:`Send booking code`})).toBeDisabled(),await m(t.getByText(`Set up collection & payment first.`)).toBeVisible(),await g.click(t.getByRole(`button`,{name:`Set up collection and payment`})),await m(v.args.onPanelChange).toHaveBeenCalledWith(`expanded`),await m(t.getByRole(`radio`,{name:`Kura will draw the blood`})).toBeVisible()}},x={name:`Doctor · no clinical reason recorded`,args:{workflow:d({indication:void 0})},parameters:{docs:{description:{story:`A lab test is an act on a patient, so the order has to say what it was for. Grounding is checked before the operational decisions: the cart asks for a diagnosis before it asks who draws the blood.`}}},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByRole(`button`,{name:`Send booking code`})).toBeDisabled(),await m(t.getByText(`Record a working diagnosis in the assessment first.`)).toBeVisible(),await m(t.queryByText(`Ordered for`)).not.toBeInTheDocument()}},S={name:`Doctor · order carries its stated reason`,parameters:{docs:{description:{story:`The reason sits under the title because it applies to every line below it, and it is a copy: revising the assessment later cannot rewrite why this order was placed.`}}},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`Ordered for`)).toBeVisible(),await m(t.getByText(`D50.9 · Iron deficiency anaemia, unspecified`)).toBeVisible()}},C={name:`Doctor · decision card expanded`,args:{workflow:le},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByRole(`radio`,{name:`Kura will draw the blood`})).toBeChecked(),await m(t.getByText(`Where is the blood drawn?`)).toBeVisible(),await m(t.getByRole(`radio`,{name:`Patient will pay you now`})).toBeChecked(),await g.click(t.getByRole(`radio`,{name:`I will draw the blood now`})),await m(t.queryByText(`Where is the blood drawn?`)).not.toBeInTheDocument(),await g.click(t.getByRole(`button`,{name:`Done`})),await m(t.getByText(`Clinic draw · you collect`)).toBeVisible(),await m(t.getByText(`Patient pays you now`)).toBeVisible(),await m(t.getByRole(`button`,{name:`Edit collection and payment`})).toBeVisible()}},w={name:`Doctor · edit a completed decision`,args:{workflow:l},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`Kura collection · Patient Home`)).toBeVisible(),await g.click(t.getByRole(`button`,{name:`Edit collection and payment`})),await m(v.args.onPanelChange).toHaveBeenCalledWith(`expanded`),await m(t.getByRole(`radio`,{name:`Kura will draw the blood`})).toHaveFocus();let n=t.getByRole(`radio`,{name:`Patient will pay you now`});await m(n).toBeEnabled(),await g.click(n),await g.click(t.getByRole(`button`,{name:`Done`})),await m(t.getByText(`Patient pays you now`)).toBeVisible(),await m(t.getByRole(`button`,{name:`Edit collection and payment`})).toHaveFocus(),await m(t.getByRole(`button`,{name:`Send booking code`})).toBeDisabled(),await m(t.getByRole(`checkbox`)).toBeVisible()}},T={name:`Doctor · Kura collects, pay later — ready to send`,args:{workflow:l},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`Kura collection · Patient Home`)).toBeVisible(),await m(t.getByText(`Patient pays later at Kura`)).toBeVisible(),await m(t.getByText(/earn/)).toBeVisible(),await m(t.getByText(`$24.90`)).toBeVisible();let n=t.getByRole(`button`,{name:`Send booking code`});await m(n).toBeEnabled(),await g.click(n),await m(v.args.onPrimaryAction).toHaveBeenCalled(),await m(t.getByText(`Code sent`)).toBeVisible(),await m(t.getByRole(`button`,{name:`Track home collection`})).toBeEnabled()}},E={name:`Doctor · pay now — attestation gate`,args:{workflow:d({panel:`summary`,decisions:{collectBy:`kura`,drawSite:`kura-psc`,payment:`pay-now`}})},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByRole(`button`,{name:`Send booking code`})).toBeDisabled(),await m(t.getByText(`Confirm you collected the payment first.`)).toBeVisible(),await g.click(t.getByRole(`checkbox`)),await m(v.args.onAttestChange).toHaveBeenCalledWith(!0),await m(t.getByRole(`button`,{name:`Send booking code`})).toBeEnabled()}},D={name:`Doctor · code sent — locked`,args:{workflow:de},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`Code sent`)).toBeVisible(),await m(t.queryByRole(`button`,{name:/^Remove /})).not.toBeInTheDocument(),await m(t.getByRole(`button`,{name:`Track home collection`})).toBeEnabled(),await g.click(t.getByRole(`button`,{name:`View collection and payment`})),await m(t.getByRole(`radio`,{name:`Kura will draw the blood`})).toBeDisabled(),await m(t.getByText(`Locked after payment. You can edit later in Booking.`)).toBeVisible()}},O={name:`Doctor · payment collected`,args:{workflow:ae},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`Cash collected`)).toBeVisible(),await m(t.getByRole(`button`,{name:`Track home collection`})).toBeEnabled()}},k={name:`Doctor · clinic draw — prepare tubes`,args:{workflow:ce},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`Clinic draw · you collect`)).toBeVisible(),await m(t.getByText(`Patient pays you now`)).toBeVisible();let n=t.getByRole(`button`,{name:`Prepare Tubes`});await m(n).toBeEnabled(),await g.click(n),await m(t.getByText(`You need to prepare tubes for`)).toBeVisible()}},A={name:`Doctor · tube preparation`,args:{workflow:c},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`You need to prepare tubes for`)).toBeVisible(),await m(t.getByText(`0/2 scanned`)).toBeVisible(),await m(t.getByText(`Serum tube · 5 mL`)).toBeVisible(),await m(t.getByText(`Urine cup · 10 mL`)).toBeVisible(),await m(t.getByRole(`button`,{name:`Confirm collection & scan`})).toBeDisabled();let n=t.getAllByRole(`button`,{name:`Mark scanned`});await g.click(n[0]),await m(v.args.onTubeScan).toHaveBeenCalledWith(`serum-5`,!0),await m(t.getByText(`1/2 scanned`)).toBeVisible(),await g.click(t.getByRole(`button`,{name:`Back to cart`})),await m(v.args.onBackToCart).toHaveBeenCalled(),await m(t.getByRole(`heading`,{name:`Selected tests`})).toBeVisible()}},j={name:`Doctor · tubes ready — 2/2 scanned`,args:{workflow:d({...c,tubes:fe.map(e=>({...e,scanned:!0}))})},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`2/2 scanned`)).toBeVisible(),await m(t.getAllByRole(`button`,{name:`Undo`})).toHaveLength(2),await m(t.getByRole(`button`,{name:`Confirm collection & scan`})).toBeEnabled()}},M={name:`Doctor · collection confirmed`,args:{workflow:d({stage:`confirmed`,panel:`summary`,decisions:{collectBy:`self`,payment:`pay-now`},attested:!0})},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByRole(`button`,{name:`Collection confirmed`})).toBeDisabled()}},N={name:`Doctor · unverified licence`,args:{workflow:d({authority:`explorer`,panel:`summary`,decisions:{collectBy:`kura`,drawSite:`kura-psc`,payment:`pay-later-kura`},earnings:void 0})},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByRole(`button`,{name:`Send booking code`})).toBeDisabled(),await m(t.getByText(`Verify the clinician licence to place this order.`)).toBeVisible()}},P={name:`Doctor · read-only access`,args:{workflow:d({access:`read-only`})},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByRole(`button`,{name:`Send booking code`})).toBeDisabled(),await m(t.getByText(`This order is read only for your current access.`)).toBeVisible(),await m(t.queryByRole(`button`,{name:/^Remove /})).not.toBeInTheDocument()}},F={name:`Reception · payment due`,args:{workflow:se},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByRole(`complementary`,{name:`Receptionist order cart`})).toBeVisible(),await m(t.getByRole(`button`,{name:`Confirm payment & check in`})).toBeDisabled(),await m(t.getByText(`Choose a payment method first.`)).toBeVisible(),await g.click(t.getByRole(`button`,{name:`Set up payment`})),await m(v.args.onPanelChange).toHaveBeenCalledWith(`expanded`),await m(t.getByRole(`radio`,{name:`Cash at the desk`})).toBeVisible()}},I={name:`Reception · tender method expanded`,args:{workflow:ne},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByRole(`radio`,{name:`Cash at the desk`})).toBeChecked(),await g.click(t.getByRole(`radio`,{name:`KHQR transfer`})),await m(v.args.onMethodChange).toHaveBeenCalledWith(`khqr`),await m(t.getByRole(`radio`,{name:`KHQR transfer`})).toBeChecked(),await g.click(t.getByRole(`radio`,{name:`Pay later at Kura`})),await m(t.getByRole(`radio`,{name:`Pay later at Kura`})).toBeChecked(),await g.click(t.getByRole(`button`,{name:`Done`})),await m(t.getByText(`Payment · Pay later at Kura`)).toBeVisible()}},L={name:`Reception · cash — attestation gate`,args:{workflow:s({method:`cash`,panel:`summary`})},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`Payment · Cash`)).toBeVisible(),await m(t.getByRole(`button`,{name:`Confirm payment & check in`})).toBeDisabled(),await m(t.getByText(`Confirm the payment was collected first.`)).toBeVisible(),await g.click(t.getByRole(`checkbox`)),await m(v.args.onAttestChange).toHaveBeenCalledWith(!0),await m(t.getByRole(`button`,{name:`Confirm payment & check in`})).toBeEnabled()}},R={name:`Reception · pay later at Kura`,args:{workflow:s({method:`pay-later`,panel:`summary`})},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`Payment · Pay later at Kura`)).toBeVisible(),await m(t.queryByRole(`checkbox`)).not.toBeInTheDocument(),await m(t.getByRole(`button`,{name:`Check in & confirm order`})).toBeEnabled()}},z={name:`Reception · paid — tender locked`,args:{workflow:re},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`Cash collected · R-58213`)).toBeVisible(),await m(t.getByRole(`button`,{name:`Check in & confirm order`})).toBeEnabled(),await g.click(t.getByRole(`button`,{name:`View payment`})),await m(t.getByRole(`radio`,{name:`Cash at the desk`})).toBeDisabled(),await m(t.getByText(`Locked after payment. Changes route through void or supplemental.`)).toBeVisible()}},B={name:`Reception · patient checked in`,args:{workflow:ue},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByRole(`button`,{name:`Patient checked in`})).toBeDisabled(),await m(t.queryByRole(`button`,{name:/^Remove /})).not.toBeInTheDocument()}},V={name:`Reception · no eligible prescriber`,args:{workflow:ie},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`No eligible prescriber for this order`)).toBeVisible(),await g.click(t.getByRole(`button`,{name:`Choose prescriber`})),await m(v.args.onBlockerAction).toHaveBeenCalledWith(`no-eligible-prescriber`)}},H={name:`Reception · supplemental line after paid edit`,args:{cart:a([...u.slice(0,3).map(e=>({...e,state:`locked`})),{...u[3],state:`supplemental`}],{pricing:{state:`ready`,summary:{subtotalMinor:`6400`,patientDueMinor:`1000`,previousPaidMinor:`5400`,previousReceiptId:`R-58213`,currencyCode:`USD`}}}),workflow:s({method:`cash`,panel:`summary`})},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`Added after payment`)).toBeVisible(),await m(t.getByText(/Previously paid/)).toBeVisible(),await m(t.getAllByText(`Required`).length).toBeGreaterThan(0)}},U={name:`Pricing · updating`,args:{cart:a(u,{pricing:{state:`loading`}}),workflow:l},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`Updating prices…`)).toBeVisible(),await m(t.getByRole(`button`,{name:`Send booking code`})).toBeDisabled(),await m(t.getByText(`Prices are still updating.`)).toBeVisible();let n=t.getByRole(`button`,{name:`Edit collection and payment`});await m(n).toBeEnabled(),await m(n).toHaveAttribute(`aria-expanded`,`false`),await g.click(n),await m(t.getByRole(`radio`,{name:`Kura will draw the blood`})).toHaveFocus();let r=t.getByRole(`button`,{name:`Done`});await m(r).toHaveAttribute(`aria-expanded`,`true`),await g.click(r),await m(t.getByRole(`button`,{name:`Edit collection and payment`})).toHaveFocus()}},W={name:`Pricing · unavailable`,args:{cart:a(u,{pricing:{state:`error`}}),workflow:se},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`Price unavailable`)).toBeVisible(),await g.click(t.getByRole(`button`,{name:`Retry pricing`})),await m(v.args.onRetryPricing).toHaveBeenCalled(),await m(t.queryByText(`Price unavailable`)).not.toBeInTheDocument()}},G={name:`Pricing · server reprice`,args:{cart:a(u,{pricing:{state:`stale`,summary:{subtotalMinor:`16800`,patientDueMinor:`16800`,currencyCode:`USD`},repricedLines:[{itemId:`ferritin`,name:`Ferritin`,oldPriceMinor:`1400`,newPriceMinor:`1600`}]}}),workflow:l},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`Prices changed`)).toBeVisible(),await m(t.getByRole(`button`,{name:`Send booking code`})).toBeDisabled(),await g.click(t.getByRole(`button`,{name:`Accept new price`})),await m(v.args.onAcceptReprice).toHaveBeenCalled(),await m(t.queryByText(`Prices changed`)).not.toBeInTheDocument(),await m(t.getAllByText(`$16.00`)).toHaveLength(2),await m(t.getByRole(`button`,{name:`Send booking code`})).toBeEnabled()}},K={name:`Pricing · KHR tender line`,args:{cart:a(u,{pricing:{state:`ready`,summary:{subtotalMinor:`16600`,patientDueMinor:`16600`,patientDueKhrMinor:`68060000`,currencyCode:`USD`}}}),workflow:s({method:`cash`,panel:`summary`})},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`Patient due · KHR`)).toBeVisible()}},q={args:{workflow:l},globals:{viewport:{value:`kura390`}},render:e=>(0,f.jsx)(be,{args:e,mobile:!0})},J={args:{workflow:c},globals:{viewport:{value:`kura390`}},render:e=>(0,f.jsx)(be,{args:e,mobile:!0})},Y={args:{workflow:le},globals:{theme:`dark`}},X={args:{workflow:re},globals:{theme:`dark`}},Z={name:`Hierarchy · panel channels and derived inputs`,args:{cart:a([{id:`cmp`,kind:`lab`,name:`CMP (metabolic panel)`,priceMinor:`1500`,currencyCode:`USD`,quantity:1,children:[{id:`cmp-glucose`,name:`Glucose`,relation:`panel_channel`},{id:`cmp-creatinine`,name:`Creatinine`,relation:`panel_channel`},{id:`cmp-alt`,name:`ALT`,relation:`panel_channel`},{id:`cmp-ast`,name:`AST`,relation:`panel_channel`}]},{id:`egfr-derived`,kind:`lab`,name:`eGFR (derived)`,priceMinor:`0`,currencyCode:`USD`,quantity:1,children:[{id:`egfr-crea`,name:`Creatinine`,relation:`derived_input`}]}]),workflow:o},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`Glucose`)).toBeVisible(),await m(t.getByText(/· input/)).toBeVisible(),await m(t.queryByRole(`button`,{name:`Remove Glucose`})).not.toBeInTheDocument(),await m(t.getByRole(`button`,{name:`Remove CMP (metabolic panel)`})).toBeVisible()}},Q={name:`Shared credit · never double-charged`,args:{cart:a([{id:`cmp`,kind:`lab`,name:`CMP (metabolic panel)`,priceMinor:`1500`,currencyCode:`USD`,quantity:1,children:[{id:`cmp-glucose`,name:`Glucose`,relation:`panel_channel`,creditMinor:`400`}]},{id:`glucose-f`,kind:`lab`,name:`Glucose (fasting)`,priceMinor:`0`,currencyCode:`USD`,quantity:1,struckPriceMinor:`400`}],{pricing:{state:`ready`,summary:{subtotalMinor:`1900`,patientDueMinor:`1500`,currencyCode:`USD`,creditMinor:`400`,creditLabel:`Shared lab work`}}}),workflow:o},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(`Shared lab work`)).toBeVisible(),await m(t.getAllByText(`$4.00`).length).toBeGreaterThanOrEqual(2)}},$={name:`Suggestions · four engine verdicts`,args:{cart:te,workflow:o,suggestions:[{id:`s-exact`,kind:`exact_match`,title:`Replace 3 standalone tests with the Metabolic panel`,detail:`Same analytes, one draw.`,deltaMinor:`4800`,deltaDirection:`save`,actionLabel:`Replace with panel`},{id:`s-upsell`,kind:`upsell`,title:`Upgrade to Lipid Panel+`,detail:`Adds HbA1c and Microalbumin.`,deltaMinor:`1000`,deltaDirection:`add`,actionLabel:`Upgrade`},{id:`s-redundant`,kind:`redundancy`,title:`LDL is already delivered by the Lipid panel`,deltaMinor:`2000`,deltaDirection:`save`,actionLabel:`Remove standalone LDL`},{id:`s-dependency`,kind:`dependency_fill`,title:`eGFR needs Creatinine`,detail:`Cheapest cover: add Creatinine + eGFR.`,deltaMinor:`800`,deltaDirection:`add`,actionLabel:`Add Creatinine`}]},play:async({canvasElement:e})=>{let t=_(e);await m(t.getByText(/Replace 3 standalone tests/)).toBeVisible(),await m(t.getByText(`Upgrade to Lipid Panel+`)).toBeVisible(),await m(t.getAllByRole(`button`,{name:`Keep as is`})).toHaveLength(1),await m(t.getAllByRole(`alert`).length).toBeGreaterThanOrEqual(2)}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Doctor · empty',
  args: {
    cart: EMPTY_CART
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Order Cart'
    })).toBeVisible();
    await expect(canvas.getByText('Nothing here yet')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Add first test'
    }));
    await expect(meta.args.onAddFirst).toHaveBeenCalled();
    await expect(canvas.getByRole('heading', {
      name: 'Selected tests'
    })).toBeVisible();
    await expect(canvas.getByText('Iron panel')).toBeVisible();
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Doctor · collection not set up',
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      name: 'Selected tests'
    })).toBeVisible();
    await expect(canvas.getByText('13')).toBeVisible();
    await expect(canvas.getByText('Not set yet')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Send booking code'
    })).toBeDisabled();
    await expect(canvas.getByText('Set up collection & payment first.')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Set up collection and payment'
    }));
    await expect(meta.args.onPanelChange).toHaveBeenCalledWith('expanded');
    await expect(canvas.getByRole('radio', {
      name: 'Kura will draw the blood'
    })).toBeVisible();
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Doctor · no clinical reason recorded',
  args: {
    workflow: doctorWorkflow({
      indication: undefined
    })
  },
  parameters: {
    docs: {
      description: {
        story: 'A lab test is an act on a patient, so the order has to say what it was for. Grounding is checked before the operational decisions: the cart asks for a diagnosis before it asks who draws the blood.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Send booking code'
    })).toBeDisabled();
    await expect(canvas.getByText('Record a working diagnosis in the assessment first.')).toBeVisible();
    await expect(canvas.queryByText('Ordered for')).not.toBeInTheDocument();
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Doctor · order carries its stated reason',
  parameters: {
    docs: {
      description: {
        story: 'The reason sits under the title because it applies to every line below it, and it is a copy: revising the assessment later cannot rewrite why this order was placed.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Ordered for')).toBeVisible();
    await expect(canvas.getByText('D50.9 · Iron deficiency anaemia, unspecified')).toBeVisible();
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Doctor · decision card expanded',
  args: {
    workflow: DOCTOR_PAYMENT_CHOICE
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('radio', {
      name: 'Kura will draw the blood'
    })).toBeChecked();
    await expect(canvas.getByText('Where is the blood drawn?')).toBeVisible();
    await expect(canvas.getByRole('radio', {
      name: 'Patient will pay you now'
    })).toBeChecked();

    // Switching to self-draw removes the draw-site question.
    await userEvent.click(canvas.getByRole('radio', {
      name: 'I will draw the blood now'
    }));
    await expect(canvas.queryByText('Where is the blood drawn?')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Done'
    }));
    await expect(canvas.getByText('Clinic draw · you collect')).toBeVisible();
    await expect(canvas.getByText('Patient pays you now')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Edit collection and payment'
    })).toBeVisible();
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Doctor · edit a completed decision',
  args: {
    workflow: DOCTOR_PAY_LATER
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Kura collection · Patient Home')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Edit collection and payment'
    }));
    await expect(meta.args.onPanelChange).toHaveBeenCalledWith('expanded');
    await expect(canvas.getByRole('radio', {
      name: 'Kura will draw the blood'
    })).toHaveFocus();
    const payNow = canvas.getByRole('radio', {
      name: 'Patient will pay you now'
    });
    await expect(payNow).toBeEnabled();
    await userEvent.click(payNow);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Done'
    }));
    await expect(canvas.getByText('Patient pays you now')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Edit collection and payment'
    })).toHaveFocus();
    // Pay-now re-arms the attestation gate.
    await expect(canvas.getByRole('button', {
      name: 'Send booking code'
    })).toBeDisabled();
    await expect(canvas.getByRole('checkbox')).toBeVisible();
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Doctor · Kura collects, pay later — ready to send',
  args: {
    workflow: DOCTOR_PAY_LATER
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Kura collection · Patient Home')).toBeVisible();
    await expect(canvas.getByText('Patient pays later at Kura')).toBeVisible();
    await expect(canvas.getByText(/earn/)).toBeVisible();
    await expect(canvas.getByText('$24.90')).toBeVisible();
    const cta = canvas.getByRole('button', {
      name: 'Send booking code'
    });
    await expect(cta).toBeEnabled();
    await userEvent.click(cta);
    await expect(meta.args.onPrimaryAction).toHaveBeenCalled();
    await expect(canvas.getByText('Code sent')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Track home collection'
    })).toBeEnabled();
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Doctor · pay now — attestation gate',
  args: {
    workflow: doctorWorkflow({
      panel: 'summary',
      decisions: {
        collectBy: 'kura',
        drawSite: 'kura-psc',
        payment: 'pay-now'
      }
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Send booking code'
    })).toBeDisabled();
    await expect(canvas.getByText('Confirm you collected the payment first.')).toBeVisible();
    await userEvent.click(canvas.getByRole('checkbox'));
    await expect(meta.args.onAttestChange).toHaveBeenCalledWith(true);
    await expect(canvas.getByRole('button', {
      name: 'Send booking code'
    })).toBeEnabled();
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Doctor · code sent — locked',
  args: {
    workflow: DOCTOR_CODE_SENT
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Code sent')).toBeVisible();
    await expect(canvas.queryByRole('button', {
      name: /^Remove /
    })).not.toBeInTheDocument();
    await expect(canvas.getByRole('button', {
      name: 'Track home collection'
    })).toBeEnabled();

    // View opens the decision card read-only: options render but stay locked.
    await userEvent.click(canvas.getByRole('button', {
      name: 'View collection and payment'
    }));
    await expect(canvas.getByRole('radio', {
      name: 'Kura will draw the blood'
    })).toBeDisabled();
    await expect(canvas.getByText('Locked after payment. You can edit later in Booking.')).toBeVisible();
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Doctor · payment collected',
  args: {
    workflow: DOCTOR_COLLECTED
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Cash collected')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Track home collection'
    })).toBeEnabled();
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Doctor · clinic draw — prepare tubes',
  args: {
    workflow: DOCTOR_CLINIC_DRAW
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Clinic draw · you collect')).toBeVisible();
    await expect(canvas.getByText('Patient pays you now')).toBeVisible();
    const cta = canvas.getByRole('button', {
      name: 'Prepare Tubes'
    });
    await expect(cta).toBeEnabled();
    await userEvent.click(cta);
    await expect(canvas.getByText('You need to prepare tubes for')).toBeVisible();
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Doctor · tube preparation',
  args: {
    workflow: DOCTOR_TUBES
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('You need to prepare tubes for')).toBeVisible();
    await expect(canvas.getByText('0/2 scanned')).toBeVisible();
    await expect(canvas.getByText('Serum tube · 5 mL')).toBeVisible();
    await expect(canvas.getByText('Urine cup · 10 mL')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Confirm collection & scan'
    })).toBeDisabled();
    const scanButtons = canvas.getAllByRole('button', {
      name: 'Mark scanned'
    });
    await userEvent.click(scanButtons[0]);
    await expect(meta.args.onTubeScan).toHaveBeenCalledWith('serum-5', true);
    await expect(canvas.getByText('1/2 scanned')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Back to cart'
    }));
    await expect(meta.args.onBackToCart).toHaveBeenCalled();
    await expect(canvas.getByRole('heading', {
      name: 'Selected tests'
    })).toBeVisible();
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Doctor · tubes ready — 2/2 scanned',
  args: {
    workflow: doctorWorkflow({
      ...DOCTOR_TUBES,
      tubes: DEMO_TUBES.map(tube => ({
        ...tube,
        scanned: true
      }))
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('2/2 scanned')).toBeVisible();
    await expect(canvas.getAllByRole('button', {
      name: 'Undo'
    })).toHaveLength(2);
    await expect(canvas.getByRole('button', {
      name: 'Confirm collection & scan'
    })).toBeEnabled();
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Doctor · collection confirmed',
  args: {
    workflow: doctorWorkflow({
      stage: 'confirmed',
      panel: 'summary',
      decisions: {
        collectBy: 'self',
        payment: 'pay-now'
      },
      attested: true
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Collection confirmed'
    })).toBeDisabled();
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Doctor · unverified licence',
  args: {
    workflow: doctorWorkflow({
      authority: 'explorer',
      panel: 'summary',
      decisions: {
        collectBy: 'kura',
        drawSite: 'kura-psc',
        payment: 'pay-later-kura'
      },
      earnings: undefined
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Send booking code'
    })).toBeDisabled();
    await expect(canvas.getByText('Verify the clinician licence to place this order.')).toBeVisible();
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Doctor · read-only access',
  args: {
    workflow: doctorWorkflow({
      access: 'read-only'
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Send booking code'
    })).toBeDisabled();
    await expect(canvas.getByText('This order is read only for your current access.')).toBeVisible();
    await expect(canvas.queryByRole('button', {
      name: /^Remove /
    })).not.toBeInTheDocument();
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Reception · payment due',
  args: {
    workflow: RECEPTION_DUE
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('complementary', {
      name: 'Receptionist order cart'
    })).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Confirm payment & check in'
    })).toBeDisabled();
    await expect(canvas.getByText('Choose a payment method first.')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Set up payment'
    }));
    await expect(meta.args.onPanelChange).toHaveBeenCalledWith('expanded');
    await expect(canvas.getByRole('radio', {
      name: 'Cash at the desk'
    })).toBeVisible();
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Reception · tender method expanded',
  args: {
    workflow: RECEPTION_CASH_CHOSEN
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('radio', {
      name: 'Cash at the desk'
    })).toBeChecked();
    await userEvent.click(canvas.getByRole('radio', {
      name: 'KHQR transfer'
    }));
    await expect(meta.args.onMethodChange).toHaveBeenCalledWith('khqr');
    await expect(canvas.getByRole('radio', {
      name: 'KHQR transfer'
    })).toBeChecked();
    await userEvent.click(canvas.getByRole('radio', {
      name: 'Pay later at Kura'
    }));
    await expect(canvas.getByRole('radio', {
      name: 'Pay later at Kura'
    })).toBeChecked();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Done'
    }));
    await expect(canvas.getByText('Payment · Pay later at Kura')).toBeVisible();
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Reception · cash — attestation gate',
  args: {
    workflow: receptionistWorkflow({
      method: 'cash',
      panel: 'summary'
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Payment · Cash')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Confirm payment & check in'
    })).toBeDisabled();
    await expect(canvas.getByText('Confirm the payment was collected first.')).toBeVisible();
    await userEvent.click(canvas.getByRole('checkbox'));
    await expect(meta.args.onAttestChange).toHaveBeenCalledWith(true);
    await expect(canvas.getByRole('button', {
      name: 'Confirm payment & check in'
    })).toBeEnabled();
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Reception · pay later at Kura',
  args: {
    workflow: receptionistWorkflow({
      method: 'pay-later',
      panel: 'summary'
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Payment · Pay later at Kura')).toBeVisible();
    await expect(canvas.queryByRole('checkbox')).not.toBeInTheDocument();
    await expect(canvas.getByRole('button', {
      name: 'Check in & confirm order'
    })).toBeEnabled();
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Reception · paid — tender locked',
  args: {
    workflow: RECEPTION_PAID
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Cash collected · R-58213')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Check in & confirm order'
    })).toBeEnabled();

    // View shows the tender read-only after capture.
    await userEvent.click(canvas.getByRole('button', {
      name: 'View payment'
    }));
    await expect(canvas.getByRole('radio', {
      name: 'Cash at the desk'
    })).toBeDisabled();
    await expect(canvas.getByText('Locked after payment. Changes route through void or supplemental.')).toBeVisible();
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: 'Reception · patient checked in',
  args: {
    workflow: RECEPTION_CHECKED_IN
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Patient checked in'
    })).toBeDisabled();
    await expect(canvas.queryByRole('button', {
      name: /^Remove /
    })).not.toBeInTheDocument();
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Reception · no eligible prescriber',
  args: {
    workflow: RECEPTION_NO_ELIGIBLE_PRESCRIBER
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No eligible prescriber for this order')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Choose prescriber'
    }));
    await expect(meta.args.onBlockerAction).toHaveBeenCalledWith('no-eligible-prescriber');
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Reception · supplemental line after paid edit',
  args: {
    cart: cartWith([...FIGMA_TESTS.slice(0, 3).map(item => ({
      ...item,
      state: 'locked' as const
    })), {
      ...FIGMA_TESTS[3],
      state: 'supplemental' as const
    }], {
      pricing: {
        state: 'ready',
        summary: {
          subtotalMinor: '6400',
          patientDueMinor: '1000',
          previousPaidMinor: '5400',
          previousReceiptId: 'R-58213',
          currencyCode: 'USD'
        }
      }
    }),
    workflow: receptionistWorkflow({
      method: 'cash',
      panel: 'summary'
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Added after payment')).toBeVisible();
    await expect(canvas.getByText(/Previously paid/)).toBeVisible();
    await expect(canvas.getAllByText('Required').length).toBeGreaterThan(0);
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: 'Pricing · updating',
  args: {
    cart: cartWith(FIGMA_TESTS, {
      pricing: {
        state: 'loading'
      }
    }),
    workflow: DOCTOR_PAY_LATER
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Updating prices…')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Send booking code'
    })).toBeDisabled();
    await expect(canvas.getByText('Prices are still updating.')).toBeVisible();
    const edit = canvas.getByRole('button', {
      name: 'Edit collection and payment'
    });
    await expect(edit).toBeEnabled();
    await expect(edit).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(edit);
    await expect(canvas.getByRole('radio', {
      name: 'Kura will draw the blood'
    })).toHaveFocus();
    const done = canvas.getByRole('button', {
      name: 'Done'
    });
    await expect(done).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(done);
    await expect(canvas.getByRole('button', {
      name: 'Edit collection and payment'
    })).toHaveFocus();
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'Pricing · unavailable',
  args: {
    cart: cartWith(FIGMA_TESTS, {
      pricing: {
        state: 'error'
      }
    }),
    workflow: RECEPTION_DUE
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Price unavailable')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Retry pricing'
    }));
    await expect(meta.args.onRetryPricing).toHaveBeenCalled();
    await expect(canvas.queryByText('Price unavailable')).not.toBeInTheDocument();
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'Pricing · server reprice',
  args: {
    cart: cartWith(FIGMA_TESTS, {
      pricing: {
        state: 'stale',
        summary: {
          subtotalMinor: '16800',
          patientDueMinor: '16800',
          currencyCode: 'USD'
        },
        repricedLines: [{
          itemId: 'ferritin',
          name: 'Ferritin',
          oldPriceMinor: '1400',
          newPriceMinor: '1600'
        }]
      }
    }),
    workflow: DOCTOR_PAY_LATER
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Prices changed')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Send booking code'
    })).toBeDisabled();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Accept new price'
    }));
    await expect(meta.args.onAcceptReprice).toHaveBeenCalled();
    await expect(canvas.queryByText('Prices changed')).not.toBeInTheDocument();
    // Ferritin now joins Creatinine clearance at the accepted $16.00 price.
    await expect(canvas.getAllByText('$16.00')).toHaveLength(2);
    await expect(canvas.getByRole('button', {
      name: 'Send booking code'
    })).toBeEnabled();
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Pricing · KHR tender line',
  args: {
    cart: cartWith(FIGMA_TESTS, {
      pricing: {
        state: 'ready',
        summary: {
          subtotalMinor: '16600',
          patientDueMinor: '16600',
          patientDueKhrMinor: '68060000',
          currencyCode: 'USD'
        }
      }
    }),
    workflow: receptionistWorkflow({
      method: 'cash',
      panel: 'summary'
    })
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Patient due · KHR')).toBeVisible();
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    workflow: DOCTOR_PAY_LATER
  },
  globals: {
    viewport: {
      value: 'kura390'
    }
  },
  render: args => <Playground args={args} mobile />
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    workflow: DOCTOR_TUBES
  },
  globals: {
    viewport: {
      value: 'kura390'
    }
  },
  render: args => <Playground args={args} mobile />
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    workflow: DOCTOR_PAYMENT_CHOICE
  },
  globals: {
    theme: 'dark'
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    workflow: RECEPTION_PAID
  },
  globals: {
    theme: 'dark'
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'Hierarchy · panel channels and derived inputs',
  args: {
    cart: cartWith([{
      id: 'cmp',
      kind: 'lab',
      name: 'CMP (metabolic panel)',
      priceMinor: '1500',
      currencyCode: 'USD',
      quantity: 1,
      children: [{
        id: 'cmp-glucose',
        name: 'Glucose',
        relation: 'panel_channel'
      }, {
        id: 'cmp-creatinine',
        name: 'Creatinine',
        relation: 'panel_channel'
      }, {
        id: 'cmp-alt',
        name: 'ALT',
        relation: 'panel_channel'
      }, {
        id: 'cmp-ast',
        name: 'AST',
        relation: 'panel_channel'
      }]
    }, {
      id: 'egfr-derived',
      kind: 'lab',
      name: 'eGFR (derived)',
      priceMinor: '0',
      currencyCode: 'USD',
      quantity: 1,
      children: [{
        id: 'egfr-crea',
        name: 'Creatinine',
        relation: 'derived_input'
      }]
    }]),
    workflow: DOCTOR_NOT_CONFIGURED
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Glucose')).toBeVisible();
    await expect(canvas.getByText(/· input/)).toBeVisible();
    // Members carry no remove affordance — only the container does.
    await expect(canvas.queryByRole('button', {
      name: 'Remove Glucose'
    })).not.toBeInTheDocument();
    await expect(canvas.getByRole('button', {
      name: 'Remove CMP (metabolic panel)'
    })).toBeVisible();
  }
}`,...Z.parameters?.docs?.source},description:{story:`Container ontology in the cart: a panel lists its channels, a derived test
lists its inputs. Members are facts of the container — priceless, never
individually removable.`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: 'Shared credit · never double-charged',
  args: {
    cart: cartWith([{
      id: 'cmp',
      kind: 'lab',
      name: 'CMP (metabolic panel)',
      priceMinor: '1500',
      currencyCode: 'USD',
      quantity: 1,
      children: [{
        id: 'cmp-glucose',
        name: 'Glucose',
        relation: 'panel_channel',
        creditMinor: '400'
      }]
    }, {
      id: 'glucose-f',
      kind: 'lab',
      name: 'Glucose (fasting)',
      priceMinor: '0',
      currencyCode: 'USD',
      quantity: 1,
      struckPriceMinor: '400'
    }], {
      pricing: {
        state: 'ready',
        summary: {
          subtotalMinor: '1900',
          patientDueMinor: '1500',
          currencyCode: 'USD',
          creditMinor: '400',
          creditLabel: 'Shared lab work'
        }
      }
    }),
    workflow: DOCTOR_NOT_CONFIGURED
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Shared lab work')).toBeVisible();
    await expect(canvas.getAllByText('$4.00').length).toBeGreaterThanOrEqual(2);
  }
}`,...Q.parameters?.docs?.source},description:{story:`Shared-atom dedupe: an analyte delivered twice is credited, the gross price
is struck through, and the totals carry the credit line — the patient can
see they were not double-charged.`,...Q.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  name: 'Suggestions · four engine verdicts',
  args: {
    cart: FULL_CART,
    workflow: DOCTOR_NOT_CONFIGURED,
    suggestions: [{
      id: 's-exact',
      kind: 'exact_match',
      title: 'Replace 3 standalone tests with the Metabolic panel',
      detail: 'Same analytes, one draw.',
      deltaMinor: '4800',
      deltaDirection: 'save',
      actionLabel: 'Replace with panel'
    }, {
      id: 's-upsell',
      kind: 'upsell',
      title: 'Upgrade to Lipid Panel+',
      detail: 'Adds HbA1c and Microalbumin.',
      deltaMinor: '1000',
      deltaDirection: 'add',
      actionLabel: 'Upgrade'
    }, {
      id: 's-redundant',
      kind: 'redundancy',
      title: 'LDL is already delivered by the Lipid panel',
      deltaMinor: '2000',
      deltaDirection: 'save',
      actionLabel: 'Remove standalone LDL'
    }, {
      id: 's-dependency',
      kind: 'dependency_fill',
      title: 'eGFR needs Creatinine',
      detail: 'Cheapest cover: add Creatinine + eGFR.',
      deltaMinor: '800',
      deltaDirection: 'add',
      actionLabel: 'Add Creatinine'
    }]
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Replace 3 standalone tests/)).toBeVisible();
    await expect(canvas.getByText('Upgrade to Lipid Panel+')).toBeVisible();
    // Only the redundancy verdict is dismissible.
    await expect(canvas.getAllByRole('button', {
      name: 'Keep as is'
    })).toHaveLength(1);
    // Alert-level verdicts announce; offers stay polite.
    await expect(canvas.getAllByRole('alert').length).toBeGreaterThanOrEqual(2);
  }
}`,...$.parameters?.docs?.source},description:{story:`The four engine verdicts with locked semantics. The upsell rail is REAL
upstream (cart/expand, exclude_upsell=false); order is engine-owned.`,...$.parameters?.docs?.description}}},xe=`DoctorEmpty.DoctorNotConfigured.DoctorNoIndication.DoctorIndicationShown.DoctorDecisionExpanded.DoctorEditDecisions.DoctorPayLaterReady.DoctorPayNowNeedsAttestation.DoctorCodeSent.DoctorPaymentCollected.DoctorClinicDraw.DoctorTubePreparation.DoctorTubesReady.DoctorCollectionConfirmed.DoctorExplorerBlocked.DoctorReadOnlyAccess.ReceptionPaymentDue.ReceptionMethodChoice.ReceptionAttestationGate.ReceptionPayLater.ReceptionPaidLocked.ReceptionCheckedIn.ReceptionBlockedPrescriber.ReceptionSupplementalAfterPaidEdit.PricingLoading.PricingError.PricingStale.KhrTenderLine.Mobile.MobileTubePreparation.DarkTheme.DarkThemeReception.HierarchicalRelations.SharedAtomCredit.EngineSuggestions`.split(`.`)}))();export{Y as DarkTheme,X as DarkThemeReception,k as DoctorClinicDraw,D as DoctorCodeSent,M as DoctorCollectionConfirmed,C as DoctorDecisionExpanded,w as DoctorEditDecisions,y as DoctorEmpty,N as DoctorExplorerBlocked,S as DoctorIndicationShown,x as DoctorNoIndication,b as DoctorNotConfigured,T as DoctorPayLaterReady,E as DoctorPayNowNeedsAttestation,O as DoctorPaymentCollected,P as DoctorReadOnlyAccess,A as DoctorTubePreparation,j as DoctorTubesReady,$ as EngineSuggestions,Z as HierarchicalRelations,K as KhrTenderLine,q as Mobile,J as MobileTubePreparation,W as PricingError,U as PricingLoading,G as PricingStale,L as ReceptionAttestationGate,V as ReceptionBlockedPrescriber,B as ReceptionCheckedIn,I as ReceptionMethodChoice,z as ReceptionPaidLocked,R as ReceptionPayLater,F as ReceptionPaymentDue,H as ReceptionSupplementalAfterPaidEdit,Q as SharedAtomCredit,xe as __namedExportsOrder,v as default};