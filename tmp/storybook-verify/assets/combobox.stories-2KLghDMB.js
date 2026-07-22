import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{t as i}from"./ui-C9kmmzkH.js";import{a,r as o}from"./skeleton-yGvKPj3C.js";import{_ as s,a as c,c as l,d as u,f as d,g as f,h as p,l as m,m as h,o as g,p as _,s as v,u as y,v as b,x,y as S}from"./phone-input-CidmOUk0.js";function C({member:e}){return(0,T.jsxs)(`span`,{className:`flex min-w-0 items-center gap-3`,children:[(0,T.jsx)(o,{size:`sm`,"aria-label":e.label,children:(0,T.jsx)(a,{children:e.initials})}),(0,T.jsxs)(`span`,{className:`grid min-w-0 gap-1`,children:[(0,T.jsx)(`span`,{children:e.label}),(0,T.jsx)(`span`,{className:`text-sm text-muted-foreground`,children:e.role})]})]})}function w({locked:e=!1}){let t=x(),[n,r]=(0,E.useState)(e?[j[0],j[1]]:[j[0]]);return(0,T.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,T.jsxs)(c,{multiple:!0,autoHighlight:!0,items:j,itemToStringLabel:e=>e.label,itemToStringValue:e=>e.id,value:n,onValueChange:e=>r(e),children:[(0,T.jsx)(p,{children:`Consultation care team`}),(0,T.jsx)(v,{ref:t,children:(0,T.jsx)(S,{children:t=>(0,T.jsxs)(E.Fragment,{children:[t.map(t=>(0,T.jsx)(g,{removable:!e||!t.locked,removeLabel:`Remove ${t.label} from the consultation care team`,children:t.label},t.id)),(0,T.jsx)(l,{placeholder:`Add an authorised clinician`})]})})}),(0,T.jsxs)(m,{anchor:t,children:[(0,T.jsx)(y,{children:`No authorised clinicians match this search.`}),(0,T.jsx)(f,{children:e=>(0,T.jsx)(h,{value:e,children:(0,T.jsx)(C,{member:e})},e.id)})]})]})})}var T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V;t((()=>{T=r(),E=e(n()),i(),{expect:D,userEvent:O,waitFor:k,within:A}=__STORYBOOK_MODULE_TEST__,j=[{id:`nguyen-minh`,label:`BS. Nguyễn Minh Khôi`,role:`Bác sĩ điều trị · Phòng khám Nguyễn Trãi`,initials:`MK`,group:`Primary care`},{id:`tran-linh`,label:`BS. Trần Linh Chi`,role:`Bác sĩ phụ trách · Theo dõi sau xét nghiệm`,initials:`LC`,group:`Primary care`,locked:!0},{id:`le-huong`,label:`BS. Lê Hương Giang`,role:`Nội tiết · Hội chẩn tăng đường huyết`,initials:`HG`,group:`Specialist review`},{id:`pham-anh`,label:`BS. Phạm Anh Dũng`,role:`Tim mạch · Rà soát huyết áp và thuốc`,initials:`AD`,group:`Specialist review`}],M={title:`Design System/Components/Combobox`,component:c,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,hierarchy:`Component`,evidence:`Autocomplete already owns authoritative single-record selection. Combobox adds only the distinct searchable multi-selection, grouped options, removable/locked chips, and controlled selected-value contract documented in docs/intake/reui-combobox-command-context-menu-intake.md.`},source:{vendor:`ReUI`,registryItem:`@reui/combobox — 28-example component family`,sourceUrl:`https://reui.io/components/combobox`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-popover`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`fluid-field-with-contained-collision-safe-popup`},useCase:{role:`Doctor, receptionist, or workspace administrator`,primaryTask:`Choose one or several values from a workflow-authorised, searchable set.`,primaryAction:`Select or remove an explicitly permitted value.`,dataModel:`Parent-owned option records, selected value(s), validation state, and mutation handler. Free text is never submitted as an identifier.`,safety:`Use Autocomplete for a single authoritative record. The feature must disclose locked selections, pre-filter unauthorised options, and confirm any consequential follow-on action.`},mobile:{primaryTask:`Search and select values without losing the current selection or field error.`,minimumUsableWidth:`320px`,strategy:[`FLUID`,`WRAPPING`,`SCROLLING`],behavior:`Chips wrap, disclosure and removal controls keep 44px targets, and the popup stays within the visual viewport with contained scrolling.`},exclusions:[`User-created and invisible tags require feature-owned validation, moderation, audit, and permission rules.`,`Date picker, status, priority, lead, team, and assignee demos are domain compositions; use Calendar, Select, Autocomplete, or the owning feature alongside this primitive.`,`Remote paging, cancellation, freshness, and result limits belong to the data-owning feature rather than a client-only listbox primitive.`]},docs:{description:{component:`Use for a searchable controlled selection when the workflow permits multiple values or needs visible selected chips. Do not use it to create unsanctioned labels or to hide an important comparison set.`}}}},N={render:()=>(0,T.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,T.jsxs)(c,{items:j,itemToStringLabel:e=>e.label,itemToStringValue:e=>e.id,children:[(0,T.jsx)(p,{children:`Assign care lead`}),(0,T.jsx)(_,{clearLabel:`Clear selected care lead`,placeholder:`Search clinician by name or role`,showClear:!0}),(0,T.jsxs)(m,{children:[(0,T.jsx)(y,{children:`No authorised clinicians match this search.`}),(0,T.jsx)(f,{children:e=>(0,T.jsx)(h,{value:e,children:(0,T.jsx)(C,{member:e})},e.id)})]})]})}),play:async({canvasElement:e})=>{let t=A(e).getByRole(`combobox`,{name:`Assign care lead`});await O.click(t);let n=await A(e.ownerDocument.body).findByRole(`option`,{name:/Nguyễn Minh Khôi/i});await k(()=>D(n).toBeVisible());let r=e.querySelector(`[data-slot='combobox-input-control']`),i=n.closest(`[data-slot='combobox-content']`);await k(()=>D(Math.round(i?.getBoundingClientRect().width??0)).toBe(Math.round(r?.getBoundingClientRect().width??0))),await O.keyboard(`{ArrowDown}{Enter}`),await D(t).toHaveValue(`BS. Nguyễn Minh Khôi`)}},P={render:()=>(0,T.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,T.jsxs)(c,{autoHighlight:!0,defaultOpen:!0,children:[(0,T.jsx)(p,{children:`Add reviewer`}),(0,T.jsx)(_,{placeholder:`Search the authorised care team`}),(0,T.jsxs)(m,{children:[(0,T.jsx)(y,{children:`No reviewer matches this search.`}),(0,T.jsxs)(f,{children:[(0,T.jsxs)(u,{children:[(0,T.jsx)(d,{children:`Primary care`}),j.filter(e=>e.group===`Primary care`).map(e=>(0,T.jsx)(h,{value:e,children:(0,T.jsx)(C,{member:e})},e.id))]}),(0,T.jsx)(s,{}),(0,T.jsxs)(u,{children:[(0,T.jsx)(d,{children:`Specialist review`}),j.filter(e=>e.group===`Specialist review`).map(e=>(0,T.jsx)(h,{value:e,children:(0,T.jsx)(C,{member:e})},e.id))]})]})]})]})})},F={render:()=>(0,T.jsx)(w,{})},I={render:()=>(0,T.jsx)(w,{locked:!0})},L={render:()=>(0,T.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,T.jsxs)(c,{disabled:!0,defaultValue:j[1],itemToStringLabel:e=>e.label,children:[(0,T.jsx)(p,{children:`Required supervising clinician`}),(0,T.jsx)(_,{"aria-invalid":`true`,"aria-describedby":`supervisor-selection-error`,placeholder:`Search authorised supervisors`}),(0,T.jsx)(b,{id:`supervisor-selection-error`,role:`alert`,children:`Your workspace does not permit changing the supervising clinician after review has started.`})]})})},R={render:()=>(0,T.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,T.jsxs)(c,{defaultOpen:!0,children:[(0,T.jsx)(p,{children:`Find an external referral destination`}),(0,T.jsx)(_,{placeholder:`Search authorised referral destinations`}),(0,T.jsxs)(m,{children:[(0,T.jsx)(b,{children:`Checking the current referral directory…`}),(0,T.jsx)(y,{children:`No permitted referral destinations are available. Retry after the directory syncs.`})]})]})})},z={render:()=>(0,T.jsx)(`div`,{className:`w-full max-w-sm`,children:(0,T.jsxs)(c,{defaultOpen:!0,items:j,itemToStringLabel:e=>e.label,children:[(0,T.jsx)(p,{children:`Request specialist review`}),(0,T.jsx)(_,{placeholder:`Search specialist reviewers`,triggerLabel:`Show specialist reviewers`}),(0,T.jsxs)(m,{children:[(0,T.jsx)(y,{children:`No specialist reviewer matches this search.`}),(0,T.jsx)(f,{children:e=>(0,T.jsx)(h,{value:e,children:(0,T.jsx)(C,{member:e})},e.id)})]})]})})},B={parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,T.jsx)(`div`,{className:`w-full`,children:(0,T.jsxs)(c,{defaultOpen:!0,children:[(0,T.jsx)(p,{children:`Chọn nhóm hội chẩn theo dõi sau xét nghiệm bất thường`}),(0,T.jsx)(_,{placeholder:`Tìm bác sĩ theo chuyên khoa, cơ sở hoặc vai trò theo dõi`}),(0,T.jsxs)(m,{children:[(0,T.jsxs)(f,{children:[(0,T.jsx)(h,{value:`long-care-team`,children:`Nhóm Nội tiết và Tim mạch – theo dõi tăng đường huyết, huyết áp, và điều chỉnh thuốc sau khi người bệnh xác nhận lịch hẹn.`}),(0,T.jsx)(h,{value:`read-only-team`,disabled:!0,children:`Nhóm đang bị giới hạn quyền chỉnh sửa do hồ sơ đã chuyển sang trạng thái chờ hội chẩn cấp cao hơn.`})]}),(0,T.jsx)(y,{children:`Không có nhóm hội chẩn phù hợp.`})]})]})})},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-sm">
      <Combobox<CareMember> items={careMembers} itemToStringLabel={member => member.label} itemToStringValue={member => member.id}>
        <ComboboxLabel>Assign care lead</ComboboxLabel>
        <ComboboxInput clearLabel="Clear selected care lead" placeholder="Search clinician by name or role" showClear />
        <ComboboxContent>
          <ComboboxEmpty>No authorised clinicians match this search.</ComboboxEmpty>
          <ComboboxList>
            {(member: CareMember) => <ComboboxItem key={member.id} value={member}>
                <CareMemberItem member={member} />
              </ComboboxItem>}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox', {
      name: 'Assign care lead'
    });
    await userEvent.click(input);
    const body = within(canvasElement.ownerDocument.body);
    const firstOption = await body.findByRole('option', {
      name: /Nguyễn Minh Khôi/i
    });
    await waitFor(() => expect(firstOption).toBeVisible());
    const control = canvasElement.querySelector<HTMLElement>("[data-slot='combobox-input-control']");
    const popup = firstOption.closest<HTMLElement>("[data-slot='combobox-content']");
    await waitFor(() => expect(Math.round(popup?.getBoundingClientRect().width ?? 0)).toBe(Math.round(control?.getBoundingClientRect().width ?? 0)));
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await expect(input).toHaveValue('BS. Nguyễn Minh Khôi');
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-sm">
      <Combobox<CareMember> autoHighlight defaultOpen>
        <ComboboxLabel>Add reviewer</ComboboxLabel>
        <ComboboxInput placeholder="Search the authorised care team" />
        <ComboboxContent>
          <ComboboxEmpty>No reviewer matches this search.</ComboboxEmpty>
          <ComboboxList>
            <ComboboxGroup>
              <ComboboxGroupLabel>Primary care</ComboboxGroupLabel>
              {careMembers.filter(member => member.group === 'Primary care').map(member => <ComboboxItem key={member.id} value={member}>
                  <CareMemberItem member={member} />
                </ComboboxItem>)}
            </ComboboxGroup>
            <ComboboxSeparator />
            <ComboboxGroup>
              <ComboboxGroupLabel>Specialist review</ComboboxGroupLabel>
              {careMembers.filter(member => member.group === 'Specialist review').map(member => <ComboboxItem key={member.id} value={member}>
                  <CareMemberItem member={member} />
                </ComboboxItem>)}
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <MultiSelectExample />
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <MultiSelectExample locked />
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-sm">
      <Combobox<CareMember> disabled defaultValue={careMembers[1]} itemToStringLabel={member => member.label}>
        <ComboboxLabel>Required supervising clinician</ComboboxLabel>
        <ComboboxInput aria-invalid="true" aria-describedby="supervisor-selection-error" placeholder="Search authorised supervisors" />
        <ComboboxStatus id="supervisor-selection-error" role="alert">
          Your workspace does not permit changing the supervising clinician after review has started.
        </ComboboxStatus>
      </Combobox>
    </div>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-sm">
      <Combobox defaultOpen>
        <ComboboxLabel>Find an external referral destination</ComboboxLabel>
        <ComboboxInput placeholder="Search authorised referral destinations" />
        <ComboboxContent>
          <ComboboxStatus>Checking the current referral directory…</ComboboxStatus>
          <ComboboxEmpty>No permitted referral destinations are available. Retry after the directory syncs.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    </div>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-sm">
      <Combobox<CareMember> defaultOpen items={careMembers} itemToStringLabel={member => member.label}>
        <ComboboxLabel>Request specialist review</ComboboxLabel>
        <ComboboxInput placeholder="Search specialist reviewers" triggerLabel="Show specialist reviewers" />
        <ComboboxContent>
          <ComboboxEmpty>No specialist reviewer matches this search.</ComboboxEmpty>
          <ComboboxList>
            {(member: CareMember) => <ComboboxItem key={member.id} value={member}>
                <CareMemberItem member={member} />
              </ComboboxItem>}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <div className="w-full">
      <Combobox defaultOpen>
        <ComboboxLabel>Chọn nhóm hội chẩn theo dõi sau xét nghiệm bất thường</ComboboxLabel>
        <ComboboxInput placeholder="Tìm bác sĩ theo chuyên khoa, cơ sở hoặc vai trò theo dõi" />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxItem value="long-care-team">
              Nhóm Nội tiết và Tim mạch – theo dõi tăng đường huyết, huyết áp, và điều chỉnh thuốc sau khi người bệnh xác nhận lịch hẹn.
            </ComboboxItem>
            <ComboboxItem value="read-only-team" disabled>
              Nhóm đang bị giới hạn quyền chỉnh sửa do hồ sơ đã chuyển sang trạng thái chờ hội chẩn cấp cao hơn.
            </ComboboxItem>
          </ComboboxList>
          <ComboboxEmpty>Không có nhóm hội chẩn phù hợp.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    </div>
}`,...B.parameters?.docs?.source}}},V=[`Default`,`GroupedAndAutoHighlighted`,`MultiSelect`,`LockedSelections`,`InvalidAndPermissionLimited`,`LoadingAndEmpty`,`CustomResultRendering`,`LongContentMobile`]}))();export{z as CustomResultRendering,N as Default,P as GroupedAndAutoHighlighted,L as InvalidAndPermissionLimited,R as LoadingAndEmpty,I as LockedSelections,B as LongContentMobile,F as MultiSelect,V as __namedExportsOrder,M as default};