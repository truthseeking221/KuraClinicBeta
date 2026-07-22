import{c as e,i as t}from"./preload-helper-MclHqJXp.js";import{U as n,g as r}from"./iframe-DWdOCsUQ.js";import{x as i}from"./provider-marks-BeHzyBjc.js";import{$ as a,Ar as ee,Cr as te,Dr as ne,Er as re,Or as ie,Sr as ae,Tr as oe,t as o,tt as s,wr as se}from"./ui-C9kmmzkH.js";import{i as c,r as ce,t as le}from"./phone-input-CidmOUk0.js";import{c as ue,i as de,l as fe,o as pe,r as me,s as he,u as ge}from"./settings-modal-DFqsiPWF.js";import{i as l,n as _e,r as u,t as d}from"./alert-l7nmjmGJ.js";import{t as f}from"./button-B6_zsN5-.js";import{t as p}from"./input-UaJWx_9h.js";import{t as ve}from"./otp-input-D_5icaJb.js";function ye(e){return e.endsWith(`123496`)?{kind:`known_match`,patient:h}:e.endsWith(`123497`)?{kind:`shared_matches`,candidates:g}:e.endsWith(`000`)?{kind:`error`}:{kind:`no_match`}}function be(e){return e.endsWith(`999`)}var m,h,g,_=t((()=>{m=`123456`,h={patientId:`pat-sokha`,initials:`SC`,name:`Sokha Chann`,sex:`Female`,age:32,mrnMasked:`MRN ··34`},g=[{patientId:`pat-sophea`,initials:`SC`,name:`Sophea Chann`,sex:`Female`,age:29,mrnMasked:`MRN ··18`},{patientId:`pat-rithy`,initials:`RK`,name:`Rithy Khem`,sex:`Male`,age:14,mrnMasked:`MRN ··73`},{patientId:`pat-visal`,initials:`VH`,name:`Visal Heng`,sex:`Male`,age:7,mrnMasked:`MRN ··09`}]}));function xe(e){let t=e.replace(/\D/g,``).replace(/^0+/,``);return t.length>=8&&t.length<=9}function Se(e){let t=e.replace(/\D/g,``);return t.length<6?e:`+${t.slice(0,3)} ${t.slice(3,5)} ... ${t.slice(-3)}`}function Ce(e,t){return e===t?`verified`:`invalid`}function we(e){return e.kind===`known_match`?`knownMatch`:e.kind===`shared_matches`?`sharedMatches`:e.kind===`no_match`?`noMatch`:`error`}function Te(e){let t={};return e.name.trim()||(t.name=y.nameRequired),e.dobOrAge.trim()||(t.dobOrAge=y.dobRequired),e.sex===null&&(t.sex=y.sexRequired),t}function Ee(e){return Object.keys(e).length>0}function De(e){return e.state===`enterPhone`?e.localPhone.trim().length>0:e.state===`verifyOtp`||e.state===`verifyingOtp`?e.code.length>0:e.state===`differentPatient`||e.state===`noMatch`?e.draft.name.trim().length>0||e.draft.dobOrAge.trim().length>0||e.draft.sex!==null:e.state===`knownMatch`||e.state===`sharedMatches`}var v,y,b=t((()=>{v={name:``,dobOrAge:``,sex:null},y={phoneTitle:`Patient phone`,phoneSubtitle:`The patient, a guardian, or a guarantor.`,otpTitle:`Enter the code`,matchTitle:`Is this the patient?`,sharedTitle:`Which patient?`,newPatientTitle:`Create provisional patient`,lookupTitle:`Patient lookup`,sendCode:`Send SMS code`,verifyCode:`Verify code`,verifying:`Checking code…`,resendCode:`Resend code`,useThisPatient:`Use this patient`,someoneElse:`Someone else`,choosePatient:`Use selected patient`,noneOfThese:`None of these`,createTemporary:`Create provisional patient and continue`,creating:`Creating provisional patient…`,changePhone:`Change`,changePhoneLabel:`Change phone number`,verifiedLabel:`Phone checked`,sentToLabel:`Sent to`,identityCaveat:`SMS confirms the number, not who is being tested.`,differentTitle:`This may be a different patient`,differentBody:`This number already belongs to a Kura patient. Creating a record here is logged as a possible duplicate.`,noMatchBody:`No matching patient was found for this phone number. PSC will confirm identity.`,invalidPhone:`Enter a valid Cambodia phone number.`,rateLimited:`Too many codes requested — try again in a few minutes.`,invalidCode:`Incorrect or expired code — try again.`,lookupErrorTitle:`Lookup unavailable`,lookupError:`The patient lookup did not respond. Your entries are kept.`,nameRequired:`Enter the full name.`,dobRequired:`Enter a date of birth or estimated age.`,sexRequired:`Select a sex.`,noSelection:`Select a patient, or add a provisional patient.`,phoneChecked:`Phone checked`,pscConfirms:`PSC will confirm identity`,closeLabel:`Close patient identity gate`}})),x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I=t((()=>{x=`_content_y6cez_6`,S=`_body_y6cez_18`,C=`_stack_y6cez_19`,w=`_footer_y6cez_26`,T=`_phoneLine_y6cez_32`,E=`_phoneLineLabel_y6cez_40`,D=`_phoneLineInlineLabel_y6cez_46`,O=`_phoneLineValue_y6cez_51`,k=`_phoneLineCheck_y6cez_65`,A=`_phoneLineNumber_y6cez_72`,j=`_identity_y6cez_101`,M=`_identityName_y6cez_108`,N=`_identityMeta_y6cez_116`,P=`_candidates_y6cez_121`,F={content:x,body:S,stack:C,footer:w,phoneLine:T,phoneLineLabel:E,phoneLineInlineLabel:D,phoneLineValue:O,phoneLineCheck:k,phoneLineNumber:A,identity:j,identityName:M,identityMeta:N,candidates:P}}));function L({draft:e,errors:t,mode:n,onChange:r}){return(0,R.jsxs)(`div`,{className:F.stack,children:[n===`differentPatient`?(0,R.jsxs)(d,{tone:`warning`,children:[(0,R.jsx)(l,{children:y.differentTitle}),(0,R.jsx)(u,{children:y.differentBody})]}):null,(0,R.jsx)(p,{autoFocus:!0,error:t.name,label:`Full name`,onChange:t=>r({...e,name:t.target.value}),required:!0,value:e.name}),(0,R.jsx)(p,{error:t.dobOrAge,helpText:`Enter an estimated age only if the date of birth is unknown.`,label:`Date of birth or estimated age`,onChange:t=>r({...e,dobOrAge:t.target.value}),placeholder:`12-09-1994 or 32 (estimated)`,required:!0,value:e.dobOrAge}),(0,R.jsx)(s,{error:t.sex,legend:`Sex`,onValueChange:t=>r({...e,sex:t}),orientation:`horizontal`,required:!0,value:e.sex??void 0,children:z.map(e=>(0,R.jsx)(a,{value:e,children:e},e))})]})}var R,z,Oe=t((()=>{R=r(),o(),b(),I(),z=[`Female`,`Male`,`Other`],L.__docgenInfo={description:`Temporary-patient details (spec §8/§9). The duplicate-risk branch keeps its
warning; the ordinary no-match branch states the fact in the dialog
description instead of a tinted banner. Minimum fields stay name + DOB-or-age
+ sex, each carrying its own validation message. An estimated age is
collected only when the date of birth is unavailable.`,methods:[],displayName:`PatientDetailsForm`,props:{mode:{required:!0,tsType:{name:`union`,raw:`'noMatch' | 'differentPatient'`,elements:[{name:`literal`,value:`'noMatch'`},{name:`literal`,value:`'differentPatient'`}]},description:``},draft:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  name: string;
  dobOrAge: string;
  sex: DraftPatientSex | null;
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}},{key:`dobOrAge`,value:{name:`string`,required:!0}},{key:`sex`,value:{name:`union`,raw:`DraftPatientSex | null`,elements:[{name:`union`,raw:`'Female' | 'Male' | 'Other'`,elements:[{name:`literal`,value:`'Female'`},{name:`literal`,value:`'Male'`},{name:`literal`,value:`'Other'`}]},{name:`null`}],required:!0}}]}},description:``},errors:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  name?: string;
  dobOrAge?: string;
  sex?: string;
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!1}},{key:`dobOrAge`,value:{name:`string`,required:!1}},{key:`sex`,value:{name:`string`,required:!1}}]}},description:``},onChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(draft: DraftPatient) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  name: string;
  dobOrAge: string;
  sex: DraftPatientSex | null;
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}},{key:`dobOrAge`,value:{name:`string`,required:!0}},{key:`sex`,value:{name:`union`,raw:`DraftPatientSex | null`,elements:[{name:`union`,raw:`'Female' | 'Male' | 'Other'`,elements:[{name:`literal`,value:`'Female'`},{name:`literal`,value:`'Male'`},{name:`literal`,value:`'Other'`}]},{name:`null`}],required:!0}}]}},name:`draft`}],return:{name:`void`}}},description:``}}}}));function B(e){return`${e.sex} · ${e.age}y · ${e.mrnMasked}`}function ke({patient:e}){return(0,V.jsxs)(`div`,{className:F.identity,"data-slot":`phone-gate-identity`,children:[(0,V.jsx)(`span`,{className:F.identityName,children:e.name}),(0,V.jsx)(`span`,{className:F.identityMeta,children:B(e)})]})}var V,H=t((()=>{V=r(),I(),ke.__docgenInfo={description:`The single matched record. No box and no avatar: it is the only object on
the surface, and initials beside the name they are taken from carry nothing.`,methods:[],displayName:`PatientIdentity`,props:{patient:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  patientId: string;
  initials: string;
  name: string;
  sex: string;
  age: number;
  /** Masked MRN — the modal never reveals more PHI than the minimum. */
  mrnMasked: string;
}`,signature:{properties:[{key:`patientId`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`sex`,value:{name:`string`,required:!0}},{key:`age`,value:{name:`number`,required:!0}},{key:`mrnMasked`,value:{name:`string`,required:!0},description:`Masked MRN — the modal never reveals more PHI than the minimum.`}]}},description:``}}}}));function Ae({candidates:e,error:t,onSelect:n,selectedId:r}){return(0,U.jsxs)(`div`,{className:F.stack,children:[(0,U.jsxs)(d,{tone:`warning`,children:[(0,U.jsxs)(l,{children:[`This number is linked to `,e.length,` patients`]}),(0,U.jsx)(u,{children:y.identityCaveat})]}),(0,U.jsx)(s,{className:F.candidates,error:t??void 0,legend:`Matching patients`,onValueChange:n,required:!0,value:r??void 0,children:e.map(e=>(0,U.jsx)(a,{appearance:`card`,helpText:B(e),value:e.patientId,children:e.name},e.patientId))})]})}var U,je=t((()=>{U=r(),o(),b(),H(),I(),Ae.__docgenInfo={description:`Phone possession does not establish which person is being tested, so the
candidates are a single-choice radio set: one deliberate selection and one
primary action, instead of one competing primary button per row.`,methods:[],displayName:`SharedPhoneMatches`,props:{candidates:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  patientId: string;
  initials: string;
  name: string;
  sex: string;
  age: number;
  /** Masked MRN — the modal never reveals more PHI than the minimum. */
  mrnMasked: string;
}`,signature:{properties:[{key:`patientId`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`sex`,value:{name:`string`,required:!0}},{key:`age`,value:{name:`number`,required:!0}},{key:`mrnMasked`,value:{name:`string`,required:!0},description:`Masked MRN — the modal never reveals more PHI than the minimum.`}]}}],raw:`MatchedPatient[]`},description:``},selectedId:{required:!0,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},error:{required:!0,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},onSelect:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(patientId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`patientId`}],return:{name:`void`}}},description:``}}}}));function W({label:e,onChange:t,value:n,inline:r=!1,verified:a=!1}){return(0,G.jsxs)(`div`,{className:F.phoneLine,"data-inline":r||void 0,children:[r?null:(0,G.jsx)(`span`,{className:F.phoneLineLabel,children:e}),(0,G.jsxs)(`span`,{className:F.phoneLineValue,children:[a?(0,G.jsx)(i,{"aria-hidden":`true`,className:F.phoneLineCheck}):null,r?(0,G.jsx)(`span`,{className:F.phoneLineInlineLabel,children:e}):null,(0,G.jsx)(`span`,{className:F.phoneLineNumber,children:n})]}),(0,G.jsx)(f,{"aria-label":y.changePhoneLabel,onClick:t,size:`sm`,variant:`link`,children:y.changePhone})]})}var G,K=t((()=>{G=r(),o(),b(),I(),W.__docgenInfo={description:`The number the gate is about, shown wherever it is being bound to a person.
One control changes it, on the same row as the value it changes — the gate
previously offered a back link, an unlock button, and a hint sentence for
this single action.`,methods:[],displayName:`VerifiedPhoneLine`,props:{label:{required:!0,tsType:{name:`string`},description:`What this number is at this step: sent-to, or verified and bound.`},value:{required:!0,tsType:{name:`string`},description:`Masked while unverified, full once the code is accepted.`},verified:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},inline:{required:!1,tsType:{name:`boolean`},description:`Keep send destination as supporting context within the code-entry task.`,defaultValue:{value:`false`,computed:!1}},onChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));function Me(e){return e===`verifyOtp`||e===`verifyingOtp`?y.otpTitle:e===`knownMatch`?y.matchTitle:e===`sharedMatches`?y.sharedTitle:e===`differentPatient`||e===`noMatch`||e===`submitting`?y.newPatientTitle:e===`error`?y.lookupTitle:y.phoneTitle}function q({createDelayMs:e=300,expectedCode:t=m,initial:n,lookup:r=ye,onClose:i,onOutcome:a,open:o,rateLimited:s=be,resendCooldownSecs:c=30,verificationDelayMs:p=300}){let[_,b]=(0,Y.useState)(n?.state??`enterPhone`),[x,S]=(0,Y.useState)(n?.phone),[C,w]=(0,Y.useState)(null),[T,E]=(0,Y.useState)(``),[D,O]=(0,Y.useState)(null),[k,A]=(0,Y.useState)(0),[j,M]=(0,Y.useState)(n?.draft??v),[N,P]=(0,Y.useState)({}),[I,R]=(0,Y.useState)(!1),[z,Oe]=(0,Y.useState)(n?.matchPatient??h),[B,V]=(0,Y.useState)(n?.candidates??g),[H,U]=(0,Y.useState)(null),[je,G]=(0,Y.useState)(null),[K,q]=(0,Y.useState)(n?.state===`differentPatient`?`different_patient`:`no_match`),X=(0,Y.useRef)(void 0),Z=(0,Y.useRef)(void 0);(0,Y.useEffect)(()=>()=>{window.clearTimeout(X.current),window.clearTimeout(Z.current)},[]),(0,Y.useEffect)(()=>{if(k<=0)return;let e=setInterval(()=>A(e=>e-1),1e3);return()=>clearInterval(e)},[k]);let Q=x?ce(x)||x:``;function Pe(){if(!x||!xe(Q||x)){w(y.invalidPhone);return}if(s(x)){w(y.rateLimited);return}w(null),E(``),O(null),A(c),b(`verifyOtp`)}function Fe(){if(!x)return;let e=r(x);e.kind===`known_match`&&Oe(e.patient),e.kind===`shared_matches`&&(V(e.candidates),U(null),G(null)),e.kind===`no_match`&&q(`no_match`),b(we(e))}function Ie(){if(Ce(T,t)===`invalid`){O(y.invalidCode);return}O(null),b(`verifyingOtp`),Z.current=window.setTimeout(Fe,p)}function Le(){window.clearTimeout(Z.current),b(`enterPhone`),E(``),O(null),P({}),G(null)}function Re(){let e=B.find(e=>e.patientId===H);if(!e){G(y.noSelection);return}a({kind:`existing`,matchReason:`shared_phone`,patient:e}),i(`completed`)}function ze(e){P({}),G(null),q(e),b(`differentPatient`)}function Be(){let t=Te(j);if(Ee(t)){P(t);return}P({}),b(`submitting`),X.current=window.setTimeout(()=>{a({kind:`temporary`,draft:j,phone:x??``,knownPhoneOverride:K!==`no_match`,auditReason:K}),i(`completed`)},e)}function Ve(){if(De({state:_,localPhone:Q,code:T,draft:j})){R(!0);return}i(`dismissed`)}let $=_===`differentPatient`||_===`noMatch`||_===`submitting`,He=K===`no_match`?`noMatch`:`differentPatient`,Ue=_===`enterPhone`?y.phoneSubtitle:_===`knownMatch`?y.identityCaveat:$&&He===`noMatch`?y.noMatchBody:null;return(0,J.jsx)(me,{onOpenChange:e=>{e||Ve()},open:o,children:(0,J.jsxs)(pe,{className:F.content,closeLabel:y.closeLabel,onEscapeKeyDown:e=>{e.preventDefault(),Ve()},onInteractOutside:e=>e.preventDefault(),onPointerDownOutside:e=>e.preventDefault(),size:`sm`,children:[(0,J.jsxs)(fe,{children:[(0,J.jsx)(ge,{children:Me(_)}),Ue?(0,J.jsx)(he,{children:Ue}):null]}),(0,J.jsxs)(de,{className:F.body,children:[_===`verifyOtp`||_===`verifyingOtp`?(0,J.jsx)(W,{inline:!0,label:y.sentToLabel,onChange:Le,value:x?Se(x):``}):null,Ne.includes(_)?(0,J.jsx)(W,{label:y.verifiedLabel,onChange:Le,value:Q,verified:!0}):null,_===`enterPhone`?(0,J.jsx)(le,{autoFocus:!0,countries:[`KH`],defaultCountry:`KH`,error:C,label:`Phone number`,onChange:e=>{S(e),w(null)},placeholder:`12 345 678`,required:!0,size:`lg`,value:x}):null,_===`verifyOtp`||_===`verifyingOtp`?(0,J.jsx)(ve,{autoFocus:!0,disabled:_===`verifyingOtp`,error:D,accessibleLabel:`SMS code`,onValueChange:e=>{E(e),O(null)},value:T}):null,_===`knownMatch`?(0,J.jsx)(ke,{patient:z}):null,_===`sharedMatches`?(0,J.jsx)(Ae,{candidates:B,error:je,onSelect:e=>{U(e),G(null)},selectedId:H}):null,$?(0,J.jsx)(L,{draft:j,errors:N,mode:He,onChange:e=>{M(e),P({})}}):null,_===`error`?(0,J.jsxs)(d,{tone:`danger`,children:[(0,J.jsx)(l,{children:y.lookupErrorTitle}),(0,J.jsx)(u,{children:y.lookupError}),(0,J.jsx)(_e,{children:(0,J.jsx)(f,{onClick:Fe,size:`sm`,variant:`primary`,children:`Retry`})})]}):null]}),_===`error`?null:(0,J.jsxs)(ue,{className:F.footer,children:[_===`enterPhone`?(0,J.jsx)(f,{onClick:Pe,variant:`primary`,children:y.sendCode}):null,_===`verifyOtp`||_===`verifyingOtp`?(0,J.jsxs)(J.Fragment,{children:[(0,J.jsx)(f,{disabled:k>0||_===`verifyingOtp`,onClick:()=>{E(``),O(null),A(c)},variant:`ghost`,children:k>0?`Resend in ${k}s`:y.resendCode}),(0,J.jsx)(f,{disabled:T.length!==6,loading:_===`verifyingOtp`,onClick:Ie,variant:`primary`,children:_===`verifyingOtp`?y.verifying:y.verifyCode})]}):null,_===`knownMatch`?(0,J.jsxs)(J.Fragment,{children:[(0,J.jsx)(f,{onClick:()=>ze(`different_patient`),variant:`ghost`,children:y.someoneElse}),(0,J.jsx)(f,{autoFocus:!0,onClick:()=>{a({kind:`existing`,matchReason:`verified_phone`,patient:z}),i(`completed`)},variant:`primary`,children:y.useThisPatient})]}):null,_===`sharedMatches`?(0,J.jsxs)(J.Fragment,{children:[(0,J.jsx)(f,{onClick:()=>ze(`shared_phone_override`),variant:`ghost`,children:y.noneOfThese}),(0,J.jsx)(f,{onClick:Re,variant:`primary`,children:y.choosePatient})]}):null,$?(0,J.jsx)(f,{loading:_===`submitting`,onClick:Be,variant:`primary`,children:_===`submitting`?y.creating:y.createTemporary}):null]}),(0,J.jsx)(ae,{onOpenChange:e=>R(e),open:I,children:(0,J.jsxs)(oe,{size:`sm`,children:[(0,J.jsxs)(ie,{children:[(0,J.jsx)(ee,{children:`Discard what you entered?`}),(0,J.jsx)(re,{children:`The phone, code, or patient details typed here will be lost.`})]}),(0,J.jsxs)(ne,{children:[(0,J.jsx)(se,{onClick:()=>R(!1),children:`Keep editing`}),(0,J.jsx)(te,{onClick:()=>{R(!1),i(`dismissed`)},variant:`destructive`,children:`Discard & close`})]})]})})]})})}var J,Y,Ne,X=t((()=>{J=r(),Y=e(n()),c(),o(),Oe(),H(),je(),K(),_(),b(),I(),Ne=[`knownMatch`,`sharedMatches`,`differentPatient`,`noMatch`,`submitting`,`error`],q.__docgenInfo={description:`The phone gate (spec: docs/design/phone-gate/phone-gate-ui-spec.md).
A safety checkpoint before a booking code is sent: verify the phone by OTP,
detect an existing patient, attach it or create a temporary patient. One
column, one question per step, with the verified number visible wherever it
is bound to a person. The catalog behind stays inert; backdrop clicks never
dismiss; Esc asks before discarding entered data.`,methods:[],displayName:`PhoneGateModal`,props:{open:{required:!0,tsType:{name:`boolean`},description:``},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(reason: PhoneGateCloseReason) => void`,signature:{arguments:[{type:{name:`union`,raw:`'completed' | 'dismissed'`,elements:[{name:`literal`,value:`'completed'`},{name:`literal`,value:`'dismissed'`}]},name:`reason`}],return:{name:`void`}}},description:``},onOutcome:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(outcome: PhoneGateOutcome) => void`,signature:{arguments:[{type:{name:`union`,raw:`| {
    kind: 'existing';
    patient: MatchedPatient;
    /** Useful to the BFF/audit adapter without implying identity assurance. */
    matchReason: 'verified_phone' | 'shared_phone';
  }
| {
    kind: 'temporary';
    draft: DraftPatient;
    phone: string;
    /** Different-patient creations carry duplicate-risk audit context. */
    knownPhoneOverride: boolean;
    auditReason: 'different_patient' | 'shared_phone_override' | 'no_match';
  }`,elements:[{name:`signature`,type:`object`,raw:`{
  kind: 'existing';
  patient: MatchedPatient;
  /** Useful to the BFF/audit adapter without implying identity assurance. */
  matchReason: 'verified_phone' | 'shared_phone';
}`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'existing'`,required:!0}},{key:`patient`,value:{name:`signature`,type:`object`,raw:`{
  patientId: string;
  initials: string;
  name: string;
  sex: string;
  age: number;
  /** Masked MRN — the modal never reveals more PHI than the minimum. */
  mrnMasked: string;
}`,signature:{properties:[{key:`patientId`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`sex`,value:{name:`string`,required:!0}},{key:`age`,value:{name:`number`,required:!0}},{key:`mrnMasked`,value:{name:`string`,required:!0},description:`Masked MRN — the modal never reveals more PHI than the minimum.`}]},required:!0}},{key:`matchReason`,value:{name:`union`,raw:`'verified_phone' | 'shared_phone'`,elements:[{name:`literal`,value:`'verified_phone'`},{name:`literal`,value:`'shared_phone'`}],required:!0},description:`Useful to the BFF/audit adapter without implying identity assurance.`}]}},{name:`signature`,type:`object`,raw:`{
  kind: 'temporary';
  draft: DraftPatient;
  phone: string;
  /** Different-patient creations carry duplicate-risk audit context. */
  knownPhoneOverride: boolean;
  auditReason: 'different_patient' | 'shared_phone_override' | 'no_match';
}`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'temporary'`,required:!0}},{key:`draft`,value:{name:`signature`,type:`object`,raw:`{
  name: string;
  dobOrAge: string;
  sex: DraftPatientSex | null;
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}},{key:`dobOrAge`,value:{name:`string`,required:!0}},{key:`sex`,value:{name:`union`,raw:`DraftPatientSex | null`,elements:[{name:`union`,raw:`'Female' | 'Male' | 'Other'`,elements:[{name:`literal`,value:`'Female'`},{name:`literal`,value:`'Male'`},{name:`literal`,value:`'Other'`}]},{name:`null`}],required:!0}}]},required:!0}},{key:`phone`,value:{name:`string`,required:!0}},{key:`knownPhoneOverride`,value:{name:`boolean`,required:!0},description:`Different-patient creations carry duplicate-risk audit context.`},{key:`auditReason`,value:{name:`union`,raw:`'different_patient' | 'shared_phone_override' | 'no_match'`,elements:[{name:`literal`,value:`'different_patient'`},{name:`literal`,value:`'shared_phone_override'`},{name:`literal`,value:`'no_match'`}],required:!0}}]}}]},name:`outcome`}],return:{name:`void`}}},description:``},lookup:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(e164: string) => PhoneLookupResult`,signature:{arguments:[{type:{name:`string`},name:`e164`}],return:{name:`union`,raw:`| { kind: 'known_match'; patient: MatchedPatient }
| { kind: 'shared_matches'; candidates: MatchedPatient[] }
| { kind: 'no_match' }
| { kind: 'error' }`,elements:[{name:`signature`,type:`object`,raw:`{ kind: 'known_match'; patient: MatchedPatient }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'known_match'`,required:!0}},{key:`patient`,value:{name:`signature`,type:`object`,raw:`{
  patientId: string;
  initials: string;
  name: string;
  sex: string;
  age: number;
  /** Masked MRN — the modal never reveals more PHI than the minimum. */
  mrnMasked: string;
}`,signature:{properties:[{key:`patientId`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`sex`,value:{name:`string`,required:!0}},{key:`age`,value:{name:`number`,required:!0}},{key:`mrnMasked`,value:{name:`string`,required:!0},description:`Masked MRN — the modal never reveals more PHI than the minimum.`}]},required:!0}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'shared_matches'; candidates: MatchedPatient[] }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'shared_matches'`,required:!0}},{key:`candidates`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  patientId: string;
  initials: string;
  name: string;
  sex: string;
  age: number;
  /** Masked MRN — the modal never reveals more PHI than the minimum. */
  mrnMasked: string;
}`,signature:{properties:[{key:`patientId`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`sex`,value:{name:`string`,required:!0}},{key:`age`,value:{name:`number`,required:!0}},{key:`mrnMasked`,value:{name:`string`,required:!0},description:`Masked MRN — the modal never reveals more PHI than the minimum.`}]},required:!0}],raw:`MatchedPatient[]`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'no_match' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'no_match'`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ kind: 'error' }`,signature:{properties:[{key:`kind`,value:{name:`literal`,value:`'error'`,required:!0}}]}}]}}},description:`Lookup + throttle verdicts; defaults cover the demo journeys.`,defaultValue:{value:`function demoLookup(e164: string): PhoneLookupResult {
  if (e164.endsWith('123496')) return { kind: 'known_match', patient: DEMO_MATCH_PATIENT };
  if (e164.endsWith('123497')) {
    return { kind: 'shared_matches', candidates: DEMO_SHARED_PHONE_PATIENTS };
  }
  if (e164.endsWith('000')) return { kind: 'error' };
  return { kind: 'no_match' };
}`,computed:!1}},rateLimited:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(e164: string) => boolean`,signature:{arguments:[{type:{name:`string`},name:`e164`}],return:{name:`boolean`}}},description:``,defaultValue:{value:`function demoRateLimited(e164: string): boolean {
  return e164.endsWith('999');
}`,computed:!1}},expectedCode:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'123456'`,computed:!1}},resendCooldownSecs:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`30`,computed:!1}},createDelayMs:{required:!1,tsType:{name:`number`},description:"Temporary-patient creation latency; raise it to inspect `submitting`.",defaultValue:{value:`300`,computed:!1}},verificationDelayMs:{required:!1,tsType:{name:`number`},description:"OTP-verification latency; raise it to inspect `verifyingOtp`.",defaultValue:{value:`300`,computed:!1}},initial:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  state: Extract<
    PhoneGateState,
    | 'verifyOtp'
    | 'verifyingOtp'
    | 'knownMatch'
    | 'sharedMatches'
    | 'differentPatient'
    | 'noMatch'
    | 'error'
  >;
  phone: PhoneValue;
  matchPatient?: MatchedPatient;
  candidates?: MatchedPatient[];
  draft?: DraftPatient;
}`,signature:{properties:[{key:`state`,value:{name:`Extract`,elements:[{name:`union`,raw:`| 'enterPhone'
| 'verifyOtp'
| 'verifyingOtp'
| 'knownMatch'
| 'sharedMatches'
| 'differentPatient'
| 'noMatch'
| 'submitting'
| 'error'`,elements:[{name:`literal`,value:`'enterPhone'`},{name:`literal`,value:`'verifyOtp'`},{name:`literal`,value:`'verifyingOtp'`},{name:`literal`,value:`'knownMatch'`},{name:`literal`,value:`'sharedMatches'`},{name:`literal`,value:`'differentPatient'`},{name:`literal`,value:`'noMatch'`},{name:`literal`,value:`'submitting'`},{name:`literal`,value:`'error'`}]},{name:`union`,raw:`| 'verifyOtp'
| 'verifyingOtp'
| 'knownMatch'
| 'sharedMatches'
| 'differentPatient'
| 'noMatch'
| 'error'`,elements:[{name:`literal`,value:`'verifyOtp'`},{name:`literal`,value:`'verifyingOtp'`},{name:`literal`,value:`'knownMatch'`},{name:`literal`,value:`'sharedMatches'`},{name:`literal`,value:`'differentPatient'`},{name:`literal`,value:`'noMatch'`},{name:`literal`,value:`'error'`}]}],raw:`Extract<
  PhoneGateState,
  | 'verifyOtp'
  | 'verifyingOtp'
  | 'knownMatch'
  | 'sharedMatches'
  | 'differentPatient'
  | 'noMatch'
  | 'error'
>`,required:!0}},{key:`phone`,value:{name:`PhoneValue`,required:!0}},{key:`matchPatient`,value:{name:`signature`,type:`object`,raw:`{
  patientId: string;
  initials: string;
  name: string;
  sex: string;
  age: number;
  /** Masked MRN — the modal never reveals more PHI than the minimum. */
  mrnMasked: string;
}`,signature:{properties:[{key:`patientId`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`sex`,value:{name:`string`,required:!0}},{key:`age`,value:{name:`number`,required:!0}},{key:`mrnMasked`,value:{name:`string`,required:!0},description:`Masked MRN — the modal never reveals more PHI than the minimum.`}]},required:!1}},{key:`candidates`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  patientId: string;
  initials: string;
  name: string;
  sex: string;
  age: number;
  /** Masked MRN — the modal never reveals more PHI than the minimum. */
  mrnMasked: string;
}`,signature:{properties:[{key:`patientId`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`sex`,value:{name:`string`,required:!0}},{key:`age`,value:{name:`number`,required:!0}},{key:`mrnMasked`,value:{name:`string`,required:!0},description:`Masked MRN — the modal never reveals more PHI than the minimum.`}]},required:!1}],raw:`MatchedPatient[]`,required:!1}},{key:`draft`,value:{name:`signature`,type:`object`,raw:`{
  name: string;
  dobOrAge: string;
  sex: DraftPatientSex | null;
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}},{key:`dobOrAge`,value:{name:`string`,required:!0}},{key:`sex`,value:{name:`union`,raw:`DraftPatientSex | null`,elements:[{name:`union`,raw:`'Female' | 'Male' | 'Other'`,elements:[{name:`literal`,value:`'Female'`},{name:`literal`,value:`'Male'`},{name:`literal`,value:`'Other'`}]},{name:`null`}],required:!0}}]},required:!1}}]}},description:`Story hook: open directly on a post-verification state.`}}}}));export{g as a,m as i,X as n,_ as o,h as r,q as t};