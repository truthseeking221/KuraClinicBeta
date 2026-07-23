import type { KhmerDictionary } from '../types';

/**
 * The patient-identity phone gate: capture a Cambodia number, verify it by
 * SMS code, match an existing patient, or add a new one.
 *
 * The gate's two safety claims are translated literally and never softened:
 * possession of a phone is not proof of identity, and details that matched no
 * phone are not proof the patient is new. Phone numbers, OTP digits, MRNs,
 * provisional codes, "Kura", and "PSC" stay in Latin script.
 *
 * Strings this area shares with the auth door and wizard ("Send SMS code",
 * "SMS code", "Resend code", "Resend in") live in `auth.ts`; the merged
 * dictionary is global, so each of them is defined exactly once.
 */
export const PHONE_GATE_KM: KhmerDictionary = {
  // ── Step titles ───────────────────────────────────────────
  'Contact phone number': 'លេខទូរស័ព្ទទំនាក់ទំនង',
  'Use the patient’s number, or a guardian’s or guarantor’s.':
    'ប្រើលេខរបស់អ្នកជំងឺ ឬរបស់អាណាព្យាបាល ឬអ្នកធានា។',
  'The patient or phone holder must be with you to receive the code.':
    'អ្នកជំងឺ ឬម្ចាស់ទូរស័ព្ទត្រូវនៅជាមួយអ្នក ដើម្បីទទួលលេខកូដ។',
  'Enter the code': 'បញ្ចូលលេខកូដ',
  'Is this the patient?': 'តើនេះជាអ្នកជំងឺមែនទេ?',
  'Which patient?': 'អ្នកជំងឺណាមួយ?',
  'Add a new patient': 'បន្ថែមអ្នកជំងឺថ្មី',
  'Possible patient found': 'រកឃើញអ្នកជំងឺដែលអាចត្រូវគ្នា',
  'A matching patient was just added': 'ទើបតែមានការបន្ថែមអ្នកជំងឺដែលត្រូវគ្នា',
  'Patient lookup': 'ការស្វែងរកអ្នកជំងឺ',

  // ── Actions ───────────────────────────────────────────────
  'Verify code': 'ផ្ទៀងផ្ទាត់លេខកូដ',
  'Checking code…': 'កំពុងពិនិត្យលេខកូដ…',
  'Use this patient': 'ប្រើអ្នកជំងឺនេះ',
  'Someone else': 'អ្នកផ្សេង',
  'Use selected patient': 'ប្រើអ្នកជំងឺដែលបានជ្រើស',
  'None of these': 'គ្មានមួយណាទេ',
  'Create provisional patient': 'បង្កើតអ្នកជំងឺបណ្តោះអាសន្ន',
  'Checking patient records…': 'កំពុងពិនិត្យកំណត់ត្រាអ្នកជំងឺ…',
  'Adding the patient…': 'កំពុងបន្ថែមអ្នកជំងឺ…',
  'Review patient': 'ពិនិត្យអ្នកជំងឺ',
  Change: 'ប្តូរ',
  'Change phone number': 'ប្តូរលេខទូរស័ព្ទ',
  'Close patient identity gate': 'បិទផ្ទាំងផ្ទៀងផ្ទាត់អត្តសញ្ញាណអ្នកជំងឺ',

  // ── The two axes: contact verified, identity not ──────────
  'Phone verified by SMS': 'លេខទូរស័ព្ទបានផ្ទៀងផ្ទាត់តាម SMS',
  'Patient identity not yet confirmed': 'អត្តសញ្ញាណអ្នកជំងឺមិនទាន់បានបញ្ជាក់នៅឡើយ',
  'Sent to': 'ផ្ញើទៅ',
  'SMS confirms the number, not who is being tested.':
    'SMS បញ្ជាក់លេខទូរស័ព្ទ មិនមែនបញ្ជាក់ថានរណាជាអ្នកត្រូវធ្វើតេស្តទេ។',
  'Phone verified': 'លេខទូរស័ព្ទបានផ្ទៀងផ្ទាត់',
  'PSC will confirm identity': 'PSC នឹងបញ្ជាក់អត្តសញ្ញាណ',

  // ── Match outcomes ────────────────────────────────────────
  'This number is linked to': 'លេខនេះភ្ជាប់នឹង',
  patients: 'អ្នកជំងឺ',
  'Matching patients': 'អ្នកជំងឺដែលត្រូវគ្នា',
  'This phone is already linked to another Kura patient':
    'លេខទូរស័ព្ទនេះបានភ្ជាប់រួចហើយនឹងអ្នកជំងឺ Kura ម្នាក់ទៀត',
  'Confirm the person being tested is someone else.':
    'សូមបញ្ជាក់ថាអ្នកដែលត្រូវធ្វើតេស្តគឺជាអ្នកផ្សេង។',
  'I confirmed none of the matched patients is the person being tested.':
    'ខ្ញុំបានបញ្ជាក់ថាគ្មានអ្នកជំងឺដែលត្រូវគ្នាណាមួយជាអ្នកដែលត្រូវធ្វើតេស្តទេ។',
  'No patient matched this phone. Kura checks for duplicates before creating the record.':
    'គ្មានអ្នកជំងឺត្រូវនឹងលេខទូរស័ព្ទនេះទេ។ Kura នឹងពិនិត្យរកកំណត់ត្រាស្ទួនមុននឹងបង្កើតកំណត់ត្រា។',
  'Review the match before creating a new record.':
    'សូមពិនិត្យអ្នកជំងឺដែលត្រូវគ្នា មុននឹងបង្កើតកំណត់ត្រាថ្មី។',
  'Added by someone else while you were entering these details.':
    'បានបន្ថែមដោយអ្នកផ្សេង ខណៈអ្នកកំពុងបញ្ចូលព័ត៌មានលម្អិតទាំងនេះ។',

  // ── New patient form ──────────────────────────────────────
  'Exact date is unknown': 'មិនស្គាល់ថ្ងៃខែឆ្នាំពិតប្រាកដ',
  'Age in years': 'អាយុគិតជាឆ្នាំ',
  'Kura records this as an estimated age.':
    'Kura នឹងកត់ត្រាទុកជាអាយុប៉ាន់ស្មាន។',
  'Creates a provisional record. PSC staff confirm identity before collection.':
    'បង្កើតកំណត់ត្រាបណ្តោះអាសន្ន។ បុគ្គលិក PSC នឹងបញ្ជាក់អត្តសញ្ញាណមុនពេលយកសំណាក។',
  'Complete the required fields to continue.':
    'សូមបំពេញប្រអប់ដែលទាមទារ ដើម្បីបន្ត។',

  // ── Errors ────────────────────────────────────────────────
  'Enter a valid Cambodia phone number.':
    'បញ្ចូលលេខទូរស័ព្ទកម្ពុជាឱ្យបានត្រឹមត្រូវ។',
  'Too many codes requested — try again in a few minutes.':
    'បានស្នើសុំលេខកូដច្រើនដងពេក — សូមព្យាយាមម្តងទៀតក្នុងរយៈពេលពីរបីនាទី។',
  'Incorrect or expired code — try again.':
    'លេខកូដមិនត្រឹមត្រូវ ឬផុតកំណត់ — សូមព្យាយាមម្តងទៀត។',
  'Lookup unavailable': 'ការស្វែងរកមិនអាចប្រើបាន',
  'The patient lookup did not respond. Your entries are kept.':
    'ការស្វែងរកអ្នកជំងឺមិនបានឆ្លើយតបទេ។ អ្វីដែលអ្នកបានបញ្ចូលនៅតែរក្សាទុក។',
  'Couldn’t check for existing patients': 'មិនអាចពិនិត្យរកអ្នកជំងឺដែលមានស្រាប់បានទេ',
  'No patient record was created. Check the connection and try again.':
    'គ្មានកំណត់ត្រាអ្នកជំងឺត្រូវបានបង្កើតទេ។ សូមពិនិត្យការតភ្ជាប់ ហើយព្យាយាមម្តងទៀត។',
  'Enter the full name.': 'បញ្ចូលឈ្មោះពេញ។',
  'Enter the date of birth.': 'បញ្ចូលថ្ងៃខែឆ្នាំកំណើត។',
  'Enter a real date, as YYYY-MM-DD.':
    'បញ្ចូលថ្ងៃខែឆ្នាំពិតប្រាកដ តាមទម្រង់ YYYY-MM-DD។',
  'The date of birth cannot be in the future.':
    'ថ្ងៃខែឆ្នាំកំណើតមិនអាចនៅពេលអនាគតបានទេ។',
  'Enter the estimated age in years.': 'បញ្ចូលអាយុប៉ាន់ស្មានគិតជាឆ្នាំ។',
  'Enter a whole age between 0 and 120.':
    'បញ្ចូលអាយុជាចំនួនគត់ចន្លោះ 0 និង 120។',
  'Select a sex.': 'ជ្រើសរើសភេទ។',
  'Confirm this is a different person to continue.':
    'សូមបញ្ជាក់ថានេះជាមនុស្សផ្សេង ដើម្បីបន្ត។',
  'Select a patient, or add a new patient.':
    'ជ្រើសរើសអ្នកជំងឺ ឬបន្ថែមអ្នកជំងឺថ្មី។',

  // ── Discard guard ─────────────────────────────────────────
  'Discard what you entered?': 'បោះបង់អ្វីដែលអ្នកបានបញ្ចូល?',
  'The verified phone and the details typed here will not be saved.':
    'លេខទូរស័ព្ទដែលបានផ្ទៀងផ្ទាត់ និងព័ត៌មានលម្អិតដែលបានវាយបញ្ចូលនៅទីនេះនឹងមិនត្រូវបានរក្សាទុកទេ។',
  'Keep editing': 'បន្តកែសម្រួល',
  'Discard & close': 'បោះបង់ ហើយបិទ',
};
