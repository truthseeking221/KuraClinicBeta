import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{S as n,b as r,c as i,s as a,x as o}from"./demo-data-lOaHj2eX.js";import{n as s,t as c}from"./lab-range-band-BVLLXP1-.js";import{n as l,t as u}from"./results.stories.module-CCQ5ijp9.js";import{n as d,t as f}from"./storybook-metadata-BMnyaNTp.js";var p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;e((()=>{p=t(),n(),s(),u(),d(),m={title:`Clinic/Clinical/Results/Range Band`,component:c,tags:[`autodocs`,`source-reui`,`adapted-kura`],parameters:{layout:`padded`,kura:f,docs:{description:{component:`Single released-result comparison against the applicable catalog tiers. Zone labels come from each real range; the component never assumes a fixed five-zone legend.`}}}},h=o([40,60,100,140]),g={args:{range:h,value:{kind:`numeric`,value:75}}},_={args:{range:h,value:{kind:`numeric`,value:118}}},v={name:`Critical — explicit panic bound`,args:{range:h,value:{kind:`numeric`,value:151}}},y={name:`Three tiers — HbA1c diabetes classification remains abnormal`,args:{range:a,value:{kind:`numeric`,value:7.1}}},b={name:`Multiple adjacent normal tiers — HDL protective`,args:{range:i,value:{kind:`numeric`,value:72}}},x={args:{range:r,value:{kind:`text`,value:`Trace`}}},S={name:`Qualitative value not mapped to a catalog tier`,args:{range:r,value:{kind:`text`,value:`Pending comment`}}},C={args:{range:a,value:{kind:`numeric`,value:9.8}},parameters:{docs:{description:{story:`The marker stays centered inside an open-ended tier because the scale outside the last bound is not linear.`}}}},w={args:{range:h}},T={args:{range:h,value:{kind:`numeric`,value:92},showTicks:!1}},E={name:`Standalone — measured value rides the marker`,args:{range:h,value:{kind:`numeric`,value:118,display:`118 mg/dL`},showValue:!0},parameters:{docs:{description:{story:`For the band used outside a result row: the measured value prints above the marker so the reading needs no second column. Rows that already show the value keep showValue off.`}}}},D={args:{range:h,value:{kind:`numeric`,value:92},size:`sm`}},O={parameters:{viewport:{defaultViewport:`kura320`}},args:{range:h,value:{kind:`numeric`,value:118}},render:e=>(0,p.jsx)(`div`,{className:`${l.frame} ${l.w288}`,children:(0,p.jsx)(c,{...e})})},k={globals:{theme:`dark`},args:{range:h,value:{kind:`numeric`,value:151}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    range: FIVE_ZONE,
    value: {
      kind: 'numeric',
      value: 75
    }
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    range: FIVE_ZONE,
    value: {
      kind: 'numeric',
      value: 118
    }
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Critical — explicit panic bound',
  args: {
    range: FIVE_ZONE,
    value: {
      kind: 'numeric',
      value: 151
    }
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Three tiers — HbA1c diabetes classification remains abnormal',
  args: {
    range: HBA1C_RANGE,
    value: {
      kind: 'numeric',
      value: 7.1
    }
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Multiple adjacent normal tiers — HDL protective',
  args: {
    range: HDL_RANGE,
    value: {
      kind: 'numeric',
      value: 72
    }
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    range: URINE_PROTEIN_RANGE,
    value: {
      kind: 'text',
      value: 'Trace'
    }
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Qualitative value not mapped to a catalog tier',
  args: {
    range: URINE_PROTEIN_RANGE,
    value: {
      kind: 'text',
      value: 'Pending comment'
    }
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    range: HBA1C_RANGE,
    value: {
      kind: 'numeric',
      value: 9.8
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'The marker stays centered inside an open-ended tier because the scale outside the last bound is not linear.'
      }
    }
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    range: FIVE_ZONE
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    range: FIVE_ZONE,
    value: {
      kind: 'numeric',
      value: 92
    },
    showTicks: false
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Standalone — measured value rides the marker',
  args: {
    range: FIVE_ZONE,
    value: {
      kind: 'numeric',
      value: 118,
      display: '118 mg/dL'
    },
    showValue: true
  },
  parameters: {
    docs: {
      description: {
        story: 'For the band used outside a result row: the measured value prints above the marker so the reading needs no second column. Rows that already show the value keep showValue off.'
      }
    }
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    range: FIVE_ZONE,
    value: {
      kind: 'numeric',
      value: 92
    },
    size: 'sm'
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'kura320'
    }
  },
  args: {
    range: FIVE_ZONE,
    value: {
      kind: 'numeric',
      value: 118
    }
  },
  render: args => <div className={\`\${styles.frame} \${styles.w288}\`}>
      <LabRangeBand {...args} />
    </div>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  globals: {
    theme: 'dark'
  },
  args: {
    range: FIVE_ZONE,
    value: {
      kind: 'numeric',
      value: 151
    }
  }
}`,...k.parameters?.docs?.source}}},A=[`Normal`,`AbnormalHigh`,`CriticalPanicBound`,`ThreeTierClassification`,`MultipleAdjacentNormalTiers`,`QualitativeExactMatch`,`QualitativeUnmappedValue`,`UnboundedEdgeValue`,`ScaleOnly`,`WithoutTicks`,`StandaloneWithValue`,`SmallSize`,`NarrowContainer`,`DarkTheme`]}))();export{_ as AbnormalHigh,v as CriticalPanicBound,k as DarkTheme,b as MultipleAdjacentNormalTiers,O as NarrowContainer,g as Normal,x as QualitativeExactMatch,S as QualitativeUnmappedValue,w as ScaleOnly,D as SmallSize,E as StandaloneWithValue,y as ThreeTierClassification,C as UnboundedEdgeValue,T as WithoutTicks,A as __namedExportsOrder,m as default};