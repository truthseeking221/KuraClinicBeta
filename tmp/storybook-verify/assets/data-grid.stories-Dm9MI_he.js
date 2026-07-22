import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{C as ee,Et as i,N as a,o as te}from"./provider-marks-BeHzyBjc.js";import{t as o}from"./icons-C5MW4nvJ.js";import{An as ne,Cn as s,Dn as c,En as l,On as u,_n as re,bn as d,gn as f,hn as ie,kn as ae,mn as p,pn as m,t as h,vn as g,wn as _,xn as v,yn as y}from"./ui-C9kmmzkH.js";import{i as b,n as x,r as S,t as C}from"./alert-l7nmjmGJ.js";import{t as w}from"./button-B6_zsN5-.js";import{a as oe}from"./collapsible-Cfc9M9oP.js";import{t as se}from"./input-UaJWx_9h.js";import{a as ce,i as le,o as ue,r as T,t as de}from"./empty-state-DlAvBIIY.js";import{t as E}from"./shared-GnDiMTI0.js";function D({data:e=P,error:t=!1,expandable:n=!1,layout:r,loading:o=!1,pinnedColumns:s=!1,pinnedRows:f=!1,scrollHeight:h,selectable:E=!1,showPagination:D=!0,showToolbar:O=!1}){let[j,M]=(0,A.useState)([]),[N,I]=(0,A.useState)({}),[L,R]=(0,A.useState)(``),[z,B]=(0,A.useState)({pageIndex:0,pageSize:5});return(0,k.jsxs)(m,{table:_({columns:(0,A.useMemo)(()=>{let e=[];return E&&e.push({id:`select`,size:56,enableHiding:!1,enableSorting:!1,header:({table:e})=>(0,k.jsx)(g,{table:e}),cell:({row:e})=>(0,k.jsx)(y,{label:`Select booking ${e.original.code}`,row:e})}),n&&e.push({id:`expand`,size:56,enableHiding:!1,enableSorting:!1,header:`Details`,cell:({row:e})=>(0,k.jsx)(w,{"aria-label":`${e.getIsExpanded()?`Hide`:`Show`} details for ${e.original.code}`,size:`icon-sm`,variant:`ghost`,onClick:()=>e.toggleExpanded(),children:(0,k.jsx)(ee,{"aria-hidden":`true`,className:e.getIsExpanded()?`rotate-180`:void 0})})}),e.push({accessorKey:`code`,size:128,header:({column:e})=>(0,k.jsx)(p,{column:e,title:`Booking`}),meta:{headerTitle:`Booking`}},{accessorKey:`patient`,size:220,header:({column:e})=>(0,k.jsx)(p,{column:e,title:`Patient`}),meta:{headerTitle:`Patient`,expandedContent:e=>(0,k.jsxs)(`div`,{className:`grid gap-2 sm:grid-cols-3`,children:[(0,k.jsxs)(`span`,{children:[(0,k.jsx)(`strong`,{children:`Branch:`}),` `,e.branch]}),(0,k.jsxs)(`span`,{children:[(0,k.jsx)(`strong`,{children:`Last update:`}),` `,e.updatedAt]}),(0,k.jsxs)(`span`,{children:[(0,k.jsx)(`strong`,{children:`Record ID:`}),` `,e.id]})]})}},{accessorKey:`tests`,size:88,header:({column:e})=>(0,k.jsx)(p,{column:e,title:`Tests`}),footer:({table:e})=>`${e.getFilteredRowModel().rows.reduce((e,t)=>e+t.original.tests,0)} tests`,meta:{headerTitle:`Tests`,numeric:!0}},{accessorKey:`due`,size:112,header:({column:e})=>(0,k.jsx)(p,{column:e,title:`Due`}),cell:({getValue:e})=>`$${e().toFixed(2)}`,footer:({table:e})=>`$${e.getFilteredRowModel().rows.reduce((e,t)=>e+t.original.due,0).toFixed(2)}`,meta:{headerTitle:`Due`,numeric:!0}},{accessorKey:`branch`,size:140,header:({column:e})=>(0,k.jsx)(p,{column:e,title:`Branch`}),meta:{headerTitle:`Branch`}},{accessorKey:`updatedAt`,size:104,header:({column:e})=>(0,k.jsx)(p,{column:e,title:`Updated`}),meta:{headerTitle:`Updated`,numeric:!0}},{accessorKey:`status`,size:144,header:({column:e})=>(0,k.jsx)(p,{column:e,title:`Status`}),cell:({getValue:e})=>{let t=e();return(0,k.jsx)(oe,{variant:F[t],children:t})},meta:{headerTitle:`Status`}}),e},[n,E]),data:e,enableColumnResizing:!!r?.resizable,enableRowSelection:E,getCoreRowModel:l(),getExpandedRowModel:c(),getFilteredRowModel:u(),getPaginationRowModel:ae(),getRowCanExpand:()=>n,getRowId:e=>e.id,getSortedRowModel:ne(),initialState:{...s?{columnPinning:{left:E?[`select`,`code`]:[`code`],right:[`status`]}}:{},...f?{rowPinning:{top:[`4`],bottom:[`3`]}}:{}},onGlobalFilterChange:R,onPaginationChange:B,onRowSelectionChange:I,onSortingChange:M,state:{globalFilter:L,pagination:z,rowSelection:N,sorting:j}}),recordCount:e.length,isLoading:o,layout:{...r,rowsPinnable:f},errorState:t?(0,k.jsxs)(C,{icon:(0,k.jsx)(te,{"aria-hidden":`true`}),role:`alert`,tone:`danger`,children:[(0,k.jsx)(b,{children:`Bookings could not be loaded`}),(0,k.jsx)(S,{children:`Check the connection and retry. The current filters have been preserved.`}),(0,k.jsx)(x,{children:(0,k.jsx)(w,{leadingIcon:(0,k.jsx)(i,{"aria-hidden":`true`}),variant:`outline`,children:`Retry loading bookings`})})]}):void 0,emptyState:(0,k.jsx)(de,{children:(0,k.jsxs)(le,{children:[(0,k.jsx)(ce,{variant:`icon`,children:(0,k.jsx)(a,{"aria-hidden":`true`})}),(0,k.jsx)(ue,{children:`No bookings match this view`}),(0,k.jsx)(T,{children:`Remove a filter or choose another date range. This is not a loading state.`})]})}),children:[O?(0,k.jsxs)(v,{children:[(0,k.jsx)(se,{className:`w-full sm:max-w-sm`,label:`Search bookings`,placeholder:`Patient, booking, or branch`,value:L,onChange:e=>R(e.currentTarget.value)}),(0,k.jsx)(ie,{})]}):null,(0,k.jsx)(d,{"aria-label":`Front desk bookings`,scrollHeight:h}),D?(0,k.jsx)(re,{pageSizes:[5,10,25]}):null]})}function O(){let[e,t]=(0,A.useState)(5),n=P.slice(0,e);return(0,k.jsxs)(m,{table:_({columns:(0,A.useMemo)(()=>[{accessorKey:`code`,header:`Booking`,meta:{headerTitle:`Booking`}},{accessorKey:`patient`,header:`Patient`,meta:{headerTitle:`Patient`}},{accessorKey:`status`,header:`Status`,meta:{headerTitle:`Status`}}],[]),data:n,getCoreRowModel:l()}),recordCount:n.length,children:[(0,k.jsx)(d,{"aria-label":`Incrementally loaded bookings`}),(0,k.jsx)(f,{allRowsLoaded:e>=P.length,onLoadMore:()=>t(e=>Math.min(e+5,P.length))})]})}var k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$;t((()=>{k=r(),A=e(n()),s(),E(),h(),o(),{expect:j,userEvent:M,within:N}=__STORYBOOK_MODULE_TEST__,P=[{id:`1`,code:`FZ-48210`,patient:`Sokha Chan`,tests:3,due:24,status:`In progress`,branch:`Toul Kork`,updatedAt:`08:42`},{id:`2`,code:`KM-77031`,patient:`Lina Sroeun`,tests:1,due:8.5,status:`Waiting`,branch:`BKK1`,updatedAt:`08:47`},{id:`3`,code:`QT-90227`,patient:`Vibol Keo`,tests:5,due:61,status:`Done`,branch:`Toul Kork`,updatedAt:`08:51`},{id:`4`,code:`BD-11034`,patient:`Chanthou Meas`,tests:2,due:19.75,status:`Needs review`,branch:`Sen Sok`,updatedAt:`09:02`},{id:`5`,code:`RP-34811`,patient:`Dara Lim`,tests:4,due:42,status:`In progress`,branch:`BKK1`,updatedAt:`09:15`},{id:`6`,code:`NS-77452`,patient:`Sreyneang Touch`,tests:2,due:16.5,status:`Waiting`,branch:`Toul Kork`,updatedAt:`09:19`},{id:`7`,code:`VX-65220`,patient:`Rathana Nou`,tests:6,due:72,status:`Done`,branch:`Sen Sok`,updatedAt:`09:26`},{id:`8`,code:`KL-44129`,patient:`Bopha Kong`,tests:1,due:11,status:`Waiting`,branch:`BKK1`,updatedAt:`09:33`},{id:`9`,code:`CU-83017`,patient:`Sophea Heng`,tests:3,due:28.5,status:`Needs review`,branch:`Toul Kork`,updatedAt:`09:41`},{id:`10`,code:`LA-22308`,patient:`Pisey Chhim`,tests:2,due:18,status:`In progress`,branch:`Sen Sok`,updatedAt:`09:50`},{id:`11`,code:`TW-11908`,patient:`Sothea Vann`,tests:4,due:38.25,status:`Done`,branch:`BKK1`,updatedAt:`10:02`},{id:`12`,code:`MF-55291`,patient:`Kanika Ros`,tests:2,due:17,status:`Waiting`,branch:`Toul Kork`,updatedAt:`10:07`}],F={Waiting:`neutral`,"In progress":`info`,Done:`success`,"Needs review":`warning`},I={title:`Design System/Components/Data Grid`,component:D,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`padded`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`Table remains the light semantic owner for static operational rows. Data Grid adds TanStack-managed sorting, filtering, pagination, selection, expansion, visibility, resizing, pinning, loading, aggregates, and incremental loading without duplicating Table.`},source:{vendor:`Kura`,registryItem:`data-table`,visualReference:`Kura data-table`},binding:{colors:`kura-semantic`,typography:`kura + tabular numeric columns`,spacing:`kura-density-aware`,radius:`kura-card-surface`,elevation:`none; focus and selection rings only`,icons:`kura-canonical`,density:`default-compact-comfortable`,responsive:`SCROLLING for relationship-preserving wide data; STACKING toolbar and pagination`,motion:`loading-only, reduced-motion-safe`},retainedFamily:[`pagination`,`row/cell/no borders`,`dense and comfortable layouts`,`striped rows`,`auto/fixed layout`,`selection`,`expansion and nested composition`,`sortable columns`,`column resizing`,`sticky header`,`column visibility`,`loading skeleton`,`footer totals and aggregates`,`column and row pinning`,`local or remote incremental loading through DataGridLoadMore`],exclusions:[{upstreamExamples:`Movable or draggable columns and rows`,reason:`Drag order has domain consequences and needs an explicit keyboard reorder contract, persistence, permission, undo, and audit behavior. No current Kura owner proves that shared contract.`,replacement:`Feature-owned reorder pattern composed with Data Grid after a stable order model is approved.`},{upstreamExamples:`Inline CRUD demos`,reason:`CRUD validation, permissions, confirmation, optimistic updates, conflict recovery, and audit events belong to the owning feature.`,replacement:`Compose Data Grid with Dialog, AlertDialog, DropdownMenu, and feature commands.`},{upstreamExamples:`Automatic infinite scroll`,reason:`Automatic loading can move focus and obscure completion. Kura retains explicit incremental loading with announced status; the owning API controls cursor and retry behavior.`,replacement:`DataGridLoadMore`},{upstreamExample:`Virtualized rendering`,reason:`Virtualization changes screen-reader and dynamic-row-height behavior. It should be enabled only for a measured large-data consumer with a known row-height and accessibility contract.`,replacement:`Current grid supports bounded scrolling and pagination; add a dedicated virtual owner when a real dataset proves the need.`}]},docs:{description:{component:`A TanStack-powered data grid for interactive operational datasets. Use Table for static semantic rows. Keep identifiers and clinically necessary columns visible; wide relationships scroll inside the grid instead of converting automatically to cards.`}}}},L={render:()=>(0,k.jsx)(D,{}),play:async({canvasElement:e})=>{let t=N(e),n=t.getByRole(`button`,{name:/booking: not sorted/i});await M.click(n),await j(n).toHaveAccessibleName(/sorted ascending/i),await M.click(t.getByRole(`button`,{name:/go to next page/i})),await j(t.getByText(/6–10 of 12/i)).toBeVisible()}},R={render:()=>(0,k.jsx)(D,{showToolbar:!0}),play:async({canvasElement:e})=>{let t=N(e);await M.type(t.getByLabelText(/search bookings/i),`Sokha`),await j(t.getByText(`Sokha Chan`)).toBeVisible(),await j(t.queryByText(`Lina Sroeun`)).not.toBeInTheDocument()}},z={render:()=>(0,k.jsx)(D,{selectable:!0}),play:async({canvasElement:e})=>{let t=N(e).getByRole(`checkbox`,{name:/select booking fz-48210/i});await M.click(t),await j(t).toBeChecked()}},B={render:()=>(0,k.jsx)(D,{expandable:!0}),play:async({canvasElement:e})=>{let t=N(e);await M.click(t.getByRole(`button`,{name:/show details for fz-48210/i})),await j(t.getByText(/record id:/i)).toBeVisible()}},V={render:()=>(0,k.jsxs)(`div`,{className:`flex flex-col gap-8`,children:[(0,k.jsx)(D,{layout:{density:`compact`,borders:`cells`},showPagination:!1}),(0,k.jsx)(D,{layout:{striped:!0,borders:`none`},showPagination:!1}),(0,k.jsx)(D,{layout:{density:`comfortable`,width:`auto`},showPagination:!1})]})},H={render:()=>(0,k.jsx)(D,{pinnedColumns:!0,layout:{resizable:!0},showToolbar:!0})},U={render:()=>(0,k.jsx)(D,{pinnedRows:!0,layout:{stickyHeader:!0,density:`compact`},scrollHeight:`sm`,showPagination:!1})},W={render:()=>(0,k.jsx)(D,{loading:!0})},G={render:()=>(0,k.jsx)(D,{data:[]})},K={render:()=>(0,k.jsx)(D,{error:!0})},q={render:()=>(0,k.jsx)(D,{showPagination:!1})},J={render:()=>(0,k.jsx)(O,{}),play:async({canvasElement:e})=>{let t=N(e);await M.click(t.getByRole(`button`,{name:/load more records/i})),await j(t.getByText(`Pisey Chhim`)).toBeVisible()}},Y={render:()=>(0,k.jsx)(D,{data:[{...P[0],patient:`Sokha Chan — verified name with additional transliteration and a long clinic-provided identifier`,branch:`Toul Kork Diagnostic and Preventive Care Centre — Main Collection Floor`}],layout:{width:`auto`},showPagination:!1})},X={parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,k.jsx)(D,{selectable:!0,showToolbar:!0})},Z={render:()=>(0,k.jsx)(D,{showToolbar:!0})},Q={render:()=>(0,k.jsx)(D,{pinnedColumns:!0,showToolbar:!0})},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <BookingsGrid />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const bookingSort = canvas.getByRole('button', {
      name: /booking: not sorted/i
    });
    await userEvent.click(bookingSort);
    await expect(bookingSort).toHaveAccessibleName(/sorted ascending/i);
    await userEvent.click(canvas.getByRole('button', {
      name: /go to next page/i
    }));
    await expect(canvas.getByText(/6–10 of 12/i)).toBeVisible();
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <BookingsGrid showToolbar />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/search bookings/i), 'Sokha');
    await expect(canvas.getByText('Sokha Chan')).toBeVisible();
    await expect(canvas.queryByText('Lina Sroeun')).not.toBeInTheDocument();
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <BookingsGrid selectable />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const rowChoice = canvas.getByRole('checkbox', {
      name: /select booking fz-48210/i
    });
    await userEvent.click(rowChoice);
    await expect(rowChoice).toBeChecked();
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <BookingsGrid expandable />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: /show details for fz-48210/i
    }));
    await expect(canvas.getByText(/record id:/i)).toBeVisible();
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-8">
      <BookingsGrid layout={{
      density: 'compact',
      borders: 'cells'
    }} showPagination={false} />
      <BookingsGrid layout={{
      striped: true,
      borders: 'none'
    }} showPagination={false} />
      <BookingsGrid layout={{
      density: 'comfortable',
      width: 'auto'
    }} showPagination={false} />
    </div>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <BookingsGrid pinnedColumns layout={{
    resizable: true
  }} showToolbar />
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <BookingsGrid pinnedRows layout={{
    stickyHeader: true,
    density: 'compact'
  }} scrollHeight="sm" showPagination={false} />
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <BookingsGrid loading />
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <BookingsGrid data={[]} />
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <BookingsGrid error />
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <BookingsGrid showPagination={false} />
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <IncrementalBookings />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: /load more records/i
    }));
    await expect(canvas.getByText('Pisey Chhim')).toBeVisible();
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <BookingsGrid data={[{
    ...bookings[0],
    patient: 'Sokha Chan — verified name with additional transliteration and a long clinic-provided identifier',
    branch: 'Toul Kork Diagnostic and Preventive Care Centre — Main Collection Floor'
  }]} layout={{
    width: 'auto'
  }} showPagination={false} />
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <BookingsGrid selectable showToolbar />
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <BookingsGrid showToolbar />
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => <BookingsGrid pinnedColumns showToolbar />
}`,...Q.parameters?.docs?.source}}},$=[`PaginatedSortable`,`SearchAndColumnVisibility`,`RowSelection`,`ExpandableRows`,`LayoutVariants`,`ResizableAndPinnedColumns`,`StickyHeaderAndPinnedRows`,`Loading`,`Empty`,`ErrorRecovery`,`AggregateFooter`,`IncrementalLoading`,`LongContent`,`MobileOverflow`,`Tablet`,`Desktop`]}))();export{q as AggregateFooter,Q as Desktop,G as Empty,K as ErrorRecovery,B as ExpandableRows,J as IncrementalLoading,V as LayoutVariants,W as Loading,Y as LongContent,X as MobileOverflow,L as PaginatedSortable,H as ResizableAndPinnedColumns,z as RowSelection,R as SearchAndColumnVisibility,U as StickyHeaderAndPinnedRows,Z as Tablet,$ as __namedExportsOrder,I as default};