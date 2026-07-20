'use client';

import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
  toast,
} from '../../components/ui';
import {
  DownloadIcon,
  QrCodeIcon,
  UploadIcon,
} from '../../components/ui/icons';

import { downloadTextFile } from './logic';
import {
  CABINET,
  CHANNELS,
  DEFAULT_HOURS,
  DIRECTORY_BIO,
  DIRECTORY_LANGUAGES,
  DIRECTORY_SERVICES,
  DOCTOR_QR_SVG,
  ME,
} from './demo-data';
import {
  ChipListRow,
  FilePickButton,
  InlineEditRow,
  SettingsBlock,
  SettingsRow,
  SettingsRows,
  SettingsSection,
} from './settings-rows';
import { HoursRow } from './structured-editors';
import styles from './settings.module.css';
import { TEMPLATES, TEMPLATE_COPY } from './demo-data';

/* ---------------------------- patient messages --------------------------- */

/** Channel ranking, editable notification templates, and the intro QR. */
export function CommunicationsSection() {
  return (
    <SettingsSection
      sub={`Channel order follows the cabinet country (${CABINET.country}). Patients can opt out per channel.`}
      title="Patient messages"
    >
      <SettingsRows>
        {CHANNELS.map((channel, index) => (
          <Item className={styles.row} key={channel.name} size="sm">
            <ItemContent className={styles.rowLabelCell}>
              <ItemTitle className={styles.rowLabel}>
                <span aria-hidden="true" className={styles.channelRank}>
                  {index + 1}
                </span>
                {channel.name}
              </ItemTitle>
              <ItemDescription>{channel.note}</ItemDescription>
            </ItemContent>
            <ItemActions className={styles.rowActions}>
              {channel.state === 'active' ? (
                <Badge size="sm" variant="success">
                  Default
                </Badge>
              ) : (
                <Badge size="sm" variant="neutral">
                  Fallback
                </Badge>
              )}
            </ItemActions>
          </Item>
        ))}
      </SettingsRows>
      <SettingsBlock title="Notification templates">
        <SettingsRows>
          {TEMPLATES.map((template) => (
            <InlineEditRow
              actionLabel="Edit"
              initialValue={TEMPLATE_COPY[template]}
              key={template}
              label={template}
              multiline
              sub="Sent through the active channel"
            />
          ))}
        </SettingsRows>
      </SettingsBlock>
      <Item className={styles.qrRow} size="sm" variant="muted">
        <div aria-hidden="true" className={styles.qrMark}>
          <QrCodeIcon aria-hidden="true" />
        </div>
        <ItemContent>
          <ItemTitle>Doctor intro QR</ItemTitle>
          <ItemDescription>
            Patients scan to connect with your cabinet on Telegram and receive
            results there.
          </ItemDescription>
        </ItemContent>
        <ItemActions className={styles.rowActions}>
          <Button
            leadingIcon={<DownloadIcon aria-hidden="true" />}
            onClick={() => {
              downloadTextFile('kura-doctor-intro-qr.svg', DOCTOR_QR_SVG, 'image/svg+xml');
              toast.success('Doctor intro QR downloaded');
            }}
            size="sm"
            variant="secondary"
          >
            Download
          </Button>
        </ItemActions>
      </Item>
    </SettingsSection>
  );
}

/* --------------------------------- billing ------------------------------- */

/** Workspace payment collection only. Person-owned balances and ABA mandates belong to Earnings. */
export function BillingSection() {
  return (
    <SettingsSection
      chip={
        <Badge size="sm" variant="neutral">
          Workspace scope
        </Badge>
      }
      sub="Workspace payment methods and insurer panels. Your balance is managed in Earnings."
      title="Payments"
    >
      <SettingsRows>
        <SettingsRow
          label="Earnings"
          sub="Person-owned balance, statements, KHQR settlement, and optional ABA authorization"
          value={
            <Badge size="sm" variant="info">
              Managed in Earnings
            </Badge>
          }
        />
        <SettingsRow
          label="Patient KHQR collection"
          value={
            <span className={styles.valueWithBadge}>
              Active
              <Badge size="sm" variant="success">
                Bakong
              </Badge>
            </span>
          }
        />
        <SettingsRow
          label="Insurer panels"
          value={
            <span className={styles.valueWithBadge}>
              <Badge size="sm" variant="success">
                Forte · Active
              </Badge>
              <Badge size="sm" variant="warning">
                Sovannaphum · Pending review
              </Badge>
            </span>
          }
        />
      </SettingsRows>
    </SettingsSection>
  );
}

/* -------------------------------- directory ------------------------------ */

/** The patient-facing public listing; locked fields are verified by Kura. */
export function DirectorySection() {
  return (
    <SettingsSection
      chip={
        <Badge size="sm" variant="info">
          Public
        </Badge>
      }
      sub="What patients see in the Kura directory. Locked fields are verified by Kura."
      title="Directory profile"
    >
      <SettingsRows>
        <SettingsRow
          action={
            <FilePickButton accept="image/*" leadingIcon={<UploadIcon aria-hidden="true" />}>
              Change photo
            </FilePickButton>
          }
          label="Photo"
          sub="Shown on your public profile"
          value={
            <Avatar aria-label={ME.name} size="md">
              <AvatarFallback>{ME.initials}</AvatarFallback>
            </Avatar>
          }
        />
        <SettingsRow
          label="Public name & credentials"
          locked
          sub="From the approved professional credential profile"
          value={`${ME.name} · ${ME.license}`}
        />
        <HoursRow initialHours={DEFAULT_HOURS} />
        <ChipListRow
          addLabel="Add language"
          initialItems={DIRECTORY_LANGUAGES}
          label="Languages"
          placeholder="Language name"
        />
        <ChipListRow
          addLabel="Add service"
          initialItems={DIRECTORY_SERVICES}
          label="Services"
          placeholder="Service name"
        />
        <InlineEditRow
          actionLabel="Edit bio"
          initialValue={DIRECTORY_BIO}
          label="Bio"
          multiline
        />
        <SettingsRow
          label="Reviews"
          locked
          sub="Collected after completed visits"
          value="4.8 ★ · 32 reviews"
        />
      </SettingsRows>
    </SettingsSection>
  );
}
