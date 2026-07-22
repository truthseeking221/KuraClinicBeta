import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{t as i}from"./ui-C9kmmzkH.js";import{i as a,n as o,r as s,t as c}from"./alert-l7nmjmGJ.js";import{t as l}from"./button-B6_zsN5-.js";import{t as u}from"./app-shell-dOUH8yca.js";import{r as d,t as f}from"./readiness-data-D41RGqZh.js";import{i as p,o as m,r as h,t as g}from"./empty-state-DlAvBIIY.js";import{t as _}from"./shared-GnDiMTI0.js";import{a as v,c as y,i as b,n as x,r as S,s as C}from"./demo-data-K2RuITMi.js";import{n as w,t as T}from"./door-BdhrFt9R.js";import{n as E,t as D}from"./workspace-gate-jJlcZ5rO.js";import{n as O,t as k}from"./onboarding-wizard-DUW9RuzH.js";var A,j,M,N=t((()=>{A=`_appContent_ie6hb_1`,j=`_stickyPrompt_ie6hb_8`,M={appContent:A,stickyPrompt:j}}));function P(){let[e,t]=(0,L.useState)({kind:`door`});function n(e){return{workspaceId:`ws-own-cabinet`,name:e.clinicName??`My cabinet`,branchesEnabled:!1,memberCount:1,role:`Owner`}}if(e.kind===`door`)return(0,I.jsx)(T,{onRouted:(e,n)=>t(e===`wizard`?{kind:`wizard`,verifiedIdentifier:n}:{kind:`gate`,workspaces:C,fresh:!1})});if(e.kind===`wizard`)return(0,I.jsx)(k,{entry:e.verifiedIdentifier?.startsWith(`+`)?{isInvitee:!1,phoneVerified:!0,verifiedPhone:e.verifiedIdentifier}:{isInvitee:!1,phoneVerified:!1},onDone:e=>t({kind:`gate`,workspaces:[n(e)],fresh:!0,wizardResult:e})});if(e.kind===`gate`){let{workspaces:n}=e;return(0,I.jsx)(D,{branches:x,lastActiveBranchId:S,lastActiveWorkspaceId:e.fresh?null:b,onCreateWorkspace:e=>t({kind:`app`,userName:`Doctor`,showLicencePrompt:!1,workspace:{workspaceId:`ws-created`,name:e,branchesEnabled:!1,memberCount:1,role:`Owner`}}),onEnter:r=>{let i=n.find(e=>e.workspaceId===r);i&&t({kind:`app`,showLicencePrompt:e.wizardResult?.mlDeclaration?.answer===`yes`,userName:e.wizardResult?.name??`Bopha Kim`,workspace:i})},workspaces:n})}return(0,I.jsx)(u,{activeKey:`home`,availableModes:[`clinical`],mode:`clinical`,onNavigate:()=>{},user:{name:e.userName,email:`you@kura.med`,licenceVerified:!1},workspace:{id:e.workspace.workspaceId,name:e.workspace.name},children:(0,I.jsxs)(`div`,{className:M.appContent,children:[e.showLicencePrompt?(0,I.jsxs)(c,{className:M.stickyPrompt,tone:`info`,children:[(0,I.jsx)(a,{children:`Verify your medical licence`}),(0,I.jsx)(s,{children:`You can browse the catalog and view prices. Your licence cannot be used for new clinic orders until it is approved.`}),(0,I.jsx)(o,{children:(0,I.jsx)(l,{size:`sm`,variant:`outline`,children:`Upload licence`})})]}):null,(0,I.jsx)(g,{children:(0,I.jsxs)(p,{children:[(0,I.jsxs)(m,{children:[`Welcome to `,e.workspace.name]}),(0,I.jsx)(h,{children:`Browse the catalog and view prices. Order access depends on your permissions and the prescriber selected for the order.`})]})})]})})}function F(){let[e,t]=(0,L.useState)(null),n=C[0];return e?(0,I.jsx)(u,{activeKey:`home`,availableModes:[`clinical`],mode:`clinical`,onNavigate:()=>{},user:{name:e.name,email:`invitee@kura.med`,licenceVerified:!1},workspace:{id:n.workspaceId,name:n.name},children:(0,I.jsxs)(`div`,{className:M.appContent,children:[(0,I.jsxs)(c,{className:M.stickyPrompt,tone:`info`,children:[(0,I.jsx)(a,{children:`Medical licence question remaining`}),(0,I.jsx)(s,{children:`Answer this question to determine whether licence verification applies to you. It does not set your role or access.`}),(0,I.jsx)(o,{children:(0,I.jsx)(l,{size:`sm`,variant:`outline`,children:`Answer question`})})]}),(0,I.jsx)(g,{children:(0,I.jsxs)(p,{children:[(0,I.jsxs)(m,{children:[`Welcome to `,n.name]}),(0,I.jsx)(h,{children:`You joined as a member. The workspace owner assigns your role and branch.`})]})})]})}):(0,I.jsx)(k,{entry:{isInvitee:!0,phoneVerified:!1},onDone:t})}var I,L,R=t((()=>{I=r(),L=e(n()),_(),i(),w(),O(),E(),y(),N(),P.__docgenInfo={description:`The complete first-contact journey: Door → (Wizard for new accounts) →
Workspace Gate → the clinic app. A brand-new doctor lands in their own
cabinet (auto-entered — the gate never flashes for a single branch-less
workspace); a returning member picks a workspace and branch instead. The
landing copy reflects source-backed per-member attribution and never turns
licence state into a workspace-wide EXPLORER/PRACTICE mode.`,methods:[],displayName:`FirstSignInFlow`},F.__docgenInfo={description:`Invite-link onboarding lands directly in the inviting workspace.`,methods:[],displayName:`InviteeOnboardingFlow`}})),z,B,V,H,U,W,G,K,q,J,Y,X,Z;t((()=>{z=r(),R(),y(),d(),{expect:B,userEvent:V,waitFor:H,within:U}=__STORYBOOK_MODULE_TEST__,W={title:`Clinic/Flows/First Sign-In`,component:P,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:{readiness:f.auth,flow:{pages:[`Clinic/Auth/Door`,`Clinic/Auth/Onboarding Wizard`,`Clinic/Auth/Workspace Gate`,`Clinic/Flows/Doctor Onboarding Readiness`],terminal:`Clinic shell with scoped access and explicit professional-attribution readiness`},journeys:[`clinic-first-sign-in`,`clinic-returning-sign-in`,`clinic-workspace-entry`]},docs:{description:{component:`End-to-end first contact: one door for sign-in and sign-up, the onboarding wizard for new accounts, workspace entry, then the clinic shell. A new doctor auto-enters their own cabinet — the gate never flashes for a single branch-less workspace. Catalog and branch prices remain available before licence approval; new clinic-order placement uses the separate attributed-prescriber gate. Demo scaffolding: code 123456; +855 12 777 088 is a returning member.`}}}},G={play:async({canvasElement:e})=>{let t=U(e);await V.type(t.getByLabelText(/Phone number/),`98111222`),await V.click(t.getByRole(`button`,{name:`Send SMS code`})),await V.type(t.getByRole(`textbox`,{name:`SMS code`}),v),await V.click(t.getByRole(`button`,{name:`Verify and continue`})),await V.type(await t.findByLabelText(/Full name/),`Bopha Kim`),await V.click(t.getByRole(`button`,{name:`Continue`})),await B(await t.findByLabelText(/Clinic name/)).toHaveValue(`Bopha Kim's cabinet`),await V.click(t.getByRole(`button`,{name:`Create clinic`})),await V.click(t.getByRole(`radio`,{name:/Yes, I hold/})),await V.click(await t.findByLabelText(/Profession/)),await V.click(await U(e.ownerDocument.body).findByRole(`option`,{name:`Doctor`})),await V.upload(t.getByLabelText(`Medical licence document`),new File([`licence`],`medical-licence.pdf`,{type:`application/pdf`})),await V.click(t.getByRole(`button`,{name:`Finish setup`})),await B(await t.findByText(`Welcome to Bopha Kim's cabinet`)).toBeVisible(),await B(t.getByText(/Order access depends on your permissions/)).toBeVisible(),await B(t.getByText(`Verify your medical licence`)).toBeVisible()}},K={play:async({canvasElement:e})=>{let t=U(e);await V.type(t.getByLabelText(/Phone number/),`98111222`),await V.click(t.getByRole(`button`,{name:`Send SMS code`})),await V.type(t.getByRole(`textbox`,{name:`SMS code`}),v),await V.click(t.getByRole(`button`,{name:`Verify and continue`})),await V.type(await t.findByLabelText(/Full name/),`Linh Nguyen`),await V.click(t.getByRole(`button`,{name:`Continue`})),await V.click(await t.findByRole(`button`,{name:`Create clinic`})),await V.click(t.getByRole(`radio`,{name:/No, I do not hold one/})),await V.click(t.getByRole(`button`,{name:`Finish setup`})),await B(await t.findByText(`Welcome to Linh Nguyen's cabinet`)).toBeVisible(),await B(t.getByText(/Order access depends on your permissions/)).toBeVisible(),await B(t.queryByText(`Verify your medical licence`)).not.toBeInTheDocument()}},q={render:()=>(0,z.jsx)(F,{}),play:async({canvasElement:e})=>{let t=U(e);await V.type(t.getByLabelText(/Full name/),`Linh Nguyen`),await V.click(t.getByRole(`button`,{name:`Continue`})),await V.type(t.getByLabelText(/Phone number/),`98111333`),await V.click(t.getByRole(`button`,{name:`Send code`})),await V.type(t.getByRole(`textbox`,{name:`SMS code`}),v),await V.click(t.getByRole(`button`,{name:`Verify`})),await B(await t.findByText(`Welcome to Sunrise Clinic`)).toBeVisible(),await B(t.getByText(`Medical licence question remaining`)).toBeVisible(),await B(t.getByRole(`button`,{name:`Answer question`})).toBeVisible()}},J={play:async({canvasElement:e})=>{let t=U(e);await V.type(t.getByLabelText(/Phone number/),`12777088`),await V.click(t.getByRole(`button`,{name:`Send SMS code`})),await V.type(t.getByRole(`textbox`,{name:`SMS code`}),v),await V.click(t.getByRole(`button`,{name:`Verify and continue`})),await B(await t.findByText(`Last active`)).toBeVisible(),await V.click(t.getByRole(`button`,{name:/Sunrise Clinic/})),await V.click(await t.findByRole(`radio`,{name:/North Wing/})),await V.click(t.getByRole(`button`,{name:`Enter workspace`})),await H(async()=>{await B(t.getByText(`Welcome to Sunrise Clinic`)).toBeVisible()})}},Y={play:async({canvasElement:e})=>{let t=U(e);await V.type(t.getByLabelText(/Phone number/),`98111222`),await V.click(t.getByRole(`button`,{name:`Send SMS code`})),await V.type(t.getByRole(`textbox`,{name:`SMS code`}),`000000`),await V.click(t.getByRole(`button`,{name:`Verify and continue`})),await B(await t.findByRole(`alert`)).toHaveTextContent(/incorrect or expired/i),await V.clear(t.getByRole(`textbox`,{name:`SMS code`})),await V.type(t.getByRole(`textbox`,{name:`SMS code`}),v),await V.click(t.getByRole(`button`,{name:`Verify and continue`})),await B(await t.findByLabelText(/Full name/)).toBeVisible()}},X={parameters:{viewport:{defaultViewport:`kura320`}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Door: unknown phone routes to the wizard.
    await userEvent.type(canvas.getByLabelText(/Phone number/), '98111222');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send SMS code'
    }));
    await userEvent.type(canvas.getByRole('textbox', {
      name: 'SMS code'
    }), DEMO_OTP);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Verify and continue'
    }));

    // Wizard: name → clinic (phone already verified by the door) → licence.
    await userEvent.type(await canvas.findByLabelText(/Full name/), 'Bopha Kim');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Continue'
    }));
    await expect(await canvas.findByLabelText(/Clinic name/)).toHaveValue("Bopha Kim's cabinet");
    await userEvent.click(canvas.getByRole('button', {
      name: 'Create clinic'
    }));
    await userEvent.click(canvas.getByRole('radio', {
      name: /Yes, I hold/
    }));
    await userEvent.click(await canvas.findByLabelText(/Profession/));
    await userEvent.click(await within(canvasElement.ownerDocument.body).findByRole('option', {
      name: 'Doctor'
    }));
    await userEvent.upload(canvas.getByLabelText('Medical licence document'), new File(['licence'], 'medical-licence.pdf', {
      type: 'application/pdf'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Finish setup'
    }));

    // Gate auto-enters the single branch-less cabinet → shell.
    await expect(await canvas.findByText("Welcome to Bopha Kim's cabinet")).toBeVisible();
    await expect(canvas.getByText(/Order access depends on your permissions/)).toBeVisible();
    await expect(canvas.getByText('Verify your medical licence')).toBeVisible();
  }
}`,...G.parameters?.docs?.source},description:{story:`New doctor, end to end: door sign-up → wizard (phone came verified from the
door) → own cabinet, straight into the shell with scoped setup access.`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), '98111222');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send SMS code'
    }));
    await userEvent.type(canvas.getByRole('textbox', {
      name: 'SMS code'
    }), DEMO_OTP);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Verify and continue'
    }));
    await userEvent.type(await canvas.findByLabelText(/Full name/), 'Linh Nguyen');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Continue'
    }));
    await userEvent.click(await canvas.findByRole('button', {
      name: 'Create clinic'
    }));
    await userEvent.click(canvas.getByRole('radio', {
      name: /No, I do not hold one/
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Finish setup'
    }));
    await expect(await canvas.findByText("Welcome to Linh Nguyen's cabinet")).toBeVisible();
    await expect(canvas.getByText(/Order access depends on your permissions/)).toBeVisible();
    await expect(canvas.queryByText('Verify your medical licence')).not.toBeInTheDocument();
  }
}`,...K.parameters?.docs?.source},description:{story:`ML = NO lands without a credential or an inappropriate licence nag.`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <InviteeOnboardingFlow />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Full name/), 'Linh Nguyen');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Continue'
    }));
    await userEvent.type(canvas.getByLabelText(/Phone number/), '98111333');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send code'
    }));
    await userEvent.type(canvas.getByRole('textbox', {
      name: 'SMS code'
    }), DEMO_OTP);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Verify'
    }));
    await expect(await canvas.findByText('Welcome to Sunrise Clinic')).toBeVisible();
    await expect(canvas.getByText('Medical licence question remaining')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Answer question'
    })).toBeVisible();
  }
}`,...q.parameters?.docs?.source},description:{story:`Invite link: missing facts only → inviting workspace → one-time in-app ML prompt.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), '12777088');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send SMS code'
    }));
    await userEvent.type(canvas.getByRole('textbox', {
      name: 'SMS code'
    }), DEMO_OTP);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Verify and continue'
    }));

    // Gate lists both workspaces with last-active flagged.
    await expect(await canvas.findByText('Last active')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: /Sunrise Clinic/
    }));

    // Branch choice, then the shell.
    await userEvent.click(await canvas.findByRole('radio', {
      name: /North Wing/
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Enter workspace'
    }));
    await waitFor(async () => {
      await expect(canvas.getByText('Welcome to Sunrise Clinic')).toBeVisible();
    });
  }
}`,...J.parameters?.docs?.source},description:{story:`Returning member: the same door routes to workspace entry; picking a
branch-enabled workspace asks for the branch before the shell opens.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), '98111222');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Send SMS code'
    }));
    await userEvent.type(canvas.getByRole('textbox', {
      name: 'SMS code'
    }), '000000');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Verify and continue'
    }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent(/incorrect or expired/i);

    // Same screen, corrected code proceeds.
    await userEvent.clear(canvas.getByRole('textbox', {
      name: 'SMS code'
    }));
    await userEvent.type(canvas.getByRole('textbox', {
      name: 'SMS code'
    }), DEMO_OTP);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Verify and continue'
    }));
    await expect(await canvas.findByLabelText(/Full name/)).toBeVisible();
  }
}`,...Y.parameters?.docs?.source},description:{story:`Recovery inside the flow: a wrong code blocks with an explanation and the
journey continues on the same screen — no restart.`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...X.parameters?.docs?.source},description:{story:`Narrow viewport: the whole journey stays operable at 320px.`,...X.parameters?.docs?.description}}},Z=[`NewDoctorJourney`,`NewNonLicensedJourney`,`NewInviteeJourney`,`ReturningMemberJourney`,`WrongCodeRecovery`,`Mobile320`]}))();export{X as Mobile320,G as NewDoctorJourney,q as NewInviteeJourney,K as NewNonLicensedJourney,J as ReturningMemberJourney,Y as WrongCodeRecovery,Z as __namedExportsOrder,W as default};