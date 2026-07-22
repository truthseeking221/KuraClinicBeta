import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{B as i,Gt as a,S as o,Wt as s,ft as c,g as l,s as u}from"./provider-marks-BeHzyBjc.js";import{t as d}from"./icons-C5MW4nvJ.js";import{n as f,t as p}from"./app-shell-dOUH8yca.js";import{n as m,t as h}from"./global-search-B5vFgtQg.js";function g({registry:e}){let[t,n]=(0,v.useState)(!1),[r,i]=(0,v.useState)(null),a=e.map(e=>({...e,items:e.items.map(e=>({...e,onSelect:()=>i(e.id)}))}));return(0,_.jsxs)(p,{activeKey:`arrivals`,availableModes:[`front-desk`,`collection`],mode:`front-desk`,onNavigate:()=>{},onOpenSearch:()=>n(!0),station:{id:`DESK-01`,shift:`morning`},user:{name:`Linh Nguyen`,email:`linh@mekong.clinic`,licenceVerified:!1},workspace:{id:`ws-mekong`,name:`Mekong Clinic`},children:[(0,_.jsx)(`div`,{style:{padding:`var(--space-6)`},children:(0,_.jsx)(`p`,{role:`status`,children:r?`Opened: ${r}`:`Nothing opened yet.`})}),(0,_.jsx)(h,{onOpenChange:n,open:t,sections:a})]})}var _,v,y,b,x,S,C,w,T,E,D,O;t((()=>{_=r(),v=e(n()),d(),f(),m(),{expect:y,userEvent:b,waitFor:x,within:S}=__STORYBOOK_MODULE_TEST__,C={title:`Clinic/Shell/Global Search`,component:h,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:{intake:{decision:`COMPOSE (CommandDialog + Command family + Kbd)`,owner:`src/components/shared/app-shell`,evidence:`Journey WQ-02: the shell ⌘K trigger existed with no palette behind it. GlobalSearch completes the pair — it owns the global hotkey and open state, renders the permission-filtered registry the shell supplies, and keeps door semantics: exact phone, exact booking code, workspace recents, lab-catalog text search. Consequential selections start their governed flow; nothing clinical completes in the palette.`,exclusions:[`Registry construction, permission filtering, and door resolution stay with the application (deriveAvailableModes precedent) — this composition only renders and dispatches.`,`Remote fetching/ranking stays outside; the async lab-catalog contract is documented on Design System/Components/Command.`]},journeys:[`WQ-02-global-search`],binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-modal`,icons:`kura-hugeicons`}},docs:{description:{component:`The shell-owned ⌘K palette. AppShell renders the trigger; GlobalSearch owns the hotkey, open state, and registry presentation. The default empty state explains the reception doors instead of failing silently.`}}}},w=[{id:`doors`,heading:`Doors`,items:[{id:`door-phone`,label:`Find patient by phone (exact)`,hint:`Opens the phone-gate lookup`,icon:(0,_.jsx)(a,{"aria-hidden":`true`}),keywords:[`phone`,`patient`,`lookup`]},{id:`door-booking`,label:`Open booking by code`,hint:`GW-format collection code`,icon:(0,_.jsx)(o,{"aria-hidden":`true`}),keywords:[`booking`,`code`]}]},{id:`navigation`,heading:`Navigation`,items:[{id:`nav-arrivals`,label:`Arrivals`,icon:(0,_.jsx)(o,{"aria-hidden":`true`}),keywords:[`check-in`,`front desk`]},{id:`nav-bookings`,label:`Today’s bookings`,icon:(0,_.jsx)(u,{"aria-hidden":`true`}),keywords:[`worklist`]},{id:`nav-catalog`,label:`Lab test catalog`,icon:(0,_.jsx)(c,{"aria-hidden":`true`}),keywords:[`tests`,`search`]}]},{id:`actions`,heading:`Actions`,items:[{id:`action-check-in`,label:`Start patient check-in`,icon:(0,_.jsx)(a,{"aria-hidden":`true`}),shortcut:`⌘I`,keywords:[`reception`,`wizard`]},{id:`action-invite`,label:`Invite workspace member`,hint:`Needs the member.invite permission — ask a workspace administrator.`,icon:(0,_.jsx)(s,{"aria-hidden":`true`}),disabled:!0,keywords:[`member`,`invite`]}]}],T={name:`Wired to the shell trigger + ⌘K`,args:{sections:w,open:!1,onOpenChange:()=>{}},render:()=>(0,_.jsx)(g,{registry:w}),play:async({canvasElement:e})=>{let t=S(e.ownerDocument.body);await b.click(t.getByRole(`button`,{name:/Search/}));let n=await t.findByPlaceholderText(`Exact phone, booking code, test, or action`);await x(async()=>{await y(n).toHaveFocus()}),await b.type(n,`catalog`),await b.keyboard(`{ArrowDown}{Enter}`),await x(async()=>{await y(t.getByRole(`status`)).toHaveTextContent(`Opened: nav-catalog`)}),await y(n).not.toBeVisible(),await b.keyboard(`{Meta>}k{/Meta}`),await x(async()=>{await y(t.getByPlaceholderText(`Exact phone, booking code, test, or action`)).toBeVisible()}),await b.keyboard(`{Escape}`)}},E={name:`Name query → doors explanation`,args:{sections:w,open:!0,onOpenChange:()=>{}},render:function(){let[e,t]=(0,v.useState)(!0);return(0,_.jsx)(h,{onOpenChange:t,open:e,sections:w})},play:async({canvasElement:e})=>{let t=S(e.ownerDocument.body),n=await t.findByPlaceholderText(`Exact phone, booking code, test, or action`);await b.type(n,`Sokha Chan`),await y(await t.findByText(/resolve by exact phone or booking code/i)).toBeVisible()}},D={name:`Permission-limited registry (phlebotomy station)`,args:{sections:[],open:!0,onOpenChange:()=>{}},render:function(){let[e,t]=(0,v.useState)(!0);return(0,_.jsx)(h,{description:`This station’s registry is filtered before it reaches the palette — workspace administration never appears here.`,onOpenChange:t,open:e,sections:[{id:`navigation`,heading:`Navigation`,items:[{id:`nav-worklist`,label:`Collection draw worklist`,icon:(0,_.jsx)(i,{"aria-hidden":`true`}),keywords:[`draw`,`samples`]},{id:`nav-schedule`,label:`Shift schedule`,icon:(0,_.jsx)(l,{"aria-hidden":`true`}),keywords:[`shift`]}]}]})},play:async({canvasElement:e})=>{let t=S(e.ownerDocument.body);await y(await t.findByText(`Collection draw worklist`)).toBeVisible(),await y(t.queryByText(/Invite workspace member/)).not.toBeInTheDocument()}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Wired to the shell trigger + ⌘K',
  args: {
    sections: FRONT_DESK_REGISTRY,
    open: false,
    onOpenChange: () => {}
  },
  render: () => <ShellPlayground registry={FRONT_DESK_REGISTRY} />,
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);

    // The visible trigger opens the palette.
    await userEvent.click(body.getByRole('button', {
      name: /Search/
    }));
    const input = await body.findByPlaceholderText('Exact phone, booking code, test, or action');
    await waitFor(async () => {
      await expect(input).toHaveFocus();
    });

    // Selecting dispatches to the owner and closes the palette.
    await userEvent.type(input, 'catalog');
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await waitFor(async () => {
      await expect(body.getByRole('status')).toHaveTextContent('Opened: nav-catalog');
    });
    await expect(input).not.toBeVisible();

    // The global hotkey reopens it.
    await userEvent.keyboard('{Meta>}k{/Meta}');
    await waitFor(async () => {
      await expect(body.getByPlaceholderText('Exact phone, booking code, test, or action')).toBeVisible();
    });
    await userEvent.keyboard('{Escape}');
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Name query → doors explanation',
  args: {
    sections: FRONT_DESK_REGISTRY,
    open: true,
    onOpenChange: () => {}
  },
  render: function DoorsStory() {
    const [open, setOpen] = useState(true);
    return <GlobalSearch onOpenChange={setOpen} open={open} sections={FRONT_DESK_REGISTRY} />;
  },
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    const input = await body.findByPlaceholderText('Exact phone, booking code, test, or action');
    await userEvent.type(input, 'Sokha Chan');
    await expect(await body.findByText(/resolve by exact phone or booking code/i)).toBeVisible();
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Permission-limited registry (phlebotomy station)',
  args: {
    sections: [],
    open: true,
    onOpenChange: () => {}
  },
  render: function LimitedStory() {
    const [open, setOpen] = useState(true);
    const sections: GlobalSearchSection[] = [{
      id: 'navigation',
      heading: 'Navigation',
      items: [{
        id: 'nav-worklist',
        label: 'Collection draw worklist',
        icon: <FileIcon aria-hidden="true" />,
        keywords: ['draw', 'samples']
      }, {
        id: 'nav-schedule',
        label: 'Shift schedule',
        icon: <CalendarIcon aria-hidden="true" />,
        keywords: ['shift']
      }]
    }];
    return <GlobalSearch description="This station’s registry is filtered before it reaches the palette — workspace administration never appears here." onOpenChange={setOpen} open={open} sections={sections} />;
  },
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    await expect(await body.findByText('Collection draw worklist')).toBeVisible();
    await expect(body.queryByText(/Invite workspace member/)).not.toBeInTheDocument();
  }
}`,...D.parameters?.docs?.source}}},O=[`WiredToShell`,`DoorsExplainOnNameQuery`,`PermissionLimitedRegistry`]}))();export{E as DoorsExplainOnNameQuery,D as PermissionLimitedRegistry,T as WiredToShell,O as __namedExportsOrder,C as default};