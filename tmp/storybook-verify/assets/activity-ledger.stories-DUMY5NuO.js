import{i as e}from"./preload-helper-MclHqJXp.js";import{T as t,_ as n,g as r,n as i,t as a,v as o}from"./activity-ledger-Bx9EHPHU.js";var s,c,l,u,d,f,p,m,h,g,_,v,y;e((()=>{i(),t(),n(),{expect:s,fireEvent:c,fn:l,userEvent:u,within:d}=__STORYBOOK_MODULE_TEST__,f={title:`Clinic/Finance/Earnings/Activity Ledger`,component:a,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:r,docs:{description:{component:`Shared ledger section behind Earnings Overview, Activity & statements, and the admin doctor ledger. The full variant searches and filters; the recent variant shows the six newest entries and defers everything else to Activity & statements.`}}},args:{entries:o,state:`ready`}},p={play:async({canvasElement:e})=>{let t=d(e);await s(t.getByLabelText(`Search activity`)).toBeVisible(),await s(t.getByRole(`table`,{name:`Earnings activity`})).toBeVisible()}},m={args:{variant:`recent`,entries:[...o].reverse(),onViewAll:l()},play:async({canvasElement:e,args:t})=>{let n=d(e),r=d(n.getByRole(`table`,{name:`Earnings activity`})).getAllByRole(`row`);await s(r).toHaveLength(7),await s(d(r[1]).getByText(`Consultation completed`)).toBeVisible(),await s(n.queryByLabelText(`Search activity`)).not.toBeInTheDocument(),await u.click(n.getByRole(`button`,{name:`View all`})),await s(t.onViewAll).toHaveBeenCalled()}},h={args:{variant:`recent`,entries:[],onViewAll:l()},play:async({canvasElement:e})=>{await s(d(e).getByText(`No activity yet`)).toBeVisible()}},g={play:async({canvasElement:e})=>{let t=d(e),n=d(e.ownerDocument.body);await u.click(t.getByRole(`button`,{name:`Dates`}));let r=await n.findByLabelText(`From`);await c.change(r,{target:{value:`2026-07-15`}}),await s(await t.findByRole(`button`,{name:`From 15 Jul`})).toBeVisible(),await s(await n.findByRole(`button`,{name:`Clear dates`})).toBeVisible()}},_={play:async({canvasElement:e})=>{let t=d(e);await u.click(t.getByRole(`button`,{name:`Go to next page`}));let n=(await t.findByText(`Reservation released`)).closest(`tr`);await s(d(n).getByText(`Voided`)).toBeVisible()}},v={parameters:{viewport:{defaultViewport:`kura320`}},play:async({canvasElement:e})=>{let t=d(e);await s(t.getByRole(`button`,{name:`Dates`})).toBeVisible(),await s(t.getByRole(`table`,{name:`Earnings activity`})).toBeVisible()}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Search activity')).toBeVisible();
    await expect(canvas.getByRole('table', {
      name: 'Earnings activity'
    })).toBeVisible();
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'recent',
    entries: [...activityEntries].reverse(),
    onViewAll: fn()
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const rows = within(canvas.getByRole('table', {
      name: 'Earnings activity'
    })).getAllByRole('row');
    await expect(rows).toHaveLength(7);
    await expect(within(rows[1]).getByText('Consultation completed')).toBeVisible();
    await expect(canvas.queryByLabelText('Search activity')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: 'View all'
    }));
    await expect(args.onViewAll).toHaveBeenCalled();
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'recent',
    entries: [],
    onViewAll: fn()
  },
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).getByText('No activity yet')).toBeVisible();
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Dates'
    }));
    const from = await screen.findByLabelText('From');
    await fireEvent.change(from, {
      target: {
        value: '2026-07-15'
      }
    });
    await expect(await canvas.findByRole('button', {
      name: 'From 15 Jul'
    })).toBeVisible();
    await expect(await screen.findByRole('button', {
      name: 'Clear dates'
    })).toBeVisible();
  }
}`,...g.parameters?.docs?.source},description:{story:`Date range lives in a popover; the trigger reports the active range.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Go to next page'
    }));
    const row = (await canvas.findByText('Reservation released')).closest('tr');
    await expect(within(row!).getByText('Voided')).toBeVisible();
  }
}`,..._.parameters?.docs?.source},description:{story:`Quiet states: settled is plain text; voided keeps a badge and a struck amount.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Dates'
    })).toBeVisible();
    await expect(canvas.getByRole('table', {
      name: 'Earnings activity'
    })).toBeVisible();
  }
}`,...v.parameters?.docs?.source},description:{story:`320px: search takes its own row; the wide ledger scrolls horizontally.`,...v.parameters?.docs?.description}}},y=[`Full`,`Recent`,`RecentEmpty`,`DateRange`,`StateTreatment`,`FullMobile320`]}))();export{g as DateRange,p as Full,v as FullMobile320,m as Recent,h as RecentEmpty,_ as StateTreatment,y as __namedExportsOrder,f as default};