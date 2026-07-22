import type { KhmerDictionary } from '../types';

/**
 * Collection mode: booth entry, vitals capture, the phlebotomy draw worksheet,
 * deferral, and tube labelling.
 *
 * Left in Latin on purpose, because a phlebotomist matches them against a
 * printed label, a physical rack, or a barcode: tube stopper names (Lavender,
 * Gold / SST), specimen and tube barcodes, analyte names (CBC, HbA1c), STAT,
 * SpO₂, and every unit (mL, cm, kg, bpm, mmHg, °C, %, /min).
 */
export const COLLECTION_KM: KhmerDictionary = {
  // Station entry (scan gate)
  'Vital signs station': 'ស្ថានីយសញ្ញាជីវិត',
  'Phlebotomy station': 'ស្ថានីយចាក់ឈាម',
  'Scan patient barcode': 'ស្កេនបាកូដអ្នកជំងឺ',
  'Hand-scan the printed bill, or type the patient ID.':
    'ស្កេនវិក្កយបត្រដែលបានបោះពុម្ព ឬវាយបញ្ចូលលេខអ្នកជំងឺ។',
  'Patient ID': 'លេខសម្គាល់អ្នកជំងឺ',
  'Format looks off — expected e.g. P123456.': 'ទម្រង់មិនត្រឹមត្រូវ — ត្រូវការដូចជា P123456។',
  'No patient for': 'គ្មានអ្នកជំងឺសម្រាប់',
  'look up': 'ស្វែងរក',
  'clear — the scanner sends both for you': 'សម្អាត — ម៉ាស៊ីនស្កេនផ្ញើទាំងពីរជូនអ្នក',
  'Browse queue': 'មើលជួររង់ចាំ',
  'Waiting patients': 'អ្នកជំងឺកំពុងរង់ចាំ',
  'Queue is clear.': 'ជួររង់ចាំទំនេរ។',
  min: 'នាទី',

  // Pre-draw safety checklist
  'Pre-draw safety checklist': 'បញ្ជីត្រួតពិនិត្យសុវត្ថិភាពមុនចាក់ឈាម',
  'Before the draw': 'មុនចាក់ឈាម',
  confirmed: 'បានបញ្ជាក់',
  'Patient ID confirmed': 'បានបញ្ជាក់អត្តសញ្ញាណអ្នកជំងឺ',
  'Fasting status checked': 'បានពិនិត្យស្ថានភាពតមអាហារ',
  'Allergies reviewed': 'បានពិនិត្យអាឡែស៊ី',
  'Patient consented': 'អ្នកជំងឺបានយល់ព្រម',
  'Site confirmed (L/R arm)': 'បានបញ្ជាក់ទីតាំង (ដៃឆ្វេង/ស្តាំ)',
  Arm: 'ដៃ',
  'Left arm': 'ដៃឆ្វេង',
  'Right arm': 'ដៃស្តាំ',
  Site: 'ទីតាំង',
  'Antecubital fossa': 'ប្រហោងកែងដៃ',
  Forearm: 'កំភួនដៃ',
  'Dorsal hand': 'ខ្នងដៃ',

  // Sample table
  'Draw order': 'លំដាប់ចាក់ឈាម',
  Tube: 'បំពង់',
  'Sample ID': 'លេខសំណាក',
  Vol: 'បរិមាណ',
  Priority: 'អាទិភាព',
  Inversion: 'ការត្រឡប់',
  'Clot time': 'ពេលកំណត់',
  Actions: 'សកម្មភាព',
  'after draw': 'ក្រោយចាក់ឈាម',
  Invert: 'ត្រឡប់',
  Exceeded: 'ហួសពេល',
  // Sample statuses match the care-loop rendering: one English string, one
  // Khmer rendering across the product.
  'Awaiting collection': 'កំពុងរង់ចាំការយកសំណាក',
  Collected: 'បានយករួច',
  Deferred: 'បានពន្យារ',
  Collect: 'យកសំណាក',
  Defer: 'ពន្យារ',
  'Complete the safety checklist first': 'សូមបំពេញបញ្ជីត្រួតពិនិត្យសុវត្ថិភាពជាមុនសិន',

  // Deferral
  'Defer this draw?': 'ពន្យារការចាក់ឈាមនេះ?',
  'The tube stays on the worklist for the next attempt.':
    'បំពង់នៅតែក្នុងបញ្ជីការងារសម្រាប់ការព្យាយាមលើកក្រោយ។',
  'Choose a reason before saving the deferral.': 'ជ្រើសរើសមូលហេតុមុននឹងរក្សាទុកការពន្យារ។',
  'Select a reason': 'ជ្រើសរើសមូលហេតុ',
  'Note for the next attempt (optional)': 'កំណត់ចំណាំសម្រាប់ការព្យាយាមលើកក្រោយ (ស្រេចចិត្ត)',
  'Add context for the next attempt…': 'បន្ថែមព័ត៌មានសម្រាប់ការព្យាយាមលើកក្រោយ…',
  'Defer draw': 'ពន្យារការចាក់ឈាម',
  'Patient refused': 'អ្នកជំងឺបដិសេធ',
  'Difficult vein': 'សរសៃឈាមពិបាក',
  'Insufficient volume': 'បរិមាណមិនគ្រប់',
  'Revisit later': 'ត្រឡប់មកម្តងទៀតពេលក្រោយ',

  // Draw worksheet
  'Vital signs not yet recorded': 'មិនទាន់បានកត់ត្រាសញ្ញាជីវិត',
  'You can continue, or send the patient to the vital signs booth first.':
    'អ្នកអាចបន្ត ឬបញ្ជូនអ្នកជំងឺទៅកន្លែងវាស់សញ្ញាជីវិតជាមុនសិន។',
  'Continue anyway': 'បន្តទោះជាយ៉ាងណា',
  'Mark done at another booth': 'សម្គាល់ថារួចរាល់នៅកន្លែងផ្សេង',
  'Scan tube barcode': 'ស្កេនបាកូដបំពង់',
  'Scan tube barcode — collects, or focuses if already done':
    'ស្កេនបាកូដបំពង់ — យកសំណាក ឬចង្អុលបង្ហាញបើធ្វើរួចហើយ',
  'Mark all collected': 'សម្គាល់ថាបានយកទាំងអស់',
  'All open samples marked collected — confirm inversions next':
    'សំណាកដែលនៅសល់ទាំងអស់ត្រូវបានសម្គាល់ថាយករួច — បន្ទាប់សូមបញ្ជាក់ការត្រឡប់',
  'Override inversion confirmation': 'រំលងការបញ្ជាក់ការត្រឡប់',
  tube: 'បំពង់',
  tubes: 'បំពង់',
  'not yet confirmed inverted — skipping inversions can clot the sample. Only override if already done on the bench.':
    'មិនទាន់បញ្ជាក់ការត្រឡប់ — ការរំលងការត្រឡប់អាចធ្វើឱ្យសំណាកកកឈាម។ រំលងតែក្នុងករណីបានធ្វើរួចនៅតុការងារប៉ុណ្ណោះ។',
  collected: 'បានយក',
  'Save draft': 'រក្សាទុកសេចក្តីព្រាង',
  'Submit collection & next patient': 'ដាក់ស្នើការយកសំណាក និងអ្នកជំងឺបន្ទាប់',
  'Collect or resolve every tube first': 'សូមយក ឬដោះស្រាយបំពង់ទាំងអស់ជាមុនសិន',
  'No sample matches': 'គ្មានសំណាកត្រូវនឹង',
  'already handled — focused in the worksheet':
    'បានដោះស្រាយរួចហើយ — បានចង្អុលបង្ហាញក្នុងសន្លឹកកិច្ចការ',
  'Complete the safety checklist before collecting.':
    'សូមបំពេញបញ្ជីត្រួតពិនិត្យសុវត្ថិភាពមុនយកសំណាក។',
  'Inversion confirmed for': 'បានបញ្ជាក់ការត្រឡប់សម្រាប់',
  'back to awaiting collection': 'ត្រឡប់ទៅរង់ចាំការយកសំណាក',

  // Vitals capture
  Biometrics: 'រង្វាស់រាងកាយ',
  Height: 'កម្ពស់',
  Weight: 'ទម្ងន់',
  Underweight: 'ស្គមពេក',
  Overweight: 'លើសទម្ងន់',
  Obese: 'ធាត់ខ្លាំង',
  Vitals: 'សញ្ញាជីវិត',
  'Heart rate': 'ចង្វាក់បេះដូង',
  'BP systolic': 'សម្ពាធឈាមខាងលើ',
  'BP diastolic': 'សម្ពាធឈាមខាងក្រោម',
  Temperature: 'សីតុណ្ហភាព',
  'Temperature unit': 'ឯកតាសីតុណ្ហភាព',
  'Breathing rate': 'ចង្វាក់ដកដង្ហើម',
  Pain: 'ការឈឺចាប់',
  'Pain (VAS 0–10)': 'ការឈឺចាប់ (VAS 0–10)',
  'Pain score': 'ពិន្ទុឈឺចាប់',
  'No pain': 'មិនឈឺ',
  Mild: 'ស្រាល',
  Moderate: 'មធ្យម',
  Severe: 'ធ្ងន់',
  Worst: 'ធ្ងន់បំផុត',
  'Fasting status': 'ស្ថានភាពតមអាហារ',
  'Not fasting': 'មិនតមអាហារ',
  'Fasting < 8h': 'តមអាហារ < 8h',
  'Fasting 8–12h': 'តមអាហារ 8–12h',
  'Fasting ≥ 12h': 'តមអាហារ ≥ 12h',
  'Outside typical range': 'ក្រៅចន្លោះធម្មតា',
  'Confirm abnormal values': 'បញ្ជាក់តម្លៃមិនធម្មតា',
  field: 'ចំណុច',
  fields: 'ចំណុច',
  'outside typical range': 'ក្រៅចន្លោះធម្មតា',
  'Clear form': 'សម្អាតទម្រង់',
  'Submit & next patient': 'ដាក់ស្នើ និងអ្នកជំងឺបន្ទាប់',

  // Tube labelling
  'Label the tubes': 'ដាក់ស្លាកលើបំពង់',
  sample: 'សំណាក',
  samples: 'សំណាក',
  'Collected tubes': 'បំពង់ដែលបានយក',
  'How will you label them?': 'តើអ្នកនឹងដាក់ស្លាកដោយរបៀបណា?',
  'The order identity stays machine-readable for the courier and the lab.':
    'អត្តសញ្ញាណនៃការបញ្ជានៅតែអាចអានដោយម៉ាស៊ីន សម្រាប់អ្នកដឹកជញ្ជូន និងមន្ទីរពិសោធន៍។',
  'Use the Kura sticker pad': 'ប្រើស្លាក Kura',
  Recommended: 'ណែនាំ',
  'Write clearly on every tube. The courier checks the labels before pickup, and an unreadable tube is rejected at the lab.':
    'សរសេរឱ្យច្បាស់លើបំពង់នីមួយៗ។ អ្នកដឹកជញ្ជូនពិនិត្យស្លាកមុនយកទៅ ហើយបំពង់ដែលអានមិនច្បាស់នឹងត្រូវបដិសេធនៅមន្ទីរពិសោធន៍។',
  'Write with a pen': 'សរសេរដោយប៊ិច',
  'Write on each tube': 'សរសេរលើបំពង់នីមួយៗ',
  'Photograph the labelled tubes': 'ថតរូបបំពង់ដែលបានដាក់ស្លាក',
  'A Kura sticker is on every tube': 'ស្លាក Kura មាននៅលើបំពង់នីមួយៗ',
  'The name and date read clearly in the photo': 'ឈ្មោះ និងកាលបរិច្ឆេទអានបានច្បាស់ក្នុងរូបថត',
  'Photo of the labelled tubes attached to the order':
    'រូបថតបំពង់ដែលបានដាក់ស្លាក ត្រូវបានភ្ជាប់ជាមួយការបញ្ជា',
  'Confirm the photo evidence before the tubes leave the room.':
    'បញ្ជាក់ភស្តុតាងរូបថតមុនបំពង់ចេញពីបន្ទប់។',
  'I have labelled the tube': 'ខ្ញុំបានដាក់ស្លាកលើបំពង់រួចហើយ',
  'I have labelled all': 'ខ្ញុំបានដាក់ស្លាកគ្រប់',
};
