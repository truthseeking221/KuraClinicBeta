import type { KhmerDictionary } from '../types';

/**
 * Clinical Home: the start-of-shift briefing — greeting, licence lifecycle,
 * triage signals, and the first-use activation screen.
 */
export const HOME_KM: KhmerDictionary = {
  // Greeting and freshness
  'Good morning': 'អរុណសួស្តី',
  'Good afternoon': 'ទិវាសួស្តី',
  'Good evening': 'សាយណ្ហសួស្តី',
  'Last synced': 'ធ្វើសមកាលកម្មចុងក្រោយ',
  'Reconnect to make clinic changes.': 'ភ្ជាប់ឡើងវិញដើម្បីកែប្រែទិន្នន័យគ្លីនិក។',
  'Last updated': 'ធ្វើបច្ចុប្បន្នភាពចុងក្រោយ',

  // Page state
  'Home could not load': 'មិនអាចផ្ទុកទំព័រដើមបានទេ',
  'Counts and actions are hidden because their status is unknown.':
    'ចំនួន និងសកម្មភាពត្រូវបានលាក់ ព្រោះមិនដឹងស្ថានភាពរបស់វា។',
  Reload: 'ផ្ទុកឡើងវិញ',
  'Home unavailable': 'មិនអាចប្រើទំព័រដើមបានទេ',
  'Your role cannot open Home. No patient data was loaded.':
    'តួនាទីរបស់អ្នកមិនអាចបើកទំព័រដើមបានទេ។ គ្មានទិន្នន័យអ្នកជំងឺត្រូវបានផ្ទុកទេ។',
  'Choose a workspace': 'ជ្រើសរើសកន្លែងធ្វើការ',
  'Select a clinic workspace. No clinic data was loaded.':
    'ជ្រើសរើសកន្លែងធ្វើការគ្លីនិក។ គ្មានទិន្នន័យគ្លីនិកត្រូវបានផ្ទុកទេ។',
  'Choose workspace': 'ជ្រើសរើសកន្លែងធ្វើការ',
  'No patients': 'គ្មានអ្នកជំងឺ',
  'Add a patient to place orders.': 'បន្ថែមអ្នកជំងឺដើម្បីធ្វើការបញ្ជា។',
  'Add patient': 'បន្ថែមអ្នកជំងឺ',
  'Could not load.': 'មិនអាចផ្ទុកបានទេ។',
  'could not load.': 'មិនអាចផ្ទុកបានទេ។',
  'Results could not load.': 'មិនអាចផ្ទុកលទ្ធផលបានទេ។',
  'No results waiting.': 'គ្មានលទ្ធផលរង់ចាំទេ។',
  'No bookings need attention.': 'គ្មានការកក់ត្រូវការការយកចិត្តទុកដាក់ទេ។',
  'All on target.': 'ទាំងអស់ស្ថិតក្នុងគោលដៅ។',

  // Briefing sections
  'Priority work': 'ការងារអាទិភាព',
  'All caught up': 'រួចរាល់ទាំងអស់',
  'No work needs attention.': 'គ្មានការងារត្រូវការការយកចិត្តទុកដាក់ទេ។',
  'No work right now.': 'គ្មានការងារឥឡូវនេះទេ។',
  'Closed today': 'បានបញ្ចប់ថ្ងៃនេះ',
  Earned: 'ចំណូល',
  'work queue': 'ជួរការងារ',

  // Signal titles and their deep links
  Bookings: 'ការកក់',
  'Tube pickup': 'ការមកយកបំពង់',
  Earnings: 'ប្រាក់ចំណូល',
  'Review results': 'ពិនិត្យលទ្ធផល',
  'Review critical result': 'ពិនិត្យលទ្ធផលគ្រោះថ្នាក់',
  'Review bookings': 'ពិនិត្យការកក់',
  'Review patients': 'ពិនិត្យអ្នកជំងឺ',
  'View orders': 'មើលការបញ្ជា',
  'Open earnings': 'បើកចំណូល',
  'Needs review': 'ត្រូវការត្រួតពិនិត្យ',
  Missed: 'ខកខាន',

  // Results preview
  'Results to review': 'លទ្ធផលត្រូវពិនិត្យ',
  'Loading results to review': 'កំពុងផ្ទុកលទ្ធផលត្រូវពិនិត្យ',
  'Patients with results to review': 'អ្នកជំងឺដែលមានលទ្ធផលត្រូវពិនិត្យ',
  'Patient result details could not load.': 'មិនអាចផ្ទុកព័ត៌មានលទ្ធផលអ្នកជំងឺបានទេ។',
  'Patient details are unavailable.': 'ព័ត៌មានអ្នកជំងឺមិនអាចប្រើបានទេ។',
  'to continue.': 'ដើម្បីបន្ត។',
  'View all results': 'មើលលទ្ធផលទាំងអស់',

  // Licence banner
  'Verify medical licence': 'ផ្ទៀងផ្ទាត់អាជ្ញាបណ្ណវេជ្ជសាស្ត្រ',
  'Place orders under your own attribution.': 'ធ្វើការបញ្ជាក្រោមឈ្មោះរបស់អ្នកផ្ទាល់។',
  Verify: 'ផ្ទៀងផ្ទាត់',
  'Licence verification pending': 'កំពុងរង់ចាំការផ្ទៀងផ្ទាត់អាជ្ញាបណ្ណ',
  'Place orders under your own attribution once verified.':
    'ធ្វើការបញ្ជាក្រោមឈ្មោះរបស់អ្នកផ្ទាល់ បន្ទាប់ពីផ្ទៀងផ្ទាត់រួច។',
  'View submission': 'មើលឯកសារដែលបានដាក់ស្នើ',
  'Licence rejected': 'អាជ្ញាបណ្ណត្រូវបានបដិសេធ',
  'Review the reason, then upload a corrected document.':
    'ពិនិត្យមូលហេតុ រួចផ្ទុកឡើងឯកសារដែលបានកែតម្រូវ។',
  'Update licence': 'ធ្វើបច្ចុប្បន្នភាពអាជ្ញាបណ្ណ',
  'Your licence expires on': 'អាជ្ញាបណ្ណរបស់អ្នកផុតកំណត់នៅ',
  'Your licence is expiring': 'អាជ្ញាបណ្ណរបស់អ្នកជិតផុតកំណត់',
  'Renew to keep placing orders under your own attribution.':
    'បន្តអាជ្ញាបណ្ណដើម្បីបន្តធ្វើការបញ្ជាក្រោមឈ្មោះរបស់អ្នកផ្ទាល់។',
  Renew: 'បន្តអាជ្ញាបណ្ណ',
  'Licence lapsed. Grace ends': 'អាជ្ញាបណ្ណផុតកំណត់។ រយៈពេលអនុគ្រោះបញ្ចប់នៅ',
  'Licence lapsed. Grace period active': 'អាជ្ញាបណ្ណផុតកំណត់។ កំពុងក្នុងរយៈពេលអនុគ្រោះ',
  'Licence inactive': 'អាជ្ញាបណ្ណអសកម្ម',
  'You cannot place orders under your own attribution until you renew.':
    'អ្នកមិនអាចធ្វើការបញ្ជាក្រោមឈ្មោះរបស់អ្នកផ្ទាល់បានទេ រហូតដល់អ្នកបន្តអាជ្ញាបណ្ណ។',
  'Renew licence': 'បន្តសុពលភាពអាជ្ញាបណ្ណ',

  // First use
  'Welcome to Kura': 'សូមស្វាគមន៍មកកាន់ Kura',
  'Let’s create your first patient booking.': 'តោះបង្កើតការកក់អ្នកជំងឺដំបូងរបស់អ្នក។',
  'Create first booking': 'បង្កើតការកក់ដំបូង',
  'You can book before your licence is verified.':
    'អ្នកអាចកក់មុនពេលអាជ្ញាបណ្ណរបស់អ្នកត្រូវបានផ្ទៀងផ្ទាត់។',
  'Explore a demo patient': 'សាកល្បងជាមួយអ្នកជំងឺគំរូ',
  Follow: 'តាមដាន',
  'from booking to results. This demo will not affect your records.':
    'ពីការកក់រហូតដល់លទ្ធផល។ ការសាកល្បងនេះមិនប៉ះពាល់ដល់កំណត់ត្រារបស់អ្នកទេ។',
  'Open demo patient': 'បើកអ្នកជំងឺគំរូ',
  'Medical licence': 'អាជ្ញាបណ្ណវេជ្ជសាស្ត្រ',
  'Start verification': 'ចាប់ផ្តើមការផ្ទៀងផ្ទាត់',
  'Once verified, you can collect cash, issue legal documents, submit claims and appear in the doctor directory.':
    'បន្ទាប់ពីផ្ទៀងផ្ទាត់រួច អ្នកអាចទទួលសាច់ប្រាក់ ចេញឯកសារផ្លូវច្បាប់ ដាក់ស្នើការទាមទារ និងបង្ហាញក្នុងបញ្ជីវេជ្ជបណ្ឌិត។',
  'Not started': 'មិនទាន់ចាប់ផ្តើម',
  'Your documents are being reviewed. We will notify you when a decision is ready.':
    'ឯកសាររបស់អ្នកកំពុងត្រូវបានពិនិត្យ។ យើងនឹងជូនដំណឹងនៅពេលមានការសម្រេច។',
  'Under review': 'កំពុងត្រួតពិនិត្យ',
  'Update verification': 'ធ្វើបច្ចុប្បន្នភាពការផ្ទៀងផ្ទាត់',
  'Review the decision and replace the document that could not be verified.':
    'ពិនិត្យការសម្រេច រួចជំនួសឯកសារដែលមិនអាចផ្ទៀងផ្ទាត់បាន។',
  'Needs update': 'ត្រូវការធ្វើបច្ចុប្បន្នភាព',
  'Your licence is active for clinical attribution and verified capabilities.':
    'អាជ្ញាបណ្ណរបស់អ្នកសកម្មសម្រាប់ការបញ្ជាក់ឈ្មោះព្យាបាល និងសមត្ថភាពដែលបានផ្ទៀងផ្ទាត់។',
  Verified: 'បានផ្ទៀងផ្ទាត់',
  'Renew your licence before it expires to keep verified capabilities available.':
    'បន្តអាជ្ញាបណ្ណមុនពេលផុតកំណត់ ដើម្បីរក្សាសមត្ថភាពដែលបានផ្ទៀងផ្ទាត់។',
  Expiring: 'ជិតផុតកំណត់',
  'Renew your licence during the grace period to avoid losing verified capabilities.':
    'បន្តអាជ្ញាបណ្ណក្នុងរយៈពេលអនុគ្រោះ ដើម្បីកុំឱ្យបាត់បង់សមត្ថភាពដែលបានផ្ទៀងផ្ទាត់។',
  'Renewal due': 'ដល់ពេលបន្តសុពលភាព',
  'Your licence is inactive. Renew it to restore verified capabilities.':
    'អាជ្ញាបណ្ណរបស់អ្នកអសកម្ម។ បន្តវាដើម្បីស្តារសមត្ថភាពដែលបានផ្ទៀងផ្ទាត់ឡើងវិញ។',
};
