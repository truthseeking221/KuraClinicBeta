import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{At as n,B as r,N as i,T as a,_t as o,ht as s,kt as c,st as l}from"./provider-marks-BeHzyBjc.js";import{Rt as u,an as d,cn as f,dn as p,fr as m,in as h,ln as g,nn as _,on as v,rn as y,sn as b,t as x,un as S}from"./ui-C9kmmzkH.js";import{a as C,r as w}from"./skeleton-yGvKPj3C.js";import{t as T}from"./button-B6_zsN5-.js";import{a as E}from"./collapsible-Cfc9M9oP.js";var D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G;e((()=>{D=t(),x(),{expect:O,fn:k,userEvent:A,within:j}=__STORYBOOK_MODULE_TEST__,M={title:`Design System/Components/Item`,component:_,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,hierarchy:`Component`,evidence:`The fresh Storybook and source search found no generic owner for a scannable media + title/description + actions row. Table/DataGrid, menu items, Card, and domain rows have different data or interaction contracts. ReUI c-item-1 through c-item-12 establish the missing reusable composition.`},source:{vendor:`ReUI`,registryItem:`@reui/item with c-item-1 through c-item-12`,sourceUrl:`https://reui.io/components/item`},binding:{colors:`kura-semantic`,typography:`kura-weight-swap`,spacing:`kura`,radius:`kura-control`,elevation:`focus-only`,icons:`kura-canonical`,motion:`kura-color-and-focus`,density:`kura-root-attribute`,responsive:`fluid-grid-with-wrapping-actions`},exclusions:[`Sortable drag handles, virtualisation and data-grid behavior remain separate owners.`,`File upload state, permissions, follow behavior, integration transitions and activity persistence remain workflow-owned.`,`Remote demo imagery and generic SaaS copy are replaced with Kura operational examples.`]},docs:{description:{component:`A composable, domain-neutral content row with optional media, title, description, actions, header, and footer. Use Table or DataGrid for columnar data and Field for form controls.`}}},argTypes:{size:{control:`inline-radio`,options:[`xs`,`sm`,`md`]},variant:{control:`inline-radio`,options:[`default`,`outline`,`muted`]}}},N={display:`flex`,flexDirection:`column`,gap:`var(--space-2)`,width:`min(30rem, calc(100vw - var(--space-8)))`},P={render:()=>(0,D.jsx)(_,{children:(0,D.jsxs)(h,{children:[(0,D.jsx)(p,{children:`Patient identity verified`}),(0,D.jsx)(d,{children:`The demographic details match the current visit record.`})]})})},F={render:()=>(0,D.jsxs)(`div`,{style:N,children:[(0,D.jsx)(_,{variant:`default`,children:(0,D.jsxs)(h,{children:[(0,D.jsx)(p,{children:`Default item`}),(0,D.jsx)(d,{children:`Use inside an already established list surface.`})]})}),(0,D.jsx)(_,{variant:`outline`,children:(0,D.jsxs)(h,{children:[(0,D.jsx)(p,{children:`Outline item`}),(0,D.jsx)(d,{children:`Use when this standalone boundary carries meaning.`})]})}),(0,D.jsx)(_,{variant:`muted`,children:(0,D.jsxs)(h,{children:[(0,D.jsx)(p,{children:`Muted item`}),(0,D.jsx)(d,{children:`Secondary information on a quiet surface.`})]})})]})},I={render:()=>(0,D.jsxs)(`div`,{style:N,children:[(0,D.jsxs)(_,{variant:`outline`,children:[(0,D.jsx)(g,{variant:`icon`,children:(0,D.jsx)(l,{"aria-hidden":`true`})}),(0,D.jsxs)(h,{children:[(0,D.jsx)(p,{children:`Email delivery`}),(0,D.jsx)(d,{children:`Appointment messages use the verified patient address.`})]}),(0,D.jsx)(y,{children:(0,D.jsx)(T,{size:`sm`,variant:`outline`,children:`Configure`})})]}),(0,D.jsxs)(_,{variant:`outline`,children:[(0,D.jsx)(g,{variant:`icon`,children:(0,D.jsx)(o,{"aria-hidden":`true`})}),(0,D.jsxs)(h,{children:[(0,D.jsx)(p,{children:`Queue notifications`}),(0,D.jsx)(d,{children:`Operational alerts for the active clinic workspace.`})]}),(0,D.jsx)(y,{children:(0,D.jsx)(T,{size:`sm`,children:`Enable`})})]})]})},L={render:()=>(0,D.jsxs)(_,{variant:`outline`,size:`sm`,children:[(0,D.jsx)(g,{children:(0,D.jsx)(w,{size:`sm`,fallbackTone:`brand`,children:(0,D.jsx)(C,{children:`SK`})})}),(0,D.jsxs)(h,{children:[(0,D.jsx)(p,{children:`Dr. Sokha Kim`}),(0,D.jsx)(d,{children:`Ordering practitioner`})]}),(0,D.jsx)(y,{children:(0,D.jsx)(E,{variant:`success`,dot:!0,children:`Available`})})]})},R={render:()=>(0,D.jsxs)(b,{style:N,children:[(0,D.jsxs)(_,{as:`a`,href:`#profile`,size:`sm`,children:[(0,D.jsx)(g,{variant:`icon`,children:(0,D.jsx)(n,{"aria-hidden":`true`})}),(0,D.jsxs)(h,{children:[(0,D.jsx)(p,{children:`Profile settings`}),(0,D.jsx)(d,{children:`Review contact and professional details.`})]}),(0,D.jsx)(y,{children:(0,D.jsx)(a,{"aria-hidden":`true`})})]}),(0,D.jsx)(S,{}),(0,D.jsxs)(_,{as:`a`,href:`#workspace`,size:`sm`,children:[(0,D.jsx)(g,{variant:`icon`,children:(0,D.jsx)(i,{"aria-hidden":`true`})}),(0,D.jsxs)(h,{children:[(0,D.jsx)(p,{children:`Workspace data`}),(0,D.jsx)(d,{children:`Review the active clinic data boundary.`})]}),(0,D.jsx)(y,{children:(0,D.jsx)(a,{"aria-hidden":`true`})})]}),(0,D.jsx)(S,{}),(0,D.jsx)(_,{as:`a`,disabled:!0,href:`#unavailable`,size:`sm`,children:(0,D.jsxs)(h,{children:[(0,D.jsx)(p,{children:`Unavailable destination`}),(0,D.jsx)(d,{children:`Ask a workspace administrator for access.`})]})})]}),play:async({canvasElement:e})=>{let t=j(e),n=t.getByRole(`link`,{name:/Profile settings/}),r=t.getByRole(`link`,{name:/Workspace data/});await A.tab(),await O(n).toHaveFocus(),await A.tab(),await O(r).toHaveFocus(),await O(t.getByText(`Unavailable destination`).closest(`[data-slot="item"]`)).toHaveAttribute(`aria-disabled`,`true`)}},z={render:()=>(0,D.jsxs)(_,{variant:`outline`,size:`sm`,children:[(0,D.jsx)(g,{variant:`icon`,children:(0,D.jsx)(r,{"aria-hidden":`true`})}),(0,D.jsxs)(h,{children:[(0,D.jsx)(p,{children:`Signed referral.pdf`}),(0,D.jsx)(d,{children:`1.2 MB · Added to this visit today`})]}),(0,D.jsxs)(y,{children:[(0,D.jsx)(E,{variant:`success`,children:`Verified`}),(0,D.jsx)(T,{size:`sm`,variant:`outline`,children:`Open`})]})]})},B={render:()=>(0,D.jsxs)(b,{style:N,children:[(0,D.jsxs)(_,{as:`a`,href:`#search`,size:`xs`,children:[(0,D.jsx)(g,{variant:`icon`,children:(0,D.jsx)(c,{"aria-hidden":`true`})}),(0,D.jsx)(h,{children:(0,D.jsx)(p,{children:`Search`})}),(0,D.jsx)(y,{children:(0,D.jsx)(u,{children:`⌘K`})})]}),(0,D.jsxs)(_,{as:`a`,href:`#settings`,size:`xs`,children:[(0,D.jsx)(g,{variant:`icon`,children:(0,D.jsx)(n,{"aria-hidden":`true`})}),(0,D.jsx)(h,{children:(0,D.jsx)(p,{children:`Settings`})}),(0,D.jsx)(y,{children:(0,D.jsx)(u,{children:`⌘,`})})]})]})},V={render:()=>(0,D.jsxs)(_,{variant:`muted`,size:`sm`,children:[(0,D.jsx)(g,{children:(0,D.jsx)(m,{"aria-label":`Select CBC order`})}),(0,D.jsxs)(h,{children:[(0,D.jsx)(p,{children:`Complete blood count`}),(0,D.jsx)(d,{children:`Include this order in the current draw.`})]})]}),play:async({canvasElement:e})=>{let t=j(e).getByRole(`checkbox`,{name:`Select CBC order`});await A.click(t),await O(t).toBeChecked()}},H={args:{onClick:k()},render:()=>(0,D.jsxs)(_,{variant:`outline`,size:`sm`,children:[(0,D.jsx)(g,{children:(0,D.jsx)(w,{size:`sm`,fallbackTone:`info`,children:(0,D.jsx)(C,{children:`LN`})})}),(0,D.jsxs)(h,{children:[(0,D.jsx)(p,{children:`Linh Nguyen`}),(0,D.jsx)(d,{children:`Workspace member · Reception`})]}),(0,D.jsxs)(y,{children:[(0,D.jsx)(E,{variant:`info`,children:`Member`}),(0,D.jsx)(T,{"aria-label":`More actions for Linh Nguyen`,size:`icon-sm`,variant:`ghost`,children:(0,D.jsx)(s,{"aria-hidden":`true`})})]})]})},U={render:()=>(0,D.jsxs)(_,{variant:`outline`,children:[(0,D.jsxs)(f,{children:[(0,D.jsx)(`span`,{children:`Workspace task`}),(0,D.jsx)(E,{variant:`warning`,children:`Needs review`})]}),(0,D.jsxs)(h,{children:[(0,D.jsx)(p,{children:`Confirm imported clinic details`}),(0,D.jsx)(d,{children:`Review the address and contact details before enabling patient communications.`})]}),(0,D.jsx)(y,{children:(0,D.jsx)(T,{size:`sm`,variant:`outline`,children:`Review`})}),(0,D.jsxs)(v,{children:[(0,D.jsx)(`span`,{children:`Assigned to clinic administrator`}),(0,D.jsx)(`span`,{children:`Updated today`})]})]})},W={parameters:{viewport:{defaultViewport:`kura320`}},render:()=>(0,D.jsxs)(_,{variant:`outline`,children:[(0,D.jsx)(g,{children:(0,D.jsx)(w,{size:`sm`,fallbackTone:`neutral`,children:(0,D.jsx)(C,{children:`NT`})})}),(0,D.jsxs)(h,{children:[(0,D.jsx)(p,{children:`Nguyễn Thị Minh Anh — Kura Phnom Penh Central Clinic`}),(0,D.jsx)(d,{children:`Updated the verified contact details and requested review before the next appointment reminder is sent.`})]}),(0,D.jsxs)(y,{children:[(0,D.jsx)(E,{variant:`warning`,children:`Review required`}),(0,D.jsx)(T,{size:`sm`,variant:`outline`,children:`Open details`})]})]})},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <Item>
      <ItemContent>
        <ItemTitle>Patient identity verified</ItemTitle>
        <ItemDescription>The demographic details match the current visit record.</ItemDescription>
      </ItemContent>
    </Item>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <div style={frameStyle}>
      <Item variant="default">
        <ItemContent>
          <ItemTitle>Default item</ItemTitle>
          <ItemDescription>Use inside an already established list surface.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline item</ItemTitle>
          <ItemDescription>Use when this standalone boundary carries meaning.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Muted item</ItemTitle>
          <ItemDescription>Secondary information on a quiet surface.</ItemDescription>
        </ItemContent>
      </Item>
    </div>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <div style={frameStyle}>
      <Item variant="outline">
        <ItemMedia variant="icon"><MailIcon aria-hidden="true" /></ItemMedia>
        <ItemContent>
          <ItemTitle>Email delivery</ItemTitle>
          <ItemDescription>Appointment messages use the verified patient address.</ItemDescription>
        </ItemContent>
        <ItemActions><Button size="sm" variant="outline">Configure</Button></ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon"><NotificationsIcon aria-hidden="true" /></ItemMedia>
        <ItemContent>
          <ItemTitle>Queue notifications</ItemTitle>
          <ItemDescription>Operational alerts for the active clinic workspace.</ItemDescription>
        </ItemContent>
        <ItemActions><Button size="sm">Enable</Button></ItemActions>
      </Item>
    </div>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <Item variant="outline" size="sm">
      <ItemMedia>
        <Avatar size="sm" fallbackTone="brand"><AvatarFallback>SK</AvatarFallback></Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Dr. Sokha Kim</ItemTitle>
        <ItemDescription>Ordering practitioner</ItemDescription>
      </ItemContent>
      <ItemActions><Badge variant="success" dot>Available</Badge></ItemActions>
    </Item>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <ItemGroup style={frameStyle}>
      <Item as="a" href="#profile" size="sm">
        <ItemMedia variant="icon"><SettingsIcon aria-hidden="true" /></ItemMedia>
        <ItemContent>
          <ItemTitle>Profile settings</ItemTitle>
          <ItemDescription>Review contact and professional details.</ItemDescription>
        </ItemContent>
        <ItemActions><ChevronRightIcon aria-hidden="true" /></ItemActions>
      </Item>
      <ItemSeparator />
      <Item as="a" href="#workspace" size="sm">
        <ItemMedia variant="icon"><DatabaseIcon aria-hidden="true" /></ItemMedia>
        <ItemContent>
          <ItemTitle>Workspace data</ItemTitle>
          <ItemDescription>Review the active clinic data boundary.</ItemDescription>
        </ItemContent>
        <ItemActions><ChevronRightIcon aria-hidden="true" /></ItemActions>
      </Item>
      <ItemSeparator />
      <Item as="a" disabled href="#unavailable" size="sm">
        <ItemContent>
          <ItemTitle>Unavailable destination</ItemTitle>
          <ItemDescription>Ask a workspace administrator for access.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const profile = canvas.getByRole('link', {
      name: /Profile settings/
    });
    const workspace = canvas.getByRole('link', {
      name: /Workspace data/
    });
    await userEvent.tab();
    await expect(profile).toHaveFocus();
    await userEvent.tab();
    await expect(workspace).toHaveFocus();
    await expect(canvas.getByText('Unavailable destination').closest('[data-slot="item"]')).toHaveAttribute('aria-disabled', 'true');
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <Item variant="outline" size="sm">
      <ItemMedia variant="icon"><FileIcon aria-hidden="true" /></ItemMedia>
      <ItemContent>
        <ItemTitle>Signed referral.pdf</ItemTitle>
        <ItemDescription>1.2 MB · Added to this visit today</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge variant="success">Verified</Badge>
        <Button size="sm" variant="outline">Open</Button>
      </ItemActions>
    </Item>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <ItemGroup style={frameStyle}>
      <Item as="a" href="#search" size="xs">
        <ItemMedia variant="icon"><SearchIcon aria-hidden="true" /></ItemMedia>
        <ItemContent><ItemTitle>Search</ItemTitle></ItemContent>
        <ItemActions><Kbd>⌘K</Kbd></ItemActions>
      </Item>
      <Item as="a" href="#settings" size="xs">
        <ItemMedia variant="icon"><SettingsIcon aria-hidden="true" /></ItemMedia>
        <ItemContent><ItemTitle>Settings</ItemTitle></ItemContent>
        <ItemActions><Kbd>⌘,</Kbd></ItemActions>
      </Item>
    </ItemGroup>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <Item variant="muted" size="sm">
      <ItemMedia><Checkbox aria-label="Select CBC order" /></ItemMedia>
      <ItemContent>
        <ItemTitle>Complete blood count</ItemTitle>
        <ItemDescription>Include this order in the current draw.</ItemDescription>
      </ItemContent>
    </Item>,
  play: async ({
    canvasElement
  }) => {
    const checkbox = within(canvasElement).getByRole('checkbox', {
      name: 'Select CBC order'
    });
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    onClick: fn()
  },
  render: () => <Item variant="outline" size="sm">
      <ItemMedia>
        <Avatar size="sm" fallbackTone="info"><AvatarFallback>LN</AvatarFallback></Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Linh Nguyen</ItemTitle>
        <ItemDescription>Workspace member · Reception</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge variant="info">Member</Badge>
        <Button aria-label="More actions for Linh Nguyen" size="icon-sm" variant="ghost">
          <MoreHorizontalIcon aria-hidden="true" />
        </Button>
      </ItemActions>
    </Item>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <Item variant="outline">
      <ItemHeader>
        <span>Workspace task</span>
        <Badge variant="warning">Needs review</Badge>
      </ItemHeader>
      <ItemContent>
        <ItemTitle>Confirm imported clinic details</ItemTitle>
        <ItemDescription>Review the address and contact details before enabling patient communications.</ItemDescription>
      </ItemContent>
      <ItemActions><Button size="sm" variant="outline">Review</Button></ItemActions>
      <ItemFooter>
        <span>Assigned to clinic administrator</span>
        <span>Updated today</span>
      </ItemFooter>
    </Item>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  render: () => <Item variant="outline">
      <ItemMedia>
        <Avatar size="sm" fallbackTone="neutral"><AvatarFallback>NT</AvatarFallback></Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Nguyễn Thị Minh Anh — Kura Phnom Penh Central Clinic</ItemTitle>
        <ItemDescription>
          Updated the verified contact details and requested review before the next appointment reminder is sent.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge variant="warning">Review required</Badge>
        <Button size="sm" variant="outline">Open details</Button>
      </ItemActions>
    </Item>
}`,...W.parameters?.docs?.source}}},G=[`Default`,`Variants`,`IconMediaAndAction`,`AvatarAndStatus`,`NavigationGroup`,`DocumentItem`,`ShortcutItems`,`Selectable`,`MultipleActions`,`HeaderAndFooter`,`LongContentMobile`]}))();export{L as AvatarAndStatus,P as Default,z as DocumentItem,U as HeaderAndFooter,I as IconMediaAndAction,W as LongContentMobile,H as MultipleActions,R as NavigationGroup,V as Selectable,B as ShortcutItems,F as Variants,G as __namedExportsOrder,M as default};