'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  ChevronDownIcon,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
  SegmentedToggle,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui';
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
} from '../../components/shared';

import { OrdersPanel } from './orders-panel';
import { displayNameOf, formatAgeSex, initialsOf, statusViewOf } from './logic';
import type {
  IdentityDocumentType,
  PatientChartState,
  PatientChartTab,
  PatientOrder,
  PatientSummary,
} from './types';
import styles from './patient-chart.module.css';

const DOC_TYPE_OPTIONS = [
  { value: 'KH_NID', label: 'KH National ID' },
  { value: 'PASSPORT', label: 'Passport' },
  { value: 'OTHER', label: 'Other' },
] as const;

function Fact({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className={styles.fact}>
      <dt className={styles.factLabel}>{label}</dt>
      <dd className={styles.factValue}>{value}</dd>
    </div>
  );
}

/**
 * Staff sights a physical document and attests to it; the document number is
 * deliberately not captured (mirrors POST /clinic/patients/:id/verify-identity).
 */
function VerifyIdentity({
  onVerifyIdentity,
}: {
  onVerifyIdentity: (docType: IdentityDocumentType) => void;
}) {
  const [docType, setDocType] = useState<IdentityDocumentType>('KH_NID');
  return (
    <div className={styles.verify}>
      <p className={styles.verifyHint}>
        Sight the patient&apos;s document to verify their identity. The document number is
        not recorded.
      </p>
      <div className={styles.verifyControls}>
        <SegmentedToggle
          label="Document type"
          onValueChange={(value) => setDocType(value as IdentityDocumentType)}
          options={DOC_TYPE_OPTIONS}
          value={docType}
        />
        <Button onClick={() => onVerifyIdentity(docType)} size="sm" variant="primary">
          Verify identity
        </Button>
      </div>
    </div>
  );
}

export type PatientChartProps = {
  patient: PatientSummary;
  /** Registry rows for the in-place switcher; id-resolved, never by name. */
  patients?: readonly PatientSummary[];
  orders?: readonly PatientOrder[];
  /** Canonical PatientContextRail composition, supplied by the caller. */
  rail?: ReactNode;
  /**
   * Situational right rail (next actions, results progress, cart). A
   * launcher and reviewer surface only — clinical work completes in the
   * center column or a governed flow, never here.
   */
  actionRail?: ReactNode;
  /** Canonical results composition (results feature), supplied by the caller. */
  results?: ReactNode;
  state?: PatientChartState;
  defaultTab?: PatientChartTab;
  onBack?: () => void;
  onOpenMergedRecord?: () => void;
  onRetry?: () => void;
  onSwitchPatient?: (userId: string) => void;
  onVerifyIdentity?: (docType: IdentityDocumentType) => void;
};

/**
 * The patient chart shell: a pinned identity bar over a persistent context
 * rail and a tabbed work area. Deceased and merged records block clinical
 * work before any tab renders.
 */
export function PatientChart({
  actionRail,
  defaultTab = 'overview',
  onBack,
  onOpenMergedRecord,
  onRetry,
  onSwitchPatient,
  onVerifyIdentity,
  orders = [],
  patient,
  patients,
  rail,
  results,
  state = 'ready',
}: PatientChartProps) {
  if (state === 'loading') {
    return (
      <div aria-busy="true" aria-label="Loading patient" className={styles.stateFrame} role="status">
        <Skeleton shape="rectangle" style={{ blockSize: 72, inlineSize: '100%' }} />
        <Skeleton shape="rectangle" style={{ blockSize: 240, inlineSize: '100%' }} />
      </div>
    );
  }

  if (state === 'not-found') {
    return (
      <div className={styles.stateFrame}>
        <EmptyState align="center" surface="plain">
          <EmptyStateHeader>
            <EmptyStateTitle>Patient not found</EmptyStateTitle>
            <EmptyStateDescription>
              This record does not exist or is not part of this workspace.
            </EmptyStateDescription>
          </EmptyStateHeader>
          {onBack ? (
            <Button onClick={onBack} size="sm" variant="secondary">
              Back to patients
            </Button>
          ) : null}
        </EmptyState>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className={styles.stateFrame}>
        <Alert tone="danger">
          <AlertTitle>Couldn&apos;t load this patient</AlertTitle>
          <AlertDescription>Check your connection and try again.</AlertDescription>
        </Alert>
        {onRetry ? (
          <Button onClick={onRetry} size="sm" variant="secondary">
            Try again
          </Button>
        ) : null}
      </div>
    );
  }

  const status = statusViewOf(patient);
  const terminal = status.kind === 'terminal';
  const meta = [formatAgeSex(patient), patient.mrnMasked ? `MRN ${patient.mrnMasked}` : '']
    .filter(Boolean)
    .join(' · ');
  const switchable = (patients ?? []).filter((row) => row.userId !== patient.userId);

  const showActionRail = Boolean(actionRail) && !terminal;

  return (
    <div className={styles.chart} data-action-rail={showActionRail || undefined}>
      <header className={styles.workbar}>
        <div className={styles.identity}>
          <Avatar shape="circle" size="md">
            <AvatarFallback>{initialsOf(patient)}</AvatarFallback>
          </Avatar>
          <div className={styles.identityCopy}>
            <div className={styles.nameRow}>
              <h1 className={styles.name}>{displayNameOf(patient)}</h1>
              {status.kind === 'terminal' ? (
                <Badge variant="neutral">{status.label}</Badge>
              ) : status.assurance === 'unverified' ? (
                <Badge variant="warning">Unverified</Badge>
              ) : null}
              {onSwitchPatient && switchable.length > 0 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <IconButton aria-label="Switch patient" size="micro">
                      <ChevronDownIcon aria-hidden="true" size={16} />
                    </IconButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {switchable.map((row) => (
                      <DropdownMenuItem
                        key={row.userId}
                        onClick={() => onSwitchPatient(row.userId)}
                      >
                        {displayNameOf(row)}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}
            </div>
            {meta ? <p className={styles.meta}>{meta}</p> : null}
          </div>
        </div>
        {onBack ? (
          <Button onClick={onBack} size="sm" variant="ghost">
            Back to patients
          </Button>
        ) : null}
      </header>

      {terminal ? (
        <div className={styles.terminal}>
          <Alert tone={status.status === 'deceased' ? 'neutral' : 'info'}>
            <AlertTitle>
              {status.status === 'deceased'
                ? 'This patient is deceased'
                : 'This record was merged'}
            </AlertTitle>
            <AlertDescription>
              {status.status === 'deceased'
                ? 'The record is closed to new clinical work.'
                : 'All information now lives on the current record.'}
            </AlertDescription>
          </Alert>
          {status.status === 'merged' && onOpenMergedRecord ? (
            <Button onClick={onOpenMergedRecord} size="sm" variant="primary">
              Open current record
            </Button>
          ) : null}
        </div>
      ) : (
        <>
          {rail ? <div className={styles.rail}>{rail}</div> : null}
          <div className={rail ? styles.work : styles.workFull}>
            <Tabs defaultValue={defaultTab}>
              <TabsList aria-label="Patient chart sections">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="orders">
                  Orders{orders.length > 0 ? ` ${orders.length}` : ''}
                </TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                {/* MRN lives in the workbar; repeating it here would say nothing new. */}
                <dl className={styles.facts}>
                  <Fact
                    label="Phone"
                    value={patient.phoneMasked || <span aria-hidden="true">—</span>}
                  />
                  <Fact
                    label="Identity"
                    value={
                      status.kind === 'assurance' && status.assurance === 'unverified' ? (
                        <Badge variant="warning">Unverified</Badge>
                      ) : (
                        'Verified'
                      )
                    }
                  />
                </dl>
                {status.kind === 'assurance' &&
                status.assurance === 'unverified' &&
                onVerifyIdentity ? (
                  <VerifyIdentity onVerifyIdentity={onVerifyIdentity} />
                ) : null}
              </TabsContent>
              <TabsContent value="orders">
                <OrdersPanel orders={orders} />
              </TabsContent>
              <TabsContent value="results">
                {results ?? (
                  <EmptyState align="center" surface="plain">
                    <EmptyStateHeader>
                      <EmptyStateTitle>No reportable results yet</EmptyStateTitle>
                      <EmptyStateDescription>
                        Released results appear here as soon as the lab makes them available.
                      </EmptyStateDescription>
                    </EmptyStateHeader>
                  </EmptyState>
                )}
              </TabsContent>
            </Tabs>
          </div>
          {showActionRail ? <aside className={styles.actionRail}>{actionRail}</aside> : null}
        </>
      )}
    </div>
  );
}
