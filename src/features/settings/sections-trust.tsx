'use client';

import { useState } from 'react';

import { useT } from '../../components/foundations/i18n';
import {
  Alert,
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
  Badge,
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  Switch,
  toast,
} from '../../components/ui';
import {
  DownloadIcon,
  LaptopIcon,
  MobileDeviceIcon,
  SignatureIcon,
  UploadIcon,
} from '../../components/ui/icons';

import { VERIFICATION_META, downloadTextFile } from './logic';
import type { VerificationStatus } from './logic';
import type { SessionInfo } from './demo-data';
import {
  AUDIT_EVENTS,
  CURRENT_SESSION,
  OTHER_SESSIONS,
  SIGNATURES,
  buildSigningLogCsv,
} from './demo-data';
import {
  FilePickButton,
  SettingsBlock,
  SettingsRow,
  SettingsRows,
  SettingsSection,
} from './settings-rows';
import styles from './settings.module.css';

/* ----------------------------- signed documents -------------------------- */

export type ESignSectionProps = {
  firstUse?: boolean;
  verification?: VerificationStatus;
};

/** Signing certificate status, recent signatures, letterhead, and export. */
export function ESignSection({
  firstUse = false,
  verification = 'verified',
}: ESignSectionProps) {
  const t = useT();

  if (firstUse) {
    return (
      <SettingsSection
        chip={
          <Badge size="sm" variant="neutral">
            {t('Not configured')}
          </Badge>
        }
        sub={t(
          'Signing provider, certificate, document profile, and letterhead for this account.',
        )}
        title={t('Signed documents')}
      >
        <SettingsRows>
          <SettingsRow label={t('Signing provider')} value={t('Not configured')} />
          <SettingsRow label={t('Certificate')} value={t('Not configured')} />
          <SettingsRow label={t('PAdES profile')} value={t('Not configured')} />
          <SettingsRow
            label={t('Recent signatures')}
            value={t('No signed documents')}
          />
          <SettingsRow
            label={t('Rx / Dx letterhead')}
            value={t('Not configured')}
          />
          <SettingsRow
            label={t('Professional licence')}
            sub={t(
              'Credential identifier and document details are not available',
            )}
            value={t(VERIFICATION_META[verification].label)}
          />
        </SettingsRows>
      </SettingsSection>
    );
  }

  return (
    <SettingsSection
      chip={
        <Badge size="sm" variant="success">
          {t('Certificate active')}
        </Badge>
      }
      sub={t(
        'Every prescription and report is digitally signed. Certificates chain to the CamDX root.',
      )}
      title={t('Signed documents')}
    >
      <SettingsRows>
        <SettingsRow
          label={t('Signing provider')}
          value="Kura Sign · CamDX qualified"
        />
        <SettingsRow
          label={t('Certificate')}
          sub={t('Renews automatically 30 days before expiry')}
          value={
            <span className={styles.valueWithBadge}>
              {t('Active until Mar 2027')}
              <Badge size="sm" variant="success">
                {t('Valid')}
              </Badge>
            </span>
          }
        />
        <SettingsRow
          label={t('PAdES profile')}
          sub={t('Long term validation embedded in each PDF')}
          value="PAdES-B-LT"
        />
      </SettingsRows>
      <SettingsBlock title={t('Recent signatures')}>
        <SettingsRows>
          {SIGNATURES.map((signature) => (
            <Item className={styles.row} key={signature.doc} size="sm">
              <ItemMedia variant="icon">
                <SignatureIcon aria-hidden="true" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className={styles.rowLabel}>{signature.doc}</ItemTitle>
                <ItemDescription>{signature.when}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </SettingsRows>
      </SettingsBlock>
      <SettingsRows>
        <SettingsRow
          action={
            <FilePickButton accept=".pdf,.png,.jpg" leadingIcon={<UploadIcon aria-hidden="true" />}>
              {t('Replace')}
            </FilePickButton>
          }
          label={t('Rx / Dx letterhead')}
          sub={t('Applied to all signed documents')}
          value="Cabinet letterhead v2"
        />
        <SettingsRow
          label={t('License documents')}
          value={
            <span className={styles.valueWithBadge}>
              CMC-license.pdf
              <Badge size="sm" variant="success">
                {t('Verified')}
              </Badge>
            </span>
          }
        />
      </SettingsRows>
      <div>
        <Button
          leadingIcon={<DownloadIcon aria-hidden="true" />}
          onClick={() => {
            downloadTextFile('kura-signing-log.csv', buildSigningLogCsv(), 'text/csv');
            toast.success(t('Signing log exported'));
          }}
          size="sm"
          variant="secondary"
        >
          {t('Export signing log')}
        </Button>
      </div>
    </SettingsSection>
  );
}

/* -------------------------------- security ------------------------------- */

export type SecuritySectionProps = { firstUse?: boolean };

/** Sessions, step-up confirmation, PHI export policy, and the access log. */
export function SecuritySection({ firstUse = false }: SecuritySectionProps) {
  const t = useT();
  const [stepUp, setStepUp] = useState(true);
  const [sessions, setSessions] = useState<SessionInfo[]>(() =>
    firstUse ? [] : [...OTHER_SESSIONS],
  );
  const [sessionConfirm, setSessionConfirm] = useState<SessionInfo | null>(null);
  const [confirmAll, setConfirmAll] = useState(false);

  const revokeSession = () => {
    if (!sessionConfirm) return;
    setSessions((current) => current.filter((entry) => entry.id !== sessionConfirm.id));
    toast.success(`${t('Signed out')} ${sessionConfirm.label}`);
    setSessionConfirm(null);
  };

  const revokeAll = () => {
    setSessions([]);
    toast.success(t('Signed out all other sessions'));
    setConfirmAll(false);
  };

  return (
    <SettingsSection
      sub={t(
        'Manage signed-in devices, sensitive changes, and the PHI access log.',
      )}
      title={t('Security')}
    >
      <SettingsBlock title={t('Active sessions')}>
        <SettingsRows>
          {firstUse ? (
            <Item className={styles.row} size="sm">
              <ItemContent>
                <ItemTitle className={styles.rowLabel}>
                  {t('Current browser')}
                  <Badge size="sm" variant="success">
                    {t('Current')}
                  </Badge>
                </ItemTitle>
                <ItemDescription>{t('This sign-in session')}</ItemDescription>
              </ItemContent>
            </Item>
          ) : (
            <Item className={styles.row} size="sm">
              <ItemMedia variant="icon">
                <LaptopIcon aria-hidden="true" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className={styles.rowLabel}>
                  {CURRENT_SESSION.label}
                  <Badge size="sm" variant="success">
                    {t('Current')}
                  </Badge>
                </ItemTitle>
                <ItemDescription>{CURRENT_SESSION.sub}</ItemDescription>
              </ItemContent>
              <ItemActions className={styles.rowActions}>
                <span className={styles.rowSub}>{t(CURRENT_SESSION.detail)}</span>
              </ItemActions>
            </Item>
          )}
          {sessions.length === 0 ? (
            <SettingsRow
              label={t('No other sessions')}
              sub={t('Only this device is signed in')}
            />
          ) : (
            sessions.map((session) => (
              <Item className={styles.row} key={session.id} size="sm">
                <ItemMedia variant="icon">
                  <MobileDeviceIcon aria-hidden="true" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className={styles.rowLabel}>{session.label}</ItemTitle>
                  <ItemDescription>
                    {t(session.detail)} · {session.sub}
                  </ItemDescription>
                </ItemContent>
                <ItemActions className={styles.rowActions}>
                  <Button
                    onClick={() => setSessionConfirm(session)}
                    size="sm"
                    variant="ghost"
                  >
                    {t('Revoke')}
                  </Button>
                </ItemActions>
              </Item>
            ))
          )}
        </SettingsRows>
      </SettingsBlock>
      <SettingsRows>
        <SettingsRow
          action={
            <Switch
              checked={stepUp}
              onCheckedChange={setStepUp}
            >
              <span className={styles.srOnly}>
                {t('Require sign-in before sensitive changes')}
              </span>
            </Switch>
          }
          label={t('Require sign-in before sensitive changes')}
          sub={t('Covers PHI exports, bank details, and role changes.')}
        />
      </SettingsRows>
      <Alert role="status" tone="warning">
        <AlertTitle>{t('PHI exports are watermarked')}</AlertTitle>
        <AlertDescription>
          {t(
            'Each export includes user and timestamp. Patients can request the access log.',
          )}
        </AlertDescription>
      </Alert>
      {!firstUse ? (
        <SettingsBlock title={t('Recent activity')}>
          <SettingsRows>
            {AUDIT_EVENTS.map((event) => (
              <SettingsRow
                key={event.what}
                label={t(event.who)}
                sub={event.when}
                value={event.what}
              />
            ))}
          </SettingsRows>
        </SettingsBlock>
      ) : null}
      <div>
        <Button
          disabled={sessions.length === 0}
          onClick={() => setConfirmAll(true)}
          size="sm"
          variant="destructive"
        >
          {t('Sign out all other sessions')}
        </Button>
      </div>
      <AlertDialog
        onOpenChange={(open) => {
          if (!open) setSessionConfirm(null);
        }}
        open={sessionConfirm !== null}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('Sign out this session?')}</AlertDialogTitle>
            <AlertDialogDescription>
              {sessionConfirm?.label}{' '}
              {t('loses access immediately and must sign in again.')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('Back')}</AlertDialogCancel>
            <AlertDialogAction onClick={revokeSession} variant="destructive">
              {t('Sign out')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog onOpenChange={setConfirmAll} open={confirmAll}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t('Sign out every other session?')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t('Every device except this one loses access immediately.')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('Back')}</AlertDialogCancel>
            <AlertDialogAction onClick={revokeAll} variant="destructive">
              {t('Sign out all')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SettingsSection>
  );
}
