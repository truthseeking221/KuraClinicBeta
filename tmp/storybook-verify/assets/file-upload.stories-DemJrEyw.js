import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{Vt as i,t as a}from"./ui-C9kmmzkH.js";function o(){let[e,t]=(0,c.useState)([{id:`failed`,error:`The connection ended before the upload completed.`,name:`insurance-authorisation.pdf`,size:64e4,status:`error`,type:`application/pdf`}]);return(0,s.jsx)(i,{accept:`application/pdf`,label:`Insurance authorisation`,maxFiles:1,onRetry:e=>t(t=>t.map(t=>t.id===e.id?{...t,error:void 0,progress:0,status:`uploading`}:t)),onValueChange:t,value:e})}var s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E;t((()=>{s=r(),c=e(n()),a(),{createEvent:l,expect:u,fireEvent:d,userEvent:f,within:p}=__STORYBOOK_MODULE_TEST__,m={title:`Design System/Components/File Upload`,component:i,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`centered`,kura:{source:{vendor:`Kura`,registryItem:`file-upload`,visualReference:`Kura file-upload`,familySize:10},intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`Kura had upload icons and an Empty State example but no accessible file selection, drag/drop, validation, progress or file-list owner.`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura-control-and-panel`,elevation:`none`,icons:`kura-canonical`,responsive:`stacking`},exclusions:[{capability:`Avatar and cover replacement`,reason:`These require profile permissions, cropping, image moderation and save/cancel semantics; compose File Upload in the owning feature.`},{capability:`Sortable gallery`,reason:`Ordering needs keyboard reordering, persisted rank and undo. It is not part of basic file selection.`},{capability:`Table file manager`,replacement:`Compose File Upload state with the canonical Table or Data Grid when metadata comparison is required.`}]}},args:{label:`Attach referral documents`,description:`PDF or image, up to 5 MB each. Do not attach unrelated patient records.`,accept:`application/pdf,image/*`,maxFiles:3,maxSize:5*1024*1024}},h={args:{maxFiles:1},play:async({canvasElement:e})=>{let t=p(e),n=t.getByLabelText(`Attach referral documents`);await f.upload(n,new File([`referral`],`referral-letter.pdf`,{type:`application/pdf`})),await u(t.getByText(`referral-letter.pdf`)).toBeVisible(),await f.click(t.getByRole(`button`,{name:`Remove referral-letter.pdf`})),await u(t.getByText(`No files attached.`)).toBeVisible()}},g={args:{maxFiles:4,multiple:!0}},_={args:{maxFiles:2,multiple:!0},play:async({canvasElement:e})=>{let t=p(e),n=e.querySelector(`[data-slot="file-upload-dropzone"]`),r=new File([`referral`],`referral-drop.pdf`,{type:`application/pdf`}),i=l.drop(n);Object.defineProperty(i,"dataTransfer",{value:{files:[r]}}),await d(n,i),await u(t.getByText(`referral-drop.pdf`)).toBeVisible()}},v={args:{accept:`image/*`,label:`Attach wound assessment images`,description:`Images remain draft attachments until the clinician saves the assessment. Patient consent is handled by the owning workflow.`,maxFiles:4,multiple:!0}},y=[{id:`uploading`,name:`external-lab-report.pdf`,size:845e3,type:`application/pdf`,status:`uploading`,progress:64},{id:`complete`,name:`referral-letter.pdf`,size:285e3,type:`application/pdf`,status:`complete`}],b={args:{defaultValue:y,maxFiles:3},play:async({canvasElement:e})=>{await u(p(e).getByRole(`progressbar`,{name:`Upload progress for external-lab-report.pdf`})).toHaveValue(64)}},x={render:()=>(0,s.jsx)(o,{}),play:async({canvasElement:e})=>{let t=p(e);await f.click(t.getByRole(`button`,{name:`Retry insurance-authorisation.pdf`})),await u(t.getByRole(`progressbar`,{name:`Upload progress for insurance-authorisation.pdf`})).toHaveValue(0)}},S={args:{accept:`application/pdf`,maxFiles:1,maxSize:10},play:async({canvasElement:e})=>{let t=p(e);await f.upload(t.getByLabelText(`Attach referral documents`),new File([`this file is too large`],`oversize.pdf`,{type:`application/pdf`}),{applyAccept:!1}),await u(t.getByText(`Some files were not added`)).toBeVisible()}},C={args:{defaultValue:[y[1]],description:`Uploaded by Reception on 16 Jul 2026 at 09:42 ICT.`,readOnly:!0}},w={args:{disabled:!0,description:`Attachments are unavailable after the consultation is archived.`}},T={args:{label:`Attach a photo of the referral`,maxFiles:2,multiple:!0},parameters:{viewport:{defaultViewport:`kura320`}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    maxFiles: 1
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Attach referral documents');
    await userEvent.upload(input, new File(['referral'], 'referral-letter.pdf', {
      type: 'application/pdf'
    }));
    await expect(canvas.getByText('referral-letter.pdf')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Remove referral-letter.pdf'
    }));
    await expect(canvas.getByText('No files attached.')).toBeVisible();
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    maxFiles: 4,
    multiple: true
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    maxFiles: 2,
    multiple: true
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const dropzone = canvasElement.querySelector('[data-slot="file-upload-dropzone"]');
    const file = new File(['referral'], 'referral-drop.pdf', {
      type: 'application/pdf'
    });
    const dropEvent = createEvent.drop(dropzone as HTMLElement);
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: {
        files: [file]
      }
    });
    await fireEvent(dropzone as HTMLElement, dropEvent);
    await expect(canvas.getByText('referral-drop.pdf')).toBeVisible();
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    accept: 'image/*',
    label: 'Attach wound assessment images',
    description: 'Images remain draft attachments until the clinician saves the assessment. Patient consent is handled by the owning workflow.',
    maxFiles: 4,
    multiple: true
  }
}`,...v.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: progressFiles,
    maxFiles: 3
  },
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).getByRole('progressbar', {
      name: 'Upload progress for external-lab-report.pdf'
    })).toHaveValue(64);
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <RetryExample />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Retry insurance-authorisation.pdf'
    }));
    await expect(canvas.getByRole('progressbar', {
      name: 'Upload progress for insurance-authorisation.pdf'
    })).toHaveValue(0);
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    accept: 'application/pdf',
    maxFiles: 1,
    maxSize: 10
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.upload(canvas.getByLabelText('Attach referral documents'), new File(['this file is too large'], 'oversize.pdf', {
      type: 'application/pdf'
    }), {
      applyAccept: false
    });
    await expect(canvas.getByText('Some files were not added')).toBeVisible();
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: [progressFiles[1]],
    description: 'Uploaded by Reception on 16 Jul 2026 at 09:42 ICT.',
    readOnly: true
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    description: 'Attachments are unavailable after the consultation is archived.'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Attach a photo of the referral',
    maxFiles: 2,
    multiple: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...T.parameters?.docs?.source}}},E=[`Basic`,`MultipleFiles`,`DragAndDrop`,`ImageGallerySelection`,`UploadProgress`,`FailedWithRetry`,`ValidationError`,`ReadOnly`,`Disabled`,`MobileInteractive`]}))();export{h as Basic,w as Disabled,_ as DragAndDrop,x as FailedWithRetry,v as ImageGallerySelection,T as MobileInteractive,g as MultipleFiles,C as ReadOnly,b as UploadProgress,S as ValidationError,E as __namedExportsOrder,m as default};