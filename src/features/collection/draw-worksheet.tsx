'use client';

import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import { Alert, AlertAction, AlertDescription, AlertTitle, Badge, Button, Checkbox, Input } from '../../components/ui';

import { DeferDialog } from './defer-dialog';
import {
  collectAllOpen,
  collectSample,
  deferSample,
  markInverted,
  resetSample,
  resolveTubeScan,
  submitGate,
} from './logic';
import { SafetyChecklist } from './safety-checklist';
import { SampleTable } from './sample-table';
import type { CollectionPatient, SafetyChecks, Sample } from './types';
import styles from './draw-worksheet.module.css';

const EMPTY_CHECKS: SafetyChecks = {
  id: false,
  fasting: false,
  allergy: false,
  consent: false,
  site: false,
};

export type DrawWorksheetProps = {
  patient: CollectionPatient;
  samples: Sample[];
  onUpdateSamples: (samples: Sample[]) => void;
  onSubmit: () => void;
  onSaveDraft: () => void;
  onMarkVitalsDone: () => void;
  /** Deterministic clock for timers. */
  now: number;
  operatorName: string;
  onNotify?: (tone: 'success' | 'info' | 'warn' | 'danger', text: string) => void;
};

/**
 * The phlebotomy worksheet: safety checklist gates collection; every sample
 * must be collected (or the deferred ones resolved) and inversions confirmed
 * — or explicitly overridden — before handoff.
 */
export function DrawWorksheet({
  now,
  onMarkVitalsDone,
  onNotify,
  onSaveDraft,
  onSubmit,
  onUpdateSamples,
  operatorName,
  patient,
  samples,
}: DrawWorksheetProps) {
  const [checks, setChecks] = useState<SafetyChecks>(EMPTY_CHECKS);
  const [arm, setArm] = useState<'L' | 'R'>('L');
  const [site, setSite] = useState('Antecubital fossa');
  const [scanValue, setScanValue] = useState('');
  const [focusedSampleId, setFocusedSampleId] = useState<string | null>(null);
  const [deferTargetId, setDeferTargetId] = useState<string | null>(null);
  const [invertOverride, setInvertOverride] = useState(false);
  const [vitalsWarningDismissed, setVitalsWarningDismissed] = useState(false);
  const [worksheetPatientId, setWorksheetPatientId] = useState(patient.id);
  const scanRef = useRef<HTMLInputElement>(null);
  const deferFocusRef = useRef<HTMLButtonElement>(null);

  // Adjust-during-render reset: a new patient starts a fresh worksheet.
  if (worksheetPatientId !== patient.id) {
    setWorksheetPatientId(patient.id);
    setChecks(EMPTY_CHECKS);
    setVitalsWarningDismissed(false);
    setInvertOverride(false);
    setFocusedSampleId(null);
  }

  useEffect(() => {
    scanRef.current?.focus();
  }, [patient.id]);

  const gate = submitGate(samples, checks, invertOverride);
  const vitalsMissing = patient.journey.vitals !== 'done';
  const showVitalsWarning = vitalsMissing && !vitalsWarningDismissed;
  const deferTarget = samples.find((sample) => sample.id === deferTargetId) ?? null;

  function handleCollect(id: string) {
    onUpdateSamples(collectSample(samples, id, { now, collectedBy: operatorName }));
    setFocusedSampleId(id);
    onNotify?.('success', `Collected ${id}`);
  }

  function handleScanKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const raw = scanValue.trim();
    if (!raw) return;

    const result = resolveTubeScan(samples, raw);
    if (result.kind === 'unknown') {
      onNotify?.('danger', `No sample matches ${raw}`);
      setFocusedSampleId(null);
    } else if (result.kind === 'inspect') {
      setFocusedSampleId(result.sample.id);
      onNotify?.('info', `${result.sample.id} already handled — focused in the worksheet`);
    } else if (!gate.checklistBlocking) {
      handleCollect(result.sample.id);
    } else {
      onNotify?.('warn', 'Complete the safety checklist before collecting.');
    }
    setScanValue('');
  }

  return (
    <div className={styles.worksheet}>
      {showVitalsWarning ? (
        <Alert tone="warning">
          <AlertTitle>Vital signs not yet recorded</AlertTitle>
          <AlertDescription>
            You can continue, or send the patient to the vital signs booth first.
          </AlertDescription>
          <AlertAction>
            <Button onClick={() => setVitalsWarningDismissed(true)} size="sm" variant="outline">
              Continue anyway
            </Button>
            <Button onClick={onMarkVitalsDone} size="sm" variant="ghost">
              Mark done at another booth
            </Button>
          </AlertAction>
        </Alert>
      ) : null}

      <div className={styles.layout}>
        <div className={styles.rail}>
          <SafetyChecklist
            arm={arm}
            checks={checks}
            onArmChange={setArm}
            onSiteChange={setSite}
            onToggle={(id) => setChecks((current) => ({ ...current, [id]: !current[id] }))}
            site={site}
          />
        </div>

        <div className={styles.main}>
          <div className={styles.toolbar}>
            <Input
              aria-label="Scan tube barcode"
              onChange={(event) => setScanValue(event.target.value)}
              onKeyDown={handleScanKey}
              placeholder="Scan tube barcode — collects, or focuses if already done"
              ref={scanRef}
              value={scanValue}
            />
            <Button
              disabled={!gate.anyOpen || gate.checklistBlocking}
              onClick={() => {
                onUpdateSamples(collectAllOpen(samples, { now, collectedBy: operatorName }));
                onNotify?.('info', 'All open samples marked collected — confirm inversions next');
              }}
              title={gate.checklistBlocking ? 'Complete the safety checklist first' : undefined}
              variant="outline"
            >
              Mark all collected
            </Button>
          </div>

          <SampleTable
            collectEnabled={!gate.checklistBlocking}
            focusedSampleId={focusedSampleId}
            now={now}
            onCollect={handleCollect}
            onDefer={(id, trigger) => {
              deferFocusRef.current = trigger;
              setDeferTargetId(id);
            }}
            onFocusSample={setFocusedSampleId}
            onMarkInverted={(id) => {
              onUpdateSamples(markInverted(samples, id));
              onNotify?.('success', `Inversion confirmed for ${id}`);
            }}
            onReset={(id) => {
              onUpdateSamples(resetSample(samples, id));
              onNotify?.('info', `Reset ${id} — back to awaiting collection`);
            }}
            samples={samples}
          />

          {gate.allCollected && gate.inversionsBlocking > 0 ? (
            <Alert tone="warning">
              <AlertTitle>Override inversion confirmation</AlertTitle>
              <AlertDescription>
                <Checkbox checked={invertOverride} onCheckedChange={setInvertOverride}>
                  {gate.inversionsBlocking} tube{gate.inversionsBlocking > 1 ? 's' : ''} not yet
                  confirmed inverted — skipping inversions can clot the sample. Only override if
                  already done on the bench.
                </Checkbox>
              </AlertDescription>
            </Alert>
          ) : null}

          <footer className={styles.footer}>
            <Badge variant={gate.allCollected ? 'success' : 'neutral'}>
              {gate.collectedCount}/{gate.totalCount} collected
            </Badge>
            <div className={styles.footerActions}>
              <Button onClick={onSaveDraft} variant="ghost">
                Save draft
              </Button>
              <Button
                disabled={!gate.canSubmit}
                onClick={onSubmit}
                title={
                  gate.checklistBlocking
                    ? 'Complete the safety checklist first'
                    : !gate.allCollected
                      ? 'Collect or resolve every tube first'
                      : undefined
                }
                variant="primary"
              >
                Submit collection &amp; next patient
              </Button>
            </div>
          </footer>
        </div>
      </div>

      <DeferDialog
        onClose={() => setDeferTargetId(null)}
        onConfirm={(reason, note) => {
          if (deferTargetId) {
            onUpdateSamples(deferSample(samples, deferTargetId, reason, note));
            onNotify?.('warn', `Deferred ${deferTargetId} — ${reason}`);
          }
          setDeferTargetId(null);
        }}
        restoreFocusRef={deferFocusRef}
        sample={deferTarget}
      />
    </div>
  );
}
