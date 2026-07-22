import{i as e}from"./preload-helper-MclHqJXp.js";import{r as t,t as n}from"./readiness-data-D41RGqZh.js";import{c as r,i,n as a,r as o,s}from"./demo-data-K2RuITMi.js";import{n as c,t as l}from"./workspace-gate-jJlcZ5rO.js";var u,d,f,p,m,h,g,_,v,y,b,x,S;e((()=>{c(),t(),r(),{expect:u,fn:d,userEvent:f,waitFor:p,within:m}=__STORYBOOK_MODULE_TEST__,h={title:`Clinic/Auth/Workspace Gate`,component:l,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:{readiness:n.auth,intake:{decision:`COMPOSE`,owner:`src/features/auth`,evidence:`Flow ported from kura-platform clinic-workspace-mf (select-workspace, select-branch, create-workspace): 0 workspaces → create, 1 → auto-enter, ≥2 → list with last-active; branch picker only when the workspace runs branches. Composed from Card, Badge, Input, RadioGroup, Radio, Alert, Button.`},journeys:[`clinic-workspace-entry`,`clinic-workspace-create`,`clinic-branch-select`]},docs:{description:{component:`Post-auth context selection: which workspace (and branch, when enabled) the session works in. Entering a workspace is a heavyweight context switch in production — the app reloads so no cross-tenant state survives.`}}},args:{workspaces:s,branches:a,lastActiveWorkspaceId:i,lastActiveBranchId:o,onEnter:d(),onCreateWorkspace:d()}},g={play:async({canvasElement:e,args:t})=>{let n=m(e);await u(n.getByText(`Last active`)).toBeVisible(),await u(n.queryByRole(`button`,{name:/create.*workspace/i})).not.toBeInTheDocument(),await f.click(n.getByRole(`button`,{name:/Downtown Health/})),await p(()=>u(t.onEnter).toHaveBeenCalledWith(`ws-downtown`))}},_={play:async({canvasElement:e,args:t})=>{let n=m(e);await f.click(n.getByRole(`button`,{name:/Sunrise Clinic/}));let r=await n.findByRole(`radio`,{name:/Main Branch/});await u(r).toBeChecked(),await f.click(n.getByRole(`radio`,{name:/North Wing/})),await f.click(n.getByRole(`button`,{name:`Enter workspace`})),await p(()=>u(t.onEnter).toHaveBeenCalledWith(`ws-sunrise`,`br-north`))}},v={args:{workspaces:[]},play:async({canvasElement:e,args:t})=>{let n=m(e);await u(n.getByRole(`heading`,{name:`Create your workspace`})).toBeVisible(),await u(n.queryByRole(`button`,{name:`Back`})).not.toBeInTheDocument(),await f.click(n.getByRole(`button`,{name:`Create workspace`})),await u(await n.findByText(`Workspace name is required.`)).toBeVisible(),await f.type(n.getByLabelText(/Workspace name/),`Sunrise Clinic`),await f.click(n.getByRole(`button`,{name:`Create workspace`})),await p(()=>u(t.onCreateWorkspace).toHaveBeenCalledWith(`Sunrise Clinic`))}},y={args:{status:`loading`},play:async({canvasElement:e})=>{let t=m(e);await u(t.getByRole(`status`)).toHaveTextContent(/Loading workspaces/)}},b={args:{status:`error`,onRetry:d()},play:async({canvasElement:e,args:t})=>{let n=m(e);await f.click(n.getByRole(`button`,{name:`Retry`})),await p(()=>u(t.onRetry).toHaveBeenCalled())}},x={parameters:{viewport:{defaultViewport:`kura320`}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Last active")).toBeVisible();
    await expect(canvas.queryByRole("button", {
      name: /create.*workspace/i
    })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", {
      name: /Downtown Health/
    }));
    await waitFor(() => expect(args.onEnter).toHaveBeenCalledWith("ws-downtown"));
  }
}`,...g.parameters?.docs?.source},description:{story:`Several workspaces: last-active flagged, branch-less entry is one click.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", {
      name: /Sunrise Clinic/
    }));
    const main = await canvas.findByRole("radio", {
      name: /Main Branch/
    });
    await expect(main).toBeChecked();
    await userEvent.click(canvas.getByRole("radio", {
      name: /North Wing/
    }));
    await userEvent.click(canvas.getByRole("button", {
      name: "Enter workspace"
    }));
    await waitFor(() => expect(args.onEnter).toHaveBeenCalledWith("ws-sunrise", "br-north"));
  }
}`,..._.parameters?.docs?.source},description:{story:`Branch-enabled workspace: picker preselects the last-active branch.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    workspaces: []
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", {
      name: "Create your workspace"
    })).toBeVisible();
    await expect(canvas.queryByRole("button", {
      name: "Back"
    })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", {
      name: "Create workspace"
    }));
    await expect(await canvas.findByText("Workspace name is required.")).toBeVisible();
    await userEvent.type(canvas.getByLabelText(/Workspace name/), "Sunrise Clinic");
    await userEvent.click(canvas.getByRole("button", {
      name: "Create workspace"
    }));
    await waitFor(() => expect(args.onCreateWorkspace).toHaveBeenCalledWith("Sunrise Clinic"));
  }
}`,...v.parameters?.docs?.source},description:{story:`First sign-up: no workspaces yet, create is the whole screen.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    status: "loading"
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("status")).toHaveTextContent(/Loading workspaces/);
  }
}`,...y.parameters?.docs?.source},description:{story:`Loading context.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    status: "error",
    onRetry: fn()
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", {
      name: "Retry"
    }));
    await waitFor(() => expect(args.onRetry).toHaveBeenCalled());
  }
}`,...b.parameters?.docs?.source},description:{story:`Load failure: retry without losing the session.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: "kura320"
    }
  }
}`,...x.parameters?.docs?.source},description:{story:`Narrow viewport: rows keep touch-comfortable targets.`,...x.parameters?.docs?.description}}},S=[`WorkspaceList`,`BranchSelection`,`CreateFirstWorkspace`,`Loading`,`LoadError`,`Mobile320`]}))();export{_ as BranchSelection,v as CreateFirstWorkspace,b as LoadError,y as Loading,x as Mobile320,g as WorkspaceList,S as __namedExportsOrder,h as default};