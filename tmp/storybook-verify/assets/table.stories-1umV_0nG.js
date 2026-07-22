import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{G as n,J as r,K as i,W as a,X as o,Y as s,Z as c,q as l,t as u}from"./ui-C9kmmzkH.js";import{t as d}from"./button-B6_zsN5-.js";import{a as f}from"./collapsible-Cfc9M9oP.js";var p,m,h,g,_,v,y,b,x,S,C,w;e((()=>{p=t(),u(),{expect:m,userEvent:h,within:g}=__STORYBOOK_MODULE_TEST__,_={title:`Design System/Primitives/Table`,component:a,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`padded`,kura:{source:{vendor:`Kura`,registryItem:`table`,visualReference:`Kura table`},intake:{decision:`REUSE-AND-EXTEND`,owner:`src/components/ui`,evidence:`The canonical semantic Kura table keeps operational-list behavior while adopting Kura header, row, border, and density finish.`,exclusions:[`Dashboard cards, action menus, sorting, filtering, and selection models belong to composed tables or DataGrid.`,`Interactive rows keep a nested semantic action instead of turning tr into a button.`]},binding:{colors:`kura-semantic`,typography:`kura (tabular-nums on numeric columns)`,spacing:`kura`,radius:`kura`,elevation:`none (border separation)`,icons:`none`,motion:`none`,density:`kura-root-attribute + per-table density prop`,responsive:`horizontal scroll inside the table container, never the page`}},docs:{description:{component:`Semantic table for dense operational lists. Wide rows scroll inside the container; numeric columns use tabular numerals; rows can be interactive with visible selection.`}}}},v=[{code:`FZ-48210`,patient:`Sokha Chan`,tests:3,due:`$24.00`,status:`In progress`},{code:`KM-77031`,patient:`Lina Sroeun`,tests:1,due:`$8.50`,status:`Waiting`},{code:`QT-90227`,patient:`Vibol Keo`,tests:5,due:`$61.00`,status:`Done`}],y={args:{children:null},render:()=>(0,p.jsxs)(a,{children:[(0,p.jsx)(o,{children:(0,p.jsxs)(c,{children:[(0,p.jsx)(s,{children:`Code`}),(0,p.jsx)(s,{children:`Patient`}),(0,p.jsx)(s,{numeric:!0,children:`Tests`}),(0,p.jsx)(s,{numeric:!0,children:`Due`}),(0,p.jsx)(s,{children:`Status`})]})}),(0,p.jsx)(n,{children:v.map(e=>(0,p.jsxs)(c,{children:[(0,p.jsx)(l,{children:e.code}),(0,p.jsx)(l,{children:e.patient}),(0,p.jsx)(l,{numeric:!0,children:e.tests}),(0,p.jsx)(l,{numeric:!0,children:e.due}),(0,p.jsx)(l,{children:(0,p.jsx)(f,{variant:e.status===`Done`?`success`:e.status===`Waiting`?`neutral`:`info`,children:e.status})})]},e.code))}),(0,p.jsx)(i,{children:`3 bookings · Toul Kork Branch · today`})]}),play:async({canvasElement:e})=>{let t=g(e);await m(t.getByRole(`table`)).toBeVisible(),await m(t.getAllByRole(`row`)).toHaveLength(4)}},b={args:{children:null},render:()=>(0,p.jsxs)(a,{children:[(0,p.jsx)(o,{children:(0,p.jsxs)(c,{children:[(0,p.jsx)(s,{children:`Code`}),(0,p.jsx)(s,{children:`Patient`})]})}),(0,p.jsxs)(n,{children:[(0,p.jsxs)(c,{interactive:!0,children:[(0,p.jsx)(l,{children:(0,p.jsx)(d,{onClick:()=>void 0,size:`compact`,variant:`link`,children:`Open FZ-48210`})}),(0,p.jsx)(l,{children:`Sokha Chan`})]}),(0,p.jsxs)(c,{interactive:!0,selected:!0,children:[(0,p.jsx)(l,{children:(0,p.jsx)(d,{onClick:()=>void 0,size:`compact`,variant:`link`,children:`Open KM-77031`})}),(0,p.jsx)(l,{children:`Lina Sroeun`})]})]})]}),play:async({canvasElement:e})=>{let t=g(e).getByRole(`button`,{name:`Open FZ-48210`});await h.tab(),await m(t).toHaveFocus()}},x={args:{children:null},render:()=>(0,p.jsxs)(a,{children:[(0,p.jsx)(o,{children:(0,p.jsxs)(c,{children:[(0,p.jsx)(s,{children:`Service`}),(0,p.jsx)(s,{numeric:!0,children:`Items`}),(0,p.jsx)(s,{numeric:!0,children:`Amount`})]})}),(0,p.jsxs)(n,{children:[(0,p.jsxs)(c,{children:[(0,p.jsx)(l,{children:`Laboratory tests`}),(0,p.jsx)(l,{numeric:!0,children:`3`}),(0,p.jsx)(l,{numeric:!0,children:`$24.00`})]}),(0,p.jsxs)(c,{children:[(0,p.jsx)(l,{children:`Collection fee`}),(0,p.jsx)(l,{numeric:!0,children:`1`}),(0,p.jsx)(l,{numeric:!0,children:`$4.00`})]})]}),(0,p.jsx)(r,{children:(0,p.jsxs)(c,{children:[(0,p.jsx)(l,{children:`Total due`}),(0,p.jsx)(l,{numeric:!0,children:`4`}),(0,p.jsx)(l,{numeric:!0,children:`$28.00`})]})}),(0,p.jsx)(i,{children:`Booking FZ-48210 · patient-pay summary`})]})},S={args:{children:null},render:()=>(0,p.jsxs)(a,{density:`compact`,children:[(0,p.jsx)(o,{children:(0,p.jsxs)(c,{children:[(0,p.jsx)(s,{children:`Analyte`}),(0,p.jsx)(s,{numeric:!0,children:`Value`}),(0,p.jsx)(s,{numeric:!0,children:`Ref range`})]})}),(0,p.jsx)(n,{children:[[`Creatinine`,`3.86`,`0.51–0.95`],[`BUN`,`38`,`6–20`],[`Potassium`,`5.2`,`3.5–5.1`]].map(([e,t,n])=>(0,p.jsxs)(c,{children:[(0,p.jsx)(l,{children:e}),(0,p.jsx)(l,{numeric:!0,children:t}),(0,p.jsx)(l,{numeric:!0,children:n})]},e))})]})},C={args:{children:null},parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,p.jsxs)(a,{children:[(0,p.jsx)(o,{children:(0,p.jsx)(c,{children:[`Sample`,`Tube`,`Tests`,`Volume`,`Container`,`Priority`,`Status`].map(e=>(0,p.jsx)(s,{children:e},e))})}),(0,p.jsx)(n,{children:(0,p.jsxs)(c,{children:[(0,p.jsx)(l,{children:`104481920733`}),(0,p.jsx)(l,{children:`Lavender · EDTA`}),(0,p.jsx)(l,{children:`CBC, HbA1c`}),(0,p.jsx)(l,{numeric:!0,children:`4 mL`}),(0,p.jsx)(l,{children:`4 mL K₂ EDTA`}),(0,p.jsx)(l,{children:(0,p.jsx)(f,{variant:`danger`,children:`STAT`})}),(0,p.jsx)(l,{children:(0,p.jsx)(f,{variant:`neutral`,children:`Awaiting collection`})})]})}),(0,p.jsx)(i,{children:`Wide clinical rows scroll inside the table — the page never scrolls sideways.`})]})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Patient</TableHead>
          <TableHead numeric>Tests</TableHead>
          <TableHead numeric>Due</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => <TableRow key={row.code}>
            <TableCell>{row.code}</TableCell>
            <TableCell>{row.patient}</TableCell>
            <TableCell numeric>{row.tests}</TableCell>
            <TableCell numeric>{row.due}</TableCell>
            <TableCell>
              <Badge variant={row.status === 'Done' ? 'success' : row.status === 'Waiting' ? 'neutral' : 'info'}>
                {row.status}
              </Badge>
            </TableCell>
          </TableRow>)}
      </TableBody>
      <TableCaption>3 bookings · Toul Kork Branch · today</TableCaption>
    </Table>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('table')).toBeVisible();
    await expect(canvas.getAllByRole('row')).toHaveLength(4);
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Patient</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow interactive>
          <TableCell><Button onClick={() => undefined} size="compact" variant="link">Open FZ-48210</Button></TableCell>
          <TableCell>Sokha Chan</TableCell>
        </TableRow>
        <TableRow interactive selected>
          <TableCell><Button onClick={() => undefined} size="compact" variant="link">Open KM-77031</Button></TableCell>
          <TableCell>Lina Sroeun</TableCell>
        </TableRow>
      </TableBody>
    </Table>,
  play: async ({
    canvasElement
  }) => {
    const action = within(canvasElement).getByRole('button', {
      name: 'Open FZ-48210'
    });
    await userEvent.tab();
    await expect(action).toHaveFocus();
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service</TableHead>
          <TableHead numeric>Items</TableHead>
          <TableHead numeric>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow><TableCell>Laboratory tests</TableCell><TableCell numeric>3</TableCell><TableCell numeric>$24.00</TableCell></TableRow>
        <TableRow><TableCell>Collection fee</TableCell><TableCell numeric>1</TableCell><TableCell numeric>$4.00</TableCell></TableRow>
      </TableBody>
      <TableFooter>
        <TableRow><TableCell>Total due</TableCell><TableCell numeric>4</TableCell><TableCell numeric>$28.00</TableCell></TableRow>
      </TableFooter>
      <TableCaption>Booking FZ-48210 · patient-pay summary</TableCaption>
    </Table>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Table density="compact">
      <TableHeader>
        <TableRow>
          <TableHead>Analyte</TableHead>
          <TableHead numeric>Value</TableHead>
          <TableHead numeric>Ref range</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[['Creatinine', '3.86', '0.51–0.95'], ['BUN', '38', '6–20'], ['Potassium', '5.2', '3.5–5.1']].map(([name, value, range]) => <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell numeric>{value}</TableCell>
            <TableCell numeric>{range}</TableCell>
          </TableRow>)}
      </TableBody>
    </Table>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <Table>
      <TableHeader>
        <TableRow>
          {['Sample', 'Tube', 'Tests', 'Volume', 'Container', 'Priority', 'Status'].map(head => <TableHead key={head}>{head}</TableHead>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>104481920733</TableCell>
          <TableCell>Lavender · EDTA</TableCell>
          <TableCell>CBC, HbA1c</TableCell>
          <TableCell numeric>4 mL</TableCell>
          <TableCell>4 mL K₂ EDTA</TableCell>
          <TableCell>
            <Badge variant="danger">STAT</Badge>
          </TableCell>
          <TableCell>
            <Badge variant="neutral">Awaiting collection</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableCaption>Wide clinical rows scroll inside the table — the page never scrolls sideways.</TableCaption>
    </Table>
}`,...C.parameters?.docs?.source}}},w=[`Default`,`InteractiveRows`,`WithFooter`,`CompactDensity`,`MobileOverflow`]}))();export{S as CompactDensity,y as Default,b as InteractiveRows,C as MobileOverflow,x as WithFooter,w as __namedExportsOrder,_ as default};