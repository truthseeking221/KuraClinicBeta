'use client';

import { useState } from 'react';

import {
  LOCALES,
  LOCALE_LABELS,
  useLocale,
  useT,
} from '../../components/foundations/i18n';
import type { Locale } from '../../components/foundations/i18n';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Input,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  SegmentedToggle,
  Select,
  Switch,
  toast,
} from '../../components/ui';
import { IdentityVerifiedIcon, UploadIcon } from '../../components/ui/icons';

import type {
  Member,
  PendingInvite,
  Prefs,
  SettingsSectionId,
  VerificationStatus,
} from './logic';
import {
  MEMBER_ROLES,
  PREFS_VALUE_TEXT,
  VERIFICATION_META,
  inviteError,
  loadPrefs,
  savePrefs,
} from './logic';
import {
  CABINET,
  DEFAULT_COURIER_PICKUP,
  LICENSE_RENEWAL_DAYS,
  ME,
  MEMBERS,
  PENDING_INVITES,
} from './demo-data';
import {
  FilePickButton,
  SettingsRow,
  SettingsRows,
  SettingsSection,
  VerificationBadge,
  VerificationBannerAlert,
} from './settings-rows';
import { CourierPickupRow } from './structured-editors';
import styles from './settings.module.css';

/* -------------------------------- overview ------------------------------- */

export type OverviewSectionProps = {
  verification: VerificationStatus;
  onNavigate: (section: SettingsSectionId) => void;
  onVerify?: () => void;
  firstUse?: boolean;
  identity?: { contact: string; name: string };
  workspaceName?: string;
};

/** At-a-glance workspace status with jump links into each detail section. */
export function OverviewSection({
  firstUse = false,
  identity,
  verification,
  onNavigate,
  onVerify,
  workspaceName,
}: OverviewSectionProps) {
  const t = useT();
  const personName = identity?.name ?? ME.name;
  const initials = personName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

  return (
    <SettingsSection
      sub={t('Priority settings for this workspace.')}
      title={t('Overview')}
    >
      {!firstUse && (verification === 'verified' || verification === 'expiring') ? (
        <Alert role="status" tone="warning">
          <AlertTitle>
            {t('Medical license expires in')} {LICENSE_RENEWAL_DAYS} {t('days')}
          </AlertTitle>
          <AlertDescription>
            {ME.license} {t('expires')} {ME.licenseExpiry}.{' '}
            {t(
              'Renew it before lapse to keep this credential available for new order attribution.',
            )}
          </AlertDescription>
          <AlertAction>
            <Button onClick={() => onNavigate('account')} size="sm" variant="secondary">
              {t('Upload renewed license')}
            </Button>
          </AlertAction>
        </Alert>
      ) : (
        <VerificationBannerAlert onAction={onVerify} status={verification} />
      )}
      <SettingsRows>
        <SettingsRow
          action={
            <Button onClick={() => onNavigate('account')} size="sm" variant="ghost">
              {t('Edit account')}
            </Button>
          }
          label={t('Signed in as')}
          sub={firstUse ? identity?.contact : ME.email}
          value={
            <span className={styles.valueWithMedia}>
              <Avatar aria-hidden="true" size="xs">
                <AvatarFallback>{firstUse ? initials : ME.initials}</AvatarFallback>
              </Avatar>
              {personName}
            </span>
          }
        />
        <SettingsRow
          action={
            <Button onClick={onVerify} size="sm" variant="ghost">
              {t('Verify license')}
            </Button>
          }
          label={t('Verification')}
          sub={t('Medical license and identity review')}
          value={<VerificationBadge status={verification} />}
        />
        <SettingsRow
          action={
            <Button onClick={() => onNavigate('cabinet')} size="sm" variant="ghost">
              {t('Edit clinic')}
            </Button>
          }
          label={t('Cabinet')}
          sub={
            firstUse ? t('Created during onboarding') : t('Phnom Penh · GMT+7')
          }
          value={firstUse ? (workspaceName ?? t('My cabinet')) : CABINET.name}
        />
        <SettingsRow
          action={
            <Button onClick={() => onNavigate('members')} size="sm" variant="ghost">
              {t('Review team')}
            </Button>
          }
          label={t('Team')}
          sub={
            firstUse ? t('No pending invites') : t('1 invite pending approval')
          }
          value={firstUse ? t('1 active member') : t('5 active members')}
        />
        <SettingsRow
          action={
            <Button onClick={() => onNavigate('billing')} size="sm" variant="ghost">
              {t('View payments')}
            </Button>
          }
          label={t('Payments')}
          sub={
            firstUse
              ? t('No workspace payment methods or insurer panels configured')
              : t('KHQR active · next netting Jul 1')
          }
          value={firstUse ? t('Not configured') : (
            <span className={styles.valueWithBadge}>
              {t('Bank verified')}
              <Badge size="sm" variant="success">
                ABA ···· 4102
              </Badge>
            </span>
          )}
        />
        <SettingsRow
          action={
            <Button onClick={() => onNavigate('esign')} size="sm" variant="ghost">
              {t('View documents')}
            </Button>
          }
          label={t('Signed documents')}
          sub={
            firstUse
              ? t('No signing certificate or signed documents configured')
              : 'PAdES-B-LT · CamDX root'
          }
          value={
            firstUse ? t('Not configured') : t('Certificate active until Mar 2027')
          }
        />
      </SettingsRows>
    </SettingsSection>
  );
}

/* --------------------------------- account ------------------------------- */

export type AccountSectionProps = {
  verification: VerificationStatus;
  onVerify?: () => void;
  firstUse?: boolean;
  identity?: { contact: string; name: string };
};

/** Identity, medical license, and license verification status. */
export function AccountSection({
  firstUse = false,
  identity,
  verification,
  onVerify,
}: AccountSectionProps) {
  const t = useT();
  const [renewalFile, setRenewalFile] = useState<string | null>(null);
  const clinicianName = identity?.name ?? ME.name;
  const contact = identity?.contact ?? ME.email;
  const phoneContact = contact.startsWith('+');

  return (
    <SettingsSection
      chip={<VerificationBadge status={verification} />}
      sub={t('Identity details and professional credential review status.')}
      title={t('Account & verification')}
    >
      <SettingsRows>
        <SettingsRow
          label={firstUse && phoneContact ? t('Phone') : t('Email')}
          sub={
            firstUse && phoneContact
              ? t('Verified primary sign-in phone')
              : t('Used for sign-in and statements')
          }
          value={contact}
        />
        <SettingsRow
          label={t('Clinician name')}
          locked={!firstUse}
          sub={firstUse ? undefined : ME.khmerName}
          value={clinicianName}
        />
        <SettingsRow
          action={
            <FilePickButton
              accept=".pdf,.jpg,.jpeg,.png"
              leadingIcon={<UploadIcon aria-hidden="true" />}
              onSelected={(file) => setRenewalFile(file.name)}
              variant="secondary"
            >
              {t('Upload license')}
            </FilePickButton>
          }
          label={t('Medical license')}
          locked={!firstUse}
          sub={
            renewalFile
              ? `${renewalFile} ${t('selected')}`
              : firstUse
                ? verification === 'none'
                  ? t('No document submitted')
                  : t(
                      'Credential identifier and document details are not available',
                    )
                : `${t('Expires')} ${ME.licenseExpiry}`
          }
          value={
            <span className={styles.valueWithBadge}>
              {firstUse ? t(VERIFICATION_META[verification].label) : ME.license}
              {renewalFile ? (
                <Badge size="sm" variant="info">
                  {t('File selected')}
                </Badge>
              ) : firstUse ? null : (
                <Badge size="sm" variant="warning">
                  {t('Renews in')} {LICENSE_RENEWAL_DAYS} {t('days')}
                </Badge>
              )}
            </span>
          }
        />
        <SettingsRow
          action={
            <Button onClick={onVerify} size="sm" variant="ghost">
              {t('Verify license')}
            </Button>
          }
          label={t('License verification')}
          sub={t(
            'A live credential is required only when this member is attributed to a new clinic order',
          )}
          value={<VerificationBadge status={verification} />}
        />
        <SettingsRow
          label={t('Review authority')}
          sub={t(
            'Reviewer verdicts are recorded separately from the credential lifecycle',
          )}
          value={t('Kura professional review')}
        />
        {!firstUse ? (
          <SettingsRow
            label={t('Signature & certificate')}
            sub={t('Managed under Signed documents')}
            value={
              <span className={styles.valueWithMedia}>
                <IdentityVerifiedIcon aria-hidden="true" className={styles.valueIcon} />
                {t('Ready to sign')}
              </span>
            }
          />
        ) : null}
      </SettingsRows>
      <VerificationBannerAlert onAction={onVerify} status={verification} />
    </SettingsSection>
  );
}

/* --------------------------------- cabinet ------------------------------- */

export type CabinetSectionProps = {
  firstUse?: boolean;
  workspaceName?: string;
};

/** The clinic entity this workspace operates under. */
export function CabinetSection({
  firstUse = false,
  workspaceName,
}: CabinetSectionProps) {
  const t = useT();

  if (firstUse) {
    return (
      <SettingsSection
        sub={t(
          'The clinic this workspace operates under. Add operational details before enabling dependent services.',
        )}
        title={t('Cabinet')}
      >
        <SettingsRows>
          <SettingsRow
            label={t('Cabinet name')}
            value={workspaceName ?? t('My cabinet')}
          />
          <SettingsRow label={t('Address')} value={t('Not configured')} />
          <SettingsRow label={t('Specialty')} value={t('Not configured')} />
          <SettingsRow label={t('Clinic type')} value={t('Not configured')} />
          <SettingsRow label={t('Country')} value={t('Not configured')} />
          <SettingsRow label={t('Timezone')} value={t('Not configured')} />
          <SettingsRow label={t('Currency')} value={t('Not configured')} />
          <SettingsRow label={t('Courier pickup')} value={t('Not configured')} />
        </SettingsRows>
      </SettingsSection>
    );
  }

  return (
    <SettingsSection
      sub={t(
        'The clinic this workspace operates under. Lab routing, billing, and compliance follow these fields.',
      )}
      title={t('Cabinet')}
    >
      <SettingsRows>
        <SettingsRow label={t('Cabinet name')} value={CABINET.name} />
        <SettingsRow label={t('Address')} value={CABINET.address} />
        <SettingsRow label={t('Specialty')} value={CABINET.specialty} />
        <SettingsRow label={t('Clinic type')} value={CABINET.clinicType} />
        <SettingsRow
          label={t('Country')}
          locked
          sub={t('Determines insurer panel, currency, and patient channels')}
          value={CABINET.country}
        />
        <SettingsRow label={t('Timezone')} value={CABINET.timezone} />
        <SettingsRow label={t('Currency')} value={CABINET.currency} />
        <CourierPickupRow initialPickup={DEFAULT_COURIER_PICKUP} />
      </SettingsRows>
      <Alert role="status" tone="info">
        <AlertTitle>{t('Country is locked after registration')}</AlertTitle>
        <AlertDescription>
          {t(
            'Billing rails, insurer contracts, and lab logistics are provisioned per country. Contact Kura support to migrate a cabinet across borders.',
          )}
        </AlertDescription>
      </Alert>
    </SettingsSection>
  );
}

/* --------------------------------- members ------------------------------- */

const ROLE_OPTIONS = MEMBER_ROLES.map((role) => ({ value: role, label: role }));

type InviteConfirm = { kind: 'approve' | 'revoke'; invite: PendingInvite };

export type MembersSectionProps = {
  firstUse?: boolean;
  identity?: { name: string };
};

/** Member roster, guarded role changes, invite approval, and new invites. */
export function MembersSection({
  firstUse = false,
  identity,
}: MembersSectionProps) {
  const t = useT();
  const [members, setMembers] = useState<Member[]>(() =>
    firstUse
      ? [{ name: identity?.name ?? 'Account owner', role: 'Owner', you: true }]
      : [...MEMBERS],
  );
  const [pending, setPending] = useState<PendingInvite[]>(() =>
    firstUse ? [] : [...PENDING_INVITES],
  );
  const [editingName, setEditingName] = useState<string | null>(null);
  const [roleDraft, setRoleDraft] = useState<string>(MEMBER_ROLES[0]);
  const [roleConfirmName, setRoleConfirmName] = useState<string | null>(null);
  const [inviteConfirm, setInviteConfirm] = useState<InviteConfirm | null>(null);
  const [inviting, setInviting] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState<string>(MEMBER_ROLES[0]);
  const [inviteFieldError, setInviteFieldError] = useState<string | null>(null);

  const roleOptions = ROLE_OPTIONS.map((option) => ({
    ...option,
    label: t(option.label),
  }));

  const requestRoleSave = (member: Member) => {
    if (roleDraft === member.role) {
      setEditingName(null);
      return;
    }
    setRoleConfirmName(member.name);
  };

  const confirmRoleChange = () => {
    if (!roleConfirmName) return;
    setMembers((current) =>
      current.map((member) =>
        member.name === roleConfirmName ? { ...member, role: roleDraft } : member,
      ),
    );
    toast.success(`${t('Role updated for')} ${roleConfirmName}`);
    setRoleConfirmName(null);
    setEditingName(null);
  };

  const confirmInviteAction = () => {
    if (!inviteConfirm) return;
    const { kind, invite } = inviteConfirm;
    if (kind === 'approve') {
      setPending((current) => current.filter((entry) => entry.name !== invite.name));
      setMembers((current) => [...current, { name: invite.name, role: invite.role }]);
      toast.success(
        `${invite.name} ${t('approved as')} ${t(invite.role)}`,
      );
    } else {
      setPending((current) => current.filter((entry) => entry.name !== invite.name));
      toast(`${t('Invite to')} ${invite.name} ${t('revoked')}`);
    }
    setInviteConfirm(null);
  };

  const sendInvite = () => {
    const nextError = inviteError(inviteName, members, pending);
    if (nextError) {
      setInviteFieldError(nextError);
      return;
    }
    const name = inviteName.trim();
    setPending((current) => [
      ...current,
      { name, role: inviteRole, sent: 'invited just now' },
    ]);
    toast.success(`${t('Invite sent to')} ${name}`);
    setInviting(false);
    setInviteName('');
    setInviteRole(MEMBER_ROLES[0]);
    setInviteFieldError(null);
  };

  const cancelInvite = () => {
    setInviting(false);
    setInviteName('');
    setInviteFieldError(null);
  };

  return (
    <SettingsSection
      chip={
        <Badge size="sm" variant="neutral">
          {members.length} {t('active')}
        </Badge>
      }
      sub={t(
        'Roles scope what each member can see and do. All PHI access is logged.',
      )}
      title={t('Team access')}
    >
      <SettingsRows>
        {members.map((member) => (
          <Item className={styles.row} key={member.name} size="sm">
            <ItemMedia>
              <Avatar aria-hidden="true" size="sm" {...(member.you ? { ring: 'success' } : {})}>
                <AvatarFallback tone={member.you ? 'success' : undefined}>
                  {member.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle className={styles.rowLabel}>
                {member.name}
                {member.you ? (
                  <Badge size="sm" variant="outline">
                    {t('you')}
                  </Badge>
                ) : null}
              </ItemTitle>
              <ItemDescription>{t(member.role)}</ItemDescription>
            </ItemContent>
            <ItemActions className={styles.rowActions}>
              {editingName === member.name ? (
                <div className={styles.roleEdit}>
                  <Select
                    aria-label={`${t('Role for')} ${member.name}`}
                    onValueChange={(value) => {
                      if (value) setRoleDraft(value);
                    }}
                    options={roleOptions}
                    value={roleDraft}
                  />
                  <Button onClick={() => requestRoleSave(member)} size="sm" variant="primary">
                    {t('Save')}
                  </Button>
                  <Button onClick={() => setEditingName(null)} size="sm" variant="ghost">
                    {t('Cancel')}
                  </Button>
                </div>
              ) : (
                <Button
                  disabled={member.you}
                  onClick={() => {
                    setEditingName(member.name);
                    setRoleDraft(
                      MEMBER_ROLES.find((role) => role === member.role) ?? MEMBER_ROLES[0],
                    );
                  }}
                  size="sm"
                  variant="ghost"
                >
                  {t('Edit role')}
                </Button>
              )}
            </ItemActions>
          </Item>
        ))}
        {pending.map((invite) => (
          <Item className={styles.row} key={invite.name} size="sm">
            <ItemMedia>
              <Avatar aria-hidden="true" size="sm">
                <AvatarFallback tone="warning">
                  {invite.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle className={styles.rowLabel}>
                {invite.name}
                <Badge size="sm" variant="warning">
                  {t('Pending')}
                </Badge>
              </ItemTitle>
              <ItemDescription>
                {t(invite.role)} · {t(invite.sent)}
              </ItemDescription>
            </ItemContent>
            <ItemActions className={styles.rowActions}>
              <Button
                onClick={() => setInviteConfirm({ kind: 'approve', invite })}
                size="sm"
                variant="secondary"
              >
                {t('Approve')}
              </Button>
              <Button
                onClick={() => setInviteConfirm({ kind: 'revoke', invite })}
                size="sm"
                variant="ghost"
              >
                {t('Revoke')}
              </Button>
            </ItemActions>
          </Item>
        ))}
      </SettingsRows>
      <Alert role="status" tone="info">
        <AlertTitle>{t('You are the sole owner')}</AlertTitle>
        <AlertDescription>
          {t(
            'Transfer ownership to another verified doctor before leaving this cabinet. A cabinet cannot operate without an owner of record.',
          )}
        </AlertDescription>
      </Alert>
      {inviting ? (
        <div className={styles.inviteForm}>
          <Input
            error={inviteFieldError ? t(inviteFieldError) : inviteFieldError}
            label={t('Member name')}
            onChange={(event) => {
              setInviteName(event.target.value);
              if (inviteFieldError) setInviteFieldError(null);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                sendInvite();
              }
              if (event.key === 'Escape') {
                event.preventDefault();
                cancelInvite();
              }
            }}
            placeholder={t('Full name')}
            size="sm"
            value={inviteName}
          />
          <Select
            label={t('Role')}
            onValueChange={(value) => {
              if (value) setInviteRole(value);
            }}
            options={roleOptions}
            value={inviteRole}
          />
          <div className={styles.editControls}>
            <Button onClick={sendInvite} size="sm" variant="primary">
              {t('Send invite')}
            </Button>
            <Button onClick={cancelInvite} size="sm" variant="ghost">
              {t('Cancel')}
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Button onClick={() => setInviting(true)} size="sm" variant="secondary">
            {t('Invite member')}
          </Button>
        </div>
      )}
      <AlertDialog
        onOpenChange={(open) => {
          if (!open) setRoleConfirmName(null);
        }}
        open={roleConfirmName !== null}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('Confirm role change?')}</AlertDialogTitle>
            <AlertDialogDescription>
              {roleConfirmName} {t('becomes')} {t(roleDraft)}.{' '}
              {t(
                'Roles scope what this member can see and do; the change is logged.',
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('Back')}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRoleChange}>
              {t('Confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        onOpenChange={(open) => {
          if (!open) setInviteConfirm(null);
        }}
        open={inviteConfirm !== null}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {inviteConfirm?.kind === 'approve'
                ? t('Approve invite?')
                : t('Revoke invite?')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {inviteConfirm?.kind === 'approve'
                ? `${inviteConfirm.invite.name} ${t('joins this workspace as')} ${t(inviteConfirm.invite.role)}.`
                : `${inviteConfirm?.invite.name} ${t('loses access to this invite. You can invite them again later.')}`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('Back')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmInviteAction}
              variant={inviteConfirm?.kind === 'revoke' ? 'destructive' : 'primary'}
            >
              {inviteConfirm?.kind === 'approve' ? t('Approve') : t('Revoke')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SettingsSection>
  );
}

/* ------------------------------- preferences ------------------------------ */

/** Per-device display defaults; the only persisted section (localStorage). */
export function PreferencesSection() {
  const t = useT();
  // Language is session state, not a per-device display default: the shell
  // account menu changes the same value, so both controls read one source.
  const { locale, setLocale } = useLocale();
  // Lazy init reads this device's saved preferences; loadPrefs is SSR-safe.
  const [prefs, setPrefs] = useState<Prefs>(() => loadPrefs());

  const set = <Key extends keyof Prefs>(key: Key, value: Prefs[Key]) => {
    setPrefs((current) => {
      const next = { ...current, [key]: value };
      savePrefs(next);
      return next;
    });
    toast.success(t('Preferences saved on this device'));
  };

  return (
    <SettingsSection
      sub={t(
        'Display defaults saved on this device. They never change the medical record.',
      )}
      title={t('Preferences')}
    >
      <SettingsRows>
        <SettingsRow
          action={
            <SegmentedToggle
              label={t('Lab units')}
              onValueChange={(value) => set('units', value as Prefs['units'])}
              options={[
                { value: 'conventional', label: t('Conventional') },
                { value: 'si', label: 'SI' },
              ]}
              value={prefs.units}
            />
          }
          label={t('Lab units')}
          sub={t('Applies to lab history and printouts')}
          value={t(PREFS_VALUE_TEXT.units(prefs))}
        />
        <SettingsRow
          action={
            <SegmentedToggle
              label={t('Theme')}
              onValueChange={(value) => set('theme', value as Prefs['theme'])}
              options={[
                { value: 'light', label: t('Light') },
                { value: 'dark', label: t('Dark') },
                { value: 'system', label: t('System') },
              ]}
              value={prefs.theme}
            />
          }
          label={t('Theme')}
          value={t(PREFS_VALUE_TEXT.theme(prefs))}
        />
        <SettingsRow
          action={
            <SegmentedToggle
              label={t('Language')}
              onValueChange={(value) => setLocale(value as Locale)}
              options={LOCALES.map((option) => ({
                value: option,
                label: LOCALE_LABELS[option],
              }))}
              value={locale}
            />
          }
          label={t('Language')}
          sub={t('Clinical terms, drug names, and lab codes stay in English.')}
          value={LOCALE_LABELS[locale]}
        />
        <SettingsRow
          action={
            <Switch
              checked={prefs.inlineRef}
              onCheckedChange={(checked) => set('inlineRef', checked)}
            >
              <span className={styles.srOnly}>
                {t('Show reference ranges inline')}
              </span>
            </Switch>
          }
          label={t('Reference ranges')}
          value={t(PREFS_VALUE_TEXT.inlineRef(prefs))}
        />
        <SettingsRow
          action={
            <Switch
              checked={prefs.collapseNormal}
              onCheckedChange={(checked) => set('collapseNormal', checked)}
            >
              <span className={styles.srOnly}>
                {t('Collapse normal results by default')}
              </span>
            </Switch>
          }
          label={t('Normal results')}
          sub={t('Abnormal results always stay expanded.')}
          value={t(PREFS_VALUE_TEXT.collapseNormal(prefs))}
        />
        <SettingsRow
          action={
            <Switch
              checked={prefs.clock24}
              onCheckedChange={(checked) => set('clock24', checked)}
            >
              <span className={styles.srOnly}>{t('Use 24-hour time')}</span>
            </Switch>
          }
          label={t('Time')}
          value={t(PREFS_VALUE_TEXT.clock24(prefs))}
        />
      </SettingsRows>
      <p className={styles.sectionFootnote}>{t('Saved on this device.')}</p>
    </SettingsSection>
  );
}
