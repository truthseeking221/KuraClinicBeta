'use client';

import { useT } from '../../components/foundations/i18n';
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

import { VERIFICATION_META, downloadTextFile } from './logic';
import type { VerificationStatus } from './logic';
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

export type CommunicationsSectionProps = { firstUse?: boolean };

/** Channel ranking, editable notification templates, and the intro QR. */
export function CommunicationsSection({
  firstUse = false,
}: CommunicationsSectionProps) {
  const t = useT();

  if (firstUse) {
    return (
      <SettingsSection
        sub={t(
          'Patient message channels and reusable notification copy for this cabinet.',
        )}
        title={t('Patient messages')}
      >
        <SettingsRows>
          <SettingsRow label={t('Channel order')} value={t('Not configured')} />
          <SettingsRow
            label={t('Notification templates')}
            value={t('Not configured')}
          />
          <SettingsRow label={t('Doctor intro QR')} value={t('Not available')} />
        </SettingsRows>
      </SettingsSection>
    );
  }

  return (
    <SettingsSection
      sub={`${t('Channel order follows the cabinet country')} (${CABINET.country}). ${t('Patients can opt out per channel.')}`}
      title={t('Patient messages')}
    >
      <SettingsRows>
        {CHANNELS.map((channel, index) => (
          <Item className={styles.row} key={channel.name} size="sm">
            <ItemContent className={styles.rowLabelCell}>
              <ItemTitle className={styles.rowLabel}>
                <span aria-hidden="true" className={styles.channelRank}>
                  {index + 1}
                </span>
                {t(channel.name)}
              </ItemTitle>
              <ItemDescription>{t(channel.note)}</ItemDescription>
            </ItemContent>
            <ItemActions className={styles.rowActions}>
              {channel.state === 'active' ? (
                <Badge size="sm" variant="success">
                  {t('Default')}
                </Badge>
              ) : (
                <Badge size="sm" variant="neutral">
                  {t('Fallback')}
                </Badge>
              )}
            </ItemActions>
          </Item>
        ))}
      </SettingsRows>
      <SettingsBlock title={t('Notification templates')}>
        <SettingsRows>
          {TEMPLATES.map((template) => (
            <InlineEditRow
              actionLabel="Edit"
              initialValue={TEMPLATE_COPY[template]}
              key={template}
              label={template}
              multiline
              sub={t('Sent through the active channel')}
            />
          ))}
        </SettingsRows>
      </SettingsBlock>
      <Item className={styles.qrRow} size="sm" variant="muted">
        <div aria-hidden="true" className={styles.qrMark}>
          <QrCodeIcon aria-hidden="true" />
        </div>
        <ItemContent>
          <ItemTitle>{t('Doctor intro QR')}</ItemTitle>
          <ItemDescription>
            {t(
              'Patients scan to connect with your cabinet on Telegram and receive results there.',
            )}
          </ItemDescription>
        </ItemContent>
        <ItemActions className={styles.rowActions}>
          <Button
            leadingIcon={<DownloadIcon aria-hidden="true" />}
            onClick={() => {
              downloadTextFile('kura-doctor-intro-qr.svg', DOCTOR_QR_SVG, 'image/svg+xml');
              toast.success(t('Doctor intro QR downloaded'));
            }}
            size="sm"
            variant="secondary"
          >
            {t('Download')}
          </Button>
        </ItemActions>
      </Item>
    </SettingsSection>
  );
}

/* --------------------------------- billing ------------------------------- */

export type BillingSectionProps = { firstUse?: boolean };

/** Workspace payment collection only. Person-owned balances and ABA mandates belong to Balance. */
export function BillingSection({ firstUse = false }: BillingSectionProps) {
  const t = useT();

  return (
    <SettingsSection
      chip={
        <Badge size="sm" variant="neutral">
          {t('Workspace scope')}
        </Badge>
      }
      sub={t(
        'Workspace payment methods and insurer panels. Your own balance is managed in Balance.',
      )}
      title={t('Payments')}
    >
      <SettingsRows>
        <SettingsRow
          label={t('Balance')}
          sub={t(
            'Person-owned balance, statements, KHQR settlement, and optional ABA authorization',
          )}
          value={
            <Badge size="sm" variant="info">
              {t('Managed in Balance')}
            </Badge>
          }
        />
        <SettingsRow
          label={t('Patient KHQR collection')}
          value={firstUse ? t('Not configured') : (
            <span className={styles.valueWithBadge}>
              {t('Active')}
              <Badge size="sm" variant="success">
                Bakong
              </Badge>
            </span>
          )}
        />
        <SettingsRow
          label={t('Insurer panels')}
          value={firstUse ? t('None configured') : (
            <span className={styles.valueWithBadge}>
              <Badge size="sm" variant="success">
                Forte · {t('Active')}
              </Badge>
              <Badge size="sm" variant="warning">
                Sovannaphum · {t('Pending review')}
              </Badge>
            </span>
          )}
        />
      </SettingsRows>
    </SettingsSection>
  );
}

/* -------------------------------- directory ------------------------------ */

export type DirectorySectionProps = {
  firstUse?: boolean;
  identity?: { name: string };
  verification?: VerificationStatus;
};

/** The patient-facing public listing; locked fields are verified by Kura. */
export function DirectorySection({
  firstUse = false,
  identity,
  verification = 'verified',
}: DirectorySectionProps) {
  const t = useT();
  const personName = identity?.name ?? ME.name;
  const initials = personName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

  if (firstUse) {
    return (
      <SettingsSection
        chip={
          <Badge size="sm" variant="neutral">
            {t('Unpublished')}
          </Badge>
        }
        sub={t(
          'What patients will see after this profile is completed and published.',
        )}
        title={t('Directory profile')}
      >
        <SettingsRows>
          <SettingsRow
            action={
              <FilePickButton accept="image/*" leadingIcon={<UploadIcon aria-hidden="true" />}>
                {t('Add photo')}
              </FilePickButton>
            }
            label={t('Photo')}
            value={
              <Avatar aria-label={personName} size="md">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            }
          />
          <SettingsRow
            label={t('Public name & credentials')}
            sub={t('Credential identifier is not available')}
            value={`${personName} · ${t(VERIFICATION_META[verification].label)}`}
          />
          <SettingsRow label={t('Opening hours')} value={t('Not configured')} />
          <SettingsRow label={t('Languages')} value={t('None configured')} />
          <SettingsRow label={t('Services')} value={t('None configured')} />
          <SettingsRow label={t('Bio')} value={t('Not configured')} />
          <SettingsRow
            label={t('Reviews')}
            sub={t('Collected after completed visits')}
            value={t('No reviews')}
          />
        </SettingsRows>
      </SettingsSection>
    );
  }

  return (
    <SettingsSection
      chip={
        <Badge size="sm" variant="info">
          {t('Public')}
        </Badge>
      }
      sub={t(
        'What patients see in the Kura directory. Locked fields are verified by Kura.',
      )}
      title={t('Directory profile')}
    >
      <SettingsRows>
        <SettingsRow
          action={
            <FilePickButton accept="image/*" leadingIcon={<UploadIcon aria-hidden="true" />}>
              {t('Change photo')}
            </FilePickButton>
          }
          label={t('Photo')}
          sub={t('Shown on your public profile')}
          value={
            <Avatar aria-label={ME.name} size="md">
              <AvatarFallback>{ME.initials}</AvatarFallback>
            </Avatar>
          }
        />
        <SettingsRow
          label={t('Public name & credentials')}
          locked
          sub={t('From the approved professional credential profile')}
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
          label={t('Reviews')}
          locked
          sub={t('Collected after completed visits')}
          value={t('4.8 ★ · 32 reviews')}
        />
      </SettingsRows>
    </SettingsSection>
  );
}
