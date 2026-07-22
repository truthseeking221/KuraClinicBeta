'use client';

import { cloneElement, isValidElement, useMemo, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import Image from 'next/image';

import {
  Avatar,
  AvatarFallback,
  Badge,
  ChevronDownIcon,
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
  PanelRightIcon,
  SearchIcon,
  SettingsIcon,
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  UserMultipleIcon,
} from '../../ui';
import { LOCALES, LOCALE_LABELS, useLocale, useT } from '../../foundations/i18n';
import type { Locale } from '../../foundations/i18n';

import { initialsFor } from '../subject-header/identity';

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
  /** All workspaces the user belongs to. One workspace removes the switch section. */
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
  /** Workspace-scoped settings. Omit when the actor may not manage the workspace. */
  onOpenWorkspaceSettings?: () => void;
  /** Who may act inside this workspace. Omit when the actor may not manage members. */
  onOpenTeamAccess?: () => void;

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
  /** Utility actions shown in the sidebar footer, or in the station/mobile topbar. */
  headerActions?: ReactNode;
  /** Page gutters by default; full-height workspaces can own their internal spacing. */
  contentInset?: 'page' | 'none';

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
  contentInset = 'page',
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
  onOpenTeamAccess,
  onOpenWorkspaceSettings,
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
  const t = useT();
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
      data-sidebar-collapsed={posture === 'sidebar' && collapsed ? 'true' : undefined}
      data-slot="app-shell"
    >
      {posture === 'sidebar' ? (
        <aside
          aria-label={t('Primary navigation')}
          className={joinClasses(styles.sidebar, collapsed && styles.sidebarCollapsed)}
          data-slot="app-shell-sidebar"
        >
          <div className={styles.sidebarHeader}>
            <div className={styles.sidebarBrand} data-slot="app-shell-sidebar-brand">
              <span className={styles.brandIdentity}>
                <Image
                  alt="Kura"
                  className={styles.brandLogoFull}
                  height={20}
                  priority
                  src="/brand/kura-full-logo.svg"
                  width={61}
                />
                <Image
                  alt=""
                  aria-hidden="true"
                  className={styles.brandLogoMark}
                  height={20}
                  src="/brand/kura-mark.svg"
                  width={24}
                />
              </span>
              <button
                aria-expanded={!collapsed}
                aria-label={collapsed ? t('Expand navigation') : t('Collapse navigation')}
                className={styles.collapseToggle}
                onClick={() => setCollapsed((value) => !value)}
                title={collapsed ? t('Expand navigation') : t('Collapse navigation')}
                type="button"
              >
                <PanelRightIcon
                  aria-hidden="true"
                  className={styles.collapseToggleIcon}
                  size={18}
                />
              </button>
            </div>
          </div>

          {onOpenSearch ? (
            <button
              aria-label={collapsed ? t('Search') : undefined}
              className={joinClasses(styles.navItem, styles.sidebarSearch)}
              onClick={onOpenSearch}
              title={collapsed ? t('Search') : undefined}
              type="button"
            >
              <span aria-hidden="true" className={styles.navIcon}>
                <SearchIcon size={18} />
              </span>
              <span className={styles.navLabel}>{t('Search')}</span>
              <span className={styles.searchKbd}>
                <Kbd>⌘K</Kbd>
              </span>
            </button>
          ) : null}

          <WorkspaceSwitcher
            collapsed={collapsed}
            onBranchChange={onBranchChange}
            onOpenTeamAccess={onOpenTeamAccess}
            onOpenWorkspaceSettings={onOpenWorkspaceSettings}
            onWorkspaceChange={onWorkspaceChange}
            scopeLabel={scopeLabel}
            workspace={workspace}
            workspaces={workspaces}
          />

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

          <div className={styles.sidebarFooter} data-slot="app-shell-sidebar-footer">
            {(!collapsed && headerActions) || onOpenNotifications ? (
              <div className={styles.sidebarActionRow}>
                {!collapsed && headerActions ? (
                  <div className={styles.sidebarCustomActions}>{headerActions}</div>
                ) : null}
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
              </div>
            ) : null}

            <div className={styles.sidebarAccount}>
              <AccountMenu
                expanded={!collapsed}
                onOpenSettings={() => (onOpenSettings ? onOpenSettings() : onNavigate('settings'))}
                onSignOut={onSignOut}
                user={user}
              />
            </div>
          </div>
        </aside>
      ) : null}

      <div className={styles.main}>
        <header className={styles.topbar} data-slot="app-shell-topbar">
          <div className={styles.topbarStart}>
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
                <span className={styles.searchLabel}>{t('Search')}</span>
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
            <AccountMenu
              onOpenSettings={() => (onOpenSettings ? onOpenSettings() : onNavigate('settings'))}
              onSignOut={onSignOut}
              user={user}
            />
          </div>
        </header>

        {banner ? <div className={styles.banner}>{banner}</div> : null}

        <main
          className={styles.content}
          data-content-inset={contentInset}
          data-slot="app-shell-content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

type WorkspaceSwitcherProps = {
  collapsed: boolean;
  onBranchChange?: (branchId: string) => void;
  onOpenTeamAccess?: () => void;
  onOpenWorkspaceSettings?: () => void;
  onWorkspaceChange?: (workspaceId: string) => void;
  scopeLabel?: string;
  workspace: ClinicWorkspace;
  workspaces?: ClinicWorkspace[];
};

/**
 * The workspace row is identity first and a menu second. It opens when the
 * actor can change workspace, change branch, or reach a workspace-scoped
 * destination; with none of those it stays a plain label rather than a control
 * that opens nothing. Workspace-scoped destinations are separate props, so a
 * caller who may not manage the workspace simply omits them — the shell never
 * decides authorization.
 */
function WorkspaceSwitcher({
  collapsed,
  onBranchChange,
  onOpenTeamAccess,
  onOpenWorkspaceSettings,
  onWorkspaceChange,
  scopeLabel,
  workspace,
  workspaces,
}: WorkspaceSwitcherProps) {
  const t = useT();
  const switchableWorkspaces = !scopeLabel && (workspaces?.length ?? 0) > 1;
  const switchableBranches = !scopeLabel && (workspace.branches?.length ?? 0) > 1;
  const destinations = !scopeLabel && Boolean(onOpenWorkspaceSettings || onOpenTeamAccess);
  const interactive = switchableWorkspaces || switchableBranches || destinations;
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
      <span className={styles.workspaceText}>
        <span className={styles.workspaceName}>{displayName}</span>
        {activeBranch ? (
          <span className={styles.workspaceBranch}>{activeBranch.name}</span>
        ) : null}
      </span>
      {interactive ? (
        <ChevronDownIcon aria-hidden="true" className={styles.workspaceChevron} size={14} />
      ) : null}
    </>
  );

  if (!interactive) {
    return (
      <div
        aria-label={scopeLabel ? `Scope: ${scopeLabel}` : `${t('Workspace')}: ${displayName}`}
        className={styles.workspaceTrigger}
        data-collapsed={collapsed ? 'true' : undefined}
        data-scope={scopeLabel ? 'person' : undefined}
        data-slot="workspace-switcher"
        data-static="true"
        title={collapsed ? displayName : undefined}
      >
        {triggerContent}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={`${t('Workspace')}: ${displayName}`}
          className={styles.workspaceTrigger}
          data-collapsed={collapsed ? 'true' : undefined}
          data-slot="workspace-switcher"
          title={collapsed ? displayName : undefined}
          type="button"
        >
          {triggerContent}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={styles.menuContent}>
        {switchableWorkspaces ? (
          <>
            <DropdownMenuLabel>{t('Workspace')}</DropdownMenuLabel>
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
        {switchableBranches ? (
          <>
            {switchableWorkspaces ? <DropdownMenuSeparator /> : null}
            <DropdownMenuLabel>{t('Branch')}</DropdownMenuLabel>
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
        {destinations ? (
          <>
            {switchableWorkspaces || switchableBranches ? <DropdownMenuSeparator /> : null}
            <DropdownMenuGroup>
              {onOpenWorkspaceSettings ? (
                <DropdownMenuItem onSelect={() => onOpenWorkspaceSettings()}>
                  <span aria-hidden="true" className={styles.menuItemIcon}>
                    <SettingsIcon size={16} />
                  </span>
                  {t('Workspace settings')}
                </DropdownMenuItem>
              ) : null}
              {onOpenTeamAccess ? (
                <DropdownMenuItem onSelect={() => onOpenTeamAccess()}>
                  <span aria-hidden="true" className={styles.menuItemIcon}>
                    <UserMultipleIcon size={16} />
                  </span>
                  {t('Team access')}
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuGroup>
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
 * level below the workspace identity. The visible label names the axis and
 * the value names the current lens; the collapsed rail retains its icon.
 */
function ModeSwitcher({ availableModes, collapsed = false, mode, onModeChange }: ModeSwitcherProps) {
  const t = useT();

  if (availableModes.length < 2) {
    return null;
  }

  const definition = MODE_REGISTRY[mode];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={`${t('Work area')}: ${t(definition.label)}`}
          className={joinClasses(styles.modeTrigger, collapsed && styles.modeTriggerCollapsed)}
          data-collapsed={collapsed ? 'true' : undefined}
          data-slot="mode-switcher"
          title={collapsed ? `${t('Work area')}: ${t(definition.label)}` : undefined}
          type="button"
        >
          {collapsed ? (
            <span aria-hidden="true" className={styles.navIcon}>
              {definition.icon}
            </span>
          ) : (
            <span className={styles.modeCopy}>
              <span className={styles.modeKicker}>{t('Work area')}</span>
              <span className={styles.modeLabel}>{t(definition.label)}</span>
            </span>
          )}
          {!collapsed ? (
            <ChevronDownIcon aria-hidden="true" className={styles.modeChevron} size={14} />
          ) : null}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={styles.menuContent}>
        <DropdownMenuLabel>{t('Switch work area')}</DropdownMenuLabel>
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
                {t(item.label)}
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
  const t = useT();

  return (
    <nav aria-label={t('Primary')} className={styles.nav}>
      {modeSwitcher}
      {groups.map((group) => {
        const rawGroupLabel = group.label ?? (group.key === 'work' ? 'Work' : undefined);
        const groupLabel = rawGroupLabel ? t(rawGroupLabel) : undefined;

        return group.overflow && !overlay ? (
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
          {groupLabel ? (
            <span className={styles.navGroupLabel}>{groupLabel}</span>
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
                        ? `${t(item.label)} · ${t('Coming soon')}`
                        : t(item.label)
                      : undefined
                  }
                  type="button"
                >
                  <span aria-hidden="true" className={styles.navIcon}>
                    {renderNavIcon(item.icon, item.key === activeKey)}
                  </span>
                  <span className={styles.navLabel}>{t(item.label)}</span>
                  {!collapsed && item.comingSoon ? (
                    <Badge size="sm" variant="outline">
                      {t('Soon')}
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
        );
      })}
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
  const t = useT();
  const label = t(group.label ?? 'More');
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
          <span className={styles.navLabel}>{label}</span>
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
  const t = useT();
  const [open, setOpen] = useState(false);

  return (
    <span className={styles.mobileNav}>
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetTrigger aria-label={t('Open navigation')} className={styles.mobileNavTrigger}>
          <MenuIcon aria-hidden="true" size={20} />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>{contextLabel}</SheetTitle>
            <SheetClose aria-label={t('Close navigation')} />
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
  const t = useT();
  const definition = MODE_REGISTRY[mode];

  return (
    <span className={styles.stationIdentity} data-slot="station-identity">
      <span aria-hidden="true" className={styles.navIcon}>
        {definition.icon}
      </span>
      <span className={styles.stationText}>
        <span className={styles.stationTitle}>
          {t(station?.role ? STATION_ROLE_LABEL[station.role] : definition.label)}
        </span>
        {station ? (
          <span className={styles.stationMeta}>
            {t('Station')} {station.id}
          </span>
        ) : null}
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
  const t = useT();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={styles.shiftTrigger} type="button">
          <ClockIcon aria-hidden="true" size={14} />
          {t(SHIFT_LABEL[shift])}
          <ChevronDownIcon aria-hidden="true" size={14} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={styles.menuContent}>
        <DropdownMenuRadioGroup
          onValueChange={(value) => onShiftChange?.(value as ClinicShift)}
          value={shift}
        >
          <DropdownMenuRadioItem value="morning">{t('Morning shift')}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="afternoon">{t('Afternoon shift')}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type AccountMenuProps = {
  expanded?: boolean;
  onOpenSettings?: () => void;
  onSignOut?: () => void;
  user: ShellUser;
};

function AccountMenu({ expanded = false, onOpenSettings, onSignOut, user }: AccountMenuProps) {
  const t = useT();
  const { locale, setLocale } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={`${t('Account')}: ${user.name}`}
          className={joinClasses(styles.accountTrigger, expanded && styles.accountTriggerExpanded)}
          type="button"
        >
          <Avatar aria-hidden="true" size="sm">
            <AvatarFallback tone="neutral">{initialsFor(user.name)}</AvatarFallback>
          </Avatar>
          <span className={styles.accountTriggerCopy}>
            <span className={styles.accountTriggerName}>{user.name}</span>
            <span className={styles.accountTriggerMeta}>{user.email}</span>
          </span>
          <ChevronDownIcon aria-hidden="true" className={styles.accountTriggerChevron} size={14} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={expanded ? 'start' : 'end'} className={styles.menuContent}>
        <DropdownMenuLabel>
          <span className={styles.accountName}>
            {user.name}
          </span>
          <span className={styles.accountEmail}>{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{t('Language')}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          onValueChange={(value) => setLocale(value as Locale)}
          value={locale}
        >
          {LOCALES.map((option) => (
            // Each language names itself in its own script, so a user who lands
            // in the wrong language can still find the way back.
            <DropdownMenuRadioItem key={option} lang={option} value={option}>
              {LOCALE_LABELS[option]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => onOpenSettings?.()}>
            <span aria-hidden="true" className={styles.menuItemIcon}>
              <SettingsIcon size={16} />
            </span>
            {t('Settings')}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onSignOut?.()}>
            <span aria-hidden="true" className={styles.menuItemIcon}>
              <LogoutIcon size={16} />
            </span>
            {t('Sign out')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
