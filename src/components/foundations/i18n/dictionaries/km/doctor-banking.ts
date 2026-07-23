import type { KhmerDictionary } from '../types';

/**
 * Doctor-owned Balance: earnings, what is owed, settlement, statements, and the
 * optional ABA auto-pay authorization.
 *
 * Money rules for this area:
 * - Currency codes, amounts, account numbers, and bank names stay Latin.
 * - Provider and scheme names (KHQR, ABA, ABA Mobile, PIN, token) stay Latin so
 *   what the doctor reads matches what the bank app shows.
 * - Terms whose Khmer rendering would blur what is owed or when money moves are
 *   deliberately absent, so the English source renders. `Credit floor`,
 *   `Ordering floor`, and `Exposure` are the named cases: each has an exact
 *   financial meaning that a plain Khmer paraphrase would widen.
 */
export const DOCTOR_BANKING_KM: KhmerDictionary = {
  // Page and section identity.
  // `Balance` is also written by `shell` and `home`; this file follows that
  // rendering so one English string keeps one Khmer rendering.
  Balance: 'សមតុល្យ',
  'Activity & statements': 'សកម្មភាព និងរបាយការណ៍',
  'Settle now': 'ទូទាត់ឥឡូវនេះ',
  'Auto-pay': 'ការទូទាត់ស្វ័យប្រវត្តិ',
  'In progress': 'កំពុងដំណើរការ',
  'What happens next': 'អ្វីនឹងកើតឡើងបន្ទាប់',
  'Notices and receipts': 'ការជូនដំណឹង និងបង្កាន់ដៃ',
  'What Kura stores': 'អ្វីដែល Kura រក្សាទុក',
  'Back to Balance': 'ត្រឡប់ទៅសមតុល្យ',

  // Earnings hero
  'Earned in': 'ប្រាក់ចំណូលក្នុងខែ',
  'Your settled share from completed orders across all Kura workspaces.':
    'ចំណែករបស់អ្នកដែលបានទូទាត់រួច ពីការបញ្ជាដែលបានបញ្ចប់ នៅគ្រប់កន្លែងធ្វើការ Kura។',
  'Earned this month': 'ប្រាក់ចំណូលខែនេះ',

  // Signed balance
  'You owe Kura': 'អ្នកជំពាក់ Kura',
  'Kura owes you': 'Kura ជំពាក់អ្នក',
  "You're settled": 'អ្នកបានទូទាត់គ្រប់ចំនួន',
  'Amount unavailable': 'ចំនួនទឹកប្រាក់មិនអាចបង្ហាញបាន',
  'Doctor owes Kura': 'វេជ្ជបណ្ឌិតជំពាក់ Kura',
  'Kura owes doctor': 'Kura ជំពាក់វេជ្ជបណ្ឌិត',
  'Settled balance': 'សមតុល្យបានទូទាត់',
  'This credit offsets future charges. Cash payout is not available yet.':
    'ឥណទាននេះនឹងកាត់ចេញពីការគិតថ្លៃនាពេលអនាគត។ ការដកជាសាច់ប្រាក់មិនទាន់មានទេ។',
  'Neither you nor Kura owes anything.': 'ទាំងអ្នក ទាំង Kura គ្មានអ្វីជំពាក់គ្នាទេ។',
  'We could not verify this amount, so no payment action is offered.':
    'យើងមិនអាចផ្ទៀងផ្ទាត់ចំនួននេះបានទេ ដូច្នេះគ្មានសកម្មភាពទូទាត់ត្រូវបានផ្តល់ជូនឡើយ។',

  // In progress
  'Nothing in progress.': 'គ្មានអ្វីកំពុងដំណើរការទេ។',
  'Pending earnings': 'ប្រាក់ចំណូលកំពុងរង់ចាំ',
  'Pending charges': 'ការគិតថ្លៃកំពុងរង់ចាំ',
  'Reserved for draft orders': 'បម្រុងទុកសម្រាប់ការបញ្ជាព្រាង',
  'Projected balance if everything completes': 'សមតុល្យប៉ាន់ស្មាន បើអ្វីៗទាំងអស់បញ្ចប់',
  'You have reached your ordering floor. Settle your balance to send new orders.':
    'អ្នកបានឈានដល់ ordering floor របស់អ្នកហើយ។ សូមទូទាត់សមតុល្យ ដើម្បីផ្ញើការបញ្ជាថ្មី។',

  // What happens next
  'The balance could not be verified, so no collection is scheduled from this screen.':
    'មិនអាចផ្ទៀងផ្ទាត់សមតុល្យបានទេ ដូច្នេះគ្មានការប្រមូលត្រូវបានកំណត់ពីអេក្រង់នេះឡើយ។',
  'No collection is scheduled.': 'គ្មានការប្រមូលត្រូវបានកំណត់ទេ។',
  'No collection is scheduled. Your credit offsets future charges.':
    'គ្មានការប្រមូលត្រូវបានកំណត់ទេ។ ឥណទានរបស់អ្នកនឹងកាត់ចេញពីការគិតថ្លៃនាពេលអនាគត។',
  'Kura will collect up to': 'Kura នឹងប្រមូលមិនលើសពី',
  on: 'នៅថ្ងៃ',
  'You get a notice before it happens.': 'អ្នកនឹងទទួលការជូនដំណឹងមុនពេលវាកើតឡើង។',
  'Notice sent': 'បានផ្ញើការជូនដំណឹង',
  'down from': 'ធ្លាក់ពី',
  'after your payment.': 'បន្ទាប់ពីការទូទាត់របស់អ្នក។',
  'Nothing left to collect': 'គ្មានអ្វីត្រូវប្រមូលទៀតទេ',
  'Nothing remains for the': 'គ្មានអ្វីនៅសល់សម្រាប់ការប្រមូល',
  'collection.': 'ទេ។',
  'Collection failed': 'ការប្រមូលមិនជោគជ័យ',
  'Kura retries on': 'Kura នឹងព្យាយាមឡើងវិញនៅថ្ងៃ',
  'Kura retries on the next eligible day': 'Kura នឹងព្យាយាមឡើងវិញនៅថ្ងៃបន្ទាប់ដែលអាចធ្វើបាន',
  attempt: 'ការព្យាយាមទី',
  'of 3': 'ក្នុងចំណោម 3',
  'Paying now stops the retry.': 'ការទូទាត់ឥឡូវនេះនឹងបញ្ឈប់ការព្យាយាមឡើងវិញ។',
  'Retry window closed': 'អំឡុងពេលព្យាយាមឡើងវិញបានបិទ',
  'Kura cannot retry this collection. Settle': 'Kura មិនអាចព្យាយាមប្រមូលឡើងវិញបានទេ។ សូមទូទាត់',
  'by KHQR.': 'តាម KHQR។',
  'No retries left': 'គ្មានការព្យាយាមឡើងវិញនៅសល់ទេ',
  'Kura will wait until the next sweep on': 'Kura នឹងរង់ចាំដល់ការប្រមូលបន្ទាប់នៅថ្ងៃ',
  'Kura will wait until the next sweep.': 'Kura នឹងរង់ចាំដល់ការប្រមូលបន្ទាប់។',
  'You can settle now instead.': 'អ្នកអាចទូទាត់ឥឡូវនេះជំនួសវិញបាន។',
  'Kura cannot collect automatically. Settle':
    'Kura មិនអាចប្រមូលដោយស្វ័យប្រវត្តិបានទេ។ សូមទូទាត់',

  // Auto-pay summary
  'Manage auto-pay': 'គ្រប់គ្រងការទូទាត់ស្វ័យប្រវត្តិ',
  Status: 'ស្ថានភាព',
  Account: 'គណនី',
  Expires: 'ផុតកំណត់',

  // View states
  'Loading your balance': 'កំពុងផ្ទុកសមតុល្យរបស់អ្នក',
  'This balance is not yours to view': 'សមតុល្យនេះមិនមែនជារបស់អ្នកសម្រាប់មើលទេ',
  'The ledger belongs to the doctor, not the workspace. Delegated users cannot see balances, debt, ABA details, or payment codes.':
    'បញ្ជីគណនីនេះជាកម្មសិទ្ធិរបស់វេជ្ជបណ្ឌិត មិនមែនរបស់កន្លែងធ្វើការទេ។ អ្នកប្រើដែលបានប្រគល់សិទ្ធិ មិនអាចមើលសមតុល្យ បំណុល ព័ត៌មាន ABA ឬលេខកូដទូទាត់បានទេ។',
  'Your balance opens with a verified licence':
    'សមតុល្យរបស់អ្នកនឹងបើក នៅពេលអាជ្ញាបណ្ណត្រូវបានផ្ទៀងផ្ទាត់',
  'Your balance follows you, not your workspace. Verify your medical licence to start earning.':
    'សមតុល្យរបស់អ្នកតាមអ្នក មិនមែនតាមកន្លែងធ្វើការទេ។ សូមផ្ទៀងផ្ទាត់អាជ្ញាបណ្ណវេជ្ជសាស្ត្ររបស់អ្នក ដើម្បីចាប់ផ្តើមរកចំណូល។',
  'Manage licence': 'គ្រប់គ្រងអាជ្ញាបណ្ណ',
  'Balance unavailable': 'សមតុល្យមិនអាចបង្ហាញបាន',
  'Current amounts could not be verified. No balance or payment action is shown.':
    'មិនអាចផ្ទៀងផ្ទាត់ចំនួនទឹកប្រាក់បច្ចុប្បន្នបានទេ។ គ្មានសមតុល្យ ឬសកម្មភាពទូទាត់ត្រូវបានបង្ហាញឡើយ។',
  'Your medical licence has lapsed': 'អាជ្ញាបណ្ណវេជ្ជសាស្ត្ររបស់អ្នកបានផុតកំណត់',
  'You can still see your balance, settle what you owe, and unlink ABA. New orders and new ABA links are blocked until the licence is verified.':
    'អ្នកនៅតែអាចមើលសមតុល្យ ទូទាត់អ្វីដែលអ្នកជំពាក់ និងផ្តាច់ ABA បាន។ ការបញ្ជាថ្មី និងការភ្ជាប់ ABA ថ្មី ត្រូវបានរារាំង រហូតដល់អាជ្ញាបណ្ណត្រូវបានផ្ទៀងផ្ទាត់។',
  'You cannot link a new account right now': 'អ្នកមិនអាចភ្ជាប់គណនីថ្មីនៅពេលនេះបានទេ',
  'Your medical licence has lapsed. Settling by KHQR still works.':
    'អាជ្ញាបណ្ណវេជ្ជសាស្ត្ររបស់អ្នកបានផុតកំណត់។ ការទូទាត់តាម KHQR នៅតែដំណើរការ។',

  // Activity ledger
  Activity: 'សកម្មភាព',
  'Recent activity': 'សកម្មភាពថ្មីៗ',
  'Every balance movement across your Kura workspaces. Entries are never edited.':
    'រាល់ចលនាសមតុល្យនៅគ្រប់កន្លែងធ្វើការ Kura របស់អ្នក។ កំណត់ត្រាមិនត្រូវបានកែប្រែឡើយ។',
  'When (ICT)': 'ពេលវេលា (ICT)',
  State: 'ស្ថានភាព',
  Amount: 'ចំនួនទឹកប្រាក់',
  Settled: 'បានទូទាត់',
  Pending: 'កំពុងរង់ចាំ',
  Voided: 'បានលុបចោល',
  'Activity type': 'ប្រភេទសកម្មភាព',
  'Reserved for an order': 'បម្រុងទុកសម្រាប់ការបញ្ជា',
  'Earnings in progress': 'ប្រាក់ចំណូលកំពុងដំណើរការ',
  'Reserved amount corrected': 'ចំនួនបម្រុងត្រូវបានកែតម្រូវ',
  'Reservation released': 'ការបម្រុងត្រូវបានដោះលែង',
  'Laboratory cost': 'ថ្លៃមន្ទីរពិសោធន៍',
  'Doctor share': 'ចំណែកវេជ្ជបណ្ឌិត',
  'Cash collected at the clinic': 'សាច់ប្រាក់បានប្រមូលនៅគ្លីនិក',
  'KHQR payment': 'ការទូទាត់ KHQR',
  'ABA collection': 'ការប្រមូលតាម ABA',
  'First-link credit': 'ការបញ្ចូលប្រាក់ពេលភ្ជាប់លើកដំបូង',
  'Correction by Kura': 'ការកែតម្រូវដោយ Kura',
  'Search activity': 'ស្វែងរកសកម្មភាព',
  'Activity per page': 'សកម្មភាពក្នុងមួយទំព័រ',
  'Balance activity': 'សកម្មភាពសមតុល្យ',
  'Loading activity': 'កំពុងផ្ទុកសកម្មភាព',
  Dates: 'កាលបរិច្ឆេទ',
  From: 'ពី',
  To: 'ដល់',
  'Clear dates': 'សម្អាតកាលបរិច្ឆេទ',
  'No activity yet': 'មិនទាន់មានសកម្មភាព',
  'No matching activity': 'គ្មានសកម្មភាពត្រូវគ្នា',
  'Balance movements appear here as orders complete and payments settle.':
    'ចលនាសមតុល្យនឹងបង្ហាញនៅទីនេះ នៅពេលការបញ្ជាបញ្ចប់ និងការទូទាត់ត្រូវបានបញ្ចប់។',
  'Change the search, filters, or date range to see more ledger activity.':
    'ផ្លាស់ប្តូរការស្វែងរក តម្រង ឬចន្លោះកាលបរិច្ឆេទ ដើម្បីមើលសកម្មភាពបន្ថែម។',
  'Activity unavailable': 'សកម្មភាពមិនអាចបង្ហាញបាន',
  'Your current access cannot open this doctor-owned ledger.':
    'សិទ្ធិចូលប្រើបច្ចុប្បន្នរបស់អ្នក មិនអាចបើកបញ្ជីគណនីរបស់វេជ្ជបណ្ឌិតនេះបានទេ។',
  'The ledger could not be loaded. No activity has been inferred.':
    'មិនអាចផ្ទុកបញ្ជីគណនីបានទេ។ គ្មានសកម្មភាពត្រូវបានប៉ាន់ស្មានឡើយ។',

  // Statements
  'Downloads cover the': 'ការទាញយករួមបញ្ចូល',
  'filtered activities shown.': 'សកម្មភាពដែលបានត្រង ដូចបង្ហាញខាងក្រោម។',
  'Date range is backwards': 'ចន្លោះកាលបរិច្ឆេទបញ្ច្រាស',
  'The From date is after the To date, so no statement can be produced.':
    'កាលបរិច្ឆេទ ពី នៅក្រោយកាលបរិច្ឆេទ ដល់ ដូច្នេះមិនអាចបង្កើតរបាយការណ៍បានទេ។',
  'Statement download failed': 'ការទាញយករបាយការណ៍មិនជោគជ័យ',
  'No file was saved. Check the date range and try again.':
    'គ្មានឯកសារត្រូវបានរក្សាទុកទេ។ សូមពិនិត្យចន្លោះកាលបរិច្ឆេទ ហើយព្យាយាមម្តងទៀត។',
  'Statement ready': 'របាយការណ៍រួចរាល់',
  'The download covers exactly the activity shown below.':
    'ការទាញយករួមបញ្ចូលត្រឹមតែសកម្មភាពដែលបង្ហាញខាងក្រោមប៉ុណ្ណោះ។',

  // Notices and receipts
  'Only notices and receipts addressed to you appear here.':
    'មានតែការជូនដំណឹង និងបង្កាន់ដៃដែលផ្ញើមកអ្នកប៉ុណ្ណោះ ដែលបង្ហាញនៅទីនេះ។',
  'No notices or receipts yet.': 'មិនទាន់មានការជូនដំណឹង ឬបង្កាន់ដៃទេ។',
  'Collection notice for': 'ការជូនដំណឹងប្រមូលប្រាក់សម្រាប់',
  'Not sent yet': 'មិនទាន់ផ្ញើ',
  Sent: 'បានផ្ញើ',
  'Partly collected': 'បានប្រមូលមួយផ្នែក',
  'Fully collected': 'បានប្រមូលពេញ',
  'Expired uncollected': 'ផុតកំណត់ដោយមិនបានប្រមូល',
  'Your payment lowered the amount Kura will collect.':
    'ការទូទាត់របស់អ្នកបានបន្ថយចំនួនដែល Kura នឹងប្រមូល។',
  Noticed: 'បានជូនដំណឹង',
  'Payment received': 'បានទទួលការទូទាត់',
  'Balance after': 'សមតុល្យបន្ទាប់ពី',
  Source: 'ប្រភព',
  Receipt: 'បង្កាន់ដៃ',
  'Scheduled collection': 'ការប្រមូលតាមកាលវិភាគ',
  'Collection retry': 'ការប្រមូលឡើងវិញ',
  'Collection retry by Kura': 'ការប្រមូលឡើងវិញដោយ Kura',
  'Collection while ordering': 'ការប្រមូលពេលធ្វើការបញ្ជា',
  'Final collection before unlink': 'ការប្រមូលចុងក្រោយមុនពេលផ្តាច់',
  'Collection attempt failed': 'ការប្រមូលមិនជោគជ័យ',
  'Retry scheduled': 'បានកំណត់ការព្យាយាមឡើងវិញ',
  'Cannot be retried': 'មិនអាចព្យាយាមឡើងវិញបានទេ',
  Attempt: 'ការព្យាយាម',
  'First attempt': 'ការព្យាយាមលើកដំបូង',
  'We will retry on': 'យើងនឹងព្យាយាមឡើងវិញនៅថ្ងៃ',
  'We will retry on the next eligible day':
    'យើងនឹងព្យាយាមឡើងវិញនៅថ្ងៃបន្ទាប់ដែលអាចធ្វើបាន',
  'Settle with KHQR': 'ទូទាត់តាម KHQR',
  'Link ABA again to restore scheduled collections':
    'ភ្ជាប់ ABA ម្តងទៀត ដើម្បីស្តារការប្រមូលតាមកាលវិភាគ',
  'We will wait until the next sweep': 'យើងនឹងរង់ចាំដល់ការប្រមូលបន្ទាប់',
  'ABA authorization linked': 'ការអនុញ្ញាត ABA ត្រូវបានភ្ជាប់',
  'ABA authorization needs renewal': 'ការអនុញ្ញាត ABA ត្រូវការបន្តសុពលភាព',
  'ABA authorization expired': 'ការអនុញ្ញាត ABA ផុតកំណត់',
  'ABA authorization unlinked': 'ការអនុញ្ញាត ABA ត្រូវបានផ្តាច់',
  'Balance still owed': 'សមតុល្យដែលនៅជំពាក់',
  'Ledger adjustment recorded': 'បានកត់ត្រាការកែតម្រូវបញ្ជីគណនី',
  'Ledger entry': 'កំណត់ត្រាបញ្ជីគណនី',
  'In-app': 'ក្នុងកម្មវិធី',
  Email: 'អ៊ីមែល',
  delivered: 'បានផ្ញើដល់',
  sending: 'កំពុងផ្ញើ',
  failed: 'មិនជោគជ័យ',

  // KHQR settlement
  'Pay the exact amount you owe from any KHQR bank app. The amount cannot be edited.':
    'បង់ចំនួនទឹកប្រាក់ដែលអ្នកជំពាក់ឲ្យត្រូវពិតប្រាកដ ពីកម្មវិធីធនាគារណាមួយដែលប្រើ KHQR បាន។ ចំនួននេះមិនអាចកែបានទេ។',
  'The balance cannot be displayed safely, so no KHQR code was created.':
    'សមតុល្យមិនអាចបង្ហាញដោយសុវត្ថិភាពបានទេ ដូច្នេះគ្មានលេខកូដ KHQR ត្រូវបានបង្កើតឡើយ។',
  'Nothing to settle': 'គ្មានអ្វីត្រូវទូទាត់',
  'You do not owe Kura anything, so no payment is needed.':
    'អ្នកគ្មានអ្វីជំពាក់ Kura ទេ ដូច្នេះមិនចាំបាច់ទូទាត់ឡើយ។',
  'Create your payment code': 'បង្កើតលេខកូដទូទាត់របស់អ្នក',
  'The code requests exactly': 'លេខកូដនេះស្នើសុំចំនួនត្រឹមតែ',
  'It cannot be edited or reused after it expires.':
    'វាមិនអាចកែសម្រួល ឬប្រើឡើងវិញបានទេ បន្ទាប់ពីផុតកំណត់។',
  'Create payment code': 'បង្កើតលេខកូដទូទាត់',
  'Payment code expired': 'លេខកូដទូទាត់ផុតកំណត់',
  'No payment was confirmed. Create a new code for the same verified amount.':
    'គ្មានការទូទាត់ត្រូវបានបញ្ជាក់ទេ។ សូមបង្កើតលេខកូដថ្មីសម្រាប់ចំនួនដដែលដែលបានផ្ទៀងផ្ទាត់។',
  'Create a new code': 'បង្កើតលេខកូដថ្មី',
  'Payment confirmed': 'ការទូទាត់បានបញ្ជាក់',
  'The provider confirmed this payment and it is already on your ledger.':
    'អ្នកផ្តល់សេវាបានបញ្ជាក់ការទូទាត់នេះ ហើយវាមាននៅក្នុងបញ្ជីគណនីរបស់អ្នករួចហើយ។',
  'You paid more than you owed. The extra amount is now credit on your balance.':
    'អ្នកបានបង់លើសពីអ្វីដែលអ្នកជំពាក់។ ចំនួនលើសនោះឥឡូវក្លាយជាឥណទាននៅលើសមតុល្យរបស់អ្នក។',
  'Amount received': 'ចំនួនទឹកប្រាក់ដែលបានទទួល',
  'Balance after payment': 'សមតុល្យបន្ទាប់ពីការទូទាត់',
  'A matching entry is now in Activity & statements.':
    'កំណត់ត្រាដែលត្រូវគ្នាមាននៅក្នុង សកម្មភាព និងរបាយការណ៍ ហើយ។',
  'KHQR payment code': 'លេខកូដទូទាត់ KHQR',
  'Waiting for your bank': 'កំពុងរង់ចាំធនាគាររបស់អ្នក',
  'Pay the exact amount': 'បង់ចំនួនទឹកប្រាក់ពិតប្រាកដ',
  'Pay the order shortfall': 'បង់ចំនួនខ្វះសម្រាប់ការបញ្ជា',
  'Scan with any KHQR bank app. Kura waits for the provider to confirm.':
    'ស្កេនដោយកម្មវិធីធនាគារណាមួយដែលប្រើ KHQR បាន។ Kura នឹងរង់ចាំការបញ្ជាក់ពីអ្នកផ្តល់សេវា។',
  'Check for payment': 'ពិនិត្យការទូទាត់',

  // Order funding gate
  'Converting an intake never checks your balance. This step always continues.':
    'ការបំប្លែងព័ត៌មានអ្នកជំងឺ មិនពិនិត្យសមតុល្យរបស់អ្នកឡើយ។ ជំហាននេះតែងតែបន្ត។',
  'Ordering is available.': 'អ្នកអាចធ្វើការបញ្ជាបាន។',
  'remains before your ordering floor.': 'នៅសល់មុនដល់ ordering floor របស់អ្នក។',
  'Settle your balance to send this order': 'ទូទាត់សមតុល្យរបស់អ្នក ដើម្បីផ្ញើការបញ្ជានេះ',
  'Kura could not collect from your ABA account just now.':
    'Kura មិនអាចប្រមូលពីគណនី ABA របស់អ្នកនៅពេលនេះបានទេ។',
  'Auto-pay is not available on your account right now.':
    'ការទូទាត់ស្វ័យប្រវត្តិមិនអាចប្រើបាននៅលើគណនីរបស់អ្នកនៅពេលនេះទេ។',
  Pay: 'បង់',
  'by KHQR and this order continues.': 'តាម KHQR រួចការបញ្ជានេះនឹងបន្ត។',
  'This order would pass your ordering floor':
    'ការបញ្ជានេះនឹងលើសពី ordering floor របស់អ្នក',
  'Your floor is': 'Ordering floor របស់អ្នកគឺ',
  'to cover the shortfall, then send the order.':
    'ដើម្បីបំពេញចំនួនខ្វះ រួចផ្ញើការបញ្ជា។',
  'Pay the shortfall': 'បង់ចំនួនខ្វះ',
  'Collecting from ABA': 'កំពុងប្រមូលពី ABA',
  'Waiting for ABA to confirm': 'កំពុងរង់ចាំ ABA បញ្ជាក់',
  'Do not leave this page.': 'សូមកុំចាកចេញពីទំព័រនេះ។',
  'Collected. Your order can continue.': 'បានប្រមូលរួច។ ការបញ្ជារបស់អ្នកអាចបន្តបាន។',
  'was collected from ABA. Balance now': 'ត្រូវបានប្រមូលពី ABA។ សមតុល្យឥឡូវនេះ',
  'You cannot prescribe right now': 'អ្នកមិនអាចចេញវេជ្ជបញ្ជានៅពេលនេះបានទេ',
  'This is not a balance problem, so paying will not unblock it.':
    'នេះមិនមែនជាបញ្ហាសមតុល្យទេ ដូច្នេះការទូទាត់នឹងមិនដោះស្រាយវាឡើយ។',

  // ABA authorization (mandate)
  'ABA authorization': 'ការអនុញ្ញាត ABA',
  'Auto-pay is optional. KHQR always works, with or without it.':
    'ការទូទាត់ស្វ័យប្រវត្តិជាជម្រើស។ KHQR ដំណើរការជានិច្ច ទោះមានឬគ្មានវាក៏ដោយ។',
  'Not linked': 'មិនបានភ្ជាប់',
  'KHQR already works. Link ABA only if you want Kura to collect for you.':
    'KHQR ដំណើរការរួចហើយ។ ភ្ជាប់ ABA តែក្នុងករណីអ្នកចង់ឲ្យ Kura ប្រមូលជំនួសអ្នកប៉ុណ្ណោះ។',
  'Waiting for ABA': 'កំពុងរង់ចាំ ABA',
  'Nothing is authorized until ABA confirms it.':
    'គ្មានអ្វីត្រូវបានអនុញ្ញាតទេ រហូតដល់ ABA បញ្ជាក់។',
  'Auto-pay active': 'ការទូទាត់ស្វ័យប្រវត្តិសកម្ម',
  'Kura collects what you owe after sending you a notice.':
    'Kura ប្រមូលអ្វីដែលអ្នកជំពាក់ បន្ទាប់ពីផ្ញើការជូនដំណឹងទៅអ្នក។',
  'Renewal required': 'ត្រូវការបន្តសុពលភាព',
  'Renew before the next scheduled collection, or Kura cannot collect.':
    'សូមបន្តសុពលភាពមុនការប្រមូលតាមកាលវិភាគបន្ទាប់ បើមិនដូច្នេះ Kura មិនអាចប្រមូលបានទេ។',
  'Authorization expired': 'ការអនុញ្ញាតផុតកំណត់',
  'Kura cannot collect. KHQR still works.':
    'Kura មិនអាចប្រមូលបានទេ។ KHQR នៅតែដំណើរការ។',
  'Collection frozen': 'ការប្រមូលត្រូវបានផ្អាក',
  'Kura has paused collections while your account state is reviewed.':
    'Kura បានផ្អាកការប្រមូល ខណៈកំពុងពិនិត្យស្ថានភាពគណនីរបស់អ្នក។',
  'Authorization deleted': 'ការអនុញ្ញាតត្រូវបានលុប',
  'This authorization cannot be used or restored from this screen.':
    'ការអនុញ្ញាតនេះមិនអាចប្រើ ឬស្តារឡើងវិញពីអេក្រង់នេះបានទេ។',
  'No collection can run while this state is active. Unlinking still works.':
    'គ្មានការប្រមូលអាចដំណើរការបានទេ ខណៈស្ថានភាពនេះនៅសកម្ម។ ការផ្តាច់នៅតែធ្វើបាន។',
  'Contact Kura support if you need to link another eligible account.':
    'ទាក់ទងផ្នែកជំនួយ Kura ប្រសិនបើអ្នកត្រូវការភ្ជាប់គណនីមួយផ្សេងទៀត។',

  // Linking and unlinking
  'Link ABA': 'ភ្ជាប់ ABA',
  'Link ABA again': 'ភ្ជាប់ ABA ម្តងទៀត',
  'Renew authorization': 'បន្តសុពលភាពការអនុញ្ញាត',
  'View link session': 'មើលសម័យភ្ជាប់',
  'Unlink ABA': 'ផ្តាច់ ABA',
  'Unlink this ABA authorization?': 'ផ្តាច់ការអនុញ្ញាត ABA នេះមែនទេ?',
  'Scheduled collections stop. You can settle by KHQR at any time and link again later.':
    'ការប្រមូលតាមកាលវិភាគនឹងឈប់។ អ្នកអាចទូទាត់តាម KHQR គ្រប់ពេល ហើយភ្ជាប់ឡើងវិញនៅពេលក្រោយបាន។',
  'Kura tries one final collection, then stops. You still owe':
    'Kura នឹងព្យាយាមប្រមូលចុងក្រោយម្តង រួចឈប់។ អ្នកនៅតែជំពាក់',
  'and can settle it by KHQR. Unlinking always completes, even if that collection fails.':
    'ហើយអាចទូទាត់តាម KHQR បាន។ ការផ្តាច់តែងតែបញ្ចប់ ទោះការប្រមូលនោះមិនជោគជ័យក៏ដោយ។',
  'Keep authorization': 'រក្សាការអនុញ្ញាត',
  'Link ABA securely': 'ភ្ជាប់ ABA ដោយសុវត្ថិភាព',
  'Kura stores a payment token and masked account only. The link succeeds only after ABA confirms it.':
    'Kura រក្សាទុកតែ token ទូទាត់ និងលេខគណនីដែលបានបិទបាំងប៉ុណ្ណោះ។ ការភ្ជាប់ជោគជ័យលុះត្រាតែ ABA បញ្ជាក់។',
  'Starting secure ABA link': 'កំពុងចាប់ផ្តើមការភ្ជាប់ ABA ដោយសុវត្ថិភាព',
  'Waiting for a provider link session. Nothing is authorized yet.':
    'កំពុងរង់ចាំសម័យភ្ជាប់ពីអ្នកផ្តល់សេវា។ មិនទាន់មានអ្វីត្រូវបានអនុញ្ញាតនៅឡើយទេ។',
  'Link session expired': 'សម័យភ្ជាប់ផុតកំណត់',
  'Create a new secure session. The expired code cannot authorize an account.':
    'បង្កើតសម័យសុវត្ថិភាពថ្មី។ លេខកូដដែលផុតកំណត់មិនអាចអនុញ្ញាតគណនីបានទេ។',
  'Create new link': 'បង្កើតតំណថ្មី',
  'ABA is taking longer than usual': 'ABA កំពុងប្រើពេលយូរជាងធម្មតា',
  'Your account is not linked yet. Keep this open, or create a new link if ABA never responds.':
    'គណនីរបស់អ្នកមិនទាន់ត្រូវបានភ្ជាប់ទេ។ សូមទុកវាបើកចោល ឬបង្កើតតំណថ្មី ប្រសិនបើ ABA មិនឆ្លើយតប។',
  'ABA confirmed the authorization': 'ABA បានបញ្ជាក់ការអនុញ្ញាត',
  'The linked account appears once your balance refreshes.':
    'គណនីដែលបានភ្ជាប់នឹងបង្ហាញ នៅពេលសមតុល្យរបស់អ្នកផ្ទុកឡើងវិញ។',
  'ABA authorization QR code': 'លេខកូដ QR សម្រាប់ការអនុញ្ញាត ABA',
  'Confirm in ABA Mobile': 'បញ្ជាក់នៅក្នុង ABA Mobile',
  'Open ABA Mobile on your phone.': 'បើក ABA Mobile នៅលើទូរស័ព្ទរបស់អ្នក។',
  'Scan this code or open the secure mobile link.':
    'ស្កេនលេខកូដនេះ ឬបើកតំណសុវត្ថិភាពលើទូរស័ព្ទ។',
  'Review and authorize in ABA Mobile.': 'ពិនិត្យ និងអនុញ្ញាតនៅក្នុង ABA Mobile។',
  'Waiting for provider confirmation': 'កំពុងរង់ចាំការបញ្ជាក់ពីអ្នកផ្តល់សេវា',
  expires: 'ផុតកំណត់',
  'Open ABA Mobile': 'បើក ABA Mobile',
  'A provider token, masked account, authorization state, and lifecycle timestamps. Kura never asks for or stores your ABA PIN or full account number.':
    'token ពីអ្នកផ្តល់សេវា លេខគណនីដែលបានបិទបាំង ស្ថានភាពការអនុញ្ញាត និងពេលវេលានៃវដ្តជីវិត។ Kura មិនដែលសុំ ឬរក្សាទុក PIN ABA ឬលេខគណនីពេញរបស់អ្នកឡើយ។',

  // Scheduled-pull retry eligibility (rendered on the admin surface)
  Eligible: 'មានសិទ្ធិ',
  remaining: 'នៅសល់',
  'Retry window expired': 'អំឡុងពេលព្យាយាមឡើងវិញផុតកំណត់',
  'Only scheduled pulls can be retried':
    'មានតែការប្រមូលតាមកាលវិភាគទេ ដែលអាចព្យាយាមឡើងវិញបាន',
  'Retry budget exhausted': 'ចំនួនព្យាយាមឡើងវិញអស់ហើយ',
  'Notice amount cap exhausted': 'ដែនកំណត់ចំនួនក្នុងការជូនដំណឹងអស់ហើយ',
};
