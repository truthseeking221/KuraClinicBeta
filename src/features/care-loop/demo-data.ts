import { LAB_CATALOG_TESTS } from "../lab-catalog/demo-data";
import { cartWith } from "../order-cart/demo-data";
import type { DemoLineEconomics } from "../order-cart/demo-data";
import type { OrderCartItem } from "../order-cart/types";
import type { CollectionPatient } from "../collection/types";
import type { LabOrderJourneySnapshot } from "./lab-order-collection-flow";
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

/**
 * Every selectable catalog test has one priced order line. Keeping this map
 * catalog-shaped prevents the picker and cart from drifting into separate
 * fixture contracts.
 */
export const CARE_LOOP_CART_ITEMS: OrderCartItem[] = LAB_CATALOG_TESTS.flatMap(
  (test) => {
    if (test.availability === "unavailable" || !test.preview) return [];

    return [
      {
        id: test.testCatalogId,
        kind: "lab",
        name: test.displayName,
        code: test.code,
        priceMinor: test.preview.priceMinor,
        currencyCode: "USD",
        quantity: 1,
      },
    ];
  },
);

/** Server-shaped demo economics for this journey's fixed 15% doctor rate. */
export const CARE_LOOP_LINE_ECONOMICS: DemoLineEconomics[] =
  CARE_LOOP_CART_ITEMS.map((item) => ({
    itemName: item.name,
    netBaseMinor: item.priceMinor,
    commissionBp: 1500,
    earnMinor: ((BigInt(item.priceMinor) * 1500n) / 10_000n).toString(),
  }));

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
        tube: "light-blue",
        tests: ["PT / INR"],
        volumeMl: 2.7,
        container: "Sodium citrate tube",
        stat: false,
        status: "awaiting_collection",
      },
      {
        id: "884201002",
        tube: "gold-sst",
        tests: [
          "Lipid panel",
          "Ferritin",
          "Iron panel",
          "Cystatin C",
          "Creatinine + eGFR",
          "ALT",
          "AST",
        ],
        volumeMl: 5,
        container: "Serum separator tube",
        stat: false,
        status: "awaiting_collection",
      },
      {
        id: "884201003",
        tube: "lavender",
        tests: ["Complete blood count", "HbA1c"],
        volumeMl: 4,
        container: "EDTA tube",
        stat: false,
        status: "awaiting_collection",
      },
      {
        id: "884201004",
        tube: "dark-gray",
        tests: ["Fasting glucose"],
        volumeMl: 4,
        container: "Fluoride tube",
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
  "light-blue",
  "red",
  "lavender",
  "dark-gray",
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

/** Deterministic saved state for interruption and re-entry stories. */
export function careLoopLabOrderJourney(
  overrides: Partial<LabOrderJourneySnapshot> = {},
): LabOrderJourneySnapshot {
  return {
    orderId: CARE_LOOP_PATIENT.orderId,
    stage: "ordering",
    selectedTestIds: ["hba1c"],
    decisions: { collectBy: "self", payment: "pay-now" },
    labelMethod: "sticker",
    labelPhotoChecks: {
      applied: false,
      readable: false,
      photographed: false,
    },
    capturedTubeIds: [],
    pickupRound: "14:30",
    labelsChecked: false,
    countChecked: false,
    bagSealed: false,
    ...overrides,
  };
}

const DEMO_LOGISTICS_STAGES = [
  "ready-for-pickup",
  "courier-assigned",
  "in-transit",
  "received-at-lab",
  "processing",
  "partial-results",
] as const;

/** Prototype event adapter. Storybook owns each state; the app only replays it. */
export function demoLabJourneyAfterElapsed(
  journey: LabOrderJourneySnapshot,
  elapsedMs: number,
): LabOrderJourneySnapshot {
  if (!DEMO_LOGISTICS_STAGES.includes(journey.stage as (typeof DEMO_LOGISTICS_STAGES)[number])) {
    return journey;
  }
  const index = Math.min(
    DEMO_LOGISTICS_STAGES.length - 1,
    Math.max(0, Math.floor(elapsedMs / 6_000)),
  );
  const stage = DEMO_LOGISTICS_STAGES[index];
  if (stage === "partial-results") {
    const total = journey.total ?? journey.selectedTestIds.length;
    const resulted = journey.resulted ?? Math.max(1, Math.min(3, total - 1));
    return {
      ...journey,
      stage,
      resulted,
      total,
      flagged: journey.flagged ?? 1,
    };
  }
  return stage === journey.stage ? journey : { ...journey, stage };
}
