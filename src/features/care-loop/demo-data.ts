import { FIGMA_TESTS, cartWith } from '../order-cart/demo-data';
import type { OrderCartItem } from '../order-cart/types';
import type { CollectionPatient } from '../collection/types';

export const CARE_LOOP_PATIENT = {
  id: 'patient-sok-nimol',
  pid: 'P8842',
  name: 'Sok Nimol',
  initials: 'SN',
  sex: 'M' as const,
  sexLabel: 'Male',
  age: 32,
  dob: '1994-02-18',
  phone: '+85599111222',
  orderId: 'ORD-58291',
};

const CATALOG_ID_BY_FIGMA_ITEM_ID: Record<string, string> = {
  'iron-panel': 'iron-panel',
  ferritin: 'ferritin',
  'cystatin-c': 'cystatin-c',
  'serum-calcium': 'serum-calcium',
  electrolytes: 'electrolytes-panel',
  'urea-bun': 'urea-bun',
  cbc: 'cbc',
  haptoglobin: 'haptoglobin',
  'free-t3': 'free-t3',
  'hs-crp': 'hs-crp',
};

/**
 * One deterministic order manifest for the executable journey. The source
 * board's urine tests are intentionally excluded until Collection owns a
 * canonical urine-container contract; every selected test here maps to one of
 * the four blood tubes below.
 */
export const CARE_LOOP_CART_ITEMS: OrderCartItem[] = FIGMA_TESTS.flatMap((item) => {
  const catalogId = CATALOG_ID_BY_FIGMA_ITEM_ID[item.id];
  return catalogId ? [{ ...item, id: catalogId }] : [];
});

export const CARE_LOOP_SELECTED_TEST_IDS = CARE_LOOP_CART_ITEMS.map((item) => item.id);

export function careLoopCart(items: OrderCartItem[] = CARE_LOOP_CART_ITEMS) {
  return cartWith(items, {
    id: 'cart-ord-58291',
    reference: CARE_LOOP_PATIENT.orderId,
    patient: {
      id: CARE_LOOP_PATIENT.id,
      name: CARE_LOOP_PATIENT.name,
      identifier: CARE_LOOP_PATIENT.pid,
      demographicLabel: `${CARE_LOOP_PATIENT.sexLabel} · ${CARE_LOOP_PATIENT.age}`,
      encounterLabel: 'First baseline order',
    },
  });
}

export const CARE_LOOP_NOW = new Date('2026-07-20T10:12:00+07:00').getTime();

export const CARE_LOOP_COLLECTION_PATIENT: CollectionPatient = {
  id: CARE_LOOP_PATIENT.id,
  pid: CARE_LOOP_PATIENT.pid,
  name: CARE_LOOP_PATIENT.name,
  initials: CARE_LOOP_PATIENT.initials,
  sex: CARE_LOOP_PATIENT.sex,
  dob: CARE_LOOP_PATIENT.dob,
  orderId: CARE_LOOP_PATIENT.orderId,
  checkInAt: '09:42',
  waitingMinutes: 30,
  journey: { identity: 'done', vitals: 'done', phlebo: 'pending' },
  fasting: 'Fasting 8–12h',
  allergies: ['No known allergies'],
  samples: [
    {
      id: '884201001',
      tube: 'red',
      tests: ['Iron panel', 'Ferritin'],
      volumeMl: 5,
      container: 'Plain serum tube',
      stat: false,
      status: 'awaiting_collection',
    },
    {
      id: '884201002',
      tube: 'gold-sst',
      tests: ['Cystatin C', 'Serum calcium', 'Free T3', 'hs-CRP'],
      volumeMl: 5,
      container: 'Serum separator tube',
      stat: false,
      status: 'awaiting_collection',
    },
    {
      id: '884201003',
      tube: 'green',
      tests: ['Electrolytes panel', 'Urea (BUN)'],
      volumeMl: 4,
      container: 'Lithium heparin tube',
      stat: false,
      status: 'awaiting_collection',
    },
    {
      id: '884201004',
      tube: 'lavender',
      tests: ['Complete blood count', 'Haptoglobin'],
      volumeMl: 4,
      container: 'EDTA tube',
      stat: false,
      status: 'awaiting_collection',
    },
  ],
  vitals: {
    heightCm: '168',
    weightKg: '64',
    hr: '72',
    bpSys: '116',
    bpDia: '74',
    tempC: '36.7',
    tempUnit: 'C',
    spo2: '99',
    breathing: '14',
    painVas: 0,
    fasting: '8–12h',
    vaccinationNote: '',
  },
};

export const CARE_LOOP_OPERATOR = 'Nurse Srey Neang';
