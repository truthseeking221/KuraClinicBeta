import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{T as n,Vt as r}from"./provider-marks-BeHzyBjc.js";import{_r as i,br as a,gr as o,hr as s,mr as c,t as l,vr as u,yr as d}from"./ui-C9kmmzkH.js";var f,p,m,h,g,_,v,y,b,x,S;e((()=>{f=t(),l(),{expect:p,within:m}=__STORYBOOK_MODULE_TEST__,h={title:`Design System/Primitives/Breadcrumb`,component:c,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`padded`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`Fresh source and Storybook search found no canonical hierarchical navigation primitive. The existing catalog had no reusable breadcrumb implementation.`},source:{vendor:`Kura`,registryItem:`breadcrumb`,visualReference:`Kura breadcrumb`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-focus-only`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`wraps-and-preserves-current-context`},exclusions:[{capability:`Dropdown-backed collapsed levels`,reason:`A dropdown/disclosure owner is not present in the fresh Kura index; hiding navigation without its recovery path would be unsafe.`,replacement:`Use BreadcrumbEllipsis as a presentational slot inside a feature-owned accessible disclosure once that pattern exists.`},{capability:`Pill, card, badge, avatar, and button-style breadcrumb examples`,reason:`These are composition or decoration examples, not independent breadcrumb semantics; dedicated variants would duplicate canonical surfaces and actions.`,replacement:`Compose Breadcrumb with canonical surface, Badge, Avatar, or Button owners when the surrounding workflow requires them.`}]},docs:{description:{component:`Hierarchical navigation that answers where the user is and provides safe return paths. The current page is non-interactive; collapsed levels must be paired with a separate accessible disclosure when the workflow needs them.`}}}},g={render:()=>(0,f.jsx)(c,{children:(0,f.jsxs)(u,{children:[(0,f.jsx)(o,{children:(0,f.jsx)(i,{href:`/clinic`,children:`Clinic`})}),(0,f.jsx)(a,{}),(0,f.jsx)(o,{children:(0,f.jsx)(i,{href:`/clinic/visits`,children:`Visits`})}),(0,f.jsx)(a,{}),(0,f.jsx)(o,{children:(0,f.jsx)(d,{children:`Visit 2048`})})]})}),play:async({canvasElement:e})=>{let t=m(e);await p(t.getByRole(`navigation`,{name:`Breadcrumb`})).toBeInTheDocument(),await p(t.getByText(`Visit 2048`)).toHaveAttribute(`aria-current`,`page`),await p(t.getAllByRole(`link`)).toHaveLength(2)}},_={render:()=>(0,f.jsx)(c,{label:`Visit navigation`,children:(0,f.jsxs)(u,{children:[(0,f.jsx)(o,{children:(0,f.jsx)(i,{href:`/clinic`,children:`Clinic`})}),(0,f.jsx)(a,{}),(0,f.jsx)(o,{children:(0,f.jsx)(s,{})}),(0,f.jsx)(a,{}),(0,f.jsx)(o,{children:(0,f.jsx)(i,{href:`/clinic/visits/2048/orders`,children:`Orders`})}),(0,f.jsx)(a,{}),(0,f.jsx)(o,{children:(0,f.jsx)(d,{children:`Complete blood count`})})]})})},v={render:()=>(0,f.jsx)(c,{children:(0,f.jsxs)(u,{children:[(0,f.jsx)(o,{children:(0,f.jsx)(i,{asChild:!0,children:(0,f.jsx)(`a`,{href:`/clinic`,children:`Clinic workspace`})})}),(0,f.jsx)(a,{children:`→`}),(0,f.jsx)(o,{children:(0,f.jsx)(i,{href:`/clinic/visits`,children:`Today's visits`})}),(0,f.jsx)(a,{children:(0,f.jsx)(n,{"aria-hidden":`true`})}),(0,f.jsx)(o,{children:(0,f.jsx)(d,{children:`Nguyễn Thị Bích Ngọc`})})]})})},y={render:()=>(0,f.jsx)(c,{children:(0,f.jsxs)(u,{children:[(0,f.jsx)(o,{children:(0,f.jsxs)(i,{href:`/clinic`,children:[(0,f.jsx)(r,{"aria-hidden":`true`}),`Clinic workspace`]})}),(0,f.jsx)(a,{}),(0,f.jsx)(o,{children:(0,f.jsx)(d,{children:`Patient identity`})})]})})},b={render:()=>(0,f.jsx)(`div`,{className:`w-full max-w-xs`,children:(0,f.jsx)(c,{label:`Patient record navigation`,children:(0,f.jsxs)(u,{children:[(0,f.jsx)(o,{children:(0,f.jsx)(i,{href:`/clinic`,children:`Phòng khám trung tâm`})}),(0,f.jsx)(a,{}),(0,f.jsx)(o,{children:(0,f.jsx)(i,{href:`/clinic/visits`,children:`Lịch khám hôm nay`})}),(0,f.jsx)(a,{}),(0,f.jsx)(o,{children:(0,f.jsx)(d,{children:`Phiếu xét nghiệm cần xác nhận`})})]})})})},x={render:()=>(0,f.jsx)(`div`,{className:`flex flex-col gap-4`,children:[`compact`,`cozy`,`comfortable`].map(e=>(0,f.jsxs)(`div`,{"data-density":e,className:`flex flex-col gap-1`,children:[(0,f.jsx)(c,{label:`Breadcrumb in ${e} density`,children:(0,f.jsxs)(u,{children:[(0,f.jsx)(o,{children:(0,f.jsx)(i,{href:`/clinic`,children:`Clinic`})}),(0,f.jsx)(a,{}),(0,f.jsx)(o,{children:(0,f.jsx)(d,{children:`Visit review`})})]})}),(0,f.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:e})]},e))})},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/clinic">Clinic</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/clinic/visits">Visits</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Visit 2048</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('navigation', {
      name: 'Breadcrumb'
    })).toBeInTheDocument();
    await expect(canvas.getByText('Visit 2048')).toHaveAttribute('aria-current', 'page');
    await expect(canvas.getAllByRole('link')).toHaveLength(2);
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumb label="Visit navigation">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/clinic">Clinic</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/clinic/visits/2048/orders">Orders</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Complete blood count</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <a href="/clinic">Clinic workspace</a>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>→</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/clinic/visits">Today&apos;s visits</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRightIcon aria-hidden="true" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Nguyễn Thị Bích Ngọc</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/clinic">
            <UserCircleIcon aria-hidden="true" />
            Clinic workspace
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Patient identity</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-xs">
      <Breadcrumb label="Patient record navigation">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/clinic">Phòng khám trung tâm</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/clinic/visits">Lịch khám hôm nay</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Phiếu xét nghiệm cần xác nhận</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      {(['compact', 'cozy', 'comfortable'] as const).map(density => <div key={density} data-density={density} className="flex flex-col gap-1">
          <Breadcrumb label={\`Breadcrumb in \${density} density\`}>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/clinic">Clinic</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Visit review</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <span className="text-xs text-muted-foreground">{density}</span>
        </div>)}
    </div>
}`,...x.parameters?.docs?.source}}},S=[`Default`,`LongPathWithEllipsis`,`CustomSeparatorAndAsChild`,`IconAware`,`MobileLongContent`,`DensityReference`]}))();export{v as CustomSeparatorAndAsChild,g as Default,x as DensityReference,y as IconAware,_ as LongPathWithEllipsis,b as MobileLongContent,S as __namedExportsOrder,h as default};