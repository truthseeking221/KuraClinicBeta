'use client';

import { cloneElement, isValidElement, useMemo, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';

import {
  Avatar,
  AvatarFallback,
  Badge,
  ChevronDownIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ClockIcon,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  IconButton,
  Kbd,
  LogoutIcon,
  MenuIcon,
  MoreHorizontalIcon,
  NotificationsIcon,
  SearchIcon,
  SettingsIcon,
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../ui';

import { MODE_REGISTRY } from './mode-registry';
import type {
  ClinicMode,
  ClinicShift,
  ClinicWorkspace,
  NavGroup,
  ShellPosture,
  ShellUser,
  Station,
} from './types';
import styles from './app-shell.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function renderNavIcon(icon: ReactNode, active: boolean) {
  if (!active || !isValidElement(icon)) {
    return icon;
  }

  return cloneElement(icon as ReactElement<{ iconStyle?: 'bulk-rounded' }>, {
    iconStyle: 'bulk-rounded',
  });
}

export type AppShellProps = {
  workspace: ClinicWorkspace;
  /** All workspaces the user belongs to. One workspace hides the switcher chevron. */
  workspaces?: ClinicWorkspace[];
  onWorkspaceChange?: (workspaceId: string) => void;
  onBranchChange?: (branchId: string) => void;

  mode: ClinicMode;
  /** Derived from capabilities — see deriveAvailableModes. One mode hides the switcher. */
  availableModes: ClinicMode[];
  onModeChange?: (mode: ClinicMode) => void;

  /** Shell chrome for the current workspace context. Independent from the active mode. */
  posture?: ShellPosture;

  /** Station context for front-desk and collection work. */
  station?: Station;
  onShiftChange?: (shift: ClinicShift) => void;

  user: ShellUser;
  onSignOut?: () => void;
  onOpenSettings?: () => void;

  /** Navigation for the active mode. Defaults to the mode registry. */
  nav?: NavGroup[];
  /** Effective capabilities used to remove unauthorized navigation items. */
  permissions?: readonly string[];
  /** Replaces workspace context when a route is explicitly person-global. */
  scopeLabel?: string;
  activeKey: string;
  onNavigate: (key: string) => void;

  /** Slot above the content for licence lifecycle or outage banners. */
  banner?: ReactNode;
  /** Extra topbar actions rendered before notifications. */
  headerActions?: ReactNode;

  onOpenSearch?: () => void;
  notificationCount?: number;
  onOpenNotifications?: () => void;

  defaultCollapsed?: boolean;
  children: ReactNode;
};

export function AppShell({
  activeKey,
  availableModes,
  banner,
  children,
  defaultCollapsed = false,
  headerActions,
  mode,
  nav,
  notificationCount = 0,
  onBranchChange,
  onModeChange,
  onNavigate,
  onOpenNotifications,
  onOpenSearch,
  onOpenSettings,
  onShiftChange,
  onSignOut,
  onWorkspaceChange,
  posture = 'sidebar',
  permissions,
  scopeLabel,
  station,
  user,
  workspace,
  workspaces,
}: AppShellProps) {
  const definition = MODE_REGISTRY[mode];
  const sourceNavGroups = nav ?? definition.nav;
  const navGroups = useMemo(() => {
    if (!permissions) return sourceNavGroups;
    const granted = new Set(permissions);
    return sourceNavGroups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) => !item.requiredAny || item.requiredAny.some((permission) => granted.has(permission)),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [permissions, sourceNavGroups]);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const activeBranch = useMemo(
    () => workspace.branches?.find((branch) => branch.id === workspace.activeBranchId),
    [workspace],
  );

  const contextLabel = scopeLabel ?? (activeBranch ? `${workspace.name} · ${activeBranch.name}` : workspace.name);

  return (
    <div
      className={joinClasses(styles.shell, posture === 'station' && styles.shellStation)}
      data-mode={mode}
      data-posture={posture}
      data-slot="app-shell"
    >
      {posture === 'sidebar' ? (
        <aside
          className={joinClasses(styles.sidebar, collapsed && styles.sidebarCollapsed)}
          data-slot="app-shell-sidebar"
        >
          <div className={styles.sidebarHeader}>
            <WorkspaceSwitcher
              collapsed={collapsed}
              onBranchChange={onBranchChange}
              onWorkspaceChange={onWorkspaceChange}
              scopeLabel={scopeLabel}
              workspace={workspace}
              workspaces={workspaces}
            />
          </div>

          <SidebarNav
            activeKey={activeKey}
            collapsed={collapsed}
            groups={navGroups}
            modeSwitcher={
              <ModeSwitcher
                availableModes={availableModes}
                collapsed={collapsed}
                mode={mode}
                onModeChange={onModeChange}
              />
            }
            onNavigate={onNavigate}
          />

          <div className={styles.sidebarFooter}>
            <button
              className={styles.navItem}
              data-active={activeKey === 'settings' ? 'true' : undefined}
              onClick={() => (onOpenSettings ? onOpenSettings() : onNavigate('settings'))}
              title={collapsed ? 'Settings' : undefined}
              type="button"
            >
              <span aria-hidden="true" className={styles.navIcon}>
                {renderNavIcon(<SettingsIcon size={16} />, activeKey === 'settings')}
              </span>
              {!collapsed && <span className={styles.navLabel}>Settings</span>}
            </button>
          </div>
        </aside>
      ) : null}

      <div className={styles.main}>
        <header className={styles.topbar} data-slot="app-shell-topbar">
          <div className={styles.topbarStart}>
            {posture === 'sidebar' ? (
              <IconButton
                aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
                className={styles.collapseToggle}
                onClick={() => setCollapsed((value) => !value)}
                size="micro"
                variant="tertiary"
              >
                {collapsed ? <ChevronsRightIcon size={16} /> : <ChevronsLeftIcon size={16} />}
              </IconButton>
            ) : null}
            {posture === 'sidebar' ? (
              <MobileNav
                activeKey={activeKey}
                contextLabel={contextLabel}
                groups={navGroups}
                modeSwitcher={
                  <ModeSwitcher
                    availableModes={availableModes}
                    mode={mode}
                    onModeChange={onModeChange}
                  />
                }
                onNavigate={onNavigate}
              />
            ) : (
              <StationIdentity mode={mode} station={station} />
            )}
            {posture === 'station' && station ? (
              <ShiftMenu onShiftChange={onShiftChange} shift={station.shift} />
            ) : null}
          </div>

          <div className={styles.topbarEnd}>
            {posture === 'station' ? (
              <ModeSwitcher
                availableModes={availableModes}
                mode={mode}
                onModeChange={onModeChange}
              />
            ) : null}
            {onOpenSearch ? (
              <button className={styles.searchTrigger} onClick={onOpenSearch} type="button">
                <SearchIcon aria-hidden="true" size={16} />
                <span className={styles.searchLabel}>Search</span>
                <Kbd>⌘K</Kbd>
              </button>
            ) : null}
            {headerActions}
            {onOpenNotifications ? (
              <span className={styles.notificationWrap}>
                <IconButton
                  aria-label={
                    notificationCount > 0
                      ? `Notifications, ${notificationCount} unread`
                      : 'Notifications'
                  }
                  onClick={onOpenNotifications}
                  size="default"
                  variant="tertiary"
                >
                  <NotificationsIcon size={18} />
                </IconButton>
                {notificationCount > 0 ? (
                  <Badge className={styles.notificationBadge} size="sm" variant="danger">
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </Badge>
                ) : null}
              </span>
            ) : null}
            <AccountMenu onOpenSettings={onOpenSettings} onSignOut={onSignOut} user={user} />
          </div>
        </header>

        {banner ? <div className={styles.banner}>{banner}</div> : null}

        <main className={styles.content} data-slot="app-shell-content">
          {children}
        </main>
      </div>
    </div>
  );
}

type WorkspaceSwitcherProps = {
  collapsed: boolean;
  onBranchChange?: (branchId: string) => void;
  onWorkspaceChange?: (workspaceId: string) => void;
  scopeLabel?: string;
  workspace: ClinicWorkspace;
  workspaces?: ClinicWorkspace[];
};

function WorkspaceSwitcher({
  collapsed,
  onBranchChange,
  onWorkspaceChange,
  scopeLabel,
  workspace,
  workspaces,
}: WorkspaceSwitcherProps) {
  const switchable = !scopeLabel && ((workspaces?.length ?? 0) > 1 || (workspace.branches?.length ?? 0) > 1);
  const activeBranch = scopeLabel
    ? undefined
    : workspace.branches?.find((branch) => branch.id === workspace.activeBranchId);
  const displayName = scopeLabel ?? workspace.name;
  const initial = displayName.charAt(0).toUpperCase();

  const triggerContent = (
    <>
      <span aria-hidden="true" className={styles.workspaceMark}>
        {initial}
      </span>
      {!collapsed && (
        <>
          <span className={styles.workspaceText}>
            <span className={styles.workspaceName}>{displayName}</span>
            {activeBranch ? (
              <span className={styles.workspaceBranch}>{activeBranch.name}</span>
            ) : null}
          </span>
          {switchable ? (
            <ChevronDownIcon aria-hidden="true" className={styles.workspaceChevron} size={14} />
          ) : null}
        </>
      )}
    </>
  );

  if (scopeLabel) {
    return (
      <div
        aria-label={`Scope: ${scopeLabel}`}
        className={styles.workspaceTrigger}
        data-scope="person"
        data-slot="workspace-switcher"
        title={collapsed ? scopeLabel : undefined}
      >
        {triggerContent}
      </div>
    );
  }

  const trigger = (
    <button
      className={styles.workspaceTrigger}
      data-slot="workspace-switcher"
      title={collapsed ? displayName : undefined}
      type="button"
    >
      {triggerContent}
    </button>
  );

  if (!switchable) {
    return trigger;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={styles.menuContent}>
        {(workspaces?.length ?? 0) > 1 ? (
          <>
            <DropdownMenuLabel>Workspace</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              onValueChange={(value) => onWorkspaceChange?.(value)}
              value={workspace.id}
            >
              {workspaces?.map((item) => (
                <DropdownMenuRadioItem key={item.id} value={item.id}>
                  {item.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </>
        ) : null}
        {(workspace.branches?.length ?? 0) > 1 ? (
          <>
            {(workspaces?.length ?? 0) > 1 ? <DropdownMenuSeparator /> : null}
            <DropdownMenuLabel>Branch</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              onValueChange={(value) => onBranchChange?.(value)}
              value={workspace.activeBranchId}
            >
              {workspace.branches?.map((branch) => (
                <DropdownMenuRadioItem key={branch.id} value={branch.id}>
                  {branch.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type ModeSwitcherProps = {
  availableModes: ClinicMode[];
  /** Icon-only trigger for the collapsed rail, where icons are the language. */
  collapsed?: boolean;
  mode: ClinicMode;
  onModeChange?: (mode: ClinicMode) => void;
};

/**
 * Scope control for the work zone: sits at the top of the nav it swaps, one
 * level below the workspace identity. Text-first: the "Work area" kicker
 * names the axis, the value names the current lens.
 */
function ModeSwitcher({ availableModes, collapsed = false, mode, onModeChange }: ModeSwitcherProps) {
  if (availableModes.length < 2) {
    return null;
  }

  const definition = MODE_REGISTRY[mode];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={collapsed ? `Work area: ${definition.label}` : undefined}
          className={joinClasses(styles.modeTrigger, collapsed && styles.modeTriggerCollapsed)}
          data-slot="mode-switcher"
          title={collapsed ? `Work area: ${definition.label}` : undefined}
          type="button"
        >
          {collapsed ? (
            <span aria-hidden="true" className={styles.navIcon}>
              {definition.icon}
            </span>
          ) : (
            <>
              <span aria-hidden="true" className={styles.navIcon}>
                {definition.icon}
              </span>
              <span className={styles.modeKicker}>Work area</span>
              <span className={styles.modeLabel}>{definition.label}</span>
              <ChevronDownIcon aria-hidden="true" className={styles.modeChevron} size={14} />
            </>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={styles.menuContent}>
        <DropdownMenuLabel>Switch work area</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          onValueChange={(value) => onModeChange?.(value as ClinicMode)}
          value={mode}
        >
          {availableModes.map((available) => {
            const item = MODE_REGISTRY[available];
            return (
              <DropdownMenuRadioItem key={available} value={available}>
                <span aria-hidden="true" className={styles.menuItemIcon}>
                  {item.icon}
                </span>
                {item.label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type SidebarNavProps = {
  activeKey: string;
  collapsed: boolean;
  groups: NavGroup[];
  modeSwitcher?: ReactNode;
  onNavigate: (key: string) => void;
  /** Rendering inside the mobile nav sheet — overflow groups stay inline there. */
  overlay?: boolean;
};

function SidebarNav({ activeKey, collapsed, groups, modeSwitcher, onNavigate, overlay = false }: SidebarNavProps) {
  return (
    <nav aria-label="Primary" className={styles.nav}>
      {modeSwitcher}
      {groups.map((group) =>
        group.overflow && !overlay ? (
          <div className={styles.navGroup} key={group.key}>
            <ul className={styles.navList}>
              <li>
                <NavOverflowMenu
                  activeKey={activeKey}
                  collapsed={collapsed}
                  group={group}
                  onNavigate={onNavigate}
                />
              </li>
            </ul>
          </div>
        ) : (
        <div className={styles.navGroup} key={group.key}>
          {group.label && !collapsed ? (
            <span className={styles.navGroupLabel}>{group.label}</span>
          ) : null}
          <ul className={styles.navList}>
            {group.items.map((item) => (
              <li key={item.key}>
                <button
                  className={styles.navItem}
                  data-active={item.key === activeKey ? 'true' : undefined}
                  data-coming-soon={item.comingSoon ? 'true' : undefined}
                  aria-current={item.key === activeKey ? 'page' : undefined}
                  onClick={() => onNavigate(item.key)}
                  title={
                    collapsed
                      ? item.comingSoon
                        ? `${item.label} · Coming soon`
                        : item.label
                      : undefined
                  }
                  type="button"
                >
                  <span aria-hidden="true" className={styles.navIcon}>
                    {renderNavIcon(item.icon, item.key === activeKey)}
                  </span>
                  {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
                  {!collapsed && item.comingSoon ? (
                    <Badge size="sm" variant="outline">
                      Soon
                    </Badge>
                  ) : null}
                  {!collapsed && !item.comingSoon && item.badgeCount ? (
                    <Badge size="sm" variant="secondary">
                      {item.badgeCount}
                    </Badge>
                  ) : null}
                  {collapsed && !item.comingSoon && item.badgeCount ? (
                    <span aria-hidden="true" className={styles.navDot} />
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
        ),
      )}
    </nav>
  );
}

type NavOverflowMenuProps = {
  activeKey: string;
  collapsed: boolean;
  group: NavGroup;
  onNavigate: (key: string) => void;
};

/**
 * One launcher item for an overflow nav group. The menu carries the roadmap
 * tags; the launcher itself is a live control and stays unmuted.
 */
function NavOverflowMenu({ activeKey, collapsed, group, onNavigate }: NavOverflowMenuProps) {
  const label = group.label ?? 'More';
  const containsActive = group.items.some((item) => item.key === activeKey);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={styles.navItem}
          data-active={containsActive ? 'true' : undefined}
          title={collapsed ? label : undefined}
          type="button"
        >
          <span aria-hidden="true" className={styles.navIcon}>
            {renderNavIcon(<MoreHorizontalIcon size={16} />, containsActive)}
          </span>
          {!collapsed && <span className={styles.navLabel}>{label}</span>}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={styles.menuContent} side="right">
        {group.items.map((item) => (
          <DropdownMenuItem key={item.key} onSelect={() => onNavigate(item.key)}>
            <span aria-hidden="true" className={styles.menuItemIcon}>
              {item.icon}
            </span>
            {item.label}
            {item.comingSoon ? (
              <span className={styles.menuItemTrailing}>
                <Badge size="sm" variant="outline">
                  Soon
                </Badge>
              </span>
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type MobileNavProps = {
  activeKey: string;
  contextLabel: string;
  groups: NavGroup[];
  modeSwitcher?: ReactNode;
  onNavigate: (key: string) => void;
};

function MobileNav({ activeKey, contextLabel, groups, modeSwitcher, onNavigate }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className={styles.mobileNav}>
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetTrigger aria-label="Open navigation" className={styles.mobileNavTrigger}>
          <MenuIcon aria-hidden="true" size={20} />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>{contextLabel}</SheetTitle>
            <SheetClose aria-label="Close navigation" />
          </SheetHeader>
          <SheetBody>
            <SidebarNav
              activeKey={activeKey}
              collapsed={false}
              groups={groups}
              modeSwitcher={modeSwitcher}
              onNavigate={(key) => {
                setOpen(false);
                onNavigate(key);
              }}
              overlay
            />
          </SheetBody>
        </SheetContent>
      </Sheet>
      <span className={styles.mobileContext}>{contextLabel}</span>
    </span>
  );
}

type StationIdentityProps = {
  mode: ClinicMode;
  station?: Station;
};

const STATION_ROLE_LABEL: Record<NonNullable<Station['role']>, string> = {
  vitals: 'Vital signs',
  phlebotomy: 'Phlebotomy',
};

function StationIdentity({ mode, station }: StationIdentityProps) {
  const definition = MODE_REGISTRY[mode];

  return (
    <span className={styles.stationIdentity} data-slot="station-identity">
      <span aria-hidden="true" className={styles.navIcon}>
        {definition.icon}
      </span>
      <span className={styles.stationText}>
        <span className={styles.stationTitle}>
          {station?.role ? STATION_ROLE_LABEL[station.role] : definition.label}
        </span>
        {station ? <span className={styles.stationMeta}>Station {station.id}</span> : null}
      </span>
    </span>
  );
}

type ShiftMenuProps = {
  onShiftChange?: (shift: ClinicShift) => void;
  shift: ClinicShift;
};

const SHIFT_LABEL: Record<ClinicShift, string> = {
  morning: 'Morning shift',
  afternoon: 'Afternoon shift',
};

function ShiftMenu({ onShiftChange, shift }: ShiftMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={styles.shiftTrigger} type="button">
          <ClockIcon aria-hidden="true" size={14} />
          {SHIFT_LABEL[shift]}
          <ChevronDownIcon aria-hidden="true" size={14} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={styles.menuContent}>
        <DropdownMenuRadioGroup
          onValueChange={(value) => onShiftChange?.(value as ClinicShift)}
          value={shift}
        >
          <DropdownMenuRadioItem value="morning">Morning shift</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="afternoon">Afternoon shift</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type AccountMenuProps = {
  onOpenSettings?: () => void;
  onSignOut?: () => void;
  user: ShellUser;
};

/** "Dr. Sok Vanna" → "SV": honorifics carry no identity, first + last name do. */
function initialsFor(name: string) {
  const words = name
    .replace(/^(dr|mr|mrs|ms|prof)\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return '?';
  const first = words[0].charAt(0);
  const last = words.length > 1 ? words[words.length - 1].charAt(0) : '';
  return `${first}${last}`.toUpperCase();
}

function AccountMenu({ onOpenSettings, onSignOut, user }: AccountMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button aria-label={`Account: ${user.name}`} className={styles.accountTrigger} type="button">
          <Avatar aria-hidden="true" size="sm">
            <AvatarFallback tone="neutral">{initialsFor(user.name)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={styles.menuContent}>
        <DropdownMenuLabel>
          <span className={styles.accountName}>
            {user.name}
          </span>
          <span className={styles.accountEmail}>{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => onOpenSettings?.()}>
            <span aria-hidden="true" className={styles.menuItemIcon}>
              <SettingsIcon size={16} />
            </span>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onSignOut?.()}>
            <span aria-hidden="true" className={styles.menuItemIcon}>
              <LogoutIcon size={16} />
            </span>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
