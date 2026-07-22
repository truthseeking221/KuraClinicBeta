/**
 * Unified clinic order cart — one cart for doctor and receptionist.
 *
 * Design source: Figma `OrderCart / HBC workflow` (node 1194-3749): one shell
 * (Selected tests → decision card → totals → attestation → primary CTA) whose
 * decision content differs by role. Money follows the backend law: minor-unit
 * strings, USD canonical, KHR only as a tender-side display.
 */

import type { OrderIndication } from "../assessment/types";

export type OrderCartRole = "doctor" | "receptionist";

export type OrderCartItemKind =
  "visit" | "lab" | "imaging" | "ecg" | "vitals" | "telecon";

export type OrderCartItemState =
  "default" | "locked" | "supplemental" | "cancelled";

/**
 * How a nested line relates to its container. Mirrors the catalog ontology
 * (package ⊃ profile ⊃ panel ⊃ channels; derived tests consume inputs).
 */
export type OrderCartChildRelation =
  "package_child" | "profile_child" | "panel_channel" | "derived_input";

/**
 * A nested member of a container line. Children are facts of the container:
 * priceless (dash) unless credited, and never individually removable.
 */
export type OrderCartItemChild = {
  id: string;
  name: string;
  relation: OrderCartChildRelation;
  /** Only credited children carry money: the amount not double-charged. */
  creditMinor?: string;
};

/** A server-priced line. Money uses universal exponent-2 minor-unit strings. */
export type OrderCartItem = {
  id: string;
  kind: OrderCartItemKind;
  name: string;
  code?: string;
  priceMinor: string;
  currencyCode: "USD";
  quantity: number;
  state?: OrderCartItemState;
  meta?: string;
  origin?: string;
  children?: OrderCartItemChild[];
  /** Gross price when a shared-atom credit reduced the effective price. */
  struckPriceMinor?: string;
};

export type OrderCartPatient = {
  id: string;
  name: string;
  identifier?: string;
  demographicLabel?: string;
  encounterLabel?: string;
};

export type OrderCartLifecycle = "draft" | "placed" | "cancelled";

export type OrderCartPriceSummary = {
  subtotalMinor: string;
  patientDueMinor: string;
  currencyCode: "USD";
  /** Injected config quote rendered as a secondary KHR value. */
  patientDueKhrMinor?: string;
  previousPaidMinor?: string;
  previousReceiptId?: string;
  /** Shared-atom dedupe: money the patient is NOT charged twice. */
  creditMinor?: string;
  creditLabel?: string;
};

/* ── Cart suggestions (server pricing engine) ── */

/**
 * The four engine verdicts, with fixed semantics — tones and urgency are
 * derived from the kind, never overridden per instance. The upsell rail is
 * REAL upstream (`cart/expand` with `exclude_upsell=false`); the other three
 * are the proposed engine contract.
 */
export type CartSuggestionKind =
  "exact_match" | "upsell" | "redundancy" | "dependency_fill";

export type CartSuggestion = {
  id: string;
  kind: CartSuggestionKind;
  title: string;
  detail?: string;
  /** Signed money effect, minor units: save (−) or add (+). */
  deltaMinor?: string;
  deltaDirection?: "save" | "add";
  actionLabel: string;
};

export type OrderCartRepricedLine = {
  itemId: string;
  name: string;
  oldPriceMinor: string;
  newPriceMinor: string;
};

export type OrderCartPricing =
  | { state: "ready"; summary: OrderCartPriceSummary }
  | { state: "loading"; summary?: OrderCartPriceSummary }
  | { state: "error"; message?: string }
  | {
      state: "stale";
      summary: OrderCartPriceSummary;
      repricedLines: OrderCartRepricedLine[];
    };

export type OrderCartData = {
  id: string;
  reference?: string;
  patient?: OrderCartPatient;
  lifecycle: OrderCartLifecycle;
  items: OrderCartItem[];
  pricing: OrderCartPricing;
};

export type OrderCartBlocker = {
  id: string;
  label: string;
  recovery?: string;
  actionLabel?: string;
  tone?: "neutral" | "warning" | "danger";
};

/* ── Collection & payment decisions (the Figma decision card) ── */

/** Who draws the sample: the ordering clinician, or Kura staff. */
export type CollectBy = "self" | "kura";

/** Where Kura draws when it collects. */
export type DrawSite = "kura-psc" | "patient-home";

/** Doctor-side payment routes (ADR money law: doctor account may collect). */
export type DoctorPaymentRoute = "pay-now" | "pay-later-kura";

/** Reception-side tender methods (capture contract: cash is the real one). */
export type ReceptionPaymentMethod = "cash" | "khqr" | "pay-later";

export type CollectionDecisions = {
  collectBy?: CollectBy;
  /** Only meaningful when Kura collects. */
  drawSite?: DrawSite;
  payment?: DoctorPaymentRoute;
};

/** The decision card presentation state (Figma: Set up / expanded / Edit-View summary). */
export type DecisionPanelState = "unset" | "expanded" | "summary";

/** One server-resolved, earning-eligible test line. */
export type OrderCartEarningsLine = {
  itemId: string;
  /** Net-after-discount basis used by pricing-ms for this line. */
  netBaseMinor: string;
  /** Resolved per-test rate, in basis points. */
  commissionBp: number;
  /** Pre-derived earning for this line. The UI never recomputes this value. */
  earnMinor: string;
};

/** Commission economics for the ordering clinician (doctor-banking contract). */
export type OrderCartEarnings = {
  currencyCode: "USD";
  /** Sum of the earning-eligible net line bases, supplied by the workflow. */
  eligibleSubtotalMinor: string;
  /** Server-derived estimate for the current order. */
  earnMinor: string;
  /** Per-test resolution facts used only to explain the estimate. */
  lines: OrderCartEarningsLine[];
};

/* ── Tube preparation (in-cart secondary view for self-draw) ── */

export type TubePrepMethod = "scan" | "print";

export type OrderCartTube = {
  id: string;
  /** e.g. "Serum tube · 5 mL". */
  label: string;
  /** Physical stopper identity expressed through a Kura specimen token. */
  stopperColor: string;
  stopperLabel: string;
  tests: string[];
  scanned: boolean;
};

/* ── Role workflows ── */

type BaseOrderCartWorkflow = {
  role: OrderCartRole;
  actorName: string;
  access: "allowed" | "read-only" | "denied";
  blockers: OrderCartBlocker[];
};

/**
 * Doctor lifecycle across the Figma statuses:
 * `draft` (building + deciding) → `code-sent` | `collected` (Kura collects)
 * or `tubes` → `confirmed` (self-draw).
 */
export type DoctorStage =
  "draft" | "code-sent" | "collected" | "tubes" | "confirmed";

export type DoctorOrderCartWorkflow = BaseOrderCartWorkflow & {
  role: "doctor";
  stage: DoctorStage;
  authority: "verified" | "explorer" | "read-only";
  /**
   * The clinical reason this order exists, copied from the encounter that
   * produced it. An order without one cannot be sent: a lab test is an act on
   * a patient, and the record has to say what it was for. Absent means the
   * doctor reached the cart without an assessment, not that the reason is
   * optional.
   */
  indication?: OrderIndication;
  decisions: CollectionDecisions;
  panel: DecisionPanelState;
  /** "I have collected $X via cash or KHQR" — required before pay-now advances. */
  attested: boolean;
  earnings?: OrderCartEarnings;
  /** Decisions freeze once money moved; edits continue in Booking. */
  paymentLocked?: boolean;
  tubes?: OrderCartTube[];
  tubeMethod?: TubePrepMethod;
};

export type ReceptionPaymentStatus =
  | "not-started"
  | "due"
  | "waiting-khqr"
  | "paid"
  | "deferred"
  | "no-charge"
  | "refunded"
  | "voided";

export type ReceptionPaymentSummary = {
  status: ReceptionPaymentStatus;
  label: string;
  detail?: string;
  receiptId?: string;
};

export type OrderCartPrescriber = {
  name: string;
  status: "verified" | "missing" | "expired";
};

export type ReceptionistOrderCartWorkflow = BaseOrderCartWorkflow & {
  role: "receptionist";
  stage: "order-review" | "payment" | "ready-to-check-in" | "checked-in";
  origin: "doctor-order" | "on-behalf";
  prescriber?: OrderCartPrescriber;
  payerLabel?: string;
  payment: ReceptionPaymentSummary;
  /** Tender decision made in the decision card. */
  method?: ReceptionPaymentMethod;
  panel: DecisionPanelState;
  attested: boolean;
  permissions: {
    editClinicalItems: boolean;
    collectPayment: boolean;
    checkIn: boolean;
  };
};

export type OrderCartWorkflow =
  DoctorOrderCartWorkflow | ReceptionistOrderCartWorkflow;

export type OrderCartPrimaryAction = {
  label: string;
  disabled: boolean;
  disabledReason?: string;
};
