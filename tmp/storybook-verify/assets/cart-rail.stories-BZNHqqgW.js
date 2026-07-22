import{i as e}from"./preload-helper-MclHqJXp.js";import{r as t,t as n}from"./readiness-data-D41RGqZh.js";import{g as r,m as i}from"./demo-data-DZ0mjvYd.js";import{n as a,t as o}from"./cart-rail-CCEg0ERV.js";function s(){let e=i(`rail-ready`,12);return{...e,cart:{...e.cart,items:[{id:`CBC`,kind:`lab`,name:`Complete blood count`,priceMinor:`600`,currencyCode:`USD`,qty:1},{id:`LIPID`,kind:`lab`,name:`Lipid panel`,priceMinor:`1200`,currencyCode:`USD`,qty:1,fasting:!0}]}}}var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k;e((()=>{a(),r(),t(),{expect:c,fn:l,within:u}=__STORYBOOK_MODULE_TEST__,d={base:`USD`,quote:`KHR`,rateUnits:`4100`,rateScale:0},f={title:`Clinic/Front Desk/Cart Rail`,component:o,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`padded`,docs:{description:{component:`Backend-priced order summary for the Check-In Wizard. The Payment step owns tender selection, payment capture, and check-in confirmation.`}},kura:{readiness:n.frontDesk,intake:{decision:`DOMAIN-ADAPT + COMPOSE`,owner:`src/features/order-cart`,adapter:`src/features/front-desk/cart-rail.tsx`,level:`clinical-composite adapter`,composedFrom:[`OrderCart`],backend:`Priced lines use int64 minor-unit strings. The rail owns no order-placement, payment-capture, promo, insurance-settlement, or check-in transition.`},responsive:{strategy:[`FLUID`,`WRAPPING`,`STACKING`],minimumWidth:320},journeys:[`front-desk-order-review`,`front-desk-payment`]}},args:{patient:s(),fxRate:d,onRemoveItem:l(),onRetryPricing:l()}},p={play:async({canvasElement:e})=>{let t=u(e);await c(t.getByRole(`complementary`,{name:`Receptionist order summary`})).toBeVisible(),await c(t.getByLabelText(`2 tests selected`)).toBeVisible(),await c(t.getAllByText(`$18.00`)).toHaveLength(1),await c(t.queryByText(`Order total`)).not.toBeInTheDocument(),await c(t.getByText(`៛73,800`)).toBeVisible(),await c(t.queryByText(`Promo code`)).not.toBeInTheDocument(),await c(t.queryByRole(`button`,{name:/check in/i})).not.toBeInTheDocument()}},m={args:{patient:i(`rail-empty`,13)},play:async({canvasElement:e})=>{await c(u(e).getByText(`Nothing here yet`)).toBeVisible()}},h={args:{pricingStatus:`loading`}},g={args:{pricingStatus:`error`},play:async({canvasElement:e})=>{let t=u(e);await c(t.getByRole(`alert`)).toBeVisible(),await c(t.getByRole(`button`,{name:`Retry pricing`})).toBeVisible()}},_={args:{patient:{...s(),cart:{...s().cart,payment:{...s().cart.payment,status:`confirmed`,method:`cash`,amountMinor:`1800`,changeMinor:`200`,receiptId:`CAP-58213`,confirmedAt:`2026-07-16T09:42:00Z`}}},readOnly:!0}},v={args:{patient:{...s(),cart:{...s().cart,payment:{...s().cart.payment,supplementalDue:!0,previousReceiptId:`CAP-58213`,previousPaidAmountMinor:`600`}}}},play:async({canvasElement:e})=>{let t=u(e);await c(t.getByRole(`complementary`,{name:`Receptionist order summary`})).toBeVisible(),await c(t.getAllByText(`Added after payment`)).toHaveLength(2),await c(t.getByText(/Previously paid \(CAP-58213\)/)).toBeVisible(),await c(t.queryByRole(`button`,{name:`Set up payment`})).not.toBeInTheDocument(),await c(t.queryByRole(`button`,{name:`Confirm payment & check in`})).not.toBeInTheDocument()}},y={args:{status:`placed`,readOnly:!0},play:async({canvasElement:e})=>{let t=u(e);await c(t.queryByRole(`button`,{name:/Remove/})).not.toBeInTheDocument()}},b={args:{status:`cancelled`,readOnly:!0}},x={args:{patient:{...s(),cart:{...s().cart,items:[{id:`CMP-LIPID-THYROID-REFLEX`,kind:`lab`,name:`Comprehensive metabolic panel with lipid profile and thyroid cascade reflex`,priceMinor:`4250`,currencyCode:`USD`,qty:1,fasting:!0}]}}}},S={args:{patient:s()},globals:{viewport:{value:`kura320`}}},C={globals:{viewport:{value:`kura360`}}},w={args:{patient:s()},globals:{viewport:{value:`kura390`}}},T={globals:{viewport:{value:`kura412`}}},E={globals:{viewport:{value:`kura480`}}},D={globals:{viewport:{value:`kura768`}}},O={globals:{viewport:{value:`kura1024`}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('complementary', {
      name: 'Receptionist order summary'
    })).toBeVisible();
    await expect(canvas.getByLabelText('2 tests selected')).toBeVisible();
    // Compact rule: the subtotal row only appears when it differs from the
    // amount due, so the hero figure is the single $18.00 on screen.
    await expect(canvas.getAllByText('$18.00')).toHaveLength(1);
    await expect(canvas.queryByText('Order total')).not.toBeInTheDocument();
    await expect(canvas.getByText('៛73,800')).toBeVisible();
    await expect(canvas.queryByText('Promo code')).not.toBeInTheDocument();
    await expect(canvas.queryByRole('button', {
      name: /check in/i
    })).not.toBeInTheDocument();
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    patient: blankWalkIn('rail-empty', 13)
  },
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).getByText('Nothing here yet')).toBeVisible();
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    pricingStatus: 'loading'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    pricingStatus: 'error'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('alert')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Retry pricing'
    })).toBeVisible();
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    patient: {
      ...patientWithItems(),
      cart: {
        ...patientWithItems().cart,
        payment: {
          ...patientWithItems().cart.payment,
          status: 'confirmed',
          method: 'cash',
          amountMinor: '1800',
          changeMinor: '200',
          receiptId: 'CAP-58213',
          confirmedAt: '2026-07-16T09:42:00Z'
        }
      }
    },
    readOnly: true
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    patient: {
      ...patientWithItems(),
      cart: {
        ...patientWithItems().cart,
        payment: {
          ...patientWithItems().cart.payment,
          supplementalDue: true,
          previousReceiptId: 'CAP-58213',
          previousPaidAmountMinor: '600'
        }
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('complementary', {
      name: 'Receptionist order summary'
    })).toBeVisible();
    await expect(canvas.getAllByText('Added after payment')).toHaveLength(2);
    await expect(canvas.getByText(/Previously paid \\(CAP-58213\\)/)).toBeVisible();
    await expect(canvas.queryByRole('button', {
      name: 'Set up payment'
    })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('button', {
      name: 'Confirm payment & check in'
    })).not.toBeInTheDocument();
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'placed',
    readOnly: true
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('button', {
      name: /Remove/
    })).not.toBeInTheDocument();
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'cancelled',
    readOnly: true
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    patient: {
      ...patientWithItems(),
      cart: {
        ...patientWithItems().cart,
        items: [{
          id: 'CMP-LIPID-THYROID-REFLEX',
          kind: 'lab',
          name: 'Comprehensive metabolic panel with lipid profile and thyroid cascade reflex',
          priceMinor: '4250',
          currencyCode: 'USD',
          qty: 1,
          fasting: true
        }]
      }
    }
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    patient: patientWithItems()
  },
  globals: {
    viewport: {
      value: 'kura320'
    }
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  globals: {
    viewport: {
      value: 'kura360'
    }
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    patient: patientWithItems()
  },
  globals: {
    viewport: {
      value: 'kura390'
    }
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  globals: {
    viewport: {
      value: 'kura412'
    }
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  globals: {
    viewport: {
      value: 'kura480'
    }
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  globals: {
    viewport: {
      value: 'kura768'
    }
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  globals: {
    viewport: {
      value: 'kura1024'
    }
  }
}`,...O.parameters?.docs?.source}}},k=[`Building`,`Empty`,`PricingLoading`,`PricingError`,`Paid`,`Supplemental`,`PlacedReadOnly`,`Cancelled`,`LongContent`,`MobileNarrow320`,`Mobile360`,`MobileInteractive390`,`Mobile412`,`Mobile480`,`Tablet768`,`Desktop1024`]}))();export{p as Building,b as Cancelled,O as Desktop1024,m as Empty,x as LongContent,C as Mobile360,T as Mobile412,E as Mobile480,w as MobileInteractive390,S as MobileNarrow320,_ as Paid,y as PlacedReadOnly,g as PricingError,h as PricingLoading,v as Supplemental,D as Tablet768,k as __namedExportsOrder,f as default};