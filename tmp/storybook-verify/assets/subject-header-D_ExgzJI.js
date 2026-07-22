import{i as e}from"./preload-helper-MclHqJXp.js";import{g as t}from"./iframe-DWdOCsUQ.js";import{t as n}from"./ui-C9kmmzkH.js";import{a as r,r as i}from"./skeleton-yGvKPj3C.js";import{a}from"./collapsible-Cfc9M9oP.js";import{i as o,n as s,r as c}from"./identity-_Ew7UCel.js";var l,u,d,f,p,m,h,g,_,v,y=e((()=>{l=`_header_15oxe_5`,u=`_avatar_15oxe_20`,d=`_identity_15oxe_24`,f=`_title_15oxe_33`,p=`_nameKhmer_15oxe_47`,m=`_meta_15oxe_53`,h=`_metaItem_15oxe_64`,g=`_actions_15oxe_70`,_=`_status_15oxe_77`,v={header:l,avatar:u,identity:d,title:f,nameKhmer:p,meta:m,metaItem:h,actions:g,status:_}}));function b({actions:e,as:t=`h2`,className:n,placeholderTitle:c=`New visit`,status:l,sticky:u=!0,subject:d,...f}){let p=!!d.name?.trim(),m=p?d.name:c,h=d.initials??(p?o(d.name):`?`),g=[d.reference,s(d.dob),d.sexAtBirth||null,d.arrivedLabel,...d.meta??[]].filter(e=>!!e);return(0,x.jsxs)(`header`,{className:[v.header,n].filter(Boolean).join(` `),"data-sticky":u?``:void 0,...f,children:[(0,x.jsx)(i,{className:v.avatar,fallbackTone:p?`brand`:`neutral`,size:`md`,children:(0,x.jsx)(r,{tone:p?`brand`:`neutral`,children:h})}),(0,x.jsxs)(`div`,{className:v.identity,children:[(0,x.jsxs)(t,{className:v.title,children:[m,d.nameKhmer?(0,x.jsx)(`span`,{className:v.nameKhmer,lang:`km`,children:d.nameKhmer}):null]}),g.length>0?(0,x.jsx)(`p`,{className:v.meta,children:g.map((e,t)=>(0,x.jsx)(`span`,{className:v.metaItem,children:e},`${e}-${t}`))}):null]}),e?(0,x.jsx)(`div`,{className:v.actions,children:e}):null,l?(0,x.jsx)(a,{className:v.status,variant:l.variant??`neutral`,children:l.label}):null]})}var x,S=e((()=>{x=t(),n(),c(),y(),b.__docgenInfo={description:`Identity strip for the top of a workflow: who this is, how the desk refers
to them, and one derived state. Front desk and collection both mount it, so
it names a *subject* rather than a patient — a draw worksheet and a check-in
wizard are about the same person for different reasons.

Adapted from the upstream Kura ui-kit \`SubjectHeader\` organism (avatar →
title → meta → actions → status, sticky, two-row on mobile). The bordered
meta chips are dropped: the Kura surface direction reserves containers for
regions with their own state, so metadata is dot-separated text.`,methods:[],displayName:`SubjectHeader`,props:{subject:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  name?: string;
  /** Rendered with \`lang="km"\` so Khmer shapes correctly beside the Latin name. */
  nameKhmer?: string;
  /** Overrides the derived initials when the record carries its own. */
  initials?: string;
  /** How the desk calls this person today — a queue number or booth PID. */
  reference?: string;
  /** ISO date of birth; rendered with the derived age. */
  dob?: string;
  sexAtBirth?: 'Female' | 'Male' | '';
  /** Pre-formatted arrival, e.g. "08:24 · 12 min ago". Never computed here. */
  arrivedLabel?: string;
  /** Extra facts appended after the derived ones, in the caller's order. */
  meta?: readonly string[];
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!1}},{key:`nameKhmer`,value:{name:`string`,required:!1},description:'Rendered with `lang="km"` so Khmer shapes correctly beside the Latin name.'},{key:`initials`,value:{name:`string`,required:!1},description:`Overrides the derived initials when the record carries its own.`},{key:`reference`,value:{name:`string`,required:!1},description:`How the desk calls this person today — a queue number or booth PID.`},{key:`dob`,value:{name:`string`,required:!1},description:`ISO date of birth; rendered with the derived age.`},{key:`sexAtBirth`,value:{name:`union`,raw:`'Female' | 'Male' | ''`,elements:[{name:`literal`,value:`'Female'`},{name:`literal`,value:`'Male'`},{name:`literal`,value:`''`}],required:!1}},{key:`arrivedLabel`,value:{name:`string`,required:!1},description:`Pre-formatted arrival, e.g. "08:24 · 12 min ago". Never computed here.`},{key:`meta`,value:{name:`unknown`,required:!1},description:`Extra facts appended after the derived ones, in the caller's order.`}]}},description:``},as:{required:!1,tsType:{name:`union`,raw:`'h1' | 'h2' | 'h3'`,elements:[{name:`literal`,value:`'h1'`},{name:`literal`,value:`'h2'`},{name:`literal`,value:`'h3'`}]},description:"Heading level, so a page can own its own `h1`.",defaultValue:{value:`'h2'`,computed:!1}},placeholderTitle:{required:!1,tsType:{name:`string`},description:`Shown while the subject has no name yet.`,defaultValue:{value:`'New visit'`,computed:!1}},status:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{ label: string; variant?: BadgeVariant }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`variant`,value:{name:`union`,raw:`| 'neutral'
| 'primary'
| 'secondary'
| 'outline'
| 'success'
| 'warning'
| 'danger'
| 'info'
| 'ai'`,elements:[{name:`literal`,value:`'neutral'`},{name:`literal`,value:`'primary'`},{name:`literal`,value:`'secondary'`},{name:`literal`,value:`'outline'`},{name:`literal`,value:`'success'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'danger'`},{name:`literal`,value:`'info'`},{name:`literal`,value:`'ai'`}],required:!1}}]}},description:`One derived state, never an action. The page footer owns the primary action.`},actions:{required:!1,tsType:{name:`ReactNode`},description:`Trailing controls. Keep to one — this strip is context, not a toolbar.`},sticky:{required:!1,tsType:{name:`boolean`},description:"Sticks to `--subject-header-offset` (default 0). Set that variable when a\nsticky topbar sits above the scroll container.",defaultValue:{value:`true`,computed:!1}}}}}));export{S as n,b as t};