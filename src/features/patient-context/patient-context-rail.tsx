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
};

export type PatientContextSection = {
  id: PatientContextSectionId;
  label: string;
  items: readonly PatientContextLine[];
  emptyMessage?: string;
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
  todaySummary?: string;
  reasonForVisit?: readonly string[];
  sections?: readonly PatientContextSection[];
  /** Open section IDs are local disclosure state, not a clinical record mutation. */
  defaultExpanded?: readonly PatientContextSectionId[];
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

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function RailDivider() {
  return <div className={styles.divider} aria-hidden="true" />;
}

function RailLoading({ patient }: Pick<PatientContextRailProps, 'patient'>) {
  return (
    <>
      <PatientIdentity patient={patient} />
      <RailDivider />
      <div className={styles.loading} role="status" aria-label="Loading patient context">
        <Skeleton className={styles.loadingTitle} shape="text" />
        <Skeleton className={styles.loadingLine} shape="text" />
        <Skeleton className={styles.loadingLine} shape="text" />
        <RailDivider />
        <Skeleton className={styles.loadingTitle} shape="text" />
        <Skeleton className={styles.loadingLine} shape="text" />
      </div>
    </>
  );
}

function PatientIdentity({ patient }: Pick<PatientContextRailProps, 'patient'>) {
  return (
    <header className={styles.identity}>
      <Avatar size="sm" fallbackTone="brand">
        <AvatarFallback>{patient.initials}</AvatarFallback>
      </Avatar>
      <div className={styles.identityCopy}>
        <h2 className={styles.patientName}>{patient.name}</h2>
        <p className={styles.demographics}>{patient.demographics}</p>
        {patient.status ? <p className={styles.patientStatus}>{patient.status}</p> : null}
      </div>
    </header>
  );
}

function Safety({ safety }: Pick<PatientContextRailProps, 'safety'>) {
  if (!safety || safety.length === 0) return null;

  return (
    <section className={styles.safety} aria-labelledby="patient-context-safety">
      <div className={styles.sectionLabel}>
        <AlertIcon aria-hidden="true" />
        <h3 id="patient-context-safety">Safety</h3>
      </div>
      <ul className={styles.safetyList}>
        {safety.map((item) => (
          <li key={`${item.label}-${item.detail ?? ''}`} className={styles.safetyItem}>
            <span className={styles.safetyMarker} aria-hidden="true" />
            <span>
              <strong>{item.label}</strong>
              {item.detail ? <small>{item.detail}</small> : null}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function VisitSummary({
  todaySummary,
  reasonForVisit,
}: Pick<PatientContextRailProps, 'todaySummary' | 'reasonForVisit'>) {
  if (!todaySummary && (!reasonForVisit || reasonForVisit.length === 0)) return null;

  return (
    <div className={styles.visitContext}>
      {todaySummary ? (
        <section className={styles.visitSection} aria-labelledby="patient-context-today">
          <div className={styles.sectionLabel}>
            <CalendarIcon aria-hidden="true" />
            <h3 id="patient-context-today">Today</h3>
          </div>
          <p className={styles.visitSummary}>{todaySummary}</p>
        </section>
      ) : null}
      {reasonForVisit && reasonForVisit.length > 0 ? (
        <section className={styles.visitSection} aria-labelledby="patient-context-reason">
          <h3 id="patient-context-reason" className={styles.reasonLabel}>Reason for visit</h3>
          <ul className={styles.reasonList}>
            {reasonForVisit.map((reason) => <li key={reason}>{reason}</li>)}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function Sections({
  defaultExpanded,
  readOnly,
  sections,
}: Pick<PatientContextRailProps, 'defaultExpanded' | 'readOnly' | 'sections'>) {
  if (!sections || sections.length === 0) return null;

  return (
    <Accordion
      aria-label="Patient record details"
      className={styles.accordion}
      type="multiple"
      defaultValue={defaultExpanded ?? []}
    >
      {sections.map((section) => {
        const Icon = sectionIcons[section.id];
        const count = section.items.length;
        const isEmpty = count === 0;

        return (
          <AccordionItem className={styles.accordionItem} key={section.id} value={section.id}>
            <AccordionTrigger className={styles.accordionTrigger}>
              <span className={styles.accordionLabel}>
                <Icon aria-hidden="true" />
                <span>{section.label}</span>
                <span className={styles.count} aria-label={`${count} recorded`}>{count}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className={styles.accordionContent}>
              {isEmpty ? (
                <p className={styles.emptySection}>{section.emptyMessage ?? `No ${section.label.toLowerCase()} recorded.`}</p>
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
              {readOnly ? <p className={styles.readOnlyHint}>Read-only patient context.</p> : null}
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
  if (state === 'ready' || state === 'loading') return null;

  if (state === 'permission-denied') {
    return (
      <Alert className={styles.notice} tone="warning" icon={<UserIdentityIcon aria-hidden="true" />}>
        <AlertTitle>Limited access</AlertTitle>
        <AlertDescription>This role cannot view the patient record details.</AlertDescription>
      </Alert>
    );
  }

  const offline = state === 'offline';
  return (
    <Alert className={styles.notice} tone={offline ? 'warning' : 'danger'} icon={<AlertIcon aria-hidden="true" />}>
      <AlertTitle>{offline ? 'Patient context is offline' : 'Could not load patient context'}</AlertTitle>
      <AlertDescription>
        {offline ? 'Reconnect to refresh this target-contract view.' : 'Try again to load the patient context.'}
      </AlertDescription>
      {onRetry ? <div className={styles.noticeAction}><Button size="sm" variant="secondary" onClick={onRetry}>Retry</Button></div> : null}
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
  patient,
  readOnly = false,
  reasonForVisit,
  safety,
  sections,
  showIdentity = true,
  state = 'ready',
  todaySummary,
  onRetry,
  ...props
}: PatientContextRailProps) {
  const canShowRecord = state === 'ready' || state === 'offline';

  return (
    <aside
      {...props}
      aria-label={`Patient context for ${patient.name}`}
      className={joinClasses(styles.rail, className)}
      data-read-only={readOnly || undefined}
      data-state={state}
    >
      {state === 'loading' ? (
        <RailLoading patient={patient} />
      ) : showIdentity ? (
        <PatientIdentity patient={patient} />
      ) : null}
      {state !== 'loading' && showIdentity ? <RailDivider /> : null}
      {state !== 'loading' ? <StateNotice state={state} onRetry={onRetry} /> : null}
      {canShowRecord ? (
        <>
          <Safety safety={safety} />
          {safety && safety.length > 0 ? <RailDivider /> : null}
          <VisitSummary todaySummary={todaySummary} reasonForVisit={reasonForVisit} />
          {(todaySummary || (reasonForVisit && reasonForVisit.length > 0)) ? <RailDivider /> : null}
          <Sections defaultExpanded={defaultExpanded} readOnly={readOnly} sections={sections} />
        </>
      ) : null}
    </aside>
  );
}
