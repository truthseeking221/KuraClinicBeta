import type { KhmerDictionary } from '../types';

/**
 * Patients: the workspace registry, the patient chart shell, the orders
 * evidence panel, the chart action rails, and the diagnosis-to-prescribe
 * drafting workspace.
 *
 * ICD-10 codes and their canonical titles, drug names, lab analyte names,
 * units, order codes, MRN, and patient names stay Latin. Only the chrome
 * around them is translated.
 */
export const PATIENTS_KM: KhmerDictionary = {
  // Registry: columns, filter, and toolbar
  'Add patient': 'បន្ថែមអ្នកជំងឺ',
  All: 'ទាំងអស់',
  // The identity axis is shared with front-desk, which also states it at the
  // door. 'Verified' matches that file; 'Unverified' is left to it, so the two
  // surfaces cannot drift. Both belong in common.ts.
  Verified: 'បានផ្ទៀងផ្ទាត់',
  'Why now': 'ហេតុអ្វីឥឡូវ',
  'Demo patient': 'អ្នកជំងឺគំរូ',
  'Filter by identity status': 'ត្រងតាមស្ថានភាពអត្តសញ្ញាណ',
  'Workspace patients': 'អ្នកជំងឺក្នុងកន្លែងធ្វើការ',
  'Patients per page': 'អ្នកជំងឺក្នុងមួយទំព័រ',
  'Loading patients': 'កំពុងផ្ទុកអ្នកជំងឺ',

  // Registry: empty and error states
  'No patients yet': 'មិនទាន់មានអ្នកជំងឺ',
  'No unverified patients': 'គ្មានអ្នកជំងឺមិនទាន់ផ្ទៀងផ្ទាត់',
  'No verified patients': 'គ្មានអ្នកជំងឺដែលបានផ្ទៀងផ្ទាត់',
  'Check the patient’s phone number before creating their record.':
    'ពិនិត្យលេខទូរស័ព្ទអ្នកជំងឺមុននឹងបង្កើតកំណត់ត្រា។',
  'Patients appear after their first booking or check-in.':
    'អ្នកជំងឺនឹងបង្ហាញបន្ទាប់ពីការកក់ ឬការចុះឈ្មោះលើកដំបូង។',
  'Change the status filter to see the rest of the registry.':
    'ប្តូរតម្រងស្ថានភាព ដើម្បីមើលអ្នកជំងឺដែលនៅសល់។',
  'Patients unavailable': 'មិនអាចប្រើបញ្ជីអ្នកជំងឺបានទេ',
  'The registry could not be loaded.': 'មិនអាចផ្ទុកបញ្ជីអ្នកជំងឺបានទេ។',
  'Try again.': 'ព្យាយាមម្តងទៀត។',

  // Record identity and terminal states
  'Name unavailable': 'ឈ្មោះមិនអាចបង្ហាញបាន',
  Deceased: 'ទទួលមរណភាព',
  Merged: 'បានបញ្ចូលគ្នា',

  // Triage: the "why now" signal
  'Results to review': 'លទ្ធផលត្រូវពិនិត្យ',
  'Critical value unacknowledged': 'តម្លៃគ្រោះថ្នាក់មិនទាន់ទទួលស្គាល់',
  'Identity check at PSC pending': 'កំពុងរង់ចាំការពិនិត្យអត្តសញ្ញាណនៅ PSC',
  'Follow-up overdue': 'ហួសកំណត់តាមដាន',
  'Screening due': 'ដល់ពេលពិនិត្យរកជំងឺ',

  // Chart shell
  'Loading patient': 'កំពុងផ្ទុកអ្នកជំងឺ',
  'Patient not found': 'រកមិនឃើញអ្នកជំងឺ',
  'This record does not exist or is not part of this workspace.':
    'កំណត់ត្រានេះមិនមាន ឬមិនស្ថិតក្នុងកន្លែងធ្វើការនេះទេ។',
  'Back to patients': 'ត្រឡប់ទៅបញ្ជីអ្នកជំងឺ',
  "Couldn't load this patient": 'មិនអាចផ្ទុកអ្នកជំងឺនេះបានទេ',
  'Check your connection and try again.': 'ពិនិត្យការតភ្ជាប់ រួចព្យាយាមម្តងទៀត។',
  'Switch patient': 'ប្តូរអ្នកជំងឺ',
  'This patient is deceased': 'អ្នកជំងឺនេះបានទទួលមរណភាព',
  'The record is closed to new clinical work.':
    'កំណត់ត្រានេះបិទសម្រាប់ការងារព្យាបាលថ្មី។',
  'This record was merged': 'កំណត់ត្រានេះត្រូវបានបញ្ចូលគ្នា',
  'All information now lives on the current record.':
    'ព័ត៌មានទាំងអស់ឥឡូវនៅលើកំណត់ត្រាបច្ចុប្បន្ន។',
  'Open current record': 'បើកកំណត់ត្រាបច្ចុប្បន្ន',
  'Patient chart sections': 'ផ្នែកនៃកំណត់ត្រាអ្នកជំងឺ',
  Overview: 'ទិដ្ឋភាពរួម',
  active: 'សកម្ម',
  'Clinical action workspace': 'កន្លែងធ្វើការសកម្មភាពព្យាបាល',
  'Patient actions': 'សកម្មភាពលើអ្នកជំងឺ',
  'Resize patient chart and action workspace':
    'ប្តូរទំហំកំណត់ត្រាអ្នកជំងឺ និងកន្លែងធ្វើការសកម្មភាព',
  'Patient chart and action rail boundary':
    'ព្រំដែនរវាងកំណត់ត្រាអ្នកជំងឺ និងរបារសកម្មភាព',
  // 'No reportable results yet' and 'Released results appear here as soon as
  // the lab makes them available.' are the results feature's empty state; the
  // chart only mirrors it, so results.ts owns both renderings.

  // Identity verification (sighted document)
  Identity: 'អត្តសញ្ញាណ',
  'Verify identity': 'ផ្ទៀងផ្ទាត់អត្តសញ្ញាណ',
  'Document type': 'ប្រភេទឯកសារ',
  'KH National ID': 'អត្តសញ្ញាណប័ណ្ណខ្មែរ',
  Passport: 'លិខិតឆ្លងដែន',
  "Sight the patient's document to verify their identity. The document number is not recorded.":
    'មើលឯកសាររបស់អ្នកជំងឺដោយផ្ទាល់ ដើម្បីផ្ទៀងផ្ទាត់អត្តសញ្ញាណ។ លេខឯកសារមិនត្រូវបានកត់ត្រាទេ។',
  'Identity verified at the desk.': 'អត្តសញ្ញាណត្រូវបានផ្ទៀងផ្ទាត់នៅតុទទួល។',

  // Orders panel
  'Loading orders': 'កំពុងផ្ទុកការបញ្ជា',
  "Couldn't load orders": 'មិនអាចផ្ទុកការបញ្ជាបានទេ',
  'Orders unavailable': 'មិនអាចប្រើការបញ្ជាបានទេ',
  "You do not have permission to view this patient's orders.":
    'អ្នកគ្មានសិទ្ធិមើលការបញ្ជារបស់អ្នកជំងឺនេះទេ។',
  'No orders yet': 'មិនទាន់មានការបញ្ជា',
  'Orders for this patient will appear here.':
    'ការបញ្ជាសម្រាប់អ្នកជំងឺនេះនឹងបង្ហាញនៅទីនេះ។',
  'Needs attention': 'ត្រូវការការយកចិត្តទុកដាក់',
  'Active orders': 'ការបញ្ជាសកម្ម',
  'Past orders': 'ការបញ្ជាមុនៗ',
  'Search past orders': 'ស្វែងរកការបញ្ជាមុនៗ',
  'No past orders match this search.': 'គ្មានការបញ្ជាមុនៗត្រូវនឹងការស្វែងរកនេះទេ។',
  'Show more past orders': 'បង្ហាញការបញ្ជាមុនៗបន្ថែម',

  // Order lifecycle status
  Placed: 'បានបញ្ជា',
  'In fulfillment': 'កំពុងអនុវត្ត',
  'Partially complete': 'បញ្ចប់ដោយផ្នែក',

  // Chart action rail: next actions
  'What should we do with': 'តើយើងគួរធ្វើអ្វីជាមួយ',
  'today?': 'ថ្ងៃនេះ?',
  'Order tests': 'បញ្ជាតេស្ត',
  'Request or repeat lab tests': 'ស្នើ ឬធ្វើតេស្តឡើងវិញ',
  'Prescribe medication': 'ចេញវេជ្ជបញ្ជាថ្នាំ',
  'Add or update medication': 'បន្ថែម ឬកែថ្នាំ',
  'Schedule follow-up': 'កំណត់ការតាមដាន',
  'Set a follow-up reminder': 'កំណត់ការរំលឹកតាមដាន',

  // Chart action rail: results arriving
  // 'of' is owned by primitives ('នៃ'); the count line reuses that rendering.
  resulted: 'មានលទ្ធផល',
  'tests resulted': 'តេស្តមានលទ្ធផល',
  'Review results': 'ពិនិត្យលទ្ធផល',
  'Review available results': 'ពិនិត្យលទ្ធផលដែលមាន',
  'flagged value needs review now': 'តម្លៃដែលបានសម្គាល់ត្រូវការការពិនិត្យឥឡូវ',
  'flagged values need review now': 'តម្លៃដែលបានសម្គាល់ត្រូវការការពិនិត្យឥឡូវ',
  'Nothing flagged so far': 'មិនទាន់មានតម្លៃណាត្រូវបានសម្គាល់',
  "You'll get one alert when all": 'អ្នកនឹងទទួលការជូនដំណឹងមួយ នៅពេលទាំងអស់',
  'are in.': 'មកដល់។',
  'Notify me when complete': 'ជូនដំណឹងខ្ញុំពេលបញ្ចប់',

  // Diagnosis entry rail
  'Ready to diagnose?': 'ត្រៀមធ្វើរោគវិនិច្ឆ័យ?',
  'Confirm diagnoses before treatment.': 'បញ្ជាក់រោគវិនិច្ឆ័យមុនការព្យាបាល។',
  'Review AI ICD-10 suggestions': 'ពិនិត្យសំណើ ICD-10 ពី AI',
  'Codes based on abnormal labs.': 'កូដផ្អែកលើលទ្ធផលមិនធម្មតា។',
  'Add or search a diagnosis': 'បន្ថែម ឬស្វែងរករោគវិនិច្ឆ័យ',
  'Add a code when needed.': 'បន្ថែមកូដពេលចាំបាច់។',
  'Attach labs as evidence': 'ភ្ជាប់លទ្ធផលតេស្តជាភស្តុតាង',
  'Keep supporting values linked.': 'រក្សាតម្លៃគាំទ្រឱ្យភ្ជាប់គ្នា។',
  'Continue to prescribing': 'បន្តទៅការចេញវេជ្ជបញ្ជា',
  'Move into treatment once diagnoses are confirmed.':
    'បន្តទៅការព្យាបាល បន្ទាប់ពីបញ្ជាក់រោគវិនិច្ឆ័យ។',
  'Diagnose this patient': 'ធ្វើរោគវិនិច្ឆ័យអ្នកជំងឺនេះ',
  'Diagnosis review is unavailable until the remaining results are verified.':
    'មិនអាចពិនិត្យរោគវិនិច្ឆ័យបានទេ រហូតដល់លទ្ធផលដែលនៅសល់ត្រូវបានផ្ទៀងផ្ទាត់។',

  // ICD-10 selection rail
  'Select diagnosis': 'ជ្រើសរើសរោគវិនិច្ឆ័យ',
  'AI suggested': 'ស្នើដោយ AI',
  'Close diagnosis selection': 'បិទការជ្រើសរើសរោគវិនិច្ឆ័យ',
  'Draft — not verified or saved.':
    'សេចក្តីព្រាង — មិនទាន់ផ្ទៀងផ្ទាត់ ឬរក្សាទុក។',
  'to draft': 'ទៅសេចក្តីព្រាង',
  'from draft': 'ចេញពីសេចក្តីព្រាង',
  'View evidence for': 'មើលភស្តុតាងសម្រាប់',
  'Evidence for': 'ភស្តុតាងសម្រាប់',
  'Suggested from': 'ស្នើដោយផ្អែកលើ',
  'Review before adding to this draft.':
    'ពិនិត្យមុននឹងបន្ថែមទៅសេចក្តីព្រាងនេះ។',
  'Suggested from the latest clinical context. Review before adding to this draft.':
    'ស្នើដោយផ្អែកលើបរិបទព្យាបាលចុងក្រោយ។ ពិនិត្យមុននឹងបន្ថែមទៅសេចក្តីព្រាងនេះ។',
  'Related findings': 'ការរកឃើញពាក់ព័ន្ធ',
  'Search or add diagnosis': 'ស្វែងរក ឬបន្ថែមរោគវិនិច្ឆ័យ',
  match: 'លទ្ធផលត្រូវគ្នា',
  matches: 'លទ្ធផលត្រូវគ្នា',
  'No matching diagnosis. Try a code or name.':
    'គ្មានរោគវិនិច្ឆ័យត្រូវគ្នា។ សាកល្បងកូដ ឬឈ្មោះ។',
  'Select a diagnosis to review medicines.':
    'ជ្រើសរើសរោគវិនិច្ឆ័យ ដើម្បីពិនិត្យថ្នាំ។',
  'Review medicines': 'ពិនិត្យថ្នាំ',

  // Prescribe rail: shell and diagnosis gate
  Prescribe: 'ចេញវេជ្ជបញ្ជា',
  'Prescribe for': 'ចេញវេជ្ជបញ្ជាសម្រាប់',
  'Close medication draft': 'បិទសេចក្តីព្រាងថ្នាំ',
  'Back to medication draft': 'ត្រឡប់ទៅសេចក្តីព្រាងថ្នាំ',
  Diagnoses: 'រោគវិនិច្ឆ័យ',
  'Change diagnoses': 'ប្តូររោគវិនិច្ឆ័យ',
  'Add diagnosis': 'បន្ថែមរោគវិនិច្ឆ័យ',
  'Add a diagnosis before reviewing this medication draft.':
    'បន្ថែមរោគវិនិច្ឆ័យមុននឹងពិនិត្យសេចក្តីព្រាងថ្នាំនេះ។',
  'A linked diagnosis is required before this medication draft can continue.':
    'ត្រូវមានរោគវិនិច្ឆ័យភ្ជាប់ មុននឹងសេចក្តីព្រាងថ្នាំនេះអាចបន្តបាន។',

  // Prescribe rail: medication review
  'Medication review': 'ការពិនិត្យថ្នាំ',
  'to review': 'ត្រូវពិនិត្យ',
  'No current medications are available in this draft.':
    'គ្មានថ្នាំកំពុងប្រើក្នុងសេចក្តីព្រាងនេះទេ។',
  'Needs review': 'ត្រូវការត្រួតពិនិត្យ',
  'Draft · keep current': 'សេចក្តីព្រាង · រក្សាដដែល',
  'Draft · adjust': 'សេចក្តីព្រាង · កែសម្រួល',
  'Draft · pause': 'សេចក្តីព្រាង · ផ្អាក',
  'Draft · stop': 'សេចក្តីព្រាង · បញ្ឈប់',
  'Draft decision for': 'ការសម្រេចព្រាងសម្រាប់',
  Keep: 'រក្សាដដែល',
  Adjust: 'កែសម្រួល',
  Pause: 'ផ្អាក',
  Stop: 'បញ្ឈប់',
  Paused: 'បានផ្អាក',
  Dose: 'កម្រិតថ្នាំ',
  'How often': 'ញឹកញាប់ប៉ុណ្ណា',
  'Save adjustment': 'រក្សាទុកការកែសម្រួល',

  // Prescribe rail: new medications and AI proposals
  'New medications': 'ថ្នាំថ្មី',
  'Add medication': 'បន្ថែមថ្នាំ',
  'Search medications': 'ស្វែងរកថ្នាំ',
  'No medication matches': 'គ្មានថ្នាំត្រូវនឹង',
  'Try another search.': 'សាកល្បងស្វែងរកផ្សេង។',
  'Draft additions': 'ការបន្ថែមក្នុងសេចក្តីព្រាង',
  'Add to draft': 'បន្ថែមទៅសេចក្តីព្រាង',
  'In draft': 'ក្នុងសេចក្តីព្រាង',
  'AI suggestion': 'សំណើពី AI',
  'AI suggestions': 'សំណើពី AI',
  'Review the evidence and missing checks before adding anything.':
    'ពិនិត្យភស្តុតាង និងការត្រួតពិនិត្យដែលខ្វះ មុននឹងបន្ថែមអ្វីមួយ។',
  'Evidence:': 'ភស្តុតាង៖',
  'Not checked:': 'មិនបានពិនិត្យ៖',

  // Prescribe rail: footer gate
  'Draft only — not saved.': 'សេចក្តីព្រាងតែប៉ុណ្ណោះ — មិនបានរក្សាទុក។',
  'current medication': 'ថ្នាំកំពុងប្រើ',
  'current medications': 'ថ្នាំកំពុងប្រើ',
  'to continue.': 'ដើម្បីបន្ត។',
  'Finish review': 'បញ្ចប់ការពិនិត្យ',
};
