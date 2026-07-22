import type { KhmerDictionary } from '../types';

/**
 * The doctor's encounter surface: reason for visit, findings, and the
 * structured diagnoses that ground every order placed from this visit.
 *
 * Diagnosis labels are ICD-10 titles and stay in English, as do ICD-10 codes,
 * analyte names, and units. Only the chrome around them is translated.
 */
export const ASSESSMENT_KM: KhmerDictionary = {
  'Clinical assessment': 'ការវាយតម្លៃព្យាបាល',
  Signed: 'បានចុះហត្ថលេខា',

  // Encounter fields
  'Reason for visit': 'មូលហេតុមកពិនិត្យ',
  "In the patient's own words.": 'តាមពាក្យរបស់អ្នកជំងឺផ្ទាល់។',
  'Symptoms and history': 'រោគសញ្ញា និងប្រវត្តិ',
  'Examination findings': 'លទ្ធផលការពិនិត្យ',
  'Vital signs': 'សញ្ញាជីវិត',
  'Record vital signs': 'កត់ត្រាសញ្ញាជីវិត',
  Plan: 'ផែនការ',

  // Assessment section
  Assessment: 'ការវាយតម្លៃ',
  'Every test ordered from this visit carries one of these as its stated reason.':
    'រាល់តេស្តដែលបញ្ជាពីការមកពិនិត្យនេះ យកមួយក្នុងចំណោមនេះជាមូលហេតុ។',
  'No diagnosis recorded yet.': 'មិនទាន់មានរោគវិនិច្ឆ័យត្រូវបានកត់ត្រាទេ។',
  'Diagnosis or impression': 'រោគវិនិច្ឆ័យ ឬការសន្និដ្ឋាន',
  'Type or pick a coded diagnosis': 'វាយបញ្ចូល ឬជ្រើសរើសរោគវិនិច្ឆ័យដែលមានកូដ',
  'Optional while the impression is uncoded.':
    'ស្រេចចិត្ត ខណៈការសន្និដ្ឋាននៅមិនទាន់មានកូដ។',
  Evidence: 'ភស្តុតាង',
  'Add diagnosis': 'បន្ថែមរោគវិនិច្ឆ័យ',
  'Certainty for': 'កម្រិតប្រាកដប្រជាសម្រាប់',

  // Certainty
  Working: 'កំពុងសង្ស័យ',
  Confirmed: 'បានបញ្ជាក់',
  'Ruled out': 'បានច្រានចោល',

  // Grounding an order
  'Still needed': 'នៅត្រូវការ',
  'Record the reason for visit': 'កត់ត្រាមូលហេតុមកពិនិត្យ',
  'Add a working diagnosis': 'បន្ថែមរោគវិនិច្ឆ័យដែលកំពុងសង្ស័យ',
  'Orders will carry': 'ការបញ្ជានឹងយក',
  'diagnoses available as an order reason.': 'រោគវិនិច្ឆ័យអាចប្រើជាមូលហេតុបញ្ជា។',
  'Order tests': 'បញ្ជាតេស្ត',
};
