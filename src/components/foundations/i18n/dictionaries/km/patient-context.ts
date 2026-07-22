import type { KhmerDictionary } from '../types';

/**
 * Patient context rail: the always-visible clinical frame beside the chart —
 * identity, safety, today's visit, and the disclosed record groups.
 *
 * Allergy findings, drug names, lab values, and demographics are record data
 * and stay as written. Only the group labels, the "nothing recorded" lines,
 * and the state notices are translated.
 *
 * Group labels and their empty lines are also authored by care-loop, which
 * feeds this rail. The renderings below match that file exactly; the shared
 * strings belong in common.ts once someone can edit it.
 */
export const PATIENT_CONTEXT_KM: KhmerDictionary = {
  // Rail chrome
  Safety: 'សុវត្ថិភាព',
  'Reason for visit': 'មូលហេតុមកពិនិត្យ',
  'Patient record details': 'ព័ត៌មានលម្អិតកំណត់ត្រាអ្នកជំងឺ',
  'Patient context for': 'បរិបទអ្នកជំងឺសម្រាប់',
  'Loading patient context': 'កំពុងផ្ទុកបរិបទអ្នកជំងឺ',
  recorded: 'បានកត់ត្រា',

  // Record groups
  'Active problems': 'បញ្ហាសកម្ម',
  'Current medications': 'ថ្នាំកំពុងប្រើ',
  'Pending verification': 'កំពុងរង់ចាំការផ្ទៀងផ្ទាត់',
  'Past history': 'ប្រវត្តិពីមុន',
  'Admin details': 'ព័ត៌មានរដ្ឋបាល',

  // Nothing recorded in a group
  'No active problems recorded.': 'គ្មានបញ្ហាសកម្មត្រូវបានកត់ត្រាទេ។',
  'No current medications recorded.': 'គ្មានថ្នាំកំពុងប្រើត្រូវបានកត់ត្រាទេ។',
  'No active medications recorded.': 'គ្មានថ្នាំសកម្មត្រូវបានកត់ត្រាទេ។',
  'No pending verification recorded.':
    'គ្មានការផ្ទៀងផ្ទាត់ដែលរង់ចាំត្រូវបានកត់ត្រាទេ។',
  'No past history recorded.': 'គ្មានប្រវត្តិពីមុនត្រូវបានកត់ត្រាទេ។',
  'No admin details recorded.': 'គ្មានព័ត៌មានរដ្ឋបាលត្រូវបានកត់ត្រាទេ។',

  // Identity status and visit reasons carried by the rail
  'Provisional · PSC verifies': 'បណ្តោះអាសន្ន · PSC ផ្ទៀងផ្ទាត់',
  'At risk': 'មានហានិភ័យ',
  'Repeat due': 'ដល់ពេលធ្វើឡើងវិញ',

  // State notices. 'Limited access' is owned by auth, which states the same
  // permission boundary at the door.
  'This role cannot view the patient record details.':
    'តួនាទីនេះមិនអាចមើលព័ត៌មានលម្អិតកំណត់ត្រាអ្នកជំងឺបានទេ។',
  'Patient context is offline': 'បរិបទអ្នកជំងឺដាច់អ៊ីនធឺណិត',
  'Reconnect to refresh this target-contract view.':
    'ភ្ជាប់ឡើងវិញដើម្បីផ្ទុកទិដ្ឋភាពនេះឡើងវិញ។',
  'Could not load patient context': 'មិនអាចផ្ទុកបរិបទអ្នកជំងឺបានទេ',
  'Try again to load the patient context.':
    'ព្យាយាមម្តងទៀតដើម្បីផ្ទុកបរិបទអ្នកជំងឺ។',
};
