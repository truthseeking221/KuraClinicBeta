'use client';

import { createContext, useContext, useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';

import { useT } from '../../components/foundations/i18n';
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  IconButton,
  Input,
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemTitle,
  Textarea,
  toast,
} from '../../components/ui';
import { CloseIcon, LockKeyIcon } from '../../components/ui/icons';

import type { VerificationStatus } from './logic';
import {
  VERIFICATION_BANNERS,
  VERIFICATION_META,
  chipAddError,
  requiredError,
} from './logic';
import styles from './settings.module.css';

/* -------------------------------- section ------------------------------- */

export type SettingsSectionProps = {
  title: string;
  /** Status badge rendered next to the title. */
  chip?: ReactNode;
  /** One-line description of what the section owns. */
  sub?: ReactNode;
  children?: ReactNode;
};

/** One settings section: heading, status chip, description, then rows. */
export function SettingsSection({ title, chip, sub, children }: SettingsSectionProps) {
  const headingId = useId();
  const showTitle = useContext(SettingsSectionHeadingContext);
  return (
    <section aria-labelledby={showTitle ? headingId : undefined} className={styles.section}>
      <header className={styles.sectionHeader}>
        {showTitle || chip ? (
          <div className={styles.sectionTitleRow}>
            {showTitle ? (
              <h2 className={styles.sectionTitle} id={headingId}>
                {title}
              </h2>
            ) : null}
            {chip}
          </div>
        ) : null}
        {sub ? <p className={styles.sectionSub}>{sub}</p> : null}
      </header>
      {children}
    </section>
  );
}

export type SettingsRowsProps = { children?: ReactNode };

const SettingsCardContext = createContext(false);
const SettingsSectionHeadingContext = createContext(true);

type SettingsSectionHeadingProviderProps = {
  visible: boolean;
  children?: ReactNode;
};

/** Lets a containing shell supply the section title without repeating it. */
export function SettingsSectionHeadingProvider({
  children,
  visible,
}: SettingsSectionHeadingProviderProps) {
  return (
    <SettingsSectionHeadingContext.Provider value={visible}>
      {children}
    </SettingsSectionHeadingContext.Provider>
  );
}

/** ReUI settings-7 row group, promoted to the canonical Kura Card surface. */
export function SettingsRows({ children }: SettingsRowsProps) {
  const insideCard = useContext(SettingsCardContext);
  const rows = <ItemGroup className={styles.rows}>{children}</ItemGroup>;

  if (insideCard) return rows;

  return (
    <Card as="div" className={styles.rowsCard} size="sm">
      <CardContent className={styles.rowsCardContent}>{rows}</CardContent>
    </Card>
  );
}

export type SettingsBlockProps = { title: string; children?: ReactNode };

/** ReUI settings-7 card anatomy for a named Kura settings group. */
export function SettingsBlock({ title, children }: SettingsBlockProps) {
  return (
    <Card as="div" className={styles.block} size="sm">
      <CardHeader className={styles.blockHeader}>
        <CardTitle as="h3" className={styles.blockTitle}>{title}</CardTitle>
      </CardHeader>
      <CardContent className={styles.blockContent}>
        <SettingsCardContext.Provider value>
          {children}
        </SettingsCardContext.Provider>
      </CardContent>
    </Card>
  );
}

/* ---------------------------------- row --------------------------------- */

export type SettingsRowProps = {
  label: ReactNode;
  /** Verified-by-Kura fields carry a lock and are not editable. */
  locked?: boolean;
  value?: ReactNode;
  /** Supporting text under the value. */
  sub?: ReactNode;
  action?: ReactNode;
};

/**
 * One setting: label on the left, current value plus supporting text in the
 * middle, and at most one action on the right (ReUI settings-7 row anatomy).
 */
export function SettingsRow({ label, locked = false, value, sub, action }: SettingsRowProps) {
  const t = useT();
  return (
    <Item className={`${styles.row} ${styles.settingGrid}`} size="sm">
      <ItemContent className={styles.rowLabelCell}>
        <ItemTitle className={styles.rowLabel}>
          {label}
          {locked ? (
            <span
              className={styles.rowLock}
              title={t('Verified by Kura. Not editable')}
            >
              <LockKeyIcon aria-label={t('Verified by Kura. Not editable')} />
            </span>
          ) : null}
        </ItemTitle>
      </ItemContent>
      <div className={styles.rowValueCell}>
        {value ? <div className={styles.rowValue}>{value}</div> : null}
        {sub ? <div className={styles.rowSub}>{sub}</div> : null}
      </div>
      {action ? <ItemActions className={styles.rowActions}>{action}</ItemActions> : null}
    </Item>
  );
}

/* ------------------------------ inline edit ------------------------------ */

export type InlineEditRowProps = {
  label: string;
  initialValue: string;
  actionLabel?: string;
  sub?: ReactNode;
  multiline?: boolean;
  numeric?: boolean;
  /** Presentation of the committed value (e.g. "$500 per order"). */
  formatValue?: (value: string) => ReactNode;
};

/**
 * The inline editor behind every "Edit/Change" row: value flips to an input
 * with Save/Cancel, requires a non-empty draft, and confirms with a toast.
 */
export function InlineEditRow({
  label,
  initialValue,
  actionLabel = 'Edit',
  sub,
  multiline = false,
  numeric = false,
  formatValue,
}: InlineEditRowProps) {
  const t = useT();
  const [value, setValue] = useState(initialValue);
  const [draft, setDraft] = useState(initialValue);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startEditing = () => {
    setDraft(value);
    setError(null);
    setEditing(true);
  };

  const cancel = () => {
    setDraft(value);
    setError(null);
    setEditing(false);
  };

  const save = () => {
    const nextError = requiredError(label, draft);
    if (nextError) {
      setError(nextError);
      return;
    }
    setValue(draft.trim());
    setEditing(false);
    setError(null);
    toast.success(`${t(label)} ${t('updated')}`);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !multiline) {
      event.preventDefault();
      save();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      cancel();
    }
  };

  if (!editing) {
    return (
      <SettingsRow
        action={
          <Button onClick={startEditing} size="sm" variant="ghost">
            {t(actionLabel)}
          </Button>
        }
        label={t(label)}
        sub={sub}
        value={formatValue ? formatValue(value) : value}
      />
    );
  }

  return (
    <Item className={`${styles.row} ${styles.settingGrid}`} size="sm">
      <ItemContent className={styles.rowLabelCell}>
        <ItemTitle className={styles.rowLabel}>{t(label)}</ItemTitle>
      </ItemContent>
      <div className={styles.editCell}>
        {multiline ? (
          <Textarea
            aria-label={t(label)}
            autoFocus
            error={error ? t(error) : error}
            onChange={(event) => {
              setDraft(event.target.value);
              if (error) setError(null);
            }}
            onKeyDown={handleKeyDown}
            rows={3}
            value={draft}
          />
        ) : (
          <Input
            aria-label={t(label)}
            autoFocus
            error={error ? t(error) : error}
            inputMode={numeric ? 'numeric' : undefined}
            onChange={(event) => {
              setDraft(event.target.value);
              if (error) setError(null);
            }}
            onKeyDown={handleKeyDown}
            size="sm"
            value={draft}
          />
        )}
        <div className={styles.editControls}>
          <Button disabled={!draft.trim()} onClick={save} size="sm" variant="primary">
            {t('Save')}
          </Button>
          <Button onClick={cancel} size="sm" variant="ghost">
            {t('Cancel')}
          </Button>
        </div>
      </div>
    </Item>
  );
}

/* ------------------------------- chip list ------------------------------- */

export type ChipListRowProps = {
  label: string;
  addLabel: string;
  placeholder: string;
  initialItems: readonly string[];
};

/**
 * Removable chips with an inline add field and single-step undo. Empty lists
 * say "None listed" rather than disappearing.
 */
export function ChipListRow({ label, addLabel, placeholder, initialItems }: ChipListRowProps) {
  const t = useT();
  const [items, setItems] = useState<string[]>([...initialItems]);
  const [removed, setRemoved] = useState<{ item: string; index: number } | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | null>(null);

  const remove = (item: string) => {
    const index = items.indexOf(item);
    setItems((current) => current.filter((entry) => entry !== item));
    setRemoved({ item, index });
    toast(`${item} ${t('removed. Undo is available.')}`);
  };

  const undo = () => {
    if (!removed) return;
    setItems((current) => {
      const next = [...current];
      next.splice(Math.min(removed.index, next.length), 0, removed.item);
      return next;
    });
    toast.success(`${removed.item} ${t('restored')}`);
    setRemoved(null);
  };

  const add = () => {
    const nextError = chipAddError(label, draft, items);
    if (nextError) {
      setError(nextError);
      return;
    }
    const next = draft.trim();
    setItems((current) => [...current, next]);
    toast.success(`${next} ${t('added')}`);
    setDraft('');
    setError(null);
    setAdding(false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      add();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      setAdding(false);
      setDraft('');
      setError(null);
    }
  };

  return (
    <SettingsRow
      label={t(label)}
      value={
        <div className={styles.chipArea}>
          <div className={styles.chips}>
            {items.length === 0 ? (
              <span className={styles.rowSub}>{t('None listed')}</span>
            ) : (
              items.map((item) => (
                <span className={styles.chip} key={item}>
                  <Badge size="md" variant="neutral">
                    {item}
                  </Badge>
                  <IconButton
                    aria-label={`${t('Remove')} ${item}`}
                    onClick={() => remove(item)}
                    size="micro"
                    variant="tertiary"
                  >
                    <CloseIcon aria-hidden="true" />
                  </IconButton>
                </span>
              ))
            )}
          </div>
          {adding ? (
            <div className={styles.chipInputRow}>
              <Input
                aria-label={t(addLabel)}
                autoFocus
                error={error ? t(error) : error}
                onChange={(event) => {
                  setDraft(event.target.value);
                  if (error) setError(null);
                }}
                onKeyDown={handleKeyDown}
                placeholder={t(placeholder)}
                size="sm"
                value={draft}
              />
              <Button onClick={add} size="sm" variant="primary">
                {t('Add')}
              </Button>
              <Button
                onClick={() => {
                  setAdding(false);
                  setDraft('');
                  setError(null);
                }}
                size="sm"
                variant="ghost"
              >
                {t('Cancel')}
              </Button>
            </div>
          ) : null}
        </div>
      }
      action={
        <div className={styles.rowActionStack}>
          {removed ? (
            <Button onClick={undo} size="sm" variant="ghost">
              {t('Undo')}
            </Button>
          ) : null}
          {!adding ? (
            <Button onClick={() => setAdding(true)} size="sm" variant="ghost">
              {t(addLabel)}
            </Button>
          ) : null}
        </div>
      }
    />
  );
}

/* ------------------------------ file picking ----------------------------- */

export type FilePickButtonProps = {
  children: ReactNode;
  accept?: string;
  leadingIcon?: ReactNode;
  onSelected?: (file: File) => void;
  variant?: 'ghost' | 'secondary';
};

/**
 * Real file picker behind a canonical button. The prototype acknowledges the
 * pick locally — there is no upload endpoint.
 */
export function FilePickButton({
  children,
  accept,
  leadingIcon,
  onSelected,
  variant = 'ghost',
}: FilePickButtonProps) {
  const t = useT();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        accept={accept}
        className={styles.hiddenFileInput}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            onSelected?.(file);
            toast.success(`${file.name} ${t('selected')}`);
          }
          event.target.value = '';
        }}
        ref={inputRef}
        tabIndex={-1}
        type="file"
      />
      <Button
        leadingIcon={leadingIcon}
        onClick={() => inputRef.current?.click()}
        size="sm"
        variant={variant}
      >
        {children}
      </Button>
    </>
  );
}

/* ------------------------------ verification ----------------------------- */

export type VerificationBadgeProps = { status: VerificationStatus };

/** License verification state; mirrors the verification store everywhere. */
export function VerificationBadge({ status }: VerificationBadgeProps) {
  const t = useT();
  const meta = VERIFICATION_META[status];
  return (
    <Badge size="sm" variant={meta.badge}>
      {t(meta.label)}
    </Badge>
  );
}

export type VerificationBannerAlertProps = {
  status: VerificationStatus;
  onAction?: () => void;
};

/** Non-verified credential states get a persistent banner with one CTA. */
export function VerificationBannerAlert({ status, onAction }: VerificationBannerAlertProps) {
  const t = useT();
  if (status === 'verified') return null;
  const banner = VERIFICATION_BANNERS[status];
  return (
    <Alert role="status" tone={banner.tone}>
      <AlertTitle>{t(banner.title)}</AlertTitle>
      <AlertDescription>{t(banner.body)}</AlertDescription>
      <AlertAction>
        <Button onClick={onAction} size="sm" variant="secondary">
          {t(banner.cta)}
        </Button>
      </AlertAction>
    </Alert>
  );
}
