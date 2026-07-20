"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui";
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
} from "../../components/ui/icons";

import type { SettingsSectionId, VerificationStatus } from "./logic";
import { SETTINGS_SECTIONS } from "./logic";
import {
  AccountSection,
  CabinetSection,
  MembersSection,
  OverviewSection,
  PreferencesSection,
} from "./sections-workspace";
import {
  BillingSection,
  CommunicationsSection,
  DirectorySection,
} from "./sections-operations";
import { ESignSection, SecuritySection } from "./sections-trust";
import styles from "./settings.module.css";

type RailGroup = {
  group: string;
  items: (typeof SETTINGS_SECTIONS)[number][];
};

const RAIL_GROUPS: readonly RailGroup[] = SETTINGS_SECTIONS.reduce<RailGroup[]>(
  (groups, entry) => {
    const current = groups[groups.length - 1];
    if (current?.group === entry.group) {
      current.items.push(entry);
    } else {
      groups.push({ group: entry.group, items: [entry] });
    }
    return groups;
  },
  [],
);

const SECTION_ICONS: Record<
  SettingsSectionId,
  ComponentType<{ className?: string }>
> = {
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

export type SettingsViewProps = {
  /** Active section; the surface also navigates internally. */
  section?: SettingsSectionId;
  onSectionChange?: (section: SettingsSectionId) => void;
  /** Mirrors the verification store; settings never contradicts the gate. */
  verification?: VerificationStatus;
  /** Opens the shared verification modal in the host application. */
  onVerify?: () => void;
  /**
   * page: standalone route with its own header. dialog: fills SettingsDialog —
   * the dialog provides the accessible title and the rail is the only
   * settings navigation, so the page header is dropped.
   */
  frame?: 'page' | 'dialog';
};

/**
 * One canonical surface for low-frequency workspace configuration: identity,
 * cabinet, team, money, documents, and security. A vertical Tabs rail swaps
 * dense panels — no hero, no decorative dashboard; status rows and one obvious
 * action each. The presentation promotes ReUI settings-7's real page, side-tab,
 * card, and row anatomy into the feature owner while Kura keeps all behavior.
 */
export function SettingsView({
  section,
  onSectionChange,
  verification = "verified",
  onVerify,
  frame = "page",
}: SettingsViewProps) {
  const [active, setActive] = useState<SettingsSectionId>(
    section ?? "overview",
  );
  const [prevSection, setPrevSection] = useState(section);
  const bodyRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  // Controlled updates land during render, not in an effect.
  if (section !== prevSection) {
    setPrevSection(section);
    if (section) setActive(section);
  }

  // Returning users land where they left off; a fresh section starts at top.
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    bodyRef.current?.scrollTo({ top: 0 });
  }, [active]);

  const go = (next: SettingsSectionId) => {
    setActive(next);
    onSectionChange?.(next);
  };

  return (
    <div
      className={
        frame === "dialog" ? `${styles.root} ${styles.rootDialog}` : styles.root
      }
    >
      {frame === "page" ? (
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Settings</h1>
          <p className={styles.pageDescription}>
            Manage your profile, workspace, operations, and security.
          </p>
        </header>
      ) : null}
      <Tabs
        appearance="subtle"
        className={styles.settingsTabs}
        onValueChange={(value) => go(value as SettingsSectionId)}
        orientation="vertical"
        value={active}
      >
        <div className={styles.rail}>
          <TabsList aria-label="Settings sections" className={styles.railList}>
            {RAIL_GROUPS.flatMap(({ group, items }) => [
              <div className={styles.railGroup} key={`group-${group}`} role="presentation">
                {group}
              </div>,
              ...items.map((entry) => {
                const Icon = SECTION_ICONS[entry.id];
                return (
                  <TabsTrigger
                    className={styles.railItem}
                    key={entry.id}
                    value={entry.id}
                  >
                    <span aria-hidden="true" className={styles.railIcon}>
                      <Icon />
                    </span>
                    <span className={styles.railLabel}>{entry.label}</span>
                  </TabsTrigger>
                );
              }),
            ])}
          </TabsList>
        </div>
        <div className={styles.body} ref={bodyRef}>
          <TabsContent value="overview">
            <OverviewSection
              onNavigate={go}
              onVerify={onVerify}
              verification={verification}
            />
          </TabsContent>
          <TabsContent value="account">
            <AccountSection onVerify={onVerify} verification={verification} />
          </TabsContent>
          <TabsContent value="cabinet">
            <CabinetSection />
          </TabsContent>
          <TabsContent value="members">
            <MembersSection />
          </TabsContent>
          <TabsContent value="preferences">
            <PreferencesSection />
          </TabsContent>
          <TabsContent value="communications">
            <CommunicationsSection />
          </TabsContent>
          <TabsContent value="billing">
            <BillingSection />
          </TabsContent>
          <TabsContent value="directory">
            <DirectorySection />
          </TabsContent>
          <TabsContent value="esign">
            <ESignSection />
          </TabsContent>
          <TabsContent value="security">
            <SecuritySection />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
