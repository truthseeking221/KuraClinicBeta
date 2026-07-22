import type { KhmerDictionary } from "../types";

/**
 * The one clinic order cart shared by doctor and receptionist: selected tests,
 * the collection-and-payment decision card, pricing truth, totals, the money
 * attestation, the lifecycle CTA, and the self-draw tube preparation view.
 *
 * Left in Latin on purpose: test and analyte names, ICD-10 codes and titles,
 * receipt and booking identifiers, currency codes (USD, KHR), tender scheme
 * names (KHQR), facility codes (Kura PSC), and the Kura brand.
 */
export const ORDER_CART_KM: KhmerDictionary = {
  // Cart shell
  "Order Cart": "កន្ត្រកការបញ្ជា",
  "Order cart": "កន្ត្រកការបញ្ជា",
  "Doctor order cart": "កន្ត្រកការបញ្ជារបស់វេជ្ជបណ្ឌិត",
  "Receptionist order cart": "កន្ត្រកការបញ្ជារបស់បុគ្គលិកទទួលភ្ញៀវ",
  "Receptionist order summary": "សេចក្តីសង្ខេបការបញ្ជារបស់បុគ្គលិកទទួលភ្ញៀវ",
  "Order cart — tube preparation": "កន្ត្រកការបញ្ជា — ការរៀបចំបំពង់",
  "Order cart for": "កន្ត្រកការបញ្ជាសម្រាប់",
  "Selected tests": "តេស្តដែលបានជ្រើស",
  "Selected items": "ធាតុដែលបានជ្រើស",
  "tests selected": "តេស្តបានជ្រើស",
  "tests in cart": "តេស្តក្នុងកន្ត្រក",
  test: "តេស្ត",
  tests: "តេស្ត",
  empty: "ទទេ",
  "Clear all removable items": "សម្អាតធាតុដែលអាចដកចេញទាំងអស់",
  "Ordered for": "បញ្ជាសម្រាប់",
  "Add your first lab test.": "បន្ថែមតេស្តមន្ទីរពិសោធន៍ដំបូងរបស់អ្នក។",
  "Add an order item to begin.": "បន្ថែមធាតុបញ្ជាដើម្បីចាប់ផ្តើម។",
  "Add first test": "បន្ថែមតេស្តដំបូង",
  members: "សមាជិក",
  input: "ធាតុចូល",

  // Line states
  "Added after payment": "បានបន្ថែមក្រោយការទូទាត់",
  Voided: "បានលុបចោល",

  // Item groups
  Visits: "ការមកពិនិត្យ",
  Imaging: "រូបភាពវេជ្ជសាស្ត្រ",
  Teleconsultation: "ការពិគ្រោះពីចម្ងាយ",

  // Pricing truth
  "Updating prices…": "កំពុងធ្វើបច្ចុប្បន្នភាពតម្លៃ…",
  "Price unavailable": "តម្លៃមិនអាចប្រើបាន",
  "We couldn’t update prices. Your selections are saved.":
    "យើងមិនអាចធ្វើបច្ចុប្បន្នភាពតម្លៃបានទេ។ ជម្រើសរបស់អ្នកត្រូវបានរក្សាទុក។",
  "Retry pricing": "ព្យាយាមកំណត់តម្លៃម្តងទៀត",
  "Prices changed": "តម្លៃបានផ្លាស់ប្តូរ",
  "Review and accept the updated quote before continuing.":
    "ពិនិត្យ និងទទួលយកតម្លៃថ្មីមុននឹងបន្ត។",
  "Accept new price": "ទទួលយកតម្លៃថ្មី",

  // Decision card — doctor
  "Collection & payment": "ការយកសំណាក និងការទូទាត់",
  "collection and payment": "ការយកសំណាក និងការទូទាត់",
  "Not set yet": "មិនទាន់កំណត់",
  "Set up": "រៀបចំ",
  "Who will collect the sample?": "តើអ្នកណាជាអ្នកយកសំណាក?",
  "I will draw the blood now": "ខ្ញុំនឹងចាក់ឈាមឥឡូវនេះ",
  "Kura will draw the blood": "Kura នឹងចាក់ឈាម",
  "Where is the blood drawn?": "តើចាក់ឈាមនៅកន្លែងណា?",
  "Patient Home": "ផ្ទះអ្នកជំងឺ",
  "What is the payment method?": "តើវិធីទូទាត់ជាអ្វី?",
  "Patient will pay you now": "អ្នកជំងឺនឹងបង់ប្រាក់ជូនអ្នកឥឡូវនេះ",
  "Patient will pay later at Kura": "អ្នកជំងឺនឹងបង់ប្រាក់នៅ Kura ពេលក្រោយ",
  "Locked after payment. You can edit later in Booking.":
    "ជាប់សោក្រោយការទូទាត់។ អ្នកអាចកែនៅក្នុង Booking ពេលក្រោយ។",

  // Decision summary (composed as "Kura collection · Patient Home")
  "Clinic draw": "ចាក់ឈាមនៅគ្លីនិក",
  "you collect": "អ្នកជាអ្នកយកសំណាក",
  "Kura collection": "ការយកសំណាកដោយ Kura",
  "Patient pays you now": "អ្នកជំងឺបង់ប្រាក់ជូនអ្នកឥឡូវនេះ",
  "Patient pays later at Kura": "អ្នកជំងឺបង់ប្រាក់នៅ Kura ពេលក្រោយ",
  "Code sent": "បានផ្ញើលេខកូដ",

  // Decision card — receptionist
  payment: "ការទូទាត់",
  "How does the patient pay?": "តើអ្នកជំងឺបង់ប្រាក់ដោយរបៀបណា?",
  Cash: "សាច់ប្រាក់",
  "Cash at the desk": "សាច់ប្រាក់នៅតុទទួល",
  "KHQR transfer": "ផ្ទេរតាម KHQR",
  "Pay later at Kura": "បង់ប្រាក់នៅ Kura ពេលក្រោយ",
  "Payment due at the desk": "ត្រូវបង់ប្រាក់នៅតុទទួល",
  "Locked after payment. Changes route through void or supplemental.":
    "ជាប់សោក្រោយការទូទាត់។ ការផ្លាស់ប្តូរត្រូវធ្វើតាមការលុបចោល ឬការបញ្ជាបន្ថែម។",

  // Totals and money attestation
  Subtotal: "សរុបរង",
  "Shared credit": "ឥណទានរួម",
  "Previously paid": "បានបង់ពីមុន",
  "Patient due": "អ្នកជំងឺត្រូវបង់",
  "Estimated earnings": "ចំណូលប៉ាន់ស្មាន",
  "How earnings are calculated": "របៀបគណនាចំណូល",
  "Calculated per test from eligible net prices after discounts.":
    "គណនាតាមតេស្តនីមួយៗពីតម្លៃសុទ្ធដែលមានសិទ្ធិ បន្ទាប់ពីការបញ្ចុះតម្លៃ។",
  "Earnings basis": "មូលដ្ឋានគណនាចំណូល",
  Commission: "អត្រាកម្រៃជើងសារ",
  "Varies by test": "ខុសគ្នាតាមតេស្ត",
  "Estimated total": "សរុបប៉ាន់ស្មាន",
  "Added to your Kura balance when the tests are completed.":
    "នឹងបញ្ចូលទៅសមតុល្យ Kura របស់អ្នក នៅពេលតេស្តបានបញ្ចប់។",
  "This is the amount your practice keeps. Kura’s share is settled after completion.":
    "នេះជាចំនួនដែលគ្លីនិករបស់អ្នករក្សាទុក។ ចំណែករបស់ Kura នឹងត្រូវទូទាត់ក្រោយពេលបញ្ចប់។",
  "Final earnings are settled after the tests are completed.":
    "ចំណូលចុងក្រោយនឹងត្រូវទូទាត់ក្រោយពេលតេស្តបានបញ្ចប់។",
  "I have collected": "ខ្ញុំបានទទួល",
  "via cash or KHQR": "តាមសាច់ប្រាក់ ឬ KHQR",

  // Tube preparation (doctor self-draw)
  "Back to cart": "ត្រឡប់ទៅកន្ត្រក",
  "You need to prepare tubes for": "អ្នកត្រូវរៀបចំបំពង់សម្រាប់",
  "Choose preparation method": "ជ្រើសរើសវិធីរៀបចំ",
  Ready: "រួចរាល់",
  scanned: "បានស្កេន",
  Scanned: "បានស្កេន",
  "Mark scanned": "សម្គាល់ថាបានស្កេន",
  "Scan every tube first": "សូមស្កេនបំពង់ទាំងអស់ជាមុនសិន",

  // Primary action (lifecycle CTA)
  "Prepare Tubes": "រៀបចំបំពង់",
  "Confirm collection & scan": "បញ្ជាក់ការយកសំណាក និងការស្កេន",
  "Collection confirmed": "បានបញ្ជាក់ការយកសំណាក",
  "Send booking code": "ផ្ញើលេខកូដកក់",
  "Track home collection": "តាមដានការយកសំណាកនៅផ្ទះ",
  "Check in & confirm order": "ចុះឈ្មោះចូល និងបញ្ជាក់ការបញ្ជា",
  "Confirm payment & check in": "បញ្ជាក់ការទូទាត់ និងចុះឈ្មោះចូល",
  "Patient checked in": "អ្នកជំងឺបានចុះឈ្មោះចូល",

  // Why the action is blocked
  "Add at least one test.": "បន្ថែមតេស្តយ៉ាងតិចមួយ។",
  "Add at least one item.": "បន្ថែមធាតុយ៉ាងតិចមួយ។",
  "Record a working diagnosis in the assessment first.":
    "កត់ត្រារោគវិនិច្ឆ័យបណ្តោះអាសន្នក្នុងការវាយតម្លៃជាមុនសិន។",
  "Set up collection & payment first.": "រៀបចំការយកសំណាក និងការទូទាត់ជាមុនសិន។",
  "Verify the clinician licence to place this order.":
    "ផ្ទៀងផ្ទាត់អាជ្ញាបណ្ណវេជ្ជបណ្ឌិតដើម្បីដាក់ការបញ្ជានេះ។",
  "Confirm you collected the payment first.":
    "បញ្ជាក់ថាអ្នកបានទទួលប្រាក់ជាមុនសិន។",
  "Choose a payment method first.": "ជ្រើសរើសវិធីទូទាត់ជាមុនសិន។",
  "Confirm the payment was collected first.": "បញ្ជាក់ថាបានទទួលប្រាក់ជាមុនសិន។",
  "Payment collection is not permitted for this role.":
    "តួនាទីនេះមិនអនុញ្ញាតឱ្យទទួលប្រាក់ទេ។",
  "Check-in confirmation is not permitted for this role.":
    "តួនាទីនេះមិនអនុញ្ញាតឱ្យបញ្ជាក់ការចុះឈ្មោះចូលទេ។",
  "You do not have access to continue this order.":
    "អ្នកគ្មានសិទ្ធិបន្តការបញ្ជានេះទេ។",
  "This order is read only for your current access.":
    "ការបញ្ជានេះអានបានតែប៉ុណ្ណោះសម្រាប់សិទ្ធិបច្ចុប្បន្នរបស់អ្នក។",
  "Prices are still updating.": "តម្លៃកំពុងធ្វើបច្ចុប្បន្នភាព។",
  "Review and accept the updated prices first.":
    "ពិនិត្យ និងទទួលយកតម្លៃថ្មីជាមុនសិន។",
  "Retry pricing before continuing.": "ព្យាយាមកំណត់តម្លៃម្តងទៀតមុននឹងបន្ត។",
  "No eligible prescriber for this order":
    "គ្មានអ្នកចេញវេជ្ជបញ្ជាមានសិទ្ធិសម្រាប់ការបញ្ជានេះ",
  "Choose prescriber": "ជ្រើសរើសអ្នកចេញវេជ្ជបញ្ជា",

  // Engine suggestions
  "Keep as is": "ទុកដដែល",
};
