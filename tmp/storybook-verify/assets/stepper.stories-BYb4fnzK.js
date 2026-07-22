import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{rt as i,x as a}from"./provider-marks-BeHzyBjc.js";import{A as o,D as s,E as c,M as l,N as u,O as d,P as f,T as p,j as m,k as h,t as g}from"./ui-C9kmmzkH.js";import{t as _}from"./button-B6_zsN5-.js";var v,y,b,x,S,C,w,T,E,D,O,k,A,j=t((()=>{v=`_narrow_yqt85_1`,y=`_medium_yqt85_5`,b=`_wide_yqt85_9`,x=`_stack_yqt85_13`,S=`_compactStack_yqt85_18`,C=`_row_yqt85_23`,w=`_grid_yqt85_30`,T=`_label_yqt85_36`,E=`_supporting_yqt85_42`,D=`_surface_yqt85_49`,O=`_toolbar_yqt85_58`,k=`_storyButton_yqt85_64`,A={narrow:v,medium:y,wide:b,stack:x,compactStack:S,row:C,grid:w,label:T,supporting:E,surface:D,toolbar:O,storyButton:k}})),M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J;t((()=>{M=r(),N=e(n()),g(),j(),{expect:P,userEvent:F,within:I}=__STORYBOOK_MODULE_TEST__,L={title:`Design System/Primitives/Stepper`,component:p,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:{source:{vendor:`ReUI`,registryItem:`@reui/stepper`},intake:{decision:`CREATE-from-ReUI-architecture`,owner:`src/components/ui`,evidence:`No canonical stepper existed. ReUI stepper (free) was intaken to .tmp/reui-intake/clinic-flows/stepper, its context architecture, roving-tabindex keyboard model, and full API were preserved; Tailwind classes were rebound to Kura tokens via CSS modules and two upstream defects were fixed (stepsCount displayName check, indicator ternary).`},binding:{colors:`kura-semantic (indicator: primary/ink ramps)`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-focus-only`,icons:`kura-hugeicons-canonical`,motion:`kura-140ms-reduced-motion-safe`,density:`inherits-content`,responsive:`horizontal fills width; vertical for narrow rails`}},docs:{description:{component:`Multi-step process control with tablist semantics, arrow-key navigation, and per-step completed/disabled/loading states. Drives the front-desk check-in wizard.`}}},argTypes:{orientation:{control:`radio`,options:[`horizontal`,`vertical`]}}},R=[{step:1,title:`Identity`},{step:2,title:`Review`},{step:3,title:`Insurance`},{step:4,title:`Orders`},{step:5,title:`Payment`}],z={args:{children:null},render:()=>(0,M.jsxs)(p,{defaultValue:2,children:[(0,M.jsx)(o,{children:R.map(({step:e,title:t},n)=>(0,M.jsxs)(h,{step:e,children:[(0,M.jsxs)(f,{children:[(0,M.jsx)(d,{children:e}),(0,M.jsx)(u,{children:t})]}),n<R.length-1?(0,M.jsx)(l,{}):null]},e))}),(0,M.jsx)(m,{children:R.map(({step:e,title:t})=>(0,M.jsxs)(c,{value:e,children:[`Step `,e,`: `,t]},e))})]}),play:async({canvasElement:e})=>{let t=I(e);await P(t.getByRole(`tab`,{name:/2 Review/})).toHaveAttribute(`aria-selected`,`true`),await P(t.getByText(`Step 2: Review`)).toBeVisible()}},B={args:{children:null},render:()=>(0,M.jsxs)(p,{defaultValue:1,children:[(0,M.jsx)(o,{children:R.slice(0,3).map(({step:e,title:t},n)=>(0,M.jsxs)(h,{step:e,children:[(0,M.jsxs)(f,{children:[(0,M.jsx)(d,{children:e}),(0,M.jsx)(u,{children:t})]}),n<2?(0,M.jsx)(l,{}):null]},e))}),(0,M.jsx)(m,{children:R.slice(0,3).map(({step:e,title:t})=>(0,M.jsxs)(c,{value:e,children:[`Panel: `,t]},e))})]}),play:async({canvasElement:e})=>{let t=I(e);t.getByRole(`tab`,{name:/1 Identity/}).focus(),await F.keyboard(`{ArrowRight}`),await P(t.getByRole(`tab`,{name:/2 Review/})).toHaveFocus(),await F.keyboard(`{Enter}`),await P(t.getByText(`Panel: Review`)).toBeVisible(),await F.keyboard(`{End}`),await P(t.getByRole(`tab`,{name:/3 Insurance/})).toHaveFocus()}},V={args:{children:null},render:()=>(0,M.jsx)(p,{defaultValue:3,indicators:{completed:(0,M.jsx)(a,{size:14}),loading:(0,M.jsx)(i,{size:14})},children:(0,M.jsx)(o,{children:R.map(({step:e,title:t},n)=>(0,M.jsxs)(h,{step:e,children:[(0,M.jsxs)(f,{children:[(0,M.jsx)(d,{children:e}),(0,M.jsx)(u,{children:t})]}),n<R.length-1?(0,M.jsx)(l,{}):null]},e))})})},H={args:{children:null},render:()=>(0,M.jsx)(p,{defaultValue:2,indicators:{loading:(0,M.jsx)(i,{size:14})},children:(0,M.jsxs)(o,{children:[(0,M.jsxs)(h,{step:1,children:[(0,M.jsxs)(f,{children:[(0,M.jsx)(d,{children:`1`}),(0,M.jsx)(u,{children:`Identity`})]}),(0,M.jsx)(l,{})]}),(0,M.jsxs)(h,{loading:!0,step:2,children:[(0,M.jsxs)(f,{children:[(0,M.jsx)(d,{children:`2`}),(0,M.jsx)(u,{children:`Checking coverage…`})]}),(0,M.jsx)(l,{})]}),(0,M.jsx)(h,{step:3,children:(0,M.jsxs)(f,{children:[(0,M.jsx)(d,{children:`3`}),(0,M.jsx)(u,{children:`Payment`})]})})]})})},U={args:{children:null},render:()=>(0,M.jsx)(p,{defaultValue:1,children:(0,M.jsxs)(o,{children:[(0,M.jsxs)(h,{step:1,children:[(0,M.jsxs)(f,{children:[(0,M.jsx)(d,{children:`1`}),(0,M.jsx)(u,{children:`Identity`})]}),(0,M.jsx)(l,{})]}),(0,M.jsx)(h,{disabled:!0,step:2,children:(0,M.jsxs)(f,{children:[(0,M.jsx)(d,{children:`2`}),(0,M.jsx)(u,{children:`Insurance`}),(0,M.jsx)(s,{children:`Needs identity first`})]})})]})}),play:async({canvasElement:e})=>{let t=I(e);await P(t.getByRole(`tab`,{name:/2 Insurance/})).toBeDisabled()}},W={args:{children:null},render:()=>(0,M.jsx)(p,{defaultValue:2,orientation:`vertical`,children:(0,M.jsx)(o,{children:R.slice(0,4).map(({step:e,title:t},n)=>(0,M.jsxs)(h,{step:e,children:[(0,M.jsxs)(f,{children:[(0,M.jsx)(d,{children:e}),(0,M.jsxs)(`div`,{children:[(0,M.jsx)(u,{children:t}),(0,M.jsxs)(s,{children:[`Step `,e,` of 4`]})]})]}),n<3?(0,M.jsx)(l,{}):null]},e))})})},G={args:{children:null},render:function(){let[e,t]=(0,N.useState)(1);return(0,M.jsxs)(`div`,{className:A.stack,children:[(0,M.jsxs)(p,{onValueChange:t,value:e,children:[(0,M.jsx)(o,{children:R.slice(0,3).map(({step:e,title:t},n)=>(0,M.jsxs)(h,{step:e,children:[(0,M.jsxs)(f,{children:[(0,M.jsx)(d,{children:e}),(0,M.jsx)(u,{children:t})]}),n<2?(0,M.jsx)(l,{}):null]},e))}),(0,M.jsx)(m,{children:R.slice(0,3).map(({step:e,title:t})=>(0,M.jsxs)(c,{value:e,children:[t,` content`]},e))})]}),(0,M.jsxs)(`div`,{className:A.toolbar,children:[(0,M.jsx)(_,{disabled:e<=1,onClick:()=>t(e-1),variant:`outline`,children:`Back`}),(0,M.jsx)(_,{disabled:e>=3,onClick:()=>t(e+1),variant:`primary`,children:`Continue`})]})]})}},K={args:{children:null},render:()=>(0,M.jsx)(p,{defaultValue:2,orientation:`vertical`,children:(0,M.jsxs)(o,{children:[(0,M.jsxs)(h,{step:1,children:[(0,M.jsxs)(f,{children:[(0,M.jsx)(d,{children:`1`}),(0,M.jsxs)(`div`,{children:[(0,M.jsx)(u,{children:`Confirm patient identity and appointment context`}),(0,M.jsx)(s,{children:`Name, date of birth, clinic, appointment time, and the person completing check-in.`})]})]}),(0,M.jsx)(l,{})]}),(0,M.jsx)(h,{step:2,children:(0,M.jsxs)(f,{children:[(0,M.jsx)(d,{children:`2`}),(0,M.jsxs)(`div`,{children:[(0,M.jsx)(u,{children:`Review preparation and requested laboratory tests`}),(0,M.jsx)(s,{children:`Check fasting instructions, specimen requirements, payment route, and any collection notes.`})]})]})})]})})},q={args:{children:null},parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,M.jsxs)(p,{defaultValue:3,children:[(0,M.jsx)(o,{children:R.map(({step:e},t)=>(0,M.jsxs)(h,{step:e,children:[(0,M.jsx)(f,{"aria-label":R[t].title,children:(0,M.jsx)(d,{children:e})}),t<R.length-1?(0,M.jsx)(l,{}):null]},e))}),(0,M.jsx)(m,{children:R.map(({step:e,title:t})=>(0,M.jsx)(c,{value:e,children:t},e))})]})},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Stepper defaultValue={2}>
      <StepperNav>
        {CHECK_IN_STEPS.map(({
        step,
        title
      }, index) => <StepperItem key={step} step={step}>
            <StepperTrigger>
              <StepperIndicator>{step}</StepperIndicator>
              <StepperTitle>{title}</StepperTitle>
            </StepperTrigger>
            {index < CHECK_IN_STEPS.length - 1 ? <StepperSeparator /> : null}
          </StepperItem>)}
      </StepperNav>
      <StepperPanel>
        {CHECK_IN_STEPS.map(({
        step,
        title
      }) => <StepperContent key={step} value={step}>
            Step {step}: {title}
          </StepperContent>)}
      </StepperPanel>
    </Stepper>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('tab', {
      name: /2 Review/
    })).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByText('Step 2: Review')).toBeVisible();
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Stepper defaultValue={1}>
      <StepperNav>
        {CHECK_IN_STEPS.slice(0, 3).map(({
        step,
        title
      }, index) => <StepperItem key={step} step={step}>
            <StepperTrigger>
              <StepperIndicator>{step}</StepperIndicator>
              <StepperTitle>{title}</StepperTitle>
            </StepperTrigger>
            {index < 2 ? <StepperSeparator /> : null}
          </StepperItem>)}
      </StepperNav>
      <StepperPanel>
        {CHECK_IN_STEPS.slice(0, 3).map(({
        step,
        title
      }) => <StepperContent key={step} value={step}>
            Panel: {title}
          </StepperContent>)}
      </StepperPanel>
    </Stepper>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole('tab', {
      name: /1 Identity/
    });
    first.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('tab', {
      name: /2 Review/
    })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByText('Panel: Review')).toBeVisible();
    await userEvent.keyboard('{End}');
    await expect(canvas.getByRole('tab', {
      name: /3 Insurance/
    })).toHaveFocus();
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Stepper defaultValue={3} indicators={{
    completed: <CheckIcon size={14} />,
    loading: <LoadingIcon size={14} />
  }}>
      <StepperNav>
        {CHECK_IN_STEPS.map(({
        step,
        title
      }, index) => <StepperItem key={step} step={step}>
            <StepperTrigger>
              <StepperIndicator>{step}</StepperIndicator>
              <StepperTitle>{title}</StepperTitle>
            </StepperTrigger>
            {index < CHECK_IN_STEPS.length - 1 ? <StepperSeparator /> : null}
          </StepperItem>)}
      </StepperNav>
    </Stepper>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Stepper defaultValue={2} indicators={{
    loading: <LoadingIcon size={14} />
  }}>
      <StepperNav>
        <StepperItem step={1}>
          <StepperTrigger>
            <StepperIndicator>1</StepperIndicator>
            <StepperTitle>Identity</StepperTitle>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem loading step={2}>
          <StepperTrigger>
            <StepperIndicator>2</StepperIndicator>
            <StepperTitle>Checking coverage…</StepperTitle>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem step={3}>
          <StepperTrigger>
            <StepperIndicator>3</StepperIndicator>
            <StepperTitle>Payment</StepperTitle>
          </StepperTrigger>
        </StepperItem>
      </StepperNav>
    </Stepper>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Stepper defaultValue={1}>
      <StepperNav>
        <StepperItem step={1}>
          <StepperTrigger>
            <StepperIndicator>1</StepperIndicator>
            <StepperTitle>Identity</StepperTitle>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem disabled step={2}>
          <StepperTrigger>
            <StepperIndicator>2</StepperIndicator>
            <StepperTitle>Insurance</StepperTitle>
            <StepperDescription>Needs identity first</StepperDescription>
          </StepperTrigger>
        </StepperItem>
      </StepperNav>
    </Stepper>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('tab', {
      name: /2 Insurance/
    })).toBeDisabled();
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Stepper defaultValue={2} orientation="vertical">
      <StepperNav>
        {CHECK_IN_STEPS.slice(0, 4).map(({
        step,
        title
      }, index) => <StepperItem key={step} step={step}>
            <StepperTrigger>
              <StepperIndicator>{step}</StepperIndicator>
              <div>
                <StepperTitle>{title}</StepperTitle>
                <StepperDescription>Step {step} of 4</StepperDescription>
              </div>
            </StepperTrigger>
            {index < 3 ? <StepperSeparator /> : null}
          </StepperItem>)}
      </StepperNav>
    </Stepper>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: function ControlledStepper() {
    const [step, setStep] = useState(1);
    return <div className={storyStyles.stack}>
        <Stepper onValueChange={setStep} value={step}>
          <StepperNav>
            {CHECK_IN_STEPS.slice(0, 3).map(({
            step: s,
            title
          }, index) => <StepperItem key={s} step={s}>
                <StepperTrigger>
                  <StepperIndicator>{s}</StepperIndicator>
                  <StepperTitle>{title}</StepperTitle>
                </StepperTrigger>
                {index < 2 ? <StepperSeparator /> : null}
              </StepperItem>)}
          </StepperNav>
          <StepperPanel>
            {CHECK_IN_STEPS.slice(0, 3).map(({
            step: s,
            title
          }) => <StepperContent key={s} value={s}>
                {title} content
              </StepperContent>)}
          </StepperPanel>
        </Stepper>
        <div className={storyStyles.toolbar}>
          <Button disabled={step <= 1} onClick={() => setStep(step - 1)} variant="outline">
            Back
          </Button>
          <Button disabled={step >= 3} onClick={() => setStep(step + 1)} variant="primary">
            Continue
          </Button>
        </div>
      </div>;
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: () => <Stepper defaultValue={2} orientation="vertical">
      <StepperNav>
        <StepperItem step={1}>
          <StepperTrigger>
            <StepperIndicator>1</StepperIndicator>
            <div>
              <StepperTitle>Confirm patient identity and appointment context</StepperTitle>
              <StepperDescription>Name, date of birth, clinic, appointment time, and the person completing check-in.</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem step={2}>
          <StepperTrigger>
            <StepperIndicator>2</StepperIndicator>
            <div>
              <StepperTitle>Review preparation and requested laboratory tests</StepperTitle>
              <StepperDescription>Check fasting instructions, specimen requirements, payment route, and any collection notes.</StepperDescription>
            </div>
          </StepperTrigger>
        </StepperItem>
      </StepperNav>
    </Stepper>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    children: null
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <Stepper defaultValue={3}>
      <StepperNav>
        {CHECK_IN_STEPS.map(({
        step
      }, index) => <StepperItem key={step} step={step}>
            <StepperTrigger aria-label={CHECK_IN_STEPS[index].title}>
              <StepperIndicator>{step}</StepperIndicator>
            </StepperTrigger>
            {index < CHECK_IN_STEPS.length - 1 ? <StepperSeparator /> : null}
          </StepperItem>)}
      </StepperNav>
      <StepperPanel>
        {CHECK_IN_STEPS.map(({
        step,
        title
      }) => <StepperContent key={step} value={step}>
            {title}
          </StepperContent>)}
      </StepperPanel>
    </Stepper>
}`,...q.parameters?.docs?.source}}},J=[`Default`,`KeyboardNavigation`,`CompletedWithIcons`,`LoadingStep`,`DisabledStep`,`Vertical`,`Controlled`,`LongContent`,`MobileNarrow`]}))();export{V as CompletedWithIcons,G as Controlled,z as Default,U as DisabledStep,B as KeyboardNavigation,H as LoadingStep,K as LongContent,q as MobileNarrow,W as Vertical,J as __namedExportsOrder,L as default};