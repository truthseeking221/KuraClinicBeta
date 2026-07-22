import{i as e}from"./preload-helper-MclHqJXp.js";import{n as t,t as n}from"./money-text-DwvxiUCm.js";var r,i,a,o,s,c,l,u;e((()=>{t(),{expect:r,within:i}=__STORYBOOK_MODULE_TEST__,a={title:`Design System/Primitives/Money Text`,component:n,tags:[`autodocs`,`adapted-kura`],parameters:{kura:{owner:`src/components/ui`,level:`primitive`,contract:`Universal exponent-2 wire value renderer. USD displays two decimals; KHR displays whole riels.`}},args:{minor:`1500`,currency:`USD`}},o={play:async({canvasElement:e})=>{await r(i(e).getByText(`$15.00`)).toBeVisible()}},s={args:{minor:`6150000`,currency:`KHR`},play:async({canvasElement:e})=>{await r(i(e).getByText(`៛61,500`)).toBeVisible()}},c={args:{minor:`123456789`,currency:`USD`}},l={args:{minor:`15.00`,currency:`USD`},play:async({canvasElement:e})=>{await r(i(e).getByText(`—`)).toBeVisible()}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).getByText('$15.00')).toBeVisible();
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    minor: '6150000',
    currency: 'KHR'
  },
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).getByText('៛61,500')).toBeVisible();
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    minor: '123456789',
    currency: 'USD'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    minor: '15.00',
    currency: 'USD'
  },
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).getByText('—')).toBeVisible();
  }
}`,...l.parameters?.docs?.source}}},u=[`Usd`,`Khr`,`LargeAmount`,`MalformedWireValue`]}))();export{s as Khr,c as LargeAmount,l as MalformedWireValue,o as Usd,u as __namedExportsOrder,a as default};