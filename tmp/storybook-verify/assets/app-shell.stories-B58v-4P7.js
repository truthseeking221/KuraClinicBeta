import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{t as i}from"./ui-C9kmmzkH.js";import{i as a,r as o,t as s}from"./alert-l7nmjmGJ.js";import{t as c}from"./button-B6_zsN5-.js";import{a as l,i as u,n as d,r as f,t as p}from"./app-shell-dOUH8yca.js";function m({label:e}){return(0,g.jsx)(`div`,{style:{display:`grid`,placeItems:`center`,minHeight:`320px`,border:`1px dashed var(--color-border-strong)`,borderRadius:`var(--radius-card-surface)`,color:`var(--color-text-tertiary)`,fontSize:`var(--type-sm)`},children:e})}function h(e){let{initialMode:t,licenceVerified:n=!0,permissions:r,...i}=e,a=u({permissions:r,enabledModules:k,licenceVerified:n}),[o,s]=(0,_.useState)(t),[c,l]=(0,_.useState)(f[t].entryKey),[d,h]=(0,_.useState)(i.workspace??S);return(0,g.jsx)(p,{availableModes:a,mode:o,onModeChange:e=>{s(e),l(f[e].entryKey)},activeKey:c,onNavigate:l,onWorkspaceChange:e=>{let t=w.find(t=>t.id===e);t&&h(t)},onBranchChange:e=>h(t=>({...t,activeBranchId:e})),onOpenSearch:()=>{},onOpenNotifications:()=>{},permissions:r,user:T,...i,workspace:d,children:(0,g.jsx)(m,{label:`${f[o].label} · ${c}`})})}var g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q;t((()=>{g=r(),_=e(n()),i(),d(),l(),{expect:v,userEvent:y,waitFor:b,within:x}=__STORYBOOK_MODULE_TEST__,S={id:`ws-mekong`,name:`Mekong Clinic`,branches:[{id:`br-bkk`,name:`BKK1 Branch`},{id:`br-tk`,name:`Toul Kork Branch`}],activeBranchId:`br-bkk`},C={id:`ws-solo`,name:`Dr. Vanna Cabinet`},w=[S,C],T={name:`Dr. Sok Vanna`,email:`vanna@mekong.clinic`,licenceVerified:!0},E={name:`Srey Neang`,email:`neang@mekong.clinic`,licenceVerified:!1},D={id:`PSC-01`,role:`phlebotomy`,shift:`morning`},O={doctorFull:[`patient.read`,`order.create`,`result.review`,`reception.check_in`,`booking.manage`,`payment.collect`,`sample.collect`,`member.manage`,`branch.manage`,`role.manage`,`workspace.settings.manage`,`doctor.banking.view.self`],soloDoctor:[`patient.read`,`order.create`,`result.review`,`doctor.banking.view.self`],nurseFrontDeskCollection:[`reception.check_in`,`booking.manage`,`payment.collect`,`sample.collect`,`sample.label`,`sample.handoff`,`vitals.record`]},k={clinical:!0,reception:!0,collection:!0},A={title:`Clinic/Shell/App Shell`,component:p,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:{intake:{decision:`CREATE`,owner:`src/components/shared/app-shell`,evidence:`No canonical shell existed in this repo. ReUI app-shell blocks (app-shell-1, app-shell-2) were inspected as skeleton references and rejected for direct intake: they ship Radix Sidebar + Tailwind palette + next-themes, while the house idiom is CSS modules over Kura tokens with the existing dropdown-menu/sheet primitives. Upstream kura-platform clinic-shell renders Reception as a peer nav item with a static CLINIC_NAV; this shell replaces that with capability-derived operational modes per the unified-clinic-app direction.`},binding:{colors:`kura-semantic + sidebar token layer`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-station-mobile-topbar-and-focus`,icons:`kura-hugeicons-canonical`,motion:`kura-sidebar-layout-label-crossfade-reduced-motion-safe`,density:`kura-root-attribute`,responsive:`sidebar collapses to icon rail; below 768px nav moves into a left sheet`},journeys:[`clinic-shell-navigation`,`mode-switch`,`workspace-switch`],composes:[`DropdownMenu`,`Sheet`,`Badge`,`IconButton`,`Kbd`,`Alert (banner slot)`]},docs:{description:{component:`Unified Clinic App shell. One workspace context (workspace → branch → mode → station), capability-derived operational modes (clinical, front desk, collection), and two caller-selected postures independent from mode: sidebar for navigation-first work and station for scan-first booth work. On desktop, the sidebar owns brand, workspace, work area, navigation, utilities, account, and collapse; no empty topbar separates the user from their task. Station and mobile keep a topbar for live station context or the navigation-sheet trigger. A single mode hides the switcher entirely — a solo doctor never learns modes exist. Roles never gate anything; capabilities do.`}}}},j={workspace:S,mode:`clinical`,availableModes:[`clinical`],activeKey:`home`,onNavigate:()=>{},user:T,children:null},M={args:j,render:()=>(0,g.jsx)(h,{headerActions:(0,g.jsx)(c,{size:`sm`,variant:`outline`,children:`Demo`}),initialMode:`clinical`,permissions:O.doctorFull,workspaces:w}),play:async({canvasElement:e})=>{let t=x(e),n=x(e.ownerDocument.body);await v(t.getByRole(`img`,{name:`Kura`})).toBeVisible(),await v(t.getByRole(`navigation`,{name:`Primary`})).toBeVisible();let r=t.getByRole(`button`,{name:`Work area Clinical`});await v(r).toBeVisible(),await v(r.querySelector(`[data-kura-icon="stethoscope"]`)).toBeVisible(),await v(r.querySelector(`[data-kura-icon="chevron-down"]`)).toBeVisible(),await v(e.querySelector(`[data-slot="app-shell-topbar"]`)).not.toBeVisible();let i=e.querySelector(`[data-slot="app-shell-sidebar-footer"]`);if(!i)throw Error(`Sidebar footer did not render.`);let a=x(i);await v(a.getByRole(`button`,{name:`Demo`})).toBeVisible(),await v(t.getByRole(`button`,{name:`Collapse navigation`})).toBeVisible(),await v(a.getByText(`Dr. Sok Vanna`)).toBeVisible(),await y.click(a.getByRole(`button`,{name:`Account: Dr. Sok Vanna`})),await b(()=>{if(!n.getAllByRole(`menu`).find(e=>e.getAttribute(`data-state`)===`open`))throw Error(`Account menu did not open.`)});let o=n.getAllByRole(`menu`).find(e=>e.getAttribute(`data-state`)===`open`);if(!o)throw Error(`Account menu did not open.`);await v(x(o).getByRole(`menuitem`,{name:`Settings`})).toBeInTheDocument(),await v(x(o).getByRole(`menuitem`,{name:`Sign out`})).toBeInTheDocument(),await v(n.queryByLabelText(`Licence verified`)).not.toBeInTheDocument()}},N={args:j,render:()=>(0,g.jsx)(h,{contentInset:`none`,initialMode:`clinical`,permissions:O.doctorFull}),play:async({canvasElement:e})=>{let t=e.querySelector(`[data-slot="app-shell-content"]`);if(!(t instanceof HTMLElement)||!(t.firstElementChild instanceof HTMLElement))throw Error(`App shell content did not render.`);await v(t).toHaveAttribute(`data-content-inset`,`none`);let n=t.getBoundingClientRect(),r=t.firstElementChild.getBoundingClientRect();await v(Math.abs(r.left-n.left)).toBeLessThanOrEqual(1),await v(Math.abs(r.top-n.top)).toBeLessThanOrEqual(1)}},P={args:j,render:()=>(0,g.jsx)(h,{initialMode:`clinical`,permissions:O.soloDoctor,workspace:C}),play:async({canvasElement:e})=>{let t=x(e),n=u({permissions:O.soloDoctor,enabledModules:k,licenceVerified:!0});await v(n).toEqual([`clinical`]),await v(t.queryByText(`Switch work area`)).not.toBeInTheDocument()}},F={args:j,render:()=>(0,g.jsx)(h,{initialMode:`clinical`,permissions:O.doctorFull}),play:async({canvasElement:e})=>{let t=x(e);for(let e of[`Home`,`Results`,`Patients`,`Earnings`,`Catalog`])await v(t.getByRole(`button`,{name:e})).toBeVisible();await v(t.queryByRole(`button`,{name:`More`})).not.toBeInTheDocument(),await v(t.queryByRole(`button`,{name:`Care plans`})).not.toBeInTheDocument()}},I={args:j,render:()=>(0,g.jsx)(h,{initialMode:`front-desk`,permissions:O.nurseFrontDeskCollection,licenceVerified:!1,user:E,station:{id:`DESK-02`,shift:`morning`}}),play:async({canvasElement:e})=>{let t=u({permissions:O.nurseFrontDeskCollection,enabledModules:k,licenceVerified:!1});await v(t).toEqual([`front-desk`,`collection`]);let n=x(e);await v(n.getByRole(`button`,{name:`Arrivals`})).toBeVisible();let r=n.getByRole(`button`,{name:`Payments`});await y.click(r),await v(r).toHaveAttribute(`aria-current`,`page`),await v(r.querySelector(`[data-kura-icon-style="bulk-rounded"]`)).toBeTruthy(),await v(n.queryByRole(`button`,{name:`Reports`})).not.toBeInTheDocument()}},L={args:j,render:()=>(0,g.jsx)(h,{initialMode:`clinical`,permissions:O.doctorFull}),play:async({canvasElement:e})=>{let t=x(e),n=x(e.ownerDocument.body);await y.click(t.getByRole(`button`,{name:/Clinical/}));let r=await n.findByRole(`menuitemradio`,{name:/Front desk/});await y.click(r),await b(async()=>{await v(t.getByRole(`button`,{name:`Arrivals`})).toBeVisible(),await v(t.getByText(/Front desk · arrivals/)).toBeVisible()})}},R={args:j,render:()=>(0,g.jsx)(h,{initialMode:`collection`,permissions:O.nurseFrontDeskCollection,licenceVerified:!1,user:E}),play:async({canvasElement:e})=>{let t=x(e);await v(e.querySelector(`[data-slot="app-shell"]`)).toHaveAttribute(`data-posture`,`sidebar`),await v(t.getByRole(`navigation`,{name:`Primary`})).toBeVisible(),await v(t.getByRole(`button`,{name:`Scan`})).toBeVisible(),await v(t.getByRole(`button`,{name:`Handoffs`})).toBeVisible(),await v(t.queryByText(/Station PSC-/)).not.toBeInTheDocument()}},z={args:j,render:()=>(0,g.jsx)(h,{initialMode:`collection`,permissions:O.nurseFrontDeskCollection,licenceVerified:!1,user:E,posture:`station`,station:D}),play:async({canvasElement:e})=>{let t=x(e);await v(e.querySelector(`[data-slot="app-shell"]`)).toHaveAttribute(`data-posture`,`station`),await v(t.getByText(`Phlebotomy`)).toBeVisible(),await v(t.getByText(`Station PSC-01`)).toBeVisible(),await v(t.getByRole(`button`,{name:/Morning shift/})).toBeVisible(),await v(t.queryByRole(`navigation`,{name:`Primary`})).not.toBeInTheDocument()}},B={args:j,render:()=>(0,g.jsx)(h,{initialMode:`front-desk`,permissions:O.doctorFull,licenceVerified:!1,banner:(0,g.jsxs)(s,{tone:`warning`,children:[(0,g.jsx)(a,{children:`Licence under review`}),(0,g.jsx)(o,{children:`Clinical ordering unlocks once verification finishes — usually within 1 business day.`})]})})},V={args:j,render:()=>{let e=f[`front-desk`].nav.map(e=>({...e,items:e.items.map(e=>e.key===`arrivals`?{...e,badgeCount:4}:e.key===`queue`?{...e,badgeCount:7}:e)}));return(0,g.jsx)(h,{initialMode:`front-desk`,permissions:O.nurseFrontDeskCollection,licenceVerified:!1,user:E,nav:e})}},H={args:j,render:()=>(0,g.jsx)(h,{activeKey:`earnings`,initialMode:`clinical`,permissions:O.doctorFull,scopeLabel:`All Kura workspaces`}),play:async({canvasElement:e})=>{let t=x(e);await v(t.getByLabelText(`Scope: All Kura workspaces`)).toBeVisible(),await v(t.getByRole(`button`,{name:`Earnings`})).toHaveAttribute(`aria-current`,`page`),await v(t.queryByText(`Mekong Clinic`)).not.toBeInTheDocument()}},U={args:j,render:()=>(0,g.jsx)(h,{initialMode:`clinical`,permissions:[`patient.read`]}),play:async({canvasElement:e})=>{await v(x(e).queryByRole(`button`,{name:`Earnings`})).not.toBeInTheDocument()}},W={args:j,render:()=>(0,g.jsx)(h,{initialMode:`clinical`,permissions:O.doctorFull,defaultCollapsed:!0}),play:async({canvasElement:e})=>{let t=x(e),n=e.querySelector(`[data-slot="app-shell-sidebar"]`),r=e.querySelector(`[data-slot="app-shell-sidebar-brand"]`);if(!(n instanceof HTMLElement)||!(r instanceof HTMLElement))throw Error(`Collapsed sidebar anatomy did not render.`);let i=t.getByRole(`button`,{name:`Expand navigation`}),a=t.getByRole(`button`,{name:`Home`});await v(i).toBeInTheDocument(),await v(t.getByRole(`button`,{name:`Patients`})).toBeVisible(),await v(a).toHaveAttribute(`aria-current`,`page`),await v(x(a).getByText(`Home`)).toBeVisible(),await b(()=>v(n.getBoundingClientRect().width).toBeGreaterThan(70));let o=a.querySelector(`svg`);if(!(o instanceof SVGElement))throw Error(`Collapsed Home navigation icon did not render.`);await b(()=>v(o.getBoundingClientRect().width).toBeGreaterThanOrEqual(20));let s=t.getByRole(`button`,{name:`Work area: Clinical`});await v(s).toBeVisible(),await y.tab(),await v(i).toHaveFocus(),await b(()=>v(i).toBeVisible()),await y.dblClick(i),await v(i).toHaveAttribute(`aria-expanded`,`false`),await v(t.getByRole(`button`,{name:`Home`})).toHaveAttribute(`aria-current`,`page`),await y.click(i),await b(()=>v(n.getBoundingClientRect().width).toBeGreaterThan(200)),await v(t.getByRole(`button`,{name:`Collapse navigation`})).toBeVisible(),await v(x(n).getByText(`Work`)).toBeVisible()}},G={args:j,parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,g.jsx)(h,{initialMode:`clinical`,permissions:O.doctorFull}),play:async({canvasElement:e})=>{let t=x(e);await y.click(t.getByRole(`button`,{name:`Open navigation`}));let n=await t.findByRole(`dialog`);await v(x(n).getByText(`Patients`)).toBeVisible()}},K={args:j,render:()=>(0,g.jsx)(h,{initialMode:`front-desk`,permissions:O.doctorFull,workspace:{id:`ws-long`,name:`គ្លីនិកវេជ្ជសាស្ត្រ Mekong International Family Medicine & Diagnostics`,branches:[{id:`br-long`,name:`Sangkat Boeung Keng Kang Ti Muoy Branch — opposite the old market`}],activeBranchId:`br-long`}})},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: requiredArgs,
  render: () => <ShellPlayground headerActions={<Button size="sm" variant="outline">
          Demo
        </Button>} initialMode="clinical" permissions={PERMISSIONS.doctorFull} workspaces={allWorkspaces} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await expect(canvas.getByRole('img', {
      name: 'Kura'
    })).toBeVisible();
    await expect(canvas.getByRole('navigation', {
      name: 'Primary'
    })).toBeVisible();
    // Work-area control: mode icon + value + chevron; the kicker stays for
    // assistive technology only.
    const modeButton = canvas.getByRole('button', {
      name: 'Work area Clinical'
    });
    await expect(modeButton).toBeVisible();
    await expect(modeButton.querySelector('[data-kura-icon="stethoscope"]')).toBeVisible();
    await expect(modeButton.querySelector('[data-kura-icon="chevron-down"]')).toBeVisible();
    await expect(canvasElement.querySelector('[data-slot="app-shell-topbar"]')).not.toBeVisible();
    const sidebarFooterElement = canvasElement.querySelector('[data-slot="app-shell-sidebar-footer"]');
    if (!sidebarFooterElement) throw new Error('Sidebar footer did not render.');
    const sidebarFooter = within(sidebarFooterElement as HTMLElement);
    await expect(sidebarFooter.getByRole('button', {
      name: 'Demo'
    })).toBeVisible();
    // Collapse moved to the brand row; settings lives in the account menu.
    await expect(canvas.getByRole('button', {
      name: 'Collapse navigation'
    })).toBeVisible();
    await expect(sidebarFooter.getByText('Dr. Sok Vanna')).toBeVisible();
    await userEvent.click(sidebarFooter.getByRole('button', {
      name: 'Account: Dr. Sok Vanna'
    }));
    await waitFor(() => {
      const openMenu = body.getAllByRole('menu').find(menu => menu.getAttribute('data-state') === 'open');
      if (!openMenu) throw new Error('Account menu did not open.');
    });
    const accountMenu = body.getAllByRole('menu').find(menu => menu.getAttribute('data-state') === 'open');
    if (!accountMenu) throw new Error('Account menu did not open.');
    await expect(within(accountMenu).getByRole('menuitem', {
      name: 'Settings'
    })).toBeInTheDocument();
    await expect(within(accountMenu).getByRole('menuitem', {
      name: 'Sign out'
    })).toBeInTheDocument();
    await expect(body.queryByLabelText('Licence verified')).not.toBeInTheDocument();
  }
}`,...M.parameters?.docs?.source},description:{story:`Full clinic: every module enabled, a doctor holding all capabilities.`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: requiredArgs,
  render: () => <ShellPlayground contentInset="none" initialMode="clinical" permissions={PERMISSIONS.doctorFull} />,
  play: async ({
    canvasElement
  }) => {
    const content = canvasElement.querySelector('[data-slot="app-shell-content"]');
    if (!(content instanceof HTMLElement) || !(content.firstElementChild instanceof HTMLElement)) {
      throw new Error('App shell content did not render.');
    }
    await expect(content).toHaveAttribute('data-content-inset', 'none');
    const contentRect = content.getBoundingClientRect();
    const childRect = content.firstElementChild.getBoundingClientRect();
    await expect(Math.abs(childRect.left - contentRect.left)).toBeLessThanOrEqual(1);
    await expect(Math.abs(childRect.top - contentRect.top)).toBeLessThanOrEqual(1);
  }
}`,...N.parameters?.docs?.source},description:{story:`Edge-to-edge workspace ownership without shell gutters.`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: requiredArgs,
  render: () => <ShellPlayground initialMode="clinical" permissions={PERMISSIONS.soloDoctor} workspace={soloCabinet} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const modes = deriveAvailableModes({
      permissions: PERMISSIONS.soloDoctor,
      enabledModules: ALL_MODULES,
      licenceVerified: true
    });
    await expect(modes).toEqual(['clinical']);
    await expect(canvas.queryByText('Switch work area')).not.toBeInTheDocument();
  }
}`,...P.parameters?.docs?.source},description:{story:`Solo doctor: one mode only → no mode switcher, no switch chrome at all.
The simplest customer never pays complexity tax for the multi-role model.`,...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: requiredArgs,
  render: () => <ShellPlayground initialMode="clinical" permissions={PERMISSIONS.doctorFull} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    for (const label of ['Home', 'Results', 'Patients', 'Earnings', 'Catalog']) {
      await expect(canvas.getByRole('button', {
        name: label
      })).toBeVisible();
    }
    await expect(canvas.queryByRole('button', {
      name: 'More'
    })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('button', {
      name: 'Care plans'
    })).not.toBeInTheDocument();
  }
}`,...F.parameters?.docs?.source},description:{story:`The registry exposes only destinations backed by an app route.`,...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: requiredArgs,
  render: () => <ShellPlayground initialMode="front-desk" permissions={PERMISSIONS.nurseFrontDeskCollection} licenceVerified={false} user={nurseUser} station={{
    id: 'DESK-02',
    shift: 'morning'
  }} />,
  play: async ({
    canvasElement
  }) => {
    const modes = deriveAvailableModes({
      permissions: PERMISSIONS.nurseFrontDeskCollection,
      enabledModules: ALL_MODULES,
      licenceVerified: false
    });
    await expect(modes).toEqual(['front-desk', 'collection']);
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Arrivals'
    })).toBeVisible();
    const payments = canvas.getByRole('button', {
      name: 'Payments'
    });
    await userEvent.click(payments);
    await expect(payments).toHaveAttribute('aria-current', 'page');
    await expect(payments.querySelector('[data-kura-icon-style="bulk-rounded"]')).toBeTruthy();
    await expect(canvas.queryByRole('button', {
      name: 'Reports'
    })).not.toBeInTheDocument();
  }
}`,...I.parameters?.docs?.source},description:{story:`Multi-role nurse: front desk + collection, no clinical (no licence, no
clinical capabilities). The switcher shows exactly the earned modes.`,...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: requiredArgs,
  render: () => <ShellPlayground initialMode="clinical" permissions={PERMISSIONS.doctorFull} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', {
      name: /Clinical/
    }));
    const frontDeskOption = await body.findByRole('menuitemradio', {
      name: /Front desk/
    });
    await userEvent.click(frontDeskOption);
    await waitFor(async () => {
      await expect(canvas.getByRole('button', {
        name: 'Arrivals'
      })).toBeVisible();
      await expect(canvas.getByText(/Front desk · arrivals/)).toBeVisible();
    });
  }
}`,...L.parameters?.docs?.source},description:{story:`Switching modes swaps navigation and lands on the mode's entry destination.`,...L.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: requiredArgs,
  render: () => <ShellPlayground initialMode="collection" permissions={PERMISSIONS.nurseFrontDeskCollection} licenceVerified={false} user={nurseUser} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvasElement.querySelector('[data-slot="app-shell"]')).toHaveAttribute('data-posture', 'sidebar');
    await expect(canvas.getByRole('navigation', {
      name: 'Primary'
    })).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Scan'
    })).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Handoffs'
    })).toBeVisible();
    await expect(canvas.queryByText(/Station PSC-/)).not.toBeInTheDocument();
  }
}`,...R.parameters?.docs?.source},description:{story:`Collection defaults to the shared navigation shell for mixed-role work.`,...R.parameters?.docs?.description}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: requiredArgs,
  render: () => <ShellPlayground initialMode="collection" permissions={PERMISSIONS.nurseFrontDeskCollection} licenceVerified={false} user={nurseUser} posture="station" station={psc01} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvasElement.querySelector('[data-slot="app-shell"]')).toHaveAttribute('data-posture', 'station');
    await expect(canvas.getByText('Phlebotomy')).toBeVisible();
    await expect(canvas.getByText('Station PSC-01')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: /Morning shift/
    })).toBeVisible();
    await expect(canvas.queryByRole('navigation', {
      name: 'Primary'
    })).not.toBeInTheDocument();
  }
}`,...z.parameters?.docs?.source},description:{story:`Explicit station posture: no sidebar, station identity + shift in the topbar.
Scan-first booth work is not navigation-first work — the chrome yields.`,...z.parameters?.docs?.description}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: requiredArgs,
  render: () => <ShellPlayground initialMode="front-desk" permissions={PERMISSIONS.doctorFull} licenceVerified={false} banner={<Alert tone="warning">
          <AlertTitle>Licence under review</AlertTitle>
          <AlertDescription>
            Clinical ordering unlocks once verification finishes — usually within 1 business day.
          </AlertDescription>
        </Alert>} />
}`,...B.parameters?.docs?.source},description:{story:`Licence lifecycle banner in the banner slot — pending review example.`,...B.parameters?.docs?.description}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: requiredArgs,
  render: () => {
    const nav = MODE_REGISTRY['front-desk'].nav.map(group => ({
      ...group,
      items: group.items.map(item => item.key === 'arrivals' ? {
        ...item,
        badgeCount: 4
      } : item.key === 'queue' ? {
        ...item,
        badgeCount: 7
      } : item)
    }));
    return <ShellPlayground initialMode="front-desk" permissions={PERMISSIONS.nurseFrontDeskCollection} licenceVerified={false} user={nurseUser} nav={nav} />;
  }
}`,...V.parameters?.docs?.source},description:{story:`Badge counts on nav items surface work waiting in other destinations.`,...V.parameters?.docs?.description}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: requiredArgs,
  render: () => <ShellPlayground activeKey="earnings" initialMode="clinical" permissions={PERMISSIONS.doctorFull} scopeLabel="All Kura workspaces" />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Scope: All Kura workspaces')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Earnings'
    })).toHaveAttribute('aria-current', 'page');
    await expect(canvas.queryByText('Mekong Clinic')).not.toBeInTheDocument();
  }
}`,...H.parameters?.docs?.source},description:{story:`Person-owned Earnings appears only with self-ledger access and keeps one active nav item.`,...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: requiredArgs,
  render: () => <ShellPlayground initialMode="clinical" permissions={['patient.read']} />,
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).queryByRole('button', {
      name: 'Earnings'
    })).not.toBeInTheDocument();
  }
}`,...U.parameters?.docs?.source},description:{story:`Delegated clinical access never exposes the person-owned Earnings destination.`,...U.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: requiredArgs,
  render: () => <ShellPlayground initialMode="clinical" permissions={PERMISSIONS.doctorFull} defaultCollapsed />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const sidebar = canvasElement.querySelector('[data-slot="app-shell-sidebar"]');
    const brand = canvasElement.querySelector('[data-slot="app-shell-sidebar-brand"]');
    if (!(sidebar instanceof HTMLElement) || !(brand instanceof HTMLElement)) {
      throw new Error('Collapsed sidebar anatomy did not render.');
    }
    const expandToggle = canvas.getByRole('button', {
      name: 'Expand navigation'
    });
    const homeButton = canvas.getByRole('button', {
      name: 'Home'
    });
    await expect(expandToggle).toBeInTheDocument();
    await expect(canvas.getByRole('button', {
      name: 'Patients'
    })).toBeVisible();
    await expect(homeButton).toHaveAttribute('aria-current', 'page');
    await expect(within(homeButton).getByText('Home')).toBeVisible();
    await waitFor(() => expect(sidebar.getBoundingClientRect().width).toBeGreaterThan(70));
    const homeIcon = homeButton.querySelector('svg');
    if (!(homeIcon instanceof SVGElement)) {
      throw new Error('Collapsed Home navigation icon did not render.');
    }
    await waitFor(() => expect(homeIcon.getBoundingClientRect().width).toBeGreaterThanOrEqual(20));
    // The mode switcher stays in the rail, so collapse changes density only.
    const modeButton = canvas.getByRole('button', {
      name: 'Work area: Clinical'
    });
    await expect(modeButton).toBeVisible();
    await userEvent.tab();
    await expect(expandToggle).toHaveFocus();
    await waitFor(() => expect(expandToggle).toBeVisible());

    // Two fast activations must reverse from the current state without losing
    // the active destination or creating a second navigation model.
    await userEvent.dblClick(expandToggle);
    await expect(expandToggle).toHaveAttribute('aria-expanded', 'false');
    await expect(canvas.getByRole('button', {
      name: 'Home'
    })).toHaveAttribute('aria-current', 'page');
    await userEvent.click(expandToggle);
    await waitFor(() => expect(sidebar.getBoundingClientRect().width).toBeGreaterThan(200));
    await expect(canvas.getByRole('button', {
      name: 'Collapse navigation'
    })).toBeVisible();
    await expect(within(sidebar).getByText('Work')).toBeVisible();
  }
}`,...W.parameters?.docs?.source},description:{story:`Collapsed rail keeps navigation reachable and reverses cleanly under rapid input.`,...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: requiredArgs,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <ShellPlayground initialMode="clinical" permissions={PERMISSIONS.doctorFull} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Open navigation'
    }));
    const dialog = await canvas.findByRole('dialog');
    await expect(within(dialog).getByText('Patients')).toBeVisible();
  }
}`,...G.parameters?.docs?.source},description:{story:`Below 768px the sidebar yields to a left sheet with the same nav.`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: requiredArgs,
  render: () => <ShellPlayground initialMode="front-desk" permissions={PERMISSIONS.doctorFull} workspace={{
    id: 'ws-long',
    name: 'គ្លីនិកវេជ្ជសាស្ត្រ Mekong International Family Medicine & Diagnostics',
    branches: [{
      id: 'br-long',
      name: 'Sangkat Boeung Keng Kang Ti Muoy Branch — opposite the old market'
    }],
    activeBranchId: 'br-long'
  }} />
}`,...K.parameters?.docs?.source},description:{story:`Long Khmer + English workspace and branch names must truncate, not break layout.`,...K.parameters?.docs?.description}}},q=[`FullClinic`,`FullBleedWorkspace`,`SoloDoctor`,`ExistingDestinationsOnly`,`MultiRoleNurse`,`ModeSwitch`,`CollectionSidebar`,`CollectionStation`,`WithLicenceBanner`,`WithBadgeCounts`,`EarningsPersonGlobalScope`,`EarningsHiddenWithoutSelfAccess`,`CollapsedRail`,`Mobile`,`LongContent`]}))();export{W as CollapsedRail,R as CollectionSidebar,z as CollectionStation,U as EarningsHiddenWithoutSelfAccess,H as EarningsPersonGlobalScope,F as ExistingDestinationsOnly,N as FullBleedWorkspace,M as FullClinic,K as LongContent,G as Mobile,L as ModeSwitch,I as MultiRoleNurse,P as SoloDoctor,V as WithBadgeCounts,B as WithLicenceBanner,q as __namedExportsOrder,A as default};