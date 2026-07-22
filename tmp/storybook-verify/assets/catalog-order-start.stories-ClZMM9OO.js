import{i as e}from"./preload-helper-MclHqJXp.js";import{n as t,t as n}from"./catalog-order-start-Baeh6V90.js";import{n as r,t as i}from"./storybook-metadata-Dck1yXxI.js";var a,o,s,c,l,u,d,f;e((()=>{t(),r(),{expect:a,fn:o,userEvent:s,within:c}=__STORYBOOK_MODULE_TEST__,l={title:`Clinic/Clinical/Lab Catalog/Order Start`,component:n,tags:[`autodocs`,`adapted-kura`],parameters:{kura:i},args:{selectedCount:2,canPlaceOrder:!0,onChoosePatient:o(),onVerifyLicence:o()}},u={},d={args:{canPlaceOrder:!1},play:async({args:e,canvasElement:t})=>{let n=c(t);await a(n.getByText(`Licence required to place orders`)).toBeVisible(),await a(n.getByRole(`button`,{name:`Choose patient`})).toBeDisabled(),await s.click(n.getByRole(`button`,{name:`Verify licence`})),await a(e.onVerifyLicence).toHaveBeenCalled()}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    canPlaceOrder: false
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Licence required to place orders')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'Choose patient'
    })).toBeDisabled();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Verify licence'
    }));
    await expect(args.onVerifyLicence).toHaveBeenCalled();
  }
}`,...d.parameters?.docs?.source}}},f=[`Ready`,`NewDoctorBlocked`]}))();export{d as NewDoctorBlocked,u as Ready,f as __namedExportsOrder,l as default};