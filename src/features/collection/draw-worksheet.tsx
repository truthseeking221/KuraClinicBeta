'use client';

import { useEffect, useRef, useState } from 'react';

import { useT } from '../../components/foundations/i18n';
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
  Badge,
  Button,
  Select,
  Textarea,
} from '../../components/ui';

import { AttemptOutcomeDialog } from './attempt-outcome-dialog';
import { CustodyHandoff } from './custody-handoff';
import { SAMPLE_ISSUE_REASONS } from './catalog';
import { demoPrintLabel, demoRegisterDrawSample } from './demo-data';
import { ExpectedPlan } from './expected-plan';
import {
  applyRegistration,
  completionGate,
  drawGate,
  drawIdempotencyKey,
  markInverted,
  markLabelManual,
  markLabelPrinted,
  markLabelVerified,
  recordAttempt,
  recordCustody,
  reopenPlanItem,
  reportSampleIssue,
} from './logic';
import { PositiveIdentification } from './positive-identification';
import { PreDrawChecks } from './pre-draw-checks';
import { SampleTable } from './sample-table';
import { TubeLabeling } from './tube-labeling';
import type {
  AttemptOutcome,
  CollectionDraft,
  CollectionPatient,
  ExpectedSpecimenPlanItem,
  LabelPrintResult,
  RegisterDrawResult,
  SampleIssueReason,
} from './types';
import styles from './draw-worksheet.module.css';

export type RegisterDrawInput = {
  patient: CollectionPatient;
  planItem: ExpectedSpecimenPlanItem;
  /** Stable per plan item, so a retry after a timeout cannot create a second tube. */
  idempotencyKey: string;
  attempt: number;
};

export type DrawWorksheetProps = {
  patient: CollectionPatient;
  draft: CollectionDraft;
  onDraftChange: (draft: CollectionDraft) => void;
  onComplete: (draft: CollectionDraft) => void;
  onSaveDraft: () => void;
  /** Vitals are a different booth's work; this station cannot mark them done. */
  onSendToVitals: () => void;
  /**
   * Another station changed this episode. Without a way back to fresh state a
   * stale worksheet is a dead end, so the block offers the reload it needs.
   */
  onReloadEpisode?: () => void;
  /**
   * No permission to collect here — the worksheet still shows what is true,
   * because hiding it would leave the operator guessing why nothing works.
   */
  readOnly?: boolean;
  readOnlyReason?: string;
  /** Deterministic clock for timers. */
  now: number;
  operatorName: string;
  /** The moment a tube exists. Injected so every failure path is reachable. */
  registerDrawSample?: (input: RegisterDrawInput) => RegisterDrawResult;
  printLabel?: (sampleId: string) => LabelPrintResult;
  registerDelayMs?: number;
  onNotify?: (tone: 'success' | 'info' | 'warn' | 'danger', text: string) => void;
};

/**
 * The collection worksheet.
 *
 * The order of the screen is the order of the work, and each stage is gated by
 * the one before it:
 *
 *   upstream gates → positive identification → prep checks →
 *   draw one tube → register it → label and scan it → resolve the rest →
 *   hand custody to a named receiver → complete.
 *
 * Nothing here creates a tube locally. "Draw this tube" sends a registration
 * with a stable idempotency key and waits for the backend to issue the sample
 * identity; a timeout offers a retry that carries the same key, so retrying
 * cannot produce a second tube. There is no bulk action and no undo on a
 * registered sample: both would let one click assert several physical facts.
 */
export function DrawWorksheet({
  draft,
  now,
  onComplete,
  onDraftChange,
  onNotify,
  onSaveDraft,
  onSendToVitals,
  onReloadEpisode,
  operatorName,
  patient,
  printLabel = demoPrintLabel,
  readOnly = false,
  readOnlyReason,
  registerDelayMs = 400,
  registerDrawSample = demoRegisterDrawSample,
}: DrawWorksheetProps) {
  const t = useT();
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [registerFailure, setRegisterFailure] = useState<{
    planItemId: string;
    result: RegisterDrawResult;
  } | null>(null);
  const [attemptCounts, setAttemptCounts] = useState<Record<string, number>>({});
  const [labelSampleId, setLabelSampleId] = useState<string | null>(null);
  const [outcomePlanItemId, setOutcomePlanItemId] = useState<string | null>(null);
  const [issueSampleId, setIssueSampleId] = useState<string | null>(null);
  const [focusedSampleId, setFocusedSampleId] = useState<string | null>(null);
  const [vitalsDismissed, setVitalsDismissed] = useState(false);
  const registerTimer = useRef<number | undefined>(undefined);
  const dialogTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => () => window.clearTimeout(registerTimer.current), []);

  const gate = drawGate(patient, draft);
  const completion = completionGate(patient.plan, draft);
  const labelSample = draft.samples.find((sample) => sample.sampleId === labelSampleId) ?? null;
  const outcomePlanItem =
    patient.plan.find((item) => item.id === outcomePlanItemId) ?? null;
  const issueSample = draft.samples.find((sample) => sample.sampleId === issueSampleId) ?? null;
  const showVitalsWarning = patient.journey.vitals !== 'done' && !vitalsDismissed;

  function runRegistration(planItemId: string) {
    const planItem = patient.plan.find((item) => item.id === planItemId);
    if (!planItem) return;
    window.clearTimeout(registerTimer.current);
    setRegisterFailure(null);
    setRegisteringId(planItemId);
    const attempt = (attemptCounts[planItemId] ?? 0) + 1;
    setAttemptCounts((counts) => ({ ...counts, [planItemId]: attempt }));

    registerTimer.current = window.setTimeout(() => {
      const result = registerDrawSample({
        patient,
        planItem,
        idempotencyKey: drawIdempotencyKey(patient, planItemId),
        attempt,
      });
      setRegisteringId(null);

      if (result.kind === 'registered' || result.kind === 'duplicate') {
        const next = applyRegistration(draft, {
          planItem,
          result,
          now,
          drawnBy: operatorName,
        });
        onDraftChange(next);
        setLabelSampleId(result.sampleId);
        setFocusedSampleId(result.sampleId);
        onNotify?.(
          'success',
          result.kind === 'duplicate'
            ? `${t('Already registered')} — ${result.sampleId}`
            : `${t('Registered')} ${result.sampleId}`,
        );
        return;
      }

      setRegisterFailure({ planItemId, result });
      onNotify?.('danger', t('The draw was not registered.'));
    }, registerDelayMs);
  }

  function handleLabelPrint(): LabelPrintResult {
    if (!labelSample) return { kind: 'printer_offline' };
    const result = printLabel(labelSample.sampleId);
    return result;
  }

  return (
    <div className={styles.worksheet}>
      <EpisodeHeader patient={patient} />

      {readOnly ? (
        <Alert tone="info">
          <AlertTitle>{t('View only at this station')}</AlertTitle>
          <AlertDescription>
            {readOnlyReason
              ? t(readOnlyReason)
              : t('You can read this collection but not change it.')}
          </AlertDescription>
        </Alert>
      ) : null}

      {gate.episodeBlocks.length > 0 ? (
        <Alert tone="danger">
          <AlertTitle>{t('This patient is not ready to be drawn')}</AlertTitle>
          <AlertDescription>
            <ul className={styles.blockList}>
              {gate.episodeBlocks.includes('booking_not_redeemed') ? (
                <li>{t('The booking has not been redeemed at the front desk.')}</li>
              ) : null}
              {gate.episodeBlocks.includes('order_not_placed') ? (
                <li>{t('No lab order has been placed for this visit.')}</li>
              ) : null}
              {gate.episodeBlocks.includes('payment_not_settled') ? (
                <li>
                  {t('Payment is not settled.')}{' '}
                  {patient.gates.payment.amountLabel
                    ? `${t('Outstanding')}: ${patient.gates.payment.amountLabel}.`
                    : ''}{' '}
                  {t('Collection at a PSC is pay before draw.')}
                </li>
              ) : null}
            </ul>
          </AlertDescription>
        </Alert>
      ) : null}

      {showVitalsWarning ? (
        <Alert tone="warning">
          <AlertTitle>{t('Vital signs not yet recorded')}</AlertTitle>
          <AlertDescription>
            {t('Vitals belong to another booth. This station cannot record them as done.')}
          </AlertDescription>
          <AlertAction>
            <Button onClick={() => setVitalsDismissed(true)} size="sm" variant="outline">
              {t('Continue without vitals')}
            </Button>
            <Button onClick={onSendToVitals} size="sm" variant="ghost">
              {t('Send to vitals booth')}
            </Button>
          </AlertAction>
        </Alert>
      ) : null}

      <div className={styles.layout}>
        <div className={styles.rail}>
          <PositiveIdentification
            identity={draft.identity}
            onChange={(identity) => onDraftChange({ ...draft, identity })}
            patient={patient}
            readOnly={readOnly}
          />
          <PreDrawChecks
            arm={draft.arm}
            checks={draft.checks}
            onArmChange={(arm) => onDraftChange({ ...draft, arm })}
            onSiteChange={(site) => onDraftChange({ ...draft, site })}
            onToggle={(id) =>
              onDraftChange({ ...draft, checks: { ...draft.checks, [id]: !draft.checks[id] } })
            }
            patient={patient}
            readOnly={readOnly}
            site={draft.site}
          />
        </div>

        <div className={styles.main}>
          <section aria-label={t('Expected specimens')} className={styles.section}>
            <header className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>{t('Expected specimens')}</h3>
              <Badge variant={completion.openCount === 0 ? 'success' : 'neutral'}>
                {completion.drawnCount + completion.closedCount}/{completion.planTotal}{' '}
                {t('resolved')}
              </Badge>
            </header>
            <p className={styles.sectionHint}>
              {t('What the order requires. A tube exists only after it is registered.')}
            </p>

            {registeringId ? (
              <Alert tone="info">
                <AlertTitle>{t('Registering the draw…')}</AlertTitle>
                <AlertDescription>
                  {t('The sample identity comes back from the lab system.')}
                </AlertDescription>
              </Alert>
            ) : null}

            {registerFailure ? (
              <Alert tone="danger">
                <AlertTitle>
                  {registerFailure.result.kind === 'timeout'
                    ? t('No response from the lab system')
                    : registerFailure.result.kind === 'stale'
                      ? t('Another station already resolved this tube')
                      : t('The lab system refused this draw')}
                </AlertTitle>
                <AlertDescription>
                  {registerFailure.result.kind === 'timeout'
                    ? t('No sample was created. Retrying is safe — it reuses the same request.')
                    : registerFailure.result.kind === 'stale'
                      ? t('Reload the episode before drawing again.')
                      : registerFailure.result.kind === 'rejected'
                        ? t(registerFailure.result.reason)
                        : ''}
                </AlertDescription>
                {registerFailure.result.kind === 'timeout' ? (
                  <AlertAction>
                    <Button
                      onClick={() => runRegistration(registerFailure.planItemId)}
                      size="sm"
                      variant="primary"
                    >
                      {t('Retry registration')}
                    </Button>
                  </AlertAction>
                ) : registerFailure.result.kind === 'stale' && onReloadEpisode ? (
                  <AlertAction>
                    <Button onClick={onReloadEpisode} size="sm" variant="primary">
                      {t('Reload episode')}
                    </Button>
                  </AlertAction>
                ) : null}
              </Alert>
            ) : null}

            <ExpectedPlan
              activePlanItemId={registeringId}
              draft={draft}
              drawEnabled={gate.canDraw && !registeringId && !readOnly}
              onDraw={runRegistration}
              onRecordOutcome={(planItemId, trigger) => {
                dialogTriggerRef.current = trigger;
                setOutcomePlanItemId(planItemId);
              }}
              onReopen={(planItemId) => onDraftChange(reopenPlanItem(draft, planItemId))}
              plan={patient.plan}
              readOnly={readOnly}
            />

            {!gate.canDraw && gate.episodeBlocks.length === 0 ? (
              <p className={styles.gateHint}>
                {gate.identity !== 'confirmed'
                  ? t('Identify the patient before drawing.')
                  : t('Confirm the pre-draw checks before drawing.')}
              </p>
            ) : null}
          </section>

          {draft.samples.length > 0 ? (
            <section aria-label={t('Registered samples')} className={styles.section}>
              <header className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>{t('Registered samples')}</h3>
                {completion.labelsPending > 0 ? (
                  <Badge variant="warning">
                    {completion.labelsPending} {t('label pending')}
                  </Badge>
                ) : null}
              </header>
              <SampleTable
                focusedSampleId={focusedSampleId}
                now={now}
                onFocusSample={setFocusedSampleId}
                onLabel={readOnly ? () => {} : setLabelSampleId}
                onMarkInverted={(sampleId) => {
                  onDraftChange(markInverted(draft, sampleId));
                  onNotify?.('success', `${t('Inversion confirmed for')} ${sampleId}`);
                }}
                onReportIssue={(sampleId, trigger) => {
                  dialogTriggerRef.current = trigger;
                  setIssueSampleId(sampleId);
                }}
                readOnly={readOnly}
                samples={draft.samples}
              />
            </section>
          ) : null}

          {completion.readyForHandoff && draft.samples.length > 0 ? (
            <CustodyHandoff
              custody={draft.custody}
              fromActor={operatorName}
              now={now}
              onHandoff={(input) =>
                onDraftChange(
                  recordCustody(draft, {
                    fromActor: operatorName,
                    toActor: input.toActor,
                    location: input.location,
                    now,
                  }),
                )
              }
              readOnly={readOnly}
              samples={draft.samples}
            />
          ) : null}

          <footer className={styles.footer}>
            <span className={styles.footerStatus}>
              {completion.openCount > 0
                ? `${completion.openCount} ${t(completion.openCount === 1 ? 'specimen still open' : 'specimens still open')}`
                : completion.labelsPending > 0
                  ? `${completion.labelsPending} ${t(completion.labelsPending === 1 ? 'label still unverified' : 'labels still unverified')}`
                  : completion.inversionsPending > 0
                    ? `${completion.inversionsPending} ${t(completion.inversionsPending === 1 ? 'inversion still unconfirmed' : 'inversions still unconfirmed')}`
                    : completion.custodyDone
                      ? t('Ready to close this collection.')
                      : t('Hand the samples over to close this collection.')}
            </span>
            <div className={styles.footerActions}>
              <Button onClick={onSaveDraft} variant="ghost">
                {t('Save and pause')}
              </Button>
              <Button
                disabled={!completion.canComplete || readOnly}
                onClick={() => onComplete(draft)}
                variant="primary"
              >
                {t('Complete collection')}
              </Button>
            </div>
          </footer>
        </div>
      </div>

      <TubeLabeling
        now={now}
        onClose={() => setLabelSampleId(null)}
        onManualFallback={(reason) => {
          if (!labelSampleId) return;
          onDraftChange(markLabelManual(draft, labelSampleId, reason));
          setLabelSampleId(null);
          onNotify?.('warn', t('Handwritten label recorded — accession will relabel it.'));
        }}
        onPrint={handleLabelPrint}
        onPrinted={() => {
          if (labelSampleId) onDraftChange(markLabelPrinted(draft, labelSampleId, now));
        }}
        onVerified={() => {
          if (!labelSampleId) return;
          onDraftChange(markLabelVerified(draft, labelSampleId, now));
          setLabelSampleId(null);
          onNotify?.('success', t('Label verified on the tube.'));
        }}
        patient={patient}
        sample={labelSample}
        samples={draft.samples}
      />

      <AttemptOutcomeDialog
        onClose={() => setOutcomePlanItemId(null)}
        onConfirm={(outcome: AttemptOutcome, note) => {
          if (outcomePlanItemId) {
            onDraftChange(
              recordAttempt(draft, {
                planItemId: outcomePlanItemId,
                outcome,
                note,
                now,
                recordedBy: operatorName,
              }),
            );
          }
          setOutcomePlanItemId(null);
        }}
        planItem={outcomePlanItem}
        restoreFocusRef={dialogTriggerRef}
      />

      <SampleIssueDialog
        onClose={() => setIssueSampleId(null)}
        onConfirm={(reason, note) => {
          if (issueSampleId) {
            onDraftChange(
              reportSampleIssue(draft, {
                sampleId: issueSampleId,
                reason,
                note,
                now,
                reportedBy: operatorName,
              }),
            );
          }
          setIssueSampleId(null);
        }}
        restoreFocusRef={dialogTriggerRef}
        sampleId={issueSample?.sampleId ?? null}
      />
    </div>
  );
}

/** Identity stays on screen for the whole draw, beside the gates that govern it. */
function EpisodeHeader({ patient }: { patient: CollectionPatient }) {
  const t = useT();
  const payment = patient.gates.payment;

  return (
    <header aria-label={t('Patient and order')} className={styles.episode}>
      <div className={styles.episodeIdentity}>
        <span className={styles.episodeName}>{patient.name}</span>
        <span className={styles.episodeMeta}>
          {patient.dob} · {patient.sex} · {patient.pid} · {t('Order')} {patient.orderId}
        </span>
      </div>
      <div className={styles.episodeGates}>
        {patient.stat ? <Badge variant="danger">STAT</Badge> : null}
        <Badge variant={payment.required && !payment.settled ? 'danger' : 'success'}>
          {payment.required
            ? payment.settled
              ? t('Paid')
              : `${t('Unpaid')}${payment.amountLabel ? ` · ${payment.amountLabel}` : ''}`
            : t('Billed elsewhere')}
        </Badge>
        <Badge variant="neutral">{t('Identity provisional until PSC confirms')}</Badge>
      </div>
    </header>
  );
}

/**
 * A tube that exists and turned out to be unusable. It is never deleted: the
 * sample keeps its identity and gains a reason, so accession can reconcile
 * what physically arrives against what was registered.
 */
function SampleIssueDialog({
  onClose,
  onConfirm,
  restoreFocusRef,
  sampleId,
}: {
  sampleId: string | null;
  onConfirm: (reason: SampleIssueReason, note: string) => void;
  onClose: () => void;
  restoreFocusRef?: React.RefObject<HTMLElement | null>;
}) {
  const t = useT();
  const [reason, setReason] = useState<SampleIssueReason | ''>('');
  const [note, setNote] = useState('');

  return (
    <AlertDialog onOpenChange={(open) => (!open ? onClose() : undefined)} open={sampleId !== null}>
      <AlertDialogContent returnFocusRef={restoreFocusRef}>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('Report a problem with this tube')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t(
              'The sample keeps its identity and history. A replacement is a new draw, not an edit of this one.',
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className={styles.issueForm}>
          <Select
            label={t('What is wrong?')}
            onChange={(event) => setReason(event.target.value as SampleIssueReason)}
            options={SAMPLE_ISSUE_REASONS.map((option) => ({
              value: option.id,
              label: t(option.label),
            }))}
            placeholder={t('Select a reason')}
            required
            value={reason}
          />
          <Textarea
            label={t('Note (optional)')}
            onChange={(event) => setNote(event.target.value)}
            value={note}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>{t('Cancel')}</AlertDialogCancel>
          <AlertDialogAction
            disabled={!reason}
            onClick={() => reason && onConfirm(reason, note)}
            variant="destructive"
          >
            {t('Record problem')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
