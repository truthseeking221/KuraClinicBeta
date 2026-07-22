import type { KhmerDictionary } from '../types';

/**
 * Doctor results review: flowsheet, longitudinal history, trend charts,
 * critical acknowledgment, and episode closure.
 *
 * Analyte names, analyte codes, panel names, units, reference-tier labels, and
 * every numeral stay Latin — they are the clinical identifiers a doctor reads
 * back. Only the chrome around them is translated. `{token}` placeholders are
 * substituted after lookup, so a missing entry still renders correct English.
 */
export const RESULTS_KM: KhmerDictionary = {
  // Episode progress and dates
  'No tests in this episode': 'គ្មានតេស្តក្នុងវគ្គនេះ',
  'No results — episode cancelled': 'គ្មានលទ្ធផល — វគ្គត្រូវបានបោះបង់',
  'All {total} results ready': 'លទ្ធផលទាំង {total} រួចរាល់',
  '{released} of {total} ready': '{released} ក្នុងចំណោម {total} រួចរាល់',
  '{count} pending': '{count} កំពុងរង់ចាំ',
  '{count} unavailable': '{count} មិនអាចប្រើបាន',
  'Date unavailable': 'គ្មានកាលបរិច្ឆេទ',
  'Unknown date': 'កាលបរិច្ឆេទមិនស្គាល់',
  'date unavailable': 'គ្មានកាលបរិច្ឆេទ',
  'Current episode': 'វគ្គបច្ចុប្បន្ន',

  // Test lifecycle badges
  'Awaiting sample': 'រង់ចាំសំណាក',
  'In lab': 'នៅមន្ទីរពិសោធន៍',
  Running: 'កំពុងវិភាគ',
  Verifying: 'កំពុងផ្ទៀងផ្ទាត់',
  'In review': 'កំពុងត្រួតពិនិត្យ',
  Signed: 'បានចុះហត្ថលេខា',
  Verified: 'បានផ្ទៀងផ្ទាត់',
  Released: 'បានចេញផ្សាយ',
  Dismissed: 'បានច្រានចោល',

  // Test lifecycle explanations
  'No sample received yet.': 'មិនទាន់ទទួលសំណាកនៅឡើយ។',
  'Sample accepted by the lab.': 'មន្ទីរពិសោធន៍បានទទួលសំណាក។',
  'Analysis in progress.': 'កំពុងវិភាគ។',
  'Values received — verification pending.': 'បានទទួលតម្លៃ — កំពុងរង់ចាំការផ្ទៀងផ្ទាត់។',
  'Held for manual review by the lab.': 'មន្ទីរពិសោធន៍កំពុងត្រួតពិនិត្យដោយដៃ។',
  'Verified — releasing.': 'បានផ្ទៀងផ្ទាត់ — កំពុងចេញលទ្ធផល។',
  'Auto-verified — releasing.': 'ផ្ទៀងផ្ទាត់ស្វ័យប្រវត្តិ — កំពុងចេញលទ្ធផល។',
  'Result released.': 'លទ្ធផលបានចេញ។',
  'Test cancelled before verification.': 'តេស្តត្រូវបានបោះបង់មុនការផ្ទៀងផ្ទាត់។',
  'Dismissed by lab quality control.':
    'ត្រូវបានច្រានចោលដោយផ្នែកគ្រប់គ្រងគុណភាពមន្ទីរពិសោធន៍។',

  // Workspace header and system state
  born: 'កើត',
  'Loading released results': 'កំពុងផ្ទុកលទ្ធផលដែលបានចេញ',
  'The workspace will preserve filters and focus when the episode is ready.':
    'តម្រង និងចំណុចផ្តោតនឹងរក្សាទុក នៅពេលវគ្គរួចរាល់។',
  'Results could not be loaded': 'មិនអាចផ្ទុកលទ្ធផលបានទេ',
  'No clinical value is inferred from this failure. Retry the episode request.':
    'កំហុសនេះមិនបញ្ជាក់អំពីតម្លៃព្យាបាលឡើយ។ សូមព្យាយាមស្នើវគ្គម្តងទៀត។',
  'Results changed during review': 'លទ្ធផលបានផ្លាស់ប្តូរកំឡុងពេលត្រួតពិនិត្យ',
  'A release, cancellation, redraw, or add-on changed this episode. Refresh before any acknowledgment or closure decision.':
    'ការចេញលទ្ធផល ការបោះបង់ ការយកសំណាកឡើងវិញ ឬតេស្តបន្ថែម បានផ្លាស់ប្តូរវគ្គនេះ។ សូមផ្ទុកឡើងវិញ មុននឹងទទួលស្គាល់ ឬបិទវគ្គ។',
  'Refresh episode': 'ផ្ទុកវគ្គឡើងវិញ',
  'Results are restricted': 'លទ្ធផលត្រូវបានដាក់កម្រិត',
  "Your current clinic role cannot view this patient's released laboratory results.":
    'តួនាទីបច្ចុប្បន្នរបស់អ្នកនៅគ្លីនិក មិនអាចមើលលទ្ធផលមន្ទីរពិសោធន៍របស់អ្នកជំងឺនេះបានទេ។',
  'No result episodes': 'គ្មានវគ្គលទ្ធផល',
  'No results to review': 'គ្មានលទ្ធផលត្រូវត្រួតពិនិត្យ',
  'This patient has no released or pending laboratory episode to review.':
    'អ្នកជំងឺនេះគ្មានវគ្គមន្ទីរពិសោធន៍ដែលបានចេញ ឬកំពុងរង់ចាំ ដើម្បីត្រួតពិនិត្យទេ។',
  'No patient result episodes are available in this workspace.':
    'គ្មានវគ្គលទ្ធផលអ្នកជំងឺនៅក្នុងកន្លែងធ្វើការនេះទេ។',
  'Offline — showing cached results': 'ដាច់អ៊ីនធឺណិត — កំពុងបង្ហាញលទ្ធផលដែលរក្សាទុក',
  'Values may be stale. Actions that change clinical state are unavailable.':
    'តម្លៃអាចហួសសម័យ។ សកម្មភាពដែលប្តូរស្ថានភាពព្យាបាល មិនអាចប្រើបានទេ។',
  'Result snapshot may be stale': 'រូបភាពលទ្ធផលអាចហួសសម័យ',
  'Last synchronized': 'ធ្វើសមកាលកម្មចុងក្រោយ',
  'Read-only review': 'ការត្រួតពិនិត្យបែបអានតែប៉ុណ្ណោះ',
  'Search, filters, chart focus, and released history remain available.':
    'ការស្វែងរក តម្រង ការផ្តោតលើគំនូសតាង និងប្រវត្តិលទ្ធផល នៅតែប្រើបាន។',
  'Longitudinal lab results': 'លទ្ធផលមន្ទីរពិសោធន៍តាមពេលវេលា',
  'No results match these controls': 'គ្មានលទ្ធផលត្រូវនឹងការកំណត់ទាំងនេះ',
  'Change the search or result filter. Episode progress remains {progress}.':
    'សូមប្តូរការស្វែងរក ឬតម្រងលទ្ធផល។ វឌ្ឍនភាពវគ្គនៅតែ {progress}។',
  'Clear controls': 'សម្អាតការកំណត់',
  'Showing {count} matching analytes.': 'កំពុងបង្ហាញធាតុវិភាគ {count} ដែលត្រូវគ្នា។',

  // Results toolbar
  'Results controls': 'ការគ្រប់គ្រងលទ្ធផល',
  'Search analytes, codes, or panels': 'ស្វែងរកធាតុវិភាគ កូដ ឬបណ្តុំតេស្ត',
  'Result filter': 'តម្រងលទ្ធផល',
  'History display': 'ការបង្ហាញប្រវត្តិ',
  'All results': 'លទ្ធផលទាំងអស់',
  Flagged: 'បានដាក់សញ្ញា',
  'Critical only': 'គ្រោះថ្នាក់តែប៉ុណ្ណោះ',
  'No reference': 'គ្មានជួរយោង',
  'Latest only': 'ចុងក្រោយតែប៉ុណ្ណោះ',
  'Full history': 'ប្រវត្តិពេញលេញ',

  // Flowsheet
  'No reportable results yet': 'មិនទាន់មានលទ្ធផលដែលអាចរាយការណ៍',
  'Released results appear here as soon as the lab makes them available.':
    'លទ្ធផលនឹងបង្ហាញនៅទីនេះ ភ្លាមៗនៅពេលមន្ទីរពិសោធន៍ចេញផល។',

  // Result row: reference, trend, provenance
  'Reference {range}': 'ជួរយោង {range}',
  'Qualitative result': 'លទ្ធផលបែបគុណភាព',
  'No applicable reference': 'គ្មានជួរយោងអនុវត្តបាន',
  'Lab-flagged': 'មន្ទីរពិសោធន៍ដាក់សញ្ញា',
  'Manually verified': 'ផ្ទៀងផ្ទាត់ដោយដៃ',
  Improving: 'ប្រសើរឡើង',
  Worsening: 'កាន់តែធ្ងន់',
  Stable: 'ថេរ',

  // Draw strip, reference band, charts
  '{name} by draw': '{name} តាមការយកសំណាកនីមួយៗ',
  '{count} earlier': '{count} មុននេះ',
  'Reference scale': 'មាត្រដ្ឋានយោង',
  'value {value} in {zone} zone': 'តម្លៃ {value} ក្នុងតំបន់ {zone}',
  '{name} trend — {series}': 'និន្នាការ {name} — {series}',
  '{name} history — {series}': 'ប្រវត្តិ {name} — {series}',
  'Hover or focus a chart point for draw details.':
    'ដាក់កណ្ដុរ ឬផ្តោតលើចំណុចនៃគំនូសតាង ដើម្បីមើលព័ត៌មានលម្អិត។',

  // Result detail sheet
  'The latest result has no usable observation timestamp and is not plotted on the time axis.':
    'លទ្ធផលចុងក្រោយគ្មានពេលវេលាសង្កេតដែលប្រើបាន ដូច្នេះមិនត្រូវបានគូសលើអ័ក្សពេលវេលាទេ។',
  'Not in this draw — absence is not read as normal.':
    'មិនមានក្នុងការយកសំណាកនេះ — អវត្តមានមិនមានន័យថាធម្មតាទេ។',
  'Full released history': 'ប្រវត្តិលទ្ធផលពេញលេញ',
  History: 'ប្រវត្តិ',
  'View {name} history': 'មើលប្រវត្តិ {name}',
  'Close {name} history': 'បិទប្រវត្តិ {name}',
  'Click for the complete released history.': 'ចុចដើម្បីមើលប្រវត្តិលទ្ធផលពេញលេញ។',
  'Released longitudinal history and the applicable catalog reference range.':
    'ប្រវត្តិលទ្ធផលតាមពេលវេលា និងជួរយោងពីបញ្ជីតេស្ត។',

  // Critical result acknowledgment
  'Critical result acknowledged': 'បានទទួលស្គាល់លទ្ធផលគ្រោះថ្នាក់',
  released: 'បានចេញ',
  'This acknowledgment is a design-target event pending backend audit mapping.':
    'ការទទួលស្គាល់នេះជាព្រឹត្តិការណ៍គោលដៅរចនា កំពុងរង់ចាំការភ្ជាប់ជាមួយប្រព័ន្ធសវនកម្ម។',
  'Critical result requires acknowledgment': 'លទ្ធផលគ្រោះថ្នាក់ត្រូវការការទទួលស្គាល់',
  'is inside the catalog panic tier “{tier}”.':
    'ស្ថិតក្នុងកម្រិតគ្រោះថ្នាក់ “{tier}” នៃបញ្ជីតេស្ត។',
  'Review the released history before acknowledging.':
    'សូមពិនិត្យប្រវត្តិលទ្ធផល មុននឹងទទួលស្គាល់។',
  'Acknowledge critical result': 'ទទួលស្គាល់លទ្ធផលគ្រោះថ្នាក់',

  // Review closure gate
  '{count} test line is still pending.': 'នៅមានតេស្ត {count} កំពុងរង់ចាំ។',
  '{count} test lines are still pending.': 'នៅមានតេស្ត {count} កំពុងរង់ចាំ។',
  'A critical released result still requires acknowledgment.':
    'លទ្ធផលគ្រោះថ្នាក់មួយនៅតែត្រូវការការទទួលស្គាល់។',
  'All release and acknowledgment gates are satisfied.':
    'លក្ខខណ្ឌចេញលទ្ធផល និងការទទួលស្គាល់គ្រប់គ្រាន់ហើយ។',
  'Clinical result review closed': 'ការត្រួតពិនិត្យលទ្ធផលព្យាបាលបានបិទ',
  'The closure event is represented as a product/design target until backend audit and concurrency contracts are mapped.':
    'ព្រឹត្តិការណ៍បិទនេះជាគោលដៅផលិតផល/រចនា រហូតដល់កិច្ចសន្យាសវនកម្ម និងភាពស្របគ្នាត្រូវបានភ្ជាប់។',
  'Clinical closure gate': 'លក្ខខណ្ឌបិទការព្យាបាល',
  'Review closed': 'ការត្រួតពិនិត្យបានបិទ',
  'Close result review': 'បិទការត្រួតពិនិត្យលទ្ធផល',

  // Cross-patient review queue
  Amended: 'បានកែប្រែ',
  Returned: 'បានត្រឡប់',

  // Lab history browser: clinical signals
  'Needs review': 'ត្រូវការត្រួតពិនិត្យ',
  'Follow up due': 'ដល់ពេលតាមដាន',
  'Recently resolved': 'ទើបដោះស្រាយ',
  'Not in this draw': 'មិនមានក្នុងការយកសំណាកនេះ',
  'No structured reference': 'គ្មានជួរយោងជាទម្រង់',
  'Not repeated · last abnormal {date}': 'មិនបានធ្វើឡើងវិញ · មិនធម្មតាចុងក្រោយ {date}',
  'Resolved {date} · earlier result was outside range':
    'ដោះស្រាយ {date} · លទ្ធផលមុនហួសជួរ',
  'Not in this draw · last measured {date}':
    'មិនមានក្នុងការយកសំណាកនេះ · វាស់ចុងក្រោយ {date}',

  // Lab history browser: views and controls
  'Lab result history': 'ប្រវត្តិលទ្ធផលមន្ទីរពិសោធន៍',
  'Lab result view': 'ទិដ្ឋភាពលទ្ធផល',
  'Lab history table': 'តារាងប្រវត្តិមន្ទីរពិសោធន៍',
  Overview: 'ទិដ្ឋភាពរួម',
  Table: 'តារាង',
  '{count} results': 'លទ្ធផល {count}',
  '{count} flagged': '{count} បានដាក់សញ្ញា',
  'Search lab results': 'ស្វែងរកលទ្ធផលមន្ទីរពិសោធន៍',
  'Filter lab results': 'តម្រងលទ្ធផលមន្ទីរពិសោធន៍',
  'Expand all': 'ពង្រីកទាំងអស់',
  'Collapse all': 'បង្រួមទាំងអស់',
  'Showing {visible} of {total} primary analytes.':
    'កំពុងបង្ហាញ {visible} ក្នុងចំណោមធាតុវិភាគសំខាន់ {total}។',

  // Shared with lab-catalog — both files must keep the same rendering.
  'All tests': 'តេស្តទាំងអស់',
  Reference: 'ជួរយោង',
  '{count} test': 'តេស្ត {count}',
  '{count} tests': 'តេស្ត {count}',

  // Lab history browser: system state and empty states
  'Loading lab history': 'កំពុងផ្ទុកប្រវត្តិមន្ទីរពិសោធន៍',
  'Results will remain grouped by clinical system.':
    'លទ្ធផលនឹងនៅតែចាត់ជាក្រុមតាមប្រព័ន្ធរាងកាយ។',
  'Lab history could not be loaded': 'មិនអាចផ្ទុកប្រវត្តិមន្ទីរពិសោធន៍បានទេ',
  'No result is inferred from this failure.': 'កំហុសនេះមិនបញ្ជាក់លទ្ធផលណាមួយឡើយ។',
  'No lab results yet': 'មិនទាន់មានលទ្ធផលមន្ទីរពិសោធន៍',
  'Released results will appear here by clinical system.':
    'លទ្ធផលនឹងបង្ហាញនៅទីនេះតាមប្រព័ន្ធរាងកាយ។',
  'Offline — showing cached lab history':
    'ដាច់អ៊ីនធឺណិត — កំពុងបង្ហាញប្រវត្តិដែលរក្សាទុក',
  'Values may be stale. Refresh when the connection returns.':
    'តម្លៃអាចហួសសម័យ។ សូមផ្ទុកឡើងវិញនៅពេលមានអ៊ីនធឺណិត។',
  'Change the search or result filter.': 'សូមប្តូរការស្វែងរក ឬតម្រងលទ្ធផល។',
  'No flagged results in this view': 'គ្មានលទ្ធផលមានសញ្ញាក្នុងទិដ្ឋភាពនេះ',
  'Change the filter to review other lab history.':
    'សូមប្តូរតម្រង ដើម្បីមើលប្រវត្តិមន្ទីរពិសោធន៍ផ្សេង។',
};
