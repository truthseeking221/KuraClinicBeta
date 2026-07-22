"use client";

import { useState } from 'react';
import type { ReactNode } from 'react';

import { useT } from '../../components/foundations/i18n';
import { SettingsModal } from '../../components/ui';
import {
  CreditCardIcon,
  GlobeIcon,
  HomeIcon,
  HospitalIcon,
  LockKeyIcon,
  NotificationsIcon,
  SettingsIcon,
  SignatureIcon,
  UserGroupIcon,
  UserIdentityIcon,
} from '../../components/ui/icons';

import type { SettingsModalSection } from '../../components/ui';

import type { SettingsSectionId, VerificationStatus } from './logic';
import { SETTINGS_SECTIONS } from './logic';
import {
  AccountSection,
  CabinetSection,
  MembersSection,
  OverviewSection,
  PreferencesSection,
} from './sections-workspace';
import { SettingsSectionHeadingProvider } from './settings-rows';
import {
  BillingSection,
  CommunicationsSection,
  DirectorySection,
} from './sections-operations';
import { ESignSection, SecuritySection } from './sections-trust';

export type SettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Section shown when the dialog opens; the rail navigates internally. */
  section?: SettingsSectionId;
  onSectionChange?: (section: SettingsSectionId) => void;
  /** Mirrors the verification store; settings never contradicts the gate. */
  verification?: VerificationStatus;
  onVerify?: () => void;
  /** Fresh-workspace state: every section stays available with empty/new data. */
  firstUse?: boolean;
  identity?: { contact: string; name: string };
  workspaceName?: string;
};

const SECTION_ICONS: Record<SettingsSectionId, SettingsModalSection['icon']> = {
  overview: HomeIcon,
  account: UserIdentityIcon,
  cabinet: HospitalIcon,
  members: UserGroupIcon,
  preferences: SettingsIcon,
  communications: NotificationsIcon,
  billing: CreditCardIcon,
  directory: GlobeIcon,
  esign: SignatureIcon,
  security: LockKeyIcon,
};

/**
 * Settings overlay above the current work. Kura owns the modal shell, domain
 * sections, state transitions, and permission-facing messages. On small
 * screens the shell becomes a full-screen modal with a horizontal settings
 * rail.
 */
export function SettingsDialog({
  firstUse = false,
  identity,
  open,
  onOpenChange,
  section,
  onSectionChange,
  verification = 'verified',
  onVerify,
  workspaceName,
}: SettingsDialogProps) {
  const t = useT();
  const [activeSection, setActiveSection] = useState<SettingsSectionId>(
    section ?? 'overview',
  );
  const [previousSection, setPreviousSection] = useState(section);

  // Host-directed navigation (for example, verification) wins over the
  // in-modal selection without changing any feature-level logic.
  if (section !== previousSection) {
    setPreviousSection(section);
    if (section) setActiveSection(section);
  }

  const selectSection = (next: string) => {
    const nextSection = next as SettingsSectionId;
    setActiveSection(nextSection);
    onSectionChange?.(nextSection);
  };

  const panel = (children: ReactNode) => (
    <SettingsSectionHeadingProvider visible={false}>
      {children}
    </SettingsSectionHeadingProvider>
  );

  const content: Record<SettingsSectionId, ReactNode> = {
    overview: panel(
      <OverviewSection
        firstUse={firstUse}
        identity={identity}
        onNavigate={(next) => selectSection(next)}
        onVerify={onVerify}
        verification={verification}
        workspaceName={workspaceName}
      />
    ),
    account: panel(
      <AccountSection
        firstUse={firstUse}
        identity={identity}
        onVerify={onVerify}
        verification={verification}
      />,
    ),
    cabinet: panel(<CabinetSection firstUse={firstUse} workspaceName={workspaceName} />),
    members: panel(<MembersSection firstUse={firstUse} identity={identity} />),
    preferences: panel(<PreferencesSection />),
    communications: panel(<CommunicationsSection firstUse={firstUse} />),
    billing: panel(<BillingSection firstUse={firstUse} />),
    directory: panel(
      <DirectorySection
        firstUse={firstUse}
        identity={identity}
        verification={verification}
      />,
    ),
    esign: panel(<ESignSection firstUse={firstUse} verification={verification} />),
    security: panel(<SecuritySection firstUse={firstUse} />),
  };

  const sections: readonly SettingsModalSection[] = SETTINGS_SECTIONS.map((entry) => ({
    ...entry,
    label: t(entry.label),
    group: t(entry.group),
    icon: SECTION_ICONS[entry.id],
    content: content[entry.id],
  }));

  return (
    <SettingsModal
      onOpenChange={onOpenChange}
      onValueChange={selectSection}
      open={open}
      sections={sections}
      value={activeSection}
    />
  );
}
