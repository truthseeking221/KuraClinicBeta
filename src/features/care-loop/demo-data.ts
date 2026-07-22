import { FIGMA_TESTS, cartWith } from "../order-cart/demo-data";
import type { OrderCartItem } from "../order-cart/types";
import type { CollectionPatient } from "../collection/types";
import { JOURNEY_PATIENT } from "../journey/patient";

/** Journey-shaped view of the canonical manifest. Identity itself lives in
 *  `features/journey/patient.ts` so every phase reads the same person. */
export type CareLoopPatientManifest = {
  id: string;
  pid?: string;
  name: string;
  initials: string;
  sex?: "F" | "M";
  sexLabel: string;
  age: number;
  dob?: string;
  phone?: string;
  orderId: string;
};

export const CARE_LOOP_PATIENT: CareLoopPatientManifest = {
  id: "patient-sok-nimol",
  pid: JOURNEY_PATIENT.mrn,
  name: JOURNEY_PATIENT.displayName,
  initials: JOURNEY_PATIENT.initials,
  sex: JOURNEY_PATIENT.sexAtBirth,
  sexLabel: JOURNEY_PATIENT.sexLabel,
  age: JOURNEY_PATIENT.age,
  dob: JOURNEY_PATIENT.dob,
  phone: JOURNEY_PATIENT.phone,
  orderId: JOURNEY_PATIENT.orderId,
};

/**
 * Deterministic patient-reported answers used only when Storybook or the
 * prototype app simulates the patient completing the intake on their phone.
 */
export const CARE_LOOP_DEMO_INTAKE_RECORD = {
  reasonForVisit: "Tired for 2 weeks, wants a general checkup",
  allergies: "No known allergies",
  medicines: "Paracetamol sometimes · no daily medicines",
  familyHistory: "Father has diabetes · no surgeries · no chronic illness",
} as const;

const CATALOG_ID_BY_FIGMA_ITEM_ID: Record<string, string> = {
  "iron-panel": "iron-panel",
  ferritin: "ferritin",
  "cystatin-c": "cystatin-c",
  "serum-calcium": "serum-calcium",
  electrolytes: "electrolytes-panel",
  "urea-bun": "urea-bun",
  cbc: "cbc",
  haptoglobin: "haptoglobin",
  "free-t3": "free-t3",
  "hs-crp": "hs-crp",
};

/**
 * One deterministic order manifest for the executable journey. The source
 * board's urine tests are intentionally excluded until Collection owns a
 * canonical urine-container contract; every selected test here maps to one of
 * the four blood tubes below.
 */
export const CARE_LOOP_CART_ITEMS: OrderCartItem[] = FIGMA_TESTS.flatMap(
  (item) => {
    const catalogId = CATALOG_ID_BY_FIGMA_ITEM_ID[item.id];
    return catalogId ? [{ ...item, id: catalogId }] : [];
  },
);

export const CARE_LOOP_SELECTED_TEST_IDS = CARE_LOOP_CART_ITEMS.map(
  (item) => item.id,
);

export function careLoopCart(
  items: OrderCartItem[] = CARE_LOOP_CART_ITEMS,
  patient: CareLoopPatientManifest = CARE_LOOP_PATIENT,
) {
  return cartWith(items, {
    id: `cart-${patient.orderId.toLowerCase()}`,
    reference: patient.orderId,
    patient: {
      id: patient.id,
      name: patient.name,
      identifier: patient.pid,
      demographicLabel: `${patient.sexLabel} · ${patient.age}`,
      encounterLabel: "First baseline order",
    },
  });
}

export const CARE_LOOP_NOW = new Date("2026-07-20T10:12:00+07:00").getTime();

export function careLoopCollectionPatient(
  patient: CareLoopPatientManifest = CARE_LOOP_PATIENT,
): CollectionPatient {
  return {
    id: patient.id,
    pid: patient.pid ?? "",
    name: patient.name,
    initials: patient.initials,
    sex: patient.sex ?? "M",
    dob: patient.dob ?? "",
    orderId: patient.orderId,
    checkInAt: "09:42",
    waitingMinutes: 30,
    journey: { identity: "done", vitals: "done", phlebo: "pending" },
    fasting: "Fasting 8–12h",
    allergies: ["No known allergies"],
    samples: [
      {
        id: "884201001",
        tube: "red",
        tests: ["Iron panel", "Ferritin"],
        volumeMl: 5,
        container: "Plain serum tube",
        stat: false,
        status: "awaiting_collection",
      },
      {
        id: "884201002",
        tube: "gold-sst",
        tests: ["Cystatin C", "Serum calcium", "Free T3", "hs-CRP"],
        volumeMl: 5,
        container: "Serum separator tube",
        stat: false,
        status: "awaiting_collection",
      },
      {
        id: "884201003",
        tube: "green",
        tests: ["Electrolytes panel", "Urea (BUN)"],
        volumeMl: 4,
        container: "Lithium heparin tube",
        stat: false,
        status: "awaiting_collection",
      },
      {
        id: "884201004",
        tube: "lavender",
        tests: ["Complete blood count", "Haptoglobin"],
        volumeMl: 4,
        container: "EDTA tube",
        stat: false,
        status: "awaiting_collection",
      },
    ],
    vitals: {
      heightCm: "168",
      weightKg: "64",
      hr: "72",
      bpSys: "116",
      bpDia: "74",
      tempC: "36.7",
      tempUnit: "C",
      spo2: "99",
      breathing: "14",
      painVas: 0,
      fasting: "8–12h",
      vaccinationNote: "",
    },
  };
}

export const CARE_LOOP_COLLECTION_PATIENT = careLoopCollectionPatient();

export const CARE_LOOP_OPERATOR = "Nurse Srey Neang";

/** The four tubes this order draws, in CLSI order-of-draw sequence. */
export const CARE_LOOP_TUBE_KEYS = [
  "red",
  "gold-sst",
  "green",
  "lavender",
] as const;

/**
 * What goes on every tube when the doctor writes them by hand. Surname, sex
 * and birth year: enough for a courier and the lab to match a tube back to
 * one person without printing the whole record on it.
 */
export function careLoopTubeLabelLine(
  patient: CareLoopPatientManifest = CARE_LOOP_PATIENT,
) {
  if (!patient.sex || !patient.dob) return "Identity verification required";
  return `${patient.name.split(" ")[0].toUpperCase()} · ${patient.sex} · ${patient.dob.slice(0, 4)}`;
}

export const CARE_LOOP_TUBE_LABEL_LINE = careLoopTubeLabelLine();
