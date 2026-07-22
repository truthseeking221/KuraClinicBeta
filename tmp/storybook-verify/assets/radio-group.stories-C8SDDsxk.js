import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{It as i,J as a,Q as ee,g as o}from"./provider-marks-BeHzyBjc.js";import{$ as s,Yt as c,a as te,i as l,n as ne,r as re,t as u,tt as d}from"./ui-C9kmmzkH.js";import{a as f,r as p}from"./skeleton-yGvKPj3C.js";import{a as m}from"./collapsible-Cfc9M9oP.js";import{r as h,t as g}from"./card-DMMaaphC.js";var _,v,y,b,x,S,C,w,T,ie=t((()=>{_=`_frame_5nhnw_1`,v=`_card_5nhnw_8`,y=`_optionContent_5nhnw_12`,b=`_optionCopy_5nhnw_21`,x=`_optionTitle_5nhnw_29`,S=`_optionDescription_5nhnw_36`,C=`_separator_5nhnw_42`,w=`_infoTrigger_5nhnw_46`,T={frame:_,card:v,optionContent:y,optionCopy:b,optionTitle:x,optionDescription:S,separator:C,infoTrigger:w}}));function ae(){let[e,t]=(0,D.useState)(`clinic`);return(0,E.jsxs)(`div`,{className:T.frame,children:[(0,E.jsxs)(d,{legend:`Collection route`,name:`controlled-collection-route`,onValueChange:t,value:e,children:[(0,E.jsx)(s,{value:`clinic`,children:`Clinic draw`}),(0,E.jsx)(s,{value:`psc`,children:`Patient service centre`})]}),(0,E.jsxs)(`output`,{"aria-live":`polite`,children:[`Selected: `,e]})]})}var E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$;t((()=>{E=r(),D=e(n()),u(),ie(),{expect:O,userEvent:k,within:A}=__STORYBOOK_MODULE_TEST__,j={title:`Design System/Patterns/Radio Group`,component:d,tags:[`autodocs`,`source-kura`,`adapted-kura`],args:{legend:`Choice`,name:`radio-group-example`},parameters:{layout:`centered`,chromatic:{viewports:[320,360,390,412,480,768,1024,1440]},kura:{source:{vendor:`Kura`,registryItem:`radio`,visualReference:`Kura radio`},intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`Kura already owns the native Radio primitive, Field, Card, Badge, Avatar, Tooltip, and Separator. It lacked the reusable one-of-many fieldset contract: shared name/value state, group validation, disabled/read-only behavior, and responsive inline reflow.`},binding:{colors:`kura-semantic-and-delegated-to-kura-children`,typography:`kura`,spacing:`kura`,radius:`composed-control-owner`,elevation:`none-on-group`,icons:`none-required-native-indicator`,density:`kura-root-attribute-through-radio`,responsive:`horizontal-wraps-then-stacks-under-480px`},retainedCapabilities:[`One-of-many native radio selection with controlled or uncontrolled group value`,`Vertical and inline layouts with mobile reflow`,`Visible legend, description, validation, disabled, read-only, and individual disabled states`,`Card, separator, badge, avatar, icon, tooltip, and grid compositions through canonical Kura owners`],exclusions:[{capability:`Per-option arbitrary colour variants`,reason:`Selection remains Kura primary; arbitrary colours are not a semantic radio state.`,replacement:`Use status text and canonical Badge where semantic context is required.`},{capability:`Frame styling baked into the group`,reason:`A radio group is form structure, not a surface or page shell.`,replacement:`Compose the group inside the canonical Card or feature-owned section when containment has meaning.`},{capability:`Payment-brand and pricing-plan examples`,reason:`They carry domain data and branded assets outside a generic primitive.`,replacement:`Compose the group with canonical Kura components in the owning payment or billing workflow.`}]},docs:{description:{component:`Groups mutually exclusive Kura Radio choices in a native fieldset. It owns the single selection contract, group label, visible context, validation, responsive layout, and review restrictions; Radio remains the only individual control owner.`}}},argTypes:{layout:{control:`radio`,options:[`list`,`grid`]},orientation:{control:`radio`,options:[`vertical`,`horizontal`]},disabled:{control:`boolean`},readOnly:{control:`boolean`}}},M={args:{className:T.frame,defaultValue:`clinic`,description:`Choose where the ordered tests will be collected before preparing the next step.`,legend:`Collection route`,name:`collection-route`,children:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(s,{value:`clinic`,children:`Clinic draw`}),(0,E.jsx)(s,{value:`psc`,children:`Patient service centre`})]})},play:async({canvasElement:e})=>{let t=A(e),n=t.getByRole(`radio`,{name:`Clinic draw`}),r=t.getByRole(`radio`,{name:`Patient service centre`});await O(n).toBeChecked(),await k.click(r),await O(r).toBeChecked(),await O(n).not.toBeChecked()}},N={args:{className:T.frame,defaultValue:`routine`,legend:`Order urgency`,name:`order-urgency`,orientation:`horizontal`,children:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(s,{value:`routine`,children:`Routine`}),(0,E.jsx)(s,{value:`urgent`,children:`Urgent`}),(0,E.jsx)(s,{value:`stat`,children:`Stat`})]})}},P={render:()=>(0,E.jsx)(ae,{}),play:async({canvasElement:e})=>{let t=A(e);await k.click(t.getByRole(`radio`,{name:`Patient service centre`})),await O(t.getByText(`Selected: psc`)).toBeVisible()}},F={args:{className:T.frame,error:`Choose a collection route before continuing.`,legend:`Collection route`,name:`collection-route-validation`,required:!0,children:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(s,{value:`clinic`,children:`Clinic draw`}),(0,E.jsx)(s,{value:`psc`,children:`Patient service centre`})]})},play:async({canvasElement:e})=>{let t=A(e);await O(t.getByRole(`group`,{name:`Collection route`})).toHaveAttribute(`aria-invalid`,`true`),await O(t.getByRole(`alert`)).toHaveTextContent(`Choose a collection route before continuing.`)}},I={args:{className:T.frame,defaultValue:`clinic`,description:`The collection route is locked while a booking confirmation is pending.`,disabled:!0,legend:`Collection route`,name:`collection-route-disabled`,children:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(s,{value:`clinic`,children:`Clinic draw`}),(0,E.jsx)(s,{value:`psc`,children:`Patient service centre`})]})},play:async({canvasElement:e})=>{let t=A(e);await O(t.getByRole(`radio`,{name:`Clinic draw`})).toBeDisabled()}},L={args:{className:T.frame,defaultValue:`psc`,description:`The route is fixed after the collection appointment has been confirmed.`,legend:`Collection route`,name:`collection-route-read-only`,readOnly:!0,children:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(s,{value:`clinic`,children:`Clinic draw`}),(0,E.jsx)(s,{value:`psc`,children:`Patient service centre`})]})},play:async({canvasElement:e})=>{let t=A(e),n=t.getByRole(`radio`,{name:`Clinic draw`}),r=t.getByRole(`radio`,{name:`Patient service centre`});await k.click(n),await O(r).toBeChecked(),await O(n).not.toBeChecked()}},R={render:()=>(0,E.jsx)(`div`,{className:T.frame,children:(0,E.jsx)(g,{className:T.card,variant:`outline`,children:(0,E.jsx)(h,{children:(0,E.jsxs)(d,{defaultValue:`secure-message`,legend:`Result delivery`,name:`result-delivery`,children:[(0,E.jsx)(s,{value:`secure-message`,children:(0,E.jsxs)(`span`,{className:T.optionContent,children:[(0,E.jsxs)(`span`,{className:T.optionCopy,children:[(0,E.jsx)(`span`,{className:T.optionTitle,children:`Secure workspace message`}),(0,E.jsx)(`span`,{className:T.optionDescription,children:`Send a notification when the result is released for clinician review.`})]}),(0,E.jsx)(m,{variant:`primary`,children:`Recommended`})]})}),(0,E.jsx)(s,{value:`patient-portal`,children:(0,E.jsx)(`span`,{className:T.optionContent,children:(0,E.jsxs)(`span`,{className:T.optionCopy,children:[(0,E.jsx)(`span`,{className:T.optionTitle,children:`Patient portal`}),(0,E.jsx)(`span`,{className:T.optionDescription,children:`Make the result available only after its configured release gate has passed.`})]})})})]})})})})},z={args:{className:T.frame,defaultValue:`clinic`,description:`The selected route is shown in the order review before collection is scheduled.`,legend:`Collection route`,name:`description-collection-route`,children:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(s,{value:`clinic`,helpText:`Identity and preparation checks happen at the clinic.`,children:`Clinic draw`}),(0,E.jsx)(s,{value:`psc`,helpText:`The patient receives the same preparation summary for a service centre visit.`,children:`Patient service centre`})]})}},B={render:()=>(0,E.jsx)(`div`,{className:T.frame,children:(0,E.jsx)(g,{className:T.card,variant:`outline`,children:(0,E.jsx)(h,{children:(0,E.jsxs)(d,{defaultValue:`secure-message`,description:`Choose the channel used when the result is ready for review.`,legend:`Result delivery`,name:`result-delivery-separated`,children:[(0,E.jsx)(s,{value:`secure-message`,children:`Secure workspace message`}),(0,E.jsx)(c,{className:T.separator}),(0,E.jsx)(s,{value:`patient-portal`,children:`Patient portal`}),(0,E.jsx)(c,{className:T.separator}),(0,E.jsx)(s,{value:`print`,children:`Printed report at the front desk`})]})})})})},V={render:()=>(0,E.jsx)(`div`,{className:T.frame,children:(0,E.jsx)(g,{className:T.card,variant:`outline`,children:(0,E.jsx)(h,{children:(0,E.jsxs)(d,{defaultValue:`clinic`,legend:`Collection route`,name:`icon-collection-route`,children:[(0,E.jsx)(s,{value:`clinic`,children:(0,E.jsxs)(`span`,{className:T.optionContent,children:[(0,E.jsx)(i,{"aria-hidden":!0,size:18}),(0,E.jsxs)(`span`,{className:T.optionCopy,children:[(0,E.jsx)(`span`,{className:T.optionTitle,children:`Clinic draw`}),(0,E.jsx)(`span`,{className:T.optionDescription,children:`Pre-analytical checks are available on site.`})]})]})}),(0,E.jsx)(s,{value:`home`,children:(0,E.jsxs)(`span`,{className:T.optionContent,children:[(0,E.jsx)(a,{"aria-hidden":!0,size:18}),(0,E.jsxs)(`span`,{className:T.optionCopy,children:[(0,E.jsx)(`span`,{className:T.optionTitle,children:`Home collection`}),(0,E.jsx)(`span`,{className:T.optionDescription,children:`Use an approved mobile phlebotomy route.`})]})]})}),(0,E.jsx)(s,{value:`calendar`,children:(0,E.jsxs)(`span`,{className:T.optionContent,children:[(0,E.jsx)(o,{"aria-hidden":!0,size:18}),(0,E.jsxs)(`span`,{className:T.optionCopy,children:[(0,E.jsx)(`span`,{className:T.optionTitle,children:`Book another appointment`}),(0,E.jsx)(`span`,{className:T.optionDescription,children:`Keep the order open until a slot is confirmed.`})]})]})})]})})})})},H={render:()=>(0,E.jsx)(`div`,{className:T.frame,children:(0,E.jsxs)(d,{defaultValue:`routine`,layout:`grid`,legend:`Order urgency`,name:`grid-order-urgency`,children:[(0,E.jsx)(s,{appearance:`card`,helpText:`Use standard turnaround targets.`,value:`routine`,children:`Routine`}),(0,E.jsx)(s,{appearance:`card`,helpText:`Prioritise this order in the active queue.`,value:`urgent`,children:`Urgent`}),(0,E.jsx)(s,{appearance:`card`,helpText:`Immediate processing for a time-critical decision.`,value:`stat`,children:`Stat`}),(0,E.jsx)(s,{appearance:`card`,helpText:`Follow the approved study handling protocol.`,value:`research`,children:`Research protocol`})]})}),play:async({canvasElement:e})=>{let t=A(e),n=t.getByRole(`radio`,{name:`Routine`}),r=t.getByRole(`radio`,{name:`Urgent`});await O(n).toBeChecked(),await k.click(r),await O(r).toBeChecked(),await O(n).not.toBeChecked()}},U={...H,parameters:{viewport:{defaultViewport:`kura320`}}},W={render:()=>(0,E.jsx)(`div`,{className:T.frame,children:(0,E.jsx)(g,{className:T.card,variant:`outline`,children:(0,E.jsx)(h,{children:(0,E.jsxs)(d,{defaultValue:`self`,legend:`Appointment owner`,name:`avatar-appointment-owner`,children:[(0,E.jsx)(s,{value:`self`,children:(0,E.jsxs)(`span`,{className:T.optionContent,children:[(0,E.jsx)(p,{"aria-hidden":!0,fallbackTone:`brand`,size:`sm`,children:(0,E.jsx)(f,{children:`SC`})}),(0,E.jsxs)(`span`,{className:T.optionCopy,children:[(0,E.jsx)(`span`,{className:T.optionTitle,children:`Self-managed appointment`}),(0,E.jsx)(`span`,{className:T.optionDescription,children:`The patient receives the preparation summary.`})]})]})}),(0,E.jsx)(s,{value:`caregiver`,children:(0,E.jsxs)(`span`,{className:T.optionContent,children:[(0,E.jsx)(p,{"aria-hidden":!0,fallbackTone:`info`,size:`sm`,children:(0,E.jsx)(f,{children:`CG`})}),(0,E.jsxs)(`span`,{className:T.optionCopy,children:[(0,E.jsx)(`span`,{className:T.optionTitle,children:`Caregiver-assisted appointment`}),(0,E.jsx)(`span`,{className:T.optionDescription,children:`A nominated caregiver can coordinate reminders.`})]})]})})]})})})})},G={render:()=>(0,E.jsx)(l,{delay:0,children:(0,E.jsx)(`div`,{className:T.frame,children:(0,E.jsxs)(d,{defaultValue:`clinic`,legend:`Collection route`,name:`tooltip-collection-route`,children:[(0,E.jsx)(s,{value:`clinic`,children:(0,E.jsxs)(`span`,{className:T.optionContent,children:[(0,E.jsxs)(`span`,{className:T.optionCopy,children:[(0,E.jsx)(`span`,{className:T.optionTitle,children:`Clinic draw`}),(0,E.jsx)(`span`,{className:T.optionDescription,children:`Identity checks happen before the sample is collected.`})]}),(0,E.jsxs)(ne,{children:[(0,E.jsx)(te,{"aria-label":`Why clinic draw is recommended`,render:(0,E.jsx)(`span`,{className:T.infoTrigger,tabIndex:0}),children:(0,E.jsx)(ee,{"aria-hidden":!0,size:16})}),(0,E.jsx)(re,{children:`Use this route when the order needs an in-person preparation review.`})]})]})}),(0,E.jsx)(s,{value:`psc`,children:`Patient service centre`})]})})})},K={args:{className:T.frame,defaultValue:`standard`,description:`Choose the collection approach that remains safe and practical for the patient, ordered tests, preparation instructions, and current clinic capacity.`,legend:`Collection route for a complex laboratory order with multiple pre-analytical requirements`,name:`long-collection-route`,children:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(s,{helpText:`Collect at the clinic after identity verification, fasting confirmation, and any required timed-collection instructions are reviewed.`,value:`standard`,children:`Clinic draw with pre-collection safeguard review`}),(0,E.jsx)(s,{value:`psc`,children:`Patient service centre with the complete order preparation summary`})]})}},q={args:{className:T.frame,defaultValue:`routine`,legend:`Order urgency`,name:`keyboard-order-urgency`,children:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(s,{value:`routine`,children:`Routine`}),(0,E.jsx)(s,{value:`urgent`,children:`Urgent`}),(0,E.jsx)(s,{value:`stat`,children:`Stat`})]})},play:async({canvasElement:e})=>{let t=A(e),n=t.getByRole(`radio`,{name:`Routine`}),r=t.getByRole(`radio`,{name:`Urgent`});await k.tab(),await O(n).toHaveFocus(),await k.keyboard(`{ArrowDown}`),await O(r).toHaveFocus(),await O(r).toBeChecked()}},J={args:{className:T.frame,defaultValue:`clinic`,legend:`Collection route`,name:`hover-collection-route`,children:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(s,{value:`clinic`,children:`Clinic draw`}),(0,E.jsx)(s,{value:`psc`,children:`Patient service centre`})]})}},Y={args:{className:T.frame,defaultValue:`clinic`,legend:`Collection route`,name:`focus-collection-route`,children:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(s,{value:`clinic`,children:`Clinic draw`}),(0,E.jsx)(s,{value:`psc`,children:`Patient service centre`})]})},play:async({canvasElement:e})=>{let t=A(e).getByRole(`radio`,{name:`Clinic draw`});await k.tab(),await O(t).toHaveFocus(),await O(getComputedStyle(t.closest(`label`)).boxShadow).not.toBe(`none`)}},X={args:{className:T.frame,defaultValue:`clinic`,legend:`Collection route`,name:`mobile-collection-route`,orientation:`horizontal`,children:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(s,{value:`clinic`,children:`Clinic draw`}),(0,E.jsx)(s,{value:`psc`,children:`Patient service centre`})]})},parameters:{viewport:{defaultViewport:`kura320`}}},Z={args:{className:T.frame,defaultValue:`clinic`,legend:`Collection route`,name:`compact-collection-route`,children:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(s,{value:`clinic`,children:`Clinic draw`}),(0,E.jsx)(s,{value:`psc`,children:`Patient service centre`})]})},globals:{density:`compact`}},Q={args:{className:T.frame,defaultValue:`clinic`,legend:`Collection route`,name:`dark-collection-route`,children:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(s,{value:`clinic`,children:`Clinic draw`}),(0,E.jsx)(s,{value:`psc`,children:`Patient service centre`})]})},globals:{theme:`dark`}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    className: styles.frame,
    defaultValue: "clinic",
    description: "Choose where the ordered tests will be collected before preparing the next step.",
    legend: "Collection route",
    name: "collection-route",
    children: <>
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </>
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const clinic = canvas.getByRole("radio", {
      name: "Clinic draw"
    });
    const psc = canvas.getByRole("radio", {
      name: "Patient service centre"
    });
    await expect(clinic).toBeChecked();
    await userEvent.click(psc);
    await expect(psc).toBeChecked();
    await expect(clinic).not.toBeChecked();
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    className: styles.frame,
    defaultValue: "routine",
    legend: "Order urgency",
    name: "order-urgency",
    orientation: "horizontal",
    children: <>
        <Radio value="routine">Routine</Radio>
        <Radio value="urgent">Urgent</Radio>
        <Radio value="stat">Stat</Radio>
      </>
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <ControlledRadioGroupStory />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("radio", {
      name: "Patient service centre"
    }));
    await expect(canvas.getByText("Selected: psc")).toBeVisible();
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    className: styles.frame,
    error: "Choose a collection route before continuing.",
    legend: "Collection route",
    name: "collection-route-validation",
    required: true,
    children: <>
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </>
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("group", {
      name: "Collection route"
    })).toHaveAttribute("aria-invalid", "true");
    await expect(canvas.getByRole("alert")).toHaveTextContent("Choose a collection route before continuing.");
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    className: styles.frame,
    defaultValue: "clinic",
    description: "The collection route is locked while a booking confirmation is pending.",
    disabled: true,
    legend: "Collection route",
    name: "collection-route-disabled",
    children: <>
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </>
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("radio", {
      name: "Clinic draw"
    })).toBeDisabled();
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    className: styles.frame,
    defaultValue: "psc",
    description: "The route is fixed after the collection appointment has been confirmed.",
    legend: "Collection route",
    name: "collection-route-read-only",
    readOnly: true,
    children: <>
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </>
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const clinic = canvas.getByRole("radio", {
      name: "Clinic draw"
    });
    const psc = canvas.getByRole("radio", {
      name: "Patient service centre"
    });
    await userEvent.click(clinic);
    await expect(psc).toBeChecked();
    await expect(clinic).not.toBeChecked();
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <div className={styles.frame}>
      <Card className={styles.card} variant="outline">
        <CardContent>
          <RadioGroup defaultValue="secure-message" legend="Result delivery" name="result-delivery">
            <Radio value="secure-message">
              <span className={styles.optionContent}>
                <span className={styles.optionCopy}>
                  <span className={styles.optionTitle}>
                    Secure workspace message
                  </span>
                  <span className={styles.optionDescription}>
                    Send a notification when the result is released for
                    clinician review.
                  </span>
                </span>
                <Badge variant="primary">Recommended</Badge>
              </span>
            </Radio>
            <Radio value="patient-portal">
              <span className={styles.optionContent}>
                <span className={styles.optionCopy}>
                  <span className={styles.optionTitle}>Patient portal</span>
                  <span className={styles.optionDescription}>
                    Make the result available only after its configured release
                    gate has passed.
                  </span>
                </span>
              </span>
            </Radio>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    className: styles.frame,
    defaultValue: "clinic",
    description: "The selected route is shown in the order review before collection is scheduled.",
    legend: "Collection route",
    name: "description-collection-route",
    children: <>
        <Radio value="clinic" helpText="Identity and preparation checks happen at the clinic.">
          Clinic draw
        </Radio>
        <Radio value="psc" helpText="The patient receives the same preparation summary for a service centre visit.">
          Patient service centre
        </Radio>
      </>
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <div className={styles.frame}>
      <Card className={styles.card} variant="outline">
        <CardContent>
          <RadioGroup defaultValue="secure-message" description="Choose the channel used when the result is ready for review." legend="Result delivery" name="result-delivery-separated">
            <Radio value="secure-message">Secure workspace message</Radio>
            <Separator className={styles.separator} />
            <Radio value="patient-portal">Patient portal</Radio>
            <Separator className={styles.separator} />
            <Radio value="print">Printed report at the front desk</Radio>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <div className={styles.frame}>
      <Card className={styles.card} variant="outline">
        <CardContent>
          <RadioGroup defaultValue="clinic" legend="Collection route" name="icon-collection-route">
            <Radio value="clinic">
              <span className={styles.optionContent}>
                <TestTubeIcon aria-hidden size={18} />
                <span className={styles.optionCopy}>
                  <span className={styles.optionTitle}>Clinic draw</span>
                  <span className={styles.optionDescription}>
                    Pre-analytical checks are available on site.
                  </span>
                </span>
              </span>
            </Radio>
            <Radio value="home">
              <span className={styles.optionContent}>
                <HomeIcon aria-hidden size={18} />
                <span className={styles.optionCopy}>
                  <span className={styles.optionTitle}>Home collection</span>
                  <span className={styles.optionDescription}>
                    Use an approved mobile phlebotomy route.
                  </span>
                </span>
              </span>
            </Radio>
            <Radio value="calendar">
              <span className={styles.optionContent}>
                <CalendarIcon aria-hidden size={18} />
                <span className={styles.optionCopy}>
                  <span className={styles.optionTitle}>
                    Book another appointment
                  </span>
                  <span className={styles.optionDescription}>
                    Keep the order open until a slot is confirmed.
                  </span>
                </span>
              </span>
            </Radio>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <div className={styles.frame}>
      <RadioGroup defaultValue="routine" layout="grid" legend="Order urgency" name="grid-order-urgency">
        <Radio appearance="card" helpText="Use standard turnaround targets." value="routine">
          Routine
        </Radio>
        <Radio appearance="card" helpText="Prioritise this order in the active queue." value="urgent">
          Urgent
        </Radio>
        <Radio appearance="card" helpText="Immediate processing for a time-critical decision." value="stat">
          Stat
        </Radio>
        <Radio appearance="card" helpText="Follow the approved study handling protocol." value="research">
          Research protocol
        </Radio>
      </RadioGroup>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const routine = canvas.getByRole("radio", {
      name: "Routine"
    });
    const urgent = canvas.getByRole("radio", {
      name: "Urgent"
    });
    await expect(routine).toBeChecked();
    await userEvent.click(urgent);
    await expect(urgent).toBeChecked();
    await expect(routine).not.toBeChecked();
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  ...GridLayout,
  parameters: {
    viewport: {
      defaultViewport: "kura320"
    }
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <div className={styles.frame}>
      <Card className={styles.card} variant="outline">
        <CardContent>
          <RadioGroup defaultValue="self" legend="Appointment owner" name="avatar-appointment-owner">
            <Radio value="self">
              <span className={styles.optionContent}>
                <Avatar aria-hidden fallbackTone="brand" size="sm">
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <span className={styles.optionCopy}>
                  <span className={styles.optionTitle}>
                    Self-managed appointment
                  </span>
                  <span className={styles.optionDescription}>
                    The patient receives the preparation summary.
                  </span>
                </span>
              </span>
            </Radio>
            <Radio value="caregiver">
              <span className={styles.optionContent}>
                <Avatar aria-hidden fallbackTone="info" size="sm">
                  <AvatarFallback>CG</AvatarFallback>
                </Avatar>
                <span className={styles.optionCopy}>
                  <span className={styles.optionTitle}>
                    Caregiver-assisted appointment
                  </span>
                  <span className={styles.optionDescription}>
                    A nominated caregiver can coordinate reminders.
                  </span>
                </span>
              </span>
            </Radio>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <TooltipProvider delay={0}>
      <div className={styles.frame}>
        <RadioGroup defaultValue="clinic" legend="Collection route" name="tooltip-collection-route">
          <Radio value="clinic">
            <span className={styles.optionContent}>
              <span className={styles.optionCopy}>
                <span className={styles.optionTitle}>Clinic draw</span>
                <span className={styles.optionDescription}>
                  Identity checks happen before the sample is collected.
                </span>
              </span>
              <Tooltip>
                <TooltipTrigger aria-label="Why clinic draw is recommended" render={<span className={styles.infoTrigger} tabIndex={0} />}>
                  <InformationIcon aria-hidden size={16} />
                </TooltipTrigger>
                <TooltipContent>
                  Use this route when the order needs an in-person preparation
                  review.
                </TooltipContent>
              </Tooltip>
            </span>
          </Radio>
          <Radio value="psc">Patient service centre</Radio>
        </RadioGroup>
      </div>
    </TooltipProvider>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    className: styles.frame,
    defaultValue: "standard",
    description: "Choose the collection approach that remains safe and practical for the patient, ordered tests, preparation instructions, and current clinic capacity.",
    legend: "Collection route for a complex laboratory order with multiple pre-analytical requirements",
    name: "long-collection-route",
    children: <>
        <Radio helpText="Collect at the clinic after identity verification, fasting confirmation, and any required timed-collection instructions are reviewed." value="standard">
          Clinic draw with pre-collection safeguard review
        </Radio>
        <Radio value="psc">
          Patient service centre with the complete order preparation summary
        </Radio>
      </>
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    className: styles.frame,
    defaultValue: "routine",
    legend: "Order urgency",
    name: "keyboard-order-urgency",
    children: <>
        <Radio value="routine">Routine</Radio>
        <Radio value="urgent">Urgent</Radio>
        <Radio value="stat">Stat</Radio>
      </>
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const routine = canvas.getByRole("radio", {
      name: "Routine"
    });
    const urgent = canvas.getByRole("radio", {
      name: "Urgent"
    });
    await userEvent.tab();
    await expect(routine).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(urgent).toHaveFocus();
    await expect(urgent).toBeChecked();
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    className: styles.frame,
    defaultValue: "clinic",
    legend: "Collection route",
    name: "hover-collection-route",
    children: <>
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </>
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    className: styles.frame,
    defaultValue: "clinic",
    legend: "Collection route",
    name: "focus-collection-route",
    children: <>
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </>
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio", {
      name: "Clinic draw"
    });
    await userEvent.tab();
    await expect(radio).toHaveFocus();
    await expect(getComputedStyle(radio.closest("label")!).boxShadow).not.toBe("none");
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    className: styles.frame,
    defaultValue: "clinic",
    legend: "Collection route",
    name: "mobile-collection-route",
    orientation: "horizontal",
    children: <>
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </>
  },
  parameters: {
    viewport: {
      defaultViewport: "kura320"
    }
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    className: styles.frame,
    defaultValue: "clinic",
    legend: "Collection route",
    name: "compact-collection-route",
    children: <>
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </>
  },
  globals: {
    density: "compact"
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    className: styles.frame,
    defaultValue: "clinic",
    legend: "Collection route",
    name: "dark-collection-route",
    children: <>
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </>
  },
  globals: {
    theme: "dark"
  }
}`,...Q.parameters?.docs?.source}}},$=[`Default`,`Inline`,`Controlled`,`Validation`,`Disabled`,`ReadOnly`,`CardComposition`,`WithDescription`,`CardWithSeparators`,`CardWithIcons`,`GridLayout`,`GridLayoutMobile320`,`AvatarCards`,`TooltipInfo`,`LongContent`,`KeyboardNavigation`,`Hover`,`FocusVisible`,`Mobile320`,`CompactDensity`,`DarkTheme`]}))();export{W as AvatarCards,R as CardComposition,V as CardWithIcons,B as CardWithSeparators,Z as CompactDensity,P as Controlled,Q as DarkTheme,M as Default,I as Disabled,Y as FocusVisible,H as GridLayout,U as GridLayoutMobile320,J as Hover,N as Inline,q as KeyboardNavigation,K as LongContent,X as Mobile320,L as ReadOnly,G as TooltipInfo,F as Validation,z as WithDescription,$ as __namedExportsOrder,j as default};