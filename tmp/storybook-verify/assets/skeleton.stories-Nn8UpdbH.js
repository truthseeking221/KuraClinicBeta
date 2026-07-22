import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{t as n}from"./ui-C9kmmzkH.js";import{t as r}from"./skeleton-yGvKPj3C.js";import{n as i,t as a}from"./intake-components.stories.module-pqbVgWyl.js";var o,s,c,l,u,d,f,p,m,h;e((()=>{o=t(),n(),a(),{expect:s,within:c}=__STORYBOOK_MODULE_TEST__,l={title:`Design System/Primitives/Skeleton`,component:r,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:{source:{vendor:`ReUI`,registryItem:`@reui/c-skeleton-1`},intake:{decision:`EXTEND`,owner:`src/components/ui`,evidence:`A token-bound Kura placeholder already existed; the ReUI family supplied loading composition evidence, not a second primitive.`,exclusions:[`Decorative page mockups remain story compositions rather than Skeleton props.`]},binding:{colors:`kura-neutral`,spacing:`kura`,radius:`kura`,motion:`tokenized-shimmer-with-reduced-motion`}},docs:{description:{component:`Preserves loading geometry without exposing placeholder content to assistive technology. Pair the group with a visible or accessible loading status.`}}},argTypes:{shape:{control:`radio`,options:[`rectangle`,`text`,`circle`]}}},u={args:{className:i.skeletonBlock}},d={args:{},render:()=>(0,o.jsx)(`div`,{className:i.frame,role:`status`,"aria-label":`Loading patient summary`,children:(0,o.jsxs)(`div`,{className:i.skeletonRow,children:[(0,o.jsx)(r,{shape:`circle`}),(0,o.jsxs)(`div`,{className:i.skeletonCopy,children:[(0,o.jsx)(r,{className:i.skeletonMedium,shape:`text`}),(0,o.jsx)(r,{className:i.skeletonShort,shape:`text`})]})]})}),play:async({canvasElement:e})=>{let t=c(e);await s(t.getByRole(`status`,{name:`Loading patient summary`})).toBeVisible(),await s(e.querySelectorAll(`[data-slot="skeleton"]`)).toHaveLength(3)}},f={args:{animated:!1,className:i.skeletonBlock}},p={args:{},render:()=>(0,o.jsxs)(`div`,{className:i.frame,role:`status`,"aria-label":`Loading appointment queue`,children:[(0,o.jsx)(`p`,{className:i.supporting,children:`Loading appointment queue…`}),(0,o.jsx)(`div`,{className:i.stack,"aria-hidden":`true`,children:[1,2,3].map(e=>(0,o.jsxs)(`div`,{className:i.skeletonRow,children:[(0,o.jsx)(r,{shape:`circle`}),(0,o.jsxs)(`div`,{className:i.skeletonCopy,children:[(0,o.jsx)(r,{className:i.skeletonMedium,shape:`text`}),(0,o.jsx)(r,{className:i.skeletonShort,shape:`text`})]})]},e))})]})},m={...p,parameters:{viewport:{defaultViewport:`mobile1`}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    className: styles.skeletonBlock
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {},
  render: () => <div className={styles.frame} role="status" aria-label="Loading patient summary">
      <div className={styles.skeletonRow}>
        <Skeleton shape="circle" />
        <div className={styles.skeletonCopy}>
          <Skeleton className={styles.skeletonMedium} shape="text" />
          <Skeleton className={styles.skeletonShort} shape="text" />
        </div>
      </div>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('status', {
      name: 'Loading patient summary'
    })).toBeVisible();
    await expect(canvasElement.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(3);
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    animated: false,
    className: styles.skeletonBlock
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {},
  render: () => <div className={styles.frame} role="status" aria-label="Loading appointment queue">
      <p className={styles.supporting}>Loading appointment queue…</p>
      <div className={styles.stack} aria-hidden="true">
        {[1, 2, 3].map(row => <div className={styles.skeletonRow} key={row}>
            <Skeleton shape="circle" />
            <div className={styles.skeletonCopy}>
              <Skeleton className={styles.skeletonMedium} shape="text" />
              <Skeleton className={styles.skeletonShort} shape="text" />
            </div>
          </div>)}
      </div>
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...LoadingList,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...m.parameters?.docs?.source}}},h=[`Default`,`Shapes`,`Static`,`LoadingList`,`MobileNarrow`]}))();export{u as Default,p as LoadingList,m as MobileNarrow,d as Shapes,f as Static,h as __namedExportsOrder,l as default};