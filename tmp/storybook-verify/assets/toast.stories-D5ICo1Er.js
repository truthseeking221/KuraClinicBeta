import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{f as n,h as r,t as i}from"./ui-C9kmmzkH.js";import{t as a}from"./button-B6_zsN5-.js";import{n as o,t as s}from"./intake-components.stories.module-pqbVgWyl.js";function c(e){let t=[...e.querySelectorAll(`[data-sonner-toast][data-visible="true"]`)].at(-1);if(!t)throw Error(`Expected a visible toast.`);return t}function l(e){let t=e.querySelector(`[data-icon]`),n=e.querySelector(`[data-content]`);if(!t||!n)throw Error(`Expected a toast with an icon and content.`);let r=e.getBoundingClientRect(),i=t.getBoundingClientRect(),a=n.getBoundingClientRect(),o=Number.parseFloat(getComputedStyle(e).columnGap)*(r.width/e.offsetWidth),s=a.left-i.right;f(Math.abs(s-o)).toBeLessThanOrEqual(1)}function u(e){f(e.querySelector(`[data-close-button]`)).toBeNull()}var d,f,p,m,h,g,_,v,y,b,x,S;e((()=>{d=t(),i(),s(),{expect:f,userEvent:p,within:m}=__STORYBOOK_MODULE_TEST__,h={default:`storybook-toast-default-toaster`,semanticTones:`storybook-toast-semantic-tones-toaster`,withAction:`storybook-toast-with-action-toaster`,promiseUpdate:`storybook-toast-promise-update-toaster`,mobileNarrow:`storybook-toast-mobile-narrow-toaster`},g={title:`Design System/Components/Toast`,component:n,tags:[`autodocs`,`source-kura`,`adapted-kura`],parameters:{layout:`padded`,kura:{source:{vendor:`Kura`,registryItem:`notification`,visualReference:`Kura notification`,behaviorDependency:`sonner`},intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`No canonical transient notification owner existed; the installed Sonner behavior dependency supplies queueing, announcements, promise updates, dismissal, and swipe handling.`,exclusions:[`Vendor naming is excluded from Kura taxonomy.`,`Custom avatars, inverted themes, decorative accents, and arbitrary icons conflict with semantic notification treatment.`,`Use Alert instead of Toast for persistent or decision-blocking information.`]},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`overlay-only`,icons:`kura-canonical-status`,motion:`sonner-behavior-with-kura-reduced-motion`}},docs:{description:{component:`Transient, non-blocking feedback for completed or background actions. Mount one Toaster near the application root and call toast from action handlers.`}}}},_={args:{},render:()=>(0,d.jsxs)(`div`,{className:o.actionStack,children:[(0,d.jsx)(n,{id:h.default}),(0,d.jsx)(a,{onClick:()=>r(`Appointment saved`,{description:`Friday, 09:30 · Toul Kork Branch`,id:`storybook-toast-default`,toasterId:h.default}),children:`Show notification`})]}),play:async({canvasElement:e})=>{r.dismiss(),await p.click(m(e).getByRole(`button`,{name:`Show notification`}));let t=m(e.ownerDocument.body);await f(await t.findByText(`Appointment saved`)).toBeVisible(),await f(t.getByText(`Friday, 09:30 · Toul Kork Branch`)).toBeVisible(),r.dismiss()}},v={args:{},render:()=>(0,d.jsxs)(`div`,{className:o.row,children:[(0,d.jsx)(n,{id:h.semanticTones}),(0,d.jsx)(a,{variant:`outline`,onClick:()=>r.success(`Payment recorded`,{id:`storybook-toast-semantic-tones`,toasterId:h.semanticTones}),children:`Success`}),(0,d.jsx)(a,{variant:`outline`,onClick:()=>r.info(`Booking updated`,{id:`storybook-toast-semantic-tones`,toasterId:h.semanticTones}),children:`Information`}),(0,d.jsx)(a,{variant:`outline`,onClick:()=>r.warning(`Coverage needs review`,{id:`storybook-toast-semantic-tones`,toasterId:h.semanticTones}),children:`Warning`}),(0,d.jsx)(a,{variant:`outline`,onClick:()=>r.error(`Result could not be sent`,{id:`storybook-toast-semantic-tones`,toasterId:h.semanticTones}),children:`Error`})]}),play:async({canvasElement:e})=>{r.dismiss();let t=m(e.ownerDocument.body);await p.click(m(e).getByRole(`button`,{name:`Information`})),await f(await t.findByText(`Booking updated`)).toBeVisible(),l(c(e.ownerDocument)),r.dismiss()}},y={args:{},render:()=>(0,d.jsxs)(`div`,{className:o.actionStack,children:[(0,d.jsx)(n,{id:h.withAction}),(0,d.jsx)(a,{onClick:()=>r.success(`Patient added to the queue`,{action:{label:`View queue`,onClick:()=>void 0},description:`Sokha Chan · Walk-in`,id:`storybook-toast-with-action`,toasterId:h.withAction}),children:`Add patient`})]}),play:async({canvasElement:e})=>{r.dismiss();let t=m(e.ownerDocument.body);await p.click(m(e).getByRole(`button`,{name:`Add patient`})),await f(await t.findByText(`Patient added to the queue`)).toBeVisible();let n=c(e.ownerDocument),i=n.querySelector(`[data-content]`),a=n.querySelector(`[data-action]`);if(!i||!a)throw Error(`Expected a toast action and content.`);l(n),f(Math.abs(a.getBoundingClientRect().left-i.getBoundingClientRect().left)).toBeLessThanOrEqual(1),r.dismiss()}},b={args:{},render:()=>(0,d.jsxs)(`div`,{className:o.actionStack,children:[(0,d.jsx)(n,{id:h.promiseUpdate}),(0,d.jsx)(a,{onClick:()=>r.promise(new Promise(e=>{window.setTimeout(()=>e(`sent`),300)}),{id:`storybook-toast-promise-update`,loading:`Sending appointment reminder…`,success:`Reminder sent`,error:`Reminder could not be sent`,toasterId:h.promiseUpdate}),children:`Send reminder`})]}),play:async({canvasElement:e})=>{r.dismiss();let t=m(e.ownerDocument.body);await p.click(m(e).getByRole(`button`,{name:`Send reminder`})),await f(await t.findByText(`Reminder sent`)).toBeVisible(),u(c(e.ownerDocument)),r.dismiss()}},x={args:{},parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,d.jsxs)(`div`,{className:o.actionStack,children:[(0,d.jsx)(n,{id:h.mobileNarrow,position:`top-center`}),(0,d.jsx)(a,{fullWidth:!0,onClick:()=>r.info(`Appointment time changed`,{description:`The patient will receive the updated date, clinic, and preparation instructions.`,id:`storybook-toast-mobile-narrow`,toasterId:h.mobileNarrow}),children:`Show mobile notification`})]}),play:async({canvasElement:e})=>{r.dismiss(),await p.click(m(e).getByRole(`button`,{name:`Show mobile notification`}));let t=m(e.ownerDocument.body);await f(await t.findByText(`Appointment time changed`)).toBeVisible(),l(c(e.ownerDocument)),r.dismiss()}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {},
  render: () => <div className={styles.actionStack}>
      <Toaster id={toasterIds.default} />
      <Button onClick={() => toast("Appointment saved", {
      description: "Friday, 09:30 · Toul Kork Branch",
      id: "storybook-toast-default",
      toasterId: toasterIds.default
    })}>
        Show notification
      </Button>
    </div>,
  play: async ({
    canvasElement
  }) => {
    toast.dismiss();
    await userEvent.click(within(canvasElement).getByRole("button", {
      name: "Show notification"
    }));
    const documentCanvas = within(canvasElement.ownerDocument.body);
    await expect(await documentCanvas.findByText("Appointment saved")).toBeVisible();
    await expect(documentCanvas.getByText("Friday, 09:30 · Toul Kork Branch")).toBeVisible();
    toast.dismiss();
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {},
  render: () => <div className={styles.row}>
      <Toaster id={toasterIds.semanticTones} />
      <Button variant="outline" onClick={() => toast.success("Payment recorded", {
      id: "storybook-toast-semantic-tones",
      toasterId: toasterIds.semanticTones
    })}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.info("Booking updated", {
      id: "storybook-toast-semantic-tones",
      toasterId: toasterIds.semanticTones
    })}>
        Information
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Coverage needs review", {
      id: "storybook-toast-semantic-tones",
      toasterId: toasterIds.semanticTones
    })}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.error("Result could not be sent", {
      id: "storybook-toast-semantic-tones",
      toasterId: toasterIds.semanticTones
    })}>
        Error
      </Button>
    </div>,
  play: async ({
    canvasElement
  }) => {
    toast.dismiss();
    const documentCanvas = within(canvasElement.ownerDocument.body);
    await userEvent.click(within(canvasElement).getByRole("button", {
      name: "Information"
    }));
    await expect(await documentCanvas.findByText("Booking updated")).toBeVisible();
    expectToastContentAfterIcon(getVisibleToast(canvasElement.ownerDocument));
    toast.dismiss();
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {},
  render: () => <div className={styles.actionStack}>
      <Toaster id={toasterIds.withAction} />
      <Button onClick={() => toast.success("Patient added to the queue", {
      action: {
        label: "View queue",
        onClick: () => undefined
      },
      description: "Sokha Chan · Walk-in",
      id: "storybook-toast-with-action",
      toasterId: toasterIds.withAction
    })}>
        Add patient
      </Button>
    </div>,
  play: async ({
    canvasElement
  }) => {
    toast.dismiss();
    const documentCanvas = within(canvasElement.ownerDocument.body);
    await userEvent.click(within(canvasElement).getByRole("button", {
      name: "Add patient"
    }));
    await expect(await documentCanvas.findByText("Patient added to the queue")).toBeVisible();
    const toastElement = getVisibleToast(canvasElement.ownerDocument);
    const content = toastElement.querySelector<HTMLElement>("[data-content]");
    const action = toastElement.querySelector<HTMLElement>("[data-action]");
    if (!content || !action) {
      throw new Error("Expected a toast action and content.");
    }
    expectToastContentAfterIcon(toastElement);
    expect(Math.abs(action.getBoundingClientRect().left - content.getBoundingClientRect().left)).toBeLessThanOrEqual(1);
    toast.dismiss();
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {},
  render: () => <div className={styles.actionStack}>
      <Toaster id={toasterIds.promiseUpdate} />
      <Button onClick={() => toast.promise(new Promise<string>(resolve => {
      window.setTimeout(() => resolve("sent"), 300);
    }), {
      id: "storybook-toast-promise-update",
      loading: "Sending appointment reminder…",
      success: "Reminder sent",
      error: "Reminder could not be sent",
      toasterId: toasterIds.promiseUpdate
    })}>
        Send reminder
      </Button>
    </div>,
  play: async ({
    canvasElement
  }) => {
    toast.dismiss();
    const documentCanvas = within(canvasElement.ownerDocument.body);
    await userEvent.click(within(canvasElement).getByRole("button", {
      name: "Send reminder"
    }));
    await expect(await documentCanvas.findByText("Reminder sent")).toBeVisible();
    expectToastHasNoVendorCloseButton(getVisibleToast(canvasElement.ownerDocument));
    toast.dismiss();
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    viewport: {
      defaultViewport: "mobile1"
    }
  },
  render: () => <div className={styles.actionStack}>
      <Toaster id={toasterIds.mobileNarrow} position="top-center" />
      <Button fullWidth onClick={() => toast.info("Appointment time changed", {
      description: "The patient will receive the updated date, clinic, and preparation instructions.",
      id: "storybook-toast-mobile-narrow",
      toasterId: toasterIds.mobileNarrow
    })}>
        Show mobile notification
      </Button>
    </div>,
  play: async ({
    canvasElement
  }) => {
    toast.dismiss();
    await userEvent.click(within(canvasElement).getByRole("button", {
      name: "Show mobile notification"
    }));
    const documentCanvas = within(canvasElement.ownerDocument.body);
    await expect(await documentCanvas.findByText("Appointment time changed")).toBeVisible();
    expectToastContentAfterIcon(getVisibleToast(canvasElement.ownerDocument));
    toast.dismiss();
  }
}`,...x.parameters?.docs?.source}}},S=[`Default`,`SemanticTones`,`WithAction`,`PromiseUpdate`,`MobileNarrow`]}))();export{_ as Default,x as MobileNarrow,b as PromiseUpdate,v as SemanticTones,y as WithAction,S as __namedExportsOrder,g as default};