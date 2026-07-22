import type { KhmerDictionary } from '../types';

/**
 * Workspace settings: identity, cabinet, team, preferences, patient messages,
 * payments, directory profile, signed documents, and security.
 *
 * Credential codes (CMC numbers), technical profile names (PAdES-B-LT, CamDX),
 * brand names (Bakong, Telegram, Forte), filenames, dates, and unit systems
 * stay in Latin script — the chrome around them is translated, the token is not.
 */
export const SETTINGS_KM: KhmerDictionary = {
  /* ------------------------------ navigation ----------------------------- */
  'Settings sections': 'ផ្នែកនៃការកំណត់',
  'Manage your profile, workspace, operations, and security.':
    'គ្រប់គ្រងប្រវត្តិរូប កន្លែងធ្វើការ ប្រតិបត្តិការ និងសុវត្ថិភាព។',
  Operations: 'ប្រតិបត្តិការ',
  Trust: 'ទំនុកចិត្ត',
  Overview: 'ទិដ្ឋភាពរួម',
  'Account & verification': 'គណនី និងការផ្ទៀងផ្ទាត់',
  Cabinet: 'គ្លីនិក',
  'Team access': 'សិទ្ធិចូលរបស់ក្រុម',
  Preferences: 'ចំណូលចិត្ត',
  'Patient messages': 'សារជូនអ្នកជំងឺ',
  'Directory profile': 'ប្រវត្តិរូបក្នុងបញ្ជីឈ្មោះ',
  'Signed documents': 'ឯកសារដែលបានចុះហត្ថលេខា',
  Security: 'សុវត្ថិភាព',

  /* ------------------------------- overview ------------------------------ */
  'Priority settings for this workspace.':
    'ការកំណត់សំខាន់សម្រាប់កន្លែងធ្វើការនេះ។',
  'Medical license expires in': 'អាជ្ញាបណ្ណវេជ្ជសាស្ត្រនឹងផុតកំណត់ក្នុងរយៈពេល',
  days: 'ថ្ងៃ',
  expires: 'ផុតកំណត់',
  'Renew it before lapse to keep this credential available for new order attribution.':
    'សូមបន្តអាជ្ញាបណ្ណមុនពេលផុតកំណត់ ដើម្បីរក្សាសិទ្ធិសម្រាប់ការបញ្ជាថ្មី។',
  'Upload renewed license': 'ផ្ទុកឡើងអាជ្ញាបណ្ណថ្មី',
  'Edit account': 'កែសម្រួលគណនី',
  'Signed in as': 'ចូលក្នុងនាម',
  Verification: 'ការផ្ទៀងផ្ទាត់',
  'Verify license': 'ផ្ទៀងផ្ទាត់អាជ្ញាបណ្ណ',
  'Medical license and identity review':
    'ការត្រួតពិនិត្យអាជ្ញាបណ្ណ និងអត្តសញ្ញាណ',
  'Edit clinic': 'កែសម្រួលគ្លីនិក',
  'Created during onboarding': 'បង្កើតពេលចុះឈ្មោះដំបូង',
  'Phnom Penh · GMT+7': 'ភ្នំពេញ · GMT+7',
  'My cabinet': 'គ្លីនិករបស់ខ្ញុំ',
  Team: 'ក្រុម',
  'Review team': 'ពិនិត្យក្រុម',
  'No pending invites': 'គ្មានការអញ្ជើញរង់ចាំ',
  '1 invite pending approval': 'ការអញ្ជើញ 1 រង់ចាំការអនុម័ត',
  '1 active member': 'សមាជិកសកម្ម 1 នាក់',
  '5 active members': 'សមាជិកសកម្ម 5 នាក់',
  'View payments': 'មើលការទូទាត់',
  'No workspace payment methods or insurer panels configured':
    'មិនទាន់មានវិធីទូទាត់ ឬក្រុមហ៊ុនធានារ៉ាប់រងសម្រាប់កន្លែងធ្វើការនេះ',
  'KHQR active · next netting Jul 1': 'KHQR សកម្ម · ការទូទាត់បន្ទាប់ Jul 1',
  'Not configured': 'មិនទាន់កំណត់',
  'Bank verified': 'ធនាគារបានផ្ទៀងផ្ទាត់',
  'View documents': 'មើលឯកសារ',
  'No signing certificate or signed documents configured':
    'មិនទាន់មានវិញ្ញាបនបត្រចុះហត្ថលេខា ឬឯកសារដែលបានចុះហត្ថលេខា',
  'Certificate active until Mar 2027': 'វិញ្ញាបនបត្រសកម្មរហូតដល់ Mar 2027',

  /* -------------------------------- account ------------------------------ */
  'Identity details and professional credential review status.':
    'ព័ត៌មានអត្តសញ្ញាណ និងស្ថានភាពត្រួតពិនិត្យលិខិតសម្គាល់វិជ្ជាជីវៈ។',
  'Verified primary sign-in phone': 'លេខទូរស័ព្ទចូលគណនីដែលបានផ្ទៀងផ្ទាត់',
  'Used for sign-in and statements': 'ប្រើសម្រាប់ចូលគណនី និងរបាយការណ៍',
  'Clinician name': 'ឈ្មោះវេជ្ជបណ្ឌិត',
  'Medical license': 'អាជ្ញាបណ្ណវេជ្ជសាស្ត្រ',
  'Upload license': 'ផ្ទុកឡើងអាជ្ញាបណ្ណ',
  selected: 'បានជ្រើសរើស',
  'No document submitted': 'មិនទាន់ដាក់ស្នើឯកសារ',
  'Credential identifier and document details are not available':
    'លេខសម្គាល់លិខិត និងព័ត៌មានឯកសារមិនមាន',
  Expires: 'ផុតកំណត់',
  'File selected': 'បានជ្រើសរើសឯកសារ',
  'Renews in': 'បន្តក្នុងរយៈពេល',
  'License verification': 'ការផ្ទៀងផ្ទាត់អាជ្ញាបណ្ណ',
  'A live credential is required only when this member is attributed to a new clinic order':
    'លិខិតសម្គាល់ដែលនៅមានសុពលភាព ត្រូវការតែពេលសមាជិកនេះត្រូវបានភ្ជាប់ទៅការបញ្ជាថ្មីរបស់គ្លីនិក',
  'Review authority': 'អាជ្ញាធរត្រួតពិនិត្យ',
  'Reviewer verdicts are recorded separately from the credential lifecycle':
    'សេចក្តីសម្រេចរបស់អ្នកត្រួតពិនិត្យត្រូវកត់ត្រាដាច់ដោយឡែកពីវដ្តជីវិតលិខិតសម្គាល់',
  'Kura professional review': 'ការត្រួតពិនិត្យវិជ្ជាជីវៈដោយ Kura',
  'Signature & certificate': 'ហត្ថលេខា និងវិញ្ញាបនបត្រ',
  'Managed under Signed documents':
    'គ្រប់គ្រងក្នុងផ្នែកឯកសារដែលបានចុះហត្ថលេខា',
  'Ready to sign': 'រួចរាល់សម្រាប់ចុះហត្ថលេខា',

  /* ------------------- credential lifecycle states ----------------------- */
  'Not submitted': 'មិនទាន់ដាក់ស្នើ',
  'Under review': 'កំពុងត្រួតពិនិត្យ',
  'Action required': 'ត្រូវការសកម្មភាព',
  Verified: 'បានផ្ទៀងផ្ទាត់',
  Expiring: 'ជិតផុតកំណត់',
  'In grace': 'ក្នុងអំឡុងអនុគ្រោះ',
  Lapsed: 'ផុតសុពលភាព',

  /* ------------------------ credential banners --------------------------- */
  'Submit your professional licence': 'ដាក់ស្នើអាជ្ញាបណ្ណវិជ្ជាជីវៈរបស់អ្នក',
  'Catalog and prices remain available. New clinic orders still require explicit order capability and a live attributed prescriber.':
    'បញ្ជីតេស្ត និងតម្លៃនៅតែមាន។ ការបញ្ជាថ្មីរបស់គ្លីនិកនៅតែត្រូវការសិទ្ធិបញ្ជាច្បាស់លាស់ និងអ្នកចេញវេជ្ជបញ្ជាដែលមានសុពលភាព។',
  'Submit licence': 'ដាក់ស្នើអាជ្ញាបណ្ណ',
  'Your professional licence is under review':
    'អាជ្ញាបណ្ណវិជ្ជាជីវៈរបស់អ្នកកំពុងត្រួតពិនិត្យ',
  'The submitted record is awaiting a reviewer verdict and is not live for attribution yet.':
    'កំណត់ត្រាដែលបានដាក់ស្នើកំពុងរង់ចាំសេចក្តីសម្រេចរបស់អ្នកត្រួតពិនិត្យ ហើយមិនទាន់មានសុពលភាពសម្រាប់ការភ្ជាប់នៅឡើយ។',
  'View status': 'មើលស្ថានភាព',
  'Your professional licence submission was rejected':
    'ការដាក់ស្នើអាជ្ញាបណ្ណវិជ្ជាជីវៈរបស់អ្នកត្រូវបានបដិសេធ',
  'Review the reason and create a corrected submission. The rejected attempt remains in the audit history.':
    'ពិនិត្យមូលហេតុ ហើយបង្កើតការដាក់ស្នើដែលបានកែតម្រូវ។ ការដាក់ស្នើដែលបដិសេធនៅតែក្នុងប្រវត្តិសវនកម្ម។',
  'Review and resubmit': 'ពិនិត្យ រួចដាក់ស្នើឡើងវិញ',
  'Your professional licence is expiring':
    'អាជ្ញាបណ្ណវិជ្ជាជីវៈរបស់អ្នកជិតផុតកំណត់',
  'It remains live for attribution. Renew it before the current credential lapses.':
    'វានៅតែមានសុពលភាពសម្រាប់ការភ្ជាប់។ សូមបន្តវាមុនពេលលិខិតសម្គាល់បច្ចុប្បន្នផុតកំណត់។',
  'Renew licence': 'បន្តសុពលភាពអាជ្ញាបណ្ណ',
  'Your professional licence is in its grace period':
    'អាជ្ញាបណ្ណវិជ្ជាជីវៈរបស់អ្នកនៅក្នុងអំឡុងអនុគ្រោះ',
  'It remains live for attribution during grace. Renew it before the lapse deadline.':
    'វានៅតែមានសុពលភាពសម្រាប់ការភ្ជាប់ក្នុងអំឡុងអនុគ្រោះ។ សូមបន្តវាមុនកាលបរិច្ឆេទផុតកំណត់។',
  'Your professional licence has lapsed':
    'អាជ្ញាបណ្ណវិជ្ជាជីវៈរបស់អ្នកបានផុតកំណត់',
  'New clinic orders cannot attribute prescribing to you. Previously placed episodes are not revoked retroactively.':
    'ការបញ្ជាថ្មីរបស់គ្លីនិកមិនអាចភ្ជាប់ការចេញវេជ្ជបញ្ជាទៅអ្នកបានទេ។ វគ្គដែលបានធ្វើពីមុនមិនត្រូវបានលុបចោលក្រោយពេលនោះទេ។',

  /* -------------------------------- cabinet ------------------------------ */
  'The clinic this workspace operates under. Add operational details before enabling dependent services.':
    'គ្លីនិកដែលកន្លែងធ្វើការនេះដំណើរការក្រោម។ បន្ថែមព័ត៌មានប្រតិបត្តិការមុនពេលបើកសេវាដែលពឹងផ្អែក។',
  'The clinic this workspace operates under. Lab routing, billing, and compliance follow these fields.':
    'គ្លីនិកដែលកន្លែងធ្វើការនេះដំណើរការក្រោម។ ការបញ្ជូនទៅមន្ទីរពិសោធន៍ វិក្កយបត្រ និងការអនុលោមតាមច្បាប់ អាស្រ័យលើវាលទាំងនេះ។',
  'Cabinet name': 'ឈ្មោះគ្លីនិក',
  'Clinic type': 'ប្រភេទគ្លីនិក',
  Country: 'ប្រទេស',
  Timezone: 'តំបន់ម៉ោង',
  Currency: 'រូបិយប័ណ្ណ',
  'Determines insurer panel, currency, and patient channels':
    'កំណត់ក្រុមហ៊ុនធានារ៉ាប់រង រូបិយប័ណ្ណ និងបណ្តាញទំនាក់ទំនងអ្នកជំងឺ',
  'Country is locked after registration':
    'ប្រទេសត្រូវបានចាក់សោបន្ទាប់ពីការចុះឈ្មោះ',
  'Billing rails, insurer contracts, and lab logistics are provisioned per country. Contact Kura support to migrate a cabinet across borders.':
    'ប្រព័ន្ធទូទាត់ កិច្ចសន្យាធានារ៉ាប់រង និងដឹកជញ្ជូនមន្ទីរពិសោធន៍ ត្រូវរៀបចំតាមប្រទេស។ សូមទាក់ទងផ្នែកជំនួយ Kura ដើម្បីផ្លាស់ប្តូរគ្លីនិកឆ្លងប្រទេស។',

  /* ---------------------------- courier pickup --------------------------- */
  'Courier pickup': 'ការមកយកសំណាក',
  'Change route': 'ប្តូរផ្លូវ',
  Route: 'ផ្លូវ',
  'Pickup time': 'ម៉ោងមកយក',
  'Pickup days': 'ថ្ងៃមកយក',
  'Select at least one pickup day.':
    'សូមជ្រើសរើសយ៉ាងតិចមួយថ្ងៃសម្រាប់ការមកយក។',
  'Courier pickup updated': 'បានធ្វើបច្ចុប្បន្នភាពការមកយកសំណាក',

  /* ------------------------------ team access ---------------------------- */
  active: 'សកម្ម',
  'Roles scope what each member can see and do. All PHI access is logged.':
    'តួនាទីកំណត់អ្វីដែលសមាជិកម្នាក់ៗអាចមើល និងធ្វើបាន។ រាល់ការចូលមើលព័ត៌មានអ្នកជំងឺត្រូវកត់ត្រា។',
  you: 'អ្នក',
  Owner: 'ម្ចាស់',
  'Owner · Doctor': 'ម្ចាស់ · វេជ្ជបណ្ឌិត',
  'Care coordinator': 'អ្នកសម្របសម្រួលការថែទាំ',
  Phlebotomist: 'អ្នកយកឈាម',
  Reception: 'ផ្នែកទទួលភ្ញៀវ',
  Accountant: 'គណនេយ្យករ',
  Role: 'តួនាទី',
  'Role for': 'តួនាទីសម្រាប់',
  'Edit role': 'កែតួនាទី',
  'invited 2 days ago': 'អញ្ជើញកាលពី 2 ថ្ងៃមុន',
  'invited just now': 'អញ្ជើញទើបតែឥឡូវ',
  Approve: 'អនុម័ត',
  Revoke: 'ដកសិទ្ធិ',
  'You are the sole owner': 'អ្នកជាម្ចាស់តែម្នាក់គត់',
  'Transfer ownership to another verified doctor before leaving this cabinet. A cabinet cannot operate without an owner of record.':
    'ផ្ទេរភាពជាម្ចាស់ទៅវេជ្ជបណ្ឌិតដែលបានផ្ទៀងផ្ទាត់ផ្សេងទៀត មុនពេលចាកចេញពីគ្លីនិកនេះ។ គ្លីនិកមិនអាចដំណើរការដោយគ្មានម្ចាស់ជាផ្លូវការទេ។',
  'Member name': 'ឈ្មោះសមាជិក',
  'Member name is required.': 'ត្រូវការឈ្មោះសមាជិក។',
  'Send invite': 'ផ្ញើការអញ្ជើញ',
  'Invite member': 'អញ្ជើញសមាជិក',
  'Invite sent to': 'បានផ្ញើការអញ្ជើញទៅ',
  'Confirm role change?': 'បញ្ជាក់ការប្តូរតួនាទី?',
  becomes: 'ក្លាយជា',
  'Roles scope what this member can see and do; the change is logged.':
    'តួនាទីកំណត់អ្វីដែលសមាជិកនេះអាចមើល និងធ្វើបាន។ ការផ្លាស់ប្តូរនេះត្រូវកត់ត្រា។',
  'Role updated for': 'បានធ្វើបច្ចុប្បន្នភាពតួនាទីសម្រាប់',
  'Approve invite?': 'អនុម័តការអញ្ជើញ?',
  'Revoke invite?': 'ដកការអញ្ជើញ?',
  'joins this workspace as': 'ចូលរួមកន្លែងធ្វើការនេះជា',
  'loses access to this invite. You can invite them again later.':
    'នឹងបាត់បង់សិទ្ធិលើការអញ្ជើញនេះ។ អ្នកអាចអញ្ជើញម្តងទៀតពេលក្រោយ។',
  'approved as': 'បានអនុម័តជា',
  'Invite to': 'ការអញ្ជើញទៅ',
  revoked: 'ត្រូវបានដក',

  /* ------------------------------ preferences ---------------------------- */
  'Display defaults saved on this device. They never change the medical record.':
    'ការកំណត់ការបង្ហាញលំនាំដើមរក្សាទុកលើឧបករណ៍នេះ។ វាមិនផ្លាស់ប្តូរកំណត់ត្រាវេជ្ជសាស្ត្រឡើយ។',
  'Preferences saved on this device': 'បានរក្សាទុកចំណូលចិត្តលើឧបករណ៍នេះ',
  'Lab units': 'ឯកតាមន្ទីរពិសោធន៍',
  Conventional: 'ធម្មតា',
  'Conventional (mg/dL)': 'ធម្មតា (mg/dL)',
  'Applies to lab history and printouts':
    'អនុវត្តលើប្រវត្តិមន្ទីរពិសោធន៍ និងឯកសារបោះពុម្ព',
  Theme: 'រូបរាង',
  Light: 'ភ្លឺ',
  Dark: 'ងងឹត',
  System: 'ប្រព័ន្ធ',
  'Match system': 'តាមប្រព័ន្ធ',
  'Clinical terms, drug names, and lab codes stay in English.':
    'ពាក្យវេជ្ជសាស្ត្រ ឈ្មោះថ្នាំ និងកូដមន្ទីរពិសោធន៍ នៅតែជាភាសាអង់គ្លេស។',
  'Reference ranges': 'ជួរយោង',
  'Show reference ranges inline': 'បង្ហាញជួរយោងក្នុងជួរដេក',
  'Shown inline': 'បង្ហាញក្នុងជួរដេក',
  'Hidden until opened': 'លាក់រហូតដល់បើក',
  'Normal results': 'លទ្ធផលធម្មតា',
  'Collapse normal results by default': 'បង្រួមលទ្ធផលធម្មតាតាមលំនាំដើម',
  'Abnormal results always stay expanded.': 'លទ្ធផលមិនធម្មតាតែងតែបើកចំហ។',
  'Collapsed by default': 'បង្រួមតាមលំនាំដើម',
  'Expanded by default': 'បើកចំហតាមលំនាំដើម',
  'Use 24-hour time': 'ប្រើម៉ោង 24 ម៉ោង',
  '24-hour': '24 ម៉ោង',
  '12-hour': '12 ម៉ោង',
  'Saved on this device.': 'រក្សាទុកលើឧបករណ៍នេះ។',

  /* --------------------------- patient messages -------------------------- */
  'Patient message channels and reusable notification copy for this cabinet.':
    'បណ្តាញផ្ញើសារជូនអ្នកជំងឺ និងអត្ថបទជូនដំណឹងសម្រាប់គ្លីនិកនេះ។',
  'Channel order': 'លំដាប់បណ្តាញ',
  'Channel order follows the cabinet country':
    'លំដាប់បណ្តាញអាស្រ័យលើប្រទេសរបស់គ្លីនិក',
  'Patients can opt out per channel.':
    'អ្នកជំងឺអាចបដិសេធតាមបណ្តាញនីមួយៗ។',
  'Default for 92% of reachable patients':
    'លំនាំដើមសម្រាប់ 92% នៃអ្នកជំងឺដែលទាក់ទងបាន',
  'Fallback after 30 min unread': 'ប្រើជំនួសបន្ទាប់ពីមិនអានក្នុង 30 នាទី',
  'Fallback for receipts and documents':
    'ប្រើជំនួសសម្រាប់បង្កាន់ដៃ និងឯកសារ',
  Default: 'លំនាំដើម',
  Fallback: 'ជំនួស',
  'Notification templates': 'គំរូសារជូនដំណឹង',
  'Sent through the active channel': 'ផ្ញើតាមបណ្តាញសកម្ម',
  'Results ready': 'លទ្ធផលរួចរាល់',
  'Follow up reminder': 'ការរំលឹកតាមដាន',
  'Booking confirmation': 'ការបញ្ជាក់ការកក់',
  'Doctor intro QR': 'QR ណែនាំវេជ្ជបណ្ឌិត',
  'Doctor intro QR downloaded': 'បានទាញយក QR ណែនាំវេជ្ជបណ្ឌិត',
  'Patients scan to connect with your cabinet on Telegram and receive results there.':
    'អ្នកជំងឺស្កេនដើម្បីភ្ជាប់ជាមួយគ្លីនិករបស់អ្នកលើ Telegram និងទទួលលទ្ធផលនៅទីនោះ។',
  'Not available': 'មិនមាន',

  /* -------------------------------- payments ----------------------------- */
  'Workspace scope': 'វិសាលភាពកន្លែងធ្វើការ',
  'Workspace payment methods and insurer panels. Your balance is managed in Earnings.':
    'វិធីទូទាត់ និងក្រុមហ៊ុនធានារ៉ាប់រងរបស់កន្លែងធ្វើការ។ សមតុល្យរបស់អ្នកគ្រប់គ្រងក្នុងផ្នែកប្រាក់ចំណូល។',
  'Person-owned balance, statements, KHQR settlement, and optional ABA authorization':
    'សមតុល្យផ្ទាល់ខ្លួន របាយការណ៍ ការទូទាត់ KHQR និងការអនុញ្ញាត ABA (ស្រេចចិត្ត)',
  'Managed in Earnings': 'គ្រប់គ្រងក្នុងផ្នែកប្រាក់ចំណូល',
  'Patient KHQR collection': 'ការទទួលប្រាក់ពីអ្នកជំងឺតាម KHQR',
  'Insurer panels': 'ក្រុមហ៊ុនធានារ៉ាប់រង',
  'None configured': 'មិនទាន់កំណត់',
  'Pending review': 'កំពុងរង់ចាំការត្រួតពិនិត្យ',

  /* ---------------------------- directory profile ------------------------ */
  Unpublished: 'មិនទាន់បោះផ្សាយ',
  Public: 'សាធារណៈ',
  'What patients will see after this profile is completed and published.':
    'អ្វីដែលអ្នកជំងឺនឹងឃើញបន្ទាប់ពីប្រវត្តិរូបនេះបំពេញ និងបោះផ្សាយរួច។',
  'What patients see in the Kura directory. Locked fields are verified by Kura.':
    'អ្វីដែលអ្នកជំងឺឃើញក្នុងបញ្ជីឈ្មោះ Kura។ វាលដែលចាក់សោត្រូវបានផ្ទៀងផ្ទាត់ដោយ Kura។',
  Photo: 'រូបថត',
  'Add photo': 'បន្ថែមរូបថត',
  'Change photo': 'ប្តូររូបថត',
  'Shown on your public profile': 'បង្ហាញលើប្រវត្តិរូបសាធារណៈរបស់អ្នក',
  'Public name & credentials': 'ឈ្មោះសាធារណៈ និងលិខិតសម្គាល់',
  'Credential identifier is not available': 'លេខសម្គាល់លិខិតមិនមាន',
  'From the approved professional credential profile':
    'មកពីប្រវត្តិលិខិតសម្គាល់វិជ្ជាជីវៈដែលបានអនុម័ត',
  'Opening hours': 'ម៉ោងបើកទ្វារ',
  Languages: 'ភាសា',
  'Add language': 'បន្ថែមភាសា',
  'Language name': 'ឈ្មោះភាសា',
  Services: 'សេវាកម្ម',
  'Add service': 'បន្ថែមសេវាកម្ម',
  'Service name': 'ឈ្មោះសេវាកម្ម',
  Bio: 'ប្រវត្តិសង្ខេប',
  'Edit bio': 'កែប្រវត្តិសង្ខេប',
  Reviews: 'ការវាយតម្លៃ',
  'No reviews': 'គ្មានការវាយតម្លៃ',
  'Collected after completed visits': 'ប្រមូលបន្ទាប់ពីការមកពិនិត្យបញ្ចប់',
  '4.8 ★ · 32 reviews': '4.8 ★ · ការវាយតម្លៃ 32',

  /* ---------------------------- directory hours -------------------------- */
  Hours: 'ម៉ោង',
  'Edit hours': 'កែម៉ោង',
  'Hours updated': 'បានធ្វើបច្ចុប្បន្នភាពម៉ោង',
  'Shown to patients in the directory': 'បង្ហាញជូនអ្នកជំងឺក្នុងបញ្ជីឈ្មោះ',
  'Hours preset': 'គំរូម៉ោងសម្រេច',
  Weekdays: 'ថ្ងៃធ្វើការ',
  'Mon to Sat': 'ច័ន្ទ ដល់ សៅរ៍',
  'Custom days': 'ថ្ងៃតាមបំណង',
  Monday: 'ថ្ងៃច័ន្ទ',
  Tuesday: 'ថ្ងៃអង្គារ',
  Wednesday: 'ថ្ងៃពុធ',
  Thursday: 'ថ្ងៃព្រហស្បតិ៍',
  Friday: 'ថ្ងៃសុក្រ',
  Saturday: 'ថ្ងៃសៅរ៍',
  Sunday: 'ថ្ងៃអាទិត្យ',
  'opens at': 'បើកនៅ',
  'closes at': 'បិទនៅ',
  Closed: 'បិទ',
  'Closing time must be after opening time.':
    'ម៉ោងបិទត្រូវតែក្រោយម៉ោងបើក។',

  /* ---------------------------- signed documents ------------------------- */
  'Signing provider, certificate, document profile, and letterhead for this account.':
    'អ្នកផ្តល់សេវាចុះហត្ថលេខា វិញ្ញាបនបត្រ ទម្រង់ឯកសារ និងក្បាលលិខិតសម្រាប់គណនីនេះ។',
  'Every prescription and report is digitally signed. Certificates chain to the CamDX root.':
    'រាល់វេជ្ជបញ្ជា និងរបាយការណ៍ត្រូវចុះហត្ថលេខាឌីជីថល។ វិញ្ញាបនបត្រភ្ជាប់ទៅឫស CamDX។',
  'Signing provider': 'អ្នកផ្តល់សេវាចុះហត្ថលេខា',
  Certificate: 'វិញ្ញាបនបត្រ',
  'Certificate active': 'វិញ្ញាបនបត្រសកម្ម',
  'Active until Mar 2027': 'សកម្មរហូតដល់ Mar 2027',
  Valid: 'មានសុពលភាព',
  'Renews automatically 30 days before expiry':
    'បន្តដោយស្វ័យប្រវត្តិ 30 ថ្ងៃមុនផុតកំណត់',
  'PAdES profile': 'ទម្រង់ PAdES',
  'Long term validation embedded in each PDF':
    'ការផ្ទៀងផ្ទាត់រយៈពេលវែងបង្កប់ក្នុង PDF នីមួយៗ',
  'Recent signatures': 'ហត្ថលេខាថ្មីៗ',
  'No signed documents': 'គ្មានឯកសារដែលបានចុះហត្ថលេខា',
  'Rx / Dx letterhead': 'ក្បាលលិខិត Rx / Dx',
  'Applied to all signed documents':
    'អនុវត្តលើឯកសារដែលបានចុះហត្ថលេខាទាំងអស់',
  Replace: 'ជំនួស',
  'License documents': 'ឯកសារអាជ្ញាបណ្ណ',
  'Professional licence': 'អាជ្ញាបណ្ណវិជ្ជាជីវៈ',
  'Export signing log': 'នាំចេញកំណត់ហេតុហត្ថលេខា',
  'Signing log exported': 'បាននាំចេញកំណត់ហេតុហត្ថលេខា',

  /* -------------------------------- security ----------------------------- */
  'Manage signed-in devices, sensitive changes, and the PHI access log.':
    'គ្រប់គ្រងឧបករណ៍ដែលបានចូល ការផ្លាស់ប្តូររសើប និងកំណត់ហេតុចូលមើលព័ត៌មានអ្នកជំងឺ។',
  'Active sessions': 'វគ្គសកម្ម',
  'Current browser': 'កម្មវិធីរុករកបច្ចុប្បន្ន',
  Current: 'បច្ចុប្បន្ន',
  'This sign-in session': 'វគ្គចូលគណនីនេះ',
  'This device': 'ឧបករណ៍នេះ',
  'Mobile companion': 'ឧបករណ៍ចល័តភ្ជាប់',
  'No other sessions': 'គ្មានវគ្គផ្សេងទៀត',
  'Only this device is signed in': 'មានតែឧបករណ៍នេះទេដែលបានចូល',
  'Require sign-in before sensitive changes':
    'ទាមទារការចូលគណនីមុនការផ្លាស់ប្តូររសើប',
  'Covers PHI exports, bank details, and role changes.':
    'គ្របដណ្តប់ការនាំចេញព័ត៌មានអ្នកជំងឺ ព័ត៌មានធនាគារ និងការប្តូរតួនាទី។',
  'PHI exports are watermarked':
    'ការនាំចេញព័ត៌មានអ្នកជំងឺមានហត្ថលេខាទឹក',
  'Each export includes user and timestamp. Patients can request the access log.':
    'រាល់ការនាំចេញរួមបញ្ចូលអ្នកប្រើ និងពេលវេលា។ អ្នកជំងឺអាចស្នើសុំកំណត់ហេតុចូលមើល។',
  'Recent activity': 'សកម្មភាពថ្មីៗ',
  You: 'អ្នក',
  'Sign out all other sessions': 'ចាកចេញពីវគ្គផ្សេងទាំងអស់',
  'Sign out this session?': 'ចាកចេញពីវគ្គនេះ?',
  'loses access immediately and must sign in again.':
    'នឹងបាត់បង់សិទ្ធិភ្លាមៗ ហើយត្រូវចូលគណនីម្តងទៀត។',
  'Sign out every other session?': 'ចាកចេញពីវគ្គផ្សេងទាំងអស់?',
  'Every device except this one loses access immediately.':
    'ឧបករណ៍ទាំងអស់លើកលែងតែឧបករណ៍នេះ នឹងបាត់បង់សិទ្ធិភ្លាមៗ។',
  'Sign out all': 'ចាកចេញទាំងអស់',
  'Signed out': 'បានចាកចេញ',
  'Signed out all other sessions': 'បានចាកចេញពីវគ្គផ្សេងទាំងអស់',

  /* ------------------------------ shared rows ---------------------------- */
  'Verified by Kura. Not editable': 'ផ្ទៀងផ្ទាត់ដោយ Kura។ មិនអាចកែបាន',
  'None listed': 'គ្មានក្នុងបញ្ជី',
  updated: 'បានធ្វើបច្ចុប្បន្នភាព',
  added: 'បានបន្ថែម',
  restored: 'បានស្តារឡើងវិញ',
  'removed. Undo is available.': 'ត្រូវបានដកចេញ។ អាចមិនធ្វើវិញបាន។',
};
