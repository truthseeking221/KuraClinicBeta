import type { KhmerDictionary } from '../types';

/**
 * The living care plan and the care loop a doctor signs to open it.
 *
 * Goal, intervention, and monitoring labels are clinical content — analyte
 * names, drug names, and doses — and stay in English. What is translated here
 * is the plan's own vocabulary: status, blocking reasons, and the review step.
 */
export const CARE_PLAN_KM: KhmerDictionary = {
  // Plan header
  'Care plan': 'ផែនការព្យាបាល',
  Version: 'កំណែ',
  'Review every': 'ពិនិត្យរៀងរាល់',
  every: 'រៀងរាល់',
  Paused: 'បានផ្អាក',
  active: 'សកម្ម',
  draft: 'សេចក្តីព្រាង',
  completed: 'បានបញ្ចប់',
  discontinued: 'បានបញ្ឈប់',
  'From protocol': 'ពីពិធីសារ',
  'No care plan yet. It starts when a result needs an answer that outlives this visit.':
    'មិនទាន់មានផែនការព្យាបាលទេ។ វាចាប់ផ្តើមនៅពេលលទ្ធផលត្រូវការចម្លើយដែលលើសពីការមកពិនិត្យនេះ។',

  // Goals
  Met: 'សម្រេចបាន',
  'Off target': 'ក្រៅគោលដៅ',
  'On track': 'ដំណើរការល្អ',
  'Not assessed': 'មិនទាន់វាយតម្លៃ',

  // Interventions
  'Steps for': 'ជំហានសម្រាប់',
  Planned: 'បានគ្រោងទុក',
  'Mark done': 'សម្គាល់ថារួចរាល់',
  'Record exception': 'កត់ត្រាករណីលើកលែង',
  'Closed without a result': 'បានបិទដោយគ្មានលទ្ធផល',
  'This step was cancelled.': 'ជំហាននេះត្រូវបានបោះបង់។',
  'Waiting on the result. Record an exception if it will never arrive.':
    'កំពុងរង់ចាំលទ្ធផល។ កត់ត្រាករណីលើកលែង បើវានឹងមិនមកដល់ឡើយ។',

  // Care loop review
  'Care loop review': 'ការពិនិត្យវដ្តព្យាបាល',
  'Drafted from this result. Nothing is saved until you sign.':
    'ព្រាងចេញពីលទ្ធផលនេះ។ គ្មានអ្វីត្រូវបានរក្សាទុកទេ រហូតដល់អ្នកចុះហត្ថលេខា។',
  'What the result shows': 'អ្វីដែលលទ្ធផលបង្ហាញ',
  'What this adds to the plan': 'អ្វីដែលនេះបន្ថែមទៅផែនការ',
  'Always included': 'រួមបញ្ចូលជានិច្ច',
  Include: 'រួមបញ្ចូល',
  'Sign care plan': 'ចុះហត្ថលេខាលើផែនការព្យាបាល',
  items: 'ធាតុ',
  'next review': 'ការពិនិត្យបន្ទាប់',
  from: 'គិតពី',
  'signed by': 'ចុះហត្ថលេខាដោយ',

  // Proposal kinds
  Goal: 'គោលដៅ',
  'Repeat test': 'តេស្តម្តងទៀត',
  Medicine: 'ថ្នាំ',
  'For the patient': 'សម្រាប់អ្នកជំងឺ',

  // Care loop fixture copy
  'Iron deficiency anaemia confirmed': 'បានបញ្ជាក់ភាពស្លេកស្លាំងដោយខ្វះជាតិដែក',
  'Confirms the working diagnosis from this visit':
    'បញ្ជាក់រោគវិនិច្ឆ័យដែលកំពុងសង្ស័យពីការមកពិនិត្យនេះ',
  'Once daily with food': 'ម្តងក្នុងមួយថ្ងៃ ជាមួយអាហារ',
  'After the repeat bloods': 'បន្ទាប់ពីធ្វើតេស្តឈាមម្តងទៀត',
};
