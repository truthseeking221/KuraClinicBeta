import{i as e}from"./preload-helper-MclHqJXp.js";import{r as t,t as n}from"./readiness-data-D41RGqZh.js";import{n as r,t as i}from"./payment-receipt-B48MeRp8.js";var a,o,s,c,l,u,d,f,p,m,h,g,_;e((()=>{r(),t(),{expect:a,fn:o,userEvent:s,within:c}=__STORYBOOK_MODULE_TEST__,l=[{id:`hba1c`,kind:`lab`,name:`HbA1c`,priceMinor:`900`,currencyCode:`USD`,qty:1},{id:`lipid`,kind:`lab`,name:`Lipid panel`,priceMinor:`1200`,currencyCode:`USD`,qty:1}],u={status:`confirmed`,method:`cash`,tendered:`25`,changeMinor:`400`,receiptId:`R-58213`,confirmedAt:`09:42`,amountMinor:`2100`,cashier:`Linh Nguyen`},d={title:`Clinic/Front Desk/Payment Receipt`,component:i,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`padded`,kura:{readiness:n.frontDesk,contract:{status:`design-target`,backendMapping:`partial`,note:`Mirrors the cash capture contract: amount is the server-derived capture (state=paid, branch-attested). Print/SMS/Telegram delivery and a receipt read-model are not backend capabilities today — the artifact is the evidence shape the truth pack requires.`},intake:{decision:`FEATURE-OWN`,owner:`src/features/front-desk`,evidence:`Legacy PrintReceipt.js produced an A4 bill with barcode/QR; this rebuild keeps the evidence contract (immutability, supplemental/void chain, branch attestation) and composes canonical Card, Badge, Button, MoneyText.`,exclusions:[`A4 print layout, Code128/QR rendering, numToWords, SMS/Email/Telegram delivery`]},journeys:[`FIN-01-cash-collection`,`CASE-FIN receipt evidence`]},docs:{description:{component:`Immutable payment evidence. A paid-edit issues a supplemental receipt referencing the original; a void keeps the original readable with a voided marker. The amount is the server-derived capture amount — never desk-entered.`}}},args:{patientName:`Dara Phan`,items:l,payment:u,branchLabel:`Branch BKK1`,onPrint:o()}},f={play:async({canvasElement:e,args:t})=>{let n=c(e);await a(n.getByText(`Receipt R-58213`)).toBeVisible(),await a(n.getByText(`Paid`)).toBeVisible(),await a(n.getByText(`$21.00`)).toBeVisible(),await a(n.getByText(/09:42 · Linh Nguyen · Branch BKK1/)).toBeVisible(),await a(n.getByText(/Receipts are immutable evidence/)).toBeVisible(),await s.click(n.getByRole(`button`,{name:`Print receipt`})),await a(t.onPrint).toHaveBeenCalled()}},p={args:{payment:{...u,receiptId:`R-58214`,supplementalDue:!0,previousReceiptId:`R-58213`,previousPaidAmountMinor:`2100`,amountMinor:`600`},items:[...l,{id:`cbc`,kind:`lab`,name:`CBC`,priceMinor:`600`,currencyCode:`USD`,qty:1}]},play:async({canvasElement:e})=>{let t=c(e);await a(t.getByText(`Supplemental due`)).toBeVisible(),await a(t.getByText(/Receipt R-58213 —/)).toBeVisible(),await a(t.getByText(/already\s+paid/)).toBeVisible()}},m={args:{voided:!0},play:async({canvasElement:e})=>{let t=c(e);await a(t.getByText(`Voided`)).toBeVisible(),await a(t.queryByRole(`button`,{name:`Print receipt`})).not.toBeInTheDocument()}},h={globals:{viewport:{value:`kura320`}}},g={globals:{theme:`dark`}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Receipt R-58213')).toBeVisible();
    await expect(canvas.getByText('Paid')).toBeVisible();
    await expect(canvas.getByText('$21.00')).toBeVisible();
    await expect(canvas.getByText(/09:42 · Linh Nguyen · Branch BKK1/)).toBeVisible();
    await expect(canvas.getByText(/Receipts are immutable evidence/)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Print receipt'
    }));
    await expect(args.onPrint).toHaveBeenCalled();
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    payment: {
      ...PAID,
      receiptId: 'R-58214',
      supplementalDue: true,
      previousReceiptId: 'R-58213',
      previousPaidAmountMinor: '2100',
      amountMinor: '600'
    },
    items: [...ITEMS, {
      id: 'cbc',
      kind: 'lab',
      name: 'CBC',
      priceMinor: '600',
      currencyCode: 'USD',
      qty: 1
    }]
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Supplemental due')).toBeVisible();
    await expect(canvas.getByText(/Receipt R-58213 —/)).toBeVisible();
    await expect(canvas.getByText(/already\\s+paid/)).toBeVisible();
  }
}`,...p.parameters?.docs?.source},description:{story:`A paid-edit adjustment: the new receipt references the original, never edits it.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    voided: true
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Voided')).toBeVisible();
    // No print action on voided evidence; the artifact is read-only history.
    await expect(canvas.queryByRole('button', {
      name: 'Print receipt'
    })).not.toBeInTheDocument();
  }
}`,...m.parameters?.docs?.source},description:{story:`Voided evidence stays readable — history is never deleted.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  globals: {
    viewport: {
      value: 'kura320'
    }
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  globals: {
    theme: 'dark'
  }
}`,...g.parameters?.docs?.source}}},_=[`Paid`,`SupplementalChain`,`VoidedEvidence`,`Mobile`,`DarkTheme`]}))();export{g as DarkTheme,h as Mobile,f as Paid,p as SupplementalChain,m as VoidedEvidence,_ as __namedExportsOrder,d as default};