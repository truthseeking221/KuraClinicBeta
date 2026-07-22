import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{t as i}from"./app-shell-dOUH8yca.js";import{r as a,t as o}from"./readiness-data-D41RGqZh.js";import{t as s}from"./shared-GnDiMTI0.js";import{n as c}from"./logic-Ca9-ZOcC.js";import{S as l,a as u,r as d}from"./demo-data-lOaHj2eX.js";import{n as f,t as p}from"./results-review-flow-xagxhlBl.js";import{c as m,i as h,o as g}from"./demo-data-BfkfVfOx.js";import{n as _,r as v,t as y}from"./home-workspace-BS1bTudE.js";import{n as b,t as x}from"./storybook-metadata-CTVyefy3.js";function S(){let[e,t]=(0,T.useState)(`home`);return e===`results`?(0,w.jsx)(p,{episodeLabel:`Current episode · 17 July 2026`,patient:u,sections:d}):(0,w.jsx)(i,{activeKey:`home`,availableModes:[`clinical`],mode:`clinical`,onNavigate:e=>{e===`results`&&t(`results`)},user:{name:g.doctorName,email:`sok.vanna@mekong.clinic`,licenceVerified:!0},workspace:A,children:(0,w.jsx)(y,{data:g,onNavigate:e=>{e===`results`&&t(`results`)}})})}function C(){let[e,t]=(0,T.useState)(A.id),n=e===A.id,r=n?A:j,a=n?g:M;return(0,w.jsx)(i,{activeKey:`home`,availableModes:[`clinical`],mode:`clinical`,onNavigate:()=>void 0,onWorkspaceChange:t,user:{name:a.doctorName,email:`sok.vanna@clinic.example`,licenceVerified:c(a.licence.state)},workspace:r,workspaces:[A,j],children:(0,w.jsx)(y,{data:a})})}var w,T,E,D,O,k,A,j,M,N,P,F,I;t((()=>{w=r(),T=e(n()),s(),l(),f(),m(),_(),v(),b(),a(),{expect:E,userEvent:D,waitFor:O,within:k}=__STORYBOOK_MODULE_TEST__,A={id:`mekong`,name:`Mekong Clinic`,branches:[{id:`bkk1`,name:`BKK1 Branch`}],activeBranchId:`bkk1`},j={id:`lotus`,name:`Lotus Family Clinic`,branches:[{id:`riverside`,name:`Riverside Branch`}],activeBranchId:`riverside`},M={...h,scopeLabel:`Lotus Family Clinic · Riverside · 26 patients in view`,signals:h.signals.map(e=>e.key===`pickup`?{...e,detail:`2 tubes ready · daily courier sweep`}:e),nextActions:[{time:`14:00`,label:`Care team huddle`,meta:`Riverside consultation room`}]},N={title:`Clinic/Flows/Morning Triage`,component:S,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:{...x,readiness:o.flows,flow:{pages:[`Clinic/Clinical/Home`,`Clinic/Clinical/Results/Results Workspace`,`Clinic/Flows/Result Review and Closure`],terminal:`Critical result opened in its owning review and closure flow`}},docs:{description:{component:`Executable cross-page Home journeys using real Kura feature surfaces. The first routes a safety-critical Home signal into the canonical Results review flow. The second proves a workspace change replaces tenant-scoped Home data instead of preserving patient context from the previous clinic.`}}}},P={play:async({canvasElement:e})=>{let t=k(e),n=t.getByRole(`list`,{name:`Patients with results to review`});await D.click(k(n).getAllByRole(`link`)[0]),await O(async()=>{await E(t.getByRole(`heading`,{name:`Results`})).toBeVisible()}),await E(t.getByText(`Potassium`)).toBeVisible(),await E(t.getByText(`A critical released result still requires acknowledgment.`)).toBeVisible()}},F={render:()=>(0,w.jsx)(C,{}),play:async({canvasElement:e})=>{let t=k(e),n=k(e.ownerDocument.body);await E(t.getByText(/Potassium/)).toBeVisible(),await D.click(t.getByRole(`button`,{name:/Mekong Clinic/})),await D.click(await n.findByRole(`menuitemradio`,{name:`Lotus Family Clinic`})),await O(async()=>{await E(t.getByText(`Lotus Family Clinic · Riverside · 26 patients in view`)).toBeVisible()}),await E(t.getByText(`Care team huddle`)).toBeVisible(),await E(t.queryByText(/Potassium/)).not.toBeInTheDocument(),await E(t.queryByText(/Sokha Chan/)).not.toBeInTheDocument()}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const queue = canvas.getByRole('list', {
      name: 'Patients with results to review'
    });
    await userEvent.click(within(queue).getAllByRole('link')[0]);
    await waitFor(async () => {
      await expect(canvas.getByRole('heading', {
        name: 'Results'
      })).toBeVisible();
    });
    await expect(canvas.getByText('Potassium')).toBeVisible();
    await expect(canvas.getByText('A critical released result still requires acknowledgment.')).toBeVisible();
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <WorkspaceSwitchFlow />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const documentBody = within(canvasElement.ownerDocument.body);
    await expect(canvas.getByText(/Potassium/)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: /Mekong Clinic/
    }));
    await userEvent.click(await documentBody.findByRole('menuitemradio', {
      name: 'Lotus Family Clinic'
    }));
    await waitFor(async () => {
      await expect(canvas.getByText('Lotus Family Clinic · Riverside · 26 patients in view')).toBeVisible();
    });
    await expect(canvas.getByText('Care team huddle')).toBeVisible();
    await expect(canvas.queryByText(/Potassium/)).not.toBeInTheDocument();
    await expect(canvas.queryByText(/Sokha Chan/)).not.toBeInTheDocument();
  }
}`,...F.parameters?.docs?.source}}},I=[`MorningTriageToCriticalResult`,`WorkspaceSwitchClearsPriorClinicContext`]}))();export{P as MorningTriageToCriticalResult,F as WorkspaceSwitchClearsPriorClinicContext,I as __namedExportsOrder,N as default};