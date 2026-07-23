export type LabCatalogKind =
  | 'analyte'
  | 'derived'
  | 'panel'
  | 'profile'
  | 'package'
  | 'consult'
  | 'service';

export type LabCatalogAvailability = 'available' | 'unavailable';

export type LabCatalogCategory = {
  categoryId: string;
  code: string;
  displayName: string;
  priority: number;
  count: number;
};

export type LabCatalogTestPreviewRow = {
  label: string;
  value: string;
};

/**
 * Optional operational and price detail shown through progressive disclosure.
 * Money stays in universal exponent-2 minor units, matching the catalog wire contract.
 */
export type LabCatalogTestPreview = {
  description?: string;
  preparation?: string;
  specimen: string;
  turnaround: string;
  referenceRange?: string;
  analytical?: readonly LabCatalogTestPreviewRow[];
  handling?: readonly LabCatalogTestPreviewRow[];
  priceMinor: string;
  currencyCode: 'USD' | 'KHR';
  earningMinor?: string;
};

export type LabCatalogTest = {
  testCatalogId: string;
  code: string;
  displayName: string;
  abbrv?: string;
  kind: LabCatalogKind;
  status: 'active';
  categoryIds: string[];
  requiredPreAnalyticalFields?: string[];
  keywords?: string[];
  componentCount?: number;
  availability?: LabCatalogAvailability;
  unavailableReason?: string;
  preview?: LabCatalogTestPreview;
};

export type LabCatalogPickerState =
  | 'ready'
  | 'loading'
  | 'error'
  | 'offline'
  | 'permission';

export type LabCatalogFilterStrategy = 'client' | 'external';

export type LabCatalogSelectionChange = {
  test: LabCatalogTest;
  checked: boolean;
};
