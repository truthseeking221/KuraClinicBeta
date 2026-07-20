import * as KuraIcons from "./kura-icons";
import type { HugeiconsProStyle, KuraIconComponent } from "./kura-icons";

export type KuraIconCatalogEntry = {
  Icon: KuraIconComponent;
  exportName: string;
  label: string;
  defaultStyle?: HugeiconsProStyle;
};

export type KuraIconCatalogCategory = {
  id: string;
  title: string;
  description: string;
  journeyIds: readonly string[];
  icons: readonly KuraIconCatalogEntry[];
};

type RuntimeIconExport = keyof typeof KuraIcons;

function icon(
  exportName: RuntimeIconExport,
  label: string,
  defaultStyle?: HugeiconsProStyle,
): KuraIconCatalogEntry {
  return {
    Icon: KuraIcons[exportName] as KuraIconComponent,
    exportName,
    label,
    defaultStyle,
  };
}

/**
 * Story-only semantic inventory. The namespace import is intentional here because this
 * catalogue renders the entire curated set; application code continues to use named,
 * tree-shakeable exports from the canonical Kura UI package.
 */
export const KURA_ICON_CATEGORIES: readonly KuraIconCatalogCategory[] = [
  {
    id: "actions",
    title: "Actions and editing",
    description:
      "Frequent commands for creating, changing, saving, sharing, and recovering work.",
    journeyIds: ["WQ", "PAT", "ENC", "ORD", "ADM"],
    icons: [
      icon("AddIcon", "Add"),
      icon("MinusIcon", "Remove value"),
      icon("CheckIcon", "Confirm"),
      icon("CloseIcon", "Close"),
      icon("DeleteIcon", "Delete"),
      icon("EditIcon", "Edit"),
      icon("SaveIcon", "Save"),
      icon("CopyIcon", "Copy"),
      icon("UndoIcon", "Undo"),
      icon("RedoIcon", "Redo"),
      icon("RefreshIcon", "Refresh"),
      icon("DownloadIcon", "Download"),
      icon("UploadIcon", "Upload"),
      icon("ExportIcon", "Export"),
      icon("ShareIcon", "Share"),
      icon("LinkIcon", "Link"),
      icon("ExternalLinkIcon", "Open external link"),
      icon("ViewIcon", "Show"),
      icon("ViewOffIcon", "Hide"),
      icon("PrintIcon", "Print"),
      icon("ImageIcon", "Image"),
      icon("CameraIcon", "Camera"),
      icon("FavouriteIcon", "Favourite"),
      icon("BookmarkIcon", "Bookmark"),
      icon("StarIcon", "Priority or favourite"),
      icon("TagIcon", "Tag"),
      icon("MoreHorizontalIcon", "More horizontal"),
      icon("MoreVerticalIcon", "More vertical"),
      icon("LoadingIcon", "Loading"),
    ],
  },
  {
    id: "navigation",
    title: "Navigation and layout",
    description:
      "Wayfinding, disclosure, pagination, reordering, view selection, and responsive layout controls.",
    journeyIds: ["WQ", "MOB"],
    icons: [
      icon("HomeIcon", "Home"),
      icon("DashboardIcon", "Dashboard"),
      icon("MenuIcon", "Menu"),
      icon("SearchIcon", "Search"),
      icon("FilterIcon", "Filter"),
      icon("SettingsIcon", "Settings"),
      icon("ArrowLeftIcon", "Back"),
      icon("ArrowRightIcon", "Forward"),
      icon("ArrowUpIcon", "Move up"),
      icon("ArrowDownIcon", "Move down"),
      icon("ArrowFirstIcon", "First page"),
      icon("ArrowLastIcon", "Last page"),
      icon("ArrowSortIcon", "Sort"),
      icon("ExpandIcon", "Expand"),
      icon("CollapseIcon", "Collapse"),
      icon("DragIcon", "Drag or reorder"),
      icon("GridViewIcon", "Grid view"),
      icon("ListViewIcon", "List view"),
      icon(
        "ChevronDoubleCloseIcon",
        "Close panel",
        KuraIcons.KURA_CHEVRON_ICON_STYLE,
      ),
      icon(
        "ChevronDownIcon",
        "Disclose down",
        KuraIcons.KURA_CHEVRON_ICON_STYLE,
      ),
      icon("ChevronFirstIcon", "First item", KuraIcons.KURA_CHEVRON_ICON_STYLE),
      icon("ChevronLastIcon", "Last item", KuraIcons.KURA_CHEVRON_ICON_STYLE),
      icon("ChevronLeftIcon", "Previous", KuraIcons.KURA_CHEVRON_ICON_STYLE),
      icon("ChevronRightIcon", "Next", KuraIcons.KURA_CHEVRON_ICON_STYLE),
      icon("ChevronUpIcon", "Disclose up", KuraIcons.KURA_CHEVRON_ICON_STYLE),
      icon(
        "ChevronsDownIcon",
        "Move to bottom",
        KuraIcons.KURA_CHEVRON_ICON_STYLE,
      ),
      icon(
        "ChevronsDownUpIcon",
        "Collapse vertically",
        KuraIcons.KURA_CHEVRON_ICON_STYLE,
      ),
      icon(
        "ChevronsLeftIcon",
        "Move to start",
        KuraIcons.KURA_CHEVRON_ICON_STYLE,
      ),
      icon(
        "ChevronsLeftRightEllipsisIcon",
        "Resize columns",
        KuraIcons.KURA_CHEVRON_ICON_STYLE,
      ),
      icon(
        "ChevronsLeftRightIcon",
        "Expand horizontally",
        KuraIcons.KURA_CHEVRON_ICON_STYLE,
      ),
      icon(
        "ChevronsRightIcon",
        "Move to end",
        KuraIcons.KURA_CHEVRON_ICON_STYLE,
      ),
      icon(
        "ChevronsRightLeftIcon",
        "Collapse horizontally",
        KuraIcons.KURA_CHEVRON_ICON_STYLE,
      ),
      icon("ChevronsUpIcon", "Move to top", KuraIcons.KURA_CHEVRON_ICON_STYLE),
      icon(
        "CircleChevronDownIcon",
        "Circular next down",
        KuraIcons.KURA_CHEVRON_ICON_STYLE,
      ),
      icon(
        "CircleChevronLeftIcon",
        "Circular previous",
        KuraIcons.KURA_CHEVRON_ICON_STYLE,
      ),
      icon(
        "CircleChevronRightIcon",
        "Circular next",
        KuraIcons.KURA_CHEVRON_ICON_STYLE,
      ),
      icon(
        "CircleChevronUpIcon",
        "Circular next up",
        KuraIcons.KURA_CHEVRON_ICON_STYLE,
      ),
      icon(
        "ListChevronsDownUpIcon",
        "List order",
        KuraIcons.KURA_CHEVRON_ICON_STYLE,
      ),
    ],
  },
  {
    id: "status",
    title: "Status and feedback",
    description:
      "Non-colour cues for progress, success, warning, error, information, availability, and priority.",
    journeyIds: ["WQ-09", "ACC-08", "RES-04", "MOB-04"],
    icons: [
      icon("SuccessIcon", "Success"),
      icon("WarningIcon", "Warning"),
      icon("AlertIcon", "Attention"),
      icon("ErrorIcon", "Error"),
      icon("InformationIcon", "Information"),
      icon("HelpIcon", "Help"),
      icon("UnavailableIcon", "Unavailable"),
      icon("PauseIcon", "Paused"),
      icon("PlayIcon", "Resume"),
      icon("ExpiryIcon", "Expiry or countdown"),
      icon("NotificationsIcon", "Notification"),
    ],
  },
  {
    id: "access",
    title: "Access and workspace",
    description:
      "Authentication, workspace scope, session continuity, and device access.",
    journeyIds: ["ACC-01", "ACC-02", "ACC-06", "ACC-09", "ACC-12"],
    icons: [
      icon("LoginIcon", "Sign in"),
      icon("LogoutIcon", "Sign out"),
      icon("WorkspaceIcon", "Workspace"),
      icon("SwitchWorkspaceIcon", "Switch workspace"),
      icon("DeviceAccessIcon", "Device access"),
      icon("UserSettingsIcon", "Member settings"),
      icon("UserAddIcon", "Invite member"),
      icon("UserGroupIcon", "Workspace members"),
    ],
  },
  {
    id: "identity",
    title: "People and identity",
    description:
      "Patient and staff identity, verification, shared records, dependants, and identity attention.",
    journeyIds: ["PAT-01", "PAT-13", "PAT-14", "PAT-23", "PAT-25"],
    icons: [
      icon("UserCircleIcon", "Person"),
      icon("UserMultipleIcon", "Multiple people"),
      icon("UserCheckIcon", "Verified person"),
      icon("UserSearchIcon", "Find patient"),
      icon("UserIdentityIcon", "Identity verification"),
      icon("IdentityVerifiedIcon", "Verified identity evidence"),
      icon("UserWarningIcon", "Identity attention"),
      icon("FaceIdIcon", "Face verification"),
      icon("FingerprintIcon", "Fingerprint verification"),
      icon("DependentIcon", "Dependant or minor"),
    ],
  },
  {
    id: "scheduling",
    title: "Scheduling and queues",
    description:
      "Appointments, check-in, rescheduling, queue state, time, and collection location.",
    journeyIds: ["WQ-04", "WQ-06", "ORD-09", "REC-01", "PHL-01"],
    icons: [
      icon("AppointmentIcon", "Appointment"),
      icon("CalendarIcon", "Calendar"),
      icon("CalendarAddIcon", "Create appointment"),
      icon("CheckInIcon", "Check in"),
      icon("CalendarRemoveIcon", "Cancel appointment"),
      icon("QueueIcon", "Queue"),
      icon("ClockIcon", "Time"),
      icon("LocationIcon", "Location"),
      icon("MapPinIcon", "Map location"),
    ],
  },
  {
    id: "clinical-care",
    title: "Clinical care and documentation",
    description:
      "Encounter work, clinical records, prescriptions, consent, referral, and patient measurements.",
    journeyIds: ["ENC", "CARE", "COM-03"],
    icons: [
      icon("StethoscopeIcon", "Clinical review"),
      icon("DoctorIcon", "Doctor"),
      icon("HealthIcon", "Health status"),
      icon("HospitalIcon", "Clinic or hospital"),
      icon("MedicalFileIcon", "Medical record"),
      icon("ClinicalNoteIcon", "Clinical note"),
      icon("MicrophoneIcon", "Dictation"),
      icon("SignatureIcon", "Signature"),
      icon("ConsentIcon", "Consent or agreement"),
      icon("ReferralIcon", "Clinical referral"),
      icon("PrescriptionIcon", "Prescription"),
      icon("MedicineIcon", "Medication"),
      icon("PillIcon", "Dose or pill"),
      icon("InjectionIcon", "Injection"),
      icon("ThermometerIcon", "Temperature"),
      icon("WeightScaleIcon", "Weight"),
      icon("BloodPressureIcon", "Blood pressure"),
      icon("HeartCheckIcon", "Care check"),
      icon("HeartPulseIcon", "Vital trend"),
      icon("LungsIcon", "Respiratory"),
      icon("KidneysIcon", "Renal"),
      icon("BrainIcon", "Neurology"),
      icon("AmbulanceIcon", "Emergency transport"),
    ],
  },
  {
    id: "laboratory",
    title: "Samples and laboratory",
    description:
      "Test ordering, collection, labelling, verification, analysis, and specimen safety.",
    journeyIds: ["ORD-01", "ORD-10", "PHL", "LOG", "RES-01"],
    icons: [
      icon("TestTubeIcon", "Sample"),
      icon("ShoppingCartIcon", "Order cart"),
      icon("TestTubesIcon", "Sample set"),
      icon("MicroscopeIcon", "Laboratory analysis"),
      icon("BloodBagIcon", "Blood collection"),
      icon("BiohazardIcon", "Specimen hazard"),
      icon("QrCodeIcon", "Booking QR code"),
      icon("BarcodeScanIcon", "Tube barcode scan"),
      icon("ScanIcon", "Scan"),
      icon("ChecklistIcon", "Collection checklist"),
    ],
  },
  {
    id: "operations",
    title: "Logistics and inventory",
    description:
      "Collection routes, courier custody, package movement, stock, and operational task handling.",
    journeyIds: ["ORD-08", "LOG", "INV"],
    icons: [
      icon("RouteIcon", "Collection route"),
      icon("CourierIcon", "Courier handoff"),
      icon("PackageIcon", "Specimen package"),
      icon("PackageAddIcon", "Receive stock"),
      icon("PackageRemoveIcon", "Dispatch stock"),
      icon("WarehouseIcon", "Storage"),
      icon("InventoryIcon", "Inventory"),
      icon("ClipboardListIcon", "Order list"),
      icon("TaskIcon", "Task"),
    ],
  },
  {
    id: "communication",
    title: "Communication",
    description:
      "Patient and team messaging, calls, telehealth, delivery, and notification channels.",
    journeyIds: ["WQ-05", "RES-08", "COM"],
    icons: [
      icon("MessageIcon", "Inbox message"),
      icon("MailIcon", "Email"),
      icon("SendMailIcon", "Send communication"),
      icon("CallIcon", "Call"),
      icon("VideoCallIcon", "Video call"),
    ],
  },
  {
    id: "finance",
    title: "Finance and settlement",
    description:
      "Payments, cash, discounts, refunds, banking, invoices, receipts, and settlement movement.",
    journeyIds: ["REC-03", "FIN"],
    icons: [
      icon("CreditCardIcon", "Card payment"),
      icon("CashIcon", "Cash payment"),
      icon("WalletIcon", "Wallet"),
      icon("BankIcon", "Banking"),
      icon("DiscountIcon", "Discount"),
      icon("InvoiceIcon", "Invoice"),
      icon("ReceiptIcon", "Receipt"),
      icon("MoneyReceiveIcon", "Receive payment"),
      icon("MoneySendIcon", "Send payment"),
      icon("RefundIcon", "Refund"),
    ],
  },
  {
    id: "documents-data",
    title: "Documents and data",
    description:
      "Files, evidence, history, structured data, analytical views, and audit-friendly records.",
    journeyIds: ["ACC-11", "PAT-20", "RES", "ADM-07", "ADM-08"],
    icons: [
      icon("FileIcon", "File"),
      icon("FolderIcon", "Folder"),
      icon("AttachmentIcon", "Attachment"),
      icon("DocumentValidationIcon", "Validated document"),
      icon("ArchiveIcon", "Archive"),
      icon("HistoryIcon", "History"),
      icon("DatabaseIcon", "Database"),
      icon("DataTableIcon", "Data table"),
      icon("ChartIcon", "Trend chart"),
      icon("AnalyticsIcon", "Analytics"),
      icon("ChartAnalysisIcon", "Chart analysis"),
      icon("PieChartIcon", "Distribution chart"),
    ],
  },
  {
    id: "security",
    title: "Security and audit",
    description:
      "Protected access, permissions, identity assurance, and immutable audit context.",
    journeyIds: ["ACC-04", "ACC-08", "ACC-11", "PAT-25"],
    icons: [
      icon("LockKeyIcon", "Protected data"),
      icon("ShieldIcon", "Security"),
      icon("KeyIcon", "Access key"),
      icon("AuditIcon", "Audit trail"),
    ],
  },
  {
    id: "system",
    title: "System, devices, and AI",
    description:
      "Connectivity, sync, offline continuity, localisation, device context, themes, and assisted work.",
    journeyIds: ["MOB", "ADM-03"],
    icons: [
      icon("AiBrainIcon", "AI assistance"),
      icon("CloudIcon", "Cloud data"),
      icon("CloudSyncIcon", "Sync status"),
      icon("WifiConnectedIcon", "Connected"),
      icon("WifiErrorIcon", "Connection error"),
      icon("OfflineIcon", "Offline"),
      icon("MobileDeviceIcon", "Mobile device"),
      icon("LaptopIcon", "Desktop device"),
      icon("GlobeIcon", "Region or global"),
      icon("LanguageIcon", "Language"),
      icon("DarkModeIcon", "Dark theme"),
      icon("LightModeIcon", "Light theme"),
    ],
  },
];

export const KURA_ICON_ENTRIES = KURA_ICON_CATEGORIES.flatMap(
  (category) => category.icons,
);

export const KURA_CHEVRON_ICON_ENTRIES = KURA_ICON_ENTRIES.filter(
  (entry) => entry.defaultStyle === KuraIcons.KURA_CHEVRON_ICON_STYLE,
);

export const KURA_ICON_COUNT = KURA_ICON_ENTRIES.length;

export const KURA_STYLE_VARIANT_COUNT =
  KURA_ICON_COUNT * KuraIcons.HUGEICONS_PRO_STYLES.length;

const duplicateExportNames = KURA_ICON_ENTRIES.filter(
  (entry, index, entries) =>
    entries.findIndex(
      (candidate) => candidate.exportName === entry.exportName,
    ) !== index,
);

if (duplicateExportNames.length > 0) {
  throw new Error(
    `Duplicate Kura icon catalogue entries: ${duplicateExportNames
      .map((entry) => entry.exportName)
      .join(", ")}`,
  );
}
