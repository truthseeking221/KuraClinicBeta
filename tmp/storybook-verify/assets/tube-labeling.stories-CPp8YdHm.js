import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{r as i,t as a}from"./readiness-data-D41RGqZh.js";import{n as o,t as s}from"./tube-labeling-CW5SV4Xb.js";function c({initialMethod:e=`sticker`}){let[t,n]=(0,u.useState)(e),[r,i]=(0,u.useState)({applied:!1,readable:!1,photographed:!1});return(0,l.jsx)(s,{method:t,onConfirm:()=>{},onMethodChange:n,onPhotoChecksChange:i,patientLabelLine:`SOK · M · 1994`,photoChecks:r,tubeKeys:m})}var l,u,d,f,p,m,h,g,_,v,y,b,x;t((()=>{l=r(),u=e(n()),i(),o(),{expect:d,userEvent:f,within:p}=__STORYBOOK_MODULE_TEST__,m=[`red`,`gold-sst`,`green`,`lavender`],h={title:`Clinic/Collection/Tube Labeling`,component:s,tags:[`autodocs`,`source-figma`,`adapted-kura`],args:{method:`sticker`,onConfirm:()=>{},onMethodChange:()=>{},onPhotoChecksChange:()=>{},patientLabelLine:`SOK · M · 1994`,photoChecks:{applied:!1,readable:!1,photographed:!1},tubeKeys:m},parameters:{layout:`padded`,kura:{readiness:a.collection,source:{figma:`https://www.figma.com/design/yWz269PzVjFQquJa1U1M0s/Kura-Design?node-id=1485-93177`,node:`1485:93177`},intake:{decision:`CREATE`,owner:`src/features/collection`,evidence:`No Kura surface covers labelling after a self-draw. The legacy phlebotomy kiosk had a "Print barcode labels" button with no handler at all.`,exclusions:[`Tube stoppers reuse the CLSI catalog colours already owned by Collection; no new specimen vocabulary.`,`The sticker route asks for photo confirmation rather than uploading a file: the platform has no attachment contract for specimen evidence.`,"The self-draw lane maps to the backend `tube_pickup` booking type, which shipped guards currently reject — this is design intent, not live capability."]},composes:[`Card`,`RadioGroup`,`Radio`,`Checkbox`,`Badge`,`Button`]},docs:{description:{component:`After a doctor draws blood in the room, the label is the only thing tying the tubes to the order — no wristband was scanned and no desk checked the patient in. A printed Kura sticker keeps that link machine-readable; handwriting stays available for a clinic without stickers and carries a photo check instead, because nothing downstream can verify a pen stroke.`}}}},g={render:()=>(0,l.jsx)(c,{}),play:async({canvasElement:e})=>{let t=p(e);await d(t.getByText(`4 samples collected`)).toBeVisible(),await d(t.getByText(`Recommended`)).toBeVisible(),await d(t.getByRole(`button`,{name:`I have labelled all 4 tubes`})).toBeDisabled()}},_={render:()=>(0,l.jsx)(c,{}),play:async({canvasElement:e})=>{let t=p(e);for(let e of[`A Kura sticker is on every tube`,`The name and date read clearly in the photo`,`Photo of the labelled tubes attached to the order`])await f.click(t.getByRole(`checkbox`,{name:e}));await d(t.getByRole(`button`,{name:`I have labelled all 4 tubes`})).toBeEnabled()}},v={render:()=>(0,l.jsx)(c,{initialMethod:`pen`}),parameters:{docs:{description:{story:`The template is what the operator copies onto each tube: surname, sex, birth year — enough to match a tube to one person without printing the record on it.`}}},play:async({canvasElement:e})=>{let t=p(e);await d(t.getByText(`SOK · M · 1994`)).toBeVisible(),await d(t.getByRole(`button`,{name:`I have labelled all 4 tubes`})).toBeEnabled()}},y={render:function(){let[e,t]=(0,u.useState)(`pen`);return(0,l.jsx)(s,{method:e,onConfirm:()=>{},onMethodChange:t,onPhotoChecksChange:()=>{},patientLabelLine:`SOK · M · 1994`,photoChecks:{applied:!1,readable:!1,photographed:!1},tubeKeys:[`lavender`]})},play:async({canvasElement:e})=>{let t=p(e);await d(t.getByText(`1 sample collected`)).toBeVisible(),await d(t.getByRole(`button`,{name:`I have labelled the tube`})).toBeEnabled()}},b={render:()=>(0,l.jsx)(c,{}),parameters:{viewport:{defaultViewport:`kura320`}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Harness />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('4 samples collected')).toBeVisible();
    await expect(canvas.getByText('Recommended')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'I have labelled all 4 tubes'
    })).toBeDisabled();
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <Harness />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    for (const label of ['A Kura sticker is on every tube', 'The name and date read clearly in the photo', 'Photo of the labelled tubes attached to the order']) {
      await userEvent.click(canvas.getByRole('checkbox', {
        name: label
      }));
    }
    await expect(canvas.getByRole('button', {
      name: 'I have labelled all 4 tubes'
    })).toBeEnabled();
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Harness initialMethod="pen" />,
  parameters: {
    docs: {
      description: {
        story: 'The template is what the operator copies onto each tube: surname, sex, birth year — enough to match a tube to one person without printing the record on it.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('SOK · M · 1994')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'I have labelled all 4 tubes'
    })).toBeEnabled();
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: function SingleTubeHarness() {
    const [method, setMethod] = useState<TubeLabelMethod>('pen');
    return <TubeLabeling method={method} onConfirm={() => {}} onMethodChange={setMethod} onPhotoChecksChange={() => {}} patientLabelLine="SOK · M · 1994" photoChecks={{
      applied: false,
      readable: false,
      photographed: false
    }} tubeKeys={['lavender']} />;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('1 sample collected')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: 'I have labelled the tube'
    })).toBeEnabled();
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Harness />,
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  }
}`,...b.parameters?.docs?.source}}},x=[`StickerRoute`,`StickerRouteConfirmed`,`HandwrittenRoute`,`SingleTube`,`Mobile320`]}))();export{v as HandwrittenRoute,b as Mobile320,y as SingleTube,g as StickerRoute,_ as StickerRouteConfirmed,x as __namedExportsOrder,h as default};