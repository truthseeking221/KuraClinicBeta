import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{D as i,ct as a}from"./provider-marks-BeHzyBjc.js";import{t as o}from"./icons-C5MW4nvJ.js";import{fr as s,t as c}from"./ui-C9kmmzkH.js";import{t as l}from"./button-B6_zsN5-.js";import{n as u,r as d,t as f}from"./collapsible-Cfc9M9oP.js";var p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L;t((()=>{p=r(),m=e(n()),c(),o(),{expect:h,userEvent:g,within:_}=__STORYBOOK_MODULE_TEST__,v={title:`Design System/Primitives/Collapsible`,component:f,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:{intake:{decision:`CREATE`,owner:`src/components/ui`,evidence:`Fresh Storybook and source search found Accordion but no independent disclosure primitive. Collapsible owns one trigger/content region; Accordion remains the owner for coordinated section groups.`},source:{vendor:`ReUI`,registryItem:`collapsible`,sourceUrl:`https://reui.io/components/collapsible`},binding:{colors:`kura-semantic`,typography:`kura`,spacing:`kura`,radius:`kura`,elevation:`kura-focus-only`,icons:`kura-canonical`,density:`kura-root-attribute`,responsive:`fluid-wrap-and-natural-content-reflow`,motion:`kura-140ms-trigger-feedback-reduced-motion-safe`},exclusions:[{reuiExample:`Animated card and frame compositions`,reason:`A generic disclosure must not force a card or repeated surface. Compose Card only when the owning workflow needs a real boundary.`,replacement:`Card + Collapsible composition in the owning feature story.`},{reuiExample:`User profile, multi-level menu, and file tree demos`,reason:`These are domain compositions with different navigation, permission, and action semantics; demo data does not belong in the primitive.`,replacement:`Nested Collapsible primitives owned by the relevant navigation or workspace feature.`},{reuiExample:`Bottom trigger placement`,reason:`Trigger placement is a layout decision, not a second disclosure behavior.`,replacement:`Feature-owned composition using the canonical trigger and responsive layout.`}]},docs:{description:{component:`A single disclosure region for optional or secondary detail. Use Accordion when several related sections need coordinated open-state behavior.`}}},argTypes:{defaultOpen:{control:`boolean`},open:{control:`boolean`},disabled:{control:`boolean`},onOpenChange:{action:`open changed`}}},y={render:()=>(0,p.jsxs)(f,{className:`w-full max-w-2xl`,children:[(0,p.jsx)(d,{children:`Review preparation guidance`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`Fasting instructions are optional for this order. Confirm the request and the patient’s current preparation status before proceeding.`})})]}),play:async({canvasElement:e})=>{let t=_(e),n=t.getByRole(`button`,{name:/review preparation guidance/i});await h(n).toHaveAttribute(`aria-expanded`,`false`),await g.click(n),await h(n).toHaveAttribute(`aria-expanded`,`true`),await h(t.getByText(/fasting instructions are optional/i)).toBeVisible(),await g.click(n),await h(n).toHaveAttribute(`aria-expanded`,`false`)}},b={args:{defaultOpen:!0},render:()=>(0,p.jsxs)(f,{className:`w-full max-w-2xl`,defaultOpen:!0,children:[(0,p.jsx)(d,{leadingIcon:(0,p.jsx)(a,{"aria-hidden":`true`}),children:`Specimen collection notes`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`Verify the collection time, specimen type, and fasting status. If the order has special handling requirements, keep the instructions visible while preparing the specimen.`})})]})},x={render:()=>{let[e,t]=(0,m.useState)(!1);return(0,p.jsxs)(`div`,{className:`flex w-full max-w-2xl flex-col gap-3`,children:[(0,p.jsxs)(f,{open:e,onOpenChange:t,children:[(0,p.jsx)(d,{leadingIcon:(0,p.jsx)(i,{"aria-hidden":`true`}),children:`Consultation context`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`The current visit is linked to the verified patient record and the assigned consultation team.`})})]}),(0,p.jsxs)(`p`,{"aria-live":`polite`,className:`text-sm text-muted-foreground`,children:[`Context is `,e?`visible`:`hidden`,`.`]})]})},play:async({canvasElement:e})=>{let t=_(e),n=t.getByRole(`button`,{name:/consultation context/i});await g.click(n),await h(t.getByText(/context is visible/i)).toBeVisible(),await h(n).toHaveAttribute(`aria-controls`)}},S={render:()=>(0,p.jsxs)(f,{className:`w-full max-w-2xl`,defaultOpen:!0,children:[(0,p.jsx)(d,{children:`Optional order inclusions`}),(0,p.jsx)(u,{children:(0,p.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,p.jsx)(s,{defaultChecked:!0,helpText:`The selected items will be included in the printed summary.`,children:`Include preparation instructions`}),(0,p.jsx)(s,{children:`Include the current medication list`})]})})]})},C={render:()=>(0,p.jsxs)(`div`,{className:`flex w-full max-w-2xl flex-col gap-2`,children:[(0,p.jsxs)(f,{children:[(0,p.jsx)(d,{meta:`Optional`,children:`Address`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`Province, district, commune, and street are collected only when the patient offers them.`})})]}),(0,p.jsxs)(f,{children:[(0,p.jsx)(d,{meta:`2 of 6 pending`,children:`Haematology`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`Four analytes are released; two are still with the laboratory.`})})]})]}),play:async({canvasElement:e})=>{let t=_(e),n=t.getByRole(`button`,{name:/address optional/i});await h(n).toHaveAttribute(`aria-expanded`,`false`),await g.click(n),await h(t.getByText(/province, district, commune/i)).toBeVisible()}},w={render:()=>(0,p.jsxs)(f,{className:`w-full max-w-2xl`,defaultOpen:!0,children:[(0,p.jsx)(d,{chevronPosition:`leading`,meta:`8 tests`,children:`Biochemistry`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`Category contents stay flush with the trigger label when the chevron leads.`})})]})},T={render:()=>(0,p.jsxs)(f,{className:`w-full max-w-2xl`,defaultOpen:!0,inset:`none`,children:[(0,p.jsx)(d,{meta:`Optional`,children:`Refund account`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`The label and this paragraph share one left edge.`})})]}),play:async({canvasElement:e})=>{let t=_(e).getByRole(`button`,{name:/refund account optional/i}),n=e.querySelector(`[data-slot="collapsible-content"]`);await h(t).toHaveAttribute(`data-inset`,`none`),await h(n).toHaveAttribute(`data-inset`,`none`)}},E={render:()=>(0,p.jsxs)(f,{className:`w-full max-w-2xl`,children:[(0,p.jsx)(d,{headingLevel:3,meta:`Optional`,children:`Refund account`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`Add a Bakong KHQR account only if this patient may need a refund.`})})]}),play:async({canvasElement:e})=>{let t=_(e);await h(t.getByRole(`heading`,{level:3,name:/refund account/i})).toBeVisible(),await g.click(t.getByRole(`button`,{name:/refund account optional/i})),await h(t.getByText(/bakong khqr account/i)).toBeVisible()}},D={render:()=>(0,p.jsxs)(f,{className:`w-full max-w-2xl`,defaultOpen:!0,children:[(0,p.jsx)(d,{children:`Review workflow details`}),(0,p.jsx)(u,{children:(0,p.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,p.jsxs)(f,{children:[(0,p.jsx)(d,{children:`Orders`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`Complete blood count and HbA1c are ready for collection.`})})]}),(0,p.jsxs)(f,{children:[(0,p.jsx)(d,{children:`Results`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`Two results are available; one laboratory result is still pending.`})})]})]})})]})},O={render:()=>(0,p.jsxs)(`div`,{className:`flex w-full max-w-2xl flex-col gap-2`,children:[(0,p.jsxs)(f,{disabled:!0,children:[(0,p.jsx)(d,{children:`Restricted clinical notes`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`Only roles with the required permission can review these notes.`})})]}),(0,p.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`This disclosure is unavailable because the current role does not have permission.`})]})},k={args:{defaultOpen:!0},render:()=>(0,p.jsxs)(f,{className:`w-full max-w-2xl`,defaultOpen:!0,children:[(0,p.jsx)(d,{children:`Review before acknowledging a critical result`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`Confirm the patient identity, specimen, collection time, reference range, and verification status. Compare the result with the patient context and current treatment. If the value may require immediate action, follow the clinic escalation policy, document the acknowledgement, and make the responsible clinician clear before closing the review.`})})]})},A={render:()=>(0,p.jsxs)(f,{className:`w-full max-w-2xl`,children:[(0,p.jsx)(d,{asChild:!0,showChevron:!1,children:(0,p.jsx)(l,{variant:`ghost`,fullWidth:!0,disclosure:!0,children:`View visit context`})}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`The visit is linked to the verified patient record and the current consultation.`})})]})},j={render:()=>(0,p.jsxs)(f,{className:`w-full max-w-2xl`,children:[(0,p.jsx)(d,{children:`Keyboard-accessible visit details`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`The disclosure can be opened and closed with Enter or Space after focus reaches the trigger.`})})]}),play:async({canvasElement:e})=>{let t=_(e).getByRole(`button`,{name:/keyboard-accessible visit details/i});await g.tab(),await h(t).toHaveFocus(),await g.keyboard(` `),await h(t).toHaveAttribute(`aria-expanded`,`true`)}},M={render:()=>(0,p.jsxs)(`div`,{className:`flex w-full max-w-3xl flex-col gap-3`,children:[(0,p.jsx)(`div`,{"data-density":`compact`,children:(0,p.jsxs)(f,{defaultOpen:!0,children:[(0,p.jsx)(d,{children:`Compact density`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`Useful for dense operational review where vertical space is limited.`})})]})}),(0,p.jsx)(`div`,{"data-density":`cozy`,children:(0,p.jsxs)(f,{defaultOpen:!0,children:[(0,p.jsx)(d,{children:`Cozy density`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`The default density balances scanability with comfortable touch targets.`})})]})}),(0,p.jsx)(`div`,{"data-density":`comfortable`,children:(0,p.jsxs)(f,{defaultOpen:!0,children:[(0,p.jsx)(d,{children:`Comfortable density`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`Useful when the workflow needs more separation between disclosure decisions.`})})]})})]})},N={parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,p.jsx)(`div`,{className:`w-full max-w-xs`,children:(0,p.jsxs)(f,{children:[(0,p.jsx)(d,{children:`Long label that must wrap without losing the disclosure affordance`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`Long content remains in the document flow and can be read without horizontal scrolling.`})})]})})},P={render:()=>(0,p.jsx)(`div`,{className:`w-full max-w-3xl`,children:(0,p.jsxs)(f,{defaultOpen:!0,children:[(0,p.jsx)(d,{children:`Tablet review context`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`Content reflows naturally between the narrow and desktop layouts.`})})]})})},F={render:()=>(0,p.jsx)(`div`,{className:`w-full max-w-5xl`,children:(0,p.jsxs)(f,{defaultOpen:!0,children:[(0,p.jsx)(d,{children:`Desktop review context with supporting detail`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`Use a flat disclosure when the detail is optional and does not need a separate surface.`})})]})})},I={parameters:{viewport:{defaultViewport:`mobile1`}},render:()=>(0,p.jsxs)(f,{className:`w-full`,children:[(0,p.jsx)(d,{children:`Long preparation instructions for a mobile viewport`}),(0,p.jsx)(u,{children:(0,p.jsx)(`p`,{children:`Keep the trigger label readable and let the content reflow naturally. The full preparation guidance remains available without horizontal scrolling or hover-only interaction.`})})]}),play:async({canvasElement:e})=>{let t=_(e),n=t.getByRole(`button`,{name:/long preparation instructions/i});await g.click(n),await h(t.getByText(/keep the trigger label readable/i)).toBeVisible()}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Collapsible className="w-full max-w-2xl">
      <CollapsibleTrigger>Review preparation guidance</CollapsibleTrigger>
      <CollapsibleContent>
        <p>
          Fasting instructions are optional for this order. Confirm the request and the patient’s current
          preparation status before proceeding.
        </p>
      </CollapsibleContent>
    </Collapsible>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: /review preparation guidance/i
    });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByText(/fasting instructions are optional/i)).toBeVisible();
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    defaultOpen: true
  },
  render: () => <Collapsible className="w-full max-w-2xl" defaultOpen>
      <CollapsibleTrigger leadingIcon={<MedicalFileIcon aria-hidden="true" />}>
        Specimen collection notes
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p>
          Verify the collection time, specimen type, and fasting status. If the order has special handling
          requirements, keep the instructions visible while preparing the specimen.
        </p>
      </CollapsibleContent>
    </Collapsible>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <div className="flex w-full max-w-2xl flex-col gap-3">
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger leadingIcon={<ClipboardListIcon aria-hidden="true" />}>
            Consultation context
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p>
              The current visit is linked to the verified patient record and the assigned consultation team.
            </p>
          </CollapsibleContent>
        </Collapsible>
        <p aria-live="polite" className="text-sm text-muted-foreground">
          Context is {open ? 'visible' : 'hidden'}.
        </p>
      </div>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: /consultation context/i
    });
    await userEvent.click(trigger);
    await expect(canvas.getByText(/context is visible/i)).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-controls');
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Collapsible className="w-full max-w-2xl" defaultOpen>
      <CollapsibleTrigger>Optional order inclusions</CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-3">
          <Checkbox defaultChecked helpText="The selected items will be included in the printed summary.">
            Include preparation instructions
          </Checkbox>
          <Checkbox>Include the current medication list</Checkbox>
        </div>
      </CollapsibleContent>
    </Collapsible>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-full max-w-2xl flex-col gap-2">
      <Collapsible>
        <CollapsibleTrigger meta="Optional">Address</CollapsibleTrigger>
        <CollapsibleContent>
          <p>Province, district, commune, and street are collected only when the patient offers them.</p>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger meta="2 of 6 pending">Haematology</CollapsibleTrigger>
        <CollapsibleContent>
          <p>Four analytes are released; two are still with the laboratory.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: /address optional/i
    });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await expect(canvas.getByText(/province, district, commune/i)).toBeVisible();
  }
}`,...C.parameters?.docs?.source},description:{story:"Secondary text belongs in `meta`, beside the label it qualifies. Without the\nslot, every consumer rebuilds the trigger label and its typography drifts.",...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Collapsible className="w-full max-w-2xl" defaultOpen>
      <CollapsibleTrigger chevronPosition="leading" meta="8 tests">
        Biochemistry
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p>Category contents stay flush with the trigger label when the chevron leads.</p>
      </CollapsibleContent>
    </Collapsible>
}`,...w.parameters?.docs?.source},description:{story:`A leading chevron suits stacked section lists where the label carries the scan line.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Collapsible className="w-full max-w-2xl" defaultOpen inset="none">
      <CollapsibleTrigger meta="Optional">Refund account</CollapsibleTrigger>
      <CollapsibleContent>
        <p>The label and this paragraph share one left edge.</p>
      </CollapsibleContent>
    </Collapsible>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: /refund account optional/i
    });
    const content = canvasElement.querySelector('[data-slot="collapsible-content"]');
    await expect(trigger).toHaveAttribute('data-inset', 'none');
    await expect(content).toHaveAttribute('data-inset', 'none');
  }
}`,...T.parameters?.docs?.source},description:{story:'`inset="none"` removes the horizontal padding from the trigger and the\ncontent together, so a disclosure shares the left edge of the form it sits in.',...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <Collapsible className="w-full max-w-2xl">
      <CollapsibleTrigger headingLevel={3} meta="Optional">
        Refund account
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p>Add a Bakong KHQR account only if this patient may need a refund.</p>
      </CollapsibleContent>
    </Collapsible>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', {
      level: 3,
      name: /refund account/i
    })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', {
      name: /refund account optional/i
    }));
    await expect(canvas.getByText(/bakong khqr account/i)).toBeVisible();
  }
}`,...E.parameters?.docs?.source},description:{story:"When the disclosure titles a group of content, `headingLevel` keeps it in the\ndocument outline without adding a second visible label.",...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <Collapsible className="w-full max-w-2xl" defaultOpen>
      <CollapsibleTrigger>Review workflow details</CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-2">
          <Collapsible>
            <CollapsibleTrigger>Orders</CollapsibleTrigger>
            <CollapsibleContent>
              <p>Complete blood count and HbA1c are ready for collection.</p>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger>Results</CollapsibleTrigger>
            <CollapsibleContent>
              <p>Two results are available; one laboratory result is still pending.</p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CollapsibleContent>
    </Collapsible>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-full max-w-2xl flex-col gap-2">
      <Collapsible disabled>
        <CollapsibleTrigger>Restricted clinical notes</CollapsibleTrigger>
        <CollapsibleContent>
          <p>Only roles with the required permission can review these notes.</p>
        </CollapsibleContent>
      </Collapsible>
      <p className="text-sm text-muted-foreground">
        This disclosure is unavailable because the current role does not have permission.
      </p>
    </div>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    defaultOpen: true
  },
  render: () => <Collapsible className="w-full max-w-2xl" defaultOpen>
      <CollapsibleTrigger>Review before acknowledging a critical result</CollapsibleTrigger>
      <CollapsibleContent>
        <p>
          Confirm the patient identity, specimen, collection time, reference range, and verification status.
          Compare the result with the patient context and current treatment. If the value may require
          immediate action, follow the clinic escalation policy, document the acknowledgement, and make
          the responsible clinician clear before closing the review.
        </p>
      </CollapsibleContent>
    </Collapsible>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <Collapsible className="w-full max-w-2xl">
      <CollapsibleTrigger asChild showChevron={false}>
        <Button variant="ghost" fullWidth disclosure>
          View visit context
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p>The visit is linked to the verified patient record and the current consultation.</p>
      </CollapsibleContent>
    </Collapsible>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <Collapsible className="w-full max-w-2xl">
      <CollapsibleTrigger>Keyboard-accessible visit details</CollapsibleTrigger>
      <CollapsibleContent>
        <p>The disclosure can be opened and closed with Enter or Space after focus reaches the trigger.</p>
      </CollapsibleContent>
    </Collapsible>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: /keyboard-accessible visit details/i
    });
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-full max-w-3xl flex-col gap-3">
      <div data-density="compact">
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Compact density</CollapsibleTrigger>
          <CollapsibleContent>
            <p>Useful for dense operational review where vertical space is limited.</p>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div data-density="cozy">
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Cozy density</CollapsibleTrigger>
          <CollapsibleContent>
            <p>The default density balances scanability with comfortable touch targets.</p>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div data-density="comfortable">
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Comfortable density</CollapsibleTrigger>
          <CollapsibleContent>
            <p>Useful when the workflow needs more separation between disclosure decisions.</p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <div className="w-full max-w-xs">
      <Collapsible>
        <CollapsibleTrigger>Long label that must wrap without losing the disclosure affordance</CollapsibleTrigger>
        <CollapsibleContent>
          <p>Long content remains in the document flow and can be read without horizontal scrolling.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-3xl">
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Tablet review context</CollapsibleTrigger>
        <CollapsibleContent>
          <p>Content reflows naturally between the narrow and desktop layouts.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-5xl">
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Desktop review context with supporting detail</CollapsibleTrigger>
        <CollapsibleContent>
          <p>Use a flat disclosure when the detail is optional and does not need a separate surface.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <Collapsible className="w-full">
      <CollapsibleTrigger>Long preparation instructions for a mobile viewport</CollapsibleTrigger>
      <CollapsibleContent>
        <p>
          Keep the trigger label readable and let the content reflow naturally. The full preparation
          guidance remains available without horizontal scrolling or hover-only interaction.
        </p>
      </CollapsibleContent>
    </Collapsible>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: /long preparation instructions/i
    });
    await userEvent.click(trigger);
    await expect(canvas.getByText(/keep the trigger label readable/i)).toBeVisible();
  }
}`,...I.parameters?.docs?.source}}},L=[`Default`,`Open`,`Controlled`,`Settings`,`WithMeta`,`LeadingChevron`,`FlushInset`,`HeadingSemantics`,`Nested`,`Disabled`,`LongContent`,`AsChildWithButton`,`Keyboard`,`DensityModes`,`NarrowContent`,`Tablet`,`Desktop`,`MobileInteractive`]}))();export{A as AsChildWithButton,x as Controlled,y as Default,M as DensityModes,F as Desktop,O as Disabled,T as FlushInset,E as HeadingSemantics,j as Keyboard,w as LeadingChevron,k as LongContent,I as MobileInteractive,N as NarrowContent,D as Nested,b as Open,S as Settings,P as Tablet,C as WithMeta,L as __namedExportsOrder,v as default};