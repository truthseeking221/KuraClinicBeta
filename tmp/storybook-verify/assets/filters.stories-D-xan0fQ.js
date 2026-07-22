import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{V as i}from"./provider-marks-BeHzyBjc.js";import{t as a}from"./ui-C9kmmzkH.js";import{t as o}from"./button-B6_zsN5-.js";import{t as s}from"./segmented-toggle-DDpNscFF.js";import{n as c,r as l,t as u}from"./filters-DETEkepG.js";function d({allowMultiple:e=!0,customFields:t=y,initialFilters:n=[],i18n:r,size:i=`default`,trigger:a}){let[o,s]=(0,h.useState)(n);return(0,m.jsx)(u,{allowMultiple:e,fields:t,filters:o,i18n:r,onChange:s,size:i,trigger:a})}function f(){let[e,t]=(0,h.useState)(!1),[n,r]=(0,h.useState)([]);return(0,h.useEffect)(()=>{let e=window.setTimeout(()=>t(!0),450);return()=>window.clearTimeout(e)},[]),(0,m.jsx)(u,{fields:[{key:`collector`,label:`Assigned collector`,type:`select`,options:e?[{value:`dara`,label:`Dara N.`},{value:`sokha`,label:`Sokha P.`}]:[]}],filters:n,onChange:r})}function p(){let[e,t]=(0,h.useState)([]),n=e.length?[{id:`owner-status`,field:`status`,operator:`is_any_of`,values:e}]:[];return(0,m.jsx)(u,{allowMultiple:!1,fields:y,filters:n,onChange:e=>t(e.find(e=>e.field===`status`)?.values??[])})}var m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R;t((()=>{m=r(),h=e(n()),a(),l(),{expect:g,userEvent:_,within:v}=__STORYBOOK_MODULE_TEST__,y=[{key:`patient`,label:`Patient or booking`,type:`text`,placeholder:`Name, phone, or booking code`,operators:[{value:`contains`,label:`contains`},{value:`starts_with`,label:`starts with`},{value:`is`,label:`is exactly`},{value:`empty`,label:`is empty`}]},{key:`status`,label:`Visit status`,type:`multiselect`,maxSelections:3,options:[{value:`waiting`,label:`Waiting`},{value:`in-progress`,label:`In progress`},{value:`complete`,label:`Complete`}]},{key:`clinic`,label:`Clinic`,type:`select`,options:[{value:`phnom-penh`,label:`Phnom Penh Central`},{value:`siem-reap`,label:`Siem Reap Riverside`}]},{type:`separator`},{key:`priority`,label:`Queue priority`,type:`custom`,customRenderer:({onChange:e,values:t})=>(0,m.jsx)(s,{label:`Queue priority`,onValueChange:t=>e(t?[t]:[]),options:[{value:`routine`,label:`Routine`},{value:`urgent`,label:`Urgent`}],value:t[0]??``}),customValueRenderer:e=>e[0]??`Select…`}],b={addFilter:`Bộ lọc`,addFilterTitle:`Thêm bộ lọc`,back:`Quay lại`,noFieldsFound:`Không tìm thấy bộ lọc.`,noResultsFound:`Không có kết quả.`,searchFields:`Lọc…`,select:`Chọn…`,selectedCount:`đã chọn`,removeFilter:e=>`Bỏ bộ lọc ${e}`,operators:{contains:`chứa`,is:`là`,isAnyOf:`là một trong`,isNot:`không là`},placeholders:{enterField:e=>`Nhập ${e.toLowerCase()}…`,searchField:e=>`Tìm ${e.toLowerCase()}…`}},x={title:`Design System/Patterns/Filters`,component:u,tags:[`autodocs`,`source-reui`,`adapted-kura`],args:{fields:y,filters:[],onChange:()=>void 0},parameters:{layout:`padded`,kura:{source:{vendor:`ReUI`,registryItem:`filters`,familySize:9},intake:{decision:`REPLACE`,owner:`src/components/shared/filters`,evidence:`The former shared pattern was a permanently expanded grid of typed inputs and had no product consumers. It could not be extended into ReUI’s controlled Filter[] query-builder contract without preserving a conflicting interaction model.`},useCase:{primaryTask:`Build, inspect, revise, and remove an explicit set of reversible list or table constraints.`,ownership:`Generic shared pattern only. A route or feature owns URL state, API serialization, permissions, validation policy, and domain action consequences.`,backendCompatibility:`No business action, persistence claim, or backend-owned status is introduced.`},family:[`field and value selection`,`operator editing`,`text and custom values`,`sizes and custom trigger`,`async option replacement`,`controlled DataGrid mapping`,`internationalisation`,`keyboard shortcut`,`mobile and long-content containment`],exclusions:[{capability:`Automatic nuqs URL persistence and Zod route schemas`,reason:`A generic visual pattern cannot invent route parameter names or validation contracts. The owning feature may compose those adapters around the controlled Filter[] value.`}],binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura-control`,elevation:`kura-popover`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`wrapping chip row; viewport-contained, scrollable popovers; full-width trigger and chips at narrow widths`}}}},S={render:()=>(0,m.jsx)(d,{}),play:async({canvasElement:e})=>{let t=v(e);await _.click(t.getByRole(`button`,{name:`Filter`}));let n=v(document.body);await _.click(n.getByRole(`option`,{name:`Visit status`})),await _.click(n.getByRole(`checkbox`,{name:`Waiting`})),await g(t.getByRole(`group`,{name:`Visit status filter`})).toBeVisible()}},C={render:()=>(0,m.jsx)(d,{initialFilters:[c(`patient`,`contains`,[`Sophea`])]}),play:async({canvasElement:e})=>{let t=v(e);await _.click(t.getByRole(`button`,{name:`Change Patient or booking operator`})),await _.click(v(document.body).getByRole(`option`,{name:`starts with`})),await g(t.getByRole(`button`,{name:`Change Patient or booking operator`})).toHaveTextContent(`starts with`)}},w={render:()=>(0,m.jsx)(d,{trigger:(0,m.jsx)(o,{leadingIcon:(0,m.jsx)(i,{"aria-hidden":`true`}),children:`Refine visit list`})})},T={render:()=>(0,m.jsx)(d,{initialFilters:[c(`clinic`,`is`,[`phnom-penh`])],size:`compact`})},E={render:()=>(0,m.jsx)(d,{initialFilters:[c(`clinic`,`is`,[`phnom-penh`])],size:`sm`})},D={render:()=>(0,m.jsx)(d,{initialFilters:[c(`clinic`,`is`,[`phnom-penh`])],size:`default`})},O={render:()=>(0,m.jsx)(d,{initialFilters:[c(`clinic`,`is`,[`phnom-penh`])],size:`lg`})},k={render:()=>(0,m.jsx)(d,{initialFilters:[c(`priority`,`is`,[`urgent`])]})},A={render:()=>(0,m.jsx)(f,{}),parameters:{docs:{description:{story:`The owner can replace a field’s controlled options when its permitted source becomes available; this pattern does not fetch or claim data itself.`}}}},j={render:()=>(0,m.jsx)(d,{initialFilters:[c(`status`,`is_any_of`,[`waiting`])]}),parameters:{docs:{description:{story:`The controlled Filter[] value can be mapped by an owning feature to TanStack column filters or a contract-backed request. This component never serializes medical or operational data itself.`}}}},M={render:()=>(0,m.jsx)(d,{i18n:b})},N={render:()=>{let[e,t]=(0,h.useState)([]);return(0,m.jsx)(u,{enableShortcut:!0,fields:y,filters:e,onChange:t,shortcutKey:`f`,shortcutLabel:`F`})}},P={render:()=>(0,m.jsx)(d,{allowMultiple:!1,initialFilters:[c(`clinic`,`is`,[`phnom-penh`])]}),play:async({canvasElement:e})=>{let t=v(e);await _.click(t.getByRole(`button`,{name:`Filter`}));let n=v(document.body);await _.click(n.getByRole(`option`,{name:`Clinic`})),await g(n.getByRole(`checkbox`,{name:`Phnom Penh Central`})).toBeChecked(),await _.click(n.getByRole(`checkbox`,{name:`Siem Reap Riverside`})),await g(t.getByRole(`group`,{name:`Clinic filter`})).toHaveTextContent(`Siem Reap Riverside`),await g(t.getAllByRole(`group`,{name:`Clinic filter`})).toHaveLength(1)},parameters:{docs:{description:{story:`With one filter per field, the trigger reopens the existing filter for editing instead of dead-ending on an empty field menu.`}}}},F={render:()=>(0,m.jsx)(p,{}),play:async({canvasElement:e})=>{let t=v(e);await _.click(t.getByRole(`button`,{name:`Filter`}));let n=v(document.body);await _.click(n.getByRole(`option`,{name:`Visit status`})),await _.click(n.getByRole(`checkbox`,{name:`Waiting`})),await _.click(n.getByRole(`checkbox`,{name:`In progress`})),await g(t.getByRole(`group`,{name:`Visit status filter`})).toHaveTextContent(`2 selected`)},parameters:{docs:{description:{story:`Regression: an owner that rebuilds Filter objects with its own ids on every change must not lose in-session multiselect picks or render stale checkbox states.`}}}},I={render:()=>(0,m.jsx)(d,{}),parameters:{viewport:{defaultViewport:`mobile1`}}},L={render:()=>(0,m.jsx)(d,{customFields:[{key:`clinic`,label:`Clinic workspace with a long translated operational name`,type:`select`,options:[{value:`community-diagnostics`,label:`Kura Phnom Penh Central Clinic and Extended Community Diagnostics Collection Centre`}]}],initialFilters:[c(`clinic`,`is`,[`community-diagnostics`])]}),parameters:{viewport:{defaultViewport:`mobile1`}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <FilterDemo />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Filter'
    }));
    const overlay = within(document.body);
    await userEvent.click(overlay.getByRole('option', {
      name: 'Visit status'
    }));
    await userEvent.click(overlay.getByRole('checkbox', {
      name: 'Waiting'
    }));
    await expect(canvas.getByRole('group', {
      name: 'Visit status filter'
    })).toBeVisible();
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <FilterDemo initialFilters={[createFilter('patient', 'contains', ['Sophea'])]} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Change Patient or booking operator'
    }));
    await userEvent.click(within(document.body).getByRole('option', {
      name: 'starts with'
    }));
    await expect(canvas.getByRole('button', {
      name: 'Change Patient or booking operator'
    })).toHaveTextContent('starts with');
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <FilterDemo trigger={<Button leadingIcon={<FilterIcon aria-hidden="true" />}>Refine visit list</Button>} />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <FilterDemo initialFilters={[createFilter('clinic', 'is', ['phnom-penh'])]} size="compact" />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <FilterDemo initialFilters={[createFilter('clinic', 'is', ['phnom-penh'])]} size="sm" />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <FilterDemo initialFilters={[createFilter('clinic', 'is', ['phnom-penh'])]} size="default" />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <FilterDemo initialFilters={[createFilter('clinic', 'is', ['phnom-penh'])]} size="lg" />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <FilterDemo initialFilters={[createFilter('priority', 'is', ['urgent'])]} />
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <AsyncOptionsDemo />,
  parameters: {
    docs: {
      description: {
        story: 'The owner can replace a field’s controlled options when its permitted source becomes available; this pattern does not fetch or claim data itself.'
      }
    }
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <FilterDemo initialFilters={[createFilter('status', 'is_any_of', ['waiting'])]} />,
  parameters: {
    docs: {
      description: {
        story: 'The controlled Filter[] value can be mapped by an owning feature to TanStack column filters or a contract-backed request. This component never serializes medical or operational data itself.'
      }
    }
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <FilterDemo i18n={vietnamese} />
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [activeFilters, setActiveFilters] = useState<Filter<string>[]>([]);
    return <Filters enableShortcut fields={fields} filters={activeFilters} onChange={setActiveFilters} shortcutKey="f" shortcutLabel="F" />;
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <FilterDemo allowMultiple={false} initialFilters={[createFilter('clinic', 'is', ['phnom-penh'])]} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Filter'
    }));
    const overlay = within(document.body);
    await userEvent.click(overlay.getByRole('option', {
      name: 'Clinic'
    }));
    await expect(overlay.getByRole('checkbox', {
      name: 'Phnom Penh Central'
    })).toBeChecked();
    await userEvent.click(overlay.getByRole('checkbox', {
      name: 'Siem Reap Riverside'
    }));
    await expect(canvas.getByRole('group', {
      name: 'Clinic filter'
    })).toHaveTextContent('Siem Reap Riverside');
    await expect(canvas.getAllByRole('group', {
      name: 'Clinic filter'
    })).toHaveLength(1);
  },
  parameters: {
    docs: {
      description: {
        story: 'With one filter per field, the trigger reopens the existing filter for editing instead of dead-ending on an empty field menu.'
      }
    }
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <RewritingOwnerDemo />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Filter'
    }));
    const overlay = within(document.body);
    await userEvent.click(overlay.getByRole('option', {
      name: 'Visit status'
    }));
    await userEvent.click(overlay.getByRole('checkbox', {
      name: 'Waiting'
    }));
    await userEvent.click(overlay.getByRole('checkbox', {
      name: 'In progress'
    }));
    await expect(canvas.getByRole('group', {
      name: 'Visit status filter'
    })).toHaveTextContent('2 selected');
  },
  parameters: {
    docs: {
      description: {
        story: 'Regression: an owner that rebuilds Filter objects with its own ids on every change must not lose in-session multiselect picks or render stale checkbox states.'
      }
    }
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <FilterDemo />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <FilterDemo customFields={[{
    key: 'clinic',
    label: 'Clinic workspace with a long translated operational name',
    type: 'select',
    options: [{
      value: 'community-diagnostics',
      label: 'Kura Phnom Penh Central Clinic and Extended Community Diagnostics Collection Centre'
    }]
  }]} initialFilters={[createFilter('clinic', 'is', ['community-diagnostics'])]} />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...L.parameters?.docs?.source}}},R=[`VariousFieldTypes`,`OperatorEditing`,`CustomTrigger`,`CompactControls`,`SmallControls`,`DefaultControls`,`LargeControls`,`CustomControl`,`AsyncOptions`,`DataGridControlled`,`Vietnamese`,`KeyboardShortcut`,`SingleFilterPerField`,`ControlledOwnerRewritesIds`,`MobileInteractive`,`LongContent`]}))();export{A as AsyncOptions,T as CompactControls,F as ControlledOwnerRewritesIds,k as CustomControl,w as CustomTrigger,j as DataGridControlled,D as DefaultControls,N as KeyboardShortcut,O as LargeControls,L as LongContent,I as MobileInteractive,C as OperatorEditing,P as SingleFilterPerField,E as SmallControls,S as VariousFieldTypes,M as Vietnamese,R as __namedExportsOrder,x as default};