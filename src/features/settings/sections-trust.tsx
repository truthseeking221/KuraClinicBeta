'use client';

import { useState } from 'react';

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

import { downloadTextFile } from './logic';
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

/** Signing certificate status, recent signatures, letterhead, and export. */
export function ESignSection() {
  return (
    <SettingsSection
      chip={
        <Badge size="sm" variant="success">
          Certificate active
        </Badge>
      }
      sub="Every prescription and report is digitally signed. Certificates chain to the CamDX root."
      title="Signed documents"
    >
      <SettingsRows>
        <SettingsRow label="Signing provider" value="Kura Sign · CamDX qualified" />
        <SettingsRow
          label="Certificate"
          sub="Renews automatically 30 days before expiry"
          value={
            <span className={styles.valueWithBadge}>
              Active until Mar 2027
              <Badge size="sm" variant="success">
                Valid
              </Badge>
            </span>
          }
        />
        <SettingsRow
          label="PAdES profile"
          sub="Long term validation embedded in each PDF"
          value="PAdES-B-LT"
        />
      </SettingsRows>
      <SettingsBlock title="Recent signatures">
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
              Replace
            </FilePickButton>
          }
          label="Rx / Dx letterhead"
          sub="Applied to all signed documents"
          value="Cabinet letterhead v2"
        />
        <SettingsRow
          label="License documents"
          value={
            <span className={styles.valueWithBadge}>
              CMC-license.pdf
              <Badge size="sm" variant="success">
                Verified
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
            toast.success('Signing log exported');
          }}
          size="sm"
          variant="secondary"
        >
          Export signing log
        </Button>
      </div>
    </SettingsSection>
  );
}

/* -------------------------------- security ------------------------------- */

/** Sessions, step-up confirmation, PHI export policy, and the access log. */
export function SecuritySection() {
  const [stepUp, setStepUp] = useState(true);
  const [sessions, setSessions] = useState<SessionInfo[]>([...OTHER_SESSIONS]);
  const [sessionConfirm, setSessionConfirm] = useState<SessionInfo | null>(null);
  const [confirmAll, setConfirmAll] = useState(false);

  const revokeSession = () => {
    if (!sessionConfirm) return;
    setSessions((current) => current.filter((entry) => entry.id !== sessionConfirm.id));
    toast.success(`Signed out ${sessionConfirm.label}`);
    setSessionConfirm(null);
  };

  const revokeAll = () => {
    setSessions([]);
    toast.success('Signed out all other sessions');
    setConfirmAll(false);
  };

  return (
    <SettingsSection
      sub="Manage signed-in devices, sensitive changes, and the PHI access log."
      title="Security"
    >
      <SettingsBlock title="Active sessions">
        <SettingsRows>
          <Item className={styles.row} size="sm">
            <ItemMedia variant="icon">
              <LaptopIcon aria-hidden="true" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle className={styles.rowLabel}>
                {CURRENT_SESSION.label}
                <Badge size="sm" variant="success">
                  Current
                </Badge>
              </ItemTitle>
              <ItemDescription>{CURRENT_SESSION.sub}</ItemDescription>
            </ItemContent>
            <ItemActions className={styles.rowActions}>
              <span className={styles.rowSub}>{CURRENT_SESSION.detail}</span>
            </ItemActions>
          </Item>
          {sessions.length === 0 ? (
            <SettingsRow
              label="No other sessions"
              sub="Only this device is signed in"
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
                    {session.detail} · {session.sub}
                  </ItemDescription>
                </ItemContent>
                <ItemActions className={styles.rowActions}>
                  <Button
                    onClick={() => setSessionConfirm(session)}
                    size="sm"
                    variant="ghost"
                  >
                    Revoke
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
                Require sign-in before sensitive changes
              </span>
            </Switch>
          }
          label="Require sign-in before sensitive changes"
          sub="Covers PHI exports, bank details, and role changes."
        />
      </SettingsRows>
      <Alert role="status" tone="warning">
        <AlertTitle>PHI exports are watermarked</AlertTitle>
        <AlertDescription>
          Each export includes user and timestamp. Patients can request the access log.
        </AlertDescription>
      </Alert>
      <SettingsBlock title="Recent activity">
        <SettingsRows>
          {AUDIT_EVENTS.map((event) => (
            <SettingsRow
              key={event.what}
              label={event.who}
              sub={event.when}
              value={event.what}
            />
          ))}
        </SettingsRows>
      </SettingsBlock>
      <div>
        <Button
          disabled={sessions.length === 0}
          onClick={() => setConfirmAll(true)}
          size="sm"
          variant="destructive"
        >
          Sign out all other sessions
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
            <AlertDialogTitle>Sign out this session?</AlertDialogTitle>
            <AlertDialogDescription>
              {sessionConfirm?.label} loses access immediately and must sign in again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Back</AlertDialogCancel>
            <AlertDialogAction onClick={revokeSession} variant="destructive">
              Sign out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog onOpenChange={setConfirmAll} open={confirmAll}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out every other session?</AlertDialogTitle>
            <AlertDialogDescription>
              Every device except this one loses access immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Back</AlertDialogCancel>
            <AlertDialogAction onClick={revokeAll} variant="destructive">
              Sign out all
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SettingsSection>
  );
}
