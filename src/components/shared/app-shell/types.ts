import type { ReactNode } from 'react';

/**
 * Operational modes of the unified Clinic App.
 *
 * A mode is a way of working inside one workspace — never a persona, never a
 * separate application. Availability is derived from effective capabilities;
 * a role name is not an authorization decision.
 */
export type ClinicMode = 'clinical' | 'front-desk' | 'collection';

/** How the shell arranges its chrome for the current workspace context. */
export type ShellPosture = 'sidebar' | 'station';

export type ClinicShift = 'morning' | 'afternoon';

export type Station = {
  /** Physical booth or desk identifier, e.g. PSC-01. */
  id: string;
  /** Station role inside collection mode; one booth measures vitals, another draws. */
  role?: 'vitals' | 'phlebotomy';
  shift: ClinicShift;
};

export type WorkspaceBranch = {
  id: string;
  name: string;
};

export type ClinicWorkspace = {
  id: string;
  name: string;
  branches?: WorkspaceBranch[];
  activeBranchId?: string;
};

export type ShellUser = {
  name: string;
  email: string;
  /** Professional licence verified (KYD). Gates clinical mode, shown in the account menu. */
  licenceVerified: boolean;
};

export type NavItem = {
  key: string;
  label: string;
  icon: ReactNode;
  /** Item is visible when the actor holds at least one required capability. */
  requiredAny?: string[];
  /** Count of items needing attention. Omit zero — render nothing instead of "0". */
  badgeCount?: number;
  /**
   * Roadmap surface that is not usable yet. Rendered muted with a "Soon" tag but
   * still navigable, so the destination can explain itself instead of a dead
   * control. Deferred work must never look live.
   */
  comingSoon?: boolean;
};

export type NavGroup = {
  key: string;
  /** Group heading. Omit for the primary ungrouped block. */
  label?: string;
  items: NavItem[];
  /**
   * Collapse the group into one launcher item that opens a menu, keeping the
   * always-visible rail short. Inside the mobile nav sheet the group still
   * renders inline — no overlay stacked on an overlay.
   */
  overflow?: boolean;
};

export type ModeDefinition = {
  mode: ClinicMode;
  label: string;
  icon: ReactNode;
  /** Landing destination when the mode opens. */
  entryKey: string;
  /** Mode is available when the user holds at least one of these capabilities. */
  requiredAny: string[];
  /** Module flag the workspace must have enabled. */
  moduleFlag: string;
  /** Clinical mode additionally requires a verified professional licence. */
  requiresLicence?: boolean;
  nav: NavGroup[];
};

export type ModeAvailabilityInput = {
  permissions: string[];
  enabledModules: Record<string, boolean>;
  licenceVerified: boolean;
};
