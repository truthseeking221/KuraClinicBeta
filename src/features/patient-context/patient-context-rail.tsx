'use client';

import type { ComponentPropsWithoutRef } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';
import {
  AlertIcon,
  CalendarIcon,
  FileIcon,
  HistoryIcon,
  MedicineIcon,
  StethoscopeIcon,
  UserIdentityIcon,
} from '../../components/ui/icons';
import { Skeleton } from '../../components/ui/skeleton';
import { useT } from '../../components/foundations/i18n';
import styles from './patient-context-rail.module.css';

export type PatientContextSectionId =
  | 'problems'
  | 'medications'
  | 'verification'
  | 'history'
  | 'administration';

export type PatientContextRailState =
  | 'ready'
  | 'loading'
  | 'error'
  | 'offline'
  | 'permission-denied';

export type PatientContextLine = {
  label: string;
  detail?: string;
  /** Safety marker treatment. Neutral is used for an explicitly clear safety state. */
  tone?: 'danger' | 'warning' | 'neutral';
};

export type PatientContextSection = {
  id: PatientContextSectionId;
  label: string;
  items: readonly PatientContextLine[];
  emptyMessage?: string;
  /** Administrative metadata is not presented as a quantitative clinical group. */
  showCount?: boolean;
  /**
   * Provenance or verification caveat for the whole group. It belongs here,
   * not on every line: the same sentence repeated under each fact reads as
   * noise and buries the facts it qualifies.
   */
  note?: string;
};

export type PatientContextPatient = {
  initials: string;
  name: string;
  demographics: string;
  status?: string;
};

export type PatientContextRailProps = Omit<ComponentPropsWithoutRef<'aside'>, 'children'> & {
  /** The rail is fixture-only until a patient-chart context contract exists. */
  patient: PatientContextPatient;
  /**
   * Hide the identity block when a surrounding chart header already carries
   * it, so identity is never stated twice with room to disagree.
   */
  showIdentity?: boolean;
  safety?: readonly PatientContextLine[];
  /** Group-level provenance for the safety lines. See `PatientContextSection.note`. */
  safetyNote?: string;
  todaySummary?: string;
  reasonForVisit?: readonly string[];
  sections?: readonly PatientContextSection[];
  /** Open section IDs are local disclosure state, not a clinical record mutation. */
  defaultExpanded?: readonly PatientContextSectionId[];
  /** Controlled disclosure state for flows that reveal newly confirmed context. */
  expandedSections?: readonly PatientContextSectionId[];
  onExpandedSectionsChange?: (sections: PatientContextSectionId[]) => void;
  state?: PatientContextRailState;
  readOnly?: boolean;
  onRetry?: () => void;
};

const sectionIcons = {
  problems: StethoscopeIcon,
  medications: MedicineIcon,
  verification: UserIdentityIcon,
  history: HistoryIcon,
  administration: FileIcon,
} as const;

/**
 * Default "nothing recorded" line per group. It is a constant rather than a
 * sentence assembled from the label, so the whole line stays one translatable
 * unit instead of a fragment glued to a lowercased noun.
 */
const sectionEmptyMessages: Readonly<Record<PatientContextSectionId, string>> = {
  problems: 'No active problems recorded.',
  medications: 'No current medications recorded.',
  verification: 'No pending verification recorded.',
  history: 'No past history recorded.',
  administration: 'No admin details recorded.',
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function RailLoading({ patient }: Pick<PatientContextRailProps, 'patient'>) {
  const t = useT();
  return (
    <>
      <PatientIdentity patient={patient} />
      <RailDivider />
      <div className={styles.loading} role="status" aria-label={t('Loading patient context')}>
        <Skeleton className={styles.loadingTitle} shape="text" />
        <Skeleton className={styles.loadingLine} shape="text" />
        <Skeleton className={styles.loadingLine} shape="text" />
        <Skeleton className={styles.loadingTitle} shape="text" />
        <Skeleton className={styles.loadingLine} shape="text" />
      </div>
    </>
  );
}

function PatientIdentity({ patient }: Pick<PatientContextRailProps, 'patient'>) {
  const t = useT();
  return (
    <header className={styles.identity}>
      <Avatar className={styles.identityAvatar} size="sm" fallbackTone="brand">
        <AvatarFallback>{patient.initials}</AvatarFallback>
      </Avatar>
      <div className={styles.identityCopy}>
        <h2 className={styles.patientName}>{patient.name}</h2>
        <p className={styles.demographics}>{patient.demographics}</p>
        {patient.status ? <p className={styles.patientStatus}>{t(patient.status)}</p> : null}
      </div>
    </header>
  );
}

function RailDivider() {
  return <div className={styles.divider} aria-hidden="true" />;
}

function Safety({ safety, safetyNote }: Pick<PatientContextRailProps, 'safety' | 'safetyNote'>) {
  const t = useT();
  if (!safety || safety.length === 0) return null;

  return (
    <section className={styles.safety} aria-labelledby="patient-context-safety">
      <div className={styles.sectionLabel}>
        <span className={styles.iconBox}><AlertIcon aria-hidden="true" /></span>
        <h3 id="patient-context-safety">{t('Safety')}</h3>
      </div>
      <ul className={styles.safetyList}>
        {safety.map((item) => (
          <li
            key={`${item.label}-${item.detail ?? ''}`}
            className={styles.safetyItem}
            data-tone={item.tone ?? 'danger'}
          >
            {item.tone === 'neutral' ? null : <span className={styles.safetyMarker} aria-hidden="true" />}
            <span>
              <strong>{item.label}</strong>
              {item.detail ? <small>{item.detail}</small> : null}
            </span>
          </li>
        ))}
      </ul>
      {safetyNote ? <p className={styles.groupNote}>{t(safetyNote)}</p> : null}
    </section>
  );
}

function VisitSummary({
  todaySummary,
  reasonForVisit,
}: Pick<PatientContextRailProps, 'todaySummary' | 'reasonForVisit'>) {
  const t = useT();
  if (!todaySummary && (!reasonForVisit || reasonForVisit.length === 0)) return null;

  return (
    <div className={styles.visitContext}>
      {todaySummary ? (
        <section className={styles.visitSection} aria-labelledby="patient-context-today">
          <div className={styles.sectionLabel}>
            <span className={styles.iconBox}><CalendarIcon aria-hidden="true" /></span>
            <h3 id="patient-context-today">{t('Today')}</h3>
          </div>
          <p className={styles.visitSummary}>{todaySummary}</p>
        </section>
      ) : null}
      {todaySummary && reasonForVisit && reasonForVisit.length > 0 ? <RailDivider /> : null}
      {reasonForVisit && reasonForVisit.length > 0 ? (
        <section className={styles.visitSection} aria-labelledby="patient-context-reason">
          <div className={styles.reasonHeader}>
            <span className={styles.missingIconBox} aria-hidden="true" />
            <h3 id="patient-context-reason" className={styles.reasonLabel}>{t('Reason for visit')}</h3>
          </div>
          <ul className={styles.reasonList}>
            {reasonForVisit.map((reason) => <li key={reason}>{t(reason)}</li>)}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function Sections({
  defaultExpanded,
  expandedSections,
  onExpandedSectionsChange,
  sections,
}: Pick<
  PatientContextRailProps,
  'defaultExpanded' | 'expandedSections' | 'onExpandedSectionsChange' | 'sections'
>) {
  const t = useT();
  if (!sections || sections.length === 0) return null;

  return (
    <Accordion
      aria-label={t('Patient record details')}
      className={styles.accordion}
      type="multiple"
      defaultValue={defaultExpanded ?? []}
      value={expandedSections}
      onValueChange={(value) => {
        const nextValues = Array.isArray(value) ? value : [value];
        onExpandedSectionsChange?.(nextValues as PatientContextSectionId[]);
      }}
    >
      {sections.map((section) => {
        const Icon = sectionIcons[section.id];
        const count = section.items.length;
        const emptyMessage =
          section.emptyMessage ?? sectionEmptyMessages[section.id];

        return (
          <AccordionItem className={styles.accordionItem} key={section.id} value={section.id}>
            <AccordionTrigger className={styles.accordionTrigger}>
              <span className={styles.accordionLabel}>
                <span className={styles.iconBox}><Icon aria-hidden="true" /></span>
                <span>{t(section.label)}</span>
                {section.showCount !== false && section.id !== 'administration' ? (
                  <span className={styles.count} aria-label={`${count} ${t('recorded')}`}>{count}</span>
                ) : null}
              </span>
            </AccordionTrigger>
            <AccordionContent className={styles.accordionContent}>
              {count === 0 ? (
                <p className={styles.emptySection}>{t(emptyMessage)}</p>
              ) : (
                <ul className={styles.detailList}>
                  {section.items.map((item) => (
                    <li key={`${section.id}-${item.label}-${item.detail ?? ''}`}>
                      <strong>{item.label}</strong>
                      {item.detail ? <small>{item.detail}</small> : null}
                    </li>
                  ))}
                </ul>
              )}
              {section.note ? <p className={styles.groupNote}>{t(section.note)}</p> : null}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

function StateNotice({
  state,
  onRetry,
}: Pick<PatientContextRailProps, 'state' | 'onRetry'>) {
  const t = useT();
  if (state === 'ready' || state === 'loading') return null;

  if (state === 'permission-denied') {
    return (
      <Alert className={styles.notice} tone="warning" icon={<UserIdentityIcon aria-hidden="true" />}>
        <AlertTitle>{t('Limited access')}</AlertTitle>
        <AlertDescription>{t('This role cannot view the patient record details.')}</AlertDescription>
      </Alert>
    );
  }

  const offline = state === 'offline';
  return (
    <Alert className={styles.notice} tone={offline ? 'warning' : 'danger'} icon={<AlertIcon aria-hidden="true" />}>
      <AlertTitle>{offline ? t('Patient context is offline') : t('Could not load patient context')}</AlertTitle>
      <AlertDescription>
        {offline ? t('Reconnect to refresh this target-contract view.') : t('Try again to load the patient context.')}
      </AlertDescription>
      {onRetry ? <div className={styles.noticeAction}><Button size="sm" variant="secondary" onClick={onRetry}>{t('Retry')}</Button></div> : null}
    </Alert>
  );
}

/**
 * Fixture-only clinical context rail for the future patient workspace.
 * It intentionally exposes no edit, prescribe, or verification mutation.
 */
export function PatientContextRail({
  className,
  defaultExpanded,
  expandedSections,
  onExpandedSectionsChange,
  patient,
  readOnly = false,
  reasonForVisit,
  safety,
  safetyNote,
  sections,
  showIdentity = true,
  state = 'ready',
  todaySummary,
  onRetry,
  ...props
}: PatientContextRailProps) {
  const t = useT();
  const canShowRecord = state === 'ready' || state === 'offline';

  return (
    <aside
      {...props}
      aria-label={`${t('Patient context for')} ${patient.name}`}
      className={joinClasses(styles.rail, className)}
      data-read-only={readOnly || undefined}
      data-slot="patient-context-rail"
      data-state={state}
    >
      {state === 'loading' ? (
        <RailLoading patient={patient} />
      ) : showIdentity ? (
        <>
          <PatientIdentity patient={patient} />
          <RailDivider />
        </>
      ) : null}
      {state !== 'loading' ? <StateNotice state={state} onRetry={onRetry} /> : null}
      {canShowRecord ? (
        <>
          {/* Identity, safety, and today's context are one reading flow —
              spacing separates them. The record list below is a different job
              and takes the single rule. */}
          <Safety safety={safety} safetyNote={safetyNote} />
          {safety && safety.length > 0 ? <RailDivider /> : null}
          <VisitSummary todaySummary={todaySummary} reasonForVisit={reasonForVisit} />
          {(todaySummary || (reasonForVisit && reasonForVisit.length > 0)) ? <RailDivider /> : null}
          <Sections
            defaultExpanded={defaultExpanded}
            expandedSections={expandedSections}
            onExpandedSectionsChange={onExpandedSectionsChange}
            sections={sections}
          />
        </>
      ) : null}
    </aside>
  );
}
