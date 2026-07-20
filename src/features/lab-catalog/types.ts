export type LabCatalogKind =
  | 'analyte'
  | 'derived'
  | 'panel'
  | 'profile'
  | 'package'
  | 'consult';

export type LabCatalogAvailability = 'available' | 'unavailable';

export type LabCatalogCategory = {
  categoryId: string;
  code: string;
  displayName: string;
  priority: number;
  count: number;
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
