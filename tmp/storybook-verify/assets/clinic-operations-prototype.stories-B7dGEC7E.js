import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{t as i}from"./ui-C9kmmzkH.js";import{i as a,n as o,r as s,t as c}from"./alert-l7nmjmGJ.js";import{t as l}from"./button-B6_zsN5-.js";import{r as u,t as ee}from"./app-shell-dOUH8yca.js";import{r as d,t as f}from"./readiness-data-D41RGqZh.js";import{t as p}from"./app-shell-Bb-tldyu.js";import{l as m}from"./catalog-i61dxfuf.js";import{d as h,p as g}from"./logic-CGFDdeX3.js";import{n as _}from"./vitals-form-B1wk1Eqg.js";import{n as v}from"./defer-dialog-uDw_9c1-.js";import{a as y,i as b,n as x,o as S,r as C,t as w}from"./scan-gate-K7TDwbHJ.js";import{n as T}from"./tube-labeling-CW5SV4Xb.js";import{i as E,n as D,r as O,t as k}from"./demo-data-BPDPlpxo.js";import{L as A,bt as j,d as M,g as N,m as P}from"./demo-data-DZ0mjvYd.js";import{n as te}from"./booking-detail-sheet-DqoUfmOZ.js";import{n as ne}from"./check-in-complete-D_iwDI9b.js";import{n as re}from"./cart-rail-CCEg0ERV.js";import{a as ie,i as ae,n as oe,r as se,t as ce}from"./check-in-wizard-DvzZbfaU.js";var F=t((()=>{})),I=t((()=>{x(),S(),y(),v(),_(),b(),T(),F(),m(),h(),E()})),L=t((()=>{te(),ne(),oe(),ae(),se(),re(),ie(),j(),A(),N()}));function R(){let[e,t]=(0,B.useState)(`front-desk`),[n,r]=(0,B.useState)(u[`front-desk`].entryKey),[i,d]=(0,B.useState)(`morning`),[f,p]=(0,B.useState)(()=>P(`prototype-walk-in-1`,33)),[m,h]=(0,B.useState)(!1),[g,_]=(0,B.useState)(null),[v,y]=(0,B.useState)([]),[b,x]=(0,B.useState)(!1);function S(e){t(e),r(u[e].entryKey)}function T(){p(P(`prototype-walk-in-2`,34)),h(!1)}function E(){_(null),y([]),x(!1)}return(0,z.jsx)(ee,{activeKey:n,availableModes:V,banner:(0,z.jsxs)(c,{tone:`info`,children:[(0,z.jsx)(a,{children:`Mock Storybook prototype`}),(0,z.jsx)(s,{children:`No backend writes. Reception SMS code: 123456. Phlebotomy patient barcode: P104481.`})]}),mode:e,nav:e===`front-desk`?W:void 0,onModeChange:S,onNavigate:r,onShiftChange:d,posture:e===`collection`?`station`:`sidebar`,station:{id:e===`front-desk`?`DESK-01`:`PSC-01`,role:e===`collection`?`phlebotomy`:void 0,shift:i},user:{name:`Srey Neang`,email:`neang@mekong.clinic`,licenceVerified:!1},workspace:{id:`ws-mekong`,name:`Mekong Clinic`,branches:[{id:`br-bkk`,name:`BKK1 Branch`},{id:`br-tk`,name:`Toul Kork Branch`}],activeBranchId:`br-bkk`},children:e===`front-desk`?m?(0,z.jsxs)(c,{tone:`success`,children:[(0,z.jsx)(a,{children:`Reception mock complete`}),(0,z.jsx)(s,{children:`The check-in, priced order, and payment state are complete in local mock memory. Collection uses the preloaded Storybook queue.`}),(0,z.jsxs)(o,{children:[(0,z.jsx)(l,{onClick:T,variant:`outline`,children:`Start next reception`}),(0,z.jsx)(l,{onClick:()=>S(`collection`),variant:`primary`,children:`Open phlebotomy`})]})]}):(0,z.jsx)(ce,{existingPatients:M,fxRate:U,onCheckIn:()=>h(!0),onPatientChange:p,patient:f}):b&&g?(0,z.jsxs)(c,{tone:`success`,children:[(0,z.jsx)(a,{children:`Collection mock complete`}),(0,z.jsxs)(s,{children:[`Collection was submitted for `,g.name,`. This mock stops before courier handoff and laboratory accession.`]}),(0,z.jsxs)(o,{children:[(0,z.jsx)(l,{onClick:E,variant:`outline`,children:`Return to collection queue`}),(0,z.jsx)(l,{onClick:()=>S(`front-desk`),variant:`primary`,children:`Open reception`})]})]}):g?(0,z.jsx)(C,{now:k,onMarkVitalsDone:()=>_(e=>e&&{...e,journey:{...e.journey,vitals:`done`}}),onSaveDraft:()=>{_(null),y([])},onSubmit:()=>x(!0),onUpdateSamples:y,operatorName:D,patient:g,samples:v}):(0,z.jsx)(w,{onMatch:e=>{_(e),y(e.samples)},queue:H,role:`phlebotomy`})})}var z,B,V,H,U,W,le=t((()=>{z=r(),B=e(n()),p(),i(),I(),L(),V=[`front-desk`,`collection`],H=g(O,`phlebotomy`),U={base:`USD`,quote:`KHR`,rateUnits:`4100`,rateScale:0},W=u[`front-desk`].nav.map(e=>({...e,items:e.items.filter(e=>e.key===`arrivals`)})),R.__docgenInfo={description:`Full mock Clinic prototype that composes the canonical AppShell, Reception
check-in flow, and Phlebotomy collection flow. The two feature datasets stay
deliberately independent because the upstream queue handoff is not yet a
proven executable contract.`,methods:[],displayName:`ClinicOperationsPrototype`}})),G,K,q,J,Y,X,Z,Q,$;t((()=>{le(),d(),{expect:G,userEvent:K,waitFor:q,within:J}=__STORYBOOK_MODULE_TEST__,Y={title:`Clinic/Flows/Reception to Phlebotomy`,component:R,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:{readiness:f.flows,intake:{decision:`COMPOSE`,owner:`src/features/clinic-prototype`,evidence:`Fresh Storybook already contains exact canonical implementations for AppShell, CheckInWizard, ScanGate, and DrawWorksheet. This flow only coordinates mock state and mode switching.`},journeys:[`REC-02 walk-in check-in`,`REC-03 desk payment`,`PHL-01 open draw work item`,`PHL-03 register draw`,`PHL-10 complete visit after draw`],composes:[`AppShell`,`CheckInWizard`,`ScanGate`,`DrawWorksheet`,`Alert`,`Button`],mockContract:{backendWrites:!1,receptionOtp:`123456`,phlebotomyPatientId:`P104481`,handoff:`Reception and collection use independent mock datasets until the queue handoff contract is executable.`},responsive:{classification:[`FLUID`,`STACKING`,`TRANSFORMING`,`SCROLLING`],minimumWidth:320}},docs:{description:{component:`A full Storybook-only Clinic prototype using the canonical unified App Shell. Switch between Reception and Collection modes without leaving the workspace. All data is synthetic and resets on reload.`}}}},X={},Z={name:`Mock journey smoke test`,play:async({canvasElement:e})=>{let t=J(e),n=J(e.ownerDocument.body);await G(t.getByText(`Mock Storybook prototype`)).toBeVisible(),await G(t.getByRole(`heading`,{name:`Find or create a patient`})).toBeVisible(),await K.click(t.getByRole(`button`,{name:/Front desk/})),await K.click(await n.findByRole(`menuitemradio`,{name:/Collection/})),await q(async()=>{await G(t.getByText(`Station PSC-01`)).toBeVisible(),await G(t.getByLabelText(`Patient ID`)).toBeVisible()}),await K.type(t.getByLabelText(`Patient ID`),`P104481{Enter}`),await G(await t.findByText(`Before the draw`)).toBeVisible(),await K.click(t.getByRole(`button`,{name:/Collection/})),await K.click(await n.findByRole(`menuitemradio`,{name:/Front desk/})),await G(await t.findByRole(`heading`,{name:`Find or create a patient`})).toBeVisible(),await K.click(t.getByRole(`button`,{name:/Front desk/})),await K.click(await n.findByRole(`menuitemradio`,{name:/Collection/})),await G(await t.findByText(`Before the draw`)).toBeVisible()}},Q={parameters:{viewport:{defaultViewport:`kura390`}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'Mock journey smoke test',
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await expect(canvas.getByText('Mock Storybook prototype')).toBeVisible();
    await expect(canvas.getByRole('heading', {
      name: 'Find or create a patient'
    })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: /Front desk/
    }));
    await userEvent.click(await body.findByRole('menuitemradio', {
      name: /Collection/
    }));
    await waitFor(async () => {
      await expect(canvas.getByText('Station PSC-01')).toBeVisible();
      await expect(canvas.getByLabelText('Patient ID')).toBeVisible();
    });
    await userEvent.type(canvas.getByLabelText('Patient ID'), 'P104481{Enter}');
    await expect(await canvas.findByText('Before the draw')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: /Collection/
    }));
    await userEvent.click(await body.findByRole('menuitemradio', {
      name: /Front desk/
    }));
    await expect(await canvas.findByRole('heading', {
      name: 'Find or create a patient'
    })).toBeVisible();

    // A draw already under way survives a trip to the desk and back. Only
    // committed work is expected to persist — an unsubmitted search string is
    // screen state, and the station deliberately re-asks for the patient.
    await userEvent.click(canvas.getByRole('button', {
      name: /Front desk/
    }));
    await userEvent.click(await body.findByRole('menuitemradio', {
      name: /Collection/
    }));
    await expect(await canvas.findByText('Before the draw')).toBeVisible();
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura390'
    }
  }
}`,...Q.parameters?.docs?.source}}},$=[`FullPrototype`,`MockJourneySmokeTest`,`Mobile`]}))();export{X as FullPrototype,Q as Mobile,Z as MockJourneySmokeTest,$ as __namedExportsOrder,Y as default};