import type { KhmerDictionary } from '../types';

/**
 * Person-owned Earnings: balance, settlement, statements, and the optional ABA
 * auto-pay authorization.
 *
 * Money rules for this area:
 * - Currency codes, amounts, account numbers, and bank names stay Latin.
 * - Provider and scheme names (KHQR, ABA, ABA Mobile, PIN, token) stay Latin so
 *   what the doctor reads matches what the bank app shows.
 * - Terms whose Khmer rendering would blur what is owed or when money moves are
 *   deliberately absent, so the English source renders. `Credit floor`,
 *   `Exposure`, and `current exposure` are the named cases: each has an exact
 *   financial meaning that a plain Khmer paraphrase would widen.
 */
export const DOCTOR_BANKING_KM: KhmerDictionary = {
  // Page and section identity.
  // `Earnings` is also written by `home`; this file follows that rendering so
  // one English string keeps one Khmer rendering. It belongs in `common.ts`.
  Earnings: 'ប្រាក់ចំណូល',
  'Activity & statements': 'សកម្មភាព និងរបាយការណ៍',
  'Settle balance': 'ទូទាត់សមតុល្យ',
  'Auto-pay': 'ការទូទាត់ស្វ័យប្រវត្តិ',
  'This period': 'រយៈពេលនេះ',
  'Scheduled collections': 'ការប្រមូលតាមកាលវិភាគ',
  'Financial notifications': 'ការជូនដំណឹងហិរញ្ញវត្ថុ',
  'What Kura stores': 'អ្វីដែល Kura រក្សាទុក',

  // Balance
  'You owe Kura': 'អ្នកជំពាក់ Kura',
  'Kura owes you': 'Kura ជំពាក់អ្នក',
  'Settled balance': 'សមតុល្យបានទូទាត់',
  'Balance unavailable': 'សមតុល្យមិនអាចបង្ហាញបាន',
  'Amount unavailable': 'ចំនួនទឹកប្រាក់មិនអាចបង្ហាញបាន',
  'Doctor owes Kura': 'វេជ្ជបណ្ឌិតជំពាក់ Kura',
  'Kura owes doctor': 'Kura ជំពាក់វេជ្ជបណ្ឌិត',
  'Settle now': 'ទូទាត់ឥឡូវនេះ',

  // Period figures
  'Earned this period': 'ប្រាក់ចំណូលរយៈពេលនេះ',
  'Pending earnings': 'ប្រាក់ចំណូលកំពុងរង់ចាំ',
  'Pending charges': 'ការគិតថ្លៃកំពុងរង់ចាំ',
  Reserved: 'បានបម្រុងទុក',
  'Earned includes settled and pending earnings across your Kura workspaces. Pending and reserved amounts do not change the settled balance yet.':
    'ប្រាក់ចំណូលរួមបញ្ចូលទាំងចំណូលដែលបានទូទាត់ និងកំពុងរង់ចាំ នៅគ្រប់កន្លែងធ្វើការ Kura របស់អ្នក។ ចំនួនកំពុងរង់ចាំ និងបានបម្រុងទុក មិនទាន់ផ្លាស់ប្តូរសមតុល្យដែលបានទូទាត់នៅឡើយទេ។',

  // Scheduled collections
  'Kura collects owed balances on the 1st and 15th after the required notice.':
    'Kura ប្រមូលសមតុល្យដែលជំពាក់ នៅថ្ងៃទី 1 និងថ្ងៃទី 15 បន្ទាប់ពីការជូនដំណឹងតាមកំណត់។',
  'Manage auto-pay': 'គ្រប់គ្រងការទូទាត់ស្វ័យប្រវត្តិ',
  'Next sweep': 'ការប្រមូលបន្ទាប់',
  Maximum: 'អតិបរមា',
  Notice: 'ការជូនដំណឹង',
  Sent: 'បានផ្ញើ',
  Due: 'ដល់កំណត់',
  'Not due': 'មិនទាន់ដល់កំណត់',
  'None scheduled': 'គ្មានកាលវិភាគ',

  // View states
  'Loading earnings': 'កំពុងផ្ទុកប្រាក់ចំណូល',
  'Earnings access denied': 'ការចូលមើលប្រាក់ចំណូលត្រូវបានបដិសេធ',
  'This ledger is person-owned. Delegated users cannot view balances, debt, mandate details, or payment codes.':
    'បញ្ជីគណនីនេះជាកម្មសិទ្ធិផ្ទាល់ខ្លួន។ អ្នកប្រើដែលបានប្រគល់សិទ្ធិ មិនអាចមើលសមតុល្យ បំណុល ព័ត៌មានការអនុញ្ញាត ឬលេខកូដទូទាត់បានទេ។',
  'Earnings require a verified licence': 'ប្រាក់ចំណូលត្រូវការអាជ្ញាបណ្ណដែលបានផ្ទៀងផ្ទាត់',
  'Earnings belong to you, not your workspace. Manage your medical licence to access them.':
    'ប្រាក់ចំណូលជាកម្មសិទ្ធិរបស់អ្នក មិនមែនរបស់កន្លែងធ្វើការទេ។ គ្រប់គ្រងអាជ្ញាបណ្ណវេជ្ជសាស្ត្ររបស់អ្នក ដើម្បីចូលមើល។',
  'Manage licence': 'គ្រប់គ្រងអាជ្ញាបណ្ណ',
  'Earnings unavailable': 'ប្រាក់ចំណូលមិនអាចបង្ហាញបាន',
  'Current amounts could not be verified. No balance or payment action is shown.':
    'មិនអាចផ្ទៀងផ្ទាត់ចំនួនទឹកប្រាក់បច្ចុប្បន្នបានទេ។ គ្មានសមតុល្យ ឬសកម្មភាពទូទាត់ត្រូវបានបង្ហាញឡើយ។',

  // Activity ledger
  Activity: 'សកម្មភាព',
  'Recent activity': 'សកម្មភាពថ្មីៗ',
  'Search and filter immutable balance movements across your Kura workspaces.':
    'ស្វែងរក និងត្រងចលនាសមតុល្យដែលមិនអាចកែបាន នៅគ្រប់កន្លែងធ្វើការ Kura របស់អ្នក។',
  'When (ICT)': 'ពេលវេលា (ICT)',
  State: 'ស្ថានភាព',
  Settled: 'បានទូទាត់',
  Voided: 'បានលុបចោល',
  'Activity type': 'ប្រភេទសកម្មភាព',
  'Pending debit': 'ការកាត់ប្រាក់កំពុងរង់ចាំ',
  'Pending credit': 'ការបញ្ចូលប្រាក់កំពុងរង់ចាំ',
  'Completion debit': 'ការកាត់ប្រាក់ពេលបញ្ចប់',
  'Completion credit': 'ការបញ្ចូលប្រាក់ពេលបញ្ចប់',
  'KHQR credit': 'ការបញ្ចូលប្រាក់តាម KHQR',
  'ABA collection credit': 'ការបញ្ចូលប្រាក់ពីការប្រមូល ABA',
  'First-link credit': 'ការបញ្ចូលប្រាក់ពេលភ្ជាប់លើកដំបូង',
  'Admin adjustment': 'ការកែតម្រូវដោយអ្នកគ្រប់គ្រង',
  'Search activity': 'ស្វែងរកសកម្មភាព',
  'Activity per page': 'សកម្មភាពក្នុងមួយទំព័រ',
  'Earnings activity': 'សកម្មភាពប្រាក់ចំណូល',
  'Loading earnings activity': 'កំពុងផ្ទុកសកម្មភាពប្រាក់ចំណូល',
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
  'Your current access cannot view this person-owned ledger.':
    'សិទ្ធិចូលប្រើបច្ចុប្បន្នរបស់អ្នក មិនអាចមើលបញ្ជីគណនីផ្ទាល់ខ្លួននេះបានទេ។',
  'The ledger could not be loaded. No activity has been inferred.':
    'មិនអាចផ្ទុកបញ្ជីគណនីបានទេ។ គ្មានសកម្មភាពត្រូវបានប៉ាន់ស្មានឡើយ។',

  // Statements
  'Only doctor-audience notices and receipts appear here.':
    'មានតែការជូនដំណឹង និងបង្កាន់ដៃសម្រាប់វេជ្ជបណ្ឌិតប៉ុណ្ណោះ ដែលបង្ហាញនៅទីនេះ។',
  'No financial notifications.': 'គ្មានការជូនដំណឹងហិរញ្ញវត្ថុ។',
  'Statement download failed': 'ការទាញយករបាយការណ៍មិនជោគជ័យ',
  'No file was saved. Check the date range and try again.':
    'គ្មានឯកសារត្រូវបានរក្សាទុកទេ។ សូមពិនិត្យចន្លោះកាលបរិច្ឆេទ ហើយព្យាយាមម្តងទៀត។',
  'Statement ready': 'របាយការណ៍រួចរាល់',
  'The filtered statement download has started.': 'ការទាញយករបាយការណ៍ដែលបានត្រង បានចាប់ផ្តើម។',

  // Doctor-audience notifications
  'Sweep notice for': 'ការជូនដំណឹងប្រមូលប្រាក់សម្រាប់',
  'Maximum remains': 'អតិបរមានៅដដែល',
  'Maximum reduced to': 'អតិបរមាបានបន្ថយមកត្រឹម',
  'Payment receipt': 'បង្កាន់ដៃទូទាត់',
  'KHQR payment': 'ការទូទាត់ KHQR',
  'Scheduled collection': 'ការប្រមូលតាមកាលវិភាគ',
  'Collection retry': 'ការប្រមូលឡើងវិញ',
  'Automatic collection': 'ការប្រមូលស្វ័យប្រវត្តិ',
  'Final collection': 'ការប្រមូលចុងក្រោយ',
  'applied to the ledger.': 'បានកត់ត្រាចូលបញ្ជីគណនី។',
  'Collection attempt failed': 'ការប្រមូលមិនជោគជ័យ',
  'No account is linked.': 'គ្មានគណនីត្រូវបានភ្ជាប់។',
  'Ledger adjustment recorded': 'បានកត់ត្រាការកែតម្រូវបញ្ជីគណនី',

  // KHQR settlement
  'Pay the exact settled amount you owe from any KHQR-enabled bank app.':
    'បង់ចំនួនទឹកប្រាក់ដែលអ្នកជំពាក់ឲ្យត្រូវពិតប្រាកដ ពីកម្មវិធីធនាគារណាមួយដែលប្រើ KHQR បាន។',
  'The balance cannot be displayed safely, so no KHQR code was created.':
    'សមតុល្យមិនអាចបង្ហាញដោយសុវត្ថិភាពបានទេ ដូច្នេះគ្មានលេខកូដ KHQR ត្រូវបានបង្កើតឡើយ។',
  'Nothing to settle': 'គ្មានអ្វីត្រូវទូទាត់',
  'Your settled balance is not red, so no KHQR payment is needed.':
    'អ្នកគ្មានសមតុល្យជំពាក់ទេ ដូច្នេះមិនចាំបាច់ទូទាត់តាម KHQR ឡើយ។',
  'Ready to create exact KHQR': 'រួចរាល់ដើម្បីបង្កើត KHQR ចំនួនពិតប្រាកដ',
  'The code will request exactly': 'លេខកូដនេះនឹងស្នើសុំចំនួនត្រឹមតែ',
  'It cannot be edited or reused after expiry.':
    'វាមិនអាចកែសម្រួល ឬប្រើឡើងវិញបានទេ បន្ទាប់ពីផុតកំណត់។',
  'Create exact KHQR': 'បង្កើត KHQR ចំនួនពិតប្រាកដ',
  'KHQR code expired': 'លេខកូដ KHQR ផុតកំណត់',
  'No payment was confirmed. Create a new code for the same verified amount.':
    'គ្មានការទូទាត់ត្រូវបានបញ្ជាក់ទេ។ សូមបង្កើតលេខកូដថ្មីសម្រាប់ចំនួនដដែលដែលបានផ្ទៀងផ្ទាត់។',
  'Create new KHQR': 'បង្កើត KHQR ថ្មី',
  'Settlement confirmed': 'ការទូទាត់ត្រូវបានបញ្ជាក់',
  'was confirmed by the provider and applied to the ledger.':
    'ត្រូវបានបញ្ជាក់ដោយអ្នកផ្តល់សេវា ហើយបានកត់ត្រាចូលបញ្ជីគណនី។',
  'KHQR settlement code': 'លេខកូដ KHQR សម្រាប់ទូទាត់',
  'Awaiting confirmation': 'កំពុងរង់ចាំការបញ្ជាក់',
  'Pay the exact amount': 'បង់ចំនួនទឹកប្រាក់ពិតប្រាកដ',
  'Scan with any KHQR-enabled bank app. Kura will wait for provider confirmation.':
    'ស្កេនដោយកម្មវិធីធនាគារណាមួយដែលប្រើ KHQR បាន។ Kura នឹងរង់ចាំការបញ្ជាក់ពីអ្នកផ្តល់សេវា។',
  Expires: 'ផុតកំណត់',
  'Check confirmation': 'ពិនិត្យការបញ្ជាក់',

  // ABA authorization (mandate)
  'ABA authorization': 'ការអនុញ្ញាត ABA',
  Account: 'គណនី',
  'Not linked': 'មិនបានភ្ជាប់',
  'KHQR remains available. Link ABA only if you want optional scheduled collections.':
    'KHQR នៅតែប្រើបាន។ ភ្ជាប់ ABA តែក្នុងករណីអ្នកចង់បានការប្រមូលតាមកាលវិភាគប៉ុណ្ណោះ។',
  'Waiting for ABA': 'កំពុងរង់ចាំ ABA',
  'The authorization is not active until ABA confirms it.':
    'ការអនុញ្ញាតមិនទាន់សកម្មទេ រហូតដល់ ABA បញ្ជាក់។',
  'Auto-pay active': 'ការទូទាត់ស្វ័យប្រវត្តិសកម្ម',
  'Scheduled collections use the linked ABA authorization after the required notice.':
    'ការប្រមូលតាមកាលវិភាគប្រើការអនុញ្ញាត ABA ដែលបានភ្ជាប់ បន្ទាប់ពីការជូនដំណឹងតាមកំណត់។',
  'Renewal required': 'ត្រូវការបន្តសុពលភាព',
  'Renew the authorization before the next eligible scheduled collection.':
    'បន្តសុពលភាពការអនុញ្ញាត មុនការប្រមូលតាមកាលវិភាគបន្ទាប់។',
  'Authorization expired': 'ការអនុញ្ញាតផុតកំណត់',
  'Scheduled collections are unavailable. KHQR remains available.':
    'ការប្រមូលតាមកាលវិភាគមិនអាចប្រើបានទេ។ KHQR នៅតែប្រើបាន។',
  'Collection frozen': 'ការប្រមូលត្រូវបានផ្អាក',
  'Kura has paused collection actions while the account state is reviewed.':
    'Kura បានផ្អាកសកម្មភាពប្រមូល ខណៈកំពុងពិនិត្យស្ថានភាពគណនី។',
  'Authorization deleted': 'ការអនុញ្ញាតត្រូវបានលុប',
  'This authorization cannot be used or restored from this screen.':
    'ការអនុញ្ញាតនេះមិនអាចប្រើ ឬស្តារឡើងវិញពីអេក្រង់នេះបានទេ។',
  'No collection or account change can be started while this state is active.':
    'មិនអាចចាប់ផ្តើមការប្រមូល ឬការផ្លាស់ប្តូរគណនីបានទេ ខណៈស្ថានភាពនេះនៅសកម្ម។',
  'Contact Kura support if you need to link another eligible account.':
    'ទាក់ទងផ្នែកជំនួយ Kura ប្រសិនបើអ្នកត្រូវការភ្ជាប់គណនីមួយផ្សេងទៀត។',

  // Linking and unlinking
  'Link ABA': 'ភ្ជាប់ ABA',
  'Link ABA again': 'ភ្ជាប់ ABA ម្តងទៀត',
  'Renew authorization': 'បន្តសុពលភាពការអនុញ្ញាត',
  'View link session': 'មើលសម័យភ្ជាប់',
  'Unlink ABA': 'ផ្តាច់ ABA',
  'Unlink this ABA authorization?': 'ផ្តាច់ការអនុញ្ញាត ABA នេះមែនទេ?',
  'Scheduled collections will stop. Any remaining balance you owe may require a final collection or KHQR settlement.':
    'ការប្រមូលតាមកាលវិភាគនឹងឈប់។ សមតុល្យដែលអ្នកនៅជំពាក់ អាចត្រូវការការប្រមូលចុងក្រោយ ឬការទូទាត់តាម KHQR។',
  'Keep authorization': 'រក្សាការអនុញ្ញាត',
  'Link ABA securely': 'ភ្ជាប់ ABA ដោយសុវត្ថិភាព',
  'Kura stores a payment token and masked account only. The link succeeds only after ABA confirms it.':
    'Kura រក្សាទុកតែ token ទូទាត់ និងលេខគណនីដែលបានបិទបាំងប៉ុណ្ណោះ។ ការភ្ជាប់ជោគជ័យលុះត្រាតែ ABA បញ្ជាក់។',
  'Starting secure ABA link': 'កំពុងចាប់ផ្តើមការភ្ជាប់ ABA ដោយសុវត្ថិភាព',
  'Waiting for a provider link session. No authorization is active yet.':
    'កំពុងរង់ចាំសម័យភ្ជាប់ពីអ្នកផ្តល់សេវា។ មិនទាន់មានការអនុញ្ញាតសកម្មនៅឡើយទេ។',
  'Link session expired': 'សម័យភ្ជាប់ផុតកំណត់',
  'Create a new secure session. The expired code cannot authorize an account.':
    'បង្កើតសម័យសុវត្ថិភាពថ្មី។ លេខកូដដែលផុតកំណត់មិនអាចអនុញ្ញាតគណនីបានទេ។',
  'Create new link': 'បង្កើតតំណថ្មី',
  'ABA confirmed the authorization': 'ABA បានបញ្ជាក់ការអនុញ្ញាត',
  'The linked account will appear after the balance overview refreshes.':
    'គណនីដែលបានភ្ជាប់នឹងបង្ហាញ បន្ទាប់ពីទិដ្ឋភាពសមតុល្យផ្ទុកឡើងវិញ។',
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
  'Manage the optional ABA authorization used for scheduled collections. KHQR remains available when auto-pay is off.':
    'គ្រប់គ្រងការអនុញ្ញាត ABA ស្រេចចិត្ត ដែលប្រើសម្រាប់ការប្រមូលតាមកាលវិភាគ។ KHQR នៅតែប្រើបាន ពេលការទូទាត់ស្វ័យប្រវត្តិបិទ។',

  // Scheduled-pull retry eligibility (rendered on the admin surface)
  Eligible: 'មានសិទ្ធិ',
  remaining: 'នៅសល់',
  'Retry window expired': 'អំឡុងពេលព្យាយាមឡើងវិញផុតកំណត់',
  'Only scheduled pulls can be retried':
    'មានតែការប្រមូលតាមកាលវិភាគទេ ដែលអាចព្យាយាមឡើងវិញបាន',
  'Retry budget exhausted': 'ចំនួនព្យាយាមឡើងវិញអស់ហើយ',
  'Notice amount cap exhausted': 'ដែនកំណត់ចំនួនក្នុងការជូនដំណឹងអស់ហើយ',
};
