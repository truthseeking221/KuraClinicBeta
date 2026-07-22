import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{n as i,t as a}from"./rating-By2kCgN4.js";var o,s,c,l,u,d,f=t((()=>{o=`_stack_1icbk_1`,s=`_row_1icbk_8`,c=`_hint_1icbk_15`,l=`_status_1icbk_16`,u=`_mobileFrame_1icbk_23`,d={stack:o,row:s,hint:c,status:l,mobileFrame:u}})),p,m,h,g,_,v,y,b,x,S,C,w,T,E,D;t((()=>{p=r(),m=e(n()),i(),f(),{expect:h,userEvent:g,within:_}=__STORYBOOK_MODULE_TEST__,v={title:`Design System/Primitives/Rating`,component:a,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`Fresh Storybook and source search found RadioGroup but no compact score display/input with decimal star fill and a rating-specific native form contract.`,exclusions:[{reuiExample:`c-rating-6 review distribution summary`,reason:`Aggregate counts and progress rows are an analytics composition, not a rating primitive variant.`,replacement:`Compose Rating, Progress, Separator, and real review data in the owning feature.`},{reuiExample:`c-rating-8 emoji reaction picker`,reason:`Emoji and Unicode symbols are prohibited icon workarounds and reaction scales have different labelled semantics.`,replacement:`Use RadioGroup with approved text-labelled choices until canonical reaction icons are approved.`},{reuiExample:`c-rating-9 review form`,reason:`Textarea validation, submission, and recovery belong to the feedback feature.`,replacement:`Compose Rating with Field, Textarea, and Button in that feature.`}]},source:{vendor:`ReUI`,registryItem:`c-rating-1 through c-rating-9`,sourceUrl:`https://reui.io/components/rating`},binding:{colors:`kura-primary-data`,spacing:`kura`,radius:`kura-focus-only`,elevation:`kura-focus-only`,icons:`kura-canonical-StarIcon`,density:`size-prop-and-root-density-compatible`,responsive:`inline-wrap`,motion:`kura-indicator-reduced-motion-safe`},useCase:{role:`A Kura user viewing or providing a bounded qualitative score`,primaryTask:`Understand or select a score with an explicit scale and native keyboard behavior.`,safety:`Rating must not represent clinical severity, triage priority, certainty, or medication risk.`,outOfScope:`Clinical scales, NPS logic, review submission, aggregate distributions, and reaction emoji.`}},docs:{description:{component:`A canonical star score display and native radio input. Supports decimal read-only values and 0.5/1 editable steps. Never use it for clinical severity or safety decisions.`}}},argTypes:{editable:{control:`boolean`},rating:{control:{type:`number`,min:0,max:5,step:.5}},size:{control:`inline-radio`,options:[`sm`,`md`,`lg`]},step:{control:`inline-radio`,options:[.5,1]}}},y={args:{label:`Service experience`,rating:4,showValue:!0}},b={args:{label:`Service experience`,rating:3.7,showValue:!0,step:.5}},x={render:()=>(0,p.jsxs)(`div`,{className:d.stack,children:[(0,p.jsx)(a,{label:`Compact service score`,rating:4,size:`sm`,showValue:!0}),(0,p.jsx)(a,{label:`Standard service score`,rating:4,size:`md`,showValue:!0}),(0,p.jsx)(a,{label:`Prominent service score`,rating:4,size:`lg`,showValue:!0})]})},S={render:()=>{let[e,t]=(0,m.useState)(0);return(0,p.jsxs)(`div`,{className:d.stack,children:[(0,p.jsx)(a,{editable:!0,label:`Rate your booking experience`,onRatingChange:t,rating:e,showValue:!0}),(0,p.jsxs)(`p`,{className:d.status,"aria-live":`polite`,children:[`Selected score: `,e||`none`,`.`]})]})},play:async({canvasElement:e})=>{let t=_(e),n=t.getByRole(`radio`,{name:`4 out of 5`});await g.click(n),await h(n).toBeChecked(),await h(t.getByText(`Selected score: 4.`)).toBeVisible(),await g.keyboard(`{ArrowRight}`),await h(t.getByRole(`radio`,{name:`5 out of 5`})).toBeChecked()}},C={render:()=>{let[e,t]=(0,m.useState)(3.5);return(0,p.jsx)(a,{editable:!0,label:`Rate the support experience`,onRatingChange:t,rating:e,showValue:!0,step:.5})}},w={render:()=>(0,p.jsxs)(`div`,{className:d.stack,children:[(0,p.jsx)(a,{disabled:!0,editable:!0,label:`Rate the completed visit`,rating:0}),(0,p.jsx)(`p`,{className:d.hint,children:`Rating becomes available after the visit is completed.`})]})},T={render:()=>(0,p.jsxs)(`div`,{className:d.stack,children:[(0,p.jsx)(a,{editable:!0,label:`Submitted service rating`,rating:4.5,readOnly:!0,showValue:!0,step:.5}),(0,p.jsx)(`p`,{className:d.hint,children:`The submitted response is retained for review and cannot be changed.`})]})},E={parameters:{viewport:{defaultViewport:`kura320`}},render:()=>(0,p.jsx)(`div`,{className:d.mobileFrame,children:(0,p.jsx)(a,{editable:!0,label:`Rate the booking experience`,rating:4.5,showValue:!0,step:.5})})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Service experience',
    rating: 4,
    showValue: true
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Service experience',
    rating: 3.7,
    showValue: true,
    step: 0.5
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className={storyStyles.stack}>
      <Rating label="Compact service score" rating={4} size="sm" showValue />
      <Rating label="Standard service score" rating={4} size="md" showValue />
      <Rating label="Prominent service score" rating={4} size="lg" showValue />
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [rating, setRating] = useState(0);
    return <div className={storyStyles.stack}>
        <Rating editable label="Rate your booking experience" onRatingChange={setRating} rating={rating} showValue />
        <p className={storyStyles.status} aria-live="polite">Selected score: {rating || 'none'}.</p>
      </div>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const fourthStar = canvas.getByRole('radio', {
      name: '4 out of 5'
    });
    await userEvent.click(fourthStar);
    await expect(fourthStar).toBeChecked();
    await expect(canvas.getByText('Selected score: 4.')).toBeVisible();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('radio', {
      name: '5 out of 5'
    })).toBeChecked();
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [rating, setRating] = useState(3.5);
    return <Rating editable label="Rate the support experience" onRatingChange={setRating} rating={rating} showValue step={0.5} />;
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div className={storyStyles.stack}>
      <Rating disabled editable label="Rate the completed visit" rating={0} />
      <p className={storyStyles.hint}>Rating becomes available after the visit is completed.</p>
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div className={storyStyles.stack}>
      <Rating editable label="Submitted service rating" rating={4.5} readOnly showValue step={0.5} />
      <p className={storyStyles.hint}>The submitted response is retained for review and cannot be changed.</p>
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  render: () => <div className={storyStyles.mobileFrame}>
      <Rating editable label="Rate the booking experience" rating={4.5} showValue step={0.5} />
    </div>
}`,...E.parameters?.docs?.source}}},D=[`Default`,`DecimalReadOnly`,`Sizes`,`Editable`,`HalfStep`,`DisabledWithReason`,`ReadOnly`,`Mobile320`]}))();export{b as DecimalReadOnly,y as Default,w as DisabledWithReason,S as Editable,C as HalfStep,E as Mobile320,T as ReadOnly,x as Sizes,D as __namedExportsOrder,v as default};