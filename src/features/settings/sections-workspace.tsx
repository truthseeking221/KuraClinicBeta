'use client';

import { useState } from 'react';

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
  inviteError,
  loadPrefs,
  savePrefs,
} from './logic';
import {
  CABINET,
  DEFAULT_COURIER_PICKUP,
  LICENSE_RENEWAL_TEXT,
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
};

/** At-a-glance workspace status with jump links into each detail section. */
export function OverviewSection({ verification, onNavigate, onVerify }: OverviewSectionProps) {
  return (
    <SettingsSection sub="Priority settings for this workspace." title="Overview">
      {verification === 'verified' || verification === 'expiring' ? (
        <Alert role="status" tone="warning">
          <AlertTitle>Medical license expires in {LICENSE_RENEWAL_TEXT}</AlertTitle>
          <AlertDescription>
            {ME.license} expires {ME.licenseExpiry}. Renew it before lapse to keep
            this credential available for new order attribution.
          </AlertDescription>
          <AlertAction>
            <Button onClick={() => onNavigate('account')} size="sm" variant="secondary">
              Upload renewed license
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
              Edit account
            </Button>
          }
          label="Signed in as"
          sub={ME.email}
          value={
            <span className={styles.valueWithMedia}>
              <Avatar aria-hidden="true" size="xs">
                <AvatarFallback>{ME.initials}</AvatarFallback>
              </Avatar>
              {ME.name}
            </span>
          }
        />
        <SettingsRow
          action={
            <Button onClick={onVerify} size="sm" variant="ghost">
              Verify license
            </Button>
          }
          label="Verification"
          sub="Medical license and identity review"
          value={<VerificationBadge status={verification} />}
        />
        <SettingsRow
          action={
            <Button onClick={() => onNavigate('cabinet')} size="sm" variant="ghost">
              Edit clinic
            </Button>
          }
          label="Cabinet"
          sub="Phnom Penh · GMT+7"
          value={CABINET.name}
        />
        <SettingsRow
          action={
            <Button onClick={() => onNavigate('members')} size="sm" variant="ghost">
              Review team
            </Button>
          }
          label="Team"
          sub="1 invite pending approval"
          value="5 active members"
        />
        <SettingsRow
          action={
            <Button onClick={() => onNavigate('billing')} size="sm" variant="ghost">
              View payments
            </Button>
          }
          label="Payments"
          sub="KHQR active · next netting Jul 1"
          value={
            <span className={styles.valueWithBadge}>
              Bank verified
              <Badge size="sm" variant="success">
                ABA ···· 4102
              </Badge>
            </span>
          }
        />
        <SettingsRow
          action={
            <Button onClick={() => onNavigate('esign')} size="sm" variant="ghost">
              View documents
            </Button>
          }
          label="Signed documents"
          sub="PAdES-B-LT · CamDX root"
          value="Certificate active until Mar 2027"
        />
      </SettingsRows>
    </SettingsSection>
  );
}

/* --------------------------------- account ------------------------------- */

export type AccountSectionProps = {
  verification: VerificationStatus;
  onVerify?: () => void;
};

/** Identity, medical license, and license verification status. */
export function AccountSection({ verification, onVerify }: AccountSectionProps) {
  const [renewalFile, setRenewalFile] = useState<string | null>(null);

  return (
    <SettingsSection
      chip={<VerificationBadge status={verification} />}
      sub="Identity details and professional credential review status."
      title="Account & verification"
    >
      <SettingsRows>
        <SettingsRow label="Email" sub="Used for sign-in and statements" value={ME.email} />
        <SettingsRow label="Clinician name" locked sub={ME.khmerName} value={ME.name} />
        <SettingsRow
          action={
            <FilePickButton
              accept=".pdf,.jpg,.jpeg,.png"
              leadingIcon={<UploadIcon aria-hidden="true" />}
              onSelected={(file) => setRenewalFile(file.name)}
              variant="secondary"
            >
              Upload license
            </FilePickButton>
          }
          label="Medical license"
          locked
          sub={renewalFile ? `${renewalFile} selected` : `Expires ${ME.licenseExpiry}`}
          value={
            <span className={styles.valueWithBadge}>
              {ME.license}
              {renewalFile ? (
                <Badge size="sm" variant="info">
                  File selected
                </Badge>
              ) : (
                <Badge size="sm" variant="warning">
                  Renews in {LICENSE_RENEWAL_TEXT}
                </Badge>
              )}
            </span>
          }
        />
        <SettingsRow
          action={
            <Button onClick={onVerify} size="sm" variant="ghost">
              Verify license
            </Button>
          }
          label="License verification"
          sub="A live credential is required only when this member is attributed to a new clinic order"
          value={<VerificationBadge status={verification} />}
        />
        <SettingsRow
          label="Review authority"
          sub="Reviewer verdicts are recorded separately from the credential lifecycle"
          value="Kura professional review"
        />
        <SettingsRow
          label="Signature & certificate"
          sub="Managed under Signed documents"
          value={
            <span className={styles.valueWithMedia}>
              <IdentityVerifiedIcon aria-hidden="true" className={styles.valueIcon} />
              Ready to sign
            </span>
          }
        />
      </SettingsRows>
      <VerificationBannerAlert onAction={onVerify} status={verification} />
    </SettingsSection>
  );
}

/* --------------------------------- cabinet ------------------------------- */

/** The clinic entity this workspace operates under. */
export function CabinetSection() {
  return (
    <SettingsSection
      sub="The clinic this workspace operates under. Lab routing, billing, and compliance follow these fields."
      title="Cabinet"
    >
      <SettingsRows>
        <SettingsRow label="Cabinet name" value={CABINET.name} />
        <SettingsRow label="Address" value={CABINET.address} />
        <SettingsRow label="Specialty" value={CABINET.specialty} />
        <SettingsRow label="Clinic type" value={CABINET.clinicType} />
        <SettingsRow
          label="Country"
          locked
          sub="Determines insurer panel, currency, and patient channels"
          value={CABINET.country}
        />
        <SettingsRow label="Timezone" value={CABINET.timezone} />
        <SettingsRow label="Currency" value={CABINET.currency} />
        <CourierPickupRow initialPickup={DEFAULT_COURIER_PICKUP} />
      </SettingsRows>
      <Alert role="status" tone="info">
        <AlertTitle>Country is locked after registration</AlertTitle>
        <AlertDescription>
          Billing rails, insurer contracts, and lab logistics are provisioned per
          country. Contact Kura support to migrate a cabinet across borders.
        </AlertDescription>
      </Alert>
    </SettingsSection>
  );
}

/* --------------------------------- members ------------------------------- */

const ROLE_OPTIONS = MEMBER_ROLES.map((role) => ({ value: role, label: role }));

type InviteConfirm = { kind: 'approve' | 'revoke'; invite: PendingInvite };

/** Member roster, guarded role changes, invite approval, and new invites. */
export function MembersSection() {
  const [members, setMembers] = useState<Member[]>([...MEMBERS]);
  const [pending, setPending] = useState<PendingInvite[]>([...PENDING_INVITES]);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [roleDraft, setRoleDraft] = useState<string>(MEMBER_ROLES[0]);
  const [roleConfirmName, setRoleConfirmName] = useState<string | null>(null);
  const [inviteConfirm, setInviteConfirm] = useState<InviteConfirm | null>(null);
  const [inviting, setInviting] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState<string>(MEMBER_ROLES[0]);
  const [inviteFieldError, setInviteFieldError] = useState<string | null>(null);

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
    toast.success(`${roleConfirmName}'s role updated`);
    setRoleConfirmName(null);
    setEditingName(null);
  };

  const confirmInviteAction = () => {
    if (!inviteConfirm) return;
    const { kind, invite } = inviteConfirm;
    if (kind === 'approve') {
      setPending((current) => current.filter((entry) => entry.name !== invite.name));
      setMembers((current) => [...current, { name: invite.name, role: invite.role }]);
      toast.success(`${invite.name} approved as ${invite.role}`);
    } else {
      setPending((current) => current.filter((entry) => entry.name !== invite.name));
      toast(`Invite to ${invite.name} revoked`);
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
    toast.success(`Invite sent to ${name}`);
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
          {members.length} active
        </Badge>
      }
      sub="Roles scope what each member can see and do. All PHI access is logged."
      title="Team access"
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
                    you
                  </Badge>
                ) : null}
              </ItemTitle>
              <ItemDescription>{member.role}</ItemDescription>
            </ItemContent>
            <ItemActions className={styles.rowActions}>
              {editingName === member.name ? (
                <div className={styles.roleEdit}>
                  <Select
                    aria-label={`Role for ${member.name}`}
                    onValueChange={(value) => {
                      if (value) setRoleDraft(value);
                    }}
                    options={ROLE_OPTIONS}
                    value={roleDraft}
                  />
                  <Button onClick={() => requestRoleSave(member)} size="sm" variant="primary">
                    Save
                  </Button>
                  <Button onClick={() => setEditingName(null)} size="sm" variant="ghost">
                    Cancel
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
                  Edit role
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
                  Pending
                </Badge>
              </ItemTitle>
              <ItemDescription>
                {invite.role} · {invite.sent}
              </ItemDescription>
            </ItemContent>
            <ItemActions className={styles.rowActions}>
              <Button
                onClick={() => setInviteConfirm({ kind: 'approve', invite })}
                size="sm"
                variant="secondary"
              >
                Approve
              </Button>
              <Button
                onClick={() => setInviteConfirm({ kind: 'revoke', invite })}
                size="sm"
                variant="ghost"
              >
                Revoke
              </Button>
            </ItemActions>
          </Item>
        ))}
      </SettingsRows>
      <Alert role="status" tone="info">
        <AlertTitle>You are the sole owner</AlertTitle>
        <AlertDescription>
          Transfer ownership to another verified doctor before leaving this cabinet.
          A cabinet cannot operate without an owner of record.
        </AlertDescription>
      </Alert>
      {inviting ? (
        <div className={styles.inviteForm}>
          <Input
            error={inviteFieldError}
            label="Member name"
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
            placeholder="Full name"
            size="sm"
            value={inviteName}
          />
          <Select
            label="Role"
            onValueChange={(value) => {
              if (value) setInviteRole(value);
            }}
            options={ROLE_OPTIONS}
            value={inviteRole}
          />
          <div className={styles.editControls}>
            <Button onClick={sendInvite} size="sm" variant="primary">
              Send invite
            </Button>
            <Button onClick={cancelInvite} size="sm" variant="ghost">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Button onClick={() => setInviting(true)} size="sm" variant="secondary">
            Invite member
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
            <AlertDialogTitle>Confirm role change?</AlertDialogTitle>
            <AlertDialogDescription>
              {roleConfirmName} becomes {roleDraft}. Roles scope what this member can
              see and do; the change is logged.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Back</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRoleChange}>Confirm</AlertDialogAction>
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
              {inviteConfirm?.kind === 'approve' ? 'Approve invite?' : 'Revoke invite?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {inviteConfirm?.kind === 'approve'
                ? `${inviteConfirm.invite.name} joins this workspace as ${inviteConfirm.invite.role}.`
                : `${inviteConfirm?.invite.name} loses access to this invite. You can invite them again later.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Back</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmInviteAction}
              variant={inviteConfirm?.kind === 'revoke' ? 'destructive' : 'primary'}
            >
              {inviteConfirm?.kind === 'approve' ? 'Approve' : 'Revoke'}
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
  // Lazy init reads this device's saved preferences; loadPrefs is SSR-safe.
  const [prefs, setPrefs] = useState<Prefs>(() => loadPrefs());

  const set = <Key extends keyof Prefs>(key: Key, value: Prefs[Key]) => {
    setPrefs((current) => {
      const next = { ...current, [key]: value };
      savePrefs(next);
      return next;
    });
    toast.success('Preferences saved on this device');
  };

  return (
    <SettingsSection
      sub="Display defaults saved on this device. They never change the medical record."
      title="Preferences"
    >
      <SettingsRows>
        <SettingsRow
          action={
            <SegmentedToggle
              label="Lab units"
              onValueChange={(value) => set('units', value as Prefs['units'])}
              options={[
                { value: 'conventional', label: 'Conventional' },
                { value: 'si', label: 'SI' },
              ]}
              value={prefs.units}
            />
          }
          label="Lab units"
          sub="Applies to lab history and printouts"
          value={PREFS_VALUE_TEXT.units(prefs)}
        />
        <SettingsRow
          action={
            <SegmentedToggle
              label="Theme"
              onValueChange={(value) => set('theme', value as Prefs['theme'])}
              options={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'system', label: 'System' },
              ]}
              value={prefs.theme}
            />
          }
          label="Theme"
          value={PREFS_VALUE_TEXT.theme(prefs)}
        />
        <SettingsRow
          action={
            <SegmentedToggle
              label="Language"
              onValueChange={(value) => set('language', value as Prefs['language'])}
              options={[
                { value: 'en', label: 'English' },
                { value: 'km', label: 'Khmer' },
              ]}
              value={prefs.language}
            />
          }
          label="Language"
          sub="Clinical terms, drug names, and lab codes stay in English."
          value={PREFS_VALUE_TEXT.language(prefs)}
        />
        <SettingsRow
          action={
            <Switch
              checked={prefs.inlineRef}
              onCheckedChange={(checked) => set('inlineRef', checked)}
            >
              <span className={styles.srOnly}>Show reference ranges inline</span>
            </Switch>
          }
          label="Reference ranges"
          value={PREFS_VALUE_TEXT.inlineRef(prefs)}
        />
        <SettingsRow
          action={
            <Switch
              checked={prefs.collapseNormal}
              onCheckedChange={(checked) => set('collapseNormal', checked)}
            >
              <span className={styles.srOnly}>Collapse normal results by default</span>
            </Switch>
          }
          label="Normal results"
          sub="Abnormal results always stay expanded."
          value={PREFS_VALUE_TEXT.collapseNormal(prefs)}
        />
        <SettingsRow
          action={
            <Switch
              checked={prefs.clock24}
              onCheckedChange={(checked) => set('clock24', checked)}
            >
              <span className={styles.srOnly}>Use 24-hour time</span>
            </Switch>
          }
          label="Time"
          value={PREFS_VALUE_TEXT.clock24(prefs)}
        />
      </SettingsRows>
      <p className={styles.sectionFootnote}>Saved on this device.</p>
    </SettingsSection>
  );
}
