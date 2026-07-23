import type { KhmerDictionary } from '../types';

/**
 * Lab test catalog: browsing, category filtering, the hover detail preview,
 * the order rail, and the order-start gate.
 *
 * Test names, test codes, panel names, specimen and turnaround values, prices,
 * and every numeral stay Latin — they are catalog contract data a doctor and a
 * lab must read identically. Only the chrome around them is translated.
 * `{token}` placeholders are substituted after lookup, so a missing entry still
 * renders correct English.
 */
export const LAB_CATALOG_KM: KhmerDictionary = {
  // Catalog result summary and search
  'Lab test catalog': 'បញ្ជីតេស្តមន្ទីរពិសោធន៍',
  'Browse current tests and build an order.':
    'មើលតេស្តបច្ចុប្បន្ន និងរៀបចំការបញ្ជា។',
  'Search results': 'លទ្ធផលស្វែងរក',
  'Filtered tests': 'តេស្តដែលបានត្រង',
  'Search tests, panels, or keywords': 'ស្វែងរកតេស្ត បណ្តុំតេស្ត ឬពាក្យគន្លឹះ',
  'Search tests, panels, or keywords…': 'ស្វែងរកតេស្ត បណ្តុំតេស្ត ឬពាក្យគន្លឹះ…',
  'Lab tests by category': 'តេស្តតាមប្រភេទ',
  'Loading lab tests': 'កំពុងផ្ទុកតេស្ត',
  '{count} test available in this view': 'មានតេស្ត {count} ក្នុងទិដ្ឋភាពនេះ',
  '{count} tests available in this view': 'មានតេស្ត {count} ក្នុងទិដ្ឋភាពនេះ',

  // Shared with results — both files must keep the same rendering.
  'All tests': 'តេស្តទាំងអស់',
  Reference: 'ជួរយោង',
  '{count} test': 'តេស្ត {count}',
  '{count} tests': 'តេស្ត {count}',

  // Category filter
  Category: 'ប្រភេទ',
  'Category · {name}': 'ប្រភេទ · {name}',
  'Category · {name} +{count}': 'ប្រភេទ · {name} +{count}',
  'Filter by category': 'តម្រងតាមប្រភេទ',
  'Filter by category, {count} selected': 'តម្រងតាមប្រភេទ បានជ្រើស {count}',
  'Clear categories': 'សម្អាតប្រភេទ',

  // Selection permission and availability
  'Temporarily unavailable': 'មិនអាចប្រើបានបណ្តោះអាសន្ន',
  'Catalog selection is disabled.': 'ការជ្រើសរើសពីបញ្ជីតេស្តត្រូវបានបិទ។',
  'This selection is read-only.': 'ការជ្រើសរើសនេះអានបានតែប៉ុណ្ណោះ។',
  'Your workspace permission allows catalog review only.':
    'សិទ្ធិកន្លែងធ្វើការរបស់អ្នកអនុញ្ញាតឱ្យមើលបញ្ជីតេស្តតែប៉ុណ្ណោះ។',
  'Browse-only catalog': 'បញ្ជីតេស្តមើលបានតែប៉ុណ្ណោះ',
  'Your current workspace permission allows catalog review but not test selection.':
    'សិទ្ធិកន្លែងធ្វើការបច្ចុប្បន្នអនុញ្ញាតឱ្យមើលបញ្ជីតេស្ត ប៉ុន្តែមិនអាចជ្រើសរើសតេស្តបានទេ។',
  'Read-only selection': 'ការជ្រើសរើសអានបានតែប៉ុណ្ណោះ',
  'Tests already attached to this order are shown for review and cannot be changed here.':
    'តេស្តដែលភ្ជាប់នឹងការបញ្ជានេះរួចហើយ បង្ហាញសម្រាប់ត្រួតពិនិត្យ ហើយមិនអាចប្តូរនៅទីនេះទេ។',

  // Catalog freshness and failure
  'Catalog snapshot may be out of date': 'បញ្ជីតេស្តអាចហួសសម័យ',
  'Last refreshed {date}.': 'ផ្ទុកឡើងវិញចុងក្រោយ {date}។',
  'Refresh before relying on availability.':
    'សូមផ្ទុកឡើងវិញ មុននឹងទុកចិត្តលើភាពអាចប្រើបាន។',
  'Refresh catalog': 'ផ្ទុកបញ្ជីតេស្តឡើងវិញ',
  'Catalog unavailable offline': 'បញ្ជីតេស្តមិនអាចប្រើបានពេលដាច់អ៊ីនធឺណិត',
  'Could not load tests': 'មិនអាចផ្ទុកតេស្តបានទេ',
  'Reconnect to load current test availability and continue selecting.':
    'សូមភ្ជាប់អ៊ីនធឺណិតឡើងវិញ ដើម្បីផ្ទុកភាពអាចប្រើបាន និងបន្តជ្រើសរើស។',
  'The catalog service did not respond. Try again.':
    'សេវាបញ្ជីតេស្តមិនឆ្លើយតប។ សូមព្យាយាមម្តងទៀត។',

  // Empty search
  'No tests match “{query}”': 'គ្មានតេស្តត្រូវនឹង “{query}”',
  'No tests match these filters': 'គ្មានតេស្តត្រូវនឹងតម្រងទាំងនេះ',
  'Try a broader search or submit a missing-test request.':
    'សូមស្វែងរកឱ្យទូលាយ ឬស្នើសុំតេស្តដែលខ្វះ។',
  'Suggest a missing test': 'ស្នើតេស្តដែលខ្វះ',

  // Test detail preview
  '{name} test details': 'ព័ត៌មានលម្អិតតេស្ត {name}',
  'Test summary': 'សេចក្តីសង្ខេបតេស្ត',
  'Collection summary': 'សេចក្តីសង្ខេបការយកសំណាក',
  'Test operations': 'ប្រតិបត្តិការតេស្ត',
  prep: 'ត្រៀម',
  Analytical: 'ការវិភាគ',
  'Specimen & handling': 'សំណាក និងការគ្រប់គ្រង',
  Specimen: 'សំណាក',
  Code: 'លេខកូដ',
  'Ref {range}': 'យោង {range}',
  "You'll earn": 'អ្នកនឹងទទួលបាន',
  'Add to order': 'បន្ថែមទៅការបញ្ជា',

  // Order rail
  'Order lab tests': 'បញ្ជាតេស្តមន្ទីរពិសោធន៍',
  'Close lab order': 'បិទការបញ្ជាតេស្ត',
  '{count} selected': 'បានជ្រើស {count}',
  'Review does not submit.': 'ការត្រួតពិនិត្យមិនដាក់ស្នើទេ។',
  'Review is not connected in this prototype.':
    'ការត្រួតពិនិត្យមិនទាន់ភ្ជាប់ក្នុងគំរូនេះទេ។',
  'Review order': 'ត្រួតពិនិត្យការបញ្ជា',

  // Order-start gate
  'Licence required to place orders': 'ត្រូវការអាជ្ញាបណ្ណដើម្បីធ្វើការបញ្ជា',
  'You can browse the catalog and prices now. A live credential is required for self-attribution.':
    'អ្នកអាចមើលបញ្ជីតេស្ត និងតម្លៃឥឡូវនេះ។ ត្រូវការអាជ្ញាបណ្ណសកម្ម ដើម្បីភ្ជាប់ការបញ្ជាមកខ្លួនឯង។',
  'Verify licence': 'ផ្ទៀងផ្ទាត់អាជ្ញាបណ្ណ',
  'Choose patient': 'ជ្រើសរើសអ្នកជំងឺ',
};
