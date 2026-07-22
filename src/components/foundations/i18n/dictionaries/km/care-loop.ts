import type { KhmerDictionary } from '../types';

/**
 * The executable care loop: adding a patient, collecting the intake, then the
 * lab order, draw, labelling, and courier handoff.
 *
 * Test names, tube colours, order and booking references, specimen IDs, and
 * patient-reported answers stay in English. What is translated is the
 * instruction around them — especially the custody and identity warnings,
 * which must read as clearly in Khmer as in English.
 */
export const CARE_LOOP_KM: KhmerDictionary = {
  // Frame
  Restart: 'ចាប់ផ្តើមឡើងវិញ',
  'Current patient': 'អ្នកជំងឺបច្ចុប្បន្ន',
  'Journey progress': 'វឌ្ឍនភាពដំណើរ',
  Step: 'ជំហាន',
  'Pending verification': 'កំពុងរង់ចាំការផ្ទៀងផ្ទាត់',

  // Adding a patient
  'Add a patient': 'បន្ថែមអ្នកជំងឺ',
  'Add your first patient': 'បន្ថែមអ្នកជំងឺដំបូងរបស់អ្នក',
  'Enter a contact number to get started.': 'បញ្ចូលលេខទំនាក់ទំនងដើម្បីចាប់ផ្តើម។',
  'Enter contact number': 'បញ្ចូលលេខទំនាក់ទំនង',
  'Provisional · PSC verifies': 'បណ្តោះអាសន្ន · PSC ផ្ទៀងផ្ទាត់',
  'Not recorded': 'មិនបានកត់ត្រា',

  // Intake handoff
  'Intake received for': 'បានទទួលព័ត៌មានចូលសម្រាប់',
  'is filling in the intake': 'កំពុងបំពេញព័ត៌មានចូល',
  'Intake sent, waiting for': 'បានផ្ញើព័ត៌មានចូល កំពុងរង់ចាំ',
  'Sending intake link': 'កំពុងផ្ញើតំណព័ត៌មានចូល',
  'Intake link was not sent': 'តំណព័ត៌មានចូលមិនត្រូវបានផ្ញើទេ',
  'We don’t know enough about': 'យើងមិនទាន់ដឹងព័ត៌មានគ្រប់គ្រាន់អំពី',
  yet: 'នៅឡើយទេ',
  '4 of 4 answered. Confirm what matters during the visit.':
    'បានឆ្លើយ 4 ក្នុងចំណោម 4។ បញ្ជាក់អ្វីដែលសំខាន់ក្នុងពេលពិនិត្យ។',
  answered: 'បានឆ្លើយ',
  opened: 'បានបើក',
  'The patient context is saved. Check the delivery channel, then try again.':
    'បរិបទអ្នកជំងឺត្រូវបានរក្សាទុក។ ពិនិត្យបណ្តាញផ្ញើ រួចព្យាយាមម្តងទៀត។',
  'Help the patient complete their medical history before the visit, so the clinical conversation can focus on care.':
    'ជួយអ្នកជំងឺបំពេញប្រវត្តិវេជ្ជសាស្ត្រមុនពេលមកពិនិត្យ ដើម្បីឱ្យការសន្ទនាព្យាបាលផ្តោតលើការថែទាំ។',
  'Order baseline tests': 'បញ្ជាតេស្តមូលដ្ឋាន',
  'Skip for now': 'រំលងសិន',
  'Skipping intake is not connected to the current backend contract.':
    'ការរំលងព័ត៌មានចូលមិនទាន់ភ្ជាប់ជាមួយកិច្ចសន្យាខាងក្រោយបច្ចុប្បន្នទេ។',
  Sending: 'កំពុងផ្ញើ',
  Resend: 'ផ្ញើម្តងទៀត',
  'Send intake link': 'ផ្ញើតំណព័ត៌មានចូល',
  'is waiting': 'កំពុងរង់ចាំ',
  'Waiting…': 'កំពុងរង់ចាំ…',
  'intake answers received': 'ចម្លើយព័ត៌មានចូលបានទទួល',
  'Patient lab order journey': 'ដំណើរបញ្ជាតេស្តអ្នកជំងឺ',
  'Patient intake status': 'ស្ថានភាពព័ត៌មានចូលអ្នកជំងឺ',

  // Intake items and context rail. `Reason for visit` is owned by the
  // assessment dictionary: both surfaces ask the same question, so one English
  // string keeps one Khmer rendering.
  'Drug allergies': 'អាឡែស៊ីថ្នាំ',
  'Current medications': 'ថ្នាំកំពុងប្រើ',
  'Family & medical history': 'ប្រវត្តិគ្រួសារ និងវេជ្ជសាស្ត្រ',
  'Active problems': 'បញ្ហាសកម្ម',
  'No active problems recorded.': 'គ្មានបញ្ហាសកម្មត្រូវបានកត់ត្រាទេ។',
  'Patient reports no current medications.': 'អ្នកជំងឺរាយការណ៍ថាមិនប្រើថ្នាំណាមួយទេ។',
  'Medication history not yet confirmed.': 'ប្រវត្តិប្រើថ្នាំមិនទាន់បានបញ្ជាក់ទេ។',
  'Patient reported · not clinically verified':
    'អ្នកជំងឺរាយការណ៍ · មិនទាន់ផ្ទៀងផ្ទាត់ដោយវេជ្ជសាស្ត្រ',
  'Identity confirmation': 'ការបញ្ជាក់អត្តសញ្ញាណ',
  'PSC verifies before draw': 'PSC ផ្ទៀងផ្ទាត់មុនពេលយកឈាម',
  'No verification task is recorded.': 'គ្មានភារកិច្ចផ្ទៀងផ្ទាត់ត្រូវបានកត់ត្រាទេ។',
  'Past history': 'ប្រវត្តិពីមុន',
  'Patient reports no relevant history.': 'អ្នកជំងឺរាយការណ៍ថាគ្មានប្រវត្តិពាក់ព័ន្ធទេ។',
  'Medical history not yet confirmed.': 'ប្រវត្តិវេជ្ជសាស្ត្រមិនទាន់បានបញ្ជាក់ទេ។',
  'Admin details': 'ព័ត៌មានរដ្ឋបាល',
  'Not available in this prototype.': 'មិនមានក្នុងគំរូនេះទេ។',
  'Patient reports no known allergies': 'អ្នកជំងឺរាយការណ៍ថាគ្មានអាឡែស៊ីដែលដឹងទេ',
  'Allergy status not yet confirmed': 'ស្ថានភាពអាឡែស៊ីមិនទាន់បានបញ្ជាក់ទេ',
  'Confirm during intake.': 'បញ្ជាក់ក្នុងពេលទទួលព័ត៌មានចូល។',

  // Patient-facing intake form
  'Health intake': 'ព័ត៌មានសុខភាព',
  'Before your care continues': 'មុនពេលការថែទាំរបស់អ្នកបន្ត',
  'Tell us about your health': 'ប្រាប់យើងអំពីសុខភាពរបស់អ្នក',
  'Your care team will review your answers before continuing your care.':
    'ក្រុមថែទាំរបស់អ្នកនឹងពិនិត្យចម្លើយរបស់អ្នក មុនពេលបន្តការថែទាំ។',
  'Your details': 'ព័ត៌មានរបស់អ្នក',
  'Date of birth or age': 'ថ្ងៃខែឆ្នាំកំណើត ឬអាយុ',
  'I confirm these personal details are correct.':
    'ខ្ញុំបញ្ជាក់ថាព័ត៌មានផ្ទាល់ខ្លួនទាំងនេះត្រឹមត្រូវ។',
  'Enter allergies or none known': 'បញ្ចូលអាឡែស៊ី ឬសរសេរថាគ្មានដែលដឹង',
  'Current medicines': 'ថ្នាំកំពុងប្រើ',
  'Enter medicines or none': 'បញ្ចូលឈ្មោះថ្នាំ ឬសរសេរថាគ្មាន',
  'Current symptoms': 'រោគសញ្ញាបច្ចុប្បន្ន',
  'Describe the reason for seeking care': 'ពិពណ៌នាមូលហេតុដែលអ្នកមករកការថែទាំ',
  'Family history': 'ប្រវត្តិគ្រួសារ',
  'Enter relevant family history or none known':
    'បញ្ចូលប្រវត្តិគ្រួសារពាក់ព័ន្ធ ឬសរសេរថាគ្មានដែលដឹង',
  'Confirm your details and complete every field to submit.':
    'បញ្ជាក់ព័ត៌មានរបស់អ្នក និងបំពេញគ្រប់ប្រអប់ ដើម្បីដាក់ស្នើ។',
  'Submit medical history': 'ដាក់ស្នើប្រវត្តិវេជ្ជសាស្ត្រ',

  // Route stages and actors
  'Lab order and sample collection': 'ការបញ្ជាតេស្ត និងការយកសំណាក',
  'Lab order': 'ការបញ្ជាតេស្ត',
  'Close lab order journey': 'បិទដំណើរបញ្ជាតេស្ត',
  'Payment and check-in': 'ការទូទាត់ និងការចុះឈ្មោះចូល',
  'Positive ID and draw': 'ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ និងការយកឈាម',
  'Label samples': 'ដាក់ស្លាកលើសំណាក',
  Handoff: 'ការប្រគល់',
  'Await lab receipt': 'រង់ចាំមន្ទីរពិសោធន៍ទទួល',
  'Book home visit': 'កក់ការមកពិនិត្យតាមផ្ទះ',
  Receptionist: 'បុគ្គលិកទទួលភ្ញៀវ',
  Phlebotomist: 'អ្នកយកឈាម',
  'Kura phlebotomist': 'អ្នកយកឈាម Kura',
  Collector: 'អ្នកយកសំណាក',
  'Clinic and courier': 'គ្លីនិក និងអ្នកដឹកជញ្ជូន',
  Kura: 'Kura',

  // Ordering and payment
  'Choose baseline tests': 'ជ្រើសរើសតេស្តមូលដ្ឋាន',
  selected: 'បានជ្រើសរើស',
  'Collect payment and check in': 'ទទួលការទូទាត់ និងចុះឈ្មោះចូល',
  'The doctor-authored tests are locked. Reception records the tender and confirms check-in without changing clinical intent.':
    'តេស្តដែលវេជ្ជបណ្ឌិតបានបញ្ជាត្រូវបានចាក់សោ។ តុទទួលកត់ត្រាការទូទាត់ និងបញ្ជាក់ការចុះឈ្មោះចូល ដោយមិនផ្លាស់ប្តូរចេតនាព្យាបាល។',

  // Home visit
  'Home visit booked': 'បានកក់ការមកពិនិត្យតាមផ្ទះ',
  'A Kura phlebotomist travels to the patient. No sample exists yet, and the order stays awaiting collection until the visit happens.':
    'អ្នកយកឈាម Kura ធ្វើដំណើរទៅរកអ្នកជំងឺ។ មិនទាន់មានសំណាកទេ ហើយការបញ្ជានៅតែរង់ចាំការយកសំណាក រហូតដល់ការមកពិនិត្យកើតឡើង។',
  'Awaiting collection': 'កំពុងរង់ចាំការយកសំណាក',
  'Visit scheduled with the patient': 'បានកំណត់ពេលមកពិនិត្យជាមួយអ្នកជំងឺ',
  'The patient keeps the booking code. Payment is settled at the visit, so a booked home visit is not a paid one.':
    'អ្នកជំងឺរក្សាទុកកូដកក់។ ការទូទាត់ធ្វើឡើងនៅពេលមកពិនិត្យ ដូច្នេះការកក់មកពិនិត្យតាមផ្ទះមិនមែនជាការបង់ប្រាក់រួចទេ។',
  'Phlebotomist arrived, start the draw': 'អ្នកយកឈាមមកដល់ ចាប់ផ្តើមយកឈាម',

  // Identity gate
  'Verify identity before collection': 'ផ្ទៀងផ្ទាត់អត្តសញ្ញាណមុនពេលយកសំណាក',
  'This order can remain pending, but collection cannot start until the patient has a confirmed patient ID, date of birth, and sex. Do not create or label specimens from incomplete demographics.':
    'ការបញ្ជានេះអាចនៅរង់ចាំបាន ប៉ុន្តែការយកសំណាកមិនអាចចាប់ផ្តើមបានទេ រហូតដល់អ្នកជំងឺមានលេខសម្គាល់អ្នកជំងឺ ថ្ងៃខែឆ្នាំកំណើត និងភេទដែលបានបញ្ជាក់។ កុំបង្កើត ឬដាក់ស្លាកសំណាកពីព័ត៌មានប្រជាសាស្ត្រមិនពេញលេញ។',
  'Return to patient record': 'ត្រឡប់ទៅកំណត់ត្រាអ្នកជំងឺ',

  // Labelling
  'Label the tubes you drew': 'ដាក់ស្លាកលើបំពង់ដែលអ្នកបានយក',
  'The draw is recorded. Match every tube to': 'ការយកឈាមត្រូវបានកត់ត្រា។ ផ្គូផ្គងបំពង់នីមួយៗនឹង',
  and: 'និង',
  'before custody can change.': 'មុនពេលការកាន់កាប់អាចប្តូរបាន។',
  'Open draw worksheet': 'បើកសន្លឹកកិច្ចការយកឈាម',

  // Handoff
  'Collection complete': 'ការយកសំណាករួចរាល់',
  'Prepare samples for pickup': 'រៀបចំសំណាកសម្រាប់ការមកយក',
  'Match the physical specimens to': 'ផ្គូផ្គងសំណាកជាក់ស្តែងនឹង',
  'before custody changes.': 'មុនពេលការកាន់កាប់ប្តូរ។',
  Collected: 'បានយករួច',
  tubes: 'បំពង់',
  'Patient ID': 'លេខសម្គាល់អ្នកជំងឺ',
  'Pickup round': 'វេនមកយក',
  'Choose a pickup round': 'ជ្រើសរើសវេនមកយក',
  '10:30 · Morning pickup': '10:30 · ការមកយកពេលព្រឹក',
  '14:00 · Afternoon pickup': '14:00 · ការមកយកពេលរសៀល',
  '17:30 · Final pickup': '17:30 · ការមកយកចុងក្រោយ',
  'Tube labels match the patient and order.': 'ស្លាកបំពង់ត្រូវនឹងអ្នកជំងឺ និងការបញ្ជា។',
  'Tube count matches the handoff summary.': 'ចំនួនបំពង់ត្រូវនឹងសេចក្តីសង្ខេបនៃការប្រគល់។',
  'Specimen bag is sealed for transport.': 'កាបូបសំណាកត្រូវបានបិទជិតសម្រាប់ដឹកជញ្ជូន។',
  'Labels do not match': 'ស្លាកមិនត្រូវគ្នា',
  'Mark samples ready': 'សម្គាល់ថាសំណាករួចរាល់',

  // Label mismatch
  'Do not hand off these tubes': 'កុំប្រគល់បំពង់ទាំងនេះ',
  'A label does not match': 'ស្លាកមួយមិនត្រូវនឹង',
  or: 'ឬ',
  'Keep custody with the collector and correct every affected tube before trying again.':
    'រក្សាការកាន់កាប់ជាមួយអ្នកយកសំណាក និងកែតម្រូវបំពង់ដែលរងផលប៉ះពាល់គ្រប់បំពង់ មុនពេលព្យាយាមម្តងទៀត។',
  'Return to labeling': 'ត្រឡប់ទៅការដាក់ស្លាក',

  // Pickup
  'Samples ready for the': 'សំណាករួចរាល់សម្រាប់',
  pickup: 'ការមកយក',
  'sealed tubes are waiting at the collection handoff point. Custody remains with the clinic until pickup is recorded.':
    'បំពង់ដែលបិទជិតកំពុងរង់ចាំនៅចំណុចប្រគល់សំណាក។ ការកាន់កាប់នៅតែជាមួយគ្លីនិក រហូតដល់ការមកយកត្រូវបានកត់ត្រា។',
  'Report pickup issue': 'រាយការណ៍បញ្ហាការមកយក',
  'Record courier pickup': 'កត់ត្រាការមកយករបស់អ្នកដឹកជញ្ជូន',
  'Courier pickup is delayed': 'ការមកយករបស់អ្នកដឹកជញ្ជូនយឺត',
  'Custody remains with the clinic. Keep the sealed samples in controlled storage and choose another pickup round; do not mark them as collected by the courier.':
    'ការកាន់កាប់នៅតែជាមួយគ្លីនិក។ រក្សាសំណាកដែលបិទជិតក្នុងកន្លែងផ្ទុកមានការគ្រប់គ្រង និងជ្រើសរើសវេនមកយកផ្សេង។ កុំសម្គាល់ថាអ្នកដឹកជញ្ជូនបានយករួច។',
  'Choose another pickup round': 'ជ្រើសរើសវេនមកយកផ្សេង',

  // Awaiting results
  'Awaiting results': 'កំពុងរង់ចាំលទ្ធផល',
  'Courier picked up the samples': 'អ្នកដឹកជញ្ជូនបានយកសំណាក',
  'The order stays pending until the laboratory records receipt and releases results.':
    'ការបញ្ជានៅតែរង់ចាំ រហូតដល់មន្ទីរពិសោធន៍កត់ត្រាការទទួល និងចេញលទ្ធផល។',
  'Laboratory progress': 'វឌ្ឍនភាពមន្ទីរពិសោធន៍',
  'Picked up': 'បានយករួច',
  'Lab received': 'មន្ទីរពិសោធន៍បានទទួល',
  Waiting: 'កំពុងរង់ចាំ',
  Processing: 'កំពុងដំណើរការ',
  'Not started': 'មិនទាន់ចាប់ផ្តើម',
  'Not released': 'មិនទាន់ចេញផ្សាយ',
};
