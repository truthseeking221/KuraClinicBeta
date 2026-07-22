import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{F as i,L as a,P as o,c as s,gt as c,j as l,x as u}from"./provider-marks-BeHzyBjc.js";import{Bn as d,Fn as f,Gn as p,Hn as m,In as h,Ln as g,Mn as _,Nn as v,Pn as y,Rn as b,Un as x,Vn as S,Wn as C,t as w,zn as T}from"./ui-C9kmmzkH.js";import{d as E}from"./date-range-picker-CVkMECHY.js";import{t as D}from"./button-B6_zsN5-.js";function O(){let[e,t]=(0,A.useState)(!1),[n,r]=(0,A.useState)(`summary`);return(0,k.jsxs)(_,{children:[(0,k.jsx)(p,{asChild:!0,children:(0,k.jsx)(D,{variant:`outline`,disclosure:!0,children:`Review view`})}),(0,k.jsxs)(y,{"aria-label":`Review view options`,children:[(0,k.jsx)(v,{checked:e,onCheckedChange:t,children:`Show archived drafts`}),(0,k.jsx)(d,{}),(0,k.jsx)(g,{inset:!0,children:`Default view`}),(0,k.jsxs)(b,{value:n,onValueChange:r,children:[(0,k.jsx)(T,{value:`summary`,children:`Summary`}),(0,k.jsx)(T,{value:`timeline`,children:`Timeline`}),(0,k.jsx)(T,{value:`audit`,children:`Audit history`})]})]})]})}var k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W;t((()=>{k=r(),A=e(n()),w(),{expect:j,userEvent:M,within:N}=__STORYBOOK_MODULE_TEST__,P={title:`Design System/Components/Dropdown Menu`,component:_,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,hierarchy:`Component`,evidence:`Kura owns the contextual-menu contract and Radix behavior while adopting Kura panel, row, shadow, and overlay motion finish.`},source:{vendor:`Kura`,registryItem:`dropdown`,visualReference:`Kura dropdown`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-popover`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`fluid-collision-safe-anchored-menu-with-contained-scrolling`},useCase:{role:`Clinic staff and workspace administrators`,primaryTask:`Reveal a small set of secondary contextual actions or preferences without losing the current record or workspace context.`,primaryAction:`Choose one clearly labelled, reversible-or-confirmed menu action.`,dataModel:`Workflow-owned action labels, enabled state, selected preference state, and action handlers. The primitive neither loads data nor assigns permissions.`,safety:`Each trigger must retain a visible label or an accessible name. The primitive provides keyboard focus, Escape dismissal, type-ahead navigation, collision handling, and disabled-item semantics. Destructive actions remain explicitly labelled and must compose AlertDialog or feature-owned confirmation before changing consequential clinical or access data.`},mobile:{primaryTask:`Open and choose a short contextual action safely with touch or keyboard.`,minimumUsableWidth:`320px`,strategy:[`FLUID`,`SCROLLING`],behavior:`The menu remains collision-safe and anchored to its trigger; content clamps to the visible viewport and scrolls internally. Menu items retain a minimum touch target. Long, searchable, or comparison-heavy choices belong to Autocomplete or their owning workflow instead.`},exclusions:[{capability:`User profile, workspace switcher, notifications, user-and-create, quick-action, and AI model selector demos`,reason:`These are workflow-specific compositions with identity, permissions, data loading, or notification state; they do not define a generic menu primitive.`,replacement:`Feature-owned compositions should compose DropdownMenu with canonical Avatar, Button, Badge, and workflow data when their real contract is defined.`},{capability:`Searchable menu content`,reason:`Search changes the component into a query-and-selection workflow with filtering, loading, empty, and authoritative-value semantics.`,replacement:`Use the canonical Autocomplete owner.`},{capability:`High-consequence destructive confirmation`,reason:`A compact contextual menu cannot safely communicate clinical, access, or irreversible consequences.`,replacement:`Use the canonical AlertDialog or a feature-owned confirmation flow after selecting the menu item.`},{capability:`Long or comparison-critical choices`,reason:`Hiding these choices in a menu would increase recall burden and undermine safe comparison.`,replacement:`Keep them visible in the owning form, table, or segmented selection pattern.`}]},docs:{description:{component:`A collision-safe contextual menu for a short list of secondary actions or preferences. Use a named Button or an IconButton with an explicit accessible name as the trigger. Do not place search, large comparisons, or high-consequence confirmation inside a menu.`}}}},F={render:()=>(0,k.jsxs)(_,{children:[(0,k.jsx)(p,{asChild:!0,children:(0,k.jsx)(D,{variant:`outline`,disclosure:!0,children:`Record actions`})}),(0,k.jsxs)(y,{align:`start`,"aria-label":`Record actions`,children:[(0,k.jsx)(g,{children:`Draft consultation`}),(0,k.jsxs)(f,{children:[(0,k.jsx)(h,{children:`Review draft note`}),(0,k.jsx)(h,{children:`Duplicate draft`})]}),(0,k.jsx)(d,{}),(0,k.jsx)(h,{variant:`destructive`,children:`Discard draft`})]})]}),play:async({canvasElement:e})=>{let t=N(e).getByRole(`button`,{name:`Record actions`});await M.click(t);let n=N(e.ownerDocument.body),r=n.getByRole(`menu`,{name:`Record actions`});await j(r).toBeVisible(),await M.keyboard(`{ArrowDown}`),await j(n.getByRole(`menuitem`,{name:`Review draft note`})).toHaveFocus(),await M.keyboard(`{Escape}`),await j(r).not.toBeVisible(),await j(t).toHaveFocus()}},I={render:()=>(0,k.jsxs)(_,{children:[(0,k.jsx)(p,{asChild:!0,children:(0,k.jsx)(E,{"aria-label":`Open document actions`,variant:`tertiary`,children:(0,k.jsx)(c,{"aria-hidden":`true`})})}),(0,k.jsxs)(y,{align:`end`,"aria-label":`Document actions`,children:[(0,k.jsxs)(h,{children:[(0,k.jsx)(a,{"aria-hidden":`true`}),`Edit note`,(0,k.jsx)(S,{children:`⌘E`})]}),(0,k.jsxs)(h,{children:[(0,k.jsx)(l,{"aria-hidden":`true`}),`Copy reference`,(0,k.jsx)(S,{children:`⌘C`})]}),(0,k.jsx)(d,{}),(0,k.jsxs)(h,{children:[(0,k.jsx)(s,{"aria-hidden":`true`}),`Archive draft`]}),(0,k.jsxs)(h,{variant:`destructive`,children:[(0,k.jsx)(o,{"aria-hidden":`true`}),`Delete draft`]})]})]})},L={render:()=>(0,k.jsxs)(_,{children:[(0,k.jsx)(p,{asChild:!0,children:(0,k.jsx)(D,{variant:`outline`,children:`Export review`})}),(0,k.jsxs)(y,{"aria-label":`Export review`,children:[(0,k.jsx)(h,{children:`Copy review link`}),(0,k.jsxs)(m,{children:[(0,k.jsx)(C,{children:`Export format`}),(0,k.jsxs)(x,{"aria-label":`Export format`,children:[(0,k.jsxs)(h,{children:[(0,k.jsx)(i,{"aria-hidden":`true`}),`Download PDF`]}),(0,k.jsxs)(h,{children:[(0,k.jsx)(i,{"aria-hidden":`true`}),`Download CSV`]})]})]})]})]})},R={render:()=>(0,k.jsx)(O,{})},z={render:()=>(0,k.jsxs)(_,{defaultOpen:!0,children:[(0,k.jsx)(p,{asChild:!0,children:(0,k.jsx)(D,{variant:`outline`,disclosure:!0,children:`Consultation actions`})}),(0,k.jsxs)(y,{"aria-label":`Consultation actions`,children:[(0,k.jsx)(g,{children:`Verification required`}),(0,k.jsx)(h,{disabled:!0,children:`Share consultation summary`}),(0,k.jsx)(h,{disabled:!0,children:`Complete consultation`}),(0,k.jsx)(d,{}),(0,k.jsx)(h,{children:`Save draft locally`})]})]})},B={render:()=>(0,k.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,k.jsxs)(_,{defaultOpen:!0,children:[(0,k.jsx)(p,{asChild:!0,children:(0,k.jsx)(D,{variant:`outline`,disclosure:!0,children:`Thao tác với hồ sơ`})}),(0,k.jsxs)(y,{align:`start`,"aria-label":`Thao tác với hồ sơ`,children:[(0,k.jsx)(h,{children:`Sao chép liên kết xem lại cho Trung tâm Chăm sóc Sức khỏe Nguyễn Trãi – Ca trực buổi chiều`}),(0,k.jsx)(h,{children:`Xuất bản tóm tắt hội chẩn song ngữ Việt–Anh cho nhóm điều trị được phân quyền`}),(0,k.jsx)(d,{}),(0,k.jsx)(h,{variant:`destructive`,children:`Huỷ bản nháp chưa gửi và giữ lại lịch sử kiểm toán`})]})]})})},V={parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,k.jsx)(`div`,{className:`flex w-full justify-end`,children:(0,k.jsxs)(_,{defaultOpen:!0,children:[(0,k.jsx)(p,{asChild:!0,children:(0,k.jsx)(E,{"aria-label":`Open appointment actions`,variant:`tertiary`,children:(0,k.jsx)(c,{"aria-hidden":`true`})})}),(0,k.jsxs)(y,{align:`end`,"aria-label":`Appointment actions`,children:[(0,k.jsx)(h,{children:`Reschedule appointment`}),(0,k.jsx)(h,{children:`Contact patient`}),(0,k.jsx)(d,{}),(0,k.jsx)(h,{variant:`destructive`,children:`Cancel appointment`})]})]})})},H={parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,k.jsx)(`div`,{className:`flex w-full justify-start`,children:(0,k.jsxs)(_,{defaultOpen:!0,children:[(0,k.jsx)(p,{asChild:!0,children:(0,k.jsx)(D,{variant:`outline`,disclosure:!0,children:`More review actions`})}),(0,k.jsxs)(y,{align:`start`,"aria-label":`More review actions`,children:[(0,k.jsx)(g,{children:`Draft consultation utilities`}),(0,k.jsx)(h,{children:`Review patient identity details`}),(0,k.jsx)(h,{children:`Open the clinical history timeline`}),(0,k.jsx)(h,{children:`Copy the consultation reference`}),(0,k.jsx)(h,{children:`Send a follow-up reminder`}),(0,k.jsx)(h,{children:`Request a supervising clinician review`}),(0,k.jsx)(h,{children:`Print the current consultation summary`}),(0,k.jsx)(h,{children:`Export a read-only review copy`}),(0,k.jsx)(d,{}),(0,k.jsx)(h,{children:`Save a private working copy`}),(0,k.jsx)(h,{children:`Mark the draft for later review`}),(0,k.jsx)(h,{children:`Restore the previous saved version`}),(0,k.jsx)(h,{variant:`destructive`,children:`Discard the current draft`})]})]})})},U={render:()=>(0,k.jsxs)(_,{defaultOpen:!0,children:[(0,k.jsx)(p,{asChild:!0,children:(0,k.jsx)(D,{variant:`outline`,disclosure:!0,children:`Review utilities`})}),(0,k.jsxs)(y,{"aria-label":`Review utilities`,children:[(0,k.jsxs)(h,{children:[(0,k.jsx)(u,{"aria-hidden":`true`}),`Mark review complete`]}),(0,k.jsxs)(h,{children:[(0,k.jsx)(a,{"aria-hidden":`true`}),`Edit review instructions`]}),(0,k.jsxs)(h,{children:[(0,k.jsx)(l,{"aria-hidden":`true`}),`Copy review reference`]}),(0,k.jsxs)(h,{children:[(0,k.jsx)(i,{"aria-hidden":`true`}),`Export review summary`]})]})]})},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disclosure>Record actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" aria-label="Record actions">
        <DropdownMenuLabel>Draft consultation</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>Review draft note</DropdownMenuItem>
          <DropdownMenuItem>Duplicate draft</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Discard draft</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: 'Record actions'
    });
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    const menu = body.getByRole('menu', {
      name: 'Record actions'
    });
    await expect(menu).toBeVisible();
    await userEvent.keyboard('{ArrowDown}');
    await expect(body.getByRole('menuitem', {
      name: 'Review draft note'
    })).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    await expect(menu).not.toBeVisible();
    await expect(trigger).toHaveFocus();
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton aria-label="Open document actions" variant="tertiary">
          <MoreVerticalIcon aria-hidden="true" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" aria-label="Document actions">
        <DropdownMenuItem>
          <EditIcon aria-hidden="true" />
          Edit note
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CopyIcon aria-hidden="true" />
          Copy reference
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ArchiveIcon aria-hidden="true" />
          Archive draft
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <DeleteIcon aria-hidden="true" />
          Delete draft
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Export review</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Export review">
        <DropdownMenuItem>Copy review link</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Export format</DropdownMenuSubTrigger>
          <DropdownMenuSubContent aria-label="Export format">
            <DropdownMenuItem>
              <DownloadIcon aria-hidden="true" />
              Download PDF
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DownloadIcon aria-hidden="true" />
              Download CSV
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <SelectionControlsExample />
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu defaultOpen>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disclosure>Consultation actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Consultation actions">
        <DropdownMenuLabel>Verification required</DropdownMenuLabel>
        <DropdownMenuItem disabled>Share consultation summary</DropdownMenuItem>
        <DropdownMenuItem disabled>Complete consultation</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Save draft locally</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-sm">
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" disclosure>Thao tác với hồ sơ</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" aria-label="Thao tác với hồ sơ">
          <DropdownMenuItem>
            Sao chép liên kết xem lại cho Trung tâm Chăm sóc Sức khỏe Nguyễn Trãi – Ca trực buổi chiều
          </DropdownMenuItem>
          <DropdownMenuItem>
            Xuất bản tóm tắt hội chẩn song ngữ Việt–Anh cho nhóm điều trị được phân quyền
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            Huỷ bản nháp chưa gửi và giữ lại lịch sử kiểm toán
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <div className="flex w-full justify-end">
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <IconButton aria-label="Open appointment actions" variant="tertiary">
            <MoreVerticalIcon aria-hidden="true" />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" aria-label="Appointment actions">
          <DropdownMenuItem>Reschedule appointment</DropdownMenuItem>
          <DropdownMenuItem>Contact patient</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Cancel appointment</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <div className="flex w-full justify-start">
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" disclosure>More review actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" aria-label="More review actions">
          <DropdownMenuLabel>Draft consultation utilities</DropdownMenuLabel>
          <DropdownMenuItem>Review patient identity details</DropdownMenuItem>
          <DropdownMenuItem>Open the clinical history timeline</DropdownMenuItem>
          <DropdownMenuItem>Copy the consultation reference</DropdownMenuItem>
          <DropdownMenuItem>Send a follow-up reminder</DropdownMenuItem>
          <DropdownMenuItem>Request a supervising clinician review</DropdownMenuItem>
          <DropdownMenuItem>Print the current consultation summary</DropdownMenuItem>
          <DropdownMenuItem>Export a read-only review copy</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Save a private working copy</DropdownMenuItem>
          <DropdownMenuItem>Mark the draft for later review</DropdownMenuItem>
          <DropdownMenuItem>Restore the previous saved version</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Discard the current draft</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu defaultOpen>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disclosure>Review utilities</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Review utilities">
        <DropdownMenuItem><CheckIcon aria-hidden="true" />Mark review complete</DropdownMenuItem>
        <DropdownMenuItem><EditIcon aria-hidden="true" />Edit review instructions</DropdownMenuItem>
        <DropdownMenuItem><CopyIcon aria-hidden="true" />Copy review reference</DropdownMenuItem>
        <DropdownMenuItem><DownloadIcon aria-hidden="true" />Export review summary</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}`,...U.parameters?.docs?.source}}},W=[`Actions`,`IconsAndShortcuts`,`NestedActions`,`SelectionControls`,`AvailabilityAndPermission`,`LongContent`,`MobileReference`,`MobileLongActionList`,`DenseActionList`]}))();export{F as Actions,z as AvailabilityAndPermission,U as DenseActionList,I as IconsAndShortcuts,B as LongContent,H as MobileLongActionList,V as MobileReference,L as NestedActions,R as SelectionControls,W as __namedExportsOrder,P as default};