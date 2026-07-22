import { READINESS } from "../../components/foundations/readiness-data";

export const ORDER_CART_STORYBOOK_KURA = {
  readiness: READINESS.frontDesk,
  contract: {
    status: "prototype-contract",
    personas: ["clinic doctor", "clinic receptionist"],
    ownership: "One cart object and one component owner across Clinic roles.",
    boundaries: [
      "The cart renders backend-priced order truth and the role-specific next action.",
      "Order placement, payment capture, check-in, tube preparation, and their audit events remain workflow-owned.",
      "Reception may resolve operational facts without silently changing doctor-authored clinical lines.",
    ],
  },
  intake: {
    decision: "DOMAIN-ADAPT + COMPOSE",
    owner: "src/features/order-cart",
    level: "clinical-composite",
    evidence: [
      "Figma Kura Design node 1194:3749 with status variants 1208:28332 (empty), 1335:56580 (not configured), 1249:84934/85423 (decision card expanded), 1335:53446 (code sent), 1194:3458 (payment collected), 1194:3690 (clinic draw), plus the tube-preparation subflow.",
      "Backend contracts: server-priced minor-unit strings, ADR-0057 prescriber attribution, capture contract (paid is the only real capture state), and per-test doctor-banking commission economics over net-after-discount line bases.",
      "Current Kura platform receptionist OrderCartRail and legacy @kura/ui-kit OrderCart organism.",
    ],
    exclusions: [
      "No client-owned pricing, payment capture, insurance settlement, clinical signature, check-in mutation, or tube state mutation — callbacks only.",
      "KHQR provider polling and QR rendering stay workflow-owned; the cart only reports the tender decision and payment status.",
      "The implementation composes existing Kura Badge, Alert, Button, IconButton, Checkbox, Collapsible, SegmentedToggle, MoneyText, HoverCard, and Popover owners.",
    ],
  },
  source: {
    figma:
      "https://www.figma.com/design/yWz269PzVjFQquJa1U1M0s/Kura-Design?node-id=1194-3749",
    repositories: [
      "Kura-med/kura-platform",
      "Kura-med/ui-kit",
      "truthseeking221/Kura",
    ],
  },
  binding: {
    colors: "kura-semantic",
    typography: "kura",
    spacing: "kura-density-aware",
    radius: "kura",
    motion:
      "kura height-and-opacity disclosure + interruptible close + reduced-motion-safe",
    icons: "kura-canonical-only",
    focus: "kura",
    money: "MoneyText + server minor-unit strings",
    responsive: "rail at desktop, full-width composition at narrow viewport",
  },
  roles: {
    doctor:
      "Clinical intent, collection & payment decisions (who draws, where, how the patient pays), commission earnings, cash attestation, booking-code handoff, tube preparation.",
    receptionist:
      "Prescriber attribution, tender method (cash/KHQR/pay-later), collection attestation, check-in, and operational recovery.",
  },
} as const;
