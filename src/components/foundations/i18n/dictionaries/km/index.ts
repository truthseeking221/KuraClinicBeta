import { mergeDictionaries } from '../types';
import type { KhmerDictionary } from '../types';

import { ADMIN_DOCTOR_BANKING_KM } from './admin-doctor-banking';
import { ASSESSMENT_KM } from './assessment';
import { AUTH_KM } from './auth';
import { CARE_LOOP_KM } from './care-loop';
import { CARE_PLAN_KM } from './care-plan';
import { COLLECTION_KM } from './collection';
import { COMMON_KM } from './common';
import { DOCTOR_BANKING_KM } from './doctor-banking';
import { FRONT_DESK_KM } from './front-desk';
import { HOME_KM } from './home';
import { JOURNEY_KM } from './journey';
import { LAB_CATALOG_KM } from './lab-catalog';
import { ORDER_CART_KM } from './order-cart';
import { PATIENT_CONTEXT_KM } from './patient-context';
import { PATIENTS_KM } from './patients';
import { PHONE_GATE_KM } from './phone-gate';
import { PRIMITIVES_KM } from './primitives';
import { RESULTS_KM } from './results';
import { SETTINGS_KM } from './settings';
import { SHELL_KM } from './shell';

/**
 * The complete Khmer dictionary, assembled from one file per feature area.
 *
 * Ordered least specific to most specific for readability only — the merge
 * rejects conflicts rather than letting a later area silently win, so one
 * English string always carries one Khmer rendering across the product.
 */
export const KM_DICTIONARY: KhmerDictionary = mergeDictionaries([
  ['common', COMMON_KM],
  ['primitives', PRIMITIVES_KM],
  ['shell', SHELL_KM],
  ['auth', AUTH_KM],
  ['home', HOME_KM],
  ['patients', PATIENTS_KM],
  ['patient-context', PATIENT_CONTEXT_KM],
  ['assessment', ASSESSMENT_KM],
  ['care-plan', CARE_PLAN_KM],
  ['care-loop', CARE_LOOP_KM],
  ['journey', JOURNEY_KM],
  ['lab-catalog', LAB_CATALOG_KM],
  ['order-cart', ORDER_CART_KM],
  ['results', RESULTS_KM],
  ['front-desk', FRONT_DESK_KM],
  ['collection', COLLECTION_KM],
  ['phone-gate', PHONE_GATE_KM],
  ['doctor-banking', DOCTOR_BANKING_KM],
  ['admin-doctor-banking', ADMIN_DOCTOR_BANKING_KM],
  ['settings', SETTINGS_KM],
]);
