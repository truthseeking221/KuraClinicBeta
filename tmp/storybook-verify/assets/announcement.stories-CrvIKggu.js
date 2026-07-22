import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{Q as i,jt as a}from"./provider-marks-BeHzyBjc.js";import{Nr as o,t as s}from"./ui-C9kmmzkH.js";import{t as c}from"./button-B6_zsN5-.js";var l,u,d=t((()=>{l=`_sidebar_z4e7h_1`,u={sidebar:l}})),f,p,m,h,g,_,v,y,b,x,S,C;t((()=>{f=r(),p=e(n()),s(),d(),{expect:m,userEvent:h,within:g}=__STORYBOOK_MODULE_TEST__,_={title:`Design System/Components/Announcement`,component:o,args:{title:`Keep your workspace secure`},tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`The source and Storybook search found Alert for persistent status and Toast for transient feedback, but neither owns a compact optional sidebar prompt with self-dismissal and one follow-up action.`},source:{vendor:`Kura`,registryItem:`announcement`,visualReference:`Kura announcement`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`Kura geometry on Kura tokens`,radius:`Kura geometry on Kura tokens`,elevation:`Kura finish tokenized by Kura`,icons:`kura-canonical`,density:`kura-standard`,responsive:`container-width`},useCase:{role:`Clinic and operational workspace users`,primaryTask:`Understand one optional next step and either act or dismiss it.`,dataModel:`A title, optional context, one optional action, and optional dismissal.`,safety:`This component must not carry critical clinical, identity, permission, or operational failure information; use Alert when the message must remain visible.`,outOfScope:`Urgent status, multi-step onboarding, notification queues, confirmation dialogs, and loading state.`},exclusions:[`The Kura source uses Remix icons, a hand-drawn SVG close glyph, Tailwind utilities, and a motion dependency; Kura replaces each with canonical icons, CSS Modules, Kura tokens, and native dismissal behavior.`,`The source card is a visual reference only. Kura preserves the larger dismiss target and tokenized radius required by the system accessibility contract.`]},docs:{description:{component:`A compact optional prompt for a sidebar or narrow panel. Keep one clear action. Use Alert for messages that must remain visible or carry a safety consequence.`}}}},v={render:()=>(0,f.jsx)(`div`,{className:u.sidebar,children:(0,f.jsx)(o,{title:`Keep your workspace secure`,description:`Review your sign-in options when you have a moment.`,actionLabel:`Review security`})})},y={render:()=>{let[e,t]=(0,p.useState)(!0);return(0,f.jsx)(`div`,{className:u.sidebar,children:e?(0,f.jsx)(o,{title:`A new workflow guide is available`,description:`Open it when you are ready to review the changes.`,dismissible:!0,actionLabel:`Open guide`,onDismiss:()=>t(!1)}):(0,f.jsx)(c,{variant:`outline`,onClick:()=>t(!0),children:`Show announcement`})})},play:async({canvasElement:e})=>{let t=g(e);await h.click(t.getByRole(`button`,{name:`Dismiss announcement`})),await m(t.getByRole(`button`,{name:`Show announcement`})).toBeVisible()}},b={render:()=>(0,f.jsx)(`div`,{className:u.sidebar,children:(0,f.jsx)(o,{icon:(0,f.jsx)(i,{"aria-hidden":`true`}),title:`Scheduled maintenance`,description:`Reports may load more slowly tonight from 01:00 to 01:30 ICT.`})})},x={render:()=>(0,f.jsx)(`div`,{className:u.sidebar,children:(0,f.jsx)(o,{icon:(0,f.jsx)(a,{"aria-hidden":`true`}),title:`Review the workspace access policy before you share patient records with a new partner organization`,description:`The policy explains which role may send records, how access is logged, and what to do when the recipient details change.`,actionLabel:`Review policy`})})},S={parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,f.jsx)(o,{title:`Set your shift preferences`,description:`Choose how you want to receive non-urgent updates.`,actionLabel:`Set preferences`})},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div className={styles.sidebar}>
      <Announcement title="Keep your workspace secure" description="Review your sign-in options when you have a moment." actionLabel="Review security" />
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isShown, setIsShown] = useState(true);
    return <div className={styles.sidebar}>
        {isShown ? <Announcement title="A new workflow guide is available" description="Open it when you are ready to review the changes." dismissible actionLabel="Open guide" onDismiss={() => setIsShown(false)} /> : <Button variant="outline" onClick={() => setIsShown(true)}>Show announcement</Button>}
      </div>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Dismiss announcement'
    }));
    await expect(canvas.getByRole('button', {
      name: 'Show announcement'
    })).toBeVisible();
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className={styles.sidebar}>
      <Announcement icon={<InformationIcon aria-hidden="true" />} title="Scheduled maintenance" description="Reports may load more slowly tonight from 01:00 to 01:30 ICT." />
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className={styles.sidebar}>
      <Announcement icon={<ShieldIcon aria-hidden="true" />} title="Review the workspace access policy before you share patient records with a new partner organization" description="The policy explains which role may send records, how access is logged, and what to do when the recipient details change." actionLabel="Review policy" />
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <Announcement title="Set your shift preferences" description="Choose how you want to receive non-urgent updates." actionLabel="Set preferences" />
}`,...S.parameters?.docs?.source}}},C=[`Default`,`Dismissible`,`WithoutAction`,`LongContent`,`Mobile`]}))();export{v as Default,y as Dismissible,x as LongContent,S as Mobile,b as WithoutAction,C as __namedExportsOrder,_ as default};