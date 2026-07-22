import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{a as i,i as a,n as o,o as s,r as c,s as l,t as u}from"./carousel-ZzgOqy0C.js";import{t as d,u as f}from"./card-DMMaaphC.js";function p(e,t){let n=e.scrollSnapList();return typeof t==`number`?n.map(()=>t):t(n,e)}function m(e,t){let n=e.rootNode();return t&&t(n)||n}function h(e={}){let t,n,r,i,a=null,o=0,s=!1,c=!1,l=!1,u=!1;function d(a,o){n=a;let{mergeOptions:s,optionsAtMedia:c}=o;if(t=c(s(s(g,h.globalOptions),e)),n.scrollSnapList().length<=1)return;u=t.jump,r=!1,i=p(n,t.delay);let{eventStore:l,ownerDocument:d}=n.internalEngine(),f=!!n.internalEngine().options.watchDrag,_=m(n,t.rootNode);l.add(d,`visibilitychange`,x),f&&n.on(`pointerDown`,C),f&&!t.stopOnInteraction&&n.on(`pointerUp`,w),t.stopOnMouseEnter&&l.add(_,`mouseenter`,T),t.stopOnMouseEnter&&!t.stopOnInteraction&&l.add(_,`mouseleave`,E),t.stopOnFocusIn&&n.on(`slideFocusStart`,b),t.stopOnFocusIn&&!t.stopOnInteraction&&l.add(n.containerNode(),`focusout`,y),t.playOnInit&&y()}function f(){n.off(`pointerDown`,C).off(`pointerUp`,w).off(`slideFocusStart`,b),b(),r=!0,s=!1}function _(){let{ownerWindow:e}=n.internalEngine();e.clearTimeout(o),o=e.setTimeout(j,i[n.selectedScrollSnap()]),a=new Date().getTime(),n.emit(`autoplay:timerset`)}function v(){let{ownerWindow:e}=n.internalEngine();e.clearTimeout(o),o=0,a=null,n.emit(`autoplay:timerstopped`)}function y(){if(!r){if(S()){l=!0;return}s||n.emit(`autoplay:play`),_(),s=!0}}function b(){r||(s&&n.emit(`autoplay:stop`),v(),s=!1)}function x(){if(S())return l=s,b();l&&y()}function S(){let{ownerDocument:e}=n.internalEngine();return e.visibilityState===`hidden`}function C(){c||b()}function w(){c||y()}function T(){c=!0,b()}function E(){c=!1,y()}function D(e){e!==void 0&&(u=e),y()}function O(){s&&b()}function k(){s&&y()}function A(){return s}function j(){let{index:e}=n.internalEngine(),r=e.clone().add(1).get(),i=n.scrollSnapList().length-1,a=t.stopOnLastSnap&&r===i;if(n.canScrollNext()?n.scrollNext(u):n.scrollTo(0,u),n.emit(`autoplay:select`),a)return b();y()}function M(){return a?i[n.selectedScrollSnap()]-(new Date().getTime()-a):null}return{name:`autoplay`,options:e,init:d,destroy:f,play:D,stop:O,reset:k,isPlaying:A,timeUntilNext:M}}var g,_=t((()=>{g={active:!0,breakpoints:{},delay:4e3,jump:!1,playOnInit:!0,stopOnFocusIn:!0,stopOnInteraction:!0,stopOnMouseEnter:!1,stopOnLastSnap:!1,rootNode:null},h.globalOptions=void 0}));function v({index:e,overlay:t=!1}){let n=D[e%D.length];return t?(0,x.jsx)(`div`,{role:`img`,"aria-label":`Clinical workflow visual: ${n.title}`,className:`relative aspect-video overflow-hidden rounded-lg ${n.surface}`,children:(0,x.jsxs)(`div`,{className:`absolute inset-x-0 bottom-0 bg-foreground p-4 text-background`,children:[(0,x.jsx)(`p`,{className:`text-sm font-semibold`,children:n.title}),(0,x.jsx)(`p`,{className:`mt-1 text-xs text-background`,children:n.description})]})}):(0,x.jsxs)(d,{className:`flex min-h-44 flex-col justify-between p-4`,children:[(0,x.jsxs)(`span`,{className:`text-xs font-medium uppercase tracking-wide text-muted-foreground`,children:[`Workflow step `,e+1]}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`h3`,{className:`text-base font-semibold text-foreground`,children:n.title}),(0,x.jsx)(`p`,{className:`mt-1 text-sm text-muted-foreground`,children:n.description})]})]})}function y({children:e,className:t,...n}){return(0,x.jsx)(u,{className:`w-full ${t??``}`,...n,children:e})}function b({overlay:e=!1}){let[t,n]=(0,S.useState)(),[r,c]=(0,S.useState)(),[l,d]=(0,S.useState)(0),f=(0,S.useCallback)(()=>{if(!t)return;let e=t.selectedScrollSnap();d(e),r?.scrollTo(e)},[t,r]);(0,S.useEffect)(()=>{if(t)return queueMicrotask(f),t.on(`select`,f),t.on(`reInit`,f),()=>{t.off(`select`,f),t.off(`reInit`,f)}},[f,t]);let p=(0,x.jsx)(u,{"aria-label":`Workflow step thumbnails`,setApi:c,opts:{containScroll:`keepSnaps`,dragFree:!0},children:(0,x.jsx)(o,{className:`-ml-2`,children:D.map((e,n)=>(0,x.jsx)(a,{className:`basis-1/4 pl-2 sm:basis-1/5`,children:(0,x.jsx)(`button`,{type:`button`,"aria-label":`Show ${e.title}`,"aria-current":n===l?`true`:void 0,className:`block min-h-11 w-full rounded-md border border-transparent p-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`,onClick:()=>t?.scrollTo(n),children:(0,x.jsx)(`span`,{"aria-hidden":`true`,className:`block aspect-video rounded-sm border-2 ${n===l?`border-primary`:`border-transparent`} ${e.surface}`})})},e.id))})});return(0,x.jsxs)(`div`,{className:`w-full max-w-2xl`,children:[(0,x.jsxs)(u,{"aria-label":`Clinical workflow gallery`,setApi:n,children:[(0,x.jsx)(o,{children:D.map((t,n)=>(0,x.jsx)(a,{"aria-label":t.title,children:(0,x.jsx)(v,{index:n,overlay:e})},t.id))}),(0,x.jsx)(s,{}),(0,x.jsx)(i,{})]}),(0,x.jsx)(`div`,{className:e?`relative z-10 -mt-20 bg-foreground p-3`:`mt-3`,children:p})]})}var x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U;t((()=>{x=r(),_(),S=e(n()),f(),l(),{expect:C,userEvent:w,within:T}=__STORYBOOK_MODULE_TEST__,E={title:`Design System/Primitives/Carousel`,component:u,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`The active Storybook index had no generic carousel primitive. The existing domain CarouselLane was a feature-local horizontal lane without shared keyboard, selection, thumbnail, or responsive contracts.`},source:{vendor:`ReUI`,registryItem:`carousel`,sourceUrl:`https://reui.io/components/carousel`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-focus-only`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`preserves-task-and-44px-touch-targets`},exclusions:[{capability:`Autoplay as a default behavior`,reason:`Automatic movement can hide operational context and is unsafe as a default in clinic workflows.`,replacement:`Autoplay is opt-in, stops on interaction, and is stopped for reduced-motion preferences.`},{capability:`External demo imagery`,reason:`ReUI demo imagery does not represent Kura data or clinical workflow meaning.`,replacement:`Stories use semantic workflow surfaces and realistic clinic copy.`}]},docs:{description:{component:`A touch-friendly, keyboard-operable carousel for scanning a short sequence of related clinic workflow items. Use it when preserving the user’s place matters; do not hide safety-critical information behind automatic movement.`}}}},D=[{id:`identity`,title:`Verify patient identity`,description:`Confirm identifiers before opening the clinical record.`,surface:`bg-primary text-primary-foreground`},{id:`results`,title:`Review latest results`,description:`Check abnormal and pending results before the next action.`,surface:`bg-secondary text-secondary-foreground`},{id:`follow-up`,title:`Plan follow-up`,description:`Record the next step and the responsible care team member.`,surface:`bg-accent text-accent-foreground`},{id:`handoff`,title:`Prepare a safe handoff`,description:`Keep unresolved risks visible for the next reviewer.`,surface:`bg-muted text-foreground`}],O={render:()=>(0,x.jsxs)(y,{"aria-label":`Clinical workflow steps`,className:`max-w-xl`,children:[(0,x.jsx)(o,{children:D.map((e,t)=>(0,x.jsx)(a,{"aria-label":`${t+1} of ${D.length}`,children:(0,x.jsx)(v,{index:t})},e.id))}),(0,x.jsx)(s,{}),(0,x.jsx)(i,{})]}),play:async({canvasElement:e})=>{let t=T(e);await C(t.getByRole(`region`,{name:`Clinical workflow steps`})).toBeInTheDocument(),await C(t.getByRole(`button`,{name:`Previous slide`})).toBeDisabled(),await C(t.getByRole(`button`,{name:`Next slide`})).toBeEnabled(),await w.tab(),await C(t.getByRole(`region`,{name:`Clinical workflow steps`})).toHaveFocus()}},k={render:()=>(0,x.jsxs)(y,{"aria-label":`Patient identity reminder`,className:`max-w-xl`,children:[(0,x.jsx)(o,{children:(0,x.jsx)(a,{"aria-label":`Identity reminder`,children:(0,x.jsx)(v,{index:0})})}),(0,x.jsx)(s,{}),(0,x.jsx)(i,{})]})},A={render:()=>(0,x.jsxs)(y,{"aria-label":`Vertical clinical workflow steps`,orientation:`vertical`,className:`max-w-xl`,children:[(0,x.jsx)(o,{className:`h-80`,children:D.map((e,t)=>(0,x.jsx)(a,{className:`basis-1/2`,"aria-label":e.title,children:(0,x.jsx)(v,{index:t})},e.id))}),(0,x.jsx)(s,{}),(0,x.jsx)(i,{})]})},j={render:()=>(0,x.jsxs)(y,{"aria-label":`Care workflow overview`,opts:{align:`start`},className:`max-w-4xl`,children:[(0,x.jsx)(o,{children:D.map((e,t)=>(0,x.jsx)(a,{className:`basis-1/3`,"aria-label":e.title,children:(0,x.jsx)(v,{index:t})},e.id))}),(0,x.jsx)(s,{}),(0,x.jsx)(i,{})]})},M={render:()=>(0,x.jsxs)(y,{"aria-label":`Responsive care priorities`,opts:{align:`start`},className:`max-w-4xl`,children:[(0,x.jsx)(o,{children:D.map((e,t)=>(0,x.jsx)(a,{className:`sm:basis-1/2 lg:basis-1/3`,"aria-label":e.title,children:(0,x.jsx)(v,{index:t})},e.id))}),(0,x.jsx)(s,{}),(0,x.jsx)(i,{})]})},N={render:()=>(0,x.jsxs)(y,{"aria-label":`Timed workflow reminders`,plugins:(0,S.useMemo)(()=>[h({delay:4e3,stopOnFocusIn:!0,stopOnInteraction:!0,stopOnMouseEnter:!0})],[]),className:`max-w-xl`,children:[(0,x.jsx)(o,{children:D.map((e,t)=>(0,x.jsx)(a,{"aria-label":e.title,children:(0,x.jsx)(v,{index:t})},e.id))}),(0,x.jsx)(s,{}),(0,x.jsx)(i,{})]})},P={render:()=>(0,x.jsxs)(y,{"aria-label":`Centered care priorities`,opts:{align:`center`,loop:!0},className:`max-w-2xl`,children:[(0,x.jsx)(o,{children:D.map((e,t)=>(0,x.jsx)(a,{className:`basis-3/4`,"aria-label":e.title,children:(0,x.jsx)(v,{index:t})},e.id))}),(0,x.jsx)(s,{}),(0,x.jsx)(i,{})]})},F={render:()=>(0,x.jsxs)(y,{"aria-label":`Spaced workflow steps`,className:`max-w-xl`,children:[(0,x.jsx)(o,{className:`-ml-2`,children:D.map((e,t)=>(0,x.jsx)(a,{className:`basis-1/2 pl-2`,"aria-label":e.title,children:(0,x.jsx)(v,{index:t})},e.id))}),(0,x.jsx)(s,{}),(0,x.jsx)(i,{})]})},I={render:()=>(0,x.jsxs)(y,{"aria-label":`Clinical workflow visuals`,className:`max-w-xl`,children:[(0,x.jsx)(o,{children:D.map((e,t)=>(0,x.jsx)(a,{"aria-label":e.title,children:(0,x.jsx)(v,{index:t,overlay:!0})},e.id))}),(0,x.jsx)(s,{}),(0,x.jsx)(i,{})]})},L={render:()=>(0,x.jsx)(b,{})},R={render:()=>(0,x.jsx)(b,{overlay:!0})},z={render:()=>(0,x.jsxs)(y,{"aria-label":`Workflow reminders with dots`,className:`max-w-xl`,children:[(0,x.jsx)(o,{children:D.map((e,t)=>(0,x.jsx)(a,{"aria-label":e.title,children:(0,x.jsx)(v,{index:t,overlay:!0})},e.id))}),(0,x.jsx)(c,{})]})},B={render:()=>(0,x.jsxs)(y,{"aria-label":`Long clinical workflow labels`,className:`max-w-xl`,children:[(0,x.jsx)(o,{children:[`Kết quả xét nghiệm cần bác sĩ xác nhận trước khi trả lời bệnh nhân`,`Lịch sử điều trị và thuốc đang dùng cần được đối chiếu với hồ sơ hiện tại`,`Hướng dẫn theo dõi sau tư vấn cần giữ nguyên thông tin liên hệ khẩn cấp`].map((e,t)=>(0,x.jsx)(a,{"aria-label":e,children:(0,x.jsxs)(d,{className:`min-h-44 p-4`,children:[(0,x.jsx)(`p`,{className:`text-sm font-semibold leading-6 text-foreground`,children:e}),(0,x.jsxs)(`p`,{className:`mt-3 text-xs text-muted-foreground`,children:[`Workflow item `,t+1]})]})},e))}),(0,x.jsx)(s,{}),(0,x.jsx)(i,{})]})},V={render:()=>(0,x.jsxs)(`div`,{className:`w-full max-w-xl`,role:`status`,"aria-label":`Loading workflow items`,children:[(0,x.jsx)(`div`,{className:`flex gap-4`,children:Array.from({length:2},(e,t)=>(0,x.jsxs)(`div`,{className:`min-h-44 flex-1 rounded-lg border border-border bg-muted p-4`,children:[(0,x.jsx)(`div`,{className:`h-3 w-1/3 rounded-sm bg-muted-foreground`}),(0,x.jsx)(`div`,{className:`mt-20 h-3 w-2/3 rounded-sm bg-muted-foreground`})]},t))}),(0,x.jsx)(`span`,{className:`sr-only`,children:`Loading clinical workflow items`})]})},H={render:()=>(0,x.jsxs)(`div`,{className:`w-full max-w-xl rounded-lg border border-dashed border-border p-6 text-center`,role:`status`,children:[(0,x.jsx)(`p`,{className:`text-sm font-medium text-foreground`,children:`No workflow items available`}),(0,x.jsx)(`p`,{className:`mt-1 text-sm text-muted-foreground`,children:`New clinical reminders will appear here when the record has an active next step.`})]})},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <WorkflowCarousel aria-label="Clinical workflow steps" className="max-w-xl">
      <CarouselContent>
        {SLIDES.map((slide, index) => <CarouselItem key={slide.id} aria-label={\`\${index + 1} of \${SLIDES.length}\`}>
            <WorkflowSlide index={index} />
          </CarouselItem>)}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </WorkflowCarousel>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('region', {
      name: 'Clinical workflow steps'
    })).toBeInTheDocument();
    await expect(canvas.getByRole('button', {
      name: 'Previous slide'
    })).toBeDisabled();
    await expect(canvas.getByRole('button', {
      name: 'Next slide'
    })).toBeEnabled();
    await userEvent.tab();
    await expect(canvas.getByRole('region', {
      name: 'Clinical workflow steps'
    })).toHaveFocus();
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <WorkflowCarousel aria-label="Patient identity reminder" className="max-w-xl">
      <CarouselContent>
        <CarouselItem aria-label="Identity reminder"><WorkflowSlide index={0} /></CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </WorkflowCarousel>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <WorkflowCarousel aria-label="Vertical clinical workflow steps" orientation="vertical" className="max-w-xl">
      <CarouselContent className="h-80">
        {SLIDES.map((slide, index) => <CarouselItem key={slide.id} className="basis-1/2" aria-label={slide.title}>
            <WorkflowSlide index={index} />
          </CarouselItem>)}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </WorkflowCarousel>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <WorkflowCarousel aria-label="Care workflow overview" opts={{
    align: 'start'
  }} className="max-w-4xl">
      <CarouselContent>
        {SLIDES.map((slide, index) => <CarouselItem key={slide.id} className="basis-1/3" aria-label={slide.title}>
            <WorkflowSlide index={index} />
          </CarouselItem>)}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </WorkflowCarousel>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <WorkflowCarousel aria-label="Responsive care priorities" opts={{
    align: 'start'
  }} className="max-w-4xl">
      <CarouselContent>
        {SLIDES.map((slide, index) => <CarouselItem key={slide.id} className="sm:basis-1/2 lg:basis-1/3" aria-label={slide.title}>
            <WorkflowSlide index={index} />
          </CarouselItem>)}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </WorkflowCarousel>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const plugins = useMemo(() => [AutoplayPlugin({
      delay: 4000,
      stopOnFocusIn: true,
      stopOnInteraction: true,
      stopOnMouseEnter: true
    })], []);
    return <WorkflowCarousel aria-label="Timed workflow reminders" plugins={plugins} className="max-w-xl">
        <CarouselContent>
          {SLIDES.map((slide, index) => <CarouselItem key={slide.id} aria-label={slide.title}><WorkflowSlide index={index} /></CarouselItem>)}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </WorkflowCarousel>;
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <WorkflowCarousel aria-label="Centered care priorities" opts={{
    align: 'center',
    loop: true
  }} className="max-w-2xl">
      <CarouselContent>
        {SLIDES.map((slide, index) => <CarouselItem key={slide.id} className="basis-3/4" aria-label={slide.title}><WorkflowSlide index={index} /></CarouselItem>)}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </WorkflowCarousel>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <WorkflowCarousel aria-label="Spaced workflow steps" className="max-w-xl">
      <CarouselContent className="-ml-2">
        {SLIDES.map((slide, index) => <CarouselItem key={slide.id} className="basis-1/2 pl-2" aria-label={slide.title}><WorkflowSlide index={index} /></CarouselItem>)}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </WorkflowCarousel>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <WorkflowCarousel aria-label="Clinical workflow visuals" className="max-w-xl">
      <CarouselContent>
        {SLIDES.map((slide, index) => <CarouselItem key={slide.id} aria-label={slide.title}><WorkflowSlide index={index} overlay /></CarouselItem>)}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </WorkflowCarousel>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <SynchronizedThumbnailCarousel />
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <SynchronizedThumbnailCarousel overlay />
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <WorkflowCarousel aria-label="Workflow reminders with dots" className="max-w-xl">
      <CarouselContent>
        {SLIDES.map((slide, index) => <CarouselItem key={slide.id} aria-label={slide.title}><WorkflowSlide index={index} overlay /></CarouselItem>)}
      </CarouselContent>
      <CarouselDots />
    </WorkflowCarousel>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <WorkflowCarousel aria-label="Long clinical workflow labels" className="max-w-xl">
      <CarouselContent>
        {['Kết quả xét nghiệm cần bác sĩ xác nhận trước khi trả lời bệnh nhân', 'Lịch sử điều trị và thuốc đang dùng cần được đối chiếu với hồ sơ hiện tại', 'Hướng dẫn theo dõi sau tư vấn cần giữ nguyên thông tin liên hệ khẩn cấp'].map((label, index) => <CarouselItem key={label} aria-label={label}>
            <Card className="min-h-44 p-4"><p className="text-sm font-semibold leading-6 text-foreground">{label}</p><p className="mt-3 text-xs text-muted-foreground">Workflow item {index + 1}</p></Card>
          </CarouselItem>)}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </WorkflowCarousel>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-xl" role="status" aria-label="Loading workflow items">
      <div className="flex gap-4">
        {Array.from({
        length: 2
      }, (_, index) => <div key={index} className="min-h-44 flex-1 rounded-lg border border-border bg-muted p-4"><div className="h-3 w-1/3 rounded-sm bg-muted-foreground" /><div className="mt-20 h-3 w-2/3 rounded-sm bg-muted-foreground" /></div>)}
      </div>
      <span className="sr-only">Loading clinical workflow items</span>
    </div>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-xl rounded-lg border border-dashed border-border p-6 text-center" role="status">
      <p className="text-sm font-medium text-foreground">No workflow items available</p>
      <p className="mt-1 text-sm text-muted-foreground">New clinical reminders will appear here when the record has an active next step.</p>
    </div>
}`,...H.parameters?.docs?.source}}},U=[`Basic`,`SingleSlide`,`Vertical`,`MultipleVisibleItems`,`ResponsiveBasis`,`Autoplay`,`CenteredSlides`,`CustomSpacing`,`ImageOverlays`,`ThumbnailNavigation`,`OverlayThumbnailNavigation`,`DotsNavigation`,`LongOperationalContent`,`Loading`,`Empty`]}))();export{N as Autoplay,O as Basic,P as CenteredSlides,F as CustomSpacing,z as DotsNavigation,H as Empty,I as ImageOverlays,V as Loading,B as LongOperationalContent,j as MultipleVisibleItems,R as OverlayThumbnailNavigation,M as ResponsiveBasis,k as SingleSlide,L as ThumbnailNavigation,A as Vertical,U as __namedExportsOrder,E as default};