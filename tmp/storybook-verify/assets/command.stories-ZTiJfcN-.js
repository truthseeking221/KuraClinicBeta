import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{B as i,Et as a,Gt as o,Pt as s,ct as c,g as l,kt as u,o as d}from"./provider-marks-BeHzyBjc.js";import{$r as f,Qr as p,Rt as m,Xr as h,Zr as g,ai as _,ei as v,ii as y,ni as b,ri as x,t as ee,ti as S}from"./ui-C9kmmzkH.js";import{a as C,r as w}from"./skeleton-yGvKPj3C.js";import{t as T}from"./button-B6_zsN5-.js";var E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$;t((()=>{E=r(),D=e(n()),ee(),{expect:O,userEvent:k,waitFor:A,within:j}=__STORYBOOK_MODULE_TEST__,M={title:`Design System/Components/Command`,component:h,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`centered`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,hierarchy:`Component`,evidence:`Journey WQ-02 requires an authorised global search and command palette, while no canonical Command component exists. SearchInput is only the shell trigger specification and Autocomplete is a field-level single-record selector.`},source:{vendor:`ReUI`,registryItem:`@reui/command — 8-example component family`,sourceUrl:`https://reui.io/components/command`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-modal`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`desktop-modal-transforms-to-full-height-mobile-search-surface`},useCase:{role:`Doctor, with a feature-owned extension for other authorised clinic staff`,primaryTask:`Find an authorised patient, booking, or action without losing the current workspace context.`,primaryAction:`Open the exact authorised destination or start its owning action flow.`,dataModel:`The application shell supplies a permission-filtered command registry with stable IDs, labels, keywords, destinations, and handlers. Patient and booking records resolve through the reception doors only — exact phone (reception/patient/lookup-by-phone), exact booking code (reception/booking/by-code), and workspace recents (phone-gate/patients/recent). Free-text search exists server-side only for the lab catalog (clinic/lab/catalog); patient name/MRN text search has no backend by privacy design.`,safety:`Never send unauthorised patient, booking, or action data to the palette. Consequential actions begin their own confirmation and audit flow after selection.`},mobile:{primaryTask:`Search the same authorised registry by touch or keyboard.`,minimumUsableWidth:`320px`,strategy:[`TRANSFORMING`,`SCROLLING`],behavior:`The modal becomes a full-height search surface at narrow widths. The input is focused on open, items retain 44px targets, and Escape/backdrop safely restore focus.`},exclusions:[`The global ⌘K listener remains application-shell orchestration so it can avoid stealing input shortcuts and preserve the current feature context.`,`Any command that changes clinical, identity, access, or payment state must continue into a named feature-owned confirmation flow.`,`Search indexing, remote fetching, telemetry, result ranking, and permission filtering remain outside this presentation primitive.`]},docs:{description:{component:`A modal, keyboard-first command palette for an already-authorised registry. It is not an inline form filter and not a substitute for visible safety-critical actions. Record lookup follows the reception doors: exact phone, exact booking code, or workspace recents — patient name/MRN free-text search intentionally has no backend, so the palette never promises it.`}}}},N={render:()=>(0,E.jsx)(g,{defaultOpen:!0,title:`Search Kura`,description:`Search destinations authorised for this clinic workspace.`,children:(0,E.jsxs)(h,{label:`Global Kura search`,loop:!0,children:[(0,E.jsx)(v,{placeholder:`Search patient, booking, or action`}),(0,E.jsxs)(b,{children:[(0,E.jsx)(p,{children:`No authorised destination matches this search.`}),(0,E.jsxs)(f,{heading:`Open`,children:[(0,E.jsxs)(S,{value:`patient-pham-thi-lan`,keywords:[`patient`,`MRN-01482`,`Phạm Thị Lan`],children:[(0,E.jsx)(c,{"aria-hidden":`true`}),`Open patient record: Phạm Thị Lan`]}),(0,E.jsxs)(S,{value:`booking-bk-20491`,keywords:[`booking`,`BK-20491`,`appointment`],children:[(0,E.jsx)(l,{"aria-hidden":`true`}),`Open booking BK-20491`]})]})]})]})}),play:async({canvasElement:e})=>{let t=j(e.ownerDocument.body);await O(t.getByRole(`dialog`,{name:`Search Kura`})).toBeVisible();let n=t.getByPlaceholderText(`Search patient, booking, or action`);await O(n).toHaveFocus(),await k.type(n,`BK-20491`),await O(t.getByText(`Open booking BK-20491`)).toBeVisible()}},P={render:()=>(0,E.jsx)(g,{defaultOpen:!0,title:`Quick actions`,description:`Choose a non-destructive action or open its governed workflow.`,children:(0,E.jsxs)(h,{label:`Quick actions`,loop:!0,children:[(0,E.jsx)(v,{placeholder:`Search quick actions`}),(0,E.jsxs)(b,{children:[(0,E.jsx)(p,{children:`No action matches this search.`}),(0,E.jsxs)(f,{heading:`Create`,children:[(0,E.jsxs)(S,{value:`new-booking`,keywords:[`booking`,`appointment`,`create`],children:[(0,E.jsx)(l,{"aria-hidden":`true`}),`Start a new booking`,(0,E.jsx)(_,{children:(0,E.jsx)(m,{children:`⌘B`})})]}),(0,E.jsxs)(S,{value:`open-patient-search`,keywords:[`patient`,`find`,`search`],children:[(0,E.jsx)(o,{"aria-hidden":`true`}),`Search patient directory`,(0,E.jsx)(_,{children:(0,E.jsx)(m,{children:`⌘P`})})]})]})]})]})})},F={render:()=>(0,E.jsx)(g,{defaultOpen:!0,title:`Workspace navigation`,children:(0,E.jsxs)(h,{label:`Workspace navigation`,loop:!0,children:[(0,E.jsx)(v,{placeholder:`Search navigation and actions`}),(0,E.jsxs)(b,{children:[(0,E.jsx)(p,{children:`No authorised workspace destination matches.`}),(0,E.jsxs)(f,{heading:`Patients`,children:[(0,E.jsxs)(S,{value:`patient-directory`,children:[(0,E.jsx)(o,{"aria-hidden":`true`}),`Patient directory`]}),(0,E.jsxs)(S,{value:`new-patient`,children:[(0,E.jsx)(c,{"aria-hidden":`true`}),`Start governed patient intake`]})]}),(0,E.jsx)(y,{}),(0,E.jsxs)(f,{heading:`Worklists`,children:[(0,E.jsxs)(S,{value:`today-bookings`,children:[(0,E.jsx)(l,{"aria-hidden":`true`}),`Open today’s bookings`]}),(0,E.jsxs)(S,{value:`collection-worklist`,children:[(0,E.jsx)(i,{"aria-hidden":`true`}),`Collection draw worklist`]})]})]})]})})},I={render:()=>(0,E.jsx)(g,{defaultOpen:!0,title:`Search clinic workspace`,children:(0,E.jsxs)(h,{label:`Clinic workspace search`,loop:!0,children:[(0,E.jsx)(v,{placeholder:`Search the authorised workspace`}),(0,E.jsxs)(b,{children:[(0,E.jsx)(p,{children:`No authorised destination matches this search.`}),(0,E.jsx)(f,{heading:`Recent`,children:(0,E.jsxs)(S,{value:`recent-patient`,children:[(0,E.jsx)(c,{"aria-hidden":`true`}),`Patient record: Nguyễn Thị Ánh`]})}),(0,E.jsx)(f,{heading:`Patients`,children:(0,E.jsxs)(S,{value:`patient-directory`,children:[(0,E.jsx)(o,{"aria-hidden":`true`}),`Patient directory`]})}),(0,E.jsx)(f,{heading:`Bookings`,children:(0,E.jsxs)(S,{value:`booking-worklist`,children:[(0,E.jsx)(l,{"aria-hidden":`true`}),`Today’s booking worklist`]})}),(0,E.jsx)(f,{heading:`Collection`,children:(0,E.jsxs)(S,{value:`collection-worklist`,children:[(0,E.jsx)(i,{"aria-hidden":`true`}),`Collection draw worklist`]})}),(0,E.jsx)(f,{heading:`Workspace`,children:(0,E.jsxs)(S,{value:`workspace-settings`,children:[(0,E.jsx)(u,{"aria-hidden":`true`}),`Workspace settings`]})})]})]})})},L={name:`Record lookup through the reception doors`,render:()=>(0,E.jsx)(g,{defaultOpen:!0,title:`Find authorised record`,description:`Patients and bookings resolve by exact phone or booking code; recents come from this workspace.`,children:(0,E.jsxs)(h,{label:`Authorised record search`,loop:!0,children:[(0,E.jsx)(v,{placeholder:`Exact phone, booking code, test, or action`}),(0,E.jsxs)(b,{children:[(0,E.jsx)(p,{children:`No match. Patients resolve by exact phone or booking code — partial names never search the registry.`}),(0,E.jsxs)(f,{heading:`Doors`,children:[(0,E.jsxs)(S,{value:`door-phone-0908440921`,keywords:[`0908 440 921`,`phone`,`lookup`],children:[(0,E.jsx)(o,{"aria-hidden":`true`}),(0,E.jsxs)(`span`,{className:`grid min-w-0 gap-1`,children:[(0,E.jsx)(`span`,{children:`Find patient by phone 0908 440 921`}),(0,E.jsx)(`span`,{className:`text-sm text-muted-foreground`,children:`Exact match · opens phone-gate`})]})]}),(0,E.jsxs)(S,{value:`door-booking-gw87430`,keywords:[`GW87430`,`booking`,`code`],children:[(0,E.jsx)(l,{"aria-hidden":`true`}),(0,E.jsxs)(`span`,{className:`grid min-w-0 gap-1`,children:[(0,E.jsx)(`span`,{children:`Open booking GW87430`}),(0,E.jsx)(`span`,{className:`text-sm text-muted-foreground`,children:`Exact booking code · today 09:30`})]})]})]}),(0,E.jsx)(f,{heading:`Recent patients`,children:(0,E.jsxs)(S,{value:`recent-nguyen-thi-anh`,keywords:[`Nguyễn Thị Ánh`,`recent`],children:[(0,E.jsx)(c,{"aria-hidden":`true`}),(0,E.jsxs)(`span`,{className:`grid min-w-0 gap-1`,children:[(0,E.jsx)(`span`,{children:`Nguyễn Thị Ánh`}),(0,E.jsx)(`span`,{className:`text-sm text-muted-foreground`,children:`092 *** 778 · MRN ··01 · Unverified`})]})]})})]})]})})},R={name:`Name query → explain the doors (no silent empty)`,render:()=>(0,E.jsx)(g,{defaultOpen:!0,title:`Search Kura`,description:`Patient name search has no backend by privacy design — the empty state explains the doors.`,children:(0,E.jsxs)(h,{label:`Global Kura search`,loop:!0,children:[(0,E.jsx)(v,{placeholder:`Exact phone, booking code, test, or action`}),(0,E.jsxs)(b,{children:[(0,E.jsx)(p,{children:(0,E.jsxs)(`span`,{className:`grid gap-1 text-left`,children:[(0,E.jsx)(`span`,{children:`No authorised match.`}),(0,E.jsx)(`span`,{className:`text-sm text-muted-foreground`,children:`Patients resolve by exact phone or booking code, or from this workspace’s recent patients. Names are never searchable across the registry.`})]})}),(0,E.jsx)(f,{heading:`Lab tests`,children:(0,E.jsxs)(S,{value:`test-hba1c`,keywords:[`HbA1c`,`glycated haemoglobin`],children:[(0,E.jsx)(i,{"aria-hidden":`true`}),`HbA1c — glycated haemoglobin`]})})]})]})}),play:async({canvasElement:e})=>{let t=j(e.ownerDocument.body),n=t.getByPlaceholderText(`Exact phone, booking code, test, or action`);await k.type(n,`Pham Thi Lan`),await O(await t.findByText(/resolve by exact phone or booking code/i)).toBeVisible()}},z={render:()=>(0,E.jsx)(g,{defaultOpen:!0,title:`Find authorised colleague`,description:`Only members of this clinic workspace appear here.`,children:(0,E.jsxs)(h,{label:`Authorised staff search`,loop:!0,children:[(0,E.jsx)(v,{placeholder:`Search care team by name or role`}),(0,E.jsxs)(b,{children:[(0,E.jsx)(p,{children:`No authorised colleague matches this search.`}),(0,E.jsx)(f,{heading:`Care team`,children:[[`BS. Nguyễn Minh Khôi`,`MK`,`Treating clinician`],[`BS. Trần Linh Chi`,`LC`,`Supervising clinician`],[`Nguyễn Phương Thảo`,`PT`,`Reception lead`]].map(([e,t,n])=>(0,E.jsxs)(S,{value:e,keywords:[n],children:[(0,E.jsx)(w,{size:`sm`,"aria-label":e,children:(0,E.jsx)(C,{children:t})}),(0,E.jsxs)(`span`,{className:`grid min-w-0 gap-1`,children:[(0,E.jsx)(`span`,{children:e}),(0,E.jsx)(`span`,{className:`text-sm text-muted-foreground`,children:n})]})]},e))})]})]})})},B={render:()=>(0,E.jsx)(g,{defaultOpen:!0,title:`Consultation actions`,description:`Starting an action opens its own workflow; it does not complete a clinical change here.`,children:(0,E.jsxs)(h,{label:`Consultation actions`,loop:!0,children:[(0,E.jsx)(v,{placeholder:`Search clinic actions`}),(0,E.jsxs)(b,{children:[(0,E.jsx)(p,{children:`No permitted clinic action matches.`}),(0,E.jsxs)(f,{heading:`Start`,children:[(0,E.jsxs)(S,{value:`start-check-in`,children:[(0,E.jsx)(o,{"aria-hidden":`true`}),`Start patient check-in`,(0,E.jsx)(_,{children:(0,E.jsx)(m,{children:`⌘I`})})]}),(0,E.jsxs)(S,{value:`create-lab-order`,children:[(0,E.jsx)(i,{"aria-hidden":`true`}),`Create lab order`,(0,E.jsx)(_,{children:(0,E.jsx)(m,{children:`⌘L`})})]}),(0,E.jsxs)(S,{value:`issue-booking-code`,children:[(0,E.jsx)(l,{"aria-hidden":`true`}),`Issue booking code`,(0,E.jsx)(_,{children:(0,E.jsx)(m,{children:`⌘B`})})]})]})]})]})})},V={render:()=>(0,E.jsx)(g,{defaultOpen:!0,title:`Continue work`,children:(0,E.jsxs)(h,{label:`Recent and favourite destinations`,loop:!0,children:[(0,E.jsx)(v,{placeholder:`Search recent or favourite destinations`}),(0,E.jsxs)(b,{children:[(0,E.jsx)(p,{children:`No saved destination matches this search.`}),(0,E.jsxs)(f,{heading:`Favourites`,children:[(0,E.jsxs)(S,{value:`favourite-bookings`,children:[(0,E.jsx)(s,{"aria-hidden":`true`}),`Today’s booking worklist`]}),(0,E.jsxs)(S,{value:`favourite-catalog`,children:[(0,E.jsx)(s,{"aria-hidden":`true`}),`Lab test catalog`]})]}),(0,E.jsx)(y,{}),(0,E.jsxs)(f,{heading:`Recent`,children:[(0,E.jsxs)(S,{value:`recent-patient`,children:[(0,E.jsx)(c,{"aria-hidden":`true`}),`Nguyễn Thị Ánh · MRN-01482`]}),(0,E.jsxs)(S,{value:`recent-booking`,children:[(0,E.jsx)(l,{"aria-hidden":`true`}),`BK-20491 · Today at 09:30`]})]})]})]})})},H={parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,E.jsx)(g,{defaultOpen:!0,title:`Search Kura`,description:`Your selection and query remain available while the clinic directory refreshes.`,children:(0,E.jsxs)(h,{label:`Mobile global search`,children:[(0,E.jsx)(v,{placeholder:`Search patient, booking, or action`}),(0,E.jsx)(b,{children:(0,E.jsx)(x,{label:`Refreshing authorised results`,children:`Refreshing authorised results…`})})]})})},U={name:`Keyboard: arrows, Enter selects, Escape closes`,render:function(){let[e,t]=(0,D.useState)(null),[n,r]=(0,D.useState)(!0);return(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`p`,{role:`status`,className:`text-sm`,children:e?`Selected: ${e}`:`Nothing selected yet`}),(0,E.jsx)(g,{open:n,onOpenChange:r,title:`Search Kura`,children:(0,E.jsxs)(h,{label:`Keyboard navigation demo`,loop:!0,children:[(0,E.jsx)(v,{placeholder:`Search actions`}),(0,E.jsxs)(b,{children:[(0,E.jsx)(p,{children:`No action matches.`}),(0,E.jsxs)(f,{heading:`Actions`,children:[(0,E.jsxs)(S,{value:`start-check-in`,onSelect:()=>{t(`start-check-in`),r(!1)},children:[(0,E.jsx)(o,{"aria-hidden":`true`}),`Start patient check-in`]}),(0,E.jsxs)(S,{value:`create-lab-order`,onSelect:()=>{t(`create-lab-order`),r(!1)},children:[(0,E.jsx)(i,{"aria-hidden":`true`}),`Create lab order`]}),(0,E.jsxs)(S,{value:`issue-booking-code`,onSelect:()=>{t(`issue-booking-code`),r(!1)},children:[(0,E.jsx)(l,{"aria-hidden":`true`}),`Issue booking code`]})]})]})]})})]})},play:async({canvasElement:e})=>{let t=j(e.ownerDocument.body),n=t.getByPlaceholderText(`Search actions`);await A(async()=>{await O(n).toHaveFocus()}),await k.keyboard(`{ArrowDown}{Enter}`),await A(async()=>{await O(t.getByRole(`status`)).toHaveTextContent(`Selected: create-lab-order`)}),await O(t.queryByPlaceholderText(`Search actions`)).not.toBeVisible()}},W={name:`Disabled action carries its reason`,render:()=>(0,E.jsx)(g,{defaultOpen:!0,title:`Clinic actions`,description:`Unavailable actions stay visible and explain their gate.`,children:(0,E.jsxs)(h,{label:`Clinic actions`,loop:!0,children:[(0,E.jsx)(v,{placeholder:`Search clinic actions`}),(0,E.jsxs)(b,{children:[(0,E.jsx)(p,{children:`No permitted clinic action matches.`}),(0,E.jsxs)(f,{heading:`Start`,children:[(0,E.jsxs)(S,{value:`start-check-in`,children:[(0,E.jsx)(o,{"aria-hidden":`true`}),`Start patient check-in`]}),(0,E.jsxs)(S,{value:`invite-member`,disabled:!0,children:[(0,E.jsx)(o,{"aria-hidden":`true`}),(0,E.jsxs)(`span`,{className:`grid min-w-0 gap-1`,children:[(0,E.jsx)(`span`,{children:`Invite workspace member`}),(0,E.jsx)(`span`,{className:`text-sm text-muted-foreground`,children:`Needs the member.invite permission — ask a workspace administrator.`})]})]}),(0,E.jsxs)(S,{value:`manage-roles`,disabled:!0,children:[(0,E.jsx)(o,{"aria-hidden":`true`}),(0,E.jsxs)(`span`,{className:`grid min-w-0 gap-1`,children:[(0,E.jsx)(`span`,{children:`Manage roles`}),(0,E.jsx)(`span`,{className:`text-sm text-muted-foreground`,children:`Needs the role.manage permission.`})]})]})]})]})]})})},G=[`Định lượng kháng thể kháng thụ thể TSH (TRAb) — miễn dịch điện hóa phát quang`,`Tổng phân tích tế bào máu ngoại vi bằng máy đếm laser (CBC 26 thông số)`,`Định lượng 25-hydroxy vitamin D toàn phần (D2 + D3) huyết thanh`,`Xét nghiệm sinh học phân tử HPV genotype PCR hệ thống tự động`,`Định lượng kháng nguyên đặc hiệu tuyến tiền liệt tự do (Free PSA)`,`Nghiệm pháp dung nạp glucose đường uống 75g (OGTT) — thai kỳ`,`Định lượng hormone kích thích tuyến giáp siêu nhạy thế hệ 4 (TSHs)`,`Cấy máu định danh vi khuẩn và kháng sinh đồ tự động hai chai`],K={name:`Long Vietnamese labels + internal scroll`,render:()=>(0,E.jsx)(g,{defaultOpen:!0,title:`Search lab catalog`,children:(0,E.jsxs)(h,{label:`Lab catalog search`,loop:!0,children:[(0,E.jsx)(v,{placeholder:`Search tests`}),(0,E.jsxs)(b,{children:[(0,E.jsx)(p,{children:`No test matches this search.`}),(0,E.jsx)(f,{heading:`Tests`,children:G.concat(G.map(e=>`${e} · bản sao kiểm tra tràn`)).map(e=>(0,E.jsxs)(S,{value:e,children:[(0,E.jsx)(i,{"aria-hidden":`true`}),(0,E.jsx)(`span`,{className:`min-w-0`,children:e})]},e))})]})]})})},q={name:`Async server search (lab catalog contract)`,render:function(){let[e,t]=(0,D.useState)(``),[n,r]=(0,D.useState)(`idle`),a=(0,D.useRef)(null);return(0,D.useEffect)(()=>{if(e.trim()===``){r(`idle`);return}return r(`loading`),a.current=window.setTimeout(()=>r(`ready`),450),()=>{a.current!=null&&window.clearTimeout(a.current)}},[e]),(0,E.jsx)(g,{defaultOpen:!0,title:`Search lab catalog`,description:`Results come from the clinic catalog service; the palette does not filter locally.`,children:(0,E.jsxs)(h,{label:`Lab catalog server search`,shouldFilter:!1,children:[(0,E.jsx)(v,{placeholder:`Search tests by name or code`,value:e,onValueChange:t}),(0,E.jsxs)(b,{children:[n===`idle`?(0,E.jsx)(p,{children:`Type to search the active test catalog.`}):null,n===`loading`?(0,E.jsx)(x,{label:`Searching test catalog`,children:`Searching test catalog…`}):null,n===`ready`?(0,E.jsxs)(f,{heading:`Tests`,children:[(0,E.jsxs)(S,{value:`hba1c`,children:[(0,E.jsx)(i,{"aria-hidden":`true`}),(0,E.jsxs)(`span`,{className:`grid min-w-0 gap-1`,children:[(0,E.jsx)(`span`,{children:`HbA1c — glycated haemoglobin`}),(0,E.jsx)(`span`,{className:`text-sm text-muted-foreground`,children:`HB-A1C · panel-ready`})]})]}),(0,E.jsxs)(S,{value:`hb-electrophoresis`,children:[(0,E.jsx)(i,{"aria-hidden":`true`}),`Haemoglobin electrophoresis`]})]}):null]})]})})},play:async({canvasElement:e})=>{let t=j(e.ownerDocument.body),n=t.getByPlaceholderText(`Search tests by name or code`);await k.type(n,`hb`),await O(await t.findByText(`Searching test catalog…`)).toBeVisible(),await O(await t.findByText(`HbA1c — glycated haemoglobin`)).toBeVisible()}},J={name:`Registry refresh failed → visible retry`,render:()=>(0,E.jsx)(g,{defaultOpen:!0,title:`Search Kura`,description:`A failed refresh never fails silently — the palette keeps navigation and offers a retry.`,children:(0,E.jsxs)(h,{label:`Global Kura search`,loop:!0,children:[(0,E.jsx)(v,{placeholder:`Search patient, booking, or action`}),(0,E.jsxs)(b,{children:[(0,E.jsx)(p,{children:`No cached destination matches.`}),(0,E.jsx)(f,{heading:`Search status`,children:(0,E.jsxs)(S,{value:`retry-refresh`,keywords:[`retry`,`error`,`refresh`],children:[(0,E.jsx)(d,{"aria-hidden":`true`}),(0,E.jsxs)(`span`,{className:`grid min-w-0 gap-1`,children:[(0,E.jsx)(`span`,{children:`Directory refresh failed — retry`}),(0,E.jsx)(`span`,{className:`text-sm text-muted-foreground`,children:`Showing cached navigation only. Recent patients may be stale.`})]}),(0,E.jsx)(_,{children:(0,E.jsx)(a,{"aria-hidden":`true`})})]})}),(0,E.jsx)(y,{}),(0,E.jsxs)(f,{heading:`Navigation (cached)`,children:[(0,E.jsxs)(S,{value:`today-bookings`,children:[(0,E.jsx)(l,{"aria-hidden":`true`}),`Open today’s bookings`]}),(0,E.jsxs)(S,{value:`collection-worklist`,children:[(0,E.jsx)(i,{"aria-hidden":`true`}),`Collection draw worklist`]})]})]})]})})},Y={name:`Controlled by a trigger — focus returns on close`,render:function(){let[e,t]=(0,D.useState)(!1);return(0,E.jsxs)(`div`,{className:`grid gap-3`,children:[(0,E.jsxs)(T,{onClick:()=>t(!0),children:[(0,E.jsx)(u,{"aria-hidden":`true`}),`Search Kura`,(0,E.jsx)(m,{children:`⌘K`})]}),(0,E.jsx)(g,{open:e,onOpenChange:t,title:`Search Kura`,children:(0,E.jsxs)(h,{label:`Global Kura search`,loop:!0,children:[(0,E.jsx)(v,{placeholder:`Search patient, booking, or action`}),(0,E.jsxs)(b,{children:[(0,E.jsx)(p,{children:`No authorised destination matches.`}),(0,E.jsx)(f,{heading:`Navigation`,children:(0,E.jsxs)(S,{value:`today-bookings`,onSelect:()=>t(!1),children:[(0,E.jsx)(l,{"aria-hidden":`true`}),`Open today’s bookings`]})})]})]})})]})},play:async({canvasElement:e})=>{let t=j(e.ownerDocument.body),n=t.getByRole(`button`,{name:/Search Kura/});await k.click(n);let r=await t.findByPlaceholderText(`Search patient, booking, or action`);await A(async()=>{await O(r).toHaveFocus()}),await k.keyboard(`{Escape}`),await A(async()=>{await O(n).toHaveFocus()})}},X={globals:{density:`compact`},render:I.render},Z={globals:{theme:`dark`},render:L.render},Q={name:`Mobile 320 — interactive long list`,parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,E.jsx)(g,{defaultOpen:!0,title:`Search lab catalog`,children:(0,E.jsxs)(h,{label:`Mobile lab catalog search`,loop:!0,children:[(0,E.jsx)(v,{placeholder:`Search tests`}),(0,E.jsxs)(b,{children:[(0,E.jsx)(p,{children:`No test matches this search.`}),(0,E.jsx)(f,{heading:`Tests`,children:G.map(e=>(0,E.jsxs)(S,{value:e,children:[(0,E.jsx)(i,{"aria-hidden":`true`}),(0,E.jsx)(`span`,{className:`min-w-0`,children:e})]},e))})]})]})}),play:async({canvasElement:e})=>{let t=j(e.ownerDocument.body),n=t.getByPlaceholderText(`Search tests`);await k.type(n,`vitamin`),await O(await t.findByText(/25-hydroxy vitamin D/)).toBeVisible()}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <CommandDialog defaultOpen title="Search Kura" description="Search destinations authorised for this clinic workspace.">
      <Command label="Global Kura search" loop>
        <CommandInput placeholder="Search patient, booking, or action" />
        <CommandList>
          <CommandEmpty>No authorised destination matches this search.</CommandEmpty>
          <CommandGroup heading="Open">
            <CommandItem value="patient-pham-thi-lan" keywords={['patient', 'MRN-01482', 'Phạm Thị Lan']}>
              <MedicalFileIcon aria-hidden="true" />
              Open patient record: Phạm Thị Lan
            </CommandItem>
            <CommandItem value="booking-bk-20491" keywords={['booking', 'BK-20491', 'appointment']}>
              <CalendarIcon aria-hidden="true" />
              Open booking BK-20491
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>,
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    await expect(body.getByRole('dialog', {
      name: 'Search Kura'
    })).toBeVisible();
    const input = body.getByPlaceholderText('Search patient, booking, or action');
    await expect(input).toHaveFocus();
    await userEvent.type(input, 'BK-20491');
    await expect(body.getByText('Open booking BK-20491')).toBeVisible();
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <CommandDialog defaultOpen title="Quick actions" description="Choose a non-destructive action or open its governed workflow.">
      <Command label="Quick actions" loop>
        <CommandInput placeholder="Search quick actions" />
        <CommandList>
          <CommandEmpty>No action matches this search.</CommandEmpty>
          <CommandGroup heading="Create">
            <CommandItem value="new-booking" keywords={['booking', 'appointment', 'create']}>
              <CalendarIcon aria-hidden="true" />
              Start a new booking
              <CommandShortcut><Kbd>⌘B</Kbd></CommandShortcut>
            </CommandItem>
            <CommandItem value="open-patient-search" keywords={['patient', 'find', 'search']}>
              <UserSearchIcon aria-hidden="true" />
              Search patient directory
              <CommandShortcut><Kbd>⌘P</Kbd></CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <CommandDialog defaultOpen title="Workspace navigation">
      <Command label="Workspace navigation" loop>
        <CommandInput placeholder="Search navigation and actions" />
        <CommandList>
          <CommandEmpty>No authorised workspace destination matches.</CommandEmpty>
          <CommandGroup heading="Patients">
            <CommandItem value="patient-directory"><UserSearchIcon aria-hidden="true" />Patient directory</CommandItem>
            <CommandItem value="new-patient"><MedicalFileIcon aria-hidden="true" />Start governed patient intake</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Worklists">
            <CommandItem value="today-bookings"><CalendarIcon aria-hidden="true" />Open today’s bookings</CommandItem>
            <CommandItem value="collection-worklist"><FileIcon aria-hidden="true" />Collection draw worklist</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <CommandDialog defaultOpen title="Search clinic workspace">
      <Command label="Clinic workspace search" loop>
        <CommandInput placeholder="Search the authorised workspace" />
        <CommandList>
          <CommandEmpty>No authorised destination matches this search.</CommandEmpty>
          <CommandGroup heading="Recent">
            <CommandItem value="recent-patient"><MedicalFileIcon aria-hidden="true" />Patient record: Nguyễn Thị Ánh</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Patients">
            <CommandItem value="patient-directory"><UserSearchIcon aria-hidden="true" />Patient directory</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Bookings">
            <CommandItem value="booking-worklist"><CalendarIcon aria-hidden="true" />Today’s booking worklist</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Collection">
            <CommandItem value="collection-worklist"><FileIcon aria-hidden="true" />Collection draw worklist</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Workspace">
            <CommandItem value="workspace-settings"><SearchIcon aria-hidden="true" />Workspace settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Record lookup through the reception doors',
  render: () => <CommandDialog defaultOpen title="Find authorised record" description="Patients and bookings resolve by exact phone or booking code; recents come from this workspace.">
      <Command label="Authorised record search" loop>
        <CommandInput placeholder="Exact phone, booking code, test, or action" />
        <CommandList>
          <CommandEmpty>
            No match. Patients resolve by exact phone or booking code — partial names never search
            the registry.
          </CommandEmpty>
          <CommandGroup heading="Doors">
            <CommandItem value="door-phone-0908440921" keywords={['0908 440 921', 'phone', 'lookup']}>
              <UserSearchIcon aria-hidden="true" />
              <span className="grid min-w-0 gap-1">
                <span>Find patient by phone 0908 440 921</span>
                <span className="text-sm text-muted-foreground">Exact match · opens phone-gate</span>
              </span>
            </CommandItem>
            <CommandItem value="door-booking-gw87430" keywords={['GW87430', 'booking', 'code']}>
              <CalendarIcon aria-hidden="true" />
              <span className="grid min-w-0 gap-1">
                <span>Open booking GW87430</span>
                <span className="text-sm text-muted-foreground">Exact booking code · today 09:30</span>
              </span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Recent patients">
            <CommandItem value="recent-nguyen-thi-anh" keywords={['Nguyễn Thị Ánh', 'recent']}>
              <MedicalFileIcon aria-hidden="true" />
              <span className="grid min-w-0 gap-1">
                <span>Nguyễn Thị Ánh</span>
                <span className="text-sm text-muted-foreground">092 *** 778 · MRN ··01 · Unverified</span>
              </span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Name query → explain the doors (no silent empty)',
  render: () => <CommandDialog defaultOpen title="Search Kura" description="Patient name search has no backend by privacy design — the empty state explains the doors.">
      <Command label="Global Kura search" loop>
        <CommandInput placeholder="Exact phone, booking code, test, or action" />
        <CommandList>
          <CommandEmpty>
            <span className="grid gap-1 text-left">
              <span>No authorised match.</span>
              <span className="text-sm text-muted-foreground">
                Patients resolve by exact phone or booking code, or from this workspace&rsquo;s
                recent patients. Names are never searchable across the registry.
              </span>
            </span>
          </CommandEmpty>
          <CommandGroup heading="Lab tests">
            <CommandItem value="test-hba1c" keywords={['HbA1c', 'glycated haemoglobin']}>
              <FileIcon aria-hidden="true" />
              HbA1c — glycated haemoglobin
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>,
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    const input = body.getByPlaceholderText('Exact phone, booking code, test, or action');
    await userEvent.type(input, 'Pham Thi Lan');
    await expect(await body.findByText(/resolve by exact phone or booking code/i)).toBeVisible();
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <CommandDialog defaultOpen title="Find authorised colleague" description="Only members of this clinic workspace appear here.">
      <Command label="Authorised staff search" loop>
        <CommandInput placeholder="Search care team by name or role" />
        <CommandList>
          <CommandEmpty>No authorised colleague matches this search.</CommandEmpty>
          <CommandGroup heading="Care team">
            {[['BS. Nguyễn Minh Khôi', 'MK', 'Treating clinician'], ['BS. Trần Linh Chi', 'LC', 'Supervising clinician'], ['Nguyễn Phương Thảo', 'PT', 'Reception lead']].map(([name, initials, role]) => <CommandItem key={name} value={name} keywords={[role]}>
                <Avatar size="sm" aria-label={name}>
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span className="grid min-w-0 gap-1">
                  <span>{name}</span>
                  <span className="text-sm text-muted-foreground">{role}</span>
                </span>
              </CommandItem>)}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <CommandDialog defaultOpen title="Consultation actions" description="Starting an action opens its own workflow; it does not complete a clinical change here.">
      <Command label="Consultation actions" loop>
        <CommandInput placeholder="Search clinic actions" />
        <CommandList>
          <CommandEmpty>No permitted clinic action matches.</CommandEmpty>
          <CommandGroup heading="Start">
            <CommandItem value="start-check-in"><UserSearchIcon aria-hidden="true" />Start patient check-in<CommandShortcut><Kbd>⌘I</Kbd></CommandShortcut></CommandItem>
            <CommandItem value="create-lab-order"><FileIcon aria-hidden="true" />Create lab order<CommandShortcut><Kbd>⌘L</Kbd></CommandShortcut></CommandItem>
            <CommandItem value="issue-booking-code"><CalendarIcon aria-hidden="true" />Issue booking code<CommandShortcut><Kbd>⌘B</Kbd></CommandShortcut></CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <CommandDialog defaultOpen title="Continue work">
      <Command label="Recent and favourite destinations" loop>
        <CommandInput placeholder="Search recent or favourite destinations" />
        <CommandList>
          <CommandEmpty>No saved destination matches this search.</CommandEmpty>
          <CommandGroup heading="Favourites">
            <CommandItem value="favourite-bookings"><StarIcon aria-hidden="true" />Today’s booking worklist</CommandItem>
            <CommandItem value="favourite-catalog"><StarIcon aria-hidden="true" />Lab test catalog</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Recent">
            <CommandItem value="recent-patient"><MedicalFileIcon aria-hidden="true" />Nguyễn Thị Ánh · MRN-01482</CommandItem>
            <CommandItem value="recent-booking"><CalendarIcon aria-hidden="true" />BK-20491 · Today at 09:30</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <CommandDialog defaultOpen title="Search Kura" description="Your selection and query remain available while the clinic directory refreshes.">
      <Command label="Mobile global search">
        <CommandInput placeholder="Search patient, booking, or action" />
        <CommandList>
          <CommandLoading label="Refreshing authorised results">Refreshing authorised results…</CommandLoading>
        </CommandList>
      </Command>
    </CommandDialog>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: 'Keyboard: arrows, Enter selects, Escape closes',
  render: function KeyboardStory() {
    const [selected, setSelected] = useState<string | null>(null);
    const [open, setOpen] = useState(true);
    return <div>
        <p role="status" className="text-sm">
          {selected ? \`Selected: \${selected}\` : 'Nothing selected yet'}
        </p>
        <CommandDialog open={open} onOpenChange={setOpen} title="Search Kura">
          <Command label="Keyboard navigation demo" loop>
            <CommandInput placeholder="Search actions" />
            <CommandList>
              <CommandEmpty>No action matches.</CommandEmpty>
              <CommandGroup heading="Actions">
                <CommandItem value="start-check-in" onSelect={() => {
                setSelected('start-check-in');
                setOpen(false);
              }}>
                  <UserSearchIcon aria-hidden="true" />Start patient check-in
                </CommandItem>
                <CommandItem value="create-lab-order" onSelect={() => {
                setSelected('create-lab-order');
                setOpen(false);
              }}>
                  <FileIcon aria-hidden="true" />Create lab order
                </CommandItem>
                <CommandItem value="issue-booking-code" onSelect={() => {
                setSelected('issue-booking-code');
                setOpen(false);
              }}>
                  <CalendarIcon aria-hidden="true" />Issue booking code
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>;
  },
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    const input = body.getByPlaceholderText('Search actions');
    await waitFor(async () => {
      await expect(input).toHaveFocus();
    });

    // Arrow moves the active option; Enter selects it and the owner closes.
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await waitFor(async () => {
      await expect(body.getByRole('status')).toHaveTextContent('Selected: create-lab-order');
    });
    await expect(body.queryByPlaceholderText('Search actions')).not.toBeVisible();
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'Disabled action carries its reason',
  render: () => <CommandDialog defaultOpen title="Clinic actions" description="Unavailable actions stay visible and explain their gate.">
      <Command label="Clinic actions" loop>
        <CommandInput placeholder="Search clinic actions" />
        <CommandList>
          <CommandEmpty>No permitted clinic action matches.</CommandEmpty>
          <CommandGroup heading="Start">
            <CommandItem value="start-check-in">
              <UserSearchIcon aria-hidden="true" />Start patient check-in
            </CommandItem>
            <CommandItem value="invite-member" disabled>
              <UserSearchIcon aria-hidden="true" />
              <span className="grid min-w-0 gap-1">
                <span>Invite workspace member</span>
                <span className="text-sm text-muted-foreground">Needs the member.invite permission — ask a workspace administrator.</span>
              </span>
            </CommandItem>
            <CommandItem value="manage-roles" disabled>
              <UserSearchIcon aria-hidden="true" />
              <span className="grid min-w-0 gap-1">
                <span>Manage roles</span>
                <span className="text-sm text-muted-foreground">Needs the role.manage permission.</span>
              </span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
}`,...W.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Long Vietnamese labels + internal scroll',
  render: () => <CommandDialog defaultOpen title="Search lab catalog">
      <Command label="Lab catalog search" loop>
        <CommandInput placeholder="Search tests" />
        <CommandList>
          <CommandEmpty>No test matches this search.</CommandEmpty>
          <CommandGroup heading="Tests">
            {LONG_TESTS.concat(LONG_TESTS.map(name => \`\${name} · bản sao kiểm tra tràn\`)).map(name => <CommandItem key={name} value={name}>
                <FileIcon aria-hidden="true" />
                <span className="min-w-0">{name}</span>
              </CommandItem>)}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Async server search (lab catalog contract)',
  render: function AsyncStory() {
    const [query, setQuery] = useState('');
    const [phase, setPhase] = useState<'idle' | 'loading' | 'ready'>('idle');
    const timerRef = useRef<number | null>(null);
    useEffect(() => {
      if (query.trim() === '') {
        setPhase('idle');
        return undefined;
      }
      setPhase('loading');
      timerRef.current = window.setTimeout(() => setPhase('ready'), 450);
      return () => {
        if (timerRef.current != null) window.clearTimeout(timerRef.current);
      };
    }, [query]);
    return <CommandDialog defaultOpen title="Search lab catalog" description="Results come from the clinic catalog service; the palette does not filter locally.">
        <Command label="Lab catalog server search" shouldFilter={false}>
          <CommandInput placeholder="Search tests by name or code" value={query} onValueChange={setQuery} />
          <CommandList>
            {phase === 'idle' ? <CommandEmpty>Type to search the active test catalog.</CommandEmpty> : null}
            {phase === 'loading' ? <CommandLoading label="Searching test catalog">Searching test catalog…</CommandLoading> : null}
            {phase === 'ready' ? <CommandGroup heading="Tests">
                <CommandItem value="hba1c">
                  <FileIcon aria-hidden="true" />
                  <span className="grid min-w-0 gap-1">
                    <span>HbA1c — glycated haemoglobin</span>
                    <span className="text-sm text-muted-foreground">HB-A1C · panel-ready</span>
                  </span>
                </CommandItem>
                <CommandItem value="hb-electrophoresis">
                  <FileIcon aria-hidden="true" />Haemoglobin electrophoresis
                </CommandItem>
              </CommandGroup> : null}
          </CommandList>
        </Command>
      </CommandDialog>;
  },
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    const input = body.getByPlaceholderText('Search tests by name or code');
    await userEvent.type(input, 'hb');
    await expect(await body.findByText('Searching test catalog…')).toBeVisible();
    await expect(await body.findByText('HbA1c — glycated haemoglobin')).toBeVisible();
  }
}`,...q.parameters?.docs?.source},description:{story:`The lab catalog is the one server-searched domain: filtering is disabled and
the owner replaces results per query (clinic/lab/catalog).`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Registry refresh failed → visible retry',
  render: () => <CommandDialog defaultOpen title="Search Kura" description="A failed refresh never fails silently — the palette keeps navigation and offers a retry.">
      <Command label="Global Kura search" loop>
        <CommandInput placeholder="Search patient, booking, or action" />
        <CommandList>
          <CommandEmpty>No cached destination matches.</CommandEmpty>
          <CommandGroup heading="Search status">
            <CommandItem value="retry-refresh" keywords={['retry', 'error', 'refresh']}>
              <WarningIcon aria-hidden="true" />
              <span className="grid min-w-0 gap-1">
                <span>Directory refresh failed — retry</span>
                <span className="text-sm text-muted-foreground">Showing cached navigation only. Recent patients may be stale.</span>
              </span>
              <CommandShortcut><RefreshIcon aria-hidden="true" /></CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navigation (cached)">
            <CommandItem value="today-bookings"><CalendarIcon aria-hidden="true" />Open today’s bookings</CommandItem>
            <CommandItem value="collection-worklist"><FileIcon aria-hidden="true" />Collection draw worklist</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: 'Controlled by a trigger — focus returns on close',
  render: function TriggerStory() {
    const [open, setOpen] = useState(false);
    return <div className="grid gap-3">
        <Button onClick={() => setOpen(true)}>
          <SearchIcon aria-hidden="true" />
          Search Kura
          <Kbd>⌘K</Kbd>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen} title="Search Kura">
          <Command label="Global Kura search" loop>
            <CommandInput placeholder="Search patient, booking, or action" />
            <CommandList>
              <CommandEmpty>No authorised destination matches.</CommandEmpty>
              <CommandGroup heading="Navigation">
                <CommandItem value="today-bookings" onSelect={() => setOpen(false)}>
                  <CalendarIcon aria-hidden="true" />Open today’s bookings
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>;
  },
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    const trigger = body.getByRole('button', {
      name: /Search Kura/
    });
    await userEvent.click(trigger);
    const input = await body.findByPlaceholderText('Search patient, booking, or action');
    await waitFor(async () => {
      await expect(input).toHaveFocus();
    });
    await userEvent.keyboard('{Escape}');
    await waitFor(async () => {
      await expect(trigger).toHaveFocus();
    });
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  globals: {
    density: 'compact'
  },
  render: ManyGroups.render
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  globals: {
    theme: 'dark'
  },
  render: AuthorisedRecordSearch.render
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: 'Mobile 320 — interactive long list',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <CommandDialog defaultOpen title="Search lab catalog">
      <Command label="Mobile lab catalog search" loop>
        <CommandInput placeholder="Search tests" />
        <CommandList>
          <CommandEmpty>No test matches this search.</CommandEmpty>
          <CommandGroup heading="Tests">
            {LONG_TESTS.map(name => <CommandItem key={name} value={name}>
                <FileIcon aria-hidden="true" />
                <span className="min-w-0">{name}</span>
              </CommandItem>)}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>,
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    const input = body.getByPlaceholderText('Search tests');
    await userEvent.type(input, 'vitamin');
    await expect(await body.findByText(/25-hydroxy vitamin D/)).toBeVisible();
  }
}`,...Q.parameters?.docs?.source}}},$=[`Basic`,`Shortcuts`,`GroupedCommands`,`ManyGroups`,`AuthorisedRecordSearch`,`PatientNameEmptyState`,`StaffSearchWithAvatars`,`ActionPalette`,`RecentAndFavourites`,`LoadingAndMobile`,`KeyboardNavigationAndSelection`,`DisabledWithReason`,`LongContentOverflow`,`AsyncCatalogSearch`,`RegistryErrorRecovery`,`TriggerControlledFocusRestore`,`CompactDensity`,`DarkTheme`,`MobileInteractiveLongList`]}))();export{B as ActionPalette,q as AsyncCatalogSearch,L as AuthorisedRecordSearch,N as Basic,X as CompactDensity,Z as DarkTheme,W as DisabledWithReason,F as GroupedCommands,U as KeyboardNavigationAndSelection,H as LoadingAndMobile,K as LongContentOverflow,I as ManyGroups,Q as MobileInteractiveLongList,R as PatientNameEmptyState,V as RecentAndFavourites,J as RegistryErrorRecovery,P as Shortcuts,z as StaffSearchWithAvatars,Y as TriggerControlledFocusRestore,$ as __namedExportsOrder,M as default};