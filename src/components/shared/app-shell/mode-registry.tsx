import {
  BarcodeScanIcon,
  ChartAnalysisIcon,
  CheckInIcon,
  HomeIcon,
  MicroscopeIcon,
  QueueIcon,
  ReceiptIcon,
  StethoscopeIcon,
  TestTubesIcon,
  UserMultipleIcon,
  WalletIcon,
} from '../../ui';

import type { ClinicMode, ModeAvailabilityInput, ModeDefinition } from './types';

const ICON_SIZE = 16;

/**
 * Capability-driven registry for the three operational modes. Workspace
 * administration is not a mode: Settings opens as a dialog from the shell.
 *
 * The clinical permission vocabulary (patient.read, sample.collect, ...) is the
 * proposed extension of the workspace catalog, which today covers only
 * workspace administration. The registry never reads role names.
 */
export const MODE_REGISTRY: Record<ClinicMode, ModeDefinition> = {
  clinical: {
    mode: 'clinical',
    label: 'Clinical',
    icon: <StethoscopeIcon size={ICON_SIZE} />,
    entryKey: 'home',
    requiredAny: ['patient.read', 'order.create', 'result.review'],
    moduleFlag: 'clinical',
    requiresLicence: true,
    nav: [
      {
        key: 'work',
        items: [
          { key: 'home', label: 'Home', icon: <HomeIcon size={ICON_SIZE} /> },
          { key: 'results', label: 'Results', icon: <ChartAnalysisIcon size={ICON_SIZE} /> },
          { key: 'patients', label: 'Patients', icon: <UserMultipleIcon size={ICON_SIZE} /> },
          {
            key: 'earnings',
            label: 'Earnings',
            icon: <WalletIcon size={ICON_SIZE} />,
            requiredAny: ['doctor.banking.view.self'],
          },
        ],
      },
      {
        key: 'clinical',
        label: 'Clinical',
        items: [
          { key: 'catalog', label: 'Catalog', icon: <MicroscopeIcon size={ICON_SIZE} /> },
        ],
      },
    ],
  },
  'front-desk': {
    mode: 'front-desk',
    label: 'Front desk',
    icon: <CheckInIcon size={ICON_SIZE} />,
    entryKey: 'arrivals',
    requiredAny: ['reception.check_in', 'booking.manage', 'payment.collect'],
    moduleFlag: 'reception',
    nav: [
      {
        key: 'work',
        items: [
          { key: 'arrivals', label: 'Arrivals', icon: <CheckInIcon size={ICON_SIZE} /> },
          { key: 'queue', label: 'Queue', icon: <QueueIcon size={ICON_SIZE} /> },
        ],
      },
      {
        key: 'desk',
        label: 'Desk',
        items: [
          { key: 'payments', label: 'Payments', icon: <ReceiptIcon size={ICON_SIZE} /> },
        ],
      },
    ],
  },
  collection: {
    mode: 'collection',
    label: 'Collection',
    icon: <TestTubesIcon size={ICON_SIZE} />,
    entryKey: 'scan-gate',
    requiredAny: ['sample.collect', 'sample.label', 'sample.handoff', 'vitals.record'],
    moduleFlag: 'collection',
    nav: [
      {
        key: 'station',
        items: [
          { key: 'scan-gate', label: 'Scan', icon: <BarcodeScanIcon size={ICON_SIZE} /> },
        ],
      },
    ],
  },
};

export const MODE_ORDER: ClinicMode[] = ['clinical', 'front-desk', 'collection'];

/**
 * A mode is available when its module is enabled AND the user holds at least
 * one of its capabilities AND (for clinical) the licence is verified.
 */
export function deriveAvailableModes(input: ModeAvailabilityInput): ClinicMode[] {
  const granted = new Set(input.permissions);

  return MODE_ORDER.filter((mode) => {
    const definition = MODE_REGISTRY[mode];
    if (!input.enabledModules[definition.moduleFlag]) return false;
    if (definition.requiresLicence && !input.licenceVerified) return false;
    return definition.requiredAny.some((permission) => granted.has(permission));
  });
}
