import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{S as n,T as r,_ as i,g as a,k as o}from"./activity-ledger-Bx9EHPHU.js";import{a as s,i as c}from"./doctor-banking-5bnktGI2.js";import{n as l,t as u}from"./story-frame-T5OGBaiV.js";var d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E;e((()=>{d=t(),r(),s(),i(),l(),{expect:f,fn:p,userEvent:m,within:h}=__STORYBOOK_MODULE_TEST__,g={title:`Clinic/Finance/Earnings/Activity & Statements`,component:c,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`fullscreen`,kura:a},args:{data:n,downloadState:`idle`,state:`ready`,onDownload:p(),onBack:p(),onRetry:p()},render:e=>(0,d.jsx)(u,{children:(0,d.jsx)(c,{...e})})},_={play:async({canvasElement:e,args:t})=>{let n=h(e);await m.click(n.getByRole(`button`,{name:`PDF`})),await f(t.onDownload).toHaveBeenCalledWith(`pdf`),await f(n.getByText(`Financial notifications`)).toBeVisible()}},v={args:{data:o}},y={args:{downloadState:`loading`}},b={args:{downloadState:`error`}},x={args:{downloadState:`success`}},S={args:{data:{...n,entries:[],notifications:[]}}},C={args:{state:`loading`}},w={args:{state:`permission-denied`}},T={parameters:{viewport:{defaultViewport:`kura320`}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'PDF'
    }));
    await expect(args.onDownload).toHaveBeenCalledWith('pdf');
    await expect(canvas.getByText('Financial notifications')).toBeVisible();
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    data: redDoctorFixture
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    downloadState: 'loading'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    downloadState: 'error'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    downloadState: 'success'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    data: {
      ...doctorFixture,
      entries: [],
      notifications: []
    }
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'loading'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'permission-denied'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...T.parameters?.docs?.source}}},E=[`Default`,`FailedPullNotice`,`DownloadInProgress`,`DownloadFailure`,`DownloadSuccess`,`EmptyActivityAndNotifications`,`Loading`,`PermissionDenied`,`Mobile320`]}))();export{_ as Default,b as DownloadFailure,y as DownloadInProgress,x as DownloadSuccess,S as EmptyActivityAndNotifications,v as FailedPullNotice,C as Loading,T as Mobile320,w as PermissionDenied,E as __namedExportsOrder,g as default};