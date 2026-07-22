import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{t as n}from"./ui-C9kmmzkH.js";import{a as r,l as i,o as a}from"./date-range-picker-CVkMECHY.js";import{t as o}from"./button-B6_zsN5-.js";import{a as s}from"./collapsible-Cfc9M9oP.js";import{r as c,t as l}from"./readiness-data-D41RGqZh.js";var u,d,f,p,m,h,g,_=e((()=>{u=`_panel_e6rb8_1`,d=`_headerRow_e6rb8_8`,f=`_title_e6rb8_15`,p=`_description_e6rb8_21`,m=`_footerRow_e6rb8_28`,h=`_note_e6rb8_35`,g={panel:u,headerRow:d,title:f,description:p,footerRow:m,note:h}}));function v({onRestart:e}){return(0,y.jsxs)(r,{children:[(0,y.jsx)(i,{render:(0,y.jsx)(o,{size:`sm`,variant:`outline`,children:`Demo`})}),(0,y.jsx)(a,{"aria-label":`Demo controls`,initialFocus:!1,role:`dialog`,children:(0,y.jsxs)(`div`,{className:g.panel,children:[(0,y.jsxs)(`div`,{className:g.headerRow,children:[(0,y.jsx)(`span`,{className:g.title,children:`Demo controls`}),(0,y.jsx)(s,{size:`sm`,variant:`ai`,children:`Prototype`})]}),(0,y.jsx)(`p`,{className:g.description,children:`This scenario was selected at sign-in. Start again to test another one.`}),(0,y.jsxs)(`div`,{className:g.footerRow,children:[(0,y.jsx)(o,{onClick:e,size:`sm`,variant:`secondary`,children:`Choose another scenario`}),(0,y.jsx)(`p`,{className:g.note,children:`Clears demo-only browser state.`})]})]})})]})}var y,b=e((()=>{y=t(),n(),_(),v.__docgenInfo={description:``,methods:[],displayName:`DemoControlPanel`,props:{onRestart:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));function x(e){return T(e.ownerDocument.body)}var S,C,w,T,E,D,O,k;e((()=>{c(),b(),{expect:S,fn:C,userEvent:w,within:T}=__STORYBOOK_MODULE_TEST__,E={title:`Clinic/Shell/Demo Controls`,component:v,tags:[`autodocs`,`adapted-kura`],parameters:{layout:`centered`,kura:{readiness:l.flows,intake:{decision:`COMPOSE`,owner:`src/features/clinic-prototype`,evidence:`Presenter control for the prototype app header. Composed from Popover, Badge, and Button. Scenario selection remains owned by the onboarding phone registry; the app only clears the session and returns to the Door.`,exclusions:[`No product functionality — this is demo tooling and is labelled as such.`]},responsive:{strategy:[`FLUID`],minimumWidth:320},journeys:[`prototype-presenter-controls`]},docs:{description:{component:`The "Demo" popover restarts the onboarding-driven demo. It deliberately has no state selectors: every scenario begins at the Door with a registered phone.`}}},args:{onRestart:C()}},D={play:async({canvasElement:e})=>{let t=T(e);await S(t.getByRole(`button`,{name:`Demo`})).toBeVisible()}},O={play:async({canvasElement:e,args:t})=>{let n=T(e),r=x(e);await w.click(n.getByRole(`button`,{name:`Demo`})),await S(await r.findByText(`Demo controls`)).toBeVisible(),await S(r.getByText(`Prototype`)).toBeVisible(),await S(r.getByText(`Clears demo-only browser state.`)).toBeVisible(),await w.click(r.getByRole(`button`,{name:`Choose another scenario`})),await S(t.onRestart).toHaveBeenCalled()}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', {
      name: 'Demo'
    })).toBeVisible();
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const screen = body(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Demo'
    }));
    await expect(await screen.findByText('Demo controls')).toBeVisible();
    await expect(screen.getByText('Prototype')).toBeVisible();
    await expect(screen.getByText('Clears demo-only browser state.')).toBeVisible();
    await userEvent.click(screen.getByRole('button', {
      name: 'Choose another scenario'
    }));
    await expect(args.onRestart).toHaveBeenCalled();
  }
}`,...O.parameters?.docs?.source}}},k=[`Closed`,`OpenPanel`]}))();export{D as Closed,O as OpenPanel,k as __namedExportsOrder,E as default};